export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  chatbot?: string
}

export interface ChatSession {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

export interface ChatbotConfig {
  id: string
  name: string
  enabled: boolean
  mode: 'api' | 'web'
  apiKey?: string
  webUrl?: string
  icon: string
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto'
  layout: 'grid' | 'stacked' | 'carousel'
  enabledChatbots: string[]
  consensusMode: boolean
  voiceInput: boolean
  voiceOutput: boolean
  autoSave: boolean
}

export interface ApiResponse {
  success: boolean
  data?: any
  error?: string
}

export interface PromptTemplate {
  id: string
  name: string
  content: string
  category: string
  createdAt: number
}