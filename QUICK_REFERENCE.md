# Quick Reference - AI Agentic Workspace

## 🎯 Cheat Sheet untuk Setiap Agent

### IRIS - Data Agent 📊
**Ciri:** Blue avatar | Data queries | Dashboards & charts

| Input Pattern | Returns | Example |
|---|---|---|
| "show revenue" | dashboard | 6-month chart + summary |
| "what's our CAC?" | query_result | Table: Segment, CAC, LTV, ratio |
| "churn rate" | dashboard | Retention cohort + trend |
| "create report" | query_result | Structured metrics table |

**Knowledge Brain Links:** Q4 Revenue Target, CAC/LTV metrics, Performance KPIs

**PromptQL Uses:** Revenue queries, customer segmentation, retention analysis

---

### ATLAS - Knowledge Agent 🧠
**Ciri:** Green avatar | Q&A | Text responses with context

| Input Pattern | Returns | Example |
|---|---|---|
| "what is...?" | text | Explanation from knowledge brain |
| "when did we...?" | text | Timeline from documents |
| "explain..." | text | Strategic context |
| "find..." | text | Search results + relevance |

**Knowledge Brain Links:** Strategy, Roadmap, Company History, Org Structure

**PromptQL Uses:** Semantic search, knowledge graph traversal, context retrieval

---

### NEXUS - Process Agent ⚙️
**Ciri:** Amber avatar | SOP creation | Step-by-step procedures

| Input Pattern | Returns | Example |
|---|---|---|
| "create SOP for..." | sop | 5-step procedure |
| "generate workflow..." | sop | Automation guide |
| "how to...?" | sop | Process with resources |
| "automate..." | sop | Workflow steps |

**Knowledge Brain Links:** Engineering Handbook, Company Processes, HR Policies

**PromptQL Uses:** Process templates, automation detection, step generation

---

### ECHO - Comms Agent 💬
**Ciri:** Purple avatar | Summaries | Communications & drafts

| Input Pattern | Returns | Example |
|---|---|---|
| "summarize..." | text | Condensed summary |
| "draft..." | text | Communication draft |
| "what decisions...?" | text | Decision list |
| "create update..." | text | Status update |

**Knowledge Brain Links:** Recent updates, Strategy, Customer stories

**PromptQL Uses:** Message aggregation, decision extraction, context compilation

---

## 📍 Channel × Agent Mapping

```
CHANNEL               PRIMARY AGENT         SECONDARY AGENT
─────────────────────────────────────────────────────────────
#general             Atlas (Knowledge)      Echo (Comms)
#engineering         Nexus (Process)        Iris (Data)
#product             Atlas (Knowledge)      Echo (Comms)
#marketing           Iris (Data)            Echo (Comms)
#data-insights       Iris (Data)            ─
#onboarding          Nexus (Process)        ─
#agent-corner        All Agents             ─
#company-brain       Atlas (Knowledge)      ─
#automations         Nexus (Process)        ─
```

---

## 📊 Message Types & When Used

```
MESSAGE TYPE    AGENT           USE CASE                    EXAMPLE
─────────────────────────────────────────────────────────────
text            Any             Q&A, explanations           "Here's the context..."
query_result    Iris            Structured data (tables)    CAC by segment table
dashboard       Iris            Visual charts & metrics     Revenue chart 6mo
sop             Nexus           Step procedures             Onboarding 5 steps
task            Echo/Any        Multi-step breakdown        Task execution plan
```

---

## 🔄 Agent Routing Logic

```
USER MESSAGE
    ↓
┌─────────────────────────────────────────┐
│ KEYWORD DETECTION                       │
├─────────────────────────────────────────┤
│ "revenue", "sales", "metrics"     → Iris
│ "sop", "process", "how to"        → Nexus
│ "create", "build", "make"         → Echo
│ "who", "what", "explain"          → Atlas
│ DEFAULT (no match)                → Atlas
└─────────────────────────────────────────┘
    ↓
[SELECTED AGENT EXECUTES]
    ↓
RESPONSE (text/dashboard/sop/query_result)
```

---

## 🎓 Example Usage Scenarios

### Scenario 1: Daily Revenue Check
```
👤 Manager: "@Iris what's today's revenue vs target?"
🤖 Iris:
  - Queries: Last 30 days ARR
  - Compares: Actual vs $12.5M Q4 target
  - Returns: Dashboard with trend
📊 Response Type: dashboard
```

### Scenario 2: New Team Member Onboarding
```
👤 HR: "@Nexus create onboarding SOP for engineers"
🤖 Nexus:
  - References: Engineering Handbook, existing SOPs
  - Generates: 5-step procedure
  - Includes: Resources, time estimates
📋 Response Type: sop
```

### Scenario 3: Quarterly Strategy Review
```
👤 CEO: "@Atlas what's our product roadmap?"
🤖 Atlas:
  - Searches: Knowledge brain for roadmap
  - Retrieves: "Product Roadmap H1 2025"
  - Context: Q1 priorities, milestones
📝 Response Type: text
```

### Scenario 4: Comprehensive Report
```
👤 CFO: "Create Q1 business review"
🤖 Echo ORCHESTRATES:
  - Iris: Get financial metrics
  - Atlas: Pull strategic context
  - Echo: Draft summary
  - Result: Multi-section report
📄 Response Type: task (breakdown) + text (final)
```

---

## 🗂️ Knowledge Brain Categories

```
CATEGORY          OWNS                              TAGS
──────────────────────────────────────────────────────────
Finance           Revenue, CAC/LTV, Compensation   [revenue, metrics, sales]
HR                Hiring, Culture, Policies        [hiring, compensation, culture]
Engineering       Handbook, Infrastructure, Code   [engineering, devops, architecture]
Product           Roadmap, Features, Vision        [product, features, roadmap]
Operations        Processes, SLAs, Compliance      [operations, process, sla]
Marketing         Campaigns, Brand, Analytics      [marketing, growth, brand]
AI                Agent Capabilities, Metrics      [agents, ai, capabilities]
```

---

## 🔗 Data Relationships

```
channels ──(1:N)──→ messages
   ↑                   ↑
   │                   │
   └───← agents ←──────┘
   
agents ────(N:1)──→ knowledge_items
                        ↑
                        │
                   (semantic search)
                        │
                  (used by: Atlas)


FLOW:
user message → keyword detection → select agent → 
knowledge_items lookup → PromptQL execution → 
format response → save message → render UI
```

---

## 📝 Sample Prompts & Expected Responses

### For IRIS 📊
```
✓ "show me our MRR for last 6 months"
  → dashboard with line chart

✓ "what's customer churn rate?"
  → query_result table

✓ "compare CAC vs LTV by segment"
  → query_result table with 3 segments

✓ "customer acquisition metrics"
  → dashboard with multiple charts
```

### For ATLAS 🧠
```
✓ "what's our Q1 roadmap?"
  → text with product priorities

✓ "when did we hire VP Engineering?"
  → text with timeline context

✓ "explain our revenue model"
  → text with detailed explanation

✓ "who leads the engineering team?"
  → text with org context
```

### For NEXUS ⚙️
```
✓ "create incident response SOP"
  → sop with escalation steps

✓ "generate new hire onboarding process"
  → sop with day-by-day breakdown

✓ "automate deployment workflow"
  → sop with automation steps

✓ "create team meeting checklist"
  → sop with agenda items
```

### For ECHO 💬
```
✓ "summarize #engineering this week"
  → text with key points

✓ "draft product launch announcement"
  → text (draft email)

✓ "what decisions did we make last month?"
  → text with decision list

✓ "create executive summary"
  → text with high-level overview
```

---

## 🔍 Keyword Matching (How Routing Works)

```
USER INPUT: "@Iris show revenue breakdown"

STEP 1: Extract text
  text = "show revenue breakdown"

STEP 2: Match keywords
  QUERY_KEYWORDS = [
    'revenue', 'sales', 'metrics', 'data', 'show me', 
    'how many', 'analytics', 'numbers', 'report', 'stats', 
    'performance'
  ]
  
  Found: "show" (✓), "revenue" (✓), "breakdown" (✗)
  Match: YES

STEP 3: Route to agent
  Agent = agents.find(a => a.name === 'Iris')
  Result: ✓ Iris

STEP 4: Generate response
  messageType: 'dashboard'
  metadata: { type: 'revenue_chart', data: [...] }
```

---

## 📈 Performance Metrics to Track

```
Agent Performance Indicators:

IRIS (Data Agent):
  - Query execution time
  - Dashboard accuracy
  - Data freshness
  - User satisfaction

ATLAS (Knowledge Agent):
  - Search relevance score
  - Answer correctness
  - Context richness
  - Usage frequency

NEXUS (Process Agent):
  - SOP completion time
  - Workflow automation success
  - User feedback
  - Reusability score

ECHO (Comms Agent):
  - Summary quality
  - Draft usefulness
  - Tone appropriateness
  - Engagement rate
```

---

## 🚀 Quick Implementation Checklist

```
□ Read ARCHITECTURE.md for system overview
□ Read PROMPTQL_GUIDE.md for data query patterns
□ Load seed data (20260726_seed_dummy_data.sql)
□ Test each agent in corresponding channel:
  □ Iris in #data-insights
  □ Nexus in #onboarding
  □ Echo in #general
  □ Atlas in #general
□ Review Knowledge Brain items
□ Verify message routing works
□ Check metadata rendering in MessageRenderer
□ Test dashboard & SOP rendering
```

---

## 🎯 Key Takeaways

1. **Channels** organize by use case (finance, eng, marketing, etc.)
2. **Agents** specialize by capability (data, knowledge, process, comms)
3. **Knowledge Brain** powers all agent responses with context
4. **PromptQL** enables deterministic queries on enterprise data
5. **Messages** store diverse response types (dashboard, sop, etc.)
6. **Routing** uses keywords to match user intent to best agent
7. **Metadata** makes responses actionable (charts, steps, etc.)

---

## 🔗 Quick Links

- Full Architecture: [ARCHITECTURE.md](./ARCHITECTURE.md)
- PromptQL Deep Dive: [PROMPTQL_GUIDE.md](./PROMPTQL_GUIDE.md)
- Seed Data: [supabase/migrations/20260726_seed_dummy_data.sql](./supabase/migrations/20260726_seed_dummy_data.sql)
- Agent Code: [src/lib/agentResponses.ts](./src/lib/agentResponses.ts)
- Hook: [src/hooks/useWorkspace.ts](./src/hooks/useWorkspace.ts)
