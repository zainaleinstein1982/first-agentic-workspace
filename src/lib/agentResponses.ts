export type AgentResponseResult = {
  agentName: string;
  content: string;
  messageType: 'text' | 'query_result' | 'dashboard' | 'sop' | 'task';
  metadata?: Record<string, unknown>;
};

const QUERY_KEYWORDS = ['revenue', 'sales', 'metrics', 'data', 'show me', 'how many', 'analytics', 'numbers', 'report', 'stats', 'performance'];
const SOP_KEYWORDS = ['sop', 'process', 'workflow', 'how to', 'steps', 'procedure', 'guide', 'onboard', 'setup'];
const SEARCH_KEYWORDS = ['who', 'what is', 'when did', 'find', 'search', 'history', 'tell me', 'explain', 'summarize'];
const TASK_KEYWORDS = ['create', 'build', 'make', 'generate', 'write', 'draft', 'schedule', 'set up', 'configure'];

function matchKeywords(text: string, keywords: string[]) {
  const lower = text.toLowerCase();
  return keywords.some(kw => lower.includes(kw));
}

type AgentRef = { name: string; role: string | null };

// Role names as seeded in the `agents` table schema. Matching by role (not by
// a hardcoded display name like "Nexus" or "Raffasya") means routing keeps
// working correctly even if an agent gets renamed in the database.
const ROLE_DATA = 'Data Agent';
const ROLE_PROCESS = 'Process Agent';
const ROLE_COMMS = 'Comms Agent';
const ROLE_KNOWLEDGE = 'Knowledge Agent';

function findByRole(agents: AgentRef[], role: string): string | undefined {
  return agents.find(a => a.role === role)?.name;
}

// Find an explicit "@AgentName" mention in the input. This takes priority over
// keyword-based routing, so `@Atlas what's our revenue?` always goes to Atlas
// instead of being hijacked by the "revenue" keyword.
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

  if (matchKeywords(input, QUERY_KEYWORDS)) return findByRole(agents, ROLE_DATA) ?? agents[0]?.name ?? 'Atlas';
  if (matchKeywords(input, SOP_KEYWORDS)) return findByRole(agents, ROLE_PROCESS) ?? agents[0]?.name ?? 'Atlas';
  if (matchKeywords(input, TASK_KEYWORDS)) return findByRole(agents, ROLE_COMMS) ?? agents[0]?.name ?? 'Atlas';
  if (matchKeywords(input, SEARCH_KEYWORDS)) return findByRole(agents, ROLE_KNOWLEDGE) ?? agents[0]?.name ?? 'Atlas';
  return findByRole(agents, ROLE_KNOWLEDGE) ?? agents[0]?.name ?? 'Atlas';
}

export function generateAgentResponse(input: string, agentName: string, agents: AgentRef[]): AgentResponseResult {
  const lower = input.toLowerCase();
  const role = agents.find(a => a.name === agentName)?.role ?? null;

  // Each agent only ever produces the message type matching its role.
  // Data Agent -> dashboard/query_result, Process Agent -> sop, Comms Agent -> task/text, Knowledge Agent -> text.
  const isData = role === ROLE_DATA;
  const isProcess = role === ROLE_PROCESS;
  const isComms = role === ROLE_COMMS;
  const isKnowledge = role === ROLE_KNOWLEDGE;

  if (isData || (!isProcess && !isComms && !isKnowledge && matchKeywords(input, QUERY_KEYWORDS))) {
    if (lower.includes('revenue') || lower.includes('sales')) {
      return {
        agentName,
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
    if (lower.includes('cac') || lower.includes('customer') || lower.includes('acquisition')) {
      return {
        agentName,
        content: 'Here\'s the customer acquisition analysis from CRM and marketing data:',
        messageType: 'query_result',
        metadata: {
          type: 'table',
          title: 'CAC & LTV by Segment',
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
    return {
      agentName,
      content: 'I\'ve run the query against your connected data sources. Here\'s what I found:',
      messageType: 'query_result',
      metadata: {
        type: 'table',
        title: 'Data Query Results',
        columns: ['Metric', 'This Month', 'Last Month', 'Change'],
        rows: [
          ['Active Users', '14,230', '12,840', '↑ +10.8%'],
          ['New Signups', '1,890', '1,420', '↑ +33.1%'],
          ['Churn Rate', '2.1%', '2.6%', '↓ -0.5pp'],
          ['NPS Score', '62', '58', '↑ +4pts'],
        ],
        summary: 'Overall health metrics are trending positively. User growth is accelerating.'
      }
    };
  }

  if (isProcess || (!isData && !isComms && !isKnowledge && matchKeywords(input, SOP_KEYWORDS))) {
    return {
      agentName,
      content: 'I\'ve generated a standard operating procedure based on your request:',
      messageType: 'sop',
      metadata: {
        title: 'Standard Operating Procedure',
        steps: [
          { step: 1, title: 'Initial Setup', description: 'Configure the workspace and invite team members via Settings → Members → Invite.' },
          { step: 2, title: 'Define Roles & Permissions', description: 'Assign roles (Admin, Member, Viewer) based on team function. Admins can manage agents and channels.' },
          { step: 3, title: 'Connect Data Sources', description: 'Integrate your tools under Settings → Integrations. Supported: Slack, Notion, GitHub, Google Workspace, Salesforce.' },
          { step: 4, title: 'Configure AI Agents', description: 'Enable agents relevant to your workflow. Each agent can be assigned to specific channels for targeted assistance.' },
          { step: 5, title: 'Train the Knowledge Brain', description: 'Upload documents, paste content, or sync from connected tools to build the shared company brain.' },
          { step: 6, title: 'Launch & Monitor', description: 'Announce to the team. Track agent activity via the Analytics dashboard and refine agent prompts as needed.' },
        ]
      }
    };
  }

  if ((isComms && matchKeywords(input, TASK_KEYWORDS)) || (!isData && !isProcess && !isKnowledge && matchKeywords(input, TASK_KEYWORDS))) {
    return {
      agentName,
      content: 'Task created and delegated to the relevant agents. Here\'s the breakdown:',
      messageType: 'task',
      metadata: {
        title: 'Task Execution Plan',
        tasks: [
          { id: 1, task: 'Gather requirements from stakeholders', agent: findByRole(agents, ROLE_KNOWLEDGE) ?? 'Atlas', status: 'done', time: '2 min' },
          { id: 2, task: 'Query relevant historical data', agent: findByRole(agents, ROLE_DATA) ?? 'Iris', status: 'done', time: '45s' },
          { id: 3, task: 'Draft initial content structure', agent: findByRole(agents, ROLE_PROCESS) ?? 'Nexus', status: 'in_progress', time: '~3 min' },
          { id: 4, task: 'Review and finalize output', agent: findByRole(agents, ROLE_COMMS) ?? 'Echo', status: 'pending', time: '~2 min' },
        ]
      }
    };
  }

  // Default knowledge search response
  const knowledgeResponses = [
    {
      keywords: ['revenue', 'target', 'arr', 'hiring', 'headcount', 'engineer'],
      content: 'Based on our shared company brain, here\'s what I found about your query. The Q4 2024 revenue target was set at **$12.5M ARR**, with focus on enterprise deals. Current pipeline confidence is at 78%. The engineering team is planned to grow from 24 to 40 engineers by end of 2025.',
      messageType: 'text' as const,
    },
    {
      keywords: ['roadmap', 'product', 'feature', 'plan', 'vision'],
      content: 'I\'ve searched across all connected tools — Slack, Notion, meeting transcripts, and documents. The most relevant context is: the product roadmap for H1 2025 prioritizes the AI memory layer and multiplayer workspaces in Q1, followed by SOC2 compliance in Q2. No need to ping anyone — I have the full history.',
      messageType: 'text' as const,
    },
    {
      keywords: ['incident', 'p0', 'p1', 'outage', 'escalat', 'on-call', 'oncall'],
      content: 'Great question. From the engineering handbook: P0 incidents require on-call response within **15 minutes**, escalation goes On-call → Tech Lead → CTO, and post-mortems are mandatory within 48 hours for all P0/P1 incidents. Want me to generate a full incident response SOP?',
      messageType: 'text' as const,
    },
  ];

  // Prefer a response whose keywords actually appear in the user's message
  // (this is what makes @Atlas / @Echo "search" and "summarize" mentions from
  // SEARCH_KEYWORDS feel like they're answering the actual question asked).
  const contextual = knowledgeResponses.find(r => matchKeywords(input, r.keywords));
  const picked = contextual ?? knowledgeResponses[Math.floor(Math.random() * knowledgeResponses.length)];
  return { agentName, content: picked.content, messageType: picked.messageType };
}
