/**
 * Divisional Charts Engine (Shodashavarga D1 to D60)
 * Computes D1, D2, D3, D4, D7, D8, D9, D10, D12, D16, D20, D24, D27, D30, D40, D45, D60
 * Includes Vargottama detection, Pushkar Navamsha (24 sacred zones), and Pushkar Bhaga (exact degrees).
 */

import { normalizeDeg, degToDMS } from "./astronomyMath";
import { ZodiacEngine, RashiPlacementDetails } from "./zodiacEngine";

export interface VargaPlanetPlacement {
  planet: string;
  vargaSignIndex: number;    // 0 to 11
  vargaSignName: string;
  vargaSignSanskrit: string;
  vargaSignLord: string;
  vargaHouse: number;        // 1 to 12
  isVargottama?: boolean;    // In D9: same sign as D1
  isPushkarNavamsha?: boolean;
  isPushkarBhaga?: boolean;
}

export interface DivisionalChartResult {
  vargaCode: string;         // "D1", "D9", "D10", etc.
  vargaName: string;         // "Navamsha", "Dashamsha", etc.
  divisionFactor: number;    // 9, 10, 60...
  purpose: string;
  ascendantSignIndex: number;
  ascendantSignName: string;
  placements: Record<string, VargaPlanetPlacement>;
  placementsList: VargaPlanetPlacement[];
}

export class DivisionalChartsEngine {
  // Pushkar Navamsha Matrix: (Fire signs: 7th & 9th Navamsha; Earth: 3rd & 5th; Air: 6th & 8th; Water: 1st & 3rd)
  // Pushkar Bhagas (Exact degrees of extraordinary planetary blessing):
  // Sun: 21° Aries, Moon: 14° Taurus, Mars: 19° Capricorn, Mercury: 15° Virgo, Jupiter: 19° Cancer, Venus: 24° Pisces, Saturn: 19° Libra
  private static readonly PUSHKAR_BHAGAS: Record<string, { signIdx: number; exactDeg: number }> = {
    Sun: { signIdx: 0, exactDeg: 21.0 },       // Aries
    Moon: { signIdx: 1, exactDeg: 14.0 },      // Taurus
    Mars: { signIdx: 9, exactDeg: 19.0 },      // Capricorn
    Mercury: { signIdx: 5, exactDeg: 15.0 },   // Virgo
    Jupiter: { signIdx: 3, exactDeg: 19.0 },   // Cancer
    Venus: { signIdx: 11, exactDeg: 24.0 },    // Pisces
    Saturn: { signIdx: 6, exactDeg: 19.0 },    // Libra
  };

  /**
   * Calculate Varga Sign Index for any planetary longitude and division
   */
  public static calculateVargaSignIndex(longitude: number, vargaCode: string): number {
    const norm = normalizeDeg(longitude);
    const signIdx = Math.floor(norm / 30.0) % 12;
    const degInSign = norm - signIdx * 30.0;

    switch (vargaCode) {
      case "D1": // Rashi
        return signIdx;

      case "D2": { // Hora (Parashari: Odd signs: 0-15° Sun/Leo, 15-30° Moon/Cancer; Even signs: 0-15° Moon/Cancer, 15-30° Sun/Leo)
        const isOdd = signIdx % 2 === 0;
        if (isOdd) {
          return degInSign < 15 ? 4 : 3; // Leo (4) or Cancer (3)
        } else {
          return degInSign < 15 ? 3 : 4; // Cancer (3) or Leo (4)
        }
      }

      case "D3": { // Drekkana (Decanates: 0-10° 1st, 10-20° 5th, 20-30° 9th)
        const dec = Math.floor(degInSign / 10.0);
        return (signIdx + dec * 4) % 12;
      }

      case "D4": { // Chaturthamsha (0-7.5° 1st, 7.5-15° 4th, 15-22.5° 7th, 22.5-30° 10th)
        const part = Math.floor(degInSign / 7.5);
        return (signIdx + part * 3) % 12;
      }

      case "D7": { // Saptamsha (Odd: starts from same sign; Even: starts from 7th sign)
        const isOdd = signIdx % 2 === 0;
        const part = Math.floor(degInSign / (30.0 / 7.0));
        const startSign = isOdd ? signIdx : (signIdx + 6) % 12;
        return (startSign + part) % 12;
      }

      case "D8": { // Ashtamsha (Movable: starts from Aries; Fixed: starts from Sagittarius; Dual: starts from Leo)
        const modality = signIdx % 3; // 0=Movable, 1=Fixed, 2=Dual
        const part = Math.floor(degInSign / (30.0 / 8.0));
        let startSign = 0; // Aries
        if (modality === 1) startSign = 8; // Sagittarius
        else if (modality === 2) startSign = 4; // Leo
        return (startSign + part) % 12;
      }

      case "D9": { // Navamsha (Fire: Aries, Earth: Capricorn, Air: Libra, Water: Cancer)
        const element = signIdx % 4; // 0=Fire, 1=Earth, 2=Air, 3=Water
        const navPart = Math.floor(degInSign / (30.0 / 9.0)); // 0 to 8 (3°20' each)
        let startSign = 0;
        if (element === 0) startSign = 0;      // Aries
        else if (element === 1) startSign = 9; // Capricorn
        else if (element === 2) startSign = 6; // Libra
        else if (element === 3) startSign = 3; // Cancer
        return (startSign + navPart) % 12;
      }

      case "D10": { // Dashamsha (Odd: starts from same sign; Even: starts from 9th sign)
        const isOdd = signIdx % 2 === 0;
        const part = Math.floor(degInSign / 3.0); // 10 parts of 3° each
        const startSign = isOdd ? signIdx : (signIdx + 8) % 12;
        return (startSign + part) % 12;
      }

      case "D12": { // Dwadashamsha (Starts from same sign)
        const part = Math.floor(degInSign / 2.5); // 12 parts of 2°30'
        return (signIdx + part) % 12;
      }

      case "D16": { // Shodashamsha (Movable: Aries, Fixed: Leo, Dual: Sagittarius)
        const modality = signIdx % 3;
        const part = Math.floor(degInSign / (30.0 / 16.0));
        let startSign = 0;
        if (modality === 1) startSign = 4; // Leo
        else if (modality === 2) startSign = 8; // Sagittarius
        return (startSign + part) % 12;
      }

      case "D20": { // Vimshamsha (Movable: Aries, Fixed: Sagittarius, Dual: Leo)
        const modality = signIdx % 3;
        const part = Math.floor(degInSign / 1.5);
        let startSign = 0;
        if (modality === 1) startSign = 8;
        else if (modality === 2) startSign = 4;
        return (startSign + part) % 12;
      }

      case "D24": { // Chaturvimshamsha (Odd: Leo, Even: Cancer)
        const isOdd = signIdx % 2 === 0;
        const part = Math.floor(degInSign / 1.25);
        const startSign = isOdd ? 4 : 3;
        return (startSign + part) % 12;
      }

      case "D27": { // Saptavimshamsha (Fire: Aries, Earth: Cancer, Air: Libra, Water: Capricorn)
        const element = signIdx % 4;
        const part = Math.floor(degInSign / (30.0 / 27.0));
        let startSign = 0;
        if (element === 1) startSign = 3;
        else if (element === 2) startSign = 6;
        else if (element === 3) startSign = 9;
        return (startSign + part) % 12;
      }

      case "D30": { // Trimshamsha (Odd: Mars 5°, Saturn 5°, Jupiter 8°, Mercury 7°, Venus 5°; Even: Venus 5°, Mercury 7°, Jupiter 8°, Saturn 5°, Mars 5°)
        const isOdd = signIdx % 2 === 0;
        if (isOdd) {
          if (degInSign < 5) return 0; // Aries (Mars)
          if (degInSign < 10) return 10; // Aquarius (Saturn)
          if (degInSign < 18) return 8; // Sagittarius (Jupiter)
          if (degInSign < 25) return 2; // Gemini (Mercury)
          return 1; // Taurus (Venus)
        } else {
          if (degInSign < 5) return 1; // Taurus (Venus)
          if (degInSign < 12) return 5; // Virgo (Mercury)
          if (degInSign < 20) return 11; // Pisces (Jupiter)
          if (degInSign < 25) return 9; // Capricorn (Saturn)
          return 7; // Scorpio (Mars)
        }
      }

      case "D40": { // Khavedamsha (Odd: Aries, Even: Libra)
        const isOdd = signIdx % 2 === 0;
        const part = Math.floor(degInSign / 0.75);
        const startSign = isOdd ? 0 : 6;
        return (startSign + part) % 12;
      }

      case "D45": { // Akshavedamsha (Movable: Aries, Fixed: Leo, Dual: Sagittarius)
        const modality = signIdx % 3;
        const part = Math.floor(degInSign / (30.0 / 45.0));
        let startSign = 0;
        if (modality === 1) startSign = 4;
        else if (modality === 2) startSign = 8;
        return (startSign + part) % 12;
      }

      case "D60": { // Shashtiamsha (Direct cyclic progression: signIdx * 60 + part) % 12
        const part = Math.floor(degInSign / 0.5); // 60 parts of 0.5° (30') each
        return (signIdx + part) % 12;
      }

      default:
        return signIdx;
    }
  }

  /**
   * Check if a planetary degree falls in a Pushkar Navamsha
   */
  public static isPushkarNavamsha(longitude: number): boolean {
    const norm = normalizeDeg(longitude);
    const signIdx = Math.floor(norm / 30.0) % 12;
    const degInSign = norm - signIdx * 30.0;
    const navPart = Math.floor(degInSign / (30.0 / 9.0)); // 0 to 8
    const element = signIdx % 4; // 0=Fire, 1=Earth, 2=Air, 3=Water

    // Fire signs: 7th (index 6: 20°-23°20') & 9th (index 8: 26°40'-30°)
    if (element === 0 && (navPart === 6 || navPart === 8)) return true;
    // Earth signs: 3rd (index 2: 6°40'-10°) & 5th (index 4: 13°20'-16°40')
    if (element === 1 && (navPart === 2 || navPart === 4)) return true;
    // Air signs: 6th (index 5: 16°40'-20°) & 8th (index 7: 23°20'-26°40')
    if (element === 2 && (navPart === 5 || navPart === 7)) return true;
    // Water signs: 1st (index 0: 0°-3°20') & 3rd (index 2: 6°40'-10°)
    if (element === 3 && (navPart === 0 || navPart === 2)) return true;

    return false;
  }

  /**
   * Calculate all 16 Shodashavarga Divisional Charts
   */
  public static calculateAllVargas(
    ascendantLongitude: number,
    planets: Record<string, { longitude: number; name: string }>
  ): Record<string, DivisionalChartResult> {
    const VARGA_METADATA: Array<{ code: string; name: string; factor: number; purpose: string }> = [
      { code: "D1", name: "Rashi", factor: 1, purpose: "General physical destiny, overall vitality, baseline chart" },
      { code: "D2", name: "Hora", factor: 2, purpose: "Wealth accumulation, financial flow, resource capacity" },
      { code: "D3", name: "Drekkana", factor: 3, purpose: "Siblings, courage, vitality, initiatives, longevity" },
      { code: "D4", name: "Chaturthamsha", factor: 4, purpose: "Real estate, fixed assets, luck, domestic peace" },
      { code: "D7", name: "Saptamsha", factor: 7, purpose: "Children, lineage, creative legacy, progeny success" },
      { code: "D8", name: "Ashtamsha", factor: 8, purpose: "Sudden obstacles, chronic transformation, longevity" },
      { code: "D9", name: "Navamsha", factor: 9, purpose: "Spouse, marriage, inner dharma, second half of life" },
      { code: "D10", name: "Dashamsha", factor: 10, purpose: "Career, profession, social authority, public achievements" },
      { code: "D12", name: "Dwadashamsha", factor: 12, purpose: "Parents, ancestral karma, lineage inheritance" },
      { code: "D16", name: "Shodashamsha", factor: 16, purpose: "Vehicles, conveyances, comforts, pleasure" },
      { code: "D20", name: "Vimshamsha", factor: 20, purpose: "Spiritual inclinations, devotion, upasana, mantras" },
      { code: "D24", name: "Chaturvimshamsha", factor: 24, purpose: "Higher education, learning, intellectual prowess" },
      { code: "D27", name: "Saptavimshamsha", factor: 27, purpose: "Subconscious strength, physical stamina, vulnerability" },
      { code: "D30", name: "Trimshamsha", factor: 30, purpose: "Misfortunes, evils, psychological imbalances, challenges" },
      { code: "D40", name: "Khavedamsha", factor: 40, purpose: "Auspicious & inauspicious karmic impressions" },
      { code: "D45", name: "Akshavedamsha", factor: 45, purpose: "General character purity and overall moral fiber" },
      { code: "D60", name: "Shashtiamsha", factor: 60, purpose: "Deep past-life karma, root causal destiny matrix" },
    ];

    const results: Record<string, DivisionalChartResult> = {};

    VARGA_METADATA.forEach((vmeta) => {
      const ascVargaSignIdx = this.calculateVargaSignIndex(ascendantLongitude, vmeta.code);
      const ascRashi = ZodiacEngine.getRashiByIndex(ascVargaSignIdx);

      const placements: Record<string, VargaPlanetPlacement> = {};
      const placementsList: VargaPlanetPlacement[] = [];

      Object.values(planets).forEach((p) => {
        const pLon = normalizeDeg(p.longitude);
        const pVargaSignIdx = this.calculateVargaSignIndex(pLon, vmeta.code);
        const pRashi = ZodiacEngine.getRashiByIndex(pVargaSignIdx);
        const house = ((pVargaSignIdx - ascVargaSignIdx + 12) % 12) + 1;

        // Vargottama: In D9, if planet is in same sign as D1
        const d1SignIdx = Math.floor(pLon / 30.0) % 12;
        const isVargottama = vmeta.code === "D9" && pVargaSignIdx === d1SignIdx;

        // Pushkar checks
        const isPN = this.isPushkarNavamsha(pLon);
        const pbConfig = this.PUSHKAR_BHAGAS[p.name];
        const isPB = pbConfig
          ? d1SignIdx === pbConfig.signIdx && Math.abs((pLon % 30) - pbConfig.exactDeg) <= 1.0
          : false;

        const placement: VargaPlanetPlacement = {
          planet: p.name,
          vargaSignIndex: pVargaSignIdx,
          vargaSignName: pRashi.name,
          vargaSignSanskrit: pRashi.sanskrit,
          vargaSignLord: pRashi.rulingLord,
          vargaHouse: house,
          isVargottama: vmeta.code === "D9" ? isVargottama : undefined,
          isPushkarNavamsha: isPN,
          isPushkarBhaga: isPB,
        };

        placements[p.name] = placement;
        placementsList.push(placement);
      });

      results[vmeta.code] = {
        vargaCode: vmeta.code,
        vargaName: vmeta.name,
        divisionFactor: vmeta.factor,
        purpose: vmeta.purpose,
        ascendantSignIndex: ascVargaSignIdx,
        ascendantSignName: ascRashi.name,
        placements,
        placementsList,
      };
    });

    return results;
  }

  public static calculateShodashavarga(
    planets: Record<string, { longitude: number; name: string }>,
    ascendantLongitude: number
  ): Record<string, DivisionalChartResult> {
    return this.calculateAllVargas(ascendantLongitude, planets);
  }
}

export type ShodashavargaReport = Record<string, DivisionalChartResult>;

export const DIVISIONAL_METADATA = [
  { code: "D1", name: "Rashi", factor: 1, purpose: "General physical destiny, overall vitality, baseline chart" },
  { code: "D2", name: "Hora", factor: 2, purpose: "Wealth accumulation, financial flow, resource capacity" },
  { code: "D3", name: "Drekkana", factor: 3, purpose: "Siblings, courage, vitality, initiatives, longevity" },
  { code: "D4", name: "Chaturthamsha", factor: 4, purpose: "Real estate, fixed assets, luck, domestic peace" },
  { code: "D7", name: "Saptamsha", factor: 7, purpose: "Children, lineage, creative legacy, progeny success" },
  { code: "D8", name: "Ashtamsha", factor: 8, purpose: "Sudden obstacles, chronic transformation, longevity" },
  { code: "D9", name: "Navamsha", factor: 9, purpose: "Spouse, marriage, inner dharma, second half of life" },
  { code: "D10", name: "Dashamsha", factor: 10, purpose: "Career, profession, social authority, public achievements" },
  { code: "D12", name: "Dwadashamsha", factor: 12, purpose: "Parents, ancestral karma, lineage inheritance" },
  { code: "D16", name: "Shodashamsha", factor: 16, purpose: "Vehicles, conveyances, comforts, pleasure" },
  { code: "D20", name: "Vimshamsha", factor: 20, purpose: "Spiritual inclinations, devotion, upasana, mantras" },
  { code: "D24", name: "Chaturvimshamsha", factor: 24, purpose: "Higher education, learning, intellectual prowess" },
  { code: "D27", name: "Saptavimshamsha", factor: 27, purpose: "Subconscious strength, physical stamina, vulnerability" },
  { code: "D30", name: "Trimshamsha", factor: 30, purpose: "Misfortunes, evils, psychological imbalances, challenges" },
  { code: "D40", name: "Khavedamsha", factor: 40, purpose: "Auspicious & inauspicious karmic impressions" },
  { code: "D45", name: "Akshavedamsha", factor: 45, purpose: "General character purity and overall moral fiber" },
  { code: "D60", name: "Shashtiamsha", factor: 60, purpose: "Deep past-life karma, root causal destiny matrix" },
];

export function computeAllDivisionalCharts(chart: any): Record<string, DivisionalChartResult> {
  const ascLon = chart.ascendant?.longitude ?? chart.ascendantLongitude ?? 0;
  const planets = chart.planets || {};
  return DivisionalChartsEngine.calculateAllVargas(ascLon, planets);
}

export function computeDivisionalChart(vargaCode: string, chart: any): DivisionalChartResult {
  const all = computeAllDivisionalCharts(chart);
  return all[vargaCode] || all["D1"];
}
