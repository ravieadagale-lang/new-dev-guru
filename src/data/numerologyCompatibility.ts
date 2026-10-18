// src/data/numerologyCompatibility.ts
// Chapter Twenty-Three: Compatibility — Friend, Enemy and Neutral Numbers Engine & Database
// Standalone data and calculation module for complete Chaldean & Pythagorean Numerological Compatibility across Personal, Professional, and Romantic domains.

export type CompatibilityType = "Friend" | "Neutral" | "Enemy";

export interface DomainAnalysis {
  type: CompatibilityType;
  dynamics: string;
  strengths: string[];
  challenges: string[];
  strategicAdvice: string;
}

export interface PairCompatibilityDetail {
  numA: number;
  numB: number;
  overallType: CompatibilityType;
  summary: string;
  personalDomain: DomainAnalysis;
  professionalDomain: DomainAnalysis;
  romanticDomain: DomainAnalysis;
}

export interface LifePathCompatibilityProfile {
  number: number;
  title: string;
  archetype: string;
  vibrationalCharacter: string;
  friendNumbers: number[];
  neutralNumbers: number[];
  enemyNumbers: number[];
  tableSummary: {
    personal: { friends: number[]; neutral: number[]; enemies: number[] };
    professional: { friends: number[]; neutral: number[]; enemies: number[] };
    romantic: { friends: number[]; neutral: number[]; enemies: number[] };
  };
}

export interface ChapterTwentyThreeTheoryData {
  title: string;
  subtitle: string;
  quote: {
    text: string;
    author: string;
  };
  introParagraphs: string[];
  compatibilityCategories: {
    friend: string;
    neutral: string;
    enemy: string;
  };
  fourLayerSystem: {
    layer1LifePath: string;
    layer2Expression: string;
    layer3SoulUrge: string;
    layer4BirthNumber: string;
  };
  masterNumberRules: {
    master11: string;
    master22: string;
    master33: string;
  };
  specialDomains: {
    parentChild: string;
    businessPartnership: string;
    teamDynamics: string;
  };
}

export const CHAPTER_TWENTY_THREE_THEORY_DATA: ChapterTwentyThreeTheoryData = {
  title: "Compatibility — Friend, Enemy and Neutral Numbers",
  subtitle: "The Science of Numerical Synergy Across Personal, Professional, and Romantic Relationships",
  quote: {
    text: "Coming together is a beginning, staying together is progress, and working together is success.",
    author: "Henry Ford"
  },
  introParagraphs: [
    "Compatibility analysis is one of the most practically consequential applications of numerology. When two people interact—in love, business, family, or friendship—their unique vibrational profiles come into contact, generating natural resonance, productive tension, or recurring friction.",
    "The primary lens for compatibility assessment is the Life Path Number, representing the soul's fundamental road. Secondary layers—Expression Number, Soul Urge Number, and Birth Number—provide granular clarity on professional, deep motivational, and daily interaction styles.",
    "Friend Numbers naturally complement and amplify each other. Neutral Numbers create workable friction that yields growth when consciously managed. Enemy Numbers carry fundamental tension requiring explicit protocol and mutual understanding to prevent exhausting conflict."
  ],
  compatibilityCategories: {
    friend: "Friend Numbers possess harmonious vibrations that effortlessly support, inspire, and elevate one another. Communication flows naturally, and values align with minimal conflict.",
    neutral: "Neutral Numbers carry distinct orientations that require conscious effort and mutual accommodation. While not naturally synchronous, they offer constructive multi-dimensional expansion.",
    enemy: "Enemy Numbers exist in structural vibrational tension. Left unmanaged, they produce recurring misunderstandings and power struggles. However, with self-awareness, they can catalyze profound growth."
  },

  fourLayerSystem: {
    layer1LifePath: "Layer 1 — Life Path Compatibility: The primary foundation indicating the fundamental alignment of life directions and core spiritual roads.",
    layer2Expression: "Layer 2 — Expression Compatibility: Determines operational working styles, natural talents, and collaborative effectiveness in professional endeavors.",
    layer3SoulUrge: "Layer 3 — Soul Urge Compatibility: Evaluates emotional resonance, deepest inner desires, and intimate romantic compatibility.",
    layer4BirthNumber: "Layer 4 — Birth Number Compatibility: Reflects daily interaction habits, instinctive reactions, and immediate personal rapport."
  },

  masterNumberRules: {
    master11: "Master 11 operates through root vibration 2 for primary compatibility, while demanding elevated spiritual sensitivity and intuitive understanding from partners.",
    master22: "Master 22 operates through root vibration 4 for structure, requiring partners who respect large-scale visionary building and disciplined execution.",
    master33: "Master 33 operates through root vibration 6, demanding selfless devotion, unconditional love, and transformative service in relationships."
  },

  specialDomains: {
    parentChild: "Understanding parent-child compatibility helps parents tailor their nurturing style to respect the child's innate road—avoiding forcing rigid structures on free-spirited children.",
    businessPartnership: "Evaluating Life Path and Expression compatibility prevents catastrophic commercial deadlocks by ensuring complementary operational and strategic roles.",
    teamDynamics: "A balanced team integrates visionary initiators (1, 5), cooperative nurturers (2, 6), disciplined builders (4, 8), and analytical strategists (7, 9)."
  }
};

// COMPATIBILITY PROFILES FOR NUMBERS 1-9 & MASTERS 11, 22, 33

export const LIFE_PATH_COMPATIBILITY_PROFILES: Record<number, LifePathCompatibilityProfile> = {
  1: {
    number: 1,
    title: "Life Path 1 — The Pioneer's Compatibility",
    archetype: "Independent Leader & Original Initiator",
    vibrationalCharacter: "Courageous, self-directed, direct, and focused on pioneering new achievements. Demands autonomy and peer respect.",
    friendNumbers: [1, 5, 7],
    neutralNumbers: [2, 4, 6, 9],
    enemyNumbers: [3, 8],
    tableSummary: {
      personal: { friends: [1, 5, 7], neutral: [2, 4, 6, 9], enemies: [3, 8] },
      professional: { friends: [1, 5, 7], neutral: [4, 6, 9], enemies: [3, 8, 2] },
      romantic: { friends: [5, 7], neutral: [2, 4, 6, 9], enemies: [3, 8, 1] }
    }
  },

  2: {
    number: 2,
    title: "Life Path 2 — The Diplomat's Compatibility",
    archetype: "Cooperative Peacemaker & Relational Guide",
    vibrationalCharacter: "Sensitive, intuitive, diplomatic, and deeply attuned to harmony and partnership. Thrives on mutual respect and gentle co-creation.",
    friendNumbers: [2, 4, 6, 8],
    neutralNumbers: [3, 7, 9],
    enemyNumbers: [1, 5],
    tableSummary: {
      personal: { friends: [2, 4, 6, 8], neutral: [3, 7, 9], enemies: [1, 5] },
      professional: { friends: [4, 6, 8], neutral: [3, 7, 9], enemies: [1, 5] },
      romantic: { friends: [4, 6, 8], neutral: [3, 7, 9], enemies: [1, 5] }
    }
  },

  3: {
    number: 3,
    title: "Life Path 3 — The Creator's Compatibility",
    archetype: "Expressive Communicator & Joyful Artist",
    vibrationalCharacter: "Creative, optimistic, socially charismatic, and communicative. Brings enthusiasm, warmth, and artistic vitality to connections.",
    friendNumbers: [3, 6, 9],
    neutralNumbers: [2, 5, 7],
    enemyNumbers: [1, 4, 8],
    tableSummary: {
      personal: { friends: [3, 6, 9], neutral: [2, 5, 7], enemies: [1, 4, 8] },
      professional: { friends: [6, 9], neutral: [2, 5, 7], enemies: [1, 4, 8] },
      romantic: { friends: [6, 9], neutral: [2, 5, 7], enemies: [1, 4, 8] }
    }
  },

  4: {
    number: 4,
    title: "Life Path 4 — The Builder's Compatibility",
    archetype: "Methodical Organizer & Grounded Foundation",
    vibrationalCharacter: "Disciplined, practical, loyal, and systematic. Offers unwavering security and structured execution.",
    friendNumbers: [2, 4, 6, 8],
    neutralNumbers: [1, 7, 9],
    enemyNumbers: [3, 5],
    tableSummary: {
      personal: { friends: [2, 4, 6, 8], neutral: [1, 7, 9], enemies: [3, 5] },
      professional: { friends: [2, 4, 6, 8], neutral: [1, 7, 9], enemies: [3, 5] },
      romantic: { friends: [2, 6, 8], neutral: [1, 7, 9], enemies: [3, 5, 4] }
    }
  },

  5: {
    number: 5,
    title: "Life Path 5 — The Explorer's Compatibility",
    archetype: "Dynamic Catalyst & Freedom-Loving Adventurer",
    vibrationalCharacter: "Versatile, adventurous, adaptable, and magnetic. Seeks constant expansion, direct experience, and personal liberty.",
    friendNumbers: [1, 5, 7],
    neutralNumbers: [3, 6, 9],
    enemyNumbers: [2, 4, 8],
    tableSummary: {
      personal: { friends: [1, 5, 7], neutral: [3, 6, 9], enemies: [2, 4, 8] },
      professional: { friends: [1, 7], neutral: [3, 6, 9], enemies: [2, 4, 8] },
      romantic: { friends: [1, 7], neutral: [3, 9], enemies: [2, 4, 5, 8] }
    }
  },

  6: {
    number: 6,
    title: "Life Path 6 — The Nurturer's Compatibility",
    archetype: "Harmonious Guardian & Compassionate Pillar",
    vibrationalCharacter: "Warm, responsible, family-centered, and protective. Devoted to creating beautiful, safe, and supportive environments.",
    friendNumbers: [2, 3, 6, 9],
    neutralNumbers: [1, 4, 8],
    enemyNumbers: [5, 7],
    tableSummary: {
      personal: { friends: [2, 3, 6, 9], neutral: [1, 4, 8], enemies: [5, 7] },
      professional: { friends: [2, 3, 9], neutral: [1, 4, 8], enemies: [5, 7] },
      romantic: { friends: [2, 3, 6, 9], neutral: [4, 8], enemies: [1, 5, 7] }
    }
  },

  7: {
    number: 7,
    title: "Life Path 7 — The Seeker's Compatibility",
    archetype: "Analytical Truth-Seeker & Introspective Sage",
    vibrationalCharacter: "Deep, analytical, contemplative, and spiritually attuned. Requires personal solitude, intellectual depth, and mutual respect.",
    friendNumbers: [1, 5, 7],
    neutralNumbers: [2, 4, 9],
    enemyNumbers: [3, 6, 8],
    tableSummary: {
      personal: { friends: [1, 5, 7], neutral: [2, 4, 9], enemies: [3, 6, 8] },
      professional: { friends: [1, 4, 5], neutral: [2, 9], enemies: [3, 6, 8] },
      romantic: { friends: [5, 7], neutral: [2, 4, 9], enemies: [1, 3, 6, 8] }
    }
  },

  8: {
    number: 8,
    title: "Life Path 8 — The Authority's Compatibility",
    archetype: "Executive Strategist & Master of Material Realities",
    vibrationalCharacter: "Ambitious, commanding, strategically brilliant, and goal-oriented. Provides material security and executive leadership.",
    friendNumbers: [2, 4, 6],
    neutralNumbers: [3, 9],
    enemyNumbers: [1, 5, 7, 8],
    tableSummary: {
      personal: { friends: [2, 4, 6], neutral: [3, 9], enemies: [1, 5, 7, 8] },
      professional: { friends: [2, 4, 6], neutral: [3, 9], enemies: [1, 5, 7] },
      romantic: { friends: [2, 4, 6], neutral: [9], enemies: [1, 3, 5, 7, 8] }
    }
  },

  9: {
    number: 9,
    title: "Life Path 9 — The Humanitarian's Compatibility",
    archetype: "Universal Humanitarian & Compassionate Visionary",
    vibrationalCharacter: "Broad-minded, selfless, wise, and altruistic. Connects through universal purpose, artistic depth, and global vision.",
    friendNumbers: [3, 6, 9],
    neutralNumbers: [1, 2, 4, 7, 8],
    enemyNumbers: [5],
    tableSummary: {
      personal: { friends: [3, 6, 9], neutral: [1, 2, 4, 7, 8], enemies: [5] },
      professional: { friends: [3, 6], neutral: [1, 2, 4, 7, 8], enemies: [5] },
      romantic: { friends: [3, 6, 9], neutral: [1, 2, 4, 7, 8], enemies: [5] }
    }
  },

  11: {
    number: 11,
    title: "Master Life Path 11 — Intuitive Illuminator",
    archetype: "Spiritual Visionary & Intuitive Channel",
    vibrationalCharacter: "High-frequency intuitive current operating through root 2. Demands deep spiritual attunement, emotional truth, and mutual elevation.",
    friendNumbers: [2, 4, 6, 8, 7, 22],
    neutralNumbers: [9, 33],
    enemyNumbers: [1, 3, 5],
    tableSummary: {
      personal: { friends: [2, 4, 6, 8, 7, 22], neutral: [9, 33], enemies: [1, 3, 5] },
      professional: { friends: [4, 8, 22], neutral: [2, 6, 7, 9], enemies: [1, 3, 5] },
      romantic: { friends: [2, 6, 22], neutral: [4, 7, 8, 33], enemies: [1, 3, 5] }
    }
  },

  22: {
    number: 22,
    title: "Master Life Path 22 — The Master Builder",
    archetype: "Architect of Legacy & Large-Scale Executor",
    vibrationalCharacter: "Combines 22/4 structural discipline with grand visionary scope. Seeks partners who support monumental, practical achievements.",
    friendNumbers: [4, 6, 8, 2, 11, 33],
    neutralNumbers: [1, 7, 9],
    enemyNumbers: [3, 5],
    tableSummary: {
      personal: { friends: [4, 6, 8, 2, 11, 33], neutral: [1, 7, 9], enemies: [3, 5] },
      professional: { friends: [4, 8, 11, 33], neutral: [1, 2, 6, 7, 9], enemies: [3, 5] },
      romantic: { friends: [4, 6, 11], neutral: [2, 8, 33], enemies: [3, 5] }
    }
  },

  33: {
    number: 33,
    title: "Master Life Path 33 — Master Teacher of Compassion",
    archetype: "Universal Healer & Altruistic Guide",
    vibrationalCharacter: "Combines 33/6 devotion with elevated cosmic love. Requires deep spiritual maturity, non-possessive caring, and shared humanitarian service.",
    friendNumbers: [6, 9, 11, 22],
    neutralNumbers: [2, 3, 4, 7, 8],
    enemyNumbers: [1, 5],
    tableSummary: {
      personal: { friends: [6, 9, 11, 22], neutral: [2, 3, 4, 7, 8], enemies: [1, 5] },
      professional: { friends: [6, 9, 22], neutral: [2, 3, 4, 7, 8], enemies: [1, 5] },
      romantic: { friends: [6, 9, 11, 22], neutral: [2, 3, 4, 7, 8], enemies: [1, 5] }
    }
  }
};

/**
 * PAIR-WISE COMPATIBILITY GENERATOR AND DATABASE
 * Provides detailed breakdown across Personal, Professional, and Romantic domains for any pair (1-9, 11, 22, 33).
 */

function reduceToSingle(num: number): number {
  if (num === 11 || num === 22 || num === 33) return num;
  let curr = num;
  while (curr > 9) {
    curr = String(curr).split("").reduce((a, b) => a + Number(b), 0);
  }
  return curr;
}

function getBaseSingle(num: number): number {
  if (num === 11) return 2;
  if (num === 22) return 4;
  if (num === 33) return 6;
  return reduceToSingle(num);
}

export function analyzePairCompatibility(num1: number, num2: number): PairCompatibilityDetail {
  const n1 = reduceToSingle(num1);
  const n2 = reduceToSingle(num2);

  const profile1 = LIFE_PATH_COMPATIBILITY_PROFILES[n1] || LIFE_PATH_COMPATIBILITY_PROFILES[1];
  const profile2 = LIFE_PATH_COMPATIBILITY_PROFILES[n2] || LIFE_PATH_COMPATIBILITY_PROFILES[1];

  // Determine overall type
  let overallType: CompatibilityType = "Neutral";
  if (profile1.friendNumbers.includes(n2) || profile2.friendNumbers.includes(n1)) {
    overallType = "Friend";
  } else if (profile1.enemyNumbers.includes(n2) || profile2.enemyNumbers.includes(n1)) {
    overallType = "Enemy";
  }

  // Domain types
  const persFriends = profile1.tableSummary.personal.friends.includes(n2);
  const persEnemies = profile1.tableSummary.personal.enemies.includes(n2);
  const persType: CompatibilityType = persFriends ? "Friend" : persEnemies ? "Enemy" : "Neutral";

  const profFriends = profile1.tableSummary.professional.friends.includes(n2);
  const profEnemies = profile1.tableSummary.professional.enemies.includes(n2);
  const profType: CompatibilityType = profFriends ? "Friend" : profEnemies ? "Enemy" : "Neutral";

  const romFriends = profile1.tableSummary.romantic.friends.includes(n2);
  const romEnemies = profile1.tableSummary.romantic.enemies.includes(n2);
  const romType: CompatibilityType = romFriends ? "Friend" : romEnemies ? "Enemy" : "Neutral";

  // Build qualitative details according to pair dynamics
  let summary = "";
  let persDynamics = "";
  let persStrengths: string[] = [];
  let persChallenges: string[] = [];
  let persAdvice = "";

  let profDynamics = "";
  let profStrengths: string[] = [];
  let profChallenges: string[] = [];
  let profAdvice = "";

  let romDynamics = "";
  let romStrengths: string[] = [];
  let romChallenges: string[] = [];
  let romAdvice = "";

  if (overallType === "Friend") {
    summary = `Life Path ${n1} and Life Path ${n2} form a naturally harmonious Friend relationship. Their vibrational frequencies complement and elevate each other, creating ease of understanding and mutual inspiration across shared endeavors.`;
    
    persDynamics = `In personal friendship, Life Path ${n1} and Life Path ${n2} enjoy effortless rapport. Mutual trust develops quickly, as both feel genuinely understood and respected without needing to modify their core nature.`;
    persStrengths = [
      "Natural resonance and fluid emotional understanding",
      "Shared enthusiasm for common life goals and social activities",
      "Mutual encouragement during periods of personal growth"
    ];
    persChallenges = [
      "Potential risk of complacency due to lack of challenge",
      "Avoiding difficult conversations to preserve surface harmony"
    ];
    persAdvice = "Maintain active, honest dialogue to ensure deep alignment continues as individual lives evolve.";

    profDynamics = `In professional collaboration, Life Path ${n1} and Life Path ${n2} combine their respective skill sets with high efficiency. Division of responsibilities occurs naturally, yielding strong productivity and mutual respect.`;
    profStrengths = [
      "Complementary working styles and strategic alignment",
      "High level of trust and constructive problem-solving",
      "Synergistic execution with minimal internal politics"
    ];
    profChallenges = [
      "Over-estimating project timelines due to mutual optimism",
      "Need for clear operational boundaries when workloads double"
    ];
    profAdvice = "Establish explicit milestones and formal agreements to leverage your combined momentum effectively.";

    romDynamics = `In romantic partnership, Life Path ${n1} and Life Path ${n2} generate deep affection and mutual appreciation. They provide emotional sanctuary and long-term stability for each other.`;
    romStrengths = [
      "Deep emotional resonance and genuine romantic warmth",
      "Mutual respect for individual personal space and growth",
      "Sustained intimacy supported by shared foundational values"
    ];
    romChallenges = [
      "Navigating external life stressors without internalizing tension",
      "Balancing romantic devotion with external career obligations"
    ];
    romAdvice = "Prioritize quality one-on-one time and nurture shared long-term dreams consistently.";

  } else if (overallType === "Neutral") {
    summary = `Life Path ${n1} and Life Path ${n2} form a workable Neutral relationship. While possessing distinct core motivations, their differing approaches offer constructive opportunities for multi-dimensional growth when managed consciously.`;

    persDynamics = `In personal friendship, Life Path ${n1} and Life Path ${n2} bring different perspectives to conversations. While occasional misunderstandings arise regarding pace or communication style, mutual respect keeps the bond stable.`;
    persStrengths = [
      "Broadened horizons through exposure to differing viewpoints",
      "Balanced feedback when evaluating life decisions",
      "Constructive diversity in social and intellectual pursuits"
    ];
    persChallenges = [
      "Differing communication rhythms requiring patient explanation",
      "Occasional friction when personal priorities conflict"
    ];
    persAdvice = "Practice active listening and celebrate the unique strengths each person brings to the friendship.";

    profDynamics = `In business and workplace settings, Life Path ${n1} and Life Path ${n2} require explicit role definitions. When roles are clearly separated according to natural strengths, project outcomes are thorough and well-balanced.`;
    profStrengths = [
      "Comprehensive problem coverage combining action and analysis",
      "Objective, multi-angle evaluation of commercial risks",
      "Balanced leadership that prevents blind spots"
    ];
    profChallenges = [
      "Differing operational tempos leading to minor scheduling friction",
      "Need for clear conflict-resolution protocols"
    ];
    profAdvice = "Define explicit domains of authority and schedule regular check-ins to maintain operational alignment.";

    romDynamics = `In romantic relationship, Life Path ${n1} and Life Path ${n2} experience a dynamic blend of attraction and required adjustment. Emotional satisfaction depends on conscious compromise and valuing differences.`;
    romStrengths = [
      "Stimulating personal growth that expands individual comfort zones",
      "Complementary strengths in handling home and career responsibilities",
      "Deep mutual learning over extended timeframes"
    ];
    romChallenges = [
      "Misinterpreting emotional distance or intense focus as lack of care",
      "Negotiating differing needs for social activity versus quiet downtime"
    ];
    romAdvice = "Communicate core emotional needs openly and establish clear joint routines that satisfy both partners.";

  } else {
    // Enemy
    summary = `Life Path ${n1} and Life Path ${n2} carry structurally contrasting vibrations, creating an Enemy relationship dynamic. Without explicit self-awareness and structured protocols, persistent friction and opposing instincts can drain energy.`;

    persDynamics = `In personal interactions, Life Path ${n1} and Life Path ${n2} often view situations from fundamentally opposed angles. What feels natural to one may feel jarring or irresponsible to the other, requiring conscious boundary discipline.`;
    persStrengths = [
      "Unmatched catalytic potential for breaking deep-seated personal habits",
      "Forced development of patience, tolerance, and emotional mastery",
      "Clear revelation of individual blind spots"
    ];
    persChallenges = [
      "Chronic misunderstandings regarding core motivations and intent",
      "Tendency to default to defensive or oppositional stances"
    ];
    persAdvice = "Establish clear personal boundaries, avoid trying to alter the other person's nature, and focus strictly on shared points of agreement.";

    profDynamics = `In commercial and professional environments, Life Path ${n1} and Life Path ${n2} face contrasting operational philosophies. Without clear separation of duties, decision-making can stall in power struggles or conflicting priorities.`;
    profStrengths = [
      "Rigorously tested decisions resulting from opposing analytical lenses",
      "Prevention of groupthink through contrasting perspectives",
      "High scrutiny applied to commercial proposals"
    ];
    profChallenges = [
      "Frequent deadlocks over strategy, execution pace, and resource allocation",
      "Risk of subtle competition rather than genuine collaboration"
    ];
    profAdvice = "Divide responsibilities into strictly autonomous sectors with written operational guidelines and neutral mediation protocols.";

    romDynamics = `In romantic partnership, Life Path ${n1} and Life Path ${n2} experience high polarity. While initial attraction may be intense, sustained relationship harmony requires deep conscious commitment and emotional maturity.`;
    romStrengths = [
      "Intense transformative potential that demands complete maturity",
      "Opportunity to master unconditional acceptance across stark differences",
      "Powerful chemistry driven by contrasting elemental energies"
    ];
    romChallenges = [
      "Recurring clashes between fundamental relational needs and life paces",
      "Exhaustion resulting from constant negotiation of basic expectations"
    ];
    romAdvice = "Engage in proactive, non-defensive communication. Honor each other's core needs without taking stylistic differences as personal attacks.";
  }

  return {
    numA: num1,
    numB: num2,
    overallType,
    summary,
    personalDomain: {
      type: persType,
      dynamics: persDynamics,
      strengths: persStrengths,
      challenges: persChallenges,
      strategicAdvice: persAdvice
    },
    professionalDomain: {
      type: profType,
      dynamics: profDynamics,
      strengths: profStrengths,
      challenges: profChallenges,
      strategicAdvice: profAdvice
    },
    romanticDomain: {
      type: romType,
      dynamics: romDynamics,
      strengths: romStrengths,
      challenges: romChallenges,
      strategicAdvice: romAdvice
    }
  };
}

/**
 * MULTI-LAYER COMPATIBILITY ENGINE
 * Evaluates compatibility across Life Path, Expression, Soul Urge, and Birth Number.
 */

export interface MultiLayerCompatibilityReport {
  personA: {
    lifePath: number;
    expression?: number;
    soulUrge?: number;
    birthNumber?: number;
  };
  personB: {
    lifePath: number;
    expression?: number;
    soulUrge?: number;
    birthNumber?: number;
  };
  lifePathCompatibility: PairCompatibilityDetail;
  expressionCompatibility?: PairCompatibilityDetail;
  soulUrgeCompatibility?: PairCompatibilityDetail;
  birthNumberCompatibility?: PairCompatibilityDetail;
  overallScore: number; // 0 - 100
  overallVerdict: "Extraordinary Synergy" | "Strong & Balanced" | "Moderate / Workable" | "High Friction / Requires Protocol";
  executiveSummary: string;
}

export function calculateMultiLayerCompatibility(
  personA: { lifePath: number; expression?: number; soulUrge?: number; birthNumber?: number },
  personB: { lifePath: number; expression?: number; soulUrge?: number; birthNumber?: number }
): MultiLayerCompatibilityReport {
  const lpComp = analyzePairCompatibility(personA.lifePath, personB.lifePath);
  
  let exprComp: PairCompatibilityDetail | undefined = undefined;
  if (personA.expression && personB.expression) {
    exprComp = analyzePairCompatibility(personA.expression, personB.expression);
  }

  let suComp: PairCompatibilityDetail | undefined = undefined;
  if (personA.soulUrge && personB.soulUrge) {
    suComp = analyzePairCompatibility(personA.soulUrge, personB.soulUrge);
  }

  let bnComp: PairCompatibilityDetail | undefined = undefined;
  if (personA.birthNumber && personB.birthNumber) {
    bnComp = analyzePairCompatibility(personA.birthNumber, personB.birthNumber);
  }

  // Calculate composite score
  let score = 50;
  if (lpComp.overallType === "Friend") score += 25;
  if (lpComp.overallType === "Enemy") score -= 20;

  if (exprComp) {
    if (exprComp.overallType === "Friend") score += 10;
    if (exprComp.overallType === "Enemy") score -= 8;
  }

  if (suComp) {
    if (suComp.overallType === "Friend") score += 10;
    if (suComp.overallType === "Enemy") score -= 8;
  }

  if (bnComp) {
    if (bnComp.overallType === "Friend") score += 5;
    if (bnComp.overallType === "Enemy") score -= 4;
  }

  score = Math.max(10, Math.min(99, score));

  let verdict: "Extraordinary Synergy" | "Strong & Balanced" | "Moderate / Workable" | "High Friction / Requires Protocol" = "Moderate / Workable";
  if (score >= 80) verdict = "Extraordinary Synergy";
  else if (score >= 65) verdict = "Strong & Balanced";
  else if (score < 40) verdict = "High Friction / Requires Protocol";

  let executiveSummary = "";
  if (verdict === "Extraordinary Synergy") {
    executiveSummary = "This partnership demonstrates exceptional numerical harmony across multiple core layers. Shared fundamental orientations foster effortless understanding, mutual trust, and high collaborative productivity.";
  } else if (verdict === "Strong & Balanced") {
    executiveSummary = "This combination possesses strong foundational compatibility with manageable stylistic differences. Mutual goals align well, and minor operational friction can be readily overcome through open communication.";
  } else if (verdict === "Moderate / Workable") {
    executiveSummary = "This relationship brings together complementary yet contrasting core energies. Success requires conscious mutual adjustment, clear role definitions, and respect for differing life paces.";
  } else {
    executiveSummary = "This partnership encounters structural vibrational tension across primary layers. Operating effectively demands formal protocols, explicit personal boundaries, and non-defensive problem solving.";
  }

  return {
    personA,
    personB,
    lifePathCompatibility: lpComp,
    expressionCompatibility: exprComp,
    soulUrgeCompatibility: suComp,
    birthNumberCompatibility: bnComp,
    overallScore: score,
    overallVerdict: verdict,
    executiveSummary
  };
}
