import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ChatSession, ChatbotConfig, AppSettings, PromptTemplate } from '../types'

interface AppState {
  // Settings
  settings: AppSettings
  updateSettings: (settings: Partial<AppSettings>) => void
  
  // Chatbots
  chatbots: ChatbotConfig[]
  updateChatbot: (id: string, config: Partial<ChatbotConfig>) => void
  
  // Sessions
  sessions: ChatSession[]
  currentSessionId: string | null
  createSession: (title?: string) => string
  updateSession: (id: string, updates: Partial<ChatSession>) => void
  deleteSession: (id: string) => void
  setCurrentSession: (id: string) => void
  
  // Prompts
  promptTemplates: PromptTemplate[]
  addPromptTemplate: (template: Omit<PromptTemplate, 'id' | 'createdAt'>) => void
  updatePromptTemplate: (id: string, updates: Partial<PromptTemplate>) => void
  deletePromptTemplate: (id: string) => void
  
  // UI State
  isLoading: boolean
  setLoading: (loading: boolean) => void
  error: string | null
  setError: (error: string | null) => void
}

const defaultChatbots: ChatbotConfig[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    enabled: true,
    mode: 'api',
    webUrl: 'https://chat.openai.com',
    icon: '🤖'
  },
  {
    id: 'grok',
    name: 'Grok',
    enabled: true,
    mode: 'api',
    webUrl: 'https://grok.x.ai',
    icon: '🚀'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    enabled: true,
    mode: 'api',
    webUrl: 'https://gemini.google.com',
    icon: '💎'
  },
  {
    id: 'claude',
    name: 'Claude',
    enabled: true,
    mode: 'api',
    webUrl: 'https://claude.ai',
    icon: '🎭'
  }
]

const defaultSettings: AppSettings = {
  theme: 'auto',
  layout: 'grid',
  enabledChatbots: ['chatgpt', 'grok', 'gemini', 'claude'],
  consensusMode: false,
  voiceInput: false,
  voiceOutput: false,
  autoSave: true
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Settings
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        })),
      
      // Chatbots
      chatbots: defaultChatbots,
      updateChatbot: (id, config) =>
        set((state) => ({
          chatbots: state.chatbots.map((bot) =>
            bot.id === id ? { ...bot, ...config } : bot
          )
        })),
      
      // Sessions
      sessions: [],
      currentSessionId: null,
      createSession: (title = 'New Chat') => {
        const id = crypto.randomUUID()
        const session: ChatSession = {
          id,
          title,
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
        set((state) => ({
          sessions: [session, ...state.sessions],
          currentSessionId: id
        }))
        return id
      },
      updateSession: (id, updates) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === id
              ? { ...session, ...updates, updatedAt: Date.now() }
              : session
          )
        })),
      deleteSession: (id) =>
        set((state) => ({
          sessions: state.sessions.filter((session) => session.id !== id),
          currentSessionId:
            state.currentSessionId === id ? null : state.currentSessionId
        })),
      setCurrentSession: (id) => set({ currentSessionId: id }),
      
      // Prompts
      promptTemplates: [],
      addPromptTemplate: (template) => {
        const newTemplate: PromptTemplate = {
          ...template,
          id: crypto.randomUUID(),
          createdAt: Date.now()
        }
        set((state) => ({
          promptTemplates: [newTemplate, ...state.promptTemplates]
        }))
      },
      updatePromptTemplate: (id, updates) =>
        set((state) => ({
          promptTemplates: state.promptTemplates.map((template) =>
            template.id === id ? { ...template, ...updates } : template
          )
        })),
      deletePromptTemplate: (id) =>
        set((state) => ({
          promptTemplates: state.promptTemplates.filter(
            (template) => template.id !== id
          )
        })),
      
      // UI State
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),
      error: null,
      setError: (error) => set({ error })
    }),
    {
      name: 'chathub-personal-storage',
      partialize: (state) => ({
        settings: state.settings,
        chatbots: state.chatbots,
        sessions: state.sessions,
        promptTemplates: state.promptTemplates
      })
    }
  )
)