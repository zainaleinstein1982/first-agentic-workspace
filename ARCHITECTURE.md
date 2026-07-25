# AI Agentic Workspace - Architecture & Components

## Overview

Ini adalah sistem kolaborasi real-time antara manusia dan AI agents dalam satu workspace terpadu. Sistem menggunakan konsep **PromptQL** - bahasa query untuk AI agents yang dapat reasoning, planning, dan bertindak pada enterprise data.

## Komponen Utama

### 1. **Channels** 📢
Saluran komunikasi berbeda untuk jenis pekerjaan/tim yang berbeda.

**Jenis Channel:**
- **Communication Channels** (general, engineering, product, marketing): Diskusi tim regular
- **Data Channels** (data-insights): Untuk analisis data dan dashboard
- **Onboarding Channels** (onboarding): SOP dan training materials

**Relasi dengan Agents:**
- Setiap channel bisa memiliki default AI agents
- Agents merespons pertanyaan/permintaan di channel sesuai expertise mereka

---

### 2. **AI Agents** 🤖
Specialized AI workers dengan capabilities spesifik.

#### **Atlas** - Knowledge Agent 🧠
- **Role:** Company brain & historian
- **Capabilities:** search, summarize, retrieve, history
- **Contoh Tasks di Channel:**
  - `@Atlas who is the VP of Engineering?` → Cari dari knowledge brain
  - `@Atlas explain our revenue model` → Retrieve dari docs
  - `@Atlas when did we launch product X?` → Timeline dari history

#### **Iris** - Data Agent 📊
- **Role:** Analytics & SQL query engine
- **Capabilities:** sql, charts, analytics, reports
- **Contoh Tasks di Channel:**
  - `@Iris show revenue vs target last 6 months` → Generate dashboard
  - `@Iris what's our CAC by segment?` → Query results table
  - `@Iris create monthly sales report` → Automated report

#### **Nexus** - Process Agent ⚙️
- **Role:** SOP creator & workflow automation
- **Capabilities:** sop, workflow, automation, docs
- **Contoh Tasks di Channel:**
  - `@Nexus create onboarding SOP for new engineers` → Step-by-step guide
  - `@Nexus automate our incident response workflow` → Process flow
  - `@Nexus generate team meeting checklist` → Structured document

#### **Echo** - Comms Agent 💬
- **Role:** Communication & meeting handler
- **Capabilities:** summarize, meetings, emails, slack
- **Contoh Tasks di Channel:**
  - `@Echo summarize last 3 all-hands meetings` → Summary
  - `@Echo draft weekly team update` → Communication
  - `@Echo find action items from Q4 board meeting` → Extraction

---

### 3. **Knowledge Brain** 🧠
Shared company knowledge base yang powered by AI.

**Tipe Knowledge Items:**
```
1. Strategy & Planning
   - Revenue targets
   - Hiring plans
   - Product roadmap
   - Quarterly goals

2. Operations
   - Engineering handbook
   - Incident response procedures
   - Deployment processes
   - Company policies

3. Metrics & Analysis
   - CAC/LTV data
   - Performance KPIs
   - Market research
   - Competitive analysis

4. Team & People
   - Org structure
   - Team bios
   - Role descriptions
   - Interview notes
```

**Cara Agents Menggunakan Knowledge Brain:**
- Atlas mencari context dari knowledge brain untuk jawaban
- Iris referensi metrics untuk data requests
- Nexus embed knowledge into SOPs
- Echo summarizes knowledge untuk communications

---

### 4. **Messages & Interactions** 💭

**Message Types:**
```
1. text - Regular conversation
2. query_result - Structured data results (table format)
3. dashboard - Visual data (charts, metrics)
4. sop - Step-by-step procedures
5. task - Multi-agent task breakdown
```

**Flow Interaksi:**
```
User Input → Keyword Matching → Agent Selection → 
Response Generation (dengan metadata) → Render sesuai message type
```

**Routing Logic:**
```
Query Keywords (revenue, sales, metrics) → Iris (Data Agent)
SOP Keywords (process, workflow, how-to) → Nexus (Process Agent)
Task Keywords (create, build, make) → Echo (Comms Agent)
Search Keywords (who, what, explain) → Atlas (Knowledge Agent)
Default → Atlas
```

---

## Data Model

### Channels Table
```sql
id: uuid
name: text (general, engineering, data-insights, etc.)
description: text
type: 'channel' | 'agent' | 'dm'
icon: text (lucide icon name)
created_at: timestamptz
```

### Agents Table
```sql
id: uuid
name: text (Atlas, Iris, Nexus, Echo)
description: text
role: text (Knowledge Agent, Data Agent, etc.)
status: 'active' | 'idle' | 'busy'
capabilities: text[] [sql, charts, search, etc.]
avatar_color: text (#10b981, #3b82f6, etc.)
created_at: timestamptz
```

### Knowledge Items Table
```sql
id: uuid
title: text
content: text
category: text (Finance, HR, Product, etc.)
source: text (Board Meeting, Handbook, etc.)
tags: text[] [revenue, q4, targets, etc.]
created_at: timestamptz
updated_at: timestamptz
```

### Messages Table
```sql
id: uuid
channel_id: uuid (FK → channels)
sender_type: 'user' | 'agent' | 'system'
sender_name: text
sender_avatar: text
content: text
message_type: 'text' | 'query_result' | 'dashboard' | 'sop' | 'task'
metadata: jsonb (structured results)
created_at: timestamptz
```

---

## Contoh Skenario Penggunaan

### Scenario 1: Revenue Query di #data-insights
```
User: @Iris show me our Q4 revenue vs target
↓
System: Detects QUERY keywords → Route ke Iris
↓
Iris: Mencari dari Knowledge Brain:
  - "Q4 2024 Revenue Target: $12.5M ARR"
  - Historical revenue data
↓
Response: 
  - Message type: "dashboard"
  - Metadata: { chart data, summary insights }
  - Renders: Visual chart dengan comparison
```

### Scenario 2: SOP Request di #onboarding
```
User: @Nexus create new engineer onboarding SOP
↓
System: Detects SOP keywords → Route ke Nexus
↓
Nexus: Retrieves dari Knowledge Brain:
  - "Engineering Incident Response" (process reference)
  - Existing SOPs (template)
↓
Response:
  - Message type: "sop"
  - Metadata: { steps: [...], resources: [...] }
  - Renders: Step-by-step guide dengan links
```

### Scenario 3: Knowledge Search di #general
```
User: @Atlas when did we launch AI memory feature?
↓
System: Detects SEARCH keywords → Route ke Atlas
↓
Atlas: Searches Knowledge Brain:
  - "Product Roadmap H1 2025" → AI memory layer Q1
  - Historical messages → Launch date
↓
Response:
  - Message type: "text"
  - Content: "Based on product roadmap, AI memory layer launched Q1 2025..."
```

### Scenario 4: Multi-Agent Task di #engineering
```
User: Create a comprehensive report on our hiring plan
↓
System: Detects TASK keywords → Route ke Echo + other agents
↓
Task Breakdown:
  1. Atlas: Gather hiring strategy from knowledge
  2. Iris: Query hiring metrics and budget status
  3. Nexus: Generate recruitment process SOP
  4. Echo: Draft executive summary
↓
Response:
  - Message type: "task"
  - Metadata: { tasks: [{agent, status, result}, ...] }
  - Renders: Progress board + final output
```

---

## PromptQL Integration

**PromptQL** adalah language untuk AI agents yang powerful:

```
POST https://api.promptql.pro.hasura.io/execute_program
```

**Kegunaan dalam Project:**
1. **Data Retrieval:** Iris menggunakan PromptQL untuk query database
2. **Semantic Search:** Atlas menggunakan untuk intelligent search
3. **Report Generation:** Nexus menggunakan untuk create SOPs
4. **Context Resolution:** Semua agents menggunakan untuk understand business context

**Contoh PromptQL Query yang Iris bisa jalankan:**
```
-- Get revenue by segment for dashboard
SELECT 
  segment,
  SUM(arr) as total_revenue,
  COUNT(*) as account_count
FROM accounts
WHERE status = 'active'
GROUP BY segment
ORDER BY total_revenue DESC
```

---

## Flow Lengkap: User Message → Agent Response → Render

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USER INPUT                                               │
│    Message: "@Iris show revenue for last 6 months"        │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. KEYWORD DETECTION (agentResponses.ts)                   │
│    - Find keywords: revenue, show, metrics                 │
│    - Match with QUERY_KEYWORDS                             │
│    - Route to: Iris (Data Agent)                           │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. KNOWLEDGE BRAIN LOOKUP                                   │
│    - Query knowledge_items table                            │
│    - Find: "Q4 2024 Revenue Target", related metrics       │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. DATA QUERY EXECUTION (via PromptQL/Direct SQL)          │
│    - Fetch monthly revenue data                             │
│    - Format for visualization                              │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. RESPONSE GENERATION                                      │
│    Type: "dashboard"                                        │
│    Content: "Here's the revenue breakdown..."              │
│    Metadata:                                                │
│    {                                                        │
│      type: 'revenue_chart',                                │
│      data: [{month, value, target}, ...],                 │
│      summary: "ARR is $12.3M, tracking 2.5% above target"  │
│    }                                                        │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. MESSAGE STORE (messages table)                           │
│    - Save to Supabase                                       │
│    - sender_type: 'agent'                                   │
│    - sender_name: 'Iris'                                    │
│    - message_type: 'dashboard'                              │
│    - metadata: { chart_data }                              │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 7. UI RENDERING (MessageRenderer.tsx)                       │
│    - Check message_type: 'dashboard'                        │
│    - Render chart component                                │
│    - Display summary                                       │
│    - Show agent avatar (Iris blue)                         │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Insights

| Component | Role | Connected To | Output |
|-----------|------|--------------|--------|
| **Atlas** | Knowledge retrieval | Knowledge Brain | Text responses + context |
| **Iris** | Data analysis | Database + Metrics | Dashboards + tables |
| **Nexus** | Process automation | Knowledge Brain | SOPs + workflows |
| **Echo** | Communications | All | Summaries + drafts |
| **Knowledge Brain** | Memory system | All agents + channels | Semantic search results |
| **Channels** | Organization | Messages + agents | Grouped conversations |

---

## Next Steps untuk Enhancement

1. **Agent Learning:** Improve agent responses based on correction feedback
2. **Channel-Agent Mapping:** Assign primary agents to channels
3. **Custom Integrations:** Connect Slack, Notion, GitHub untuk knowledge sync
4. **Analytics Dashboard:** Track agent usage, response quality, channel activity
5. **PromptQL Advanced:** Implement complex queries dan reasoning loops
