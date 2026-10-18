// src/engine/doshas/types.ts

export interface ClassicalDoshaRule {
  id: string;
  name: string;
  sanskritName: string;
  category: string;
  tradition: string;
  ruleVariant: string;
  source: string;
  sourceReference: string;
  definition: string;
  description: string;
  afflictedPlanets: string[];
  afflictedHouses: number[];
  severityMethod: string;
  ruleVersion: string;
}

export interface DoshaConditionEvaluation {
  description: string;
  evidence: string;
}

export interface DoshaCancellation {
  ruleTitle: string;
  reductionPercentage: number;
  evidenceText: string;
}

export interface DetectedDoshaRecord {
  ruleId: string;
  name: string;
  sanskritName: string;
  category: string;
  tradition: string;
  sourceReference: string;
  afflictedPlanets: string[];
  severityScore: number;
  status: string;
  isPresent: boolean;
  isCancelledOrMitigated: boolean;
  whyEvidenceTree: {
    classicalSynthesis: string;
  };
  conditionsEvaluated: DoshaConditionEvaluation[];
  cancellationsFound: DoshaCancellation[];
  remedialSuggestions: string[];
}

export interface DoshaDetectionOutput {
  detectedDoshas: DetectedDoshaRecord[];
  presentCount: number;
}
