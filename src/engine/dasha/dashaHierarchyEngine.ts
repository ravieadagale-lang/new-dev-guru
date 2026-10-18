// src/engine/dasha/dashaHierarchyEngine.ts

import { DashaTierPeriod, MasterVimshottariReport, VimshottariEngine } from "./vimshottariEngine";

export interface SlicedTimelineInterval {
  id: string;
  level: number;
  lord: string;
  parentPath: string;
  startDateIso: string;
  endDateIso: string;
  startDateFormatted: string;
  endDateFormatted: string;
  durationDays: number;
  isCurrent: boolean;
  progressPercentage: number;
}

export type TimelineSliceWindow = "lifetime" | "20yr" | "10yr" | "5yr" | "1yr";

export class DashaHierarchyEngine {
  public static getActiveHierarchy(mahadashas: DashaTierPeriod[], targetMs: number) {
    return VimshottariEngine["findActiveHierarchy"]
      ? (VimshottariEngine as any).findActiveHierarchy(mahadashas, targetMs)
      : null;
  }

  /**
   * Slices the nested Vimshottari periods into linear chronological intervals
   * based on the selected timeline window (e.g. lifetime, 20yr, 10yr, 5yr, 1yr).
   */
  public static sliceTimeWindow(
    masterReport: MasterVimshottariReport,
    window: TimelineSliceWindow = "lifetime",
    referenceDate: Date = new Date()
  ): SlicedTimelineInterval[] {
    if (!masterReport || !masterReport.mahadashas) {
      return [];
    }

    const refMs = referenceDate.getTime();
    let minMs = -Infinity;
    let maxMs = Infinity;

    if (window === "1yr") {
      minMs = refMs - 182.5 * 86400000;
      maxMs = refMs + 182.5 * 86400000;
    } else if (window === "5yr") {
      minMs = refMs - 2.5 * 365.25 * 86400000;
      maxMs = refMs + 2.5 * 365.25 * 86400000;
    } else if (window === "10yr") {
      minMs = refMs - 5 * 365.25 * 86400000;
      maxMs = refMs + 5 * 365.25 * 86400000;
    } else if (window === "20yr") {
      minMs = refMs - 10 * 365.25 * 86400000;
      maxMs = refMs + 10 * 365.25 * 86400000;
    }

    const intervals: SlicedTimelineInterval[] = [];

    // Helper to format date safely
    const formatDate = (iso: string) => {
      try {
        return new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
      } catch {
        return iso;
      }
    };

    // For finer windows (1yr, 5yr, 10yr), show Antardashas; for larger (20yr, lifetime), show Antardashas or Mahadashas
    // Flatten both MD and AD periods where appropriate or flatten ADs with MD context
    masterReport.mahadashas.forEach((md, mdIdx) => {
      const mdStartMs = new Date(md.startDateIso).getTime();
      const mdEndMs = new Date(md.endDateIso).getTime();

      // Check if MD overlaps with window
      if (mdEndMs < minMs || mdStartMs > maxMs) {
        return;
      }

      // If Antardashas exist, include overlapping Antardashas
      if (md.subPeriods && md.subPeriods.length > 0) {
        md.subPeriods.forEach((ad, adIdx) => {
          const adStartMs = new Date(ad.startDateIso).getTime();
          const adEndMs = new Date(ad.endDateIso).getTime();

          if (adEndMs < minMs || adStartMs > maxMs) {
            return;
          }

          const isCurrent = refMs >= adStartMs && refMs < adEndMs;
          const progress = Math.min(
            100,
            Math.max(0, ((refMs - adStartMs) / (adEndMs - adStartMs)) * 100)
          );

          intervals.push({
            id: `ad-${mdIdx}-${adIdx}-${ad.lord}`,
            level: 2,
            lord: ad.lord,
            parentPath: `${md.lord} — ${ad.lord}`,
            startDateIso: ad.startDateIso,
            endDateIso: ad.endDateIso,
            startDateFormatted: formatDate(ad.startDateIso),
            endDateFormatted: formatDate(ad.endDateIso),
            durationDays: Math.round(ad.durationDays * 10) / 10,
            isCurrent,
            progressPercentage: isCurrent
              ? Math.round(progress)
              : refMs >= adEndMs
              ? 100
              : 0
          });
        });
      } else {
        // Fallback to Mahadasha level
        const isCurrent = refMs >= mdStartMs && refMs < mdEndMs;
        const progress = Math.min(
          100,
          Math.max(0, ((refMs - mdStartMs) / (mdEndMs - mdStartMs)) * 100)
        );

        intervals.push({
          id: `md-${mdIdx}-${md.lord}`,
          level: 1,
          lord: md.lord,
          parentPath: md.lord,
          startDateIso: md.startDateIso,
          endDateIso: md.endDateIso,
          startDateFormatted: formatDate(md.startDateIso),
          endDateFormatted: formatDate(md.endDateIso),
          durationDays: Math.round(md.durationDays * 10) / 10,
          isCurrent,
          progressPercentage: isCurrent
            ? Math.round(progress)
            : refMs >= mdEndMs
            ? 100
            : 0
        });
      }
    });

    return intervals;
  }
}

