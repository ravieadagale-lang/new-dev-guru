// AstroNext Prashna Deep Horary Engine Adapter

import { MasterPrashnaEngine, MasterPrashnaReport, PrashnaQueryDomain } from "./prashna";

export type PrashnaJudgementReport = MasterPrashnaReport;
export type { PrashnaQueryDomain };

export class PrashnaDeepEngine {
  public static analyzePrashna(params: {
    queryText: string;
    domain: PrashnaQueryDomain | string;
    prashnaAscendantLongitude: number;
    planets: Record<string, { longitude: number; name?: string; isRetrograde?: boolean }>;
    queryTime?: Date;
  }): PrashnaJudgementReport {
    const {
      queryText,
      domain,
      prashnaAscendantLongitude,
      planets,
      queryTime = new Date()
    } = params;

    return MasterPrashnaEngine.analyzeMasterPrashna({
      queryText,
      domain: domain as PrashnaQueryDomain,
      prashnaAscendantLongitude,
      planets,
      queryTime
    });
  }
}
