export interface PrivateNoteInput {
  bookingId: string;
  consultantId: string;
  privateNotes: string;
  internalFlags?: readonly string[];
}

export interface ClientSummaryInput {
  bookingId: string;
  consultantId: string;
  summaryText: string;
  remedies?: readonly string[];
  auspiciousWindows?: readonly string[];
}

export interface NoteValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validatePrivateNote(input: Partial<PrivateNoteInput>): NoteValidationResult {
  const errors: string[] = [];
  if (!input.bookingId?.trim()) {
    errors.push("Booking ID is required for private consultant notes.");
  }
  if (!input.consultantId?.trim()) {
    errors.push("Consultant ID is required for private consultant notes.");
  }
  if (!input.privateNotes || input.privateNotes.trim().length < 10) {
    errors.push("Private consultant notes must contain at least 10 characters.");
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateClientSummary(input: Partial<ClientSummaryInput>): NoteValidationResult {
  const errors: string[] = [];
  if (!input.bookingId?.trim()) {
    errors.push("Booking ID is required for consultation outcome summary.");
  }
  if (!input.consultantId?.trim()) {
    errors.push("Consultant ID is required for consultation outcome summary.");
  }
  if (!input.summaryText || input.summaryText.trim().length < 10) {
    errors.push("Client outcome summary must contain at least 10 characters.");
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
}

const FORBIDDEN_CLIENT_KEYS = new Set([
  "privateNotes",
  "privateConsultantNotes",
  "internalPlanetaryObservations",
  "internalNotes",
  "confidentialNotes",
]);

/**
 * Deeply sanitizes any consultation payload before transmission to client or client UI,
 * strictly stripping private notes and confidential astrologer observation fields.
 */
export function sanitizeClientConsultationData<T>(data: T): T {
  if (data === null || typeof data !== "object") {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeClientConsultationData(item)) as unknown as T;
  }

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (FORBIDDEN_CLIENT_KEYS.has(key)) {
      continue;
    }
    sanitized[key] = sanitizeClientConsultationData(value);
  }

  return sanitized as T;
}

/**
 * Validates that an outgoing client payload contains zero private consultant notes or confidential fields.
 */
export function assertNoPrivateNotesInPayload(payload: unknown): boolean {
  if (payload === null || typeof payload !== "object") {
    return true;
  }

  if (Array.isArray(payload)) {
    return payload.every(assertNoPrivateNotesInPayload);
  }

  for (const [key, value] of Object.entries(payload as Record<string, unknown>)) {
    if (FORBIDDEN_CLIENT_KEYS.has(key)) {
      return false;
    }
    if (!assertNoPrivateNotesInPayload(value)) {
      return false;
    }
  }

  return true;
}
