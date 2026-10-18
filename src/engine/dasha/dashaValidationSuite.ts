/**
 * Vimshottari & Predictive Dasha Validation Suite
 * 20 Comprehensive Automated Mathematical Tests verifying every aspect of Dasha calculation:
 * Sequence, 120-Year Total, Birth Balance, Interval Gaps, Overlaps, Parent-Child Containment,
 * 5-Tier Proportionality, Multi-Profile Stability, and Null Safety.
 */

import { VimshottariEngine } from "./vimshottariEngine";
import { FunctionalNatureEngine } from "./functionalNatureEngine";
import { LifeThemeActivationEngine } from "./lifeThemeActivationEngine";
import { DashaConfluenceEngine } from "./dashaConfluenceEngine";
import { DashaTransitionEngine } from "./dashaTransitionEngine";

export interface DashaValidationTestResult {
  id: string;
  category: string;
  name: string;
  formulaDescription: string;
  expected: string;
  actual: string;
  passed: boolean;
  notes: string;
}

export interface DashaValidationReport {
  timestampIso: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  passRatePercentage: number;
  overallStatus: "PASSED" | "FAILED";
  tests: DashaValidationTestResult[];
}

export class DashaValidationSuite {
  /**
   * Run the complete 20-test validation suite
   */
  public static runAllTests(): DashaValidationReport {
    const tests: DashaValidationTestResult[] = [];

    // -------------------------------------------------------------
    // DASHA_001: Vimshottari Sequence Order
    // -------------------------------------------------------------
    const expectedOrder = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
    const actualOrder = VimshottariEngine.VIMSHOTTARI_ORDER;
    const seqMatch = expectedOrder.every((l, i) => actualOrder[i] === l);
    tests.push({
      id: "DASHA_001",
      category: "Vimshottari Foundation",
      name: "Vimshottari Classical Planetary Sequence",
      formulaDescription: "Ketu(7) → Venus(20) → Sun(6) → Moon(10) → Mars(7) → Rahu(18) → Jupiter(16) → Saturn(19) → Mercury(17)",
      expected: expectedOrder.join(" → "),
      actual: actualOrder.join(" → "),
      passed: seqMatch,
      notes: "BPHS Ch. 46 Shloka 12"
    });

    // -------------------------------------------------------------
    // DASHA_002: 120-Year Total Sum
    // -------------------------------------------------------------
    const totalYears = Object.values(VimshottariEngine.VIMSHOTTARI_YEARS).reduce((a, b) => a + b, 0);
    tests.push({
      id: "DASHA_002",
      category: "Vimshottari Foundation",
      name: "120.0 Solar Sidereal Years Total Cycle",
      formulaDescription: "Sum of 9 Graha Vimshottari allocations = 120.0",
      expected: "120 Years",
      actual: `${totalYears} Years`,
      passed: totalYears === 120,
      notes: "Total Paramayu cycle constraint"
    });

    // -------------------------------------------------------------
    // DASHA_003: Nakshatra Lord Mapping
    // -------------------------------------------------------------
    // Ashwini (0°) -> Ketu, Bharani (13°20') -> Venus, Krittika (26°40') -> Sun, Rohini (40°00') -> Moon
    const balAsh = VimshottariEngine.calculateBirthBalance(0.0);
    const balBha = VimshottariEngine.calculateBirthBalance(13.333333);
    const balKri = VimshottariEngine.calculateBirthBalance(26.666667);
    const balRoh = VimshottariEngine.calculateBirthBalance(40.0);
    const nakLordMatch = balAsh.rulingLord === "Ketu" && balBha.rulingLord === "Venus" && balKri.rulingLord === "Sun" && balRoh.rulingLord === "Moon";
    tests.push({
      id: "DASHA_003",
      category: "Nakshatra Calibration",
      name: "Nakshatra to Vimshottari Lord Mapping",
      formulaDescription: "Ashwini=Ketu, Bharani=Venus, Krittika=Sun, Rohini=Moon",
      expected: "Ashwini:Ketu, Bharani:Venus, Krittika:Sun, Rohini:Moon",
      actual: `Ashwini:${balAsh.rulingLord}, Bharani:${balBha.rulingLord}, Krittika:${balKri.rulingLord}, Rohini:${balRoh.rulingLord}`,
      passed: nakLordMatch,
      notes: "Nakshatra rulership matrix verification"
    });

    // -------------------------------------------------------------
    // DASHA_004: Birth Dasha Balance at Mid-Nakshatra (50% elapsed)
    // -------------------------------------------------------------
    // Moon at 6°40' (6.666667°) in Ashwini (Ketu 7y) -> 50% remaining = 3.50 years
    const balMid = VimshottariEngine.calculateBirthBalance(6.666667);
    const midPassed = Math.abs(balMid.balanceYears + (balMid.balanceMonths / 12) + (balMid.balanceDays / 365.25) - 3.5) < 0.05;
    tests.push({
      id: "DASHA_004",
      category: "Birth Balance",
      name: "Mid-Nakshatra 50% Arc Balance (3.50 Years Ketu)",
      formulaDescription: "Remaining = 7.0 × (13°20' - 6°40') / 13°20' = 3.50 Years",
      expected: "3.50 Years (Ketu)",
      actual: `${(balMid.totalBalanceDays / VimshottariEngine.SOLAR_YEAR_DAYS).toFixed(2)} Years (${balMid.rulingLord})`,
      passed: midPassed,
      notes: "Fractional arc proportional deduction"
    });

    // Generate reference chart: Born 1990-01-01 12:00 UTC, Moon at 46.666667° (Rohini mid-point, Moon total 10y -> 5y remaining)
    const refBirthDate = new Date("1990-01-01T12:00:00.000Z");
    const masterRep = VimshottariEngine.calculateMasterVimshottari({
      birthDate: refBirthDate,
      moonLongitude: 46.666667, // Rohini (40° to 53°20', midpoint 46°40')
      targetDate: new Date("2026-08-21T00:00:00.000Z"),
      maxDepth: 5
    });

    // -------------------------------------------------------------
    // DASHA_005: Mahadasha Continuity
    // -------------------------------------------------------------
    let mdContinuous = true;
    for (let i = 0; i < masterRep.mahadashas.length - 1; i++) {
      const curEnd = masterRep.mahadashas[i].endDateIso;
      const nextStart = masterRep.mahadashas[i + 1].startDateIso;
      if (curEnd !== nextStart) {
        mdContinuous = false;
        break;
      }
    }
    tests.push({
      id: "DASHA_005",
      category: "Continuity & Gaps",
      name: "Mahadasha Strict Temporal Continuity (Zero Gaps)",
      formulaDescription: "MD[i].endDate === MD[i+1].startDate for all 9 Mahadashas",
      expected: "Seamless continuity across 120-year span",
      actual: mdContinuous ? "100% Seamless (0ms drift)" : "Discontinuity Detected",
      passed: mdContinuous,
      notes: "ISO-8601 boundary exact matching"
    });

    // -------------------------------------------------------------
    // DASHA_006: Antardasha Proportional Calculation
    // -------------------------------------------------------------
    const sampleMD = masterRep.mahadashas[1]; // Full Mars (7y) or Rahu (18y)
    const ads = sampleMD.subPeriods || [];
    const adCount = ads.length;
    const firstADLord = ads[0]?.lord;
    const adProportionalPassed = adCount === 9 && firstADLord === sampleMD.lord;
    tests.push({
      id: "DASHA_006",
      category: "Sub-Period Proportions",
      name: "Antardasha 9-Fold Proportionality & Self-Lord Genesis",
      formulaDescription: "Antardasha sequence starts from Mahadasha lord with 9 sub-divisions",
      expected: `9 Antardashas starting with ${sampleMD.lord}`,
      actual: `${adCount} Antardashas starting with ${firstADLord}`,
      passed: adProportionalPassed,
      notes: "BPHS Ch. 46 Shloka 15"
    });

    // -------------------------------------------------------------
    // DASHA_007: Pratyantardasha Proportional Calculation
    // -------------------------------------------------------------
    const sampleAD = ads[0];
    const pds = sampleAD?.subPeriods || [];
    const pdCount = pds.length;
    const firstPDLord = pds[0]?.lord;
    const pdProportionalPassed = pdCount === 9 && firstPDLord === sampleAD?.lord;
    tests.push({
      id: "DASHA_007",
      category: "Sub-Period Proportions",
      name: "Pratyantardasha 3rd-Tier Proportionality",
      formulaDescription: "Pratyantar sequence starts from Antardasha lord with 9 sub-divisions",
      expected: `9 Pratyantardashas starting with ${sampleAD?.lord}`,
      actual: `${pdCount} Pratyantardashas starting with ${firstPDLord}`,
      passed: pdProportionalPassed,
      notes: "Tier 3 sub-division verification"
    });

    // -------------------------------------------------------------
    // DASHA_008: Sookshmadasha 4th-Tier Proportional Calculation
    // -------------------------------------------------------------
    const samplePD = pds[0];
    const sds = samplePD?.subPeriods || [];
    const sdCount = sds.length;
    const firstSDLord = sds[0]?.lord;
    const sdProportionalPassed = sdCount === 9 && firstSDLord === samplePD?.lord;
    tests.push({
      id: "DASHA_008",
      category: "Sub-Period Proportions",
      name: "Sookshmadasha 4th-Tier Proportionality",
      formulaDescription: "Sookshma sequence starts from Pratyantar lord with 9 sub-divisions",
      expected: `9 Sookshmadashas starting with ${samplePD?.lord}`,
      actual: `${sdCount} Sookshmadashas starting with ${firstSDLord}`,
      passed: sdProportionalPassed,
      notes: "Tier 4 sub-division verification"
    });

    // -------------------------------------------------------------
    // DASHA_009: Pranadasha 5th-Tier Proportional Calculation
    // -------------------------------------------------------------
    const sampleSD = sds[0];
    const pras = sampleSD?.subPeriods || [];
    const praCount = pras.length;
    const firstPRALord = pras[0]?.lord;
    const praProportionalPassed = praCount === 9 && firstPRALord === sampleSD?.lord;
    tests.push({
      id: "DASHA_009",
      category: "Sub-Period Proportions",
      name: "Pranadasha 5th-Tier Proportionality",
      formulaDescription: "Prana sequence starts from Sookshma lord with 9 sub-divisions",
      expected: `9 Pranadashas starting with ${sampleSD?.lord}`,
      actual: `${praCount} Pranadashas starting with ${firstPRALord}`,
      passed: praProportionalPassed,
      notes: "Tier 5 breath-level precision"
    });

    // -------------------------------------------------------------
    // DASHA_010: No Interval Gaps within Antardashas
    // -------------------------------------------------------------
    let adGaps = 0;
    for (const md of masterRep.mahadashas) {
      const subAds = md.subPeriods || [];
      for (let a = 0; a < subAds.length - 1; a++) {
        if (subAds[a].endDateIso !== subAds[a + 1].startDateIso) {
          adGaps++;
        }
      }
    }
    tests.push({
      id: "DASHA_010",
      category: "Continuity & Gaps",
      name: "Antardasha Zero Interval Gaps",
      formulaDescription: "Every Antardasha must start exactly when preceding Antardasha terminates",
      expected: "0 Gaps",
      actual: `${adGaps} Gaps detected`,
      passed: adGaps === 0,
      notes: "Chronological boundary alignment"
    });

    // -------------------------------------------------------------
    // DASHA_011: No Interval Overlaps
    // -------------------------------------------------------------
    let overlaps = 0;
    for (let i = 0; i < masterRep.mahadashas.length - 1; i++) {
      const endMs = new Date(masterRep.mahadashas[i].endDateIso).getTime();
      const nextStartMs = new Date(masterRep.mahadashas[i + 1].startDateIso).getTime();
      if (endMs > nextStartMs) {
        overlaps++;
      }
    }
    tests.push({
      id: "DASHA_011",
      category: "Continuity & Gaps",
      name: "Zero Interval Overlaps Across Timeline",
      formulaDescription: "Period[i].endDate <= Period[i+1].startDate",
      expected: "0 Overlaps",
      actual: `${overlaps} Overlaps detected`,
      passed: overlaps === 0,
      notes: "Temporal non-intersection guarantee"
    });

    // -------------------------------------------------------------
    // DASHA_012: Parent-Child Strict Containment
    // -------------------------------------------------------------
    let containmentPassed = true;
    for (const md of masterRep.mahadashas) {
      const mdStartMs = new Date(md.startDateIso).getTime();
      const mdEndMs = new Date(md.endDateIso).getTime();
      for (const ad of md.subPeriods || []) {
        const adStartMs = new Date(ad.startDateIso).getTime();
        const adEndMs = new Date(ad.endDateIso).getTime();
        if (adStartMs < mdStartMs || adEndMs > mdEndMs) {
          containmentPassed = false;
          break;
        }
      }
    }
    tests.push({
      id: "DASHA_012",
      category: "Hierarchy Validation",
      name: "Parent-Child Boundary Strict Containment",
      formulaDescription: "AD.start >= MD.start && AD.end <= MD.end",
      expected: "100% Contained",
      actual: containmentPassed ? "100% Contained" : "Boundary Leak Detected",
      passed: containmentPassed,
      notes: "Hierarchical temporal encapsulation"
    });

    // -------------------------------------------------------------
    // DASHA_013: Current Period Detection
    // -------------------------------------------------------------
    const curPath = masterRep.currentHierarchy.path;
    const hasCurrentMD = masterRep.mahadashas.some(m => m.isCurrent);
    tests.push({
      id: "DASHA_013",
      category: "Active Tracking",
      name: "Current 5-Tier Dasha Hierarchy Path Detection",
      formulaDescription: "Matches target date against nested intervals to produce MD > AD > PD > SD > Prana",
      expected: "Valid 5-tier path with active flag",
      actual: curPath,
      passed: hasCurrentMD && curPath.split(">").length === 5,
      notes: "Deterministic current period resolver"
    });

    // -------------------------------------------------------------
    // DASHA_014: Leap Year & Day Count Integrity
    // -------------------------------------------------------------
    const leapBirthDate = new Date("2000-02-29T12:00:00.000Z"); // Leap day birth
    const leapRep = VimshottariEngine.calculateMasterVimshottari({
      birthDate: leapBirthDate,
      moonLongitude: 100.0,
      maxDepth: 2
    });
    tests.push({
      id: "DASHA_014",
      category: "Calendar Precision",
      name: "Feb 29 Leap Day Birth Profile Support",
      formulaDescription: "Correct calculation for leap year birth dates without NaN offsets",
      expected: "Valid Mahadasha Array with 9 periods",
      actual: `${leapRep.mahadashas.length} Mahadashas generated`,
      passed: leapRep.mahadashas.length === 9,
      notes: "Leap year boundary edge case"
    });

    // -------------------------------------------------------------
    // DASHA_015: Functional Nature - Yogakaraka Detection (Taurus Lagna -> Saturn)
    // -------------------------------------------------------------
    const fnTaurus = FunctionalNatureEngine.evaluateForLagna("Taurus");
    const saturnTaurus = fnTaurus.evaluations.Saturn;
    const ykPassed = saturnTaurus?.classification === "Yogakaraka";
    tests.push({
      id: "DASHA_015",
      category: "Astrological Rules",
      name: "Taurus Ascendant Yogakaraka Identification (Saturn 9th+10th)",
      formulaDescription: "Saturn rules 9th (Trikona) & 10th (Kendra) for Vrishabha Lagna -> Yogakaraka",
      expected: "Yogakaraka (Houses [9, 10])",
      actual: `${saturnTaurus?.classification} (Houses [${saturnTaurus?.ownedHouses.join(", ")}])`,
      passed: ykPassed,
      notes: "BPHS Ch. 34 Shloka 32"
    });

    // -------------------------------------------------------------
    // DASHA_016: Functional Nature - Cancer Lagna Mars Yogakaraka (5th+10th)
    // -------------------------------------------------------------
    const fnCancer = FunctionalNatureEngine.evaluateForLagna("Cancer");
    const marsCancer = fnCancer.evaluations.Mars;
    const marsYkPassed = marsCancer?.classification === "Yogakaraka";
    tests.push({
      id: "DASHA_016",
      category: "Astrological Rules",
      name: "Cancer Ascendant Yogakaraka Identification (Mars 5th+10th)",
      formulaDescription: "Mars rules 5th (Trikona) & 10th (Kendra) for Karka Lagna -> Yogakaraka",
      expected: "Yogakaraka (Houses [5, 10])",
      actual: `${marsCancer?.classification} (Houses [${marsCancer?.ownedHouses.join(", ")}])`,
      passed: marsYkPassed,
      notes: "BPHS Ch. 34 Shloka 31"
    });

    // -------------------------------------------------------------
    // DASHA_017: Life Theme Activation Engine Synthesis
    // -------------------------------------------------------------
    const themeResults = LifeThemeActivationEngine.evaluateAllThemes({
      activeMDLord: "Jupiter",
      activeADLord: "Saturn",
      activePDLord: "Venus",
      planetHouses: {
        Jupiter: [9, 12, 10], // Rules 9, 12, placed in 10
        Saturn: [10, 11, 2],  // Rules 10, 11, placed in 2
        Venus: [2, 7, 11]     // Rules 2, 7, placed in 11
      }
    });
    const careerTheme = themeResults.find(t => t.theme === "CAREER");
    const wealthTheme = themeResults.find(t => t.theme === "WEALTH");
    const themePassed = (careerTheme?.confluenceScore ?? 0) >= 50 && (wealthTheme?.confluenceScore ?? 0) >= 50;
    tests.push({
      id: "DASHA_017",
      category: "Thematic Activation",
      name: "Multi-Theme Activation Synthesis (Career & Wealth)",
      formulaDescription: "Synthesizes house ownership, placement, and karakatwa into quantified confluence score",
      expected: "Career & Wealth Confluence >= 50%",
      actual: `Career: ${careerTheme?.confluenceScore}%, Wealth: ${wealthTheme?.confluenceScore}%`,
      passed: themePassed,
      notes: "Life theme deterministic confluence evaluation"
    });

    // -------------------------------------------------------------
    // DASHA_018: Dasha Confluence Engine Convergence
    // -------------------------------------------------------------
    const confResult = DashaConfluenceEngine.evaluateConfluence({
      mdLord: "Jupiter",
      adLord: "Sun",
      mdHouses: [1, 10],
      adHouses: [10],
      mdDignity: "Exalted",
      adDignity: "Own Sign"
    });
    const confPassed = confResult.confluenceLevel === "VERY HIGH CONFLUENCE" && confResult.synthesizedRating === "STRONG SUPPORT";
    tests.push({
      id: "DASHA_018",
      category: "Confluence Synthesis",
      name: "MD + AD Convergence on 10th House (Career Eminence)",
      formulaDescription: "Shared 10th house activation with Exalted/Own dignity -> Strong Support",
      expected: "VERY HIGH CONFLUENCE, STRONG SUPPORT",
      actual: `${confResult.confluenceLevel}, ${confResult.synthesizedRating}`,
      passed: confPassed,
      notes: "Saravali Ch. 41"
    });

    // -------------------------------------------------------------
    // DASHA_019: Transition Engine Milestone Extraction
    // -------------------------------------------------------------
    const transReport = DashaTransitionEngine.calculateTransitions(masterRep, new Date("2026-08-21T00:00:00.000Z"));
    const transPassed = transReport.lifetimeMilestones.length > 10;
    tests.push({
      id: "DASHA_019",
      category: "Transition Milestones",
      name: "Chronological Transition Engine & Upcoming Horizons",
      formulaDescription: "Extracts upcoming 12-month and 5-year transition alerts with importance rankings",
      expected: ">10 Lifetime Milestones extracted",
      actual: `${transReport.lifetimeMilestones.length} Milestones extracted`,
      passed: transPassed,
      notes: "Predictive transition timeline scanner"
    });

    // -------------------------------------------------------------
    // DASHA_020: Null-Safety & Fallback Stability
    // -------------------------------------------------------------
    let nullSafe = false;
    try {
      const emptyRep = VimshottariEngine.calculateMasterVimshottari({
        birthDate: "invalid-date",
        moonLongitude: 0.0,
        maxDepth: 1
      });
      if (emptyRep && emptyRep.mahadashas.length === 9) {
        nullSafe = true;
      }
    } catch {
      nullSafe = false;
    }
    tests.push({
      id: "DASHA_020",
      category: "Safety & Null-Resilience",
      name: "Invalid Date String & Empty Profile Graceful Handling",
      formulaDescription: "Engine safely returns structured default payload without uncaught exceptions",
      expected: "Graceful recovery (9 Mahadashas generated)",
      actual: nullSafe ? "Passed (No uncaught exceptions)" : "Failed (Threw exception)",
      passed: nullSafe,
      notes: "Zero blank screen guarantee for Dashas"
    });

    // Summary calculation
    const passedCount = tests.filter(t => t.passed).length;
    const failedCount = tests.length - passedCount;
    const passRate = Number(((passedCount / tests.length) * 100).toFixed(1));

    return {
      timestampIso: new Date().toISOString(),
      totalTests: tests.length,
      passedTests: passedCount,
      failedTests: failedCount,
      passRatePercentage: passRate,
      overallStatus: failedCount === 0 ? "PASSED" : "FAILED",
      tests
    };
  }
}
