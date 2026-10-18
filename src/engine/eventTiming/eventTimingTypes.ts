/**
 * AstroNext - Phase 7: Event-Timing & Multi-System Confluence Types
 * Pure deterministic multi-tiered timing engine distinguishing:
 * 1. Natal Promise (D1, D9, D10, Karakas, Yogas)
 * 2. Period Activation (Vimshottari, Chara, Mudda Dasha)
 * 3. Transit Activation (Jupiter, Saturn, Rahu/Ketu, Ashtakavarga BAV/SAV/Kakshya)
 * 4. Annual Activation (Varshaphala, Muntha, Sahams, Tajika Yogas)
 * 5. Event Confluence & Window Precision (No Black-Box Probabilities)
 */

export type EventLifeDomain =
  | "Career & Professional Elevation"
  | "Marriage & Relationship Union"
  | "Wealth Accumulation & Financial Realization"
  | "Health Vitality & Medical Healing"
  | "Property & Real Estate Acquisition"
  | "Higher Education & Academic Honors"
  | "Foreign Travel & Relocation"
  | "Children & Progeny Blessings"
  | "Litigation & Legal Victory";

export type EventPromiseStatus =
  | "Strong (Unreservedly Promised in Natal Architecture)"
  | "Moderate (Promised with Conditional / Delayed Fruition)"
  | "Weak (Feeble Promise / Heavy Astrological Resistance)"
  | "Denied (Severe Structural Denial / Negative Yogas)";

export type ActivationLevel = "High" | "Moderate" | "Low" | "None";

export type EventWindowPrecision =
  | "Exact (Day to Week Precision via RP / Transit Station)"
  | "Narrow Window (1 to 4 Weeks Precision)"
  | "Moderate Window (1 to 3 Months Precision)"
  | "Broad Window (6 to 12 Months Periodical Wave)";

export type ConfluenceRating = "High" | "Moderate" | "Mixed" | "Divergent";

export interface MultiSystemEvidenceStream {
  system: "PARASHARI" | "JAIMINI" | "KP" | "TAJIKA" | "TRANSIT";
  primaryIndicators: string[];
  disposition: "Supporting" | "Contradicting" | "Neutral" | "Missing";
  shastricRuleCitations: string[];
  notes: string;
}

export interface NatalPromiseReport {
  domain: EventLifeDomain;
  status: EventPromiseStatus;
  primaryHouseNumber: number;
  primaryHouseSign: string;
  primaryHouseLord: string;
  primaryLordDignity: string;
  naturalKarakas: string[];
  karakasDignitySummary: string;
  divisionalConfirmation: string; // e.g. D9 / D10 status
  yogasInvolved: string[];
  supportingFactors: string[];
  contradictingFactors: string[];
}

export interface PeriodActivationReport {
  vimshottariMahaLord: string;
  vimshottariAntarLord: string;
  vimshottariPratyantarLord: string;
  charaDashaSign: string;
  muddaDashaLord?: string;
  activationLevel: ActivationLevel;
  houseSignificationsActive: number[];
  details: string;
}

export interface DoubleTransitSanction {
  sanctionLevel: "SANCTIONED_FULL" | "SANCTIONED_PARTIAL" | "NOT_SANCTIONED";
  jupiterStatus: "DIRECT_ASPECT" | "CONJUNCTION" | "NONE";
  saturnStatus: "DIRECT_ASPECT" | "CONJUNCTION" | "NONE";
  ashtakavargaSavPoints: number;
  ashtakavargaSupport: "STRONG (>=28 bindus)" | "MODERATE (25-27 bindus)" | "WEAK (<25 bindus)";
  vedhaCheck: "CLEAR" | "OBSTRUCTED";
  shastricReference: string;
}

export interface TransitActivationReport {
  jupiterTransitSign: string;
  jupiterAspectingDomainHouse: boolean;
  saturnTransitSign: string;
  saturnAspectingDomainHouse: boolean;
  rahuKetuTransitAxis: string;
  ashtakavargaSavPointsInDomainHouse: number;
  ashtakavargaBavSupport: string;
  vedhaObstructionPresent: boolean;
  activationLevel: ActivationLevel;
  doubleTransitSanction?: DoubleTransitSanction;
  transitSummary: string;
}

export interface AnnualActivationReport {
  varshaYear: number;
  varshaAscendantSign: string;
  munthaHouseInVarsha: number;
  muntheshaPlanet: string;
  relevantSahamSign: string;
  relevantSahamHouse: number;
  favorableTajikaYogasCount: number;
  activationLevel: ActivationLevel;
  annualSummary: string;
}

export interface EventEvidenceFactorItem {
  evidenceId: string;
  factorKey:
    | "NATAL_PROMISE"
    | "DASHA_SUPPORT"
    | "ANTARDASHA_SUPPORT"
    | "TRANSIT_ACTIVATION"
    | "JUPITER_EVIDENCE"
    | "SATURN_EVIDENCE"
    | "HOUSE_ACTIVATION"
    | "BAV_SUPPORT"
    | "SAV_SUPPORT"
    | "VEDHA"
    | "DIVISIONAL_SUPPORT"
    | "JAIMINI_SUPPORT"
    | "KP_SUPPORT"
    | "TAJIKA_SUPPORT"
    | "PRASHNA_SUPPORT";
  name: string;
  sourceEngine: string;
  sourceCalculation: string;
  dependsOn: string[];
  independenceGroup: "NATAL_CORE" | "DASHA_CORE" | "GOCHARA_TRANSIT_CORE" | "ASHTAKAVARGA_CORE" | "DIVISIONAL_CORE" | "JAIMINI_CORE" | "KP_STELLAR_CORE" | "TAJIKA_ANNUAL_CORE" | "PRASHNA_HORARY_CORE";
  methodology: string;
  status: "FULFILLED" | "PARTIAL" | "NOT_FULFILLED" | "NOT_APPLICABLE";
  ruleId: string;
  calculation: string;
  evidence: string;
  supportingFactors: string[];
  contradictingFactors: string[];
  provenance: string;
}

export interface DeterministicEventWindow {
  windowId: string;
  domain: EventLifeDomain;
  windowStartIso: string;
  windowEndIso: string;
  precision: EventWindowPrecision;
  confluenceRating: ConfluenceRating;
  primaryTriggers: string[];
  supportingFactors: string[];
  contradictingFactors: string[];
  neutralFactors: string[];
  missingFactors: string[];
  subEvidenceFactors?: EventEvidenceFactorItem[];
  ruleCitations: string[];
  predictiveInterpretation: string;
}

export interface MasterEventTimingReport {
  metadata: {
    engineVersion: string;
    calculationTimestampIso: string;
    domain: EventLifeDomain;
    evalDateIso: string;
  };
  natalPromise: NatalPromiseReport;
  periodActivation: PeriodActivationReport;
  transitActivation: TransitActivationReport;
  annualActivation: AnnualActivationReport;
  multiSystemStreams: MultiSystemEvidenceStream[];
  subEvidenceFactors: EventEvidenceFactorItem[];
  eventWindows: DeterministicEventWindow[];
  confluenceSynthesis: {
    overallConfluence: ConfluenceRating;
    natalPromiseStatus: "PRESENT" | "ABSENT" | "MIXED";
    dashaSupportStatus: "PRESENT" | "ABSENT" | "MIXED";
    transitActivationStatus: "PRESENT" | "ABSENT" | "MIXED";
    bavSupportStatus: "SUPPORTIVE" | "NEUTRAL" | "WEAK";
    vedhaStatus: "CLEAR" | "OBSTRUCTED";
    divisionalSupportStatus: "PRESENT" | "ABSENT" | "MIXED";
    kpAlignmentStatus: "PRESENT" | "ABSENT" | "MIXED";
    jaiminiSupportStatus: "PRESENT" | "ABSENT" | "MIXED";
    tajikaSupportStatus: "PRESENT" | "ABSENT" | "MIXED";
    parashariAgreement: boolean;
    jaiminiAgreement: boolean;
    kpAgreement: boolean;
    tajikaAgreement: boolean;
    transitAgreement: boolean;
    evidenceIntegritySummary: string;
  };
}
