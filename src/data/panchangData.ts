import { PanchangInfo } from "../types";
import { calculateExactEphemerisPanchang, calculateLocationSunriseSunset, GLOBAL_CITIES } from "../utils/vedicAstronomicalEngine";

export interface PanchangDayDetails {
  dateStr: string;
  formattedDateStr?: string;
  dayOfWeek: string;
  tithi: string;
  paksha: "Shukla Paksha" | "Krishna Paksha";
  nakshatra: string;
  nakshatraRuler: string;
  yoga: string;
  karana: string;
  sunSign: string;
  moonSign: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  
  // Auspicious & Inauspicious Windows
  abhijitMuhurat: string;
  brahmaMuhurat: string;
  rahuKalam: string;
  yamagandaKalam: string;
  gulikaKalam: string;
  durmuhurat: string;
  varjyam: string;
  
  // 24 Horas Breakdown
  dayHoras: { hourNumber: number; timeRange: string; rulingPlanet: string; nature: "Auspicious" | "Inauspicious" | "Neutral"; bestFor: string; isActive?: boolean }[];
  nightHoras: { hourNumber: number; timeRange: string; rulingPlanet: string; nature: "Auspicious" | "Inauspicious" | "Neutral"; bestFor: string; isActive?: boolean }[];

  // Choghadiya
  dayChoghadiya: { name: string; time: string; nature: "Amrit" | "Shubh" | "Labh" | "Char" | "Rog" | "Kal" | "Udveg"; lord: string }[];
}

export interface ShubhMuhuratCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  dates: {
    date: string;
    day: string;
    timing: string;
    nakshatra: string;
    tithi: string;
    suitabilityScore: number; // 0-100%
    notes: string;
  }[];
}

export function getPanchangAndHorasForDate(dateInput?: Date | string): PanchangDayDetails {
  const target = dateInput ? (typeof dateInput === "string" ? new Date(dateInput.includes("T") ? dateInput : `${dateInput}T00:00:00`) : dateInput) : new Date();
  
  // Ensure valid date
  const validDate = isNaN(target.getTime()) ? new Date() : target;
  
  const month = validDate.getMonth(); // 0-11
  const day = validDate.getDate(); // 1-31
  const dayOfWeekIdx = validDate.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat

  const dateStr = validDate.toISOString().split("T")[0];
  const options: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDateStr = validDate.toLocaleDateString("en-US", options);

  const VARA_MAP = [
    { name: "Sunday (Ravivara)", lord: "Sun (Surya)", startPlanet: "Sun" },
    { name: "Monday (Somavara)", lord: "Moon (Chandra)", startPlanet: "Moon" },
    { name: "Tuesday (Mangalavara)", lord: "Mars (Mangal)", startPlanet: "Mars" },
    { name: "Wednesday (Budhavara)", lord: "Mercury (Budha)", startPlanet: "Mercury" },
    { name: "Thursday (Guruvara)", lord: "Jupiter (Guru)", startPlanet: "Jupiter" },
    { name: "Friday (Shukravara)", lord: "Venus (Shukra)", startPlanet: "Venus" },
    { name: "Saturday (Shanivara)", lord: "Saturn (Shani)", startPlanet: "Saturn" },
  ];

  const currentVara = VARA_MAP[dayOfWeekIdx];

  // Calculations based on epoch offset
  const refDate = new Date("2024-01-01T00:00:00Z");
  const diffDays = Math.floor((validDate.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));

  // Tithi calculation (30 Tithis)
  const TITHI_NAMES = [
    "Prathama", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
    "Shashti", "Saptami", "Ashtami", "Navami", "Dashami",
    "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima",
    "Prathama", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
    "Shashti", "Saptami", "Ashtami", "Navami", "Dashami",
    "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"
  ];
  const tithiIdx = Math.abs((Math.floor(diffDays * 1.016) + 12)) % 30;
  const isShukla = tithiIdx < 15;
  const pakshaStr = isShukla ? "Shukla Paksha" : "Krishna Paksha";
  const tithiName = `${pakshaStr} ${TITHI_NAMES[tithiIdx]} (${(tithiIdx % 15) + 1}th Tithi)`;

  // Nakshatra calculation (27 Nakshatras)
  const NAKSHATRA_LIST = [
    { name: "Ashwini", lord: "Ketu" }, { name: "Bharani", lord: "Venus" }, { name: "Krittika", lord: "Sun" },
    { name: "Rohini", lord: "Moon" }, { name: "Mrigashira", lord: "Mars" }, { name: "Ardra", lord: "Rahu" },
    { name: "Punarvasu", lord: "Jupiter" }, { name: "Pushya", lord: "Saturn" }, { name: "Ashlesha", lord: "Mercury" },
    { name: "Magha", lord: "Ketu" }, { name: "Purva Phalguni", lord: "Venus" }, { name: "Uttara Phalguni", lord: "Sun" },
    { name: "Hasta", lord: "Moon" }, { name: "Chitra", lord: "Mars" }, { name: "Swati", lord: "Rahu" },
    { name: "Vishakha", lord: "Jupiter" }, { name: "Anuradha", lord: "Saturn" }, { name: "Jyeshtha", lord: "Mercury" },
    { name: "Mula", lord: "Ketu" }, { name: "Purva Ashadha", lord: "Venus" }, { name: "Uttara Ashadha", lord: "Sun" },
    { name: "Shravana", lord: "Moon" }, { name: "Dhanishta", lord: "Mars" }, { name: "Shatabhisha", lord: "Rahu" },
    { name: "Purva Bhadrapada", lord: "Jupiter" }, { name: "Uttara Bhadrapada", lord: "Saturn" }, { name: "Revati", lord: "Mercury" }
  ];
  const nakIdx = Math.abs((Math.floor(diffDays * 1.03) + 3)) % 27;
  const currNak = NAKSHATRA_LIST[nakIdx];

  // Yoga & Karana
  const YOGA_LIST = [
    "Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarma", "Dhriti", "Shula",
    "Ganda", "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra", "Siddhi", "Vyatipata", "Variyana",
    "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma", "Indra", "Vaidhriti"
  ];
  const yogaIdx = Math.abs((Math.floor(diffDays * 1.05) + 8)) % 27;

  const KARANA_LIST = ["Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti (Bhadra)", "Shakuni", "Chatushpada", "Naga", "Kintughna"];
  const karanaIdx = Math.abs((Math.floor(diffDays * 2.03) + 2)) % 11;

  // Sun Sign & Moon Sign
  const ZODIAC_SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  const sunSignIdx = (month + (day >= 21 ? 1 : 0)) % 12;
  const moonSignIdx = Math.abs((Math.floor(diffDays * 0.366) + 1)) % 12;

  // Rahu Kalam, Yamaganda, Gulika Kalam by weekday
  const RAHU_KALAM_MAP = [
    "04:30 PM - 06:00 PM", // Sun
    "07:30 AM - 09:00 AM", // Mon
    "03:00 PM - 04:30 PM", // Tue
    "12:00 PM - 01:30 PM", // Wed
    "01:30 PM - 03:00 PM", // Thu
    "10:30 AM - 12:00 PM", // Fri
    "09:00 AM - 10:30 AM"  // Sat
  ];

  const YAMAGANDA_MAP = [
    "12:00 PM - 01:30 PM", // Sun
    "10:30 AM - 12:00 PM", // Mon
    "09:00 AM - 10:30 AM", // Tue
    "07:30 AM - 09:00 AM", // Wed
    "06:00 AM - 07:30 AM", // Thu
    "03:00 PM - 04:30 PM", // Fri
    "01:30 PM - 03:00 PM"  // Sat
  ];

  const GULIKA_MAP = [
    "03:00 PM - 04:30 PM", // Sun
    "01:30 PM - 03:00 PM", // Mon
    "12:00 PM - 01:30 PM", // Tue
    "10:30 AM - 12:00 PM", // Wed
    "09:00 AM - 10:30 AM", // Thu
    "07:30 AM - 09:00 AM", // Fri
    "06:00 AM - 07:30 AM"  // Sat
  ];

  // 24 Horas Calculation - Chaldean order starting from Weekday Lord
  const CHALDEAN_ORDER = ["Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter", "Mars"];
  const startPlanetName = currentVara.startPlanet;
  const startIdx = CHALDEAN_ORDER.indexOf(startPlanetName);

  const HORA_PLANET_DETAILS: Record<string, { full: string; nature: "Auspicious" | "Inauspicious" | "Neutral"; bestFor: string }> = {
    Sun: { full: "Sun (Surya)", nature: "Auspicious", bestFor: "Meeting executives, filing government papers, leadership deals, taking charge" },
    Venus: { full: "Venus (Shukra)", nature: "Auspicious", bestFor: "Buying luxury goods/vehicles, romance, art & design, music, wearing jewelry" },
    Mercury: { full: "Mercury (Budha)", nature: "Auspicious", bestFor: "Accounting, software coding, signing contracts, trade, education & writing" },
    Moon: { full: "Moon (Chandra)", nature: "Auspicious", bestFor: "Public interactions, purchasing liquid assets, family dining, travel over water" },
    Saturn: { full: "Saturn (Shani)", nature: "Inauspicious", bestFor: "Routine hard work, clearing backlog, machinery cleaning, property maintenance" },
    Jupiter: { full: "Jupiter (Guru)", nature: "Auspicious", bestFor: "Investments, bank accounts, legal consultation, religious rituals, higher studies" },
    Mars: { full: "Mars (Mangal)", nature: "Inauspicious", bestFor: "Land/real estate deals, competitive sports, physical workout, engineering tasks" }
  };

  const isToday = validDate.toDateString() === new Date().toDateString();
  const currentLocalHour = new Date().getHours(); // 0-23

  const dayHoras = [];
  for (let i = 0; i < 12; i++) {
    const planet = CHALDEAN_ORDER[(startIdx + i) % 7];
    const details = HORA_PLANET_DETAILS[planet];
    const hourNum = i + 1;
    const startHourNum = 6 + i;
    const endHourNum = 6 + i + 1;

    const startStr = startHourNum < 12 ? `${startHourNum < 10 ? '0' : ''}${startHourNum}:00 AM` : startHourNum === 12 ? "12:00 PM" : `${(startHourNum - 12) < 10 ? '0' : ''}${startHourNum - 12}:00 PM`;
    const endStr = endHourNum < 12 ? `${endHourNum < 10 ? '0' : ''}${endHourNum}:00 AM` : endHourNum === 12 ? "12:00 PM" : `${(endHourNum - 12) < 10 ? '0' : ''}${endHourNum - 12}:00 PM`;

    const isActive = isToday && currentLocalHour === startHourNum;

    dayHoras.push({
      hourNumber: hourNum,
      timeRange: `${startStr} - ${endStr}`,
      rulingPlanet: details.full,
      nature: details.nature,
      bestFor: details.bestFor,
      isActive
    });
  }

  const nightHoras = [];
  for (let i = 0; i < 12; i++) {
    const planet = CHALDEAN_ORDER[(startIdx + 12 + i) % 7];
    const details = HORA_PLANET_DETAILS[planet];
    const hourNum = 13 + i;
    const startHour24 = (18 + i) % 24;
    const endHour24 = (18 + i + 1) % 24;

    const format24 = (h: number) => {
      if (h === 0) return "12:00 AM";
      if (h === 12) return "12:00 PM";
      if (h < 12) return `${h < 10 ? '0' : ''}${h}:00 AM`;
      return `${(h - 12) < 10 ? '0' : ''}${h - 12}:00 PM`;
    };

    const isActive = isToday && currentLocalHour === startHour24;

    nightHoras.push({
      hourNumber: hourNum,
      timeRange: `${format24(startHour24)} - ${format24(endHour24)}`,
      rulingPlanet: details.full,
      nature: details.nature,
      bestFor: details.bestFor,
      isActive
    });
  }

  // Choghadiyas by weekday
  const DAY_CHOGHADIYA_PATTERNS: Record<number, string[]> = {
    0: ["Udveg", "Char", "Labh", "Amrit", "Kal", "Shubh", "Rog", "Udveg"], // Sun
    1: ["Amrit", "Kal", "Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit"], // Mon
    2: ["Rog", "Udveg", "Char", "Labh", "Amrit", "Kal", "Shubh", "Rog"],   // Tue
    3: ["Labh", "Amrit", "Kal", "Shubh", "Rog", "Udveg", "Char", "Labh"],   // Wed
    4: ["Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit", "Kal", "Shubh"], // Thu
    5: ["Char", "Labh", "Amrit", "Kal", "Shubh", "Rog", "Udveg", "Char"],  // Fri
    6: ["Kal", "Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit", "Kal"]   // Sat
  };

  const CHOGHADIYA_NATURE_LORD: Record<string, { nature: "Amrit" | "Shubh" | "Labh" | "Char" | "Rog" | "Kal" | "Udveg"; lord: string }> = {
    Amrit: { nature: "Amrit", lord: "Moon (Chandra) — Highly Auspicious" },
    Shubh: { nature: "Shubh", lord: "Sun (Surya) — Auspicious" },
    Labh: { nature: "Labh", lord: "Mercury (Budha) — Auspicious Gains" },
    Char: { nature: "Char", lord: "Venus (Shukra) — Auspicious Travel" },
    Rog: { nature: "Rog", lord: "Mars (Mangal) — Inauspicious" },
    Kal: { nature: "Kal", lord: "Rahu — Inauspicious" },
    Udveg: { nature: "Udveg", lord: "Saturn (Shani) — Inauspicious" }
  };

  const pattern = DAY_CHOGHADIYA_PATTERNS[dayOfWeekIdx];
  const dayChoghadiya = pattern.map((name, idx) => {
    const sH = 6 + Math.floor(idx * 1.5);
    const eH = 6 + Math.floor((idx + 1) * 1.5);

    const formatHour = (h: number) => {
      const hClamped = h % 24;
      if (hClamped === 12) return "12:00 PM";
      if (hClamped < 12) return `${hClamped < 10 ? '0' : ''}${hClamped}:00 AM`;
      return `${(hClamped - 12) < 10 ? '0' : ''}${hClamped - 12}:00 PM`;
    };

    const nl = CHOGHADIYA_NATURE_LORD[name];

    return {
      name,
      time: `${formatHour(sH)} - ${formatHour(eH)}`,
      nature: nl.nature,
      lord: nl.lord
    };
  });

  const defaultCity = GLOBAL_CITIES[0]; // New Delhi
  const eph = calculateExactEphemerisPanchang(validDate, defaultCity);
  const sunTimes = calculateLocationSunriseSunset(validDate, defaultCity);

  return {
    dateStr,
    formattedDateStr,
    dayOfWeek: currentVara.name,
    tithi: `${eph.tithi} (${eph.tithiTimingStr})`,
    paksha: eph.paksha,
    nakshatra: `${eph.nakshatra} Nakshatra (${eph.nakshatraTimingStr})`,
    nakshatraRuler: eph.nakshatraRuler,
    yoga: `${eph.yoga} Yoga (${eph.yogaTimingStr})`,
    karana: `${eph.karana} Karana (${eph.karanaTimingStr})`,
    sunSign: eph.sunSign,
    moonSign: eph.moonSign,
    sunrise: sunTimes.sunriseStr,
    sunset: sunTimes.sunsetStr,
    moonrise: eph.moonriseStr,
    moonset: `${eph.moonsetStr} (Next Day)`,

    abhijitMuhurat: "11:52 AM - 12:44 PM (Golden Window)",
    brahmaMuhurat: "04:20 AM - 05:05 AM (Spiritual Awakening)",
    rahuKalam: RAHU_KALAM_MAP[dayOfWeekIdx],
    yamagandaKalam: YAMAGANDA_MAP[dayOfWeekIdx],
    gulikaKalam: GULIKA_MAP[dayOfWeekIdx],
    durmuhurat: "12:44 PM - 01:36 PM",
    varjyam: "08:10 PM - 09:45 PM",

    dayHoras,
    nightHoras,
    dayChoghadiya
  };
}

export const TODAY_PANCHANG_MASTER: PanchangDayDetails = getPanchangAndHorasForDate(new Date());

export const SHUBH_MUHURAT_CATEGORIES: ShubhMuhuratCategory[] = [
  {
    id: "vehicle",
    title: "Vehicle Buying Muhurat (Car / Bike)",
    icon: "Car",
    description: "Auspicious planetary alignment for buying new cars, bikes, or commercial vehicles for accident-free longevity.",
    dates: [
      { date: "July 28, 2026", day: "Tuesday", timing: "06:15 AM - 11:30 AM", nakshatra: "Swati Nakshatra", tithi: "Trayodashi", suitabilityScore: 96, notes: "Venus in 11th house guarantees luxury and smooth travel." },
      { date: "August 02, 2026", day: "Sunday", timing: "02:00 PM - 06:45 PM", nakshatra: "Pushya Nakshatra", tithi: "Purnima", suitabilityScore: 98, notes: "Pushya Nakshatra + Sunday is supreme for purchasing assets." },
      { date: "August 10, 2026", day: "Monday", timing: "09:00 AM - 01:15 PM", nakshatra: "Rohini Nakshatra", tithi: "Dwitiya", suitabilityScore: 92, notes: "Moon-ruled Rohini brings prosperity and safety." }
    ]
  },
  {
    id: "property",
    title: "Griha Pravesh & House Warming",
    icon: "Home",
    description: "Auspicious moments for moving into a new home or inaugurating residential property.",
    dates: [
      { date: "August 05, 2026", day: "Wednesday", timing: "06:00 AM - 10:20 AM", nakshatra: "Anuradha Nakshatra", tithi: "Panchami", suitabilityScore: 95, notes: "Mitra Nakshatra ensures peace and family harmony in new abode." },
      { date: "August 14, 2026", day: "Friday", timing: "07:30 AM - 12:00 PM", nakshatra: "Uttara Phalguni", tithi: "Saptami", suitabilityScore: 94, notes: "Sun-ruled fixed Nakshatra brings permanent stability." },
      { date: "August 22, 2026", day: "Saturday", timing: "08:15 AM - 01:30 PM", nakshatra: "Uttara Ashadha", tithi: "Dashami", suitabilityScore: 91, notes: "Tithi aspected by Jupiter." }
    ]
  },
  {
    id: "marriage",
    title: "Vivah (Marriage) Muhurat",
    icon: "Heart",
    description: "Sacred planetary synchronization for eternal marital bliss, health, and mutual understanding.",
    dates: [
      { date: "November 18, 2026", day: "Wednesday", timing: "07:00 PM - 11:45 PM", nakshatra: "Rohini Nakshatra", tithi: "Tritiya", suitabilityScore: 99, notes: "Jupiter & Venus exalted aspect on 7th house." },
      { date: "November 23, 2026", day: "Monday", timing: "06:30 PM - 10:15 PM", nakshatra: "Mrigashira", tithi: "Panchami", suitabilityScore: 96, notes: "Chandra-Mangal auspicious yoga present." },
      { date: "December 02, 2026", day: "Wednesday", timing: "08:00 PM - 02:00 AM", nakshatra: "Uttara Bhadrapada", tithi: "Saptami", suitabilityScore: 97, notes: "Fixed Nakshatra guarantees deep marital roots." }
    ]
  },
  {
    id: "business",
    title: "New Business & Job Start",
    icon: "Briefcase",
    description: "Ideal windows to launch a company, sign deals, open bank accounts, or start a new job.",
    dates: [
      { date: "July 29, 2026", day: "Wednesday", timing: "09:30 AM - 01:00 PM", nakshatra: "Hasta Nakshatra", tithi: "Chaturdashi", suitabilityScore: 94, notes: "Mercury in own sign Gemini promotes high profit margins." },
      { date: "August 06, 2026", day: "Thursday", timing: "10:15 AM - 02:30 PM", nakshatra: "Jyeshtha", tithi: "Shasthi", suitabilityScore: 93, notes: "Budhaditya Yoga active in 10th house." },
      { date: "August 18, 2026", day: "Tuesday", timing: "08:00 AM - 11:45 AM", nakshatra: "Chitra", tithi: "Ekadashi", suitabilityScore: 96, notes: "Exalted Mars provides courage and execution speed." }
    ]
  },
  {
    id: "gemstone",
    title: "Gemstone & Gold Buying",
    icon: "Gem",
    description: "Auspicious times to purchase gold, silver, diamonds, and consecrate birth gemstones.",
    dates: [
      { date: "August 02, 2026", day: "Sunday", timing: "Full Day (Pushya Nakshatra)", nakshatra: "Pushya Nakshatra", tithi: "Purnima", suitabilityScore: 100, notes: "Ravi Pushya Yoga — Supreme golden window for purchasing gold and wearing gemstones." },
      { date: "August 28, 2026", day: "Friday", timing: "11:00 AM - 04:00 PM", nakshatra: "Revati", tithi: "Tritiya", suitabilityScore: 95, notes: "Venus Hora + Revati brings rapid fortune expansion." }
    ]
  },
  {
    id: "namakaran",
    title: "Namakaran (Baby Naming)",
    icon: "Baby",
    description: "Auspicious phonetic vibrations and Nakshatra alignment for baby naming ceremonies.",
    dates: [
      { date: "August 08, 2026", day: "Saturday", timing: "08:30 AM - 11:30 AM", nakshatra: "Rohini", tithi: "Ashtami", suitabilityScore: 95, notes: "Soft, gentle Nakshatra fosters sweet disposition." },
      { date: "August 19, 2026", day: "Wednesday", timing: "09:00 AM - 12:15 PM", nakshatra: "Swati", tithi: "Dwadashi", suitabilityScore: 93, notes: "Wind element gives sharp intelligence and adaptability." }
    ]
  }
];
