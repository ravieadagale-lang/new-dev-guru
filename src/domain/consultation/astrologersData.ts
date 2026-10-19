import { PRIMARY_CONSULTANT, PRIMARY_CONSULTANT_PROFILE } from "./operatorConfig";

export type AstrologerStatus = "ONLINE" | "OFFLINE";

export type AstrologerExpertiseCategory =
  | "LOVE_RELATIONSHIP"
  | "VEDIC_ASTROLOGY"
  | "KUNDLI_MATCHING"
  | "CAREER_FINANCE"
  | "NUMEROLOGY_TAROT"
  | "VASTU_SHASTRA"
  | "MUHURTA_PRASHNA"
  | "REMEDIAL_SPIRITUAL";

export interface CategoryOption {
  readonly id: AstrologerExpertiseCategory | "ALL";
  readonly label: string;
  readonly description: string;
}

export const ASTROLOGER_EXPERTISE_CATEGORIES: readonly CategoryOption[] = Object.freeze([
  {
    id: "ALL",
    label: "All Specialties",
    description: "Browse all certified Vedic astrologers across all disciplines",
  },
  {
    id: "LOVE_RELATIONSHIP",
    label: "Love & Relationship",
    description: "Kundli Milan, synastry, partner compatibility, and emotional harmony",
  },
  {
    id: "VEDIC_ASTROLOGY",
    label: "Vedic Astrology",
    description: "Classical Parashari assessment, Vimshottari Dasha, and life roadmap",
  },
  {
    id: "KUNDLI_MATCHING",
    label: "Kundli & Matchmaking",
    description: "Ashtakoota 36 Guna Milan, Manglik Dosha, and Nadi rectifications",
  },
  {
    id: "CAREER_FINANCE",
    label: "Career & Finance",
    description: "KP cuspal timing, corporate promotions, and business investments",
  },
  {
    id: "NUMEROLOGY_TAROT",
    label: "Numerology & Tarot",
    description: "Chaldean name resonance, Driver/Conductor numbers, and Tarot spreads",
  },
  {
    id: "VASTU_SHASTRA",
    label: "Vastu Shastra",
    description: "Spatial energy balancing, residential/commercial Astro-Architecture",
  },
  {
    id: "MUHURTA_PRASHNA",
    label: "Muhurta & Prashna",
    description: "Electional auspicious windows and horary instant situational analysis",
  },
  {
    id: "REMEDIAL_SPIRITUAL",
    label: "Remedial & Spiritual",
    description: "Shastric gemstone therapy, Yantra energization, and karmic remedies",
  },
]);

export interface Astrologer {
  readonly id: string;
  readonly name: string;
  readonly title: string;
  readonly avatarUrl?: string;
  readonly status: AstrologerStatus;
  readonly isOnline: boolean;
  readonly nextAvailableText: string;
  readonly experienceYears: number;
  readonly rating: number; // e.g. 4.98 out of 5
  readonly totalConsultations: number;
  readonly mainExpertise: string;
  readonly category: AstrologerExpertiseCategory;
  readonly allCategories: readonly AstrologerExpertiseCategory[];
  readonly skills: readonly string[];
  readonly languages: readonly string[];
  readonly baseFee: number; // in INR
  readonly discountedFee: number; // in INR with 20% advance discount
  readonly durationMinutes: number;
  readonly bio: string;
  readonly isChiefConsultant?: boolean;
  readonly defaultServiceId?: string;
}

export const VERIFIED_ASTROLOGERS: readonly Astrologer[] = Object.freeze([
  {
    id: "astrologer-ravie-adagale",
    name: PRIMARY_CONSULTANT.name,
    title: "Founder & Chief Vedic Consultant",
    avatarUrl: PRIMARY_CONSULTANT_PROFILE.avatarUrl,
    status: "ONLINE",
    isOnline: true,
    nextAvailableText: "Online Now • Instant Connect",
    experienceYears: 14,
    rating: 4.98,
    totalConsultations: 1480,
    mainExpertise: "Love & Relationship",
    category: "LOVE_RELATIONSHIP",
    allCategories: [
      "LOVE_RELATIONSHIP",
      "VEDIC_ASTROLOGY",
      "KUNDLI_MATCHING",
      "NUMEROLOGY_TAROT",
      "VASTU_SHASTRA",
      "REMEDIAL_SPIRITUAL",
    ],
    skills: [
      "Love & Relationship",
      "Vedic Astrology",
      "Kundli Milan",
      "Numerology",
      "Tarot Reading",
      "Master Crystal Healer",
      "Vastu Shastra",
      "Face Reader",
      "Graphology",
    ],
    languages: ["English", "Hindi", "Marathi"],
    baseFee: 2500,
    discountedFee: 2000,
    durationMinutes: 45,
    bio: "Senior Vedic Jyotish Consultant and Founder practicing since 2013. Master accreditations in Parashari astrology, relationship synastry, Chaldean numerology, and crystal healing.",
    isChiefConsultant: true,
    defaultServiceId: "srv-vedic-comprehensive",
  },
  {
    id: "astrologer-anand-shastri",
    name: "Dr. Anand Shastri",
    title: "Senior KP Stellar & Vedic Scholar",
    avatarUrl: "/src/assets/images/vedic_sage_horoscope_1789639030606.jpg",
    status: "ONLINE",
    isOnline: true,
    nextAvailableText: "Online Now • Available for Call",
    experienceYears: 16,
    rating: 4.94,
    totalConsultations: 1120,
    mainExpertise: "Career & Finance",
    category: "CAREER_FINANCE",
    allCategories: ["CAREER_FINANCE", "VEDIC_ASTROLOGY", "MUHURTA_PRASHNA"],
    skills: [
      "KP Astrology",
      "Cuspal Sub-Lords",
      "Career Timing",
      "Corporate Finance",
      "D10 Dashamsha",
      "Wealth Yoga Identification",
    ],
    languages: ["English", "Hindi", "Sanskrit"],
    baseFee: 1800,
    discountedFee: 1440,
    durationMinutes: 30,
    bio: "Doctorate in Sanskrit & Classical Jyotish. Renowned specialist in Krishnamurti Padhdhati (KP) cuspal sub-lord analysis for executive career pivots and high-stakes capital investments.",
    defaultServiceId: "srv-kp-career-finance",
  },
  {
    id: "astrologer-meera-joshi",
    name: "Acharya Meera Joshi",
    title: "Kundli Milan & Synastry Expert",
    status: "ONLINE",
    isOnline: true,
    nextAvailableText: "Online Now • Ready for Session",
    experienceYears: 11,
    rating: 4.92,
    totalConsultations: 890,
    mainExpertise: "Kundli & Matchmaking",
    category: "KUNDLI_MATCHING",
    allCategories: ["KUNDLI_MATCHING", "LOVE_RELATIONSHIP", "VEDIC_ASTROLOGY"],
    skills: [
      "Ashtakoota 36 Guna Milan",
      "Manglik Dosha Remedies",
      "Nadi Synastry",
      "Upapada Lagna",
      "Marriage Timing",
    ],
    languages: ["English", "Hindi", "Gujarati"],
    baseFee: 2100,
    discountedFee: 1680,
    durationMinutes: 45,
    bio: "Deep specialization in Vedic matrimonial compatibility, resolving Nadi & Bhakoot doshas through classical Shastric remedies and Upapada harmonic synchronizations.",
    defaultServiceId: "srv-kundli-full-life",
  },
  {
    id: "astrologer-raghavendra-sharma",
    name: "Pandit Raghavendra Sharma",
    title: "Master Vastu Shastra & Astro-Architecture",
    status: "OFFLINE",
    isOnline: false,
    nextAvailableText: "Next Slot: Today at 5:00 PM",
    experienceYears: 18,
    rating: 4.96,
    totalConsultations: 1340,
    mainExpertise: "Vastu Shastra",
    category: "VASTU_SHASTRA",
    allCategories: ["VASTU_SHASTRA", "REMEDIAL_SPIRITUAL"],
    skills: [
      "Residential Vastu",
      "Industrial Vastu",
      "Directional Energy Correction",
      "Pyramid Yantra Energization",
      "Brahmasthan Alignment",
    ],
    languages: ["English", "Hindi"],
    baseFee: 3100,
    discountedFee: 2480,
    durationMinutes: 60,
    bio: "18+ years transforming residential and commercial energy blueprints. Expert in non-demolition directional remediation, sacred geometry yantras, and planetary astro-architecture.",
    defaultServiceId: "srv-kundli-full-life",
  },
  {
    id: "astrologer-sunita-devi",
    name: "Vidushi Sunita Devi",
    title: "Chaldean Numerologist & Tarot Master",
    status: "ONLINE",
    isOnline: true,
    nextAvailableText: "Online Now • Quick Answers Open",
    experienceYears: 9,
    rating: 4.89,
    totalConsultations: 760,
    mainExpertise: "Numerology & Tarot",
    category: "NUMEROLOGY_TAROT",
    allCategories: ["NUMEROLOGY_TAROT", "REMEDIAL_SPIRITUAL", "LOVE_RELATIONSHIP"],
    skills: [
      "Chaldean Name Correction",
      "Driver & Conductor Numbers",
      "Tarot Archetypal Spreads",
      "Crystal Energy Healing",
      "Gemstone Recommendations",
    ],
    languages: ["English", "Hindi", "Bengali"],
    baseFee: 1500,
    discountedFee: 1200,
    durationMinutes: 30,
    bio: "Master practitioner of Chaldean name vibrations, Driver-Conductor planetary harmony, and archetypal Celtic Cross tarot readings for clarity on relationships and career crossroads.",
    defaultServiceId: "srv-numerology-name",
  },
  {
    id: "astrologer-devrat-bhatt",
    name: "Acharya Devrat Bhatt",
    title: "Prashna Tantra & Muhurta Specialist",
    status: "OFFLINE",
    isOnline: false,
    nextAvailableText: "Next Slot: Tomorrow at 10:30 AM",
    experienceYears: 8,
    rating: 4.86,
    totalConsultations: 520,
    mainExpertise: "Muhurta & Prashna",
    category: "MUHURTA_PRASHNA",
    allCategories: ["MUHURTA_PRASHNA", "VEDIC_ASTROLOGY"],
    skills: [
      "Prashna Kundli (Horary)",
      "Electional Muhurta",
      "Shodashvarga Analysis",
      "Vedic Horary Timing",
      "Gochara Transits",
    ],
    languages: ["Hindi", "Sanskrit", "Marathi"],
    baseFee: 1200,
    discountedFee: 960,
    durationMinutes: 30,
    bio: "Classical Sanskrit scholar specializing in Prashna Marga horary charts for immediate decisions, lost objects, and high-auspicious electional Muhurta timing for weddings and business.",
    defaultServiceId: "srv-muhurta-auspicious",
  },
  {
    id: "astrologer-vikramaditya-rao",
    name: "Dr. Vikramaditya Rao",
    title: "Medical Jyotish & Karmic Remedial Master",
    status: "ONLINE",
    isOnline: true,
    nextAvailableText: "Online Now • Session Slots Open",
    experienceYears: 15,
    rating: 4.93,
    totalConsultations: 1040,
    mainExpertise: "Remedial & Spiritual",
    category: "REMEDIAL_SPIRITUAL",
    allCategories: ["REMEDIAL_SPIRITUAL", "VEDIC_ASTROLOGY", "CAREER_FINANCE"],
    skills: [
      "Karmic Dasha Remediation",
      "Gemstone Prescription",
      "Moksha Trikona",
      "Sade Sati Defense",
      "Rahu-Ketu Transit Remedies",
    ],
    languages: ["English", "Hindi", "Telugu"],
    baseFee: 2800,
    discountedFee: 2240,
    durationMinutes: 45,
    bio: "Authority on classical Shastric remedies, astrological mantra energization, authentic certified gemstone prescriptions, and mitigating difficult planetary periods.",
    defaultServiceId: "srv-career-guidance",
  },
]);

export interface AstrologerFilterCriteria {
  status?: "ALL" | "ONLINE" | "OFFLINE";
  category?: AstrologerExpertiseCategory | "ALL";
  minFee?: number | null;
  maxFee?: number | null;
  searchQuery?: string;
  sortBy?: "RECOMMENDED" | "RATING_DESC" | "EXPERIENCE_DESC" | "FEE_ASC" | "FEE_DESC";
}

/**
 * Pure filtering function for Verified Astrologers.
 * Evaluates online status, expertise categories, fee bounds, and optional search & sort.
 */
export function filterAstrologers(
  astrologers: readonly Astrologer[],
  criteria: AstrologerFilterCriteria
): Astrologer[] {
  const {
    status = "ALL",
    category = "ALL",
    minFee = null,
    maxFee = null,
    searchQuery = "",
    sortBy = "RECOMMENDED",
  } = criteria;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = astrologers.filter((astro) => {
    // 1. Online / Offline status filter
    if (status === "ONLINE" && !astro.isOnline) {
      return false;
    }
    if (status === "OFFLINE" && astro.isOnline) {
      return false;
    }

    // 2. Expertise category filter
    if (category !== "ALL") {
      const matchesCategory =
        astro.category === category || astro.allCategories.includes(category);
      if (!matchesCategory) {
        return false;
      }
    }

    // 3. Minimum consultation fee filter (against baseFee)
    if (minFee !== null && minFee !== undefined && !isNaN(minFee)) {
      if (astro.baseFee < minFee) {
        return false;
      }
    }

    // 4. Maximum consultation fee filter (against baseFee)
    if (maxFee !== null && maxFee !== undefined && !isNaN(maxFee)) {
      if (astro.baseFee > maxFee) {
        return false;
      }
    }

    // 5. Text search query (optional keyword search for name, mainExpertise, skills, languages, bio)
    if (normalizedQuery.length > 0) {
      const matchName = astro.name.toLowerCase().includes(normalizedQuery);
      const matchTitle = astro.title.toLowerCase().includes(normalizedQuery);
      const matchMainExp = astro.mainExpertise.toLowerCase().includes(normalizedQuery);
      const matchBio = astro.bio.toLowerCase().includes(normalizedQuery);
      const matchSkill = astro.skills.some((s) => s.toLowerCase().includes(normalizedQuery));
      const matchLang = astro.languages.some((l) => l.toLowerCase().includes(normalizedQuery));

      if (
        !matchName &&
        !matchTitle &&
        !matchMainExp &&
        !matchBio &&
        !matchSkill &&
        !matchLang
      ) {
        return false;
      }
    }

    return true;
  });

  // 6. Sorting
  return filtered.sort((a, b) => {
    switch (sortBy) {
      case "RATING_DESC":
        return b.rating - a.rating;
      case "EXPERIENCE_DESC":
        return b.experienceYears - a.experienceYears;
      case "FEE_ASC":
        return a.baseFee - b.baseFee;
      case "FEE_DESC":
        return b.baseFee - a.baseFee;
      case "RECOMMENDED":
      default:
        // Featured/Chief consultant first, then by rating
        if (a.isChiefConsultant && !b.isChiefConsultant) return -1;
        if (!a.isChiefConsultant && b.isChiefConsultant) return 1;
        return b.rating - a.rating;
    }
  });
}
