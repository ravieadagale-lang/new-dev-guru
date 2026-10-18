/**
 * Role-Based Authorization Configuration — Dev-Guru Phase 1
 * 
 * Strict allowlist for administrative access and practitioner capabilities.
 * Canonical identities:
 * - ravieadagale@gmail.com -> SUPER_ADMIN (+ Practitioner/Consultant capability)
 * - ravii.adagale20@gmail.com -> ADMIN (distinct Admin workspace; no Super Admin capability)
 * 
 * Normal signups and unrecognized identities always resolve strictly to CUSTOMER.
 * Approved practitioners receive role PRACTITIONER.
 * Browser, LocalStorage, URL parameters, or client payload role inputs are NEVER trusted.
 */

export const SUPER_ADMIN_EMAIL = "ravieadagale@gmail.com";
export const ADMIN_EMAIL = "ravii.adagale20@gmail.com";

// Exactly ONE Super Admin identity: Ravie Adagale
export const SUPER_ADMIN_EMAILS: readonly string[] = Object.freeze([
  SUPER_ADMIN_EMAIL,
]);

// Exactly ONE Admin identity: Ravii Adagale
export const ADMIN_EMAILS: readonly string[] = Object.freeze([
  ADMIN_EMAIL,
]);

// All privileged accounts
export const ALL_PRIVILEGED_EMAILS: readonly string[] = Object.freeze([
  SUPER_ADMIN_EMAIL,
  ADMIN_EMAIL,
]);

export type AuthRole = "SUPER_ADMIN" | "ADMIN" | "PRACTITIONER" | "CUSTOMER";

/**
 * Normalizes email address safely (trim + lowercase).
 */
export function normalizeEmail(email?: string | null): string {
  if (!email || typeof email !== "string") return "";
  return email.trim().toLowerCase();
}

/**
 * Resolves the trusted authorization role strictly from a verified identity email.
 * Never accepts client-supplied roles.
 */
export function resolveRoleFromEmail(email?: string | null): AuthRole {
  const normalized = normalizeEmail(email);
  if (!normalized) return "CUSTOMER";

  if (normalized === SUPER_ADMIN_EMAIL) {
    return "SUPER_ADMIN";
  }
  if (normalized === ADMIN_EMAIL) {
    return "ADMIN";
  }
  return "CUSTOMER";
}

/**
 * Validates whether an email belongs to an authorized Super Admin.
 * Strictly checks ravieadagale@gmail.com.
 */
export function isSuperAdminEmail(email?: string | null): boolean {
  const normalized = normalizeEmail(email);
  if (!normalized) return false;
  return SUPER_ADMIN_EMAILS.includes(normalized);
}

/**
 * Validates whether an email belongs to the authorized Admin.
 * Strictly checks ravii.adagale20@gmail.com.
 */
export function isAdminEmail(email?: string | null): boolean {
  const normalized = normalizeEmail(email);
  if (!normalized) return false;
  return ADMIN_EMAILS.includes(normalized);
}

/**
 * Validates whether an email belongs to either Super Admin or Admin.
 */
export function isPrivilegedEmail(email?: string | null): boolean {
  const normalized = normalizeEmail(email);
  if (!normalized) return false;
  return ALL_PRIVILEGED_EMAILS.includes(normalized);
}

/**
 * Checks whether an identity has Practitioner / Consultant capability.
 * Ravie Adagale (SUPER_ADMIN) has native practitioner capability.
 * Approved practitioners with role PRACTITIONER also have capability.
 * Admin (ravii.adagale20@gmail.com) does NOT receive automatic practitioner capability.
 */
export function hasPractitionerCapability(
  email?: string | null,
  role?: AuthRole
): boolean {
  const normalized = normalizeEmail(email);
  if (normalized === SUPER_ADMIN_EMAIL) return true;
  if (role === "PRACTITIONER") return true;
  return false;
}
