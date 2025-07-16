import { BaseChatbot } from './base'
import { ChatMessage, ApiResponse } from '../../types'

export class GeminiBot extends BaseChatbot {
  id = 'gemini'
  name = 'Gemini'
  
  async sendMessage(
    message: string,
    history: ChatMessage[],
    apiKey?: string
  ): Promise<ApiResponse> {
    if (!apiKey) {
      return { success: false, error: 'API key is required' }
    }
    
    try {
      // Convert history to Gemini format
      const contents = []
      
      for (const msg of history) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        })
      }
      
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      })
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2000
            }
          })
        }
      )
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error?.message || 'API request failed')
      }
      
      const data = await response.json()
      const assistantMessage = data.candidates?.[0]?.content?.parts?.[0]?.text
      
      if (!assistantMessage) {
        throw new Error('No response from Gemini')
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
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
      )
      return response.ok
    } catch {
      return false
    }
  }
}