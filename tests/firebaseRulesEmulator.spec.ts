/**
 * DEV-GURU — PHASE 3.5: FIREBASE LOCAL RULE-ENGINE TEST HARNESS
 *
 * Dedicated, isolated test suite for validating `firestore.rules` and `storage.rules`
 * using the official `@firebase/rules-unit-testing` emulator API.
 *
 * Isolation guarantees:
 * - Targets dedicated emulator project ID: `dev-guru-rules-emulator`
 * - Local-only test data initialized exclusively via `withSecurityRulesDisabled`
 * - Zero live production connection (does NOT touch project `dev-guru-41d29`)
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import fs from "fs";
import path from "path";

// Dedicated isolated emulator project identifier
const EMULATOR_PROJECT_ID = "dev-guru-rules-emulator";
const FIRESTORE_RULES_PATH = path.resolve(process.cwd(), "firestore.rules");
const STORAGE_RULES_PATH = path.resolve(process.cwd(), "storage.rules");

// Dynamic loader for @firebase/rules-unit-testing to ensure test runner gracefully
// handles missing devDependencies in restricted sandbox environments.
let rulesUnitTesting: typeof import("@firebase/rules-unit-testing") | null = null;
let testEnv: any = null;

try {
  // @ts-ignore dynamic runtime import
  rulesUnitTesting = await import("@firebase/rules-unit-testing");
} catch {
  rulesUnitTesting = null;
}

const isEmulatorTestingAvailable = rulesUnitTesting !== null && Boolean(process.env.FIREBASE_EMULATOR_HUB || process.env.FIRESTORE_EMULATOR_HOST);

describe("Firebase Security Rules Local Rule-Engine Test Harness", () => {
  if (!rulesUnitTesting || !isEmulatorTestingAvailable) {
    it("reports emulator test harness environment requirements", () => {
      // Diagnostic verification for sandbox environment where Java/emulators are not running
      expect(fs.existsSync(FIRESTORE_RULES_PATH)).toBe(true);
      expect(fs.existsSync(STORAGE_RULES_PATH)).toBe(true);
      
      const firestoreRulesContent = fs.readFileSync(FIRESTORE_RULES_PATH, "utf8");
      const storageRulesContent = fs.readFileSync(STORAGE_RULES_PATH, "utf8");
      expect(firestoreRulesContent).toContain("rules_version = '2'");
      expect(storageRulesContent).toContain("rules_version = '2'");

      // Explanatory note on workstation/CI environment setup
      if (!rulesUnitTesting) {
        console.info(
          "[Phase 3.5 Harness Notice] '@firebase/rules-unit-testing' is not installed in local node_modules.\n" +
          "Run on workstation/CI with: npm install -D @firebase/rules-unit-testing\n" +
          "and execute with: firebase emulators:exec --config firebase.emulator.json 'npx vitest run --config vitest.emulator.config.ts'"
        );
      } else if (!isEmulatorTestingAvailable) {
        console.info(
          "[Phase 3.5 Harness Notice] Firebase Local Emulator is not currently active in this process.\n" +
          "Start emulators via: firebase emulators:exec --config firebase.emulator.json 'npx vitest run --config vitest.emulator.config.ts'"
        );
      }
    });
    return;
  }

  // --- Real Rule-Engine Execution When Emulator & Package Are Active ---
  const { initializeTestEnvironment, assertFails, assertSucceeds } = rulesUnitTesting;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: EMULATOR_PROJECT_ID,
      firestore: {
        rules: fs.readFileSync(FIRESTORE_RULES_PATH, "utf8"),
        host: "127.0.0.1",
        port: 8080,
      },
      storage: {
        rules: fs.readFileSync(STORAGE_RULES_PATH, "utf8"),
        host: "127.0.0.1",
        port: 9199,
      },
    });
  });

  afterAll(async () => {
    if (testEnv) {
      await testEnv.cleanup();
    }
  });

  beforeEach(async () => {
    if (testEnv) {
      await testEnv.clearFirestore();
      await testEnv.clearStorage();
    }
  });

  // =========================================================================
  // 1. Unauthenticated access denial
  // =========================================================================
  describe("1. Unauthenticated Access Denial", () => {
    it("denies unauthenticated read to protected user profiles", async () => {
      const unauthCtx = testEnv.unauthenticatedContext();
      const unauthDb = unauthCtx.firestore();
      await assertFails(unauthDb.collection("users").doc("customer-1").get());
    });

    it("denies unauthenticated read or write to consultations", async () => {
      const unauthCtx = testEnv.unauthenticatedContext();
      const unauthDb = unauthCtx.firestore();
      await assertFails(unauthDb.collection("consultations").doc("book-1").get());
      await assertFails(
        unauthDb.collection("consultations").doc("book-1").set({
          clientId: "cust-1",
          status: "REQUESTED",
        })
      );
    });

    it("denies unauthenticated read to orders", async () => {
      const unauthCtx = testEnv.unauthenticatedContext();
      const unauthDb = unauthCtx.firestore();
      await assertFails(unauthDb.collection("orders").doc("order-100").get());
    });

    it("denies unauthenticated write to slot locks", async () => {
      const unauthCtx = testEnv.unauthenticatedContext();
      const unauthDb = unauthCtx.firestore();
      await assertFails(
        unauthDb.collection("slotLocks").doc("lock-1").set({
          clientId: "anon",
          status: "RESERVED",
        })
      );
    });

    it("denies unauthenticated access to private consultation storage attachments", async () => {
      const unauthCtx = testEnv.unauthenticatedContext();
      const unauthStorage = unauthCtx.storage();
      await assertFails(unauthStorage.ref("consultations/book-1/chart.pdf").getDownloadURL());
    });
  });

  // =========================================================================
  // 2. Customer profile isolation and role-escalation denial
  // =========================================================================
  describe("2. Customer Profile Isolation and Role-Escalation Denial", () => {
    beforeEach(async () => {
      await testEnv.withSecurityRulesDisabled(async (context: any) => {
        const adminDb = context.firestore();
        await adminDb.collection("users").doc("cust-1").set({
          userId: "cust-1",
          email: "cust1@example.com",
          role: "CUSTOMER",
          createdAt: "2026-10-24T00:00:00Z",
        });
        await adminDb.collection("users").doc("cust-2").set({
          userId: "cust-2",
          email: "cust2@example.com",
          role: "CUSTOMER",
          createdAt: "2026-10-24T00:00:00Z",
        });
      });
    });

    it("allows customer to read their own profile", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      await assertSucceeds(cust1Ctx.firestore().collection("users").doc("cust-1").get());
    });

    it("denies customer from reading another customer's profile", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      await assertFails(cust1Ctx.firestore().collection("users").doc("cust-2").get());
    });

    it("denies customer from updating another customer's profile", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      await assertFails(
        cust1Ctx.firestore().collection("users").doc("cust-2").update({ displayName: "Hacked" })
      );
    });

    it("denies customer from escalating their role to ADMIN or SUPER_ADMIN on create", async () => {
      const newCustCtx = testEnv.authenticatedContext("cust-3", { email: "cust3@example.com", email_verified: true });
      await assertFails(
        newCustCtx.firestore().collection("users").doc("cust-3").set({
          userId: "cust-3",
          email: "cust3@example.com",
          role: "ADMIN",
        })
      );
      await assertFails(
        newCustCtx.firestore().collection("users").doc("cust-3").set({
          userId: "cust-3",
          email: "cust3@example.com",
          role: "SUPER_ADMIN",
        })
      );
    });

    it("denies customer from escalating their role from CUSTOMER to ADMIN on update", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      await assertFails(
        cust1Ctx.firestore().collection("users").doc("cust-1").update({
          role: "ADMIN",
        })
      );
    });

    it("allows customer to legitimately update their own profile while keeping role CUSTOMER", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      await assertSucceeds(
        cust1Ctx.firestore().collection("users").doc("cust-1").update({
          displayName: "Dev Guru Seeker",
          role: "CUSTOMER",
          userId: "cust-1",
        })
      );
    });
  });

  // =========================================================================
  // 3. Admin versus Super Admin permissions
  // =========================================================================
  describe("3. Admin versus Super Admin Permissions", () => {
    beforeEach(async () => {
      await testEnv.withSecurityRulesDisabled(async (context: any) => {
        const adminDb = context.firestore();
        await adminDb.collection("users").doc("cust-1").set({
          userId: "cust-1",
          email: "cust1@example.com",
          role: "CUSTOMER",
          createdAt: "2026-10-24T00:00:00Z",
        });
      });
    });

    it("allows canonical Admin (ravii.adagale20@gmail.com) to read user profiles", async () => {
      const adminCtx = testEnv.authenticatedContext("admin-uid", {
        email: "ravii.adagale20@gmail.com",
        email_verified: true,
      });
      await assertSucceeds(adminCtx.firestore().collection("users").doc("cust-1").get());
      await assertSucceeds(adminCtx.firestore().collection("users").get());
    });

    it("allows canonical Admin to self-provision profile with role ADMIN or CUSTOMER", async () => {
      const adminCtx = testEnv.authenticatedContext("admin-uid", {
        email: "ravii.adagale20@gmail.com",
        email_verified: true,
      });
      await assertSucceeds(
        adminCtx.firestore().collection("users").doc("admin-uid").set({
          userId: "admin-uid",
          email: "ravii.adagale20@gmail.com",
          role: "ADMIN",
        })
      );
    });

    it("denies canonical Admin from escalating self or any user to SUPER_ADMIN", async () => {
      const adminCtx = testEnv.authenticatedContext("admin-uid", {
        email: "ravii.adagale20@gmail.com",
        email_verified: true,
      });
      await assertFails(
        adminCtx.firestore().collection("users").doc("admin-uid").set({
          userId: "admin-uid",
          email: "ravii.adagale20@gmail.com",
          role: "SUPER_ADMIN",
        })
      );
    });

    it("allows canonical Super Admin (ravieadagale@gmail.com) to manage profiles and delete users", async () => {
      const superCtx = testEnv.authenticatedContext("super-uid", {
        email: "ravieadagale@gmail.com",
        email_verified: true,
      });
      await assertSucceeds(superCtx.firestore().collection("users").doc("cust-1").get());
      await assertSucceeds(superCtx.firestore().collection("users").doc("cust-1").delete());
    });

    it("denies canonical Admin from deleting user profiles", async () => {
      const adminCtx = testEnv.authenticatedContext("admin-uid", {
        email: "ravii.adagale20@gmail.com",
        email_verified: true,
      });
      await assertFails(adminCtx.firestore().collection("users").doc("cust-1").delete());
    });
  });

  // =========================================================================
  // 4. Consultation creation and field-level update restrictions
  // =========================================================================
  describe("4. Consultation Creation and Field-Level Update Restrictions", () => {
    beforeEach(async () => {
      await testEnv.withSecurityRulesDisabled(async (context: any) => {
        const adminDb = context.firestore();
        await adminDb.collection("consultations").doc("book-active").set({
          bookingId: "book-active",
          clientId: "cust-1",
          consultantId: "astro-1",
          consultantEmail: "astro1@example.com",
          serviceId: "srv-vedic",
          status: "PENDING_CONFIRMATION",
          paymentStatus: "UNPAID",
          originalPrice: { amountMinor: 250000, currency: "INR" },
          createdAt: "2026-10-24T00:00:00Z",
          startTime: "2026-11-01T10:00:00Z",
          endTime: "2026-11-01T10:45:00Z",
        });
      });
    });

    it("allows customer to create a consultation with UNPAID status and valid fields", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      await assertSucceeds(
        cust1Ctx.firestore().collection("consultations").doc("book-new-1").set({
          clientId: "cust-1",
          status: "REQUESTED",
          paymentStatus: "UNPAID",
          serviceId: "srv-vedic",
          startTime: "2026-11-01T10:00:00Z",
          endTime: "2026-11-01T10:45:00Z",
        })
      );
    });

    it("denies customer from creating consultation with internalNotes or refundStatus", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      await assertFails(
        cust1Ctx.firestore().collection("consultations").doc("book-new-2").set({
          clientId: "cust-1",
          status: "REQUESTED",
          paymentStatus: "UNPAID",
          serviceId: "srv-vedic",
          startTime: "2026-11-01T10:00:00Z",
          endTime: "2026-11-01T10:45:00Z",
          internalNotes: "Forbidden customer note",
        })
      );
    });

    it("denies customer from mutating consultantId or price snapshots", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      // Tampering with consultantId
      await assertFails(
        cust1Ctx.firestore().collection("consultations").doc("book-active").update({
          consultantId: "astro-hacked",
        })
      );
      // Tampering with price snapshot
      await assertFails(
        cust1Ctx.firestore().collection("consultations").doc("book-active").update({
          "originalPrice.amountMinor": 100,
        })
      );
    });

    it("allows customer legitimate cancellation with CANCELLED_BY_CLIENT status", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      await assertSucceeds(
        cust1Ctx.firestore().collection("consultations").doc("book-active").update({
          status: "CANCELLED_BY_CLIENT",
        })
      );
    });

    it("denies consultant from tampering with clientId ownership", async () => {
      const astroCtx = testEnv.authenticatedContext("astro-1", { email: "astro1@example.com", email_verified: true });
      await assertFails(
        astroCtx.firestore().collection("consultations").doc("book-active").update({
          clientId: "cust-hijacked",
        })
      );
    });

    it("allows consultant to legitimately add internal notes to consultation", async () => {
      const astroCtx = testEnv.authenticatedContext("astro-1", { email: "astro1@example.com", email_verified: true });
      await assertSucceeds(
        astroCtx.firestore().collection("consultations").doc("book-active").update({
          internalNotes: "Client requested detailed Sade Sati remedies analysis.",
        })
      );
    });
  });

  // =========================================================================
  // 5. Attempts to change unpaid payment status to PAID
  // =========================================================================
  describe("5. Payment Invariant: Denial of Unpaid-to-PAID Transitions via Client SDK", () => {
    beforeEach(async () => {
      await testEnv.withSecurityRulesDisabled(async (context: any) => {
        const adminDb = context.firestore();
        await adminDb.collection("consultations").doc("book-unpaid").set({
          bookingId: "book-unpaid",
          clientId: "cust-1",
          consultantId: "astro-1",
          consultantEmail: "astro1@example.com",
          serviceId: "srv-vedic",
          status: "PENDING_CONFIRMATION",
          paymentStatus: "UNPAID",
          originalPrice: { amountMinor: 250000, currency: "INR" },
          createdAt: "2026-10-24T00:00:00Z",
          startTime: "2026-11-01T10:00:00Z",
          endTime: "2026-11-01T10:45:00Z",
        });
      });
    });

    it("denies customer from creating a consultation with paymentStatus PAID", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      await assertFails(
        cust1Ctx.firestore().collection("consultations").doc("book-forge-paid").set({
          clientId: "cust-1",
          status: "REQUESTED",
          paymentStatus: "PAID",
          serviceId: "srv-vedic",
          startTime: "2026-11-01T10:00:00Z",
          endTime: "2026-11-01T10:45:00Z",
        })
      );
    });

    it("denies customer from updating unpaid booking to PAID", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      await assertFails(
        cust1Ctx.firestore().collection("consultations").doc("book-unpaid").update({
          paymentStatus: "PAID",
        })
      );
    });

    it("denies consultant from updating unpaid booking to PAID", async () => {
      const astroCtx = testEnv.authenticatedContext("astro-1", { email: "astro1@example.com", email_verified: true });
      await assertFails(
        astroCtx.firestore().collection("consultations").doc("book-unpaid").update({
          paymentStatus: "PAID",
        })
      );
    });

    it("denies Admin from updating unpaid booking to PAID via client SDK", async () => {
      const adminCtx = testEnv.authenticatedContext("admin-uid", {
        email: "ravii.adagale20@gmail.com",
        email_verified: true,
      });
      await assertFails(
        adminCtx.firestore().collection("consultations").doc("book-unpaid").update({
          paymentStatus: "PAID",
        })
      );
    });

    it("denies Super Admin from updating unpaid booking to PAID via client SDK", async () => {
      const superCtx = testEnv.authenticatedContext("super-uid", {
        email: "ravieadagale@gmail.com",
        email_verified: true,
      });
      await assertFails(
        superCtx.firestore().collection("consultations").doc("book-unpaid").update({
          paymentStatus: "PAID",
        })
      );
    });
  });

  // =========================================================================
  // 6. Order ownership and client write restrictions
  // =========================================================================
  describe("6. Order Ownership and Client Write Restrictions", () => {
    beforeEach(async () => {
      await testEnv.withSecurityRulesDisabled(async (context: any) => {
        const adminDb = context.firestore();
        await adminDb.collection("orders").doc("ord-cust1").set({
          orderId: "ord-cust1",
          userId: "cust-1",
          totalMinor: 499900,
          paymentStatus: "PENDING",
          fulfillmentStatus: "UNFULFILLED",
        });
        await adminDb.collection("orders").doc("ord-cust2").set({
          orderId: "ord-cust2",
          userId: "cust-2",
          totalMinor: 150000,
          paymentStatus: "PAID",
          fulfillmentStatus: "COMPLETED",
        });
      });
    });

    it("allows customer to read only their own orders", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      await assertSucceeds(cust1Ctx.firestore().collection("orders").doc("ord-cust1").get());
    });

    it("denies customer from reading another customer's order", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      await assertFails(cust1Ctx.firestore().collection("orders").doc("ord-cust2").get());
    });

    it("denies customer from direct-creating or updating orders", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      await assertFails(
        cust1Ctx.firestore().collection("orders").doc("ord-cust1-new").set({
          userId: "cust-1",
          totalMinor: 100,
          paymentStatus: "PAID",
        })
      );
      await assertFails(
        cust1Ctx.firestore().collection("orders").doc("ord-cust1").update({
          paymentStatus: "PAID",
          fulfillmentStatus: "COMPLETED",
        })
      );
    });

    it("allows staff admin to inspect customer orders", async () => {
      const adminCtx = testEnv.authenticatedContext("admin-uid", {
        email: "ravii.adagale20@gmail.com",
        email_verified: true,
      });
      await assertSucceeds(adminCtx.firestore().collection("orders").doc("ord-cust1").get());
    });
  });

  // =========================================================================
  // 7. Slot-lock ownership, active contention, release, and reacquisition
  // =========================================================================
  describe("7. Slot-Lock Ownership, Contention, Release, and Reacquisition", () => {
    it("allows authenticated customer to reserve an available slot lock", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      await assertSucceeds(
        cust1Ctx.firestore().collection("slotLocks").doc("slot-2026-11-01-1000").set({
          clientId: "cust-1",
          consultantId: "astro-1",
          status: "RESERVED",
          startTime: "2026-11-01T10:00:00Z",
          endTime: "2026-11-01T10:45:00Z",
        })
      );
    });

    it("denies competing customer from stealing an actively reserved slot", async () => {
      await testEnv.withSecurityRulesDisabled(async (context: any) => {
        await context.firestore().collection("slotLocks").doc("slot-active").set({
          clientId: "cust-1",
          consultantId: "astro-1",
          status: "RESERVED",
          startTime: "2026-11-01T10:00:00Z",
          endTime: "2026-11-01T10:45:00Z",
        });
      });

      const cust2Ctx = testEnv.authenticatedContext("cust-2", { email: "cust2@example.com", email_verified: true });
      await assertFails(
        cust2Ctx.firestore().collection("slotLocks").doc("slot-active").update({
          clientId: "cust-2",
          status: "RESERVED",
        })
      );
    });

    it("allows lock owner to release an active slot lock", async () => {
      await testEnv.withSecurityRulesDisabled(async (context: any) => {
        await context.firestore().collection("slotLocks").doc("slot-release-me").set({
          clientId: "cust-1",
          consultantId: "astro-1",
          status: "RESERVED",
          startTime: "2026-11-01T10:00:00Z",
          endTime: "2026-11-01T10:45:00Z",
        });
      });

      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      await assertSucceeds(
        cust1Ctx.firestore().collection("slotLocks").doc("slot-release-me").update({
          clientId: "cust-1",
          consultantId: "astro-1",
          startTime: "2026-11-01T10:00:00Z",
          endTime: "2026-11-01T10:45:00Z",
          status: "RELEASED",
        })
      );
    });

    it("allows customer 2 to legitimately reacquire a RELEASED slot lock", async () => {
      await testEnv.withSecurityRulesDisabled(async (context: any) => {
        await context.firestore().collection("slotLocks").doc("slot-released").set({
          clientId: "cust-1",
          consultantId: "astro-1",
          status: "RELEASED",
          startTime: "2026-11-01T10:00:00Z",
          endTime: "2026-11-01T10:45:00Z",
        });
      });

      const cust2Ctx = testEnv.authenticatedContext("cust-2", { email: "cust2@example.com", email_verified: true });
      await assertSucceeds(
        cust2Ctx.firestore().collection("slotLocks").doc("slot-released").update({
          clientId: "cust-2",
          consultantId: "astro-1",
          status: "RESERVED",
          startTime: "2026-11-01T10:00:00Z",
          endTime: "2026-11-01T10:45:00Z",
        })
      );
    });
  });

  // =========================================================================
  // 8. Private consultation attachment access and upload restrictions
  // =========================================================================
  describe("8. Private Consultation Attachment Access & Storage Restrictions", () => {
    beforeEach(async () => {
      await testEnv.withSecurityRulesDisabled(async (context: any) => {
        await context.firestore().collection("consultations").doc("book-att-1").set({
          clientId: "cust-1",
          consultantId: "astro-1",
          consultantEmail: "astro1@example.com",
        });
      });
    });

    it("allows authorized consultation client to upload PDF attachment (<= 10MB)", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      const smallPdf = new Uint8Array([0x25, 0x50, 0x44, 0x46]); // %PDF
      await assertSucceeds(
        cust1Ctx.storage().ref("consultations/book-att-1/natal_chart.pdf").put(smallPdf, {
          contentType: "application/pdf",
        })
      );
    });

    it("denies unauthorized customer from reading consultation attachments", async () => {
      const cust2Ctx = testEnv.authenticatedContext("cust-2", { email: "cust2@example.com", email_verified: true });
      await assertFails(
        cust2Ctx.storage().ref("consultations/book-att-1/natal_chart.pdf").getDownloadURL()
      );
    });

    it("denies attachment uploads with forbidden content types (e.g. text/html, exe)", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      const payload = new Uint8Array([0x3c, 0x68, 0x74, 0x6d, 0x6c]);
      await assertFails(
        cust1Ctx.storage().ref("consultations/book-att-1/malicious.html").put(payload, {
          contentType: "text/html",
        })
      );
    });
  });

  // =========================================================================
  // 9. Avatar file-size and content-type restrictions
  // =========================================================================
  describe("9. Avatar File-Size and Content-Type Restrictions", () => {
    it("allows user to upload their own avatar (JPEG/PNG/WebP, <= 5MB)", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      const samplePng = new Uint8Array([0x89, 0x50, 0x4e, 0x47]);
      await assertSucceeds(
        cust1Ctx.storage().ref("users/cust-1/avatars/avatar.png").put(samplePng, {
          contentType: "image/png",
        })
      );
    });

    it("allows public (unauthenticated) read of user avatars for profile preview", async () => {
      const unauthCtx = testEnv.unauthenticatedContext();
      await assertSucceeds(
        unauthCtx.storage().ref("users/cust-1/avatars/avatar.png").getDownloadURL()
      );
    });

    it("denies user from uploading avatar into another user's directory", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      const samplePng = new Uint8Array([0x89, 0x50, 0x4e, 0x47]);
      await assertFails(
        cust1Ctx.storage().ref("users/cust-2/avatars/hacked.png").put(samplePng, {
          contentType: "image/png",
        })
      );
    });

    it("denies avatar uploads with invalid content types (e.g. application/pdf)", async () => {
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });
      const samplePdf = new Uint8Array([0x25, 0x50, 0x44, 0x46]);
      await assertFails(
        cust1Ctx.storage().ref("users/cust-1/avatars/doc.pdf").put(samplePdf, {
          contentType: "application/pdf",
        })
      );
    });
  });

  // =========================================================================
  // 10. Public catalogue access and default-deny behavior
  // =========================================================================
  describe("10. Public Catalogue Access and Default-Deny Fallback", () => {
    it("allows public unauthenticated read of public services catalog", async () => {
      const unauthCtx = testEnv.unauthenticatedContext();
      await assertSucceeds(unauthCtx.firestore().collection("services").doc("vedic-kundli-session").get());
    });

    it("allows public unauthenticated read of public consultation availability settings", async () => {
      const unauthCtx = testEnv.unauthenticatedContext();
      await assertSucceeds(
        unauthCtx.firestore().collection("systemSettings").doc("consultationAvailability").get()
      );
    });

    it("denies unauthenticated writes to public catalogue", async () => {
      const unauthCtx = testEnv.unauthenticatedContext();
      await assertFails(
        unauthCtx.firestore().collection("services").doc("new-service").set({ title: "Spam" })
      );
    });

    it("enforces default-deny on undocumented / private paths for all callers", async () => {
      const unauthCtx = testEnv.unauthenticatedContext();
      const cust1Ctx = testEnv.authenticatedContext("cust-1", { email: "cust1@example.com", email_verified: true });

      // Unauthenticated access to unknown collection
      await assertFails(unauthCtx.firestore().collection("internal_platform_secrets").doc("key1").get());
      // Customer access to unknown collection
      await assertFails(cust1Ctx.firestore().collection("internal_platform_secrets").doc("key1").get());
      await assertFails(
        cust1Ctx.firestore().collection("internal_platform_secrets").doc("key1").set({ val: 123 })
      );
    });
  });
});
