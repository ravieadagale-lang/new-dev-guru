/**
 * AstroNext BTR Profile Validation Module
 * Enforces strict boundaries against invented/default person ingestion (e.g. Aarav Sharma).
 * Distinguishes missing profiles, unknown birth times, and approximate times deterministically.
 */

export type BtrProfileValidationState =
  | "VALID_KNOWN_TIME"     // STATE D: Real DOB + real location + recorded time
  | "VALID_UNKNOWN_TIME"   // STATE A: Real DOB + real location + birth time unknown
  | "BLOCKED_NO_DOB"       // STATE B: No real DOB
  | "BLOCKED_NO_LOCATION"  // STATE C: No real location or invalid coordinates
  | "BLOCKED_DEFAULT_PROFILE"; // Invented default profile (Aarav Sharma) or completely missing profile

export interface BtrValidationResult {
  state: BtrProfileValidationState;
  isAllowedToRun: boolean;
  guidanceMessage: string;
  isUnknownTime: boolean;
  validatedData?: {
    dob: string;
    place: string;
    latitude: number;
    longitude: number;
    timezoneOffsetHours: number;
    time?: string;
  };
}

/**
 * Detects whether the profile matches the fallback default persona (Aarav Sharma, 1995-08-15, 10:30, New Delhi)
 */
export function isInventedDefaultProfile(profile?: {
  name?: string;
  dob?: string;
  time?: string;
  place?: string;
  latitude?: number;
  longitude?: number;
  isDefaultProfile?: boolean;
  isDefault?: boolean;
} | null): boolean {
  if (!profile) return false;
  if (profile.isDefaultProfile === true || (profile as any).isDefault === true) return true;

  const name = (profile.name || "").trim().toLowerCase();
  const dob = (profile.dob || "").trim();
  const time = (profile.time || "").trim();
  const place = (profile.place || "").trim().toLowerCase();

  const isAaravName = name === "aarav sharma" || name.includes("aarav sharma");
  const isAaravDob = dob === "1995-08-15";
  const isAaravTime = time === "10:30";
  const isAaravPlace = place.includes("delhi");

  // Check if it's the named Aarav Sharma placeholder
  if (isAaravName) return true;

  // If the profile matches the default invented seed birth data
  if (isAaravDob && (isAaravTime || isAaravPlace)) {
    return true;
  }

  return false;
}

/**
 * Validates a calendar Date of Birth (YYYY-MM-DD)
 */
export function isValidDob(dob?: string): boolean {
  if (!dob || typeof dob !== "string") return false;
  const trimmed = dob.trim();
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (!match) return false;

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return false;
  if (year < 1850 || year > 2100) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  // Leap-year aware days in month validation
  const isLeap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day > daysInMonth[month - 1]) return false;

  return true;
}

/**
 * Validates birth location string and numeric geographical coordinates
 */
export function isValidLocation(place?: string, latitude?: number, longitude?: number): boolean {
  if (!place || typeof place !== "string" || place.trim().length === 0) return false;
  if (typeof latitude !== "number" || isNaN(latitude) || !isFinite(latitude) || latitude < -90 || latitude > 90) return false;
  if (typeof longitude !== "number" || isNaN(longitude) || !isFinite(longitude) || longitude < -180 || longitude > 180) return false;
  return true;
}

/**
 * Validates timezone offset hours (-14 to +14)
 */
export function isValidTimezone(tzOffsetHours?: number): boolean {
  if (typeof tzOffsetHours !== "number" || isNaN(tzOffsetHours) || !isFinite(tzOffsetHours) || tzOffsetHours < -14 || tzOffsetHours > 14) {
    return false;
  }
  return true;
}

/**
 * Checks if birth time is explicitly unknown
 */
export function isUnknownBirthTime(time?: string, reliability?: string): boolean {
  if (reliability === "completely_unknown") return true;
  if (!time || typeof time !== "string" || time.trim() === "" || time.trim().toLowerCase() === "unknown") return true;
  return false;
}

/**
 * Core validation function evaluating birth profile readiness for BTR
 */
export function validateBirthProfileForBtr(params: {
  dob?: string;
  time?: string;
  place?: string;
  latitude?: number;
  longitude?: number;
  timezoneOffsetHours?: number;
  name?: string;
  reliability?: string;
  isDefaultProfile?: boolean;
}): BtrValidationResult {
  // 1. Missing profile completely or matches default invented persona
  if (!params.dob && !params.place && (params.latitude === undefined || params.longitude === undefined)) {
    return {
      state: "BLOCKED_DEFAULT_PROFILE",
      isAllowedToRun: false,
      isUnknownTime: true,
      guidanceMessage: "Enter your birth details to begin Birth Time Rectification."
    };
  }

  if (isInventedDefaultProfile(params)) {
    return {
      state: "BLOCKED_DEFAULT_PROFILE",
      isAllowedToRun: false,
      isUnknownTime: false,
      guidanceMessage: "Enter your birth details to begin Birth Time Rectification."
    };
  }

  // 2. STATE B: Validate Real DOB
  if (!isValidDob(params.dob)) {
    return {
      state: "BLOCKED_NO_DOB",
      isAllowedToRun: false,
      isUnknownTime: false,
      guidanceMessage: "A valid Date of Birth (YYYY-MM-DD) is required to begin Birth Time Rectification."
    };
  }

  // 3. STATE C: Validate Real Location
  if (!isValidLocation(params.place, params.latitude, params.longitude)) {
    return {
      state: "BLOCKED_NO_LOCATION",
      isAllowedToRun: false,
      isUnknownTime: false,
      guidanceMessage: "A verified birth location with valid geographic coordinates (latitude and longitude) is required to begin Birth Time Rectification."
    };
  }

  const tz = params.timezoneOffsetHours !== undefined ? params.timezoneOffsetHours : 5.5;
  if (!isValidTimezone(tz)) {
    return {
      state: "BLOCKED_NO_LOCATION",
      isAllowedToRun: false,
      isUnknownTime: false,
      guidanceMessage: "A valid timezone offset (-14 to +14 hours) is required to begin Birth Time Rectification."
    };
  }

  // 4. STATE A vs STATE D: Unknown Time vs Known/Approximate Time
  const unknown = isUnknownBirthTime(params.time, params.reliability);
  if (unknown) {
    return {
      state: "VALID_UNKNOWN_TIME",
      isAllowedToRun: true,
      isUnknownTime: true,
      guidanceMessage: "Birth time is unknown. Rectification will investigate across an entire day (24-hour) or custom search window.",
      validatedData: {
        dob: params.dob!.trim(),
        place: params.place!.trim(),
        latitude: params.latitude!,
        longitude: params.longitude!,
        timezoneOffsetHours: tz,
        time: undefined
      }
    };
  }

  // STATE D: Valid real birth data with known or approximate recorded time
  return {
    state: "VALID_KNOWN_TIME",
    isAllowedToRun: true,
    isUnknownTime: false,
    guidanceMessage: "Birth details verified. Rectification will calibrate around your recorded time using the selected search span.",
    validatedData: {
      dob: params.dob!.trim(),
      place: params.place!.trim(),
      latitude: params.latitude!,
      longitude: params.longitude!,
      timezoneOffsetHours: tz,
      time: params.time!.trim()
    }
  };
}
