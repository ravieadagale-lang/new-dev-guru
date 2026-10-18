// src/engine/yogas/index.ts

import { ChartEvaluationContext } from "./yogaConditionEngine";
import { 
  YogaStatusCode, 
  DetectedClassicalYoga, 
  YogaDetectionOutput,
  EvaluatedCondition
} from "./types";
import { ALL_CLASSICAL_YOGAS_1001 } from "../../data/classicalYogas/yogas1001Directory";

export * from "./types";
export * from "./yogaConditionEngine";

export class YogaDetectionMasterEngine {
  public static evaluateAllYogas(context: ChartEvaluationContext): YogaDetectionOutput {
    const planets = context?.planets || {};
    const houseLords = context?.houseLords || {};
    const dasha = context?.currentDasha || context?.dashaActiveLords || { mahadasha: "Jupiter", antardasha: "Moon" };
    const currentMaha = (dasha.mahadasha || "").toLowerCase();
    const currentAntar = (dasha.antardasha || "").toLowerCase();

    // Helper: Find planet
    const getPlanet = (name: string) => {
      return Object.values(planets).find((x) => x.name?.toLowerCase() === name.toLowerCase());
    };

    const getHouse = (name: string): number => {
      const p = getPlanet(name);
      return p ? p.house : 0;
    };

    const getSign = (name: string): string => {
      const p = getPlanet(name);
      return p ? p.sign : "";
    };

    const getDignity = (name: string): string => {
      const p = getPlanet(name);
      return p ? (p.dignity || "") : "";
    };

    const hasPlanetInHouse = (targetHouse: number, excludedNames: string[] = []): boolean => {
      const excludedLower = excludedNames.map((n) => n.toLowerCase());
      return Object.values(planets).some((p) => {
        if (!p || p.house !== targetHouse) return false;
        const pName = (p.name || "").toLowerCase();
        return !excludedLower.includes(pName);
      });
    };

    const jupHouse = getHouse("Jupiter");
    const moonHouse = getHouse("Moon");
    const sunHouse = getHouse("Sun");
    const mercHouse = getHouse("Mercury");
    const marsHouse = getHouse("Mars");
    const venHouse = getHouse("Venus");
    const satHouse = getHouse("Saturn");

    const results: DetectedClassicalYoga[] = [];

    // Evaluate all 1,001 classical yogas from ALL_CLASSICAL_YOGAS_1001
    for (const yoga of ALL_CLASSICAL_YOGAS_1001) {
      const id = yoga.id;
      let isFormed = false;
      let ruleId = `YOGA-${yoga.id.toUpperCase()}`;
      let conditionDesc = yoga.formula;
      let conditionEvidence = "";
      let supportingFactors: string[] = [];
      let weakeningFactors: string[] = [];
      let strengthScore = 50;

      // 1. Pancha Mahapurusha Yogas (1 - 5)
      if (id === "ruchaka_yoga") {
        ruleId = "YOGA-RUCHAKA";
        const isKendra = [1, 4, 7, 10].includes(marsHouse);
        const sign = getSign("Mars");
        const dignity = getDignity("Mars");
        const isDignified = ["Aries", "Scorpio", "Capricorn"].includes(sign) || dignity.includes("Own") || dignity.includes("Exalted");
        isFormed = marsHouse > 0 && isKendra && isDignified;
        conditionEvidence = `Mars in House ${marsHouse} (${sign}, ${dignity || "Standard"})`;
        if (isFormed) {
          strengthScore = 94;
          supportingFactors = ["Mars occupies Kendra in own sign / exaltation", "Commanding vitality and leadership potential"];
        } else {
          strengthScore = 30;
          weakeningFactors = ["Mars is not in Kendra in own sign or exaltation"];
        }
      } else if (id === "bhadra_yoga") {
        ruleId = "YOGA-BHADRA";
        const isKendra = [1, 4, 7, 10].includes(mercHouse);
        const sign = getSign("Mercury");
        const dignity = getDignity("Mercury");
        const isDignified = ["Gemini", "Virgo"].includes(sign) || dignity.includes("Own") || dignity.includes("Exalted");
        isFormed = mercHouse > 0 && isKendra && isDignified;
        conditionEvidence = `Mercury in House ${mercHouse} (${sign}, ${dignity || "Standard"})`;
        if (isFormed) {
          strengthScore = 93;
          supportingFactors = ["Mercury in Kendra in domicile / exaltation", "Supreme intellectual and commercial acumen"];
        } else {
          strengthScore = 30;
          weakeningFactors = ["Mercury is not in Kendra in own sign or exaltation"];
        }
      } else if (id === "hamsa_yoga") {
        ruleId = "YOGA-HAMSA";
        const isKendra = [1, 4, 7, 10].includes(jupHouse);
        const sign = getSign("Jupiter");
        const dignity = getDignity("Jupiter");
        const isDignified = ["Sagittarius", "Pisces", "Cancer"].includes(sign) || dignity.includes("Own") || dignity.includes("Exalted");
        isFormed = jupHouse > 0 && isKendra && isDignified;
        conditionEvidence = `Jupiter in House ${jupHouse} (${sign}, ${dignity || "Standard"})`;
        if (isFormed) {
          strengthScore = 95;
          supportingFactors = ["Jupiter occupies Kendra in own sign / exaltation", "Spiritual wisdom and venerable reputation"];
        } else {
          strengthScore = 35;
          weakeningFactors = ["Jupiter is not in Kendra in own sign or exaltation"];
        }
      } else if (id === "malavya_yoga") {
        ruleId = "YOGA-MALAVYA";
        const isKendra = [1, 4, 7, 10].includes(venHouse);
        const sign = getSign("Venus");
        const dignity = getDignity("Venus");
        const isDignified = ["Taurus", "Libra", "Pisces"].includes(sign) || dignity.includes("Own") || dignity.includes("Exalted");
        isFormed = venHouse > 0 && isKendra && isDignified;
        conditionEvidence = `Venus in House ${venHouse} (${sign}, ${dignity || "Standard"})`;
        if (isFormed) {
          strengthScore = 92;
          supportingFactors = ["Venus occupies Kendra in own sign / exaltation", "Aesthetic brilliance, artistic harmony, and refined luxury"];
        } else {
          strengthScore = 30;
          weakeningFactors = ["Venus is not in Kendra in own sign or exaltation"];
        }
      } else if (id === "sasa_yoga") {
        ruleId = "YOGA-SASA";
        const isKendra = [1, 4, 7, 10].includes(satHouse);
        const sign = getSign("Saturn");
        const dignity = getDignity("Saturn");
        const isDignified = ["Capricorn", "Aquarius", "Libra"].includes(sign) || dignity.includes("Own") || dignity.includes("Exalted");
        isFormed = satHouse > 0 && isKendra && isDignified;
        conditionEvidence = `Saturn in House ${satHouse} (${sign}, ${dignity || "Standard"})`;
        if (isFormed) {
          strengthScore = 91;
          supportingFactors = ["Saturn occupies Kendra in own sign / exaltation", "Enduring authority, mass leadership, and organizational discipline"];
        } else {
          strengthScore = 30;
          weakeningFactors = ["Saturn is not in Kendra in own sign or exaltation"];
        }
      } 
      // 2. Raja & Cardinal Yogas (6, 15 - 20)
      else if (id === "gaja_kesari_yoga") {
        ruleId = "YOGA-GAJA-KESARI-01";
        const isMoonKendra = jupHouse > 0 && moonHouse > 0 && [0, 3, 6, 9].includes((jupHouse - moonHouse + 12) % 12);
        isFormed = isMoonKendra;
        conditionEvidence = `Jupiter in House ${jupHouse}, Moon in House ${moonHouse}`;
        if (isFormed) {
          strengthScore = 92;
          supportingFactors = ["Jupiter in Kendra to Janma Moon", "Natural benefics unblemished"];
        } else {
          strengthScore = 35;
          weakeningFactors = ["Jupiter not in Kendra from Moon"];
        }
      } else if (id === "adhi_yoga") {
        ruleId = "YOGA-ADHI";
        const beneficsIn678 = [mercHouse, jupHouse, venHouse].some((h) => {
          if (moonHouse <= 0 || h <= 0) return false;
          const dist = ((h - moonHouse + 12) % 12) + 1;
          return [6, 7, 8].includes(dist);
        });
        isFormed = beneficsIn678;
        conditionEvidence = `Benefics (Merc:${mercHouse}, Jup:${jupHouse}, Ven:${venHouse}) from Moon:${moonHouse}`;
        strengthScore = isFormed ? 89 : 30;
        supportingFactors = isFormed ? ["Benefics in 6th/7th/8th from Moon"] : [];
        weakeningFactors = isFormed ? [] : ["6th, 7th, 8th from Moon lack natural benefics"];
      } else if (id === "kahala_yoga") {
        ruleId = "YOGA-KAHALA";
        const l4 = houseLords[4];
        const l9 = houseLords[9];
        const h4 = l4 ? getHouse(l4) : 0;
        const h9 = l9 ? getHouse(l9) : 0;
        isFormed = h4 > 0 && h9 > 0 && [0, 3, 6, 9].includes((h4 - h9 + 12) % 12);
        conditionEvidence = `4th lord (${l4}) in House ${h4}, 9th lord (${l9}) in House ${h9}`;
        strengthScore = isFormed ? 88 : 30;
      } else if (id === "chamara_yoga") {
        ruleId = "YOGA-CHAMARA";
        const l1 = houseLords[1];
        const h1 = l1 ? getHouse(l1) : 0;
        const dig1 = l1 ? getDignity(l1) : "";
        isFormed = h1 > 0 && [1, 4, 7, 10].includes(h1) && (dig1.includes("Exalted") || dig1.includes("Own"));
        conditionEvidence = `Lagna lord (${l1}) in House ${h1} (${dig1 || "Standard"})`;
        strengthScore = isFormed ? 90 : 35;
      } else if (id === "shankha_yoga") {
        ruleId = "YOGA-SHANKHA";
        const l5 = houseLords[5];
        const l6 = houseLords[6];
        const h5 = l5 ? getHouse(l5) : 0;
        const h6 = l6 ? getHouse(l6) : 0;
        isFormed = h5 > 0 && h6 > 0 && [0, 3, 6, 9].includes((h5 - h6 + 12) % 12);
        conditionEvidence = `5th lord (${l5}) in House ${h5}, 6th lord (${l6}) in House ${h6}`;
        strengthScore = isFormed ? 87 : 30;
      } else if (id === "bheri_yoga") {
        ruleId = "YOGA-BHERI";
        const l9 = houseLords[9];
        const dig9 = l9 ? getDignity(l9) : "";
        const l9Strong = dig9.includes("Own") || dig9.includes("Exalted");
        const kendraBenefics = [jupHouse, venHouse].some((h) => [1, 4, 7, 10].includes(h));
        isFormed = l9Strong && kendraBenefics;
        conditionEvidence = `9th lord (${l9}: ${dig9}) with Jupiter:${jupHouse}, Venus:${venHouse}`;
        strengthScore = isFormed ? 88 : 30;
      } else if (id === "mridanga_yoga") {
        ruleId = "YOGA-MRIDANGA";
        const l1 = houseLords[1];
        const dig1 = l1 ? getDignity(l1) : "";
        const kendraPlanets = Object.values(planets).filter((p) => [1, 4, 7, 10, 5, 9].includes(p.house));
        isFormed = (dig1.includes("Own") || dig1.includes("Exalted")) && kendraPlanets.length >= 2;
        conditionEvidence = `Lagna lord (${l1}) fortified with ${kendraPlanets.length} planets in Kendra/Trikona`;
        strengthScore = isFormed ? 89 : 30;
      }
      // 3. Surya (Solar) Yogas (7, 12 - 14)
      else if (id === "budhaditya_yoga") {
        ruleId = "YOGA-BUDHADITYA-01";
        isFormed = sunHouse > 0 && mercHouse > 0 && sunHouse === mercHouse;
        conditionEvidence = `Sun in House ${sunHouse}, Mercury in House ${mercHouse}`;
        if (isFormed) {
          strengthScore = 86;
          supportingFactors = ["Sun and Mercury co-present in single house", "High intellectual clarity"];
        } else {
          strengthScore = 20;
          weakeningFactors = ["Sun and Mercury in different houses"];
        }
      } else if (id === "vesi_yoga") {
        ruleId = "YOGA-VESI";
        const house2FromSun = ((sunHouse % 12) + 1);
        isFormed = sunHouse > 0 && hasPlanetInHouse(house2FromSun, ["Moon", "Rahu", "Ketu"]);
        conditionEvidence = `House 2 from Sun is House ${house2FromSun}`;
        strengthScore = isFormed ? 82 : 25;
      } else if (id === "vasi_yoga") {
        ruleId = "YOGA-VASI";
        const house12FromSun = (((sunHouse - 2 + 12) % 12) + 1);
        isFormed = sunHouse > 0 && hasPlanetInHouse(house12FromSun, ["Moon", "Rahu", "Ketu"]);
        conditionEvidence = `House 12 from Sun is House ${house12FromSun}`;
        strengthScore = isFormed ? 82 : 25;
      } else if (id === "ubhayachari_yoga") {
        ruleId = "YOGA-UBHAYACHARI";
        const house2FromSun = ((sunHouse % 12) + 1);
        const house12FromSun = (((sunHouse - 2 + 12) % 12) + 1);
        isFormed = sunHouse > 0 && hasPlanetInHouse(house2FromSun, ["Moon", "Rahu", "Ketu"]) && hasPlanetInHouse(house12FromSun, ["Moon", "Rahu", "Ketu"]);
        conditionEvidence = `Houses 2 & 12 from Sun: Houses ${house2FromSun} and ${house12FromSun}`;
        strengthScore = isFormed ? 88 : 30;
      }
      // 4. Chandra (Lunar) Yogas (8 - 11)
      else if (id === "sunapha_yoga") {
        ruleId = "YOGA-SUNAPHA";
        const house2FromMoon = ((moonHouse % 12) + 1);
        isFormed = moonHouse > 0 && hasPlanetInHouse(house2FromMoon, ["Sun", "Rahu", "Ketu"]);
        conditionEvidence = `House 2 from Moon is House ${house2FromMoon}`;
        strengthScore = isFormed ? 84 : 25;
      } else if (id === "anapha_yoga") {
        ruleId = "YOGA-ANAPHA";
        const house12FromMoon = (((moonHouse - 2 + 12) % 12) + 1);
        isFormed = moonHouse > 0 && hasPlanetInHouse(house12FromMoon, ["Sun", "Rahu", "Ketu"]);
        conditionEvidence = `House 12 from Moon is House ${house12FromMoon}`;
        strengthScore = isFormed ? 84 : 25;
      } else if (id === "durudhura_yoga") {
        ruleId = "YOGA-DURUDHURA";
        const house2FromMoon = ((moonHouse % 12) + 1);
        const house12FromMoon = (((moonHouse - 2 + 12) % 12) + 1);
        isFormed = moonHouse > 0 && hasPlanetInHouse(house2FromMoon, ["Sun", "Rahu", "Ketu"]) && hasPlanetInHouse(house12FromMoon, ["Sun", "Rahu", "Ketu"]);
        conditionEvidence = `Houses 2 & 12 from Moon: Houses ${house2FromMoon} and ${house12FromMoon}`;
        strengthScore = isFormed ? 89 : 30;
      } else if (id === "kemadruma_yoga") {
        ruleId = "YOGA-KEMADRUMA";
        const house2FromMoon = ((moonHouse % 12) + 1);
        const house12FromMoon = (((moonHouse - 2 + 12) % 12) + 1);
        const hasSurrounding = hasPlanetInHouse(house2FromMoon, ["Sun", "Rahu", "Ketu"]) || hasPlanetInHouse(house12FromMoon, ["Sun", "Rahu", "Ketu"]);
        const hasKendraPlanet = Object.values(planets).some((p) => p.house > 0 && [1, 4, 7, 10].includes(p.house));
        isFormed = moonHouse > 0 && !hasSurrounding && !hasKendraPlanet;
        conditionEvidence = `Moon in House ${moonHouse} without adjacent planets or kendra support`;
        strengthScore = isFormed ? 75 : 20;
      }
      // 5. Parivartana Yogas (21 - 86)
      else if (id.startsWith("parivartana_h")) {
        const parts = id.split("_");
        const h1 = parseInt(parts[1].replace("h", ""), 10);
        const h2 = parseInt(parts[2].replace("h", ""), 10);
        ruleId = `YOGA-PARIVARTANA-${h1}-${h2}`;
        const l1 = houseLords[h1];
        const l2 = houseLords[h2];
        if (l1 && l2 && l1 !== l2) {
          const posL1 = getHouse(l1);
          const posL2 = getHouse(l2);
          isFormed = posL1 === h2 && posL2 === h1;
          conditionEvidence = `Lord of H${h1} (${l1}) in H${posL1}, Lord of H${h2} (${l2}) in H${posL2}`;
        } else {
          isFormed = false;
          conditionEvidence = `Lords of House ${h1} and House ${h2} are not mutually exchanged`;
        }
        strengthScore = isFormed ? 88 : 25;
        if (isFormed) {
          supportingFactors = [`Mutual exchange between House ${h1} and House ${h2}`];
        }
      }
      // 6. Conjunction Yogas (87 - 1001)
      else if (id.startsWith("dwai_")) {
        const targetHouse = yoga.bhavaInvolved[0];
        const actors = yoga.planetaryActors;
        const p1 = actors[0];
        const p2 = actors[1];
        ruleId = `YOGA-DWAI-${(p1 || "").toUpperCase()}-${(p2 || "").toUpperCase()}-H${targetHouse}`;
        if (targetHouse && p1 && p2) {
          const hP1 = getHouse(p1);
          const hP2 = getHouse(p2);
          isFormed = hP1 === targetHouse && hP2 === targetHouse;
          conditionEvidence = `${p1} in House ${hP1}, ${p2} in House ${hP2} (Target: House ${targetHouse})`;
        } else {
          isFormed = false;
          conditionEvidence = `Conjunction requirements unfulfilled`;
        }
        strengthScore = isFormed ? 85 : 25;
        if (isFormed) {
          supportingFactors = [`${p1} and ${p2} both present in House ${targetHouse}`];
        }
      } else if (id.startsWith("tri_")) {
        const targetHouse = yoga.bhavaInvolved[0];
        const actors = yoga.planetaryActors;
        const p1 = actors[0];
        const p2 = actors[1];
        const p3 = actors[2];
        ruleId = `YOGA-TRI-${(p1 || "").toUpperCase()}-${(p2 || "").toUpperCase()}-${(p3 || "").toUpperCase()}-H${targetHouse}`;
        if (targetHouse && p1 && p2 && p3) {
          const hP1 = getHouse(p1);
          const hP2 = getHouse(p2);
          const hP3 = getHouse(p3);
          isFormed = hP1 === targetHouse && hP2 === targetHouse && hP3 === targetHouse;
          conditionEvidence = `${p1}:${hP1}, ${p2}:${hP2}, ${p3}:${hP3} (Target: House ${targetHouse})`;
        } else {
          isFormed = false;
          conditionEvidence = `Tri-graha conjunction requirements unfulfilled`;
        }
        strengthScore = isFormed ? 88 : 25;
        if (isFormed) {
          supportingFactors = [`${p1}, ${p2}, and ${p3} all aligned in House ${targetHouse}`];
        }
      } else {
        // Fallback generic evaluation
        conditionEvidence = `Planetary actors: ${yoga.planetaryActors.join(", ")}`;
      }

      // Check Dasha activation
      const isDashaActive = yoga.planetaryActors.some((actor) => {
        const a = actor.toLowerCase();
        return currentMaha.includes(a) || currentAntar.includes(a);
      });

      const status: YogaStatusCode = isFormed ? "FORMED" : "NOT_FORMED";
      const strengthRating = isFormed 
        ? (strengthScore >= 90 ? "Very Strong" : "Strong")
        : "Latent";

      results.push({
        ruleId,
        name: yoga.name,
        sanskritName: yoga.sanskritName,
        category: yoga.category,
        sourceReference: yoga.classicalSource,
        source: yoga.classicalSource.split(";")[0].trim(),
        participatingPlanets: yoga.planetaryActors,
        strengthScore,
        strengthRating,
        status,
        isFullyFormed: isFormed,
        isCancelled: false,
        supportingFactors,
        weakeningFactors,
        conditionsEvaluated: [
          {
            description: conditionDesc,
            passed: isFormed,
            evidence: conditionEvidence
          }
        ],
        dashaActivation: {
          isCurrentlyActive: isDashaActive,
          level: isDashaActive ? "Direct Active Confluence" : "Dormant",
          activationSummary: isDashaActive
            ? `Currently active under running operating cycle (${dasha.mahadasha || "Active"}/${dasha.antardasha || "Active"}).`
            : (yoga.dashaActivation || "Activates during participating planetary periods.")
        },
        whyEvidenceTree: {
          classicalSynthesis: yoga.results
        }
      });
    }

    // Preserve special Dhana & Amala classic entries if not already included
    const hasAmala = results.some((r) => r.ruleId === "YOGA-AMALA-01");
    if (!hasAmala) {
      const isAmala = [1, 4, 7, 10].includes(venHouse) || [1, 4, 7, 10].includes(jupHouse);
      const amalaActive = ["venus", "jupiter"].includes(currentMaha);
      results.push({
        ruleId: "YOGA-AMALA-01",
        name: "Amala Yoga",
        sanskritName: "अमला योग",
        category: "Maha Raja Yogas",
        sourceReference: "Phaladeepika, Ch. 6, Shloka 21",
        source: "Phaladeepika",
        participatingPlanets: ["Venus", "Jupiter"],
        strengthScore: isAmala ? 88 : 40,
        strengthRating: isAmala ? "Strong" : "Latent",
        status: isAmala ? "FORMED" : "NOT_FORMED",
        isFullyFormed: isAmala,
        isCancelled: false,
        supportingFactors: isAmala ? ["Benefic planet placed in angular Kendra"] : [],
        weakeningFactors: isAmala ? [] : ["No benefic planet in primary angles"],
        conditionsEvaluated: [
          {
            description: "Natural benefic in 10th or Kendra house",
            passed: isAmala,
            evidence: `Venus House ${venHouse}, Jupiter House ${jupHouse}`
          }
        ],
        dashaActivation: {
          isCurrentlyActive: amalaActive,
          level: amalaActive ? "Active" : "Dormant",
          activationSummary: amalaActive
            ? "Unblemished moral reputation and public honor granted under current Dasha."
            : "Manifests fully during benefic planetary dasha."
        },
        whyEvidenceTree: {
          classicalSynthesis: "The 10th house or Kendra occupied solely by natural benefics yields an untarnished reputation and enduring legacy."
        }
      });
    }

    const hasDhana = results.some((r) => r.ruleId === "YOGA-DHANA-2-11");
    if (!hasDhana) {
      const isDhana = (jupHouse === 2 || jupHouse === 11 || venHouse === 2 || venHouse === 11);
      const dhanaActive = ["jupiter", "venus"].includes(currentMaha);
      results.push({
        ruleId: "YOGA-DHANA-2-11",
        name: "Dhana Yoga (Wealth Acceleration)",
        sanskritName: "धन योग",
        category: "Dhana (Wealth) Yogas",
        sourceReference: "BPHS, Dhana Yoga Adhyaya, Shloka 5-9",
        source: "BPHS",
        participatingPlanets: ["Jupiter", "Venus"],
        strengthScore: isDhana ? 85 : 45,
        strengthRating: isDhana ? "Strong" : "Latent",
        status: isDhana ? "FORMED" : "NOT_FORMED",
        isFullyFormed: isDhana,
        isCancelled: false,
        supportingFactors: isDhana ? ["Benefic influence directly on 2nd or 11th house"] : [],
        weakeningFactors: isDhana ? [] : ["Wealth houses lack benefic occupancy"],
        conditionsEvaluated: [
          {
            description: "2nd or 11th house occupied or fortified by natural benefics",
            passed: isDhana,
            evidence: `Jupiter House ${jupHouse}, Venus House ${venHouse}`
          }
        ],
        dashaActivation: {
          isCurrentlyActive: dhanaActive,
          level: dhanaActive ? "Active" : "Dormant",
          activationSummary: dhanaActive
            ? "Financial expansion and steady earned asset accumulation active under current dasha."
            : "Activates during dasha of lords of 2nd, 5th, 9th, or 11th."
        },
        whyEvidenceTree: {
          classicalSynthesis: "When natural benefics fortify the houses of accumulated wealth (2nd) and incoming gains (11th), prosperity flows steadily."
        }
      });
    }

    const fullyFormed = results.filter((r) => r.isFullyFormed && !r.isCancelled);
    const currentlyActive = results.filter((r) => r.dashaActivation.isCurrentlyActive);
    const modifiedOrCancelled = results.filter((r) => r.isCancelled || r.status === "FORMED_WITH_MODIFIERS" || r.status === "WEAKENED");

    return {
      detectedYogas: results,
      fullyFormedCount: fullyFormed.length,
      currentlyActiveCount: currentlyActive.length,
      modifiedOrCancelledYogas: modifiedOrCancelled,
      totalEvaluated: results.length
    };
  }
}
