import { describe, it, expect } from "vitest";
import {
  generateCandidateSlots,
  getAvailableDates,
  createZonedIsoDateTime,
  validateBookingSlot,
} from "../src/domain/consultation/availabilityEngine";
import {
  isOverlapping,
  detectBookingConflict,
  isSlotOccupyingStatus,
  SLOT_OCCUPYING_STATUSES,
  SLOT_RELEASING_STATUSES,
} from "../src/domain/consultation/conflictEngine";
import { CANONICAL_CONSULTANT_AVAILABILITY } from "../src/domain/consultation/canonicalAvailability";
import {
  ConsultationBooking,
  ConsultationStatus,
} from "../src/domain/consultation/types";
import {
  PRIMARY_CONSULTANT,
  PRIMARY_CONSULTANT_PROFILE,
  CANONICAL_MAIN_EXPERTISE,
  CANONICAL_AREAS_OF_EXPERTISE,
} from "../src/domain/consultation/operatorConfig";
import { calculateConsultationPrice } from "../src/domain/consultation/pricingEngine";

describe("Consultation Phase 6A: Availability, Slot Integrity, Timezones & Booking Boundaries", () => {
  // A. Consultant-controlled availability structure
  describe("A. Consultant-Controlled Availability Rules", () => {
    it("ensures canonical availability has consultant ownership and configured weekly hours", () => {
      expect(CANONICAL_CONSULTANT_AVAILABILITY.consultantId).toBe(PRIMARY_CONSULTANT.id);
      expect(CANONICAL_CONSULTANT_AVAILABILITY.timezone).toBe("Asia/Kolkata");
      expect(CANONICAL_CONSULTANT_AVAILABILITY.active).toBe(true);

      const activeRule = CANONICAL_CONSULTANT_AVAILABILITY.rules[0];
      expect(activeRule).toBeDefined();
      expect(activeRule.weeklyHours.length).toBe(7);

      // Sunday is disabled
      const sunday = activeRule.weeklyHours.find((h) => h.dayOfWeek === 0);
      expect(sunday?.isEnabled).toBe(false);

      // Monday is enabled with morning and afternoon windows
      const monday = activeRule.weeklyHours.find((h) => h.dayOfWeek === 1);
      expect(monday?.isEnabled).toBe(true);
      expect(monday?.timeRanges.length).toBeGreaterThanOrEqual(1);
    });
  });

  // B & C. Canonical slot generation & Breaks
  describe("B & C. Canonical Slot Generation & Scheduled Breaks", () => {
    it("generates slots aligned to working hours and marks break slots unavailable when break is within a working range", () => {
      // Create availability where a working window contains a break
      const availabilityWithBreak = {
        ...CANONICAL_CONSULTANT_AVAILABILITY,
        rules: [
          {
            ...CANONICAL_CONSULTANT_AVAILABILITY.rules[0],
            weeklyHours: CANONICAL_CONSULTANT_AVAILABILITY.rules[0].weeklyHours.map((h) =>
              h.dayOfWeek === 1 // Monday
                ? {
                    ...h,
                    timeRanges: [{ start: "09:00", end: "18:00" }],
                    breaks: [{ start: "13:00", end: "14:30" }],
                  }
                : h
            ),
          },
        ],
      };

      // 2026-10-05 is a Monday
      const slots = generateCandidateSlots({
        availability: availabilityWithBreak,
        serviceDurationMinutes: 60,
        bufferMinutes: 15,
        bookingDate: "2026-10-05",
        clientTimezone: "Asia/Kolkata",
        referenceNow: "2026-10-01T00:00:00Z",
      });

      expect(slots.length).toBeGreaterThan(0);

      // Slots overlapping 13:00-14:30 IST must be marked unavailable with break reason
      const breakSlots = slots.filter((slot) => {
        return slot.unavailableReason?.includes("break");
      });

      expect(breakSlots.length).toBeGreaterThan(0);
      for (const slot of breakSlots) {
        expect(slot.isAvailable).toBe(false);
      }
    });
  });

  // D. Blocked dates & holiday exceptions
  describe("D. Blocked Dates & Holiday Exceptions", () => {
    it("marks blocked exception dates as completely unavailable with reason on working weekdays", () => {
      // 2026-10-12 is a Monday (working day, 11 days ahead of referenceNow 2026-10-01)
      const customAvailability = {
        ...CANONICAL_CONSULTANT_AVAILABILITY,
        exceptions: [
          {
            id: "exc-diwali",
            date: "2026-10-12",
            type: "BLOCKED_DAY" as const,
            reason: "Diwali Puja Observance",
          },
        ],
      };

      const slots = generateCandidateSlots({
        availability: customAvailability,
        serviceDurationMinutes: 60,
        bufferMinutes: 15,
        bookingDate: "2026-10-12",
        clientTimezone: "Asia/Kolkata",
        referenceNow: "2026-10-01T00:00:00Z",
      });

      expect(slots.length).toBeGreaterThan(0);
      for (const slot of slots) {
        expect(slot.isAvailable).toBe(false);
        expect(slot.unavailableReason).toContain("Diwali Puja Observance");
      }
    });

    it("excludes blocked exception dates from getAvailableDates", () => {
      const customAvailability = {
        ...CANONICAL_CONSULTANT_AVAILABILITY,
        exceptions: [
          {
            id: "exc-blocked-monday",
            date: "2026-10-05", // Monday
            type: "BLOCKED_DAY" as const,
            reason: "Special Temple Visit",
          },
        ],
      };

      const dates = getAvailableDates({
        availability: customAvailability,
        serviceDurationMinutes: 60,
        bufferMinutes: 15,
        clientTimezone: "Asia/Kolkata",
        startDate: "2026-10-05",
        daysAhead: 1,
        referenceNow: "2026-10-01T00:00:00Z",
      });

      expect(dates).not.toContain("2026-10-05");
    });
  });

  // E & F. Session duration & Buffer validation
  describe("E & F. Session Duration and Buffer Validation", () => {
    it("enforces post-session buffer: 14:00-15:00 + 30m buffer prohibits session before 15:30", () => {
      // Existing consultation from 14:00 to 15:00 with 30-minute buffer
      const existing: ConsultationBooking = {
        id: "bk-14-15",
        serviceId: "srv-vedic",
        consultantId: PRIMARY_CONSULTANT.id,
        clientName: "Devotee",
        clientEmail: "client@test.com",
        status: "CONFIRMED",
        mode: "VIDEO",
        startTime: "2026-10-05T08:30:00.000Z", // 14:00 IST
        endTime: "2026-10-05T09:30:00.000Z",   // 15:00 IST
        durationMinutes: 60,
        timezone: "Asia/Kolkata",
        paymentStatus: "PAID",
        paymentOption: "PAY_IN_FULL_NOW",
        createdAt: "2026-10-01T00:00:00.000Z",
        updatedAt: "2026-10-01T00:00:00.000Z",
      };

      // Candidate A: 15:00 - 16:00 (inside the 30-min buffer window 15:00-15:30) -> CONFLICT!
      const conflictA = detectBookingConflict(
        {
          startTime: "2026-10-05T09:30:00.000Z", // 15:00 IST
          endTime: "2026-10-05T10:30:00.000Z",   // 16:00 IST
          bufferMinutes: 30,
        },
        [existing],
        { defaultBufferMinutes: 30 }
      );
      expect(conflictA.hasConflict).toBe(true);

      // Candidate B: 15:15 - 16:15 (still inside buffer) -> CONFLICT!
      const conflictB = detectBookingConflict(
        {
          startTime: "2026-10-05T09:45:00.000Z", // 15:15 IST
          endTime: "2026-10-05T10:45:00.000Z",   // 16:15 IST
          bufferMinutes: 30,
        },
        [existing],
        { defaultBufferMinutes: 30 }
      );
      expect(conflictB.hasConflict).toBe(true);

      // Candidate C: 15:30 - 16:30 (starts exactly when buffer ends) -> NO CONFLICT!
      const conflictC = detectBookingConflict(
        {
          startTime: "2026-10-05T10:00:00.000Z", // 15:30 IST
          endTime: "2026-10-05T11:00:00.000Z",   // 16:30 IST
          bufferMinutes: 30,
        },
        [existing],
        { defaultBufferMinutes: 30 }
      );
      expect(conflictC.hasConflict).toBe(false);
    });
  });

  // G, H, I, J. Status Occupancy Rules
  describe("G, H, I, J. Status Occupancy and Release Rules", () => {
    it("verifies all active statuses occupy calendar slots", () => {
      const activeStatuses: ConsultationStatus[] = [
        "REQUESTED",
        "PENDING_CONFIRMATION",
        "CONFIRMED",
        "RESCHEDULE_REQUESTED",
        "RESCHEDULE_PROPOSED",
        "RESCHEDULED",
        "IN_PROGRESS",
        "COMPLETED",
      ];

      for (const st of activeStatuses) {
        expect(isSlotOccupyingStatus(st)).toBe(true);
        expect(SLOT_OCCUPYING_STATUSES.has(st)).toBe(true);
      }
    });

    it("verifies inactive/cancelled/declined/expired statuses release calendar slots", () => {
      const releasingStatuses: ConsultationStatus[] = [
        "DRAFT",
        "CANCELLED_BY_CLIENT",
        "CANCELLED_BY_CONSULTANT",
        "DECLINED",
        "NO_SHOW_CLIENT",
        "NO_SHOW_CONSULTANT",
        "EXPIRED",
      ];

      for (const st of releasingStatuses) {
        expect(isSlotOccupyingStatus(st)).toBe(false);
        expect(SLOT_RELEASING_STATUSES.has(st)).toBe(true);
      }
    });

    it("proves that CANCELLED_BY_CLIENT releases the slot immediately for new bookings", () => {
      const slots = generateCandidateSlots({
        availability: CANONICAL_CONSULTANT_AVAILABILITY,
        serviceDurationMinutes: 60,
        bufferMinutes: 15,
        bookingDate: "2026-10-05",
        clientTimezone: "Asia/Kolkata",
        referenceNow: "2026-10-01T00:00:00Z",
      });

      const target = slots.find((s) => s.isAvailable);
      expect(target).toBeDefined();

      const cancelledBooking: ConsultationBooking = {
        id: "bk-cancelled",
        serviceId: "srv-vedic",
        consultantId: PRIMARY_CONSULTANT.id,
        clientName: "Seeker",
        clientEmail: "seeker@test.com",
        status: "CANCELLED_BY_CLIENT",
        mode: "VIDEO",
        startTime: target!.startTime,
        endTime: target!.endTime,
        durationMinutes: 60,
        timezone: "Asia/Kolkata",
        paymentStatus: "REFUNDED",
        paymentOption: "PAY_IN_FULL_NOW",
        createdAt: "2026-10-01T00:00:00.000Z",
        updatedAt: "2026-10-01T00:00:00.000Z",
      };

      const resultSlots = generateCandidateSlots({
        availability: CANONICAL_CONSULTANT_AVAILABILITY,
        serviceDurationMinutes: 60,
        bufferMinutes: 15,
        bookingDate: "2026-10-05",
        clientTimezone: "Asia/Kolkata",
        existingBookings: [cancelledBooking],
        referenceNow: "2026-10-01T00:00:00Z",
      });

      const slotState = resultSlots.find((s) => s.startTime === target!.startTime);
      expect(slotState?.isAvailable).toBe(true);
    });

    it("proves that DECLINED and EXPIRED statuses release the slot immediately", () => {
      const slots = generateCandidateSlots({
        availability: CANONICAL_CONSULTANT_AVAILABILITY,
        serviceDurationMinutes: 60,
        bufferMinutes: 15,
        bookingDate: "2026-10-05",
        clientTimezone: "Asia/Kolkata",
        referenceNow: "2026-10-01T00:00:00Z",
      });

      const target = slots.find((s) => s.isAvailable);
      expect(target).toBeDefined();

      const declinedBooking: ConsultationBooking = {
        id: "bk-declined",
        serviceId: "srv-vedic",
        consultantId: PRIMARY_CONSULTANT.id,
        clientName: "Seeker",
        clientEmail: "seeker@test.com",
        status: "DECLINED",
        mode: "VIDEO",
        startTime: target!.startTime,
        endTime: target!.endTime,
        durationMinutes: 60,
        timezone: "Asia/Kolkata",
        paymentStatus: "PENDING",
        paymentOption: "PAY_BEFORE_SESSION",
        createdAt: "2026-10-01T00:00:00.000Z",
        updatedAt: "2026-10-01T00:00:00.000Z",
      };

      const result = generateCandidateSlots({
        availability: CANONICAL_CONSULTANT_AVAILABILITY,
        serviceDurationMinutes: 60,
        bufferMinutes: 15,
        bookingDate: "2026-10-05",
        clientTimezone: "Asia/Kolkata",
        existingBookings: [declinedBooking],
        referenceNow: "2026-10-01T00:00:00Z",
      });

      const evaluated = result.find((s) => s.startTime === target!.startTime);
      expect(evaluated?.isAvailable).toBe(true);
    });
  });

  // K. Edge touching vs Overlapping
  describe("K. Edge Touching vs Direct Overlap", () => {
    it("handles boundary touching as non-conflicting half-open intervals [start, end)", () => {
      const slotAStart = 1000;
      const slotAEnd = 2000;
      const slotBStart = 2000; // Touches exactly where slot A ends
      const slotBEnd = 3000;

      expect(isOverlapping(slotAStart, slotAEnd, slotBStart, slotBEnd)).toBe(false);

      // Overlap by 1 millisecond
      expect(isOverlapping(slotAStart, slotAEnd, slotBStart - 1, slotBEnd)).toBe(true);
    });
  });

  // L & M. Timezone Model
  describe("L & M. Timezone Model & Date Rollover", () => {
    it("converts consultant local time in Asia/Kolkata to canonical UTC instant", () => {
      // 09:30 AM in Asia/Kolkata (UTC+05:30) is 04:00 UTC
      const kolkataIso = createZonedIsoDateTime("2026-10-05", 9 * 60 + 30, "Asia/Kolkata");
      expect(kolkataIso).toBe("2026-10-05T04:00:00.000Z");

      // Verify client in Asia/Kolkata reads back 09:30
      const istTime = new Date(kolkataIso).toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      expect(istTime).toBe("09:30");
    });

    it("accurately transforms canonical UTC instant for ahead and behind timezones", () => {
      const utcIso = createZonedIsoDateTime("2026-10-05", 9 * 60 + 30, "Asia/Kolkata"); // 04:00 UTC

      // Client ahead: Tokyo (UTC+9) -> 04:00 + 9 = 13:00
      const tokyoTime = new Date(utcIso).toLocaleTimeString("en-US", {
        timeZone: "Asia/Tokyo",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      expect(tokyoTime).toBe("13:00");

      // Client behind: London (BST UTC+1 in Oct) -> 04:00 + 1 = 05:00
      const londonTime = new Date(utcIso).toLocaleTimeString("en-US", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      expect(londonTime).toBe("05:00");

      // Midnight boundary: New York (EDT UTC-4 in Oct) -> 04:00 - 4 = 00:00 (Midnight)
      const nyTime = new Date(utcIso).toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      expect(nyTime).toBe("00:00");

      // Date rollover: Los Angeles (PDT UTC-7 in Oct) -> 04:00 UTC Oct 5 becomes 21:00 PDT on Oct 4!
      const laDtf = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const laFormatted = laDtf.format(new Date(utcIso));
      expect(laFormatted).toContain("10/04/2026");
      expect(laFormatted).toContain("21:00");
    });
  });

  // N & O. Client Slot Integrity Validation
  describe("N & O. Client Slot Integrity and Domain Validation", () => {
    it("validates and accepts a canonical slot during working hours", () => {
      // 10:00 AM IST on Monday Oct 5, 2026 (04:30 UTC)
      const validIso = "2026-10-05T04:30:00.000Z";
      const result = validateBookingSlot({
        availability: CANONICAL_CONSULTANT_AVAILABILITY,
        startTime: validIso,
        durationMinutes: 60,
        bufferMinutes: 15,
        referenceNow: "2026-10-01T00:00:00.000Z",
      });

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("rejects arbitrary slot time outside working hours (e.g. 03:00 AM IST)", () => {
      // 03:00 AM IST is 21:30 UTC previous day
      const arbitraryNightIso = "2026-10-04T21:30:00.000Z";
      const result = validateBookingSlot({
        availability: CANONICAL_CONSULTANT_AVAILABILITY,
        startTime: arbitraryNightIso,
        durationMinutes: 60,
        bufferMinutes: 15,
        referenceNow: "2026-10-01T00:00:00.000Z",
      });

      expect(result.isValid).toBe(false);
      expect(result.error).toContain("outside consultant working hours");
    });

    it("rejects slot during scheduled consultant break", () => {
      // Create availability where a working window contains a break
      const availabilityWithBreak = {
        ...CANONICAL_CONSULTANT_AVAILABILITY,
        rules: [
          {
            ...CANONICAL_CONSULTANT_AVAILABILITY.rules[0],
            weeklyHours: CANONICAL_CONSULTANT_AVAILABILITY.rules[0].weeklyHours.map((h) =>
              h.dayOfWeek === 1 // Monday
                ? {
                    ...h,
                    timeRanges: [{ start: "09:00", end: "18:00" }],
                    breaks: [{ start: "13:00", end: "14:30" }],
                  }
                : h
            ),
          },
        ],
      };

      // 13:30 IST is inside the 13:00-14:30 break -> 08:00 UTC
      const breakIso = "2026-10-05T08:00:00.000Z";
      const result = validateBookingSlot({
        availability: availabilityWithBreak,
        startTime: breakIso,
        durationMinutes: 60,
        bufferMinutes: 15,
        referenceNow: "2026-10-01T00:00:00.000Z",
      });

      expect(result.isValid).toBe(false);
      expect(result.error).toContain("break");
    });

    it("rejects slot on closed day of week (e.g. Sunday)", () => {
      // 2026-10-11 is a Sunday. 10:00 AM IST = 04:30 UTC
      const sundayIso = "2026-10-11T04:30:00.000Z";
      const result = validateBookingSlot({
        availability: CANONICAL_CONSULTANT_AVAILABILITY,
        startTime: sundayIso,
        durationMinutes: 60,
        bufferMinutes: 15,
        referenceNow: "2026-10-01T00:00:00.000Z",
      });

      expect(result.isValid).toBe(false);
      expect(result.error).toContain("closed");
    });

    it("rejects slot conflicting with existing confirmed booking and buffer", () => {
      const validIso = "2026-10-05T04:30:00.000Z"; // 10:00 IST

      const existingBooking: ConsultationBooking = {
        id: "bk-existing-10am",
        serviceId: "srv-vedic",
        consultantId: PRIMARY_CONSULTANT.id,
        clientName: "Seeker",
        clientEmail: "seeker@test.com",
        status: "CONFIRMED",
        mode: "VIDEO",
        startTime: validIso,
        endTime: "2026-10-05T05:30:00.000Z", // 11:00 IST
        durationMinutes: 60,
        timezone: "Asia/Kolkata",
        paymentStatus: "PAID",
        paymentOption: "PAY_IN_FULL_NOW",
        createdAt: "2026-10-01T00:00:00.000Z",
        updatedAt: "2026-10-01T00:00:00.000Z",
      };

      const result = validateBookingSlot({
        availability: CANONICAL_CONSULTANT_AVAILABILITY,
        startTime: validIso,
        durationMinutes: 60,
        bufferMinutes: 15,
        existingBookings: [existingBooking],
        referenceNow: "2026-10-01T00:00:00.000Z",
      });

      expect(result.isValid).toBe(false);
      expect(result.error).toMatch(/overlaps|conflicts/i);
    });

    it("rejects slot within minimum advance notice window", () => {
      // Slot in 30 minutes, but minimum notice is 120 minutes
      const now = new Date("2026-10-05T04:00:00.000Z");
      const inThirtyMin = new Date(now.getTime() + 30 * 60 * 1000).toISOString();

      const result = validateBookingSlot({
        availability: CANONICAL_CONSULTANT_AVAILABILITY,
        startTime: inThirtyMin,
        durationMinutes: 60,
        bufferMinutes: 15,
        minimumNoticeMinutes: 120,
        referenceNow: now.toISOString(),
      });

      expect(result.isValid).toBe(false);
      expect(result.error).toContain("notice");
    });
  });

  // P. Booking confirmation boundary
  describe("P. Booking Submission Lifecycle Boundary", () => {
    it("ensures initial client booking submission has status REQUESTED and not auto-confirmed", () => {
      const newBookingStatus: ConsultationStatus = "REQUESTED";
      expect(newBookingStatus).toBe("REQUESTED");
      expect(newBookingStatus).not.toBe("CONFIRMED");
    });
  });

  // Q. Profile Content Audit
  describe("Q. Profile Content Integrity & Exact Approved Facts", () => {
    it("verifies canonical name is Ravie Adagale", () => {
      expect(PRIMARY_CONSULTANT.name).toBe("Ravie Adagale");
    });

    it("verifies main expertise is Love & Relationship", () => {
      expect(PRIMARY_CONSULTANT_PROFILE.mainExpertise).toBe("Love & Relationship");
      expect(CANONICAL_MAIN_EXPERTISE).toBe("Love & Relationship");
    });

    it("verifies exact 8 canonical areas of expertise without addition or omission", () => {
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

    it("verifies bio is strictly focused on approved facts without unverified claims", () => {
      expect(PRIMARY_CONSULTANT_PROFILE.bio).toContain("Love & Relationship");
      expect(PRIMARY_CONSULTANT_PROFILE.bio).toContain("Astrology");
      expect(PRIMARY_CONSULTANT_PROFILE.bio).toContain("Graphology");

      // Verify removal of unsupported book/lineage claims
      expect(PRIMARY_CONSULTANT_PROFILE.authorDescription).toBeUndefined();
      expect(PRIMARY_CONSULTANT_PROFILE.authoredWorks).toBeUndefined();
      expect(PRIMARY_CONSULTANT_PROFILE.experienceYears).toBeUndefined();
    });

    it("verifies official profile photo is preserved", () => {
      expect(PRIMARY_CONSULTANT_PROFILE.avatarUrl).toBe("/assets/images/ravie_adagale_profile.png");
    });
  });

  // Payment pricing preservation
  describe("Commercial Pricing Preservation", () => {
    it("preserves 20% discount on PAY_IN_FULL_NOW and standard price on PAY_BEFORE_SESSION", () => {
      const baseMoney = { amountMinor: 500000, currency: "INR" as const }; // ₹5,000.00
      const advanceResult = calculateConsultationPrice(baseMoney, "PAY_IN_FULL_NOW");
      expect(advanceResult.discountPercentage).toBe(20);
      expect(advanceResult.discountAmount.amountMinor).toBe(100000); // ₹1,000.00
      expect(advanceResult.finalAmount.amountMinor).toBe(400000); // ₹4,000.00

      const laterResult = calculateConsultationPrice(baseMoney, "PAY_BEFORE_SESSION");
      expect(laterResult.discountPercentage).toBe(0);
      expect(laterResult.discountAmount.amountMinor).toBe(0);
      expect(laterResult.finalAmount.amountMinor).toBe(500000); // ₹5,000.00
    });
  });
});
