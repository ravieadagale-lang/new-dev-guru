/**
 * Comprehensive Drishti & Planetary Aspect Engine
 * Implements Section 11 & 12 of the AstroNext Master Specification.
 * Handles: Parashari Graha Drishti, Special Mars/Jupiter/Saturn aspects, Jaimini Rashi Drishti,
 * and Western orbed aspects with applying/separating tracking.
 */

import { normalizeDeg } from "./astronomyMath";
import { ZODIAC_SIGNS } from "./zodiacEngine";

export interface GrahaDrishtiDetail {
  aspectingPlanet: string;
  targetHouseNumber: number; // 1 to 12
  targetPlanet?: string;
  aspectType: "Full 7th" | "Mars 4th/8th" | "Jupiter 5th/9th" | "Saturn 3rd/10th" | "Rahu/Ketu 5th/9th" | "Partial Aspect";
  drishtiStrengthVirupas: number; // 0 to 60 Virupas
  drishtiPercentage: number;     // 0 to 100%
  isBeneficAspect: boolean;
  effectDescription: string;
}

export interface JaiminiRashiDrishtiDetail {
  aspectingSignIndex: number;
  aspectingSignName: string;
  aspectingSignModality: "Movable (Chara)" | "Fixed (Sthira)" | "Dual (Dwisvabhava)";
  aspectedSignIndex: number;
  aspectedSignName: string;
  planetsInAspectedSign: string[];
}

export interface WesternAspectDetail {
  planet1: string;
  planet2: string;
  aspectName: "Conjunction" | "Sextile" | "Square" | "Trine" | "Opposition" | "Quincunx" | "Semisquare" | "Sesquiquadrate";
  exactAngleDeg: number;
  currentSeparationDeg: number;
  orbDeg: number;
  allowedOrbDeg: number;
  isApplying: boolean;
  aspectStrengthPct: number;
  nature: "Harmonious" | "Challenging" | "Neutral / Dynamic";
}

export interface CompleteAspectReport {
  grahaDrishtis: GrahaDrishtiDetail[];
  jaiminiRashiDrishtis: JaiminiRashiDrishtiDetail[];
  westernAspects: WesternAspectDetail[];
}

export class DrishtiAspectEngine {
  /**
   * Calculate all Vedic Parashari Graha Drishtis
   */
  public static calculateGrahaDrishti(
    planets: Record<string, { longitude: number; name?: string }>,
    ascendantLongitude: number
  ): GrahaDrishtiDetail[] {
    const ascSignIdx = Math.floor(ascendantLongitude / 30.0);
    const drishtis: GrahaDrishtiDetail[] = [];

    const beneficList = ["Jupiter", "Venus", "Mercury", "Moon"];

    Object.entries(planets).forEach(([pName, p]) => {
      const pSignIdx = Math.floor(p.longitude / 30.0);
      const pHouse = ((pSignIdx - ascSignIdx + 12) % 12) + 1;
      const isBenefic = beneficList.includes(pName);

      // Universal 7th house full aspect (100% / 60 Virupas)
      const h7 = ((pHouse + 6 - 1) % 12) + 1;
      drishtis.push({
        aspectingPlanet: pName,
        targetHouseNumber: h7,
        aspectType: "Full 7th",
        drishtiStrengthVirupas: 60,
        drishtiPercentage: 100,
        isBeneficAspect: isBenefic,
        effectDescription: `${pName} casts full 7th aspect onto House ${h7}`,
      });

      // Special Mars aspects (4th and 8th)
      if (pName === "Mars") {
        const h4 = ((pHouse + 3 - 1) % 12) + 1;
        const h8 = ((pHouse + 7 - 1) % 12) + 1;
        drishtis.push({
          aspectingPlanet: "Mars",
          targetHouseNumber: h4,
          aspectType: "Mars 4th/8th",
          drishtiStrengthVirupas: 60,
          drishtiPercentage: 100,
          isBeneficAspect: false,
          effectDescription: "Mars energizes and disciplines House " + h4 + " via special 4th aspect",
        });
        drishtis.push({
          aspectingPlanet: "Mars",
          targetHouseNumber: h8,
          aspectType: "Mars 4th/8th",
          drishtiStrengthVirupas: 60,
          drishtiPercentage: 100,
          isBeneficAspect: false,
          effectDescription: "Mars casts transformative 8th aspect onto House " + h8,
        });
      }

      // Special Jupiter & Rahu/Ketu aspects (5th and 9th Trikona aspects)
      if (pName === "Jupiter" || pName === "Rahu" || pName === "Ketu") {
        const h5 = ((pHouse + 4 - 1) % 12) + 1;
        const h9 = ((pHouse + 8 - 1) % 12) + 1;
        const aspectType = pName === "Jupiter" ? "Jupiter 5th/9th" : "Rahu/Ketu 5th/9th";
        drishtis.push({
          aspectingPlanet: pName,
          targetHouseNumber: h5,
          aspectType,
          drishtiStrengthVirupas: 60,
          drishtiPercentage: 100,
          isBeneficAspect: pName === "Jupiter",
          effectDescription: `${pName} bestows divine 5th house trinal grace/karmic impact onto House ${h5}`,
        });
        drishtis.push({
          aspectingPlanet: pName,
          targetHouseNumber: h9,
          aspectType,
          drishtiStrengthVirupas: 60,
          drishtiPercentage: 100,
          isBeneficAspect: pName === "Jupiter",
          effectDescription: `${pName} bestows 9th house fortune/dharma activation onto House ${h9}`,
        });
      }

      // Special Saturn aspects (3rd and 10th Upachaya/Karma aspects)
      if (pName === "Saturn") {
        const h3 = ((pHouse + 2 - 1) % 12) + 1;
        const h10 = ((pHouse + 9 - 1) % 12) + 1;
        drishtis.push({
          aspectingPlanet: "Saturn",
          targetHouseNumber: h3,
          aspectType: "Saturn 3rd/10th",
          drishtiStrengthVirupas: 60,
          drishtiPercentage: 100,
          isBeneficAspect: false,
          effectDescription: "Saturn demands persistent effort and courage in House " + h3,
        });
        drishtis.push({
          aspectingPlanet: "Saturn",
          targetHouseNumber: h10,
          aspectType: "Saturn 3rd/10th",
          drishtiStrengthVirupas: 60,
          drishtiPercentage: 100,
          isBeneficAspect: false,
          effectDescription: "Saturn enforces karmic responsibility and career duty in House " + h10,
        });
      }
    });

    return drishtis;
  }

  /**
   * Calculate Jaimini Rashi Drishti (Sign Aspects)
   * Rule:
   * - Movable signs (Aries, Cancer, Libra, Cap) aspect all Fixed signs EXCEPT adjacent
   * - Fixed signs (Taurus, Leo, Scorpio, Aqua) aspect all Movable signs EXCEPT adjacent
   * - Dual signs (Gemini, Virgo, Sag, Pisces) aspect all other Dual signs
   */
  public static calculateJaiminiRashiDrishti(
    planets: Record<string, { longitude: number; name?: string }>
  ): JaiminiRashiDrishtiDetail[] {
    const results: JaiminiRashiDrishtiDetail[] = [];

    // Map planets in each sign
    const signPlanets: Record<number, string[]> = {};
    for (let i = 0; i < 12; i++) signPlanets[i] = [];
    Object.entries(planets).forEach(([pName, p]) => {
      const s = Math.floor(p.longitude / 30.0) % 12;
      signPlanets[s].push(pName);
    });

    for (let s = 0; s < 12; s++) {
      const modality = s % 3 === 0 ? "Movable (Chara)" : s % 3 === 1 ? "Fixed (Sthira)" : "Dual (Dwisvabhava)";
      const targetSigns: number[] = [];

      if (modality === "Movable (Chara)") {
        // Fixed signs: 1, 4, 7, 10 except adjacent (s+1)%12
        [1, 4, 7, 10].forEach((fs) => {
          if (fs !== (s + 1) % 12 && fs !== s) targetSigns.push(fs);
        });
      } else if (modality === "Fixed (Sthira)") {
        // Movable signs: 0, 3, 6, 9 except adjacent (s-1+12)%12
        [0, 3, 6, 9].forEach((ms) => {
          if (ms !== (s - 1 + 12) % 12 && ms !== s) targetSigns.push(ms);
        });
      } else {
        // Dual signs: 2, 5, 8, 11 except self
        [2, 5, 8, 11].forEach((ds) => {
          if (ds !== s) targetSigns.push(ds);
        });
      }

      targetSigns.forEach((ts) => {
        results.push({
          aspectingSignIndex: s,
          aspectingSignName: ZODIAC_SIGNS[s].name,
          aspectingSignModality: modality,
          aspectedSignIndex: ts,
          aspectedSignName: ZODIAC_SIGNS[ts].name,
          planetsInAspectedSign: signPlanets[ts] || [],
        });
      });
    }

    return results;
  }

  /**
   * Calculate Western Major & Minor Aspects with applying/separating tracking
   */
  public static calculateWesternAspects(
    planets: Record<string, { longitude: number; speedLongitudeDegPerDay?: number; name?: string }>
  ): WesternAspectDetail[] {
    const aspectDefs = [
      { name: "Conjunction", angle: 0, orb: 8.0, nature: "Neutral / Dynamic" },
      { name: "Sextile", angle: 60, orb: 6.0, nature: "Harmonious" },
      { name: "Square", angle: 90, orb: 7.0, nature: "Challenging" },
      { name: "Trine", angle: 120, orb: 8.0, nature: "Harmonious" },
      { name: "Opposition", angle: 180, orb: 8.0, nature: "Challenging" },
      { name: "Quincunx", angle: 150, orb: 3.0, nature: "Challenging" },
      { name: "Semisquare", angle: 45, orb: 2.5, nature: "Challenging" },
      { name: "Sesquiquadrate", angle: 135, orb: 2.5, nature: "Challenging" },
    ] as const;

    const pNames = Object.keys(planets);
    const aspects: WesternAspectDetail[] = [];

    for (let i = 0; i < pNames.length; i++) {
      for (let j = i + 1; j < pNames.length; j++) {
        const p1Name = pNames[i];
        const p2Name = pNames[j];
        const p1 = planets[p1Name];
        const p2 = planets[p2Name];
        if (!p1 || !p2) continue;

        let sep = Math.abs(normalizeDeg(p1.longitude - p2.longitude));
        if (sep > 180) sep = 360 - sep;

        aspectDefs.forEach((def) => {
          const orb = Math.abs(sep - def.angle);
          if (orb <= def.orb) {
            const speed1 = p1.speedLongitudeDegPerDay ?? 1;
            const speed2 = p2.speedLongitudeDegPerDay ?? 1;
            // Faster planet moving towards slower planet = applying
            const isApplying = speed1 > speed2 ? p1.longitude < p2.longitude : p2.longitude < p1.longitude;
            const strength = Number(((1.0 - orb / def.orb) * 100).toFixed(1));

            aspects.push({
              planet1: p1Name,
              planet2: p2Name,
              aspectName: def.name,
              exactAngleDeg: def.angle,
              currentSeparationDeg: Number(sep.toFixed(2)),
              orbDeg: Number(orb.toFixed(2)),
              allowedOrbDeg: def.orb,
              isApplying,
              aspectStrengthPct: strength,
              nature: def.nature,
            });
          }
        });
      }
    }

    return aspects;
  }
}
