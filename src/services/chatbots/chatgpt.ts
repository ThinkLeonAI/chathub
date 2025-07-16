import { BaseChatbot } from './base'
import { ChatMessage, ApiResponse } from '../../types'

export class ChatGPTBot extends BaseChatbot {
  id = 'chatgpt'
  name = 'ChatGPT'
  
  async sendMessage(
    message: string,
    history: ChatMessage[],
    apiKey?: string
  ): Promise<ApiResponse> {
    if (!apiKey) {
      return { success: false, error: 'API key is required' }
    }
    
    try {
      const messages = [
        ...history.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        { role: 'user' as const, content: message }
      ]
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages,
          max_tokens: 2000,
          temperature: 0.7
        })
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error?.message || 'API request failed')
      }
      
      const data = await response.json()
      const assistantMessage = data.choices[0]?.message?.content
      
      if (!assistantMessage) {
        throw new Error('No response from ChatGPT')
      }
      
      return {
        success: true,
        data: this.createMessage('assistant', assistantMessage)
      }
    } catch (error) {
      return this.handleError(error)
    }
  }
  
  async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      })
      return response.ok
    } catch {
      return false
    }
  }
}