import { createClient } from '@supabase/supabase-js'
import { Database } from './types'
import { parseCSV } from '../utils/csvLoader'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export const initializeSupabase = async () => {
  const { data: existingTools, error: toolsError } = await supabase
    .from('tools')
    .select('*')
    .limit(1)

  if (toolsError || !existingTools.length) {
    // Load initial data from CSV
    const tools = parseCSV()
    
    const { error } = await supabase
      .from('tools')
      .insert(tools)
    
    if (error) {
      console.error('Error loading initial data:', error)
    }
  }
} 