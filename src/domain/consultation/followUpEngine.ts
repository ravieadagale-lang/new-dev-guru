import { ConsultationFollowUp } from "./types";

export interface CreateFollowUpInput {
  bookingId: string;
  clientId: string;
  consultantId: string;
  daysAfterConsultation?: number;
  scheduledDate?: string;
  notes?: string;
}

export function createConsultationFollowUp(input: CreateFollowUpInput): ConsultationFollowUp {
  const now = new Date();
  let scheduled = input.scheduledDate;

  if (!scheduled) {
    const days = input.daysAfterConsultation ?? 14;
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    scheduled = futureDate.toISOString();
  }

  return {
    id: `flw-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    bookingId: input.bookingId,
    clientId: input.clientId,
    consultantId: input.consultantId,
    scheduledDate: scheduled,
    status: "SCHEDULED",
    notes: input.notes,
    createdAt: now.toISOString(),
  };
}

export function completeConsultationFollowUp(
  followUp: ConsultationFollowUp,
  completionNotes?: string
): ConsultationFollowUp {
  return {
    ...followUp,
    status: "COMPLETED",
    notes: completionNotes ? `${followUp.notes ? followUp.notes + "\n" : ""}${completionNotes}` : followUp.notes,
  };
}
