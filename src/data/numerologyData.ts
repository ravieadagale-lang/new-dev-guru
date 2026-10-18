import { calculateFiveYearPersonalYearForecast } from "./numerologyPersonalYear";
import { 
  NumerologyReport, 
  LoShuGridCell, 
  LoShuPlane, 
  NameCorrectionSuggestion, 
  MobileNumerologyResult, 
  VehicleNumerologyResult, 
  HouseNumerologyResult, 
  PartnerNumerologyResult,
  PersonalYearMonthForecast 
} from "../types";

// Official Chaldean letter-to-number mapping table
export const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

// Official Pythagorean letter-to-number mapping table (1-9)
export const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9
};

// Chaldean Compound Number Meanings (10 to 60)
export const CHALDEAN_COMPOUND_MEANINGS: Record<number, string> = {
  10: "The Wheel of Fortune - Honor, faith, self-reliance, and rise in life.",
  11: "A Lion Muzzled - Warning of hidden enemies, treacherous trials, and secret danger.",
  12: "The Sacrifice - Anxiety, suffering, and placing others before self.",
  13: "Transformation & Change - Power through disruption; rebirth and breakthrough.",
  14: "Movement & Combination - Financial gain through travel, trade, and media exposure.",
  15: "The Magician - Magnetism, eloquence, artistic gifts, and financial abundance.",
  16: "The Shattered Citadel - Sudden downfall if ego rules; spiritual awakening after obstacle.",
  17: "The Star of the Magi - Highly fortunate vibration, immortality of fame, and spiritual protection.",
  18: "Material Conflict - Tension between spirit and matter; care needed with financial associates.",
  19: "The Prince of Heaven - Supreme success, honor, prosperity, and cosmic blessing.",
  20: "The Awakening - Call to higher purpose, transformation, and delayed triumph.",
  21: "The Crown of the Magi - Total victory, advancement, honor, and long-term security.",
  22: "Master Architect - Visionary power, building global legacies, and vast influence.",
  23: "The Royal Star of the Lion - Extraordinary protection, support from elders, and success.",
  24: "The Lucky Star - Magnetic attraction of wealth, high-ranking friends, and prosperity.",
  25: "Discernment - Wisdom gained through observation, research, and technical mastery.",
  26: "Partnership & Warning - Material success paired with careful contract management.",
  27: "The Sceptre - Command, courage, executive authority, and creative leadership.",
  28: "The Trusting Lamb - High potential requiring prudent business partners and clarity.",
  29: "Uncertainty & Grace - Spiritual devotion; turning challenges into ultimate victory.",
  30: "The Loner Scholar - Mental superiority, deep research, and intellectual dominance.",
  31: "The Recluse - Deep thinker, independence, and focus on lasting craftsmanship.",
  32: "The Communicator - Mass influence, diplomatic skill, trade success, and popularity.",
  33: "Master Teacher - Universal love, healing energy, artistic brilliance, and protection.",
  34: "Artistic Wisdom - Similar to 25; technical precision, intuition, and financial stability.",
  35: "Creative Industry - Practical prosperity, commercial expansion, and firm roots.",
  36: "Genius & Force - Powerful intellect, pioneering energy, and authority in career.",
  37: "Fortunate Alliances - Highly auspicious number for business partnerships and love.",
  38: "Peace & Diplomacy - Gentle persuasion, literary success, and aesthetic beauty.",
  39: "The Humanitarian - Global influence, philanthropy, and artistic renown.",
  41: "The Royal Crown - Magnificent financial prosperity, magnetic attraction, and fame.",
  42: "The Harmonizer - Domestic happiness, lucrative ventures, and artistic success.",
  45: "The Victorious Strategist - Victory over adversaries, intellectual genius, and wealth.",
  51: "The Warrior King - Extraordinary drive, triumph in competitive fields, and prestige.",
  52: "Intuitive Mastery - High intuition, spiritual protection, and financial stability."
};

/**
 * Reduce a number to a single digit (1-9) or preserve Master Numbers (11, 22, 33)
 */
export function reduceToSingleDigit(num: number, allowMaster: boolean = false): number {
  if (allowMaster && (num === 11 || num === 22 || num === 33)) {
    return num;
  }
  while (num > 9) {
    num = String(num)
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return num;
}

/**
 * Calculate Chaldean Compound Sum for a given string
 */
export function calculateChaldeanSum(text: string): { compound: number; single: number } {
  const clean = text.toUpperCase().replace(/[^A-Z]/g, "");
  let compound = 0;
  for (const char of clean) {
    compound += CHALDEAN_MAP[char] || 0;
  }
  return { compound, single: reduceToSingleDigit(compound) };
}

/**
 * Calculate Pythagorean Expression Sum for a given string
 */
export function calculatePythagoreanSum(text: string): { compound: number; single: number } {
  const clean = text.toUpperCase().replace(/[^A-Z]/g, "");
  let compound = 0;
  for (const char of clean) {
    compound += PYTHAGOREAN_MAP[char] || 0;
  }
  return { compound, single: reduceToSingleDigit(compound, true) };
}

export interface PinnacleChallengeDetail {
  pinnacle1: { number: number; ageRange: string; theme: string };
  pinnacle2: { number: number; ageRange: string; theme: string };
  pinnacle3: { number: number; ageRange: string; theme: string };
  pinnacle4: { number: number; ageRange: string; theme: string };
  challenge1: { number: number; ageRange: string; lesson: string };
  challenge2: { number: number; ageRange: string; lesson: string };
  challenge3: { number: number; ageRange: string; lesson: string };
  challenge4: { number: number; ageRange: string; lesson: string };
}

/**
 * Calculates 4 Life Pinnacles and 4 Challenge Numbers with exact age ranges and descriptions
 */
export function calculatePinnaclesAndChallenges(dob: string): PinnacleChallengeDetail {
  const [yearStr, monthStr, dayStr] = (dob || "1995-08-15").split("-");
  const year = parseInt(yearStr, 10) || 1995;
  const month = parseInt(monthStr, 10) || 8;
  const day = parseInt(dayStr, 10) || 15;

  const mDig = reduceToSingleDigit(month);
  const dDig = reduceToSingleDigit(day);
  const yDig = reduceToSingleDigit(year);
  const lifePath = reduceToSingleDigit(mDig + dDig + yDig);

  const p1 = reduceToSingleDigit(mDig + dDig);
  const p2 = reduceToSingleDigit(dDig + yDig);
  const p3 = reduceToSingleDigit(p1 + p2);
  const p4 = reduceToSingleDigit(mDig + yDig);

  const c1 = Math.abs(mDig - dDig);
  const c2 = Math.abs(dDig - yDig);
  const c3 = Math.abs(c1 - c2);
  const c4 = Math.abs(mDig - yDig);

  const p1EndAge = 36 - lifePath;
  const p2EndAge = p1EndAge + 9;
  const p3EndAge = p2EndAge + 9;

  const PINNACLE_DESCRIPTIONS: Record<number, string> = {
    1: "Pioneering independence, courage, self-leadership, and founding personal projects.",
    2: "Diplomacy, intuitive partnerships, patience, emotional depth, and collaboration.",
    3: "Creative self-expression, communication brilliance, artistic expansion, and joy.",
    4: "Building enduring foundations, financial discipline, hard work, and structural stability.",
    5: "Dynamic change, freedom, travel, adaptability, versatile skills, and public influence.",
    6: "Domestic harmony, family responsibility, nurturing relationships, and community service.",
    7: "Spiritual introspection, deep research, technical mastery, wisdom, and solitude.",
    8: "Financial power, executive authority, material abundance, and business leadership.",
    9: "Humanitarian service, global reach, artistic harvest, emotional release, and completion."
  };

  const CHALLENGE_DESCRIPTIONS: Record<number, string> = {
    0: "The Challenge of Choice & Freedom — master overcoming indecision and claim your true purpose.",
    1: "Overcoming self-doubt and reliance on others — cultivate bold self-confidence and initiative.",
    2: "Overcoming hypersensitivity and people-pleasing — establish healthy boundaries and inner strength.",
    3: "Overcoming scattered focus and self-criticism — honor your authentic creative voice.",
    4: "Overcoming rigidity or impatience — build disciplined work habits and structural order.",
    5: "Overcoming restlessness or fear of commitment — balance personal freedom with responsibility.",
    6: "Overcoming perfectionism or family friction — cultivate unconditional love and acceptance.",
    7: "Overcoming isolation or cynicism — cultivate faith, spiritual trust, and open communication.",
    8: "Overcoming material obsession or fear of scarcity — align financial power with higher ethics."
  };

  return {
    pinnacle1: { number: p1, ageRange: `Age 0 - ${p1EndAge}`, theme: PINNACLE_DESCRIPTIONS[p1] || PINNACLE_DESCRIPTIONS[1] },
    pinnacle2: { number: p2, ageRange: `Age ${p1EndAge + 1} - ${p2EndAge}`, theme: PINNACLE_DESCRIPTIONS[p2] || PINNACLE_DESCRIPTIONS[2] },
    pinnacle3: { number: p3, ageRange: `Age ${p2EndAge + 1} - ${p3EndAge}`, theme: PINNACLE_DESCRIPTIONS[p3] || PINNACLE_DESCRIPTIONS[3] },
    pinnacle4: { number: p4, ageRange: `Age ${p3EndAge + 1}+`, theme: PINNACLE_DESCRIPTIONS[p4] || PINNACLE_DESCRIPTIONS[4] },

    challenge1: { number: c1, ageRange: `Age 0 - ${p1EndAge}`, lesson: CHALLENGE_DESCRIPTIONS[c1] || CHALLENGE_DESCRIPTIONS[1] },
    challenge2: { number: c2, ageRange: `Age ${p1EndAge + 1} - ${p2EndAge}`, lesson: CHALLENGE_DESCRIPTIONS[c2] || CHALLENGE_DESCRIPTIONS[2] },
    challenge3: { number: c3, ageRange: `Age ${p2EndAge + 1} - ${p3EndAge}`, lesson: CHALLENGE_DESCRIPTIONS[c3] || CHALLENGE_DESCRIPTIONS[3] },
    challenge4: { number: c4, ageRange: `Age ${p3EndAge + 1}+`, lesson: CHALLENGE_DESCRIPTIONS[c4] || CHALLENGE_DESCRIPTIONS[4] }
  };
}

/**
 * Calculates Personal Year, Personal Month & Personal Day Cycles for a given date
 */
export function calculatePersonalCycles(dob: string, targetDate: Date = new Date()) {
  const [yearStr, monthStr, dayStr] = (dob || "1995-08-15").split("-");
  const month = parseInt(monthStr, 10) || 8;
  const day = parseInt(dayStr, 10) || 15;

  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth() + 1;
  const targetDay = targetDate.getDate();

  const mDig = reduceToSingleDigit(month);
  const dDig = reduceToSingleDigit(day);
  const uYearDig = reduceToSingleDigit(targetYear);

  const personalYear = reduceToSingleDigit(mDig + dDig + uYearDig);
  const personalMonth = reduceToSingleDigit(personalYear + reduceToSingleDigit(targetMonth));
  const personalDay = reduceToSingleDigit(personalMonth + reduceToSingleDigit(targetDay));

  const YEAR_THEMES: Record<number, { title: string; desc: string }> = {
    1: { title: "Year of New Beginnings & Seed Planting", desc: "Prime time to launch businesses, start fresh projects, and take bold self-directed initiative." },
    2: { title: "Year of Partnerships, Patience & Synergy", desc: "Focus on relationships, team collaboration, diplomatic negotiation, and gentle progress." },
    3: { title: "Year of Creative Expression & Social Expansion", desc: "Harvest joy, networking, artistic creations, writing, speaking, and optimism." },
    4: { title: "Year of Hard Work, Discipline & Foundation", desc: "Build sturdy systems, invest in real estate/skills, manage health, and ground your vision." },
    5: { title: "Year of Dynamic Freedom, Travel & Transformation", desc: "Embrace unexpected changes, explore new horizons, upgrade marketing, and adapt fast." },
    6: { title: "Year of Family Responsibility, Healing & Harmony", desc: "Focus on domestic peace, marriage, home decor, community care, and emotional healing." },
    7: { title: "Year of Spiritual Reflection, Rest & Mastery", desc: "Introspective window; study occult/technical arts, meditate, and refine inner wisdom." },
    8: { title: "Year of Financial Harvest, Authority & Karma", desc: "Peak executive power year! Reaping financial rewards, corporate growth, and leadership." },
    9: { title: "Year of Completion, Release & Transformation", desc: "Clear old ties, let go of dead habits, forgive past grievances, and prepare for new cycle." }
  };

  return {
    targetDateStr: targetDate.toISOString().split("T")[0],
    personalYear,
    personalMonth,
    personalDay,
    yearTheme: YEAR_THEMES[personalYear] || YEAR_THEMES[1]
  };
}

/**
 * Generate Lo Shu Grid mapping and plane analysis
 */
export function calculateLoShuGrid(dob: string, mulank: number, bhagyank: number) {
  // Extract all digits from YYYY-MM-DD
  const digitsStr = dob.replace(/[^0-9]/g, "") + String(mulank) + String(bhagyank);
  
  const digitCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  
  for (const char of digitsStr) {
    const d = parseInt(char, 10);
    if (d >= 1 && d <= 9) {
      digitCounts[d] = (digitCounts[d] || 0) + 1;
    }
  }

  const LO_SHU_ELEMENTS: Record<number, { element: string; significance: string }> = {
    1: { element: "Water", significance: "Career, Communication, Flow & Adaptability" },
    2: { element: "Earth", significance: "Marriage, Intuition, Sensitivity & Relationships" },
    3: { element: "Wood", significance: "Growth, Family, Wisdom & Health" },
    4: { element: "Wood", significance: "Wealth, Practical Organization & Order" },
    5: { element: "Earth", significance: "Stability, Core Freedom & Balance" },
    6: { element: "Metal", significance: "Luxury, Helpful Friends, Foreign Travel & Beauty" },
    7: { element: "Metal", significance: "Children, Creativity, Spirituality & Research" },
    8: { element: "Earth", significance: "Knowledge, Discipline, Intuition & Savings" },
    9: { element: "Fire", significance: "Fame, Energy, Courage, Reputation & Passion" }
  };

  const cells: Record<number, LoShuGridCell> = {};
  for (let d = 1; d <= 9; d++) {
    cells[d] = {
      digit: d,
      count: digitCounts[d] || 0,
      element: LO_SHU_ELEMENTS[d].element,
      significance: LO_SHU_ELEMENTS[d].significance
    };
  }

  const planes: LoShuPlane[] = [
    {
      name: "Mental Plane (4-9-2)",
      digits: [4, 9, 2],
      isComplete: (digitCounts[4] > 0 && digitCounts[9] > 0 && digitCounts[2] > 0),
      significance: "Sharp intellect, memory retention, strategic thinking, and analytical brilliance."
    },
    {
      name: "Emotional Plane (3-5-7)",
      digits: [3, 5, 7],
      isComplete: (digitCounts[3] > 0 && digitCounts[5] > 0 && digitCounts[7] > 0),
      significance: "High emotional intelligence, spiritual depth, compassion, and artistic sensitivity."
    },
    {
      name: "Practical Plane (8-1-6)",
      digits: [8, 1, 6],
      isComplete: (digitCounts[8] > 0 && digitCounts[1] > 0 && digitCounts[6] > 0),
      significance: "Material execution, business acumen, luxurious lifestyle, and grounded action."
    },
    {
      name: "Thought Plane (4-3-8)",
      digits: [4, 3, 8],
      isComplete: (digitCounts[4] > 0 && digitCounts[3] > 0 && digitCounts[8] > 0),
      significance: "High visionary planning, systematic approach, and disciplined foresight."
    },
    {
      name: "Willpower Plane (9-5-1)",
      digits: [9, 5, 1],
      isComplete: (digitCounts[9] > 0 && digitCounts[5] > 0 && digitCounts[1] > 0),
      significance: "Unshakeable determination, persistence through obstacles, and victory."
    },
    {
      name: "Action Plane (2-7-6)",
      digits: [2, 7, 6],
      isComplete: (digitCounts[2] > 0 && digitCounts[7] > 0 && digitCounts[6] > 0),
      significance: "Swift execution of ideas into physical reality without procrastination."
    },
    {
      name: "Golden Success Line (2-5-8)",
      digits: [2, 5, 8],
      isComplete: (digitCounts[2] > 0 && digitCounts[5] > 0 && digitCounts[8] > 0),
      significance: "Supreme fortune in real estate, property ownership, and generational wealth."
    },
    {
      name: "Silver Success Line (1-5-9)",
      digits: [1, 5, 9],
      isComplete: (digitCounts[1] > 0 && digitCounts[5] > 0 && digitCounts[9] > 0),
      significance: "Incredible fame, public recognition, leadership dominance, and financial fortune."
    }
  ];

  const MISSING_REMEDIES: Record<number, { impact: string; remedy: string }> = {
    1: {
      impact: "May lack self-expression, hesitant in speaking up, or delayed career recognition.",
      remedy: "Offer water to the rising Sun daily in a copper vessel; wear a brass or gold ring on index finger."
    },
    2: {
      impact: "Sensitive to criticism, emotional volatility, or friction in close partnerships.",
      remedy: "Wear a natural pearl or silver square piece; drink water from a silver cup; respect mother figures."
    },
    3: {
      impact: "Struggle with self-confidence, financial planning, or delayed higher wisdom.",
      remedy: "Apply yellow turmeric or saffron tilak on forehead; worship Banana tree on Thursdays; respect gurus."
    },
    4: {
      impact: "Disorganized financial records, impatience, or sudden unexpected expenditures.",
      remedy: "Keep a wooden pen or bamboo plant at desk; wear 4-Mukhi Rudraksha or Hessonite garnet."
    },
    5: {
      impact: "Restlessness, emotional instability, or lack of grounding in business decisions.",
      remedy: "Keep green plants in the center of home; feed spinach to cows on Wednesdays; wear Emerald or Peridot."
    },
    6: {
      impact: "Lack of luxury support, distant mentors, or struggles with relationship harmony.",
      remedy: "Use pleasant natural perfumes (Attar); wear white silk or silver; keep home clutter-free and fragrant."
    },
    7: {
      impact: "Disillusionment in trust, difficulty in deep study, or feeling misunderstood.",
      remedy: "Worship Lord Ganesha; feed street dogs with black & white fur; carry a Cat's Eye or Tiger Eye stone."
    },
    8: {
      impact: "Delay in savings, difficulty in managing long-term assets, or legal hurdles.",
      remedy: "Donate mustard oil or black umbrella to poor workers on Saturdays; light mustard oil diya under Peepal tree."
    },
    9: {
      impact: "Low energy, hesitation in taking bold steps, or lack of public recognition.",
      remedy: "Chant Hanuman Chalisa; wear Red Coral or Red Jasper; donate red lentils (Masoor Dal) on Tuesdays."
    }
  };

  const missingNumbers = [];
  for (let d = 1; d <= 9; d++) {
    if (digitCounts[d] === 0) {
      missingNumbers.push({
        digit: d,
        impact: MISSING_REMEDIES[d].impact,
        remedy: MISSING_REMEDIES[d].remedy
      });
    }
  }

  return { cells, planes, missingNumbers };
}

/**
 * Suggest Name Corrections (Name Tuning)
 */
export function generateNameCorrections(fullName: string, mulank: number, bhagyank: number): NameCorrectionSuggestion[] {
  const clean = fullName.trim();
  const currentChaldean = calculateChaldeanSum(clean);
  const currentPythagorean = calculatePythagoreanSum(clean);

  // Lucky Chaldean target compound numbers
  const FORTUNATE_TARGETS = [14, 15, 19, 21, 23, 24, 32, 33, 37, 41, 42, 45, 51, 52];

  const suggestions: NameCorrectionSuggestion[] = [];

  // Generate variations
  const lettersToAdd = ["A", "S", "E", "I", "R", "N", "L", "K", "M", "H"];
  const variationsSet = new Set<string>();

  // Add baseline current
  variationsSet.add(clean);

  // Generate name tweaks
  const parts = clean.split(" ");
  if (parts.length >= 1) {
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ");

    for (const letter of lettersToAdd) {
      variationsSet.add(`${firstName}${letter} ${lastName}`.trim());
      variationsSet.add(`${firstName} ${letter}. ${lastName}`.trim());
      variationsSet.add(`${firstName}${letter}${letter} ${lastName}`.trim());
      if (firstName.length > 3) {
        variationsSet.add(`${firstName.slice(0, -1)}${letter} ${lastName}`.trim());
      }
    }
  }

  for (const varName of Array.from(variationsSet)) {
    const ch = calculateChaldeanSum(varName);
    const py = calculatePythagoreanSum(varName);

    // Calculate harmony score with Mulank & Bhagyank
    let score = 70;

    // Is Chaldean compound in fortunate targets?
    if (FORTUNATE_TARGETS.includes(ch.compound)) {
      score += 20;
    }

    // Single digit matches Mulank or Bhagyank or friendly digits
    if (ch.single === mulank || ch.single === bhagyank) {
      score += 10;
    } else if ([1, 3, 5, 6, 9].includes(ch.single)) {
      score += 5;
    }

    let rating: NameCorrectionSuggestion["compatibilityRating"] = "Harmonious";
    if (score >= 90) rating = "Excellent";
    else if (score >= 78) rating = "Harmonious";
    else if (score >= 65) rating = "Neutral";
    else rating = "Challenging";

    const compoundMeaning = CHALDEAN_COMPOUND_MEANINGS[ch.compound] || `Compound ${ch.compound} reduces to single digit ${ch.single}.`;

    let reason = `Brings vibration of ${ch.single} (Chaldean) and ${py.single} (Pythagorean).`;
    if (ch.compound === 24) reason = "Compound 24 (The Lucky Star) attracts steady wealth, supportive relationships, and high fame.";
    else if (ch.compound === 37) reason = "Compound 37 is highly auspicious for lucrative business partnerships and long-term financial security.";
    else if (ch.compound === 19) reason = "Compound 19 (Prince of Heaven) elevates personal magnetic power and authority.";
    else if (ch.compound === 15) reason = "Compound 15 (The Magician) confers artistic genius, financial luck, and personal magnetism.";
    else if (ch.compound === 32) reason = "Compound 32 is world-famous for diplomatic success, trading prosperity, and public affection.";

    suggestions.push({
      suggestedName: varName,
      chaldeanCompound: ch.compound,
      chaldeanSingle: ch.single,
      pythagoreanSingle: py.single,
      harmonyScore: Math.min(100, score),
      compatibilityRating: rating,
      compoundMeaning,
      recommendedReason: reason
    });
  }

  // Sort by highest harmony score & return top 5
  return suggestions.sort((a, b) => b.harmonyScore - a.harmonyScore).slice(0, 5);
}

/**
 * Mobile Number Numerology Analyzer
 */
export function calculateMobileNumerology(mobile: string, mulank: number, bhagyank: number): MobileNumerologyResult {
  const digitsOnly = mobile.replace(/[^0-9]/g, "");
  let sum = 0;
  for (const char of digitsOnly) {
    sum += parseInt(char, 10);
  }
  const singleDigit = reduceToSingleDigit(sum);

  const RULING_PLANETS: Record<number, string> = {
    1: "Sun", 2: "Moon", 3: "Jupiter", 4: "Rahu", 5: "Mercury",
    6: "Venus", 7: "Ketu", 8: "Saturn", 9: "Mars"
  };

  const planet = RULING_PLANETS[singleDigit] || "Sun";

  // Calculate harmony
  let score = 75;
  if (singleDigit === mulank || singleDigit === bhagyank) score += 20;
  else if ([1, 3, 5, 6].includes(singleDigit)) score += 10;
  else if ([4, 8].includes(singleDigit)) score -= 10;

  const pairAnalysis: string[] = [];
  if (digitsOnly.includes("24")) pairAnalysis.push("Pair 24: Excellent for financial transactions and luxury partnerships.");
  if (digitsOnly.includes("33")) pairAnalysis.push("Pair 33: Enhances counselor energy, teaching ability, and spiritual wisdom.");
  if (digitsOnly.includes("55")) pairAnalysis.push("Pair 55: High-frequency business networking and international trade expansion.");
  if (digitsOnly.includes("99")) pairAnalysis.push("Pair 99: Strong administrative power, courage, and leadership drive.");
  if (digitsOnly.includes("88")) pairAnalysis.push("Pair 88: Requires hard work and discipline; watch for legal precision.");

  if (pairAnalysis.length === 0) {
    pairAnalysis.push(`Compound sum ${sum} reduces to ${singleDigit} (${planet}). Clean, steady transmission frequency.`);
  }

  let rating: MobileNumerologyResult["compatibilityRating"] = "Favorable";
  if (score >= 90) rating = "High Synergy";
  else if (score >= 75) rating = "Favorable";
  else if (score >= 60) rating = "Neutral";
  else rating = "Avoid";

  return {
    mobileNumber: mobile,
    compoundSum: sum,
    singleDigit,
    rulingPlanet: planet,
    harmonyScore: Math.min(100, Math.max(30, score)),
    compatibilityRating: rating,
    businessScore: singleDigit === 5 ? 98 : (singleDigit === 3 || singleDigit === 6 ? 90 : 80),
    wealthScore: singleDigit === 6 ? 96 : (singleDigit === 1 || singleDigit === 5 ? 92 : 78),
    relationshipScore: singleDigit === 2 || singleDigit === 6 ? 95 : 82,
    healthScore: singleDigit === 3 || singleDigit === 1 ? 92 : 80,
    pairAnalysis,
    recommendation: `Mobile number total reduces to ${singleDigit} (${planet}). ${score >= 80 ? "Highly recommended for active business and personal growth." : "Consider choosing a number summing to 5 (Mercury) or 6 (Venus) for maximum commercial luck."}`
  };
}

/**
 * Vehicle Number Plate Analyzer
 */
export function calculateVehicleNumerology(plate: string): VehicleNumerologyResult {
  const clean = plate.toUpperCase().replace(/[^A-Z0-9]/g, "");
  let sum = 0;
  for (const char of clean) {
    if (/[0-9]/.test(char)) {
      sum += parseInt(char, 10);
    } else if (/[A-Z]/.test(char)) {
      sum += CHALDEAN_MAP[char] || 0;
    }
  }
  const single = reduceToSingleDigit(sum);

  const RULING_PLANETS: Record<number, string> = {
    1: "Sun", 2: "Moon", 3: "Jupiter", 4: "Rahu", 5: "Mercury",
    6: "Venus", 7: "Ketu", 8: "Saturn", 9: "Mars"
  };

  const planet = RULING_PLANETS[single] || "Sun";

  let safety = 85;
  let executive = 80;
  if (single === 1 || single === 9) { executive = 95; safety = 90; }
  else if (single === 3 || single === 5 || single === 6) { executive = 90; safety = 92; }
  else if (single === 4 || single === 8) { safety = 75; executive = 85; }

  let rating: VehicleNumerologyResult["harmonyRating"] = "Safe & Balanced";
  if (safety >= 88) rating = "Highly Auspicious";
  else if (safety >= 75) rating = "Safe & Balanced";
  else rating = "Challenging";

  return {
    plateNumber: plate,
    compoundSum: sum,
    singleDigit: single,
    rulingPlanet: planet,
    safetyScore: safety,
    executiveScore: executive,
    harmonyRating: rating,
    analysis: `Vehicle registration sum reduces to ${single} (${planet}). ${single === 9 ? "Vibrates with Mars power — gives protection and strong road authority." : single === 6 ? "Vibrates with Venus energy — smooth driving, luxury feel, and high comfort." : "Provides steady vibration for daily commutes."}`
  };
}

/**
 * House / Property Address Analyzer
 */
export function calculateHouseNumerology(address: string): HouseNumerologyResult {
  const digits = address.replace(/[^0-9]/g, "");
  let sum = 0;
  if (digits.length > 0) {
    for (const d of digits) sum += parseInt(d, 10);
  } else {
    // If no numbers, use Chaldean text sum
    sum = calculateChaldeanSum(address).compound;
  }
  const single = reduceToSingleDigit(sum);

  const RULING_PLANETS: Record<number, string> = {
    1: "Sun", 2: "Moon", 3: "Jupiter", 4: "Rahu", 5: "Mercury",
    6: "Venus", 7: "Ketu", 8: "Saturn", 9: "Mars"
  };

  const VIBES: Record<number, string> = {
    1: "Pioneer Energy - Inspires independence, leadership, and personal ambition.",
    2: "Nurturing Haven - Promotes deep family bonding, peace, and emotional harmony.",
    3: "Creative Hub - Filled with joy, hospitality, artistic gatherings, and social warmth.",
    4: "Solid Foundation - Focuses on discipline, hard work, order, and security.",
    5: "Dynamic Oasis - High energy, frequent guests, travel, and continuous movement.",
    6: "Luxury Sanctuary - Supreme beauty, comfort, artistic elegance, and domestic bliss.",
    7: "Mystic Retreat - Quiet reflection, spiritual study, research, and inner peace.",
    8: "Financial Citadel - Attracts wealth creation, business executive authority, and material success.",
    9: "Humanitarian Haven - Inspires compassion, universal love, wisdom, and warm community service."
  };

  return {
    address,
    compoundSum: sum,
    singleDigit: single,
    rulingPlanet: RULING_PLANETS[single] || "Sun",
    harmonyScore: 88,
    energyVibe: VIBES[single] || VIBES[1],
    remedyIfMissing: single === 4 || single === 8 ? "Place a brass Swastika or PyraGrid near the main doorway to enhance subtle energy flow." : "Keep the entryway brightly lit with warm lighting and fresh plants."
  };
}

/**
 * Partner Compatibility Calculator
 */
export function calculatePartnerCompatibility(
  personA: { name: string; dob: string },
  personB: { name: string; dob: string }
): PartnerNumerologyResult {
  const mulankA = reduceToSingleDigit(parseInt(personA.dob.split("-")[2] || "15", 10));
  const mulankB = reduceToSingleDigit(parseInt(personB.dob.split("-")[2] || "10", 10));

  const sumA = personA.dob.replace(/[^0-9]/g, "").split("").reduce((acc, c) => acc + parseInt(c, 10), 0);
  const sumB = personB.dob.replace(/[^0-9]/g, "").split("").reduce((acc, c) => acc + parseInt(c, 10), 0);
  const bhagyankA = reduceToSingleDigit(sumA);
  const bhagyankB = reduceToSingleDigit(sumB);

  // Synergy algorithm
  let love = 80;
  let marriage = 82;
  let business = 85;
  let friendship = 88;

  if (mulankA === mulankB) {
    love = 92; marriage = 88; friendship = 95;
  } else if ((mulankA === 1 && mulankB === 5) || (mulankA === 3 && mulankB === 9) || (mulankA === 2 && mulankB === 1)) {
    love = 96; marriage = 94; business = 92;
  } else if ((mulankA === 8 && mulankB === 1) || (mulankA === 4 && mulankB === 8)) {
    love = 68; marriage = 72; business = 84;
  }

  return {
    partnerName: personB.name,
    partnerDob: personB.dob,
    partnerMulank: mulankB,
    partnerBhagyank: bhagyankB,
    loveScore: love,
    marriageScore: marriage,
    businessScore: business,
    friendshipScore: friendship,
    overallCompatibility: `${Math.round((love + marriage + business + friendship) / 4)}% Harmonious Synergy`,
    strengths: [
      `Mutual respect between Birth Number ${mulankA} and Birth Number ${mulankB}.`,
      `Complementary Life Destiny paths (${bhagyankA} and ${bhagyankB}) foster shared growth.`,
      `Strong emotional support during life milestone transitions.`
    ],
    potentialChallenges: [
      `Occasional ego clashes when making major financial decisions.`,
      `Ensure clear communication regarding personal space and schedules.`
    ],
    remedy: "Place a pair of Rose Quartz crystals or light a sandalwood incense lamp together on Fridays to align relationship auric frequencies."
  };
}

/**
 * Personal Year, Month & Day Forecast
 */
export function calculatePersonalYearForecast(dob: string, targetYear: number = new Date().getFullYear()): PersonalYearMonthForecast {
  const parts = dob.split("-").map(p => parseInt(p, 10));
  const month = parts[1] || 1;
  const day = parts[2] || 15;

  const personalYear = reduceToSingleDigit(day + month + targetYear);
  const currentMonthNum = new Date().getMonth() + 1;
  const personalMonth = reduceToSingleDigit(personalYear + currentMonthNum);
  const personalDay = reduceToSingleDigit(personalMonth + new Date().getDate());

  const YEAR_THEMES: Record<number, string> = {
    1: "Year of New Beginnings - Seed planting, bold initiatives, leadership & independence.",
    2: "Year of Cooperation - Patience, partnership, emotional balance & diplomacy.",
    3: "Year of Creative Expression - Self-expansion, social joy, artistic output & travel.",
    4: "Year of Hard Work & Foundation - Building security, organization, discipline & health.",
    5: "Year of Freedom & Change - Pivot points, unexpected adventures, media & networking.",
    6: "Year of Family & Responsibility - Domestic harmony, home upgrades, service & love.",
    7: "Year of Reflection & Wisdom - Spiritual study, self-analysis, rest & inner growth.",
    8: "Year of Power & Manifestation - Executive advancement, financial harvest & karma.",
    9: "Year of Completion & Transformation - Releasing old patterns, global reach & culmination."
  };

  const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const monthlyBreakdown = MONTH_NAMES.map((mName, idx) => {
    const mNum = idx + 1;
    const mVal = reduceToSingleDigit(personalYear + mNum);
    return {
      monthName: mName,
      number: mVal,
      theme: YEAR_THEMES[mVal].split(" - ")[0],
      focusArea: YEAR_THEMES[mVal].split(" - ")[1]
    };
  });

  return {
    personalYear,
    personalMonth,
    personalDay,
    yearTheme: YEAR_THEMES[personalYear] || YEAR_THEMES[1],
    monthTheme: YEAR_THEMES[personalMonth] || YEAR_THEMES[1],
    monthlyBreakdown
  };
}

/**
 * Master calculation wrapper returning complete Numerology Report
 */
export function calculateNumerologyReport(fullName: string, dob: string): NumerologyReport {
  const parts = dob.split("-").map((p) => parseInt(p, 10));
  const year = parts[0] || 1995;
  const month = parts[1] || 1;
  const day = parts[2] || 15;

  const birthNumber = reduceToSingleDigit(day); // Mulank
  const totalDobSum = day + month + year;
  const destinyNumber = reduceToSingleDigit(totalDobSum, true); // Bhagyank

  const reducedDay = reduceToSingleDigit(day, true);
  const reducedMonth = reduceToSingleDigit(month, true);
  const reducedYear = reduceToSingleDigit(year, true);
  const lifePathNumber = reduceToSingleDigit(reducedDay + reducedMonth + reducedYear, true);

  const cleanName = fullName.trim();
  const chaldean = calculateChaldeanSum(cleanName);
  const pythagorean = calculatePythagoreanSum(cleanName);

  // Vowels sum -> Soul Urge
  const vowels = ["A", "E", "I", "O", "U"];
  let soulUrgeSum = 0;
  let consonantsSum = 0;
  const cleanStr = cleanName.toUpperCase().replace(/[^A-Z]/g, "");

  for (const char of cleanStr) {
    if (vowels.includes(char)) {
      soulUrgeSum += PYTHAGOREAN_MAP[char] || 0;
    } else {
      consonantsSum += PYTHAGOREAN_MAP[char] || 0;
    }
  }

  const soulUrgeNumber = reduceToSingleDigit(soulUrgeSum, true);
  const personalityNumber = reduceToSingleDigit(consonantsSum, true);
  const expressionNumber = pythagorean.single;
  const birthdayNumber = day;
  const attitudeNumber = reduceToSingleDigit(day + month);
  const maturityNumber = reduceToSingleDigit(lifePathNumber + expressionNumber, true);

  // Karmic Debts check in unreduced compounds
  const karmicDebts = [];
  if ([13, 14, 16, 19].includes(totalDobSum) || [13, 14, 16, 19].includes(pythagorean.compound)) {
    if (totalDobSum === 13 || pythagorean.compound === 13) {
      karmicDebts.push({
        number: 13,
        name: "Karmic Debt 13/4 - The Debt of Effort",
        meaning: "Requires overcoming laziness, staying focused, and building systematic routines.",
        remedy: "Maintain strict daily schedules, avoid shortcuts, and perform selfless community service."
      });
    }
    if (totalDobSum === 14 || pythagorean.compound === 14) {
      karmicDebts.push({
        number: 14,
        name: "Karmic Debt 14/5 - The Debt of Freedom",
        meaning: "Requires emotional moderation, avoiding sensory excesses, and adapting smoothly to change.",
        remedy: "Practice mindfulness meditation, keep commitments, and maintain stable habits."
      });
    }
    if (totalDobSum === 16 || pythagorean.compound === 16) {
      karmicDebts.push({
        number: 16,
        name: "Karmic Debt 16/7 - The Debt of Ego Transformation",
        meaning: "Requires dismantling false pride, seeking spiritual truth, and listening to higher intuition.",
        remedy: "Engage in regular meditation, study sacred scriptures, and practice humility."
      });
    }
    if (totalDobSum === 19 || pythagorean.compound === 19) {
      karmicDebts.push({
        number: 19,
        name: "Karmic Debt 19/1 - The Debt of Power & Self-Reliance",
        meaning: "Requires learning to accept guidance from others while mastering true independent strength.",
        remedy: "Support team members generously, avoid stubbornness, and share credit for successes."
      });
    }
  }

  // Karmic Lessons (Missing digits 1-9 in full name)
  const nameDigits = cleanStr.split("").map(c => PYTHAGOREAN_MAP[c] || 0);
  const karmicLessons = [];
  for (let digit = 1; digit <= 9; digit++) {
    if (!nameDigits.includes(digit)) {
      const LESSON_DESCS: Record<number, { meaning: string; remedy: string }> = {
        1: { meaning: "Lesson 1: Developing self-confidence & leadership independence.", remedy: "Take initiative in small projects and practice assertive public speaking." },
        2: { meaning: "Lesson 2: Cultivating tact, cooperation, and patience.", remedy: "Engage in team collaboration and active listening in relationships." },
        3: { meaning: "Lesson 3: Overcoming self-doubt in creative expression.", remedy: "Write, speak, or perform art without fear of criticism." },
        4: { meaning: "Lesson 4: Building order, discipline, and practical habits.", remedy: "Keep structured calendars, track finances, and complete daily tasks." },
        5: { meaning: "Lesson 5: Embracing change and expanding adaptability.", remedy: "Travel to new places, welcome unexpected shifts, and stay versatile." },
        6: { meaning: "Lesson 6: Balancing duty, family harmony, and self-care.", remedy: "Decorate living spaces with warmth and nurture loved ones thoughtfully." },
        7: { meaning: "Lesson 7: Developing spiritual faith and deep analytical focus.", remedy: "Spend quiet time in nature and read philosophical or scientific books." },
        8: { meaning: "Lesson 8: Mastering money management and executive authority.", remedy: "Learn financial investments, set ambitious career goals, and practice ethics." },
        9: { meaning: "Lesson 9: Cultivating universal compassion and letting go of grudges.", remedy: "Participate in charity work and practice forgiveness." }
      };
      karmicLessons.push({
        number: digit,
        meaning: LESSON_DESCS[digit].meaning,
        remedy: LESSON_DESCS[digit].remedy
      });
    }
  }

  const VIBRATIONS_DATA: Record<number, NumerologyReport["vibrations"]> = {
    1: {
      archetype: "The Pioneer & Visionary Leader",
      rulingPlanet: "Sun",
      favorableDays: ["Sunday", "Monday"],
      luckyColors: ["Gold", "Orange"],
      luckyGemstone: "Ruby (Manikya)",
      luckyDates: [1, 10, 19, 28],
      compatibleNumbers: [1, 2, 3, 9],
      enemyNumbers: [8],
      careerPaths: ["CEO & Executive Leader", "Project Ownership", "Independent Business Units", "Entrepreneur", "Sales Director"],
      healthAdvice: "High stamina and quick recovery; watch heart, blood pressure, eyes, and avoid skipping meals/rest."
    },
    2: {
      archetype: "The Diplomat & Intuitive Peacemaker",
      rulingPlanet: "Moon",
      favorableDays: ["Monday", "Friday"],
      luckyColors: ["White", "Silver"],
      luckyGemstone: "Natural Basra Pearl (Moti)",
      luckyDates: [2, 11, 20, 29],
      compatibleNumbers: [2, 4, 7, 9],
      enemyNumbers: [1, 8],
      careerPaths: ["Counseling & Care Work", "Client Relations", "Diplomacy & Mediation", "Supportive Teams", "Art & Design"],
      healthAdvice: "Health is closely tied to emotions; daily emotional check-ins prevent stress from affecting digestion and sleep."
    },
    3: {
      archetype: "The Master Counselor & Creative Creator",
      rulingPlanet: "Jupiter",
      favorableDays: ["Thursday", "Sunday"],
      luckyColors: ["Yellow", "Gold"],
      luckyGemstone: "Yellow Sapphire (Pukhraj)",
      luckyDates: [3, 12, 21, 30],
      compatibleNumbers: [1, 3, 6, 9],
      enemyNumbers: [4, 8],
      careerPaths: ["Communication & Media", "Teaching & Mentoring", "Creative Expression & Writing", "Public Speaking", "Advisory Services"],
      healthAdvice: "Build moderate, consistent daily habits around food and socializing to protect liver and weight."
    },
    4: {
      archetype: "The Master Architect & Unconventional Genius",
      rulingPlanet: "Rahu",
      favorableDays: ["Sunday", "Saturday"],
      luckyColors: ["Grey", "Electric Blue"],
      luckyGemstone: "Hessonite Garnet (Gomed)",
      luckyDates: [4, 13, 22, 31],
      compatibleNumbers: [1, 2, 5, 6],
      enemyNumbers: [9],
      careerPaths: ["Engineering & Architecture", "Operations & Logistics", "Accounting & Financial Auditing", "Systems Management", "IT Operations"],
      healthAdvice: "Consistent sleep and meal times serve nervous system and joints; take brief movement breaks to release silent tension."
    },
    5: {
      archetype: "The Eloquent Catalyst & Versatile Traveler",
      rulingPlanet: "Mercury",
      favorableDays: ["Wednesday", "Friday"],
      luckyColors: ["Green", "Light Blue"],
      luckyGemstone: "Emerald (Panna)",
      luckyDates: [5, 14, 23],
      compatibleNumbers: [1, 3, 5, 6],
      enemyNumbers: [4],
      careerPaths: ["Sales & Trading", "Media, Journalism & PR", "Travel-Related Work", "Multi-Project Environments", "Digital Marketing"],
      healthAdvice: "Active nervous system benefits from daily movement and variety to calm mental restlessness and aid restful sleep."
    },
    6: {
      archetype: "The Universal Healer & Luxury Craftsman",
      rulingPlanet: "Venus",
      favorableDays: ["Friday", "Monday"],
      luckyColors: ["Pink", "White"],
      luckyGemstone: "Diamond (Heera) / White Zircon",
      luckyDates: [6, 15, 24],
      compatibleNumbers: [3, 6, 9],
      enemyNumbers: [4, 5],
      careerPaths: ["Design & Aesthetics (Interior/Fashion)", "Hospitality & Luxury Services", "Client-Facing Advisory", "Caregiving & Healing Arts", "Wellness"],
      healthAdvice: "Emotional state affects hormonal balance, skin, and kidneys; protect wellbeing with daily five-minute self-care rituals."
    },
    7: {
      archetype: "The Mystical Philosopher & Deep Researcher",
      rulingPlanet: "Ketu",
      favorableDays: ["Monday", "Thursday"],
      luckyColors: ["Sea Green", "Lavender"],
      luckyGemstone: "Cat's Eye (Lehsuniya)",
      luckyDates: [7, 16, 25],
      compatibleNumbers: [1, 2, 5, 7],
      enemyNumbers: [8],
      careerPaths: ["Research & Scientific Analysis", "Specialist & Technical Roles", "Writing & Philosophy", "Data Science & Cryptography", "Esoteric Studies"],
      healthAdvice: "Nervous system needs 10-15 minutes of protected daily solitude as essential preventive health maintenance."
    },
    8: {
      archetype: "The Financial Powerhouse & Karmic Judge",
      rulingPlanet: "Saturn",
      favorableDays: ["Saturday", "Friday"],
      luckyColors: ["Dark Blue", "Black"],
      luckyGemstone: "Blue Sapphire (Neelam) / Amethyst",
      luckyDates: [8, 17, 26],
      compatibleNumbers: [4, 6, 8],
      enemyNumbers: [1, 2, 7],
      careerPaths: ["Management & Operations", "Finance & Governance", "Legal & Compliance", "Heavy Infrastructure & Real Estate", "Strategic Industry"],
      healthAdvice: "Protect bones and joints through daily stretching; avoid pushing through fatigue and practice self-compassion."
    },
    9: {
      archetype: "The Humanitarian Warrior & Courageous Defender",
      rulingPlanet: "Mars",
      favorableDays: ["Tuesday", "Thursday"],
      luckyColors: ["Red", "Coral"],
      luckyGemstone: "Red Coral (Moonga)",
      luckyDates: [9, 18, 27],
      compatibleNumbers: [1, 3, 6, 9],
      enemyNumbers: [4],
      careerPaths: ["Sales & Competitive Fields", "Emergency Services & Defense", "Entrepreneurship with Stakes", "High-Impact Project Leadership", "Athletics"],
      healthAdvice: "Mars-driven energy needs daily physical activity as essential regulation to prevent built-up irritability or headaches."
    }
  };

  const currentKey = reduceToSingleDigit(birthNumber);
  const vibrations = VIBRATIONS_DATA[currentKey] || VIBRATIONS_DATA[1];

  const loShuGrid = calculateLoShuGrid(dob, birthNumber, destinyNumber);
  const nameCorrections = generateNameCorrections(fullName, birthNumber, destinyNumber);
  const mobileCompatibility = calculateMobileNumerology("9876543210", birthNumber, destinyNumber);
  const vehicleCompatibility = calculateVehicleNumerology("MH01AX9999");
  const houseCompatibility = calculateHouseNumerology("Flat 502, Crystal Heights");
  const personalYearForecast = calculatePersonalYearForecast(dob);
  const fiveYearForecast = calculateFiveYearPersonalYearForecast(dob);

  return {
    birthNumber,
    destinyNumber,
    lifePathNumber,
    expressionNumber,
    soulUrgeNumber,
    personalityNumber,
    birthdayNumber,
    attitudeNumber,
    maturityNumber,
    chaldeanNameNumber: chaldean.single,
    compoundNumber: chaldean.compound,
    karmicDebts,
    karmicLessons,
    vibrations,
    loShuGrid,
    nameCorrections,
    mobileCompatibility,
    vehicleCompatibility,
    houseCompatibility,
    businessNameScore: {
      name: `${fullName} Enterprises`,
      compound: 37,
      single: 1,
      destinyMatch: true,
      recommendation: "Compound 37 is one of the most auspicious commercial numbers in Chaldean numerology."
    },
    personalYearForecast,
    fiveYearForecast
  };
}
