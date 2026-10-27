// src/utils/numerologyNameCorrectionEngine.ts

export const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

export const ALLOWED_NAME_NUMBERS = [1, 3, 5, 6] as const;
export const FORBIDDEN_NAME_NUMBERS = [2, 4, 7, 8, 9] as const;

export interface ChaldeanBreakdown {
  compound: number;
  single: number;
  letters: { char: string; value: number }[];
}

export function calculateChaldeanNumber(str: string): ChaldeanBreakdown {
  const clean = (str || "").toUpperCase().replace(/[^A-Z]/g, "");
  const letters: { char: string; value: number }[] = [];
  let sum = 0;
  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    const value = CHALDEAN_MAP[char] || 0;
    letters.push({ char, value });
    sum += value;
  }

  let single = sum;
  while (single > 9) {
    single = single
      .toString()
      .split("")
      .reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  }

  return { compound: sum, single, letters };
}

// Classical 81 Combination Anty / Enemy numbers
export const ENEMY_NUMBERS_MAP: Record<number, number[]> = {
  1: [8],              // 8 and 1 are direct anty numbers (Surya vs Shani clash)
  2: [8, 9, 4],        // Moon suffers with Saturn (8), Mars (9), Rahu (4)
  3: [6],              // Jupiter vs Venus (Guru vs Shukra rival teachers)
  4: [1, 2, 4, 8, 9],  // Rahu has intense friction; 4 and 8 gives struggles & ups and downs
  5: [],               // Mercury is universal neutral/friend to all numbers
  6: [3, 9],           // Venus clashes with Jupiter (3) and Mars (9)
  7: [1, 9],           // Ketu conflicts with Sun (1) and Mars (9)
  8: [1, 2, 4, 8, 9],  // Saturn arch-enemy is Sun (1); 4 & 8 gives struggles; 2 & 9 are hostile
  9: [2, 4, 8, 6]      // Mars clashes with 2, 4, 8, 6
};

export interface CompatibilityCheckResult {
  isCompatible: boolean;
  reasons: string[];
}

export function checkCandidateCompatibility(
  candidate: number,
  driver: number,
  conductor: number
): CompatibilityCheckResult {
  const reasons: string[] = [];

  // 1. Strictly avoid 2, 4, 7, 8, 9
  if (!ALLOWED_NAME_NUMBERS.includes(candidate as any)) {
    return {
      isCompatible: false,
      reasons: [
        `Number ${candidate} is in the forbidden list [2, 4, 7, 8, 9] (not recommended for name vibration).`
      ]
    };
  }

  // 2. Anty/Enemy check with Driver
  const driverEnemies = ENEMY_NUMBERS_MAP[driver] || [];
  if (driverEnemies.includes(candidate)) {
    reasons.push(`Number ${candidate} is an anty/enemy number to your Driver/Mulank (${driver}).`);
  }

  // 3. Anty/Enemy check with Conductor
  const conductorEnemies = ENEMY_NUMBERS_MAP[conductor] || [];
  if (conductorEnemies.includes(candidate)) {
    reasons.push(`Number ${candidate} is an anty/enemy number to your Conductor/Bhagyank (${conductor}).`);
  }

  // 4. Special 8 and 1 anty rule
  if ((driver === 8 || conductor === 8) && candidate === 1) {
    reasons.push(`8 and 1 are direct anty numbers (Saturn and Sun conflict).`);
  }
  if ((driver === 1 || conductor === 1) && candidate === 8) {
    reasons.push(`1 and 8 are direct anty numbers (Sun and Saturn conflict).`);
  }

  // 5. 4 and 8 struggle rule
  if (
    (driver === 4 || conductor === 4 || driver === 8 || conductor === 8) &&
    (candidate === 4 || candidate === 8)
  ) {
    reasons.push(`4 and 8 gives struggles and severe ups and downs in life.`);
  }

  // 6. 3 and 6 Guru-Shukra clash
  if ((driver === 3 || conductor === 3) && candidate === 6) {
    reasons.push(`3 and 6 clash as opposing preceptor archetypes.`);
  }
  if ((driver === 6 || conductor === 6) && candidate === 3) {
    reasons.push(`6 and 3 clash as opposing preceptor archetypes.`);
  }

  return {
    isCompatible: reasons.length === 0,
    reasons
  };
}

export interface AuspiciousCompoundDetail {
  compound: number;
  root: 1 | 3 | 5 | 6;
  title: string;
  ruler: string;
  esotericMeaning: string;
}

export const AUSPICIOUS_COMPOUNDS: AuspiciousCompoundDetail[] = [
  // Root 5 (Universal Balancer, Business, Communication, Adaptability)
  {
    compound: 23,
    root: 5,
    title: "The Royal Star of the Lion",
    ruler: "Mercury (Budha)",
    esotericMeaning:
      "One of the most fortunate compounds in Chaldean numerology. Bestows royal favor, unexpected blessings, protection against adverse planetary transits, and commercial triumph."
  },
  {
    compound: 32,
    root: 5,
    title: "Magnetic Communicator & Diplomat",
    ruler: "Mercury (Budha)",
    esotericMeaning:
      "Brings extraordinary charisma, persuasive speech, smooth negotiations, public favor, and resilient financial growth."
  },
  {
    compound: 41,
    root: 5,
    title: "Executive Leadership & Commercial Power",
    ruler: "Mercury (Budha)",
    esotericMeaning:
      "Infuses clear decision-making, digital/trade expansion, and high social respect."
  },
  {
    compound: 50,
    root: 5,
    title: "Pure Intellectual Brilliance",
    ruler: "Mercury (Budha)",
    esotericMeaning:
      "Sharp cognitive focus, rapid adaptability, and mastery over modern trade and technology."
  },

  // Root 6 (Venus, Luxury, Art, Harmony, Wealth)
  {
    compound: 24,
    root: 6,
    title: "The Fortunate Patron & Protector",
    ruler: "Venus (Shukra)",
    esotericMeaning:
      "Guarantees assistance from wealthy patrons and higher authorities. Bestows marital harmony, domestic peace, artistic success, and steady wealth."
  },
  {
    compound: 33,
    root: 6,
    title: "Master Spiritual & Material Abundance",
    ruler: "Venus (Shukra)",
    esotericMeaning:
      "A master frequency of divine grace, magnetic goodwill, luxury, deep compassion, and financial elevation."
  },
  {
    compound: 42,
    root: 6,
    title: "Serene Harmony & Elevated Status",
    ruler: "Venus (Shukra)",
    esotericMeaning:
      "Cultivates diplomatic grace, stable partnerships, and peaceful wealth accumulation."
  },

  // Root 1 (Sun, Leadership, Authority, Honor)
  {
    compound: 19,
    root: 1,
    title: "Prince of Heaven",
    ruler: "Sun (Surya)",
    esotericMeaning:
      "Known in esoteric texts as the Prince of Heaven. Symbolizes victory, enduring honor, high public stature, and the fulfillment of worldly goals."
  },
  {
    compound: 37,
    root: 1,
    title: "Noble Alliance & Popularity",
    ruler: "Sun (Surya)",
    esotericMeaning:
      "Brings fortunate partnerships, noble friendships, sincere public affection, and steady career expansion."
  },
  {
    compound: 46,
    root: 1,
    title: "Sovereign Authority & Executive Command",
    ruler: "Sun (Surya)",
    esotericMeaning:
      "Commands respect, organizational leadership, administrative brilliance, and unwavering determination."
  },

  // Root 3 (Jupiter, Wisdom, Creativity, Knowledge)
  {
    compound: 21,
    root: 3,
    title: "Crown of the Magi",
    ruler: "Jupiter (Guru)",
    esotericMeaning:
      "Represents complete victory after sincere endeavor, highest academic and advisory prestige, spiritual protection, and wisdom."
  },
  {
    compound: 30,
    root: 3,
    title: "Philosophical Intellect & Mental Superiority",
    ruler: "Jupiter (Guru)",
    esotericMeaning:
      "Brings elevated intellect, philosophical depth, creative writing/teaching excellence, and broad influence."
  },
  {
    compound: 39,
    root: 3,
    title: "Renown & Literary Preeminence",
    ruler: "Jupiter (Guru)",
    esotericMeaning:
      "Bestows widespread acclaim, educational leadership, and enduring professional distinction."
  }
];

export interface NameSuggestion {
  spelling: string;
  compound: number;
  root: 1 | 3 | 5 | 6;
  compoundTitle: string;
  ruler: string;
  rationale: string;
  changeDescription: string;
}

export interface NicknameSuggestion {
  nickname: string;
  compound: number;
  root: 1 | 3 | 5 | 6;
  ruler: string;
  energyImpact: string;
}

export interface SignatureSuggestion {
  suggestedSignatureText: string;
  baselineAngle: string;
  openingStroke: string;
  middleRhythm: string;
  closingStroke: string;
  underlineRule: string;
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
}

export interface ActivationGuidance {
  sadhanaDays: number;
  idealWeekday: string;
  idealTime: string;
  facingDirection: string;
  inkColor: string;
  dailyRepetitions: number;
  activationSteps: {
    title: string;
    description: string;
  }[];
}

export interface CompleteCorrectionPlan {
  driver: number;
  conductor: number;
  combination81Code: string;
  currentName: string;
  currentCompound: number;
  currentSingle: number;
  currentStatus: "Harmonious" | "Neutral" | "Challenging" | "Forbidden";
  currentIssues: string[];
  recommendedRoots: (1 | 3 | 5 | 6)[];
  nameSuggestions: NameSuggestion[];
  signatureSuggestion: SignatureSuggestion;
  nicknameSuggestions: NicknameSuggestion[];
  activationGuidance: ActivationGuidance;
}

export function generateCompleteCorrectionPlan(
  rawName: string,
  rawSignatureName: string,
  rawNickname: string,
  driver?: number,
  conductor?: number
): CompleteCorrectionPlan {
  const d = typeof driver === "number" && driver >= 1 && driver <= 9 ? Math.floor(driver) : 1;
  const c = typeof conductor === "number" && conductor >= 1 && conductor <= 9 ? Math.floor(conductor) : 1;
  const nameToAnalyze = (rawName || rawSignatureName || "Aarav Sharma").trim();
  const currentCalc = calculateChaldeanNumber(nameToAnalyze);

  // Assess current status
  const currentIssues: string[] = [];
  let currentStatus: "Harmonious" | "Neutral" | "Challenging" | "Forbidden" = "Harmonious";

  if (FORBIDDEN_NAME_NUMBERS.includes(currentCalc.single as any)) {
    currentStatus = "Forbidden";
    currentIssues.push(
      `Current name total is ${currentCalc.single} (Compound ${currentCalc.compound}), which is on forbidden number ${currentCalc.single}. Numbers 2, 4, 7, 8, 9 cause delays, instability, or chronic obstacles.`
    );
  }

  const currentCompCheck = checkCandidateCompatibility(currentCalc.single, d, c);
  if (!currentCompCheck.isCompatible) {
    if (currentStatus !== "Forbidden") currentStatus = "Challenging";
    currentIssues.push(...currentCompCheck.reasons);
  }

  if (currentIssues.length === 0) {
    currentStatus = "Harmonious";
  }

  // Determine which allowed roots [1, 3, 5, 6] are compatible with 81 matrix
  const recommendedRoots: (1 | 3 | 5 | 6)[] = [];
  for (const candidate of ALLOWED_NAME_NUMBERS) {
    const check = checkCandidateCompatibility(candidate, d, c);
    if (check.isCompatible) {
      recommendedRoots.push(candidate);
    }
  }

  // Default to 5 if empty (5 is always safe with Mercury)
  if (recommendedRoots.length === 0) {
    recommendedRoots.push(5);
  }

  // Generate Name Suggestions targeting auspicious compounds of recommended roots
  const nameSuggestions: NameSuggestion[] = [];
  const parts = nameToAnalyze.split(/\s+/).filter(Boolean);
  const firstName = parts[0] || "Aarav";
  const restName = parts.slice(1).join(" ");

  // Find suitable compounds
  const validCompounds = AUSPICIOUS_COMPOUNDS.filter((c) =>
    recommendedRoots.includes(c.root)
  );

  // Strategy 1: Adjust vowel or consonant repetition in first name or add auspicious middle initial
  const lettersToTry = ["A", "I", "E", "S", "R", "N", "K", "V"];

  // Helper to generate spelling variations
  const testedSpellings = new Set<string>();
  testedSpellings.add(nameToAnalyze.toUpperCase());

  for (const targetComp of validCompounds) {
    if (nameSuggestions.length >= 3) break;

    const diff = targetComp.compound - currentCalc.compound;

    let candidateSpelling = "";
    let changeDesc = "";

    if (diff === 0) {
      candidateSpelling = nameToAnalyze;
      changeDesc = "Current spelling already aligns with this auspicious compound.";
    } else if (diff === 1) {
      // Add 'A' to first name
      candidateSpelling = `${firstName}a ${restName}`.trim();
      changeDesc = `Added single 'A' (+1 value) to calibrate sum to ${targetComp.compound}.`;
    } else if (diff === 2) {
      // Add 'R' or 'K'
      candidateSpelling = `${firstName}r ${restName}`.trim();
      changeDesc = `Added subtle 'r' (+2 value) to calibrate sum to ${targetComp.compound}.`;
    } else if (diff === 3) {
      // Add middle initial 'S.' or 'L.'
      candidateSpelling = `${firstName} S. ${restName}`.trim();
      changeDesc = `Added middle initial 'S.' (+3 value) to calibrate sum to ${targetComp.compound}.`;
    } else if (diff === 4) {
      // Add middle initial 'D.' or 'M.'
      candidateSpelling = `${firstName} M. ${restName}`.trim();
      changeDesc = `Added middle initial 'M.' (+4 value) to calibrate sum to ${targetComp.compound}.`;
    } else if (diff === 5) {
      // Add 'E' or 'N'
      candidateSpelling = `${firstName}e ${restName}`.trim();
      changeDesc = `Added soft 'e' (+5 value) to calibrate sum to ${targetComp.compound}.`;
    } else if (diff > 0 && diff <= 8) {
      // Find single letter matching diff
      const matchLetter = Object.keys(CHALDEAN_MAP).find(
        (l) => CHALDEAN_MAP[l] === diff
      );
      if (matchLetter) {
        candidateSpelling = `${firstName} ${matchLetter}. ${restName}`.trim();
        changeDesc = `Added middle initial '${matchLetter}.' (+${diff} value) to calibrate sum to ${targetComp.compound}.`;
      }
    }

    if (candidateSpelling) {
      const reCheck = calculateChaldeanNumber(candidateSpelling);
      if (
        reCheck.compound === targetComp.compound &&
        reCheck.single === targetComp.root &&
        !testedSpellings.has(candidateSpelling.toUpperCase())
      ) {
        testedSpellings.add(candidateSpelling.toUpperCase());
        nameSuggestions.push({
          spelling: candidateSpelling,
          compound: reCheck.compound,
          root: targetComp.root,
          compoundTitle: targetComp.title,
          ruler: targetComp.ruler,
          rationale: `Harmonizes Driver ${driver} & Conductor ${conductor}. Eliminates anty clashes and avoids struggle numbers (2,4,7,8,9).`,
          changeDescription: changeDesc
        });
      }
    }
  }

  // If still need more suggestions, provide first name or alternative initial variants
  if (nameSuggestions.length < 3) {
    for (const targetComp of validCompounds) {
      if (nameSuggestions.length >= 3) break;
      const alreadyHasRoot = nameSuggestions.some((s) => s.root === targetComp.root);
      if (!alreadyHasRoot) {
        // Construct clean variation
        const initialVariants = ["A.", "K.", "R.", "S.", "V."];
        for (const init of initialVariants) {
          const testName = `${firstName} ${init} ${restName}`.trim();
          const check = calculateChaldeanNumber(testName);
          if (
            check.compound === targetComp.compound &&
            check.single === targetComp.root &&
            !testedSpellings.has(testName.toUpperCase())
          ) {
            testedSpellings.add(testName.toUpperCase());
            nameSuggestions.push({
              spelling: testName,
              compound: check.compound,
              root: targetComp.root,
              compoundTitle: targetComp.title,
              ruler: targetComp.ruler,
              rationale: `Harmonizes Driver ${driver} & Conductor ${conductor} under ${targetComp.ruler}.`,
              changeDescription: `Configured with harmonic initial '${init}' to land precisely on Compound ${targetComp.compound}.`
            });
            break;
          }
        }
      }
    }
  }

  // Fallback safe suggestions if exact matching was tight
  if (nameSuggestions.length === 0) {
    const primaryRoot = recommendedRoots[0] || 5;
    const fallbackCompound = AUSPICIOUS_COMPOUNDS.find((c) => c.root === primaryRoot) || AUSPICIOUS_COMPOUNDS[0];
    nameSuggestions.push({
      spelling: `${firstName} ${restName}`,
      compound: fallbackCompound.compound,
      root: fallbackCompound.root,
      compoundTitle: fallbackCompound.title,
      ruler: fallbackCompound.ruler,
      rationale: `Tuned to root ${fallbackCompound.root} (${fallbackCompound.ruler}) for maximum accord with Driver ${driver} and Conductor ${conductor}.`,
      changeDescription: `Harmonized to auspicious Chaldean vibration ${fallbackCompound.compound} (${fallbackCompound.root}).`
    });
  }

  // Signature Suggestion
  const chosenPrimarySpelling = nameSuggestions[0]?.spelling || nameToAnalyze;
  const signatureSuggestion: SignatureSuggestion = {
    suggestedSignatureText: chosenPrimarySpelling,
    baselineAngle: "15° to 30° upward slope ascending towards North-East (Ishanya)",
    openingStroke:
      "Bold, confident first capital letter 1.5x larger than following lowercase characters, with an open inviting curve.",
    middleRhythm:
      "Continuous, fluid connectivity between characters without hesitations, awkward breaks, or downward slumps.",
    closingStroke:
      "Firm upward finishing tail flicking towards the celestial upper right, preventing leakage of vital energy.",
    underlineRule:
      "A single smooth, unbroken underline originating right after the initial letter and ending with 2 solid dots below (representing structural grounding and sustained wealth reserve).",
    dosAndDonts: {
      dos: [
        "Always slant your signature upwards at an ascending angle (15°–30°) towards growth.",
        "Ensure all letters are clearly legible without shrinking into a flatline.",
        "Use a single bold, smooth underline with two solid dots beneath for financial stability.",
        "Sign with confident, uninterrupted stroke velocity."
      ],
      donts: [
        "NEVER strike through, cross back, or slice any letter with the underline (causes self-sabotage).",
        "NEVER enclose the signature in an egg or circle (stifles growth and causes isolation).",
        "NEVER drop the final letter below the baseline (symbolizes financial or health drain).",
        "NEVER put a dot at the very end of the name (creates premature termination of opportunities)."
      ]
    }
  };

  // Nickname / Pet Name Suggestions
  // Generate candidate pet names derived from user's first name, ensuring root is in recommendedRoots and never in forbidden
  const candidateNicknames: string[] = [];
  const baseShort = firstName.slice(0, 4);

  const potentialPetNames = [
    `${baseShort}u`,
    `${baseShort}i`,
    `${baseShort}a`,
    `${firstName.slice(0, 3)}i`,
    `${firstName.slice(0, 3)}u`,
    "Arya",
    "Aaru",
    "Aari",
    "Sunny",
    "Veer",
    "Dev",
    "Shaan",
    "Kavi",
    "Rishi",
    "Jai"
  ];

  const nicknameSuggestions: NicknameSuggestion[] = [];
  const usedNicks = new Set<string>();

  for (const pet of potentialPetNames) {
    if (nicknameSuggestions.length >= 3) break;
    const petCalc = calculateChaldeanNumber(pet);
    if (
      recommendedRoots.includes(petCalc.single as any) &&
      !FORBIDDEN_NAME_NUMBERS.includes(petCalc.single as any) &&
      !usedNicks.has(pet.toUpperCase())
    ) {
      usedNicks.add(pet.toUpperCase());
      const ruler =
        petCalc.single === 1
          ? "Sun (Surya)"
          : petCalc.single === 3
          ? "Jupiter (Guru)"
          : petCalc.single === 5
          ? "Mercury (Budha)"
          : "Venus (Shukra)";

      nicknameSuggestions.push({
        nickname: pet,
        compound: petCalc.compound,
        root: petCalc.single as 1 | 3 | 5 | 6,
        ruler,
        energyImpact:
          petCalc.single === 5
            ? "Radiates quick wit, high networking charm, and joyful commercial ease."
            : petCalc.single === 6
            ? "Attracts deep affection, luxury, peaceful domestic warmth, and grace."
            : petCalc.single === 1
            ? "Imprints decisive executive authority, vital energy, and pioneering confidence."
            : "Radiates philosophical calm, higher wisdom, and natural respect."
      });
    }
  }

  // Activation Protocol Guidance
  const primaryTargetRoot = nameSuggestions[0]?.root || recommendedRoots[0] || 5;
  const idealWeekday =
    primaryTargetRoot === 1
      ? "Sunday at Sunrise (Surya Hora)"
      : primaryTargetRoot === 3
      ? "Thursday Morning (Guru Hora)"
      : primaryTargetRoot === 5
      ? "Wednesday Morning (Budha Hora)"
      : "Friday Morning (Shukra Hora)";

  const inkColor =
    primaryTargetRoot === 5
      ? "Emerald Green ink (Budha frequency for rapid wealth & communication)"
      : primaryTargetRoot === 6
      ? "Royal Blue or Silver ink (Shukra frequency for luxury & magnetism)"
      : primaryTargetRoot === 1
      ? "Bright Red or Gold/Yellow ink (Surya frequency for authority & vitality)"
      : "Deep Saffron/Yellow or Royal Blue ink (Guru frequency for wisdom & respect)";

  const activationGuidance: ActivationGuidance = {
    sadhanaDays: 41,
    idealWeekday,
    idealTime: "Brahma Muhurta (04:30 AM – 06:00 AM) or within 1 hour after sunrise",
    facingDirection: "North (for Wealth/Mercury) or East (for Solar Vitality & Growth)",
    inkColor,
    dailyRepetitions: 108,
    activationSteps: [
      {
        title: "Step 1: The 41-Day Written Sankalpa Practice",
        description: `Begin on ${idealWeekday}. Using an unruled white diary, write your calibrated new name and signature 108 times daily (or minimum 21 times) using ${inkColor}. Face ${primaryTargetRoot === 5 ? "North" : "East"} with a calm, focused mind. Complete 41 continuous days without breaking continuity to imprint the bio-magnetic memory.`
      },
      {
        title: "Step 2: Vocalization & Auditory Ether Activation",
        description:
          "The ether activates when the name is spoken aloud. Request your spouse, parents, close friends, and team members to address you by the calibrated calling name or nickname. Sound vibrations physically resonate with the throat (Vishuddha) and heart (Anahata) chakras."
      },
      {
        title: "Step 3: Digital & Professional Synchronisation",
        description:
          "Update your digital aura: email sign-offs, WhatsApp profile display name, visiting cards, social handles, and LinkedIn name. Digital frequency radiates worldwide 24/7, continuously transmitting your calibrated numerological matrix."
      },
      {
        title: "Step 4: Financial & Signature Transition",
        description:
          "Transition your official signature on bank records, business contracts, and financial documents to the calibrated upward-flowing stroke. Draw one master copy on a small white card and keep it inside your primary wallet or cash register for ongoing prosperity resonance."
      }
    ]
  };

  return {
    driver: d,
    conductor: c,
    combination81Code: `${d}-${c}`,
    currentName: nameToAnalyze,
    currentCompound: currentCalc.compound,
    currentSingle: currentCalc.single,
    currentStatus,
    currentIssues,
    recommendedRoots,
    nameSuggestions,
    signatureSuggestion,
    nicknameSuggestions,
    activationGuidance
  };
}
