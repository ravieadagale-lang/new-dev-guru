import { ClassicalDoshaRule } from "./types";

export class DoshaRulesRegistry {
  private static readonly RULES: ClassicalDoshaRule[] = [
    {
      id: "DOSHA-MANGLIK-PARASHARI-01",
      name: "Manglik / Kuja Dosha (Parashari Classical)",
      sanskritName: "भौम दोष (पराशरी)",
      category: "MANGLIK",
      tradition: "PARASHARI",
      ruleVariant: "MANGLIK_LAGNA_MOON_VENUS",
      source: "Brihat Parashara Hora Shastra",
      sourceReference: "BPHS, Stri Jataka Adhyaya, Shloka 47",
      definition: "Mars in 1st, 2nd, 4th, 7th, 8th, or 12th house from Lagna, Moon, or Venus.",
      description: "Classical marital friction and temperament disharmony caused by fiery Mars aspecting or occupying sensitive marital houses.",
      afflictedPlanets: ["Mars"],
      afflictedHouses: [1, 2, 4, 7, 8, 12],
      severityMethod: "WEIGHTED_FACTOR_ANALYSIS",
      ruleVersion: "3.0.0"
    },
    {
      id: "DOSHA-MANGLIK-SOUTH-02",
      name: "Manglik Dosha (South Indian / Muhurtha Variant)",
      sanskritName: "कुज दोष (दक्षिण पद्धति)",
      category: "MANGLIK",
      tradition: "SOUTH_INDIAN",
      ruleVariant: "MANGLIK_SOUTH_HOUSE_2",
      source: "Muhurtha Chintamani & Phaladeepika",
      sourceReference: "Phaladeepika, Ch. 12, Shloka 24",
      definition: "Emphasizes Mars in the 2nd house of family speech (Kutumbasthana) in addition to 1, 4, 7, 8, 12.",
      description: "Severe speech harshness or domestic friction caused by Kuja occupying the 2nd house.",
      afflictedPlanets: ["Mars"],
      afflictedHouses: [2, 1, 4, 7, 8, 12],
      severityMethod: "WEIGHTED_FACTOR_ANALYSIS",
      ruleVersion: "3.0.0"
    },
    {
      id: "DOSHA-KEMADRUMA-01",
      name: "Kemadruma Dosha",
      sanskritName: "केमद्रुम दोष",
      category: "KEMADRUMA",
      tradition: "PARASHARI",
      ruleVariant: "KEMADRUMA_SOLITARY_MOON",
      source: "Brihat Parashara Hora Shastra",
      sourceReference: "BPHS, Ashubha Yoga Adhyaya, Shloka 12-14",
      definition: "Moon with no planets (excluding Sun, Rahu, Ketu) in 2nd and 12th houses from it.",
      description: "Lunar isolation leading to psychological anxiety, financial instability, and emotional isolation unless cancelled by Kendra planets.",
      afflictedPlanets: ["Moon"],
      afflictedHouses: [2, 12],
      severityMethod: "DISCRETE_RULE_MATCH",
      ruleVersion: "3.0.0"
    },
    {
      id: "DOSHA-GURU-CHANDAL-01",
      name: "Guru Chandal Dosha",
      sanskritName: "गुरु चाण्डाल दोष",
      category: "GURU_CHANDAL",
      tradition: "PARASHARI",
      ruleVariant: "GURU_RAHU_CONJUNCTION",
      source: "Phaladeepika & Saravali",
      sourceReference: "Saravali, Ch. 31, Shloka 40",
      definition: "Jupiter conjoined with Rahu or Ketu in the same sign.",
      description: "Corruption of moral counsel, skepticism towards traditional dharma, or unconventional spiritual outlook.",
      afflictedPlanets: ["Jupiter", "Rahu"],
      afflictedHouses: [1, 5, 9],
      severityMethod: "WEIGHTED_FACTOR_ANALYSIS",
      ruleVersion: "3.0.0"
    },
    {
      id: "DOSHA-SHRAPIT-01",
      name: "Shrapit Yoga / Dosha",
      sanskritName: "श्रापित दोष",
      category: "SHRAPIT",
      tradition: "PARASHARI",
      ruleVariant: "SATURN_RAHU_CONJUNCTION",
      source: "Jataka Parijata",
      sourceReference: "Jataka Parijata, Adhyaya 8, Shloka 55",
      definition: "Saturn and Rahu conjoined in the same sign or mutual aspect.",
      description: "Karmic debt from past lifespans producing persistent unexplainable delays, chronic frustration, and obstacles.",
      afflictedPlanets: ["Saturn", "Rahu"],
      afflictedHouses: [1, 6, 8, 12],
      severityMethod: "WEIGHTED_FACTOR_ANALYSIS",
      ruleVersion: "3.0.0"
    },
    {
      id: "DOSHA-KALA-SARPA-01",
      name: "Kala Sarpa Dosha / Yoga",
      sanskritName: "काल सर्प दोष",
      category: "KALA_SARPA",
      tradition: "PARASHARI",
      ruleVariant: "KALA_SARPA_CLASSICAL",
      source: "Agni Purana & Mantreshwara tradition",
      sourceReference: "Phaladeepika & Prashna Marga",
      definition: "All seven primary planets hemmed between Rahu and Ketu axis without any outside planet.",
      description: "Intense karmic compression causing rollercoaster swings of sudden fortune and sudden hurdles before age 33-36.",
      afflictedPlanets: ["Rahu", "Ketu"],
      afflictedHouses: [1, 7],
      severityMethod: "WEIGHTED_FACTOR_ANALYSIS",
      ruleVersion: "3.0.0"
    },
    {
      id: "DOSHA-GRAHANA-01",
      name: "Grahana (Eclipse) Dosha",
      sanskritName: "ग्रहण दोष",
      category: "GRAHANA",
      tradition: "PARASHARI",
      ruleVariant: "LUMINARY_NODE_ECLIPSE",
      source: "Brihat Samhita & BPHS",
      sourceReference: "Brihat Samhita, Rahu Chara, Shloka 15",
      definition: "Sun or Moon conjoined with Rahu or Ketu within close orb (< 10 degrees).",
      description: "Eclipse of vitality, confidence (Sun) or emotional stability, mother's health (Moon).",
      afflictedPlanets: ["Sun", "Moon", "Rahu", "Ketu"],
      afflictedHouses: [1, 4, 9, 10],
      severityMethod: "WEIGHTED_FACTOR_ANALYSIS",
      ruleVersion: "3.0.0"
    },
    {
      id: "DOSHA-PITRI-01",
      name: "Pitri Dosha",
      sanskritName: "पितृ दोष",
      category: "PITRI",
      tradition: "PARASHARI",
      ruleVariant: "NINTH_HOUSE_SUN_AFFLICTION",
      source: "BPHS & Garuda Purana",
      sourceReference: "BPHS, Pitri Shapa Adhyaya, Shloka 2-8",
      definition: "Affliction of the 9th house, 9th lord, or Sun by malefic Saturn, Rahu, or Mars.",
      description: "Ancestral karmic unresolved obligations manifesting as obstacles in lineage continuity or father's fortune.",
      afflictedPlanets: ["Sun", "Saturn", "Rahu"],
      afflictedHouses: [9],
      severityMethod: "WEIGHTED_FACTOR_ANALYSIS",
      ruleVersion: "3.0.0"
    }
  ];

  public static getAllDoshaRules(): ClassicalDoshaRule[] {
    return this.RULES;
  }

  public static getRuleById(id: string): ClassicalDoshaRule | undefined {
    return this.RULES.find((r) => r.id === id);
  }
}
