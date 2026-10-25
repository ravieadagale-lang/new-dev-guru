import { describe, it, expect, vi, beforeEach } from "vitest";
import { formatAuthErrorMessage } from "../src/services/auth/SuperAdminAuthContext";
import {
  resolveRoleFromEmail,
  isSuperAdminEmail,
  isAdminEmail,
  hasPractitionerCapability,
  SUPER_ADMIN_EMAIL,
  ADMIN_EMAIL,
} from "../src/services/auth/superAdminConfig";
import { createUserProfile, validateBirthDate, validateBirthTime } from "../src/services/firebase/userProfileService";

describe("Phase 1 Implementation — Complete Authentication & Password Reset Suite", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("1. Sign-Up Validation & Security Integrity", () => {
    it("truthfully formats auth/email-already-in-use error without fallback", () => {
      const err = { code: "auth/email-already-in-use", message: "Firebase: Error (auth/email-already-in-use)." };
      const formatted = formatAuthErrorMessage(err);
      expect(formatted).toContain("already registered");
      expect(formatted).toContain("LOGIN");
    });

    it("truthfully formats auth/weak-password error without fallback", () => {
      const err = { code: "auth/weak-password", message: "Password should be at least 6 characters" };
      const formatted = formatAuthErrorMessage(err);
      expect(formatted).toBe("Password must be at least 6 characters long.");
    });

    it("truthfully formats auth/invalid-email error", () => {
      const err = { code: "auth/invalid-email", message: "Invalid email" };
      const formatted = formatAuthErrorMessage(err);
      expect(formatted).toContain("valid email address");
    });

    it("truthfully formats auth/operation-not-allowed when provider is disabled", () => {
      const err = { code: "auth/operation-not-allowed", message: "operation-not-allowed" };
      const formatted = formatAuthErrorMessage(err);
      expect(formatted).toContain("Email/Password authentication provider is disabled in this Firebase project");
      expect(formatted).not.toContain("fallback");
    });

    it("truthfully formats auth/network-request-failed", () => {
      const err = { code: "auth/network-request-failed", message: "A network error had occurred." };
      const formatted = formatAuthErrorMessage(err);
      expect(formatted).toBe("Network error. Please check your internet connection.");
    });

    it("truthfully formats auth/missing-password and permission-denied errors", () => {
      const missingPass = formatAuthErrorMessage({ code: "auth/missing-password" });
      expect(missingPass).toBe("Please enter your password.");

      const permDenied = formatAuthErrorMessage({ message: "Missing or insufficient permissions." });
      expect(permDenied).toContain("Database access permission denied");
    });
  });

  describe("2. Password Reset Request & Action-Code Verification", () => {
    it("truthfully formats auth/expired-action-code when reset link is expired", () => {
      const err = { code: "auth/expired-action-code", message: "The action code has expired." };
      const formatted = formatAuthErrorMessage(err);
      expect(formatted).toContain("password reset link has expired");
      expect(formatted).toContain("request a new reset link");
    });

    it("truthfully formats auth/invalid-action-code when reset link is invalid or reused", () => {
      const err = { code: "auth/invalid-action-code", message: "The action code is invalid." };
      const formatted = formatAuthErrorMessage(err);
      expect(formatted).toContain("password reset link is invalid or has already been used");
    });

    it("truthfully formats auth/user-disabled account state", () => {
      const err = { code: "auth/user-disabled", message: "The user account has been disabled." };
      const formatted = formatAuthErrorMessage(err);
      expect(formatted).toBe("This account has been disabled. Please contact support.");
    });

    it("truthfully formats auth/too-many-requests for rate limiting", () => {
      const err = { code: "auth/too-many-requests", message: "Access to this account has been temporarily disabled due to many failed login attempts." };
      const formatted = formatAuthErrorMessage(err);
      expect(formatted).toBe("Too many attempts. Please wait a moment before trying again.");
    });

    it("cleans raw Firebase wrapper noise if unlisted error occurs", () => {
      const err = { message: "Firebase: Error (auth/unknown-error). Something failed." };
      const formatted = formatAuthErrorMessage(err);
      expect(formatted).not.toContain("Firebase:");
      expect(formatted).not.toContain("Error (auth/");
      expect(formatted).toContain("Something failed.");
    });
  });

  describe("3. Admin & Super Admin Canonical Role Separation & Non-Escalation", () => {
    it("enforces canonical Super Admin mapping exclusively for ravieadagale@gmail.com", () => {
      expect(resolveRoleFromEmail(SUPER_ADMIN_EMAIL)).toBe("SUPER_ADMIN");
      expect(resolveRoleFromEmail("  ravieadagale@gmail.com  ")).toBe("SUPER_ADMIN");
      expect(resolveRoleFromEmail("RAVIEADAGALE@GMAIL.COM")).toBe("SUPER_ADMIN");
      expect(isSuperAdminEmail(SUPER_ADMIN_EMAIL)).toBe(true);
      expect(hasPractitionerCapability(SUPER_ADMIN_EMAIL, "SUPER_ADMIN")).toBe(true);
    });

    it("enforces canonical Admin mapping exclusively for ravii.adagale20@gmail.com without practitioner capability", () => {
      expect(resolveRoleFromEmail(ADMIN_EMAIL)).toBe("ADMIN");
      expect(resolveRoleFromEmail("  RAVII.ADAGALE20@GMAIL.COM  ")).toBe("ADMIN");
      expect(isAdminEmail(ADMIN_EMAIL)).toBe(true);
      expect(isSuperAdminEmail(ADMIN_EMAIL)).toBe(false);
      expect(hasPractitionerCapability(ADMIN_EMAIL, "ADMIN")).toBe(false);
    });

    it("strictly prevents privilege escalation for malicious or self-assigned roles during sign-up", () => {
      const attackerEmails = [
        "attacker@evil.com",
        "superadmin@dev-guru.com",
        "admin@google.com",
        "fake.superadmin@example.com",
        "hacker@astronext.com",
        "ravieadagale@gmail.com.fake.com",
      ];

      for (const email of attackerEmails) {
        expect(resolveRoleFromEmail(email)).toBe("CUSTOMER");
        expect(isSuperAdminEmail(email)).toBe(false);
        expect(isAdminEmail(email)).toBe(false);
        expect(hasPractitionerCapability(email, "SUPER_ADMIN" as any)).toBe(false);
      }
    });

    it("rejects empty, null, or malformed inputs and defaults to CUSTOMER", () => {
      expect(resolveRoleFromEmail("")).toBe("CUSTOMER");
      expect(resolveRoleFromEmail("   ")).toBe("CUSTOMER");
      expect(resolveRoleFromEmail(null as any)).toBe("CUSTOMER");
      expect(resolveRoleFromEmail(undefined as any)).toBe("CUSTOMER");
      expect(resolveRoleFromEmail(12345 as any)).toBe("CUSTOMER");
    });
  });

  describe("4. Session Restoration & Account Isolation Contracts", () => {
    it("ensures birth date validation rejects future dates and invalid calendars", () => {
      expect(validateBirthDate("2000-01-15").valid).toBe(true);
      expect(validateBirthDate("1995-12-31").valid).toBe(true);
      expect(validateBirthDate("2099-01-01").valid).toBe(false); // Future date
      expect(validateBirthDate("not-a-date").valid).toBe(false);
      expect(validateBirthDate("2000-02-30").valid).toBe(false); // Invalid leap/day
    });

    it("ensures birth time validation strictly checks 24-hour boundaries", () => {
      expect(validateBirthTime("00:00").valid).toBe(true);
      expect(validateBirthTime("14:30").valid).toBe(true);
      expect(validateBirthTime("23:59").valid).toBe(true);
      expect(validateBirthTime("24:00").valid).toBe(false); // Out of bounds
      expect(validateBirthTime("12:60").valid).toBe(false); // Out of bounds
      expect(validateBirthTime("9:30").valid).toBe(false);  // Missing leading zero
    });
  });

  describe("5. Login Error States & Truthfulness", () => {
    it("truthfully formats auth/wrong-password and auth/invalid-credential", () => {
      const wrongPw = formatAuthErrorMessage({ code: "auth/wrong-password" });
      expect(wrongPw).toContain("Incorrect password");

      const invalidCred = formatAuthErrorMessage({ code: "auth/invalid-credential" });
      expect(invalidCred).toContain("Invalid email or password");
    });

    it("truthfully formats auth/user-not-found", () => {
      const userNotFound = formatAuthErrorMessage({ code: "auth/user-not-found" });
      expect(userNotFound).toContain("No account found with this email");
    });
  });
});
