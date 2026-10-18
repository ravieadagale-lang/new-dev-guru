// Hasta Samudrika Shastra (Palmistry) Types

export type HandTypeClass = 
  | "Earth" 
  | "Air" 
  | "Fire" 
  | "Water" 
  | "Square" 
  | "Philosophic" 
  | "Psychic" 
  | "Spatulate" 
  | "Conical";

export type MountLevel = "Flat" | "Normal" | "Prominent" | "Depressed" | "High" | "Underdeveloped";

export type SpecialMarking = 
  | "Star" 
  | "Cross" 
  | "Triangle" 
  | "Island" 
  | "Grille" 
  | "Square" 
  | "Fish" 
  | "Trident" 
  | "Lotus" 
  | "Temple" 
  | "Circle" 
  | "Spot";

export interface PalmAgeMilestone {
  age: number;
  significance: string;
  associatedLine: string;
  intensity: "Mild" | "Noticeable" | "Transformative";
}

export interface MountDetail {
  name: string;
  planet: string;
  level: MountLevel;
  meaning: string;
  tattva?: string;
  markings?: SpecialMarking[];
}

export interface LineDetail {
  name: string;
  quality: "Deep & Clear" | "Chained" | "Broken" | "Forked" | "Faint" | "Wavy" | "Multiple";
  length: "Long" | "Medium" | "Short";
  startPosition?: string;
  endPosition?: string;
  branches?: string[];
  reading: string;
}

export interface SingleHandFeatures {
  handType: HandTypeClass;
  lifeLine: LineDetail;
  headLine: LineDetail;
  heartLine: LineDetail;
  fateLine: LineDetail;
  sunLine?: LineDetail;
  mounts: Record<string, MountDetail>;
  specialMarkings: {
    marking: SpecialMarking;
    location: string;
    interpretation: string;
  }[];
  skinTexture?: "Fine" | "Medium" | "Coarse";
  flexibility?: "Flexible" | "Firm" | "Stiff";
}

export interface PalmistryReport {
  id: string;
  seekerName: string;
  timestamp: string;
  handAnalyzed: "Dominant Hand" | "Passive Hand" | "Both Hands";
  handType: HandTypeClass;
  element: "Earth" | "Water" | "Fire" | "Air";
  temperamentTitle: string;
  coreTemperamentReading: string;
  strengths: string[];
  growthAreas: string[];
  majorLines: {
    lifeLine: LineDetail;
    headLine: LineDetail;
    heartLine: LineDetail;
    fateLine: LineDetail;
    sunLine?: LineDetail;
  };
  mountReadings: Record<string, MountDetail>;
  specialSignatures: {
    feature: string;
    auspiciousness: "Highly Auspicious" | "Neutral" | "Cautionary";
    vedicSignificance: string;
  }[];
  lifeMilestones: PalmAgeMilestone[];
  careerGuidance: string;
  relationshipInsights: string;
  vitalityIndicators: string;
  recommendedRemedies: string[];
  [key: string]: any;
}
