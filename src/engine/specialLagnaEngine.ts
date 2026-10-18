// AstroNext Special Lagna Engine (Parashari Shastric Reference Points)

import { ZODIAC_RASHIS } from "./zodiacEngine";
import { degToDMS, normalizeDeg } from "./astronomyMath";

export interface SpecialLagnaItem {
  name: string;
  code: string;
  longitude: number;
  rashi: {
    signName: string;
    signIndex: number;
    dms: string;
  };
  formula: string;
  significance: string;
}

export interface SpecialLagnaReport {
  horaLagna: SpecialLagnaItem;
  ghatiLagna: SpecialLagnaItem;
  bhavaLagna: SpecialLagnaItem;
  pranapadaLagna: SpecialLagnaItem;
  sreeLagna: SpecialLagnaItem;
  induLagna: SpecialLagnaItem;
  allLagnas: SpecialLagnaItem[];
}

export class SpecialLagnaEngine {
  public static calculateSpecialLagnas(params: {
    sunLongitude: number;
    moonLongitude: number;
    ascendantLongitude: number;
    sunriseTimeHoursUtc?: number;
    birthTimeHoursUtc?: number;
    atmakarakaNavamshaSignIndex?: number;
    planetaryPositions?: Record<string, { longitude: number }>;
  }): SpecialLagnaReport {
    const {
      sunLongitude,
      moonLongitude,
      ascendantLongitude,
      sunriseTimeHoursUtc = 6.0,
      birthTimeHoursUtc = 12.0
    } = params;

    // Elapsed time from sunrise in Ghatis (1 hour = 2.5 ghatis)
    const elapsedHours = Math.max(0, birthTimeHoursUtc - sunriseTimeHoursUtc);
    const ghatis = elapsedHours * 2.5;

    // 1. Hora Lagna: Sun + (Ghatis * 12°) or 1 sign per hour from Sun
    const hlLon = normalizeDeg(sunLongitude + ghatis * 12);
    const hlSignIdx = Math.floor(hlLon / 30) % 12;

    // 2. Ghati Lagna: Sun + (Ghatis * 30°) or 1 sign per ghati (24 min)
    const glLon = normalizeDeg(sunLongitude + ghatis * 30);
    const glSignIdx = Math.floor(glLon / 30) % 12;

    // 3. Bhava Lagna: Sun + (Ghatis * 6°)
    const blLon = normalizeDeg(sunLongitude + ghatis * 6);
    const blSignIdx = Math.floor(blLon / 30) % 12;

    // 4. Pranapada Lagna: based on Vighatis from sunrise + Ascendant base
    const vighatis = ghatis * 60;
    const pplLon = normalizeDeg(ascendantLongitude + (vighatis / 15) * 30);
    const pplSignIdx = Math.floor(pplLon / 30) % 12;

    // 5. Sree Lagna: Ascendant + (Moon nakshatra elapsed portion * 360°)
    const moonNakSpan = 360 / 27; // 13°20'
    const nakElapsedFraction = (moonLongitude % moonNakSpan) / moonNakSpan;
    const slLon = normalizeDeg(ascendantLongitude + nakElapsedFraction * 360);
    const slSignIdx = Math.floor(slLon / 30) % 12;

    // 6. Indu Lagna: (Rays of 9th lord from Lagna + Rays of 9th lord from Moon) mod 12 from Moon sign
    // Classical Rays (Kalidasa / Parashara): Sun:30, Moon:16, Mars:6, Mercury:8, Jupiter:10, Venus:12, Saturn:1
    const PLANET_RAYS: Record<string, number> = {
      Sun: 30, Moon: 16, Mars: 6, Mercury: 8, Jupiter: 10, Venus: 12, Saturn: 1
    };
    const SIGN_LORDS = ["Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter"];

    const ascSignIdx = Math.floor(ascendantLongitude / 30) % 12;
    const moonSignIdx = Math.floor(moonLongitude / 30) % 12;

    const ninthFromAscLord = SIGN_LORDS[(ascSignIdx + 8) % 12];
    const ninthFromMoonLord = SIGN_LORDS[(moonSignIdx + 8) % 12];

    const rays1 = PLANET_RAYS[ninthFromAscLord] || 8;
    const rays2 = PLANET_RAYS[ninthFromMoonLord] || 8;
    const totalRays = rays1 + rays2;
    const remainder = (totalRays % 12) || 12;
    const ilSignIdx = (moonSignIdx + remainder - 1) % 12;
    const ilLon = ilSignIdx * 30 + (ascendantLongitude % 30);

    const formatLagna = (name: string, code: string, lon: number, signIdx: number, formula: string, sig: string): SpecialLagnaItem => {
      const rashi = ZODIAC_RASHIS[signIdx] || ZODIAC_RASHIS[0];
      return {
        name,
        code,
        longitude: lon,
        rashi: {
          signName: rashi.name,
          signIndex: signIdx,
          dms: degToDMS(lon % 30)
        },
        formula,
        significance: sig
      };
    };

    const horaLagna = formatLagna("Hora Lagna", "HL", hlLon, hlSignIdx, "Sun + (Ghatis * 12°)", "Wealth, financial accumulation, and liquidity.");
    const ghatiLagna = formatLagna("Ghati Lagna", "GL", glLon, glSignIdx, "Sun + (Ghatis * 30°)", "Power, authority, high rank, and political eminence.");
    const bhavaLagna = formatLagna("Bhava Lagna", "BL", blLon, blSignIdx, "Sun + (Ghatis * 6°)", "Vital life force, longevity, and physical stamina.");
    const pranapadaLagna = formatLagna("Pranapada Lagna", "PP", pplLon, pplSignIdx, "Vighatis / 15 + Ascendant Base", "Breath of life, subconscious sanity, and birth rectification.");
    const sreeLagna = formatLagna("Sree Lagna", "SL", slLon, slSignIdx, "Ascendant + Moon Nakshatra Fraction * 360°", "Divine grace, lasting fortune, and prosperity flow.");
    const induLagna = formatLagna("Indu Lagna", "IL", ilLon, ilSignIdx, "(Rays of 9th Lord Lagna + Rays of 9th Lord Moon) mod 12", "Sudden financial windfalls and institutional wealth.");

    return {
      horaLagna,
      ghatiLagna,
      bhavaLagna,
      pranapadaLagna,
      sreeLagna,
      induLagna,
      allLagnas: [horaLagna, ghatiLagna, bhavaLagna, pranapadaLagna, sreeLagna, induLagna]
    };
  }
}
