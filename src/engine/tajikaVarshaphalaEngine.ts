// AstroNext Tajika Varshaphala Engine Adapter

import { MasterTajikaEngine, MasterTajikaReport } from "./tajika";

export type TajikaAnnualReport = MasterTajikaReport;

export class TajikaVarshaphalaEngine {
  public static calculateVarshaphala(params: {
    birthDate: Date;
    targetYear: number;
    natalSunLongitude: number;
    natalAscendantLongitude: number;
    planets: Record<string, { longitude: number; isRetrograde?: boolean; name?: string }>;
    isDayBirth?: boolean;
  }): TajikaAnnualReport {
    const {
      birthDate,
      targetYear,
      natalSunLongitude,
      natalAscendantLongitude,
      planets,
      isDayBirth = true
    } = params;

    return MasterTajikaEngine.calculateMasterTajika({
      birthDate,
      targetYear,
      natalSunLongitude,
      natalAscendantLongitude,
      planets,
      isDayBirth
    });
  }
}
