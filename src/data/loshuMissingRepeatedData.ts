// src/data/loshuMissingRepeatedData.ts
// Complete Data for Chapter Twenty-Seven: Missing Numbers and Repeated Numbers in the Grid
// Detailed paragraphs for Missing Numbers 1-9 with full remedies and Repeated Numbers 1-9 with strengths and excess risks. No personal named examples.

export interface MissingNumberDetail {
  number: number;
  name: string;
  gridPosition: string;
  governingElement: string;
  governingBody: string;
  coreMeaning: string;
  manifestationInLife: string;
  professionalAndRelationalImpact: string;
  remedies: {
    practicalGuidance: string[];
    gemstone: string;
    gemstoneUsage: string;
    mantra: string;
    mantraPractice: string;
    dailyHabit: string;
  };
}

export interface RepeatedNumberDetail {
  number: number;
  name: string;
  gridPosition: string;
  governingElement: string;
  governingBody: string;
  coreMeaning: string;
  strengths: string;
  excessRisks: string;
  managementPractices: string[];
}

export const MISSING_NUMBERS_DATA: Record<number, MissingNumberDetail> = {
  1: {
    number: 1,
    name: "Missing Number 1 — The Communication Gap",
    gridPosition: "Position 1 (Bottom Centre - Water Element)",
    governingElement: "Water",
    governingBody: "Sun / Mercury",
    coreMeaning: "Missing Number 1 occurs when the digit 1 does not appear anywhere in the complete birth date. Position 1 governs genuine communication — the capacity to express inner experience in outer form through spoken, written, and relational language. When this position is empty, the individual possesses a rich inner world of thoughts and perceptions but consistently struggles with the specific act of bringing that inner world into clear, confident, transparent outer expression. The gap between internal knowing and external expression is wider than in occupied position 1 grids, requiring conscious cultivation.",
    manifestationInLife: "In social situations, Missing Number 1 produces social hesitancy — not from fear, but from a genuine difficulty with spontaneous verbal self-expression. The individual may know precisely what they wish to say yet find the path from inner awareness to outer speech blocked by self-consciousness. In professional spheres, it manifests as a pattern of being underestimated due to unexpressed capability, while in relationships it can leave partners feeling unable to access the full depth of the individual's inner experience.",
    professionalAndRelationalImpact: "Professional recognition requires conscious efforts to articulate achievements and present ideas assertively. Relational harmony deepens as the individual practices honest self-disclosure and direct emotional communication.",
    remedies: {
      practicalGuidance: [
        "Write daily in a private journal for 10 minutes each morning without editing or censoring to build a bridge between inner thought and outer expression.",
        "Practice one deliberate self-disclosure each day, sharing a genuine feeling or thought with a trusted colleague or friend.",
        "Join a structured public speaking or expressive communication forum to build verbal confidence in a supportive environment."
      ],
      gemstone: "Ruby (Manik) or Sunstone",
      gemstoneUsage: "Set in a gold or copper ring, worn on the ring finger of the right hand on Sunday morning.",
      mantra: "Om Suryaya Namaha",
      mantraPractice: "Chant 108 times at sunrise on Sunday mornings to strengthen the expressive solar presence.",
      dailyHabit: "Read your written journal entries aloud to yourself every evening to bridge the gap between written thought and spoken voice."
    }
  },
  2: {
    number: 2,
    name: "Missing Number 2 — The Intuition Gap",
    gridPosition: "Position 2 (Top Right - Earth / Water Element)",
    governingElement: "Water / Earth",
    governingBody: "Moon",
    coreMeaning: "Missing Number 2 occurs when the digit 2 is absent from the birth date. Position 2 governs intuition — the non-rational, direct perceptive faculty that apprehends subtle emotional undercurrents and unstated dynamics beyond sequential logic. When this cell is empty, the primary cognitive mode is strictly rational and analytical. The individual approaches situations through logical inference rather than felt gut sense, making subtle emotional attunement more effortful.",
    manifestationInLife: "An over-reliance on logic manifests as difficulty in situations that resist linear analysis — interpersonal emotional nuances, non-linear creative choices, and subtle environmental shifts. The person may misread unstated emotional cues in relationships, missing subtle signals until they are explicitly articulated.",
    professionalAndRelationalImpact: "In leadership, it requires deliberate effort to check emotional atmospheres before making purely logical decisions. In relationships, developing active, empathetic listening bridges the gap created by missing innate intuitive attunement.",
    remedies: {
      practicalGuidance: [
        "Practice a daily 3-minute intuition pause before major decisions: notice somatic gut feelings before engaging analytical logic.",
        "Engage in contemplative somatic practices such as mindfulness meditation or yoga to cultivate non-linear awareness.",
        "Study artistic or musical disciplines that require direct emotional engagement rather than intellectual analysis."
      ],
      gemstone: "Natural Pearl (Moti) or Moonstone",
      gemstoneUsage: "Set in a silver ring, worn on the little finger on Monday evening.",
      mantra: "Om Chandraya Namaha",
      mantraPractice: "Chant 108 times on Monday evenings to activate Moon's receptive, intuitive energy.",
      dailyHabit: "Practice 10 minutes of somatic body-scan meditation before sleeping."
    }
  },
  3: {
    number: 3,
    name: "Missing Number 3 — The Action Gap",
    gridPosition: "Position 3 (Middle Left - Wood Element)",
    governingElement: "Wood",
    governingBody: "Mars / Jupiter",
    coreMeaning: "Missing Number 3 occurs when the digit 3 does not appear in the birth date. Position 3 governs decisive, practical, result-oriented action — the specific momentum that converts ideas into tangible physical movement. When empty, the individual may possess visionary ambition and deep wisdom yet experience a distinct gap when making the transition from planning to physical execution.",
    manifestationInLife: "The hesitation before action is one of the most practically impactful patterns of Missing Number 3. The individual can analyze, plan, and intend deeply, but the specific moment of taking the first physical step involves internal friction. Projects may feature extensive, meticulous preparation followed by delayed or tentative launching.",
    professionalAndRelationalImpact: "In career settings, execution momentum is built by breaking goals into tiny micro-steps. In personal life, initiative in starting conversations or taking romantic steps requires intentional practice.",
    remedies: {
      practicalGuidance: [
        "Apply the 5-second rule: count down 5-4-3-2-1 and take immediate physical action on a task before hesitation sets in.",
        "Set one daily 'first action' to be completed within 30 minutes of waking every morning.",
        "Engage in regular rhythmic physical exercise like running or swimming to build physical forward momentum."
      ],
      gemstone: "Red Coral (Moonga)",
      gemstoneUsage: "Set in a silver or copper ring, worn on the ring finger on Tuesday morning.",
      mantra: "Om Mangalaya Namaha",
      mantraPractice: "Chant 108 times on Tuesday mornings for Mars's decisive executive force.",
      dailyHabit: "Complete your single most challenging task first thing in the morning before checking emails."
    }
  },
  4: {
    number: 4,
    name: "Missing Number 4 — The Practicality Gap",
    gridPosition: "Position 4 (Top Left - Wood Element)",
    governingElement: "Wood / Earth",
    governingBody: "Rahu",
    coreMeaning: "Missing Number 4 occurs when the digit 4 is absent from the birth date. Position 4 governs practical planning intelligence, methodical discipline, and systematic management of physical, administrative, and financial dimensions. When empty, the individual resists rigid routine and finds administrative order effortful, preferring visionary or creative activities over routine upkeep.",
    manifestationInLife: "Administrative tasks, detailed paperwork, budgeting, and routine domestic management require conscious willpower. Without external structures, practical affairs can become disorganized. The individual may excel at high-level ideas but struggle with methodical follow-through.",
    professionalAndRelationalImpact: "Requires adopting digital planning tools or partnering with methodical collaborators. Financial stability is maintained by establishing non-negotiable automated routines.",
    remedies: {
      practicalGuidance: [
        "Maintain one non-negotiable daily routine habit at the exact same time every day for 90 days.",
        "Use structured digital calendars and task management apps to externalize organizational memory.",
        "Delegate or partner with highly methodical administrative professionals in business ventures."
      ],
      gemstone: "Hessonite Garnet (Gomed) or Smoky Quartz",
      gemstoneUsage: "Set in silver or panchdhatu, worn on the middle finger on Saturday evening.",
      mantra: "Om Rahave Namaha",
      mantraPractice: "Chant 108 times on Saturday evenings for Rahu's grounding, structuring influence.",
      dailyHabit: "Spend 5 minutes every evening clearing your desk and organizing tomorrow's physical environment."
    }
  },
  5: {
    number: 5,
    name: "Missing Number 5 — The Will Gap",
    gridPosition: "Position 5 (Brahmasthan Centre - Earth Element)",
    governingElement: "Earth",
    governingBody: "Saturn / Mercury",
    coreMeaning: "Missing Number 5 occurs when the digit 5 does not appear in the birth date. Located at the exact center of the Lo Shu Grid, Position 5 governs central willpower, emotional stability, and the unifying force that connects all surrounding planes. When empty, personal energy can scatter across multiple directions, and maintaining sustained determination through extended hardship requires deliberate cultivation.",
    manifestationInLife: "A tendency to initiate multiple projects simultaneously without finishing them is common. The individual carries diverse talents but may struggle with central emotional grounding, experiencing periods of restlessness or feeling easily swayed by external circumstances.",
    professionalAndRelationalImpact: "Because Position 5 impacts four major planes (Will, Silver, Golden, and Emotional), cultivating central willpower provides quadrupled benefits, elevating career focus and emotional stability.",
    remedies: {
      practicalGuidance: [
        "Select one single long-term priority and commit to pursuing it without deviation for 108 consecutive days.",
        "Write your primary daily commitment on paper every morning and sign it as an act of personal authority.",
        "Eliminate non-essential distractions to prevent energy from scattering across too many open loops."
      ],
      gemstone: "Yellow Sapphire (Pukhraj) or Emerald",
      gemstoneUsage: "Worn on the index finger (Thursday) or little finger (Wednesday).",
      mantra: "Om Namah Shivaya",
      mantraPractice: "Chant 108 times daily to build unshakeable central emotional grounding and willpower.",
      dailyHabit: "Wash your face with cold water every morning as a micro-discipline to strengthen central resolve."
    }
  },
  6: {
    number: 6,
    name: "Missing Number 6 — The Creativity Gap",
    gridPosition: "Position 6 (Bottom Right - Metal Element)",
    governingElement: "Metal",
    governingBody: "Venus",
    coreMeaning: "Missing Number 6 occurs when the digit 6 does not appear in the birth date. Position 6 governs genuine creative expression, aesthetic refinement, artistic original flair, and domestic harmony. When empty, the individual may excel at executing or refining existing models but experiences perfectionism or self-doubt when attempting to create original artistic works.",
    manifestationInLife: "The individual may feel hesitant to share creative outputs due to high internal standards that exceed current technical expression. In domestic life, creating harmonious, aesthetically pleasing spaces requires intentional effort rather than happening automatically.",
    professionalAndRelationalImpact: "In career, building creative confidence involves embracing imperfect initial drafts. In personal life, cultivating aesthetic appreciation and surrounding oneself with beauty enhances well-being.",
    remedies: {
      practicalGuidance: [
        "Engage in 20 minutes of daily uninhibited creative practice (sketching, creative writing, music) without judging the outcome.",
        "Study classical aesthetics, design, or fine arts to deepen conscious appreciation for creative form.",
        "Collaborate with highly creative artistic individuals to absorb creative confidence through shared projects."
      ],
      gemstone: "Diamond, White Zircon, or Opal",
      gemstoneUsage: "Set in silver or white gold, worn on the little finger or middle finger on Friday morning.",
      mantra: "Om Shukraya Namaha",
      mantraPractice: "Chant 108 times on Friday mornings for Venus's creative and aesthetic grace.",
      dailyHabit: "Surround your daily working area with fresh flowers, elegant art, or harmonious colors."
    }
  },
  7: {
    number: 7,
    name: "Missing Number 7 — The Thinking Gap",
    gridPosition: "Position 7 (Middle Right - Metal Element)",
    governingElement: "Metal",
    governingBody: "Ketu",
    coreMeaning: "Missing Number 7 occurs when the digit 7 is absent from the birth date. Position 7 governs analytical, philosophical, and investigative thinking — the capacity to hold multi-layered complexity and arrive at deep truth through rigorous inquiry. When empty, the cognitive style leans toward immediate action, practical utility, or intuitive feeling rather than deep theoretical research.",
    manifestationInLife: "The individual may prefer broad, practical knowledge over deep, specialized theoretical investigation. In complex situations, there can be a tendency to accept surface explanations or move to execution before thorough root-cause analysis is complete.",
    professionalAndRelationalImpact: "Developing analytical rigour prevents hasty conclusions. In professional research or strategic roles, deliberate step-by-step logical mapping ensures thoroughness.",
    remedies: {
      practicalGuidance: [
        "Choose one complex subject and conduct deep, primary-source research on it for a full year.",
        "Practice argument mapping: write down all pros, cons, and underlying assumptions before major decisions.",
        "Keep a weekly philosophical journal reflecting deeply on life's underlying principles."
      ],
      gemstone: "Cat's Eye (Lehsunia) or Amethyst",
      gemstoneUsage: "Set in silver ring, worn on the middle finger on Tuesday or Saturday evening.",
      mantra: "Om Ketave Namaha",
      mantraPractice: "Chant 108 times on Tuesday mornings for Ketu's penetrating investigative intellect.",
      dailyHabit: "Read 15 pages of deep, non-fiction technical or philosophical literature daily."
    }
  },
  8: {
    number: 8,
    name: "Missing Number 8 — The Wisdom Gap",
    gridPosition: "Position 8 (Bottom Left - Earth Element)",
    governingElement: "Earth",
    governingBody: "Jupiter",
    coreMeaning: "Missing Number 8 occurs when the digit 8 is absent from the birth date. Position 8 governs integrated, experience-tested wisdom, moral maturity, and long-term financial judgment. When empty, the integration of life lessons occurs gradually through conscious reflection rather than as an innate, effortless gift.",
    manifestationInLife: "Without deliberate reflection, the individual may repeat similar behavioral or relationship patterns before distilling the underlying lesson. Long-term wealth management and institutional building require structured learning.",
    professionalAndRelationalImpact: "Crucial to maintain a weekly reflective journal to digest life experiences. In financial matters, seeking advice from experienced mentors prevents recurring mistakes.",
    remedies: {
      practicalGuidance: [
        "Keep a weekly experience-integration journal: analyze recent challenges and explicitly state the wisdom gained.",
        "Maintain a dedicated pattern-tracking log to identify and break recurring life or relationship habits.",
        "Seek regular guidance from mature, experienced mentors in financial and career planning."
      ],
      gemstone: "Yellow Sapphire (Pukhraj) or Yellow Topaz",
      gemstoneUsage: "Set in gold ring, worn on the index finger on Thursday morning.",
      mantra: "Om Gurave Namaha",
      mantraPractice: "Chant 108 times on Thursday mornings for Jupiter's integrative wisdom.",
      dailyHabit: "Spend 10 minutes every Sunday reviewing the week's decisions and extracting key lessons."
    }
  },
  9: {
    number: 9,
    name: "Missing Number 9 — The Ambition Gap",
    gridPosition: "Position 9 (Top Centre - Fire Element)",
    governingElement: "Fire",
    governingBody: "Sun / Mars",
    coreMeaning: "Missing Number 9 occurs when the digit 9 is absent from the birth date. Position 9 governs ambition, high goal-orientation, public drive, and the aspiration toward significant achievement. When empty, the individual is naturally content in the present moment or focused on personal relationships rather than driven by public acclaim or competitive honors.",
    manifestationInLife: "Formulating long-term 5- or 10-year strategic career goals can feel artificial or uninspiring. The individual operates well within existing organizational frameworks but may lack the burning personal drive to seek public prominence.",
    professionalAndRelationalImpact: "Setting explicit, meaningful goals linked to noble causes provides the missing motivational spark. Embracing healthy competition accelerates career progress.",
    remedies: {
      practicalGuidance: [
        "Formulate a written 5-year vision statement detailing personal, professional, and social aspirations.",
        "Create a visual vision board placed where it is seen daily to stimulate forward-reaching drive.",
        "Engage in community leadership or cause-driven projects to connect personal goals with higher purpose."
      ],
      gemstone: "Ruby (Manik) or Carnelian",
      gemstoneUsage: "Set in gold or copper, worn on the ring finger on Sunday morning.",
      mantra: "Om Suryaya Namaha",
      mantraPractice: "Chant 108 times at sunrise on Sunday mornings to ignite solar aspirational fire.",
      dailyHabit: "Review your 5-year strategic goals for 2 minutes every morning before starting work."
    }
  }
};

export const REPEATED_NUMBERS_DATA: Record<number, RepeatedNumberDetail> = {
  1: {
    number: 1,
    name: "Repeated Number 1 — Concentrated Communication Power",
    gridPosition: "Position 1 (Communication)",
    governingElement: "Water",
    governingBody: "Sun / Mercury",
    coreMeaning: "Appears two or more times in the birth date. Double or triple occurrence of digit 1 creates extraordinary verbal fluency, expressive warmth, and persuasive interpersonal rapport. When present 3x or 4x, communication becomes the dominant defining trait of the personality.",
    strengths: "Natural eloquence, magnetic public speaking, effortless social connection, and the ability to articulate complex concepts clearly and persuasively.",
    excessRisks: "Very high density (3x+) can lead to verbal dominance, talking over others, restless multi-tasking in conversation, or difficulty listening attentively.",
    managementPractices: [
      "Practice intentional active listening: allow others to complete their statements fully before formulating your reply.",
      "Channel abundant communicative energy into structured writing, public speaking, teaching, or media.",
      "Set aside quiet contemplative silence periods daily to balance outward verbal output."
    ]
  },
  2: {
    number: 2,
    name: "Repeated Number 2 — Concentrated Intuitive Power",
    gridPosition: "Position 2 (Intuition)",
    governingElement: "Water / Earth",
    governingBody: "Moon",
    coreMeaning: "Appears two or more times in the birth date. Multiplied occurrence of digit 2 endows the individual with heightened psychic sensitivity, deep empathic resonance, and an instinctive ability to feel emotional dynamics before words are spoken.",
    strengths: "Extraordinary emotional intelligence, genuine empathy, instinctive understanding of human needs, and profound counseling gifts.",
    excessRisks: "Risk of emotional absorption, absorbing surrounding negativity, mood swings, over-sensitivity to criticism, and feeling drained in crowded environments.",
    managementPractices: [
      "Establish energetic boundaries: practice daily clearing visualizations and grounding exercises.",
      "Avoid overly toxic or emotionally chaotic environments when feeling energetically depleted.",
      "Use somatic grounding practices like walking barefoot on earth or salt bath cleansing."
    ]
  },
  3: {
    number: 3,
    name: "Repeated Number 3 — Concentrated Action Power",
    gridPosition: "Position 3 (Action)",
    governingElement: "Wood",
    governingBody: "Mars / Jupiter",
    coreMeaning: "Appears two or more times in the birth date. Multiplied occurrence of digit 3 generates intense executive momentum, rapid decision-making, and a physical drive to initiate projects and shape the external world.",
    strengths: "Decisive leadership, high physical energy, rapid execution, problem-solving under pressure, and dynamic initiative.",
    excessRisks: "Impulsiveness, impatience with slower collaborators, scattered physical momentum, or initiating too many projects without finishing them.",
    managementPractices: [
      "Implement a required 10-minute reflection pause before signing contracts or launching new ventures.",
      "Channel physical energy into regular intense athletic or physical building activities.",
      "Focus executive drive on finishing current open projects before starting new ones."
    ]
  },
  4: {
    number: 4,
    name: "Repeated Number 4 — Concentrated Planning Power",
    gridPosition: "Position 4 (Practicality)",
    governingElement: "Wood / Earth",
    governingBody: "Rahu",
    coreMeaning: "Appears two or more times in the birth date. Double or triple occurrence of digit 4 endows the individual with eagle-eye organizational precision, systematic discipline, and superior administrative capabilities.",
    strengths: "Methodical execution, operational efficiency, structural organization, financial prudence, and relentless attention to detail.",
    excessRisks: "Rigidity, stubbornness, anxiety when routines are disrupted, perfectionism, or over-fixation on minor procedures.",
    managementPractices: [
      "Deliberately introduce one small spontaneous change into your weekly routine to cultivate flexibility.",
      "Practice delegating operational details to team members without micromanaging.",
      "Balance structured work routines with open-ended creative or outdoor recreation."
    ]
  },
  5: {
    number: 5,
    name: "Repeated Number 5 — Concentrated Will Power",
    gridPosition: "Position 5 (Will / Brahmasthan)",
    governingElement: "Earth",
    governingBody: "Saturn / Mercury",
    coreMeaning: "Appears two or more times in the birth date. Multiplied occurrence of digit 5 at the central Brahmasthan produces unshakeable central willpower, profound resilience, and extraordinary perseverance under severe adversity.",
    strengths: "Command over self, unyielding determination, central emotional stability, and the capacity to withstand major life crises.",
    excessRisks: "Stubbornness, resisting necessary course corrections, risk-taking, or uncompromising insistence on personal autonomy.",
    managementPractices: [
      "Distinguish between constructive perseverance and stubborn adherence to an outdated path.",
      "Seek trusted external council when facing major strategic pivots.",
      "Channel intense central drive into high-stakes leadership or long-term institutional building."
    ]
  },
  6: {
    number: 6,
    name: "Repeated Number 6 — Concentrated Creative Power",
    gridPosition: "Position 6 (Creativity)",
    governingElement: "Metal",
    governingBody: "Venus",
    coreMeaning: "Appears two or more times in the birth date. Multiplied occurrence of digit 6 endows the individual with heightened artistic flair, design elegance, deep love for luxury and beauty, and magnetic charm.",
    strengths: "Exceptional artistic craftsmanship, aesthetic refinement, design genius, magnetic social charm, and domestic elegance.",
    excessRisks: "Creative perfectionism leading to paralysis, over-indulgence in luxury, or excessive anxiety over loved ones' well-being.",
    managementPractices: [
      "Embrace imperfect creative drafts and release artistic works without endless revision.",
      "Practice financial moderation regarding luxury and aesthetic expenditures.",
      "Establish healthy emotional boundaries with family members to prevent over-worry."
    ]
  },
  7: {
    number: 7,
    name: "Repeated Number 7 — Concentrated Analytical Power",
    gridPosition: "Position 7 (Thinking)",
    governingElement: "Metal",
    governingBody: "Ketu",
    coreMeaning: "Appears two or more times in the birth date. Multiplied occurrence of digit 7 produces a penetrating intellect, deep technical research capability, and a relentless quest for fundamental truth.",
    strengths: "Profound analytical investigation, technical research mastery, philosophical depth, and sharp discrimination of truth.",
    excessRisks: "Intellectual isolation, skepticism, over-analysis paralysis, cynicism, or detachment from everyday social engagement.",
    managementPractices: [
      "Consciously share research insights in warm, accessible language with non-specialists.",
      "Set time limits on research phases to ensure timely transition into practical application.",
      "Engage in warm social and community activities to balance intellectual isolation."
    ]
  },
  8: {
    number: 8,
    name: "Repeated Number 8 — Concentrated Wisdom Power",
    gridPosition: "Position 8 (Wisdom)",
    governingElement: "Earth",
    governingBody: "Jupiter",
    coreMeaning: "Appears two or more times in the birth date. Multiplied occurrence of digit 8 reflects an old-soul maturity, profound financial judgment, institutional building capability, and deep practical wisdom.",
    strengths: "Exceptional financial judgment, long-term wealth accumulation, moral authority, institutional leadership, and deep life insight.",
    excessRisks: "Carrying heavy burdens of responsibility, workaholism, fatalism, or abstracting wisdom away from immediate practical utility.",
    managementPractices: [
      "Translate high philosophical wisdom into immediate, practical daily steps.",
      "Schedule mandatory periods of rest and leisure to prevent workaholism.",
      "Delegate operational burdens to capable team members."
    ]
  },
  9: {
    number: 9,
    name: "Repeated Number 9 — Concentrated Ambition Power",
    gridPosition: "Position 9 (Ambition)",
    governingElement: "Fire",
    governingBody: "Sun / Mars",
    coreMeaning: "Appears two or more times in the birth date. Multiplied occurrence of digit 9 imparts burning competitive fire, high visibility, charisma, and a relentless drive toward public achievement and leadership.",
    strengths: "Extraordinary aspirational drive, public influence, charismatic leadership, high competitive energy, and visionary ambition.",
    excessRisks: "Restless dissatisfaction, impatience, setting unattainable targets, or feeling unfulfilled despite major accomplishments.",
    managementPractices: [
      "Practice intentional celebration and gratitude for current achievements before rushing to the next target.",
      "Align competitive ambition with broader humanitarian or community service.",
      "Practice daily cooling meditation or breathwork to temper intense inner fire."
    ]
  }
};

export const CHAPTER_TWENTY_SEVEN_THEORY_TEXT = {
  chapterNumber: "Chapter Twenty-Seven",
  title: "Missing Numbers and Repeated Numbers in the Grid",
  quote: {
    text: "In the space between what is present and what is absent, the deepest portrait of the soul is drawn.",
    author: "Lo Shu Commentary"
  },
  introductionText: [
    "The Lo Shu Grid speaks in two voices simultaneously: the voice of presence (the digits present in the birth date) and the voice of absence (the digits that do not appear). In Chapter Twenty-Seven, we explore the exact individual reading of each missing number and each repeated number.",
    "A missing number is never a curse or permanent defect; it is a specifically configured developmental growth invitation. The capacity developed through deliberate, conscious effort often becomes more conscious, ethical, and refined than an innate gift.",
    "Conversely, repeated numbers (appearing 2x, 3x, or more) represent concentrated superpowers. At high densities, they require conscious management to prevent natural strengths from tipping into excess.",
    "By examining both missing numbers and repeated numbers, the numerologist delivers a uniquely tailored intensity profile, complete with acoustic mantras, planetary gemstones, and daily volitional habits."
  ]
};

export interface MissingRepeatedEvaluationResult {
  digitCounts: Record<number, number>;
  missingNumbers: MissingNumberDetail[];
  repeatedNumbers: { detail: RepeatedNumberDetail; count: number }[];
  singleNumbers: number[];
}

export function evaluateMissingAndRepeatedNumbers(
  dob: string,
  driverNum?: number,
  conductorNum?: number
): MissingRepeatedEvaluationResult {
  const digits = dob.replace(/[^0-9]/g, "").split("").map(Number);
  if (driverNum && driverNum >= 1 && driverNum <= 9) digits.push(driverNum);
  if (conductorNum && conductorNum >= 1 && conductorNum <= 9) digits.push(conductorNum);

  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

  digits.forEach(d => {
    if (d >= 1 && d <= 9) {
      counts[d] = (counts[d] || 0) + 1;
    }
  });

  const missingNumbers: MissingNumberDetail[] = [];
  const repeatedNumbers: { detail: RepeatedNumberDetail; count: number }[] = [];
  const singleNumbers: number[] = [];

  for (let num = 1; num <= 9; num++) {
    const cnt = counts[num] || 0;
    if (cnt === 0) {
      if (MISSING_NUMBERS_DATA[num]) {
        missingNumbers.push(MISSING_NUMBERS_DATA[num]);
      }
    } else if (cnt >= 2) {
      if (REPEATED_NUMBERS_DATA[num]) {
        repeatedNumbers.push({ detail: REPEATED_NUMBERS_DATA[num], count: cnt });
      }
    } else {
      singleNumbers.push(num);
    }
  }

  return {
    digitCounts: counts,
    missingNumbers,
    repeatedNumbers,
    singleNumbers
  };
}

