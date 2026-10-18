// AstroNext Standard KP Engine Shim

import { MasterKPEngine, MasterKPReport } from "./kp";

export type ComprehensiveKPReport = MasterKPReport;

export class KPEngine {
  public static calculateKPReport(
    cuspsMap: Record<number, number>,
    planets: Record<string, { longitude: number; isRetrograde?: boolean; name?: string }>,
    dayLord: string
  ): ComprehensiveKPReport {
    const cuspArray: number[] = [];
    for (let i = 1; i <= 12; i++) {
      cuspArray.push(cuspsMap[i] ?? (i - 1) * 30);
    }

    const ascLon = cuspsMap[1] ?? 0;
    const moonLon = planets.Moon?.longitude ?? 0;

    return MasterKPEngine.calculateMasterKP({
      ascendantLongitude: ascLon,
      moonLongitude: moonLon,
      planets,
      cuspLongitudes: cuspArray
    });
  }
}
