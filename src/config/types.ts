export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tools: {
        Row: {
          id: string
          name: string
          description: string
          url: string
          logo_url?: string
          created_at: string
          category_ids: string[]
          is_free: boolean
          language: string
          complexity_level: number
          features: string[]
          average_rating?: number
        }
        Insert: Omit<Database['public']['Tables']['tools']['Row'], 'id' | 'created_at' | 'average_rating'>
        Update: Partial<Database['public']['Tables']['tools']['Insert']>
      }
      categories: {
        Row: {
          id: string
          name: string
          parent_id?: string
        }
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['categories']['Insert']>
      }
      ratings: {
        Row: {
          id: string
          tool_id: string
          user_id: string
          rating: number
          comment?: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['ratings']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['ratings']['Insert']>
      }
    }
  }
} 