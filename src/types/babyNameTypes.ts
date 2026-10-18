// src/types/babyNameTypes.ts
// Comprehensive domain types for the Vedic Astrological & Numerological Baby Name Engine

export type BabyGender = "boy" | "girl" | "unisex";

export type BabyReligion = "all" | "hindu" | "muslim" | "sikh" | "christian" | "jain" | "buddhist";

export type BabyNameStyle = "all" | "vedic_sanskrit" | "modern_indian" | "short_sweet" | "international";

export interface BabyBirthInput {
  babyName?: string;
  gender: BabyGender;
  dob: string; // YYYY-MM-DD
  tob: string; // HH:MM
  pob: string; // City name
  latitude: number;
  longitude: number;
  timezoneOffset: number; // e.g. 5.5 for IST
  fatherName: string;
  motherName: string;
  surname: string;
  preferredStyle: BabyNameStyle;
  religion?: BabyReligion;
  selectedAkshara?: string;
}

export interface PadaAksharaDetail {
  pada: number;
  akshara: string;
  aksharaEnglish: string;
}

export interface AstroJanmaksharResult {
  moonLongitude: number;
  rashiIndex: number;
  rashiName: string;
  rashiSanskrit: string;
  rashiLord: string;
  rashiElement: string;
  nakshatraIndex: number;
  nakshatraName: string;
  nakshatraSanskrit: string;
  nakshatraLord: string;
  pada: number;
  degreeInPada: number;
  deity: string;
  symbol: string;
  animal: string;
  gana: "Deva" | "Manushya" | "Rakshasa";
  yoni: string;
  nadi: "Adi" | "Madhya" | "Antya";
  primaryAkshara: string;
  primaryAksharaEnglish: string;
  allPadaAksharas: PadaAksharaDetail[];
  alternativeFriendlyAksharas: string[];
}

export interface BabyNumerologyProfile {
  driverNumber: number; // Mulank / Birth Day
  conductorNumber: number; // Bhagyank / Life Path
  driverRulingPlanet: string;
  conductorRulingPlanet: string;
  fatherDriver: number;
  motherDriver: number;
  surnameChaldean: number;
  missingGridNumbers: number[];
  favorableNameNumbers: number[];
  neutralNameNumbers: number[];
  unfavorableNameNumbers: number[];
}

export interface PronologyAnalysis {
  score: number; // 0 - 100
  rating: "Deva Vani (Supreme)" | "Subha Nada (Auspicious)" | "Samanya (Neutral)" | "Klesha (Inauspicious)";
  syllableCount: number;
  syllableStructure: string;
  hasNegativeSound: boolean;
  detectedNegativeSounds: string[];
  positiveVibrations: string[];
  endingSoundType: "Vowel Resonance" | "Melodic Liquid" | "Crisp Consonant";
  pronologySummary: string;
}

export interface SurnameHarmonyDetails {
  surname: string;
  surnameChaldeanCompound: number;
  surnameChaldeanSingle: number;
  fullName: string;
  fullNameCompound: number;
  fullNameSingle: number;
  fullNameCompoundDescription: string;
  isFullNameAuspiciousCompound: boolean;
  isAntyWithDriver: boolean;
  isAntyWithConductor: boolean;
  driverHarmony: "Friendly" | "Neutral" | "Anty";
  conductorHarmony: "Friendly" | "Neutral" | "Anty";
  fullNamePlanet: string;
}

export interface NameCandidate {
  id: string;
  name: string;
  sanskrit: string;
  gender: BabyGender;
  meaning: string;
  origin: string;
  religion?: string;
  startingSyllable: string;
  startingLetter: string;
  deityConnection?: string;
  associatedNakshatras?: string[];
  chaldeanCompound: number;
  chaldeanSingle: number;
  pythagoreanExpression: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  fullNameCompound?: number;
  fullNameSingle?: number;
  harmonicScore: number; // 0 - 100%
  driverHarmony: "Friendly" | "Neutral" | "Inimical";
  conductorHarmony: "Friendly" | "Neutral" | "Inimical";
  parentHarmonyScore: number; // 0 - 100
  isAuspiciousCompound: boolean;
  compoundDescription: string;
  gridCompensation: string;
  reasons: string[];
  isJanmaksharMatch: boolean;
  isRashiMatch?: boolean;
  isAntyNumber?: boolean;
  pronology?: PronologyAnalysis;
  surnameHarmony?: SurnameHarmonyDetails;
}

export interface ShortlistBabyName {
  id: string;
  candidate: NameCandidate;
  parentRating: number; // 1 - 5 stars
  notes: string;
  savedAt: string;
  votes: {
    father: boolean;
    mother: boolean;
  };
}
