import { ConsultationAvailability, DayWorkingHours } from "./types";
import { PRIMARY_CONSULTANT, PRIMARY_CONSULTANT_PROFILE } from "./operatorConfig";

export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const DEFAULT_WEEKLY_HOURS: readonly DayWorkingHours[] = Object.freeze([
  // 0: Sunday (Closed for Sacred Puja by default)
  {
    dayOfWeek: 0,
    isEnabled: false,
    timeRanges: [],
    breaks: [],
  },
  // 1: Monday
  {
    dayOfWeek: 1,
    isEnabled: true,
    timeRanges: [
      { start: "09:30", end: "13:30" },
      { start: "15:00", end: "19:00" },
    ],
    breaks: [
      { start: "13:30", end: "15:00" },
    ],
  },
  // 2: Tuesday
  {
    dayOfWeek: 2,
    isEnabled: true,
    timeRanges: [
      { start: "09:30", end: "13:30" },
      { start: "15:00", end: "19:00" },
    ],
    breaks: [
      { start: "13:30", end: "15:00" },
    ],
  },
  // 3: Wednesday
  {
    dayOfWeek: 3,
    isEnabled: true,
    timeRanges: [
      { start: "09:30", end: "13:30" },
      { start: "15:00", end: "19:00" },
    ],
    breaks: [
      { start: "13:30", end: "15:00" },
    ],
  },
  // 4: Thursday
  {
    dayOfWeek: 4,
    isEnabled: true,
    timeRanges: [
      { start: "09:30", end: "13:30" },
      { start: "15:00", end: "19:00" },
    ],
    breaks: [
      { start: "13:30", end: "15:00" },
    ],
  },
  // 5: Friday
  {
    dayOfWeek: 5,
    isEnabled: true,
    timeRanges: [
      { start: "09:30", end: "13:30" },
      { start: "15:00", end: "19:00" },
    ],
    breaks: [
      { start: "13:30", end: "15:00" },
    ],
  },
  // 6: Saturday
  {
    dayOfWeek: 6,
    isEnabled: true,
    timeRanges: [
      { start: "10:00", end: "16:00" },
    ],
    breaks: [
      { start: "13:00", end: "13:30" },
    ],
  },
]);

export function createCanonicalAvailability(
  consultantId: string = PRIMARY_CONSULTANT.id,
  timezone: string = PRIMARY_CONSULTANT_PROFILE.timezone
): ConsultationAvailability {
  return {
    consultantId,
    active: true,
    timezone,
    supportedModes: [
      "VIDEO",
      "AUDIO",
      "PHONE",
      "WHATSAPP_AUDIO",
      "WHATSAPP_VIDEO",
      "GOOGLE_MEET",
      "ZOOM",
      "CHAT",
      "IN_PERSON",
    ],
    rules: [
      {
        id: "rule-canonical-weekly",
        consultantId,
        weeklyHours: DEFAULT_WEEKLY_HOURS,
        timezone,
        bufferMinutes: 15,
        isActive: true,
      },
    ],
    exceptions: [],
  };
}

export const CANONICAL_CONSULTANT_AVAILABILITY: ConsultationAvailability =
  createCanonicalAvailability();
