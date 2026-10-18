import {
  CURRENT_CONSULTANT_EMAIL,
  ADMIN_CONSULTANT_EMAIL,
} from "./operatorConfig";
import { ConsultationBooking, ConsultationStatus } from "./types";

/**
 * Normalizes email strings securely.
 */
export function normalizeEmail(email?: string | null): string {
  if (!email || typeof email !== "string") return "";
  return email.trim().toLowerCase();
}

/**
 * Checks if email belongs to the primary Super Admin consultant.
 */
export function isPrimaryConsultant(email?: string | null): boolean {
  return normalizeEmail(email) === CURRENT_CONSULTANT_EMAIL;
}

/**
 * Checks if email has consultant workspace access (Super Admin or Admin).
 */
export function canAccessConsultantWorkspace(email?: string | null): boolean {
  const normalized = normalizeEmail(email);
  return normalized === CURRENT_CONSULTANT_EMAIL || normalized === ADMIN_CONSULTANT_EMAIL;
}

/**
 * Checks if email can manage consultation services.
 */
export function canManageServices(email?: string | null): boolean {
  return canAccessConsultantWorkspace(email);
}

/**
 * Evaluates whether a user can modify consultant profile settings.
 */
export function canModifyConsultantProfile(email?: string | null): boolean {
  return canAccessConsultantWorkspace(email);
}

/**
 * Evaluates whether a user can modify consultant availability rules.
 */
export function canModifyAvailability(email?: string | null): boolean {
  return canAccessConsultantWorkspace(email);
}

/**
 * Evaluates whether a user can access the consultant client directory.
 */
export function canAccessClientDirectory(email?: string | null): boolean {
  return canAccessConsultantWorkspace(email);
}

/**
 * Evaluates whether a user is authorized to view a specific booking.
 * Allowed: The client who booked it, or the assigned consultant / admin.
 */
export function canViewBooking(
  userEmail: string,
  booking: Pick<ConsultationBooking, "clientEmail" | "consultantEmail">
): boolean {
  const normalized = normalizeEmail(userEmail);
  if (!normalized) return false;

  if (canAccessConsultantWorkspace(normalized)) return true;
  return normalized === normalizeEmail(booking.clientEmail);
}

/**
 * Evaluates whether a user can view Private Consultant Notes.
 * PRIVACY MANDATE: Clients MUST NEVER have access to private notes under any circumstances.
 */
export function canViewPrivateNotes(email?: string | null): boolean {
  return canAccessConsultantWorkspace(email);
}

/**
 * Evaluates whether a user can view the Client-Visible Consultation Summary.
 * Both client and consultant/admin are authorized.
 */
export function canViewClientSummary(
  userEmail: string,
  booking: Pick<ConsultationBooking, "clientEmail" | "consultantEmail">
): boolean {
  return canViewBooking(userEmail, booking);
}

/**
 * Evaluates whether a user can modify a booking's status.
 */
export function canModifyBookingStatus(
  userEmail: string,
  booking: Pick<ConsultationBooking, "clientEmail" | "consultantEmail" | "status">,
  nextStatus: ConsultationStatus
): { isAllowed: boolean; error?: string } {
  const normalized = normalizeEmail(userEmail);
  if (!normalized) {
    return { isAllowed: false, error: "Unauthenticated user cannot modify booking" };
  }

  const isConsultant = canAccessConsultantWorkspace(normalized);
  const isClient = normalized === normalizeEmail(booking.clientEmail);

  if (!isConsultant && !isClient) {
    return { isAllowed: false, error: "User is neither client nor consultant for this booking" };
  }

  // Client permissions
  if (isClient && !isConsultant) {
    if (nextStatus === "CANCELLED_BY_CLIENT" || nextStatus === "RESCHEDULE_REQUESTED") {
      return { isAllowed: true };
    }
    return { isAllowed: false, error: `Clients cannot set booking status to ${nextStatus}` };
  }

  // Consultant permissions
  if (isConsultant) {
    if (nextStatus === "CANCELLED_BY_CLIENT") {
      return { isAllowed: false, error: "Consultant cannot cancel on behalf of client without client action" };
    }
    return { isAllowed: true };
  }

  return { isAllowed: false, error: "Unauthorized status modification" };
}
