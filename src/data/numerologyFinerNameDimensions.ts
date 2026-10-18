// src/data/numerologyFinerNameDimensions.ts
// Chapter Twelve: Hidden Passion, Cornerstone, Capstone & First Vowel Analysis
// Full comprehensive reference for Finer Dimensions of Name Numerology without personal case study examples.

export interface HiddenPassionAnalysis {
  number: number;
  title: string;
  keywords: string[];
  definition: string;
  soulIntensity: string;
  shadow: string;
  developmentalPractice: string;
  detailedParagraphs: string[];
}

export interface CornerstoneAnalysis {
  letter: string;
  chaldeanValue: number;
  pythagoreanValue: number;
  elementalType: "Vowel" | "Consonant";
  title: string;
  approachToBeginning: string;
  detailedParagraphs: string[];
}

export interface CapstoneAnalysis {
  letter: string;
  chaldeanValue: number;
  pythagoreanValue: number;
  title: string;
  completionStyle: string;
  detailedParagraphs: string[];
}

export interface FirstVowelAnalysis {
  letter: string;
  chaldeanValue: number;
  pythagoreanValue: number;
  title: string;
  emotionalDefault: string;
  strength: string;
  shadow: string;
  developmentalPractice: string;
  detailedParagraphs: string[];
}

export interface FinerDimensionsTheoryData {
  title: string;
  subtitle: string;
  quote: {
    text: string;
    author: string;
  };
  introParagraphs: string[];
  fourDimensionsBreakdown: {
    hiddenPassionRole: string;
    cornerstoneRole: string;
    capstoneRole: string;
    firstVowelRole: string;
  };
}

export const FINER_DIMENSIONS_THEORY: FinerDimensionsTheoryData = {
  title: "Hidden Passion, Cornerstone, Capstone & First Vowel Analysis",
  subtitle: "The Finer Dimensions of the Name — Focused Intensity, Openings, Closures, and Emotional Defaults",
  quote: {
    text: "In every human heart there is a secret nerve that answers to the vibrations of beauty.",
    author: "Christopher Morley"
  },
  introParagraphs: [
    "While Expression, Soul Urge, Personality, and Inner Dream form the primary pillar of a name reading, four finer dimensions add extraordinary precision: the Hidden Passion Number, the Cornerstone, the Capstone, and the First Vowel.",
    "The Hidden Passion reveals where natural intensity and absorption are most densely concentrated. The Cornerstone shows the instinctive approach to initiating new experiences. The Capstone reveals the style of finishing and follow-through. The First Vowel discloses the immediate gut emotional response that fires before rational thought.",
    "Together, these four calculations transform a general numerological analysis into a deeply personal, actionable, and nuanced map of a person's operational psychology."
  ],
  fourDimensionsBreakdown: {
    hiddenPassionRole: "Found by counting letter value frequencies in the full name. Indicates the specific domain where energy is most concentrated and self-generating.",
    cornerstoneRole: "The first letter of the first name. Represents the initial movement, attitude, and style when starting any project or relationship.",
    capstoneRole: "The last letter of the first name. Represents the natural method of completing, finalizing, and concluding endeavors.",
    firstVowelRole: "The first vowel sound in the first name. Represents the instinctive emotional default response that precedes conscious consideration."
  }
};

export const HIDDEN_PASSION_DATABASE: Record<number, HiddenPassionAnalysis> = {
  1: {
    number: 1,
    title: "The Irresistible Drive to Lead Originally",
    keywords: ["Pioneering Focus", "Independent Initiative", "Original Ownership"],
    definition: "An irresistible concentration of vibrational energy in the domain of individual initiative, self-reliance, and original leadership.",
    soulIntensity: "Operating with focused, self-generating momentum whenever working on something genuinely original and self-owned.",
    shadow: "Difficulty in merging work with others or surrendering sole ownership in collaborative settings.",
    developmentalPractice: "Cultivate conscious collaboration and allow team partners to share creative attribution without feeling diminished.",
    detailedParagraphs: [
      "When the number one is the Hidden Passion, the person carries an irresistible concentration of energy in the domain of independent initiative and original leadership.",
      "This is not necessarily expressed as visible hierarchical ambition, but as total absorption whenever working on something genuinely, unmistakably their own.",
      "The Hidden Passion 1 person is most fully alive when originating — when the direction is theirs and the work bears their distinctive mark."
    ]
  },
  2: {
    number: 2,
    title: "The Irresistible Depth of Relational Attunement",
    keywords: ["Intuitive Diplomacy", "Empathic Connection", "Harmonious Mediation"],
    definition: "Concentrated relational intelligence, registering emotional atmospheres and subtexts before they are verbally expressed.",
    soulIntensity: "Natural attraction to counseling, mediation, and bringing people into meaningful alignment.",
    shadow: "Absorbing environmental emotions so deeply that personal clarity and boundary management become blurred.",
    developmentalPractice: "Establish clear emotional boundaries and take regular silent periods to discharge absorbed feelings.",
    detailedParagraphs: [
      "When two is the Hidden Passion, the person carries the most concentrated relational intelligence available among the nine numbers.",
      "They notice what others feel before it has been spoken, sensing the emotional temperature of any environment instantly.",
      "In its fullest expression, Hidden Passion 2 produces gifted mediators and counselors who thrive in understanding complex human dynamics."
    ]
  },
  3: {
    number: 3,
    title: "The Irresistible Need to Create and Express",
    keywords: ["Creative Generativity", "Expressive Charm", "Communicative Energy"],
    definition: "An irresistible concentration of creative and expressive vitality, generating ideas, words, and forms naturally.",
    soulIntensity: "Feeling most alive when communicating, writing, speaking, or performing.",
    shadow: "Scattered focus across too many creative avenues, making completion of long-term projects challenging.",
    developmentalPractice: "Commit to staying with a primary creative project through the middle stages of discipline to achieve genuine mastery.",
    detailedParagraphs: [
      "When three is the Hidden Passion, the person carries an irresistible concentration of creative and expressive energy.",
      "They generate ideas, images, words, and connections with a naturalness and volume that others find remarkable.",
      "For Hidden Passion 3, creative expression is not merely a hobby, but a fundamental constitutional necessity."
    ]
  },
  4: {
    number: 4,
    title: "The Irresistible Drive to Build and Perfect",
    keywords: ["Methodical Precision", "Structural Excellence", "Disciplined Craft"],
    definition: "Total absorption in the methodical, precise, and sustained construction of lasting quality.",
    soulIntensity: "Insistence on correct procedure, thorough execution, and structural integrity in all tasks.",
    shadow: "Perfectionism that delays completion, making the perfect the enemy of the finished.",
    developmentalPractice: "Learn to recognize when a piece of work has achieved excellence, declaring it finished without endless tweaking.",
    detailedParagraphs: [
      "When four is the Hidden Passion, the person carries an irresistible concentration of building and organizing energy.",
      "Attention to detail and insistence on sound methodology are natural expressions of their vibrational composition.",
      "They derive deep satisfaction from organizing complex chaos into orderly, reliable systems."
    ]
  },
  5: {
    number: 5,
    title: "The Irresistible Hunger for Experience and Freedom",
    keywords: ["Dynamic Exploration", "Versatile Adaptability", "Sensory Vitality"],
    definition: "An irresistible concentration of freedom-seeking, experience-hungry energy that thrives on movement and discovery.",
    soulIntensity: "Learning through direct, hands-on, multi-sensory encounter rather than passive theoretical study.",
    shadow: "Restlessness that skims the surface of life, avoiding deep long-term commitments.",
    developmentalPractice: "Practise staying with a commitment or practice past the initial thrill of novelty into deeper mastery.",
    detailedParagraphs: [
      "When five is the Hidden Passion, the person carries an irresistible concentration of freedom-seeking energy.",
      "They are most fully alive when moving through physical space, exploring new ideas, or meeting diverse cultures.",
      "Their engagement with reality is fundamentally experiential, gaining wisdom through direct participation."
    ]
  },
  6: {
    number: 6,
    title: "The Irresistible Calling to Love and Serve",
    keywords: ["Nurturing Service", "Harmonious Care", "Protective Devotion"],
    definition: "A concentrated impulse to bring beauty, harmony, protection, and care to immediate surroundings and loved ones.",
    soulIntensity: "Inability to ignore distress or ugliness without actively taking steps to restore order and comfort.",
    shadow: "Over-extension and martyrdom from caring without establishing necessary personal boundaries.",
    developmentalPractice: "Prioritize personal replenishment as a non-negotiable prerequisite for sustainable service.",
    detailedParagraphs: [
      "When six is the Hidden Passion, the person carries an irresistible concentration of caring and harmonizing energy.",
      "They find it difficult to be in an environment of disharmony or neglect without stepping in to assist.",
      "Their response is an innate expression of a field that makes active care feel like the only authentic choice."
    ]
  },
  7: {
    number: 7,
    title: "The Irresistible Pursuit of Understanding",
    keywords: ["Analytical Penetration", "Philosophical Depth", "Specialized Knowledge"],
    definition: "An intense drive to investigate beneath surface appearances, pursuing foundational truth and specialized insight.",
    soulIntensity: "Total absorption when solving complex intellectual puzzles or probing spiritual mysteries.",
    shadow: "Intellectual isolation or using analysis as an escape from direct emotional vulnerability.",
    developmentalPractice: "Bring analytical insights back into active, warm contact with everyday human relationships.",
    detailedParagraphs: [
      "When seven is the Hidden Passion, the person carries an irresistible concentration of investigative energy.",
      "They cannot comfortably accept superficial explanations, feeling compelled to seek the deeper mechanics behind facts.",
      "Their mind operates best in quiet contemplation, uncovering underlying patterns that others overlook."
    ]
  },
  8: {
    number: 8,
    title: "The Irresistible Drive Toward Material Mastery",
    keywords: ["Executive Command", "Resource Intelligence", "Scale and Authority"],
    definition: "Innate comprehension of material systems, power dynamics, financial flow, and large-scale organization.",
    soulIntensity: "Effortless instinct for managing capital, leading enterprises, and scaling operations.",
    shadow: "Equating personal worth solely with material accumulation or executive dominance.",
    developmentalPractice: "Align commercial and organizational authority with higher ethical purpose and community good.",
    detailedParagraphs: [
      "When eight is the Hidden Passion, the person carries an irresistible concentration of executive and material energy.",
      "They understand at an intuitive level how resources accumulate, how authority is structured, and how scale is built.",
      "Their talent lies in taking abstract concepts and turning them into prosperous, self-sustaining operations."
    ]
  },
  9: {
    number: 9,
    title: "The Irresistible Orientation Toward Universal Service",
    keywords: ["Global Compassion", "Humanitarian Vision", "Broad Consciousness"],
    definition: "An expansive concentration of energy oriented toward collective welfare, systemic healing, and broad human impact.",
    soulIntensity: "Deepest engagement when working for causes that transcend individual or localized self-interest.",
    shadow: "Neglecting personal physical and financial needs while serving broad universal goals.",
    developmentalPractice: "Include yourself in the circle of care, ensuring your personal well-being is maintained.",
    detailedParagraphs: [
      "When nine is the Hidden Passion, the person carries an expansive orientation toward the universal human story.",
      "They find it difficult to remain focused purely on minor personal drama when global concerns call.",
      "Their most complete absorption occurs in fields of education, healing, art, and broad social impact."
    ]
  }
};

export const CORNERSTONE_DATABASE: Record<string, CornerstoneAnalysis> = {
  A: {
    letter: "A",
    chaldeanValue: 1,
    pythagoreanValue: 1,
    elementalType: "Vowel",
    title: "The Bold Independent Starter",
    approachToBeginning: "Initiates directly, courageously, and under sole authority without waiting for external permission.",
    detailedParagraphs: [
      "The letter A as Cornerstone indicates a person who begins everything directly and with strong personal initiative.",
      "They do not wait for consensus before taking the first step; their movement itself establishes the direction.",
      "As a vowel, the beginning springs from internal conviction and personal authority."
    ]
  },
  B: {
    letter: "B",
    chaldeanValue: 2,
    pythagoreanValue: 2,
    elementalType: "Consonant",
    title: "The Sensitive Collaborative Starter",
    approachToBeginning: "Enters new situations by gauging emotional atmospheres and seeking cooperative alignment first.",
    detailedParagraphs: [
      "The letter B as Cornerstone indicates a cooperative, sensitive approach to initiating new endeavors.",
      "They feel out the environment before stepping forward, preferring shared readiness over unilateral action.",
      "Their opening move invites conversation and partnership rather than commanding authority."
    ]
  },
  C: {
    letter: "C",
    chaldeanValue: 3,
    pythagoreanValue: 3,
    elementalType: "Consonant",
    title: "The Expressive Optimistic Starter",
    approachToBeginning: "Begins with warmth, curiosity, creative charm, and open communicative engagement.",
    detailedParagraphs: [
      "The letter C as Cornerstone indicates an expressive, communicative approach to new experiences.",
      "They open interactions with optimism and social ease, warming up the room before getting down to business.",
      "Beginning is treated as an opportunity for creative connection and joyful exploration."
    ]
  },
  D: {
    letter: "D",
    chaldeanValue: 4,
    pythagoreanValue: 4,
    elementalType: "Consonant",
    title: "The Methodical Structured Starter",
    approachToBeginning: "Enters new tasks only after careful preparation, methodical planning, and structural clarity.",
    detailedParagraphs: [
      "The letter D as Cornerstone indicates a thorough, structured approach to beginnings.",
      "They do not rush or skip steps, preferring to understand the foundational requirements before moving.",
      "Their opening establishes order, discipline, and practical reliability from day one."
    ]
  },
  E: {
    letter: "E",
    chaldeanValue: 5,
    pythagoreanValue: 5,
    elementalType: "Vowel",
    title: "The Versatile Exploratory Starter",
    approachToBeginning: "Approaches new situations with open curiosity, flexibility, and adaptive readiness.",
    detailedParagraphs: [
      "The letter E as Cornerstone indicates a flexible, versatile start to projects and relationships.",
      "They enter with genuine openness, willing to adjust course as facts unfold.",
      "As a vowel, their inner state is active, inquisitive, and welcoming of novelty."
    ]
  },
  F: {
    letter: "F",
    chaldeanValue: 8,
    pythagoreanValue: 6,
    elementalType: "Consonant",
    title: "The Strategic & Responsible Starter",
    approachToBeginning: "Blends material resource awareness (Chaldean 8) with responsible caring protection (Pythagorean 6).",
    detailedParagraphs: [
      "The letter F as Cornerstone creates a powerful synthesis of strategic resource management and caring responsibility.",
      "They initiate projects with an eye on sustainability and the well-being of everyone involved.",
      "This provides a grounded, protective, and commercially smart opening style."
    ]
  },
  G: {
    letter: "G",
    chaldeanValue: 3,
    pythagoreanValue: 7,
    elementalType: "Consonant",
    title: "The Analytical & Creative Starter",
    approachToBeginning: "Combines warm expressive communication (3) with quiet, penetrating observation (7).",
    detailedParagraphs: [
      "The letter G as Cornerstone begins with both creative warmth and keen analytical assessment.",
      "They engage cordially while secretly examining the deeper structures and motives at play.",
      "This yields a sophisticated opening move that is both engaging and perceptive."
    ]
  },
  H: {
    letter: "H",
    chaldeanValue: 5,
    pythagoreanValue: 8,
    elementalType: "Consonant",
    title: "The Dynamic Strategic Starter",
    approachToBeginning: "Integrates adaptive flexibility (5) with strong executive authority and financial awareness (8).",
    detailedParagraphs: [
      "The letter H as Cornerstone initiates with energetic strategic assessment.",
      "They quickly judge what is possible and position themselves for maximum impact and growth.",
      "Their start is agile, pragmatic, and commercially alert."
    ]
  },
  I: {
    letter: "I",
    chaldeanValue: 1,
    pythagoreanValue: 9,
    elementalType: "Vowel",
    title: "The Self-Directed Universal Starter",
    approachToBeginning: "Combines independent self-direction (1) with deep universal empathy and broad vision (9).",
    detailedParagraphs: [
      "The letter I as Cornerstone initiates with personal authority while keeping global impact in mind.",
      "As a vowel, their inner response is intense, intuitive, and spiritually tuned.",
      "They take the lead while remaining sensitive to the larger human picture."
    ]
  },
  J: {
    letter: "J",
    chaldeanValue: 1,
    pythagoreanValue: 1,
    elementalType: "Consonant",
    title: "The Purposeful Independent Starter",
    approachToBeginning: "Initiates with deliberate intentionality, self-reliance, and focused ambition.",
    detailedParagraphs: [
      "The letter J as Cornerstone shares the independent 1 vibration, executed with considered focus.",
      "They chart their own path, preferring to lead rather than follow established trails.",
      "Their start is purposeful, confident, and direct."
    ]
  },
  K: {
    letter: "K",
    chaldeanValue: 2,
    pythagoreanValue: 2,
    elementalType: "Consonant",
    title: "The Intuitively Attuned Starter",
    approachToBeginning: "Enters situations with heightened intuitive radar, subtle diplomacy, and perceptive insight.",
    detailedParagraphs: [
      "The letter K carries Master Number 11 potential underlying its 2 vibration.",
      "Their approach to beginnings is deeply intuitive, sensing underlying motives before acting.",
      "They initiate through subtle influence and perceptive relational timing."
    ]
  },
  L: {
    letter: "L",
    chaldeanValue: 3,
    pythagoreanValue: 3,
    elementalType: "Consonant",
    title: "The Joyful Communicative Starter",
    approachToBeginning: "Opens endeavors with charm, eloquence, optimism, and an immediate drive for social harmony.",
    detailedParagraphs: [
      "The letter L as Cornerstone brings grace and communicative fluidity to every beginning.",
      "They create an inviting atmosphere, using speech and charm to build early momentum.",
      "Their start makes people feel comfortable and enthusiastic."
    ]
  },
  M: {
    letter: "M",
    chaldeanValue: 4,
    pythagoreanValue: 4,
    elementalType: "Consonant",
    title: "The Grounded Protective Starter",
    approachToBeginning: "Initiates with solid, practical, maternal-type groundedness, ensuring foundational safety.",
    detailedParagraphs: [
      "The letter M as Cornerstone brings protective, practical discipline to the opening phase.",
      "They approach new endeavors as a builder establishing a firm, unshakeable foundation.",
      "Their start promises dependability and long-term security."
    ]
  },
  N: {
    letter: "N",
    chaldeanValue: 5,
    pythagoreanValue: 5,
    elementalType: "Consonant",
    title: "The Open Adaptive Starter",
    approachToBeginning: "Enters new situations with curiosity, mental agility, and a readiness to embrace change.",
    detailedParagraphs: [
      "The letter N as Cornerstone indicates a versatile, unconstrained beginning style.",
      "They do not impose rigid preconceptions, preferring to adapt as fresh information arrives.",
      "Their start is lively, inquisitive, and resourceful."
    ]
  },
  O: {
    letter: "O",
    chaldeanValue: 7,
    pythagoreanValue: 6,
    elementalType: "Vowel",
    title: "The Thoughtful Nurturing Starter",
    approachToBeginning: "Blends deep analytical observation (7) with protective, responsible care (6).",
    detailedParagraphs: [
      "The letter O as Cornerstone approaches beginnings with serious reflection and caring intent.",
      "As a vowel, it originates from a deep emotional desire for harmony and moral integrity.",
      "Their start is careful, principled, and protective."
    ]
  },
  P: {
    letter: "P",
    chaldeanValue: 8,
    pythagoreanValue: 7,
    elementalType: "Consonant",
    title: "The Analyst & Strategist Starter",
    approachToBeginning: "Combines material power awareness (8) with sharp analytical scrutiny (7).",
    detailedParagraphs: [
      "The letter P as Cornerstone enters new ventures as both a quiet analyst and a sharp strategist.",
      "They evaluate power structures, financial feasibility, and technical depth before committing.",
      "Their opening move is composed, formidable, and intellectual."
    ]
  },
  Q: {
    letter: "Q",
    chaldeanValue: 1,
    pythagoreanValue: 8,
    elementalType: "Consonant",
    title: "The Powerful Pioneer Starter",
    approachToBeginning: "Synthesizes independent pioneering drive (1) with high executive capability (8).",
    detailedParagraphs: [
      "The letter Q as Cornerstone indicates an intense, unique, and powerful opening style.",
      "They initiate with original authority and a strong command over practical execution.",
      "Their start is bold, ambitious, and distinct."
    ]
  },
  R: {
    letter: "R",
    chaldeanValue: 2,
    pythagoreanValue: 9,
    elementalType: "Consonant",
    title: "The Diplomatic Visionary Starter",
    approachToBeginning: "Blends cooperative sensitivity (2) with expansive humanitarian vision (9).",
    detailedParagraphs: [
      "The letter R as Cornerstone carries leadership karma and diplomatic intelligence.",
      "They begin by considering the collective well-being and seeking inclusive participation.",
      "Their opening move is empathetic, dignified, and broad-minded."
    ]
  },
  S: {
    letter: "S",
    chaldeanValue: 3,
    pythagoreanValue: 1,
    elementalType: "Consonant",
    title: "The Vibrant Independent Starter",
    approachToBeginning: "Combines expressive charm and warmth (3) with decisive self-reliance (1).",
    detailedParagraphs: [
      "The letter S as Cornerstone creates a lively, memorable, and self-assured start.",
      "They captivate attention with expressive warmth while maintaining clear control over direction.",
      "Their start is energetic, magnetic, and self-directed."
    ]
  },
  T: {
    letter: "T",
    chaldeanValue: 4,
    pythagoreanValue: 2,
    elementalType: "Consonant",
    title: "The Balanced Cooperative Starter",
    approachToBeginning: "Blends structured, methodical discipline (4) with gentle diplomatic awareness (2).",
    detailedParagraphs: [
      "The letter T as Cornerstone approaches new situations with both structural discipline and personal tact.",
      "They organize tasks meticulously while keeping team relationships smooth.",
      "Their start is orderly, patient, and considerate."
    ]
  },
  U: {
    letter: "U",
    chaldeanValue: 6,
    pythagoreanValue: 3,
    elementalType: "Vowel",
    title: "The Creative Nurturing Starter",
    approachToBeginning: "Synthesizes responsible protective warmth (6) with joyful artistic expression (3).",
    detailedParagraphs: [
      "The letter U as Cornerstone opens new chapters with warmth, creativity, and care.",
      "As a vowel, the inner urge is to make people feel safe, inspired, and included.",
      "Their start is welcoming, expressive, and harmonious."
    ]
  },
  V: {
    letter: "V",
    chaldeanValue: 6,
    pythagoreanValue: 4,
    elementalType: "Consonant",
    title: "The Practical Harmonizer Starter",
    approachToBeginning: "Combines caring responsibility (6) with solid methodical execution (4).",
    detailedParagraphs: [
      "The letter V as Cornerstone approaches beginnings with grounded discipline and genuine care.",
      "They take responsibility seriously, building systems that protect and support.",
      "Their start is firm, practical, and reliable."
    ]
  },
  W: {
    letter: "W",
    chaldeanValue: 6,
    pythagoreanValue: 5,
    elementalType: "Consonant",
    title: "The Versatile Caregiver Starter",
    approachToBeginning: "Blends protective nurturing (6) with dynamic flexibility and adaptability (5).",
    detailedParagraphs: [
      "The letter W as Cornerstone initiates with responsive warmth and adaptable energy.",
      "They adjust quickly to changing needs while keeping team harmony intact.",
      "Their start is active, caring, and versatile."
    ]
  },
  X: {
    letter: "X",
    chaldeanValue: 5,
    pythagoreanValue: 6,
    elementalType: "Consonant",
    title: "The Dynamic Harmonizing Starter",
    approachToBeginning: "Combines fast mental speed (5) with responsible community care (6).",
    detailedParagraphs: [
      "The letter X as Cornerstone begins with lively intellectual curiosity and warm social responsibility.",
      "They engage quickly across diverse topics while maintaining a caring posture.",
      "Their start is engaging, multi-faceted, and warm."
    ]
  },
  Y: {
    letter: "Y",
    chaldeanValue: 1,
    pythagoreanValue: 7,
    elementalType: "Consonant", // or Vowel
    title: "The Intuitive Pioneer Starter",
    approachToBeginning: "Synthesizes independent self-direction (1) with quiet analytical depth (7).",
    detailedParagraphs: [
      "The letter Y as Cornerstone initiates with quiet independence and deep mental analysis.",
      "They move forward on their own terms after careful internal evaluation.",
      "Their start is independent, contemplative, and focused."
    ]
  },
  Z: {
    letter: "Z",
    chaldeanValue: 7,
    pythagoreanValue: 8,
    elementalType: "Consonant",
    title: "The Master Strategist Starter",
    approachToBeginning: "Combines deep investigative insight (7) with formidable commercial power (8).",
    detailedParagraphs: [
      "The letter Z as Cornerstone initiates with rare intellectual and executive strength.",
      "They analyze deep truths and translate them into significant material structures.",
      "Their start is quiet, strategic, and highly effective."
    ]
  }
};

export const CAPSTONE_DATABASE: Record<string, CapstoneAnalysis> = {
  A: {
    letter: "A",
    chaldeanValue: 1,
    pythagoreanValue: 1,
    title: "Decisive Clean Closure",
    completionStyle: "Completes projects independently, decisively, and with crisp personal authority.",
    detailedParagraphs: [
      "The Capstone A ends endeavors with clarity, independence, and definitive resolution.",
      "They do not leave loose ends lingering, preferring clean cuts and clear, self-directed finality."
    ]
  },
  B: {
    letter: "B",
    chaldeanValue: 2,
    pythagoreanValue: 2,
    title: "Gentle Cooperative Closure",
    completionStyle: "Concludes projects gently, ensuring all relational feelings are honored and harmonized.",
    detailedParagraphs: [
      "The Capstone B finishes endeavors with diplomatic care and mutual agreement.",
      "They seek peaceful conclusions that preserve long-term friendships and trust."
    ]
  },
  C: {
    letter: "C",
    chaldeanValue: 3,
    pythagoreanValue: 3,
    title: "Expressive Celebration Closure",
    completionStyle: "Finalizes work with open communication, celebratory tone, and artistic flair.",
    detailedParagraphs: [
      "The Capstone C concludes with expression, sharing results openly and celebrating achievements.",
      "Endings are articulated clearly so everyone understands the story of completion."
    ]
  },
  D: {
    letter: "D",
    chaldeanValue: 4,
    pythagoreanValue: 4,
    title: "Thorough Structural Closure",
    completionStyle: "Finishes with rigorous documentation, total compliance, and systematic completeness.",
    detailedParagraphs: [
      "The Capstone D leaves nothing undone, completing every detail to perfection.",
      "Their final deliverable is solid, reliable, and built to withstand scrutiny."
    ]
  },
  E: {
    letter: "E",
    chaldeanValue: 5,
    pythagoreanValue: 5,
    title: "Transitional Open-Ended Closure",
    completionStyle: "Pivots fluidly from completion into the next exciting opportunity without rigid locking.",
    detailedParagraphs: [
      "The Capstone E completes chapters by turning them immediately into stepping stones for new growth.",
      "Endings are experienced as transitions into freedom rather than permanent stops."
    ]
  },
  F: {
    letter: "F",
    chaldeanValue: 8,
    pythagoreanValue: 6,
    title: "Responsible Strategic Closure",
    completionStyle: "Concludes by securing material assets and fulfilling all duties to loved ones.",
    detailedParagraphs: [
      "The Capstone F completes endeavors with practical thoroughness and protective care.",
      "They ensure all financial and human obligations are honorably discharged."
    ]
  },
  G: {
    letter: "G",
    chaldeanValue: 3,
    pythagoreanValue: 7,
    title: "Analytical Articulate Closure",
    completionStyle: "Finalizes with thorough intellectual review and expressive summary.",
    detailedParagraphs: [
      "The Capstone G finishes by analyzing outcomes and extracting deeper lessons.",
      "Endings include both thoughtful summary and clear communication."
    ]
  },
  H: {
    letter: "H",
    chaldeanValue: 5,
    pythagoreanValue: 8,
    title: "Executive Adaptive Closure",
    completionStyle: "Concludes with strategic business efficiency and readiness for rapid practical pivots.",
    detailedParagraphs: [
      "The Capstone H ends projects by securing tangible results and reallocating resources efficiently.",
      "Their closure is practical, profitable, and agile."
    ]
  },
  I: {
    letter: "I",
    chaldeanValue: 1,
    pythagoreanValue: 9,
    title: "Transformative Universal Closure",
    completionStyle: "Finishes with deep emotional release, broad humanitarian impact, and personal independence.",
    detailedParagraphs: [
      "The Capstone I brings profound cycles of completion, letting go of what no longer serves.",
      "Endings carry spiritual dignity, leaving an inspiring legacy."
    ]
  },
  J: {
    letter: "J",
    chaldeanValue: 1,
    pythagoreanValue: 1,
    title: "Focused Independent Closure",
    completionStyle: "Concludes decisively with personal ownership and clear future direction.",
    detailedParagraphs: [
      "The Capstone J finishes projects on its own terms with sharp, independent execution."
    ]
  },
  K: {
    letter: "K",
    chaldeanValue: 2,
    pythagoreanValue: 2,
    title: "Intuitive Harmonious Closure",
    completionStyle: "Finalizes with subtle emotional grace, leaving peace and intuitive alignment behind.",
    detailedParagraphs: [
      "The Capstone K completes work softly, sensing exact emotional timing."
    ]
  },
  L: {
    letter: "L",
    chaldeanValue: 3,
    pythagoreanValue: 3,
    title: "Articulate Joyful Closure",
    completionStyle: "Concludes by expressing appreciation, telling the story, and inspiring enthusiasm.",
    detailedParagraphs: [
      "The Capstone L brings warmth and clear communication to project wrap-ups."
    ]
  },
  M: {
    letter: "M",
    chaldeanValue: 4,
    pythagoreanValue: 4,
    title: "Solid Foundational Closure",
    completionStyle: "Finishes with complete practical stability, securing long-term foundations.",
    detailedParagraphs: [
      "The Capstone M ensures that completed work serves as a permanent, reliable baseline."
    ]
  },
  N: {
    letter: "N",
    chaldeanValue: 5,
    pythagoreanValue: 5,
    title: "Agile Transitional Closure",
    completionStyle: "Completes tasks rapidly, opening doors to fresh horizons and new experiences.",
    detailedParagraphs: [
      "The Capstone N prefers open-ended conclusions that allow fast movement into future ventures."
    ]
  },
  O: {
    letter: "O",
    chaldeanValue: 7,
    pythagoreanValue: 6,
    title: "Thoughtful Principled Closure",
    completionStyle: "Finalizes with ethical integrity, thorough analysis, and caring responsibility.",
    detailedParagraphs: [
      "The Capstone O ensures that endings reflect deep moral values and careful review."
    ]
  },
  P: {
    letter: "P",
    chaldeanValue: 8,
    pythagoreanValue: 7,
    title: "Strategic Analytical Closure",
    completionStyle: "Concludes with precise financial auditing, intellectual reflection, and executive order.",
    detailedParagraphs: [
      "The Capstone P finishes with thorough mastery over both details and overarching strategy."
    ]
  },
  Q: {
    letter: "Q",
    chaldeanValue: 1,
    pythagoreanValue: 8,
    title: "Commanding Finality Closure",
    completionStyle: "Ends endeavors with bold authority and strong material settlement.",
    detailedParagraphs: [
      "The Capstone Q executes final decisions with unmistakable strength and efficiency."
    ]
  },
  R: {
    letter: "R",
    chaldeanValue: 2,
    pythagoreanValue: 9,
    title: "Gracious Compassionate Closure",
    completionStyle: "Concludes with universal empathy, diplomatic grace, and broad understanding.",
    detailedParagraphs: [
      "The Capstone R leaves a legacy of harmony, forgiveness, and universal respect."
    ]
  },
  S: {
    letter: "S",
    chaldeanValue: 3,
    pythagoreanValue: 1,
    title: "Vibrant Independent Closure",
    completionStyle: "Finalizes with flair, public celebration, and decisive self-reliance.",
    detailedParagraphs: [
      "The Capstone S finishes work with high energy and clear individual accomplishment."
    ]
  },
  T: {
    letter: "T",
    chaldeanValue: 4,
    pythagoreanValue: 2,
    title: "Orderly Diplomatic Closure",
    completionStyle: "Concludes with careful system checks and gentle interpersonal tact.",
    detailedParagraphs: [
      "The Capstone T ensures all documentation is complete while team harmony is preserved."
    ]
  },
  U: {
    letter: "U",
    chaldeanValue: 6,
    pythagoreanValue: 3,
    title: "Warm Creative Closure",
    completionStyle: "Finishes with artistic grace, nurturing appreciation, and joyful expression.",
    detailedParagraphs: [
      "The Capstone U wraps up projects with genuine warmth, honoring everyone's contribution."
    ]
  },
  V: {
    letter: "V",
    chaldeanValue: 6,
    pythagoreanValue: 4,
    title: "Dependable Responsible Closure",
    completionStyle: "Concludes with rigorous safety, ethical compliance, and structural solidity.",
    detailedParagraphs: [
      "The Capstone V ensures long-term protection and stability for completed endeavors."
    ]
  },
  W: {
    letter: "W",
    chaldeanValue: 6,
    pythagoreanValue: 5,
    title: "Flexible Caring Closure",
    completionStyle: "Finishes with adaptable warmth, ready to adjust to post-completion needs.",
    detailedParagraphs: [
      "The Capstone W closes chapters while leaving room for evolving human requirements."
    ]
  },
  X: {
    letter: "X",
    chaldeanValue: 5,
    pythagoreanValue: 6,
    title: "Engaging Harmonious Closure",
    completionStyle: "Finalizes with communicative ease, social charm, and mutual care.",
    detailedParagraphs: [
      "The Capstone X completes projects with friendly dialogues and lasting goodwill."
    ]
  },
  Y: {
    letter: "Y",
    chaldeanValue: 1,
    pythagoreanValue: 7,
    title: "Reflective Independent Closure",
    completionStyle: "Concludes through quiet intellectual contemplation and firm self-reliance.",
    detailedParagraphs: [
      "The Capstone Y completes cycles through inner wisdom and clear personal boundaries."
    ]
  },
  Z: {
    letter: "Z",
    chaldeanValue: 7,
    pythagoreanValue: 8,
    title: "Masterful Strategic Closure",
    completionStyle: "Finalizes with profound insight and complete material settlement.",
    detailedParagraphs: [
      "The Capstone Z closes endeavors with exceptional mastery, authority, and depth."
    ]
  }
};

export const FIRST_VOWEL_DATABASE: Record<string, FirstVowelAnalysis> = {
  A: {
    letter: "A",
    chaldeanValue: 1,
    pythagoreanValue: 1,
    title: "The Independent Emotional Default",
    emotionalDefault: "Instinctive self-reliance: 'I will handle this myself.'",
    strength: "Courage, instant self-direction, and inner resilience in the face of sudden challenge.",
    shadow: "Difficulty acknowledging vulnerability or accepting timely help from others.",
    developmentalPractice: "Pause to check in with genuine feelings before automatically shifting into problem-solving mode.",
    detailedParagraphs: [
      "When A is the First Vowel, the person's deepest instinctive emotional response is self-reliant and independent.",
      "Before conscious thought has assembled itself, the gut moves toward self-direction: 'I can manage this without burdening anyone.'",
      "This default grants remarkable resilience, though it requires conscious effort to allow others to offer support."
    ]
  },
  E: {
    letter: "E",
    chaldeanValue: 5,
    pythagoreanValue: 5,
    title: "The Curious and Analytical Emotional Default",
    emotionalDefault: "Instinctive mental inquiry: 'What does this mean and what are the options?'",
    strength: "Quick intellectual processing, adaptability, and open-minded curiosity.",
    shadow: "Analyzing emotions intellectually before fully allowing them to be felt in the body.",
    developmentalPractice: "Allow yourself to feel raw emotions directly without immediately translating them into rational ideas.",
    detailedParagraphs: [
      "When E is the First Vowel, the person's deepest instinctive emotional response is curious and analytical.",
      "They process experience through meaning-making, seeking to comprehend the situation before feeling it fully.",
      "This provides mental flexibility and problem-solving speed under pressure."
    ]
  },
  I: {
    letter: "I",
    chaldeanValue: 1,
    pythagoreanValue: 9,
    title: "The Empathic and Deeply Feeling Emotional Default",
    emotionalDefault: "Instinctive intuitive resonance: 'How does this feel and how does it impact everyone?'",
    strength: "Profound emotional intelligence, compassion, and intuitive depth.",
    shadow: "Absorbing surrounding environmental emotions and confusing them with personal feelings.",
    developmentalPractice: "Practise separating your own emotional state from the feelings of people nearby.",
    detailedParagraphs: [
      "When I is the First Vowel, the person's deepest instinctive emotional response is empathic and feeling-oriented.",
      "The gut lives close to the surface of feeling, sensing inner significance and subtle atmospheres instantly.",
      "This creates deep empathy, requiring gentle boundaries to prevent emotional overload."
    ]
  },
  O: {
    letter: "O",
    chaldeanValue: 7,
    pythagoreanValue: 6,
    title: "The Responsible and Caring Emotional Default",
    emotionalDefault: "Instinctive sense of duty and care: 'What is needed here and what is right?'",
    strength: "Deep moral integrity, protective instinct, and unshakeable dependability.",
    shadow: "Prioritizing everyone else's comfort before acknowledging personal needs.",
    developmentalPractice: "Ask yourself 'What do I need right now?' before taking on responsibility for others.",
    detailedParagraphs: [
      "When O is the First Vowel, the person's deepest instinctive emotional response is responsible and caring.",
      "Before conscious thought begins, the gut weighs duty, fairness, and the protection of loved ones.",
      "This default establishes genuine moral strength and quiet reliability."
    ]
  },
  U: {
    letter: "U",
    chaldeanValue: 6,
    pythagoreanValue: 3,
    title: "The Expressive and Communicative Emotional Default",
    emotionalDefault: "Instinctive urge to express: 'I need to share and put this into words or art.'",
    strength: "Natural communicative flow, artistic expressiveness, and emotional authenticity.",
    shadow: "Internal pressure or overwhelm if expressive channels are blocked or suppressed.",
    developmentalPractice: "Maintain creative or journal outlets to process intense feelings constructively.",
    detailedParagraphs: [
      "When U is the First Vowel, the deepest instinctive response is expressive and communicative.",
      "Feelings are processed through expression; putting experience into words or creative form brings relief and clarity.",
      "This default fosters communicative connection and artistic openness."
    ]
  }
};

/**
 * Helper Calculation Functions
 */

export function calculateHiddenPassionNumber(cleanName: string): number {
  const pythagoreanMap: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  };

  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  for (const ch of cleanName.toUpperCase()) {
    const val = pythagoreanMap[ch];
    if (val) counts[val] = (counts[val] || 0) + 1;
  }

  let maxCount = 0;
  let dominantNum = 1;
  for (let num = 1; num <= 9; num++) {
    if (counts[num] > maxCount) {
      maxCount = counts[num];
      dominantNum = num;
    }
  }

  return dominantNum;
}

export function findFirstVowel(cleanName: string): string {
  const vowels = "AEIOU";
  for (const ch of cleanName.toUpperCase()) {
    if (vowels.includes(ch)) return ch;
  }
  return "A";
}

export function getHiddenPassionAnalysis(num: number): HiddenPassionAnalysis {
  return HIDDEN_PASSION_DATABASE[num] || HIDDEN_PASSION_DATABASE[1];
}

export function getCornerstoneAnalysis(letter: string): CornerstoneAnalysis {
  const uppercaseLetter = (letter || "A").toUpperCase();
  return CORNERSTONE_DATABASE[uppercaseLetter] || CORNERSTONE_DATABASE["A"];
}

export function getCapstoneAnalysis(letter: string): CapstoneAnalysis {
  const uppercaseLetter = (letter || "A").toUpperCase();
  return CAPSTONE_DATABASE[uppercaseLetter] || CAPSTONE_DATABASE["A"];
}

export function getFirstVowelAnalysis(letter: string): FirstVowelAnalysis {
  const uppercaseLetter = (letter || "A").toUpperCase();
  return FIRST_VOWEL_DATABASE[uppercaseLetter] || FIRST_VOWEL_DATABASE["A"];
}
