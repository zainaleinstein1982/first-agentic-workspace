import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Channel = {
  id: string;
  name: string;
  description: string | null;
  type: 'channel' | 'agent' | 'dm';
  icon: string | null;
  created_at: string;
};

export type Message = {
  id: string;
  channel_id: string;
  sender_type: 'user' | 'agent' | 'system';
  sender_name: string;
  sender_avatar: string | null;
  content: string;
  message_type: 'text' | 'query_result' | 'dashboard' | 'sop' | 'task';
  metadata: Record<string, unknown> | null;
  created_at: string;
};

export type Agent = {
  id: string;
  name: string;
  description: string | null;
  role: string | null;
  status: 'active' | 'idle' | 'busy';
  capabilities: string[];
  avatar_color: string;
  created_at: string;
};

export type KnowledgeItem = {
  id: string;
  title: string;
  content: string;
  category: string | null;
  source: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
};
