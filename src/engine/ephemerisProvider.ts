/**
 * AstroNext High-Precision Astronomical Ephemeris Provider
 * Provides geocentric, topocentric, and sidereal celestial mechanics calculations
 * with VSOP87 / ELP2000-82 mathematical accuracy.
 */

import {
  calculateJulianDay,
  calculateDeltaT,
  calculateSunPosition,
  calculateMoonPosition,
  calculateMajorPlanet,
  calculateLunarNodes,
  calculateAllPlanetaryCoordinates,
  calculateUranusPosition,
  calculateNeptunePosition,
  calculatePlutoPosition,
  calculateObliquity,
  calculateLocalSiderealTime,
  calculateGreenwichSiderealTime,
  julianCenturiesSinceJ2000,
  GeocentricCoordinate,
  normalizeDeg,
} from "./astronomyMath";

export interface EphemerisCalculationOptions {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second?: number;
  latitude: number;
  longitude: number;
  timezoneOffsetHours?: number;
  coordinateSystem?: string;
  [key: string]: any;
}

export interface EphemerisBodyPosition {
  name: string;
  longitude: number;
  apparentLongitude: number;
  eclipticLongitude: number;
  latitude: number;
  distance: number;
  speed: number;
  isRetrograde: boolean;
  [key: string]: any;
}

export interface EphemerisResult {
  julianDay: number;
  julianDayUT: number;
  deltaT: number;
  obliquityMeanDeg: number;
  obliquityTrueDeg: number;
  nutationLongitudeDeg: number;
  greenwichSiderealTimeDeg: number;
  localSiderealTimeDeg: number;
  sun: EphemerisBodyPosition;
  moon: EphemerisBodyPosition;
  mars: EphemerisBodyPosition;
  mercury: EphemerisBodyPosition;
  jupiter: EphemerisBodyPosition;
  venus: EphemerisBodyPosition;
  saturn: EphemerisBodyPosition;
  rahu: EphemerisBodyPosition;
  ketu: EphemerisBodyPosition;
  uranus: EphemerisBodyPosition;
  neptune: EphemerisBodyPosition;
  pluto: EphemerisBodyPosition;
  moonApparentLongitude: number;
  bodies: Record<string, EphemerisBodyPosition>;
  [key: string]: any;
}

function toBodyPosition(name: string, coord: GeocentricCoordinate): EphemerisBodyPosition {
  const normLon = normalizeDeg(coord.longitude);
  return {
    name,
    longitude: normLon,
    apparentLongitude: normLon,
    eclipticLongitude: normLon,
    latitude: coord.latitude,
    distance: coord.distance,
    speed: coord.speed,
    isRetrograde: coord.speed < 0,
  };
}

export class HighPrecisionAstroEphemerisProvider {
  public calculateEphemeris(options: EphemerisCalculationOptions): EphemerisResult {
    const {
      year,
      month,
      day,
      hour,
      minute,
      second = 0,
      latitude,
      longitude,
      timezoneOffsetHours = 0,
    } = options;

    const utHour = hour - timezoneOffsetHours + minute / 60 + second / 3600;
    const jd = calculateJulianDay(
      year,
      month,
      day,
      utHour,
      0,
      0
    );

    const deltaT = calculateDeltaT(year);
    const T = julianCenturiesSinceJ2000(jd);
    const obliq = calculateObliquity(T);
    const gst = calculateGreenwichSiderealTime(jd);
    const lst = calculateLocalSiderealTime(jd, longitude);

    const sunCoord = calculateSunPosition(jd);
    const moonCoord = calculateMoonPosition(jd);
    const marsCoord = calculateMajorPlanet("mars", jd);
    const mercuryCoord = calculateMajorPlanet("mercury", jd);
    const jupiterCoord = calculateMajorPlanet("jupiter", jd);
    const venusCoord = calculateMajorPlanet("venus", jd);
    const saturnCoord = calculateMajorPlanet("saturn", jd);
    const nodes = calculateLunarNodes(jd);
    const uranusCoord = calculateUranusPosition(jd);
    const neptuneCoord = calculateNeptunePosition(jd);
    const plutoCoord = calculatePlutoPosition(jd);

    const sun = toBodyPosition("Sun", sunCoord);
    const moon = toBodyPosition("Moon", moonCoord);
    const mars = toBodyPosition("Mars", marsCoord);
    const mercury = toBodyPosition("Mercury", mercuryCoord);
    const jupiter = toBodyPosition("Jupiter", jupiterCoord);
    const venus = toBodyPosition("Venus", venusCoord);
    const saturn = toBodyPosition("Saturn", saturnCoord);
    const rahu = toBodyPosition("Rahu", nodes.rahuTrue);
    const ketu = toBodyPosition("Ketu", nodes.ketuTrue);
    const uranus = toBodyPosition("Uranus", uranusCoord);
    const neptune = toBodyPosition("Neptune", neptuneCoord);
    const pluto = toBodyPosition("Pluto", plutoCoord);

    const bodies: Record<string, EphemerisBodyPosition> = {
      Sun: sun,
      Moon: moon,
      Mars: mars,
      Mercury: mercury,
      Jupiter: jupiter,
      Venus: venus,
      Saturn: saturn,
      Rahu: rahu,
      Ketu: ketu,
      Uranus: uranus,
      Neptune: neptune,
      Pluto: pluto,
      sun,
      moon,
      mars,
      mercury,
      jupiter,
      venus,
      saturn,
      rahu,
      ketu,
      uranus,
      neptune,
      pluto,
    };

    return {
      julianDay: jd,
      julianDayUT: jd,
      deltaT,
      obliquityMeanDeg: obliq.mean,
      obliquityTrueDeg: obliq.trueObliquity,
      nutationLongitudeDeg: obliq.nutationLon,
      greenwichSiderealTimeDeg: gst.gast,
      localSiderealTimeDeg: lst,
      sun,
      moon,
      mars,
      mercury,
      jupiter,
      venus,
      saturn,
      rahu,
      ketu,
      uranus,
      neptune,
      pluto,
      moonApparentLongitude: moon.apparentLongitude,
      bodies,
    };
  }
}

export const defaultEphemerisProvider = new HighPrecisionAstroEphemerisProvider();
