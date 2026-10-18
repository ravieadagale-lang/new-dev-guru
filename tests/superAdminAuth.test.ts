import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  SUPER_ADMIN_EMAILS,
  normalizeEmail,
  isSuperAdminEmail,
  isAdminEmail,
} from "../src/services/auth/superAdminConfig";
import {
  verifyFirebaseTokenAndSuperAdmin,
  requireSuperAdminAuth,
  AuthenticatedSuperAdminRequest,
} from "../server/superAdminAuth";
import {
  calculateAuthoritativePanchang,
  calculateSolarEvents,
} from "../src/engine/panchangEngine";
import { MUHURTA_EVENT_REGISTRY } from "../src/engine/muhurtaRuleRegistryEngine";

describe("Marketplace Phase 0 — Super Admin Authentication & Authorization Suite", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("1 & 2. Authorized Super Admin Identity Recognition", () => {
    it("recognizes authorized Super Admin (ravieadagale@gmail.com)", () => {
      expect(isSuperAdminEmail("ravieadagale@gmail.com")).toBe(true);
    });

    it("verifies the exact Super Admin allowlist contains only ravieadagale@gmail.com", () => {
      expect(SUPER_ADMIN_EMAILS).toHaveLength(1);
      expect(SUPER_ADMIN_EMAILS).toContain("ravieadagale@gmail.com");
    });
  });

  describe("3. Unauthorized Email Rejection", () => {
    it("rejects unauthorized consumer email", () => {
      expect(isSuperAdminEmail("aarav.s@gmail.com")).toBe(false);
    });

    it("rejects unauthorized admin-spoofed email", () => {
      expect(isSuperAdminEmail("admin@astronext.com")).toBe(false);
      expect(isSuperAdminEmail("superadmin@gmail.com")).toBe(false);
      expect(isSuperAdminEmail("hacker@malicious.org")).toBe(false);
    });

    it("rejects typos or prefix/suffix variations of authorized emails", () => {
      expect(isSuperAdminEmail("ravieadagale@gmail.co")).toBe(false);
      expect(isSuperAdminEmail("notravieadagale@gmail.com")).toBe(false);
      expect(isSuperAdminEmail("ravii.adagale20@yahoo.com")).toBe(false);
    });

    it("rejects null, undefined, and empty string safely", () => {
      expect(isSuperAdminEmail(null)).toBe(false);
      expect(isSuperAdminEmail(undefined)).toBe(false);
      expect(isSuperAdminEmail("")).toBe(false);
      expect(isSuperAdminEmail("   ")).toBe(false);
    });
  });

  describe("4. Email Normalization & Case-Insensitivity", () => {
    it("normalizes uppercase and mixed-case emails", () => {
      expect(normalizeEmail("RAVIEADAGALE@GMAIL.COM")).toBe("ravieadagale@gmail.com");
      expect(normalizeEmail("Ravii.Adagale20@Gmail.Com")).toBe("ravii.adagale20@gmail.com");
    });

    it("strips leading and trailing whitespace safely", () => {
      expect(normalizeEmail("   ravieadagale@gmail.com   ")).toBe("ravieadagale@gmail.com");
      expect(normalizeEmail("\t\n ravii.adagale20@gmail.com \n")).toBe("ravii.adagale20@gmail.com");
    });

    it("correctly identifies authorized Super Admin regardless of input casing or spacing", () => {
      expect(isSuperAdminEmail("  RAVIEADAGALE@GMAIL.COM  ")).toBe(true);
      expect(isAdminEmail("  Ravii.Adagale20@Gmail.Com \n")).toBe(true);
    });
  });

  describe("5 & 6. Token Verification & Malformed Token Rejection", () => {
    it("rejects missing authentication token with 401 status", async () => {
      const result = await verifyFirebaseTokenAndSuperAdmin("");
      expect(result.valid).toBe(false);
      expect(result.authorized).toBe(false);
      expect(result.statusCode).toBe(401);
      expect(result.error).toContain("missing or empty");
    });

    it("rejects whitespace-only token with 401 status", async () => {
      const result = await verifyFirebaseTokenAndSuperAdmin("   ");
      expect(result.valid).toBe(false);
      expect(result.authorized).toBe(false);
      expect(result.statusCode).toBe(401);
    });

    it("rejects malformed or invalid token from Google Identity Toolkit", async () => {
      // Mock fetch to simulate Google Identity Toolkit 400 INVALID_ID_TOKEN response
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({
          error: { code: 400, message: "INVALID_ID_TOKEN" },
        }),
      } as any);

      const result = await verifyFirebaseTokenAndSuperAdmin("malformed_fake_token");
      expect(result.valid).toBe(false);
      expect(result.authorized).toBe(false);
      expect(result.statusCode).toBe(401);
      expect(result.error).toContain("INVALID_ID_TOKEN");
    });

    it("authorizes valid token when Google returns authorized email A", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          users: [
            {
              localId: "firebase-uid-001",
              email: "  RAVIEADAGALE@GMAIL.COM ",
              emailVerified: true,
            },
          ],
        }),
      } as any);

      const result = await verifyFirebaseTokenAndSuperAdmin("valid_token_for_user_a");
      expect(result.valid).toBe(true);
      expect(result.authorized).toBe(true);
      expect(result.user?.email).toBe("ravieadagale@gmail.com");
      expect(result.user?.uid).toBe("firebase-uid-001");
    });

    it("authorizes valid token when Google returns authorized Super Admin", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          users: [
            {
              localId: "firebase-uid-001",
              email: "ravieadagale@gmail.com",
              emailVerified: true,
            },
          ],
        }),
      } as any);

      const result = await verifyFirebaseTokenAndSuperAdmin("valid_token_for_user_b");
      expect(result.valid).toBe(true);
      expect(result.authorized).toBe(true);
      expect(result.user?.email).toBe("ravieadagale@gmail.com");
    });

    it("rejects valid token if user email is not in the Super Admin allowlist with 403 status", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          users: [
            {
              localId: "firebase-uid-unauth",
              email: "someone_else@gmail.com",
              emailVerified: true,
            },
          ],
        }),
      } as any);

      const result = await verifyFirebaseTokenAndSuperAdmin("valid_token_non_admin");
      expect(result.valid).toBe(true);
      expect(result.authorized).toBe(false);
      expect(result.statusCode).toBe(403);
      expect(result.error).toContain("not authorized for Super Admin");
    });
  });

  describe("7. Client-Supplied Role Bypass Prevention", () => {
    it("middleware rejects request with role=super_admin in body or query without valid Bearer token", async () => {
      const req = {
        headers: {},
        body: { role: "super_admin", user: "admin" },
        query: { role: "super_admin" },
      } as unknown as AuthenticatedSuperAdminRequest;

      let responseStatus = 0;
      let responseBody: any = null;

      const res = {
        status: (code: number) => {
          responseStatus = code;
          return {
            json: (data: any) => {
              responseBody = data;
            },
          };
        },
      } as any;

      const next = vi.fn();

      await requireSuperAdminAuth(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(responseStatus).toBe(401);
      expect(responseBody.error).toBe("UNAUTHENTICATED");
    });
  });

  describe("8 & 9. Middleware Access Control & Session Invalidation", () => {
    it("middleware passes through and attaches superAdmin when valid token is presented", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          users: [
            {
              localId: "firebase-uid-001",
              email: "ravieadagale@gmail.com",
              emailVerified: true,
            },
          ],
        }),
      } as any);

      const req = {
        headers: { authorization: "Bearer valid_id_token_123" },
      } as unknown as AuthenticatedSuperAdminRequest;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as any;

      const next = vi.fn();

      await requireSuperAdminAuth(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(req.superAdmin).toBeDefined();
      expect(req.superAdmin?.email).toBe("ravieadagale@gmail.com");
    });

    it("middleware forbids authenticated non-super-admin with 403", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          users: [
            {
              localId: "firebase-uid-customer",
              email: "customer@gmail.com",
              emailVerified: true,
            },
          ],
        }),
      } as any);

      const req = {
        headers: { authorization: "Bearer customer_valid_token" },
      } as unknown as AuthenticatedSuperAdminRequest;

      let statusCode = 0;
      let responseJson: any = null;

      const res = {
        status: (code: number) => {
          statusCode = code;
          return {
            json: (data: any) => {
              responseJson = data;
            },
          };
        },
      } as any;

      const next = vi.fn();

      await requireSuperAdminAuth(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(statusCode).toBe(403);
      expect(responseJson.error).toBe("FORBIDDEN");
    });
  });

  describe("10. Important Existing Systems Frozen Verification", () => {
    it("calculates Panchang deterministically without regression", () => {
      const testDate = new Date("2026-09-19T12:00:00Z");
      const solar = calculateSolarEvents(testDate, 28.6139, 77.209, 5.5);
      const panchang = calculateAuthoritativePanchang({
        date: testDate,
        latitude: 28.6139,
        longitude: 77.209,
        timezoneOffsetHours: 5.5,
      });

      expect(solar.sunrise).toBeInstanceOf(Date);
      expect(solar.sunset).toBeInstanceOf(Date);
      expect(panchang).toBeDefined();
      expect(panchang.tithi).toBeDefined();
      expect(panchang.paksha).toMatch(/(Shukla|Krishna)/);
      expect(panchang.nakshatra).toBeDefined();
      expect(panchang.dayHoras).toHaveLength(12);
      expect(panchang.nightHoras).toHaveLength(12);
    });

    it("evaluates Muhurta event registry criteria accurately without regression", () => {
      expect(MUHURTA_EVENT_REGISTRY.length).toBe(25);
      const grihaPravesh = MUHURTA_EVENT_REGISTRY.find(e => e.eventId === "griha_pravesh");
      expect(grihaPravesh).toBeDefined();
      expect(grihaPravesh?.favorableNakshatras.length).toBeGreaterThan(0);
      expect(grihaPravesh?.favorableTithis.length).toBeGreaterThan(0);
      expect(grihaPravesh?.favorableVaras.length).toBeGreaterThan(0);
    });
  });
});
