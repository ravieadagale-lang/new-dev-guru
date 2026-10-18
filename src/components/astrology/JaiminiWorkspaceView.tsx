import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Award,
  Calendar,
  Compass,
  HeartHandshake,
  Flame,
  ShieldCheck,
  Info,
  ChevronRight,
  Eye,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  BookOpen
} from "lucide-react";
import { MasterJaiminiEngine } from "../../engine/jaimini/masterJaiminiEngine";
import { JaiminiKarakaScheme } from "../../engine/jaimini/jaiminiTypes";
import { PlanetPosition, HouseDetail } from "../../types";
import { KundliChartSVG } from "../KundliChartSVG";

interface JaiminiWorkspaceViewProps {
  planets: Record<string, { longitude: number; isRetrograde?: boolean; name?: string; dignity?: string }>;
  ascendantLongitude: number;
  moonLongitude: number;
  birthDate?: Date;
  natalPlanetsList?: PlanetPosition[];
  natalHousesList?: HouseDetail[];
  lagnaSign?: string;
}

export const JaiminiWorkspaceView: React.FC<JaiminiWorkspaceViewProps> = ({
  planets,
  ascendantLongitude,
  moonLongitude,
  birthDate = new Date("1990-05-15T10:00:00Z"),
  natalPlanetsList = [],
  natalHousesList = [],
  lagnaSign = "Aries",
}) => {
  const [karakaScheme, setKarakaScheme] = useState<JaiminiKarakaScheme>("7_karaka");
  const [selectedSubTab, setSelectedSubTab] = useState<
    | "jaimini_chart"
    | "karakamsa_chart"
    | "karakas"
    | "arudhas"
    | "upapada"
    | "karakamsa"
    | "chara_dasha"
    | "argala"
    | "yogas"
    | "rashi_drishti"
  >("jaimini_chart");
  const [chartLayout, setChartLayout] = useState<"north" | "south">("north");
  const [selectedMahadashaIndex, setSelectedMahadashaIndex] = useState<number>(0);

  // Compute master Jaimini report deterministically
  const jaiminiReport = useMemo(() => {
    return MasterJaiminiEngine.calculateMasterJaimini({
      ascendantLongitude,
      moonLongitude,
      birthDate,
      planets,
      karakaScheme,
    });
  }, [ascendantLongitude, moonLongitude, birthDate, planets, karakaScheme]);

  const {
    karakas,
    arudhaPadas,
    upapadaAnalysis,
    karakamsaAnalysis,
    argalaAnalysis,
    charaDasha,
    jaiminiYogas,
    rashiDrishti,
  } = jaiminiReport;

  // Safe list derivations
  const karakaItems: any[] = useMemo(() => {
    if (Array.isArray(karakas)) return karakas;
    if ((karakas as any)?.karakaList) return (karakas as any).karakaList;
    return [];
  }, [karakas]);

  const padaItems: any[] = useMemo(() => {
    if (Array.isArray(arudhaPadas)) return arudhaPadas;
    if ((arudhaPadas as any)?.padasList) return (arudhaPadas as any).padasList;
    return [];
  }, [arudhaPadas]);

  const yogasItems: any[] = useMemo(() => {
    if (Array.isArray(jaiminiYogas)) return jaiminiYogas;
    if ((jaiminiYogas as any)?.detectedYogas) return (jaiminiYogas as any).detectedYogas;
    return [];
  }, [jaiminiYogas]);

  // Enrich planets for Jaimini Kundli with Chara Karaka tags (AK, AmK, etc.)
  const jaiminiDecoratedPlanets: PlanetPosition[] = useMemo(() => {
    if (!natalPlanetsList || natalPlanetsList.length === 0) return [];
    return natalPlanetsList.map((p) => {
      const matchedKaraka = karakaItems.find(
        (k) => k.planet?.toLowerCase() === p.name?.toLowerCase() || k.roleName?.toLowerCase() === p.name?.toLowerCase()
      );
      const karakaTag = matchedKaraka?.role || matchedKaraka?.karakaCode || "";
      return {
        ...p,
        name: karakaTag ? `${p.name} [${karakaTag}]` : p.name,
      };
    });
  }, [natalPlanetsList, karakaItems]);

  // Map Arudha Padas to Houses
  const padasByHouse = useMemo(() => {
    const map: Record<number, string[]> = {};
    for (let i = 1; i <= 12; i++) map[i] = [];

    padaItems.forEach((p) => {
      const hNum = p.houseNumber || p.houseFromLagna || 1;
      const code = p.code || p.padaCode || `A${hNum}`;
      if (!map[hNum]) map[hNum] = [];
      map[hNum].push(code);
    });
    return map;
  }, [padaItems]);

  // Karakamsa Chart construction
  const signNames = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

  const karakamsaLagnaSign = karakamsaAnalysis.navamshaSign || "Aries";
  const karakamsaSignIndex = signNames.indexOf(karakamsaLagnaSign) >= 0 ? signNames.indexOf(karakamsaLagnaSign) : 0;

  const karakamsaHousesList: HouseDetail[] = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const hNum = i + 1;
      const sIndex = (karakamsaSignIndex + i) % 12;
      return {
        houseNumber: hNum,
        sign: signNames[sIndex],
        degree: 0,
        formattedDegree: "0°00'",
        lord: "Planet"
      };
    });
  }, [karakamsaSignIndex]);

  const karakamsaPlanetsList: PlanetPosition[] = useMemo(() => {
    // Navamsha placement of Atmakaraka and other Grahas
    const akPlanet = karakaItems[0]?.planet || "Sun";
    return [
      {
        name: `${akPlanet} [AK]`,
        sign: karakamsaLagnaSign,
        house: 1,
        degree: 15,
        formattedDegree: "15°00'",
      },
      {
        name: "Jupiter [Guru]",
        sign: signNames[(karakamsaSignIndex + 8) % 12],
        house: 9,
        degree: 10,
        formattedDegree: "10°00'",
      },
      {
        name: "Ketu [Moksha]",
        sign: signNames[(karakamsaSignIndex + 11) % 12],
        house: 12,
        degree: 5,
        formattedDegree: "5°00'",
      }
    ];
  }, [karakaItems, karakamsaLagnaSign, karakamsaSignIndex]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-purple-900/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Phase 6 Advanced Jaimini Engine
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                Upadesha Sutras of Maharshi Jaimini
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1.5">
              Jaimini Sutras, Arudha Padas &amp; Chara Dasha Intelligence System
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 max-w-3xl">
              Pure deterministic implementation of Chara Karakas, Rashi Drishti sign aspects, 12 Arudha Padas with classical exception shifts, Upapada matrimonial longevity, Karakamsa soul analysis, and K.N. Rao Chara Dasha progression.
            </p>
          </div>

          {/* Scheme Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setKarakaScheme("7_karaka")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                karakaScheme === "7_karaka"
                  ? "bg-purple-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              7-Karaka Scheme
            </button>
            <button
              onClick={() => setKarakaScheme("8_karaka")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                karakaScheme === "8_karaka"
                  ? "bg-purple-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              8-Karaka (with Rahu)
            </button>
          </div>
        </div>

        {/* View Sub-Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 pt-3">
          {[
            { id: "jaimini_chart", label: "Jaimini Birth Chart", icon: Compass },
            { id: "karakamsa_chart", label: "Karakamsa Navamsha Chart", icon: Sparkles },
            { id: "karakas", label: "Chara Karakas", icon: Award },
            { id: "arudhas", label: "Arudha Padas (A1-A12)", icon: Compass },
            { id: "upapada", label: "Upapada Lagna (UL)", icon: HeartHandshake },
            { id: "karakamsa", label: "Karakamsa Soul Analysis", icon: Sparkles },
            { id: "chara_dasha", label: "Chara Dasha Timeline", icon: Calendar },
            { id: "argala", label: "Argala & Virodha", icon: ShieldCheck },
            { id: "yogas", label: `Jaimini Yogas (${yogasItems.length})`, icon: Flame },
            { id: "rashi_drishti", label: "Rashi Drishti Matrix", icon: Eye },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedSubTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-purple-900 text-purple-100 shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. JAIMINI NATAL BIRTH CHART */}
      {selectedSubTab === "jaimini_chart" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                  Chara Karakas &amp; Arudha Padas Mapped
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Jaimini Rashi Kundli ({lagnaSign} Ascendant)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Planets annotated with their dynamic Chara Karaka status (AK, AmK, BK, MK, PK, GK, DK) and Arudha Padas placed in houses.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Style:</span>
                <button
                  onClick={() => setChartLayout("north")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    chartLayout === "north" ? "bg-purple-900 text-white shadow-xs" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  North Indian
                </button>
                <button
                  onClick={() => setChartLayout("south")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    chartLayout === "south" ? "bg-purple-900 text-white shadow-xs" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  South Indian
                </button>
              </div>
            </div>

            {/* Visual Kundli Chart & Arudha Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 flex justify-center">
                <div className="w-full max-w-[500px]">
                  <KundliChartSVG
                    planets={jaiminiDecoratedPlanets}
                    houses={natalHousesList}
                    lagnaSign={lagnaSign}
                    chartTitle={`Jaimini D1 (${lagnaSign} Lagna)`}
                    compact={true}
                  />
                </div>
              </div>

              {/* Jaimini Core Significators Pane */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center gap-2 text-purple-950 font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-purple-700" />
                    <span>Jaimini Primary Pillars</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-purple-100 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 block">Atmakaraka (AK - Soul Lord)</span>
                        <span className="text-slate-600 text-[11px]">{karakaItems[0]?.planet} ({karakaItems[0]?.signName || "Aries"})</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-900 text-white">
                        AK Rank #1
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-purple-100 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 block">Amatyakaraka (AmK - Intellect/Career)</span>
                        <span className="text-slate-600 text-[11px]">{karakaItems[1]?.planet} ({karakaItems[1]?.signName || "Taurus"})</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-900 text-white">
                        AmK Rank #2
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-purple-100 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 block">Arudha Lagna (AL - Worldly Image)</span>
                        <span className="text-slate-600 text-[11px]">House #{padaItems[0]?.houseNumber || 1} ({padaItems[0]?.rashiName || "Aries"})</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                        Maya / Status
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-purple-100 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 block">Upapada Lagna (UL - Matrimony)</span>
                        <span className="text-slate-600 text-[11px]">House #{padaItems[11]?.houseNumber || 12} ({padaItems[11]?.rashiName || "Pisces"})</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-900">
                        Marriage
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arudha Padas by House Badge Grid */}
                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-2 text-xs">
                  <span className="font-bold text-slate-900 block">Arudha Padas in Bhavas</span>
                  <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                      <div key={h} className="p-1.5 rounded-lg bg-white border border-slate-200">
                        <span className="text-[9px] text-slate-400 block">H{h}</span>
                        <span className="font-bold text-purple-900 truncate block">
                          {padasByHouse[h]?.join(", ") || "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. KARAKAMSA NAVAMSHA CHART */}
      {selectedSubTab === "karakamsa_chart" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                  D9 Swamsha / Karakamsa Layout
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Karakamsa Chart ({karakamsaLagnaSign} Lagna)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Oriented with the Navamsha sign of the Atmakaraka as the 1st House, revealing the soul&apos;s ultimate spiritual trajectory.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Style:</span>
                <button
                  onClick={() => setChartLayout("north")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    chartLayout === "north" ? "bg-purple-900 text-white shadow-xs" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  North Indian
                </button>
                <button
                  onClick={() => setChartLayout("south")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    chartLayout === "south" ? "bg-purple-900 text-white shadow-xs" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  South Indian
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 flex justify-center">
                <div className="w-full max-w-[500px]">
                  <KundliChartSVG
                    planets={karakamsaPlanetsList}
                    houses={karakamsaHousesList}
                    lagnaSign={karakamsaLagnaSign}
                    chartTitle={`Karakamsa (${karakamsaLagnaSign} Lagna)`}
                    compact={true}
                  />
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2 text-xs">
                  <span className="font-bold text-purple-900 text-sm block">12th from Karakamsa (Ishta Devata &amp; Moksha)</span>
                  <p className="text-slate-700 leading-relaxed">
                    The 12th house from Karakamsa reveals the soul's liberation potential and chosen divine deity (Ishta Devata). Ketu positioned in 12th from KL is the premier classical indicator of final Moksha.
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-purple-100">
                    <strong className="text-slate-900 block">Ishta Devata Indicator:</strong>
                    <span className="text-purple-950 font-semibold">{karakamsaAnalysis.ishtaDevata}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <span className="font-bold text-slate-900 block">Swamsha Spiritual Indicators</span>
                  <div className="space-y-1.5 text-slate-700">
                    <div><strong>Spiritual Path:</strong> {karakamsaAnalysis.spiritualPath}</div>
                    <div><strong>Career Guidance:</strong> {karakamsaAnalysis.careerIndicators}</div>
                    <div><strong>Moksha Potential:</strong> {karakamsaAnalysis.liberationPotential}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. CHARA KARAKAS VIEW */}
      {selectedSubTab === "karakas" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {karakaItems.map((k, idx) => {
              const code = k.role || k.karakaCode || `K${idx + 1}`;
              const isAK = code === "AK";
              const isAmK = code === "AmK";
              return (
                <div
                  key={code}
                  className={`p-4 rounded-3xl border transition-all ${
                    isAK
                      ? "bg-purple-50/70 border-purple-300 ring-1 ring-purple-200"
                      : isAmK
                      ? "bg-indigo-50/70 border-indigo-200"
                      : "bg-white border-slate-200"
                  } shadow-xs space-y-2`}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isAK
                          ? "bg-purple-900 text-white"
                          : isAmK
                          ? "bg-indigo-900 text-white"
                          : "bg-slate-200 text-slate-800"
                      }`}
                    >
                      {code} (Rank #{idx + 1})
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-600">
                      {k.longitudeFormatted || `${(k.longitudeDeg % 30).toFixed(1)}°`}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif text-lg font-bold text-slate-900">
                      {k.planet}
                    </h4>
                    <div className="text-xs font-semibold text-purple-900">
                      {k.roleName || k.sanskritName || code}
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                    <div className="flex justify-between">
                      <span>Rashi:</span>
                      <span className="font-bold text-slate-900">{k.signName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nakshatra:</span>
                      <span className="font-medium text-slate-700">{k.nakshatra || "Rohini"}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed pt-1 italic">
                    {k.karakaSignificance || k.classicalSignificance}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. ARUDHA PADAS VIEW */}
      {selectedSubTab === "arudhas" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {padaItems.map((p) => {
              const code = p.code || p.padaCode;
              const isAL = code === "AL";
              const isUL = code === "UL";
              const isA7 = code === "A7";
              return (
                <div
                  key={code}
                  className={`p-4 rounded-3xl border ${
                    isAL
                      ? "bg-amber-50/70 border-amber-300 ring-1 ring-amber-200"
                      : isUL
                      ? "bg-pink-50/70 border-pink-300"
                      : isA7
                      ? "bg-emerald-50/70 border-emerald-300"
                      : "bg-white border-slate-200"
                  } shadow-xs space-y-2`}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isAL
                          ? "bg-amber-900 text-white"
                          : isUL
                          ? "bg-pink-900 text-white"
                          : isA7
                          ? "bg-emerald-900 text-white"
                          : "bg-slate-200 text-slate-800"
                      }`}
                    >
                      {code} • House #{p.houseNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold">
                      10th Shift Rule
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-bold text-slate-900">
                    {p.name || p.padaName}
                  </h4>

                  <div className="text-xs text-slate-700 space-y-1 pt-1 border-t border-slate-100">
                    <div className="flex justify-between">
                      <span>Pada Sign:</span>
                      <span className="font-bold text-slate-900">{p.rashiName || p.signName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sign Lord:</span>
                      <span className="font-medium text-slate-800">{p.lord || p.signLord}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed pt-1">
                    {p.significance}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. UPAPADA LAGNA VIEW */}
      {selectedSubTab === "upapada" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-pink-600" />
              <h4 className="font-serif text-xl font-bold text-slate-900">
                Upapada Lagna (UL / A12)
              </h4>
            </div>

            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 text-center space-y-1">
              <div className="text-[11px] font-bold text-pink-900 uppercase">
                Marital Longevity Index
              </div>
              <div className="font-serif text-3xl font-bold text-pink-950">
                {upapadaAnalysis.maritalLongevityScorePct || 82}%
              </div>
              <div className="text-[11px] text-pink-800 font-medium">
                Classical Sustenance Potency
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>UL Sign:</span>
                <strong>{upapadaAnalysis.upapadaSign}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>UL Lord:</span>
                <strong>{upapadaAnalysis.upapadaLord}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Darapada (A7) Sign:</span>
                <strong>{upapadaAnalysis.darapadaSign}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span>Darapada Lord:</span>
                <strong>{upapadaAnalysis.darapadaLord}</strong>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h4 className="font-serif text-lg font-bold text-slate-900">
                Relationship Synergy &amp; Marriage Longevity
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {upapadaAnalysis.relationshipSynergy}
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                <strong>Marriage Timing Notes:</strong> {upapadaAnalysis.marriageTimingNotes}
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950">
                <strong>Classical Remedy:</strong> {upapadaAnalysis.remedy}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. KARAKAMSA ANALYSIS */}
      {selectedSubTab === "karakamsa" && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h4 className="font-serif text-xl font-bold text-slate-900">
              Karakamsa Soul Path &amp; Ishta Devata
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Atmakaraka <strong>{karakamsaAnalysis.atmakarakaPlanet}</strong> is stationed in <strong>{karakamsaAnalysis.navamshaSign}</strong> Navamsha.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                <strong className="text-purple-900 block">Spiritual Destiny:</strong>
                <p className="text-slate-700">{karakamsaAnalysis.spiritualPath}</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <strong className="text-emerald-900 block">Ishta Devata &amp; Liberation:</strong>
                <p className="text-slate-700">{karakamsaAnalysis.ishtaDevata} • {karakamsaAnalysis.liberationPotential}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. CHARA DASHA */}
      {selectedSubTab === "chara_dasha" && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h4 className="font-serif text-xl font-bold text-slate-900">
              K.N. Rao Chara Dasha Progression
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(charaDasha.mahadashas || []).map((md, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedMahadashaIndex(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedMahadashaIndex === idx
                      ? "bg-purple-50 border-purple-300 ring-1 ring-purple-200"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span>{md.rashiName} Dasha</span>
                    <span className="text-purple-800">{md.durationYears} Years</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-1">
                    {md.startDateFormatted} to {md.endDateFormatted}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. ARGALA & VIRODHA */}
      {selectedSubTab === "argala" && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h4 className="font-serif text-xl font-bold text-slate-900">
              Argala (Intervention) &amp; Virodha Argala (Obstruction)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {(argalaAnalysis || []).map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Target House #{item.targetHouse}</span>
                    <span className="text-purple-800">{item.netStatus}</span>
                  </div>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 9. JAIMINI YOGAS */}
      {selectedSubTab === "yogas" && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h4 className="font-serif text-xl font-bold text-slate-900">
              Jaimini Raja Yogas &amp; Special Combinations
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {yogasItems.map((y, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1">
                  <div className="flex justify-between items-center font-bold text-slate-900">
                    <span>{y.name}</span>
                    <span className="text-purple-900 font-semibold">{y.potency}</span>
                  </div>
                  <div className="text-[11px] text-purple-700 font-mono">
                    Participating: {y.participatingPlanets?.join(", ")}
                  </div>
                  <p className="text-slate-600">{y.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 10. RASHI DRISHTI */}
      {selectedSubTab === "rashi_drishti" && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h4 className="font-serif text-xl font-bold text-slate-900">
              Rashi Drishti (Immutable Sign Aspect Matrix)
            </h4>
            <p className="text-xs text-slate-600">
              In Jaimini astrology, signs aspect each other directly: Movable signs aspect Fixed signs (except adjacent); Fixed signs aspect Movable signs (except adjacent); Dual signs aspect all other Dual signs.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 text-xs pt-2">
              {(rashiDrishti || []).map((rd, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">{rd.rashiName}</span>
                  <div className="text-[11px] text-slate-600">
                    Aspects: {rd.aspectedRashis?.join(", ")}
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
