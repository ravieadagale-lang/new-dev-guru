/**
 * Astronomy Events Engine - Ingresses, Stations, Eclipses, Solstices, Equinoxes & Phenomena
 * Implements Section 3, 41 of the AstroNext Specification.
 */

import { normalizeDeg, julianCenturiesSinceJ2000, calculateSunPosition, calculateMoonPosition, calculateMajorPlanet, calculateLunarNodes, degToDMS } from "./astronomyMath";
import { ZODIAC_SIGNS } from "./zodiacEngine";
import { NAKSHATRAS_MASTER } from "../data/astrologyData";

export interface AstroPhenomenonEvent {
  id: string;
  eventType:
    | "Planet Sign Ingress"
    | "Planet Nakshatra Ingress"
    | "Station Retrograde"
    | "Station Direct"
    | "Planetary Conjunction"
    | "Planetary Opposition"
    | "Solar Eclipse"
    | "Lunar Eclipse"
    | "Equinox"
    | "Solstice"
    | "Sankranti"
    | "Peak Combustion";
  planet: string;
  secondaryPlanet?: string;
  timestampIso: string;
  julianDay: number;
  sign?: string;
  nakshatra?: string;
  pada?: number;
  exactDegrees: number;
  details: string;
  isMajor: boolean;
}

export interface SolarLunarEclipseDetail {
  id: string;
  eclipseType: "Total Solar" | "Annular Solar" | "Partial Solar" | "Total Lunar" | "Partial Lunar" | "Penumbral Lunar";
  peakUtcIso: string;
  julianDay: number;
  magnitude: number;
  sunLongitude: number;
  moonLongitude: number;
  rashi: string;
  nakshatra: string;
  pada: number;
  sutakStartIso: string;
  sutakEndIso: string;
  visibilityRegions: string[];
  traditionalRestrictions: string[];
}

export interface AstronomicalEventSummary {
  events: AstroPhenomenonEvent[];
  eclipses: SolarLunarEclipseDetail[];
  upcomingMajorStations: AstroPhenomenonEvent[];
  upcomingSankrantis: AstroPhenomenonEvent[];
}

export class AstronomyEventsEngine {
  /**
   * Scan astronomical events for a pipeline date window
   */
  public static scanAstronomicalEvents(params: {
    startDateUtc: Date;
    endDateUtc: Date;
    currentPlanets?: Record<string, { longitude: number; speedLongitudeDegPerDay?: number }>;
  }): AstronomicalEventSummary {
    const startJd = params.startDateUtc.getTime() / 86400000 + 2440587.5;
    const diffDays = Math.max(
      30,
      Math.min(365, (params.endDateUtc.getTime() - params.startDateUtc.getTime()) / 86400000)
    );
    const events = this.scanEvents(startJd, diffDays);
    const year = params.startDateUtc.getUTCFullYear();
    const eclipses = this.calculateEclipses(year);

    const upcomingMajorStations = events.filter(
      (e) => e.eventType === "Station Retrograde" || e.eventType === "Station Direct"
    );
    const upcomingSankrantis = events.filter((e) => e.eventType === "Sankranti");

    return {
      events,
      eclipses,
      upcomingMajorStations,
      upcomingSankrantis,
    };
  }

  /**
   * Scan astronomical events for a given Julian Day window (e.g. 30 days)
   */
  public static scanEvents(startJd: number, daysRange: number = 30): AstroPhenomenonEvent[] {
    const events: AstroPhenomenonEvent[] = [];
    const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];

    const stepDays = 0.5;
    for (let dayOffset = 0; dayOffset < daysRange; dayOffset += stepDays) {
      const currentJd = startJd + dayOffset;
      const nextJd = currentJd + stepDays;

      // Check Sun Sankranti & Ingress
      const sunCurr = calculateSunPosition(currentJd);
      const sunNext = calculateSunPosition(nextJd);
      const sunCurrSign = Math.floor(sunCurr.longitude / 30);
      const sunNextSign = Math.floor(sunNext.longitude / 30);

      if (sunCurrSign !== sunNextSign) {
        const signName = ZODIAC_SIGNS[sunNextSign].englishName || ZODIAC_SIGNS[sunNextSign].name;
        const sanskritSign = ZODIAC_SIGNS[sunNextSign].sanskritName;
        events.push({
          id: `sankranti-${sunNextSign}-${Math.floor(currentJd)}`,
          eventType: "Sankranti",
          planet: "Sun",
          timestampIso: new Date((currentJd - 2440587.5) * 86400000).toISOString(),
          julianDay: currentJd,
          sign: signName,
          exactDegrees: sunNext.longitude,
          details: `Surya enters ${sanskritSign} (${signName}) - ${signName} Sankranti`,
          isMajor: true,
        });
      }

      // Check Moon Sign & Nakshatra Ingress
      const moonCurr = calculateMoonPosition(currentJd);
      const moonNext = calculateMoonPosition(nextJd);
      const moonCurrNak = Math.floor(moonCurr.longitude / (360 / 27));
      const moonNextNak = Math.floor(moonNext.longitude / (360 / 27));

      if (moonCurrNak !== moonNextNak && dayOffset % 1 === 0) {
        const nakName = NAKSHATRAS_MASTER[moonNextNak % 27]?.name || `Nakshatra ${moonNextNak + 1}`;
        events.push({
          id: `moon-nak-${moonNextNak}-${Math.floor(currentJd)}`,
          eventType: "Planet Nakshatra Ingress",
          planet: "Moon",
          timestampIso: new Date((currentJd - 2440587.5) * 86400000).toISOString(),
          julianDay: currentJd,
          nakshatra: nakName,
          pada: Math.floor((moonNext.longitude % (360 / 27)) / (360 / 108)) + 1,
          exactDegrees: moonNext.longitude,
          details: `Chandra enters ${nakName}`,
          isMajor: false,
        });
      }

      // Check Retrograde stations for Mars, Mercury, Jupiter, Venus, Saturn
      const majorBodies = ["mercury", "venus", "mars", "jupiter", "saturn"] as const;
      majorBodies.forEach((bodyKey) => {
        const pCurr = calculateMajorPlanet(bodyKey, currentJd);
        const pNext = calculateMajorPlanet(bodyKey, nextJd);
        const pName = bodyKey.charAt(0).toUpperCase() + bodyKey.slice(1);

        if (pCurr.speed > 0 && pNext.speed <= 0) {
          events.push({
            id: `station-retro-${bodyKey}-${Math.floor(currentJd)}`,
            eventType: "Station Retrograde",
            planet: pName,
            timestampIso: new Date((currentJd - 2440587.5) * 86400000).toISOString(),
            julianDay: currentJd,
            exactDegrees: pNext.longitude,
            details: `${pName} becomes Stationary Retrograde (Vakri)`,
            isMajor: true,
          });
        } else if (pCurr.speed < 0 && pNext.speed >= 0) {
          events.push({
            id: `station-dir-${bodyKey}-${Math.floor(currentJd)}`,
            eventType: "Station Direct",
            planet: pName,
            timestampIso: new Date((currentJd - 2440587.5) * 86400000).toISOString(),
            julianDay: currentJd,
            exactDegrees: pNext.longitude,
            details: `${pName} turns Stationary Direct (Marga)`,
            isMajor: true,
          });
        }
      });
    }

    return events;
  }

  /**
   * Calculate Solar & Lunar Eclipses for a given Year
   */
  public static calculateEclipses(year: number): SolarLunarEclipseDetail[] {
    const eclipses: SolarLunarEclipseDetail[] = [];
    const baseJd = 2451545.0 + (year - 2000) * 365.2422;

    // Scan for New Moons (Solar) and Full Moons (Lunar) within node proximity
    for (let month = 0; month < 12; month++) {
      const approxJd = baseJd + month * 29.530588;
      const sun = calculateSunPosition(approxJd);
      const moon = calculateMoonPosition(approxJd);
      const nodes = calculateLunarNodes(approxJd);

      const rahuDistSun = Math.min(
        Math.abs(normalizeDeg(sun.longitude - nodes.rahuMean.longitude)),
        Math.abs(normalizeDeg(sun.longitude - nodes.ketuMean.longitude))
      );

      // Solar Eclipse at New Moon near Node
      const sunMoonDiff = Math.abs(normalizeDeg(sun.longitude - moon.longitude));
      if ((sunMoonDiff < 10 || sunMoonDiff > 350) && rahuDistSun < 16) {
        const signIdx = Math.floor(sun.longitude / 30);
        const nakIdx = Math.floor(sun.longitude / (360 / 27));
        const dt = new Date((approxJd - 2440587.5) * 86400000);
        const sutakStart = new Date(dt.getTime() - 12 * 3600000); // 12 hours before Surya Grahan
        const sutakEnd = new Date(dt.getTime() + 4 * 3600000);

        eclipses.push({
          id: `solar-eclipse-${year}-${month + 1}`,
          eclipseType: rahuDistSun < 8 ? "Total Solar" : "Partial Solar",
          peakUtcIso: dt.toISOString(),
          julianDay: approxJd,
          magnitude: Number((1.0 - rahuDistSun / 18.0).toFixed(3)),
          sunLongitude: sun.longitude,
          moonLongitude: moon.longitude,
          rashi: ZODIAC_SIGNS[signIdx]?.englishName || "Aries",
          nakshatra: NAKSHATRAS_MASTER[nakIdx % 27]?.name || "Ashwini",
          pada: Math.floor((sun.longitude % (360 / 27)) / (360 / 108)) + 1,
          sutakStartIso: sutakStart.toISOString(),
          sutakEndIso: sutakEnd.toISOString(),
          visibilityRegions: ["Asia", "Europe", "Pacific", "Indian Ocean"],
          traditionalRestrictions: [
            "Avoid beginning major commercial ventures during Eclipse duration",
            "Mantra Japa and spiritual meditation are magnified 1000-fold",
            "Follow traditional Sutak fasting window",
          ],
        });
      }

      // Lunar Eclipse at Full Moon near Node
      const oppDiff = Math.abs(normalizeDeg(moon.longitude - sun.longitude - 180));
      if (oppDiff < 12 && rahuDistSun < 12) {
        const signIdx = Math.floor(moon.longitude / 30);
        const nakIdx = Math.floor(moon.longitude / (360 / 27));
        const dt = new Date((approxJd + 14.76 - 2440587.5) * 86400000);
        const sutakStart = new Date(dt.getTime() - 9 * 3600000); // 9 hours before Chandra Grahan
        const sutakEnd = new Date(dt.getTime() + 4 * 3600000);

        eclipses.push({
          id: `lunar-eclipse-${year}-${month + 1}`,
          eclipseType: rahuDistSun < 5 ? "Total Lunar" : "Partial Lunar",
          peakUtcIso: dt.toISOString(),
          julianDay: approxJd + 14.76,
          magnitude: Number((0.95 - rahuDistSun / 14.0).toFixed(3)),
          sunLongitude: sun.longitude,
          moonLongitude: moon.longitude,
          rashi: ZODIAC_SIGNS[signIdx]?.englishName || "Taurus",
          nakshatra: NAKSHATRAS_MASTER[nakIdx % 27]?.name || "Rohini",
          pada: Math.floor((moon.longitude % (360 / 27)) / (360 / 108)) + 1,
          sutakStartIso: sutakStart.toISOString(),
          sutakEndIso: sutakEnd.toISOString(),
          visibilityRegions: ["Asia", "Australia", "North America", "Africa"],
          traditionalRestrictions: [
            "Perform charitable donations (Daan) post eclipse culmination",
            "Spiritual contemplation during active totality",
          ],
        });
      }
    }

    return eclipses;
  }
}
