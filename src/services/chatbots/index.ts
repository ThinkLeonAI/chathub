import { ChatGPTBot } from './chatgpt'
import { GrokBot } from './grok'
import { GeminiBot } from './gemini'
import { ClaudeBot } from './claude'
import { BaseChatbot } from './base'

export const chatbots: Record<string, BaseChatbot> = {
  chatgpt: new ChatGPTBot(),
  grok: new GrokBot(),
  gemini: new GeminiBot(),
  claude: new ClaudeBot()
}

export { BaseChatbot }
export * from './chatgpt'
export * from './grok'
export * from './gemini'
export * from './claude'