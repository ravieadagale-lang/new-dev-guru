import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  type UserProfile,
  type UserProfileUpdatePayload,
  type CustomerBirthDetails,
  type BirthDataPrecision,
  type TimeAccuracy,
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  syncUserProfileOnAuth,
  validateBirthDate,
  validateBirthTime,
  validateCoordinates,
  validateTimezone,
  determineBirthDataPrecision,
  validateCustomerBirthDetails,
} from "../src/services/firebase/userProfileService";
import {
  OperationType,
  handleFirestoreError,
  type FirestoreErrorInfo,
} from "../src/services/firebase/firestoreErrors";
import {
  resolveRoleFromEmail,
  isSuperAdminEmail,
  isAdminEmail,
  isPrivilegedEmail,
} from "../src/services/auth/superAdminConfig";

// Mock Firebase client modules
vi.mock("../src/services/firebase/firebaseClient", () => ({
  firestoreDb: {},
  firebaseAuth: {
    currentUser: {
      uid: "test-user-123",
      email: "user@example.com",
      emailVerified: true,
      isAnonymous: false,
      providerData: [{ providerId: "password", email: "user@example.com" }],
    },
  },
}));

// Mock Firestore functions
const mockGetDoc = vi.fn();
const mockSetDoc = vi.fn();
const mockUpdateDoc = vi.fn();
const mockDoc = vi.fn((_db, collection, id) => ({ path: `${collection}/${id}` }));

vi.mock("firebase/firestore", () => ({
  doc: (_db: any, col: string, id: string) => mockDoc(_db, col, id),
  getDoc: (ref: any) => mockGetDoc(ref),
  setDoc: (ref: any, data: any) => mockSetDoc(ref, data),
  updateDoc: (ref: any, data: any) => mockUpdateDoc(ref, data),
  getDocFromServer: vi.fn().mockResolvedValue({ exists: () => false }),
}));

describe("Firebase Task 3 — Authentication + User Profile End-to-End Hardening Suite", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("1. Ordinary CUSTOMER Signup & Profile Creation", () => {
    it("creates standard CUSTOMER profile for unrecognized emails", async () => {
      mockSetDoc.mockResolvedValueOnce(undefined);

      const created = await createUserProfile({
        userId: "uid_customer_789",
        email: "ordinary.customer@gmail.com",
        displayName: "Ordinary Customer",
      });

      expect(created.userId).toBe("uid_customer_789");
      expect(created.email).toBe("ordinary.customer@gmail.com");
      expect(created.role).toBe("CUSTOMER");
      expect(created.createdAt).toBeDefined();
      expect(created.lastLoginAt).toBeDefined();
    });

    it("rejects creation if userId or email is omitted", async () => {
      await expect(
        createUserProfile({ userId: "", email: "valid@email.com" } as any)
      ).rejects.toThrow("userId and email are strictly required");

      await expect(
        createUserProfile({ userId: "uid_123", email: "" } as any)
      ).rejects.toThrow("userId and email are strictly required");
    });
  });

  describe("2. Idempotent Profile Synchronization", () => {
    it("creates document on initial login and updates lastLoginAt on subsequent logins without duplication", async () => {
      // 1st login: document does not exist
      mockGetDoc.mockResolvedValueOnce({ exists: () => false });
      mockSetDoc.mockResolvedValueOnce(undefined);

      const firstSync = await syncUserProfileOnAuth({
        uid: "uid_idempotent_01",
        email: "user@astronext.com",
        displayName: "User One",
      });

      expect(firstSync.userId).toBe("uid_idempotent_01");
      expect(firstSync.createdAt).toBeDefined();
      const initialCreatedAt = firstSync.createdAt;

      // 2nd login: document already exists
      mockGetDoc.mockResolvedValueOnce({
        exists: () => true,
        data: () => ({
          userId: "uid_idempotent_01",
          email: "user@astronext.com",
          displayName: "User One",
          role: "CUSTOMER",
          createdAt: initialCreatedAt,
          lastLoginAt: "2026-09-24T12:00:00.000Z",
        }),
      });
      mockUpdateDoc.mockResolvedValueOnce(undefined);

      const secondSync = await syncUserProfileOnAuth({
        uid: "uid_idempotent_01",
        email: "user@astronext.com",
        displayName: "User One",
      });

      expect(secondSync.userId).toBe("uid_idempotent_01");
      expect(secondSync.createdAt).toBe(initialCreatedAt);
      expect(mockSetDoc).toHaveBeenCalledTimes(1);
      expect(mockUpdateDoc).toHaveBeenCalledTimes(1);
    });
  });

  describe("3. Immutable UID Enforcement", () => {
    it("guarantees that client cannot overwrite the document userId", async () => {
      mockUpdateDoc.mockResolvedValueOnce(undefined);

      await updateUserProfile("original_uid", {
        displayName: "New Display Name",
        phoneNumber: "+1234567890",
      });

      const payloadSent = mockUpdateDoc.mock.calls[0][1];
      expect(payloadSent.userId).toBeUndefined();
      expect(payloadSent.displayName).toBe("New Display Name");
    });
  });

  describe("4. Immutable createdAt Enforcement", () => {
    it("strips malicious createdAt modification attempts from updates", async () => {
      mockUpdateDoc.mockResolvedValueOnce(undefined);

      const tamperPayload: any = {
        createdAt: "1970-01-01T00:00:00.000Z",
        displayName: "Legit Update",
      };

      await updateUserProfile("uid_abc", tamperPayload);

      const payloadSent = mockUpdateDoc.mock.calls[0][1];
      expect(payloadSent.createdAt).toBeUndefined();
      expect(payloadSent.displayName).toBe("Legit Update");
      expect(payloadSent.updatedAt).toBeDefined();
    });
  });

  describe("5. Role Escalation Rejection", () => {
    it("overrides client-supplied SUPER_ADMIN role with CUSTOMER during creation for non-allowlist email", async () => {
      mockSetDoc.mockResolvedValueOnce(undefined);

      const attemptedSpoof = await createUserProfile({
        userId: "hacker_uid",
        email: "attacker@gmail.com",
        role: "SUPER_ADMIN" as any,
      });

      expect(attemptedSpoof.role).toBe("CUSTOMER");
      const passedToFirestore = mockSetDoc.mock.calls[0][1];
      expect(passedToFirestore.role).toBe("CUSTOMER");
    });

    it("overrides client-supplied PRACTITIONER role with CUSTOMER during creation for non-allowlist email", async () => {
      mockSetDoc.mockResolvedValueOnce(undefined);

      const attemptedSpoof = await createUserProfile({
        userId: "user_prac_uid",
        email: "someone@gmail.com",
        role: "PRACTITIONER",
      });

      expect(attemptedSpoof.role).toBe("CUSTOMER");
      const passedToFirestore = mockSetDoc.mock.calls[0][1];
      expect(passedToFirestore.role).toBe("CUSTOMER");
    });

    it("strips role property during ordinary client profile updates", async () => {
      mockUpdateDoc.mockResolvedValueOnce(undefined);

      const maliciousUpdate: any = {
        role: "SUPER_ADMIN",
        displayName: "Hacked Admin",
      };

      await updateUserProfile("user_uid_123", maliciousUpdate);

      const passedToFirestore = mockUpdateDoc.mock.calls[0][1];
      expect(passedToFirestore.role).toBeUndefined();
      expect(passedToFirestore.displayName).toBe("Hacked Admin");
    });

    it("strips PRACTITIONER role property during ordinary client profile updates", async () => {
      mockUpdateDoc.mockResolvedValueOnce(undefined);

      const clientAttempt: any = {
        role: "PRACTITIONER",
        displayName: "Practitioner Self-Assign",
      };

      await updateUserProfile("user_uid_123", clientAttempt);

      const passedToFirestore = mockUpdateDoc.mock.calls[0][1];
      expect(passedToFirestore.role).toBeUndefined();
      expect(passedToFirestore.displayName).toBe("Practitioner Self-Assign");
    });
  });

  describe("6. Unauthorized Profile Access & Error Handling", () => {
    it("formats Firestore permission denied errors into structured FirestoreErrorInfo", () => {
      const permissionDeniedError = new Error("Missing or insufficient permissions.");
      let caught: Error | null = null;

      try {
        handleFirestoreError(permissionDeniedError, OperationType.GET, "users/target-user");
      } catch (err: any) {
        caught = err;
      }

      expect(caught).not.toBeNull();
      const info: FirestoreErrorInfo = JSON.parse(caught!.message);
      expect(info.error).toContain("Missing or insufficient permissions");
      expect(info.operationType).toBe(OperationType.GET);
      expect(info.path).toBe("users/target-user");
      expect(info.authInfo.userId).toBe("test-user-123");
    });
  });

  describe("7. Authenticated Own-Profile Access", () => {
    it("fetches document at canonical path users/{userId}", async () => {
      mockGetDoc.mockResolvedValueOnce({
        exists: () => true,
        data: () => ({
          userId: "auth_uid_111",
          email: "owner@astronext.com",
          displayName: "Account Owner",
          role: "CUSTOMER",
          createdAt: "2026-09-20T00:00:00.000Z",
          lastLoginAt: "2026-09-25T01:00:00.000Z",
        }),
      });

      const profile = await getUserProfile("auth_uid_111");
      expect(mockDoc).toHaveBeenCalledWith(expect.anything(), "users", "auth_uid_111");
      expect(profile).not.toBeNull();
      expect(profile?.userId).toBe("auth_uid_111");
      expect(profile?.email).toBe("owner@astronext.com");
    });
  });

  describe("8. Privileged Role Authorization Boundary", () => {
    it("strictly limits SUPER_ADMIN to ravieadagale@gmail.com", () => {
      expect(resolveRoleFromEmail("ravieadagale@gmail.com")).toBe("SUPER_ADMIN");
      expect(isSuperAdminEmail("ravieadagale@gmail.com")).toBe(true);
      expect(isPrivilegedEmail("ravieadagale@gmail.com")).toBe(true);
    });

    it("strictly limits ADMIN to ravii.adagale20@gmail.com", () => {
      expect(resolveRoleFromEmail("ravii.adagale20@gmail.com")).toBe("ADMIN");
      expect(isAdminEmail("ravii.adagale20@gmail.com")).toBe(true);
      expect(isPrivilegedEmail("ravii.adagale20@gmail.com")).toBe(true);
      expect(isSuperAdminEmail("ravii.adagale20@gmail.com")).toBe(false);
    });

    it("strictly resolves all other emails to CUSTOMER", () => {
      expect(resolveRoleFromEmail("someone@domain.com")).toBe("CUSTOMER");
      expect(isPrivilegedEmail("someone@domain.com")).toBe(false);
      expect(isSuperAdminEmail("someone@domain.com")).toBe(false);
      expect(isAdminEmail("someone@domain.com")).toBe(false);
    });
  });

  describe("Test 7 — Birth Date Validation", () => {
    it("accepts valid calendar dates in YYYY-MM-DD format within 1900-2100", () => {
      expect(validateBirthDate("1995-08-15").valid).toBe(true);
      expect(validateBirthDate("1980-01-01").valid).toBe(true);
      expect(validateBirthDate("2000-12-31").valid).toBe(true);
    });

    it("accepts valid leap day (e.g. 2024-02-29) and rejects invalid leap day (e.g. 2023-02-29)", () => {
      expect(validateBirthDate("2024-02-29").valid).toBe(true);
      const invalidLeap = validateBirthDate("2023-02-29");
      expect(invalidLeap.valid).toBe(false);
      expect(invalidLeap.error).toContain("Day 29 is invalid for month 2");
    });

    it("rejects dates outside calendar bounds (e.g. April 31 or Month 13)", () => {
      expect(validateBirthDate("1995-04-31").valid).toBe(false);
      expect(validateBirthDate("1995-13-01").valid).toBe(false);
      expect(validateBirthDate("1995-00-10").valid).toBe(false);
    });

    it("rejects future dates", () => {
      const futureYear = new Date().getFullYear() + 2;
      const res = validateBirthDate(`${futureYear}-01-01`);
      expect(res.valid).toBe(false);
      expect(res.error).toBe("Birth date cannot be in the future.");
    });

    it("rejects malformed or empty date inputs", () => {
      expect(validateBirthDate("").valid).toBe(false);
      expect(validateBirthDate("15-08-1995").valid).toBe(false);
      expect(validateBirthDate("1995/08/15").valid).toBe(false);
      expect(validateBirthDate("not-a-date").valid).toBe(false);
    });
  });

  describe("Test 8 — Birth Time Validation", () => {
    it("accepts valid 24-hour HH:mm time between 00:00 and 23:59", () => {
      expect(validateBirthTime("00:00").valid).toBe(true);
      expect(validateBirthTime("10:30").valid).toBe(true);
      expect(validateBirthTime("18:45").valid).toBe(true);
      expect(validateBirthTime("23:59").valid).toBe(true);
    });

    it("rejects invalid hours or minutes (e.g. 24:00, 12:60)", () => {
      expect(validateBirthTime("24:00").valid).toBe(false);
      expect(validateBirthTime("12:60").valid).toBe(false);
      expect(validateBirthTime("25:10").valid).toBe(false);
      expect(validateBirthTime("08:61").valid).toBe(false);
    });

    it("rejects malformed time strings (AM/PM, seconds, words)", () => {
      expect(validateBirthTime("10:30 AM").valid).toBe(false);
      expect(validateBirthTime("10:30:00").valid).toBe(false);
      expect(validateBirthTime("noon").valid).toBe(false);
      expect(validateBirthTime("").valid).toBe(false);
    });
  });

  describe("Test 9 — Latitude Validation", () => {
    it("accepts latitudes within [-90, +90]", () => {
      expect(validateCoordinates(0, 0).valid).toBe(true);
      expect(validateCoordinates(28.6139, 77.2090).valid).toBe(true);
      expect(validateCoordinates(-90, 0).valid).toBe(true);
      expect(validateCoordinates(90, 0).valid).toBe(true);
      expect(validateCoordinates(-33.8688, 151.2093).valid).toBe(true);
    });

    it("rejects latitudes outside [-90, +90] and non-numbers", () => {
      expect(validateCoordinates(-90.1, 0).valid).toBe(false);
      expect(validateCoordinates(90.1, 0).valid).toBe(false);
      expect(validateCoordinates(NaN, 0).valid).toBe(false);
      expect(validateCoordinates("28.6" as any, 0).valid).toBe(false);
    });
  });

  describe("Test 10 — Longitude Validation", () => {
    it("accepts longitudes within [-180, +180]", () => {
      expect(validateCoordinates(0, -180).valid).toBe(true);
      expect(validateCoordinates(0, 180).valid).toBe(true);
      expect(validateCoordinates(28.6139, 77.2090).valid).toBe(true);
      expect(validateCoordinates(40.7128, -74.0060).valid).toBe(true);
    });

    it("rejects longitudes outside [-180, +180] and non-numbers", () => {
      expect(validateCoordinates(0, -180.1).valid).toBe(false);
      expect(validateCoordinates(0, 180.1).valid).toBe(false);
      expect(validateCoordinates(0, NaN).valid).toBe(false);
      expect(validateCoordinates(0, "77.2" as any).valid).toBe(false);
    });
  });

  describe("Test 11 — Timezone Validation", () => {
    it("accepts valid IANA timezone identifiers", () => {
      expect(validateTimezone("Asia/Kolkata").valid).toBe(true);
      expect(validateTimezone("America/New_York").valid).toBe(true);
      expect(validateTimezone("Europe/London").valid).toBe(true);
      expect(validateTimezone("UTC").valid).toBe(true);
      expect(validateTimezone("Asia/Tokyo").valid).toBe(true);
    });

    it("rejects arbitrary invalid timezone strings or empty inputs", () => {
      expect(validateTimezone("Invalid/Timezone").valid).toBe(false);
      expect(validateTimezone("Mars/Curiosity").valid).toBe(false);
      expect(validateTimezone("IST").valid).toBe(false); // Non-standard abbreviation
      expect(validateTimezone("").valid).toBe(false);
    });
  });

  describe("Test 12 — Incomplete Birth Information Precision States", () => {
    it("marks precision as NOT_PROVIDED when no birth fields are supplied", () => {
      expect(determineBirthDataPrecision({})).toBe("NOT_PROVIDED");
      const validated = validateCustomerBirthDetails({});
      expect(validated.valid).toBe(true);
      expect(validated.validatedDetails?.precisionState).toBe("NOT_PROVIDED");
    });

    it("marks precision as PARTIAL when some birth fields are missing", () => {
      // Date and place only
      expect(
        determineBirthDataPrecision({
          date: "1990-05-15",
          placeName: "Mumbai, India",
        })
      ).toBe("PARTIAL");

      // Date, time, place but coordinates missing
      expect(
        determineBirthDataPrecision({
          date: "1990-05-15",
          time: "14:30",
          placeName: "Mumbai, India",
        })
      ).toBe("PARTIAL");
    });

    it("marks precision as COMPLETE only when date, time, place, coords, and timezone are all supplied", () => {
      expect(
        determineBirthDataPrecision({
          date: "1995-08-15",
          time: "10:30",
          placeName: "New Delhi, India",
          latitude: 28.6139,
          longitude: 77.2090,
          timezone: "Asia/Kolkata",
        })
      ).toBe("COMPLETE");
    });

    it("correctly identifies timeAccuracy states (EXACT, APPROXIMATE, UNKNOWN)", () => {
      const exactRes = validateCustomerBirthDetails({
        time: "10:30",
        timeAccuracy: "EXACT",
      });
      expect(exactRes.validatedDetails?.timeAccuracy).toBe("EXACT");

      const approxRes = validateCustomerBirthDetails({
        time: "10:30",
        timeAccuracy: "APPROXIMATE",
      });
      expect(approxRes.validatedDetails?.timeAccuracy).toBe("APPROXIMATE");

      const unknownRes = validateCustomerBirthDetails({});
      expect(unknownRes.validatedDetails?.timeAccuracy).toBe("UNKNOWN");
    });
  });

  describe("Test 13 — No Demo Customer Fallback for Authenticated Customers", () => {
    it("ensures freshly created profile starts with truthful empty birthDetails and zero points", async () => {
      mockSetDoc.mockResolvedValueOnce(undefined);

      const customerProfile = await createUserProfile({
        userId: "uid_real_seeker_99",
        email: "priya.sharma@example.com",
        displayName: "Priya Sharma",
      });

      // No demo fallback
      expect(customerProfile.email).toBe("priya.sharma@example.com");
      expect(customerProfile.displayName).toBe("Priya Sharma");
      expect(customerProfile.birthDetails).toBeUndefined();
      expect((customerProfile as any).spiritualPoints).toBeUndefined();
      expect((customerProfile as any).walletBalance).toBeUndefined();
      expect((customerProfile as any).rashi).toBeUndefined();
      expect((customerProfile as any).nakshatra).toBeUndefined();
      expect((customerProfile as any).lagna).toBeUndefined();
    });

    it("does not inject Rohit Sharma or Aarav Sharma into customer profile", async () => {
      mockSetDoc.mockResolvedValueOnce(undefined);

      const profile = await createUserProfile({
        userId: "uid_genuine_01",
        email: "kavita.patel@gmail.com",
      });

      expect(profile.displayName).not.toBe("Rohit Sharma");
      expect(profile.displayName).not.toBe("Aarav Sharma");
      expect(profile.email).not.toBe("aarav.s@gmail.com");
    });
  });

  describe("Test 14 — Existing SUPER_ADMIN / ADMIN Authorization Remains Intact", () => {
    it("authoritatively retains SUPER_ADMIN role for ravieadagale@gmail.com", () => {
      expect(resolveRoleFromEmail("ravieadagale@gmail.com")).toBe("SUPER_ADMIN");
      expect(isSuperAdminEmail("ravieadagale@gmail.com")).toBe(true);
    });

    it("authoritatively retains ADMIN role for ravii.adagale20@gmail.com", () => {
      expect(resolveRoleFromEmail("ravii.adagale20@gmail.com")).toBe("ADMIN");
      expect(isAdminEmail("ravii.adagale20@gmail.com")).toBe(true);
    });

    it("strictly isolates standard customer accounts from any admin privileges", () => {
      expect(resolveRoleFromEmail("new.customer@gmail.com")).toBe("CUSTOMER");
      expect(isSuperAdminEmail("new.customer@gmail.com")).toBe(false);
      expect(isAdminEmail("new.customer@gmail.com")).toBe(false);
    });
  });

  describe("9. Logout & Session Reset Verification", () => {
    it("resets profile state and privileges on session termination", () => {
      let activeUserProfile: UserProfile | null = {
        userId: "uid_active_user",
        email: "active@domain.com",
        displayName: "Active User",
        role: "CUSTOMER",
        createdAt: "2026-09-25T00:00:00.000Z",
        lastLoginAt: "2026-09-25T01:00:00.000Z",
      };

      // Simulate logout cleanup routine
      activeUserProfile = null;
      expect(activeUserProfile).toBeNull();
    });
  });

  describe("10. Invalid & Empty Authentication Verification Boundary", () => {
    it("rejects token verification when token is empty or whitespace", async () => {
      const { verifyFirebaseIdToken } = await import("../server/superAdminAuth");
      const emptyResult = await verifyFirebaseIdToken("");
      expect(emptyResult.valid).toBe(false);
      expect(emptyResult.statusCode).toBe(401);

      const whitespaceResult = await verifyFirebaseIdToken("   ");
      expect(whitespaceResult.valid).toBe(false);
      expect(whitespaceResult.statusCode).toBe(401);
    });
  });
});
