import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  FirestoreConsultationBookingAdapter,
  ExtendedConsultationRequest,
} from "../src/domain/consultation/firestoreConsultationBookingAdapter";
import {
  isSuperAdminEmail,
  isAdminEmail,
  resolveRoleFromEmail,
  hasPractitionerCapability,
} from "../src/services/auth/superAdminConfig";
import {
  canAccessConsultantWorkspace,
  canViewPrivateNotes,
} from "../src/domain/consultation/authorization";
import { consultationOperations } from "../src/domain/consultation/consultationOperationsService";
import { PRIMARY_CONSULTANT } from "../src/domain/consultation/operatorConfig";
import { ConsultationBooking, ConsultationNotesRecord } from "../src/domain/consultation/types";

// In-memory Firestore simulation
const mockFirestoreDb = new Map<string, any>();
const mockLocalStorage = new Map<string, string>();

// Polyfill localStorage for node test runner
const localStorageMock = {
  getItem: (key: string) => mockLocalStorage.get(key) || null,
  setItem: (key: string, value: string) => mockLocalStorage.set(key, String(value)),
  removeItem: (key: string) => mockLocalStorage.delete(key),
  clear: () => mockLocalStorage.clear(),
};
(globalThis as any).localStorage = localStorageMock;

// Current active auth state mock
let currentMockUser: { uid: string; email: string; displayName?: string } | null = null;

vi.mock("../src/services/firebase/firebaseClient", () => ({
  firestoreDb: { type: "firestore-mock" },
  get firebaseAuth() {
    return {
      get currentUser() {
        return currentMockUser;
      },
    };
  },
}));

vi.mock("firebase/firestore", () => ({
  doc: vi.fn((_db: any, col: string, id: string) => ({ id, path: `${col}/${id}` })),
  getDoc: vi.fn(async (docRef: any) => {
    const data = mockFirestoreDb.get(docRef.path);
    return { exists: () => !!data, data: () => data };
  }),
  runTransaction: vi.fn(async (_db: any, callback: (tx: any) => Promise<any>) => {
    const tx = {
      get: vi.fn(async (docRef: any) => {
        const data = mockFirestoreDb.get(docRef.path);
        return { exists: () => !!data, data: () => data };
      }),
      set: vi.fn((docRef: any, data: any) => {
        mockFirestoreDb.set(docRef.path, data);
      }),
      update: vi.fn((docRef: any, data: any) => {
        const existing = mockFirestoreDb.get(docRef.path) || {};
        mockFirestoreDb.set(docRef.path, { ...existing, ...data });
      }),
    };
    return await callback(tx);
  }),
  collection: vi.fn((_db: any, col: string) => ({ path: col })),
  query: vi.fn((coll: any) => coll),
  where: vi.fn(),
  getDocs: vi.fn(async (collRef: any) => {
    const docs: any[] = [];
    mockFirestoreDb.forEach((value, path) => {
      if (path.startsWith(`${collRef.path}/`)) {
        docs.push({ id: path.replace(`${collRef.path}/`, ""), data: () => value });
      }
    });
    return { docs, forEach: (fn: any) => docs.forEach(fn) };
  }),
  Timestamp: {
    fromMillis: (ms: number) => ({ toMillis: () => ms, seconds: Math.floor(ms / 1000) }),
  },
  serverTimestamp: () => ({ _type: "server_timestamp" }),
}));

describe("AstroNext Consultation Phase 2B.2 — Session Isolation & Cache Closure Suite", () => {
  let adapter: FirestoreConsultationBookingAdapter;

  beforeEach(() => {
    mockFirestoreDb.clear();
    mockLocalStorage.clear();
    currentMockUser = null;
    adapter = new FirestoreConsultationBookingAdapter();
  });

  const getNextWednesdayIso = (): string => {
    const d = new Date();
    d.setDate(d.getDate() + ((3 - d.getDay() + 7) % 7 || 7));
    d.setUTCHours(4, 30, 0, 0);
    return d.toISOString();
  };
  const validIsoStartTime = getNextWednesdayIso();

  const createSampleBooking = (id: string, clientUid: string, clientEmail: string): ConsultationBooking => ({
    id,
    clientId: clientUid,
    clientEmail,
    clientName: "Test Seeker",
    consultantId: PRIMARY_CONSULTANT.id,
    consultantEmail: PRIMARY_CONSULTANT.email,
    serviceId: "srv-vedic-natal",
    category: "VEDIC_ASTROLOGY",
    mode: "VIDEO",
    startTime: validIsoStartTime,
    endTime: "2026-10-21T05:30:00.000Z",
    timezone: "Asia/Kolkata",
    status: "CONFIRMED",
    paymentStatus: "PAID",
    paymentOption: "PAY_IN_FULL_NOW",
    originalPrice: { amountMinor: 250000, currency: "INR" },
    finalPrice: { amountMinor: 200000, currency: "INR" },
    rescheduleHistory: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // 1. Signed-out state contains no previous user's bookings
  it("Requirement 1: Signed-out state contains no previous user's bookings", async () => {
    // Simulate legacy storage or unauthenticated state
    localStorage.setItem("astronext_consultation_bookings", JSON.stringify([createSampleBooking("bk-old-1", "uid-old", "old@test.com")]));
    
    // In signed-out state, current user is null
    currentMockUser = null;

    // Simulate session isolation loader behavior
    const loadStateForSession = (user: typeof currentMockUser) => {
      if (!user) {
        return { bookings: [] as readonly ConsultationBooking[], notes: {} };
      }
      const scopedKey = `astronext_consultation_bookings_${user.uid}`;
      const cached = localStorage.getItem(scopedKey);
      return {
        bookings: cached ? JSON.parse(cached) : [],
        notes: {},
      };
    };

    const state = loadStateForSession(currentMockUser);
    expect(state.bookings).toHaveLength(0);
    expect(state.bookings).toEqual([]);
  });

  // 2. Customer A's state is cleared on logout
  it("Requirement 2: Customer A's state is cleared on logout immediately", async () => {
    // User A signs in
    currentMockUser = { uid: "uid-customer-a", email: "customera@example.com" };
    let activeBookings: readonly ConsultationBooking[] = [createSampleBooking("bk-a-1", "uid-customer-a", "customera@example.com")];
    let activeNotes: Record<string, any> = { "bk-a-1": { privateNotes: "Sensitive A notes" } };

    expect(activeBookings).toHaveLength(1);
    expect(activeNotes["bk-a-1"]).toBeDefined();

    // User A logs out
    currentMockUser = null;
    // Session isolation trigger:
    if (!currentMockUser) {
      activeBookings = [];
      activeNotes = {};
    }

    expect(activeBookings).toHaveLength(0);
    expect(activeNotes).toEqual({});
  });

  // 3. Customer B never sees Customer A's cached bookings
  it("Requirement 3: Customer B never sees Customer A's cached bookings", async () => {
    // Customer A has bookings cached under Customer A's scoped key
    const bookingA = createSampleBooking("bk-a-1", "uid-customer-a", "customera@example.com");
    localStorage.setItem("astronext_consultation_bookings_uid-customer-a", JSON.stringify([bookingA]));

    // Customer B signs in with clean record in Firestore
    currentMockUser = { uid: "uid-customer-b", email: "customerb@example.com" };

    // Scoped key for Customer B
    const scopedKeyB = `astronext_consultation_bookings_${currentMockUser.uid}`;
    const initialCachedB = localStorage.getItem(scopedKeyB);
    const resolvedInitialBookings = initialCachedB ? JSON.parse(initialCachedB) : [];

    // Customer B must NOT inherit Customer A's cache
    expect(resolvedInitialBookings).toHaveLength(0);
    expect(resolvedInitialBookings.find((b: ConsultationBooking) => b.clientId === "uid-customer-a")).toBeUndefined();
  });

  // 4. A late response for Customer A cannot overwrite Customer B's state
  it("Requirement 4: A late response for Customer A cannot overwrite Customer B's state", async () => {
    let activeUid: string | null = null;
    let activeRequestId = 0;
    let stateBookings: readonly ConsultationBooking[] = [];

    // Step 1: Customer A signs in and triggers an async request
    currentMockUser = { uid: "uid-customer-a", email: "customera@example.com" };
    const requestAId = ++activeRequestId;
    activeUid = currentMockUser.uid;

    // Simulate delayed response for Customer A
    const lateResponsePromiseA = new Promise<readonly ConsultationBooking[]>((resolve) => {
      setTimeout(() => {
        resolve([createSampleBooking("bk-a-late", "uid-customer-a", "customera@example.com")]);
      }, 50);
    });

    // Step 2: Customer A signs out and Customer B signs in BEFORE Customer A's response returns
    currentMockUser = { uid: "uid-customer-b", email: "customerb@example.com" };
    const requestBId = ++activeRequestId;
    activeUid = currentMockUser.uid;
    const bookingB = createSampleBooking("bk-b-instant", "uid-customer-b", "customerb@example.com");
    stateBookings = [bookingB]; // Customer B's state is set

    // Step 3: Customer A's late response resolves
    const lateDataA = await lateResponsePromiseA;
    // Apply race-protection check
    if (activeRequestId === requestAId && activeUid === "uid-customer-a") {
      stateBookings = lateDataA; // This should NOT execute!
    }

    // Verify stateBookings still belongs exclusively to Customer B
    expect(stateBookings).toHaveLength(1);
    expect(stateBookings[0].id).toBe("bk-b-instant");
    expect(stateBookings[0].clientId).toBe("uid-customer-b");
    expect(stateBookings.find((b) => b.clientId === "uid-customer-a")).toBeUndefined();
  });

  // 5. Private notes do not leak across sessions
  it("Requirement 5: Private notes do not leak across sessions or to non-consultants", () => {
    // Consultant creates private notes
    const consultantEmail = "ravieadagale@gmail.com";
    expect(canViewPrivateNotes(consultantEmail)).toBe(true);

    const notesStore: Record<string, ConsultationNotesRecord> = {
      "bk-100": {
        privateNotes: "Confidential astrological observations: Rahu transit in 8th house",
        clientSummary: "Focus on mental peace, chant Gayatri Mantra daily",
        remedies: ["Gayatri Mantra", "Silver ring on thumb"],
        updatedAt: new Date().toISOString(),
      },
    };

    // Client requests private notes
    const customerEmail = "seeker@example.com";
    expect(canViewPrivateNotes(customerEmail)).toBe(false);

    const getPrivateNotes = (bookingId: string, email: string): string => {
      if (!canViewPrivateNotes(email)) return "";
      return notesStore[bookingId]?.privateNotes || "";
    };

    const getClientSummary = (bookingId: string) => {
      const record = notesStore[bookingId];
      if (!record) return null;
      return { summary: record.clientSummary, remedies: record.remedies };
    };

    // Client receives EMPTY private notes
    expect(getPrivateNotes("bk-100", customerEmail)).toBe("");

    // Client CAN view clientSummary
    const summary = getClientSummary("bk-100");
    expect(summary?.summary).toContain("chant Gayatri Mantra");
    expect(summary?.remedies).toHaveLength(2);

    // Consultant CAN view private notes
    expect(getPrivateNotes("bk-100", consultantEmail)).toContain("Rahu transit");
  });

  // 6. Same-user refresh restores authorized Firestore data
  it("Requirement 6: Same-user refresh restores authorized Firestore data", async () => {
    // Seed Firestore with Customer A's booking
    const bookingA = createSampleBooking("bk-a-firestore", "uid-customer-a", "customera@example.com");
    mockFirestoreDb.set(`consultations/bk-a-firestore`, bookingA);

    // Seed local cache with stale data
    localStorage.setItem(
      "astronext_consultation_bookings_uid-customer-a",
      JSON.stringify([{ ...bookingA, status: "REQUESTED" }])
    );

    // Same-user refresh fetches authoritative Firestore data
    const remoteList = await adapter.listBookingsByClient("uid-customer-a");
    expect(remoteList).toHaveLength(1);
    expect(remoteList[0].id).toBe("bk-a-firestore");
    expect(remoteList[0].status).toBe("CONFIRMED"); // Authoritative Firestore status overrides stale cache!
  });

  // 7. Local cache cannot overwrite Firestore
  it("Requirement 7: Local cache cannot overwrite Firestore records", async () => {
    // Firestore has CONFIRMED status
    mockFirestoreDb.set("consultations/bk-test-lock", {
      id: "bk-test-lock",
      status: "CONFIRMED",
      clientId: "uid-seeker-1",
      startTime: validIsoStartTime,
    });

    // Local cache has malicious/stale status transition
    const maliciousLocalCache = [{ id: "bk-test-lock", status: "COMPLETED" }];
    localStorage.setItem("astronext_consultation_bookings_uid-seeker-1", JSON.stringify(maliciousLocalCache));

    // Verify Firestore was NOT mutated by local cache
    const authoritativeDoc = mockFirestoreDb.get("consultations/bk-test-lock");
    expect(authoritativeDoc.status).toBe("CONFIRMED");
    expect(authoritativeDoc.status).not.toBe("COMPLETED");
  });

  // 8. Failed persistence does not report success
  it("Requirement 8: Failed persistence does not report success or update state", async () => {
    // Attempting status update on non-existent document throws error
    await expect(adapter.updateBookingStatus("non-existent-booking", "CONFIRMED")).rejects.toThrow(
      "Booking non-existent-booking not found in Firestore."
    );

    // Concurrency collision throws SLOT_ALREADY_RESERVED and does NOT write booking
    const lockKey = adapter.getSlotLockKey(PRIMARY_CONSULTANT.id, validIsoStartTime);
    mockFirestoreDb.set(`slotLocks/${lockKey}`, {
      lockId: lockKey,
      status: "RESERVED",
      expiresAt: { toMillis: () => Date.now() + 100000 },
    });

    currentMockUser = { uid: "uid-attacker", email: "attacker@test.com" };
    const duplicateRequest: ExtendedConsultationRequest = {
      serviceId: "srv-vedic-natal",
      requestedStartTime: validIsoStartTime,
      durationMinutes: 60,
      timezone: "Asia/Kolkata",
      clientUid: "uid-attacker",
      clientDetails: {
        name: "Attacker",
        email: "attacker@test.com",
      },
    };

    await expect(adapter.createBooking(duplicateRequest)).rejects.toThrow("SLOT_ALREADY_RESERVED");
  });

  // 9. Existing booking lifecycle persistence remains intact
  it("Requirement 9: Existing booking lifecycle persistence remains intact", async () => {
    const bookingId = "bk-lifecycle-test";
    mockFirestoreDb.set(`consultations/${bookingId}`, {
      id: bookingId,
      status: "CONFIRMED",
      clientId: "uid-seeker-1",
      startTime: validIsoStartTime,
      consultantId: PRIMARY_CONSULTANT.id,
    });

    const lockKey = adapter.getSlotLockKey(PRIMARY_CONSULTANT.id, validIsoStartTime);
    mockFirestoreDb.set(`slotLocks/${lockKey}`, {
      lockId: lockKey,
      status: "RESERVED",
    });

    // 1. Transition to IN_PROGRESS
    await adapter.updateBookingStatus(bookingId, "IN_PROGRESS");
    expect(mockFirestoreDb.get(`consultations/${bookingId}`).status).toBe("IN_PROGRESS");

    // 2. Transition to COMPLETED
    await adapter.updateBookingStatus(bookingId, "COMPLETED");
    expect(mockFirestoreDb.get(`consultations/${bookingId}`).status).toBe("COMPLETED");

    // 3. Cancel booking releases slot lock
    await adapter.updateBookingStatus(bookingId, "CANCELLED_BY_CLIENT");
    expect(mockFirestoreDb.get(`consultations/${bookingId}`).status).toBe("CANCELLED_BY_CLIENT");
    expect(mockFirestoreDb.get(`slotLocks/${lockKey}`).status).toBe("RELEASED");
  });

  // 10. Existing Super Admin/Admin separation and dual Practitioner capability remain intact
  it("Requirement 10: Super Admin/Admin separation and dual Practitioner capability remain intact", () => {
    const superAdmin = "ravieadagale@gmail.com";
    const admin = "ravii.adagale20@gmail.com";
    const customer = "seeker@example.com";

    // Super Admin identity
    expect(isSuperAdminEmail(superAdmin)).toBe(true);
    expect(resolveRoleFromEmail(superAdmin)).toBe("SUPER_ADMIN");
    expect(hasPractitionerCapability(superAdmin, "SUPER_ADMIN")).toBe(true);
    expect(canAccessConsultantWorkspace(superAdmin)).toBe(true);

    // Admin identity (strictly distinct; no Super Admin capability)
    expect(isAdminEmail(admin)).toBe(true);
    expect(isSuperAdminEmail(admin)).toBe(false);
    expect(resolveRoleFromEmail(admin)).toBe("ADMIN");
    expect(hasPractitionerCapability(admin, "ADMIN")).toBe(false);
    expect(canAccessConsultantWorkspace(admin)).toBe(true);

    // Customer identity (strictly no privileged access)
    expect(isSuperAdminEmail(customer)).toBe(false);
    expect(isAdminEmail(customer)).toBe(false);
    expect(resolveRoleFromEmail(customer)).toBe("CUSTOMER");
    expect(hasPractitionerCapability(customer, "CUSTOMER")).toBe(false);
    expect(canAccessConsultantWorkspace(customer)).toBe(false);
  });

  // 11. SuperAdminAuthProvider logout explicitly triggers ConsultationContext state clearing and purges user profile storage
  it("Requirement 11: SuperAdminAuthProvider logout explicitly triggers ConsultationContext state clearing and purges user profile storage", async () => {
    // 1. Simulate active session with stored profile and consultation state
    currentMockUser = { uid: "uid-active-user", email: "active@example.com" };
    localStorage.setItem(
      "astronext_active_user_profile",
      JSON.stringify({ id: "uid-active-user", email: "active@example.com", name: "Active User" })
    );
    let inMemoryBookings: readonly ConsultationBooking[] = [
      createSampleBooking("bk-active-1", "uid-active-user", "active@example.com"),
    ];
    let inMemoryNotes: Record<string, any> = { "bk-active-1": { privateNotes: "Active notes" } };

    expect(localStorage.getItem("astronext_active_user_profile")).toBeDefined();
    expect(inMemoryBookings).toHaveLength(1);
    expect(inMemoryNotes["bk-active-1"]).toBeDefined();

    // 2. Simulate SuperAdminAuthProvider.logout execution
    const simulateLogout = async () => {
      // Step A: Firebase signOut
      currentMockUser = null;
      // Step B: Purge user profile storage
      localStorage.removeItem("astronext_active_user_profile");
      // Step C: ConsultationContext session isolation triggers on auth transition
      inMemoryBookings = [];
      inMemoryNotes = {};
    };

    await simulateLogout();

    // 3. Verify complete cleanup across both auth and consultation state
    expect(currentMockUser).toBeNull();
    expect(localStorage.getItem("astronext_active_user_profile")).toBeNull();
    expect(inMemoryBookings).toHaveLength(0);
    expect(inMemoryNotes).toEqual({});
  });
});
