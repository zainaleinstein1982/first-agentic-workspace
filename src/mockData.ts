// src/mockData.ts

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
    blockId: 'Blok 3B (Outfitting)',
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
   - Query processed by Workspace Orchestrator. No anomaly detected.`
};
