// src/data/numerologyNameTheory.ts
// Chapter Eight: Name Energy Theory — How Names Create Vibration

export interface NameEnergyTheory {
  title: string;
  subtitle: string;
  quote: {
    text: string;
    author: string;
  };
  sections: {
    id: string;
    heading: string;
    paragraphs: string[];
    keyTakeaways?: string[];
  }[];
  letterValueSystems: {
    system: "Chaldean" | "Pythagorean";
    basis: "Acoustic & Empirical" | "Sequential & Structural";
    description: string;
    noNineRuleReasoning?: string;
  }[];
  calculationSteps: {
    step: number;
    title: string;
    instruction: string;
  }[];
  letterYRules: {
    rule: string;
    asVowelWhen: string;
    asConsonantWhen: string;
  };
}

export const NAME_ENERGY_THEORY: NameEnergyTheory = {
  title: "Name Energy Theory",
  subtitle: "How Names Create Vibration, Entrainment, and Character",
  quote: {
    text: "A person's name is to that person the sweetest and most important sound in any language.",
    author: "Dale Carnegie"
  },
  sections: [
    {
      id: "sound_of_your_name",
      heading: "The Sound of Your Name — Acoustic Physics & Entrainment",
      paragraphs: [
        "Every name is, at its most fundamental level, a sound — a specific pattern of vibration created by human vocal cords, shaped by the mouth and tongue, and transmitted outward through the medium of air. This is not metaphor; it is physics.",
        "When someone speaks your name, they create a precise acoustic event: a sequence of pressure waves in the air, each corresponding to the specific sound of one letter in your name, traveling from the speaker's mouth to your ears, your skin, and — through bone conduction — your entire physical structure.",
        "A name is a vibrational identity broadcast into your environment and absorbed by you since birth. Through physical entrainment, sustained exposure to this consistent acoustic pattern cumulatively synchronizes aspects of your nervous system, emotional habits, and behavioral defaults with the frequency your name carries.",
        "Across an average lifespan, a person's full name is spoken, heard, thought, or written between two to five million times. The entrainment effect of two to five million repetitions of a specific acoustic pattern represents the accumulated weight of a lifetime of consistent vibrational exposure."
      ],
      keyTakeaways: [
        "A name is an acoustic event causing physical entrainment in the nervous system.",
        "Over a lifetime, 2 to 5 million repetitions solidify this vibrational pattern.",
        "Your birth name acts as your core frequency signature."
      ]
    },
    {
      id: "why_birth_name_matters",
      heading: "Why the Birth Name Matters Most",
      paragraphs: [
        "The full birth name — exactly as recorded on the original birth certificate at registration — is always the primary basis for professional name calculations.",
        "The birth name is given at the moment of maximal vulnerability and openness, when the newborn nervous system possesses peak neuroplasticity. The name repeated thousands of times during initial neurological development establishes its vibrational signature at a depth that later names (married names, professional aliases, nicknames) cannot overwrite.",
        "While nicknames and married names introduce secondary modifier vibrations, they modify a root foundation that the birth name has permanently established."
      ],
      keyTakeaways: [
        "Original birth spelling registers the root soul blueprint.",
        "Newborn neuroplasticity embeds the birth name frequency into core identity.",
        "Subsequent names act as modifiers over the foundational birth name."
      ]
    },
    {
      id: "vowels_and_consonants",
      heading: "Vowels and Consonants — The Inner and Outer Worlds",
      paragraphs: [
        "Vowels are the breath of the name. Spoken with an open vocal tract, sound flows freely without constriction. In ancient traditions, vowels represent the inner life — the soul speaking directly without social filtering. Vowels calculate the Soul Urge (Heart's Desire) Number, revealing deep private motivations.",
        "Consonants are produced by constriction (lips, teeth, tongue, palate shaping sound). They provide the structural architecture of language. Consonants carry the outer life — the public face, social presentation, and first impressions created before genuine inner knowledge is established. Consonants calculate the Personality Number.",
        "Together, Soul Urge (Vowels) and Personality (Consonants) describe the alignment or gap between who a person is inside and how they appear to the world."
      ],
      keyTakeaways: [
        "Vowels = Soul Urge Number (Inner Motivation & Private Longing).",
        "Consonants = Personality Number (Outer Mask & Public Social Face).",
        "The Letter Y acts as a vowel when carrying the only vowel sound in a syllable (e.g., GLYN, MARY) and as a consonant elsewhere (e.g., YASHWANT)."
      ]
    },
    {
      id: "letter_values_philosophy",
      heading: "Letter Values — Chaldean vs. Pythagorean Systems",
      paragraphs: [
        "In the Pythagorean system, letter values follow alphabetical sequence (A=1, B=2 ... I=9, J=1 ...). This reflects Pythagoras's conviction that the alphabet is a mathematical progression where letter order mirrors vibrational sequence. It is logically consistent.",
        "In the Chaldean system, values are assigned based on acoustic sound frequency rather than alphabetical position. The Chaldean system never assigns the number 9 to any single letter because 9 was considered a sacred, fully complete vibration beyond any single letter. Chaldean values were established empirically by priest-scholars tracking real human patterns across centuries, producing deep spiritual accuracy."
      ],
      keyTakeaways: [
        "Chaldean is acoustic & empirical (Values 1 to 8; 9 is sacred & unassigned to letters).",
        "Pythagorean is sequential & structural (Values 1 to 9 following A to Z).",
        "Always use Chaldean as primary and Pythagorean as secondary confirmation."
      ]
    }
  ],
  letterValueSystems: [
    {
      system: "Chaldean",
      basis: "Acoustic & Empirical",
      description: "Letter values correspond to actual vocal sound frequencies. Values range from 1 to 8; 9 is preserved as a sacred cosmic total.",
      noNineRuleReasoning: "Number 9 represents perfection, completion, and divine cosmic force, making it too sacred to be embodied by any single physical alphabet letter."
    },
    {
      system: "Pythagorean",
      basis: "Sequential & Structural",
      description: "Letters correspond to linear numbers 1 through 9 in A-Z order (A=1, B=2... I=9, J=1...)."
    }
  ],
  calculationSteps: [
    {
      step: 1,
      title: "Full Birth Name Registration",
      instruction: "Write the full name in capital letters exactly as it appears on the original birth certificate."
    },
    {
      step: 2,
      title: "Assign Chaldean Letter Values",
      instruction: "Write the Chaldean numerical value below each letter (A=1, B=2, C=3, D=4, E=5, F=8, G=3, H=5, I=1, J=1, K=2, L=3, M=4, N=5, O=7, P=8, Q=1, R=2, S=3, T=4, U=6, V=6, W=6, X=5, Y=1, Z=7)."
    },
    {
      step: 3,
      title: "Calculate Sub-Totals per Name Component",
      instruction: "Sum the first name, middle name, and last name separately."
    },
    {
      step: 4,
      title: "Calculate Grand Total & Record Compound",
      instruction: "Add all sub-totals together to produce the grand total compound number."
    },
    {
      step: 5,
      title: "Reduce to Single Digit or Master Number",
      instruction: "Reduce compound by adding its digits until reaching a single digit (1-9) or Master Number (11, 22, 33)."
    },
    {
      step: 6,
      title: "Cross-Verify with Pythagorean System",
      instruction: "Perform the same calculation using Pythagorean values to analyze secondary alignment."
    }
  ],
  letterYRules: {
    rule: "The letter Y operates dynamically based on phonetics.",
    asVowelWhen: "Y acts as a vowel when it creates the primary vowel sound in a syllable (e.g., GLYN, BYRNE, MARY, STACY) or is the sole vowel in the name.",
    asConsonantWhen: "Y acts as a consonant when it begins a syllable or precedes a pronounced vowel (e.g., YASHWANT, YUSUF)."
  }
};
