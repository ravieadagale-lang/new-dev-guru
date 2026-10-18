import { describe, it, expect } from "vitest";
import {
  ALL_CLASSICAL_YOGAS_1001,
  ALL_CLASSICAL_YOGAS_1001_PLUS,
  ALL_CLASSICAL_YOGAS_300_PLUS,
  CLASSICAL_YOGA_CATEGORIES,
  getClassicalYogaById,
  getClassicalYogasByCategory,
  searchClassicalYogas
} from "../src/data/classicalYogas";
import {
  YogaDetectionMasterEngine,
  ChartEvaluationContext
} from "../src/engine/yogas";

describe("1,001+ Classical Astrological Yogas Master Suite", () => {
  const mockChartContext: ChartEvaluationContext = {
    planets: {
      Sun: { name: "Sun", sign: "Aries", signIndex: 0, house: 1, degreeInSign: 10, dignity: "Exalted (Uchha)", longitude: 10 },
      Moon: { name: "Moon", sign: "Taurus", signIndex: 1, house: 2, degreeInSign: 3, dignity: "Exalted (Uchha)", longitude: 33 },
      Mars: { name: "Mars", sign: "Aries", signIndex: 0, house: 1, degreeInSign: 12, dignity: "Own Sign (Moolatrikona)", longitude: 12 },
      Mercury: { name: "Mercury", sign: "Gemini", signIndex: 2, house: 3, degreeInSign: 20, dignity: "Own Sign (Swa Kshetra)", longitude: 80 },
      Jupiter: { name: "Jupiter", sign: "Cancer", signIndex: 3, house: 4, degreeInSign: 5, dignity: "Exalted (Uchha)", longitude: 95 },
      Venus: { name: "Venus", sign: "Pisces", signIndex: 11, house: 12, degreeInSign: 27, dignity: "Exalted (Uchha)", longitude: 357 },
      Saturn: { name: "Saturn", sign: "Aquarius", signIndex: 10, house: 11, degreeInSign: 14, dignity: "Own Sign (Swa Kshetra)", longitude: 314 },
      Rahu: { name: "Rahu", sign: "Taurus", signIndex: 1, house: 2, degreeInSign: 18, longitude: 48 },
      Ketu: { name: "Ketu", sign: "Scorpio", signIndex: 7, house: 8, degreeInSign: 18, longitude: 228 }
    },
    houses: {
      1: { house: 1, sign: "Aries", signIndex: 0, lord: "Mars" },
      2: { house: 2, sign: "Taurus", signIndex: 1, lord: "Venus" },
      3: { house: 3, sign: "Gemini", signIndex: 2, lord: "Mercury" },
      4: { house: 4, sign: "Cancer", signIndex: 3, lord: "Moon" },
      5: { house: 5, sign: "Leo", signIndex: 4, lord: "Sun" },
      6: { house: 6, sign: "Virgo", signIndex: 5, lord: "Mercury" },
      7: { house: 7, sign: "Libra", signIndex: 6, lord: "Venus" },
      8: { house: 8, sign: "Scorpio", signIndex: 7, lord: "Mars" },
      9: { house: 9, sign: "Sagittarius", signIndex: 8, lord: "Jupiter" },
      10: { house: 10, sign: "Capricorn", signIndex: 9, lord: "Saturn" },
      11: { house: 11, sign: "Aquarius", signIndex: 10, lord: "Saturn" },
      12: { house: 12, sign: "Pisces", signIndex: 11, lord: "Jupiter" }
    },
    houseLords: {
      1: "Mars", 2: "Venus", 3: "Mercury", 4: "Moon",
      5: "Sun", 6: "Mercury", 7: "Venus", 8: "Mars",
      9: "Jupiter", 10: "Saturn", 11: "Saturn", 12: "Jupiter"
    },
    houseOccupants: {
      1: ["Sun", "Mars"],
      2: ["Moon", "Rahu"],
      3: ["Mercury"],
      4: ["Jupiter"],
      8: ["Ketu"],
      11: ["Saturn"],
      12: ["Venus"]
    },
    signOccupants: {
      Aries: ["Sun", "Mars"],
      Taurus: ["Moon", "Rahu"],
      Gemini: ["Mercury"],
      Cancer: ["Jupiter"],
      Scorpio: ["Ketu"],
      Aquarius: ["Saturn"],
      Pisces: ["Venus"]
    },
    ascendantSign: "Aries",
    ascendantSignIndex: 0,
    jaiminiKarakas: { AK: "Sun", AmK: "Jupiter" },
    dashaActiveLords: { mahadasha: "Jupiter", antardasha: "Moon" }
  };

  describe("Dataset Integrity & 1,001 Directory Validation", () => {
    it("guarantees ALL_CLASSICAL_YOGAS_1001 contains exactly 1,001 classical yogas", () => {
      expect(ALL_CLASSICAL_YOGAS_1001.length).toBe(1001);
    });

    it("verifies backwards compatible exports ALL_CLASSICAL_YOGAS_1001_PLUS and ALL_CLASSICAL_YOGAS_300_PLUS", () => {
      expect(ALL_CLASSICAL_YOGAS_1001_PLUS.length).toBeGreaterThanOrEqual(1001);
      expect(ALL_CLASSICAL_YOGAS_300_PLUS.length).toBeGreaterThanOrEqual(1001);
    });

    it("ensures every yoga has valid number, id, name, formula, and source", () => {
      ALL_CLASSICAL_YOGAS_1001.forEach((y, idx) => {
        expect(y.number).toBe(idx + 1);
        expect(typeof y.id).toBe("string");
        expect(y.id.length).toBeGreaterThan(0);
        expect(typeof y.name).toBe("string");
        expect(y.name.length).toBeGreaterThan(0);
        expect(typeof y.sanskritName).toBe("string");
        expect(typeof y.formula).toBe("string");
        expect(y.formula.length).toBeGreaterThan(0);
        expect(typeof y.classicalSource).toBe("string");
        expect(Array.isArray(y.planetaryActors)).toBe(true);
        expect(Array.isArray(y.bhavaInvolved)).toBe(true);
      });
    });

    it("verifies getClassicalYogaById and getClassicalYogasByCategory", () => {
      const ruchaka = getClassicalYogaById("ruchaka_yoga");
      expect(ruchaka).toBeDefined();
      expect(ruchaka?.name).toBe("Ruchaka Yoga");
      expect(ruchaka?.category).toBe("Pancha Mahapurusha");

      const panchaMahapurusha = getClassicalYogasByCategory("Pancha Mahapurusha");
      expect(panchaMahapurusha.length).toBe(5);
    });

    it("verifies searchClassicalYogas finds relevant yogas by name, actor, and source", () => {
      const gajaSearch = searchClassicalYogas("Gaja");
      expect(gajaSearch.length).toBeGreaterThan(0);
      expect(gajaSearch.some((y) => y.name.includes("Gaja"))).toBe(true);

      const bphsSearch = searchClassicalYogas("Brihat Parashara");
      expect(bphsSearch.length).toBeGreaterThan(10);
    });
  });

  describe("Deterministic 1,001+ Yoga Detection Engine", () => {
    it("evaluates all 1,001+ rules and returns totalEvaluated >= 1001", () => {
      const evaluation = YogaDetectionMasterEngine.evaluateAllYogas(mockChartContext);
      expect(evaluation.totalEvaluated).toBeGreaterThanOrEqual(1001);
      expect(evaluation.detectedYogas.length).toBeGreaterThanOrEqual(1001);
    });

    it("detects Ruchaka Yoga for Mars in Kendra (H1) in Aries (Own sign)", () => {
      const evaluation = YogaDetectionMasterEngine.evaluateAllYogas(mockChartContext);
      const ruchaka = evaluation.detectedYogas.find((y) => y.ruleId.includes("RUCHAKA"));
      expect(ruchaka).toBeDefined();
      expect(ruchaka?.isFullyFormed).toBe(true);
      expect(ruchaka?.status).toBe("FORMED");
      expect(ruchaka?.strengthScore).toBeGreaterThanOrEqual(90);
    });

    it("detects Hamsa Yoga for Jupiter in Kendra (H4) in Cancer (Exaltation sign)", () => {
      const evaluation = YogaDetectionMasterEngine.evaluateAllYogas(mockChartContext);
      const hamsa = evaluation.detectedYogas.find((y) => y.ruleId.includes("HAMSA"));
      expect(hamsa).toBeDefined();
      expect(hamsa?.isFullyFormed).toBe(true);
      expect(hamsa?.status).toBe("FORMED");
      expect(hamsa?.strengthScore).toBeGreaterThanOrEqual(90);
    });

    it("detects Dwai-Graha Sun-Mars conjunction in House 1", () => {
      const evaluation = YogaDetectionMasterEngine.evaluateAllYogas(mockChartContext);
      const sunMarsH1 = evaluation.detectedYogas.find(
        (y) => y.ruleId.includes("DWAI") && y.ruleId.includes("SUN") && y.ruleId.includes("MARS") && y.ruleId.includes("H1")
      );
      expect(sunMarsH1).toBeDefined();
      expect(sunMarsH1?.isFullyFormed).toBe(true);
      expect(sunMarsH1?.status).toBe("FORMED");
    });

    it("flags Dasha activation accurately when running lords align with participating actors", () => {
      const evaluation = YogaDetectionMasterEngine.evaluateAllYogas(mockChartContext);
      // Dasha is Jupiter / Moon
      const hamsa = evaluation.detectedYogas.find((y) => y.ruleId.includes("HAMSA"));
      expect(hamsa?.dashaActivation.isCurrentlyActive).toBe(true);
      expect(evaluation.currentlyActiveCount).toBeGreaterThan(0);
    });

    it("executes complete 1,001+ evaluation in under 50 milliseconds", () => {
      const t0 = performance.now();
      const evaluation = YogaDetectionMasterEngine.evaluateAllYogas(mockChartContext);
      const t1 = performance.now();
      expect(t1 - t0).toBeLessThan(50);
      expect(evaluation.detectedYogas.length).toBeGreaterThanOrEqual(1001);
    });
  });

  describe("Verification with Shastric Validation Criteria", () => {
    it("validates that Phase 3 Yoga verification detects Ruchaka, Hamsa, and totalEvaluated >= 1001", () => {
      const evaluatedYogas = YogaDetectionMasterEngine.evaluateAllYogas(mockChartContext);
      const ruchaka = evaluatedYogas.detectedYogas.find((y) => y.ruleId.includes("RUCHAKA"));
      const hamsa = evaluatedYogas.detectedYogas.find((y) => y.ruleId.includes("HAMSA"));
      
      expect(ruchaka).toBeDefined();
      expect(ruchaka?.isFullyFormed).toBe(true);
      expect(hamsa).toBeDefined();
      expect(hamsa?.isFullyFormed).toBe(true);
      expect(evaluatedYogas.totalEvaluated).toBeGreaterThanOrEqual(1001);
    });
  });
});
