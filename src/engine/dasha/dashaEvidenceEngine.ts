/**
 * Dasha Evidence Engine
 * Generates transparent, deterministic, rule-based proof trees explaining WHY a Dasha lord
 * produces specific life manifestations during its operating window.
 * Reference: Brihat Parashara Hora Shastra, Phaladeepika Ch. 20 (Dasha Phala).
 */

import { FunctionalNatureEngine, FunctionalPlanetEvaluation } from "./functionalNatureEngine";

export interface DashaLordNatalProfile {
  planet: string;
  sign: string;
  signLord: string;
  occupiedHouse: number;
  ownedHouses: number[];
  degreeInSign: number;
  dmsFormatted: string;
  nakshatra: string;
  pada: number;
  nakshatraLord: string;
  dignity: string;
  isCombust: boolean;
  isRetrograde: boolean;
  isWarWinner?: boolean;
  shadbalaVirupas?: number;
  shadbalaRatio?: number;
  d9NavamshaSign?: string;
  d10DashamshaSign?: string;
}

export interface DashaEvidenceReport {
  dashaLord: string;
  dashaLevel: "Mahadasha" | "Antardasha" | "Pratyantardasha";
  functionalEvaluation: FunctionalPlanetEvaluation;
  positiveFactors: string[];
  challengingFactors: string[];
  cancellationOrMitigationFactors: string[];
  activatedHouses: number[];
  overallClassification: "Highly Auspicious" | "Constructive & Favorable" | "Mixed / Transformative" | "Demanding / Karmic Lessons";
  classicalSynthesisNotes: string;
  ruleReferences: string[];
}

export class DashaEvidenceEngine {
  /**
   * Evaluate a Dasha lord's natal strength, lordship, and manifest tendencies
   */
  public static evaluateLordEvidence(params: {
    planetProfile: DashaLordNatalProfile;
    ascendantSign: string;
    dashaLevel?: "Mahadasha" | "Antardasha" | "Pratyantardasha";
  }): DashaEvidenceReport {
    const { planetProfile, ascendantSign, dashaLevel = "Mahadasha" } = params;
    const functionalReport = FunctionalNatureEngine.evaluateForLagna(ascendantSign);
    const functionalEval = functionalReport.evaluations[planetProfile.planet] || {
      planet: planetProfile.planet,
      ownedHouses: planetProfile.ownedHouses,
      isTrikonaLord: false,
      isKendraLord: false,
      isDusthanaLord: false,
      isTrishadayaLord: false,
      isMarakaLord: false,
      classification: "Neutral / Mixed",
      rationale: "Standard neutral evaluation",
      classicalRuleReference: "BPHS Ch. 34"
    };

    const positiveFactors: string[] = [];
    const challengingFactors: string[] = [];
    const mitigationFactors: string[] = [];
    const ruleRefs: string[] = ["BPHS Ch. 46 (Vimshottari Dasha Phala)", "Phaladeepika Ch. 20"];

    // 1. Dignity Evaluation
    const digLower = (planetProfile.dignity || "").toLowerCase();
    if (digLower.includes("exalt") || digLower.includes("uchha")) {
      positiveFactors.push(`Exalted dignity (Param Uchha) in ${planetProfile.sign} grants peak structural confidence and auspicious resource influx.`);
      ruleRefs.push("BPHS Ch. 45 (Exaltation in Dasha)");
    } else if (digLower.includes("own") || digLower.includes("swa")) {
      positiveFactors.push(`Own sign dignity (Swa Kshetra) in ${planetProfile.sign} anchors stability and protective self-determination.`);
    } else if (digLower.includes("moolatrikona")) {
      positiveFactors.push(`Moolatrikona placement in ${planetProfile.sign} empowers purposeful leadership and dharmic duty.`);
    } else if (digLower.includes("debilitat") || digLower.includes("neecha")) {
      challengingFactors.push(`Debilitated dignity (Neecha) in ${planetProfile.sign} demands humility, extra perseverance, and reliance on mitigations.`);
      ruleRefs.push("BPHS Ch. 45 (Debilitation in Dasha)");
    }

    // 2. Functional Lordship
    if (functionalEval.classification === "Yogakaraka") {
      positiveFactors.push(`Rare Yogakaraka status for ${ascendantSign} Lagna, unifying Kendra and Trikona authority.`);
    } else if (functionalEval.classification === "Functional Benefic") {
      positiveFactors.push(`Functional benefic status rules auspicious Dharma/Trikona houses [${functionalEval.ownedHouses.join(", ")}].`);
    } else if (functionalEval.classification === "Functional Malefic") {
      challengingFactors.push(`Functional malefic lordship over houses [${functionalEval.ownedHouses.join(", ")}] brings pressure to transform and build resilience.`);
    }

    // 3. House Occupancy
    const occHouse = planetProfile.occupiedHouse;
    if ([1, 4, 7, 10].includes(occHouse)) {
      positiveFactors.push(`Placed in prominent Kendra house (${occHouse}th Bhava), projecting dynamic action into tangible worldly arenas.`);
    } else if ([5, 9].includes(occHouse)) {
      positiveFactors.push(`Placed in sacred Trikona house (${occHouse}th Bhava), attracting luck, wisdom, and auspicious mentorship.`);
    } else if ([6, 8, 12].includes(occHouse)) {
      challengingFactors.push(`Placed in Dusthana house (${occHouse}th Bhava), triggering restructuring, debt/health audits, or seclusion.`);
    } else if ([3, 11].includes(occHouse)) {
      positiveFactors.push(`Placed in growth/Upachaya house (${occHouse}th Bhava), enabling steady gains through persistent enterprise.`);
    }

    // 4. Combustion & Retrograde
    if (planetProfile.isCombust) {
      challengingFactors.push(`Astha (Combustion) within close solar orb obscures physical expression, shifting power inward toward esoteric insight.`);
      ruleRefs.push("Saravali Ch. 5 (Combustion Effects)");
    }
    if (planetProfile.isRetrograde) {
      positiveFactors.push(`Vakra (Retrograde) motion intensifies Chesta Bala, conferring unconventional vision, deep introspection, and karmic replay.`);
    }

    // 5. Shadbala Strength
    if (planetProfile.shadbalaVirupas && planetProfile.shadbalaVirupas >= 390) {
      positiveFactors.push(`Potent Shadbala rating (${planetProfile.shadbalaVirupas.toFixed(0)} Virupas) ensures sufficient stamina to manifest goals.`);
    } else if (planetProfile.shadbalaVirupas && planetProfile.shadbalaVirupas < 300) {
      challengingFactors.push(`Moderate Shadbala virupas (${planetProfile.shadbalaVirupas.toFixed(0)}) suggests pacing energy to avoid burnout.`);
    }

    // 6. Navamsha Confirmation
    if (planetProfile.d9NavamshaSign) {
      positiveFactors.push(`Navamsha (D9) anchored in ${planetProfile.d9NavamshaSign} reveals inner spiritual alignment and spousal synergy.`);
    }

    // 7. Activated Houses Synthesis
    const activatedHouses = Array.from(new Set([...planetProfile.ownedHouses, planetProfile.occupiedHouse])).sort((a, b) => a - b);

    // 8. Overall Classification Synthesis
    let overallClassification: DashaEvidenceReport["overallClassification"] = "Mixed / Transformative";
    if (positiveFactors.length >= 3 && challengingFactors.length === 0) {
      overallClassification = "Highly Auspicious";
    } else if (positiveFactors.length >= challengingFactors.length) {
      overallClassification = "Constructive & Favorable";
    } else if (challengingFactors.length > positiveFactors.length + 1) {
      overallClassification = "Demanding / Karmic Lessons";
    }

    const synthesisNotes = `${planetProfile.planet} (${dashaLevel}) commands houses [${planetProfile.ownedHouses.join(", ")}] while stationed in House ${planetProfile.occupiedHouse} (${planetProfile.sign}). Overall cosmic resonance is ${overallClassification.toLowerCase()}.`;

    return {
      dashaLord: planetProfile.planet,
      dashaLevel,
      functionalEvaluation: functionalEval,
      positiveFactors,
      challengingFactors,
      cancellationOrMitigationFactors: mitigationFactors,
      activatedHouses,
      overallClassification,
      classicalSynthesisNotes: synthesisNotes,
      ruleReferences: ruleRefs
    };
  }
}
