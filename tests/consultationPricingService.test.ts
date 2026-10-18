import { describe, it, expect } from "vitest";
import {
  ConsultationPricingService,
  consultationPricingService,
  ADVANCE_DISCOUNT_PERCENTAGE,
} from "../src/domain/consultation/consultationPricingService";
import { createMoney, formatMoney } from "../src/domain/consultation/money";
import { consultationOperations } from "../src/domain/consultation/consultationOperationsService";

describe("consultationPricingService: Deterministic Pricing with Integer Abstraction", () => {
  it("exports both the service class and singleton instance", () => {
    expect(consultationPricingService).toBeInstanceOf(ConsultationPricingService);
    expect(consultationPricingService.advanceDiscountPercentage).toBe(20);
    expect(ADVANCE_DISCOUNT_PERCENTAGE).toBe(20);
  });

  describe("20% Advance Discount Calculations (PAY_IN_FULL_NOW)", () => {
    it("calculates exact 20% discount on standard even amount (₹2,500.00 -> ₹2,000.00)", () => {
      const baseAmount = createMoney(250000, "INR");
      const result = consultationPricingService.calculate(baseAmount, "PAY_IN_FULL_NOW");

      expect(result.baseAmount.amountMinor).toBe(250000);
      expect(result.basePrice.amountMinor).toBe(250000); // Alias
      expect(result.discountPercentage).toBe(20);
      expect(result.discountAmount.amountMinor).toBe(50000);
      expect(result.finalAmount.amountMinor).toBe(200000);
      expect(result.isDiscountApplied).toBe(true);
      expect(result.paymentOption).toBe("PAY_IN_FULL_NOW");
      expect(result.baseAmount.currency).toBe("INR");
      expect(result.discountAmount.currency).toBe("INR");
      expect(result.finalAmount.currency).toBe("INR");

      expect(formatMoney(result.baseAmount)).toBe("₹2,500.00");
      expect(formatMoney(result.discountAmount)).toBe("₹500.00");
      expect(formatMoney(result.finalAmount)).toBe("₹2,000.00");
    });

    it("calculates exact 20% discount on odd amounts without floating-point errors (₹1,999.99)", () => {
      const baseAmount = createMoney(199999, "INR");
      const result = consultationPricingService.calculate(baseAmount, "PAY_IN_FULL_NOW");

      // 199999 * 20 = 3999980. 3999980 / 100 = 39999 remainder 80 >= 50 -> 40000
      expect(result.discountAmount.amountMinor).toBe(40000);
      expect(result.finalAmount.amountMinor).toBe(159999);
      expect(result.baseAmount.amountMinor).toBe(199999);
      expect(result.baseAmount.amountMinor - result.discountAmount.amountMinor).toBe(result.finalAmount.amountMinor);

      expect(formatMoney(result.baseAmount)).toBe("₹1,999.99");
      expect(formatMoney(result.discountAmount)).toBe("₹400.00");
      expect(formatMoney(result.finalAmount)).toBe("₹1,599.99");
    });

    it("strictly preserves integer conservation (baseAmount = discountAmount + finalAmount) across diverse amounts", () => {
      const testMinorAmounts = [
        0, 1, 2, 3, 4, 5, 7, 9, 10, 15, 33, 49, 50, 51, 99, 100,
        150, 333, 500, 777, 999, 1000, 1234, 4999, 5000, 10000,
        250000, 500000, 999999, 1000000, 50000000,
      ];

      for (const amountMinor of testMinorAmounts) {
        const money = createMoney(amountMinor, "INR");
        const result = consultationPricingService.calculate(money, "PAY_IN_FULL_NOW");

        // Mathematical invariants
        expect(Number.isInteger(result.baseAmount.amountMinor)).toBe(true);
        expect(Number.isInteger(result.discountAmount.amountMinor)).toBe(true);
        expect(Number.isInteger(result.finalAmount.amountMinor)).toBe(true);

        expect(result.finalAmount.amountMinor + result.discountAmount.amountMinor).toBe(
          result.baseAmount.amountMinor
        );
        expect(result.finalAmount.amountMinor).toBeGreaterThanOrEqual(0);
        expect(result.discountAmount.amountMinor).toBeGreaterThanOrEqual(0);
      }
    });

    it("handles micro amounts deterministically using pure integer division and remainder", () => {
      // 3 paise: 3 * 20 = 60 -> remainder 60 >= 50 -> 1 paisa discount, 2 paise final
      const threePaise = consultationPricingService.calculateFromMinor(3, "INR", "PAY_IN_FULL_NOW");
      expect(threePaise.discountAmount.amountMinor).toBe(1);
      expect(threePaise.finalAmount.amountMinor).toBe(2);

      // 2 paise: 2 * 20 = 40 -> remainder 40 < 50 -> 0 discount, 2 paise final
      const twoPaise = consultationPricingService.calculateFromMinor(2, "INR", "PAY_IN_FULL_NOW");
      expect(twoPaise.discountAmount.amountMinor).toBe(0);
      expect(twoPaise.finalAmount.amountMinor).toBe(2);

      // 1 paisa: 1 * 20 = 20 -> remainder 20 < 50 -> 0 discount, 1 paisa final
      const onePaisa = consultationPricingService.calculateFromMinor(1, "INR", "PAY_IN_FULL_NOW");
      expect(onePaisa.discountAmount.amountMinor).toBe(0);
      expect(onePaisa.finalAmount.amountMinor).toBe(1);

      // 0 paise
      const zeroPaise = consultationPricingService.calculateFromMinor(0, "INR", "PAY_IN_FULL_NOW");
      expect(zeroPaise.discountAmount.amountMinor).toBe(0);
      expect(zeroPaise.finalAmount.amountMinor).toBe(0);
    });
  });

  describe("Standard Pricing (PAY_BEFORE_SESSION)", () => {
    it("applies zero discount and sets finalAmount equal to baseAmount", () => {
      const baseAmount = createMoney(500000, "INR"); // ₹5,000.00
      const result = consultationPricingService.calculate(baseAmount, "PAY_BEFORE_SESSION");

      expect(result.baseAmount.amountMinor).toBe(500000);
      expect(result.discountPercentage).toBe(0);
      expect(result.discountAmount.amountMinor).toBe(0);
      expect(result.finalAmount.amountMinor).toBe(500000);
      expect(result.isDiscountApplied).toBe(false);
      expect(result.paymentOption).toBe("PAY_BEFORE_SESSION");

      expect(formatMoney(result.baseAmount)).toBe("₹5,000.00");
      expect(formatMoney(result.discountAmount)).toBe("₹0.00");
      expect(formatMoney(result.finalAmount)).toBe("₹5,000.00");
    });
  });

  describe("Convenience Methods", () => {
    it("calculateAdvanceDiscount applies 20% discount directly", () => {
      const base = createMoney(300000, "INR"); // ₹3,000.00
      const result = consultationPricingService.calculateAdvanceDiscount(base);

      expect(result.discountPercentage).toBe(20);
      expect(result.discountAmount.amountMinor).toBe(60000);
      expect(result.finalAmount.amountMinor).toBe(240000);
    });

    it("calculateStandardPrice calculates standard price directly", () => {
      const base = createMoney(300000, "INR");
      const result = consultationPricingService.calculateStandardPrice(base);

      expect(result.discountPercentage).toBe(0);
      expect(result.discountAmount.amountMinor).toBe(0);
      expect(result.finalAmount.amountMinor).toBe(300000);
    });

    it("calculateFromMinor allows direct minor integer calculations", () => {
      const result = consultationPricingService.calculateFromMinor(450000, "USD", "PAY_IN_FULL_NOW");
      expect(result.baseAmount.amountMinor).toBe(450000);
      expect(result.discountAmount.amountMinor).toBe(90000); // 20% of 450000
      expect(result.finalAmount.amountMinor).toBe(360000);
      expect(result.finalAmount.currency).toBe("USD");
      expect(formatMoney(result.finalAmount)).toBe("$3,600.00");
    });

    it("formatSummary provides formatted strings and savings description", () => {
      const discounted = consultationPricingService.calculateAdvanceDiscount(createMoney(200000, "INR"));
      const summary = consultationPricingService.formatSummary(discounted);

      expect(summary.baseFormatted).toBe("₹2,000.00");
      expect(summary.discountFormatted).toBe("₹400.00");
      expect(summary.finalFormatted).toBe("₹1,600.00");
      expect(summary.savingsText).toBe("You save ₹400.00 (20% off)");

      const standard = consultationPricingService.calculateStandardPrice(createMoney(200000, "INR"));
      const standardSummary = consultationPricingService.formatSummary(standard);
      expect(standardSummary.savingsText).toBeUndefined();
    });
  });

  describe("Validation & Error Handling", () => {
    it("throws clear error on negative amountMinor", () => {
      const negativeMoney = { amountMinor: -500, currency: "INR" };
      expect(() => consultationPricingService.calculate(negativeMoney as any)).toThrow(
        "Base price amountMinor cannot be negative"
      );
    });

    it("throws error on non-finite or missing amountMinor", () => {
      expect(() => consultationPricingService.calculate({ amountMinor: NaN, currency: "INR" } as any)).toThrow(
        "Invalid base price: amountMinor must be a finite number"
      );
      expect(() => consultationPricingService.calculate(null as any)).toThrow(
        "Invalid base price: amountMinor must be a finite number"
      );
    });
  });

  describe("ConsultationOperationsService Integration", () => {
    it("consultationOperations exposes pricingService instance", () => {
      expect(consultationOperations.pricingService).toBe(consultationPricingService);

      const quote = consultationOperations.pricingService.calculateAdvanceDiscount(
        createMoney(100000, "INR")
      );
      expect(quote.finalAmount.amountMinor).toBe(80000);
    });

    it("calculatePrice method on consultationOperations delegates cleanly", () => {
      const price = consultationOperations.calculatePrice(createMoney(100000, "INR"), "PAY_IN_FULL_NOW");
      expect(price.baseAmount.amountMinor).toBe(100000);
      expect(price.discountAmount.amountMinor).toBe(20000);
      expect(price.finalAmount.amountMinor).toBe(80000);
    });
  });
});
