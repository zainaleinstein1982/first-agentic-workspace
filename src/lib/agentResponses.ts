export type AgentResponseResult = {
  agentName: string;
  content: string;
  messageType: 'text' | 'query_result' | 'dashboard' | 'sop' | 'task';
  metadata?: Record<string, unknown>;
};

type AgentRef = { name: string; role: string | null };

const QUERY_KEYWORDS = ['revenue', 'sales', 'metrics', 'data', 'show me', 'how many', 'analytics', 'numbers', 'report', 'stats', 'performance', 'cac', 'ltv'];
const TASK_KEYWORDS = ['build a setup task', 'task plan', 'task for the team', 'assign task', 'create task', 'orchestrate', 'execution plan'];
const SOP_KEYWORDS = ['sop', 'process', 'workflow', 'how to', 'steps', 'procedure', 'guide', 'onboard', 'checklist'];
const COMMS_KEYWORDS = ['meeting', 'summary', 'draft', 'email', 'slack', 'q1', 'notes', 'summarize', 'action items'];

function matchKeywords(text: string, keywords: string[]) {
  const lower = text.toLowerCase();
  return keywords.some(kw => lower.includes(kw));
}

function extractMentionedAgent(input: string, agents: AgentRef[]): string | null {
  const mentionMatches = input.match(/@(\w+)/g);
  if (!mentionMatches) return null;

  for (const mention of mentionMatches) {
    const mentionedName = mention.slice(1).toLowerCase();
    const found = agents.find(a => a.name.toLowerCase() === mentionedName);
    if (found) return found.name;
  }
  return null;
}

export function pickAgent(input: string, agents: AgentRef[]): string {
  const mentioned = extractMentionedAgent(input, agents);
  if (mentioned) return mentioned;

  const lower = input.toLowerCase();

  // Prioritas 1: Task Execution -> Raffasya
  if (matchKeywords(lower, TASK_KEYWORDS) || lower.includes('task')) {
    return 'Raffasya';
  }
  // Prioritas 2: Data & Analytics -> Iris
  if (matchKeywords(lower, QUERY_KEYWORDS)) {
    return 'Iris';
  }
  // Prioritas 3: SOP & Process -> Atlas
  if (matchKeywords(lower, SOP_KEYWORDS)) {
    return 'Atlas';
  }
  // Prioritas 4: Communication & Meeting -> Echo
  if (matchKeywords(lower, COMMS_KEYWORDS)) {
    return 'Echo';
  }

  return 'Raffasya';
}

export function generateAgentResponse(input: string, agentName: string, agents: AgentRef[]): AgentResponseResult {
  const lower = input.toLowerCase();

  // --- RAFFASYA (Task Orchestrator) ---
  if (agentName === 'Raffasya' || matchKeywords(lower, TASK_KEYWORDS) || lower.includes('task')) {
    return {
      agentName: 'Raffasya',
      content: 'Task plan generated and assigned across workspace agents:',
      messageType: 'task',
      metadata: {
        title: 'Team Setup & Execution Plan',
        tasks: [
          { id: 1, task: 'Extract workspace requirements', agent: 'Atlas', status: 'done', time: '1s' },
          { id: 2, task: 'Verify infrastructure and Database', agent: 'Iris', status: 'done', time: '2s' },
          { id: 3, task: 'Notify team and sync channels', agent: 'Echo', status: 'in_progress', time: '~1 min' },
          { id: 4, task: 'Finalize deployment orchestration', agent: 'Raffasya', status: 'pending', time: '~1 min' },
        ]
      }
    };
  }

  // --- IRIS (Data Agent) ---
  if (agentName === 'Iris' || matchKeywords(lower, QUERY_KEYWORDS)) {
    return {
      agentName: 'Iris',
      content: 'Here\'s the revenue breakdown I pulled from your data warehouse:',
      messageType: 'dashboard',
      metadata: {
        type: 'revenue_chart',
        title: 'Revenue Performance – Last 6 Months',
        data: [
          { month: 'Aug', value: 8.2, target: 8.0 },
          { month: 'Sep', value: 9.1, target: 8.5 },
          { month: 'Oct', value: 10.4, target: 9.5 },
          { month: 'Nov', value: 11.2, target: 10.5 },
          { month: 'Dec', value: 11.8, target: 11.5 },
          { month: 'Jan', value: 12.3, target: 12.0 },
        ],
        summary: 'ARR is currently $12.3M, tracking 2.5% above the January target.'
      }
    };
  }

  // --- ATLAS (Knowledge & SOP Agent) ---
  if (agentName === 'Atlas' || matchKeywords(lower, SOP_KEYWORDS)) {
    return {
      agentName: 'Atlas',
      content: 'I\'ve generated an onboarding & engineering SOP from our Knowledge Brain:',
      messageType: 'sop',
      metadata: {
        title: 'Engineering Onboarding SOP',
        steps: [
          { step: 1, title: 'Access & IAM Setup', description: 'Grant GitHub repository and Supabase dashboard access.' },
          { step: 2, title: 'Local Environment', description: 'Clone first-agentic-workspace and configure .env.local parameters.' },
          { step: 3, title: 'PromptQL Integration', description: 'Verify agent responses against local mock backend.' },
          { step: 4, title: 'Deploy & Verify', description: 'Push to main branch and monitor deployment status.' },
        ]
      }
    };
  }

  // --- ECHO (Comms Agent) ---
  return {
    agentName: 'Echo',
    content: `[PromptQL Comms Summary]\nHere is the team meeting summary extracted from your channel:\n\n📌 **Key Highlights:**\n- **Product:** AI Agentic Workspace with multi-agent coordination.\n- **Goal:** Increase user retention using instant PromptQL responses.`,
    messageType: 'text'
  };
}
