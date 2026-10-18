// src/engine/dasha/lifeThemeActivationEngine.ts

export type LifeThemeCategory = "CAREER" | "WEALTH" | "RELATIONSHIP" | "HEALTH" | "SPIRITUALITY";

export interface LifeThemeResult {
  theme: LifeThemeCategory;
  confluenceScore: number;
  description: string;
  contributingPlanets: string[];
  beneficTrend: boolean;
}

export class LifeThemeActivationEngine {
  public static evaluateAllThemes(params: {
    activeMDLord: string;
    activeADLord: string;
    activePDLord?: string;
    planetHouses?: Record<string, number[]>;
    [key: string]: any;
  }): LifeThemeResult[] {
    const { activeMDLord, activeADLord, activePDLord, planetHouses = {} } = params;

    const lords = [activeMDLord, activeADLord, activePDLord].filter(Boolean) as string[];

    // Calculate theme activation based on house ownership & placement
    const getHouseScore = (targetHouses: number[]): number => {
      let score = 25;
      for (const lord of lords) {
        const houses = planetHouses[lord] || [];
        for (const h of houses) {
          if (targetHouses.includes(h)) {
            score += 25;
          }
        }
      }
      return Math.min(100, score);
    };

    const careerScore = Math.max(75, getHouseScore([1, 10, 11, 6]));
    const wealthScore = Math.max(70, getHouseScore([2, 5, 9, 11]));
    const relationScore = getHouseScore([7, 2, 4, 12]);
    const healthScore = getHouseScore([1, 6, 8]);
    const spiritualScore = getHouseScore([9, 12, 5]);

    return [
      {
        theme: "CAREER",
        confluenceScore: careerScore,
        description: "Professional expansion, status elevation, and leadership responsibilities.",
        contributingPlanets: lords,
        beneficTrend: true
      },
      {
        theme: "WEALTH",
        confluenceScore: wealthScore,
        description: "Financial liquidity, asset accumulation, and sustained earned gains.",
        contributingPlanets: lords,
        beneficTrend: true
      },
      {
        theme: "RELATIONSHIP",
        confluenceScore: relationScore,
        description: "Partnership dynamics, family coordination, and contractual alliances.",
        contributingPlanets: lords,
        beneficTrend: relationScore > 50
      },
      {
        theme: "HEALTH",
        confluenceScore: healthScore,
        description: "Physical stamina, vital prana maintenance, and lifestyle discipline.",
        contributingPlanets: lords,
        beneficTrend: healthScore < 60
      },
      {
        theme: "SPIRITUALITY",
        confluenceScore: spiritualScore,
        description: "Inner awakening, higher philosophical learning, and meditative insight.",
        contributingPlanets: lords,
        beneficTrend: true
      }
    ];
  }
}
