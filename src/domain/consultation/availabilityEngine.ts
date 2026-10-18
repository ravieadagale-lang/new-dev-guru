import {
  ConsultationAvailability,
  ConsultationSlot,
  ConsultationBooking,
  AvailabilityException,
  ConsultationMode,
} from "./types";
import { isSlotOccupyingStatus, detectBookingConflict } from "./conflictEngine";

export interface SlotGenerationParams {
  readonly availability: ConsultationAvailability;
  readonly serviceDurationMinutes: number;
  readonly bufferMinutes: number;
  readonly bookingDate: string; // "YYYY-MM-DD"
  readonly clientTimezone: string;
  readonly minimumNoticeMinutes?: number;
  readonly maximumAdvanceDays?: number;
  readonly existingBookings?: readonly ConsultationBooking[];
  readonly requestedMode?: ConsultationMode;
  readonly referenceNow?: string; // ISO 8601, defaults to new Date().toISOString()
}

/**
 * Checks if a string is a valid YYYY-MM-DD date.
 */
export function isValidDateString(dateStr: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr) && !isNaN(new Date(dateStr).getTime());
}

/**
 * Parses "HH:MM" into total minutes from start of day.
 */
export function parseTimeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error(`Invalid time format: ${timeStr}`);
  }
  return hours * 60 + minutes;
}

/**
 * Formats minutes from start of day into "HH:MM".
 */
export function formatMinutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

/**
 * Helper to construct an exact UTC ISO 8601 string from a date string ("YYYY-MM-DD")
 * and minute offset in a specific IANA timezone (e.g. "Asia/Kolkata").
 * Uses native Intl.DateTimeFormat with zero third-party dependencies.
 */
export function createZonedIsoDateTime(
  dateStr: string,
  timeMinutes: number,
  timeZone: string = "Asia/Kolkata"
): string {
  const timeStr = formatMinutesToTime(timeMinutes);
  if (!timeZone || timeZone === "UTC") {
    return `${dateStr}T${timeStr}:00.000Z`;
  }

  try {
    const guess = new Date(`${dateStr}T${timeStr}:00Z`);
    const dtf = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const parts = dtf.formatToParts(guess);
    const p: Record<string, string> = {};
    for (const part of parts) {
      p[part.type] = part.value;
    }
    let hour = parseInt(p.hour || "0", 10);
    if (hour === 24) hour = 0;
    const zonedDateStr = `${p.year}-${p.month}-${p.day}T${String(hour).padStart(2, "0")}:${p.minute}:${p.second}Z`;
    const offsetMs = new Date(zonedDateStr).getTime() - guess.getTime();
    const targetUtcMs = guess.getTime() - offsetMs;
    return new Date(targetUtcMs).toISOString();
  } catch {
    return `${dateStr}T${timeStr}:00.000Z`;
  }
}

/**
 * Backward compatible alias for createZonedIsoDateTime.
 */
export function createIsoDateTime(
  dateStr: string,
  timeMinutes: number,
  timeZone: string = "Asia/Kolkata"
): string {
  return createZonedIsoDateTime(dateStr, timeMinutes, timeZone);
}

/**
 * Deterministic Candidate Slot Generator.
 * Calculates all possible consultation slots for a given date according to the consultant's
 * availability configuration, working hours, breaks, exceptions, notice window, and existing bookings.
 */
export function generateCandidateSlots(params: SlotGenerationParams): readonly ConsultationSlot[] {
  const {
    availability,
    serviceDurationMinutes,
    bufferMinutes,
    bookingDate,
    existingBookings = [],
    requestedMode = "VIDEO",
    referenceNow = new Date().toISOString(),
  } = params;

  if (!isValidDateString(bookingDate)) {
    return [];
  }

  if (availability.active === false) {
    return [];
  }

  const nowTime = new Date(referenceNow).getTime();
  const minNoticeMinutes = params.minimumNoticeMinutes ?? 120;
  const maxAdvanceDays = params.maximumAdvanceDays ?? 30;

  // 1. Advance Window Check
  const maxAdvanceMs = maxAdvanceDays * 24 * 60 * 60 * 1000;
  const targetDayStartMs = new Date(`${bookingDate}T00:00:00Z`).getTime();
  if (targetDayStartMs - nowTime > maxAdvanceMs) {
    return [];
  }

  // 2. Find day of week for target date (0 = Sunday, 1 = Monday...)
  const dayOfWeek = new Date(`${bookingDate}T12:00:00Z`).getUTCDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6;

  // 3. Find matching rule
  const activeRule = availability.rules.find((r) => r.isActive !== false) || availability.rules[0];
  if (!activeRule) {
    return [];
  }

  const daySchedule = activeRule.weeklyHours.find((h) => h.dayOfWeek === dayOfWeek);
  if (!daySchedule || !daySchedule.isEnabled) {
    return [];
  }

  // 4. Exception / Blocked Days Check
  const exception = availability.exceptions?.find((e) => e.date === bookingDate);
  const isBlockedDay = exception && (exception.type === "BLOCKED_DAY" || exception.type === "HOLIDAY");

  const timeRanges = (exception && exception.type === "CUSTOM_HOURS" && exception.timeRanges)
    ? exception.timeRanges
    : daySchedule.timeRanges;
  const dayBreaks = daySchedule.breaks ?? [];

  const slots: ConsultationSlot[] = [];
  const slotInterval = serviceDurationMinutes + bufferMinutes;
  const consultantTz = availability.timezone || "Asia/Kolkata";

  for (const range of timeRanges) {
    const rangeStartMinutes = parseTimeToMinutes(range.start);
    const rangeEndMinutes = parseTimeToMinutes(range.end);

    let currentStartMinutes = rangeStartMinutes;

    while (currentStartMinutes + serviceDurationMinutes <= rangeEndMinutes) {
      const currentEndMinutes = currentStartMinutes + serviceDurationMinutes;

      const slotStartIso = createZonedIsoDateTime(bookingDate, currentStartMinutes, consultantTz);
      const slotEndIso = createZonedIsoDateTime(bookingDate, currentEndMinutes, consultantTz);
      const slotStartTime = new Date(slotStartIso).getTime();
      const slotEndTime = new Date(slotEndIso).getTime();
      const slotEffectiveEnd = slotEndTime + bufferMinutes * 60 * 1000;

      let isAvailable = true;
      let unavailableReason: string | undefined = undefined;

      // Check blocked day exception
      if (isBlockedDay) {
        isAvailable = false;
        unavailableReason = exception?.reason || "Date is blocked by consultant.";
      }

      // Check minimum notice
      if (isAvailable && slotStartTime - nowTime < minNoticeMinutes * 60 * 1000) {
        isAvailable = false;
        unavailableReason = "Slot falls within minimum advance notice window.";
      }

      // Check breaks
      if (isAvailable) {
        for (const brk of dayBreaks) {
          const breakStart = parseTimeToMinutes(brk.start);
          const breakEnd = parseTimeToMinutes(brk.end);
          // Overlaps if slot start is before break end and slot end is after break start
          if (currentStartMinutes < breakEnd && currentEndMinutes > breakStart) {
            isAvailable = false;
            unavailableReason = "Slot overlaps with scheduled consultant break.";
            break;
          }
        }
      }

      // Check existing bookings consuming schedule
      if (isAvailable) {
        for (const existing of existingBookings) {
          if (isSlotOccupyingStatus(existing.status)) {
            const existingStart = new Date(existing.startTime).getTime();
            const existingEnd = new Date(existing.endTime).getTime();
            const existingEndWithBuffer = existingEnd + bufferMinutes * 60 * 1000;

            // Symmetrical conflict check including buffers
            if (slotStartTime < existingEndWithBuffer && existingStart < slotEffectiveEnd) {
              isAvailable = false;
              unavailableReason = "Slot conflicts with an existing booking or buffer window.";
              break;
            }
          }
        }
      }

      slots.push({
        slotId: `slot-${bookingDate}-${currentStartMinutes}`,
        consultantId: availability.consultantId,
        serviceId: "consultation-service",
        mode: requestedMode,
        startTime: slotStartIso,
        endTime: slotEndIso,
        isAvailable,
        unavailableReason,
      });

      currentStartMinutes += slotInterval;
    }
  }

  return Object.freeze(slots);
}

export interface AvailableDatesParams {
  readonly availability: ConsultationAvailability;
  readonly serviceDurationMinutes: number;
  readonly bufferMinutes: number;
  readonly clientTimezone: string;
  readonly startDate?: string; // "YYYY-MM-DD"
  readonly daysAhead?: number;
  readonly existingBookings?: readonly ConsultationBooking[];
  readonly requestedMode?: ConsultationMode;
  readonly referenceNow?: string;
}

/**
 * Returns candidate dates that possess at least one valid available slot
 * based on the consultant's defined availability, service duration, buffers,
 * exceptions, and existing bookings.
 */
export function getAvailableDates(params: AvailableDatesParams): readonly string[] {
  const {
    availability,
    serviceDurationMinutes,
    bufferMinutes,
    clientTimezone,
    startDate,
    daysAhead = 21,
    existingBookings = [],
    requestedMode = "VIDEO",
    referenceNow = new Date().toISOString(),
  } = params;

  if (availability.active === false) {
    return [];
  }

  const resultDates: string[] = [];
  const baseDateObj = startDate ? new Date(`${startDate}T00:00:00Z`) : new Date(referenceNow);

  for (let i = 0; i < daysAhead; i++) {
    const candidateDateObj = new Date(baseDateObj.getTime() + i * 24 * 60 * 60 * 1000);
    const dateStr = candidateDateObj.toISOString().split("T")[0];

    const slots = generateCandidateSlots({
      availability,
      serviceDurationMinutes,
      bufferMinutes,
      bookingDate: dateStr,
      clientTimezone,
      existingBookings,
      requestedMode,
      referenceNow,
    });

    const hasAvailableSlot = slots.some((s) => s.isAvailable);
    if (hasAvailableSlot) {
      resultDates.push(dateStr);
    }
  }

  return Object.freeze(resultDates);
}

export interface ValidateBookingSlotParams {
  readonly availability: ConsultationAvailability;
  readonly startTime: string; // ISO 8601
  readonly durationMinutes: number;
  readonly bufferMinutes?: number;
  readonly existingBookings?: readonly ConsultationBooking[];
  readonly minimumNoticeMinutes?: number;
  readonly maximumAdvanceDays?: number;
  readonly referenceNow?: string;
}

export interface SlotValidationResult {
  readonly isValid: boolean;
  readonly error?: string;
}

/**
 * Authoritative validator ensuring client slot submissions are strictly valid
 * according to consultant working hours, breaks, blocked dates, notice window, and conflict engine.
 */
export function validateBookingSlot(params: ValidateBookingSlotParams): SlotValidationResult {
  const {
    availability,
    startTime,
    durationMinutes,
    bufferMinutes = 15,
    existingBookings = [],
    minimumNoticeMinutes = 120,
    maximumAdvanceDays = 30,
    referenceNow = new Date().toISOString(),
  } = params;

  if (availability.active === false) {
    return { isValid: false, error: "Consultant availability is currently inactive." };
  }

  const startTimeMs = new Date(startTime).getTime();
  if (isNaN(startTimeMs)) {
    return { isValid: false, error: "Invalid slot start time format." };
  }

  if (durationMinutes <= 0 || isNaN(durationMinutes)) {
    return { isValid: false, error: "Invalid consultation duration." };
  }

  const nowMs = new Date(referenceNow).getTime();
  if (startTimeMs - nowMs < minimumNoticeMinutes * 60 * 1000) {
    return { isValid: false, error: "Slot falls within minimum advance notice window." };
  }

  if (startTimeMs - nowMs > maximumAdvanceDays * 24 * 60 * 60 * 1000) {
    return { isValid: false, error: "Slot is beyond maximum allowed advance booking window." };
  }

  // Decompose start time into consultant's availability timezone
  const consultantTz = availability.timezone || "Asia/Kolkata";
  let consultantLocalDate: string;
  let startMinutes: number;
  let consultantDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  try {
    const dtf = new Intl.DateTimeFormat("en-US", {
      timeZone: consultantTz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const parts = dtf.formatToParts(new Date(startTimeMs));
    const p: Record<string, string> = {};
    for (const part of parts) {
      p[part.type] = part.value;
    }
    let hour = parseInt(p.hour || "0", 10);
    if (hour === 24) hour = 0;
    const min = parseInt(p.minute || "0", 10);
    consultantLocalDate = `${p.year}-${p.month}-${p.day}`;
    startMinutes = hour * 60 + min;

    const dayName = new Intl.DateTimeFormat("en-US", {
      timeZone: consultantTz,
      weekday: "short",
    }).format(new Date(startTimeMs));
    const dayMap: Record<string, 0 | 1 | 2 | 3 | 4 | 5 | 6> = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };
    consultantDayOfWeek = dayMap[dayName] ?? 0;
  } catch {
    return { isValid: false, error: "Failed to parse time in consultant timezone." };
  }

  // Check blocked day exception
  const exception = availability.exceptions?.find((e) => e.date === consultantLocalDate);
  if (exception && (exception.type === "BLOCKED_DAY" || exception.type === "HOLIDAY")) {
    return {
      isValid: false,
      error: `Date ${consultantLocalDate} is blocked: ${exception.reason || "Consultant unavailable"}`,
    };
  }

  // Check weekly hours
  const activeRule = availability.rules.find((r) => r.isActive !== false) || availability.rules[0];
  if (!activeRule) {
    return { isValid: false, error: "No active availability rules found." };
  }

  const daySchedule = activeRule.weeklyHours.find((h) => h.dayOfWeek === consultantDayOfWeek);
  if (!daySchedule || !daySchedule.isEnabled) {
    return { isValid: false, error: "Consultant is closed on this day of week." };
  }

  const timeRanges = (exception && exception.type === "CUSTOM_HOURS" && exception.timeRanges)
    ? exception.timeRanges
    : daySchedule.timeRanges;
  const endMinutes = startMinutes + durationMinutes;

  // Check within at least one working range
  const fallsInWorkingWindow = timeRanges.some((r) => {
    const rStart = parseTimeToMinutes(r.start);
    const rEnd = parseTimeToMinutes(r.end);
    return startMinutes >= rStart && endMinutes <= rEnd;
  });

  if (!fallsInWorkingWindow) {
    return { isValid: false, error: "Requested time falls outside consultant working hours." };
  }

  // Check breaks
  const dayBreaks = daySchedule.breaks ?? [];
  for (const brk of dayBreaks) {
    const brkStart = parseTimeToMinutes(brk.start);
    const brkEnd = parseTimeToMinutes(brk.end);
    if (startMinutes < brkEnd && endMinutes > brkStart) {
      return { isValid: false, error: "Requested time overlaps with a scheduled consultant break." };
    }
  }

  // Check conflict with existing bookings
  const endTimeIso = new Date(startTimeMs + durationMinutes * 60 * 1000).toISOString();
  const conflict = detectBookingConflict(
    { startTime, endTime: endTimeIso, bufferMinutes },
    existingBookings as ConsultationBooking[],
    { defaultBufferMinutes: bufferMinutes }
  );

  if (conflict.hasConflict) {
    return {
      isValid: false,
      error: conflict.conflictReason || "Requested time conflicts with an existing booking or buffer window.",
    };
  }

  return { isValid: true };
}
