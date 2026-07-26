import { useState } from 'react';
import {
  Hash, Code, Layers, TrendingUp, BarChart3, BookOpen,
  Bot, Brain, Settings, Plus, Search, ChevronDown, Sparkles, Zap, Users, MessageSquare
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Channel, Agent } from '@/lib/supabase';

const iconMap: Record<string, LucideIcon> = {
  Hash, Code, Layers, TrendingUp, BarChart3, BookOpen,
};

type Props = {
  channels: Channel[];
  agents: Agent[];
  activeChannelId: string | null;
  onSelectChannel: (id: string) => void;
  onOpenAgents: () => void;
  onOpenKnowledge: () => void;
  onNewChannel: () => void;
  onQuickAction?: (promptText: string) => void;
  collapsed: boolean;
};

export function Sidebar({ 
  channels, 
  agents, 
  activeChannelId, 
  onSelectChannel, 
  onOpenAgents, 
  onOpenKnowledge, 
  onNewChannel, 
  onQuickAction,
  collapsed 
}: Props) {
  const [openSections, setOpenSections] = useState({ channels: true, agents: true, brain: true, quickActions: false });

  const toggle = (key: keyof typeof openSections) => setOpenSections(s => ({ ...s, [key]: !s[key] }));

  if (collapsed) {
    return (
      <div className="w-16 bg-slate-950 border-r border-slate-800 flex flex-col items-center py-4 gap-6 shrink-0">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
          <Sparkles size={18} className="text-white" />
        </div>
        <button onClick={onOpenAgents} className="text-slate-400 hover:text-white transition-colors" title="Agents">
          <Bot size={20} />
        </button>
        <button onClick={onOpenKnowledge} className="text-slate-400 hover:text-white transition-colors" title="Knowledge Brain">
          <Brain size={20} />
        </button>
        <button onClick={onNewChannel} className="text-slate-400 hover:text-white transition-colors" title="New channel">
          <Plus size={20} />
        </button>
        <div className="mt-auto">
          <button className="text-slate-400 hover:text-white transition-colors" title="Settings">
            <Settings size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0 h-full">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-slate-800 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0">
          <Sparkles size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-white font-semibold text-sm leading-tight">Raffasya</h1>
          <p className="text-slate-500 text-[11px] leading-tight">AI Agentic Workspace</p>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search workspace..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
        {/* Quick actions Section */}
        <div>
          <button 
            onClick={() => toggle('quickActions')} 
            className="w-full px-2 py-1.5 flex items-center justify-between text-slate-300 hover:bg-slate-900 rounded-md transition-colors"
          >
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-amber-400" />
              <span className="text-sm font-medium">Quick Actions</span>
            </div>
            <ChevronDown size={14} className={`transition-transform text-slate-500 ${openSections.quickActions ? '' : '-rotate-90'}`} />
          </button>
          
          {openSections.quickActions && (
            <div className="mt-1 pl-6 space-y-1">
              <button 
                onClick={() => onQuickAction?.("Build a setup task for the team")}
                className="w-full text-left py-1 px-2 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded transition-colors"
              >
                ⚡ Create Team Task Plan
              </button>
              <button 
                onClick={() => onQuickAction?.("Show me revenue performance for the last 6 months")}
                className="w-full text-left py-1 px-2 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded transition-colors"
              >
                📊 Query Revenue Data
              </button>
              <button 
                onClick={() => onQuickAction?.("Create an onboarding SOP for new engineers")}
                className="w-full text-left py-1 px-2 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded transition-colors"
              >
                📋 Generate Onboarding SOP
              </button>
            </div>
          )}
        </div>

        {/* Team Chat Menu */}
        <div 
          className="px-2 py-1.5 flex items-center gap-2 text-slate-300 hover:bg-slate-900 rounded-md cursor-pointer transition-colors" 
          onClick={onOpenAgents}
        >
          <Users size={16} className="text-blue-400" />
          <span className="text-sm font-medium">Team Chat / Agents</span>
        </div>

        {/* Channels Section */}
        <div className="pt-3">
          <button onClick={() => toggle('channels')} className="w-full px-2 py-1 flex items-center justify-between text-slate-500 hover:text-slate-300 transition-colors">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Channels</span>
            <ChevronDown size={14} className={`transition-transform ${openSections.channels ? '' : '-rotate-90'}`} />
          </button>
          {openSections.channels && (
            <div className="mt-1 space-y-0.5">
              {channels.map(ch => {
                const Icon = (ch.icon && iconMap[ch.icon]) || Hash;
                const active = ch.id === activeChannelId;
                return (
                  <button
                    key={ch.id}
                    onClick={() => onSelectChannel(ch.id)}
                    className={`w-full px-2 py-1.5 flex items-center gap-2 rounded-md text-sm transition-colors ${
                      active ? 'bg-blue-500/10 text-blue-300' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <Icon size={15} className={active ? 'text-blue-400' : 'text-slate-500'} />
                    <span className="truncate">{ch.name}</span>
                  </button>
                );
              })}
              <button onClick={onNewChannel} className="w-full px-2 py-1.5 flex items-center gap-2 rounded-md text-sm text-slate-500 hover:text-slate-300 hover:bg-slate-900 transition-colors">
                <Plus size={15} />
                <span>Add channel</span>
              </button>
            </div>
          )}
        </div>

        {/* AI Agents Section */}
        <div className="pt-3">
          <button onClick={() => toggle('agents')} className="w-full px-2 py-1 flex items-center justify-between text-slate-500 hover:text-slate-300 transition-colors">
            <span className="text-[11px] font-semibold uppercase tracking-wider">AI Agents</span>
            <ChevronDown size={14} className={`transition-transform ${openSections.agents ? '' : '-rotate-90'}`} />
          </button>
          {openSections.agents && (
            <div className="mt-1 space-y-0.5">
              {agents.map(ag => (
                <div key={ag.id} className="px-2 py-1.5 flex items-center gap-2 rounded-md text-sm text-slate-400 hover:bg-slate-900 transition-colors cursor-pointer" onClick={onOpenAgents}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${ag.avatar_color}20`, border: `1.5px solid ${ag.avatar_color}` }}>
                    <Bot size={11} style={{ color: ag.avatar_color }} />
                  </div>
                  <span className="truncate">{ag.name}</span>
                  <span className={`ml-auto w-1.5 h-1.5 rounded-full ${ag.status === 'active' ? 'bg-emerald-400' : ag.status === 'busy' ? 'bg-amber-400' : 'bg-slate-600'}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Knowledge Brain Section */}
        <div className="pt-3">
          <button onClick={() => toggle('brain')} className="w-full px-2 py-1 flex items-center justify-between text-slate-500 hover:text-slate-300 transition-colors">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Knowledge Brain</span>
            <ChevronDown size={14} className={`transition-transform ${openSections.brain ? '' : '-rotate-90'}`} />
          </button>
          {openSections.brain && (
            <div className="mt-1 space-y-0.5">
              <button onClick={onOpenKnowledge} className="w-full px-2 py-1.5 flex items-center gap-2 rounded-md text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors">
                <Brain size={15} className="text-emerald-400" />
                <span>Company Brain</span>
              </button>
              <button onClick={onOpenKnowledge} className="w-full px-2 py-1.5 flex items-center gap-2 rounded-md text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors">
                <BookOpen size={15} className="text-slate-500" />
                <span>Documents</span>
              </button>
              <button onClick={onOpenKnowledge} className="w-full px-2 py-1.5 flex items-center gap-2 rounded-md text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors">
                <MessageSquare size={15} className="text-slate-500" />
                <span>Meeting Notes</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 px-3 py-3">
        <button className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-slate-900 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-semibold">
            AW
          </div>
          <div className="text-left">
            <p className="text-sm text-slate-200 font-medium leading-tight">Asih Winarti</p>
            <p className="text-[11px] text-slate-500 leading-tight">Workspace Admin</p>
          </div>
          <Settings size={15} className="ml-auto text-slate-500" />
        </button>
      </div>
    </div>
  );
}
