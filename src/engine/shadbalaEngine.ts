// AstroNext Classical Shadbala Engine Adapter

import {
  PlanetaryShadbalaEngine,
  MasterShadbalaReport,
  ChartCalculationContext,
  PlanetaryCalculationInput
} from "./planetaryStrength";

export type ComprehensiveShadbalaReport = MasterShadbalaReport;

export class ShadbalaEngine {
  public static calculateShadbala(params: {
    planets: Record<string, any>;
    ascendantLongitude: number;
    sunLongitude: number;
    isDayBirth?: boolean;
    julianDay?: number;
  }): ComprehensiveShadbalaReport {
    const { planets, ascendantLongitude, sunLongitude, isDayBirth = true, julianDay = 2451545.0 } = params;

    const calcInputs: Record<string, PlanetaryCalculationInput> = {};
    Object.entries(planets).forEach(([pName, p]) => {
      calcInputs[pName] = {
        name: pName,
        longitude: p.longitude,
        speedLongitudeDegPerDay: p.speedLongitudeDegPerDay || 1.0,
        isRetrograde: p.isRetrograde,
        isCombust: p.isCombust,
        signIndex: p.signIndex,
        house: p.house
      };
    });

    const ctx: ChartCalculationContext = {
      planets: calcInputs,
      ascendantLongitude,
      isDayBirth,
      sunLongitude,
      moonLongitude: calcInputs.Moon?.longitude ?? 0,
      julianDay
    };

    return PlanetaryShadbalaEngine.calculateAll(ctx);
  }
}
