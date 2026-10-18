import { Money, PaymentStatus } from "./types";
import {
  consultationPricingService,
  ConsultationPricingService,
  ConsultationPricingResult,
  ADVANCE_DISCOUNT_PERCENTAGE,
} from "./consultationPricingService";

export {
  consultationPricingService,
  ConsultationPricingService,
  ADVANCE_DISCOUNT_PERCENTAGE,
};

/**
 * Consultation commercial payment options.
 * 
 * Rule:
 * - PAY_IN_FULL_NOW: 20% discount off the base consultation price when paid in full at booking.
 * - PAY_BEFORE_SESSION: Standard base price. Full amount must be paid before consultation starts.
 */
export type ConsultationPaymentOption = "PAY_IN_FULL_NOW" | "PAY_BEFORE_SESSION";

export const ADVANCE_PAYMENT_DISCOUNT_PERCENTAGE = ADVANCE_DISCOUNT_PERCENTAGE;

export interface ConsultationPriceBreakdown extends ConsultationPricingResult {
  readonly basePrice: Money;
  readonly baseAmount: Money;
  readonly originalPrice: Money;
  readonly discountPercentage: number;
  readonly discountAmount: Money;
  readonly finalAmount: Money;
  readonly finalPrice: Money;
  readonly paymentOption: ConsultationPaymentOption;
  readonly discountDescription: string;
  readonly paymentTimingNotice: string;
}

/**
 * Deterministic price calculation for scheduled consultations.
 * Delegates to consultationPricingService ensuring strict integer arithmetic and zero floats.
 */
export function calculateConsultationPrice(
  basePrice: Money,
  paymentOption: ConsultationPaymentOption
): ConsultationPriceBreakdown {
  return consultationPricingService.calculate(basePrice, paymentOption);
}

/**
 * Validates whether a consultation booking has satisfied the mandatory commercial payment
 * rule required before entering the IN_PROGRESS status.
 */
export function isPaymentSatisfiedForSessionStart(
  target: PaymentStatus | { paymentStatus?: PaymentStatus } | undefined
): {
  isSatisfied: boolean;
  reason?: string;
} {
  const status = typeof target === "object" && target !== null ? target.paymentStatus : target;
  if (status === "PAID") {
    return { isSatisfied: true };
  }

  return {
    isSatisfied: false,
    reason: "Payment requirement not satisfied. Full consultation fee must be paid before session starts.",
  };
}
