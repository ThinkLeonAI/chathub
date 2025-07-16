import React, { useState, useRef, useEffect } from 'react'
import { useAppStore } from '../stores/useAppStore'
import { chatbots } from '../services/chatbots'
import { ConsensusService } from '../services/consensus'
import { ChatMessage } from '../types'
import { MessageList } from './MessageList'
import { MessageInput } from './MessageInput'
import { ChatbotSelector } from './ChatbotSelector'
import { ConsensusPanel } from './ConsensusPanel'
import toast from 'react-hot-toast'

export const ChatInterface: React.FC = () => {
  const {
    sessions,
    currentSessionId,
    settings,
    chatbots: chatbotConfigs,
    updateSession,
    createSession,
    setLoading,
    setError
  } = useAppStore()
  
  const [selectedChatbots, setSelectedChatbots] = useState<string[]>(['chatgpt'])
  const [consensusResult, setConsensusResult] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const currentSession = sessions.find(s => s.id === currentSessionId)
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentSession?.messages])
  
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return
    
    let sessionId = currentSessionId
    if (!sessionId) {
      sessionId = createSession()
    }
    
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: Date.now()
    }
    
    // Add user message to session
    updateSession(sessionId, {
      messages: [...(currentSession?.messages || []), userMessage]
    })
    
    setLoading(true)
    setError(null)
    
    try {
      const responses = await Promise.allSettled(
        selectedChatbots.map(async (chatbotId) => {
          const chatbot = chatbots[chatbotId]
          const config = chatbotConfigs.find(c => c.id === chatbotId)
          
          if (!chatbot || !config?.enabled) {
            throw new Error(`${chatbotId} is not available`)
          }
          
          const response = await chatbot.sendMessage(
            content,
            currentSession?.messages || [],
            config.apiKey
          )
          
          if (!response.success) {
            throw new Error(response.error || 'Unknown error')
          }
          
          return {
            chatbot: chatbotId,
            message: { ...response.data, chatbot: chatbotId }
          }
        })
      )
      
      const successfulResponses = responses
        .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
        .map(result => result.value)
      
      const failedResponses = responses
        .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
        .map(result => result.reason.message)
      
      if (failedResponses.length > 0) {
        toast.error(`Some chatbots failed: ${failedResponses.join(', ')}`)
      }
      
      if (successfulResponses.length === 0) {
        throw new Error('All chatbots failed to respond')
      }
      
      // Add assistant messages to session
      const assistantMessages = successfulResponses.map(r => r.message)
      updateSession(sessionId, {
        messages: [...(currentSession?.messages || []), userMessage, ...assistantMessages]
      })
      
      // Generate consensus if enabled and multiple responses
      if (settings.consensusMode && successfulResponses.length > 1) {
        const consensus = ConsensusService.analyzeResponses(successfulResponses)
        setConsensusResult(consensus)
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <ChatbotSelector
          selectedChatbots={selectedChatbots}
          onSelectionChange={setSelectedChatbots}
        />
      </div>
      
      <div className="flex-1 overflow-hidden">
        <MessageList
          messages={currentSession?.messages || []}
          layout={settings.layout}
        />
        <div ref={messagesEndRef} />
      </div>
      
      {settings.consensusMode && consensusResult && (
        <ConsensusPanel
          result={consensusResult}
          onClose={() => setConsensusResult(null)}
        />
      )}
      
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}