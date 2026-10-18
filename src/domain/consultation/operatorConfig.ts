import { ConsultantProfile } from "./types";

/**
 * Authoritative Canonical Operator Configuration
 * Dev-Guru Consultation Domain
 * 
 * Super Admin & Primary Practitioner:
 * ravieadagale@gmail.com
 * 
 * Admin Operator:
 * ravii.adagale20@gmail.com
 */

export const CURRENT_CONSULTANT_EMAIL = "ravieadagale@gmail.com";
export const ADMIN_CONSULTANT_EMAIL = "ravii.adagale20@gmail.com";

export const PRIMARY_CONSULTANT = Object.freeze({
  id: "consultant-primary-ravie",
  name: "Ravie Adagale",
  title: "Consultant",
  email: CURRENT_CONSULTANT_EMAIL,
});

export const CANONICAL_MAIN_EXPERTISE = "Love & Relationship";

export const CANONICAL_AREAS_OF_EXPERTISE = Object.freeze([
  "Astrology",
  "Numerology",
  "Tarot Reading",
  "Master Crystal Healer",
  "Yantra Expert",
  "Vastu Expert",
  "Face Reader",
  "Graphology",
]);

export const CANONICAL_AUTHOR_DESCRIPTION = undefined;
export const CANONICAL_AUTHORED_WORKS = undefined;

export const PRIMARY_CONSULTANT_PROFILE: ConsultantProfile = Object.freeze({
  consultantId: PRIMARY_CONSULTANT.id,
  name: "Ravie Adagale",
  title: "Consultant",
  avatarUrl: "/assets/images/ravie_adagale_profile.png",
  mainExpertise: CANONICAL_MAIN_EXPERTISE,
  areasOfExpertise: CANONICAL_AREAS_OF_EXPERTISE,
  specialties: [
    "VEDIC_ASTROLOGY",
    "RELATIONSHIP_COMPATIBILITY",
    "NUMEROLOGY",
    "TAROT_READING",
    "VASTU_SHASTRA",
  ],
  languages: ["English", "Hindi", "Marathi"],
  timezone: "Asia/Kolkata",
  bio: "Senior Vedic Jyotish Consultant specializing in Love & Relationship, Astrology, and Graphology.",
});
