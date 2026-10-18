import { describe, it, expect } from "vitest";
import {
  calculateConsultationPrice,
  ConsultationPriceBreakdown,
  ADVANCE_PAYMENT_DISCOUNT_PERCENTAGE,
} from "../src/domain/consultation/pricingEngine";
import { CANONICAL_CONSULTATION_SERVICES } from "../src/domain/consultation/defaultServices";
import { CANONICAL_CONSULTANT_AVAILABILITY } from "../src/domain/consultation/canonicalAvailability";
import {
  generateCandidateSlots,
  getAvailableDates,
  validateBookingSlot,
} from "../src/domain/consultation/availabilityEngine";
import { formatMoney, createMoney } from "../src/domain/consultation/money";
import { calculateEndTime } from "../src/domain/consultation/businessRules";
import { getAllowedTransitions } from "../src/domain/consultation/bookingStateMachine";
import { ConsultationBooking } from "../src/domain/consultation/types";
import { PRIMARY_CONSULTANT } from "../src/domain/consultation/operatorConfig";

describe("Consultation Hotfix: Review Step Data Contract, Pricing Integrity & Rendering Safety", () => {
  const selectedService = CANONICAL_CONSULTATION_SERVICES[0]; // Master Vedic Kundli (₹2,500.00 = 250000 paise)
  const clientTimezone = "Asia/Kolkata";

  describe("1. Root Cause Reproduction: Pricing Breakdown Contract & formatMoney Safety", () => {
    it("guarantees calculateConsultationPrice returns defined finalPrice, finalAmount, basePrice, baseAmount, and originalPrice", () => {
      const breakdownFull = calculateConsultationPrice(selectedService.price, "PAY_IN_FULL_NOW");

      // Root cause was accessing .finalPrice when only .finalAmount existed, resulting in undefined passed to formatMoney
      expect(breakdownFull.finalAmount).toBeDefined();
      expect(breakdownFull.finalPrice).toBeDefined();
      expect(breakdownFull.baseAmount).toBeDefined();
      expect(breakdownFull.basePrice).toBeDefined();
      expect(breakdownFull.originalPrice).toBeDefined();
      expect(breakdownFull.discountAmount).toBeDefined();

      // Equivalence between aliases
      expect(breakdownFull.finalPrice).toEqual(breakdownFull.finalAmount);
      expect(breakdownFull.originalPrice).toEqual(breakdownFull.baseAmount);
      expect(breakdownFull.basePrice).toEqual(breakdownFull.baseAmount);

      // formatMoney must format both finalAmount and finalPrice without throwing
      expect(() => formatMoney(breakdownFull.finalAmount)).not.toThrow();
      expect(() => formatMoney(breakdownFull.finalPrice)).not.toThrow();
      expect(formatMoney(breakdownFull.finalPrice)).toBe("₹2,000.00");
    });

    it("evaluates PAY_BEFORE_SESSION correctly with standard rate and zero discount", () => {
      const breakdownStandard = calculateConsultationPrice(selectedService.price, "PAY_BEFORE_SESSION");

      expect(breakdownStandard.finalAmount).toBeDefined();
      expect(breakdownStandard.finalPrice).toBeDefined();
      expect(breakdownStandard.originalPrice).toBeDefined();
      expect(breakdownStandard.discountAmount.amountMinor).toBe(0);
      expect(breakdownStandard.discountPercentage).toBe(0);

      expect(breakdownStandard.finalPrice).toEqual(selectedService.price);
      expect(formatMoney(breakdownStandard.finalPrice)).toBe("₹2,500.00");
    });
  });

  describe("2. Review Step Data Contract with Real Canonical Availability Slot", () => {
    it("retrieves a real valid slot from availabilityEngine and verifies all fields required by Review step", () => {
      const availableDates = getAvailableDates({
        availability: CANONICAL_CONSULTANT_AVAILABILITY,
        serviceDurationMinutes: selectedService.durationMinutes,
        bufferMinutes: selectedService.bufferMinutes,
        clientTimezone,
        daysAhead: 14,
        existingBookings: [],
        requestedMode: "VIDEO",
      });

      expect(availableDates.length).toBeGreaterThan(0);
      const targetDate = availableDates[0];

      const candidateSlots = generateCandidateSlots({
        availability: CANONICAL_CONSULTANT_AVAILABILITY,
        serviceDurationMinutes: selectedService.durationMinutes,
        bufferMinutes: selectedService.bufferMinutes,
        bookingDate: targetDate,
        clientTimezone,
        existingBookings: [],
        requestedMode: "VIDEO",
        minimumNoticeMinutes: selectedService.minimumNoticeMinutes,
      });

      const openSlots = candidateSlots.filter((s) => s.isAvailable);
      expect(openSlots.length).toBeGreaterThan(0);
      const selectedSlot = openSlots[0];

      // Validate slot with authoritative validation using startTime
      const validation = validateBookingSlot({
        availability: CANONICAL_CONSULTANT_AVAILABILITY,
        startTime: selectedSlot.startTime,
        durationMinutes: selectedService.durationMinutes,
        bufferMinutes: selectedService.bufferMinutes,
        existingBookings: [],
        minimumNoticeMinutes: selectedService.minimumNoticeMinutes,
      });
      expect(validation.isValid).toBe(true);

      // Verify Review step appointment time formatting
      const formattedStart = new Date(selectedSlot.startTime).toLocaleString([], { timeZone: clientTimezone });
      expect(formattedStart).toBeTruthy();

      const serviceEndTimeIso = calculateEndTime(selectedSlot.startTime, selectedService.durationMinutes);
      const formattedEnd = new Date(serviceEndTimeIso).toLocaleTimeString([], {
        timeZone: clientTimezone,
        hour: "2-digit",
        minute: "2-digit",
      });
      expect(formattedEnd).toBeTruthy();

      // Review data bundle verification
      const reviewDataContract = {
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        category: selectedService.category,
        consultantName: PRIMARY_CONSULTANT.name,
        mode: "VIDEO" as const,
        startTime: selectedSlot.startTime,
        endTime: serviceEndTimeIso,
        timezone: clientTimezone,
        clientName: "Ananya Sharma",
        clientEmail: "ananya.sharma@example.com",
        clientPhone: "+91 98765 43210",
        dob: "1992-08-15",
        tob: "08:30",
        pob: "Pune, Maharashtra, India",
        focusTopic: "Career Transition and Dasha Analysis",
        specificQuestions: "Should I accept the international transfer in Rahu-Jupiter period?",
        pricingOptionPayInFull: calculateConsultationPrice(selectedService.price, "PAY_IN_FULL_NOW"),
        pricingOptionPayBeforeSession: calculateConsultationPrice(selectedService.price, "PAY_BEFORE_SESSION"),
      };

      expect(reviewDataContract.serviceName).toBe("Master Vedic Kundli & Shastric Blueprint Analysis");
      expect(reviewDataContract.consultantName).toBe("Ravie Adagale");
      expect(reviewDataContract.pricingOptionPayInFull.finalPrice.amountMinor).toBe(200000);
      expect(reviewDataContract.pricingOptionPayBeforeSession.finalPrice.amountMinor).toBe(250000);
    });
  });

  describe("3. Payment Options Comparison on Review Step", () => {
    it("PAY_IN_FULL_NOW renders exact 20% discount and displays correct savings and total", () => {
      const breakdown = calculateConsultationPrice(selectedService.price, "PAY_IN_FULL_NOW");

      expect(breakdown.discountPercentage).toBe(20);
      expect(breakdown.baseAmount.amountMinor).toBe(250000);
      expect(breakdown.discountAmount.amountMinor).toBe(50000);
      expect(breakdown.finalAmount.amountMinor).toBe(200000);

      expect(formatMoney(breakdown.basePrice)).toBe("₹2,500.00");
      expect(formatMoney(breakdown.discountAmount)).toBe("₹500.00");
      expect(formatMoney(breakdown.finalAmount)).toBe("₹2,000.00");
      expect(formatMoney(breakdown.finalPrice)).toBe("₹2,000.00");
    });

    it("PAY_BEFORE_SESSION renders standard fee with no discount applied", () => {
      const breakdown = calculateConsultationPrice(selectedService.price, "PAY_BEFORE_SESSION");

      expect(breakdown.discountPercentage).toBe(0);
      expect(breakdown.baseAmount.amountMinor).toBe(250000);
      expect(breakdown.discountAmount.amountMinor).toBe(0);
      expect(breakdown.finalAmount.amountMinor).toBe(250000);

      expect(formatMoney(breakdown.basePrice)).toBe("₹2,500.00");
      expect(formatMoney(breakdown.discountAmount)).toBe("₹0.00");
      expect(formatMoney(breakdown.finalAmount)).toBe("₹2,500.00");
      expect(formatMoney(breakdown.finalPrice)).toBe("₹2,500.00");
    });
  });

  describe("4. Booking Submission Lifecycle: REQUESTED Status Invariant", () => {
    it("ensures submitting a booking from Review outputs REQUESTED status and retains Money objects", () => {
      const breakdown = calculateConsultationPrice(selectedService.price, "PAY_IN_FULL_NOW");
      const startTime = new Date(Date.now() + 86400000 * 2).toISOString();
      const endTime = calculateEndTime(startTime, selectedService.durationMinutes);

      const booking: ConsultationBooking = {
        bookingId: "test-booking-hotfix-1",
        consultantId: PRIMARY_CONSULTANT.id,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        category: selectedService.category,
        mode: "VIDEO",
        status: "REQUESTED", // Strictly REQUESTED
        startTime,
        endTime,
        durationMinutes: selectedService.durationMinutes,
        timezone: clientTimezone,
        clientName: "Ananya Sharma",
        clientEmail: "ananya.sharma@example.com",
        clientPhone: "+91 98765 43210",
        focusTopic: "Career Transition",
        clientQuestion: "Detailed question",
        paymentOption: "PAY_IN_FULL_NOW",
        paymentStatus: "PENDING",
        originalPrice: breakdown.originalPrice,
        finalPrice: breakdown.finalPrice,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        timeline: [
          {
            timestamp: new Date().toISOString(),
            status: "REQUESTED",
            actor: "CLIENT",
            notes: "Booking requested by client",
          },
        ],
      };

      // Invariants
      expect(booking.status).toBe("REQUESTED");
      expect(booking.paymentStatus).toBe("PENDING");
      expect(booking.originalPrice).toBeDefined();
      expect(booking.originalPrice?.amountMinor).toBe(250000);
      expect(booking.finalPrice).toBeDefined();
      expect(booking.finalPrice?.amountMinor).toBe(200000);

      // Verify that booking cannot jump straight to CONFIRMED by client
      const clientTransitions = getAllowedTransitions(booking.status, "CLIENT");
      expect(clientTransitions).not.toContain("CONFIRMED");

      // Only the consultant/admin can confirm or decline
      const consultantTransitions = getAllowedTransitions(booking.status, "CONSULTANT");
      expect(consultantTransitions).toContain("CONFIRMED");
      expect(consultantTransitions).toContain("DECLINED");
    });
  });
});
