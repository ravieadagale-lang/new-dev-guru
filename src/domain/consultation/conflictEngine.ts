import { ConsultationBooking, ConsultationStatus } from "./types";

export interface SlotInterval {
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
  bufferMinutes?: number;
}

export interface ConflictDetectionOptions {
  defaultBufferMinutes?: number;
  ignoreBookingId?: string;
}

export interface ConflictResult {
  hasConflict: boolean;
  conflictingBookingId?: string;
  conflictReason?: string;
}

/**
 * Statuses that consume/occupy consultant schedule and block slot availability.
 */
export const SLOT_OCCUPYING_STATUSES: ReadonlySet<ConsultationStatus> = new Set([
  "REQUESTED",
  "PENDING_CONFIRMATION",
  "CONFIRMED",
  "RESCHEDULE_REQUESTED",
  "RESCHEDULE_PROPOSED",
  "RESCHEDULED",
  "IN_PROGRESS",
  "COMPLETED",
]);

/**
 * Statuses that release consultant schedule, making the slot available again.
 */
export const SLOT_RELEASING_STATUSES: ReadonlySet<ConsultationStatus> = new Set([
  "DRAFT",
  "CANCELLED_BY_CLIENT",
  "CANCELLED_BY_CONSULTANT",
  "DECLINED",
  "NO_SHOW_CLIENT",
  "NO_SHOW_CONSULTANT",
  "EXPIRED",
]);

/**
 * Checks if two time intervals [aStart, aEnd) and [bStart, bEnd) overlap.
 * Uses half-open interval comparison [start, end) so touching boundaries do not conflict.
 */
export function isOverlapping(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
  return aStart < bEnd && bStart < aEnd;
}

/**
 * Checks if a status represents an active booking that occupies consultant time.
 */
export function isSlotOccupyingStatus(status: ConsultationStatus | string): boolean {
  return SLOT_OCCUPYING_STATUSES.has(status as ConsultationStatus);
}

/**
 * Detects conflicts between a proposed consultation slot and existing bookings,
 * accounting for post-session buffer minutes.
 */
export function detectBookingConflict(
  proposed: SlotInterval,
  existingBookings: ConsultationBooking[],
  options: ConflictDetectionOptions = {}
): ConflictResult {
  const proposedStart = new Date(proposed.startTime).getTime();
  const proposedEnd = new Date(proposed.endTime).getTime();

  if (isNaN(proposedStart) || isNaN(proposedEnd) || proposedStart >= proposedEnd) {
    return {
      hasConflict: true,
      conflictReason: "Invalid proposed start and end time interval.",
    };
  }

  const defaultBuffer = options.defaultBufferMinutes ?? 0;
  const proposedBufferMs = (proposed.bufferMinutes ?? defaultBuffer) * 60 * 1000;
  const proposedEffectiveEnd = proposedEnd + proposedBufferMs;

  for (const existing of existingBookings) {
    if (options.ignoreBookingId && existing.id === options.ignoreBookingId) {
      continue;
    }

    if (!isSlotOccupyingStatus(existing.status)) {
      continue;
    }

    const existStart = new Date(existing.startTime).getTime();
    const existEnd = new Date(existing.endTime).getTime();

    if (isNaN(existStart) || isNaN(existEnd)) {
      continue;
    }

    const existBufferMs = defaultBuffer * 60 * 1000;
    const existEffectiveEnd = existEnd + existBufferMs;

    // Check if intervals overlap:
    // Slot A: [proposedStart, proposedEffectiveEnd)
    // Slot B: [existStart, existEffectiveEnd)
    if (isOverlapping(proposedStart, proposedEffectiveEnd, existStart, existEffectiveEnd)) {
      const isBufferOverlap =
        (proposedStart >= existEnd && proposedStart < existEffectiveEnd) ||
        (existStart >= proposedEnd && existStart < proposedEffectiveEnd);

      return {
        hasConflict: true,
        conflictingBookingId: existing.id,
        conflictReason: isBufferOverlap
          ? `Slot conflicts with required post-consultation buffer period for booking ${existing.id}.`
          : `Slot directly overlaps with existing booking ${existing.id} (${existing.startTime} - ${existing.endTime}).`,
      };
    }
  }

  return { hasConflict: false };
}
