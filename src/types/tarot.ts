// Tarot System Types

export type TarotSuit = "Major Arcana" | "Wands" | "Cups" | "Swords" | "Pentacles";

export type TarotElement = "Fire" | "Water" | "Air" | "Earth" | "Spirit";

export type ReadingCategory = 
  | "love" 
  | "career" 
  | "finance" 
  | "spiritual" 
  | "general" 
  | "decision" 
  | "health" 
  | "relationship" 
  | "daily";

export interface TarotCardData {
  id: string;
  name: string;
  number: number;
  suit: TarotSuit;
  arcana: "Major" | "Minor";
  element: TarotElement;
  astrologicalAssociation?: string;
  hebrewLetter?: string;
  numerologyNumber?: number;
  uprightKeywords: string[];
  reversedKeywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  symbolism: string;
  advice: string;
  imageUrl: string;
  categoryMeanings?: {
    love?: { upright: string; reversed: string };
    career?: { upright: string; reversed: string };
    finance?: { upright: string; reversed: string };
    spirituality?: { upright: string; reversed: string };
  };
  [key: string]: any;
}

export interface TarotSpreadPosition {
  index?: number;
  id?: number | string;
  name?: string;
  label?: string;
  meaning?: string;
  description?: string;
  x?: number;
  y?: number;
  [key: string]: any;
}

export interface TarotSpread {
  id: string;
  name: string;
  subtitle?: string;
  cardsCount: number;
  cardCount?: number;
  layoutType: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  category: ReadingCategory | "universal";
  description: string;
  positions: TarotSpreadPosition[];
  [key: string]: any;
}

export interface DrawnCard {
  card: TarotCardData;
  isReversed: boolean;
  positionLabel?: string;
  positionIndex: number;
  position?: TarotSpreadPosition;
  drawnAt?: number;
  notes?: string;
}

export interface ReadingAnalysis {
  summary: string;
  theme: string;
  synthesis: string;
  keyInsight: string;
  cardInterpretations: {
    positionName: string;
    cardName: string;
    isReversed: boolean;
    meaning: string;
  }[];
  elementalBalance: {
    fire: number;
    water: number;
    air: number;
    earth: number;
  };
  advice: string[];
  affirmation: string;
  overallTone?: string;
  actionableGuidance?: string[];
  [key: string]: any;
}

export interface TarotReadingSession {
  id: string;
  timestamp: string;
  seekerName?: string;
  seekerQuestion?: string;
  question?: string;
  category: ReadingCategory;
  spread: TarotSpread;
  cards?: DrawnCard[];
  drawnCards?: DrawnCard[];
  analysis: ReadingAnalysis;
  readingDepth?: string;
  tags?: string[];
  isFavorite?: boolean;
  [key: string]: any;
}
