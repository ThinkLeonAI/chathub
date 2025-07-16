import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ChatMessage } from '../types'
import { useAppStore } from '../stores/useAppStore'

interface MessageListProps {
  messages: ChatMessage[]
  layout: 'grid' | 'stacked' | 'carousel'
}

export const MessageList: React.FC<MessageListProps> = ({ messages, layout }) => {
  const { chatbots } = useAppStore()
  
  const groupedMessages = React.useMemo(() => {
    const groups: Array<{ user: ChatMessage; assistants: ChatMessage[] }> = []
    let currentGroup: { user: ChatMessage; assistants: ChatMessage[] } | null = null
    
    for (const message of messages) {
      if (message.role === 'user') {
        if (currentGroup) {
          groups.push(currentGroup)
        }
        currentGroup = { user: message, assistants: [] }
      } else if (currentGroup) {
        currentGroup.assistants.push(message)
      }
    }
    
    if (currentGroup) {
      groups.push(currentGroup)
    }
    
    return groups
  }, [messages])
  
  const renderMessage = (message: ChatMessage) => {
    const chatbot = chatbots.find(c => c.id === message.chatbot)
    
    return (
      <div
        key={message.id}
        className={`p-4 rounded-lg ${
          message.role === 'user'
            ? 'bg-blue-100 dark:bg-blue-900 ml-auto max-w-[80%]'
            : 'bg-gray-100 dark:bg-gray-800'
        }`}
      >
        {message.role === 'assistant' && chatbot && (
          <div className="flex items-center mb-2">
            <span className="text-lg mr-2">{chatbot.icon}</span>
            <span className="font-semibold text-sm">{chatbot.name}</span>
          </div>
        )}
        
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
          className="prose dark:prose-invert max-w-none"
        >
          {message.content}
        </ReactMarkdown>
        
        <div className="text-xs text-gray-500 mt-2">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    )
  }
  
  if (layout === 'stacked') {
    return (
      <div className="space-y-4 p-4 overflow-y-auto h-full">
        {messages.map(renderMessage)}
      </div>
    )
  }
  
  if (layout === 'grid') {
    return (
      <div className="p-4 overflow-y-auto h-full">
        {groupedMessages.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-8">
            <div className="mb-4">
              {renderMessage(group.user)}
            </div>
            
            {group.assistants.length > 0 && (
              <div className={`grid gap-4 ${
                group.assistants.length === 1 ? 'grid-cols-1' :
                group.assistants.length === 2 ? 'grid-cols-2' :
                group.assistants.length === 3 ? 'grid-cols-3' :
                'grid-cols-2 lg:grid-cols-4'
              }`}>
                {group.assistants.map(renderMessage)}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }
  
  // Carousel layout
  return (
    <div className="p-4 overflow-y-auto h-full">
      {groupedMessages.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-8">
          <div className="mb-4">
            {renderMessage(group.user)}
          </div>
          
          {group.assistants.length > 0 && (
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-4" style={{ width: `${group.assistants.length * 400}px` }}>
                {group.assistants.map(message => (
                  <div key={message.id} className="flex-shrink-0 w-96">
                    {renderMessage(message)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}