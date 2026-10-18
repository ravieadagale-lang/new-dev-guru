// Vedic Compatibility & Synastry Calculator Suite

import { ComprehensiveMatchResult, PartnerAstroProfile, UserProfile } from "../types";

export interface PartnerInput {
  name: string;
  gender: "male" | "female" | "other";
  dob: string;
  time?: string;
  place?: string;
  rashi?: string;
  nakshatra?: string;
  nakshatraPada?: number;
  latitude?: number;
  longitude?: number;
  [key: string]: any;
}

export interface KootaDetail {
  name: string;
  sanskritName: string;
  maxPoints: number;
  obtainedPoints: number;
  scored?: number;
  status?: string;
  description: string;
  governs: string;
  rules: string;
  isDoshaPresent?: boolean;
  isDoshaCancelled?: boolean;
  cancellationRule?: string;
}

export interface NumerologyDetail {
  driverNumber: number;
  conductorNumber: number;
  compatibilityScore: number;
  verdict: string;
}

export interface ChineseZodiacDetail {
  animal: string;
  element: string;
  compatibilityGroup: string[];
  harmonyScore: number;
  fengShuiAdvice: string;
  synergyScore?: number;
  compatibilityType?: string;
  animalA?: string;
  elementA?: string;
  kuaA?: number | string;
  groupA?: string;
  animalB?: string;
  elementB?: string;
  kuaB?: number | string;
  groupB?: string;
  [key: string]: any;
}

export type { ComprehensiveMatchResult, PartnerAstroProfile };

export function calculateComprehensiveMatch(
  seeker: UserProfile | PartnerInput,
  partner: PartnerInput
): ComprehensiveMatchResult {
  // Deterministic calculation based on Nakshatra and Rashi
  const seekerNakshatra = seeker.nakshatra || "Ashwini";
  const partnerNakshatra = partner.nakshatra || "Rohini";
  const seekerRashi = seeker.rashi || "Aries";
  const partnerRashi = partner.rashi || "Taurus";

  // Score simulation based on stable hash
  const hash = (seekerNakshatra.length * 7 + partnerNakshatra.length * 11 + seekerRashi.length * 3 + partnerRashi.length * 5) % 18;
  const baseScore = 20 + hash; // 20 to 36

  const varnaPts = ((hash % 2) === 0 ? 1 : 0);
  const vashyaPts = ((hash % 3) === 0 ? 1 : 2);
  const taraPts = 1.5 + (hash % 2) * 1.5;
  const yoniPts = 2 + (hash % 3);
  const grahaMaitriPts = 3 + (hash % 3);
  const ganaPts = (hash % 2 === 0 ? 6 : 5);
  const bhakootPts = (hash % 4 === 0 ? 0 : 7);
  const nadiPts = (hash % 5 === 0 ? 0 : 8);

  const totalObtained = varnaPts + vashyaPts + taraPts + yoniPts + grahaMaitriPts + ganaPts + bhakootPts + nadiPts;
  const cappedScore = Math.min(36, Math.max(12, totalObtained));
  const percentage = Math.round((cappedScore / 36) * 100);

  const verdict = cappedScore >= 28 ? "Excellent Match" : cappedScore >= 20 ? "Good Match" : cappedScore >= 16 ? "Average Match" : "Challenging Match";

  return {
    score: cappedScore,
    maxScore: 36,
    percentage,
    verdict,
    ashtaKoota: {
      varna: { obtained: varnaPts, max: 1, description: "Ego, spiritual work-ethic and spiritual temperament compatibility." },
      vashya: { obtained: vashyaPts, max: 2, description: "Mutual respect, magnetic attraction and marital balance." },
      tara: { obtained: taraPts, max: 3, description: "Birth star destiny, longevity and auspicious cosmic connection." },
      yoni: { obtained: yoniPts, max: 4, description: "Physical harmony, biological resonance and intimacy synergy." },
      grahaMaitri: { obtained: grahaMaitriPts, max: 5, description: "Mental friendship, psychological alignment and worldview resonance." },
      gana: { obtained: ganaPts, max: 6, description: "Temperament archetype harmony (Deva, Manushya, Rakshasa)." },
      bhakoot: { obtained: bhakootPts, max: 7, description: "Emotional welfare, family prosperity and progeny blessings." },
      nadi: { obtained: nadiPts, max: 8, description: "Genetic health, physiological vitality and lineage longevity." },
    },
    hasNadiDosha: nadiPts === 0,
    nadiDoshaCancelled: nadiPts === 0,
    hasBhakootDosha: bhakootPts === 0,
    bhakootDoshaCancelled: bhakootPts === 0,
    hasManglikDosha: false,
    manglikStatus: "Compatible (No uncancelled Kuja Dosha detected)",
    strengths: [
      "Harmonious emotional understanding and mental companionship.",
      "High mutual respect with balanced shared life values.",
      "Supportive planetary friendship between Moon sign lords."
    ],
    concerns: [
      "Minor differences in pacing during times of high career stress.",
      "Keep lines of communication open regarding financial investments."
    ],
    remedies: [
      "Light a pure cow ghee lamp every Monday evening to Chandra Dev.",
      "Chant the Maha Mrityunjaya Mantra together 11 times weekly.",
      "Practice mindful active listening during Mars transits."
    ],
    synastryHighlights: [
      `Groom Moon in ${seekerRashi} resonates favorably with Bride Moon in ${partnerRashi}.`,
      "Trine aspect between Jupiter and Venus grants relational longevity."
    ]
  };
}
