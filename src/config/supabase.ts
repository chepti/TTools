import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export const initializeSupabase = async () => {
  const { data: tools } = await supabase
    .from('tools')
    .select('*')
    .limit(1)
  
  if (!tools?.length) {
    // אם אין כלים במסד הנתונים, נטען את הנתונים ההתחלתיים
    // הערה: הטעינה תתבצע דרך ממשק הניהול של סופאבייס
    console.log('No tools found in database')
  }
} 