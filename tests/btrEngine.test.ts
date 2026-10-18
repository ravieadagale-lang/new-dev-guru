import { describe, it, expect } from "vitest";
import { BirthTimeRectificationEngine, BtrSearchConfig } from "../src/engine/btr/btrEngine";
import { BtrLifeEvent } from "../src/engine/btr/btrTypes";

describe("Birth Time Rectification (BTR) Engine Regression Suite", () => {
  const genuineBaseProfile = {
    dob: "1988-06-20",
    recordedTime: "14:30",
    latitude: 19.0760,
    longitude: 72.8777,
    timezoneOffsetHours: 5.5,
    place: "Mumbai, India",
    personName: "Rohan Varma"
  };

  const sampleEvents: BtrLifeEvent[] = [
    {
      id: "ev-1",
      category: "CAREER_FINANCE",
      eventTypeId: "FIRST_SIGNIFICANT_JOB",
      title: "First Job Offer",
      datePrecision: "exact_date",
      dateConfidence: "documented",
      exactDate: "2010-08-15"
    },
    {
      id: "ev-2",
      category: "RELATIONSHIPS_MARRIAGE",
      eventTypeId: "MARRIAGE_DATE",
      title: "Marriage Ceremony",
      datePrecision: "exact_date",
      dateConfidence: "documented",
      exactDate: "2015-12-05"
    }
  ];

  // 1. Zero Events Handling
  describe("Zero Events (Insufficient Evidence)", () => {
    it("returns INSUFFICIENT_EVIDENCE status and low evidence when no events are provided", () => {
      const result = BirthTimeRectificationEngine.rectifyBirthTime({
        ...genuineBaseProfile,
        reliability: "rounded_15m",
        searchRange: "pm_15m",
        events: []
      });

      expect(result.status).toBe("INSUFFICIENT_EVIDENCE");
      expect(result.evidenceStatus).toBe("Low");
      expect(result.insufficientEvidenceReason).toContain("requires at least 1–2 dated life milestones");
      expect(result.candidateComparison.length).toBeGreaterThan(0);
    });
  });

  // 2. Candidate Generation Across Search Ranges
  describe("Candidate Generation Ranges & Boundaries", () => {
    it("generates exact candidate bounds for ±5m window (1-min step)", () => {
      const res = BirthTimeRectificationEngine.rectifyBirthTime({
        ...genuineBaseProfile,
        reliability: "precise_birth_certificate",
        searchRange: "pm_5m",
        events: sampleEvents
      });
      expect(res.investigatedWindowStart).toBe("14:25");
      expect(res.investigatedWindowEnd).toBe("14:35");
      expect(res.stepIntervalMinutes).toBe(1);
      expect(res.totalCandidatesEvaluated).toBe(11);
    });

    it("generates exact candidate bounds for ±15m window (1-min step)", () => {
      const res = BirthTimeRectificationEngine.rectifyBirthTime({
        ...genuineBaseProfile,
        reliability: "rounded_15m",
        searchRange: "pm_15m",
        events: sampleEvents
      });
      expect(res.investigatedWindowStart).toBe("14:15");
      expect(res.investigatedWindowEnd).toBe("14:45");
      expect(res.stepIntervalMinutes).toBe(1);
      expect(res.totalCandidatesEvaluated).toBe(31);
    });

    it("generates exact candidate bounds for ±30m window (1-min step)", () => {
      const res = BirthTimeRectificationEngine.rectifyBirthTime({
        ...genuineBaseProfile,
        reliability: "rounded_30m",
        searchRange: "pm_30m",
        events: sampleEvents
      });
      expect(res.investigatedWindowStart).toBe("14:00");
      expect(res.investigatedWindowEnd).toBe("15:00");
      expect(res.stepIntervalMinutes).toBe(1);
      expect(res.totalCandidatesEvaluated).toBe(61);
    });

    it("generates candidates for ±1h and ±3h windows without boundary spills", () => {
      const res1h = BirthTimeRectificationEngine.rectifyBirthTime({
        ...genuineBaseProfile,
        reliability: "approximate",
        searchRange: "pm_1h",
        events: sampleEvents
      });
      expect(res1h.investigatedWindowStart).toBe("13:30");
      expect(res1h.investigatedWindowEnd).toBe("15:30");
      expect(res1h.stepIntervalMinutes).toBe(2);

      const res3h = BirthTimeRectificationEngine.rectifyBirthTime({
        ...genuineBaseProfile,
        reliability: "family_memory",
        searchRange: "pm_3h",
        events: sampleEvents
      });
      expect(res3h.investigatedWindowStart).toBe("11:30");
      expect(res3h.investigatedWindowEnd).toBe("17:30");
      expect(res3h.stepIntervalMinutes).toBe(4);
    });

    it("evaluates custom range matching exact user bounds", () => {
      const resCustom = BirthTimeRectificationEngine.rectifyBirthTime({
        ...genuineBaseProfile,
        reliability: "told_by_parents",
        searchRange: "custom_range",
        customRangeStart: "10:00",
        customRangeEnd: "11:00",
        events: sampleEvents
      });
      expect(resCustom.investigatedWindowStart).toBe("10:00");
      expect(resCustom.investigatedWindowEnd).toBe("11:00");
    });
  });

  // 3. Bit-for-Bit Determinism
  describe("Bit-for-Bit Determinism", () => {
    it("produces identical results across multiple runs with same input", () => {
      const run1 = BirthTimeRectificationEngine.rectifyBirthTime({
        ...genuineBaseProfile,
        reliability: "rounded_15m",
        searchRange: "pm_15m",
        events: sampleEvents
      });

      const run2 = BirthTimeRectificationEngine.rectifyBirthTime({
        ...genuineBaseProfile,
        reliability: "rounded_15m",
        searchRange: "pm_15m",
        events: sampleEvents
      });

      expect(run1.strongestCandidate.timeStr).toBe(run2.strongestCandidate.timeStr);
      expect(run1.strongestCandidate.totalScore).toBe(run2.strongestCandidate.totalScore);
      expect(run1.strongestCandidate.shastricEvidenceScore).toBe(run2.strongestCandidate.shastricEvidenceScore);
      expect(run1.strongestCandidate.ascendantDegree).toBe(run2.strongestCandidate.ascendantDegree);
      expect(run1.strongestCandidate.ascendantSubLord).toBe(run2.strongestCandidate.ascendantSubLord);
    });
  });

  // 4. Placidus Cusps & KP Sub-Lord Generation
  describe("Placidus House Cusps & KP Sub-Lords", () => {
    it("generates exactly 12 finite Placidus cusps and KP sub-lords for every candidate", () => {
      const res = BirthTimeRectificationEngine.rectifyBirthTime({
        ...genuineBaseProfile,
        reliability: "rounded_15m",
        searchRange: "pm_15m",
        events: sampleEvents
      });

      const top = res.strongestCandidate;
      expect(top.ascendantSubLord).toBeDefined();
      expect(Object.keys(top.cuspSubLords).length).toBe(12);
      expect(Object.keys(top.placidusCusps || {}).length).toBe(12);

      for (let h = 1; h <= 12; h++) {
        const cusp = top.placidusCusps?.[h];
        expect(cusp).toBeDefined();
        expect(cusp?.houseNumber).toBe(h);
        expect(Number.isFinite(cusp?.siderealLongitude)).toBe(true);
        expect(cusp!.siderealLongitude).toBeGreaterThanOrEqual(0);
        expect(cusp!.siderealLongitude).toBeLessThan(360);
        expect(typeof cusp?.subLord).toBe("string");
        expect(cusp!.subLord.length).toBeGreaterThan(0);
      }
    });

    it("verifies that candidate time change alters candidate cusp longitudes", () => {
      const res = BirthTimeRectificationEngine.rectifyBirthTime({
        ...genuineBaseProfile,
        reliability: "rounded_15m",
        searchRange: "pm_15m",
        events: sampleEvents
      });

      const candA = res.candidateComparison[0];
      const candB = res.candidateComparison[res.candidateComparison.length - 1];
      expect(candA.ascendantDegree).not.toBe(candB.ascendantDegree);
    });
  });

  // 5. Scoring Separation & Layer A vs Layer B
  describe("Scoring Separation & Non-Overpowering Prior", () => {
    it("guarantees shastricEvidenceScore = parashari + kp + jaimini strictly", () => {
      const res = BirthTimeRectificationEngine.rectifyBirthTime({
        ...genuineBaseProfile,
        reliability: "rounded_15m",
        searchRange: "pm_15m",
        events: sampleEvents
      });

      res.candidateComparison.forEach((cand) => {
        const expectedShastric = cand.parashariScore + cand.kpScore + cand.jaiminiScore;
        expect(Math.abs(cand.shastricEvidenceScore - expectedShastric)).toBeLessThan(0.001);
      });
    });

    it("ensures proximity prior does not overpower Shastric evidence", () => {
      const res = BirthTimeRectificationEngine.rectifyBirthTime({
        ...genuineBaseProfile,
        reliability: "approximate",
        searchRange: "pm_30m",
        events: sampleEvents
      });

      // The strongest candidate must be determined by Shastric evidence first
      const strongest = res.strongestCandidate;
      const otherCands = res.candidateComparison.filter((c) => c.timeStr !== strongest.timeStr);
      otherCands.forEach((other) => {
        const shastricDiff = strongest.shastricEvidenceScore - other.shastricEvidenceScore;
        // If strongest has notably higher shastric score, it ranks above even if other has 0 offset
        if (shastricDiff > 0.2) {
          expect(strongest.candidateComparisonScore).toBeGreaterThanOrEqual(other.candidateComparisonScore);
        }
      });
    });
  });

  // 6. D9 / D10 Diagnostic Neutrality
  describe("D9 / D10 Diagnostic Neutrality", () => {
    it("computes D9 and D10 lagna sign for each candidate as unscored diagnostic data", () => {
      const res = BirthTimeRectificationEngine.rectifyBirthTime({
        ...genuineBaseProfile,
        reliability: "rounded_15m",
        searchRange: "pm_15m",
        events: sampleEvents
      });

      res.candidateComparison.forEach((cand) => {
        expect(typeof cand.d9LagnaSign).toBe("string");
        expect(cand.d9LagnaSign.length).toBeGreaterThan(0);
        expect(typeof cand.d10LagnaSign).toBe("string");
        expect(cand.d10LagnaSign.length).toBeGreaterThan(0);
      });
    });
  });

  // 7. Event Date Precision & Confidence Handling
  describe("Event Date Precision & Confidence", () => {
    it("evaluates events with month_year, year_only, and approx_range without fabricating fake day precision", () => {
      const diverseEvents: BtrLifeEvent[] = [
        {
          id: "dev-1",
          category: "CAREER_FINANCE",
          eventTypeId: "FIRST_SIGNIFICANT_JOB",
          title: "Promoted in 2014",
          datePrecision: "year_only",
          dateConfidence: "family_memory",
          approxYear: 2014
        },
        {
          id: "dev-2",
          category: "RELATIONSHIPS_MARRIAGE",
          eventTypeId: "MARRIAGE_DATE",
          title: "Engaged in Nov 2016",
          datePrecision: "month_year",
          dateConfidence: "very_certain",
          approxMonthYear: "2016-11"
        }
      ];

      const res = BirthTimeRectificationEngine.rectifyBirthTime({
        ...genuineBaseProfile,
        reliability: "rounded_15m",
        searchRange: "pm_15m",
        events: diverseEvents
      });

      expect(res.status).toBeDefined();
      expect(res.strongestCandidate.eventMatches.length).toBe(2);
      expect(res.remainingUncertainty).toContain("approximate years");
    });
  });

  // 8. Unknown Birth Time Handling
  describe("Unknown Birth Time Handling", () => {
    it("strictly requires 2 or more life events for a full 24-hour search", () => {
      const singleEvent: BtrLifeEvent[] = [
        {
          id: "sing-1",
          category: "CAREER_FINANCE",
          eventTypeId: "FIRST_SIGNIFICANT_JOB",
          title: "First Job",
          datePrecision: "exact_date",
          dateConfidence: "documented",
          exactDate: "2010-08-15"
        }
      ];

      const resOneEvent = BirthTimeRectificationEngine.rectifyBirthTime({
        ...genuineBaseProfile,
        recordedTime: undefined,
        reliability: "completely_unknown",
        searchRange: "entire_day",
        events: singleEvent
      });

      expect(resOneEvent.status).toBe("INSUFFICIENT_EVIDENCE");
      expect(resOneEvent.insufficientEvidenceReason).toContain("requires at least 2 dated life milestones");
      expect(resOneEvent.recordedTime).toBe("Unknown");
    });

    it("proceeds with full 24-hour search when 2 or more events are present without any hidden fallback time", () => {
      const resFullDay = BirthTimeRectificationEngine.rectifyBirthTime({
        ...genuineBaseProfile,
        recordedTime: undefined,
        reliability: "completely_unknown",
        searchRange: "entire_day",
        events: sampleEvents
      });

      expect(resFullDay.investigatedWindowStart).toBe("00:00");
      expect(resFullDay.investigatedWindowEnd).toBe("23:59");
      expect(resFullDay.recordedTime).toBe("Unknown");
      expect(resFullDay.strongestCandidate.proximityScore).toBe(0);
    });
  });

  // 9. Edge Cases
  describe("Edge Cases (Midnight, Boundaries, Timezone Offsets, Coordinates)", () => {
    it("handles midnight 00:00 as recorded time accurately", () => {
      const resMidnight = BirthTimeRectificationEngine.rectifyBirthTime({
        ...genuineBaseProfile,
        recordedTime: "00:00",
        reliability: "rounded_15m",
        searchRange: "pm_15m",
        events: sampleEvents
      });

      expect(resMidnight.investigatedWindowStart).toBe("00:00");
      expect(resMidnight.investigatedWindowEnd).toBe("00:15");
    });

    it("handles negative and fractional timezones accurately", () => {
      const resNewYork = BirthTimeRectificationEngine.rectifyBirthTime({
        dob: "1992-03-15",
        recordedTime: "11:20",
        latitude: 40.7128,
        longitude: -74.0060,
        timezoneOffsetHours: -5.0,
        place: "New York, USA",
        personName: "John Doe",
        reliability: "rounded_15m",
        searchRange: "pm_15m",
        events: sampleEvents
      });

      expect(resNewYork.strongestCandidate).toBeDefined();
      expect(resNewYork.strongestCandidate.ascendantDegree).toBeGreaterThanOrEqual(0);
    });

    it("rejects non-finite coordinates with descriptive errors", () => {
      expect(() => {
        BirthTimeRectificationEngine.rectifyBirthTime({
          ...genuineBaseProfile,
          latitude: NaN,
          events: sampleEvents,
          reliability: "rounded_15m",
          searchRange: "pm_15m"
        });
      }).toThrow(/BTR calculation blocked|geographic coordinates/);

      expect(() => {
        BirthTimeRectificationEngine.rectifyBirthTime({
          ...genuineBaseProfile,
          longitude: Infinity,
          events: sampleEvents,
          reliability: "rounded_15m",
          searchRange: "pm_15m"
        });
      }).toThrow(/BTR calculation blocked|geographic coordinates/);
    });
  });
});
