// AstroNext Standard Transit Gochara Engine

import { MasterTransitEngine, MasterTransitReport } from "./transits";

export interface PlanetTransitInfo {
  planet: string;
  referenceFrame: "JANMA_MOON";
  houseFromMoon: number;
  houseFromLagna: number;
  signName: string;
  longitude: number;
  isRetrograde?: boolean;
}

export interface ComprehensiveTransitReport extends Omit<MasterTransitReport, "sadeSati"> {
  referenceFrame: "JANMA_MOON_AND_LAGNA";
  planetTransitsList: PlanetTransitInfo[];
  planetTransits: Record<string, PlanetTransitInfo>;
  sadeSati: {
    referenceFrame: "JANMA_MOON";
    phase: string;
    description: string;
  };
}

export class TransitEngine {
  public static calculateTransits(params: {
    natalMoonLon: number;
    natalAscendantLon: number;
    transitPlanets: Record<string, { longitude: number; name?: string; isRetrograde?: boolean }>;
    transitDate?: Date;
  }): ComprehensiveTransitReport {
    const {
      natalMoonLon,
      natalAscendantLon,
      transitPlanets,
      transitDate = new Date()
    } = params;

    const baseMaster = MasterTransitEngine.calculateMasterTransits({
      natalPlanets: transitPlanets,
      natalAscendantLon,
      natalMoonLon,
      targetDate: transitDate
    });

    const moonSignIdx = Math.floor(natalMoonLon / 30) % 12;
    const ascSignIdx = Math.floor(natalAscendantLon / 30) % 12;

    const planetTransitsList: PlanetTransitInfo[] = [];
    const planetTransits: Record<string, PlanetTransitInfo> = {};

    Object.entries(transitPlanets).forEach(([pName, p]) => {
      const pSignIdx = Math.floor(p.longitude / 30) % 12;
      const hFromMoon = ((pSignIdx - moonSignIdx + 12) % 12) + 1;
      const hFromLagna = ((pSignIdx - ascSignIdx + 12) % 12) + 1;

      const item: PlanetTransitInfo = {
        planet: pName,
        referenceFrame: "JANMA_MOON",
        houseFromMoon: hFromMoon,
        houseFromLagna: hFromLagna,
        signName: baseMaster.currentPositions[pName]?.signName || "Aries",
        longitude: p.longitude,
        isRetrograde: p.isRetrograde
      };

      planetTransitsList.push(item);
      planetTransits[pName] = item;
    });

    return {
      ...baseMaster,
      referenceFrame: "JANMA_MOON_AND_LAGNA",
      planetTransitsList,
      planetTransits,
      sadeSati: {
        referenceFrame: "JANMA_MOON",
        phase: baseMaster.sadeSati.phase,
        description: baseMaster.sadeSati.description
      }
    };
  }
}
