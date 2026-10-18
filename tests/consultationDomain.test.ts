import { describe, it, expect } from "vitest";
import {
  createMoney,
  fromMajorUnits,
  toMajorUnits,
  formatMoney,
  addMoney,
  subtractMoney,
  multiplyMoney,
} from "../src/domain/consultation/money";
import {
  calculateEndTime,
  calculateSlotWithBuffer,
  validateNoticeWindow,
  validateAdvanceWindow,
  validateStatusTransition,
  validateCancellation,
  validateReschedule,
} from "../src/domain/consultation/businessRules";
import {
  validateConsultationService,
  validateConsultantProfile,
  validateAvailabilityRule,
  validateClientConsultationDetails,
  validateBookingRequest,
  validateConsultationNotes,
} from "../src/domain/consultation/validation";
import {
  CURRENT_CONSULTANT_EMAIL,
  ADMIN_CONSULTANT_EMAIL,
  PRIMARY_CONSULTANT,
  PRIMARY_CONSULTANT_PROFILE,
  CANONICAL_MAIN_EXPERTISE,
  CANONICAL_AREAS_OF_EXPERTISE,
  CANONICAL_AUTHOR_DESCRIPTION,
  CANONICAL_AUTHORED_WORKS,
} from "../src/domain/consultation/operatorConfig";
import {
  canAccessConsultantWorkspace,
  canManageServices,
  canViewBooking,
  canModifyBookingStatus,
  isPrimaryConsultant,
  normalizeEmail,
} from "../src/domain/consultation/authorization";
import {
  DeferredFirebaseConsultationAdapter,
} from "../src/domain/consultation/repositories";
import { CANONICAL_CONSULTATION_SERVICES } from "../src/domain/consultation/defaultServices";

describe("Consultation Domain: Money Value Object", () => {
  it("creates Money using integer minor units (paise/cents)", () => {
    const money = createMoney(250000, "INR");
    expect(money.amountMinor).toBe(250000);
    expect(money.currency).toBe("INR");
  });

  it("converts from major units accurately to minor units", () => {
    const money = fromMajorUnits(2500.5, "INR");
    expect(money.amountMinor).toBe(250050);
    expect(toMajorUnits(money)).toBe(2500.5);
  });

  it("formats currencies deterministically without floating-point error", () => {
    const inr = createMoney(250000, "INR");
    expect(formatMoney(inr)).toBe("₹2,500.00");

    const usd = createMoney(5000, "USD");
    expect(formatMoney(usd)).toBe("$50.00");
  });

  it("safely performs integer addition and subtraction", () => {
    const a = createMoney(150000, "INR");
    const b = createMoney(100000, "INR");
    const sum = addMoney(a, b);
    expect(sum.amountMinor).toBe(250000);

    const diff = subtractMoney(a, b);
    expect(diff.amountMinor).toBe(50000);
  });

  it("throws error when adding different currencies", () => {
    const inr = createMoney(10000, "INR");
    const usd = createMoney(1000, "USD");
    expect(() => addMoney(inr, usd)).toThrow("Cannot add money with different currencies");
  });

  it("multiplies money using integer rounding", () => {
    const original = createMoney(10000, "INR");
    const discounted = multiplyMoney(original, 0.8); // 20% discount
    expect(discounted.amountMinor).toBe(8000);
  });
});

describe("Consultation Domain: Business Rules & Timing", () => {
  it("calculates exact end time given ISO start time and duration", () => {
    const startIso = "2026-10-01T10:00:00.000Z";
    const endIso = calculateEndTime(startIso, 45);
    expect(endIso).toBe("2026-10-01T10:45:00.000Z");
  });

  it("calculates service end and total slot buffer correctly", () => {
    const startIso = "2026-10-01T10:00:00.000Z";
    const { serviceEnd, totalEnd } = calculateSlotWithBuffer(startIso, 30, 15);
    expect(serviceEnd).toBe("2026-10-01T10:30:00.000Z");
    expect(totalEnd).toBe("2026-10-01T10:45:00.000Z");
  });

  it("enforces minimum notice window", () => {
    const nowIso = "2026-10-01T10:00:00.000Z";
    // 60 minutes later (notice required: 120 mins) -> should fail
    const tooSoon = "2026-10-01T11:00:00.000Z";
    const resultFail = validateNoticeWindow(tooSoon, 120, nowIso);
    expect(resultFail.isValid).toBe(false);

    // 180 minutes later -> should pass
    const validTime = "2026-10-01T13:00:00.000Z";
    const resultPass = validateNoticeWindow(validTime, 120, nowIso);
    expect(resultPass.isValid).toBe(true);
  });

  it("enforces maximum advance booking window", () => {
    const nowIso = "2026-10-01T10:00:00.000Z";
    // 40 days later (max allowed: 30 days) -> should fail
    const tooFar = "2026-11-10T10:00:00.000Z";
    const resultFail = validateAdvanceWindow(tooFar, 30, nowIso);
    expect(resultFail.isValid).toBe(false);

    // 10 days later -> should pass
    const validAdvance = "2026-10-11T10:00:00.000Z";
    const resultPass = validateAdvanceWindow(validAdvance, 30, nowIso);
    expect(resultPass.isValid).toBe(true);
  });

  it("governs strict consultation status lifecycle transitions", () => {
    // Valid: REQUESTED -> CONFIRMED
    const validTransition = validateStatusTransition("REQUESTED", "CONFIRMED");
    expect(validTransition.isAllowed).toBe(true);

    // Valid: CONFIRMED -> IN_PROGRESS
    const startSession = validateStatusTransition("CONFIRMED", "IN_PROGRESS");
    expect(startSession.isAllowed).toBe(true);

    // Valid: IN_PROGRESS -> COMPLETED
    const complete = validateStatusTransition("IN_PROGRESS", "COMPLETED");
    expect(complete.isAllowed).toBe(true);

    // Illegal: COMPLETED -> REQUESTED (terminal state cannot revert)
    const illegalRevert = validateStatusTransition("COMPLETED", "REQUESTED");
    expect(illegalRevert.isAllowed).toBe(false);

    // Illegal: DRAFT -> COMPLETED directly
    const illegalJump = validateStatusTransition("DRAFT", "COMPLETED");
    expect(illegalJump.isAllowed).toBe(false);
  });

  it("validates cancellation according to grace hours policy", () => {
    const startTime = "2026-10-02T10:00:00.000Z";
    // Attempt to cancel 2 hours before session when policy requires 12 hours
    const reqTimeTooLate = "2026-10-02T08:00:00.000Z";
    const lateCancel = validateCancellation(
      { status: "CONFIRMED", startTime },
      12,
      reqTimeTooLate
    );
    expect(lateCancel.isAllowed).toBe(false);

    // Attempt to cancel 24 hours before session -> allowed
    const reqTimeInTime = "2026-10-01T10:00:00.000Z";
    const validCancel = validateCancellation(
      { status: "CONFIRMED", startTime },
      12,
      reqTimeInTime
    );
    expect(validCancel.isAllowed).toBe(true);
  });

  it("validates rescheduling limits and notice", () => {
    const startTime = "2026-10-02T10:00:00.000Z";
    // Already rescheduled twice
    const exceeded = validateReschedule(
      { status: "CONFIRMED", startTime, rescheduleCount: 2 },
      2,
      6,
      "2026-10-01T10:00:00.000Z"
    );
    expect(exceeded.isAllowed).toBe(false);
    expect(exceeded.reason).toContain("Maximum of 2 reschedules reached");
  });
});

describe("Consultation Domain: Data Validation", () => {
  it("validates canonical consultation services correctly", () => {
    for (const service of CANONICAL_CONSULTATION_SERVICES) {
      const result = validateConsultationService(service);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    }
  });

  it("rejects invalid consultation service payload", () => {
    const invalid = validateConsultationService({
      id: "",
      name: "Ab", // too short
      durationMinutes: 5, // below 15
    });
    expect(invalid.isValid).toBe(false);
    expect(invalid.errors.length).toBeGreaterThan(0);
  });

  it("validates consultant profile dossier", () => {
    const valid = validateConsultantProfile(PRIMARY_CONSULTANT_PROFILE);
    expect(valid.isValid).toBe(true);
  });

  it("validates client consultation inquiry details", () => {
    const valid = validateClientConsultationDetails({
      name: "Aarav Sharma",
      email: "aarav@example.com",
      focusTopic: "Saturn Mahadasha and Career Direction",
      birthDetails: {
        dob: "1992-05-14",
        time: "14:30",
        place: "Pune, Maharashtra, India",
      },
    });
    expect(valid.isValid).toBe(true);

    const invalid = validateClientConsultationDetails({
      name: "A",
      email: "not-an-email",
      focusTopic: "",
    });
    expect(invalid.isValid).toBe(false);
    expect(invalid.errors.length).toBeGreaterThanOrEqual(3);
  });

  it("validates full booking request", () => {
    const validReq = validateBookingRequest({
      serviceId: "srv-vedic-comprehensive",
      consultantId: PRIMARY_CONSULTANT.id,
      mode: "VIDEO",
      requestedStartTime: "2026-10-05T10:00:00.000Z",
      timezone: "Asia/Kolkata",
      clientDetails: {
        name: "Devi Patel",
        email: "devi@example.com",
        focusTopic: "Vedic Kundli Blueprint",
      },
    });
    expect(validReq.isValid).toBe(true);
  });

  it("validates consultation clinical notes", () => {
    const valid = validateConsultationNotes({
      bookingId: "book-123",
      consultantId: PRIMARY_CONSULTANT.id,
      privateNotes: "Client's Jupiter is exalted in 4th house. Advised Yellow Sapphire.",
    });
    expect(valid.isValid).toBe(true);
  });
});

describe("Consultation Domain: Operator & Authorization Boundaries", () => {
  it("verifies the primary operator email is ravieadagale@gmail.com", () => {
    expect(CURRENT_CONSULTANT_EMAIL).toBe("ravieadagale@gmail.com");
    expect(isPrimaryConsultant("ravieadagale@gmail.com")).toBe(true);
    expect(isPrimaryConsultant("RAVIEADAGALE@GMAIL.COM")).toBe(true);
    expect(isPrimaryConsultant("someoneelse@example.com")).toBe(false);
  });

  it("verifies authorized consultant workspace access", () => {
    // Super Admin primary consultant
    expect(canAccessConsultantWorkspace(CURRENT_CONSULTANT_EMAIL)).toBe(true);
    // Admin consultant
    expect(canAccessConsultantWorkspace(ADMIN_CONSULTANT_EMAIL)).toBe(true);
    // Random user / customer -> access denied
    expect(canAccessConsultantWorkspace("customer@example.com")).toBe(false);
    expect(canAccessConsultantWorkspace(null)).toBe(false);
  });

  it("verifies booking visibility permissions", () => {
    const booking = {
      clientEmail: "client@example.com",
      consultantEmail: CURRENT_CONSULTANT_EMAIL,
    };

    // Client can view their own booking
    expect(canViewBooking("client@example.com", booking)).toBe(true);
    // Consultant can view
    expect(canViewBooking(CURRENT_CONSULTANT_EMAIL, booking)).toBe(true);
    // Unrelated third party cannot view
    expect(canViewBooking("stranger@example.com", booking)).toBe(false);
  });

  it("verifies booking status modification boundaries", () => {
    const booking = {
      clientEmail: "client@example.com",
      consultantEmail: CURRENT_CONSULTANT_EMAIL,
      status: "CONFIRMED" as const,
    };

    // Client can cancel their own booking
    const clientCancel = canModifyBookingStatus("client@example.com", booking, "CANCELLED_BY_CLIENT");
    expect(clientCancel.isAllowed).toBe(true);

    // Client CANNOT mark booking as completed
    const clientComplete = canModifyBookingStatus("client@example.com", booking, "COMPLETED");
    expect(clientComplete.isAllowed).toBe(false);

    // Consultant can start and complete booking
    const consultantProgress = canModifyBookingStatus(CURRENT_CONSULTANT_EMAIL, booking, "IN_PROGRESS");
    expect(consultantProgress.isAllowed).toBe(true);

    const consultantComplete = canModifyBookingStatus(CURRENT_CONSULTANT_EMAIL, booking, "COMPLETED");
    expect(consultantComplete.isAllowed).toBe(true);
  });
});

describe("Consultation Domain: Persistence Repository Contracts", () => {
  it("deferred adapter explicitly reports PERSISTENCE_DEFERRED metadata", () => {
    const adapter = new DeferredFirebaseConsultationAdapter();
    const meta = adapter.getPersistenceMetadata();
    expect(meta.status).toBe("PERSISTENCE_DEFERRED");
    expect(meta.provider).toBe("UNCONNECTED");
    expect(meta.message).toContain("Firebase Firestore persistence is deferred for Phase 1");
  });

  it("deferred adapter returns empty collections without mocking", async () => {
    const adapter = new DeferredFirebaseConsultationAdapter();
    const bookings = await adapter.bookings.listBookingsByClient("client-123");
    expect(bookings).toEqual([]);

    const notifications = await adapter.notifications.listNotificationsForUser("test@example.com");
    expect(notifications).toEqual([]);
  });

  it("deferred adapter rejects write calls with explicit deferred message", async () => {
    const adapter = new DeferredFirebaseConsultationAdapter();
    await expect(
      adapter.bookings.createBooking({
        serviceId: "srv-1",
        consultantId: "c-1",
        mode: "VIDEO",
        requestedStartTime: "2026-10-01T10:00:00.000Z",
        timezone: "Asia/Kolkata",
        clientDetails: {
          name: "Test",
          email: "test@example.com",
          focusTopic: "Test Topic",
        },
      })
    ).rejects.toThrow("Persistence deferred: Real booking storage is disabled until Phase 3 Firebase connection.");
  });
});

describe("Consultant Profile Correction & Unsupported Claim Audit", () => {
  it("verifies canonical consultant display name is Ravie Adagale", () => {
    expect(PRIMARY_CONSULTANT.name).toBe("Ravie Adagale");
    expect(PRIMARY_CONSULTANT.name).not.toContain("Ravi E.");
  });

  it("verifies consultant profile contains the required main expertise: Love & Relationship", () => {
    expect(PRIMARY_CONSULTANT_PROFILE.mainExpertise).toBe("Love & Relationship");
    expect(CANONICAL_MAIN_EXPERTISE).toBe("Love & Relationship");
  });

  it("verifies consultant profile contains the exact approved 8 areas of expertise", () => {
    const expected = [
      "Astrology",
      "Numerology",
      "Tarot Reading",
      "Master Crystal Healer",
      "Yantra Expert",
      "Vastu Expert",
      "Face Reader",
      "Graphology",
    ];

    expect(PRIMARY_CONSULTANT_PROFILE.areasOfExpertise).toEqual(expected);
    expect(CANONICAL_AREAS_OF_EXPERTISE).toEqual(expected);
    expect(PRIMARY_CONSULTANT_PROFILE.areasOfExpertise.length).toBe(8);
  });

  it("verifies consultant profile contains no unsupported book or publication claims", () => {
    expect(PRIMARY_CONSULTANT_PROFILE.authorDescription).toBeUndefined();
    expect(PRIMARY_CONSULTANT_PROFILE.authoredWorks).toBeUndefined();
  });

  it("verifies no unsupported claims exist in canonical profile data", () => {
    // No fabricated years of experience
    expect(PRIMARY_CONSULTANT_PROFILE.experienceYears).toBeUndefined();

    // No fabricated academic degrees or unverified institutional claims
    expect(PRIMARY_CONSULTANT_PROFILE.qualifications).toBeUndefined();

    // No fabricated contact channel credentials in canonical profile
    expect(PRIMARY_CONSULTANT_PROFILE.contactChannels?.phone).toBeUndefined();
    expect(PRIMARY_CONSULTANT_PROFILE.contactChannels?.whatsAppPhone).toBeUndefined();
    expect(PRIMARY_CONSULTANT_PROFILE.contactChannels?.googleMeetUrl).toBeUndefined();
    expect(PRIMARY_CONSULTANT_PROFILE.contactChannels?.zoomJoinUrl).toBeUndefined();
  });

  it("verifies profile validation passes cleanly with canonical profile", () => {
    const result = validateConsultantProfile(PRIMARY_CONSULTANT_PROFILE);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});

