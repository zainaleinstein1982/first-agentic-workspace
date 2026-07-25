/*
# Seed Dummy Data untuk Demonstrasi AI Agentic Workspace

Ini berisi:
1. Channel dengan berbagai tipe
2. AI Agents dengan capabilities spesifik
3. Knowledge Items untuk Knowledge Brain
4. Sample Messages menunjukkan berbagai interaction patterns
5. Contoh responses dari setiap agent type
*/

-- ============================================================
-- 1. SEED CHANNELS (sudah ada di migration pertama, ini adds more detail)
-- ============================================================

-- Channel untuk demo sudah ada:
-- - general, engineering, product, marketing, data-insights, onboarding

-- Tambahan context untuk channels yang ada
INSERT INTO channels (name, description, type, icon) VALUES
  ('agent-corner', 'Direct collaboration dengan AI agents', 'channel', 'Zap'),
  ('company-brain', 'Knowledge base & documentation', 'channel', 'BookOpen'),
  ('automations', 'AI-generated workflows & SOPs', 'channel', 'Workflow')
ON CONFLICT DO NOTHING;

-- ============================================================
-- 2. AGENTS (sudah ada, tapi kita add more detailed descriptions)
-- ============================================================

-- Agents sudah di-seed dengan description basic
-- Kita perbaiki dengan deskripsi yang lebih detail

-- ============================================================
-- 3. SEED KNOWLEDGE ITEMS (sudah ada dasar, kita tambah lebih banyak)
-- ============================================================

-- Tambah lebih banyak knowledge items
INSERT INTO knowledge_items (title, content, category, source, tags) VALUES
  -- Finance & Revenue
  ('Annual Revenue Breakdown by Channel', 'Direct Sales: 45% ($5.6M), Partnerships: 35% ($4.4M), Self-Serve: 20% ($2.5M). Fastest growing: Partnerships +28% YoY.', 'Finance', 'FY2024 Annual Report', ARRAY['revenue', 'sales', 'channels', 'breakdown']),
  ('Enterprise Deal Structure', 'Standard terms: 3-year contract, $100k+ minimum ACV, 20% annual discount, 30-day support SLA, dedicated account manager at $500k+ ACV.', 'Finance', 'Sales Handbook', ARRAY['deals', 'contract', 'terms', 'enterprise']),
  
  -- Engineering & Tech
  ('System Architecture Overview', 'Microservices on Kubernetes. API Gateway → Services (Auth, Data, AI, Analytics) → Database (Postgres + Redis) → Message Queue (Kafka). Deployed on AWS EKS.', 'Engineering', 'Tech Docs', ARRAY['architecture', 'infrastructure', 'kubernetes', 'aws']),
  ('Development Environment Setup', '1. Clone repo, 2. npm install, 3. Copy .env.example to .env, 4. docker-compose up, 5. npm run dev. Requires Docker, Node 18+, Postgres 14+.', 'Engineering', 'Engineering Handbook', ARRAY['onboarding', 'dev-setup', 'docker']),
  ('Code Review Standards', 'All PRs require 2 approvals from senior engineers. Max 400 LOC per PR. Automated tests must pass. Coverage target: 80%+. Review SLA: 24 hours.', 'Engineering', 'Engineering Standards', ARRAY['code-review', 'quality', 'standards', 'process']),
  
  -- Product & Strategy
  ('2025 Product Vision', 'Focus: AI-first collaboration. Q1-Q2 priorities: memory persistence, multimodal reasoning, agent orchestration. Target: 10M daily active agents by EOY.', 'Product', 'Product Strategy 2025', ARRAY['vision', 'product', '2025', 'strategy']),
  ('Feature Deprecation Policy', 'Deprecation warning period: 3 months minimum. Users must be notified via email, in-app, and docs. Alternative features must be documented.', 'Product', 'Product Guidelines', ARRAY['policy', 'deprecation', 'support']),
  
  -- Marketing & Growth
  ('Customer Success Stories', 'Case Study 1: TechCorp saved $2M using our analytics agents. Case Study 2: FinServe reduced report gen time from 40hrs to 4hrs. Case Study 3: RetailCo automated 50+ workflows.', 'Marketing', 'Marketing Collateral', ARRAY['case-studies', 'success', 'customers']),
  ('Brand Guidelines', 'Primary color: #0066FF (Iris Blue), Secondary: #10B981 (Emerald). Typography: Inter (body), JetBrains Mono (code). Tone: Friendly, technical, empowering. Logo: Modern, agent-inspired.', 'Marketing', 'Brand Book', ARRAY['branding', 'guidelines', 'design']),
  
  -- Operations & Process
  ('Incident Response Protocol - CRITICAL', 'P0: Response <15min, Resolve <4hrs. P1: Response <1hr, Resolve <24hrs. P2: Response <4hrs, Resolve <7 days. P3: Resolve <30 days. Escalation: On-Call → Tech Lead → CTO → CEO.', 'Operations', 'SRE Handbook', ARRAY['incidents', 'sre', 'critical', 'process']),
  ('Meeting Schedule & Culture', 'All-hands: Every 2 weeks, Friday 4pm. Eng standup: Daily 10am. 1-1s: Weekly, 30min. No meetings 2-4pm (Focus Hours). Calendar must reflect real plans.', 'Operations', 'Company Culture Doc', ARRAY['meetings', 'culture', 'calendar', 'time-management']),
  ('Hiring Process & Interview Rubric', 'Rounds: Phone screen, Technical, Design/System, Culture fit. Scoring: 1-5 per round. 4+ average to advance. Rejection: <3 average. Timeline: 2 weeks max.', 'HR', 'Hiring Handbook', ARRAY['hiring', 'interviews', 'recruitment', 'process']),
  
  -- AI & Analytics
  ('Agent Capability Matrix', 'Atlas: Knowledge (80%), NLP (90%). Iris: Analytics (95%), SQL (90%). Nexus: SOP Gen (85%), Automation (80%). Echo: Summarization (90%), Email (75%).', 'AI', 'Agent Analytics', ARRAY['agents', 'capabilities', 'performance', 'metrics']),
  ('Data Privacy & Compliance', 'GDPR: Customer data encrypted at rest & transit. CCPA: Retention policy 30 days for logs. SOC2 Type II in progress (Target: Q2 2025). HIPAA: Available for healthcare customers.', 'Operations', 'Compliance Docs', ARRAY['security', 'privacy', 'compliance', 'gdpr']),
  
  -- Onboarding & Learning
  ('First Week Checklist for New Employees', 'Day 1: Office tour, IT setup, Slack intro. Day 2: Product demo, docs review. Day 3: Meet team, 1-1 with manager. Day 4-5: First task, pair programming. EOM: Ramp-up complete.', 'HR', 'Onboarding SOP', ARRAY['onboarding', 'new-hire', 'checklist', 'process']),
  ('Compensation & Benefits Overview', 'Salary: Market-based (levels H1-H5). Bonus: 10-20% annual performance. Stock: All employees, 4-year vest, 1-year cliff. Benefits: Unlimited PTO, health, 401k 6% match.', 'HR', 'HR Handbook', ARRAY['compensation', 'benefits', 'salary', 'equity'])
ON CONFLICT DO NOTHING;

-- ============================================================
-- 4. SEED MESSAGES (Sample interactions showing different patterns)
-- ============================================================

-- Get channel IDs for reference (we'll use them in messages)
-- Note: In real usage, you'd substitute actual IDs from the channels table

-- Helper: We'll insert messages that showcase each agent type and message type

-- Sample Message 1: Query Result (Iris - Data Agent)
INSERT INTO messages (channel_id, sender_type, sender_name, sender_avatar, content, message_type, metadata, created_at) 
SELECT 
  c.id,
  'agent',
  'Iris',
  'iris-avatar',
  'Here''s the customer acquisition analysis from CRM and marketing data:',
  'query_result',
  jsonb_build_object(
    'type', 'table',
    'title', 'CAC & LTV by Segment (Q4 2024)',
    'columns', jsonb_build_array('Segment', 'CAC', 'LTV', 'LTV:CAC Ratio', 'QoQ Trend'),
    'rows', jsonb_build_array(
      jsonb_build_array('SMB', '$4,200', '$15,960', '3.8x', '↑ +12%'),
      jsonb_build_array('Mid-Market', '$9,800', '$52,920', '5.4x', '↑ +8%'),
      jsonb_build_array('Enterprise', '$18,500', '$114,700', '6.2x', '↑ +22%')
    ),
    'summary', 'Enterprise LTV:CAC ratio improved 22% QoQ after implementing new onboarding program. SMB segment showing strong expansion in product usage.'
  ),
  NOW() - INTERVAL '2 days'
FROM channels c WHERE c.name = 'data-insights' LIMIT 1;

-- Sample Message 2: Dashboard (Iris - Data Agent)
INSERT INTO messages (channel_id, sender_type, sender_name, sender_avatar, content, message_type, metadata, created_at)
SELECT 
  c.id,
  'agent',
  'Iris',
  'iris-avatar',
  'Here''s the revenue breakdown I pulled from your data warehouse:',
  'dashboard',
  jsonb_build_object(
    'type', 'revenue_chart',
    'title', 'Revenue Performance – Last 6 Months',
    'data', jsonb_build_array(
      jsonb_build_object('month', 'Aug', 'value', 8.2, 'target', 8.0),
      jsonb_build_object('month', 'Sep', 'value', 9.1, 'target', 8.5),
      jsonb_build_object('month', 'Oct', 'value', 10.4, 'target', 9.5),
      jsonb_build_object('month', 'Nov', 'value', 11.2, 'target', 10.5),
      jsonb_build_object('month', 'Dec', 'value', 11.8, 'target', 11.5),
      jsonb_build_object('month', 'Jan', 'value', 12.3, 'target', 12.0)
    ),
    'summary', 'ARR is currently $12.3M, tracking 2.5% above the January target. Enterprise segment grew 18% MoM.'
  ),
  NOW() - INTERVAL '1 day'
FROM channels c WHERE c.name = 'data-insights' LIMIT 1;

-- Sample Message 3: SOP (Nexus - Process Agent)
INSERT INTO messages (channel_id, sender_type, sender_name, sender_avatar, content, message_type, metadata, created_at)
SELECT 
  c.id,
  'agent',
  'Nexus',
  'nexus-avatar',
  'I''ve generated a comprehensive onboarding SOP for new engineers:',
  'sop',
  jsonb_build_object(
    'title', 'New Engineer Onboarding Standard Operating Procedure',
    'steps', jsonb_build_array(
      jsonb_build_object(
        'step', 1,
        'title', 'Pre-Arrival Setup',
        'description', 'IT prepares laptop, GitHub access, Slack account. Send laptop 2 days before start date.'
      ),
      jsonb_build_object(
        'step', 2,
        'title', 'Day 1 - Orientation',
        'description', 'Office tour, IT setup, HR intro, Slack orientation. Meet direct manager and team.'
      ),
      jsonb_build_object(
        'step', 3,
        'title', 'Day 2-3 - Technical Onboarding',
        'description', 'Dev environment setup (using guide in #engineering). Pair program with senior engineer. Deploy first PR by Day 3.'
      ),
      jsonb_build_object(
        'step', 4,
        'title', 'Week 2 - Project Assignment',
        'description', 'Assign to first real project. Establish weekly 1-1 schedule. Intro to customer calls.'
      ),
      jsonb_build_object(
        'step', 5,
        'title', 'Week 4 - Ramp-up Complete',
        'description', 'Contribute independently. Attend first architecture review. Begin mentorship of future hires if applicable.'
      )
    ),
    'resources', jsonb_build_array(
      'Handbook: Development Environment Setup',
      'Repository: onboarding-playbook',
      'Team: Engineering Lead (point person)'
    ),
    'estimatedTime', '4 weeks to productivity'
  ),
  NOW() - INTERVAL '3 hours'
FROM channels c WHERE c.name = 'onboarding' LIMIT 1;

-- Sample Message 4: Task Breakdown (Echo - Comms Agent)
INSERT INTO messages (channel_id, sender_type, sender_name, sender_avatar, content, message_type, metadata, created_at)
SELECT 
  c.id,
  'agent',
  'Echo',
  'echo-avatar',
  'I''ve broken down this request into actionable tasks across our agents:',
  'task',
  jsonb_build_object(
    'title', 'Generate Q1 Business Review Deck',
    'tasks', jsonb_build_array(
      jsonb_build_object(
        'id', 1,
        'task', 'Gather financial performance data',
        'agent', 'Iris',
        'status', 'done',
        'result', 'Revenue: $12.3M ARR (+2.5% vs target), MRR growth: 3.2% MoM',
        'time', '3 min'
      ),
      jsonb_build_object(
        'id', 2,
        'task', 'Extract strategic context from knowledge brain',
        'agent', 'Atlas',
        'status', 'done',
        'result', 'Q1 focus areas: AI memory layer, multiplayer workspaces, market expansion',
        'time', '2 min'
      ),
      jsonb_build_object(
        'id', 3,
        'task', 'Compile customer success stories',
        'agent', 'Echo',
        'status', 'in_progress',
        'result', 'Processing case studies: TechCorp, FinServe, RetailCo',
        'time', '~5 min'
      ),
      jsonb_build_object(
        'id', 4,
        'task', 'Draft executive summary',
        'agent', 'Echo',
        'status', 'pending',
        'result', 'Awaiting completion of task 3',
        'time', '~4 min'
      )
    ),
    'totalEstimatedTime', '~14 minutes'
  ),
  NOW() - INTERVAL '30 min'
FROM channels c WHERE c.name = 'general' LIMIT 1;

-- Sample Message 5: Text Response (Atlas - Knowledge Agent)
INSERT INTO messages (channel_id, sender_type, sender_name, sender_avatar, content, message_type, metadata, created_at)
SELECT 
  c.id,
  'agent',
  'Atlas',
  'atlas-avatar',
  'Based on our shared company brain, here''s what I found: The Q4 2024 revenue target was set at $12.5M ARR with focus on enterprise deals above $50k ACV. Current pipeline shows 78% confidence of hitting target. We''ve allocated budget for 3 additional sales engineers to support the pipeline growth. The engineering team is planned to grow from 24 to 40 by end of 2025, with priority on ML and backend expertise.',
  'text',
  NULL,
  NOW() - INTERVAL '45 min'
FROM channels c WHERE c.name = 'general' LIMIT 1;

-- Sample Message 6: User asking Iris for query
INSERT INTO messages (channel_id, sender_type, sender_name, sender_avatar, content, message_type, metadata, created_at)
SELECT 
  c.id,
  'user',
  'Asih Winarti',
  NULL,
  '@Iris what''s our current ARR and how does it compare to target?',
  'text',
  NULL,
  NOW() - INTERVAL '2 days'
FROM channels c WHERE c.name = 'data-insights' LIMIT 1;

-- Sample Message 7: User asking Nexus for SOP
INSERT INTO messages (channel_id, sender_type, sender_name, sender_avatar, content, message_type, metadata, created_at)
SELECT 
  c.id,
  'user',
  'Team Lead',
  NULL,
  '@Nexus can you create the onboarding SOP for new engineers? We need it for Monday.',
  'text',
  NULL,
  NOW() - INTERVAL '3 hours'
FROM channels c WHERE c.name = 'onboarding' LIMIT 1;

-- Sample Message 8: User asking Atlas for knowledge
INSERT INTO messages (channel_id, sender_type, sender_name, sender_avatar, content, message_type, metadata, created_at)
SELECT 
  c.id,
  'user',
  'Product Manager',
  NULL,
  '@Atlas what''s our product roadmap for H1 2025?',
  'text',
  NULL,
  NOW() - INTERVAL '45 min'
FROM channels c WHERE c.name = 'general' LIMIT 1;

-- Sample Message 9: System message showing agent routing
INSERT INTO messages (channel_id, sender_type, sender_name, sender_avatar, content, message_type, metadata, created_at)
SELECT 
  c.id,
  'system',
  'Workspace',
  NULL,
  'Routed to Iris (Data Agent) - Matched keywords: revenue, aar, metrics, data query',
  'text',
  jsonb_build_object('type', 'routing', 'matchedAgent', 'Iris', 'keywords', jsonb_build_array('revenue', 'aar', 'metrics')),
  NOW() - INTERVAL '2 days'
FROM channels c WHERE c.name = 'data-insights' LIMIT 1;

-- ============================================================
-- 5. Additional Channel Context (Descriptions for UI)
-- ============================================================

-- Update agents dengan role lebih descriptive (if needed)
-- Agents already have good descriptions from initial seed

-- ============================================================
-- 6. Create agent-to-channel mapping concept
-- (This is more for documentation than actual table)
-- ============================================================

/*
AGENT-CHANNEL MAPPING (untuk referensi):

#general → Atlas (Knowledge) + Echo (Comms)
  - Q&A tentang company strategy, decisions
  - Announcements dan summaries

#engineering → Nexus (Process) + Iris (Analytics)
  - Incident response workflows
  - Performance metrics dan deployment analytics

#product → Atlas (Knowledge) + Echo (Comms)
  - Roadmap questions
  - Feature announcements dan summaries

#marketing → Iris (Data) + Echo (Comms)
  - Campaign metrics dan dashboards
  - Customer success story drafts

#data-insights → Iris (Data) PRIMARY
  - All analytics queries
  - Report generation

#onboarding → Nexus (Process) PRIMARY
  - SOP creation dan maintenance
  - Training material generation

#agent-corner → All Agents
  - Direct agent testing
  - Agent capability demonstrations

#company-brain → Atlas (Knowledge)
  - Knowledge base management
  - Search dan retrieval

#automations → Nexus (Process)
  - Workflow configuration
  - Automation setup
*/

-- ============================================================
-- 7. Sample Knowledge Brain Search Results
-- ============================================================

/*
CONTOH PROMPTS & IRIS RESPONSES:

1. "@Iris show revenue vs target last 6 months"
   ✓ Returns dashboard with chart, summary
   Data dari Knowledge: "Q4 2024 Revenue Target: $12.5M ARR"

2. "@Atlas what's our hiring plan?"
   ✓ Returns text with detailed hiring strategy
   Data dari Knowledge: "Hiring Plan 2025: grow from 24 to 40..."

3. "@Nexus create incident response SOP"
   ✓ Returns step-by-step SOP
   Data dari Knowledge: "Incident Response Protocol - CRITICAL"

4. "@Echo summarize all company announcements from Q4"
   ✓ Returns summary with key points
   Data dari Knowledge: Multiple strategic documents

5. "@Iris what's our CAC by segment?"
   ✓ Returns table with metrics
   Data dari Knowledge: "Customer Acquisition Cost" doc
*/

-- ============================================================
-- VERIFICATION QUERIES (run these to verify data)
-- ============================================================

/*
-- Check channels created
SELECT name, type, icon FROM channels ORDER BY created_at;

-- Check agents available
SELECT name, role, status, capabilities FROM agents ORDER BY created_at;

-- Check knowledge items
SELECT title, category, tags FROM knowledge_items ORDER BY category;

-- Check sample messages
SELECT 
  m.sender_name, 
  m.sender_type, 
  m.message_type, 
  c.name as channel_name
FROM messages m
JOIN channels c ON m.channel_id = c.id
ORDER BY m.created_at DESC
LIMIT 10;
*/
