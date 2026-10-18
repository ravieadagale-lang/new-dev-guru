/**
 * AstroNext Birth Time Rectification (BTR) Types
 * Strict, deterministic, evidence-based data structures.
 */

export type BtrEventCategory =
  | "FAMILY_CHILDHOOD"
  | "EDUCATION"
  | "CAREER"
  | "RELATIONSHIPS"
  | "CHILDREN"
  | "RESIDENCE_TRAVEL"
  | "HEALTH"
  | "FINANCE"
  | "LEGAL_SOCIAL"
  | "SPIRITUAL_TRANSFORMATION"
  | "OTHER";

export type BtrDatePrecision =
  | "exact_date"        // YYYY-MM-DD
  | "month_year"         // YYYY-MM
  | "year_only"          // YYYY
  | "approx_range"       // Season or approx window
  | "custom_range";      // From date - To date

export type BtrDateConfidence =
  | "documented"         // Official record, certificate, passport, contract
  | "very_certain"       // Solid personal certainty
  | "approximate"        // Known within a month or season
  | "family_memory"      // Told by elder / family
  | "estimated";         // Rough guess

export type BtrEventSignificance = "high" | "medium" | "low";

export interface BtrLifeEvent {
  id: string;
  category: BtrEventCategory;
  eventType: string;               // e.g. "Marriage", "First job", "Major surgery"
  description?: string;
  datePrecision: BtrDatePrecision;
  dateConfidence: BtrDateConfidence;
  exactDate?: string;             // YYYY-MM-DD
  monthYear?: string;             // YYYY-MM
  year?: number;                  // YYYY
  rangeStart?: string;            // YYYY-MM-DD
  rangeEnd?: string;              // YYYY-MM-DD
  approxNotes?: string;
  significance: BtrEventSignificance;
  primaryHouseExpected?: number[]; // e.g. [7] for marriage, [10] for career
}

export type BtrTimeReliability =
  | "hospital_exact"              // Exact from hospital/birth record
  | "birth_certificate"           // Birth certificate
  | "hospital_family_record"      // Hospital/family record
  | "told_by_parents"             // Told by parents
  | "family_memory"               // Family memory
  | "approximate"                 // Approximate
  | "rounded_5m"                  // Rounded to nearest 5 minutes
  | "rounded_10m"                 // Rounded to nearest 10 minutes
  | "rounded_15m"                 // Rounded to nearest 15 minutes
  | "rounded_30m"                 // Rounded to nearest 30 minutes
  | "rounded_1h"                  // Rounded to nearest hour
  | "completely_unknown";         // Completely unknown

export type BtrSearchRange =
  | "pm_5m"                       // ±5 minutes
  | "pm_15m"                      // ±15 minutes
  | "pm_30m"                      // ±30 minutes
  | "pm_1h"                       // ±1 hour
  | "pm_3h"                       // ±3 hours
  | "entire_day"                  // Entire day (00:00 - 23:59)
  | "custom_range";               // User defined start & end

export type BtrUserMode =
  | "quick"                       // Simple guided BTR for ordinary users
  | "advanced"                    // Expanded event collection and evidence
  | "expert"                      // Detailed methodology/evidence/candidate analysis
  | "research";                   // Full technical evidence and candidate comparison

export interface BtrPhysicalClues {
  heightBuild?: "slender_tall" | "medium_athletic" | "stout_compact" | "heavy_large" | "unspecified";
  constitution?: "vata_lean" | "pitta_muscular" | "kapha_broad" | "mixed" | "unspecified";
  temperament?: "dynamic_fire" | "calm_water" | "analytical_air" | "practical_earth" | "unspecified";
  prominentFeature?: string;
  intellectualStyle?: "scientific_technical" | "artistic_creative" | "commerce_executive" | "spiritual_philosophical" | "unspecified";
  socialInclination?: "introverted_solitary" | "balanced_selective" | "extroverted_social" | "unspecified";
}

/**
 * Layer A: Shastric Methodology Evidence Item
 * Explicitly records rule identifier, methodology, condition, outcome, and classical provenance.
 */
export interface BtrMethodologyEvidenceItem {
  ruleId: string;
  methodology: "Parashari" | "KP" | "Jaimini" | "Divisional_D9" | "Divisional_D10";
  condition: string;
  matched: boolean;
  notes: string;
  provenance: string;
  ruleCategory: "SPECIALIZED_CLASSICAL_RULE" | "GENERIC_SUPPORTING_RULE" | "DIAGNOSTIC_EVIDENCE";
}

/**
 * Placidus Cusp Detail for candidate-specific evaluation
 */
export interface BtrPlacidusCuspDetail {
  houseNumber: number;
  tropicalLongitude: number;
  siderealLongitude: number;
  signName: string;
  signIndex: number;
  signLord: string;
  starLord: string;
  subLord: string;
  subSubLord: string;
}

export interface BtrEventMatchDetail {
  eventId: string;
  eventType: string;
  eventDateDisplay: string;
  significance: BtrEventSignificance;
  confidence: BtrDateConfidence;
  parashariSupport: boolean;
  parashariNotes: string;
  kpSupport: boolean;
  kpNotes: string;
  jaiminiSupport: boolean;
  jaiminiNotes: string;
  contradictionDetected: boolean;
  contradictionReason?: string;
  weightedScore: number;
  // Layer A Traceability
  ruleCategory?: "SPECIALIZED_CLASSICAL_RULE" | "GENERIC_SUPPORTING_RULE";
  evidenceItems?: BtrMethodologyEvidenceItem[];
}

export interface BtrCandidateEvaluation {
  timeStr: string;                 // e.g. "16:42"
  totalMinutesOffset: number;      // e.g. +12
  ascendantDegree: number;         // 0 to 360
  ascendantSign: string;           // e.g. "Taurus"
  ascendantDegreeDms: string;      // e.g. "24° 18' 42\""
  ascendantNakshatra: string;      // e.g. "Rohini"
  ascendantStarLord: string;       // e.g. "Moon"
  ascendantSubLord: string;        // e.g. "Rahu"
  ascendantSubSubLord: string;
  
  // Divisional Lagnas - Diagnostic Evidence (Calculated, not scored)
  d9LagnaSign: string;             // Navamsha Lagna
  d10LagnaSign: string;            // Dashamsha Lagna
  diagnosticVargas?: {
    d9Sign: string;
    d10Sign: string;
    usage: "diagnostic_only";
    notes: string;
  };

  // Full Placidus/KP Cuspal Hierarchy (1 to 12)
  cuspSubLords: Record<number, string>; // 1 to 12 cusp sub-lords
  placidusCusps?: Record<number, BtrPlacidusCuspDetail>;

  // Layer A: Methodology Evidence Scores (Pure Astrological Confluence)
  parashariScore: number;
  kpScore: number;
  jaiminiScore: number;
  shastricEvidenceScore: number;

  // Layer B: Engineering Aggregation Scores (Non-Shastric)
  physicalClueScore: number;
  proximityScore: number;
  candidateComparisonScore: number;
  totalScore: number; // Backward-compatible alias of candidateComparisonScore

  eventMatches: BtrEventMatchDetail[];
  matchedEventsCount: number;
  totalEventsCount: number;
  contradictions: string[];
  evidenceStatus: "High" | "Moderate" | "Low";
}

export interface BtrCandidateCluster {
  clusterIndex: number;
  startTime: string;
  endTime: string;
  startMinutes: number;
  endMinutes: number;
  peakScore: number;
  candidateCount: number;
  bestCandidateTime: string;
}

export interface BtrRectificationReport {
  status: "SUCCESS" | "MULTIPLE_CANDIDATES" | "INSUFFICIENT_EVIDENCE";
  insufficientEvidenceReason?: string;
  isTied?: boolean;
  tiedCandidates?: BtrCandidateEvaluation[];
  candidateClusters?: BtrCandidateCluster[];

  recordedTime: string;
  recordedReliability: BtrTimeReliability;
  searchRangeApplied: BtrSearchRange;
  investigatedWindowStart: string;
  investigatedWindowEnd: string;
  stepIntervalMinutes: number;
  totalCandidatesEvaluated: number;
  
  strongestCandidate: BtrCandidateEvaluation;
  supportedWindowStart: string;
  supportedWindowEnd: string;
  evidenceStatus: "High" | "Moderate" | "Low";
  
  whyRankedHighest: string[];
  remainingUncertainty: string;
  candidateComparison: BtrCandidateEvaluation[];
  methodologyBreakdown: {
    parashariSummary: string;
    kpSummary: string;
    jaiminiSummary: string;
  };
}
