export interface SBLCBlockData {
  blockId: string;
  plannedProgress: number;
  actualProgress: number;
  delayDays: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  kriIndicator: string;
  costImpactUSD: number;
}

export const sblcDataDummy: SBLCBlockData[] = [
  {
    blockId: 'Blok 4C (Erection)',
    plannedProgress: 85,
    actualProgress: 62,
    delayDays: 12,
    riskLevel: 'Critical',
    kriIndicator: 'Pengelasan Lambat & Antrean Crane',
    costImpactUSD: 45000,
  },
  {
    blockId: 'Blok 5A (Assembly)',
    plannedProgress: 70,
    actualProgress: 68,
    delayDays: 2,
    riskLevel: 'Low',
    kriIndicator: 'Material Plate On-Schedule',
    costImpactUSD: 3000,
  },
  {
    blockId: 'Blok 3B (Painting)',
    plannedProgress: 90,
    actualProgress: 78,
    delayDays: 7,
    riskLevel: 'High',
    kriIndicator: 'Keterlambatan Pipa Main Engine',
    costImpactUSD: 22000,
  },
];

export const promptQLSimulations: Record<string, string> = {
  engineering: `[PROMPTQL EXECUTION PIPELINE: SBLC RISK ANALYSIS]

1. FETCH DATA (Iris - Data Agent):
   - Found 3 production blocks evaluated.
   - Critical Bottleneck: Blok 4C (Delay 12 Days | Impact: $45,000)

2. RISK ASSESSMENT (Raffasya - Process Agent):
   - KRI Score: 4.2 / 5.0 (HIGH RISK)
   - Primary Trigger: Welder resource bottleneck at Dry Dock 2.

3. SOP MATCHING (Atlas - Knowledge Agent):
   - Retrived SOP-ENG-04: "Shift-3 Overtime & Crane Re-allocation".

4. STRATEGIC ACTION PLAN (Echo - Comms Agent):
   - Action A: Shift Blok 5A assembly bay temporarily.
   - Action B: Deploy Welder Class-A for Blok 4C night shift.
   - Action C: Issue EOT (Extension of Time) notification without penalty.`,

  product: `[PROMPTQL EXECUTION PIPELINE: PRODUCT ROADMAP]

1. QUERY KNOWLEDGE BASE (Atlas):
   - Product Roadmap H1 2026 status retrieved.

2. METRICS ANALYSIS (Iris):
   - Feature adoption rate at 78%. Target Q3 met.`,

  general: `[PROMPTQL EXECUTION PIPELINE: GENERAL INQUIRY]

1. ROUTING REQUEST:
   - Query processed by Workspace Orchestrator. No anomaly detected.`,

  marketing: `[PROMPTQL EXECUTION PIPELINE: MARKETING CAMPAIGN]

1. CONTENT SYNTHESIS (Echo):
   - Generated press release draft for SBLC Real-Time Risk Management System.

2. TARGETING ANALYSIS (Iris):
   - Shipyard engagement index increased by 34%.`,

  'data-insights': `[PROMPTQL EXECUTION PIPELINE: DATA INSIGHTS]

1. AGGREGATE CALCULATIONS (Iris):
   - Total Estimated Risk Impact across active blocks: $70,000 USD.
   - Highest risk exposure: Erection Phase (Blok 4C).`,

  onboarding: `[PROMPTQL EXECUTION PIPELINE: ONBOARDING SOP]

1. SOP VERIFICATION (Raffasya):
   - Onboarding workflow active. All 4 AI Agent roles assigned.`
};

// Data riwayat pesan awal per channel agar fungsi AI Agents langsung terlihat
export const channelInitialMessages: Record<string, any[]> = {
  general: [
    {
      id: 'gen-1',
      sender_type: 'user',
      sender_name: 'BaZain',
      content: 'Selamat pagi team. Mohon ringkasan singkat status workspace dan aktivitas AI Agent hari ini.',
      created_at: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
      id: 'gen-2',
      sender_type: 'agent',
      sender_name: 'Echo (Comms Agent)',
      content: '📢 Workspace aktif. Seluruh agent (Atlas, Iris, Echo, Raffasya) beroperasi secara normal dan siap memproses pipeline PromptQL.',
      created_at: new Date(Date.now() - 3600000 * 3.9).toISOString()
    }
  ],
  engineering: [
    {
      id: 'eng-1',
      sender_type: 'user',
      sender_name: 'BaZain',
      content: 'Iris, tampilkan ringkasan risiko SBLC terkini.',
      created_at: new Date(Date.now() - 3600000 * 3).toISOString()
    },
    {
      id: 'eng-2',
      sender_type: 'agent',
      sender_name: 'Iris (Data Agent)',
      content: '📊 Ditemukan 3 blok dalam pemantauan. Bottleneck utama berada pada **Blok 4C (Erection)** dengan potensi dampak biaya $45,000 USD.',
      created_at: new Date(Date.now() - 3600000 * 2.8).toISOString()
    },
    {
      id: 'eng-3',
      sender_type: 'user',
      sender_name: 'BaZain',
      content: 'Atlas, apakah ada SOP penanganan keterlambatan pengelasan di Dry Dock?',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString()
    },
    {
      id: 'eng-4',
      sender_type: 'agent',
      sender_name: 'Atlas (Knowledge Agent)',
      content: '📚 Ditemukan dokumen **SOP-ENG-04**: Merujuk pada opsi penambahan Shift-3 Overtime dan Re-alokasi Gantry Crane.',
      created_at: new Date(Date.now() - 3600000 * 1.9).toISOString()
    }
  ],
  product: [
    {
      id: 'prod-1',
      sender_type: 'user',
      sender_name: 'BaZain',
      content: 'Bagaimana status adopsi fitur pada Product Roadmap H1 2026?',
      created_at: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    {
      id: 'prod-2',
      sender_type: 'agent',
      sender_name: 'Atlas (Knowledge Agent)',
      content: '📌 Berdasarkan data roadmap, adopsi fitur mencapai 78% dan target Q3 telah terpenuhi.',
      created_at: new Date(Date.now() - 3600000 * 4.8).toISOString()
    }
  ],
  marketing: [
    {
      id: 'mkt-1',
      sender_type: 'user',
      sender_name: 'BaZain',
      content: 'Echo, siapkan draf publikasi untuk integrasi PromptQL SBLC Risk Framework.',
      created_at: new Date(Date.now() - 3600000 * 6).toISOString()
    },
    {
      id: 'mkt-2',
      sender_type: 'agent',
      sender_name: 'Echo (Comms Agent)',
      content: '📣 Draf press release telah disintesis: "Penerapan Manajemen Risiko Real-Time Berbasis Multi-Agent AI pada Galangan Kapal Digital."',
      created_at: new Date(Date.now() - 3600000 * 5.8).toISOString()
    }
  ],
  'data-insights': [
    {
      id: 'di-1',
      sender_type: 'user',
      sender_name: 'BaZain',
      content: 'Iris, hitung total dampak finansial KRI saat ini.',
      created_at: new Date(Date.now() - 3600000 * 2.5).toISOString()
    },
    {
      id: 'di-2',
      sender_type: 'agent',
      sender_name: 'Iris (Data Agent)',
      content: '📈 Total estimasi dampak risiko finansial dari 3 blok produksi saat ini adalah **$70,000 USD**.',
      created_at: new Date(Date.now() - 3600000 * 2.4).toISOString()
    }
  ],
  onboarding: [
    {
      id: 'onb-1',
      sender_type: 'user',
      sender_name: 'BaZain',
      content: 'Raffasya, tampilkan alur onboarding pengoperasian Agentic Workspace.',
      created_at: new Date(Date.now() - 3600000 * 8).toISOString()
    },
    {
      id: 'onb-2',
      sender_type: 'agent',
      sender_name: 'Raffasya (Process Agent)',
      content: '⚙️ Alur Onboarding:\n1. Buka channel spesifik (misal `#engineering`).\n2. Gunakan tombol **Execute PromptQL Pipeline** di kanan atas.\n3. Akses fitur **Quick Actions** atau tab **Brain** di sidebar.',
      created_at: new Date(Date.now() - 3600000 * 7.8).toISOString()
    }
  ]
};
