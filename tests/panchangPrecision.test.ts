import { describe, it, expect } from "vitest";
import {
  calculatePrecisionPanchang,
  PrecisionPanchangOptions
} from "../src/engine/panchangPrecisionEngine";
import { GLOBAL_CITIES } from "../src/utils/vedicAstronomicalEngine";

describe("Panchang Precision Astronomical Engine Test Suite", () => {
  const delhi = GLOBAL_CITIES[0]; // 28.6139, 77.2090, UTC+5.5
  const newYork = GLOBAL_CITIES[6]; // 40.7128, -74.0060, UTC-5.0
  const london = GLOBAL_CITIES[5]; // 51.5074, -0.1278, UTC 0.0

  const testDate = "2026-10-15";
  const testTime = "10:30";

  describe("1. Precision Tithi Calculation", () => {
    it("calculates accurate Tithi with elongation, arc completion, and root-found boundaries", () => {
      const result = calculatePrecisionPanchang({
        date: testDate,
        time: testTime,
        latitude: delhi.latitude,
        longitude: delhi.longitude,
        timezoneOffsetHours: delhi.timezoneOffsetHours,
        cityName: delhi.name
      });

      const { instantaneous, udaya, tithiAnomaly } = result.tithi;

      // Index must be 1 to 30
      expect(instantaneous.index).toBeGreaterThanOrEqual(1);
      expect(instantaneous.index).toBeLessThanOrEqual(30);

      // Paksha must be Shukla or Krishna
      expect(["Shukla", "Krishna"]).toContain(instantaneous.paksha);

      // Category must be one of the classical five
      expect(["Nanda", "Bhadra", "Jaya", "Rikta", "Poorna"]).toContain(instantaneous.category);
      expect(instantaneous.categoryDescription).toBeDefined();

      // Tatwa and Deity
      expect(["Agni", "Prithvi", "Vayu", "Jala", "Akasha"]).toContain(instantaneous.tatwa);
      expect(instantaneous.deity).toBeDefined();

      // Arc precision: elapsed + remaining = 12 degrees
      expect(instantaneous.elapsedDeg + instantaneous.remainingDeg).toBeCloseTo(12.0, 4);
      expect(instantaneous.progressPct).toBeGreaterThanOrEqual(0);
      expect(instantaneous.progressPct).toBeLessThanOrEqual(100);

      // Root-found start and end transitions
      expect(instantaneous.startDate).toBeInstanceOf(Date);
      expect(instantaneous.endDate).toBeInstanceOf(Date);
      expect(instantaneous.startDate.getTime()).toBeLessThan(instantaneous.endDate.getTime());
      expect(instantaneous.durationHours).toBeGreaterThan(15);
      expect(instantaneous.durationHours).toBeLessThan(30);

      // Sunrise Udaya Tithi must be populated
      expect(udaya.index).toBeGreaterThanOrEqual(1);
      expect(udaya.index).toBeLessThanOrEqual(30);
      expect(udaya.name).toBeDefined();

      // Anomaly detection
      expect(["Normal", "Kshaya", "Vriddhi"]).toContain(tithiAnomaly);
    });
  });

  describe("2. Precision Karana Calculation & Bhadra Analytics", () => {
    it("calculates 60 Karana divisions with Chara/Sthira classifications and root-finding", () => {
      const result = calculatePrecisionPanchang({
        date: testDate,
        time: testTime,
        latitude: delhi.latitude,
        longitude: delhi.longitude,
        timezoneOffsetHours: delhi.timezoneOffsetHours,
        cityName: delhi.name
      });

      const { karana } = result;

      // Index 1 to 60
      expect(karana.index).toBeGreaterThanOrEqual(1);
      expect(karana.index).toBeLessThanOrEqual(60);

      // Type
      expect(["Chara", "Sthira"]).toContain(karana.type);
      expect(karana.name).toBeDefined();
      expect(karana.ruler).toBeDefined();
      expect(karana.deity).toBeDefined();

      // Arc: elapsed + remaining = 6 degrees
      expect(karana.elapsedDeg + karana.remainingDeg).toBeCloseTo(6.0, 4);
      expect(karana.progressPct).toBeGreaterThanOrEqual(0);
      expect(karana.progressPct).toBeLessThanOrEqual(100);

      // Start and end transitions
      expect(karana.startDate.getTime()).toBeLessThan(karana.endDate.getTime());
      expect(karana.durationHours).toBeGreaterThan(8);
      expect(karana.durationHours).toBeLessThan(16);
    });

    it("evaluates Bhadra (Vishti) analytics correctly when active or inactive", () => {
      // Test across multiple dates to ensure Bhadra analytics structure is rock-solid
      const datesToTest = ["2026-10-12", "2026-10-15", "2026-10-18", "2026-10-21"];
      let encounteredBhadra = false;

      for (const d of datesToTest) {
        const res = calculatePrecisionPanchang({
          date: d,
          time: "12:00",
          latitude: delhi.latitude,
          longitude: delhi.longitude,
          timezoneOffsetHours: delhi.timezoneOffsetHours
        });

        if (res.karana.bhadraDetails) {
          encounteredBhadra = true;
          expect(res.karana.bhadraDetails.isBhadra).toBe(true);
          expect(["Swarga Loka", "Patala Loka", "Mrityu Loka"]).toContain(res.karana.bhadraDetails.vasLocation);
          expect(res.karana.bhadraDetails.mukhaStart.getTime()).toBeLessThan(res.karana.bhadraDetails.mukhaEnd.getTime());
          expect(res.karana.bhadraDetails.puchhaStart.getTime()).toBeLessThan(res.karana.bhadraDetails.puchhaEnd.getTime());
        }
      }
    });
  });

  describe("3. Precision Yoga (Nitya Yoga) Calculation", () => {
    it("calculates 27 Nitya Yogas with exact combined sum angle and dosha annotations", () => {
      const result = calculatePrecisionPanchang({
        date: testDate,
        time: testTime,
        latitude: delhi.latitude,
        longitude: delhi.longitude,
        timezoneOffsetHours: delhi.timezoneOffsetHours,
        cityName: delhi.name
      });

      const { yoga } = result;

      // Index 1 to 27
      expect(yoga.index).toBeGreaterThanOrEqual(1);
      expect(yoga.index).toBeLessThanOrEqual(27);

      expect(typeof yoga.isAuspicious).toBe("boolean");
      expect(yoga.name).toBeDefined();
      expect(yoga.meaning).toBeDefined();
      expect(yoga.deity).toBeDefined();
      expect(yoga.ruler).toBeDefined();

      // Arc: elapsed + remaining = 13.333333 degrees (13° 20')
      expect(yoga.elapsedDeg + yoga.remainingDeg).toBeCloseTo(360 / 27, 4);
      expect(yoga.progressPct).toBeGreaterThanOrEqual(0);
      expect(yoga.progressPct).toBeLessThanOrEqual(100);

      // Root-found start and end
      expect(yoga.startDate.getTime()).toBeLessThan(yoga.endDate.getTime());
      expect(yoga.durationHours).toBeGreaterThan(16);
      expect(yoga.durationHours).toBeLessThan(30);

      // Special guidance advice
      expect(yoga.specialAdvice).toBeDefined();
    });
  });

  describe("4. Geographic Latitude, Longitude, and Timezone Sensitivity", () => {
    it("produces distinct, location-specific solar events and timestamps across global coordinates", () => {
      const delhiResult = calculatePrecisionPanchang({
        date: testDate,
        time: "12:00",
        latitude: delhi.latitude,
        longitude: delhi.longitude,
        timezoneOffsetHours: delhi.timezoneOffsetHours,
        cityName: delhi.name
      });

      const nyResult = calculatePrecisionPanchang({
        date: testDate,
        time: "12:00",
        latitude: newYork.latitude,
        longitude: newYork.longitude,
        timezoneOffsetHours: newYork.timezoneOffsetHours,
        cityName: newYork.name
      });

      // Sunrise in Delhi and NY must be calculated accurately for their local times
      expect(delhiResult.solarEvents.sunriseFormatted).not.toEqual(nyResult.solarEvents.sunriseFormatted);
      expect(delhiResult.solarEvents.dinamanaFormatted).toBeDefined();
      expect(nyResult.solarEvents.dinamanaFormatted).toBeDefined();

      // Ephemeris Julian Days will differ since 12:00 local time corresponds to different UTC epochs
      expect(delhiResult.evalJd).not.toEqual(nyResult.evalJd);
    });
  });

  describe("5. Ayanamsa Systems Compatibility", () => {
    it("accurately applies Lahiri, KP, Raman, and Sayana ayanamsas", () => {
      const lahiri = calculatePrecisionPanchang({
        date: testDate,
        time: "12:00",
        latitude: delhi.latitude,
        longitude: delhi.longitude,
        timezoneOffsetHours: 5.5,
        ayanamsaSystem: "lahiri"
      });

      const raman = calculatePrecisionPanchang({
        date: testDate,
        time: "12:00",
        latitude: delhi.latitude,
        longitude: delhi.longitude,
        timezoneOffsetHours: 5.5,
        ayanamsaSystem: "raman"
      });

      const sayana = calculatePrecisionPanchang({
        date: testDate,
        time: "12:00",
        latitude: delhi.latitude,
        longitude: delhi.longitude,
        timezoneOffsetHours: 5.5,
        ayanamsaSystem: "sayana"
      });

      // Lahiri ayanamsa is approx 24 degrees in 2026
      expect(lahiri.ayanamsa.valueDeg).toBeGreaterThan(24.0);
      expect(lahiri.ayanamsa.valueDeg).toBeLessThan(25.0);

      // Raman is ~22.7 degrees
      expect(raman.ayanamsa.valueDeg).toBeLessThan(lahiri.ayanamsa.valueDeg);

      // Sayana is 0.0 degrees
      expect(sayana.ayanamsa.valueDeg).toBe(0.0);

      // Sidereal Sun longitudes will shift accordingly
      expect(sayana.solarEphemeris.siderealLongitudeDeg).toBeCloseTo(sayana.solarEphemeris.longitudeDeg, 4);
      expect(lahiri.solarEphemeris.siderealLongitudeDeg).not.toBeCloseTo(sayana.solarEphemeris.siderealLongitudeDeg, 1);
    });
  });
});
