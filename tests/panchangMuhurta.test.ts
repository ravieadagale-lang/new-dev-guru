import { describe, it, expect } from "vitest";
import {
  calculateAuthoritativePanchang,
  calculateSolarEvents,
  calculateLunarEvents
} from "../src/engine/panchangEngine";
import {
  AuthoritativeMuhurtaEngine,
  MUHURTA_EVENT_REGISTRY
} from "../src/engine/muhurtaRuleRegistryEngine";
import { GLOBAL_CITIES, calculateTarabalamAndChandrabalam } from "../src/utils/vedicAstronomicalEngine";

describe("Panchang & Muhurta Engine Test Suite", () => {
  const delhi = GLOBAL_CITIES[0]; // New Delhi: 28.6139, 77.2090, UTC+5.5
  const testDateStr = "2026-05-15"; // Specific test reference date
  const testDate = new Date(`${testDateStr}T12:00:00`);

  describe("1. Astronomical Solar & Lunar Foundations", () => {
    it("calculates positive, chronological sunrise and sunset", () => {
      const solar = calculateSolarEvents(testDate, delhi.latitude, delhi.longitude, delhi.timezoneOffsetHours);
      expect(solar.sunrise).toBeInstanceOf(Date);
      expect(solar.sunset).toBeInstanceOf(Date);
      expect(solar.nextSunrise).toBeInstanceOf(Date);

      // Sunrise must precede Sunset
      expect(solar.sunrise.getTime()).toBeLessThan(solar.sunset.getTime());
      // Sunset must precede next Sunrise
      expect(solar.sunset.getTime()).toBeLessThan(solar.nextSunrise.getTime());

      // Dinamana (day length) and Ratrimana (night length) must be positive and reasonable (~10-14 hours)
      const dayHours = solar.dinamanaMs / (3600 * 1000);
      const nightHours = solar.ratrimanaMs / (3600 * 1000);
      expect(dayHours).toBeGreaterThan(9);
      expect(dayHours).toBeLessThan(15);
      expect(nightHours).toBeGreaterThan(9);
      expect(nightHours).toBeLessThan(15);
      expect(dayHours + nightHours).toBeCloseTo(24, 0.5);
    });

    it("calculates valid moonrise and moonset strings", () => {
      const lunar = calculateLunarEvents(testDate, delhi.latitude, delhi.longitude, delhi.timezoneOffsetHours);
      expect(lunar).toBeDefined();
      expect(typeof lunar.moonriseStr).toBe("string");
      expect(typeof lunar.moonsetStr).toBe("string");
    });
  });

  describe("2. Five Core Panchanga Limbs (Tithi, Nakshatra, Yoga, Karana, Vara)", () => {
    const panchang = calculateAuthoritativePanchang({
      date: testDate,
      latitude: delhi.latitude,
      longitude: delhi.longitude,
      timezoneOffsetHours: delhi.timezoneOffsetHours
    });

    it("provides valid Tithi with Paksha", () => {
      expect(panchang.tithi).toBeDefined();
      expect(panchang.tithi.length).toBeGreaterThan(0);
      expect(panchang.paksha).toMatch(/(Shukla|Krishna)/);
      expect(panchang.currentTithi.index).toBeGreaterThanOrEqual(1);
      expect(panchang.currentTithi.index).toBeLessThanOrEqual(30);
    });

    it("provides valid Nakshatra with Pada", () => {
      expect(panchang.nakshatra).toBeDefined();
      expect(panchang.nakshatraPada).toBeGreaterThanOrEqual(1);
      expect(panchang.nakshatraPada).toBeLessThanOrEqual(4);
      expect(panchang.transitions.nakshatraStart).toBeDefined();
      expect(panchang.transitions.nakshatraEnd).toBeDefined();
    });

    it("provides valid Nitya Yoga", () => {
      expect(panchang.yoga).toBeDefined();
      expect(panchang.transitions.yogaStart).toBeDefined();
      expect(panchang.transitions.yogaEnd).toBeDefined();
    });

    it("provides valid Karana", () => {
      expect(panchang.karana).toBeDefined();
      expect(panchang.transitions.karanaStart).toBeDefined();
      expect(panchang.transitions.karanaEnd).toBeDefined();
    });

    it("provides correct Vedic Solar Weekday (Vara)", () => {
      expect(panchang.dayOfWeek).toBeDefined();
      expect(panchang.dayOfWeek).toMatch(/(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/);
      expect(panchang.vara).toBeDefined();
    });
  });

  describe("3. 24 Planetary Horas & 16 Choghadiya Muhurtas", () => {
    const panchang = calculateAuthoritativePanchang({
      date: testDate,
      latitude: delhi.latitude,
      longitude: delhi.longitude,
      timezoneOffsetHours: delhi.timezoneOffsetHours
    });

    it("generates exactly 24 continuous planetary horas (12 Day + 12 Night)", () => {
      expect(panchang.dayHoras).toHaveLength(12);
      expect(panchang.nightHoras).toHaveLength(12);
      expect(panchang.horas).toHaveLength(24);

      // Verify continuous timestamps in daytime horas
      for (let i = 0; i < 11; i++) {
        expect(panchang.dayHoras[i].endTime.getTime()).toBe(panchang.dayHoras[i + 1].startTime.getTime());
      }
      // Verify continuous timestamps in nighttime horas
      for (let i = 0; i < 11; i++) {
        expect(panchang.nightHoras[i].endTime.getTime()).toBe(panchang.nightHoras[i + 1].startTime.getTime());
      }
    });

    it("generates exactly 16 location-aware Choghadiya segments (8 Day + 8 Night)", () => {
      expect(panchang.dayChoghadiya).toHaveLength(8);
      expect(panchang.nightChoghadiya).toHaveLength(8);
      expect(panchang.choghadiya.day).toHaveLength(8);
      expect(panchang.choghadiya.night).toHaveLength(8);

      const validNatures = ["Amrit", "Shubh", "Labh", "Char", "Rog", "Kal", "Kaal", "Udveg"];
      panchang.dayChoghadiya.forEach((c) => {
        expect(validNatures).toContain(c.nature);
        expect(c.lord).toBeDefined();
      });
      panchang.nightChoghadiya.forEach((c) => {
        expect(validNatures).toContain(c.nature);
        expect(c.lord).toBeDefined();
      });
    });
  });

  describe("4. Tarabalam & Chandrabalam Scoring Engine", () => {
    it("evaluates Tarabalam and Chandrabalam deterministically against user birth star", () => {
      const result = calculateTarabalamAndChandrabalam("Rohini", "Taurus", "Hasta", "Virgo");
      expect(result).toBeDefined();
      expect(result.taraName).toBeDefined();
      expect(["Auspicious", "Inauspicious", "Neutral"]).toContain(result.taraQuality);
      expect(result.chandrabalam).toBeDefined();
      expect(typeof result.isFavorable).toBe("boolean");
    });
  });

  describe("5. Authoritative Muhurta Event Registry & Engine", () => {
    it("verifies all 25 registered Muhurta events have complete shastric profiles", () => {
      expect(MUHURTA_EVENT_REGISTRY.length).toBeGreaterThanOrEqual(25);

      MUHURTA_EVENT_REGISTRY.forEach((event) => {
        expect(event.eventId).toBeDefined();
        expect(event.name).toBeDefined();
        expect(event.sanskritName).toBeDefined();
        expect(event.category).toBeDefined();
        expect(event.ruleId).toBeDefined();
        expect(event.favorableNakshatras.length).toBeGreaterThan(0);
        expect(event.favorableTithis.length).toBeGreaterThan(0);
        expect(event.favorableVaras.length).toBeGreaterThan(0);
        expect(event.source).toBeDefined();
      });
    });

    it("executes multi-day upcoming Muhurta forward scan successfully without runtime errors", () => {
      const searchResult = AuthoritativeMuhurtaEngine.searchUpcomingMuhurtas({
        eventId: "vivah",
        city: delhi,
        startDateStr: testDateStr,
        rangeDays: 30
      });

      expect(searchResult).toBeDefined();
      expect(searchResult.totalDaysEvaluated).toBe(30);
      expect(searchResult.searchStartDate).toBe(testDateStr);
      expect(searchResult.ruleProfileUsed).toBeDefined();
      expect(searchResult.ruleProfileUsed.ruleId).toBe("RULE_VIVAH_CHINTAMANI_01");
      expect(Array.isArray(searchResult.qualifyingWindows)).toBe(true);
      expect(Array.isArray(searchResult.rejectedDatesSummary)).toBe(true);
      expect(searchResult.qualifyingWindows.length + searchResult.rejectedDatesSummary.length).toBeGreaterThanOrEqual(30);
    });

    it("evaluates diverse categories without errors (Business, Property, Spiritual, Travel)", () => {
      const testEvents = ["griha_pravesh", "business_launch", "namakaran", "vehicle_purchase", "upanayana"];
      testEvents.forEach((eventId) => {
        const res = AuthoritativeMuhurtaEngine.searchUpcomingMuhurtas({
          eventId,
          city: delhi,
          startDateStr: testDateStr,
          rangeDays: 14
        });
        expect(res.eventId).toBe(eventId);
        expect(res.totalDaysEvaluated).toBe(14);
      });
    });

    it("accurately identifies Monday (Somavara) on October 12 2026 across midnight and pre-dawn inputs", () => {
      // 1. As calendar date string
      const pStr = calculateAuthoritativePanchang({
        date: "2026-10-12",
        latitude: delhi.latitude,
        longitude: delhi.longitude,
        timezoneOffsetHours: delhi.timezoneOffsetHours
      });
      expect(pStr.vara).toContain("Monday");
      expect(pStr.vara).toContain("Somavara");
      expect(pStr.dayOfWeek).toContain("Monday");
      expect(pStr.dayOfWeek).toContain("Moon");
      expect(pStr.dateStr).toBe("2026-10-12");
      expect(pStr.abhijitMuhurta).toBeDefined();
      expect(pStr.brahmaMuhurta).toBeDefined();

      // 2. As midnight Date object
      const pMidnight = calculateAuthoritativePanchang({
        date: new Date("2026-10-12T00:00:00"),
        latitude: delhi.latitude,
        longitude: delhi.longitude,
        timezoneOffsetHours: delhi.timezoneOffsetHours
      });
      expect(pMidnight.vara).toContain("Monday");
      expect(pMidnight.vara).toContain("Somavara");
      expect(pMidnight.dateStr).toBe("2026-10-12");

      // 3. In negative timezone (e.g. Pacific Daylight Time -7)
      const pLA = calculateAuthoritativePanchang({
        date: new Date("2026-10-12T00:44:32-07:00"),
        latitude: 37.7749,
        longitude: -122.4194,
        timezoneOffsetHours: -7
      });
      expect(pLA.vara).toContain("Monday");
      expect(pLA.vara).toContain("Somavara");
      expect(pLA.dateStr).toBe("2026-10-12");
    });
  });
});

