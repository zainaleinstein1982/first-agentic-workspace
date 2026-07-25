# PromptQL Guide untuk AI Agentic Workspace

## Apa itu PromptQL?

**PromptQL** adalah query language untuk AI agents yang memungkinkan mereka:
- Reason tentang business data
- Plan complex workflows
- Act deterministically on enterprise data
- Query across databases, APIs, dan SaaS tools tanpa ETL

**Keunggulan PromptQL:**
- Decouples LLM planning dari deterministic execution
- Semantic graph yang belajar dari user corrections
- Reliabel untuk mission-critical tasks
- Real-time data access across systems

---

## Integrasi dalam Project

### Endpoint & Setup

```bash
# PromptQL API Endpoint
POST https://api.promptql.pro.hasura.io/execute_program

# Environment Variables (add ke .env)
PROMPTQL_API_KEY=your_api_key_here
PROMPTQL_DDN_URL=your_project_sql_endpoint
```

### Request Format

```javascript
const executePromptQL = async (code) => {
  const response = await fetch(
    'https://api.promptql.pro.hasura.io/execute_program',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        promptql_api_key: process.env.PROMPTQL_API_KEY,
        ai_primitives_llm: { provider: 'hasura' },
        ddn: {
          url: process.env.PROMPTQL_DDN_URL,
          headers: {},
        },
        artifacts: []
      })
    }
  );
  return response.json();
};
```

---

## Per-Agent PromptQL Usage

### 1. **IRIS** - Data Agent 📊

**Responsibility:** Analytics, dashboards, metrics queries

**PromptQL Programs Iris Uses:**

#### Program 1: Revenue Analysis
```sql
-- Get revenue metrics for dashboard
SELECT 
  DATE_TRUNC('month', created_at)::date as month,
  SUM(mrr) as monthly_recurring_revenue,
  COUNT(DISTINCT customer_id) as active_customers,
  AVG(arr) as avg_customer_arr
FROM subscriptions
WHERE status = 'active'
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC
LIMIT 6
```

**When Called:**
- User: `@Iris show revenue for last 6 months`
- Iris executes this PromptQL program
- Returns: Dashboard with revenue_chart + trend analysis

#### Program 2: Customer Segmentation & CAC
```sql
-- Get CAC and LTV by customer segment
SELECT 
  segment,
  COUNT(*) as customer_count,
  AVG(acquisition_cost) as avg_cac,
  AVG(lifetime_value) as avg_ltv,
  AVG(lifetime_value) / NULLIF(AVG(acquisition_cost), 0) as ltv_cac_ratio,
  ROUND(((AVG(lifetime_value) / NULLIF(AVG(acquisition_cost), 0)) - 
         LAG(AVG(lifetime_value) / NULLIF(AVG(acquisition_cost), 0)) OVER (ORDER BY segment)) 
         / LAG(AVG(lifetime_value) / NULLIF(AVG(acquisition_cost), 0)) OVER (ORDER BY segment) * 100, 2) as qoq_trend
FROM customers
GROUP BY segment
ORDER BY ltv_cac_ratio DESC
```

**When Called:**
- User: `@Iris what's our CAC by segment?`
- Iris executes this PromptQL program
- Returns: Query result table with metrics

#### Program 3: Churn & Retention
```sql
-- Calculate churn rate and retention metrics
WITH monthly_cohorts AS (
  SELECT 
    DATE_TRUNC('month', signup_date)::date as cohort_month,
    customer_id
  FROM customers
),
monthly_active AS (
  SELECT 
    DATE_TRUNC('month', subscription_date)::date as activity_month,
    customer_id,
    c.cohort_month
  FROM subscriptions s
  JOIN monthly_cohorts c ON s.customer_id = c.customer_id
)
SELECT 
  cohort_month,
  activity_month,
  COUNT(DISTINCT customer_id) as active_customers,
  ROUND(COUNT(DISTINCT customer_id)::numeric / 
    (SELECT COUNT(DISTINCT customer_id) FROM monthly_cohorts WHERE cohort_month = cohort_month) 
    * 100, 2) as retention_percent
FROM monthly_active
GROUP BY cohort_month, activity_month
ORDER BY cohort_month DESC, activity_month DESC
```

**When Called:**
- User: `@Iris show churn rate and retention`
- Returns: Retention cohort analysis + dashboard

---

### 2. **ATLAS** - Knowledge Agent 🧠

**Responsibility:** Semantic search, knowledge retrieval, context

**PromptQL Programs Atlas Uses:**

#### Program 1: Knowledge Brain Search
```sql
-- Semantic search in knowledge items
SELECT 
  title,
  content,
  category,
  source,
  tags,
  SIMILARITY(content, $1) as relevance_score
FROM knowledge_items
WHERE content % $1  -- PostgreSQL full-text search
ORDER BY relevance_score DESC
LIMIT 5
```

**When Called:**
- User: `@Atlas what's our revenue target?`
- Atlas searches knowledge brain for "revenue target"
- Returns: Relevant documents ranked by relevance

#### Program 2: Cross-Reference Knowledge
```sql
-- Find related knowledge across categories
SELECT DISTINCT
  k1.title as main_topic,
  k1.category as main_category,
  k2.title as related_topic,
  k2.category as related_category,
  array_intersect(k1.tags, k2.tags) as common_tags
FROM knowledge_items k1
JOIN knowledge_items k2 ON array_length(array_intersect(k1.tags, k2.tags), 1) > 0
WHERE k1.title ILIKE $1
ORDER BY array_length(array_intersect(k1.tags, k2.tags), 1) DESC
```

**When Called:**
- User: `@Atlas how does hiring plan relate to revenue targets?`
- Atlas finds knowledge items with related tags
- Returns: Context-rich relationship explanation

#### Program 3: Historical Timeline Search
```sql
-- Extract timeline from messages and documents
SELECT 
  k.title,
  k.created_at,
  k.content,
  k.category
FROM knowledge_items k
WHERE k.category IN ('Strategy', 'Product', 'Finance')
  AND k.content ILIKE '%' || $1 || '%'
ORDER BY k.created_at DESC
```

**When Called:**
- User: `@Atlas when did we launch feature X?`
- Returns: Timeline of related documents and decisions

---

### 3. **NEXUS** - Process Agent ⚙️

**Responsibility:** SOP creation, workflow automation, documentation

**PromptQL Programs Nexus Uses:**

#### Program 1: Get Process Context
```sql
-- Retrieve existing SOPs and processes
SELECT 
  title,
  content,
  category,
  created_at,
  tags
FROM knowledge_items
WHERE category IN ('Operations', 'Engineering', 'HR')
  AND tags @> $1  -- Check if tags array contains specified tags
ORDER BY created_at DESC
```

**When Called:**
- User: `@Nexus create onboarding SOP`
- Nexus queries existing processes for reference
- Returns: SOP structure + step generation

#### Program 2: Incident/Process Template Query
```sql
-- Get critical processes for documentation
SELECT 
  title,
  content,
  source,
  tags
FROM knowledge_items
WHERE title ILIKE '%SOP%' 
  OR title ILIKE '%Process%'
  OR title ILIKE '%Procedure%'
ORDER BY created_at DESC
```

**When Called:**
- User: `@Nexus generate incident response workflow`
- Nexus finds existing incident docs
- Returns: Automated SOP with steps

#### Program 3: Automation Capability Check
```sql
-- Check what tasks can be automated
SELECT 
  title,
  content,
  CASE 
    WHEN content ILIKE '%daily%' THEN 'Daily Task'
    WHEN content ILIKE '%weekly%' THEN 'Weekly Task'
    WHEN content ILIKE '%monthly%' THEN 'Monthly Task'
    WHEN content ILIKE '%manual%' THEN 'Manual Process'
    ELSE 'Other'
  END as automation_type,
  tags
FROM knowledge_items
WHERE category IN ('Operations', 'Engineering')
  AND content ILIKE '%' || $1 || '%'
```

**When Called:**
- User: `@Nexus automate our report generation`
- Nexus identifies automatable processes
- Returns: Automation workflow specification

---

### 4. **ECHO** - Comms Agent 💬

**Responsibility:** Summaries, communication, drafts

**PromptQL Programs Echo Uses:**

#### Program 1: Message Aggregation for Summary
```sql
-- Get all messages in a channel for summarization
SELECT 
  m.sender_name,
  m.content,
  m.created_at,
  m.message_type,
  c.name as channel_name
FROM messages m
JOIN channels c ON m.channel_id = c.id
WHERE c.id = $1
  AND m.created_at > NOW() - INTERVAL $2
ORDER BY m.created_at DESC
```

**When Called:**
- User: `@Echo summarize #engineering from last week`
- Echo queries all messages from that channel
- Returns: Summary with key action items

#### Program 2: Important Decision Extraction
```sql
-- Find important decisions and announcements
SELECT 
  m.sender_name,
  m.content,
  m.created_at,
  CASE 
    WHEN m.content ILIKE '%decision%' OR m.content ILIKE '%decided%' THEN 'Decision'
    WHEN m.content ILIKE '%approved%' OR m.content ILIKE '%rejected%' THEN 'Approval'
    WHEN m.content ILIKE '%announce%' OR m.content ILIKE '%launch%' THEN 'Announcement'
    ELSE 'Update'
  END as decision_type
FROM messages m
WHERE m.channel_id = $1
  AND m.created_at > NOW() - INTERVAL $2
  AND (m.content ILIKE '%decision%' OR m.content ILIKE '%approved%' 
       OR m.content ILIKE '%announce%' OR m.sender_type = 'agent')
ORDER BY m.created_at DESC
```

**When Called:**
- User: `@Echo what decisions were made this month?`
- Returns: List of important decisions with dates

#### Program 3: Draft Email/Update Generation
```sql
-- Get context for communication drafts
SELECT 
  k.title,
  k.content,
  k.category,
  m.sender_name,
  m.content,
  m.created_at
FROM knowledge_items k
LEFT JOIN messages m ON m.created_at > NOW() - INTERVAL '7 days'
WHERE k.category = $1
ORDER BY k.created_at DESC, m.created_at DESC
LIMIT 20
```

**When Called:**
- User: `@Echo draft weekly product update`
- Echo pulls context from knowledge + recent messages
- Returns: Draft email/update ready to customize

---

## Agent Decision Flow dengan PromptQL

```
┌─────────────────────────────────────────────────────────┐
│ USER INPUT: "@Iris show me MRR growth trend"           │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ KEYWORD DETECTION (agentResponses.ts)                   │
│ Keywords found: "show", "revenue", "metrics"            │
│ Route to: Iris (Data Agent)                             │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ IRIS EXECUTES PROMPTQL:                                 │
│                                                         │
│ SELECT                                                   │
│   DATE_TRUNC('month', created_at) as month,            │
│   SUM(mrr) as total_mrr,                                │
│   LAG(SUM(mrr)) OVER (ORDER BY DATE_TRUNC('month',...) │
│   as prev_month_mrr                                     │
│ FROM subscriptions                                       │
│ WHERE status = 'active'                                 │
│ GROUP BY DATE_TRUNC('month', created_at)               │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ DATA RETURNED:                                          │
│ month    | total_mrr | prev_month_mrr | growth          │
│ Dec 2024 | $102,500  | $98,700        | +3.8%          │
│ Jan 2025 | $105,800  | $102,500       | +3.2%          │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ IRIS FORMATS RESPONSE:                                  │
│ message_type: "dashboard"                              │
│ metadata: {                                             │
│   type: 'mrr_growth_chart',                            │
│   title: 'MRR Growth Trend',                           │
│   data: [{ month, mrr, growth }, ...],                │
│   summary: 'MRR consistent +3% MoM growth'            │
│ }                                                       │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ SAVED TO MESSAGES TABLE:                                │
│ sender_name: 'Iris'                                     │
│ sender_type: 'agent'                                    │
│ message_type: 'dashboard'                              │
│ metadata: { ...dashboard data }                         │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ UI RENDERS:                                             │
│ Line chart showing MRR over 6 months                    │
│ Summary: "MRR consistent +3% MoM growth"               │
│ Agent badge: "Iris" (blue)                             │
└─────────────────────────────────────────────────────────┘
```

---

## Advanced PromptQL Features

### 1. **Semantic Graph Learning**

PromptQL membangun semantic graph dari user corrections:

```
User asks: "@Iris what's our runway with current burn rate?"
Iris response wrong → User corrects
PromptQL learns: "runway" = months of cash / monthly_burn_rate
Next query lebih akurat ✓
```

### 2. **Cross-System Queries**

Query multiple data sources simultaneously:

```javascript
const crossSystemQuery = `
SELECT 
  c.name as customer_name,
  c.industry,
  s.monthly_recurring_revenue,
  COALESCE(slack.message_count, 0) as engagement_score
FROM customers c
LEFT JOIN subscriptions s ON c.id = s.customer_id
LEFT JOIN slack.message_history slack ON c.slack_id = slack.customer_id
WHERE s.status = 'active'
ORDER BY s.monthly_recurring_revenue DESC
`;
```

### 3. **Deterministic Execution**

PromptQL ensures reliable results for critical queries:

```
LLM Planning: "I need to find active customers with high engagement"
  ↓
PromptQL DSL: CREATE deterministic query for above
  ↓
SQL Execution: Run exact same query reliably
  ↓
Result: Consistent, auditable results every time
```

---

## Integration with Existing Code

### src/lib/supabase.ts

Add PromptQL integration:

```typescript
import { executeQuery } from '@/lib/promptql';

export const fetchRevenueMetrics = async () => {
  const code = `
    SELECT ...revenue query...
  `;
  
  return executeQuery(code);
};
```

### src/lib/agentResponses.ts

Use PromptQL queries in agent responses:

```typescript
export async function generateAgentResponse(input: string, agentName: string) {
  if (agentName === 'Iris') {
    const data = await executePromptQLQuery(SQL_QUERIES.REVENUE_ANALYSIS);
    return {
      agentName,
      content: 'Here''s the revenue breakdown:',
      messageType: 'dashboard',
      metadata: { type: 'revenue_chart', data }
    };
  }
  // ... other agents
}
```

---

## Testing PromptQL Queries Locally

### 1. Direct API Test

```bash
curl -X POST https://api.promptql.pro.hasura.io/execute_program \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SELECT * FROM knowledge_items LIMIT 5",
    "promptql_api_key": "your_key",
    "ai_primitives_llm": { "provider": "hasura" },
    "ddn": { "url": "your_url", "headers": {} }
  }'
```

### 2. In-App Testing

```typescript
// src/pages/test-promptql.tsx
const [result, setResult] = useState(null);

const testQuery = async () => {
  const result = await fetch('/api/promptql/execute', {
    method: 'POST',
    body: JSON.stringify({
      code: 'SELECT COUNT(*) FROM knowledge_items'
    })
  });
  setResult(await result.json());
};
```

---

## Next Steps

1. **Implement PromptQL SDK:** Add @promptql/sdk to project
2. **Create API route:** /api/agents/[name]/query for each agent
3. **Agent Learning Loop:** Save corrections → improve semantic graph
4. **Performance Dashboard:** Track agent query success rate & latency
5. **Custom SQL Catalogs:** Build domain-specific query templates per agent

---

## Resources

- PromptQL Docs: https://docs.promptql.io
- Hasura DDN: https://hasura.io
- AI Agent Patterns: https://promptql.pro/patterns
- SQL Query Gallery: https://promptql.pro/gallery
