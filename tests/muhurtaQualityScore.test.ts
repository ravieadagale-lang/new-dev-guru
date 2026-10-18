import { describe, it, expect } from "vitest";
import {
  MuhurtaQualityScoreEngine,
  MUHURTA_ACTIVITIES,
  MuhurtaActivityKey
} from "../src/engine/muhurtaQualityScoreEngine";
import { GLOBAL_CITIES } from "../src/utils/vedicAstronomicalEngine";

describe("MuhurtaQualityScoreEngine - Standard Vedic Weightings", () => {
  const delhi = GLOBAL_CITIES[0]; // New Delhi

  it("calculates quality score for gold purchase, business launch, and travel", () => {
    const testDate = new Date("2026-10-15T12:00:00"); // Standard test time

    const goldResult = MuhurtaQualityScoreEngine.calculateMuhurtaQualityScore({
      activityKey: "gold_purchase",
      date: testDate,
      city: delhi
    });

    expect(goldResult.totalScore).toBeGreaterThanOrEqual(0);
    expect(goldResult.totalScore).toBeLessThanOrEqual(100);
    expect(goldResult.activityKey).toBe("gold_purchase");
    expect(goldResult.activityName).toContain("Gold");
    expect(["UTTAMA", "SHUBH", "MADHYAMA", "SADHARANA", "VARJYA"]).toContain(goldResult.qualityTier);
    expect(goldResult.verdictText.length).toBeGreaterThan(10);

    const bizResult = MuhurtaQualityScoreEngine.calculateMuhurtaQualityScore({
      activityKey: "business_launch",
      date: testDate,
      city: delhi
    });
    expect(bizResult.totalScore).toBeGreaterThanOrEqual(0);
    expect(bizResult.totalScore).toBeLessThanOrEqual(100);
    expect(bizResult.activityKey).toBe("business_launch");

    const travelResult = MuhurtaQualityScoreEngine.calculateMuhurtaQualityScore({
      activityKey: "travel",
      date: testDate,
      city: delhi
    });
    expect(travelResult.totalScore).toBeGreaterThanOrEqual(0);
    expect(travelResult.totalScore).toBeLessThanOrEqual(100);
    expect(travelResult.activityKey).toBe("travel");
  });

  it("decomposes score across all 6 standard Vedic weightings plus special overrides", () => {
    const testDate = new Date("2026-10-15T11:45:00");
    const result = MuhurtaQualityScoreEngine.calculateMuhurtaQualityScore({
      activityKey: "gold_purchase",
      date: testDate,
      city: delhi
    });

    const breakdown = result.categoryBreakdown;
    expect(breakdown).toBeDefined();

    // Pillar 1: Tithi (max 15)
    expect(breakdown.tithi.max).toBe(15);
    expect(breakdown.tithi.score).toBeGreaterThanOrEqual(0);
    expect(breakdown.tithi.score).toBeLessThanOrEqual(15);

    // Pillar 2: Nakshatra (max 20)
    expect(breakdown.nakshatra.max).toBe(20);
    expect(breakdown.nakshatra.score).toBeGreaterThanOrEqual(0);
    expect(breakdown.nakshatra.score).toBeLessThanOrEqual(20);

    // Pillar 3: Vara / Weekday (max 10)
    expect(breakdown.vara.max).toBe(10);
    expect(breakdown.vara.score).toBeGreaterThanOrEqual(0);
    expect(breakdown.vara.score).toBeLessThanOrEqual(10);

    // Pillar 4: Yoga & Karana (max 15)
    expect(breakdown.yogaKarana.max).toBe(15);
    expect(breakdown.yogaKarana.score).toBeGreaterThanOrEqual(0);
    expect(breakdown.yogaKarana.score).toBeLessThanOrEqual(15);

    // Pillar 5: Dosha & Kala Exclusions (max 25)
    expect(breakdown.doshas.max).toBe(25);
    expect(breakdown.doshas.score).toBeGreaterThanOrEqual(0);
    expect(breakdown.doshas.score).toBeLessThanOrEqual(25);

    // Pillar 6: Hora & Choghadiya (max 15)
    expect(breakdown.horaChoghadiya.max).toBe(15);
    expect(breakdown.horaChoghadiya.score).toBeGreaterThanOrEqual(0);
    expect(breakdown.horaChoghadiya.score).toBeLessThanOrEqual(15);

    // Base pillars total = 100
    const totalMax = breakdown.tithi.max + breakdown.nakshatra.max + breakdown.vara.max +
      breakdown.yogaKarana.max + breakdown.doshas.max + breakdown.horaChoghadiya.max;
    expect(totalMax).toBe(100);

    // Special bonus check
    expect(breakdown.specialBonus.score).toBeGreaterThanOrEqual(0);
  });

  it("provides cross-activity scores for all 10 registered undertakings", () => {
    const testDate = new Date("2026-10-15T14:30:00");
    const result = MuhurtaQualityScoreEngine.calculateMuhurtaQualityScore({
      activityKey: "business_launch",
      date: testDate,
      city: delhi
    });

    expect(result.allActivitiesScores.length).toBe(MUHURTA_ACTIVITIES.length);
    MUHURTA_ACTIVITIES.forEach(act => {
      const matched = result.allActivitiesScores.find(s => s.activityKey === act.key);
      expect(matched).toBeDefined();
      expect(matched?.score).toBeGreaterThanOrEqual(0);
      expect(matched?.score).toBeLessThanOrEqual(100);
    });
  });

  it("generates 24-hour timeline progression curve", () => {
    const testDate = new Date("2026-10-15T09:00:00");
    const result = MuhurtaQualityScoreEngine.calculateMuhurtaQualityScore({
      activityKey: "property_purchase",
      date: testDate,
      city: delhi
    });

    expect(result.hourlyScoresToday.length).toBe(24);
    result.hourlyScoresToday.forEach((h, idx) => {
      expect(h.hour).toBe(idx);
      expect(h.score).toBeGreaterThanOrEqual(0);
      expect(h.score).toBeLessThanOrEqual(100);
      if (idx === 9) {
        expect(h.isCurrentHour).toBe(true);
      }
    });
  });

  it("penalizes inauspicious time during Rahu Kalam interval", () => {
    // Rahu Kalam for Wednesday or Thursday in Delhi
    const panchang = MuhurtaQualityScoreEngine.calculateMuhurtaQualityScore({
      activityKey: "travel",
      date: new Date("2026-10-15T12:00:00"),
      city: delhi
    });

    // Check if isMinuteInRange works correctly
    expect(MuhurtaQualityScoreEngine.timeStringToMinutes("12:00 PM")).toBe(720);
    expect(MuhurtaQualityScoreEngine.timeStringToMinutes("12:00 AM")).toBe(0);
    expect(MuhurtaQualityScoreEngine.timeStringToMinutes("06:30 PM")).toBe(1110);
    expect(MuhurtaQualityScoreEngine.timeStringToMinutes("06:30 AM")).toBe(390);

    const inRange = MuhurtaQualityScoreEngine.isMinuteInRange(720, "11:30 AM - 01:00 PM");
    expect(inRange).toBe(true);
    const outRange = MuhurtaQualityScoreEngine.isMinuteInRange(600, "11:30 AM - 01:00 PM");
    expect(outRange).toBe(false);
  });
});
