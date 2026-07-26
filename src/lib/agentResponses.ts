export type AgentResponseResult = {
  agentName: string;
  content: string;
  messageType: 'text' | 'query_result' | 'dashboard' | 'sop' | 'task';
  metadata?: Record<string, unknown>;
};

type AgentRef = { name: string; role: string | null };

const QUERY_KEYWORDS = ['revenue', 'sales', 'metrics', 'data', 'show me', 'how many', 'analytics', 'numbers', 'report', 'stats', 'performance', 'cac', 'ltv'];
const SOP_KEYWORDS = ['sop', 'process', 'workflow', 'how to', 'steps', 'procedure', 'guide', 'onboard', 'setup', 'checklist'];
const COMMS_KEYWORDS = ['meeting', 'summary', 'draft', 'email', 'slack', 'q1', 'notes', 'summarize', 'action items'];
const TASK_KEYWORDS = ['create', 'build', 'make', 'generate', 'write', 'schedule', 'set up', 'configure', 'task'];

function matchKeywords(text: string, keywords: string[]) {
  const lower = text.toLowerCase();
  return keywords.some(kw => lower.includes(kw));
}

// Ekstraksi sebutan agen seperti "@Atlas", "@Echo", "@Raffasya"
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

function findByNameOrRole(agents: AgentRef[], nameQuery: string, roleQuery: string): string | undefined {
  return agents.find(a => 
    a.name.toLowerCase().includes(nameQuery.toLowerCase()) || 
    (a.role && a.role.toLowerCase().includes(roleQuery.toLowerCase()))
  )?.name;
}

export function pickAgent(input: string, agents: AgentRef[]): string {
  // 1. Prioritas Utama: Mention langsung (@AgentName)
  const mentioned = extractMentionedAgent(input, agents);
  if (mentioned) return mentioned;

  const lower = input.toLowerCase();

  // 2. Pencocokan Berdasarkan Kata Kunci PromptQL
  if (matchKeywords(lower, QUERY_KEYWORDS)) {
    return findByNameOrRole(agents, 'iris', 'data') ?? 'Iris';
  }
  if (matchKeywords(lower, SOP_KEYWORDS)) {
    return findByNameOrRole(agents, 'atlas', 'knowledge') ?? findByNameOrRole(agents, 'atlas', 'process') ?? 'Atlas';
  }
  if (matchKeywords(lower, COMMS_KEYWORDS)) {
    return findByNameOrRole(agents, 'echo', 'comms') ?? 'Echo';
  }
  if (matchKeywords(lower, TASK_KEYWORDS)) {
    return findByNameOrRole(agents, 'raffasya', 'orchestrator') ?? 'Raffasya';
  }

  // 3. Default ke Orchestrator/Knowledge Agent
  return findByNameOrRole(agents, 'raffasya', 'orchestrator') ?? agents[0]?.name ?? 'Atlas';
}

export function generateAgentResponse(input: string, agentName: string, agents: AgentRef[]): AgentResponseResult {
  const lower = input.toLowerCase();
  const agentLower = agentName.toLowerCase();

  // ----------------------------------------------------
  // 1. IRIS (Data Agent) -> Dashboard & Analytics
  // ----------------------------------------------------
  if (agentLower.includes('iris') || matchKeywords(lower, QUERY_KEYWORDS)) {
    if (lower.includes('revenue') || lower.includes('sales') || lower.includes('performance')) {
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
          summary: 'ARR is currently $12.3M, tracking 2.5% above the January target. Enterprise segment grew 18% MoM.'
        }
      };
    }
    return {
      agentName: 'Iris',
      content: 'Here\'s the customer acquisition & analytics report:',
      messageType: 'query_result',
      metadata: {
        type: 'table',
        title: 'CAC & LTV Analysis by Segment',
        columns: ['Segment', 'CAC', 'LTV', 'LTV:CAC', 'Trend'],
        rows: [
          ['SMB', '$4,200', '$15,960', '3.8x', '↑ +12%'],
          ['Mid-Market', '$9,800', '$52,920', '5.4x', '↑ +8%'],
          ['Enterprise', '$18,500', '$114,700', '6.2x', '↑ +22%'],
        ],
        summary: 'Enterprise LTV:CAC ratio improved 22% QoQ after new onboarding program launch.'
      }
    };
  }

  // ----------------------------------------------------
  // 2. ATLAS (Knowledge & Process Agent) -> SOP
  // ----------------------------------------------------
  if (agentLower.includes('atlas') || matchKeywords(lower, SOP_KEYWORDS)) {
    return {
      agentName: 'Atlas',
      content: 'I\'ve generated an onboarding & engineering SOP from our Knowledge Brain:',
      messageType: 'sop',
      metadata: {
        title: 'Engineering Onboarding SOP',
        steps: [
          { step: 1, title: 'Access & IAM Setup', description: 'Grant GitHub repository and Supabase dashboard access via Settings -> Team.' },
          { step: 2, title: 'Local Environment', description: 'Clone first-agentic-workspace and configure .env.local parameters.' },
          { step: 3, title: 'PromptQL Integration', description: 'Verify agent responses against local mock backend before pushing.' },
          { step: 4, title: 'Deploy & Verify', description: 'Push to main branch and monitor deployment status in GitHub Actions.' },
        ]
      }
    };
  }

  // ----------------------------------------------------
  // 3. ECHO (Comms Agent) -> Summary / Meeting Notes
  // ----------------------------------------------------
  if (agentLower.includes('echo') || matchKeywords(lower, COMMS_KEYWORDS)) {
    return {
      agentName: 'Echo',
      content: `[PromptQL Comms Summary]
Here is the Q1 Planning Meeting summary extracted from your team channel:

📌 **Key Highlights:**
- **Product:** AI Agentic Workspace with multi-agent coordination.
- **Goal:** Increase user retention by 25% using instant PromptQL responses.

📋 **Action Items:**
- **@Engineering:** Connect Supabase Realtime for instant chat streaming.
- **@Data Team:** Finalize SQL views for Iris Data Agent charts.`,
      messageType: 'text'
    };
  }

  // ----------------------------------------------------
  // 4. RAFFASYA (Workspace Orchestrator) -> Task Execution
  // ----------------------------------------------------
  return {
    agentName: 'Raffasya',
    content: 'Task plan generated and assigned across workspace agents:',
    messageType: 'task',
    metadata: {
      title: 'Workspace Execution Plan',
      tasks: [
        { id: 1, task: 'Extract knowledge context from docs', agent: 'Atlas', status: 'done', time: '1s' },
        { id: 2, task: 'Fetch live metrics from warehouse', agent: 'Iris', status: 'done', time: '2s' },
        { id: 3, task: 'Format team communication summary', agent: 'Echo', status: 'in_progress', time: '~1 min' },
        { id: 4, task: 'Finalize agent pipeline response', agent: 'Raffasya', status: 'pending', time: '~1 min' },
      ]
    }
  };
}
