import { describe, it, expect } from "vitest";
import {
  detectBookingConflict,
  isOverlapping,
} from "../src/domain/consultation/conflictEngine";
import {
  validateBookingStateTransition,
  getAllowedTransitions,
  isTerminalStatus,
} from "../src/domain/consultation/bookingStateMachine";
import {
  requestReschedule,
  acceptReschedule,
  declineReschedule,
} from "../src/domain/consultation/rescheduleEngine";
import { cancelConsultationBooking } from "../src/domain/consultation/cancellationEngine";
import {
  validatePrivateNote,
  validateClientSummary,
  sanitizeClientConsultationData,
  assertNoPrivateNotesInPayload,
} from "../src/domain/consultation/notesEngine";
import {
  resolveCommunicationUri,
  getCommunicationModeDescriptor,
} from "../src/domain/consultation/communicationEngine";
import {
  calculateQuickQuestionTotal,
  validateQuickQuestionSubmission,
  answerQuickQuestion,
} from "../src/domain/consultation/quickQuestionEngine";
import {
  createMoney,
  fromMajorUnits,
  toMajorUnits,
  addMoney,
  formatMoney,
} from "../src/domain/consultation/money";
import { ConsultationBooking, ConsultationService } from "../src/domain/consultation/types";
import { CANONICAL_CONSULTATION_SERVICES } from "../src/domain/consultation/defaultServices";

const sampleService: ConsultationService = CANONICAL_CONSULTATION_SERVICES[0];

const createSampleBooking = (overrides: Partial<ConsultationBooking> = {}): ConsultationBooking => ({
  id: "bk-100",
  clientId: "client@example.com",
  clientEmail: "client@example.com",
  clientName: "Rohan Sharma",
  consultantId: "c-ravi",
  consultantEmail: "ravieadagale@gmail.com",
  serviceId: "srv-vedic-foundations",
  serviceName: "Vedic Horoscope Foundations",
  category: "VEDIC_HOROSCOPE",
  mode: "VIDEO_GOOGLE_MEET",
  startTime: "2026-10-10T10:00:00.000Z",
  endTime: "2026-10-10T11:00:00.000Z",
  timezone: "Asia/Kolkata",
  clientQuestion: "Career pivot consultation",
  status: "CONFIRMED",
  paymentStatus: "PAID",
  rescheduleHistory: [],
  createdAt: "2026-10-01T10:00:00.000Z",
  updatedAt: "2026-10-01T10:00:00.000Z",
  ...overrides,
});

describe("Phase 3: Conflict Detection Engine", () => {
  it("detects exact interval overlap", () => {
    const existing = [createSampleBooking()];
    const result = detectBookingConflict(
      {
        startTime: "2026-10-10T10:00:00.000Z",
        endTime: "2026-10-10T11:00:00.000Z",
        bufferMinutes: 0,
      },
      existing
    );
    expect(result.hasConflict).toBe(true);
    expect(result.conflictingBookingId).toBe("bk-100");
  });

  it("detects start time overlap within existing booking", () => {
    const existing = [createSampleBooking()];
    const result = detectBookingConflict(
      {
        startTime: "2026-10-10T10:30:00.000Z",
        endTime: "2026-10-10T11:30:00.000Z",
        bufferMinutes: 0,
      },
      existing
    );
    expect(result.hasConflict).toBe(true);
  });

  it("detects conflict during post-session buffer window", () => {
    const existing = [createSampleBooking()]; // 10:00 to 11:00, default buffer 15m -> busy until 11:15
    const result = detectBookingConflict(
      {
        startTime: "2026-10-10T11:05:00.000Z",
        endTime: "2026-10-10T12:00:00.000Z",
        bufferMinutes: 15,
      },
      existing,
      { defaultBufferMinutes: 15 }
    );
    expect(result.hasConflict).toBe(true);
    expect(result.conflictReason).toContain("buffer period");
  });

  it("allows non-overlapping adjacent booking outside buffer", () => {
    const existing = [createSampleBooking()]; // 10:00 to 11:00 + 15m buffer = free at 11:15
    const result = detectBookingConflict(
      {
        startTime: "2026-10-10T11:15:00.000Z",
        endTime: "2026-10-10T12:15:00.000Z",
        bufferMinutes: 15,
      },
      existing,
      { defaultBufferMinutes: 15 }
    );
    expect(result.hasConflict).toBe(false);
  });

  it("ignores cancelled, declined, or no-show bookings when checking conflicts", () => {
    const existing = [
      createSampleBooking({ id: "bk-cancelled", status: "CANCELLED_BY_CLIENT" }),
      createSampleBooking({ id: "bk-declined", status: "DECLINED" }),
    ];
    const result = detectBookingConflict(
      {
        startTime: "2026-10-10T10:00:00.000Z",
        endTime: "2026-10-10T11:00:00.000Z",
        bufferMinutes: 0,
      },
      existing
    );
    expect(result.hasConflict).toBe(false);
  });
});

describe("Phase 3: Authoritative Booking State Machine", () => {
  it("allows valid transitions for consultant actor", () => {
    expect(validateBookingStateTransition("REQUESTED", "CONFIRMED", "CONSULTANT").isValid).toBe(true);
    expect(validateBookingStateTransition("REQUESTED", "DECLINED", "CONSULTANT").isValid).toBe(true);
    expect(validateBookingStateTransition("CONFIRMED", "IN_PROGRESS", "CONSULTANT").isValid).toBe(true);
    expect(validateBookingStateTransition("IN_PROGRESS", "COMPLETED", "CONSULTANT").isValid).toBe(true);
  });

  it("prevents client from executing consultant-only transitions", () => {
    const clientConfirm = validateBookingStateTransition("REQUESTED", "CONFIRMED", "CLIENT");
    expect(clientConfirm.isValid).toBe(false);

    const clientComplete = validateBookingStateTransition("IN_PROGRESS", "COMPLETED", "CLIENT");
    expect(clientComplete.isValid).toBe(false);
  });

  it("allows client to request cancellation or reschedule", () => {
    expect(validateBookingStateTransition("REQUESTED", "CANCELLED_BY_CLIENT", "CLIENT").isValid).toBe(true);
    expect(validateBookingStateTransition("CONFIRMED", "RESCHEDULE_REQUESTED", "CLIENT").isValid).toBe(true);
  });

  it("rejects illegal transitions from terminal states", () => {
    expect(isTerminalStatus("COMPLETED")).toBe(true);
    expect(isTerminalStatus("CANCELLED_BY_CLIENT")).toBe(true);
    expect(isTerminalStatus("DECLINED")).toBe(true);

    const invalidResume = validateBookingStateTransition("COMPLETED", "IN_PROGRESS", "CONSULTANT");
    expect(invalidResume.isValid).toBe(false);
    expect(invalidResume.reason).toContain("terminal state");
  });
});

describe("Phase 3: Reschedule Engine", () => {
  it("allows client to request reschedule", () => {
    const booking = createSampleBooking({ status: "CONFIRMED" });
    const result = requestReschedule({
      booking,
      requester: "CLIENT",
      requestedStartTime: "2026-10-15T10:00:00.000Z",
      reason: "Unforeseen business travel",
      nowIso: "2026-10-01T10:00:00.000Z",
    });

    expect(result.success).toBe(true);
    expect(result.updatedBooking?.status).toBe("RESCHEDULE_REQUESTED");
    expect(result.updatedBooking?.rescheduleHistory.length).toBe(1);
    expect(result.updatedBooking?.rescheduleHistory[0].requestedBy).toBe("CLIENT");
  });

  it("allows consultant to propose reschedule", () => {
    const booking = createSampleBooking({ status: "CONFIRMED" });
    const result = requestReschedule({
      booking,
      requester: "CONSULTANT",
      proposedStartTime: "2026-10-16T14:00:00.000Z",
      reason: "Emergency ritual commitment",
      nowIso: "2026-10-01T10:00:00.000Z",
    });

    expect(result.success).toBe(true);
    expect(result.updatedBooking?.status).toBe("RESCHEDULE_PROPOSED");
  });

  it("accepts reschedule and updates booking times", () => {
    const booking = createSampleBooking({
      status: "RESCHEDULE_PROPOSED",
      rescheduleHistory: [
        {
          rescheduleId: "res-1",
          requestedAt: "2026-10-02T10:00:00.000Z",
          requestedBy: "CONSULTANT",
          previousStartTime: "2026-10-10T10:00:00.000Z",
          proposedStartTime: "2026-10-16T14:00:00.000Z",
          reason: "Emergency ritual",
          status: "PROPOSED",
        },
      ],
    });

    const result = acceptReschedule(booking, "CLIENT", "2026-10-03T10:00:00.000Z");
    expect(result.success).toBe(true);
    expect(result.updatedBooking?.status).toBe("CONFIRMED");
    expect(result.updatedBooking?.startTime).toBe("2026-10-16T14:00:00.000Z");
    expect(result.updatedBooking?.rescheduleHistory[0].status).toBe("ACCEPTED");
  });

  it("enforces maximum reschedule limit", () => {
    const booking = createSampleBooking({
      status: "CONFIRMED",
      rescheduleHistory: [
        {
          rescheduleId: "r1",
          requestedAt: "2026-10-01T00:00:00.000Z",
          requestedBy: "CLIENT",
          previousStartTime: "2026-10-10T10:00:00.000Z",
          proposedStartTime: "2026-10-11T10:00:00.000Z",
          reason: "r1",
          status: "ACCEPTED",
        },
        {
          rescheduleId: "r2",
          requestedAt: "2026-10-02T00:00:00.000Z",
          requestedBy: "CLIENT",
          previousStartTime: "2026-10-11T10:00:00.000Z",
          proposedStartTime: "2026-10-12T10:00:00.000Z",
          reason: "r2",
          status: "ACCEPTED",
        },
      ],
    });

    const result = requestReschedule({
      booking,
      requester: "CLIENT",
      requestedStartTime: "2026-10-13T10:00:00.000Z",
      reason: "Attempting 3rd reschedule",
      maxAllowedReschedules: 2,
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("Maximum allowed reschedules");
  });
});

describe("Phase 3: Cancellation Engine & Policy Windows", () => {
  it("allows cancellation outside policy grace period with eligible refund", () => {
    const booking = createSampleBooking({
      status: "CONFIRMED",
      startTime: "2026-10-10T10:00:00.000Z",
    });

    const result = cancelConsultationBooking({
      booking,
      service: sampleService,
      cancelledBy: "CLIENT",
      reason: "Personal scheduling conflict",
      nowIso: "2026-10-08T10:00:00.000Z", // 48 hours prior (grace is 24 hours)
    });

    expect(result.success).toBe(true);
    expect(result.updatedBooking?.status).toBe("CANCELLED_BY_CLIENT");
    expect(result.policyViolated).toBe(false);
    expect(result.refundEligible).toBe(true);
  });

  it("flags cancellation inside grace window as policy violation", () => {
    const booking = createSampleBooking({
      status: "CONFIRMED",
      startTime: "2026-10-10T10:00:00.000Z",
    });

    const result = cancelConsultationBooking({
      booking,
      service: sampleService,
      cancelledBy: "CLIENT",
      reason: "Cancelling 2 hours before session",
      nowIso: "2026-10-10T08:00:00.000Z", // 2 hours prior
    });

    expect(result.success).toBe(true);
    expect(result.policyViolated).toBe(true);
    expect(result.refundEligible).toBe(false);
  });
});

describe("Phase 3: Privacy Isolation for Notes", () => {
  it("validates private consultant notes", () => {
    const valid = validatePrivateNote({
      bookingId: "bk-1",
      consultantId: "c-1",
      privateNotes: "Client undergoing Rahu Mahadasha with afflicted 7th lord.",
    });
    expect(valid.isValid).toBe(true);

    const invalid = validatePrivateNote({
      bookingId: "bk-1",
      consultantId: "c-1",
      privateNotes: "Bad",
    });
    expect(invalid.isValid).toBe(false);
  });

  it("sanitizes consultation data for client view to prevent leakage of private notes", () => {
    const bookingWithPrivateNotes = {
      ...createSampleBooking(),
      privateNotes: "Extremely sensitive internal planetary observations and chart defects.",
    };

    const clientSafe = sanitizeClientConsultationData(bookingWithPrivateNotes);
    expect("privateNotes" in clientSafe).toBe(false);
    expect(assertNoPrivateNotesInPayload(clientSafe)).toBe(true);
  });

  it("detects private notes leakage in nested structures", () => {
    const payloadWithLeak = {
      id: "resp-1",
      booking: {
        id: "bk-1",
        privateNotes: "Leaked secret notes",
      },
    };
    expect(assertNoPrivateNotesInPayload(payloadWithLeak)).toBe(false);
  });
});

describe("Phase 3: Communication Engine", () => {
  it("generates actionable tel: link with clean digits", () => {
    const uri = resolveCommunicationUri("PHONE", { phone: "+91 98765 43210" });
    expect(uri.uri).toBe("tel:+919876543210");
    expect(uri.isActionable).toBe(true);
  });

  it("generates actionable WhatsApp direct link", () => {
    const uri = resolveCommunicationUri("WHATSAPP_AUDIO", { whatsAppPhone: "+91 98765 43210" });
    expect(uri.uri).toBe("https://wa.me/919876543210");
    expect(uri.isActionable).toBe(true);
  });

  it("truthfully falls back to unconfigured state when contact is absent", () => {
    const uri = resolveCommunicationUri("PHONE", {});
    expect(uri.isActionable).toBe(false);
    expect(uri.displayPlaceholder).toContain("Configured per session");
  });
});

describe("Phase 3: Quick Question Engine & Integer Money", () => {
  it("calculates quick question total using integer arithmetic", () => {
    const base = createMoney(99900, "INR"); // ₹999.00
    const calc = calculateQuickQuestionTotal(base, "EXPRESS"); // 24h: +₹500.00
    expect(calc.turnaroundHours).toBe(24);
    expect(calc.surcharge.amountMinor).toBe(50000);
    expect(calc.total.amountMinor).toBe(149900);
    expect(formatMoney(calc.total)).toBe("₹1,499.00");
  });

  it("validates quick question submission parameters", () => {
    const valid = validateQuickQuestionSubmission({
      clientName: "Pooja Roy",
      clientEmail: "pooja@example.com",
      question: "Will my relocation to Frankfurt materialize in 2026 Jupiter transit?",
      type: "CAREER_DECISION",
      turnaroundTier: "STANDARD",
    });
    expect(valid.isValid).toBe(true);

    const invalid = validateQuickQuestionSubmission({
      clientName: "",
      clientEmail: "not-an-email",
      question: "Too short",
      type: "CAREER_DECISION",
      turnaroundTier: "STANDARD",
    });
    expect(invalid.isValid).toBe(false);
    expect(invalid.errors.length).toBeGreaterThanOrEqual(3);
  });
});
