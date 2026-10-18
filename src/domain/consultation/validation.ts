import {
  ConsultationService,
  ConsultantProfile,
  AvailabilityRule,
  ConsultationRequest,
  ConsultationClientDetails,
  ConsultationNotes,
  ConsultationMode,
  QuickConsultationInquiry,
} from "./types";

export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: readonly string[];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateConsultationService(service: Partial<ConsultationService>): ValidationResult {
  const errors: string[] = [];

  if (!service.id || typeof service.id !== "string" || service.id.trim() === "") {
    errors.push("Service ID is required");
  }
  if (!service.consultantId || typeof service.consultantId !== "string" || service.consultantId.trim() === "") {
    errors.push("Consultant ID is required");
  }
  if (!service.name || typeof service.name !== "string" || service.name.trim().length < 3) {
    errors.push("Service name must be at least 3 characters");
  }
  if (!service.description || typeof service.description !== "string" || service.description.trim().length < 10) {
    errors.push("Service description must be at least 10 characters");
  }
  if (typeof service.durationMinutes !== "number" || service.durationMinutes < 15 || service.durationMinutes > 240) {
    errors.push("Duration must be between 15 and 240 minutes");
  }
  if (typeof service.bufferMinutes !== "number" || service.bufferMinutes < 0 || service.bufferMinutes > 60) {
    errors.push("Buffer minutes must be between 0 and 60 minutes");
  }
  if (!service.price || typeof service.price.amountMinor !== "number" || service.price.amountMinor < 0) {
    errors.push("Valid price in integer minor units is required");
  }
  if (!service.supportedModes || !Array.isArray(service.supportedModes) || service.supportedModes.length === 0) {
    errors.push("At least one supported consultation mode is required");
  }
  if (typeof service.minimumNoticeMinutes !== "number" || service.minimumNoticeMinutes < 0) {
    errors.push("Minimum notice minutes must be a non-negative integer");
  }
  if (typeof service.maxAdvanceBookingDays !== "number" || service.maxAdvanceBookingDays < 1 || service.maxAdvanceBookingDays > 365) {
    errors.push("Max advance booking days must be between 1 and 365");
  }

  return { isValid: errors.length === 0, errors };
}

export function validateConsultantProfile(profile: Partial<ConsultantProfile>): ValidationResult {
  const errors: string[] = [];

  if (!profile.consultantId || typeof profile.consultantId !== "string" || profile.consultantId.trim() === "") {
    errors.push("Consultant ID is required");
  }
  if (!profile.bio || typeof profile.bio !== "string" || profile.bio.trim().length < 20) {
    errors.push("Bio must be at least 20 characters");
  }
  if (!profile.specialties || !Array.isArray(profile.specialties) || profile.specialties.length === 0) {
    errors.push("At least one specialty category is required");
  }
  if (!profile.languages || !Array.isArray(profile.languages) || profile.languages.length === 0) {
    errors.push("At least one spoken language is required");
  }
  if (profile.experienceYears !== undefined && (typeof profile.experienceYears !== "number" || profile.experienceYears < 0)) {
    errors.push("Experience years must be a non-negative number");
  }
  if (!profile.timezone || typeof profile.timezone !== "string" || profile.timezone.trim() === "") {
    errors.push("Timezone identifier is required");
  }

  return { isValid: errors.length === 0, errors };
}

export function validateAvailabilityRule(rule: Partial<AvailabilityRule>): ValidationResult {
  const errors: string[] = [];

  if (!rule.consultantId || typeof rule.consultantId !== "string") {
    errors.push("Consultant ID is required");
  }
  if (!rule.weeklyHours || !Array.isArray(rule.weeklyHours) || rule.weeklyHours.length === 0) {
    errors.push("Weekly working hours are required");
  } else {
    for (const day of rule.weeklyHours) {
      if (typeof day.dayOfWeek !== "number" || day.dayOfWeek < 0 || day.dayOfWeek > 6) {
        errors.push(`Invalid day of week: ${day.dayOfWeek}`);
      }
      if (day.isEnabled && day.timeRanges) {
        for (const range of day.timeRanges) {
          if (!/^\d{2}:\d{2}$/.test(range.start) || !/^\d{2}:\d{2}$/.test(range.end)) {
            errors.push(`Invalid 24h time format in range: ${range.start}-${range.end}`);
          } else if (range.start >= range.end) {
            errors.push(`Start time ${range.start} must be before end time ${range.end}`);
          }
        }
      }
    }
  }

  return { isValid: errors.length === 0, errors };
}

export function validateClientConsultationDetails(details: Partial<ConsultationClientDetails>): ValidationResult {
  const errors: string[] = [];

  if (!details.name || typeof details.name !== "string" || details.name.trim().length < 2) {
    errors.push("Client name must be at least 2 characters");
  }
  if (!details.email || !EMAIL_REGEX.test(details.email.trim())) {
    errors.push("Valid client email is required");
  }
  if (!details.focusTopic || typeof details.focusTopic !== "string" || details.focusTopic.trim().length < 3) {
    errors.push("Focus topic must be specified (at least 3 characters)");
  }
  if (details.birthDetails) {
    if (details.birthDetails.dob && !/^\d{4}-\d{2}-\d{2}$/.test(details.birthDetails.dob)) {
      errors.push("Birth date must follow YYYY-MM-DD format");
    }
  }

  return { isValid: errors.length === 0, errors };
}

export function validateBookingRequest(request: Partial<ConsultationRequest>): ValidationResult {
  const errors: string[] = [];

  if (!request.serviceId || typeof request.serviceId !== "string" || request.serviceId.trim() === "") {
    errors.push("Service ID is required");
  }
  if (!request.consultantId || typeof request.consultantId !== "string" || request.consultantId.trim() === "") {
    errors.push("Consultant ID is required");
  }
  const validModes: ConsultationMode[] = [
    "VIDEO",
    "AUDIO",
    "PHONE",
    "WHATSAPP_AUDIO",
    "WHATSAPP_VIDEO",
    "GOOGLE_MEET",
    "ZOOM",
    "CHAT",
    "IN_PERSON",
  ];
  if (!request.mode || !validModes.includes(request.mode)) {
    errors.push("Valid consultation mode is required");
  }
  if (!request.requestedStartTime || isNaN(new Date(request.requestedStartTime).getTime())) {
    errors.push("Valid requested start time (ISO 8601) is required");
  }
  if (!request.timezone || typeof request.timezone !== "string" || request.timezone.trim() === "") {
    errors.push("Client timezone is required");
  }
  if (!request.clientDetails) {
    errors.push("Client consultation details are required");
  } else {
    const detailsResult = validateClientConsultationDetails(request.clientDetails);
    errors.push(...detailsResult.errors);
  }

  return { isValid: errors.length === 0, errors };
}

export function validateConsultationNotes(notes: Partial<ConsultationNotes>): ValidationResult {
  const errors: string[] = [];

  if (!notes.bookingId || typeof notes.bookingId !== "string" || notes.bookingId.trim() === "") {
    errors.push("Booking ID is required");
  }
  if (!notes.consultantId || typeof notes.consultantId !== "string" || notes.consultantId.trim() === "") {
    errors.push("Consultant ID is required");
  }
  if (!notes.privateNotes || typeof notes.privateNotes !== "string" || notes.privateNotes.trim().length < 5) {
    errors.push("Private notes must be at least 5 characters");
  }

  return { isValid: errors.length === 0, errors };
}

export function validateCancellationRequest(data: { bookingId?: string; reason?: string }): ValidationResult {
  const errors: string[] = [];
  if (!data.bookingId || typeof data.bookingId !== "string" || data.bookingId.trim() === "") {
    errors.push("Booking ID is required");
  }
  if (!data.reason || typeof data.reason !== "string" || data.reason.trim().length < 5) {
    errors.push("Cancellation reason must be provided (at least 5 characters)");
  }
  return { isValid: errors.length === 0, errors };
}

export function validateRescheduleRequest(data: { bookingId?: string; newStartTime?: string; reason?: string }): ValidationResult {
  const errors: string[] = [];
  if (!data.bookingId || typeof data.bookingId !== "string" || data.bookingId.trim() === "") {
    errors.push("Booking ID is required");
  }
  if (!data.newStartTime || isNaN(new Date(data.newStartTime).getTime())) {
    errors.push("Valid new start time (ISO 8601) is required");
  }
  if (!data.reason || typeof data.reason !== "string" || data.reason.trim().length < 5) {
    errors.push("Rescheduling reason must be provided (at least 5 characters)");
  }
  return { isValid: errors.length === 0, errors };
}

export function validateQuickInquiry(inquiry: Partial<QuickConsultationInquiry>): ValidationResult {
  const errors: string[] = [];

  if (!inquiry.type) {
    errors.push("Consultation type is required");
  }
  if (!inquiry.question || typeof inquiry.question !== "string" || inquiry.question.trim().length < 5) {
    errors.push("Please provide a question (at least 5 characters)");
  } else if (inquiry.question.length > 1000) {
    errors.push("Question cannot exceed 1000 characters");
  }

  if (!inquiry.clientName || typeof inquiry.clientName !== "string" || inquiry.clientName.trim().length < 2) {
    errors.push("Please enter your name (at least 2 characters)");
  }

  if (!inquiry.clientEmail || !EMAIL_REGEX.test(inquiry.clientEmail.trim())) {
    errors.push("Please enter a valid email address");
  }

  const validModes = ["TEXT", "AUDIO", "VIDEO"];
  if (inquiry.preferredResponseMode && !validModes.includes(inquiry.preferredResponseMode)) {
    errors.push("Invalid preferred response mode");
  }

  return { isValid: errors.length === 0, errors };
}

export function validateProfilePhotoFile(file: { name: string; sizeBytes: number; type: string }): ValidationResult {
  const errors: string[] = [];
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
  const maxSizeBytes = 5 * 1024 * 1024; // 5 MB

  if (!file.name || typeof file.name !== "string") {
    errors.push("File name is required");
  } else {
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      errors.push("Supported photo formats are JPG, JPEG, PNG, and WEBP");
    }
  }

  if (file.type && !allowedMimeTypes.includes(file.type.toLowerCase())) {
    errors.push("File MIME type must be image/jpeg, image/png, or image/webp");
  }

  if (typeof file.sizeBytes !== "number" || file.sizeBytes <= 0) {
    errors.push("File cannot be empty");
  } else if (file.sizeBytes > maxSizeBytes) {
    errors.push("Photo file size must not exceed 5 MB");
  }

  return { isValid: errors.length === 0, errors };
}
