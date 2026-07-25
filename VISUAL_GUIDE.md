# 🎨 Visual Guide - AI Agentic Workspace System Architecture

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        AI AGENTIC WORKSPACE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                      USER INTERFACE (React/Vite)                     │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │                                                                      │  │
│  │  ┌─────────────────┐  ┌────────────────────┐  ┌──────────────────┐ │  │
│  │  │    SIDEBAR      │  │   CHAT PANEL       │  │  RIGHT PANEL     │ │  │
│  │  ├─────────────────┤  ├────────────────────┤  ├──────────────────┤ │  │
│  │  │ • Channels (9)  │  │ • Messages         │  │ • Agents Info    │ │  │
│  │  │ • Agents (4)    │  │ • Input Box        │  │ • Knowledge Brain│ │  │
│  │  │ • User Profile  │  │ • Message Renderer │  │ • Search         │ │  │
│  │  └─────────────────┘  └────────────────────┘  └──────────────────┘ │  │
│  │                                                                      │  │
│  │  MESSAGE RENDERING TYPES:                                          │  │
│  │  ├─ TEXT: Simple text responses                                    │  │
│  │  ├─ DASHBOARD: Interactive charts (Recharts)                       │  │
│  │  ├─ QUERY_RESULT: Data tables                                      │  │
│  │  ├─ SOP: Step-by-step procedures                                   │  │
│  │  └─ TASK: Task breakdowns & progress                               │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    INTELLIGENCE LAYER (Agents)                        │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │                                                                      │  │
│  │  IRIS 📊              ATLAS 🧠              NEXUS ⚙️              ECHO 💬 │
│  │  Data Agent           Knowledge Agent       Process Agent          Comms  │
│  │  ─────────            ─────────────         ───────────            ────── │
│  │  • SQL queries        • Semantic search     • SOP creation         • Draft │
│  │  • Dashboards         • Knowledge base      • Workflows            • Summary
│  │  • Analytics          • Context retrieval   • Automation           • Email │
│  │  • Reports            • Org info            • Documentation        • Comms │
│  │                                                                      │  │
│  │  MESSAGE TYPES:       TEXT                  SOP                    TEXT  │
│  │  └─ dashboard         └─ Rich response      └─ Steps              └─ Draft
│  │  └─ query_result      └─ Context            └─ Resources           └─ Summary
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                              ↓ Query                ↑ Response                 │
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                      KNOWLEDGE ENGINE (PromptQL)                      │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │                                                                      │  │
│  │  1. KNOWLEDGE BRAIN          2. PROMPTQL EXECUTION                 │  │
│  │     (Semantic Database)          (Query Engine)                     │  │
│  │     ───────────────────          ────────────────                  │  │
│  │     ┌─────────────────┐         ┌──────────────────┐              │  │
│  │     │ • Finance       │         │ API Endpoint:    │              │  │
│  │     │ • HR            │────────→│ execute_program  │              │  │
│  │     │ • Engineering   │         │                  │              │  │
│  │     │ • Product       │         │ SQL Execution    │──────→ DATA  │  │
│  │     │ • Operations    │         │ Deterministic    │              │  │
│  │     │ • Marketing     │         │ Semantic Graph   │              │  │
│  │     │ • AI            │         └──────────────────┘              │  │
│  │     └─────────────────┘                                           │  │
│  │                                                                      │  │
│  │  KNOWLEDGE CATEGORIES:       PROMPTQL CAPABILITIES:                │  │
│  │  ├─ Q4 Revenue Target        ├─ Data retrieval (SQL)              │  │
│  │  ├─ Hiring Plan 2025         ├─ Semantic search                   │  │
│  │  ├─ Product Roadmap          ├─ Cross-system queries              │  │
│  │  ├─ CAC/LTV Metrics          ├─ Deterministic execution           │  │
│  │  ├─ Engineering Handbook     ├─ Learning from corrections         │  │
│  │  ├─ Incident Response        └─ Real-time data access             │  │
│  │  └─ Brand Guidelines                                               │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    DATABASE LAYER (Supabase/Postgres)                │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │                                                                      │  │
│  │  ┌────────────┐  ┌──────────┐  ┌────────┐  ┌─────────────────┐   │  │
│  │  │ CHANNELS   │  │ MESSAGES │  │ AGENTS │  │ KNOWLEDGE_ITEMS │   │  │
│  │  ├────────────┤  ├──────────┤  ├────────┤  ├─────────────────┤   │  │
│  │  │ id (uuid)  │  │ id (uuid)│  │ id...  │  │ id (uuid)       │   │  │
│  │  │ name       │  │ channel_id├─ role   │  │ title           │   │  │
│  │  │ type       │  │ sender    │  │ status │  │ content         │   │  │
│  │  │ icon       │  │ content   │  │ caps   │  │ category        │   │  │
│  │  │ created_at │  │ message_  │  │ color  │  │ tags (array)    │   │  │
│  │  │            │  │ type      │  │        │  │ created_at      │   │  │
│  │  │ (9 items)  │  │ metadata  │  │ (4)    │  │ (15+ items)     │   │  │
│  │  │            │  │ created_at│  │        │  │                 │   │  │
│  │  └────────────┘  └──────────┘  └────────┘  └─────────────────┘   │  │
│  │       ↑               ↑               ↑              ↑              │  │
│  │     (Row Level Security enabled on all tables)                     │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔀 Message Flow & Agent Routing

```
USER INPUT
    │
    ├─ "@Iris show revenue"
    │
    ↓
┌─────────────────────────────┐
│  KEYWORD DETECTION (Step 1) │
└─────────────────────────────┘
    │
    ├─ Extract keywords: "show", "revenue"
    │
    ├─ Check against keyword lists:
    │  ├─ QUERY_KEYWORDS: [revenue ✓, sales, metrics, ...]
    │  ├─ SOP_KEYWORDS: [sop, process, how-to, ...]
    │  ├─ TASK_KEYWORDS: [create, build, make, ...]
    │  └─ SEARCH_KEYWORDS: [who, what is, explain, ...]
    │
    ↓
┌─────────────────────────────┐
│  AGENT SELECTION (Step 2)   │
└─────────────────────────────┘
    │
    ├─ Query keywords matched → pickAgent(input, agents)
    │
    ├─ Agent lookup:
    │  └─ agents.find(a => a.name === 'Iris')
    │
    ├─ Selected: IRIS (Data Agent)
    │
    ↓
┌─────────────────────────────┐
│  KNOWLEDGE LOOKUP (Step 3)  │
└─────────────────────────────┘
    │
    ├─ Iris searches knowledge_items for context:
    │  └─ tags @> ['revenue', 'metrics']
    │
    ├─ Found: "Q4 2024 Revenue Target"
    │
    ↓
┌─────────────────────────────┐
│  PROMPTQL EXECUTION (Step 4)│
└─────────────────────────────┘
    │
    ├─ Execute SQL via PromptQL:
    │  └─ SELECT revenue, target FROM metrics
    │
    ├─ Data returned:
    │  ├─ Aug: 8.2M (target: 8.0M)
    │  ├─ Sep: 9.1M (target: 8.5M)
    │  ├─ Oct: 10.4M (target: 9.5M)
    │  └─ ... (6 months total)
    │
    ↓
┌─────────────────────────────┐
│  RESPONSE GENERATION (Step 5│
└─────────────────────────────┘
    │
    ├─ Format response:
    │  └─ agentName: "Iris"
    │     content: "Here's revenue breakdown..."
    │     messageType: "dashboard"
    │     metadata: {
    │       type: 'revenue_chart',
    │       data: [{month, value, target}, ...],
    │       summary: 'ARR $12.3M, tracking 2.5% above target'
    │     }
    │
    ↓
┌─────────────────────────────┐
│  STORE MESSAGE (Step 6)     │
└─────────────────────────────┘
    │
    ├─ Insert into messages table:
    │  ├─ channel_id: (data-insights)
    │  ├─ sender_type: 'agent'
    │  ├─ sender_name: 'Iris'
    │  ├─ message_type: 'dashboard'
    │  ├─ metadata: { ...chart data... }
    │  └─ created_at: NOW()
    │
    ↓
┌─────────────────────────────┐
│  UI RENDERING (Step 7)      │
└─────────────────────────────┘
    │
    ├─ MessageRenderer checks message_type
    │  └─ If 'dashboard': render Recharts component
    │
    ├─ Display:
    │  ├─ Line chart with 6 months data
    │  ├─ Highlight trend (green: above target)
    │  ├─ Agent badge: "Iris" (blue)
    │  ├─ Summary text
    │  └─ Timestamp
    │
    ↓
✓ USER SEES INTERACTIVE DASHBOARD
```

---

## 🎯 Agent Capability Matrix

```
┌──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
│   IRIS 📊    │   ATLAS 🧠   │  NEXUS ⚙️    │   ECHO 💬    │   FEATURE    │
├──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│              │              │              │              │              │
│ SQL QUERIES  │ SEARCH       │ SOP CREATION │ SUMMARIZE    │ OUTPUT TYPE  │
│   ✓          │    ✓         │    ✓         │    ✓         │ ──────────── │
│              │              │              │              │              │
│ DASHBOARDS   │ CONTEXT      │ WORKFLOWS    │ DRAFTS       │ dashboard    │
│   ✓          │ RETRIEVAL    │   ✓          │    ✓         │ query_result │
│              │    ✓         │              │              │ sop          │
│ ANALYTICS    │ TIMELINE     │ AUTOMATION   │ EMAILS       │ text         │
│   ✓          │    ✓         │    ✓         │    ✓         │ task         │
│              │              │              │              │              │
│ REPORTS      │ ORG INFO     │ DOCS         │ MEETINGS     │              │
│   ✓          │    ✓         │    ✓         │    ✓         │              │
│              │              │              │              │              │
│ STATUS       │ STATUS       │ STATUS       │ STATUS       │              │
│ active 🟢    │ active 🟢    │ idle 🟡      │ active 🟢    │              │
│              │              │              │              │              │
└──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘

SKILL COMPARISON:

        IRIS  │ ATLAS │ NEXUS │ ECHO  │
        ─────┼───────┼───────┼───────┤
SQL      95%  │  50%  │  40%  │  20%  │
Search   30%  │  95%  │  60%  │  70%  │
Process  40%  │  60%  │  95%  │  70%  │
Comms    40%  │  70%  │  60%  │  95%  │
───────────────────────────────────────
```

---

## 🗺️ Channel Map & Agent Assignments

```
┌──────────────────────────────────────────────────────────────────────┐
│                         WORKSPACE CHANNELS                           │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  [#general]                [#engineering]          [#product]       │
│  ├─ Primary: Atlas         ├─ Primary: Nexus       ├─ Primary: Atlas
│  ├─ Secondary: Echo        ├─ Secondary: Iris      ├─ Secondary: Echo
│  └─ Use: Q&A, Announce     └─ Use: Tech, Infra     └─ Use: Planning
│                                                                      │
│  [#marketing]              [#data-insights]        [#onboarding]    │
│  ├─ Primary: Iris          ├─ Primary: Iris        ├─ Primary: Nexus
│  ├─ Secondary: Echo        ├─ Use: Analytics       ├─ Use: SOPs
│  └─ Use: Growth            └─ msg types: charts    └─ msg types: sop
│                                                                      │
│  [#agent-corner]           [#company-brain]        [#automations]   │
│  ├─ All Agents             ├─ Primary: Atlas       ├─ Primary: Nexus
│  ├─ Use: Testing           ├─ Use: KB access       ├─ Use: Workflows
│  └─ msg types: all         └─ msg types: text      └─ msg types: sop
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 💾 Data Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA MODEL RELATIONSHIPS                  │
└─────────────────────────────────────────────────────────────┘

CHANNELS (9 total)
│
├─→ (1:N) MESSAGES
│          │
│          ├─ sender_type: 'user' | 'agent' | 'system'
│          ├─ message_type: 'text' | 'dashboard' | 'query_result' | 'sop' | 'task'
│          ├─ metadata: structured response data
│          └─ created_at: timestamp
│
├─→ (N:M) AGENTS (via semantic routing)
│          │
│          ├─ Atlas (Knowledge Agent) - 🧠
│          ├─ Iris (Data Agent) - 📊
│          ├─ Nexus (Process Agent) - ⚙️
│          └─ Echo (Comms Agent) - 💬
│
└─→ Related via KNOWLEDGE_ITEMS (15+ items)
           │
           ├─ Category: Finance
           │  ├─ "Q4 2024 Revenue Target"
           │  └─ "Annual Revenue Breakdown"
           │
           ├─ Category: HR
           │  ├─ "Hiring Plan 2025"
           │  └─ "Compensation & Benefits"
           │
           ├─ Category: Engineering
           │  ├─ "System Architecture"
           │  ├─ "Dev Environment Setup"
           │  └─ "Incident Response Protocol"
           │
           ├─ Category: Product
           │  ├─ "Product Roadmap H1 2025"
           │  └─ "Feature Deprecation Policy"
           │
           ├─ Category: Operations
           │  ├─ "Meeting Schedule & Culture"
           │  └─ "Company Brain Documentation"
           │
           └─ Category: Marketing
              ├─ "Customer Success Stories"
              └─ "Brand Guidelines"

QUERY PATTERNS:
┌──────────────────────────────┐
│ agents search knowledge_items│
│ by tags & category           │
│                              │
│ example:                     │
│ WHERE tags @> ['revenue']    │
│ AND category = 'Finance'     │
└──────────────────────────────┘
```

---

## 📊 Message Type Rendering

```
┌─────────────────────────────────────────────────────────────────┐
│              MESSAGE TYPE → UI COMPONENT MAPPING                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  TEXT                          DASHBOARD                        │
│  ┌─────────────────────┐       ┌─────────────────────┐         │
│  │ Plain text response │       │  Interactive Chart  │         │
│  │ • Simple rendering  │       │  • Line chart       │         │
│  │ • Fast load         │       │  • Bar chart        │         │
│  │ • Knowledge base    │       │  • Area chart       │         │
│  │ • Explanations      │       │  • Real-time update │         │
│  └─────────────────────┘       │  • Legend & tooltip │         │
│                                │  • Summary below    │         │
│                                └─────────────────────┘         │
│                                                                 │
│  QUERY_RESULT                  SOP                             │
│  ┌─────────────────────┐       ┌─────────────────────┐         │
│  │   Data Table        │       │  Step-by-Step Guide │         │
│  │ • Columns & rows    │       │  • Step number      │         │
│  │ • Sortable          │       │  • Title            │         │
│  │ • Filterable        │       │  • Description      │         │
│  │ • Copy-able         │       │  • Resources        │         │
│  │ • Exportable        │       │  • Timeline         │         │
│  └─────────────────────┘       │  • Checkboxes       │         │
│                                └─────────────────────┘         │
│                                                                 │
│  TASK                                                           │
│  ┌─────────────────────┐                                       │
│  │  Task Breakdown     │                                       │
│  │  ┌────────────────┐ │                                       │
│  │  │ Task 1: Iris   │ │                                       │
│  │  │ Status: done ✓ │ │                                       │
│  │  │ Time: 3 min    │ │                                       │
│  │  ├────────────────┤ │                                       │
│  │  │ Task 2: Atlas  │ │                                       │
│  │  │ Status: done ✓ │ │                                       │
│  │  │ Time: 2 min    │ │                                       │
│  │  ├────────────────┤ │                                       │
│  │  │ Task 3: Nexus  │ │                                       │
│  │  │ Status: in-prog│ │                                       │
│  │  │ Time: ~5 min   │ │                                       │
│  │  └────────────────┘ │                                       │
│  └─────────────────────┘                                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Complete End-to-End Flow

```
┌─────────────┐
│   START     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│   USER types: "@Iris show revenue"          │
│   in #data-insights channel                 │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│   MESSAGE SAVED TO DB                       │
│   • sender_type: 'user'                     │
│   • sender_name: 'Asih Winarti'             │
│   • content: '@Iris show revenue'           │
│   • message_type: 'text'                    │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│   KEYWORD DETECTION                         │
│   Keywords found: ['show', 'revenue']       │
│   Match: QUERY_KEYWORDS ✓                   │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│   AGENT SELECTION: IRIS                     │
│   Iris is Data Agent specializing in SQL    │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│   KNOWLEDGE BRAIN SEARCH                    │
│   Tags: ['revenue', 'metrics']              │
│   Found: "Q4 2024 Revenue Target"           │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│   PROMPTQL EXECUTION                        │
│   Query: SELECT revenue FROM metrics        │
│   Result: 6 months of data                  │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│   RESPONSE GENERATION                       │
│   content: "Here's the revenue breakdown..."│
│   message_type: 'dashboard'                 │
│   metadata: {                               │
│     type: 'revenue_chart',                  │
│     data: [{month, value, target}, ...],    │
│     summary: 'ARR $12.3M, 2.5% above target'│
│   }                                         │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│   SAVE AGENT MESSAGE TO DB                  │
│   • sender_type: 'agent'                    │
│   • sender_name: 'Iris'                     │
│   • message_type: 'dashboard'               │
│   • metadata: { ...chart data... }          │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│   UI RENDERS DASHBOARD                      │
│   • Line chart showing 6 months             │
│   • Green highlight where > target          │
│   • Summary text below                      │
│   • Agent badge: "Iris" (blue)              │
│   • Timestamp                               │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────┐
│    END      │
│  ✓ Success  │
└─────────────┘
```

---

## 🎓 Knowledge Brain Taxonomy

```
┌──────────────────────────────────────────────────────────────┐
│              KNOWLEDGE BRAIN ORGANIZATION                    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  FINANCE (Revenue & Metrics)                                │
│  ├─ "Q4 2024 Revenue Target: $12.5M ARR"                   │
│  ├─ "Annual Revenue Breakdown by Channel"                  │
│  ├─ "Enterprise Deal Structure"                            │
│  ├─ "Customer Acquisition Cost Analysis"                   │
│  └─ tags: [revenue, metrics, sales, finance]               │
│                                                              │
│  HR (People & Culture)                                      │
│  ├─ "Hiring Plan 2025: 24 → 40 engineers"                 │
│  ├─ "Compensation & Benefits Overview"                     │
│  ├─ "First Week Checklist for New Employees"              │
│  ├─ "Hiring Process & Interview Rubric"                   │
│  └─ tags: [hiring, compensation, culture]                 │
│                                                              │
│  ENGINEERING (Code & Infrastructure)                        │
│  ├─ "System Architecture Overview (Kubernetes)"            │
│  ├─ "Development Environment Setup"                        │
│  ├─ "Code Review Standards"                                │
│  ├─ "Incident Response Protocol - CRITICAL"               │
│  └─ tags: [engineering, devops, architecture]              │
│                                                              │
│  PRODUCT (Strategy & Roadmap)                              │
│  ├─ "2025 Product Vision: AI-first"                        │
│  ├─ "Product Roadmap H1 2025"                              │
│  ├─ "Feature Deprecation Policy"                           │
│  └─ tags: [product, roadmap, features]                     │
│                                                              │
│  OPERATIONS (Process & SLA)                                │
│  ├─ "Meeting Schedule & Company Culture"                   │
│  ├─ "Data Privacy & Compliance"                            │
│  ├─ "Communication Protocols"                              │
│  └─ tags: [operations, process, sla]                       │
│                                                              │
│  MARKETING (Growth & Brand)                                │
│  ├─ "Customer Success Stories"                             │
│  ├─ "Brand Guidelines"                                     │
│  ├─ "Marketing Campaign Framework"                         │
│  └─ tags: [marketing, growth, brand]                       │
│                                                              │
│  AI (Agent Metrics)                                        │
│  ├─ "Agent Capability Matrix"                              │
│  └─ tags: [agents, ai, capabilities]                       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start Flowchart

```
START
  │
  ├─→ 1. READ QUICK_REFERENCE.md (5 min)
  │         Get cheat sheet & examples
  │
  ├─→ 2. LOAD SEED DATA (migration)
  │         Run: 20260726_seed_dummy_data.sql
  │
  ├─→ 3. OPEN APPLICATION
  │
  ├─→ 4. TEST EACH AGENT
  │         • #data-insights: "@Iris show revenue"
  │         • #onboarding: "@Nexus create SOP"
  │         • #general: "@Atlas what's roadmap?"
  │         • #general: "@Echo summarize week"
  │
  ├─→ 5. READ ARCHITECTURE.md (20 min)
  │         Understand system design
  │
  ├─→ 6. EXPLORE KNOWLEDGE BRAIN
  │         Open right panel, search items
  │
  ├─→ 7. READ PROMPTQL_GUIDE.md (if developer)
  │         Learn SQL patterns
  │
  ├─→ 8. BUILD CUSTOM FEATURES
  │         • Add new agent
  │         • Create channel
  │         • Connect integration
  │
  └─→ DONE! 🎉
```

---

**Visual Guide Complete!** ✓

For detailed explanations, see:
- QUICK_REFERENCE.md (cheat sheet)
- ARCHITECTURE.md (system design)
- PROMPTQL_GUIDE.md (technical)
