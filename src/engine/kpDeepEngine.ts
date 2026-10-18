// AstroNext Deep KP Engine Adapter

import { MasterKPEngine, MasterKPReport } from "./kp";

export type CompleteKPDeepReport = MasterKPReport;

export class KPDeepEngine {
  public static calculateKPReport(params: {
    ascendantLongitude: number;
    planets: Record<string, { longitude: number; isRetrograde?: boolean; name?: string }>;
    placidusCusps: Record<number, number>;
    birthWeekdayName?: string;
  }): CompleteKPDeepReport {
    const { ascendantLongitude, planets, placidusCusps } = params;
    const cuspArray: number[] = [];
    for (let i = 1; i <= 12; i++) {
      cuspArray.push(placidusCusps[i] ?? (i - 1) * 30);
    }

    const moonLon = planets.Moon?.longitude ?? 0;

    return MasterKPEngine.calculateMasterKP({
      ascendantLongitude,
      moonLongitude: moonLon,
      planets,
      cuspLongitudes: cuspArray
    });
  }
}
