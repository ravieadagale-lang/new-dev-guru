// src/data/numerologyGrids.ts
// Complete Lo Shu Grid & Vedic Numerology Grid Engines

export interface LoShuCell {
  digit: number;
  count: number;
  isPresent: boolean;
  element: string;
  direction: string;
  meaning: string;
}

export interface LoShuPlaneAnalysis {
  name: string;
  numbers: number[];
  isComplete: boolean;
  impact: string;
}

export interface MissingNumberRemedy {
  digit: number;
  element: string;
  impact: string;
  remedy: string;
  crystal: string;
  direction: string;
}

export interface RepeatedNumberEffect {
  digit: number;
  count: number;
  effect: string;
  remedy: string;
}

export interface VedicGridCell {
  digit: number;
  count: number;
  isPresent: boolean;
  planet: string;
}

export interface VedicYogaResult {
  name: string;
  digits: number[];
  type: "Major" | "Trine" | "L-Shape" | "Two-Number" | "Drishti" | "Retro-Drishti";
  isPresent: boolean;
  meaning: string;
  remedy?: string;
}

/**
 * LOSHU GRID ENGINE
 */
export function calculateLoShuGridEngine(
  dob: string,
  driverNum: number,
  conductorNum: number
): {
  grid: Record<number, LoShuCell>;
  planes: LoShuPlaneAnalysis[];
  goldenYoga: boolean;
  silverYoga: boolean;
  missingRemedies: MissingNumberRemedy[];
  repeatedEffects: RepeatedNumberEffect[];
} {
  // Extract all digits from DOB + Driver + Conductor
  const rawDigits = dob.replace(/[^0-9]/g, "").split("").map(Number);
  const allDigits = [...rawDigits, driverNum, conductorNum];

  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  allDigits.forEach((d) => {
    if (d >= 1 && d <= 9) {
      counts[d] = (counts[d] || 0) + 1;
    }
  });

  const LOSHU_METADATA: Record<number, { element: string; direction: string; meaning: string }> = {
    4: { element: "Wood (Southest)", direction: "South-East", meaning: "Wealth, prosperity, commercial growth, and mental agility." },
    9: { element: "Fire (South)", direction: "South", meaning: "Fame, reputation, recognition, energy, and social status." },
    2: { element: "Earth (Southwest)", direction: "South-West", meaning: "Marriage, relationships, maternal care, and partnership stability." },
    3: { element: "Wood (East)", direction: "East", meaning: "Health, family harmony, growth, elders' blessings, and wisdom." },
    5: { element: "Earth (Center)", direction: "Center (Brahmasthan)", meaning: "Balance, stability, emotional grounding, willpower, and core energy." },
    7: { element: "Metal (West)", direction: "West", meaning: "Creativity, children, technical innovation, and intuitive wisdom." },
    8: { element: "Earth (Northeast)", direction: "North-East", meaning: "Knowledge, education, skill accumulation, and spiritual wisdom." },
    1: { element: "Water (North)", direction: "North", meaning: "Career progression, opportunities, life path flow, and business depth." },
    6: { element: "Metal (Northwest)", direction: "North-West", meaning: "Helpful people, travel, foreign trade, luxury, and benefactor support." }
  };

  const grid: Record<number, LoShuCell> = {};
  for (let d = 1; d <= 9; d++) {
    const meta = LOSHU_METADATA[d];
    grid[d] = {
      digit: d,
      count: counts[d] || 0,
      isPresent: counts[d] > 0,
      element: meta.element,
      direction: meta.direction,
      meaning: meta.meaning
    };
  }

  // Planes
  const has = (num: number) => counts[num] > 0;

  const planes: LoShuPlaneAnalysis[] = [
    { name: "Mental Plane (4-9-2)", numbers: [4, 9, 2], isComplete: has(4) && has(9) && has(2), impact: "Sharp intellect, high memory retention, excellent analysis, and strategic foresight." },
    { name: "Emotional Plane (3-5-7)", numbers: [3, 5, 7], isComplete: has(3) && has(5) && has(7), impact: "High emotional balance, spiritual intuition, deep empathy, and creative expression." },
    { name: "Practical Plane (8-1-6)", numbers: [8, 1, 6], isComplete: has(8) && has(1) && has(6), impact: "Practical execution, material success, financial mastery, and commercial stability." },
    { name: "Thought Plane (4-3-8)", numbers: [4, 3, 8], isComplete: has(4) && has(3) && has(8), impact: "Visionary planning, systematic thinking, research depth, and logical reasoning." },
    { name: "Will Plane (9-5-1)", numbers: [9, 5, 1], isComplete: has(9) && has(5) && has(1), impact: "Unshakeable willpower, supreme determination, executive drive, and success." },
    { name: "Action Plane (2-7-6)", numbers: [2, 7, 6], isComplete: has(2) && has(7) && has(6), impact: "Rapid implementation, physical energy, athletic agility, and quick execution." }
  ];

  const goldenYoga = has(4) && has(5) && has(6); // 4-5-6 Raj Yoga / Golden Plane
  const silverYoga = has(2) && has(5) && has(8); // 2-5-8 Property / Silver Yoga

  // Missing Numbers & Remedies
  const MISSING_DATA: Record<number, { element: string; impact: string; remedy: string; crystal: string; direction: string }> = {
    1: { element: "Water", impact: "Career stagnation or lack of clear direction.", remedy: "Hang a flowing water fountain or picture of blue ocean in North direction.", crystal: "Lapis Lazuli / Aquamarine", direction: "North" },
    2: { element: "Earth", impact: "Relationship instability or emotional mood swings.", remedy: "Place a pair of Rose Quartz crystals or clay pot in South-West corner.", crystal: "Rose Quartz", direction: "South-West" },
    3: { element: "Wood", impact: "Lack of family support or health/growth delays.", remedy: "Keep green plants or wooden artifacts in the East direction.", crystal: "Green Aventurine", direction: "East" },
    4: { element: "Wood", impact: "Financial instability or organizational clutter.", remedy: "Keep a wooden pen stand or green jade plant in South-East.", crystal: "Green Jade", direction: "South-East" },
    5: { element: "Earth", impact: "Restlessness, emotional instability, or lack of grounding.", remedy: "Keep yellow marble or citrine cluster in the Center (Brahmasthan) of house.", crystal: "Citrine", direction: "Center" },
    6: { element: "Metal", impact: "Lack of luxury, helpful friends, or foreign travel delays.", remedy: "Wear silver watch or place metal windchime in North-West.", crystal: "Clear Quartz / Pyrite", direction: "North-West" },
    7: { element: "Metal", impact: "Difficulty completing technical tasks or lack of focus.", remedy: "Keep white crystal sphere or metal clock in West direction.", crystal: "Amethyst / Tiger Eye", direction: "West" },
    8: { element: "Earth", impact: "Financial delays, lack of discipline, or education obstacles.", remedy: "Place eight natural crystal pebbles in North-East corner.", crystal: "Smoky Quartz", direction: "North-East" },
    9: { element: "Fire", impact: "Low energy, lack of social recognition or fame.", remedy: "Light a red candle or hang red painting in South direction.", crystal: "Red Jasper / Carnelian", direction: "South" }
  };

  const missingRemedies: MissingNumberRemedy[] = [];
  for (let d = 1; d <= 9; d++) {
    if (counts[d] === 0) {
      const m = MISSING_DATA[d];
      missingRemedies.push({
        digit: d,
        element: m.element,
        impact: m.impact,
        remedy: m.remedy,
        crystal: m.crystal,
        direction: m.direction
      });
    }
  }

  // Repeated Numbers (>2)
  const REPEATED_DATA: Record<number, { effect: string; remedy: string }> = {
    1: { effect: "Over-communicative or difficulty expressing deep feelings.", remedy: "Practice silent meditation and wear Pearl/Moonstone." },
    2: { effect: "Overly sensitive, moody, and easily hurt.", remedy: "Offer water to Moon on Mondays and ground daily." },
    3: { effect: "Scattered energy, over-philosophical, or tendency to preach.", remedy: "Focus on one project at a time and wear Green Aventurine." },
    4: { effect: "Stubborn, rebellious, or fixated on microscopic details.", remedy: "Donate black sesame seeds on Saturday and practice yoga." },
    5: { effect: "Restless, impulsive, or prone to over-speculation.", remedy: "Chant Budha Beej Mantra and spend time in nature." },
    6: { effect: "Over-indulgent in luxury, possessive in love.", remedy: "Donate white sweets to young girls on Friday." },
    7: { effect: "Aloof, secretive, or over-analytical.", remedy: "Engage in social service and feed stray dogs." },
    8: { effect: "Delay, burden of responsibility, or workaholism.", remedy: "Light sesame oil lamp under Peepal tree on Saturday evening." },
    9: { effect: "Fiery temper, impatience, or aggressive drive.", remedy: "Chant Hanuman Chalisa daily and drink water from copper cup." }
  };

  const repeatedEffects: RepeatedNumberEffect[] = [];
  for (let d = 1; d <= 9; d++) {
    if (counts[d] > 2) {
      const r = REPEATED_DATA[d];
      repeatedEffects.push({
        digit: d,
        count: counts[d],
        effect: r.effect,
        remedy: r.remedy
      });
    }
  }

  return {
    grid,
    planes,
    goldenYoga,
    silverYoga,
    missingRemedies,
    repeatedEffects
  };
}

/**
 * VEDIC NUMEROLOGY GRID ENGINE
 * Grid Layout (3x3):
 * 3 1 9
 * 6 7 5
 * 2 8 4
 */
export function calculateVedicGridEngine(
  dob: string,
  driverNum: number,
  conductorNum: number
): {
  grid: Record<number, VedicGridCell>;
  majorYogas: VedicYogaResult[];
  trineYogas: VedicYogaResult[];
  lShapeYogas: VedicYogaResult[];
  drishtiYogas: VedicYogaResult[];
} {
  const rawDigits = dob.replace(/[^0-9]/g, "").split("").map(Number);
  const allDigits = [...rawDigits, driverNum, conductorNum];

  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  allDigits.forEach((d) => {
    if (d >= 1 && d <= 9) counts[d] = (counts[d] || 0) + 1;
  });

  const PLANETS: Record<number, string> = {
    3: "Guru (Jupiter)", 1: "Surya (Sun)", 9: "Mangal (Mars)",
    6: "Shukra (Venus)", 7: "Ketu (South Node)", 5: "Budha (Mercury)",
    2: "Chandra (Moon)", 8: "Shani (Saturn)", 4: "Rahu (North Node)"
  };

  const grid: Record<number, VedicGridCell> = {};
  for (let d = 1; d <= 9; d++) {
    grid[d] = {
      digit: d,
      count: counts[d] || 0,
      isPresent: counts[d] > 0,
      planet: PLANETS[d]
    };
  }

  const has = (d: number) => counts[d] > 0;

  // Major Yogas
  const majorYogas: VedicYogaResult[] = [
    {
      name: "3-1-9 Fame & Spiritual Success Yoga",
      digits: [3, 1, 9],
      type: "Major",
      isPresent: has(3) && has(1) && has(9),
      meaning: "Brings universal fame, administrative authority, wealth, leadership, and divine spiritual recognition."
    },
    {
      name: "3-7-4 Kaal Sarp & Spiritual Mystery Yog",
      digits: [3, 7, 4],
      type: "Major",
      isPresent: has(3) && has(7) && has(4),
      meaning: "High occult wisdom, sudden breakthroughs, technical research power, accompanied by unexpected life shifts.",
      remedy: "Offer water to Lord Shiva daily and recite Hanuman Chalisa."
    },
    {
      name: "9-7-2 Courage & Intuitive Warrior Yog",
      digits: [9, 7, 2],
      type: "Major",
      isPresent: has(9) && has(7) && has(2),
      meaning: "Supreme emotional courage, physical stamina, protective instincts, and artistic intuition."
    },
    {
      name: "3-6-2 Sacred Education & Knowledge Yog",
      digits: [3, 6, 2],
      type: "Major",
      isPresent: has(3) && has(6) && has(2),
      meaning: "Academic brilliance, artistic mastery, higher wisdom, teaching success, and magnetic charm."
    },
    {
      name: "1-7-8 Spiritual Socialist & Justice Yog",
      digits: [1, 7, 8],
      type: "Major",
      isPresent: has(1) && has(7) && has(8),
      meaning: "Unshakable sense of justice, humanitarian leadership, institutional building, and reform drive."
    },
    {
      name: "2-8-4 Hard Work & Health Vigilance Yog",
      digits: [2, 8, 4],
      type: "Major",
      isPresent: has(2) && has(8) && has(4),
      meaning: "Demands persistent hard work, resilience, and attention to bone/joint and digestive care.",
      remedy: "Donate sesame oil and food on Saturdays."
    },
    {
      name: "6-7-5 Commercial Business Success Yog",
      digits: [6, 7, 5],
      type: "Major",
      isPresent: has(6) && has(7) && has(5),
      meaning: "High business acumen, trading success, luxury brand attraction, and international expansion."
    },
    {
      name: "9-5-4 Bandhan & Constraint Yog",
      digits: [9, 5, 4],
      type: "Major",
      isPresent: has(9) && has(5) && has(4),
      meaning: "Indicates feelings of limitation or legal/contractual constraints requiring ethical transparency.",
      remedy: "Feed birds daily and avoid speculative contracts."
    }
  ];

  // Trine Yogas
  const trineYogas: VedicYogaResult[] = [
    {
      name: "3-9-8 Divine Protection Trine",
      digits: [3, 9, 8],
      type: "Trine",
      isPresent: has(3) && has(9) && has(8),
      meaning: "Combines wisdom, courage, and discipline into long-term institutional leadership."
    },
    {
      name: "6-9-4 Luxury & Material Creation Trine",
      digits: [6, 9, 4],
      type: "Trine",
      isPresent: has(6) && has(9) && has(4),
      meaning: "Rapid wealth creation through technology, luxury real estate, and media."
    },
    {
      name: "1-2-4 Royalty & Public Influence Trine",
      digits: [1, 2, 4],
      type: "Trine",
      isPresent: has(1) && has(2) && has(4),
      meaning: "Public magnetism, diplomatic authority, and innovative governance."
    }
  ];

  // L-Shape Yogas
  const lShapeYogas: VedicYogaResult[] = [
    {
      name: "9-1-7 Strategic Leadership L-Yog",
      digits: [9, 1, 7],
      type: "L-Shape",
      isPresent: has(9) && has(1) && has(7),
      meaning: "Deep research intuition paired with royal leadership and strategic execution."
    },
    {
      name: "1-3-6 Enlightened Educator L-Yog",
      digits: [1, 3, 6],
      type: "L-Shape",
      isPresent: has(1) && has(3) && has(6),
      meaning: "Combines authority, divine wisdom, and artistic grace into mentorship excellence."
    },
    {
      name: "7-5-4 Technical Research L-Yog",
      digits: [7, 5, 4],
      type: "L-Shape",
      isPresent: has(7) && has(5) && has(4),
      meaning: "Exceptional mastery in IT, data science, research patents, and financial technology."
    }
  ];

  // Drishti Yogas (Opposite Aspect Alignment)
  const drishtiYogas: VedicYogaResult[] = [
    {
      name: "3-4 Drishti (Guru - Rahu Horizon)",
      digits: [3, 4],
      type: "Drishti",
      isPresent: has(3) && has(4),
      meaning: "Guru-Chandal aspect; brings unconventional wisdom and high tech innovation.",
      remedy: "Worship Lord Vishnu on Thursdays."
    },
    {
      name: "1-8 Drishti (Surya - Shani Horizon)",
      digits: [1, 8],
      type: "Drishti",
      isPresent: has(1) && has(8),
      meaning: "Father-Son aspect; creates initial friction that matures into unshakeable empire.",
      remedy: "Offer water to Sun at sunrise and light sesame oil lamp on Saturday."
    },
    {
      name: "9-2 Drishti (Mangal - Chandra Horizon)",
      digits: [9, 2],
      type: "Drishti",
      isPresent: has(9) && has(2),
      meaning: "Chandra-Mangal Lakshmi Yoga; attracts high liquidity and real estate prosperity."
    }
  ];

  return {
    grid,
    majorYogas,
    trineYogas,
    lShapeYogas,
    drishtiYogas
  };
}
