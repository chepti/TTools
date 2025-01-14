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
            <p className="text-gray-800">{message.content}</p>
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