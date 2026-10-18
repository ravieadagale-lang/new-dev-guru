import { describe, it, expect } from "vitest";
import {
  VERIFIED_ASTROLOGERS,
  filterAstrologers,
  AstrologerFilterCriteria,
  ASTROLOGER_EXPERTISE_CATEGORIES,
} from "../src/domain/consultation/astrologersData";

describe("ConsultationView Astrologer Filter System", () => {
  it("loads canonical verified astrologers with valid fees, status, and expertise", () => {
    expect(VERIFIED_ASTROLOGERS.length).toBeGreaterThanOrEqual(6);
    
    // Check Chief Astrologer Ravie Adagale exists
    const chief = VERIFIED_ASTROLOGERS.find((a) => a.isChiefConsultant);
    expect(chief).toBeDefined();
    expect(chief?.name).toBe("Ravie Adagale");
    expect(chief?.isOnline).toBe(true);
    expect(chief?.status).toBe("ONLINE");
    expect(chief?.baseFee).toBe(2500);
    expect(chief?.discountedFee).toBe(2000); // 20% off
    expect(chief?.category).toBe("LOVE_RELATIONSHIP");

    // Check all astrologers have required fields
    for (const a of VERIFIED_ASTROLOGERS) {
      expect(a.id).toBeTruthy();
      expect(a.name).toBeTruthy();
      expect(a.title).toBeTruthy();
      expect(typeof a.isOnline).toBe("boolean");
      expect(["ONLINE", "OFFLINE"]).toContain(a.status);
      expect(a.experienceYears).toBeGreaterThan(0);
      expect(a.rating).toBeGreaterThanOrEqual(4.0);
      expect(a.rating).toBeLessThanOrEqual(5.0);
      expect(a.baseFee).toBeGreaterThan(0);
      expect(a.discountedFee).toBeLessThan(a.baseFee);
      expect(a.skills.length).toBeGreaterThan(0);
      expect(a.languages.length).toBeGreaterThan(0);
    }
  });

  describe("1. Online / Offline Status Filtering", () => {
    it("returns all astrologers when status is ALL or unspecified", () => {
      const allResult = filterAstrologers(VERIFIED_ASTROLOGERS, { status: "ALL" });
      expect(allResult.length).toBe(VERIFIED_ASTROLOGERS.length);

      const defaultResult = filterAstrologers(VERIFIED_ASTROLOGERS, {});
      expect(defaultResult.length).toBe(VERIFIED_ASTROLOGERS.length);
    });

    it("filters astrologers strictly by ONLINE status", () => {
      const onlineResult = filterAstrologers(VERIFIED_ASTROLOGERS, { status: "ONLINE" });
      expect(onlineResult.length).toBeGreaterThan(0);
      expect(onlineResult.every((a) => a.isOnline === true)).toBe(true);
      expect(onlineResult.every((a) => a.status === "ONLINE")).toBe(true);

      // Verify Ravie Adagale is included in online
      expect(onlineResult.some((a) => a.name === "Ravie Adagale")).toBe(true);
    });

    it("filters astrologers strictly by OFFLINE status", () => {
      const offlineResult = filterAstrologers(VERIFIED_ASTROLOGERS, { status: "OFFLINE" });
      expect(offlineResult.length).toBeGreaterThan(0);
      expect(offlineResult.every((a) => a.isOnline === false)).toBe(true);
      expect(offlineResult.every((a) => a.status === "OFFLINE")).toBe(true);

      // Verify Pandit Raghavendra Sharma and Acharya Devrat Bhatt are in offline
      expect(offlineResult.some((a) => a.name === "Pandit Raghavendra Sharma")).toBe(true);
      expect(offlineResult.some((a) => a.name === "Acharya Devrat Bhatt")).toBe(true);
    });
  });

  describe("2. Expertise Category Filtering", () => {
    it("filters astrologers by LOVE_RELATIONSHIP category", () => {
      const result = filterAstrologers(VERIFIED_ASTROLOGERS, { category: "LOVE_RELATIONSHIP" });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((a) => a.category === "LOVE_RELATIONSHIP" || a.allCategories.includes("LOVE_RELATIONSHIP"))).toBe(true);
      expect(result.some((a) => a.name === "Ravie Adagale")).toBe(true);
    });

    it("filters astrologers by CAREER_FINANCE category", () => {
      const result = filterAstrologers(VERIFIED_ASTROLOGERS, { category: "CAREER_FINANCE" });
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((a) => a.name === "Dr. Anand Shastri")).toBe(true);
    });

    it("filters astrologers by VASTU_SHASTRA category", () => {
      const result = filterAstrologers(VERIFIED_ASTROLOGERS, { category: "VASTU_SHASTRA" });
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((a) => a.name === "Pandit Raghavendra Sharma")).toBe(true);
    });

    it("filters astrologers by NUMEROLOGY_TAROT category", () => {
      const result = filterAstrologers(VERIFIED_ASTROLOGERS, { category: "NUMEROLOGY_TAROT" });
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((a) => a.name === "Vidushi Sunita Devi")).toBe(true);
    });

    it("returns all when category is ALL", () => {
      const result = filterAstrologers(VERIFIED_ASTROLOGERS, { category: "ALL" });
      expect(result.length).toBe(VERIFIED_ASTROLOGERS.length);
    });
  });

  describe("3. Minimum & Maximum Consultation Fee Filtering", () => {
    it("filters astrologers with minimum fee threshold (minFee)", () => {
      const minFee = 2500;
      const result = filterAstrologers(VERIFIED_ASTROLOGERS, { minFee });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((a) => a.baseFee >= minFee)).toBe(true);
      expect(result.some((a) => a.name === "Ravie Adagale")).toBe(true); // 2500
      expect(result.some((a) => a.name === "Pandit Raghavendra Sharma")).toBe(true); // 3100
      expect(result.some((a) => a.name === "Acharya Devrat Bhatt")).toBe(false); // 1200
    });

    it("filters astrologers with maximum fee threshold (maxFee)", () => {
      const maxFee = 1500;
      const result = filterAstrologers(VERIFIED_ASTROLOGERS, { maxFee });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((a) => a.baseFee <= maxFee)).toBe(true);
      expect(result.some((a) => a.name === "Acharya Devrat Bhatt")).toBe(true); // 1200
      expect(result.some((a) => a.name === "Vidushi Sunita Devi")).toBe(true); // 1500
      expect(result.some((a) => a.name === "Ravie Adagale")).toBe(false); // 2500
    });

    it("filters astrologers within an inclusive fee range (minFee and maxFee)", () => {
      const minFee = 1500;
      const maxFee = 2500;
      const result = filterAstrologers(VERIFIED_ASTROLOGERS, { minFee, maxFee });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((a) => a.baseFee >= minFee && a.baseFee <= maxFee)).toBe(true);
      
      // 1200 should be excluded, 3100 should be excluded
      expect(result.some((a) => a.baseFee < 1500)).toBe(false);
      expect(result.some((a) => a.baseFee > 2500)).toBe(false);
    });

    it("returns empty array when fee range has no matches", () => {
      const result = filterAstrologers(VERIFIED_ASTROLOGERS, { minFee: 10000 });
      expect(result).toHaveLength(0);
    });
  });

  describe("4. Combined Multi-Criteria Filtering", () => {
    it("filters simultaneously by Online status, Category, and Fee bounds", () => {
      const criteria: AstrologerFilterCriteria = {
        status: "ONLINE",
        category: "CAREER_FINANCE",
        minFee: 1500,
        maxFee: 2500,
      };

      const result = filterAstrologers(VERIFIED_ASTROLOGERS, criteria);
      expect(result.length).toBeGreaterThan(0);
      for (const a of result) {
        expect(a.isOnline).toBe(true);
        expect(a.allCategories.includes("CAREER_FINANCE") || a.category === "CAREER_FINANCE").toBe(true);
        expect(a.baseFee).toBeGreaterThanOrEqual(1500);
        expect(a.baseFee).toBeLessThanOrEqual(2500);
      }
      expect(result.some((a) => a.name === "Dr. Anand Shastri")).toBe(true);
    });

    it("correctly excludes offline practitioners even if category and fee match", () => {
      // Pandit Raghavendra Sharma is Vastu Shastra, fee 3100, but OFFLINE
      const criteriaOnline: AstrologerFilterCriteria = {
        status: "ONLINE",
        category: "VASTU_SHASTRA",
        minFee: 3000,
      };
      const resultOnline = filterAstrologers(VERIFIED_ASTROLOGERS, criteriaOnline);
      expect(resultOnline.some((a) => a.name === "Pandit Raghavendra Sharma")).toBe(false);

      const criteriaOffline: AstrologerFilterCriteria = {
        status: "OFFLINE",
        category: "VASTU_SHASTRA",
        minFee: 3000,
      };
      const resultOffline = filterAstrologers(VERIFIED_ASTROLOGERS, criteriaOffline);
      expect(resultOffline.some((a) => a.name === "Pandit Raghavendra Sharma")).toBe(true);
    });
  });

  describe("5. Keyword Search & Sorting", () => {
    it("searches by language", () => {
      const result = filterAstrologers(VERIFIED_ASTROLOGERS, { searchQuery: "Marathi" });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((a) => a.languages.includes("Marathi"))).toBe(true);
    });

    it("searches by skill keyword", () => {
      const result = filterAstrologers(VERIFIED_ASTROLOGERS, { searchQuery: "Chaldean" });
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((a) => a.name === "Vidushi Sunita Devi")).toBe(true);
    });

    it("sorts by fee ascending (FEE_ASC)", () => {
      const result = filterAstrologers(VERIFIED_ASTROLOGERS, { sortBy: "FEE_ASC" });
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i].baseFee).toBeLessThanOrEqual(result[i + 1].baseFee);
      }
    });

    it("sorts by fee descending (FEE_DESC)", () => {
      const result = filterAstrologers(VERIFIED_ASTROLOGERS, { sortBy: "FEE_DESC" });
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i].baseFee).toBeGreaterThanOrEqual(result[i + 1].baseFee);
      }
    });

    it("sorts by rating descending (RATING_DESC)", () => {
      const result = filterAstrologers(VERIFIED_ASTROLOGERS, { sortBy: "RATING_DESC" });
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i].rating).toBeGreaterThanOrEqual(result[i + 1].rating);
      }
    });

    it("sorts by experience years descending (EXPERIENCE_DESC)", () => {
      const result = filterAstrologers(VERIFIED_ASTROLOGERS, { sortBy: "EXPERIENCE_DESC" });
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i].experienceYears).toBeGreaterThanOrEqual(result[i + 1].experienceYears);
      }
    });
  });
});
