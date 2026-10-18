/**
 * Functional Nature Engine
 * Calculates functional benefic, functional malefic, neutral, Yogakaraka, and Maraka status
 * for all 9 Grahas based on Ascendant / Lagna Rashi ownership rules.
 * Reference: Brihat Parashara Hora Shastra, Chapter 34 (Karakas and Functional Lordship).
 */

export interface FunctionalPlanetEvaluation {
  planet: string;
  ownedHouses: number[];
  isTrikonaLord: boolean;       // 1, 5, 9
  isKendraLord: boolean;        // 1, 4, 7, 10
  isDusthanaLord: boolean;      // 6, 8, 12
  isTrishadayaLord: boolean;    // 3, 6, 11
  isMarakaLord: boolean;        // 2, 7
  classification: "Yogakaraka" | "Functional Benefic" | "Functional Malefic" | "Neutral / Mixed" | "Maraka";
  rationale: string;
  classicalRuleReference: string;
}

export interface FunctionalNatureReport {
  ascendantSign: string;
  ascendantIndex: number;
  evaluations: Record<string, FunctionalPlanetEvaluation>;
  yogakarakas: string[];
  benefics: string[];
  malefics: string[];
  neutrals: string[];
  marakas: string[];
}

export class FunctionalNatureEngine {
  private static readonly ZODIAC_LORDS = [
    "Mars",    // Aries (0)
    "Venus",   // Taurus (1)
    "Mercury", // Gemini (2)
    "Moon",    // Cancer (3)
    "Sun",     // Leo (4)
    "Mercury", // Virgo (5)
    "Venus",   // Libra (6)
    "Mars",    // Scorpio (7)
    "Jupiter", // Sagittarius (8)
    "Saturn",  // Capricorn (9)
    "Saturn",  // Aquarius (10)
    "Jupiter", // Pisces (11)
  ];

  private static readonly ZODIAC_SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

  /**
   * Evaluate functional nature of all planets for a given Lagna
   */
  public static evaluateForLagna(ascendantInput: string | number): FunctionalNatureReport {
    let ascIndex = 0;
    if (typeof ascendantInput === "number") {
      ascIndex = ((Math.floor(ascendantInput) % 12) + 12) % 12;
    } else {
      const idx = this.ZODIAC_SIGNS.indexOf(ascendantInput);
      ascIndex = idx >= 0 ? idx : 0;
    }

    const ascendantSign = this.ZODIAC_SIGNS[ascIndex];

    // Determine houses (1 to 12) owned by each planet
    const planetHouseMap: Record<string, number[]> = {
      Sun: [],
      Moon: [],
      Mars: [],
      Mercury: [],
      Jupiter: [],
      Venus: [],
      Saturn: [],
      Rahu: [],
      Ketu: []
    };

    for (let h = 1; h <= 12; h++) {
      const signIdxForHouse = (ascIndex + h - 1) % 12;
      const lord = this.ZODIAC_LORDS[signIdxForHouse];
      planetHouseMap[lord].push(h);
    }

    // Rahu and Ketu co-lord Aquarius and Scorpio traditionally or act as shadow nodes
    planetHouseMap.Rahu = [(ascIndex + 10) % 12 + 1]; // Aquarius house
    planetHouseMap.Ketu = [(ascIndex + 7) % 12 + 1];  // Scorpio house

    const evaluations: Record<string, FunctionalPlanetEvaluation> = {};
    const yogakarakas: string[] = [];
    const benefics: string[] = [];
    const malefics: string[] = [];
    const neutrals: string[] = [];
    const marakas: string[] = [];

    const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];

    for (const p of planets) {
      const houses = planetHouseMap[p] || [];
      const hasTrikona = houses.some(h => [1, 5, 9].includes(h));
      const hasKendra = houses.some(h => [1, 4, 7, 10].includes(h));
      const hasDusthana = houses.some(h => [6, 8, 12].includes(h));
      const hasTrishadaya = houses.some(h => [3, 6, 11].includes(h));
      const hasMaraka = houses.some(h => [2, 7].includes(h));

      let classification: FunctionalPlanetEvaluation["classification"] = "Neutral / Mixed";
      let rationale = "";
      let classicalRule = "BPHS Ch. 34";

      // 1. Yogakaraka check: Owns simultaneously a Kendra AND a Trikona (excluding Lagna lord dual ownership like 1 & 8)
      const ownsKendraAndTrikona = houses.some(h => [4, 7, 10].includes(h)) && houses.some(h => [5, 9].includes(h));
      if (ownsKendraAndTrikona) {
        classification = "Yogakaraka";
        rationale = `Simultaneously owns auspicious Kendra (${houses.filter(h => [4, 7, 10].includes(h)).join(", ")}) and Trikona (${houses.filter(h => [5, 9].includes(h)).join(", ")}) houses. Highest auspicious potential.`;
        classicalRule = "BPHS Ch. 34, Shlokas 30–33 (Rajayoga Karakas)";
        yogakarakas.push(p);
      } 
      // 2. Pure Trikona Lord or Lagna Lord
      else if (houses.includes(1) || (hasTrikona && !hasDusthana)) {
        classification = "Functional Benefic";
        rationale = `Rules auspicious Dharma/Trikona house(s) [${houses.join(", ")}]. Bestows protective growth and virtue.`;
        classicalRule = "BPHS Ch. 34, Shlokas 3–6 (Trikona Auspiciousness)";
        benefics.push(p);
      }
      // 3. Pure Dusthana / Trishadaya Lord
      else if (hasTrishadaya && !hasTrikona) {
        classification = "Functional Malefic";
        rationale = `Rules Trishadaya / Dusthana house(s) [${houses.join(", ")}]. Induces striving, obstacles, or karmic lessons.`;
        classicalRule = "BPHS Ch. 34, Shlokas 7–10 (Dusthana Lordship)";
        malefics.push(p);
      }
      // 4. Primary Maraka
      else if (hasMaraka && !hasTrikona && !houses.includes(1)) {
        classification = "Maraka";
        rationale = `Primary ruler of Maraka sthana(s) [${houses.join(", ")}]. Governs termination cycles and expenditures.`;
        classicalRule = "BPHS Ch. 44 (Maraka Characteristics)";
        marakas.push(p);
      }
      // 5. Mixed / Neutral
      else {
        classification = "Neutral / Mixed";
        rationale = `Rules balanced house combinations [${houses.join(", ")}], delivering mixed structural results.`;
        classicalRule = "BPHS Ch. 34, Shloka 15";
        neutrals.push(p);
      }

      evaluations[p] = {
        planet: p,
        ownedHouses: houses,
        isTrikonaLord: hasTrikona,
        isKendraLord: hasKendra,
        isDusthanaLord: hasDusthana,
        isTrishadayaLord: hasTrishadaya,
        isMarakaLord: hasMaraka,
        classification,
        rationale,
        classicalRuleReference: classicalRule
      };
    }

    return {
      ascendantSign,
      ascendantIndex: ascIndex,
      evaluations,
      yogakarakas,
      benefics,
      malefics,
      neutrals,
      marakas
    };
  }
}
