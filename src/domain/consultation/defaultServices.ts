import { ConsultationService, QuickConsultationService, ConsultationCategory } from "./types";
import { PRIMARY_CONSULTANT } from "./operatorConfig";
import { createMoney } from "./money";

/**
 * Supported Consultation Categories Catalog Definition
 */
export interface CategoryDefinition {
  readonly id: ConsultationCategory;
  readonly label: string;
  readonly description: string;
}

export const SUPPORTED_CONSULTATION_CATEGORIES: readonly CategoryDefinition[] = Object.freeze([
  {
    id: "VEDIC_ASTROLOGY",
    label: "Vedic Astrology",
    description: "Classical Parashari principles, D1 Rashi, D9 Navamsha, and Vimshottari Mahadasha timing.",
  },
  {
    id: "BIRTH_CHART_KUNDLI",
    label: "Birth Chart / Kundli",
    description: "In-depth Janam Kundli analysis covering all 12 Bhavas, planetary yogas, and life roadmap.",
  },
  {
    id: "MARRIAGE_COMPATIBILITY",
    label: "Marriage & Compatibility",
    description: "Ashtakoota Guna Milan, Nadi Dosha, Manglik evaluation, and Upapada Lagna synastry.",
  },
  {
    id: "KP_ASTROLOGY",
    label: "KP Astrology",
    description: "Krishnamurti Padhdhati stellar astrology using Placidus cusps and cuspal sub-lords.",
  },
  {
    id: "JAIMINI",
    label: "Jaimini Sutram",
    description: "Chara Karakas (Atmakaraka, Amatyakaraka), Arudha Padas, and Chara Dasha timing.",
  },
  {
    id: "BNN",
    label: "Bhrigu Nandi Nadi (BNN)",
    description: "Planetary combinational principles and Jupiter progression transits.",
  },
  {
    id: "CLASSICAL_LAL_KITAB",
    label: "Classical Lal Kitab",
    description: "Varshaphala charts, artificial planetary placements, and specific traditional remedies.",
  },
  {
    id: "MUHURTA",
    label: "Muhurta",
    description: "Electional astrology for weddings, property purchases, inaugurations, and sacred rituals.",
  },
  {
    id: "NUMEROLOGY",
    label: "Numerology",
    description: "Chaldean, Pythagorean, and Vedic name vibration, Driver & Conductor harmonic analysis.",
  },
  {
    id: "TAROT",
    label: "Tarot",
    description: "Intuitive archetypal Tarot spreads for present clarity and spiritual reflection.",
  },
  {
    id: "VASTU",
    label: "Vastu Shastra",
    description: "Spatial orientation, directional energy balance, and residential/commercial Vastu.",
  },
  {
    id: "CAREER_GUIDANCE",
    label: "Career Guidance",
    description: "10th house examination, D10 Dashamsha analysis, promotion timing, and vocational alignment.",
  },
  {
    id: "BUSINESS_GUIDANCE",
    label: "Business Guidance",
    description: "7th and 11th house analysis, business incorporation timing, and partnership compatibility.",
  },
  {
    id: "RELATIONSHIP_GUIDANCE",
    label: "Relationship Guidance",
    description: "Emotional harmony, Venus-Mars dynamics, and communication resolution.",
  },
  {
    id: "SPIRITUAL_GUIDANCE",
    label: "Spiritual Guidance",
    description: "9th and 12th house Moksha trikona, Ishta Devata identification, and meditative practices.",
  },
  {
    id: "BIRTH_TIME_RECTIFICATION",
    label: "Birth Time Rectification",
    description: "Verification and adjustment of birth time using major life events and Shastric sub-divisions.",
  },
]);

/**
 * Canonical Consultation Services.
 * Each service includes all required fields, integer minor-unit money, and explicit configuration flags.
 */
export const CANONICAL_CONSULTATION_SERVICES: readonly ConsultationService[] = Object.freeze([
  {
    id: "srv-vedic-comprehensive",
    consultantId: PRIMARY_CONSULTANT.id,
    category: "VEDIC_ASTROLOGY",
    name: "Master Vedic Kundli & Shastric Blueprint Analysis",
    description:
      "Deep 1-on-1 Shastric chart assessment analyzing D1 Rashi, D9 Navamsha, Vimshottari Mahadasha timing, Ashtakavarga points, and targeted classical remedial guidance.",
    durationMinutes: 45,
    bufferMinutes: 15,
    price: createMoney(250000, "INR"), // ₹2,500.00
    currency: "INR",
    isPriceConfigured: true,
    enabled: true,
    bookingEnabled: true,
    quickConsultation: false,
    scheduledConsultation: true,
    supportedModes: ["VIDEO_CALL", "AUDIO_CALL"],
    supportedCommunicationMethods: ["VIDEO_CALL", "AUDIO_CALL"],
    minimumNoticeMinutes: 120, // 2 hours
    maximumAdvanceDays: 30,
    maxAdvanceBookingDays: 30,
    cancellationWindowHours: 12,
    rescheduleWindowHours: 6,
    requiredClientFields: ["name", "email", "focusTopic", "dob", "tob", "pob"],
    optionalClientFields: ["phone", "specificQuestions"],
    status: "ACTIVE",
    clientQuestionRequired: true,
    cancellationPolicyText: "Cancellations allowed up to 12 hours before session.",
    reschedulePolicyText: "One reschedule allowed with at least 6 hours advance notice.",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-09-21T00:00:00.000Z",
  },
  {
    id: "srv-kp-career-finance",
    consultantId: PRIMARY_CONSULTANT.id,
    category: "KP_ASTROLOGY",
    name: "KP Stellar Astrology — Career & Wealth Timing",
    description:
      "High-precision Krishnamurti Padhdhati analysis utilizing Placidus cuspal sub-lords and ruling planets for career pivots, financial milestones, and business ventures.",
    durationMinutes: 30,
    bufferMinutes: 15,
    price: createMoney(180000, "INR"), // ₹1,800.00
    currency: "INR",
    isPriceConfigured: true,
    enabled: true,
    bookingEnabled: true,
    quickConsultation: false,
    scheduledConsultation: true,
    supportedModes: ["VIDEO_CALL", "AUDIO_CALL", "PHONE_CALL"],
    supportedCommunicationMethods: ["VIDEO_CALL", "AUDIO_CALL", "PHONE_CALL"],
    minimumNoticeMinutes: 120,
    maximumAdvanceDays: 30,
    maxAdvanceBookingDays: 30,
    cancellationWindowHours: 12,
    rescheduleWindowHours: 6,
    requiredClientFields: ["name", "email", "focusTopic", "dob", "tob", "pob"],
    optionalClientFields: ["phone", "specificQuestions"],
    status: "ACTIVE",
    clientQuestionRequired: true,
    cancellationPolicyText: "Cancellations allowed up to 12 hours before session.",
    reschedulePolicyText: "One reschedule allowed with at least 6 hours advance notice.",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-09-21T00:00:00.000Z",
  },
  {
    id: "srv-muhurta-auspicious",
    consultantId: PRIMARY_CONSULTANT.id,
    category: "MUHURTA",
    name: "Sacred Muhurta & Auspicious Event Timing",
    description:
      "Electional Vedic astrology to identify optimal time windows for weddings, corporate ventures, Griha Pravesh, property registrations, and major life endeavors.",
    durationMinutes: 30,
    bufferMinutes: 15,
    price: createMoney(150000, "INR"), // ₹1,500.00
    currency: "INR",
    isPriceConfigured: true,
    enabled: true,
    bookingEnabled: true,
    quickConsultation: false,
    scheduledConsultation: true,
    supportedModes: ["VIDEO_CALL", "AUDIO_CALL", "PHONE_CALL"],
    supportedCommunicationMethods: ["VIDEO_CALL", "AUDIO_CALL", "PHONE_CALL"],
    minimumNoticeMinutes: 180,
    maximumAdvanceDays: 60,
    maxAdvanceBookingDays: 60,
    cancellationWindowHours: 24,
    rescheduleWindowHours: 12,
    requiredClientFields: ["name", "email", "focusTopic"],
    optionalClientFields: ["phone", "dob", "tob", "pob", "specificQuestions"],
    status: "ACTIVE",
    clientQuestionRequired: true,
    cancellationPolicyText: "Cancellations allowed up to 24 hours before session.",
    reschedulePolicyText: "Reschedules allowed up to 12 hours before session.",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-09-21T00:00:00.000Z",
  },
  {
    id: "srv-numerology-name",
    consultantId: PRIMARY_CONSULTANT.id,
    category: "NUMEROLOGY",
    name: "Advanced Chaldean & Vedic Name Resonance Audit",
    description:
      "Comprehensive evaluation of Driver, Conductor, Kua, and Name compound frequencies. Strategic name spelling adjustments to align with ruling beneficial planetary energies.",
    durationMinutes: 30,
    bufferMinutes: 15,
    price: createMoney(160000, "INR"), // ₹1,600.00
    currency: "INR",
    isPriceConfigured: true,
    enabled: true,
    bookingEnabled: true,
    quickConsultation: false,
    scheduledConsultation: true,
    supportedModes: ["VIDEO_CALL", "AUDIO_CALL", "IN_APP_CHAT"],
    supportedCommunicationMethods: ["VIDEO_CALL", "AUDIO_CALL", "IN_APP_CHAT"],
    minimumNoticeMinutes: 120,
    maximumAdvanceDays: 30,
    maxAdvanceBookingDays: 30,
    cancellationWindowHours: 12,
    rescheduleWindowHours: 6,
    requiredClientFields: ["name", "email", "focusTopic", "dob"],
    optionalClientFields: ["phone", "tob", "pob", "specificQuestions"],
    status: "ACTIVE",
    clientQuestionRequired: true,
    cancellationPolicyText: "Cancellations allowed up to 12 hours before session.",
    reschedulePolicyText: "One reschedule allowed with at least 6 hours advance notice.",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-09-21T00:00:00.000Z",
  },
  {
    id: "srv-kundli-full-life",
    consultantId: PRIMARY_CONSULTANT.id,
    category: "BIRTH_CHART_KUNDLI",
    name: "Complete Janam Kundli & Life Destiny Roadmap",
    description:
      "Holistic analysis of the 12 Bhavas, planetary yogas, Sade Sati & Dhaiya cycles, and life timeline guidance with personalized remedial gems and mantras.",
    durationMinutes: 60,
    bufferMinutes: 15,
    price: createMoney(310000, "INR"), // ₹3,100.00
    currency: "INR",
    isPriceConfigured: true,
    enabled: true,
    bookingEnabled: true,
    quickConsultation: false,
    scheduledConsultation: true,
    supportedModes: ["VIDEO_CALL", "GOOGLE_MEET", "ZOOM"],
    supportedCommunicationMethods: ["VIDEO_CALL", "GOOGLE_MEET", "ZOOM"],
    minimumNoticeMinutes: 120,
    maximumAdvanceDays: 30,
    maxAdvanceBookingDays: 30,
    cancellationWindowHours: 12,
    rescheduleWindowHours: 6,
    requiredClientFields: ["name", "email", "focusTopic", "dob", "tob", "pob"],
    optionalClientFields: ["phone", "specificQuestions"],
    status: "ACTIVE",
    clientQuestionRequired: true,
    cancellationPolicyText: "Cancellations allowed up to 12 hours before session.",
    reschedulePolicyText: "One reschedule allowed with at least 6 hours advance notice.",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-09-21T00:00:00.000Z",
  },
  {
    id: "srv-career-guidance",
    consultantId: PRIMARY_CONSULTANT.id,
    category: "CAREER_GUIDANCE",
    name: "Career Transition, Business Expansion & Wealth Timing",
    description:
      "Strategic guidance for professional promotions, job transitions, partnership integrity, and auspicious capital investment periods according to Dashas and planetary transits.",
    durationMinutes: 45,
    bufferMinutes: 15,
    price: createMoney(210000, "INR"), // ₹2,100.00
    currency: "INR",
    isPriceConfigured: true,
    enabled: true,
    bookingEnabled: true,
    quickConsultation: false,
    scheduledConsultation: true,
    supportedModes: ["VIDEO_CALL", "AUDIO_CALL", "PHONE_CALL", "WHATSAPP_AUDIO"],
    supportedCommunicationMethods: ["VIDEO_CALL", "AUDIO_CALL", "PHONE_CALL", "WHATSAPP_AUDIO"],
    minimumNoticeMinutes: 120,
    maximumAdvanceDays: 30,
    maxAdvanceBookingDays: 30,
    cancellationWindowHours: 12,
    rescheduleWindowHours: 6,
    requiredClientFields: ["name", "email", "focusTopic", "dob", "tob", "pob"],
    optionalClientFields: ["phone", "specificQuestions"],
    status: "ACTIVE",
    clientQuestionRequired: true,
    cancellationPolicyText: "Cancellations allowed up to 12 hours before session.",
    reschedulePolicyText: "One reschedule allowed with at least 6 hours advance notice.",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-09-21T00:00:00.000Z",
  },
]);

/**
 * Canonical Quick / Instant Consultation Services.
 */
export const CANONICAL_QUICK_SERVICES: readonly QuickConsultationService[] = Object.freeze([
  {
    id: "quick-single-question",
    type: "SINGLE_QUESTION",
    name: "Ask Single Focused Question",
    shortDescription: "Have one urgent question? Submit your question and receive authoritative personal guidance.",
    price: createMoney(49900, "INR"), // ₹499.00
    priceConfigured: true,
    estimatedResponseTime: "Within 2–4 hours",
    supportedModes: ["IN_APP_CHAT", "AUDIO_CALL", "VIDEO_CALL"],
    supportedDeliveryMethods: ["WRITTEN", "AUDIO_RESPONSE", "IN_APP_CHAT"],
    bookingEnabled: true,
  },
  {
    id: "quick-yes-no",
    type: "YES_NO_QUESTION",
    name: "Yes / No Shastric Guidance",
    shortDescription: "Need binary clarity on a decision or endeavor? Get clear Prashna-based directional insight.",
    price: createMoney(29900, "INR"), // ₹299.00
    priceConfigured: true,
    estimatedResponseTime: "Within 1–2 hours",
    supportedModes: ["IN_APP_CHAT"],
    supportedDeliveryMethods: ["WRITTEN", "IN_APP_CHAT"],
    bookingEnabled: true,
  },
  {
    id: "quick-urgent-decision",
    type: "URGENT_DECISION",
    name: "Urgent Decision Astrological Assessment",
    shortDescription: "Immediate Prashna and transit evaluation for critical career, legal, or personal choices.",
    price: createMoney(69900, "INR"), // ₹699.00
    priceConfigured: true,
    estimatedResponseTime: "Within 2 hours",
    durationMinutes: 15,
    supportedModes: ["IN_APP_CHAT", "AUDIO_CALL"],
    supportedDeliveryMethods: ["WRITTEN", "AUDIO_RESPONSE"],
    bookingEnabled: true,
  },
  {
    id: "quick-muhurta-query",
    type: "MUHURTA_QUERY",
    name: "Quick Muhurta Time Window Query",
    shortDescription: "Fast calculation of an auspicious muhurta window for an upcoming event within 7 days.",
    price: createMoney(59900, "INR"), // ₹599.00
    priceConfigured: true,
    estimatedResponseTime: "Within 3 hours",
    supportedModes: ["IN_APP_CHAT"],
    supportedDeliveryMethods: ["WRITTEN"],
    bookingEnabled: true,
  },
  {
    id: "quick-gemstone-query",
    type: "GEMSTONE_QUERY",
    name: "Gemstone & Rudraksha Recommendation Query",
    shortDescription: "Planetary strength assessment to determine beneficial vs adverse gemstones and rudraksha beads.",
    price: createMoney(49900, "INR"), // ₹499.00
    priceConfigured: true,
    estimatedResponseTime: "Within 4 hours",
    supportedModes: ["IN_APP_CHAT"],
    supportedDeliveryMethods: ["WRITTEN"],
    bookingEnabled: true,
  },
  {
    id: "quick-prashna-query",
    type: "PRASHNA_QUERY",
    name: "Prashna Kundli Query (Horary Chart)",
    shortDescription: "Instant horary Kundli cast at the time of query reception to address a specific query.",
    price: createMoney(69900, "INR"), // ₹699.00
    priceConfigured: true,
    estimatedResponseTime: "Within 2–4 hours",
    supportedModes: ["IN_APP_CHAT", "AUDIO_CALL"],
    supportedDeliveryMethods: ["WRITTEN", "AUDIO_RESPONSE"],
    bookingEnabled: true,
  },
]);
