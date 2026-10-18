/**
 * Dasha Confluence Engine
 * Evaluates whether multiple timing tiers (Mahadasha + Antardasha + Pratyantardasha) converge
 * on identical houses, Karakas, or yogic formations.
 * Reference: Saravali Ch. 41 (Maha & Antardasha Phala Synthesis), Jataka Parijata Ch. 18.
 */

export interface DashaConfluenceResult {
  commonActivatedHouses: number[];
  commonThemes: string[];
  confluenceLevel: "VERY HIGH CONFLUENCE" | "MODERATE CONFLUENCE" | "DIVERGENT TIMING";
  synthesizedRating: "STRONG SUPPORT" | "MODERATE SUPPORT" | "MIXED" | "CHALLENGED";
  positiveFactors: string[];
  challengingFactors: string[];
  confluenceSummary: string;
}

export class DashaConfluenceEngine {
  /**
   * Evaluate confluence between active MD, AD, and PD lords
   */
  public static evaluateConfluence(params: {
    mdLord: string;
    adLord: string;
    pdLord?: string;
    mdHouses: number[];
    adHouses: number[];
    pdHouses?: number[];
    mdDignity?: string;
    adDignity?: string;
  }): DashaConfluenceResult {
    const { mdLord, adLord, pdLord = "", mdHouses, adHouses, pdHouses = [], mdDignity = "Neutral", adDignity = "Neutral" } = params;

    // 1. Common activated houses
    const commonHouses = mdHouses.filter(h => adHouses.includes(h));
    const allHouses = Array.from(new Set([...mdHouses, ...adHouses, ...pdHouses]));

    // 2. Identify common themes
    const commonThemes: string[] = [];
    if (allHouses.some(h => [10, 6, 2].includes(h))) commonThemes.push("Career & Professional Eminence");
    if (allHouses.some(h => [2, 11].includes(h))) commonThemes.push("Wealth & Liquid Accumulation");
    if (allHouses.some(h => [7, 5].includes(h))) commonThemes.push("Relationship, Spousal Synergy & Partnerships");
    if (allHouses.some(h => [4, 9].includes(h))) commonThemes.push("Property, Vehicles & Scholastic Wisdom");
    if (allHouses.some(h => [9, 12].includes(h))) commonThemes.push("Dharma, Pilgrimage & Spiritual Awakening");
    if (allHouses.some(h => [6, 8, 12].includes(h))) commonThemes.push("Resilience, Debt Clearing & Transformation");

    const positiveFactors: string[] = [];
    const challengingFactors: string[] = [];

    // Dignity evaluation
    const mdDigLow = mdDignity.toLowerCase();
    const adDigLow = adDignity.toLowerCase();

    if (mdDigLow.includes("exalt") || mdDigLow.includes("own") || mdDigLow.includes("moola")) {
      positiveFactors.push(`Mahadasha lord ${mdLord} enjoys strong dignity (${mdDignity}), providing a robust foundational platform.`);
    } else if (mdDigLow.includes("debilitat")) {
      challengingFactors.push(`Mahadasha lord ${mdLord} is in debilitated dignity, requiring mindful energy management.`);
    }

    if (adDigLow.includes("exalt") || adDigLow.includes("own") || adDigLow.includes("moola")) {
      positiveFactors.push(`Antardasha lord ${adLord} enjoys auspicious dignity (${adDignity}), facilitating tangible event execution.`);
    } else if (adDigLow.includes("debilitat")) {
      challengingFactors.push(`Antardasha lord ${adLord} experiences debilitation, demanding disciplined perseverance.`);
    }

    // Confluence classification
    let confluenceLevel: DashaConfluenceResult["confluenceLevel"] = "DIVERGENT TIMING";
    let synthesizedRating: DashaConfluenceResult["synthesizedRating"] = "MIXED";

    if (commonHouses.length >= 2 || (commonHouses.length >= 1 && mdLord === adLord)) {
      confluenceLevel = "VERY HIGH CONFLUENCE";
      synthesizedRating = positiveFactors.length >= challengingFactors.length ? "STRONG SUPPORT" : "MODERATE SUPPORT";
    } else if (commonHouses.length === 1) {
      confluenceLevel = "MODERATE CONFLUENCE";
      synthesizedRating = positiveFactors.length >= challengingFactors.length ? "MODERATE SUPPORT" : "MIXED";
    } else {
      confluenceLevel = "DIVERGENT TIMING";
      synthesizedRating = "MIXED";
    }

    const summary = `${mdLord} (MD) and ${adLord} (AD) unite to activate houses [${allHouses.join(", ")}]. ${confluenceLevel === "VERY HIGH CONFLUENCE" ? "Shared house lordship amplifies thematic focus." : "Complementary energies unfold across diverse life domains."}`;

    return {
      commonActivatedHouses: commonHouses,
      commonThemes,
      confluenceLevel,
      synthesizedRating,
      positiveFactors,
      challengingFactors,
      confluenceSummary: summary
    };
  }
}
