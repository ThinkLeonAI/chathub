import React, { useState, useRef } from 'react'
// import { PaperAirplaneIcon, MicrophoneIcon } from '@heroicons/react/24/outline'
import { useAppStore } from '../stores/useAppStore'

interface MessageInputProps {
  onSendMessage: (message: string) => void
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const { settings, isLoading } = useAppStore()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }
  
  const startVoiceInput = () => {
    if (!settings.voiceInput || !('webkitSpeechRecognition' in window)) {
      return
    }
    
    const recognition = new (window as any).webkitSpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'
    
    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setMessage(prev => prev + transcript)
    }
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }
    
    recognition.start()
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-2">
      <div className="flex-1">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Shift+Enter for new line)"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          rows={1}
          style={{
            minHeight: '44px',
            maxHeight: '120px',
            height: 'auto'
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement
            target.style.height = 'auto'
            target.style.height = `${Math.min(target.scrollHeight, 120)}px`
          }}
          disabled={isLoading}
        />
      </div>
      
      {settings.voiceInput && 'webkitSpeechRecognition' in window && (
        <button
          type="button"
          onClick={startVoiceInput}
          disabled={isListening || isLoading}
          className={`p-3 rounded-lg transition-colors ${
            isListening
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <span>🎤</span>
        </button>
      )}
      
      <button
        type="submit"
        disabled={!message.trim() || isLoading}
        className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span>📤</span>
      </button>
    </form>
  )
}