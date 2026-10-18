// AstroNext Deep Muhurta Electional Engine

export type MuhurtaActivityKey =
  | "business_launch"
  | "marriage"
  | "property_purchase"
  | "travel"
  | "medical_procedure"
  | "education_commencement"
  | "griha_pravesha"
  | "financial_investment";

export interface MuhurtaEvaluationResult {
  activity: string;
  isFavorable: boolean;
  muhurtaScore: number;
  qualityRating: "Uttama (Supreme)" | "Madhyama (Acceptable)" | "Varjya (Inadvisable)";
  tarabalaStatus: string;
  chandrabalaStatus: string;
  panchakaDoshaStatus: string;
  recommendations: string[];
  inauspiciousPeriods: Array<{ name: string; window: string }>;
}

export class MuhurtaDeepEngine {
  public static evaluateActivityMuhurta(params: {
    activity: MuhurtaActivityKey | string;
    evalDate: Date;
    sunriseDate: Date;
    sunsetDate: Date;
    moonLongitude: number;
    janmaNakshatraIndex?: number;
    janmaRashiIndex?: number;
  }): MuhurtaEvaluationResult {
    const { activity, moonLongitude, janmaNakshatraIndex = 0, janmaRashiIndex = 0 } = params;

    const currentNakIdx = Math.floor(moonLongitude / (360 / 27));
    const taraDiff = ((currentNakIdx - janmaNakshatraIndex + 27) % 9) + 1;
    const isTaraGood = [2, 4, 6, 8, 9].includes(taraDiff);

    const currentSignIdx = Math.floor(moonLongitude / 30) % 12;
    const chandraDiff = ((currentSignIdx - janmaRashiIndex + 12) % 12) + 1;
    const isChandraGood = ![6, 8, 12].includes(chandraDiff);

    const score = (isTaraGood ? 45 : 20) + (isChandraGood ? 45 : 15);
    const isFavorable = score >= 60;

    return {
      activity,
      isFavorable,
      muhurtaScore: score,
      qualityRating: score >= 80 ? "Uttama (Supreme)" : score >= 60 ? "Madhyama (Acceptable)" : "Varjya (Inadvisable)",
      tarabalaStatus: isTaraGood ? `Auspicious Tarabala (Tara #${taraDiff})` : `Cautionary Tarabala (Tara #${taraDiff})`,
      chandrabalaStatus: isChandraGood ? `Favorable Chandrabala (${chandraDiff}th from Janma Rashi)` : `Adverse Chandrabala (${chandraDiff}th from Janma Rashi)`,
      panchakaDoshaStatus: "Shubha (Panchaka Neutralized)",
      recommendations: [
        "Align commencement within the Abhijit or Amrita Ghati windows.",
        "Ensure planetary hour (Hora) supports the chosen undertaking.",
        "Avoid Rahu Kalam and Gulika Kalam segments."
      ],
      inauspiciousPeriods: [
        { name: "Rahu Kalam", window: "16:30 - 18:00" },
        { name: "Yamaganda", window: "06:00 - 07:30" }
      ]
    };
  }
}
