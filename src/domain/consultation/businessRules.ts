/**
 * Dev-Guru Consultation Business Rules & Timing Validation Engine
 */

export function calculateEndTime(startIso: string, durationMinutes: number): string {
  const start = new Date(startIso);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
  return end.toISOString();
}

export function calculateSlotWithBuffer(
  startIso: string,
  durationMinutes: number,
  bufferMinutes: number
): { serviceEnd: string; totalEnd: string } {
  const start = new Date(startIso);
  const serviceEnd = new Date(start.getTime() + durationMinutes * 60 * 1000).toISOString();
  const totalEnd = new Date(start.getTime() + (durationMinutes + bufferMinutes) * 60 * 1000).toISOString();
  return { serviceEnd, totalEnd };
}

export function validateNoticeWindow(
  startIso: string,
  noticeMinutes: number,
  nowIso: string = new Date().toISOString()
): { isValid: boolean; reason?: string } {
  const start = new Date(startIso).getTime();
  const now = new Date(nowIso).getTime();
  const diffMinutes = (start - now) / (60 * 1000);
  if (diffMinutes < noticeMinutes) {
    return {
      isValid: false,
      reason: `Minimum notice window of ${noticeMinutes} minutes required.`,
    };
  }
  return { isValid: true };
}

export function validateAdvanceWindow(
  startIso: string,
  advanceDays: number,
  nowIso: string = new Date().toISOString()
): { isValid: boolean; reason?: string } {
  const start = new Date(startIso).getTime();
  const now = new Date(nowIso).getTime();
  const diffDays = (start - now) / (24 * 60 * 60 * 1000);
  if (diffDays > advanceDays) {
    return {
      isValid: false,
      reason: `Maximum advance booking window of ${advanceDays} days exceeded.`,
    };
  }
  return { isValid: true };
}

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ["REQUESTED", "CANCELLED_BY_CLIENT"],
  REQUESTED: ["CONFIRMED", "DECLINED", "CANCELLED_BY_CLIENT", "EXPIRED"],
  CONFIRMED: ["IN_PROGRESS", "RESCHEDULE_REQUESTED", "RESCHEDULE_PROPOSED", "CANCELLED_BY_CLIENT", "CANCELLED_BY_CONSULTANT", "NO_SHOW"],
  IN_PROGRESS: ["COMPLETED", "CANCELLED_BY_CONSULTANT"],
  RESCHEDULE_REQUESTED: ["CONFIRMED", "DECLINED", "CANCELLED_BY_CLIENT"],
  RESCHEDULE_PROPOSED: ["CONFIRMED", "DECLINED", "CANCELLED_BY_CLIENT"],
  COMPLETED: [],
  CANCELLED_BY_CLIENT: [],
  CANCELLED_BY_CONSULTANT: [],
  DECLINED: [],
  EXPIRED: [],
  NO_SHOW: [],
};

export function validateStatusTransition(
  currentStatus: string,
  targetStatus: string,
  paymentStatus?: string
): { isAllowed: boolean; reason?: string; error?: string } {
  const allowed = ALLOWED_TRANSITIONS[currentStatus] || [];
  if (ALLOWED_TRANSITIONS[currentStatus]?.length === 0) {
    return {
      isAllowed: false,
      reason: `Cannot transition from terminal state ${currentStatus}.`,
      error: `Cannot transition from terminal state ${currentStatus}.`,
    };
  }
  if (!allowed.includes(targetStatus)) {
    return {
      isAllowed: false,
      reason: `Illegal state transition from ${currentStatus} to ${targetStatus}.`,
      error: `Illegal state transition from ${currentStatus} to ${targetStatus}.`,
    };
  }

  // Commercial gate: IN_PROGRESS requires payment to be PAID
  if (targetStatus === "IN_PROGRESS" && paymentStatus && paymentStatus !== "PAID") {
    return {
      isAllowed: false,
      reason: "Payment requirement not satisfied before session start.",
      error: "Payment requirement not satisfied before session start.",
    };
  }

  return { isAllowed: true };
}

export function validateCancellation(
  booking: { status: string; startTime: string },
  graceHours: number,
  nowIso: string = new Date().toISOString()
): { isAllowed: boolean; reason?: string } {
  if (["COMPLETED", "CANCELLED_BY_CLIENT", "CANCELLED_BY_CONSULTANT", "DECLINED"].includes(booking.status)) {
    return { isAllowed: false, reason: `Booking is already in terminal state ${booking.status}.` };
  }
  const sessionStart = new Date(booking.startTime).getTime();
  const reqTime = new Date(nowIso).getTime();
  const diffHours = (sessionStart - reqTime) / (60 * 60 * 1000);
  if (diffHours < graceHours) {
    return {
      isAllowed: false,
      reason: `Cancellation must be requested at least ${graceHours} hours in advance.`,
    };
  }
  return { isAllowed: true };
}

export function validateReschedule(
  booking: { status: string; startTime: string; rescheduleCount?: number },
  maxReschedules: number,
  noticeHours: number,
  nowIso: string = new Date().toISOString()
): { isAllowed: boolean; reason?: string } {
  const count = booking.rescheduleCount || 0;
  if (count >= maxReschedules) {
    return {
      isAllowed: false,
      reason: `Maximum of ${maxReschedules} reschedules reached.`,
    };
  }
  const sessionStart = new Date(booking.startTime).getTime();
  const reqTime = new Date(nowIso).getTime();
  const diffHours = (sessionStart - reqTime) / (60 * 60 * 1000);
  if (diffHours < noticeHours) {
    return {
      isAllowed: false,
      reason: `Reschedule must be requested at least ${noticeHours} hours in advance.`,
    };
  }
  return { isAllowed: true };
}
