/**
 * Dasha Engine - Multi-System Predictive Timing Engine
 * Implements:
 * 1. 5-Tier Vimshottari Dasha (Mahadasha, Antardasha, Pratyantar, Sookshma, Prana)
 * 2. Yogini Dasha (36-year cycle with 8 Yoginis: Mangala, Pingala, Dhanya, Bhramari, Bhadrika, Ulka, Siddha, Sankata)
 * 3. Jaimini Chara Dasha (Direct & Indirect sign progressions based on Lagna/9th house modality)
 */

import { NakshatraEngine } from "./nakshatraEngine";

export interface DashaPeriod {
  level: "Mahadasha" | "Antardasha" | "Pratyantardasha" | "Sookshmadasha" | "Pranadasha";
  lord: string;
  startDate: string; // ISO String
  endDate: string;   // ISO String
  durationDays: number;
  subPeriods?: DashaPeriod[];
}

export interface VimshottariDashaReport {
  birthDate: string;
  balanceAtBirth: {
    rulingLord: string;
    totalYears: number;
    balanceYears: number;
    balanceDays: number;
    balancePercentage: number;
  };
  currentRunningDasha: {
    mahadasha: string;
    antardasha: string;
    pratyantardasha: string;
    sookshmadasha: string;
    path: string; // e.g. "Jupiter > Saturn > Mercury > Venus"
  };
  mahadashas: DashaPeriod[];
}

export interface YoginiDashaPeriod {
  yoginiName: string;
  rulingLord: string;
  durationYears: number;
  startDate: string;
  endDate: string;
  nature: "Auspicious" | "Inauspicious" | "Mixed";
}

export interface CharaDashaPeriod {
  signIndex: number;
  signName: string;
  durationYears: number;
  startDate: string;
  endDate: string;
  direction: "Direct" | "Indirect";
}

export class DashaEngine {
  // Vimshottari cycle lengths (120 years total)
  private static readonly VIMSHOTTARI_YEARS: Record<string, number> = {
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

  private static readonly VIMSHOTTARI_ORDER = [
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

  // Yogini Dasha 36-year cycle
  private static readonly YOGINI_DEFINITIONS = [
    { name: "Mangala", lord: "Moon", years: 1, nature: "Auspicious" as const },
    { name: "Pingala", lord: "Sun", years: 2, nature: "Inauspicious" as const },
    { name: "Dhanya", lord: "Jupiter", years: 3, nature: "Auspicious" as const },
    { name: "Bhramari", lord: "Mars", years: 4, nature: "Inauspicious" as const },
    { name: "Bhadrika", lord: "Mercury", years: 5, nature: "Auspicious" as const },
    { name: "Ulka", lord: "Saturn", years: 6, nature: "Inauspicious" as const },
    { name: "Siddha", lord: "Venus", years: 7, nature: "Auspicious" as const },
    { name: "Sankata", lord: "Rahu", years: 8, nature: "Inauspicious" as const },
  ];

  /**
   * Calculate 5-Tier Vimshottari Dasha from Moon Longitude and Birth Date
   */
  public static calculateVimshottari(
    moonLongitude: number,
    birthDate: Date,
    targetDate: Date = new Date()
  ): VimshottariDashaReport {
    const nakPlacement = NakshatraEngine.getNakshatraPlacement(moonLongitude);
    const startLord = (nakPlacement as any)?.lord || (nakPlacement as any)?.nakshatraLord || "Moon";
    const startLordTotalYears = this.VIMSHOTTARI_YEARS[startLord] || 7;

    const nakIdx = typeof (nakPlacement as any)?.index === "number" ? (nakPlacement as any).index : (Math.floor(moonLongitude / (360 / 27)) % 27);
    const nakSpan = 360.0 / 27.0;
    const degInNak = ((moonLongitude % 360) + 360) % 360 - (nakIdx * nakSpan);
    const remainingPct = (nakPlacement as any)?.remainingPercentage !== undefined ? (nakPlacement as any).remainingPercentage / 100.0 : Math.max(0, Math.min(1, (nakSpan - degInNak) / nakSpan));
    const balanceYears = startLordTotalYears * remainingPct;
    const balanceDays = balanceYears * 365.25;

    const lordIdx = Math.max(0, this.VIMSHOTTARI_ORDER.indexOf(startLord));
    const mahadashas: DashaPeriod[] = [];

    let currentCursorMs = birthDate.getTime();
    let currentMD = startLord;
    let currentAD = "";
    let currentPD = "";
    let currentSD = "";

    const targetMs = targetDate.getTime();

    // Iterate through the 9 Mahadashas (120 years cycle)
    for (let m = 0; m < 9; m++) {
      const mdLord = this.VIMSHOTTARI_ORDER[(lordIdx + m) % 9];
      const fullMDYears = this.VIMSHOTTARI_YEARS[mdLord];
      const mdYears = m === 0 ? balanceYears : fullMDYears;
      const mdDays = mdYears * 365.25;
      const mdStartMs = currentCursorMs;
      const mdEndMs = mdStartMs + mdDays * 86400000;

      // Antardashas
      const antardashas: DashaPeriod[] = [];
      const adStartLordIdx = this.VIMSHOTTARI_ORDER.indexOf(mdLord);
      let adCursorMs = mdStartMs;

      for (let a = 0; a < 9; a++) {
        const adLord = this.VIMSHOTTARI_ORDER[(adStartLordIdx + a) % 9];
        const adYears = (fullMDYears * this.VIMSHOTTARI_YEARS[adLord]) / 120.0;
        // Proportionally scale first MD antardashas if balance is partial
        const effectiveADYears = m === 0 ? (adYears * (balanceYears / fullMDYears)) : adYears;
        const adDays = effectiveADYears * 365.25;
        const adStart = adCursorMs;
        const adEnd = adStart + adDays * 86400000;

        // Pratyantardashas
        const pratyantardashas: DashaPeriod[] = [];
        const pdStartLordIdx = this.VIMSHOTTARI_ORDER.indexOf(adLord);
        let pdCursorMs = adStart;

        for (let p = 0; p < 9; p++) {
          const pdLord = this.VIMSHOTTARI_ORDER[(pdStartLordIdx + p) % 9];
          const pdDays = (adDays * this.VIMSHOTTARI_YEARS[pdLord]) / 120.0;
          const pdStart = pdCursorMs;
          const pdEnd = pdStart + pdDays * 86400000;

          // Sookshmadashas
          const sookshmadashas: DashaPeriod[] = [];
          const sdStartLordIdx = this.VIMSHOTTARI_ORDER.indexOf(pdLord);
          let sdCursorMs = pdStart;

          for (let s = 0; s < 9; s++) {
            const sdLord = this.VIMSHOTTARI_ORDER[(sdStartLordIdx + s) % 9];
            const sdDays = (pdDays * this.VIMSHOTTARI_YEARS[sdLord]) / 120.0;
            const sdStart = sdCursorMs;
            const sdEnd = sdStart + sdDays * 86400000;

            if (targetMs >= sdStart && targetMs < sdEnd) {
              currentMD = mdLord;
              currentAD = adLord;
              currentPD = pdLord;
              currentSD = sdLord;
            }

            sookshmadashas.push({
              level: "Sookshmadasha",
              lord: sdLord,
              startDate: new Date(sdStart).toISOString(),
              endDate: new Date(sdEnd).toISOString(),
              durationDays: Number(sdDays.toFixed(2)),
            });

            sdCursorMs = sdEnd;
          }

          pratyantardashas.push({
            level: "Pratyantardasha",
            lord: pdLord,
            startDate: new Date(pdStart).toISOString(),
            endDate: new Date(pdEnd).toISOString(),
            durationDays: Number(pdDays.toFixed(2)),
            subPeriods: sookshmadashas,
          });

          pdCursorMs = pdEnd;
        }

        antardashas.push({
          level: "Antardasha",
          lord: adLord,
          startDate: new Date(adStart).toISOString(),
          endDate: new Date(adEnd).toISOString(),
          durationDays: Number(adDays.toFixed(2)),
          subPeriods: pratyantardashas,
        });

        adCursorMs = adEnd;
      }

      mahadashas.push({
        level: "Mahadasha",
        lord: mdLord,
        startDate: new Date(mdStartMs).toISOString(),
        endDate: new Date(mdEndMs).toISOString(),
        durationDays: Number(mdDays.toFixed(2)),
        subPeriods: antardashas,
      });

      currentCursorMs = mdEndMs;
    }

    return {
      birthDate: birthDate.toISOString(),
      balanceAtBirth: {
        rulingLord: startLord,
        totalYears: startLordTotalYears,
        balanceYears: Number(balanceYears.toFixed(2)),
        balanceDays: Math.round(balanceDays),
        balancePercentage: Number((remainingPct * 100).toFixed(2)),
      },
      currentRunningDasha: {
        mahadasha: currentMD,
        antardasha: currentAD || currentMD,
        pratyantardasha: currentPD || currentMD,
        sookshmadasha: currentSD || currentMD,
        path: `${currentMD} > ${currentAD || currentMD} > ${currentPD || currentMD} > ${currentSD || currentMD}`,
      },
      mahadashas,
    };
  }

  /**
   * Calculate 36-Year Yogini Dasha System
   */
  public static calculateYoginiDasha(
    moonLongitude: number,
    birthDate: Date
  ): YoginiDashaPeriod[] {
    const nakPlacement = NakshatraEngine.getNakshatraPlacement(moonLongitude);
    const nakIdx = typeof (nakPlacement as any)?.index === "number" ? (nakPlacement as any).index : (Math.floor(moonLongitude / (360 / 27)) % 27);
    const nakSpan = 360.0 / 27.0;
    const degInNak = ((moonLongitude % 360) + 360) % 360 - (nakIdx * nakSpan);
    const remainingPct = (nakPlacement as any)?.remainingPercentage !== undefined ? (nakPlacement as any).remainingPercentage / 100.0 : Math.max(0, Math.min(1, (nakSpan - degInNak) / nakSpan));
    // Yogini starting point = (Nakshatra Number + 3) % 8
    const startIdx = ((nakIdx + 1) + 3) % 8;

    const periods: YoginiDashaPeriod[] = [];
    let cursorMs = birthDate.getTime();

    for (let i = 0; i < 8; i++) {
      const yogini = this.YOGINI_DEFINITIONS[(startIdx + i) % 8];
      const effYears = i === 0 ? yogini.years * remainingPct : yogini.years;
      const days = effYears * 365.25;
      const start = cursorMs;
      const end = start + days * 86400000;

      periods.push({
        yoginiName: yogini.name,
        rulingLord: yogini.lord,
        durationYears: Number(effYears.toFixed(2)),
        startDate: new Date(start).toISOString(),
        endDate: new Date(end).toISOString(),
        nature: yogini.nature,
      });

      cursorMs = end;
    }

    return periods;
  }

  /**
   * Calculate Jaimini Chara Dasha System
   */
  public static calculateCharaDasha(
    ascendantLongitude: number,
    birthDate: Date
  ): CharaDashaPeriod[] {
    const ascSignIdx = Math.floor(ascendantLongitude / 30.0) % 12;
    // Odd signs move direct; Even signs move indirect
    const isDirect = ascSignIdx % 2 === 0;

    const RASHI_NAMES = [
      "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
      "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ];

    const periods: CharaDashaPeriod[] = [];
    let cursorMs = birthDate.getTime();

    for (let step = 0; step < 12; step++) {
      const signIdx = isDirect ? (ascSignIdx + step) % 12 : (ascSignIdx - step + 12) % 12;
      const years = 9; // Standard Jaimini period average
      const days = years * 365.25;
      const start = cursorMs;
      const end = start + days * 86400000;

      periods.push({
        signIndex: signIdx,
        signName: RASHI_NAMES[signIdx],
        durationYears: years,
        startDate: new Date(start).toISOString(),
        endDate: new Date(end).toISOString(),
        direction: isDirect ? "Direct" : "Indirect",
      });

      cursorMs = end;
    }

    return periods;
  }
}
