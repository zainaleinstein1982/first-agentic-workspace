# 📚 AI Agentic Workspace - Dokumentasi Index

Selamat datang! Di sini Anda akan menemukan semua dokumentasi tentang sistem AI Agentic Workspace.

---

## 🎯 Mulai dari Sini

### Jika Anda ingin **Overview Cepat** (5 menit)
👉 **[README_DUMMY_DATA.md](README_DUMMY_DATA.md)**
- Ringkasan sistem keseluruhan
- Pengenalan 4 AI agents
- Knowledge brain overview
- Contoh penggunaan

### Jika Anda ingin **Cheat Sheet Praktis** (Permanent Tab)
👉 **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)**
- Tabel cepat setiap agent
- Sample prompts untuk setiap agent
- Channel mapping
- Message type guide
- Keyword routing logic

### Jika Anda ingin **Pemahaman Mendalam** (30 menit)
👉 **[ARCHITECTURE.md](ARCHITECTURE.md)**
- System design lengkap
- Data model dan relationships
- Complete message flow
- Contoh skenario detailed
- PromptQL integration

### Jika Anda adalah **Developer/Data Engineer** (1 hour)
👉 **[PROMPTQL_GUIDE.md](PROMPTQL_GUIDE.md)**
- Apa itu PromptQL
- Per-agent PromptQL programs
- SQL query examples (Iris, Atlas, Nexus, Echo)
- Agent decision flow
- Integrasi dengan kode existing

### Jika Anda adalah **Visual Learner** (20 menit)
👉 **[VISUAL_GUIDE.md](VISUAL_GUIDE.md)**
- ASCII diagrams system architecture
- Message flow visualization
- Agent capability matrix
- Channel map
- Data relationships diagram
- End-to-end flow chart

### Jika Anda butuh **File Index & Summary**
👉 **[DOCUMENTATION_SUMMARY.txt](DOCUMENTATION_SUMMARY.txt)** (current file)
- Index semua dokumentasi
- Quick statistics
- Checklist completion

---

## 📊 Ringkasan Cepat

### 🤖 Empat AI Agents

| Agent | Warna | Fungsi | Contoh |
|-------|-------|--------|--------|
| **IRIS** | 🔵 Biru | Data queries, dashboards, analytics | `@Iris show revenue` |
| **ATLAS** | 🟢 Hijau | Knowledge search, Q&A, konteks | `@Atlas what's our roadmap?` |
| **NEXUS** | 🟠 Oranye | SOP creation, workflows, automation | `@Nexus create onboarding SOP` |
| **ECHO** | 🟣 Ungu | Summaries, drafts, communications | `@Echo draft announcement` |

### 📍 Channels

- **#general** → For company Q&A and announcements
- **#engineering** → For tech discussions
- **#product** → For product planning
- **#marketing** → For campaigns
- **#data-insights** → For analytics (Iris primary)
- **#onboarding** → For SOPs (Nexus primary)
- **#agent-corner** → For agent testing
- **#company-brain** → For knowledge access (Atlas)
- **#automations** → For workflows (Nexus)

### 💭 Message Types

- **text** → Plain text responses
- **dashboard** → Interactive charts with data
- **query_result** → Data tables
- **sop** → Step-by-step procedures
- **task** → Multi-agent task breakdown

### 🧠 Knowledge Brain

15+ items organized in 8 categories:
- Finance (revenue, CAC/LTV, metrics)
- HR (hiring, compensation, culture)
- Engineering (architecture, devops, incidents)
- Product (roadmap, vision, features)
- Operations (process, SLAs, compliance)
- Marketing (brand, campaigns, growth)
- AI (agent capabilities, metrics)

---

## 🎓 Belajar Berdasarkan Role

### 👔 Product Manager
1. Read: README_DUMMY_DATA.md
2. Explore: QUICK_REFERENCE.md (agent capabilities)
3. Try: Ask @Atlas & @Iris questions in channels
4. Learn: ARCHITECTURE.md (understand flow)

### 👨‍💻 Developer/Backend Engineer
1. Read: README_DUMMY_DATA.md
2. Understand: ARCHITECTURE.md (system design)
3. Deep dive: PROMPTQL_GUIDE.md (query patterns)
4. Reference: QUICK_REFERENCE.md (when needed)
5. Implement: Use examples from PROMPTQL_GUIDE.md

### 📊 Data Engineer
1. Review: PROMPTQL_GUIDE.md (SQL patterns)
2. Learn: Per-agent PromptQL programs
3. Implement: Execute queries via API
4. Reference: Query gallery in PROMPTQL_GUIDE.md
5. Optimize: Add custom PromptQL programs

### 🎨 Designer/UX
1. Review: VISUAL_GUIDE.md (diagrams)
2. Understand: QUICK_REFERENCE.md (message types)
3. Study: ARCHITECTURE.md (user flows)
4. Design: UI for each message type
5. Reference: Component examples in guides

### 👤 Product/Operations Lead
1. Start: README_DUMMY_DATA.md
2. Overview: QUICK_REFERENCE.md (all agents)
3. Deep dive: ARCHITECTURE.md
4. Plan: Use examples from README_DUMMY_DATA.md
5. Execute: Deploy with your team

---

## 📝 Documentation Map

```
START HERE
    ↓
README_DUMMY_DATA.md ⭐ (14K, 474 lines)
    ├─ System overview
    ├─ 4 agents explained
    ├─ Knowledge brain intro
    ├─ Example scenarios
    └─ Learning paths by role
    
├─→ QUICK_REFERENCE.md (11K, 370 lines)
│   ├─ Agent cheat sheet
│   ├─ Sample prompts
│   ├─ Channel mapping
│   ├─ Message types
│   └─ Keyword routing
    
├─→ ARCHITECTURE.md (14K, 353 lines)
│   ├─ System design
│   ├─ Data model
│   ├─ Message flow
│   ├─ Scenarios
│   └─ PromptQL intro
    
├─→ PROMPTQL_GUIDE.md (17K, 557 lines)
│   ├─ PromptQL explanation
│   ├─ Per-agent programs
│   ├─ SQL examples
│   ├─ Decision flow
│   └─ Integration
    
└─→ VISUAL_GUIDE.md (37K, 576 lines)
    ├─ ASCII diagrams
    ├─ Flow visualization
    ├─ Agent matrix
    ├─ Channel map
    └─ Relationship diagram

SEED DATA
    └─ supabase/migrations/20260726_seed_dummy_data.sql (18K, 395 lines)
       ├─ 15+ knowledge items
       ├─ 9 sample messages
       └─ 3 additional channels
```

---

## ❓ Jawaban Cepat

| Pertanyaan | Lihat |
|-----------|------|
| "Apa itu sistem ini?" | README_DUMMY_DATA.md |
| "Apa yang bisa Iris lakukan?" | QUICK_REFERENCE.md → IRIS table |
| "Bagaimana sistem bekerja?" | ARCHITECTURE.md |
| "Bagaimana cara routing?" | QUICK_REFERENCE.md → Routing Logic |
| "Contoh prompt apa?" | QUICK_REFERENCE.md → Sample Prompts |
| "Message type apa saja?" | QUICK_REFERENCE.md → Message Types |
| "Data model seperti apa?" | ARCHITECTURE.md → Data Model |
| "Flow lengkap seperti apa?" | VISUAL_GUIDE.md → Complete Flow |
| "Bagaimana PromptQL bekerja?" | PROMPTQL_GUIDE.md |
| "SQL pattern apa untuk Iris?" | PROMPTQL_GUIDE.md → Iris section |
| "Bagaimana integrasi kode?" | PROMPTQL_GUIDE.md → Integration |
| "Seed data apa saja?" | DOCUMENTATION_SUMMARY.txt atau lihat migration file |

---

## 🚀 Quick Start Steps

1. **Read (5 min):** README_DUMMY_DATA.md
2. **Load (1 min):** Run seed data migration
   ```bash
   supabase db push
   ```
3. **Explore (10 min):** Open app, try each agent in different channels
   - `@Iris show revenue` in #data-insights
   - `@Atlas what's our roadmap?` in #general
   - `@Nexus create SOP` in #onboarding
   - `@Echo summarize week` in #general
4. **Learn (20 min):** Read QUICK_REFERENCE.md for patterns
5. **Understand (30 min):** Read ARCHITECTURE.md for system design
6. **Deep Dive (1 hour):** Read PROMPTQL_GUIDE.md if developer
7. **Build:** Implement features using patterns from docs

---

## 📊 Documentation Statistics

```
Total Documentation: 2,751 lines
├─ README_DUMMY_DATA.md: 474 lines
├─ QUICK_REFERENCE.md: 370 lines
├─ ARCHITECTURE.md: 353 lines
├─ PROMPTQL_GUIDE.md: 557 lines
├─ VISUAL_GUIDE.md: 576 lines
└─ DOCUMENTATION_SUMMARY.txt: 424 lines

Seed Data: 395 lines
├─ 3 new channels
├─ 15+ knowledge items
└─ 9 sample messages

Coverage:
✓ 4 AI Agents fully documented
✓ 9 Channels explained
✓ 15+ Knowledge items included
✓ 5 Message types covered
✓ Per-agent PromptQL programs (3 each)
✓ SQL examples (12+ queries)
✓ Visual diagrams (8+ ASCII charts)
✓ End-to-end scenarios (4+ examples)
```

---

## 🎯 File Organization

```
Project Root/
├─ 📚_DOCUMENTATION_INDEX.md ← You are here
├─ README_DUMMY_DATA.md ⭐ Start here
├─ QUICK_REFERENCE.md (Keep as tab)
├─ ARCHITECTURE.md (Deep dive)
├─ PROMPTQL_GUIDE.md (For developers)
├─ VISUAL_GUIDE.md (For visual learners)
├─ DOCUMENTATION_SUMMARY.txt (Index & stats)
│
├─ supabase/migrations/
│  ├─ 20260724065716_create_workspace_schema.sql
│  └─ 20260726_seed_dummy_data.sql ✅ NEW
│
└─ src/
   ├─ lib/agentResponses.ts (Agent logic)
   ├─ hooks/useWorkspace.ts (Data fetching)
   └─ components/
      ├─ ChatPanel.tsx
      ├─ MessageRenderer.tsx
      ├─ Sidebar.tsx
      └─ RightPanel.tsx
```

---

## 💡 Pro Tips

1. **Keep QUICK_REFERENCE.md open as permanent tab** - untuk quick lookup
2. **Load seed data dulu** - untuk see examples in action
3. **Read in order:** README → QUICK_REF → ARCHITECTURE → PROMPTQL
4. **VISUAL_GUIDE.md best untuk explain ke orang lain**
5. **ARCHITECTURE.md best untuk understand connections**
6. **PROMPTQL_GUIDE.md copy SQL examples directly**

---

## ✅ Verification Checklist

Semua file telah dibuat dan diverifikasi:

- ✓ README_DUMMY_DATA.md (14K)
- ✓ QUICK_REFERENCE.md (11K)
- ✓ ARCHITECTURE.md (14K)
- ✓ PROMPTQL_GUIDE.md (17K)
- ✓ VISUAL_GUIDE.md (37K)
- ✓ DOCUMENTATION_SUMMARY.txt (15K)
- ✓ 📚_DOCUMENTATION_INDEX.md (this file)
- ✓ 20260726_seed_dummy_data.sql (18K)

**Total: 2,751 lines of documentation + 395 lines of seed data**

---

## 🎉 Selesai!

Anda sekarang memiliki dokumentasi lengkap untuk:
- ✅ Memahami sistem architecture
- ✅ Belajar setiap AI agent
- ✅ Mengerti knowledge brain
- ✅ Menggunakan PromptQL
- ✅ Melihat example messages
- ✅ Membangun features baru

### Langkah Pertama:
**Buka [README_DUMMY_DATA.md](README_DUMMY_DATA.md) sekarang!** 👈

---

**Last Updated:** July 26, 2025  
**Project:** raffasya-first-agentic-workspace  
**Admin:** Asih Winarti  
**Status:** ✨ Fully Documented & Ready to Explore
