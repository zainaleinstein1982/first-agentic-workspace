# 📚 AI Agentic Workspace - Dokumentasi Dummy Data & Fungsi

Selamat datang! Dokumen ini menjelaskan fungsi masing-masing komponen dalam AI Agentic Workspace dan bagaimana semuanya terhubung.

---

## 🎯 Ringkasan Cepat

Sistem ini adalah **kolaborasi real-time antara manusia dan AI agents** dalam workspace terpadu, di mana:

- **Channels** 📢 = Ruang komunikasi untuk setiap tim/fungsi
- **AI Agents** 🤖 = Specialist workers dengan capabilities berbeda
- **Knowledge Brain** 🧠 = Repository pengetahuan perusahaan terpusat
- **PromptQL** 💾 = Query language untuk AI agents mengakses data
- **Messages** 💭 = Percakapan dengan berbagai tipe output (text, dashboard, sop, task)

---

## 📖 Dokumentasi Tersedia

| File | Isi | Untuk Siapa |
|------|-----|-----------|
| **QUICK_REFERENCE.md** | Cheat sheet, contoh prompts, routing logic | Semua orang (mulai dari sini!) |
| **ARCHITECTURE.md** | Sistem design, data model, flow lengkap | Developer, architect |
| **PROMPTQL_GUIDE.md** | Query patterns per agent, SQL examples | Data engineer, backend |
| **20260726_seed_dummy_data.sql** | Sample data untuk testing | DBA, QA |

---

## 🤖 Keempat AI Agents Dijelaskan

### 1️⃣ IRIS - Data Agent 📊
```
Role: Analytics engine & dashboard generator
Capabilities: SQL queries, charts, metrics, reports
Use for: Revenue, CAC/LTV, performance metrics, business intelligence

Example Questions:
  "@Iris show revenue vs target last 6 months"
  "@Iris what's our CAC by customer segment?"
  "@Iris create monthly churn report"

Output Types:
  - dashboard (with charts)
  - query_result (with tables)
```

**Knowledge Brain Connections:** Q4 Revenue Target, CAC/LTV Analysis, Metrics & KPIs

**PromptQL Programs:**
- Revenue analysis (6-month trend)
- Customer segmentation (CAC/LTV by segment)
- Churn & retention (cohort analysis)

---

### 2️⃣ ATLAS - Knowledge Agent 🧠
```
Role: Company brain & institutional knowledge retrieval
Capabilities: Search, context retrieval, historical timeline, org info
Use for: Q&A about strategy, decisions, history, company knowledge

Example Questions:
  "@Atlas what's our product roadmap for H1 2025?"
  "@Atlas when did we hire the VP of Engineering?"
  "@Atlas explain our revenue model"

Output Types:
  - text (with rich context)
```

**Knowledge Brain Connections:** Product Roadmap, Hiring Plan, Company History, Strategy

**PromptQL Programs:**
- Semantic search in knowledge base
- Cross-reference related documents
- Timeline extraction from documents

---

### 3️⃣ NEXUS - Process Agent ⚙️
```
Role: SOP creator & workflow automation expert
Capabilities: Generate procedures, create SOPs, automate workflows, documentation
Use for: Process documentation, onboarding, automation setup

Example Questions:
  "@Nexus create onboarding SOP for new engineers"
  "@Nexus generate incident response workflow"
  "@Nexus automate our report generation"

Output Types:
  - sop (step-by-step procedures)
```

**Knowledge Brain Connections:** Engineering Handbook, Process Library, Company Procedures

**PromptQL Programs:**
- Retrieve existing process templates
- Find automatable tasks
- Generate step-by-step procedures

---

### 4️⃣ ECHO - Comms Agent 💬
```
Role: Communication specialist & summarizer
Capabilities: Summarization, draft generation, meeting notes, communication
Use for: Summaries, drafts, internal communications, updates

Example Questions:
  "@Echo summarize #engineering this week"
  "@Echo draft product launch announcement"
  "@Echo what decisions were made this quarter?"

Output Types:
  - text (summaries, drafts)
```

**Knowledge Brain Connections:** Recent Updates, Strategy, Customer Stories

**PromptQL Programs:**
- Message aggregation from channels
- Decision extraction
- Communication context compilation

---

## 📍 Channel Guide

```
CHANNEL           | Type      | Primary Agent | Purpose
──────────────────┼───────────┼───────────────┼──────────────────────
#general          | Channel   | Atlas + Echo  | Company announcements & Q&A
#engineering      | Channel   | Nexus + Iris  | Tech team discussions
#product          | Channel   | Atlas + Echo  | Product planning
#marketing        | Channel   | Iris + Echo   | Campaign & growth
#data-insights    | Channel   | Iris          | Analytics & dashboards
#onboarding       | Channel   | Nexus         | New employee SOPs
#agent-corner     | Channel   | All Agents    | Agent testing ground
#company-brain    | Channel   | Atlas         | Knowledge base access
#automations      | Channel   | Nexus         | Workflow setup
```

---

## 🧠 Knowledge Brain Overview

Knowledge items tersimpan dalam 8 kategori dengan tag semantic:

```
CATEGORY        | Example Items                    | Tags
────────────────┼──────────────────────────────────┼─────────────────
Finance         | Revenue target, CAC/LTV analysis | [revenue, metrics]
HR              | Hiring plan, compensation        | [hiring, culture]
Engineering     | System architecture, dev setup   | [engineering, devops]
Product         | Roadmap, vision, features        | [product, roadmap]
Operations      | Incident response, policies      | [operations, sop]
Marketing       | Brand guidelines, case studies   | [marketing, brand]
AI              | Agent capabilities, metrics      | [agents, ai]
```

**Contoh Knowledge Items:**
- "Q4 2024 Revenue Target: $12.5M ARR"
- "Hiring Plan 2025: Grow from 24 to 40 engineers"
- "Product Roadmap H1 2025: AI memory layer, multiplayer"
- "Engineering Incident Response: P0 response <15min"
- "CAC & LTV by Segment: SMB 3.8x, Enterprise 6.2x"

---

## 🔄 Bagaimana Semuanya Bekerja?

### Flow Sederhana

```
USER INPUT
    ↓
"@Iris show revenue last 6 months"
    ↓
KEYWORD DETECTION
    ↓
Detect: "revenue", "show", "metrics" = Query keywords
    ↓
AGENT SELECTION
    ↓
Route to Iris (Data Agent)
    ↓
KNOWLEDGE BRAIN LOOKUP
    ↓
Find: "Q4 2024 Revenue Target" context
    ↓
PROMPTQL QUERY EXECUTION
    ↓
SELECT revenue for last 6 months
    ↓
DATA FORMATTING
    ↓
Format as: { type: 'revenue_chart', data: [...] }
    ↓
MESSAGE STORAGE
    ↓
Save to messages table with metadata
    ↓
UI RENDERING
    ↓
Display as interactive chart with summary
```

---

## 💾 PromptQL Integration

**PromptQL** adalah query language yang memungkinkan AI agents bertindak deterministically pada data.

**Setiap agent menggunakan PromptQL untuk:**

| Agent | Purpose | Example Query |
|-------|---------|---------------|
| **Iris** | Data queries | `SELECT revenue, target FROM monthly_metrics` |
| **Atlas** | Knowledge search | `SELECT * FROM knowledge_items WHERE tags @> $1` |
| **Nexus** | Process retrieval | `SELECT * FROM procedures WHERE category = $1` |
| **Echo** | Context aggregation | `SELECT messages FROM channels WHERE id = $1` |

**Keuntungan PromptQL:**
- Decouples LLM planning dari deterministic execution
- Semantic graph yang belajar dari user corrections
- Real-time data access across databases dan SaaS
- Reliable untuk mission-critical tasks

---

## 📊 Message Types & Rendering

Setiap message bisa memiliki tipe berbeda dengan metadata structured:

```
MESSAGE TYPE      | Agent    | Contains What?              | Rendering
──────────────────┼──────────┼─────────────────────────────┼──────────────────
text              | Any      | Plain text response         | Simple text
query_result      | Iris     | Table: columns + rows       | Data table
dashboard         | Iris     | Chart data + summary        | Interactive chart
sop               | Nexus    | Steps + resources           | Step-by-step guide
task              | Echo     | Breakdown of tasks          | Progress board
```

---

## 🎓 Contoh Penggunaan End-to-End

### Scenario 1: Revenue Dashboard
```
👤 Manager di #data-insights: 
   "@Iris show me revenue vs target last 6 months"

🔍 System:
   - Detects keywords: revenue, show, metrics
   - Routes to: Iris (Data Agent)
   - Queries knowledge: "Q4 2024 Revenue Target"
   - Executes PromptQL: SELECT revenue, target FROM metrics

🤖 Iris returns:
   - message_type: "dashboard"
   - data: [
       {month: 'Aug', value: 8.2, target: 8.0},
       {month: 'Sep', value: 9.1, target: 8.5},
       ...
     ]
   - summary: "ARR is $12.3M, tracking 2.5% above target"

📊 UI renders interactive chart showing trend
```

### Scenario 2: Onboarding SOP
```
👤 HR Lead di #onboarding:
   "@Nexus create onboarding SOP for new engineers"

🔍 System:
   - Detects keywords: sop, create, process
   - Routes to: Nexus (Process Agent)
   - Queries knowledge: "Engineering Handbook", existing SOPs

🤖 Nexus returns:
   - message_type: "sop"
   - steps: [
       {step: 1, title: "Pre-Arrival Setup", ...},
       {step: 2, title: "Day 1 - Orientation", ...},
       ...
     ]
   - resources: ["Handbook link", "Repository", "Point person"]

📋 UI renders step-by-step guide with timeline
```

### Scenario 3: Knowledge Search
```
👤 Product Manager di #general:
   "@Atlas what's our product roadmap for H1 2025?"

🔍 System:
   - Detects keywords: what is, roadmap, explain
   - Routes to: Atlas (Knowledge Agent)
   - Queries PromptQL: Search knowledge_items for "roadmap"

🤖 Atlas returns:
   - message_type: "text"
   - content: "Priority features: AI memory layer (Q1), 
              multiplayer workspaces (Q1), SOC2 compliance (Q2)..."

📝 UI displays as rich text with context
```

---

## 🔧 Testing Dummy Data

### 1. Jalankan Migration

```bash
# Jalankan seed data migration di Supabase
supabase db push
```

### 2. Verifikasi Data Dimuat

```bash
# Check channels created
SELECT name, type FROM channels ORDER BY created_at;

# Check agents active
SELECT name, role, status FROM agents;

# Check knowledge items
SELECT title, category FROM knowledge_items;

# Check sample messages
SELECT sender_name, message_type FROM messages LIMIT 10;
```

### 3. Test Setiap Agent

**Test Iris (Data):**
```
Type: "@Iris what's our CAC by segment?"
Expected: query_result table with 3 segments
```

**Test Nexus (Process):**
```
Type: "@Nexus create onboarding SOP"
Expected: sop with 5 steps
```

**Test Atlas (Knowledge):**
```
Type: "@Atlas what's our revenue target?"
Expected: text with Q4 target context
```

**Test Echo (Comms):**
```
Type: "@Echo summarize this week"
Expected: text with summary of activities
```

---

## 📚 Learning Path

### For Everyone:
1. **Start:** QUICK_REFERENCE.md (5 min read)
2. **Explore:** Try each agent with sample prompts
3. **Understand:** Read ARCHITECTURE.md overview

### For Developers:
4. **Deep Dive:** ARCHITECTURE.md (flow, data model)
5. **Implementation:** PROMPTQL_GUIDE.md (agent queries)
6. **Testing:** Load seed data, test endpoints

### For Data Engineers:
7. **PromptQL:** PROMPTQL_GUIDE.md (SQL patterns, execution)
8. **Integration:** Implement executePromptQL function
9. **Optimization:** Monitor query performance

---

## 🎯 Key Insights

| Component | Role | Powers | Connected To |
|-----------|------|--------|--------------|
| **Channels** | Organization | Team collaboration | Messages, Agents |
| **Agents** | Intelligence | Task execution | Knowledge Brain |
| **Knowledge Brain** | Memory | Agent responses | All agents |
| **PromptQL** | Execution | Data retrieval | Iris, Atlas, Nexus |
| **Messages** | Storage | Conversation history | All |

**The Magic:**
```
User Request (natural language)
    ↓
Keyword Detection → Route to best Agent
    ↓
Agent queries Knowledge Brain + PromptQL
    ↓
Response formatted with metadata
    ↓
UI renders appropriate visualization (text/chart/sop/table)
```

---

## 🚀 Next Steps

1. **Load Seed Data:** Run 20260726_seed_dummy_data.sql
2. **Explore Channels:** Try different prompts in each channel
3. **Review Agents:** Understand each agent's capabilities
4. **Test PromptQL:** Run sample queries in PROMPTQL_GUIDE.md
5. **Build Features:** Implement custom agents or channels
6. **Deploy:** Push to production with live data

---

## 📞 Quick Help

**Can't find what you're looking for?**

| Topic | See |
|-------|-----|
| "How do agents work?" | ARCHITECTURE.md → Agent section |
| "What can Iris do?" | QUICK_REFERENCE.md → IRIS table |
| "How to write PromptQL?" | PROMPTQL_GUIDE.md → Per-Agent Usage |
| "What channels exist?" | QUICK_REFERENCE.md → Channel Mapping |
| "Where's the dummy data?" | 20260726_seed_dummy_data.sql |

---

## 📖 Document Index

```
START HERE
    ↓
README_DUMMY_DATA.md (this file - overview)
    ↓
├─→ QUICK_REFERENCE.md (cheat sheet, examples)
│
├─→ ARCHITECTURE.md (system design, full flow)
│
└─→ PROMPTQL_GUIDE.md (technical queries, integration)
    
+ Seed Data: supabase/migrations/20260726_seed_dummy_data.sql
+ Code: src/lib/agentResponses.ts (agent logic)
+ Code: src/hooks/useWorkspace.ts (data fetching)
```

---

## 🎉 Selesai!

Anda sekarang memiliki:
- ✅ Pemahaman lengkap tentang AI Agentic Workspace
- ✅ Dokumentasi untuk setiap komponen & agent
- ✅ Dummy data untuk testing & learning
- ✅ PromptQL patterns untuk data retrieval
- ✅ Contoh scenarios end-to-end

**Mulai dari** QUICK_REFERENCE.md atau langsung buka aplikasi dan coba setiap agent! 🚀

---

**Last Updated:** July 26, 2025  
**Project:** raffasya-first-agentic-workspace  
**Workspace Admin:** Asih Winarti
