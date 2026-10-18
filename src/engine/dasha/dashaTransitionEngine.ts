/**
 * Dasha Transition & Milestone Engine
 * Calculates past, current, and upcoming Dasha shifts across 12-month and 5-year horizons.
 * Provides alert importance flags, theme transitions, and chronological continuity records.
 */

import { DashaTierPeriod, MasterVimshottariReport } from "./vimshottariEngine";

export interface DashaTransitionEvent {
  id: string;
  periodLevel: "Mahadasha" | "Antardasha" | "Pratyantardasha";
  transitionDateIso: string;
  fromLord: string;
  toLord: string;
  parentMahadashaLord: string;
  daysUntilTransition: number;
  importanceLevel: "CRITICAL (Major Life Phase)" | "HIGH (Sub-Period Shift)" | "MODERATE (Pacing Shift)";
  status: "Completed" | "Imminent (<30 Days)" | "Upcoming";
  notes: string;
}

export interface TransitionMilestonesReport {
  currentDateIso: string;
  nextMajorMahadashaTransition: DashaTransitionEvent | null;
  nextAntardashaTransition: DashaTransitionEvent | null;
  upcomingTransitionsNext12Months: DashaTransitionEvent[];
  upcomingTransitionsNext5Years: DashaTransitionEvent[];
  lifetimeMilestones: DashaTransitionEvent[];
}

export class DashaTransitionEngine {
  /**
   * Scan master report and extract chronological transitions and upcoming milestones
   */
  public static calculateTransitions(
    masterReport: MasterVimshottariReport,
    targetDate: Date = new Date()
  ): TransitionMilestonesReport {
    const targetMs = targetDate.getTime();
    const transitions: DashaTransitionEvent[] = [];

    // 1. Traverse Mahadashas
    const mds = masterReport.mahadashas;
    for (let m = 0; m < mds.length - 1; m++) {
      const currentMD = mds[m];
      const nextMD = mds[m + 1];
      const transDateMs = new Date(currentMD.endDateIso).getTime();
      const daysUntil = Math.round((transDateMs - targetMs) / (86400000) * 10) / 10;

      let status: DashaTransitionEvent["status"] = "Upcoming";
      if (daysUntil < 0) {
        status = "Completed";
      } else if (daysUntil <= 30) {
        status = "Imminent (<30 Days)";
      }

      transitions.push({
        id: `trans-md-${m}`,
        periodLevel: "Mahadasha",
        transitionDateIso: currentMD.endDateIso,
        fromLord: currentMD.lord,
        toLord: nextMD.lord,
        parentMahadashaLord: currentMD.lord,
        daysUntilTransition: daysUntil,
        importanceLevel: "CRITICAL (Major Life Phase)",
        status,
        notes: `Mahadasha shift from ${currentMD.lord} to ${nextMD.lord}. Fundamentally resets planetary lens for ${masterReport.balanceAtBirth.totalLordYears} year cycle.`
      });
    }

    // 2. Traverse Antardashas within Mahadashas
    let adIndex = 0;
    for (const md of mds) {
      const ads = md.subPeriods || [];
      for (let a = 0; a < ads.length - 1; a++) {
        const currentAD = ads[a];
        const nextAD = ads[a + 1];
        const transDateMs = new Date(currentAD.endDateIso).getTime();
        const daysUntil = Math.round((transDateMs - targetMs) / (86400000) * 10) / 10;

        let status: DashaTransitionEvent["status"] = "Upcoming";
        if (daysUntil < 0) {
          status = "Completed";
        } else if (daysUntil <= 30) {
          status = "Imminent (<30 Days)";
        }

        transitions.push({
          id: `trans-ad-${adIndex++}`,
          periodLevel: "Antardasha",
          transitionDateIso: currentAD.endDateIso,
          fromLord: currentAD.lord,
          toLord: nextAD.lord,
          parentMahadashaLord: md.lord,
          daysUntilTransition: daysUntil,
          importanceLevel: "HIGH (Sub-Period Shift)",
          status,
          notes: `Antardasha transition under ${md.lord} Mahadasha from ${currentAD.lord} to ${nextAD.lord}. Modifies sub-theme focus.`
        });
      }
    }

    // Sort transitions chronologically
    transitions.sort((a, b) => new Date(a.transitionDateIso).getTime() - new Date(b.transitionDateIso).getTime());

    // Filter upcoming
    const futureTransitions = transitions.filter(t => t.daysUntilTransition >= 0);
    const nextMajorMD = futureTransitions.find(t => t.periodLevel === "Mahadasha") || null;
    const nextAD = futureTransitions.find(t => t.periodLevel === "Antardasha") || null;

    const next12Months = futureTransitions.filter(t => t.daysUntilTransition <= 365.25);
    const next5Years = futureTransitions.filter(t => t.daysUntilTransition <= 365.25 * 5);

    return {
      currentDateIso: targetDate.toISOString(),
      nextMajorMahadashaTransition: nextMajorMD,
      nextAntardashaTransition: nextAD,
      upcomingTransitionsNext12Months: next12Months,
      upcomingTransitionsNext5Years: next5Years,
      lifetimeMilestones: transitions
    };
  }
}
