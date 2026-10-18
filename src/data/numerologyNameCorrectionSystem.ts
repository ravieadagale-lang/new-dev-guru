// src/data/numerologyNameCorrectionSystem.ts
// Chapter Seventeen: The Complete Name Correction System
// Comprehensive standalone data & calculation engine for Name Corrections, Indicators, Methods, Case Studies & Implementation Protocols.

export interface CorrectionIndicator {
  id: number;
  title: string;
  shortName: string;
  description: string;
  diagnosticCriteria: string;
}

export interface Contraindication {
  id: number;
  title: string;
  reason: string;
  recommendation: string;
}

export interface CorrectionMethod {
  id: number;
  title: string;
  impactLevel: "Minimal" | "Moderate" | "High" | "Maximum";
  description: string;
  bestSuitedFor: string;
  practicalExamples: string[];
}

export interface CaseStudyData {
  id: string;
  clientName: string;
  dob: string;
  presentingProblem: string;
  birthDateAnalysis: {
    lifePath: number;
    dayNumber: number;
  };
  originalNameAnalysis: {
    fullName: string;
    chaldeanExpression: number;
    chaldeanCompound: number;
    pythagoreanExpression: number;
    soulUrge: number;
    personality: number;
    karmicLessons: number[];
    alerts: string[];
  };
  indicatorDiagnosis: string[];
  correctedNameAnalysis: {
    correctedFullName: string;
    methodUsed: string;
    chaldeanExpression: number;
    chaldeanCompound: number;
    pythagoreanExpression: number;
    personality: number;
    keyBenefits: string[];
  };
}

export interface ChapterSeventeenTheoryData {
  title: string;
  subtitle: string;
  quote: {
    text: string;
    author: string;
  };
  introParagraphs: string[];
  diagnosticStandardSummary: string;
  implementationSteps: {
    phase: string;
    title: string;
    action: string;
  }[];
}

export const CHAPTER_SEVENTEEN_THEORY_DATA: ChapterSeventeenTheoryData = {
  title: "The Complete Name Correction System",
  subtitle: "Systematic Vibrational Rectification — Indicators, Contraindications, Correction Methods, and Implementation Protocols",
  quote: {
    text: "Every moment is a fresh beginning.",
    author: "T.S. Eliot"
  },
  introParagraphs: [
    "Name correction is the deliberate modification of a name's spelling, length, or composition to shift its vibrational frequency in a direction that better serves the person's life goals and harmonizes with their birth-based numbers.",
    "When correctly identified as necessary and implemented consistently across all contexts, entrainment gradually transforms real, observable life experience.",
    "A rigorous diagnostic standard ensures corrections are only recommended when genuine, multi-dimensional, client-confirmed misalignments exist."
  ],
  diagnosticStandardSummary: "Name correction is indicated when multiple indicators of vibrational misalignment are simultaneously present AND when the client's reported life experience confirms specific, recurring patterns of difficulty.",
  implementationSteps: [
    {
      phase: "Day One",
      title: "The 108 Establishment Ritual",
      action: "Write the corrected name 108 times with full conscious attention and vocal repetition to initiate the primary entrainment event."
    },
    {
      phase: "Week One",
      title: "Digital & Written Overhaul",
      action: "Update email signatures, social media handles, business cards, messaging profiles, and phone contact cards immediately."
    },
    {
      phase: "Months 1 - 3",
      title: "Consistent Reinforcement & Internal Monologue",
      action: "Calmly correct misspellings in correspondence, and use the new spelling in internal thoughts and self-introductions."
    },
    {
      phase: "Months 3 - 9",
      title: "Observing Vibrational Shift",
      action: "Track subtle shifts in ease of completion, relationship dynamics, or professional opportunities as entrainment deepens."
    }
  ]
};

export const FIVE_CORRECTION_INDICATORS: CorrectionIndicator[] = [
  {
    id: 1,
    title: "Indicator One: Expression vs. Life Path Conflict",
    shortName: "Expression-LP Conflict",
    description: "Direct opposition between the name's Expression Number and the soul's chosen Life Path Number.",
    diagnosticCriteria: "When Expression and Life Path carry conflicting orientations (e.g. Expr 1 vs LP 2, Expr 8 vs LP 9, Expr 4 vs LP 5), causing the person to swim against their own deepest current."
  },
  {
    id: 2,
    title: "Indicator Two: Chaldean Karmic Debt Compound",
    shortName: "Karmic Debt Compound",
    description: "Presence of Chaldean compound 13, 14, 16, or 19 in the full birth name Expression calculation.",
    diagnosticCriteria: "Compounds 13 (completion obstacles), 14 (impulsive loss/volatility), 16 (sudden collapse), or 19 (isolation/lack of support) imposing unnecessary karmic weight on the name field."
  },
  {
    id: 3,
    title: "Indicator Three: Severe Letter Value Dominance",
    shortName: "Letter Value Dominance",
    description: "Five or more letters carrying the same Pythagorean numerical value in the full birth name.",
    diagnosticCriteria: "Excessive letter concentration (e.g. 7+ letters valued 1) smothering other vibrational qualities and making life balance difficult to maintain."
  },
  {
    id: 4,
    title: "Indicator Four: Severe Soul Urge to Expression/Personality Split",
    shortName: "Soul Urge Split",
    description: "Direct conflict between inner desire (Soul Urge) and outer presentation (Personality or Expression).",
    diagnosticCriteria: "When Soul Urge and Personality differ by large bridge gaps (e.g. Soul Urge 2 seeking intimacy vs. Personality 9 projecting solitary sage authority)."
  },
  {
    id: 5,
    title: "Indicator Five: Client-Confirmed Recurring Patterns",
    shortName: "Confirmed Life Pattern",
    description: "The client confirms that predicted obstacles occur repeatedly across different career phases and relationships.",
    diagnosticCriteria: "Subjective experience confirms objective numerological alerts—such as recurring late-stage project failures or persistent relational isolation."
  }
];

export const CONTRAINDICATIONS: Contraindication[] = [
  {
    id: 1,
    title: "1. The Well-Aligned Name",
    reason: "The current name already harmonizes with the Life Path, contains no Karmic Debt compounds, and exhibits good letter balance.",
    recommendation: "NEVER correct a well-functioning name. Unnecessary changes disrupt positive established entrainment."
  },
  {
    id: 2,
    title: "2. Long-Established Professional Identity",
    reason: "The name has been used in a significant career or public reputation for 25-30+ years.",
    recommendation: "Avoid major structural name changes. Use lifestyle remedies, gemstone therapy, or mantra practice instead."
  },
  {
    id: 3,
    title: "3. Ambivalence & Partial Implementation",
    reason: "The client hesitates, faces family opposition, or intends to use the new name only in select contexts.",
    recommendation: "Postpone correction until the client has full, internally-sourced commitment to 100% consistent usage."
  }
];

export const FOUR_CORRECTION_METHODS: CorrectionMethod[] = [
  {
    id: 1,
    title: "Method 1: Single Letter Addition or Removal",
    impactLevel: "Minimal",
    description: "Adding or removing a single letter (e.g. adding A or I at the end) to shift the Chaldean compound without altering spoken pronunciation.",
    bestSuitedFor: "Minor compound adjustments where written form changes while spoken identity remains unchanged.",
    practicalExamples: ["Neeraj → Neerraj", "Priya → Priiya", "Vijay → Vijayy"]
  },
  {
    id: 2,
    title: "Method 2: Phonetic Spelling Variation",
    impactLevel: "Moderate",
    description: "Adopting an alternate accepted regional spelling or vowel arrangement that preserves spoken pronunciation.",
    bestSuitedFor: "Adjusting Expression numbers while maintaining complete naturalness in social spoken contexts.",
    practicalExamples: ["Kavitha → Kavita", "Rahul → Raahul", "Deepa → Dipa"]
  },
  {
    id: 3,
    title: "Method 3: Professional or Brand Name Adoption",
    impactLevel: "High",
    description: "Adopting a distinct professional name for career, publishing, or business while retaining birth name for family.",
    bestSuitedFor: "Career transitions or when birth name carries deep family value that cannot be legally changed.",
    practicalExamples: ["Adopting a professional pen name or commercial trade identity."]
  },
  {
    id: 4,
    title: "Method 4: Complete First Name Change",
    impactLevel: "Maximum",
    description: "Replaces the entire vibrational entrainment pattern of the first name.",
    bestSuitedFor: "Severe, multi-indicator misalignments where subtle letter edits cannot reach the target harmonic number.",
    practicalExamples: ["Complete formal legal and social name replacement."]
  }
];

export const CASE_STUDIES: CaseStudyData[] = [
  {
    id: "neeraj",
    clientName: "NEERAJ BHATTACHARYA",
    dob: "1978-09-08",
    presentingProblem: "Career stagnation at a specific glass ceiling and persistent financial leakage despite capability and hard work.",
    birthDateAnalysis: {
      lifePath: 6,
      dayNumber: 8
    },
    originalNameAnalysis: {
      fullName: "NEERAJ BHATTACHARYA",
      chaldeanExpression: 4,
      chaldeanCompound: 49, // 49 -> 13 -> 4 (Karmic Debt 13)
      pythagoreanExpression: 8,
      soulUrge: 6,
      personality: 7,
      karmicLessons: [4, 6],
      alerts: ["ALERT: Chaldean Compound 49 reduces via 13 (Karmic Debt 13 — Completion Obstacles)."]
    },
    indicatorDiagnosis: [
      "Indicator Two: Chaldean Compound 13 Karmic Debt (obstacles at completion)",
      "Indicator Five: Client confirms systematic late-stage project failures despite high competence"
    ],
    correctedNameAnalysis: {
      correctedFullName: "NEERRAJ BHATTACHARYA",
      methodUsed: "Method 1: Single Letter Addition (Double 'R')",
      chaldeanExpression: 6,
      chaldeanCompound: 51, // 51 -> 6 (No Karmic Debt)
      pythagoreanExpression: 8,
      personality: 9,
      keyBenefits: [
        "Eliminates Karmic Debt Compound 13 entirely.",
        "Shifts Chaldean Expression from 4 to 6 (Direct harmonic match with Life Path 6).",
        "Zero phonetic impact—spoken pronunciation remains identical."
      ]
    }
  },
  {
    id: "seema",
    clientName: "SEEMA RAGHUNATHAN",
    dob: "1985-04-22",
    presentingProblem: "Persistent relational isolation—consistently approached as a wise advisor rather than chosen as an equal partner.",
    birthDateAnalysis: {
      lifePath: 4,
      dayNumber: 22
    },
    originalNameAnalysis: {
      fullName: "SEEMA RAGHUNATHAN",
      chaldeanExpression: 11,
      chaldeanCompound: 56,
      pythagoreanExpression: 3,
      soulUrge: 2,
      personality: 9,
      karmicLessons: [6],
      alerts: ["ALERT: Soul Urge 2 (seeks intimate partnership) vs Personality 9 (projects detached sage authority) creating a massive gap of 7."]
    },
    indicatorDiagnosis: [
      "Indicator Four: Huge gap between Soul Urge 2 and Personality 9 (Bridge 7)",
      "Indicator Five: Client confirms people seek her for counsel but fail to relate as equal partners"
    ],
    correctedNameAnalysis: {
      correctedFullName: "SEEMA RAGHUNATAN",
      methodUsed: "Method 2: Single Letter Removal ('H' removed from surname)",
      chaldeanExpression: 6,
      chaldeanCompound: 51,
      pythagoreanExpression: 4,
      personality: 4,
      keyBenefits: [
        "Shifts Personality from 9 to 4, reducing the Soul Urge bridge gap from 7 down to 2.",
        "Aligns Pythagorean Expression 4 directly with Life Path 4.",
        "Outer presentation projects practical, accessible partnership rather than distant sage authority."
      ]
    }
  }
];

/**
 * CALCULATION ENGINE FOR DIAGNOSING CURRENT NAME & TESTING CANDIDATES
 */

const CHALDEAN_MAP: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2,
  S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7
};

const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

function reduceVal(n: number): { root: number; isMaster: boolean; intermediate: number } {
  let curr = n;
  const intermediate = n;
  if (curr === 11 || curr === 22 || curr === 33) {
    return { root: curr, isMaster: true, intermediate };
  }
  while (curr > 9) {
    const sum = String(curr).split("").reduce((a, b) => a + Number(b), 0);
    if (sum === 11 || sum === 22 || sum === 33) {
      return { root: sum, isMaster: true, intermediate: curr };
    }
    curr = sum;
  }
  return { root: curr, isMaster: false, intermediate };
}

export interface DiagnosticResult {
  fullName: string;
  dob: string;
  lifePath: number;
  chaldeanSum: number;
  chaldeanRoot: number;
  chaldeanIntermediate: number;
  pythagoreanSum: number;
  pythagoreanRoot: number;
  soulUrgeRoot: number;
  personalityRoot: number;
  karmicDebtFound?: number;
  triggeredIndicators: string[];
  recommendation: "Correction Strongly Indicated" | "Correction Optional / Secondary" | "Name is Well-Aligned (No Correction Needed)";
}

export function diagnoseNameCorrectionNeeds(fullName: string, dob: string): DiagnosticResult {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, "");
  
  // Calculate Life Path from dob (YYYY-MM-DD)
  const [y, m, d] = dob.split("-").map(Number);
  const sumLP = (d || 15) + (m || 8) + (y || 1980);
  let lp = sumLP;
  while (lp > 9 && lp !== 11 && lp !== 22 && lp !== 33) {
    lp = String(lp).split("").reduce((a, b) => a + Number(b), 0);
  }

  // Chaldean
  let chaldeanSum = 0;
  let pythSum = 0;
  for (const char of cleanName) {
    if (CHALDEAN_MAP[char]) chaldeanSum += CHALDEAN_MAP[char];
    if (PYTHAGOREAN_MAP[char]) pythSum += PYTHAGOREAN_MAP[char];
  }

  const chalRes = reduceVal(chaldeanSum);
  const pythRes = reduceVal(pythSum);

  // Vowels / Consonants for Soul Urge & Personality
  const VOWELS = new Set(["A", "E", "I", "O", "U"]);
  let soulSum = 0;
  let persSum = 0;
  for (const char of cleanName) {
    if (VOWELS.has(char)) {
      if (CHALDEAN_MAP[char]) soulSum += CHALDEAN_MAP[char];
    } else {
      if (CHALDEAN_MAP[char]) persSum += CHALDEAN_MAP[char];
    }
  }

  const soulRes = reduceVal(soulSum);
  const persRes = reduceVal(persSum);

  const triggered: string[] = [];

  // Check 1: Expression vs LP
  const rootLP = lp === 11 ? 2 : lp === 22 ? 4 : lp === 33 ? 6 : lp;
  const rootExpr = chalRes.root === 11 ? 2 : chalRes.root === 22 ? 4 : chalRes.root === 33 ? 6 : chalRes.root;
  
  if (Math.abs(rootLP - rootExpr) >= 3) {
    triggered.push("Indicator 1: Direct Expression vs Life Path Conflict (Root Gap ≥ 3)");
  }

  // Check 2: Karmic Debt Compounds (13, 14, 16, 19)
  let debtFound: number | undefined;
  const checkCompound = chaldeanSum;
  if ([13, 14, 16, 19].includes(checkCompound) || [13, 14, 16, 19].includes(chalRes.intermediate)) {
    debtFound = [13, 14, 16, 19].find(c => c === checkCompound || c === chalRes.intermediate);
    triggered.push(`Indicator 2: Chaldean Karmic Debt Compound ${debtFound}`);
  }

  // Check 3: Letter dominance (5+ identical letter values)
  const pythCounts: Record<number, number> = {};
  for (const char of cleanName) {
    const v = PYTHAGOREAN_MAP[char];
    if (v) {
      pythCounts[v] = (pythCounts[v] || 0) + 1;
    }
  }
  const dominantVal = Object.entries(pythCounts).find(([, count]) => count >= 5);
  if (dominantVal) {
    triggered.push(`Indicator 3: Severe Letter Value Dominance (${dominantVal[1]} letters valued ${dominantVal[0]})`);
  }

  // Check 4: Soul Urge vs Personality Bridge
  const soulRoot = soulRes.root === 11 ? 2 : soulRes.root;
  const persRoot = persRes.root === 11 ? 2 : persRes.root;
  if (Math.abs(soulRoot - persRoot) >= 5) {
    triggered.push(`Indicator 4: Large Soul Urge to Personality Bridge Gap (${Math.abs(soulRoot - persRoot)})`);
  }

  let rec: "Correction Strongly Indicated" | "Correction Optional / Secondary" | "Name is Well-Aligned (No Correction Needed)" = "Name is Well-Aligned (No Correction Needed)";
  if (triggered.length >= 2) {
    rec = "Correction Strongly Indicated";
  } else if (triggered.length === 1) {
    rec = "Correction Optional / Secondary";
  }

  return {
    fullName,
    dob,
    lifePath: lp,
    chaldeanSum,
    chaldeanRoot: chalRes.root,
    chaldeanIntermediate: chalRes.intermediate,
    pythagoreanSum: pythSum,
    pythagoreanRoot: pythRes.root,
    soulUrgeRoot: soulRes.root,
    personalityRoot: persRes.root,
    karmicDebtFound: debtFound,
    triggeredIndicators: triggered,
    recommendation: rec
  };
}
