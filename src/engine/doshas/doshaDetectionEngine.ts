// src/engine/doshas/doshaDetectionEngine.ts

import { ChartEvaluationContext } from "../yogas/yogaConditionEngine";
import { 
  DetectedDoshaRecord, 
  DoshaDetectionOutput 
} from "./types";

export class DoshaDetectionMasterEngine {
  public static evaluateAllDoshas(context: ChartEvaluationContext): DoshaDetectionOutput {
    const planets = context?.planets || {};

    const getHouse = (name: string): number => {
      const p = Object.values(planets).find((x) => x.name?.toLowerCase() === name.toLowerCase());
      return p ? p.house : 0;
    };

    const marsHouse = getHouse("Mars");
    const moonHouse = getHouse("Moon");
    const jupHouse = getHouse("Jupiter");
    const rahuHouse = getHouse("Rahu");
    const ketuHouse = getHouse("Ketu");
    const sunHouse = getHouse("Sun");
    const satHouse = getHouse("Saturn");

    const detected: DetectedDoshaRecord[] = [];

    // 1. Manglik / Kuja Dosha
    const manglikHouses = [1, 2, 4, 7, 8, 12];
    const isLagnaManglik = manglikHouses.includes(marsHouse);
    const marsFromMoon = moonHouse > 0 ? (marsHouse - moonHouse + 12) % 12 + 1 : 0;
    const isMoonManglik = manglikHouses.includes(marsFromMoon);
    const isManglik = isLagnaManglik || isMoonManglik;

    const marsSign = Object.values(planets).find((x) => x.name?.toLowerCase() === "mars")?.sign || "";
    const isMarsInAriesIn1st = marsHouse === 1 && (marsSign.toLowerCase().includes("aries") || marsSign.toLowerCase().includes("mesha"));
    const cancellations = [];
    if (isMarsInAriesIn1st) {
      cancellations.push({
        ruleTitle: "Mesha Lagna Kuja Nivarana (Mars in Aries in 1st House)",
        reductionPercentage: 75,
        evidenceText: "Mars occupies own sign Aries in the 1st house (Ruchaka), cancelling destructive Manglik affliction."
      });
    }
    const jupAspectsMars = jupHouse > 0 && marsHouse > 0 && [0, 4, 6, 8].includes((marsHouse - jupHouse + 12) % 12);
    if (jupAspectsMars) {
      cancellations.push({
        ruleTitle: "Brihaspati Drishti Nivarana (Jupiter Aspect)",
        reductionPercentage: 60,
        evidenceText: "Benefic Jupiter aspects Kuja, neutralizing aggressive marital friction."
      });
    }

    detected.push({
      ruleId: "DOSHA-MANGLIK-01",
      name: "Manglik / Kuja Dosha",
      sanskritName: "भौम / कुज दोष",
      category: "Manglik / Kuja Dosha",
      tradition: "Parashari & Muhurtha Chintamani",
      sourceReference: "BPHS, Stri Jataka Adhyaya, Shloka 47",
      afflictedPlanets: isManglik ? ["Mars"] : [],
      severityScore: isManglik ? (cancellations.length > 0 ? 35 : 75) : 0,
      status: isManglik 
        ? (cancellations.length > 0 ? "PARTIALLY_CANCELLED" : "ACTIVE")
        : "NOT_PRESENT",
      isPresent: isManglik,
      isCancelledOrMitigated: cancellations.length > 0,
      whyEvidenceTree: {
        classicalSynthesis: isManglik
          ? "Mars occupies a sensitive marital bhava (1, 2, 4, 7, 8, 12), creating strong temperamental drive and marital dynamics."
          : "Mars is positioned outside sensitive marital houses. No Kuja Dosha present."
      },
      conditionsEvaluated: [
        {
          description: "Mars in 1st, 2nd, 4th, 7th, 8th, or 12th from Ascendant or Moon",
          evidence: `Mars in House ${marsHouse}, Moon in House ${moonHouse}`
        }
      ],
      cancellationsFound: cancellations,
      remedialSuggestions: isManglik ? [
        "Chant Hanuman Chalisa or Mangal Beej Mantra on Tuesdays.",
        "Practice conscious communication before emotional reactivity in domestic matters.",
        "Offer red lentils (masoor dal) or water to a peepal tree."
      ] : []
    });

    // 2. Kemadruma Dosha
    let kemadrumaPresent = false;
    if (moonHouse > 0) {
      const secondFromMoon = (moonHouse % 12) + 1;
      const twelfthFromMoon = moonHouse === 1 ? 12 : moonHouse - 1;
      const planetsIn2nd = Object.values(planets).filter(
        (p) => p.house === secondFromMoon && !["Sun", "Rahu", "Ketu", "Moon"].includes(p.name)
      );
      const planetsIn12th = Object.values(planets).filter(
        (p) => p.house === twelfthFromMoon && !["Sun", "Rahu", "Ketu", "Moon"].includes(p.name)
      );
      kemadrumaPresent = planetsIn2nd.length === 0 && planetsIn12th.length === 0;
    }

    const kemadrumaCancelled = [1, 4, 7, 10].includes(moonHouse) || [1, 4, 7, 10].includes(jupHouse);
    const kemCancellations = [];
    if (kemadrumaCancelled) {
      kemCancellations.push({
        ruleTitle: "Kendra Bhanga Exception (BPHS Shloka 15)",
        reductionPercentage: 80,
        evidenceText: "Moon or Jupiter occupies an angular Kendra, mitigating emotional isolation."
      });
    }

    detected.push({
      ruleId: "DOSHA-KEMADRUMA-01",
      name: "Kemadruma Dosha (Lunar Solitude)",
      sanskritName: "केमद्रुम दोष",
      category: "Kemadruma Dosha",
      tradition: "Parashari Classical",
      sourceReference: "BPHS, Ashubha Yoga Adhyaya, Shloka 12-14",
      afflictedPlanets: kemadrumaPresent ? ["Moon"] : [],
      severityScore: kemadrumaPresent ? (kemCancellations.length > 0 ? 25 : 70) : 0,
      status: kemadrumaPresent
        ? (kemCancellations.length > 0 ? "CANCELLED" : "ACTIVE")
        : "NOT_PRESENT",
      isPresent: kemadrumaPresent,
      isCancelledOrMitigated: kemCancellations.length > 0,
      whyEvidenceTree: {
        classicalSynthesis: kemadrumaPresent
          ? "No planets flanking the Moon in 2nd or 12th houses from Janma Rashi, indicating fluctuating emotional stability."
          : "Planets flank the Moon or occupy adjacent signs, granting stable emotional nourishment."
      },
      conditionsEvaluated: [
        {
          description: "Absence of planets in 2nd and 12th from Janma Moon",
          evidence: `Moon in House ${moonHouse}`
        }
      ],
      cancellationsFound: kemCancellations,
      remedialSuggestions: kemadrumaPresent ? [
        "Perform Shiva Abhishekam with raw milk on Mondays.",
        "Wear pure silver or keep a silver square item with you.",
        "Cultivate steady grounding friendships and contemplative journaling."
      ] : []
    });

    // 3. Guru Chandal Dosha
    const isGuruChandal = jupHouse > 0 && (jupHouse === rahuHouse || jupHouse === ketuHouse);
    detected.push({
      ruleId: "DOSHA-GURU-CHANDAL-01",
      name: "Guru Chandal Dosha",
      sanskritName: "गुरु चाण्डाल दोष",
      category: "Guru Chandal Dosha",
      tradition: "Phaladeepika & Saravali",
      sourceReference: "Phaladeepika, Ch. 14, Shloka 22",
      afflictedPlanets: isGuruChandal ? ["Jupiter", "Rahu"] : [],
      severityScore: isGuruChandal ? 65 : 0,
      status: isGuruChandal ? "ACTIVE" : "NOT_PRESENT",
      isPresent: isGuruChandal,
      isCancelledOrMitigated: false,
      whyEvidenceTree: {
        classicalSynthesis: isGuruChandal
          ? "Conjunction of Jupiter with shadow node Rahu/Ketu, creating friction between orthodox tradition and unconventional beliefs."
          : "Jupiter and nodal axis are in separate houses, preserving untainted higher philosophical guidance."
      },
      conditionsEvaluated: [
        {
          description: "Jupiter co-occupies same house with Rahu or Ketu",
          evidence: `Jupiter House ${jupHouse}, Rahu House ${rahuHouse}, Ketu House ${ketuHouse}`
        }
      ],
      cancellationsFound: [],
      remedialSuggestions: isGuruChandal ? [
        "Honor spiritual preceptors and teachers (Gurus) with humility.",
        "Chant Brihaspati Beej Mantra: 'Om Gram Greem Graum Sah Gurave Namah'.",
        "Donate yellow cloth or chana dal on Thursdays."
      ] : []
    });

    const presentCount = detected.filter((d) => d.isPresent && !d.isCancelledOrMitigated).length;

    return {
      detectedDoshas: detected,
      presentCount
    };
  }
}
