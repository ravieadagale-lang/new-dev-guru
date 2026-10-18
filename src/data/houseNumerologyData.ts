// src/data/houseNumerologyData.ts
// Complete Data for Chapter Thirty: House Number Numerology
// Detailed paragraphs for House Primary Numbers 1-9, Master Numbers (11, 22, 33), Karmic Debts (13, 14, 16, 19), Life Path Compatibility, Room Readings, Life Stages, and Remedies.

export interface HousePrimaryReading {
  number: number;
  title: string;
  frequencyName: string;
  vibrationalEnergy: string;
  whatItCreates: string;
  supports: string[];
  challenges: string;
  healthAndWellbeing: string;
  bestFor: string[];
  notIdealFor: string[];
  remediesAndGuidance: string[];
}

export const HOUSE_PRIMARY_READINGS: Record<number, HousePrimaryReading> = {
  1: {
    number: 1,
    title: "House Primary 1 — The Independent Pioneer Home",
    frequencyName: "Self-Direction, Ambition & New Beginnings",
    vibrationalEnergy: "Independent initiative, pioneering momentum, individual authority, and courageous self-direction.",
    whatItCreates: "A house or flat whose number reduces to 1 carries the vibrational frequency of independent initiative and original forward movement. It consistently supports and amplifies personal ambition, self-directed achievement, and the courageous pursuit of original goals. The home creates a persistent atmosphere of forward momentum, where new beginnings feel continuously accessible and individual capability is fully backed.",
    supports: [
      "Individual ambition and self-directed career growth",
      "Entrepreneurs, freelancers, and remote business owners",
      "Pioneering new life chapters, relocations, or post-divorce restarts",
      "Solo professionals building strong personal autonomy",
      "Athletes, leaders, and independent authors"
    ],
    challenges: "The strong focus on individual independence can create subtle tension in shared family or marital life, where cooperative compromise is required. Two strong wills living in a 1 house may find their individual perspectives amplified.",
    healthAndWellbeing: "Pertains to the head, spine, and nervous system. Residents should balance their ambitious drive with conscious physical rest to avoid tension headaches or burnout.",
    bestFor: [
      "Solo Professionals & Independent Thinkers",
      "Entrepreneurs Working from Home",
      "Individuals Entering a Fresh Life Chapter",
      "Leaders & Original Innovators"
    ],
    notIdealFor: [
      "Families seeking maximum communal blending",
      "People recovering from burnout who need deep passive rest"
    ],
    remediesAndGuidance: [
      "Balance the sharp 1 energy with golden yellow, orange, or cream soft furnishings.",
      "Place a Ganesha idol at the main entrance to foster obstacle removal and cooperative harmony.",
      "Designate a specific nook purely for quiet rest, free from work items."
    ]
  },
  2: {
    number: 2,
    title: "House Primary 2 — The Partnership and Harmony Home",
    frequencyName: "Cooperation, Emotional Depth & Peaceful Sanctuary",
    vibrationalEnergy: "Cooperative warmth, relational harmony, empathic safety, and intuitive sanctuary.",
    whatItCreates: "A house or flat whose number reduces to 2 carries the vibrational frequency of genuine cooperative harmony and deep relational warmth. It consistently supports mutual understanding, emotional attunement, and gentle care. Living here deepens significant partnerships, turning the home into an emotionally safe sanctuary where genuine trust and peace flourish.",
    supports: [
      "Married couples, newlyweds, and romantic partnerships",
      "Families with young children requiring emotional security",
      "Counselors, therapists, and holistic healers working from home",
      "People in relational or emotional healing",
      "Shared creative partnerships"
    ],
    challenges: "The gentle, cooperative energy may make aggressive commercial ambition or fierce competitive drive feel out of place within the home environment.",
    healthAndWellbeing: "Associated with the digestive system, lower abdomen, and emotional processing. Household health flourishes when interpersonal relationships remain warm and peaceful.",
    bestFor: [
      "Couples & Young Families",
      "Therapists & Relationship Counselors",
      "People Seeking Emotional Healing & Peace",
      "Diplomats & Mediators"
    ],
    notIdealFor: [
      "Solo ambitious corporate drivers needing a competitive home launchpad",
      "Individuals struggling with codependency who require independent boundary building"
    ],
    remediesAndGuidance: [
      "Use silver, white, pearl, or light pink accents in decor to support lunar peace.",
      "Keep fresh white or pink flowers in shared living rooms.",
      "Maintain tidy, harmoniously organized spaces to protect sensitive emotional energy."
    ]
  },
  3: {
    number: 3,
    title: "House Primary 3 — The Creative Expression Home",
    frequencyName: "Joy, Creativity, Social Warmth & Abundant Communication",
    vibrationalEnergy: "Joyful creative expression, uplifting social warmth, communicative vibrancy, and optimistic abundance.",
    whatItCreates: "A house or flat whose number reduces to 3 vibrates with joyful creative expression, social warmth, and optimistic charm. It acts as a natural gathering space where conversations flow easily and inspiration comes effortlessly. The atmosphere feels light, artistic, and welcoming, making entertainment and creative work feel remarkably easy.",
    supports: [
      "Artists, writers, musicians, performers, and designers",
      "Social hosts who enjoy frequent dinner parties and community gatherings",
      "Young couples, students, and lifestyle content creators",
      "Public relations, marketing, and media professionals",
      "Families prioritizing fun, laughter, and open communication"
    ],
    challenges: "The abundant, social 3 energy can encourage spontaneous household spending on entertainment, decor, and social events, requiring mindful financial discipline.",
    healthAndWellbeing: "Pertains to the throat, vocal cords, and expressive nervous system. Overall wellbeing is boosted by the joyful, optimistic atmosphere.",
    bestFor: [
      "Creative Professionals & Visual Artists",
      "Social Hosts & Event Organizers",
      "Writers, Podcasters & Performers",
      "Students & Vibrant Young Households"
    ],
    notIdealFor: [
      "Scholars seeking austere, silent contemplation",
      "People recovering from social exhaustion who need quiet seclusion"
    ],
    remediesAndGuidance: [
      "Introduce structured navy blue or forest green elements to ground exuberant spending.",
      "Keep a dedicated workspace organized with filing systems to prevent creative clutter.",
      "Utilize yellow, sky blue, or lime green tones to celebrate 3's artistic cheer."
    ]
  },
  4: {
    number: 4,
    title: "House Primary 4 — The Foundation and Security Home",
    frequencyName: "Practical Reliability, Structural Stability & Earth Security",
    vibrationalEnergy: "Methodical discipline, structural stability, practical security, and enduring foundation.",
    whatItCreates: "A house or flat whose number reduces to 4 carries the vibrational frequency of practical reliability, structural grounding, and solid security. It supports sustained, disciplined effort, long-term financial accumulation, and methodical building. The home feels inherently secure, stable, and dependable.",
    supports: [
      "Families building long-term financial security and paying down mortgages",
      "Students requiring concentrated academic discipline and study focus",
      "Engineers, architects, craftspeople, and meticulous professionals",
      "Small business operators laying solid operational foundations",
      "Anyone seeking safety, predictability, and earth-bound security"
    ],
    challenges: "The heavy, methodical work focus can make the home feel rigid or overly duty-bound if not balanced by deliberate relaxation and leisure activities.",
    healthAndWellbeing: "Pertains to the bones, joints, and physical structure. Regular physical stretching, massage, and outdoor walks prevent bodily stiffness.",
    bestFor: [
      "Families Building Long-term Savings",
      "Students & Academic Scholars",
      "Engineers, Builders & Meticulous Craftspeople",
      "Practical Business Operators"
    ],
    notIdealFor: [
      "Free-spirited creative adventurers who resist fixed routines",
      "Individuals burdened by excessive duty who need lighthearted play"
    ],
    remediesAndGuidance: [
      "Incorporate bright yellow, warm orange, and flowering plants to lighten the home's atmosphere.",
      "Display artwork depicting natural water flows or open horizons.",
      "Set aside non-negotiable leisure time free from domestic repair or work tasks."
    ]
  },
  5: {
    number: 5,
    title: "House Primary 5 — The Freedom and Change Home",
    frequencyName: "Dynamic Energy, Adaptability, Variety & Movement",
    vibrationalEnergy: "Dynamic versatility, lively movement, travel engagement, and adaptable exploration.",
    whatItCreates: "A house or flat whose number reduces to 5 carries the frequency of dynamic movement, variety, and adventurous exploration. It attracts unexpected opportunities, frequent visitors, travel itineraries, and continuous lifestyle evolution. The home feels alive, perpetually evolving, and free from stagnant routine.",
    supports: [
      "Frequent travelers using the home as a vibrant launchpad",
      "Sales agents, consultants, and agents handling diverse clients",
      "Individuals undergoing major life transitions or career pivots",
      "Digital nomads, event managers, and media professionals",
      "Young adults exploring diverse lifestyle choices"
    ],
    challenges: "The constant pulse of variety can make establishing quiet, deeply-rooted domestic stability or quiet rest somewhat challenging.",
    healthAndWellbeing: "Associated with the nervous system, lungs, and senses. Practices of stillness, breathwork, and quiet evening routines help settle sensory stimulation.",
    bestFor: [
      "Travelers & Digital Nomads",
      "Sales Consultants & Media Agents",
      "People in Active Career Transitions",
      "Enthusiastic Adventurers"
    ],
    notIdealFor: [
      "Families needing deep, quiet, predictable roots",
      "Individuals recovering from adrenal fatigue or anxiety"
    ],
    remediesAndGuidance: [
      "Use grounding earth tones, deep burgundy, or solid wooden furniture to stabilize restless energy.",
      "Establish a serene, quiet sleeping zone with blackout curtains.",
      "Keep indoor air fresh with green leafy indoor plants like peace lilies."
    ]
  },
  6: {
    number: 6,
    title: "House Primary 6 — The Love and Harmony Home",
    frequencyName: "Nurturing Care, Domestic Harmony & Aesthetic Beauty",
    vibrationalEnergy: "Nurturing love, domestic belonging, aesthetic refinement, and responsible care.",
    whatItCreates: "A house or flat whose number reduces to 6 carries the warm, protective frequency of family love, aesthetic beauty, and domestic sanctuary. It is widely revered as the premier house number for family life, warm hospitality, and physical healing. The atmosphere is cocoon-like, beautiful, and deeply welcoming.",
    supports: [
      "Families raising children or caring for multi-generational relatives",
      "Healers, doctors, and wellness practitioners offering care",
      "Artists, interior decorators, and fashion creators",
      "People recovering from physical or emotional hardship",
      "Anyone prioritizing domestic comfort, cooking, and home beauty"
    ],
    challenges: "The strong nurturing drive can sometimes lead to household over-giving or endless domestic caretaking demands if healthy boundaries are not set.",
    healthAndWellbeing: "Pertains to the heart, chest, and immune system. Promotes exceptionally strong overall health through its loving, low-stress environment.",
    bestFor: [
      "Multi-Generational Families & Parents",
      "Healers, Doctors & Wellness Providers",
      "Interior Designers & Artists",
      "Nurturing Home-Makers"
    ],
    notIdealFor: [
      "Ruthless corporate competitors seeking a cold, sterile work launchpad",
      "Individuals prone to selfless burnout who struggle to say no"
    ],
    remediesAndGuidance: [
      "Decorate with rose gold, cream, soft pink, or indigo colors.",
      "Incorporate crisp white accents and clear geometric art to maintain healthy boundaries.",
      "Keep living rooms filled with soft lighting, art, and comfortable seating."
    ]
  },
  7: {
    number: 7,
    title: "House Primary 7 — The Wisdom and Contemplation Home",
    frequencyName: "Analytical Depth, Contemplative Quiet & Spiritual Wisdom",
    vibrationalEnergy: "Analytical contemplation, spiritual depth, scholarly research, and inner sanctuary.",
    whatItCreates: "A house or flat whose number reduces to 7 vibrates with quiet analytical depth, scholarly inquiry, and spiritual contemplation. It provides an extraordinary sanctuary for meditation, research, writing, and deep study. The home possesses an intangible atmosphere of quiet dignity and intellectual clarity.",
    supports: [
      "Scholars, researchers, academics, and analytical scientists",
      "Spiritual seekers, meditators, yogis, and astrologers",
      "Writers, philosophers, and solo intellectual creators",
      "Psychologists, analysts, and specialized consultants",
      "Anyone prioritizing inner growth, reading, and peace"
    ],
    challenges: "The quiet, introspective frequency can occasionally limit casual social entertainment, making large social parties feel less natural.",
    healthAndWellbeing: "Associated with the parasympathetic nervous system and mental focus. Daily outdoor walks in nature keep the mind grounded in physical reality.",
    bestFor: [
      "Scholars, Researchers & Scientists",
      "Spiritual Practitioners & Meditators",
      "Writers, Philosophers & Analysts",
      "Solo Intellectual Creators"
    ],
    notIdealFor: [
      "Extroverted party hosts who thrive on loud, constant social crowds",
      "People suffering from chronic social isolation who need outward social stimulation"
    ],
    remediesAndGuidance: [
      "Incorporate warm golden lighting, amber accents, and circular seating to encourage warm conversation.",
      "Keep a dedicated library or meditation altar space.",
      "Place a cat's eye or amethyst stone in the study area."
    ]
  },
  8: {
    number: 8,
    title: "House Primary 8 — The Achievement and Prosperity Home",
    frequencyName: "Material Success, Executive Authority & Financial Power",
    vibrationalEnergy: "Executive authority, commercial ambition, material accumulation, and strategic mastery.",
    whatItCreates: "A house or flat whose number reduces to 8 radiates executive authority, financial acumen, and material prestige. It acts as a powerful commercial engine for business owners, corporate executives, and real estate investors. It attracts business opportunities, wealth building, and executive respect.",
    supports: [
      "Business owners, CEOs, and corporate managing directors",
      "Financial investors, stock brokers, and real estate developers",
      "Legal counsel, senior dignitaries, and industrial leaders",
      "Ambitious professionals building major wealth portfolios",
      "High-stakes commercial operations"
    ],
    challenges: "The relentless focus on material achievement can risk overshadowing emotional intimacy or passive rest if the home is run purely like an office.",
    healthAndWellbeing: "Associated with the cardiovascular and adrenal systems. Regular cardiovascular exercise and deliberate family downtime prevent stress buildup.",
    bestFor: [
      "Corporate Executives & Business Owners",
      "Investors, Developers & Financial Brokers",
      "Senior Legal Counsel & Dignitaries",
      "Wealth-Building Households"
    ],
    notIdealFor: [
      "Bohemian artists seeking non-material, unstructured leisure",
      "Individuals recovering from corporate burnout needing passive rest"
    ],
    remediesAndGuidance: [
      "Incorporate soft cream, rose quartz, and warm family portraiture to infuse emotional warmth.",
      "Place a blue sapphire or tiger's eye gemstone in the home office.",
      "Maintain a strict boundary between workspace and bedroom zones."
    ]
  },
  9: {
    number: 9,
    title: "House Primary 9 — The Universal Wisdom and Completion Home",
    frequencyName: "Humanitarian Breadth, Universal Service & Cycle Completion",
    vibrationalEnergy: "Universal compassion, humanitarian breadth, spiritual protection, and cycle resolution.",
    whatItCreates: "A house or flat whose number reduces to 9 carries the expansive, compassionate frequency of universal service, spiritual wisdom, and cycle completion. It opens the perspectives of its residents beyond personal concerns toward broader human service. The home feels spacious, non-judgmental, and spiritually elevated.",
    supports: [
      "Healers, doctors, social workers, and humanitarian leaders",
      "Spiritual teachers, teachers, and global community organizers",
      "Artists, authors, and filmmakers working on socially impactful themes",
      "Individuals concluding major life chapters or long-term projects",
      "Open-door households welcoming diverse international guests"
    ],
    challenges: "The broad, universal perspective can occasionally make attending to mundane household paperwork, maintenance chores, or administrative details feel uninspiring.",
    healthAndWellbeing: "Associated with overall vitality, blood circulation, and broad systemic health. The deep sense of purpose supports strong psychological resilience.",
    bestFor: [
      "Healers, Social Workers & Humanitarians",
      "Spiritual Teachers & Global Community Leaders",
      "Social Impact Artists & Authors",
      "Households Ending Long Cycles Gracefully"
    ],
    notIdealFor: [
      "Cutthroat short-term financial speculators focused purely on personal gain",
      "Individuals initiating aggressive, self-centered commercial launches"
    ],
    remediesAndGuidance: [
      "Introduce practical earthy terracotta tones and organized wooden storage to stay grounded in domestic maintenance.",
      "Keep a Red Coral stone near the practical office or kitchen area.",
      "Chant 'Om Namah Shivaya' to align with 9's transformative grace."
    ]
  }
};

export const MASTER_HOUSE_READINGS: Record<number, { title: string; energy: string; description: string; guidance: string }> = {
  11: {
    title: "House Number 11/2 — The Master Illumination Home",
    energy: "High Spiritual Intuition, Master Illumination & Energetic Sensitivity",
    description: "House Number 11 carries the Master Illumination vibration. It acts as an energetic prism, amplifying spiritual intuition, psychic sensitivity, and creative breakthroughs. Everything in an 11 house is energetic: realizations come instantly, and spiritual practices bear deep fruit.",
    guidance: "Requires emotional grounding. Use white quartz, keep rooms clean, and practice regular meditation to anchor the high frequency safely."
  },
  22: {
    title: "House Number 22/4 — The Master Builder Home",
    energy: "Master Practical Execution, Legacy Building & Large-Scale Scale",
    description: "House Number 22 carries the Master Builder frequency. It empowers residents to turn grand visions into enduring physical, commercial, or institutional realities. It is an extraordinary space for building international organizations or monumental achievements.",
    guidance: "Demands rigorous daily discipline and ethical execution. Without structure, the immense 22 vision can create practical stress."
  },
  33: {
    title: "House Number 33/6 — The Master Teacher Home",
    energy: "Master Compassion, Universal Healing & Lived Example",
    description: "House Number 33 is the rare Master Teacher home. It radiates unconditional love, deep emotional healing, and universal service. Living here calls residents to embody high compassionate standards and lead by selfless example.",
    guidance: "Focus on boundary protection to prevent emotional exhaustion from helping others."
  }
};

export const KARMIC_DEBT_HOUSES: Record<number, { code: number; name: string; lesson: string; remedy: string }> = {
  13: {
    code: 13,
    name: "Karmic Debt 13 — The Lesson of Disciplined Effort",
    lesson: "House 13 teaches that lasting success requires honest, methodical, sustained work. Shortcuts, hasty repairs, or evasions will encounter immediate practical friction, while disciplined, honest labor yields reliable success.",
    remedy: "Place a Ganesha idol at the main entrance. Chant 'Om Gam Ganapataye Namaha' before initiating major home projects."
  },
  14: {
    code: 14,
    name: "Karmic Debt 14 — The Lesson of Conscious Moderation",
    lesson: "House 14 teaches balance and self-control. Immoderation in spending, eating, or emotional reactions brings rapid feedback, urging residents toward steady moderation.",
    remedy: "Place an emerald or green tourmaline in the living space. Maintain clear, structured daily routines."
  },
  16: {
    code: 16,
    name: "Karmic Debt 16 — The Lesson of Radical Authenticity (The Shattered Citadel)",
    lesson: "House 16 dismantles pretense, false ego, or inauthentic arrangements. What is built on truth flourishes, while superficial structures are dissolved to pave the way for genuine integrity.",
    remedy: "Place a Hanuman Yantra in the bedroom and a Sri Yantra in the main room. Practice absolute honesty in all domestic dealings."
  },
  19: {
    code: 19,
    name: "Karmic Debt 19 — The Lesson of Interdependence",
    lesson: "House 19 teaches that true strength lies in mutual support rather than stubborn isolation. Residents learn to ask for help and accept care gracefully.",
    remedy: "Keep a Ruby or Red Spinel gemstone in the home. Foster open, collaborative family discussions."
  }
};

export const HOUSE_LIFE_PATH_COMPATIBILITY: Record<number, { best: number[]; avoid: number[]; explanation: string }> = {
  1: {
    best: [1, 5, 7],
    avoid: [2, 6],
    explanation: "Life Path 1 thrives in House 1 (independent ambition), House 5 (dynamic freedom), and House 7 (specialist depth). Avoid House 2 and 6, which emphasize soft cooperative compromise over LP1's pioneer drive."
  },
  2: {
    best: [2, 6, 4],
    avoid: [1, 8],
    explanation: "Life Path 2 flourishes in House 2 (relational peace), House 6 (domestic warmth), and House 4 (stable security). Avoid House 1 and 8 due to their aggressive or competitive commercial tone."
  },
  3: {
    best: [3, 6, 9],
    avoid: [4, 8],
    explanation: "Life Path 3 shines in House 3 (creative joy), House 6 (artistic harmony), and House 9 (universal expression). Avoid House 4 and 8, which impose heavy industrial rigidity on LP3's creative spirit."
  },
  4: {
    best: [4, 8, 1],
    avoid: [3, 5],
    explanation: "Life Path 4 excels in House 4 (methodical security), House 8 (material structure), and House 1 (focused initiative). Avoid House 3 and 5, which bring unpredictable or scattered domestic energy."
  },
  5: {
    best: [5, 1, 3],
    avoid: [4, 2],
    explanation: "Life Path 5 thrives in House 5 (dynamic freedom), House 1 (independent pioneering), and House 3 (creative social movement). Avoid House 4 and 2, which restrict LP5's freedom."
  },
  6: {
    best: [6, 2, 9],
    avoid: [1, 8],
    explanation: "Life Path 6 is harmonized by House 6 (family nurturing care), House 2 (loving partnership), and House 9 (universal compassion). Avoid House 1 and 8, which project harsh corporate competition."
  },
  7: {
    best: [7, 4, 9],
    avoid: [3, 6],
    explanation: "Life Path 7 commands respect in House 7 (contemplative wisdom), House 4 (structured study), and House 9 (broad knowledge). Avoid House 3 and 6, which attract continuous casual social noise."
  },
  8: {
    best: [8, 4, 1],
    avoid: [2, 3],
    explanation: "Life Path 8 achieves wealth in House 8 (executive mastery), House 4 (methodical stability), and House 1 (focused authority). Avoid House 2 and 3, which project overly gentle or informal energy."
  },
  9: {
    best: [9, 6, 3],
    avoid: [5, 1],
    explanation: "Life Path 9 fulfills its vision in House 9 (universal service), House 6 (nurturing care), and House 3 (inspiring wisdom). Avoid House 5 and 1, which disrupt LP9's humanitarian focus."
  },
  11: {
    best: [2, 7, 11, 6],
    avoid: [1, 8],
    explanation: "Master LP 11 resonates with intuitive, illuminating house vibrations (House 2, 7, 11, 6)."
  },
  22: {
    best: [4, 8, 22, 1],
    avoid: [3, 5],
    explanation: "Master LP 22 resonates with Master Builder execution spaces (House 4, 8, 22, 1)."
  },
  33: {
    best: [6, 9, 33, 3],
    avoid: [4, 8],
    explanation: "Master LP 33 resonates with Master Teacher healing homes (House 6, 9, 33, 3)."
  }
};

export const LIFE_STAGE_HOUSE_RECOMMENDATIONS = [
  {
    stage: "Childhood & Education (Ages 0–18)",
    recommended: "House Primary 3, 6, or 2",
    description: "Supports creative curiosity, joyful learning, emotional safety, and warm family bonding. Avoid House 8 (overly performance-pressured) or House 1 (too individualistic)."
  },
  {
    stage: "Career Building & Young Professional (Ages 22–45)",
    recommended: "House Primary 1, 4, or 8",
    description: "Drives ambition, self-directed focus, professional discipline, and financial accumulation. Creative professionals benefit from House 3."
  },
  {
    stage: "Family Formation & Child-Raising (Ages 25–55)",
    recommended: "House Primary 6, 2, or 4",
    description: "Provides the premier domestic cocoon for raising children, supporting marital harmony, and building solid family roots. Avoid House 5 (too restless)."
  },
  {
    stage: "Retirement & Spiritual Completion (Ages 60+)",
    recommended: "House Primary 7, 9, or 6",
    description: "Offers serene contemplative depth, spiritual fulfillment, wisdom sharing, and peaceful domestic comfort. Avoid House 1 or 8."
  }
];

export interface HouseParsedData {
  rawInput: string;
  cleanDigits: string;
  hasFlatAndBuilding: boolean;
  flatNumberStr: string;
  buildingNumberStr: string;
  flatSum: number;
  primaryNumber: number;
  compoundNumber: number;
  isMasterNumber: boolean;
  masterCode?: number; // 11, 22, 33
  isKarmicDebt: boolean;
  karmicDebtCode?: number; // 13, 14, 16, 19
  reading: HousePrimaryReading;
  masterReading?: { title: string; energy: string; description: string; guidance: string };
  karmicReading?: { code: number; name: string; lesson: string; remedy: string };
  compatibilityWithLifePath?: {
    lifePath: number;
    isBest: boolean;
    isAvoid: boolean;
    explanation: string;
  };
}

export function parseAndEvaluateHouseNumber(
  rawInput: string,
  lifePathNum?: number
): HouseParsedData | null {
  if (!rawInput || rawInput.trim().length === 0) return null;

  const raw = rawInput.trim().toUpperCase();

  // Check if input has flat and building parts e.g., "B-205, BLDG 4" or "FLAT 304, TOWER 2"
  let flatNumberStr = raw;
  let buildingNumberStr = "";
  let hasFlatAndBuilding = false;

  if (raw.includes(",") || raw.includes("/") || raw.includes("FLAT") || raw.includes("APT")) {
    hasFlatAndBuilding = true;
    const parts = raw.split(/[,/]/);
    flatNumberStr = parts[0].replace(/(FLAT|APT|HOUSE|NO|NUMBER)/g, "").trim();
    buildingNumberStr = parts.slice(1).join(" ").trim();
  }

  // Convert characters to Chaldean values if letters exist
  const chaldeanValues: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1, J: 1, K: 2, L: 3, M: 4,
    N: 5, O: 7, P: 8, Q: 1, R: 2, S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7
  };

  const cleanChars = flatNumberStr.replace(/[^A-Z0-9]/g, "");
  let flatSum = 0;

  cleanChars.split("").forEach(ch => {
    if (/[0-9]/.test(ch)) {
      flatSum += parseInt(ch, 10);
    } else if (chaldeanValues[ch]) {
      flatSum += chaldeanValues[ch];
    }
  });

  if (flatSum === 0) return null;

  let compoundNumber = flatSum;
  let primaryNumber = compoundNumber;

  while (primaryNumber > 9 && primaryNumber !== 11 && primaryNumber !== 22 && primaryNumber !== 33) {
    primaryNumber = String(primaryNumber)
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }

  const isMasterNumber = [11, 22, 33].includes(primaryNumber) || [11, 22, 33].includes(compoundNumber);
  const masterCode = isMasterNumber ? (primaryNumber > 9 ? primaryNumber : compoundNumber) : undefined;

  const isKarmicDebt = [13, 14, 16, 19].includes(compoundNumber) || [13, 14, 16, 19].includes(flatSum);
  const karmicDebtCode = isKarmicDebt ? ([13, 14, 16, 19].includes(compoundNumber) ? compoundNumber : flatSum) : undefined;

  let rootDigit = primaryNumber;
  if (rootDigit > 9) {
    let temp = rootDigit;
    while (temp > 9) {
      temp = String(temp).split("").map(Number).reduce((a, b) => a + b, 0);
    }
    rootDigit = temp;
  }

  const reading = HOUSE_PRIMARY_READINGS[rootDigit] || HOUSE_PRIMARY_READINGS[1];
  const masterReading = masterCode ? MASTER_HOUSE_READINGS[masterCode] : undefined;
  const karmicReading = karmicDebtCode ? KARMIC_DEBT_HOUSES[karmicDebtCode] : undefined;

  let compatibilityWithLifePath: HouseParsedData["compatibilityWithLifePath"] = undefined;
  if (lifePathNum && HOUSE_LIFE_PATH_COMPATIBILITY[lifePathNum]) {
    const compData = HOUSE_LIFE_PATH_COMPATIBILITY[lifePathNum];
    const isBest = compData.best.includes(rootDigit) || (masterCode && compData.best.includes(masterCode));
    const isAvoid = compData.avoid.includes(rootDigit);

    compatibilityWithLifePath = {
      lifePath: lifePathNum,
      isBest: Boolean(isBest),
      isAvoid: Boolean(isAvoid),
      explanation: compData.explanation
    };
  }

  return {
    rawInput: raw,
    cleanDigits: cleanChars,
    hasFlatAndBuilding,
    flatNumberStr,
    buildingNumberStr,
    flatSum,
    primaryNumber: rootDigit,
    compoundNumber,
    isMasterNumber,
    masterCode,
    isKarmicDebt,
    karmicDebtCode,
    reading,
    masterReading,
    karmicReading,
    compatibilityWithLifePath
  };
}

export const CHAPTER_THIRTY_THEORY = {
  chapterNumber: "Chapter Thirty",
  title: "House Number Numerology",
  quote: {
    text: "Home is not a place — it is a feeling. And that feeling is profoundly shaped by the numbers that govern the space where you live.",
    author: "Vastu and Numerology Tradition"
  },
  fourMethodsSummary: [
    {
      name: "1. Independent House or Plot Number",
      description: "Summing all numerical digits and letter Chaldean values (e.g. 14-A = 1+4+1 = 6) for independent dwellings."
    },
    {
      name: "2. Flat and Apartment Priority",
      description: "Evaluating the individual flat number as the primary personal vibration, while the building number forms the secondary context."
    },
    {
      name: "3. Floor Level Extension",
      description: "Including floor levels in high-rise towers for specialized spatial refinement."
    },
    {
      name: "4. Master & Karmic Debt Detection",
      description: "Identifying Master Numbers (11, 22, 33) and Karmic Debt compounds (13, 14, 16, 19) in intermediate address totals."
    }
  ]
};
