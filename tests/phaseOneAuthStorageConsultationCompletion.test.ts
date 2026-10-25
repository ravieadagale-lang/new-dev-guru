import { describe, it, expect } from "vitest";
import {
  resolveRoleFromEmail,
  isSuperAdminEmail,
  isAdminEmail,
  hasPractitionerCapability,
  SUPER_ADMIN_EMAIL,
  ADMIN_EMAIL,
} from "../src/services/auth/superAdminConfig";
import { formatAuthErrorMessage } from "../src/services/auth/SuperAdminAuthContext";
import { firebaseStorage, firestoreDb, firebaseApp } from "../src/services/firebase/firebaseClient";
import { validateProfilePhotoFile } from "../src/domain/consultation/validation";
import rawConfig from "../firebase-applet-config.json";

describe("Phase 1 Completion — Auth, Roles, Storage, and Config Verification", () => {
  describe("1. Role Resolution & Canonical Security Allowlist", () => {
    it("strictly maps ravieadagale@gmail.com to SUPER_ADMIN with practitioner capability", () => {
      expect(resolveRoleFromEmail("ravieadagale@gmail.com")).toBe("SUPER_ADMIN");
      expect(resolveRoleFromEmail("  RAVIEADAGALE@GMAIL.COM  ")).toBe("SUPER_ADMIN");
      expect(isSuperAdminEmail("ravieadagale@gmail.com")).toBe(true);
      expect(isAdminEmail("ravieadagale@gmail.com")).toBe(false);
      expect(hasPractitionerCapability("ravieadagale@gmail.com", "SUPER_ADMIN")).toBe(true);
    });

    it("strictly maps ravii.adagale20@gmail.com to ADMIN without practitioner capability", () => {
      expect(resolveRoleFromEmail("ravii.adagale20@gmail.com")).toBe("ADMIN");
      expect(resolveRoleFromEmail("RAVII.ADAGALE20@GMAIL.COM")).toBe("ADMIN");
      expect(isAdminEmail("ravii.adagale20@gmail.com")).toBe(true);
      expect(isSuperAdminEmail("ravii.adagale20@gmail.com")).toBe(false);
      expect(hasPractitionerCapability("ravii.adagale20@gmail.com", "ADMIN")).toBe(false);
    });

    it("strictly defaults all other emails and malicious inputs to CUSTOMER", () => {
      expect(resolveRoleFromEmail("attacker@evil.com")).toBe("CUSTOMER");
      expect(resolveRoleFromEmail("admin@dev-guru.com")).toBe("CUSTOMER");
      expect(resolveRoleFromEmail("")).toBe("CUSTOMER");
      expect(resolveRoleFromEmail(null)).toBe("CUSTOMER");
      expect(resolveRoleFromEmail(undefined)).toBe("CUSTOMER");
      expect(isSuperAdminEmail("attacker@evil.com")).toBe(false);
      expect(isAdminEmail("attacker@evil.com")).toBe(false);
      expect(hasPractitionerCapability("attacker@evil.com", "CUSTOMER")).toBe(false);
    });
  });

  describe("2. Authentication Truthfulness & Error Formatting", () => {
    it("truthfully formats auth/operation-not-allowed without claiming fallback activated", () => {
      const msg = formatAuthErrorMessage({ code: "auth/operation-not-allowed", message: "operation-not-allowed" });
      expect(msg).toContain("Email/Password authentication provider is disabled");
      expect(msg).not.toContain("Session fallback activated");
    });

    it("truthfully formats invalid credentials and weak passwords", () => {
      expect(formatAuthErrorMessage({ code: "auth/invalid-credential" })).toContain("Invalid email or password");
      expect(formatAuthErrorMessage({ code: "auth/weak-password" })).toContain("Password must be at least 6 characters");
      expect(formatAuthErrorMessage({ code: "auth/user-not-found" })).toContain("No account found with this email");
      expect(formatAuthErrorMessage({ code: "auth/email-already-in-use" })).toContain("already registered");
    });
  });

  describe("3. Firebase Storage SDK & Profile Photo Upload Validation", () => {
    it("exports initialized firebaseStorage instance matching configured bucket", () => {
      expect(firebaseStorage).toBeDefined();
      expect(firebaseStorage.app.name).toBe(firebaseApp.name);
    });

    it("validates profile photo file types strictly to JPEG, PNG, and WebP", () => {
      const validJpg = validateProfilePhotoFile({ name: "photo.jpg", sizeBytes: 1024 * 1024, type: "image/jpeg" });
      expect(validJpg.isValid).toBe(true);

      const validPng = validateProfilePhotoFile({ name: "photo.png", sizeBytes: 2 * 1024 * 1024, type: "image/png" });
      expect(validPng.isValid).toBe(true);

      const validWebp = validateProfilePhotoFile({ name: "photo.webp", sizeBytes: 500 * 1024, type: "image/webp" });
      expect(validWebp.isValid).toBe(true);

      const invalidPdf = validateProfilePhotoFile({ name: "doc.pdf", sizeBytes: 1024, type: "application/pdf" });
      expect(invalidPdf.isValid).toBe(false);
      expect(invalidPdf.errors.some((e) => e.includes("JPG, JPEG, PNG, and WEBP"))).toBe(true);

      const invalidExe = validateProfilePhotoFile({ name: "malware.exe", sizeBytes: 1024, type: "application/x-msdownload" });
      expect(invalidExe.isValid).toBe(false);
    });

    it("strictly enforces maximum 5MB file size limit for profile photos", () => {
      const oversized = validateProfilePhotoFile({
        name: "huge.jpg",
        sizeBytes: 6 * 1024 * 1024, // 6MB
        type: "image/jpeg",
      });
      expect(oversized.isValid).toBe(false);
      expect(oversized.errors.some((e) => e.includes("5 MB"))).toBe(true);

      const boundaryOk = validateProfilePhotoFile({
        name: "exact5mb.jpg",
        sizeBytes: 5 * 1024 * 1024, // 5MB exact
        type: "image/jpeg",
      });
      expect(boundaryOk.isValid).toBe(true);
    });
  });

  describe("4. Target Cloud Configuration Safety Gate", () => {
    it("confirms active Firebase configuration matches provisioned project and database", () => {
      expect(rawConfig.projectId).toBe("dev-guru-41d29");
      expect(rawConfig.appId).toBe("1:1040485924291:web:4ce2388d2d2c2d88f11176");
      expect(rawConfig.authDomain).toBe("dev-guru-41d29.firebaseapp.com");
      expect(rawConfig.storageBucket).toBe("dev-guru-41d29.firebasestorage.app");
      expect(rawConfig.firestoreDatabaseId).toBe("(default)");
      expect(firestoreDb).toBeDefined();
    });
  });
});
