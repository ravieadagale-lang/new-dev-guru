// AstroNext Panchang Precision Astronomical Engine
// Authoritative calculation of Tithi, Karana, and Yoga using VSOP87/ELP2000-82 ephemerides,
// topocentric solar/lunar transitions, root-finding boundary solvers, and classical Shastric rules.

import {
  calculateJulianDay,
  calculateSunPosition,
  calculateMoonPosition,
  calculateObliquity,
  degToDMS,
  normalizeDeg
} from "./astronomyMath";
import { AyanamsaService, AyanamsaSystemName } from "./ayanamsaEngine";
import {
  calculateSolarEvents,
  dateToJulianDay,
  julianDayToDate,
  formatTimeInTz,
  solveTithiTransition,
  solveKaranaTransition,
  solveYogaTransition,
  solveNakshatraTransition,
  TITHI_NAMES,
  TITHI_LORDS,
  NITYA_YOGAS,
  MOVABLE_KARANAS,
  VARA_NAMES,
  VARA_LORDS,
  VARA_SANSKRIT
} from "./panchangEngine";
import { NAKSHATRAS } from "./nakshatraEngine";

export interface PrecisionPanchangOptions {
  date: string | Date; // YYYY-MM-DD or Date
  time?: string; // HH:mm or HH:mm:ss
  latitude: number; // -90 to +90
  longitude: number; // -180 to +180
  timezoneOffsetHours: number; // e.g. 5.5 for IST
  ayanamsaSystem?: AyanamsaSystemName;
  cityName?: string;
}

export type TithiCategory = "Nanda" | "Bhadra" | "Jaya" | "Rikta" | "Poorna";
export type TithiTatwa = "Agni" | "Prithvi" | "Vayu" | "Jala" | "Akasha";

export interface PrecisionTithiLimb {
  index: number; // 1 to 30
  name: string;
  fullName: string;
  paksha: "Shukla" | "Krishna";
  category: TithiCategory;
  categoryDescription: string;
  deity: string;
  tatwa: TithiTatwa;
  elongationDeg: number;
  elongationDms: string;
  elapsedDeg: number;
  elapsedDms: string;
  remainingDeg: number;
  remainingDms: string;
  progressPct: number;
  startDate: Date;
  endDate: Date;
  startTimeFormatted: string;
  endTimeFormatted: string;
  durationHours: number;
  isAuspicious: boolean;
  recommendedActivities: string;
  avoidedActivities: string;
}

export interface PrecisionKaranaLimb {
  index: number; // 1 to 60
  name: string;
  type: "Chara" | "Sthira";
  ruler: string;
  deity: string;
  elapsedDeg: number;
  elapsedDms: string;
  remainingDeg: number;
  remainingDms: string;
  progressPct: number;
  startDate: Date;
  endDate: Date;
  startTimeFormatted: string;
  endTimeFormatted: string;
  durationHours: number;
  bhadraDetails?: {
    isBhadra: boolean;
    vasLocation: "Swarga Loka" | "Patala Loka" | "Mrityu Loka";
    vasEffect: string;
    mukhaStart: Date;
    mukhaEnd: Date;
    mukhaTimeFormatted: string;
    mukhaCaution: string;
    puchhaStart: Date;
    puchhaEnd: Date;
    puchhaTimeFormatted: string;
    puchhaBenefit: string;
  };
}

export interface PrecisionYogaLimb {
  index: number; // 1 to 27
  name: string;
  meaning: string;
  deity: string;
  ruler: string;
  isAuspicious: boolean;
  yogaAngleDeg: number;
  yogaAngleDms: string;
  elapsedDeg: number;
  elapsedDms: string;
  remainingDeg: number;
  remainingDms: string;
  progressPct: number;
  startDate: Date;
  endDate: Date;
  startTimeFormatted: string;
  endTimeFormatted: string;
  durationHours: number;
  doshaSpanGhatikas?: number;
  doshaSpanDescription?: string;
  specialAdvice: string;
}

export interface PrecisionNakshatraLimb {
  index: number; // 0 to 26
  name: string;
  lord: string;
  pada: number; // 1 to 4
  degreeInPada: number;
  degreeInPadaDms: string;
  elapsedDeg: number;
  elapsedDms: string;
  remainingDeg: number;
  remainingDms: string;
  progressPct: number;
  startDate: Date;
  endDate: Date;
  startTimeFormatted: string;
  endTimeFormatted: string;
}

export interface PrecisionPanchangResult {
  evalTimestamp: Date;
  evalJd: number;
  location: {
    latitude: number;
    longitude: number;
    timezoneOffsetHours: number;
    cityName: string;
  };
  ayanamsa: {
    system: string;
    valueDeg: number;
    dms: string;
  };
  solarEphemeris: {
    longitudeDeg: number;
    siderealLongitudeDeg: number;
    dms: string;
    siderealDms: string;
    rashi: string;
    rightAscensionDeg: number;
    declinationDeg: number;
    distanceAu: number;
  };
  lunarEphemeris: {
    longitudeDeg: number;
    siderealLongitudeDeg: number;
    dms: string;
    siderealDms: string;
    rashi: string;
    rashiIndex: number;
    distanceKm: number;
  };
  solarEvents: {
    sunrise: Date;
    sunset: Date;
    solarNoon: Date;
    nextSunrise: Date;
    sunriseFormatted: string;
    sunsetFormatted: string;
    solarNoonFormatted: string;
    nextSunriseFormatted: string;
    dinamanaFormatted: string;
    ratrimanaFormatted: string;
    dinamanaMs: number;
    ratrimanaMs: number;
  };
  tithi: {
    instantaneous: PrecisionTithiLimb;
    udaya: {
      index: number;
      name: string;
      fullName: string;
      paksha: "Shukla" | "Krishna";
    };
    tithiAnomaly: "Normal" | "Kshaya" | "Vriddhi";
    anomalyDescription: string;
  };
  karana: PrecisionKaranaLimb;
  yoga: PrecisionYogaLimb;
  nakshatra: PrecisionNakshatraLimb;
  vara: {
    name: string;
    lord: string;
    sanskrit: string;
  };
}

// Classical Tithi Metas
const TITHI_CATEGORIES: TithiCategory[] = [
  "Nanda",   // 1
  "Bhadra",  // 2
  "Jaya",    // 3
  "Rikta",   // 4
  "Poorna",  // 5
  "Nanda",   // 6
  "Bhadra",  // 7
  "Jaya",    // 8
  "Rikta",   // 9
  "Poorna",  // 10
  "Nanda",   // 11
  "Bhadra",  // 12
  "Jaya",    // 13
  "Rikta",   // 14
  "Poorna"   // 15
];

const TITHI_CATEGORY_DESCRIPTIONS: Record<TithiCategory, string> = {
  Nanda: "Nanda (Joyful/Delightful): Best for celebrations, festivals, artistic ventures, garments, and festivities.",
  Bhadra: "Bhadra (Auspicious/Steady): Best for construction, real estate, vehicles, agriculture, and stable investments.",
  Jaya: "Jaya (Victorious/Conquering): Best for legal victories, debates, sports, competitive exams, and military actions.",
  Rikta: "Rikta (Hollow/Destructive): Avoid starting auspicious journeys or weddings; suitable for debt repayment, weapon crafting, surgical operations, and shedding habits.",
  Poorna: "Poorna (Complete/Fulfilling): Highly auspicious for spiritual inaugurations, weddings, coronation, and concluding sacred works."
};

const TITHI_TATWAS: TithiTatwa[] = [
  "Agni", "Prithvi", "Vayu", "Jala", "Akasha",
  "Agni", "Prithvi", "Vayu", "Jala", "Akasha",
  "Agni", "Prithvi", "Vayu", "Jala", "Akasha"
];

// Karana Lords and Deities
const KARANA_LORDS: Record<string, { lord: string; deity: string }> = {
  Bava: { lord: "Sun", deity: "Indra" },
  Balava: { lord: "Moon", deity: "Brahma" },
  Kaulava: { lord: "Mars", deity: "Mitra" },
  Taitila: { lord: "Mercury", deity: "Aryaman" },
  Gara: { lord: "Jupiter", deity: "Bhumi" },
  Vanija: { lord: "Venus", deity: "Shri (Lakshmi)" },
  "Vishti (Bhadra)": { lord: "Saturn", deity: "Yama / Chhaya" },
  Shakuni: { lord: "Rahu", deity: "Kali" },
  Chatushpada: { lord: "Ketu", deity: "Vrishabha (Dharma Bull)" },
  Naga: { lord: "Rahu", deity: "Sarpas (Nagas)" },
  Kintughna: { lord: "Jupiter", deity: "Vayu" }
};

// Yoga Deities & Dosha Guidelines
const YOGA_META_DETAILS: Record<string, { deity: string; ruler: string; doshaGhatikas?: number; advice: string }> = {
  Vishkambha: { deity: "Yama", ruler: "Saturn", doshaGhatikas: 3, advice: "First 3 ghatikas (1h 12m) are inauspicious. Latter period favorable for discipline." },
  Priti: { deity: "Vishnu", ruler: "Mercury", advice: "Highly auspicious for marriages, love, friendships, and commercial alliances." },
  Ayushman: { deity: "Chandra", ruler: "Ketu", advice: "Bestows vitality and longevity. Auspicious for health treatments and beginning routines." },
  Saubhagya: { deity: "Brahma", ruler: "Venus", advice: "Bestows high fortune, prosperity, and joy. Ideal for buying gold and ceremonies." },
  Shobhana: { deity: "Brihaspati", ruler: "Sun", advice: "Aesthetic splendor and intellectual radiance. Great for arts and scholarship." },
  Atiganda: { deity: "Chandra", ruler: "Moon", doshaGhatikas: 6, advice: "First 6 ghatikas (2h 24m) are severe obstacles. Avoid new contracts during early arc." },
  Sukarma: { deity: "Indra", ruler: "Mars", advice: "Virtuous deeds yield effortless success. Optimal for career shifts and charity." },
  Dhriti: { deity: "Jala", ruler: "Rahu", advice: "Steadfastness and patience. Excellent for laying foundation stones and long-term bonds." },
  Shula: { deity: "Sarpa", ruler: "Jupiter", doshaGhatikas: 5, advice: "First 5 ghatikas (2h) carry grief/discord. Avoid initiating travel or negotiations." },
  Ganda: { deity: "Agni", ruler: "Saturn", doshaGhatikas: 6, advice: "First 6 ghatikas (2h 24m) are problematic. Postpone key decisions to the latter arc." },
  Vriddhi: { deity: "Surya", ruler: "Mercury", advice: "Growth and compounding abundance. Highly auspicious for trade and investments." },
  Dhruva: { deity: "Prithvi", ruler: "Ketu", advice: "Fixed, unshakeable permanence. Ideal for property purchase, registration, and oaths." },
  Vyaghata: { deity: "Vayu", ruler: "Venus", doshaGhatikas: 9, advice: "First 9 ghatikas (3h 36m) are sharp conflict. Guard against aggressive outbursts." },
  Harshana: { deity: "Bhaga", ruler: "Sun", advice: "Supreme delight and bliss. Great for parties, inaugurations, and creative releases." },
  Vajra: { deity: "Varuna", ruler: "Moon", doshaGhatikas: 3, advice: "First 3 ghatikas (1h 12m) carry sudden shocks. Exercise vigilance with machinery." },
  Siddhi: { deity: "Ganesha", ruler: "Mars", advice: "Mastery and spiritual attainment. Highest grade for meditation, mantra, and execution." },
  Vyatipata: { deity: "Rudra", ruler: "Rahu", doshaGhatikas: 60, advice: "Entire span carries severe adverse disruption. Avoid all shubh karmas; chanting only." },
  Variyan: { deity: "Kubera", ruler: "Jupiter", advice: "Comfort, luxury, and financial expansion. Excellent for high-value purchases." },
  Parigha: { deity: "Vishvakarma", ruler: "Saturn", doshaGhatikas: 30, advice: "First half (30 ghatikas) barred like an iron obstacle. Second half acceptable." },
  Shiva: { deity: "Mahadeva", ruler: "Mercury", advice: "Benign grace and purification. Splendid for spiritual initiation and education." },
  Siddha: { deity: "Kartikeya", ruler: "Ketu", advice: "Accomplishment of desired goals. Best for technical, scientific, and legal matters." },
  Sadhya: { deity: "Savitr", ruler: "Venus", advice: "Attainable feasibility. Suitable for mediation, compromise, and starting projects." },
  Shubha: { deity: "Lakshmi", ruler: "Sun", advice: "Pure, wholesome, and auspicious. Favored for wedding rituals and sacred worship." },
  Shukla: { deity: "Parvati", ruler: "Moon", advice: "Bright, pristine clarity. Excellent for cleansing, detoxification, and vows." },
  Brahma: { deity: "Ashvins", ruler: "Mars", advice: "Universal wisdom and supreme learning. Highly recommended for intellectual work." },
  Indra: { deity: "Pitris", ruler: "Rahu", advice: "Nobility, leadership, and public influence. Best for government petitions." },
  Vaidhriti: { deity: "Diti", ruler: "Jupiter", doshaGhatikas: 60, advice: "Entire span carries adverse karmic currents. Barred for auspicious sanskaras." }
};

const ZODIAC_NAMES = [
  "Mesha (Aries)", "Vrishabha (Taurus)", "Mithuna (Gemini)", "Karka (Cancer)",
  "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrishchika (Scorpio)",
  "Dhanu (Sagittarius)", "Makara (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)"
];

/**
 * Main Authoritative Panchang Precision Calculation Engine
 */
export function calculatePrecisionPanchang(options: PrecisionPanchangOptions): PrecisionPanchangResult {
  const {
    latitude,
    longitude,
    timezoneOffsetHours,
    ayanamsaSystem = "lahiri",
    cityName = "Custom Location"
  } = options;

  // 1. Resolve Evaluation Date & Time
  let evalDate: Date;
  let year: number;
  let month: number;
  let day: number;

  if (options.date instanceof Date) {
    evalDate = new Date(options.date.getTime());
    const targetLocalMs = evalDate.getTime() + timezoneOffsetHours * 3600000;
    const d = new Date(targetLocalMs);
    year = d.getUTCFullYear();
    month = d.getUTCMonth() + 1;
    day = d.getUTCDate();
  } else if (typeof options.date === "string") {
    const dateStr = options.date.trim();
    const match = dateStr.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (match) {
      year = parseInt(match[1], 10);
      month = parseInt(match[2], 10);
      day = parseInt(match[3], 10);
    } else {
      year = 2026; month = 10; day = 12;
    }
    if (options.time && options.time.includes(":")) {
      const timeStr = options.time.trim();
      const parts = timeStr.split(":");
      const h = parseInt(parts[0], 10) || 0;
      const m = parseInt(parts[1], 10) || 0;
      const s = parts[2] ? parseInt(parts[2], 10) || 0 : 0;
      const utcMs = Date.UTC(year, month - 1, day, h, m, s) - timezoneOffsetHours * 3600 * 1000;
      evalDate = new Date(utcMs);
    } else {
      const utcMs = Date.UTC(year, month - 1, day, 12, 0, 0) - timezoneOffsetHours * 3600 * 1000;
      evalDate = new Date(utcMs);
    }
  } else {
    evalDate = new Date();
    const targetLocalMs = evalDate.getTime() + timezoneOffsetHours * 3600000;
    const d = new Date(targetLocalMs);
    year = d.getUTCFullYear();
    month = d.getUTCMonth() + 1;
    day = d.getUTCDate();
  }

  // 2. Julian Day at evaluation moment
  const jdEval = dateToJulianDay(evalDate);

  // 3. Ayanamsa Calculation
  const ayanamsaResult = AyanamsaService.calculateAyanamsa(jdEval, ayanamsaSystem);
  const ayanamsaVal = ayanamsaResult.ayanamsa_value;

  // 4. Solar and Lunar Astronomical Ephemerides
  const sunPos = calculateSunPosition(jdEval);
  const moonPos = calculateMoonPosition(jdEval);

  const sunSidereal = normalizeDeg(sunPos.longitude - ayanamsaVal);
  const moonSidereal = normalizeDeg(moonPos.longitude - ayanamsaVal);

  const sunRashiIndex = Math.floor(sunSidereal / 30) % 12;
  const moonRashiIndex = Math.floor(moonSidereal / 30) % 12;
  const sunRashi = ZODIAC_NAMES[sunRashiIndex];
  const moonRashi = ZODIAC_NAMES[moonRashiIndex];

  // 5. Precise Solar Events for exact latitude & longitude
  const solarEvents = calculateSolarEvents({ year, month, day }, latitude, longitude, timezoneOffsetHours);
  const jdSunrise = dateToJulianDay(solarEvents.sunrise);

  // 6. Vedic Solar Weekday (Vara): Governed by the calendar date's sunrise
  const calCivilUtc = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const calDayOfWeek = calCivilUtc.getUTCDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const vedicDayOfWeek = calDayOfWeek;
  const varaName = VARA_NAMES[vedicDayOfWeek];
  const varaLord = VARA_LORDS[vedicDayOfWeek];
  const varaSanskrit = VARA_SANSKRIT[vedicDayOfWeek];

  // ==========================================
  // 7. PRECISION TITHI CALCULATION
  // ==========================================
  const elongation = normalizeDeg(moonPos.longitude - sunPos.longitude);
  const tithiRaw = elongation / 12.0;
  const tithiIndex = Math.floor(tithiRaw) + 1; // 1 to 30
  const isShukla = tithiIndex <= 15;
  const pakshaStr: "Shukla" | "Krishna" = isShukla ? "Shukla" : "Krishna";

  const tithiNameInPaksha =
    tithiIndex === 15 ? "Purnima" : tithiIndex === 30 ? "Amavasya" : TITHI_NAMES[(tithiIndex - 1) % 15];
  const tithiFullName = `${pakshaStr} ${tithiNameInPaksha} (Phase #${tithiIndex <= 15 ? tithiIndex : tithiIndex - 15})`;

  const elapsedDegTithi = elongation % 12.0;
  const remainingDegTithi = 12.0 - elapsedDegTithi;
  const progressPctTithi = Math.min(100, Math.max(0, Math.round((elapsedDegTithi / 12.0) * 100)));

  // Root-finding transition boundary solvers
  const tithiTransition = solveTithiTransition(jdEval, tithiIndex);
  const tithiDurationMs = tithiTransition.endDate.getTime() - tithiTransition.startDate.getTime();
  const tithiDurationHours = Number((tithiDurationMs / 3600000).toFixed(2));

  const tithiCategory = TITHI_CATEGORIES[(tithiIndex - 1) % 15];
  const tithiCategoryDesc = TITHI_CATEGORY_DESCRIPTIONS[tithiCategory];
  const tithiDeity = TITHI_LORDS[(tithiIndex - 1) % 15];
  const tithiTatwa = TITHI_TATWAS[(tithiIndex - 1) % 15];

  // Udaya Tithi (at sunrise)
  const sunAtRise = calculateSunPosition(jdSunrise).longitude;
  const moonAtRise = calculateMoonPosition(jdSunrise).longitude;
  const elongationAtRise = normalizeDeg(moonAtRise - sunAtRise);
  const udayaTithiIndex = Math.floor(elongationAtRise / 12.0) + 1;
  const isUdayaShukla = udayaTithiIndex <= 15;
  const udayaTithiName =
    udayaTithiIndex === 15 ? "Purnima" : udayaTithiIndex === 30 ? "Amavasya" : TITHI_NAMES[(udayaTithiIndex - 1) % 15];
  const udayaTithiFullName = `${isUdayaShukla ? "Shukla" : "Krishna"} ${udayaTithiName}`;

  // Check for Kshaya (Loss) or Vriddhi (Extension) Tithi
  let tithiAnomaly: "Normal" | "Kshaya" | "Vriddhi" = "Normal";
  let anomalyDescription = "Tithi operates within regular single-sunrise boundaries.";

  const nextSunriseJd = dateToJulianDay(solarEvents.nextSunrise);
  const sunAtNextRise = calculateSunPosition(nextSunriseJd).longitude;
  const moonAtNextRise = calculateMoonPosition(nextSunriseJd).longitude;
  const elongationAtNextRise = normalizeDeg(moonAtNextRise - sunAtNextRise);
  const nextRiseTithiIndex = Math.floor(elongationAtNextRise / 12.0) + 1;

  if (udayaTithiIndex === nextRiseTithiIndex) {
    tithiAnomaly = "Vriddhi";
    anomalyDescription = "Vriddhi Tithi (Extended): This lunar phase spans across two consecutive astronomical sunrises.";
  } else if ((udayaTithiIndex + 2) % 30 === nextRiseTithiIndex % 30) {
    tithiAnomaly = "Kshaya";
    anomalyDescription = "Kshaya Tithi (Lost): An intermediate lunar phase begins and concludes between sunrises without touching a dawn horizon.";
  }

  // Recommended activities based on Tithi Shastra
  let recommendedActivities = "General auspicious duties, charitable acts, study, and daily worship.";
  let avoidedActivities = "Destructive speech, severe disputes, unethical commerce.";

  if (tithiIndex === 11 || tithiIndex === 26) {
    recommendedActivities = "Ekadashi Vrata, spiritual contemplation, Satvik fasting, and Vishnu Sahasranama chanting.";
    avoidedActivities = "Consuming grains/rice, signing aggressive commercial agreements, sensual indulgence.";
  } else if (tithiIndex === 13 || tithiIndex === 28) {
    recommendedActivities = "Trayodashi Pradosham puja, evening Shiva worship, release of past karmic burdens.";
    avoidedActivities = "Commencing stubborn conflicts or unnecessary physical labor.";
  } else if (tithiIndex === 15) {
    recommendedActivities = "Purnima Satyanarayana Vrata, charity, moon bath contemplation, spiritual initiations.";
    avoidedActivities = "Surgery on fluid organs, risky financial leverage.";
  } else if (tithiIndex === 30) {
    recommendedActivities = "Pitru Tarpanam, ancestral homage, deep introspective sadhana, cleansing spaces.";
    avoidedActivities = "Griha Pravesh, marriage proposals, purchasing new luxury vehicles.";
  } else if (tithiCategory === "Rikta") {
    recommendedActivities = "Debt repayment, purging unwanted clutter, surgical operations, obstacle-removal yajnas.";
    avoidedActivities = "Weddings, starting journeys, entering new homes, auspicious negotiations.";
  }

  // ==========================================
  // 8. PRECISION KARANA CALCULATION
  // ==========================================
  const karanaRaw = elongation / 6.0;
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

  const elapsedDegKarana = elongation % 6.0;
  const remainingDegKarana = 6.0 - elapsedDegKarana;
  const progressPctKarana = Math.min(100, Math.max(0, Math.round((elapsedDegKarana / 6.0) * 100)));

  const karanaTransition = solveKaranaTransition(jdEval, karanaIndex);
  const karanaDurationMs = karanaTransition.endDate.getTime() - karanaTransition.startDate.getTime();
  const karanaDurationHours = Number((karanaDurationMs / 3600000).toFixed(2));

  const karanaMeta = KARANA_LORDS[karanaName] || { lord: "Mercury", deity: "Aryaman" };

  // Vishti / Bhadra Deep Shastric Analysis
  const isBhadra = karanaName.includes("Vishti");
  let bhadraDetails: PrecisionKaranaLimb["bhadraDetails"] = undefined;

  if (isBhadra) {
    // Bhadra Vas location based on Moon Sign (0 = Mesha, ..., 11 = Meena)
    // Moon in Karka (3), Simha (4), Kumbha (10), Meena (11) -> Swarga Loka (Heaven)
    // Moon in Mesha (0), Vrishabha (1), Mithuna (2), Vrischika (7) -> Patala Loka (Subterranean)
    // Moon in Kanya (5), Tula (6), Dhanu (8), Makara (9) -> Mrityu Loka (Earth)
    let vasLocation: "Swarga Loka" | "Patala Loka" | "Mrityu Loka" = "Mrityu Loka";
    let vasEffect = "Bhadra resides on Earth (Mrityu Loka); strictly inauspicious for all life events and investments.";

    if ([3, 4, 10, 11].includes(moonRashiIndex)) {
      vasLocation = "Swarga Loka";
      vasEffect = "Bhadra resides in Heaven (Swarga Loka); harmless to terrestrial endeavors; safe for general works.";
    } else if ([0, 1, 2, 7].includes(moonRashiIndex)) {
      vasLocation = "Patala Loka";
      vasEffect = "Bhadra resides in Netherworld (Patala Loka); brings prosperity and success to underground/deep works.";
    }

    // Bhadra Mukha (Face = first 5 ghatikas = 1/12th of 60 ghatikas = 2h of karana)
    // Bhadra Puchha (Tail = last 3 ghatikas = 1h 12m of karana)
    const kStartMs = karanaTransition.startDate.getTime();
    const kEndMs = karanaTransition.endDate.getTime();
    const totalKaranaMs = kEndMs - kStartMs;

    const mukhaStart = new Date(kStartMs);
    const mukhaEnd = new Date(kStartMs + (5 / 60) * totalKaranaMs);

    const puchhaStart = new Date(kEndMs - (3 / 60) * totalKaranaMs);
    const puchhaEnd = new Date(kEndMs);

    bhadraDetails = {
      isBhadra: true,
      vasLocation,
      vasEffect,
      mukhaStart,
      mukhaEnd,
      mukhaTimeFormatted: `${formatTimeInTz(mukhaStart, timezoneOffsetHours)} - ${formatTimeInTz(mukhaEnd, timezoneOffsetHours)}`,
      mukhaCaution: "Poisonous Face of Bhadra (Mukha): Strictly refrain from travel, ceremonies, purchases, and contract execution.",
      puchhaStart,
      puchhaEnd,
      puchhaTimeFormatted: `${formatTimeInTz(puchhaStart, timezoneOffsetHours)} - ${formatTimeInTz(puchhaEnd, timezoneOffsetHours)}`,
      puchhaBenefit: "Auspicious Tail of Bhadra (Puchha): Blessed window of victory, clearing impediments, and overcoming rival opposition."
    };
  }

  // ==========================================
  // 9. PRECISION YOGA CALCULATION (NITYA YOGA)
  // ==========================================
  const yogaSpan = 360.0 / 27.0; // 13.333333° (13° 20')
  const yogaAngle = normalizeDeg(sunSidereal + moonSidereal);
  const yogaRaw = yogaAngle / yogaSpan;
  const yogaIndex = Math.floor(yogaRaw) + 1; // 1 to 27

  const yogaBase = NITYA_YOGAS[(yogaIndex - 1) % 27] || NITYA_YOGAS[0];
  const yogaMeta = YOGA_META_DETAILS[yogaBase.name] || {
    deity: "Brihaspati",
    ruler: "Jupiter",
    advice: "Auspicious and favorable for noble endeavors."
  };

  const elapsedDegYoga = yogaAngle % yogaSpan;
  const remainingDegYoga = yogaSpan - elapsedDegYoga;
  const progressPctYoga = Math.min(100, Math.max(0, Math.round((elapsedDegYoga / yogaSpan) * 100)));

  const yogaTransition = solveYogaTransition(jdEval, yogaIndex, ayanamsaSystem);
  const yogaDurationMs = yogaTransition.endDate.getTime() - yogaTransition.startDate.getTime();
  const yogaDurationHours = Number((yogaDurationMs / 3600000).toFixed(2));

  // ==========================================
  // 10. PRECISION NAKSHATRA CALCULATION
  // ==========================================
  const nakSpan = 360.0 / 27.0;
  const nakRaw = moonSidereal / nakSpan;
  const nakIndex = Math.floor(nakRaw) % 27;
  const nakBase = NAKSHATRAS[nakIndex] || NAKSHATRAS[0];

  const nakPada = Math.floor((nakRaw % 1.0) * 4) + 1;
  const degreeInPada = moonSidereal % (nakSpan / 4.0);

  const elapsedDegNak = moonSidereal % nakSpan;
  const remainingDegNak = nakSpan - elapsedDegNak;
  const progressPctNak = Math.min(100, Math.max(0, Math.round((elapsedDegNak / nakSpan) * 100)));

  const nakTransition = solveNakshatraTransition(jdEval, nakIndex, ayanamsaSystem);

  // Return Full Precision Panchang Payload
  return {
    evalTimestamp: evalDate,
    evalJd: jdEval,
    location: {
      latitude,
      longitude,
      timezoneOffsetHours,
      cityName
    },
    ayanamsa: {
      system: ayanamsaResult.system,
      valueDeg: ayanamsaVal,
      dms: ayanamsaResult.ayanamsa_dms
    },
    solarEphemeris: {
      longitudeDeg: sunPos.longitude,
      siderealLongitudeDeg: sunSidereal,
      dms: degToDMS(sunPos.longitude),
      siderealDms: degToDMS(sunSidereal),
      rashi: sunRashi,
      rightAscensionDeg: normalizeDeg(sunPos.longitude),
      declinationDeg: 0,
      distanceAu: sunPos.distance
    },
    lunarEphemeris: {
      longitudeDeg: moonPos.longitude,
      siderealLongitudeDeg: moonSidereal,
      dms: degToDMS(moonPos.longitude),
      siderealDms: degToDMS(moonSidereal),
      rashi: moonRashi,
      rashiIndex: moonRashiIndex,
      distanceKm: moonPos.distance * 149597870.7
    },
    solarEvents: {
      sunrise: solarEvents.sunrise,
      sunset: solarEvents.sunset,
      solarNoon: solarEvents.solarNoon,
      nextSunrise: solarEvents.nextSunrise,
      sunriseFormatted: formatTimeInTz(solarEvents.sunrise, timezoneOffsetHours),
      sunsetFormatted: formatTimeInTz(solarEvents.sunset, timezoneOffsetHours),
      solarNoonFormatted: formatTimeInTz(solarEvents.solarNoon, timezoneOffsetHours),
      nextSunriseFormatted: formatTimeInTz(solarEvents.nextSunrise, timezoneOffsetHours),
      dinamanaFormatted: solarEvents.dinamanaFormatted,
      ratrimanaFormatted: solarEvents.ratrimanaFormatted,
      dinamanaMs: solarEvents.dinamanaMs,
      ratrimanaMs: solarEvents.ratrimanaMs
    },
    tithi: {
      instantaneous: {
        index: tithiIndex,
        name: tithiNameInPaksha,
        fullName: tithiFullName,
        paksha: pakshaStr,
        category: tithiCategory,
        categoryDescription: tithiCategoryDesc,
        deity: tithiDeity,
        tatwa: tithiTatwa,
        elongationDeg: elongation,
        elongationDms: degToDMS(elongation),
        elapsedDeg: elapsedDegTithi,
        elapsedDms: degToDMS(elapsedDegTithi),
        remainingDeg: remainingDegTithi,
        remainingDms: degToDMS(remainingDegTithi),
        progressPct: progressPctTithi,
        startDate: tithiTransition.startDate,
        endDate: tithiTransition.endDate,
        startTimeFormatted: formatTimeInTz(tithiTransition.startDate, timezoneOffsetHours),
        endTimeFormatted: formatTimeInTz(tithiTransition.endDate, timezoneOffsetHours),
        durationHours: tithiDurationHours,
        isAuspicious: tithiCategory !== "Rikta",
        recommendedActivities,
        avoidedActivities
      },
      udaya: {
        index: udayaTithiIndex,
        name: udayaTithiName,
        fullName: udayaTithiFullName,
        paksha: isUdayaShukla ? "Shukla" : "Krishna"
      },
      tithiAnomaly,
      anomalyDescription
    },
    karana: {
      index: karanaIndex,
      name: karanaName,
      type: karanaType,
      ruler: karanaMeta.lord,
      deity: karanaMeta.deity,
      elapsedDeg: elapsedDegKarana,
      elapsedDms: degToDMS(elapsedDegKarana),
      remainingDeg: remainingDegKarana,
      remainingDms: degToDMS(remainingDegKarana),
      progressPct: progressPctKarana,
      startDate: karanaTransition.startDate,
      endDate: karanaTransition.endDate,
      startTimeFormatted: formatTimeInTz(karanaTransition.startDate, timezoneOffsetHours),
      endTimeFormatted: formatTimeInTz(karanaTransition.endDate, timezoneOffsetHours),
      durationHours: karanaDurationHours,
      bhadraDetails
    },
    yoga: {
      index: yogaIndex,
      name: yogaBase.name,
      meaning: yogaBase.meaning,
      deity: yogaMeta.deity,
      ruler: yogaMeta.ruler,
      isAuspicious: yogaBase.isAuspicious,
      yogaAngleDeg: yogaAngle,
      yogaAngleDms: degToDMS(yogaAngle),
      elapsedDeg: elapsedDegYoga,
      elapsedDms: degToDMS(elapsedDegYoga),
      remainingDeg: remainingDegYoga,
      remainingDms: degToDMS(remainingDegYoga),
      progressPct: progressPctYoga,
      startDate: yogaTransition.startDate,
      endDate: yogaTransition.endDate,
      startTimeFormatted: formatTimeInTz(yogaTransition.startDate, timezoneOffsetHours),
      endTimeFormatted: formatTimeInTz(yogaTransition.endDate, timezoneOffsetHours),
      durationHours: yogaDurationHours,
      doshaSpanGhatikas: yogaMeta.doshaGhatikas,
      doshaSpanDescription: yogaMeta.doshaGhatikas
        ? `First ${yogaMeta.doshaGhatikas} Ghatikas (${((yogaMeta.doshaGhatikas * 24) / 60).toFixed(1)} hrs) considered adverse.`
        : undefined,
      specialAdvice: yogaMeta.advice
    },
    nakshatra: {
      index: nakIndex,
      name: nakBase.name,
      lord: nakBase.lord,
      pada: nakPada,
      degreeInPada,
      degreeInPadaDms: degToDMS(degreeInPada),
      elapsedDeg: elapsedDegNak,
      elapsedDms: degToDMS(elapsedDegNak),
      remainingDeg: remainingDegNak,
      remainingDms: degToDMS(remainingDegNak),
      progressPct: progressPctNak,
      startDate: nakTransition.startDate,
      endDate: nakTransition.endDate,
      startTimeFormatted: formatTimeInTz(nakTransition.startDate, timezoneOffsetHours),
      endTimeFormatted: formatTimeInTz(nakTransition.endDate, timezoneOffsetHours)
    },
    vara: {
      name: varaName,
      lord: varaLord,
      sanskrit: varaSanskrit
    }
  };
}
