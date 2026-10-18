// Chapter Thirty-Three: Auspicious Date and Time Selection — Muhurta Numerology
// Data structures, theoretical frameworks, event protocols, and calculation utilities.

export interface DayOfWeekInfo {
  dayName: string;
  rulingPlanet: string;
  number: number;
  qualities: string[];
  bestFor: string[];
  avoidFor: string[];
  description: string;
  luckyNumbers: number[];
  luckyColors: string[];
  luckyDirections: string[];
  gemstones: string[];
  remedies: string[];
  gemstoneDisclaimer: string;
}

export interface CompoundDetail {
  compound: number;
  name: string;
  type: "auspicious" | "caution" | "neutral" | "master";
  description: string;
}

export interface EventSelectionProtocol {
  id: string;
  title: string;
  category: string;
  summary: string;
  primaryNumbers: number[];
  secondaryNumbers: number[];
  bestDaysOfWeek: string[];
  avoidDaysOfWeek: string[];
  cautionCompounds: number[];
  auspiciousCompounds: number[];
  idealPersonalYears: number[];
  protocolSteps: string[];
  keyGuidelines: string;
}

export interface HoraHourInfo {
  hourIndex: number;
  planet: string;
  number: number;
  quality: string;
  recommendedActions: string[];
  avoidActions: string[];
}

export const CHAPTER_33_METADATA = {
  chapterNumber: 33,
  title: "Auspicious Date and Time Selection — Muhurta Numerology",
  subtitle: "The Science of Vibrational Timing & Intraday Horas",
  epigraph: {
    quote: "Time is not a neutral container for events — it is a living vibrational field that shapes every action taken within it. The wise person does not merely ask what to do but when to do it.",
    source: "Muhurta Shastra Tradition"
  },
  introduction: "The selection of auspicious dates and times for important life events is one of the oldest, most universally practised, and most genuinely consequential applications of the science of number in the Indian tradition. The Sanskrit word Muhurta refers to an auspicious time period — a specific window of time whose combined astrological and numerological qualities create the most favourable possible conditions for initiating a specific type of action. Numerological Muhurta operates through the specific vibrational qualities of the numbers governing the day, month, year, and hour."
};

export const DAYS_OF_WEEK_DATA: Record<string, DayOfWeekInfo> = {
  Sunday: {
    dayName: "Sunday",
    rulingPlanet: "The Sun",
    number: 1,
    qualities: ["Authority", "Initiative", "New Beginnings", "Leadership", "Clarity", "Vitality", "Divine Blessing"],
    bestFor: ["Starting new ventures", "Job interviews", "Meeting leaders/authorities", "Important project kickoffs", "Inaugurations", "Creative launches", "Leadership decisions"],
    avoidFor: ["Submissive negotiation", "Behind-the-scenes passive tasks"],
    description: "Ruled by the Sun (Number 1). Infuses the day with solar authority, clarity, and pure initiating force.",
    luckyNumbers: [1, 2, 3, 5, 9],
    luckyColors: ["Gold", "Sun Yellow", "Bright Orange", "Saffron"],
    luckyDirections: ["East (Purva)", "North-East (Ishan)"],
    gemstones: ["Ruby (Manikya)", "Red Garnet", "Sunstone"],
    remedies: [
      "Offer Arghya (water from copper pot containing red flowers) to the rising Sun.",
      "Chant Gayatri Mantra or Om Hram Hrim Hroom Sah Suryaya Namah 108 times.",
      "Donate wheat grain, jaggery, or copper utensils to temple priests or students."
    ],
    gemstoneDisclaimer: "(consult gemologist or professional numerologist or astrologer for gem stones please)"
  },
  Monday: {
    dayName: "Monday",
    rulingPlanet: "The Moon",
    number: 2,
    qualities: ["Nurturing", "Emotional Attunement", "Cooperation", "Intuition", "Family", "Healing", "Receptivity"],
    bestFor: ["Family decisions", "Healing & health appointments", "Cooperative meetings", "Wedding planning", "Moving into new homes", "Nurturing projects", "Meditation & inner work"],
    avoidFor: ["High-stakes aggressive confrontations", "Impulsive cold commercial decisions"],
    description: "Ruled by the Moon (Number 2). Brings gentle lunar warmth, intuitive sensitivity, and family harmony.",
    luckyNumbers: [1, 2, 3, 7],
    luckyColors: ["Pearl White", "Silver", "Milk White", "Soft Cream"],
    luckyDirections: ["North-West (Vayu Kona)", "North"],
    gemstones: ["Natural Pearl (Moti)", "Moonstone", "Clear Quartz"],
    remedies: [
      "Offer water and milk to Shivling every Monday morning.",
      "Chant Om Shram Shrim Shrom Sah Chandramase Namah 108 times.",
      "Donate white rice, milk, or white sugar to mothers or orphanages."
    ],
    gemstoneDisclaimer: "(consult gemologist or professional numerologist or astrologer for gem stones please)"
  },
  Tuesday: {
    dayName: "Tuesday",
    rulingPlanet: "Mars",
    number: 9,
    qualities: ["Courage", "Action", "Initiative", "Strength", "Competition", "Surgery", "Decisive Force"],
    bestFor: ["Beginning physical projects", "Athletic competitions", "Necessary surgery", "Legal assertiveness", "Confronting challenges", "Construction start", "Security setup"],
    avoidFor: ["Marriage", "Business partnerships", "Financial contracts", "Peaceful delicate negotiations"],
    description: "Ruled by Mars (Number 9). Highly dynamic and assertive. Demands courage; strictly avoid for marriage or peaceful alliances.",
    luckyNumbers: [1, 2, 3, 9],
    luckyColors: ["Bright Crimson Red", "Coral Pink", "Scarlet", "Maroon"],
    luckyDirections: ["South (Dakshin)", "East"],
    gemstones: ["Red Coral (Moonga)", "Carnelian", "Red Jasper"],
    remedies: [
      "Recite Hanuman Chalisa or Sundarkand facing East.",
      "Chant Om Kram Krim Krom Sah Bhaumaya Namah 108 times.",
      "Donate red lentils (Masoor dal), jaggery, or copper items."
    ],
    gemstoneDisclaimer: "(consult gemologist or professional numerologist or astrologer for gem stones please)"
  },
  Wednesday: {
    dayName: "Wednesday",
    rulingPlanet: "Mercury",
    number: 5,
    qualities: ["Communication", "Intellect", "Business", "Contracts", "Education", "Travel", "Commerce"],
    bestFor: ["Signing contracts", "Business meetings", "Educational enrolment", "Communication campaigns", "Networking events", "Writing & publishing", "Travel planning", "Commercial negotiations"],
    avoidFor: ["Rigid non-adaptable commitments"],
    description: "Ruled by Mercury (Number 5). The premier commercial and intellectual day for trade, contracts, and travel.",
    luckyNumbers: [1, 2, 3, 5, 6],
    luckyColors: ["Emerald Green", "Mint Green", "Sea Green", "Jade"],
    luckyDirections: ["North (Kubera Stan)", "East"],
    gemstones: ["Emerald (Panna)", "Peridot", "Green Aventurine"],
    remedies: [
      "Feed green grass or spinach to cows every Wednesday morning.",
      "Chant Om Bram Brim Brom Sah Budhaya Namah 108 times.",
      "Donate whole green mung dal or books to needy students."
    ],
    gemstoneDisclaimer: "(consult gemologist or professional numerologist or astrologer for gem stones please)"
  },
  Thursday: {
    dayName: "Thursday",
    rulingPlanet: "Jupiter",
    number: 3,
    qualities: ["Expansion", "Wisdom", "Abundance", "Blessings", "Higher Education", "Financial Growth", "Spiritual Advancement"],
    bestFor: ["Business launches", "Financial decisions", "Property purchases", "Weddings (highly auspicious)", "Beginning education", "Seeking blessings", "Charitable work", "Naming ceremonies"],
    avoidFor: ["Petty disputes", "Short-sighted hasty shortcuts"],
    description: "Ruled by Jupiter (Number 3). The most universally benevolent day, showering expansion, wisdom, and auspicious growth.",
    luckyNumbers: [1, 2, 3, 5, 7, 9],
    luckyColors: ["Bright Yellow", "Saffron", "Golden Amber", "Mustard Yellow"],
    luckyDirections: ["North-East (Ishan Kona)", "East"],
    gemstones: ["Yellow Sapphire (Pukhraj)", "Citrine (Sunela)", "Yellow Topaz"],
    remedies: [
      "Offer water and turmeric to a Banana or Peepal tree.",
      "Chant Om Gram Grim Grom Sah Gurave Namah 108 times.",
      "Donate chana dal, turmeric roots, or religious books to teachers."
    ],
    gemstoneDisclaimer: "(consult gemologist or professional numerologist or astrologer for gem stones please)"
  },
  Friday: {
    dayName: "Friday",
    rulingPlanet: "Venus",
    number: 6,
    qualities: ["Love", "Beauty", "Harmony", "Luxury", "Art", "Relationships", "Aesthetic Endeavours"],
    bestFor: ["Weddings (extremely auspicious)", "Romantic beginnings", "Beauty & wellness launches", "Artistic projects", "Purchasing luxury/property", "Creative partnerships", "Fashion & social events"],
    avoidFor: ["Ascetic harsh disciplines", "Aggressive litigation"],
    description: "Ruled by Venus (Number 6). Radiates elegance, artistic harmony, and romantic devotion.",
    luckyNumbers: [1, 5, 6, 8, 9],
    luckyColors: ["Pure White", "Silver", "Pastel Pink", "Royal Blue"],
    luckyDirections: ["South-East (Agneya Kona)", "East"],
    gemstones: ["Diamond (Heera)", "White Sapphire", "Opal"],
    remedies: [
      "Chant Sri Suktam or Mahalakshmi Stotram on Friday morning.",
      "Chant Om Dram Drim Drom Sah Shukraya Namah 108 times.",
      "Donate white fragrant rice, curd, or perfumes to artists or women."
    ],
    gemstoneDisclaimer: "(consult gemologist or professional numerologist or astrologer for gem stones please)"
  },
  Saturday: {
    dayName: "Saturday",
    rulingPlanet: "Saturn",
    number: 8,
    qualities: ["Discipline", "Structure", "Karma", "Long-term Building", "Service", "Endings", "Hard Work"],
    bestFor: ["Long-term structured building", "Agricultural activities", "Service commitments", "Karmic resolution", "Legal documentation", "Property registration"],
    avoidFor: ["Major brand/business launches", "Weddings", "Fresh playful initiatives"],
    description: "Ruled by Saturn (Number 8). Heavy, structured, and karmic. Sustains ongoing long-term duty, but discourages spontaneous new beginnings.",
    luckyNumbers: [1, 3, 5, 6],
    luckyColors: ["Dark Navy Blue", "Indigo", "Slate Grey", "Black (Controlled)"],
    luckyDirections: ["West (Paschim)", "North-West"],
    gemstones: ["Blue Sapphire (Neelam)", "Amethyst (Jamuniya)", "Iolite"],
    remedies: [
      "Light a mustard oil lamp under a Peepal tree on Saturday evening.",
      "Chant Om Sham Shanaishcharaya Namah or Hanuman Chalisa 108 times.",
      "Donate black mustard oil, black urad dal, or shoes to laborers."
    ],
    gemstoneDisclaimer: "(consult gemologist or professional numerologist or astrologer for gem stones please)"
  }
};

export const SIGNIFICANT_COMPOUNDS: Record<number, CompoundDetail> = {
  13: {
    compound: 13,
    name: "Regeneration & Transformation (Caution)",
    type: "caution",
    description: "Associated with structural shifts and unexpected hurdles in execution. Avoid for contracts or major launches."
  },
  14: {
    compound: 14,
    name: "Magnetic Movement (Caution)",
    type: "caution",
    description: "Prone to financial volatility and impulsive overreach. Demands cautious temperance."
  },
  15: {
    compound: 15,
    name: "Magnetic Communicator & Charm",
    type: "auspicious",
    description: "Highly magnetic and persuasive. Outstanding for public communication, art, and service."
  },
  16: {
    compound: 16,
    name: "The Shattered Citadel (High Caution)",
    type: "caution",
    description: "Associated with unexpected structural dismantling of false foundations. Avoid for marriage, launches, and major commitments."
  },
  17: {
    compound: 17,
    name: "The Star of the Magi",
    type: "auspicious",
    description: "Highly fortunate number conferring spiritual peace, enduring recognition, and success over trials."
  },
  19: {
    compound: 19,
    name: "The Prince of Heaven (Caution in Joint Matters)",
    type: "caution",
    description: "Represents individual self-sufficiency. Powerful for solo leadership, but creates isolation in joint partnerships/weddings."
  },
  21: {
    compound: 21,
    name: "The Crown of the Magi",
    type: "auspicious",
    description: "Symbolizes triumph, ultimate advancement, and public recognition after sustained effort."
  },
  22: {
    compound: 22,
    name: "The Master Builder",
    type: "master",
    description: "Carries Master Number energy for large-scale systemic foundation building and international scope."
  },
  23: {
    compound: 23,
    name: "The Royal Star of the Lion",
    type: "auspicious",
    description: "Promises protection, high-level success, and favor from authority figures."
  },
  27: {
    compound: 27,
    name: "The Sceptre",
    type: "auspicious",
    description: "Carries supreme authority, wisdom, and strategic mastery. One of the most auspicious compounds for business launches."
  }
};

export const CHALDEAN_HORA_SEQUENCE = ["Saturn", "Jupiter", "Mars", "Sun", "Venus", "Mercury", "Moon"];

export const PLANETARY_HORA_PROPERTIES: Record<string, HoraHourInfo> = {
  Sun: {
    hourIndex: 1,
    planet: "Sun",
    number: 1,
    quality: "Authority, Initiative & Leadership",
    recommendedActions: ["Beginning major projects", "Meeting executives/officials", "Seeking promotions", "Filing official applications", "Inaugurations"],
    avoidActions: ["Submissive concessions", "Confidential secretive tasks"]
  },
  Moon: {
    hourIndex: 2,
    planet: "Moon",
    number: 2,
    quality: "Receptivity, Nurturing & Intuition",
    recommendedActions: ["Family discussions", "Healing & therapy", "Negotiating cooperative terms", "Relocation/house entry", "Water/beverage business"],
    avoidActions: ["Cold analytical contracts", "Aggressive legal action"]
  },
  Mars: {
    hourIndex: 3,
    planet: "Mars",
    number: 9,
    quality: "Force, Courage & Direct Action",
    recommendedActions: ["Physical work/exercise", "Confronting obstacles", "Urgent medical procedures", "Machinery/construction", "Security setup"],
    avoidActions: ["Weddings", "Signing peaceful agreements", "Delicate emotional dialogs"]
  },
  Mercury: {
    hourIndex: 4,
    planet: "Mercury",
    number: 5,
    quality: "Commercial Acumen & Communication",
    recommendedActions: ["Signing contracts", "Product launches", "Writing & publishing", "Educational registration", "Trading & financial transactions"],
    avoidActions: ["Slow static tasks requiring zero movement"]
  },
  Jupiter: {
    hourIndex: 5,
    planet: "Jupiter",
    number: 3,
    quality: "Expansive Wisdom & Universal Blessing",
    recommendedActions: ["Business launch", "Marriage ceremony", "Major financial investments", "Religious rituals & pujas", "Consulting & advisory"],
    avoidActions: ["Deceptive or illegal activities"]
  },
  Venus: {
    hourIndex: 6,
    planet: "Venus",
    number: 6,
    quality: "Harmonious Aesthetics & Relationship Bonding",
    recommendedActions: ["Wedding rituals", "Buying jewelry/luxury", "Artistic & music performances", "Design & beauty launches", "Partnership proposals"],
    avoidActions: ["Harsh disciplinary actions", "Budget-cutting meetings"]
  },
  Saturn: {
    hourIndex: 7,
    planet: "Saturn",
    number: 8,
    quality: "Discipline, Structure & Long-term Karma",
    recommendedActions: ["Long-term legal filings", "Land/property registration", "Audits & structural reviews", "Service work & meditation"],
    avoidActions: ["Inaugurating joyful creative ventures", "Marriage ceremonies"]
  }
};

export const EVENT_SELECTION_PROTOCOLS: EventSelectionProtocol[] = [
  {
    id: "marriage",
    title: "1. Marriage & Wedding Date Selection",
    category: "Personal & Family",
    summary: "Selecting a wedding date establishes the vibrational foundation of the marital partnership throughout its lifetime.",
    primaryNumbers: [6, 3, 2],
    secondaryNumbers: [1, 9],
    bestDaysOfWeek: ["Thursday", "Friday", "Monday"],
    avoidDaysOfWeek: ["Tuesday", "Saturday"],
    cautionCompounds: [13, 14, 16, 19],
    auspiciousCompounds: [15, 17, 21, 23, 27],
    idealPersonalYears: [2, 6, 1],
    protocolSteps: [
      "Calculate the Universal Day Number of the proposed date and ensure no Karmic Debt compound (13, 14, 16, 19) is present.",
      "Filter for auspicious days of the week: Thursday (Jupiter blessing) and Friday (Venus harmony) are premier.",
      "Check both partners' Personal Year numbers — ideal when at least one partner is in Personal Year 2, 6, or 1.",
      "Verify Life Path compatibility between the Universal Day Number and both partners' Life Path Numbers."
    ],
    keyGuidelines: "Avoid Compound 16 (Shattered Citadel) at all costs. Prefer Thursday or Friday in a Personal Year 2 or 6."
  },
  {
    id: "business_launch",
    title: "2. Business & Brand Launch Date Selection",
    category: "Commercial & Career",
    summary: "The launch date constitutes the official birth date of the commercial entity, shaping its market path and revenue momentum.",
    primaryNumbers: [1, 5, 8, 3],
    secondaryNumbers: [6, 9],
    bestDaysOfWeek: ["Wednesday", "Thursday", "Sunday"],
    avoidDaysOfWeek: ["Tuesday", "Saturday"],
    cautionCompounds: [13, 14, 16, 19],
    auspiciousCompounds: [17, 21, 23, 27],
    idealPersonalYears: [1, 3, 8, 5],
    protocolSteps: [
      "Define target Business Life Path according to industry (e.g. LP1 for tech innovation, LP8 for finance/exec, LP6 for wellness).",
      "Shortlist dates in the target quarter that sum to the target Universal Day Number with an auspicious compound.",
      "Filter out Tuesdays and Saturdays to maintain positive growth momentum.",
      "Confirm the founder is in a supportive Personal Year (PY1, PY3, or PY8)."
    ],
    keyGuidelines: "Compound 27 (The Sceptre) on a Thursday or Wednesday is one of the single most powerful commercial launch configurations."
  },
  {
    id: "property_purchase",
    title: "3. Property Purchase & Registration",
    category: "Assets & Real Estate",
    summary: "Establishes the energetic alignment between the buyer and the physical land or building structure.",
    primaryNumbers: [6, 8, 4, 2],
    secondaryNumbers: [1, 3],
    bestDaysOfWeek: ["Thursday", "Friday", "Wednesday"],
    avoidDaysOfWeek: ["Tuesday"],
    cautionCompounds: [13, 16],
    auspiciousCompounds: [17, 21, 23],
    idealPersonalYears: [4, 6, 8, 2],
    protocolSteps: [
      "For residential homes, prefer Universal Day 6 (warmth) or 2 (cooperative harmony).",
      "For commercial real estate, prefer Universal Day 8 (material authority) or 4 (stable foundation).",
      "Ensure registration occurs on Thursday or Friday.",
      "Cross-reference the house number vibration with the buyer's Life Path before confirming registration date."
    ],
    keyGuidelines: "Residential property thrives under Universal Day 6 or 4 on a Thursday or Friday."
  },
  {
    id: "contract_signing",
    title: "4. Business Contracts & Legal Agreements",
    category: "Commercial & Career",
    summary: "Governs the clarity, compliance, and mutual profitability of legal and commercial alliances.",
    primaryNumbers: [5, 3, 8, 6],
    secondaryNumbers: [1],
    bestDaysOfWeek: ["Wednesday", "Thursday"],
    avoidDaysOfWeek: ["Tuesday", "Saturday"],
    cautionCompounds: [13, 14, 16],
    auspiciousCompounds: [15, 21, 23],
    idealPersonalYears: [1, 3, 8, 5],
    protocolSteps: [
      "Target Wednesday (Mercury) for maximum commercial intelligence and contractual adaptability.",
      "Select Universal Day 5 (commerce), 3 (communication), or 8 (executive authority).",
      "Avoid dates with Compound 16 or 13, which induce contractual friction and enforcement bottlenecks.",
      "Execute the signing during a Mercury or Jupiter Hora."
    ],
    keyGuidelines: "Wednesday during a Mercury Hora under Universal Day 5 or 8 guarantees maximum clarity and mutual benefit."
  },
  {
    id: "naming_education",
    title: "5. Naming Ceremonies (Namakarana) & First Education (Vidyarambha)",
    category: "Personal & Family",
    summary: "Imprints the child's formal identity and shapes their lifelong relationship with learning and wisdom.",
    primaryNumbers: [1, 3, 5, 6],
    secondaryNumbers: [2, 9],
    bestDaysOfWeek: ["Wednesday", "Thursday", "Sunday"],
    avoidDaysOfWeek: ["Tuesday"],
    cautionCompounds: [13, 16],
    auspiciousCompounds: [15, 17, 21],
    idealPersonalYears: [1, 3, 6],
    protocolSteps: [
      "For Namakarana, choose Universal Day 1, 3, or 6 on a Thursday or Sunday.",
      "For Vidyarambha, choose Wednesday (Mercury's intelligence) or Thursday (Jupiter's wisdom).",
      "Verify that the Universal Day Number harmonizes with the child's Life Path Number.",
      "Conduct ceremony during a Jupiter or Saraswati-aligned planetary hour."
    ],
    keyGuidelines: "Thursday or Wednesday during Jupiter Hora provides profound intellectual receptivity for a child's learning initiation."
  },
  {
    id: "job_interview",
    title: "6. Job Interviews & Career Transitions",
    category: "Commercial & Career",
    summary: "Optimizes personal presence, impression management, and decision-maker favor during career selection.",
    primaryNumbers: [1, 3, 5, 8],
    secondaryNumbers: [6],
    bestDaysOfWeek: ["Sunday", "Wednesday", "Thursday"],
    avoidDaysOfWeek: ["Saturday"],
    cautionCompounds: [16, 19],
    auspiciousCompounds: [17, 21, 23, 27],
    idealPersonalYears: [1, 3, 8, 5],
    protocolSteps: [
      "Target Sunday (Sun's authority), Wednesday (Mercury's articulation), or Thursday (Jupiter's trustworthy wisdom).",
      "Align interview timing with a Sun Hora (authority) or Mercury Hora (eloquence).",
      "Ensure Personal Day is 1, 3, 5, or 8.",
      "Wear colors corresponding to the ruling planet of the day."
    ],
    keyGuidelines: "Sunday or Thursday under a Sun Hora projects authoritative competence and effortless trust."
  },
  {
    id: "travel",
    title: "7. Journey & Travel Departure Selection",
    category: "Travel & Movement",
    summary: "Ensures safety, seamless movement, and successful outcomes for business, spiritual, or leisure travel.",
    primaryNumbers: [5, 3, 1, 6],
    secondaryNumbers: [9, 7],
    bestDaysOfWeek: ["Wednesday", "Friday"],
    avoidDaysOfWeek: ["Tuesday", "Saturday"],
    cautionCompounds: [13, 14, 16],
    auspiciousCompounds: [15, 21, 23],
    idealPersonalYears: [5, 3, 1],
    protocolSteps: [
      "For commercial travel: depart Wednesday (Mercury) or Sunday (Sun).",
      "For spiritual pilgrimage: depart Thursday (Jupiter) or Monday (Moon) under Universal Day 7 or 9.",
      "For leisure/family travel: depart Friday (Venus) or Thursday under Universal Day 3 or 6.",
      "Avoid departure during Mars or Saturn Horas."
    ],
    keyGuidelines: "Wednesday departure under Universal Day 5 or 3 promises smooth transit and effective communication."
  },
  {
    id: "medical_procedure",
    title: "8. Elective Medical Procedures & Health Regimens",
    category: "Health & Well-being",
    summary: "Aligns bodily healing rhythms with planetary restorative frequencies. Supplementary to clinical advice.",
    primaryNumbers: [6, 9, 2, 5],
    secondaryNumbers: [3],
    bestDaysOfWeek: ["Monday", "Wednesday", "Thursday"],
    avoidDaysOfWeek: ["Tuesday"],
    cautionCompounds: [16, 13, 14],
    auspiciousCompounds: [15, 17, 21],
    idealPersonalYears: [2, 6, 9],
    protocolSteps: [
      "Avoid Tuesdays (Mars' aggressive cutting force) for elective surgical procedures.",
      "Prefer Monday (Moon's restorative fluid balance) or Thursday (Jupiter's expansion and healing grace).",
      "Select Universal Day 6 (caring recovery) or 2 (gentle attunement).",
      "Conduct procedures during a Moon, Mercury, or Jupiter Hora."
    ],
    keyGuidelines: "Always prioritize professional medical advice. For elective scheduling, Monday or Thursday under Moon/Jupiter Hora provides optimal restorative calm."
  },
  {
    id: "spiritual_practice",
    title: "9. Spiritual Initiations, Mantra & Sadhana",
    category: "Spiritual & Inner Work",
    summary: "Establishes a deep, undisturbed channel for mantra initiation, meditation discipline, and inner realization.",
    primaryNumbers: [7, 9, 2, 11],
    secondaryNumbers: [3, 6],
    bestDaysOfWeek: ["Monday", "Thursday"],
    avoidDaysOfWeek: ["Saturday"],
    cautionCompounds: [16],
    auspiciousCompounds: [11, 17, 21, 27],
    idealPersonalYears: [7, 9, 11],
    protocolSteps: [
      "Target Thursday (Guru's grace) or Monday (devotional mind purity).",
      "Choose Universal Day 7 (inner contemplation), 9 (universal compassion), or Master 11.",
      "Prefer Ekadashi tithi or Full Moon (Purnima) alignment.",
      "Begin sadhana during a Jupiter Hora or Brahma Muhurta window."
    ],
    keyGuidelines: "Thursday during Jupiter Hora under Universal Day 7 or Master 11 creates an extraordinary channel for spiritual grace."
  }
];

export const VEDIC_TITHI_MUHURTA_RULES = [
  { tithiName: "Pratipada (1st)", quality: "New Beginning", suitability: "Excellent for initiating projects; aligns with Universal Day 1." },
  { tithiName: "Panchami (5th)", quality: "Intellectual & Educational", suitability: "Outstanding for education, learning initiation, and travel." },
  { tithiName: "Navami (9th)", quality: "Dynamic & Bold", suitability: "Mixed; suitable for martial/competitive tasks, caution for delicate tasks." },
  { tithiName: "Ekadashi (11th)", quality: "Sacred Spiritual", suitability: "The premier tithi for fasting, prayer, mantra initiation, and sadhana." },
  { tithiName: "Dwadashi (12th)", quality: "Restorative & Health", suitability: "Highly auspicious for beginning health treatments and charitable service." },
  { tithiName: "Purnima (Full Moon)", quality: "Peak Vitality & Abundance", suitability: "Universally auspicious for all positive life events, business, and celebrations." },
  { tithiName: "Chaturthi (4th)", quality: "Obstacle Clearing", suitability: "Dedicated to Lord Ganesha; ideal for overcoming persistent bottlenecks." }
];

export const CONSULTATION_PROTOCOL_STEPS = [
  { step: 1, title: "Establish Full Numerological Profile", details: "Determine Life Path, Birth Number, current Personal Year, and Personal Month for all primary parties." },
  { step: 2, title: "Define Functional Event Requirements", details: "Identify the precise event type, realistic scheduling window, and practical constraints (family, logistics)." },
  { step: 3, title: "Apply Multi-Stage Filtering Matrix", details: "Filter by Day of Week -> Universal Day Number -> Compound Assessment -> Personal Year/Month compatibility." },
  { step: 4, title: "Calculate Intra-Day Hora Windows", details: "Determine exact planetary hours (Jupiter, Sun, Venus, Mercury) for the actual moment of initiation." },
  { step: 5, title: "Deliver Actionable Guidance with Epistemic Humility", details: "Provide top 3 date/time windows, explain vibrational rationale, and emphasize that Muhurta provides a supportive foundation for personal effort." }
];

// Utility Calculations

export function reduceToSingleDigit(num: number): number {
  if (num === 0) return 0;
  let current = Math.abs(num);
  while (current > 9) {
    if (current === 11 || current === 22 || current === 33) return current; // Keep master numbers if needed
    let sum = 0;
    while (current > 0) {
      sum += current % 10;
      current = Math.floor(current / 10);
    }
    current = sum;
  }
  return current;
}

export function sumDigits(numStr: string): number {
  return numStr
    .replace(/\D/g, "")
    .split("")
    .reduce((acc, char) => acc + parseInt(char, 10), 0);
}

export function calculateUniversalDayNumber(dateStr: string) {
  // dateStr format: YYYY-MM-DD
  const parts = dateStr.split("-");
  if (parts.length !== 3) {
    return { universalDay: 1, intermediateSum: 1, compound: 1, isCautionCompound: false, isMasterCompound: false, compoundName: "Standard" };
  }
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  const daySum = sumDigits(day.toString());
  const monthSum = sumDigits(month.toString());
  const yearSum = sumDigits(year.toString());

  const intermediateSum = daySum + monthSum + yearSum;
  let compound = intermediateSum;
  let universalDay = reduceToSingleDigit(compound);

  // If universalDay is master, extract root or keep compound
  if (universalDay > 9) {
    universalDay = reduceToSingleDigit(universalDay);
  }

  const detail = SIGNIFICANT_COMPOUNDS[compound];

  return {
    universalDay,
    intermediateSum,
    compound,
    isCautionCompound: detail ? detail.type === "caution" : false,
    isMasterCompound: compound === 11 || compound === 22 || compound === 33,
    compoundName: detail ? detail.name : `Compound ${compound}`,
    compoundDescription: detail ? detail.description : `Standard sum reducing to ${universalDay}`
  };
}

export function calculatePersonalYearNumber(birthDay: number, birthMonth: number, targetYear: number): number {
  const daySum = sumDigits(birthDay.toString());
  const monthSum = sumDigits(birthMonth.toString());
  const yearSum = sumDigits(targetYear.toString());
  return reduceToSingleDigit(daySum + monthSum + yearSum);
}

export function calculatePersonalMonthNumber(personalYear: number, targetMonth: number): number {
  return reduceToSingleDigit(personalYear + targetMonth);
}

export function calculatePersonalDayNumber(personalMonth: number, universalDay: number): number {
  return reduceToSingleDigit(personalMonth + universalDay);
}

export function getDayOfWeekName(dateStr: string): string {
  const dateObj = new Date(dateStr + "T00:00:00");
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[dateObj.getDay()];
}

export function calculatePlanetaryHoras(dateStr: string, sunriseStr: string = "06:15", sunsetStr: string = "18:30") {
  const dayName = getDayOfWeekName(dateStr);
  const startDayPlanetMap: Record<string, string> = {
    Sunday: "Sun",
    Monday: "Moon",
    Tuesday: "Mars",
    Wednesday: "Mercury",
    Thursday: "Jupiter",
    Friday: "Venus",
    Saturday: "Saturn"
  };

  const startPlanet = startDayPlanetMap[dayName] || "Sun";
  const startIndex = CHALDEAN_HORA_SEQUENCE.indexOf(startPlanet);

  // Parse sunrise & sunset
  const [sHour, sMin] = sunriseStr.split(":").map(Number);
  const [eHour, eMin] = sunsetStr.split(":").map(Number);

  const sunriseMinutes = sHour * 60 + sMin;
  const sunsetMinutes = eHour * 60 + eMin;
  const daylightMinutes = sunsetMinutes > sunriseMinutes ? sunsetMinutes - sunriseMinutes : 720;
  const horaLengthMinutes = Math.round(daylightMinutes / 12);

  const horas = [];
  for (let i = 0; i < 12; i++) {
    const planet = CHALDEAN_HORA_SEQUENCE[(startIndex + i) % 7];
    const horaProp = PLANETARY_HORA_PROPERTIES[planet];

    const hStartTotal = sunriseMinutes + i * horaLengthMinutes;
    const hEndTotal = hStartTotal + horaLengthMinutes;

    const formatTime = (mins: number) => {
      const h = Math.floor(mins / 60) % 24;
      const m = mins % 60;
      const ampm = h >= 12 ? "PM" : "AM";
      const displayH = h % 12 === 0 ? 12 : h % 12;
      const displayM = m < 10 ? `0${m}` : m;
      return `${displayH}:${displayM} ${ampm}`;
    };

    horas.push({
      index: i + 1,
      planet,
      number: horaProp.number,
      startTime: formatTime(hStartTotal),
      endTime: formatTime(hEndTotal),
      quality: horaProp.quality,
      recommendedActions: horaProp.recommendedActions,
      avoidActions: horaProp.avoidActions,
      isFavorable: planet === "Jupiter" || planet === "Sun" || planet === "Venus" || planet === "Mercury"
    });
  }

  return horas;
}

export function evaluateEventSuitability(eventType: string, dateStr: string, userDob?: string) {
  const protocol = EVENT_SELECTION_PROTOCOLS.find((p) => p.id === eventType) || EVENT_SELECTION_PROTOCOLS[0];
  const dayName = getDayOfWeekName(dateStr);
  const dayData = DAYS_OF_WEEK_DATA[dayName];
  const univDayData = calculateUniversalDayNumber(dateStr);

  let userPy = 1;
  let userPm = 1;
  let userPd = 1;

  if (userDob) {
    const dobParts = userDob.split("-");
    if (dobParts.length === 3) {
      const birthDay = parseInt(dobParts[2], 10);
      const birthMonth = parseInt(dobParts[1], 10);
      const targetYear = parseInt(dateStr.split("-")[0], 10);
      const targetMonth = parseInt(dateStr.split("-")[1], 10);

      userPy = calculatePersonalYearNumber(birthDay, birthMonth, targetYear);
      userPm = calculatePersonalMonthNumber(userPy, targetMonth);
      userPd = calculatePersonalDayNumber(userPm, univDayData.universalDay);
    }
  }

  // Scoring algorithm
  let score = 70; // baseline

  // 1. Day of week score
  if (protocol.bestDaysOfWeek.includes(dayName)) score += 15;
  if (protocol.avoidDaysOfWeek.includes(dayName)) score -= 25;

  // 2. Universal Day Number alignment
  if (protocol.primaryNumbers.includes(univDayData.universalDay)) score += 15;
  else if (protocol.secondaryNumbers.includes(univDayData.universalDay)) score += 8;

  // 3. Compound check
  if (protocol.cautionCompounds.includes(univDayData.compound)) score -= 30;
  if (protocol.auspiciousCompounds.includes(univDayData.compound)) score += 20;

  // 4. Personal Year check
  if (userDob && protocol.idealPersonalYears.includes(userPy)) score += 10;

  // Bound score
  score = Math.min(100, Math.max(10, score));

  let status: "High Auspiciousness" | "Moderate Auspiciousness" | "Caution Advised";
  if (score >= 82) status = "High Auspiciousness";
  else if (score >= 60) status = "Moderate Auspiciousness";
  else status = "Caution Advised";

  return {
    eventType: protocol.title,
    dateStr,
    dayName,
    dayPlanet: dayData.rulingPlanet,
    universalDay: univDayData.universalDay,
    compound: univDayData.compound,
    compoundName: univDayData.compoundName,
    isCautionCompound: univDayData.isCautionCompound,
    userPy,
    userPm,
    userPd,
    score,
    status,
    protocol
  };
}
