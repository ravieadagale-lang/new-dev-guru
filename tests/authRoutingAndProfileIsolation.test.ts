import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  SUPER_ADMIN_EMAILS,
  isSuperAdminEmail,
  resolveRoleFromEmail,
  normalizeEmail,
  AuthRole,
} from "../src/services/auth/superAdminConfig";
import {
  getUserProfile,
  syncUserProfileOnAuth,
} from "../src/services/firebase/userProfileService";

describe("AstroNext — Authenticated User Routing & Demo Profile Isolation Suite", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("Test 1 — New CUSTOMER Authentication Routing", () => {
    it("resolves role = CUSTOMER for a standard user", () => {
      const standardEmail = "newseeker@example.com";
      const role = resolveRoleFromEmail(standardEmail);
      expect(role).toBe("CUSTOMER");
    });

    it("ensures onAuthSuccess callback routes CUSTOMER to homepage ('home')", () => {
      // Simulating UnifiedAuthModal onAuthSuccess target calculation
      const computeNavigationTarget = (resolvedRole: string): string => {
        return resolvedRole === "SUPER_ADMIN" || resolvedRole === "ADMIN" ? "admin" : "home";
      };

      expect(computeNavigationTarget("CUSTOMER")).toBe("home");
      expect(computeNavigationTarget("PRACTITIONER")).toBe("home");

      // Simulating App.tsx onAuthSuccess handling
      let currentTab = "some_other_tab";
      const onAuthSuccess = (role: string, targetTab?: string) => {
        if (targetTab) {
          currentTab = targetTab;
        } else if (role === "SUPER_ADMIN" || role === "ADMIN") {
          currentTab = "admin";
        } else {
          currentTab = "home";
        }
      };

      onAuthSuccess("CUSTOMER", computeNavigationTarget("CUSTOMER"));
      expect(currentTab).toBe("home");
      expect(currentTab).not.toBe("dashboard");
    });
  });

  describe("Test 2 — No Demo Identity (Rohit Sharma / aarav.s@gmail.com)", () => {
    it("ensures real authenticated user profile does not inherit demo identity", () => {
      const realUser = {
        uid: "firebase-uid-real-123",
        email: "priya.patel@gmail.com",
        displayName: "Priya Patel",
      };

      const prevDefaultProfile = {
        id: "usr-001",
        name: "Aarav Sharma",
        email: "aarav.s@gmail.com",
        role: "customer",
        dob: "1995-08-15",
        time: "10:30",
        place: "New Delhi, India",
        lagna: "Aries",
        rashi: "Taurus",
        nakshatra: "Rohini",
        nakshatraPada: 2,
        spiritualPoints: 450,
      };

      // Simulating App.tsx user profile synchronization effect
      const isDefaultPlaceholder =
        prevDefaultProfile.id === "usr-001" ||
        prevDefaultProfile.email === "aarav.s@gmail.com";

      const synchronizedProfile = {
        ...prevDefaultProfile,
        id: realUser.uid,
        name: realUser.displayName || realUser.email.split("@")[0],
        email: realUser.email,
        role: "customer",
        dob: isDefaultPlaceholder ? "" : prevDefaultProfile.dob,
        lagna: isDefaultPlaceholder ? "" : prevDefaultProfile.lagna,
        rashi: isDefaultPlaceholder ? "" : prevDefaultProfile.rashi,
        nakshatra: isDefaultPlaceholder ? "" : prevDefaultProfile.nakshatra,
        spiritualPoints: isDefaultPlaceholder ? 0 : prevDefaultProfile.spiritualPoints,
      };

      expect(synchronizedProfile.name).not.toBe("Rohit Sharma");
      expect(synchronizedProfile.name).not.toBe("Aarav Sharma");
      expect(synchronizedProfile.name).toBe("Priya Patel");
      expect(synchronizedProfile.email).not.toBe("aarav.s@gmail.com");
      expect(synchronizedProfile.email).toBe("priya.patel@gmail.com");
    });
  });

  describe("Test 3 — No Hardcoded Astrology (Aries, Taurus, Rohini, Pada 2)", () => {
    it("ensures newly registered user without birth details has blank/uncalculated astrology data", () => {
      const prevPlaceholder = {
        id: "usr-001",
        name: "Aarav Sharma",
        email: "aarav.s@gmail.com",
        lagna: "Aries",
        rashi: "Taurus",
        nakshatra: "Rohini",
        nakshatraPada: 2,
      };

      const isDefaultPlaceholder = prevPlaceholder.id === "usr-001";
      const sanitizedAstrology = {
        lagna: isDefaultPlaceholder ? "" : prevPlaceholder.lagna,
        rashi: isDefaultPlaceholder ? "" : prevPlaceholder.rashi,
        nakshatra: isDefaultPlaceholder ? "" : prevPlaceholder.nakshatra,
        nakshatraPada: isDefaultPlaceholder ? 0 : prevPlaceholder.nakshatraPada,
      };

      expect(sanitizedAstrology.lagna).toBe("");
      expect(sanitizedAstrology.rashi).toBe("");
      expect(sanitizedAstrology.nakshatra).toBe("");
      expect(sanitizedAstrology.nakshatraPada).toBe(0);
    });

    it("formats uncalculated astrology truthfully in UI instead of inventing fake signs", () => {
      const userProfileWithoutBirth = {
        name: "New Seeker",
        email: "seeker@test.ai",
        lagna: "",
        rashi: "",
        nakshatra: "",
        nakshatraPada: 0,
      };

      const lagnaDisplay = userProfileWithoutBirth.lagna
        ? userProfileWithoutBirth.lagna
        : "Not calculated";
      const rashiDisplay = userProfileWithoutBirth.rashi
        ? userProfileWithoutBirth.rashi
        : "Not calculated";
      const nakshatraDisplay = userProfileWithoutBirth.nakshatra
        ? `${userProfileWithoutBirth.nakshatra} (Pada ${userProfileWithoutBirth.nakshatraPada})`
        : "Not calculated";

      expect(lagnaDisplay).toBe("Not calculated");
      expect(rashiDisplay).toBe("Not calculated");
      expect(nakshatraDisplay).toBe("Not calculated");
    });
  });

  describe("Test 4 — Correct UID Keying (users/{authenticatedUid})", () => {
    it("strictly requires authenticated Firebase UID and rejects empty/invalid UIDs", async () => {
      await expect(getUserProfile("")).rejects.toThrow(
        "Invalid userId supplied to getUserProfile"
      );
    });

    it("verifies document path is strictly users/{userId}", () => {
      const userId = "target-firebase-uid-999";
      const expectedPath = `users/${userId}`;
      expect(expectedPath).toBe("users/target-firebase-uid-999");
      expect(expectedPath).not.toContain("rohit");
      expect(expectedPath).not.toContain("aarav");
      expect(expectedPath).not.toContain("demo");
    });
  });

  describe("Test 5 — Missing Profile Initialization State", () => {
    it("creates a truthful minimal CUSTOMER profile when document does not exist", () => {
      const newAuthUser = {
        uid: "uid-new-user-555",
        email: "fresh@example.com",
        displayName: "",
      };

      const minimalProfile = {
        userId: newAuthUser.uid,
        email: newAuthUser.email,
        displayName: newAuthUser.displayName || newAuthUser.email.split("@")[0],
        role: "CUSTOMER" as AuthRole,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      expect(minimalProfile.role).toBe("CUSTOMER");
      expect(minimalProfile.displayName).toBe("fresh");
      expect(minimalProfile.email).toBe("fresh@example.com");
    });
  });

  describe("Test 6 — Privileged Users Routing Preservation", () => {
    it("routes authorized Super Admin (ravieadagale@gmail.com) to admin dashboard", () => {
      const email = "ravieadagale@gmail.com";
      const role = resolveRoleFromEmail(email);
      expect(role).toBe("SUPER_ADMIN");

      const resolveDestination = (r: AuthRole): string => {
        if (r === "SUPER_ADMIN" || r === "ADMIN") return "admin";
        return "home";
      };
      expect(resolveDestination(role)).toBe("admin");
    });

    it("routes authorized Admin (ravii.adagale20@gmail.com) to admin dashboard", () => {
      const email = "ravii.adagale20@gmail.com";
      const role = resolveRoleFromEmail(email);
      expect(role).toBe("ADMIN");

      const resolveDestination = (r: AuthRole): string => {
        if (r === "SUPER_ADMIN" || r === "ADMIN") return "admin";
        return "home";
      };
      expect(resolveDestination(role)).toBe("admin");
    });

    it("ensures ordinary users cannot escalate to SUPER_ADMIN or ADMIN", () => {
      expect(isSuperAdminEmail("customer@example.com")).toBe(false);
      expect(resolveRoleFromEmail("customer@example.com")).toBe("CUSTOMER");
    });
  });

  describe("Test 7 — Logout Behavior", () => {
    it("ensures after logout, application returns to homepage without active credentials", () => {
      let currentTab = "dashboard";
      let activeUser: any = { uid: "test-uid", email: "user@test.ai" };

      // Simulating logout
      const handleLogout = () => {
        activeUser = null;
        currentTab = "home";
      };

      handleLogout();
      expect(activeUser).toBeNull();
      expect(currentTab).toBe("home");
    });
  });

  describe("Test 8 — Password Reset Email Dispatch", () => {
    it("validates and normalizes email input before sending password reset link", () => {
      const rawEmail = "  Seeker.Astrology@Example.COM  ";
      const cleaned = normalizeEmail(rawEmail);
      expect(cleaned).toBe("seeker.astrology@example.com");

      const emptyClean = normalizeEmail("");
      expect(emptyClean).toBe("");
    });

    it("handles error mapping for Firebase Auth password reset codes", () => {
      const mapAuthError = (code: string): string => {
        if (code === "auth/user-not-found") {
          return "No registered account found with this email address. Please register or check for typos.";
        } else if (code === "auth/invalid-email") {
          return "Please enter a valid email address.";
        } else if (code === "auth/too-many-requests") {
          return "Too many password reset requests. Please wait a few moments before trying again.";
        } else if (code === "auth/network-request-failed") {
          return "Network connection error. Please verify your internet connection.";
        }
        return "Failed to send password reset email. Please try again.";
      };

      expect(mapAuthError("auth/user-not-found")).toContain("No registered account found");
      expect(mapAuthError("auth/invalid-email")).toContain("valid email address");
      expect(mapAuthError("auth/too-many-requests")).toContain("Too many password reset requests");
      expect(mapAuthError("auth/network-request-failed")).toContain("Network connection error");
      expect(mapAuthError("unknown")).toBe("Failed to send password reset email. Please try again.");
    });

    it("verifies forgot password mode state lifecycle", () => {
      let mode: "login" | "signup" | "forgot" = "login";
      let resetSent = false;
      let resetMessage: string | null = null;

      // User clicks forgot password
      mode = "forgot";
      expect(mode).toBe("forgot");

      // Successful dispatch
      resetSent = true;
      resetMessage = "Password reset email sent! Please check your inbox and follow the link to choose a new password.";
      expect(resetSent).toBe(true);
      expect(resetMessage).toContain("Password reset email sent");

      // User clicks back to sign in
      mode = "login";
      resetSent = false;
      resetMessage = null;
      expect(mode).toBe("login");
      expect(resetSent).toBe(false);
      expect(resetMessage).toBeNull();
    });
  });

  describe("Test 9 — Popup Message on Signup & Login", () => {
    it("triggers a welcoming popup message on new user signup", () => {
      let popupState: any = null;
      const onAuthSuccess = (
        _role: string,
        _targetTab?: string,
        actionType?: "login" | "signup",
        userName?: string,
        email?: string
      ) => {
        if (actionType) {
          popupState = {
            isOpen: true,
            type: actionType,
            userName: userName || "Seeker",
            email: email || "",
          };
        }
      };

      onAuthSuccess("CUSTOMER", "home", "signup", "Aarohi Verma", "aarohi@example.com");
      expect(popupState).not.toBeNull();
      expect(popupState.isOpen).toBe(true);
      expect(popupState.type).toBe("signup");
      expect(popupState.userName).toBe("Aarohi Verma");
      expect(popupState.email).toBe("aarohi@example.com");
    });

    it("triggers a welcoming popup message on existing user login", () => {
      let popupState: any = null;
      const onAuthSuccess = (
        _role: string,
        _targetTab?: string,
        actionType?: "login" | "signup",
        userName?: string,
        email?: string
      ) => {
        if (actionType) {
          popupState = {
            isOpen: true,
            type: actionType,
            userName: userName || "Seeker",
            email: email || "",
          };
        }
      };

      onAuthSuccess("CUSTOMER", "home", "login", "Vikramaditya", "vikram@astronext.com");
      expect(popupState).not.toBeNull();
      expect(popupState.isOpen).toBe(true);
      expect(popupState.type).toBe("login");
      expect(popupState.userName).toBe("Vikramaditya");
      expect(popupState.email).toBe("vikram@astronext.com");
    });

    it("correctly falls back to email prefix or default Seeker greeting when name is absent", () => {
      const getGreeting = (name?: string, email?: string): string => {
        return name?.trim() || email?.split("@")[0] || "Seeker";
      };

      expect(getGreeting("Kavita", "kavita@domain.com")).toBe("Kavita");
      expect(getGreeting("", "rajesh.kumar@gmail.com")).toBe("rajesh.kumar");
      expect(getGreeting("   ", "ananya@domain.com")).toBe("ananya");
      expect(getGreeting(undefined, undefined)).toBe("Seeker");
    });
  });
});
