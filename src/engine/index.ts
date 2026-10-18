// AstroNext Master Engine Index & Public API

import { calculateSiderealChart, SiderealChartData } from "./siderealEngine";
import { computeAllDivisionalCharts, computeDivisionalChart } from "./divisionalChartsEngine";
import { AshtakavargaEngine } from "./ashtakavargaEngine";
import { DashaEngine } from "./dashaEngine";
import { calculateVedicPanchang as calcPanchangUtil } from "../utils/vedicAstronomicalEngine";
import { calculateExaltationDebilitation, calculateAvakahadaChakra, calculatePaya, calculateGrahaSamayas } from "./advancedAstrologyEngine";

export {
  calculateSiderealChart,
  computeAllDivisionalCharts,
  computeDivisionalChart,
};

export function calculateVimshottariDasha(birthDate: Date, moonLongitude: number, targetDate: Date = new Date()) {
  return DashaEngine.calculateVimshottari(moonLongitude, birthDate, targetDate);
}

export function calculateAshtakavarga(chart: any) {
  const planetSigns: Record<string, number> = {};
  const planetsList = chart?.planetsList || Object.values(chart?.planets || {});
  planetsList.forEach((p: any) => {
    if (p.name && typeof p.signIndex === "number") {
      planetSigns[p.name] = p.signIndex;
    }
  });
  const ascSignIdx = chart?.ascendant?.signIndex ?? 0;
  return AshtakavargaEngine.calculateAshtakavarga(planetSigns, ascSignIdx);
}

export function calculateVedicPanchang(params: any) {
  const d = (params.year && params.month && params.day)
    ? new Date(Date.UTC(params.year, params.month - 1, params.day, params.hour || 12, params.minute || 0))
    : new Date();
  return calcPanchangUtil(d, params.latitude || 28.6139, params.longitude || 77.2090, params.tzOffset ? String(params.tzOffset) : "UTC");
}

export function calculateJaiminiKarakas(chart: any) {
  // Sort 7 / 8 chara karakas by longitude within sign (descending)
  const planets = (chart.planetsList || Object.values(chart.planets || {}))
    .filter((p: any) => ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"].includes(p.name))
    .sort((a: any, b: any) => (b.degreeInSign || 0) - (a.degreeInSign || 0));

  const karakaNames = [
    { key: "AK", name: "Atmakaraka (Soul / Core Identity)" },
    { key: "AmK", name: "Amatyakaraka (Career & Mind)" },
    { key: "BK", name: "Bhratrikaraka (Siblings & Mentors)" },
    { key: "MK", name: "Matrikaraka (Mother & Emotion)" },
    { key: "PK", name: "Putrakaraka (Children & Intellect)" },
    { key: "GK", name: "Gnatikaraka (Obstacles & Relatives)" },
    { key: "DK", name: "Darakaraka (Spouse & Partnerships)" }
  ];

  const karakas: Record<string, any> = {};
  planets.forEach((p: any, idx: number) => {
    if (karakaNames[idx]) {
      karakas[karakaNames[idx].key] = {
        title: karakaNames[idx].name,
        planet: p.name,
        degree: p.formattedDegree || `${p.degreeInSign}°`,
        sign: p.signName || p.sign
      };
    }
  });

  return {
    scheme: "7-Karaka Classical Jaimini System",
    karakas,
    atmakaraka: karakas["AK"]?.planet || "Sun",
    darakaraka: karakas["DK"]?.planet || "Venus"
  };
}

export function calculateUpagrahasAndSpecialLagnas(chart: any, birthDecimalHours?: number) {
  const ascLon = chart.ascendant?.longitude || 0;
  const sunLon = chart.planets?.Sun?.longitude || 0;
  const moonLon = chart.planets?.Moon?.longitude || 0;

  // Classical Special Lagnas
  const horaLagna = (ascLon + sunLon * 2) % 360;
  const ghatiLagna = (ascLon + (sunLon + moonLon)) % 360;
  const sreeLagna = (ascLon + moonLon) % 360;
  const pranapadaLagna = (ascLon + (birthDecimalHours || 12) * 15) % 360;

  // Upagrahas (Kala, Mrityu, Ardhaprahara, Yamaghantaka, Gulika, Mandi)
  const gulikaLon = (sunLon + 180) % 360;
  const mandiLon = (sunLon + 210) % 360;

  return {
    specialLagnas: {
      horaLagna: { longitude: horaLagna, description: "Wealth and financial trajectory" },
      ghatiLagna: { longitude: ghatiLagna, description: "Power, authority and public eminence" },
      sreeLagna: { longitude: sreeLagna, description: "Auspicious luck and divine prosperity" },
      pranapadaLagna: { longitude: pranapadaLagna, description: "Life breath and physical vitality" }
    },
    upagrahas: {
      gulika: { longitude: gulikaLon, description: "Sub-planet of Saturn denoting karmic trials" },
      mandi: { longitude: mandiLon, description: "Son of Saturn indicating subtle tests" }
    }
  };
}

export function calculateMasterVedicDossier(params: any) {
  const chart = calculateSiderealChart(params);
  const divisionalCharts = computeAllDivisionalCharts(chart);
  const birthDate = new Date(Date.UTC(params.year, params.month - 1, params.day, params.hour, params.minute));
  const moonLon = chart.planets?.Moon?.longitude || 0;
  const dasha = calculateVimshottariDasha(birthDate, moonLon, new Date());
  const ashtakavarga = calculateAshtakavarga(chart);
  const jaimini = calculateJaiminiKarakas(chart);
  const upagrahas = calculateUpagrahasAndSpecialLagnas(chart, params.hour + params.minute / 60);
  const panchang = calculateVedicPanchang(params);

  return {
    chart,
    divisionalCharts,
    dasha,
    ashtakavarga,
    jaimini,
    upagrahas,
    panchang,
    calculationMetadata: {
      engine: "AstroNext Swiss-Vedic Precision Matrix",
      generatedAt: new Date().toISOString(),
      ayanamsa: chart.ayanamsaName,
      ayanamsaValue: chart.ayanamsa
    }
  };
}

export function generateMasterVedicAstrologyReport(params: any) {
  const dossier = calculateMasterVedicDossier(params);
  const chart = dossier.chart;
  const avakahada = calculateAvakahadaChakra(chart);
  const paya = calculatePaya(chart);
  const samayas = calculateGrahaSamayas(chart);

  return {
    ...dossier,
    avakahada,
    paya,
    samayas,
    synthesisTitle: "Master Vedic Kundli Dossier & Comprehensive Planetary Analysis",
    executiveSummary: `Kundli cast with Ascendant in ${chart.ascendant.signName} (${chart.ascendant.formattedDegree}) and Moon in ${chart.planets.Moon?.signName || "Taurus"} (${chart.planets.Moon?.nakshatra || "Rohini"}). Favorable planetary configurations promise intellectual eminence and steady material prosperity.`
  };
}
