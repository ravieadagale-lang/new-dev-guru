import { degToDMS, normalizeDeg } from "./astronomyMath";

export type AyanamsaSystemName =
  | "lahiri"
  | "true_chitrapaksha"
  | "krishnamurti"
  | "kp"
  | "raman"
  | "fagan_bradley"
  | "yukteshwar"
  | "deluce"
  | "ushashashi"
  | "sayana"
  | string;

export interface AyanamsaResult {
  system: string;
  ayanamsa_value: number;
  ayanamsa_dms: string;
  jd: number;
}

// J2000.0 epoch base values (degrees at JD 2451545.0)
const J2000_JD = 2451545.0;

// Standard precession rate in arcseconds per tropical year (IAU model: ~50.290966"/yr)
const PRECESSION_RATE_DEG_PER_YEAR = 50.290966 / 3600.0;
const DAYS_PER_TROPICAL_YEAR = 365.24219878;

const AYANAMSA_J2000_OFFSETS: Record<string, number> = {
  lahiri: 23.85306,             // ~23° 51' 11"
  true_chitrapaksha: 23.85306,  // True Chitra star calibration
  krishnamurti: 23.95000,       // ~23° 57' 00" (KP System)
  kp: 23.95000,
  raman: 22.38000,              // ~22° 22' 48" (B.V. Raman)
  fagan_bradley: 24.74000,      // Western Sidereal
  yukteshwar: 21.08000,         // Sri Yukteswar
  deluce: 27.81000,
  ushashashi: 19.33000,
  sayana: 0.0,
};

export class AyanamsaService {
  /**
   * Calculates ayanamsha value for a given Julian Day and system
   */
  public static calculateAyanamsa(
    jdUtc: number,
    system: AyanamsaSystemName = "lahiri"
  ): AyanamsaResult {
    const sysKey = (system || "lahiri").toLowerCase().trim();
    const baseOffset = AYANAMSA_J2000_OFFSETS[sysKey] ?? AYANAMSA_J2000_OFFSETS.lahiri;

    if (sysKey === "sayana") {
      return {
        system: "sayana",
        ayanamsa_value: 0.0,
        ayanamsa_dms: "00° 00' 00\"",
        jd: jdUtc,
      };
    }

    const elapsedYears = (jdUtc - J2000_JD) / DAYS_PER_TROPICAL_YEAR;
    const ayanamsaVal = normalizeDeg(baseOffset + elapsedYears * PRECESSION_RATE_DEG_PER_YEAR);

    return {
      system: sysKey,
      ayanamsa_value: ayanamsaVal,
      ayanamsa_dms: degToDMS(ayanamsaVal),
      jd: jdUtc,
    };
  }

  /**
   * Direct numeric helper: returns ayanamsa degrees given JD and optional system name
   */
  public static getAyanamsaValue(
    jdUtc: number,
    system: string = "Lahiri"
  ): number {
    return this.calculateAyanamsa(jdUtc, system as AyanamsaSystemName).ayanamsa_value;
  }

  /**
   * Overloaded parameter ordering: system first, then JD
   */
  public static getAyanamsa(
    system: string,
    jdUtc: number
  ): number {
    return this.calculateAyanamsa(jdUtc, system as AyanamsaSystemName).ayanamsa_value;
  }
}
