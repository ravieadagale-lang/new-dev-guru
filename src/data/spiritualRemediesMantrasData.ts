// Complete Data & Theoretical Framework for Chapter Thirty-Six: Spiritual Remedies and Mantras for Numerology

export interface PlanetaryMantraSet {
  number: number;
  planet: string;
  deities: string[];
  primaryNavagrahaMantra: string;
  primaryMeaning: string;
  beejaMantra: string;
  gayatriMantra?: string;
  deityMantras: { name: string; mantra: string; purpose: string }[];
  defaultCount: number;
  bestDay: string;
  bestTime: string;
  facingDirection: string;
  malaType: string;
  offering: string;
  visualisation: string;
  practiceProtocol: string[];
  indications: string[];
}

export interface MissingNumberMantraRemedy {
  missingNumber: number;
  capacityName: string;
  primaryMantra: string;
  secondaryMantra: string;
  count: number;
  dayAndTime: string;
  specificPractice: string;
}

export interface KarmicDebtMantraRemedy {
  compoundNumber: number;
  title: string;
  coreLesson: string;
  primaryMantra: string;
  secondaryMantra: string;
  specificMantra: string;
  dailyRoutine: { time: string; mantra: string; count: number }[];
  duration: string;
}

export interface UniversalMantraInfo {
  id: string;
  title: string;
  sanskrit: string;
  translation: string;
  significance: string;
  usageCount: string;
  recommendedFor: string[];
}

export interface JapaProtocolStep {
  stepNumber: number;
  title: string;
  duration: string;
  instructions: string[];
}

// 1. PLANETARY MANTRAS FOR NUMBERS 1-9, 11, 22
export const PLANETARY_MANTRAS_DATA: Record<number, PlanetaryMantraSet> = {
  1: {
    number: 1,
    planet: "Sun (Surya)",
    deities: ["Surya", "Ganesha", "Shiva"],
    primaryNavagrahaMantra: "Om Suryaya Namaha",
    primaryMeaning: "I bow in reverence to the Sun — the source of vital authority, confidence, and self-direction.",
    beejaMantra: "Om Hram Hrim Hraum Sah Suryaya Namaha",
    gayatriMantra: "Om Bhaskaraya Vidmahe Mahadyutikaraya Dheemahi Tanno Aditya Prachodayat",
    deityMantras: [
      { name: "Ganesha New Beginnings Mantra", mantra: "Om Gam Ganapataye Namaha", purpose: "Removes obstacles before initiating new self-directed projects." },
      { name: "Surya 12 Namaskar Cycle", mantra: "Om Mitraya Namaha, Om Ravaye Namaha, Om Suryaya Namaha...", purpose: "Aligns vital physical energy with solar dawn." }
    ],
    defaultCount: 108,
    bestDay: "Sunday",
    bestTime: "Sunrise / Brahma Muhurta",
    facingDirection: "East",
    malaType: "108-bead Rudraksha Mala or Crystal Quartz Mala",
    offering: "Water from a copper vessel containing red flowers, jaggery, or saffron rice",
    visualisation: "Visualise a brilliant golden solar disc radiating from the heart centre (Anahata chakra) outward.",
    practiceProtocol: [
      "Sit facing East at sunrise on a yellow or orange cloth.",
      "Hold Rudraksha mala in right hand, using thumb and middle finger to rotate beads.",
      "Perform 108 repetitions of 'Om Suryaya Namaha'.",
      "Offer water to the rising Sun from a copper vessel after practice."
    ],
    indications: [
      "Life Path 1 strengthening",
      "Missing Number 1 in Lo Shu Grid (Communication Plane)",
      "Lack of self-confidence or difficulty starting new initiatives",
      "Personal Year 1 initiation alignment"
    ]
  },

  2: {
    number: 2,
    planet: "Moon (Chandra)",
    deities: ["Chandra", "Parvati", "Durga"],
    primaryNavagrahaMantra: "Om Chandraya Namaha",
    primaryMeaning: "I bow in reverence to the Moon — the ruler of emotional intelligence, intuition, and peace.",
    beejaMantra: "Om Shram Shrim Shraum Sah Chandraya Namaha",
    gayatriMantra: "Om Ksheeraputraya Vidmahe Amrit Tattvaya Dheemahi Tanno Chandra Prachodayat",
    deityMantras: [
      { name: "Parvati Emotional Healing Mantra", mantra: "Om Aim Hrim Shrim Parvati Devyai Namaha", purpose: "Cultivates loving warmth, empathy, and relationship harmony." },
      { name: "Somaya Peace Mantra", mantra: "Om Som Somaya Namaha", purpose: "Soothes insomnia, mental volatility, and anxiety before sleep." }
    ],
    defaultCount: 108,
    bestDay: "Monday",
    bestTime: "Dusk / Evening / Full Moon Night (Purnima)",
    facingDirection: "North-West or North",
    malaType: "Natural Pearl Mala or White Sandalwood Mala",
    offering: "White lotus, white rose, milk, or white rice in a silver bowl",
    visualisation: "Visualise a cool, silver-white full moon radiating soothing light through the crown of the head (Sahasrara).",
    practiceProtocol: [
      "Sit facing North-West on a white or silver cloth in the evening.",
      "Use Pearl or White Sandalwood mala for 108 repetitions.",
      "Maintain a soft, quiet mental posture, breathing deeply into the abdomen.",
      "Sit in 10 minutes of complete silent reflection post-mantra."
    ],
    indications: [
      "Life Path 2 strengthening & sensitivity moderation",
      "Missing Number 2 in Lo Shu Grid (Intuition)",
      "Emotional volatility, relationship friction, or chronic anxiety"
    ]
  },

  3: {
    number: 3,
    planet: "Jupiter (Brihaspati / Guru)",
    deities: ["Brihaspati", "Vishnu", "Saraswati"],
    primaryNavagrahaMantra: "Om Gurave Namaha",
    primaryMeaning: "I bow in reverence to Jupiter — the divine Guru of expansive wisdom, joy, and prosperity.",
    beejaMantra: "Om Grim Brihaspataye Namaha",
    gayatriMantra: "Om Angirashaya Vidmahe Divya Dehaya Dheemahi Tanno Guru Prachodayat",
    deityMantras: [
      { name: "Saraswati Creative Intelligence Mantra", mantra: "Om Aim Saraswatyai Namaha", purpose: "Enhances higher learning, public speaking, and artistic expression." },
      { name: "Mahalakshmi Abundance Mantra", mantra: "Om Shrim Mahalakshmiye Namaha", purpose: "Attracts righteous material prosperity and divine blessing." },
      { name: "Vishnu Sustaining Mantra", mantra: "Om Namo Narayanaya", purpose: "Expands universal wisdom and maintains spiritual growth." }
    ],
    defaultCount: 108,
    bestDay: "Thursday",
    bestTime: "Sunrise / Jupiter Hora",
    facingDirection: "North-East (Ishanya Kona)",
    malaType: "Yellow Sapphire Mala, Haldi (Turmeric) Mala, or Tulsi Mala",
    offering: "Yellow marigold flowers, chana dal, honey, bananas, and a lit ghee diya",
    visualisation: "Visualise golden-yellow divine light expanding from the throat chakra outward across the universe.",
    practiceProtocol: [
      "Sit facing North-East on a yellow cloth at dawn.",
      "Light a ghee lamp and offer yellow marigold flowers.",
      "Chant 'Om Gurave Namaha' 108 times using a Turmeric or Tulsi mala.",
      "Dedicate practice to teachers, elders, and global wisdom."
    ],
    indications: [
      "Life Path 3 creative & wisdom expansion",
      "Missing Number 3 in Lo Shu Grid (Action/Wisdom)",
      "Financial stagnation, learning hurdles, or creative blockages"
    ]
  },

  4: {
    number: 4,
    planet: "Rahu / Saturn",
    deities: ["Durga", "Ganesha", "Saraswati"],
    primaryNavagrahaMantra: "Om Rahave Namaha",
    primaryMeaning: "I bow in reverence to Rahu — the force of unconventional breakthrough, clarity through confusion, and practical structure.",
    beejaMantra: "Om Bhram Bhrim Bhraum Sah Rahave Namaha",
    gayatriMantra: "Om Nagdhvajaya Vidmahe Padma Hastaya Dheemahi Tanno Rahu Prachodayat",
    deityMantras: [
      { name: "Durga Protection Mantra", mantra: "Om Dum Durgayai Namaha", purpose: "Provides protection against sudden chaos, confusion, and fear." },
      { name: "Ganesha Barrier Removal Mantra", mantra: "Om Gam Ganapataye Namaha", purpose: "Dissolves structural obstacles and clears mental fog." }
    ],
    defaultCount: 108,
    bestDay: "Saturday",
    bestTime: "Dusk / Rahu Kalam",
    facingDirection: "South-West or West",
    malaType: "Rudraksha Mala or Black Onyx Mala",
    offering: "Black sesame seeds, blue flowers, or mustard oil lamp under a Peepal tree",
    visualisation: "Visualise a dark blue shield of protective light dispelling clouds of doubt and organizing chaotic energy.",
    practiceProtocol: [
      "Sit facing South-West or West on a blue or dark grey cloth.",
      "Chant 108 times at dusk or during Rahu Kalam.",
      "Keep a written schedule or practical plan on the altar during practice."
    ],
    indications: [
      "Life Path 4 structural grounding",
      "Missing Number 4 in Lo Shu Grid (Practicality)",
      "Arrow of Confusion (4-3-8 empty) remediation"
    ]
  },

  5: {
    number: 5,
    planet: "Mercury (Budha)",
    deities: ["Budha", "Saraswati", "Vishnu"],
    primaryNavagrahaMantra: "Om Budhaya Namaha",
    primaryMeaning: "I bow in reverence to Mercury — the lord of eloquent communication, business acumen, and mental agility.",
    beejaMantra: "Om Bram Brim Braum Sah Budhaya Namaha",
    gayatriMantra: "Om Gajadhvajaya Vidmahe Sukha Hastaya Dheemahi Tanno Budha Prachodayat",
    deityMantras: [
      { name: "Saraswati Student & Scholar Beeja", mantra: "Om Aim Hrim Shrim Aim Saraswatyai Namaha", purpose: "Enhances memory, exam performance, and intellectual clarity." },
      { name: "Vishnu Universal Grace Mantra", mantra: "Om Namo Bhagavate Vasudevaya", purpose: "Sustains commercial ethics, adaptability, and mental poise." }
    ],
    defaultCount: 108,
    bestDay: "Wednesday",
    bestTime: "Morning / Mercury Hora",
    facingDirection: "North (Kubera Zone)",
    malaType: "Emerald Mala, Green Jade Mala, or Tulsi Mala",
    offering: "Whole green mung dal, fresh Tulsi leaves, green grass, or green sweets",
    visualisation: "Visualise a vibrant emerald-green ray of light illuminating the throat and mind with rapid analytical clarity.",
    practiceProtocol: [
      "Sit facing North on a green cloth on Wednesday morning.",
      "Chant 'Om Budhaya Namaha' 108 times with focus on verbal clarity.",
      "Recite 27 times before important commercial deals or public speeches."
    ],
    indications: [
      "Life Path 5 versatility alignment",
      "Missing Number 5 in Lo Shu Grid (Will Plane - Central Core)",
      "Communication hurdles, business indecision, or nervous tension"
    ]
  },

  6: {
    number: 6,
    planet: "Venus (Shukra)",
    deities: ["Lakshmi", "Radha", "Shukra"],
    primaryNavagrahaMantra: "Om Shukraya Namaha",
    primaryMeaning: "I bow in reverence to Venus — the deity of loving harmony, creative beauty, and luxury abundance.",
    beejaMantra: "Om Dram Drim Draum Sah Shukraya Namaha",
    gayatriMantra: "Om Ashwadhvajaya Vidmahe Dhanur Hastaya Dheemahi Tanno Shukra Prachodayat",
    deityMantras: [
      { name: "Mahalakshmi Abundance Mantra", mantra: "Om Shrim Mahalakshmiye Namaha", purpose: "Attracts domestic harmony, relationship healing, and aesthetic refinement." },
      { name: "Shodashi Devi Beeja", mantra: "Om Aim Hrim Shrim Klim Sauh", purpose: "Activates divine feminine creative charm and aesthetic intelligence." }
    ],
    defaultCount: 108,
    bestDay: "Friday",
    bestTime: "Morning / Dusk / Venus Hora",
    facingDirection: "South-East or East",
    malaType: "Rose Quartz Mala, Pearl Mala, or White Sandalwood Mala",
    offering: "Fresh white or pink roses, rose water, sweet kheer (rice pudding), and jasmine incense",
    visualisation: "Visualise soft pink and iridescent white light surrounding the home and relationships with divine warmth.",
    practiceProtocol: [
      "Sit facing South-East or East on a pink or cream cloth.",
      "Light jasmine incense and offer fresh rose petals.",
      "Chant 108 times every Friday for relationship healing and aesthetic grace."
    ],
    indications: [
      "Life Path 6 domestic & artistic harmony",
      "Missing Number 6 in Lo Shu Grid (Creativity / Family)",
      "Marital friction, aesthetic blocks, or material luxury scarcity"
    ]
  },

  7: {
    number: 7,
    planet: "Ketu (South Node)",
    deities: ["Ganesha", "Shiva", "Ketu"],
    primaryNavagrahaMantra: "Om Ketave Namaha",
    primaryMeaning: "I bow in reverence to Ketu — the indicator of spiritual penetration, past-life wisdom, and intuitive truth.",
    beejaMantra: "Om Sram Srim Sraum Sah Ketave Namaha",
    gayatriMantra: "Om Aswadhvajaya Vidmahe Shoola Hastaya Dheemahi Tanno Ketu Prachodayat",
    deityMantras: [
      { name: "Panchakshara Shiva Liberation Mantra", mantra: "Om Namah Shivaya", purpose: "Removes illusion, dissolves ego attachments, and grants spiritual depth." },
      { name: "Ganesha Barrier Removal Beeja", mantra: "Om Gam", purpose: "Unlocks non-rational direct perception and protects from hidden conflict." }
    ],
    defaultCount: 108,
    bestDay: "Tuesday or Thursday",
    bestTime: "Dawn / Night",
    facingDirection: "North-East or South-West",
    malaType: "Rudraksha Mala or Cat's Eye Bead Mala",
    offering: "Multi-colored blankets to needy, sesame seeds, or food for stray dogs",
    visualisation: "Visualise a violet flame at the third eye chakra (Ajna) penetrating through superficial noise into pure truth.",
    practiceProtocol: [
      "Sit facing North-East in quiet contemplation at dawn.",
      "Chant 108 times 'Om Ketave Namaha' or 'Om Namah Shivaya'.",
      "Follow practice with 15 minutes of silent non-judgmental observation."
    ],
    indications: [
      "Life Path 7 analytical & spiritual depth",
      "Missing Number 7 in Lo Shu Grid (Thinking / Introspection)",
      "Arrow of Loneliness (2-7-6 empty) remediation"
    ]
  },

  8: {
    number: 8,
    planet: "Saturn (Shani)",
    deities: ["Shani", "Hanuman", "Shiva"],
    primaryNavagrahaMantra: "Om Shanaischaraya Namaha",
    primaryMeaning: "I bow in reverence to Saturn — the master of karmic justice, structural discipline, and earned authority.",
    beejaMantra: "Om Sham Shim Shaum Sah Shanaischaraya Namaha",
    gayatriMantra: "Om Sanaischaraya Vidmahe Chaya Putraya Dheemahi Tanno Mandah Prachodayat",
    deityMantras: [
      { name: "Hanuman Protection Mantra", mantra: "Om Hanumate Namaha", purpose: "Appeases Saturn, grants physical courage, and protects from karmic hardship." },
      { name: "Mahamrityunjaya Protection Mantra", mantra: "Om Tryambakam Yajamahe Sugandhim Pushtivardhanam Urvarukamiva Bandhanan Mrityormukshiya Mamritat", purpose: "Universal protection during severe Saturn Sade Sati or executive crisis." }
    ],
    defaultCount: 108,
    bestDay: "Saturday",
    bestTime: "Saturday Morning / Sunset (Saturn Hora)",
    facingDirection: "West",
    malaType: "Iron Bead Mala, Rudraksha Mala, or Black Onyx Mala",
    offering: "Black sesame seeds (til), mustard oil lamp under Peepal tree, or black urad dal",
    visualisation: "Visualise a deep dark blue pillar of strength grounding the spine into unshakeable stability.",
    practiceProtocol: [
      "Sit facing West on a dark blue or black cloth.",
      "Recite complete Hanuman Chalisa or 108 times 'Om Shanaischaraya Namaha'.",
      "Light a mustard oil lamp under a Peepal tree every Saturday evening."
    ],
    indications: [
      "Life Path 8 executive mastery",
      "Missing Number 8 in Lo Shu Grid (Wisdom / Financial Organisation)",
      "Saturn Sade Sati or career stagnation remediation"
    ]
  },

  9: {
    number: 9,
    planet: "Mars (Mangal)",
    deities: ["Mangal", "Hanuman", "Kartikeya"],
    primaryNavagrahaMantra: "Om Mangalaya Namaha",
    primaryMeaning: "I bow in reverence to Mars — the lord of courageous completion, vital energy, and protective service.",
    beejaMantra: "Om Kram Krim Kraum Sah Bhaumaya Namaha",
    gayatriMantra: "Om Veeradhvajaya Vidmahe Vighna Hastaya Dheemahi Tanno Bhaumah Prachodayat",
    deityMantras: [
      { name: "Kartikeya / Murugan Victory Mantra", mantra: "Om Saravanabhavaya Namaha", purpose: "Grants warrior courage, spiritual victory, and decisive resolution." },
      { name: "Hanuman Rudratmakaya Beeja", mantra: "Om Haum Hanumate Rudratmakaya Hum Phat", purpose: "Ignites physical vitality and eliminates fear before high-stakes action." }
    ],
    defaultCount: 108,
    bestDay: "Tuesday",
    bestTime: "Sunrise / Mars Hora",
    facingDirection: "South or East",
    malaType: "Red Coral Mala or Red Sandalwood Mala",
    offering: "Red lentils (masoor dal), jaggery, red flowers, or copper items",
    visualisation: "Visualise a crimson fire of courageous vitality surging through the solar plexus (Manipura chakra).",
    practiceProtocol: [
      "Sit facing South or East on a red cloth at sunrise.",
      "Chant 108 times 'Om Mangalaya Namaha' using Red Sandalwood mala.",
      "Follow practice by taking one immediate physical action toward a pending goal."
    ],
    indications: [
      "Life Path 9 completion power",
      "Missing Number 9 in Lo Shu Grid (Ambition / Completion)",
      "Procrastination, physical fatigue, or fear of confrontation"
    ]
  },

  11: {
    number: 11,
    planet: "Moon / Master 11",
    deities: ["Shiva", "Parvati", "Surya"],
    primaryNavagrahaMantra: "Om Chandraya Namaha / Om Namah Shivaya",
    primaryMeaning: "Illuminated spiritual intuition operating through base 2 sensitivity.",
    beejaMantra: "Om Shram Shrim Shraum Sah Chandramase Namah",
    deityMantras: [
      { name: "Illuminated Vision Mantra", mantra: "Om Namah Shivaya", purpose: "Calms heightened nervous sensitivity while channeling spiritual vision." }
    ],
    defaultCount: 108,
    bestDay: "Monday",
    bestTime: "Dusk / Night",
    facingDirection: "North-East",
    malaType: "Sphatik (Crystal) Mala or White Pearl Mala",
    offering: "Pure fresh water, white rice, sandalwood paste",
    visualisation: "Visualise moonlight and sunlight merging into a luminous golden-white orb at the crown chakra.",
    practiceProtocol: [
      "Sit in silent meditation facing North-East.",
      "Chant 108 times 'Om Namah Shivaya' or 'Om Chandraya Namaha'.",
      "Spend 15 minutes in stillness channeling intuitive insights."
    ],
    indications: ["Master 11 Life Path alignment", "Heightened nervous sensitivity moderation"]
  },

  22: {
    number: 22,
    planet: "Saturn / Rahu / Master 22",
    deities: ["Vishwakarma", "Durga", "Shani"],
    primaryNavagrahaMantra: "Om Rahave Namah / Om Shanaischaraya Namah",
    primaryMeaning: "Master structural manifestation operating through base 4 methodical discipline.",
    beejaMantra: "Om Bhram Bhrim Bhraum Sah Rahave Namaha",
    deityMantras: [
      { name: "Master Architect Vishwakarma Invocation", mantra: "Om Gam Ganapataye Namaha", purpose: "Protects large-scale architectural and organizational projects." }
    ],
    defaultCount: 108,
    bestDay: "Saturday",
    bestTime: "Saturday Morning",
    facingDirection: "South-West / West",
    malaType: "Rudraksha Mala",
    offering: "Mustard oil lamp, iron items, dark sesame seeds",
    visualisation: "Visualise global blueprints manifesting smoothly into solid, enduring physical structures.",
    practiceProtocol: [
      "Sit facing South-West on a dark slate cloth.",
      "Chant 108 times with intention set on large-scale humanitarian building.",
      "Maintain absolute legal and ethical precision in documentation."
    ],
    indications: ["Master 22 Life Path alignment", "Large-scale organizational structure building"]
  }
};

// 2. MANTRAS FOR MISSING LO SHU GRID NUMBERS (POSITIONS 1 TO 9)
export const MISSING_NUMBER_MANTRAS: MissingNumberMantraRemedy[] = [
  {
    missingNumber: 1,
    capacityName: "Communication & Self-Expression",
    primaryMantra: "Om Suryaya Namaha",
    secondaryMantra: "Om Gam Ganapataye Namaha",
    count: 108,
    dayAndTime: "Sunday Sunrise",
    specificPractice: "Chant aloud (Vaikhari) facing East. The vocal resonance builds the self-expression plane missing in position 1."
  },
  {
    missingNumber: 2,
    capacityName: "Intuition & Relational Sensitivity",
    primaryMantra: "Om Chandraya Namaha",
    secondaryMantra: "Om Aim Saraswatyai Namaha",
    count: 108,
    dayAndTime: "Monday Dusk / Evening",
    specificPractice: "Sit in 10 minutes of complete silent reflection after mantra, writing down the first intuitive feeling that arises."
  },
  {
    missingNumber: 3,
    capacityName: "Action & Creative Wisdom",
    primaryMantra: "Om Mangalaya Namaha",
    secondaryMantra: "Om Hanumate Namaha",
    count: 108,
    dayAndTime: "Tuesday / Thursday Morning",
    specificPractice: "Immediately after mantra, take one concrete physical action toward a long-pending goal without overthinking."
  },
  {
    missingNumber: 4,
    capacityName: "Practical Discipline & Order",
    primaryMantra: "Om Rahave Namaha",
    secondaryMantra: "Om Shanaischaraya Namaha",
    count: 108,
    dayAndTime: "Saturday Dusk",
    specificPractice: "Keep a written schedule or budget planner on the altar during practice, infusing it with structural order."
  },
  {
    missingNumber: 5,
    capacityName: "Will Power & Central Stability (CRITICAL)",
    primaryMantra: "Om Namah Shivaya",
    secondaryMantra: "Om Budhaya Namaha",
    count: 108,
    dayAndTime: "Daily Without Exception at Dawn",
    specificPractice: "Position 5 is the central core. Practice must be performed DAILY without missing a day to forge unassailable willpower."
  },
  {
    missingNumber: 6,
    capacityName: "Creativity & Domestic Harmony",
    primaryMantra: "Om Shukraya Namaha",
    secondaryMantra: "Om Shrim Mahalakshmiye Namaha",
    count: 108,
    dayAndTime: "Friday Morning",
    specificPractice: "Light jasmine incense and visualize creating or beautifying living spaces immediately post-mantra."
  },
  {
    missingNumber: 7,
    capacityName: "Analytical Thinking & Introspection",
    primaryMantra: "Om Ketave Namaha",
    secondaryMantra: "Om Budhaya Namaha",
    count: 108,
    dayAndTime: "Tuesday or Thursday Dawn",
    specificPractice: "Spend 15 minutes after mantra reading or studying a challenging book to anchor Ketu's analytical faculty."
  },
  {
    missingNumber: 8,
    capacityName: "Financial Wisdom & Perseverance",
    primaryMantra: "Om Gurave Namaha",
    secondaryMantra: "Om Shanaischaraya Namaha",
    count: 108,
    dayAndTime: "Thursday or Saturday Morning",
    specificPractice: "Reflect in writing on financial planning and ethical responsibility for 10 minutes post-mantra."
  },
  {
    missingNumber: 9,
    capacityName: "Ambition & Completion Power",
    primaryMantra: "Om Suryaya Namaha",
    secondaryMantra: "Om Mangalaya Namaha",
    count: 108,
    dayAndTime: "Sunday or Tuesday Morning",
    specificPractice: "Write down your single highest goal in clear text before practice and read it aloud after completing 108 counts."
  }
];

// 3. KARMIC DEBT MANTRAS (COMPOUNDS 13, 14, 16, 19)
export const KARMIC_DEBT_MANTRAS_DATA: Record<number, KarmicDebtMantraRemedy> = {
  13: {
    compoundNumber: 13,
    title: "Compound 13: Mantra of Disciplined Honest Effort",
    coreLesson: "Remedies obstacles at project completion and resistance to sustained hard work.",
    primaryMantra: "Om Gam Ganapataye Namaha",
    secondaryMantra: "Om Shanaischaraya Namaha",
    specificMantra: "Om Gam Ganapataye Namaha · Om Shrim Shrim Shrim",
    dailyRoutine: [
      { time: "Morning", mantra: "Om Gam Ganapataye Namaha", count: 108 },
      { time: "Evening", mantra: "Om Shanaischaraya Namaha", count: 27 },
      { time: "Before Project Milestone", mantra: "Om Gam Ganapataye Namaha", count: 27 }
    ],
    duration: "Minimum 108 consecutive days without skipping"
  },

  14: {
    compoundNumber: 14,
    title: "Compound 14: Mantra of Conscious Moderation",
    coreLesson: "Remedies impulsive financial speculation, volatility, and sensory overreach.",
    primaryMantra: "Om Budhaya Namaha",
    secondaryMantra: "Om Namo Bhagavate Vasudevaya",
    specificMantra: "Om Shantihi Shantihi Shantihi",
    dailyRoutine: [
      { time: "Morning", mantra: "Om Budhaya Namaha", count: 108 },
      { time: "Before High-Risk Impulse", mantra: "Om Shantihi Shantihi Shantihi", count: 3 },
      { time: "Evening", mantra: "Om Namo Bhagavate Vasudevaya", count: 27 }
    ],
    duration: "40-day Purashcharana cycle"
  },

  16: {
    compoundNumber: 16,
    title: "Compound 16: Mantra of Radical Authenticity",
    coreLesson: "Remedies sudden structural disruptions by dismantling false ego foundations.",
    primaryMantra: "Om Namah Shivaya",
    secondaryMantra: "Om Hanumate Namaha",
    specificMantra: "Maha Mrityunjaya Mantra (Om Tryambakam...)",
    dailyRoutine: [
      { time: "Morning", mantra: "Om Namah Shivaya", count: 108 },
      { time: "Evening", mantra: "Om Hanumate Namaha", count: 108 },
      { time: "Monday / Crisis Times", mantra: "Maha Mrityunjaya Mantra", count: 108 }
    ],
    duration: "Minimum 108 consecutive days + radical honesty commitment"
  },

  19: {
    compoundNumber: 19,
    title: "Compound 19: Mantra of Genuine Interdependence",
    coreLesson: "Remedies isolation, stubborn pride, and refusal to ask for or receive support.",
    primaryMantra: "Om Suryaya Namaha",
    secondaryMantra: "Om Namo Narayanaya",
    specificMantra: "Om Loka Samastha Sukhino Bhavantu",
    dailyRoutine: [
      { time: "Morning", mantra: "Om Suryaya Namaha", count: 108 },
      { time: "Midday", mantra: "Om Loka Samastha Sukhino Bhavantu", count: 108 },
      { time: "In Isolation Traps", mantra: "Om Tat Sat", count: 27 }
    ],
    duration: "40 days combined with asking 1 person for help daily"
  }
};

// 4. UNIVERSAL MANTRAS FOR NUMERICAL ALIGNMENT
export const UNIVERSAL_MANTRAS: UniversalMantraInfo[] = [
  {
    id: "gayatri",
    title: "The Gayatri Mantra — Universal Illuminated Intelligence",
    sanskrit: "Om Bhur Bhuva Svaha · Tat Savitur Varenyam · Bhargo Devasya Dheemahi · Dhiyo Yo Nah Prachodayat",
    translation: "We meditate upon the divine light of the most adorable Sun. May that radiant light illuminate our intellect.",
    significance: "24 sacred syllables corresponding to the 24 hours. The single most powerful universal mantra serving all numbers.",
    usageCount: "108 times at Sunrise, Noon, or Sunset (The Three Sandhyas)",
    recommendedFor: ["All Life Path Numbers", "Students & Scholars", "Mental Clarity & Wisdom"]
  },
  {
    id: "panchakshara",
    title: "Om Namah Shivaya — Panchakshara for Elemental Alignment",
    sanskrit: "Om Namah Shivaya",
    translation: "I bow to Shiva — the supreme unassailable consciousness that governs all five elements.",
    significance: "Five syllables (Na-Ma-Shi-Va-Ya) align the 5 elements. Direct remedy for Missing Number 5 and Compound 16.",
    usageCount: "108, 1008, or continuous mental Japa",
    recommendedFor: ["Missing Number 5 (Will)", "Compound 16 Remediation", "Saturn Sade Sati Relief"]
  },
  {
    id: "mahamrityunjaya",
    title: "Maha Mrityunjaya Mantra — Protection & Conquest of Crisis",
    sanskrit: "Om Tryambakam Yajamahe Sugandhim Pushtivardhanam · Urvarukamiva Bandhanan Mrityormukshiya Mamritat",
    translation: "We worship the three-eyed Lord who nourishes all beings. May he liberate us from mortality like a ripe cucumber from its vine.",
    significance: "Supreme protection mantra in the Vedic corpus. Shield against sudden illness, accidents, or structural collapse.",
    usageCount: "108 times on Mondays or during times of crisis",
    recommendedFor: ["Severe Saturn / Rahu Transit", "Compound 16 Structural Shifts", "Health & Protection"]
  },
  {
    id: "shanti",
    title: "Om Shanti Shanti Shantihi — Peace Across Three Dimensions",
    sanskrit: "Om Shantihi Shantihi Shantihi",
    translation: "May there be peace in the physical body (Bhur), mental subtle realm (Bhuva), and causal spiritual realm (Svaha).",
    significance: "Universal opening and closing sealing mantra. Grounds the nervous system before and after any Japa.",
    usageCount: "3 times at beginning and end of every session",
    recommendedFor: ["Opening/Closing Japa", "Anxiety & Stress Relief", "All Practice Routines"]
  }
];

// 5. JAPA PRACTICE PROTOCOL
export const JAPA_PROTOCOL_STEPS: JapaProtocolStep[] = [
  {
    stepNumber: 1,
    title: "Preparation & Sacred Space Setup",
    duration: "5 Minutes",
    instructions: [
      "Wash face and hands with clean water.",
      "Sit in designated quiet space on a yellow, white, or red cloth.",
      "Light incense (sandalwood or rose) and a ghee lamp.",
      "Take 3 deep abdominal breaths to drop daily mental clutter."
    ]
  },
  {
    stepNumber: 2,
    title: "Ganesha Invocation",
    duration: "1 Minute",
    instructions: [
      "Chant 'Om Gam Ganapataye Namaha' 3 times.",
      "Request removal of internal and external obstacles to the Japa session."
    ]
  },
  {
    stepNumber: 3,
    title: "Sankalpa (Conscious Intention Statement)",
    duration: "1 Minute",
    instructions: [
      "State clear inner intention: 'I practice [Mantra] to align with [Planetary Energy] and develop [Specific Quality].'",
      "Offer the practice with genuine sincerity and humility."
    ]
  },
  {
    stepNumber: 4,
    title: "Main Japa Repetition (108 Beads)",
    duration: "10–15 Minutes",
    instructions: [
      "Hold 108-bead mala in right hand draped over middle finger; use thumb to rotate beads inward.",
      "Never touch mala with index finger (ego finger).",
      "Do NOT cross the main Sumeru (Guru) bead — reverse direction if doing multiple rounds.",
      "Chant at steady pace ensuring clear pronunciation of every syllable."
    ]
  },
  {
    stepNumber: 5,
    title: "Closing Dedication & Triple Shanti",
    duration: "1 Minute",
    instructions: [
      "Chant 'Om Shantihi Shantihi Shantihi' 3 times.",
      "Offer merit of practice to all beings so ego does not claim the energy."
    ]
  },
  {
    stepNumber: 6,
    title: "Silent Integration (CRITICAL)",
    duration: "5–10 Minutes",
    instructions: [
      "Sit in absolute silence with closed eyes post-Japa.",
      "Allow acoustic vibration to settle deep into nervous system and subconscious layers.",
      "This post-Japa stillness is when primary vibrational entrainment takes place."
    ]
  }
];
