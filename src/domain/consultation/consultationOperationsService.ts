import { ConsultationBooking, ConsultationService, ConsultationStatus, PaymentStatus, Money } from "./types";
import { detectBookingConflict } from "./conflictEngine";
import { validateBookingStateTransition, ActorRole } from "./bookingStateMachine";
import { cancelConsultationBooking, CancellationResult } from "./cancellationEngine";
import { requestReschedule, acceptReschedule, declineReschedule, RescheduleResult } from "./rescheduleEngine";
import { sanitizeClientConsultationData, assertNoPrivateNotesInPayload } from "./notesEngine";
import { createAuditRecord, ConsultationAuditRecord } from "./auditTrail";
import { createConsultationDomainEvent, ConsultationDomainEvent } from "./notificationEvents";
import {
  calculateConsultationPrice,
  consultationPricingService,
  ConsultationPricingService,
  ConsultationPaymentOption,
  ConsultationPriceBreakdown,
  isPaymentSatisfiedForSessionStart,
} from "./pricingEngine";

export class ConsultationOperationsService {
  readonly pricingService: ConsultationPricingService = consultationPricingService;
  /**
   * Evaluates if a proposed time slot can be safely scheduled without conflicts.
   */
  checkConflict(
    proposedSlot: { startTime: string; endTime: string; bufferMinutes?: number },
    existingBookings: ConsultationBooking[],
    options?: { defaultBufferMinutes?: number; ignoreBookingId?: string }
  ) {
    return detectBookingConflict(proposedSlot, existingBookings, options);
  }

  /**
   * Executes a controlled lifecycle state transition with role enforcement and audit record generation.
   */
  transitionState(params: {
    booking: ConsultationBooking;
    nextStatus: ConsultationStatus;
    actorRole: ActorRole;
    actorEmail: string;
    reason?: string;
  }): {
    success: boolean;
    updatedBooking?: ConsultationBooking;
    auditRecord?: ConsultationAuditRecord;
    domainEvent?: ConsultationDomainEvent;
    error?: string;
  } {
    const { booking, nextStatus, actorRole, actorEmail, reason } = params;

    const validation = validateBookingStateTransition(
      booking.status,
      nextStatus,
      actorRole,
      booking.paymentStatus
    );
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.reason || `Transition from ${booking.status} to ${nextStatus} denied.`,
      };
    }

    const previousStatus = booking.status;
    const nowIso = new Date().toISOString();

    const updatedBooking: ConsultationBooking = {
      ...booking,
      status: nextStatus,
      updatedAt: nowIso,
    };

    const auditRecord = createAuditRecord({
      bookingId: booking.id,
      previousStatus,
      newStatus: nextStatus,
      actorRole,
      actorEmail,
      reason,
    });

    const domainEvent = createConsultationDomainEvent(
      nextStatus === "CONFIRMED"
        ? "CONSULTATION_CONFIRMED"
        : nextStatus === "COMPLETED"
        ? "CONSULTATION_COMPLETED"
        : "CONSULTATION_REQUESTED",
      updatedBooking,
      actorRole === "CLIENT" ? booking.consultantEmail : booking.clientEmail,
      { actorEmail, reason }
    );

    return {
      success: true,
      updatedBooking,
      auditRecord,
      domainEvent,
    };
  }

  /**
   * Coordinates reschedule requests.
   */
  requestReschedule(params: {
    booking: ConsultationBooking;
    requester: "CLIENT" | "CONSULTANT";
    proposedStartTime: string;
    reason: string;
  }): RescheduleResult {
    return requestReschedule({
      ...params,
      nowIso: new Date().toISOString(),
    });
  }

  /**
   * Accepts an active reschedule request.
   */
  acceptReschedule(booking: ConsultationBooking, actor: "CLIENT" | "CONSULTANT"): RescheduleResult {
    return acceptReschedule(booking, actor, new Date().toISOString());
  }

  /**
   * Declines an active reschedule request.
   */
  declineReschedule(booking: ConsultationBooking, actor: "CLIENT" | "CONSULTANT", reason?: string): RescheduleResult {
    return declineReschedule(booking, actor, reason, new Date().toISOString());
  }

  /**
   * Processes a formal booking cancellation with policy grace window calculation.
   */
  cancelBooking(params: {
    booking: ConsultationBooking;
    service?: ConsultationService;
    cancelledBy: "CLIENT" | "CONSULTANT" | "ADMIN";
    reason: string;
  }): CancellationResult {
    return cancelConsultationBooking({
      ...params,
      nowIso: new Date().toISOString(),
    });
  }

  /**
   * Strictly sanitizes any data payload destined for client consumption to guarantee
   * zero leakage of private astrologer notes.
   */
  prepareClientPayload<T extends object>(payload: T): T {
    const sanitized = sanitizeClientConsultationData(payload);
    if (!assertNoPrivateNotesInPayload(sanitized)) {
      throw new Error("Security privacy boundary breach: Private consultant notes detected in client payload.");
    }
    return sanitized;
  }

  /**
   * Calculates deterministic consultation pricing with optional 20% advance discount.
   */
  calculatePrice(basePrice: Money, paymentOption: ConsultationPaymentOption): ConsultationPriceBreakdown {
    return calculateConsultationPrice(basePrice, paymentOption);
  }

  /**
   * Checks whether payment has been completed so session can start.
   */
  checkPaymentReadiness(booking: ConsultationBooking): { isReady: boolean; reason?: string } {
    const check = isPaymentSatisfiedForSessionStart(booking.paymentStatus);
    return { isReady: check.isSatisfied, reason: check.reason };
  }

  /**
   * Records payment status update on a consultation booking.
   */
  recordPayment(params: {
    booking: ConsultationBooking;
    paymentStatus: PaymentStatus;
    paymentOption?: ConsultationPaymentOption;
    actorEmail: string;
    note?: string;
  }): {
    success: boolean;
    updatedBooking: ConsultationBooking;
    auditRecord: ConsultationAuditRecord;
  } {
    const { booking, paymentStatus, paymentOption, actorEmail, note } = params;
    const nowIso = new Date().toISOString();

    const updatedBooking: ConsultationBooking = {
      ...booking,
      paymentStatus,
      paymentOption: paymentOption || booking.paymentOption,
      updatedAt: nowIso,
    };

    const auditRecord = createAuditRecord({
      bookingId: booking.id,
      previousStatus: booking.status,
      newStatus: booking.status,
      actorRole: "ADMIN",
      actorEmail,
      reason: note || "Payment status updated",
      metadata: {
        action: "PAYMENT_RECORDED",
        previousPaymentStatus: booking.paymentStatus,
        newPaymentStatus: paymentStatus,
        paymentOption: updatedBooking.paymentOption,
      },
    });

    return {
      success: true,
      updatedBooking,
      auditRecord,
    };
  }
}

export const consultationOperations = new ConsultationOperationsService();
