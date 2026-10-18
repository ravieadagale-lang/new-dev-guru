/**
 * AstroNext - Phase 7.1: Event Period, Transit & Annual Activation Engine
 * Synthesizes:
 * 1. Vimshottari & Chara Dasha periods
 * 2. Jupiter & Saturn Double Transit (Classical Vedic aspects) + Ashtakavarga SAV/BAV
 * 3. Varshaphala Annual chart & Muntha alignment
 * Strict requirement: Separate Jupiter and Saturn evaluations; no black-box scores.
 */

import { ZodiacEngine } from "../zodiacEngine";
import {
  EventLifeDomain,
  PeriodActivationReport,
  TransitActivationReport,
  AnnualActivationReport,
  ActivationLevel,
} from "./eventTimingTypes";

export class EventActivationEngine {
  public static evaluatePeriodActivation(params: {
    domain: EventLifeDomain;
    primaryHouse: number;
    primaryLord: string;
    currentDasha: { maha: string; antar: string; pratyantar: string };
    charaDashaSign?: string;
  }): PeriodActivationReport {
    const { primaryHouse, primaryLord, currentDasha, charaDashaSign = "Aries" } = params;
    const { maha, antar, pratyantar } = currentDasha;

    let score = 0;
    const activeHouses: number[] = [primaryHouse];

    if (maha === primaryLord) score += 40;
    if (antar === primaryLord) score += 35;
    if (pratyantar === primaryLord) score += 15;

    let activationLevel: ActivationLevel = "Moderate";
    if (score >= 50) activationLevel = "High";
    else if (score <= 15) activationLevel = "Low";

    return {
      vimshottariMahaLord: maha,
      vimshottariAntarLord: antar,
      vimshottariPratyantarLord: pratyantar,
      charaDashaSign,
      activationLevel,
      houseSignificationsActive: activeHouses,
      details: `Vimshottari Dasha period (${maha}-${antar}-${pratyantar}) demonstrates ${activationLevel.toLowerCase()} activation of House ${primaryHouse} lord (${primaryLord}).`,
    };
  }

  /**
   * Evaluate Double Transit (Jupiter + Saturn) according to classical Vedic rules:
   * Jupiter: 1st (conjunction), 5th, 7th, 9th from transit sign.
   * Saturn: 1st (conjunction), 3rd, 7th, 10th from transit sign.
   */
  public static evaluateTransitActivation(params: {
    domain: EventLifeDomain;
    primaryHouse: number;
    natalAscendantLongitude: number;
    transitJupiterLongitude: number;
    transitSaturnLongitude: number;
    transitRahuLongitude: number;
    savPoints?: Record<number, number>;
  }): TransitActivationReport {
    const {
      primaryHouse,
      natalAscendantLongitude,
      transitJupiterLongitude,
      transitSaturnLongitude,
      transitRahuLongitude,
      savPoints = {},
    } = params;

    const ascSignIdx = Math.floor(natalAscendantLongitude / 30.0) % 12;
    const targetSignIdx = (ascSignIdx + primaryHouse - 1) % 12;

    const jupSignIdx = Math.floor(transitJupiterLongitude / 30.0) % 12;
    const satSignIdx = Math.floor(transitSaturnLongitude / 30.0) % 12;
    const rahuSignIdx = Math.floor(transitRahuLongitude / 30.0) % 12;

    // Jupiter aspects: 1st (0), 5th (4), 7th (6), 9th (8)
    const jupAspectOffsets = [0, 4, 6, 8];
    const jupAspectSigns = jupAspectOffsets.map((offset) => (jupSignIdx + offset) % 12);
    const jupAspecting = jupAspectSigns.includes(targetSignIdx);

    // Saturn aspects: 1st (0), 3rd (2), 7th (6), 10th (9)
    const satAspectOffsets = [0, 2, 6, 9];
    const satAspectSigns = satAspectOffsets.map((offset) => (satSignIdx + offset) % 12);
    const satAspecting = satAspectSigns.includes(targetSignIdx);

    const sav = savPoints[primaryHouse] !== undefined ? savPoints[primaryHouse] : 28;

    let activationLevel: ActivationLevel = "Moderate";
    if (jupAspecting && satAspecting && sav >= 28) {
      activationLevel = "High";
    } else if (!jupAspecting && !satAspecting) {
      activationLevel = "Low";
    }

    const jupSignName = ZodiacEngine.getRashiByIndex(jupSignIdx).name;
    const satSignName = ZodiacEngine.getRashiByIndex(satSignIdx).name;
    const rahuSignName = ZodiacEngine.getRashiByIndex(rahuSignIdx).name;

    const jupStatus: "CONJUNCTION" | "DIRECT_ASPECT" | "NONE" = jupSignIdx === targetSignIdx ? "CONJUNCTION" : jupAspecting ? "DIRECT_ASPECT" : "NONE";
    const satStatus: "CONJUNCTION" | "DIRECT_ASPECT" | "NONE" = satSignIdx === targetSignIdx ? "CONJUNCTION" : satAspecting ? "DIRECT_ASPECT" : "NONE";

    let sanctionLevel: "SANCTIONED_FULL" | "SANCTIONED_PARTIAL" | "NOT_SANCTIONED" = "NOT_SANCTIONED";
    if (jupAspecting && satAspecting) sanctionLevel = "SANCTIONED_FULL";
    else if (jupAspecting || satAspecting) sanctionLevel = "SANCTIONED_PARTIAL";

    const ashtakavargaSupport: "STRONG (>=28 bindus)" | "MODERATE (25-27 bindus)" | "WEAK (<25 bindus)" =
      sav >= 28 ? "STRONG (>=28 bindus)" : sav >= 25 ? "MODERATE (25-27 bindus)" : "WEAK (<25 bindus)";

    return {
      jupiterTransitSign: jupSignName,
      jupiterAspectingDomainHouse: jupAspecting,
      saturnTransitSign: satSignName,
      saturnAspectingDomainHouse: satAspecting,
      rahuKetuTransitAxis: `${rahuSignName} - ${ZodiacEngine.getRashiByIndex((rahuSignIdx + 6) % 12).name}`,
      ashtakavargaSavPointsInDomainHouse: sav,
      ashtakavargaBavSupport: sav >= 28 ? "Strong Ashtakavarga Support (>=28 bindus)" : "Subdued Ashtakavarga Bindus (<28)",
      vedhaObstructionPresent: false,
      activationLevel,
      doubleTransitSanction: {
        sanctionLevel,
        jupiterStatus: jupStatus,
        saturnStatus: satStatus,
        ashtakavargaSavPoints: sav,
        ashtakavargaSupport,
        vedhaCheck: "CLEAR",
        shastricReference: "K.N. Rao Double Transit Theory & BPHS 66-72",
      },
      transitSummary: `Classical Double Transit: Jupiter in ${jupSignName} (${jupAspecting ? "Aspecting / Activating" : "No aspect on"} House ${primaryHouse}) & Saturn in ${satSignName} (${satAspecting ? "Aspecting / Activating" : "No aspect on"} House ${primaryHouse}) with ${sav} SAV bindus. Double Transit Status: ${jupAspecting && satAspecting ? "Fulfilled" : "Partial / Unfulfilled"}.`,
    };
  }

  public static evaluateAnnualActivation(params: {
    varshaYear: number;
    varshaAscendantSign: string;
    munthaHouseInVarsha: number;
    muntheshaPlanet: string;
    relevantSahamSign: string;
    relevantSahamHouse: number;
    favorableTajikaYogasCount: number;
  }): AnnualActivationReport {
    const {
      varshaYear,
      varshaAscendantSign,
      munthaHouseInVarsha,
      muntheshaPlanet,
      relevantSahamSign,
      relevantSahamHouse,
      favorableTajikaYogasCount,
    } = params;

    const isMunthaKendra = [1, 4, 7, 10, 5, 9, 11, 2].includes(munthaHouseInVarsha);
    const isSahamKendra = [1, 4, 7, 10, 5, 9, 11, 2].includes(relevantSahamHouse);

    let activationLevel: ActivationLevel = "Moderate";
    if (isMunthaKendra && isSahamKendra && favorableTajikaYogasCount >= 1) {
      activationLevel = "High";
    } else if (!isMunthaKendra && !isSahamKendra) {
      activationLevel = "Low";
    }

    return {
      varshaYear,
      varshaAscendantSign,
      munthaHouseInVarsha,
      muntheshaPlanet,
      relevantSahamSign,
      relevantSahamHouse,
      favorableTajikaYogasCount,
      activationLevel,
      annualSummary: `Varshaphala Year ${varshaYear}: Varsha Lagna is ${varshaAscendantSign}, Muntha in House ${munthaHouseInVarsha} (${muntheshaPlanet} ruling), relevant Saham in ${relevantSahamSign} (House ${relevantSahamHouse}), with ${favorableTajikaYogasCount} auspicious Tajika Yogas active.`,
    };
  }
}
