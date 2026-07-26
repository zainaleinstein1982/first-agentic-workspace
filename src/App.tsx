import { useState, useEffect } from 'react';
import { PanelRightClose, PanelRightOpen, Bot, Brain } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { ChatPanel } from '@/components/ChatPanel';
import { RightPanel } from '@/components/RightPanel';
import { useChannels, useMessages, useAgents, useKnowledge } from '@/hooks/useWorkspace';
import { Message } from '@/lib/supabase';

function App() {
  const { channels, loading: channelsLoading } = useChannels();
  const { agents, loading: agentsLoading } = useAgents();
  const { items: knowledgeItems, loading: knowledgeLoading } = useKnowledge();

  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  
  // State baru untuk mengontrol tab aktif pada RightPanel ('agents' atau 'brain')
  const [activeRightTab, setActiveRightTab] = useState<'agents' | 'brain'>('agents');

  // Atur default activeChannelId ke channel pertama jika tersedia
  useEffect(() => {
    if (channels.length > 0 && !activeChannelId) {
      setActiveChannelId(channels[0].id);
    }
  }, [channels, activeChannelId]);

  const activeChannel = channels.find(c => c.id === activeChannelId) ?? null;
  const { messages, loading: messagesLoading, sendMessage, sendAgentMessage } = useMessages(activeChannelId);

  const handleSelectChannel = (id: string) => {
    setActiveChannelId(id);
  };

  // Handler untuk membuka tab Agents pada RightPanel
  const handleOpenAgents = () => {
    setActiveRightTab('agents');
    setRightPanelOpen(true);
  };

  // Handler untuk membuka tab Knowledge Brain pada RightPanel
  const handleOpenKnowledge = () => {
    setActiveRightTab('brain');
    setRightPanelOpen(true);
  };

  const handleSendUserMessage = async (content: string) => {
    if (!activeChannelId) return null;
    return sendMessage(activeChannelId, content);
  };

  const handleSendAgentMessage = async (
    agentName: string, 
    content: string, 
    messageType: Message['message_type'], 
    metadata?: Record<string, unknown>
  ) => {
    if (!activeChannelId) return null;
    return sendAgentMessage(activeChannelId, agentName, content, messageType, metadata);
  };

  // Handler untuk mengeksekusi pesan dari menu Quick Action
  const handleQuickAction = async (promptText: string) => {
    if (!activeChannelId) return;
    await handleSendUserMessage(promptText);
  };

  const handleNewChannel = () => {
    const name = prompt('Channel name:');
    if (!name) return;
  };

  const loading = channelsLoading || agentsLoading || knowledgeLoading;

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-slate-900 text-slate-100 overflow-hidden">
      <Sidebar
        channels={channels}
        agents={agents}
        activeChannelId={activeChannelId}
        onSelectChannel={handleSelectChannel}
        onOpenAgents={handleOpenAgents}
        onOpenKnowledge={handleOpenKnowledge}
        onQuickAction={handleQuickAction}
        onNewChannel={handleNewChannel}
        collapsed={sidebarCollapsed}
      />

      <div className="flex-1 flex min-w-0">
        <ChatPanel
          channel={activeChannel}
          agents={agents}
          messages={messages}
          loading={messagesLoading}
          onSendUserMessage={handleSendUserMessage}
          onSendAgentMessage={handleSendAgentMessage}
        />

        {/* Toggle button for right panel */}
        <button
          onClick={() => setRightPanelOpen(!rightPanelOpen)}
          className="w-10 border-l border-slate-800 bg-slate-950 flex flex-col items-center justify-start pt-4 gap-4 shrink-0 hover:bg-slate-900 transition-colors group"
          title={rightPanelOpen ? 'Hide panel' : 'Show panel'}
        >
          {rightPanelOpen ? (
            <PanelRightClose size={18} className="text-slate-500 group-hover:text-slate-300" />
          ) : (
            <PanelRightOpen size={18} className="text-slate-500 group-hover:text-slate-300" />
          )}
          {!rightPanelOpen && (
            <>
              <Bot size={18} className="text-slate-500 group-hover:text-slate-300 mt-2" onClick={handleOpenAgents} />
              <Brain size={18} className="text-slate-500 group-hover:text-slate-300" onClick={handleOpenKnowledge} />
            </>
          )}
        </button>
      </div>

      <RightPanel
        open={rightPanelOpen}
        onClose={() => setRightPanelOpen(false)}
        agents={agents}
        knowledgeItems={knowledgeItems}
        activeTab={activeRightTab}
        onTabChange={setActiveRightTab}
      />
    </div>
  );
}

export default App;
