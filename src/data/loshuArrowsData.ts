// src/data/loshuArrowsData.ts
// Complete Data for Chapter Twenty-Six: The Arrows of Strength and Weakness
// Contains 8 Arrows of Strength & 8 Arrows of Weakness + Partial & Multiple Arrow Principles in detailed paragraphs (No worked personal examples).

export interface LoShuArrowDetail {
  id: string;
  arrowNumber: number;
  name: string;
  type: "Strength" | "Weakness";
  positions: number[];
  lineName: string;
  coreMeaning: string;
  manifestationInLife: string;
  professionalAndRelationalImpact: string;
  remediesAndPractices?: {
    practicalGuidance: string[];
    gemstone?: string;
    gemstoneUsage?: string;
    mantra?: string;
    mantraPractice?: string;
    dailyHabit?: string;
  };
}

export const ARROWS_OF_STRENGTH_DATA: LoShuArrowDetail[] = [
  {
    id: "intellect",
    arrowNumber: 1,
    name: "Arrow 1 of Strength — Arrow of Intellect / Mental",
    type: "Strength",
    positions: [4, 9, 2],
    lineName: "Top Horizontal Row (4-9-2)",
    coreMeaning: "The Arrow of Intellect is formed when all three positions of the top row — Practicality (4), Ambition (9), and Intuition (2) — are fully occupied by digits from the birth date. This configuration integrates practical planning intelligence, ambitious visionary thinking, and direct intuitive perception into a single, highly potent cognitive capability. The individual possesses exceptional memory retention, rapid logical analysis, and the rare ability to conceptualize multi-layered strategic plans with remarkable clarity.",
    manifestationInLife: "Individuals with the Arrow of Intellect demonstrate sharp analytical skills, excellent information processing, and a natural gift for strategic foresight. They do not merely accumulate facts; they systematically organize information into coherent frameworks that yield profound insights. Their ambition gives forward momentum to their thinking, while intuitive perception allows them to recognize subtle dynamics that purely mechanical logic misses.",
    professionalAndRelationalImpact: "In professional spheres, these individuals excel as strategists, researchers, leaders, counselors, and planners. In relationships, they bring perceptive awareness and thoughtful problem-solving, though they must cultivate patience when communicating complex ideas at a pace that others can absorb."
  },
  {
    id: "emotional_balance",
    arrowNumber: 2,
    name: "Arrow 2 of Strength — Arrow of Emotional Balance / Spirituality",
    type: "Strength",
    positions: [3, 5, 7],
    lineName: "Middle Horizontal Row (3-5-7)",
    coreMeaning: "The Arrow of Emotional Balance is formed when all three positions of the middle row — Action (3), Will (5), and Analytical Thinking (7) — are fully occupied. This represents complete inner integration: decisive initiative combined with central willpower and deep self-reflective intelligence. It is termed the Arrow of Spirituality because it provides the exact inner discipline, empathy, and emotional equilibrium required for genuine spiritual maturity and self-mastery.",
    manifestationInLife: "People carrying this Arrow display remarkable emotional stability, deep empathy, and an unshakeable inner compass. Their compassion is active rather than passive — they take concrete action to assist others while maintaining central emotional poise. Their analytical self-reflection prevents emotional volatility, allowing them to navigate severe life storms with calm dignity.",
    professionalAndRelationalImpact: "They thrive in professions requiring sustained empathy, leadership, counseling, research, and spiritual guidance. In personal relationships, they act as pillars of strength, offering steady emotional support and authentic, reliable presence."
  },
  {
    id: "practicality",
    arrowNumber: 3,
    name: "Arrow 3 of Strength — Arrow of Practicality",
    type: "Strength",
    positions: [8, 1, 6],
    lineName: "Bottom Horizontal Row (8-1-6)",
    coreMeaning: "The Arrow of Practicality forms when all three positions of the bottom row — Wisdom (8), Communication (1), and Creativity (6) — are fully occupied. This represents the complete toolkit for practical contribution in the material world: experience-tested wisdom to know what is worth building, fluent communication to share ideas, and creative originality to execute distinctively.",
    manifestationInLife: "Individuals with this Arrow possess an outstanding work ethic, realistic grounded judgment, and reliable execution capabilities. They excel at converting abstract concepts into tangible physical and financial realities. They finish what they start with high standards of craftsmanship and commercial viability.",
    professionalAndRelationalImpact: "Highly valued in business management, entrepreneurship, engineering, architecture, and practical arts. They provide stable material security and clear communication in domestic and professional life."
  },
  {
    id: "planning",
    arrowNumber: 4,
    name: "Arrow 4 of Strength — Arrow of Planning / Thought",
    type: "Strength",
    positions: [4, 3, 8],
    lineName: "Left Vertical Column (4-3-8)",
    coreMeaning: "The Arrow of Planning is formed when all three positions of the left column — Practicality (4), Action (3), and Wisdom (8) — are fully occupied. This unites structured planning, decisive execution momentum, and integrated wisdom into a powerful strategic execution engine.",
    manifestationInLife: "People with this Arrow demonstrate exceptional organizational brilliance. They do not merely follow routine systems; they design master strategies, anticipate operational obstacles, and execute with decisive precision and moral authority.",
    professionalAndRelationalImpact: "Superior performance in project management, executive leadership, institutional building, and complex logistics where long-term strategic vision must be flawlessly executed."
  },
  {
    id: "determination",
    arrowNumber: 5,
    name: "Arrow 5 of Strength — Arrow of Determination / Will",
    type: "Strength",
    positions: [9, 5, 1],
    lineName: "Centre Vertical Column (9-5-1)",
    coreMeaning: "The Arrow of Determination constitutes the central vertical spine of the Lo Shu Grid — linking high ambition (9), central willpower (5), and expressive communication (1). This is the supreme Arrow of persistent leadership, unshakeable drive, and persuasive influence.",
    manifestationInLife: "Individuals carrying this central spine possess extraordinary perseverance. They view setbacks as temporary hurdles and maintain unwavering commitment to their long-term goals. Their natural eloquence allows them to inspire and rally others around a shared vision.",
    professionalAndRelationalImpact: "Natural leaders, social pioneers, executive officers, and motivators who inspire confidence and sustain momentum across extended undertakings."
  },
  {
    id: "activity",
    arrowNumber: 6,
    name: "Arrow 6 of Strength — Arrow of Activity / Action",
    type: "Strength",
    positions: [2, 7, 6],
    lineName: "Right Vertical Column (2-7-6)",
    coreMeaning: "The Arrow of Activity forms when all three positions of the right column — Intuition (2), Analytical Thinking (7), and Creativity (6) — are fully occupied. This represents intelligent, perception-informed, creatively-expressed execution.",
    manifestationInLife: "People with this rare Arrow combine physical dynamism with intuitive sensitivity and artistic flair. They act with precision, timing, and creative elegance, solving complex problems through innovative, non-conventional approaches.",
    professionalAndRelationalImpact: "Excel in creative arts, design, athletic mastery, surgical precision, technology innovation, and dynamic real-world problem solving."
  },
  {
    id: "prosperity",
    arrowNumber: 7,
    name: "Arrow 7 of Strength — Arrow of Prosperity / Golden Success",
    type: "Strength",
    positions: [4, 5, 6],
    lineName: "Main Diagonal Axis (4-5-6)",
    coreMeaning: "The Arrow of Prosperity (Golden Raj Yoga) connects practical planning (4), central willpower (5), and creative expression (6) along the main diagonal. It represents the alchemical journey of transforming structured plans through sustained effort into golden material and artistic accomplishments.",
    manifestationInLife: "Endows the individual with a natural mid-life trajectory toward substantial financial abundance, commercial success, and artistic distinction. Their success stems from methodical preparation, sustained discipline, and unique creative polish.",
    professionalAndRelationalImpact: "High achievement in commerce, real estate, executive management, and creative industries, bringing long-term material stability and public recognition."
  },
  {
    id: "peace",
    arrowNumber: 8,
    name: "Arrow 8 of Strength — Arrow of Peace / Silver Success",
    type: "Strength",
    positions: [2, 5, 8],
    lineName: "Secondary Diagonal Axis (2-5-8)",
    coreMeaning: "The Arrow of Peace (Silver Raj Yoga) links intuitive perception (2), central balance (5), and integrated wisdom (8) along the secondary diagonal. It represents deep emotional equilibrium, mental peace, real estate luck, and spiritual maturity.",
    manifestationInLife: "Produces individuals of serene presence, immense patience, and profound inner quietude. They possess an instinctive understanding of natural timing and real estate asset accumulation.",
    professionalAndRelationalImpact: "Highly effective in counseling, healing arts, real estate investment, spiritual teaching, and conflict mediation, radiating calming stability."
  }
];

export const ARROWS_OF_WEAKNESS_DATA: LoShuArrowDetail[] = [
  {
    id: "poor_memory",
    arrowNumber: 9,
    name: "Arrow 1 of Weakness — Arrow of Poor Memory",
    type: "Weakness",
    positions: [4, 9, 2],
    lineName: "Top Horizontal Row (4-9-2 Missing)",
    coreMeaning: "The Arrow of Poor Memory occurs when positions 4, 9, and 2 are all empty in the birth date grid. This indicates a developmental challenge in systematic information retention, logical sequential organization, and long-term strategic vision.",
    manifestationInLife: "Individuals may struggle with retaining detailed facts, dates, or complex sequential instructions. Their thinking tends to be associative and impressionistic rather than linear, leading to disorganization if external systems are not used.",
    professionalAndRelationalImpact: "Requires conscious reliance on external organizational tools, written notes, and digital schedules to prevent missed commitments and mental clutter.",
    remediesAndPractices: {
      practicalGuidance: [
        "Implement a non-negotiable daily written journal and digital task planner.",
        "Break complex long-term projects into small, written sequential steps.",
        "Use visual mind-mapping techniques to organize ideas before execution."
      ],
      gemstone: "Yellow Sapphire (Pukhraj) or Citrine",
      gemstoneUsage: "Set in gold or brass ring, worn on the index finger on Thursday morning.",
      mantra: "Om Gurave Namaha",
      mantraPractice: "Chant 108 times on Thursday mornings during sunrise.",
      dailyHabit: "Spend 10 minutes every evening reviewing tomorrow's scheduled tasks in writing."
    }
  },
  {
    id: "frustration",
    arrowNumber: 10,
    name: "Arrow 2 of Weakness — Arrow of Frustration / Suspicion",
    type: "Weakness",
    positions: [3, 5, 7],
    lineName: "Middle Horizontal Row (3-5-7 Missing)",
    coreMeaning: "The Arrow of Frustration forms when middle row positions 3, 5, and 7 are all absent. Because this row represents the core inner motivating spine, its complete absence creates recurring internal self-doubt, emotional vulnerability, and trust difficulties.",
    manifestationInLife: "The individual may experience chronic hesitation, questioning their own capabilities and motives. Without central willpower (5) and analytical reflection (7), minor setbacks can trigger disproportionate emotional frustration or suspicion toward others.",
    professionalAndRelationalImpact: "May lead to defensive withdrawal or abandoning projects prematurely. Building steady inner routines and objective analytical self-inquiry is essential.",
    remediesAndPractices: {
      practicalGuidance: [
        "Establish one fixed daily physical action routine completed every morning without fail.",
        "Practice objective evening self-reflection journaling: note 3 factual successes daily.",
        "Commit to a 90-day unbroken streak on a single chosen priority to build volitional strength."
      ],
      gemstone: "Red Coral (Moonga)",
      gemstoneUsage: "Set in silver or gold ring, worn on the ring finger on Tuesday morning.",
      mantra: "Om Mangalaya Namaha",
      mantraPractice: "Chant 108 times on Tuesday mornings.",
      dailyHabit: "Perform 15 minutes of grounding physical exercise or yoga at sunrise."
    }
  },
  {
    id: "material_losses",
    arrowNumber: 11,
    name: "Arrow 3 of Weakness — Arrow of Material Losses",
    type: "Weakness",
    positions: [8, 1, 6],
    lineName: "Bottom Horizontal Row (8-1-6 Missing)",
    coreMeaning: "The Arrow of Material Losses forms when positions 8, 1, and 6 are all empty. This highlights a developmental challenge in commercial management, practical execution, and financial retention.",
    manifestationInLife: "While earning capacity may be normal or high, retaining wealth and managing practical day-to-day business affairs requires continuous conscious effort. Financial records and physical spaces tend to become disorganized.",
    professionalAndRelationalImpact: "Requires delegating financial administration to trusted professionals or establishing strict automated saving and budgeting protocols.",
    remediesAndPractices: {
      practicalGuidance: [
        "Automate financial savings transfers on the first day of every month.",
        "Hire professional accountants or advisors for contract and financial management.",
        "Keep living and workspace environments strictly clutter-free and systematically organized."
      ],
      gemstone: "Hessonite Garnet (Gomed) or Tiger's Eye",
      gemstoneUsage: "Worn on the middle finger on Saturday evening.",
      mantra: "Om Rahave Namaha",
      mantraPractice: "Chant 108 times on Saturday evenings.",
      dailyHabit: "Maintain a daily expense tracking log with zero exceptions."
    }
  },
  {
    id: "confusion",
    arrowNumber: 12,
    name: "Arrow 4 of Weakness — Arrow of Confusion",
    type: "Weakness",
    positions: [4, 3, 8],
    lineName: "Left Vertical Column (4-3-8 Missing)",
    coreMeaning: "The Arrow of Confusion forms when left column positions 4, 3, and 8 are all absent. This creates difficulty in organizing abstract thoughts into logical communicable plans and executing them with structured wisdom.",
    manifestationInLife: "The individual may possess brilliant creative or emotional ideas but struggles to build the practical roadmap necessary to realize them, leading to feeling overwhelmed by details.",
    professionalAndRelationalImpact: "Benefits immensely from partnering with highly structured, methodical collaborators who handle operational execution.",
    remediesAndPractices: {
      practicalGuidance: [
        "Study strategic planning frameworks and written project management methods.",
        "Take one immediate concrete physical action toward a goal before over-analyzing it.",
        "Work with a professional mentor or coach to build structured 6-month roadmaps."
      ],
      gemstone: "Blue Sapphire (Neelam) or Lapis Lazuli",
      gemstoneUsage: "Set in silver or steel ring, worn on the middle finger on Saturday morning.",
      mantra: "Om Shanaischaraya Namaha",
      mantraPractice: "Chant 108 times on Saturday mornings.",
      dailyHabit: "Write down a 3-step prioritized action plan every morning."
    }
  },
  {
    id: "indecision",
    arrowNumber: 13,
    name: "Arrow 5 of Weakness — Arrow of Indecision / Apathy",
    type: "Weakness",
    positions: [9, 5, 1],
    lineName: "Centre Vertical Column (9-5-1 Missing)",
    coreMeaning: "The Arrow of Indecision forms when the central vertical spine (9, 5, and 1) is completely empty. This indicates a challenge in self-generated ambition, persistent willpower, and assertive communication.",
    manifestationInLife: "The person may lean heavily on others to make decisions or set direction. Generating internal motivation without external pressure requires deliberate mental cultivation.",
    professionalAndRelationalImpact: "Developing personal autonomy, speaking up in social settings, and holding long-term individual goals are critical growth priorities.",
    remediesAndPractices: {
      practicalGuidance: [
        "Write one personal aspirational goal every morning and speak it aloud 3 times.",
        "Practice making independent decisions in daily choices without asking for external consensus.",
        "Engage in individual competitive sports or fitness challenges to build personal drive."
      ],
      gemstone: "Ruby (Manik) or Red Garnet",
      gemstoneUsage: "Set in gold or copper ring, worn on the ring finger on Sunday morning.",
      mantra: "Om Suryaya Namaha",
      mantraPractice: "Chant 108 times at sunrise on Sunday mornings.",
      dailyHabit: "Perform 10 minutes of morning sun meditation (Surya Namaskar)."
    }
  },
  {
    id: "loneliness",
    arrowNumber: 14,
    name: "Arrow 6 of Weakness — Arrow of Loneliness / Inactivity",
    type: "Weakness",
    positions: [2, 7, 6],
    lineName: "Right Vertical Column (2-7-6 Missing)",
    coreMeaning: "The Arrow of Loneliness occurs when right column positions 2, 7, and 6 are all absent. This points to hesitation in dynamic action, social isolation tendencies, and reserved self-expression.",
    manifestationInLife: "Social situations may feel effortful, leading to gradual retreat into solitude. Hesitation before taking action stems from uncertainty in reading intuitive subtle cues.",
    professionalAndRelationalImpact: "Joining structured community groups, practicing creative hobbies, and consciously cultivating interpersonal warmth build expressive confidence.",
    remediesAndPractices: {
      practicalGuidance: [
        "Join a weekly group class (art, music, public speaking, or community service).",
        "Engage in daily creative self-expression (painting, writing, design, or music).",
        "Practice active listening and conscious empathetic check-ins with friends."
      ],
      gemstone: "Emerald (Panna) or Green Tourmaline",
      gemstoneUsage: "Set in gold ring, worn on the little finger on Wednesday morning.",
      mantra: "Om Budhaya Namaha",
      mantraPractice: "Chant 108 times on Wednesday mornings.",
      dailyHabit: "Dedicate 20 minutes daily to an artistic or creative hobby."
    }
  },
  {
    id: "financial_struggle",
    arrowNumber: 15,
    name: "Arrow 7 of Weakness — Arrow of Financial / Success Struggle",
    type: "Weakness",
    positions: [4, 5, 6],
    lineName: "Main Diagonal Axis (4-5-6 Missing)",
    coreMeaning: "The Arrow of Financial Struggle forms when main diagonal positions 4, 5, and 6 are all absent. This represents career friction, where hard work often yields lower immediate material rewards than anticipated.",
    manifestationInLife: "Success requires systematic skill acquisition and long-term discipline rather than relying on rapid luck. Career advancement proceeds reactively unless structured strategic planning is enforced.",
    professionalAndRelationalImpact: "Developing deep specialized expertise and maintaining strict long-term financial reserves buffer against economic cycles.",
    remediesAndPractices: {
      practicalGuidance: [
        "Work with a financial counselor to build automated wealth accumulation habits.",
        "Focus on mastering one specialized professional domain to expert level.",
        "Maintain a 6-month emergency reserve fund at all times."
      ],
      gemstone: "Yellow Sapphire (Pukhraj) & Diamond/Zircon",
      gemstoneUsage: "Worn on index finger (Thursday) and little finger (Friday).",
      mantra: "Om Shrim Mahalakshmiyei Namaha",
      mantraPractice: "Chant 108 times on Friday evenings.",
      dailyHabit: "Review long-term career milestone progress weekly."
    }
  },
  {
    id: "instability",
    arrowNumber: 16,
    name: "Arrow 8 of Weakness — Arrow of Instability",
    type: "Weakness",
    positions: [2, 5, 8],
    lineName: "Secondary Diagonal Axis (2-5-8 Missing)",
    coreMeaning: "The Arrow of Instability forms when secondary diagonal positions 2, 5, and 8 are all missing. This indicates emotional volatility, low patience, and difficulty maintaining central grounding during stress.",
    manifestationInLife: "The individual may react impulsively to unexpected events, experiencing mood fluctuations or restlessness when delayed. Building inner stillness is the supreme developmental remedy.",
    professionalAndRelationalImpact: "Requires grounding meditation practices, emotional self-regulation, and patience in personal and business relationships.",
    remediesAndPractices: {
      practicalGuidance: [
        "Practice daily breathwork (Pranayama) and 15 minutes of quiet meditation.",
        "Pause for 3 conscious deep breaths before responding during frustrating moments.",
        "Keep a daily wisdom journal recording lessons learned from life challenges."
      ],
      gemstone: "Pearl (Moti) or Moonstone",
      gemstoneUsage: "Set in silver ring, worn on the little finger on Monday evening.",
      mantra: "Om Chandraya Namaha",
      mantraPractice: "Chant 108 times on Monday evenings.",
      dailyHabit: "Practice 15 minutes of silent mindfulness meditation at dusk."
    }
  }
];

export const CHAPTER_TWENTY_SIX_THEORY_TEXT = {
  chapterNumber: "Chapter Twenty-Six",
  title: "The Arrows of Strength and Weakness",
  quote: {
    text: "Where all three unite, a superpower is born. Where all three are absent, a great lesson awaits.",
    author: "Lo Shu Tradition"
  },
  introductionText: [
    "In Lo Shu Grid numerology, the Arrows represent complete vertical, horizontal, or diagonal lines of force across the 3x3 magic square. When all three cells in any line are occupied by digits from the birth date, an Arrow of Strength is activated — forming a unified, highly concentrated superpower.",
    "Conversely, when all three cells in a line are completely empty, an Arrow of Weakness is formed. An Arrow of Weakness is not a permanent curse or limitation; it is the most precisely configured developmental invitation available in the system, indicating where intentional, earned effort yields the most profound growth.",
    "Understanding these 16 Arrows (8 of Strength and 8 of Weakness) allows the numerologist to provide exact diagnostic insights and targeted remedies, including planetary gemstones, acoustic beeja mantras, and daily behavioral practices."
  ],
  partialAndMultipleArrowsText: [
    "In professional practice, many birth grids feature partial lines — where two cells are filled and one is empty (e.g., 67% complete line). A partial Arrow represents an emerging capacity where targeted focus on the single missing cell can activate the full superpower.",
    "When a grid exhibits multiple Arrows of Strength or Weakness, shared intersection cells act as central amplifiers. For example, Position 5 at the central Brahmasthan intersects four distinct lines — making its presence or absence a monumental factor in overall grid balance."
  ]
};

export interface DetectedArrowResult {
  activeStrength: LoShuArrowDetail[];
  activeWeakness: LoShuArrowDetail[];
  partialStrength: { arrow: LoShuArrowDetail; filled: number[]; missing: number[] }[];
}

export function evaluateBirthDateArrows(dob: string, driverNum?: number, conductorNum?: number): DetectedArrowResult {
  const digits = dob.replace(/[^0-9]/g, "").split("").map(Number);
  if (driverNum && driverNum >= 1 && driverNum <= 9) digits.push(driverNum);
  if (conductorNum && conductorNum >= 1 && conductorNum <= 9) digits.push(conductorNum);

  const presentSet = new Set<number>(digits.filter(d => d >= 1 && d <= 9));

  const activeStrength: LoShuArrowDetail[] = [];
  const activeWeakness: LoShuArrowDetail[] = [];
  const partialStrength: { arrow: LoShuArrowDetail; filled: number[]; missing: number[] }[] = [];

  ARROWS_OF_STRENGTH_DATA.forEach(strArrow => {
    const filled = strArrow.positions.filter(p => presentSet.has(p));
    const missing = strArrow.positions.filter(p => !presentSet.has(p));

    if (filled.length === 3) {
      activeStrength.push(strArrow);
    } else if (filled.length === 2) {
      partialStrength.push({ arrow: strArrow, filled, missing });
    }
  });

  ARROWS_OF_WEAKNESS_DATA.forEach(wkArrow => {
    const missingCount = wkArrow.positions.filter(p => !presentSet.has(p)).length;
    if (missingCount === 3) {
      activeWeakness.push(wkArrow);
    }
  });

  return { activeStrength, activeWeakness, partialStrength };
}

