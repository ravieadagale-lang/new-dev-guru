/**
 * Dev-Guru Consultation Domain Architecture
 * Phase 1: Consultation Foundation / Environment
 * 
 * Strongly typed domain models for the two-sided Consultation system:
 * - Side A: Client / Customer
 * - Side B: Consultant / Administrator
 * 
 * Current Consultant Operator: ravieadagale@gmail.com (Super Admin)
 */

export interface Money {
  /**
   * Integer minor units (e.g. cents, paise).
   * NEVER use floating-point numbers for money calculations.
   */
  readonly amountMinor: number;
  /**
   * ISO 4217 Currency Code (e.g. "INR", "USD", "EUR")
   */
  readonly currency: string;
}

export type ConsultationCategory =
  | "VEDIC_ASTROLOGY"
  | "BIRTH_CHART_KUNDLI"
  | "KP_ASTROLOGY"
  | "NUMEROLOGY"
  | "VASTU_SHASTRA"
  | "TAROT_READING"
  | "CAREER_FINANCE"
  | "BUSINESS_FINANCE"
  | "RELATIONSHIP_COMPATIBILITY"
  | "RELATIONSHIP_FAMILY"
  | "SPIRITUAL_GUIDANCE"
  | "MUHURTA_TIMING"
  | "BIRTH_TIME_RECTIFICATION"
  | "GENERAL_GUIDANCE";

export type ConsultationMode =
  | "VIDEO"
  | "AUDIO"
  | "PHONE"
  | "WHATSAPP_AUDIO"
  | "WHATSAPP_VIDEO"
  | "GOOGLE_MEET"
  | "ZOOM"
  | "CHAT"
  | "IN_PERSON";

export interface ConsultantContactChannels {
  readonly phone?: string; // Configured verified phone (for safe tel: action)
  readonly whatsAppPhone?: string; // Configured WhatsApp number (for https://wa.me/... deep-link)
  readonly googleMeetUrl?: string; // Configured Google Meet URL (per booking/service)
  readonly zoomJoinUrl?: string; // Configured Zoom link (per booking/service)
  readonly inPersonAddress?: string; // Physical studio location
}

export type QuickConsultationType =
  | "SINGLE_QUESTION"
  | "YES_NO"
  | "QUICK_CHAT"
  | "QUICK_AUDIO"
  | "QUICK_VIDEO";

export interface QuickConsultationService {
  readonly id: string;
  readonly type: QuickConsultationType;
  readonly name: string;
  readonly shortDescription: string;
  readonly price: Money;
  readonly estimatedResponseTime: string; // e.g. "Within 2 hours"
  readonly durationMinutes?: number;
  readonly supportedModes: readonly ConsultationMode[];
  readonly bookingEnabled: boolean;
}

export interface QuickConsultationInquiry {
  readonly type: QuickConsultationType;
  readonly question: string;
  readonly context?: string;
  readonly preferredResponseMode: "TEXT" | "AUDIO" | "VIDEO";
  readonly clientName: string;
  readonly clientEmail: string;
  readonly clientPhone?: string;
  readonly birthDetails?: {
    readonly dob?: string;
    readonly time?: string;
    readonly place?: string;
  };
}

export type ConsultationStatus =
  | "DRAFT"
  | "REQUESTED"
  | "PENDING_CONFIRMATION"
  | "CONFIRMED"
  | "RESCHEDULE_REQUESTED"
  | "RESCHEDULE_PROPOSED"
  | "RESCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED_BY_CLIENT"
  | "CANCELLED_BY_CONSULTANT"
  | "DECLINED"
  | "NO_SHOW_CLIENT"
  | "NO_SHOW_CONSULTANT"
  | "EXPIRED";

export type PaymentStatus =
  | "NOT_REQUIRED"
  | "PENDING"
  | "AUTHORIZED"
  | "PAID"
  | "FAILED"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED"
  | "PAYMENT_NOT_CONNECTED";

export interface Consultant {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly title: string;
  readonly role: "CONSULTANT" | "SUPER_ADMIN" | "ADMIN";
  readonly status: "ACTIVE" | "INACTIVE" | "ON_LEAVE";
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ConsultantProfile {
  readonly consultantId: string;
  readonly bio: string;
  readonly detailedBio?: string;
  readonly mainExpertise: string; // e.g. "Love & Relationship"
  readonly areasOfExpertise: readonly string[]; // Canonical 8 areas of expertise
  readonly authorDescription?: string; // Canonical author bibliographic description
  readonly authoredWorks?: readonly string[]; // Canonical authored book titles
  readonly specialties: readonly ConsultationCategory[];
  readonly languages: readonly string[];
  readonly qualifications?: readonly string[];
  readonly experienceYears?: number;
  readonly timezone: string;
  readonly avatarUrl?: string;
  readonly contactChannels?: ConsultantContactChannels;
  readonly isPublic: boolean;
}

export interface ConsultationPolicy {
  readonly minimumNoticeMinutes: number;
  readonly maxAdvanceBookingDays: number;
  readonly cancellationGraceHours: number;
  readonly reschedulingAllowed: boolean;
  readonly maxReschedulesCount: number;
}

export interface ConsultationService {
  readonly id: string;
  readonly consultantId: string;
  readonly category: ConsultationCategory;
  readonly name: string;
  readonly description: string;
  readonly durationMinutes: number;
  readonly bufferMinutes: number;
  readonly price: Money;
  readonly supportedModes: readonly ConsultationMode[];
  readonly bookingEnabled: boolean;
  readonly status: "ACTIVE" | "INACTIVE";
  readonly clientQuestionRequired: boolean;
  readonly maxAdvanceBookingDays: number;
  readonly minimumNoticeMinutes: number;
  readonly cancellationPolicyText: string;
  readonly reschedulePolicyText: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface DayWorkingHours {
  readonly dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 1 = Monday, etc.
  readonly isEnabled: boolean;
  readonly timeRanges: readonly {
    readonly start: string; // "HH:MM" 24h
    readonly end: string;   // "HH:MM" 24h
  }[];
  readonly breaks?: readonly {
    readonly start: string; // "HH:MM"
    readonly end: string;   // "HH:MM"
  }[];
}

export interface AvailabilityRule {
  readonly id: string;
  readonly consultantId: string;
  readonly weeklyHours: readonly DayWorkingHours[];
  readonly timezone: string;
  readonly bufferMinutes: number;
  readonly isActive?: boolean;
}

export interface AvailabilityException {
  readonly id: string;
  readonly consultantId: string;
  readonly date: string; // "YYYY-MM-DD"
  readonly type: "BLOCKED_DAY" | "CUSTOM_HOURS" | "HOLIDAY";
  readonly timeRanges?: readonly {
    readonly start: string; // "HH:MM"
    readonly end: string;   // "HH:MM"
  }[];
  readonly reason?: string;
}

export interface ConsultationAvailability {
  readonly consultantId: string;
  readonly rules: readonly AvailabilityRule[];
  readonly exceptions: readonly AvailabilityException[];
  readonly supportedModes: readonly ConsultationMode[];
  readonly timezone: string;
  readonly active?: boolean;
}

export interface ConsultationSlot {
  readonly slotId: string;
  readonly consultantId: string;
  readonly serviceId: string;
  readonly mode: ConsultationMode;
  readonly startTime: string; // ISO 8601
  readonly endTime: string;   // ISO 8601
  readonly isAvailable: boolean;
  readonly unavailableReason?: string;
}

export interface RescheduleRecord {
  readonly previousStartTime: string;
  readonly newStartTime: string;
  readonly requestedBy: "CLIENT" | "CONSULTANT";
  readonly reason: string;
  readonly timestamp: string;
}

export interface ConsultationBooking {
  readonly id: string;
  readonly clientId: string;
  readonly clientEmail: string;
  readonly clientName: string;
  readonly consultantId: string;
  readonly consultantEmail: string;
  readonly serviceId: string;
  readonly category: ConsultationCategory;
  readonly mode: ConsultationMode;
  readonly startTime: string; // ISO 8601
  readonly endTime: string;   // ISO 8601
  readonly timezone: string;
  readonly clientQuestion?: string;
  readonly clientNotes?: string;
  readonly status: ConsultationStatus;
  readonly paymentStatus: PaymentStatus;
  readonly paymentOption?: "PAY_IN_FULL_NOW" | "PAY_BEFORE_SESSION";
  readonly originalPrice?: Money;
  readonly finalPrice?: Money;
  readonly cancellationReason?: string;
  readonly rescheduleHistory: readonly RescheduleRecord[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ConsultationClientDetails {
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly birthDetails?: {
    readonly dob: string;
    readonly time: string;
    readonly place: string;
    readonly latitude?: number;
    readonly longitude?: number;
  };
  readonly focusTopic: string;
  readonly specificQuestions?: readonly string[];
}

export interface ConsultationRequest {
  readonly serviceId: string;
  readonly consultantId: string;
  readonly mode: ConsultationMode;
  readonly requestedStartTime: string; // ISO 8601
  readonly clientDetails: ConsultationClientDetails;
  readonly timezone: string;
}

export interface ConsultationNotes {
  readonly id: string;
  readonly bookingId: string;
  readonly consultantId: string;
  readonly privateNotes: string;
  readonly remediesRecommended: readonly string[];
  readonly followUpRequired: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ConsultationOutcome {
  readonly id: string;
  readonly bookingId: string;
  readonly summary: string;
  readonly actionItems: readonly string[];
  readonly followUpDate?: string;
  readonly createdAt: string;
}

export interface ConsultationFollowUp {
  readonly id: string;
  readonly bookingId: string;
  readonly dueDate: string;
  readonly status: "PENDING" | "COMPLETED" | "CANCELLED";
  readonly notes: string;
  readonly createdAt: string;
}

export interface ConsultationNotification {
  readonly id: string;
  readonly recipientEmail: string;
  readonly recipientType: "CLIENT" | "CONSULTANT";
  readonly type:
    | "BOOKING_REQUESTED"
    | "BOOKING_CONFIRMED"
    | "BOOKING_RESCHEDULED"
    | "BOOKING_CANCELLED"
    | "REMINDER_24H"
    | "REMINDER_1H"
    | "NOTES_ADDED";
  readonly title: string;
  readonly message: string;
  readonly bookingId: string;
  readonly timestamp: string;
  readonly isRead: boolean;
}
