import { describe, it, expect } from "vitest";
import {
  AuthoritativeMuhurtaEngine,
  MUHURTA_EVENT_REGISTRY
} from "../src/engine/muhurtaRuleRegistryEngine";
import { GLOBAL_CITIES } from "../src/utils/vedicAstronomicalEngine";

describe("All 25 Muhurta Event Profiles Shastric Coverage & Search Verification", () => {
  const delhi = GLOBAL_CITIES[0];
  const testDateStr = "2026-06-01";

  it("verifies all 25 Muhurta event definitions have non-empty required fields and explicit rules", () => {
    expect(MUHURTA_EVENT_REGISTRY.length).toBe(25);

    MUHURTA_EVENT_REGISTRY.forEach((event) => {
      // Identity & Category
      expect(event.eventId, `Event missing eventId`).toBeTruthy();
      expect(event.name, `Event ${event.eventId} missing name`).toBeTruthy();
      expect(event.sanskritName, `Event ${event.eventId} missing sanskritName`).toBeTruthy();
      expect(event.category, `Event ${event.eventId} missing category`).toBeTruthy();
      expect(event.description, `Event ${event.eventId} missing description`).toBeTruthy();
      expect(["SUPPORTED", "RULE_PROFILE_REQUIRED", "PARTIAL"]).toContain(event.supportLevel);
      expect(event.ruleId).toMatch(/^RULE_/);
      expect(event.source).toBeTruthy();
      expect(event.version).toBeTruthy();

      // Electional rules
      expect(event.favorableNakshatras.length).toBeGreaterThan(0);
      expect(event.favorableTithis.length).toBeGreaterThan(0);
      expect(event.favorableVaras.length).toBeGreaterThan(0);
      expect(Array.isArray(event.prohibitedVaras)).toBe(true);

      // Verify nakshatra indices are within 0-26
      event.favorableNakshatras.forEach((nakIdx) => {
        expect(nakIdx).toBeGreaterThanOrEqual(0);
        expect(nakIdx).toBeLessThanOrEqual(26);
      });

      // Verify tithi numbers are within 1-30
      event.favorableTithis.forEach((tithiNum) => {
        expect(tithiNum).toBeGreaterThanOrEqual(1);
        expect(tithiNum).toBeLessThanOrEqual(30);
      });

      // Verify vara indices are within 0-6
      event.favorableVaras.forEach((varaIdx) => {
        expect(varaIdx).toBeGreaterThanOrEqual(0);
        expect(varaIdx).toBeLessThanOrEqual(6);
      });
    });
  });

  // Test every single one of the 25 events via searchUpcomingMuhurtas
  MUHURTA_EVENT_REGISTRY.forEach((event) => {
    it(`evaluates ${event.eventId} (${event.name}) across a 14-day window without errors`, () => {
      const result = AuthoritativeMuhurtaEngine.searchUpcomingMuhurtas({
        eventId: event.eventId,
        city: delhi,
        startDateStr: testDateStr,
        rangeDays: 14
      });

      expect(result).toBeDefined();
      expect(result.eventId).toBe(event.eventId);
      expect(result.eventName).toBe(event.name);
      expect(result.totalDaysEvaluated).toBe(14);
      expect(result.ruleProfileUsed.ruleId).toBe(event.ruleId);
      expect(Array.isArray(result.qualifyingWindows)).toBe(true);
      expect(Array.isArray(result.rejectedDatesSummary)).toBe(true);

      // Each evaluated qualifying window has valid structure
      result.qualifyingWindows.forEach((win) => {
        expect(win.windowId).toBeTruthy();
        expect(win.dateStr).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(win.startTimeStr).toBeTruthy();
        expect(win.endTimeStr).toBeTruthy();
        expect(win.durationMinutes).toBeGreaterThan(0);
        expect(win.suitabilityScore).toBeGreaterThanOrEqual(0);
        expect(win.panchangSummary).toBeDefined();
        expect(win.panchangSummary.tithi).toBeTruthy();
        expect(win.panchangSummary.nakshatra).toBeTruthy();
        expect(win.panchangSummary.vara).toBeTruthy();
      });

      // Sum of qualifying dates and rejected dates covers all 14 evaluated days
      const evaluatedDates = new Set([
        ...result.qualifyingWindows.map((w) => w.dateStr),
        ...result.rejectedDatesSummary.map((r) => r.dateStr)
      ]);
      expect(evaluatedDates.size).toBe(14);
    });
  });
});
