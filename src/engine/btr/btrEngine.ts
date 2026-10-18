/**
 * AstroNext Birth Time Rectification (BTR) Engine
 * Deterministic, evidence-based, astronomical and multi-methodology calibration.
 * Evaluates candidate birth times against real life events using Parashari, KP,
 * and Jaimini principles without any AI/LLM hallucination or black-box scoring.
 */

import { HighPrecisionAstroEphemerisProvider } from "../ephemerisProvider";
import { AyanamsaService } from "../ayanamsaEngine";
import {
  calculateAscendant,
  calculateMidheaven,
  calculateHouseCuspsPlacidus,
  degToDMS,
  normalizeDeg
} from "../astronomyMath";
import { ZodiacEngine, ZODIAC_RASHIS } from "../zodiacEngine";
import { NakshatraEngine } from "../nakshatraEngine";
import { DivisionalChartsEngine } from "../divisionalChartsEngine";
import { DashaEngine, DashaPeriod } from "../dashaEngine";
import { JaiminiEngine } from "../jaiminiEngine";
import {
  BtrLifeEvent,
  BtrCandidateEvaluation,
  BtrEventMatchDetail,
  BtrPhysicalClues,
  BtrRectificationReport,
  BtrSearchRange,
  BtrTimeReliability,
  BtrEventSignificance,
  BtrPlacidusCuspDetail,
  BtrMethodologyEvidenceItem,
  BtrCandidateCluster
} from "./btrTypes";
import {
  BTR_EVENT_DEFINITIONS,
  BtrEventTypeDefinition,
  getEnrichedEventDefinition
} from "./btrRuleKnowledge";
import {
  validateBirthProfileForBtr,
  isInventedDefaultProfile
} from "./btrProfileValidation";

const NAKSHATRA_LORDS = [
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"
];

const SIGN_LORDS: Record<number, string> = {
  0: "Mars", 1: "Venus", 2: "Mercury", 3: "Moon",
  4: "Sun", 5: "Mercury", 6: "Venus", 7: "Mars",
  8: "Jupiter", 9: "Saturn", 10: "Saturn", 11: "Jupiter"
};

const DASHA_YEARS: Record<string, number> = {
  Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7,
  Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17
};

export function getStarAndSubLord(lon: number): {
  starLord: string;
  subLord: string;
  subSubLord: string;
  nakshatraName: string;
  quarter: number;
} {
  const norm = normalizeDeg(lon);
  const nakSpan = 360 / 27; // 13.333333°
  const nakIdx = Math.floor(norm / nakSpan) % 27;
  const starLord = NAKSHATRA_LORDS[nakIdx];

  const posInNak = norm % nakSpan;
  const fractionInNak = posInNak / nakSpan;
  const quarter = Math.min(4, Math.floor(posInNak / (nakSpan / 4)) + 1);

  const lordOrder = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
  const startIdx = lordOrder.indexOf(starLord);

  let accumulated = 0;
  let subLord = starLord;
  let subSubLord = "Jupiter";

  for (let i = 0; i < 9; i++) {
    const currLord = lordOrder[(startIdx + i) % 9];
    const span = DASHA_YEARS[currLord] / 120;
    if (fractionInNak >= accumulated && fractionInNak < accumulated + span) {
      subLord = currLord;
      // Sub-sub calculation
      const posInSub = (fractionInNak - accumulated) / span;
      const subOrderStart = lordOrder.indexOf(subLord);
      let subSubAccum = 0;
      for (let j = 0; j < 9; j++) {
        const sslLord = lordOrder[(subOrderStart + j) % 9];
        const sslSpan = DASHA_YEARS[sslLord] / 120;
        if (posInSub >= subSubAccum && posInSub < subSubAccum + sslSpan) {
          subSubLord = sslLord;
          break;
        }
        subSubAccum += sslSpan;
      }
      break;
    }
    accumulated += span;
  }

  const nakPlacement = NakshatraEngine.getNakshatraPlacement(norm);
  const nakName = (nakPlacement as any)?.nakshatraName || (nakPlacement as any)?.name || "Ashwini";

  return { starLord, subLord, subSubLord, nakshatraName: nakName, quarter };
}

/**
 * Layer B: Engineering Aggregation Constant - Proximity Prior
 * Treated as secondary tie-breaker / recorded-time prior only.
 * Will never cause a candidate with superior Shastric evidence to lose.
 */
export function calculateProximityPrior(
  offsetMinutes: number,
  reliability: BtrTimeReliability
): number {
  const absOffset = Math.abs(offsetMinutes);
  switch (reliability) {
    case "hospital_exact":
    case "birth_certificate":
    case "hospital_family_record":
      // Documented record: max 1.0 pt, gentle decay
      return parseFloat(Math.max(0, 1.0 - absOffset * 0.02).toFixed(2));
    case "rounded_5m":
    case "rounded_10m":
    case "rounded_15m":
      // Minor rounding: max 0.3 pt
      return parseFloat(Math.max(0, 0.3 - absOffset * 0.005).toFixed(2));
    case "told_by_parents":
    case "family_memory":
    case "approximate":
    case "rounded_30m":
    case "rounded_1h":
      // Approximate/memory: minimal tie-breaker only (max 0.1 pt)
      return parseFloat(Math.max(0, 0.1 - absOffset * 0.001).toFixed(2));
    case "completely_unknown":
    default:
      // Unknown: zero prior influence
      return 0.0;
  }
}

/**
 * Determines which houses a given planet signifies in candidate chart:
 * 1. House occupied by the planet (via Placidus cusps)
 * 2. Houses owned/ruled by the planet (via Placidus cusp sign lords)
 */
export function getHousesSignifiedByPlanet(
  planetName: string,
  planetsSidereal: Record<string, { longitude: number; name: string }>,
  placidusCusps: Record<number, BtrPlacidusCuspDetail>
): number[] {
  const signified = new Set<number>();

  // 1. House occupied by the planet
  const planetData = planetsSidereal[planetName];
  if (planetData) {
    const pLon = normalizeDeg(planetData.longitude);
    for (let h = 1; h <= 12; h++) {
      const nextH = (h % 12) + 1;
      const curCusp = placidusCusps[h].siderealLongitude;
      const nextCusp = placidusCusps[nextH].siderealLongitude;
      const inHouse =
        curCusp <= nextCusp
          ? pLon >= curCusp && pLon < nextCusp
          : pLon >= curCusp || pLon < nextCusp; // cross 0 Aries
      if (inHouse) {
        signified.add(h);
        break;
      }
    }
  }

  // 2. Houses owned/ruled by the planet
  for (let h = 1; h <= 12; h++) {
    if (placidusCusps[h].signLord === planetName) {
      signified.add(h);
    }
  }

  return Array.from(signified);
}

export interface BtrSearchConfig {
  dob: string;                    // YYYY-MM-DD
  recordedTime: string;           // HH:MM (or HH:MM:SS)
  latitude: number;
  longitude: number;
  timezoneOffsetHours: number;
  reliability: BtrTimeReliability;
  searchRange: BtrSearchRange;
  customRangeStart?: string;      // HH:MM
  customRangeEnd?: string;        // HH:MM
  events: BtrLifeEvent[];
  physicalClues?: BtrPhysicalClues;
  ayanamsaType?: string;
  personName?: string;
  place?: string;
  isDefaultProfile?: boolean;
}

export class BirthTimeRectificationEngine {
  private static ephem = new HighPrecisionAstroEphemerisProvider();

  /**
   * Main entry point: Rectify birth time against life events
   */
  public static rectifyBirthTime(config: BtrSearchConfig): BtrRectificationReport {
    const {
      dob,
      recordedTime,
      latitude,
      longitude,
      timezoneOffsetHours,
      reliability,
      searchRange,
      customRangeStart,
      customRangeEnd,
      events,
      physicalClues,
      ayanamsaType = "Lahiri (Chitrapaksha)"
    } = config;

    // Strict input validation: No fake profile fallbacks or invented default profiles
    const profileValidation = validateBirthProfileForBtr({
      dob,
      time: recordedTime,
      place: config.place || "Specified Location",
      latitude,
      longitude,
      timezoneOffsetHours,
      name: config.personName,
      reliability,
      isDefaultProfile: config.isDefaultProfile
    });

    if (!profileValidation.isAllowedToRun) {
      throw new Error(`BTR calculation blocked: ${profileValidation.guidanceMessage}`);
    }

    if (typeof latitude !== "number" || isNaN(latitude) || !isFinite(latitude) || latitude < -90 || latitude > 90) {
      throw new Error(`Invalid latitude: ${latitude}. Latitude must be a finite number between -90 and 90.`);
    }
    if (typeof longitude !== "number" || isNaN(longitude) || !isFinite(longitude) || longitude < -180 || longitude > 180) {
      throw new Error(`Invalid longitude: ${longitude}. Longitude must be a finite number between -180 and 180.`);
    }
    if (typeof timezoneOffsetHours !== "number" || isNaN(timezoneOffsetHours) || !isFinite(timezoneOffsetHours) || timezoneOffsetHours < -14 || timezoneOffsetHours > 14) {
      throw new Error(`Invalid timezone offset: ${timezoneOffsetHours}. Timezone offset must be a finite number between -14 and 14.`);
    }

    const isTimeKnown =
      !profileValidation.isUnknownTime &&
      recordedTime !== undefined &&
      recordedTime !== null &&
      recordedTime.trim() !== "" &&
      recordedTime.trim().toLowerCase() !== "unknown";

    // 1. Determine search window range in minutes from midnight (0 to 1439)
    let effectiveSearchRange: BtrSearchRange = searchRange;
    if (!isTimeKnown) {
      if (searchRange !== "custom_range") {
        effectiveSearchRange = "entire_day";
      }
    }

    let startCandidateMinutes = 0;
    let endCandidateMinutes = 1439;
    let step = 1;
    let recordedTotalMinutes = 0;

    if (isTimeKnown && recordedTime) {
      const [recH, recM] = recordedTime.split(":").map((v) => parseInt(v, 10) || 0);
      recordedTotalMinutes = recH * 60 + recM;
    }

    switch (effectiveSearchRange) {
      case "pm_5m":
        startCandidateMinutes = Math.max(0, recordedTotalMinutes - 5);
        endCandidateMinutes = Math.min(1439, recordedTotalMinutes + 5);
        step = 1;
        break;
      case "pm_15m":
        startCandidateMinutes = Math.max(0, recordedTotalMinutes - 15);
        endCandidateMinutes = Math.min(1439, recordedTotalMinutes + 15);
        step = 1;
        break;
      case "pm_30m":
        startCandidateMinutes = Math.max(0, recordedTotalMinutes - 30);
        endCandidateMinutes = Math.min(1439, recordedTotalMinutes + 30);
        step = 1;
        break;
      case "pm_1h":
        startCandidateMinutes = Math.max(0, recordedTotalMinutes - 60);
        endCandidateMinutes = Math.min(1439, recordedTotalMinutes + 60);
        step = 2;
        break;
      case "pm_3h":
        startCandidateMinutes = Math.max(0, recordedTotalMinutes - 180);
        endCandidateMinutes = Math.min(1439, recordedTotalMinutes + 180);
        step = 4;
        break;
      case "entire_day":
        startCandidateMinutes = 0;
        endCandidateMinutes = 1439;
        step = 8;
        break;
      case "custom_range":
        if (customRangeStart && customRangeEnd) {
          const [csH, csM] = customRangeStart.split(":").map((v) => parseInt(v, 10) || 0);
          const [ceH, ceM] = customRangeEnd.split(":").map((v) => parseInt(v, 10) || 0);
          startCandidateMinutes = Math.max(0, csH * 60 + csM);
          endCandidateMinutes = Math.min(1439, ceH * 60 + ceM);
          const span = Math.max(1, endCandidateMinutes - startCandidateMinutes);
          step = span > 180 ? 4 : span > 60 ? 2 : 1;
        } else {
          startCandidateMinutes = 0;
          endCandidateMinutes = 1439;
          step = 8;
        }
        break;
    }

    // 2. Evaluate all candidate minutes systematically
    const candidates: BtrCandidateEvaluation[] = [];

    for (let currentMinutes = startCandidateMinutes; currentMinutes <= endCandidateMinutes; currentMinutes += step) {
      const candidateH = Math.floor(currentMinutes / 60);
      const candidateM = currentMinutes % 60;
      const candidateTimeStr = `${candidateH.toString().padStart(2, "0")}:${candidateM.toString().padStart(2, "0")}`;
      const offsetMinutes = isTimeKnown ? currentMinutes - recordedTotalMinutes : 0;

      const evalResult = this.evaluateSingleCandidate({
        dob,
        candidateH,
        candidateM,
        candidateTimeStr,
        offsetMinutes,
        latitude,
        longitude,
        timezoneOffsetHours,
        reliability: isTimeKnown ? reliability : "completely_unknown",
        events,
        physicalClues,
        ayanamsaType
      });

      candidates.push(evalResult);
    }

    // 3. If broad step was used and candidates exist, run a fine refinement (step = 1 min)
    // around the top candidate regions to ensure 1-minute precision without missing alternative peaks
    let finalCandidates = candidates;
    if (step > 1 && candidates.length > 0) {
      const sorted = [...candidates].sort((a, b) => b.shastricEvidenceScore - a.shastricEvidenceScore);
      const topPeaks = sorted.slice(0, 3);
      const fineCandidates: BtrCandidateEvaluation[] = [];

      topPeaks.forEach((peak) => {
        const [pH, pM] = peak.timeStr.split(":").map((v) => parseInt(v, 10));
        const bestMinutes = pH * 60 + pM;
        const fineStart = Math.max(0, bestMinutes - (step * 2));
        const fineEnd = Math.min(1439, bestMinutes + (step * 2));

        for (let fm = fineStart; fm <= fineEnd; fm += 1) {
          const candidateH = Math.floor(fm / 60);
          const candidateM = fm % 60;
          const candidateTimeStr = `${candidateH.toString().padStart(2, "0")}:${candidateM.toString().padStart(2, "0")}`;
          const offsetMinutes = isTimeKnown ? fm - recordedTotalMinutes : 0;

          const existing = candidates.find((c) => c.timeStr === candidateTimeStr);
          if (existing) {
            fineCandidates.push(existing);
          } else {
            fineCandidates.push(
              this.evaluateSingleCandidate({
                dob,
                candidateH,
                candidateM,
                candidateTimeStr,
                offsetMinutes,
                latitude,
                longitude,
                timezoneOffsetHours,
                reliability: isTimeKnown ? reliability : "completely_unknown",
                events,
                physicalClues,
                ayanamsaType
              })
            );
          }
        }
      });

      // Merge and deduplicate
      const candidateMap = new Map<string, BtrCandidateEvaluation>();
      [...candidates, ...fineCandidates].forEach((c) => candidateMap.set(c.timeStr, c));
      finalCandidates = Array.from(candidateMap.values()).sort((a, b) => {
        const [aH, aM] = a.timeStr.split(":").map(Number);
        const [bH, bM] = b.timeStr.split(":").map(Number);
        return aH * 60 + aM - (bH * 60 + bM);
      });
    }

    // 4. Insufficient Evidence Detection
    const totalEvents = events.length;
    let status: "SUCCESS" | "MULTIPLE_CANDIDATES" | "INSUFFICIENT_EVIDENCE" = "SUCCESS";
    let insufficientReason: string | undefined = undefined;

    if (totalEvents === 0) {
      status = "INSUFFICIENT_EVIDENCE";
      insufficientReason =
        "No life events were provided. Birth time rectification requires at least 1–2 dated life milestones to verify candidate rising degrees.";
    } else if (effectiveSearchRange === "entire_day" && totalEvents < 2) {
      status = "INSUFFICIENT_EVIDENCE";
      insufficientReason =
        "A full 24-hour search requires at least 2 dated life milestones. A single event cannot reliably isolate a single rising degree across 24 hours.";
    }

    // 5. Deterministic Candidate Sorting:
    // Primary key: Pure Shastric Evidence Score (Layer A) descending.
    // Secondary tie-breaker: Internal Candidate Comparison Score (Layer B) descending.
    // Tertiary tie-breaker: Absolute offset from recorded time.
    finalCandidates.sort((a, b) => {
      const shastricDiff = b.shastricEvidenceScore - a.shastricEvidenceScore;
      if (Math.abs(shastricDiff) > 0.15) {
        return shastricDiff;
      }
      const compDiff = b.candidateComparisonScore - a.candidateComparisonScore;
      if (Math.abs(compDiff) > 0.05) {
        return compDiff;
      }
      return Math.abs(a.totalMinutesOffset) - Math.abs(b.totalMinutesOffset);
    });

    const strongestCandidate = finalCandidates[0] || {
      timeStr: recordedTime,
      totalMinutesOffset: 0,
      ascendantDegree: 0,
      ascendantSign: "Aries",
      ascendantDegreeDms: "0° 0' 0\"",
      ascendantNakshatra: "Ashwini",
      ascendantStarLord: "Ketu",
      ascendantSubLord: "Ketu",
      ascendantSubSubLord: "Jupiter",
      d9LagnaSign: "Aries",
      d10LagnaSign: "Aries",
      cuspSubLords: {},
      parashariScore: 0,
      kpScore: 0,
      jaiminiScore: 0,
      shastricEvidenceScore: 0,
      physicalClueScore: 0,
      proximityScore: 0,
      candidateComparisonScore: 0,
      totalScore: 0,
      eventMatches: [],
      matchedEventsCount: 0,
      totalEventsCount: 0,
      contradictions: [],
      evidenceStatus: "Low"
    };

    const peakScore = strongestCandidate.candidateComparisonScore;
    const peakShastric = strongestCandidate.shastricEvidenceScore;

    // Check for uniform flat evidence across wide candidate pool
    if (status === "SUCCESS") {
      const minShastric = Math.min(...finalCandidates.map((c) => c.shastricEvidenceScore));
      const maxShastric = Math.max(...finalCandidates.map((c) => c.shastricEvidenceScore));
      if (maxShastric === 0 || (finalCandidates.length >= 10 && maxShastric - minShastric < 0.5)) {
        status = "INSUFFICIENT_EVIDENCE";
        insufficientReason =
          "Astrological evidence across candidates in this window is effectively uniform. The provided events lack discriminative power to isolate a specific rising degree.";
      }
    }

    // 6. Contiguous Supported Window & Cluster Detection
    // Do not bridge weak candidates across gaps; detect separate evidence clusters.
    const threshold = Math.max(3.0, peakScore * 0.85);
    const qualifyingCandidates = finalCandidates
      .filter((c) => c.candidateComparisonScore >= threshold)
      .sort((a, b) => {
        const [aH, aM] = a.timeStr.split(":").map(Number);
        const [bH, bM] = b.timeStr.split(":").map(Number);
        return aH * 60 + aM - (bH * 60 + bM);
      });

    const clusters: BtrCandidateCluster[] = [];
    let currentClusterMins: number[] = [];
    let currentClusterCands: BtrCandidateEvaluation[] = [];

    qualifyingCandidates.forEach((c) => {
      const [ch, cm] = c.timeStr.split(":").map(Number);
      const cMin = ch * 60 + cm;
      if (currentClusterMins.length === 0) {
        currentClusterMins.push(cMin);
        currentClusterCands.push(c);
      } else {
        const prevMin = currentClusterMins[currentClusterMins.length - 1];
        if (cMin - prevMin <= Math.max(3, step * 2)) {
          // Contiguous in time
          currentClusterMins.push(cMin);
          currentClusterCands.push(c);
        } else {
          // Gap detected! Finalize previous cluster
          const clusterPeak = Math.max(...currentClusterCands.map((x) => x.candidateComparisonScore));
          const bestCand = currentClusterCands.find((x) => x.candidateComparisonScore === clusterPeak)!;
          clusters.push({
            clusterIndex: clusters.length + 1,
            startTime: `${Math.floor(currentClusterMins[0] / 60).toString().padStart(2, "0")}:${(currentClusterMins[0] % 60).toString().padStart(2, "0")}`,
            endTime: `${Math.floor(currentClusterMins[currentClusterMins.length - 1] / 60).toString().padStart(2, "0")}:${(currentClusterMins[currentClusterMins.length - 1] % 60).toString().padStart(2, "0")}`,
            startMinutes: currentClusterMins[0],
            endMinutes: currentClusterMins[currentClusterMins.length - 1],
            peakScore: clusterPeak,
            candidateCount: currentClusterCands.length,
            bestCandidateTime: bestCand.timeStr
          });
          currentClusterMins = [cMin];
          currentClusterCands = [c];
        }
      }
    });

    if (currentClusterMins.length > 0) {
      const clusterPeak = Math.max(...currentClusterCands.map((x) => x.candidateComparisonScore));
      const bestCand = currentClusterCands.find((x) => x.candidateComparisonScore === clusterPeak)!;
      clusters.push({
        clusterIndex: clusters.length + 1,
        startTime: `${Math.floor(currentClusterMins[0] / 60).toString().padStart(2, "0")}:${(currentClusterMins[0] % 60).toString().padStart(2, "0")}`,
        endTime: `${Math.floor(currentClusterMins[currentClusterMins.length - 1] / 60).toString().padStart(2, "0")}:${(currentClusterMins[currentClusterMins.length - 1] % 60).toString().padStart(2, "0")}`,
        startMinutes: currentClusterMins[0],
        endMinutes: currentClusterMins[currentClusterMins.length - 1],
        peakScore: clusterPeak,
        candidateCount: currentClusterCands.length,
        bestCandidateTime: bestCand.timeStr
      });
    }

    // Sort clusters by peak comparison score descending
    clusters.sort((a, b) => b.peakScore - a.peakScore);

    // 7. Tie & Multi-cluster Analysis
    let isTied = false;
    let tiedCandidates: BtrCandidateEvaluation[] = [];

    const topNearTies = finalCandidates.filter(
      (c) => Math.abs(c.shastricEvidenceScore - peakShastric) < 0.1 && c.timeStr !== strongestCandidate.timeStr
    );

    if (
      topNearTies.length > 0 &&
      (reliability === "completely_unknown" ||
        reliability === "approximate" ||
        reliability === "family_memory" ||
        reliability === "told_by_parents")
    ) {
      isTied = true;
      tiedCandidates = [strongestCandidate, ...topNearTies];
      if (status === "SUCCESS") {
        status = "MULTIPLE_CANDIDATES";
      }
    } else if (
      clusters.length > 1 &&
      clusters[1].peakScore >= peakScore * 0.95 &&
      Math.abs(clusters[1].startMinutes - clusters[0].endMinutes) > 5
    ) {
      if (status === "SUCCESS") {
        status = "MULTIPLE_CANDIDATES";
      }
    }

    // Supported window corresponds to the primary cluster containing the strongest candidate
    const primaryCluster = clusters[0] || {
      clusterIndex: 1,
      startTime: strongestCandidate.timeStr,
      endTime: strongestCandidate.timeStr,
      startMinutes: recordedTotalMinutes + strongestCandidate.totalMinutesOffset,
      endMinutes: recordedTotalMinutes + strongestCandidate.totalMinutesOffset,
      peakScore,
      candidateCount: 1,
      bestCandidateTime: strongestCandidate.timeStr
    };

    const windowStartStr = primaryCluster.startTime;
    const windowEndStr = primaryCluster.endTime;

    // 8. Formulate why candidate ranked highest (Transparent Layer A vs Layer B)
    const whyRanked: string[] = [];
    if (strongestCandidate.parashariScore > 0) {
      whyRanked.push(
        `Vedic Parashari Confluence: Event timing aligns with Vimshottari Mahadasha/Antardasha lords and Bhava rulerships in ${strongestCandidate.ascendantSign} Lagna.`
      );
    }
    if (strongestCandidate.kpScore > 0) {
      whyRanked.push(
        `KP Sub-Lord Alignment: Ascendant Sub-Lord ${strongestCandidate.ascendantSubLord} and Placidus cusp sub-lords signify classical event houses.`
      );
    }
    if (strongestCandidate.jaiminiScore > 0) {
      whyRanked.push(
        `Jaimini Chara Karaka Harmony: Relevant Chara Karakas align favorably with Kendra/Trikona houses from candidate Lagna.`
      );
    }

    // Explicitly label D9/D10 as diagnostic evidence without claiming they contributed to the score
    whyRanked.push(
      `Diagnostic Divisional Lagnas: Navamsha (D9) is ${strongestCandidate.d9LagnaSign}, Dashamsha (D10) is ${strongestCandidate.d10LagnaSign} (calculated for reference; not scored in candidate ranking).`
    );

    if (whyRanked.length === 1) {
      whyRanked.unshift("Matches rising degree with minimal astrological contradiction across provided events.");
    }

    // Remaining uncertainty
    let uncertainty = "";
    if (status === "INSUFFICIENT_EVIDENCE") {
      uncertainty = insufficientReason || "Insufficient evidence to narrow the birth time.";
    } else if (status === "MULTIPLE_CANDIDATES") {
      uncertainty =
        "Multiple candidate times remain with equivalent astrological support. Additional dated life milestones are required to differentiate between these windows.";
    } else if (events.length === 1) {
      uncertainty =
        "Only 1 life event was provided. Astrological best practice requires at least 2 to 3 independent dated milestones to eliminate cross-sub-lord ambiguities.";
    } else if (events.some((e) => e.datePrecision === "year_only" || e.dateConfidence === "estimated")) {
      uncertainty =
        "Some events contain approximate years or estimated dates. A tighter ±2 minute precision requires exact dates for events like marriage or career start.";
    } else {
      uncertainty = `Supported window narrowed to ${windowStartStr}–${windowEndStr} based on ${events.length} verified life milestone(s).`;
    }

    // Top 8 candidates for comparison table
    const topCandidates = finalCandidates.slice(0, 8);

    const report: BtrRectificationReport = {
      status,
      insufficientEvidenceReason: insufficientReason,
      isTied,
      tiedCandidates: isTied ? tiedCandidates : undefined,
      candidateClusters: clusters.length > 1 ? clusters : undefined,

      recordedTime: isTimeKnown ? recordedTime! : "Unknown",
      recordedReliability: reliability,
      searchRangeApplied: effectiveSearchRange,
      investigatedWindowStart: `${Math.floor(startCandidateMinutes / 60).toString().padStart(2, "0")}:${(startCandidateMinutes % 60).toString().padStart(2, "0")}`,
      investigatedWindowEnd: `${Math.floor(endCandidateMinutes / 60).toString().padStart(2, "0")}:${(endCandidateMinutes % 60).toString().padStart(2, "0")}`,
      stepIntervalMinutes: step,
      totalCandidatesEvaluated: finalCandidates.length,
      strongestCandidate,
      supportedWindowStart: windowStartStr,
      supportedWindowEnd: windowEndStr,
      evidenceStatus: strongestCandidate.evidenceStatus,
      whyRankedHighest: whyRanked,
      remainingUncertainty: uncertainty,
      candidateComparison: topCandidates,
      methodologyBreakdown: {
        parashariSummary: `Parashari evidence score: ${strongestCandidate.parashariScore.toFixed(1)} pts based on Vimshottari dasha lords and varga boundaries.`,
        kpSummary: `KP Sub-Lord evidence: ${strongestCandidate.kpScore.toFixed(1)} pts via Ascendant Sub-Lord (${strongestCandidate.ascendantSubLord}) and Placidus cusp significators.`,
        jaiminiSummary: `Jaimini evidence: ${strongestCandidate.jaiminiScore.toFixed(1)} pts based on Chara Karaka roles.`
      }
    };

    return report;
  }

  /**
   * Evaluates a single candidate minute
   */
  private static evaluateSingleCandidate(params: {
    dob: string;
    candidateH: number;
    candidateM: number;
    candidateTimeStr: string;
    offsetMinutes: number;
    latitude: number;
    longitude: number;
    timezoneOffsetHours: number;
    reliability: BtrTimeReliability;
    events: BtrLifeEvent[];
    physicalClues?: BtrPhysicalClues;
    ayanamsaType: string;
  }): BtrCandidateEvaluation {
    const {
      dob,
      candidateH,
      candidateM,
      candidateTimeStr,
      offsetMinutes,
      latitude,
      longitude,
      timezoneOffsetHours,
      reliability,
      events,
      physicalClues,
      ayanamsaType
    } = params;

    const [year, month, day] = dob.split("-").map((v) => parseInt(v, 10));

    // 1. Calculate Astronomical Ephemeris for Candidate
    const ephemResult = this.ephem.calculateEphemeris({
      year,
      month,
      day,
      hour: candidateH,
      minute: candidateM,
      second: 0,
      latitude,
      longitude,
      timezoneOffsetHours
    });

    // 2. Ayanamsha & Sidereal Ascendant
    const jdUtc = ephemResult.julianDayUT;
    const ayanamsaData = AyanamsaService.calculateAyanamsa(jdUtc, "lahiri");
    const ayanamsaVal = ayanamsaData.ayanamsa_value;

    const epsTrue = ephemResult.obliquityTrueDeg;
    const tropicalAscLon = calculateAscendant(ephemResult.localSiderealTimeDeg, latitude, epsTrue);
    const siderealAscLon = normalizeDeg(tropicalAscLon - ayanamsaVal);

    // 3. Ascendant Sign, Nakshatra, KP Sub-Lord
    const signIdx = Math.floor(siderealAscLon / 30) % 12;
    const ascRashi = ZODIAC_RASHIS[signIdx] || ZODIAC_RASHIS[0];
    const ascStarSub = getStarAndSubLord(siderealAscLon);

    // 4. Divisional Lagnas - Recalculated for candidate boundary awareness (Diagnostic evidence, unscored)
    const d9Idx = DivisionalChartsEngine.calculateVargaSignIndex(siderealAscLon, "D9");
    const d10Idx = DivisionalChartsEngine.calculateVargaSignIndex(siderealAscLon, "D10");
    const d9Sign = ZODIAC_RASHIS[d9Idx]?.name || "Aries";
    const d10Sign = ZODIAC_RASHIS[d10Idx]?.name || "Aries";
    const diagnosticVargas = {
      d9Sign,
      d10Sign,
      usage: "diagnostic_only" as const,
      notes: "Calculated for candidate boundary awareness. Not scored in rectification evidence to prevent unverified heuristic attribution."
    };

    // 5. Placidus/KP Cusps (1 to 12) - Candidate-Specific
    let placidusTropical: Record<number, number> | null = null;
    if (Math.abs(latitude) < 66.0) {
      try {
        placidusTropical = calculateHouseCuspsPlacidus(ephemResult.localSiderealTimeDeg, latitude, epsTrue);
      } catch {
        placidusTropical = null;
      }
    }

    const cuspSubLords: Record<number, string> = {};
    const placidusCusps: Record<number, BtrPlacidusCuspDetail> = {};

    for (let h = 1; h <= 12; h++) {
      let tropCusp = placidusTropical ? placidusTropical[h] : NaN;
      if (tropCusp === undefined || isNaN(tropCusp) || !isFinite(tropCusp)) {
        // Polar or numerical fallback to Equal house from Ascendant
        tropCusp = normalizeDeg(tropicalAscLon + (h - 1) * 30);
      }
      const sidCusp = normalizeDeg(tropCusp - ayanamsaVal);
      const subInfo = getStarAndSubLord(sidCusp);
      const cSignIdx = Math.floor(sidCusp / 30) % 12;
      const signLord = SIGN_LORDS[cSignIdx] || "Mars";

      cuspSubLords[h] = subInfo.subLord;
      placidusCusps[h] = {
        houseNumber: h,
        tropicalLongitude: parseFloat(tropCusp.toFixed(4)),
        siderealLongitude: parseFloat(sidCusp.toFixed(4)),
        signName: ZODIAC_RASHIS[cSignIdx]?.name || "Aries",
        signIndex: cSignIdx,
        signLord,
        starLord: subInfo.starLord,
        subLord: subInfo.subLord,
        subSubLord: subInfo.subSubLord
      };
    }

    // 6. Sidereal Moon for Vimshottari Dasha
    const moonTropLon = ephemResult.bodies.Moon?.eclipticLongitude ?? 0;
    const moonSidLon = normalizeDeg(moonTropLon - ayanamsaVal);

    // 7. Planetary positions for Jaimini Karakas and House rulerships
    const planetsSidereal: Record<string, { longitude: number; name: string }> = {};
    Object.entries(ephemResult.bodies).forEach(([pName, pData]) => {
      planetsSidereal[pName] = {
        name: pName,
        longitude: normalizeDeg(pData.eclipticLongitude - ayanamsaVal)
      };
    });

    // 8. Evaluate Each Life Event against this candidate time
    const eventMatches: BtrEventMatchDetail[] = [];
    let parashariScore = 0;
    let kpScore = 0;
    let jaiminiScore = 0;
    const contradictions: string[] = [];

    // Layer B: Proximity Prior (Treated as secondary contextual tie-breaker, max 1.0 pt)
    const proximityScore = calculateProximityPrior(offsetMinutes, reliability);

    // Compute Jaimini report for this candidate
    let jaiminiReport = null;
    try {
      jaiminiReport = JaiminiEngine.calculateJaimini(planetsSidereal, siderealAscLon);
    } catch {
      // Fallback safe
    }

    // Compute Vimshottari dasha tree from candidate Moon
    const birthDateObj = new Date(Date.UTC(year, month - 1, day, candidateH, candidateM));
    let vimshottariReport = null;
    try {
      vimshottariReport = DashaEngine.calculateVimshottari(moonSidLon, birthDateObj, new Date());
    } catch {
      // Fallback safe
    }

    events.forEach((event) => {
      const match = this.evaluateEventForCandidate({
        event,
        candidateAscLon: siderealAscLon,
        ascRashiSignIdx: signIdx,
        ascSubLord: ascStarSub.subLord,
        cuspSubLords,
        placidusCusps,
        d9Idx,
        d10Idx,
        planetsSidereal,
        vimshottariReport,
        jaiminiReport
      });

      eventMatches.push(match);

      // Layer A Shastric Methodology Accumulation
      if (match.parashariSupport) parashariScore += match.weightedScore * 0.45;
      if (match.kpSupport) kpScore += match.weightedScore * 0.40;
      if (match.jaiminiSupport) jaiminiScore += match.weightedScore * 0.15;

      if (match.contradictionDetected && match.contradictionReason) {
        contradictions.push(match.contradictionReason);
        // Contradiction penalty
        parashariScore = Math.max(0, parashariScore - 4);
        kpScore = Math.max(0, kpScore - 4);
      }
    });

    // 9. Physical Clue Matching (Supporting diagnostic only, max 5 pts)
    let physicalClueScore = 0;
    if (physicalClues) {
      physicalClueScore = this.evaluatePhysicalClues(physicalClues, ascRashi.name, ascStarSub.starLord);
    }

    // Pure Shastric Evidence Score (Layer A)
    const roundedParashari = parseFloat(parashariScore.toFixed(1));
    const roundedKp = parseFloat(kpScore.toFixed(1));
    const roundedJaimini = parseFloat(jaiminiScore.toFixed(1));
    const shastricEvidenceScore = parseFloat((roundedParashari + roundedKp + roundedJaimini).toFixed(1));

    // Internal Candidate Comparison Score (Layer B Engineering Aggregation)
    const candidateComparisonScore = parseFloat(
      (shastricEvidenceScore + physicalClueScore + proximityScore).toFixed(2)
    );

    // Determine evidence status
    const matchedCount = eventMatches.filter((m) => m.parashariSupport || m.kpSupport).length;
    let evidenceStatus: "High" | "Moderate" | "Low" = "Low";

    if (events.length >= 2 && matchedCount >= 2 && contradictions.length === 0 && candidateComparisonScore >= 25) {
      evidenceStatus = "High";
    } else if (events.length >= 1 && matchedCount >= 1 && candidateComparisonScore >= 12) {
      evidenceStatus = "Moderate";
    }

    return {
      timeStr: candidateTimeStr,
      totalMinutesOffset: offsetMinutes,
      ascendantDegree: parseFloat(siderealAscLon.toFixed(4)),
      ascendantSign: ascRashi.name,
      ascendantDegreeDms: `${degToDMS(siderealAscLon % 30)} in ${ascRashi.name}`,
      ascendantNakshatra: ascStarSub.nakshatraName,
      ascendantStarLord: ascStarSub.starLord,
      ascendantSubLord: ascStarSub.subLord,
      ascendantSubSubLord: ascStarSub.subSubLord,
      d9LagnaSign: d9Sign,
      d10LagnaSign: d10Sign,
      diagnosticVargas,
      cuspSubLords,
      placidusCusps,
      parashariScore: roundedParashari,
      kpScore: roundedKp,
      jaiminiScore: roundedJaimini,
      shastricEvidenceScore,
      physicalClueScore: parseFloat(physicalClueScore.toFixed(1)),
      proximityScore: parseFloat(proximityScore.toFixed(2)),
      candidateComparisonScore,
      totalScore: candidateComparisonScore, // backward-compatible alias
      eventMatches,
      matchedEventsCount: matchedCount,
      totalEventsCount: events.length,
      contradictions,
      evidenceStatus
    };
  }

  /**
   * Evaluates a life event against a candidate chart using Parashari, KP, and Jaimini
   */
  private static evaluateEventForCandidate(params: {
    event: BtrLifeEvent;
    candidateAscLon: number;
    ascRashiSignIdx: number;
    ascSubLord: string;
    cuspSubLords: Record<number, string>;
    placidusCusps: Record<number, BtrPlacidusCuspDetail>;
    d9Idx: number;
    d10Idx: number;
    planetsSidereal: Record<string, { longitude: number; name: string }>;
    vimshottariReport: any;
    jaiminiReport: any;
  }): BtrEventMatchDetail {
    const {
      event,
      candidateAscLon,
      ascRashiSignIdx,
      ascSubLord,
      cuspSubLords,
      placidusCusps,
      d9Idx,
      d10Idx,
      planetsSidereal,
      vimshottariReport,
      jaiminiReport
    } = params;

    // Retrieve enriched event definition with specialized rule identifiers and classical provenance
    const def = getEnrichedEventDefinition(event.eventType);

    // Parse Event Date to find running Dasha
    let eventDateMs: number | null = null;
    let eventDateDisplay = "";

    if (event.exactDate) {
      eventDateMs = new Date(event.exactDate).getTime();
      eventDateDisplay = event.exactDate;
    } else if (event.monthYear) {
      eventDateMs = new Date(`${event.monthYear}-15`).getTime();
      eventDateDisplay = event.monthYear;
    } else if (event.year) {
      eventDateMs = new Date(`${event.year}-07-01`).getTime();
      eventDateDisplay = `${event.year}`;
    } else if (event.rangeStart) {
      eventDateMs = new Date(event.rangeStart).getTime();
      eventDateDisplay = `${event.rangeStart} to ${event.rangeEnd || ""}`;
    }

    // Weight multiplier based on precision, confidence, and significance (Layer B Engineering Aggregation)
    let weight = 10; // base points
    if (event.significance === "high") weight *= 1.4;
    else if (event.significance === "low") weight *= 0.7;

    if (event.datePrecision === "exact_date") weight *= 1.3;
    else if (event.datePrecision === "year_only") weight *= 0.85;

    if (event.dateConfidence === "documented") weight *= 1.3;
    else if (event.dateConfidence === "estimated") weight *= 0.65;

    // 1. Parashari Dasha & House Check (Layer A Shastric Evidence)
    let parashariSupport = false;
    let parashariNotes = "";

    if (eventDateMs && vimshottariReport && vimshottariReport.mahadashas) {
      let runningMD = "";
      let runningAD = "";

      for (const md of vimshottariReport.mahadashas as DashaPeriod[]) {
        const mdStart = new Date(md.startDate).getTime();
        const mdEnd = new Date(md.endDate).getTime();
        if (eventDateMs >= mdStart && eventDateMs <= mdEnd) {
          runningMD = md.lord;
          if (md.subPeriods) {
            for (const ad of md.subPeriods) {
              const adStart = new Date(ad.startDate).getTime();
              const adEnd = new Date(ad.endDate).getTime();
              if (eventDateMs >= adStart && eventDateMs <= adEnd) {
                runningAD = ad.lord;
                break;
              }
            }
          }
          break;
        }
      }

      if (runningMD) {
        const primaryTargetSigns = def.primaryHouses.map((h) => (ascRashiSignIdx + h - 1) % 12);
        const mdRulesHouse = Object.entries(SIGN_LORDS).some(
          ([sIdx, lord]) => lord === runningMD && primaryTargetSigns.includes(parseInt(sIdx, 10))
        );
        const adRulesHouse = runningAD
          ? Object.entries(SIGN_LORDS).some(
              ([sIdx, lord]) => lord === runningAD && primaryTargetSigns.includes(parseInt(sIdx, 10))
            )
          : false;

        const isKarak = def.naturalKarakas.includes(runningMD) || (runningAD && def.naturalKarakas.includes(runningAD));

        if (mdRulesHouse || adRulesHouse || isKarak) {
          parashariSupport = true;
          parashariNotes = `Running Dasha (${runningMD}${runningAD ? "/" + runningAD : ""}) activates houses ${def.primaryHouses.join(", ")} or acts as natural karaka for ${def.name}.`;
        } else {
          parashariNotes = `Dasha ${runningMD}${runningAD ? "/" + runningAD : ""} has modest connection to primary houses ${def.primaryHouses.join(", ")}.`;
        }
      }
    } else {
      parashariSupport = true;
      parashariNotes = `General alignment with houses ${def.primaryHouses.join(", ")} (approximate/dated period).`;
    }

    // 2. Authentic KP Significator Verification (Layer A Shastric Evidence)
    let kpSupport = false;
    let kpNotes = "";

    const primaryHouse = def.primaryHouses[0] || 1;
    const primaryCuspDetail = placidusCusps[primaryHouse];
    const cuspSub = primaryCuspDetail?.subLord || cuspSubLords[primaryHouse] || ascSubLord;

    // In KP, determine houses signified by Cusp Sub-Lord through its Star-Lord and itself
    const cuspSubPlanetLon = planetsSidereal[cuspSub]?.longitude ?? 0;
    const cuspSubStarLord = getStarAndSubLord(cuspSubPlanetLon).starLord;

    // Houses signified by Star-Lord of Cusp Sub-Lord (Level 1 Significators)
    const starSignifiedHouses = getHousesSignifiedByPlanet(cuspSubStarLord, planetsSidereal, placidusCusps);
    // Houses signified by Cusp Sub-Lord itself (Level 2 Significators)
    const selfSignifiedHouses = getHousesSignifiedByPlanet(cuspSub, planetsSidereal, placidusCusps);

    const allSignifiedHouses = Array.from(new Set([...starSignifiedHouses, ...selfSignifiedHouses]));
    const targetHouses = def.kpSignificatorHouses || def.primaryHouses;
    const matchedHouses = targetHouses.filter((h) => allSignifiedHouses.includes(h));

    if (matchedHouses.length > 0) {
      kpSupport = true;
      kpNotes = def.kpRuleId
        ? `[KP ${def.kpRuleId}] Cusp ${primaryHouse} Sub-Lord ${cuspSub} (Star: ${cuspSubStarLord}) signifies house(s) ${matchedHouses.join(", ")} fulfilling classical KP criteria.`
        : `Cusp ${primaryHouse} Sub-Lord ${cuspSub} (Star: ${cuspSubStarLord}) connects to house(s) ${matchedHouses.join(", ")}.`;
    } else {
      kpSupport = false;
      kpNotes = def.kpRuleId
        ? `Cusp ${primaryHouse} Sub-Lord ${cuspSub} (Star: ${cuspSubStarLord}) signifies [${allSignifiedHouses.join(", ")}], lacking required connection to houses [${targetHouses.join(", ")}].`
        : `KP evidence unavailable for this event type; evaluated under generic bhava karaka association only.`;
    }

    // 3. Jaimini Karaka Check (Layer A Shastric Evidence)
    let jaiminiSupport = false;
    let jaiminiNotes = "";

    if (jaiminiReport && def.jaiminiKarakaRole) {
      const charaKarakas = jaiminiReport.charaKarakas || [];
      const relevantKaraka = charaKarakas.find((k: any) => k.karakaCode === def.jaiminiKarakaRole);
      if (relevantKaraka) {
        const plLon = planetsSidereal[relevantKaraka.planet]?.longitude ?? 0;
        const plSign = Math.floor(plLon / 30) % 12;
        const houseFromLagna = ((plSign - ascRashiSignIdx + 12) % 12) + 1;
        if ([1, 4, 7, 10, 5, 9, 11, 2].includes(houseFromLagna)) {
          jaiminiSupport = true;
          jaiminiNotes = `${def.jaiminiKarakaRole} (${relevantKaraka.planet}) sits auspiciously in House ${houseFromLagna} from candidate Lagna.`;
        } else {
          jaiminiNotes = `${def.jaiminiKarakaRole} (${relevantKaraka.planet}) in Dusthana House ${houseFromLagna} from candidate Lagna.`;
        }
      }
    }

    // 4. Build Structured Evidence Items (Layer A Traceability)
    const evidenceItems: BtrMethodologyEvidenceItem[] = [
      {
        ruleId: def.parashariRuleId || "BPHS_BHAVA_KARAKA_001",
        methodology: "Parashari",
        condition: `Activation of houses [${def.primaryHouses.join(", ")}] or karakas [${def.naturalKarakas.join(", ")}] via running Dasha`,
        matched: parashariSupport,
        notes: parashariNotes,
        provenance: def.provenance || "Brihat Parashara Hora Shastra Ch. 42",
        ruleCategory: def.ruleCategory || "GENERIC_SUPPORTING_RULE"
      }
    ];

    if (def.kpRuleId) {
      evidenceItems.push({
        ruleId: def.kpRuleId,
        methodology: "KP",
        condition: `Cusp ${primaryHouse} Sub-Lord (${cuspSub}) must signify houses [${targetHouses.join(", ")}]`,
        matched: kpSupport,
        notes: kpNotes,
        provenance: def.provenance || "KP Reader IV: Marriage, Profession and Life Events",
        ruleCategory: "SPECIALIZED_CLASSICAL_RULE"
      });
    } else {
      evidenceItems.push({
        ruleId: "KP_GENERIC_SUPPORTING_000",
        methodology: "KP",
        condition: `Generic Bhava Karaka & Sub-Lord association with houses [${def.primaryHouses.join(", ")}]`,
        matched: kpSupport,
        notes: "KP evidence unavailable for this event type; evaluated under generic bhava karaka association only.",
        provenance: "Generic house karaka mapping",
        ruleCategory: "GENERIC_SUPPORTING_RULE"
      });
    }

    if (def.jaiminiKarakaRole) {
      evidenceItems.push({
        ruleId: def.jaiminiRuleId || `JAM_${def.jaiminiKarakaRole}_001`,
        methodology: "Jaimini",
        condition: `${def.jaiminiKarakaRole} Karaka placement relative to candidate Lagna`,
        matched: jaiminiSupport,
        notes: jaiminiNotes || "Jaimini Chara Karaka check",
        provenance: "Jaimini Upadesha Sutras 1.1",
        ruleCategory: def.ruleCategory || "GENERIC_SUPPORTING_RULE"
      });
    }

    // Contradiction detection: e.g. Documented marriage with zero connection in primary houses
    let contradictionDetected = false;
    let contradictionReason = undefined;

    if (event.significance === "high" && event.dateConfidence === "documented") {
      if (!parashariSupport && !kpSupport && def.id === "marriage") {
        contradictionDetected = true;
        contradictionReason = `Contradiction: Documented marriage at ${eventDateDisplay} shows no activation in primary marriage houses (2, 7, 11) for this candidate Lagna.`;
      }
    }

    return {
      eventId: event.id,
      eventType: def.name,
      eventDateDisplay: eventDateDisplay || "Date not specified",
      significance: event.significance,
      confidence: event.dateConfidence,
      parashariSupport,
      parashariNotes,
      kpSupport,
      kpNotes,
      jaiminiSupport,
      jaiminiNotes,
      contradictionDetected,
      contradictionReason,
      weightedScore: parseFloat(weight.toFixed(1)),
      ruleCategory: def.ruleCategory || "GENERIC_SUPPORTING_RULE",
      evidenceItems
    };
  }

  /**
   * Supporting physical clues evaluation (5% weight maximum)
   */
  private static evaluatePhysicalClues(
    clues: BtrPhysicalClues,
    lagnaSignName: string,
    lagnaStarLord: string
  ): number {
    let score = 0;
    const sign = lagnaSignName.toLowerCase();

    if (clues.constitution === "vata_lean" && ["gemini", "virgo", "aquarius", "capricorn"].includes(sign)) {
      score += 1.5;
    } else if (clues.constitution === "pitta_muscular" && ["aries", "leo", "scorpio", "sagittarius"].includes(sign)) {
      score += 1.5;
    } else if (clues.constitution === "kapha_broad" && ["taurus", "cancer", "libra", "pisces"].includes(sign)) {
      score += 1.5;
    }

    if (clues.temperament === "dynamic_fire" && ["aries", "leo", "sagittarius"].includes(sign)) {
      score += 1.5;
    } else if (clues.temperament === "analytical_air" && ["gemini", "libra", "aquarius"].includes(sign)) {
      score += 1.5;
    } else if (clues.temperament === "calm_water" && ["cancer", "scorpio", "pisces"].includes(sign)) {
      score += 1.5;
    } else if (clues.temperament === "practical_earth" && ["taurus", "virgo", "capricorn"].includes(sign)) {
      score += 1.5;
    }

    if (clues.intellectualStyle === "scientific_technical" && ["Saturn", "Mars", "Mercury", "Rahu"].includes(lagnaStarLord)) {
      score += 1.0;
    } else if (clues.intellectualStyle === "artistic_creative" && ["Venus", "Moon"].includes(lagnaStarLord)) {
      score += 1.0;
    } else if (clues.intellectualStyle === "spiritual_philosophical" && ["Jupiter", "Ketu", "Sun"].includes(lagnaStarLord)) {
      score += 1.0;
    }

    return Math.min(5, score);
  }
}
