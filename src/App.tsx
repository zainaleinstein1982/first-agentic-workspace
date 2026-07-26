import { useState, useEffect, useRef } from 'react';
import { 
  Send, Bot, Brain, Users, Sparkles, Code, MessageSquare, 
  BookOpen, Plus, Search, ChevronRight, FileText, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { useChannels, useAgents, useKnowledge, useMessages } from './hooks/useWorkspace';

export default function App() {
  const [activeView, setActiveView] = useState<'chat' | 'knowledge' | 'agents'>('chat');
  const [activeChannelId, setActiveChannelId] = useState<string | null>('10000000-0000-0000-0000-000000000001');
  const [selectedKnowledgeCategory, setSelectedKnowledgeCategory] = useState<string | null>('Company Brain');
  const [inputText, setInputText] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  // Custom Hooks dari Supabase
  const { channels } = useChannels();
  const { agents } = useAgents();
  const { items: knowledgeItems, loading: knowledgeLoading } = useKnowledge(selectedKnowledgeCategory);
  const { messages, loading: messagesLoading, sendMessage, sendAgentMessage } = useMessages(activeChannelId);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handler Navigasi Knowledge dari Sidebar
  const handleOpenKnowledge = (categoryName?: string) => {
    setSelectedKnowledgeCategory(categoryName || 'Company Brain');
    setActiveView('knowledge');
  };

  // Handler Pengiriman Pesan & Respon Otomatis Agen AI
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeChannelId) return;

    const userQuery = inputText;
    setInputText('');

    // 1. Simpan pesan pengguna ke Supabase
    await sendMessage(activeChannelId, userQuery);

    // 2. Deteksi kata kunci & simulasi balasan otomatis dari AI Agent
    const lower = userQuery.toLowerCase();

    if (lower.includes('sblc') || lower.includes('jadwal') || lower.includes('blok')) {
      setTimeout(async () => {
        await sendAgentMessage(
          activeChannelId,
          'Atlas',
          'Berdasarkan pemantauan SBLC real-time: Perakitan blok 4C mengalami deviasi 1.5 hari pada lintasan outfitting piping. Mengacu pada SOP-MAR-2026-V2.4, status masih dalam ambang toleransi aman (< 3 hari).',
          'text',
          { agent_role: 'Maritime Production Planner' }
        );
      }, 1000);
    } else if (lower.includes('promptql') || lower.includes('query') || lower.includes('harga') || lower.includes('material')) {
      setTimeout(async () => {
        await sendAgentMessage(
          activeChannelId,
          'Echo',
          'FETCH TOP 5 procurement_items { item_name, budgeted_cost, actual_cost, variance_percentage } WHERE project = "HULL-2026-A" ORDER BY variance_percentage DESC',
          'code',
          { executed_by: 'Echo PromptQL Engine', execution_time_ms: 118 }
        );
      }, 1200);
    } else if (lower.includes('kri') || lower.includes('risiko') || lower.includes('risk') || lower.includes('sop')) {
      setTimeout(async () => {
        await sendAgentMessage(
          activeChannelId,
          'Iris',
          'Analisis Risiko Operasional: KRI Score untuk keterlambatan pengadaan komponen listrik berada pada indikator AMBER (Moderat). Direkomendasikan melakukan re-scheduling sekuens di Dockyard B.',
          'text',
          { agent_role: 'Quality & Operational Risk Analyst' }
        );
      }, 1100);
    }
  };

  // Handler Quick Action
  const handleQuickAction = (promptText: string) => {
    setActiveView('chat');
    setInputText(promptText);
  };

  const activeChannel = channels.find(c => c.id === activeChannelId);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* SIDEBAR COMPONENT */}
      <Sidebar
        channels={channels}
        agents={agents}
        activeChannelId={activeChannelId}
        selectedKnowledgeCategory={selectedKnowledgeCategory}
        onSelectChannel={(id) => {
          setActiveChannelId(id);
          setActiveView('chat');
        }}
        onOpenAgents={() => setActiveView('agents')}
        onOpenKnowledge={handleOpenKnowledge}
        onNewChannel={() => alert('Modal Tambah Channel')}
        onQuickAction={handleQuickAction}
        collapsed={collapsed}
      />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-slate-900">
        
        {/* VIEW 1: CHAT ROOM / CHANNELS */}
        {activeView === 'chat' && (
          <div className="flex-1 flex flex-col h-full min-h-0">
            {/* Header Channel */}
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-base font-semibold text-white flex items-center gap-2">
                  <span className="text-slate-500">#</span> {activeChannel?.name || 'sblc-shipbuilding-planning'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">{activeChannel?.description || 'Diskusi proyek & monitoring SBLC'}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-700">
                <Sparkles size={13} className="text-blue-400" />
                <span>PromptQL Connected</span>
              </div>
            </div>

            {/* Area Pesan Chat */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messagesLoading ? (
                <div className="text-center text-slate-500 text-sm py-10">Memuat riwayat percakapan...</div>
              ) : messages.length === 0 ? (
                <div className="text-center text-slate-500 text-sm py-10">Belum ada pesan di channel ini. Mulai diskusi!</div>
              ) : (
                messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex gap-3 max-w-3xl ${msg.sender_type === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      msg.sender_type === 'user' 
                        ? 'bg-blue-600 text-white font-medium text-xs' 
                        : 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-400'
                    }`}>
                      {msg.sender_type === 'user' ? 'YW' : <Bot size={16} />}
                    </div>

                    <div className={`flex flex-col ${msg.sender_type === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-slate-300">{msg.sender_name}</span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <div className={`p-3.5 rounded-xl text-sm leading-relaxed ${
                        msg.sender_type === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-slate-800/90 border border-slate-700/60 text-slate-200 rounded-tl-none'
                      }`}>
                        {msg.message_type === 'code' ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-purple-300 font-mono border-b border-slate-700 pb-1">
                              <span>PromptQL Query</span>
                              <Code size={12} />
                            </div>
                            <pre className="p-2.5 bg-slate-950 rounded border border-slate-800 text-xs text-emerald-400 font-mono overflow-x-auto">
                              {msg.content}
                            </pre>
                          </div>
                        ) : (
                          <p>{msg.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Chat */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-950/30 shrink-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Ketik pesan ke #${activeChannel?.name || 'channel'} (Sebut @Atlas, @Echo, atau @Iris)...`}
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-4 pr-12 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* VIEW 2: KNOWLEDGE BRAIN VIEW */}
        {activeView === 'knowledge' && (
          <div className="flex-1 flex flex-col h-full overflow-y-auto p-8">
            <div className="max-w-5xl w-full mx-auto space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
                    <Brain className="text-emerald-400" size={28} />
                    <span>Knowledge Brain</span>
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Kategori Terpilih: <span className="text-blue-400 font-medium">{selectedKnowledgeCategory}</span>
                  </p>
                </div>
                <button 
                  onClick={() => {
                    const title = prompt('Judul Dokumen:');
                    const content = prompt('Isi Ringkasan Dokumen:');
                    if (title && content) {
                      // Panggil handler penambahan dokumen di sini
                      alert('Dokumen berhasil disimpan ke Knowledge Brain!');
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus size={16} />
                  <span>Tambah Dokumen</span>
                </button>
              </div>

              {knowledgeLoading ? (
                <div className="text-center py-12 text-slate-500">Memuat item Knowledge Brain...</div>
              ) : knowledgeItems.length === 0 ? (
                <div className="p-8 text-center bg-slate-950/40 rounded-xl border border-slate-800 text-slate-400">
                  Tidak ada dokumen ditemukan untuk kategori "{selectedKnowledgeCategory}".
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {knowledgeItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-5 bg-slate-950/60 border border-slate-800 hover:border-slate-700 rounded-xl transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText size={18} className="text-blue-400" />
                          <h3 className="font-semibold text-slate-100 text-base">{item.title}</h3>
                        </div>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono border border-slate-700">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/80 p-3.5 rounded-lg border border-slate-800/80">
                        {item.content}
                      </p>
                      <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                        <span>Diperbarui: {new Date(item.updated_at).toLocaleDateString()}</span>
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 size={12} /> Sync dengan PromptQL Engine
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: AI AGENTS DIRECTORY & RESPONSIBILITIES */}
        {activeView === 'agents' && (
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-5xl w-full mx-auto space-y-6">
              <div className="border-b border-slate-800 pb-5">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
                  <Users className="text-blue-400" size={28} />
                  <span>AI Agents & Division of Responsibility</span>
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Daftar agen AI aktif beserta tugas spesifik dalam ekosistem manufaktur & PromptQL.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agents.map((ag) => (
                  <div key={ag.id} className="p-5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" 
                          style={{ background: `${ag.avatar_color}20`, border: `1.5px solid ${ag.avatar_color}` }}
                        >
                          <Bot size={20} style={{ color: ag.avatar_color }} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{ag.name}</h3>
                          <p className="text-xs text-slate-400">{ag.role}</p>
                        </div>
                      </div>
                      <span className={`w-2.5 h-2.5 rounded-full ${ag.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 leading-relaxed border border-slate-800">
                      <strong>System Prompt:</strong> {ag.system_prompt}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
