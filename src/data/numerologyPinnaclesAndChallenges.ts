// src/data/numerologyPinnaclesAndChallenges.ts
// Chapter Twenty: Pinnacle Cycles and Challenge Numbers
// Comprehensive standalone data & calculation engine for the 4 Pinnacles & 4 Challenges.

export interface PinnacleDetail {
  number: number;
  title: string;
  isMasterNumber: boolean;
  theme: string;
  opportunities: string[];
  primaryDemands: string[];
  shadowRisks: string[];
  guidance: string;
}

export interface ChallengeDetail {
  number: number;
  title: string;
  theme: string;
  developmentalDemand: string;
  recurringObstacles: string[];
  lessonsToMaster: string[];
  guidance: string;
}

export interface ChapterTwentyTheoryData {
  title: string;
  subtitle: string;
  quote: {
    text: string;
    author: string;
  };
  introParagraphs: string[];
  pinnacleCalculationRule: string;
  challengeCalculationRule: string;
  timingRule: string;
}

export const CHAPTER_TWENTY_THEORY_DATA: ChapterTwentyTheoryData = {
  title: "Pinnacle Cycles and Challenge Numbers",
  subtitle: "The Temporal Architecture of a Lifetime — Opportunity Peaks & Developmental Curricula",
  quote: {
    text: "Life is not a problem to be solved, but a reality to be experienced.",
    author: "Søren Kierkegaard"
  },
  introParagraphs: [
    "While the Life Path Number reveals the soul's overarching direction for a complete lifetime, Pinnacle Cycles and Challenge Numbers reveal the specific terrain and developmental demands of each major phase.",
    "The Four Pinnacle Cycles describe the primary opportunities, growth themes, and forward momentum available in each phase. The Four Challenge Numbers expose the specific friction, obstacles, and developmental lessons the soul must master.",
    "Together, Pinnacles (derived via addition) and Challenges (derived via subtraction) form a complete, time-delineated blueprint of life's four major seasons."
  ],
  pinnacleCalculationRule: "Pinnacle 1 = Reduced Day + Reduced Month. Pinnacle 2 = Reduced Day + Reduced Year. Pinnacle 3 = Pinnacle 1 + Pinnacle 2. Pinnacle 4 = Reduced Month + Reduced Year. Master Numbers (11, 22, 33) are preserved.",
  challengeCalculationRule: "Challenge 1 = |Reduced Month - Reduced Day|. Challenge 2 = |Reduced Year - Reduced Day|. Challenge 3 (Main Challenge) = |Challenge 1 - Challenge 2|. Challenge 4 = |Reduced Month - Reduced Year|. Challenge numbers range from 0 to 8.",
  timingRule: "First Pinnacle/Challenge runs from Birth to Age (36 - Life Path Root). Second Pinnacle runs for 9 years. Third Pinnacle runs for 9 years. Fourth Pinnacle runs from the end of Third Pinnacle through the remainder of life."
};

export const ALL_PINNACLE_DATABASE: Record<number, PinnacleDetail> = {
  1: {
    number: 1,
    title: "The Pioneer's Initiation",
    isMasterNumber: false,
    theme: "Independent initiation, launching original endeavours, and establishing individual identity.",
    opportunities: [
      "Launching groundbreaking original initiatives and ventures",
      "Developing unshakeable self-reliance and decisive autonomy",
      "Stepping forward into leadership roles without waiting for consensus"
    ],
    primaryDemands: [
      "Willingness to act on personal judgment without external safety nets",
      "Overcoming hesitation and fear of standing alone",
      "Cultivating individual courage under pressure"
    ],
    shadowRisks: [
      "Arrogant stubbornness or driving away collaborators",
      "Refusing sound advice due to excessive pride",
      "Isolation resulting from relentless solo momentum"
    ],
    guidance: "Trust your independent vision. Take decisive initiative and build genuine self-reliance."
  },

  2: {
    number: 2,
    title: "The Diplomat's Alliance",
    isMasterNumber: false,
    theme: "Cooperative development, refining relational intelligence, and building genuine partnerships.",
    opportunities: [
      "Building long-term, mutually enriching strategic alliances",
      "Developing extraordinary empathetic mediation and diplomacy",
      "Fostering psychological safety and trust in group environments"
    ],
    primaryDemands: [
      "Patience with the measured pace of collaborative work",
      "Honoring others' perspectives and emotional needs as equal to your own",
      "Developing genuine sensitivity without losing personal boundaries"
    ],
    shadowRisks: [
      "Hypersensitivity to criticism leading to passive withdrawal",
      "Self-erasure to keep superficial peace",
      "Indecision and codependency"
    ],
    guidance: "Focus on gentle, relationally-intelligent collaboration. Genuine partnership unlocks your highest progress."
  },

  3: {
    number: 3,
    title: "The Creator's Expression",
    isMasterNumber: false,
    theme: "Creative abundance, inspired communication, and discovering authentic personal voice.",
    opportunities: [
      "Broad public expression through writing, speaking, or fine arts",
      "Uplifting social circles with optimism and genuine charisma",
      "Generating innovative, out-of-the-box creative solutions"
    ],
    primaryDemands: [
      "Disciplined follow-through to complete inspired works",
      "Authentic emotional disclosure without superficial masking",
      "Channeling creative versatility into focused outcomes"
    ],
    shadowRisks: [
      "Scattering energy across dozens of unfinished projects",
      "Using charm or superficial wit to avoid painful realities",
      "Excessive social distraction and extravagance"
    ],
    guidance: "Channel your rich creative flow into disciplined, finished works that inspire and uplift others."
  },

  4: {
    number: 4,
    title: "The Builder's Foundation",
    isMasterNumber: false,
    theme: "Disciplined building, laying solid practical foundations, and developing true mastery.",
    opportunities: [
      "Constructing lasting commercial, financial, or systemic structures",
      "Developing recognized technical mastery and expertise",
      "Establishing long-term security, tangible assets, and order"
    ],
    primaryDemands: [
      "Sustained, methodical daily work without requiring quick validation",
      "Uncompromising reliability and execution of responsibilities",
      "Patience with slow, incremental building processes"
    ],
    shadowRisks: [
      "Rigidity and stubborn opposition to necessary adaptation",
      "Workaholism neglecting physical and emotional health",
      "Pessimism or becoming trapped in rigid routine"
    ],
    guidance: "Put your shoulder to the wheel with methodical discipline. What you build in this phase will endure."
  },

  5: {
    number: 5,
    title: "The Explorer's Freedom",
    isMasterNumber: false,
    theme: "Embracing dynamic change, freedom, versatility, and broad direct experience.",
    opportunities: [
      "Expanding horizons through travel, career shifts, and new markets",
      "Developing rapid adaptability and crisis management agility",
      "Connecting diverse groups of people across cultural boundaries"
    ],
    primaryDemands: [
      "Welcoming unexpected changes with open adaptability",
      "Balancing sensory freedom with wise self-governance",
      "Releasing outgrown structures without chaotic destruction"
    ],
    shadowRisks: [
      "Restlessness and abandoning valuable commitments prematurely",
      "Sensory overindulgence or impulsive financial risk-taking",
      "Scattering focus across superficial novelties"
    ],
    guidance: "Embrace transformation and variety, but maintain internal self-governance to avoid chaotic distraction."
  },

  6: {
    number: 6,
    title: "The Nurturer's Stewardship",
    isMasterNumber: false,
    theme: "Responsible love, family devotion, community service, and aesthetic harmony.",
    opportunities: [
      "Deepening intimate family, marital, and community bonds",
      "Creating beautiful, harmonious, and healing environments",
      "Assuming trusted leadership in welfare or community care"
    ],
    primaryDemands: [
      "Accepting the weight of genuine care for those in your sphere",
      "Including yourself in the circle of non-negotiable self-care",
      "Providing empowering guidance without controlling others"
    ],
    shadowRisks: [
      "Martyrdom and severe emotional depletion from over-giving",
      "Intrusive interference disguised as helpful advice",
      "Anxiety over maintaining family perfection"
    ],
    guidance: "Invest in relationships and beautiful spaces, but ensure your giving flows from an abundantly replenished core."
  },

  7: {
    number: 7,
    title: "The Seeker's Wisdom",
    isMasterNumber: false,
    theme: "Introspection, analytical study, spiritual development, and deep truth-seeking.",
    opportunities: [
      "Achieving profound breakthroughs in research, tech, or esoteric study",
      "Cultivating quiet inner wisdom and spiritual illumination",
      "Integrating complex intellectual and philosophical principles"
    ],
    primaryDemands: [
      "Honoring the call for solitude, study, and quiet reflection",
      "Resisting the urge to force aggressive external material push",
      "Sifting surface illusions to discover core truth"
    ],
    shadowRisks: [
      "Cynical emotional detachment and extreme social isolation",
      "Overthinking leading to decision paralysis or paranoia",
      "Neglecting practical physical and financial responsibilities"
    ],
    guidance: "Step back into reflection and study. Internal development in this phase creates the foundation for future mastery."
  },

  8: {
    number: 8,
    title: "The Master's Command",
    isMasterNumber: false,
    theme: "Material achievement, executive authority, financial expansion, and strategic power.",
    opportunities: [
      "Achieving substantial commercial success and executive advancement",
      "Managing large-scale capital, corporate, or real estate assets",
      "Exercising commanding, ethically grounded authority"
    ],
    primaryDemands: [
      "Applying strategic intelligence to complex material systems",
      "Maintaining absolute ethical integrity in financial power",
      "Demonstrating resilience under heavy commercial responsibility"
    ],
    shadowRisks: [
      "Overreach, overconfidence, or aggressive materialism",
      "Equating human self-worth solely with wealth or status",
      "Domineering management that alienates valued partners"
    ],
    guidance: "Step up into executive leadership with courage and ethical clarity. Build tangible material value for the collective."
  },

  9: {
    number: 9,
    title: "The Humanitarian's Harvest",
    isMasterNumber: false,
    theme: "Completion of major life cycles, universal compassionate service, and conscious release.",
    opportunities: [
      "Expanding contribution to humanitarian, artistic, or global scales",
      "Receiving broad public recognition and harvesting past effort",
      "Releasing outgrown patterns to experience profound spiritual freedom"
    ],
    primaryDemands: [
      "Releasing completed projects and relationships with clean gratitude",
      "Offering accumulated wisdom without possessive attachment",
      "Serving the broader collective beyond personal self-interest"
    ],
    shadowRisks: [
      "Bitterness or grief over necessary completions and endings",
      "Clinging to outgrown roles out of fear of the unknown",
      "Vague, impractical idealism without grounded action"
    ],
    guidance: "Complete old cycles with grace, release what is finished, and offer your wisdom generously to the world."
  },

  11: {
    number: 11,
    title: "The Illuminator's Vision (Master)",
    isMasterNumber: true,
    theme: "Heightened spiritual sensitivity, inspired perception, and catalytic visionary service.",
    opportunities: [
      "Channeling extraordinary intuitive insight and creative revelation",
      "Inspiring broad audiences toward higher spiritual awareness",
      "Serving as a visionary catalyst in transformational movements"
    ],
    primaryDemands: [
      "Managing elevated nervous system voltage through spiritual practice",
      "Translating subtle intuitive perception into practical, usable guidance",
      "Trusting inner revelation in the face of external skepticism"
    ],
    shadowRisks: [
      "Severe anxiety, nervous exhaustion, or sensory overload",
      "Self-doubt causing withdrawal into passive hesitation",
      "Escapism from physical reality"
    ],
    guidance: "Trust your heightened intuition. Ground spiritual revelations into gentle, inspiring guidance for others."
  },

  22: {
    number: 22,
    title: "The Master Builder's Scale (Master)",
    isMasterNumber: true,
    theme: "Large-scale systemic construction, bridging visionary ideals with global infrastructure.",
    opportunities: [
      "Constructing monumental systemic or global projects that benefit many",
      "Uniting visionary idealism with rigorous practical engineering",
      "Building enduring institutions that outlast individual lifespan"
    ],
    primaryDemands: [
      "Holding vast visionary scope while executing brick-by-brick detail",
      "Demonstrating extraordinary patience with slow material building",
      "Managing immense structural and commercial responsibility"
    ],
    shadowRisks: [
      "Extreme impatience and perfectionist paralysis",
      "Crushing workaholism causing physical collapse",
      "Misusing monumental power for ego goals"
    ],
    guidance: "Build systematically at scale. Your vision has the power to transform infrastructure for generations."
  },

  33: {
    number: 33,
    title: "The Master Teacher's Grace (Master)",
    isMasterNumber: true,
    theme: "Embodied unconditional love, spiritual stewardship, and transformative compassionate presence.",
    opportunities: [
      "Embodying radiant, unconditional love in daily action and presence",
      "Uplifting collective consciousness through selfless stewardship",
      "Healing communities through profound compassionate presence"
    ],
    primaryDemands: [
      "Sustaining non-negotiable energetic self-care and boundaries",
      "Offering unconditional care without absorbing collective grief",
      "Maintaining deep spiritual peace amid world suffering"
    ],
    shadowRisks: [
      "Severe emotional depletion from taking on others' burdens",
      "Neglecting physical health under spiritual demands",
      "Martyrdom complex"
    ],
    guidance: "Radiate compassionate love from a grounded, self-replenished core. Your presence itself heals."
  }
};

export const ALL_CHALLENGE_DATABASE: Record<number, ChallengeDetail> = {
  0: {
    number: 0,
    title: "The Zero Challenge — The Open Curriculum",
    theme: "Self-chosen developmental choices and freedom to address any life lesson.",
    developmentalDemand: "Developing acute self-awareness to identify and overcome personal blind spots without external forcing.",
    recurringObstacles: [
      "Lack of clear external friction leading to complacency",
      "Difficulty choosing a specific developmental priority",
      "Navigating unassigned spiritual freedom"
    ],
    lessonsToMaster: [
      "Self-directed discipline without requiring external crisis",
      "Choosing personal growth purely out of soul desire",
      "Mastering holistic life balance"
    ],
    guidance: "You have the freedom to choose your focus. Set high internal standards and actively refine your character."
  },

  1: {
    number: 1,
    title: "Challenge 1 — The Demand for Individual Authority",
    theme: "Developing genuine self-confidence, initiative, and independent decision-making.",
    developmentalDemand: "Stepping forward on your own authority without relying on external approval or safety nets.",
    recurringObstacles: [
      "Encounters with domineering figures who attempt to control choices",
      "Paralyzing self-doubt and fear of standing out alone",
      "Oscillating between passive submission and defensive rebellion"
    ],
    lessonsToMaster: [
      "Grounding self-trust in authentic inner experience",
      "Taking decisive, independent action without needing consensus",
      "Leading with quiet, humble conviction"
    ],
    guidance: "Stop waiting for permission. Trust your judgment and step forward with quiet, courageous autonomy."
  },

  2: {
    number: 2,
    title: "Challenge 2 — The Demand for Cooperative Sensitivity",
    theme: "Developing genuine partnership skills, emotional attunement, and healthy vulnerability.",
    developmentalDemand: "Learning to cooperate, listen, and build alliances without losing personal boundaries.",
    recurringObstacles: [
      "Hypersensitivity to criticism leading to hurt withdrawal",
      "Suppressing needs to avoid friction, leading to quiet resentment",
      "Attracting overbearing partners who drown out your voice"
    ],
    lessonsToMaster: [
      "Practicing genuine vulnerability without fear of dissolution",
      "Establishing clear, healthy emotional boundaries in love and work",
      "Empathetic listening that respects both self and partner"
    ],
    guidance: "Build genuine cooperative partnerships. Real strength lies in empathetic, boundary-aware collaboration."
  },

  3: {
    number: 3,
    title: "Challenge 3 — The Demand for Authentic Self-Expression",
    theme: "Overcoming fear of self-disclosure and expressing authentic truth without superficial masking.",
    developmentalDemand: "Speaking your genuine perspective and sharing authentic creative work courageously.",
    recurringObstacles: [
      "Fear of ridicule or public rejection causing vocal paralysis",
      "Scattering creative energy in superficial banter to hide depth",
      "Exaggeration or emotional drama disguising underlying insecurity"
    ],
    lessonsToMaster: [
      "Sharing authentic feelings with honest, unpolished vulnerability",
      "Disciplined focus to complete creative communications",
      "Using voice to uplift rather than entertain superficially"
    ],
    guidance: "Speak your authentic truth. Release polished performances and let your genuine voice be heard."
  },

  4: {
    number: 4,
    title: "Challenge 4 — The Demand for Disciplined Foundations",
    theme: "Developing methodical work ethic, practical order, and patience to build enduring structures.",
    developmentalDemand: "Showing up consistently to do the unglamorous, methodical work that long-term success requires.",
    recurringObstacles: [
      "Impatience with routine, detail, and slow incremental progress",
      "Encounters with disorganization, chaos, or broken structures",
      "Resistance to discipline resulting in repeated project failures"
    ],
    lessonsToMaster: [
      "Building practical systems step-by-step with patient focus",
      "Honoring commitments and financial responsibilities meticulously",
      "Finding quiet satisfaction in unglamorous, high-quality craft"
    ],
    guidance: "Embrace discipline. The methodical effort you invest now creates the unshakeable foundation for your future."
  },

  5: {
    number: 5,
    title: "Challenge 5 — The Demand for Adaptability & Freedom",
    theme: "Releasing rigid control, embracing constructive change, and managing personal freedom wisely.",
    developmentalDemand: "Navigating uncertainty with open adaptability while exercising conscious moderation.",
    recurringObstacles: [
      "Fear of change causing desperate clinging to outgrown situations",
      "Restless impulsivity and sensory overindulgence destroying stability",
      "Sudden unexpected shifts disrupting long-term plans"
    ],
    lessonsToMaster: [
      "Flowing with unexpected changes without panic or resistance",
      "Exercising freedom with wisdom, temperance, and responsibility",
      "Finding inner stability that remains undisturbed by external shift"
    ],
    guidance: "Release rigid control and embrace change. True freedom is an internal state that adapts with grace."
  },

  6: {
    number: 6,
    title: "Challenge 6 — The Demand for Responsible Loving Service",
    theme: "Accepting domestic and community responsibility, avoiding control, and practicing self-care.",
    developmentalDemand: "Offering loving care and commitment without falling into martyrdom or perfectionist control.",
    recurringObstacles: [
      "Idealistic relationship expectations causing chronic disappointment",
      "Over-extending care until resentment and physical collapse occur",
      "Attempting to reform or control loved ones under the guise of care"
    ],
    lessonsToMaster: [
      "Loving partners as they are rather than demanding ideal perfection",
      "Setting firm boundaries to preserve personal health while caring",
      "Allowing others the freedom to face their own developmental lessons"
    ],
    guidance: "Love responsibly, but release the urge to fix or control. Replenish yourself so your care remains sustainable."
  },

  7: {
    number: 7,
    title: "Challenge 7 — The Demand for Analytical & Spiritual Depth",
    theme: "Overcoming superficiality, developing faith, and probing the deeper dimensions of life.",
    developmentalDemand: "Engaging in serious study, inner reflection, and developing trust in spiritual truth.",
    recurringObstacles: [
      "Cynical skepticism or fear of trusting life and people",
      "Withdrawal into cold, isolated intellectualism or pride",
      "Anxiety stemming from avoiding quiet self-examination"
    ],
    lessonsToMaster: [
      "Combining sharp intellectual rigor with open-hearted faith",
      "Using solitude constructively for research and inner growth",
      "Sharing hard-won wisdom with the world instead of hiding it"
    ],
    guidance: "Go deeper. Seek genuine spiritual and intellectual understanding, and trust the quiet wisdom within."
  },

  8: {
    number: 8,
    title: "Challenge 8 — The Demand for Material & Ethical Mastery",
    theme: "Engaging effectively with money, authority, and power with absolute ethical integrity.",
    developmentalDemand: "Mastering practical commercial reality and exercising power in service of genuine good.",
    recurringObstacles: [
      "Fear of financial lack or distaste for commercial systems",
      "Financial volatility resulting from poor management or ethical compromise",
      "Power struggles with authoritative institutions"
    ],
    lessonsToMaster: [
      "Managing money and material resources with competence and ethics",
      "Overcoming fear of power and assuming constructive authority",
      "Viewing material success as a tool for collective upliftment"
    ],
    guidance: "Master material systems. Handle money and authority with absolute integrity and strategic competence."
  }
};

/**
 * PINNACLE & CHALLENGE COMPLETE ENGINE
 */
export interface PinnaclePhaseResult {
  phaseIndex: number;
  phaseLabel: string;
  ageRange: string;
  pinnacleNumber: number;
  pinnacleDetail: PinnacleDetail;
  challengeNumber: number;
  challengeDetail: ChallengeDetail;
}

export interface PinnacleAndChallengeProfile {
  dob: string;
  lifePathNumber: number;
  lifePathRoot: number;
  dayReduced: number;
  monthReduced: number;
  yearReduced: number;
  firstPinnacleEndAge: number;
  phases: PinnaclePhaseResult[];
  mainChallengeNumber: number;
  mainChallengeDetail: ChallengeDetail;
}

function reduceVal(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  let curr = n;
  while (curr > 9) {
    const sum = String(curr).split("").reduce((a, b) => a + Number(b), 0);
    if (sum === 11 || sum === 22 || sum === 33) return sum;
    curr = sum;
  }
  return curr;
}

function reduceToSingleOnly(n: number): number {
  let curr = n;
  while (curr > 9) {
    curr = String(curr).split("").reduce((a, b) => a + Number(b), 0);
  }
  return curr;
}

export function calculatePinnaclesAndChallenges(dob: string): PinnacleAndChallengeProfile {
  const parts = dob.split("-").map(Number);
  const yearRaw = parts[0] || 1980;
  const monthRaw = parts[1] || 1;
  const dayRaw = parts[2] || 1;

  // Reduced Day, Month, Year
  const dayRed = reduceVal(dayRaw);
  const monthRed = reduceVal(monthRaw);
  const yearSum = String(yearRaw).split("").reduce((a, b) => a + Number(b), 0);
  const yearRed = reduceVal(yearSum);

  // Life Path
  const lpTotal = dayRed + monthRed + yearRed;
  const lpVal = reduceVal(lpTotal);
  const lpRoot = reduceToSingleOnly(lpVal);

  // First Pinnacle End Age = 36 - Life Path Root
  const firstPinnacleEndAge = 36 - lpRoot;

  // Pinnacles
  const p1 = reduceVal(dayRed + monthRed);
  const p2 = reduceVal(dayRed + yearRed);
  const p3 = reduceVal(p1 + p2);
  const p4 = reduceVal(monthRed + yearRed);

  // Challenges (using single digit reduced day, month, year for subtraction)
  const dSingle = reduceToSingleOnly(dayRed);
  const mSingle = reduceToSingleOnly(monthRed);
  const ySingle = reduceToSingleOnly(yearRed);

  const c1 = Math.abs(mSingle - dSingle);
  const c2 = Math.abs(ySingle - dSingle);
  const c3 = Math.abs(c1 - c2); // Main Challenge
  const c4 = Math.abs(mSingle - ySingle);

  const pinnacleArr = [p1, p2, p3, p4];
  const challengeArr = [c1, c2, c3, c4];

  const phaseRanges = [
    `Birth to Age ${firstPinnacleEndAge}`,
    `Age ${firstPinnacleEndAge + 1} to ${firstPinnacleEndAge + 9}`,
    `Age ${firstPinnacleEndAge + 10} to ${firstPinnacleEndAge + 18}`,
    `Age ${firstPinnacleEndAge + 19} Onward`
  ];

  const phaseLabels = [
    "First Pinnacle & Challenge Phase",
    "Second Pinnacle & Challenge Phase",
    "Third Pinnacle & Challenge Phase",
    "Fourth (Final) Pinnacle & Challenge Phase"
  ];

  const phases: PinnaclePhaseResult[] = [];

  for (let i = 0; i < 4; i++) {
    const pNum = pinnacleArr[i];
    const cNum = challengeArr[i];

    phases.push({
      phaseIndex: i + 1,
      phaseLabel: phaseLabels[i],
      ageRange: phaseRanges[i],
      pinnacleNumber: pNum,
      pinnacleDetail: ALL_PINNACLE_DATABASE[pNum] || ALL_PINNACLE_DATABASE[1],
      challengeNumber: cNum,
      challengeDetail: ALL_CHALLENGE_DATABASE[cNum] || ALL_CHALLENGE_DATABASE[0]
    });
  }

  return {
    dob,
    lifePathNumber: lpVal,
    lifePathRoot: lpRoot,
    dayReduced: dayRed,
    monthReduced: monthRed,
    yearReduced: yearRed,
    firstPinnacleEndAge,
    phases,
    mainChallengeNumber: c3,
    mainChallengeDetail: ALL_CHALLENGE_DATABASE[c3] || ALL_CHALLENGE_DATABASE[0]
  };
}

export function getPinnacleDetail(num: number): PinnacleDetail {
  return ALL_PINNACLE_DATABASE[num] || ALL_PINNACLE_DATABASE[1];
}

export function getChallengeDetail(num: number): ChallengeDetail {
  return ALL_CHALLENGE_DATABASE[num] || ALL_CHALLENGE_DATABASE[0];
}
