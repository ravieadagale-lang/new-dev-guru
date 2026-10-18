// src/data/loshuGridCompleteData.ts
// Complete Lo Shu Grid & Nine Planes System Data (Chapter Twenty-Four & Chapter Twenty-Five)

export interface LoShuPositionDetail {
  position: number;
  name: string;
  element: string;
  direction: string;
  governingBody: string;
  coreConcept: string;
  occupiedMeaning: string;
  doubleOccupiedMeaning: string;
  tripleOccupiedMeaning: string;
  emptyMeaning: string;
  growthAdvice: string;
}

export interface LoShuPlaneDetail {
  id: string;
  planeNumber: number;
  name: string;
  type: "Horizontal" | "Vertical" | "Diagonal";
  positions: number[];
  coreFocus: string;
  fullOccupiedDescription: string;
  partialOccupiedDescription: string;
  emptyDescription: string;
  growthGuidance: string;
}

export const LOSHU_POSITIONS_DATA: Record<number, LoShuPositionDetail> = {
  1: {
    position: 1,
    name: "Position 1 — The Communication Position",
    element: "Water",
    direction: "North (Bottom Centre)",
    governingBody: "Mercury",
    coreConcept: "Capacity for genuine verbal, written, and social communication.",
    occupiedMeaning: "When position 1 is occupied by a single digit 1 from the birth date, the capacity for clear verbal and written communication is naturally present and readily accessible. The person expresses their inner experience with reasonable ease and relates well socially.",
    doubleOccupiedMeaning: "Double occupation (two 1s) indicates a naturally gifted communicator — someone for whom the expression of inner thoughts, feelings, and ideas through language and relationship is genuinely effortless and highly expressive.",
    tripleOccupiedMeaning: "Triple or higher occupation (three or more 1s) indicates an exceptionally concentrated communication capacity. While providing abundant verbal fluency, it carries the risk of over-communicating, verbal restlessness, or talking over others if not consciously managed.",
    emptyMeaning: "When position 1 is empty (no digit 1 appears anywhere in the birth date), the person faces a specific developmental challenge in the domain of genuine communication and must work more consciously to cultivate expressive skills.",
    growthAdvice: "Deliberate practice of active listening, journaling, public speaking, and intentional interpersonal warmth helps cultivate the expressive fluency that empty position 1 invites."
  },
  2: {
    position: 2,
    name: "Position 2 — The Intuition Position",
    element: "Earth / Water",
    direction: "South-West (Top Right)",
    governingBody: "Moon",
    coreConcept: "Intuitive faculty, direct non-rational knowing, and empathic sensitivity.",
    occupiedMeaning: "Position 2 occupied indicates a naturally developed intuitive intelligence — a capacity for direct, immediate, non-rational knowing that perceives subtle emotional nuances and unseen dynamics beyond analytical logic.",
    doubleOccupiedMeaning: "Double occupation (two 2s) produces heightened psychic sensitivity, deep empathic resonance, and an extraordinary capacity to feel what others are experiencing before a word is spoken.",
    tripleOccupiedMeaning: "Triple occupation (three 2s) creates an almost overwhelming emotional and intuitive sensitivity, requiring strong grounding techniques to prevent absorbing surrounding emotional clutter or experiencing severe mood swings.",
    emptyMeaning: "Position 2 empty indicates a person whose primary intelligence is more rational and analytical, and who may initially discount subtle gut feelings or non-linear impressions.",
    growthAdvice: "Cultivate intuitive awareness through daily meditation, trusting first impressions, quiet reflection, and honoring gut instincts before rational analysis overrides them."
  },
  3: {
    position: 3,
    name: "Position 3 — The Action Position",
    element: "Wood",
    direction: "East (Middle Left)",
    governingBody: "Mars / Jupiter",
    coreConcept: "Capacity for decisive, practical initiative and result-oriented action.",
    occupiedMeaning: "Position 3 occupied indicates natural initiative, practical capability, and a drive toward concrete achievement. The person naturally converts ideas into tangible, measurable physical outcomes.",
    doubleOccupiedMeaning: "Double occupation (two 3s) generates powerful dynamic momentum, executive force, and a restless drive to initiate new projects and physically shape the environment.",
    tripleOccupiedMeaning: "Triple occupation (three 3s) can manifest as hyperactive momentum or scattered physical energy, where the urge to act outpaces thoughtful planning or long-term stamina.",
    emptyMeaning: "Position 3 empty indicates a person who may think, plan, and analyze far more readily than they execute — experiencing a gap between clear mental understanding and decisive practical action.",
    growthAdvice: "Develop decisive action momentum by setting small daily execution goals, reducing over-analysis, and taking immediate physical steps toward key priorities."
  },
  4: {
    position: 4,
    name: "Position 4 — The Practicality Position",
    element: "Wood",
    direction: "South-East (Top Left)",
    governingBody: "Rahu",
    coreConcept: "Practical wisdom, methodical planning, and systematic management.",
    occupiedMeaning: "Position 4 occupied indicates natural practical intelligence, organizational capability, and a methodical approach to managing the physical, financial, and structural dimensions of daily life.",
    doubleOccupiedMeaning: "Double occupation (two 4s) produces exceptional administrative precision, systematic discipline, and an eagle-eye for structural detail and operational efficiency.",
    tripleOccupiedMeaning: "Triple occupation (three 4s) can produce rigidity, stubbornness, or obsessive fixation on microscopic order and routine at the expense of flexibility.",
    emptyMeaning: "Position 4 empty indicates that the methodical, systematic, organizational dimension of practical life requires conscious attention and deliberate structure to avoid clutter and disorganization.",
    growthAdvice: "Build organizational capability through structured daily routines, digital planning tools, explicit budgeting, and systematic habit tracking."
  },
  5: {
    position: 5,
    name: "Position 5 — The Will Position",
    element: "Earth (Center / Brahmasthan)",
    direction: "Center",
    governingBody: "Saturn / Mercury",
    coreConcept: "Core will, fundamental determination, emotional balance, and central stability.",
    occupiedMeaning: "Position 5 occupied at the exact center of the grid indicates strong, clear, sustained individual will — a person who maintains personal direction, emotional grounding, and core determination across time.",
    doubleOccupiedMeaning: "Double occupation (two 5s) creates unshakeable inner resilience, command over self, and extraordinary perseverance that withstands severe life challenges without losing central balance.",
    tripleOccupiedMeaning: "Triple occupation (three 5s) can produce intense restlessness, risk-taking, or an uncompromising stubbornness that resists any external influence or guidance.",
    emptyMeaning: "Position 5 empty (which occurs when no digit 5 appears anywhere in the birth date) indicates that sustained individual motivation and core emotional grounding require deliberate cultivation.",
    growthAdvice: "Cultivate central willpower through daily volitional practice — making clear personal commitments and maintaining them steadfastly through periods of doubt and distraction."
  },
  6: {
    position: 6,
    name: "Position 6 — The Creativity Position",
    element: "Metal",
    direction: "North-West (Bottom Right)",
    governingBody: "Venus",
    coreConcept: "Capacity for genuine creativity, aesthetic refinement, luxury, and benefactor support.",
    occupiedMeaning: "Position 6 occupied indicates natural creative intelligence, aesthetic appreciation, artistic grace, and the capacity to attract helpful benefactors and harmonious domestic environments.",
    doubleOccupiedMeaning: "Double occupation (two 6s) endows the person with heightened artistic flair, design elegance, deep love for luxury and beauty, and strong domestic magnetic charm.",
    tripleOccupiedMeaning: "Triple occupation (three 6s) can lead to over-indulgence in comfort, excessive worry over loved ones, or an over-attachment to material luxury.",
    emptyMeaning: "Position 6 empty indicates a person whose primary gifts lie in execution or analysis rather than original artistic creation or aesthetic design.",
    growthAdvice: "Develop creative expressiveness through artistic hobbies, design appreciation, surrounding oneself with beauty, and embracing playful, uninhibited risk-taking in self-expression."
  },
  7: {
    position: 7,
    name: "Position 7 — The Thinking Position",
    element: "Metal",
    direction: "West (Middle Right)",
    governingBody: "Ketu",
    coreConcept: "Analytical, philosophical, and investigative thinking capacity.",
    occupiedMeaning: "Position 7 occupied indicates natural analytical intelligence, philosophical depth, and an investigative mind capable of dissecting complex subjects and holding nuanced perspectives.",
    doubleOccupiedMeaning: "Double occupation (two 7s) produces profound spiritual inquiry, sharp technical research ability, and a penetrating intellect that questions appearances to uncover underlying truth.",
    tripleOccupiedMeaning: "Triple occupation (three 7s) can result in intellectual isolation, cynicism, excessive skepticism, or detachment from practical everyday concerns.",
    emptyMeaning: "Position 7 empty indicates a person whose primary mode of understanding is more intuitive, practical, or relational rather than formal analytical investigation.",
    growthAdvice: "Develop analytical rigour by reading deeply, studying logical frameworks, investigating root causes, and practicing patient intellectual inquiry."
  },
  8: {
    position: 8,
    name: "Position 8 — The Wisdom Position",
    element: "Earth",
    direction: "North-East (Bottom Left)",
    governingBody: "Jupiter",
    coreConcept: "Deep, integrated, experience-tested wisdom and spiritual maturity.",
    occupiedMeaning: "Position 8 occupied indicates natural wisdom and integrative understanding — a capacity to process life experience and distill it into genuine judgment and moral clarity.",
    doubleOccupiedMeaning: "Double occupation (two 8s) reflects an unusually mature, old-soul perspective, characterized by profound financial judgment, institutional building capacity, and deep practical wisdom.",
    tripleOccupiedMeaning: "Triple occupation (three 8s) can bring heavy burdens of responsibility, workaholism, or fatalistic views if life's experiences are digested with bitterness rather than insight.",
    emptyMeaning: "Position 8 empty indicates that wisdom accumulates gradually through conscious reflection rather than arriving as an innate, effortless gift.",
    growthAdvice: "Cultivate integrated wisdom by keeping a reflective daily journal, studying classical philosophy, seeking mentorship, and consciously digesting life events."
  },
  9: {
    position: 9,
    name: "Position 9 — The Ambition Position",
    element: "Fire",
    direction: "South (Top Centre)",
    governingBody: "Sun / Mars",
    coreConcept: "Capacity for genuine ambition, high aspiration, recognition, and public drive.",
    occupiedMeaning: "Position 9 occupied indicates natural ambition, clear goal-orientation, and the aspiration toward significant personal and social achievement.",
    doubleOccupiedMeaning: "Double occupation (two 9s) imparts extraordinary competitive fire, high visibility, charisma, and a relentless drive toward leadership and public prominence.",
    tripleOccupiedMeaning: "Triple occupation (three 9s) creates intense, burning ambition that can lead to perpetual dissatisfaction, fiery impatience, or burnout if not tempered with contentment.",
    emptyMeaning: "Position 9 empty indicates a person whose primary orientation is toward relationship, service, or internal reflection rather than public acclaim or competitive achievement.",
    growthAdvice: "Develop healthy ambition by formulating explicit long-term goals, celebrating incremental victories, and aligning personal achievement with broader noble purpose."
  }
};

export const LOSHU_PLANES_DATA: LoShuPlaneDetail[] = [
  {
    id: "mental",
    planeNumber: 1,
    name: "The Mental Plane (Top Row: 4-9-2)",
    type: "Horizontal",
    positions: [4, 9, 2],
    coreFocus: "How you think, plan, envision, and aspire — The life of the mind.",
    fullOccupiedDescription: "When all three positions of the Mental Plane are occupied (digits 4, 9, and 2 present), the person possesses a complete mental orientation: methodical practical planning (4) combined with ambitious vision (9) and intuitive perception (2). This rare synergy produces exceptional strategic foresight, brilliant intellectual synthesis, and the rare ability to conceptualize complex multi-layered plans.",
    partialOccupiedDescription: "With one or two positions occupied, mental activity is filtered primarily through those specific modes. Position 9 alone provides visionary ambition without systematic planning; Position 4 alone provides administrative precision without grand vision; Position 2 alone provides intuitive insights without analytical structure.",
    emptyDescription: "When the Mental Plane is completely empty (digits 4, 9, and 2 all absent), the person engages reality primarily through direct feeling and practical action rather than abstract mental processing. Learning occurs through physical experience rather than theoretical study.",
    growthGuidance: "For incomplete Mental Planes, deliberately cultivate the missing mental faculties — pairing intuitive impressions with explicit written plans, or anchoring big ambitions with step-by-step organizational tools."
  },
  {
    id: "emotional",
    planeNumber: 2,
    name: "The Emotional Plane (Middle Row: 3-5-7)",
    type: "Horizontal",
    positions: [3, 5, 7],
    coreFocus: "How you feel, relate, exercise will, and think analytically — The life of the heart and inner drive.",
    fullOccupiedDescription: "A fully occupied Emotional Plane (digits 3, 5, and 7 present) endows the person with complete emotional and volitional integration: decisive initiative (3), sustained central willpower (5), and deep analytical self-reflection (7). This creates individuals of profound emotional stability, empathetic depth, and unshakeable inner conviction.",
    partialOccupiedDescription: "Partial occupation highlights specific inner dynamics. Having Position 5 alone gives strong willpower but may lack the decisive initiative (3) or reflective analysis (7) to channel that willpower effectively into the world.",
    emptyDescription: "A completely empty Emotional Plane indicates an individual who operates in a more externally-focused or intellectual mode, requiring conscious effort to connect with deep emotional motivations and sustained inner volitional drive.",
    growthGuidance: "Cultivate emotional balance and volitional strength through self-awareness practices, mindfulness, emotional honesty, and aligning outer actions with core inner values."
  },
  {
    id: "practical",
    planeNumber: 3,
    name: "The Practical Plane (Bottom Row: 8-1-6)",
    type: "Horizontal",
    positions: [8, 1, 6],
    coreFocus: "How you build, communicate, and create — The life of tangible contribution.",
    fullOccupiedDescription: "A fully occupied Practical Plane (digits 8, 1, and 6 present) represents the complete practical toolkit: experience-tested wisdom (8), fluent communication (1), and creative artistic expression (6). Individuals with this plane active excel at making things happen in the real world, building enduring wealth, and communicating ideas with magnetic flair.",
    partialOccupiedDescription: "Partial presence shows specific practical strengths. The 8-1 combination provides wise communication without creative flair; the 1-6 combination gives creative charm without deep wisdom.",
    emptyDescription: "An empty Practical Plane signifies that practical execution, commercial management, and physical creation require deliberate discipline, as the person naturally resides in abstract thought or emotional feeling.",
    growthGuidance: "Strengthen practical competence by developing hands-on technical skills, financial management habits, and clear communication channels."
  },
  {
    id: "spiritual",
    planeNumber: 4,
    name: "The Spiritual Plane (Left Column: 4-3-8)",
    type: "Vertical",
    positions: [4, 3, 8],
    coreFocus: "How you form intention, take initiative, and integrate wisdom — The depth dimension.",
    fullOccupiedDescription: "The Spiritual Plane (digits 4, 3, and 8 present) represents serious, purposeful, deeply grounded contribution. It unites practical planning (4), decisive action (3), and integrated wisdom (8), creating a person of immense substance, integrity, and spiritual gravity whose life work carries lasting weight.",
    partialOccupiedDescription: "When partially filled, the person may carry action drive without wisdom (3 alone) or practical sense without action momentum (4 alone).",
    emptyDescription: "An empty Spiritual Plane means the individual approaches life from more flexible, aspirational, or expressive modes rather than heavy, purposeful, wisdom-grounded structures.",
    growthGuidance: "Engage in serious, long-term purposeful projects, anchor immediate actions in moral wisdom, and build practical foundations for noble ideals."
  },
  {
    id: "will",
    planeNumber: 5,
    name: "The Will Plane (Centre Column: 9-5-1)",
    type: "Vertical",
    positions: [9, 5, 1],
    coreFocus: "How you aspire, sustain direction, and communicate purpose — The motivating spine.",
    fullOccupiedDescription: "The Will Plane (digits 9, 5, and 1 present) constitutes the central vertical spine of the Lo Shu Grid — uniting high ambition (9), central determination (5), and expressive communication (1). This is the supreme plane of leadership, charismatic influence, and persistent goal execution.",
    partialOccupiedDescription: "Having 9 and 1 without 5 provides ambition and eloquence, but the individual may struggle to sustain determination over extended periods of adversity.",
    emptyDescription: "An empty Will Plane suggests that leadership and goal pursuit are gentler, emerging through quiet example rather than assertive, highly driven motivation.",
    growthGuidance: "Strengthen the central spine by setting clear long-term objectives, cultivating daily discipline, and speaking purpose with authentic conviction."
  },
  {
    id: "thought",
    planeNumber: 6,
    name: "The Thought Plane (Right Column: 2-7-6)",
    type: "Vertical",
    positions: [2, 7, 6],
    coreFocus: "How you perceive intuitively, analyze deeply, and express creatively — The expressive dimension.",
    fullOccupiedDescription: "The Thought Plane (digits 2, 7, and 6 present) forms a complete perceptive-analytical-creative axis: intuitive reception (2), analytical examination (7), and creative manifestation (6). This produces original thinkers, visionary artists, and inventive problem solvers.",
    partialOccupiedDescription: "Partial presence shows specific perceptive cognitive styles, such as analytical rigor without intuitive perception (7 alone) or intuitive feeling without analytical structure (2 alone).",
    emptyDescription: "An empty Thought Plane points to a personality grounded in action and physical building rather than abstract cognitive exploration or artistic creation.",
    growthGuidance: "Nurture original thinking by engaging in creative arts, analytical puzzle-solving, and trusting subtle intuitive impressions."
  },
  {
    id: "action",
    planeNumber: 7,
    name: "The Action Plane (Right Column / Action Synergy: 2-7-6)",
    type: "Vertical",
    positions: [2, 7, 6],
    coreFocus: "Integrating intuitive perception, analytical precision, and creative execution into action.",
    fullOccupiedDescription: "In specialized action interpretations, the 2-7-6 axis functions as the Action Plane — combining intuitive situational awareness (2), sharp analytical precision (7), and creative execution (6) into swift, highly effective real-world problem solving.",
    partialOccupiedDescription: "Without full activation, actions may lack intuitive timing or creative flair.",
    emptyDescription: "Requires conscious effort to make real-time creative adjustments during execution.",
    growthGuidance: "Practice rapid decision-making in dynamic environments while maintaining calm intuitive awareness."
  },
  {
    id: "golden",
    planeNumber: 8,
    name: "The Golden Plane / Raj Yoga (Main Diagonal: 4-5-6)",
    type: "Diagonal",
    positions: [4, 5, 6],
    coreFocus: "From practical planning through sustained will to creative achievement — The golden arc of success.",
    fullOccupiedDescription: "The Golden Plane (digits 4, 5, and 6 along the main diagonal) is renowned in traditional Lo Shu lore as the Golden Raj Yoga of Supreme Accomplishment. It connects practical planning (4), unshakeable central willpower (5), and creative expression (6). Individuals possessing this complete line convert plans into golden material and artistic achievements with extraordinary consistency.",
    partialOccupiedDescription: "Having 4 and 5 without 6 means plans are pursued with willpower but lack the final creative, magnetic polish; 5 and 6 without 4 gives willpower and creativity but lacks structural planning.",
    emptyDescription: "An empty Golden Plane signifies that material success and creative execution require building systematic habits rather than relying on innate golden momentum.",
    growthGuidance: "Complete the golden arc by pairing structured plans (4) with sustained determination (5) and distinctive creative polish (6)."
  },
  {
    id: "silver",
    planeNumber: 9,
    name: "The Silver Plane / Property Yoga (Secondary Diagonal: 2-5-8)",
    type: "Diagonal",
    positions: [2, 5, 8],
    coreFocus: "From intuitive perception through sustained will to integrated wisdom — The silver arc of depth and assets.",
    fullOccupiedDescription: "The Silver Plane (digits 2, 5, and 8 along the secondary diagonal) is celebrated as the Silver Raj Yoga of Real Estate, Asset Accumulation, and Deep Spiritual Wisdom. It links intuitive sensitivity (2), central grounding (5), and experience-tested wisdom (8). It endows the person with deep inner maturity, financial stability, land/property luck, and profound counseling wisdom.",
    partialOccupiedDescription: "2 and 8 without 5 provides intuition and wisdom, but lacks the central volitional core to maintain stability under stress.",
    emptyDescription: "An empty Silver Plane indicates that spiritual wisdom and asset accumulation develop gradually through deliberate long-term investment and conscious self-inquiry.",
    growthGuidance: "Cultivate the silver depth by grounding intuitive perceptions in practical wisdom and maintaining emotional stability during financial and spiritual investments."
  }
];

export const CHAPTER_TWENTY_FOUR_THEORY_TEXT = {
  chapterNumber: "Chapter Twenty-Four",
  title: "Lo Shu Grid — Origins, Construction and Reading",
  quote: {
    text: "The Tao that can be named is not the eternal Tao. The beginning of heaven and earth has no name.",
    author: "Lao Tzu"
  },
  originsText: [
    "The Lo Shu Grid is one of the oldest mathematical objects in all of human civilisation — and one of the most remarkable. Its origins are recorded in Chinese texts dating back at least to the fourth century BCE, though the mathematical knowledge it encodes is believed to be considerably older, tracing its roots to the legendary reign of Emperor Yu approximately four thousand years ago. According to ancient accounts preserved in the Confucian classic I Ching and several Taoist texts of the classical period, the Lo Shu pattern was first revealed to Emperor Yu on the back of a sacred tortoise that emerged from the Lo River during a catastrophic flood that Yu was attempting to control. The pattern on the tortoise's shell — a nine-cell arrangement of dots in which every row, every column, and both main diagonals sum to exactly fifteen — was immediately recognised by the Emperor's court as a symbol of profound cosmic significance: a mathematical demonstration that perfect balance and perfect harmony could be expressed in number.",
    "The number fifteen is itself deeply significant in the Chinese cosmological framework. It is the number of days in each of the twenty-four solar terms that divide the Chinese agricultural year — making the Lo Shu's constant sum of fifteen a living mathematical image of the relationship between numerical pattern and natural time. The ancient scholar-priests understood it as a window onto the structure of cosmic order itself — a demonstration that the universe is organised according to mathematical principles of perfect balance that can be studied and understood.",
    "The Lo Shu's mathematical properties are genuinely extraordinary. In a three-by-three grid containing the numbers one through nine arranged in a specific pattern, every row sums to fifteen, every column sums to fifteen, both main diagonals sum to fifteen — and the only way to arrange the numbers one through nine in a three-by-three grid to achieve this property is the specific Lo Shu arrangement. There is no other solution. The arrangement is unique, which means the Lo Shu is not one possible magic square among many — it is the only possible magic square of this size and type. Ancient thinkers understood this uniqueness as evidence that this specific arrangement reflects something fundamental in the structure of reality.",
    "From the Han dynasty through the Tang, Song, Ming, and Qing periods — spanning more than two thousand years — the Lo Shu was continuously studied, applied, and developed across Taoist philosophy, I Ching interpretation, Chinese astrology, Feng Shui, and numerology. In contemporary practice, a person's complete birth date is mapped onto the nine-cell grid, with each digit placed in its corresponding grid position. The pattern of which cells are occupied, which are empty, and how many times each number appears produces a uniquely personal grid that reveals characteristic strengths, natural blind spots, and key developmental directions."
  ],
  constructionSteps: [
    "Extract all digits from the complete birth date (Day, Month, and 4-digit Year). Zero is excluded as it has no grid position.",
    "Write each digit in its corresponding fixed position in the 3x3 grid (4-9-2 top row, 3-5-7 middle row, 8-1-6 bottom row).",
    "Record digit frequencies: multiple occurrences of a number increase density in that cell.",
    "Perform 4-layer analysis: Occupied positions (natural strengths), Empty positions (growth areas), Density assessment (concentrations & risks of excess), and Plane/Arrow evaluations."
  ],
  workedCaseStudies: [
    {
      name: "Pattern Profile A — Double Position 1 & 8 Matrix",
      dob: "Analytical Pattern 1-1-8-8-9",
      digitsPlotted: "1 (twice), 2, 7, 8 (twice), 9",
      missingDigits: "3, 4, 5, 6",
      occupiedPositionsSummary: "1 (double), 2, 7, 8 (double), 9",
      emptyPositionsSummary: "3, 4, 5, 6",
      analysisParagraphs: [
        "In this analytical grid pattern, double occupation of Position 1 (Communication) and Position 8 (Wisdom) operates alongside single occupation of Position 2 (Intuition), Position 7 (Thinking), and Position 9 (Ambition). This establishes strong natural communication intelligence and deep integrated wisdom.",
        "The empty positions highlight developmental growth areas: Position 3 empty (Action) indicates that the primary growth invitation is bridging analytical understanding and decisive practical action. Position 4 empty (Practicality) shows that systematic organizational management requires conscious cultivation. Position 5 empty (Will) indicates that sustained personal determination benefits from deliberate practice, while Position 6 empty (Creativity) highlights original artistic expression as a growth area rather than an innate gift."
      ]
    },
    {
      name: "Pattern Profile B — High Ambition & Communication Density",
      dob: "Analytical Pattern 1-1-3-7-9-9",
      digitsPlotted: "1 (twice), 3, 7, 9 (twice)",
      missingDigits: "2, 4, 5, 6, 8",
      occupiedPositionsSummary: "1 (double), 3, 7, 9 (double)",
      emptyPositionsSummary: "2, 4, 5, 6, 8",
      analysisParagraphs: [
        "This grid pattern features double occupation of Position 1 (Communication) and Position 9 (Ambition), with single occupation of Position 3 (Action) and Position 7 (Thinking). This creates an exceptionally goal-oriented profile with extraordinary natural drive toward significant public achievements.",
        "With five empty positions (2, 4, 5, 6, 8), this pattern represents a person of strong outer-world ambition and communication whose primary growth areas are inward — developing intuitive sensitivity, methodical planning, sustained central willpower, creative art, and experience-tested wisdom."
      ]
    },
    {
      name: "Pattern Profile C — Central Willpower & Multi-Plane Synergy",
      dob: "Analytical Pattern 1-1-4-5-7-8-9",
      digitsPlotted: "1 (twice), 4, 5, 7, 8, 9",
      missingDigits: "2, 3, 6",
      occupiedPositionsSummary: "1 (double), 4, 5, 7, 8, 9",
      emptyPositionsSummary: "2, 3, 6",
      analysisParagraphs: [
        "This pattern reflects a well-balanced grid with six occupied positions, including Position 5 (Will) at the Brahmasthan center. Combined with Position 4 (Practicality), Position 8 (Wisdom), Position 9 (Ambition), and Position 7 (Thinking), it provides broad capability across practical, intellectual, and volitional domains.",
        "Empty positions (2, 3, 6) indicate that intuitive sensitivity, decisive practical action momentum, and creative expression are the primary growth opportunities."
      ]
    },
    {
      name: "Pattern Profile D — Practical Executive & Wisdom Matrix",
      dob: "Analytical Pattern 1-1-3-4-8-8-9",
      digitsPlotted: "1 (twice), 3, 4, 8 (twice), 9",
      missingDigits: "2, 5, 6, 7",
      occupiedPositionsSummary: "1 (double), 3, 4, 8 (double), 9",
      emptyPositionsSummary: "2, 5, 6, 7",
      analysisParagraphs: [
        "This grid profile is characterized by double occupation of Position 8 (Wisdom) and Position 1 (Communication), alongside Position 3 (Action), Position 4 (Practicality), and Position 9 (Ambition). This produces strong practical wisdom and executive momentum.",
        "Missing positions (2, 5, 6, 7) point to growth areas in intuitive sensitivity, central willpower, creative art, and formal analytical theory."
      ]
    }
  ],

  readingSteps: [
    {
      stepNumber: 1,
      title: "Step One — Mapping the Overall Pattern",
      description: "Observe whether the grid is heavily occupied (6+ positions filled, broad capability) or sparsely occupied (concentrated specific gifts). Check regional concentration across top, middle, or bottom rows."
    },
    {
      stepNumber: 2,
      title: "Step Two — Reading Occupied Positions",
      description: "Analyze the density of each filled cell: single occupation = available gift; double occupation = highly developed mastery; triple+ occupation = concentrated force with potential excess."
    },
    {
      stepNumber: 3,
      title: "Step Three — Reading Empty Positions",
      description: "Interpret empty cells not as defects but as developmental growth invitations. Empty positions highlight where earned, deliberate practice produces genuine mastery."
    },
    {
      stepNumber: 4,
      title: "Step Four — Assessing Density and Excess",
      description: "Address high density (3+ occurrences) by guiding conscious management rather than suppression — channeling raw concentrated force into productive outlets."
    },
    {
      stepNumber: 5,
      title: "Step Five — The Complete Grid Reading",
      description: "Synthesize occupied positions, growth invitations, density risks, and plane alignments into a unified, compassionate blueprint of the human soul."
    }
  ],
  specialConfigurations: [
    {
      title: "The Balanced Grid",
      description: "Six or more positions occupied across all rows and columns. Indicates high versatility, broad adaptability, and multi-dimensional talent. The key challenge is developing deep specialization amidst broad competence."
    },
    {
      title: "The Concentrated Grid",
      description: "Three or fewer positions occupied. Represents intense, specialized mastery in specific domains alongside significant growth invitations in empty areas."
    },
    {
      title: "The Grid With Many Repeated Digits",
      description: "High digit clustering (e.g., three 9s or three 1s). Creates extraordinary concentrated power in specific positions, requiring conscious balance to avoid extreme behavioral tendencies."
    },
    {
      title: "The Empty Centre (Position 5 Absent)",
      description: "Absence of Position 5 at the central Brahmasthan. Indicates that core emotional grounding and sustained willpower require deliberate volitional exercise."
    },
    {
      title: "The Fully Empty Grid Region (Missing Lines)",
      description: "An entire row, column, or diagonal completely missing. Forms an Arrow of Absence, highlighting a major thematic developmental focus for the incarnation."
    }
  ],
  commonIndianPatterns: [
    {
      era: "Years 1981-1989",
      pattern: "Strong Position 8 (double 8s in most dates) + Position 1 and 9 typically present. Wisdom + Ambition + Communication dominant."
    },
    {
      era: "Years 1991-1999",
      pattern: "Strong Position 9 (two or three 9s) + Position 1 present. High ambition and public drive. 1999 specifically features triple 9 + triple 1."
    },
    {
      era: "Years 2001-2009",
      pattern: "Position 2 enters as millennium digit. Intuition + Communication form a natural base, enabling more balanced grids."
    },
    {
      era: "20th-29th Day Births",
      pattern: "Always have Position 2 occupied due to tens digit 2 (21st = 2+1, 22nd = double 2, 29th = 2+9)."
    },
    {
      era: "15th Day Births",
      pattern: "Positions 1 and 5 both occupied. Combines natural Communication with central Willpower."
    }
  ]
};

export const CHAPTER_TWENTY_FIVE_THEORY_TEXT = {
  chapterNumber: "Chapter Twenty-Five",
  title: "The Nine Planes of Expression",
  quote: {
    text: "Everything in the universe has a rhythm, everything dances.",
    author: "Maya Angelou"
  },
  introductionText: [
    "The Nine Planes of Expression elevate Lo Shu Grid analysis from individual cell readings to a holistic dimensional science. Where position analysis inspects individual numbers, Plane analysis examines complete horizontal rows, vertical columns, and diagonal axes — revealing the primary channels through which human energy flows.",
    "The nine planes answer a fundamental question: How does an individual's core orientation translate across Thought, Emotion, Action, Will, Spirit, and Creative Expression? Whether a person is a visionary thinker who struggles to execute, or a hands-on builder who operates on gut instinct, the Nine Planes map this dimensional landscape with mathematical precision."
  ],
  planeBalanceScoreConcept: "The Plane Balance Score evaluates the distribution of energy across Horizontal (Mental/Emotional/Practical), Vertical (Spiritual/Will/Thought), and Diagonal (Golden/Silver) axis pairs. Balanced distributions reflect versatile adaptability, whereas concentrated distributions indicate intense specialized focus.",
  lifePathCrossReferenceText: "Comparing Plane alignments with the Life Path Number exposes core soul dynamics. When a Life Path 7 (Seeker of Truth) has an empty Thought Plane (2-7-6), the soul has chosen a path requiring deliberate, earned intellectual cultivation rather than innate, passive ease."
};
