// AstroNext High-Precision Zodiac & Rashi Placement Engine

import { normalizeDeg } from "./astronomyMath";

export interface RashiPlacementDetails {
  signIndex: number;          // 0 to 11
  signName: string;           // "Aries", "Taurus", etc.
  signSanskrit: string;       // "Mesha", "Vrishabha", etc.
  rulingLord: string;         // "Mars", "Venus", etc.
  degreeInSign: number;       // 0.0 to 30.0
  formattedDegree: string;    // "14°23'11\""
  element: "Fire" | "Earth" | "Air" | "Water";
  modality: "Movable" | "Fixed" | "Dual";
  gender: "Male" | "Female";
  symbol: string;
}

export const ZODIAC_SIGNS: Array<{
  index: number;
  name: string;
  sanskrit: string;
  lord: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  modality: "Movable" | "Fixed" | "Dual";
  gender: "Male" | "Female";
  symbol: string;
}> = [
  { index: 0, name: "Aries", sanskrit: "Mesha", lord: "Mars", element: "Fire", modality: "Movable", gender: "Male", symbol: "Ram" },
  { index: 1, name: "Taurus", sanskrit: "Vrishabha", lord: "Venus", element: "Earth", modality: "Fixed", gender: "Female", symbol: "Bull" },
  { index: 2, name: "Gemini", sanskrit: "Mithuna", lord: "Mercury", element: "Air", modality: "Dual", gender: "Male", symbol: "Twins" },
  { index: 3, name: "Cancer", sanskrit: "Karka", lord: "Moon", element: "Water", modality: "Movable", gender: "Female", symbol: "Crab" },
  { index: 4, name: "Leo", sanskrit: "Simha", lord: "Sun", element: "Fire", modality: "Fixed", gender: "Male", symbol: "Lion" },
  { index: 5, name: "Virgo", sanskrit: "Kanya", lord: "Mercury", element: "Earth", modality: "Dual", gender: "Female", symbol: "Virgin" },
  { index: 6, name: "Libra", sanskrit: "Tula", lord: "Venus", element: "Air", modality: "Movable", gender: "Male", symbol: "Scales" },
  { index: 7, name: "Scorpio", sanskrit: "Vrishchika", lord: "Mars", element: "Water", modality: "Fixed", gender: "Female", symbol: "Scorpion" },
  { index: 8, name: "Sagittarius", sanskrit: "Dhanu", lord: "Jupiter", element: "Fire", modality: "Dual", gender: "Male", symbol: "Archer" },
  { index: 9, name: "Capricorn", sanskrit: "Makara", lord: "Saturn", element: "Earth", modality: "Movable", gender: "Female", symbol: "Sea-Goat" },
  { index: 10, name: "Aquarius", sanskrit: "Kumbha", lord: "Saturn", element: "Air", modality: "Fixed", gender: "Male", symbol: "Water-Bearer" },
  { index: 11, name: "Pisces", sanskrit: "Meena", lord: "Jupiter", element: "Water", modality: "Dual", gender: "Female", symbol: "Fishes" }
];

export class ZodiacEngine {
  public static getRashiByIndex(idx: number): {
    index: number;
    name: string;
    sanskrit: string;
    rulingLord: string;
    element: string;
    modality: string;
    gender: string;
    symbol: string;
  } {
    const safeIdx = ((Math.floor(idx) % 12) + 12) % 12;
    const sign = ZODIAC_SIGNS[safeIdx];
    return {
      index: sign.index,
      name: sign.name,
      sanskrit: sign.sanskrit,
      rulingLord: sign.lord,
      element: sign.element,
      modality: sign.modality,
      gender: sign.gender,
      symbol: sign.symbol
    };
  }

  public static getRashiPlacement(longitude: number): RashiPlacementDetails {
    const norm = normalizeDeg(longitude);
    const signIndex = Math.floor(norm / 30);
    const degreeInSign = norm % 30;
    const sign = ZODIAC_SIGNS[signIndex];

    const degInt = Math.floor(degreeInSign);
    const minFloat = (degreeInSign - degInt) * 60;
    const minInt = Math.floor(minFloat);
    const secInt = Math.floor((minFloat - minInt) * 60);
    const formattedDegree = `${degInt}°${minInt.toString().padStart(2, "0")}'${secInt.toString().padStart(2, "0")}"`;

    return {
      signIndex: sign.index,
      signName: sign.name,
      signSanskrit: sign.sanskrit,
      rulingLord: sign.lord,
      degreeInSign,
      formattedDegree,
      element: sign.element,
      modality: sign.modality,
      gender: sign.gender,
      symbol: sign.symbol
    };
  }

  public static getAllSigns() {
    return ZODIAC_SIGNS;
  }
}

export const ZODIAC_RASHIS = ZODIAC_SIGNS;

