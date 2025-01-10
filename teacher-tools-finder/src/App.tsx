import { useState } from 'react'
import { ChatMessage, UserPreferences } from './types'
import ChatInterface from './components/ChatInterface'

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'שלום! אני כאן כדי לעזור לך למצוא כלים דיגיטליים שיעזרו לך בהוראה. איזה סוג של כלי אתה מחפש?',
      sender: 'system',
      timestamp: new Date().toISOString()
    }
  ])
  
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({})

  const handleNewMessage = (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, userMessage])

    // Process user input and generate system response
    setTimeout(() => {
      const systemResponse = processUserInput(content, userPreferences)
      const systemMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: systemResponse,
        sender: 'system',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, systemMessage])
    }, 500)
  }

  const processUserInput = (input: string, preferences: UserPreferences): string => {
    const lowercaseInput = input.toLowerCase()
    
    // Basic conversation flow - this will be expanded later
    if (!preferences.purpose) {
      if (lowercaseInput.includes('יעיל') || lowercaseInput.includes('זמן')) {
        setUserPreferences(prev => ({ ...prev, purpose: 'efficiency' }))
        return 'מצוין! אתה מחפש כלים שיעזרו לך לחסוך זמן ולייעל את העבודה. האם אתה מחפש כלי לעבודה עם תמונות, סרטונים, או טקסט?'
      }
      if (lowercaseInput.includes('איכות') || lowercaseInput.includes('שיפור')) {
        setUserPreferences(prev => ({ ...prev, purpose: 'quality' }))
        return 'נהדר! אתה מתמקד בשיפור איכות ההוראה. באיזה תחום תוכן אתה מלמד?'
      }
      return 'האם אתה מחפש כלי שיעזור לך לייעל את העבודה או לשפר את איכות ההוראה?'
    }

    if (!preferences.contentType) {
      if (lowercaseInput.includes('תמונ')) {
        setUserPreferences(prev => ({ ...prev, contentType: 'image' }))
        return 'מעולה! יש לנו מספר כלים מצוינים לעבודה עם תמונות. מה רמת המורכבות המועדפת עליך? (1-5)'
      }
      if (lowercaseInput.includes('סרטון') || lowercaseInput.includes('וידאו')) {
        setUserPreferences(prev => ({ ...prev, contentType: 'video' }))
        return 'יופי! יש לנו כלים נהדרים לעבודה עם סרטונים. מה רמת המורכבות המועדפת עליך? (1-5)'
      }
    }

    return 'אני מבין. תוכל לפרט יותר?'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">מציאת כלים למורים</h1>
        </div>
      </header>
      <main>
        <ChatInterface messages={messages} onNewMessage={handleNewMessage} />
      </main>
    </div>
  )
}

export default App 