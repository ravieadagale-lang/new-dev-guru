import React, { useState, useMemo } from "react";
import { UserProfile, PlanetPosition, HouseDetail } from "../../types";
import {
  Activity,
  Compass,
  RotateCcw,
  Sparkles,
  Calendar,
  AlertTriangle,
  Clock,
  TrendingUp,
  CheckCircle2,
  Layers,
  Zap,
  Flame,
  BookOpen,
} from "lucide-react";
import { playCardHoverSound, playCardFlipSound } from "../../utils/audioEffects";
import {
  MasterTransitEngine,
  MasterTransitReport,
  DashaTransitConfluenceItem,
} from "../../engine/transits";
import { AshtakavargaEngine } from "../../engine/ashtakavargaEngine";
import { ZODIAC_RASHIS } from "../../engine/zodiacEngine";

interface TransitsWorkspaceProps {
  userProfile?: UserProfile;
  planets: PlanetPosition[];
  houses: HouseDetail[];
  lagnaSign: string;
}

export type TransitsSubTab =
  | "live_gochara"
  | "natal_vs_transit"
  | "saturn_sade_sati"
  | "jupiter_transit"
  | "rahu_ketu_transit"
  | "ashtakavarga_kakshya"
  | "dasha_confluence"
  | "transit_calendar"
  | "calculation_evidence";

export const TransitsWorkspace: React.FC<TransitsWorkspaceProps> = ({
  userProfile,
  planets,
  houses,
  lagnaSign,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<TransitsSubTab>("live_gochara");

  // Date and Time controls for real-time transit recalculation
  const [transitDateStr, setTransitDateStr] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [transitTimeStr, setTransitTimeStr] = useState<string>("12:00");
  const [ayanamsaType, setAyanamsaType] = useState<string>("Lahiri");
  const [selectedPlanetFilter, setSelectedPlanetFilter] = useState<string>("ALL");
  const [selectedEvidenceSection, setSelectedEvidenceSection] = useState<string>("Gochara & Vedha Rules");

  // Compute selected transit Date object
  const targetTransitDate = useMemo(() => {
    try {
      const d = new Date(`${transitDateStr}T${transitTimeStr}:00`);
      return isNaN(d.getTime()) ? new Date() : d;
    } catch {
      return new Date();
    }
  }, [transitDateStr, transitTimeStr]);

  // Construct natal planet map with calculated absolute longitude
  const natalPlanetsMap = useMemo(() => {
    const map: Record<string, { longitude: number; name?: string; sign?: string }> = {};
    planets.forEach((p) => {
      const sIdx = ZODIAC_RASHIS.findIndex((r) => r.name.toLowerCase() === p.sign.toLowerCase());
      const signBase = sIdx >= 0 ? sIdx * 30 : 0;
      const absLon = (signBase + (p.degree || 0)) % 360;
      map[p.name] = {
        longitude: absLon,
        name: p.name,
        sign: p.sign,
      };
    });
    return map;
  }, [planets]);

  // Derive Moon and Ascendant longitudes
  const natalMoonLon = useMemo(() => {
    const moon = planets.find((p) => p.name === "Moon");
    if (!moon) return 45.0; // Fallback Taurus 15°
    const sIdx = ZODIAC_RASHIS.findIndex((r) => r.name.toLowerCase() === moon.sign.toLowerCase());
    const signBase = sIdx >= 0 ? sIdx * 30 : 0;
    return (signBase + (moon.degree || 0)) % 360;
  }, [planets]);

  const natalAscendantLon = useMemo(() => {
    const h1 = houses.find((h) => h.houseNumber === 1);
    if (h1 && h1.degreeCusp !== undefined) {
      const sIdx = ZODIAC_RASHIS.findIndex((r) => r.name.toLowerCase() === h1.sign.toLowerCase());
      const signBase = sIdx >= 0 ? sIdx * 30 : 0;
      return (signBase + h1.degreeCusp) % 360;
    }
    const sIdx = ZODIAC_RASHIS.findIndex((r) => r.name.toLowerCase() === lagnaSign.toLowerCase());
    return sIdx >= 0 ? sIdx * 30 + 15 : 30.0;
  }, [houses, lagnaSign]);

  // Compute Ashtakavarga from natal placements
  const ashtakavargaReport = useMemo(() => {
    const signIndices: Record<string, number> = {};
    planets.forEach((p) => {
      const sIdx = ZODIAC_RASHIS.findIndex((r) => r.name.toLowerCase() === p.sign.toLowerCase());
      signIndices[p.name] = sIdx >= 0 ? sIdx : 0;
    });
    const ascSignIdx = Math.floor(natalAscendantLon / 30.0) % 12;
    return AshtakavargaEngine.calculateAshtakavarga(signIndices, ascSignIdx);
  }, [planets, natalAscendantLon]);

  // Run Master Transit Engine
  const masterTransitReport: MasterTransitReport = useMemo(() => {
    const lat = userProfile?.latitude ?? 28.6139;
    const lon = userProfile?.longitude ?? 77.2090;
    const tz = 5.5; // Standard Indian Standard Time default

    return MasterTransitEngine.calculateMasterTransits({
      natalPlanets: natalPlanetsMap,
      natalAscendantLon,
      natalMoonLon,
      ashtakavarga: ashtakavargaReport,
      targetDate: targetTransitDate,
      latitude: lat,
      longitude: lon,
      timezoneOffsetHours: tz,
      ayanamsaType,
    });
  }, [
    natalPlanetsMap,
    natalAscendantLon,
    natalMoonLon,
    ashtakavargaReport,
    targetTransitDate,
    userProfile,
    ayanamsaType,
  ]);

  const subTabs: { id: TransitsSubTab; label: string; icon: any }[] = [
    { id: "live_gochara", label: "Live Gochara Matrix", icon: Activity },
    { id: "natal_vs_transit", label: "Natal vs Transit & Aspects", icon: Compass },
    { id: "saturn_sade_sati", label: "Saturn Sade Sati & Dhaiya", icon: AlertTriangle },
    { id: "jupiter_transit", label: "Jupiter (Guru) Blessing", icon: Sparkles },
    { id: "rahu_ketu_transit", label: "Rahu-Ketu Karmic Axis", icon: TrendingUp },
    { id: "ashtakavarga_kakshya", label: "Ashtakavarga & Kakshyas", icon: Layers },
    { id: "dasha_confluence", label: "Dasha-Transit Confluence", icon: Zap },
    { id: "transit_calendar", label: "Ingress Milestones (2024–2030)", icon: Calendar },
    { id: "calculation_evidence", label: "Calculation Inspector & Shlokas", icon: BookOpen },
  ];

  const resetToToday = () => {
    const now = new Date();
    setTransitDateStr(now.toISOString().slice(0, 10));
    setTransitTimeStr(now.toTimeString().slice(0, 5));
    playCardFlipSound();
  };

  const getDignityBadgeClass = (dignity: string) => {
    switch (dignity) {
      case "Exalted":
        return "bg-amber-100 text-amber-900 border-amber-300";
      case "Moolatrikona":
      case "Own Sign":
        return "bg-emerald-100 text-emerald-900 border-emerald-300";
      case "Friendly":
      case "Great Friend":
      case "Friend":
        return "bg-sky-100 text-sky-900 border-sky-300";
      case "Neutral":
        return "bg-slate-100 text-slate-800 border-slate-300";
      case "Enemy":
      case "Great Enemy":
        return "bg-orange-100 text-orange-900 border-orange-300";
      case "Debilitated":
        return "bg-rose-100 text-rose-900 border-rose-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  const getConfluenceBadgeClass = (level: DashaTransitConfluenceItem["confluenceLevel"]) => {
    switch (level) {
      case "STRONG AUSPICIOUS":
        return "bg-emerald-600 text-white font-bold";
      case "MODERATE AUSPICIOUS":
        return "bg-emerald-100 text-emerald-900 border border-emerald-300";
      case "MIXED / FRICTIONAL":
        return "bg-amber-100 text-amber-900 border border-amber-300";
      case "CHALLENGING":
        return "bg-rose-100 text-rose-900 border border-rose-300";
      case "NEUTRAL":
      default:
        return "bg-slate-100 text-slate-700 border border-slate-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Master Control Header & Ephemeris Bar */}
      <div className="bg-white rounded-3xl p-5 border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                Phase 5 Deterministic Transit Engine
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-mono">
                JD: {masterTransitReport.julianDayUT?.toFixed(4) ?? "—"}
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              Planetary Transits (Gochara), Vedha &amp; Ashtakavarga Engine
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Pure mathematical astronomical ephemeris with Parashari Vedha obstruction rules, 8-fold Kakshya divisions, and Sade Sati 3-phase diagnostics.
            </p>
          </div>

          {/* Interactive Date/Time & Ayanamsha Selector */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 text-xs">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <input
                type="date"
                value={transitDateStr}
                onChange={(e) => setTransitDateStr(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-slate-800 font-medium focus:ring-1 focus:ring-amber-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <input
                type="time"
                value={transitTimeStr}
                onChange={(e) => setTransitTimeStr(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-slate-800 font-medium focus:ring-1 focus:ring-amber-500 outline-none"
              />
            </div>

            <select
              value={ayanamsaType}
              onChange={(e) => setAyanamsaType(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-slate-800 font-medium focus:ring-1 focus:ring-amber-500 outline-none"
            >
              <option value="Lahiri">Lahiri (Chitrapaksha)</option>
              <option value="Krishnamurti">KP Standard</option>
              <option value="Raman">B.V. Raman</option>
              <option value="Fagan-Bradley">Fagan-Bradley</option>
              <option value="Yukteswar">Sri Yukteswar</option>
            </select>

            <button
              onClick={resetToToday}
              onMouseEnter={playCardHoverSound}
              className="flex items-center gap-1 px-3 py-1 bg-slate-900 text-amber-300 hover:bg-slate-800 rounded-lg font-bold transition-all shadow-2xs"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Today</span>
            </button>
          </div>
        </div>

        {/* Dynamic Key Transit Indicator Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
          <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
            <span className="text-slate-600 font-medium">Saturn (Shani):</span>
            <span className="font-bold text-slate-900">
              {masterTransitReport.currentPositions.Saturn?.signName} ({masterTransitReport.currentPositions.Saturn?.formattedDMS})
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between">
            <span className="text-slate-600 font-medium">Jupiter (Guru):</span>
            <span className="font-bold text-slate-900">
              {masterTransitReport.currentPositions.Jupiter?.signName} ({masterTransitReport.currentPositions.Jupiter?.formattedDMS})
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200/80 flex items-center justify-between">
            <span className="text-slate-600 font-medium">Rahu Axis:</span>
            <span className="font-bold text-slate-900">
              {masterTransitReport.currentPositions.Rahu?.signName} / {masterTransitReport.currentPositions.Ketu?.signName}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200/80 flex items-center justify-between">
            <span className="text-slate-600 font-medium">Sade Sati:</span>
            <span className="font-bold text-rose-900">
              {masterTransitReport.sadeSati.phase}
            </span>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 pt-3">
          {subTabs.map((tab) => {
            const isActive = activeSubTab === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playCardFlipSound();
                  setActiveSubTab(tab.id);
                }}
                onMouseEnter={playCardHoverSound}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-slate-900 text-amber-300 shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                }`}
              >
                <TabIcon className={`w-3.5 h-3.5 ${isActive ? "text-amber-400" : "text-slate-500"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. LIVE GOCHARA & PLANETARY POSITIONS MATRIX */}
      {/* ========================================================================= */}
      {activeSubTab === "live_gochara" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Real-Time Gochara Positions &amp; Vedha Status
                </h3>
                <p className="text-xs text-slate-600">
                  High-precision celestial coordinates for {targetTransitDate.toLocaleDateString()} at {transitTimeStr} (Ayanamsha: {ayanamsaType} {masterTransitReport.ayanamsaDeg?.toFixed(4) ?? "—"}°)
                </p>
              </div>

              {/* Planet filter */}
              <div className="flex items-center gap-1">
                {["ALL", "Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPlanetFilter(p)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                      selectedPlanetFilter === p
                        ? "bg-slate-900 text-amber-300"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Table of Live Planetary Positions */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                    <th className="py-2.5 px-3">Graha</th>
                    <th className="py-2.5 px-3">Sign &amp; Degree</th>
                    <th className="py-2.5 px-3">Nakshatra &amp; Pada</th>
                    <th className="py-2.5 px-3">Speed (°/day)</th>
                    <th className="py-2.5 px-3">Motion / Dignity</th>
                    <th className="py-2.5 px-3">H. from Moon</th>
                    <th className="py-2.5 px-3">H. from Lagna</th>
                    <th className="py-2.5 px-3">Gochara / Vedha</th>
                    <th className="py-2.5 px-3">BAV / SAV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {masterTransitReport.currentPositionsList
                    .filter((p) => selectedPlanetFilter === "ALL" || p.name === selectedPlanetFilter)
                    .map((p) => {
                      const gMoon = masterTransitReport.gocharaFromMoon.find((g) => g.planet === p.name);
                      const gLagna = masterTransitReport.gocharaFromLagna.find((g) => g.planet === p.name);
                      const avScore = masterTransitReport.ashtakavargaTransit.planetTransitScores[p.name];

                      return (
                        <tr key={p.name} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2.5 px-3 font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{p.name}</span>
                            {p.isRetrograde && (
                              <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">
                                [R]
                              </span>
                            )}
                            {p.combustion?.isCombust && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 text-[10px] font-bold flex items-center gap-0.5">
                                <Flame className="w-2.5 h-2.5 text-amber-600" />
                                Combust
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 font-mono font-medium">
                            <span className="font-bold text-slate-900">{p.signName}</span>{" "}
                            <span className="text-slate-600">{p.formattedDMS}</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="font-semibold text-slate-900">{p.nakshatraName}</span>{" "}
                            <span className="text-slate-500 font-mono">P-{p.pada}</span>
                            <span className="block text-[10px] text-slate-400">Lord: {p.nakshatraLord}</span>
                          </td>
                          <td className="py-2.5 px-3 font-mono">
                            <span className={(p.speedDegPerDay ?? 0) < 0 ? "text-rose-600 font-bold" : "text-slate-700"}>
                              {p.speedDegPerDay !== undefined && p.speedDegPerDay !== null
                                ? (p.speedDegPerDay > 0 ? `+${p.speedDegPerDay.toFixed(4)}` : p.speedDegPerDay.toFixed(4))
                                : "—"}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${getDignityBadgeClass(p.dignity)}`}>
                              {p.dignity}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-bold text-slate-900">
                            House {gMoon?.transitHouse ?? "-"}
                          </td>
                          <td className="py-2.5 px-3 font-bold text-slate-700">
                            House {gLagna?.transitHouse ?? "-"}
                          </td>
                          <td className="py-2.5 px-3">
                            {gMoon?.isBeneficGochara ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px] border border-emerald-300">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                Benefic (Unobstructed)
                              </span>
                            ) : gMoon?.isObstructedByVedha ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] border border-amber-300" title={`Obstructed by ${gMoon.vedhaPlanet} in House ${gMoon.vedhaHouse}`}>
                                <AlertTriangle className="w-3 h-3 text-amber-600" />
                                Vedha by {gMoon.vedhaPlanet} (H{gMoon.vedhaHouse})
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">
                                Neutral / Standard
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 font-mono">
                            {avScore ? (
                              <span className="font-bold text-slate-900">
                                {avScore.bav} <span className="text-slate-400 font-normal">/ {avScore.sav} pts</span>
                              </span>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gochara Interpretations & Classical Shloka Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(masterTransitReport?.gocharaFromMoon || []).map((g) => (
              <div key={g.planet} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{g.planet}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                      House {g.transitHouse} from Janma Moon
                    </span>
                  </div>
                  {g.isBeneficGochara ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Benefic
                    </span>
                  ) : g.isObstructedByVedha ? (
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                      Vedha Obstructed
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]">
                      Regular
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{g.classicalEffect}</p>
                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  <span>Source: {g.source}</span>
                  <span className="font-mono">Rule: {g.ruleId}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. NATAL VS TRANSIT DUAL ENGINE & ASPECT RAYS */}
      {/* ========================================================================= */}
      {activeSubTab === "natal_vs_transit" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Dual Comparison: Natal Placements vs Active Real-Time Sky
            </h3>
            <p className="text-xs text-slate-600">
              Direct comparison between your natal birth chart and the live planetary transits today, including house displacement and aspect projections.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                    <th className="py-2.5 px-3">Graha</th>
                    <th className="py-2.5 px-3">Natal Position</th>
                    <th className="py-2.5 px-3">Transit Position</th>
                    <th className="py-2.5 px-3">Angular Distance</th>
                    <th className="py-2.5 px-3">Aspect / Contact</th>
                    <th className="py-2.5 px-3">House from Lagna</th>
                    <th className="py-2.5 px-3">House from Moon</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {(masterTransitReport?.natalVsTransit || []).map((comp) => (
                    <tr key={comp.planet} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{comp.planet}</td>
                      <td className="py-2.5 px-3 font-mono">
                        <span className="font-bold text-slate-900">{comp.natalSignName}</span>{" "}
                        <span className="text-slate-600">{comp.natalDegree?.toFixed(2) ?? "0.00"}°</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono">
                        <span className="font-bold text-slate-900">{comp.transitSignName}</span>{" "}
                        <span className="text-slate-600">{comp.transitDegree?.toFixed(2) ?? "0.00"}°</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-medium">
                        {comp.angularSeparationDeg?.toFixed(2) ?? "0.00"}°
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 font-bold border border-indigo-200 text-[10px]">
                          {comp.aspectRelationship}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">
                        House {comp.houseFromLagna}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">
                        House {comp.houseFromMoon}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SATURN SADE SATI & DHAIYA COMMAND CENTER */}
      {/* ========================================================================= */}
      {activeSubTab === "saturn_sade_sati" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="px-3 py-0.5 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold uppercase tracking-wider">
                  Shani Mahadasha &amp; Gochara Diagnostics
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                  Saturn Transit, Sade Sati &amp; Small Dhaiyas
                </h3>
              </div>
              <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full border ${
                masterTransitReport.sadeSati.phase !== "Not Active"
                  ? "bg-amber-100 text-amber-900 border-amber-400"
                  : "bg-emerald-100 text-emerald-900 border-emerald-400"
              }`}>
                Sade Sati Status: {masterTransitReport.sadeSati.phase}
              </span>
            </div>

            {/* 3-Phase Sade Sati Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className={`p-4 rounded-2xl border space-y-1.5 ${
                masterTransitReport.sadeSati.phase.includes("Pre-Phase")
                  ? "bg-amber-50 border-amber-400 ring-2 ring-amber-300"
                  : "bg-slate-50 border-slate-200"
              }`}>
                <div className="font-bold text-amber-900 uppercase text-[10px] flex items-center justify-between">
                  <span>1st Phase (Rising / Aadhyant)</span>
                  {masterTransitReport.sadeSati.phase.includes("Pre-Phase") && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-500 text-white font-bold text-[9px]">ACTIVE</span>
                  )}
                </div>
                <div className="font-serif text-base font-bold text-slate-900">12th from Janma Moon</div>
                <p className="text-slate-600 text-[11px]">
                  Focuses on expenditure discipline, foreign travel, career restructuring, and inward contemplation.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-1.5 ${
                masterTransitReport.sadeSati.phase.includes("Peak Phase")
                  ? "bg-amber-50 border-amber-400 ring-2 ring-amber-300"
                  : "bg-slate-50 border-slate-200"
              }`}>
                <div className="font-bold text-slate-700 uppercase text-[10px] flex items-center justify-between">
                  <span>2nd Phase (Peak / Janma Shani)</span>
                  {masterTransitReport.sadeSati.phase.includes("Peak Phase") && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-500 text-white font-bold text-[9px]">ACTIVE</span>
                  )}
                </div>
                <div className="font-serif text-base font-bold text-slate-900">Over Janma Moon</div>
                <p className="text-slate-600 text-[11px]">
                  Deep restructuring of emotional resilience, health endurance, personal identity, and core priorities.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-1.5 ${
                masterTransitReport.sadeSati.phase.includes("Post-Phase")
                  ? "bg-amber-50 border-amber-400 ring-2 ring-amber-300"
                  : "bg-slate-50 border-slate-200"
              }`}>
                <div className="font-bold text-slate-700 uppercase text-[10px] flex items-center justify-between">
                  <span>3rd Phase (Setting / Anthya)</span>
                  {masterTransitReport.sadeSati.phase.includes("Post-Phase") && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-500 text-white font-bold text-[9px]">ACTIVE</span>
                  )}
                </div>
                <div className="font-serif text-base font-bold text-slate-900">2nd from Janma Moon</div>
                <p className="text-slate-600 text-[11px]">
                  Stabilizing family assets, financial realism, structured recovery, and enduring long-term wisdom.
                </p>
              </div>
            </div>

            {/* Dhaiya Check (Kantaka / Ashtama) */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-indigo-950 text-sm">Shani Dhaiya (2.5 Year Small Cycles):</span>
                <span className="font-bold text-indigo-900 px-2.5 py-0.5 bg-indigo-100 rounded-full border border-indigo-300">
                  {masterTransitReport.dhaiya.type}
                </span>
              </div>
              <p className="text-indigo-900/80 leading-relaxed">
                {masterTransitReport.dhaiya.impactDomain} — {masterTransitReport.dhaiya.remedialFocus}
              </p>
            </div>

            {/* Remedies & Classical Guidance */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-900 text-sm">Parashari Remedies &amp; Dharmic Mitigations:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <span className="font-bold text-slate-900 block">Hanuman Chalisa &amp; Shani Mantra</span>
                  <span className="text-[11px] text-slate-600">Recite Hanuman Chalisa daily and "Om Sham Shanaischaraya Namah" on Saturdays.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <span className="font-bold text-slate-900 block">Dharmic Service (Seva)</span>
                  <span className="text-[11px] text-slate-600">Feed black sesame seeds or mustard oil lamp beneath a Peepal tree on Saturday evenings.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. JUPITER (GURU) BLESSING & ASPECT RADAR */}
      {/* ========================================================================= */}
      {activeSubTab === "jupiter_transit" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  Devaguru Brihaspati Gochara
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                  Jupiter Transit in {masterTransitReport.jupiterTransit.signName} (House {masterTransitReport.jupiterTransit.houseFromMoon} from Janma Moon)
                </h3>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                masterTransitReport.jupiterTransit.isGuruBlessing
                  ? "bg-emerald-100 text-emerald-900 border-emerald-400"
                  : "bg-slate-100 text-slate-700 border-slate-300"
              }`}>
                {masterTransitReport.jupiterTransit.isGuruBlessing ? "Auspicious Guru Blessing Active" : "Neutral Transit Flow"}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {masterTransitReport.jupiterTransit.description}
            </p>

            {/* Jupiter Drishti Projections */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-900">Jupiter's Trikona &amp; Kendra Aspect Rays (Drishti):</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(masterTransitReport?.jupiterTransit?.aspectsActive || []).map((aspect, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                    <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold text-[10px]">
                      {aspect.aspectType} (60 Virupas)
                    </span>
                    <div className="font-serif text-base font-bold text-slate-900 mt-1">
                      House {aspect.targetHouseFromMoon} ({aspect.targetSignName})
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Infuses expansive wisdom, protection, divine grace, and dharma into House {aspect.targetHouseFromMoon}.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. RAHU & KETU KARMIC AXIS ANALYZER */}
      {/* ========================================================================= */}
      {activeSubTab === "rahu_ketu_transit" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-5">
            <div>
              <span className="px-3 py-0.5 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider">
                18-Month Lunar Nodal Cycle
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                Rahu in {masterTransitReport.rahuKetuAxis.rahuSign} • Ketu in {masterTransitReport.rahuKetuAxis.ketuSign}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Exact 180° true astronomical opposition across Houses {masterTransitReport.rahuKetuAxis.rahuHouseFromMoon} and {masterTransitReport.rahuKetuAxis.ketuHouseFromMoon} from Janma Moon.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200 text-xs space-y-2">
              <div className="font-bold text-purple-950 text-sm">Karmic Axis Interpretation:</div>
              <p className="text-purple-900/90 leading-relaxed">
                {masterTransitReport.rahuKetuAxis.nodalAxisDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-700 uppercase text-[10px]">Rahu Focus (Expansion &amp; Innovation)</span>
                <div className="font-serif text-base font-bold text-slate-900">
                  {masterTransitReport.rahuKetuAxis.rahuSign} (House {masterTransitReport.rahuKetuAxis.rahuHouseFromMoon})
                </div>
                <p className="text-slate-600 text-[11px]">
                  Directs worldly ambition, unconventional problem-solving, and international breakthroughs into this sphere.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">BAV Score: {masterTransitReport.rahuKetuAxis.bavRahu} bindus</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-700 uppercase text-[10px]">Ketu Focus (Detachment &amp; Spiritual Mastery)</span>
                <div className="font-serif text-base font-bold text-slate-900">
                  {masterTransitReport.rahuKetuAxis.ketuSign} (House {masterTransitReport.rahuKetuAxis.ketuHouseFromMoon})
                </div>
                <p className="text-slate-600 text-[11px]">
                  Fosters analytical discernment, spiritual detachment, inner meditation, and purification of past karma.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">BAV Score: {masterTransitReport.rahuKetuAxis.bavKetu} bindus</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. ASHTAKAVARGA & KAKSHYAS 3°45' ENGINE */}
      {/* ========================================================================= */}
      {activeSubTab === "ashtakavarga_kakshya" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-5">
            <div>
              <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                Classical 337-Point Ashtakavarga &amp; Kakshya Sub-Division
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                Dynamic Bindu Activation (SAV &ge; 28 &amp; BAV &ge; 4 Classical Rules)
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Every 30° zodiac sign is divided into 8 Kakshyas of 3°45' each, ruled in strict classical order (Saturn, Jupiter, Mars, Sun, Venus, Mercury, Moon, Lagna).
              </p>
            </div>

            {/* BAV/SAV Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                    <th className="py-2.5 px-3">Graha</th>
                    <th className="py-2.5 px-3">Current Sign</th>
                    <th className="py-2.5 px-3">BAV Bindus</th>
                    <th className="py-2.5 px-3">SAV Bindus</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Classical Parashari Guidance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {Object.entries(masterTransitReport?.ashtakavargaTransit?.planetTransitScores || {}).map(([pName, s]: any) => (
                    <tr key={pName} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{pName}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-800">{s.currentSign}</td>
                      <td className="py-2.5 px-3 font-mono font-bold">
                        <span className={s.bav >= 4 ? "text-emerald-700" : "text-rose-700"}>
                          {s.bav} / 8
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold">
                        <span className={s.sav >= 28 ? "text-emerald-700" : "text-amber-700"}>
                          {s.sav} / 56
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          s.bav >= 4 && s.sav >= 28
                            ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                            : s.bav >= 4
                            ? "bg-sky-100 text-sky-900 border border-sky-300"
                            : "bg-rose-100 text-rose-900 border border-rose-300"
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 text-[11px]">
                        {s.classicalGuidance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Kakshya 8-Zone Details */}
            <div className="space-y-3 pt-2">
              <div className="font-bold text-slate-900 text-sm">Active 3°45' Kakshya Zone Placements:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                {Object.entries(masterTransitReport?.kakshyaTransits || {}).map(([pName, k]: any) => (
                  <div key={pName} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">{pName}</span>
                      <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                        k.hasBindu ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                      }`}>
                        {k.hasBindu ? "Bindu Contributed (Active)" : "No Bindu (Friction)"}
                      </span>
                    </div>
                    <div className="text-slate-700 text-[11px]">
                      Kakshya {k.kakshyaIndex + 1} ({k.kakshyaSpan})
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Ruler: <span className="font-bold text-slate-800">{k.kakshyaLord}</span>
                    </div>
                    <p className="text-[10px] text-slate-600 border-t border-slate-200/60 pt-1">
                      {k.effect}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. DASHA-TRANSIT CONFLUENCE MATRIX */}
      {/* ========================================================================= */}
      {activeSubTab === "dasha_confluence" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-5">
            <div>
              <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                Vimshottari Dasha &amp; Gochara Confluence
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                Active Dasha Lords Live Transit Evaluation
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Classical timing rules stipulate that major events only fructify when active Dasha Lords simultaneously transit favorable, unobstructed houses with Ashtakavarga and Shadbala support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(masterTransitReport?.dashaTransitConfluence || []).map((item) => (
                <div key={item.planet} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-bold">
                        {item.dashaRole}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-slate-900 mt-1">
                        {item.planet}
                      </h4>
                    </div>
                    <span className={`px-2.5 py-1 rounded-xl text-xs ${getConfluenceBadgeClass(item.confluenceLevel)}`}>
                      {item.confluenceLevel}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-500 block text-[10px]">House from Moon</span>
                      <span className="font-bold text-slate-900">House {item.transitHouseFromMoon}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Vedha Status</span>
                      <span className={`font-bold ${item.isVedhaObstructed ? "text-rose-600" : "text-emerald-600"}`}>
                        {item.isVedhaObstructed ? "Obstructed" : "Clear"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">BAV / SAV</span>
                      <span className="font-bold text-slate-900">{item.bavScore} / {item.savScore}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {item.timingSynthesis}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. TRANSIT INGRESS MILESTONES (2024–2030) */}
      {/* ========================================================================= */}
      {activeSubTab === "transit_calendar" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="px-3 py-0.5 rounded-full bg-sky-100 text-sky-900 text-xs font-bold uppercase tracking-wider">
                  Celestial Ingress &amp; Station Ephemeris
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                  Major Planetary Milestones (2024–2030)
                </h3>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {(masterTransitReport?.transitEventsUpcoming || []).map((evt) => (
                <div key={evt.eventId} className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{evt.planet} {evt.eventType}</span>
                      <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                        evt.significance === "Crucial" || evt.significance === "Major"
                          ? "bg-amber-100 text-amber-900"
                          : "bg-slate-200 text-slate-800"
                      }`}>
                        {evt.significance} Impact
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{evt.description}</p>
                  </div>

                  <div className="text-right whitespace-nowrap text-[11px]">
                    <span className="font-bold text-slate-900 block font-mono">
                      Peak: {new Date(evt.peakIso).toLocaleDateString()}
                    </span>
                    <span className="text-slate-400 text-[10px]">
                      {new Date(evt.startIso).toLocaleDateString()} – {new Date(evt.endIso).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. CALCULATION INSPECTOR & CLASSICAL SHLOKA EVIDENCE */}
      {/* ========================================================================= */}
      {activeSubTab === "calculation_evidence" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-5">
            <div>
              <span className="px-3 py-0.5 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider">
                Full Mathematical Transparency &amp; Rule Provenance
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                Calculation Inspector &amp; Classical Citations
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Examine every mathematical derivation, input variable, coordinate transformation, and classical Sanskrit shloka citation backing this transit report.
              </p>
            </div>

            {/* Section tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-100">
              {Object.keys(masterTransitReport?.evidenceTree || {}).map((section) => (
                <button
                  key={section}
                  onClick={() => setSelectedEvidenceSection(section)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedEvidenceSection === section
                      ? "bg-slate-900 text-amber-300 shadow-2xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Evidence Cards */}
            <div className="space-y-3">
              {(masterTransitReport.evidenceTree[selectedEvidenceSection] || []).map((ev, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <span className="px-2 py-0.2 rounded bg-purple-100 text-purple-900 font-mono text-[10px] font-bold">
                        {ev.ruleId}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">{ev.factorName}</h4>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">{ev.tradition}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 font-mono text-[11px] text-slate-800">
                    <span className="text-slate-400 block text-[10px]">Formula:</span>
                    {ev.formula}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-lg bg-white/70 border border-slate-200/80">
                      <span className="text-slate-400 block text-[10px]">Input Parameters:</span>
                      <span className="text-slate-800 font-medium">{ev.inputValue}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/70 border border-slate-200/80">
                      <span className="text-slate-400 block text-[10px]">Intermediate / Output:</span>
                      <span className="text-slate-800 font-medium">{ev.outputContribution}</span>
                    </div>
                  </div>

                  <p className="text-slate-700 text-[11px] leading-relaxed pt-1">
                    <span className="font-semibold text-slate-900">Interpretation:</span> {ev.interpretation}
                  </p>

                  <div className="text-[10px] text-slate-400 border-t border-slate-200/60 pt-1.5 flex justify-between items-center">
                    <span>Source: {ev.source}</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Deterministic Rule Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
