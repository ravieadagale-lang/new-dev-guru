// src/data/numerologyKarmicLessonsMissingLetters.ts
// Chapter Thirteen: Karmic Lessons, Missing Letters, Repeated Letters, and Subconscious Self Number
// Comprehensive reference for Gaps in Soul Education, Absence, Concentration, and Crisis Response without case study examples.

export interface KarmicLessonAnalysis {
  number: number;
  title: string;
  keywords: string[];
  coreCurriculum: string;
  practicalManifestation: string;
  shadowPattern: string;
  practicalGuidance: string[];
  detailedParagraphs: string[];
}

export interface MissingLetterDetail {
  letter: string;
  pythagoreanValue: number;
  chaldeanValue: number;
  removedQuality: string;
  detailedAnalysis: string;
}

export interface RepeatedLetterDetail {
  letter: string;
  pythagoreanValue: number;
  healthyExpression: string;
  excessRisk: string;
  balancingPractice: string;
}

export interface SubconsciousSelfAnalysis {
  score: number; // 1 to 9 (Count of distinct Pythagorean values present)
  title: string;
  crisisResponseBreadth: string;
  operationalPsychology: string;
  detailedParagraphs: string[];
}

export interface KarmicTheoryData {
  title: string;
  subtitle: string;
  quote: {
    text: string;
    author: string;
  };
  introParagraphs: string[];
  fourAspectsBreakdown: {
    karmicLessonsRole: string;
    missingLettersRole: string;
    repeatedLettersRole: string;
    subconsciousSelfRole: string;
  };
}

export const KARMIC_THEORY_DATA: KarmicTheoryData = {
  title: "Karmic Lessons, Missing Letters, Repeated Letters & Subconscious Self Number",
  subtitle: "What Is Hidden in the Gaps — The Story of Absence, Concentration, and Crisis Resources",
  quote: {
    text: "The soul always knows what to do to heal itself. The challenge is to silence the mind.",
    author: "Caroline Myss"
  },
  introParagraphs: [
    "Every name tells two stories simultaneously: the story of what is present (Expression, Soul Urge, Personality) and the story of what is absent or highly concentrated.",
    "Karmic Lessons are the numerical values completely missing from the birth name, revealing specific areas of human experience in which the soul's education is incomplete.",
    "Missing Letters specify the exact character traits absent, Repeated Letters reveal where energy is most densely concentrated, and the Subconscious Self Number measures how many distinct vibrational modes are available automatically in a crisis."
  ],
  fourAspectsBreakdown: {
    karmicLessonsRole: "Pythagorean numbers 1-9 completely absent from the full birth name. Indicates recurring lifetime lessons and required soul cultivation.",
    missingLettersRole: "Specific absent letters (A-Z) that refine general Karmic Lessons into precise missing behavioral nuances.",
    repeatedLettersRole: "Letters appearing with high frequency (3+ times), showing dominant natural strengths and potential excess risks.",
    subconsciousSelfRole: "The total count of distinct Pythagorean digits (1-9) present in the name. Represents subconscious resourcefulness during sudden emergencies."
  }
};

export const KARMIC_LESSONS_DATABASE: Record<number, KarmicLessonAnalysis> = {
  1: {
    number: 1,
    title: "Learning to Stand Alone and Lead",
    keywords: ["Independent Initiative", "Self-Reliance", "Courageous Ownership"],
    coreCurriculum: "Developing genuine self-confidence, independent decision-making, and the courage to step forward without waiting for external approval.",
    practicalManifestation: "Recurring difficulty with self-initiation, waiting for others to take charge, or seeking validation before trusting personal judgment.",
    shadowPattern: "Paralysis in situations requiring unilateral action or over-reliance on others' opinions.",
    practicalGuidance: [
      "Practise making one self-directed decision daily without seeking prior approval.",
      "Initiate a personal project without waiting for external validation.",
      "When feeling the urge to defer to others, consciously step forward and lead."
    ],
    detailedParagraphs: [
      "When the number one is a Karmic Lesson (no letters A, J, or S in the name), the person faces a lifetime curriculum in independent initiative and self-reliance.",
      "The soul arriving with this lesson has previously defined itself primarily through others, relying on external confirmation rather than internal authority.",
      "Developing this lesson yields hard-won, highly conscious self-possession that inspires genuine leadership."
    ]
  },
  2: {
    number: 2,
    title: "Learning to Cooperate, Receive, and Partner",
    keywords: ["Cooperative Intelligence", "Reciprocal Care", "Vulnerable Interdependence"],
    coreCurriculum: "Mastering delicate diplomacy, genuine partnership, active listening, and the grace to receive care from others.",
    practicalManifestation: "Difficulty delegating responsibility, fear of vulnerability in relationships, or feeling that everything must be done alone.",
    shadowPattern: "Inability to trust partners fully or refusal to acknowledge personal emotional needs.",
    practicalGuidance: [
      "Ask for help with a concrete task at least once per week.",
      "Practise listening completely to others without preparing your response in advance.",
      "Invest deliberately in building balanced, reciprocal relationships."
    ],
    detailedParagraphs: [
      "When two is a Karmic Lesson (no letters B, K, or T), the individual is here to learn authentic cooperation and mutual reliance.",
      "The soul has previously operated through solitary effort, making genuine teamwork and emotional receptivity a conscious learning edge.",
      "Mastering this lesson unlocks profound relational harmony and deep, enduring partnerships."
    ]
  },
  3: {
    number: 3,
    title: "Learning to Express, Create, and Communicate",
    keywords: ["Authentic Self-Expression", "Creative Confidence", "Joyous Communication"],
    coreCurriculum: "Translating rich internal thoughts and feelings into outward creative form, words, and authentic self-expression.",
    practicalManifestation: "Creative self-suppression, fear of public judgment, or difficulty finding a clear voice to share personal ideas.",
    shadowPattern: "Holding back creative talents due to early criticism or self-doubt.",
    practicalGuidance: [
      "Engage in a daily creative practice (journaling, art, speaking) regardless of output quality.",
      "Share your ideas and creative work before you feel it is 100% perfect.",
      "Practise speaking your authentic feelings freely in conversation."
    ],
    detailedParagraphs: [
      "When three is a Karmic Lesson (no letters C, L, or U), the person carries a quiet inner world waiting for expressive release.",
      "The challenge lies in building a bridge between private thoughts and public communication.",
      "Overcoming this barrier transforms hidden creative potential into uplifting, articulate self-expression."
    ]
  },
  4: {
    number: 4,
    title: "Learning to Work, Build, and Persist",
    keywords: ["Methodical Discipline", "Sustained Effort", "Practical Completion"],
    coreCurriculum: "Developing patience, methodical work habits, step-by-step discipline, and long-term stamina to build lasting structures.",
    practicalManifestation: "A pattern of brilliant project starts that stall out during the repetitive middle phase of execution.",
    shadowPattern: "Restlessness with routine or abandoning efforts when immediate results do not appear.",
    practicalGuidance: [
      "Commit to working on one core long-term skill or project daily for at least 6 months.",
      "Establish a structured, non-negotiable daily routine for fundamental tasks.",
      "Focus on step-by-step thoroughness rather than quick shortcuts."
    ],
    detailedParagraphs: [
      "When four is a Karmic Lesson (no letters D, M, or V), the soul is learning the power of sustained practical application.",
      "Initial enthusiasm must be anchored by daily discipline to turn abstract vision into permanent physical reality.",
      "Completing long-term projects brings profound inner security and genuine craftsmanship."
    ]
  },
  5: {
    number: 5,
    title: "Learning to Embrace Change, Freedom, and Experience",
    keywords: ["Adaptive Openness", "Courageous Exploration", "Constructive Freedom"],
    coreCurriculum: "Overcoming fear of the unknown, embracing life's natural transitions, and seeking wisdom through direct experience.",
    practicalManifestation: "Clinging to outdated situations out of fear of uncertainty or feeling anxious when routines are disrupted.",
    shadowPattern: "Choosing rigid familiarity over personal growth even when the familiar is unsatisfactory.",
    practicalGuidance: [
      "Deliberately try one completely new experience or route every month.",
      "View unexpected changes as opportunities for growth rather than threats.",
      "Practice adapting fluidly when plans shift without warning."
    ],
    detailedParagraphs: [
      "When five is a Karmic Lesson (no letters E, N, or W), the person is challenged to embrace life's dynamic movement.",
      "The soul previously sought safety in fixed structures, making adaptability and adventure key developmental milestones.",
      "Embracing change cultivates broad wisdom, resilience, and true personal freedom."
    ]
  },
  6: {
    number: 6,
    title: "Learning to Love, Commit, and Be Responsible",
    keywords: ["Committed Relationship", "Domestic Harmony", "Selfless Duty"],
    coreCurriculum: "Understanding that genuine love requires sustained presence, domestic responsibility, and emotional commitment through difficulty.",
    practicalManifestation: "Hesitation toward long-term domestic commitments or finding relational duties unusually demanding.",
    shadowPattern: "Avoiding emotional responsibility or pulling back when relationships require deep, ongoing care.",
    practicalGuidance: [
      "Practise staying present and supportive during difficult relational conversations.",
      "Honor daily domestic and family commitments with conscious grace.",
      "Invest in creating a peaceful, beautiful, and nurturing home environment."
    ],
    detailedParagraphs: [
      "When six is a Karmic Lesson (no letters F, O, or X), the curriculum centers on committed, practical, and enduring love.",
      "This does not mean an inability to love, but rather that long-term care and duty must be practiced intentionally.",
      "Mastering this lesson yields deeply fulfilling family bonds and unshakeable interpersonal trust."
    ]
  },
  7: {
    number: 7,
    title: "Learning to Think Deeply, Seek Truth, and Trust Introspection",
    keywords: ["Analytical Depth", "Spiritual Inquiry", "Quiet Solitude"],
    coreCurriculum: "Cultivating inward reflection, specialized knowledge, spiritual investigation, and faith in underlying truths.",
    practicalManifestation: "Superficial engagement with complex subjects or feeling uncomfortable in quiet, solitary reflection.",
    shadowPattern: "Avoiding deep self-examination or relying strictly on popular opinion rather than personal analysis.",
    practicalGuidance: [
      "Establish a daily meditation or quiet reading practice of at least 20 minutes.",
      "Investigate foundational causes behind recurring life questions rather than accepting surface answers.",
      "Develop trust in your own inner spiritual intuition."
    ],
    detailedParagraphs: [
      "When seven is a Karmic Lesson (no letters G, P, or Y), the soul is called to cultivate analytical and spiritual depth.",
      "By looking beneath surface appearances, the person develops intellectual rigor and profound inner peace.",
      "Solitude becomes a sacred sanctuary for discovering timeless wisdom."
    ]
  },
  8: {
    number: 8,
    title: "Learning Power, Material Reality, and Practical Achievement",
    keywords: ["Material Intelligence", "Financial Mastery", "Ethical Authority"],
    coreCurriculum: "Mastering practical money management, stepping into commercial authority, and understanding systems of material power.",
    practicalManifestation: "Undercharging for work, financial insecurity, or viewing material success as incompatible with personal integrity.",
    shadowPattern: "Feeling powerless in financial matters or fearing executive responsibility.",
    practicalGuidance: [
      "Study financial literacy and practical resource management systematically.",
      "Charge fair, appropriate value for your professional skills without guilt.",
      "Step into leadership roles and manage resources with high ethical standards."
    ],
    detailedParagraphs: [
      "When eight is a Karmic Lesson (no letters H, Q, or Z), the individual must build a healthy relationship with money and authority.",
      "The soul previously prioritized theoretical or spiritual pursuits over practical commerce.",
      "Realizing that material efficiency can serve noble human goals is the liberating breakthrough of this lesson."
    ]
  },
  9: {
    number: 9,
    title: "Learning Compassion, Completion, and Universal Service",
    keywords: ["Universal Empathy", "Conscious Release", "Altruistic Vision"],
    coreCurriculum: "Expanding perspective beyond personal concerns, mastering clean emotional closure, and serving collective well-being.",
    practicalManifestation: "Messy, bitter endings in projects or relationships, or struggle to feel broad empathy for strangers.",
    shadowPattern: "Holding onto completed chapters or focusing narrowly on self-interest.",
    practicalGuidance: [
      "Practise graceful, conscious release when projects or relationships reach their natural conclusion.",
      "Participate in humanitarian, environmental, or community service endeavors.",
      "Forgive past grievances to clean your emotional slate completely."
    ],
    detailedParagraphs: [
      "When nine is a Karmic Lesson (no letters I or R), the person is learning broad universal compassion and graceful completion.",
      "Closing doors with gratitude opens the heart to global understanding.",
      "Living for a purpose larger than oneself provides profound spiritual fulfillment."
    ]
  }
};

export const MISSING_LETTERS_DATABASE: Record<string, MissingLetterDetail> = {
  A: { letter: "A", pythagoreanValue: 1, chaldeanValue: 1, removedQuality: "Original Unmediated Initiation", detailedAnalysis: "Missing letter A reduces natural, spontaneous beginning confidence; starting projects requires conscious intentional push." },
  B: { letter: "B", pythagoreanValue: 2, chaldeanValue: 2, removedQuality: "Gentle Cooperative Harmony", detailedAnalysis: "Missing letter B makes quiet, non-confrontational diplomatic presence something to cultivate rather than an automatic instinct." },
  C: { letter: "C", pythagoreanValue: 3, chaldeanValue: 3, removedQuality: "Curious Expressive Charm", detailedAnalysis: "Missing letter C requires deliberate practice in social lightness, creative storytelling, and joyous communication." },
  D: { letter: "D", pythagoreanValue: 4, chaldeanValue: 4, removedQuality: "Grounded Practical Stability", detailedAnalysis: "Missing letter D means physical organization, routine maintenance, and practical steps demand focused conscious discipline." },
  E: { letter: "E", pythagoreanValue: 5, chaldeanValue: 5, removedQuality: "Versatile Intellectual Freedom", detailedAnalysis: "Missing letter E encourages building intentional mental agility and adaptability when facing unexpected changes." },
  F: { letter: "F", pythagoreanValue: 6, chaldeanValue: 6, removedQuality: "Responsible Domestic Warmth", detailedAnalysis: "Missing letter F indicates that curating a warm physical home sanctuary requires conscious effort." },
  G: { letter: "G", pythagoreanValue: 7, chaldeanValue: 3, removedQuality: "Methodical Investigation", detailedAnalysis: "Missing letter G encourages deliberate cultivation of systematic research and analytical patience." },
  H: { letter: "H", pythagoreanValue: 8, chaldeanValue: 5, removedQuality: "Material Flow Awareness", detailedAnalysis: "Missing letter H suggests that commercial rhythm and financial pattern recognition are built through study." },
  I: { letter: "I", pythagoreanValue: 9, chaldeanValue: 1, removedQuality: "Universal Empathic Feeling", detailedAnalysis: "Missing letter I invites practicing conscious, felt empathy for people outside one's immediate circle." },
  J: { letter: "J", pythagoreanValue: 1, chaldeanValue: 1, removedQuality: "Considered Independent Judgment", detailedAnalysis: "Missing letter J requires cultivating decisive, independent choice when facing social disagreement." },
  K: { letter: "K", pythagoreanValue: 2, chaldeanValue: 2, removedQuality: "Intuitive Perceptual Radar", detailedAnalysis: "Missing letter K means relational insights are built through attentive observation rather than instant gut hits." },
  L: { letter: "L", pythagoreanValue: 3, chaldeanValue: 3, removedQuality: "Joyful Flowing Expression", detailedAnalysis: "Missing letter L invites introducing lightness, warmth, and expressive fluidity into formal communications." },
  M: { letter: "M", pythagoreanValue: 4, chaldeanValue: 4, removedQuality: "Protective Foundational Care", detailedAnalysis: "Missing letter M requires intentional focus on establishing practical safety and permanent foundations." },
  N: { letter: "N", pythagoreanValue: 5, chaldeanValue: 5, removedQuality: "Unconstrained Openness", detailedAnalysis: "Missing letter N suggests that adapting to sudden novel situations requires a deliberate mental deep breath." },
  O: { letter: "O", pythagoreanValue: 6, chaldeanValue: 7, removedQuality: "Harmonious Aesthetic Care", detailedAnalysis: "Missing letter O invites learning to build environmental beauty and moral duty consciously." },
  P: { letter: "P", pythagoreanValue: 7, chaldeanValue: 8, removedQuality: "Strategic Analytical Depth", detailedAnalysis: "Missing letter P calls for combining intellectual scrutiny with practical business strategy." },
  Q: { letter: "Q", pythagoreanValue: 8, chaldeanValue: 1, removedQuality: "Unique Executive Expression", detailedAnalysis: "Missing letter Q is rare and holds minor significance in standard name analysis." },
  R: { letter: "R", pythagoreanValue: 9, chaldeanValue: 2, removedQuality: "Compassionate Leadership Karma", detailedAnalysis: "Missing letter R encourages developing the synthesis of broad empathy and assertive guidance." },
  S: { letter: "S", pythagoreanValue: 1, chaldeanValue: 3, removedQuality: "Passionate Self-Assertion", detailedAnalysis: "Missing letter S calls for adding emotional fire and conviction to personal self-expression." },
  T: { letter: "T", pythagoreanValue: 2, chaldeanValue: 4, removedQuality: "Methodical Cooperative Building", detailedAnalysis: "Missing letter T requires practicing precise step-by-step teamwork on joint projects." },
  U: { letter: "U", pythagoreanValue: 3, chaldeanValue: 6, removedQuality: "Communicative Inner Release", detailedAnalysis: "Missing letter U encourages sharing private emotional experiences through art or words." },
  V: { letter: "V", pythagoreanValue: 4, chaldeanValue: 6, removedQuality: "Values-Aligned Practical Execution", detailedAnalysis: "Missing letter V calls for grounding high ethical principles into daily physical actions." },
  W: { letter: "W", pythagoreanValue: 5, chaldeanValue: 6, removedQuality: "Adaptably Caring Versatility", detailedAnalysis: "Missing letter W suggests practicing warm flexibility during changing team conditions." },
  X: { letter: "X", pythagoreanValue: 6, chaldeanValue: 5, removedQuality: "Social Balance & Charm", detailedAnalysis: "Missing letter X is rare and holds minor structural impact." },
  Y: { letter: "Y", pythagoreanValue: 7, chaldeanValue: 1, removedQuality: "Introspective Self-Examination", detailedAnalysis: "Missing letter Y calls for building deliberate daily habits of honest inner self-audit." },
  Z: { letter: "Z", pythagoreanValue: 8, chaldeanValue: 7, removedQuality: "Masterful Commercial Insight", detailedAnalysis: "Missing letter Z is rare and holds minor structural impact." }
};

export const REPEATED_LETTERS_GUIDANCE: Record<string, RepeatedLetterDetail> = {
  A: {
    letter: "A",
    pythagoreanValue: 1,
    healthyExpression: "Natural, effortless independent leadership, pioneering courage, and swift initiative.",
    excessRisk: "Refusal to cooperate, reluctance to accept help, or difficulty working in established hierarchies.",
    balancingPractice: "Practise conscious collaboration, share credit, and accept assistance from team partners."
  },
  E: {
    letter: "E",
    pythagoreanValue: 5,
    healthyExpression: "Fast mental speed, curious adaptability, engaging communication, and thirst for learning.",
    excessRisk: "Restlessness, scattering focus across too many projects, or abandoning endeavors when novelty fades.",
    balancingPractice: "Maintain at least one long-term commitment consistently through periods of boredom."
  },
  I: {
    letter: "I",
    pythagoreanValue: 9,
    healthyExpression: "Profound intuitive empathy, global artistic awareness, and broad compassionate wisdom.",
    excessRisk: "Absorbing environmental distress, emotional exhaustion, or neglect of personal physical needs.",
    balancingPractice: "Establish strict personal boundaries and include your own health in your care efforts."
  },
  O: {
    letter: "O",
    pythagoreanValue: 6,
    healthyExpression: "Deep domestic devotion, protective responsibility, and creation of beautiful, harmonious environments.",
    excessRisk: "Over-protectiveness, martyrdom, or insisting that others adopt your standards of harmony.",
    balancingPractice: "Allow loved ones freedom to make their own choices while protecting your own energy."
  },
  U: {
    letter: "U",
    pythagoreanValue: 3,
    healthyExpression: "Joyful creative expression, warm communicative connection, and artistic authenticity.",
    excessRisk: "Internal emotional pressure if expression is blocked, or scattering creative output.",
    balancingPractice: "Channel expressive energy into structured daily artistic or literary routines."
  },
  N: {
    letter: "N",
    pythagoreanValue: 5,
    healthyExpression: "Resourceful versatility, quick-witted curiosity, and open-minded adaptation.",
    excessRisk: "Impatient jumping between choices or mental overstimulation.",
    balancingPractice: "Anchor mental speed with quiet meditation and single-task focus."
  },
  R: {
    letter: "R",
    pythagoreanValue: 9,
    healthyExpression: "Compassionate authority, diplomatic leadership, and broad humanitarian vision.",
    excessRisk: "Carrying heavy collective burdens or difficulty saying 'no' to public demands.",
    balancingPractice: "Balance public leadership with restorative, quiet personal retreats."
  },
  S: {
    letter: "S",
    pythagoreanValue: 1,
    healthyExpression: "Passionate self-expression, magnetic charisma, and decisive personal drive.",
    excessRisk: "Emotional volatility or dominant self-assertion in group discussions.",
    balancingPractice: "Practise active listening and temper passion with calm diplomatic patience."
  }
};

export const SUBCONSCIOUS_SELF_DATABASE: Record<number, SubconsciousSelfAnalysis> = {
  9: {
    score: 9,
    title: "Fully Resourced Subconscious Mastery",
    crisisResponseBreadth: "All 9 Pythagorean numerical frequencies are present in the birth name.",
    operationalPsychology: "In sudden emergencies, the individual can draw on all 9 vibrational modes automatically — independent command (1), diplomacy (2), expression (3), structure (4), agility (5), care (6), analysis (7), execution (8), and compassion (9).",
    detailedParagraphs: [
      "A Subconscious Self score of 9 represents maximum subconscious resourcefulness in crises.",
      "Whatever an emergency demands — whether immediate action, quiet analysis, or practical building — an automatic response is available.",
      "This provides extraordinary calm under pressure and multi-dimensional versatility."
    ]
  },
  8: {
    score: 8,
    title: "Broad Subconscious Versatility",
    crisisResponseBreadth: "8 out of 9 Pythagorean digits are present in the birth name.",
    operationalPsychology: "Highly adaptable crisis response, with 8 distinct vibrational modes available instinctively.",
    detailedParagraphs: [
      "A Subconscious Self score of 8 offers robust automatic coping mechanisms in almost any situation.",
      "Only one specific mode requires deliberate conscious effort under pressure.",
      "The individual navigates sudden shifts with high confidence and agility."
    ]
  },
  7: {
    score: 7,
    title: "Well-Equipped Subconscious Capability",
    crisisResponseBreadth: "7 out of 9 Pythagorean digits present in the name.",
    operationalPsychology: "Solid, versatile instinctive response across most human scenarios.",
    detailedParagraphs: [
      "A Subconscious Self score of 7 reflects broad automatic skills during unexpected events.",
      "The person draws on 7 natural archetypes, applying conscious focus for the remaining 2.",
      "Yields strong emotional composure and effective problem-solving."
    ]
  },
  6: {
    score: 6,
    title: "Focused Subconscious Competence",
    crisisResponseBreadth: "6 out of 9 Pythagorean digits present in the name.",
    operationalPsychology: "Balanced crisis response centered around 6 primary vibrational strengths.",
    detailedParagraphs: [
      "A Subconscious Self score of 6 provides strong instinctive responses in core areas.",
      "When facing scenarios in the 3 missing areas, the individual must pause and act deliberately.",
      "This encourages conscious growth in specific Karmic Lesson domains."
    ]
  },
  5: {
    score: 5,
    title: "Specialized Subconscious Focus",
    crisisResponseBreadth: "5 out of 9 Pythagorean digits present in the name.",
    operationalPsychology: "Concentrated, highly specialized crisis response strength.",
    detailedParagraphs: [
      "A Subconscious Self score of 5 indicates sharp competence in 5 key areas, while requiring conscious protocol in others.",
      "The person excels when crises align with their present digits, and develops deep maturity when handling missing areas.",
      "Team collaboration effectively fills the remaining operational gaps."
    ]
  },
  4: {
    score: 4,
    title: "Intensely Concentrated Subconscious Focus",
    crisisResponseBreadth: "4 out of 9 Pythagorean digits present in the name.",
    operationalPsychology: "Deep, specialized mastery in 4 specific vibrational modes.",
    detailedParagraphs: [
      "A Subconscious Self score of 4 means subconscious responses are deeply focused within 4 archetypes.",
      "Outside these 4 domains, crisis resolution demands conscious, deliberate application.",
      "Building complementary partnerships creates complete operational harmony."
    ]
  },
  3: {
    score: 3,
    title: "Hyper-Specialized Subconscious Core",
    crisisResponseBreadth: "3 out of 9 Pythagorean digits present in the name.",
    operationalPsychology: "Razor-sharp concentration in 3 core modes, requiring conscious cultivation for the rest.",
    detailedParagraphs: [
      "A Subconscious Self score of 3 indicates a name field with extreme energetic concentration.",
      "While instinctive responses are intense in 3 modes, the individual learns life's broader lessons through conscious practice.",
      "Yields profound specialized mastery and intentional personal development."
    ]
  }
};

/**
 * Calculation Helper Functions
 */

export function calculateKarmicLessons(cleanName: string): number[] {
  const pythagoreanMap: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  };

  const presentSet = new Set<number>();
  for (const ch of cleanName.toUpperCase()) {
    const val = pythagoreanMap[ch];
    if (val) presentSet.add(val);
  }

  const missingLessons: number[] = [];
  for (let num = 1; num <= 9; num++) {
    if (!presentSet.has(num)) {
      missingLessons.push(num);
    }
  }

  return missingLessons;
}

export function calculateMissingLetters(cleanName: string): string[] {
  const presentLetters = new Set<string>(cleanName.toUpperCase().split(""));
  const missing: string[] = [];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  for (const ltr of alphabet) {
    if (!presentLetters.has(ltr)) {
      missing.push(ltr);
    }
  }
  return missing;
}

export function calculateRepeatedLetters(cleanName: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const ch of cleanName.toUpperCase()) {
    if (ch >= "A" && ch <= "Z") {
      counts[ch] = (counts[ch] || 0) + 1;
    }
  }

  // Filter for letters appearing 2 or more times
  const repeated: Record<string, number> = {};
  for (const [ltr, count] of Object.entries(counts)) {
    if (count >= 2) {
      repeated[ltr] = count;
    }
  }
  return repeated;
}

export function calculateSubconsciousSelfNumber(cleanName: string): number {
  const pythagoreanMap: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  };

  const presentSet = new Set<number>();
  for (const ch of cleanName.toUpperCase()) {
    const val = pythagoreanMap[ch];
    if (val) presentSet.add(val);
  }

  return presentSet.size;
}

export function getKarmicLessonAnalysis(num: number): KarmicLessonAnalysis {
  return KARMIC_LESSONS_DATABASE[num] || KARMIC_LESSONS_DATABASE[1];
}

export function getMissingLetterDetail(letter: string): MissingLetterDetail {
  const uppercaseLetter = (letter || "A").toUpperCase();
  return MISSING_LETTERS_DATABASE[uppercaseLetter] || {
    letter: uppercaseLetter,
    pythagoreanValue: 1,
    chaldeanValue: 1,
    removedQuality: "Specific Trait Development",
    detailedAnalysis: `Absence of letter ${uppercaseLetter} requires deliberate conscious cultivation of its specific trait.`
  };
}

export function getSubconsciousSelfAnalysis(score: number): SubconsciousSelfAnalysis {
  const validScore = Math.min(Math.max(score, 3), 9);
  return SUBCONSCIOUS_SELF_DATABASE[validScore] || SUBCONSCIOUS_SELF_DATABASE[6];
}
