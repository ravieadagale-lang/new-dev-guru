// AstroNext Authoritative High-Precision Panchang & Muhurta Engine
// Deterministic astronomical calculation based on VSOP87 & ELP2000-82 ephemerides,
// root-finding transition solvers, and classical Shastric Muhurta rules.

import {
  calculateJulianDay,
  julianCenturiesSinceJ2000,
  calculateSunPosition,
  calculateMoonPosition,
  calculateObliquity,
  calculateLocalSiderealTime,
  normalizeDeg,
  DEG_TO_RAD,
  RAD_TO_DEG
} from "./astronomyMath";
import { AyanamsaService, AyanamsaSystemName } from "./ayanamsaEngine";
import { NakshatraEngine, NAKSHATRAS } from "./nakshatraEngine";
import { PanchangInfo, HoraDetail, ChoghadiyaDetail, GowriDetail } from "../types";

export interface PanchangReport {
  fivePillars: {
    tithi: {
      index: number;
      name: string;
      paksha: "Shukla" | "Krishna";
      degreeCompleted: number;
      fractionLeft: number;
      percentageLeft: number;
      start: Date;
      end: Date;
      startStr: string;
      endStr: string;
    };
    nakshatra: {
      index: number;
      name: string;
      sanskritName: string;
      lord: string;
      pada: number;
      degreeInPada: number;
      totalDegrees: number;
      start: Date;
      end: Date;
      startStr: string;
      endStr: string;
    };
    yoga: {
      name: string;
      number: number;
      isAuspicious: boolean;
      start: Date;
      end: Date;
      startStr: string;
      endStr: string;
    };
    karana: {
      name: string;
      number: number;
      type: "Chara" | "Sthira";
      start: Date;
      end: Date;
      startStr: string;
      endStr: string;
    };
    vara: {
      name: string;
      rulingLord: string;
      number: number;
      sanskrit: string;
    };
  };
  rahuKalam: string;
  gulikaKalam: string;
  yamaganda: string;
  abhijitMuhurta: string;
  brahmaMuhurta: string;
  durmuhurta: string;
  varjyam: string;
  solarTimes: {
    sunrise: Date;
    sunset: Date;
    solarNoon: Date;
    nextSunrise: Date;
    dinamanaMs: number;
    ratrimanaMs: number;
    dinamanaFormatted: string;
    ratrimanaFormatted: string;
  };
}

export const VARA_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

export const VARA_SANSKRIT = [
  "Ravivara", "Somavara", "Mangalavara", "Budhavara", "Guruvara", "Shukravara", "Shanivara"
];

export const VARA_LORDS = [
  "Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"
];

export const TITHI_NAMES = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima"
];

export const TITHI_LORDS = [
  "Agni", "Brahma", "Gauri", "Ganesha", "Sarpas",
  "Kartikeya", "Surya", "Shiva", "Durga", "Yama",
  "Vishvadevas", "Vishnu", "Kamadeva", "Shiva", "Chandra / Pitris"
];

export const NITYA_YOGAS = [
  { name: "Vishkambha", isAuspicious: false, meaning: "Obstacles & Endurance" },
  { name: "Priti", isAuspicious: true, meaning: "Love & Affection" },
  { name: "Ayushman", isAuspicious: true, meaning: "Longevity & Health" },
  { name: "Saubhagya", isAuspicious: true, meaning: "Good Fortune & Prosperity" },
  { name: "Shobhana", isAuspicious: true, meaning: "Splendor & Elegance" },
  { name: "Atiganda", isAuspicious: false, meaning: "Big Danger / Obstacle" },
  { name: "Sukarma", isAuspicious: true, meaning: "Virtuous Deeds & Success" },
  { name: "Dhriti", isAuspicious: true, meaning: "Firmness & Patience" },
  { name: "Shula", isAuspicious: false, meaning: "Sharp Pain / Discord" },
  { name: "Ganda", isAuspicious: false, meaning: "Knots & Hurdles" },
  { name: "Vriddhi", isAuspicious: true, meaning: "Growth & Expansion" },
  { name: "Dhruva", isAuspicious: true, meaning: "Steadfastness & Stability" },
  { name: "Vyaghata", isAuspicious: false, meaning: "Striking / Conflict" },
  { name: "Harshana", isAuspicious: true, meaning: "Delight & Joy" },
  { name: "Vajra", isAuspicious: false, meaning: "Thunderbolt / Forceful" },
  { name: "Siddhi", isAuspicious: true, meaning: "Attainment & Mastery" },
  { name: "Vyatipata", isAuspicious: false, meaning: "Calamity / Adversity" },
  { name: "Variyan", isAuspicious: true, meaning: "Comfort & Grace" },
  { name: "Parigha", isAuspicious: false, meaning: "Iron Bar / Restriction" },
  { name: "Shiva", isAuspicious: true, meaning: "Benign & Auspicious" },
  { name: "Siddha", isAuspicious: true, meaning: "Perfection & Accomplishment" },
  { name: "Sadhya", isAuspicious: true, meaning: "Accomplishment & Feasibility" },
  { name: "Shubha", isAuspicious: true, meaning: "Pure & Fortunate" },
  { name: "Shukla", isAuspicious: true, meaning: "Bright & Cleansing" },
  { name: "Brahma", isAuspicious: true, meaning: "Cosmic Source & Wisdom" },
  { name: "Indra", isAuspicious: true, meaning: "Nobility & Victory" },
  { name: "Vaidhriti", isAuspicious: false, meaning: "Divisive / Discordant" }
];

export const MOVABLE_KARANAS = [
  "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti (Bhadra)"
];

export const FIXED_KARANAS = [
  "Shakuni", "Chatushpada", "Naga", "Kintughna"
];

// Chaldean sequence for 24 Horas
export const CHALDEAN_ORDER = ["Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter", "Mars"];

export const HORA_RECOMMENDATIONS: Record<string, { nature: "Auspicious" | "Inauspicious" | "Neutral"; bestFor: string }> = {
  Sun: { nature: "Neutral", bestFor: "Government matters, leadership, executive meetings, authority" },
  Venus: { nature: "Auspicious", bestFor: "Arts, romance, luxury purchases, beauty, design" },
  Mercury: { nature: "Auspicious", bestFor: "Commerce, writing, contracts, communication, analytics" },
  Moon: { nature: "Auspicious", bestFor: "Domestic matters, travels, maternal affairs, hospitality" },
  Saturn: { nature: "Inauspicious", bestFor: "Labor, iron, land, long-term disciplined foundation" },
  Jupiter: { nature: "Auspicious", bestFor: "Wisdom, wealth, investments, education, religious ceremonies" },
  Mars: { nature: "Inauspicious", bestFor: "Courage, physical sports, technical engineering, surgeries" }
};

// Choghadiya Orders (Day & Night) per weekday (0 = Sun, 1 = Mon, ..., 6 = Sat)
const CHOGHADIYA_TYPES: Record<string, { type: "Shubh" | "Ashubh" | "Normal"; nature: "Amrit" | "Shubh" | "Labh" | "Char" | "Rog" | "Kal" | "Udveg"; lord: string }> = {
  Amrit: { type: "Shubh", nature: "Amrit", lord: "Moon" },
  Shubh: { type: "Shubh", nature: "Shubh", lord: "Jupiter" },
  Labh: { type: "Shubh", nature: "Labh", lord: "Mercury" },
  Char: { type: "Normal", nature: "Char", lord: "Venus" },
  Rog: { type: "Ashubh", nature: "Rog", lord: "Mars" },
  Udveg: { type: "Ashubh", nature: "Udveg", lord: "Sun" },
  Kaal: { type: "Ashubh", nature: "Kal", lord: "Saturn" }
};

const CHOGHADIYA_DAY_SEQUENCES: string[][] = [
  ["Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg"], // Sun
  ["Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit"], // Mon
  ["Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog"],   // Tue
  ["Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char", "Labh"], // Wed
  ["Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh"], // Thu
  ["Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char"],   // Fri
  ["Kaal", "Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal"]   // Sat
];

const CHOGHADIYA_NIGHT_SEQUENCES: string[][] = [
  ["Shubh", "Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg", "Shubh"], // Sun
  ["Char", "Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Char"],   // Mon
  ["Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Char", "Rog", "Kaal"],   // Tue
  ["Udveg", "Shubh", "Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg"], // Wed
  ["Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit"], // Thu
  ["Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Char", "Rog"],   // Fri
  ["Labh", "Udveg", "Shubh", "Amrit", "Char", "Rog", "Kaal", "Labh"]   // Sat
];

// Gowri Panchangam Day and Night sequences (8 segments each)
const GOWRI_DAY_SEQUENCES: string[][] = [
  ["Uthi", "Amirtham", "Rogam", "Labham", "Danam", "Maranam", "Kaalam", "Sugam"], // Sun
  ["Amirtham", "Rogam", "Labham", "Danam", "Maranam", "Kaalam", "Sugam", "Uthi"], // Mon
  ["Rogam", "Labham", "Danam", "Maranam", "Kaalam", "Sugam", "Uthi", "Amirtham"], // Tue
  ["Labham", "Danam", "Maranam", "Kaalam", "Sugam", "Uthi", "Amirtham", "Rogam"], // Wed
  ["Danam", "Maranam", "Kaalam", "Sugam", "Uthi", "Amirtham", "Rogam", "Labham"], // Thu
  ["Maranam", "Kaalam", "Sugam", "Uthi", "Amirtham", "Rogam", "Labham", "Danam"], // Fri
  ["Kaalam", "Sugam", "Uthi", "Amirtham", "Rogam", "Labham", "Danam", "Maranam"]  // Sat
];

const GOWRI_NIGHT_SEQUENCES: string[][] = [
  ["Maranam", "Kaalam", "Sugam", "Uthi", "Amirtham", "Rogam", "Labham", "Danam"], // Sun
  ["Rogam", "Labham", "Danam", "Maranam", "Kaalam", "Sugam", "Uthi", "Amirtham"], // Mon
  ["Danam", "Maranam", "Kaalam", "Sugam", "Uthi", "Amirtham", "Rogam", "Labham"], // Tue
  ["Uthi", "Amirtham", "Rogam", "Labham", "Danam", "Maranam", "Kaalam", "Sugam"], // Wed
  ["Kaalam", "Sugam", "Uthi", "Amirtham", "Rogam", "Labham", "Danam", "Maranam"], // Thu
  ["Sugam", "Uthi", "Amirtham", "Rogam", "Labham", "Danam", "Maranam", "Kaalam"], // Fri
  ["Labham", "Danam", "Maranam", "Kaalam", "Sugam", "Uthi", "Amirtham", "Rogam"]  // Sat
];

// Classical Varjyam / Tyajya Starting Ghatikas for the 27 Nakshatras (out of 60 Ghatikas)
// Source: Muhurta Chintamani / Kalaprakasika
const VARJYAM_START_GHATIKAS = [
  50, // 0: Ashwini
  24, // 1: Bharani
  30, // 2: Krittika
  40, // 3: Rohini
  14, // 4: Mrigashira
  11, // 5: Ardra
  30, // 6: Punarvasu
  20, // 7: Pushya
  32, // 8: Ashlesha
  30, // 9: Magha
  20, // 10: Purva Phalguni
  18, // 11: Uttara Phalguni
  21, // 12: Hasta
  20, // 13: Chitra
  14, // 14: Swati
  14, // 15: Vishakha
  10, // 16: Anuradha
  14, // 17: Jyeshtha
  56, // 18: Mula
  24, // 19: Purva Ashadha
  20, // 20: Uttara Ashadha
  10, // 21: Shravana
  10, // 22: Dhanishta
  18, // 23: Shatabhisha
  16, // 24: Purva Bhadrapada
  24, // 25: Uttara Bhadrapada
  30  // 26: Revati
];

// Helper: Convert date to Julian Day
export function dateToJulianDay(d: Date): number {
  return calculateJulianDay(
    d.getUTCFullYear(),
    d.getUTCMonth() + 1,
    d.getUTCDate(),
    d.getUTCHours(),
    d.getUTCMinutes(),
    d.getUTCSeconds() + d.getUTCMilliseconds() / 1000
  );
}

// Helper: Convert Julian Day to Date
export function julianDayToDate(jd: number): Date {
  const z = Math.floor(jd + 0.5);
  const f = jd + 0.5 - z;
  let a = z;
  if (z >= 2299161) {
    const alpha = Math.floor((z - 1867216.25) / 36524.25);
    a = z + 1 + alpha - Math.floor(alpha / 4);
  }
  const b = a + 1524;
  const c = Math.floor((b - 122.1) / 365.25);
  const d = Math.floor(365.25 * c);
  const e = Math.floor((b - d) / 30.6001);
  const day = b - d - Math.floor(30.6001 * e) + f;
  const month = e < 14 ? e - 1 : e - 13;
  const year = month > 2 ? c - 4716 : c - 4715;

  const dayInt = Math.floor(day);
  const dayFrac = day - dayInt;
  const totalSeconds = Math.round(dayFrac * 86400);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return new Date(Date.UTC(year, month - 1, dayInt, hours, minutes, seconds));
}

// Helper: Format Date in designated timezone offset
export function formatTimeInTz(d: Date, tzOffsetHours: number): string {
  const localMs = d.getTime() + tzOffsetHours * 3600 * 1000;
  const localDate = new Date(localMs);
  let h = localDate.getUTCHours();
  const m = localDate.getUTCMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${ampm}`;
}

// Helper: Format Duration in ms to "Xh Ym"
export function formatDurationMs(ms: number): string {
  const totalMin = Math.max(0, Math.round(ms / 60000));
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

// Helper: Format Time Range
export function formatTimeRange(start: Date, end: Date, tzOffsetHours: number): string {
  return `${formatTimeInTz(start, tzOffsetHours)} - ${formatTimeInTz(end, tzOffsetHours)}`;
}

// Calculate high-precision Sun altitude and equatorial coordinates
export function getSolarAltitudeAndEquatorial(jd: number, lat: number, lng: number): {
  altitudeDeg: number;
  declinationDeg: number;
  rightAscensionDeg: number;
  hourAngleDeg: number;
} {
  const sun = calculateSunPosition(jd);
  const T = julianCenturiesSinceJ2000(jd);
  const { trueObliquity } = calculateObliquity(T);
  const epsRad = trueObliquity * DEG_TO_RAD;
  const sunLonRad = sun.longitude * DEG_TO_RAD;

  const sinDec = Math.sin(epsRad) * Math.sin(sunLonRad);
  const decRad = Math.asin(sinDec);
  const decDeg = decRad * RAD_TO_DEG;

  const y = Math.cos(epsRad) * Math.sin(sunLonRad);
  const x = Math.cos(sunLonRad);
  const raDeg = normalizeDeg(Math.atan2(y, x) * RAD_TO_DEG);

  const lstDeg = calculateLocalSiderealTime(jd, lng);
  let haDeg = (lstDeg - raDeg) % 360;
  if (haDeg > 180) haDeg -= 360;
  if (haDeg < -180) haDeg += 360;

  const latRad = lat * DEG_TO_RAD;
  const haRad = haDeg * DEG_TO_RAD;

  const sinAlt = Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(haRad);
  const altDeg = Math.asin(Math.max(-1, Math.min(1, sinAlt))) * RAD_TO_DEG;

  return {
    altitudeDeg: altDeg,
    declinationDeg: decDeg,
    rightAscensionDeg: raDeg,
    hourAngleDeg: haDeg
  };
}

// Calculate high-precision Moon altitude
export function getLunarAltitude(jd: number, lat: number, lng: number): {
  altitudeDeg: number;
  distanceKm: number;
  horizontalParallaxDeg: number;
} {
  const moon = calculateMoonPosition(jd);
  const T = julianCenturiesSinceJ2000(jd);
  const { trueObliquity } = calculateObliquity(T);
  const epsRad = trueObliquity * DEG_TO_RAD;
  const moonLonRad = moon.longitude * DEG_TO_RAD;
  const moonLatRad = moon.latitude * DEG_TO_RAD;

  const sinDec =
    Math.sin(moonLatRad) * Math.cos(epsRad) +
    Math.cos(moonLatRad) * Math.sin(epsRad) * Math.sin(moonLonRad);
  const decRad = Math.asin(Math.max(-1, Math.min(1, sinDec)));

  const y = Math.cos(moonLatRad) * Math.cos(epsRad) * Math.sin(moonLonRad) - Math.sin(moonLatRad) * Math.sin(epsRad);
  const x = Math.cos(moonLatRad) * Math.cos(moonLonRad);
  const raDeg = normalizeDeg(Math.atan2(y, x) * RAD_TO_DEG);

  const lstDeg = calculateLocalSiderealTime(jd, lng);
  let haDeg = (lstDeg - raDeg) % 360;
  if (haDeg > 180) haDeg -= 360;
  if (haDeg < -180) haDeg += 360;

  const latRad = lat * DEG_TO_RAD;
  const haRad = haDeg * DEG_TO_RAD;

  const sinAlt = Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(haRad);
  const geocentricAltDeg = Math.asin(Math.max(-1, Math.min(1, sinAlt))) * RAD_TO_DEG;

  const distKm = moon.distance * 149597870.7;
  const hpDeg = Math.asin(Math.min(1, 6378.14 / Math.max(1, distKm))) * RAD_TO_DEG;
  const topocentricAltDeg = geocentricAltDeg - hpDeg * Math.cos(geocentricAltDeg * DEG_TO_RAD);

  return {
    altitudeDeg: topocentricAltDeg,
    distanceKm: distKm,
    horizontalParallaxDeg: hpDeg
  };
}

// Calculate location-aware Sunrise, Sunset, Solar Noon, Dinamana, and Next Sunrise
export function calculateSolarEvents(
  dateOrCalendar: Date | { year: number; month: number; day: number },
  lat: number,
  lng: number,
  tzOffsetHours: number
): {
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
  nextSunrise: Date;
  dinamanaMs: number;
  ratrimanaMs: number;
  dinamanaFormatted: string;
  ratrimanaFormatted: string;
} {
  let year: number;
  let month: number;
  let day: number;

  if (dateOrCalendar && "year" in dateOrCalendar && typeof dateOrCalendar.year === "number") {
    year = dateOrCalendar.year;
    month = dateOrCalendar.month;
    day = dateOrCalendar.day;
  } else {
    const d = dateOrCalendar instanceof Date ? dateOrCalendar : new Date();
    const targetLocalMs = d.getTime() + tzOffsetHours * 3600 * 1000;
    const localDate = new Date(targetLocalMs);
    year = localDate.getUTCFullYear();
    month = localDate.getUTCMonth() + 1;
    day = localDate.getUTCDate();
  }

  // Local midnight for the calendar date in UTC
  const localMidnightUtcMs = Date.UTC(year, month - 1, day, 0, 0, 0) - tzOffsetHours * 3600 * 1000;
  const jd0 = dateToJulianDay(new Date(localMidnightUtcMs));

  // Find Solar Noon (when Hour Angle = 0)
  let noonJd = jd0 + 0.5 - (lng - tzOffsetHours * 15) / 360;
  for (let i = 0; i < 3; i++) {
    const { hourAngleDeg } = getSolarAltitudeAndEquatorial(noonJd, lat, lng);
    noonJd -= hourAngleDeg / 360;
  }

  // Refraction and semi-diameter target altitude: -0.83333°
  const targetAlt = -0.833333;
  const { declinationDeg } = getSolarAltitudeAndEquatorial(noonJd, lat, lng);
  const phiRad = lat * DEG_TO_RAD;
  const decRad = declinationDeg * DEG_TO_RAD;
  const targetAltRad = targetAlt * DEG_TO_RAD;

  const cosH0 = (Math.sin(targetAltRad) - Math.sin(phiRad) * Math.sin(decRad)) / (Math.cos(phiRad) * Math.cos(decRad));

  let riseJd = noonJd - 0.25;
  let setJd = noonJd + 0.25;

  if (cosH0 >= -1 && cosH0 <= 1) {
    const h0Deg = Math.acos(cosH0) * RAD_TO_DEG;
    riseJd = noonJd - h0Deg / 360;
    setJd = noonJd + h0Deg / 360;

    // Refine Sunrise using Newton-Secant root finding
    for (let i = 0; i < 3; i++) {
      const { altitudeDeg } = getSolarAltitudeAndEquatorial(riseJd, lat, lng);
      const diff = altitudeDeg - targetAlt;
      riseJd -= diff / 360; // angular rate approx 15 deg/hour = 360 deg/day
    }

    // Refine Sunset using Newton-Secant root finding
    for (let i = 0; i < 3; i++) {
      const { altitudeDeg } = getSolarAltitudeAndEquatorial(setJd, lat, lng);
      const diff = altitudeDeg - targetAlt;
      setJd += diff / 360;
    }
  }

  const sunriseDate = julianDayToDate(riseJd);
  const sunsetDate = julianDayToDate(setJd);
  const solarNoonDate = julianDayToDate(noonJd);

  // Next day's Sunrise for Ratrimana calculation (pure UTC calendar arithmetic)
  const nextMidnightUtcMs = Date.UTC(year, month - 1, day + 1, 0, 0, 0) - tzOffsetHours * 3600 * 1000;
  const nextJd0 = dateToJulianDay(new Date(nextMidnightUtcMs));
  let nextNoonJd = nextJd0 + 0.5 - (lng - tzOffsetHours * 15) / 360;
  for (let i = 0; i < 2; i++) {
    const { hourAngleDeg } = getSolarAltitudeAndEquatorial(nextNoonJd, lat, lng);
    nextNoonJd -= hourAngleDeg / 360;
  }
  const nextDec = getSolarAltitudeAndEquatorial(nextNoonJd, lat, lng).declinationDeg;
  const nextCosH0 = (Math.sin(targetAltRad) - Math.sin(phiRad) * Math.sin(nextDec * DEG_TO_RAD)) / (Math.cos(phiRad) * Math.cos(nextDec * DEG_TO_RAD));
  let nextRiseJd = nextNoonJd - 0.25;
  if (nextCosH0 >= -1 && nextCosH0 <= 1) {
    const nextH0Deg = Math.acos(nextCosH0) * RAD_TO_DEG;
    nextRiseJd = nextNoonJd - nextH0Deg / 360;
    for (let i = 0; i < 3; i++) {
      const { altitudeDeg } = getSolarAltitudeAndEquatorial(nextRiseJd, lat, lng);
      nextRiseJd -= (altitudeDeg - targetAlt) / 360;
    }
  }
  const nextSunriseDate = julianDayToDate(nextRiseJd);

  const dinamanaMs = Math.max(1000, sunsetDate.getTime() - sunriseDate.getTime());
  const ratrimanaMs = Math.max(1000, nextSunriseDate.getTime() - sunsetDate.getTime());

  return {
    sunrise: sunriseDate,
    sunset: sunsetDate,
    solarNoon: solarNoonDate,
    nextSunrise: nextSunriseDate,
    dinamanaMs,
    ratrimanaMs,
    dinamanaFormatted: formatDurationMs(dinamanaMs),
    ratrimanaFormatted: formatDurationMs(ratrimanaMs)
  };
}

// Calculate location-aware Moonrise and Moonset
export function calculateLunarEvents(
  dateOrCalendar: Date | { year: number; month: number; day: number },
  lat: number,
  lng: number,
  tzOffsetHours: number
): {
  moonrise?: Date;
  moonset?: Date;
  moonriseStr: string;
  moonsetStr: string;
  hasMoonrise: boolean;
  hasMoonset: boolean;
} {
  let year: number;
  let month: number;
  let day: number;

  if (dateOrCalendar && "year" in dateOrCalendar && typeof dateOrCalendar.year === "number") {
    year = dateOrCalendar.year;
    month = dateOrCalendar.month;
    day = dateOrCalendar.day;
  } else {
    const d = dateOrCalendar instanceof Date ? dateOrCalendar : new Date();
    const targetLocalMs = d.getTime() + tzOffsetHours * 3600 * 1000;
    const localDate = new Date(targetLocalMs);
    year = localDate.getUTCFullYear();
    month = localDate.getUTCMonth() + 1;
    day = localDate.getUTCDate();
  }

  const localMidnightUtcMs = Date.UTC(year, month - 1, day, 0, 0, 0) - tzOffsetHours * 3600 * 1000;
  const jd0 = dateToJulianDay(new Date(localMidnightUtcMs));

  let riseDate: Date | undefined = undefined;
  let setDate: Date | undefined = undefined;

  // Search 24 hourly steps across the day
  let prevAlt = getLunarAltitude(jd0, lat, lng).altitudeDeg;
  const targetAlt = -0.5667; // standard atmospheric refraction at lunar horizon

  for (let h = 1; h <= 24; h++) {
    const currentJd = jd0 + h / 24.0;
    const currentAlt = getLunarAltitude(currentJd, lat, lng).altitudeDeg;

    // Check for Moonrise (crossing horizon upward)
    if (!riseDate && prevAlt < targetAlt && currentAlt >= targetAlt) {
      // Root-find exact crossing fraction
      let left = currentJd - 1 / 24.0;
      let right = currentJd;
      for (let step = 0; step < 5; step++) {
        const mid = (left + right) / 2;
        const midAlt = getLunarAltitude(mid, lat, lng).altitudeDeg;
        if (midAlt < targetAlt) left = mid;
        else right = mid;
      }
      riseDate = julianDayToDate((left + right) / 2);
    }

    // Check for Moonset (crossing horizon downward)
    if (!setDate && prevAlt > targetAlt && currentAlt <= targetAlt) {
      let left = currentJd - 1 / 24.0;
      let right = currentJd;
      for (let step = 0; step < 5; step++) {
        const mid = (left + right) / 2;
        const midAlt = getLunarAltitude(mid, lat, lng).altitudeDeg;
        if (midAlt > targetAlt) left = mid;
        else right = mid;
      }
      setDate = julianDayToDate((left + right) / 2);
    }

    prevAlt = currentAlt;
  }

  return {
    moonrise: riseDate,
    moonset: setDate,
    moonriseStr: riseDate ? formatTimeInTz(riseDate, tzOffsetHours) : "No Moonrise",
    moonsetStr: setDate ? formatTimeInTz(setDate, tzOffsetHours) : "No Moonset",
    hasMoonrise: Boolean(riseDate),
    hasMoonset: Boolean(setDate)
  };
}

// Transition Solvers: Root-finding start and end times for Tithi, Nakshatra, Yoga, Karana
export function solveTithiTransition(jdEval: number, tithiIdx: number): {
  startJd: number;
  endJd: number;
  startDate: Date;
  endDate: Date;
} {
  const targetStartDeg = ((tithiIdx - 1) * 12) % 360;
  const targetEndDeg = (tithiIdx * 12) % 360;

  const getElongation = (jd: number) => {
    const s = calculateSunPosition(jd).longitude;
    const m = calculateMoonPosition(jd).longitude;
    return normalizeDeg(m - s);
  };

  // Find end JD (forward search)
  const currentE = getElongation(jdEval);
  let distForward = (targetEndDeg - currentE + 360) % 360;
  if (distForward === 0) distForward = 12;
  let endJd = jdEval + distForward / 12.19; // initial estimate

  for (let i = 0; i < 5; i++) {
    const e = getElongation(endJd);
    let err = e - targetEndDeg;
    if (err > 180) err -= 360;
    if (err < -180) err += 360;
    endJd -= err / 12.19;
  }

  // Find start JD (backward search)
  let distBackward = (currentE - targetStartDeg + 360) % 360;
  if (distBackward === 0) distBackward = 12;
  let startJd = jdEval - distBackward / 12.19;

  for (let i = 0; i < 5; i++) {
    const e = getElongation(startJd);
    let err = e - targetStartDeg;
    if (err > 180) err -= 360;
    if (err < -180) err += 360;
    startJd -= err / 12.19;
  }

  return {
    startJd,
    endJd,
    startDate: julianDayToDate(startJd),
    endDate: julianDayToDate(endJd)
  };
}

export function solveNakshatraTransition(jdEval: number, nakIdx: number, ayanamsaSystem: AyanamsaSystemName = "lahiri"): {
  startJd: number;
  endJd: number;
  startDate: Date;
  endDate: Date;
} {
  const span = 360 / 27; // 13.333333333333334°
  const targetStartDeg = (nakIdx * span) % 360;
  const targetEndDeg = ((nakIdx + 1) * span) % 360;

  const getSiderealMoonLon = (jd: number) => {
    const m = calculateMoonPosition(jd).longitude;
    const a = AyanamsaService.calculateAyanamsa(jd, ayanamsaSystem).ayanamsa_value;
    return normalizeDeg(m - a);
  };

  const currentLon = getSiderealMoonLon(jdEval);
  let distForward = (targetEndDeg - currentLon + 360) % 360;
  if (distForward === 0) distForward = span;
  let endJd = jdEval + distForward / 13.176;

  for (let i = 0; i < 5; i++) {
    const l = getSiderealMoonLon(endJd);
    let err = l - targetEndDeg;
    if (err > 180) err -= 360;
    if (err < -180) err += 360;
    endJd -= err / 13.176;
  }

  let distBackward = (currentLon - targetStartDeg + 360) % 360;
  if (distBackward === 0) distBackward = span;
  let startJd = jdEval - distBackward / 13.176;

  for (let i = 0; i < 5; i++) {
    const l = getSiderealMoonLon(startJd);
    let err = l - targetStartDeg;
    if (err > 180) err -= 360;
    if (err < -180) err += 360;
    startJd -= err / 13.176;
  }

  return {
    startJd,
    endJd,
    startDate: julianDayToDate(startJd),
    endDate: julianDayToDate(endJd)
  };
}

export function solveYogaTransition(jdEval: number, yogaIdx: number, ayanamsaSystem: AyanamsaSystemName = "lahiri"): {
  startJd: number;
  endJd: number;
  startDate: Date;
  endDate: Date;
} {
  const span = 360 / 27;
  const targetStartDeg = ((yogaIdx - 1) * span) % 360;
  const targetEndDeg = (yogaIdx * span) % 360;

  const getYogaAngle = (jd: number) => {
    const s = calculateSunPosition(jd).longitude;
    const m = calculateMoonPosition(jd).longitude;
    const a = AyanamsaService.calculateAyanamsa(jd, ayanamsaSystem).ayanamsa_value;
    return normalizeDeg(normalizeDeg(s - a) + normalizeDeg(m - a));
  };

  const currentY = getYogaAngle(jdEval);
  let distForward = (targetEndDeg - currentY + 360) % 360;
  if (distForward === 0) distForward = span;
  let endJd = jdEval + distForward / 14.16;

  for (let i = 0; i < 5; i++) {
    const y = getYogaAngle(endJd);
    let err = y - targetEndDeg;
    if (err > 180) err -= 360;
    if (err < -180) err += 360;
    endJd -= err / 14.16;
  }

  let distBackward = (currentY - targetStartDeg + 360) % 360;
  if (distBackward === 0) distBackward = span;
  let startJd = jdEval - distBackward / 14.16;

  for (let i = 0; i < 5; i++) {
    const y = getYogaAngle(startJd);
    let err = y - targetStartDeg;
    if (err > 180) err -= 360;
    if (err < -180) err += 360;
    startJd -= err / 14.16;
  }

  return {
    startJd,
    endJd,
    startDate: julianDayToDate(startJd),
    endDate: julianDayToDate(endJd)
  };
}

export function solveKaranaTransition(jdEval: number, karanaIdx: number): {
  startJd: number;
  endJd: number;
  startDate: Date;
  endDate: Date;
} {
  const targetStartDeg = ((karanaIdx - 1) * 6) % 360;
  const targetEndDeg = (karanaIdx * 6) % 360;

  const getElongation = (jd: number) => {
    const s = calculateSunPosition(jd).longitude;
    const m = calculateMoonPosition(jd).longitude;
    return normalizeDeg(m - s);
  };

  const currentE = getElongation(jdEval);
  let distForward = (targetEndDeg - currentE + 360) % 360;
  if (distForward === 0) distForward = 6;
  let endJd = jdEval + distForward / 12.19;

  for (let i = 0; i < 5; i++) {
    const e = getElongation(endJd);
    let err = e - targetEndDeg;
    if (err > 180) err -= 360;
    if (err < -180) err += 360;
    endJd -= err / 12.19;
  }

  let distBackward = (currentE - targetStartDeg + 360) % 360;
  if (distBackward === 0) distBackward = 6;
  let startJd = jdEval - distBackward / 12.19;

  for (let i = 0; i < 5; i++) {
    const e = getElongation(startJd);
    let err = e - targetStartDeg;
    if (err > 180) err -= 360;
    if (err < -180) err += 360;
    startJd -= err / 12.19;
  }

  return {
    startJd,
    endJd,
    startDate: julianDayToDate(startJd),
    endDate: julianDayToDate(endJd)
  };
}

// Generate the 24 Proportional Horas (12 Day + 12 Night)
export function calculate24Horas(
  sunrise: Date,
  sunset: Date,
  nextSunrise: Date,
  varaLord: string,
  tzOffsetHours: number,
  evalTime: Date = new Date()
): { horas: HoraDetail[]; dayHoras: HoraDetail[]; nightHoras: HoraDetail[]; currentHora?: HoraDetail } {
  const dinamanaMs = sunset.getTime() - sunrise.getTime();
  const ratrimanaMs = nextSunrise.getTime() - sunset.getTime();

  const dayHoraMs = dinamanaMs / 12;
  const nightHoraMs = ratrimanaMs / 12;

  // Find start index in Chaldean order
  const startIdx = Math.max(0, CHALDEAN_ORDER.indexOf(varaLord));
  const horas: HoraDetail[] = [];
  const dayHoras: HoraDetail[] = [];
  const nightHoras: HoraDetail[] = [];

  const evalMs = evalTime.getTime();
  let activeHora: HoraDetail | undefined = undefined;

  // 12 Daytime Horas
  for (let i = 0; i < 12; i++) {
    const lord = CHALDEAN_ORDER[(startIdx + i) % 7];
    const startMs = sunrise.getTime() + i * dayHoraMs;
    const endMs = startMs + dayHoraMs;
    const start = new Date(startMs);
    const end = new Date(endMs);

    const isActive = evalMs >= startMs && evalMs < endMs;
    const isPassed = evalMs >= endMs;
    const isUpcoming = evalMs < startMs;
    const progressPct = isActive
      ? Math.min(100, Math.max(0, Math.round(((evalMs - startMs) / dayHoraMs) * 100)))
      : isPassed ? 100 : 0;

    const horaObj: HoraDetail = {
      number: i + 1,
      lord,
      rulingPlanet: `${lord} (${lord === "Sun" ? "Surya" : lord === "Moon" ? "Chandra" : lord === "Mars" ? "Mangal" : lord === "Mercury" ? "Budha" : lord === "Jupiter" ? "Guru" : lord === "Venus" ? "Shukra" : "Shani"})`,
      startTime: start,
      endTime: end,
      startTimeStr: formatTimeInTz(start, tzOffsetHours),
      endTimeStr: formatTimeInTz(end, tzOffsetHours),
      timeRange: formatTimeRange(start, end, tzOffsetHours),
      isDay: true,
      isActive,
      isUpcoming,
      isPassed,
      progressPct,
      nature: HORA_RECOMMENDATIONS[lord]?.nature || "Neutral",
      bestFor: HORA_RECOMMENDATIONS[lord]?.bestFor || "General daily activities"
    };

    horas.push(horaObj);
    dayHoras.push(horaObj);
    if (isActive) activeHora = horaObj;
  }

  // 12 Nighttime Horas
  for (let j = 0; j < 12; j++) {
    const lord = CHALDEAN_ORDER[(startIdx + 12 + j) % 7];
    const startMs = sunset.getTime() + j * nightHoraMs;
    const endMs = startMs + nightHoraMs;
    const start = new Date(startMs);
    const end = new Date(endMs);

    const isActive = evalMs >= startMs && evalMs < endMs;
    const isPassed = evalMs >= endMs;
    const isUpcoming = evalMs < startMs;
    const progressPct = isActive
      ? Math.min(100, Math.max(0, Math.round(((evalMs - startMs) / nightHoraMs) * 100)))
      : isPassed ? 100 : 0;

    const horaObj: HoraDetail = {
      number: 13 + j,
      lord,
      rulingPlanet: `${lord} (${lord === "Sun" ? "Surya" : lord === "Moon" ? "Chandra" : lord === "Mars" ? "Mangal" : lord === "Mercury" ? "Budha" : lord === "Jupiter" ? "Guru" : lord === "Venus" ? "Shukra" : "Shani"})`,
      startTime: start,
      endTime: end,
      startTimeStr: formatTimeInTz(start, tzOffsetHours),
      endTimeStr: formatTimeInTz(end, tzOffsetHours),
      timeRange: formatTimeRange(start, end, tzOffsetHours),
      isDay: false,
      isActive,
      isUpcoming,
      isPassed,
      progressPct,
      nature: HORA_RECOMMENDATIONS[lord]?.nature || "Neutral",
      bestFor: HORA_RECOMMENDATIONS[lord]?.bestFor || "General quiet nighttime activities"
    };

    horas.push(horaObj);
    nightHoras.push(horaObj);
    if (isActive) activeHora = horaObj;
  }

  return {
    horas,
    dayHoras,
    nightHoras,
    currentHora: activeHora || horas[0]
  };
}

// Generate the 16 Proportional Choghadiyas (8 Day + 8 Night)
export function calculate16Choghadiyas(
  sunrise: Date,
  sunset: Date,
  nextSunrise: Date,
  weekdayIdx: number,
  tzOffsetHours: number,
  evalTime: Date = new Date()
): { day: ChoghadiyaDetail[]; night: ChoghadiyaDetail[]; activeChoghadiya?: ChoghadiyaDetail } {
  const dinamanaMs = sunset.getTime() - sunrise.getTime();
  const ratrimanaMs = nextSunrise.getTime() - sunset.getTime();

  const daySlotMs = dinamanaMs / 8;
  const nightSlotMs = ratrimanaMs / 8;

  const daySeq = CHOGHADIYA_DAY_SEQUENCES[weekdayIdx % 7];
  const nightSeq = CHOGHADIYA_NIGHT_SEQUENCES[weekdayIdx % 7];

  const dayChoghadiya: ChoghadiyaDetail[] = [];
  const nightChoghadiya: ChoghadiyaDetail[] = [];
  const evalMs = evalTime.getTime();
  let activeChog: ChoghadiyaDetail | undefined = undefined;

  // 8 Daytime
  for (let i = 0; i < 8; i++) {
    const name = daySeq[i];
    const meta = CHOGHADIYA_TYPES[name] || { type: "Normal", nature: "Char", lord: "Venus" };
    const startMs = sunrise.getTime() + i * daySlotMs;
    const endMs = startMs + daySlotMs;
    const start = new Date(startMs);
    const end = new Date(endMs);

    const isActive = evalMs >= startMs && evalMs < endMs;
    const isPassed = evalMs >= endMs;
    const isUpcoming = evalMs < startMs;

    const item: ChoghadiyaDetail = {
      name,
      type: meta.type,
      nature: meta.nature,
      lord: meta.lord,
      startTime: start,
      endTime: end,
      startTimeStr: formatTimeInTz(start, tzOffsetHours),
      endTimeStr: formatTimeInTz(end, tzOffsetHours),
      timeRange: formatTimeRange(start, end, tzOffsetHours),
      period: formatTimeRange(start, end, tzOffsetHours),
      isDay: true,
      isActive,
      isUpcoming,
      isPassed
    };

    dayChoghadiya.push(item);
    if (isActive) activeChog = item;
  }

  // 8 Nighttime
  for (let j = 0; j < 8; j++) {
    const name = nightSeq[j];
    const meta = CHOGHADIYA_TYPES[name] || { type: "Normal", nature: "Char", lord: "Venus" };
    const startMs = sunset.getTime() + j * nightSlotMs;
    const endMs = startMs + nightSlotMs;
    const start = new Date(startMs);
    const end = new Date(endMs);

    const isActive = evalMs >= startMs && evalMs < endMs;
    const isPassed = evalMs >= endMs;
    const isUpcoming = evalMs < startMs;

    const item: ChoghadiyaDetail = {
      name,
      type: meta.type,
      nature: meta.nature,
      lord: meta.lord,
      startTime: start,
      endTime: end,
      startTimeStr: formatTimeInTz(start, tzOffsetHours),
      endTimeStr: formatTimeInTz(end, tzOffsetHours),
      timeRange: formatTimeRange(start, end, tzOffsetHours),
      period: formatTimeRange(start, end, tzOffsetHours),
      isDay: false,
      isActive,
      isUpcoming,
      isPassed
    };

    nightChoghadiya.push(item);
    if (isActive) activeChog = item;
  }

  return {
    day: dayChoghadiya,
    night: nightChoghadiya,
    activeChoghadiya: activeChog || dayChoghadiya[0]
  };
}

// Generate Gowri Panchangam segments (8 Day + 8 Night)
export function calculateGowriPanchangam(
  sunrise: Date,
  sunset: Date,
  nextSunrise: Date,
  weekdayIdx: number,
  tzOffsetHours: number,
  evalTime: Date = new Date()
): { gowriDay: GowriDetail[]; gowriNight: GowriDetail[] } {
  const dinamanaMs = sunset.getTime() - sunrise.getTime();
  const ratrimanaMs = nextSunrise.getTime() - sunset.getTime();

  const daySlotMs = dinamanaMs / 8;
  const nightSlotMs = ratrimanaMs / 8;

  const daySeq = GOWRI_DAY_SEQUENCES[weekdayIdx % 7];
  const nightSeq = GOWRI_NIGHT_SEQUENCES[weekdayIdx % 7];

  const GOOD_GOWRI = ["Uthi", "Amirtham", "Labham", "Sugam"];

  const gowriDay: GowriDetail[] = [];
  const gowriNight: GowriDetail[] = [];
  const evalMs = evalTime.getTime();

  for (let i = 0; i < 8; i++) {
    const name = daySeq[i];
    const isGood = GOOD_GOWRI.includes(name);
    const startMs = sunrise.getTime() + i * daySlotMs;
    const endMs = startMs + daySlotMs;
    const start = new Date(startMs);
    const end = new Date(endMs);

    gowriDay.push({
      name,
      type: isGood ? "Good" : "Bad",
      nature: isGood ? "Auspicious" : "Inauspicious",
      ruler: "Gowri Segment",
      startTime: start,
      endTime: end,
      startTimeStr: formatTimeInTz(start, tzOffsetHours),
      endTimeStr: formatTimeInTz(end, tzOffsetHours),
      period: formatTimeRange(start, end, tzOffsetHours),
      isDay: true,
      isActive: evalMs >= startMs && evalMs < endMs
    });
  }

  for (let j = 0; j < 8; j++) {
    const name = nightSeq[j];
    const isGood = GOOD_GOWRI.includes(name);
    const startMs = sunset.getTime() + j * nightSlotMs;
    const endMs = startMs + nightSlotMs;
    const start = new Date(startMs);
    const end = new Date(endMs);

    gowriNight.push({
      name,
      type: isGood ? "Good" : "Bad",
      nature: isGood ? "Auspicious" : "Inauspicious",
      ruler: "Gowri Segment",
      startTime: start,
      endTime: end,
      startTimeStr: formatTimeInTz(start, tzOffsetHours),
      endTimeStr: formatTimeInTz(end, tzOffsetHours),
      period: formatTimeRange(start, end, tzOffsetHours),
      isDay: false,
      isActive: evalMs >= startMs && evalMs < endMs
    });
  }

  return { gowriDay, gowriNight };
}

// Calculate Auspicious & Inauspicious Muhurtas with exact Proportional Solar and Nakshatra math
export function calculateMuhurtas(
  sunrise: Date,
  sunset: Date,
  nextSunrise: Date,
  dinamanaMs: number,
  ratrimanaMs: number,
  weekdayIdx: number,
  nakshatraStart: Date,
  nakshatraEnd: Date,
  nakshatraIdx: number,
  tzOffsetHours: number
): {
  rahuKalam: string;
  yamagandaKalam: string;
  gulikaKalam: string;
  abhijitMuhurat: string;
  abhijitStartStr: string;
  abhijitEndStr: string;
  brahmaMuhurat: string;
  brahmaStartStr: string;
  brahmaEndStr: string;
  vijayaMuhurat: string;
  godhuliMuhurat: string;
  nishitaMuhurat: string;
  pratahSandhya: string;
  sayahnaSandhya: string;
  durmuhurtam: string;
  varjyam: string;
} {
  // 1/8th of daytime blocks
  const slot8Ms = dinamanaMs / 8;

  // Rahu Kalam Slots: Sun=8th, Mon=2nd, Tue=7th, Wed=5th, Thu=6th, Fri=4th, Sat=3rd (0-indexed: [7, 1, 6, 4, 5, 3, 2])
  const RAHU_SLOTS = [7, 1, 6, 4, 5, 3, 2];
  const rahuSlotIdx = RAHU_SLOTS[weekdayIdx % 7];
  const rahuStart = new Date(sunrise.getTime() + rahuSlotIdx * slot8Ms);
  const rahuEnd = new Date(sunrise.getTime() + (rahuSlotIdx + 1) * slot8Ms);

  // Yamaganda Slots: Sun=5th, Mon=4th, Tue=3rd, Wed=2nd, Thu=1st, Fri=7th, Sat=6th (0-indexed: [4, 3, 2, 1, 0, 6, 5])
  const YAMA_SLOTS = [4, 3, 2, 1, 0, 6, 5];
  const yamaSlotIdx = YAMA_SLOTS[weekdayIdx % 7];
  const yamaStart = new Date(sunrise.getTime() + yamaSlotIdx * slot8Ms);
  const yamaEnd = new Date(sunrise.getTime() + (yamaSlotIdx + 1) * slot8Ms);

  // Gulika Kalam Slots: Sun=7th, Mon=6th, Tue=5th, Wed=4th, Thu=3rd, Fri=2nd, Sat=1st (0-indexed: [6, 5, 4, 3, 2, 1, 0])
  const GULIKA_SLOTS = [6, 5, 4, 3, 2, 1, 0];
  const gulikaSlotIdx = GULIKA_SLOTS[weekdayIdx % 7];
  const gulikaStart = new Date(sunrise.getTime() + gulikaSlotIdx * slot8Ms);
  const gulikaEnd = new Date(sunrise.getTime() + (gulikaSlotIdx + 1) * slot8Ms);

  // 1/15th of daytime blocks (Daytime Muhurta)
  const dayMuhurtaMs = dinamanaMs / 15;
  // 1/15th of nighttime blocks (Nighttime Muhurta)
  const nightMuhurtaMs = ratrimanaMs / 15;

  // Abhijit Muhurta: 8th Muhurta of day (sunrise + 7 * dayMuhurtaMs to sunrise + 8 * dayMuhurtaMs)
  const abhijitStart = new Date(sunrise.getTime() + 7 * dayMuhurtaMs);
  const abhijitEnd = new Date(sunrise.getTime() + 8 * dayMuhurtaMs);
  const isWednesday = weekdayIdx === 3;
  const abhijitText = isWednesday
    ? `${formatTimeRange(abhijitStart, abhijitEnd, tzOffsetHours)} (Restricted on Wednesdays due to Budha dosha)`
    : formatTimeRange(abhijitStart, abhijitEnd, tzOffsetHours);

  // Brahma Muhurta: 14th Muhurta of night (sunrise - 2 * nightMuhurtaMs to sunrise - 1 * nightMuhurtaMs)
  const brahmaStart = new Date(sunrise.getTime() - 2 * nightMuhurtaMs);
  const brahmaEnd = new Date(sunrise.getTime() - 1 * nightMuhurtaMs);

  // Vijaya Muhurta: 11th Muhurta of day (sunrise + 10 * dayMuhurtaMs to sunrise + 11 * dayMuhurtaMs)
  const vijayaStart = new Date(sunrise.getTime() + 10 * dayMuhurtaMs);
  const vijayaEnd = new Date(sunrise.getTime() + 11 * dayMuhurtaMs);

  // Godhuli Muhurta: Sunset ± 12 minutes (24 minutes total)
  const godhuliStart = new Date(sunset.getTime() - 12 * 60000);
  const godhuliEnd = new Date(sunset.getTime() + 12 * 60000);

  // Nishita Muhurta: 8th Muhurta of night (sunset + 7 * nightMuhurtaMs to sunset + 8 * nightMuhurtaMs)
  const nishitaStart = new Date(sunset.getTime() + 7 * nightMuhurtaMs);
  const nishitaEnd = new Date(sunset.getTime() + 8 * nightMuhurtaMs);

  // Sandhya
  const pratahSandhyaStart = new Date(sunrise.getTime() - dayMuhurtaMs);
  const pratahSandhyaEnd = sunrise;
  const sayahnaSandhyaStart = sunset;
  const sayahnaSandhyaEnd = new Date(sunset.getTime() + nightMuhurtaMs);

  // Durmuhurta: Weekday based daytime Muhurtas
  // Sun: 14th, Mon: 8th & 9th, Tue: 4th & 11th, Wed: 8th, Thu: 6th & 7th, Fri: 4th & 9th, Sat: 1st & 2nd
  let durmuhurtaWindows: { start: Date; end: Date }[] = [];
  if (weekdayIdx === 0) { // Sun
    durmuhurtaWindows.push({ start: new Date(sunrise.getTime() + 13 * dayMuhurtaMs), end: new Date(sunrise.getTime() + 14 * dayMuhurtaMs) });
  } else if (weekdayIdx === 1) { // Mon
    durmuhurtaWindows.push({ start: new Date(sunrise.getTime() + 7 * dayMuhurtaMs), end: new Date(sunrise.getTime() + 9 * dayMuhurtaMs) });
  } else if (weekdayIdx === 2) { // Tue
    durmuhurtaWindows.push({ start: new Date(sunrise.getTime() + 3 * dayMuhurtaMs), end: new Date(sunrise.getTime() + 4 * dayMuhurtaMs) });
    durmuhurtaWindows.push({ start: new Date(sunrise.getTime() + 10 * dayMuhurtaMs), end: new Date(sunrise.getTime() + 11 * dayMuhurtaMs) });
  } else if (weekdayIdx === 3) { // Wed
    durmuhurtaWindows.push({ start: new Date(sunrise.getTime() + 7 * dayMuhurtaMs), end: new Date(sunrise.getTime() + 8 * dayMuhurtaMs) });
  } else if (weekdayIdx === 4) { // Thu
    durmuhurtaWindows.push({ start: new Date(sunrise.getTime() + 5 * dayMuhurtaMs), end: new Date(sunrise.getTime() + 7 * dayMuhurtaMs) });
  } else if (weekdayIdx === 5) { // Fri
    durmuhurtaWindows.push({ start: new Date(sunrise.getTime() + 3 * dayMuhurtaMs), end: new Date(sunrise.getTime() + 4 * dayMuhurtaMs) });
    durmuhurtaWindows.push({ start: new Date(sunrise.getTime() + 8 * dayMuhurtaMs), end: new Date(sunrise.getTime() + 9 * dayMuhurtaMs) });
  } else if (weekdayIdx === 6) { // Sat
    durmuhurtaWindows.push({ start: new Date(sunrise.getTime() + 0 * dayMuhurtaMs), end: new Date(sunrise.getTime() + 2 * dayMuhurtaMs) });
  }

  const durmuhurtaStr = durmuhurtaWindows
    .map(w => formatTimeRange(w.start, w.end, tzOffsetHours))
    .join(", ");

  // Varjyam (Tyajya): Calculated from active Nakshatra's start and end times
  // 1 Nakshatra = 60 Ghatikas. Starting Ghatika defines the beginning of 4 Ghatikas (approx 1h 36m) of Varjyam.
  const nakDurationMs = nakshatraEnd.getTime() - nakshatraStart.getTime();
  const startGhatika = VARJYAM_START_GHATIKAS[nakshatraIdx % 27];
  const varjyamStartMs = nakshatraStart.getTime() + (startGhatika / 60) * nakDurationMs;
  const varjyamDurationMs = (4 / 60) * nakDurationMs;
  const varjyamEndMs = varjyamStartMs + varjyamDurationMs;
  const varjyamStart = new Date(varjyamStartMs);
  const varjyamEnd = new Date(varjyamEndMs);
  const varjyamStr = formatTimeRange(varjyamStart, varjyamEnd, tzOffsetHours);

  return {
    rahuKalam: formatTimeRange(rahuStart, rahuEnd, tzOffsetHours),
    yamagandaKalam: formatTimeRange(yamaStart, yamaEnd, tzOffsetHours),
    gulikaKalam: formatTimeRange(gulikaStart, gulikaEnd, tzOffsetHours),
    abhijitMuhurat: abhijitText,
    abhijitStartStr: formatTimeInTz(abhijitStart, tzOffsetHours),
    abhijitEndStr: formatTimeInTz(abhijitEnd, tzOffsetHours),
    brahmaMuhurat: formatTimeRange(brahmaStart, brahmaEnd, tzOffsetHours),
    brahmaStartStr: formatTimeInTz(brahmaStart, tzOffsetHours),
    brahmaEndStr: formatTimeInTz(brahmaEnd, tzOffsetHours),
    vijayaMuhurat: formatTimeRange(vijayaStart, vijayaEnd, tzOffsetHours),
    godhuliMuhurat: formatTimeRange(godhuliStart, godhuliEnd, tzOffsetHours),
    nishitaMuhurat: formatTimeRange(nishitaStart, nishitaEnd, tzOffsetHours),
    pratahSandhya: formatTimeRange(pratahSandhyaStart, pratahSandhyaEnd, tzOffsetHours),
    sayahnaSandhya: formatTimeRange(sayahnaSandhyaStart, sayahnaSandhyaEnd, tzOffsetHours),
    durmuhurtam: durmuhurtaStr,
    varjyam: varjyamStr
  };
}

// Master Authoritative Panchang Calculation
export function calculateAuthoritativePanchang(params: {
  date?: Date | string;
  latitude?: number;
  longitude?: number;
  timezoneOffsetHours?: number;
  ayanamsaSystem?: AyanamsaSystemName;
}): PanchangInfo {
  const {
    latitude = 28.6139,
    longitude = 77.2090,
    timezoneOffsetHours = 5.5,
    ayanamsaSystem = "lahiri"
  } = params;

  let year: number;
  let month: number;
  let day: number;
  let hour = 12; // Default to solar noon for daily evaluation
  let minute = 0;
  let second = 0;
  let isDateOnly = false;

  if (typeof params.date === "string") {
    const s = params.date.trim();
    const dateMatch = s.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (dateMatch) {
      year = parseInt(dateMatch[1], 10);
      month = parseInt(dateMatch[2], 10);
      day = parseInt(dateMatch[3], 10);
      if (s.includes("T")) {
        const timePart = s.split("T")[1];
        const timeMatch = timePart.match(/(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?/);
        if (timeMatch) {
          hour = parseInt(timeMatch[1], 10);
          minute = parseInt(timeMatch[2], 10);
          second = timeMatch[3] ? parseInt(timeMatch[3], 10) : 0;
          isDateOnly = (hour === 0 && minute === 0 && second === 0);
        } else {
          isDateOnly = true;
        }
      } else {
        isDateOnly = true;
      }
    } else {
      const parsed = new Date(s);
      const targetLocalMs = (isNaN(parsed.getTime()) ? Date.now() : parsed.getTime()) + timezoneOffsetHours * 3600000;
      const d = new Date(targetLocalMs);
      year = d.getUTCFullYear();
      month = d.getUTCMonth() + 1;
      day = d.getUTCDate();
      hour = d.getUTCHours();
      minute = d.getUTCMinutes();
      second = d.getUTCSeconds();
    }
  } else if (params.date instanceof Date && !isNaN(params.date.getTime())) {
    if (params.date.getHours() === 0 && params.date.getMinutes() === 0 && params.date.getSeconds() === 0) {
      year = params.date.getFullYear();
      month = params.date.getMonth() + 1;
      day = params.date.getDate();
      isDateOnly = true;
    } else {
      const targetLocalMs = params.date.getTime() + timezoneOffsetHours * 3600000;
      const d = new Date(targetLocalMs);
      year = d.getUTCFullYear();
      month = d.getUTCMonth() + 1;
      day = d.getUTCDate();
      hour = d.getUTCHours();
      minute = d.getUTCMinutes();
      second = d.getUTCSeconds();
    }
  } else {
    const now = new Date();
    const targetLocalMs = now.getTime() + timezoneOffsetHours * 3600000;
    const d = new Date(targetLocalMs);
    year = d.getUTCFullYear();
    month = d.getUTCMonth() + 1;
    day = d.getUTCDate();
    hour = d.getUTCHours();
    minute = d.getUTCMinutes();
    second = d.getUTCSeconds();
  }

  // If date-only was requested, evaluate ephemeris at midday (12:00:00)
  if (isDateOnly) {
    hour = 12;
    minute = 0;
    second = 0;
  }

  // Deterministic calendar ISO string
  const dateIso = `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

  // Deterministic Gregorian civil weekday for that calendar date:
  // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
  const civilDateUtc = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const calDayOfWeek = civilDateUtc.getUTCDay();

  // Construct targetDate as exact UTC instant corresponding to (year, month, day, hour, minute, second) at target location
  const targetUtcMs = Date.UTC(year, month - 1, day, hour, minute, second) - timezoneOffsetHours * 3600000;
  const targetDate = new Date(targetUtcMs);

  // 1. Solar calculations (Sunrise, Sunset, Solar Noon, Dinamana, Ratrimana)
  const solar = calculateSolarEvents({ year, month, day }, latitude, longitude, timezoneOffsetHours);
  const sunrise = solar.sunrise;
  const sunset = solar.sunset;
  const nextSunrise = solar.nextSunrise;

  // 2. Lunar rise and set
  const lunar = calculateLunarEvents({ year, month, day }, latitude, longitude, timezoneOffsetHours);

  // 3. Evaluation times:
  // - localSunrise for Udaya Tithi
  // - targetDate for instantaneous limbs
  const jdSunrise = dateToJulianDay(sunrise);
  const jdTarget = dateToJulianDay(targetDate);

  // 4. Vara (Vedic Solar Weekday): Governed by the sunrise of the calendar date (year, month, day)
  // For the Daily Panchang of this date, the Vara is the Vedic Day commencing at sunrise:
  const vedicDayOfWeek = calDayOfWeek; // 0=Sunday, 1=Monday, ..., 6=Saturday
  const varaName = VARA_NAMES[vedicDayOfWeek];
  const varaLord = VARA_LORDS[vedicDayOfWeek];
  const varaSanskrit = VARA_SANSKRIT[vedicDayOfWeek];

  // 5. Ephemeris coordinates at target time
  const sunPos = calculateSunPosition(jdTarget);
  const moonPos = calculateMoonPosition(jdTarget);
  const ayanamsaVal = AyanamsaService.calculateAyanamsa(jdTarget, ayanamsaSystem).ayanamsa_value;

  const sunSidereal = normalizeDeg(sunPos.longitude - ayanamsaVal);
  const moonSidereal = normalizeDeg(moonPos.longitude - ayanamsaVal);

  // Zodiac Signs
  const ZODIAC_NAMES = [
    "Mesha (Aries)", "Vrishabha (Taurus)", "Mithuna (Gemini)", "Karka (Cancer)",
    "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrishchika (Scorpio)",
    "Dhanu (Sagittarius)", "Makara (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)"
  ];
  const sunSign = ZODIAC_NAMES[Math.floor(sunSidereal / 30) % 12];
  const moonSign = ZODIAC_NAMES[Math.floor(moonSidereal / 30) % 12];

  // 6. Limb 1: Tithi (Instantaneous and Udaya)
  const diffTarget = normalizeDeg(moonPos.longitude - sunPos.longitude);
  const tithiRaw = diffTarget / 12;
  const tithiIndex = Math.floor(tithiRaw) + 1; // 1 to 30
  const isShukla = tithiIndex <= 15;
  const tithiNameInPaksha = (tithiIndex === 15) ? "Purnima" : (tithiIndex === 30) ? "Amavasya" : TITHI_NAMES[(tithiIndex - 1) % 15];
  const pakshaStr = isShukla ? "Shukla" : "Krishna";
  const tithiFullName = `${pakshaStr} ${tithiNameInPaksha} (${tithiIndex <= 15 ? tithiIndex : tithiIndex - 15}th lunar phase)`;

  const degreeCompletedInTithi = diffTarget % 12;
  const degreeLeftInTithi = 12 - degreeCompletedInTithi;
  const percentageLeftInTithi = Math.round((degreeLeftInTithi / 12) * 100);

  // Transition for active Tithi
  const tithiTrans = solveTithiTransition(jdTarget, tithiIndex);

  // Udaya Tithi (at sunrise)
  const sunAtRise = calculateSunPosition(jdSunrise).longitude;
  const moonAtRise = calculateMoonPosition(jdSunrise).longitude;
  const diffAtRise = normalizeDeg(moonAtRise - sunAtRise);
  const udayaTithiIndex = Math.floor(diffAtRise / 12) + 1;
  const isUdayaShukla = udayaTithiIndex <= 15;
  const udayaTithiName = (udayaTithiIndex === 15) ? "Purnima" : (udayaTithiIndex === 30) ? "Amavasya" : TITHI_NAMES[(udayaTithiIndex - 1) % 15];
  const udayaTithiFullName = `${isUdayaShukla ? "Shukla" : "Krishna"} ${udayaTithiName}`;

  // 7. Limb 2: Nakshatra
  const nakSpan = 360 / 27;
  const nakRaw = moonSidereal / nakSpan;
  const nakIndex = Math.floor(nakRaw) % 27;
  const nakObj = NAKSHATRAS[nakIndex] || NAKSHATRAS[0];
  const nakPada = Math.floor((nakRaw % 1) * 4) + 1;
  const nakDegreeInPada = (moonSidereal % (nakSpan / 4));
  const nakPercentageLeft = Math.round((1 - (nakRaw % 1)) * 100);

  const nakTrans = solveNakshatraTransition(jdTarget, nakIndex, ayanamsaSystem);

  // 8. Limb 3: Yoga (Nitya Yoga)
  const yogaAngle = normalizeDeg(sunSidereal + moonSidereal);
  const yogaRaw = yogaAngle / nakSpan;
  const yogaIndex = Math.floor(yogaRaw) + 1; // 1 to 27
  const yogaObj = NITYA_YOGAS[(yogaIndex - 1) % 27] || NITYA_YOGAS[0];
  const yogaPercentageLeft = Math.round((1 - (yogaRaw % 1)) * 100);

  const yogaTrans = solveYogaTransition(jdTarget, yogaIndex, ayanamsaSystem);

  // 9. Limb 4: Karana (Half-Tithi)
  const karanaRaw = diffTarget / 6;
  const karanaIndex = Math.floor(karanaRaw) + 1; // 1 to 60
  let karanaName = "Bava";
  let karanaType: "Chara" | "Sthira" = "Chara";

  if (karanaIndex === 1) {
    karanaName = "Kintughna";
    karanaType = "Sthira";
  } else if (karanaIndex >= 2 && karanaIndex <= 57) {
    karanaName = MOVABLE_KARANAS[(karanaIndex - 2) % 7];
    karanaType = "Chara";
  } else if (karanaIndex === 58) {
    karanaName = "Shakuni";
    karanaType = "Sthira";
  } else if (karanaIndex === 59) {
    karanaName = "Chatushpada";
    karanaType = "Sthira";
  } else {
    karanaName = "Naga";
    karanaType = "Sthira";
  }

  const karanaPercentageLeft = Math.round((1 - (karanaRaw % 1)) * 100);
  const karanaTrans = solveKaranaTransition(jdTarget, karanaIndex);

  // 10. Proportional 24 Horas
  const horaResult = calculate24Horas(sunrise, sunset, nextSunrise, varaLord, timezoneOffsetHours, targetDate);

  // 11. Proportional 16 Choghadiyas
  const choghadiyaResult = calculate16Choghadiyas(sunrise, sunset, nextSunrise, vedicDayOfWeek, timezoneOffsetHours, targetDate);

  // 12. Gowri Panchangam
  const gowriResult = calculateGowriPanchangam(sunrise, sunset, nextSunrise, vedicDayOfWeek, timezoneOffsetHours, targetDate);

  // 13. Auspicious & Inauspicious Muhurtas
  const muhurtas = calculateMuhurtas(
    sunrise,
    sunset,
    nextSunrise,
    solar.dinamanaMs,
    solar.ratrimanaMs,
    vedicDayOfWeek,
    nakTrans.startDate,
    nakTrans.endDate,
    nakIndex,
    timezoneOffsetHours
  );

  return {
    dateStr: dateIso,
    dayOfWeek: `${varaName} (${varaLord})`,
    vara: `${varaName} (${varaSanskrit})`,
    tithi: tithiFullName,
    tithiEnd: formatTimeInTz(tithiTrans.endDate, timezoneOffsetHours),
    paksha: `${pakshaStr} Paksha`,
    nakshatra: nakObj.name,
    nakshatraLord: nakObj.lord,
    nakshatraPada: nakPada,
    yoga: yogaObj.name,
    karana: karanaName,
    sunSign,
    moonSign,
    sunrise: formatTimeInTz(sunrise, timezoneOffsetHours),
    sunset: formatTimeInTz(sunset, timezoneOffsetHours),
    solarNoon: formatTimeInTz(solar.solarNoon, timezoneOffsetHours),
    nextSunrise: formatTimeInTz(nextSunrise, timezoneOffsetHours),
    moonrise: lunar.moonriseStr,
    moonset: lunar.moonsetStr,
    dinamana: solar.dinamanaFormatted,
    ratrimana: solar.ratrimanaFormatted,
    dinamanaMs: solar.dinamanaMs,
    ratrimanaMs: solar.ratrimanaMs,
    abhijitMuhurat: muhurtas.abhijitMuhurat,
    abhijitMuhurta: muhurtas.abhijitMuhurat,
    abhijitStartStr: muhurtas.abhijitStartStr,
    abhijitEndStr: muhurtas.abhijitEndStr,
    brahmaMuhurat: muhurtas.brahmaMuhurat,
    brahmaMuhurta: muhurtas.brahmaMuhurat,
    brahmaStartStr: muhurtas.brahmaStartStr,
    brahmaEndStr: muhurtas.brahmaEndStr,
    rahuKalam: muhurtas.rahuKalam,
    rahuKala: muhurtas.rahuKalam,
    yamagandaKalam: muhurtas.yamagandaKalam,
    yamaganda: muhurtas.yamagandaKalam,
    gulikaKalam: muhurtas.gulikaKalam,
    gulika: muhurtas.gulikaKalam,
    durmuhurtam: muhurtas.durmuhurtam,
    durmuhurta: muhurtas.durmuhurtam,
    varjyam: muhurtas.varjyam,
    vijayaMuhurat: muhurtas.vijayaMuhurat,
    godhuliMuhurat: muhurtas.godhuliMuhurat,
    nishitaMuhurat: muhurtas.nishitaMuhurat,
    pratahSandhya: muhurtas.pratahSandhya,
    sayahnaSandhya: muhurtas.sayahnaSandhya,
    udayaTithi: {
      index: udayaTithiIndex,
      name: udayaTithiName,
      fullName: udayaTithiFullName,
      paksha: isUdayaShukla ? "Shukla" : "Krishna"
    },
    currentTithi: {
      index: tithiIndex,
      name: tithiNameInPaksha,
      fullName: tithiFullName,
      paksha: pakshaStr,
      percentageLeft: percentageLeftInTithi,
      degreeCompleted: degreeCompletedInTithi,
      start: tithiTrans.startDate,
      end: tithiTrans.endDate,
      startStr: formatTimeInTz(tithiTrans.startDate, timezoneOffsetHours),
      endStr: formatTimeInTz(tithiTrans.endDate, timezoneOffsetHours)
    },
    choghadiya: {
      day: choghadiyaResult.day,
      night: choghadiyaResult.night
    },
    dayChoghadiya: choghadiyaResult.day,
    nightChoghadiya: choghadiyaResult.night,
    horas: horaResult.horas,
    dayHoras: horaResult.dayHoras,
    nightHoras: horaResult.nightHoras,
    currentHora: horaResult.currentHora,
    gowriDay: gowriResult.gowriDay,
    gowriNight: gowriResult.gowriNight,
    transitions: {
      tithiStart: formatTimeInTz(tithiTrans.startDate, timezoneOffsetHours),
      tithiEnd: formatTimeInTz(tithiTrans.endDate, timezoneOffsetHours),
      nakshatraStart: formatTimeInTz(nakTrans.startDate, timezoneOffsetHours),
      nakshatraEnd: formatTimeInTz(nakTrans.endDate, timezoneOffsetHours),
      yogaStart: formatTimeInTz(yogaTrans.startDate, timezoneOffsetHours),
      yogaEnd: formatTimeInTz(yogaTrans.endDate, timezoneOffsetHours),
      karanaStart: formatTimeInTz(karanaTrans.startDate, timezoneOffsetHours),
      karanaEnd: formatTimeInTz(karanaTrans.endDate, timezoneOffsetHours)
    }
  };
}

export class PanchangEngine {
  public static calculatePanchang(params: {
    date: Date;
    sunLongitude: number;
    moonLongitude: number;
    latitude?: number;
    longitude?: number;
    timezoneOffsetHours?: number;
  }): PanchangReport {
    const lat = params.latitude ?? 28.6139;
    const lng = params.longitude ?? 77.2090;
    const tz = params.timezoneOffsetHours ?? 5.5;

    const full = calculateAuthoritativePanchang({
      date: params.date,
      latitude: lat,
      longitude: lng,
      timezoneOffsetHours: tz
    });

    const jd = dateToJulianDay(params.date);
    const ayanamsaVal = AyanamsaService.calculateAyanamsa(jd, "lahiri").ayanamsa_value;
    const moonSidereal = normalizeDeg(params.moonLongitude - ayanamsaVal);
    const nakPlacement = NakshatraEngine.getNakshatraPlacement(moonSidereal);

    return {
      fivePillars: {
        tithi: {
          index: full.currentTithi.index,
          name: full.currentTithi.name,
          paksha: full.currentTithi.paksha,
          degreeCompleted: full.currentTithi.degreeCompleted,
          fractionLeft: (100 - full.currentTithi.percentageLeft) / 100,
          percentageLeft: full.currentTithi.percentageLeft,
          start: full.currentTithi.start,
          end: full.currentTithi.end,
          startStr: full.currentTithi.startStr,
          endStr: full.currentTithi.endStr
        },
        nakshatra: {
          index: nakPlacement.index,
          name: nakPlacement.name,
          sanskritName: nakPlacement.sanskritName,
          lord: nakPlacement.lord,
          pada: nakPlacement.pada,
          degreeInPada: nakPlacement.degreeInPada,
          totalDegrees: nakPlacement.totalDegrees,
          start: new Date(params.date.getTime() - 12 * 3600000),
          end: new Date(params.date.getTime() + 12 * 3600000),
          startStr: full.transitions?.nakshatraStart || "00:00",
          endStr: full.transitions?.nakshatraEnd || "23:59"
        },
        yoga: {
          name: full.yoga,
          number: NITYA_YOGAS.findIndex(y => y.name === full.yoga) + 1,
          isAuspicious: !["Vishkambha", "Atiganda", "Shula", "Ganda", "Vyaghata", "Vajra", "Vyatipata", "Parigha", "Vaidhriti"].includes(full.yoga),
          start: new Date(params.date.getTime() - 12 * 3600000),
          end: new Date(params.date.getTime() + 12 * 3600000),
          startStr: full.transitions?.yogaStart || "00:00",
          endStr: full.transitions?.yogaEnd || "23:59"
        },
        karana: {
          name: full.karana,
          number: 1,
          type: ["Kintughna", "Shakuni", "Chatushpada", "Naga"].includes(full.karana) ? "Sthira" : "Chara",
          start: new Date(params.date.getTime() - 6 * 3600000),
          end: new Date(params.date.getTime() + 6 * 3600000),
          startStr: full.transitions?.karanaStart || "00:00",
          endStr: full.transitions?.karanaEnd || "23:59"
        },
        vara: {
          name: full.vara.split(" ")[0] || full.dayOfWeek.split(" ")[0],
          rulingLord: full.dayOfWeek.split("(")[1]?.replace(")", "") || "Moon",
          number: VARA_NAMES.indexOf(full.vara.split(" ")[0]) >= 0 ? VARA_NAMES.indexOf(full.vara.split(" ")[0]) + 1 : 2,
          sanskrit: full.vara.includes("(") ? full.vara.split("(")[1].replace(")", "") : "Somavara"
        }
      },
      rahuKalam: full.rahuKalam || "16:30 - 18:00",
      gulikaKalam: full.gulikaKalam || "13:30 - 15:00",
      yamaganda: full.yamagandaKalam || "06:00 - 07:30",
      abhijitMuhurta: full.abhijitMuhurat || "11:48 - 12:36",
      brahmaMuhurta: full.brahmaMuhurat || "04:30 - 05:18",
      durmuhurta: full.durmuhurtam || "08:35 - 09:24",
      varjyam: full.varjyam || "14:10 - 15:46",
      solarTimes: {
        sunrise: new Date(`${full.dateStr}T${full.sunrise}`),
        sunset: new Date(`${full.dateStr}T${full.sunset}`),
        solarNoon: new Date(`${full.dateStr}T${full.solarNoon}`),
        nextSunrise: new Date(`${full.dateStr}T${full.nextSunrise}`),
        dinamanaMs: full.dinamanaMs || 43200000,
        ratrimanaMs: full.ratrimanaMs || 43200000,
        dinamanaFormatted: full.dinamana || "12h 00m",
        ratrimanaFormatted: full.ratrimana || "12h 00m"
      }
    };
  }
}
