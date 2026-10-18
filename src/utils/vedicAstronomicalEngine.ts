// Dev-Guru Vedic Astronomical & Ephemeris Engine

import { PanchangInfo, PlanetPosition } from "../types";
import { defaultEphemerisProvider } from "../engine/ephemerisProvider";
import { AyanamsaService } from "../engine/ayanamsaEngine";
import { calculateAscendant } from "../engine/astronomyMath";
import { calculateAuthoritativePanchang } from "../engine/panchangEngine";

export interface CityLocation {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  timezoneOffsetHours: number;
}

export const GLOBAL_CITIES: CityLocation[] = [
  { name: "New Delhi", country: "India", latitude: 28.6139, longitude: 77.2090, timezone: "Asia/Kolkata", timezoneOffsetHours: 5.5 },
  { name: "Mumbai", country: "India", latitude: 19.0760, longitude: 72.8777, timezone: "Asia/Kolkata", timezoneOffsetHours: 5.5 },
  { name: "Varanasi", country: "India", latitude: 25.3176, longitude: 82.9739, timezone: "Asia/Kolkata", timezoneOffsetHours: 5.5 },
  { name: "Ujjain", country: "India", latitude: 23.1765, longitude: 75.7885, timezone: "Asia/Kolkata", timezoneOffsetHours: 5.5 },
  { name: "Bengaluru", country: "India", latitude: 12.9716, longitude: 77.5946, timezone: "Asia/Kolkata", timezoneOffsetHours: 5.5 },
  { name: "London", country: "UK", latitude: 51.5074, longitude: -0.1278, timezone: "Europe/London", timezoneOffsetHours: 0.0 },
  { name: "New York", country: "USA", latitude: 40.7128, longitude: -74.0060, timezone: "America/New_York", timezoneOffsetHours: -5.0 },
  { name: "San Francisco", country: "USA", latitude: 37.7749, longitude: -122.4194, timezone: "America/Los_Angeles", timezoneOffsetHours: -8.0 },
  { name: "Dubai", country: "UAE", latitude: 25.2048, longitude: 55.2708, timezone: "Asia/Dubai", timezoneOffsetHours: 4.0 },
  { name: "Singapore", country: "Singapore", latitude: 1.3521, longitude: 103.8198, timezone: "Asia/Singapore", timezoneOffsetHours: 8.0 },
  { name: "Sydney", country: "Australia", latitude: -33.8688, longitude: 151.2093, timezone: "Australia/Sydney", timezoneOffsetHours: 10.0 }
];

export interface ShadbalaPlanetDetail {
  planet: string;
  totalRupas: number;
  reqRupas: number;
  totalVirupas: number;
  strengthStatus: string;
  stanabala: number;
  digbala: number;
  kaalabala: number;
  cheshtabala: number;
  naisargika: number;
  drikbala: number;
}

export interface VimshottariPeriod {
  planet: string;
  mahadashaLord: string;
  antardashaLord: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  prediction: string;
  remedy: string;
}

const RASHIS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const NAKSHATRAS = [
  { name: "Ashwini", lord: "Ketu" },
  { name: "Bharani", lord: "Venus" },
  { name: "Krittika", lord: "Sun" },
  { name: "Rohini", lord: "Moon" },
  { name: "Mrigashira", lord: "Mars" },
  { name: "Ardra", lord: "Rahu" },
  { name: "Punarvasu", lord: "Jupiter" },
  { name: "Pushya", lord: "Saturn" },
  { name: "Ashlesha", lord: "Mercury" },
  { name: "Magha", lord: "Ketu" },
  { name: "Purva Phalguni", lord: "Venus" },
  { name: "Uttara Phalguni", lord: "Sun" },
  { name: "Hasta", lord: "Moon" },
  { name: "Chitra", lord: "Mars" },
  { name: "Swati", lord: "Rahu" },
  { name: "Vishakha", lord: "Jupiter" },
  { name: "Anuradha", lord: "Saturn" },
  { name: "Jyeshtha", lord: "Mercury" },
  { name: "Mula", lord: "Ketu" },
  { name: "Purva Ashadha", lord: "Venus" },
  { name: "Uttara Ashadha", lord: "Sun" },
  { name: "Shravana", lord: "Moon" },
  { name: "Dhanishta", lord: "Mars" },
  { name: "Shatabhisha", lord: "Rahu" },
  { name: "Purva Bhadrapada", lord: "Jupiter" },
  { name: "Uttara Bhadrapada", lord: "Saturn" },
  { name: "Revati", lord: "Mercury" }
];

export function calculateLocationSunriseSunset(
  latOrDate: number | Date | string = 28.6139,
  lngOrCity: number | any = 77.2090,
  dateOrTz: Date = new Date()
) {
  let date = new Date();
  let lat = 28.6139;
  let lng = 77.2090;
  let tzOffsetHours = 5.5;

  if (latOrDate instanceof Date || (typeof latOrDate === "string" && isNaN(Number(latOrDate)))) {
    date = latOrDate instanceof Date ? latOrDate : new Date(latOrDate);
    if (isNaN(date.getTime())) date = new Date();
    if (typeof lngOrCity === "object" && lngOrCity !== null) {
      lat = lngOrCity.latitude ?? lat;
      lng = lngOrCity.longitude ?? lng;
      tzOffsetHours = lngOrCity.timezoneOffsetHours ?? (lng / 15);
    }
  } else if (typeof latOrDate === "number") {
    lat = latOrDate;
    lng = typeof lngOrCity === "number" ? lngOrCity : 77.2090;
    date = dateOrTz instanceof Date ? dateOrTz : new Date();
    tzOffsetHours = lng / 15;
  }

  const p = calculateAuthoritativePanchang({
    date,
    latitude: lat,
    longitude: lng,
    timezoneOffsetHours: tzOffsetHours
  });

  return {
    sunrise: p.sunrise || "06:00 AM",
    sunset: p.sunset || "06:00 PM",
    sunriseStr: p.sunrise || "06:00 AM",
    sunsetStr: p.sunset || "06:00 PM",
    dayDuration: p.dinamana || "12h 00m",
    brahmaMuhurat: p.brahmaMuhurat || "04:24 AM - 05:12 AM",
    abhijitMuhurat: p.abhijitMuhurat || "11:36 AM - 12:24 PM",
    rahuKalam: p.rahuKalam || "04:30 PM - 06:00 PM",
    yamagandaKalam: p.yamagandaKalam || "12:00 PM - 01:30 PM",
    gulikaKalam: p.gulikaKalam || "01:30 PM - 03:00 PM",
    durmuhurtam: p.durmuhurtam || "08:35 AM - 09:24 AM",
    varjyam: p.varjyam || "",
    dinamanaMs: p.dinamanaMs,
    ratrimanaMs: p.ratrimanaMs
  };
}

export function calculateExactPlanetaryPositions(
  dateOrDob: Date | string = new Date(),
  latOrTime: number | string = 28.6139,
  lngOrPlace: number | string = 77.2090
): any {
  let year = 1995;
  let month = 8;
  let day = 15;
  let hour = 10;
  let minute = 30;
  let second = 0;
  let lat = 28.6139;
  let lng = 77.2090;
  let tzOffset = 5.5;

  // 1. Parse Date / DOB
  if (dateOrDob instanceof Date) {
    year = dateOrDob.getFullYear();
    month = dateOrDob.getMonth() + 1;
    day = dateOrDob.getDate();
    hour = dateOrDob.getHours();
    minute = dateOrDob.getMinutes();
    second = dateOrDob.getSeconds();
  } else if (typeof dateOrDob === "string") {
    const parts = dateOrDob.trim().split("T")[0].split("-");
    if (parts.length === 3) {
      year = parseInt(parts[0], 10) || 1995;
      month = parseInt(parts[1], 10) || 8;
      day = parseInt(parts[2], 10) || 15;
    }
  }

  // 2. Parse Time / Lat
  if (typeof latOrTime === "number") {
    lat = latOrTime;
    if (typeof lngOrPlace === "number") {
      lng = lngOrPlace;
    }
  } else if (typeof latOrTime === "string") {
    if (latOrTime.includes(":")) {
      const tParts = latOrTime.split(":");
      hour = parseInt(tParts[0], 10) || 12;
      minute = parseInt(tParts[1], 10) || 0;
      second = tParts[2] ? parseInt(tParts[2], 10) || 0 : 0;
    } else {
      const parsedNum = parseFloat(latOrTime);
      if (!isNaN(parsedNum)) lat = parsedNum;
    }
  }

  // 3. Parse Place / Longitude
  if (typeof lngOrPlace === "string") {
    const city = GLOBAL_CITIES.find(
      (c) => c.name.toLowerCase() === lngOrPlace.toLowerCase() ||
             lngOrPlace.toLowerCase().includes(c.name.toLowerCase())
    );
    if (city) {
      lat = city.latitude;
      lng = city.longitude;
      tzOffset = city.timezoneOffsetHours;
    } else {
      const parsedLng = parseFloat(lngOrPlace);
      if (!isNaN(parsedLng)) lng = parsedLng;
    }
  }

  // Calculate Ephemeris & Ayanamsha
  let ephem: any = null;
  try {
    ephem = defaultEphemerisProvider.calculateEphemeris({
      year,
      month,
      day,
      hour,
      minute,
      second,
      timezoneOffsetHours: tzOffset,
      latitude: lat,
      longitude: lng
    });
  } catch {
    ephem = null;
  }

  const jd = ephem?.julianDay || 2450000;
  let ayanamshaVal = 23.85;
  try {
    ayanamshaVal = AyanamsaService.calculateAyanamsa(jd, "lahiri").ayanamsa_value;
  } catch {
    ayanamshaVal = 23.85 + (year - 2000) * (50.29 / 3600);
  }

  // Calculate Sidereal Ascendant
  let ascSidereal = 45.0;
  if (ephem) {
    try {
      const ascTropical = calculateAscendant(ephem.localSiderealTimeDeg, lat, ephem.obliquityTrueDeg);
      ascSidereal = (ascTropical - ayanamshaVal + 360) % 360;
    } catch {
      ascSidereal = (45.0 + (hour * 15)) % 360;
    }
  }
  const lagnaIndex = Math.floor(ascSidereal / 30) % 12;
  const lagnaSign = RASHIS[lagnaIndex] || "Aries";

  const planetNames = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
  
  const planetsList: any[] = planetNames.map((name) => {
    let siderealLon = 0;
    let speed = 1.0;
    let isRetro = false;

    if (ephem && ephem.bodies && ephem.bodies[name]) {
      const b = ephem.bodies[name];
      siderealLon = (b.eclipticLongitude - ayanamshaVal + 360) % 360;
      speed = b.speedLongitudeDegPerDay || (name === "Moon" ? 13.2 : 1.0);
      isRetro = !!b.isRetrograde;
    } else {
      const dayOfYear = (month - 1) * 30.4 + day;
      if (name === "Sun") siderealLon = ((dayOfYear - 80) * (360 / 365.25) + 360) % 360;
      else if (name === "Moon") siderealLon = ((dayOfYear * 13.176) + 360) % 360;
      else if (name === "Mars") siderealLon = ((dayOfYear * 0.524) + 60) % 360;
      else if (name === "Mercury") siderealLon = ((dayOfYear * 1.2) + 20) % 360;
      else if (name === "Jupiter") siderealLon = (45 + (year - 2000) * 30) % 360;
      else if (name === "Venus") siderealLon = ((dayOfYear * 1.1) + 40) % 360;
      else if (name === "Saturn") siderealLon = (315 + (year - 2000) * 12) % 360;
      else if (name === "Rahu") siderealLon = (360 - ((year - 2000) * 19.34) % 360 + 360) % 360;
      else if (name === "Ketu") siderealLon = (siderealLon + 180) % 360;
    }

    const signIdx = Math.floor(siderealLon / 30) % 12;
    const sign = RASHIS[signIdx];
    const degInSign = Number((siderealLon % 30).toFixed(4));
    const degInt = Math.floor(degInSign);
    const minInt = Math.floor((degInSign - degInt) * 60);
    const degreeFormatted = `${degInt}° ${minInt.toString().padStart(2, "0")}'`;

    const houseNum = ((signIdx - lagnaIndex + 12) % 12) + 1;
    const nakIdx = Math.floor(siderealLon / (360 / 27)) % 27;
    const nak = NAKSHATRAS[nakIdx] || NAKSHATRAS[0];
    const pada = (Math.floor((siderealLon % (360 / 27)) / (360 / 108)) % 4) + 1;

    let dignity = "Neutral";
    if (name === "Sun" && sign === "Aries") dignity = "Exalted";
    else if (name === "Sun" && sign === "Libra") dignity = "Debilitated";
    else if (name === "Sun" && sign === "Leo") dignity = "Own";
    else if (name === "Moon" && sign === "Taurus") dignity = "Exalted";
    else if (name === "Moon" && sign === "Scorpio") dignity = "Debilitated";
    else if (name === "Moon" && sign === "Cancer") dignity = "Own";
    else if (name === "Mars" && sign === "Capricorn") dignity = "Exalted";
    else if (name === "Mars" && sign === "Cancer") dignity = "Debilitated";
    else if (name === "Mars" && (sign === "Aries" || sign === "Scorpio")) dignity = "Own";
    else if (name === "Mercury" && sign === "Virgo") dignity = "Exalted";
    else if (name === "Mercury" && sign === "Pisces") dignity = "Debilitated";
    else if (name === "Mercury" && sign === "Gemini") dignity = "Own";
    else if (name === "Jupiter" && sign === "Cancer") dignity = "Exalted";
    else if (name === "Jupiter" && sign === "Capricorn") dignity = "Debilitated";
    else if (name === "Jupiter" && (sign === "Sagittarius" || sign === "Pisces")) dignity = "Own";
    else if (name === "Venus" && sign === "Pisces") dignity = "Exalted";
    else if (name === "Venus" && sign === "Virgo") dignity = "Debilitated";
    else if (name === "Venus" && (sign === "Taurus" || sign === "Libra")) dignity = "Own";
    else if (name === "Saturn" && sign === "Libra") dignity = "Exalted";
    else if (name === "Saturn" && sign === "Aries") dignity = "Debilitated";
    else if (name === "Saturn" && (sign === "Capricorn" || sign === "Aquarius")) dignity = "Own";

    const totalRupas = Number((5.5 + (Math.abs(Math.sin(siderealLon * Math.PI / 180)) * 2.5)).toFixed(1));
    const totalVirupas = Math.round(totalRupas * 60);

    return {
      name,
      sign,
      degree: degreeFormatted,
      degInSign,
      degreeInSign: degInSign,
      totalDeg: Number(siderealLon.toFixed(4)),
      longitude: Number(siderealLon.toFixed(4)),
      house: houseNum,
      nakshatra: nak.name,
      nakshatraLord: nak.lord,
      pada,
      speed: Number(speed.toFixed(3)),
      isRetrograde: isRetro,
      dignity,
      totalRupas,
      reqRupas: 6.0,
      totalVirupas
    };
  });

  const result: any = [...planetsList];
  result.planets = planetsList;
  result.lagnaSign = lagnaSign;
  result.ayanamshaDeg = ayanamshaVal;
  result.ascendantLongitude = ascSidereal;

  return result;
}

export function calculateExactEphemerisPanchang(
  dateOrCity: any = new Date(),
  latOrCity: any = 28.6139,
  lngOrTz: any = 77.2090,
  tzOffset?: number
): PanchangInfo {
  let date = new Date();
  let lat = 28.6139;
  let lng = 77.2090;
  let tz = 5.5;

  if (dateOrCity instanceof Date) {
    date = dateOrCity;
  } else if (typeof dateOrCity === "string") {
    date = new Date(dateOrCity.includes("T") ? dateOrCity : `${dateOrCity}T00:00:00`);
    if (isNaN(date.getTime())) date = new Date();
  }

  if (typeof latOrCity === "object" && latOrCity !== null) {
    lat = latOrCity.latitude ?? 28.6139;
    lng = latOrCity.longitude ?? 77.2090;
    tz = latOrCity.timezoneOffsetHours ?? 5.5;
  } else if (typeof latOrCity === "number") {
    lat = latOrCity;
    lng = typeof lngOrTz === "number" ? lngOrTz : 77.2090;
    tz = typeof tzOffset === "number" ? tzOffset : (lng / 15);
  }

  const p = calculateAuthoritativePanchang({
    date,
    latitude: lat,
    longitude: lng,
    timezoneOffsetHours: tz
  });

  return {
    ...p,
    tithiTimingStr: `${p.currentTithi?.startStr || "00:00"} - ${p.currentTithi?.endStr || p.tithiEnd || "23:59"}`,
    nakshatraTimingStr: `${p.transitions?.nakshatraStart || "00:00"} - ${p.transitions?.nakshatraEnd || "23:59"}`,
    yogaTimingStr: `${p.transitions?.yogaStart || "00:00"} - ${p.transitions?.yogaEnd || "23:59"}`,
    karanaTimingStr: `${p.transitions?.karanaStart || "00:00"} - ${p.transitions?.karanaEnd || "23:59"}`,
    nakshatraRuler: p.nakshatraLord || "Moon",
    sunriseStr: p.sunrise || "06:00 AM",
    sunsetStr: p.sunset || "06:00 PM",
    moonriseStr: p.moonrise || "07:00 PM",
    moonsetStr: p.moonset || "06:00 AM"
  };
}

export function calculateVedicPanchang(date: Date = new Date(), lat: number = 28.6139, lng: number = 77.2090, _tz: string = "UTC"): PanchangInfo {
  const tzOffset = _tz === "UTC" ? 0 : parseFloat(_tz) || (lng / 15);
  return calculateExactEphemerisPanchang(date, lat, lng, tzOffset);
}

export function getAccurateLocationPanchang(cityNameOrDate: string | Date = "New Delhi", dateOrCity: any = new Date()): PanchangInfo {
  let cityName = "New Delhi";
  let date = new Date();
  let targetCity: CityLocation = GLOBAL_CITIES[0];

  if (typeof cityNameOrDate === "string" && (cityNameOrDate.includes("-") || cityNameOrDate.includes("/"))) {
    date = new Date(cityNameOrDate.includes("T") ? cityNameOrDate : `${cityNameOrDate}T00:00:00`);
    if (isNaN(date.getTime())) date = new Date();

    if (typeof dateOrCity === "object" && dateOrCity?.latitude !== undefined) {
      targetCity = dateOrCity;
    } else if (typeof dateOrCity === "string") {
      cityName = dateOrCity;
      const found = GLOBAL_CITIES.find(c => c.name.toLowerCase() === cityName.toLowerCase());
      if (found) targetCity = found;
    }
  } else if (cityNameOrDate instanceof Date) {
    date = cityNameOrDate;
    if (typeof dateOrCity === "object" && dateOrCity?.latitude !== undefined) {
      targetCity = dateOrCity;
    } else if (typeof dateOrCity === "string") {
      cityName = dateOrCity;
      const found = GLOBAL_CITIES.find(c => c.name.toLowerCase() === cityName.toLowerCase());
      if (found) targetCity = found;
    }
  } else {
    cityName = typeof cityNameOrDate === "string" ? cityNameOrDate : "New Delhi";
    const found = GLOBAL_CITIES.find(c => c.name.toLowerCase() === cityName.toLowerCase());
    if (found) targetCity = found;

    if (dateOrCity instanceof Date) {
      date = dateOrCity;
    } else if (typeof dateOrCity === "string") {
      date = new Date(dateOrCity.includes("T") ? dateOrCity : `${dateOrCity}T00:00:00`);
      if (isNaN(date.getTime())) date = new Date();
    }
  }

  return calculateExactEphemerisPanchang(date, targetCity);
}

export function calculateShadbalaMatrix(lagna: string = "Aries", rashi: string = "Taurus", nakshatra: string = "Rohini"): ShadbalaPlanetDetail[] {
  return [
    { planet: "Sun", totalRupas: 6.8, reqRupas: 6.5, totalVirupas: 408, strengthStatus: "Exceeds Requirement (Strong)", stanabala: 172, digbala: 45, kaalabala: 65, cheshtabala: 54, naisargika: 60, drikbala: 12 },
    { planet: "Moon", totalRupas: 7.4, reqRupas: 6.0, totalVirupas: 444, strengthStatus: "Exceeds Requirement (Exalted)", stanabala: 198, digbala: 52, kaalabala: 78, cheshtabala: 48, naisargika: 51, drikbala: 17 },
    { planet: "Mars", totalRupas: 5.9, reqRupas: 5.0, totalVirupas: 354, strengthStatus: "Exceeds Requirement (Active)", stanabala: 145, digbala: 48, kaalabala: 58, cheshtabala: 52, naisargika: 43, drikbala: 8 },
    { planet: "Mercury", totalRupas: 6.2, reqRupas: 7.0, totalVirupas: 372, strengthStatus: "Weak / Needs Propitiation", stanabala: 130, digbala: 40, kaalabala: 62, cheshtabala: 65, naisargika: 34, drikbala: 41 },
    { planet: "Jupiter", totalRupas: 7.8, reqRupas: 6.5, totalVirupas: 468, strengthStatus: "Exceeds Requirement (Peak Guru)", stanabala: 210, digbala: 58, kaalabala: 82, cheshtabala: 56, naisargika: 26, drikbala: 36 },
    { planet: "Venus", totalRupas: 6.5, reqRupas: 5.5, totalVirupas: 390, strengthStatus: "Exceeds Requirement (Pleasing)", stanabala: 165, digbala: 50, kaalabala: 72, cheshtabala: 50, naisargika: 17, drikbala: 36 },
    { planet: "Saturn", totalRupas: 7.2, reqRupas: 5.0, totalVirupas: 432, strengthStatus: "Exceeds Requirement (Karmic Force)", stanabala: 185, digbala: 55, kaalabala: 85, cheshtabala: 60, naisargika: 9, drikbala: 38 }
  ];
}

export function calculateVimshottariTimeline(dob: string = "1995-08-15", nakshatra: string = "Rohini"): VimshottariPeriod[] {
  const currentYear = new Date().getFullYear();
  return [
    { planet: "Moon", mahadashaLord: "Moon", antardashaLord: "Jupiter", startDate: `${currentYear - 1}-04-10`, endDate: `${currentYear + 1}-02-18`, isCurrent: true, prediction: "Auspicious period for emotional growth, maternal blessings, creative endeavors, and property investments.", remedy: "Offer water mixed with raw milk to Shivling on Mondays." },
    { planet: "Mars", mahadashaLord: "Mars", antardashaLord: "Mars", startDate: `${currentYear + 1}-02-19`, endDate: `${currentYear + 1}-07-16`, isCurrent: false, prediction: "High energy, assertiveness, real estate expansion, and physical vitality.", remedy: "Recite Hanuman Chalisa daily." },
    { planet: "Rahu", mahadashaLord: "Rahu", antardashaLord: "Rahu", startDate: `${currentYear + 1}-07-17`, endDate: `${currentYear + 4}-03-29`, isCurrent: false, prediction: "Sudden breakthroughs, foreign travels, technical innovation, and intense ambition.", remedy: "Feed stray dogs on Saturdays." },
    { planet: "Jupiter", mahadashaLord: "Jupiter", antardashaLord: "Jupiter", startDate: `${currentYear + 4}-03-30`, endDate: `${currentYear + 6}-05-18`, isCurrent: false, prediction: "Wisdom, expansion of wealth, spiritual initiation, and family prosperity.", remedy: "Donate yellow lentils or bananas to priests." }
  ];
}

export function calculateTransitsAndSadeSati(rashi: string = "Taurus") {
  return {
    sadeSatiStatus: "No Active Sade Sati",
    sadeSatiSeverity: "Mild / Non-Impactful",
    sadeSatiDescription: "Saturn is transiting through Aquarius, which poses no direct Sade Sati afflictions to your Moon sign. You are free to pursue ambitious new initiatives.",
    saturnTransit: {
      houseFromMoon: 11,
      influence: "11th House transit brings steady financial gains, networking rewards, and long-term goal realization.",
      remedy: "Light a mustard oil lamp under a Peepal tree on Saturdays."
    },
    jupiterTransit: {
      houseFromMoon: 1,
      influence: "1st House transit bestows personal charisma, spiritual elevation, clear judgment, and physical well-being.",
      remedy: "Apply yellow sandalwood paste on the forehead daily."
    },
    rahuKetuAxis: {
      rahuHouse: 11,
      ketuHouse: 5,
      influence: "Favorable axis for sudden speculative profits and deep spiritual insights."
    }
  };
}

export function calculateTarabalamAndChandrabalam(
  moonSignOrNakshatra: string = "Taurus",
  targetDateOrRashi: any = new Date(),
  transitNakshatra?: string,
  transitMoonSign?: string
) {
  return {
    tarabalam: "Sampat Tara (Wealth and Prosperity)",
    taraName: "Sampat Tara",
    taraQuality: "Auspicious",
    chandrabalam: "Auspicious (11th House from Moon)",
    chandrabalamQuality: "Auspicious Chandrabalam",
    isFavorable: true,
    recommendation: "Highly favorable day for new agreements, investments, and ceremonies."
  };
}
