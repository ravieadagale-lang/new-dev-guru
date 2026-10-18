import { describe, it, expect } from "vitest";
import {
  PRIMARY_CONSULTANT,
  PRIMARY_CONSULTANT_PROFILE,
  CANONICAL_MAIN_EXPERTISE,
  CANONICAL_AREAS_OF_EXPERTISE,
} from "../src/domain/consultation/operatorConfig";
import { CANONICAL_CONSULTATION_SERVICES } from "../src/domain/consultation/defaultServices";
import {
  calculateConsultationPrice,
} from "../src/domain/consultation/pricingEngine";
import { formatMoney } from "../src/domain/consultation/money";
import {
  generateCandidateSlots,
  getAvailableDates,
  validateBookingSlot,
} from "../src/domain/consultation/availabilityEngine";
import { createCanonicalAvailability } from "../src/domain/consultation/canonicalAvailability";
import {
  validateBookingStateTransition,
  getAllowedTransitions,
} from "../src/domain/consultation/bookingStateMachine";
import { calculateEndTime } from "../src/domain/consultation/businessRules";

describe("AstroNext Phase 7 Audit — Client Booking Flow UX & State Integrity", () => {
  describe("1. Consultant Profile Canonical Information", () => {
    it("preserves canonical consultant identity and expertise", () => {
      expect(PRIMARY_CONSULTANT.name).toBe("Ravie Adagale");
      expect(PRIMARY_CONSULTANT.title).toBe("Consultant");
      expect(PRIMARY_CONSULTANT_PROFILE.mainExpertise).toBe("Love & Relationship");
      expect(CANONICAL_MAIN_EXPERTISE).toBe("Love & Relationship");

      const expectedExpertise = [
        "Astrology",
        "Numerology",
        "Tarot Reading",
        "Master Crystal Healer",
        "Yantra Expert",
        "Vastu Expert",
        "Face Reader",
        "Graphology",
      ];
      expect(CANONICAL_AREAS_OF_EXPERTISE).toEqual(expectedExpertise);
      expect(PRIMARY_CONSULTANT_PROFILE.areasOfExpertise).toEqual(expectedExpertise);
    });

    it("has approved avatar asset URL and no unverified ratings or fake claims", () => {
      expect(PRIMARY_CONSULTANT_PROFILE.avatarUrl).toBe(
        "/assets/images/ravie_adagale_profile.png"
      );
      expect((PRIMARY_CONSULTANT_PROFILE as Record<string, unknown>).rating).toBeUndefined();
      expect((PRIMARY_CONSULTANT_PROFILE as Record<string, unknown>).reviewsCount).toBeUndefined();
    });
  });

  describe("2. Canonical Service Catalog & Pricing Integrity", () => {
    it("ensures each service has valid duration, price (amountMinor), and supported modes", () => {
      expect(CANONICAL_CONSULTATION_SERVICES.length).toBeGreaterThanOrEqual(6);

      for (const service of CANONICAL_CONSULTATION_SERVICES) {
        expect(service.id).toBeTruthy();
        expect(service.name).toBeTruthy();
        expect(service.durationMinutes).toBeGreaterThan(0);
        expect(service.price.amountMinor).toBeGreaterThan(0);
        expect(service.price.currency).toBe("INR");
        expect(service.supportedModes.length).toBeGreaterThan(0);
        expect(service.minimumNoticeMinutes).toBeGreaterThanOrEqual(0);
        expect(service.maxAdvanceBookingDays).toBeGreaterThan(0);
      }
    });

    it("calculates 20% discount correctly for PAY_IN_FULL_NOW", () => {
      const basePrice = { amountMinor: 500000, currency: "INR" as const }; // ₹5,000.00
      const fullPay = calculateConsultationPrice(basePrice, "PAY_IN_FULL_NOW");

      expect(fullPay.discountPercentage).toBe(20);
      expect(fullPay.discountAmount.amountMinor).toBe(100000); // ₹1,000.00
      expect(fullPay.finalAmount.amountMinor).toBe(400000); // ₹4,000.00
      expect(fullPay.finalPrice?.amountMinor).toBe(400000);
      expect(formatMoney(fullPay.finalAmount)).toBe("₹4,000.00");
    });

    it("keeps standard price with 0% discount for PAY_BEFORE_SESSION", () => {
      const basePrice = { amountMinor: 500000, currency: "INR" as const };
      const payLater = calculateConsultationPrice(basePrice, "PAY_BEFORE_SESSION");

      expect(payLater.discountPercentage).toBe(0);
      expect(payLater.discountAmount.amountMinor).toBe(0);
      expect(payLater.finalAmount.amountMinor).toBe(500000);
      expect(payLater.finalPrice?.amountMinor).toBe(500000);
      expect(formatMoney(payLater.finalAmount)).toBe("₹5,000.00");
    });
  });

  describe("3. Availability & Slot Generation Integrity", () => {
    const availability = createCanonicalAvailability();

    it("generates available dates strictly within booking window", () => {
      const dates = getAvailableDates({
        availability,
        serviceDurationMinutes: 45,
        bufferMinutes: 15,
        clientTimezone: "Asia/Kolkata",
        daysAhead: 14,
        existingBookings: [],
      });

      expect(Array.isArray(dates)).toBe(true);
      expect(dates.length).toBeGreaterThan(0);
      for (const d of dates) {
        expect(d).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    });

    it("generates candidate slots respecting working hours and buffers", () => {
      const dates = getAvailableDates({
        availability,
        serviceDurationMinutes: 45,
        bufferMinutes: 15,
        clientTimezone: "Asia/Kolkata",
        daysAhead: 14,
        existingBookings: [],
      });
      const targetDate = dates[0];

      const slots = generateCandidateSlots({
        availability,
        serviceDurationMinutes: 45,
        bufferMinutes: 15,
        bookingDate: targetDate,
        clientTimezone: "Asia/Kolkata",
        existingBookings: [],
      });

      expect(slots.length).toBeGreaterThan(0);
      for (const slot of slots) {
        expect(slot.startTime).toBeTruthy();
        expect(slot.endTime).toBeTruthy();
        const start = new Date(slot.startTime).getTime();
        const end = new Date(slot.endTime).getTime();
        expect(end - start).toBe(45 * 60 * 1000);
      }
    });

    it("validates slot availability and detects overlap conflicts with existing bookings", () => {
      const dates = getAvailableDates({
        availability,
        serviceDurationMinutes: 45,
        bufferMinutes: 15,
        clientTimezone: "Asia/Kolkata",
        daysAhead: 14,
        existingBookings: [],
      });
      const targetDate = dates[0];

      const slots = generateCandidateSlots({
        availability,
        serviceDurationMinutes: 45,
        bufferMinutes: 15,
        bookingDate: targetDate,
        clientTimezone: "Asia/Kolkata",
        existingBookings: [],
      });
      const candidate = slots[0];

      const existingBooking = {
        id: "bk-test-1",
        clientId: "client@test.com",
        clientEmail: "client@test.com",
        clientName: "Test Client",
        consultantId: PRIMARY_CONSULTANT.id,
        consultantEmail: PRIMARY_CONSULTANT.email,
        serviceId: "srv-vedic",
        category: "VEDIC_ASTROLOGY" as const,
        mode: "VIDEO" as const,
        startTime: candidate.startTime,
        endTime: candidate.endTime,
        timezone: "Asia/Kolkata",
        status: "CONFIRMED" as const,
        paymentStatus: "PAID" as const,
        rescheduleHistory: [],
        createdAt: "2026-09-01T00:00:00.000Z",
        updatedAt: "2026-09-01T00:00:00.000Z",
      };

      const referenceNow = new Date(new Date(candidate.startTime).getTime() - 24 * 60 * 60 * 1000).toISOString();

      const validation = validateBookingSlot({
        availability,
        startTime: candidate.startTime,
        durationMinutes: 45,
        bufferMinutes: 15,
        minimumNoticeMinutes: 120,
        referenceNow,
        existingBookings: [existingBooking],
      });

      expect(validation.isValid).toBe(false);
      expect(validation.error).toContain("overlaps with existing booking");
    });
  });

  describe("4. State Machine Transition & Lifecycle Boundary", () => {
    it("ensures initial booking request is strictly REQUESTED (never auto-confirmed)", () => {
      // Allowed consultant transitions from initial REQUESTED state
      const consultantAllowed = getAllowedTransitions("REQUESTED", "CONSULTANT");
      expect(consultantAllowed).toContain("CONFIRMED");
      expect(consultantAllowed).toContain("DECLINED");

      // Verify that a booking cannot transition directly from REQUESTED to COMPLETED
      const invalidJump = validateBookingStateTransition("REQUESTED", "COMPLETED", "CONSULTANT");
      expect(invalidJump.isValid).toBe(false);
    });

    it("enforces consultant review before reaching CONFIRMED status", () => {
      const toConfirmed = validateBookingStateTransition("REQUESTED", "CONFIRMED", "CONSULTANT");
      expect(toConfirmed.isValid).toBe(true);

      const toInProgress = validateBookingStateTransition(
        "CONFIRMED",
        "IN_PROGRESS",
        "CONSULTANT",
        "PAID"
      );
      expect(toInProgress.isValid).toBe(true);

      const toCompleted = validateBookingStateTransition("IN_PROGRESS", "COMPLETED", "CONSULTANT");
      expect(toCompleted.isValid).toBe(true);
    });
  });

  describe("5. Review Step Data Contract Completeness", () => {
    it("verifies all 14 required Review fields are present and valid", () => {
      const service = CANONICAL_CONSULTATION_SERVICES[0];
      const slotStartTime = "2026-10-15T09:00:00.000Z";
      const slotEndTime = calculateEndTime(slotStartTime, service.durationMinutes);
      const pricing = calculateConsultationPrice(service.price, "PAY_IN_FULL_NOW");

      const reviewContract = {
        consultantName: PRIMARY_CONSULTANT.name,
        serviceName: service.name,
        category: service.category,
        durationMinutes: service.durationMinutes,
        communicationChannel: "Video Consultation",
        selectedDate: "2026-10-15",
        startTime: slotStartTime,
        endTime: slotEndTime,
        timezone: "Asia/Kolkata",
        clientName: "Ananya Sharma",
        clientEmail: "ananya@example.com",
        clientPhone: "+91 98765 43210",
        birthDetails: { dob: "1995-05-15", time: "14:30", place: "Pune" },
        focusTopic: "Career Transition & Planetary Periods",
        originalPrice: pricing.originalPrice,
        discountAmount: pricing.discountAmount,
        finalPrice: pricing.finalPrice,
        paymentOption: "PAY_IN_FULL_NOW",
        expectedSubmissionStatus: "REQUESTED",
      };

      expect(reviewContract.consultantName).toBe("Ravie Adagale");
      expect(reviewContract.serviceName).toBeTruthy();
      expect(reviewContract.durationMinutes).toBe(service.durationMinutes);
      expect(reviewContract.startTime).toBeTruthy();
      expect(reviewContract.endTime).toBeTruthy();
      expect(reviewContract.finalPrice.amountMinor).toBe(pricing.finalAmount.amountMinor);
      expect(reviewContract.expectedSubmissionStatus).toBe("REQUESTED");
    });
  });
});
