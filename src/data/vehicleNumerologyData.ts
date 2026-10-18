// src/data/vehicleNumerologyData.ts
// Complete Data for Chapter Twenty-Nine: Vehicle Number Numerology
// Detailed paragraphs for Vehicle Primary Numbers 1-9, Four Calculation Methods, Karmic Debts, Auspicious Compounds, Colour Compatibility, and Remedies.

export interface VehiclePrimaryReading {
  number: number;
  title: string;
  frequencyName: string;
  vibrationalEnergy: string;
  whatItCreates: string;
  bestFor: string[];
  avoidFor: string[];
  safetyAndRoadQuality: string;
  specificChallenges: string;
}

export const VEHICLE_PRIMARY_READINGS: Record<number, VehiclePrimaryReading> = {
  1: {
    number: 1,
    title: "Vehicle Primary 1 — The Leadership Vehicle",
    frequencyName: "Authority, Independence & Bold Forward Movement",
    vibrationalEnergy: "Independent authority, pioneering momentum, self-directed confidence, and commanding road presence.",
    whatItCreates: "A vehicle whose registration sum produces Primary Number 1 carries the vibrational frequency of independent authority and pioneering forward movement. Journeys in this vehicle possess a clear directional confidence. Other road users instinctively respect its forward momentum. Professionally, it serves as a direct extension of executive presence.",
    bestFor: [
      "Entrepreneurs & Business Owners",
      "Senior Corporate Executives & CEOs",
      "Independent Consultants & Solo Professionals",
      "Sports Vehicles & Executive Sedans",
      "Pioneering Solo Travelers"
    ],
    avoidFor: [
      "Family Vans & Shared Community Transport",
      "School Transportation Fleets",
      "Cooperative Non-Profit Ambulances"
    ],
    safetyAndRoadQuality: "Provides safety through unhesitating decisiveness. The clear, direct momentum reduces road ambiguity and hesitation. Drivers make road decisions with clarity.",
    specificChallenges: "The competitive edge of the 1 vibration can occasionally prompt aggressive lane assertion or traffic rivalry if not consciously tempered."
  },
  2: {
    number: 2,
    title: "Vehicle Primary 2 — The Partnership Vehicle",
    frequencyName: "Cooperative Safety, Warmth & Protective Calm",
    vibrationalEnergy: "Cooperative warmth, protective calm, empathic road sensing, and harmonious relational travel.",
    whatItCreates: "A vehicle whose registration sum produces Primary Number 2 vibrates with protective relational harmony and cooperative warmth. Journeys feel peaceful, buffered by a calm energetic field. The driver becomes instinctively sensitive to surrounding traffic flows and pedestrian movements.",
    bestFor: [
      "Family Cars & Shared Domestic Vehicles",
      "Healthcare Practitioners & Home-Visit Vans",
      "Counselors, Therapists & Social Service Vans",
      "School Buses & Children's Transport",
      "Cooperative Team Vehicles"
    ],
    avoidFor: [
      "High-speed Competitive Sports Cars",
      "Aggressive Commercial Transport Fleets"
    ],
    safetyAndRoadQuality: "Highly protective for family travel. The driver reads subtle road shifts and anticipates fellow drivers' actions, creating a safe, cushioned journey environment.",
    specificChallenges: "The yielding nature of the 2 frequency may occasionally cause over-deference or hesitation in dense merging traffic."
  },
  3: {
    number: 3,
    title: "Vehicle Primary 3 — The Joyful Vehicle",
    frequencyName: "Creative Energy, Social Warmth & Expressive Journeys",
    vibrationalEnergy: "Joyful creative expression, uplifting travel energy, social magnetism, and vibrant travel momentum.",
    whatItCreates: "A vehicle whose registration sum produces Primary Number 3 carries the frequency of joyful creative expression and social magnetism. Travel in this vehicle feels light, adventurous, and pleasurable. It attracts friendly road encounters, smooth scenic drives, and positive social engagements.",
    bestFor: [
      "Creative Artists, Performers & Designers",
      "Media, Entertainment & Event Vehicles",
      "Tourism & Leisure Road Trip Vehicles",
      "Young Professionals & Lifestyle Brands",
      "Public Relations & Marketing Field Cars"
    ],
    avoidFor: [
      "Heavy Freight Logistics & Industrial Machinery",
      "Solemn Judicial or Funeral Transport"
    ],
    safetyAndRoadQuality: "Infuses road travel with optimism and pleasure, turning routine commutes into engaging journeys. Promotes upbeat mood among passengers.",
    specificChallenges: "The festive 3 energy can occasionally distract the driver with scenery or lively passenger conversations, requiring mindful attention to the road."
  },
  4: {
    number: 4,
    title: "Vehicle Primary 4 — The Reliable Vehicle",
    frequencyName: "Methodical Protection, Precision & Trustworthy Performance",
    vibrationalEnergy: "Methodical safety, mechanical stability, disciplined endurance, and structural reliability.",
    whatItCreates: "A vehicle whose registration sum produces Primary Number 4 vibrates with disciplined, reliable competence. It is widely considered one of the most protective numbers for heavy commercial use, long-distance highway travel, and demanding road conditions. The vehicle exhibits consistent mechanical stamina.",
    bestFor: [
      "Commercial Freight Lorries & Logistics Trucks",
      "Ambulances & Emergency Response Units",
      "School Buses & Public Transit Fleets",
      "Engineers, Architects & Field Operations",
      "High-mileage Highway Commuter Cars"
    ],
    avoidFor: [
      "Spontaneous Trend-based Marketing Vehicles",
      "High-risk Speculative Entertainment Cars"
    ],
    safetyAndRoadQuality: "Unmatched structural and procedural safety. The driver naturally adheres to traffic rules, maintains safe braking distances, and conducts regular maintenance checks.",
    specificChallenges: "Can exhibit rigid travel patterns, favoring familiar routes and showing slight inertia when sudden detour adaptations are required."
  },
  5: {
    number: 5,
    title: "Vehicle Primary 5 — The Dynamic Vehicle",
    frequencyName: "Versatile Energy, Adventure & Freedom Frequency",
    vibrationalEnergy: "Dynamic adaptability, multi-route flexibility, commercial expansion, and lively travel energy.",
    whatItCreates: "A vehicle whose registration sum produces Primary Number 5 carries the frequency of dynamic versatility and adventurous exploration. It thrives on diverse routes, cross-city deliveries, long interstate road trips, and changing road conditions, attracting continuous movement and fresh opportunities.",
    bestFor: [
      "Commercial Sales Representatives & Field Agents",
      "Courier, Delivery & Express Logistics Fleets",
      "Travel Photographers, Explorers & Touring Vans",
      "Event Organizers & Import-Export Business Cars",
      "Dynamic Serial Entrepreneurs"
    ],
    avoidFor: [
      "Strict Fixed-route Institutional Transport",
      "Inpatient Healthcare Transit Vans"
    ],
    safetyAndRoadQuality: "Excellent adaptability in unpredictable traffic or weather conditions. The driver reacts quickly to sudden road obstacles.",
    specificChallenges: "The restless 5 vibration can tempt the driver toward speeding or impulsive overtaking, demanding strict self-discipline behind the wheel."
  },
  6: {
    number: 6,
    title: "Vehicle Primary 6 — The Protective Vehicle",
    frequencyName: "Family Safety, Protective Care & Nurturing Energy",
    vibrationalEnergy: "Nurturing protection, domestic harmony, aesthetic elegance, and responsible care.",
    whatItCreates: "A vehicle whose registration sum produces Primary Number 6 carries the warm, protective frequency of family care and aesthetic refinement. It is the premier choice for family transport, school pickups, luxury passenger cars, and healthcare home-visit vehicles. It creates a serene, cocoon-like interior space.",
    bestFor: [
      "Family SUVs, MPVs & Domestic Personal Cars",
      "School Vans & Children's Transport",
      "Doctors, Nurses & Wellness Practitioners",
      "Luxury Passenger Transport & VIP Chauffeurs",
      "Interior Designers & Fashion Industry Cars"
    ],
    avoidFor: [
      "Aggressive Off-road Mining Transport",
      "Hostile Commercial Freight Operation"
    ],
    safetyAndRoadQuality: "Proactively protective. The driver demonstrates exceptional consideration for pedestrians, children, and fellow road users, creating a high-safety environment.",
    specificChallenges: "The driver may exhibit extreme caution at intersections or merging lanes, occasionally causing slight traffic slowing behind."
  },
  7: {
    number: 7,
    title: "Vehicle Primary 7 — The Wisdom Vehicle",
    frequencyName: "Analytical Depth, Specialist Safety & Quiet Focus",
    vibrationalEnergy: "Analytical observation, specialized research, patient road navigation, and reflective calm.",
    whatItCreates: "A vehicle whose registration sum produces Primary Number 7 vibrates with analytical depth, specialist wisdom, and quiet road poise. It is ideal for long solo commutes, specialist consultants, academics, and researchers who use drive time for deep mental synthesis and strategic clarity.",
    bestFor: [
      "Specialist Doctors, Surgeons & Legal Counsel",
      "Researchers, Academics & System Strategists",
      "Solo Long-Distance Highway Travelers",
      "Field Investigators, Journalists & Psychologists",
      "Executive Technical Consultants"
    ],
    avoidFor: [
      "Mass Party Buses & High-Noise Social Vans",
      "High-volume Retail Delivery Fleets"
    ],
    safetyAndRoadQuality: "Exceptional analytical safety. The driver notices subtle road hazards—surface slickness, distant brake lights, weather shifts—well before others.",
    specificChallenges: "If the driver is prone to deep daydreaming or mental preoccupation, the reflective 7 energy must be disciplined to keep eyes sharply on the road."
  },
  8: {
    number: 8,
    title: "Vehicle Primary 8 — The Authority Vehicle",
    frequencyName: "Executive Presence, Material Power & High-Stakes Commerce",
    vibrationalEnergy: "Executive authority, commercial scale, heavy-duty capability, and commanding road gravitas.",
    whatItCreates: "A vehicle whose registration sum produces Primary Number 8 radiates executive authority and material competence. It is the definitive choice for corporate heads, industrial fleet owners, real estate developers, and high-consequence business executives. It commands immediate road respect.",
    bestFor: [
      "Business Owners, CEOs & Managing Directors",
      "Industrial Fleet Lorries & Construction Rigs",
      "Real Estate Developers & Investment Brokers",
      "Corporate Legal Counsel & Senior Dignitaries",
      "Premium High-End Executive Automobiles"
    ],
    avoidFor: [
      "Non-profit Social Work Community Cars",
      "Gentle Meditation & Healing Sanctuary Vans"
    ],
    safetyAndRoadQuality: "Commanding road authority that deters road intimidation. Handles heavy road loads and demanding long-distance schedules with rugged endurance.",
    specificChallenges: "The strong executive 8 energy can foster a subtle aura of road dominance, requiring the driver to avoid aggressive driving maneuvers."
  },
  9: {
    number: 9,
    title: "Vehicle Primary 9 — The Universal Vehicle",
    frequencyName: "Humanitarian Protection, Universal Service & Spiritual Shielding",
    vibrationalEnergy: "Universal wisdom, broad compassionate protection, humanitarian service, and high spiritual shielding.",
    whatItCreates: "A vehicle whose registration sum produces Primary Number 9 carries the high vibrational frequency of universal service, spiritual protection, and humanitarian breadth. It is widely revered in Chaldean numerology as a spiritually shielded vehicle that navigates severe road hazards safely.",
    bestFor: [
      "Ambulances & Emergency Disaster Vehicles",
      "NGOs, Humanitarian Service & Philanthropic Fleets",
      "Spiritual Teachers, Healers & Pilgrimage Transport",
      "Doctors, Holistic Practitioners & Educators",
      "Global Travelers & Community Organizers"
    ],
    avoidFor: [
      "Aggressive Short-term Commercial Exploitation",
      "High-friction Repo or Debt Collection Vans"
    ],
    safetyAndRoadQuality: "Profound energetic shielding during hazardous traffic moments. Drivers experience heightened intuitive warnings near dangerous junctions.",
    specificChallenges: "Drivers may feel eager to reach their destination quickly near the end of long trips, requiring patience during the final few kilometers."
  }
};

export const VEHICLE_LIFE_PATH_COMPATIBILITY: Record<number, { best: number[]; avoid: number[]; explanation: string }> = {
  1: {
    best: [1, 5, 7],
    avoid: [8, 2],
    explanation: "Life Path 1 aligns with Vehicle Primary 1 (independent authority), Vehicle 5 (dynamic versatility), and Vehicle 7 (specialist depth). Avoid Vehicle 8 (conflict of executive authority) and Vehicle 2 (overly gentle for LP1's pioneer drive)."
  },
  2: {
    best: [2, 4, 6],
    avoid: [1, 8],
    explanation: "Life Path 2 thrives with Vehicle Primary 2 (cooperative safety), Vehicle 4 (methodical reliability), and Vehicle 6 (protective care). Avoid Vehicle 1 and 8 as their aggressive road presence conflicts with LP2's peaceful orientation."
  },
  3: {
    best: [3, 6, 9],
    avoid: [4, 8],
    explanation: "Life Path 3 shines with Vehicle Primary 3 (joyful expressiveness), Vehicle 6 (artistic harmony), and Vehicle 9 (universal breadth). Avoid Vehicle 4 and 8, which impose heavy industrial gravity on LP3's creative spirit."
  },
  4: {
    best: [4, 8, 1],
    avoid: [3, 5],
    explanation: "Life Path 4 excels with Vehicle Primary 4 (methodical precision), Vehicle 8 (commercial authority), and Vehicle 1 (focused leadership). Avoid Vehicle 3 and 5 due to their unpredictable or scattered travel energy."
  },
  5: {
    best: [5, 1, 3],
    avoid: [4, 2],
    explanation: "Life Path 5 flourishes with Vehicle Primary 5 (dynamic versatility), Vehicle 1 (independent pioneering), and Vehicle 3 (joyful travel). Avoid Vehicle 4 and 2, which restrict LP5's freedom and fast momentum."
  },
  6: {
    best: [6, 2, 9],
    avoid: [1, 8],
    explanation: "Life Path 6 is harmonized by Vehicle Primary 6 (family protective care), Vehicle 2 (empathic calm), and Vehicle 9 (universal compassion). Avoid Vehicle 1 and 8, which project harsh commercial competition."
  },
  7: {
    best: [7, 1, 5],
    avoid: [2, 6],
    explanation: "Life Path 7 commands respect with Vehicle Primary 7 (analytical specialist wisdom), Vehicle 1 (independent travel), and Vehicle 5 (adaptable exploration). Avoid Vehicle 2 and 6, which attract excessive casual social demands."
  },
  8: {
    best: [8, 4, 1],
    avoid: [2, 3],
    explanation: "Life Path 8 achieves commercial power with Vehicle Primary 8 (executive authority), Vehicle 4 (methodical endurance), and Vehicle 1 (pioneering leadership). Avoid Vehicle 2 and 3, which project overly gentle or informal tones."
  },
  9: {
    best: [9, 6, 3],
    avoid: [5, 4],
    explanation: "Life Path 9 fulfills its mission with Vehicle Primary 9 (universal service & shielding), Vehicle 6 (caring protection), and Vehicle 3 (inspiring journeys). Avoid Vehicle 4 and 5, which disrupt LP9's humanitarian vision."
  },
  11: {
    best: [2, 7, 9, 6],
    avoid: [1, 8],
    explanation: "Master Life Path 11 resonates with Master intuitive and illuminating vehicle vibrations (Vehicle 2, 7, 9, 6)."
  },
  22: {
    best: [4, 8, 6, 1],
    avoid: [3, 5],
    explanation: "Master Life Path 22 resonates with Master Builder execution vehicle frequencies (Vehicle 4, 8, 6, 1)."
  },
  33: {
    best: [6, 9, 3, 2],
    avoid: [4, 8],
    explanation: "Master Life Path 33 resonates with Master Teacher & Universal Healer vehicle frequencies (Vehicle 6, 9, 3, 2)."
  }
};

export const VEHICLE_COLOUR_GUIDE: Record<number, { bestColours: string[]; avoidColours: string[]; explanation: string }> = {
  1: {
    bestColours: ["Red", "Orange", "Bright Yellow", "Gold", "White"],
    avoidColours: ["Pure Black"],
    explanation: "Solar initiating colours (Red, Gold, Yellow) amplify Primary 1's forward authority. Black's absorption conflicts with outward 1 drive."
  },
  2: {
    bestColours: ["White", "Silver", "Cream", "Pearl", "Light Blue"],
    avoidColours: ["Bright Red", "Fiery Orange"],
    explanation: "Lunar receptive colours (White, Silver) support Primary 2's peaceful calm. Fiery red introduces competitive friction."
  },
  3: {
    bestColours: ["Yellow", "Sky Blue", "Light Purple", "Lime Green"],
    avoidColours: ["Dull Grey", "Dark Brown"],
    explanation: "Jovial expressive colours (Yellow, Sky Blue) enhance Primary 3's creative optimism."
  },
  4: {
    bestColours: ["Navy Blue", "Grey", "Earth Brown", "Matte Black", "Silver"],
    avoidColours: ["Bright Pink", "Neon Yellow"],
    explanation: "Grounded methodical tones (Navy, Grey, Earth) align with Primary 4's practical discipline."
  },
  5: {
    bestColours: ["Green", "Turquoise", "Emerald", "Metallic Silver", "Dual-Tone"],
    avoidColours: ["Dull Rust"],
    explanation: "Mercurial adaptive colours (Green, Turquoise) resonate with Primary 5's dynamic movement."
  },
  6: {
    bestColours: ["Pink", "Rose Gold", "Indigo", "Cream", "Soft Sky Blue"],
    avoidColours: ["Harsh Neon Orange"],
    explanation: "Venusian aesthetic tones (Rose Gold, Indigo, Cream) amplify Primary 6's protective domestic harmony."
  },
  7: {
    bestColours: ["Deep Violet", "Purple", "Dark Blue", "Charcoal Grey"],
    avoidColours: ["Flashy Neon Red"],
    explanation: "Contemplative analytical shades (Violet, Charcoal, Dark Blue) suit Primary 7's quiet specialist depth."
  },
  8: {
    bestColours: ["Dark Navy", "Black", "Dark Maroon", "Deep Chocolate Brown"],
    avoidColours: ["Light Pink"],
    explanation: "Executive material tones (Dark Navy, Black, Maroon) match Primary 8's commercial gravitas."
  },
  9: {
    bestColours: ["Crimson Red", "Maroon", "Gold", "Pure White"],
    avoidColours: ["Dull Muddy Brown"],
    explanation: "Martial and solar service tones (Crimson, Gold, White) reinforce Primary 9's universal shielding."
  }
};

export interface VehicleParsedData {
  rawInput: string;
  stateCode: string;
  districtCode: string;
  seriesLetters: string;
  fourDigitRegistration: string;
  districtCodeSum: number;
  seriesChaldeanSum: number;
  fourDigitSum: number;
  primaryNumber: number;
  compoundNumber: number;
  isKarmicDebt: boolean;
  karmicDebtCode?: number; // 13, 14, 16, 19
  isAuspiciousCompound: boolean;
  auspiciousCompoundCode?: number; // 15, 21, 23, 27
  lastTwoDigits: string;
  lastTwoDigitsCompound: number;
  lastTwoDigitsAuspicious: boolean;
  lastTwoDigitsKarmic: boolean;
  completePlateSum: number;
  specialPatterns: {
    isRepeatingQuad: boolean;
    repeatingDigit?: number;
    isSequential: boolean;
    sequenceType?: string;
    isMirror: boolean;
    hasSacred786: boolean;
    hasSacred108: boolean;
  };
  reading: VehiclePrimaryReading;
  compatibilityWithLifePath?: {
    lifePath: number;
    isBest: boolean;
    isAvoid: boolean;
    explanation: string;
  };
  colourGuide: {
    bestColours: string[];
    avoidColours: string[];
    explanation: string;
  };
}

export function parseAndEvaluateVehicleNumber(
  rawInput: string,
  lifePathNum?: number
): VehicleParsedData | null {
  if (!rawInput || rawInput.trim().length < 3) return null;

  const cleaned = rawInput.toUpperCase().replace(/[^A-Z0-9]/g, "");

  // Try to parse Indian standard plate format: e.g. MH02CD1234
  // Pattern: State (2 letters), District (2 digits), Series (1-3 letters), Number (1-4 digits)
  let stateCode = "";
  let districtCode = "";
  let seriesLetters = "";
  let fourDigitRegistration = "";

  const indianMatch = cleaned.match(/^([A-Z]{2})([0-9]{2})([A-Z]{1,3})?([0-9]{1,4})$/);

  if (indianMatch) {
    stateCode = indianMatch[1];
    districtCode = indianMatch[2];
    seriesLetters = indianMatch[3] || "";
    fourDigitRegistration = indianMatch[4].padStart(4, "0");
  } else {
    // Fallback: extract last 4 digits (or all digits)
    const digitsOnly = cleaned.replace(/[^0-9]/g, "");
    if (digitsOnly.length === 0) return null;

    if (digitsOnly.length >= 4) {
      fourDigitRegistration = digitsOnly.slice(-4);
      districtCode = digitsOnly.length >= 6 ? digitsOnly.slice(0, 2) : "00";
    } else {
      fourDigitRegistration = digitsOnly.padStart(4, "0");
      districtCode = "00";
    }

    const lettersOnly = cleaned.replace(/[^A-Z]/g, "");
    stateCode = lettersOnly.slice(0, 2);
    seriesLetters = lettersOnly.slice(2);
  }

  // 1. District Code Sum
  const districtDigits = districtCode.split("").map(Number);
  const districtCodeSum = districtDigits.reduce((a, b) => a + b, 0);

  // 2. Series Chaldean Sum
  const chaldeanValues: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1, J: 1, K: 2, L: 3, M: 4,
    N: 5, O: 7, P: 8, Q: 1, R: 2, S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7
  };

  let seriesChaldeanSum = 0;
  seriesLetters.split("").forEach(char => {
    if (chaldeanValues[char]) seriesChaldeanSum += chaldeanValues[char];
  });

  // 3. Four Digit Registration Sum & Primary Number
  const fourDigitsArr = fourDigitRegistration.split("").map(Number);
  const fourDigitSum = fourDigitsArr.reduce((a, b) => a + b, 0);

  let compoundNumber = fourDigitSum;
  let primaryNumber = compoundNumber;

  while (primaryNumber > 9) {
    primaryNumber = String(primaryNumber)
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }

  // Check Karmic Debt on fourDigitSum
  const isKarmicDebt = [13, 14, 16, 19].includes(compoundNumber);
  const karmicDebtCode = isKarmicDebt ? compoundNumber : undefined;

  // Check Auspicious Compound on fourDigitSum
  const isAuspiciousCompound = [15, 21, 23, 27, 33, 42].includes(compoundNumber);
  const auspiciousCompoundCode = isAuspiciousCompound ? compoundNumber : undefined;

  // 4. Last Two Digits Reading
  const lastTwoDigits = fourDigitRegistration.slice(-2);
  const lastTwoArr = lastTwoDigits.split("").map(Number);
  const lastTwoDigitsCompound = lastTwoArr.reduce((a, b) => a + b, 0);
  const lastTwoDigitsAuspicious = [15, 21, 23, 27].includes(lastTwoDigitsCompound);
  const lastTwoDigitsKarmic = [13, 14, 16, 19].includes(lastTwoDigitsCompound);

  // 5. Complete Plate Sum (All digits)
  const allDigits = cleaned.replace(/[^0-9]/g, "").split("").map(Number);
  let completePlateSum = allDigits.reduce((a, b) => a + b, 0) + seriesChaldeanSum;
  while (completePlateSum > 9) {
    completePlateSum = String(completePlateSum).split("").map(Number).reduce((a, b) => a + b, 0);
  }

  // 6. Special Patterns
  const isRepeatingQuad = fourDigitsArr.every(d => d === fourDigitsArr[0]);
  const repeatingDigit = isRepeatingQuad ? fourDigitsArr[0] : undefined;

  let isSequential = false;
  let sequenceType = "";
  if (fourDigitRegistration === "1234" || fourDigitRegistration === "2345" || fourDigitRegistration === "3456" || fourDigitRegistration === "4567" || fourDigitRegistration === "5678" || fourDigitRegistration === "6789") {
    isSequential = true;
    sequenceType = "Ascending Sequential (Forward Growth Momentum)";
  } else if (fourDigitRegistration === "9876" || fourDigitRegistration === "8765" || fourDigitRegistration === "7654" || fourDigitRegistration === "6543" || fourDigitRegistration === "5432" || fourDigitRegistration === "4321") {
    isSequential = true;
    sequenceType = "Descending Sequential (Resolution & Cycle Completion)";
  }

  const isMirror = fourDigitRegistration === fourDigitRegistration.split("").reverse().join("");
  const hasSacred786 = cleaned.includes("786");
  const hasSacred108 = cleaned.includes("108");

  const reading = VEHICLE_PRIMARY_READINGS[primaryNumber] || VEHICLE_PRIMARY_READINGS[1];

  let compatibilityWithLifePath: VehicleParsedData["compatibilityWithLifePath"] = undefined;
  if (lifePathNum && VEHICLE_LIFE_PATH_COMPATIBILITY[lifePathNum]) {
    const compData = VEHICLE_LIFE_PATH_COMPATIBILITY[lifePathNum];
    const isBest = compData.best.includes(primaryNumber);
    const isAvoid = compData.avoid.includes(primaryNumber);

    compatibilityWithLifePath = {
      lifePath: lifePathNum,
      isBest,
      isAvoid,
      explanation: compData.explanation
    };
  }

  const colourGuide = VEHICLE_COLOUR_GUIDE[primaryNumber] || VEHICLE_COLOUR_GUIDE[1];

  return {
    rawInput,
    stateCode,
    districtCode,
    seriesLetters,
    fourDigitRegistration,
    districtCodeSum,
    seriesChaldeanSum,
    fourDigitSum,
    primaryNumber,
    compoundNumber,
    isKarmicDebt,
    karmicDebtCode,
    isAuspiciousCompound,
    auspiciousCompoundCode,
    lastTwoDigits,
    lastTwoDigitsCompound,
    lastTwoDigitsAuspicious,
    lastTwoDigitsKarmic,
    completePlateSum,
    specialPatterns: {
      isRepeatingQuad,
      repeatingDigit,
      isSequential,
      sequenceType,
      isMirror,
      hasSacred786,
      hasSacred108
    },
    reading,
    compatibilityWithLifePath,
    colourGuide
  };
}

export const CHAPTER_TWENTY_NINE_THEORY = {
  chapterNumber: "Chapter Twenty-Nine",
  title: "Vehicle Number Numerology",
  quote: {
    text: "A vehicle is not just a machine that carries the body — it is a vibrational field that carries the life. Choose its number with the same care you would choose any other number that defines your identity.",
    author: "Applied Numerology Tradition"
  },
  fourMethodsSummary: [
    {
      name: "1. Primary Number (Four-Digit Sum)",
      description: "Summing the final 4-digit registration number to a single root digit. Governs the primary travel frequency and safety field."
    },
    {
      name: "2. Series Number (Alphabetical Series)",
      description: "Assigning Chaldean numerical values to the series letters (e.g. CD = 3+4 = 7) to assess system placement."
    },
    {
      name: "3. Area Code Number (District Code)",
      description: "Summing the two-digit regional transport authority code (e.g. 02 = 2) for local regional energetic grounding."
    },
    {
      name: "4. Last Digits Compound Reading",
      description: "Evaluating the final two digits as a Chaldean compound signature (e.g. ending in 15, 21, 23, or 27)."
    }
  ],
  consecrationRitualSteps: [
    "1. Wash the vehicle with water infused with a small amount of Gangajal or sanctified water.",
    "2. Apply a small tilak of red kumkum to the front bonnet and steering wheel.",
    "3. Place a protective Ganesha or Hanuman yantra inside the glove compartment.",
    "4. Offer incense around the vehicle while chanting 'Om Gam Ganapataye Namaha' 3 times before starting each major trip."
  ]
};
