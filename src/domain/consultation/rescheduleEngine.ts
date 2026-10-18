import { ConsultationBooking, RescheduleEvent } from "./types";
import { isTerminalStatus } from "./bookingStateMachine";

export interface RequestRescheduleParams {
  booking: ConsultationBooking;
  requester: "CLIENT" | "CONSULTANT";
  requestedStartTime?: string;
  proposedStartTime?: string;
  reason: string;
  maxAllowedReschedules?: number;
  nowIso?: string;
}

export interface RescheduleResult {
  success: boolean;
  updatedBooking?: ConsultationBooking;
  error?: string;
}

export function requestReschedule(params: RequestRescheduleParams): RescheduleResult {
  const {
    booking,
    requester,
    requestedStartTime,
    proposedStartTime,
    reason,
    maxAllowedReschedules = 2,
    nowIso = new Date().toISOString(),
  } = params;

  if (isTerminalStatus(booking.status)) {
    return {
      success: false,
      error: `Cannot reschedule booking in terminal state '${booking.status}'.`,
    };
  }

  const history = booking.rescheduleHistory || [];
  if (history.length >= maxAllowedReschedules) {
    return {
      success: false,
      error: `Maximum allowed reschedules (${maxAllowedReschedules}) reached.`,
    };
  }

  const targetTime = proposedStartTime || requestedStartTime;
  if (!targetTime) {
    return {
      success: false,
      error: "Proposed or requested start time must be provided.",
    };
  }

  const nextStatus = requester === "CLIENT" ? "RESCHEDULE_REQUESTED" : "RESCHEDULE_PROPOSED";

  const event: RescheduleEvent = {
    rescheduleId: `res-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    requestedAt: nowIso,
    requestedBy: requester,
    previousStartTime: booking.startTime,
    proposedStartTime: targetTime,
    reason,
    status: requester === "CLIENT" ? "REQUESTED" : "PROPOSED",
  };

  const updatedBooking: ConsultationBooking = {
    ...booking,
    status: nextStatus,
    rescheduleHistory: [...history, event],
    updatedAt: nowIso,
  };

  return {
    success: true,
    updatedBooking,
  };
}

export function acceptReschedule(
  booking: ConsultationBooking,
  acceptedBy: "CLIENT" | "CONSULTANT",
  nowIso: string = new Date().toISOString()
): RescheduleResult {
  const history = [...(booking.rescheduleHistory || [])];
  if (history.length === 0) {
    return {
      success: false,
      error: "No active reschedule request found to accept.",
    };
  }

  const lastIndex = history.length - 1;
  const lastEvent = history[lastIndex];

  const updatedEvent: RescheduleEvent = {
    ...lastEvent,
    status: "ACCEPTED",
  };
  history[lastIndex] = updatedEvent;

  // Calculate new endTime preserving original duration
  const oldStart = new Date(booking.startTime).getTime();
  const oldEnd = new Date(booking.endTime).getTime();
  const durationMs = oldEnd - oldStart;
  const newStartMs = new Date(lastEvent.proposedStartTime).getTime();
  const newEndIso = new Date(newStartMs + durationMs).toISOString();

  const updatedBooking: ConsultationBooking = {
    ...booking,
    startTime: lastEvent.proposedStartTime,
    endTime: newEndIso,
    status: "CONFIRMED",
    rescheduleHistory: history,
    updatedAt: nowIso,
  };

  return {
    success: true,
    updatedBooking,
  };
}

export function declineReschedule(
  booking: ConsultationBooking,
  declinedBy: "CLIENT" | "CONSULTANT",
  reason?: string,
  nowIso: string = new Date().toISOString()
): RescheduleResult {
  const history = [...(booking.rescheduleHistory || [])];
  if (history.length === 0) {
    return {
      success: false,
      error: "No active reschedule request found to decline.",
    };
  }

  const lastIndex = history.length - 1;
  const lastEvent = history[lastIndex];

  history[lastIndex] = {
    ...lastEvent,
    status: "DECLINED",
  };

  const updatedBooking: ConsultationBooking = {
    ...booking,
    status: "CONFIRMED", // Revert to confirmed slot
    rescheduleHistory: history,
    updatedAt: nowIso,
  };

  return {
    success: true,
    updatedBooking,
  };
}
