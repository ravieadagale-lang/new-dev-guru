import { ConsultationBooking, ConsultationService } from "./types";
import { isTerminalStatus } from "./bookingStateMachine";

export interface CancelBookingParams {
  booking: ConsultationBooking;
  service?: ConsultationService;
  cancelledBy: "CLIENT" | "CONSULTANT" | "ADMIN";
  reason: string;
  nowIso?: string;
}

export interface CancellationResult {
  success: boolean;
  updatedBooking?: ConsultationBooking;
  policyViolated: boolean;
  refundEligible: boolean;
  error?: string;
}

/**
 * Cancels a consultation booking, evaluating grace period and refund eligibility deterministically.
 */
export function cancelConsultationBooking(params: CancelBookingParams): CancellationResult {
  const {
    booking,
    service,
    cancelledBy,
    reason,
    nowIso = new Date().toISOString(),
  } = params;

  if (isTerminalStatus(booking.status)) {
    return {
      success: false,
      policyViolated: false,
      refundEligible: false,
      error: `Cannot cancel booking in terminal state '${booking.status}'.`,
    };
  }

  const graceHours = service?.cancellationGraceHours ?? 24;
  const startMs = new Date(booking.startTime).getTime();
  const nowMs = new Date(nowIso).getTime();

  const diffHours = (startMs - nowMs) / (60 * 60 * 1000);

  // If consultant/admin cancels, it's always non-violating for client and eligible for full refund
  let policyViolated = false;
  let refundEligible = true;

  if (cancelledBy === "CLIENT") {
    if (diffHours < graceHours) {
      policyViolated = true;
      refundEligible = false;
    } else {
      policyViolated = false;
      refundEligible = true;
    }
  }

  const nextStatus = cancelledBy === "CLIENT" ? "CANCELLED_BY_CLIENT" : "CANCELLED_BY_CONSULTANT";

  const updatedBooking: ConsultationBooking = {
    ...booking,
    status: nextStatus,
    paymentStatus: refundEligible && booking.paymentStatus === "PAID" ? "REFUNDED" : booking.paymentStatus,
    cancellationReason: reason,
    updatedAt: nowIso,
  };

  return {
    success: true,
    updatedBooking,
    policyViolated,
    refundEligible,
  };
}
