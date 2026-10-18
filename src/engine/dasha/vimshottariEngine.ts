/**
 * Classical Vimshottari Dasha Engine
 * High-precision 5-tier predictive timing calculations (Mahadasha down to Pranadasha).
 * Strictly deterministic, zero gaps, zero overlapping intervals, fully compliant with BPHS.
 */

import { NakshatraEngine } from "../nakshatraEngine";

export interface DashaTierPeriod {
  level: 1 | 2 | 3 | 4 | 5;
  levelName: "Mahadasha" | "Antardasha" | "Pratyantardasha" | "Sookshmadasha" | "Pranadasha";
  lord: string;
  startDateIso: string;
  endDateIso: string;
  durationDays: number;
  progressPercentage?: number;
  isCurrent?: boolean;
  subPeriods?: DashaTierPeriod[];
}

export interface VimshottariBirthBalance {
  rulingLord: string;
  birthNakshatra: string;
  nakshatraIndex: number;
  nakshatraLord: string;
  nakshatraSpanDeg: number;
  moonLongitude: number;
  degreeInNakshatra: number;
  elapsedArcDeg: number;
  remainingArcDeg: number;
  elapsedPercentage: number;
  remainingPercentage: number;
  totalLordYears: number;
  balanceYears: number;
  balanceMonths: number;
  balanceDays: number;
  totalBalanceDays: number;
}

export interface MasterVimshottariReport {
  birthDateIso: string;
  targetDateIso: string;
  balanceAtBirth: VimshottariBirthBalance;
  currentHierarchy: {
    mahadasha: string;
    antardasha: string;
    pratyantardasha: string;
    sookshmadasha: string;
    pranadasha: string;
    path: string; // e.g. "Jupiter > Saturn > Mercury > Sun > Mars"
    currentStartDateIso: string;
    currentEndDateIso: string;
    progressPercentage: number;
    daysRemaining: number;
  };
  mahadashas: DashaTierPeriod[];
  calculationEngineVersion: string;
}

export class VimshottariEngine {
  public static readonly ENGINE_VERSION = "2.2.0-deterministic";

  public static readonly VIMSHOTTARI_YEARS: Record<string, number> = {
    Ketu: 7,
    Venus: 20,
    Sun: 6,
    Moon: 10,
    Mars: 7,
    Rahu: 18,
    Jupiter: 16,
    Saturn: 19,
    Mercury: 17,
  };

  public static readonly VIMSHOTTARI_ORDER = [
    "Ketu",
    "Venus",
    "Sun",
    "Moon",
    "Mars",
    "Rahu",
    "Jupiter",
    "Saturn",
    "Mercury",
  ];

  public static readonly SOLAR_YEAR_DAYS = 365.24219; // Tropical/Sidereal standard year constant

  /**
   * Calculate exact birth Dasha balance from Moon's absolute longitude
   */
  public static calculateBirthBalance(moonLongitude: number): VimshottariBirthBalance {
    const normLon = ((moonLongitude % 360) + 360) % 360;
    const nakSpan = 360.0 / 27.0; // 13.333333333333334° (13° 20')
    const nakIndex = Math.floor(normLon / nakSpan);
    const degreeInNak = normLon - (nakIndex * nakSpan);

    const nakPlacement = NakshatraEngine.getNakshatraPlacement(normLon);
    const rulingLord = (nakPlacement as any)?.lord || (nakPlacement as any)?.nakshatraLord || this.VIMSHOTTARI_ORDER[nakIndex % 9] || "Ketu";
    const totalLordYears = this.VIMSHOTTARI_YEARS[rulingLord] || 7;

    const remainingArcDeg = Math.max(0, nakSpan - degreeInNak);
    const fractionRemaining = remainingArcDeg / nakSpan;
    const fractionElapsed = 1.0 - fractionRemaining;

    const balanceYearsTotal = totalLordYears * fractionRemaining;
    const balanceYears = Math.floor(balanceYearsTotal);
    const remainingFractionAfterYears = balanceYearsTotal - balanceYears;
    const balanceMonths = Math.floor(remainingFractionAfterYears * 12);
    const remainingFractionAfterMonths = (remainingFractionAfterYears * 12) - balanceMonths;
    const balanceDays = Math.floor(remainingFractionAfterMonths * 30.4375);
    const totalBalanceDays = balanceYearsTotal * this.SOLAR_YEAR_DAYS;

    return {
      rulingLord,
      birthNakshatra: (nakPlacement as any)?.name || (nakPlacement as any)?.nakshatraName || "Ashwini",
      nakshatraIndex: nakIndex,
      nakshatraLord: rulingLord,
      nakshatraSpanDeg: nakSpan,
      moonLongitude: normLon,
      degreeInNakshatra: degreeInNak,
      elapsedArcDeg: degreeInNak,
      remainingArcDeg,
      elapsedPercentage: Number((fractionElapsed * 100).toFixed(4)),
      remainingPercentage: Number((fractionRemaining * 100).toFixed(4)),
      totalLordYears,
      balanceYears,
      balanceMonths,
      balanceDays,
      totalBalanceDays: Math.round(totalBalanceDays * 100) / 100
    };
  }

  /**
   * Calculate complete 120-year Vimshottari timeline with full 5-tier depth
   */
  public static calculateMasterVimshottari(params: {
    birthDate: Date | string;
    moonLongitude: number;
    targetDate?: Date | string;
    maxDepth?: 1 | 2 | 3 | 4 | 5;
  }): MasterVimshottariReport {
    const birthDateObj = typeof params.birthDate === "string" ? new Date(params.birthDate) : params.birthDate;
    const targetDateObj = params.targetDate 
      ? (typeof params.targetDate === "string" ? new Date(params.targetDate) : params.targetDate)
      : new Date();
    const maxDepth = params.maxDepth ?? 5;

    const balance = this.calculateBirthBalance(params.moonLongitude);
    const startLordIdx = this.VIMSHOTTARI_ORDER.indexOf(balance.rulingLord);
    const targetMs = targetDateObj.getTime();

    const mahadashas: DashaTierPeriod[] = [];
    let cursorMs = birthDateObj.getTime();

    // 9 Mahadashas (120 years cycle)
    for (let m = 0; m < 9; m++) {
      const lordIdx = (startLordIdx + m) % 9;
      const mdLord = this.VIMSHOTTARI_ORDER[lordIdx];
      const fullLordYears = this.VIMSHOTTARI_YEARS[mdLord];
      
      const mdYears = m === 0 ? (balance.totalBalanceDays / this.SOLAR_YEAR_DAYS) : fullLordYears;
      const mdDays = mdYears * this.SOLAR_YEAR_DAYS;
      const mdStartMs = cursorMs;
      const mdEndMs = mdStartMs + (mdDays * 86400000);
      const isCurrentMD = targetMs >= mdStartMs && targetMs < mdEndMs;

      let antardashas: DashaTierPeriod[] | undefined;

      if (maxDepth >= 2) {
        antardashas = this.generateAntardashas({
          mdLord,
          mdStartMs,
          mdEndMs,
          fullLordYears,
          effectiveYears: mdYears,
          isFirstPartial: m === 0,
          targetMs,
          maxDepth
        });
      }

      const mdProgress = isCurrentMD 
        ? Math.min(100, Math.max(0, ((targetMs - mdStartMs) / (mdEndMs - mdStartMs)) * 100))
        : (targetMs >= mdEndMs ? 100 : 0);

      mahadashas.push({
        level: 1,
        levelName: "Mahadasha",
        lord: mdLord,
        startDateIso: new Date(mdStartMs).toISOString(),
        endDateIso: new Date(mdEndMs).toISOString(),
        durationDays: Math.round(mdDays * 10) / 10,
        progressPercentage: Number(mdProgress.toFixed(2)),
        isCurrent: isCurrentMD,
        subPeriods: antardashas
      });

      cursorMs = mdEndMs;
    }

    // Identify active hierarchy
    const activeHierarchy = this.findActiveHierarchy(mahadashas, targetMs);

    return {
      birthDateIso: birthDateObj.toISOString(),
      targetDateIso: targetDateObj.toISOString(),
      balanceAtBirth: balance,
      currentHierarchy: activeHierarchy,
      mahadashas,
      calculationEngineVersion: this.ENGINE_VERSION
    };
  }

  /**
   * Internal generator for Antardashas
   */
  private static generateAntardashas(params: {
    mdLord: string;
    mdStartMs: number;
    mdEndMs: number;
    fullLordYears: number;
    effectiveYears: number;
    isFirstPartial: boolean;
    targetMs: number;
    maxDepth: number;
  }): DashaTierPeriod[] {
    const { mdLord, mdStartMs, fullLordYears, effectiveYears, isFirstPartial, targetMs, maxDepth } = params;
    const adStartLordIdx = this.VIMSHOTTARI_ORDER.indexOf(mdLord);
    const antardashas: DashaTierPeriod[] = [];
    let adCursorMs = mdStartMs;

    for (let a = 0; a < 9; a++) {
      const adLord = this.VIMSHOTTARI_ORDER[(adStartLordIdx + a) % 9];
      const nominalADYears = (fullLordYears * this.VIMSHOTTARI_YEARS[adLord]) / 120.0;
      const effectiveADYears = isFirstPartial 
        ? nominalADYears * (effectiveYears / fullLordYears)
        : nominalADYears;
      
      const adDays = effectiveADYears * this.SOLAR_YEAR_DAYS;
      const adStartMs = adCursorMs;
      const adEndMs = adStartMs + (adDays * 86400000);
      const isCurrentAD = targetMs >= adStartMs && targetMs < adEndMs;

      let pratyantars: DashaTierPeriod[] | undefined;
      if (maxDepth >= 3) {
        pratyantars = this.generatePratyantardashas({
          adLord,
          adStartMs,
          adDays,
          targetMs,
          maxDepth
        });
      }

      const adProgress = isCurrentAD
        ? Math.min(100, Math.max(0, ((targetMs - adStartMs) / (adEndMs - adStartMs)) * 100))
        : (targetMs >= adEndMs ? 100 : 0);

      antardashas.push({
        level: 2,
        levelName: "Antardasha",
        lord: adLord,
        startDateIso: new Date(adStartMs).toISOString(),
        endDateIso: new Date(adEndMs).toISOString(),
        durationDays: Math.round(adDays * 10) / 10,
        progressPercentage: Number(adProgress.toFixed(2)),
        isCurrent: isCurrentAD,
        subPeriods: pratyantars
      });

      adCursorMs = adEndMs;
    }

    return antardashas;
  }

  /**
   * Internal generator for Pratyantardashas
   */
  private static generatePratyantardashas(params: {
    adLord: string;
    adStartMs: number;
    adDays: number;
    targetMs: number;
    maxDepth: number;
  }): DashaTierPeriod[] {
    const { adLord, adStartMs, adDays, targetMs, maxDepth } = params;
    const pdStartLordIdx = this.VIMSHOTTARI_ORDER.indexOf(adLord);
    const pratyantars: DashaTierPeriod[] = [];
    let pdCursorMs = adStartMs;

    for (let p = 0; p < 9; p++) {
      const pdLord = this.VIMSHOTTARI_ORDER[(pdStartLordIdx + p) % 9];
      const pdDays = (adDays * this.VIMSHOTTARI_YEARS[pdLord]) / 120.0;
      const pdStartMs = pdCursorMs;
      const pdEndMs = pdStartMs + (pdDays * 86400000);
      const isCurrentPD = targetMs >= pdStartMs && targetMs < pdEndMs;

      let sookshmas: DashaTierPeriod[] | undefined;
      if (maxDepth >= 4) {
        sookshmas = this.generateSookshmadashas({
          pdLord,
          pdStartMs,
          pdDays,
          targetMs,
          maxDepth
        });
      }

      pratyantars.push({
        level: 3,
        levelName: "Pratyantardasha",
        lord: pdLord,
        startDateIso: new Date(pdStartMs).toISOString(),
        endDateIso: new Date(pdEndMs).toISOString(),
        durationDays: Math.round(pdDays * 100) / 100,
        isCurrent: isCurrentPD,
        subPeriods: sookshmas
      });

      pdCursorMs = pdEndMs;
    }

    return pratyantars;
  }

  /**
   * Internal generator for Sookshmadashas
   */
  private static generateSookshmadashas(params: {
    pdLord: string;
    pdStartMs: number;
    pdDays: number;
    targetMs: number;
    maxDepth: number;
  }): DashaTierPeriod[] {
    const { pdLord, pdStartMs, pdDays, targetMs, maxDepth } = params;
    const sdStartLordIdx = this.VIMSHOTTARI_ORDER.indexOf(pdLord);
    const sookshmas: DashaTierPeriod[] = [];
    let sdCursorMs = pdStartMs;

    for (let s = 0; s < 9; s++) {
      const sdLord = this.VIMSHOTTARI_ORDER[(sdStartLordIdx + s) % 9];
      const sdDays = (pdDays * this.VIMSHOTTARI_YEARS[sdLord]) / 120.0;
      const sdStartMs = sdCursorMs;
      const sdEndMs = sdStartMs + (sdDays * 86400000);
      const isCurrentSD = targetMs >= sdStartMs && targetMs < sdEndMs;

      let pranas: DashaTierPeriod[] | undefined;
      if (maxDepth >= 5) {
        pranas = this.generatePranadashas({
          sdLord,
          sdStartMs,
          sdDays,
          targetMs
        });
      }

      sookshmas.push({
        level: 4,
        levelName: "Sookshmadasha",
        lord: sdLord,
        startDateIso: new Date(sdStartMs).toISOString(),
        endDateIso: new Date(sdEndMs).toISOString(),
        durationDays: Math.round(sdDays * 1000) / 1000,
        isCurrent: isCurrentSD,
        subPeriods: pranas
      });

      sdCursorMs = sdEndMs;
    }

    return sookshmas;
  }

  /**
   * Internal generator for Pranadashas
   */
  private static generatePranadashas(params: {
    sdLord: string;
    sdStartMs: number;
    sdDays: number;
    targetMs: number;
  }): DashaTierPeriod[] {
    const { sdLord, sdStartMs, sdDays, targetMs } = params;
    const praStartLordIdx = this.VIMSHOTTARI_ORDER.indexOf(sdLord);
    const pranas: DashaTierPeriod[] = [];
    let praCursorMs = sdStartMs;

    for (let pr = 0; pr < 9; pr++) {
      const praLord = this.VIMSHOTTARI_ORDER[(praStartLordIdx + pr) % 9];
      const praDays = (sdDays * this.VIMSHOTTARI_YEARS[praLord]) / 120.0;
      const praStartMs = praCursorMs;
      const praEndMs = praStartMs + (praDays * 86400000);
      const isCurrentPRA = targetMs >= praStartMs && targetMs < praEndMs;

      pranas.push({
        level: 5,
        levelName: "Pranadasha",
        lord: praLord,
        startDateIso: new Date(praStartMs).toISOString(),
        endDateIso: new Date(praEndMs).toISOString(),
        durationDays: Math.round(praDays * 10000) / 10000,
        isCurrent: isCurrentPRA
      });

      praCursorMs = praEndMs;
    }

    return pranas;
  }

  /**
   * Extract the current active 5-tier path from a calculated period hierarchy
   */
  private static findActiveHierarchy(mahadashas: DashaTierPeriod[], targetMs: number) {
    const activeMD = mahadashas.find(m => m.isCurrent) || mahadashas[0];
    const activeAD = activeMD.subPeriods?.find(a => a.isCurrent) || activeMD.subPeriods?.[0];
    const activePD = activeAD?.subPeriods?.find(p => p.isCurrent) || activeAD?.subPeriods?.[0];
    const activeSD = activePD?.subPeriods?.find(s => s.isCurrent) || activePD?.subPeriods?.[0];
    const activePRA = activeSD?.subPeriods?.find(pr => pr.isCurrent) || activeSD?.subPeriods?.[0];

    const mdLord = activeMD.lord;
    const adLord = activeAD?.lord ?? mdLord;
    const pdLord = activePD?.lord ?? adLord;
    const sdLord = activeSD?.lord ?? pdLord;
    const praLord = activePRA?.lord ?? sdLord;

    const startMs = activeAD ? new Date(activeAD.startDateIso).getTime() : new Date(activeMD.startDateIso).getTime();
    const endMs = activeAD ? new Date(activeAD.endDateIso).getTime() : new Date(activeMD.endDateIso).getTime();
    const progress = Math.min(100, Math.max(0, ((targetMs - startMs) / (endMs - startMs)) * 100));
    const daysRemaining = Math.max(0, Math.round((endMs - targetMs) / (86400000) * 10) / 10);

    return {
      mahadasha: mdLord,
      antardasha: adLord,
      pratyantardasha: pdLord,
      sookshmadasha: sdLord,
      pranadasha: praLord,
      path: `${mdLord} > ${adLord} > ${pdLord} > ${sdLord} > ${praLord}`,
      currentStartDateIso: new Date(startMs).toISOString(),
      currentEndDateIso: new Date(endMs).toISOString(),
      progressPercentage: Number(progress.toFixed(2)),
      daysRemaining
    };
  }
}
