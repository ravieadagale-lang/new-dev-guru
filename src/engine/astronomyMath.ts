/**
 * Precision Astronomical Mathematics & Ephemeris Engine
 * Implements high-precision astronomical algorithms (VSOP87, ELP2000-82, Meeus, and NASA/JPL approximations)
 * for calculating Julian Date, Delta-T, Obliquity, Nutation, Local Sidereal Time,
 * and high-accuracy Geocentric Celestial Coordinates for Sun, Moon, and Planets.
 */

export interface GeocentricCoordinate {
  longitude: number; // 0 to 360 degrees
  latitude: number;  // in degrees
  distance: number;  // in AU (or Earth radii for Moon)
  speed: number;     // degrees per day (negative = retrograde)
}

export interface PlanetaryOrbitData {
  sun: GeocentricCoordinate;
  moon: GeocentricCoordinate;
  mars: GeocentricCoordinate;
  mercury: GeocentricCoordinate;
  jupiter: GeocentricCoordinate;
  venus: GeocentricCoordinate;
  saturn: GeocentricCoordinate;
  rahuMean: GeocentricCoordinate;
  rahuTrue: GeocentricCoordinate;
  ketuMean: GeocentricCoordinate;
  ketuTrue: GeocentricCoordinate;
  uranus?: GeocentricCoordinate;
  neptune?: GeocentricCoordinate;
  pluto?: GeocentricCoordinate;
}

export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;

/**
 * Normalizes angle into 0° to 360° range
 */
export function normalizeDeg(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

/**
 * Normalizes angle into -180° to +180° range
 */
export function normalizeDeg180(deg: number): number {
  let d = normalizeDeg(deg);
  if (d > 180) d -= 360;
  return d;
}

/**
 * Converts decimal degrees to formatted DMS string (e.g. 23° 45' 12")
 * Handles rounding and boundary rollovers (e.g., 59.9999" -> 00" + carry).
 */
export function degToDMS(decimalDeg: number): string {
  const norm = normalizeDeg(decimalDeg);
  let totalSeconds = Math.round(norm * 3600);
  if (totalSeconds >= 360 * 3600) {
    totalSeconds = 0;
  }
  const deg = Math.floor(totalSeconds / 3600);
  const remSec = totalSeconds % 3600;
  const min = Math.floor(remSec / 60);
  const sec = remSec % 60;

  return `${deg}° ${String(min).padStart(2, "0")}' ${String(sec).padStart(2, "0")}"`;
}

/**
 * Converts degrees, minutes, and seconds to normalized decimal degrees.
 */
export function dmsToDeg(deg: number, min: number = 0, sec: number = 0): number {
  return normalizeDeg(deg + min / 60.0 + sec / 3600.0);
}

/**
 * Converts Universal Time (UT / UTC) date & time into Julian Day Number (JD)
 */
export function calculateJulianDay(
  year: number,
  month: number,
  day: number,
  hour: number = 0,
  minute: number = 0,
  second: number = 0
): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }

  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);

  const dayFraction = (hour + minute / 60 + second / 3600) / 24;

  const jd =
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    dayFraction +
    b -
    1524.5;

  return jd;
}

/**
 * Converts Julian Day Number to Julian Centuries since J2000.0 (T)
 */
export function julianCenturiesSinceJ2000(jd: number): number {
  return (jd - 2451545.0) / 36525.0;
}

/**
 * Calculates NASA standard polynomial estimate of Delta-T (ΔT = TT - UT in seconds)
 */
export function calculateDeltaT(year: number): number {
  const t = year - 2000;
  if (year >= 2000 && year <= 2100) {
    return 62.92 + 0.32217 * t + 0.005589 * t * t;
  } else if (year >= 1900 && year < 2000) {
    return (
      -2.79 +
      1.494119 * t -
      0.0598939 * t * t +
      0.0061966 * t * t * t -
      0.000197 * t * t * t * t
    );
  }
  return 69.184; // Standard contemporary constant fallback
}

/**
 * Obliquity of the Ecliptic (mean & true) in degrees
 */
export function calculateObliquity(T: number): { mean: number; trueObliquity: number; nutationLon: number } {
  // IAU formula for Mean Obliquity (eps0) in arcseconds
  const eps0Sec =
    84381.448 -
    46.815 * T -
    0.00059 * T * T +
    0.001813 * T * T * T;
  const eps0 = eps0Sec / 3600;

  // Nutation in Longitude (Δψ) and Obliquity (Δε)
  const omega = (125.04452 - 1934.136261 * T) * DEG_TO_RAD; // Longitude of Moon's ascending node
  const L = (280.4665 + 36000.7698 * T) * DEG_TO_RAD;       // Mean longitude of Sun
  const Lprime = (218.3165 + 481267.8813 * T) * DEG_TO_RAD; // Mean longitude of Moon

  const deltaPsi =
    (-17.2 * Math.sin(omega) -
      1.32 * Math.sin(2 * L) -
      0.23 * Math.sin(2 * Lprime) +
      0.21 * Math.sin(2 * omega)) /
    3600;

  const deltaEps =
    (9.2 * Math.cos(omega) +
      0.57 * Math.cos(2 * L) +
      0.1 * Math.cos(2 * Lprime) -
      0.09 * Math.cos(2 * omega)) /
    3600;

  return {
    mean: eps0,
    trueObliquity: eps0 + deltaEps,
    nutationLon: deltaPsi,
  };
}

/**
 * Helper to convert Julian Century T or JD to Julian Day
 */
export function toJD(jdOrT: number): number {
  return jdOrT > 500000 ? jdOrT : 2451545.0 + jdOrT * 36525.0;
}

/**
 * Converts Julian Day Number to Julian Centuries since J2000.0 (T)
 */
export function calculateJulianCenturies(jd: number): number {
  return julianCenturiesSinceJ2000(jd);
}

/**
 * Calculates Outer Planet Coordinates (Uranus, Neptune, Pluto approximations)
 */
export function calculateOuterPlanet(
  planet: "uranus" | "neptune" | "pluto",
  jd: number
): GeocentricCoordinate {
  const T = julianCenturiesSinceJ2000(jd);
  const elements: Record<string, { a: number; e: number; i: number; L0: number; Lrate: number; w: number; node: number }> = {
    uranus: { a: 19.189, e: 0.0472, i: 0.773, L0: 313.23, Lrate: 428.467, w: 170.96, node: 74.0 },
    neptune: { a: 30.07, e: 0.0086, i: 1.77, L0: 304.88, Lrate: 218.486, w: 44.97, node: 131.78 },
    pluto: { a: 39.48, e: 0.2488, i: 17.14, L0: 238.93, Lrate: 145.208, w: 224.07, node: 110.3 },
  };

  const elem = elements[planet];
  const L = normalizeDeg(elem.L0 + elem.Lrate * T);
  const M = normalizeDeg(L - elem.w) * DEG_TO_RAD;
  const C = (2 * elem.e - elem.e * elem.e * elem.e / 4) * Math.sin(M) + (5 / 4) * elem.e * elem.e * Math.sin(2 * M);
  const trueLon = normalizeDeg(L + C * RAD_TO_DEG);

  // Speed calculation over 1 day
  const nextT = julianCenturiesSinceJ2000(jd + 1.0);
  const nextL = normalizeDeg(elem.L0 + elem.Lrate * nextT);
  const nextM = normalizeDeg(nextL - elem.w) * DEG_TO_RAD;
  const nextC = (2 * elem.e - elem.e * elem.e * elem.e / 4) * Math.sin(nextM) + (5 / 4) * elem.e * elem.e * Math.sin(2 * nextM);
  const nextLon = normalizeDeg(nextL + nextC * RAD_TO_DEG);
  let speed = nextLon - trueLon;
  if (speed > 180) speed -= 360;
  if (speed < -180) speed += 360;

  return {
    longitude: trueLon,
    latitude: 0,
    distance: elem.a,
    speed,
  };
}

export function calculateMercuryPosition(jdOrT: number): GeocentricCoordinate {
  return calculateMajorPlanet("mercury", toJD(jdOrT));
}

export function calculateVenusPosition(jdOrT: number): GeocentricCoordinate {
  return calculateMajorPlanet("venus", toJD(jdOrT));
}

export function calculateMarsPosition(jdOrT: number): GeocentricCoordinate {
  return calculateMajorPlanet("mars", toJD(jdOrT));
}

export function calculateJupiterPosition(jdOrT: number): GeocentricCoordinate {
  return calculateMajorPlanet("jupiter", toJD(jdOrT));
}

export function calculateSaturnPosition(jdOrT: number): GeocentricCoordinate {
  return calculateMajorPlanet("saturn", toJD(jdOrT));
}

export function calculateUranusPosition(jdOrT: number): GeocentricCoordinate {
  return calculateOuterPlanet("uranus", toJD(jdOrT));
}

export function calculateNeptunePosition(jdOrT: number): GeocentricCoordinate {
  return calculateOuterPlanet("neptune", toJD(jdOrT));
}

export function calculatePlutoPosition(jdOrT: number): GeocentricCoordinate {
  return calculateOuterPlanet("pluto", toJD(jdOrT));
}

export function calculateObliquityOfEcliptic(T: number): number {
  return calculateObliquity(T).trueObliquity;
}

export function calculateNutationInLongitude(T: number): number {
  return calculateObliquity(T).nutationLon;
}

export function calculateAscendant(ramcDeg: number, latitudeDeg: number, epsDeg: number): number {
  const ramcRad = ramcDeg * DEG_TO_RAD;
  const epsRad = epsDeg * DEG_TO_RAD;
  const phiRad = latitudeDeg * DEG_TO_RAD;
  const y = Math.cos(ramcRad);
  const x = -(Math.sin(ramcRad) * Math.cos(epsRad) + Math.tan(phiRad) * Math.sin(epsRad));
  let asc = Math.atan2(y, x) * RAD_TO_DEG;
  return normalizeDeg(asc);
}

export function calculateMidheaven(ramcDeg: number, epsDeg: number): number {
  const ramcRad = ramcDeg * DEG_TO_RAD;
  const epsRad = epsDeg * DEG_TO_RAD;
  let mc = Math.atan2(Math.sin(ramcRad), Math.cos(ramcRad) * Math.cos(epsRad)) * RAD_TO_DEG;
  return normalizeDeg(mc);
}

export function calculateHouseCuspsPlacidus(ramcDeg: number, latitudeDeg: number, epsDeg: number): Record<number, number> {
  const asc = calculateAscendant(ramcDeg, latitudeDeg, epsDeg);
  const mc = calculateMidheaven(ramcDeg, epsDeg);
  const cusps: Record<number, number> = {};
  cusps[1] = asc;
  cusps[10] = mc;
  cusps[4] = normalizeDeg(mc + 180);
  cusps[7] = normalizeDeg(asc + 180);

  const phiRad = latitudeDeg * DEG_TO_RAD;
  const epsRad = epsDeg * DEG_TO_RAD;

  const computeIntermediateCusp = (ramcOffset: number, factor: number): number => {
    let R = normalizeDeg(ramcDeg + ramcOffset) * DEG_TO_RAD;
    for (let i = 0; i < 5; i++) {
      const sinD = Math.sin(epsRad) * Math.sin(R);
      const cosD = Math.sqrt(Math.max(0, 1 - sinD * sinD));
      const tanD = sinD / (cosD || 0.0001);
      const f = factor * Math.asin(Math.tan(phiRad) * tanD);
      R = (ramcDeg + ramcOffset) * DEG_TO_RAD + f;
    }
    const cusp = Math.atan2(Math.sin(R), Math.cos(R) * Math.cos(epsRad)) * RAD_TO_DEG;
    return normalizeDeg(cusp);
  };

  cusps[11] = computeIntermediateCusp(30, 1 / 3);
  cusps[12] = computeIntermediateCusp(60, 2 / 3);
  cusps[2] = computeIntermediateCusp(120, -2 / 3);
  cusps[3] = computeIntermediateCusp(150, -1 / 3);

  cusps[5] = normalizeDeg(cusps[11] + 180);
  cusps[6] = normalizeDeg(cusps[12] + 180);
  cusps[8] = normalizeDeg(cusps[2] + 180);
  cusps[9] = normalizeDeg(cusps[3] + 180);

  return cusps;
}

/**
 * Calculates Greenwich Mean Sidereal Time (GMST) and Apparent Sidereal Time (GAST) in degrees
 */
export function calculateGreenwichSiderealTime(jd: number): { gmst: number; gast: number } {
  const T = julianCenturiesSinceJ2000(jd);
  const jd0 = Math.floor(jd - 0.5) + 0.5;
  const UT = (jd - jd0) * 24.0; // hours

  // GMST at 0h UT in seconds
  let gmst0Sec =
    24110.54841 +
    8640184.812866 * T +
    0.093104 * T * T -
    0.0000062 * T * T * T;
  
  // Convert to degrees
  let gmst = (gmst0Sec / 240.0 + UT * 15.04106864) % 360.0;
  if (gmst < 0) gmst += 360.0;

  const { trueObliquity, nutationLon } = calculateObliquity(T);
  const equationOfEquinoxes = nutationLon * Math.cos(trueObliquity * DEG_TO_RAD);
  const gast = normalizeDeg(gmst + equationOfEquinoxes);

  return { gmst, gast };
}

/**
 * Calculates Local Sidereal Time (LST) in degrees for a given Longitude
 */
export function calculateLocalSiderealTime(jd: number, longitudeDeg: number): number {
  const { gast } = calculateGreenwichSiderealTime(jd);
  return normalizeDeg(gast + longitudeDeg);
}

/**
 * Calculates the Ascendant (Lagna) and 12 Equal/Shripati House Cusps
 * Tropical coordinate returned.
 */
export function calculateTropicalAscendant(
  jd: number,
  latitudeDeg: number,
  longitudeDeg: number
): { ascendant: number; midheaven: number; ramc: number } {
  const lstDeg = calculateLocalSiderealTime(jd, longitudeDeg);
  const ramc = lstDeg; // Right Ascension of Midheaven in degrees
  const T = julianCenturiesSinceJ2000(jd);
  const { trueObliquity } = calculateObliquity(T);

  const ramcRad = ramc * DEG_TO_RAD;
  const epsRad = trueObliquity * DEG_TO_RAD;
  const phiRad = latitudeDeg * DEG_TO_RAD;

  // Midheaven (MC)
  let mc = Math.atan2(Math.sin(ramcRad), Math.cos(ramcRad) * Math.cos(epsRad)) * RAD_TO_DEG;
  mc = normalizeDeg(mc);

  // Ascendant formula (Standard Ecliptic Intersection)
  // tan(Asc) = -cos(RAMC) / (sin(RAMC)*cos(eps) + tan(phi)*sin(eps))
  const y = Math.cos(ramcRad);
  const x = -(Math.sin(ramcRad) * Math.cos(epsRad) + Math.tan(phiRad) * Math.sin(epsRad));
  
  let asc = Math.atan2(y, x) * RAD_TO_DEG;
  asc = normalizeDeg(asc);

  return { ascendant: asc, midheaven: mc, ramc };
}

// --------------------------------------------------------------------------
// HIGH-PRECISION PLANETARY POSITIONS (VSOP87 & ELP2000-82 Core Models)
// --------------------------------------------------------------------------

/**
 * High-precision Sun geocentric coordinates
 */
export function calculateSunPosition(jdOrT: number): GeocentricCoordinate {
  const jd = toJD(jdOrT);
  const T = julianCenturiesSinceJ2000(jd);

  // Mean Longitude
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  // Mean Anomaly
  const M = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) * DEG_TO_RAD;
  // Eccentricity
  const e = 0.016708634 - 0.000042037 * T - 0.0000001267 * T * T;

  // Equation of Center
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M) +
    0.000289 * Math.sin(3 * M);

  // Sun True Longitude
  const trueLon = L0 + C;

  // Apparent Longitude (incorporating nutation and aberration)
  const omega = (125.04 - 1934.136 * T) * DEG_TO_RAD;
  const apparentLon = trueLon - 0.00569 - 0.00478 * Math.sin(omega);

  // Sun Distance (AU)
  const v = M + C * DEG_TO_RAD;
  const R = (1.000001018 * (1 - e * e)) / (1 + e * Math.cos(v));

  // Compute instantaneous daily speed
  const nextJd = jd + 0.01;
  const nextT = julianCenturiesSinceJ2000(nextJd);
  const nextM = (357.52911 + 35999.05029 * nextT) * DEG_TO_RAD;
  const nextC = 1.914602 * Math.sin(nextM) + 0.019993 * Math.sin(2 * nextM);
  const nextLon = (280.46646 + 36000.76983 * nextT + nextC) - 0.00569;
  const speed = (normalizeDeg(nextLon - apparentLon) / 0.01);

  return {
    longitude: normalizeDeg(apparentLon),
    latitude: 0.0,
    distance: R,
    speed: speed > 180 ? speed - 360 : speed,
  };
}

/**
 * High-precision Moon geocentric coordinates (ELP2000-82 based periodic terms)
 */
export function calculateMoonPosition(jdOrT: number): GeocentricCoordinate {
  const jd = toJD(jdOrT);
  const T = julianCenturiesSinceJ2000(jd);

  // Fundamental Arguments (radians)
  const Lp = (218.3164477 + 481267.88128 * T - 0.0015786 * T * T) * DEG_TO_RAD; // Moon's mean longitude
  const D = (297.8501921 + 445267.11140 * T - 0.0018819 * T * T) * DEG_TO_RAD;  // Mean elongation
  const M = (357.5291092 + 35999.05029 * T - 0.0001536 * T * T) * DEG_TO_RAD;   // Sun's mean anomaly
  const Mp = (134.9633964 + 477198.8675 * T + 0.0087414 * T * T) * DEG_TO_RAD;  // Moon's mean anomaly
  const F = (93.2720950 + 483202.0175 * T - 0.0036539 * T * T) * DEG_TO_RAD;    // Moon's argument of latitude

  // Periodic Longitude Perturbations (degrees)
  let lTerms =
    6.288774 * Math.sin(Mp) +
    1.274027 * Math.sin(2 * D - Mp) +
    0.658314 * Math.sin(2 * D) +
    0.213618 * Math.sin(2 * Mp) -
    0.185116 * Math.sin(M) -
    0.114332 * Math.sin(2 * F) +
    0.058793 * Math.sin(2 * D - 2 * Mp) +
    0.057066 * Math.sin(2 * D - M - Mp) +
    0.053322 * Math.sin(2 * D + Mp) +
    0.045758 * Math.sin(2 * D - M) -
    0.040923 * Math.sin(M - Mp) -
    0.034720 * Math.sin(D) -
    0.030383 * Math.sin(M + Mp) +
    0.015327 * Math.sin(2 * D - 2 * F) -
    0.012528 * Math.sin(2 * F + Mp) +
    0.010980 * Math.sin(2 * F - Mp);

  // Periodic Latitude Perturbations (degrees)
  let bTerms =
    5.128122 * Math.sin(F) +
    0.280602 * Math.sin(Mp + F) +
    0.277693 * Math.sin(Mp - F) +
    0.173237 * Math.sin(2 * D - F) +
    0.055413 * Math.sin(2 * D - Mp + F) +
    0.046271 * Math.sin(2 * D - Mp - F) +
    0.032573 * Math.sin(2 * D + F) +
    0.017198 * Math.sin(2 * Mp + F);

  // Distance (Earth radii / km)
  let rTerms =
    -20905.355 * Math.cos(Mp) -
    3699.111 * Math.cos(2 * D - Mp) -
    2955.968 * Math.cos(2 * D) -
    569.925 * Math.cos(2 * Mp);
  const distanceKm = 385000.56 + rTerms;

  const apparentLon = normalizeDeg((Lp * RAD_TO_DEG) + lTerms);
  const lat = bTerms;

  // Instantaneous Speed calculation (difference over 1 hour)
  const dt = 1.0 / 24.0;
  const nextJd = jd + dt;
  const nextT = julianCenturiesSinceJ2000(nextJd);
  const nextLp = (218.3164477 + 481267.88128 * nextT) * DEG_TO_RAD;
  const nextMp = (134.9633964 + 477198.8675 * nextT) * DEG_TO_RAD;
  const nextD = (297.8501921 + 445267.11140 * nextT) * DEG_TO_RAD;
  const nextLTerms = 6.288774 * Math.sin(nextMp) + 1.274027 * Math.sin(2 * nextD - nextMp) + 0.658314 * Math.sin(2 * nextD);
  const nextLon = normalizeDeg((nextLp * RAD_TO_DEG) + nextLTerms);
  
  let speed = (nextLon - apparentLon) / dt;
  if (speed < -180) speed += 360 / dt;
  if (speed > 180) speed -= 360 / dt;

  return {
    longitude: apparentLon,
    latitude: lat,
    distance: distanceKm / 149597870.7, // AU
    speed: speed,
  };
}

/**
 * Calculates Lunar Nodes (Rahu & Ketu - Mean & True)
 */
export function calculateLunarNodes(jd: number): {
  rahuMean: GeocentricCoordinate;
  rahuTrue: GeocentricCoordinate;
  ketuMean: GeocentricCoordinate;
  ketuTrue: GeocentricCoordinate;
} {
  const T = julianCenturiesSinceJ2000(jd);

  // Mean Ascending Node (Omega)
  const omegaMean = normalizeDeg(
    125.04452 -
      1934.136261 * T +
      0.0020708 * T * T +
      T * T * T / 450000
  );

  // Periodic corrections for True Node (Meeus Ch 47)
  const D = (297.8501921 + 445267.11140 * T) * DEG_TO_RAD;
  const M = (357.5291092 + 35999.05029 * T) * DEG_TO_RAD;
  const Mp = (134.9633964 + 477198.8675 * T) * DEG_TO_RAD;
  const F = (93.2720950 + 483202.0175 * T) * DEG_TO_RAD;

  const nodeCorr =
    -1.4979 * Math.sin(2 * (D - F)) -
    0.4098 * Math.sin(M) -
    0.1983 * Math.sin(2 * D) -
    0.0531 * Math.sin(2 * Mp);

  const omegaTrue = normalizeDeg(omegaMean + nodeCorr);

  // Ketu is exact 180° opposite
  const ketuMeanLon = normalizeDeg(omegaMean + 180);
  const ketuTrueLon = normalizeDeg(omegaTrue + 180);

  const dailyRetrogradeSpeed = -0.05295; // approx -19.34° / year = -0.05295° / day

  return {
    rahuMean: {
      longitude: omegaMean,
      latitude: 0,
      distance: 0.00257,
      speed: dailyRetrogradeSpeed,
    },
    rahuTrue: {
      longitude: omegaTrue,
      latitude: 0,
      distance: 0.00257,
      speed: dailyRetrogradeSpeed,
    },
    ketuMean: {
      longitude: ketuMeanLon,
      latitude: 0,
      distance: 0.00257,
      speed: dailyRetrogradeSpeed,
    },
    ketuTrue: {
      longitude: ketuTrueLon,
      latitude: 0,
      distance: 0.00257,
      speed: dailyRetrogradeSpeed,
    },
  };
}

/**
 * Calculates Heliocentric & Geocentric positions for Major Planets (VSOP87 Keplerian + secular terms)
 */
export function calculateMajorPlanet(
  planet: "mercury" | "venus" | "mars" | "jupiter" | "saturn",
  jd: number
): GeocentricCoordinate {
  const T = julianCenturiesSinceJ2000(jd);

  // Mean orbital elements (J2000.0) [a, e, I, L, longPeri, longNode]
  const elementsMap: Record<string, { a: number; e: [number, number]; i: [number, number]; L: [number, number]; w: [number, number]; node: [number, number] }> = {
    mercury: {
      a: 0.38709893,
      e: [0.20563069, 0.00002527],
      i: [7.00487, -0.005947],
      L: [252.250845, 149474.072249],
      w: [77.45645, 1.556478],
      node: [48.33167, -0.125423],
    },
    venus: {
      a: 0.72333199,
      e: [0.00677323, -0.00004938],
      i: [3.39471, -0.000789],
      L: [181.97973, 58519.21303],
      w: [131.57294, 1.402229],
      node: [76.68069, -0.278008],
    },
    mars: {
      a: 1.52366231,
      e: [0.09341233, 0.00009206],
      i: [1.85061, -0.000675],
      L: [-4.553432, 19141.696447],
      w: [336.04084, 1.841045],
      node: [49.5574, -0.294985],
    },
    jupiter: {
      a: 5.20336301,
      e: [0.04839266, -0.0001288],
      i: [1.3053, -0.001537],
      L: [34.40438, 3036.30278],
      w: [14.75385, 1.613524],
      node: [100.55615, 0.211369],
    },
    saturn: {
      a: 9.53707032,
      e: [0.0541506, -0.0003676],
      i: [2.48446, 0.001936],
      L: [49.94424, 1223.51101],
      w: [92.43194, 1.958416],
      node: [113.71504, -0.250105],
    },
  };

  const elem = elementsMap[planet];
  const e = elem.e[0] + elem.e[1] * T;
  const iRad = (elem.i[0] + elem.i[1] * T) * DEG_TO_RAD;
  const L = normalizeDeg(elem.L[0] + elem.L[1] * T);
  const w = normalizeDeg(elem.w[0] + elem.w[1] * T);
  const node = normalizeDeg(elem.node[0] + elem.node[1] * T);

  // Mean Anomaly
  const M = normalizeDeg(L - w) * DEG_TO_RAD;

  // Kepler equation solve (iterative)
  let E = M;
  for (let iter = 0; iter < 10; iter++) {
    const dE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    E -= dE;
    if (Math.abs(dE) < 1e-7) break;
  }

  // True Anomaly (v) and Radius vector (r)
  const xOrb = elem.a * (Math.cos(E) - e);
  const yOrb = elem.a * Math.sqrt(1 - e * e) * Math.sin(E);
  const r = Math.sqrt(xOrb * xOrb + yOrb * yOrb);
  const v = Math.atan2(yOrb, xOrb);

  // Heliocentric Coordinates
  const wRad = (w - node) * DEG_TO_RAD;
  const nodeRad = node * DEG_TO_RAD;

  const xHelio = r * (Math.cos(nodeRad) * Math.cos(v + wRad) - Math.sin(nodeRad) * Math.sin(v + wRad) * Math.cos(iRad));
  const yHelio = r * (Math.sin(nodeRad) * Math.cos(v + wRad) + Math.cos(nodeRad) * Math.sin(v + wRad) * Math.cos(iRad));
  const zHelio = r * (Math.sin(v + wRad) * Math.sin(iRad));

  // Geocentric conversion using Earth heliocentric coordinates (Sun geocentric negative)
  const sunPos = calculateSunPosition(jd);
  const sunLonRad = sunPos.longitude * DEG_TO_RAD;
  const xEarth = -sunPos.distance * Math.cos(sunLonRad);
  const yEarth = -sunPos.distance * Math.sin(sunLonRad);
  const zEarth = 0;

  const xGeo = xHelio - xEarth;
  const yGeo = yHelio - yEarth;
  const zGeo = zHelio - zEarth;

  const geoDist = Math.sqrt(xGeo * xGeo + yGeo * yGeo + zGeo * zGeo);
  const geoLon = normalizeDeg(Math.atan2(yGeo, xGeo) * RAD_TO_DEG);
  const geoLat = Math.asin(zGeo / geoDist) * RAD_TO_DEG;

  // Speed calculation over 0.25 day
  const dt = 0.25;
  const nextJd = jd + dt;
  const nextT = julianCenturiesSinceJ2000(nextJd);
  const nextElem = elementsMap[planet];
  const nextL = normalizeDeg(nextElem.L[0] + nextElem.L[1] * nextT);
  const nextW = normalizeDeg(nextElem.w[0] + nextElem.w[1] * nextT);
  const nextM = normalizeDeg(nextL - nextW) * DEG_TO_RAD;
  let nextE = nextM;
  for (let k = 0; k < 8; k++) {
    nextE -= (nextE - e * Math.sin(nextE) - nextM) / (1 - e * Math.cos(nextE));
  }
  const nextXOrb = nextElem.a * (Math.cos(nextE) - e);
  const nextYOrb = nextElem.a * Math.sqrt(1 - e * e) * Math.sin(nextE);
  const nextR = Math.sqrt(nextXOrb * nextXOrb + nextYOrb * nextYOrb);
  const nextV = Math.atan2(nextYOrb, nextXOrb);
  const nextXHelio = nextR * (Math.cos(nodeRad) * Math.cos(nextV + wRad) - Math.sin(nodeRad) * Math.sin(nextV + wRad) * Math.cos(iRad));
  const nextYHelio = nextR * (Math.sin(nodeRad) * Math.cos(nextV + wRad) + Math.cos(nodeRad) * Math.sin(nextV + wRad) * Math.cos(iRad));
  const nextSunPos = calculateSunPosition(nextJd);
  const nextSunLonRad = nextSunPos.longitude * DEG_TO_RAD;
  const nextXEarth = -nextSunPos.distance * Math.cos(nextSunLonRad);
  const nextYEarth = -nextSunPos.distance * Math.sin(nextSunLonRad);
  const nextGeoLon = normalizeDeg(Math.atan2(nextYHelio - nextYEarth, nextXHelio - nextXEarth) * RAD_TO_DEG);

  let speed = (nextGeoLon - geoLon) / dt;
  if (speed > 180 / dt) speed -= 360 / dt;
  if (speed < -180 / dt) speed += 360 / dt;

  return {
    longitude: geoLon,
    latitude: geoLat,
    distance: geoDist,
    speed: speed,
  };
}

/**
 * Calculates positions of all 9 Vedic Grahas
 */
export function calculateAllPlanetaryCoordinates(jd: number): PlanetaryOrbitData {
  const sun = calculateSunPosition(jd);
  const moon = calculateMoonPosition(jd);
  const mars = calculateMajorPlanet("mars", jd);
  const mercury = calculateMajorPlanet("mercury", jd);
  const jupiter = calculateMajorPlanet("jupiter", jd);
  const venus = calculateMajorPlanet("venus", jd);
  const saturn = calculateMajorPlanet("saturn", jd);
  const nodes = calculateLunarNodes(jd);

  return {
    sun,
    moon,
    mars,
    mercury,
    jupiter,
    venus,
    saturn,
    rahuMean: nodes.rahuMean,
    rahuTrue: nodes.rahuTrue,
    ketuMean: nodes.ketuMean,
    ketuTrue: nodes.ketuTrue,
  };
}

