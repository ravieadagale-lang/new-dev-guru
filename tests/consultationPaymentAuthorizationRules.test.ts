import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import {
  isSuperAdminEmail,
  isAdminEmail,
  resolveRoleFromEmail,
} from "../src/services/auth/superAdminConfig";

/**
 * Pure evaluator modeling the exact AST logic defined in `firestore.rules`
 * for `/consultations/{bookingId}` updates.
 */
function evaluateConsultationUpdateRule(context: {
  auth: { uid: string | null; email?: string | null } | null;
  existingData: Record<string, any>;
  incomingData: Record<string, any>;
}): { allowed: boolean; reason?: string } {
  const { auth, existingData, incomingData } = context;

  // Primitive: isAuthenticated()
  const isAuthenticated = auth !== null && auth.uid !== null && typeof auth.uid === "string" && auth.uid.length > 0;
  if (!isAuthenticated) {
    return { allowed: false, reason: "Unauthenticated request" };
  }

  const email = (auth?.email || "").toLowerCase().trim();
  const isSuperAdmin = isAuthenticated && email === "ravieadagale@gmail.com";
  const isAdmin = isAuthenticated && email === "ravii.adagale20@gmail.com";
  const isStaffAdmin = isSuperAdmin || isAdmin;

  // Actor authorization check
  const isOwner = existingData.clientId === auth!.uid;
  const isConsultantUid = existingData.consultantId === auth!.uid;
  const isConsultantEmail = (existingData.consultantEmail || "").toLowerCase() === email;
  const isAuthorizedActor = isOwner || isConsultantUid || isConsultantEmail || isStaffAdmin;

  if (!isAuthorizedActor) {
    return { allowed: false, reason: "Caller is not authorized to update this consultation" };
  }

  // Field immutability checks
  if (incomingData.clientId !== existingData.clientId) {
    return { allowed: false, reason: "clientId is immutable" };
  }
  if (incomingData.consultantId !== existingData.consultantId) {
    return { allowed: false, reason: "consultantId is immutable" };
  }
  if (incomingData.createdAt !== existingData.createdAt) {
    return { allowed: false, reason: "createdAt is immutable" };
  }
  if (incomingData.originalPrice?.amountMinor !== existingData.originalPrice?.amountMinor) {
    return { allowed: false, reason: "originalPrice.amountMinor is immutable" };
  }
  if (incomingData.originalPrice?.currency !== existingData.originalPrice?.currency) {
    return { allowed: false, reason: "originalPrice.currency is immutable" };
  }

  // Payment Status Invariant:
  // (existing().paymentStatus == "PAID" && incoming().paymentStatus == "PAID") ||
  // (existing().paymentStatus != "PAID" && incoming().paymentStatus != "PAID")
  const bothPaid = existingData.paymentStatus === "PAID" && incomingData.paymentStatus === "PAID";
  const bothNotPaid = existingData.paymentStatus !== "PAID" && incomingData.paymentStatus !== "PAID";

  if (!bothPaid && !bothNotPaid) {
    return {
      allowed: false,
      reason: "Payment status invariant violated: client cannot transition to PAID or tamper with verified payment",
    };
  }

  return { allowed: true };
}

describe("Task 1 Security Audit & Hardening — Firestore paymentStatus Authorization Bypass Closure", () => {
  const baseExistingBooking: Record<string, any> = {
    id: "booking-sec-101",
    clientId: "customer-uid-1",
    clientEmail: "customer1@example.com",
    consultantId: "consultant-uid-1",
    consultantEmail: "consultant1@dev-guru.com",
    createdAt: "2026-10-15T12:00:00.000Z",
    updatedAt: "2026-10-15T12:00:00.000Z",
    status: "CONFIRMED",
    paymentStatus: "PENDING",
    serviceId: "srv-vedic-1",
    originalPrice: {
      amountMinor: 250000,
      currency: "INR",
    },
  };

  const adminAuth = { uid: "admin-uid-1", email: "ravii.adagale20@gmail.com" };
  const superAdminAuth = { uid: "super-admin-uid-1", email: "ravieadagale@gmail.com" };
  const customerAuth = { uid: "customer-uid-1", email: "customer1@example.com" };
  const consultantAuth = { uid: "consultant-uid-1", email: "consultant1@dev-guru.com" };
  const unauthorizedAuth = { uid: "random-attacker-99", email: "attacker@malicious.com" };

  describe("1. Static Inspection of firestore.rules", () => {
    it("verifies firestore.rules contains the hardened paymentStatus invariant without Admin/SuperAdmin bypass", () => {
      const rulesContent = fs.readFileSync(path.resolve(process.cwd(), "firestore.rules"), "utf-8");
      
      // Verify match /consultations/{bookingId} block exists
      expect(rulesContent).toContain("match /consultations/{bookingId}");

      // Verify the invariant: direct client writes can NEVER set paymentStatus to PAID
      expect(rulesContent).toContain('(existing().paymentStatus == "PAID" && incoming().paymentStatus == "PAID")');
      expect(rulesContent).toContain('(existing().paymentStatus != "PAID" && incoming().paymentStatus != "PAID")');

      // Verify old bypasses (isAdmin() || isSuperAdmin() as top-level bypass for update) are REMOVED from allow update
      const updateRuleBlock = rulesContent.substring(
        rulesContent.indexOf("allow update: if isAuthenticated()"),
        rulesContent.indexOf("allow delete: if false;")
      );
      expect(updateRuleBlock).not.toMatch(/allow update: if isAuthenticated\(\) && \(\s*(isSuperAdmin\(\) \|\|\s*isAdmin\(\) \|\|)/);
    });
  });

  describe("2. Security Invariant 1 — Configured ADMIN cannot directly set unpaid consultation to PAID", () => {
    it("strictly blocks ADMIN from updating paymentStatus from PENDING to PAID", () => {
      const incomingData = {
        ...baseExistingBooking,
        paymentStatus: "PAID",
      };

      const result = evaluateConsultationUpdateRule({
        auth: adminAuth,
        existingData: baseExistingBooking,
        incomingData,
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain("Payment status invariant violated");
    });

    it("strictly blocks ADMIN from updating paymentStatus from PAYMENT_NOT_CONNECTED to PAID", () => {
      const existingNotConnected = {
        ...baseExistingBooking,
        paymentStatus: "PAYMENT_NOT_CONNECTED",
      };
      const incomingData = {
        ...existingNotConnected,
        paymentStatus: "PAID",
      };

      const result = evaluateConsultationUpdateRule({
        auth: adminAuth,
        existingData: existingNotConnected,
        incomingData,
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain("Payment status invariant violated");
    });
  });

  describe("3. Security Invariant 2 — Ordinary Authenticated Customer cannot set PAID", () => {
    it("strictly blocks customer owner from setting their own booking to PAID", () => {
      const incomingData = {
        ...baseExistingBooking,
        paymentStatus: "PAID",
      };

      const result = evaluateConsultationUpdateRule({
        auth: customerAuth,
        existingData: baseExistingBooking,
        incomingData,
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain("Payment status invariant violated");
    });
  });

  describe("4. Security Invariant 3 — Consultant cannot set PAID through client write", () => {
    it("strictly blocks assigned consultant from setting booking to PAID", () => {
      const incomingData = {
        ...baseExistingBooking,
        paymentStatus: "PAID",
      };

      const result = evaluateConsultationUpdateRule({
        auth: consultantAuth,
        existingData: baseExistingBooking,
        incomingData,
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain("Payment status invariant violated");
    });

    it("strictly blocks Super Admin from setting booking to PAID via client write", () => {
      const incomingData = {
        ...baseExistingBooking,
        paymentStatus: "PAID",
      };

      const result = evaluateConsultationUpdateRule({
        auth: superAdminAuth,
        existingData: baseExistingBooking,
        incomingData,
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain("Payment status invariant violated");
    });
  });

  describe("5. Security Invariant 4 — Alternative update shapes & field tampering are blocked", () => {
    it("blocks Admin from altering immutable fields (clientId, consultantId, createdAt, originalPrice)", () => {
      // Tampering with price
      const priceTampering = {
        ...baseExistingBooking,
        originalPrice: { amountMinor: 100, currency: "INR" },
      };
      expect(
        evaluateConsultationUpdateRule({
          auth: adminAuth,
          existingData: baseExistingBooking,
          incomingData: priceTampering,
        }).allowed
      ).toBe(false);

      // Tampering with clientId
      const clientTampering = {
        ...baseExistingBooking,
        clientId: "stolen-client-id",
      };
      expect(
        evaluateConsultationUpdateRule({
          auth: adminAuth,
          existingData: baseExistingBooking,
          incomingData: clientTampering,
        }).allowed
      ).toBe(false);

      // Tampering with createdAt
      const createdAtTampering = {
        ...baseExistingBooking,
        createdAt: "2020-01-01T00:00:00.000Z",
      };
      expect(
        evaluateConsultationUpdateRule({
          auth: adminAuth,
          existingData: baseExistingBooking,
          incomingData: createdAtTampering,
        }).allowed
      ).toBe(false);
    });

    it("blocks unauthorized 3rd parties from any updates regardless of fields", () => {
      const validTransition = {
        ...baseExistingBooking,
        status: "IN_PROGRESS",
      };
      expect(
        evaluateConsultationUpdateRule({
          auth: unauthorizedAuth,
          existingData: baseExistingBooking,
          incomingData: validTransition,
        }).allowed
      ).toBe(false);
    });
  });

  describe("6. Legitimate Lifecycle Operations continue to work for authorized callers", () => {
    it("allows consultant or Admin to transition status to IN_PROGRESS when paymentStatus is preserved", () => {
      const validInProgress = {
        ...baseExistingBooking,
        status: "IN_PROGRESS",
        updatedAt: "2026-10-15T12:30:00.000Z",
      };

      const consultantResult = evaluateConsultationUpdateRule({
        auth: consultantAuth,
        existingData: baseExistingBooking,
        incomingData: validInProgress,
      });
      expect(consultantResult.allowed).toBe(true);

      const adminResult = evaluateConsultationUpdateRule({
        auth: adminAuth,
        existingData: baseExistingBooking,
        incomingData: validInProgress,
      });
      expect(adminResult.allowed).toBe(true);
    });

    it("allows customer to cancel booking with CANCELLED_BY_CLIENT without altering paymentStatus", () => {
      const clientCancel = {
        ...baseExistingBooking,
        status: "CANCELLED_BY_CLIENT",
        updatedAt: "2026-10-15T12:15:00.000Z",
      };

      const result = evaluateConsultationUpdateRule({
        auth: customerAuth,
        existingData: baseExistingBooking,
        incomingData: clientCancel,
      });
      expect(result.allowed).toBe(true);
    });

    it("allows updating an already verified PAID booking without unsetting PAID", () => {
      const existingPaidBooking = {
        ...baseExistingBooking,
        paymentStatus: "PAID",
      };

      const completedPaidBooking = {
        ...existingPaidBooking,
        status: "COMPLETED",
        updatedAt: "2026-10-15T13:00:00.000Z",
      };

      const result = evaluateConsultationUpdateRule({
        auth: consultantAuth,
        existingData: existingPaidBooking,
        incomingData: completedPaidBooking,
      });
      expect(result.allowed).toBe(true);
    });

    it("blocks tampering that unsets or corrupts an already verified PAID booking", () => {
      const existingPaidBooking = {
        ...baseExistingBooking,
        paymentStatus: "PAID",
      };

      const corruptedUnset = {
        ...existingPaidBooking,
        paymentStatus: "PENDING",
      };

      const result = evaluateConsultationUpdateRule({
        auth: adminAuth,
        existingData: existingPaidBooking,
        incomingData: corruptedUnset,
      });
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain("Payment status invariant violated");
    });
  });

  describe("7. Super Admin / Admin Role Separation Integrity", () => {
    it("confirms ravieadagale@gmail.com is strictly Super Admin", () => {
      expect(isSuperAdminEmail("ravieadagale@gmail.com")).toBe(true);
      expect(resolveRoleFromEmail("ravieadagale@gmail.com")).toBe("SUPER_ADMIN");
    });

    it("confirms ravii.adagale20@gmail.com is strictly Admin without Super Admin privileges", () => {
      expect(isAdminEmail("ravii.adagale20@gmail.com")).toBe(true);
      expect(isSuperAdminEmail("ravii.adagale20@gmail.com")).toBe(false);
      expect(resolveRoleFromEmail("ravii.adagale20@gmail.com")).toBe("ADMIN");
    });
  });

  describe("8. Task 2 Verification — Client-Side Simulated Payment Action Removal", () => {
    it("verifies ConsultationDetailModal.tsx does NOT render simulated payment button or invoke completePayment", () => {
      const modalSource = fs.readFileSync(
        path.resolve(process.cwd(), "src/components/consultation/ConsultationDetailModal.tsx"),
        "utf-8"
      );

      // Verify the simulated payment button labels are completely absent
      expect(modalSource).not.toContain("Pay Honorarium Now");
      expect(modalSource).not.toContain("Settling Honorarium...");

      // Verify completePayment is not imported or called from useConsultation in ConsultationDetailModal
      expect(modalSource).not.toMatch(/useConsultation\(\)[^;]*completePayment/);
      expect(modalSource).not.toContain("completePayment(");

      // Verify actual booking payment status display remains intact
      expect(modalSource).toContain("Payment: {booking.paymentStatus}");

      // Verify payment plan and 20% advance discount policy remain intact
      expect(modalSource).toContain("Pay in Full (20% Advance Discount)");
      expect(modalSource).toContain("PAY_IN_FULL_NOW");

      // Verify operational gate notice remains visible
      expect(modalSource).toContain(
        "Operational Gate: Full payment requirement must be satisfied before this session can enter in-progress."
      );
    });
  });

  describe("9. Task 3B Verification — Safe Reacquisition of Released Slot Locks", () => {
    /**
     * Pure evaluator modeling the exact AST logic defined in `firestore.rules`
     * for `/slotLocks/{lockId}` updates.
     */
    function evaluateSlotLockUpdateRule(context: {
      auth: { uid: string | null; email?: string | null } | null;
      existingData: Record<string, any>;
      incomingData: Record<string, any>;
    }): { allowed: boolean; reason?: string } {
      const { auth, existingData, incomingData } = context;

      const isAuthenticated =
        auth !== null && auth.uid !== null && typeof auth.uid === "string" && auth.uid.length > 0;
      if (!isAuthenticated) {
        return { allowed: false, reason: "Unauthenticated request" };
      }

      const email = (auth?.email || "").toLowerCase().trim();
      const isSuperAdmin = isAuthenticated && email === "ravieadagale@gmail.com";
      const isAdmin = isAuthenticated && email === "ravii.adagale20@gmail.com";
      const isStaffAdmin = isSuperAdmin || isAdmin;

      // Path 1: Current lock owner, assigned consultant, or staff admin releasing/cancelling lock
      const isOwner = existingData.clientId === auth!.uid;
      const isConsultant = existingData.consultantId === auth!.uid;
      const isActorAuthorized = isOwner || isConsultant || isStaffAdmin;
      const isClientIdPreserved = incomingData.clientId === existingData.clientId;
      const isConsultantPreservedPath1 = incomingData.consultantId === existingData.consultantId;
      const isStartTimePreservedPath1 = incomingData.startTime === existingData.startTime;
      const isEndTimePreservedPath1 = incomingData.endTime === existingData.endTime;
      const isStatusValidReleaseOrCancel =
        incomingData.status === "RELEASED" || incomingData.status === "CANCELLED";

      const path1Allowed =
        isActorAuthorized &&
        isClientIdPreserved &&
        isConsultantPreservedPath1 &&
        isStartTimePreservedPath1 &&
        isEndTimePreservedPath1 &&
        isStatusValidReleaseOrCancel;

      // Path 2: Legitimate reacquisition of a released lock by an authenticated seeker
      const isReleasedOrCancelled =
        existingData.status === "RELEASED" || existingData.status === "CANCELLED";
      const isNewOwnerSelf = incomingData.clientId === auth!.uid;
      const isStatusReserved = incomingData.status === "RESERVED";
      const isConsultantPreserved = incomingData.consultantId === existingData.consultantId;
      const isStartTimePreserved = incomingData.startTime === existingData.startTime;
      const isEndTimePreserved = incomingData.endTime === existingData.endTime;

      const path2Allowed =
        isReleasedOrCancelled &&
        isNewOwnerSelf &&
        isStatusReserved &&
        isConsultantPreserved &&
        isStartTimePreserved &&
        isEndTimePreserved;

      if (!path1Allowed && !path2Allowed) {
        return {
          allowed: false,
          reason: "Unauthorized slotLock update: caller cannot overwrite active lock or alter identity fields",
        };
      }

      return { allowed: true };
    }

    const clientAAuth = { uid: "client-a-uid", email: "clientA@example.com" };
    const clientBAuth = { uid: "client-b-uid", email: "clientB@example.com" };
    const consultantAuth = { uid: "consultant-uid-1", email: "consultant1@dev-guru.com" };

    const activeLockClientA: Record<string, any> = {
      lockId: "cons-1_29871234",
      bookingId: "bk-clientA-1",
      consultantId: "consultant-uid-1",
      clientId: "client-a-uid",
      startTime: "2026-10-21T04:30:00.000Z",
      endTime: "2026-10-21T05:30:00.000Z",
      status: "RESERVED",
    };

    const releasedLockClientA: Record<string, any> = {
      ...activeLockClientA,
      status: "RELEASED",
    };

    const cancelledLockClientA: Record<string, any> = {
      ...activeLockClientA,
      status: "CANCELLED",
    };

    it("verifies firestore.rules contains the Path 2 reacquisition logic in match /slotLocks/{lockId}", () => {
      const rulesContent = fs.readFileSync(path.resolve(process.cwd(), "firestore.rules"), "utf-8");
      expect(rulesContent).toContain("match /slotLocks/{lockId}");
      expect(rulesContent).toContain('(existing().status == "RELEASED" || existing().status == "CANCELLED")');
      expect(rulesContent).toContain('incoming().clientId == request.auth.uid');
      expect(rulesContent).toContain('incoming().status == "RESERVED"');
      expect(rulesContent).toContain('incoming().consultantId == existing().consultantId');
      expect(rulesContent).toContain('incoming().startTime == existing().startTime');
      expect(rulesContent).toContain('incoming().endTime == existing().endTime');
      expect(rulesContent).toContain('incoming().clientId == existing().clientId');
      expect(rulesContent).toContain('(incoming().status in ["RELEASED", "CANCELLED"])');
    });

    it("allows authenticated Client B to reacquire a RELEASED lock", () => {
      const incomingClientB = {
        ...releasedLockClientA,
        bookingId: "bk-clientB-2",
        clientId: "client-b-uid",
        status: "RESERVED",
      };

      const result = evaluateSlotLockUpdateRule({
        auth: clientBAuth,
        existingData: releasedLockClientA,
        incomingData: incomingClientB,
      });

      expect(result.allowed).toBe(true);
    });

    it("allows authenticated Client B to reacquire a CANCELLED lock", () => {
      const incomingClientB = {
        ...cancelledLockClientA,
        bookingId: "bk-clientB-2",
        clientId: "client-b-uid",
        status: "RESERVED",
      };

      const result = evaluateSlotLockUpdateRule({
        auth: clientBAuth,
        existingData: cancelledLockClientA,
        incomingData: incomingClientB,
      });

      expect(result.allowed).toBe(true);
    });

    it("blocks Client B from overwriting Client A's active RESERVED lock", () => {
      const incomingClientB = {
        ...activeLockClientA,
        bookingId: "bk-clientB-attack",
        clientId: "client-b-uid",
        status: "RESERVED",
      };

      const result = evaluateSlotLockUpdateRule({
        auth: clientBAuth,
        existingData: activeLockClientA,
        incomingData: incomingClientB,
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain("Unauthorized slotLock update");
    });

    it("blocks Client B from taking over an active lock by spoofing clientId as Client A", () => {
      const incomingSpoofed = {
        ...activeLockClientA,
        bookingId: "bk-stolen",
        // Client B tries to keep clientId as Client A but update the lock
      };

      const result = evaluateSlotLockUpdateRule({
        auth: clientBAuth,
        existingData: activeLockClientA,
        incomingData: incomingSpoofed,
      });

      expect(result.allowed).toBe(false);
    });

    it("blocks Client B from altering protected consultantId on reacquisition", () => {
      const incomingTamperedConsultant = {
        ...releasedLockClientA,
        bookingId: "bk-clientB-2",
        clientId: "client-b-uid",
        consultantId: "tampered-consultant-id",
        status: "RESERVED",
      };

      const result = evaluateSlotLockUpdateRule({
        auth: clientBAuth,
        existingData: releasedLockClientA,
        incomingData: incomingTamperedConsultant,
      });

      expect(result.allowed).toBe(false);
    });

    it("blocks Client B from altering protected startTime or endTime on reacquisition", () => {
      const incomingTamperedTime = {
        ...releasedLockClientA,
        bookingId: "bk-clientB-2",
        clientId: "client-b-uid",
        startTime: "2026-10-21T06:00:00.000Z",
        status: "RESERVED",
      };

      const result = evaluateSlotLockUpdateRule({
        auth: clientBAuth,
        existingData: releasedLockClientA,
        incomingData: incomingTamperedTime,
      });

      expect(result.allowed).toBe(false);
    });

    it("blocks unauthenticated users from reacquiring a released lock", () => {
      const incomingUnauth = {
        ...releasedLockClientA,
        bookingId: "bk-unauth",
        clientId: "client-b-uid",
        status: "RESERVED",
      };

      const result = evaluateSlotLockUpdateRule({
        auth: null,
        existingData: releasedLockClientA,
        incomingData: incomingUnauth,
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain("Unauthenticated request");
    });

    it("allows original lock owner (Client A) to release their active lock on cancellation", () => {
      const clientARelease = {
        ...activeLockClientA,
        status: "RELEASED",
      };

      const result = evaluateSlotLockUpdateRule({
        auth: clientAAuth,
        existingData: activeLockClientA,
        incomingData: clientARelease,
      });

      expect(result.allowed).toBe(true);
    });

    it("allows original lock owner (Client A) to cancel their active lock with CANCELLED", () => {
      const clientACancel = {
        ...activeLockClientA,
        status: "CANCELLED",
      };

      const result = evaluateSlotLockUpdateRule({
        auth: clientAAuth,
        existingData: activeLockClientA,
        incomingData: clientACancel,
      });

      expect(result.allowed).toBe(true);
    });

    it("allows assigned consultant to release an active lock on decline", () => {
      const consultantRelease = {
        ...activeLockClientA,
        status: "RELEASED",
      };

      const result = evaluateSlotLockUpdateRule({
        auth: consultantAuth,
        existingData: activeLockClientA,
        incomingData: consultantRelease,
      });

      expect(result.allowed).toBe(true);
    });

    it("allows staff admin to release an active lock on cancellation", () => {
      const adminAuth = { uid: "admin-uid-1", email: "ravii.adagale20@gmail.com" };
      const adminRelease = {
        ...activeLockClientA,
        status: "RELEASED",
      };

      const result = evaluateSlotLockUpdateRule({
        auth: adminAuth,
        existingData: activeLockClientA,
        incomingData: adminRelease,
      });

      expect(result.allowed).toBe(true);
    });

    it("blocks lock owner from altering clientId on Path 1", () => {
      const ownerTamperedClient = {
        ...activeLockClientA,
        clientId: "stolen-client-uid",
        status: "RELEASED",
      };

      const result = evaluateSlotLockUpdateRule({
        auth: clientAAuth,
        existingData: activeLockClientA,
        incomingData: ownerTamperedClient,
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain("Unauthorized slotLock update");
    });

    it("blocks lock owner from altering consultantId on Path 1", () => {
      const ownerTamperedConsultant = {
        ...activeLockClientA,
        consultantId: "tampered-consultant-uid",
        status: "RELEASED",
      };

      const result = evaluateSlotLockUpdateRule({
        auth: clientAAuth,
        existingData: activeLockClientA,
        incomingData: ownerTamperedConsultant,
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain("Unauthorized slotLock update");
    });

    it("blocks lock owner from altering startTime or endTime on Path 1", () => {
      const ownerTamperedTime = {
        ...activeLockClientA,
        startTime: "2026-10-21T07:00:00.000Z",
        status: "RELEASED",
      };

      const result = evaluateSlotLockUpdateRule({
        auth: clientAAuth,
        existingData: activeLockClientA,
        incomingData: ownerTamperedTime,
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain("Unauthorized slotLock update");
    });

    it("blocks assigned consultant from altering protected identity or slot fields on Path 1", () => {
      const consultantTampered = {
        ...activeLockClientA,
        clientId: "different-client-uid",
        status: "RELEASED",
      };

      const result = evaluateSlotLockUpdateRule({
        auth: consultantAuth,
        existingData: activeLockClientA,
        incomingData: consultantTampered,
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain("Unauthorized slotLock update");
    });

    it("blocks staff admin from altering protected identity or slot fields on Path 1", () => {
      const adminAuth = { uid: "admin-uid-1", email: "ravii.adagale20@gmail.com" };
      const adminTampered = {
        ...activeLockClientA,
        startTime: "2026-10-21T09:00:00.000Z",
        status: "RELEASED",
      };

      const result = evaluateSlotLockUpdateRule({
        auth: adminAuth,
        existingData: activeLockClientA,
        incomingData: adminTampered,
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain("Unauthorized slotLock update");
    });

    it("blocks unexpected status transitions on Path 1 (e.g. PENDING, CONFIRMED, TRANSFERRED)", () => {
      const invalidStatusUpdate = {
        ...activeLockClientA,
        status: "CONFIRMED", // Illegal status on slot lock update
      };

      const result = evaluateSlotLockUpdateRule({
        auth: clientAAuth,
        existingData: activeLockClientA,
        incomingData: invalidStatusUpdate,
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain("Unauthorized slotLock update");
    });
  });
});
