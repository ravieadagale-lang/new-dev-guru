// AstroNext Sidereal Kundli & Chart Engine

import { HighPrecisionAstroEphemerisProvider, EphemerisCalculationOptions } from "./ephemerisProvider";
import { AyanamsaService } from "./ayanamsaEngine";
import { ZodiacEngine, ZODIAC_SIGNS } from "./zodiacEngine";
import { NakshatraEngine, NAKSHATRAS } from "./nakshatraEngine";
import { normalizeDeg, degToDMS, calculateAscendant, calculateMidheaven, calculateJulianDay } from "./astronomyMath";

export { ZODIAC_SIGNS } from "./zodiacEngine";
export { NAKSHATRAS } from "./nakshatraEngine";

export interface SiderealPlanetPosition {
  name: string;
  longitude: number;
  latitude: number;
  distance: number;
  speed: number;
  isRetrograde: boolean;
  sign: string;
  signIndex: number;
  signName: string;
  signSanskrit: string;
  signLord: string;
  degreeInSign: number;
  formattedDegree: string;
  house: number;
  nakshatra: string;
  nakshatraIndex: number;
  pada: number;
  dignity: string;
  [key: string]: any;
}

export interface SiderealChartData {
  planets: Record<string, SiderealPlanetPosition>;
  planetsList: SiderealPlanetPosition[];
  ascendant: {
    longitude: number;
    signIndex: number;
    signName: string;
    signSanskrit: string;
    formattedDegree: string;
    degreeInSign: number;
    house: number;
    [key: string]: any;
  };
  houses: Array<{
    house: number;
    signIndex: number;
    signName: string;
    longitude: number;
    startDegree: number;
    endDegree: number;
    rulingLord: string;
  }>;
  ayanamsa: number;
  ayanamsaName: string;
  julianDay: number;
  year: number;
  month: number;
  day: number;
  cityName?: string;
  [key: string]: any;
}

export function calculateSiderealChart(params: {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second?: number;
  latitude: number;
  longitude: number;
  timezoneOffsetHours: number;
  ayanamsa?: string;
  cityName?: string;
  [key: string]: any;
}): SiderealChartData {
  const ephemProvider = new HighPrecisionAstroEphemerisProvider();
  const ephemOptions: EphemerisCalculationOptions = {
    year: params.year,
    month: params.month,
    day: params.day,
    hour: params.hour,
    minute: params.minute,
    second: params.second || 0,
    latitude: params.latitude,
    longitude: params.longitude,
    timezoneOffsetHours: params.timezoneOffsetHours,
  };

  const ephem = ephemProvider.calculateEphemeris(ephemOptions);

  const ayanamsaVal = AyanamsaService.getAyanamsaValue(
    ephem.julianDayUT,
    (params.ayanamsa as any) || "Lahiri"
  );

  // Ascendant calculation
  const tropicalAsc = calculateAscendant(ephem.julianDayUT, params.latitude, params.longitude);
  const siderealAscLon = normalizeDeg(tropicalAsc - ayanamsaVal);
  const ascRashi = ZodiacEngine.getRashiPlacement(siderealAscLon);

  const ascendant = {
    longitude: siderealAscLon,
    signIndex: ascRashi.signIndex,
    signName: ascRashi.signName,
    signSanskrit: ascRashi.signSanskrit,
    degreeInSign: ascRashi.degreeInSign,
    formattedDegree: ascRashi.formattedDegree,
    house: 1
  };

  // Planets
  const planets: Record<string, SiderealPlanetPosition> = {};
  const planetsList: SiderealPlanetPosition[] = [];

  const bodies = [
    { name: "Sun", pos: ephem.sun },
    { name: "Moon", pos: ephem.moon },
    { name: "Mars", pos: ephem.mars },
    { name: "Mercury", pos: ephem.mercury },
    { name: "Jupiter", pos: ephem.jupiter },
    { name: "Venus", pos: ephem.venus },
    { name: "Saturn", pos: ephem.saturn },
    { name: "Rahu", pos: ephem.rahu },
    { name: "Ketu", pos: ephem.ketu },
    { name: "Uranus", pos: ephem.uranus },
    { name: "Neptune", pos: ephem.neptune },
    { name: "Pluto", pos: ephem.pluto }
  ];

  bodies.forEach(({ name, pos }) => {
    if (!pos) return;
    const sidLon = normalizeDeg(pos.apparentLongitude - ayanamsaVal);
    const rashi = ZodiacEngine.getRashiPlacement(sidLon);
    const nak = NakshatraEngine.getNakshatraPlacement(sidLon);

    // House calculation relative to Ascendant (Whole Sign / Equal Bhava)
    const house = ((rashi.signIndex - ascRashi.signIndex + 12) % 12) + 1;

    let dignity = "Neutral";
    if (name === "Sun" && rashi.signName === "Aries") dignity = "Exalted";
    else if (name === "Sun" && rashi.signName === "Libra") dignity = "Debilitated";
    else if (name === "Sun" && rashi.signName === "Leo") dignity = "Own Sign";
    else if (name === "Moon" && rashi.signName === "Taurus") dignity = "Exalted";
    else if (name === "Moon" && rashi.signName === "Scorpio") dignity = "Debilitated";
    else if (name === "Moon" && rashi.signName === "Cancer") dignity = "Own Sign";
    else if (name === "Jupiter" && rashi.signName === "Cancer") dignity = "Exalted";
    else if (name === "Jupiter" && rashi.signName === "Capricorn") dignity = "Debilitated";

    const planetObj: SiderealPlanetPosition = {
      name,
      longitude: sidLon,
      latitude: pos.latitude || 0,
      distance: pos.distanceAU || 1,
      speed: pos.speedDegreesPerDay || 1,
      isRetrograde: pos.isRetrograde || false,
      sign: rashi.signName,
      signIndex: rashi.signIndex,
      signName: rashi.signName,
      signSanskrit: rashi.signSanskrit,
      signLord: rashi.rulingLord,
      degreeInSign: rashi.degreeInSign,
      formattedDegree: rashi.formattedDegree,
      house,
      nakshatra: nak.name,
      nakshatraIndex: nak.index,
      pada: nak.pada,
      dignity
    };

    planets[name] = planetObj;
    planetsList.push(planetObj);
  });

  // 12 Houses
  const houses = [];
  for (let h = 1; h <= 12; h++) {
    const sIdx = (ascRashi.signIndex + (h - 1)) % 12;
    const sign = ZodiacEngine.getRashiByIndex(sIdx);
    houses.push({
      house: h,
      signIndex: sIdx,
      signName: sign.name,
      longitude: sIdx * 30,
      startDegree: sIdx * 30,
      endDegree: (sIdx + 1) * 30,
      rulingLord: sign.rulingLord
    });
  }

  return {
    planets,
    planetsList,
    ascendant,
    houses,
    ayanamsa: ayanamsaVal,
    ayanamsaName: params.ayanamsa || "Lahiri",
    julianDay: ephem.julianDayUT,
    year: params.year,
    month: params.month,
    day: params.day,
    cityName: params.cityName
  };
}
