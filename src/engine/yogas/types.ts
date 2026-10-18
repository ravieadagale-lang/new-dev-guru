// src/engine/yogas/types.ts

export type YogaStatusCode = "FORMED" | "FORMED_WITH_MODIFIERS" | "WEAKENED" | "CANCELLED" | "NOT_FORMED";

export interface EvaluatedCondition {
  description: string;
  passed: boolean;
  evidence: string;
}

export interface DashaActivationInfo {
  isCurrentlyActive: boolean;
  level: string;
  activationSummary: string;
}

export interface DetectedClassicalYoga {
  ruleId: string;
  name: string;
  sanskritName: string;
  category: string;
  sourceReference: string;
  source: string;
  participatingPlanets: string[];
  strengthScore: number;
  strengthRating: string;
  status: YogaStatusCode;
  isFullyFormed: boolean;
  isCancelled: boolean;
  supportingFactors: string[];
  weakeningFactors: string[];
  conditionsEvaluated: EvaluatedCondition[];
  dashaActivation: DashaActivationInfo;
  whyEvidenceTree: {
    classicalSynthesis: string;
  };
}

export interface YogaDetectionOutput {
  detectedYogas: DetectedClassicalYoga[];
  fullyFormedCount: number;
  currentlyActiveCount: number;
  modifiedOrCancelledYogas: DetectedClassicalYoga[];
  totalEvaluated: number;
}
