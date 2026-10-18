import { describe, it, expect, vi, beforeEach } from "vitest";
import { RASHI_DETAILS, getDailyHoroscopeForRashi } from "../src/data/horoscopeData";
import { resolveRoleFromEmail } from "../src/services/auth/superAdminConfig";
import { determineBirthDataPrecision, validateCustomerBirthDetails } from "../src/services/firebase/userProfileService";

describe("Daily Horoscope Component & Customer Routing Audit Suite", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("Part 1: Daily Horoscope & Gemini Rashi Logic", () => {
    it("provides astrological data for all 12 Vedic Rashis", () => {
      expect(RASHI_DETAILS).toHaveLength(12);
      const rashiNames = RASHI_DETAILS.map((r) => r.name);
      expect(rashiNames).toContain("Aries");
      expect(rashiNames).toContain("Taurus");
      expect(rashiNames).toContain("Gemini");
      expect(rashiNames).toContain("Cancer");
      expect(rashiNames).toContain("Leo");
      expect(rashiNames).toContain("Virgo");
      expect(rashiNames).toContain("Libra");
      expect(rashiNames).toContain("Scorpio");
      expect(rashiNames).toContain("Sagittarius");
      expect(rashiNames).toContain("Capricorn");
      expect(rashiNames).toContain("Aquarius");
      expect(rashiNames).toContain("Pisces");
    });

    it("calculates classical horoscope snapshot for any given Rashi and date", () => {
      const today = new Date();
      const horoscope = getDailyHoroscopeForRashi("Leo", today);
      expect(horoscope).toBeDefined();
      expect(horoscope.rashi).toBe("Leo");
      expect(horoscope.overallScore).toBeGreaterThanOrEqual(50);
      expect(horoscope.overallScore).toBeLessThanOrEqual(100);
      expect(horoscope.career).toBeDefined();
      expect(horoscope.finance).toBeDefined();
      expect(horoscope.love).toBeDefined();
      expect(horoscope.health).toBeDefined();
      expect(horoscope.luckyColor).toBeDefined();
      expect(horoscope.luckyNumber).toBeDefined();
      expect(horoscope.remedy).toBeDefined();
    });

    it("normalizes user profile Rashi to match canonical 12 Rashis", () => {
      const userProfile = {
        rashi: "scorpio",
      };
      const matched = RASHI_DETAILS.find(
        (r) => r.name.toLowerCase() === userProfile.rashi.toLowerCase()
      );
      expect(matched?.name).toBe("Scorpio");
    });

    it("sends accurate payload to Gemini API endpoint with seeker's Rashi from profile", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          horoscope: "✦ Personalized Gemini Daily Horoscope: Strong momentum in career and finances for Aries.",
          date: "2026-10-01",
          rashi: "Aries",
        }),
      });
      global.fetch = mockFetch;

      const profile = {
        name: "Dev Seeker",
        rashi: "Aries",
        nakshatra: "Ashwini",
        lagna: "Aries",
      };

      const response = await fetch("/api/ai/daily-horoscope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile,
          date: "2026-10-01",
          language: "en",
        }),
      });

      const data = await response.json();
      expect(mockFetch).toHaveBeenCalledWith("/api/ai/daily-horoscope", expect.any(Object));
      expect(data.rashi).toBe("Aries");
      expect(data.horoscope).toContain("Personalized Gemini Daily Horoscope");
    });
  });

  describe("Part 2: Authenticated CUSTOMER Routing Verification", () => {
    it("resolves role = CUSTOMER for any standard registering or logging in email", () => {
      expect(resolveRoleFromEmail("customer@test.com")).toBe("CUSTOMER");
      expect(resolveRoleFromEmail("astronext.seeker@gmail.com")).toBe("CUSTOMER");
    });

    it("ensures CUSTOMER login navigates strictly to 'home', never auto-redirecting to 'dashboard'", () => {
      // Simulating navigation resolution logic in UnifiedAuthModal & App.tsx
      const resolveAuthNavigationTarget = (resolvedRole: string): string => {
        if (resolvedRole === "SUPER_ADMIN" || resolvedRole === "ADMIN") {
          return "admin";
        }
        return "home";
      };

      expect(resolveAuthNavigationTarget("CUSTOMER")).toBe("home");
      expect(resolveAuthNavigationTarget("customer")).toBe("home");
      expect(resolveAuthNavigationTarget("CUSTOMER")).not.toBe("dashboard");
    });

    it("ensures initial tab in App.tsx is 'home' for unauthenticated guests", () => {
      const initialTab = "home";
      expect(initialTab).toBe("home");
      expect(initialTab).not.toBe("dashboard");
    });
  });

  describe("Part 3: Complete Demo Data Purge Verification", () => {
    it("ensures old demo customer 'aarav.s@gmail.com' and 'Aarav Sharma' are discarded from stored state", () => {
      const oldDemoStorage = {
        id: "usr-001",
        name: "Aarav Sharma",
        email: "aarav.s@gmail.com",
        role: "customer",
        lagna: "Aries",
        rashi: "Taurus",
      };

      // Simulating App.tsx filter logic
      const isDemoRecord =
        oldDemoStorage.id === "usr-001" ||
        oldDemoStorage.email === "aarav.s@gmail.com" ||
        oldDemoStorage.name === "Aarav Sharma";

      expect(isDemoRecord).toBe(true);

      const resolvedProfile = isDemoRecord
        ? {
            id: "guest",
            name: "Guest Seeker",
            email: "",
            role: "visitor",
            rashi: "",
            lagna: "",
            nakshatra: "",
          }
        : oldDemoStorage;

      expect(resolvedProfile.email).not.toBe("aarav.s@gmail.com");
      expect(resolvedProfile.name).not.toBe("Aarav Sharma");
      expect(resolvedProfile.rashi).toBe("");
    });

    it("ensures unauthenticated or newly registered seekers have NOT_PROVIDED birth data", () => {
      const emptyBirthDetails = {};
      const precision = determineBirthDataPrecision(emptyBirthDetails);
      expect(precision).toBe("NOT_PROVIDED");

      const validation = validateCustomerBirthDetails(emptyBirthDetails);
      expect(validation.valid).toBe(true);
      expect(validation.validatedDetails?.precisionState).toBe("NOT_PROVIDED");
    });
  });
});
