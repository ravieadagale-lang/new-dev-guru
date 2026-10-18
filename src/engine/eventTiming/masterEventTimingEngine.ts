/**
 * AstroNext - Master Event Timing & Multi-System Predictive Confluence Engine
 * Master orchestrator for end-to-end event timing:
 * 1. Evaluates Natal Promise (House, Lord, Dignity, Karakas, Varga)
 * 2. Evaluates Period Activation (Vimshottari, Chara, Mudda Dasha)
 * 3. Evaluates Transit Double Sanction (Jupiter, Saturn, Rahu/Ketu, SAV/BAV)
 * 4. Evaluates Annual Varshaphala Activation (Muntha, Sahams, Tajika Yogas)
 * 5. Derives Deterministic Event Windows & Multi-Stream Evidence Chain
 */

import {
  EventLifeDomain,
  MasterEventTimingReport,
} from "./eventTimingTypes";
import { EventPromiseEngine } from "./eventPromiseEngine";
import { EventActivationEngine } from "./eventActivationEngine";
import { EventTimingEngine } from "./eventTimingEngine";

export class MasterEventTimingEngine {
  public static calculateMasterEventTiming(params: {
    domain: EventLifeDomain;
    evalDate: Date;
    natalAscendantLongitude: number;
    planets: Record<string, { longitude: number; name: string }>;
    houseLords: Record<number, string>;
    dignities: Record<string, string>;
    currentDasha: { maha: string; antar: string; pratyantar: string };
    charaDashaSign?: string;
    transitPlanets: {
      jupiterLongitude: number;
      saturnLongitude: number;
      rahuLongitude: number;
    };
    savPoints?: Record<number, number>;
    varshaphalaData?: {
      year: number;
      varshaAscSign: string;
      munthaHouse: number;
      munthesha: string;
      sahamSign: string;
      sahamHouse: number;
      favorableTajikaYogasCount: number;
    };
  }): MasterEventTimingReport {
    const {
      domain,
      evalDate,
      natalAscendantLongitude,
      planets,
      houseLords,
      dignities,
      currentDasha,
      charaDashaSign = "Aries",
      transitPlanets,
      savPoints = {},
      varshaphalaData,
    } = params;

    // 1. Evaluate Natal Foundation / Promise
    const natalPromise = EventPromiseEngine.evaluatePromise({
      domain,
      natalAscendantLongitude,
      planets,
      houseLords,
      dignities,
    });

    // 2. Evaluate Period Activation
    const periodActivation = EventActivationEngine.evaluatePeriodActivation({
      domain,
      primaryHouse: natalPromise.primaryHouseNumber,
      primaryLord: natalPromise.primaryHouseLord,
      currentDasha,
      charaDashaSign,
    });

    // 3. Evaluate Transit Activation (Double Transit of Jupiter + Saturn)
    const transitActivation = EventActivationEngine.evaluateTransitActivation({
      domain,
      primaryHouse: natalPromise.primaryHouseNumber,
      natalAscendantLongitude,
      transitJupiterLongitude: transitPlanets.jupiterLongitude,
      transitSaturnLongitude: transitPlanets.saturnLongitude,
      transitRahuLongitude: transitPlanets.rahuLongitude,
      savPoints,
    });

    // 4. Evaluate Annual Activation
    const annualActivation = EventActivationEngine.evaluateAnnualActivation({
      varshaYear: varshaphalaData?.year ?? evalDate.getUTCFullYear(),
      varshaAscendantSign: varshaphalaData?.varshaAscSign ?? "Aries",
      munthaHouseInVarsha: varshaphalaData?.munthaHouse ?? 1,
      muntheshaPlanet: varshaphalaData?.munthesha ?? "Mars",
      relevantSahamSign: varshaphalaData?.sahamSign ?? "Leo",
      relevantSahamHouse: varshaphalaData?.sahamHouse ?? 5,
      favorableTajikaYogasCount: varshaphalaData?.favorableTajikaYogasCount ?? 2,
    });

    // 5. Synthesize Event Windows & Multi-Stream Evidence Chain
    const synthesis = EventTimingEngine.synthesizeEventWindows({
      domain,
      evalDate,
      natalPromise,
      periodActivation,
      transitActivation,
      annualActivation,
    });

    return {
      metadata: {
        engineVersion: "AstroNext Event Timing Engine v7.0-Pro",
        calculationTimestampIso: new Date().toISOString(),
        domain,
        evalDateIso: evalDate.toISOString(),
      },
      natalPromise,
      periodActivation,
      transitActivation,
      annualActivation,
      multiSystemStreams: synthesis.multiSystemStreams,
      subEvidenceFactors: synthesis.subEvidenceFactors,
      eventWindows: synthesis.eventWindows,
      confluenceSynthesis: synthesis.confluenceSynthesis,
    };
  }
}
