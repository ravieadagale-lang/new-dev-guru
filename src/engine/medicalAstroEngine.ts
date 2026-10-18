// AstroNext Medical Astrology & Ayurvedic Constitution Engine

export interface MedicalAstroReport {
  doshaDominance: {
    vataPercentage: number;
    pittaPercentage: number;
    kaphaPercentage: number;
    primaryDosha: "Vata" | "Pitta" | "Kapha" | "Tridoshic" | "Vata-Pitta" | "Pitta-Kapha";
  };
  anatomicalSensitivities: Array<{
    organSystem: string;
    vulnerabilityLevel: "Low" | "Moderate" | "Elevated";
    planetarySignificators: string[];
    lifestyleRemedies: string;
  }>;
  vitalityIndexRating: number;
  dietaryRecommendations: string[];
}

export class MedicalAstroEngine {
  public static evaluateHealthConstitution(params: {
    ascendantLongitude: number;
    planets: Record<string, { longitude: number; name?: string }>;
    houseLords: Record<number, string>;
  }): MedicalAstroReport {
    const { ascendantLongitude, planets } = params;
    const ascSign = Math.floor(ascendantLongitude / 30) % 12;

    // Fire: Aries (0), Leo (4), Sag (8) -> Pitta
    // Earth: Taurus (1), Virgo (5), Cap (9) -> Kapha
    // Air: Gemini (2), Libra (6), Aqua (10) -> Vata
    // Water: Cancer (3), Scorpio (7), Pisces (11) -> Kapha-Pitta
    let vata = 35;
    let pitta = 35;
    let kapha = 30;

    if ([0, 4, 8].includes(ascSign)) {
      pitta += 15;
      vata -= 5;
      kapha -= 10;
    } else if ([1, 5, 9].includes(ascSign)) {
      kapha += 15;
      pitta -= 10;
      vata -= 5;
    } else if ([2, 6, 10].includes(ascSign)) {
      vata += 20;
      kapha -= 10;
      pitta -= 10;
    }

    const primaryDosha =
      pitta > vata && pitta > kapha ? "Pitta" :
      vata > pitta && vata > kapha ? "Vata" : "Kapha";

    return {
      doshaDominance: {
        vataPercentage: Math.max(10, Math.min(70, vata)),
        pittaPercentage: Math.max(10, Math.min(70, pitta)),
        kaphaPercentage: Math.max(10, Math.min(70, kapha)),
        primaryDosha
      },
      anatomicalSensitivities: [
        {
          organSystem: "Digestive Agni & Metabolic Processing",
          vulnerabilityLevel: "Moderate",
          planetarySignificators: ["Sun", "Mars"],
          lifestyleRemedies: "Favor warm, lightly spiced, cooked meals; avoid excessive cold stimulants."
        },
        {
          organSystem: "Nervous System & Mental Calm",
          vulnerabilityLevel: "Low",
          planetarySignificators: ["Moon", "Mercury"],
          lifestyleRemedies: "Consistent circadian sleep rhythm, daily pranayama, and Brahmi supplementation."
        },
        {
          organSystem: "Musculoskeletal & Joint Lubrication",
          vulnerabilityLevel: "Moderate",
          planetarySignificators: ["Saturn"],
          lifestyleRemedies: "Abhyanga warm sesame oil self-massage and moderate restorative yoga."
        }
      ],
      vitalityIndexRating: 84,
      dietaryRecommendations: [
        "Hydrate with warm herbal infusions throughout the daylight cycle.",
        "Emphasize seasonal grounding root vegetables and antioxidant-rich legumes.",
        "Maintain fasting spacing between dinner and sunrise to optimize biological repair."
      ]
    };
  }
}
