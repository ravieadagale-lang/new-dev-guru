// Data & Analytical Framework for Chapter Thirty-Five: Signature Analysis — Graphology and Numerology United

export interface GraphologyRule {
  id: number;
  title: string;
  category: "Size" | "Slant" | "Baseline" | "Pressure" | "Speed" | "Legibility" | "Strokes" | "Underline" | "Loops" | "Zones" | "Gestalt";
  shortSummary: string;
  detailedReading: {
    options: {
      name: string;
      description: string;
      psychologicalTrait: string;
    }[];
  };
}

export interface SignatureSpecimen {
  id: number;
  title: string;
  signatureText: string;
  visualStyle: string;
  graphologicalTraits: string[];
  chaldeanCalculation: string;
  chaldeanNumber: number;
  chaldeanCompound: number;
  chaldeanCompoundName: string;
  pythagoreanCalculation: string;
  pythagoreanNumber: number;
  isKarmicDebt: boolean;
  verdict: string;
  correctionAdvice: string;
}

export interface SignatureCorrectionStep {
  weekRange: string;
  focusArea: string;
  practiceRoutine: string;
  guidelines: string[];
}

export const GRAPHOLOGY_RULES: GraphologyRule[] = [
  {
    id: 1,
    title: "Rule 1: Overall Size — The Scale of Self-Worth",
    category: "Size",
    shortSummary: "Height of capital letters relative to standard baseline reflects ego size, self-worth, and public ambition.",
    detailedReading: {
      options: [
        { name: "Very Large (> 12mm)", description: "Capital letters above 12mm.", psychologicalTrait: "Exceptional self-confidence, strong ego, leadership orientation; may show arrogance if ungrounded." },
        { name: "Large (8–12mm)", description: "Capitals between 8mm and 12mm.", psychologicalTrait: "Healthy self-confidence, social ease, comfort with public visibility and leadership." },
        { name: "Medium (4–8mm)", description: "Capitals between 4mm and 8mm.", psychologicalTrait: "Balanced self-assessment, appropriate self-awareness, realistic social confidence." },
        { name: "Small (2–4mm)", description: "Capitals between 2mm and 4mm.", psychologicalTrait: "Modesty, introspection, high level of concentration, precision; possible social reserve." },
        { name: "Very Small (< 2mm)", description: "Capitals below 2mm.", psychologicalTrait: "Intense precision orientation, extreme reserve, self-effacement, or suppressed ego." }
      ]
    }
  },
  {
    id: 2,
    title: "Rule 2: Relative Size — Signature vs Regular Handwriting",
    category: "Size",
    shortSummary: "Compares the public persona (signature) against the private self (everyday handwriting).",
    detailedReading: {
      options: [
        { name: "Signature Much Larger", description: "Signature is noticeably bigger than body text.", psychologicalTrait: "Strong public persona larger than private self — performs confidence publicly that may not be felt privately." },
        { name: "Signature Same Size", description: "Signature matches body text in scale.", psychologicalTrait: "Authentic consistency between public persona and private reality — no artificial mask." },
        { name: "Signature Smaller", description: "Signature is smaller than body text.", psychologicalTrait: "Private self is richer than public self — understated public presentation, potential modesty or social reserve." }
      ]
    }
  },
  {
    id: 3,
    title: "Rule 3: Slant — The Emotional Direction",
    category: "Slant",
    shortSummary: "Angle at which signature leans reflects emotional expressiveness and relational warmth.",
    detailedReading: {
      options: [
        { name: "Right Slant (Forward Lean)", description: "Leans forward toward the reader.", psychologicalTrait: "Outward-facing, emotionally expressive, empathetic, seeks connection and social engagement." },
        { name: "Vertical (Upright)", description: "Perpendicular to baseline with no lean.", psychologicalTrait: "Self-controlled, emotionally poised, analytical, thinks before acting, maintains composure." },
        { name: "Left Slant (Backward Lean)", description: "Leans backward away from reader.", psychologicalTrait: "Inward-facing, emotionally reserved, protective, holds back full external expression." },
        { name: "Mixed Slant", description: "Varying slants across letters.", psychologicalTrait: "Emotional variability, mood fluctuation, creative spontaneity or inner conflict." }
      ]
    }
  },
  {
    id: 4,
    title: "Rule 4: Baseline — Emotional Stability & Future Outlook",
    category: "Baseline",
    shortSummary: "Trajectory of signature across the page reveals mood stability and future optimism.",
    detailedReading: {
      options: [
        { name: "Rising Baseline", description: "Moves upward from left to right.", psychologicalTrait: "Optimism, ambition, forward-looking orientation, enthusiasm, vital drive." },
        { name: "Level Baseline", description: "Stays flat parallel to horizontal.", psychologicalTrait: "Emotional stability, grounded reliability, consistency, steady perseverance." },
        { name: "Falling Baseline", description: "Moves downward from left to right.", psychologicalTrait: "Realism tipping into fatigue, temporary disappointment, pessimism, or loss of motivation." },
        { name: "Wavy Baseline", description: "Undulates up and down.", psychologicalTrait: "Variable mood, creative adaptability, emotional fluidity." }
      ]
    }
  },
  {
    id: 5,
    title: "Rule 5: Pressure — Vitality and Willpower",
    category: "Pressure",
    shortSummary: "Indentation and stroke thickness indicate physical vitality, will, and emotional depth.",
    detailedReading: {
      options: [
        { name: "Heavy Pressure", description: "Deep paper indentation, thick ink.", psychologicalTrait: "Strong vitality, intense commitment, deep emotional engagement, resolute willpower." },
        { name: "Medium Pressure", description: "Clear indentation, steady stroke.", psychologicalTrait: "Balanced vitality, healthy endurance, practical commitment." },
        { name: "Light Pressure", description: "Gentle surface stroke, thin line.", psychologicalTrait: "Sensitivity, refined perception, aesthetic orientation, gentle approach." }
      ]
    }
  },
  {
    id: 6,
    title: "Rule 6: Speed — Pace of Mental Processing",
    category: "Speed",
    shortSummary: "Fluency and movement speed indicate mental agility and spontaneous confidence.",
    detailedReading: {
      options: [
        { name: "Fast & Fluid", description: "Smooth, rapid, unbroken flow.", psychologicalTrait: "Quick mind, decisive, strong natural confidence in public expression." },
        { name: "Medium Speed", description: "Deliberate yet smooth pace.", psychologicalTrait: "Balanced processing, reflects before expressing, solid reliability." },
        { name: "Slow & Labored", description: "Careful, cautious, heavy strokes.", psychologicalTrait: "Methodical, cautious, perfectionist; potential anxiety or deliberate hesitation." }
      ]
    }
  },
  {
    id: 7,
    title: "Rule 7: Legibility — Transparency vs Concealment",
    category: "Legibility",
    shortSummary: "Degree of readability reveals transparency in public communication.",
    detailedReading: {
      options: [
        { name: "Fully Legible", description: "Every letter clearly readable.", psychologicalTrait: "Transparency, openness, directness — presents authentic self without concealment." },
        { name: "Partially Legible", description: "First name/initials clear, rest stylized.", psychologicalTrait: "Selective transparency — balances public accessibility with appropriate privacy." },
        { name: "Completely Illegible", description: "Abstract scribble or stylized wave.", psychologicalTrait: "High public confidence (feels no need to spell name out) or deliberate security/concealment." }
      ]
    }
  },
  {
    id: 8,
    title: "Rule 8: Starting Stroke — How the Writer Initiates",
    category: "Strokes",
    shortSummary: "First movement before letters begin reveals approach to new beginnings.",
    detailedReading: {
      options: [
        { name: "Direct Beginning", description: "Starts directly with first letter.", psychologicalTrait: "Direct, efficient, forward-focused; gets straight to the point without preamble." },
        { name: "Long Leftward Stroke", description: "Stroke starts far left before first letter.", psychologicalTrait: "Strong connection to tradition and past experience; needs preparation time." },
        { name: "Graceful Curve", description: "Smooth aesthetic entry curve.", psychologicalTrait: "Charm, warmth, aesthetic sensibility in initiating relationships." }
      ]
    }
  },
  {
    id: 9,
    title: "Rule 9: Ending Stroke — How the Writer Concludes",
    category: "Strokes",
    shortSummary: "Final movement after letters reveals generosity and follow-through.",
    detailedReading: {
      options: [
        { name: "Rightward Reaching", description: "Extends far to the right toward reader.", psychologicalTrait: "Generosity, outward social reach, interest in others, communicative warmth." },
        { name: "Upward Curling", description: "Curls gracefully upward at end.", psychologicalTrait: "Ambition, aspiration, optimism, spiritual reaching." },
        { name: "Abrupt Termination", description: "Stops abruptly with no trailing stroke.", psychologicalTrait: "Decisive, pragmatic, clean endings without sentimentality." },
        { name: "Terminal Dot (.)", description: "Decisive period/dot at the end.", psychologicalTrait: "Finality, stubborn resolve, strong memory, decisive closure." }
      ]
    }
  },
  {
    id: 10,
    title: "Rule 10: Underlining — Self-Affirmation & Authority",
    category: "Underline",
    shortSummary: "Line drawn under signature shows self-reliance and authority assertion.",
    detailedReading: {
      options: [
        { name: "Single Clean Line", description: "One simple line under signature.", psychologicalTrait: "Healthy self-affirmation, healthy pride, comfortable authority — most balanced form." },
        { name: "Double Line", description: "Two parallel lines below.", psychologicalTrait: "Strong need for recognition, elevated self-affirmation, protective authority." },
        { name: "No Underline", description: "No line underneath.", psychologicalTrait: "Secure self-concept requiring no artificial reinforcement or external show." },
        { name: "Crossing Line", description: "Line cuts through the signature text.", psychologicalTrait: "Self-sabotage pattern, subconscious tendency to undermine own authority." }
      ]
    }
  },
  {
    id: 11,
    title: "Rule 11: Loops in Ascenders and Descenders",
    category: "Loops",
    shortSummary: "Upper loops reflect imagination; lower loops reflect physical and financial drives.",
    detailedReading: {
      options: [
        { name: "Large Upper Loops (l, h, k)", description: "Tall, open upper loops.", psychologicalTrait: "Rich imagination, high ideals, creative vision, philosophical mind." },
        { name: "Large Lower Loops (g, y, p)", description: "Deep, wide lower loops.", psychologicalTrait: "Strong physical vitality, financial drive, material ambition, material focus." },
        { name: "Balanced Loops", description: "Moderate loops in both zones.", psychologicalTrait: "Harmonious integration of ideals, social engagement, and practical execution." }
      ]
    }
  },
  {
    id: 12,
    title: "Rule 12: Letter Connectivity — Logic vs Intuition",
    category: "Gestalt",
    shortSummary: "Connected vs disconnected letters show sequential logic vs intuitive leaps.",
    detailedReading: {
      options: [
        { name: "All Connected", description: "Flowing cursive with no pen lifts.", psychologicalTrait: "Sequential logic, methodical reasoning, strong follow-through." },
        { name: "All Disconnected (Print)", description: "Separate block or print letters.", psychologicalTrait: "Independent thinking, technical clarity, intuitive perception, original mind." },
        { name: "Mixed Connection", description: "Some letters joined, some separate.", psychologicalTrait: "Integration of logical reasoning with sudden intuitive insights." }
      ]
    }
  },
  {
    id: 13,
    title: "Rule 13: Capital Letter Proportion",
    category: "Size",
    shortSummary: "Initial capital height compared to lowercase letters.",
    detailedReading: {
      options: [
        { name: "Prominent Oversized Capital", description: "Capital is 3x or 4x taller than lowercase.", psychologicalTrait: "Desire for public distinction, strong ego presence, executive ambition." },
        { name: "Proportional Capital", description: "Capital is 2x taller than lowercase.", psychologicalTrait: "Harmonious balance between self-respect and modesty." },
        { name: "Small/Lowercase Capital", description: "Capital is same height as lowercase.", psychologicalTrait: "Unusual modesty, self-effacement, or non-conformist orientation." }
      ]
    }
  },
  {
    id: 14,
    title: "Rule 14: Dominant Zones (Upper, Middle, Lower)",
    category: "Zones",
    shortSummary: "Focus area across Mental (Upper), Social (Middle), and Material (Lower) planes.",
    detailedReading: {
      options: [
        { name: "Upper Zone Dominant", description: "Tall ascenders dominate page.", psychologicalTrait: "Idealistic, intellectual, spiritual, visionary focus." },
        { name: "Middle Zone Dominant", description: "Central letter bodies dominate.", psychologicalTrait: "Socially attuned, emotionally engaged, present-moment practical focus." },
        { name: "Lower Zone Dominant", description: "Deep descenders dominate page.", psychologicalTrait: "Materially driven, financial focus, physical vitality, grounded execution." }
      ]
    }
  },
  {
    id: 15,
    title: "Rule 15: Elaboration vs Simplicity",
    category: "Gestalt",
    shortSummary: "Degree of ornamentation, flourishes, and decorative additions.",
    detailedReading: {
      options: [
        { name: "Clean Simplicity", description: "Only essential letter strokes.", psychologicalTrait: "High maturity, genuine confidence, uncluttered efficiency, direct authenticity." },
        { name: "Moderate Decoration", description: "A few stylistic flourishes.", psychologicalTrait: "Normal artistic self-expression and personal branding." },
        { name: "Excessive Elaboration", description: "Multiple swirls, circles, flourishes.", psychologicalTrait: "Overcompensation for inner insecurity, theatrical need for attention." }
      ]
    }
  },
  {
    id: 16,
    title: "Rule 16: Consistency Across Documents",
    category: "Gestalt",
    shortSummary: "Stability of signature across multiple signings.",
    detailedReading: {
      options: [
        { name: "Highly Consistent", description: "Signature looks identical every time.", psychologicalTrait: "Stable character, reliable identity, predictable composure." },
        { name: "Moderately Variable", description: "Slight natural variations.", psychologicalTrait: "Normal human mood adaptation and contextual flexibility." },
        { name: "Highly Unstable", description: "Completely different style each time.", psychologicalTrait: "Internal identity flux, emotional instability, or adaptive role-playing." }
      ]
    }
  },
  {
    id: 17,
    title: "Rule 17: The 't'-Bar and 'i'-Dots — Will & Precision",
    category: "Strokes",
    shortSummary: "Placement of t-crossings and i-dots indicates ambition and attention to detail.",
    detailedReading: {
      options: [
        { name: "High & Firm 't'-Bar", description: "Crossed high on stem with strong pressure.", psychologicalTrait: "High ambition, strong willpower, lofty goals." },
        { name: "Precise Centered 'i'-Dots", description: "Dots placed directly above stem.", psychologicalTrait: "Meticulous memory, sharp attention to detail, accuracy." },
        { name: "Missing 't'-Bar / 'i'-Dots", description: "Omitted cross strokes or dots.", psychologicalTrait: "Impatience, haste, neglect of minor details." }
      ]
    }
  },
  {
    id: 18,
    title: "Rule 18: Encircled Signature — The Protection Impulse",
    category: "Gestalt",
    shortSummary: "Signature enclosed in a loop or circular boundary.",
    detailedReading: {
      options: [
        { name: "Fully Enclosed in Circle/Oval", description: "Loop drawn entirely around signature.", psychologicalTrait: "Strong self-protective barrier, guardedness, need for extreme privacy due to past vulnerability." },
        { name: "Open Arc / Shield", description: "Partial curve underneath or above.", psychologicalTrait: "Selective self-protection and boundary awareness." }
      ]
    }
  },
  {
    id: 19,
    title: "Rule 19: Cursive vs Block Print Formations",
    category: "Legibility",
    shortSummary: "Use of flowing script vs separate block letters.",
    detailedReading: {
      options: [
        { name: "Flowing Cursive Script", description: "Joined letters flowing continuously.", psychologicalTrait: "Social grace, associative thinking, communicative ease." },
        { name: "Block / Print Capitals", description: "All printed capital letters.", psychologicalTrait: "Technical precision, analytical clarity, desire for crisp un-misinterpretable authority." }
      ]
    }
  },
  {
    id: 20,
    title: "Rule 20: Illegible Signature with Clear Handwriting",
    category: "Legibility",
    shortSummary: "Contrast between readable body writing and unreadable signature.",
    detailedReading: {
      options: [
        { name: "Clear Body + Illegible Signature", description: "Body text easy to read, signature scribble.", psychologicalTrait: "Public persona is guarded/authoritative, while private self is open and transparent." }
      ]
    }
  },
  {
    id: 21,
    title: "Rule 21: Descenders Penetrating Lower Zone",
    category: "Zones",
    shortSummary: "Long downward extensions below the baseline.",
    detailedReading: {
      options: [
        { name: "Deep Descenders Returning Upward", description: "Long tail going deep down and looping back.", psychologicalTrait: "Grounded material drive, financial stamina, healthy physical energy." }
      ]
    }
  },
  {
    id: 22,
    title: "Rule 22: Ascenders Reaching Upper Zone",
    category: "Zones",
    shortSummary: "Tall upward extensions above the top line.",
    detailedReading: {
      options: [
        { name: "Tall Clean Ascenders", description: "Loops reaching high into upper space.", psychologicalTrait: "High intellectual curiosity, spiritual aspiration, visionary idealism." }
      ]
    }
  },
  {
    id: 23,
    title: "Rule 23: Overall Gestalt — Integrated Presence",
    category: "Gestalt",
    shortSummary: "Holistic visual harmony and energy of the complete signature.",
    detailedReading: {
      options: [
        { name: "Harmonious & Alive Gestalt", description: "Flows gracefully with natural poise.", psychologicalTrait: "Inner alignment, authentic self-confidence, integrated personality." },
        { name: "Constricted / Contorted Gestalt", description: "Tense, overcrowded, or forced.", psychologicalTrait: "Inner friction, anxiety, self-doubt, or conflict between public role and inner self." }
      ]
    }
  }
];

export const FIFTEEN_SIGNATURE_SPECIMENS: SignatureSpecimen[] = [
  {
    id: 1,
    title: "Specimen 1: The Confident Pioneer",
    signatureText: "Arjun",
    visualStyle: "Large cursive, rising baseline, single clean underline",
    graphologicalTraits: [
      "Large capital (10mm)",
      "Strong right slant (30°)",
      "Gently rising baseline",
      "Medium-heavy pressure",
      "Rightward reaching ending stroke",
      "Single clean underline"
    ],
    chaldeanCalculation: "A(1) + R(2) + J(1) + U(6) + N(5) = 15",
    chaldeanNumber: 6,
    chaldeanCompound: 15,
    chaldeanCompoundName: "The Magnetic Communicator",
    pythagoreanCalculation: "A(1) + R(9) + J(1) + U(3) + N(5) = 19 -> 1",
    pythagoreanNumber: 1,
    isKarmicDebt: false,
    verdict: "Auspicious & Powerful. Compound 15 broadcasts magnetic personal warmth, while Pythagorean 1 adds pioneering authority.",
    correctionAdvice: "Maintain current signature! It is balanced, confident, and vibrationally magnetic."
  },
  {
    id: 2,
    title: "Specimen 2: The Reserved Scholar",
    signatureText: "A.S.",
    visualStyle: "Small printed initials, vertical slant, level baseline",
    graphologicalTraits: [
      "Small size (4mm)",
      "Upright vertical slant",
      "Level baseline",
      "Light-medium pressure",
      "No underline",
      "Printed block capitals"
    ],
    chaldeanCalculation: "A(1) + S(3) = 4",
    chaldeanNumber: 4,
    chaldeanCompound: 4,
    chaldeanCompoundName: "The Methodical Builder",
    pythagoreanCalculation: "A(1) + S(1) = 2",
    pythagoreanNumber: 2,
    isKarmicDebt: false,
    verdict: "High intellectual precision and modesty. Indicates emotional self-control and analytical focus.",
    correctionAdvice: "If public visibility or executive leadership is desired, consider adding first name to expand public projection."
  },
  {
    id: 3,
    title: "Specimen 3: The Authority Figure (Caution)",
    signatureText: "SHARMA",
    visualStyle: "Very large surname in block capitals, heavy pressure, double underline",
    graphologicalTraits: [
      "Very large capital (15mm)",
      "Left slant / guarded",
      "Very heavy pressure",
      "Double heavy underline",
      "Ends abruptly"
    ],
    chaldeanCalculation: "S(3) + H(5) + A(1) + R(2) + M(4) + A(1) = 16",
    chaldeanNumber: 7,
    chaldeanCompound: 16,
    chaldeanCompoundName: "The Shattered Citadel (Karmic Debt 16)",
    pythagoreanCalculation: "S(1) + H(8) + A(1) + R(9) + M(4) + A(1) = 24 -> 6",
    pythagoreanNumber: 6,
    isKarmicDebt: true,
    verdict: "CAUTION! Compound 16 carries the Karmic Debt of sudden reversal and structural collapse. Large size overcompensates for inner guardedness.",
    correctionAdvice: "CORRECTION REQUIRED: Change signature to 'A. Sharma' (adds A=1, shifting total Chaldean compound from 16 to 17 - Star of the Magi!)."
  },
  {
    id: 4,
    title: "Specimen 4: The Warm Nurturer",
    signatureText: "Kavitha Nair",
    visualStyle: "Full name in flowing cursive, right slant, gently rising baseline",
    graphologicalTraits: [
      "Medium-large size (8mm)",
      "Strong right slant (35°)",
      "Gently rising baseline",
      "Long rightward ending stroke",
      "Single simple underline"
    ],
    chaldeanCalculation: "Kavitha (20/2) + Nair (9) = 29 -> 11 -> 2",
    chaldeanNumber: 2,
    chaldeanCompound: 29,
    chaldeanCompoundName: "Grace Under Pressure & Master Illumination 11",
    pythagoreanCalculation: "Kavitha (38/11) + Nair (22) = 33 -> 6",
    pythagoreanNumber: 6,
    isKarmicDebt: false,
    verdict: "Extraordinary relational warmth and spiritual illumination (Master 11 & Master 33 vibrations!).",
    correctionAdvice: "Outstanding signature for counseling, teaching, healing, and leadership."
  },
  {
    id: 5,
    title: "Specimen 5: The Ambitious Executive",
    signatureText: "Vikram M.",
    visualStyle: "Large first name + initial, vertical, terminal dot, bold underline",
    graphologicalTraits: [
      "Large size (11mm)",
      "Vertical slant",
      "Heavy pressure",
      "Decisive terminal dot at end",
      "Single bold underline"
    ],
    chaldeanCalculation: "Vikram (16) + M (4) = 20 -> 2",
    chaldeanNumber: 2,
    chaldeanCompound: 20,
    chaldeanCompoundName: "The Awakening",
    pythagoreanCalculation: "Vikram (35/8) + M (4) = 12 -> 3",
    pythagoreanNumber: 3,
    isKarmicDebt: false,
    verdict: "Without 'M.', 'Vikram' alone sums to 16 (Karmic Debt). Adding 'M.' elevates it to 20 (The Awakening), transforming its energy completely!",
    correctionAdvice: "Always include the 'M.' initial to prevent activating the 16 compound."
  },
  {
    id: 6,
    title: "Specimen 6: The Creative Communicator (Caution)",
    signatureText: "Priya",
    visualStyle: "Elaborate initial flourish, left slant, double decorative underline",
    graphologicalTraits: [
      "Medium size (7mm)",
      "Slight left slant (guarded)",
      "Elaborate starting flourish",
      "Double underline with loop",
      "Upper zone dominant"
    ],
    chaldeanCalculation: "P(8) + R(2) + I(1) + Y(1) + A(1) = 13",
    chaldeanNumber: 4,
    chaldeanCompound: 13,
    chaldeanCompoundName: "Karmic Debt of Work & Completion Obstacles",
    pythagoreanCalculation: "P(7) + R(9) + I(9) + Y(7) + A(1) = 33 -> 6",
    pythagoreanNumber: 6,
    isKarmicDebt: true,
    verdict: "CAUTION! Chaldean 13 creates unexpected obstacles and delays in completion despite creative talent.",
    correctionAdvice: "CORRECTION REQUIRED: Add surname initial (e.g., 'Priya M.' = 13 + 4 = 17 - Star of the Magi) and simplify initial flourish."
  },
  {
    id: 7,
    title: "Specimen 7: The Spiritual Teacher",
    signatureText: "R.A. ~wave~",
    visualStyle: "Initials followed by rising flowing wave mark, light pressure",
    graphologicalTraits: [
      "Medium-small initials (6mm)",
      "Rising wave mark",
      "Light-medium pressure",
      "No underline",
      "Spiritual wave flow"
    ],
    chaldeanCalculation: "R(2) + A(1) = 3",
    chaldeanNumber: 3,
    chaldeanCompound: 3,
    chaldeanCompoundName: "Joyful Creative Expression",
    pythagoreanCalculation: "R(9) + A(1) = 10 -> 1",
    pythagoreanNumber: 1,
    isKarmicDebt: false,
    verdict: "Demonstrates exceptional self-confidence and spiritual aspiration. The rising wave signifies elevated wisdom.",
    correctionAdvice: "Highly harmonious for spiritual guides, authors, and philosophers."
  },
  {
    id: 8,
    title: "Specimen 8: The Insecure Achiever (Caution)",
    signatureText: "Rahul K.",
    visualStyle: "Oversized, heavy pressure, ornamental flourishes, triple underline",
    graphologicalTraits: [
      "Oversized (> 16mm)",
      "Very heavy pressure",
      "Elaborate flourishes",
      "Triple underline with loops",
      "Exaggerated strokes"
    ],
    chaldeanCalculation: "Rahul (17) + K (2) = 19",
    chaldeanNumber: 1,
    chaldeanCompound: 19,
    chaldeanCompoundName: "The Prince of Heaven / Karmic Debt of Isolation",
    pythagoreanCalculation: "Rahul (22) + K (2) = 24 -> 6",
    pythagoreanNumber: 6,
    isKarmicDebt: true,
    verdict: "CAUTION! Oversized decorative signature overcompensates for inner fragility. Compound 19 causes feelings of isolation.",
    correctionAdvice: "CORRECTION REQUIRED: Reduce size to 9mm, remove triple underline, simplify flourishes, and shift letter count."
  },
  {
    id: 9,
    title: "Specimen 9: The Methodical Builder",
    signatureText: "Mehta",
    visualStyle: "Medium size surname, vertical, level baseline, direct start and end",
    graphologicalTraits: [
      "Medium size (7mm)",
      "Vertical upright slant",
      "Level baseline",
      "Direct beginning & ending",
      "Single clean underline"
    ],
    chaldeanCalculation: "M(4) + E(5) + H(5) + T(4) + A(1) = 19",
    chaldeanNumber: 1,
    chaldeanCompound: 19,
    chaldeanCompoundName: "Karmic Debt 19 (When signed alone)",
    pythagoreanCalculation: "M(4) + E(5) + H(8) + T(2) + A(1) = 20 -> 2",
    pythagoreanNumber: 2,
    isKarmicDebt: true,
    verdict: "Solid, reliable, methodical character. Signing surname alone activates 19 Karmic Debt.",
    correctionAdvice: "Add first initial: 'D. Mehta' = 4 + 19 = 23 (The Royal Star of the Lion - highly auspicious!)."
  },
  {
    id: 10,
    title: "Specimen 10: The Natural Leader",
    signatureText: "Sunita",
    visualStyle: "Large first name, rising baseline, bold extended underline",
    graphologicalTraits: [
      "Large size (10mm)",
      "Moderate right slant",
      "Rising baseline",
      "Bold extended underline",
      "Generous ending stroke"
    ],
    chaldeanCalculation: "S(3) + U(6) + N(5) + I(1) + T(4) + A(1) = 20",
    chaldeanNumber: 2,
    chaldeanCompound: 20,
    chaldeanCompoundName: "The Awakening",
    pythagoreanCalculation: "S(1) + U(3) + N(5) + I(9) + T(2) + A(1) = 21",
    pythagoreanNumber: 3,
    isKarmicDebt: false,
    verdict: "Outstanding! Pythagorean 21 is 'The Crown of the Magi', indicating high honors, advancement, and natural leadership.",
    correctionAdvice: "Excellent signature! Keep as is."
  },
  {
    id: 11,
    title: "Specimen 11: The Artistic Creative",
    signatureText: "N.K.",
    visualStyle: "Stylized initials, strong right slant, upward curling ending",
    graphologicalTraits: [
      "Medium-small size (6mm)",
      "Strong right slant (40°)",
      "Light-medium pressure",
      "Upward curling ending",
      "Artistic entry flourish"
    ],
    chaldeanCalculation: "N(5) + K(2) = 7",
    chaldeanNumber: 7,
    chaldeanCompound: 7,
    chaldeanCompoundName: "Specialist Depth & Analytical Wisdom",
    pythagoreanCalculation: "N(5) + K(2) = 7",
    pythagoreanNumber: 7,
    isKarmicDebt: false,
    verdict: "Perfect alignment between Chaldean and Pythagorean 7. Demonstrates deep specialist insight and aesthetic refinement.",
    correctionAdvice: "Ideal for designers, researchers, and creative specialists."
  },
  {
    id: 12,
    title: "Specimen 12: The Suppressed Self (Caution)",
    signatureText: "deepa",
    visualStyle: "Very small, all lowercase, leftward slant, falling baseline",
    graphologicalTraits: [
      "Very small size (2-3mm)",
      "All lowercase letters",
      "Leftward backward slant",
      "Falling baseline",
      "Very light pressure, no underline"
    ],
    chaldeanCalculation: "D(4) + E(5) + E(5) + P(8) + A(1) = 23",
    chaldeanNumber: 5,
    chaldeanCompound: 23,
    chaldeanCompoundName: "The Royal Star of the Lion",
    pythagoreanCalculation: "D(4) + E(5) + E(5) + P(7) + A(1) = 22 -> 4",
    pythagoreanNumber: 4,
    isKarmicDebt: false,
    verdict: "Remarkable contrast! Chaldean compound 23 is royal and powerful, but graphology shows severe self-suppression and low self-worth.",
    correctionAdvice: "CORRECTION REQUIRED: Capitalize initial 'D', increase size to 8mm, write on rising baseline, and add a single clean underline."
  },
  {
    id: 13,
    title: "Specimen 13: The Protective Encircler (Caution)",
    signatureText: "Rohit",
    visualStyle: "Enclosed within a drawn oval loop, internal underline",
    graphologicalTraits: [
      "Enclosed in oval loop",
      "Medium size (8mm)",
      "Level baseline",
      "Internal underline",
      "Guarded boundaries"
    ],
    chaldeanCalculation: "R(2) + O(7) + H(5) + I(1) + T(4) = 19",
    chaldeanNumber: 1,
    chaldeanCompound: 19,
    chaldeanCompoundName: "Karmic Debt 19 of Isolation",
    pythagoreanCalculation: "R(9) + O(6) + H(8) + I(9) + T(2) = 34 -> 7",
    pythagoreanNumber: 7,
    isKarmicDebt: true,
    verdict: "The drawn circle creates a psychological barrier around identity. Combined with 19 Karmic Debt, it isolates the writer from opportunities.",
    correctionAdvice: "CORRECTION REQUIRED: Remove the encircling loop and add surname initial (e.g., 'Rohit K.' = 19 + 2 = 21 Crown of the Magi!)."
  },
  {
    id: 14,
    title: "Specimen 14: The Business Authority",
    signatureText: "Anand Shah",
    visualStyle: "Full name, large capitals, bold double underline, terminal dots",
    graphologicalTraits: [
      "Large size (11mm)",
      "Vertical slant",
      "Heavy pressure",
      "Bold double underline",
      "Decisive terminal dot"
    ],
    chaldeanCalculation: "Anand (16) + Shah (14) = 30 -> 3",
    chaldeanNumber: 3,
    chaldeanCompound: 30,
    chaldeanCompoundName: "The Loner / Thoughtful Communication",
    pythagoreanCalculation: "Anand (22) + Shah (18) = 40 -> 4",
    pythagoreanNumber: 4,
    isKarmicDebt: false,
    verdict: "IMPORTANT! Individually, 'Anand' = 16 and 'Shah' = 14 (both Karmic Debts). Together, 'Anand Shah' = 30 (neutralizing both debts!).",
    correctionAdvice: "CRITICAL: Always sign BOTH names together. Never sign 'Anand' or 'Shah' alone."
  },
  {
    id: 15,
    title: "Specimen 15: The Master Signature (Optimally Corrected)",
    signatureText: "A. Verma",
    visualStyle: "Medium-large first initial + surname, moderate right slant, rising baseline, clean underline",
    graphologicalTraits: [
      "Medium-large size (9mm)",
      "Moderate right slant (20°)",
      "Gently rising baseline",
      "Medium-heavy pressure",
      "Long rightward ending stroke",
      "Single clean bold underline"
    ],
    chaldeanCalculation: "A(1) + Verma(18) = 19 (Adjusted with middle name 'A.K. Verma' = 1 + 2 + 18 = 21)",
    chaldeanNumber: 3,
    chaldeanCompound: 21,
    chaldeanCompoundName: "The Crown of the Magi",
    pythagoreanCalculation: "A(1) + K(2) + Verma(28) = 31 -> 4",
    pythagoreanNumber: 4,
    isKarmicDebt: false,
    verdict: "GOLD STANDARD SIGNATURE! Perfectly balanced graphologically and numerologically with Compound 21 (Crown of the Magi).",
    correctionAdvice: "The archetype of an optimal professional signature."
  }
];

export const EIGHT_WEEK_CORRECTION_PROTOCOL: SignatureCorrectionStep[] = [
  {
    weekRange: "Weeks 1–2",
    focusArea: "Pattern Unlearning & Conscious Formation",
    practiceRoutine: "Write corrected signature 50 times daily in dedicated practice journal.",
    guidelines: [
      "Write slowly and deliberately; focus on capital letter height (8–10mm).",
      "Ensure a gentle 20° right slant and rising baseline (10–15° angle).",
      "Do NOT use on legal/official documents yet while habit is forming."
    ]
  },
  {
    weekRange: "Weeks 3–4",
    focusArea: "Rhythm & Neuromuscular Flow",
    practiceRoutine: "Increase to 100 times daily practice sessions.",
    guidelines: [
      "Increase speed while maintaining clean letter connections.",
      "Incorporate single clean underline and rightward ending stroke.",
      "Begin using on informal documents, personal notes, and internal memos."
    ]
  },
  {
    weekRange: "Weeks 5–6",
    focusArea: "Identity Integration & Subconscious Alignment",
    practiceRoutine: "50 times daily practice with meditative intention.",
    guidelines: [
      "Connect with the mental state of self-worth, leadership, and security while signing.",
      "Begin using on semi-official emails, business receipts, and agreements.",
      "Ensure baseline stays consistently rising even when signing rapidly."
    ]
  },
  {
    weekRange: "Weeks 7–8",
    focusArea: "Full Official Transition & Lock-In",
    practiceRoutine: "25 times daily practice + full official adoption.",
    guidelines: [
      "Update official banking records, government IDs, passports, and contracts.",
      "The new signature is now fully integrated into the subconscious motor memory.",
      "Observe positive shifts in confidence, public recognition, and business flow."
    ]
  }
];
