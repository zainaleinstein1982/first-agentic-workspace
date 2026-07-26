import { useState, useEffect, useCallback } from 'react';
import { supabase, Channel, Message, Agent, KnowledgeItem } from '@/lib/supabase';

// 1. HOOK CHANNELS
export function useChannels() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('channels').select('*').order('created_at').then(({ data }) => {
      if (data) setChannels(data as Channel[]);
      setLoading(false);
    });
  }, []);

  return { channels, loading };
}

// 2. HOOK MESSAGES (Sudah Dioptimalkan)
export function useMessages(channelId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = useCallback(async (id: string) => {
    setLoading(true);
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('channel_id', id)
      .order('created_at', { ascending: true });
    
    if (data) setMessages(data as Message[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!channelId) return;
    fetchMessages(channelId);

    // Realtime listener Supabase
    const sub = supabase
      .channel(`messages:${channelId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `channel_id=eq.${channelId}` },
        (payload) => {
          setMessages((prev) => {
            // Hindari pesan duplikat jika sudah ter-insert dari response lokal
            if (prev.some(m => m.id === payload.new.id)) return prev;
            return [...prev, payload.new as Message];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(sub);
    };
  }, [channelId, fetchMessages]);

  // Fungsi kirim pesan USER (channelId diambil langsung dari parameter hook)
  const sendMessage = useCallback(
    async (
      content: string, 
      senderName: string = 'Asih Winarti', 
      messageType: Message['message_type'] = 'text', 
      metadata?: Record<string, unknown>
    ) => {
      if (!channelId) return null;

      const { data, error } = await supabase.from('messages').insert({
        channel_id: channelId,
        sender_type: 'user',
        sender_name: senderName,
        content,
        message_type: messageType,
        metadata: metadata ?? null,
      }).select().maybeSingle();

      if (error) console.error('Error sending message:', error);
      return data as Message | null;
    },
    [channelId]
  );

  // Fungsi kirim pesan AGENT (channelId diambil langsung dari parameter hook)
  const sendAgentMessage = useCallback(
    async (
      agentName: string, 
      content: string, 
      messageType: Message['message_type'] = 'text', 
      metadata?: Record<string, unknown>
    ) => {
      if (!channelId) return null;

      const { data, error } = await supabase.from('messages').insert({
        channel_id: channelId,
        sender_type: 'agent',
        sender_name: agentName,
        content,
        message_type: messageType,
        metadata: metadata ?? null,
      }).select().maybeSingle();

      if (error) console.error('Error sending agent message:', error);
      return data as Message | null;
    },
    [channelId]
  );

  return { messages, loading, sendMessage, sendAgentMessage };
}

// 3. HOOK AGENTS
export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('agents').select('*').order('created_at').then(({ data }) => {
      if (data) setAgents(data as Agent[]);
      setLoading(false);
    });
  }, []);

  return { agents, loading };
}

// 4. HOOK KNOWLEDGE
export function useKnowledge(categoryFilter?: string | null) {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchKnowledge = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('knowledge_items').select('*').order('updated_at', { ascending: false });

    // Jika ada filter kategori, saring datanya
    if (categoryFilter && categoryFilter !== 'Company Brain') {
      query = query.ilike('category', `%${categoryFilter}%`);
    }

    const { data } = await query;
    if (data) setItems(data as KnowledgeItem[]);
    setLoading(false);
  }, [categoryFilter]);

  useEffect(() => {
    fetchKnowledge();
  }, [fetchKnowledge]);

  const addKnowledgeItem = async (title: string, category: string, content: string) => {
    const { data, error } = await supabase.from('knowledge_items').insert({
      title,
      category,
      content,
      updated_at: new Date().toISOString()
    }).select().maybeSingle();

    if (error) console.error('Error adding knowledge item:', error);

    if (data) {
      setItems((prev) => [data as KnowledgeItem, ...prev]);
    }
    return data as KnowledgeItem | null;
  };

  return { items, loading, refetch: fetchKnowledge, addKnowledgeItem };
}
