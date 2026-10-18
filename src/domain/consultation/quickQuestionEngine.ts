import { Money } from "./types";
import { addMoney, createMoney } from "./money";

export type QuickQuestionTurnaroundTier = "STANDARD" | "EXPRESS" | "SUPER_EXPRESS";

export interface QuickQuestionCalculation {
  base: Money;
  surcharge: Money;
  total: Money;
  turnaroundHours: number;
}

export interface QuickQuestionSubmissionInput {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  question: string;
  context?: string;
  type: string;
  turnaroundTier: QuickQuestionTurnaroundTier;
  birthDetails?: {
    dob?: string;
    time?: string;
    place?: string;
  };
}

export function calculateQuickQuestionTotal(
  basePrice: Money,
  turnaroundTier: QuickQuestionTurnaroundTier
): QuickQuestionCalculation {
  let turnaroundHours = 48;
  let surchargeAmount = 0;

  switch (turnaroundTier) {
    case "SUPER_EXPRESS":
      turnaroundHours = 6;
      surchargeAmount = 100000; // ₹1,000.00
      break;
    case "EXPRESS":
      turnaroundHours = 24;
      surchargeAmount = 50000; // ₹500.00
      break;
    case "STANDARD":
    default:
      turnaroundHours = 48;
      surchargeAmount = 0;
      break;
  }

  const surcharge = createMoney(surchargeAmount, basePrice.currency);
  const total = addMoney(basePrice, surcharge);

  return {
    base: basePrice,
    surcharge,
    total,
    turnaroundHours,
  };
}

export function validateQuickQuestionSubmission(
  submission: Partial<QuickQuestionSubmissionInput>
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!submission.clientName || submission.clientName.trim().length < 2) {
    errors.push("Client name must be at least 2 characters.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!submission.clientEmail || !emailRegex.test(submission.clientEmail.trim())) {
    errors.push("A valid client email address is required.");
  }

  if (!submission.question || submission.question.trim().length < 15) {
    errors.push("Consultation question must be at least 15 characters.");
  }

  if (!submission.type?.trim()) {
    errors.push("Question category / type is required.");
  }

  const validTiers: QuickQuestionTurnaroundTier[] = ["STANDARD", "EXPRESS", "SUPER_EXPRESS"];
  if (submission.turnaroundTier && !validTiers.includes(submission.turnaroundTier)) {
    errors.push(`Turnaround tier must be one of: ${validTiers.join(", ")}.`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function answerQuickQuestion<T extends object>(
  inquiry: T,
  answerText: string,
  answeredAtIso: string = new Date().toISOString()
): T & { answer: string; answeredAt: string; status: string } {
  return {
    ...inquiry,
    answer: answerText,
    answeredAt: answeredAtIso,
    status: "ANSWERED",
  };
}
