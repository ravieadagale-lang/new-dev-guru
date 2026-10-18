// src/domain/consultation/paymentBoundary.ts
import { Money } from "./types";
import {
  ConsultationPaymentOption,
  calculateConsultationPrice,
  ConsultationPriceBreakdown
} from "./pricingEngine";

export interface CreatePaymentIntentParams {
  bookingId: string;
  basePrice: Money;
  paymentOption: ConsultationPaymentOption;
  clientEmail?: string;
  consultantEmail?: string;
}

export interface ConsultationPaymentIntent {
  intentId: string;
  bookingId: string;
  amount: Money;
  paymentOption: ConsultationPaymentOption;
  breakdown: ConsultationPriceBreakdown;
  status: "PAYMENT_NOT_CONNECTED" | "PENDING" | "PAID";
  provider: "UNCONNECTED" | "RAZORPAY_SIMULATED" | "STRIPE_SIMULATED";
  createdAt: string;
}

/**
 * Creates a consultation payment intent preserving exact commercial terms
 * without external gateway dependencies.
 */
export function createConsultationPaymentIntent(
  params: CreatePaymentIntentParams
): ConsultationPaymentIntent {
  const breakdown = calculateConsultationPrice(params.basePrice, params.paymentOption);
  return {
    intentId: `pi_${params.bookingId}_${Date.now()}`,
    bookingId: params.bookingId,
    amount: breakdown.finalAmount,
    paymentOption: params.paymentOption,
    breakdown,
    status: "PAYMENT_NOT_CONNECTED",
    provider: "UNCONNECTED",
    createdAt: new Date().toISOString()
  };
}
