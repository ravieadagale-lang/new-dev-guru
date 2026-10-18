// src/data/numerologyNameMobileEngine.ts
// Complete Name Numerology, Pronology, Letter Group Rules & Mobile Numerology Engine

import { CHALDEAN_MAP, PYTHAGOREAN_MAP } from "./numerologyData";

export interface LetterGroupMeaning {
  group: string;
  letters: string[];
  element: string;
  rulingPlanet: string;
  chaldeanValue: number;
  positionalMeanings: Record<number, string>; // 1 to 9 positions in name
}

export interface PronologyRule {
  sound: string;
  category: "Positive / Lucky" | "Negative / Unlucky";
  meaning: string;
}

export interface MobileNumerologyAnalysis {
  mobileNumber: string;
  totalSum: number;
  singleDigit: number;
  isAuspiciousTotal: boolean;
  pairingRules: { pair: string; meaning: string; impact: "Positive" | "Negative" | "Neutral" }[];
  professionMandatory: string[];
  avoidNumbers: string[];
  repetitionEffects: { digit: number; count: number; meaning: string }[];
  recommendation: string;
}

/**
 * Letter Groups Analysis (AIJQY, BKR, CGLS, DM, EHNX, UVW, OZ, FP)
 */
export const LETTER_GROUPS: LetterGroupMeaning[] = [
  {
    group: "AIJQY",
    letters: ["A", "I", "J", "Q", "Y"],
    element: "Fire / Sun",
    rulingPlanet: "Sun (Surya)",
    chaldeanValue: 1,
    positionalMeanings: {
      1: "Position 1 (Cornerstone): High leadership, ambition, original drive, and commanding start.",
      2: "Position 2: Inspires executive clarity in creative collaboration.",
      3: "Position 3: Enhances public speaking, charm, and social visibility.",
      4: "Position 4: Converts visionary ideas into structured execution.",
      5: "Position 5: Brings rapid popularity, adaptability, and trade growth.",
      6: "Position 6: Attracts luxury branding and aesthetic distinction.",
      7: "Position 7: Deepens analytical insight and technical innovation.",
      8: "Position 8: Strengthens administrative control and wealth building.",
      9: "Position 9 (Capstone): Leaves a permanent, influential legacy of honor."
    }
  },
  {
    group: "BKR",
    letters: ["B", "K", "R"],
    element: "Water / Moon",
    rulingPlanet: "Moon (Chandra)",
    chaldeanValue: 2,
    positionalMeanings: {
      1: "Position 1 (Cornerstone): Gentle, diplomatic, intuitive, and family-oriented start.",
      2: "Position 2: Deepens emotional sensitivity and collaborative power.",
      3: "Position 3: Infuses artistic rhythm into communication.",
      4: "Position 4: Softens rigidity with empathy and patience.",
      5: "Position 5: Enhances charm in public relations and travel.",
      6: "Position 6: Creates a warm, hospitable, and artistic household.",
      7: "Position 7: Heightens spiritual intuition and quiet research.",
      8: "Position 8: Balances material drive with ethical care.",
      9: "Position 9 (Capstone): Leaves a memory of compassion and peace."
    }
  },
  {
    group: "CGLS",
    letters: ["C", "G", "L", "S"],
    element: "Ether / Jupiter",
    rulingPlanet: "Jupiter (Guru)",
    chaldeanValue: 3,
    positionalMeanings: {
      1: "Position 1 (Cornerstone): Expressive, scholarly, optimistic, and highly magnetic start.",
      2: "Position 2: Brings joyful harmony to partnerships.",
      3: "Position 3: Amplifies public speaking, teaching, and legal acclaim.",
      4: "Position 4: Gives practical foundation to expansive philosophical ideas.",
      5: "Position 5: Accelerates networking and publishing success.",
      6: "Position 6: Blends wisdom with artistic elegance and luxury.",
      7: "Position 7: Directs intellect toward higher spiritual research.",
      8: "Position 8: Attracts financial luck through ethical leadership.",
      9: "Position 9 (Capstone): Delivers divine honor and philosophical renown."
    }
  },
  {
    group: "DM",
    letters: ["D", "M", "T"],
    element: "Earth / Rahu-Uranus",
    rulingPlanet: "Rahu / Earth",
    chaldeanValue: 4,
    positionalMeanings: {
      1: "Position 1 (Cornerstone): Practical, hard-working, disciplined, and solid foundation.",
      2: "Position 2: Grounds emotional turbulence into realistic planning.",
      3: "Position 3: Adds technical detail to creative expression.",
      4: "Position 4: Creates unshakeable structural discipline.",
      5: "Position 5: Organizes commercial movement with precision.",
      6: "Position 6: Protects family assets with practical vigilance.",
      7: "Position 7: Drives deep investigative research.",
      8: "Position 8: Builds permanent corporate and physical assets.",
      9: "Position 9 (Capstone): Leaves an enduring, solid architectural legacy."
    }
  },
  {
    group: "EHNX",
    letters: ["E", "H", "N", "X"],
    element: "Air / Mercury",
    rulingPlanet: "Mercury (Budha)",
    chaldeanValue: 5,
    positionalMeanings: {
      1: "Position 1 (Cornerstone): Versatile, fast-moving, adaptable, and highly charming start.",
      2: "Position 2: Keeps communication dynamic and responsive.",
      3: "Position 3: Enhances quick wit, media presence, and sales.",
      4: "Position 4: Brings adaptability into technical workflows.",
      5: "Position 5: Supercharges trading, e-commerce, and public affairs.",
      6: "Position 6: Infuses modern flair into luxury and hospitality.",
      7: "Position 7: Sharpens analytical speed in data science.",
      8: "Position 8: Facilitates rapid financial transactions and trade.",
      9: "Position 9 (Capstone): Leaves an active, versatile, and wide legacy."
    }
  },
  {
    group: "UVW",
    letters: ["U", "V", "W"],
    element: "Water / Venus",
    rulingPlanet: "Venus (Shukra)",
    chaldeanValue: 6,
    positionalMeanings: {
      1: "Position 1 (Cornerstone): Luxurious, romantic, artistic, and magnetic foundation.",
      2: "Position 2: Softens interactions with charm and beauty.",
      3: "Position 3: Magnifies artistic brilliance and entertainment appeal.",
      4: "Position 4: Enhances interior design and real estate value.",
      5: "Position 5: Drives fashion, luxury branding, and PR.",
      6: "Position 6: Creates maximum domestic joy and opulence.",
      7: "Position 7: Connects aesthetic beauty with spiritual harmony.",
      8: "Position 8: Attracts high wealth through luxury goods.",
      9: "Position 9 (Capstone): Leaves a celebrated legacy of art and beauty."
    }
  },
  {
    group: "OZ",
    letters: ["O", "Z"],
    element: "Ether / Ketu-Neptune",
    rulingPlanet: "Ketu / Neptune",
    chaldeanValue: 7,
    positionalMeanings: {
      1: "Position 1 (Cornerstone): Intuitive, mystical, analytical, and reserved start.",
      2: "Position 2: Deepens psychological insight in relationships.",
      3: "Position 3: Expresses esoteric and research truths eloquently.",
      4: "Position 4: Grounds occult knowledge into practical systems.",
      5: "Position 5: Brings unexpected international breakthroughs.",
      6: "Position 6: Harmonizes spiritual depth with home life.",
      7: "Position 7: Reaches peak spiritual and research mastery.",
      8: "Position 8: Generates wealth through specialized inventions.",
      9: "Position 9 (Capstone): Leaves an immortal spiritual or scientific legacy."
    }
  },
  {
    group: "FP",
    letters: ["F", "P"],
    element: "Earth / Saturn",
    rulingPlanet: "Saturn (Shani)",
    chaldeanValue: 8,
    positionalMeanings: {
      1: "Position 1 (Cornerstone): Disciplined, serious, persistent, and unshakeable start.",
      2: "Position 2: Teaches patience and emotional endurance.",
      3: "Position 3: Focuses communication on structured, serious subjects.",
      4: "Position 4: Establishes heavy industrial order.",
      5: "Position 5: Handles complex financial regulatory systems.",
      6: "Position 6: Takes deep responsibility for family protection.",
      7: "Position 7: Conducts relentless research into fundamental truths.",
      8: "Position 8: Accumulates permanent wealth and industrial land.",
      9: "Position 9 (Capstone): Leaves an ironclad, permanent corporate empire."
    }
  }
];

/**
 * Pronology Database: Positive & Negative Name Sounds
 */
export const PRONOLOGY_SOUNDS: PronologyRule[] = [
  // Lucky Sounds
  { sound: "RAM", category: "Positive / Lucky", meaning: "Divine protection, supreme victory, and unshakeable strength." },
  { sound: "RAJ", category: "Positive / Lucky", meaning: "Regal authority, leadership, state honor, and wealth." },
  { sound: "SRI", category: "Positive / Lucky", meaning: "Lakshmi blessing, financial abundance, and grace." },
  { sound: "SHI", category: "Positive / Lucky", meaning: "Auspiciousness, peace, wisdom, and spiritual clarity." },
  { sound: "ROS", category: "Positive / Lucky", meaning: "Charm, social popularity, artistic brilliance, and growth." },
  { sound: "LAKSH", category: "Positive / Lucky", meaning: "Attracts material prosperity, wealth, and victory." },
  { sound: "ANAN", category: "Positive / Lucky", meaning: "Infinite joy, continuous growth, and vitality." },
  { sound: "DEV", category: "Positive / Lucky", meaning: "Divine protection, noble dignity, and higher wisdom." },
  { sound: "JAY", category: "Positive / Lucky", meaning: "Unconditional victory, success over obstacles, and enthusiasm." },

  // Unlucky Sounds
  { sound: "WAR", category: "Negative / Unlucky", meaning: "Induces conflict, court cases, aggressive arguments, and mental stress." },
  { sound: "DIE", category: "Negative / Unlucky", meaning: "Creates sudden stagnation, loss of enthusiasm, or career halts." },
  { sound: "ILL", category: "Negative / Unlucky", meaning: "Attracts frequent health vulnerability, low immunity, and medical expenses." },
  { sound: "END", category: "Negative / Unlucky", meaning: "Incomplete projects, sudden termination of contracts, and dissolution." },
  { sound: "SIK", category: "Negative / Unlucky", meaning: "Low physical energy, psychosomatic ailments, and anxiety." },
  { sound: "LOST", category: "Negative / Unlucky", meaning: "Confusion in direction, loss of capital, and feeling misplaced." },
  { sound: "CRY", category: "Negative / Unlucky", meaning: "Emotional sadness, relationship friction, and heartbreak." },
  { sound: "NO", category: "Negative / Unlucky", meaning: "Rejection, obstacle in approvals, and negative responses." },
  { sound: "SAT", category: "Negative / Unlucky", meaning: "Heaviness, delays, and burden of heavy responsibilities." },
  { sound: "KIL", category: "Negative / Unlucky", meaning: "Severe friction, hostility from rivals, and sudden disruption." }
];

/**
 * Comprehensive Name Numerology Multi-Parameter Analyzer
 */
export function analyzeNameNumerologyDetailed(name: string, dob: string) {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, "");
  const vowels = "AEIOU";

  // Single digit helper
  const toSingle = (num: number) => {
    while (num > 9) num = String(num).split("").map(Number).reduce((a, b) => a + b, 0);
    return num;
  };

  // Chaldean Sums
  let chaldeanCompound = 0;
  for (const ch of cleanName) chaldeanCompound += CHALDEAN_MAP[ch] || 0;
  const chaldeanSingle = toSingle(chaldeanCompound);

  // Pythagorean Sums
  let pythagoreanCompound = 0;
  let vowelSum = 0;
  let consonantSum = 0;

  for (const ch of cleanName) {
    const val = PYTHAGOREAN_MAP[ch] || 0;
    pythagoreanCompound += val;
    if (vowels.includes(ch)) {
      vowelSum += val;
    } else {
      consonantSum += val;
    }
  }

  const expressionNumber = toSingle(pythagoreanCompound);
  const heartDesireSoulNumber = toSingle(vowelSum); // Vowels
  const personalityNumberInnerDream = toSingle(consonantSum); // Consonants

  // DOB numbers
  const dobDigits = dob.replace(/[^0-9]/g, "").split("").map(Number);
  const day = parseInt(dob.split("-")[2] || "15", 10);
  const month = parseInt(dob.split("-")[1] || "8", 10);
  const driverNum = toSingle(day);
  const conductorNum = toSingle(dobDigits.reduce((a, b) => a + b, 0));

  const maturityNumber = toSingle(expressionNumber + conductorNum);
  const attitudeNumber = toSingle(day + month);
  const moneyNumber = toSingle(chaldeanSingle + conductorNum);

  // Cornerstone (1st Letter) & Capstone (Last Letter)
  const cornerstone = cleanName[0] || "A";
  const capstone = cleanName[cleanName.length - 1] || "A";

  // Missing digits (Karmic Lessons)
  const presentDigitsInName = new Set(cleanName.split("").map((c) => PYTHAGOREAN_MAP[c] || 1));
  const karmicLessons: number[] = [];
  for (let d = 1; d <= 9; d++) {
    if (!presentDigitsInName.has(d)) karmicLessons.push(d);
  }

  // Pronology Detection
  const foundSounds: { sound: string; category: string; meaning: string }[] = [];
  PRONOLOGY_SOUNDS.forEach((p) => {
    if (cleanName.includes(p.sound)) {
      foundSounds.push({ sound: p.sound, category: p.category, meaning: p.meaning });
    }
  });

  // Name Structure
  const len = cleanName.length;
  const startingPart = cleanName.slice(0, Math.ceil(len / 3));
  const middlePart = cleanName.slice(Math.ceil(len / 3), Math.floor((len * 2) / 3));
  const endingPart = cleanName.slice(Math.floor((len * 2) / 3));

  // Blasting vs Boosting Letters for Driver Number
  const HARMFUL_LETTERS: Record<number, string[]> = {
    1: ["F", "P", "Z"], 2: ["D", "M", "T"], 3: ["F", "P"],
    4: ["A", "I", "J"], 5: ["F", "P"], 6: ["A", "I"],
    7: ["D", "M"], 8: ["A", "I", "J"], 9: ["C", "G", "S"]
  };

  const SUPPORTIVE_LETTERS: Record<number, string[]> = {
    1: ["A", "I", "J", "Q", "Y", "C", "G", "L", "S"],
    2: ["B", "K", "R", "E", "H", "N"],
    3: ["C", "G", "L", "S", "A", "I"],
    4: ["D", "M", "T", "E", "H", "N"],
    5: ["E", "H", "N", "X", "A", "I"],
    6: ["U", "V", "W", "C", "G", "S"],
    7: ["O", "Z", "E", "H", "N"],
    8: ["F", "P", "D", "M", "T"],
    9: ["A", "I", "J", "B", "K", "R"]
  };

  const blastingLetters = (HARMFUL_LETTERS[driverNum] || []).filter((l) => cleanName.includes(l));
  const boostingLetters = (SUPPORTIVE_LETTERS[driverNum] || []).filter((l) => cleanName.includes(l));

  return {
    cleanName,
    chaldeanCompound,
    chaldeanSingle,
    pythagoreanCompound,
    expressionNumber,
    heartDesireSoulNumber,
    personalityNumberInnerDream,
    maturityNumber,
    attitudeNumber,
    moneyNumber,
    cornerstone,
    capstone,
    karmicLessons,
    foundSounds,
    startingPart,
    middlePart,
    endingPart,
    blastingLetters,
    boostingLetters
  };
}

/**
 * Mobile Numerology Engine
 */
export function analyzeMobileNumerologyDetailed(
  mobileNumber: string,
  driverNum: number,
  conductorNum: number
): MobileNumerologyAnalysis {
  const digits = mobileNumber.replace(/[^0-9]/g, "");
  const numList = digits.split("").map(Number);
  const totalSum = numList.reduce((a, b) => a + b, 0);

  let single = totalSum;
  while (single > 9) {
    single = String(single).split("").map(Number).reduce((a, b) => a + b, 0);
  }

  const isAuspiciousTotal = [1, 3, 5, 6].includes(single) && single === driverNum || single === conductorNum || [1, 5, 6].includes(single);

  // 11-99 Pairings Detection
  const PAIRINGS_RULES: Record<string, { meaning: string; impact: "Positive" | "Negative" | "Neutral" }> = {
    "11": { meaning: "High intuitive intelligence and mental clarity.", impact: "Positive" },
    "15": { meaning: "Budhaditya attraction; high sales, public relations, and magnetic charm.", impact: "Positive" },
    "19": { meaning: "King & Conqueror; rapid promotion, authority, and high status.", impact: "Positive" },
    "24": { meaning: "Attracts financial luck, supportive friends, and artistic growth.", impact: "Positive" },
    "33": { meaning: "Master teacher energy, wisdom, and public trust.", impact: "Positive" },
    "55": { meaning: "Superfast business movement, trade success, and e-commerce growth.", impact: "Positive" },
    "66": { meaning: "High luxury attraction, hospitality, and comfort.", impact: "Positive" },
    "18": { meaning: "Sudden arguments, conflict with authority, and legal delays.", impact: "Negative" },
    "28": { meaning: "Financial strain due to overly trusting associates.", impact: "Negative" },
    "44": { meaning: "Heavy technical friction, workload burden, and sudden delays.", impact: "Negative" },
    "88": { meaning: "Workaholism, severe delays, and emotional isolation.", impact: "Negative" }
  };

  const pairingResults: { pair: string; meaning: string; impact: "Positive" | "Negative" | "Neutral" }[] = [];
  for (let i = 0; i < digits.length - 1; i++) {
    const pair = digits.slice(i, i + 2);
    if (PAIRINGS_RULES[pair]) {
      pairingResults.push({ pair, ...PAIRINGS_RULES[pair] });
    }
  }

  // Mandatory Numbers for Profession
  const PROFESSION_MANDATORY: Record<number, string[]> = {
    1: ["Must contain digits 1, 5, or 6 for high executive authority."],
    2: ["Must contain digits 2, 3, or 6 for artistic and counseling success."],
    3: ["Must contain digits 3, 1, or 9 for academic and advisory acclaim."],
    4: ["Must contain digits 4, 5, or 8 for IT, engineering, and real estate."],
    5: ["Must contain digits 5, 1, or 6 for stock trading, sales, and marketing."],
    6: ["Must contain digits 6, 5, or 1 for fashion, media, and luxury trade."],
    7: ["Must contain digits 7, 3, or 5 for research, astrology, and data science."],
    8: ["Must contain digits 8, 5, or 6 for heavy industry, law, and corporate finance."],
    9: ["Must contain digits 9, 1, or 3 for sports, defense, and surgical practice."]
  };

  // Repetition Counting (e.g. 999, 555)
  const counts: Record<number, number> = {};
  numList.forEach((d) => (counts[d] = (counts[d] || 0) + 1));

  const repetitionEffects: { digit: number; count: number; meaning: string }[] = [];
  for (let d = 0; d <= 9; d++) {
    if (counts[d] >= 3) {
      repetitionEffects.push({
        digit: d,
        count: counts[d],
        meaning: `Digit ${d} repeated ${counts[d]} times: Over-amplifies planet ${d} energy; may create imbalance if unharmonized with Driver ${driverNum}.`
      });
    }
  }

  return {
    mobileNumber,
    totalSum,
    singleDigit: single,
    isAuspiciousTotal,
    pairingRules: pairingResults,
    professionMandatory: PROFESSION_MANDATORY[driverNum] || ["Contains balanced digits."],
    avoidNumbers: [4, 8].includes(driverNum) ? ["Avoid ending digits in 4 or 8"] : ["Avoid ending digits in 8"],
    repetitionEffects,
    recommendation: isAuspiciousTotal
      ? `Mobile number total sum ${totalSum} (Single ${single}) is highly compatible with Driver ${driverNum} and Conductor ${conductorNum}.`
      : `Mobile number total sum ${totalSum} (Single ${single}) is neutral/challenging. Consider tuning total sum to 1, 5, or 6.`
  };
}
