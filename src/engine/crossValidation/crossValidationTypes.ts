/**
 * AstroNext - Phase 6: Cross-Validation Types & Data Contracts
 */

export type ConsensusLevel = "Strong Consensus" | "Moderate Confluence" | "Divergent Indicators";

export interface SystemThemeEvaluation {
  system: "PARASHARI" | "JAIMINI" | "KP";
  assessment: string;
  scorePct: number;
  keyIndicators: string[];
  governingFactors: string;
  sourceMethodology: string;
}

export interface CrossSystemThemeComparison {
  themeKey: string;
  themeTitle: string;
  parashari: SystemThemeEvaluation;
  jaimini: SystemThemeEvaluation;
  kp: SystemThemeEvaluation;
  consensusLevel: ConsensusLevel;
  synthesisNotes: string;
}

export interface MasterCrossValidationReport {
  calculationMetadata: {
    calculationVersion: string;
    timestampIso: string;
    evaluatedThemesCount: number;
    overallSystemCoherencePct: number;
  };
  themeComparisons: CrossSystemThemeComparison[];
  systemAgreementMatrix: Array<{
    theme: string;
    parashariScore: number;
    jaiminiScore: number;
    kpScore: number;
    averageScore: number;
    status: ConsensusLevel;
  }>;
  overallSynthesis: string;
}
