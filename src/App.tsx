import React, { useState, useEffect } from 'react';
import { 
  Hash, Layers, Code, Box, TrendingUp, BarChart, BookOpen, Send, Bot, User, 
  Brain, MessageSquare, FileText, MoreVertical, Sparkles, Search, Plus, Zap, 
  Users, Settings, X, PlusCircle, Play, AlertTriangle, Database, CheckCircle2 
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { sblcDataDummy, promptQLSimulations, channelInitialMessages } from './mockData';

// Setup Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const iconMap: Record<string, React.ElementType> = {
  Layers, Hash, Code, Box, TrendingUp, BarChart, BookOpen
};

// Data Dummy Knowledge Brain
const brainKnowledgeList = [
  {
    id: 'kb-1',
    title: 'SBLC Standard Operating Procedure',
    category: 'Shipbuilding Governance',
    updatedAt: '2026-03-12',
    snippet: 'Pedoman alur sekuens perakitan blok kapal, kriteria toleransi deviasi jadwal, dan matriks eskalasi keterlambatan.'
  },
  {
    id: 'kb-2',
    title: 'Shipyard KRI Risk Framework',
    category: 'Risk Management',
    updatedAt: '2026-03-20',
    snippet: 'Matriks pembobotan Key Risk Indicators (KRI) untuk dampak biaya USD dan durasi delay per blok produksi.'
  },
  {
    id: 'kb-3',
    title: 'Project Governance & CAPM Guidelines',
    category: 'PMO Standards',
    updatedAt: '2026-02-15',
    snippet: 'Standar pelaporan mingguan status proyek, pemantauan pencapaian progres fisik vs rencana.'
  }
];

export default function App() {
  const [channels, setChannels] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [activeChannel, setActiveChannel] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  // State Navigasi Sidebar Kanan (Agents vs Brain)
  const [rightTab, setRightTab] = useState<'agents' | 'brain'>('agents');
  const [isExecutingPromptQL, setIsExecutingPromptQL] = useState(false);

  // State Quick Actions Modal
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);

  // State dinamis data SBLC
  const [blocksData, setBlocksData] = useState<any[]>(sblcDataDummy);

  useEffect(() => {
    async function loadData() {
      const { data: channelsData } = await supabase.from('channels').select('*').order('created_at', { ascending: true });
      if (channelsData && channelsData.length > 0) setChannels(channelsData);

      const { data: agentsData } = await supabase.from('agents').select('*');
      if (agentsData && agentsData.length > 0) setAgents(agentsData);
    }
    loadData();
  }, []);

  // Fetch & Synchronize Messages per Channel (Diperbaiki agar tidak terduplikasi)
  useEffect(() => {
    async function fetchMessages() {
      if (!activeChannel) return;
      const channelName = activeChannel.name;
      const initialMsgs = channelInitialMessages[channelName] || [];

      try {
        const { data } = await supabase
          .from('messages')
          .select('*')
          .eq('channel_id', activeChannel.id)
          .order('created_at', { ascending: true });

        if (data && data.length > 0) {
          setMessages(data);
        } else {
          setMessages(initialMsgs);
        }
      } catch (err) {
        setMessages(initialMsgs);
      }
    }
    fetchMessages();
  }, [activeChannel]);

  const handleRunPromptQL = () => {
    if (!activeChannel) return;
    setIsExecutingPromptQL(true);

    setTimeout(() => {
      const userMsg = {
        id: Date.now().toString(),
        channel_id: activeChannel.id,
        sender_type: 'user',
        sender_name: 'BaZain',
        content: `RUN PROMPTQL: Jalankan pipeline analisis otomatis pada channel #${activeChannel.name}.`,
        created_at: new Date().toISOString()
      };

      const agentResponseText = promptQLSimulations[activeChannel.name] || promptQLSimulations.general;

      const agentMsg = {
        id: (Date.now() + 1).toString(),
        channel_id: activeChannel.id,
        sender_type: 'agent',
        sender_name: 'PromptQL Orchestrator',
        content: agentResponseText,
        created_at: new Date().toISOString()
      };

      setMessages((prev) => [...prev, userMsg, agentMsg]);
      setIsExecutingPromptQL(false);
    }, 1200);
  };

  const handleSelectQuickAction = (actionText: string) => {
    setIsQuickActionsOpen(false);
    if (!activeChannel) {
      setActiveChannel({ id: 'engineering', name: 'engineering' });
    }
    setNewMessage(actionText);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChannel) return;

    const userText = newMessage.trim();

    const userObj = {
      id: Date.now().toString(),
      channel_id: activeChannel.id,
      sender_type: 'user',
      sender_name: 'BaZain',
      content: userText,
      created_at: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userObj]);
    setNewMessage('');

    const lowerText = userText.toLowerCase();

    if (
      activeChannel.name === 'engineering' && 
      (lowerText.includes('input data') || lowerText.includes('input blok') || lowerText.includes('+ input'))
    ) {
      setTimeout(() => {
        const botTemplate = {
          id: (Date.now() + 1).toString(),
          channel_id: activeChannel.id,
          sender_type: 'agent',
          sender_name: 'Raffasya (Process Agent)',
          content: `Silakan salin templat di bawah ini, sesuaikan nilainya, lalu kirimkan kembali ke chat:\n\n` +
            `blockId: 'Blok 6B (Sub-Assembly)',\n` +
            `plannedProgress: 80,\n` +
            `actualProgress: 60,\n` +
            `delayDays: 8,\n` +
            `riskLevel: 'High',\n` +
            `kriIndicator: 'Keterlambatan Supply Material Plate',\n` +
            `costImpactUSD: 18000`,
          created_at: new Date().toISOString()
        };
        setMessages((prev) => [...prev, botTemplate]);
      }, 600);
      return;
    }

    if (
      activeChannel.name === 'engineering' && 
      (lowerText.includes('edit data') || lowerText.includes('edit blok') || lowerText.includes('- edit'))
    ) {
      setTimeout(() => {
        const editTemplate = {
          id: (Date.now() + 1).toString(),
          channel_id: activeChannel.id,
          sender_type: 'agent',
          sender_name: 'Raffasya (Process Agent)',
          content: `Silakan salin templat di bawah ini, sesuaikan nilainya, lalu kirimkan kembali ke chat:\n\n` +
            `blockId: 'Blok 3B (Painting)',\n` +
            `plannedProgress: 90,\n` +
            `actualProgress: 78,\n` +
            `delayDays: 7,\n` +
            `riskLevel: 'High',\n` +
            `kriIndicator: 'Keterlambatan Pipa Main Engine',\n` +
            `costImpactUSD: 22000`,
          created_at: new Date().toISOString()
        };
        setMessages((prev) => [...prev, editTemplate]);
      }, 600);
      return;
    }

    if (userText.includes('blockId:') && userText.includes('kriIndicator:')) {
      try {
        const blockIdMatch = userText.match(/blockId:\s*['"]([^'"]+)['"]/);
        const plannedMatch = userText.match(/plannedProgress:\s*(\d+)/);
        const actualMatch = userText.match(/actualProgress:\s*(\d+)/);
        const delayMatch = userText.match(/delayDays:\s*(\d+)/);
        const riskMatch = userText.match(/riskLevel:\s*['"]([^'"]+)['"]/);
        const kriMatch = userText.match(/kriIndicator:\s*['"]([^'"]+)['"]/);
        const costMatch = userText.match(/costImpactUSD:\s*(\d+)/);

        if (blockIdMatch && kriMatch) {
          const newBlockObj = {
            blockId: blockIdMatch[1],
            plannedProgress: plannedMatch ? Number(plannedMatch[1]) : 0,
            actualProgress: actualMatch ? Number(actualMatch[1]) : 0,
            delayDays: delayMatch ? Number(delayMatch[1]) : 0,
            riskLevel: riskMatch ? riskMatch[1] : 'Medium',
            kriIndicator: kriMatch[1],
            costImpactUSD: costMatch ? Number(costMatch[1]) : 0,
          };

          let isUpdated = false;

          setBlocksData((prev) => {
            const existsIndex = prev.findIndex(
              (b) => b.blockId.toLowerCase().trim() === newBlockObj.blockId.toLowerCase().trim()
            );

            if (existsIndex !== -1) {
              isUpdated = true;
              const updatedList = [...prev];
              updatedList[existsIndex] = newBlockObj;
              return updatedList;
            } else {
              return [...prev, newBlockObj];
            }
          });

          setTimeout(() => {
            const botConfirm = {
              id: (Date.now() + 1).toString(),
              channel_id: activeChannel.id,
              sender_type: 'agent',
              sender_name: 'Iris (Data Agent)',
              content: isUpdated 
                ? `✏️ Data **${newBlockObj.blockId}** berhasil diperbarui pada SBLC Risk Stream!`
                : `✅ Data **${newBlockObj.blockId}** berhasil ditambahkan ke dalam SBLC Risk Stream!`,
              created_at: new Date().toISOString()
            };
            setMessages((prev) => [...prev, botConfirm]);
          }, 800);
          return;
        }
      } catch (err) {
        console.error("Gagal parsing input blok", err);
      }
    }

    setTimeout(() => {
      const aiReply = {
        id: (Date.now() + 1).toString(),
        channel_id: activeChannel.id,
        sender_type: 'agent',
        sender_name: 'Atlas (Knowledge Agent)',
        content: `Pesan diterima. Data diproses melalui pipeline PromptQL pada workspace #${activeChannel.name}.`,
        created_at: new Date().toISOString()
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-[#0b0f19] text-slate-100 font-sans overflow-hidden">
      
      {/* MODAL QUICK ACTIONS */}
      {isQuickActionsOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#101625] border border-slate-800 rounded-xl w-full max-w-md p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 text-amber-400">
                <Zap size={18} />
                <h3 className="font-bold text-sm text-white">Quick Actions</h3>
              </div>
              <button onClick={() => setIsQuickActionsOpen(false)} className="text-slate-500 hover:text-slate-300 cursor-pointer">
                <X size={16} />
              </button>
            </div>
            
            <p className="text-xs text-slate-400">Pilih tindakan cepat untuk langsung berinteraksi dengan AI Agent:</p>

            <div className="space-y-2">
              <button 
                onClick={() => handleSelectQuickAction('+ Input Data Blok')}
                className="w-full text-left p-3 rounded-lg bg-[#161f33] hover:bg-blue-600/20 border border-slate-800 hover:border-blue-500/50 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-blue-400">+ Input Data Blok SBLC</div>
                  <div className="text-[10px] text-slate-400">Minta templat untuk menambahkan data sekuens blok baru</div>
                </div>
                <Plus size={14} className="text-slate-500 group-hover:text-blue-400" />
              </button>

              <button 
                onClick={() => handleSelectQuickAction('- Edit Data Blok')}
                className="w-full text-left p-3 rounded-lg bg-[#161f33] hover:bg-amber-600/20 border border-slate-800 hover:border-amber-500/50 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-400">- Edit Data Blok SBLC</div>
                  <div className="text-[10px] text-slate-400">Minta templat untuk memperbarui data blok yang sudah ada</div>
                </div>
                <FileText size={14} className="text-slate-500 group-hover:text-amber-400" />
              </button>

              <button 
                onClick={() => handleSelectQuickAction('Jalankan analisis risiko KRI terkini')}
                className="w-full text-left p-3 rounded-lg bg-[#161f33] hover:bg-emerald-600/20 border border-slate-800 hover:border-emerald-500/50 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-emerald-400">⚡ Ringkasan Risiko KRI Terbaru</div>
                  <div className="text-[10px] text-slate-400">Instruksikan Atlas & Iris untuk membuat kalkulasi risiko</div>
                </div>
                <Sparkles size={14} className="text-slate-500 group-hover:text-emerald-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. SIDEBAR KIRI */}
      <aside className="w-64 bg-[#0d121f] border-r border-slate-800/60 flex flex-col justify-between shrink-0">
        <div className="p-3 space-y-4 overflow-y-auto">
          
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
              <Sparkles size={18} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-white tracking-wide leading-tight">
                Raffasya
              </span>
              <span className="text-[10px] text-slate-400">
                AI Agentic Workspace
              </span>
            </div>
          </div>

          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search workspace..." 
              className="w-full bg-[#13192b] border border-slate-800/80 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
            />
          </div>

          <div className="space-y-0.5 pt-1">
            <button 
              onClick={() => setIsQuickActionsOpen(true)}
              className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all cursor-pointer"
            >
              <Zap size={14} className="text-amber-400" />
              <span>Quick Actions</span>
            </button>
            <button className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:bg-slate-800/50 transition-colors">
              <Users size={14} className="text-blue-400" />
              <span>Team Chat</span>
            </button>
          </div>

          {/* CHANNELS */}
          <div className="space-y-1 pt-2">
            <div className="text-[10px] font-bold text-slate-500 uppercase px-2 py-1 tracking-wider flex items-center justify-between">
              <span>CHANNELS</span>
            </div>
            
            {channels.length === 0 ? (
              ['general', 'engineering', 'product', 'marketing', 'data-insights', 'onboarding'].map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveChannel({ id: c, name: c })}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeChannel?.name === c
                      ? 'bg-blue-600/20 text-blue-400 font-semibold'
                      : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                  }`}
                >
                  <Hash size={14} />
                  <span className="truncate">{c}</span>
                </button>
              ))
            ) : (
              channels.map((channel) => {
                const IconComp = iconMap[channel.icon] || Hash;
                const isActive = activeChannel?.id === channel.id;
                return (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-blue-600/20 text-blue-400 font-semibold'
                        : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                    }`}
                  >
                    <IconComp size={14} />
                    <span className="truncate">{channel.name}</span>
                  </button>
                );
              })
            )}

            <button className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
              <Plus size={14} />
              <span>Add channel</span>
            </button>
          </div>

          {/* AI AGENTS */}
          <div className="space-y-1 pt-2">
            <div className="text-[10px] font-bold text-slate-500 uppercase px-2 py-1 tracking-wider flex items-center justify-between">
              <span>AI AGENTS</span>
            </div>
            {[
              { name: 'Atlas', color: 'bg-emerald-500' },
              { name: 'Iris', color: 'bg-blue-500' },
              { name: 'Echo', color: 'bg-purple-500' },
              { name: 'Raffasya', color: 'bg-amber-500' }
            ].map((ag) => (
              <div key={ag.name} className="flex items-center justify-between px-2.5 py-1.5 text-xs text-slate-400 hover:bg-slate-800/40 rounded-md cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-slate-300">
                    {ag.name[0]}
                  </div>
                  <span>{ag.name}</span>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full ${ag.color}`} />
              </div>
            ))}
          </div>

        </div>

        <div className="p-3 border-t border-slate-800/60 flex items-center justify-between bg-[#0a0d16]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs text-white">
              BZ
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-200">BaZain</span>
              <span className="text-[10px] text-slate-500">Workspace Admin</span>
            </div>
          </div>
          <Settings size={14} className="text-slate-500 cursor-pointer hover:text-slate-300" />
        </div>
      </aside>

      {/* 2. AREA UTAMA */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#0a0d16]">
        
        {!activeChannel ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-2xl shadow-blue-500/20 mb-6">
              <Sparkles size={32} className="text-white animate-pulse" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide mb-2">
              Welcome to your AI Workspace
            </h1>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-6">
              Select a channel to start collaborating with your AI agents, or pick a suggested prompt to see the magic.
            </p>
            <button 
              onClick={() => setActiveChannel({ id: 'engineering', name: 'engineering' })}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Hash size={14} /> Open #engineering Channel
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full">
            
            <div className="px-6 py-3.5 border-b border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash size={18} className="text-blue-400" />
                <h2 className="text-sm font-bold text-white">{activeChannel.name}</h2>
              </div>
              
              <button 
                onClick={handleRunPromptQL}
                disabled={isExecutingPromptQL}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-900/30 disabled:opacity-50 cursor-pointer"
              >
                <Play size={12} />
                <span>{isExecutingPromptQL ? 'Executing PromptQL...' : 'Execute PromptQL Pipeline'}</span>
              </button>
            </div>

            {/* CHANNEL CONTEXT BANNER (Memperjelas fungsi tiap Channel) */}
            <div className="px-6 py-2 bg-[#101726] border-b border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>
                  {activeChannel.name === 'engineering' && '🔧 Context: Shipbuilding Sequence (SBLC), Block Assembly & KRI Risk Escalate'}
                  {activeChannel.name === 'data-insights' && '📊 Context: Real-time SQL Queries, Data Warehouse & Financial Dashboards'}
                  {activeChannel.name === 'marketing' && '📢 Context: Marketing Campaigns, Content Strategies & Lead Generation'}
                  {activeChannel.name === 'general' && '🌐 Context: General Team Coordination & Multi-Agent Workspace Discussions'}
                  {!['engineering', 'data-insights', 'marketing', 'general'].includes(activeChannel.name) && `📌 Context Scope: #${activeChannel.name} Dedicated Channel Stream`}
                </span>
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                Active Agents: Atlas, Iris, Raffasya
              </span>
            </div>

            {/* TABEL DATA SBLC (Khusus Channel Engineering) */}
            {activeChannel.name === 'engineering' && (
              <div className="bg-[#0f1524] border-b border-slate-800/80 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <AlertTriangle size={14} className="text-amber-400" />
                    SBLC Real-Time Risk Data (Stream)
                  </span>
                  <span className="text-[10px] text-slate-500">Updated: Just Now</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {blocksData.map((item, idx) => (
                    <div key={item.blockId || idx} className="bg-[#131a2d] p-2.5 rounded-lg border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{item.blockId}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                          item.riskLevel === 'Critical' || item.riskLevel === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {item.riskLevel}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400">{item.kriIndicator}</p>
                      <div className="text-[10px] text-slate-500 flex justify-between pt-1">
                        <span>Delay: <strong className="text-slate-300">{item.delayDays} d</strong></span>
                        <span>Impact: <strong className="text-red-400">${item.costImpactUSD ? item.costImpactUSD.toLocaleString() : 0}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="text-xs text-slate-500 italic py-8 text-center">
                  Belum ada percakapan di #{activeChannel.name}. Klik <strong>Execute PromptQL Pipeline</strong> atau kirim pesan.
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3 text-xs">
                    <div className={`p-1.5 rounded-lg shrink-0 ${msg.sender_type === 'agent' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                      {msg.sender_type === 'agent' ? <Bot size={14} /> : <User size={14} />}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-200">{msg.sender_name}</span>
                        {msg.sender_type === 'agent' && (
                          <span className="text-[9px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                            AI Agent
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500">
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="text-slate-300 leading-relaxed bg-[#0f1524] p-3 rounded-lg border border-slate-800/80 whitespace-pre-wrap font-mono text-[11px]">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Form Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800/60">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Kirim pesan di #${activeChannel.name}...`}
                  className="w-full bg-[#0d121f] border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 pr-24"
                />
                <button 
                  type="submit" 
                  className="absolute right-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Send size={12} /> Kirim
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      {/* 3. SIDEBAR KANAN (AKSI TAB AGENTS / BRAIN) */}
      <aside className="w-80 bg-[#0d121f] border-l border-slate-800/60 flex flex-col shrink-0">
        
        <div className="p-3 border-b border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-1 bg-[#13192b] p-0.5 rounded-lg border border-slate-800/60 text-xs">
            <button 
              type="button"
              onClick={() => setRightTab('agents')}
              className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                rightTab === 'agents' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Agents
            </button>
            <button 
              type="button"
              onClick={() => setRightTab('brain')}
              className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                rightTab === 'brain' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Brain
            </button>
          </div>
          <X size={14} className="text-slate-500 cursor-pointer hover:text-slate-300" />
        </div>

        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          
          {rightTab === 'agents' ? (
            <>
              <button className="w-full border border-dashed border-slate-800 hover:border-slate-700 bg-[#101625] text-slate-300 rounded-lg py-2.5 px-3 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer">
                <PlusCircle size={14} className="text-slate-400" />
                <span>Deploy new agent</span>
              </button>

              <div className="space-y-3">
                {[
                  {
                    name: 'Atlas',
                    role: 'Knowledge Agent',
                    desc: 'Company knowledge and history retrieval agent',
                    tags: ['search', 'summarize', 'retrieve', 'history'],
                    status: 'active'
                  },
                  {
                    name: 'Iris',
                    role: 'Data Agent',
                    desc: 'Data analysis and dashboard generation agent',
                    tags: ['sql', 'charts', 'analytics', 'reports'],
                    status: 'active'
                  },
                  {
                    name: 'Echo',
                    role: 'Comms Agent',
                    desc: 'Communication and meeting summary agent',
                    tags: ['summarize', 'meetings', 'emails', 'slack'],
                    status: 'active'
                  },
                  {
                    name: 'Raffasya',
                    role: 'Process Agent',
                    desc: 'SOP creation and workflow automation agent',
                    tags: ['sop', 'workflow', 'automation', 'docs'],
                    status: 'idle'
                  }
                ].map((ag) => (
                  <div key={ag.name} className="bg-[#101625] border border-slate-800/80 rounded-xl p-3.5 space-y-2.5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center text-emerald-400 font-bold text-xs">
                          <Bot size={15} />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white">{ag.name}</span>
                            <div className={`w-1.5 h-1.5 rounded-full ${ag.status === 'active' ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                          </div>
                          <span className="text-[10px] text-slate-400">{ag.role}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {ag.desc}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {ag.tags.map((tag) => (
                        <span key={tag} className="text-[9px] bg-[#171f33] border border-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-800/50 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Status: <strong className={ag.status === 'active' ? 'text-emerald-400' : 'text-slate-400'}>{ag.status}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* TAB BRAIN (KNOWLEDGE BRAIN) */
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Brain size={15} className="text-purple-400" />
                  Knowledge Brain
                </span>
                <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full">
                  {brainKnowledgeList.length} Docs
                </span>
              </div>

              {brainKnowledgeList.map((kb) => (
                <div key={kb.id} className="bg-[#101625] border border-slate-800/80 rounded-xl p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs font-bold text-slate-200">{kb.title}</h4>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">{kb.snippet}</p>
                  <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-800/40">
                    <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">{kb.category}</span>
                    <span>{kb.updatedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </aside>

    </div>
  );
}
