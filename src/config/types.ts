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
          hebrew_support: number
          free_tier: number
          fun_factor: number
          pedagogical_value: number
          output_types: string[]
          pedagogical_contexts: string[]
          communication_format: string
          complexity_level: number
          average_rating?: number
        }
        Insert: Omit<Database['public']['Tables']['tools']['Row'], 'id' | 'created_at' | 'average_rating'>
        Update: Partial<Database['public']['Tables']['tools']['Insert']>
      }
      tutorials: {
        Row: {
          id: string
          tool_id: string
          title: string
          format: string
          url: string
          additional_info?: string
          creator: string
          contributor: string
          rating: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['tutorials']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['tutorials']['Insert']>
      }
      examples: {
        Row: {
          id: string
          tool_id: string
          url: string
          title: string
          description: string
          creator: string
          contributor: string
          rating: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['examples']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['examples']['Insert']>
      }
    }
  }
} 