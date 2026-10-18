// src/data/mobileNumerologyData.ts
// Complete Data for Chapter Twenty-Eight: Mobile Number Numerology
// Contains 4 Calculation Methods, 9 Primary Number Readings, Compatibility Rules, Special Patterns, Domain Guides, Selection Steps, and Remedies.

export interface MobileNumberReading {
  number: number;
  title: string;
  frequencyName: string;
  vibrationalEnergy: string;
  whatItCreates: string;
  bestFor: string[];
  avoidFor: string[];
  challenges: string;
}

export const PRIMARY_MOBILE_READINGS: Record<number, MobileNumberReading> = {
  1: {
    number: 1,
    title: "Mobile Primary 1 — The Leader's Frequency",
    frequencyName: "Authority & Independent Direction",
    vibrationalEnergy: "Independent authority, original self-direction, pioneering initiative, and executive presence.",
    whatItCreates: "A mobile number summing to 1 vibrates with independent authority and original self-direction. Callers instinctively associate this number with someone who leads, decides, and acts from personal judgment. It attracts inquiries seeking decisive direction, positioning you as an authority rather than a participant.",
    bestFor: [
      "Entrepreneurs & Business Owners",
      "Solo Practitioners & Independent Consultants",
      "Executive Directors & CEOs",
      "Political Leaders & Public Figures",
      "Freelancers & Pioneering Artists"
    ],
    avoidFor: [
      "Consensus-based Team Leaders",
      "Relationship & Marriage Counselors",
      "Mediators & Social Workers",
      "Subordinate or Support-only Roles"
    ],
    challenges: "May attract competitive friction or single-handed responsibility rather than cooperative partnership. Callers expect swift, authoritative decisions."
  },
  2: {
    number: 2,
    title: "Mobile Primary 2 — The Partner's Frequency",
    frequencyName: "Cooperation & Relational Warmth",
    vibrationalEnergy: "Cooperative warmth, diplomatic tact, empathic listening, and genuine relational trust.",
    whatItCreates: "A mobile number summing to 2 vibrates with cooperative warmth and relational attentiveness. Callers feel comfortable engaging in sensitive, confidential, and trust-based discussions. It consistently attracts relationship-oriented business and long-term client retention.",
    bestFor: [
      "Counselors, Therapists & Healthcare Workers",
      "Human Resources & Mediators",
      "Customer Relationship Managers",
      "Diplomats, Teachers & Social Workers",
      "Co-founders & Long-Term Service Advisors"
    ],
    avoidFor: [
      "Aggressive Commercial Sales Roles",
      "Competitive Investment Bankers",
      "Authoritative Enforcement Officers"
    ],
    challenges: "Risk of being perceived as overly accessible or service-oriented rather than commanding. High volume of personal emotional calls may drain energy."
  },
  3: {
    number: 3,
    title: "Mobile Primary 3 — The Communicator's Frequency",
    frequencyName: "Creative Expression & Social Magnetism",
    vibrationalEnergy: "Creative magnetism, joyful expressiveness, communicative warmth, and social engagement.",
    whatItCreates: "A mobile number summing to 3 vibrates with creative expression and social magnetism. Calls on this frequency carry a tone of enthusiasm, rapport, and creative optimism. It serves as a social amplifier, making marketing and media engagement effortless.",
    bestFor: [
      "Creative Artists, Designers & Writers",
      "Public Relations & Marketing Experts",
      "Teachers, Public Speakers & Performers",
      "Event Managers & Media Personalities",
      "Sales Executives & Personal Brand Coaches"
    ],
    avoidFor: [
      "Formal Legal & Compliance Officers",
      "Conservative Risk Management Advisors",
      "Solemn Judicial Practitioners"
    ],
    challenges: "May attract social chatter and informal inquiries that require time management discipline to keep focused on serious, high-value contracts."
  },
  4: {
    number: 4,
    title: "Mobile Primary 4 — The Expert's Frequency",
    frequencyName: "Reliability & Methodical Precision",
    vibrationalEnergy: "Methodical competence, structural precision, trustworthy reliability, and disciplined execution.",
    whatItCreates: "A mobile number summing to 4 projects reliable, methodical, and trustworthy competence. Callers approach with serious, consequential inquiries, expecting exactness and high standards. Over time, it establishes an unshakeable reputation for professional integrity.",
    bestFor: [
      "Engineers, Architects & Construction Managers",
      "Accountants, Auditors & Financial Advisors",
      "Lawyers, Project Managers & Administrators",
      "Medical Practitioners & Quality Assurance Experts",
      "Technical Consultants & IT System Architects"
    ],
    avoidFor: [
      "Spontaneous Entertainment Agencies",
      "Dynamic Trend-based Marketing Roles",
      "High-risk Speculative Traders"
    ],
    challenges: "Can project an impression of formal conservatism or strict procedure, which may require conscious effort to balance with relational warmth."
  },
  5: {
    number: 5,
    title: "Mobile Primary 5 — The Dynamic Frequency",
    frequencyName: "Versatility & Engaging Magnetism",
    vibrationalEnergy: "Dynamic adaptability, commercial networking, multi-directional expansion, and quick communication.",
    whatItCreates: "A mobile number summing to 5 vibrates with dynamic versatility and commercial magnetism. It attracts a wide, diverse stream of inquiries, opportunities, and international or cross-industry networks, keeping the carrier's pipeline vibrant and fluid.",
    bestFor: [
      "Sales Executives & Commercial Business Developers",
      "Consultants & Network Marketers",
      "Travel, Hospitality & Import-Export Agents",
      "Media Journalists & Event Organizers",
      "Dynamic Serial Entrepreneurs"
    ],
    avoidFor: [
      "Conservative Long-term Trust Services",
      "Estate Planning Lawyers",
      "Strict Inpatient Healthcare Facilities"
    ],
    challenges: "High influx of diverse calls can cause scattered focus and boundary overload if calls are not systematically categorized."
  },
  6: {
    number: 6,
    title: "Mobile Primary 6 — The Service Frequency",
    frequencyName: "Caring Service & Trusted Advisor",
    vibrationalEnergy: "Responsible care, trusted advice, harmony, luxury aesthetics, and protective service.",
    whatItCreates: "A mobile number summing to 6 projects warm, responsible, and caring service. It is instinctively trusted by clients seeking personal care, family guidance, luxury aesthetic services, or long-term financial security.",
    bestFor: [
      "Doctors, Nurses & Wellness Practitioners",
      "Family Lawyers & Estate Planners",
      "Beauty, Fashion & Luxury Brand Advisors",
      "Interior Designers & Hospitality Owners",
      "Educators, Counselors & Financial Planners"
    ],
    avoidFor: [
      "Aggressive Corporate Restructuring Roles",
      "Hostile Litigation Attorneys",
      "Speculative High-risk Trading Desks"
    ],
    challenges: "Attracts clients who require extensive personal care and emotional reassurance, necessitating clear professional boundary setting."
  },
  7: {
    number: 7,
    title: "Mobile Primary 7 — The Specialist's Deep Frequency",
    frequencyName: "Specialist Authority & Analytical Depth",
    vibrationalEnergy: "Specialist expertise, analytical research, premium positioning, and intellectual authority.",
    whatItCreates: "A mobile number summing to 7 vibrates with deep specialist authority and research-grade expertise. It commands respect, attracting serious clients who value rare, high-level technical knowledge and are prepared to pay premium fees.",
    bestFor: [
      "Medical Specialists & Surgeons",
      "Senior Legal Counsel & Patent Attorneys",
      "Research Scientists, Academics & Strategists",
      "Psychologists & Specialized Consultants",
      "IT Security Experts & Financial Analysts"
    ],
    avoidFor: [
      "Mass-market Customer Service Desks",
      "High-volume Retail Sales Outlets",
      "Casual Entertainment Bookings"
    ],
    challenges: "May project an intimidating or overly reserved aura, slightly reducing casual getting-to-know-you calls in favor of serious technical inquiries."
  },
  8: {
    number: 8,
    title: "Mobile Primary 8 — The Executive Authority Frequency",
    frequencyName: "Material Power & High-Stakes Commerce",
    vibrationalEnergy: "Executive authority, material intelligence, corporate power, and commercial scale.",
    whatItCreates: "A mobile number summing to 8 vibrates with executive authority and material mastery. It attracts high-value, high-consequence commercial dealings, corporate contracts, real estate investments, and executive leadership inquiries.",
    bestFor: [
      "CEOs, Managing Directors & Corporate Executives",
      "Investment Bankers & Real Estate Developers",
      "Commercial Lawyers & Corporate Strategists",
      "Industrialists & Heavy Commercial Owners",
      "High-stakes Business Brokers"
    ],
    avoidFor: [
      "Non-profit Social Work Inquiries",
      "Gentle Artistic Expression Classes",
      "Casual Relationship Counseling"
    ],
    challenges: "Creates an intense, formal atmosphere that commands respect but can feel intimidating to clients seeking casual or emotional warmth."
  },
  9: {
    number: 9,
    title: "Mobile Primary 9 — The Universal Frequency",
    frequencyName: "Universal Wisdom & Broad Humanitarian Resonance",
    vibrationalEnergy: "Universal service, broad visionary wisdom, compassionate breadth, and high-trust leadership.",
    whatItCreates: "A mobile number summing to 9 projects universal wisdom, compassionate breadth, and trustworthy public presence. It attracts meaningful inquiries from diverse social backgrounds, inspiring trust in large-scale social or educational initiatives.",
    bestFor: [
      "Healers, Holistic Doctors & Spiritual Teachers",
      "Humanitarian NGO Leaders & Social Entrepreneurs",
      "Writers, Artists & Visionary Educators",
      "Public Advocates & Community Organizers",
      "Global Consultants & Philanthropists"
    ],
    avoidFor: [
      "Purely Aggressive Short-Term Commercial Exploits",
      "High-friction Debt Collection Outlets"
    ],
    challenges: "Attracts individuals in genuine need or distress, requiring the owner to maintain firm commercial boundaries alongside compassionate service."
  }
};

export const MOBILE_LIFE_PATH_COMPATIBILITY: Record<number, { best: number[]; avoid: number[]; explanation: string }> = {
  1: {
    best: [1, 5, 7],
    avoid: [8, 2],
    explanation: "Life Path 1 thrives with Mobile 1 (amplified authority), Mobile 5 (dynamic expansion), and Mobile 7 (specialist depth). Mobile 8 creates executive authority clash, while Mobile 2 projects a cooperative tone that dilutes LP1's independent drive."
  },
  2: {
    best: [2, 6, 4],
    avoid: [1, 8],
    explanation: "Life Path 2 excels with Mobile 2 (relational warmth), Mobile 6 (caring service), and Mobile 4 (reliable competence). Avoid Mobile 1 and 8 as their aggressive authority conflicts with LP2's diplomatic orientation."
  },
  3: {
    best: [3, 6, 9],
    avoid: [4, 8],
    explanation: "Life Path 3 shines with Mobile 3 (creative magnetism), Mobile 6 (artistic warmth), and Mobile 9 (universal expressiveness). Avoid Mobile 4 and 8, which impose heavy administrative gravity on LP3's creative spirit."
  },
  4: {
    best: [4, 8, 1],
    avoid: [3, 5],
    explanation: "Life Path 4 aligns with Mobile 4 (methodical precision), Mobile 8 (material execution), and Mobile 1 (focused initiative). Avoid Mobile 3 and 5, whose scattered or unpredictable energy disrupts LP4's systematic order."
  },
  5: {
    best: [5, 1, 3],
    avoid: [4, 2],
    explanation: "Life Path 5 flourishes with Mobile 5 (dynamic versatility), Mobile 1 (independent pioneering), and Mobile 3 (expressive networking). Avoid Mobile 4 and 2, which restrict LP5's freedom and fast momentum."
  },
  6: {
    best: [6, 2, 9],
    avoid: [1, 8],
    explanation: "Life Path 6 is harmonized by Mobile 6 (caring service), Mobile 2 (empathic partnership), and Mobile 9 (humanitarian wisdom). Avoid Mobile 1 and 8, which lean too heavily into impersonal commercial authority."
  },
  7: {
    best: [7, 1, 5],
    avoid: [2, 6],
    explanation: "Life Path 7 commands respect with Mobile 7 (specialist authority), Mobile 1 (independent research), and Mobile 5 (adaptable intelligence). Avoid Mobile 2 and 6, which attract excessive casual social demands."
  },
  8: {
    best: [8, 4, 1],
    avoid: [2, 3],
    explanation: "Life Path 8 achieves commercial power with Mobile 8 (executive authority), Mobile 4 (practical reliability), and Mobile 1 (pioneering leadership). Avoid Mobile 2 and 3, which project overly gentle or informal tones."
  },
  9: {
    best: [9, 3, 6],
    avoid: [5, 4],
    explanation: "Life Path 9 fulfills its mission with Mobile 9 (universal wisdom), Mobile 3 (inspiring communication), and Mobile 6 (caring service). Avoid Mobile 4 and 5, which disrupt LP9's humanitarian vision."
  },
  11: {
    best: [2, 7, 9, 6],
    avoid: [1, 8],
    explanation: "Master Life Path 11 resonates with Master intuitive and illuminating vibrations (Mobile 2, 7, 9, 6)."
  },
  22: {
    best: [4, 8, 6, 1],
    avoid: [3, 5],
    explanation: "Master Life Path 22 resonates with Master Builder execution frequencies (Mobile 4, 8, 6, 1)."
  },
  33: {
    best: [6, 9, 3, 2],
    avoid: [4, 8],
    explanation: "Master Life Path 33 resonates with Master Teacher & Universal Healer frequencies (Mobile 6, 9, 3, 2)."
  }
};

export const DOMAIN_MOBILE_RECOMMENDATIONS = [
  {
    domain: "Business & Corporate Success",
    optimalPrimary: [8, 1, 4, 7],
    description: "Mobile 8 attracts high-stakes deals; Mobile 1 projects solo executive authority; Mobile 4 commands operational trust; Mobile 7 positions as a premium specialist."
  },
  {
    domain: "Personal & Romantic Relationships",
    optimalPrimary: [6, 2, 9, 3],
    description: "Mobile 6 fosters domestic harmony and care; Mobile 2 attracts warm cooperative intimacy; Mobile 9 brings universal trust; Mobile 3 adds joyful social magnetism."
  },
  {
    domain: "Health, Healing & Wellbeing",
    optimalPrimary: [6, 9, 2],
    description: "Mobile 6 and 9 promote holistic care and healing resonance; Mobile 2 brings sensitive body-mind somatic awareness."
  },
  {
    domain: "Spiritual Growth & Meditation",
    optimalPrimary: [7, 9, 2],
    description: "Mobile 7 activates deep contemplative research; Mobile 9 fosters universal higher consciousness; Mobile 2 develops non-rational intuitive perception."
  },
  {
    domain: "Financial Abundance & Wealth Creation",
    optimalPrimary: [8, 6, 1],
    description: "Mobile 8 commands material intelligence; Mobile 6 attracts deserved financial rewards (especially Chaldean Compound 15); Mobile 1 creates original financial ventures."
  }
];

export interface MobileCalculationResult {
  mobileNumber: string;
  cleanedDigits: string;
  digitSum: number;
  primaryNumber: number;
  compoundNumber: number;
  isKarmicDebt: boolean;
  karmicDebtCode?: number; // 13, 14, 16, 19
  isAuspiciousCompound: boolean;
  auspiciousCompoundCode?: number; // 15, 21, 23, 27
  firstDigit: number;
  lastDigit: number;
  firstDigitMeaning: string;
  lastDigitMeaning: string;
  specialPatterns: {
    repeatingDigits: { digit: number; count: number }[];
    isSequential: boolean;
    sequenceDescription?: string;
    isMirror: boolean;
    hasSpecialAuspiciousCode?: string; // 786, 108, etc.
  };
  reading: MobileNumberReading;
  compatibilityWithLifePath?: {
    lifePath: number;
    isBest: boolean;
    isAvoid: boolean;
    explanation: string;
  };
}

export function evaluateMobileNumber(
  rawMobile: string,
  lifePathNum?: number
): MobileCalculationResult | null {
  const cleanedDigits = rawMobile.replace(/[^0-9]/g, "");
  if (cleanedDigits.length < 7) return null;

  const digitArray = cleanedDigits.split("").map(Number);
  const digitSum = digitArray.reduce((acc, d) => acc + d, 0);

  // Reduce to single digit for primary
  let compound = digitSum;
  let primary = compound;

  // We want the intermediate compound sum (usually 2 digits, e.g., 45 -> 9, 53 -> 8, 40 -> 4)
  while (primary > 9) {
    primary = String(primary)
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }

  const isKarmicDebt = [13, 14, 16, 19].includes(compound);
  const karmicDebtCode = isKarmicDebt ? compound : undefined;

  const isAuspiciousCompound = [15, 21, 23, 27, 33, 42, 51].includes(compound);
  const auspiciousCompoundCode = isAuspiciousCompound ? compound : undefined;

  const firstDigit = digitArray[0];
  const lastDigit = digitArray[digitArray.length - 1];

  // First Digit Meanings
  let firstDigitMeaning = "";
  if (firstDigit === 6) firstDigitMeaning = "Opens with warm, responsible service and harmonious charm energy.";
  else if (firstDigit === 7) firstDigitMeaning = "Opens with analytical depth, specialist authority, and thoughtful reserve.";
  else if (firstDigit === 8) firstDigitMeaning = "Opens with material competence, executive authority, and commercial gravitas.";
  else if (firstDigit === 9) firstDigitMeaning = "Opens with universal wisdom, broad vision, and compassionate public presence.";
  else firstDigitMeaning = `Opens with the energetic vibration of Digit ${firstDigit}.`;

  // Last Digit Meanings (The Signature)
  let lastDigitMeaning = "";
  if (lastDigit === 1) lastDigitMeaning = "Leaves a signature of independent authority and decisive self-direction.";
  else if (lastDigit === 2) lastDigitMeaning = "Leaves a signature of warmth, cooperation, and receptive partnership.";
  else if (lastDigit === 3) lastDigitMeaning = "Leaves a signature of creative expressiveness, joy, and social enthusiasm.";
  else if (lastDigit === 4) lastDigitMeaning = "Leaves a signature of trustworthy reliability, methodical precision, and order.";
  else if (lastDigit === 5) lastDigitMeaning = "Leaves a signature of dynamic versatility, adaptability, and energetic magnetism.";
  else if (lastDigit === 6) lastDigitMeaning = "Leaves a signature of warm care, protective service, and aesthetic harmony.";
  else if (lastDigit === 7) lastDigitMeaning = "Leaves a signature of deep specialist authority, research accuracy, and wisdom.";
  else if (lastDigit === 8) lastDigitMeaning = "Leaves a signature of executive material strength, capability, and commercial scale.";
  else if (lastDigit === 9) lastDigitMeaning = "Leaves a signature of universal compassion, broad wisdom, and high trust.";
  else lastDigitMeaning = "Leaves a neutral placeholder signature that highlights the preceding digit.";

  // Special Patterns
  const counts: Record<number, number> = {};
  digitArray.forEach(d => { counts[d] = (counts[d] || 0) + 1; });

  const repeatingDigits = Object.entries(counts)
    .filter(([_, count]) => count >= 3)
    .map(([digit, count]) => ({ digit: Number(digit), count }))
    .sort((a, b) => b.count - a.count);

  let isSequential = false;
  let sequenceDescription = "";
  const digitStr = cleanedDigits;

  if (digitStr.includes("1234") || digitStr.includes("2345") || digitStr.includes("3456") || digitStr.includes("4567") || digitStr.includes("5678") || digitStr.includes("6789")) {
    isSequential = true;
    sequenceDescription = "Ascending sequential pattern detected (Promotes progressive forward momentum & growth).";
  } else if (digitStr.includes("9876") || digitStr.includes("8765") || digitStr.includes("7654") || digitStr.includes("6543")) {
    isSequential = true;
    sequenceDescription = "Descending sequential pattern detected (Promotes closure and resolution).";
  }

  const isMirror = digitStr.length >= 6 && digitStr.slice(-4) === digitStr.slice(-4).split("").reverse().join("");

  let hasSpecialAuspiciousCode = "";
  if (digitStr.includes("786")) hasSpecialAuspiciousCode = "Contains Sacred Bismillah (786) sequence.";
  if (digitStr.includes("108")) hasSpecialAuspiciousCode = "Contains Sacred Cosmic (108) frequency sequence.";

  const reading = PRIMARY_MOBILE_READINGS[primary] || PRIMARY_MOBILE_READINGS[1];

  let compatibilityWithLifePath: MobileCalculationResult["compatibilityWithLifePath"] = undefined;
  if (lifePathNum && MOBILE_LIFE_PATH_COMPATIBILITY[lifePathNum]) {
    const compData = MOBILE_LIFE_PATH_COMPATIBILITY[lifePathNum];
    const isBest = compData.best.includes(primary);
    const isAvoid = compData.avoid.includes(primary);

    compatibilityWithLifePath = {
      lifePath: lifePathNum,
      isBest,
      isAvoid,
      explanation: compData.explanation
    };
  }

  return {
    mobileNumber: rawMobile,
    cleanedDigits,
    digitSum,
    primaryNumber: primary,
    compoundNumber: compound,
    isKarmicDebt,
    karmicDebtCode,
    isAuspiciousCompound,
    auspiciousCompoundCode,
    firstDigit,
    lastDigit,
    firstDigitMeaning,
    lastDigitMeaning,
    specialPatterns: {
      repeatingDigits,
      isSequential,
      sequenceDescription,
      isMirror,
      hasSpecialAuspiciousCode
    },
    reading,
    compatibilityWithLifePath
  };
}

export const CHAPTER_TWENTY_EIGHT_THEORY = {
  chapterNumber: "Chapter Twenty-Eight",
  title: "Mobile Number Numerology",
  quote: {
    text: "Your phone number is not just a contact detail — it is the vibrational frequency through which the world reaches you and through which you reach the world.",
    author: "Chaldean Numerology Tradition"
  },
  fourMethodsSummary: [
    {
      name: "1. Primary Number (Total Sum)",
      description: "Summing all 10 digits to a single root digit. Governs the overall vibrational field and general opportunities attracted."
    },
    {
      name: "2. The Last Digit (The Signature)",
      description: "The final closing note that lingers in the minds of those who dial or receive your call."
    },
    {
      name: "3. The First Digit (The Opening)",
      description: "The initiating tone that shapes first impressions (e.g., Indian mobile prefixes 6, 7, 8, 9)."
    },
    {
      name: "4. Chaldean Compound Analysis",
      description: "Checking the 2-digit sum before reduction for Karmic Debts (13, 14, 16, 19) or Auspicious Compounds (15, 21, 23, 27)."
    }
  ],
  numberWrapperTechniqueText: "The Number Wrapper Technique is a practical interim remedy for numbers with Karmic Debt compounds. By consistently writing country codes (+91) on business cards and signatures, the additional digits shift the written compound total while preserving the dialled digits."
};
