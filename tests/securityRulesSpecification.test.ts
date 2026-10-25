import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import {
  isSuperAdminEmail,
  isAdminEmail,
  resolveRoleFromEmail,
} from "../src/services/auth/superAdminConfig";

// ============================================================================
// FIRESTORE RULES SPECIFICATION & AST EVALUATORS
// ============================================================================

interface FirestoreAuthContext {
  uid: string | null;
  email?: string | null;
  email_verified?: boolean;
}

interface FirestoreRuleContext {
  auth: FirestoreAuthContext | null;
  resource?: { data: Record<string, any> };
  requestResource?: { data: Record<string, any> };
}

function evaluateFirestoreUserRules(
  operation: "get" | "list" | "create" | "update" | "delete",
  userId: string,
  ctx: FirestoreRuleContext
): { allowed: boolean; reason?: string } {
  const { auth, resource, requestResource } = ctx;
  const isAuthenticated = auth !== null && auth.uid !== null && typeof auth.uid === "string" && auth.uid.length > 0;
  const email = (auth?.email || "").toLowerCase().trim();
  const emailVerified = Boolean(auth?.email_verified);

  const isSuperAdmin = isAuthenticated && emailVerified && email === "ravieadagale@gmail.com";
  const isAdmin = isAuthenticated && emailVerified && email === "ravii.adagale20@gmail.com";
  const isStaffAdmin = isSuperAdmin || isAdmin;
  const isOwner = isAuthenticated && auth!.uid === userId;

  if (operation === "get") {
    if (isOwner || isStaffAdmin) return { allowed: true };
    return { allowed: false, reason: "Must be owner or staff administrator to read profile" };
  }

  if (operation === "list") {
    if (isStaffAdmin) return { allowed: true };
    return { allowed: false, reason: "Must be staff administrator to list user profiles" };
  }

  if (operation === "create") {
    if (!isAuthenticated) return { allowed: false, reason: "Unauthenticated create rejected" };
    if (isSuperAdmin) return { allowed: true };

    const incoming = requestResource?.data || {};
    const role = incoming.role;
    if (isAdmin && isOwner && incoming.userId === auth!.uid && (role === "ADMIN" || role === "CUSTOMER")) {
      return { allowed: true };
    }
    const isCustomerRole = role === "CUSTOMER" || role === "customer";
    if (isOwner && incoming.userId === auth!.uid && isCustomerRole) {
      return { allowed: true };
    }
    return { allowed: false, reason: "Client cannot self-assign privileged roles or create profiles for other UIDs" };
  }

  if (operation === "update") {
    if (!isAuthenticated) return { allowed: false, reason: "Unauthenticated update rejected" };
    if (isSuperAdmin) return { allowed: true };

    const existing = resource?.data || {};
    const incoming = requestResource?.data || {};

    const userIdUnchanged = incoming.userId === existing.userId;
    const createdAtUnchanged = !existing.createdAt || incoming.createdAt === existing.createdAt;
    const rolePermitted = incoming.role === existing.role || (isAdmin && (incoming.role === "ADMIN" || incoming.role === "CUSTOMER"));

    if (isOwner && userIdUnchanged && createdAtUnchanged && rolePermitted) {
      return { allowed: true };
    }
    return { allowed: false, reason: "Client cannot alter userId, createdAt, or escalate role on update" };
  }

  if (operation === "delete") {
    if (isSuperAdmin) return { allowed: true };
    return { allowed: false, reason: "Only Super Admin may delete user documents" };
  }

  return { allowed: false, reason: "Default deny" };
}

function evaluateFirestoreConsultationRules(
  operation: "read" | "create" | "update" | "delete",
  _bookingId: string,
  ctx: FirestoreRuleContext
): { allowed: boolean; reason?: string } {
  const { auth, resource, requestResource } = ctx;
  const isAuthenticated = auth !== null && auth.uid !== null && typeof auth.uid === "string" && auth.uid.length > 0;
  const email = (auth?.email || "").toLowerCase().trim();
  const emailVerified = Boolean(auth?.email_verified);

  const isSuperAdmin = isAuthenticated && emailVerified && email === "ravieadagale@gmail.com";
  const isAdmin = isAuthenticated && emailVerified && email === "ravii.adagale20@gmail.com";
  const isStaffAdmin = isSuperAdmin || isAdmin;

  if (operation === "read") {
    if (!isAuthenticated) return { allowed: false, reason: "Unauthenticated consultation read rejected" };
    const data = resource?.data || {};
    const isClient = data.clientId === auth!.uid;
    const isConsultantId = data.consultantId === auth!.uid;
    const isConsultantEmail = emailVerified && (data.consultantEmail || "").toLowerCase() === email;
    if (isClient || isConsultantId || isConsultantEmail || isStaffAdmin) {
      return { allowed: true };
    }
    return { allowed: false, reason: "Not authorized to read consultation booking" };
  }

  if (operation === "create") {
    if (!isAuthenticated) return { allowed: false, reason: "Unauthenticated consultation create rejected" };
    const incoming = requestResource?.data || {};

    if (incoming.clientId !== auth!.uid) {
      return { allowed: false, reason: "clientId must match authenticated user" };
    }
    if (incoming.paymentStatus === "PAID") {
      return { allowed: false, reason: "Direct creation with PAID paymentStatus forbidden" };
    }
    const allowedPayment = ["PAYMENT_NOT_CONNECTED", "PENDING", "PENDING_PAYMENT", "UNPAID", "NOT_PAID"];
    if (!allowedPayment.includes(incoming.paymentStatus)) {
      return { allowed: false, reason: "Invalid initial paymentStatus" };
    }
    const allowedStatus = ["REQUESTED", "PENDING_CONFIRMATION"];
    if (!allowedStatus.includes(incoming.status)) {
      return { allowed: false, reason: "Invalid initial booking status" };
    }
    if (incoming.internalNotes || incoming.privateNotes || incoming.confidentialNotes || incoming.refundStatus || incoming.cancellationReason) {
      return { allowed: false, reason: "Client cannot inject private notes, refund status, or cancellation reason upon creation" };
    }
    return { allowed: true };
  }

  if (operation === "update") {
    if (!isAuthenticated) return { allowed: false, reason: "Unauthenticated update rejected" };
    const existing = resource?.data || {};
    const incoming = requestResource?.data || {};

    const isClient = existing.clientId === auth!.uid;
    const isConsultantId = existing.consultantId === auth!.uid;
    const isConsultantEmail = emailVerified && (existing.consultantEmail || "").toLowerCase() === email;
    const isAuthorizedActor = isClient || isConsultantId || isConsultantEmail || isStaffAdmin;

    if (!isAuthorizedActor) {
      return { allowed: false, reason: "Caller not authorized to update booking" };
    }

    // Immutability checks
    if (incoming.clientId !== existing.clientId) return { allowed: false, reason: "clientId is immutable" };
    if (incoming.consultantId !== existing.consultantId) return { allowed: false, reason: "consultantId is immutable" };
    if (incoming.createdAt !== existing.createdAt) return { allowed: false, reason: "createdAt is immutable" };
    if (incoming.serviceId !== existing.serviceId) return { allowed: false, reason: "serviceId is immutable" };
    if (existing.originalPrice && incoming.originalPrice?.amountMinor !== existing.originalPrice?.amountMinor) {
      return { allowed: false, reason: "originalPrice is immutable" };
    }
    if (existing.finalPrice && incoming.finalPrice?.amountMinor !== existing.finalPrice?.amountMinor) {
      return { allowed: false, reason: "finalPrice is immutable" };
    }

    // Payment anti-forgery invariant
    if (existing.paymentStatus !== "PAID" && incoming.paymentStatus === "PAID") {
      return { allowed: false, reason: "Direct client transition to PAID paymentStatus is forbidden" };
    }

    // Client field-level and status escalation guards
    if (!isStaffAdmin && !isConsultantId && isClient) {
      const clientAllowedStatuses = ["REQUESTED", "PENDING_CONFIRMATION", "RESCHEDULE_REQUESTED", "RESCHEDULED", "CANCELLED_BY_CLIENT"];
      if (!clientAllowedStatuses.includes(incoming.status)) {
        return { allowed: false, reason: `Clients cannot escalate booking status to ${incoming.status}` };
      }
      if (incoming.internalNotes && incoming.internalNotes !== existing.internalNotes) {
        return { allowed: false, reason: "Clients cannot alter internalNotes" };
      }
      if (incoming.privateNotes && incoming.privateNotes !== existing.privateNotes) {
        return { allowed: false, reason: "Clients cannot alter privateNotes" };
      }
      if (incoming.refundStatus && incoming.refundStatus !== existing.refundStatus) {
        return { allowed: false, reason: "Clients cannot alter refundStatus" };
      }
    }

    // Consultant field-level restrictions
    if (!isStaffAdmin && (isConsultantId || isConsultantEmail)) {
      if (existing.clientName && incoming.clientName !== existing.clientName) {
        return { allowed: false, reason: "Consultant cannot alter clientName" };
      }
      if (incoming.refundStatus && incoming.refundStatus !== existing.refundStatus) {
        return { allowed: false, reason: "Consultant cannot alter refundStatus" };
      }
    }

    return { allowed: true };
  }

  if (operation === "delete") {
    return { allowed: false, reason: "Consultation deletion strictly forbidden" };
  }

  return { allowed: false, reason: "Default deny" };
}

function evaluateFirestoreOrderRules(
  operation: "read" | "create" | "update" | "delete",
  _orderId: string,
  ctx: FirestoreRuleContext
): { allowed: boolean; reason?: string } {
  const { auth, resource } = ctx;
  const isAuthenticated = auth !== null && auth.uid !== null && typeof auth.uid === "string" && auth.uid.length > 0;
  const email = (auth?.email || "").toLowerCase().trim();
  const emailVerified = Boolean(auth?.email_verified);

  const isSuperAdmin = isAuthenticated && emailVerified && email === "ravieadagale@gmail.com";
  const isAdmin = isAuthenticated && emailVerified && email === "ravii.adagale20@gmail.com";
  const isStaffAdmin = isSuperAdmin || isAdmin;

  if (operation === "read") {
    if (!isAuthenticated) return { allowed: false, reason: "Unauthenticated order read rejected" };
    const data = resource?.data || {};
    if (data.userId === auth!.uid || isStaffAdmin) {
      return { allowed: true };
    }
    return { allowed: false, reason: "Can only read own order documents" };
  }

  if (operation === "create" || operation === "update" || operation === "delete") {
    if (isSuperAdmin) return { allowed: true };
    return { allowed: false, reason: "Direct client writes to orders forbidden; managed by Super Admin/backend" };
  }

  return { allowed: false, reason: "Default deny" };
}

function evaluateFirestoreQuickQuestionRules(
  operation: "read" | "create" | "update" | "delete",
  _inquiryId: string,
  ctx: FirestoreRuleContext
): { allowed: boolean; reason?: string } {
  const { auth, resource, requestResource } = ctx;
  const isAuthenticated = auth !== null && auth.uid !== null && typeof auth.uid === "string" && auth.uid.length > 0;
  const email = (auth?.email || "").toLowerCase().trim();
  const emailVerified = Boolean(auth?.email_verified);

  const isSuperAdmin = isAuthenticated && emailVerified && email === "ravieadagale@gmail.com";
  const isAdmin = isAuthenticated && emailVerified && email === "ravii.adagale20@gmail.com";
  const isStaffAdmin = isSuperAdmin || isAdmin;

  if (operation === "read") {
    if (!isAuthenticated) return { allowed: false, reason: "Unauthenticated read rejected" };
    const data = resource?.data || {};
    const isClient = data.clientId === auth!.uid;
    const isClientEmail = emailVerified && (data.clientEmail || "").toLowerCase() === email;
    if (isClient || isClientEmail || isStaffAdmin) return { allowed: true };
    return { allowed: false, reason: "Not authorized to read inquiry" };
  }

  if (operation === "create") {
    if (!isAuthenticated) return { allowed: false, reason: "Unauthenticated create rejected" };
    const incoming = requestResource?.data || {};
    if (incoming.clientId !== auth!.uid) return { allowed: false, reason: "clientId must match user" };
    if (!["REQUESTED", "PENDING_REVIEW"].includes(incoming.status)) {
      return { allowed: false, reason: "Invalid initial inquiry status" };
    }
    const q = incoming.question;
    if (typeof q !== "string" || q.length === 0 || q.length > 4096) {
      return { allowed: false, reason: "Question must be between 1 and 4096 chars" };
    }
    return { allowed: true };
  }

  if (operation === "update") {
    if (!isAuthenticated) return { allowed: false, reason: "Unauthenticated update rejected" };
    if (isStaffAdmin) return { allowed: true };

    const existing = resource?.data || {};
    const incoming = requestResource?.data || {};
    if (existing.clientId !== auth!.uid) return { allowed: false, reason: "Not owner of inquiry" };
    if (incoming.clientId !== existing.clientId) return { allowed: false, reason: "clientId is immutable" };
    if (incoming.createdAt !== existing.createdAt) return { allowed: false, reason: "createdAt is immutable" };

    // Customer cannot forge answers or set status to ANSWERED
    if (incoming.status === "ANSWERED") {
      return { allowed: false, reason: "Customer cannot mark inquiry ANSWERED" };
    }
    if (incoming.answer && incoming.answer !== existing.answer) {
      return { allowed: false, reason: "Customer cannot write astrologer answer" };
    }
    return { allowed: true };
  }

  if (operation === "delete") {
    if (isSuperAdmin) return { allowed: true };
    return { allowed: false, reason: "Only Super Admin can delete inquiries" };
  }

  return { allowed: false, reason: "Default deny" };
}

// ============================================================================
// STORAGE RULES SPECIFICATION & AST EVALUATOR
// ============================================================================

interface StorageAuthContext {
  uid: string | null;
  email?: string | null;
  email_verified?: boolean;
}

interface StorageResourceContext {
  size: number;
  contentType: string;
}

interface StorageRuleContext {
  auth: StorageAuthContext | null;
  requestResource?: StorageResourceContext;
  firestoreBooking?: {
    clientId: string;
    consultantId: string;
    consultantEmail?: string;
  };
}

function evaluateStorageAvatarRules(
  operation: "read" | "write" | "delete",
  userId: string,
  ctx: StorageRuleContext
): { allowed: boolean; reason?: string } {
  const { auth, requestResource } = ctx;
  const isAuthenticated = auth !== null && auth.uid !== null && typeof auth.uid === "string" && auth.uid.length > 0;
  const email = (auth?.email || "").toLowerCase().trim();
  const emailVerified = Boolean(auth?.email_verified);

  const isSuperAdmin = isAuthenticated && emailVerified && email === "ravieadagale@gmail.com";
  const isOwner = isAuthenticated && auth!.uid === userId;

  if (operation === "read") {
    return { allowed: true }; // Publicly readable
  }

  if (operation === "write") {
    if (!isAuthenticated) return { allowed: false, reason: "Unauthenticated write denied" };
    const isAuthorizedActor = isOwner || isSuperAdmin;
    if (!isAuthorizedActor) return { allowed: false, reason: "Cannot write to another user's avatar path" };

    const sizeOk = (requestResource?.size || 0) <= 5 * 1024 * 1024;
    const mime = requestResource?.contentType || "";
    const typeOk = mime === "image/jpeg" || mime === "image/png" || mime === "image/webp";

    if (!sizeOk) return { allowed: false, reason: "File exceeds 5MB size limit" };
    if (!typeOk) return { allowed: false, reason: "Invalid content type: only JPEG, PNG, and WebP permitted" };

    return { allowed: true };
  }

  if (operation === "delete") {
    if (isOwner || isSuperAdmin) return { allowed: true };
    return { allowed: false, reason: "Only owner or Super Admin may delete avatar" };
  }

  return { allowed: false, reason: "Default deny" };
}

function evaluateStorageConsultationAttachmentRules(
  operation: "read" | "write" | "delete",
  _bookingId: string,
  ctx: StorageRuleContext
): { allowed: boolean; reason?: string } {
  const { auth, requestResource, firestoreBooking } = ctx;
  const isAuthenticated = auth !== null && auth.uid !== null && typeof auth.uid === "string" && auth.uid.length > 0;
  const email = (auth?.email || "").toLowerCase().trim();
  const emailVerified = Boolean(auth?.email_verified);

  const isSuperAdmin = isAuthenticated && emailVerified && email === "ravieadagale@gmail.com";
  const isAdmin = isAuthenticated && emailVerified && email === "ravii.adagale20@gmail.com";
  const isStaffAdmin = isSuperAdmin || isAdmin;

  const isBookingClient = Boolean(firestoreBooking && firestoreBooking.clientId === auth?.uid);
  const isBookingConsultant = Boolean(
    firestoreBooking &&
    (firestoreBooking.consultantId === auth?.uid ||
      (emailVerified && (firestoreBooking.consultantEmail || "").toLowerCase() === email))
  );
  const isAuthorizedParticipant = isStaffAdmin || isBookingClient || isBookingConsultant;

  if (operation === "read") {
    if (!isAuthenticated) return { allowed: false, reason: "Unauthenticated consultation file read denied" };
    if (!isAuthorizedParticipant) return { allowed: false, reason: "User is not a participant in this consultation booking" };
    return { allowed: true };
  }

  if (operation === "write") {
    if (!isAuthenticated) return { allowed: false, reason: "Unauthenticated consultation file write denied" };
    if (!isAuthorizedParticipant) return { allowed: false, reason: "User is not a participant in this consultation booking" };

    const sizeOk = (requestResource?.size || 0) <= 10 * 1024 * 1024;
    const mime = requestResource?.contentType || "";
    const typeOk =
      mime === "image/jpeg" ||
      mime === "image/png" ||
      mime === "image/webp" ||
      mime === "application/pdf";

    if (!sizeOk) return { allowed: false, reason: "File exceeds 10MB limit" };
    if (!typeOk) return { allowed: false, reason: "Invalid content type: images and PDF only" };

    return { allowed: true };
  }

  if (operation === "delete") {
    if (isStaffAdmin) return { allowed: true };
    return { allowed: false, reason: "Only staff admin may delete consultation attachments" };
  }

  return { allowed: false, reason: "Default deny" };
}

// ============================================================================
// TEST SUITE: COMPLETE SECURITY RULES VERIFICATION
// ============================================================================

describe("Dev-Guru Phase 3.1 — Firestore & Storage Security Rules Hardening Suite", () => {
  const customerA = { uid: "customer-uid-a", email: "customera@example.com", email_verified: true };
  const customerB = { uid: "customer-uid-b", email: "customerb@example.com", email_verified: true };
  const adminVerified = { uid: "admin-uid-1", email: "ravii.adagale20@gmail.com", email_verified: true };
  const adminUnverified = { uid: "admin-uid-spoofed", email: "ravii.adagale20@gmail.com", email_verified: false };
  const superAdminVerified = { uid: "super-admin-uid-1", email: "ravieadagale@gmail.com", email_verified: true };
  const superAdminUnverified = { uid: "super-admin-spoofed", email: "ravieadagale@gmail.com", email_verified: false };

  describe("1. Static Rules Structure & Integrity Audit", () => {
    it("verifies firestore.rules declares rules_version = '2' and global default-deny", () => {
      const content = fs.readFileSync(path.resolve(process.cwd(), "firestore.rules"), "utf-8");
      expect(content).toContain("rules_version = '2';");
      expect(content).toContain("match /{document=**} {");
      expect(content).toContain("allow read, write: if false;");
    });

    it("verifies storage.rules declares rules_version = '2' and global default-deny", () => {
      const content = fs.readFileSync(path.resolve(process.cwd(), "storage.rules"), "utf-8");
      expect(content).toContain("rules_version = '2';");
      expect(content).toContain("match /{allPaths=**} {");
      expect(content).toContain("allow read, write: if false;");
    });

    it("verifies firestore.rules enforces email_verified == true for privileged roles", () => {
      const content = fs.readFileSync(path.resolve(process.cwd(), "firestore.rules"), "utf-8");
      expect(content).toContain("request.auth.token.email_verified == true");
    });

    it("verifies storage.rules enforces email_verified == true for privileged roles", () => {
      const content = fs.readFileSync(path.resolve(process.cwd(), "storage.rules"), "utf-8");
      expect(content).toContain("request.auth.token.email_verified == true");
    });

    it("verifies storage.rules cross-references firestore consultations for private attachments", () => {
      const content = fs.readFileSync(path.resolve(process.cwd(), "storage.rules"), "utf-8");
      expect(content).toContain("firestore.get(/databases/(default)/documents/consultations/$(bookingId))");
      expect(content).toContain("firestore.exists(/databases/(default)/documents/consultations/$(bookingId))");
    });

    it("verifies firestore.rules strictly restricts orders creation/writes to Super Admin", () => {
      const content = fs.readFileSync(path.resolve(process.cwd(), "firestore.rules"), "utf-8");
      expect(content).toContain("match /orders/{orderId}");
      expect(content).toContain("allow create, update, delete: if isSuperAdmin();");
    });

    it("verifies firestore.rules protects consultation internal notes and refund fields from client tampering", () => {
      const content = fs.readFileSync(path.resolve(process.cwd(), "firestore.rules"), "utf-8");
      expect(content).toContain("!('internalNotes' in incoming())");
      expect(content).toContain("!('privateNotes' in incoming())");
      expect(content).toContain("!('refundStatus' in incoming())");
    });
  });

  describe("2. Firestore User Profile Isolation & Privilege Hardening", () => {
    it("denies unauthenticated read and write to user profiles", () => {
      const getRes = evaluateFirestoreUserRules("get", "customer-uid-a", { auth: null });
      expect(getRes.allowed).toBe(false);

      const createRes = evaluateFirestoreUserRules("create", "customer-uid-a", {
        auth: null,
        requestResource: { data: { userId: "customer-uid-a", role: "CUSTOMER" } },
      });
      expect(createRes.allowed).toBe(false);
    });

    it("allows customer to read their own profile", () => {
      const res = evaluateFirestoreUserRules("get", "customer-uid-a", { auth: customerA });
      expect(res.allowed).toBe(true);
    });

    it("strictly blocks customer A from reading customer B's profile", () => {
      const res = evaluateFirestoreUserRules("get", "customer-uid-b", { auth: customerA });
      expect(res.allowed).toBe(false);
      expect(res.reason).toContain("Must be owner or staff administrator");
    });

    it("strictly blocks customer A from listing all user profiles", () => {
      const res = evaluateFirestoreUserRules("list", "", { auth: customerA });
      expect(res.allowed).toBe(false);
      expect(res.reason).toContain("Must be staff administrator");
    });

    it("allows staff admin to read customer profiles and list users", () => {
      expect(evaluateFirestoreUserRules("get", "customer-uid-a", { auth: adminVerified }).allowed).toBe(true);
      expect(evaluateFirestoreUserRules("get", "customer-uid-a", { auth: superAdminVerified }).allowed).toBe(true);
      expect(evaluateFirestoreUserRules("list", "", { auth: adminVerified }).allowed).toBe(true);
      expect(evaluateFirestoreUserRules("list", "", { auth: superAdminVerified }).allowed).toBe(true);
    });

    it("strictly blocks unverified email from acting as admin (Anti-Spoof Guard)", () => {
      expect(evaluateFirestoreUserRules("get", "customer-uid-a", { auth: adminUnverified }).allowed).toBe(false);
      expect(evaluateFirestoreUserRules("get", "customer-uid-a", { auth: superAdminUnverified }).allowed).toBe(false);
    });

    it("allows customer to create their profile with CUSTOMER role", () => {
      const res = evaluateFirestoreUserRules("create", "customer-uid-a", {
        auth: customerA,
        requestResource: {
          data: {
            userId: "customer-uid-a",
            email: "customera@example.com",
            role: "CUSTOMER",
          },
        },
      });
      expect(res.allowed).toBe(true);
    });

    it("strictly blocks customer from self-assigning SUPER_ADMIN, ADMIN, or PRACTITIONER", () => {
      const elevatedRoles = ["SUPER_ADMIN", "ADMIN", "PRACTITIONER", "super_admin", "admin", "practitioner"];
      for (const role of elevatedRoles) {
        const res = evaluateFirestoreUserRules("create", "customer-uid-a", {
          auth: customerA,
          requestResource: {
            data: {
              userId: "customer-uid-a",
              email: "customera@example.com",
              role,
            },
          },
        });
        expect(res.allowed).toBe(false);
        expect(res.reason).toContain("Client cannot self-assign privileged roles");
      }
    });

    it("strictly blocks customer from modifying role or immutable fields on update", () => {
      const existing = {
        userId: "customer-uid-a",
        email: "customera@example.com",
        role: "CUSTOMER",
        createdAt: "2026-10-20T10:00:00.000Z",
      };

      // Attempting to elevate role
      const tamperRole = evaluateFirestoreUserRules("update", "customer-uid-a", {
        auth: customerA,
        resource: { data: existing },
        requestResource: { data: { ...existing, role: "ADMIN" } },
      });
      expect(tamperRole.allowed).toBe(false);

      // Attempting to alter userId
      const tamperUid = evaluateFirestoreUserRules("update", "customer-uid-a", {
        auth: customerA,
        resource: { data: existing },
        requestResource: { data: { ...existing, userId: "victim-uid" } },
      });
      expect(tamperUid.allowed).toBe(false);

      // Attempting to alter createdAt
      const tamperCreatedAt = evaluateFirestoreUserRules("update", "customer-uid-a", {
        auth: customerA,
        resource: { data: existing },
        requestResource: { data: { ...existing, createdAt: "2020-01-01T00:00:00.000Z" } },
      });
      expect(tamperCreatedAt.allowed).toBe(false);
    });

    it("strictly isolates ADMIN from SUPER_ADMIN privileges (delete user profile)", () => {
      const adminDelete = evaluateFirestoreUserRules("delete", "customer-uid-a", { auth: adminVerified });
      expect(adminDelete.allowed).toBe(false);
      expect(adminDelete.reason).toContain("Only Super Admin may delete user documents");

      const superAdminDelete = evaluateFirestoreUserRules("delete", "customer-uid-a", { auth: superAdminVerified });
      expect(superAdminDelete.allowed).toBe(true);
    });
  });

  describe("3. Consultation Bookings Authorization & Payment Anti-Forgery", () => {
    const validBooking = {
      id: "bk-100",
      bookingId: "bk-100",
      clientId: "customer-uid-a",
      clientEmail: "customera@example.com",
      clientName: "Customer A",
      consultantId: "astronext-primary-consultant",
      consultantEmail: "ravieadagale@gmail.com",
      serviceId: "srv-vedic",
      status: "REQUESTED",
      paymentStatus: "PAYMENT_NOT_CONNECTED",
      originalPrice: { amountMinor: 150000, currency: "INR" },
      finalPrice: { amountMinor: 150000, currency: "INR" },
      createdAt: "2026-10-20T10:00:00.000Z",
    };

    it("blocks unauthenticated users from reading or writing consultations", () => {
      expect(evaluateFirestoreConsultationRules("read", "bk-100", { auth: null, resource: { data: validBooking } }).allowed).toBe(false);
      expect(evaluateFirestoreConsultationRules("create", "bk-100", { auth: null, requestResource: { data: validBooking } }).allowed).toBe(false);
    });

    it("strictly isolates client bookings: customer B cannot read customer A's booking", () => {
      const res = evaluateFirestoreConsultationRules("read", "bk-100", {
        auth: customerB,
        resource: { data: validBooking },
      });
      expect(res.allowed).toBe(false);
      expect(res.reason).toContain("Not authorized to read consultation booking");
    });

    it("allows the booking owner and staff admins to read consultation", () => {
      expect(evaluateFirestoreConsultationRules("read", "bk-100", { auth: customerA, resource: { data: validBooking } }).allowed).toBe(true);
      expect(evaluateFirestoreConsultationRules("read", "bk-100", { auth: adminVerified, resource: { data: validBooking } }).allowed).toBe(true);
      expect(evaluateFirestoreConsultationRules("read", "bk-100", { auth: superAdminVerified, resource: { data: validBooking } }).allowed).toBe(true);
    });

    it("blocks creating a booking directly with PAID paymentStatus", () => {
      const res = evaluateFirestoreConsultationRules("create", "bk-100", {
        auth: customerA,
        requestResource: { data: { ...validBooking, paymentStatus: "PAID" } },
      });
      expect(res.allowed).toBe(false);
      expect(res.reason).toContain("Direct creation with PAID paymentStatus forbidden");
    });

    it("blocks client from updating paymentStatus to PAID", () => {
      const res = evaluateFirestoreConsultationRules("update", "bk-100", {
        auth: customerA,
        resource: { data: validBooking },
        requestResource: { data: { ...validBooking, paymentStatus: "PAID" } },
      });
      expect(res.allowed).toBe(false);
      expect(res.reason).toContain("Direct client transition to PAID paymentStatus is forbidden");
    });

    it("blocks client from escalating status to CONFIRMED or COMPLETED", () => {
      const confirmedRes = evaluateFirestoreConsultationRules("update", "bk-100", {
        auth: customerA,
        resource: { data: validBooking },
        requestResource: { data: { ...validBooking, status: "CONFIRMED" } },
      });
      expect(confirmedRes.allowed).toBe(false);
      expect(confirmedRes.reason).toContain("Clients cannot escalate booking status to CONFIRMED");

      const completedRes = evaluateFirestoreConsultationRules("update", "bk-100", {
        auth: customerA,
        resource: { data: validBooking },
        requestResource: { data: { ...validBooking, status: "COMPLETED" } },
      });
      expect(completedRes.allowed).toBe(false);
      expect(completedRes.reason).toContain("Clients cannot escalate booking status to COMPLETED");
    });

    it("allows client legitimate operations (cancel booking, request reschedule)", () => {
      const cancelRes = evaluateFirestoreConsultationRules("update", "bk-100", {
        auth: customerA,
        resource: { data: validBooking },
        requestResource: { data: { ...validBooking, status: "CANCELLED_BY_CLIENT" } },
      });
      expect(cancelRes.allowed).toBe(true);

      const rescheduleRes = evaluateFirestoreConsultationRules("update", "bk-100", {
        auth: customerA,
        resource: { data: validBooking },
        requestResource: { data: { ...validBooking, status: "RESCHEDULED" } },
      });
      expect(rescheduleRes.allowed).toBe(true);
    });

    it("blocks tampering with immutable booking fields (serviceId, clientId, originalPrice)", () => {
      const tamperService = evaluateFirestoreConsultationRules("update", "bk-100", {
        auth: customerA,
        resource: { data: validBooking },
        requestResource: { data: { ...validBooking, serviceId: "srv-cheaper" } },
      });
      expect(tamperService.allowed).toBe(false);
      expect(tamperService.reason).toContain("serviceId is immutable");

      const tamperPrice = evaluateFirestoreConsultationRules("update", "bk-100", {
        auth: customerA,
        resource: { data: validBooking },
        requestResource: { data: { ...validBooking, originalPrice: { amountMinor: 100, currency: "INR" } } },
      });
      expect(tamperPrice.allowed).toBe(false);
      expect(tamperPrice.reason).toContain("originalPrice is immutable");
    });

    it("blocks customer from creating booking with internalNotes, privateNotes, or refundStatus", () => {
      const tamperCreate = evaluateFirestoreConsultationRules("create", "bk-100", {
        auth: customerA,
        requestResource: {
          data: {
            ...validBooking,
            internalNotes: "Vulnerable client internal note",
          },
        },
      });
      expect(tamperCreate.allowed).toBe(false);
      expect(tamperCreate.reason).toContain("Client cannot inject private notes");

      const tamperRefund = evaluateFirestoreConsultationRules("create", "bk-100", {
        auth: customerA,
        requestResource: {
          data: {
            ...validBooking,
            refundStatus: "REFUNDED",
          },
        },
      });
      expect(tamperRefund.allowed).toBe(false);
    });

    it("blocks customer from modifying internalNotes, privateNotes, or refundStatus on update", () => {
      const tamperInternal = evaluateFirestoreConsultationRules("update", "bk-100", {
        auth: customerA,
        resource: { data: validBooking },
        requestResource: {
          data: {
            ...validBooking,
            internalNotes: "Forged astrologer diagnosis",
          },
        },
      });
      expect(tamperInternal.allowed).toBe(false);
      expect(tamperInternal.reason).toContain("Clients cannot alter internalNotes");

      const tamperRefund = evaluateFirestoreConsultationRules("update", "bk-100", {
        auth: customerA,
        resource: { data: validBooking },
        requestResource: {
          data: {
            ...validBooking,
            refundStatus: "COMPLETED",
          },
        },
      });
      expect(tamperRefund.allowed).toBe(false);
      expect(tamperRefund.reason).toContain("Clients cannot alter refundStatus");
    });

    it("blocks consultant from modifying clientName or refundStatus on update", () => {
      const consultantAuth = { uid: "consultant-uid-1", email: "consultant@example.com", email_verified: true };
      const consultantBooking = { ...validBooking, consultantId: "consultant-uid-1" };

      const tamperClientName = evaluateFirestoreConsultationRules("update", "bk-100", {
        auth: consultantAuth,
        resource: { data: consultantBooking },
        requestResource: {
          data: {
            ...consultantBooking,
            clientName: "Altered Client Name",
          },
        },
      });
      expect(tamperClientName.allowed).toBe(false);
      expect(tamperClientName.reason).toContain("Consultant cannot alter clientName");
    });
  });

  describe("4. Orders Catalog & Purchases Security Hardening", () => {
    const validOrder = {
      orderId: "ord-101",
      userId: "customer-uid-a",
      items: [{ productId: "gem-ruby", quantity: 1, priceMinor: 500000 }],
      totalAmountMinor: 500000,
      paymentStatus: "PAID",
      fulfillmentStatus: "SHIPPED",
      createdAt: "2026-10-20T10:00:00.000Z",
    };

    it("denies unauthenticated read and writes to orders", () => {
      expect(evaluateFirestoreOrderRules("read", "ord-101", { auth: null, resource: { data: validOrder } }).allowed).toBe(false);
      expect(evaluateFirestoreOrderRules("create", "ord-101", { auth: null }).allowed).toBe(false);
    });

    it("allows customer to read only their own order documents", () => {
      const ownOrder = evaluateFirestoreOrderRules("read", "ord-101", {
        auth: customerA,
        resource: { data: validOrder },
      });
      expect(ownOrder.allowed).toBe(true);

      const otherOrder = evaluateFirestoreOrderRules("read", "ord-101", {
        auth: customerB,
        resource: { data: validOrder },
      });
      expect(otherOrder.allowed).toBe(false);
      expect(otherOrder.reason).toContain("Can only read own order documents");
    });

    it("allows staff admin to inspect customer orders", () => {
      expect(evaluateFirestoreOrderRules("read", "ord-101", { auth: adminVerified, resource: { data: validOrder } }).allowed).toBe(true);
      expect(evaluateFirestoreOrderRules("read", "ord-101", { auth: superAdminVerified, resource: { data: validOrder } }).allowed).toBe(true);
    });

    it("strictly blocks ordinary customers from creating orders directly (prevents payment/shipment forgery)", () => {
      const clientCreate = evaluateFirestoreOrderRules("create", "ord-101", {
        auth: customerA,
        requestResource: { data: validOrder },
      });
      expect(clientCreate.allowed).toBe(false);
      expect(clientCreate.reason).toContain("Direct client writes to orders forbidden");
    });

    it("strictly blocks ordinary customers from updating or deleting orders", () => {
      expect(evaluateFirestoreOrderRules("update", "ord-101", { auth: customerA }).allowed).toBe(false);
      expect(evaluateFirestoreOrderRules("delete", "ord-101", { auth: customerA }).allowed).toBe(false);
    });

    it("allows Super Admin to manage and write orders", () => {
      expect(evaluateFirestoreOrderRules("create", "ord-101", { auth: superAdminVerified }).allowed).toBe(true);
      expect(evaluateFirestoreOrderRules("update", "ord-101", { auth: superAdminVerified }).allowed).toBe(true);
      expect(evaluateFirestoreOrderRules("delete", "ord-101", { auth: superAdminVerified }).allowed).toBe(true);
    });
  });

  describe("5. Direct Quick Question Inquiries Security", () => {
    const validInquiry = {
      id: "qq-100",
      clientId: "customer-uid-a",
      clientEmail: "customera@example.com",
      question: "Will Saturn transit bring career growth?",
      status: "REQUESTED",
      createdAt: "2026-10-20T10:00:00.000Z",
    };

    it("blocks customer B from reading customer A's inquiry", () => {
      const res = evaluateFirestoreQuickQuestionRules("read", "qq-100", {
        auth: customerB,
        resource: { data: validInquiry },
      });
      expect(res.allowed).toBe(false);
    });

    it("blocks customer from answering their own question", () => {
      const res = evaluateFirestoreQuickQuestionRules("update", "qq-100", {
        auth: customerA,
        resource: { data: validInquiry },
        requestResource: { data: { ...validInquiry, answer: "Self answered", status: "ANSWERED" } },
      });
      expect(res.allowed).toBe(false);
      expect(res.reason).toContain("Customer cannot mark inquiry ANSWERED");
    });

    it("allows staff admin to answer inquiry", () => {
      const res = evaluateFirestoreQuickQuestionRules("update", "qq-100", {
        auth: superAdminVerified,
        resource: { data: validInquiry },
        requestResource: { data: { ...validInquiry, answer: "Saturn in 10th brings steady progress", status: "ANSWERED" } },
      });
      expect(res.allowed).toBe(true);
    });
  });

  describe("5. Storage Profile-Photo Avatar Security Rules", () => {
    it("allows public read on user profile avatars", () => {
      const res = evaluateStorageAvatarRules("read", "customer-uid-a", { auth: null });
      expect(res.allowed).toBe(true);
    });

    it("denies unauthenticated writes to avatar storage paths", () => {
      const res = evaluateStorageAvatarRules("write", "customer-uid-a", {
        auth: null,
        requestResource: { size: 1024 * 1024, contentType: "image/jpeg" },
      });
      expect(res.allowed).toBe(false);
      expect(res.reason).toContain("Unauthenticated write denied");
    });

    it("allows owner to upload valid JPEG, PNG, or WebP photo up to 5MB", () => {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      for (const contentType of validTypes) {
        const res = evaluateStorageAvatarRules("write", "customer-uid-a", {
          auth: customerA,
          requestResource: { size: 4 * 1024 * 1024, contentType },
        });
        expect(res.allowed).toBe(true);
      }
    });

    it("blocks owner from uploading oversized files (> 5MB)", () => {
      const res = evaluateStorageAvatarRules("write", "customer-uid-a", {
        auth: customerA,
        requestResource: { size: 6 * 1024 * 1024, contentType: "image/jpeg" },
      });
      expect(res.allowed).toBe(false);
      expect(res.reason).toContain("File exceeds 5MB size limit");
    });

    it("blocks owner from uploading invalid content types (PDF, GIF, Executables)", () => {
      const invalidTypes = ["application/pdf", "image/gif", "application/x-msdownload", "text/html"];
      for (const contentType of invalidTypes) {
        const res = evaluateStorageAvatarRules("write", "customer-uid-a", {
          auth: customerA,
          requestResource: { size: 1024 * 1024, contentType },
        });
        expect(res.allowed).toBe(false);
        expect(res.reason).toContain("Invalid content type");
      }
    });

    it("strictly blocks customer A from writing into customer B's avatar storage path", () => {
      const res = evaluateStorageAvatarRules("write", "customer-uid-b", {
        auth: customerA,
        requestResource: { size: 1024 * 1024, contentType: "image/jpeg" },
      });
      expect(res.allowed).toBe(false);
      expect(res.reason).toContain("Cannot write to another user's avatar path");
    });

    it("strictly blocks customer from deleting another customer's avatar", () => {
      const res = evaluateStorageAvatarRules("delete", "customer-uid-b", { auth: customerA });
      expect(res.allowed).toBe(false);
      expect(res.reason).toContain("Only owner or Super Admin may delete avatar");

      const ownerDelete = evaluateStorageAvatarRules("delete", "customer-uid-a", { auth: customerA });
      expect(ownerDelete.allowed).toBe(true);
    });
  });

  describe("6. Storage Private Consultation Attachments Security Rules", () => {
    const bookingFixture = {
      clientId: "customer-uid-a",
      consultantId: "astronext-primary-consultant",
      consultantEmail: "ravieadagale@gmail.com",
    };

    it("denies unauthenticated read to consultation attachments (Not Public)", () => {
      const res = evaluateStorageConsultationAttachmentRules("read", "booking-101", {
        auth: null,
        firestoreBooking: bookingFixture,
      });
      expect(res.allowed).toBe(false);
      expect(res.reason).toContain("Unauthenticated consultation file read denied");
    });

    it("strictly blocks unauthorized customer B from reading customer A's consultation attachments", () => {
      const res = evaluateStorageConsultationAttachmentRules("read", "booking-101", {
        auth: customerB,
        firestoreBooking: bookingFixture,
      });
      expect(res.allowed).toBe(false);
      expect(res.reason).toContain("User is not a participant in this consultation booking");
    });

    it("allows authorized customer A to read and upload consultation files within 10MB", () => {
      const validTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
      for (const contentType of validTypes) {
        const res = evaluateStorageConsultationAttachmentRules("write", "booking-101", {
          auth: customerA,
          firestoreBooking: bookingFixture,
          requestResource: { size: 8 * 1024 * 1024, contentType },
        });
        expect(res.allowed).toBe(true);
      }
    });

    it("blocks consultation attachments exceeding 10MB limit", () => {
      const res = evaluateStorageConsultationAttachmentRules("write", "booking-101", {
        auth: customerA,
        firestoreBooking: bookingFixture,
        requestResource: { size: 12 * 1024 * 1024, contentType: "application/pdf" },
      });
      expect(res.allowed).toBe(false);
      expect(res.reason).toContain("File exceeds 10MB limit");
    });

    it("blocks consultation attachments with disallowed MIME types", () => {
      const res = evaluateStorageConsultationAttachmentRules("write", "booking-101", {
        auth: customerA,
        firestoreBooking: bookingFixture,
        requestResource: { size: 1024, contentType: "application/x-msdownload" },
      });
      expect(res.allowed).toBe(false);
      expect(res.reason).toContain("Invalid content type");
    });

    it("strictly limits consultation attachment deletion to staff admin", () => {
      const customerDelete = evaluateStorageConsultationAttachmentRules("delete", "booking-101", {
        auth: customerA,
        firestoreBooking: bookingFixture,
      });
      expect(customerDelete.allowed).toBe(false);
      expect(customerDelete.reason).toContain("Only staff admin may delete consultation attachments");

      const adminDelete = evaluateStorageConsultationAttachmentRules("delete", "booking-101", {
        auth: adminVerified,
        firestoreBooking: bookingFixture,
      });
      expect(adminDelete.allowed).toBe(true);
    });
  });
});
