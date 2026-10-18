// src/data/numerologyCoreEngine.ts
// Complete Numerology Core Calculations: Driver Number, Conductor Number, Kua Number, and Systems Mapping

export interface DriverNumberAdditionalInsights {
  bestDailyPractice: string;
  luckyDays: string;
  luckyColors: string;
  compatibleDriverNumbers: string;
  watchOutNumbers: string;
  dailyLifeLesson: string;
}

export interface SingleNumberAnalysis {
  number: number;
  rulingPlanet: string;
  appliesToBirthDates: string;
  lord: string;
  sunSign: string;
  element: string;
  auspiciousHora: string;
  isMasterNumber?: boolean;
  isKarmicDebt?: boolean;
  karmicDebtCode?: string;
  systems: {
    chaldean: string;
    vedic: string;
    pythagorean: string;
    chinese: string;
  };
  personality: string;
  asWife: string;
  asHusband: string;
  health: string;
  relationships: string;
  strengths: string[];
  drawbacks: string[];
  goodQualities: string[];
  negativeTraits: string[];
  professionsCareer: string;
  career: string[];
  finance: string;
  spiritualGuidance: string;
  additionalInsights: DriverNumberAdditionalInsights;
}

export const DRIVER_NUMBER_REPORT_META = {
  title: "Numerology Driver Number Reports (1–9)",
  subtitle: "Detailed Client-Facing Content for Website Feed",
  intro: "Driver Number (Mulank) is derived by reducing the birth date (day of month only) to a single digit — e.g., 5, 14, 23 all carry Driver Number 5. This governs your core, day-to-day personality — how you naturally think, react, and present yourself to the world, distinct from your Life Path/Destiny Number (calculated from the full date of birth), which governs your broader life journey. Keep the disclaimer footer active across all reports: \"This report is for self-awareness and guidance purposes only and is not a substitute for professional medical, legal, or financial advice.\"",
  disclaimer: "This report is for self-awareness and guidance purposes only and is not a substitute for professional medical, legal, or financial advice."
};

export interface KuaNumberResult {
  kuaNumber: number;
  element: string;
  trigram: string;
  group: "East Group" | "West Group";
  auspiciousDirections: {
    shengChi: string; // Wealth & Success
    tienYai: string;  // Health
    nienYen: string;  // Love & Relationships
    fuWei: string;    // Personal Growth
  };
  inauspiciousDirections: {
    hoHai: string;    // Obstacles
    wuKwei: string;   // Five Ghosts / Conflict
    liuSha: string;   // Six Killings
    jueMing: string;  // Total Loss
  };
  suggestions: string[];
}

/**
 * Calculate Driver Number (Mulank) from Birth Date (1-31)
 */
export function calculateDriverNumber(dob: string): {
  driver: number;
  unreducedDay: number;
  isMasterNumber: boolean;
  isKarmicDebt: boolean;
  karmicCode: string | null;
} {
  const parts = dob.split("-");
  const day = parseInt(parts[2] || "15", 10);

  let isMasterNumber = false;
  let isKarmicDebt = false;
  let karmicCode: string | null = null;

  if (day === 11 || day === 22) {
    isMasterNumber = true;
  }

  if (day === 13 || day === 14 || day === 16 || day === 19) {
    isKarmicDebt = true;
    karmicCode = `Karmic Debt ${day}`;
  }

  let driver = day;
  while (driver > 9) {
    driver = String(driver).split("").map(Number).reduce((a, b) => a + b, 0);
  }

  return { driver, unreducedDay: day, isMasterNumber, isKarmicDebt, karmicCode };
}

/**
 * Calculate Conductor Number (Bhagyank) from Full Date of Birth
 */
export function calculateConductorNumber(dob: string): {
  conductor: number;
  fullSum: number;
} {
  const digits = dob.replace(/[^0-9]/g, "").split("").map(Number);
  const fullSum = digits.reduce((a, b) => a + b, 0);

  let conductor = fullSum;
  while (conductor > 9) {
    conductor = String(conductor).split("").map(Number).reduce((a, b) => a + b, 0);
  }

  return { conductor, fullSum };
}

/**
 * Single Number Detailed Dictionary (1 to 9) - Driver Number Reports
 */
export const NUMBER_ANALYSIS_DATABASE: Record<number, SingleNumberAnalysis> = {
  1: {
    number: 1,
    rulingPlanet: "Sun",
    appliesToBirthDates: "1, 10, 19, 28",
    lord: "Surya Deva",
    sunSign: "Leo (Simha)",
    element: "Fire (Agni)",
    auspiciousHora: "Sun Hora (Sunrise & Midday)",
    systems: {
      chaldean: "Independent leadership, original creation, authority, and kingly vigor.",
      vedic: "Surya energy, high self-esteem, administrative power, and dharmic illumination.",
      pythagorean: "Pioneer, initiator, self-reliant individualist, and trail blazer.",
      chinese: "Yang Wood / Yang Fire, represents the Emperor and strong vitality."
    },
    personality: "Your Driver Number reveals the Sun's imprint on your everyday personality — the \"you\" that shows up in a meeting, at home, or meeting someone new. You carry yourself with quiet (or not-so-quiet) authority, and you have an instinctive need to be the one steering the ship rather than being steered. You are decisive, self-assured, and allergic to micromanagement. In daily interactions, you speak with conviction, even when you're still working things out internally — certainty is simply how you process the world.",
    asWife: "In daily married life, you take initiative — you're the one who calls the electrician, plans the finances, or makes the decision when no one else will. You run your household with a clear sense of direction. Day-to-day, your challenge is remembering to check in with your husband before acting rather than after — small daily decisions made unilaterally, even well-intentioned ones, can quietly erode a sense of shared ownership over time.",
    asHusband: "Day-to-day, you take charge of practical matters instinctively — bills, decisions, direction — without waiting to be asked. Your family experiences you as capable and in control. Your daily-life growth edge is pausing to ask \"what do you think?\" before announcing \"here's what we're doing\" — a small shift that transforms your household from a place you run into a place you build together.",
    health: "On a daily basis, your Driver Number 1 energy shows up as high stamina and quick recovery — but also a tendency to push through fatigue rather than acknowledging it. Watch daily patterns of skipped meals, skipped rest, or ignoring early stress signals (tension headaches, irritability) since these compound into the Sun-related vulnerabilities (heart, blood pressure, eyes) over time.",
    relationships: "In everyday interactions, people read you as confident and capable, someone who takes charge naturally in group settings — you're often the default decision-maker even in casual situations like planning a dinner or a trip. Day-to-day, be mindful that not everyone wants to be led; some just want to be asked.",
    strengths: [
      "Instinctive daily leadership and initiative-taking",
      "Quick, confident decision-making under everyday pressure",
      "Strong follow-through once a course of action is set",
      "Natural ability to organize chaos into a plan",
      "Consistent self-motivation without needing external push"
    ],
    drawbacks: [
      "Daily impatience with slower decision-makers around you",
      "Difficulty asking \"what do you think?\" before acting",
      "Tendency to dominate everyday conversations",
      "Overriding others' small preferences without noticing",
      "Resistance to daily routines set by someone else"
    ],
    goodQualities: [
      "Instinctive daily leadership and initiative-taking",
      "Quick, confident decision-making under everyday pressure",
      "Strong follow-through once a course of action is set",
      "Natural ability to organize chaos into a plan",
      "Consistent self-motivation without needing external push"
    ],
    negativeTraits: [
      "Daily impatience with slower decision-makers around you",
      "Difficulty asking \"what do you think?\" before acting",
      "Tendency to dominate everyday conversations",
      "Overriding others' small preferences without noticing",
      "Resistance to daily routines set by someone else"
    ],
    professionsCareer: "Day-to-day work satisfaction for you depends heavily on autonomy — even within a larger organization, you need ownership over how your daily tasks get done. You perform best in roles with clear individual accountability: sales targets, project ownership, independent business units, or your own venture.",
    career: [
      "Individual Accountability Roles",
      "Project Ownership & Management",
      "Sales Targets & Executive Direction",
      "Independent Business Units",
      "Entrepreneurship & Own Venture"
    ],
    finance: "Your daily money habits lean toward decisive, sometimes fast action — quick to invest, quick to spend on things you believe will pay off. Building in a personal 24-hour rule before non-essential purchases channels your natural decisiveness productively.",
    spiritualGuidance: "Your daily spiritual practice benefits most from moments of intentional pause — even five minutes each morning before the day's momentum takes over. Sun salutations at sunrise, or a brief gratitude practice before diving into your day, help ground your naturally fast-moving energy.",
    additionalInsights: {
      bestDailyPractice: "Morning quiet time before checking messages/emails",
      luckyDays: "Sunday, Monday",
      luckyColors: "Gold, Orange",
      compatibleDriverNumbers: "1, 2, 3, 9",
      watchOutNumbers: "8",
      dailyLifeLesson: "Pausing to ask before acting."
    }
  },
  2: {
    number: 2,
    rulingPlanet: "Moon",
    appliesToBirthDates: "2, 11, 20, 29",
    lord: "Chandra Deva",
    sunSign: "Cancer (Karka)",
    element: "Water (Jal)",
    auspiciousHora: "Moon Hora & Evening Twilight",
    systems: {
      chaldean: "Sensitivity, diplomacy, imaginative grace, and intuitive partnership.",
      vedic: "Chandra vibration, emotional intelligence, peacemaker, and gentle aura.",
      pythagorean: "Cooperation, balance, empathy, and artistic rhythm.",
      chinese: "Yin Water / Yin Earth, represents intuition, motherly care, and adaptability."
    },
    personality: "Your Driver Number reveals the Moon's daily rhythm running through your personality — you are the one who senses the mood in a room the moment you walk in, often before anyone says a word. Day-to-day, you operate on emotional intuition as much as logic. You're gentle, thoughtful, and instinctively considerate in how you speak and act toward others, adjusting your tone and approach based on what you sense others need.",
    asWife: "Daily life with you is emotionally attuned — you notice the small shifts in your husband's mood over breakfast, remember the little things that matter to him, and create a home atmosphere that feels genuinely caring. Your daily challenge is voicing your own needs as readily as you notice his; the habit of quietly accommodating can build unspoken resentment if it becomes one-directional.",
    asHusband: "Day-to-day, you're unusually observant of your wife's emotional state — you notice when something's off before she's said anything. You bring gentleness and genuine care into daily interactions. Your growth area is daily decisiveness — small household decisions can stall while you consider everyone's feelings; sometimes a quick, kind decision serves the family better than prolonged deliberation.",
    health: "Your day-to-day health is closely tied to your emotional state — a stressful conversation or unresolved tension can show up as a stomach ache or restless sleep that same night. Daily emotional check-ins with yourself (even just noticing \"how am I actually feeling today?\") function as preventive health care for you specifically.",
    relationships: "In everyday settings, you're the person people naturally confide in — something about your presence signals safety. Day-to-day, watch for absorbing other people's moods as your own; you may leave a casual conversation carrying stress that was never actually yours.",
    strengths: [
      "Daily emotional intelligence and intuitive reading of others",
      "Natural diplomacy in everyday disagreements",
      "Genuine, consistent thoughtfulness in small gestures",
      "Strong daily listening skills",
      "Creates calm, harmonious daily environments"
    ],
    drawbacks: [
      "Daily mood fluctuations affecting productivity or interactions",
      "Difficulty voicing personal needs in everyday moments",
      "Overthinking small daily interactions",
      "Conflict avoidance in routine disagreements",
      "Absorbing others' daily stress as your own"
    ],
    goodQualities: [
      "Daily emotional intelligence and intuitive reading of others",
      "Natural diplomacy in everyday disagreements",
      "Genuine, consistent thoughtfulness in small gestures",
      "Strong daily listening skills",
      "Creates calm, harmonious daily environments"
    ],
    negativeTraits: [
      "Daily mood fluctuations affecting productivity or interactions",
      "Difficulty voicing personal needs in everyday moments",
      "Overthinking small daily interactions",
      "Conflict avoidance in routine disagreements",
      "Absorbing others' daily stress as your own"
    ],
    professionsCareer: "Your daily work satisfaction depends on a collaborative, emotionally healthy environment — you do your best work in supportive teams, not high-conflict or highly competitive daily settings. Roles involving daily one-on-one interaction (counseling, care work, client relations) suit your natural rhythm well.",
    career: [
      "Counseling & Psychotherapy",
      "Care Work & Healthcare",
      "Client Relations & Account Management",
      "Diplomacy & Conflict Mediation",
      "Supportive Team Collaborations"
    ],
    finance: "Your daily spending habits are often emotionally driven — a hard day might trigger comfort spending. Tracking daily spending against mood (a simple notes app entry) helps you notice and interrupt this pattern before it becomes a habit.",
    spiritualGuidance: "A daily practice of emotional release — journaling for five minutes each evening, or simply naming your feelings out loud — helps prevent the buildup of absorbed stress. Moon-phase awareness and a consistent bedtime ritual support your naturally fluctuating daily energy.",
    additionalInsights: {
      bestDailyPractice: "Evening journaling to release absorbed emotions",
      luckyDays: "Monday, Friday",
      luckyColors: "White, Silver",
      compatibleDriverNumbers: "2, 4, 7, 9",
      watchOutNumbers: "1, 8",
      dailyLifeLesson: "Naming your own needs as clearly as you sense others'."
    }
  },
  3: {
    number: 3,
    rulingPlanet: "Jupiter",
    appliesToBirthDates: "3, 12, 21, 30",
    lord: "Guru Brihaspati",
    sunSign: "Sagittarius & Pisces (Dhanu & Meena)",
    element: "Ether / Space (Akash)",
    auspiciousHora: "Jupiter Hora (Morning)",
    systems: {
      chaldean: "Wisdom, expansion, optimism, public speaking, and spiritual counseling.",
      vedic: "Guru energy, divine grace, higher education, morality, and financial luck.",
      pythagorean: "Creative expression, joy of living, social magnetism, and eloquence.",
      chinese: "Yang Wood / Fire, represents growth, scholars, and auspicious blessings."
    },
    personality: "Your Driver Number reveals Jupiter's expressive, optimistic energy running through your everyday personality. Day-to-day, you're the one who lightens the mood, has something interesting to say, and genuinely enjoys connecting with people you meet in passing. You process life out loud — talking things through helps you think, and you naturally gravitate toward sharing ideas, stories, and encouragement in daily interactions, often without even trying.",
    asWife: "Daily life with you has warmth and humor woven through it — even ordinary days feel a little lighter because of how you show up. You naturally offer encouragement and perspective when your husband has a hard day. Your daily challenge is knowing when to simply listen rather than immediately offering advice or a silver lining — sometimes he just needs you to sit with him in the difficulty for a moment first.",
    asHusband: "Day-to-day, you bring humor and encouragement into family life, genuinely invested in your wife's daily wins and struggles. Your growth area is daily follow-through on small commitments — your optimistic, big-picture nature sometimes lets small practical details (the errand, the form, the appointment) slip through the cracks.",
    health: "Your daily habits around food and socializing directly affect your Jupiter-linked vulnerabilities (liver, weight) — celebratory or social eating happens often for you, given how much of your day revolves around people and connection. Building moderate, consistent daily habits (rather than occasional strict resets) suits your nature far better.",
    relationships: "In daily life, you build rapport almost instantly — the barista, the new colleague, the neighbor — everyone gets a bit of your natural warmth. Watch for spreading your social energy thin across many daily interactions at the expense of deeper investment in your closest relationships.",
    strengths: [
      "Natural daily optimism that's contagious to those around you",
      "Quick, engaging communication in everyday interactions",
      "Genuine daily encouragement and support for others",
      "Creative problem-solving brought into routine tasks",
      "Ability to make ordinary days feel lighter"
    ],
    drawbacks: [
      "Daily overcommitment — saying yes to too much",
      "Small follow-through gaps on practical daily tasks",
      "Talking over listening in everyday conversations",
      "Scattered daily focus across too many interests",
      "Avoiding difficult daily conversations with humor/deflection"
    ],
    goodQualities: [
      "Natural daily optimism that's contagious to those around you",
      "Quick, engaging communication in everyday interactions",
      "Genuine daily encouragement and support for others",
      "Creative problem-solving brought into routine tasks",
      "Ability to make ordinary days feel lighter"
    ],
    negativeTraits: [
      "Daily overcommitment — saying yes to too much",
      "Small follow-through gaps on practical daily tasks",
      "Talking over listening in everyday conversations",
      "Scattered daily focus across too many interests",
      "Avoiding difficult daily conversations with humor/deflection"
    ],
    professionsCareer: "Your daily work rhythm needs variety and people-contact to stay energized — repetitive solo tasks with no interaction drain you quickly. Roles with daily communication, teaching, or creative expression keep your Jupiter energy engaged and productive.",
    career: [
      "Daily Communication & Media",
      "Teaching, Mentoring & Academia",
      "Creative Expression & Writing",
      "Public Speaking & Counseling",
      "Advisory & Consulting Services"
    ],
    finance: "Daily small purchases (coffee, lunches out, spontaneous treats for others) add up more than you realize, given how social your day-to-day spending pattern tends to be. A simple daily spending cap, tracked loosely rather than rigidly, works better for you than strict budgeting.",
    spiritualGuidance: "A short daily practice of quiet reflection — even five minutes without conversation or stimulation — balances your naturally expressive, outward daily energy. Gratitude practices done consistently (not just when things are going well) deepen your natural optimism into something more resilient.",
    additionalInsights: {
      bestDailyPractice: "Five minutes of quiet reflection before starting the day",
      luckyDays: "Thursday, Sunday",
      luckyColors: "Yellow, Gold",
      compatibleDriverNumbers: "1, 3, 6, 9",
      watchOutNumbers: "4, 8",
      dailyLifeLesson: "Listening as much as you express."
    }
  },
  4: {
    number: 4,
    rulingPlanet: "Rahu",
    appliesToBirthDates: "4, 13, 22, 31",
    lord: "Rahu Deva",
    sunSign: "Aquarius (Kumbha)",
    element: "Air / Earth (Vayu/Prithvi)",
    auspiciousHora: "Rahu Horizon / Mercury-Saturn Hora",
    systems: {
      chaldean: "Sudden sudden changes, unconventional genius, practical structure, and rebellion.",
      vedic: "Rahu vibration, out-of-box thinking, technical acumen, and unexpected fortune.",
      pythagorean: "Foundation, discipline, hard work, order, and practical manifestation.",
      chinese: "Yin Metal / Earth, represents solid foundation and mechanical precision."
    },
    personality: "Your Driver Number reveals Rahu's disciplined, structured energy running through your everyday personality. Day-to-day, you operate on routine and method — you like knowing what's expected and doing it thoroughly. You're practical in how you approach even small daily decisions, weighing them carefully rather than acting on impulse. There's also a quieter, more unconventional streak beneath your methodical surface — you may follow routine, but you rarely follow the crowd's reasoning for it.",
    asWife: "Daily life with you runs smoothly and reliably — bills are paid on time, routines are maintained, responsibilities are handled without drama. Your husband can count on consistency from you. Your daily challenge is flexibility; when plans change unexpectedly, your instinct is mild resistance rather than easy adaptation — practicing \"okay, let's adjust\" instead of \"but that's not the plan\" softens daily friction.",
    asHusband: "Day-to-day, you're the dependable one — errands run, maintenance handled, routines upheld without needing reminders. Your family experiences real stability because of your consistency. Your growth area is spontaneity; occasionally breaking your own routine for something purely fun or unplanned shows your family that structure doesn't have to mean rigidity.",
    health: "Your daily habits benefit enormously from routine — consistent sleep and meal times genuinely serve your Rahu-linked nervous system and joint health. However, watch for daily tension building silently since you tend to push through discomfort rather than pausing; small daily stretches or brief movement breaks prevent this from accumulating.",
    relationships: "In daily interactions, people learn quickly that you mean what you say and follow through — this builds deep trust over time, even if you're not the most immediately warm or expressive presence day-to-day. Your consistency, more than grand gestures, is what makes people feel secure around you.",
    strengths: [
      "Reliable daily follow-through on commitments",
      "Practical, methodical approach to everyday problems",
      "Strong daily work ethic without needing external motivation",
      "Original thinking within a structured daily approach",
      "Steady, calming presence in routine interactions"
    ],
    drawbacks: [
      "Resistance to unexpected daily changes in plans",
      "Difficulty relaxing during \"unstructured\" time",
      "Can seem rigid or overly serious in casual daily interactions",
      "Suppressing daily stress rather than addressing it",
      "Bluntness in everyday communication"
    ],
    goodQualities: [
      "Reliable daily follow-through on commitments",
      "Practical, methodical approach to everyday problems",
      "Strong daily work ethic without needing external motivation",
      "Original thinking within a structured daily approach",
      "Steady, calming presence in routine interactions"
    ],
    negativeTraits: [
      "Resistance to unexpected daily changes in plans",
      "Difficulty relaxing during \"unstructured\" time",
      "Can seem rigid or overly serious in casual daily interactions",
      "Suppressing daily stress rather than addressing it",
      "Bluntness in everyday communication"
    ],
    professionsCareer: "Your daily work satisfaction depends on clear structure and tangible, methodical progress — you thrive with defined daily tasks and measurable output. Roles in engineering, operations, accounting, or systems management suit your consistent, detail-oriented daily approach.",
    career: [
      "Engineering & Systems Architecture",
      "Operations & Logistics Management",
      "Accounting & Financial Auditing",
      "Systems Management & IT Operations",
      "Infrastructure & Technical Planning"
    ],
    finance: "Your daily financial habits are naturally disciplined — you track spending, avoid unnecessary daily purchases, and prioritize saving. Your risk is being so consistently frugal day-to-day that you miss worthwhile opportunities requiring some flexibility.",
    spiritualGuidance: "A consistent, structured daily spiritual practice — the same time, same format, every day — suits you far more than sporadic, free-form spirituality. Even five minutes of daily grounding (breathwork, a fixed short meditation) compounds meaningfully over time for your steady nature.",
    additionalInsights: {
      bestDailyPractice: "Fixed-time daily meditation or breathwork",
      luckyDays: "Sunday, Saturday",
      luckyColors: "Grey, Electric Blue",
      compatibleDriverNumbers: "1, 2, 5, 6",
      watchOutNumbers: "9",
      dailyLifeLesson: "Allowing flexibility within your daily structure."
    }
  },
  5: {
    number: 5,
    rulingPlanet: "Mercury",
    appliesToBirthDates: "5, 14, 23",
    lord: "Budha Deva",
    sunSign: "Gemini & Virgo (Mithuna & Kanya)",
    element: "Air (Vayu)",
    auspiciousHora: "Mercury Hora (Dawn & Dusk)",
    systems: {
      chaldean: "Adaptability, speed, commercial genius, networking, and versatile intellect.",
      vedic: "Budha energy, quick wits, trade mastery, mathematics, and youthful charm.",
      pythagorean: "Freedom, adventure, versatility, sensory experience, and progress.",
      chinese: "Yang Water / Metal, represents commerce, movement, and quick intelligence."
    },
    personality: "Your Driver Number reveals Mercury's quick, adaptable energy running through your everyday personality. Day-to-day, your mind moves fast — you get bored with repetition quickly and naturally seek variety in even small daily choices (a different route to work, a new lunch spot). You're witty and communicative in daily interactions, quick to pick up on what's happening around you and quick to respond.",
    asWife: "Daily life with you is rarely predictable — you bring spontaneity into ordinary routines, suggesting a last-minute outing or switching up the weekly plan. Your husband likely never feels bored day-to-day. Your challenge is daily consistency in small commitments — routine tasks (specific chores, regular check-ins) can feel confining, so setting light daily reminders helps bridge the gap between your nature and practical household needs.",
    asHusband: "Day-to-day, you keep things interesting and adapt quickly to whatever comes up — a schedule change, an unexpected guest, a shift in plans doesn't rattle you the way it might others. Your growth area is daily follow-through on routine domestic responsibilities; your quick-moving mind benefits from simple daily systems (a shared list, a set reminder) to catch what your instinct might otherwise skip.",
    health: "Your daily nervous system is highly active — mental restlessness is your most common daily experience, and it can show up as difficulty winding down at night. Daily movement (even a short walk) and variety in your routine actually calm you more than trying to force stillness.",
    relationships: "In daily interactions, you're quick, engaging, and genuinely curious about the people you talk to — casual conversations with you rarely stay surface-level for long. Watch for daily restlessness translating into distraction during conversations that matter — put the phone down, stay in the moment.",
    strengths: [
      "Quick daily adaptability to changing circumstances",
      "Sharp, witty communication in everyday interactions",
      "Natural curiosity that keeps daily life interesting",
      "Resourceful daily problem-solving",
      "Genuine charm in casual, everyday settings"
    ],
    drawbacks: [
      "Daily restlessness and difficulty with routine",
      "Distractibility during everyday conversations",
      "Impulsive daily decisions made out of boredom",
      "Inconsistency in small daily commitments",
      "Difficulty sitting still even during downtime"
    ],
    goodQualities: [
      "Quick daily adaptability to changing circumstances",
      "Sharp, witty communication in everyday interactions",
      "Natural curiosity that keeps daily life interesting",
      "Resourceful daily problem-solving",
      "Genuine charm in casual, everyday settings"
    ],
    negativeTraits: [
      "Daily restlessness and difficulty with routine",
      "Distractibility during everyday conversations",
      "Impulsive daily decisions made out of boredom",
      "Inconsistency in small daily commitments",
      "Difficulty sitting still even during downtime"
    ],
    professionsCareer: "Your daily work rhythm needs variety and stimulation — the same task repeated identically every day will frustrate you quickly regardless of the role's overall appeal. Roles with daily variation (sales, media, travel-related work, multi-project environments) keep you naturally engaged.",
    career: [
      "Sales & Commercial Trading",
      "Media, Journalism & PR",
      "Travel-Related Work & Hospitality",
      "Multi-Project Agile Environments",
      "Digital Marketing & E-Commerce"
    ],
    finance: "Daily small, impulsive purchases (an app, a snack, a spontaneous online order) are your most common financial leak. A simple daily \"24-hour cart rule\" for non-essential purchases channels your quick-decision nature productively.",
    spiritualGuidance: "A brief daily mindfulness practice — even two or three minutes — specifically counters your naturally restless daily mind, and the challenge itself is part of the growth. Daily journaling, done quickly and without overthinking, also channels your mental energy productively.",
    additionalInsights: {
      bestDailyPractice: "Two-minute mindfulness pause before big decisions",
      luckyDays: "Wednesday, Friday",
      luckyColors: "Green, Light Blue",
      compatibleDriverNumbers: "1, 3, 5, 6",
      watchOutNumbers: "4",
      dailyLifeLesson: "Finding calm within your natural love of variety."
    }
  },
  6: {
    number: 6,
    rulingPlanet: "Venus",
    appliesToBirthDates: "6, 15, 24",
    lord: "Shukra Deva",
    sunSign: "Taurus & Libra (Vrishabha & Tula)",
    element: "Water / Fire (Jal/Agni)",
    auspiciousHora: "Venus Hora (Twilight & Evening)",
    systems: {
      chaldean: "Luxury, harmony, artistic elegance, romance, and magnetic attraction.",
      vedic: "Shukracharya grace, beauty, opulence, domestic happiness, and healing arts.",
      pythagorean: "Responsibility, nurturing, domestic love, symmetry, and service.",
      chinese: "Yin Fire / Metal, represents beauty, luxury goods, and harmony."
    },
    personality: "Your Driver Number reveals Venus's warm, harmonizing energy running through your everyday personality. Day-to-day, you notice beauty and comfort — a well-arranged room, a thoughtful gesture, small aesthetic details others miss. You naturally care for people in small daily ways: remembering preferences, checking in, making sure everyone around you feels comfortable. Harmony in your immediate daily environment matters to you more than most people realize.",
    asWife: "Daily life with you is warm and attentive — you notice small things (his favorite meal, a stressful day written on his face) and respond with genuine care. You create a home that feels comfortable and loved in, day after day. Your daily challenge is over-giving in small ways that go unnoticed or unreciprocated; periodically naming what you need, rather than just quietly providing, keeps the daily give-and-take balanced.",
    asHusband: "Day-to-day, you're attentive to your wife's comfort and mood, offering small gestures of care consistently rather than only on special occasions. Your growth area is daily boundary-setting — your instinct to smooth things over and keep the peace can mean your own preferences quietly go unspoken in routine decisions.",
    health: "Your daily emotional state directly affects your Venus-linked vulnerabilities (hormonal balance, skin, kidneys) — tension in a close relationship shows up in your body faster than you'd expect. Daily self-care rituals, even small ones (skincare routine, a few minutes of quiet), are genuinely protective, not indulgent, for you.",
    relationships: "In daily interactions, you're the one who remembers birthdays, notices when someone seems off, and makes casual gatherings feel warmer just by being there. Watch for consistently prioritizing others' daily comfort over your own — small, regular acts of self-care prevent this from becoming depletion.",
    strengths: [
      "Genuine daily warmth and attentiveness to others",
      "Natural eye for creating comfortable, harmonious spaces",
      "Consistent small gestures of care",
      "Strong daily diplomatic instincts",
      "Generosity woven into everyday interactions"
    ],
    drawbacks: [
      "Daily over-giving without reciprocal balance",
      "Difficulty stating personal preferences in routine decisions",
      "People-pleasing in small, everyday interactions",
      "Sensitivity to daily criticism or perceived slights",
      "Avoiding necessary daily confrontations to preserve harmony"
    ],
    goodQualities: [
      "Genuine daily warmth and attentiveness to others",
      "Natural eye for creating comfortable, harmonious spaces",
      "Consistent small gestures of care",
      "Strong daily diplomatic instincts",
      "Generosity woven into everyday interactions"
    ],
    negativeTraits: [
      "Daily over-giving without reciprocal balance",
      "Difficulty stating personal preferences in routine decisions",
      "People-pleasing in small, everyday interactions",
      "Sensitivity to daily criticism or perceived slights",
      "Avoiding necessary daily confrontations to preserve harmony"
    ],
    professionsCareer: "Your daily work satisfaction comes from people-centered, aesthetically engaged environments — client-facing roles, design, hospitality, or caregiving professions where your daily attentiveness is genuinely valued and visible.",
    career: [
      "Design & Aesthetics (Interior/Fashion)",
      "Hospitality & Luxury Services",
      "Client-Facing Advisory & Public Care",
      "Caregiving Professions & Healing Arts",
      "Wellness & Aesthetic Industries"
    ],
    finance: "Your daily spending often goes toward small comforts and gestures for others — a treat for a friend, something nice for the home. Setting a small, guilt-free daily/weekly generosity budget lets you give freely within a boundary that protects your overall finances.",
    spiritualGuidance: "A daily practice of self-directed care — treating yourself with the same attentiveness you give others, even in small five-minute ways — is a genuine spiritual practice for you, not indulgence. Gratitude journaling that specifically includes things you did for yourself reinforces this balance.",
    additionalInsights: {
      bestDailyPractice: "A daily five-minute self-care ritual, non-negotiable",
      luckyDays: "Friday, Monday",
      luckyColors: "Pink, White",
      compatibleDriverNumbers: "3, 6, 9",
      watchOutNumbers: "4, 5",
      dailyLifeLesson: "Including yourself in your daily care for others."
    }
  },
  7: {
    number: 7,
    rulingPlanet: "Ketu",
    appliesToBirthDates: "7, 16, 25",
    lord: "Ketu Deva",
    sunSign: "Pisces & Scorpio (Meena & Vrischika)",
    element: "Water / Ether (Jal/Akash)",
    auspiciousHora: "Ketu Horizon / Jupiter-Moon Hora",
    systems: {
      chaldean: "Mysticism, deep research, analytical introspection, intuition, and spiritual detachment.",
      vedic: "Ketu vibration, moksha seeker, occult science, psychic ability, and analytical depth.",
      pythagorean: "Seeker of truth, analyst, spiritual philosopher, and quiet scholar.",
      chinese: "Yin Metal / Water, represents deep oceans, hidden wisdom, and meditation."
    },
    personality: "Your Driver Number reveals Ketu's introspective, contemplative energy running through your everyday personality. Day-to-day, you need moments of solitude to function well — even a genuinely enjoyable social day leaves you needing quiet time to recharge afterward. You observe more than you speak in casual daily settings, processing situations internally before (or instead of) commenting on them. There's a natural depth to how you experience even ordinary days.",
    asWife: "Daily life with you has a quiet depth — you're present and engaged, but not in a constantly chatty way; your husband learns to read your quieter forms of connection and care. Your daily challenge is that your instinct to withdraw when something's bothering you can leave him unsure what's wrong. A simple daily habit — even just saying \"I need some quiet time, I'll talk soon\" — prevents silence from being misread as distance.",
    asHusband: "Day-to-day, you're thoughtful and considered in how you engage with your family, rarely reactive or impulsive in daily decisions. Your growth area is proactively sharing what's on your mind rather than waiting to be asked — your wife benefits from small, regular updates on your inner world, even brief ones.",
    health: "Your daily nervous system needs regular quiet time as genuine maintenance, not luxury — skipping this because a day is \"too busy\" compounds stress in ways that show up later as fatigue or vague physical discomfort. Daily solitude, even just 10-15 minutes, is a real health practice for you.",
    relationships: "In daily interactions, you're selective about depth — you'll happily have brief pleasant exchanges with many people but reserve real conversation for a trusted few. People who know you well learn to value your quieter, more occasional check-ins as genuinely meaningful rather than expecting constant contact.",
    strengths: [
      "Daily depth of thought and genuine perceptiveness",
      "Ability to process situations calmly rather than reactively",
      "Natural daily independence and self-sufficiency",
      "Strong daily focus during solitary work",
      "Authentic, unhurried presence in the interactions you do have"
    ],
    drawbacks: [
      "Daily withdrawal that can be misread as distance",
      "Overthinking routine daily interactions",
      "Difficulty with unplanned social demands",
      "Reluctance to share daily struggles even with close people",
      "Can seem emotionally unavailable in fast-paced daily settings"
    ],
    goodQualities: [
      "Daily depth of thought and genuine perceptiveness",
      "Ability to process situations calmly rather than reactively",
      "Natural daily independence and self-sufficiency",
      "Strong daily focus during solitary work",
      "Authentic, unhurried presence in the interactions you do have"
    ],
    negativeTraits: [
      "Daily withdrawal that can be misread as distance",
      "Overthinking routine daily interactions",
      "Difficulty with unplanned social demands",
      "Reluctance to share daily struggles even with close people",
      "Can seem emotionally unavailable in fast-paced daily settings"
    ],
    professionsCareer: "Your daily work rhythm needs blocks of uninterrupted, independent time — constant meetings or collaborative daily demands drain you quickly. Research, analysis, writing, and specialist roles that reward daily deep focus suit you particularly well.",
    career: [
      "Research & Scientific Analysis",
      "Specialist & Independent Technical Roles",
      "Writing, Philosophy & Publishing",
      "Data Science & Cryptography",
      "Spiritual & Esoteric Arts Studies"
    ],
    finance: "Your daily financial habits tend toward caution and minimalism — you're not driven by daily impulse spending, but you may also under-engage with routine financial planning simply because it doesn't hold your interest. A simple, largely automated daily/monthly system reduces the need for ongoing active attention.",
    spiritualGuidance: "Daily solitude isn't optional self-indulgence for you — it's essential spiritual maintenance. A consistent daily practice (meditation, quiet walks, journaling) protects your wellbeing and deepens the natural introspective gift this Driver Number carries.",
    additionalInsights: {
      bestDailyPractice: "10–15 minutes of protected daily solitude",
      luckyDays: "Monday, Thursday",
      luckyColors: "Sea Green, Lavender",
      compatibleDriverNumbers: "1, 2, 5, 7",
      watchOutNumbers: "8",
      dailyLifeLesson: "Sharing your inner world in small, regular ways."
    }
  },
  8: {
    number: 8,
    rulingPlanet: "Saturn",
    appliesToBirthDates: "8, 17, 26",
    lord: "Shani Deva",
    sunSign: "Capricorn & Aquarius (Makar & Kumbha)",
    element: "Earth (Prithvi)",
    auspiciousHora: "Saturn Hora (Sunset & Saturday)",
    systems: {
      chaldean: "Karmic justice, material mastery, endurance, trial before triumph, and solid legacy.",
      vedic: "Shani Deva energy, perseverance, justice, discipline, and late but unshakeable success.",
      pythagorean: "Executive power, wealth building, authority, organization, and cause-and-effect.",
      chinese: "Yang Earth / Metal, represents mountain stability and supreme wealth accumulation."
    },
    personality: "Your Driver Number reveals Saturn's serious, disciplined energy running through your everyday personality. Day-to-day, you approach tasks with real seriousness — even small responsibilities get your full follow-through. You're practical, focused, and naturally think in terms of long-term consequences, even for everyday decisions. There's a quiet weight to how you carry yourself, a sense that you take life, and your role in it, genuinely seriously.",
    asWife: "Daily life with you is capable and grounded — things get done, responsibilities are handled, and your husband can rely on your consistency without having to check in. Your daily challenge is warmth in routine moments; your practical, task-focused approach to daily life can overshadow small emotional check-ins. A daily habit of asking \"how are you, really?\" — not just about logistics — deepens the connection.",
    asHusband: "Day-to-day, you take your responsibilities seriously, handling practical matters without complaint and thinking ahead about your family's needs. Your growth area is daily emotional expressiveness — your focus on doing right by your family through action can leave your wife wanting more verbal affirmation in the ordinary moments, not just the big ones.",
    health: "Your daily habits benefit from consistent structure, but watch for pushing through daily discomfort or fatigue rather than acknowledging it — your Saturn-linked vulnerabilities (bones, joints) develop slowly, often from years of daily overexertion treated as normal. A daily stretch or brief movement practice protects you significantly over time.",
    relationships: "In daily interactions, you're not the most immediately warm presence, but your consistency and reliability build deep trust over time — people learn that when you say you'll do something, it happens. Your daily challenge is remembering that small warmth (a compliment, a check-in) matters as much as competence to the people around you.",
    strengths: [
      "Consistent daily discipline and follow-through",
      "Practical, level-headed approach to everyday problems",
      "Strong daily work ethic and reliability",
      "Long-term thinking applied to routine decisions",
      "Genuine dependability that builds deep trust over time"
    ],
    drawbacks: [
      "Daily seriousness that can come across as distant",
      "Difficulty with spontaneous, unstructured daily moments",
      "Overworking through daily fatigue",
      "Critical daily self-talk and high personal standards",
      "Underexpressing daily affection or appreciation verbally"
    ],
    goodQualities: [
      "Consistent daily discipline and follow-through",
      "Practical, level-headed approach to everyday problems",
      "Strong daily work ethic and reliability",
      "Long-term thinking applied to routine decisions",
      "Genuine dependability that builds deep trust over time"
    ],
    negativeTraits: [
      "Daily seriousness that can come across as distant",
      "Difficulty with spontaneous, unstructured daily moments",
      "Overworking through daily fatigue",
      "Critical daily self-talk and high personal standards",
      "Underexpressing daily affection or appreciation verbally"
    ],
    professionsCareer: "Your daily work satisfaction comes from structured environments with real accountability — you thrive with clear daily responsibilities and measurable, long-term progress. Management, finance, and operational roles suit your consistent, disciplined daily approach.",
    career: [
      "Corporate Management & Operations",
      "Financial Management & Control",
      "Legal, Judicial & Compliance Roles",
      "Heavy Infrastructure & Real Estate",
      "Strategic Long-term Governance"
    ],
    finance: "Your daily financial habits are naturally cautious and disciplined — tracking, saving, and avoiding unnecessary daily spending come easily to you. Your risk is excessive daily worry about financial security even when your actual position is stable; scheduled, not constant, financial check-ins serve you better.",
    spiritualGuidance: "A daily practice combining structure and softness — a consistent meditation routine paired with a small daily act of self-compassion — balances Saturn's naturally heavy energy. Practicing gratitude for small daily wins, not just major achievements, gradually lightens your characteristic seriousness.",
    additionalInsights: {
      bestDailyPractice: "Consistent daily meditation paired with one small self-compassion act",
      luckyDays: "Saturday, Friday",
      luckyColors: "Dark Blue, Black",
      compatibleDriverNumbers: "4, 6, 8",
      watchOutNumbers: "1, 2, 7",
      dailyLifeLesson: "Letting small daily warmth matter as much as daily competence."
    }
  },
  9: {
    number: 9,
    rulingPlanet: "Mars",
    appliesToBirthDates: "9, 18, 27",
    lord: "Mangal Deva / Lord Hanuman",
    sunSign: "Aries & Scorpio (Mesha & Vrischika)",
    element: "Fire (Agni)",
    auspiciousHora: "Mars Hora (Midday & Tuesday)",
    systems: {
      chaldean: "Warrior energy, courage, humanitarian drive, protection of weak, and dynamic force.",
      vedic: "Mangal Deva vibration, physical strength, competitive vigor, and righteous action.",
      pythagorean: "Universal humanitarian, completion, courage, passion, and artistic power.",
      chinese: "Yang Fire, represents military force, passion, and fiery accomplishment."
    },
    personality: "Your Driver Number reveals Mars's passionate, action-oriented energy running through your everyday personality. Day-to-day, you react quickly and decisively — hesitation isn't really in your nature. You feel things intensely, even in ordinary daily situations, and you're naturally protective of the people and principles you care about, ready to speak up or act the moment something feels unjust, even in small daily contexts.",
    asWife: "Daily life with you has real intensity and passion — you show up fully, whether that's fighting for something your family needs or simply loving with full energy day-to-day. Your daily challenge is managing quick reactions in small moments of friction; a brief pause before responding to minor daily irritations prevents unnecessary escalation over things that, in a day, won't matter much.",
    asHusband: "Day-to-day, you're protective and decisive, quick to act on your family's behalf without hesitation. Your growth area is patience during the ordinary, slower-paced moments of daily family life — not every situation needs urgent action, and learning to recognize which daily moments call for calm rather than intensity serves your family well.",
    health: "Your daily Mars-driven energy needs a physical outlet — without one, that intensity tends to surface as irritability or tension headaches rather than staying contained. Daily physical activity isn't optional stress relief for you; it's essential regulation for your naturally high-energy system.",
    relationships: "In daily interactions, you're direct and honest, sometimes more bluntly than intended — people always know where they stand with you, which many genuinely appreciate even when it stings momentarily. Watch for daily impatience translating into unnecessary sharpness during minor disagreements.",
    strengths: [
      "Daily courage and willingness to act decisively",
      "Genuine passion brought into everyday tasks and relationships",
      "Strong daily protective instincts toward loved ones",
      "Directness that builds trust through honesty",
      "High daily energy and motivation"
    ],
    drawbacks: [
      "Quick daily temper, especially under stress",
      "Impulsiveness in small daily decisions",
      "Difficulty with patience in slow-moving daily situations",
      "Can be unintentionally blunt in everyday communication",
      "Restlessness if daily routine feels too passive"
    ],
    goodQualities: [
      "Daily courage and willingness to act decisively",
      "Genuine passion brought into everyday tasks and relationships",
      "Strong daily protective instincts toward loved ones",
      "Directness that builds trust through honesty",
      "High daily energy and motivation"
    ],
    negativeTraits: [
      "Quick daily temper, especially under stress",
      "Impulsiveness in small daily decisions",
      "Difficulty with patience in slow-moving daily situations",
      "Can be unintentionally blunt in everyday communication",
      "Restlessness if daily routine feels too passive"
    ],
    professionsCareer: "Your daily work rhythm needs urgency, movement, and tangible impact — slow-moving, low-stakes daily tasks frustrate you quickly. Roles with clear daily stakes and the ability to act decisively (sales, emergency services, competitive fields, entrepreneurship) suit your natural energy.",
    career: [
      "Decisive Sales & Competitive Fields",
      "Emergency Services & Defense",
      "Entrepreneurship with Clear Stakes",
      "High-Impact Project Leadership",
      "Sports, Athletics & Dynamic Ventures"
    ],
    finance: "Your daily financial decisions can be impulsive, driven by in-the-moment conviction rather than careful planning. A simple personal rule — sleeping on any non-essential purchase over a set amount — channels your decisiveness productively without dampening it.",
    spiritualGuidance: "Daily physical release — even a short walk or brief exercise — is genuinely spiritual maintenance for your Mars-driven system, preventing built-up intensity from spilling into daily interactions. Pairing this with a brief daily practice of patience (a few minutes of stillness before reacting to anything) rounds out your naturally fast-moving energy.",
    additionalInsights: {
      bestDailyPractice: "Daily physical activity paired with a short patience/stillness practice",
      luckyDays: "Tuesday, Thursday",
      luckyColors: "Red, Coral",
      compatibleDriverNumbers: "1, 3, 6, 9",
      watchOutNumbers: "4",
      dailyLifeLesson: "Choosing calm in the small daily moments that don't need urgency."
    }
  }
};

/**
 * Calculate Tua / Kua Number (Feng Shui & Chinese Numerology)
 */
export function calculateKuaNumber(year: number, gender: "male" | "female"): KuaNumberResult {
  const lastTwo = year % 100;
  let kua = 0;

  if (year < 2000) {
    if (gender === "male") {
      kua = (100 - lastTwo) % 9;
    } else {
      kua = (lastTwo + 4) % 9;
    }
  } else {
    if (gender === "male") {
      kua = (9 - (year % 9)) || 9;
    } else {
      kua = ((year % 9) + 6) % 9 || 9;
    }
  }

  if (kua === 0) kua = 9;

  // In Feng Shui Kua system, male 5 converts to 2, female 5 converts to 8
  if (kua === 5) {
    kua = gender === "male" ? 2 : 8;
  }

  const isEastGroup = [1, 3, 4, 9].includes(kua);
  const group = isEastGroup ? "East Group" : "West Group";

  const KUA_LOOKUP: Record<number, { element: string; trigram: string; auspicious: any; inauspicious: any }> = {
    1: {
      element: "Water",
      trigram: "Kan (Water)",
      auspicious: { shengChi: "South-East", tienYai: "East", nienYen: "South", fuWei: "North" },
      inauspicious: { hoHai: "West", wuKwei: "North-East", liuSha: "North-West", jueMing: "South-West" }
    },
    2: {
      element: "Earth",
      trigram: "Kun (Earth)",
      auspicious: { shengChi: "North-East", tienYai: "West", nienYen: "North-West", fuWei: "South-West" },
      inauspicious: { hoHai: "East", wuKwei: "South-East", liuSha: "South", jueMing: "North" }
    },
    3: {
      element: "Hard Wood",
      trigram: "Zhen (Thunder)",
      auspicious: { shengChi: "South", tienYai: "North", nienYen: "South-East", fuWei: "East" },
      inauspicious: { hoHai: "South-West", wuKwei: "North-West", liuSha: "North-East", jueMing: "West" }
    },
    4: {
      element: "Soft Wood",
      trigram: "Xun (Wind)",
      auspicious: { shengChi: "North", tienYai: "South", nienYen: "East", fuWei: "South-East" },
      inauspicious: { hoHai: "North-West", wuKwei: "South-West", liuSha: "West", jueMing: "North-East" }
    },
    6: {
      element: "Hard Metal",
      trigram: "Qian (Heaven)",
      auspicious: { shengChi: "West", tienYai: "North-East", nienYen: "South-West", fuWei: "North-West" },
      inauspicious: { hoHai: "South-East", wuKwei: "East", liuSha: "North", jueMing: "South" }
    },
    7: {
      element: "Soft Metal",
      trigram: "Dui (Lake)",
      auspicious: { shengChi: "North-West", tienYai: "South-West", nienYen: "North-East", fuWei: "West" },
      inauspicious: { hoHai: "North", wuKwei: "South", liuSha: "South-East", jueMing: "East" }
    },
    8: {
      element: "Mountain Earth",
      trigram: "Gen (Mountain)",
      auspicious: { shengChi: "South-West", tienYai: "North-West", nienYen: "West", fuWei: "North-East" },
      inauspicious: { hoHai: "South", wuKwei: "North", liuSha: "East", jueMing: "South-East" }
    },
    9: {
      element: "Fire",
      trigram: "Li (Fire)",
      auspicious: { shengChi: "East", tienYai: "South-East", nienYen: "North", fuWei: "South" },
      inauspicious: { hoHai: "North-East", wuKwei: "West", liuSha: "South-West", jueMing: "North-West" }
    }
  };

  const lookup = KUA_LOOKUP[kua] || KUA_LOOKUP[1];

  return {
    kuaNumber: kua,
    element: lookup.element,
    trigram: lookup.trigram,
    group,
    auspiciousDirections: lookup.auspicious,
    inauspiciousDirections: lookup.inauspicious,
    suggestions: [
      `Face your Sheng Chi direction (${lookup.auspicious.shengChi}) while working or during critical business negotiations to maximize wealth.`,
      `Position your bed headboard toward your Tien Yai direction (${lookup.auspicious.tienYai}) for deep healing and physical vitality.`,
      `For harmonious marriage and social magnetism, align living room seating facing ${lookup.auspicious.nienYen}.`,
      `Avoid sleeping or placing main entrance facing your Jue Ming direction (${lookup.inauspicious.jueMing}) to prevent energy drain.`
    ]
  };
}
