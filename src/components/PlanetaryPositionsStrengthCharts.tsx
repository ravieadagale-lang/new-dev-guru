import React, { useState, useMemo } from "react";
import { PlanetPosition } from "../types";
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
  Legend,
  ReferenceLine
} from "recharts";
import {
  BarChart3,
  Award,
  Zap,
  ShieldCheck,
  ShieldAlert,
  Info,
  Layers,
  Activity,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Search,
  BookOpen,
  PieChart as PieIcon,
  Compass
} from "lucide-react";
import {
  PlanetaryShadbalaEngine,
  VimsopakaBalaEngine,
  IshtaKashtaEngine,
  AvasthaEngine,
  StrengthEvidenceEngine,
  ChartCalculationContext,
  PlanetaryCalculationInput,
  VimsopakaScheme
} from "../engine/planetaryStrength";
import { VargaConfluenceEngine } from "../engine/vargaConfluenceEngine";
import { BhavaBalaEngine } from "../engine/bhavaBalaEngine";

interface PlanetaryPositionsStrengthChartsProps {
  planets: PlanetPosition[];
  lagna: string;
  userName?: string;
}

const ZODIAC_ELEMENTS: Record<string, { element: "Fire" | "Earth" | "Air" | "Water"; color: string; icon: string }> = {
  Aries: { element: "Fire", color: "#EF4444", icon: "🔥" },
  Taurus: { element: "Earth", color: "#10B981", icon: "⛰️" },
  Gemini: { element: "Air", color: "#06B6D4", icon: "💨" },
  Cancer: { element: "Water", color: "#3B82F6", icon: "🌊" },
  Leo: { element: "Fire", color: "#F59E0B", icon: "🔥" },
  Virgo: { element: "Earth", color: "#059669", icon: "⛰️" },
  Libra: { element: "Air", color: "#0891B2", icon: "💨" },
  Scorpio: { element: "Water", color: "#2563EB", icon: "🌊" },
  Sagittarius: { element: "Fire", color: "#D97706", icon: "🔥" },
  Capricorn: { element: "Earth", color: "#047857", icon: "⛰️" },
  Aquarius: { element: "Air", color: "#0284C7", icon: "💨" },
  Pisces: { element: "Water", color: "#1D4ED8", icon: "🌊" }
};

const ZODIAC_SIGNS_ORDER = [
  "Aries", "Taurus", "Gemini", "Cancer",
  "Leo", "Virgo", "Libra", "Scorpio",
  "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const BENEFIC_PLANETS = ["Moon", "Mercury", "Jupiter", "Venus"];

const PLANET_COLORS: Record<string, string> = {
  Sun: "#F59E0B",
  Moon: "#38BDF8",
  Mars: "#EF4444",
  Mercury: "#10B981",
  Jupiter: "#8B5CF6",
  Venus: "#EC4899",
  Saturn: "#64748B",
  Rahu: "#0284C7",
  Ketu: "#D97706"
};

export const PlanetaryPositionsStrengthCharts: React.FC<PlanetaryPositionsStrengthChartsProps> = ({
  planets,
  lagna,
  userName = "Native"
}) => {
  const [activeTab, setActiveTab] = useState<"shadbala" | "vimsopaka" | "ishta_kashta" | "avasthas" | "bhavabala" | "varga_confluence" | "inspector">("shadbala");
  const [selectedInspectorPlanet, setSelectedInspectorPlanet] = useState<string>("Sun");
  const [selectedVimsopakaScheme, setSelectedVimsopakaScheme] = useState<"shadvarga" | "saptavarga" | "dashavarga" | "shodashavarga">("shodashavarga");
  const [selectedConfluenceDomain, setSelectedConfluenceDomain] = useState<string>("Career & Status (D10 / Dashamsha)");

  // Derive Ascendant Longitude
  const ascSignIdx = Math.max(0, ZODIAC_SIGNS_ORDER.indexOf(lagna));
  const ascLon = ascSignIdx * 30.0 + 15.0;

  // Build PlanetaryCalculationInput records
  const calculationInputs = useMemo(() => {
    const inputs: Record<string, PlanetaryCalculationInput> = {};
    const simpleLons: Record<string, { longitude: number; name?: string }> = {};

    planets.forEach((p) => {
      const signIdx = Math.max(0, ZODIAC_SIGNS_ORDER.indexOf(p.sign));
      const degNum = typeof p.degree === "number" ? p.degree : parseFloat(p.degree) || 15.0;
      const totalLon = signIdx * 30.0 + degNum;

      inputs[p.name] = {
        name: p.name,
        longitude: totalLon,
        speedLongitudeDegPerDay: p.isRetrograde ? -0.5 : 1.0,
        house: p.house || 1,
        signIndex: signIdx,
        degreeInSign: degNum,
        isRetrograde: p.isRetrograde,
        isCombust: p.isCombust,
      };

      simpleLons[p.name] = { longitude: totalLon, name: p.name };
    });

    return { inputs, simpleLons };
  }, [planets]);

  // Context for deterministic calculations
  const chartContext: ChartCalculationContext = useMemo(() => {
    const sunLon = calculationInputs.inputs.Sun?.longitude ?? 0;
    const moonLon = calculationInputs.inputs.Moon?.longitude ?? 0;
    return {
      planets: calculationInputs.inputs,
      ascendantLongitude: ascLon,
      isDayBirth: true,
      sunLongitude: sunLon,
      moonLongitude: moonLon,
      ayanamsha: "Lahiri",
      houseSystem: "Whole Sign",
    };
  }, [calculationInputs, ascLon]);

  // 1. Classical Shadbala Report
  const shadbalaReport = useMemo(() => {
    try {
      return PlanetaryShadbalaEngine.calculateAll(chartContext);
    } catch (e) {
      console.warn("Shadbala calculation fallback:", e);
      return null;
    }
  }, [chartContext]);

  // 2. Vimsopaka Bala Report
  const vimsopakaReport = useMemo(() => {
    try {
      return VimsopakaBalaEngine.calculateAllSchemes(calculationInputs.simpleLons);
    } catch (e) {
      console.warn("Vimsopaka calculation fallback:", e);
      return null;
    }
  }, [calculationInputs]);

  // 3. Ishta / Kashta Report
  const ishtaKashtaReport = useMemo(() => {
    try {
      if (!shadbalaReport) return null;
      const data: Record<string, { uchchaBala: number; chestaBala: number }> = {};
      Object.entries(shadbalaReport.planets).forEach(([pName, pShad]) => {
        data[pName] = {
          uchchaBala: pShad.sthanaBala.uchchaBalaVirupas,
          chestaBala: pShad.chestaBala.chestaBalaVirupas,
        };
      });
      return IshtaKashtaEngine.calculateAll(data);
    } catch (e) {
      console.warn("Ishta Kashta calculation fallback:", e);
      return null;
    }
  }, [shadbalaReport]);

  // 4. Avasthas Report
  const avasthasReport = useMemo(() => {
    try {
      const dignitiesMap: Record<string, string> = {};
      planets.forEach((p) => {
        dignitiesMap[p.name] = p.dignity || "Neutral";
      });
      return AvasthaEngine.calculateAll(calculationInputs.inputs, dignitiesMap);
    } catch (e) {
      console.warn("Avastha calculation fallback:", e);
      return null;
    }
  }, [calculationInputs, planets]);

  // 5. Bhava Bala Report
  const bhavaBalaReport = useMemo(() => {
    try {
      if (!shadbalaReport) return null;
      const shadMap: Record<string, number> = {};
      Object.entries(shadbalaReport.planets).forEach(([pName, pShad]) => {
        shadMap[pName] = pShad.totalVirupas;
      });
      return BhavaBalaEngine.calculateBhavaBala({
        ascendantLongitude: ascLon,
        planetaryShadbalaVirupas: shadMap,
        planets: calculationInputs.inputs,
      });
    } catch (e) {
      console.warn("Bhava Bala calculation fallback:", e);
      return null;
    }
  }, [shadbalaReport, ascLon, calculationInputs]);

  // 6. Varga Confluence & Domain Reports
  const vargaConfluence = useMemo(() => {
    try {
      const matrix = VargaConfluenceEngine.generateCrossVargaMatrix(calculationInputs.simpleLons, ascLon);
      const domains = VargaConfluenceEngine.evaluateAllDomains(matrix, calculationInputs.simpleLons);
      return { matrix, domains };
    } catch (e) {
      console.warn("Varga confluence fallback:", e);
      return null;
    }
  }, [calculationInputs, ascLon]);

  // 7. Selected Planet Evidence Chain
  const currentPlanetEvidence = useMemo(() => {
    if (!shadbalaReport) return null;
    const shad = shadbalaReport.planets[selectedInspectorPlanet];
    if (!shad) return null;
    const avastha = avasthasReport?.planets[selectedInspectorPlanet];
    const ishtaKashta = ishtaKashtaReport?.planets[selectedInspectorPlanet];
    const vimso = vimsopakaReport?.shodashavarga.planetScores[selectedInspectorPlanet]?.scoreOutOf20;
    return StrengthEvidenceEngine.generatePlanetEvidence(shad, avastha, ishtaKashta, vimso);
  }, [shadbalaReport, avasthasReport, ishtaKashtaReport, vimsopakaReport, selectedInspectorPlanet]);

  // Chart Data for Shadbala Radar
  const radarChartData = useMemo(() => {
    if (!shadbalaReport || !shadbalaReport.rankedList) return [];
    return (shadbalaReport.rankedList || []).map((p) => ({
      planet: p.planet,
      achieved: p.totalRupas,
      required: p.requiredRupas,
      ratioPct: p.strengthRatioPercentage,
      virupas: p.totalVirupas,
    }));
  }, [shadbalaReport]);

  return (
    <div className="bg-white p-5 sm:p-7 rounded-3xl border border-amber-900/10 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-2">
            <Cpu className="w-3.5 h-3.5 text-amber-700" />
            Vedic Quantitative Strength &amp; Varga Intelligence
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Planetary Strength &amp; Bhava Potencies
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Exact Parashari Shadbala (6 Balas), Vimsopaka (D1–D60), Ishta/Kashta Phala, Avasthas, and 12-Bhava Potencies for <span className="font-bold text-slate-900">{userName}</span> ({lagna} Lagna).
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold shrink-0">
          {[
            { id: "shadbala", label: "👑 6-Fold Shadbala" },
            { id: "vimsopaka", label: "💎 Vimsopaka Bala" },
            { id: "ishta_kashta", label: "⚖️ Ishta / Kashta" },
            { id: "avasthas", label: "🎭 Parashari Avasthas" },
            { id: "bhavabala", label: "🏛️ 12 Bhava Bala" },
            { id: "varga_confluence", label: "🔮 Varga Confluence" },
            { id: "inspector", label: "⚡ Calculation Inspector" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === tab.id
                  ? "bg-slate-900 text-amber-300 shadow-xs"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. TAB: SHADBALA VIEW */}
      {activeTab === "shadbala" && shadbalaReport && (
        <div className="space-y-6">
          {/* Top Rank Banner Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-amber-800 uppercase">Strongest Planet (#1)</div>
                <div className="font-serif text-xl font-bold text-amber-950 mt-0.5">
                  {shadbalaReport.strongestPlanet} ({shadbalaReport.planets[shadbalaReport.strongestPlanet]?.totalRupas} Rupas)
                </div>
                <div className="text-xs text-amber-900 mt-1">
                  {shadbalaReport.planets[shadbalaReport.strongestPlanet]?.strengthRatioPercentage}% of required Parashari threshold
                </div>
              </div>
              <Award className="w-8 h-8 text-amber-600 shrink-0" />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-slate-600 uppercase">System Average Strength</div>
                <div className="font-serif text-xl font-bold text-slate-900 mt-0.5">
                  {shadbalaReport.averageVirupas} Virupas
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  {(shadbalaReport.averageVirupas / 60.0).toFixed(2)} Rupas average across 7 Grahas
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-slate-600 shrink-0" />
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-purple-800 uppercase">Weakest / Growth Planet</div>
                <div className="font-serif text-xl font-bold text-purple-950 mt-0.5">
                  {shadbalaReport.weakestPlanet} ({shadbalaReport.planets[shadbalaReport.weakestPlanet]?.totalRupas} Rupas)
                </div>
                <div className="text-xs text-purple-900 mt-1">
                  Rank #{shadbalaReport.planets[shadbalaReport.weakestPlanet]?.rank} • Benefits from propitiation
                </div>
              </div>
              <ShieldAlert className="w-8 h-8 text-purple-600 shrink-0" />
            </div>
          </div>

          {/* Master 6-Fold Virupas Breakdown Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-amber-300 font-serif text-[11px] uppercase tracking-wider">
                  <th className="p-3">Rank</th>
                  <th className="p-3">Planet</th>
                  <th className="p-3">Sthana (Positional)</th>
                  <th className="p-3">Dig (Directional)</th>
                  <th className="p-3">Kala (Temporal)</th>
                  <th className="p-3">Chesta (Motional)</th>
                  <th className="p-3">Naisargika (Natural)</th>
                  <th className="p-3">Drik (Aspectual)</th>
                  <th className="p-3 font-bold text-white">Total Virupas</th>
                  <th className="p-3 font-bold text-amber-300">Rupas / Req</th>
                  <th className="p-3 font-bold">% Power</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {(shadbalaReport?.rankedList || []).map((p) => (
                  <tr key={p.planet} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-3 font-bold text-slate-800">#{p.rank}</td>
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PLANET_COLORS[p.planet] || "#94A3B8" }} />
                      {p.planet}
                    </td>
                    <td className="p-3 font-mono text-slate-700">{p.sthanaBala?.totalSthanaBalaVirupas ?? 0}V</td>
                    <td className="p-3 font-mono text-slate-700">{p.digBala?.digBalaVirupas ?? 0}V</td>
                    <td className="p-3 font-mono text-slate-700">{p.kalaBala?.totalKalaBalaVirupas ?? 0}V</td>
                    <td className="p-3 font-mono text-slate-700">{p.chestaBala?.chestaBalaVirupas ?? 0}V</td>
                    <td className="p-3 font-mono text-slate-700">{p.naisargikaBala?.naisargikaBalaVirupas ?? 0}V</td>
                    <td className="p-3 font-mono text-slate-700">
                      {(p.drikBala?.netDrikBalaVirupas ?? 0) > 0 ? "+" : ""}{p.drikBala?.netDrikBalaVirupas ?? 0}V
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-900 bg-slate-50">{p.totalVirupas}V</td>
                    <td className="p-3 font-mono font-bold text-slate-900">
                      {p.totalRupas} / <span className="text-slate-500">{p.requiredRupas}</span>
                    </td>
                    <td className="p-3 font-bold">
                      <span className={`px-2 py-0.5 rounded-md ${
                        p.strengthRatioPercentage >= 120 ? "bg-emerald-100 text-emerald-900" :
                        p.strengthRatioPercentage >= 100 ? "bg-blue-100 text-blue-900" : "bg-red-100 text-red-900"
                      }`}>
                        {p.strengthRatioPercentage}%
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          setSelectedInspectorPlanet(p.planet);
                          setActiveTab("inspector");
                        }}
                        className="text-[10px] font-bold px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all inline-flex items-center gap-1"
                      >
                        <Search className="w-2.5 h-2.5" /> Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Visual Recharts: Achieved vs Required Rupas */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="font-serif font-bold text-sm text-slate-900">
              Shadbala Rupas vs Parashari Required Threshold (1 Rupa = 60 Virupas)
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={radarChartData} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="planet" tick={{ fontSize: 11, fill: "#475569" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#475569" }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0F172A", color: "#F8FAFC", borderRadius: "12px", fontSize: "11px" }}
                    formatter={(val: any, name: any) => [`${val} Rupas`, name === "achieved" ? "Achieved Rupas" : "Required Minimum"]}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                  <Bar dataKey="achieved" fill="#3B82F6" name="Achieved Rupas" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="required" fill="#94A3B8" name="Required Minimum" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* 2. TAB: VIMSOPAKA BALA VIEW */}
      {activeTab === "vimsopaka" && vimsopakaReport && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Vimsopaka Bala (20-Point Multi-Varga Harmonic Strength)
              </h3>
              <p className="text-xs text-slate-600">
                Calculates weighted planetary dignities across classical Varga clusters specified in BPHS Ch. 45.
              </p>
            </div>

            {/* Scheme Selector */}
            <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              {[
                { id: "shadvarga", label: "Shadvarga (6)" },
                { id: "saptavarga", label: "Saptavarga (7)" },
                { id: "dashavarga", label: "Dashavarga (10)" },
                { id: "shodashavarga", label: "Shodashavarga (16)" },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedVimsopakaScheme(s.id as any)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    selectedVimsopakaScheme === s.id
                      ? "bg-slate-900 text-amber-300 shadow-xs"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scheme Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(vimsopakaReport[selectedVimsopakaScheme].planetScores).map(([pName, pScore]) => (
              <div key={pName} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PLANET_COLORS[pName] || "#94A3B8" }} />
                    {pName}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                    pScore.scoreOutOf20 >= 14 ? "bg-emerald-100 text-emerald-900" :
                    pScore.scoreOutOf20 >= 10 ? "bg-blue-100 text-blue-900" : "bg-amber-100 text-amber-900"
                  }`}>
                    {pScore.status}
                  </span>
                </div>

                <div className="flex items-baseline justify-between text-xs">
                  <span className="text-slate-500">Varga Dignity Score:</span>
                  <span className="font-mono font-bold text-slate-900">{pScore.scoreOutOf20} / 20.0</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all"
                    style={{ width: `${(pScore.scoreOutOf20 / 20.0) * 100}%` }}
                  />
                </div>

                <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200/60">
                  Potency: {pScore.scorePercentage}% • {pScore.scoreOutOf20 >= 15 ? "Exceptional Multi-Varga Alignment" : "Solid Harmonic Balance"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. TAB: ISHTA / KASHTA PHALA VIEW */}
      {activeTab === "ishta_kashta" && ishtaKashtaReport && (
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Ishta Phala (Benefic Fruit) vs Kashta Phala (Difficulty / Malefic Fruit)
            </h3>
            <p className="text-xs text-slate-600">
              Classical BPHS Chapter 28 metric derived from Uchcha Bala and Chesta Bala. Determines the balance of auspicious ease vs struggle during planetary periods.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(ishtaKashtaReport.planets).map((ik) => (
              <div key={ik.planet} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PLANET_COLORS[ik.planet] || "#94A3B8" }} />
                    {ik.planet}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    ik.ishtaPercentage >= 50 ? "bg-emerald-100 text-emerald-900" : "bg-purple-100 text-purple-900"
                  }`}>
                    {ik.netBenevolence}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-700 font-semibold">Ishta (Benefic Ease):</span>
                    <span className="font-mono font-bold text-emerald-900">{ik.ishtaPhala} pts ({ik.ishtaPercentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${ik.ishtaPercentage}%` }} />
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <span className="text-red-700 font-semibold">Kashta (Struggle / Effort):</span>
                    <span className="font-mono font-bold text-red-900">{ik.kashtaPhala} pts ({ik.kashtaPercentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: `${ik.kashtaPercentage}%` }} />
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-200">
                  Uchcha: {ik.uchchaBalaVirupas}V • Chesta: {ik.chestaBalaVirupas}V
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TAB: PARASHARI AVASTHAS VIEW */}
      {activeTab === "avasthas" && avasthasReport && (
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              5 Classical Parashari Avasthas (Consciousness, Age, Dignity, Mood &amp; Activity)
            </h3>
            <p className="text-xs text-slate-600">
              Evaluates the physiological and psychological posture of planets from Brihat Parashara Hora Shastra Chapter 45.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-amber-300 font-serif text-[11px] uppercase tracking-wider">
                  <th className="p-3">Planet</th>
                  <th className="p-3">Baladi (Age / Degree)</th>
                  <th className="p-3">Jagradadi (Consciousness)</th>
                  <th className="p-3">Deeptadi (Radiance / Dignity)</th>
                  <th className="p-3">Lajjitadi (Psychological)</th>
                  <th className="p-3">Shayanaadi (Activity)</th>
                  <th className="p-3 font-bold text-amber-300">Potency %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {Object.values(avasthasReport.planets).map((av) => (
                  <tr key={av.planet} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PLANET_COLORS[av.planet] || "#94A3B8" }} />
                      {av.planet}
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-slate-800">{av.baladi.state}</span>
                      <div className="text-[10px] text-slate-500">{av.baladi.potencyPercentage}% fruition</div>
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-slate-800">{av.jagradadi.state}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-slate-800">{av.deeptadi.state}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-purple-900">{av.lajjitadi.state}</span>
                      <div className="text-[10px] text-slate-500">{av.lajjitadi.primaryEffect}</div>
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-slate-800">{av.shayanaadi.state}</span>
                    </td>
                    <td className="p-3 font-bold">
                      <span className={`px-2 py-0.5 rounded-md ${
                        av.overallPotencyRating >= 75 ? "bg-emerald-100 text-emerald-900" :
                        av.overallPotencyRating >= 50 ? "bg-blue-100 text-blue-900" : "bg-amber-100 text-amber-900"
                      }`}>
                        {av.overallPotencyRating}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. TAB: BHAVA BALA VIEW */}
      {activeTab === "bhavabala" && bhavaBalaReport && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                12 Bhava Bala (Comprehensive House Potencies)
              </h3>
              <p className="text-xs text-slate-600">
                Synthesizes Bhavadhipati Bala (Lord strength), Bhava Dig Bala (Directional orientation), and Bhava Drishti Bala (Aspect radiation).
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
              Peak House: House {bhavaBalaReport.strongestHouse}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.values(bhavaBalaReport.houses).map((h) => (
              <div key={h.houseNumber} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-serif font-bold text-sm text-slate-900">
                    House {h.houseNumber} ({h.houseSign})
                  </span>
                  <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    Rank #{h.relativeRank}
                  </span>
                </div>

                <div className="text-xs text-slate-600">Lord: <span className="font-bold text-slate-900">{h.rulingLord}</span></div>

                <div className="space-y-1 text-xs pt-1 border-t border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Lord Strength:</span>
                    <span className="font-mono text-slate-800">{h.bhavadhipatiBalaVirupas}V</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">House Dig Bala:</span>
                    <span className="font-mono text-slate-800">{h.bhavaDigBalaVirupas}V</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Drishti Aspect:</span>
                    <span className="font-mono text-slate-800">{h.bhavaDrishtiBalaVirupas}V</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900">Total Bhava Bala:</span>
                  <span className="font-mono font-bold text-blue-900">{h.totalBhavaBalaRupas} Rupas</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. TAB: VARGA CONFLUENCE & CROSS-ANALYSIS */}
      {activeTab === "varga_confluence" && vargaConfluence && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                16-Varga Cross-Analysis &amp; Domain Confluence Engine
              </h3>
              <p className="text-xs text-slate-600">
                Multi-harmonic agreement across Shodashavarga charts (D1 to D60).
              </p>
            </div>

            {/* Domain Dropdown */}
            <select
              value={selectedConfluenceDomain}
              onChange={(e) => setSelectedConfluenceDomain(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800"
            >
              {Object.keys(vargaConfluence.domains).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Domain Confluence Report Card */}
          {vargaConfluence.domains[selectedConfluenceDomain] && (
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-serif font-bold text-base text-slate-900">
                  {selectedConfluenceDomain}
                </span>
                <span className="font-bold text-sm px-3 py-1 rounded-full bg-amber-200 text-amber-950">
                  {vargaConfluence.domains[selectedConfluenceDomain].confluenceScorePct}% Confluence
                </span>
              </div>

              <div className="text-xs text-slate-700">
                <span className="font-semibold">Relevant Vargas:</span> {vargaConfluence.domains[selectedConfluenceDomain]?.relevantVargas?.join(", ") || "—"} •{" "}
                <span className="font-semibold">Karakas:</span> {vargaConfluence.domains[selectedConfluenceDomain]?.keyKarakaPlanets?.join(", ") || "—"}
              </div>

              <div className="p-3 rounded-xl bg-white border border-amber-200/60 text-xs text-slate-800 font-medium">
                {vargaConfluence.domains[selectedConfluenceDomain].verdict}
              </div>

              {(vargaConfluence?.domains?.[selectedConfluenceDomain]?.supportingFactors?.length ?? 0) > 0 && (
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-emerald-800 uppercase">Supporting Harmonic Factors:</div>
                  <ul className="text-xs text-emerald-950 space-y-0.5 list-disc pl-4">
                    {(vargaConfluence?.domains?.[selectedConfluenceDomain]?.supportingFactors || []).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Cross-Varga 9x16 Summary Table */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-slate-900">
              Planetary Dignity Across Shodashavargas (D1 to D60)
            </h4>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-amber-300 font-serif text-[10px] uppercase">
                    <th className="p-2.5">Planet</th>
                    {VargaConfluenceEngine.SHODASHAVARGA_CODES.map((code) => (
                      <th key={code} className="p-2 text-center">{code}</th>
                    ))}
                    <th className="p-2.5 text-right font-bold text-white">Avg / 20</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {Object.values(vargaConfluence.matrix).map((row) => (
                    <tr key={row.planet} className="hover:bg-amber-50/20">
                      <td className="p-2.5 font-bold text-slate-900">{row.planet}</td>
                      {VargaConfluenceEngine.SHODASHAVARGA_CODES.map((code) => {
                        const cell = row.vargas[code];
                        const isExalt = cell?.dignity === "Exalted";
                        const isOwn = cell?.dignity === "Own Sign";
                        const isDebil = cell?.dignity === "Debilitated";
                        return (
                          <td key={code} className="p-2 text-center text-[10px]">
                            <span className={`px-1.5 py-0.5 rounded font-mono ${
                              isExalt ? "bg-emerald-100 text-emerald-900 font-bold" :
                              isOwn ? "bg-blue-100 text-blue-900 font-bold" :
                              isDebil ? "bg-red-100 text-red-900 font-bold" : "text-slate-600"
                            }`}>
                              {cell ? cell.signName.slice(0, 3) : "-"}
                            </span>
                          </td>
                        );
                      })}
                      <td className="p-2.5 text-right font-mono font-bold text-slate-900">{row.averageDignityScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 7. TAB: CALCULATION INSPECTOR & EVIDENCE VIEW */}
      {activeTab === "inspector" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Calculation Inspector &amp; Scriptural Evidence Engine
              </h3>
              <p className="text-xs text-slate-600">
                Step-by-step verifiable mathematical proofs and Brihat Parashara citations for every planetary output.
              </p>
            </div>

            {/* Planet Selector */}
            <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              {["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"].map((pName) => (
                <button
                  key={pName}
                  onClick={() => setSelectedInspectorPlanet(pName)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    selectedInspectorPlanet === pName
                      ? "bg-slate-900 text-amber-300 shadow-xs"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  {pName}
                </button>
              ))}
            </div>
          </div>

          {currentPlanetEvidence ? (
            <div className="space-y-4">
              {/* Summary Banner */}
              <div className="p-4 rounded-2xl bg-slate-950 text-slate-100 border border-amber-500/30 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-amber-300 font-serif font-bold text-base">
                    Evidence Report: {currentPlanetEvidence.planet} (Rank #{currentPlanetEvidence.rank})
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-bold">
                    {currentPlanetEvidence.strengthPercentage}% Parashari Power
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-sans leading-relaxed">
                  {currentPlanetEvidence.summaryVerdict}
                </div>
              </div>

              {/* Evidence Chain Cards */}
              <div className="space-y-3">
                {(currentPlanetEvidence?.evidenceChain || []).map((ev) => (
                  <div key={ev.ruleId} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-[10px] text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md font-bold">
                          {ev.ruleId}
                        </span>
                        <span className="font-bold text-slate-900 ml-2">{ev.factorName}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-serif italic">{ev.source}</span>
                    </div>

                    <div className="font-mono text-[11px] text-slate-600 pt-1">
                      <span className="text-slate-400">Formula:</span> {ev.formula}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-200">
                      <div>
                        <span className="text-slate-500">Inputs:</span> <span className="font-mono text-slate-800">{ev.inputValue}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Output:</span> <span className="font-mono font-bold text-blue-900">{ev.outputContribution}</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-600 bg-white p-2 rounded-xl border border-slate-200/80">
                      <span className="font-semibold text-slate-700">Verification:</span> {ev.interpretation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-500">
              Select a planet above to view its comprehensive mathematical evidence tree.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
