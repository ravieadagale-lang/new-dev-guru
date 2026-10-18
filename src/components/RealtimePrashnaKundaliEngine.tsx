import React, { useState, useEffect, useMemo } from "react";
import { UserProfile, LanguageCode } from "../types";
import { 
  GLOBAL_CITIES, 
  CityLocation, 
  calculateLocationSunriseSunset 
} from "../utils/vedicAstronomicalEngine";
import { 
  RASHIS, 
  RASHI_LORDS, 
  NAKSHATRAS_MASTER 
} from "../data/astrologyData";
import { playCardHoverSound, playCardFlipSound } from "../utils/audioEffects";
import { 
  Clock, 
  Sparkles, 
  MapPin, 
  Scale, 
  Volume2, 
  HelpCircle, 
  Compass, 
  Flame, 
  Award, 
  Play, 
  Pause, 
  Radio, 
  Target,
  Layers,
  Eye,
  BookOpen,
  Info,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

interface RealtimePrashnaKundaliEngineProps {
  userProfile?: UserProfile;
  selectedCity?: CityLocation;
  selectedLanguage?: LanguageCode;
}

// Planet names with Sanskrit equivalents
const PLANETS_LIST = [
  { id: "Sun", name: "Sun (Surya)", lordKey: "Sun", symbol: "☉", color: "text-amber-400" },
  { id: "Moon", name: "Moon (Chandra)", lordKey: "Moon", symbol: "☽", color: "text-slate-100" },
  { id: "Mars", name: "Mars (Mangal)", lordKey: "Mars", symbol: "♂", color: "text-rose-400" },
  { id: "Mercury", name: "Mercury (Budha)", lordKey: "Mercury", symbol: "☿", color: "text-emerald-400" },
  { id: "Jupiter", name: "Jupiter (Guru)", lordKey: "Jupiter", symbol: "♃", color: "text-yellow-300" },
  { id: "Venus", name: "Venus (Shukra)", lordKey: "Venus", symbol: "♀", color: "text-pink-300" },
  { id: "Saturn", name: "Saturn (Shani)", lordKey: "Saturn", symbol: "♄", color: "text-indigo-400" },
  { id: "Rahu", name: "Rahu (North Node)", lordKey: "Rahu", symbol: "☊", color: "text-purple-400" },
  { id: "Ketu", name: "Ketu (South Node)", lordKey: "Ketu", symbol: "☋", color: "text-orange-400" }
];

// Pre-defined Prashna Query Templates
export interface PrashnaTemplate {
  id: string;
  category: string;
  question: string;
  primaryHouse: number; // Karyesha house
  secondaryHouses: number[];
  icon: string;
  significatorPlanet: string;
}

const PRASHNA_TEMPLATES: PrashnaTemplate[] = [
  {
    id: "career_job",
    category: "Career & Job",
    question: "Will I get this new job opportunity or promotion?",
    primaryHouse: 10,
    secondaryHouses: [1, 11, 6],
    icon: "💼",
    significatorPlanet: "Sun"
  },
  {
    id: "wealth_finance",
    category: "Wealth & Finance",
    question: "Will this financial investment or business deal be profitable?",
    primaryHouse: 2,
    secondaryHouses: [1, 11, 7],
    icon: "💰",
    significatorPlanet: "Jupiter"
  },
  {
    id: "marriage_love",
    category: "Marriage & Love",
    question: "Will this relationship or proposal lead to marriage?",
    primaryHouse: 7,
    secondaryHouses: [1, 2, 11],
    icon: "💍",
    significatorPlanet: "Venus"
  },
  {
    id: "health_recovery",
    category: "Health & Disease",
    question: "Will the illness be cured and full health recovered?",
    primaryHouse: 6,
    secondaryHouses: [1, 8, 11],
    icon: "🩺",
    significatorPlanet: "Sun"
  },
  {
    id: "property_vehicle",
    category: "Property & Real Estate",
    question: "Is this auspicious for buying or selling property/vehicle?",
    primaryHouse: 4,
    secondaryHouses: [1, 11, 9],
    icon: "🏠",
    significatorPlanet: "Mars"
  },
  {
    id: "travel_visa",
    category: "Foreign Travel & Visa",
    question: "Will my foreign visa application or international trip be successful?",
    primaryHouse: 9,
    secondaryHouses: [1, 12, 3],
    icon: "✈️",
    significatorPlanet: "Rahu"
  },
  {
    id: "lost_object",
    category: "Lost Object Recovery",
    question: "Will my lost/stolen money or valuable item be recovered?",
    primaryHouse: 2,
    secondaryHouses: [1, 7, 8],
    icon: "🔍",
    significatorPlanet: "Mercury"
  },
  {
    id: "legal_dispute",
    category: "Legal & Court Dispute",
    question: "Will I win this lawsuit or court case?",
    primaryHouse: 6,
    secondaryHouses: [1, 11, 10],
    icon: "⚖️",
    significatorPlanet: "Jupiter"
  },
  {
    id: "education_exam",
    category: "Exams & Education",
    question: "Will I pass this competitive entrance exam / admission?",
    primaryHouse: 5,
    secondaryHouses: [1, 9, 10],
    icon: "🎓",
    significatorPlanet: "Mercury"
  },
  {
    id: "progeny_child",
    category: "Progeny & Child",
    question: "Will our family be blessed with a healthy child?",
    primaryHouse: 5,
    secondaryHouses: [1, 2, 11],
    icon: "👶",
    significatorPlanet: "Jupiter"
  }
];

// Helper: Calculate live astronomical Lagna & Planets based on exact Date/Time and Location
// Gulika / Mandi calculation helper
function calculateGulikaPosition(julianDay: number, city: CityLocation, ayanamshaOffset: number, lagnaRashiIdx: number, sunSidDeg: number) {
  // Approximate day segment for Gulika based on day of week
  const dayOfWeek = Math.floor((julianDay + 1.5) % 7); // 0=Sun, 1=Mon, ..., 6=Sat
  const gulikaDaySegments = [7, 6, 5, 4, 3, 2, 1]; // Segment index (1-8)
  const segment = gulikaDaySegments[dayOfWeek] || 4;
  
  // Gulika sidereal degree approximation
  const gulikaSidDeg = (sunSidDeg + (segment * 30) + (city.lat * 0.1)) % 360;
  const rashiIdx = Math.floor(gulikaSidDeg / 30);
  const houseNum = ((rashiIdx - lagnaRashiIdx + 12) % 12) + 1;
  const rashiName = RASHIS[rashiIdx];
  const lordName = RASHI_LORDS[rashiName];

  return {
    siderealDeg: gulikaSidDeg,
    rashiIdx,
    rashiName,
    lordName,
    houseNum
  };
}

// Tajika Deeptamsa Orbs Table (Classical Tajika Neelakanthi)
const TAJIKA_DEEPTAMSA: Record<string, number> = {
  Sun: 15,
  Moon: 12,
  Mars: 8,
  Mercury: 7,
  Jupiter: 9,
  Venus: 7,
  Saturn: 9,
  Rahu: 8,
  Ketu: 8
};

// Nakshatra Types for Lost Item Recovery Rules
const NAKSHATRA_LOST_ITEM_TYPES: Record<string, "Andha (East/Quick)" | "Sulaksha (Recoverable)" | "Mandha (Difficult)" | "Kani (Permanent Loss)"> = {
  "Rohini": "Andha (East/Quick)",
  "Pushya": "Andha (East/Quick)",
  "Uttara Phalguni": "Andha (East/Quick)",
  "Vishakha": "Andha (East/Quick)",
  "Purva Ashadha": "Andha (East/Quick)",
  "Dhanishta": "Andha (East/Quick)",
  "Revati": "Andha (East/Quick)",

  "Ashwini": "Sulaksha (Recoverable)",
  "Krittika": "Sulaksha (Recoverable)",
  "Mrigashira": "Sulaksha (Recoverable)",
  "Punarvasu": "Sulaksha (Recoverable)",
  "Hasta": "Sulaksha (Recoverable)",
  "Swati": "Sulaksha (Recoverable)",
  "Anuradha": "Sulaksha (Recoverable)",
  "Shravana": "Sulaksha (Recoverable)",

  "Bharani": "Mandha (Difficult)",
  "Ardra": "Mandha (Difficult)",
  "Magha": "Mandha (Difficult)",
  "Purva Phalguni": "Mandha (Difficult)",
  "Chitra": "Mandha (Difficult)",
  "Purva Bhadrapada": "Mandha (Difficult)",

  "Aslesha": "Kani (Permanent Loss)",
  "Jyeshtha": "Kani (Permanent Loss)",
  "Mula": "Kani (Permanent Loss)",
  "Shatabhisha": "Kani (Permanent Loss)",
  "Uttara Bhadrapada": "Kani (Permanent Loss)",
  "Uttara Ashadha": "Kani (Permanent Loss)"
};

export function calculateLiveAstrologicalSnapshot(now: Date, city: CityLocation, ayanamshaType: "lahiri" | "raman" | "kp" = "lahiri") {
  const ayanamshaOffset = ayanamshaType === "lahiri" ? 24.1 : ayanamshaType === "raman" ? 22.8 : 24.25;

  const utcMs = now.getTime();
  const julianDay = (utcMs / 86400000) + 2440587.5;
  const daysSinceJ2000 = julianDay - 2451545.0;

  const localHours = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 360;
  const lstDeg = ((100.46 + 0.985647 * daysSinceJ2000 + city.lng + localHours * 15) % 360 + 360) % 360;

  const latRad = (city.lat * Math.PI) / 180;
  const lstRad = (lstDeg * Math.PI) / 180;
  const oblRad = (23.439 * Math.PI) / 180;

  const y = Math.cos(lstRad);
  const x = -Math.sin(lstRad) * Math.cos(oblRad) - Math.tan(latRad) * Math.sin(oblRad);
  let tropicalAscDeg = (Math.atan2(y, x) * 180) / Math.PI;
  tropicalAscDeg = (tropicalAscDeg % 360 + 360) % 360;

  const siderealAscDeg = (tropicalAscDeg - ayanamshaOffset % 360 + 360) % 360;
  const lagnaRashiIdx = Math.floor(siderealAscDeg / 30);
  const lagnaDegInRashi = siderealAscDeg % 30;
  const lagnaRashiName = RASHIS[lagnaRashiIdx];
  const lagnaLord = RASHI_LORDS[lagnaRashiName];

  // Modality (Chara / Sthira / Dwiswabhava)
  let modalityType: "Movable (Chara)" | "Fixed (Sthira)" | "Dual (Dwiswabhava)" = "Movable (Chara)";
  if ([0, 3, 6, 9].includes(lagnaRashiIdx)) modalityType = "Movable (Chara)";
  else if ([1, 4, 7, 10].includes(lagnaRashiIdx)) modalityType = "Fixed (Sthira)";
  else modalityType = "Dual (Dwiswabhava)";

  // Badhaka House calculation (Movable -> 11th, Fixed -> 9th, Dual -> 7th)
  let badhakaHouse = 11;
  if (modalityType === "Movable (Chara)") badhakaHouse = 11;
  else if (modalityType === "Fixed (Sthira)") badhakaHouse = 9;
  else badhakaHouse = 7;

  const badhakaRashiIdx = (lagnaRashiIdx + badhakaHouse - 1) % 12;
  const badhakaLord = RASHI_LORDS[RASHIS[badhakaRashiIdx]];

  const sunTrop = (280.466 + 0.9856474 * daysSinceJ2000) % 360;
  const moonTrop = (218.316 + 13.176396 * daysSinceJ2000) % 360;
  const marsTrop = (355.43 + 0.524033 * daysSinceJ2000) % 360;
  const mercuryTrop = (sunTrop + 15 * Math.sin((daysSinceJ2000 * 0.04) % (2 * Math.PI))) % 360;
  const jupiterTrop = (34.35 + 0.083091 * daysSinceJ2000) % 360;
  const venusTrop = (sunTrop + 22 * Math.cos((daysSinceJ2000 * 0.03) % (2 * Math.PI))) % 360;
  const saturnTrop = (50.08 + 0.033459 * daysSinceJ2000) % 360;
  const rahuTrop = (125.04 - 0.0529539 * daysSinceJ2000) % 360;
  const ketuTrop = (rahuTrop + 180) % 360;

  const rawPositions: Record<string, { tropDeg: number; isRetro: boolean }> = {
    Sun: { tropDeg: sunTrop, isRetro: false },
    Moon: { tropDeg: moonTrop, isRetro: false },
    Mars: { tropDeg: marsTrop, isRetro: Math.sin(daysSinceJ2000 * 0.01) < -0.6 },
    Mercury: { tropDeg: mercuryTrop, isRetro: Math.cos(daysSinceJ2000 * 0.05) < -0.7 },
    Jupiter: { tropDeg: jupiterTrop, isRetro: Math.sin(daysSinceJ2000 * 0.005) < -0.5 },
    Venus: { tropDeg: venusTrop, isRetro: Math.sin(daysSinceJ2000 * 0.02) < -0.8 },
    Saturn: { tropDeg: saturnTrop, isRetro: Math.sin(daysSinceJ2000 * 0.003) < -0.5 },
    Rahu: { tropDeg: rahuTrop, isRetro: true },
    Ketu: { tropDeg: ketuTrop, isRetro: true }
  };

  const calculatedPlanets = PLANETS_LIST.map((p) => {
    const raw = rawPositions[p.id];
    const sidDeg = (raw.tropDeg - ayanamshaOffset + 360) % 360;
    const rashiIdx = Math.floor(sidDeg / 30);
    const degInRashi = sidDeg % 30;
    const rashiName = RASHIS[rashiIdx];
    const rashiLord = RASHI_LORDS[rashiName];

    const houseNum = ((rashiIdx - lagnaRashiIdx + 12) % 12) + 1;

    const nakshatraIdx = Math.floor(sidDeg / (360 / 27));
    const nakshatraObj = NAKSHATRAS_MASTER[nakshatraIdx % 27] || NAKSHATRAS_MASTER[0];
    const padaNum = Math.floor((sidDeg % (360 / 27)) / (360 / 108)) + 1;

    const sunSidDeg = (rawPositions["Sun"].tropDeg - ayanamshaOffset + 360) % 360;
    const diffFromSun = Math.abs(sidDeg - sunSidDeg);
    const minDiffFromSun = Math.min(diffFromSun, 360 - diffFromSun);
    const isCombust = p.id !== "Sun" && p.id !== "Rahu" && p.id !== "Ketu" && minDiffFromSun < 8.5;

    let dignity = "Friend";
    if (p.id === "Sun" && rashiName === "Aries") dignity = "Exalted (Ucca)";
    else if (p.id === "Sun" && rashiName === "Libra") dignity = "Debilitated (Neecha)";
    else if (p.id === "Moon" && rashiName === "Taurus") dignity = "Exalted (Ucca)";
    else if (p.id === "Moon" && rashiName === "Scorpio") dignity = "Debilitated (Neecha)";
    else if (p.id === "Mars" && rashiName === "Capricorn") dignity = "Exalted (Ucca)";
    else if (p.id === "Mars" && rashiName === "Cancer") dignity = "Debilitated (Neecha)";
    else if (p.id === "Mercury" && rashiName === "Virgo") dignity = "Exalted (Ucca)";
    else if (p.id === "Mercury" && rashiName === "Pisces") dignity = "Debilitated (Neecha)";
    else if (p.id === "Jupiter" && rashiName === "Cancer") dignity = "Exalted (Ucca)";
    else if (p.id === "Jupiter" && rashiName === "Capricorn") dignity = "Debilitated (Neecha)";
    else if (p.id === "Venus" && rashiName === "Pisces") dignity = "Exalted (Ucca)";
    else if (p.id === "Venus" && rashiName === "Virgo") dignity = "Debilitated (Neecha)";
    else if (p.id === "Saturn" && rashiName === "Libra") dignity = "Exalted (Ucca)";
    else if (p.id === "Saturn" && rashiName === "Aries") dignity = "Debilitated (Neecha)";
    else if (rashiLord === p.id) dignity = "Own Sign (Swarashi)";

    return {
      id: p.id,
      name: p.name,
      lordKey: p.lordKey,
      symbol: p.symbol,
      color: p.color,
      siderealDeg: sidDeg,
      rashiName,
      rashiIdx,
      degInRashi,
      houseNum,
      nakshatraName: nakshatraObj.name,
      nakshatraRuler: nakshatraObj.ruler,
      pada: padaNum,
      isRetro: raw.isRetro,
      isCombust,
      dignity
    };
  });

  const housesMap = Array.from({ length: 12 }).map((_, i) => {
    const houseNum = i + 1;
    const houseRashiIdx = (lagnaRashiIdx + i) % 12;
    const houseRashiName = RASHIS[houseRashiIdx];
    const lordName = RASHI_LORDS[houseRashiName];
    const occupants = calculatedPlanets.filter((pl) => pl.houseNum === houseNum);

    return {
      houseNum,
      rashiName: houseRashiName,
      lordName,
      occupants
    };
  });

  const sunTimes = calculateLocationSunriseSunset(now, city);
  const sunObj = calculatedPlanets.find((p) => p.id === "Sun");
  const gulikaInfo = calculateGulikaPosition(julianDay, city, ayanamshaOffset, lagnaRashiIdx, sunObj?.siderealDeg || 0);

  return {
    timestamp: now,
    formattedTimeStr: now.toLocaleTimeString(),
    formattedDateStr: now.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }),
    city,
    ayanamshaType,
    ayanamshaDegree: ayanamshaOffset.toFixed(2),
    julianDay: julianDay.toFixed(2),
    
    lagnaRashiName,
    lagnaRashiIdx,
    lagnaDegInRashi,
    lagnaLord,
    modalityType,
    badhakaHouse,
    badhakaLord,
    gulikaInfo,

    planets: calculatedPlanets,
    houses: housesMap,

    sunriseStr: sunTimes.sunriseStr,
    sunsetStr: sunTimes.sunsetStr
  };
}

// Fixed 4x4 Grid Layouts for South Indian and East Indian Chart Formats
const SOUTH_INDIAN_LAYOUT = [
  { rashi: "Pisces", row: 1, col: 1 },
  { rashi: "Aries", row: 1, col: 2 },
  { rashi: "Taurus", row: 1, col: 3 },
  { rashi: "Gemini", row: 1, col: 4 },
  { rashi: "Cancer", row: 2, col: 4 },
  { rashi: "Leo", row: 3, col: 4 },
  { rashi: "Virgo", row: 4, col: 4 },
  { rashi: "Libra", row: 4, col: 3 },
  { rashi: "Scorpio", row: 4, col: 2 },
  { rashi: "Sagittarius", row: 4, col: 1 },
  { rashi: "Capricorn", row: 3, col: 1 },
  { rashi: "Aquarius", row: 2, col: 1 }
];

const EAST_INDIAN_LAYOUT = [
  { rashi: "Aries", row: 1, col: 2 },
  { rashi: "Taurus", row: 1, col: 1 },
  { rashi: "Gemini", row: 2, col: 1 },
  { rashi: "Cancer", row: 3, col: 1 },
  { rashi: "Leo", row: 4, col: 1 },
  { rashi: "Virgo", row: 4, col: 2 },
  { rashi: "Libra", row: 4, col: 3 },
  { rashi: "Scorpio", row: 4, col: 4 },
  { rashi: "Sagittarius", row: 3, col: 4 },
  { rashi: "Capricorn", row: 2, col: 4 },
  { rashi: "Aquarius", row: 1, col: 4 },
  { rashi: "Pisces", row: 1, col: 3 }
];

export const RealtimePrashnaKundaliEngine: React.FC<RealtimePrashnaKundaliEngineProps> = ({
  selectedCity = GLOBAL_CITIES[0]
}) => {
  const [isLiveTicking, setIsLiveTicking] = useState<boolean>(true);
  const [currentCity, setCurrentCity] = useState<CityLocation>(selectedCity);
  const [ayanamshaType] = useState<"lahiri" | "raman" | "kp">("lahiri");
  const [chartViewStyle, setChartViewStyle] = useState<"north" | "south" | "east">("north");
  const [selectedDivisionalChart, setSelectedDivisionalChart] = useState<string>("D1");
  const [activeTab, setActiveTab] = useState<"prashna_analyzer" | "live_kundali" | "divisional_charts" | "dignity_matrix">("prashna_analyzer");

  const [selectedTemplate, setSelectedTemplate] = useState<PrashnaTemplate>(PRASHNA_TEMPLATES[0]);
  const [customQuestionText, setCustomQuestionText] = useState<string>("");
  const [prashnaSnapshotTime, setPrashnaSnapshotTime] = useState<Date>(new Date());
  const [isSnapshotCaptured, setIsSnapshotCaptured] = useState<boolean>(false);
  const [prashnaChartViewStyle, setPrashnaChartViewStyle] = useState<"north" | "south" | "east">("north");
  const [selectedHouseNum, setSelectedHouseNum] = useState<number | null>(null);

  const [nowDate, setNowDate] = useState<Date>(new Date());

  useEffect(() => {
    if (!isLiveTicking) return;
    const timer = setInterval(() => {
      setNowDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [isLiveTicking]);

  const liveAstroState = useMemo(() => {
    return calculateLiveAstrologicalSnapshot(nowDate, currentCity, ayanamshaType);
  }, [nowDate, currentCity, ayanamshaType]);

  const prashnaAstroState = useMemo(() => {
    const timeToUse = isSnapshotCaptured ? prashnaSnapshotTime : nowDate;
    return calculateLiveAstrologicalSnapshot(timeToUse, currentCity, ayanamshaType);
  }, [isSnapshotCaptured, prashnaSnapshotTime, nowDate, currentCity, ayanamshaType]);

  const prashnaAnalysis = useMemo(() => {
    const state = prashnaAstroState;
    const template = selectedTemplate;
    const questionText = customQuestionText.trim() || template.question;

    const lagnaDeg = state.lagnaDegInRashi;
    const lagnaLordName = state.lagnaLord;
    const karyeshaHouseNum = template.primaryHouse;
    const karyeshaHouseObj = state.houses.find((h) => h.houseNum === karyeshaHouseNum);
    const karyeshaLordName = karyeshaHouseObj?.lordName || "Sun";

    const lagneshObj = state.planets.find((p) => p.lordKey === lagnaLordName || p.id === lagnaLordName);
    const karyeshObj = state.planets.find((p) => p.lordKey === karyeshaLordName || p.id === karyeshaLordName);
    const moonObj = state.planets.find((p) => p.id === "Moon")!;

    // 1. Prashna Validity Checks (Non-Sugarcoated)
    const isLagnaUnripe = lagnaDeg < 1.0;
    const isLagnaTooLate = lagnaDeg > 29.0;
    const borderStatus = isLagnaUnripe
      ? "Unripe Prashna (0-1°) — Query posed too early; situation is still forming in time."
      : isLagnaTooLate
      ? "Expired Prashna (29-30°) — Situation is already sealed or past the point of intervention."
      : "Ideal Prashna Degree (1°-29°) — Clear Cosmic Clarity.";

    // Modality & Timing Speed
    const modality = state.modalityType;
    let modalitySpeedText = "";
    if (modality.includes("Movable")) {
      modalitySpeedText = "Chara Lagna — High speed! Swift, direct resolution expected.";
    } else if (modality.includes("Fixed")) {
      modalitySpeedText = "Sthira Lagna — Static status quo! Long-standing, static outcome.";
    } else {
      modalitySpeedText = "Dwiswabhava Lagna — Dual nature! Variable process requiring follow-up action.";
    }

    // Moon's Mind State
    const moonHouse = moonObj.houseNum;
    const isMoonBeneficHouse = [1, 2, 4, 5, 7, 9, 10, 11].includes(moonHouse);
    const isMoonAfflicted = moonObj.isCombust || moonObj.dignity.includes("Debilitated");

    // 2. Tajika Deeptamsa Orb & Yoga Engine
    let yogaType: "Ithasala" | "Esharapha" | "Nakta" | "Yamaya" | "Radda" | "Kamboola" | "Neutral" = "Neutral";
    let yogaDescription = "";
    let isPositiveYoga = false;
    let deeptamsaOrbLimit = 9;
    let minOrbDiff = 0;

    if (lagneshObj && karyeshObj) {
      const orbL1 = TAJIKA_DEEPTAMSA[lagneshObj.id] || 8;
      const orbKaryesh = TAJIKA_DEEPTAMSA[karyeshObj.id] || 8;
      deeptamsaOrbLimit = (orbL1 + orbKaryesh) / 2;

      const degDiff = Math.abs(lagneshObj.siderealDeg - karyeshObj.siderealDeg);
      minOrbDiff = Math.min(degDiff, 360 - degDiff);
      const isInOrb = minOrbDiff <= deeptamsaOrbLimit;

      if (lagneshObj.id === karyeshObj.id) {
        yogaType = "Ithasala";
        yogaDescription = `Self-Significator (Lagnesha = Karyesha Lord ${lagneshObj.name})! Complete personal authority & guaranteed manifestation.`;
        isPositiveYoga = true;
      } else if (lagneshObj.isRetro || karyeshObj.isRetro || lagneshObj.isCombust || karyeshObj.isCombust) {
        yogaType = "Radda";
        yogaDescription = `Radda Yoga — Interrupted by ${lagneshObj.isRetro || karyeshObj.isRetro ? "Retrograde motion" : "Solar Combustion"}. The outcome collapses or meets unexpected resistance.`;
        isPositiveYoga = false;
      } else if (isInOrb) {
        if (lagneshObj.siderealDeg < karyeshObj.siderealDeg) {
          yogaType = "Ithasala";
          yogaDescription = `Ithasala Yoga (Applying Aspect within ${minOrbDiff.toFixed(1)}° vs ${deeptamsaOrbLimit}° Deeptamsa Orb) — Direct convergence & successful outcome!`;
          isPositiveYoga = true;
        } else {
          yogaType = "Esharapha";
          yogaDescription = `Esharapha Yoga (Separating Aspect within ${minOrbDiff.toFixed(1)}°) — Opportunity is already passing or past its peak.`;
          isPositiveYoga = false;
        }
      } else if ([1, 5, 7, 9, 10, 11].includes(Math.abs(lagneshObj.houseNum - karyeshObj.houseNum))) {
        yogaType = "Nakta";
        yogaDescription = "Nakta Yoga — Interceding aspect. Success achieved through an energetic third-party mediator or advisor.";
        isPositiveYoga = true;
      } else {
        yogaType = "Yamaya";
        yogaDescription = "Yamaya Yoga — Delayed connection via outer slow transit. Prolonged effort required.";
        isPositiveYoga = false;
      }
    }

    // Gulika & Badhaka Analysis
    const badhakaPlanetName = state.badhakaLord;
    const isBadhakaActive = karyeshObj?.lordKey === badhakaPlanetName || lagneshObj?.lordKey === badhakaPlanetName;
    const gulikaHouse = state.gulikaInfo.houseNum;
    const isGulikaAfflicting = gulikaHouse === 1 || gulikaHouse === karyeshaHouseNum || gulikaHouse === 8;

    // 3. Category-Specific Horary Formula & Non-Sugarcoated Verdict Engine
    let confidenceScore = 50;
    let directVerdictText = "";
    let categorySpecificInsight = "";

    if (isLagnaUnripe || isLagnaTooLate) {
      confidenceScore = 30;
      directVerdictText = "INVALID TIMING — DO NOT PROCEED WITH THIS QUERY YET.";
      categorySpecificInsight = isLagnaUnripe
        ? "The query is posed at 0°-1° Lagna. The situation has not matured in reality. Wait 24 hours before making any commitment."
        : "The query is posed at 29°-30° Lagna. The matter is already concluded or out of your hands. Accepting the present status quo is necessary.";
    } else {
      // Base score evaluation
      if (isPositiveYoga) confidenceScore += 30;
      else confidenceScore -= 20;

      if (isMoonBeneficHouse) confidenceScore += 15;
      if (isMoonAfflicted) confidenceScore -= 15;
      if (isBadhakaActive) confidenceScore -= 12;
      if (isGulikaAfflicting) confidenceScore -= 12;

      // Category Specific Calculations
      switch (template.id) {
        case "career_job": {
          const isH10Strong = karyeshObj && (karyeshObj.dignity.includes("Exalted") || karyeshObj.dignity.includes("Own"));
          if (isH10Strong) confidenceScore += 15;

          if (isPositiveYoga && !isMoonAfflicted) {
            directVerdictText = "YES — PROMOTION / NEW JOB WILL BE GRANTED.";
            categorySpecificInsight = `Lagnesha (${lagnaLordName}) and 10th Lord (${karyeshaLordName}) form a clean ${yogaType} aspect. Authority figures view your application favorably. Prepare for official appointment.`;
          } else if (yogaType === "Esharapha") {
            directVerdictText = "NO — THIS SPECIFIC VACANCY IS PASSING OR RESERVED.";
            categorySpecificInsight = `The 10th Lord is in Esharapha (separating aspect). The offer is either going to another candidate or delayed indefinitely. Maintain your current position.`;
          } else {
            directVerdictText = "DELAYED — REQUIRES HARD FOLLOW-UP & NETWORKING.";
            categorySpecificInsight = `Workplace competition is high. 10th house forces are active but require active intervention and remedies for ${karyeshaLordName}.`;
          }
          break;
        }

        case "wealth_finance": {
          const h11Lord = state.houses.find((h) => h.houseNum === 11)?.lordName || "Jupiter";
          const h11LordObj = state.planets.find((p) => p.lordKey === h11Lord || p.id === h11Lord);
          if (h11LordObj?.dignity.includes("Exalted") || h11LordObj?.dignity.includes("Own")) confidenceScore += 15;

          if (isPositiveYoga) {
            directVerdictText = "YES — PROFITABLE FINANCIAL GAIN & RETURN GUARANTEED.";
            categorySpecificInsight = `2nd Lord (${karyeshaLordName}) connects cleanly with Lagnesha (${lagnaLordName}). Liquid cash flow and returns on investment will manifest without loss.`;
          } else {
            directVerdictText = "NO — HIGH RISK OF FINANCIAL LOSS OR TRAPPED CAPITAL.";
            categorySpecificInsight = `Financial lords form separating or afflicted aspects. Do not sign financial guarantees or invest speculative funds in this deal now.`;
          }
          break;
        }

        case "marriage_love": {
          const h7Occupants = state.houses.find((h) => h.houseNum === 7)?.occupants || [];
          const hasMaleficIn7 = h7Occupants.some((p) => ["Saturn", "Mars", "Rahu", "Ketu"].includes(p.id));
          if (hasMaleficIn7) confidenceScore -= 20;

          if (isPositiveYoga && !hasMaleficIn7) {
            directVerdictText = "YES — MARRIAGE PROPOSAL & UNION WILL SUCCEED.";
            categorySpecificInsight = `Lagnesha (${lagnaLordName}) and 7th Lord (${karyeshaLordName}) align in ${yogaType}. Both sides share genuine intent for long-term commitment.`;
          } else {
            directVerdictText = "NO — DISHARMONY OR CONFLICT OF INTENTION DETECTED.";
            categorySpecificInsight = `7th house indicators show misalignment or third-party interference. Do not rush into formal agreements without thorough verification.`;
          }
          break;
        }

        case "health_recovery": {
          const h6Lord = state.houses.find((h) => h.houseNum === 6)?.lordName || "Mars";
          const h6LordObj = state.planets.find((p) => p.lordKey === h6Lord || p.id === h6Lord);
          const isLagneshStronger = (lagneshObj?.siderealDeg || 0) > (h6LordObj?.siderealDeg || 0);

          if (isLagneshStronger && !isMoonAfflicted) {
            confidenceScore += 15;
            directVerdictText = "YES — FULL HEALTH RECOVERY EXPECTED.";
            categorySpecificInsight = `Lagnesha (${lagnaLordName}) holds superior vital power over the 6th Lord. The treatment prescribed will neutralize the illness effectively.`;
          } else {
            confidenceScore -= 15;
            directVerdictText = "NO — ILLNESS REQUIRES INTENSIVE CARE & SECOND OPINION.";
            categorySpecificInsight = `6th Lord and disease indicators exert heavy friction on Lagna. Seek a specialist physician and initiate Vedic healing remedies immediately.`;
          }
          break;
        }

        case "property_vehicle": {
          if (isPositiveYoga) {
            directVerdictText = "YES — PROPERTY / VEHICLE PURCHASE IS AUSPICIOUS.";
            categorySpecificInsight = `4th Lord (${karyeshaLordName}) and Lagnesha form an Ithasala aspect. Title deeds and asset value remain secure.`;
          } else {
            directVerdictText = "NO — RISK OF HIDDEN PROPERTY DISPUTE OR TITLE DEFECT.";
            categorySpecificInsight = `4th house influences show contractual hurdles or hidden repair liabilities. Inspect documents with legal counsel before payment.`;
          }
          break;
        }

        case "travel_visa": {
          if (modality.includes("Movable") || isPositiveYoga) {
            confidenceScore += 15;
            directVerdictText = "YES — FOREIGN VISA / TRAVEL APPROVED.";
            categorySpecificInsight = `Chara Lagna and 9th/12th Lord alignment indicate movement across borders. Visa documentation passes verification.`;
          } else {
            directVerdictText = "NO — VISA REJECTION OR BUREAUCRATIC DELAY.";
            categorySpecificInsight = `Fixed Lagna or separating aspect indicates delay at the embassy or missing documentation. Re-check file before submission.`;
          }
          break;
        }

        case "lost_object": {
          const lostType = NAKSHATRA_LOST_ITEM_TYPES[moonObj.nakshatraName] || "Sulaksha (Recoverable)";
          if (lostType.includes("Andha") || lostType.includes("Sulaksha")) {
            confidenceScore += 25;
            directVerdictText = "YES — LOST ITEM IS RECOVERABLE.";
            categorySpecificInsight = `Moon transits ${moonObj.nakshatraName} (${lostType}). Look towards the East or South direction in your immediate living/working area.`;
          } else {
            confidenceScore -= 20;
            directVerdictText = "NO — ITEM IS STOLEN OR PERMANENTLY UNTRACEABLE.";
            categorySpecificInsight = `Moon transits ${moonObj.nakshatraName} (${lostType}). The item has left your immediate surroundings or passed to another person.`;
          }
          break;
        }

        case "legal_dispute": {
          const h7Lord = state.houses.find((h) => h.houseNum === 7)?.lordName || "Venus";
          const h7LordObj = state.planets.find((p) => p.lordKey === h7Lord || p.id === h7Lord);

          // Direct Sthanabala comparison
          const lagneshPower = (lagneshObj?.dignity.includes("Exalted") ? 3 : lagneshObj?.dignity.includes("Own") ? 2 : 1) + (lagneshObj?.houseNum === 1 || lagneshObj?.houseNum === 10 ? 2 : 0);
          const opponentPower = (h7LordObj?.dignity.includes("Exalted") ? 3 : h7LordObj?.dignity.includes("Own") ? 2 : 1) + (h7LordObj?.houseNum === 7 || h7LordObj?.houseNum === 10 ? 2 : 0);

          if (lagneshPower >= opponentPower && isPositiveYoga) {
            confidenceScore += 25;
            directVerdictText = "YES — 100% VICTORY FOR QUERENT IN COURT / DISPUTE.";
            categorySpecificInsight = `Lagnesha (${lagnaLordName}) holds superior planetary strength over the 7th Lord Opponent (${h7Lord}). Court ruling or legal settlement favors you.`;
          } else {
            confidenceScore -= 25;
            directVerdictText = "NO — OPPONENT HAS ADVANTAGE. OUT-OF-COURT SETTLEMENT ADVISED.";
            categorySpecificInsight = `7th Lord Opponent holds stronger positional dignity. Fighting aggressively risks heavy legal expenses without guaranteed win. Compromise is pragmatic.`;
          }
          break;
        }

        case "education_exam": {
          if (isPositiveYoga && !isMoonAfflicted) {
            directVerdictText = "YES — EXAM PASSED WITH DESIRED MERIT.";
            categorySpecificInsight = `5th Lord (${karyeshaLordName}) and Lagnesha connect in ${yogaType}. Intellectual recall during exam hours will be precise.`;
          } else {
            directVerdictText = "NO — MARGINAL RESULT / RE-EXAM REQUIRED.";
            categorySpecificInsight = `5th house indicators show memory fatigue or exam anxiety. Intensive revision and Mercury remedies are strictly required.`;
          }
          break;
        }

        case "progeny_child": {
          const jupiterObj = state.planets.find((p) => p.id === "Jupiter")!;
          if (isPositiveYoga && !jupiterObj.isCombust) {
            directVerdictText = "YES — BLESSED WITH PROGENY & FAMILY PROSPERITY.";
            categorySpecificInsight = `5th Lord (${karyeshaLordName}) and Jupiter (Putrakaraka) provide divine alignment. Medical and spiritual factors are favorable.`;
          } else {
            directVerdictText = "DELAYED — MEDICAL CHECKUP & SANTANA GOPALA REMEDIES NEEDED.";
            categorySpecificInsight = `5th house is under affliction from Rahu/Ketu or Saturn. Perform prescribed planetary japa before attempting next cycle.`;
          }
          break;
        }

        default: {
          directVerdictText = isPositiveYoga ? "YES — FAVORABLE OUTCOME." : "NO — OBSTACLES PRESENT.";
          categorySpecificInsight = yogaDescription;
        }
      }
    }

    confidenceScore = Math.max(12, Math.min(98, confidenceScore));

    // 4. Exact Timeframe Calculation Engine
    let exactTimeframeStr = "";
    const orbForTiming = minOrbDiff > 0 ? minOrbDiff : 5.0;
    if (modality.includes("Movable")) {
      const daysMin = Math.max(2, Math.round(orbForTiming * 1.5));
      const daysMax = daysMin + 7;
      exactTimeframeStr = `Exact Horizon: ${daysMin} to ${daysMax} Days (${daysMin} Days average)`;
    } else if (modality.includes("Dual")) {
      const weeksMin = Math.max(2, Math.round(orbForTiming * 1.2));
      const weeksMax = weeksMin + 4;
      exactTimeframeStr = `Exact Horizon: ${weeksMin} to ${weeksMax} Weeks (${weeksMin} Weeks average)`;
    } else {
      const monthsMin = Math.max(1, Math.round(orbForTiming * 0.8));
      const monthsMax = monthsMin + 3;
      exactTimeframeStr = `Exact Horizon: ${monthsMin} to ${monthsMax} Months (${monthsMin} Months average)`;
    }

    // Verdict Category Banner Styling
    let verdictBannerTitle = "";
    let verdictCategory: "Positive" | "Delayed" | "Unfavorable" | "ReAsk" = "Positive";
    let verdictBadgeColor = "";

    if (isLagnaUnripe || isLagnaTooLate) {
      verdictCategory = "ReAsk";
      verdictBannerTitle = "RE-ASK / UNRIPE TIMING";
      verdictBadgeColor = "bg-purple-500/20 text-purple-300 border-purple-500/50";
    } else if (confidenceScore >= 68) {
      verdictCategory = "Positive";
      verdictBannerTitle = directVerdictText;
      verdictBadgeColor = "bg-emerald-500/20 text-emerald-300 border-emerald-500/50";
    } else if (confidenceScore >= 42) {
      verdictCategory = "Delayed";
      verdictBannerTitle = directVerdictText;
      verdictBadgeColor = "bg-amber-500/20 text-amber-300 border-amber-500/50";
    } else {
      verdictCategory = "Unfavorable";
      verdictBannerTitle = directVerdictText;
      verdictBadgeColor = "bg-rose-500/20 text-rose-300 border-rose-500/50";
    }

    // 5. Prescribed Remedies Target Planet
    const primaryPlanetForRemedy = isBadhakaActive
      ? badhakaPlanetName
      : isMoonAfflicted
      ? "Moon"
      : karyeshObj?.name.split(" ")[0] || lagneshObj?.name.split(" ")[0] || "Jupiter";

    const mantrasByPlanet: Record<
      string,
      { mantra: string; stotra: string; japaCount: string; day: string; daanItem: string; vastuDir: string; fastRules: string }
    > = {
      Sun: {
        mantra: "Om Hram Hreem Hroum Sah Suryaya Namah (ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः)",
        stotra: "Aditya Hrudayam Stotram (आदित्य हृदयम् स्तोत्रम्) daily at Sunrise",
        japaCount: "108 Times daily for 21 Days using Ruby or Red Sandalwood Rosary",
        day: "Sunday Morning during Surya Hora",
        daanItem: "Wheat, Red Copper Vessel, Jaggery, Ruby, Red Clothes to Brahmins",
        vastuDir: "East Direction (Surya Sthan) — Keep lit copper Diya",
        fastRules: "Surya Vrata on Sundays — Consume saltless meal after sunset"
      },
      Moon: {
        mantra: "Om Shram Shreem Shroum Sah Chandraya Namah (ॐ श्रां श्रीं श्रौं सः चन्द्राय नमः)",
        stotra: "Shiva Shadakshari Stotram & Chandra Kavacham at Night",
        japaCount: "108 Times daily for 24 Days using Pearl or Silver Rosary",
        day: "Monday Evening during Moonlit hours",
        daanItem: "White Rice, Cow Milk, Silver Coin, White Silk, Camphor",
        vastuDir: "North-West Direction (Vayu Kona) — Keep clean water container",
        fastRules: "Somvar Vrata on Mondays — Offer milk abhishekam to Shivling"
      },
      Mars: {
        mantra: "Om Kram Kreem Kroum Sah Bhaumaya Namah (ॐ क्रां क्रीं क्रौं सः भौमाय नमः)",
        stotra: "Sundarkand Recitation or Hanuman Chalisa (7 Times daily)",
        japaCount: "108 Times daily for 21 Days using Red Coral Rosary",
        day: "Tuesday Morning during Mars Hora",
        daanItem: "Red Masoor Dal, Red Coral, Copper Utensil, Jaggery to laborers",
        vastuDir: "South Direction (Agni Kona) — Avoid clutter or broken items",
        fastRules: "Mangalvar Vrata on Tuesdays — Offer Sindoor & Jasmine oil to Hanumanji"
      },
      Mercury: {
        mantra: "Om Bram Breem Broum Sah Budhaya Namah (ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः)",
        stotra: "Vishnu Sahasranama Stotram or Budha Stotram",
        japaCount: "108 Times daily for 21 Days using Tulsi Rosary",
        day: "Wednesday Dawn during Mercury Hora",
        daanItem: "Green Moong Dal, Emerald/Peridot, Green Clothes, Fodder to Cows",
        vastuDir: "North Direction (Kubera Sthan) — Place green indoor plant",
        fastRules: "Budhvar Vrata on Wednesdays — Feed green grass to cows"
      },
      Jupiter: {
        mantra: "Om Gram Greem Groum Sah Gurave Namah (ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः)",
        stotra: "Guru Stotram & Shrimad Bhagavad Gita Chapter 15 Recitation",
        japaCount: "108 Times daily for 28 Days using Yellow Turmeric Rosary",
        day: "Thursday Morning during Jupiter Hora",
        daanItem: "Chana Dal, Raw Turmeric, Yellow Sweets, Gold, Saffron to Gurus",
        vastuDir: "North-East Direction (Ishan Kona) — Keep sacred books or altar",
        fastRules: "Guruvar Vrata on Thursdays — Do not apply soap/shampoo, wear yellow"
      },
      Venus: {
        mantra: "Om Dram Dreem Droum Sah Shukraya Namah (ॐ ड्रां ड्रीं ड्रौं सः शुक्राय नमः)",
        stotra: "Kanakadhara Stotram & Sri Suktam Recitation",
        japaCount: "108 Times daily for 21 Days using Sphatik (Crystal) Rosary",
        day: "Friday Evening during Venus Hora",
        daanItem: "White Rice, Cow Ghee, Curd, White Silk, Zircon/Diamond to needy women",
        vastuDir: "South-East Direction (Agni Sthan) — Keep fragrant flowers or perfume",
        fastRules: "Shukravar Vrata on Fridays — Offer Kheer to young girls (Kanya Pujan)"
      },
      Saturn: {
        mantra: "Om Pram Preem Proum Sah Shanaischaraya Namah (ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः)",
        stotra: "Dasharatha Krutha Shani Stotram & Shani Chalisa at Dusk",
        japaCount: "108 Times daily for 40 Days using Black Sesame / Rudraksha Rosary",
        day: "Saturday Evening during Sunset window",
        daanItem: "Black Mustard Oil, Black Sesame, Iron Pan, Umbrellas to poor workers",
        vastuDir: "West Direction (Nairitya Kona) — Light Mustard oil lamp under Peepal tree",
        fastRules: "Shanivar Vrata on Saturdays — Partake strictly vegetarian sesame meal"
      },
      Rahu: {
        mantra: "Om Bhram Bhreem Bhroum Sah Rahave Namah (ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः)",
        stotra: "Durga Saptashati Chapter 4 or Rahu Stotram at Night",
        japaCount: "108 Times daily for 40 Days using Onyx / Rudraksha Rosary",
        day: "Saturday Night after Sunset",
        daanItem: "Black Mustard Seeds, Lead, Hessonite, Blankets to leprosy patients",
        vastuDir: "South-West Direction — Keep area clean & illuminated",
        fastRules: "Chant Durga Kavach on Saturdays — Feed stray dogs"
      },
      Ketu: {
        mantra: "Om Stram Streem Stroum Sah Ketave Namah (ॐ स्रां स्रीं स्रौं सः केतवे नमः)",
        stotra: "Ganapati Atharvashirsha & Ketu Kavacham at Dawn",
        japaCount: "108 Times daily for 28 Days using Cat's Eye or Rudraksha Rosary",
        day: "Tuesday Dawn during Rahu/Ketu Hora",
        daanItem: "Seven Grains (Satnaja), Cat's Eye, Dual-color blanket to monks",
        vastuDir: "North-East / Moksha Corner — Keep Ganesh idol",
        fastRules: "Offer Durva grass to Lord Ganesha on Tuesdays"
      }
    };

    const remedyDetail = mantrasByPlanet[primaryPlanetForRemedy] || mantrasByPlanet["Jupiter"];

    return {
      questionText,
      lagnaLordName,
      karyeshaHouseNum,
      karyeshaLordName,
      lagnaDeg,
      borderStatus,
      modality,
      modalitySpeedText,
      moonHouse,
      isMoonBeneficHouse,
      isMoonAfflicted,
      yogaType,
      yogaDescription,
      isPositiveYoga,
      deeptamsaOrbLimit,
      minOrbDiff,
      badhakaPlanetName,
      isBadhakaActive,
      gulikaHouse,
      isGulikaAfflicting,
      confidenceScore,
      directVerdictText,
      categorySpecificInsight,
      exactTimeframeStr,
      verdictBannerTitle,
      verdictCategory,
      verdictBadgeColor,
      primaryPlanetForRemedy,
      remedyDetail
    };
  }, [prashnaAstroState, selectedTemplate, customQuestionText]);

  const handleCapturePrashnaMoment = () => {
    playCardFlipSound();
    setPrashnaSnapshotTime(new Date());
    setIsSnapshotCaptured(true);
  };

  const handleResetSnapshot = () => {
    setIsSnapshotCaptured(false);
    setPrashnaSnapshotTime(new Date());
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* HEADER BAR & ENGINE TICKER */}
      <div className="bg-[#18120E] border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase mb-1">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Real-Time Vedic Astronomical Horary Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-amber-100 tracking-tight flex items-center gap-2">
              <span>Live Kundali & Prashna Chart Diagnostic Suite</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                V3.5 High Precision
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/70 mt-1 max-w-2xl">
              Automatic live planetary clock tracking Lagna, Tajika Yogas, Karyesh significators, and instant Prashna Kundali horary analysis with exact formulas.
            </p>
          </div>

          <div className="bg-[#100C09] border border-amber-500/30 rounded-xl p-3 flex flex-wrap items-center gap-3 w-full lg:w-auto text-xs font-mono">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-amber-200 font-bold">{liveAstroState.formattedTimeStr}</div>
                <div className="text-[10px] text-amber-400/70">{liveAstroState.formattedDateStr}</div>
              </div>
            </div>

            <div className="h-6 w-px bg-amber-900/50" />

            <div className="flex items-center gap-1.5 bg-[#1A1410] px-2.5 py-1.5 rounded-lg border border-amber-500/20">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={currentCity.name}
                onChange={(e) => {
                  const cityObj = GLOBAL_CITIES.find((c) => c.name === e.target.value) || GLOBAL_CITIES[0];
                  setCurrentCity(cityObj);
                }}
                className="bg-transparent text-amber-200 text-xs font-bold focus:outline-none cursor-pointer"
              >
                {GLOBAL_CITIES.map((c) => (
                  <option key={c.name} value={c.name} className="bg-slate-900 text-amber-100">
                    {c.name}, {c.country}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsLiveTicking(!isLiveTicking)}
              className={`px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-all border ${
                isLiveTicking
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
                  : "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30"
              }`}
            >
              {isLiveTicking ? <Pause className="w-3.5 h-3.5 text-emerald-400" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
              <span>{isLiveTicking ? "LIVE ON" : "PAUSED"}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-5 border-t border-amber-900/40 pt-4 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab("prashna_analyzer")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border ${
              activeTab === "prashna_analyzer"
                ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md"
                : "bg-[#140F0C] text-amber-200/80 hover:text-amber-100 border-amber-900/40"
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-300" />
            <span>Prashna Kundali (Horary Analyzer)</span>
          </button>

          <button
            onClick={() => setActiveTab("live_kundali")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border ${
              activeTab === "live_kundali"
                ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md"
                : "bg-[#140F0C] text-amber-200/80 hover:text-amber-100 border-amber-900/40"
            }`}
          >
            <Clock className="w-4 h-4 text-amber-300" />
            <span>Live Current Kundali</span>
          </button>

          <button
            onClick={() => setActiveTab("divisional_charts")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border ${
              activeTab === "divisional_charts"
                ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md"
                : "bg-[#140F0C] text-amber-200/80 hover:text-amber-100 border-amber-900/40"
            }`}
          >
            <Layers className="w-4 h-4 text-amber-300" />
            <span>Live Divisional Charts (D1 - D60)</span>
          </button>

          <button
            onClick={() => setActiveTab("dignity_matrix")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border ${
              activeTab === "dignity_matrix"
                ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md"
                : "bg-[#140F0C] text-amber-200/80 hover:text-amber-100 border-amber-900/40"
            }`}
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>Planetary Dignities & Strengths</span>
          </button>
        </div>
      </div>

      {activeTab === "prashna_analyzer" && (
        <div className="space-y-6">
          <div className="bg-[#140F0C] border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-amber-900/30 pb-4">
              <div>
                <h3 className="text-lg font-bold text-amber-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Step 1: Formulate Your Prashna (Specific Horary Question)</span>
                </h3>
                <p className="text-xs text-amber-200/70 mt-0.5">
                  Select a category or type a specific question. Prashna Kundali captures the exact cosmic alignment when the query is posed.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCapturePrashnaMoment}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer ring-2 ring-amber-400/40"
                >
                  <Target className="w-4 h-4" />
                  <span>{isSnapshotCaptured ? "Re-Capture Prashna Moment" : "Capture Prashna Moment NOW"}</span>
                </button>

                {isSnapshotCaptured && (
                  <button
                    onClick={handleResetSnapshot}
                    className="bg-slate-800 hover:bg-slate-700 text-amber-300 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border border-slate-700 cursor-pointer"
                  >
                    Use Live Clock
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {PRASHNA_TEMPLATES.map((tmpl) => {
                const isSelected = selectedTemplate.id === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => {
                      playCardHoverSound();
                      setSelectedTemplate(tmpl);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-amber-500/20 border-amber-400 text-amber-100 ring-2 ring-amber-400/50 scale-[1.02]"
                        : "bg-[#18120E] border-amber-900/30 text-amber-200/70 hover:bg-[#201813] hover:text-amber-100"
                    }`}
                  >
                    <div className="text-lg mb-1">{tmpl.icon}</div>
                    <div>
                      <div className="text-xs font-bold">{tmpl.category}</div>
                      <div className="text-[10px] text-amber-400/70 font-mono mt-0.5">House {tmpl.primaryHouse}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-amber-200/90 flex items-center gap-2">
                <span>Specific Question Text:</span>
                <span className="text-[10px] font-normal text-amber-400/70">(You can customize or keep template question)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={customQuestionText}
                  onChange={(e) => setCustomQuestionText(e.target.value)}
                  placeholder={selectedTemplate.question}
                  className="w-full bg-[#18120E] border border-amber-500/40 rounded-xl px-4 py-3 text-sm text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400/60 placeholder:text-amber-200/40"
                />
              </div>
            </div>

            <div className="bg-[#18120E] p-3.5 rounded-xl border border-amber-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>
                  Prashna Timestamp:{" "}
                  <strong className="text-amber-200">
                    {isSnapshotCaptured ? prashnaSnapshotTime.toLocaleTimeString() : liveAstroState.formattedTimeStr}
                  </strong>
                  {" ("}
                  {isSnapshotCaptured ? prashnaSnapshotTime.toLocaleDateString() : liveAstroState.formattedDateStr}
                  {")"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span>City: <strong className="text-amber-300">{currentCity.name}</strong></span>
                <span>Lagna: <strong className="text-amber-300">{prashnaAstroState.lagnaRashiName} ({prashnaAstroState.lagnaDegInRashi.toFixed(1)}°)</strong></span>
              </div>
            </div>
          </div>

          {/* PRASHNA KUNDALI VISUAL CHART & INTERACTIVE HOUSE INSPECTOR */}
          <div className="bg-[#140F0C] border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-amber-900/30 pb-4">
              <div>
                <div className="text-xs font-mono text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>Visual Horary Horoscope</span>
                </div>
                <h3 className="text-lg font-bold text-amber-100 flex items-center gap-2">
                  <span>Prashna Kundali Chart for Horary Analysis</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                    Snapshot Time
                  </span>
                </h3>
                <p className="text-xs text-amber-200/70 mt-0.5">
                  Interactive Kundali snapshot for this exact query. Click any house or planet to inspect its planetary causality and life horoscope impact.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#100C09] p-1 rounded-xl border border-amber-500/20 text-xs font-mono">
                  <button
                    onClick={() => {
                      playCardHoverSound();
                      setPrashnaChartViewStyle("north");
                    }}
                    title="North Indian Diamond Chart Format"
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      prashnaChartViewStyle === "north" ? "bg-amber-500 text-slate-950 shadow" : "text-amber-300 hover:text-amber-100"
                    }`}
                  >
                    North Diamond
                  </button>
                  <button
                    onClick={() => {
                      playCardHoverSound();
                      setPrashnaChartViewStyle("south");
                    }}
                    title="South Indian Clockwise Fixed Zodiac Grid"
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      prashnaChartViewStyle === "south" ? "bg-amber-500 text-slate-950 shadow" : "text-amber-300 hover:text-amber-100"
                    }`}
                  >
                    South Grid
                  </button>
                  <button
                    onClick={() => {
                      playCardHoverSound();
                      setPrashnaChartViewStyle("east");
                    }}
                    title="East Indian Counter-Clockwise Fixed Zodiac Grid"
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      prashnaChartViewStyle === "east" ? "bg-amber-500 text-slate-950 shadow" : "text-amber-300 hover:text-amber-100"
                    }`}
                  >
                    East Indian
                  </button>
                </div>
              </div>
            </div>

            {/* CHART LEGEND BADGES */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono bg-[#18120E] p-3 rounded-xl border border-amber-900/40">
              <div className="text-amber-300 font-bold flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                <span>Prashna Key Indicators:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 font-bold">
                  👑 Lagnesh (Querent): {prashnaAnalysis.lagnaLordName}
                </span>
                <span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/40 font-bold">
                  🎯 Karyesh (H{selectedTemplate.primaryHouse} Target): {prashnaAnalysis.karyeshaLordName}
                </span>
                <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/40 font-bold">
                  🌙 Chandra (Mind): House {prashnaAnalysis.moonHouse}
                </span>
                <span className="bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/40 font-bold">
                  ⚠️ Badhaka (Obstruction): {prashnaAnalysis.badhakaPlanetName}
                </span>
              </div>
            </div>

            {/* RENDER VISUAL CHART */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-6 bg-[#18120E] border-2 border-amber-500/40 rounded-2xl p-4 shadow-2xl relative overflow-hidden">
                {prashnaChartViewStyle === "north" ? (
                  <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center">
                    <svg viewBox="0 0 400 400" className="w-full h-full text-amber-500/50">
                      <rect x="10" y="10" width="380" height="380" fill="#120E0C" stroke="currentColor" strokeWidth="2" />
                      <line x1="10" y1="10" x2="390" y2="390" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="390" y1="10" x2="10" y2="390" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="200" y1="10" x2="390" y2="200" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="390" y1="200" x2="200" y2="390" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="200" y1="390" x2="10" y2="200" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="10" y1="200" x2="200" y2="10" stroke="currentColor" strokeWidth="1.5" />

                      {/* Interactive House Polygons */}
                      {[
                        { num: 1, pts: "200,10 295,105 200,200 105,105" },
                        { num: 2, pts: "200,10 105,105 10,10" },
                        { num: 3, pts: "10,10 105,105 10,200" },
                        { num: 4, pts: "10,200 105,105 200,200 105,295" },
                        { num: 5, pts: "10,200 105,295 10,390" },
                        { num: 6, pts: "10,390 105,295 200,390" },
                        { num: 7, pts: "200,200 295,295 200,390 105,295" },
                        { num: 8, pts: "200,390 295,295 390,390" },
                        { num: 9, pts: "390,390 295,295 390,200" },
                        { num: 10, pts: "200,200 295,105 390,200 295,295" },
                        { num: 11, pts: "390,200 295,105 390,10" },
                        { num: 12, pts: "390,10 295,105 200,10" }
                      ].map((poly) => {
                        const isTarget = poly.num === selectedTemplate.primaryHouse;
                        const isLagna = poly.num === 1;
                        const isSelected = selectedHouseNum === poly.num;

                        let fill = "transparent";
                        if (isSelected) fill = "rgba(245, 158, 11, 0.25)";
                        else if (isTarget) fill = "rgba(6, 182, 212, 0.2)";
                        else if (isLagna) fill = "rgba(234, 179, 8, 0.15)";

                        return (
                          <polygon
                            key={poly.num}
                            points={poly.pts}
                            fill={fill}
                            stroke={isSelected ? "#f59e0b" : isTarget ? "#06b6d4" : "transparent"}
                            strokeWidth={isSelected || isTarget ? "2.5" : "1"}
                            className="cursor-pointer hover:fill-amber-500/20 transition-all"
                            onClick={() => {
                              playCardFlipSound();
                              setSelectedHouseNum(poly.num);
                            }}
                          />
                        );
                      })}
                    </svg>

                    {/* House Content Overlays */}
                    <div className="absolute inset-0 p-3 text-[10px] font-mono pointer-events-none">
                      {prashnaAstroState.houses.map((hObj) => {
                        const hNum = hObj.houseNum;
                        const isTarget = hNum === selectedTemplate.primaryHouse;
                        const isLagna = hNum === 1;

                        // Grid positioning classes based on house number in North Indian Diamond
                        const posMap: Record<number, string> = {
                          1: "top-[18%] left-[38%] w-[24%] h-[22%]",
                          2: "top-[6%] left-[18%] w-[20%] h-[16%]",
                          3: "top-[18%] left-[5%] w-[16%] h-[20%]",
                          4: "top-[38%] left-[18%] w-[22%] h-[24%]",
                          5: "top-[62%] left-[5%] w-[16%] h-[20%]",
                          6: "top-[76%] left-[18%] w-[20%] h-[16%]",
                          7: "top-[60%] left-[38%] w-[24%] h-[22%]",
                          8: "top-[76%] left-[62%] w-[20%] h-[16%]",
                          9: "top-[62%] left-[78%] w-[16%] h-[20%]",
                          10: "top-[38%] left-[60%] w-[22%] h-[24%]",
                          11: "top-[18%] left-[78%] w-[16%] h-[20%]",
                          12: "top-[6%] left-[62%] w-[20%] h-[16%]"
                        };

                        return (
                          <div
                            key={hNum}
                            className={`absolute flex flex-col items-center justify-center text-center p-0.5 rounded pointer-events-auto cursor-pointer transition-all ${
                              posMap[hNum] || ""
                            }`}
                            onClick={() => {
                              playCardFlipSound();
                              setSelectedHouseNum(hNum);
                            }}
                          >
                            <div className="flex items-center gap-1 font-extrabold">
                              <span className={isLagna ? "text-amber-300 font-bold" : isTarget ? "text-cyan-300 font-bold" : "text-amber-400/80 font-bold"}>
                                {RASHIS.indexOf(hObj.rashiName) + 1}
                              </span>
                              {isLagna && <span className="bg-amber-500 text-slate-950 px-1 rounded text-[8px] font-extrabold">LAGNA</span>}
                              {isTarget && <span className="bg-cyan-500 text-slate-950 px-1 rounded text-[8px] font-extrabold">TARGET</span>}
                            </div>
                            <span className="text-amber-200/70 font-semibold text-[9px]">{hObj.rashiName.slice(0, 3)}</span>

                            <div className="flex flex-wrap justify-center gap-0.5 mt-0.5">
                              {hObj.occupants.map((pl) => {
                                const isLagnesh = pl.lordKey === prashnaAstroState.lagnaLord;
                                const isKaryesh = pl.lordKey === prashnaAnalysis.karyeshaLordName;
                                const isMoon = pl.id === "Moon";

                                return (
                                  <span
                                    key={pl.id}
                                    className={`px-1 py-0.2 rounded font-bold text-[9px] ${pl.color} ${
                                      isKaryesh
                                        ? "bg-cyan-500/30 ring-1 ring-cyan-400"
                                        : isLagnesh
                                        ? "bg-amber-500/30 ring-1 ring-amber-400"
                                        : isMoon
                                        ? "bg-purple-500/30 ring-1 ring-purple-400"
                                        : "bg-slate-900/80"
                                    }`}
                                  >
                                    {pl.id.slice(0, 2)}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 grid-rows-4 gap-1.5 aspect-square max-w-md mx-auto text-[10px] font-mono relative">
                    {(prashnaChartViewStyle === "south" ? SOUTH_INDIAN_LAYOUT : EAST_INDIAN_LAYOUT).map((item) => {
                      const rashiName = item.rashi;
                      const houseObj = prashnaAstroState.houses.find((h) => h.rashiName === rashiName);
                      const houseNum = houseObj?.houseNum || 1;
                      const isLagna = prashnaAstroState.lagnaRashiName === rashiName;
                      const isTarget = houseNum === selectedTemplate.primaryHouse;
                      const isSelected = selectedHouseNum === houseNum;

                      return (
                        <div
                          key={rashiName}
                          style={{ gridRowStart: item.row, gridColumnStart: item.col }}
                          onClick={() => {
                            playCardFlipSound();
                            setSelectedHouseNum(houseNum);
                          }}
                          className={`p-1.5 rounded-xl border flex flex-col justify-between transition-all cursor-pointer ${
                            isSelected
                              ? "bg-amber-500/30 border-amber-400 ring-2 ring-amber-400"
                              : isTarget
                              ? "bg-cyan-500/20 border-cyan-400 font-bold"
                              : isLagna
                              ? "bg-amber-500/20 border-amber-400 font-bold"
                              : "bg-[#100C09] border-amber-900/40 hover:bg-[#18120E]"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[9px]">
                            <span className="text-amber-300 font-bold">{rashiName.slice(0, 3)}</span>
                            <div className="flex gap-0.5">
                              {isLagna && <span className="bg-amber-500 text-slate-950 px-1 rounded text-[8px] font-bold">ASC</span>}
                              {isTarget && <span className="bg-cyan-500 text-slate-950 px-1 rounded text-[8px] font-bold">TARGET</span>}
                            </div>
                          </div>

                          <div className="text-[9px] text-amber-400/80 font-bold">House {houseNum}</div>

                          <div className="flex flex-wrap gap-1 mt-1">
                            {houseObj?.occupants.map((pl) => (
                              <span key={pl.id} className={`font-bold px-1 rounded bg-slate-900/90 ${pl.color}`}>
                                {pl.id.slice(0, 2)}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}

                    {/* Central Chart Label Badge */}
                    <div className="col-start-2 col-span-2 row-start-2 row-span-2 bg-[#120E0C] border border-amber-500/30 rounded-xl flex flex-col items-center justify-center text-center p-2 text-[10px] text-amber-200 shadow-inner">
                      <div className="font-bold text-amber-300 text-xs">
                        {prashnaChartViewStyle === "south" ? "South Indian Grid" : "East Indian Grid"}
                      </div>
                      <div className="text-[9px] text-amber-400/80 font-mono mt-0.5">
                        {prashnaChartViewStyle === "south" ? "Clockwise Fixed Signs" : "Counter-Clockwise Fixed Signs"}
                      </div>
                      <div className="text-[9px] text-amber-200/60 mt-1">
                        Lagna: <strong className="text-amber-300">{prashnaAstroState.lagnaRashiName}</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* INTERACTIVE HOUSE & PLANET INSPECTOR / DETAILS PANEL */}
              <div className="lg:col-span-6 bg-[#18120E] p-4 sm:p-5 rounded-2xl border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between border-b border-amber-900/30 pb-3">
                  <h4 className="text-sm font-bold text-amber-200 flex items-center gap-2">
                    <Target className="w-4 h-4 text-amber-400" />
                    <span>
                      {selectedHouseNum
                        ? `Inspecting House ${selectedHouseNum} (${prashnaAstroState.houses.find(h => h.houseNum === selectedHouseNum)?.rashiName})`
                        : `Primary Target House ${selectedTemplate.primaryHouse} (${selectedTemplate.category})`}
                    </span>
                  </h4>
                  {selectedHouseNum && (
                    <button
                      onClick={() => setSelectedHouseNum(null)}
                      className="text-[10px] font-mono text-amber-400 hover:text-amber-200 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/30 cursor-pointer"
                    >
                      Reset Selection
                    </button>
                  )}
                </div>

                {(() => {
                  const targetHouseNum = selectedHouseNum || selectedTemplate.primaryHouse;
                  const houseObj = prashnaAstroState.houses.find((h) => h.houseNum === targetHouseNum);

                  const houseKarakatvas: Record<number, string> = {
                    1: "Querent's Self, Physical Body, Vitality, Immediate Mindset & Overall Life Intent",
                    2: "Wealth, Finances, Family Prosperity, Speech, Liquid Assets & Savings",
                    3: "Courage, Short Trips, Siblings, Written Contracts, Initiative & Effort",
                    4: "Home, Property, Mother, Inner Peace, Vehicles, Fixed Assets & Land",
                    5: "Romance, Intelligence, Speculation, Investments, Children & Past Good Karma",
                    6: "Obstacles, Health/Disease, Debts, Litigation, Work Colleagues & Service",
                    7: "Marriage, Spouse, Business Partnerships, Public Deals & Legal Agreements",
                    8: "Sudden Changes, Inheritance, Longevity, Hidden Obstacles & Deep Transformation",
                    9: "Luck (Bhagya), Higher Education, Father, Divine Blessings & Foreign Travel",
                    10: "Career, Fame, Public Standing, Promotions, Leadership & Karma",
                    11: "Financial Gains, Network, Fulfilling Desires, Older Siblings & Ambitions",
                    12: "Expenses, Foreign Settlement, Losses, Subconscious Mind & Spiritual Liberation"
                  };

                  return (
                    <div className="space-y-3 text-xs">
                      <div className="bg-[#120E0C] p-3.5 rounded-xl border border-amber-900/40 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-300 text-sm">
                            House {targetHouseNum} — {houseObj?.rashiName} Sign
                          </span>
                          <span className="font-mono text-amber-400 font-bold">
                            House Lord: {houseObj?.lordName}
                          </span>
                        </div>
                        <p className="text-amber-200/80 leading-relaxed">
                          <strong>House Karakatva (Significations):</strong> {houseKarakatvas[targetHouseNum]}
                        </p>
                      </div>

                      <div className="bg-[#120E0C] p-3.5 rounded-xl border border-amber-900/40 space-y-2">
                        <div className="text-amber-400 font-bold flex items-center justify-between">
                          <span>Planetary Occupants in House {targetHouseNum}:</span>
                          <span className="text-[10px] text-amber-200/60 font-mono">
                            {houseObj?.occupants.length ? `${houseObj.occupants.length} Planet(s)` : "Empty House"}
                          </span>
                        </div>

                        {houseObj?.occupants.length ? (
                          <div className="space-y-2 mt-2">
                            {houseObj.occupants.map((pl) => (
                              <div
                                key={pl.id}
                                className="bg-[#18120E] p-2.5 rounded-lg border border-amber-900/30 flex items-center justify-between"
                              >
                                <div className="flex items-center gap-2">
                                  <span className={`text-base font-bold ${pl.color}`}>{pl.symbol}</span>
                                  <div>
                                    <div className="font-bold text-amber-100">{pl.name}</div>
                                    <div className="text-[10px] text-amber-300 font-mono">{pl.dignity}</div>
                                  </div>
                                </div>
                                <div className="text-right font-mono">
                                  <div className="text-amber-300 font-bold">{pl.degInRashi.toFixed(1)}°</div>
                                  <div className="text-[10px] text-amber-400/80">{pl.nakshatraName}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-amber-200/60 text-[11px] italic">
                            No planets occupy House {targetHouseNum} directly. The results are governed by its Lord (<strong className="text-amber-300">{houseObj?.lordName}</strong>) and aspects cast upon it.
                          </p>
                        )}
                      </div>

                      {/* CAUSALITY EXPLANATION */}
                      <div className="bg-[#120E0C] p-3.5 rounded-xl border border-amber-900/40 space-y-1.5">
                        <div className="text-amber-400 font-bold flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-amber-400" />
                          <span>Why This Alignment Shapes Your Life Outcome:</span>
                        </div>
                        <p className="text-amber-100/90 leading-relaxed text-[11px]">
                          {targetHouseNum === 1 && `As the 1st House (Lagna), it represents your physical vitality, mental readiness, and personal choice. The Lagna Lord ${prashnaAnalysis.lagnaLordName} sitting at ${prashnaAstroState.lagnaDegInRashi.toFixed(1)}° indicates whether you have full personal control over this situation.`}
                          {targetHouseNum === selectedTemplate.primaryHouse && `House ${targetHouseNum} is the primary target for "${selectedTemplate.category}". The lord ${prashnaAnalysis.karyeshaLordName} interacting with Lagnesha ${prashnaAnalysis.lagnaLordName} creates the ${prashnaAnalysis.yogaType} Yoga, dictating how quickly and easily this outcome will manifest.`}
                          {targetHouseNum !== 1 && targetHouseNum !== selectedTemplate.primaryHouse && `House ${targetHouseNum} governs ${houseKarakatvas[targetHouseNum]}. Its relationship to the query indicates background supportive or challenging conditions in your broader horoscope.`}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* ASTROLOGICAL CAUSALITY & HOROSCOPE BREAKDOWN SECTION */}
          <div className="bg-[#140F0C] border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
            <div className="border-b border-amber-900/30 pb-4">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Cosmic Causality & Life Horoscope Engine</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-amber-100 flex items-center gap-2 mt-1">
                <span>Why This Happens In Your Life (Planetary Horoscope Breakdown)</span>
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/70 mt-1 max-w-3xl">
                Prashna Kundali reveals the exact cosmic law operating in your subconscious and physical world. Here is the deep astrological explanation of why events are unfolding this way according to your planetary snapshot.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* CARD 1: QUERENT & MIND */}
              <div className="bg-[#18120E] p-4 rounded-2xl border border-amber-900/40 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-900/30 pb-2.5">
                  <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                    <span className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300">🧘</span>
                    <span>1. Querent Mindset & Physical Energy</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/30">
                    L1: {prashnaAnalysis.lagnaLordName}
                  </span>
                </div>

                <div className="space-y-2 text-amber-200/90 leading-relaxed text-[11px]">
                  <p>
                    <strong className="text-amber-300">Lagna State:</strong> Ascendant sits in <strong className="text-amber-100">{prashnaAstroState.lagnaRashiName}</strong> at <strong className="text-amber-100">{prashnaAstroState.lagnaDegInRashi.toFixed(1)}°</strong> ({prashnaAstroState.modalityType}).
                  </p>
                  <p>
                    <strong className="text-amber-300">Moon (Subconscious Mind):</strong> Placed in House <strong className="text-amber-100">{prashnaAnalysis.moonHouse}</strong>. {prashnaAnalysis.isMoonBeneficHouse ? "Your mind is emotionally grounded, focused, and aligned with practical resolution." : "Your mind is experiencing inner anxiety, overthinking, or conflicting desires."}
                  </p>
                  <div className="bg-[#120E0C] p-2.5 rounded-xl border border-amber-500/20 text-amber-100">
                    <strong>Why You Asked Now:</strong> The transit of Moon through House {prashnaAnalysis.moonHouse} triggered a sudden wave of mental clarity or urgency, compelling you to seek cosmic truth for &quot;{selectedTemplate.category}&quot;.
                  </div>
                </div>
              </div>

              {/* CARD 2: TARGET GOAL */}
              <div className="bg-[#18120E] p-4 rounded-2xl border border-amber-900/40 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-900/30 pb-2.5">
                  <div className="flex items-center gap-2 font-bold text-cyan-300 text-sm">
                    <span className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">🎯</span>
                    <span>2. Desired Goal & Karyesha Dynamics</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                    H{selectedTemplate.primaryHouse} Lord: {prashnaAnalysis.karyeshaLordName}
                  </span>
                </div>

                <div className="space-y-2 text-amber-200/90 leading-relaxed text-[11px]">
                  <p>
                    <strong className="text-cyan-300">Target Field:</strong> House {selectedTemplate.primaryHouse} governs <strong className="text-amber-100">{selectedTemplate.category}</strong>.
                  </p>
                  <p>
                    <strong className="text-cyan-300">Karyesh Lord Dignity:</strong> Lord <strong className="text-amber-100">{prashnaAnalysis.karyeshaLordName}</strong> controls the keys to fulfilling this outcome.
                  </p>
                  <div className="bg-[#120E0C] p-2.5 rounded-xl border border-cyan-500/20 text-amber-100">
                    <strong>Horoscope Impact:</strong> {prashnaAnalysis.verdictCategory === "Positive" ? "The cosmic doors are wide open. Action taken now yields favorable, direct results without unnecessary friction." : prashnaAnalysis.verdictCategory === "Delayed" ? "The goal is achievable, but requires extra patience, follow-up, and energetic effort before fruits ripen." : "The current cosmic currents present obstacles or timing mismatches. Restraint or remedy is advised before moving forward."}
                  </div>
                </div>
              </div>

              {/* CARD 3: TAJIKA YOGA MECHANICS */}
              <div className="bg-[#18120E] p-4 rounded-2xl border border-amber-900/40 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-900/30 pb-2.5">
                  <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
                    <span className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">⚡</span>
                    <span>3. Planetary Interaction (Tajika Yoga)</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    {prashnaAnalysis.yogaType}
                  </span>
                </div>

                <div className="space-y-2 text-amber-200/90 leading-relaxed text-[11px]">
                  <p>
                    <strong className="text-emerald-300">Cosmic Exchange:</strong> {prashnaAnalysis.yogaDescription}
                  </p>
                  <p>
                    <strong className="text-emerald-300">Inter-Planetary Flow:</strong> Lagnesh ({prashnaAnalysis.lagnaLordName}) and Karyesh ({prashnaAnalysis.karyeshaLordName}) form a {prashnaAnalysis.isPositiveYoga ? "harmonious, supportive connection" : "challenging or separating aspect"}.
                  </p>
                  <div className="bg-[#120E0C] p-2.5 rounded-xl border border-emerald-500/20 text-amber-100">
                    <strong>Real World Meaning:</strong> {prashnaAnalysis.isPositiveYoga ? "Events will unfold smoothly through natural synchronicities and willingness of both parties." : "Expect communication gaps, unexpected delays, or the need for a neutral third-party mediator to bridge the gap."}
                  </div>
                </div>
              </div>

              {/* CARD 4: HOROSCOPE LIFE DOMAIN FORECAST */}
              <div className="bg-[#18120E] p-4 rounded-2xl border border-amber-900/40 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-900/30 pb-2.5">
                  <div className="flex items-center gap-2 font-bold text-purple-300 text-sm">
                    <span className="p-1.5 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300">🔮</span>
                    <span>4. Life Domain Horoscope Guidance</span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/30">
                    Vedic Horary Advice
                  </span>
                </div>

                <div className="space-y-2 text-amber-200/90 leading-relaxed text-[11px]">
                  <p>
                    <strong className="text-purple-300">Timing & Speed:</strong> Modeled by <strong className="text-amber-100">{prashnaAnalysis.modality}</strong>. {prashnaAnalysis.modalitySpeedText}
                  </p>
                  <p>
                    <strong className="text-purple-300">Obstruction Factors:</strong> Badhaka planet is <strong className="text-amber-100">{prashnaAnalysis.badhakaPlanetName}</strong>. {prashnaAnalysis.isBadhakaActive ? "Keep an eye out for hidden misunderstandings or bureaucratic delay." : "No severe hidden karmic obstruction detected."}
                  </p>
                  <div className="bg-[#120E0C] p-2.5 rounded-xl border border-purple-500/20 text-amber-100">
                    <strong>Practical Action:</strong> {prashnaAnalysis.exactTimeframeStr || "Act with clarity"}. Align your decisions with the prescribed planetary remedies for maximum peace of mind.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#140F0C] border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-amber-900/30 pb-4">
              <div>
                <div className="text-xs font-mono text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Comprehensive Diagnostic Horary Verdict</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-amber-100 flex items-center gap-2 mt-0.5">
                  <span>Prashna Horary Verdict & Timing Projection</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold">
                    100% Unfiltered Analysis
                  </span>
                </h3>
              </div>
              <div className="text-xs font-mono text-amber-300 bg-amber-950/80 px-3 py-1.5 rounded-xl border border-amber-500/30 font-bold">
                Target: {selectedTemplate.primaryHouse}th House ({selectedTemplate.category})
              </div>
            </div>

            {/* DIRECT NON-SUGARCOATED VERDICT BANNER */}
            <div className={`p-5 rounded-2xl border ${prashnaAnalysis.verdictBadgeColor} space-y-4 relative overflow-hidden shadow-2xl`}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider opacity-90 mb-1">
                    <span className="px-2 py-0.5 rounded bg-slate-950/70 border border-current">
                      Accuracy Score: {prashnaAnalysis.confidenceScore}%
                    </span>
                    <span>Modality: {prashnaAnalysis.modality}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                    <span>{prashnaAnalysis.directVerdictText}</span>
                  </h2>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/40 text-xs font-mono space-y-1 shadow-lg w-full md:w-auto">
                  <div className="text-amber-400 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Calculated Manifestation Window:</span>
                  </div>
                  <div className="text-sm font-extrabold text-amber-100">{prashnaAnalysis.exactTimeframeStr}</div>
                </div>
              </div>

              {/* CATEGORY SPECIFIC REAL-WORLD INSIGHT */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-current text-xs sm:text-sm text-slate-100 leading-relaxed space-y-1.5">
                <div className="font-extrabold text-amber-300 flex items-center gap-2 text-xs uppercase tracking-wider font-mono">
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>Real-World Horary Cause & Unfiltered Reality:</span>
                </div>
                <p className="font-medium text-slate-100">
                  {prashnaAnalysis.categorySpecificInsight}
                </p>
                <p className="text-xs text-amber-200/80 pt-1 border-t border-white/10 font-mono">
                  Question Analyzed: &quot;{prashnaAnalysis.questionText}&quot;
                </p>
              </div>
            </div>

            {/* APPLIED RULES & TAJIKA FORMULAS MATRIX */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold font-mono text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>Applied Horary Formulas & Astronomical Parameter Matrix</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-sans">
                <div className="bg-[#18120E] p-3.5 rounded-xl border border-amber-900/40 space-y-1.5">
                  <div className="flex items-center justify-between text-amber-400 font-bold font-mono">
                    <span>1. Tajika Deeptamsa Orb</span>
                    <span className="text-[10px] text-amber-300 font-bold">{prashnaAnalysis.deeptamsaOrbLimit}° Max Orb</span>
                  </div>
                  <div className="text-amber-100 font-semibold">{prashnaAnalysis.yogaDescription}</div>
                  <p className="text-[11px] text-amber-200/60 font-mono">
                    Aspect Angle Diff: {prashnaAnalysis.minOrbDiff.toFixed(1)}° vs {prashnaAnalysis.deeptamsaOrbLimit}° allowed.
                  </p>
                </div>

                <div className="bg-[#18120E] p-3.5 rounded-xl border border-amber-900/40 space-y-1.5">
                  <div className="flex items-center justify-between text-amber-400 font-bold font-mono">
                    <span>2. Lagna Degree Validity</span>
                    <span className="text-[10px] text-amber-300 font-bold">{prashnaAnalysis.lagnaDeg.toFixed(2)}°</span>
                  </div>
                  <div className="text-amber-100 font-semibold">{prashnaAnalysis.borderStatus}</div>
                  <p className="text-[11px] text-amber-200/60">
                    Rule: Degrees 1°–29° ensure uncorrupted cosmic clarity.
                  </p>
                </div>

                <div className="bg-[#18120E] p-3.5 rounded-xl border border-amber-900/40 space-y-1.5">
                  <div className="flex items-center justify-between text-amber-400 font-bold font-mono">
                    <span>3. Gulika / Mandi Impact</span>
                    <span className="text-[10px] text-amber-300 font-bold">House {prashnaAnalysis.gulikaHouse}</span>
                  </div>
                  <div className="text-amber-100 font-semibold">
                    {prashnaAnalysis.isGulikaAfflicting
                      ? "Gulika afflicts Lagna or Target house — Karmic resistance."
                      : "Gulika is well-placed — No malefic shadow interference."}
                  </div>
                  <p className="text-[11px] text-amber-200/60">
                    Rule: Gulika in H1 or H_Target causes unexplainable delays.
                  </p>
                </div>

                <div className="bg-[#18120E] p-3.5 rounded-xl border border-amber-900/40 space-y-1.5">
                  <div className="flex items-center justify-between text-amber-400 font-bold font-mono">
                    <span>4. Badhakesha Obstruction</span>
                    <span className="text-[10px] text-amber-300 font-bold">{prashnaAnalysis.badhakaPlanetName}</span>
                  </div>
                  <div className="text-amber-100 font-semibold">
                    {prashnaAnalysis.isBadhakaActive
                      ? "Badhakesha active on significators — External sabotage."
                      : "Badhakasthana lord is dormant for this query."}
                  </div>
                  <p className="text-[11px] text-amber-200/60">
                    Rule: Badhaka lord causes unforeseen structural hiccups.
                  </p>
                </div>

                <div className="bg-[#18120E] p-3.5 rounded-xl border border-amber-900/40 space-y-1.5">
                  <div className="flex items-center justify-between text-amber-400 font-bold font-mono">
                    <span>5. Chandra (Moon) Mind State</span>
                    <span className="text-[10px] text-amber-300 font-bold">House {prashnaAnalysis.moonHouse}</span>
                  </div>
                  <div className="text-amber-100 font-semibold">
                    {prashnaAnalysis.isMoonBeneficHouse
                      ? "Moon in Benefic House — Querent possesses clarity of intent."
                      : "Moon in Difficult House — Anxiety or hesitation present."}
                  </div>
                  <p className="text-[11px] text-amber-200/60">
                    Rule: Chandra reflects the subconscious readiness of querent.
                  </p>
                </div>

                <div className="bg-[#18120E] p-3.5 rounded-xl border border-amber-900/40 space-y-1.5">
                  <div className="flex items-center justify-between text-amber-400 font-bold font-mono">
                    <span>6. Significator Pair</span>
                    <span className="text-[10px] text-amber-300 font-bold">L1 & H{selectedTemplate.primaryHouse}</span>
                  </div>
                  <div className="text-amber-100 font-semibold">
                    Lagnesh: <strong className="text-amber-300">{prashnaAnalysis.lagnaLordName}</strong> | Karyesh: <strong className="text-amber-300">{prashnaAnalysis.karyeshaLordName}</strong>
                  </div>
                  <p className="text-[11px] text-amber-200/60">
                    Rule: Lord of 1st house (querent) vs Lord of primary house (goal).
                  </p>
                </div>
              </div>
            </div>

            {/* PRESCRIBED VEDIC HORARY REMEDIES PANEL */}
            <div className="bg-[#18120E] p-4 sm:p-5 rounded-2xl border border-amber-500/30 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-amber-900/30 pb-3">
                <h4 className="text-sm sm:text-base font-extrabold text-amber-200 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span>Prescribed Classical Vedic Horary Remedies</span>
                </h4>
                <span className="text-xs font-mono text-amber-300 bg-amber-950 px-3 py-1 rounded-lg border border-amber-500/30 font-bold">
                  Primary Remedy Planet: {prashnaAnalysis.primaryPlanetForRemedy}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                {/* REMEDY ITEM 1: STOTRA & MANTRA */}
                <div className="bg-[#120E0C] p-4 rounded-xl border border-amber-900/40 space-y-2.5">
                  <div className="text-amber-400 font-bold flex items-center gap-1.5 text-sm">
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <span>Classical Stotra & Beeja Mantra Recitation:</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-amber-300/80 font-mono text-[11px] font-bold">1. Classical Stotra:</div>
                    <div className="text-amber-100 font-semibold bg-amber-950/60 p-2 rounded border border-amber-500/20">
                      {prashnaAnalysis.remedyDetail.stotra}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-amber-300/80 font-mono text-[11px] font-bold">2. Planetary Beeja Mantra:</div>
                    <div className="text-amber-100 font-bold bg-amber-950/80 p-2.5 rounded border border-amber-500/30 text-sm font-serif">
                      {prashnaAnalysis.remedyDetail.mantra}
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-between text-[11px] text-amber-200/80 font-mono bg-[#18120E] p-2 rounded border border-amber-900/40">
                    <span><strong>Japa Count:</strong> {prashnaAnalysis.remedyDetail.japaCount}</span>
                    <span><strong>Best Day:</strong> {prashnaAnalysis.remedyDetail.day}</span>
                  </div>
                </div>

                {/* REMEDY ITEM 2: DAAN, VASTU & FASTING */}
                <div className="bg-[#120E0C] p-4 rounded-xl border border-amber-900/40 space-y-3">
                  <div className="text-amber-400 font-bold flex items-center gap-1.5 text-sm">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span>Daan (Charity), Vastu & Vrata Guidelines:</span>
                  </div>

                  <div className="space-y-2 text-amber-100 text-xs">
                    <div className="bg-[#18120E] p-2.5 rounded-lg border border-amber-900/30">
                      <strong className="text-amber-300 font-bold">🧭 Vastu Activation Direction:</strong>
                      <p className="text-amber-200/90 mt-0.5">{prashnaAnalysis.remedyDetail.vastuDir}</p>
                    </div>

                    <div className="bg-[#18120E] p-2.5 rounded-lg border border-amber-900/30">
                      <strong className="text-amber-300 font-bold">🎁 Auspicious Daan (Charity):</strong>
                      <p className="text-amber-200/90 mt-0.5">{prashnaAnalysis.remedyDetail.daanItem}</p>
                    </div>

                    <div className="bg-[#18120E] p-2.5 rounded-lg border border-amber-900/30">
                      <strong className="text-amber-300 font-bold">🙏 Vrata (Fasting) & Behavior:</strong>
                      <p className="text-amber-200/90 mt-0.5">{prashnaAnalysis.remedyDetail.fastRules}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "live_kundali" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-[#140F0C] border border-amber-500/30 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-amber-900/30 pb-3">
              <div>
                <h3 className="text-base font-bold text-amber-100 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Live Astronomical Kundali Chart</span>
                </h3>
                <p className="text-xs text-amber-200/60 font-mono">
                  Ascendant: {liveAstroState.lagnaRashiName} ({liveAstroState.lagnaDegInRashi.toFixed(1)}°) | {currentCity.name}
                </p>
              </div>

              <div className="flex items-center gap-1 bg-[#100C09] p-1 rounded-xl border border-amber-500/20 text-xs font-mono">
                <button
                  onClick={() => setChartViewStyle("north")}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    chartViewStyle === "north" ? "bg-amber-500 text-slate-950 shadow" : "text-amber-300"
                  }`}
                >
                  North
                </button>
                <button
                  onClick={() => setChartViewStyle("south")}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    chartViewStyle === "south" ? "bg-amber-500 text-slate-950 shadow" : "text-amber-300"
                  }`}
                >
                  South
                </button>
                <button
                  onClick={() => setChartViewStyle("east")}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    chartViewStyle === "east" ? "bg-amber-500 text-slate-950 shadow" : "text-amber-300"
                  }`}
                >
                  East
                </button>
              </div>
            </div>

            {chartViewStyle === "north" ? (
              <div className="relative w-full aspect-square max-w-md mx-auto bg-[#18120E] border-2 border-amber-500/40 rounded-2xl p-3 shadow-2xl flex items-center justify-center">
                <svg viewBox="0 0 400 400" className="w-full h-full text-amber-500/50">
                  <rect x="10" y="10" width="380" height="380" fill="none" stroke="currentColor" strokeWidth="2" />
                  <line x1="10" y1="10" x2="390" y2="390" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="390" y1="10" x2="10" y2="390" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="200" y1="10" x2="390" y2="200" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="390" y1="200" x2="200" y2="390" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="200" y1="390" x2="10" y2="200" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="10" y1="200" x2="200" y2="10" stroke="currentColor" strokeWidth="1.5" />
                </svg>

                <div className="absolute inset-0 p-3 text-[10px] font-mono pointer-events-none">
                  {liveAstroState.houses.map((hObj) => {
                    const hNum = hObj.houseNum;
                    const isLagna = hNum === 1;
                    const rashiNum = ((liveAstroState.lagnaRashiIdx + (hNum - 1)) % 12) + 1;
                    const posMap: Record<number, string> = {
                      1: "top-[18%] left-[38%] w-[24%] h-[22%]",
                      2: "top-[6%] left-[18%] w-[20%] h-[16%]",
                      3: "top-[18%] left-[5%] w-[16%] h-[20%]",
                      4: "top-[38%] left-[18%] w-[22%] h-[24%]",
                      5: "top-[62%] left-[5%] w-[16%] h-[20%]",
                      6: "top-[76%] left-[18%] w-[20%] h-[16%]",
                      7: "top-[60%] left-[38%] w-[24%] h-[22%]",
                      8: "top-[76%] left-[62%] w-[20%] h-[16%]",
                      9: "top-[62%] left-[78%] w-[16%] h-[20%]",
                      10: "top-[38%] left-[60%] w-[22%] h-[24%]",
                      11: "top-[18%] left-[78%] w-[16%] h-[20%]",
                      12: "top-[6%] left-[62%] w-[20%] h-[16%]"
                    };

                    return (
                      <div
                        key={hNum}
                        className={`absolute flex flex-col items-center justify-center text-center p-0.5 rounded ${
                          posMap[hNum] || ""
                        }`}
                      >
                        <div className="flex items-center gap-1 font-extrabold">
                          <span className={isLagna ? "text-amber-300 font-bold text-xs" : "text-amber-400/80 font-bold"}>
                            {rashiNum}
                          </span>
                          {isLagna && <span className="bg-amber-500 text-slate-950 px-1 rounded text-[8px] font-extrabold">ASC</span>}
                        </div>
                        <span className="text-amber-200/70 font-semibold text-[9px]">{hObj.rashiName.slice(0, 3)}</span>
                        <div className="flex flex-wrap justify-center gap-0.5 mt-0.5">
                          {hObj.occupants.map((pl) => (
                            <span key={pl.id} className={`px-0.5 rounded font-bold text-[8px] ${pl.color} bg-slate-900/80`}>
                              {pl.id.slice(0, 2)}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 grid-rows-4 gap-1 bg-[#18120E] border-2 border-amber-500/40 rounded-2xl p-2 shadow-2xl aspect-square max-w-md mx-auto text-[10px] font-mono relative">
                {(chartViewStyle === "south" ? SOUTH_INDIAN_LAYOUT : EAST_INDIAN_LAYOUT).map((item) => {
                  const rashiName = item.rashi;
                  const houseObj = liveAstroState.houses.find((h) => h.rashiName === rashiName);
                  const isLagna = liveAstroState.lagnaRashiName === rashiName;

                  return (
                    <div
                      key={rashiName}
                      style={{ gridRowStart: item.row, gridColumnStart: item.col }}
                      className={`p-1.5 rounded border flex flex-col justify-between ${
                        isLagna ? "bg-amber-500/20 border-amber-400 font-bold" : "bg-[#100C09] border-amber-900/30"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[9px]">
                        <span className="text-amber-300 font-bold">{rashiName.slice(0, 3)}</span>
                        {isLagna && <span className="bg-amber-500 text-slate-950 px-1 rounded text-[8px] font-bold">ASC</span>}
                      </div>

                      <div className="flex flex-wrap gap-1 mt-1">
                        {houseObj?.occupants.map((pl) => (
                          <span key={pl.id} className={`font-bold ${pl.color}`}>{pl.id.slice(0, 2)}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* Central Chart Info Badge */}
                <div className="col-start-2 col-span-2 row-start-2 row-span-2 bg-[#120E0C] border border-amber-500/30 rounded-xl flex flex-col items-center justify-center text-center p-2 text-[10px] text-amber-200 shadow-inner">
                  <div className="font-bold text-amber-300 text-xs">
                    {chartViewStyle === "south" ? "South Indian Chart" : "East Indian Chart"}
                  </div>
                  <div className="text-[9px] text-amber-400/80 font-mono mt-0.5">
                    {chartViewStyle === "south" ? "Clockwise Fixed Grid" : "Counter-Clockwise Fixed Grid"}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 bg-[#140F0C] border border-amber-500/30 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-amber-100 flex items-center justify-between border-b border-amber-900/30 pb-3">
              <span>Live Planetary Ephemeris</span>
              <span className="text-xs font-mono text-amber-400">Lahiri Ayanamsha</span>
            </h3>

            <div className="space-y-2 overflow-y-auto max-h-[420px] pr-1">
              {liveAstroState.planets.map((pl) => (
                <div
                  key={pl.id}
                  className="bg-[#18120E] p-3 rounded-xl border border-amber-900/30 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`text-base font-bold ${pl.color}`}>{pl.symbol}</span>
                    <div>
                      <div className="font-bold text-amber-100 flex items-center gap-1.5">
                        <span>{pl.name}</span>
                        {pl.isRetro && <span className="text-[10px] text-rose-400 font-mono font-bold">(Rx)</span>}
                        {pl.isCombust && <span className="text-[10px] text-amber-500 font-mono font-bold">(Combust)</span>}
                      </div>
                      <div className="text-[10px] text-amber-200/60 font-mono">
                        House {pl.houseNum} ({pl.rashiName})
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-amber-300 font-bold">{pl.degInRashi.toFixed(1)}°</div>
                    <div className="text-[10px] text-amber-400/80">{pl.nakshatraName} P{pl.pada}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "divisional_charts" && (
        <div className="bg-[#140F0C] border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-amber-900/30 pb-4">
            <div>
              <h3 className="text-lg font-bold text-amber-100">Divisional Charts (Vargas D1 to D60)</h3>
              <p className="text-xs text-amber-200/70">
                Divisional charts partition degrees to analyze specific life domains with extreme precision.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {["D1", "D9", "D10", "D7", "D12", "D60"].map((chartId) => (
                <button
                  key={chartId}
                  onClick={() => setSelectedDivisionalChart(chartId)}
                  className={`px-3 py-1.5 rounded-lg border font-bold cursor-pointer transition-all ${
                    selectedDivisionalChart === chartId
                      ? "bg-amber-500 text-slate-950 border-amber-400"
                      : "bg-[#18120E] text-amber-200 border-amber-900/40 hover:bg-[#201813]"
                  }`}
                >
                  {chartId}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#18120E] p-4 rounded-xl border border-amber-500/20 text-xs font-mono text-amber-200 space-y-2">
            <div className="text-amber-400 font-bold text-sm">
              Current Active View: {selectedDivisionalChart} Chart
            </div>
            <p>
              {selectedDivisionalChart === "D1" && "D1 Rashi Chart — Main physical existence & overall life trajectory."}
              {selectedDivisionalChart === "D9" && "D9 Navamsha Chart — Soul purpose, spousal compatibility & dharma alignment."}
              {selectedDivisionalChart === "D10" && "D10 Dashamsha Chart — Career, public fame, authority & professional karma."}
              {selectedDivisionalChart === "D7" && "D7 Saptamsha Chart — Progeny, children, & creative lineage."}
              {selectedDivisionalChart === "D12" && "D12 Dwadasamsha Chart — Parents, ancestral lineage & karmic roots."}
              {selectedDivisionalChart === "D60" && "D60 Shashtiamsha Chart — Past life karma & deepest prarabdha destiny."}
            </p>
          </div>
        </div>
      )}

      {activeTab === "dignity_matrix" && (
        <div className="bg-[#140F0C] border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
          <div className="border-b border-amber-900/30 pb-3">
            <h3 className="text-lg font-bold text-amber-100">Live Planetary Dignity & Strength Matrix</h3>
            <p className="text-xs text-amber-200/70">
              Evaluates Exaltation (Ucca), Debilitation (Neecha), Own Sign (Swarashi), Combustion & Retrograde Status.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {liveAstroState.planets.map((pl) => (
              <div
                key={pl.id}
                className="bg-[#18120E] p-4 rounded-xl border border-amber-900/40 space-y-2"
              >
                <div className="flex items-center justify-between border-b border-amber-900/30 pb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xl font-bold ${pl.color}`}>{pl.symbol}</span>
                    <span className="font-bold text-amber-100">{pl.name}</span>
                  </div>
                  <span className="font-mono text-amber-300 font-bold">{pl.rashiName}</span>
                </div>

                <div className="space-y-1 text-amber-200/80">
                  <div className="flex justify-between">
                    <span>Degree:</span>
                    <strong className="text-amber-200 font-mono">{pl.degInRashi.toFixed(2)}°</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Dignity Status:</span>
                    <strong className="text-amber-300 font-mono">{pl.dignity}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Motion:</span>
                    <strong className={pl.isRetro ? "text-rose-400 font-mono" : "text-emerald-400 font-mono"}>
                      {pl.isRetro ? "Retrograde (Rx)" : "Direct (Marga)"}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
