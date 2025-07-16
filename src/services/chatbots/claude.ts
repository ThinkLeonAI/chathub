import { BaseChatbot } from './base'
import { ChatMessage, ApiResponse } from '../../types'

export class ClaudeBot extends BaseChatbot {
  id = 'claude'
  name = 'Claude'
  
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
      
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          messages,
          max_tokens: 2000
        })
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error?.message || 'API request failed')
      }
      
      const data = await response.json()
      const assistantMessage = data.content?.[0]?.text
      
      if (!assistantMessage) {
        throw new Error('No response from Claude')
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
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          messages: [{ role: 'user', content: 'Hello' }],
          max_tokens: 1
        })
      })
      return response.ok
    } catch {
      return false
    }
  }
}