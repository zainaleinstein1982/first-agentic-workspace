/*
# Create AI Agentic Workspace Schema

A shared workspace where humans and AI agents collaborate.

1. New Tables
  - `channels` — communication channels (general, projects, agents, etc.)
    - `id` (uuid, primary key)
    - `name` (text)
    - `description` (text)
    - `type` (text: 'channel' | 'agent' | 'dm')
    - `icon` (text — icon name)
    - `created_at` (timestamp)
  - `messages` — chat messages within channels
    - `id` (uuid, primary key)
    - `channel_id` (uuid, FK to channels)
    - `sender_type` (text: 'user' | 'agent' | 'system')
    - `sender_name` (text)
    - `sender_avatar` (text)
    - `content` (text)
    - `message_type` (text: 'text' | 'query_result' | 'dashboard' | 'sop' | 'task')
    - `metadata` (jsonb — stores structured results for dashboards, etc.)
    - `created_at` (timestamp)
  - `agents` — AI agents configured in the workspace
    - `id` (uuid, primary key)
    - `name` (text)
    - `description` (text)
    - `role` (text)
    - `status` (text: 'active' | 'idle' | 'busy')
    - `capabilities` (text[] — list of capability tags)
    - `avatar_color` (text)
    - `created_at` (timestamp)
  - `knowledge_items` — shared company brain / knowledge base
    - `id` (uuid, primary key)
    - `title` (text)
    - `content` (text)
    - `category` (text)
    - `source` (text)
    - `tags` (text[])
    - `created_at` (timestamp)
    - `updated_at` (timestamp)

2. Security
  - RLS enabled on all tables
  - All policies open to anon + authenticated (no-auth app)
*/

CREATE TABLE IF NOT EXISTS channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  type text NOT NULL DEFAULT 'channel',
  icon text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id uuid NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  sender_type text NOT NULL DEFAULT 'user',
  sender_name text NOT NULL,
  sender_avatar text,
  content text NOT NULL,
  message_type text NOT NULL DEFAULT 'text',
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  role text,
  status text NOT NULL DEFAULT 'idle',
  capabilities text[] DEFAULT '{}',
  avatar_color text DEFAULT '#3b82f6',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS knowledge_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text,
  source text,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS messages_channel_id_idx ON messages(channel_id);
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages(created_at);
CREATE INDEX IF NOT EXISTS knowledge_items_category_idx ON knowledge_items(category);

-- RLS
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_items ENABLE ROW LEVEL SECURITY;

-- Channels policies
DROP POLICY IF EXISTS "anon_select_channels" ON channels;
CREATE POLICY "anon_select_channels" ON channels FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_channels" ON channels;
CREATE POLICY "anon_insert_channels" ON channels FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_channels" ON channels;
CREATE POLICY "anon_update_channels" ON channels FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_channels" ON channels;
CREATE POLICY "anon_delete_channels" ON channels FOR DELETE TO anon, authenticated USING (true);

-- Messages policies
DROP POLICY IF EXISTS "anon_select_messages" ON messages;
CREATE POLICY "anon_select_messages" ON messages FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_messages" ON messages;
CREATE POLICY "anon_insert_messages" ON messages FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_messages" ON messages;
CREATE POLICY "anon_update_messages" ON messages FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_messages" ON messages;
CREATE POLICY "anon_delete_messages" ON messages FOR DELETE TO anon, authenticated USING (true);

-- Agents policies
DROP POLICY IF EXISTS "anon_select_agents" ON agents;
CREATE POLICY "anon_select_agents" ON agents FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_agents" ON agents;
CREATE POLICY "anon_insert_agents" ON agents FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_agents" ON agents;
CREATE POLICY "anon_update_agents" ON agents FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_agents" ON agents;
CREATE POLICY "anon_delete_agents" ON agents FOR DELETE TO anon, authenticated USING (true);

-- Knowledge items policies
DROP POLICY IF EXISTS "anon_select_knowledge" ON knowledge_items;
CREATE POLICY "anon_select_knowledge" ON knowledge_items FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_knowledge" ON knowledge_items;
CREATE POLICY "anon_insert_knowledge" ON knowledge_items FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_knowledge" ON knowledge_items;
CREATE POLICY "anon_update_knowledge" ON knowledge_items FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_knowledge" ON knowledge_items;
CREATE POLICY "anon_delete_knowledge" ON knowledge_items FOR DELETE TO anon, authenticated USING (true);

-- Seed default channels
INSERT INTO channels (name, description, type, icon) VALUES
  ('general', 'Company-wide announcements and conversations', 'channel', 'Hash'),
  ('engineering', 'Engineering team discussions', 'channel', 'Code'),
  ('product', 'Product planning and roadmap', 'channel', 'Layers'),
  ('marketing', 'Marketing campaigns and analytics', 'channel', 'TrendingUp'),
  ('data-insights', 'AI-generated data queries and dashboards', 'channel', 'BarChart3'),
  ('onboarding', 'New employee onboarding SOPs', 'channel', 'BookOpen')
ON CONFLICT DO NOTHING;

-- Seed default agents
INSERT INTO agents (name, description, role, status, capabilities, avatar_color) VALUES
  ('Atlas', 'Company knowledge and history retrieval agent', 'Knowledge Agent', 'active', ARRAY['search', 'summarize', 'retrieve', 'history'], '#10b981'),
  ('Iris', 'Data analysis and dashboard generation agent', 'Data Agent', 'active', ARRAY['sql', 'charts', 'analytics', 'reports'], '#3b82f6'),
  ('Nexus', 'SOP creation and workflow automation agent', 'Process Agent', 'idle', ARRAY['sop', 'workflow', 'automation', 'docs'], '#f59e0b'),
  ('Echo', 'Communication and meeting summary agent', 'Comms Agent', 'active', ARRAY['summarize', 'meetings', 'emails', 'slack'], '#8b5cf6')
ON CONFLICT DO NOTHING;

-- Seed knowledge items
INSERT INTO knowledge_items (title, content, category, source, tags) VALUES
  ('Q4 2024 Revenue Target', 'Company revenue target for Q4 2024 is $12.5M ARR, with a focus on enterprise deals above $50k ACV. Current pipeline shows 78% confidence of hitting target.', 'Finance', 'Board Meeting Dec 2024', ARRAY['revenue', 'q4', 'targets', 'finance']),
  ('Hiring Plan 2025', 'Plan to grow engineering team from 24 to 40 by end of 2025. Key hires: 3 senior backend engineers, 2 ML engineers, 1 VP of Engineering. Budget approved.', 'HR', 'HR Planning Doc', ARRAY['hiring', '2025', 'engineering', 'headcount']),
  ('Product Roadmap H1 2025', 'Priority features: AI memory layer (Q1), multiplayer workspaces (Q1), SOC2 compliance (Q2), mobile app (Q2). Secondary: integrations with Notion, Linear, GitHub.', 'Product', 'Product Roadmap 2025', ARRAY['roadmap', 'product', '2025', 'features']),
  ('Customer Acquisition Cost', 'Current CAC is $4,200 for SMB segment and $18,500 for enterprise. LTV:CAC ratio is 3.8x for SMB and 6.2x for enterprise. Target is 5x and 8x respectively.', 'Marketing', 'Growth Dashboard', ARRAY['cac', 'ltv', 'metrics', 'growth']),
  ('Engineering Incident Response', 'P0 incidents require on-call engineer response within 15 minutes. Escalation path: On-call → Tech Lead → CTO. Post-mortem required within 48 hours for all P0/P1 incidents.', 'Engineering', 'Engineering Handbook', ARRAY['incidents', 'oncall', 'sre', 'process'])
ON CONFLICT DO NOTHING;
