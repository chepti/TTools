import { useState, useEffect } from 'react'
import { ChatMessage, UserPreferences } from './types'
import ChatInterface from './components/ChatInterface'
import AddToolForm from './components/AddToolForm'
import AddTutorialForm from './components/AddTutorialForm'
import AddExampleForm from './components/AddExampleForm'
import { supabase, initializeSupabase } from './config/supabase'
import type { Database } from './config/types'
import { PlusIcon } from '@heroicons/react/24/solid'

type Tool = Database['public']['Tables']['tools']['Row']

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
  const [tools, setTools] = useState<Tool[]>([])
  const [showAddForm, setShowAddForm] = useState<'tool' | 'tutorial' | 'example' | null>(null)
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      await initializeSupabase()
      const { data, error } = await supabase
        .from('tools')
        .select('*')
      
      if (error) {
        console.error('Error loading tools:', error)
      } else if (data) {
        setTools(data)
      }
    }

    loadData()
  }, [])

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

    // If we have enough preferences, recommend tools
    if (preferences.purpose && preferences.contentType) {
      const relevantTools = tools.filter(tool => {
        const matchesPurpose = tool.pedagogical_contexts.some(ctx => ctx.includes(preferences.purpose || ''))
        const matchesContent = tool.output_types.some(type => type.includes(preferences.contentType || ''))
        return matchesPurpose && matchesContent
      })

      if (relevantTools.length > 0) {
        const toolsList = relevantTools
          .map(tool => `- ${tool.name}: ${tool.description}`)
          .join('\n')
        return `הנה כמה כלים שעשויים להתאים לך:\n\n${toolsList}`
      }
    }

    return 'אני מבין. תוכל לפרט יותר?'
  }

  const handleToolSelect = (toolId: string) => {
    setSelectedToolId(toolId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">מציאת כלים למורים</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddForm('tool')}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
            >
              <PlusIcon className="h-5 w-5 ml-2" />
              הוספת כלי חדש
            </button>
            {selectedToolId && (
              <>
                <button
                  onClick={() => setShowAddForm('tutorial')}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                >
                  <PlusIcon className="h-5 w-5 ml-2" />
                  הוספת הדרכה
                </button>
                <button
                  onClick={() => setShowAddForm('example')}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                >
                  <PlusIcon className="h-5 w-5 ml-2" />
                  הוספת דוגמה
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      <main>
        <ChatInterface messages={messages} onNewMessage={handleNewMessage} />
        {showAddForm === 'tool' && (
          <AddToolForm onClose={() => setShowAddForm(null)} />
        )}
        {showAddForm === 'tutorial' && selectedToolId && (
          <AddTutorialForm toolId={selectedToolId} onClose={() => setShowAddForm(null)} />
        )}
        {showAddForm === 'example' && selectedToolId && (
          <AddExampleForm toolId={selectedToolId} onClose={() => setShowAddForm(null)} />
        )}
      </main>
    </div>
  )
}

export default App 