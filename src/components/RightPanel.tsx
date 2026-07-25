import { X, Bot, Brain, Plus, Search, Sparkles, Activity, Database, FileText, Tag } from 'lucide-react';
import { Agent, KnowledgeItem } from '@/lib/supabase';
import { useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  agents: Agent[];
  knowledgeItems: KnowledgeItem[];
};

type Tab = 'agents' | 'knowledge';

export function RightPanel({ open, onClose, agents, knowledgeItems }: Props) {
  const [tab, setTab] = useState<Tab>('agents');
  const [search, setSearch] = useState('');

  if (!open) return null;

  const filteredKnowledge = knowledgeItems.filter(k =>
    k.title.toLowerCase().includes(search.toLowerCase()) ||
    k.content.toLowerCase().includes(search.toLowerCase()) ||
    k.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const categoryColors: Record<string, string> = {
    Finance: '#10b981',
    HR: '#f59e0b',
    Product: '#3b82f6',
    Marketing: '#ec4899',
    Engineering: '#8b5cf6',
  };

  return (
    <div className="w-80 bg-slate-950 border-l border-slate-800 flex flex-col shrink-0 h-full">
      {/* Header */}
      <div className="h-14 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1 bg-slate-900 rounded-lg p-0.5">
          <button
            onClick={() => setTab('agents')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${tab === 'agents' ? 'bg-slate-800 text-slate-100' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Bot size={14} />
            Agents
          </button>
          <button
            onClick={() => setTab('knowledge')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${tab === 'knowledge' ? 'bg-slate-800 text-slate-100' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Brain size={14} />
            Brain
          </button>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors">
          <X size={18} />
        </button>
      </div>

      {tab === 'agents' ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-colors text-sm">
            <Plus size={16} />
            Deploy new agent
          </button>

          {agents.map(agent => (
            <div key={agent.id} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 hover:border-slate-700 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${agent.avatar_color}20`, border: `1.5px solid ${agent.avatar_color}` }}>
                  <Bot size={18} style={{ color: agent.avatar_color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-100">{agent.name}</h3>
                    <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'active' ? 'bg-emerald-400' : agent.status === 'busy' ? 'bg-amber-400' : 'bg-slate-600'}`} />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{agent.role}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">{agent.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {agent.capabilities.map(cap => (
                  <span key={cap} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    {cap}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                <Activity size={12} />
                <span>Status: <span className={agent.status === 'active' ? 'text-emerald-400' : agent.status === 'busy' ? 'text-amber-400' : 'text-slate-500'}>{agent.status}</span></span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-slate-800">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search knowledge brain..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
            <button className="w-full mt-2 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-colors text-xs">
              <Plus size={14} />
              Add knowledge
            </button>
          </div>

          {/* Stats */}
          <div className="px-4 py-3 border-b border-slate-800 grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="flex items-center justify-center text-blue-400 mb-1"><Database size={14} /></div>
              <p className="text-sm font-semibold text-slate-200">{knowledgeItems.length}</p>
              <p className="text-[10px] text-slate-500">Items</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-emerald-400 mb-1"><FileText size={14} /></div>
              <p className="text-sm font-semibold text-slate-200">{new Set(knowledgeItems.map(k => k.category)).size}</p>
              <p className="text-[10px] text-slate-500">Categories</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-amber-400 mb-1"><Tag size={14} /></div>
              <p className="text-sm font-semibold text-slate-200">{new Set(knowledgeItems.flatMap(k => k.tags)).size}</p>
              <p className="text-[10px] text-slate-500">Tags</p>
            </div>
          </div>

          {/* Knowledge items */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredKnowledge.map(item => {
              const color = categoryColors[item.category ?? ''] ?? '#64748b';
              return (
                <div key={item.id} className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 hover:border-slate-700 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-semibold text-slate-200 leading-tight">{item.title}</h4>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full shrink-0" style={{ background: `${color}20`, color }}>
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed line-clamp-3">{item.content}</p>
                  <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500">#{tag}</span>
                    ))}
                    {item.source && (
                      <span className="text-[9px] text-slate-600 ml-auto flex items-center gap-1">
                        <Sparkles size={8} /> {item.source}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            {filteredKnowledge.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-500">No knowledge items found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
