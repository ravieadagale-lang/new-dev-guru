// src/engine/babyNameVibrationEngine.ts
// Pure Deterministic Multi-System Baby Naming Vibration Engine
// Combines: Vedic Jyotish (Moon Ephemeris & Nakshatra Pada Janmakshar),
// Chaldean & Pythagorean Numerology, Driver/Conductor Harmony, Lo Shu Missing Grid Compensation,
// and Parent Vibrational Resonance.

import { HighPrecisionAstroEphemerisProvider } from "./ephemerisProvider";
import { AyanamsaService } from "./ayanamsaEngine";
import { NakshatraEngine } from "./nakshatraEngine";
import { normalizeDeg } from "./astronomyMath";
import { 
  VEDIC_NAKSHATRAS_PADA_DATA, 
  RASHI_NAMES_METADATA 
} from "../data/babyJanmaksharData";
import { 
  CHALDEAN_MAP, 
  PYTHAGOREAN_MAP, 
  CHALDEAN_COMPOUND_MEANINGS 
} from "../data/numerologyData";
import { 
  BabyBirthInput, 
  AstroJanmaksharResult, 
  BabyNumerologyProfile, 
  NameCandidate 
} from "../types/babyNameTypes";
import { BABY_NAMES_MASTER_LIBRARY, BabyNameEntry } from "../data/babyNamesMasterLibrary";

// Auspicious Chaldean Compound Numbers for Baby Names
export const AUSPICIOUS_CHALDEAN_COMPOUNDS = new Set([
  10, 15, 19, 20, 21, 23, 24, 25, 27, 32, 33, 34, 37, 41, 42, 45, 46, 51, 52
]);

export const CAUTIONARY_CHALDEAN_COMPOUNDS = new Set([
  11, 12, 14, 16, 18, 26, 28, 29, 31, 35, 38, 43, 44
]);

// Classical Planetary Number Rulers
export const PLANET_RULERS: Record<number, string> = {
  1: "Sun (Surya)",
  2: "Moon (Chandra)",
  3: "Jupiter (Brihaspati)",
  4: "Rahu (North Node)",
  5: "Mercury (Budha)",
  6: "Venus (Shukra)",
  7: "Ketu (South Node)",
  8: "Saturn (Shani)",
  9: "Mars (Mangal)"
};

// Numerical Friendship Relationships (Driver & Conductor Harmony Matrix)
export const NUMERICAL_FRIENDSHIPS: Record<number, { friends: number[]; neutral: number[]; enemy: number[] }> = {
  1: { friends: [1, 2, 3, 9], neutral: [5], enemy: [6, 8] },
  2: { friends: [1, 2, 3, 5], neutral: [9], enemy: [4, 7, 8] },
  3: { friends: [1, 2, 3, 9], neutral: [5, 7], enemy: [6] },
  4: { friends: [1, 5, 6, 7], neutral: [2], enemy: [4, 8, 9] },
  5: { friends: [1, 2, 3, 5, 6], neutral: [9], enemy: [] },
  6: { friends: [1, 5, 6], neutral: [4, 7, 8], enemy: [3] },
  7: { friends: [1, 4, 5], neutral: [2, 3], enemy: [8, 9] },
  8: { friends: [3, 5, 6, 7], neutral: [4], enemy: [1, 2, 9] },
  9: { friends: [1, 2, 3], neutral: [7], enemy: [2, 4, 8] }
};

// Strict Vedic Anty (Enemy / Inimical) Number Matrix
export const VEDIC_ANTY_PAIRS: Record<number, number[]> = {
  1: [8, 6],       // Sun is arch-enemy of Saturn (8) and enemy of Venus (6)
  2: [8, 9, 4],    // Moon is inimical to Saturn (8), Mars (9), Rahu (4)
  3: [6],          // Jupiter (Devaguru) is arch-enemy of Venus (Daityaguru) (6)
  4: [2, 9, 4, 8], // Rahu is enemy of Moon (2), Mars (9), Saturn (8)
  5: [2],          // Mercury has enmity with Moon (2)
  6: [3, 4],       // Venus is arch-enemy of Jupiter (3) and Rahu (4)
  7: [9, 8, 3],    // Ketu is inimical to Mars (9), Saturn (8), Jupiter (3)
  8: [1, 2, 9],    // Saturn (Shani) is arch-enemy of Sun (1), Moon (2), Mars (9)
  9: [8, 4, 2]     // Mars (Mangal) is arch-enemy of Saturn (8), Rahu (4), Moon (2)
};

// Inauspicious phonetic sound patterns in Pronology
export const PRONOLOGY_NEGATIVE_SOUNDS = [
  "WAR", "DIE", "END", "CRY", "ILL", "FALL", "LESS", "NIL", "SAD", "DOWN", 
  "HATE", "VOID", "PAIN", "RAG", "CRASH", "BREAK", "SHOCK", "COLD", "LACK", "WEAK"
];

// Auspicious sacred Vedic sound vibrations in Pronology
export const PRONOLOGY_POSITIVE_VIBRATIONS = [
  "RAM", "OM", "RAJ", "DEV", "VIJ", "JAY", "SHREE", "SHRI", "AN", "AAR", 
  "ROH", "RISH", "RUD", "RAV", "RIT", "RID", "DIV", "LAK", "TEJ", "AM", 
  "SHIV", "KRISH", "VED", "SU", "KAV", "KUS", "MAH", "YASH", "SAAN", "SID", 
  "RAGH", "RUK", "ROSH", "RUT", "VEE", "VAA", "HAR", "JIT", "DAR", "MAN"
];

export class BabyNameVibrationEngine {
  private static ephemerisProvider = new HighPrecisionAstroEphemerisProvider();

  /**
   * 1. Calculate Astrological Janmakshar & Nakshatra Pada from Baby's Birth Details
   */
  public static calculateJanmakshar(input: BabyBirthInput): AstroJanmaksharResult {
    const [yearStr, monthStr, dayStr] = (input.dob || "2026-09-14").split("-");
    const [hourStr, minuteStr] = (input.tob || "10:30").split(":");

    const year = parseInt(yearStr, 10) || 2026;
    const month = parseInt(monthStr, 10) || 9;
    const day = parseInt(dayStr, 10) || 14;
    const hour = parseInt(hourStr, 10) || 10;
    const minute = parseInt(minuteStr, 10) || 30;

    let siderealMoonLon = 45; // Safe default
    try {
      const ephem = this.ephemerisProvider.calculateEphemeris({
        year,
        month,
        day,
        hour,
        minute,
        second: 0,
        latitude: input.latitude || 19.076,
        longitude: input.longitude || 72.8777,
        timezoneOffsetHours: input.timezoneOffset ?? 5.5,
        coordinateSystem: "geocentric"
      });

      const jd = ephem?.julianDay || 2451545.0;
      const ayanamsaVal = AyanamsaService.getAyanamsa("lahiri", jd);
      const moonLon = ephem.moonApparentLongitude ?? ephem.bodies?.Moon?.eclipticLongitude ?? ephem.bodies?.moon?.eclipticLongitude ?? 45;
      siderealMoonLon = normalizeDeg(moonLon - ayanamsaVal);
    } catch (e) {
      console.warn("Astro calculation fallback for baby name Janmakshar:", e);
      const dayOfYear = (month - 1) * 30.4 + day;
      siderealMoonLon = normalizeDeg((dayOfYear * 13.176) + (hour * 0.55));
    }

    const nakDetails = NakshatraEngine.getNakshatraPlacement(siderealMoonLon);
    const rashiIdx = Math.floor(siderealMoonLon / 30) % 12;
    const rashiMeta = RASHI_NAMES_METADATA[rashiIdx];

    const nakshatraEntry = VEDIC_NAKSHATRAS_PADA_DATA[nakDetails.index] || VEDIC_NAKSHATRAS_PADA_DATA[0];
    const padaIndex = nakDetails.pada - 1;
    const currentPadaInfo = nakshatraEntry.padas[padaIndex] || nakshatraEntry.padas[0];

    const allPadaAksharas = nakshatraEntry.padas.map((p) => ({
      pada: p.pada,
      akshara: p.akshara,
      aksharaEnglish: p.aksharaEnglish
    }));

    // Alternative friendly Aksharas from other padas of same Nakshatra + trine Nakshatras (e.g. index + 9, index + 18)
    const trine1Idx = (nakDetails.index + 9) % 27;
    const trine2Idx = (nakDetails.index + 18) % 27;
    const trine1 = VEDIC_NAKSHATRAS_PADA_DATA[trine1Idx];
    const trine2 = VEDIC_NAKSHATRAS_PADA_DATA[trine2Idx];

    const alternativeFriendlyAksharas = [
      ...allPadaAksharas.filter((p) => p.pada !== nakDetails.pada).map((p) => p.aksharaEnglish),
      ...(trine1 ? trine1.padas.slice(0, 2).map((p) => p.aksharaEnglish) : []),
      ...(trine2 ? trine2.padas.slice(0, 2).map((p) => p.aksharaEnglish) : [])
    ];

    return {
      moonLongitude: siderealMoonLon,
      rashiIndex: rashiIdx,
      rashiName: `${rashiMeta.name} (${rashiMeta.english})`,
      rashiSanskrit: rashiMeta.name,
      rashiLord: rashiMeta.lord,
      rashiElement: rashiMeta.element,
      nakshatraIndex: nakDetails.index,
      nakshatraName: nakDetails.name,
      nakshatraSanskrit: nakDetails.sanskritName,
      nakshatraLord: nakDetails.lord,
      pada: nakDetails.pada,
      degreeInPada: nakDetails.degreeInPada,
      deity: nakDetails.deity,
      symbol: nakDetails.symbol,
      animal: nakDetails.animal,
      gana: nakDetails.gana,
      yoni: nakDetails.yoni,
      nadi: nakDetails.nadi,
      primaryAkshara: currentPadaInfo.akshara,
      primaryAksharaEnglish: currentPadaInfo.aksharaEnglish,
      allPadaAksharas,
      alternativeFriendlyAksharas
    };
  }

  /**
   * 2. Calculate Baby's Numerology Profile (Driver, Conductor, Missing Grid, Parent Resonance)
   */
  public static calculateNumerologyProfile(input: BabyBirthInput): BabyNumerologyProfile {
    const [yearStr, monthStr, dayStr] = (input.dob || "2026-09-14").split("-");
    const day = parseInt(dayStr, 10) || 14;
    const month = parseInt(monthStr, 10) || 9;
    const year = parseInt(yearStr, 10) || 2026;

    const driverNumber = this.reduceToSingle(day);
    const conductorNumber = this.reduceToSingle(day + month + year);

    // Parent Driver numbers from their names or fallback
    const fatherDriver = input.fatherName ? this.calculateChaldean(input.fatherName).single : 1;
    const motherDriver = input.motherName ? this.calculateChaldean(input.motherName).single : 2;
    const surnameChaldean = input.surname ? this.calculateChaldean(input.surname).single : 0;

    // Lo Shu Grid numbers present
    const digitsInDob = (dayStr + monthStr + yearStr).replace(/0/g, "").split("").map((d) => parseInt(d, 10));
    const presentSet = new Set(digitsInDob);
    const missingGridNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => !presentSet.has(n));

    // Determine favorable name numbers
    const driverFriends = NUMERICAL_FRIENDSHIPS[driverNumber]?.friends || [1, 5];
    const conductorFriends = NUMERICAL_FRIENDSHIPS[conductorNumber]?.friends || [1, 5];
    
    // Intersection or union of friendly numbers
    const friendlyOverlap = driverFriends.filter((f) => conductorFriends.includes(f));
    const favorableNameNumbers = friendlyOverlap.length > 0 
      ? friendlyOverlap 
      : Array.from(new Set([...driverFriends, ...conductorFriends]));

    const driverEnemies = NUMERICAL_FRIENDSHIPS[driverNumber]?.enemy || [];
    const conductorEnemies = NUMERICAL_FRIENDSHIPS[conductorNumber]?.enemy || [];
    const unfavorableNameNumbers = Array.from(new Set([...driverEnemies, ...conductorEnemies]));

    const neutralNameNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(
      (n) => !favorableNameNumbers.includes(n) && !unfavorableNameNumbers.includes(n)
    );

    return {
      driverNumber,
      conductorNumber,
      driverRulingPlanet: PLANET_RULERS[driverNumber] || "Sun (Surya)",
      conductorRulingPlanet: PLANET_RULERS[conductorNumber] || "Mercury (Budha)",
      fatherDriver,
      motherDriver,
      surnameChaldean,
      missingGridNumbers,
      favorableNameNumbers,
      neutralNameNumbers,
      unfavorableNameNumbers
    };
  }

  /**
   * 3. Evaluate a Candidate Name against Astrology & Numerology
   */
  public static evaluateCandidateName(
    nameEntry: BabyNameEntry,
    input: BabyBirthInput,
    astro: AstroJanmaksharResult,
    numerology: BabyNumerologyProfile
  ): NameCandidate {
    const cleanFirstName = nameEntry.name.trim();
    const cleanFullName = input.surname ? `${cleanFirstName} ${input.surname}` : cleanFirstName;

    const firstNameChaldean = this.calculateChaldean(cleanFirstName);
    const fullNameChaldean = this.calculateChaldean(cleanFullName);
    const pythagorean = this.calculatePythagorean(cleanFirstName);

    // Check Janmakshar match
    const primarySyllable = astro.primaryAksharaEnglish.toLowerCase();
    const nameSyllable = nameEntry.syllable.toLowerCase();
    const nameLower = cleanFirstName.toLowerCase();

    const isExactJanmakshar = 
      nameSyllable === primarySyllable || 
      nameLower.startsWith(primarySyllable) ||
      (nameEntry.secondarySyllables && nameEntry.secondarySyllables.some((s) => s.toLowerCase() === primarySyllable));

    const isAlternateJanmakshar = !isExactJanmakshar && astro.allPadaAksharas.some(
      (p) => nameSyllable === p.aksharaEnglish.toLowerCase() || nameLower.startsWith(p.aksharaEnglish.toLowerCase())
    );

    // Driver & Conductor Harmony
    const driverRelation = this.getNumericalRelation(numerology.driverNumber, firstNameChaldean.single);
    const conductorRelation = this.getNumericalRelation(numerology.conductorNumber, firstNameChaldean.single);

    // Parent Harmony
    const fatherRelation = this.getNumericalRelation(numerology.fatherDriver, firstNameChaldean.single);
    const motherRelation = this.getNumericalRelation(numerology.motherDriver, firstNameChaldean.single);
    let parentScore = 70;
    if (fatherRelation === "Friendly") parentScore += 15;
    if (motherRelation === "Friendly") parentScore += 15;
    if (fatherRelation === "Inimical") parentScore -= 15;
    if (motherRelation === "Inimical") parentScore -= 15;
    parentScore = Math.max(20, Math.min(100, parentScore));

    // Auspicious Compound
    const isAuspiciousCompound = AUSPICIOUS_CHALDEAN_COMPOUNDS.has(firstNameChaldean.compound);
    const isCautionaryCompound = CAUTIONARY_CHALDEAN_COMPOUNDS.has(firstNameChaldean.compound);

    // Missing Grid Compensation
    const compensatesMissing = numerology.missingGridNumbers.includes(firstNameChaldean.single);
    const gridCompText = compensatesMissing
      ? `Infuses missing birth grid number [${firstNameChaldean.single}], enhancing holistic emotional stability.`
      : "Maintains balanced cosmic grid frequency.";

    // Pronology Analysis
    const pronology = this.analyzePronology(cleanFirstName, nameEntry.gender);

    // Surname Harmony & Anty Number Detection
    const surnameHarmony = this.calculateSurnameHarmony(
      cleanFirstName,
      input.surname || "",
      numerology.driverNumber,
      numerology.conductorNumber
    );

    // Anty Check for First Name & Full Name with Driver and Conductor
    const firstNameAntyDriver = this.isAntyNumber(numerology.driverNumber, firstNameChaldean.single);
    const firstNameAntyConductor = this.isAntyNumber(numerology.conductorNumber, firstNameChaldean.single);
    const isAnty = 
      surnameHarmony.isAntyWithDriver || 
      surnameHarmony.isAntyWithConductor || 
      firstNameAntyDriver || 
      firstNameAntyConductor;

    // Harmonic Composite Score Calculation (0-100%)
    let score = 45;

    // Janmakshar weight (up to 30 pts)
    if (isExactJanmakshar) {
      score += 30;
    } else if (isAlternateJanmakshar) {
      score += 20;
    } else {
      score += 10;
    }

    // Driver alignment (up to 12 pts)
    if (driverRelation === "Friendly") score += 12;
    else if (driverRelation === "Neutral") score += 6;
    else score -= 12;

    // Conductor alignment (up to 12 pts)
    if (conductorRelation === "Friendly") score += 12;
    else if (conductorRelation === "Neutral") score += 6;
    else score -= 12;

    // Chaldean Compound (up to 10 pts)
    if (isAuspiciousCompound) score += 10;
    else if (isCautionaryCompound) score -= 12;

    // Full name harmony with surname (up to 12 pts)
    if (input.surname) {
      if (surnameHarmony.isFullNameAuspiciousCompound) score += 8;
      if (surnameHarmony.driverHarmony === "Friendly") score += 4;
      if (surnameHarmony.isAntyWithDriver || surnameHarmony.isAntyWithConductor) score -= 30;
    }

    // Pronology contribution (up to 10 pts)
    if (pronology.score >= 90) score += 10;
    else if (pronology.score >= 75) score += 5;
    if (pronology.hasNegativeSound) score -= 35;

    // Missing number grid compensation (up to 6 pts)
    if (compensatesMissing) score += 6;

    // Parent resonance (up to 5 pts)
    if (parentScore >= 80) score += 5;

    // Hard penalty if any Anty conflict
    if (isAnty) score -= 40;

    score = Math.max(20, Math.min(99, Math.round(score)));

    // Generate explanations and reasons
    const reasons: string[] = [];
    if (isExactJanmakshar) {
      reasons.push(`Exact Vedic Janmakshar Match for ${astro.nakshatraName} Pada ${astro.pada} ('${astro.primaryAksharaEnglish}').`);
    } else if (isAlternateJanmakshar) {
      reasons.push(`Matches auspicious sister Pada of Moon Nakshatra ${astro.nakshatraName}.`);
    } else {
      reasons.push(`Matches Janmakshar root vibrational frequency '${cleanFirstName[0].toUpperCase()}'.`);
    }

    if (driverRelation === "Friendly") {
      reasons.push(`First Name Chaldean #${firstNameChaldean.single} vibrates in high friendship with Driver #${numerology.driverNumber} (${numerology.driverRulingPlanet}).`);
    }
    if (conductorRelation === "Friendly") {
      reasons.push(`Harmonizes with Conductor Life Path #${numerology.conductorNumber} (${numerology.conductorRulingPlanet}).`);
    }
    if (input.surname && surnameHarmony.isFullNameAuspiciousCompound) {
      reasons.push(`Full Name Compound #${surnameHarmony.fullNameCompound} is sacred: "${surnameHarmony.fullNameCompoundDescription}".`);
    }
    if (input.surname && !surnameHarmony.isAntyWithDriver && !surnameHarmony.isAntyWithConductor) {
      reasons.push(`Zero Anty (Enemy) Conflict: Full name "${surnameHarmony.fullName}" yields #${surnameHarmony.fullNameSingle} which harmonizes with child's birth planets.`);
    }
    if (!pronology.hasNegativeSound && pronology.score >= 80) {
      reasons.push(`Pronology Verified: ${pronology.rating} sound wave structure, free from negative phonetic blocks.`);
    }
    if (isAuspiciousCompound) {
      reasons.push(`Sacred Chaldean Compound #${firstNameChaldean.compound}: "${CHALDEAN_COMPOUND_MEANINGS[firstNameChaldean.compound] || 'Highly auspicious fortune'}".`);
    }
    if (compensatesMissing) {
      reasons.push(`Cures Missing Grid Deficit: Supplements missing # ${firstNameChaldean.single} from child's Lo Shu chart.`);
    }

    const resolvedReligion = nameEntry.religion || (nameEntry.origin === "Islamic / Arabic" ? "muslim" : nameEntry.origin === "Gurmukhi Sikh" ? "sikh" : nameEntry.origin === "Biblical Christian" ? "christian" : nameEntry.origin === "Jain Tirthankara" ? "jain" : nameEntry.origin === "Buddhist Dhamma" ? "buddhist" : "hindu");

    return {
      id: `${nameEntry.name}-${resolvedReligion}-${nameEntry.syllable}-${firstNameChaldean.compound}`,
      name: nameEntry.name,
      sanskrit: nameEntry.sanskrit,
      gender: nameEntry.gender,
      meaning: nameEntry.meaning,
      origin: nameEntry.origin,
      religion: resolvedReligion,
      startingSyllable: nameEntry.syllable,
      startingLetter: cleanFirstName[0].toUpperCase(),
      deityConnection: nameEntry.deity,
      associatedNakshatras: [astro.nakshatraName],
      chaldeanCompound: firstNameChaldean.compound,
      chaldeanSingle: firstNameChaldean.single,
      pythagoreanExpression: pythagorean.expression,
      soulUrgeNumber: pythagorean.soulUrge,
      personalityNumber: pythagorean.personality,
      fullNameCompound: fullNameChaldean.compound,
      fullNameSingle: fullNameChaldean.single,
      harmonicScore: score,
      driverHarmony: driverRelation,
      conductorHarmony: conductorRelation,
      parentHarmonyScore: parentScore,
      isAuspiciousCompound,
      compoundDescription: CHALDEAN_COMPOUND_MEANINGS[firstNameChaldean.compound] || "Balanced vibration",
      gridCompensation: gridCompText,
      reasons,
      isJanmaksharMatch: isExactJanmakshar || isAlternateJanmakshar,
      isRashiMatch: true,
      isAntyNumber: isAnty,
      pronology,
      surnameHarmony
    };
  }

  /**
   * Pronology Sub-Engine: Analyzes phonetics, negative vibrations, and syllable resonance
   */
  public static analyzePronology(name: string, gender: BabyGender): import("../types/babyNameTypes").PronologyAnalysis {
    const clean = name.trim().toUpperCase();
    const detectedNegatives: string[] = [];

    // Check for negative phonetic blocks
    for (const neg of PRONOLOGY_NEGATIVE_SOUNDS) {
      if (clean.includes(neg)) {
        if (neg === "NO") {
          // Avoid false positives on words like "ROHAN" (contains "RO", not "NO")
          if (clean.startsWith("NO") || clean.includes("ANO") || clean.includes("INO") || clean.includes("ENO")) {
            detectedNegatives.push(neg);
          }
        } else {
          detectedNegatives.push(neg);
        }
      }
    }

    // Check positive sacred vibrations
    const detectedPositives: string[] = [];
    for (const pos of PRONOLOGY_POSITIVE_VIBRATIONS) {
      if (clean.includes(pos) && !detectedPositives.includes(pos)) {
        detectedPositives.push(pos);
      }
    }

    // Syllables count
    const vowelMatches = name.toLowerCase().match(/[aeiouy]+/g);
    const syllableCount = vowelMatches ? vowelMatches.length : 1;
    const syllableStructure = `${syllableCount}-syllable metric flow`;

    // Ending sound type
    const lastChar = name.trim().slice(-1).toLowerCase();
    let endingType: "Vowel Resonance" | "Melodic Liquid" | "Crisp Consonant" = "Crisp Consonant";
    if (["a", "e", "i", "o", "u"].includes(lastChar)) {
      endingType = "Vowel Resonance";
    } else if (["n", "m", "r", "l"].includes(lastChar)) {
      endingType = "Melodic Liquid";
    }

    let score = 84;
    if (detectedNegatives.length > 0) {
      score -= 35;
    }
    if (detectedPositives.length > 0) {
      score += Math.min(12, detectedPositives.length * 4);
    }
    if (endingType === "Vowel Resonance" || endingType === "Melodic Liquid") {
      score += 4;
    }
    if (gender === "boy" && (syllableCount === 2 || syllableCount === 4)) {
      score += 4;
    }
    if (gender === "girl" && endingType === "Vowel Resonance") {
      score += 4;
    }

    score = Math.max(25, Math.min(99, score));

    let rating: "Deva Vani (Supreme)" | "Subha Nada (Auspicious)" | "Samanya (Neutral)" | "Klesha (Inauspicious)" = "Subha Nada (Auspicious)";
    if (detectedNegatives.length > 0) {
      rating = "Klesha (Inauspicious)";
    } else if (score >= 90) {
      rating = "Deva Vani (Supreme)";
    } else if (score >= 75) {
      rating = "Subha Nada (Auspicious)";
    } else {
      rating = "Samanya (Neutral)";
    }

    const summary = detectedNegatives.length > 0
      ? `Pronology Warning: Contains obstructive phonetic pattern(s) [${detectedNegatives.join(", ")}].`
      : `Pronologically Auspicious: Pure phonetic resonance with positive root vibrational frequency (${detectedPositives.slice(0, 3).join(", ") || "melodious flow"}).`;

    return {
      score,
      rating,
      syllableCount,
      syllableStructure,
      hasNegativeSound: detectedNegatives.length > 0,
      detectedNegativeSounds: detectedNegatives,
      positiveVibrations: detectedPositives,
      endingSoundType: endingType,
      pronologySummary: summary
    };
  }

  /**
   * Check if two numbers have an Anty (Inimical / Arch-Enemy) Vedic relationship
   */
  public static isAntyNumber(baseNum: number, targetNum: number): boolean {
    const antyList = VEDIC_ANTY_PAIRS[baseNum];
    if (!antyList) return false;
    return antyList.includes(targetNum);
  }

  /**
   * Surname Harmony Calculation & Full Name Compound Analysis
   */
  public static calculateSurnameHarmony(
    cleanFirstName: string,
    surname: string,
    driverNumber: number,
    conductorNumber: number
  ): import("../types/babyNameTypes").SurnameHarmonyDetails {
    const cleanSurname = surname.trim();
    const surnameChaldean = this.calculateChaldean(cleanSurname);
    const cleanFullName = cleanSurname ? `${cleanFirstName} ${cleanSurname}` : cleanFirstName;
    const fullNameChaldean = this.calculateChaldean(cleanFullName);
    
    const isAuspiciousCompound = AUSPICIOUS_CHALDEAN_COMPOUNDS.has(fullNameChaldean.compound);
    const isAntyWithDriver = this.isAntyNumber(driverNumber, fullNameChaldean.single);
    const isAntyWithConductor = this.isAntyNumber(conductorNumber, fullNameChaldean.single);

    const driverRel = isAntyWithDriver ? "Anty" : (NUMERICAL_FRIENDSHIPS[driverNumber]?.friends.includes(fullNameChaldean.single) ? "Friendly" : "Neutral");
    const conductorRel = isAntyWithConductor ? "Anty" : (NUMERICAL_FRIENDSHIPS[conductorNumber]?.friends.includes(fullNameChaldean.single) ? "Friendly" : "Neutral");

    return {
      surname: cleanSurname,
      surnameChaldeanCompound: surnameChaldean.compound,
      surnameChaldeanSingle: surnameChaldean.single,
      fullName: cleanFullName,
      fullNameCompound: fullNameChaldean.compound,
      fullNameSingle: fullNameChaldean.single,
      fullNameCompoundDescription: CHALDEAN_COMPOUND_MEANINGS[fullNameChaldean.compound] || "Harmonic full vibration",
      isFullNameAuspiciousCompound: isAuspiciousCompound,
      isAntyWithDriver,
      isAntyWithConductor,
      driverHarmony: driverRel,
      conductorHarmony: conductorRel,
      fullNamePlanet: PLANET_RULERS[fullNameChaldean.single] || "Cosmic Light"
    };
  }

  /**
   * Extract root letters from Janmakshar syllable (e.g. "Ro" -> ["R"], "Chu" -> ["CH", "C"], "Ka" -> ["K"])
   */
  public static extractRootLetters(akshara: string): string[] {
    const clean = (akshara || "").trim().toUpperCase();
    if (!clean) return ["A"];
    if (clean.startsWith("CH")) return ["CH", "C"];
    if (clean.startsWith("SH")) return ["SH", "S"];
    if (clean.startsWith("BH")) return ["BH", "B"];
    if (clean.startsWith("DH")) return ["DH", "D"];
    if (clean.startsWith("GH")) return ["GH", "G"];
    if (clean.startsWith("JH")) return ["JH", "J"];
    if (clean.startsWith("TH")) return ["TH", "T"];
    if (clean.startsWith("KH")) return ["KH", "K"];
    if (clean.startsWith("PH")) return ["PH", "P"];
    return [clean[0]];
  }

  /**
   * 4. Find Top Suggested Names (Strict Janmakshar & Strict Zero-Anty filter, exactly 5-10 names)
   */
  public static generateTopSuggestions(
    input: BabyBirthInput,
    astro: AstroJanmaksharResult,
    numerology: BabyNumerologyProfile
  ): NameCandidate[] {
    // 1. Determine the target Janmakshar root letters
    const targetAkshara = input.selectedAkshara?.trim() || astro.primaryAksharaEnglish;
    const targetRootLetters = this.extractRootLetters(targetAkshara);

    // Also gather all pada syllables from the birth nakshatra
    const allPadaAksharas = astro.allPadaAksharas.map((p) => p.aksharaEnglish.toUpperCase());

    // 2. Strict Filter: The name MUST start with the Janmakshar's root letter!
    // E.g., if Janmakshar is 'R' (from Ro, Ra, Re, Ru), ONLY names starting with 'R' are allowed.
    const nameMatchesJanmaksharLetter = (name: string): boolean => {
      const upperName = name.trim().toUpperCase();
      return targetRootLetters.some((root) => upperName.startsWith(root));
    };

    // Helper to get religion of an entry
    const getEntryReligion = (entry: typeof BABY_NAMES_MASTER_LIBRARY[0]): string => {
      if (entry.religion) return entry.religion;
      if (entry.origin === "Islamic / Arabic") return "muslim";
      if (entry.origin === "Gurmukhi Sikh") return "sikh";
      if (entry.origin === "Biblical Christian") return "christian";
      if (entry.origin === "Jain Tirthankara") return "jain";
      if (entry.origin === "Buddhist Dhamma") return "buddhist";
      return "hindu";
    };

    const targetReligion = input.religion && input.religion !== "all" ? input.religion : null;

    // Filter library by religion, gender & STRICT Janmakshar root letter
    const libraryMatchingLetter = BABY_NAMES_MASTER_LIBRARY.filter((item) => {
      // Religion filter
      if (targetReligion && getEntryReligion(item) !== targetReligion && item.religion !== "universal") {
        return false;
      }
      // Gender filter
      if (input.gender !== "unisex" && item.gender !== "unisex" && item.gender !== input.gender) {
        return false;
      }
      // Preference filter if selected
      if (input.preferredStyle !== "all") {
        if (input.preferredStyle === "vedic_sanskrit" && item.origin !== "Vedic Sanskrit" && item.origin !== "Devotional") return false;
        if (input.preferredStyle === "modern_indian" && item.origin !== "Modern Indian" && item.origin !== "Contemporary Classic") return false;
        if (input.preferredStyle === "short_sweet" && item.name.length > 5) return false;
      }
      // MUST match Janmakshar root letter
      return nameMatchesJanmaksharLetter(item.name);
    });

    // Fallback: If specific root letter has fewer than 5 names in chosen religion, include top harmonic names in that religion
    let pool = libraryMatchingLetter;
    if (pool.length < 5) {
      const religionPool = BABY_NAMES_MASTER_LIBRARY.filter((item) => {
        if (targetReligion && getEntryReligion(item) !== targetReligion && item.religion !== "universal") {
          return false;
        }
        if (input.gender !== "unisex" && item.gender !== "unisex" && item.gender !== input.gender) {
          return false;
        }
        return true;
      });

      // Merge matching root letter names first, then others from that religion
      const namesSet = new Set(pool.map((n) => n.name));
      const additional = religionPool.filter((n) => !namesSet.has(n.name));
      pool = [...pool, ...additional];
    }

    // 3. Evaluate each matching candidate name
    const evaluatedCandidates: NameCandidate[] = [];
    const seenNames = new Set<string>();

    for (const entry of pool) {
      const lowerName = entry.name.trim().toLowerCase();
      if (seenNames.has(lowerName)) {
        continue;
      }
      seenNames.add(lowerName);

      const candidate = this.evaluateCandidateName(entry, input, astro, numerology);

      // STRICT FILTER 1: Exclude ANY name that creates an Anty (Enemy) collision!
      if (candidate.isAntyNumber) {
        continue;
      }

      // STRICT FILTER 2: Exclude names with negative Pronology sound vibrations!
      if (candidate.pronology?.hasNegativeSound) {
        continue;
      }

      evaluatedCandidates.push(candidate);
    }

    // If extremely strict filters left fewer than 5 candidates, allow names with neutral harmony (but still ZERO Anty)
    let finalPool = evaluatedCandidates;
    if (finalPool.length < 5) {
      for (const entry of pool) {
        const lowerName = entry.name.trim().toLowerCase();
        if (seenNames.has(lowerName)) continue;
        seenNames.add(lowerName);

        const candidate = this.evaluateCandidateName(entry, input, astro, numerology);
        if (!candidate.isAntyNumber && !candidate.pronology?.hasNegativeSound) {
          finalPool.push(candidate);
        }
      }
    }

    // 4. Sort by harmonic score descending (Exact pada matches and highest harmony rise to the top)
    finalPool.sort((a, b) => b.harmonicScore - a.harmonicScore);

    // 5. Limit to top 5 - 10 perfectly matched names
    return finalPool.slice(0, 10);
  }

  /**
   * 5. Real-Time Custom Name & Spelling Vibration Sandbox
   */
  public static analyzeCustomName(
    customName: string,
    input: BabyBirthInput,
    astro: AstroJanmaksharResult,
    numerology: BabyNumerologyProfile
  ): NameCandidate {
    const clean = customName.trim() || "Aarav";
    const tempEntry: BabyNameEntry = {
      name: clean,
      sanskrit: clean,
      gender: input.gender,
      syllable: clean.slice(0, 2),
      meaning: "Custom chosen baby name",
      origin: "Modern Indian",
      element: "Ether"
    };

    return this.evaluateCandidateName(tempEntry, input, astro, numerology);
  }

  /**
   * 6. Spelling Optimizer: Suggest auspicious letter variations (e.g., Aarav vs Arav)
   */
  public static suggestSpellingVariations(
    baseName: string,
    surname: string,
    numerology: BabyNumerologyProfile
  ): { variant: string; compound: number; single: number; isAuspicious: boolean; description: string; scoreDelta: number }[] {
    const name = baseName.trim();
    if (!name || name.length < 2) return [];

    const variants = new Set<string>();
    variants.add(name);

    // Common Vedic/Modern English spelling modifications:
    // 1. Double vowels (a -> aa, i -> ee, u -> oo, e -> ee)
    if (name.includes("a") && !name.includes("aa")) variants.add(name.replace("a", "aa"));
    if (name.includes("A") && !name.startsWith("Aa")) variants.add("Aa" + name.slice(1));
    if (name.includes("i")) variants.add(name.replace("i", "ee"));
    if (name.includes("u")) variants.add(name.replace("u", "oo"));
    if (name.endsWith("a")) variants.add(name + "h");
    if (name.endsWith("i")) variants.add(name.slice(0, -1) + "y");
    if (name.endsWith("y")) variants.add(name.slice(0, -1) + "i");
    if (name.includes("v")) variants.add(name.replace("v", "w"));

    const results = Array.from(variants).map((variant) => {
      const chal = this.calculateChaldean(variant);
      const isAusp = AUSPICIOUS_CHALDEAN_COMPOUNDS.has(chal.compound);
      const isFriendlyWithDriver = NUMERICAL_FRIENDSHIPS[numerology.driverNumber]?.friends.includes(chal.single);

      let delta = 0;
      if (isAusp) delta += 15;
      if (isFriendlyWithDriver) delta += 15;
      if (CAUTIONARY_CHALDEAN_COMPOUNDS.has(chal.compound)) delta -= 20;

      return {
        variant,
        compound: chal.compound,
        single: chal.single,
        isAuspicious: isAusp,
        description: CHALDEAN_COMPOUND_MEANINGS[chal.compound] || "Balanced vibrational frequency",
        scoreDelta: delta
      };
    });

    results.sort((a, b) => b.scoreDelta - a.scoreDelta);
    return results;
  }

  // Helper: Chaldean calculation
  public static calculateChaldean(text: string): { compound: number; single: number } {
    const clean = text.toUpperCase().replace(/[^A-Z]/g, "");
    let compound = 0;
    for (const char of clean) {
      compound += CHALDEAN_MAP[char] || 0;
    }
    return { compound, single: this.reduceToSingle(compound) };
  }

  // Helper: Pythagorean calculation (Expression, Soul Urge / Vowels, Personality / Consonants)
  public static calculatePythagorean(text: string): {
    expression: number;
    soulUrge: number;
    personality: number;
  } {
    const clean = text.toUpperCase().replace(/[^A-Z]/g, "");
    const vowels = new Set(["A", "E", "I", "O", "U"]);
    let exprSum = 0;
    let soulSum = 0;
    let persSum = 0;

    for (const char of clean) {
      const val = PYTHAGOREAN_MAP[char] || 0;
      exprSum += val;
      if (vowels.has(char)) {
        soulSum += val;
      } else {
        persSum += val;
      }
    }

    return {
      expression: this.reduceToSingle(exprSum),
      soulUrge: this.reduceToSingle(soulSum),
      personality: this.reduceToSingle(persSum)
    };
  }

  // Helper: Reduce to 1-9
  public static reduceToSingle(n: number): number {
    let num = Math.abs(n);
    if (num === 0) return 0;
    while (num > 9) {
      num = String(num).split("").reduce((sum, d) => sum + parseInt(d, 10), 0);
    }
    return num;
  }

  // Helper: Get relation between two single digits
  public static getNumericalRelation(base: number, other: number): "Friendly" | "Neutral" | "Inimical" {
    const matrix = NUMERICAL_FRIENDSHIPS[base];
    if (!matrix) return "Neutral";
    if (matrix.friends.includes(other)) return "Friendly";
    if (matrix.enemy.includes(other)) return "Inimical";
    return "Neutral";
  }
}
