import React, { useState, useEffect } from 'react';
import { 
  Hash, 
  Layers, 
  Code, 
  Box, 
  TrendingUp, 
  BarChart, 
  BookOpen, 
  Send, 
  Bot, 
  User, 
  Brain, 
  MessageSquare, 
  FileText, 
  MoreVertical,
  Sparkles,
  ListTodo,
  Users,
  Compass
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const iconMap: Record<string, React.ElementType> = {
  Layers, Hash, Code, Box, TrendingUp, BarChart, BookOpen
};

// ==========================================
// KOMPONEN UTAMA APPLICATION (App)
// ==========================================
export default function App() {
  const [channels, setChannels] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [knowledgeItems, setKnowledgeItems] = useState<any[]>([]);
  const [activeChannel, setActiveChannel] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // Sample tasks untuk sidebar kanan
  const [tasks] = useState([
    { id: '1', title: 'Verifikasi Sekuens Blok 4C', assignedTo: 'Atlas', status: 'In Progress', priority: 'High' },
    { id: '2', title: 'KRI Operational Risk Review', assignedTo: 'Iris', status: 'Completed', priority: 'Medium' },
    { id: '3', title: 'PromptQL Data Extraction', assignedTo: 'Echo', status: 'Pending', priority: 'Low' }
  ]);

  // Load Initial Data dari Supabase
  useEffect(() => {
    async function loadData() {
      const { data: channelsData } = await supabase.from('channels').select('*').order('created_at', { ascending: true });
      if (channelsData && channelsData.length > 0) {
        setChannels(channelsData);
        setActiveChannel(channelsData[0]);
      }

      const { data: agentsData } = await supabase.from('agents').select('*');
      if (agentsData) setAgents(agentsData);

      const { data: knowledgeData } = await supabase.from('knowledge_items').select('*');
      if (knowledgeData) setKnowledgeItems(knowledgeData);
    }
    loadData();
  }, []);

  // Fetch Messages saat activeChannel berubah
  useEffect(() => {
    async function fetchMessages() {
      if (!activeChannel) return;
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('channel_id', activeChannel.id)
        .order('created_at', { ascending: true });
      if (data) setMessages(data);
    }
    fetchMessages();
  }, [activeChannel]);

  // Handle Send Message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChannel) return;

    const msgObj = {
      channel_id: activeChannel.id,
      sender_type: 'user',
      sender_name: 'Asih Winarti',
      content: newMessage,
      message_type: 'text'
    };

    const { data } = await supabase.from('messages').insert([msgObj]).select();
    if (data) {
      setMessages((prev) => [...prev, data[0]]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {/* 1. SIDEBAR KIRI: NAVIGATION, CHANNELS, AI AGENTS, KNOWLEDGE BRAIN */}
      <aside className="w-64 bg-slate-900/90 border-r border-slate-800 flex flex-col justify-between overflow-y-auto">
        <div className="p-3 space-y-5">
          
          {/* Logo / Title Workspace */}
          <div className="flex items-center gap-2 px-2 py-1.5 border-b border-slate-800/80 pb-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-extrabold text-sm tracking-wider text-slate-100">
              SBLC WORKSPACE
            </span>
          </div>

          {/* MENU ATAS (NAVIGASI SEBELUM CHANNELS) */}
          <div className="space-y-0.5">
            <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800/60 transition-colors">
              <Compass size={14} className="text-slate-400" />
              <span>Overview</span>
            </button>
            <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800/60 transition-colors">
              <Users size={14} className="text-slate-400" />
              <span>Team Directory</span>
            </button>
          </div>

          {/* SECTION 1: CHANNELS */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase px-3 py-1 tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1"><MessageSquare size={12} /> Channels</span>
            </div>
            {channels.map((channel) => {
              const IconComp = iconMap[channel.icon] || Hash;
              const isActive = activeChannel?.id === channel.id;
              return (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel)}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <IconComp size={14} />
                  <span className="truncate"># {channel.name}</span>
                </button>
              );
            })}
          </div>

          {/* SECTION 2: AI AGENTS */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase px-3 py-1 tracking-wider flex items-center gap-1">
              <Bot size={12} /> AI Agents
            </div>
            {agents.map((agent) => (
              <div 
                key={agent.id}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800/40 cursor-pointer"
              >
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: agent.avatar_color || '#3B82F6' }} 
                />
                <span className="truncate font-medium">{agent.name}</span>
              </div>
            ))}
          </div>

          {/* SECTION 3: KNOWLEDGE BRAIN */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase px-3 py-1 tracking-wider flex items-center gap-1">
              <Brain size={12} /> Knowledge Brain
            </div>
            {knowledgeItems.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:bg-slate-800/40 cursor-pointer group"
              >
                <div className="flex items-center gap-2 truncate pr-1">
                  <FileText size={13} className="text-slate-500 shrink-0" />
                  <span className="truncate">{item.title}</span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-500 hover:text-slate-200 transition-opacity">
                  <MoreVertical size={13} />
                </button>
              </div>
            ))}
          </div>

        </div>

        {/* User Info Footer */}
        <div className="p-3 border-t border-slate-800 flex items-center gap-3 bg-slate-950/40">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
            AW
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-200">Asih Winarti</span>
            <span className="text-[10px] text-slate-500">PMO / Planner</span>
          </div>
        </div>
      </aside>

      {/* 2. AREA UTAMA (MIDDLE: CHAT ROOM AREA) */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-900/40 p-6 space-y-4">
        
        {/* Header Channel Aktif */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Hash size={18} className="text-blue-400" />
            <h1 className="text-sm font-bold text-slate-100">
              {activeChannel?.name || 'general'}
            </h1>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Supabase Realtime Sync</span>
        </div>

        {/* Content Scrollable Area (Hanya Percakapan Chat) */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          <div className="space-y-3">
            {messages.length === 0 ? (
              <div className="text-xs text-slate-500 italic py-4 text-center">
                Belum ada percakapan di #{activeChannel?.name}. Kirim pesan pertama di bawah.
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3 text-xs">
                  <div className={`p-1.5 rounded-lg ${msg.sender_type === 'agent' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                    {msg.sender_type === 'agent' ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200">{msg.sender_name}</span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="text-slate-300 leading-relaxed bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Form Input Chat */}
        <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-slate-800/80">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Kirim pesan di #${activeChannel?.name || 'channel'}...`}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500/50"
          />
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Send size={13} /> Kirim
          </button>
        </form>
      </main>

      {/* 3. SIDEBAR KANAN: AI AGENTS OVERVIEW & ACTIVE TASKS */}
      <aside className="w-72 bg-slate-900/90 border-l border-slate-800 p-4 flex flex-col gap-6 overflow-y-auto">
        
        {/* PANEL AI AGENTS STATUS */}
        <div className="space-y-3">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={13} className="text-blue-400" /> Workspace Agents
          </div>

          <div className="space-y-2.5">
            {agents.map((agent) => (
              <div 
                key={agent.id} 
                className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: agent.avatar_color || '#3B82F6' }} 
                    />
                    <span className="text-xs font-bold text-slate-200">{agent.name}</span>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 capitalize">
                    {agent.status || 'active'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  {agent.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL ACTIVE TASKS */}
        <div className="space-y-3">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ListTodo size={13} className="text-emerald-400" /> Assigned Tasks
          </div>

          <div className="space-y-2">
            {tasks.map((task) => (
              <div 
                key={task.id}
                className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3 space-y-1"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-200 truncate">{task.title}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                    task.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {task.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span>Agent: <strong className="text-slate-400">{task.assignedTo}</strong></span>
                  <span>Priority: {task.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </aside>

    </div>
  );
}
