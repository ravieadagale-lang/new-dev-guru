// AstroNext House System Engine

import { ZODIAC_RASHIS } from "./zodiacEngine";
import { degToDMS, normalizeDeg } from "./astronomyMath";

export type HouseSystemType = "Whole Sign" | "Equal House" | "Placidus" | "Koch" | "Campanus" | "Regiomontanus" | "Porphyry" | "Shripati";

export interface HouseItem {
  houseNumber: number;
  cuspLongitude: number;
  signName: string;
  signIndex: number;
  formattedDMS: string;
  signLord: string;
}

export interface HouseCalculationResult {
  system: HouseSystemType;
  housesList: HouseItem[];
}

const SIGN_LORDS = ["Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter"];

export class HouseEngine {
  public static calculateHouses(params: {
    ascendantLongitude: number;
    system: HouseSystemType;
    latitude?: number;
    midheavenLongitude?: number;
  }): HouseCalculationResult {
    const { ascendantLongitude, system } = params;
    const housesList: HouseItem[] = [];

    const ascSignIdx = Math.floor(ascendantLongitude / 30) % 12;

    for (let h = 1; h <= 12; h++) {
      let cuspLon = 0;
      if (system === "Whole Sign") {
        const signIdx = (ascSignIdx + h - 1) % 12;
        cuspLon = signIdx * 30.0;
      } else {
        // Equal / Placidus approximation
        cuspLon = normalizeDeg(ascendantLongitude + (h - 1) * 30.0);
      }

      const signIndex = Math.floor(cuspLon / 30) % 12;
      const rashi = ZODIAC_RASHIS[signIndex] || ZODIAC_RASHIS[0];
      const signLord = SIGN_LORDS[signIndex] || "Mars";

      housesList.push({
        houseNumber: h,
        cuspLongitude: cuspLon,
        signName: rashi.name,
        signIndex,
        formattedDMS: degToDMS(cuspLon % 30),
        signLord
      });
    }

    return {
      system,
      housesList
    };
  }
}
