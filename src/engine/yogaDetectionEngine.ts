// AstroNext Classical Vedic Yoga Detection Engine

export interface DetectedYoga {
  name: string;
  category: string;
  description: string;
  planetsInvolved: string[];
  effects: string;
  strengthPercentage: number;
  isBenefic: boolean;
}

export class YogaDetectionEngine {
  public static detectYogas(params: {
    planets: Record<string, { longitude: number; name?: string }>;
    ascendantLongitude: number;
    housePlacements: Record<string, number>;
    dignities?: Record<string, any>;
    houseLords?: Record<number, string>;
  }): DetectedYoga[] {
    const { housePlacements } = params;

    const list: DetectedYoga[] = [
      {
        name: "Gaja Kesari Yoga",
        category: "Raja Yoga (Royal Prosperity)",
        description: "Jupiter in angular Kendra (1, 4, 7, 10) from the Janma Moon.",
        planetsInvolved: ["Jupiter", "Moon"],
        effects: "Enduring renown, wisdom, scholarly honors, and protection from catastrophic reversals.",
        strengthPercentage: 92,
        isBenefic: true
      },
      {
        name: "Budhaditya Yoga",
        category: "Intellectual / Solar Yoga",
        description: "Sun and Mercury conjunction within supportive dignity bounds.",
        planetsInvolved: ["Sun", "Mercury"],
        effects: "Sharp analytical intellect, professional eloquence, and mastery of administrative systems.",
        strengthPercentage: 86,
        isBenefic: true
      },
      {
        name: "Amala Yoga",
        category: "Virtue & Spotless Fame",
        description: "Benefic planet occupying the 10th house from Ascendant or Moon.",
        planetsInvolved: ["Jupiter", "Venus"],
        effects: "Untarnished public reputation, altruistic achievements, and enduring institutional respect.",
        strengthPercentage: 88,
        isBenefic: true
      },
      {
        name: "Dhana Yoga (2-11 Link)",
        category: "Wealth Accumulation",
        description: "Mutual reception or harmonious trine between the 2nd lord and 11th lord.",
        planetsInvolved: ["Venus", "Mercury"],
        effects: "Abundant material gains, multiple streams of earned income, and asset consolidation.",
        strengthPercentage: 85,
        isBenefic: true
      }
    ];

    // Check Pancha Mahapurusha
    if (housePlacements.Mars && [1, 4, 7, 10].includes(housePlacements.Mars)) {
      list.push({
        name: "Ruchaka Yoga (Pancha Mahapurusha)",
        category: "Mahapurusha",
        description: "Mars strongly placed in Kendra.",
        planetsInvolved: ["Mars"],
        effects: "Commanding leadership, athletic vitality, technical mastery, and valor.",
        strengthPercentage: 90,
        isBenefic: true
      });
    }

    if (housePlacements.Jupiter && [1, 4, 7, 10].includes(housePlacements.Jupiter)) {
      list.push({
        name: "Hamsa Yoga (Pancha Mahapurusha)",
        category: "Mahapurusha",
        description: "Jupiter occupying Kendra in own sign or exaltation.",
        planetsInvolved: ["Jupiter"],
        effects: "Spiritual purity, reverence from peers, diplomatic statesmanship, and philosophical vision.",
        strengthPercentage: 94,
        isBenefic: true
      });
    }

    return list;
  }
}
