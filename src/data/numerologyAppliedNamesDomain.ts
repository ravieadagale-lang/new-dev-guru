// src/data/numerologyAppliedNamesDomain.ts
// Chapter Sixteen: Applied Name Numerology — Business Names, Baby Names, Marriage Names, and Digital Names
// Comprehensive standalone reference for Enterprise Branding, Child Name Alignment, Marriage Surname Dynamics, and Digital Identity Physics.

export interface DomainGuideline {
  number: number;
  title: string;
  keywords: string[];
  vibrationalArchetype: string;
  idealApplications: string[];
  cautionNote?: string;
  detailedParagraphs: string[];
}

export interface ChapterSixteenTheoryData {
  title: string;
  subtitle: string;
  quote: {
    text: string;
    author: string;
  };
  introParagraphs: string[];
  fourDomainsBreakdown: {
    businessNamesRole: string;
    babyNamesRole: string;
    marriageNamesRole: string;
    digitalNamesRole: string;
  };
}

export const CHAPTER_SIXTEEN_THEORY_DATA: ChapterSixteenTheoryData = {
  title: "Applied Name Numerology — Business, Baby, Marriage & Digital Names",
  subtitle: "Names Beyond the Individual — Strategic Vibrational Architecture for Enterprises, Children, Marriages & Digital Real Estate",
  quote: {
    text: "A name is a fence and within it you are nameless.",
    author: "Samson Raphaelson"
  },
  introParagraphs: [
    "In this chapter, the core principles of Pythagorean and Chaldean name numerology extend to four applied domains where name selection has profound practical consequences: business names, baby names, marriage names, and digital names.",
    "A name chosen before usage allows deliberate alignment—ensuring that the vibrational frequency matches the intended purpose, client resonance, life path support, or professional digital presence.",
    "Understanding the vibrational physics across these four domains transforms name consultation from reactive reading into proactive vibrational architecture."
  ],
  fourDomainsBreakdown: {
    businessNamesRole: "Calculates Chaldean and Pythagorean Expression for commercial entities. Evaluates market positioning, founder alignment, and client attraction resonance.",
    babyNamesRole: "Harmonizes first name and full surname with the child's birth date (Life Path). Compensates for missing grid numbers and establishes auspicious Cornerstones.",
    marriageNamesRole: "Analyzes surname changes, hyphenated combinations, or retaining birth surnames. Tracks shifts in Expression, Personality, and compound energies before and after marriage.",
    digitalNamesRole: "Calculates email prefixes, website domain names, social media handles, and mobile numbers. Optimizes digital identity resonance for modern professional platforms."
  }
};

/**
 * 1. BUSINESS NAME NUMEROLOGY DATABASE & GUIDELINES
 */
export const BUSINESS_NAME_DATABASE: Record<number, DomainGuideline> = {
  1: {
    number: 1,
    title: "Pioneering & Independent Enterprise",
    keywords: ["Market Leader", "Pioneering Innovation", "Individual Brand"],
    vibrationalArchetype: "Original, courageous, self-starting commercial authority.",
    idealApplications: ["Solo Consultancies", "Tech Startups", "Boutique Design Practices", "Executive Leadership Brands"],
    detailedParagraphs: [
      "Expression 1 in a business name projects bold, independent leadership and market initiative.",
      "It attracts clients seeking original thinking, pioneering solutions, and firm, decisive direction.",
      "Best suited for enterprises where the primary value proposition centers on individual expertise and breakthrough innovation."
    ]
  },
  2: {
    number: 2,
    title: "Cooperative Service & Client Partnership",
    keywords: ["Diplomatic Service", "Relational Care", "Collaborative Trust"],
    vibrationalArchetype: "Warm, attentive, partnership-oriented service provider.",
    idealApplications: ["Counselling & Therapy Practices", "Healthcare Clinics", "Educational Services", "Mediation Agencies"],
    detailedParagraphs: [
      "Expression 2 in a business name projects warm accessibility, active listening, and genuine client care.",
      "It creates an environment where clients feel heard, safe, and personally attended to.",
      "Ideal for relationship-focused businesses where trust, empathy, and patient collaboration are paramount."
    ]
  },
  3: {
    number: 3,
    title: "Creative Agency & Expressive Enterprise",
    keywords: ["Articulate Communication", "Creative Flair", "Uplifting Brand"],
    vibrationalArchetype: "Expressive, communicative, joyfully creative entity.",
    idealApplications: ["Design Studios", "Advertising & PR Agencies", "Media Houses", "Entertainment Companies"],
    detailedParagraphs: [
      "Expression 3 in a business name broadcasts creative vitality, articulate communication, and energetic optimism.",
      "It attracts clients looking for engaging storytelling, aesthetic beauty, and fresh communicative perspective.",
      "Highly effective for media, artistic ventures, marketing, and platforms that inspire and entertain."
    ]
  },
  4: {
    number: 4,
    title: "Methodical Reliability & Structural Firm",
    keywords: ["Methodical Rigor", "Solid Foundation", "Unshakeable Quality"],
    vibrationalArchetype: "Disciplined, reliable, practical building authority.",
    idealApplications: ["Financial Advisory", "Legal Practices", "Construction & Engineering", "Accounting Firms"],
    detailedParagraphs: [
      "Expression 4 in a business name conveys solid structure, painstaking accuracy, and unshakeable dependability.",
      "It reassures clients that projects will be delivered on time, within budget, and to exact technical standards.",
      "Best for industries where safety, legal precision, financial integrity, and structural reliability are required."
    ]
  },
  5: {
    number: 5,
    title: "Dynamic Versatility & Rapid Innovation",
    keywords: ["Market Agility", "Progressive Growth", "Versatile Reach"],
    vibrationalArchetype: "Agile, adaptable, energetic multi-channel enterprise.",
    idealApplications: ["Travel & Tourism", "Digital Marketing Agencies", "Event Management", "Import-Export Ventures"],
    detailedParagraphs: [
      "Expression 5 in a business name projects magnetic adaptability, multi-faceted services, and forward-moving energy.",
      "It attracts clients seeking innovative solutions, rapid execution, and open-minded versatility.",
      "Excellent for fast-changing markets, global trading, technology platforms, and lifestyle brands."
    ]
  },
  6: {
    number: 6,
    title: "Community Stewardship & Harmonious Brand",
    keywords: ["Responsible Stewardship", "Nurturing Environment", "Aesthetic Beauty"],
    vibrationalArchetype: "Nurturing, protective, quality-conscious family or community brand.",
    idealApplications: ["Wellness Centres", "Family Enterprises", "Interior Architecture", "Hospitality & Care"],
    detailedParagraphs: [
      "Expression 6 in a business name radiates warmth, artistic beauty, responsibility, and protective care.",
      "It creates deep customer loyalty by making clients feel genuinely valued, safe, and comfortable.",
      "Ideal for health, home-related goods, luxury hospitality, ethics-first retail, and educational institutions."
    ]
  },
  7: {
    number: 7,
    title: "Specialist Authority & Analytical Excellence",
    keywords: ["Specialized Expertise", "Intellectual Depth", "Spiritual Quality"],
    vibrationalArchetype: "Rigorous, analytical, highly specialized research authority.",
    idealApplications: ["Research Institutes", "Specialist Consulting", "Scientific Labs", "Spiritual & Esoteric Practices"],
    detailedParagraphs: [
      "Expression 7 in a business name projects deep specialist expertise, analytical precision, and intellectual authority.",
      "It commands premium positioning by signaling that the firm possesses rare, thoroughly researched insight.",
      "Best for scientific, technological, academic, and esoteric consultancies where deep understanding is required."
    ]
  },
  8: {
    number: 8,
    title: "Executive Scale & Commercial Power",
    keywords: ["Corporate Leadership", "Resource Mastery", "High-Value Scale"],
    vibrationalArchetype: "Authoritative, financially commanding, high-stakes commercial powerhouse.",
    idealApplications: ["Investment Banks", "Real Estate Conglomerates", "Executive Search Firms", "Global Corporations"],
    detailedParagraphs: [
      "Expression 8 in a business name broadcasts corporate strength, material competence, and large-scale efficiency.",
      "It attracts high-net-worth clients, institutional partners, and major commercial opportunities.",
      "Essential for finance, heavy industry, commercial property, and large-scale organizational leadership."
    ]
  },
  9: {
    number: 9,
    title: "Universal Purpose & Global Humanitarian Brand",
    keywords: ["Global Vision", "Humanitarian Reach", "Universal Welfare"],
    vibrationalArchetype: "Broad, altruistic, globally conscious service enterprise.",
    idealApplications: ["NGOs & Charities", "Global Foundations", "Environmental Tech", "International Educational Trust"],
    detailedParagraphs: [
      "Expression 9 in a business name projects universal intent, ethical stewardship, and broad public benefit.",
      "It resonates with audiences seeking social responsibility, ecological awareness, and altruistic commitment.",
      "Ideal for non-profits, international initiatives, environmental solutions, and mission-driven institutions."
    ]
  },
  11: {
    number: 11,
    title: "Visionary Illumination & Catalytic Enterprise",
    keywords: ["Master Intuition", "Transformative Insight", "Illuminating Brand"],
    vibrationalArchetype: "Spiritual beacon, highly intuitive advisory, catalytic market force.",
    idealApplications: ["Transformational Coaching", "Mind-Body Institutes", "Inspirational Media", "Visionary Tech Labs"],
    detailedParagraphs: [
      "Master Expression 11 in a business name acts as a spiritual and intuitive beacon.",
      "It attracts clients seeking deep transformation, higher vision, and catalytic personal or organizational growth.",
      "Best for spiritual consultancies, holistic academies, and groundbreaking conceptual agencies."
    ]
  },
  22: {
    number: 22,
    title: "Master Builder & Historic Enterprise",
    keywords: ["Monumental Infrastructure", "Global Masterwork", "Historic Scope"],
    vibrationalArchetype: "Systemic master builder creating enduring global infrastructure.",
    idealApplications: ["Global Infrastructure Firms", "International Energy Consortia", "Systemic Philanthropic Foundations"],
    detailedParagraphs: [
      "Master Expression 22 in a business name represents monumental commercial and practical capability.",
      "It carries the vibration of erecting lasting institutions that serve humanity at scale.",
      "Requires immense operational integrity and large-scale vision to fully inhabit its frequency."
    ]
  },
  33: {
    number: 33,
    title: "Master Teacher & Universal Healing Brand",
    keywords: ["Selfless Stewardship", "Universal Upliftment", "Master Healing"],
    vibrationalArchetype: "Beacon of selfless love, master guidance, and universal healing.",
    idealApplications: ["Global Healing Academies", "Altruistic Medical Foundations", "Spiritual Stewardship Initiatives"],
    detailedParagraphs: [
      "Master Expression 33 in a business name radiates profound healing energy and spiritual mentorship.",
      "It attracts individuals seeking deep spiritual sanctuary, unconditional care, and master wisdom.",
      "Represents the highest octave of commercial service devoted entirely to collective human upliftment."
    ]
  }
};

/**
 * CAUTIONARY BUSINESS COMPOUND NUMBERS (Chaldean)
 */
export const CAUTIONARY_BUSINESS_COMPOUNDS = [
  {
    compound: 13,
    name: "Regeneration & Transformation under Pressure",
    description: "Carries the pattern of sudden disruption or obstacles near project completion. Requires strict ethical discipline and realistic timeline planning."
  },
  {
    compound: 14,
    name: "Rapid Change & Volatility",
    description: "Associated with fluctuating fortune and sudden shifts in market conditions. Excellent for short-term dynamic trading, but requires caution for long-term stability."
  },
  {
    compound: 16,
    name: "The Shattered Citadel",
    description: "Warns against building on unshakeable vanity or false premises. Demands complete authenticity, transparency, and humble foundations."
  },
  {
    compound: 18,
    name: "Material vs Idealistic Tension",
    description: "Indicates potential internal friction between commercial profit motives and organizational ethics. Requires clear contractual clarity."
  }
];

/**
 * 2. BABY NAME NUMEROLOGY GUIDELINES
 */
export interface BabyNamePrinciple {
  title: string;
  subtitle: string;
  description: string;
}

export const BABY_NAME_FOUR_PRINCIPLES: BabyNamePrinciple[] = [
  {
    title: "1. Life Path Alignment",
    subtitle: "Harmonizing Expression with Birth Date",
    description: "The primary name's Expression Number should support and complement the child's Life Path. An aligned name acts as a wind at the back, supporting natural soul potential."
  },
  {
    title: "2. Grid Missing Value Compensation",
    subtitle: "Balancing Birth Chart Absence",
    description: "By introducing letters carrying numbers absent in the birth date grid, the name supplies gentle compensating energy for well-rounded emotional and mental development."
  },
  {
    title: "3. Cornerstone Temperament Choice",
    subtitle: "First Initial Approach to Life",
    description: "The first letter of the first name sets the child's habitual posture toward new experiences—choosing an appropriate letter fosters confidence without aggression."
  },
  {
    title: "4. Full Name & Cultural Harmony",
    subtitle: "Phonetic Sound & Surname Integration",
    description: "Evaluating the first name together with the full surname ensures the complete birth Expression is auspicious, phonetically smooth, and culturally resonant."
  }
];

/**
 * 3. MARRIAGE NAME NUMEROLOGY GUIDELINES
 */
export interface MarriageNameGuideline {
  aspect: string;
  vibrationalImpact: string;
  analyticalAdvice: string;
}

export const MARRIAGE_NAME_GUIDELINES: MarriageNameGuideline[] = [
  {
    aspect: "Taking Partner's Surname",
    vibrationalImpact: "Completely alters the Expression, Personality, Karmic Lessons, and Letter Frequency Distribution while leaving the birth date Life Path untouched.",
    analyticalAdvice: "Compare before and after profiles systematically. Ensure the new Expression Number aligns with your Life Path and does not introduce unwanted compound debt."
  },
  {
    aspect: "Hyphenating Both Surnames",
    vibrationalImpact: "Creates a combined compound name that integrates heritage from both lineages, creating a broader letter frequency spectrum.",
    analyticalAdvice: "Calculate the total combined letters. Note that Order A-B vs Order B-A changes the Cornerstone of the surname portion and subtly alters the total vibration."
  },
  {
    aspect: "Retaining Birth Surname",
    vibrationalImpact: "Preserves complete vibrational continuity of the birth Expression and personal brand identity without structural shift.",
    analyticalAdvice: "Fully valid numerologically if the birth name is already in strong harmonic alignment with the individual's Life Path and destiny."
  },
  {
    aspect: "Creating a New Joint Surname",
    vibrationalImpact: "Establishes a fresh commercial and personal vibrational field chosen deliberately for the new family unit.",
    analyticalAdvice: "Design the new surname to yield an auspicious Chaldean compound and a Pythagorean Expression that serves both partners' Life Paths."
  }
];

/**
 * 4. DIGITAL NAME NUMEROLOGY GUIDELINES
 */
export interface DigitalCategoryGuideline {
  category: "email" | "domain" | "handle" | "phone";
  title: string;
  focusArea: string;
  calculationMethod: string;
  bestPractices: string[];
}

export const DIGITAL_NAME_GUIDELINES: DigitalCategoryGuideline[] = [
  {
    category: "email",
    title: "Email Address Numerology",
    focusArea: "Text before the @ symbol (letters only)",
    calculationMethod: "Calculate Chaldean and Pythagorean Expression of the username portion. Numbers and special characters serve as separators.",
    bestPractices: [
      "Select prefixes yielding Expression 1, 4, 7, 8 for executive, legal, or financial authority.",
      "Select prefixes yielding Expression 2, 3, 6, 9 for creative, therapeutic, or educational warmth.",
      "Ensure the Chaldean compound value is free from conflict compounds."
    ]
  },
  {
    category: "domain",
    title: "Website Domain Name Numerology",
    focusArea: "Main domain text before extension (.com, .in, etc.)",
    calculationMethod: "Sum letter values of the domain name proper. Extensions like .com or .org are omitted from primary calculation.",
    bestPractices: [
      "Align domain Expression with the business or personal brand's core offering.",
      "Match domain vibration with founder Expression for authentic resonance.",
      "Choose domain names with auspicious Chaldean compounds (15, 21, 23, 27, 32, 33)."
    ]
  },
  {
    category: "handle",
    title: "Social Media Handle Numerology",
    focusArea: "Username handles on LinkedIn, Instagram, X, YouTube",
    calculationMethod: "Letters only from the handle. Maintain consistent handle spelling across platforms for compounding digital resonance.",
    bestPractices: [
      "Ensure handle vibration matches the specific platform purpose (e.g., Expression 8/4 for LinkedIn, 3/5 for Instagram/YouTube).",
      "Keep handles clean and aligned with personal or business brand Expression.",
      "Avoid handles that produce Karmic Debt compound totals."
    ]
  },
  {
    category: "phone",
    title: "Mobile & WhatsApp Number Numerology",
    focusArea: "All digits of the mobile phone number",
    calculationMethod: "Sum all 10 digits of the mobile number and reduce to a single digit or Master Number (11, 22, 33).",
    bestPractices: [
      "Mobile numbers reducing to 8 or 1 serve commercial negotiations and sales executive roles.",
      "Mobile numbers reducing to 2, 6, or 9 serve counsellors, healthcare providers, and customer support.",
      "Mobile numbers reducing to 3 or 5 serve media professionals, artists, and event managers."
    ]
  }
];

/**
 * CALCULATION ENGINE FUNCTIONS FOR APPLIED NAMES
 */

const PYTHAGOREAN_LETTER_MAP: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

const CHALDEAN_LETTER_MAP: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2,
  S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7
};

function reduceNumber(num: number, preserveMasters = true): { reduced: number; compound: number } {
  const compound = num;
  let curr = num;
  if (preserveMasters && (curr === 11 || curr === 22 || curr === 33)) {
    return { reduced: curr, compound };
  }
  while (curr > 9) {
    curr = String(curr).split("").reduce((acc, d) => acc + Number(d), 0);
    if (preserveMasters && (curr === 11 || curr === 22 || curr === 33)) {
      break;
    }
  }
  return { reduced: curr, compound };
}

export function calculateNameScore(text: string) {
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, "");
  let pythSum = 0;
  let chalSum = 0;

  for (const char of cleanText) {
    if (PYTHAGOREAN_LETTER_MAP[char]) pythSum += PYTHAGOREAN_LETTER_MAP[char];
    if (CHALDEAN_LETTER_MAP[char]) chalSum += CHALDEAN_LETTER_MAP[char];
  }

  const pythRes = reduceNumber(pythSum);
  const chalRes = reduceNumber(chalSum);

  const cornerstone = cleanText.charAt(0) || "";
  const capstone = cleanText.charAt(cleanText.length - 1) || "";

  return {
    cleanText,
    pythagoreanSum: pythSum,
    pythagoreanExpression: pythRes.reduced,
    chaldeanSum: chalSum,
    chaldeanCompound: chalSum,
    chaldeanExpression: chalRes.reduced,
    cornerstone,
    capstone
  };
}

export interface BusinessAnalysisResult {
  businessName: string;
  pythagoreanExpression: number;
  chaldeanCompound: number;
  chaldeanExpression: number;
  cornerstone: string;
  capstone: string;
  guideline: DomainGuideline;
  cautionInfo?: { compound: number; name: string; description: string };
  founderAlignmentScore: string;
}

export function analyzeBusinessName(businessName: string, founderLifePath?: number): BusinessAnalysisResult {
  const score = calculateNameScore(businessName);
  const guideline = BUSINESS_NAME_DATABASE[score.chaldeanExpression] || BUSINESS_NAME_DATABASE[1];
  
  const caution = CAUTIONARY_BUSINESS_COMPOUNDS.find(c => c.compound === score.chaldeanCompound);

  let alignmentScore = "Neutral Alignment";
  if (founderLifePath) {
    const rootLP = founderLifePath === 11 ? 2 : founderLifePath === 22 ? 4 : founderLifePath === 33 ? 6 : founderLifePath;
    const rootExpr = score.chaldeanExpression === 11 ? 2 : score.chaldeanExpression === 22 ? 4 : score.chaldeanExpression === 33 ? 6 : score.chaldeanExpression;
    
    if (rootLP === rootExpr) {
      alignmentScore = "Strong Harmonic Alignment (Matches Life Path)";
    } else if (Math.abs(rootLP - rootExpr) <= 2) {
      alignmentScore = "Compatible Vibrational Resonance";
    } else {
      alignmentScore = "Divergent Vibrational Focus";
    }
  }

  return {
    businessName,
    pythagoreanExpression: score.pythagoreanExpression,
    chaldeanCompound: score.chaldeanCompound,
    chaldeanExpression: score.chaldeanExpression,
    cornerstone: score.cornerstone,
    capstone: score.capstone,
    guideline,
    cautionInfo: caution,
    founderAlignmentScore: alignmentScore
  };
}

export interface BabyAnalysisResult {
  firstName: string;
  surname: string;
  fullName: string;
  firstExpression: number;
  fullPythagoreanExpression: number;
  fullChaldeanCompound: number;
  fullChaldeanExpression: number;
  cornerstone: string;
  lifePathMatch?: string;
}

export function analyzeBabyName(firstName: string, surname: string, lifePathNum?: number): BabyAnalysisResult {
  const fullName = `${firstName} ${surname}`.trim();
  const firstScore = calculateNameScore(firstName);
  const fullScore = calculateNameScore(fullName);

  let matchText = "Calculated from birth date";
  if (lifePathNum) {
    const rootLP = lifePathNum === 11 ? 2 : lifePathNum === 22 ? 4 : lifePathNum === 33 ? 6 : lifePathNum;
    const rootExpr = fullScore.chaldeanExpression === 11 ? 2 : fullScore.chaldeanExpression === 22 ? 4 : fullScore.chaldeanExpression === 33 ? 6 : fullScore.chaldeanExpression;

    if (rootLP === rootExpr) {
      matchText = "Optimal Life Path & Name Expression Synergy";
    } else if (Math.abs(rootLP - rootExpr) === 1) {
      matchText = "Harmonious Complementary Vibrations";
    } else {
      matchText = "Moderate Adaptability Required";
    }
  }

  return {
    firstName,
    surname,
    fullName,
    firstExpression: firstScore.chaldeanExpression,
    fullPythagoreanExpression: fullScore.pythagoreanExpression,
    fullChaldeanCompound: fullScore.chaldeanCompound,
    fullChaldeanExpression: fullScore.chaldeanExpression,
    cornerstone: firstScore.cornerstone,
    lifePathMatch: matchText
  };
}

export interface MarriageAnalysisResult {
  firstName: string;
  birthSurname: string;
  newSurname: string;
  birthFullName: string;
  newFullName: string;
  birthPythExpression: number;
  birthChaldeanCompound: number;
  birthChaldeanExpression: number;
  newPythExpression: number;
  newChaldeanCompound: number;
  newChaldeanExpression: number;
  shiftSummary: string;
}

export function analyzeMarriageNameChange(firstName: string, birthSurname: string, newSurname: string): MarriageAnalysisResult {
  const birthFullName = `${firstName} ${birthSurname}`.trim();
  const newFullName = `${firstName} ${newSurname}`.trim();

  const birthScore = calculateNameScore(birthFullName);
  const newScore = calculateNameScore(newFullName);

  let shiftSummary = `Expression shifts from Chaldean ${birthScore.chaldeanExpression} (${birthScore.chaldeanCompound}) to ${newScore.chaldeanExpression} (${newScore.chaldeanCompound}). `;
  if (birthScore.chaldeanExpression === newScore.chaldeanExpression) {
    shiftSummary += "Maintains core Chaldean expression frequency.";
  } else {
    shiftSummary += `Pythagorean Expression moves from ${birthScore.pythagoreanExpression} to ${newScore.pythagoreanExpression}.`;
  }

  return {
    firstName,
    birthSurname,
    newSurname,
    birthFullName,
    newFullName,
    birthPythExpression: birthScore.pythagoreanExpression,
    birthChaldeanCompound: birthScore.chaldeanCompound,
    birthChaldeanExpression: birthScore.chaldeanExpression,
    newPythExpression: newScore.pythagoreanExpression,
    newChaldeanCompound: newScore.chaldeanCompound,
    newChaldeanExpression: newScore.chaldeanExpression,
    shiftSummary
  };
}

export interface DigitalAnalysisResult {
  input: string;
  category: "email" | "domain" | "handle" | "phone";
  cleanedTextOrDigits: string;
  pythagoreanExpression: number;
  chaldeanCompound: number;
  chaldeanExpression: number;
  digitalResonance: string;
}

export function analyzeDigitalIdentity(input: string, category: "email" | "domain" | "handle" | "phone"): DigitalAnalysisResult {
  if (category === "phone") {
    const digitsOnly = input.replace(/\D/g, "");
    const sum = digitsOnly.split("").reduce((acc, d) => acc + Number(d), 0);
    const reduced = reduceNumber(sum);
    return {
      input,
      category,
      cleanedTextOrDigits: digitsOnly,
      pythagoreanExpression: reduced.reduced,
      chaldeanCompound: sum,
      chaldeanExpression: reduced.reduced,
      digitalResonance: `Mobile number digit sum ${sum} reduces to Expression ${reduced.reduced}.`
    };
  }

  // Email, domain, or handle
  let processed = input.trim();
  if (category === "email" && processed.includes("@")) {
    processed = processed.split("@")[0];
  }
  if (category === "domain") {
    processed = processed.replace(/^https?:\/\//i, "").replace(/^www\./i, "").split(".")[0];
  }
  if (category === "handle" && processed.startsWith("@")) {
    processed = processed.substring(1);
  }

  const score = calculateNameScore(processed);
  const resonance = `${category.toUpperCase()} '${score.cleanText}' yields Chaldean Expression ${score.chaldeanExpression} (Compound ${score.chaldeanCompound}) & Pythagorean Expression ${score.pythagoreanExpression}.`;

  return {
    input,
    category,
    cleanedTextOrDigits: score.cleanText,
    pythagoreanExpression: score.pythagoreanExpression,
    chaldeanCompound: score.chaldeanCompound,
    chaldeanExpression: score.chaldeanExpression,
    digitalResonance: resonance
  };
}
