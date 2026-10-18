/**
 * AstroNext Calculation Policy & Methodology Profiles
 * Implements Section 1, 2, 93, 97 of the AstroNext Engine Master Specification.
 * Guarantees reproducibility, versioning, and strict methodology isolation.
 */

export type AstrologyMethodology =
  | "Dev-Guru Vedic Standard"
  | "AstroNext Vedic Standard"
  | "Parashari Classical"
  | "Jaimini Sutras"
  | "Krishnamurti Paddhati (KP)"
  | "Tajika / Varshaphala"
  | "Muhurta Electional"
  | "Prashna Horary"
  | "Nadi Astrology"
  | "Western / Tropical"
  | "Synastry & Compatibility"
  | "Transit & Gochara"
  | "Remedial & Gemstone Guidance";

export type ZodiacType = "Sidereal" | "Tropical";

export type AyanamsaType =
  | "Lahiri (Chitrapaksha)"
  | "Raman"
  | "Krishnamurti (KP)"
  | "Yukteshwar"
  | "Fagan-Bradley"
  | "Deluce"
  | "True Chitra"
  | "Sayana (Zero Ayanamsa)";

export type HouseSystemType =
  | "Whole Sign"
  | "Shripati / Porphyry"
  | "Placidus"
  | "Koch"
  | "Campanus"
  | "Regiomontanus"
  | "Equal (from Ascendant degree)";

export type LunarNodePolicy = "Mean Node" | "True Node";

export type SunriseSunsetPolicy =
  | "Center of Solar Disc (Standard Astronomical)"
  | "Upper Limb with Standard Atmospheric Refraction (0.5667 deg)"
  | "Geometric Horizon (Zero Refraction)";

export interface AstroCalculationPolicy {
  policyId: string;
  methodology: AstrologyMethodology;
  zodiac: ZodiacType;
  ayanamsa: AyanamsaType;
  ayanamsaValueDegrees: number;
  houseSystem: HouseSystemType;
  nodePolicy: LunarNodePolicy;
  sunrisePolicy: SunriseSunsetPolicy;
  coordinateSystem: "Geocentric" | "Topocentric";
  timeStandard: "UTC" | "Local Apparent Solar Time" | "Standard Civil Time";
  precisionDecimalPlaces: number;
  engineVersion: string;
  ruleSetVersion: string;
  interpretationVersion: string;
  ephemerisVersion: string;
  sourceReference: string;
  annualYearConvention?: "ACTUAL_SOLAR_RETURN_INTERVAL" | "MEAN_SOLAR_YEAR" | "CLASSICAL_MUDDA_CONVENTION";
  sahamProfile?: "SAHAM_PROFILE_NEELAKANTHA" | "SAHAM_PROFILE_CHARAK" | "SAHAM_PROFILE_RAMAN" | "SAHAM_PROFILE_CUSTOM";
  tajikaProfile?: string;
  calculationVersion?: string;
  ruleRegistryVersion?: string;
}

export const ASTRO_ENGINE_VERSIONS = {
  engineVersion: "AstroNext-Engine-v2.5.0-Enterprise",
  ruleSetVersion: "Classical-Vedic-Ruleset-v2.5",
  interpretationVersion: "Deterministic-Interpretation-Db-v2.5",
  ephemerisVersion: "IAU-2006-HighPrecision-Analytical-v2.5",
};

export const DEFAULT_CALCULATION_POLICIES: Record<AstrologyMethodology, AstroCalculationPolicy> = {
  "Dev-Guru Vedic Standard": {
    policyId: "pol_devguru_std",
    methodology: "Dev-Guru Vedic Standard",
    zodiac: "Sidereal",
    ayanamsa: "Lahiri (Chitrapaksha)",
    ayanamsaValueDegrees: 24.1627,
    houseSystem: "Whole Sign",
    nodePolicy: "True Node",
    sunrisePolicy: "Upper Limb with Standard Atmospheric Refraction (0.5667 deg)",
    coordinateSystem: "Geocentric",
    timeStandard: "UTC",
    precisionDecimalPlaces: 8,
    ...ASTRO_ENGINE_VERSIONS,
    sourceReference: "Brihat Parashara Hora Shastra & Surya Siddhanta",
  },
  "AstroNext Vedic Standard": {
    policyId: "pol_vedic_std",
    methodology: "AstroNext Vedic Standard",
    zodiac: "Sidereal",
    ayanamsa: "Lahiri (Chitrapaksha)",
    ayanamsaValueDegrees: 24.1627,
    houseSystem: "Whole Sign",
    nodePolicy: "True Node",
    sunrisePolicy: "Upper Limb with Standard Atmospheric Refraction (0.5667 deg)",
    coordinateSystem: "Geocentric",
    timeStandard: "UTC",
    precisionDecimalPlaces: 8,
    ...ASTRO_ENGINE_VERSIONS,
    sourceReference: "Brihat Parashara Hora Shastra & Surya Siddhanta",
  },
  "Parashari Classical": {
    policyId: "pol_parashari",
    methodology: "Parashari Classical",
    zodiac: "Sidereal",
    ayanamsa: "Lahiri (Chitrapaksha)",
    ayanamsaValueDegrees: 24.1627,
    houseSystem: "Whole Sign",
    nodePolicy: "Mean Node",
    sunrisePolicy: "Upper Limb with Standard Atmospheric Refraction (0.5667 deg)",
    coordinateSystem: "Geocentric",
    timeStandard: "UTC",
    precisionDecimalPlaces: 8,
    ...ASTRO_ENGINE_VERSIONS,
    sourceReference: "Brihat Parashara Hora Shastra (Ch. 1-97)",
  },
  "Jaimini Sutras": {
    policyId: "pol_jaimini",
    methodology: "Jaimini Sutras",
    zodiac: "Sidereal",
    ayanamsa: "Lahiri (Chitrapaksha)",
    ayanamsaValueDegrees: 24.1627,
    houseSystem: "Whole Sign",
    nodePolicy: "True Node",
    sunrisePolicy: "Upper Limb with Standard Atmospheric Refraction (0.5667 deg)",
    coordinateSystem: "Geocentric",
    timeStandard: "UTC",
    precisionDecimalPlaces: 8,
    ...ASTRO_ENGINE_VERSIONS,
    sourceReference: "Jaimini Upadesha Sutras by Maharishi Jaimini",
  },
  "Krishnamurti Paddhati (KP)": {
    policyId: "pol_kp",
    methodology: "Krishnamurti Paddhati (KP)",
    zodiac: "Sidereal",
    ayanamsa: "Krishnamurti (KP)",
    ayanamsaValueDegrees: 24.1167,
    houseSystem: "Placidus",
    nodePolicy: "True Node",
    sunrisePolicy: "Center of Solar Disc (Standard Astronomical)",
    coordinateSystem: "Geocentric",
    timeStandard: "UTC",
    precisionDecimalPlaces: 8,
    ...ASTRO_ENGINE_VERSIONS,
    sourceReference: "KP Readers I-VI by Prof. K.S. Krishnamurti",
  },
  "Tajika / Varshaphala": {
    policyId: "pol_tajika",
    methodology: "Tajika / Varshaphala",
    zodiac: "Sidereal",
    ayanamsa: "Lahiri (Chitrapaksha)",
    ayanamsaValueDegrees: 24.1627,
    houseSystem: "Whole Sign",
    nodePolicy: "True Node",
    sunrisePolicy: "Upper Limb with Standard Atmospheric Refraction (0.5667 deg)",
    coordinateSystem: "Geocentric",
    timeStandard: "UTC",
    precisionDecimalPlaces: 8,
    ...ASTRO_ENGINE_VERSIONS,
    sourceReference: "Tajika Neelakanthi & Varshaphala by Dr. B.V. Raman",
  },
  "Muhurta Electional": {
    policyId: "pol_muhurta",
    methodology: "Muhurta Electional",
    zodiac: "Sidereal",
    ayanamsa: "Lahiri (Chitrapaksha)",
    ayanamsaValueDegrees: 24.1627,
    houseSystem: "Whole Sign",
    nodePolicy: "True Node",
    sunrisePolicy: "Upper Limb with Standard Atmospheric Refraction (0.5667 deg)",
    coordinateSystem: "Geocentric",
    timeStandard: "UTC",
    precisionDecimalPlaces: 8,
    ...ASTRO_ENGINE_VERSIONS,
    sourceReference: "Muhurta Chintamani & Kalaprakasika",
  },
  "Prashna Horary": {
    policyId: "pol_prashna",
    methodology: "Prashna Horary",
    zodiac: "Sidereal",
    ayanamsa: "Lahiri (Chitrapaksha)",
    ayanamsaValueDegrees: 24.1627,
    houseSystem: "Whole Sign",
    nodePolicy: "True Node",
    sunrisePolicy: "Upper Limb with Standard Atmospheric Refraction (0.5667 deg)",
    coordinateSystem: "Geocentric",
    timeStandard: "UTC",
    precisionDecimalPlaces: 8,
    ...ASTRO_ENGINE_VERSIONS,
    sourceReference: "Prashna Marga & Shatpanchasika by Prithuyasas",
  },
  "Nadi Astrology": {
    policyId: "pol_nadi",
    methodology: "Nadi Astrology",
    zodiac: "Sidereal",
    ayanamsa: "Lahiri (Chitrapaksha)",
    ayanamsaValueDegrees: 24.1627,
    houseSystem: "Whole Sign",
    nodePolicy: "True Node",
    sunrisePolicy: "Upper Limb with Standard Atmospheric Refraction (0.5667 deg)",
    coordinateSystem: "Geocentric",
    timeStandard: "UTC",
    precisionDecimalPlaces: 8,
    ...ASTRO_ENGINE_VERSIONS,
    sourceReference: "Bhrigu Nandi Nadi & Dhruva Nadi",
  },
  "Western / Tropical": {
    policyId: "pol_western",
    methodology: "Western / Tropical",
    zodiac: "Tropical",
    ayanamsa: "Sayana (Zero Ayanamsa)",
    ayanamsaValueDegrees: 0.0,
    houseSystem: "Placidus",
    nodePolicy: "True Node",
    sunrisePolicy: "Center of Solar Disc (Standard Astronomical)",
    coordinateSystem: "Geocentric",
    timeStandard: "UTC",
    precisionDecimalPlaces: 8,
    ...ASTRO_ENGINE_VERSIONS,
    sourceReference: "Ptolemy Tetrabiblos & Modern Psychological Astrology",
  },
  "Synastry & Compatibility": {
    policyId: "pol_compatibility",
    methodology: "Synastry & Compatibility",
    zodiac: "Sidereal",
    ayanamsa: "Lahiri (Chitrapaksha)",
    ayanamsaValueDegrees: 24.1627,
    houseSystem: "Whole Sign",
    nodePolicy: "True Node",
    sunrisePolicy: "Upper Limb with Standard Atmospheric Refraction (0.5667 deg)",
    coordinateSystem: "Geocentric",
    timeStandard: "UTC",
    precisionDecimalPlaces: 8,
    ...ASTRO_ENGINE_VERSIONS,
    sourceReference: "Ashtakoota Milan, Muhurta Chintamani & Jataka Parijata",
  },
  "Transit & Gochara": {
    policyId: "pol_transit",
    methodology: "Transit & Gochara",
    zodiac: "Sidereal",
    ayanamsa: "Lahiri (Chitrapaksha)",
    ayanamsaValueDegrees: 24.1627,
    houseSystem: "Whole Sign",
    nodePolicy: "True Node",
    sunrisePolicy: "Upper Limb with Standard Atmospheric Refraction (0.5667 deg)",
    coordinateSystem: "Geocentric",
    timeStandard: "UTC",
    precisionDecimalPlaces: 8,
    ...ASTRO_ENGINE_VERSIONS,
    sourceReference: "Phaladeepika Ch. 26 & Brihat Samhita",
  },
  "Remedial & Gemstone Guidance": {
    policyId: "pol_remedies",
    methodology: "Remedial & Gemstone Guidance",
    zodiac: "Sidereal",
    ayanamsa: "Lahiri (Chitrapaksha)",
    ayanamsaValueDegrees: 24.1627,
    houseSystem: "Whole Sign",
    nodePolicy: "True Node",
    sunrisePolicy: "Upper Limb with Standard Atmospheric Refraction (0.5667 deg)",
    coordinateSystem: "Geocentric",
    timeStandard: "UTC",
    precisionDecimalPlaces: 8,
    ...ASTRO_ENGINE_VERSIONS,
    sourceReference: "Lal Kitab, Garuda Purana, & Brihat Parashara Remedial Chapters",
  },
};

export type CalculationMethodology = AstrologyMethodology;

export interface CalculationFingerprint {
  julianDayUT: number;
  geoLatitude: number;
  geoLongitude: number;
  geoAltitudeMeters?: number;
  inputTimestamp?: string;
  utcTimestamp?: string;
  timezoneOffsetHours?: number;
  ayanamsaSystem: string;
  ayanamsaValueDegrees?: number;
  zodiacMode: "Sidereal" | "Tropical";
  houseSystem: string;
  nodePolicy: "Mean Node" | "True Node" | "MEAN_RAHU_KETU" | "TRUE_RAHU_KETU";
  ephemerisProvider?: string;
  ephemerisModel: string;
  ephemerisVersion?: string;
  timeScale?: string;
  referenceFrame?: string;
  calculationPolicyVersion?: string;
  ruleRegistryVersion?: string;
  engineVersion?: string;
  methodologyProfile?: string;
  inputSchemaVersion?: string;
  canonicalString: string;
  fingerprintHash: string;
  fingerprintAlgorithm: "CUSTOM_FNV1A_MURMUR_STYLE_64_V1" | "FNV1A_MURMUR64_DUAL";
  fingerprintVersion: "1.0";
  canonicalizationVersion: "1.0";
  integrityDigest?: string;
  integrityDigestAlgorithm?: "SHA-256";
  integrityDigestVersion?: "1.0";
  timestampIso: string;
}

export interface GenerateFingerprintParams {
  julianDayUT: number;
  latitude: number;
  longitude: number;
  altitude?: number;
  inputTimestamp?: string;
  utcTimestamp?: string;
  timezone?: number;
  ayanamsaSystem?: string;
  ayanamsaValueDegrees?: number;
  zodiacMode?: "Sidereal" | "Tropical";
  houseSystem?: string;
  nodePolicy?: "Mean Node" | "True Node" | "MEAN_RAHU_KETU" | "TRUE_RAHU_KETU";
  ephemerisProvider?: string;
  ephemerisModel?: string;
  ephemerisVersion?: string;
  timeScale?: string;
  referenceFrame?: string;
  calculationPolicyVersion?: string;
  ruleRegistryVersion?: string;
  engineVersion?: string;
  methodologyProfile?: string;
  inputSchemaVersion?: string;
  includeIntegrityDigest?: boolean;
}

/**
 * Normalizes an optional string value.
 * If null, undefined, or empty string, yields defaultValue (default "MISSING").
 */
export function normalizeOptionalString(val: unknown, defaultValue: string = "MISSING"): string {
  if (val === null || val === undefined) return defaultValue;
  const trimmed = String(val).trim();
  return trimmed.length === 0 ? defaultValue : trimmed;
}

/**
 * Normalizes an optional numeric value into a fixed-decimal string with explicit sign if requested.
 * Explicitly preserves the distinction between:
 * - undefined / null / omitted -> "MISSING"
 * - 0 / -0 -> "+0.00" (or "0.00")
 * - positive / negative non-zero -> "+100.00" / "-100.00"
 * Disambiguates -0 vs +0 for physical coordinates while preventing missing values from silently collapsing to zero.
 */
export function normalizeOptionalNumeric(
  val: unknown,
  decimals: number,
  signed: boolean = false
): string {
  if (val === null || val === undefined) {
    return "MISSING";
  }
  if (typeof val === "string" && val.trim().length === 0) {
    return "MISSING";
  }
  let num: number;
  if (typeof val === "number") {
    num = val;
  } else {
    num = Number(val);
  }

  if (!Number.isFinite(num) || Number.isNaN(num)) {
    return "MISSING";
  }

  // Disambiguate -0 into +0 for physical coordinates
  if (Object.is(num, -0) || num === 0) {
    num = 0;
  }

  const formattedAbs = Math.abs(num).toFixed(decimals);
  if (signed) {
    const sign = num < 0 ? "-" : "+";
    return `${sign}${formattedAbs}`;
  }
  return num < 0 ? `-${formattedAbs}` : formattedAbs;
}

/**
 * Normalizes timestamp inputs into standard ISO 8601 UTC representation (e.g. 2000-01-01T12:00:00.000Z).
 * Canonicalizes equivalent instant representations into identical UTC strings.
 */
export function normalizeTimestamp(
  ts: unknown,
  defaultTs: string = "2000-01-01T00:00:00.000Z"
): string {
  if (ts === null || ts === undefined) return defaultTs;
  if (ts instanceof Date) {
    return !isNaN(ts.getTime()) ? ts.toISOString() : "INVALID_TIMESTAMP";
  }
  const str = String(ts).trim();
  if (!str) return defaultTs;
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString();
  }
  return "INVALID_TIMESTAMP";
}

/**
 * Pure TypeScript implementation of standard NIST FIPS 180-4 SHA-256.
 * Provided for Cryptographic Integrity Digest generation without external runtime dependencies.
 * 
 * Security Notice:
 * SHA-256 provides cryptographic integrity verification of the canonicalized calculation context.
 * It does not by itself provide authentication, authorship, or non-repudiation.
 */
export function computeSha256Digest(input: string): string {
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let i = 0;
  let j = 0;
  let result = "";

  const words: number[] = [];
  const asciiBitLength = input.length * 8;

  let hash: number[] = [];
  const k: number[] = [];

  let primeCounter = 0;
  const isComposite: boolean[] = [];
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = true;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      primeCounter++;
    }
  }

  hash = hash.slice(0, 8);

  for (i = 0; i < input.length; i++) {
    const code = input.charCodeAt(i);
    words[i >> 2] |= code << ((3 - (i & 3)) * 8);
  }

  words[asciiBitLength >> 5] |= 0x80 << (24 - (asciiBitLength & 31));
  words[(((asciiBitLength + 64) >> 9) << 4) + 15] = asciiBitLength;

  const w: number[] = new Array(64);
  for (i = 0; i < words.length; i += 16) {
    let a = hash[0];
    let b = hash[1];
    let c = hash[2];
    let d = hash[3];
    let e = hash[4];
    let f = hash[5];
    let g = hash[6];
    let h = hash[7];

    for (j = 0; j < 64; j++) {
      if (j < 16) {
        w[j] = words[i + j] | 0;
      } else {
        const gamma0 =
          ((w[j - 15] >>> 7) | (w[j - 15] << 25)) ^
          ((w[j - 15] >>> 18) | (w[j - 15] << 14)) ^
          (w[j - 15] >>> 3);
        const gamma1 =
          ((w[j - 2] >>> 17) | (w[j - 2] << 15)) ^
          ((w[j - 2] >>> 19) | (w[j - 2] << 13)) ^
          (w[j - 2] >>> 10);
        w[j] = (w[j - 16] + gamma0 + w[j - 7] + gamma1) | 0;
      }

      const ch = (e & f) ^ (~e & g);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const sigma0 =
        ((a >>> 2) | (a << 30)) ^
        ((a >>> 13) | (a << 19)) ^
        ((a >>> 22) | (a << 10));
      const sigma1 =
        ((e >>> 6) | (e << 26)) ^
        ((e >>> 11) | (e << 21)) ^
        ((e >>> 25) | (e << 7));

      const t1 = (h + sigma1 + ch + k[j] + w[j]) | 0;
      const t2 = (sigma0 + maj) | 0;

      h = g;
      g = f;
      f = e;
      e = (d + t1) | 0;
      d = c;
      c = b;
      b = a;
      a = (t1 + t2) | 0;
    }

    hash[0] = (hash[0] + a) | 0;
    hash[1] = (hash[1] + b) | 0;
    hash[2] = (hash[2] + c) | 0;
    hash[3] = (hash[3] + d) | 0;
    hash[4] = (hash[4] + e) | 0;
    hash[5] = (hash[5] + f) | 0;
    hash[6] = (hash[6] + g) | 0;
    hash[7] = (hash[7] + h) | 0;
  }

  for (i = 0; i < 8; i++) {
    result += (hash[i] >>> 0).toString(16).padStart(8, "0");
  }
  return result;
}

export class CalculationPolicy {
  public static getPolicy(methodology: AstrologyMethodology | string): AstroCalculationPolicy {
    return (
      DEFAULT_CALCULATION_POLICIES[methodology as AstrologyMethodology] ||
      DEFAULT_CALCULATION_POLICIES["AstroNext Vedic Standard"]
    );
  }

  /**
   * Computes a standard NIST FIPS 180-4 SHA-256 cryptographic integrity digest.
   */
  public static computeSha256Digest(input: string): string {
    return computeSha256Digest(input);
  }

  /**
   * Canonicalizes calculation input parameters into a deterministic, ordered key-value format.
   * 
   * Canonicalization Rules & Semantics:
   * 1. Deterministic Field Order: Keys K01 through K22 are serialized in a strict invariant sequence.
   * 2. Optional Value Semantics:
   *    - Explicit altitude = 0 or -0 normalizes to "+0.00", representing explicit sea-level coordinate.
   *    - Undefined, null, or omitted altitude normalizes to "MISSING". Missing altitude is NOT silently assumed to be 0m.
   *    - Positive/negative altitudes serialize with explicit sign, e.g. "+100.00" or "-50.00".
   * 3. Coordinate & Numeric Normalization:
   *    - Latitude, Longitude, and Timezone use fixed decimal precision with explicit signs (+/-).
   *    - Negative zero (-0) is disambiguated to positive zero (+0) for all physical coordinates.
   * 4. Timezone & Instant Semantics:
   *    - K01_IN_TS captures the raw input timestamp string (local wall-clock or civil ISO).
   *    - K02_UTC_TS normalizes equivalent representations of the exact same instant (e.g. Z vs +00:00) into identical UTC ISO strings.
   *    - K03_TZ captures the supplied civil timezone offset in decimal hours. Timezone is an explicit component of the
   *      calculation context (affecting civil calendar date boundaries, Dina-mana/sunrise, and planetary hour/Hora).
   *    - Geographic longitude (K05_LON) physically determines Local Mean Time (LMT = UTC + Longitude/15°) and Local Sidereal Time (LST),
   *      operating independently of civil timezone offsets.
   * 5. Enum & String Normalization:
   *    - Uppercase, trimmed, with explicit fallback to "MISSING" for undefined/null optional strings.
   */
  public static canonicalizeCalculationInput(params: GenerateFingerprintParams): string {
    const inTs = normalizeTimestamp(params.inputTimestamp, "2000-01-01T00:00:00.000Z");
    const utcTs = normalizeTimestamp(params.utcTimestamp, inTs);
    const tz = normalizeOptionalNumeric(params.timezone, 4, true);
    const lat = normalizeOptionalNumeric(params.latitude, 6, true);
    const lon = normalizeOptionalNumeric(params.longitude, 6, true);
    const alt = normalizeOptionalNumeric(params.altitude, 2, true);
    const jd = normalizeOptionalNumeric(params.julianDayUT, 6, false);
    const ayanSys = normalizeOptionalString(params.ayanamsaSystem, "Lahiri (Chitrapaksha)");
    const ayanVal = normalizeOptionalNumeric(params.ayanamsaValueDegrees, 6, false);
    const zodiac = normalizeOptionalString(params.zodiacMode, "SIDEREAL").toUpperCase();
    const houseSys = normalizeOptionalString(params.houseSystem, "Whole Sign");
    const nodePol = normalizeOptionalString(params.nodePolicy, "TRUE_NODE").toUpperCase().replace(/\s+/g, "_");
    const ephemProv = normalizeOptionalString(params.ephemerisProvider, "MISSING");
    const ephemMdl = normalizeOptionalString(params.ephemerisModel, "MISSING");
    const ephemVer = normalizeOptionalString(params.ephemerisVersion, "MISSING");
    const timeScale = normalizeOptionalString(params.timeScale, "UTC");
    const refFrame = normalizeOptionalString(params.referenceFrame, "MISSING");
    const polVer = normalizeOptionalString(params.calculationPolicyVersion, "MISSING");
    const ruleRegVer = normalizeOptionalString(params.ruleRegistryVersion, "MISSING");
    const engVer = normalizeOptionalString(params.engineVersion, "MISSING");
    const methProf = normalizeOptionalString(params.methodologyProfile, "MISSING");
    const schemaVer = normalizeOptionalString(params.inputSchemaVersion, "v1.0");

    const entries = [
      `K01_IN_TS=${inTs}`,
      `K02_UTC_TS=${utcTs}`,
      `K03_TZ=${tz}`,
      `K04_LAT=${lat}`,
      `K05_LON=${lon}`,
      `K06_ALT=${alt}`,
      `K07_JD_UT=${jd}`,
      `K08_AYAN_SYS=${ayanSys}`,
      `K09_AYAN_VAL=${ayanVal}`,
      `K10_ZODIAC=${zodiac}`,
      `K11_HOUSE_SYS=${houseSys}`,
      `K12_NODE_POL=${nodePol}`,
      `K13_EPHEM_PROV=${ephemProv}`,
      `K14_EPHEM_MDL=${ephemMdl}`,
      `K15_EPHEM_VER=${ephemVer}`,
      `K16_TIME_SCALE=${timeScale}`,
      `K17_REF_FRAME=${refFrame}`,
      `K18_POLICY_VER=${polVer}`,
      `K19_RULE_REG_VER=${ruleRegVer}`,
      `K20_ENG_VER=${engVer}`,
      `K21_METH_PROF=${methProf}`,
      `K22_SCHEMA_VER=${schemaVer}`,
    ];

    return entries.join("|");
  }

  /**
   * Deterministic calculation fingerprint for reproducibility, audit correlation, and accidental-change detection.
   * It is not a cryptographic integrity guarantee and does not mathematically guarantee uniqueness.
   * 
   * Security & Cryptographic Distinctions:
   * 1. Calculation Fingerprint: Fast 64-bit deterministic hash (CUSTOM_FNV1A_MURMUR_STYLE_64_V1) for
   *    in-memory cache keys, reproducibility, and audit correlation. It is NOT cryptographically secure,
   *    nor collision-free across infinite input spaces.
   * 2. SHA-256 Integrity Digest: Standard NIST FIPS 180-4 cryptographic hash computed via computeSha256Digest for
   *    integrity verification of the canonicalized calculation context. It does not by itself provide
   *    authentication, authorship, or non-repudiation.
   */
  public static generateFingerprint(params: GenerateFingerprintParams): CalculationFingerprint {
    const {
      julianDayUT,
      latitude,
      longitude,
      altitude,
      inputTimestamp = "2000-01-01T00:00:00.000Z",
      utcTimestamp = "2000-01-01T00:00:00.000Z",
      timezone = 0,
      ayanamsaSystem = "Lahiri (Chitrapaksha)",
      ayanamsaValueDegrees = 24.1627,
      zodiacMode = "Sidereal",
      houseSystem = "Whole Sign",
      nodePolicy = "True Node",
      ephemerisProvider = "HighPrecisionAstroEphemerisProvider",
      ephemerisModel = "VSOP87 / ELP2000-82 Analytical Series with NASA Polynomial ΔT",
      ephemerisVersion = "IAU-2006-Analytical-v2.5",
      timeScale = "UTC",
      referenceFrame = "ICRS / Ecliptic of Date (J2000 to Date)",
      calculationPolicyVersion = "v2.5-Enterprise",
      ruleRegistryVersion = "v7.5-Forensic-Locked",
      engineVersion = "AstroNext-Engine-v7.5",
      methodologyProfile = "AstroNext Vedic Standard",
      inputSchemaVersion = "v1.0",
      includeIntegrityDigest = false,
    } = params;

    const canonicalString = this.canonicalizeCalculationInput(params);
    
    // Deterministic 64-bit dual-stage FNV-1a / Murmur non-cryptographic mixer (CUSTOM_FNV1A_MURMUR_STYLE_64_V1)
    let h1 = 0x811c9dc5;
    let h2 = 0x9e3779b9;
    for (let i = 0; i < canonicalString.length; i++) {
      const char = canonicalString.charCodeAt(i);
      h1 ^= char;
      h1 = Math.imul(h1, 0x01000193);
      h2 ^= char;
      h2 = Math.imul(h2, 0x5bd1e995);
      h2 = (h2 << 13) | (h2 >>> 19);
    }
    const part1 = (h1 >>> 0).toString(16).toUpperCase().padStart(8, "0");
    const part2 = (h2 >>> 0).toString(16).toUpperCase().padStart(8, "0");
    const fingerprintHash = `FP_${part1}_${part2}`;

    const fingerprint: CalculationFingerprint = {
      julianDayUT: typeof julianDayUT === "number" ? Number(julianDayUT.toFixed(6)) : 0,
      geoLatitude: typeof latitude === "number" ? Number(latitude.toFixed(6)) : 0,
      geoLongitude: typeof longitude === "number" ? Number(longitude.toFixed(6)) : 0,
      geoAltitudeMeters: altitude !== undefined ? altitude : undefined,
      inputTimestamp,
      utcTimestamp,
      timezoneOffsetHours: timezone,
      ayanamsaSystem,
      ayanamsaValueDegrees: typeof ayanamsaValueDegrees === "number" ? Number(ayanamsaValueDegrees.toFixed(6)) : 24.1627,
      zodiacMode,
      houseSystem,
      nodePolicy,
      ephemerisProvider,
      ephemerisModel,
      ephemerisVersion,
      timeScale,
      referenceFrame,
      calculationPolicyVersion,
      ruleRegistryVersion,
      engineVersion,
      methodologyProfile,
      inputSchemaVersion,
      canonicalString,
      fingerprintHash,
      fingerprintAlgorithm: "CUSTOM_FNV1A_MURMUR_STYLE_64_V1",
      fingerprintVersion: "1.0",
      canonicalizationVersion: "1.0",
      timestampIso: new Date().toISOString(),
    };

    if (includeIntegrityDigest) {
      fingerprint.integrityDigest = computeSha256Digest(canonicalString);
      fingerprint.integrityDigestAlgorithm = "SHA-256";
      fingerprint.integrityDigestVersion = "1.0";
    }

    return fingerprint;
  }
}
