// Mian Xiang & Samudrika Shastra (Face Reading) Types

export type FaceShapeClass = 
  | "Round" 
  | "Oval" 
  | "Square" 
  | "Oblong" 
  | "Heart" 
  | "Diamond" 
  | "Triangle";

export type WuXingElement = "Wood" | "Fire" | "Earth" | "Metal" | "Water";

export type ShiErGongPalace = 
  | "Life" 
  | "Wealth" 
  | "Career" 
  | "Marriage" 
  | "Health" 
  | "Parents" 
  | "Children" 
  | "Property" 
  | "Friends" 
  | "Travel" 
  | "Blessings" 
  | "Siblings";

export interface ZoneBalance {
  upperZone: string;   // Forehead to Eyebrows (Early life 15-30, intellect, ancestry)
  middleZone: string;  // Eyebrows to Nose tip (Middle life 31-50, career, willpower)
  lowerZone: string;   // Nose tip to Chin (Later life 51+, stability, relationships)
  dominantZone: "Upper" | "Middle" | "Lower" | "Harmonious";
  analysis: string;
}

export interface FeatureDetail {
  featureName: string;
  observedType: string;
  auspiciousness: "Auspicious" | "Neutral" | "Refinement Needed";
  reading: string;
  associatedOrgan?: string;
  element?: WuXingElement;
}

export interface IndividualFeaturesSet {
  forehead: FeatureDetail;
  eyebrows: FeatureDetail;
  eyes: FeatureDetail;
  nose: FeatureDetail;
  lips: FeatureDetail;
  chinJaw: FeatureDetail;
  ears: FeatureDetail;
  moles?: {
    location: string;
    auspiciousness: string;
    reading: string;
  }[];
}

export interface FaceReadingReport {
  id: string;
  seekerName: string;
  timestamp: string;
  faceShape: FaceShapeClass;
  element: WuXingElement;
  temperamentTitle: string;
  coreTemperamentReading: string;
  strengths: string[];
  growthAreas: string[];
  zoneBalance: ZoneBalance;
  featureReadings: Record<string, FeatureDetail>;
  twelvePalaces: {
    palace: ShiErGongPalace;
    chineseName: string;
    status: "Glowing & Clear" | "Steady" | "Needs Cultivation";
    interpretation: string;
  }[];
  lifeFortuneScore: number; // 0 to 100
  careerVocationInsights: string;
  relationshipDynamics: string;
  vitalityAndHealthPointers: string;
  spiritualRemedies: string[];
  [key: string]: any;
}
