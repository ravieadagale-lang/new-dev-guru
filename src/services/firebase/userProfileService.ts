import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getDocFromServer,
} from "firebase/firestore";
import { firestoreDb } from "./firebaseClient";
import { handleFirestoreError, OperationType } from "./firestoreErrors";
import {
  normalizeEmail,
  resolveRoleFromEmail,
  type AuthRole,
} from "../auth/superAdminConfig";

export type BirthDataPrecision = "NOT_PROVIDED" | "PARTIAL" | "COMPLETE";
export type TimeAccuracy = "EXACT" | "APPROXIMATE" | "UNKNOWN";

export interface CustomerBirthDetails {
  date?: string;           // YYYY-MM-DD
  time?: string;           // HH:mm (24-hour format)
  timeAccuracy?: TimeAccuracy;
  placeName?: string;
  latitude?: number;       // -90 to +90
  longitude?: number;      // -180 to +180
  timezone?: string;       // Valid IANA identifier e.g. "Asia/Kolkata", "America/New_York"
  precisionState: BirthDataPrecision;
}

export interface CustomerPreferences {
  language?: string;
  theme?: string;
  notificationsEnabled?: boolean;
}

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  role: AuthRole;
  phoneNumber?: string;
  photoURL?: string;
  birthDetails?: CustomerBirthDetails;
  preferences?: CustomerPreferences;
  createdAt: string;
  lastLoginAt: string;
  updatedAt?: string;
}

export type UserProfileUpdatePayload = Partial<
  Omit<UserProfile, "userId" | "createdAt">
>;

/**
 * Validates calendar date string strictly in YYYY-MM-DD format.
 * Validates year (1900-2100), month (01-12), day (01-31 matching month rules),
 * and prevents future dates.
 */
export function validateBirthDate(dateStr?: string): { valid: boolean; error?: string } {
  if (!dateStr || typeof dateStr !== "string") {
    return { valid: false, error: "Birth date is required." };
  }
  const trimmed = dateStr.trim();
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(trimmed)) {
    return { valid: false, error: "Birth date must be in YYYY-MM-DD format." };
  }

  const [yearStr, monthStr, dayStr] = trimmed.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  if (year < 1900 || year > 2100) {
    return { valid: false, error: "Birth year must be between 1900 and 2100." };
  }
  if (month < 1 || month > 12) {
    return { valid: false, error: "Birth month must be between 01 and 12." };
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return { valid: false, error: `Day ${day} is invalid for month ${month} in year ${year}.` };
  }

  const inputDate = new Date(`${trimmed}T00:00:00Z`);
  const now = new Date();
  if (inputDate > now) {
    return { valid: false, error: "Birth date cannot be in the future." };
  }

  return { valid: true };
}

/**
 * Validates 24-hour time string strictly in HH:mm format (00:00 to 23:59).
 */
export function validateBirthTime(timeStr?: string): { valid: boolean; error?: string } {
  if (!timeStr || typeof timeStr !== "string") {
    return { valid: false, error: "Birth time is required." };
  }
  const trimmed = timeStr.trim();
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(trimmed)) {
    return { valid: false, error: "Birth time must be in 24-hour HH:mm format (00:00 to 23:59)." };
  }
  return { valid: true };
}

/**
 * Validates latitude (-90 to +90) and longitude (-180 to +180) numeric bounds.
 */
export function validateCoordinates(lat?: number, lon?: number): { valid: boolean; error?: string } {
  if (lat !== undefined) {
    if (typeof lat !== "number" || isNaN(lat) || lat < -90 || lat > 90) {
      return { valid: false, error: "Latitude must be a valid number between -90 and +90." };
    }
  }
  if (lon !== undefined) {
    if (typeof lon !== "number" || isNaN(lon) || lon < -180 || lon > 180) {
      return { valid: false, error: "Longitude must be a valid number between -180 and +180." };
    }
  }
  return { valid: true };
}

/**
 * Validates whether a string is a valid IANA timezone identifier.
 * Enforces canonical Area/Location identifiers (e.g. Asia/Kolkata, America/New_York) or UTC/Etc/GMT,
 * rejecting ambiguous 3-letter abbreviations (e.g., IST, EST, CST) or malformed strings.
 */
export function validateTimezone(timezoneStr?: string): { valid: boolean; error?: string } {
  if (!timezoneStr || typeof timezoneStr !== "string") {
    return { valid: false, error: "Timezone must be a non-empty string." };
  }
  const trimmed = timezoneStr.trim();
  if (!trimmed) {
    return { valid: false, error: "Timezone cannot be empty." };
  }
  if (trimmed !== "UTC" && trimmed !== "GMT" && !trimmed.includes("/")) {
    return { valid: false, error: `Timezone must be a standard canonical IANA timezone identifier (e.g. "Asia/Kolkata", "America/New_York") rather than abbreviation "${trimmed}".` };
  }
  try {
    Intl.DateTimeFormat(undefined, { timeZone: trimmed });
    return { valid: true };
  } catch {
    return { valid: false, error: `Invalid IANA timezone identifier: "${timezoneStr}".` };
  }
}

/**
 * Determines whether birth data is NOT_PROVIDED, PARTIAL, or COMPLETE.
 */
export function determineBirthDataPrecision(details: Partial<CustomerBirthDetails>): BirthDataPrecision {
  const hasDate = Boolean(details.date && validateBirthDate(details.date).valid);
  const hasTime = Boolean(details.time && validateBirthTime(details.time).valid);
  const hasPlace = Boolean(details.placeName && details.placeName.trim().length > 0);
  const hasLat = details.latitude !== undefined && typeof details.latitude === "number" && !isNaN(details.latitude);
  const hasLon = details.longitude !== undefined && typeof details.longitude === "number" && !isNaN(details.longitude);
  const hasTz = Boolean(details.timezone && validateTimezone(details.timezone).valid);

  if (!hasDate && !hasTime && !hasPlace && !hasLat && !hasLon && !hasTz) {
    return "NOT_PROVIDED";
  }

  if (hasDate && hasTime && hasPlace && hasLat && hasLon && hasTz) {
    return "COMPLETE";
  }

  return "PARTIAL";
}

/**
 * Deterministically validates and formats birth details.
 */
export function validateCustomerBirthDetails(
  details: Partial<CustomerBirthDetails>
): { valid: boolean; error?: string; validatedDetails?: CustomerBirthDetails } {
  if (!details) {
    return {
      valid: true,
      validatedDetails: { precisionState: "NOT_PROVIDED" },
    };
  }

  if (details.date) {
    const dateRes = validateBirthDate(details.date);
    if (!dateRes.valid) return { valid: false, error: dateRes.error };
  }

  if (details.time) {
    const timeRes = validateBirthTime(details.time);
    if (!timeRes.valid) return { valid: false, error: timeRes.error };
  }

  const coordRes = validateCoordinates(details.latitude, details.longitude);
  if (!coordRes.valid) return { valid: false, error: coordRes.error };

  if (details.timezone) {
    const tzRes = validateTimezone(details.timezone);
    if (!tzRes.valid) return { valid: false, error: tzRes.error };
  }

  const precisionState = determineBirthDataPrecision(details);
  const timeAccuracy: TimeAccuracy =
    details.timeAccuracy || (details.time ? "EXACT" : "UNKNOWN");

  const validated: CustomerBirthDetails = {
    precisionState,
    timeAccuracy,
  };

  if (details.date) validated.date = details.date.trim();
  if (details.time) validated.time = details.time.trim();
  if (details.placeName) validated.placeName = details.placeName.trim();
  if (details.latitude !== undefined) validated.latitude = Number(details.latitude);
  if (details.longitude !== undefined) validated.longitude = Number(details.longitude);
  if (details.timezone) validated.timezone = details.timezone.trim();

  return { valid: true, validatedDetails: validated };
}

/**
 * Tests connection to the remote Firestore server instance.
 */
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(firestoreDb, "test", "connection"));
    return true;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("the client is offline")
    ) {
      console.warn("[Firestore] Client is offline or Firestore is unreachable.");
      return false;
    }
    // Connection succeeded (even if permission denied on /test/connection or document doesn't exist)
    return true;
  }
}

/**
 * Fetches the user profile document for a given Firebase UID.
 * Returns null if the profile document does not yet exist.
 */
export async function getUserProfile(
  userId: string
): Promise<UserProfile | null> {
  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid userId supplied to getUserProfile");
  }

  const path = `users/${userId}`;
  try {
    const userDocRef = doc(firestoreDb, "users", userId);
    const snap = await getDoc(userDocRef);
    if (!snap.exists()) {
      return null;
    }
    const data = snap.data();
    return {
      userId: data.userId || userId,
      email: data.email || "",
      displayName: data.displayName || "",
      role: (data.role as AuthRole) || resolveRoleFromEmail(data.email),
      phoneNumber: data.phoneNumber || undefined,
      photoURL: data.photoURL || undefined,
      birthDetails: data.birthDetails || undefined,
      preferences: data.preferences || undefined,
      createdAt: data.createdAt || new Date().toISOString(),
      lastLoginAt: data.lastLoginAt || new Date().toISOString(),
      updatedAt: data.updatedAt || undefined,
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

/**
 * Creates a brand new user profile document in Firestore at users/{userId}.
 */
export async function createUserProfile(
  profileInput: {
    userId: string;
    email: string;
    displayName?: string;
    role?: AuthRole;
    phoneNumber?: string;
    photoURL?: string;
    birthDetails?: Partial<CustomerBirthDetails>;
    preferences?: CustomerPreferences;
    createdAt?: string;
    lastLoginAt?: string;
  }
): Promise<UserProfile> {
  const { userId, email } = profileInput;
  if (!userId || !email) {
    throw new Error("userId and email are strictly required to create a user profile.");
  }

  const path = `users/${userId}`;
  const now = new Date().toISOString();
  const normalizedEmail = normalizeEmail(email);

  // Anti-escalation: role is derived strictly from server allowlist; client input cannot override
  const allowlistRole = resolveRoleFromEmail(normalizedEmail);
  const resolvedRole: AuthRole =
    profileInput.role && profileInput.role === allowlistRole
      ? profileInput.role
      : allowlistRole;

  const newProfile: UserProfile = {
    userId,
    email: normalizedEmail,
    displayName: profileInput.displayName || "",
    role: resolvedRole,
    createdAt: profileInput.createdAt || now,
    lastLoginAt: profileInput.lastLoginAt || now,
  };

  if (profileInput.phoneNumber) {
    newProfile.phoneNumber = profileInput.phoneNumber;
  }
  if (profileInput.photoURL) {
    newProfile.photoURL = profileInput.photoURL;
  }
  if (profileInput.birthDetails) {
    const birthVal = validateCustomerBirthDetails(profileInput.birthDetails);
    if (!birthVal.valid) {
      throw new Error(`Invalid birth details: ${birthVal.error}`);
    }
    newProfile.birthDetails = birthVal.validatedDetails;
  }
  if (profileInput.preferences) {
    newProfile.preferences = profileInput.preferences;
  }

  try {
    const userDocRef = doc(firestoreDb, "users", userId);
    await setDoc(userDocRef, newProfile);
    return newProfile;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Updates an existing user profile document at users/{userId}.
 * Disallows mutation of immutable fields (userId, createdAt) and prevents client role escalation.
 */
export async function updateUserProfile(
  userId: string,
  updates: UserProfileUpdatePayload,
  internalPrivileged: boolean = false
): Promise<void> {
  if (!userId) {
    throw new Error("userId is required to update a user profile.");
  }

  const path = `users/${userId}`;
  const now = new Date().toISOString();

  // Strip prohibited immutable fields
  const safePayload: Record<string, any> = {
    ...updates,
    updatedAt: now,
  };
  delete safePayload.userId;
  delete safePayload.createdAt;

  // Normal client profile mutations are never permitted to alter the role
  if (!internalPrivileged) {
    delete safePayload.role;
  }

  if (safePayload.email) {
    safePayload.email = normalizeEmail(safePayload.email);
  }

  // Validate birthDetails if supplied in update payload
  if (safePayload.birthDetails) {
    const birthValidation = validateCustomerBirthDetails(safePayload.birthDetails);
    if (!birthValidation.valid) {
      throw new Error(`Invalid birth details: ${birthValidation.error}`);
    }
    safePayload.birthDetails = birthValidation.validatedDetails;
  }

  try {
    const userDocRef = doc(firestoreDb, "users", userId);
    await updateDoc(userDocRef, safePayload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Synchronizes Firebase Auth state with Firestore users/{userId} document.
 * - If the document exists, updates lastLoginAt and refreshes email/displayName if necessary.
 * - If the document does not exist, provisions a new profile document.
 * Prevents client-side privilege escalation by deriving default roles from verified server authority or allowlist.
 */
export async function syncUserProfileOnAuth(
  authUser: {
    uid: string;
    email?: string | null;
    displayName?: string | null;
    phoneNumber?: string | null;
    photoURL?: string | null;
  },
  serverRole?: AuthRole
): Promise<UserProfile> {
  const userId = authUser.uid;
  const email = normalizeEmail(authUser.email || "");
  const now = new Date().toISOString();

  let existing: UserProfile | null = null;
  try {
    existing = await getUserProfile(userId);
  } catch (lookupErr) {
    console.warn(`[UserProfile] Existing profile lookup for ${userId} pending creation:`, lookupErr);
  }

  if (existing) {
    // Document exists - update lastLoginAt and any missing fields
    const updates: UserProfileUpdatePayload = {
      lastLoginAt: now,
    };

    if (authUser.displayName && !existing.displayName) {
      updates.displayName = authUser.displayName;
    }
    if (authUser.photoURL && !existing.photoURL) {
      updates.photoURL = authUser.photoURL;
    }
    if (authUser.phoneNumber && !existing.phoneNumber) {
      updates.phoneNumber = authUser.phoneNumber;
    }

    // Role safety check: if server provided a verified higher role, sync it
    if (serverRole && existing.role !== serverRole) {
      updates.role = serverRole;
    }

    try {
      await updateUserProfile(userId, updates, true);
      return {
        ...existing,
        ...updates,
        updatedAt: now,
      };
    } catch (err) {
      console.warn("[UserProfile] Failed to update lastLoginAt on existing profile:", err);
      return existing;
    }
  } else {
    // Profile does not exist yet - create canonical profile document
    const determinedRole = serverRole || resolveRoleFromEmail(email);
    return await createUserProfile({
      userId,
      email,
      displayName: authUser.displayName || "",
      role: determinedRole,
      phoneNumber: authUser.phoneNumber || undefined,
      photoURL: authUser.photoURL || undefined,
      createdAt: now,
      lastLoginAt: now,
    });
  }
}
