import { describe, it, expect } from "vitest";
import {
  calculateConsultationPrice,
  isPaymentSatisfiedForSessionStart,
} from "../src/domain/consultation/pricingEngine";
import { createMoney, formatMoney } from "../src/domain/consultation/money";
import { validateBookingStateTransition } from "../src/domain/consultation/bookingStateMachine";
import { validateStatusTransition } from "../src/domain/consultation/businessRules";
import { createConsultationPaymentIntent } from "../src/domain/consultation/paymentBoundary";
import { consultationOperations } from "../src/domain/consultation/consultationOperationsService";
import {
  PRIMARY_CONSULTANT,
  PRIMARY_CONSULTANT_PROFILE,
} from "../src/domain/consultation/operatorConfig";
import { validateConsultantProfile } from "../src/domain/consultation/validation";

describe("Phase 4: Consultation Pricing & Advance Payment Discount Engine", () => {
  const basePrice = createMoney(250000, "INR"); // ₹2,500.00 in integer minor units

  it("applies exactly 20% discount when paying in full at booking", () => {
    const result = calculateConsultationPrice(basePrice, "PAY_IN_FULL_NOW");

    expect(result.paymentOption).toBe("PAY_IN_FULL_NOW");
    expect(result.discountPercentage).toBe(20);
    // Base amount in integer minor units
    expect(result.baseAmount.amountMinor).toBe(250000);
    // 20% of 250000 = 50000
    expect(result.discountAmount.amountMinor).toBe(50000);
    // Final = 250000 - 50000 = 200000
    expect(result.finalAmount.amountMinor).toBe(200000);
    expect(result.baseAmount.amountMinor - result.discountAmount.amountMinor).toBe(result.finalAmount.amountMinor);
    expect(formatMoney(result.finalAmount)).toBe("₹2,000.00");
  });

  it("applies zero discount when choosing standard payment before session", () => {
    const result = calculateConsultationPrice(basePrice, "PAY_BEFORE_SESSION");

    expect(result.paymentOption).toBe("PAY_BEFORE_SESSION");
    expect(result.discountPercentage).toBe(0);
    expect(result.discountAmount.amountMinor).toBe(0);
    expect(result.finalAmount.amountMinor).toBe(250000);
    expect(formatMoney(result.finalAmount)).toBe("₹2,500.00");
  });

  it("handles rounding deterministically using Math.round with integer minor units", () => {
    // ₹1,999.99 in minor units = 199999
    const oddPrice = createMoney(199999, "INR");
    const result = calculateConsultationPrice(oddPrice, "PAY_IN_FULL_NOW");

    // 199999 * 20 / 100 = 39999.8 -> 40000
    expect(result.discountAmount.amountMinor).toBe(40000);
    expect(result.finalAmount.amountMinor).toBe(159999);
    expect(result.basePrice.amountMinor - result.discountAmount.amountMinor).toBe(result.finalAmount.amountMinor);
  });
});

describe("Phase 4: Commercial Gate - Payment Before Start Rule", () => {
  it("strictly prohibits transitioning to IN_PROGRESS when paymentStatus is PENDING", () => {
    const stateTransition = validateBookingStateTransition(
      "CONFIRMED",
      "IN_PROGRESS",
      "CONSULTANT",
      { paymentStatus: "PENDING" }
    );

    expect(stateTransition.isValid).toBe(false);
    expect(stateTransition.reason).toContain("Payment requirement not satisfied");
  });

  it("allows transitioning to IN_PROGRESS when paymentStatus is PAID", () => {
    const stateTransition = validateBookingStateTransition(
      "CONFIRMED",
      "IN_PROGRESS",
      "CONSULTANT",
      { paymentStatus: "PAID" }
    );

    expect(stateTransition.isValid).toBe(true);
    expect(stateTransition.reason).toBeUndefined();
  });

  it("enforces payment status check in validateStatusTransition business rule", () => {
    const pendingCheck = validateStatusTransition("CONFIRMED", "IN_PROGRESS", "PENDING");
    expect(pendingCheck.isAllowed).toBe(false);
    expect(pendingCheck.error).toContain("Payment requirement not satisfied");

    const paidCheck = validateStatusTransition("CONFIRMED", "IN_PROGRESS", "PAID");
    expect(paidCheck.isAllowed).toBe(true);
  });

  it("checks payment readiness via isPaymentSatisfiedForSessionStart", () => {
    expect(isPaymentSatisfiedForSessionStart({ status: "CONFIRMED", paymentStatus: "PAID" }).isSatisfied).toBe(true);
    expect(isPaymentSatisfiedForSessionStart({ status: "CONFIRMED", paymentStatus: "PENDING" }).isSatisfied).toBe(false);
    expect(isPaymentSatisfiedForSessionStart({ status: "CONFIRMED", paymentStatus: "FAILED" }).isSatisfied).toBe(false);
  });
});

describe("Phase 4: ConsultationOperationsService Commercial Operations", () => {
  const basePrice = createMoney(500000, "INR"); // ₹5,000.00

  it("calculates pricing correctly through the service façade", () => {
    const quote = consultationOperations.calculatePrice(basePrice, "PAY_IN_FULL_NOW");
    expect(quote.discountPercentage).toBe(20);
    expect(quote.discountAmount.amountMinor).toBe(100000);
    expect(quote.finalAmount.amountMinor).toBe(400000);
  });

  it("evaluates payment readiness for session execution", () => {
    const notReady = consultationOperations.checkPaymentReadiness({
      status: "CONFIRMED",
      paymentStatus: "PENDING",
      paymentOption: "PAY_BEFORE_SESSION",
    });
    expect(notReady.isReady).toBe(false);
    expect(notReady.reason).toContain("Payment requirement not satisfied");

    const ready = consultationOperations.checkPaymentReadiness({
      status: "CONFIRMED",
      paymentStatus: "PAID",
      paymentOption: "PAY_IN_FULL_NOW",
    });
    expect(ready.isReady).toBe(true);
    expect(ready.reason).toBeUndefined();
  });

  it("records payment satisfaction cleanly", () => {
    const result = consultationOperations.recordPayment({
      booking: {
        id: "BK-TEST-1",
        clientId: "client@example.com",
        clientEmail: "client@example.com",
        clientName: "Test Client",
        consultantId: "c-ravi",
        consultantEmail: "ravieadagale@gmail.com",
        serviceId: "srv-1",
        category: "VEDIC_HOROSCOPE",
        mode: "VIDEO_GOOGLE_MEET",
        startTime: "2026-10-10T10:00:00.000Z",
        endTime: "2026-10-10T11:00:00.000Z",
        timezone: "Asia/Kolkata",
        clientQuestion: "General query",
        status: "CONFIRMED",
        paymentStatus: "PENDING",
        rescheduleHistory: [],
        createdAt: "2026-10-01T10:00:00.000Z",
        updatedAt: "2026-10-01T10:00:00.000Z",
      },
      paymentStatus: "PAID",
      paymentOption: "PAY_IN_FULL_NOW",
      actorEmail: "ravieadagale@gmail.com",
      note: "Payment confirmed in advance",
    });

    expect(result.success).toBe(true);
    expect(result.updatedBooking.paymentStatus).toBe("PAID");
    expect(result.auditRecord.metadata?.action).toBe("PAYMENT_RECORDED");
  });
});

describe("Phase 4: Payment Boundary Intent Creation", () => {
  it("creates consultation payment intent preserving commercial terms without external gateway call", () => {
    const intent = createConsultationPaymentIntent({
      bookingId: "BK-COMM-1",
      basePrice: createMoney(300000, "INR"),
      paymentOption: "PAY_IN_FULL_NOW",
    });

    expect(intent.paymentOption).toBe("PAY_IN_FULL_NOW");
    expect(intent.breakdown?.discountPercentage).toBe(20);
    expect(intent.amount.amountMinor).toBe(240000); // 300000 - 60000
    expect(intent.status).toBe("PAYMENT_NOT_CONNECTED");
    expect(intent.provider).toBe("UNCONNECTED");
  });
});

describe("Phase 4: Canonical Consultant Identity Verification", () => {
  it("verifies Ravie Adagale as canonical consultant identity", () => {
    expect(PRIMARY_CONSULTANT.name).toBe("Ravie Adagale");
    expect(PRIMARY_CONSULTANT_PROFILE.mainExpertise).toBe("Love & Relationship");
    expect(PRIMARY_CONSULTANT_PROFILE.areasOfExpertise).toEqual([
      "Astrology",
      "Numerology",
      "Tarot Reading",
      "Master Crystal Healer",
      "Yantra Expert",
      "Vastu Expert",
      "Face Reader",
      "Graphology",
    ]);

    const validation = validateConsultantProfile(PRIMARY_CONSULTANT_PROFILE);
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });
});
