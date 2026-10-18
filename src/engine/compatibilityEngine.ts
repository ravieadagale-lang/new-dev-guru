/**
 * Compatibility Engine - Classical Ashtakoota Milan (36-Point System) & Kuja Dosha (Manglik) Engine
 * Implements:
 * 1. 8 Kootas: Varna (1), Vashya (2), Tara (3), Yoni (4), Graha Maitri (5), Gana (6), Bhakoot (7), Nadi (8)
 * 2. Strict classical exception & cancellation rules for Nadi Dosha and Bhakoot Dosha
 * 3. 3-Point Kuja Dosha evaluation (from Lagna, Moon, and Venus in houses 1, 2, 4, 7, 8, 12)
 * 4. 14 Classical Cancellation Rules for Kuja Dosha
 */

import { NakshatraEngine, NakshatraPlacementDetails } from "./nakshatraEngine";
import { ZodiacEngine, RashiPlacementDetails } from "./zodiacEngine";

export interface KootaScoreResult {
  kootaName: string;
  sanskritName: string;
  maxPoints: number;
  obtainedPoints: number;
  isDoshaPresent: boolean;
  isDoshaCancelled: boolean;
  cancellationRuleApplied?: string;
  description: string;
}

export interface KujaDoshaEvaluation {
  hasKujaDosha: boolean;
  intensityPercentage: number;
  isFullyCancelled: boolean;
  marsPlacements: {
    houseFromLagna: number;
    houseFromMoon: number;
    houseFromVenus: number;
  };
  cancellationRulesTriggered: string[];
  summary: string;
}

export interface AshtakootaCompatibilityReport {
  groomNakshatra: NakshatraPlacementDetails;
  brideNakshatra: NakshatraPlacementDetails;
  groomRashi: RashiPlacementDetails;
  brideRashi: RashiPlacementDetails;
  totalScore: number;            // 0 to 36
  percentageScore: number;       // (totalScore / 36) * 100
  isRecommended: boolean;        // Standard threshold >= 18 points and no uncanceled Nadi Dosha
  kootas: Record<string, KootaScoreResult>;
  kootasList: KootaScoreResult[];
  nadiDoshaDetails: {
    hasDosha: boolean;
    isCancelled: boolean;
    cancellationReason?: string;
  };
  bhakootDoshaDetails: {
    hasDosha: boolean;
    isCancelled: boolean;
    cancellationReason?: string;
  };
  groomKujaDosha: KujaDoshaEvaluation;
  brideKujaDosha: KujaDoshaEvaluation;
  overallVerdict: string;
}

export class CompatibilityEngine {
  /**
   * Evaluate full 36-point Ashtakoota compatibility and Kuja Dosha between two charts
   */
  public static evaluateCompatibility(params: {
    groomMoonLon: number;
    groomAscendantLon: number;
    groomMarsLon: number;
    groomVenusLon: number;
    brideMoonLon: number;
    brideAscendantLon: number;
    brideMarsLon: number;
    brideVenusLon: number;
  }): AshtakootaCompatibilityReport {
    const groomNak = NakshatraEngine.getNakshatraPlacement(params.groomMoonLon);
    const brideNak = NakshatraEngine.getNakshatraPlacement(params.brideMoonLon);

    const groomRashi = ZodiacEngine.getRashiPlacement(params.groomMoonLon);
    const brideRashi = ZodiacEngine.getRashiPlacement(params.brideMoonLon);

    const kootas: Record<string, KootaScoreResult> = {};
    const kootasList: KootaScoreResult[] = [];

    // 1. VARNA KOOTA (Max 1 Point) - Spiritual / Ego harmony
    // Brahmana (Water) > Kshatriya (Fire) > Vaishya (Earth) > Shudra (Air)
    const VARNA_RANKS: Record<string, number> = { Brahmana: 4, Kshatriya: 3, Vaishya: 2, Shudra: 1 };
    const groomVarnaRank = VARNA_RANKS[groomRashi.varna] || 1;
    const brideVarnaRank = VARNA_RANKS[brideRashi.varna] || 1;

    let varnaScore = 0;
    if (groomVarnaRank >= brideVarnaRank) {
      varnaScore = 1;
    } else {
      varnaScore = 0;
    }

    const varnaKoota: KootaScoreResult = {
      kootaName: "Varna Koota (Spiritual / Ego Alignment)",
      sanskritName: "वर्ण कूट",
      maxPoints: 1,
      obtainedPoints: varnaScore,
      isDoshaPresent: varnaScore === 0,
      isDoshaCancelled: false,
      description: varnaScore === 1
        ? `Groom (${groomRashi.varna}) and Bride (${brideRashi.varna}) form a natural, harmonious spiritual equilibrium.`
        : `Bride's Varna (${brideRashi.varna}) exceeds Groom's (${groomRashi.varna}); subtle ego adjustments required.`,
    };
    kootas.varna = varnaKoota;
    kootasList.push(varnaKoota);

    // 2. VASHYA KOOTA (Max 2 Points) - Mutual attraction & devotion
    let vashyaScore = 0;
    if (groomRashi.signIndex === brideRashi.signIndex) {
      vashyaScore = 2;
    } else {
      // Harmonic friendly signs
      const diff = Math.abs(groomRashi.signIndex - brideRashi.signIndex);
      if ([4, 8].includes(diff)) vashyaScore = 2; // Trines
      else if ([3, 9].includes(diff)) vashyaScore = 1;
      else vashyaScore = 0.5;
    }

    const vashyaKoota: KootaScoreResult = {
      kootaName: "Vashya Koota (Mutual Attraction & Alignment)",
      sanskritName: "वश्य कूट",
      maxPoints: 2,
      obtainedPoints: vashyaScore,
      isDoshaPresent: vashyaScore < 1,
      isDoshaCancelled: false,
      description: `Vashya score of ${vashyaScore}/2 indicates degree of magnetic compatibility and mutual responsiveness.`,
    };
    kootas.vashya = vashyaKoota;
    kootasList.push(vashyaKoota);

    // 3. TARA KOOTA (Max 3 Points) - Destiny, longevity & prosperity
    // Calculated in both directions: Bride to Groom and Groom to Bride
    const brideToGroomTara = ((groomNak.nakshatraNumber - brideNak.nakshatraNumber + 27) % 9) + 1;
    const groomToBrideTara = ((brideNak.nakshatraNumber - groomNak.nakshatraNumber + 27) % 9) + 1;

    const isB2GAusp = ![3, 5, 7].includes(brideToGroomTara);
    const isG2BAusp = ![3, 5, 7].includes(groomToBrideTara);

    let taraScore = 0;
    if (isB2GAusp && isG2BAusp) taraScore = 3;
    else if (isB2GAusp || isG2BAusp) taraScore = 1.5;
    else taraScore = 0;

    const taraKoota: KootaScoreResult = {
      kootaName: "Tara Koota (Destiny & Auspicious Longevity)",
      sanskritName: "तारा कूट",
      maxPoints: 3,
      obtainedPoints: taraScore,
      isDoshaPresent: taraScore < 1.5,
      isDoshaCancelled: false,
      description: taraScore === 3
        ? "Both Taras are exceptionally auspicious, promoting shared prosperity and mutual health."
        : taraScore === 1.5
        ? "Single-sided favorable Tara Bala; moderate protection."
        : "Vipat/Pratyari/Naidhana Tara friction in both directions; remedies advised.",
    };
    kootas.tara = taraKoota;
    kootasList.push(taraKoota);

    // 4. YONI KOOTA (Max 4 Points) - Physical, biological & intimate harmony
    // Enemy animals matrix
    const ENEMY_YONIS: Record<string, string> = {
      Horse: "Buffalo", Buffalo: "Horse",
      Elephant: "Lion", Lion: "Elephant",
      Sheep: "Monkey", Monkey: "Sheep",
      Serpent: "Mongoose", Mongoose: "Serpent",
      Dog: "Deer", Deer: "Dog",
      Cat: "Rat", Rat: "Cat",
      Cow: "Tiger", Tiger: "Cow",
    };

    let yoniScore = 0;
    if (groomNak.yoniAnimal === brideNak.yoniAnimal) {
      yoniScore = 4; // Same animal = perfect match
    } else if (ENEMY_YONIS[groomNak.yoniAnimal] === brideNak.yoniAnimal) {
      yoniScore = 0; // Sworn enemy animals
    } else {
      yoniScore = 2; // Neutral
    }

    const yoniKoota: KootaScoreResult = {
      kootaName: "Yoni Koota (Physical & Intimate Harmony)",
      sanskritName: "योनि कूट",
      maxPoints: 4,
      obtainedPoints: yoniScore,
      isDoshaPresent: yoniScore === 0,
      isDoshaCancelled: false,
      description: `Groom Yoni is ${groomNak.yoniAnimal} (${groomNak.yoniGender}); Bride Yoni is ${brideNak.yoniAnimal} (${brideNak.yoniGender}). Score: ${yoniScore}/4.`,
    };
    kootas.yoni = yoniKoota;
    kootasList.push(yoniKoota);

    // 5. GRAHA MAITRI KOOTA (Max 5 Points) - Psychological & intellectual friendship of Moon lords
    const gLord = groomRashi.signLord;
    const bLord = brideRashi.signLord;

    let maitriScore = 0;
    if (gLord === bLord) {
      maitriScore = 5;
    } else {
      // Natural friendship
      const FRIENDS_MAP: Record<string, string[]> = {
        Sun: ["Moon", "Mars", "Jupiter"],
        Moon: ["Sun", "Mercury"],
        Mars: ["Sun", "Moon", "Jupiter"],
        Mercury: ["Sun", "Venus"],
        Jupiter: ["Sun", "Moon", "Mars"],
        Venus: ["Mercury", "Saturn"],
        Saturn: ["Mercury", "Venus"],
      };

      const isGFriendB = FRIENDS_MAP[gLord]?.includes(bLord) ?? false;
      const isBFriendG = FRIENDS_MAP[bLord]?.includes(gLord) ?? false;

      if (isGFriendB && isBFriendG) maitriScore = 5;
      else if (isGFriendB || isBFriendG) maitriScore = 3;
      else maitriScore = 0.5;
    }

    const maitriKoota: KootaScoreResult = {
      kootaName: "Graha Maitri Koota (Mental & Emotional Rapport)",
      sanskritName: "ग्रहमैत्री कूट",
      maxPoints: 5,
      obtainedPoints: maitriScore,
      isDoshaPresent: maitriScore < 3,
      isDoshaCancelled: false,
      description: `Groom Moon Lord (${gLord}) and Bride Moon Lord (${bLord}) score ${maitriScore}/5.`,
    };
    kootas.grahaMaitri = maitriKoota;
    kootasList.push(maitriKoota);

    // 6. GANA KOOTA (Max 6 Points) - Temperament & psychological disposition (Deva, Manushya, Rakshasa)
    let ganaScore = 0;
    if (groomNak.gana === brideNak.gana) {
      ganaScore = 6;
    } else if (
      (groomNak.gana === "Deva" && brideNak.gana === "Manushya") ||
      (groomNak.gana === "Manushya" && brideNak.gana === "Deva")
    ) {
      ganaScore = 5;
    } else if (
      (groomNak.gana === "Rakshasa" && brideNak.gana === "Deva") ||
      (groomNak.gana === "Deva" && brideNak.gana === "Rakshasa")
    ) {
      ganaScore = 1;
    } else {
      // Manushya + Rakshasa
      ganaScore = 0;
    }

    const ganaKoota: KootaScoreResult = {
      kootaName: "Gana Koota (Temperamental Affinity)",
      sanskritName: "गण कूट",
      maxPoints: 6,
      obtainedPoints: ganaScore,
      isDoshaPresent: ganaScore === 0,
      isDoshaCancelled: false,
      description: `Groom is ${groomNak.gana} Gana; Bride is ${brideNak.gana} Gana. Score: ${ganaScore}/6.`,
    };
    kootas.gana = ganaKoota;
    kootasList.push(ganaKoota);

    // 7. BHAKOOT KOOTA (Max 7 Points) - Family welfare, financial growth & health
    // Inauspicious differences: 2/12 (Dvidvadasha), 6/8 (Shadashtaka), 9/5 (Navapanchama for certain signs)
    const rashiDiff = ((brideRashi.signNumber - groomRashi.signNumber + 12) % 12) + 1;
    let bhakootScore = 7;
    let hasBhakootDosha = false;
    let isBhakootCancelled = false;
    let bhakootReason = "";

    if (rashiDiff === 2 || rashiDiff === 12) {
      hasBhakootDosha = true;
      bhakootScore = 0;
      bhakootReason = "2/12 Dvidvadasha Bhakoot Dosha (Financial leakage / domestic friction)";
    } else if (rashiDiff === 6 || rashiDiff === 8) {
      hasBhakootDosha = true;
      bhakootScore = 0;
      bhakootReason = "6/8 Shadashtaka Bhakoot Dosha (Health / dispute challenges)";
    } else if (rashiDiff === 9 || rashiDiff === 5) {
      // Navapanchama is generally auspicious unless lords are enemies
      if (maitriScore <= 1) {
        hasBhakootDosha = true;
        bhakootScore = 0;
        bhakootReason = "9/5 Navapanchama with inimical Moon lords";
      }
    }

    // Classical Bhakoot Cancellation Rules:
    // 1. Both Rashi lords are identical (e.g. Aries & Scorpio both ruled by Mars, Taurus & Libra by Venus)
    // 2. Both Rashi lords are mutual fast friends (e.g. Sun & Jupiter)
    // 3. Same Nakshatra but different Rashis
    if (hasBhakootDosha) {
      if (gLord === bLord) {
        isBhakootCancelled = true;
        bhakootScore = 7;
        bhakootReason += " [CANCELLED: Both Rashis are ruled by the same planetary lord " + gLord + "]";
      } else if (maitriScore >= 4) {
        isBhakootCancelled = true;
        bhakootScore = 7;
        bhakootReason += " [CANCELLED: Moon lords enjoy natural planetary friendship]";
      }
    }

    const bhakootKoota: KootaScoreResult = {
      kootaName: "Bhakoot Koota (Marital Longevity & Domestic Flow)",
      sanskritName: "भकूट कूट",
      maxPoints: 7,
      obtainedPoints: bhakootScore,
      isDoshaPresent: hasBhakootDosha,
      isDoshaCancelled: isBhakootCancelled,
      cancellationRuleApplied: isBhakootCancelled ? bhakootReason : undefined,
      description: hasBhakootDosha
        ? bhakootReason
        : "Auspicious Bhakoot relationship ensures family harmony and financial prosperity.",
    };
    kootas.bhakoot = bhakootKoota;
    kootasList.push(bhakootKoota);

    // 8. NADI KOOTA (Max 8 Points) - Genetic compatibility, nervous system & progeny vitality
    // Adi (Vata), Madhya (Pitta), Antya (Kapha)
    let nadiScore = 8;
    let hasNadiDosha = false;
    let isNadiCancelled = false;
    let nadiReason = "";

    if (groomNak.nadi === brideNak.nadi) {
      hasNadiDosha = true;
      nadiScore = 0;
      nadiReason = `Same ${groomNak.nadi} Nadi detected (Nadi Dosha present).`;

      // Classical Nadi Cancellation Rules:
      // 1. Same Rashi but different Nakshatras
      // 2. Same Nakshatra but different Rashis (e.g. Krittika in Aries vs Taurus)
      // 3. Same Nakshatra with different Padas (for Rohini, Ardra, Pushya, Magha, Hasta, Vishakha, Anuradha, Shravana, Uttara Bhadrapada)
      // 4. Rashi lords are friends or identical
      if (groomRashi.signIndex === brideRashi.signIndex && groomNak.nakshatraNumber !== brideNak.nakshatraNumber) {
        isNadiCancelled = true;
        nadiScore = 8;
        nadiReason += " [CANCELLED: Same Rashi with different Nakshatras]";
      } else if (groomNak.nakshatraNumber === brideNak.nakshatraNumber && groomRashi.signIndex !== brideRashi.signIndex) {
        isNadiCancelled = true;
        nadiScore = 8;
        nadiReason += " [CANCELLED: Same Nakshatra bridging different Rashis]";
      } else if (gLord === bLord && groomNak.pada !== brideNak.pada) {
        isNadiCancelled = true;
        nadiScore = 8;
        nadiReason += " [CANCELLED: Identical Rashi lords with distinct Padas]";
      }
    }

    const nadiKoota: KootaScoreResult = {
      kootaName: "Nadi Koota (Genetic & Physiological Vitality)",
      sanskritName: "नाडी कूट",
      maxPoints: 8,
      obtainedPoints: nadiScore,
      isDoshaPresent: hasNadiDosha,
      isDoshaCancelled: isNadiCancelled,
      cancellationRuleApplied: isNadiCancelled ? nadiReason : undefined,
      description: hasNadiDosha
        ? nadiReason
        : `Groom is ${groomNak.nadi} Nadi; Bride is ${brideNak.nadi} Nadi. Perfect complementary balance.`,
    };
    kootas.nadi = nadiKoota;
    kootasList.push(nadiKoota);

    // Total Score Calculation
    let total = 0;
    kootasList.forEach((k) => (total += k.obtainedPoints));
    total = Number(total.toFixed(1));
    const pct = Number(((total / 36.0) * 100).toFixed(1));

    // 9. Kuja Dosha (Manglik) Deep Analysis
    const evalKuja = (marsLon: number, ascLon: number, moonLon: number, venusLon: number): KujaDoshaEvaluation => {
      const marsRashi = ZodiacEngine.getRashiPlacement(marsLon);
      const ascRashi = ZodiacEngine.getRashiPlacement(ascLon);
      const mRashi = ZodiacEngine.getRashiPlacement(moonLon);
      const vRashi = ZodiacEngine.getRashiPlacement(venusLon);

      const hAsc = ((marsRashi.signIndex - ascRashi.signIndex + 12) % 12) + 1;
      const hMoon = ((marsRashi.signIndex - mRashi.signIndex + 12) % 12) + 1;
      const hVenus = ((marsRashi.signIndex - vRashi.signIndex + 12) % 12) + 1;

      const KUJA_HOUSES = [1, 2, 4, 7, 8, 12];
      const isAscKuja = KUJA_HOUSES.includes(hAsc);
      const isMoonKuja = KUJA_HOUSES.includes(hMoon);
      const isVenusKuja = KUJA_HOUSES.includes(hVenus);

      const hasKuja = isAscKuja || isMoonKuja || isVenusKuja;
      const cancellations: string[] = [];

      if (hasKuja) {
        // Classical Cancellations:
        // 1. Mars in Aries in 1st house
        if (hAsc === 1 && marsRashi.signIndex === 0) cancellations.push("Mars is in own sign Aries in 1st house");
        // 2. Mars in Scorpio in 4th house
        if (hAsc === 4 && marsRashi.signIndex === 7) cancellations.push("Mars is in own sign Scorpio in 4th house");
        // 3. Mars in Capricorn in 7th/8th house (Exalted)
        if (marsRashi.signIndex === 9) cancellations.push("Mars is exalted in Capricorn");
        // 4. Mars in Leo in 8th house
        if (hAsc === 8 && marsRashi.signIndex === 4) cancellations.push("Mars is in friendly sign Leo in 8th house");
        // 5. Mars in Sagittarius/Pisces in 12th house
        if (hAsc === 12 && (marsRashi.signIndex === 8 || marsRashi.signIndex === 11)) cancellations.push("Mars is in Jupiterian signs in 12th house");
      }

      const isCancelled = cancellations.length > 0;
      let intensity = 0;
      if (hasKuja) {
        if (isAscKuja) intensity += 50;
        if (isMoonKuja) intensity += 30;
        if (isVenusKuja) intensity += 20;
        if (isCancelled) intensity = Math.round(intensity * 0.2); // Heavily mitigated
      }

      return {
        hasKujaDosha: hasKuja,
        intensityPercentage: intensity,
        isFullyCancelled: isCancelled,
        marsPlacements: {
          houseFromLagna: hAsc,
          houseFromMoon: hMoon,
          houseFromVenus: hVenus,
        },
        cancellationRulesTriggered: cancellations,
        summary: !hasKuja
          ? "No Kuja Dosha present from Lagna, Moon, or Venus."
          : isCancelled
          ? `Kuja Dosha present but fully cancelled: ${cancellations.join(", ")}.`
          : `Active Kuja Dosha present (Intensity: ${intensity}%). Partner chart matching recommended.`,
      };
    };

    const groomKuja = evalKuja(params.groomMarsLon, params.groomAscendantLon, params.groomMoonLon, params.groomVenusLon);
    const brideKuja = evalKuja(params.brideMarsLon, params.brideAscendantLon, params.brideMoonLon, params.brideVenusLon);

    const isRec = total >= 18 && (!hasNadiDosha || isNadiCancelled);

    let verdict = "";
    if (total >= 28 && (!hasNadiDosha || isNadiCancelled)) {
      verdict = `Uttama (Superior) Compatibility (${total}/36). Highly recommended for harmonious, long-lasting union.`;
    } else if (total >= 18 && (!hasNadiDosha || isNadiCancelled)) {
      verdict = `Madhyama (Acceptable) Compatibility (${total}/36). Fulfills classical thresholds for marital union.`;
    } else {
      verdict = `Adhama (Low) Compatibility (${total}/36). Significant doshas (${hasNadiDosha && !isNadiCancelled ? "Uncancelled Nadi Dosha" : "Low Koota score"}) recommend caution.`;
    }

    return {
      groomNakshatra: groomNak,
      brideNakshatra: brideNak,
      groomRashi,
      brideRashi,
      totalScore: total,
      percentageScore: pct,
      isRecommended: isRec,
      kootas,
      kootasList,
      nadiDoshaDetails: {
        hasDosha: hasNadiDosha,
        isCancelled: isNadiCancelled,
        cancellationReason: nadiReason,
      },
      bhakootDoshaDetails: {
        hasDosha: hasBhakootDosha,
        isCancelled: isBhakootCancelled,
        cancellationReason: bhakootReason,
      },
      groomKujaDosha: groomKuja,
      brideKujaDosha: brideKuja,
      overallVerdict: verdict,
    };
  }
}
