import { normalizeDeg } from "./astronomyMath";
import { ZODIAC_SIGNS } from "./zodiacEngine";

export interface SinglePlanetStatus {
  name: string;
  longitude: number;
  signIndex: number;
  sign: string;
  degreeInSign: number;
  house: number;
  dignity: string;
  isRetrograde?: boolean;
  isCombust?: boolean;
}

export interface PlanetaryStatusReport {
  planets: Record<string, SinglePlanetStatus>;
}

// Classical deep exaltation and debilitation reference points (signIndex and degree)
interface ExaltDebilPoint {
  exaltSign: number;
  exaltDeg: number;
  debilSign: number;
  debilDeg: number;
  moolaSign: number;
  moolaDegEnd: number;
  ownSigns: number[];
  friendSigns: number[];
  enemySigns: number[];
}

const PLANETARY_DIGNITY_RULES: Record<string, ExaltDebilPoint> = {
  Sun: {
    exaltSign: 0, // Aries
    exaltDeg: 10,
    debilSign: 6, // Libra
    debilDeg: 10,
    moolaSign: 4, // Leo
    moolaDegEnd: 20,
    ownSigns: [4],
    friendSigns: [0, 7, 8, 11, 3], // Mars, Jupiter, Moon
    enemySigns: [1, 2, 5, 6, 9, 10] // Venus, Saturn, Mercury
  },
  Moon: {
    exaltSign: 1, // Taurus
    exaltDeg: 3,
    debilSign: 7, // Scorpio
    debilDeg: 3,
    moolaSign: 1,
    moolaDegEnd: 30,
    ownSigns: [3], // Cancer
    friendSigns: [0, 4, 2, 5],
    enemySigns: []
  },
  Mars: {
    exaltSign: 9, // Capricorn
    exaltDeg: 28,
    debilSign: 3, // Cancer
    debilDeg: 28,
    moolaSign: 0, // Aries
    moolaDegEnd: 12,
    ownSigns: [0, 7], // Aries, Scorpio
    friendSigns: [4, 3, 8, 11],
    enemySigns: [2, 5]
  },
  Mercury: {
    exaltSign: 5, // Virgo
    exaltDeg: 15,
    debilSign: 11, // Pisces
    debilDeg: 15,
    moolaSign: 5,
    moolaDegEnd: 20,
    ownSigns: [2, 5], // Gemini, Virgo
    friendSigns: [4, 1, 6],
    enemySigns: [3]
  },
  Jupiter: {
    exaltSign: 3, // Cancer
    exaltDeg: 5,
    debilSign: 9, // Capricorn
    debilDeg: 5,
    moolaSign: 8, // Sagittarius
    moolaDegEnd: 10,
    ownSigns: [8, 11], // Sagittarius, Pisces
    friendSigns: [0, 4, 3, 7],
    enemySigns: [2, 5, 1, 6]
  },
  Venus: {
    exaltSign: 11, // Pisces
    exaltDeg: 27,
    debilSign: 5, // Virgo
    debilDeg: 27,
    moolaSign: 6, // Libra
    moolaDegEnd: 15,
    ownSigns: [1, 6], // Taurus, Libra
    friendSigns: [2, 5, 9, 10],
    enemySigns: [4, 3]
  },
  Saturn: {
    exaltSign: 6, // Libra
    exaltDeg: 20,
    debilSign: 0, // Aries
    debilDeg: 20,
    moolaSign: 10, // Aquarius
    moolaDegEnd: 20,
    ownSigns: [9, 10], // Capricorn, Aquarius
    friendSigns: [2, 5, 1, 6],
    enemySigns: [4, 3, 0, 7]
  },
  Rahu: {
    exaltSign: 1, // Taurus
    exaltDeg: 20,
    debilSign: 7, // Scorpio
    debilDeg: 20,
    moolaSign: 10,
    moolaDegEnd: 30,
    ownSigns: [10],
    friendSigns: [2, 5, 6],
    enemySigns: [4, 3, 0]
  },
  Ketu: {
    exaltSign: 7, // Scorpio
    exaltDeg: 20,
    debilSign: 1, // Taurus
    debilDeg: 20,
    moolaSign: 8,
    moolaDegEnd: 30,
    ownSigns: [7],
    friendSigns: [0, 4],
    enemySigns: [1, 6, 9, 10]
  }
};

export class PlanetaryEngine {
  /**
   * Computes the dignity string for a given planet at a specific sign and degree
   */
  public static computeDignity(name: string, signIndex: number, degreeInSign: number): string {
    const rule = PLANETARY_DIGNITY_RULES[name];
    if (!rule) return "Neutral (Sama)";

    if (signIndex === rule.exaltSign) {
      if (Math.abs(degreeInSign - rule.exaltDeg) <= 3.0) {
        return "Deep Exaltation (Param Uchha)";
      }
      return "Exalted (Uchha)";
    }

    if (signIndex === rule.debilSign) {
      if (Math.abs(degreeInSign - rule.debilDeg) <= 3.0) {
        return "Deep Debilitation (Param Neecha)";
      }
      return "Debilitated (Neecha)";
    }

    if (signIndex === rule.moolaSign && degreeInSign <= rule.moolaDegEnd) {
      return "Own Sign (Moolatrikona)";
    }

    if (rule.ownSigns.includes(signIndex)) {
      return "Own Sign (Swa Kshetra)";
    }

    if (rule.friendSigns.includes(signIndex)) {
      return "Friendly Sign (Mitra Kshetra)";
    }

    if (rule.enemySigns.includes(signIndex)) {
      return "Enemy Sign (Shatru Kshetra)";
    }

    return "Neutral (Sama)";
  }

  /**
   * Calculates planet statuses from a mapping of planet coordinates
   */
  public static calculatePlanets(
    planetsInput: Record<string, { longitude: number; [key: string]: any }>,
    ascendantLongitude: number = 0
  ): Record<string, SinglePlanetStatus> {
    const results: Record<string, SinglePlanetStatus> = {};
    if (!planetsInput || typeof planetsInput !== "object") return results;

    const ascSignIdx = Math.floor(normalizeDeg(ascendantLongitude) / 30.0) % 12;

    for (const [pName, pData] of Object.entries(planetsInput)) {
      if (!pData || typeof pData.longitude !== "number") continue;

      const normLon = normalizeDeg(pData.longitude);
      const signIndex = Math.floor(normLon / 30.0) % 12;
      const degreeInSign = normLon % 30.0;
      const signName = ZODIAC_SIGNS[signIndex]?.name || "Aries";
      const house = ((signIndex - ascSignIdx + 12) % 12) + 1;
      const dignity = this.computeDignity(pName, signIndex, degreeInSign);

      results[pName] = {
        name: pName,
        longitude: normLon,
        signIndex,
        sign: signName,
        degreeInSign,
        house,
        dignity,
        isRetrograde: Boolean(pData.isRetrograde),
        isCombust: Boolean(pData.isCombust)
      };
    }

    return results;
  }

  /**
   * High-level evaluator called in pipeline
   */
  public static evaluateAllPlanets(
    siderealPositions: Record<string, number>,
    ascendantLongitude: number,
    housePlacements?: Record<string, number>
  ): PlanetaryStatusReport {
    const inputs: Record<string, { longitude: number }> = {};
    if (siderealPositions && typeof siderealPositions === "object") {
      for (const [k, v] of Object.entries(siderealPositions)) {
        if (typeof v === "number") {
          inputs[k] = { longitude: v };
        }
      }
    }

    const calculated = this.calculatePlanets(inputs, ascendantLongitude);

    if (housePlacements) {
      for (const [pName, hNum] of Object.entries(housePlacements)) {
        if (calculated[pName] && typeof hNum === "number") {
          calculated[pName].house = hNum;
        }
      }
    }

    return { planets: calculated };
  }
}
