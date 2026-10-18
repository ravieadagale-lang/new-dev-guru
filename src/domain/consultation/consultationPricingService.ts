import { Money } from "./types";
import { createMoney, formatMoney } from "./money";
import { ConsultationPaymentOption } from "./pricingEngine";

export const ADVANCE_DISCOUNT_PERCENTAGE = 20;

export interface ConsultationPricingResult {
  /**
   * The initial base consultation amount before any deductions.
   */
  readonly baseAmount: Money;

  /**
   * The calculated discount amount (e.g., 20% for advance booking).
   */
  readonly discountAmount: Money;

  /**
   * The final payable amount after applying discount (baseAmount - discountAmount).
   */
  readonly finalAmount: Money;

  /**
   * Alias to baseAmount for full backwards compatibility with ConsultationPriceBreakdown and ConsultationBooking.
   */
  readonly basePrice: Money;

  /**
   * Alias to baseAmount for domain compatibility with ConsultationBooking.originalPrice.
   */
  readonly originalPrice: Money;

  /**
   * Alias to finalAmount for domain compatibility with ConsultationBooking.finalPrice.
   */
  readonly finalPrice: Money;

  /**
   * The discount percentage applied (20 for advance booking, 0 for standard).
   */
  readonly discountPercentage: number;

  /**
   * The chosen commercial payment option.
   */
  readonly paymentOption: ConsultationPaymentOption;

  /**
   * Indicates if any discount was applied.
   */
  readonly isDiscountApplied: boolean;

  /**
   * User-facing label or summary of the discount policy.
   */
  readonly discountDescription: string;

  /**
   * Operational timing note regarding when payment must be satisfied.
   */
  readonly paymentTimingNotice: string;
}

/**
 * Service providing deterministic commercial pricing calculations for consultations.
 * 
 * Invariants:
 * - Operates strictly on integer minor units (paise, cents).
 * - ZERO floating-point arithmetic in discount and final amount calculation.
 * - Value conservation: `finalAmount.amountMinor + discountAmount.amountMinor === baseAmount.amountMinor`
 * - Consistent ISO 4217 currency propagation.
 */
export class ConsultationPricingService {
  readonly advanceDiscountPercentage: number = ADVANCE_DISCOUNT_PERCENTAGE;

  /**
   * Computes an integer percentage discount using pure integer arithmetic with half-up rounding.
   * Avoids all floating-point fractions by scaling and integer division.
   * 
   * Formula:
   *   product = amountMinor * percentage
   *   quotient = Math.trunc(product / 100)
   *   remainder = Math.abs(product % 100)
   *   discountMinor = remainder >= 50 ? quotient + 1 : quotient
   */
  private calculateIntegerDiscount(amountMinor: number, percentage: number): number {
    if (percentage <= 0 || amountMinor <= 0) {
      return 0;
    }

    const product = amountMinor * percentage;
    const quotient = Math.trunc(product / 100);
    const remainder = Math.abs(product % 100);

    return remainder >= 50 ? quotient + (product >= 0 ? 1 : -1) : quotient;
  }

  /**
   * Calculates deterministic pricing for a consultation booking.
   * 
   * @param baseAmount The base fee as a Money value object in minor units.
   * @param paymentOption "PAY_IN_FULL_NOW" (20% advance discount) or "PAY_BEFORE_SESSION" (standard).
   * @returns ConsultationPricingResult with baseAmount, discountAmount, and finalAmount.
   */
  calculate(
    baseAmount: Money,
    paymentOption: ConsultationPaymentOption = "PAY_IN_FULL_NOW"
  ): ConsultationPricingResult {
    if (!baseAmount || typeof baseAmount.amountMinor !== "number" || !Number.isFinite(baseAmount.amountMinor)) {
      throw new Error("Invalid base price: amountMinor must be a finite number");
    }

    if (baseAmount.amountMinor < 0) {
      throw new Error("Base price amountMinor cannot be negative");
    }

    const currency = (baseAmount.currency || "INR").trim().toUpperCase();
    const baseMinor = Math.round(baseAmount.amountMinor);

    if (paymentOption === "PAY_IN_FULL_NOW") {
      const discountMinor = this.calculateIntegerDiscount(baseMinor, this.advanceDiscountPercentage);
      const finalMinor = baseMinor - discountMinor;

      const baseMoney = createMoney(baseMinor, currency);
      const discountMoney = createMoney(discountMinor, currency);
      const finalMoney = createMoney(finalMinor, currency);

      return Object.freeze({
        baseAmount: baseMoney,
        discountAmount: discountMoney,
        finalAmount: finalMoney,
        basePrice: baseMoney,
        originalPrice: baseMoney,
        finalPrice: finalMoney,
        discountPercentage: this.advanceDiscountPercentage,
        paymentOption,
        isDiscountApplied: discountMinor > 0,
        discountDescription: `${this.advanceDiscountPercentage}% off when you pay in full at booking`,
        paymentTimingNotice: `Full payment settled at booking with ${this.advanceDiscountPercentage}% advance discount applied.`,
      });
    }

    const baseMoney = createMoney(baseMinor, currency);
    const zeroDiscountMoney = createMoney(0, currency);

    return Object.freeze({
      baseAmount: baseMoney,
      discountAmount: zeroDiscountMoney,
      finalAmount: baseMoney,
      basePrice: baseMoney,
      originalPrice: baseMoney,
      finalPrice: baseMoney,
      discountPercentage: 0,
      paymentOption,
      isDiscountApplied: false,
      discountDescription: "Standard Price (Pay Before Consultation)",
      paymentTimingNotice: "Full consultation amount must be paid before the consultation starts.",
    });
  }

  /**
   * Direct helper calculating pricing with the 20% advance booking discount applied.
   */
  calculateAdvanceDiscount(baseAmount: Money): ConsultationPricingResult {
    return this.calculate(baseAmount, "PAY_IN_FULL_NOW");
  }

  /**
   * Direct helper calculating standard price with zero discount.
   */
  calculateStandardPrice(baseAmount: Money): ConsultationPricingResult {
    return this.calculate(baseAmount, "PAY_BEFORE_SESSION");
  }

  /**
   * Helper accepting raw minor units integer and returning complete pricing calculation.
   */
  calculateFromMinor(
    amountMinor: number,
    currency: string = "INR",
    paymentOption: ConsultationPaymentOption = "PAY_IN_FULL_NOW"
  ): ConsultationPricingResult {
    return this.calculate(createMoney(amountMinor, currency), paymentOption);
  }

  /**
   * Formats a calculation result into a human-readable summary.
   */
  formatSummary(result: ConsultationPricingResult): {
    baseFormatted: string;
    discountFormatted: string;
    finalFormatted: string;
    savingsText?: string;
  } {
    const baseFormatted = formatMoney(result.baseAmount);
    const discountFormatted = formatMoney(result.discountAmount);
    const finalFormatted = formatMoney(result.finalAmount);

    return {
      baseFormatted,
      discountFormatted,
      finalFormatted,
      savingsText:
        result.discountAmount.amountMinor > 0
          ? `You save ${discountFormatted} (${result.discountPercentage}% off)`
          : undefined,
    };
  }
}

export const consultationPricingService = new ConsultationPricingService();
