/**
 * Dev-Guru Astrology Reference Data & Calculation Adapters
 */

import { NAKSHATRAS } from "../engine/nakshatraEngine";
import { ZODIAC_SIGNS } from "../engine/zodiacEngine";
import { DivisionalChartsEngine } from "../engine/divisionalChartsEngine";
import { calculateSiderealChart } from "../engine/siderealEngine";
import { calculateAuthoritativePanchang } from "../engine/panchangEngine";
import { PlanetPosition, HouseDetail } from "../types";

export const RASHIS = [
  { id: 1, name: "Aries", sanskrit: "Mesha", lord: "Mars", element: "Fire", symbol: "♈", englishName: "Aries" },
  { id: 2, name: "Taurus", sanskrit: "Vrishabha", lord: "Venus", element: "Earth", symbol: "♉", englishName: "Taurus" },
  { id: 3, name: "Gemini", sanskrit: "Mithuna", lord: "Mercury", element: "Air", symbol: "♊", englishName: "Gemini" },
  { id: 4, name: "Cancer", sanskrit: "Karka", lord: "Moon", element: "Water", symbol: "♋", englishName: "Cancer" },
  { id: 5, name: "Leo", sanskrit: "Simha", lord: "Sun", element: "Fire", symbol: "♌", englishName: "Leo" },
  { id: 6, name: "Virgo", sanskrit: "Kanya", lord: "Mercury", element: "Earth", symbol: "♍", englishName: "Virgo" },
  { id: 7, name: "Libra", sanskrit: "Tula", lord: "Venus", element: "Air", symbol: "♎", englishName: "Libra" },
  { id: 8, name: "Scorpio", sanskrit: "Vrishchika", lord: "Mars", element: "Water", symbol: "♏", englishName: "Scorpio" },
  { id: 9, name: "Sagittarius", sanskrit: "Dhanu", lord: "Jupiter", element: "Fire", symbol: "♐", englishName: "Sagittarius" },
  { id: 10, name: "Capricorn", sanskrit: "Makara", lord: "Saturn", element: "Earth", symbol: "♑", englishName: "Capricorn" },
  { id: 11, name: "Aquarius", sanskrit: "Kumbha", lord: "Saturn", element: "Air", symbol: "♒", englishName: "Aquarius" },
  { id: 12, name: "Pisces", sanskrit: "Meena", lord: "Jupiter", element: "Water", symbol: "♓", englishName: "Pisces" },
];

export const RASHI_LORDS: Record<string, string> = {
  Aries: "Mars",
  Taurus: "Venus",
  Gemini: "Mercury",
  Cancer: "Moon",
  Leo: "Sun",
  Virgo: "Mercury",
  Libra: "Venus",
  Scorpio: "Mars",
  Sagittarius: "Jupiter",
  Capricorn: "Saturn",
  Aquarius: "Saturn",
  Pisces: "Jupiter",
  Mesha: "Mars",
  Vrishabha: "Venus",
  Mithuna: "Mercury",
  Karka: "Moon",
  Simha: "Sun",
  Kanya: "Mercury",
  Tula: "Venus",
  Vrishchika: "Mars",
  Dhanu: "Jupiter",
  Makara: "Saturn",
  Kumbha: "Saturn",
  Meena: "Jupiter",
};

export const NAKSHATRAS_MASTER = NAKSHATRAS.map((n, i) => ({
  id: i + 1,
  name: n.name,
  sanskrit: n.sanskrit,
  lord: n.lord,
  deity: n.deity,
  symbol: n.symbol,
  pada: 4,
}));

export const HOUSES_SIGNIFICANCE: Record<number, { title: string; significations: string[] }> = {
  1: { title: "Lagna / 1st House", significations: ["Self", "Personality", "Vitality", "Physical body"] },
  2: { title: "Dhana / 2nd House", significations: ["Wealth", "Speech", "Family", "Food"] },
  3: { title: "Sahaja / 3rd House", significations: ["Siblings", "Courage", "Communication", "Short travels"] },
  4: { title: "Sukha / 4th House", significations: ["Mother", "Home", "Vehicles", "Happiness"] },
  5: { title: "Putra / 5th House", significations: ["Children", "Intelligence", "Past karma", "Romance"] },
  6: { title: "Ripu / 6th House", significations: ["Enemies", "Debts", "Disease", "Service"] },
  7: { title: "Kalatra / 7th House", significations: ["Spouse", "Partnership", "Business", "Foreign travel"] },
  8: { title: "Ayu / 8th House", significations: ["Longevity", "Occult", "Transformation", "Sudden events"] },
  9: { title: "Bhagya / 9th House", significations: ["Fortune", "Guru", "Dharma", "Higher learning"] },
  10: { title: "Karma / 10th House", significations: ["Career", "Status", "Fame", "Father"] },
  11: { title: "Labha / 11th House", significations: ["Gains", "Friends", "Elder siblings", "Aspirations"] },
  12: { title: "Vyaya / 12th House", significations: ["Losses", "Moksha", "Foreign lands", "Hospitalization"] },
};

export function calculateDivisionalChartData(
  planets: PlanetPosition[],
  houses: HouseDetail[],
  lagnaSign: string,
  vargaCode: string = "D1"
): { planets: PlanetPosition[]; houses: HouseDetail[]; lagna: string } {
  if (vargaCode === "D1" || !vargaCode) {
    return { planets, houses, lagna: lagnaSign };
  }

  const lagnaIndex = RASHIS.findIndex(
    r => r.name.toLowerCase() === lagnaSign.toLowerCase() || r.sanskrit.toLowerCase() === lagnaSign.toLowerCase()
  );
  const lagnaDeg = (lagnaIndex >= 0 ? lagnaIndex : 0) * 30 + 15;
  const vargaLagnaIdx = DivisionalChartsEngine.calculateVargaSignIndex(lagnaDeg, vargaCode);
  const vargaLagna = RASHIS[vargaLagnaIdx]?.name || "Aries";

  const updatedPlanets = (planets || []).map(p => {
    const pSignIdx = RASHIS.findIndex(
      r => r.name.toLowerCase() === p.sign.toLowerCase() || r.sanskrit.toLowerCase() === p.sign.toLowerCase()
    );
    const safeSignIdx = pSignIdx >= 0 ? pSignIdx : 0;
    const degInSign = typeof p.degreeInSign === "number" ? p.degreeInSign : typeof p.degree === "number" ? p.degree : 15;
    const rawLon = safeSignIdx * 30 + degInSign;
    const vargaSignIdx = DivisionalChartsEngine.calculateVargaSignIndex(rawLon, vargaCode);
    const sign = RASHIS[vargaSignIdx]?.name || "Aries";
    const house = ((vargaSignIdx - vargaLagnaIdx + 12) % 12) + 1;
    return {
      ...p,
      sign,
      house,
      degreeInSign: (degInSign * 9) % 30,
    };
  });

  const updatedHouses = (houses || []).map((h, i) => {
    const signIdx = (vargaLagnaIdx + i) % 12;
    const sign = RASHIS[signIdx]?.name || "Aries";
    return {
      ...h,
      house: i + 1,
      sign,
      ruler: RASHI_LORDS[sign] || "Mars",
    };
  });

  return {
    planets: updatedPlanets,
    houses: updatedHouses,
    lagna: vargaLagna,
  };
}

export function calculateLagna(
  dob: string = "2026-10-01",
  tob: string = "12:00",
  latOrPlace: any = 28.6139,
  lon: any = 77.2090,
  tzOffset: number = 5.5
): string {
  const [y, m, d] = (dob || "2026-10-01").split("-").map(Number);
  const [h, min] = (tob || "12:00").split(":").map(Number);
  const lat = typeof latOrPlace === "number" ? latOrPlace : 28.6139;
  const lng = typeof lon === "number" ? lon : 77.2090;
  try {
    const chart = calculateSiderealChart({
      year: y || 2026,
      month: m || 10,
      day: d || 1,
      hour: h || 12,
      minute: min || 0,
      latitude: lat,
      longitude: lng,
      timezoneOffsetHours: typeof tzOffset === "number" ? tzOffset : 5.5,
    });
    return chart.ascendant.signName;
  } catch {
    return "Aries";
  }
}

export function generatePlanetaryPositions(
  dob: string = "2026-10-01",
  tob: string = "12:00",
  latOrPlace: any = 28.6139,
  lagnaOrLon: any = 77.2090,
  tzOffset: number = 5.5
): { planets: PlanetPosition[]; houses: HouseDetail[] } {
  const [y, m, d] = (dob || "2026-10-01").split("-").map(Number);
  const [h, min] = (tob || "12:00").split(":").map(Number);
  const lat = typeof latOrPlace === "number" ? latOrPlace : 28.6139;
  const lon = typeof lagnaOrLon === "number" ? lagnaOrLon : 77.2090;

  try {
    const chart = calculateSiderealChart({
      year: y || 2026,
      month: m || 10,
      day: d || 1,
      hour: h || 12,
      minute: min || 0,
      latitude: lat,
      longitude: lon,
      timezoneOffsetHours: typeof tzOffset === "number" ? tzOffset : 5.5,
    });

    const planets: PlanetPosition[] = chart.planetsList.map(p => ({
      name: p.name,
      sign: p.sign,
      degree: p.formattedDegree || `${p.degreeInSign.toFixed(1)}°`,
      degreeInSign: p.degreeInSign,
      longitude: p.longitude,
      speed: p.speed,
      house: p.house,
      nakshatra: p.nakshatra,
      nakshatraLord: "",
      isRetrograde: p.isRetrograde,
      dignity: p.dignity,
    }));

    const ascSignIdx = chart.ascendant.signIndex;
    const houses: HouseDetail[] = Array.from({ length: 12 }, (_, i) => {
      const sIdx = (ascSignIdx + i) % 12;
      const sName = RASHIS[sIdx]?.name || "Aries";
      return {
        house: i + 1,
        sign: sName,
        ruler: RASHI_LORDS[sName] || "Mars",
        degree: 0,
      };
    });

    return { planets, houses };
  } catch {
    const planets: PlanetPosition[] = [];
    const houses: HouseDetail[] = [];
    return { planets, houses };
  }
}

export function calculateTodayPanchang(city?: any): any {
  const now = new Date();
  const lat = city?.latitude ?? 28.6139;
  const lon = city?.longitude ?? 77.2090;
  const tz = city?.timezoneOffsetHours ?? 5.5;
  return calculateAuthoritativePanchang({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds(),
    latitude: lat,
    longitude: lon,
    timezoneOffsetHours: tz,
  });
}
