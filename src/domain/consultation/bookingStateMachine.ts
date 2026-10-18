import { ConsultationStatus, PaymentStatus } from "./types";

export type ActorRole = "CLIENT" | "CONSULTANT" | "ADMIN" | "SYSTEM";

export interface TransitionValidationResult {
  isValid: boolean;
  reason?: string;
}

export type StateTransitionContext = {
  paymentStatus?: PaymentStatus;
};

export const TERMINAL_STATUSES: ReadonlySet<ConsultationStatus> = new Set([
  "COMPLETED",
  "CANCELLED_BY_CLIENT",
  "CANCELLED_BY_CONSULTANT",
  "DECLINED",
  "NO_SHOW_CLIENT",
  "NO_SHOW_CONSULTANT",
  "EXPIRED",
]);

export function isTerminalStatus(status: ConsultationStatus): boolean {
  return TERMINAL_STATUSES.has(status);
}

/**
 * Authoritative lifecycle matrix mapping each status to its allowed next statuses,
 * broken down by authorized actor role.
 */
const STATUS_TRANSITIONS_BY_ROLE: Record<
  ConsultationStatus,
  Partial<Record<ActorRole, readonly ConsultationStatus[]>>
> = {
  DRAFT: {
    CLIENT: ["REQUESTED", "CANCELLED_BY_CLIENT"],
    ADMIN: ["CANCELLED_BY_CONSULTANT"],
    SYSTEM: ["EXPIRED"],
  },
  REQUESTED: {
    CLIENT: ["CANCELLED_BY_CLIENT", "RESCHEDULE_REQUESTED"],
    CONSULTANT: ["CONFIRMED", "DECLINED", "RESCHEDULE_PROPOSED", "CANCELLED_BY_CONSULTANT"],
    ADMIN: ["CONFIRMED", "DECLINED", "CANCELLED_BY_CONSULTANT"],
    SYSTEM: ["EXPIRED"],
  },
  PENDING_CONFIRMATION: {
    CLIENT: ["CANCELLED_BY_CLIENT"],
    CONSULTANT: ["CONFIRMED", "DECLINED", "CANCELLED_BY_CONSULTANT"],
    ADMIN: ["CONFIRMED", "DECLINED", "CANCELLED_BY_CONSULTANT"],
    SYSTEM: ["EXPIRED"],
  },
  CONFIRMED: {
    CLIENT: ["RESCHEDULE_REQUESTED", "CANCELLED_BY_CLIENT"],
    CONSULTANT: [
      "IN_PROGRESS",
      "RESCHEDULE_PROPOSED",
      "CANCELLED_BY_CONSULTANT",
      "NO_SHOW_CLIENT",
      "NO_SHOW_CONSULTANT",
    ],
    ADMIN: [
      "IN_PROGRESS",
      "CANCELLED_BY_CONSULTANT",
      "NO_SHOW_CLIENT",
      "NO_SHOW_CONSULTANT",
    ],
    SYSTEM: ["NO_SHOW_CLIENT", "NO_SHOW_CONSULTANT"],
  },
  RESCHEDULE_REQUESTED: {
    CLIENT: ["CANCELLED_BY_CLIENT"],
    CONSULTANT: ["CONFIRMED", "RESCHEDULE_PROPOSED", "DECLINED", "CANCELLED_BY_CONSULTANT"],
    ADMIN: ["CONFIRMED", "DECLINED", "CANCELLED_BY_CONSULTANT"],
    SYSTEM: ["EXPIRED"],
  },
  RESCHEDULE_PROPOSED: {
    CLIENT: ["CONFIRMED", "CANCELLED_BY_CLIENT", "DECLINED"],
    CONSULTANT: ["CONFIRMED", "CANCELLED_BY_CONSULTANT"],
    ADMIN: ["CONFIRMED", "CANCELLED_BY_CONSULTANT"],
    SYSTEM: ["EXPIRED"],
  },
  RESCHEDULED: {
    CLIENT: ["RESCHEDULE_REQUESTED", "CANCELLED_BY_CLIENT"],
    CONSULTANT: [
      "IN_PROGRESS",
      "RESCHEDULE_PROPOSED",
      "CANCELLED_BY_CONSULTANT",
      "NO_SHOW_CLIENT",
      "NO_SHOW_CONSULTANT",
    ],
    ADMIN: [
      "IN_PROGRESS",
      "CANCELLED_BY_CONSULTANT",
      "NO_SHOW_CLIENT",
      "NO_SHOW_CONSULTANT",
    ],
  },
  IN_PROGRESS: {
    CONSULTANT: ["COMPLETED", "CANCELLED_BY_CONSULTANT"],
    ADMIN: ["COMPLETED", "CANCELLED_BY_CONSULTANT"],
  },
  COMPLETED: {},
  CANCELLED_BY_CLIENT: {},
  CANCELLED_BY_CONSULTANT: {},
  DECLINED: {},
  NO_SHOW_CLIENT: {},
  NO_SHOW_CONSULTANT: {},
  EXPIRED: {},
};

/**
 * Validates whether a state transition is legal according to the authoritative state machine.
 * 
 * Commercial Governance Rule:
 * "A consultation CANNOT transition to IN_PROGRESS unless paymentStatus === 'PAID'."
 */
export function validateBookingStateTransition(
  currentStatus: ConsultationStatus,
  nextStatus: ConsultationStatus,
  actor: ActorRole,
  paymentContext?: PaymentStatus | StateTransitionContext
): TransitionValidationResult {
  if (currentStatus === nextStatus) {
    return { isValid: true };
  }

  if (isTerminalStatus(currentStatus)) {
    return {
      isValid: false,
      reason: `Cannot transition out of terminal state '${currentStatus}'.`,
    };
  }

  const roleTransitions = STATUS_TRANSITIONS_BY_ROLE[currentStatus]?.[actor] || [];
  if (!roleTransitions.includes(nextStatus)) {
    // Check if allowed for other actors to provide actionable diagnostic feedback
    const allAllowed = Object.entries(STATUS_TRANSITIONS_BY_ROLE[currentStatus] || {}).flatMap(
      ([, statuses]) => statuses || []
    );

    if (allAllowed.includes(nextStatus)) {
      return {
        isValid: false,
        reason: `Actor role '${actor}' is not authorized to transition booking from '${currentStatus}' to '${nextStatus}'.`,
      };
    }

    return {
      isValid: false,
      reason: `Illegal lifecycle transition from '${currentStatus}' to '${nextStatus}'.`,
    };
  }

  // Commercial Gate: when payment context is supplied, payment must be PAID before consultation starts
  if (paymentContext !== undefined) {
    const paymentStatus =
      typeof paymentContext === "string"
        ? paymentContext
        : paymentContext?.paymentStatus;

    if (nextStatus === "IN_PROGRESS" && paymentStatus !== "PAID") {
      return {
        isValid: false,
        reason: "Payment requirement not satisfied. Full consultation fee must be paid before session starts.",
      };
    }
  }

  return { isValid: true };
}

/**
 * Returns list of allowed next statuses for a given status and actor role.
 */
export function getAllowedTransitions(
  currentStatus: ConsultationStatus,
  actor: ActorRole
): readonly ConsultationStatus[] {
  return STATUS_TRANSITIONS_BY_ROLE[currentStatus]?.[actor] || [];
}
