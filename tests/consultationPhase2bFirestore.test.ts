import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  FirestoreConsultationBookingAdapter,
  ExtendedConsultationRequest,
} from "../src/domain/consultation/firestoreConsultationBookingAdapter";
import {
  ProductionConsultationRepository,
  defaultConsultationRepository,
  DeferredFirebaseConsultationAdapter,
} from "../src/domain/consultation/repositories";
import { PRIMARY_CONSULTANT } from "../src/domain/consultation/operatorConfig";
import { calculateConsultationPrice } from "../src/domain/consultation/pricingEngine";
import {
  isSuperAdminEmail,
  isAdminEmail,
  resolveRoleFromEmail,
  hasPractitionerCapability,
} from "../src/services/auth/superAdminConfig";
import { consultationOperations } from "../src/domain/consultation/consultationOperationsService";
import { ConsultationBooking } from "../src/domain/consultation/types";

// Store in-memory maps for transaction simulation
const mockFirestoreStore = new Map<string, any>();

// Mock Firebase client
vi.mock("../src/services/firebase/firebaseClient", () => ({
  firestoreDb: { type: "firestore-mock" },
  firebaseAuth: {
    currentUser: {
      uid: "seeker-uid-456",
      email: "seeker@example.com",
    },
  },
}));

// Mock Firestore SDK
vi.mock("firebase/firestore", () => {
  return {
    doc: vi.fn((_db: any, col: string, id: string) => ({
      id,
      path: `${col}/${id}`,
    })),
    getDoc: vi.fn(async (docRef: any) => {
      const data = mockFirestoreStore.get(docRef.path);
      return {
        exists: () => !!data,
        data: () => data,
      };
    }),
    runTransaction: vi.fn(async (_db: any, callback: (tx: any) => Promise<any>) => {
      const tx = {
        get: vi.fn(async (docRef: any) => {
          const data = mockFirestoreStore.get(docRef.path);
          return {
            exists: () => !!data,
            data: () => data,
          };
        }),
        set: vi.fn((docRef: any, data: any) => {
          mockFirestoreStore.set(docRef.path, data);
        }),
        update: vi.fn((docRef: any, data: any) => {
          const existing = mockFirestoreStore.get(docRef.path) || {};
          mockFirestoreStore.set(docRef.path, { ...existing, ...data });
        }),
      };
      return await callback(tx);
    }),
    collection: vi.fn((_db: any, col: string) => ({ path: col })),
    query: vi.fn((coll: any) => coll),
    where: vi.fn(),
    getDocs: vi.fn(async (collRef: any) => {
      const docs: any[] = [];
      mockFirestoreStore.forEach((value, path) => {
        if (path.startsWith(`${collRef.path}/`)) {
          docs.push({
            id: path.replace(`${collRef.path}/`, ""),
            data: () => value,
          });
        }
      });
      return { docs };
    }),
    Timestamp: {
      fromMillis: (ms: number) => ({
        toMillis: () => ms,
        seconds: Math.floor(ms / 1000),
      }),
    },
    serverTimestamp: () => ({ _type: "server_timestamp" }),
  };
});

describe("Phase 2B: Consultation Firestore Booking Persistence & Concurrency Guard", () => {
  let adapter: FirestoreConsultationBookingAdapter;

  beforeEach(() => {
    mockFirestoreStore.clear();
    adapter = new FirestoreConsultationBookingAdapter();
  });

  describe("Slot Lock Key Generation", () => {
    it("generates deterministic canonical lock keys based on consultant ID and epoch minutes", () => {
      const iso = "2026-10-15T10:00:00.000Z";
      const key1 = adapter.getSlotLockKey("consultant-1", iso);
      const key2 = adapter.getSlotLockKey("consultant-1", iso);
      expect(key1).toBe(key2);
      expect(key1).toMatch(/^consultant-1_\d+$/);

      const ms = new Date(iso).getTime();
      const expectedMinutes = Math.floor(ms / 60000);
      expect(key1).toBe(`consultant-1_${expectedMinutes}`);
    });

    it("throws clear error on malformed start time ISO strings", () => {
      expect(() => adapter.getSlotLockKey("consultant-1", "invalid-date")).toThrow(
        "Invalid start time ISO format: invalid-date"
      );
    });
  });

  describe("Booking Creation & Concurrency Control", () => {
    // Dynamic next Wednesday 10:00 AM IST (04:30 UTC) slot within canonical consultant availability
    const getNextWednesdayIso = (): string => {
      const d = new Date();
      d.setDate(d.getDate() + ((3 - d.getDay() + 7) % 7 || 7));
      d.setUTCHours(4, 30, 0, 0);
      return d.toISOString();
    };
    const validStartTime = getNextWednesdayIso();

    it("creates a persistent consultation booking and reserves the slot lock in Firestore", async () => {
      const request: ExtendedConsultationRequest = {
        serviceId: "srv-vedic-natal",
        serviceName: "Complete Natal Kundli Analysis",
        category: "VEDIC_ASTROLOGY",
        mode: "VIDEO",
        requestedStartTime: validStartTime,
        durationMinutes: 60,
        timezone: "Asia/Kolkata",
        paymentOption: "PAY_IN_FULL_NOW",
        originalPrice: { amountMinor: 500000, currency: "INR" },
        finalPrice: { amountMinor: 400000, currency: "INR" }, // 20% discount
        clientUid: "seeker-uid-456",
        clientDetails: {
          name: "Ananya Sharma",
          email: "ananya@example.com",
          phone: "+91 98765 43210",
          focusTopic: "Career Transition and Dasha Influence",
        },
      };

      const booking = await adapter.createBooking(request);

      expect(booking.id).toBeDefined();
      expect(booking.clientId).toBe("seeker-uid-456");
      expect(booking.status).toBe("REQUESTED");
      expect(booking.paymentStatus).toBe("PAYMENT_NOT_CONNECTED");
      expect(booking.consultantId).toBe(PRIMARY_CONSULTANT.id);

      // Verify Firestore slotLocks document was created
      const lockKey = adapter.getSlotLockKey(PRIMARY_CONSULTANT.id, validStartTime);
      const savedLock = mockFirestoreStore.get(`slotLocks/${lockKey}`);
      expect(savedLock).toBeDefined();
      expect(savedLock.lockId).toBe(lockKey);
      expect(savedLock.clientId).toBe("seeker-uid-456");
      expect(savedLock.status).toBe("RESERVED");

      // Verify Firestore consultations document was created
      const savedBooking = mockFirestoreStore.get(`consultations/${booking.id}`);
      expect(savedBooking).toBeDefined();
      expect(savedBooking.clientId).toBe("seeker-uid-456");
      expect(savedBooking.clientName).toBe("Ananya Sharma");
      expect(savedBooking.finalPrice.amountMinor).toBe(400000);
    });

    it("blocks simultaneous duplicate booking for the same slot with SLOT_ALREADY_RESERVED error", async () => {
      const lockKey = adapter.getSlotLockKey(PRIMARY_CONSULTANT.id, validStartTime);
      // Pre-seed an active lock for another client
      mockFirestoreStore.set(`slotLocks/${lockKey}`, {
        lockId: lockKey,
        bookingId: "bk-existing-123",
        clientId: "rival-uid-789",
        status: "RESERVED",
        expiresAt: { toMillis: () => Date.now() + 1000 * 60 * 60 },
      });

      const request: ExtendedConsultationRequest = {
        serviceId: "srv-vedic-natal",
        requestedStartTime: validStartTime,
        durationMinutes: 60,
        timezone: "Asia/Kolkata",
        clientUid: "seeker-uid-456",
        clientDetails: {
          name: "Second Seeker",
          email: "second@example.com",
          focusTopic: "Same slot attempt",
        },
      };

      await expect(adapter.createBooking(request)).rejects.toThrow("SLOT_ALREADY_RESERVED");
    });

    it("enforces authentication and rejects anonymous unauthenticated booking attempts", async () => {
      const unauthenticatedRequest: ExtendedConsultationRequest = {
        serviceId: "srv-vedic-natal",
        requestedStartTime: validStartTime,
        clientUid: "",
        clientDetails: {
          name: "Guest User",
          email: "guest@example.com",
          focusTopic: "No UID",
        },
      };

      // Temporarily override auth currentUser
      const firebaseClient = await import("../src/services/firebase/firebaseClient");
      const originalUser = firebaseClient.firebaseAuth.currentUser;
      (firebaseClient.firebaseAuth as any).currentUser = null;

      try {
        await expect(adapter.createBooking(unauthenticatedRequest)).rejects.toThrow(
          "Authentication required: You must be signed in to submit a consultation booking."
        );
      } finally {
        (firebaseClient.firebaseAuth as any).currentUser = originalUser;
      }
    });

    it("rejects booking slots that violate consultant canonical availability", async () => {
      // Midnight IST on Sunday (outside working hours)
      const invalidStartTime = "2026-10-18T18:30:00.000Z";

      const request: ExtendedConsultationRequest = {
        serviceId: "srv-vedic-natal",
        requestedStartTime: invalidStartTime,
        durationMinutes: 60,
        timezone: "Asia/Kolkata",
        clientUid: "seeker-uid-456",
        clientDetails: {
          name: "Late Seeker",
          email: "late@example.com",
          focusTopic: "Outside availability hours",
        },
      };

      await expect(adapter.createBooking(request)).rejects.toThrow("Slot validation failed");
    });
  });

  describe("Production Consultation Repository & Scope Isolation", () => {
    it("reports CONNECTED and FIREBASE_FIRESTORE persistence status for Production repository", () => {
      const prodRepo = new ProductionConsultationRepository();
      const meta = prodRepo.getPersistenceMetadata();

      expect(meta.status).toBe("CONNECTED");
      expect(meta.provider).toBe("FIREBASE_FIRESTORE");
      expect(meta.message).toContain("astronext-app");
    });

    it("singleton defaultConsultationRepository uses ProductionConsultationRepository with real booking adapter", () => {
      expect(defaultConsultationRepository).toBeInstanceOf(ProductionConsultationRepository);
      expect(defaultConsultationRepository.bookings).toBeDefined();
    });

    it("strictly preserves deferred state for other un-scoped consultation domains in Phase 2B", async () => {
      const prodRepo = new ProductionConsultationRepository();

      // Photos storage remains deferred
      await expect(
        prodRepo.photos.uploadProfilePhoto(new File([], "test.jpg"), "consultant-1")
      ).rejects.toThrow("Persistence deferred");

      // Chat messaging remains deferred
      await expect(
        prodRepo.chat.sendMessage({
          messageId: "m-1",
          conversationId: "c-1",
          senderId: "s-1",
          senderRole: "CLIENT",
          senderEmail: "s@example.com",
          content: "Hello",
          timestamp: new Date().toISOString(),
          isRead: false,
        })
      ).rejects.toThrow("Persistence deferred");
    });
  });

  describe("Deterministic Business Rule Preservation (20% Advance Discount)", () => {
    it("preserves 20% discount on pay-in-full option while maintaining standard price on pay-before-session", () => {
      const basePrice = { amountMinor: 250000, currency: "INR" }; // ₹2500.00

      const fullDiscount = calculateConsultationPrice(basePrice, "PAY_IN_FULL_NOW");
      expect(fullDiscount.discountPercentage).toBe(20);
      expect(fullDiscount.discountAmount.amountMinor).toBe(50000); // ₹500
      expect(fullDiscount.finalAmount.amountMinor).toBe(200000); // ₹2000

      const standardPrice = calculateConsultationPrice(basePrice, "PAY_BEFORE_SESSION");
      expect(standardPrice.discountPercentage).toBe(0);
      expect(standardPrice.discountAmount.amountMinor).toBe(0);
      expect(standardPrice.finalAmount.amountMinor).toBe(250000); // ₹2500
    });
  });

  describe("Firestore RBAC Separation Suite (Super Admin vs Admin vs Practitioner vs Customer)", () => {
    it("1. recognizes ravieadagale@gmail.com strictly as Super Admin", () => {
      expect(isSuperAdminEmail("ravieadagale@gmail.com")).toBe(true);
      expect(resolveRoleFromEmail("ravieadagale@gmail.com")).toBe("SUPER_ADMIN");
    });

    it("2. recognizes ravii.adagale20@gmail.com strictly as Admin", () => {
      expect(isAdminEmail("ravii.adagale20@gmail.com")).toBe(true);
      expect(resolveRoleFromEmail("ravii.adagale20@gmail.com")).toBe("ADMIN");
    });

    it("3. guarantees Admin (ravii.adagale20@gmail.com) is NOT treated as Super Admin", () => {
      expect(isSuperAdminEmail("ravii.adagale20@gmail.com")).toBe(false);
      expect(resolveRoleFromEmail("ravii.adagale20@gmail.com")).not.toBe("SUPER_ADMIN");
    });

    it("4. verifies Super Admin retains native Practitioner/Consultant capability", () => {
      expect(hasPractitionerCapability("ravieadagale@gmail.com", "SUPER_ADMIN")).toBe(true);
      expect(hasPractitionerCapability("ravii.adagale20@gmail.com", "ADMIN")).toBe(false);
    });

    it("5. verifies standard Customer accounts do not gain privileged authority", () => {
      expect(isSuperAdminEmail("customer@example.com")).toBe(false);
      expect(isAdminEmail("customer@example.com")).toBe(false);
      expect(resolveRoleFromEmail("customer@example.com")).toBe("CUSTOMER");
      expect(hasPractitionerCapability("customer@example.com", "CUSTOMER")).toBe(false);
    });
  });

  describe("Consultation Lifecycle Persistence Suite", () => {
    const validStartTime = "2026-10-21T04:30:00.000Z";
    const sampleBookingId = "bk-test-lifecycle-123";

    beforeEach(() => {
      mockFirestoreStore.set(`consultations/${sampleBookingId}`, {
        id: sampleBookingId,
        bookingId: sampleBookingId,
        clientId: "seeker-uid-456",
        clientEmail: "seeker@example.com",
        clientName: "Seeker",
        consultantId: PRIMARY_CONSULTANT.id,
        consultantEmail: PRIMARY_CONSULTANT.email,
        startTime: validStartTime,
        endTime: "2026-10-21T05:30:00.000Z",
        status: "CONFIRMED",
        paymentStatus: "PAYMENT_NOT_CONNECTED",
      });

      const lockKey = adapter.getSlotLockKey(PRIMARY_CONSULTANT.id, validStartTime);
      mockFirestoreStore.set(`slotLocks/${lockKey}`, {
        lockId: lockKey,
        bookingId: sampleBookingId,
        consultantId: PRIMARY_CONSULTANT.id,
        clientId: "seeker-uid-456",
        status: "RESERVED",
      });
    });

    it("6. startSession persists IN_PROGRESS to Firestore", async () => {
      await adapter.updateBookingStatus(sampleBookingId, "IN_PROGRESS");
      const stored = mockFirestoreStore.get(`consultations/${sampleBookingId}`);
      expect(stored.status).toBe("IN_PROGRESS");
      expect(stored.updatedAt).toBeDefined();
    });

    it("7. completeSession persists COMPLETED to Firestore", async () => {
      await adapter.updateBookingStatus(sampleBookingId, "COMPLETED");
      const stored = mockFirestoreStore.get(`consultations/${sampleBookingId}`);
      expect(stored.status).toBe("COMPLETED");
      expect(stored.updatedAt).toBeDefined();
    });

    it("8. cancelBooking persists CANCELLED_BY_CLIENT and releases the slot lock", async () => {
      await adapter.updateBookingStatus(sampleBookingId, "CANCELLED_BY_CLIENT");
      const storedBooking = mockFirestoreStore.get(`consultations/${sampleBookingId}`);
      expect(storedBooking.status).toBe("CANCELLED_BY_CLIENT");

      const lockKey = adapter.getSlotLockKey(PRIMARY_CONSULTANT.id, validStartTime);
      const storedLock = mockFirestoreStore.get(`slotLocks/${lockKey}`);
      expect(storedLock.status).toBe("RELEASED");
    });

    it("9. deterministic state machine rejects invalid transition (e.g. DRAFT cannot directly become COMPLETED)", () => {
      const mockDraftBooking: ConsultationBooking = {
        id: "bk-draft",
        clientId: "c-1",
        clientEmail: "c@test.com",
        clientName: "C",
        consultantId: "cons-1",
        consultantEmail: "cons@test.com",
        serviceId: "srv-1",
        category: "VEDIC_ASTROLOGY",
        mode: "VIDEO",
        startTime: validStartTime,
        endTime: "2026-10-21T05:30:00.000Z",
        timezone: "Asia/Kolkata",
        status: "DRAFT",
        paymentStatus: "PAYMENT_NOT_CONNECTED",
        rescheduleHistory: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = consultationOperations.transitionState({
        booking: mockDraftBooking,
        nextStatus: "COMPLETED",
        actorRole: "CLIENT",
        actorEmail: "c@test.com",
        reason: "Illegal transition attempt",
      });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("10. persistence failure does not falsely update or corrupt state", async () => {
      // Trying to update non-existent booking throws error and does not create ghost document
      await expect(adapter.updateBookingStatus("non-existent-id", "IN_PROGRESS")).rejects.toThrow(
        "Booking non-existent-id not found in Firestore."
      );
    });
  });
});
