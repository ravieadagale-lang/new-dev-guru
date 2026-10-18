// src/data/numerologyMasterKarmicEngine.ts
// Deep Master Numbers (11, 22, 33) & Karmic Debt Numbers (13/4, 14/5, 16/7, 19/1) Data Engine

export interface LifeStageManifestation {
  lifeStage: string;
  ageRange: string;
  manifestation: string;
  challenges: string;
}

export interface CompatibilityDynamic {
  partnerNumber: string;
  compatibilityLevel: string;
  dynamic: string;
  growthEdge: string;
}

export interface CareerDomainDetail {
  domain: string;
  naturalRole: string;
  signatureStrength: string;
  watchFor: string;
}

export interface UnawakenedVsAwakened {
  area: string;
  unawakened: string;
  awakened: string;
}

export interface MasterNumberDetail {
  number: 11 | 22 | 33;
  title: string;
  archetype: string;
  quote: { text: string; author: string };
  introduction: string;
  lifeStages?: LifeStageManifestation[];
  compatibilityTable?: CompatibilityDynamic[];
  careerDomains?: CareerDomainDetail[];
  unawakenedVsAwakened?: UnawakenedVsAwakened[];
}

export interface KarmicDebtDetail {
  debtNumber: "13/4" | "14/5" | "16/7" | "19/1";
  title: string;
  lessonTheme: string;
  quote?: { text: string; author: string };
  introduction: string;
  tableData: { area: string; shadowOrPattern: string; remedyOrAwakened: string }[];
}

export interface MasterKarmicChapterMeta {
  chapterTitle: string;
  chapterSubtitle: string;
  introductionQuote: { text: string; author: string };
  introductionText: string[];
  preservationRulesTable: {
    calculationType: string;
    preserve: boolean;
    guidance: string;
  }[];
  masterComparisonTable: {
    dimension: string;
    m11: string;
    m22: string;
    m33: string;
  }[];
  karmicPositionSignificance: {
    position: string;
    significance: string;
    manifestation: string;
  }[];
  quickReferenceTable: {
    number: string;
    type: "Master Number" | "Karmic Debt";
    coreTheme: string;
    giftWhenAwakened: string;
    challengeWhenUnconscious: string;
    keyRemedy: string;
  }[];
  summaryKeyTakeaways: string[];
  exercisesAndReflections: {
    exercises: { id: string; title: string; text: string }[];
    reflectionQuestions: string[];
  };
  professionalTip: string;
}

export const MASTER_KARMIC_CHAPTER_META: MasterKarmicChapterMeta = {
  chapterTitle: "Master Numbers and Karmic Debt in Real Life",
  chapterSubtitle: "Chapter Four: High-Voltage Vibrations, Soul Lessons & Deep Practical Transformations",
  introductionQuote: {
    text: "The privilege of a lifetime is to become who you truly are.",
    author: "Carl Gustav Jung"
  },
  introductionText: [
    "Not all numerological profiles are created equal in their intensity. Most people carry a Life Path or core number that sits comfortably within the range of 1 through 9 — a single, clear vibration that shapes their personality and life experience in ways that are challenging but navigable. Then there are those whose profile contains a Master Number or a Karmic Debt Number, and for these individuals, the experience of being alive tends to feel distinctly more intense, more pressured, and — when they finally understand what they are working with — more purposeful.",
    "In this master reference, we explore how these numbers actually manifest in real human lives across different life stages, how they interact with each other and with single-digit numbers in relationship, how to identify them correctly in a calculation, and what the practical path of working consciously with these intensified vibrations actually looks like day to day.",
    "This section also addresses one of the most common sources of confusion in numerology practice: the difference between a Master Number and its reduced base number, and how to know which is actually operating in a person’s life at any given moment. Not everyone who has an 11 in their profile is living the full Master Number frequency — and understanding why is essential for accurate and compassionate reading."
  ],
  preservationRulesTable: [
    {
      calculationType: "Life Path Number",
      preserve: true,
      guidance: "If day, month, or year reduces to 11, 22, or 33 before the final sum, preserve it. If the final sum is 11, 22, or 33, preserve it."
    },
    {
      calculationType: "Expression / Destiny Number",
      preserve: true,
      guidance: "Do not preserve intermediate subtotals unless the final result itself is a Master Number."
    },
    {
      calculationType: "Soul Urge Number",
      preserve: true,
      guidance: "Intermediate steps are reduced normally. Preserve only if final vowel total is 11, 22, or 33."
    },
    {
      calculationType: "Personality Number",
      preserve: true,
      guidance: "Preserve if final consonant total is 11, 22, or 33."
    },
    {
      calculationType: "Personal Year / Month / Day",
      preserve: false,
      guidance: "Master Numbers are not typically preserved in short cycle calculations; reduce fully to single digit."
    },
    {
      calculationType: "Lo Shu Grid",
      preserve: false,
      guidance: "Each birth date digit is placed individually — double digits are always reduced first into 3x3 cells."
    }
  ],
  masterComparisonTable: [
    {
      dimension: "Core Gift",
      m11: "Spiritual perception & intuition",
      m22: "Visionary building & manifestation",
      m33: "Unconditional love & transformation through presence"
    },
    {
      dimension: "Base Number",
      m11: "2 (sensitivity, cooperation)",
      m22: "4 (structure, discipline)",
      m33: "6 (nurturing, responsibility)"
    },
    {
      dimension: "Primary Challenge",
      m11: "Anxiety and self-doubt",
      m22: "Perfectionism and control",
      m33: "Self-depletion and martyrdom"
    },
    {
      dimension: "How They Lead",
      m11: "Through inspiration and example",
      m22: "Through systems and structure",
      m33: "Through embodied love and service"
    },
    {
      dimension: "Relationship Style",
      m11: "Deeply empathic, sometimes absorbing",
      m22: "Devoted but can be controlling",
      m33: "Profoundly giving, boundaries needed"
    },
    {
      dimension: "Financial Pattern",
      m11: "Undervalues gifts, needs encouragement to charge",
      m22: "Understands money as a tool for building",
      m33: "Gives money away, struggles to receive"
    },
    {
      dimension: "Spiritual Lesson",
      m11: "Trust your own perception",
      m22: "Build for legacy, not ego",
      m33: "Give from fullness, not depletion"
    },
    {
      dimension: "When Unawakened",
      m11: "Living as an anxious, uncertain 2",
      m22: "Living as a rigid, fearful 4",
      m33: "Living as a resentful, martyred 6"
    },
    {
      dimension: "When Awakened",
      m11: "A channel for genuine spiritual insight and inspired communication",
      m22: "A builder of structures that serve humanity at scale",
      m33: "A living embodiment of compassionate love"
    }
  ],
  karmicPositionSignificance: [
    {
      position: "Life Path Number",
      significance: "Most significant — affects the entire life journey",
      manifestation: "The karmic pattern is the central theme of the lifetime; cannot be avoided but can be consciously worked."
    },
    {
      position: "Expression / Destiny",
      significance: "Highly significant — affects public role & expression",
      manifestation: "The pattern shows up in how the person engages with their capabilities and public contribution."
    },
    {
      position: "Soul Urge",
      significance: "Significant — affects inner desires & motivation",
      manifestation: "The karmic pattern creates an inner conflict around what is truly wanted."
    },
    {
      position: "Birthday Number",
      significance: "Moderate — affects core personality traits",
      manifestation: "The pattern appears as a persistent personality tendency or recurring life theme."
    },
    {
      position: "Pinnacle or Challenge",
      significance: "Time-specific — active during specific cycle",
      manifestation: "The karmic pattern intensifies during that specific multi-year life period."
    }
  ],
  quickReferenceTable: [
    {
      number: "11",
      type: "Master Number",
      coreTheme: "Spiritual perception & inspired communication",
      giftWhenAwakened: "Channel for divine insight; illuminates others",
      challengeWhenUnconscious: "Chronic anxiety, self-doubt, sensitivity overwhelm",
      keyRemedy: "Trust your own perception; channel sensitivity into service"
    },
    {
      number: "22",
      type: "Master Number",
      coreTheme: "Visionary manifestation at scale",
      giftWhenAwakened: "Builder of structures that serve humanity",
      challengeWhenUnconscious: "Perfectionism, fear of failure, living as rigid 4",
      keyRemedy: "Start before perfect; allow imperfection in service of completion"
    },
    {
      number: "33",
      type: "Master Number",
      coreTheme: "Unconditional love through embodied service",
      giftWhenAwakened: "Living embodiment of compassionate wisdom",
      challengeWhenUnconscious: "Martyrdom, depletion, inability to receive",
      keyRemedy: "Give from fullness; self-care is prerequisite, not indulgence"
    },
    {
      number: "13/4",
      type: "Karmic Debt",
      coreTheme: "Disciplined effort & the value of honest work",
      giftWhenAwakened: "Extraordinary achiever through mastered discipline",
      challengeWhenUnconscious: "Shortcuts backfire; obstacles at completion; others' unreliability",
      keyRemedy: "Embrace process; finish what you start; honor every commitment"
    },
    {
      number: "14/5",
      type: "Karmic Debt",
      coreTheme: "Responsible freedom & conscious pleasure",
      giftWhenAwakened: "Genuinely free person who chooses commitments consciously",
      challengeWhenUnconscious: "Addiction, excess, commitment phobia, impulsivity",
      keyRemedy: "Moderation as daily practice; freedom found within commitment"
    },
    {
      number: "16/7",
      type: "Karmic Debt",
      coreTheme: "Authentic humility & the demolition of ego structures",
      giftWhenAwakened: "Builder of lives on foundations of radical integrity",
      challengeWhenUnconscious: "Sudden collapses, relationship falls, public reversals",
      keyRemedy: "Walk the talk in every context; build only on truth"
    },
    {
      number: "19/1",
      type: "Karmic Debt",
      coreTheme: "Interdependence & the stewardship of power",
      giftWhenAwakened: "Leader of genuine generosity and authentic community",
      challengeWhenUnconscious: "Isolation, abandonment, having to do everything alone",
      keyRemedy: "Ask for help before crisis; invest in community proactively"
    }
  ],
  summaryKeyTakeaways: [
    "Master Numbers (11, 22, 33) are amplified vibrations — not superior but more intense, carrying both exceptional potential and exceptional challenge.",
    "Not everyone with a Master Number is living its full frequency. Many oscillate between the master expression and the base number, particularly before midlife.",
    "The 11 gifts spiritual perception and inspired communication; its challenge is anxiety and self-doubt. It develops across life stages, coming into full expression in midlife.",
    "The 22 gifts visionary building at scale; its challenge is perfectionism and the temptation to settle for the safer base-4 expression.",
    "The 33 is the rarest Master Number and must be verified carefully. It gifts unconditional love in service; its challenge is self-depletion.",
    "Karmic Debt Numbers (13, 14, 16, 19) are not punishments but precise lessons — unfinished patterns from previous cycles presenting as recurring challenges.",
    "The remedy for every Karmic Debt is the conscious adoption of the behavior that the unconscious pattern avoids: discipline for 13, moderation for 14, integrity for 16, interdependence for 19."
  ],
  exercisesAndReflections: {
    exercises: [
      {
        id: "ex_4_1",
        title: "Exercise 4.1 — Master Number Audit",
        text: "Review your core numbers: Life Path, Expression, Soul Urge, Personality, and Birthday. Note any that are 11, 22, or 33 before reduction. For each Master Number you find, answer: Am I currently living the full master expression of this number, or the base number? What would it take to step more fully into the master frequency?"
      },
      {
        id: "ex_4_2",
        title: "Exercise 4.2 — Karmic Debt Pattern Recognition",
        text: "Review the descriptions of all four Karmic Debt numbers. Even if none appears in your core profile, identify which of the four patterns — avoidance of effort, excess and escapism, ego structures, or misuse of power — appears most persistently as a recurring challenge in your life."
      }
    ],
    reflectionQuestions: [
      "If you have a Master Number in your profile, at what moments in your life have you felt its full frequency — and at what moments have you defaulted to the base number? What made the difference?",
      "Which of the four Karmic Debt patterns do you recognize most clearly in your life, whether or not you carry the specific number? What recurring situation keeps presenting this lesson?",
      "What structure, relationship, or belief in your life might be built on a foundation that would not survive a 16/7 audit for authenticity?",
      "If you carry a 19/1 pattern, who are the three people you most need to reach out to — not to ask for something, but simply to acknowledge that they matter?"
    ]
  },
  professionalTip: "When presenting Karmic Debt Numbers to clients, the framing is everything. Never present a Karmic Debt as a judgment or a sentence. Present it as a map. The client who understands their 16/7 as a pattern of precision demolition directed at false structures can begin to build differently. The numerologist’s job is not to confirm fate but to illuminate the pattern — and in that illumination, make the pattern navigable."
};

export const MASTER_NUMBERS_DATABASE: Record<number, MasterNumberDetail> = {
  11: {
    number: 11,
    title: "11 The Illuminated Messenger",
    archetype: "The Intuitive Channel & Spiritual Visionary",
    quote: {
      text: "The intuitive mind is a sacred gift and the rational mind is a faithful servant.",
      author: "Albert Einstein"
    },
    introduction: "The Master Number 11 carries high-voltage intuitive energy, acting as a channel between higher spiritual perception and earthly life. It is the vibration of the messenger, artist, intuitive counselor, and spiritual teacher.",
    lifeStages: [
      {
        lifeStage: "Childhood",
        ageRange: "0–14",
        manifestation: "Extreme sensitivity, vivid imagination, feeling 'different' from peers, unusual dreams or intuitive experiences.",
        challenges: "Anxiety, overwhelm, being misunderstood, difficulty fitting in."
      },
      {
        lifeStage: "Adolescence",
        ageRange: "14–21",
        manifestation: "Intense idealism, strong creative or spiritual impulses, periods of profound self-doubt alternating with flashes of brilliance.",
        challenges: "Identity crisis, emotional volatility, fear of failure, tendency to mask sensitivity with rebellion or withdrawal."
      },
      {
        lifeStage: "Young Adulthood",
        ageRange: "21–35",
        manifestation: "Beginning to find a channel for 11 energy through work, art, or service; developing intuitive gifts consciously.",
        challenges: "Career uncertainty, relationship intensity, the gap between vision and current reality."
      },
      {
        lifeStage: "Maturity",
        ageRange: "35–50",
        manifestation: "The 11 begins to come into its full expression — teaching, healing, creating, or leading with genuine spiritual authority.",
        challenges: "Burnout from over-giving, learning to receive, maintaining boundaries without losing empathy."
      },
      {
        lifeStage: "Elder",
        ageRange: "50+",
        manifestation: "The fully expressed 11 becomes a genuine source of wisdom and inspiration — a living example of sensitive strength.",
        challenges: "Releasing the need for recognition, accepting the full scope of their impact."
      }
    ],
    compatibilityTable: [
      { partnerNumber: "1", compatibilityLevel: "Moderate", dynamic: "1's directness can feel blunt to 11; 11's sensitivity can feel fragile to 1.", growthEdge: "11 must set boundaries; 1 must develop gentleness." },
      { partnerNumber: "2", compatibilityLevel: "High", dynamic: "Natural resonance — both are sensitive, relational, and emotionally attentive.", growthEdge: "Must ensure neither disappears into the other's needs." },
      { partnerNumber: "4", compatibilityLevel: "Good", dynamic: "4's groundedness stabilizes 11's intensity; 11 opens 4 to deeper feeling.", growthEdge: "11 may feel limited; 4 may feel overwhelmed by 11's emotional depth." },
      { partnerNumber: "6", compatibilityLevel: "High", dynamic: "Both are caring, service-oriented, and emotionally intelligent.", growthEdge: "Can become mutually enabling — need to maintain individual boundaries." },
      { partnerNumber: "7", compatibilityLevel: "Very High", dynamic: "Natural spiritual and intellectual resonance — both are seekers.", growthEdge: "Both tend to withdraw; must consciously maintain emotional contact." },
      { partnerNumber: "22", compatibilityLevel: "High", dynamic: "Complementary master energies — 11's vision + 22's building capacity.", growthEdge: "11 must not become 22's support structure at cost of own expression." },
      { partnerNumber: "33", compatibilityLevel: "Transformative", dynamic: "Rare and profound — both carry deep service orientation and spiritual sensitivity.", growthEdge: "Must both maintain self-care to avoid mutual depletion." }
    ]
  },
  22: {
    number: 22,
    title: "22 The Master Builder",
    archetype: "The Master Builder & Systemic Architect",
    quote: {
      text: "The best way to predict the future is to create it.",
      author: "Peter Drucker"
    },
    introduction: "The Master Number 22 combines the intuitive vision of the 11 with the practical grounding of the 4. It is capable of turning grand ideal visions into lasting physical, institutional, or social structures.",
    lifeStages: [
      {
        lifeStage: "Childhood",
        ageRange: "0–14",
        manifestation: "Strong organizational instincts, unusually serious or purposeful for age, feeling the weight of unformed ambitions.",
        challenges: "Perfectionism, excessive self-criticism, difficulty relaxing into childhood."
      },
      {
        lifeStage: "Adolescence",
        ageRange: "14–21",
        manifestation: "Scope of vision often exceeds current means — leading to intense frustration and early gaps between dream and reality.",
        challenges: "Overreach, impatience, retreat into base 4 rigidity as defense against failed ambition."
      },
      {
        lifeStage: "Young Adulthood",
        ageRange: "21–35",
        manifestation: "Building foundations — education, skills, networks, early projects that establish platform for large-scale achievement.",
        challenges: "Temptation to settle for comfortable 4 expression rather than risk full 22 potential."
      },
      {
        lifeStage: "Maturity",
        ageRange: "35–55",
        manifestation: "Peak 22 expression — large-scale projects, organizational leadership, building structures that serve thousands.",
        challenges: "Work-life balance, maintaining relationships amid large ambitions, avoiding becoming trapped by institutions."
      },
      {
        lifeStage: "Elder",
        ageRange: "55+",
        manifestation: "Legacy-building and transmission — ensuring structures outlast the creator.",
        challenges: "Releasing control, trusting successors, finding meaning beyond the built thing."
      }
    ],
    careerDomains: [
      { domain: "Business", naturalRole: "Founder, CEO, Chairman", signatureStrength: "Building scalable systems that serve large numbers", watchFor: "Micro-management, difficulty delegating vision" },
      { domain: "Government / Politics", naturalRole: "Policy architect, infrastructure leader", signatureStrength: "Long-term systemic thinking beyond electoral cycles", watchFor: "Becoming too attached to the system created" },
      { domain: "Education", naturalRole: "Institution builder, curriculum architect", signatureStrength: "Creating educational structures that transform communities", watchFor: "Perfectionism slowing implementation" },
      { domain: "Social Impact", naturalRole: "NGO founder, humanitarian systems builder", signatureStrength: "Translating compassionate vision into organizational reality", watchFor: "Burnout from carrying mission weight alone" },
      { domain: "Technology", naturalRole: "Platform architect, systems designer", signatureStrength: "Building digital infrastructure that scales globally", watchFor: "Losing human dimension in pursuit of scale" }
    ]
  },
  33: {
    number: 33,
    title: "33 The Master Teacher",
    archetype: "The Master Teacher & Compassionate Healer",
    quote: {
      text: "I slept and dreamt that life was joy. I awoke and saw that life was service. I acted and behold, service was joy.",
      author: "Rabindranath Tagore"
    },
    introduction: "The Master Number 33 represents the pinnacle of compassionate service and spiritual teaching. It combines the spiritual insight of 11 and the practical building capacity of 22 with the unconditional love of 6.",
    unawakenedVsAwakened: [
      { area: "Relationships", unawakened: "Attracts wounded people, gives endlessly, becomes depleted and resentful.", awakened: "Loves deeply with healthy boundaries, supports growth without enabling dependency." },
      { area: "Career", unawakened: "Overworks in service roles, undercharges, cannot say no.", awakened: "Creates sustainable service structures, charges appropriately, leads through example." },
      { area: "Self-Care", unawakened: "Neglects own needs entirely, considers rest selfish.", awakened: "Prioritizes restoration as a prerequisite for service, models healthy self-regard." },
      { area: "Spirituality", unawakened: "Carries collective suffering personally, loses boundary between self and world.", awakened: "Holds the world's pain with compassion but not ownership; serves from strength." },
      { area: "Money", unawakened: "Gives money away compulsively, struggles to receive, financially insecure.", awakened: "Builds financial sustainability as a foundation for sustained service." }
    ]
  }
};

export const KARMIC_DEBT_DATABASE: Record<string, KarmicDebtDetail> = {
  "13/4": {
    debtNumber: "13/4",
    title: "Karmic Debt 13/4 — Disciplined Effort & Hard Work",
    lessonTheme: "Overcoming laziness or shortcuts in past cycles by embracing disciplined, sustained effort.",
    quote: { text: "There are no shortcuts to any place worth going.", author: "Beverly Sills" },
    introduction: "The 13/4 Karmic Debt carries the energetic imprint of having avoided necessary work, responsibility, or disciplined contribution in previous cycles. In this lifetime, 13/4 manifests as consistent pressure to work harder and resist shortcuts.",
    tableData: [
      { area: "Work & Career", shadowOrPattern: "Repeated obstacles when cutting corners; projects collapse at final stages.", remedyOrAwakened: "Develop a reputation for completing what is started; embrace mastery discipline." },
      { area: "Finances", shadowOrPattern: "Get-rich-quick schemes backfire consistently; windfalls disappear.", remedyOrAwakened: "Build wealth slowly and methodically; honor every financial commitment." },
      { area: "Relationships", shadowOrPattern: "Partners feel they carry disproportionate weight; resentment builds.", remedyOrAwakened: "Consciously take on fair share of responsibility; model dependability." },
      { area: "Health", shadowOrPattern: "Ignoring health warning signs until they become serious.", remedyOrAwakened: "Consistent preventive care; daily physical discipline in diet and sleep." },
      { area: "Spiritual Growth", shadowOrPattern: "Seeking spiritual shortcuts or instant transformation.", remedyOrAwakened: "Commit to daily practice; value consistency over dramatic experiences." }
    ]
  },
  "14/5": {
    debtNumber: "14/5",
    title: "Karmic Debt 14/5 — Responsible Freedom & Moderation",
    lessonTheme: "Healing abuse of personal freedom or sensory excess in past cycles through conscious commitment.",
    introduction: "The 14/5 Karmic Debt carries the imprint of misused freedom in previous cycles — using personal liberty for self-indulgence or abandonment of responsibilities. In this life, 14/5 presents intense cravings for freedom combined with temptations toward excess.",
    tableData: [
      { area: "Relationships", shadowOrPattern: "Serial short-term relationships; commitment phobia; leaving when difficult.", remedyOrAwakened: "Choosing relationship consciously; finding freedom within commitment." },
      { area: "Addictions & Excess", shadowOrPattern: "Substance abuse, compulsive spending, food disorders, screen addiction.", remedyOrAwakened: "Developing a conscious relationship with pleasure; daily moderation." },
      { area: "Career", shadowOrPattern: "Cannot stay in any role long; leaves when mastery requires repetition.", remedyOrAwakened: "Uses versatility in flexible fields; builds depth before diversifying." },
      { area: "Finances", shadowOrPattern: "Impulsive spending; living entirely in the moment with no savings.", remedyOrAwakened: "Creates financial structures that provide real freedom and peace of mind." },
      { area: "Body & Health", shadowOrPattern: "Treating body as pleasure vehicle without regard for limits.", remedyOrAwakened: "Caring for the body as the ultimate vessel of genuine freedom." }
    ]
  },
  "16/7": {
    debtNumber: "16/7",
    title: "Karmic Debt 16/7 — Authentic Humility & Ego Demolition",
    lessonTheme: "Cleansing past ego corruption, pride, or deception through precision demolition of false structures.",
    introduction: "The 16/7 Karmic Debt carries the imprint of having allowed ego, pride, or false authority to corrupt love or service. In this life, 16/7 brings 'precision demolition' — structures built on false foundations fall apart so authentic integrity can replace them.",
    tableData: [
      { area: "Sudden Reversals", shadowOrPattern: "Things that seemed certain fall apart without warning.", remedyOrAwakened: "Whatever was built on ego cannot stand; rebuild on radical truth." },
      { area: "Relationship Collapses", shadowOrPattern: "Relationships end suddenly revealing hidden misrepresentations.", remedyOrAwakened: "Authenticity and total honesty become non-negotiable foundations." },
      { area: "Public Exposure", shadowOrPattern: "Inconsistencies between public image and private reality exposed.", remedyOrAwakened: "Walk the talk in all contexts, visible and private." },
      { area: "Spiritual Crisis", shadowOrPattern: "Deep collapse of superficial or performed spiritual beliefs.", remedyOrAwakened: "Replace spiritual ego with genuine, grounded humility and presence." }
    ]
  },
  "19/1": {
    debtNumber: "19/1",
    title: "Karmic Debt 19/1 — Interdependence & Power Stewardship",
    lessonTheme: "Overcoming past misuse of power and selfish independence by learning genuine interdependence.",
    introduction: "The 19/1 Karmic Debt carries the imprint of having used power or leadership selfishly in past cycles while ignoring others. In this life, 19/1 presents as feeling forced to do everything alone until the person learns to ask for help and invest in community.",
    tableData: [
      { area: "Asking for Help", shadowOrPattern: "Refuses to ask until desperate; views needing support as humiliation.", remedyOrAwakened: "Practices asking proactively before crisis; builds reciprocal support." },
      { area: "Leadership Style", shadowOrPattern: "Takes sole credit for success; deflects blame onto subordinates.", remedyOrAwakened: "Leads with generosity; attributes success; takes responsibility." },
      { area: "Vulnerability", shadowOrPattern: "Treats vulnerability as weakness; wears heavy competence armor.", remedyOrAwakened: "Discovers that genuine strength includes admitting limitations." },
      { area: "Community", shadowOrPattern: "Operates as a lone wolf; views community as optional.", remedyOrAwakened: "Invests in community proactively; values mutual interdependence." }
    ]
  }
};

/**
 * Utility helper to get Master Number or Karmic Debt details
 */
export function getMasterNumberDetail(num: number): MasterNumberDetail | undefined {
  if (num === 11 || num === 22 || num === 33) {
    return MASTER_NUMBERS_DATABASE[num];
  }
  return undefined;
}

export function getKarmicDebtDetail(code: string): KarmicDebtDetail | undefined {
  return KARMIC_DEBT_DATABASE[code];
}
