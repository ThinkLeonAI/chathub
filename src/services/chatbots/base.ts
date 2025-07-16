import { ChatMessage, ApiResponse } from '../../types'

export abstract class BaseChatbot {
  abstract id: string
  abstract name: string
  
  abstract sendMessage(
    message: string,
    history: ChatMessage[],
    apiKey?: string
  ): Promise<ApiResponse>
  
  abstract validateApiKey(apiKey: string): Promise<boolean>
  
  protected createMessage(role: 'user' | 'assistant', content: string): ChatMessage {
    return {
      id: crypto.randomUUID(),
      role,
      content,
      timestamp: Date.now()
    }
  }
  
  protected handleError(error: any): ApiResponse {
    console.error(`${this.name} error:`, error)
    return {
      success: false,
      error: error.message || 'An unexpected error occurred'
    }
  }
}