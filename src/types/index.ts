export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  logo_url: string;
  created_at: string;
  category_ids: string[];
  is_free: boolean;
  language: string;
  complexity_level: number;
  average_rating?: number;
}

export interface Category {
  id: string;
  name: string;
  parent_id?: string;
}

export interface Rating {
  id: string;
  tool_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'system';
  timestamp: string;
}

export interface UserPreferences {
  purpose?: 'efficiency' | 'quality' | 'fun' | 'assessment';
  contentType?: 'image' | 'video' | 'audio' | 'text';
  complexity?: 1 | 2 | 3 | 4 | 5;
  language?: string;
} 