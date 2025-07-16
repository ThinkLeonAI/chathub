import React from 'react'
import { useAppStore } from '../stores/useAppStore'

interface ChatbotSelectorProps {
  selectedChatbots: string[]
  onSelectionChange: (selected: string[]) => void
}

export const ChatbotSelector: React.FC<ChatbotSelectorProps> = ({
  selectedChatbots,
  onSelectionChange
}) => {
  const { chatbots } = useAppStore()
  
  const enabledChatbots = chatbots.filter(bot => bot.enabled)
  
  const toggleChatbot = (chatbotId: string) => {
    if (selectedChatbots.includes(chatbotId)) {
      onSelectionChange(selectedChatbots.filter(id => id !== chatbotId))
    } else {
      onSelectionChange([...selectedChatbots, chatbotId])
    }
  }
  
  const selectAll = () => {
    onSelectionChange(enabledChatbots.map(bot => bot.id))
  }
  
  const selectNone = () => {
    onSelectionChange([])
  }
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Select Chatbots
        </h3>
        <div className="space-x-2">
          <button
            onClick={selectAll}
            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            All
          </button>
          <button
            onClick={selectNone}
            className="text-xs text-gray-600 hover:text-gray-800 dark:text-gray-400"
          >
            None
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {enabledChatbots.map(chatbot => (
          <button
            key={chatbot.id}
            onClick={() => toggleChatbot(chatbot.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
              selectedChatbots.includes(chatbot.id)
                ? 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <span className="text-lg">{chatbot.icon}</span>
            <span className="text-sm font-medium">{chatbot.name}</span>
            {!chatbot.apiKey && chatbot.mode === 'api' && (
              <span className="text-xs text-red-500">⚠️</span>
            )}
          </button>
        ))}
      </div>
      
      {selectedChatbots.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select at least one chatbot to start chatting
        </p>
      )}
    </div>
  )
}