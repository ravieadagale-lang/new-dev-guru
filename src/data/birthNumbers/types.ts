// src/data/birthNumbers/types.ts

export interface AdditionalInsights {
  luckyDays: string;
  luckyColors: string;
  compatibleBirthNumbers: string;
  challengingNumbers: string;
  gemstone: string;
  lifeLesson: string;
}

export interface BirthNumberDetail {
  day: number;
  compoundNotation: string;
  rootDigit: number;
  isMasterNumber: boolean;
  isKarmicDebt: boolean;
  title: string;
  archetype: string;
  keywords: string[];

  // Header Meta
  rulingPlanet: string;
  element: string;
  energy: string;
  rulingInfo: string;

  // Complete In-Depth Client-Facing Sections
  personality: string;
  asWife: string;
  asHusband: string;
  health: string;
  relationships: string;
  strengths: string[];
  challenges: string[];
  professionsCareer: string;
  finance: string;
  spiritualGuidance: string;
  additionalInsights: AdditionalInsights;
  disclaimer: string;

  // Backwards Compatibility Fields
  essentialCharacter: string;
  relationshipLesson: string;
  professionalInclinations: string[];
  financialMaterialTendency: string;
  healthTendencies: string;
  spiritualInvitation: string;
}

export const DISCLAIMER_FOOTER = "This report is for self-awareness and guidance purposes only and is not a substitute for professional medical, legal, or financial advice.";
