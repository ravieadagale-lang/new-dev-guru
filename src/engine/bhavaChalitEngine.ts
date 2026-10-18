/**
 * Bhava Chalit Engine - Explicit Separation of Rashi Chart vs Bhava Chalit Chart
 * Computes Sripati / Symmetrical Bhava Madhya (Midpoints) and Bhava Sandhi (Cusp Junctures)
 * Identifies exact planetary house shifts from D1 Rashi into adjacent Bhavas.
 */

import { normalizeDeg, degToDMS } from "./astronomyMath";
import { ZodiacEngine, RashiPlacementDetails } from "./zodiacEngine";

export interface BhavaMadhyaSandhi {
  bhavaNumber: number;          // 1 to 12
  bhavaMadhyaDeg: number;       // Midpoint of Bhava (Peak energy)
  bhavaMadhyaDms: string;
  bhavaMadhyaSign: string;
  bhavaSandhiStartDeg: number;  // Starting junction
  bhavaSandhiStartDms: string;
  bhavaSandhiEndDeg: number;    // Ending junction
  bhavaSandhiEndDms: string;
  bhavaLord: string;
}

export interface BhavaChalitPlanetShift {
  planet: string;
  rashiSign: string;
  rashiSignIndex: number;
  rashiHouse: number;           // House in D1 Whole Sign
  bhavaChalitHouse: number;     // Actual Bhava in Chalit
  hasShifted: boolean;          // True if bhavaChalitHouse !== rashiHouse
  shiftDirection?: "Forward into Next Bhava" | "Backward into Previous Bhava" | "None";
  distanceFromMadhyaDeg: number;
  significance: string;
}

export interface BhavaChalitReport {
  ascendantMadhya: number;
  bhavas: Record<number, BhavaMadhyaSandhi>;
  bhavasList: BhavaMadhyaSandhi[];
  planetShifts: BhavaChalitPlanetShift[];
  planetaryBhavaShifts: Record<string, { chalitHouseNumber: number; rashiHouseNumber: number; hasShifted: boolean }>;
  shiftedPlanetsCount: number;
}

export class BhavaChalitEngine {
  /**
   * Calculate Bhava Chalit chart using traditional Sripati / Symmetrical Bhava Sandhi methodology
   */
  public static calculateBhavaChalit(
    ascendantLonOrParams: number | {
      ascendantLongitude: number;
      midheavenLongitude?: number;
      planets: Record<string, { longitude: number; name: string }>;
    },
    planetsArg?: Record<string, { longitude: number; name: string }>
  ): BhavaChalitReport {
    const ascendantLon = typeof ascendantLonOrParams === "number" ? ascendantLonOrParams : ascendantLonOrParams.ascendantLongitude;
    const planets = typeof ascendantLonOrParams === "object" ? ascendantLonOrParams.planets : (planetsArg || {});

    const ascPlacement = ZodiacEngine.getRashiPlacement(ascendantLon);
    const ascSignIdx = ascPlacement.signIndex;

    const bhavas: Record<number, BhavaMadhyaSandhi> = {};
    const bhavasList: BhavaMadhyaSandhi[] = [];

    // In classical Sripati / Bhava Chalit:
    // Bhava 1 Madhya = Ascendant Degree
    // Bhava h Madhya = Ascendant Degree + (h-1)*30
    // Sandhi between Bhava h and h+1 = Midpoint between their Madhyas
    const madhyas: number[] = [];
    for (let h = 1; h <= 12; h++) {
      madhyas[h] = normalizeDeg(ascendantLon + (h - 1) * 30.0);
    }

    const sandhis: number[] = [];
    for (let h = 1; h <= 12; h++) {
      const nextH = h === 12 ? 1 : h + 1;
      let diff = madhyas[nextH] - madhyas[h];
      if (diff < 0) diff += 360;
      sandhis[h] = normalizeDeg(madhyas[h] + diff / 2.0); // Sandhi between h and h+1
    }

    for (let h = 1; h <= 12; h++) {
      const prevH = h === 1 ? 12 : h - 1;
      const startSandhi = sandhis[prevH];
      const endSandhi = sandhis[h];
      const madhya = madhyas[h];
      const rashi = ZodiacEngine.getRashiPlacement(madhya);

      const item: BhavaMadhyaSandhi = {
        bhavaNumber: h,
        bhavaMadhyaDeg: madhya,
        bhavaMadhyaDms: degToDMS(madhya % 30),
        bhavaMadhyaSign: rashi.signName,
        bhavaSandhiStartDeg: startSandhi,
        bhavaSandhiStartDms: degToDMS(startSandhi % 30),
        bhavaSandhiEndDeg: endSandhi,
        bhavaSandhiEndDms: degToDMS(endSandhi % 30),
        bhavaLord: rashi.signLord,
      };

      bhavas[h] = item;
      bhavasList.push(item);
    }

    // Determine actual Bhava Chalit placement for every planet
    const planetShifts: BhavaChalitPlanetShift[] = [];
    let shiftedCount = 0;

    Object.values(planets).forEach((p) => {
      const pLon = normalizeDeg(p.longitude);
      const pRashiPlacement = ZodiacEngine.getRashiPlacement(pLon);
      const rashiHouse = ((pRashiPlacement.signIndex - ascSignIdx + 12) % 12) + 1;

      // Find which bhava sandhi span contains pLon
      let chalitHouse = 1;
      for (let h = 1; h <= 12; h++) {
        const start = bhavas[h].bhavaSandhiStartDeg;
        const end = bhavas[h].bhavaSandhiEndDeg;

        let inSpan = false;
        if (end > start) {
          inSpan = pLon >= start && pLon < end;
        } else {
          // Span crosses 0° Aries
          inSpan = pLon >= start || pLon < end;
        }

        if (inSpan) {
          chalitHouse = h;
          break;
        }
      }

      const hasShifted = chalitHouse !== rashiHouse;
      if (hasShifted) shiftedCount++;

      let shiftDir: BhavaChalitPlanetShift["shiftDirection"] = "None";
      if (hasShifted) {
        if (chalitHouse === ((rashiHouse % 12) + 1)) {
          shiftDir = "Forward into Next Bhava";
        } else {
          shiftDir = "Backward into Previous Bhava";
        }
      }

      let distFromMadhya = Math.abs(pLon - bhavas[chalitHouse].bhavaMadhyaDeg);
      if (distFromMadhya > 180) distFromMadhya = 360 - distFromMadhya;

      let significance = "";
      if (!hasShifted) {
        significance = `${p.name} resides comfortably in Bhava ${chalitHouse}, expressing both Rashi sign traits and Bhava results consistently.`;
      } else {
        significance = `${p.name} occupies ${pRashiPlacement.signName} in D1 Rashi (House ${rashiHouse}), but operates from Bhava ${chalitHouse} in Bhava Chalit. It delivers tangible life results of House ${chalitHouse} colored by ${pRashiPlacement.signName} psychological demeanor.`;
      }

      planetShifts.push({
        planet: p.name,
        rashiSign: pRashiPlacement.signName,
        rashiSignIndex: pRashiPlacement.signIndex,
        rashiHouse,
        bhavaChalitHouse: chalitHouse,
        hasShifted,
        shiftDirection: shiftDir,
        distanceFromMadhyaDeg: Number(distFromMadhya.toFixed(2)),
        significance,
      });
    });

    const planetaryBhavaShifts: Record<string, { chalitHouseNumber: number; rashiHouseNumber: number; hasShifted: boolean }> = {};
    planetShifts.forEach((ps) => {
      planetaryBhavaShifts[ps.planet] = {
        chalitHouseNumber: ps.bhavaChalitHouse,
        rashiHouseNumber: ps.rashiHouse,
        hasShifted: ps.hasShifted,
      };
    });

    return {
      ascendantMadhya: ascendantLon,
      bhavas,
      bhavasList,
      planetShifts,
      planetaryBhavaShifts,
      shiftedPlanetsCount: shiftedCount,
    };
  }
}
