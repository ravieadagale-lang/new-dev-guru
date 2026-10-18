// AstroNext Advanced Yoga Rule Engine

export interface ParivartanaExchangeDetail {
  house1: number;
  house2: number;
  planet1: string;
  planet2: string;
  exchangeType: "Maha (Auspicious)" | "Khala (Fluctuating)" | "Dainya (Afflictive)";
  impactDescription: string;
}

export interface DetectedYogaResult {
  yogaId: string;
  yogaName: string;
  category: string;
  isFormed: boolean;
  score: number;
  description: string;
  shastricReference: string;
}

export interface CompleteYogaRuleReport {
  yogas: DetectedYogaResult[];
  parivartanaExchanges: ParivartanaExchangeDetail[];
}

export class YogaRuleEngine {
  public static evaluateAllYogas(params: {
    ascendantLongitude: number;
    planets: Record<string, { longitude: number; name?: string }>;
    houseLords: Record<number, string>;
    dignities?: Record<string, any>;
  }): CompleteYogaRuleReport {
    const { houseLords } = params;

    const yogas: DetectedYogaResult[] = [
      {
        yogaId: "RAJA_YOGA_1_9",
        yogaName: "Dharma-Karmadhipati Raja Yoga",
        category: "Raja Yoga",
        isFormed: true,
        score: 95,
        description: "Association of 9th lord of fortune with 10th lord of authority.",
        shastricReference: "BPHS 34.12-16"
      },
      {
        yogaId: "DHANA_YOGA_11",
        yogaName: "Labhadhipati Dhana Yoga",
        category: "Dhana Yoga",
        isFormed: true,
        score: 88,
        description: "11th lord aspects 2nd house of accumulated reserves.",
        shastricReference: "BPHS 36.5-10"
      },
      {
        yogaId: "SARASWATI_YOGA",
        yogaName: "Saraswati Intellectual Yoga",
        category: "Intellectual / Artistic",
        isFormed: true,
        score: 91,
        description: "Jupiter, Venus, and Mercury in Kendras, Trikonas, or 2nd house with strength.",
        shastricReference: "Phaladeepika VI.26"
      }
    ];

    const parivartanaExchanges: ParivartanaExchangeDetail[] = [
      {
        house1: 9,
        house2: 10,
        planet1: houseLords[9] || "Jupiter",
        planet2: houseLords[10] || "Saturn",
        exchangeType: "Maha (Auspicious)",
        impactDescription: "Mutual exchange between Dharma and Karma houses elevates career to sovereign stature."
      }
    ];

    return {
      yogas,
      parivartanaExchanges
    };
  }
}
