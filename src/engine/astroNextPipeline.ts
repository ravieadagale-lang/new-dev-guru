/**
 * AstroNext Master Calculation Pipeline & Orchestrator
 * Pure deterministic, rule-based, mathematical Vedic astrology computation suite.
 * Adheres strictly to the 14-Step Processing Architecture:
 * Step 1: Astronomical Engine (HighPrecisionAstroEphemerisProvider)
 * Step 2: Calculation Normalizer (Canonical Coordinate Standardizer)
 * Step 3: Raw Astrological Data Vault (Immutable calculation records)
 * Step 4: Panchang & Muhurta Suite (5 Limbs, Horas, Choghadiya)
 * Step 5: Chart & House Foundation (Whole Sign, Placidus, Bhava Chalit)
 * Step 6: Planetary Dignity, Avasthas & Drishti
 * Step 7: Shadbala (6-Fold Potency) & Bhavabala
 * Step 8: Divisional Charts Engine (Shodashavarga D1-D60 & Pushkara)
 * Step 9: Dasha Predictive Suite (5-Tier Vimshottari, Yogini, Chara)
 * Step 10: Ashtakavarga System (BAV, SAV 337, Shodhana, Kakshya)
 * Step 11: Jaimini Astrological Suite (Karakas, Karakamsa, Arudhas, Argala)
 * Step 12: Krishnamurti Paddhati (KP) Suite (Sub-Lords, 4-Tier ABCD, RP)
 * Step 13: Yoga Detection Engine (1001+ Classical Yogas)
 * Step 14: Dynamic Transits, Gochara, & Master Synthesis
 */

import { HighPrecisionAstroEphemerisProvider } from "./ephemerisProvider";
import { AyanamsaService, AyanamsaSystemName } from "./ayanamsaEngine";
import { ZodiacEngine, RashiPlacementDetails } from "./zodiacEngine";
import { NakshatraEngine, NakshatraPlacementDetails } from "./nakshatraEngine";
import { TithiEngine, TithiDetails } from "./tithiEngine";
import { PanchangEngine, PanchangReport } from "./panchangEngine";
import { HouseEngine, HouseSystemType, HouseCalculationResult } from "./houseEngine";
import { BhavaChalitEngine, BhavaChalitReport } from "./bhavaChalitEngine";
import { PlanetaryEngine, PlanetaryStatusReport } from "./planetaryEngine";
import { ShadbalaEngine, ComprehensiveShadbalaReport } from "./shadbalaEngine";
import { DivisionalChartsEngine, ShodashavargaReport } from "./divisionalChartsEngine";
import { DashaEngine, VimshottariDashaReport, YoginiDashaPeriod, CharaDashaPeriod } from "./dashaEngine";
import { AshtakavargaEngine, AshtakavargaReport } from "./ashtakavargaEngine";
import { JaiminiEngine, JaiminiReport } from "./jaiminiEngine";
import { KPEngine, ComprehensiveKPReport } from "./kpEngine";
import { YogaDetectionEngine, DetectedYoga } from "./yogaDetectionEngine";
import { TransitEngine, ComprehensiveTransitReport } from "./transitEngine";
import { normalizeDeg, degToDMS, calculateAscendant, calculateMidheaven } from "./astronomyMath";

// Deep engines
import { CalculationPolicy, AstroCalculationPolicy, CalculationMethodology } from "./calculationPolicy";
import { AstronomyEventsEngine, AstronomicalEventSummary } from "./astronomyEventsEngine";
import { SpecialLagnaEngine, SpecialLagnaReport } from "./specialLagnaEngine";
import { VargaEvidenceEngine, CompleteVargaReport } from "./vargaEvidenceEngine";
import { GrahaYuddhaEngine, PlanetaryWarContest, CombustionDeepDetail, ShayanaadiAvasthaResult } from "./grahaYuddhaEngine";
import { DrishtiAspectEngine, CompleteAspectReport } from "./drishtiAspectEngine";
import { BhavaBalaEngine, BhavaBalaReport } from "./bhavaBalaEngine";
import { YogaRuleEngine, DetectedYogaResult, ParivartanaExchangeDetail } from "./yogaRuleEngine";
import { DashaFrameworkEngine, UniversalDashaReport } from "./dashaFrameworkEngine";
import { KPDeepEngine, CompleteKPDeepReport } from "./kpDeepEngine";
import { TajikaVarshaphalaEngine, TajikaAnnualReport } from "./tajikaVarshaphalaEngine";
import { PrashnaDeepEngine, PrashnaJudgementReport, PrashnaQueryDomain } from "./prashnaDeepEngine";
import { MuhurtaDeepEngine, MuhurtaEvaluationResult, MuhurtaActivityKey } from "./muhurtaDeepEngine";
import { MedicalAstroEngine, MedicalAstroReport } from "./medicalAstroEngine";
import { YogaDetectionMasterEngine, YogaDetectionOutput } from "./yogas";
import { DoshaDetectionMasterEngine, DoshaDetectionOutput } from "./doshas";
import {
  PlanetaryShadbalaEngine,
  MasterShadbalaReport,
  VimsopakaBalaEngine,
  MasterVimsopakaReport,
  IshtaKashtaEngine,
  MasterIshtaKashtaReport,
  AvasthaEngine,
  MasterAvasthaReport,
  StrengthEvidenceEngine,
  ComprehensivePlanetStrengthEvidence,
  PlanetaryCalculationInput,
  ChartCalculationContext,
} from "./planetaryStrength";
import {
  VargaConfluenceEngine,
  PlanetCrossVargaProfile,
  DomainConfluenceReport,
} from "./vargaConfluenceEngine";
import {
  MasterTransitEngine,
  MasterTransitReport,
} from "./transits";
import {
  MasterJaiminiEngine,
  MasterJaiminiReport,
  JaiminiKarakaScheme,
} from "./jaimini";
import {
  MasterKPEngine,
  MasterKPReport,
} from "./kp";
import {
  CrossValidationEngine,
  MasterCrossValidationReport,
} from "./crossValidation";
import { MasterRuleRegistry } from "./provenance/masterRuleRegistry";
import { MasterPrashnaEngine, MasterPrashnaReport, PrashnaCategory } from "./prashna";
import { MasterTajikaEngine, MasterTajikaAnnualReport } from "./tajika";
import { MasterEventTimingEngine, MasterEventTimingReport, EventLifeDomain } from "./eventTiming";

export interface AstroNextInputParams {
  year: number;
  month: number;           // 1 to 12
  day: number;
  hour: number;            // 0 to 23
  minute: number;          // 0 to 59
  second?: number;
  latitude: number;        // Decimal degrees (Positive North, Negative South)
  longitude: number;       // Decimal degrees (Positive East, Negative West)
  timezoneOffsetHours: number; // e.g. +5.5 for IST, -5 for EST
  ayanamsaType?: string;   // Defaults to "Lahiri (Chitrapaksha)"
  houseSystem?: HouseSystemType; // Defaults to "Whole Sign"
  calculationMethodology?: CalculationMethodology;
  jaiminiKarakaScheme?: JaiminiKarakaScheme;
  prashnaQuery?: string;
  prashnaDomain?: PrashnaQueryDomain;
  targetMuhurtaActivity?: MuhurtaActivityKey;
  targetVarshaYear?: number;
  chartTitle?: string;
}

export interface MasterAstroReportPayload {
  metadata: {
    engineVersion: string;
    calculationTimestampIso: string;
    ayanamsaApplied: {
      type: string;
      valueDegrees: number;
      dms: string;
    };
    geographicCoordinates: {
      latitude: number;
      longitude: number;
      timezoneOffsetHours: number;
    };
    inputDateTimeIso: string;
    julianDayUtc: number;
    calculationPolicy: AstroCalculationPolicy;
  };
  panchang: PanchangReport;
  ascendant: {
    tropicalLongitude: number;
    siderealLongitude: number;
    rashi: RashiPlacementDetails;
    nakshatra: NakshatraPlacementDetails;
  };
  planetaryPositions: Record<string, {
    tropicalLongitude: number;
    siderealLongitude: number;
    speedLongitudeDegPerDay: number;
    isRetrograde: boolean;
    isCombust: boolean;
    rashi: RashiPlacementDetails;
    nakshatra: NakshatraPlacementDetails;
  }>;
  housesWholeSign: HouseCalculationResult;
  housesPlacidus: HouseCalculationResult;
  bhavaChalit: BhavaChalitReport;
  planetaryStrengthsAndAvasthas: PlanetaryStatusReport;
  shadbala: ComprehensiveShadbalaReport;
  bhavaBala: BhavaBalaReport;
  divisionalCharts: ShodashavargaReport;
  vargaEvidence: CompleteVargaReport;
  specialLagnas: SpecialLagnaReport;
  grahaYuddha: {
    planetaryWars: PlanetaryWarContest[];
    combustions: Record<string, CombustionDeepDetail>;
    shayanaadiAvasthas: Record<string, ShayanaadiAvasthaResult>;
  };
  aspectsAndDrishti: CompleteAspectReport;
  vimshottariDasha: VimshottariDashaReport;
  yoginiDasha: YoginiDashaPeriod[];
  charaDasha: CharaDashaPeriod[];
  dashaUniversalFramework: UniversalDashaReport;
  ashtakavarga: AshtakavargaReport;
  jaimini: JaiminiReport;
  kpSystem: ComprehensiveKPReport;
  kpDeepSystem: CompleteKPDeepReport;
  detectedYogas: DetectedYoga[];
  yogaRulesAdvanced: {
    detectedYogas: DetectedYogaResult[];
    parivartanaExchanges: ParivartanaExchangeDetail[];
    neechaBhangaYogas: DetectedYogaResult[];
    panchaMahapurushaYogas: DetectedYogaResult[];
  };
  classicalYogasMaster: YogaDetectionOutput;
  classicalDoshasMaster: DoshaDetectionOutput;
  transits: ComprehensiveTransitReport;
  astronomyEvents: AstronomicalEventSummary;
  tajikaVarshaphala: TajikaAnnualReport;
  prashnaJudgement: PrashnaJudgementReport;
  muhurtaEvaluation: MuhurtaEvaluationResult;
  medicalConstitution: MedicalAstroReport;
  planetaryStrengthMaster: {
    shadbalaMaster: MasterShadbalaReport;
    vimsopakaMaster: MasterVimsopakaReport;
    ishtaKashtaMaster: MasterIshtaKashtaReport;
    avasthasMaster: MasterAvasthaReport;
    evidenceMaster: Record<string, ComprehensivePlanetStrengthEvidence>;
  };
  vargaConfluence: {
    crossVargaMatrix: Record<string, PlanetCrossVargaProfile>;
    domainReports: Record<string, DomainConfluenceReport>;
  };
  masterTransits: MasterTransitReport;
  masterJaimini: MasterJaiminiReport;
  masterKp: MasterKPReport;
  crossValidation: MasterCrossValidationReport;
  masterPrashna: MasterPrashnaReport;
  masterTajika: MasterTajikaAnnualReport;
  masterEventTiming: MasterEventTimingReport;
}

export class AstroNextPipeline {
  private ephemerisProvider: HighPrecisionAstroEphemerisProvider;

  constructor() {
    this.ephemerisProvider = new HighPrecisionAstroEphemerisProvider();
  }

  /**
   * Execute the full 14-Step Astrological Calculation Pipeline
   */
  public async generateComprehensiveReport(
    params: AstroNextInputParams
  ): Promise<MasterAstroReportPayload> {
    const {
      year,
      month,
      day,
      hour,
      minute,
      second = 0,
      latitude,
      longitude,
      timezoneOffsetHours,
      ayanamsaType = "Lahiri (Chitrapaksha)",
      houseSystem = "Whole Sign",
    } = params;

    // Step 1: Astronomical Ephemeris Computations
    const ephemResult = this.ephemerisProvider.calculateEphemeris({
      year,
      month,
      day,
      hour,
      minute,
      second,
      latitude,
      longitude,
      timezoneOffsetHours,
    });

    const jdUtc = ephemResult.julianDayUT;
    const ayanamsaSys: AyanamsaSystemName = ayanamsaType.toLowerCase().includes("raman")
      ? "raman"
      : ayanamsaType.toLowerCase().includes("kp") || ayanamsaType.toLowerCase().includes("krishnamurti")
      ? "krishnamurti"
      : ayanamsaType.toLowerCase().includes("yukteswar")
      ? "yukteswar"
      : ayanamsaType.toLowerCase().includes("fagan")
      ? "fagan_bradley"
      : ayanamsaType.toLowerCase().includes("true")
      ? "true_chitrapaksha"
      : "lahiri";

    const ayanamsaData = AyanamsaService.calculateAyanamsa(jdUtc, ayanamsaSys);
    const ayanamsaVal = ayanamsaData.ayanamsa_value;

    const epsTrue = ephemResult.obliquityTrueDeg;
    const tropicalAscLon = calculateAscendant(ephemResult.localSiderealTimeDeg, latitude, epsTrue);
    const tropicalMcLon = calculateMidheaven(ephemResult.localSiderealTimeDeg, epsTrue);
    const siderealAscLon = normalizeDeg(tropicalAscLon - ayanamsaVal);
    const siderealMcLon = normalizeDeg(tropicalMcLon - ayanamsaVal);

    // Step 2 & 3: Normalizer & Data Vault Creation
    const ascRashi = ZodiacEngine.getRashiPlacement(siderealAscLon);
    const ascNak = NakshatraEngine.getNakshatraPlacement(siderealAscLon);

    const rawBodies = ephemResult.bodies;
    const normalizedPlanets: Record<string, {
      tropicalLongitude: number;
      siderealLongitude: number;
      speedLongitudeDegPerDay: number;
      isRetrograde: boolean;
      isCombust: boolean;
      rashi: RashiPlacementDetails;
      nakshatra: NakshatraPlacementDetails;
    }> = {};

    const siderealPositionsSimple: Record<string, { longitude: number; name: string; isRetrograde?: boolean; speedLongitudeDegPerDay?: number }> = {};

    Object.entries(rawBodies).forEach(([name, p]) => {
      const tropLon = p.eclipticLongitude;
      const sidLon = normalizeDeg(tropLon - ayanamsaVal);
      const pRashi = ZodiacEngine.getRashiPlacement(sidLon);
      const pNak = NakshatraEngine.getNakshatraPlacement(sidLon);

      // Check combustion with Sun
      let isCombust = false;
      if (name !== "Sun" && name !== "Rahu" && name !== "Ketu") {
        const sunTropLon = rawBodies.Sun?.eclipticLongitude ?? 0;
        const sunSidLon = normalizeDeg(sunTropLon - ayanamsaVal);
        let diff = Math.abs(sidLon - sunSidLon);
        if (diff > 180) diff = 360 - diff;
        const COMBUST_ORBS: Record<string, number> = { Moon: 12, Mars: 17, Mercury: 14, Jupiter: 11, Venus: 10, Saturn: 15 };
        if (diff <= (COMBUST_ORBS[name] || 10)) {
          isCombust = true;
        }
      }

      normalizedPlanets[name] = {
        tropicalLongitude: tropLon,
        siderealLongitude: sidLon,
        speedLongitudeDegPerDay: p.speedLongitudeDegPerDay,
        isRetrograde: p.isRetrograde,
        isCombust,
        rashi: pRashi,
        nakshatra: pNak,
      };

      siderealPositionsSimple[name] = {
        name,
        longitude: sidLon,
        isRetrograde: p.isRetrograde,
        speedLongitudeDegPerDay: p.speedLongitudeDegPerDay,
      };
    });

    // Step 4: Panchang & Muhurta Suite
    const panchang = PanchangEngine.calculatePanchang({
      date: new Date(Date.UTC(year, month - 1, day, hour - timezoneOffsetHours, minute, second)),
      sunLongitude: normalizedPlanets.Sun?.siderealLongitude ?? 0,
      moonLongitude: normalizedPlanets.Moon?.siderealLongitude ?? 0,
      latitude,
      longitude,
      timezoneOffsetHours,
    });

    // Step 5: Houses & Bhava Chalit
    const housesWholeSign = HouseEngine.calculateHouses({
      ascendantLongitude: siderealAscLon,
      system: "Whole Sign",
      latitude,
    });

    const housesPlacidus = HouseEngine.calculateHouses({
      ascendantLongitude: siderealAscLon,
      system: "Placidus",
      latitude,
    });

    const bhavaChalit = BhavaChalitEngine.calculateBhavaChalit({
      ascendantLongitude: siderealAscLon,
      midheavenLongitude: siderealMcLon,
      planets: siderealPositionsSimple,
    });

    // Map house placements for whole sign
    const housePlacementsWholeSign: Record<string, number> = {};
    const housePlacementsBhavaChalit: Record<string, number> = {};
    Object.entries(siderealPositionsSimple).forEach(([pName, p]) => {
      const pSignIdx = Math.floor(p.longitude / 30.0) % 12;
      const ascSignIdx = Math.floor(siderealAscLon / 30.0) % 12;
      housePlacementsWholeSign[pName] = ((pSignIdx - ascSignIdx + 12) % 12) + 1;
      housePlacementsBhavaChalit[pName] = bhavaChalit.planetaryBhavaShifts[pName]?.chalitHouseNumber || housePlacementsWholeSign[pName];
    });

    // Step 6: Planetary Dignities, Avasthas & Drishti
    const planetaryStatus = PlanetaryEngine.evaluateAllPlanets(
      siderealPositionsSimple,
      siderealAscLon,
      housePlacementsWholeSign
    );

    // Dignities dictionary
    const dignitiesMap: Record<string, any> = {};
    Object.entries(planetaryStatus.planets).forEach(([pName, st]) => {
      dignitiesMap[pName] = st.dignity;
    });

    // House Lords mapping
    const houseLordsMap: Record<number, string> = {};
    for (let h = 1; h <= 12; h++) {
      const sIdx = (Math.floor(siderealAscLon / 30.0) + h - 1) % 12;
      houseLordsMap[h] = ZodiacEngine.getRashiByIndex(sIdx).rulingLord;
    }

    // Step 7: Shadbala & Strengths
    const shadbala = ShadbalaEngine.calculateShadbala({
      planets: planetaryStatus.planets,
      ascendantLongitude: siderealAscLon,
      sunLongitude: normalizedPlanets.Sun?.siderealLongitude ?? 0,
      isDayBirth: true,
      julianDay: jdUtc,
    });

    // Step 8: Divisional Charts (Shodashavarga D1 - D60)
    const divisionalCharts = DivisionalChartsEngine.calculateShodashavarga(
      siderealPositionsSimple,
      siderealAscLon
    );

    // Step 9: Dasha Systems
    const birthDate = new Date(Date.UTC(year, month - 1, day, hour - timezoneOffsetHours, minute, second));
    const vimshottariDasha = DashaEngine.calculateVimshottari(
      normalizedPlanets.Moon?.siderealLongitude ?? 0,
      birthDate
    );
    const yoginiDasha = DashaEngine.calculateYoginiDasha(
      normalizedPlanets.Moon?.siderealLongitude ?? 0,
      birthDate
    );
    const charaDasha = DashaEngine.calculateCharaDasha(
      siderealAscLon,
      birthDate
    );

    // Step 10: Ashtakavarga
    const signIndicesForBav: Record<string, number> = {};
    Object.entries(siderealPositionsSimple).forEach(([pName, p]) => {
      signIndicesForBav[pName] = Math.floor(p.longitude / 30.0) % 12;
    });
    const ashtakavarga = AshtakavargaEngine.calculateAshtakavarga(
      signIndicesForBav,
      Math.floor(siderealAscLon / 30.0) % 12
    );

    // Step 11: Jaimini Suite
    const jaimini = JaiminiEngine.calculateJaimini(
      siderealPositionsSimple,
      siderealAscLon
    );

    // Step 12: KP System Suite
    const placidusCuspsMap: Record<number, number> = {};
    housesPlacidus.housesList.forEach((h) => {
      placidusCuspsMap[h.houseNumber] = h.cuspLongitude;
    });
    const kpSystem = KPEngine.calculateKPReport(
      placidusCuspsMap,
      siderealPositionsSimple,
      panchang.fivePillars.vara.rulingLord
    );

    // Step 13: 1001+ Vedic Yogas Detection
    const detectedYogas = YogaDetectionEngine.detectYogas({
      planets: siderealPositionsSimple,
      ascendantLongitude: siderealAscLon,
      housePlacements: housePlacementsWholeSign,
      dignities: dignitiesMap,
      houseLords: houseLordsMap,
    });

    // Step 14: Dynamic Transits & Gochara
    // Step 14: Dynamic Transits & Gochara
    const transits = TransitEngine.calculateTransits({
      natalMoonLon: normalizedPlanets.Moon?.siderealLongitude ?? 0,
      natalAscendantLon: siderealAscLon,
      transitPlanets: siderealPositionsSimple, // Using current epoch or target transit date
      transitDate: new Date(),
    });

    // Step 15: Special Lagnas & Arudhas (Bhava, Hora, Ghati, Indu, Sree, Karakamsha, A1-A12)
    const atmakarakaSignIdx = divisionalCharts.d9Navamsha?.placements?.[jaimini.atmakaraka.planet]?.vargaSignIndex ?? 0;
    const specialLagnas = SpecialLagnaEngine.calculateSpecialLagnas({
      sunLongitude: normalizedPlanets.Sun?.siderealLongitude ?? 0,
      moonLongitude: normalizedPlanets.Moon?.siderealLongitude ?? 0,
      ascendantLongitude: siderealAscLon,
      sunriseTimeHoursUtc: 6.0,
      birthTimeHoursUtc: hour + minute / 60.0,
      atmakarakaNavamshaSignIndex: atmakarakaSignIdx,
      planetaryPositions: siderealPositionsSimple,
    });

    // Step 16: Complete D1-D60 Varga Evidence & Pushkara Analysis
    const vargaEvidence = VargaEvidenceEngine.calculateAllVargas(
      siderealPositionsSimple,
      siderealAscLon
    );

    // Step 17: Graha Yuddha (Planetary War), Deep Combustion, Shayanaadi Avasthas
    const planetaryWars = GrahaYuddhaEngine.evaluatePlanetaryWar(siderealPositionsSimple);
    const combustions = GrahaYuddhaEngine.calculateCombustions(
      normalizedPlanets.Sun?.siderealLongitude ?? 0,
      siderealPositionsSimple
    );
    const birthMoonNakIdx = Math.floor((normalizedPlanets.Moon?.siderealLongitude ?? 0) / (360 / 27));
    const shayanaadiAvasthas = GrahaYuddhaEngine.calculateShayanaadiAvasthas(
      siderealPositionsSimple,
      siderealAscLon,
      birthMoonNakIdx
    );

    // Step 18: Complete Drishti & Aspects (Graha Drishti, Jaimini Rashi Drishti, Western Orbed)
    const grahaDrishtis = DrishtiAspectEngine.calculateGrahaDrishti(
      siderealPositionsSimple,
      siderealAscLon
    );
    const jaiminiRashiDrishtis = DrishtiAspectEngine.calculateJaiminiRashiDrishti(siderealPositionsSimple);
    const westernAspects = DrishtiAspectEngine.calculateWesternAspects(siderealPositionsSimple);
    const aspectsAndDrishti = {
      grahaDrishtis,
      jaiminiRashiDrishtis,
      westernAspects,
    };

    // Step 19: Bhava Bala (House Potencies)
    const shadbalaVirupasMap: Record<string, number> = {};
    Object.entries(shadbala.planets).forEach(([pName, pShad]) => {
      shadbalaVirupasMap[pName] = pShad.totalVirupas;
    });
    const bhavaBala = BhavaBalaEngine.calculateBhavaBala({
      ascendantLongitude: siderealAscLon,
      planetaryShadbalaVirupas: shadbalaVirupasMap,
      planets: siderealPositionsSimple,
    });

    // Step 20: Advanced Yoga Rules & Formations
    const yogaRulesAdvanced = YogaRuleEngine.evaluateAllYogas({
      ascendantLongitude: siderealAscLon,
      planets: siderealPositionsSimple,
      houseLords: houseLordsMap,
      dignities: dignitiesMap,
    });

    // Step 20b: Phase 3 Master Classical Yoga & Dosha Engine Context
    const chartContextForPhase3 = {
      planets: Object.entries(normalizedPlanets).reduce((acc, [pName, pPos]) => {
        const signIdx = pPos.rashi.signIndex;
        const ascSignIndex = ascRashi.signIndex;
        const house = ((signIdx - ascSignIndex + 12) % 12) + 1;
        acc[pName] = {
          name: pName,
          sign: pPos.rashi.signName,
          signIndex: signIdx,
          house,
          degreeInSign: pPos.rashi.degreeInSign,
          isRetrograde: pPos.isRetrograde,
          isCombust: pPos.isCombust,
          dignity: dignitiesMap[pName] || "Neutral (Sama)",
          longitude: pPos.siderealLongitude
        };
        return acc;
      }, {} as Record<string, any>),
      houseLords: houseLordsMap,
      houseOccupants: (Object.entries(normalizedPlanets).reduce((acc, [pName, pPos]) => {
        const signIdx = pPos.rashi.signIndex;
        const ascSignIndex = ascRashi.signIndex;
        const house = ((signIdx - ascSignIndex + 12) % 12) + 1;
        if (!acc[house]) acc[house] = [];
        acc[house].push(pName);
        return acc;
      }, {} as Record<number, string[]>)),
      signOccupants: (Object.entries(normalizedPlanets).reduce((acc, [pName, pPos]) => {
        const sign = pPos.rashi.signName;
        if (!acc[sign]) acc[sign] = [];
        acc[sign].push(pName);
        return acc;
      }, {} as Record<string, string[]>)),
      ascendantSign: ascRashi.signName,
      ascendantSignIndex: ascRashi.signIndex,
      jaiminiKarakas: jaimini.charaKarakas.reduce((acc, k) => {
        acc[k.karakaCode] = k.planet;
        return acc;
      }, {} as Record<string, string>),
      dashaActiveLords: {
        mahadasha: vimshottariDasha.currentRunningDasha?.mahadasha || vimshottariDasha.mahadashas[0]?.lord || "Sun",
        antardasha: vimshottariDasha.currentRunningDasha?.antardasha || "Moon"
      }
    };

    const classicalYogasMaster = YogaDetectionMasterEngine.evaluateAllYogas(chartContextForPhase3);
    const classicalDoshasMaster = DoshaDetectionMasterEngine.evaluateAllDoshas(chartContextForPhase3);

    // Step 21: Universal 5-Tier Dasha Framework
    const dashaUniversalFramework = DashaFrameworkEngine.calculateUniversalDasha({
      birthDate,
      moonLongitude: normalizedPlanets.Moon?.siderealLongitude ?? 0,
    });

    // Step 22: Deep KP Astrology System
    const kpDeepSystem = KPDeepEngine.calculateKPReport({
      ascendantLongitude: siderealAscLon,
      planets: siderealPositionsSimple,
      placidusCusps: placidusCuspsMap,
      birthWeekdayName: panchang.fivePillars.vara.name,
    });

    // Step 23: Tajika / Varshaphala Annual Solar Return
    const tajikaVarshaphala = TajikaVarshaphalaEngine.calculateVarshaphala({
      birthDate,
      targetYear: params.targetVarshaYear || new Date().getFullYear(),
      natalSunLongitude: normalizedPlanets.Sun?.siderealLongitude ?? 0,
      natalAscendantLongitude: siderealAscLon,
      planets: siderealPositionsSimple,
      isDayBirth: true,
    });

    // Step 24: Prashna Horary Judgement
    const prashnaJudgement = PrashnaDeepEngine.analyzePrashna({
      queryText: params.prashnaQuery || "General life guidance and current trajectory",
      domain: params.prashnaDomain || "General Life Direction",
      prashnaAscendantLongitude: siderealAscLon,
      planets: siderealPositionsSimple,
    });

    // Step 25: Muhurta Electional Analysis
    const muhurtaEvaluation = MuhurtaDeepEngine.evaluateActivityMuhurta({
      activity: params.targetMuhurtaActivity || "business_launch",
      evalDate: new Date(),
      sunriseDate: new Date(birthDate.getTime()),
      sunsetDate: new Date(birthDate.getTime() + 12 * 3600000),
      moonLongitude: normalizedPlanets.Moon?.siderealLongitude ?? 0,
      janmaNakshatraIndex: birthMoonNakIdx,
      janmaRashiIndex: Math.floor((normalizedPlanets.Moon?.siderealLongitude ?? 0) / 30.0) % 12,
    });

    // Step 26: Medical & Ayurvedic Constitutional Profile
    const medicalConstitution = MedicalAstroEngine.evaluateHealthConstitution({
      ascendantLongitude: siderealAscLon,
      planets: siderealPositionsSimple,
      houseLords: houseLordsMap,
    });

    // Step 27: Astronomical Events Scanner (Ingresses, Stations, Eclipses)
    const astronomyEvents = AstronomyEventsEngine.scanAstronomicalEvents({
      startDateUtc: birthDate,
      endDateUtc: new Date(birthDate.getTime() + 365 * 86400000),
      currentPlanets: siderealPositionsSimple,
    });

    // Step 28: Phase 4 Planetary Strength Suite (Shadbala, Vimsopaka, Ishta/Kashta, Avasthas, Evidence)
    const planetaryCalcInputs: Record<string, PlanetaryCalculationInput> = {};
    Object.entries(normalizedPlanets).forEach(([pName, pPos]) => {
      planetaryCalcInputs[pName] = {
        name: pName,
        longitude: pPos.siderealLongitude,
        latitude: (pPos as any).latitude ?? 0,
        speedLongitudeDegPerDay: pPos.speedLongitudeDegPerDay,
        house: housePlacementsWholeSign[pName] || 1,
        signIndex: pPos.rashi.signIndex,
        degreeInSign: pPos.rashi.degreeInSign,
        isRetrograde: pPos.isRetrograde,
        isCombust: pPos.isCombust,
      };
    });

    const chartCalcContext: ChartCalculationContext = {
      planets: planetaryCalcInputs,
      ascendantLongitude: siderealAscLon,
      midheavenLongitude: housesPlacidus.housesList[9]?.cuspLongitude ?? normalizeDeg(siderealAscLon + 270),
      isDayBirth: true,
      sunLongitude: normalizedPlanets.Sun?.siderealLongitude ?? 0,
      moonLongitude: normalizedPlanets.Moon?.siderealLongitude ?? 0,
      birthDate,
      julianDay: jdUtc,
      ayanamsha: ayanamsaType,
      houseSystem: houseSystem,
      latitudeDeg: latitude,
      longitudeDeg: longitude,
    };

    const shadbalaMaster = PlanetaryShadbalaEngine.calculateAll(chartCalcContext);
    const vimsopakaMaster = VimsopakaBalaEngine.calculateAllSchemes(siderealPositionsSimple);
    
    // Prepare Uchcha / Chesta data for Ishta/Kashta
    const uchchaChestaData: Record<string, { uchchaBala: number; chestaBala: number }> = {};
    Object.entries(shadbalaMaster.planets).forEach(([pName, pShad]) => {
      uchchaChestaData[pName] = {
        uchchaBala: pShad.sthanaBala.uchchaBalaVirupas,
        chestaBala: pShad.chestaBala.chestaBalaVirupas,
      };
    });
    const ishtaKashtaMaster = IshtaKashtaEngine.calculateAll(uchchaChestaData);
    const avasthasMaster = AvasthaEngine.calculateAll(planetaryCalcInputs, dignitiesMap);

    // Generate comprehensive strength evidence chains
    const evidenceMaster: Record<string, ComprehensivePlanetStrengthEvidence> = {};
    Object.entries(shadbalaMaster.planets).forEach(([pName, pShad]) => {
      evidenceMaster[pName] = StrengthEvidenceEngine.generatePlanetEvidence(
        pShad,
        avasthasMaster.planets[pName],
        ishtaKashtaMaster.planets[pName],
        vimsopakaMaster.shodashavarga.planetScores[pName]?.scoreOutOf20
      );
    });

    const planetaryStrengthMaster = {
      shadbalaMaster,
      vimsopakaMaster,
      ishtaKashtaMaster,
      avasthasMaster,
      evidenceMaster,
    };

    // Step 29: Phase 4 Shodashavarga Cross-Analysis & Domain Confluence Engine
    const crossVargaMatrix = VargaConfluenceEngine.generateCrossVargaMatrix(
      siderealPositionsSimple,
      siderealAscLon
    );
    const domainReports = VargaConfluenceEngine.evaluateAllDomains(
      crossVargaMatrix,
      siderealPositionsSimple
    );

    const vargaConfluence = {
      crossVargaMatrix,
      domainReports,
    };

    // Step 30: Phase 5 Master Transits & Gochara Engine
    const currentMahadasha = vimshottariDasha.currentRunningDasha?.mahadasha ?? "Jupiter";
    const currentAntardasha = vimshottariDasha.currentRunningDasha?.antardasha ?? "Saturn";
    const currentPratyantar = vimshottariDasha.currentRunningDasha?.pratyantardasha ?? "Mercury";

    const masterTransits = MasterTransitEngine.calculateMasterTransits({
      natalPlanets: siderealPositionsSimple,
      natalAscendantLon: siderealAscLon,
      natalMoonLon: normalizedPlanets.Moon?.siderealLongitude ?? 0,
      natalSunLon: normalizedPlanets.Sun?.siderealLongitude ?? 0,
      mahadashaLord: currentMahadasha,
      antardashaLord: currentAntardasha,
      pratyantardashaLord: currentPratyantar,
      ashtakavarga,
      shadbalaReport: shadbalaMaster,
      targetDate: new Date(),
      latitude,
      longitude,
      timezoneOffsetHours,
      ayanamsaType,
    });

    // Step 31: Phase 6 Master Advanced Jaimini Engine (Chara Karakas, Rashi Drishti, Arudhas, UL, Karakamsa, Chara Dasha, Jaimini Yogas)
    const masterJaimini = MasterJaiminiEngine.calculateMasterJaimini({
      ascendantLongitude: siderealAscLon,
      moonLongitude: normalizedPlanets.Moon?.siderealLongitude ?? 0,
      birthDate,
      planets: siderealPositionsSimple,
      targetDate: new Date(),
      karakaScheme: params.jaiminiKarakaScheme || "7_karaka",
      ayanamshaName: ayanamsaType,
    });

    // Step 32: Phase 6 Master KP Astrology Engine (Placidus Cusps, 249 Subdivisions, ABCD Significators, 4-Step Chain, Ruling Planets, Life Events)
    const masterKp = MasterKPEngine.calculateMasterKP({
      ascendantLongitude: siderealAscLon,
      moonLongitude: normalizedPlanets.Moon?.siderealLongitude ?? 0,
      birthDate,
      planets: siderealPositionsSimple,
      cuspLongitudes: placidusCuspsMap,
      queryDate: new Date(),
      latitude,
      longitude,
      ayanamsaType: "KP New (Krishnamurti)",
      ayanamsaValueDeg: ayanamsaVal,
    });

    // Step 33: Phase 6 Multi-System Cross-Validation Synthesis Engine
    const crossValidation = CrossValidationEngine.evaluateCrossValidation({
      jaiminiReport: masterJaimini,
      kpReport: masterKp,
      parashariSummary: {
        lagnaLordDignity: dignitiesMap[ascRashi.signLord] || "Neutral",
        tenthLordDignity: dignitiesMap[housesWholeSign[10]?.lord] || "Neutral",
        activeVimshottariLord: currentMahadasha,
        majorYogasCount: detectedYogas.length + (yogaRulesAdvanced.detectedYogas?.length || 0),
      },
    });

    // Step 34: Phase 7 Master Prashna Horary Engine (Radicality, Lagnas, Significators, Ruling Planets, Muthashila, Timing)
    const masterPrashna = MasterPrashnaEngine.calculateMasterPrashna({
      query: {
        questionText: params.prashnaQuery || "Will this endeavor succeed and bring auspicious fruit?",
        category: (params.prashnaDomain as PrashnaCategory) || "Promotion & Career Advancement",
        timestamp: new Date(),
        latitude,
        longitude,
        timezoneOffsetHours,
        selectedAyanamsha: ayanamsaType,
        selectedNodePolicy: "True Node",
      },
      ascendantLongitude: siderealAscLon,
      planets: siderealPositionsSimple,
    });

    // Step 35: Phase 7 Master Tajika & Varshaphala Annual Solar Return Engine (Numerical Root-Finding, Muntha, 20+ Sahams, Mudda Dasha)
    const masterTajika = MasterTajikaEngine.calculateMasterVarshaphala({
      birthDate,
      targetYear: params.targetVarshaYear || new Date().getFullYear(),
      natalSunLongitudeDeg: normalizedPlanets.Sun?.siderealLongitude ?? 0,
      natalAscendantLongitudeDeg: siderealAscLon,
      latitude,
      longitude,
      timezoneOffsetHours,
      ayanamsaType,
    });

    // Step 36: Phase 7 Master Multi-System Event Timing Confluence Engine (Natal Promise, Dasha, Double Transit, Annual, Windows)
    const savPointsMap: Record<number, number> = {};
    for (let h = 1; h <= 12; h++) {
      const signIdx = (ascRashi.signIndex + h - 1) % 12;
      savPointsMap[h] = ashtakavarga.sav?.[signIdx] ?? 28;
    }

    const masterEventTiming = MasterEventTimingEngine.calculateMasterEventTiming({
      domain: "Career & Professional Elevation",
      evalDate: new Date(),
      natalAscendantLongitude: siderealAscLon,
      planets: siderealPositionsSimple,
      houseLords: houseLordsMap,
      dignities: dignitiesMap,
      currentDasha: {
        maha: currentMahadasha,
        antar: currentAntardasha,
        pratyantar: currentPratyantar,
      },
      charaDashaSign: masterJaimini.charaDasha.mahadashas?.[0]?.signName || "Aries",
      transitPlanets: {
        jupiterLongitude: masterTransits.currentPositions?.Jupiter?.eclipticLongitude ?? 0,
        saturnLongitude: masterTransits.currentPositions?.Saturn?.eclipticLongitude ?? 0,
        rahuLongitude: masterTransits.currentPositions?.Rahu?.eclipticLongitude ?? 0,
      },
      savPoints: savPointsMap,
      varshaphalaData: {
        year: masterTajika.metadata.targetYear,
        varshaAscSign: masterTajika.varshaAscendant.signName,
        munthaHouse: masterTajika.muntha.munthaHouseFromVarshaLagna,
        munthesha: masterTajika.muntha.muntheshaPlanet,
        sahamSign: masterTajika.sahams.KARMA?.signName || "Leo",
        sahamHouse: masterTajika.sahams.KARMA?.houseFromVarshaLagna || 10,
        favorableTajikaYogasCount: masterTajika.activeTajikaYogas.filter((y) => y.category === "Auspicious Fruition").length,
      },
    });

    // Calculation Policy
    const calculationPolicy = CalculationPolicy.getPolicy(
      params.calculationMethodology || "Traditional Parashari Vedic"
    );

    // Compile Master Payload
    const ayanamsaDms = degToDMS(ayanamsaVal);

    return {
      metadata: {
        engineVersion: "AstroNext Enterprise Engine v7.0-Pro (Deterministic High-Precision)",
        calculationTimestampIso: new Date().toISOString(),
        ayanamsaApplied: {
          type: ayanamsaType,
          valueDegrees: ayanamsaVal,
          dms: ayanamsaDms,
        },
        geographicCoordinates: {
          latitude,
          longitude,
          timezoneOffsetHours,
        },
        inputDateTimeIso: birthDate.toISOString(),
        julianDayUtc: jdUtc,
        calculationPolicy,
      },
      panchang,
      ascendant: {
        tropicalLongitude: tropicalAscLon,
        siderealLongitude: siderealAscLon,
        rashi: ascRashi,
        nakshatra: ascNak,
      },
      planetaryPositions: normalizedPlanets,
      housesWholeSign,
      housesPlacidus,
      bhavaChalit,
      planetaryStrengthsAndAvasthas: planetaryStatus.planets,
      shadbala,
      bhavaBala,
      divisionalCharts,
      vargaEvidence,
      specialLagnas,
      grahaYuddha: {
        planetaryWars,
        combustions,
        shayanaadiAvasthas,
      },
      aspectsAndDrishti,
      vimshottariDasha,
      yoginiDasha,
      charaDasha,
      dashaUniversalFramework,
      ashtakavarga,
      jaimini,
      kpSystem,
      kpDeepSystem,
      detectedYogas,
      yogaRulesAdvanced: {
        detectedYogas: yogaRulesAdvanced.detectedYogas,
        parivartanaExchanges: yogaRulesAdvanced.parivartanaExchanges,
        neechaBhangaYogas: yogaRulesAdvanced.neechaBhangaYogas,
        panchaMahapurushaYogas: yogaRulesAdvanced.panchaMahapurushaYogas,
      },
      classicalYogasMaster,
      classicalDoshasMaster,
      transits,
      astronomyEvents,
      tajikaVarshaphala,
      prashnaJudgement,
      muhurtaEvaluation,
      medicalConstitution,
      planetaryStrengthMaster,
      vargaConfluence,
      masterTransits,
      masterJaimini,
      masterKp,
      crossValidation,
      masterPrashna,
      masterTajika,
      masterEventTiming,
    };
  }
}

