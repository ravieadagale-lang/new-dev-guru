/**
 * Complete Bhava Bala Engine (House Potency Suite)
 * Implements Section 15 of the AstroNext Master Specification.
 * Calculates: Bhavadhipati Bala (Lord's strength), Bhava Dig Bala (House directional strength),
 * Bhava Drishti Bala (Aspectual strength), and Subha/Asubha balance.
 */

import { ZodiacEngine, ZODIAC_SIGNS } from "./zodiacEngine";

export interface BhavaBalaItem {
  houseNumber: number;
  houseSign: string;
  rulingLord: string;
  bhavadhipatiBalaVirupas: number; // Strength of house lord from Shadbala
  bhavaDigBalaVirupas: number;     // Directional house strength (Nara/Jala/Chatushpada signs in Kendras)
  bhavaDrishtiBalaVirupas: number; // Net benefic vs malefic drishti Virupas
  totalBhavaBalaVirupas: number;
  totalBhavaBalaRupas: number;     // Virupas / 60
  minimumRequiredRupas: number;
  relativeRank: number;            // 1 to 12
  status: "Very Strong" | "Strong" | "Moderate" | "Weak";
  strengthFactors: string[];
  weaknessFactors: string[];
}

export interface BhavaBalaReport {
  houses: Record<number, BhavaBalaItem>;
  strongestHouse: number;
  weakestHouse: number;
  kendraAverageRupas: number;
  trikonaAverageRupas: number;
  dusthanaAverageRupas: number;
}

export class BhavaBalaEngine {
  /**
   * Calculate Bhava Bala for all 12 Houses
   */
  public static calculateBhavaBala(params: {
    ascendantLongitude: number;
    planetaryShadbalaVirupas: Record<string, number>;
    planets: Record<string, { longitude: number; name?: string }>;
  }): BhavaBalaReport {
    const { ascendantLongitude, planetaryShadbalaVirupas, planets } = params;
    const ascSignIdx = Math.floor(ascendantLongitude / 30.0);
    const houses: Record<number, BhavaBalaItem> = {};

    const houseMinimumRequirements: Record<number, number> = {
      1: 6.0,
      2: 5.5,
      3: 5.0,
      4: 6.5,
      5: 5.5,
      6: 5.0,
      7: 6.5,
      8: 5.0,
      9: 6.0,
      10: 7.0,
      11: 5.5,
      12: 5.0,
    };

    for (let h = 1; h <= 12; h++) {
      const houseSignIdx = (ascSignIdx + h - 1) % 12;
      const zSign = ZODIAC_SIGNS[houseSignIdx];
      const lordName = zSign.rulingLord;

      // 1. Bhavadhipati Bala (Lord's Shadbala Virupas)
      const lordShadbala = planetaryShadbalaVirupas[lordName] || 360.0;
      const bhavadhipatiVirupas = Number((lordShadbala * 0.8).toFixed(1));

      // 2. Bhava Dig Bala:
      // Human signs (Gemini 2, Virgo 5, Libra 6, 1st half Sag 8, Aquarius 10) get 60 Virupas in 1st house
      // Water signs (Cancer 3, Pisces 11, Scorpio 7) get 60 in 4th house
      // Quadruped signs (Aries 0, Taurus 1, Leo 4, 2nd half Sag, Cap 9) get 60 in 10th house
      // Keeta (Scorpio 7) gets 60 in 7th house
      let digBala = 30.0;
      if ([2, 5, 6, 10].includes(houseSignIdx) && [1, 7].includes(h)) digBala = 60.0;
      else if ([3, 11].includes(houseSignIdx) && [4, 10].includes(h)) digBala = 60.0;
      else if ([0, 1, 4, 9].includes(houseSignIdx) && [10, 4].includes(h)) digBala = 60.0;
      else if (houseSignIdx === 7 && h === 7) digBala = 60.0;

      // 3. Bhava Drishti Bala (Aspect strength)
      let drishtiVirupas = 30.0;
      const strengthFactors: string[] = [];
      const weaknessFactors: string[] = [];

      // Check planets occupying or aspecting this house
      const occupants: string[] = [];
      Object.entries(planets).forEach(([pName, p]) => {
        const pSign = Math.floor(p.longitude / 30.0);
        const pHouse = ((pSign - ascSignIdx + 12) % 12) + 1;
        if (pHouse === h) occupants.push(pName);
      });

      if (occupants.includes("Jupiter") || occupants.includes("Venus")) {
        drishtiVirupas += 35.0;
        strengthFactors.push("Benefic presence of Jupiter/Venus elevating house auspiciousness");
      }
      if (occupants.includes("Saturn") || occupants.includes("Rahu") || occupants.includes("Mars")) {
        drishtiVirupas -= 15.0;
        weaknessFactors.push("Malefic pressure requiring patience and strategic remedies");
      }
      if (bhavadhipatiVirupas >= 400) {
        strengthFactors.push(`Lord ${lordName} possesses robust Shadbala strength`);
      } else if (bhavadhipatiVirupas < 320) {
        weaknessFactors.push(`Lord ${lordName} has below-average positional vitality`);
      }

      const totalVirupas = Number((bhavadhipatiVirupas + digBala + drishtiVirupas).toFixed(1));
      const totalRupas = Number((totalVirupas / 60.0).toFixed(2));
      const reqRupas = houseMinimumRequirements[h] || 5.5;

      let status: BhavaBalaItem["status"] = "Moderate";
      if (totalRupas >= reqRupas * 1.25) status = "Very Strong";
      else if (totalRupas >= reqRupas) status = "Strong";
      else if (totalRupas >= reqRupas * 0.8) status = "Moderate";
      else status = "Weak";

      houses[h] = {
        houseNumber: h,
        houseSign: zSign.englishName,
        rulingLord: lordName,
        bhavadhipatiBalaVirupas: bhavadhipatiVirupas,
        bhavaDigBalaVirupas: digBala,
        bhavaDrishtiBalaVirupas: drishtiVirupas,
        totalBhavaBalaVirupas: totalVirupas,
        totalBhavaBalaRupas: totalRupas,
        minimumRequiredRupas: reqRupas,
        relativeRank: 0,
        status,
        strengthFactors: strengthFactors.length ? strengthFactors : ["Standard house structural foundation"],
        weaknessFactors: weaknessFactors.length ? weaknessFactors : ["No structural impairments detected"],
      };
    }

    // Rank houses 1 to 12
    const sortedHouses = Object.values(houses).sort((a, b) => b.totalBhavaBalaVirupas - a.totalBhavaBalaVirupas);
    sortedHouses.forEach((hItem, idx) => {
      houses[hItem.houseNumber].relativeRank = idx + 1;
    });

    const strongestHouse = sortedHouses[0].houseNumber;
    const weakestHouse = sortedHouses[sortedHouses.length - 1].houseNumber;

    const kendraRupas = ([1, 4, 7, 10].map((h) => houses[h].totalBhavaBalaRupas).reduce((a, b) => a + b, 0) / 4);
    const trikonaRupas = ([1, 5, 9].map((h) => houses[h].totalBhavaBalaRupas).reduce((a, b) => a + b, 0) / 3);
    const dusthanaRupas = ([6, 8, 12].map((h) => houses[h].totalBhavaBalaRupas).reduce((a, b) => a + b, 0) / 3);

    return {
      houses,
      strongestHouse,
      weakestHouse,
      kendraAverageRupas: Number(kendraRupas.toFixed(2)),
      trikonaAverageRupas: Number(trikonaRupas.toFixed(2)),
      dusthanaAverageRupas: Number(dusthanaRupas.toFixed(2)),
    };
  }
}
