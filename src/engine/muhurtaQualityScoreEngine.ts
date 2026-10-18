// AstroNext Authoritative Muhurta Quality Score Engine
// Evaluates the real-time auspiciousness of any given moment for standard Vedic activities
// using classical weightings from Muhurta Chintamani, Brihat Samhita, and Kalaprakasika.

import { CityLocation, GLOBAL_CITIES } from "../utils/vedicAstronomicalEngine";
import { calculateAuthoritativePanchang } from "./panchangEngine";
import { detectSpecialMuhurtaYogas } from "./muhurtaRuleRegistryEngine";
import { NAKSHATRAS } from "./nakshatraEngine";

export type MuhurtaActivityKey =
  | "gold_purchase"
  | "business_launch"
  | "travel"
  | "property_purchase"
  | "vehicle_purchase"
  | "griha_pravesh"
  | "financial_investment"
  | "puja_homa"
  | "contract_signing"
  | "general_auspicious";

export interface ActivityDefinition {
  key: MuhurtaActivityKey;
  name: string;
  sanskritName: string;
  shortLabel: string;
  category: "WEALTH" | "COMMERCE" | "TRANSIT" | "REAL_ESTATE" | "SPIRITUAL" | "GENERAL";
  description: string;
  primaryKarakas: string[];
  favorableTithis: number[]; // 1..30
  favorableNakshatras: number[]; // 0..26
  favorableVaras: number[]; // 0=Sun .. 6=Sat
  prohibitedVaras: number[];
  favorableChoghadiya: string[];
  favorableHoras: string[];
  shastricRuleSummary: string;
}

export const MUHURTA_ACTIVITIES: ActivityDefinition[] = [
  {
    key: "gold_purchase",
    name: "Buying Gold, Jewelry & Assets",
    sanskritName: "स्वर्ण व आभूषण क्रय",
    shortLabel: "Buying Gold",
    category: "WEALTH",
    description: "Purchase of gold jewelry, bullion, precious gemstones, and long-term tangible wealth.",
    primaryKarakas: ["Guru (Jupiter)", "Shukra (Venus)", "Surya (Sun)"],
    // Pushya (7) is king of gold purchases. Rohini(3), Hasta(12), Chitra(13), Swati(14), Anuradha(16), Revati(26), Ashwini(0)
    favorableNakshatras: [0, 3, 7, 11, 12, 13, 14, 16, 20, 21, 26],
    // Dwitiya, Tritiya, Panchami, Saptami, Dashami, Ekadashi, Trayodashi, Purnima
    favorableTithis: [2, 3, 5, 7, 10, 11, 13, 15, 17, 18, 20, 22, 25, 26, 28],
    // Thursday (Guru) & Friday (Shukra) are supreme; Sunday, Monday, Wednesday also good
    favorableVaras: [0, 1, 3, 4, 5],
    prohibitedVaras: [2], // Tuesday strictly avoided for buying gold
    favorableChoghadiya: ["Amrit", "Shubh", "Labh"],
    favorableHoras: ["Guru", "Shukra", "Budha", "Surya"],
    shastricRuleSummary: "Pushya nakshatra or Guru/Shukra hora creates an unbreakable bond of prosperity (Dhana Vriddhi). Tuesday and Rikta tithis are strictly avoided."
  },
  {
    key: "business_launch",
    name: "Starting a Business & Shop Opening",
    sanskritName: "व्यापार / दुकान आरम्भ",
    shortLabel: "Starting Business",
    category: "COMMERCE",
    description: "Inaugurating commercial enterprises, launching startups, retail shops, or signing major ventures.",
    primaryKarakas: ["Budha (Mercury)", "Guru (Jupiter)", "Shukra (Venus)"],
    favorableNakshatras: [0, 3, 4, 7, 11, 12, 13, 14, 16, 20, 21, 22, 23, 25, 26],
    favorableTithis: [2, 3, 5, 7, 10, 11, 13, 15],
    favorableVaras: [1, 3, 4, 5], // Mon, Wed, Thu, Fri
    prohibitedVaras: [2, 6], // Tue, Sat avoided
    favorableChoghadiya: ["Labh", "Shubh", "Amrit"],
    favorableHoras: ["Budha", "Guru", "Shukra"],
    shastricRuleSummary: "Commercial initiatives prosper under Mercury (Budha) or Jupiter (Guru) hour during waxing Shukla Paksha. Sthira and Chara lagnas confer longevity."
  },
  {
    key: "travel",
    name: "Journey & Long Distance Travel (Yatra)",
    sanskritName: "यात्रा / विदेश गमन",
    shortLabel: "Travel & Journey",
    category: "TRANSIT",
    description: "Embarking on business travel, overseas relocation, flights, or pilgrimage.",
    primaryKarakas: ["Chandra (Moon)", "Budha (Mercury)"],
    // Ashwini(0), Mrigashira(4), Punarvasu(6), Pushya(7), Hasta(12), Anuradha(16), Shravana(21), Dhanishta(22), Revati(26)
    favorableNakshatras: [0, 3, 4, 6, 7, 11, 12, 14, 16, 20, 21, 25, 26],
    favorableTithis: [2, 3, 5, 7, 10, 11, 13],
    favorableVaras: [1, 3, 4, 5], // Mon, Wed, Thu, Fri
    prohibitedVaras: [2, 6], // Tuesday, Saturday avoided
    favorableChoghadiya: ["Chara", "Amrit", "Shubh"],
    favorableHoras: ["Chandra", "Budha", "Guru", "Shukra"],
    shastricRuleSummary: "Requires Chara (movable) or Laghu (swift) nakshatras. Rahu Kalam and Yamagandam must be completely avoided before crossing city borders."
  },
  {
    key: "property_purchase",
    name: "Property Purchase & Registration",
    sanskritName: "सम्पत्ति क्रय व रजिस्ट्री",
    shortLabel: "Property Purchase",
    category: "REAL_ESTATE",
    description: "Purchase of real estate, residential homes, commercial land, and deed execution.",
    primaryKarakas: ["Mangala (Mars - Bhumi)", "Guru (Jupiter)", "Shani (Saturn - longevity)"],
    favorableNakshatras: [0, 3, 4, 7, 11, 12, 13, 14, 16, 20, 21, 25, 26],
    favorableTithis: [1, 2, 3, 5, 6, 7, 10, 11, 12, 13, 15],
    favorableVaras: [1, 3, 4, 5],
    prohibitedVaras: [2],
    favorableChoghadiya: ["Shubh", "Amrit", "Labh"],
    favorableHoras: ["Guru", "Shukra", "Budha"],
    shastricRuleSummary: "Sthira (fixed) nakshatras like Rohini or Uttara Phalguni guarantee stability and peace of mind in real estate ownership."
  },
  {
    key: "vehicle_purchase",
    name: "Vehicle Purchase & Delivery (Vahan)",
    sanskritName: "वाहन क्रय व सुपुर्दगी",
    shortLabel: "Vehicle Purchase",
    category: "TRANSIT",
    description: "Booking, buying, or taking delivery of cars, two-wheelers, or commercial transports.",
    primaryKarakas: ["Shukra (Venus - Vahanakaraka)", "Chandra (Moon)"],
    favorableNakshatras: [0, 3, 4, 6, 7, 12, 13, 14, 16, 21, 22, 23, 26],
    favorableTithis: [2, 3, 5, 7, 10, 11, 12, 13, 15],
    favorableVaras: [0, 1, 3, 4, 5],
    prohibitedVaras: [2, 6],
    favorableChoghadiya: ["Amrit", "Shubh", "Chara", "Labh"],
    favorableHoras: ["Shukra", "Guru", "Budha", "Chandra"],
    shastricRuleSummary: "Venus (Shukra) governs vehicular conveyances. Chara or Laghu constellations impart swift, safe transit without mechanical accidents."
  },
  {
    key: "griha_pravesh",
    name: "Griha Pravesh (Housewarming)",
    sanskritName: "गृह प्रवेश संस्कार",
    shortLabel: "Griha Pravesh",
    category: "REAL_ESTATE",
    description: "Inauguration and initial auspicious ritual entry into a new or remodeled home.",
    primaryKarakas: ["Surya (Sun)", "Guru (Jupiter)", "Shukra (Venus)"],
    favorableNakshatras: [3, 4, 7, 11, 12, 13, 16, 20, 21, 22, 23, 25, 26],
    favorableTithis: [2, 3, 5, 7, 10, 11, 12, 13, 15],
    favorableVaras: [1, 3, 4, 5],
    prohibitedVaras: [0, 2],
    favorableChoghadiya: ["Amrit", "Shubh"],
    favorableHoras: ["Guru", "Shukra", "Chandra"],
    shastricRuleSummary: "Eliminates Rahu Kalam, Durmuhurta, and Bhadra. Sthira signs in Lagna ensure enduring harmony, health, and familial joy."
  },
  {
    key: "financial_investment",
    name: "Financial Investment & Capital Allocation",
    sanskritName: "निवेश व पूँजी विनियोग",
    shortLabel: "Investment & Stocks",
    category: "WEALTH",
    description: "Signing major investment contracts, capital allocations, stock purchases, or treasury deposits.",
    primaryKarakas: ["Guru (Jupiter - Dhana)", "Budha (Mercury - Commerce)"],
    favorableNakshatras: [0, 3, 7, 11, 12, 13, 14, 16, 20, 21, 26],
    favorableTithis: [2, 3, 5, 7, 10, 11, 13, 15],
    favorableVaras: [1, 3, 4, 5],
    prohibitedVaras: [2, 6],
    favorableChoghadiya: ["Labh", "Amrit", "Shubh"],
    favorableHoras: ["Guru", "Budha", "Shukra"],
    shastricRuleSummary: "Labha Choghadiya and Guru/Budha hora ensure dividend growth and financial preservation. Avoid Tuesday and Saturday."
  },
  {
    key: "puja_homa",
    name: "Maha Puja, Yajna & Havan",
    sanskritName: "महा पूजा व यज्ञ / अनुष्ठान",
    shortLabel: "Puja & Sadhana",
    category: "SPIRITUAL",
    description: "Performing sacred Vedic fire ceremonies, temple rituals, mantra initiations, or deity worship.",
    primaryKarakas: ["Guru (Jupiter)", "Surya (Sun)", "Chandra (Moon)"],
    favorableNakshatras: [0, 2, 3, 4, 6, 7, 11, 12, 13, 14, 16, 20, 21, 25, 26],
    favorableTithis: [1, 2, 3, 5, 7, 8, 10, 11, 13, 14, 15],
    favorableVaras: [0, 1, 2, 3, 4, 5, 6], // All days permitted for devotional puja
    prohibitedVaras: [],
    favorableChoghadiya: ["Amrit", "Shubh", "Labh"],
    favorableHoras: ["Surya", "Guru", "Chandra", "Shukra"],
    shastricRuleSummary: "Brahma Muhurta (pre-dawn) and Abhijit Muhurta (noon) multiply devotional merit tenfold and dissolve negative planetary karma."
  },
  {
    key: "contract_signing",
    name: "Contract Signing & Legal Execution",
    sanskritName: "अनुबन्ध हस्ताक्षर व विधिक कार्य",
    shortLabel: "Contract Signing",
    category: "COMMERCE",
    description: "Execution of binding contracts, official filings, leases, and agreements.",
    primaryKarakas: ["Budha (Mercury)", "Guru (Jupiter)"],
    favorableNakshatras: [0, 3, 4, 6, 7, 11, 12, 14, 16, 20, 21, 25, 26],
    favorableTithis: [2, 3, 5, 7, 10, 11, 13, 15],
    favorableVaras: [1, 3, 4, 5],
    prohibitedVaras: [2, 6],
    favorableChoghadiya: ["Shubh", "Labh", "Amrit"],
    favorableHoras: ["Budha", "Guru", "Shukra"],
    shastricRuleSummary: "Must strictly avoid Vishti (Bhadra) karana to prevent litigious friction and contractual breach."
  },
  {
    key: "general_auspicious",
    name: "General Auspicious Undertaking (Sarva Shubh)",
    sanskritName: "सामान्य शुभ कार्य",
    shortLabel: "General Auspicious",
    category: "GENERAL",
    description: "Any positive personal milestone, starting a new project, or seeking auspiciousness in daily life.",
    primaryKarakas: ["Guru (Jupiter)", "Shukra (Venus)", "Surya (Sun)"],
    favorableNakshatras: [0, 3, 4, 6, 7, 11, 12, 13, 14, 16, 20, 21, 25, 26],
    favorableTithis: [2, 3, 5, 7, 10, 11, 12, 13, 15],
    favorableVaras: [0, 1, 3, 4, 5],
    prohibitedVaras: [],
    favorableChoghadiya: ["Amrit", "Shubh", "Labh"],
    favorableHoras: ["Guru", "Shukra", "Budha", "Surya"],
    shastricRuleSummary: "Evaluated against foundational Vedic pillars: elimination of Rikta tithis, Bhadra karana, and Rahu Kalam."
  }
];

export type QualityTier = "UTTAMA" | "SHUBH" | "MADHYAMA" | "SADHARANA" | "VARJYA";

export interface MuhurtaScoreFactor {
  name: string;
  category: "Tithi" | "Nakshatra" | "Vara" | "YogaKarana" | "Doshas" | "HoraChoghadiya" | "SpecialBlessings";
  weightMax: number;
  score: number;
  status: "favorable" | "neutral" | "caution" | "severe";
  description: string;
  classicalRule: string;
}

export interface MuhurtaQualityScoreResult {
  activityKey: MuhurtaActivityKey;
  activityName: string;
  activitySanskritName: string;
  activityDescription: string;
  targetDate: string;
  targetTimeStr: string;
  timestamp: Date;
  city: CityLocation;
  
  // Total Score (0 to 100)
  totalScore: number;
  qualityTier: QualityTier;
  qualityLabel: string;
  verdictText: string;
  
  // Vedic Weightings Breakdown (Standard 6 Pillars + Special Bonus)
  factors: MuhurtaScoreFactor[];
  categoryBreakdown: {
    tithi: { score: number; max: number; label: string; name: string };
    nakshatra: { score: number; max: number; label: string; name: string };
    vara: { score: number; max: number; label: string; name: string };
    yogaKarana: { score: number; max: number; label: string; yogaName: string; karanaName: string };
    doshas: { score: number; max: number; label: string; activeDoshas: string[] };
    horaChoghadiya: { score: number; max: number; label: string; horaLord: string; choghadiyaName: string };
    specialBonus: { score: number; activeYogas: string[] };
  };
  
  // Real-time active doshas / blessings
  activeInauspiciousWindows: Array<{ name: string; timeRange: string; reason: string }>;
  activeAuspiciousWindows: Array<{ name: string; timeRange: string; reason: string }>;
  
  // Next best window
  nextAuspiciousWindow: {
    timeRange: string;
    startsInMinutes: number;
    predictedScore: number;
    description: string;
  } | null;
  
  // 24-hour progression curve
  hourlyScoresToday: Array<{
    hour: number;
    timeLabel: string;
    score: number;
    tier: QualityTier;
    isCurrentHour: boolean;
  }>;
  
  // Cross-activity comparison at this exact moment
  allActivitiesScores: Array<{
    activityKey: MuhurtaActivityKey;
    activityName: string;
    score: number;
    tier: QualityTier;
    statusLabel: string;
  }>;
  
  shastricGuidance: string[];
  mitigations: string[];
}

export class MuhurtaQualityScoreEngine {
  /**
   * Helper to parse time strings like "10:30 AM" into minutes from start of day (0..1439)
   */
  public static timeStringToMinutes(timeStr: string): number | null {
    if (!timeStr) return null;
    const clean = timeStr.trim();
    const isPM = clean.toUpperCase().includes("PM");
    const isAM = clean.toUpperCase().includes("AM");
    const digitsOnly = clean.replace(/[APMapm\s]/g, "");
    const parts = digitsOnly.split(":");
    if (parts.length < 2) return null;
    let hh = parseInt(parts[0], 10) || 0;
    const mm = parseInt(parts[1], 10) || 0;
    if (isPM && hh < 12) hh += 12;
    if (isAM && hh === 12) hh = 0;
    return hh * 60 + mm;
  }

  /**
   * Checks whether a given minute of the day falls within a range string like "10:30 AM - 12:00 PM"
   */
  public static isMinuteInRange(minuteOfDay: number, rangeStr: string): boolean {
    if (!rangeStr || !rangeStr.includes("-")) return false;
    const parts = rangeStr.split("-");
    if (parts.length < 2) return false;
    const startMin = this.timeStringToMinutes(parts[0]);
    const endMin = this.timeStringToMinutes(parts[1]);
    if (startMin === null || endMin === null) return false;

    if (startMin <= endMin) {
      return minuteOfDay >= startMin && minuteOfDay < endMin;
    } else {
      // Over midnight
      return minuteOfDay >= startMin || minuteOfDay < endMin;
    }
  }

  /**
   * Evaluates the Muhurta Quality Score for a specific activity at a given time and location.
   */
  public static calculateMuhurtaQualityScore(params: {
    activityKey: MuhurtaActivityKey;
    date: Date;
    city: CityLocation;
  }): MuhurtaQualityScoreResult {
    const { activityKey, date, city } = params;

    const activity = MUHURTA_ACTIVITIES.find(a => a.key === activityKey) || MUHURTA_ACTIVITIES[0];

    // Compute authoritative ephemeris panchang for this date and location
    const panchang = calculateAuthoritativePanchang({
      date,
      latitude: city.latitude,
      longitude: city.longitude,
      timezoneOffsetHours: city.timezoneOffsetHours
    });

    const dateStr = panchang.dateStr || date.toISOString().split("T")[0];
    const targetHour = date.getHours();
    const targetMinute = date.getMinutes();
    const minuteOfDay = targetHour * 60 + targetMinute;

    const ampm = targetHour >= 12 ? "PM" : "AM";
    const displayH = targetHour % 12 === 0 ? 12 : targetHour % 12;
    const targetTimeStr = `${String(displayH).padStart(2, "0")}:${String(targetMinute).padStart(2, "0")} ${ampm}`;

    const dayOfWeekIdx = date.getDay(); // 0=Sun .. 6=Sat
    const currentTithiIdx = panchang.currentTithi?.index || panchang.udayaTithi?.index || 1;
    const nakName = panchang.nakshatra || "Ashwini";
    const nakIdx = Math.max(0, NAKSHATRAS.findIndex(n => n.name.toLowerCase() === nakName.toLowerCase()));

    // -------------------------------------------------------------
    // PILLAR 1: TITHI WEIGHTING (15 points max)
    // -------------------------------------------------------------
    let tithiScore = 8; // Neutral baseline
    let tithiStatus: "favorable" | "neutral" | "caution" | "severe" = "neutral";
    let tithiDesc = `Neutral Tithi: ${panchang.tithi}`;
    const isRikta = [4, 9, 14, 19, 24, 29].includes(currentTithiIdx);
    const isAmavasya = currentTithiIdx === 30;

    if (activity.favorableTithis.includes(currentTithiIdx)) {
      tithiScore = 15;
      tithiStatus = "favorable";
      tithiDesc = `Favorable Tithi (${panchang.tithi}) aligns with classical recommendations for ${activity.shortLabel}.`;
    } else if (isRikta) {
      tithiScore = 2;
      tithiStatus = "severe";
      tithiDesc = `Rikta Tithi (${panchang.tithi} — 4th, 9th, or 14th) generates destruction of initial efforts.`;
    } else if (isAmavasya) {
      tithiScore = activityKey === "puja_homa" ? 10 : 0;
      tithiStatus = activityKey === "puja_homa" ? "neutral" : "severe";
      tithiDesc = `Amavasya (New Moon) is classical dark phase; avoided for material expansion.`;
    } else {
      tithiScore = 8;
      tithiStatus = "neutral";
      tithiDesc = `Tithi ${panchang.tithi} provides average general support.`;
    }

    // -------------------------------------------------------------
    // PILLAR 2: NAKSHATRA WEIGHTING (20 points max)
    // -------------------------------------------------------------
    let nakScore = 10; // Baseline
    let nakStatus: "favorable" | "neutral" | "caution" | "severe" = "neutral";
    let nakDesc = `Nakshatra ${nakName} provides moderate support.`;

    // Special star checks: Pushya for gold, etc.
    const isExaltedStarForActivity = (activityKey === "gold_purchase" && nakIdx === 7) ||
      (activityKey === "business_launch" && (nakIdx === 7 || nakIdx === 12)) ||
      (activityKey === "travel" && (nakIdx === 0 || nakIdx === 7 || nakIdx === 21));

    if (isExaltedStarForActivity) {
      nakScore = 20;
      nakStatus = "favorable";
      nakDesc = `Exalted Asterism: ${nakName} is the sovereign star for ${activity.shortLabel}. Bestows lasting success.`;
    } else if (activity.favorableNakshatras.includes(nakIdx)) {
      nakScore = 17;
      nakStatus = "favorable";
      nakDesc = `Auspicious Nakshatra: ${nakName} (${panchang.nakshatraLord || "Lord"}) is classified as auspicious for this undertaking.`;
    } else {
      // Tikshna/Ugra stars
      const isUgraOrTikshna = [1, 2, 8, 9, 10, 17, 18, 19].includes(nakIdx);
      if (isUgraOrTikshna && activityKey !== "puja_homa") {
        nakScore = 4;
        nakStatus = "caution";
        nakDesc = `Tikshna/Ugra Nakshatra: ${nakName} carries sharp or aggressive energy, discordant with gentle starts.`;
      } else {
        nakScore = 10;
        nakStatus = "neutral";
        nakDesc = `Nakshatra ${nakName} provides neutral planetary support.`;
      }
    }

    // -------------------------------------------------------------
    // PILLAR 3: VARA / WEEKDAY WEIGHTING (10 points max)
    // -------------------------------------------------------------
    let varaScore = 5;
    let varaStatus: "favorable" | "neutral" | "caution" | "severe" = "neutral";
    let varaDesc = `Weekday ${panchang.vara} has standard neutral bearing.`;

    if (activity.prohibitedVaras.includes(dayOfWeekIdx)) {
      varaScore = 1;
      varaStatus = "severe";
      varaDesc = `Prohibited Weekday: ${panchang.vara} is classical contraindication for ${activity.shortLabel}.`;
    } else if (activity.favorableVaras.includes(dayOfWeekIdx)) {
      varaScore = 10;
      varaStatus = "favorable";
      varaDesc = `Benefic Weekday: ${panchang.vara} is ruled by a supportive celestial deity.`;
    } else {
      varaScore = 6;
      varaStatus = "neutral";
      varaDesc = `Weekday ${panchang.vara} has ordinary compatibility.`;
    }

    // -------------------------------------------------------------
    // PILLAR 4: YOGA & KARANA WEIGHTING (15 points max: 7.5 Yoga + 7.5 Karana)
    // -------------------------------------------------------------
    let yogaScore = 4;
    let yogaStatus: "favorable" | "neutral" | "caution" | "severe" = "neutral";
    let yogaDesc = `Yoga ${panchang.yoga} provides neutral flow.`;

    const yogaName = panchang.yoga || "";
    const MALIFIC_YOGAS = ["Vishkambha", "Atiganda", "Shula", "Ganda", "Vyaghata", "Vajra", "Vyatipata", "Parigha", "Vaidhriti"];
    const isMaleficYoga = MALIFIC_YOGAS.some(my => yogaName.toLowerCase().includes(my.toLowerCase()));
    const AUSPICIOUS_YOGAS = ["Siddha", "Sadhya", "Shubha", "Sukarma", "Shiva", "Dhriti", "Vriddhi", "Harshana", "Brahma", "Indra"];
    const isAuspiciousYoga = AUSPICIOUS_YOGAS.some(ay => yogaName.toLowerCase().includes(ay.toLowerCase()));

    if (isMaleficYoga) {
      yogaScore = 1;
      yogaStatus = "severe";
      yogaDesc = `Inauspicious Nitya Yoga: ${yogaName} generates subtle obstruction and discord.`;
    } else if (isAuspiciousYoga) {
      yogaScore = 7.5;
      yogaStatus = "favorable";
      yogaDesc = `Auspicious Nitya Yoga: ${yogaName} confers harmony and divine grace.`;
    } else {
      yogaScore = 4.5;
      yogaStatus = "neutral";
      yogaDesc = `Nitya Yoga: ${yogaName} is acceptable.`;
    }

    let karanaScore = 4;
    let karanaStatus: "favorable" | "neutral" | "caution" | "severe" = "neutral";
    let karanaDesc = `Karana ${panchang.karana} is acceptable.`;
    const karanaName = panchang.karana || "";
    const isVishtiBhadra = karanaName.includes("Vishti") || karanaName.includes("Bhadra");

    if (isVishtiBhadra) {
      karanaScore = 0;
      karanaStatus = "severe";
      karanaDesc = `Vishti / Bhadra Karana is active! Causes obstruction and spoils the fruits of auspicious starts.`;
    } else if (["Bava", "Balava", "Kaulava", "Taitila", "Garija", "Vanija"].some(bk => karanaName.includes(bk))) {
      karanaScore = 7.5;
      karanaStatus = "favorable";
      karanaDesc = `Benefic Movable Karana: ${karanaName} supports growth and commercial prosperity.`;
    } else {
      karanaScore = 4.5;
      karanaStatus = "neutral";
      karanaDesc = `Fixed/Neutral Karana: ${karanaName}.`;
    }

    const yogaKaranaTotalScore = Math.min(15, yogaScore + karanaScore);

    // -------------------------------------------------------------
    // PILLAR 5: MUHURTA DOSHAS & KALA EXCLUSIONS (25 points max baseline)
    // -------------------------------------------------------------
    let doshaScore = 25;
    const activeInauspiciousWindows: Array<{ name: string; timeRange: string; reason: string }> = [];
    const activeDoshasList: string[] = [];

    // Rahu Kalam check
    const isRahuActive = this.isMinuteInRange(minuteOfDay, panchang.rahuKala || "");
    if (isRahuActive) {
      doshaScore -= 25; // Complete deduction!
      activeDoshasList.push("Rahu Kalam");
      activeInauspiciousWindows.push({
        name: "Rahu Kalam (Active Right Now)",
        timeRange: panchang.rahuKala || "",
        reason: "Strictly prohibited for inaugurations, contracts, financial deals, and travel departure."
      });
    }

    // Yamagandam check
    const isYamaActive = this.isMinuteInRange(minuteOfDay, panchang.yamaganda || "");
    if (isYamaActive) {
      doshaScore -= 18;
      activeDoshasList.push("Yamagandam");
      activeInauspiciousWindows.push({
        name: "Yamagandam (Active Right Now)",
        timeRange: panchang.yamaganda || "",
        reason: "Adverse solar segment governed by Ketu/Yama; causes loss and unfulfilled ventures."
      });
    }

    // Durmuhurtam check
    const isDurActive = this.isMinuteInRange(minuteOfDay, panchang.durmuhurta || "");
    if (isDurActive) {
      doshaScore -= 20;
      activeDoshasList.push("Durmuhurta");
      activeInauspiciousWindows.push({
        name: "Durmuhurta (Active Right Now)",
        timeRange: panchang.durmuhurta || "",
        reason: "Afflicted 1/15th day division causing friction and unexpected setbacks."
      });
    }

    // Gulika check
    const isGulikaActive = this.isMinuteInRange(minuteOfDay, panchang.gulikaKala || "");
    if (isGulikaActive) {
      doshaScore -= 10;
      activeDoshasList.push("Gulika Kalam");
      activeInauspiciousWindows.push({
        name: "Gulika Kalam (Active Right Now)",
        timeRange: panchang.gulikaKala || "",
        reason: "Saturnian shadow division; initiates delays and repetitive toil."
      });
    }

    // Varjyam check
    const isVarjyamActive = this.isMinuteInRange(minuteOfDay, panchang.varjyam || "");
    if (isVarjyamActive) {
      doshaScore -= 20;
      activeDoshasList.push("Varjyam (Visha Ghatika)");
      activeInauspiciousWindows.push({
        name: "Varjyam / Visha Ghatika (Active Right Now)",
        timeRange: panchang.varjyam || "",
        reason: "Poisonous asterism segment; completely devoid of auspiciousness."
      });
    }

    doshaScore = Math.max(0, doshaScore);
    const doshaStatus: "favorable" | "neutral" | "caution" | "severe" =
      doshaScore >= 22 ? "favorable" : doshaScore >= 12 ? "caution" : "severe";

    // -------------------------------------------------------------
    // PILLAR 6: CURRENT HORA & CHOGHADIYA (15 points max: 7.5 Hora + 7.5 Choghadiya)
    // -------------------------------------------------------------
    // Find active Hora for target time
    const allHoras = panchang.horas || [];
    let activeHora = allHoras.find(h => {
      const s = h.startTime instanceof Date ? h.startTime : new Date(h.startTime);
      const e = h.endTime instanceof Date ? h.endTime : new Date(h.endTime);
      return date >= s && date < e;
    }) || allHoras[0];

    // Find active Choghadiya
    const dayChogs = panchang.choghadiya?.day || [];
    const nightChogs = panchang.choghadiya?.night || [];
    const allChogs = [...dayChogs, ...nightChogs];
    let activeChog = allChogs.find(c => {
      const s = c.startTime instanceof Date ? c.startTime : new Date(c.startTime);
      const e = c.endTime instanceof Date ? c.endTime : new Date(c.endTime);
      return date >= s && date < e;
    }) || dayChogs[0];

    const horaLord = activeHora?.lord || "Surya";
    const chogNature = activeChog?.nature || "Shubh";
    const chogName = activeChog?.name || "Shubh";

    let horaScore = 4;
    let horaStatus: "favorable" | "neutral" | "caution" | "severe" = "neutral";
    if (["Guru", "Jupiter", "Shukra", "Venus", "Budha", "Mercury"].some(b => horaLord.includes(b))) {
      horaScore = 7.5;
      horaStatus = "favorable";
    } else if (horaLord.includes("Chandra") || horaLord.includes("Moon") || horaLord.includes("Surya") || horaLord.includes("Sun")) {
      horaScore = 5.5;
      horaStatus = "neutral";
    } else {
      horaScore = 2.5;
      horaStatus = "caution";
    }

    let chogScore = 4;
    let chogStatus: "favorable" | "neutral" | "caution" | "severe" = "neutral";
    if (chogNature === "Amrit") {
      chogScore = 7.5;
      chogStatus = "favorable";
    } else if (chogNature === "Shubh") {
      chogScore = 7.0;
      chogStatus = "favorable";
    } else if (chogNature === "Labh") {
      chogScore = 6.5;
      chogStatus = "favorable";
    } else if (chogNature === "Chara" || chogNature === "Chal") {
      chogScore = activityKey === "travel" ? 7.5 : 4.5;
      chogStatus = activityKey === "travel" ? "favorable" : "neutral";
    } else if (chogNature === "Rog") {
      chogScore = 1.0;
      chogStatus = "severe";
    } else if (chogNature === "Kaal") {
      chogScore = 0.5;
      chogStatus = "severe";
    } else if (chogNature === "Udveg") {
      chogScore = 1.0;
      chogStatus = "severe";
    }

    const horaChogTotalScore = Math.min(15, horaScore + chogScore);

    // -------------------------------------------------------------
    // PILLAR 7: SPECIAL VEDIC YOGAS & BLESSINGS (+ Bonus up to 20 pts)
    // -------------------------------------------------------------
    let specialBonus = 0;
    const activeSpecialYogas: string[] = [];
    const activeAuspiciousWindows: Array<{ name: string; timeRange: string; reason: string }> = [];

    // Abhijit Muhurta check
    const isAbhijitActive = this.isMinuteInRange(
      minuteOfDay,
      panchang.abhijitMuhurta || `${panchang.abhijitStartStr} - ${panchang.abhijitEndStr}`
    );
    if (isAbhijitActive && dayOfWeekIdx !== 3) { // Abhijit not considered on Wednesday
      specialBonus += 15;
      activeSpecialYogas.push("Abhijit Muhurta");
      activeAuspiciousWindows.push({
        name: "Abhijit Muhurta (Solar Meridian Blessing)",
        timeRange: panchang.abhijitMuhurta || `${panchang.abhijitStartStr} - ${panchang.abhijitEndStr}`,
        reason: "Highest midday auspiciousness; Vishnu's divine grace destroys 100,000 minor doshas."
      });
    }

    // Brahma Muhurta check
    const isBrahmaActive = this.isMinuteInRange(
      minuteOfDay,
      panchang.brahmaMuhurta || `${panchang.brahmaStartStr} - ${panchang.brahmaEndStr}`
    );
    if (isBrahmaActive) {
      specialBonus += activityKey === "puja_homa" ? 18 : 10;
      activeSpecialYogas.push("Brahma Muhurta");
      activeAuspiciousWindows.push({
        name: "Brahma Muhurta (Pre-Dawn Creator's Window)",
        timeRange: panchang.brahmaMuhurta || `${panchang.brahmaStartStr} - ${panchang.brahmaEndStr}`,
        reason: "Sattvic clarity; supreme window for meditation, japa, and spiritual initiation."
      });
    }

    // Detect classic special yogas (Guru Pushya, Ravi Pushya, Sarvartha Siddhi, etc.)
    const dailyYogas = detectSpecialMuhurtaYogas({
      dayOfWeekIdx,
      nakshatraIdx: nakIdx,
      tithiIdx: currentTithiIdx
    });

    dailyYogas.forEach(yoga => {
      if (yoga.includes("Guru Pushya")) {
        specialBonus += 25;
        activeSpecialYogas.push("Guru Pushya Yoga");
        activeAuspiciousWindows.push({
          name: "Guru Pushya Yoga Active Today",
          timeRange: "Entire Star Duration",
          reason: "Supreme King of Muhurtas; guarantees unshakeable prosperity and long-term abundance."
        });
      } else if (yoga.includes("Ravi Pushya")) {
        specialBonus += 20;
        activeSpecialYogas.push("Ravi Pushya Yoga");
        activeAuspiciousWindows.push({
          name: "Ravi Pushya Yoga Active Today",
          timeRange: "Entire Star Duration",
          reason: "Solar royal yoga for acquiring gold, gemstones, and foundational wealth."
        });
      } else if (yoga.includes("Sarvartha Siddhi")) {
        specialBonus += 12;
        activeSpecialYogas.push("Sarvartha Siddhi Yoga");
        activeAuspiciousWindows.push({
          name: "Sarvartha Siddhi Yoga Active Today",
          timeRange: "Active Nakshatra Segment",
          reason: "Fulfiller of all undertakings; guarantees positive fruition of honest initiatives."
        });
      } else if (yoga.includes("Amrit Siddhi")) {
        specialBonus += 14;
        activeSpecialYogas.push("Amrit Siddhi Yoga");
        activeAuspiciousWindows.push({
          name: "Amrit Siddhi Yoga Active Today",
          timeRange: "Active Nakshatra Segment",
          reason: "Nectar of stability; preserves longevity and eliminates financial ruin."
        });
      }
    });

    // -------------------------------------------------------------
    // SUMMATION & QUALITY TIER COMPUTATION
    // -------------------------------------------------------------
    const basePillarsScore = tithiScore + nakScore + varaScore + yogaKaranaTotalScore + doshaScore + horaChogTotalScore;
    let finalScore = Math.min(100, Math.round(basePillarsScore + specialBonus));

    // Hard exclusion penalty: If Rahu Kalam is active right now and activity is not spiritual puja, clamp score to max 35!
    if (isRahuActive && activityKey !== "puja_homa") {
      finalScore = Math.min(34, finalScore);
    }
    // Vishti / Bhadra penalty: If Bhadra is active right now and activity is commercial/travel/gold, clamp score to max 38!
    if (isVishtiBhadra && (activityKey === "gold_purchase" || activityKey === "business_launch" || activityKey === "travel" || activityKey === "contract_signing")) {
      finalScore = Math.min(38, finalScore);
    }

    finalScore = Math.max(0, Math.min(100, finalScore));

    let qualityTier: QualityTier = "SADHARANA";
    let qualityLabel = "Moderate / Neutral";
    if (finalScore >= 85) {
      qualityTier = "UTTAMA";
      qualityLabel = "Uttama (Supremely Auspicious)";
    } else if (finalScore >= 70) {
      qualityTier = "SHUBH";
      qualityLabel = "Shubh (Highly Auspicious)";
    } else if (finalScore >= 50) {
      qualityTier = "MADHYAMA";
      qualityLabel = "Madhyama (Moderately Favorable)";
    } else if (finalScore >= 35) {
      qualityTier = "SADHARANA";
      qualityLabel = "Sadharana (Mixed / Cautionary)";
    } else {
      qualityTier = "VARJYA";
      qualityLabel = "Varjya (Prohibited / Inauspicious)";
    }

    // Verdict sentence
    let verdictText = "";
    if (isRahuActive) {
      verdictText = `Rahu Kalam is currently active (${panchang.rahuKala}). Shastras strictly advise postponing ${activity.shortLabel.toLowerCase()} until this window passes.`;
    } else if (isVishtiBhadra) {
      verdictText = `Vishti (Bhadra) Karana is active. Commercial transactions and travel should be paused to avoid contractual disputes.`;
    } else if (isAbhijitActive) {
      verdictText = `Abhijit Muhurta is active! Solar midday blessing overcomes minor faults; exceptionally potent for ${activity.shortLabel.toLowerCase()}.`;
    } else if (finalScore >= 85) {
      verdictText = `Superb planetary alignment. Tithi, Nakshatra, and current Hora (${horaLord}) shower unreserved blessings on ${activity.shortLabel.toLowerCase()}.`;
    } else if (finalScore >= 70) {
      verdictText = `Auspicious window. Supported by favorable lunar mansions and benefic Choghadiya (${chogName}). Recommended to proceed.`;
    } else if (finalScore >= 50) {
      verdictText = `Acceptable average time. Minor planetary frictions exist; perform Lord Ganesha invocation before proceeding.`;
    } else {
      verdictText = `Current temporal vibration is afflicted. Postpone important steps until the next Shubh window.`;
    }

    // Detailed factors array for the UI breakdown table
    const factors: MuhurtaScoreFactor[] = [
      {
        name: "Tithi (Lunar Day)",
        category: "Tithi",
        weightMax: 15,
        score: tithiScore,
        status: tithiStatus,
        description: tithiDesc,
        classicalRule: `Classical rule: Rikta tithis (4, 9, 14) and Amavasya are taboo for material beginnings. Favorable tithis earn full 15 points.`
      },
      {
        name: "Nakshatra (Lunar Mansion)",
        category: "Nakshatra",
        weightMax: 20,
        score: nakScore,
        status: nakStatus,
        description: nakDesc,
        classicalRule: `Classical rule: Asterisms governed by benefic deities multiply the lifespan and profit of undertakings.`
      },
      {
        name: "Vara (Solar Day of Week)",
        category: "Vara",
        weightMax: 10,
        score: varaScore,
        status: varaStatus,
        description: varaDesc,
        classicalRule: `Classical rule: Days governed by benefic planets (Guru, Shukra, Budha, Chandra) sustain lasting joy.`
      },
      {
        name: "Yoga & Karana (Union & Half-Tithi)",
        category: "YogaKarana",
        weightMax: 15,
        score: yogaKaranaTotalScore,
        status: (yogaStatus === "severe" || karanaStatus === "severe") ? "severe" : (yogaStatus === "favorable" && karanaStatus === "favorable") ? "favorable" : "neutral",
        description: `${yogaDesc} ${karanaDesc}`,
        classicalRule: `Classical rule: Avoid the 9 malefic yogas and Vishti/Bhadra karana at all costs.`
      },
      {
        name: "Dosha & Kala Exclusions",
        category: "Doshas",
        weightMax: 25,
        score: doshaScore,
        status: doshaStatus,
        description: activeDoshasList.length > 0 ? `Active afflictions: ${activeDoshasList.join(", ")}.` : `Clean time window: Zero Rahu Kalam, Yamaganda, or Durmuhurta affliction.`,
        classicalRule: `Classical rule: Rahu Kalam, Durmuhurta, and Yamaganda instantly deduct up to 25 points and spoil endeavors.`
      },
      {
        name: "Active Hora & Choghadiya",
        category: "HoraChoghadiya",
        weightMax: 15,
        score: horaChogTotalScore,
        status: (horaStatus === "favorable" && chogStatus === "favorable") ? "favorable" : (horaStatus === "severe" || chogStatus === "severe") ? "severe" : "neutral",
        description: `Active Hora: ${horaLord} (${horaScore}/7.5 pts) · Active Choghadiya: ${chogName} [${chogNature}] (${chogScore}/7.5 pts).`,
        classicalRule: `Classical rule: Planetary hour (Hora) and 1.5-hour Choghadiya segment determine immediate ground conditions.`
      }
    ];

    if (specialBonus > 0) {
      factors.push({
        name: "Special Vedic Yogas & Divine Overrides",
        category: "SpecialBlessings",
        weightMax: 20,
        score: specialBonus,
        status: "favorable",
        description: `Active Blessings: ${activeSpecialYogas.join(", ")}. Adds +${specialBonus} bonus points and neutralizes minor flaws.`,
        classicalRule: `Classical rule: Abhijit Muhurta and Siddha Yogas conquer 100,000 minor blemishes (Kotidosha Hara).`
      });
    }

    // -------------------------------------------------------------
    // NEXT BEST AUSPICIOUS WINDOW CALCULATION
    // -------------------------------------------------------------
    let nextAuspiciousWindow: MuhurtaQualityScoreResult["nextAuspiciousWindow"] = null;
    // Scan ahead in 30-minute increments up to end of the day (or 12 hours)
    for (let offsetMin = 15; offsetMin <= 720; offsetMin += 15) {
      const futureTime = new Date(date.getTime() + offsetMin * 60000);
      const futureHour = futureTime.getHours();
      const futureMinute = futureTime.getMinutes();
      const futureMinOfDay = futureHour * 60 + futureMinute;

      const fRahu = this.isMinuteInRange(futureMinOfDay, panchang.rahuKala || "");
      const fYama = this.isMinuteInRange(futureMinOfDay, panchang.yamaganda || "");
      const fDur = this.isMinuteInRange(futureMinOfDay, panchang.durmuhurta || "");

      if (fRahu || fYama || fDur) continue;

      // Check future Choghadiya
      const fChog = allChogs.find(c => {
        const s = c.startTime instanceof Date ? c.startTime : new Date(c.startTime);
        const e = c.endTime instanceof Date ? c.endTime : new Date(c.endTime);
        return futureTime >= s && futureTime < e;
      });

      if (fChog && (fChog.nature === "Amrit" || fChog.nature === "Shubh" || fChog.nature === "Labh")) {
        const sStr = fChog.timeRange || `${futureHour}:${String(futureMinute).padStart(2, "0")}`;
        const fAmpm = futureHour >= 12 ? "PM" : "AM";
        const fDisplayH = futureHour % 12 === 0 ? 12 : futureHour % 12;
        const fStartStr = `${String(fDisplayH).padStart(2, "0")}:${String(futureMinute).padStart(2, "0")} ${fAmpm}`;

        nextAuspiciousWindow = {
          timeRange: `${fStartStr} onwards (${fChog.nature} Choghadiya)`,
          startsInMinutes: offsetMin,
          predictedScore: 82,
          description: `Clear of Rahu Kalam & Durmuhurta; enhanced by ${fChog.name} (${fChog.nature}) Choghadiya.`
        };
        break;
      }
    }

    // -------------------------------------------------------------
    // 24-HOUR HOURLY TIMELINE CURVE
    // -------------------------------------------------------------
    const hourlyScoresToday: MuhurtaQualityScoreResult["hourlyScoresToday"] = [];
    for (let h = 0; h < 24; h++) {
      const sampleDate = new Date(date);
      sampleDate.setHours(h, 30, 0, 0); // Mid-hour sample
      const sampleMinOfDay = h * 60 + 30;

      // Fast evaluation
      let hDosha = 25;
      if (this.isMinuteInRange(sampleMinOfDay, panchang.rahuKala || "")) hDosha -= 25;
      if (this.isMinuteInRange(sampleMinOfDay, panchang.yamaganda || "")) hDosha -= 18;
      if (this.isMinuteInRange(sampleMinOfDay, panchang.durmuhurta || "")) hDosha -= 20;
      hDosha = Math.max(0, hDosha);

      // Choghadiya at hour
      const chAtHour = allChogs.find(c => {
        const s = c.startTime instanceof Date ? c.startTime : new Date(c.startTime);
        const e = c.endTime instanceof Date ? c.endTime : new Date(c.endTime);
        return sampleDate >= s && sampleDate < e;
      }) || dayChogs[0];

      let chScoreH = 4;
      if (chAtHour?.nature === "Amrit") chScoreH = 7.5;
      else if (chAtHour?.nature === "Shubh") chScoreH = 7;
      else if (chAtHour?.nature === "Labh") chScoreH = 6.5;
      else if (chAtHour?.nature === "Rog" || chAtHour?.nature === "Kaal" || chAtHour?.nature === "Udveg") chScoreH = 1;

      // Abhijit check at hour
      let abhijitBonusH = 0;
      if (this.isMinuteInRange(sampleMinOfDay, panchang.abhijitMuhurta || "") && dayOfWeekIdx !== 3) {
        abhijitBonusH = 15;
      }

      let hourTotal = Math.round(tithiScore + nakScore + varaScore + yogaKaranaTotalScore + hDosha + (horaScore + chScoreH) + abhijitBonusH);
      if (hDosha === 0 && activityKey !== "puja_homa") hourTotal = Math.min(34, hourTotal);
      hourTotal = Math.max(0, Math.min(100, hourTotal));

      let hTier: QualityTier = "SADHARANA";
      if (hourTotal >= 85) hTier = "UTTAMA";
      else if (hourTotal >= 70) hTier = "SHUBH";
      else if (hourTotal >= 50) hTier = "MADHYAMA";
      else if (hourTotal >= 35) hTier = "SADHARANA";
      else hTier = "VARJYA";

      const hDisplay = h % 12 === 0 ? 12 : h % 12;
      const hAmpm = h >= 12 ? "PM" : "AM";
      const timeLabel = `${hDisplay} ${hAmpm}`;

      hourlyScoresToday.push({
        hour: h,
        timeLabel,
        score: hourTotal,
        tier: hTier,
        isCurrentHour: h === targetHour
      });
    }

    // -------------------------------------------------------------
    // ALL ACTIVITIES CROSS-COMPARISON AT THIS EXACT TIME
    // -------------------------------------------------------------
    const allActivitiesScores: MuhurtaQualityScoreResult["allActivitiesScores"] = MUHURTA_ACTIVITIES.map(act => {
      if (act.key === activityKey) {
        return {
          activityKey: act.key,
          activityName: act.name,
          score: finalScore,
          tier: qualityTier,
          statusLabel: qualityLabel
        };
      }

      // Quick score evaluation for other activity
      let aTithi = 8;
      if (act.favorableTithis.includes(currentTithiIdx)) aTithi = 15;
      else if (isRikta) aTithi = 2;
      else if (isAmavasya) aTithi = act.key === "puja_homa" ? 10 : 0;

      let aNak = 10;
      if (act.favorableNakshatras.includes(nakIdx)) aNak = 18;

      let aVara = 6;
      if (act.prohibitedVaras.includes(dayOfWeekIdx)) aVara = 1;
      else if (act.favorableVaras.includes(dayOfWeekIdx)) aVara = 10;

      let aTotal = Math.round(aTithi + aNak + aVara + yogaKaranaTotalScore + doshaScore + horaChogTotalScore + specialBonus);
      if (isRahuActive && act.key !== "puja_homa") aTotal = Math.min(34, aTotal);
      aTotal = Math.max(0, Math.min(100, aTotal));

      let aTier: QualityTier = "SADHARANA";
      let aLabel = "Moderate";
      if (aTotal >= 85) { aTier = "UTTAMA"; aLabel = "Supreme"; }
      else if (aTotal >= 70) { aTier = "SHUBH"; aLabel = "Favorable"; }
      else if (aTotal >= 50) { aTier = "MADHYAMA"; aLabel = "Moderate"; }
      else if (aTotal >= 35) { aTier = "SADHARANA"; aLabel = "Caution"; }
      else { aTier = "VARJYA"; aLabel = "Prohibited"; }

      return {
        activityKey: act.key,
        activityName: act.name,
        score: aTotal,
        tier: aTier,
        statusLabel: aLabel
      };
    });

    // Classical Shastric Guidance & Mitigations
    const shastricGuidance: string[] = [
      activity.shastricRuleSummary,
      `Standard Vedic weighting: Doshas (25%), Nakshatra (20%), Tithi (15%), Yoga & Karana (15%), Hora/Choghadiya (15%), Weekday (10%).`,
      `Abhijit Muhurta and special yogas like Guru Pushya or Sarvartha Siddhi confer divine nullification of mundane planetary faults.`
    ];

    const mitigations: string[] = [];
    if (isRahuActive) {
      mitigations.push("Rahu Kalam Mitigation: If initiation cannot be delayed, chant Rahu Gayatri Mantra or Durga Suktam 11 times before stepping out.");
    }
    if (isVishtiBhadra) {
      mitigations.push("Bhadra Karana Mitigation: Recite the 12 auspicious names of Bhadra (Dhanya, Dadhimukhi, etc.) to pacify obstacle energy.");
    }
    if (isMaleficYoga) {
      mitigations.push(`Yoga Mitigation: Perform a small lamp offering with ghee and chant 'Om Namah Shivaya' 108 times.`);
    }
    if (mitigations.length === 0) {
      mitigations.push("Timing is clear of primary afflictions. Proceed with mindful reverence and invocation of Lord Ganesha.");
    }

    return {
      activityKey,
      activityName: activity.name,
      activitySanskritName: activity.sanskritName,
      activityDescription: activity.description,
      targetDate: dateStr,
      targetTimeStr,
      timestamp: date,
      city,
      totalScore: finalScore,
      qualityTier,
      qualityLabel,
      verdictText,
      factors,
      categoryBreakdown: {
        tithi: { score: tithiScore, max: 15, label: panchang.tithi, name: panchang.tithi },
        nakshatra: { score: nakScore, max: 20, label: nakName, name: nakName },
        vara: { score: varaScore, max: 10, label: panchang.vara || "", name: panchang.vara || "" },
        yogaKarana: { score: yogaKaranaTotalScore, max: 15, label: `${yogaName} / ${karanaName}`, yogaName, karanaName },
        doshas: { score: doshaScore, max: 25, label: activeDoshasList.length === 0 ? "Clean" : activeDoshasList.join(", "), activeDoshas: activeDoshasList },
        horaChoghadiya: { score: horaChogTotalScore, max: 15, label: `${horaLord} Hora · ${chogName}`, horaLord, choghadiyaName: chogName },
        specialBonus: { score: specialBonus, activeYogas: activeSpecialYogas }
      },
      activeInauspiciousWindows,
      activeAuspiciousWindows,
      nextAuspiciousWindow,
      hourlyScoresToday,
      allActivitiesScores,
      shastricGuidance,
      mitigations
    };
  }
}
