import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from '../types'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

interface ChatInterfaceProps {
  messages: ChatMessage[]
  onNewMessage: (content: string) => void
  onToolSelect: (toolId: string) => void
}

const ChatInterface = ({ messages, onNewMessage, onToolSelect }: ChatInterfaceProps) => {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onNewMessage(input.trim())
      setInput('')
    }
  }

  const renderMessage = (message: ChatMessage) => {
    const content = message.content
    if (message.sender === 'system' && content.includes('כלים שעשויים להתאים לך')) {
      const toolsList = content.split('\n\n')[1]
      return (
        <div className="space-y-2">
          <p>{content.split('\n\n')[0]}</p>
          <div className="space-y-1">
            {toolsList.split('\n').map((tool, index) => {
              const match = tool.match(/^- (.+?): (.+)$/)
              if (!match) return null
              const [, name, description] = match
              return (
                <div 
                  key={index}
                  className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer"
                  onClick={() => onToolSelect(name)}
                >
                  <h3 className="font-medium">{name}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
    return <p>{content}</p>
  }

  return (
    <div className="chat-container">
      <div className="space-y-4 pb-24">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${
              message.sender === 'user' ? 'user-message' : 'system-message'
            }`}
          >
            {renderMessage(message)}
            <span className="text-xs text-gray-500 block mt-1">
              {new Date(message.timestamp).toLocaleTimeString('he-IL')}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="input-container">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="הקלד את הודעתך כאן..."
            className="chat-input"
          />
          <button
            type="submit"
            className="p-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            disabled={!input.trim()}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatInterface 