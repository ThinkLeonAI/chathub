import React, { useState, useEffect } from 'react'
import { ChatInterface } from '../components/ChatInterface'
import { Settings } from '../components/Settings'
import { useAppStore } from '../stores/useAppStore'
// import { Cog6ToothIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import toast, { Toaster } from 'react-hot-toast'

export const Popup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'settings'>('chat')
  const { settings } = useAppStore()
  
  useEffect(() => {
    // Apply theme
    const root = document.documentElement
    if (settings.theme === 'dark' || 
        (settings.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [settings.theme])
  
  return (
    <div className="w-[800px] h-[600px] bg-white dark:bg-gray-900 flex flex-col">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            ChatHub Personal
          </h1>
          
          <nav className="flex space-x-1">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'chat'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <span>💬</span>
              <span>Chat</span>
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <span>⚙️</span>
              <span>Settings</span>
            </button>
          </nav>
        </div>
      </header>
      
      {/* Content */}
      <main className="flex-1 overflow-hidden">
        {activeTab === 'chat' ? <ChatInterface /> : <Settings />}
      </main>
    </div>
  )
}