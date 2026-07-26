import React, { useState, useEffect } from 'react';
import { 
  Star, 
  ChevronLeft, 
  Circle, 
  Triangle, 
  Square, 
  Search,
  LayoutGrid,
  List as ListIcon,
  Clock,
  BarChart2,
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
  Sparkles
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase Client (Menyesuaikan dengan env/config Anda)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// 1. DATA MILESTONE SBLC
// ==========================================
const milestoneData = [
  {
    id: 'edc',
    code: 'EDC',
    label: 'EDC - Effective...',
    year: '2026',
    icon: Star,
    color: 'text-amber-400',
    bgColor: 'bg-amber-400',
    position: '18%',
  },
  {
    id: 'fsc',
    code: 'FSC',
    label: 'FSC - First Ste...',
    year: '2027',
    icon: ChevronLeft,
    color: 'text-slate-400',
    bgColor: 'bg-slate-400',
    position: '42%',
  },
  {
    id: 'kl',
    code: 'KL',
    label: 'KL - Keel Laying',
    year: '2027',
    icon: Circle,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500',
    position: '54%',
  },
  {
    id: 'l',
    code: 'L (Launching)',
    label: 'L - Launching',
    year: '2027',
    icon: Triangle,
    color: 'text-blue-600',
    bgColor: 'bg-blue-600',
    position: '70%',
    rotateIcon: 'rotate-180',
  },
  {
    id: 'hat',
    code: 'HAT & SAT',
    label: 'HAT & SAT - Har...',
    year: '2028',
    icon: Square,
    color: 'text-red-500',
    bgColor: 'bg-red-500',
    position: '82%',
  },
  {
    id: 'd',
    code: 'D (Delivery)',
    label: 'D - Delivery',
    year: '2028',
    icon: Star,
    color: 'text-red-500',
    bgColor: 'bg-red-500',
    position: '92%',
  },
];

// Map Icon untuk Sidebar Channels
const iconMap: Record<string, React.ElementType> = {
  Layers,
  Hash,
  Code,
  Box,
  TrendingUp,
  BarChart,
  BookOpen
};

// ==========================================
// 2. KOMPONEN DASHBOARD MILESTONE SBLC
// ==========================================
export const MilestoneDashboard: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-5 p-2 font-sans text-slate-100">
      
      {/* KARTU UTAMA: DIAGRAM MILESTONE SBLC */}
      <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-6 shadow-xl backdrop-blur-md">
        
        {/* Header Diagram */}
        <div className="mb-6 space-y-1">
          <h2 className="text-lg font-bold text-white tracking-wide">
            Diagram Milestone SBLC
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Otomatis dari tugas yang punya field <strong className="text-slate-300">Epic</strong> (nama proyek) dan <strong className="text-slate-300">Tanggal mulai</strong> — tambahkan proyek/milestone baru di Board/List, diagram ini akan ikut bertambah.
          </p>
        </div>

        {/* Area Timeline Visual */}
        <div className="relative my-10 px-4 py-8">
          
          {/* Label Tahun (Header Timeline) */}
          <div className="absolute -top-6 w-full flex justify-between text-xs font-semibold text-slate-400 border-b border-dashed border-slate-800/40 pb-2">
            <span className="ml-[16%]">2026</span>
            <span className="ml-[10%]">2027</span>
            <span className="mr-[8%]">2028</span>
          </div>

          {/* Label Proyek Utama di Sisi Kiri */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 font-extrabold text-sm text-slate-200 tracking-wider">
            SBLC 2026
          </div>

          {/* Garis Dasar Timeline (Dotted Line) */}
          <div className="ml-28 relative h-10 flex items-center">
            <div className="w-full border-b-2 border-dotted border-slate-600/60" />

            {/* Garis Pembatas Tahun (Vertical Separator) */}
            <div className="absolute left-[38%] top-0 bottom-0 border-l border-dashed border-slate-600/50" />

            {/* Iterasi Milestone Marker */}
            {milestoneData.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="absolute flex flex-col items-center -translate-x-1/2 group cursor-pointer"
                  style={{ left: item.position }}
                >
                  {/* Label Teks di Atas Pin */}
                  <span className="text-[11px] font-mono text-slate-300 mb-2 whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
                    {item.label}
                  </span>

                  {/* Icon Node Visual */}
                  <div className="bg-slate-950 p-1 rounded-full z-10 transition-transform group-hover:scale-125">
                    <IconComponent 
                      size={14} 
                      className={`${item.color} fill-current ${item.rotateIcon || ''}`} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend / Keterangan Simbol Milestone */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-800/60 text-xs text-slate-300 ml-28">
          {milestoneData.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="flex items-center gap-2">
                <IconComponent 
                  size={13} 
                  className={`${item.color} fill-current ${item.rotateIcon || ''}`} 
                />
                <span className="font-mono text-[11px]">{item.code}</span>
              </div>
            );
          })}
        </div>

      </div>

      {/* GRID KARTU STATISTIK TUGAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Completed Tasks
          </div>
          <div className="text-3xl font-extrabold text-white mt-3">3</div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Incomplete Tasks
          </div>
          <div className="text-3xl font-extrabold text-white mt-3">3</div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Overdue Tasks
          </div>
          <div className="text-3xl font-extrabold text-white mt-3">0</div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Total Tasks
          </div>
          <div className="text-3xl font-extrabold text-white mt-3">6</div>
        </div>
      </div>

    </div>
  );
};

// ==========================================
// 3. KOMPONEN UTAMA APPLICATION (App)
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState<'board' | 'list' | 'timeline' | 'dashboard'>('dashboard');
  const [channels, setChannels] = useState<any[]>([]);
  const [activeChannelId, setActiveChannelId] = useState<string>('10000000-0000-0000-0000-000000000001');
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // Load Channels dari Supabase
  useEffect(() => {
    async function fetchChannels() {
      const { data, error } = await supabase.from('channels').select('*').order('created_at', { ascending: true });
      if (!error && data && data.length > 0) {
        setChannels(data);
      }
    }
    fetchChannels();
  }, []);

  // Load Messages sesuai Channel yang Aktif
  useEffect(() => {
    async function fetchMessages() {
      if (!activeChannelId) return;
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('channel_id', activeChannelId)
        .order('created_at', { ascending: true });
      if (!error && data) {
        setMessages(data);
      }
    }
    fetchMessages();
  }, [activeChannelId]);

  // Handle Kirim Pesan
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msgObj = {
      channel_id: activeChannelId,
      sender_type: 'user',
      sender_name: 'Asih Winarti',
      content: newMessage,
      message_type: 'text'
    };

    const { data, error } = await supabase.from('messages').insert([msgObj]).select();
    if (!error && data) {
      setMessages((prev) => [...prev, data[0]]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between">
        <div>
          {/* Logo / Header Workspace */}
          <div className="p-4 border-b border-slate-800 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-extrabold text-sm tracking-wider text-slate-100">
              SBLC WORKSPACE
            </span>
          </div>

          {/* List Channel */}
          <div className="p-3 space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase px-3 py-1 tracking-wider">
              Channels
            </div>
            {channels.map((channel) => {
              const IconComp = iconMap[channel.icon] || Hash;
              const isActive = channel.id === activeChannelId;
              return (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannelId(channel.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <IconComp size={15} />
                  <span className="truncate"># {channel.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* User Info / Footer Sidebar */}
        <div className="p-4 border-t border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
            AW
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-200">Asih Winarti</span>
            <span className="text-[10px] text-slate-400">PMO / Planner</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-900/50">
        
        {/* TOP BAR / NAVIGATION HEADER (Sesuai Screenshot kanban.pro) */}
        <header className="bg-slate-950 border-b border-slate-800 px-6 py-3 flex flex-col gap-3">
          
          {/* Baris 1: Brand & Search Input */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-blue-500 font-mono font-bold text-base">&gt;_</span>
              <h1 className="font-bold text-base tracking-wide text-slate-100 font-mono">
                kanban<span className="text-blue-400">.pro</span>
              </h1>
              <span className="text-xs text-slate-500 font-mono ml-2">local-first board</span>
            </div>

            {/* Input Search */}
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <input 
                type="text" 
                placeholder="Cari tugas..." 
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-8 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 border border-slate-700 rounded px-1.5 py-0.5 text-[9px] text-slate-400 font-mono">
                /
              </span>
            </div>
          </div>

          {/* Baris 2: Tabs (Board, List, Timeline, Dashboard) */}
          <div className="flex items-center gap-6 text-xs font-medium border-b border-slate-800/80 -mb-3 pb-2">
            <button 
              onClick={() => setActiveTab('board')}
              className={`flex items-center gap-1.5 pb-2 border-b-2 transition-colors ${
                activeTab === 'board' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid size={14} /> Board
            </button>

            <button 
              onClick={() => setActiveTab('list')}
              className={`flex items-center gap-1.5 pb-2 border-b-2 transition-colors ${
                activeTab === 'list' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <ListIcon size={14} /> List
            </button>

            <button 
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-1.5 pb-2 border-b-2 transition-colors ${
                activeTab === 'timeline' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock size={14} /> Timeline
            </button>

            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 pb-2 border-b-2 transition-colors ${
                activeTab === 'dashboard' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart2 size={14} /> Dashboard
            </button>
          </div>

          {/* Baris 3: Indikator Project Tag */}
          <div className="flex items-center gap-2 pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs text-slate-300 font-semibold">
              sblc-2026-milestones
            </span>
            <span className="text-xs text-slate-500 font-mono">.kanban</span>
          </div>
        </header>

        {/* TAMPILAN KONTEN UTAMA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB DASHBOARD: MENAMPILKAN DIAGRAM MILESTONE */}
          {activeTab === 'dashboard' && <MilestoneDashboard />}

          {/* TAMPILAN TAB LAIN (Halaman Sementara) */}
          {activeTab !== 'dashboard' && (
            <div className="h-64 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
              <span>Halaman <strong className="text-slate-300 capitalize">{activeTab}</strong> sedang dikembangkan</span>
            </div>
          )}

          {/* SKETSA AREA INTERAKSI CHAT / REALTIME MESSAGES (SUPABASE INTEGRATED) */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Hash size={16} className="text-blue-400" />
                <span className="text-xs font-bold text-slate-200">
                  {channels.find(c => c.id === activeChannelId)?.name || 'sblc-shipbuilding-planning'}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Supabase Realtime Sync</span>
            </div>

            {/* List Pesan Chat */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {messages.length === 0 ? (
                <div className="text-xs text-slate-500 italic py-2">Belum ada pesan di channel ini.</div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3 text-xs">
                    <div className={`p-1.5 rounded-lg ${msg.sender_type === 'agent' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                      {msg.sender_type === 'agent' ? <Bot size={14} /> : <User size={14} />}
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-200">{msg.sender_name}</span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-2 rounded border border-slate-800/50">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Chat */}
            <form onSubmit={handleSendMessage} className="flex gap-2 pt-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Kirim instruksi atau pertanyaan ke agen..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500/50"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Send size={13} /> Kirim
              </button>
            </form>
          </div>

        </div>

      </main>
    </div>
  );
}
