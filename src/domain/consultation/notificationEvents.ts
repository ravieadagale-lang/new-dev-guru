import { ConsultationBooking } from "./types";

export interface ConsultationDomainEvent {
  id: string;
  eventType: string;
  bookingId: string;
  recipientEmail?: string;
  payload: {
    booking: ConsultationBooking;
    metadata?: Record<string, any>;
  };
  timestamp: string;
}

export function createConsultationDomainEvent(
  eventType: string,
  booking: ConsultationBooking,
  recipientEmail?: string,
  metadata?: Record<string, any>
): ConsultationDomainEvent {
  return {
    id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    eventType,
    bookingId: booking.id,
    recipientEmail,
    payload: {
      booking,
      metadata,
    },
    timestamp: new Date().toISOString(),
  };
}
