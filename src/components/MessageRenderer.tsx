import { Bot, User, Sparkles, Table2, BarChart3, ListChecks, FileText } from 'lucide-react';
import { Message } from '@/lib/supabase';

function Avatar({ name, type }: { name: string; type: string }) {
  const isAgent = type === 'agent';
  const initials = name === 'You' ? 'JD' : name.slice(0, 2).toUpperCase();
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
      isAgent
        ? 'bg-gradient-to-br from-blue-500 to-cyan-400 text-white'
        : 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white'
    }`}>
      {isAgent ? <Bot size={16} /> : initials}
    </div>
  );
}

function DashboardCard({ metadata }: { metadata: Record<string, unknown> }) {
  const data = (metadata.data as { month: string; value: number; target: number }[]) ?? [];
  const title = (metadata.title as string) ?? '';
  const summary = (metadata.summary as string) ?? '';
  const maxVal = Math.max(...data.map(d => Math.max(d.value, d.target)), 1);

  return (
    <div className="mt-3 rounded-xl border border-slate-700 bg-slate-900/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-800 flex items-center gap-2">
        <BarChart3 size={16} className="text-blue-400" />
        <span className="text-sm font-medium text-slate-200">{title}</span>
      </div>
      <div className="p-4">
        <div className="flex items-end gap-3 h-40">
          {data.map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full flex flex-col items-center justify-end h-full gap-1">
                <div className="w-full max-w-[36px] bg-slate-700/40 rounded-t-sm relative group" style={{ height: `${(d.target / maxVal) * 100}%` }}>
                  <div className="absolute inset-0 bg-blue-500/30 rounded-t-sm" />
                </div>
                <div className="w-full max-w-[36px] bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-sm transition-all duration-500" style={{ height: `${(d.value / maxVal) * 100}%` }} />
              </div>
              <span className="text-[11px] text-slate-500">{d.month}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-gradient-to-t from-blue-600 to-cyan-400" /><span className="text-xs text-slate-400">Actual</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-500/30" /><span className="text-xs text-slate-400">Target</span></div>
        </div>
        {summary && <p className="mt-3 text-xs text-slate-400 leading-relaxed">{summary}</p>}
      </div>
    </div>
  );
}

function TableCard({ metadata }: { metadata: Record<string, unknown> }) {
  const title = (metadata.title as string) ?? '';
  const columns = (metadata.columns as string[]) ?? [];
  const rows = (metadata.rows as string[][]) ?? [];
  const summary = (metadata.summary as string) ?? '';

  return (
    <div className="mt-3 rounded-xl border border-slate-700 bg-slate-900/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-800 flex items-center gap-2">
        <Table2 size={16} className="text-emerald-400" />
        <span className="text-sm font-medium text-slate-200">{title}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800">
              {columns.map((col) => (
                <th key={col} className="px-4 py-2.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className={`px-4 py-2.5 ${j === 0 ? 'text-slate-200 font-medium' : 'text-slate-400'}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {summary && <p className="px-4 py-3 text-xs text-slate-400 leading-relaxed border-t border-slate-800">{summary}</p>}
    </div>
  );
}

function SopCard({ metadata }: { metadata: Record<string, unknown> }) {
  const title = (metadata.title as string) ?? 'Standard Operating Procedure';
  const steps = (metadata.steps as { step: number; title: string; description: string }[]) ?? [];

  return (
    <div className="mt-3 rounded-xl border border-slate-700 bg-slate-900/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-800 flex items-center gap-2">
        <FileText size={16} className="text-amber-400" />
        <span className="text-sm font-medium text-slate-200">{title}</span>
      </div>
      <div className="p-4 space-y-3">
        {steps.map((s) => (
          <div key={s.step} className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-xs font-semibold text-amber-400">
              {s.step}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">{s.title}</p>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskCard({ metadata }: { metadata: Record<string, unknown> }) {
  const title = (metadata.title as string) ?? 'Task Execution Plan';
  const tasks = (metadata.tasks as { id: number; task: string; agent: string; status: string; time: string }[]) ?? [];

  const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
    done: { color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/30', label: 'Done' },
    in_progress: { color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/30', label: 'Running' },
    pending: { color: 'text-slate-500', bg: 'bg-slate-700/30 border-slate-600', label: 'Queued' },
  };

  return (
    <div className="mt-3 rounded-xl border border-slate-700 bg-slate-900/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-800 flex items-center gap-2">
        <ListChecks size={16} className="text-blue-400" />
        <span className="text-sm font-medium text-slate-200">{title}</span>
      </div>
      <div className="p-4 space-y-2.5">
        {tasks.map((t) => {
          const sc = statusConfig[t.status] ?? statusConfig.pending;
          return (
            <div key={t.id} className="flex items-center gap-3 py-1.5">
              <div className={`w-2 h-2 rounded-full ${sc.color.replace('text-', 'bg-')}`} />
              <div className="flex-1">
                <p className="text-sm text-slate-200">{t.task}</p>
                <p className="text-[11px] text-slate-500">Agent: {t.agent} · {t.time}</p>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full border ${sc.bg} ${sc.color}`}>{sc.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MessageRenderer({ message }: { message: Message }) {
  const isUser = message.sender_type === 'user';

  return (
    <div className={`flex gap-3 px-6 py-3 ${isUser ? '' : 'hover:bg-slate-900/30'} transition-colors`}>
      <Avatar name={message.sender_name} type={message.sender_type} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className={`text-sm font-semibold ${isUser ? 'text-emerald-300' : 'text-blue-300'}`}>{message.sender_name}</span>
          {!isUser && message.sender_type === 'agent' && (
            <span className="flex items-center gap-1 text-[10px] text-slate-500 bg-slate-800/60 px-1.5 py-0.5 rounded">
              <Sparkles size={9} /> AI Agent
            </span>
          )}
          <span className="text-[11px] text-slate-600">{new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="mt-1 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>

        {message.message_type === 'dashboard' && message.metadata && <DashboardCard metadata={message.metadata} />}
        {message.message_type === 'query_result' && message.metadata && <TableCard metadata={message.metadata} />}
        {message.message_type === 'sop' && message.metadata && <SopCard metadata={message.metadata} />}
        {message.message_type === 'task' && message.metadata && <TaskCard metadata={message.metadata} />}
      </div>
    </div>
  );
}
