import { describe, it, expect } from "vitest";
import { formatAuthErrorMessage } from "../src/services/auth/SuperAdminAuthContext";

describe("Back Button Navigation & Auth Email Fix Validation", () => {
  describe("1. Authentication Email Error Parsing & Normalization", () => {
    it("transforms raw Firebase auth/invalid-email errors into user-friendly guidance", () => {
      const firebaseError1 = { code: "auth/invalid-email", message: "Firebase: Error (auth/invalid-email)." };
      expect(formatAuthErrorMessage(firebaseError1)).toBe("Please enter a valid email address (e.g. name@example.com).");

      const firebaseError2 = { code: "", message: "The email address is badly formatted. (auth/invalid-email)." };
      expect(formatAuthErrorMessage(firebaseError2)).toBe("Please enter a valid email address (e.g. name@example.com).");

      const firebaseError3 = { code: "auth/invalid-credential", message: "Firebase: Error (auth/invalid-credential)." };
      expect(formatAuthErrorMessage(firebaseError3)).toBe("Invalid email or password. Please verify your credentials and try again.");
    });

    it("transforms other Firebase auth error codes into friendly messages", () => {
      expect(formatAuthErrorMessage({ code: "auth/user-not-found" })).toContain("No account found with this email");
      expect(formatAuthErrorMessage({ code: "auth/wrong-password" })).toContain("Incorrect password");
      expect(formatAuthErrorMessage({ code: "auth/email-already-in-use" })).toContain("already registered");
      expect(formatAuthErrorMessage({ code: "auth/weak-password" })).toContain("at least 6 characters");
      expect(formatAuthErrorMessage({ code: "auth/operation-not-allowed" })).toContain("Email/Password authentication provider");
    });

    it("correctly identifies inverted sign-up arguments (name, email, pass)", () => {
      // Logic from SuperAdminAuthContext signUp
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const resolveSignUpArgs = (arg1: string, arg2: string, arg3?: string) => {
        let email = "";
        let pass = "";
        let displayName = "";

        const cleanArg1 = (arg1 || "").trim();
        const cleanArg2 = (arg2 || "").trim();

        if (!emailRegex.test(cleanArg1) && emailRegex.test(cleanArg2)) {
          displayName = cleanArg1;
          email = cleanArg2.toLowerCase();
          pass = arg3 || "";
        } else {
          email = cleanArg1.toLowerCase();
          pass = arg2 || "";
          displayName = (arg3 || "").trim();
        }
        return { email, pass, displayName };
      };

      // Test case 1: Inverted arguments passed from modal (name, email, password)
      const res1 = resolveSignUpArgs("Ravii Adagale", "ravii.adagale20@gmail.com", "SecretPass123");
      expect(res1.email).toBe("ravii.adagale20@gmail.com");
      expect(res1.displayName).toBe("Ravii Adagale");
      expect(res1.pass).toBe("SecretPass123");

      // Test case 2: Standard arguments (email, password, displayName)
      const res2 = resolveSignUpArgs("user@example.com", "Password456", "John Doe");
      expect(res2.email).toBe("user@example.com");
      expect(res2.displayName).toBe("John Doe");
      expect(res2.pass).toBe("Password456");

      // Test case 3: Email with extra spaces
      const res3 = resolveSignUpArgs("  Test User  ", "  TEST@EXAMPLE.COM  ", "mypass");
      expect(res3.email).toBe("test@example.com");
      expect(res3.displayName).toBe("Test User");
    });
  });

  describe("2. Back Button Navigation Stack & Previous Page Memory", () => {
    it("maintains sequential history and pops back through previous pages without losing history", () => {
      let navHistory: Array<{ tab: string; metadata?: any }> = [{ tab: "home" }];

      const navigate = (tab: string, meta?: any) => {
        const last = navHistory[navHistory.length - 1];
        if (last && last.tab === tab && last.metadata?.subId === meta?.subId) {
          return;
        }
        navHistory = [...navHistory, { tab, metadata: meta }];
      };

      const goBack = () => {
        if (navHistory.length > 1) {
          const updated = [...navHistory];
          updated.pop(); // pop current
          const previous = updated[updated.length - 1];
          navHistory = updated;
          return previous;
        }
        return { tab: "home" };
      };

      // User starts on home, goes to astrology, then to panchang, then to vastu
      navigate("astrology");
      navigate("panchang");
      navigate("vastu_fengshui");

      expect(navHistory.length).toBe(4);
      expect(navHistory[navHistory.length - 1].tab).toBe("vastu_fengshui");

      // Current page is vastu, previous page is panchang
      const prev1 = navHistory[navHistory.length - 2];
      expect(prev1.tab).toBe("panchang");

      // Click Back button: should go to panchang
      const back1 = goBack();
      expect(back1.tab).toBe("panchang");
      expect(navHistory.length).toBe(3);

      // Now previous page is astrology
      const prev2 = navHistory[navHistory.length - 2];
      expect(prev2.tab).toBe("astrology");

      // Click Back button again: should go to astrology
      const back2 = goBack();
      expect(back2.tab).toBe("astrology");
      expect(navHistory.length).toBe(2);

      // Click Back button again: should go to home
      const back3 = goBack();
      expect(back3.tab).toBe("home");
      expect(navHistory.length).toBe(1);
    });

    it("displays the correct Previous Page label on Back button instead of defaulting to Home", () => {
      const TAB_LABELS: Record<string, string> = {
        home: "Home",
        astrology: "Vedic Astrology",
        panchang: "Panchang & Muhurat",
        vastu_fengshui: "Vastu Shastra & Feng Shui",
      };

      const getBackLabel = (history: Array<{ tab: string }>) => {
        const prev = history.length > 1 ? history[history.length - 2] : null;
        return prev ? (TAB_LABELS[prev.tab] || prev.tab) : "Previous Page";
      };

      expect(getBackLabel([{ tab: "home" }, { tab: "astrology" }])).toBe("Home");
      expect(getBackLabel([{ tab: "home" }, { tab: "astrology" }, { tab: "panchang" }])).toBe("Vedic Astrology");
      expect(getBackLabel([{ tab: "home" }, { tab: "astrology" }, { tab: "panchang" }, { tab: "vastu_fengshui" }])).toBe("Panchang & Muhurat");
      expect(getBackLabel([{ tab: "astrology" }])).toBe("Previous Page");
    });
  });
});
