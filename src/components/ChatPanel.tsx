import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Paperclip, AtSign, Zap, Bot } from 'lucide-react';
import { Channel, Agent, Message } from '@/lib/supabase';
import { MessageRenderer } from './MessageRenderer';
import { pickAgent, generateAgentResponse } from '@/lib/agentResponses';

type Props = {
  channel: Channel | null;
  agents: Agent[];
  messages: Message[];
  loading: boolean;
  onSendUserMessage: (content: string) => Promise<Message | null>;
  onSendAgentMessage: (
    agentName: string,
    content: string,
    messageType: Message['message_type'],
    metadata?: Record<string, unknown>
  ) => Promise<Message | null>;
};

const SUGGESTED_PROMPTS = [
  { icon: '📊', text: 'Show me revenue performance for the last 6 months' },
  { icon: '🔍', text: 'What is our customer acquisition cost by segment?' },
  { icon: '📋', text: 'Create an onboarding SOP for new engineers' },
  { icon: '🤖', text: 'Draft a Q1 planning meeting summary' },
];

export function ChatPanel({
  channel,
  agents,
  messages,
  loading,
  onSendUserMessage,
  onSendAgentMessage,
}: Props) {
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  // Fungsi internal untuk memproses pengiriman pesan ke agent
  const processMessage = async (text: string) => {
    if (!text.trim() || !channel) return;

    await onSendUserMessage(text);
    setIsThinking(true);

    const agentName = pickAgent(text, agents);
    const response = generateAgentResponse(text, agentName, agents);

    setTimeout(async () => {
      setIsThinking(false);
      await onSendAgentMessage(
        response.agentName,
        response.content,
        response.messageType,
        response.metadata
      );
    }, 1400);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setInput('');
    await processMessage(userText);
  };

  // Diperbaiki: Langsung mengirim pesan saat kartu suggested prompt diklik
  const handleSuggestion = async (text: string) => {
    await processMessage(text);
  };

  if (!channel) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-900/30">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mx-auto mb-4">
            <Sparkles size={28} className="text-white" />
          </div>
          <h2 className="text-xl font-semibold text-slate-200 mb-2">Welcome to your AI Workspace</h2>
          <p className="text-sm text-slate-400">Select a channel to start collaborating with your AI agents, or pick a suggested prompt to see the magic.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-900/30 min-w-0">
      {/* Header */}
      <div className="h-14 border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="text-slate-500 text-lg">#</span>
          <div>
            <h2 className="text-sm font-semibold text-slate-200 leading-tight">{channel.name}</h2>
            <p className="text-[11px] text-slate-500 leading-tight">{channel.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {agents.slice(0, 4).map(a => (
            <div
              key={a.id}
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: `${a.avatar_color}20`, border: `1.5px solid ${a.avatar_color}` }}
              title={`${a.name} — ${a.role}`}
            >
              <Bot size={13} style={{ color: a.avatar_color }} />
            </div>
          ))}
          <div className="h-5 w-px bg-slate-700 mx-1" />
          <span className="text-[11px] text-slate-500">{agents.length} agents active</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center px-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 border border-blue-500/30 flex items-center justify-center mb-4">
              <Zap size={24} className="text-blue-400" />
            </div>
            <h3 className="text-base font-semibold text-slate-200 mb-1">Start a conversation</h3>
            <p className="text-xs text-slate-500 mb-6 text-center max-w-sm">Ask anything — your AI agents can query data, generate dashboards, create SOPs, and search the company brain.</p>
            <div className="grid grid-cols-2 gap-2 max-w-2xl w-full">
              {SUGGESTED_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestion(p.text)}
                  className="text-left p-3 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-blue-500/40 hover:bg-slate-800/50 transition-all group"
                >
                  <span className="text-base mr-1.5">{p.icon}</span>
                  <span className="text-xs text-slate-300 group-hover:text-slate-100">{p.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map(m => <MessageRenderer key={m.id} message={m} />)}
            {isThinking && (
              <div className="flex gap-3 px-6 py-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="flex items-center gap-1.5 pt-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-xs text-slate-500 ml-2">Agents are working...</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input */}
      <div className="px-6 pb-5 pt-2 shrink-0">
        <div className="rounded-xl border border-slate-800 bg-slate-900 focus-within:border-blue-500/50 transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={`Message #${channel.name} — ask AI agents anything...`}
            rows={2}
            className="w-full bg-transparent px-4 pt-3 pb-1 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none resize-none"
          />
          <div className="flex items-center justify-between px-3 pb-2.5">
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors" title="Attach file">
                <Paperclip size={16} />
              </button>
              <button className="p-1.5 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors" title="Mention agent">
                <AtSign size={16} />
              </button>
              <button className="p-1.5 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors" title="Quick action">
                <Zap size={16} />
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-medium transition-colors"
            >
              <Send size={13} />
              Send
            </button>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-slate-600 text-center">
          Agents can query data, generate dashboards, create SOPs, and search the company brain. Press Enter to send.
        </p>
      </div>
    </div>
  );
}
