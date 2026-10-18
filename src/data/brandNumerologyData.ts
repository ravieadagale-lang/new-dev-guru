// src/data/brandNumerologyData.ts
// Comprehensive Chaldean and Pythagorean Brand Numerology Library

import {
  BRAND_AND_PRODUCT_NUMBERS,
  CHALDEAN_COMMERCIAL_COMPOUNDS,
  BrandProductReading
} from "./businessNumerologyData";

export const CHAPTER_THIRTY_ONE_THEORY = {
  chapterNumber: "Chapter 31",
  title: "Brand Numerology & Applied Commercial Chaldean System",
  quote: {
    text: "A business name is not a passive label; it is an active acoustic transmitter vibrating continuously in the marketplace.",
    author: "Applied Commercial Chaldean Traditions"
  }
};

export const BRAND_PRIMARY_READINGS = BRAND_AND_PRODUCT_NUMBERS;
export const CHALDEAN_BRAND_COMPOUNDS = CHALDEAN_COMMERCIAL_COMPOUNDS;

export interface BrandFounderCompatibilityRule {
  bestBrandNums: number[];
  avoidBrandNums: number[];
  explanation: string;
}

export const BRAND_FOUNDER_COMPATIBILITY: Record<number, BrandFounderCompatibilityRule> = {
  1: {
    bestBrandNums: [1, 3, 5, 9],
    avoidBrandNums: [6, 8],
    explanation: "Life Path 1 founders thrive with brands that project pioneering originality (1), creative magnetism (3), commercial expansion (5), and humanitarian authority (9). Avoid 8 to prevent ruthless friction."
  },
  2: {
    bestBrandNums: [2, 6, 7],
    avoidBrandNums: [1, 9],
    explanation: "Life Path 2 founders flourish in collaborative service (2), nurturing aesthetics (6), and deep analytical trust (7). Avoid 1 or 9 aggressive brand frequencies."
  },
  3: {
    bestBrandNums: [1, 3, 5],
    avoidBrandNums: [4, 7],
    explanation: "Life Path 3 founders excel with expressive, communicative, and visionary brand energies (1, 3, 5). Rigorous 4 and solitary 7 dampen creative spontaneity."
  },
  4: {
    bestBrandNums: [1, 4, 8],
    avoidBrandNums: [3, 5],
    explanation: "Life Path 4 founders resonate with systemic stability, engineering precision, and operational strength (1, 4, 8). Chaotic 3 or 5 frequencies create disorder."
  },
  5: {
    bestBrandNums: [1, 5, 6],
    avoidBrandNums: [2, 4],
    explanation: "Life Path 5 founders command fast-scaling ventures, digital commerce, and agile marketing (1, 5, 6). Avoid 4 to prevent bureaucratic inertia."
  },
  6: {
    bestBrandNums: [2, 3, 6, 9],
    avoidBrandNums: [1, 7],
    explanation: "Life Path 6 founders succeed in hospitality, wellness, luxury, counseling, and community-centric brands (2, 3, 6, 9)."
  },
  7: {
    bestBrandNums: [2, 7],
    avoidBrandNums: [1, 3, 5],
    explanation: "Life Path 7 founders harmonize with specialized consulting, clinical research, spiritual wisdom, and elite niche branding (2, 7)."
  },
  8: {
    bestBrandNums: [1, 4, 8],
    avoidBrandNums: [2, 6],
    explanation: "Life Path 8 founders excel in large-scale corporate, financial, infrastructure, and industrial empires (1, 4, 8)."
  },
  9: {
    bestBrandNums: [1, 3, 6, 9],
    avoidBrandNums: [2, 8],
    explanation: "Life Path 9 founders align with global causes, public outreach, educational transformation, and philanthropy (1, 3, 6, 9)."
  }
};

export const LOGO_NUMEROLOGY_GUIDE = {
  colors: [
    { name: "Gold / Deep Amber", number: 1, planet: "Sun", effect: "Radiates executive sovereignty, premium luxury, and benchmark authority." },
    { name: "Silver / Moon White", number: 2, planet: "Moon", effect: "Fosters psychological safety, relational empathy, and deep client comfort." },
    { name: "Bright Yellow / Saffron", number: 3, planet: "Jupiter", effect: "Stimulates intellectual optimism, educational leadership, and viral engagement." },
    { name: "Forest Green / Earth Brown", number: 4, planet: "Rahu / Earth", effect: "Grounds corporate stability, systematic trust, and lasting infrastructure." },
    { name: "Electric Cyan / Silver Grey", number: 5, planet: "Mercury", effect: "Accelerates commercial transaction velocity, omnichannel media, and agility." },
    { name: "Rose Gold / Royal Navy", number: 6, planet: "Venus", effect: "Induces aesthetic elegance, premium service hospitality, and sensual charm." },
    { name: "Mystic Violet / Deep Indigo", number: 7, planet: "Ketu", effect: "Signals analytical mastery, esoteric intuition, and exclusive craftsmanship." },
    { name: "Charcoal / Midnight Black", number: 8, planet: "Saturn", effect: "Projects sovereign scale, resilience through cycles, and heavy commercial weight." },
    { name: "Ruby Crimson / Warm Coral", number: 9, planet: "Mars", effect: "Ignites public passion, transformative activism, and dynamic high-energy reach." }
  ],
  shapes: [
    { shape: "Equilateral Triangle / Pyramidal Apex", numbers: "1, 3, 9", effect: "Directs visual attention upward; establishes hierarchy, ambition, and market conquest." },
    { shape: "Stable Square & Solid Cube", numbers: "4, 8", effect: "Communicates immutable structural safety, financial reliability, and operational permanence." },
    { shape: "Harmonious Circle & Soft Ellipse", numbers: "2, 6", effect: "Symbolizes infinite community, unity, inclusive warmth, and protective care." },
    { shape: "Dynamic Hexagon & Spirals", numbers: "5, 7", effect: "Encapsulates scientific precision, network expansion, and multi-dimensional evolution." }
  ]
};

export const SEVEN_STEP_BRAND_ASSESSMENT_PROTOCOL: string[] = [
  "Step 1: Calculate the Chaldean letter acoustic sum and identify the Primary Single-Digit Root Frequency.",
  "Step 2: Inspect the 2-digit Compound Number for hidden auspiciousness or cautionary Karmic Debt (13, 14, 16, 19).",
  "Step 3: Evaluate Pythagorean Destiny number and compare congruence between inner essence and outer market appeal.",
  "Step 4: Analyze Cornerstone (initial impression) and Capstone (lasting client retention memory) letters.",
  "Step 5: Audit Secondary Tagline frequency to verify whether it amplifies or dampens the primary brand.",
  "Step 6: Cross-examine Founder Life Path compatibility to prevent internal friction and burnout.",
  "Step 7: Prescribe precise remedial spelling adjustments, qualifiers, or logo chromatic corrections if needed."
];

export interface BrandParsedData {
  rawBrandName: string;
  cleanBrandName: string;
  taglineStr?: string;
  taglineChaldeanSum?: number;
  taglinePrimary?: number;
  chaldeanLetterValues: Array<{ letter: string; value: number }>;
  chaldeanSum: number;
  chaldeanPrimary: number;
  chaldeanCompound: number;
  isAuspiciousCompound: boolean;
  isCautionaryCompound: boolean;
  compoundInfo?: { name: string; quality: string; commercialImpact: string; category: "auspicious" | "cautionary" | "neutral" };
  pythagoreanSum: number;
  pythagoreanPrimary: number;
  cornerstoneLetter: string;
  cornerstoneValue: number;
  capstoneLetter: string;
  capstoneValue: number;
  reading: BrandProductReading;
  founderCompatibility?: {
    lifePath: number;
    isBest: boolean;
    isAvoid: boolean;
    explanation: string;
  };
}

export function parseAndEvaluateBrandName(
  rawBrandName: string,
  taglineInput?: string,
  founderDobInput?: string
): BrandParsedData | null {
  if (!rawBrandName || rawBrandName.trim().length === 0) return null;

  const cleanBrandName = rawBrandName.trim().toUpperCase();
  const lettersOnly = cleanBrandName.replace(/[^A-Z]/g, "");
  if (lettersOnly.length === 0) return null;

  const chaldeanValues: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1, J: 1, K: 2, L: 3, M: 4,
    N: 5, O: 7, P: 8, Q: 1, R: 2, S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7
  };

  const pythagoreanValues: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  };

  const chaldeanLetterValues: Array<{ letter: string; value: number }> = [];
  let chaldeanSum = 0;
  let pythagoreanSum = 0;

  lettersOnly.split("").forEach((char) => {
    const cVal = chaldeanValues[char] || 0;
    const pVal = pythagoreanValues[char] || 0;
    chaldeanSum += cVal;
    pythagoreanSum += pVal;
    chaldeanLetterValues.push({ letter: char, value: cVal });
  });

  const chaldeanCompound = chaldeanSum;
  let chaldeanPrimary = chaldeanCompound;
  while (chaldeanPrimary > 9 && chaldeanPrimary !== 11 && chaldeanPrimary !== 22 && chaldeanPrimary !== 33) {
    chaldeanPrimary = String(chaldeanPrimary).split("").map(Number).reduce((a, b) => a + b, 0);
  }
  let rootDigit = chaldeanPrimary;
  while (rootDigit > 9) {
    rootDigit = String(rootDigit).split("").map(Number).reduce((a, b) => a + b, 0);
  }

  let pythagoreanPrimary = pythagoreanSum;
  while (pythagoreanPrimary > 9 && pythagoreanPrimary !== 11 && pythagoreanPrimary !== 22 && pythagoreanPrimary !== 33) {
    pythagoreanPrimary = String(pythagoreanPrimary).split("").map(Number).reduce((a, b) => a + b, 0);
  }
  let pythRoot = pythagoreanPrimary;
  while (pythRoot > 9) {
    pythRoot = String(pythRoot).split("").map(Number).reduce((a, b) => a + b, 0);
  }

  const cornerstoneLetter = lettersOnly.charAt(0);
  const cornerstoneValue = chaldeanValues[cornerstoneLetter] || 1;
  const capstoneLetter = lettersOnly.charAt(lettersOnly.length - 1);
  const capstoneValue = chaldeanValues[capstoneLetter] || 1;

  const compoundInfo = CHALDEAN_COMMERCIAL_COMPOUNDS[chaldeanCompound];
  const isAuspiciousCompound = compoundInfo?.category === "auspicious";
  const isCautionaryCompound = compoundInfo?.category === "cautionary";

  let taglineChaldeanSum: number | undefined = undefined;
  let taglinePrimary: number | undefined = undefined;
  if (taglineInput && taglineInput.trim().length > 0) {
    const tagClean = taglineInput.trim().toUpperCase().replace(/[^A-Z]/g, "");
    if (tagClean.length > 0) {
      let tSum = 0;
      tagClean.split("").forEach((ch) => {
        tSum += chaldeanValues[ch] || 0;
      });
      taglineChaldeanSum = tSum;
      let tPrim = tSum;
      while (tPrim > 9) {
        tPrim = String(tPrim).split("").map(Number).reduce((a, b) => a + b, 0);
      }
      taglinePrimary = tPrim;
    }
  }

  let founderCompatibility: BrandParsedData["founderCompatibility"] = undefined;
  if (founderDobInput && founderDobInput.trim().length > 0) {
    const digits = founderDobInput.replace(/[^0-9]/g, "").split("").map(Number);
    if (digits.length > 0) {
      let sum = digits.reduce((a, b) => a + b, 0);
      while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
        sum = String(sum).split("").map(Number).reduce((a, b) => a + b, 0);
      }
      const founderLifePath = sum;
      let normalizedLp = founderLifePath;
      while (normalizedLp > 9) {
        normalizedLp = String(normalizedLp).split("").map(Number).reduce((a, b) => a + b, 0);
      }
      const rule = BRAND_FOUNDER_COMPATIBILITY[normalizedLp] || {
        bestBrandNums: [1, 3, 5, 6, 9],
        avoidBrandNums: [4, 8],
        explanation: `General compatibility evaluated for Founder Life Path ${founderLifePath}.`
      };
      const isBest = rule.bestBrandNums.includes(rootDigit);
      const isAvoid = rule.avoidBrandNums.includes(rootDigit);
      founderCompatibility = {
        lifePath: founderLifePath,
        isBest,
        isAvoid,
        explanation: rule.explanation
      };
    }
  }

  const reading = BRAND_AND_PRODUCT_NUMBERS[rootDigit] || BRAND_AND_PRODUCT_NUMBERS[1];

  return {
    rawBrandName,
    cleanBrandName,
    taglineStr: taglineInput,
    taglineChaldeanSum,
    taglinePrimary,
    chaldeanLetterValues,
    chaldeanSum,
    chaldeanPrimary: rootDigit,
    chaldeanCompound,
    isAuspiciousCompound,
    isCautionaryCompound,
    compoundInfo,
    pythagoreanSum,
    pythagoreanPrimary: pythRoot,
    cornerstoneLetter,
    cornerstoneValue,
    capstoneLetter,
    capstoneValue,
    reading,
    founderCompatibility
  };
}
