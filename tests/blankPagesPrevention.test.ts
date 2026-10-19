import { describe, it, expect } from "vitest";
import { TAB_LABELS, KNOWN_TABS } from "../src/App";
import { normalizeVedicSection, VedicSection } from "../src/components/astrology/VedicWorkspaceView";

describe("Blank Pages Prevention & Navigation Resilience Test Suite", () => {
  describe("1. Tab Normalization & Known Tab Registry", () => {
    it("ensures all essential tab keys have valid user-facing labels", () => {
      const coreKeys = [
        "home",
        "astrology",
        "panchang",
        "festivals_vrat",
        "compatibility",
        "numerology",
        "tarot",
        "chinese_astrology",
        "baby_names",
        "vastu_fengshui",
        "face_reading",
        "palm_reading",
        "dreams",
        "mantras",
        "images",
        "milestones",
        "blog",
        "marketplace",
        "consultation",
        "horoscope",
        "dashboard",
        "crm",
        "admin",
        "about",
        "privacy",
        "terms",
        "refund",
        "faq",
        "contact",
        "referrals",
        "notifications"
      ];

      coreKeys.forEach((key) => {
        expect(TAB_LABELS[key], `Label missing for tab: ${key}`).toBeDefined();
        expect(TAB_LABELS[key].length).toBeGreaterThan(0);
        expect(KNOWN_TABS.has(key), `Tab '${key}' should be in KNOWN_TABS`).toBe(true);
      });
    });

    it("verifies palm reading and hastarekha aliases are in KNOWN_TABS", () => {
      expect(KNOWN_TABS.has("palm_reading")).toBe(true);
      expect(KNOWN_TABS.has("palm")).toBe(true);
      expect(KNOWN_TABS.has("palmistry")).toBe(true);
    });

    it("identifies unknown tabs so the recovery fallback can render", () => {
      expect(KNOWN_TABS.has("non_existent_tab_xyz")).toBe(false);
      expect(KNOWN_TABS.has("random_404_page")).toBe(false);
    });
  });

  describe("2. Vedic Section Normalization & Alias Mapping", () => {
    const validSections: VedicSection[] = [
      "birth_chart",
      "divisional_charts",
      "planetary_analysis",
      "nakshatra",
      "yogas",
      "doshas",
      "dasha",
      "strength",
      "transits",
      "advanced_tools"
    ];

    it("maps divisional chart aliases correctly to 'divisional_charts'", () => {
      expect(normalizeVedicSection("vargas")).toBe("divisional_charts");
      expect(normalizeVedicSection("divisional_charts")).toBe("divisional_charts");
      expect(normalizeVedicSection("varga")).toBe("divisional_charts");
      expect(normalizeVedicSection("divisional")).toBe("divisional_charts");
    });

    it("maps dasha aliases correctly to 'dasha'", () => {
      expect(normalizeVedicSection("dashas")).toBe("dasha");
      expect(normalizeVedicSection("dasha")).toBe("dasha");
      expect(normalizeVedicSection("vimshottari")).toBe("dasha");
    });

    it("maps strength aliases correctly to 'strength'", () => {
      expect(normalizeVedicSection("shadbala")).toBe("strength");
      expect(normalizeVedicSection("ashtakavarga")).toBe("strength");
      expect(normalizeVedicSection("strength")).toBe("strength");
    });

    it("maps advanced tools aliases correctly to 'advanced_tools'", () => {
      expect(normalizeVedicSection("remedies")).toBe("advanced_tools");
      expect(normalizeVedicSection("reports")).toBe("advanced_tools");
      expect(normalizeVedicSection("ayanamsha")).toBe("advanced_tools");
      expect(normalizeVedicSection("tools")).toBe("advanced_tools");
      expect(normalizeVedicSection("gemstones")).toBe("advanced_tools");
      expect(normalizeVedicSection("advanced_tools")).toBe("advanced_tools");
    });

    it("maps yogas and doshas correctly", () => {
      expect(normalizeVedicSection("yogas")).toBe("yogas");
      expect(normalizeVedicSection("yoga")).toBe("yogas");
      expect(normalizeVedicSection("doshas")).toBe("doshas");
      expect(normalizeVedicSection("dosha")).toBe("doshas");
    });

    it("maps transits and nakshatra correctly", () => {
      expect(normalizeVedicSection("transits")).toBe("transits");
      expect(normalizeVedicSection("transit")).toBe("transits");
      expect(normalizeVedicSection("gochara")).toBe("transits");
      expect(normalizeVedicSection("nakshatra")).toBe("nakshatra");
      expect(normalizeVedicSection("nakshatras")).toBe("nakshatra");
    });

    it("maps birth chart and kundli aliases correctly", () => {
      expect(normalizeVedicSection("birth_chart")).toBe("birth_chart");
      expect(normalizeVedicSection("kundli")).toBe("birth_chart");
      expect(normalizeVedicSection("chart")).toBe("birth_chart");
      expect(normalizeVedicSection("rashi")).toBe("birth_chart");
    });

    it("falls back to 'birth_chart' on null, undefined, or empty string", () => {
      expect(normalizeVedicSection(undefined)).toBe("birth_chart");
      expect(normalizeVedicSection("")).toBe("birth_chart");
      expect(normalizeVedicSection("unknown_custom_section_123")).toBe("birth_chart");
    });

    it("guarantees every normalized output is strictly one of the 10 valid VedicSection values", () => {
      const testInputs = [
        "vargas", "dashas", "shadbala", "ashtakavarga", "remedies", "reports",
        "yogas", "doshas", "transits", "nakshatra", "kundli", "invalid_section_test",
        undefined, ""
      ];

      testInputs.forEach((input) => {
        const result = normalizeVedicSection(input);
        expect(validSections.includes(result)).toBe(true);
      });
    });
  });

  describe("3. Navigation Target Resolver Verification", () => {
    // Replicate the exact resolution logic in navigateToTabInternal
    const resolveNavigationTab = (tabId: string) => {
      let resolvedTab = tabId;
      if (tabId === "festivals") {
        resolvedTab = "festivals_vrat";
      } else if (tabId === "vrat_guide" || tabId === "vrats") {
        resolvedTab = "festivals_vrat";
      } else if (tabId === "festivals_vrat") {
        resolvedTab = "festivals_vrat";
      } else if (tabId === "onboarding") {
        return "onboarding_modal";
      } else if (["overview", "root"].includes(tabId)) {
        resolvedTab = "home";
      } else if (["calendar", "best_time", "my_day", "muhurta", "muhurats", "choghadiya", "tithi"].includes(tabId)) {
        resolvedTab = "panchang";
      } else if (["remedies", "gemstones", "yantras"].includes(tabId)) {
        resolvedTab = "astrology";
      } else if (["birth_chart", "kundli", "vargas", "shadbala", "ashtakavarga", "tajika", "dashas", "dasha", "reports", "yogas", "doshas", "transits", "btr", "divisional_charts", "bnn", "lalkitab", "lal_kitab", "jaimini", "prashna", "kp", "kp_system", "nakshatra", "planetary_analysis"].includes(tabId)) {
        resolvedTab = "astrology";
      } else if (["palm", "palm_reading", "palmistry", "hastarekha"].includes(tabId)) {
        resolvedTab = "palm_reading";
      } else if (["matchmaking", "milan", "guna_milan"].includes(tabId)) {
        resolvedTab = "compatibility";
      } else if (["crm", "practitioner_workspace", "client_profiles", "astrologer_crm"].includes(tabId)) {
        resolvedTab = "crm";
      } else if (["admin", "admin_control_center", "rule_debugger", "super_admin"].includes(tabId)) {
        resolvedTab = "admin";
      } else if (["daily_horoscope", "horoscope", "rashifal"].includes(tabId)) {
        resolvedTab = "horoscope";
      } else if (["vastu", "fengshui", "vastu_shastra"].includes(tabId)) {
        resolvedTab = "vastu_fengshui";
      } else if (["baby_name", "baby", "janmakshar"].includes(tabId)) {
        resolvedTab = "baby_names";
      } else if (["face", "face_reading", "samudrika"].includes(tabId)) {
        resolvedTab = "face_reading";
      } else if (["dream", "dreams", "swapna"].includes(tabId)) {
        resolvedTab = "dreams";
      } else if (["gallery", "images", "sacred_gallery"].includes(tabId)) {
        resolvedTab = "images";
      } else if (["mantra", "mantras", "chants", "sound"].includes(tabId)) {
        resolvedTab = "mantras";
      } else if (["shop", "store", "marketplace", "products"].includes(tabId)) {
        resolvedTab = "marketplace";
      } else if (["consult", "consultation", "booking", "astrologers"].includes(tabId)) {
        resolvedTab = "consultation";
      } else if (["profile", "account", "dashboard"].includes(tabId)) {
        resolvedTab = "dashboard";
      }
      return resolvedTab;
    };

    it("maps all secondary and sidebar navigation targets to valid rendered tabs", () => {
      const aliasTests: Record<string, string> = {
        "overview": "home",
        "calendar": "panchang",
        "best_time": "panchang",
        "my_day": "panchang",
        "remedies": "astrology",
        "vargas": "astrology",
        "dashas": "astrology",
        "shadbala": "astrology",
        "kp_system": "astrology",
        "jaimini": "astrology",
        "tajika": "astrology",
        "prashna": "astrology",
        "btr": "astrology",
        "practitioner_workspace": "crm",
        "client_profiles": "crm",
        "admin_control_center": "admin",
        "rule_debugger": "admin",
        "palm": "palm_reading",
        "palmistry": "palm_reading",
        "matchmaking": "compatibility",
        "festivals": "festivals_vrat",
        "vrat_guide": "festivals_vrat",
        "daily_horoscope": "horoscope",
      };

      Object.entries(aliasTests).forEach(([source, expectedTarget]) => {
        const resolved = resolveNavigationTab(source);
        expect(resolved, `Failed resolving alias '${source}'`).toBe(expectedTarget);
        expect(KNOWN_TABS.has(resolved), `Resolved target '${resolved}' must exist in KNOWN_TABS`).toBe(true);
      });
    });
  });

  describe("5. Consultation Workspace & Service Safety", () => {
    it("guarantees every service has valid positive durationMinutes and pricing", async () => {
      const { CANONICAL_CONSULTATION_SERVICES } = await import("../src/domain/consultation/defaultServices");
      expect(CANONICAL_CONSULTATION_SERVICES.length).toBeGreaterThan(0);

      CANONICAL_CONSULTATION_SERVICES.forEach((srv) => {
        expect(srv.durationMinutes).toBeGreaterThanOrEqual(15);
        expect(srv.bufferMinutes).toBeGreaterThanOrEqual(0);
        expect(srv.price.amountMinor).toBeGreaterThan(0);
        expect(srv.name.trim().length).toBeGreaterThan(0);
      });
    });

    it("verifies all astrologer defaultServiceIds map to existing canonical services", async () => {
      const { VERIFIED_ASTROLOGERS } = await import("../src/domain/consultation/astrologersData");
      const { CANONICAL_CONSULTATION_SERVICES } = await import("../src/domain/consultation/defaultServices");
      const validServiceIds = new Set(CANONICAL_CONSULTATION_SERVICES.map((s) => s.id));

      VERIFIED_ASTROLOGERS.forEach((astrologer) => {
        if (astrologer.defaultServiceId) {
          expect(
            validServiceIds.has(astrologer.defaultServiceId),
            `Astrologer ${astrologer.name} references invalid serviceId: ${astrologer.defaultServiceId}`
          ).toBe(true);
        }
      });
    });

    it("safely falls back when unknown or undefined serviceId is passed to client workspace resolver", async () => {
      const { CANONICAL_CONSULTATION_SERVICES } = await import("../src/domain/consultation/defaultServices");

      const resolveService = (initialServiceId?: string) => {
        if (initialServiceId) {
          const match = CANONICAL_CONSULTATION_SERVICES.find((s) => s.id === initialServiceId);
          if (match) return match;
        }
        return CANONICAL_CONSULTATION_SERVICES[0];
      };

      // Undefined or missing
      const fallbackNoArg = resolveService();
      expect(fallbackNoArg).toBeDefined();
      expect(fallbackNoArg.durationMinutes).toBeGreaterThanOrEqual(15);

      // Unknown ID (e.g. legacy service_kundli_milan)
      const fallbackLegacyId = resolveService("service_kundli_milan");
      expect(fallbackLegacyId).toBeDefined();
      expect(fallbackLegacyId.durationMinutes).toBeGreaterThanOrEqual(15);
      expect(fallbackLegacyId.id).toBe(CANONICAL_CONSULTATION_SERVICES[0].id);

      // Valid known ID
      const validKnown = resolveService("srv-kp-career-finance");
      expect(validKnown.id).toBe("srv-kp-career-finance");
      expect(validKnown.durationMinutes).toBe(30);
    });
  });
});

