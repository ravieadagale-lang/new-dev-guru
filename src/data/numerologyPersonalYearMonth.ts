// src/data/numerologyPersonalYearMonth.ts
// Chapter Twenty-One: Personal Year and Personal Month Engine & Database
// Detailed standalone data module for 9 Personal Years and 9 Personal Month cycles.

export interface PersonalYearRemedies {
  luckyColours: string[];
  gemstones: string;
  mantra: string;
  auspiciousDays: string[];
  practicalGuidance: string;
  criticalAvoidance: string;
}

export interface PersonalYearDetail {
  yearNumber: number;
  title: string;
  theme: string;
  energyDescription: string;
  keyFocusAreas: string[];
  whatToAvoid: string[];
  remediesAndGuidance: PersonalYearRemedies;
}

export interface PersonalMonthDetail {
  monthNumber: number;
  title: string;
  theme: string;
  monthlyRefinement: string;
  bestActivities: string[];
  keyChallenges: string[];
  strategicAdvice: string;
}

export interface ChapterTwentyOneTheoryData {
  title: string;
  subtitle: string;
  quote: {
    text: string;
    author: string;
  };
  introParagraphs: string[];
  calculationRules: {
    personalYearRule: string;
    personalMonthRule: string;
    transitionGuidance: string;
  };
}

export const CHAPTER_TWENTY_ONE_THEORY_DATA: ChapterTwentyOneTheoryData = {
  title: "Personal Year & Personal Month Systems",
  subtitle: "The Nine-Year Epicycle & Monthly Refinement Engine",
  quote: {
    text: "There is a time for everything, and a season for every activity under the heavens.",
    author: "Ecclesiastes 3:1"
  },
  introParagraphs: [
    "If the Life Path Number describes the overall road chosen for a lifetime, and Pinnacle Cycles describe the major terrain features, the Personal Year and Personal Month numbers provide numerology's most immediate and temporally precise guidance system.",
    "Every individual moves through a continuous nine-year epicycle. Each year carries a dominant vibrational quality that determines what types of opportunities, growth themes, and actions are most powerfully supported.",
    "Within any Personal Year, each calendar month refines the annual vibration, allowing actions to be timed with surgical alignment rather than relying on random circumstance."
  ],
  calculationRules: {
    personalYearRule: "Personal Year = (Reduced Birth Day + Reduced Birth Month + Reduced Target Year Digits) reduced to a single digit 1–9. No Master Numbers are preserved in Personal Year calculations.",
    personalMonthRule: "Personal Month = (Personal Year Number + Calendar Month Number) reduced to a single digit 1–9. January = 1, February = 2, through December = 12.",
    transitionGuidance: "Although the Personal Year officially begins on January 1st, its energetic current begins asserting itself approximately three months prior (around October of the preceding calendar year)."
  }
};

export const ALL_PERSONAL_YEAR_DATABASE: Record<number, PersonalYearDetail> = {
  1: {
    yearNumber: 1,
    title: "Personal Year 1 — The Year of New Beginnings",
    theme: "Plant Seeds • Launch • Initiate • Take Courageous Steps • Establish New Direction",
    energyDescription: "Personal Year 1 marks the opening of a completely new nine-year epicycle. After the completions and releases of the previous Year 9, this year arrives as a clean slate. It carries fresh potential, clear momentum, and peak energy for genuine new initiation. Choices made in this year establish the trajectory not only for the coming twelve months, but for the entire nine-year cycle now beginning.",
    keyFocusAreas: [
      "Launching major new business ventures, creative projects, or career directions",
      "Establishing independent personal authority and self-directed leadership",
      "Initiating new health regimes, personal habits, and long-term learning goals",
      "Taking decisive, irreversible first steps toward long-held ambitions"
    ],
    whatToAvoid: [
      "Excessive caution and waiting for perfect external conditions before moving",
      "Scattering energy across dozens of simultaneous beginnings instead of one core direction",
      "Deferring to others' doubts or seeking consensus for independent callings"
    ],
    remediesAndGuidance: {
      luckyColours: ["Orange", "Gold", "Bright Yellow"],
      gemstones: "Ruby (Manik) on the right hand ring finger on Sundays",
      mantra: "Chant 'Om Suryaya Namaha' 108 times at sunrise on Sundays",
      auspiciousDays: ["Sundays", "Dates reducing to 1 (1st, 10th, 19th, 28th)"],
      practicalGuidance: "Identify the single most vital new direction you wish to establish for the next 9 years. Take one concrete, irreversible first step in your first month.",
      criticalAvoidance: "Do not remain passive or spend the year merely planning. Initiation requires tangible action."
    }
  },

  2: {
    yearNumber: 2,
    title: "Personal Year 2 — The Year of Partnership and Patience",
    theme: "Cooperate • Build Relationships • Be Patient • Listen Deeply • Allow Growth",
    energyDescription: "Personal Year 2 is the year in which the seeds planted in Year 1 begin to germinate underground. The energy shifts from bold solo assertion to gentle, cooperative stewardship. It demands patience, attentiveness, and diplomatic intelligence. Forcing rapid solo breakthroughs this year often meets resistance, whereas nurturing alliances and refining details produces extraordinary long-term strength.",
    keyFocusAreas: [
      "Deepening strategic business partnerships, marriages, and core relationships",
      "Cultivating diplomatic negotiation, mediation, and conflict resolution skills",
      "Attending to subtle details, background organization, and quiet support systems",
      "Developing intuitive listening and emotional attunement"
    ],
    whatToAvoid: [
      "Aggressive solo initiatives or forcing premature outcomes",
      "Impatience with the measured, collaborative pace of development",
      "Hypersensitivity to criticism or suppressing personal boundaries to keep peace"
    ],
    remediesAndGuidance: {
      luckyColours: ["White", "Cream", "Light Green"],
      gemstones: "Pearl (Moti) or Moonstone on the little finger on Mondays",
      mantra: "Chant 'Om Chandraya Namaha' 108 times on Monday evenings",
      auspiciousDays: ["Mondays", "Dates reducing to 2 or 7 (2nd, 7th, 11th, 16th, 20th, 25th, 29th)"],
      practicalGuidance: "Invest intentionally in three key collaborative relationships. Small, consistent acts of attentiveness yield deep trust.",
      criticalAvoidance: "Avoid pushing for unilateral decisions. True progress this year requires genuine co-creation."
    }
  },

  3: {
    yearNumber: 3,
    title: "Personal Year 3 — The Year of Creative Expression",
    theme: "Create • Communicate • Express • Expand Socially • Share Your Voice",
    energyDescription: "Personal Year 3 brings the full creative flowering of the cycle. The patient preparation of Year 2 bursts into visible, expressive, joyfully shared form. It is an expansive, charismatic year that favors writing, speaking, artistic creation, media, and social connection. Ideas flow naturally, social networks broaden, and creative confidence is at an all-time high.",
    keyFocusAreas: [
      "Publishing, public speaking, marketing, and media campaigns",
      "Launching artistic, literary, design, or performance projects",
      "Expanding social circles and building vibrant community networks",
      "Infusing joy, optimism, and aesthetic beauty into daily work"
    ],
    whatToAvoid: [
      "Scattering creative energy across too many unfinished inspirations",
      "Financial impulsiveness driven by social expansiveness",
      "Using charm or superficial humor to avoid deeper emotional realities"
    ],
    remediesAndGuidance: {
      luckyColours: ["Yellow", "Light Purple", "Sky Blue"],
      gemstones: "Yellow Sapphire (Pukhraj) on the index finger on Thursdays",
      mantra: "Chant 'Om Gurave Namaha' 108 times on Thursday mornings",
      auspiciousDays: ["Thursdays", "Dates reducing to 3 (3rd, 12th, 21st, 30th)"],
      practicalGuidance: "Select one flagship creative endeavor and commit to completing it fully rather than chasing every new spark.",
      criticalAvoidance: "Maintain strict budget discipline despite increased social opportunities."
    }
  },

  4: {
    yearNumber: 4,
    title: "Personal Year 4 — The Year of Work and Foundation Building",
    theme: "Build • Discipline • Organize • Work Methodically • Establish Lasting Structure",
    energyDescription: "Personal Year 4 is the year of disciplined, methodical construction. The creative expansion of Year 3 must now be anchored in solid practical foundations. This year demands hard work, systematic organization, financial consolidation, and attention to health and routine. While it can feel sober and demanding, the structures built in Year 4 endure across the entire remainder of the cycle.",
    keyFocusAreas: [
      "Building robust operational systems, financial reserves, and practical infrastructure",
      "Developing technical expertise and mastering demanding skills",
      "Consolidating debts, property management, and long-term health maintenance",
      "Fulfilling obligations with meticulous reliability"
    ],
    whatToAvoid: [
      "Workaholism that neglects physical self-care and family wellbeing",
      "Resisting necessary structural updates out of rigid stubbornness",
      "Taking shortcuts or making speculative financial gambles"
    ],
    remediesAndGuidance: {
      luckyColours: ["Blue", "Grey", "Brown"],
      gemstones: "Hessonite Garnet (Gomed) on the middle finger on Saturdays",
      mantra: "Chant 'Om Rahave Namaha' 108 times on Saturday mornings",
      auspiciousDays: ["Saturdays", "Dates reducing to 4 or 8 (4th, 8th, 13th, 17th, 22nd, 26th, 31st)"],
      practicalGuidance: "Establish a non-negotiable daily work and health routine. Consistent incremental labor yields unshakeable security.",
      criticalAvoidance: "Do not launch speculative gambles. Focus purely on tangible, grounded building."
    }
  },

  5: {
    yearNumber: 5,
    title: "Personal Year 5 — The Year of Change and Freedom",
    theme: "Embrace Change • Seek Adventure • Be Adaptable • Release Outgrown Patterns",
    energyDescription: "Personal Year 5 is the dynamic mid-cycle pivot point. After the structured discipline of Year 4, Year 5 unleashes a wave of movement, freedom, and unexpected opportunities. Established routines shift, horizons expand, and travel or career transitions naturally occur. The key requirement is conscious adaptability—flowing with constructive change while maintaining internal self-governance.",
    keyFocusAreas: [
      "Embracing major career, residential, or lifestyle transitions",
      "Travel, international expansion, and exploring new markets",
      "Releasing outgrown commitments and rigid behavioral habits",
      "Promoting products, sales initiatives, and public outreach"
    ],
    whatToAvoid: [
      "Restless impulsivity and abandoning valuable long-term assets prematurely",
      "Sensory overindulgence, reckless financial spending, or physical hazards",
      "Scattering focus across superficial novelties"
    ],
    remediesAndGuidance: {
      luckyColours: ["Green", "Turquoise", "Silver"],
      gemstones: "Emerald (Panna) on the little finger on Wednesdays",
      mantra: "Chant 'Om Budhaya Namaha' 108 times on Wednesday mornings",
      auspiciousDays: ["Wednesdays", "Dates reducing to 5 (5th, 14th, 23rd)"],
      practicalGuidance: "Identify one outgrown area of life and make a conscious, courageous pivot within the first quarter.",
      criticalAvoidance: "Avoid binding permanent legal commitments during peak volatile months without careful review."
    }
  },

  6: {
    yearNumber: 6,
    title: "Personal Year 6 — The Year of Love and Responsibility",
    theme: "Love • Family • Community • Service • Aesthetic Harmony • Accept Responsibility",
    energyDescription: "Personal Year 6 anchors the cycle in domestic warmth, family devotion, community service, and aesthetic refinement. After the high-velocity shifts of Year 5, Year 6 calls for investment in home, marriage, children, and close relationships. It is an extraordinary year for marriage, home renovation, healing long-standing family wounds, and community leadership.",
    keyFocusAreas: [
      "Strengthening family ties, marriage bonds, and home environments",
      "Creating beautiful, harmonious spaces through interior design and artistic care",
      "Assuming trusted responsibility in community, healthcare, or education",
      "Prioritizing emotional healing and physical wellness"
    ],
    whatToAvoid: [
      "Martyrdom and severe emotional depletion from over-giving without limits",
      "Interfering in loved ones' lives under the guise of helping",
      "Perfectionist demands on family members causing domestic friction"
    ],
    remediesAndGuidance: {
      luckyColours: ["Pink", "Indigo", "Rose", "Cream"],
      gemstones: "Diamond or White Zircon on the middle finger on Fridays",
      mantra: "Chant 'Om Shukraya Namaha' 108 times on Friday evenings",
      auspiciousDays: ["Fridays", "Dates reducing to 6 (6th, 15th, 24th)"],
      practicalGuidance: "Dedicate quality time to home and core relationships. Include yourself explicitly in the circle of non-negotiable care.",
      criticalAvoidance: "Avoid sacrificing your own vital physical health to satisfy others' excessive demands."
    }
  },

  7: {
    yearNumber: 7,
    title: "Personal Year 7 — The Year of Introspection and Inner Development",
    theme: "Reflect • Study • Seek Wisdom • Develop Spiritually • Rest • Go Inward",
    energyDescription: "Personal Year 7 is the sacred sabbatical year of the nine-year cycle. The energetic current redirects inward toward deep analysis, spiritual contemplation, research, and self-discovery. Pushing aggressively for outward commercial expansion in Year 7 often meets inexplicable slowdowns, whereas studying, writing, researching, and refining inner wisdom yields profound breakthroughs.",
    keyFocusAreas: [
      "Specialized research, academic study, technology development, and writing",
      "Establishing meditation, yoga, or contemplative spiritual practices",
      "Honest self-examination, therapy, and psychological integration",
      "Resting, spending time in nature, and energetic recovery"
    ],
    whatToAvoid: [
      "Forcing aggressive commercial expansions or major financial gambles",
      "Cynical emotional withdrawal and isolating from loved ones",
      "Resisting quiet reflection through frantic busyness"
    ],
    remediesAndGuidance: {
      luckyColours: ["Violet", "Deep Blue", "Teal", "Grey"],
      gemstones: "Cat's Eye (Lehsunia) on the middle finger on Tuesdays",
      mantra: "Chant 'Om Ketave Namaha' 108 times on Tuesday mornings",
      auspiciousDays: ["Tuesdays", "Saturdays", "Dates reducing to 7 (7th, 16th, 25th)"],
      practicalGuidance: "Establish a daily 15-minute contemplative practice. Allow space for quiet study and intellectual depth.",
      criticalAvoidance: "Avoid speculative financial investments or rushing into new commercial ventures."
    }
  },

  8: {
    yearNumber: 8,
    title: "Personal Year 8 — The Year of Achievement and Material Mastery",
    theme: "Achieve • Build Materially • Exercise Authority • Harvest Results • Command Success",
    energyDescription: "Personal Year 8 is the great harvest year of the epicycle. The efforts, wisdom, and foundations built across Years 1 through 7 now coalesce into tangible material success, executive advancement, financial expansion, and public recognition. It demands strategic intelligence, decisive authority, and high ethical standards to command substantial resources.",
    keyFocusAreas: [
      "Maximizing business growth, career promotion, and commercial deals",
      "Managing major capital investments, corporate assets, and real estate",
      "Exercising commanding, ethically grounded executive leadership",
      "Claiming well-deserved compensation, public honor, and authority"
    ],
    whatToAvoid: [
      "Ethical compromises or reckless overextension in pursuit of quick profit",
      "Domineering management styles that alienate trusted colleagues",
      "Confusing commercial net worth with personal human value"
    ],
    remediesAndGuidance: {
      luckyColours: ["Dark Blue", "Black", "Dark Brown", "Deep Red"],
      gemstones: "Blue Sapphire (Neelam) or Amethyst on the middle finger on Saturdays",
      mantra: "Chant 'Om Shanaischaraya Namaha' 108 times on Saturday mornings",
      auspiciousDays: ["Saturdays", "Dates reducing to 8 (8th, 17th, 26th)"],
      practicalGuidance: "Focus executive energy on your most lucrative, impactful project. Negotiate assertively from a position of strength.",
      criticalAvoidance: "Do not take ethical shortcuts. Year 8 amplifies both honest rewards and consequences of wrongdoing."
    }
  },

  9: {
    yearNumber: 9,
    title: "Personal Year 9 — The Year of Completion and Release",
    theme: "Complete • Release • Forgive • Serve Universally • End Cycles Graciously",
    energyDescription: "Personal Year 9 brings the current nine-year epicycle to its full, dignified conclusion. It is the year for completing unfinished projects, releasing outgrown relationships, clearing lingering debts, and forgiving past grievances. By clearing away what has served its purpose, you prepare pristine, fertile soil for the vibrant Personal Year 1 that follows.",
    keyFocusAreas: [
      "Finishing long-term projects and clearing outstanding debts/obligations",
      "Graciously releasing outgrown business, personal, or habit cycles",
      "Engaging in altruistic, humanitarian, or mentoring service",
      "Forgiving past hurts and cultivating deep spiritual gratitude"
    ],
    whatToAvoid: [
      "Launching major long-term business or life ventures (defer to Year 1)",
      "Clinging bitterly to relationships or roles that have naturally completed",
      "Accumulating new long-term financial liabilities"
    ],
    remediesAndGuidance: {
      luckyColours: ["Red", "Crimson", "Gold", "White"],
      gemstones: "Red Coral (Moonga) on the ring finger on Tuesdays",
      mantra: "Chant 'Om Mangalaya Namaha' 108 times on Tuesday mornings",
      auspiciousDays: ["Tuesdays", "Dates reducing to 9 (9th, 18th, 27th)"],
      practicalGuidance: "Make a list of lingering incomplete tasks and complete or formally archive three major items each month.",
      criticalAvoidance: "Avoid starting brand new long-term companies or lifelong contracts—wait for the clean slate of Year 1."
    }
  }
};

export const ALL_PERSONAL_MONTH_DATABASE: Record<number, PersonalMonthDetail> = {
  1: {
    monthNumber: 1,
    title: "Personal Month 1 — The Spark of Initiation",
    theme: "Independent Action • New Starts • Decisive Moves",
    monthlyRefinement: "Brings a concentrated surge of fresh momentum into the annual theme. Ideal for taking independent action, launching new sub-initiatives, and setting clear monthly targets.",
    bestActivities: [
      "Launching new campaigns or personal goals",
      "Making decisive individual decisions without hesitation",
      "Establishing new daily habits or schedules"
    ],
    keyChallenges: [
      "Impatience with delays",
      "Impulsive choices without consulting team members"
    ],
    strategicAdvice: "Take the lead. This month rewards bold individual initiative."
  },

  2: {
    monthNumber: 2,
    title: "Personal Month 2 — The Current of Cooperation",
    theme: "Partnership • Diplomacy • Patient Alignment",
    monthlyRefinement: "Softens the pace to focus on collaboration, relationship refinement, and attention to detail. Excellent for negotiations and building trust.",
    bestActivities: [
      "Nurturing business and personal partnerships",
      "Mediation, contract negotiations, and joint planning",
      "Fine-tuning operational details behind the scenes"
    ],
    keyChallenges: [
      "Hypersensitivity to group friction",
      "Indecision born of trying to please everyone"
    ],
    strategicAdvice: "Focus on listening and partnership. Progress comes through mutual alignment."
  },

  3: {
    monthNumber: 3,
    title: "Personal Month 3 — The Flow of Expression",
    theme: "Creative Output • Social Connection • Inspired Communication",
    monthlyRefinement: "Amplifies social charisma, creative inspiration, and communicative reach. A fantastic window for marketing, writing, media, and celebration.",
    bestActivities: [
      "Public presentations, publishing, and marketing campaigns",
      "Social networking, team celebrations, and creative arts",
      "Brainstorming innovative solutions"
    ],
    keyChallenges: [
      "Scattering focus across too many fun activities",
      "Overspending on social events"
    ],
    strategicAdvice: "Express your ideas with enthusiasm, but keep your primary project on schedule."
  },

  4: {
    monthNumber: 4,
    title: "Personal Month 4 — The Anchor of Discipline",
    theme: "Practical Labor • Systemic Order • Tangible Progress",
    monthlyRefinement: "Brings a sobering, highly practical focus to the month. Demands methodical work, organization, financial audit, and concrete execution.",
    bestActivities: [
      "Organizing files, finances, and operational workflows",
      "Tackling heavy, detailed technical work",
      "Setting long-term schedules and health maintenance"
    ],
    keyChallenges: [
      "Feeling bogged down by routine workload",
      "Rigidity or frustration with slow progress"
    ],
    strategicAdvice: "Put your head down and do the practical work. Solid progress accumulates step by step."
  },

  5: {
    monthNumber: 5,
    title: "Personal Month 5 — The Wind of Transformation",
    theme: "Flexibility • Variety • New Opportunities",
    monthlyRefinement: "Introduces dynamic shifts, unexpected invitations, travel, or sudden changes in schedule. Rewards fast adaptability and versatility.",
    bestActivities: [
      "Short trips, field research, and networking",
      "Adapting strategies to new market conditions",
      "Trying fresh approaches to stagnant problems"
    ],
    keyChallenges: [
      "Restlessness and losing sight of routine priorities",
      "Making impulsive financial commitments"
    ],
    strategicAdvice: "Stay light on your feet. Adapt gracefully to changing circumstances."
  },

  6: {
    monthNumber: 6,
    title: "Personal Month 6 — The Haven of Responsibility",
    theme: "Family Care • Domestic Harmony • Community Service",
    monthlyRefinement: "Directs focus toward domestic priorities, family wellbeing, team care, and aesthetic improvements in environment.",
    bestActivities: [
      "Home improvements, family gatherings, and relationship care",
      "Supporting colleagues and fostering team harmony",
      "Aesthetic design, interior decoration, and wellness focus"
    ],
    keyChallenges: [
      "Taking on too many personal burdens for others",
      "Perfectionism causing domestic tension"
    ],
    strategicAdvice: "Nurture your closest relationships and create an uplifting environment."
  },

  7: {
    monthNumber: 7,
    title: "Personal Month 7 — The Sanctuary of Insight",
    theme: "Research • Reflection • Quiet Analysis",
    monthlyRefinement: "Invites a temporary pause in aggressive outward expansion to focus on research, strategic analysis, study, and spiritual renewal.",
    bestActivities: [
      "Deep research, data analysis, and strategic planning",
      "Mediation, quiet retreats, and personal study",
      "Evaluating progress without forcing external launches"
    ],
    keyChallenges: [
      "Feeling disconnected from fast-moving business circles",
      "Overthinking leading to unnecessary worry"
    ],
    strategicAdvice: "Use this month to study, refine your strategy, and recharge your inner vision."
  },

  8: {
    monthNumber: 8,
    title: "Personal Month 8 — The Surge of Authority",
    theme: "Financial Deals • Executive Leadership • Material Focus",
    monthlyRefinement: "Magnifies commercial drive, executive decision-making, and financial opportunities. The premier month for business advancement.",
    bestActivities: [
      "Closing commercial deals, contract negotiations, and financial investments",
      "Claiming executive leadership and directing key projects",
      "Auditing assets and optimizing income streams"
    ],
    keyChallenges: [
      "Overextension in financial risk",
      "Overly forceful communication with partners"
    ],
    strategicAdvice: "Command your position with confidence and ethical clarity. Harvest tangible value."
  },

  9: {
    monthNumber: 9,
    title: "Personal Month 9 — The Grace of Completion",
    theme: "Finalizing Tasks • Clearing Clutter • Conscious Release",
    monthlyRefinement: "Brings monthly tasks to completion, clears operational backlogs, and releases outgrown projects in preparation for the next cycle.",
    bestActivities: [
      "Completing outstanding assignments and closing pending files",
      "Decluttering physical, digital, and emotional spaces",
      "Offering generous assistance or mentoring to others"
    ],
    keyChallenges: [
      "Resistance to finishing old projects",
      "Feeling emotionally drained if holding onto past stress"
    ],
    strategicAdvice: "Tie up loose ends. Clean the slate so you are ready for fresh beginnings."
  }
};

/**
 * CALCULATION ENGINE FOR PERSONAL YEAR AND MONTH
 */
export interface PersonalYearCalculationResult {
  dob: string;
  targetYear: number;
  dayReduced: number;
  monthReduced: number;
  targetYearReduced: number;
  personalYearNumber: number;
  personalYearDetail: PersonalYearDetail;
}

export interface PersonalMonthCalculationResult {
  calendarMonthIndex: number; // 1 = Jan, 12 = Dec
  monthName: string;
  personalMonthNumber: number;
  personalMonthDetail: PersonalMonthDetail;
  isPeakMonth: boolean; // True if Personal Month matches Personal Year
}

export interface FullYearMonthOverview {
  dob: string;
  targetYear: number;
  personalYearInfo: PersonalYearCalculationResult;
  monthlyBreakdown: PersonalMonthCalculationResult[];
}

function reduceToSingleDigit(n: number): number {
  let curr = n;
  while (curr > 9) {
    curr = String(curr).split("").reduce((a, b) => a + Number(b), 0);
  }
  return curr;
}

export function calculatePersonalYear(dob: string, targetYear: number): PersonalYearCalculationResult {
  const parts = dob.split("-").map(Number);
  const monthRaw = parts[1] || 1;
  const dayRaw = parts[2] || 1;

  const dayReduced = reduceToSingleDigit(dayRaw);
  const monthReduced = reduceToSingleDigit(monthRaw);

  const yearDigitSum = String(targetYear).split("").reduce((a, b) => a + Number(b), 0);
  const targetYearReduced = reduceToSingleDigit(yearDigitSum);

  const totalSum = dayReduced + monthReduced + targetYearReduced;
  const personalYearNumber = reduceToSingleDigit(totalSum);

  return {
    dob,
    targetYear,
    dayReduced,
    monthReduced,
    targetYearReduced,
    personalYearNumber,
    personalYearDetail: ALL_PERSONAL_YEAR_DATABASE[personalYearNumber] || ALL_PERSONAL_YEAR_DATABASE[1]
  };
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function calculatePersonalMonth(personalYearNumber: number, monthIndex: number): PersonalMonthCalculationResult {
  // Month index: 1 for Jan, 12 for Dec
  const monthNum = Math.min(12, Math.max(1, monthIndex));
  const rawSum = personalYearNumber + monthNum;
  const personalMonthNumber = reduceToSingleDigit(rawSum);

  return {
    calendarMonthIndex: monthNum,
    monthName: MONTH_NAMES[monthNum - 1],
    personalMonthNumber,
    personalMonthDetail: ALL_PERSONAL_MONTH_DATABASE[personalMonthNumber] || ALL_PERSONAL_MONTH_DATABASE[1],
    isPeakMonth: personalMonthNumber === personalYearNumber
  };
}

export function calculateFullYearMonthOverview(dob: string, targetYear: number): FullYearMonthOverview {
  const pyResult = calculatePersonalYear(dob, targetYear);
  const monthlyBreakdown: PersonalMonthCalculationResult[] = [];

  for (let m = 1; m <= 12; m++) {
    monthlyBreakdown.push(calculatePersonalMonth(pyResult.personalYearNumber, m));
  }

  return {
    dob,
    targetYear,
    personalYearInfo: pyResult,
    monthlyBreakdown
  };
}

export function getPersonalYearDetail(num: number): PersonalYearDetail {
  return ALL_PERSONAL_YEAR_DATABASE[num] || ALL_PERSONAL_YEAR_DATABASE[1];
}

export function getPersonalMonthDetail(num: number): PersonalMonthDetail {
  return ALL_PERSONAL_MONTH_DATABASE[num] || ALL_PERSONAL_MONTH_DATABASE[1];
}
