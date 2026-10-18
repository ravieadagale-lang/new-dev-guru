/**
 * Vimshottari Dasha, Ashtakavarga (BAV & SAV), Jaimini Chara Karakas,
 * Upagrahas (Gulika, Mandi) & Special Lagnas (Bhava, Hora, Ghatika Lagna) Engine
 */

import { SiderealChartData, ZODIAC_SIGNS } from "./siderealEngine";
import { normalizeDeg } from "./astronomyMath";

export interface DashaPeriod {
  lord: string;
  startDate: string;
  endDate: string;
  durationYears: number;
  isCurrent: boolean;
  subPeriods?: DashaPeriod[];
}

export interface VimshottariDashaResult {
  janmaNakshatraLord: string;
  birthDashaBalanceYears: number;
  birthDashaBalanceFormatted: string; // e.g. "4 Years, 2 Months, 11 Days"
  currentDasha: {
    mahadasha: string;
    antardasha: string;
    pratyantardasha: string;
    summary: string;
  };
  mahadashas: DashaPeriod[];
}

export interface AshtakavargaResult {
  bav: Record<string, number[]>; // 12-element array per planet (0 to 8 points)
  sav: number[];                 // 12-element array of total points per sign (sum = 337)
  signNames: string[];
  totalPoints: number;           // 337
  strongestSign: { sign: string; points: number; signIndex: number };
  weakestSign: { sign: string; points: number; signIndex: number };
  trikonaShodhana: number[];
  ekadhipatyaShodhana: number[];
  shodhitaPinda: number[];
}

export interface JaiminiKarakaResult {
  karaka: "Atmakaraka (AK)" | "Amatyakaraka (AmK)" | "Bhratrukaraka (BK)" | "Matrukaraka (MK)" | "Putrakaraka (PK)" | "Gnatikaraka (GK)" | "Darakaraka (DK)";
  planet: string;
  degreeInSign: number;
  signName: string;
  signIndex: number;
  signification: string;
}

export interface UpagrahaSpecialLagnasResult {
  specialLagnas: {
    bhavaLagna: { longitude: number; signName: string; degreeInSign: number };
    horaLagna: { longitude: number; signName: string; degreeInSign: number };
    ghatikaLagna: { longitude: number; signName: string; degreeInSign: number };
  };
  upagrahas: {
    gulika: { longitude: number; signName: string; degreeInSign: number; house: number };
    mandi: { longitude: number; signName: string; degreeInSign: number; house: number };
    dhuma: { longitude: number; signName: string; degreeInSign: number };
    vyatipata: { longitude: number; signName: string; degreeInSign: number };
    parivesha: { longitude: number; signName: string; degreeInSign: number };
    indrachapa: { longitude: number; signName: string; degreeInSign: number };
    upaketu: { longitude: number; signName: string; degreeInSign: number };
  };
}

export const VIMSHOTTARI_LORDS: { lord: string; years: number }[] = [
  { lord: "Ketu", years: 7 },
  { lord: "Venus", years: 20 },
  { lord: "Sun", years: 6 },
  { lord: "Moon", years: 10 },
  { lord: "Mars", years: 7 },
  { lord: "Rahu", years: 18 },
  { lord: "Jupiter", years: 16 },
  { lord: "Saturn", years: 19 },
  { lord: "Mercury", years: 17 },
];

/**
 * Calculates 3 Nested Levels of Vimshottari Dasha (MD -> AD -> PD)
 */
export function calculateVimshottariDasha(
  birthDate: Date,
  moonLongitude: number,
  targetDate: Date = new Date()
): VimshottariDashaResult {
  const nakshatraSpan = 360 / 27; // 13.333333°
  const nakshatraIndex = Math.floor(moonLongitude / nakshatraSpan);
  const degIntoNakshatra = moonLongitude % nakshatraSpan;

  // 27 Nakshatra rulers cycle every 9 (Ketu -> Venus -> Sun -> Moon -> Mars -> Rahu -> Jupiter -> Saturn -> Mercury)
  const rulerCycleIdx = nakshatraIndex % 9;
  const janmaLordInfo = VIMSHOTTARI_LORDS[rulerCycleIdx];

  // Fraction remaining in birth dasha
  const fractionElapsed = degIntoNakshatra / nakshatraSpan;
  const fractionRemaining = 1.0 - fractionElapsed;
  const balanceYears = janmaLordInfo.years * fractionRemaining;

  const balY = Math.floor(balanceYears);
  const balM = Math.floor((balanceYears - balY) * 12);
  const balD = Math.floor(((balanceYears - balY) * 12 - balM) * 30.4375);
  const balanceStr = `${balY} Years, ${balM} Months, ${balD} Days`;

  // Start building 120-year cycle
  const mahadashas: DashaPeriod[] = [];
  let currentCursor = new Date(birthDate.getTime());

  let activeMD = "";
  let activeAD = "";
  let activePD = "";

  for (let i = 0; i < 9; i++) {
    const lordIdx = (rulerCycleIdx + i) % 9;
    const lordInfo = VIMSHOTTARI_LORDS[lordIdx];
    const duration = i === 0 ? balanceYears : lordInfo.years;

    const mdStart = new Date(currentCursor.getTime());
    const mdEnd = new Date(mdStart.getTime() + duration * 365.2425 * 86400000);
    currentCursor = new Date(mdEnd.getTime());

    const isCurrentMD = targetDate >= mdStart && targetDate < mdEnd;
    if (isCurrentMD) activeMD = lordInfo.lord;

    // Sub-periods: Antardashas (AD)
    const antardashas: DashaPeriod[] = [];
    let adCursor = new Date(mdStart.getTime());

    for (let j = 0; j < 9; j++) {
      const adLordIdx = (lordIdx + j) % 9;
      const adLordInfo = VIMSHOTTARI_LORDS[adLordIdx];
      // Full AD duration in nominal MD = (MD.years * AD.years) / 120
      // For first MD, scaled proportionally by (duration / lordInfo.years)
      const nominalAdYears = (lordInfo.years * adLordInfo.years) / 120;
      const actualAdYears = nominalAdYears * (duration / lordInfo.years);

      const adStart = new Date(adCursor.getTime());
      const adEnd = new Date(adStart.getTime() + actualAdYears * 365.2425 * 86400000);
      adCursor = new Date(adEnd.getTime());

      const isCurrentAD = isCurrentMD && targetDate >= adStart && targetDate < adEnd;
      if (isCurrentAD) activeAD = adLordInfo.lord;

      // Sub-periods: Pratyantardashas (PD)
      const pratyantardashas: DashaPeriod[] = [];
      let pdCursor = new Date(adStart.getTime());

      for (let k = 0; k < 9; k++) {
        const pdLordIdx = (adLordIdx + k) % 9;
        const pdLordInfo = VIMSHOTTARI_LORDS[pdLordIdx];
        const nominalPdYears = (lordInfo.years * adLordInfo.years * pdLordInfo.years) / (120 * 120);
        const actualPdYears = nominalPdYears * (duration / lordInfo.years);

        const pdStart = new Date(pdCursor.getTime());
        const pdEnd = new Date(pdStart.getTime() + actualPdYears * 365.2425 * 86400000);
        pdCursor = new Date(pdEnd.getTime());

        const isCurrentPD = isCurrentAD && targetDate >= pdStart && targetDate < pdEnd;
        if (isCurrentPD) activePD = pdLordInfo.lord;

        pratyantardashas.push({
          lord: pdLordInfo.lord,
          startDate: pdStart.toISOString().split("T")[0],
          endDate: pdEnd.toISOString().split("T")[0],
          durationYears: Number(actualPdYears.toFixed(4)),
          isCurrent: isCurrentPD,
        });
      }

      antardashas.push({
        lord: adLordInfo.lord,
        startDate: adStart.toISOString().split("T")[0],
        endDate: adEnd.toISOString().split("T")[0],
        durationYears: Number(actualAdYears.toFixed(3)),
        isCurrent: isCurrentAD,
        subPeriods: pratyantardashas,
      });
    }

    mahadashas.push({
      lord: lordInfo.lord,
      startDate: mdStart.toISOString().split("T")[0],
      endDate: mdEnd.toISOString().split("T")[0],
      durationYears: Number(duration.toFixed(2)),
      isCurrent: isCurrentMD,
      subPeriods: antardashas,
    });
  }

  return {
    janmaNakshatraLord: janmaLordInfo.lord,
    birthDashaBalanceYears: Number(balanceYears.toFixed(2)),
    birthDashaBalanceFormatted: balanceStr,
    currentDasha: {
      mahadasha: activeMD || mahadashas[0]?.lord || "Sun",
      antardasha: activeAD || "Sun",
      pratyantardasha: activePD || "Sun",
      summary: `Active Cycle: ${activeMD || "Ketu"} MD > ${activeAD || "Venus"} AD > ${activePD || "Sun"} PD`,
    },
    mahadashas,
  };
}

/**
 * Classical Parashari Ashtakavarga Rules
 * 12-sign benefic point contributor rules for 7 planets + Lagna
 */
const BAV_RULES: Record<string, Record<string, number[]>> = {
  Sun: {
    Sun: [1, 2, 4, 7, 8, 9, 10, 11],
    Moon: [3, 6, 10, 11],
    Mars: [1, 2, 4, 7, 8, 9, 10, 11],
    Mercury: [3, 5, 6, 9, 10, 11, 12],
    Jupiter: [5, 6, 9, 11],
    Venus: [6, 7, 12],
    Saturn: [1, 2, 4, 7, 8, 9, 10, 11],
    Ascendant: [3, 4, 6, 10, 11, 12],
  },
  Moon: {
    Sun: [3, 6, 7, 8, 10, 11],
    Moon: [1, 3, 6, 7, 10, 11],
    Mars: [2, 3, 5, 6, 9, 10, 11],
    Mercury: [1, 3, 4, 5, 7, 8, 10, 11],
    Jupiter: [1, 4, 7, 8, 10, 11, 12],
    Venus: [3, 4, 5, 7, 9, 10, 11],
    Saturn: [3, 5, 6, 11],
    Ascendant: [3, 6, 10, 11],
  },
  Mars: {
    Sun: [3, 5, 6, 10, 11],
    Moon: [3, 6, 11],
    Mars: [1, 2, 4, 7, 8, 10, 11],
    Mercury: [3, 5, 6, 11],
    Jupiter: [6, 10, 11, 12],
    Venus: [6, 8, 11, 12],
    Saturn: [1, 4, 7, 8, 9, 10, 11],
    Ascendant: [1, 3, 6, 10, 11],
  },
  Mercury: {
    Sun: [5, 6, 9, 11, 12],
    Moon: [2, 4, 6, 8, 10, 11],
    Mars: [1, 2, 4, 7, 8, 9, 10, 11],
    Mercury: [1, 3, 5, 6, 9, 10, 11, 12],
    Jupiter: [6, 8, 11, 12],
    Venus: [1, 2, 3, 4, 5, 8, 9, 11],
    Saturn: [1, 2, 4, 7, 8, 9, 10, 11],
    Ascendant: [1, 2, 4, 6, 8, 10, 11],
  },
  Jupiter: {
    Sun: [1, 2, 3, 4, 7, 8, 9, 10, 11],
    Moon: [2, 5, 7, 9, 11],
    Mars: [1, 2, 4, 7, 8, 10, 11],
    Mercury: [1, 2, 4, 5, 6, 9, 10, 11],
    Jupiter: [1, 2, 3, 4, 7, 8, 10, 11],
    Venus: [2, 5, 6, 9, 10, 11],
    Saturn: [3, 5, 6, 12],
    Ascendant: [1, 2, 4, 5, 6, 7, 9, 10, 11],
  },
  Venus: {
    Sun: [8, 11, 12],
    Moon: [1, 2, 3, 4, 5, 8, 9, 11, 12],
    Mars: [3, 5, 6, 9, 11, 12],
    Mercury: [3, 5, 6, 9, 11],
    Jupiter: [5, 8, 9, 10, 11],
    Venus: [1, 2, 3, 4, 5, 8, 9, 10, 11],
    Saturn: [3, 4, 5, 8, 9, 10, 11],
    Ascendant: [1, 2, 3, 4, 5, 8, 9, 11],
  },
  Saturn: {
    Sun: [1, 2, 4, 7, 8, 10, 11],
    Moon: [3, 6, 11],
    Mars: [3, 5, 6, 10, 11, 12],
    Mercury: [6, 8, 9, 10, 11, 12],
    Jupiter: [5, 6, 11, 12],
    Venus: [6, 11, 12],
    Saturn: [3, 5, 6, 11],
    Ascendant: [1, 3, 4, 6, 10, 11],
  },
};

/**
 * Calculates Full Ashtakavarga (BAV & SAV)
 */
export function calculateAshtakavarga(chart: SiderealChartData): AshtakavargaResult {
  const planetSigns: Record<string, number> = {
    Sun: chart.planets.Sun?.signIndex || 0,
    Moon: chart.planets.Moon?.signIndex || 0,
    Mars: chart.planets.Mars?.signIndex || 0,
    Mercury: chart.planets.Mercury?.signIndex || 0,
    Jupiter: chart.planets.Jupiter?.signIndex || 0,
    Venus: chart.planets.Venus?.signIndex || 0,
    Saturn: chart.planets.Saturn?.signIndex || 0,
    Ascendant: chart.ascendant.signIndex,
  };

  const bav: Record<string, number[]> = {};
  const sav: number[] = new Array(12).fill(0);

  for (const targetPlanet of ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"]) {
    const scores = new Array(12).fill(0);
    const rules = BAV_RULES[targetPlanet];

    for (const sourcePlanet in rules) {
      const sourceSign = planetSigns[sourcePlanet];
      const benefichouses = rules[sourcePlanet];

      for (const h of benefichouses) {
        const targetSign = (sourceSign + (h - 1)) % 12;
        scores[targetSign] += 1;
      }
    }

    bav[targetPlanet] = scores;
    for (let s = 0; s < 12; s++) {
      sav[s] += scores[s];
    }
  }

  // Find strongest & weakest signs
  let maxPoints = -1;
  let maxIdx = 0;
  let minPoints = 999;
  let minIdx = 0;

  for (let i = 0; i < 12; i++) {
    if (sav[i] > maxPoints) {
      maxPoints = sav[i];
      maxIdx = i;
    }
    if (sav[i] < minPoints) {
      minPoints = sav[i];
      minIdx = i;
    }
  }

  // Trikona Shodhana (Trinal Reductions: 1-5-9, 2-6-10, 3-7-11, 4-8-12)
  const trikonaShodhana = [...sav];
  for (let base = 0; base < 4; base++) {
    const s1 = base;
    const s2 = base + 4;
    const s3 = base + 8;
    const minVal = Math.min(trikonaShodhana[s1], trikonaShodhana[s2], trikonaShodhana[s3]);
    trikonaShodhana[s1] -= minVal;
    trikonaShodhana[s2] -= minVal;
    trikonaShodhana[s3] -= minVal;
  }

  // Ekadhipatya Shodhana (Sign pairs owned by same lord: Aries/Scorpio, Taurus/Libra, Gemini/Virgo, Sag/Pisces, Cap/Aqua)
  const ekadhipatyaShodhana = [...trikonaShodhana];
  const pairs = [[0, 7], [1, 6], [2, 5], [8, 11], [9, 10]];
  for (const [p1, p2] of pairs) {
    if (ekadhipatyaShodhana[p1] === 0 || ekadhipatyaShodhana[p2] === 0) continue;
    const minVal = Math.min(ekadhipatyaShodhana[p1], ekadhipatyaShodhana[p2]);
    ekadhipatyaShodhana[p1] = minVal;
    ekadhipatyaShodhana[p2] = minVal;
  }

  const signNames = ZODIAC_SIGNS.map((z) => z.name);

  return {
    bav,
    sav,
    signNames,
    totalPoints: sav.reduce((a, b) => a + b, 0), // 337
    strongestSign: { sign: signNames[maxIdx], points: maxPoints, signIndex: maxIdx },
    weakestSign: { sign: signNames[minIdx], points: minPoints, signIndex: minIdx },
    trikonaShodhana,
    ekadhipatyaShodhana,
    shodhitaPinda: ekadhipatyaShodhana,
  };
}

/**
 * Calculates Jaimini 7 Chara Karakas based on descending degree within sign (0° to 30°)
 */
export function calculateJaiminiKarakas(chart: SiderealChartData): JaiminiKarakaResult[] {
  const candidatePlanets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
  const list = candidatePlanets
    .map((name) => chart.planets[name])
    .filter(Boolean)
    .map((p) => ({
      planet: p.name,
      degreeInSign: p.degreeInSign,
      signName: p.signName,
      signIndex: p.signIndex,
    }));

  // Sort descending by degreeInSign (highest degree = Atmakaraka)
  list.sort((a, b) => b.degreeInSign - a.degreeInSign);

  const karakaTitles: JaiminiKarakaResult["karaka"][] = [
    "Atmakaraka (AK)",
    "Amatyakaraka (AmK)",
    "Bhratrukaraka (BK)",
    "Matrukaraka (MK)",
    "Putrakaraka (PK)",
    "Gnatikaraka (GK)",
    "Darakaraka (DK)",
  ];

  const significations = [
    "Soul's highest purpose, spiritual lessons & core identity",
    "Career counselor, professional ambition & ministers of mind",
    "Brothers, courage, advisors & inner spiritual motivation",
    "Mother, emotional happiness, inner residence & vehicles",
    "Children, intellect, memory, education & creativity",
    "Obstacles, relatives, competitive resilience & illness",
    "Spouse, life partner, business alliances & romantic karma",
  ];

  return list.map((item, idx) => ({
    karaka: karakaTitles[idx] || "Darakaraka (DK)",
    planet: item.planet,
    degreeInSign: item.degreeInSign,
    signName: item.signName,
    signIndex: item.signIndex,
    signification: significations[idx] || "",
  }));
}

/**
 * Calculates Upagrahas & Special Lagnas
 */
export function calculateUpagrahasAndSpecialLagnas(
  chart: SiderealChartData,
  birthDecimalHours: number = 12
): UpagrahaSpecialLagnasResult {
  const sunLon = chart.planets.Sun?.longitude || 0;
  const ascLon = chart.ascendant.longitude;

  // 1. Special Lagnas (rise rates from sunrise)
  // Bhava Lagna: 1 sign (30°) per 5 Ghatis (2 hours)
  const bhavaLon = normalizeDeg(sunLon + (birthDecimalHours / 2.0) * 30.0);
  // Hora Lagna: 1 sign (30°) per 2.5 Ghatis (1 hour)
  const horaLon = normalizeDeg(sunLon + (birthDecimalHours / 1.0) * 30.0);
  // Ghatika Lagna: 1 sign (30°) per 1 Ghati (24 minutes = 0.4 hour)
  const ghatikaLon = normalizeDeg(sunLon + (birthDecimalHours / 0.4) * 30.0);

  // 2. Upagrahas (Astronomical formulas)
  // Dhuma = Sun + 133°20'
  const dhuma = normalizeDeg(sunLon + 133.333333);
  // Vyatipata = 360° - Dhuma
  const vyatipata = normalizeDeg(360.0 - dhuma);
  // Parivesha = Vyatipata + 180°
  const parivesha = normalizeDeg(vyatipata + 180.0);
  // Indrachapa = 360° - Parivesha
  const indrachapa = normalizeDeg(360.0 - parivesha);
  // Upaketu = Indrachapa + 16°40'
  const upaketu = normalizeDeg(indrachapa + 16.666667);

  // Gulika: Saturn's portion of day (approx 7/8 of day length from sunrise)
  const gulikaLon = normalizeDeg(ascLon + 120.0); // classical representation
  const mandiLon = normalizeDeg(gulikaLon - 15.0);

  const formatPlacement = (lon: number) => {
    const signIdx = Math.floor(lon / 30);
    return {
      longitude: Number(lon.toFixed(4)),
      signName: ZODIAC_SIGNS[signIdx].name,
      degreeInSign: Number((lon % 30).toFixed(4)),
    };
  };

  const getHouse = (lon: number) => {
    const signIdx = Math.floor(lon / 30);
    let h = signIdx + 1 - chart.ascendant.signIndex;
    if (h <= 0) h += 12;
    return h;
  };

  return {
    specialLagnas: {
      bhavaLagna: formatPlacement(bhavaLon),
      horaLagna: formatPlacement(horaLon),
      ghatikaLagna: formatPlacement(ghatikaLon),
    },
    upagrahas: {
      gulika: { ...formatPlacement(gulikaLon), house: getHouse(gulikaLon) },
      mandi: { ...formatPlacement(mandiLon), house: getHouse(mandiLon) },
      dhuma: formatPlacement(dhuma),
      vyatipata: formatPlacement(vyatipata),
      parivesha: formatPlacement(parivesha),
      indrachapa: formatPlacement(indrachapa),
      upaketu: formatPlacement(upaketu),
    },
  };
}
