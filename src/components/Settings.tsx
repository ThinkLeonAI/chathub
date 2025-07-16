import React, { useState } from 'react'
import { useAppStore } from '../stores/useAppStore'
import { chatbots } from '../services/chatbots'
import toast from 'react-hot-toast'

export const Settings: React.FC = () => {
  const {
    settings,
    chatbots: chatbotConfigs,
    updateSettings,
    updateChatbot
  } = useAppStore()
  
  const [testingApiKey, setTestingApiKey] = useState<string | null>(null)
  
  const handleApiKeyTest = async (chatbotId: string, apiKey: string) => {
    if (!apiKey.trim()) {
      toast.error('Please enter an API key')
      return
    }
    
    setTestingApiKey(chatbotId)
    
    try {
      const chatbot = chatbots[chatbotId]
      const isValid = await chatbot.validateApiKey(apiKey)
      
      if (isValid) {
        toast.success('API key is valid!')
        updateChatbot(chatbotId, { apiKey })
      } else {
        toast.error('Invalid API key')
      }
    } catch (error) {
      toast.error('Failed to validate API key')
    } finally {
      setTestingApiKey(null)
    }
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      
      {/* General Settings */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          General Settings
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme
            </label>
            <select
              value={settings.theme}
              onChange={(e) => updateSettings({ theme: e.target.value as any })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            >
              <option value="auto">Auto</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Layout
            </label>
            <select
              value={settings.layout}
              onChange={(e) => updateSettings({ layout: e.target.value as any })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            >
              <option value="grid">Grid</option>
              <option value="stacked">Stacked</option>
              <option value="carousel">Carousel</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.consensusMode}
                onChange={(e) => updateSettings({ consensusMode: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Enable Consensus Mode
              </span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.voiceInput}
                onChange={(e) => updateSettings({ voiceInput: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Voice Input
              </span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.voiceOutput}
                onChange={(e) => updateSettings({ voiceOutput: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Voice Output
              </span>
            </label>
          </div>
        </div>
      </section>
      
      {/* Chatbot Configuration */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Chatbot Configuration
        </h2>
        
        <div className="space-y-6">
          {chatbotConfigs.map(chatbot => (
            <div key={chatbot.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{chatbot.icon}</span>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {chatbot.name}
                  </h3>
                </div>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={chatbot.enabled}
                    onChange={(e) => updateChatbot(chatbot.id, { enabled: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Enabled</span>
                </label>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mode
                  </label>
                  <select
                    value={chatbot.mode}
                    onChange={(e) => updateChatbot(chatbot.id, { mode: e.target.value as any })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="api">API</option>
                    <option value="web">Web</option>
                  </select>
                </div>
                
                {chatbot.mode === 'api' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      API Key
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="password"
                        value={chatbot.apiKey || ''}
                        onChange={(e) => updateChatbot(chatbot.id, { apiKey: e.target.value })}
                        placeholder="Enter API key..."
                        className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                      <button
                        onClick={() => handleApiKeyTest(chatbot.id, chatbot.apiKey || '')}
                        disabled={testingApiKey === chatbot.id}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                      >
                        {testingApiKey === chatbot.id ? 'Testing...' : 'Test'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Data Management */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Data Management
        </h2>
        
        <div className="space-y-4">
          <div className="flex space-x-4">
            <button
              onClick={() => {
                const data = localStorage.getItem('chathub-personal-storage')
                if (data) {
                  const blob = new Blob([data], { type: 'application/json' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `chathub-backup-${new Date().toISOString().split('T')[0]}.json`
                  a.click()
                  URL.revokeObjectURL(url)
                  toast.success('Data exported successfully')
                }
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Export Data
            </button>
            
            <label className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
              Import Data
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onload = (event) => {
                      try {
                        const data = event.target?.result as string
                        localStorage.setItem('chathub-personal-storage', data)
                        toast.success('Data imported successfully. Please refresh the page.')
                      } catch (error) {
                        toast.error('Failed to import data')
                      }
                    }
                    reader.readAsText(file)
                  }
                }}
              />
            </label>
            
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                  localStorage.removeItem('chathub-personal-storage')
                  toast.success('All data cleared. Please refresh the page.')
                }
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Clear All Data
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}