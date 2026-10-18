import { ConsultationStatus } from "./types";
import { ActorRole } from "./bookingStateMachine";

export interface ConsultationAuditRecord {
  auditId: string;
  bookingId: string;
  previousStatus: ConsultationStatus;
  newStatus: ConsultationStatus;
  actorRole: ActorRole;
  actorEmail: string;
  timestamp: string;
  reason?: string;
  metadata?: Record<string, unknown>;
}

export function createAuditRecord(params: {
  bookingId: string;
  previousStatus: ConsultationStatus;
  newStatus: ConsultationStatus;
  actorRole: ActorRole;
  actorEmail: string;
  reason?: string;
  metadata?: Record<string, unknown>;
}): ConsultationAuditRecord {
  return {
    auditId: `aud-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    bookingId: params.bookingId,
    previousStatus: params.previousStatus,
    newStatus: params.newStatus,
    actorRole: params.actorRole,
    actorEmail: params.actorEmail,
    timestamp: new Date().toISOString(),
    reason: params.reason,
    metadata: params.metadata,
  };
}
