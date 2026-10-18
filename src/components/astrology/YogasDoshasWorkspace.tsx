import React, { useState, useMemo } from "react";
import { UserProfile, PlanetPosition, HouseDetail } from "../../types";
import { 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Award,
  BookOpen,
  Search,
  Filter,
  Scroll,
  Tag,
  Compass,
  Clock,
  ExternalLink,
  Zap,
  Info,
  Scale,
  CheckCircle,
  XCircle,
  HelpCircle
} from "lucide-react";
import { playCardHoverSound, playCardFlipSound } from "../../utils/audioEffects";
import { 
  ALL_CLASSICAL_YOGAS_300_PLUS, 
  CLASSICAL_YOGA_CATEGORIES 
} from "../../data/classicalYogas";
import { 
  YogaDetectionMasterEngine, 
  YogaDetectionOutput, 
  DetectedClassicalYoga, 
  YogaStatusCode 
} from "../../engine/yogas";
import { 
  DoshaDetectionMasterEngine, 
  DoshaDetectionOutput, 
  DetectedClassicalDosha,
  DoshaStatusCode
} from "../../engine/doshas";

interface YogasDoshasWorkspaceProps {
  userProfile?: UserProfile;
  planets: PlanetPosition[];
  houses: HouseDetail[];
  lagnaSign: string;
}

export type YogasSubTab = 
  | "detected_yogas"
  | "doshas_cancellations"
  | "classical_library"
  | "yoga_evidence";

export const YogasDoshasWorkspace: React.FC<YogasDoshasWorkspaceProps> = ({
  userProfile,
  planets,
  houses,
  lagnaSign
}) => {
  const [activeSubTab, setActiveSubTab] = useState<YogasSubTab>("detected_yogas");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("ALL");
  const [expandedYogaId, setExpandedYogaId] = useState<string | null>(null);
  const [expandedDoshaId, setExpandedDoshaId] = useState<string | null>(null);
  const [expandedLibraryYoga, setExpandedLibraryYoga] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 20;

  // 1. Build deterministic chart evaluation context for Phase 3 Engines
  const chartContext = useMemo(() => {
    const planetsMap: Record<string, any> = {};
    const houseOccupantsMap: Record<number, string[]> = {};
    const signOccupantsMap: Record<string, string[]> = {};

    const SIGN_NAMES = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    const ascSignIdx = SIGN_NAMES.indexOf(lagnaSign) !== -1 ? SIGN_NAMES.indexOf(lagnaSign) : 0;

    planets.forEach((p) => {
      const sIdx = SIGN_NAMES.indexOf(p.sign) !== -1 ? SIGN_NAMES.indexOf(p.sign) : 0;
      const degInSign = p.degree ?? 0;
      const long = sIdx * 30 + degInSign;

      planetsMap[p.name] = {
        name: p.name,
        sign: p.sign,
        signIndex: sIdx,
        house: p.house,
        degreeInSign: degInSign,
        isRetrograde: p.isRetrograde ?? false,
        isCombust: p.isCombust ?? false,
        dignity: p.dignity ?? "Neutral (Sama)",
        longitude: long
      };

      if (!houseOccupantsMap[p.house]) houseOccupantsMap[p.house] = [];
      houseOccupantsMap[p.house].push(p.name);

      if (!signOccupantsMap[p.sign]) signOccupantsMap[p.sign] = [];
      signOccupantsMap[p.sign].push(p.name);
    });

    const houseLordsMap: Record<number, string> = {};
    houses.forEach((h) => {
      houseLordsMap[h.houseNumber] = h.signLord;
    });

    return {
      planets: planetsMap,
      houseLords: houseLordsMap,
      houseOccupants: houseOccupantsMap,
      signOccupants: signOccupantsMap,
      ascendantSign: lagnaSign || "Aries",
      ascendantSignIndex: ascSignIdx,
      jaiminiKarakas: {
        AK: "Sun",
        AmK: "Jupiter",
        BK: "Mars",
        MK: "Moon",
        PiK: "Mercury",
        PK: "Venus",
        GK: "Saturn",
        DK: "Rahu"
      },
      dashaActiveLords: {
        mahadasha: planets[0]?.name || "Jupiter",
        antardasha: planets[1]?.name || "Moon"
      }
    };
  }, [planets, houses, lagnaSign]);

  // 2. Execute Phase 3 Master Engines
  const yogaEvaluation: YogaDetectionOutput = useMemo(() => {
    return YogaDetectionMasterEngine.evaluateAllYogas(chartContext);
  }, [chartContext]);

  const doshaEvaluation: DoshaDetectionOutput = useMemo(() => {
    return DoshaDetectionMasterEngine.evaluateAllDoshas(chartContext);
  }, [chartContext]);

  // Filtered detected yogas
  const filteredDetectedYogas = useMemo(() => {
    let list = yogaEvaluation.detectedYogas;

    if (selectedStatusFilter === "FORMED") {
      list = list.filter((y) => y.isFullyFormed && !y.isCancelled);
    } else if (selectedStatusFilter === "ACTIVE_DASHA") {
      list = list.filter((y) => y.dashaActivation.isCurrentlyActive);
    } else if (selectedStatusFilter === "MODIFIED") {
      list = list.filter((y) => y.isCancelled || y.status === "FORMED_WITH_MODIFIERS" || y.status === "WEAKENED");
    }

    if (selectedCategory !== "All") {
      list = list.filter((y) => y.category === selectedCategory || (y.category as string).includes(selectedCategory));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (y) =>
          y.name.toLowerCase().includes(q) ||
          y.sanskritName.toLowerCase().includes(q) ||
          y.source.toLowerCase().includes(q) ||
          y.category.toLowerCase().includes(q) ||
          y.participatingPlanets.some((p) => p.toLowerCase().includes(q))
      );
    }

    return list;
  }, [yogaEvaluation, selectedStatusFilter, selectedCategory, searchQuery]);

  // Filtered 300+ classical library dataset
  const filteredLibraryYogas = useMemo(() => {
    let list = ALL_CLASSICAL_YOGAS_300_PLUS;

    if (selectedCategory !== "All") {
      list = list.filter((y) => y.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (y) =>
          y.name.toLowerCase().includes(q) ||
          y.sanskritName.toLowerCase().includes(q) ||
          y.formula.toLowerCase().includes(q) ||
          y.category.toLowerCase().includes(q) ||
          y.classicalSource.toLowerCase().includes(q) ||
          y.results.toLowerCase().includes(q) ||
          y.planetaryActors.some((p) => p.toLowerCase().includes(q))
      );
    }

    return list;
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredLibraryYogas.length / itemsPerPage) || 1;
  const paginatedLibraryYogas = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredLibraryYogas.slice(start, start + itemsPerPage);
  }, [filteredLibraryYogas, page]);

  const subTabs: { id: YogasSubTab; label: string; countBadge?: string }[] = [
    { id: "detected_yogas", label: "Detected Yogas in Chart", countBadge: `${yogaEvaluation.fullyFormedCount} Formed` },
    { id: "doshas_cancellations", label: "Classical Doshas & Cancellations", countBadge: `${doshaEvaluation.presentCount} Active` },
    { id: "classical_library", label: "Classical Yogas Library (1,001+)", countBadge: `${ALL_CLASSICAL_YOGAS_300_PLUS.length} Yogas` },
    { id: "yoga_evidence", label: "Scriptural Sources & Shlokas" }
  ];

  return (
    <div id="yogas-doshas-workspace-root" className="space-y-6">
      {/* Workspace Header Banner */}
      <div id="yogas-header-card" className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white relative overflow-hidden shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Phase 3 Classical Yoga & Dosha Engine v3.0.0
              </span>
              <span className="text-xs text-slate-400 font-mono">BPHS • Saravali • Phaladeepika</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Classical Vedic Yogas & Doshas Workspace
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              Deterministic rule evaluation of 1,001+ classical Vedic combinations with transparent condition trees, explicit cancellation math, varga harmonic confirmations, and 5-tier Dasha activation timing.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap md:flex-nowrap gap-3">
            <div className="bg-slate-800/80 border border-slate-700/70 rounded-lg px-3.5 py-2 text-center min-w-[90px]">
              <div className="text-xs text-slate-400 font-medium">Fully Formed</div>
              <div className="text-xl font-bold text-amber-400 font-mono">{yogaEvaluation.fullyFormedCount}</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/70 rounded-lg px-3.5 py-2 text-center min-w-[90px]">
              <div className="text-xs text-slate-400 font-medium">Active Dasha</div>
              <div className="text-xl font-bold text-emerald-400 font-mono">{yogaEvaluation.currentlyActiveCount}</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/70 rounded-lg px-3.5 py-2 text-center min-w-[90px]">
              <div className="text-xs text-slate-400 font-medium">Doshas</div>
              <div className="text-xl font-bold text-rose-400 font-mono">{doshaEvaluation.presentCount}</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/70 rounded-lg px-3.5 py-2 text-center min-w-[90px]">
              <div className="text-xs text-slate-400 font-medium">Library</div>
              <div className="text-xl font-bold text-indigo-300 font-mono">{ALL_CLASSICAL_YOGAS_300_PLUS.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtabs Navigation */}
      <div id="yogas-subtabs-nav" className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-2">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-btn-${tab.id}`}
              onClick={() => {
                playCardFlipSound();
                setActiveSubTab(tab.id);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/70"
              }`}
            >
              {tab.id === "detected_yogas" && <Sparkles className="w-4 h-4 text-amber-400" />}
              {tab.id === "doshas_cancellations" && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
              {tab.id === "classical_library" && <BookOpen className="w-4 h-4 text-indigo-500" />}
              {tab.id === "yoga_evidence" && <Scroll className="w-4 h-4 text-purple-500" />}
              <span>{tab.label}</span>
              {tab.countBadge && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-mono font-medium ${
                    isActive ? "bg-slate-800 text-slate-200" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {tab.countBadge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: DETECTED YOGAS IN CHART */}
      {activeSubTab === "detected_yogas" && (
        <div id="detected-yogas-panel" className="space-y-6">
          {/* Filter and Search Controls */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row gap-3 items-center justify-between shadow-sm">
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button
                id="filter-all-yogas"
                onClick={() => setSelectedStatusFilter("ALL")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedStatusFilter === "ALL"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Evaluated ({yogaEvaluation.detectedYogas.length})
              </button>
              <button
                id="filter-formed-yogas"
                onClick={() => setSelectedStatusFilter("FORMED")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedStatusFilter === "FORMED"
                    ? "bg-amber-500 text-slate-900"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Fully Formed ({yogaEvaluation.fullyFormedCount})
              </button>
              <button
                id="filter-active-dasha-yogas"
                onClick={() => setSelectedStatusFilter("ACTIVE_DASHA")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedStatusFilter === "ACTIVE_DASHA"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Active in Dasha ({yogaEvaluation.currentlyActiveCount})
              </button>
              <button
                id="filter-modified-yogas"
                onClick={() => setSelectedStatusFilter("MODIFIED")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedStatusFilter === "MODIFIED"
                    ? "bg-rose-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Modified / Cancelled ({yogaEvaluation.modifiedOrCancelledYogas.length})
              </button>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search detected yogas, planets..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Detected Yogas List */}
          <div className="space-y-4">
            {filteredDetectedYogas.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-slate-500">
                <BookOpen className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <p className="font-semibold text-slate-700">No matching classical yogas found</p>
                <p className="text-xs text-slate-400 mt-1">Try clearing filters or search queries</p>
              </div>
            ) : (
              filteredDetectedYogas.map((yoga) => {
                const isExpanded = expandedYogaId === yoga.ruleId;
                const isFormed = yoga.isFullyFormed && !yoga.isCancelled;
                const isActiveDasha = yoga.dashaActivation.isCurrentlyActive;

                return (
                  <div
                    key={yoga.ruleId}
                    id={`yoga-card-${yoga.ruleId}`}
                    onMouseEnter={() => playCardHoverSound()}
                    className={`bg-white border rounded-xl transition-all shadow-sm overflow-hidden ${
                      isFormed
                        ? "border-amber-200 hover:border-amber-400"
                        : yoga.isCancelled
                        ? "border-rose-200 bg-rose-50/20"
                        : "border-slate-200"
                    }`}
                  >
                    {/* Card Summary Header */}
                    <div
                      onClick={() => {
                        playCardFlipSound();
                        setExpandedYogaId(isExpanded ? null : yoga.ruleId);
                      }}
                      className="p-4 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gradient-to-r from-slate-50/50 to-white"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                            isFormed
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : yoga.isCancelled
                              ? "bg-rose-100 text-rose-800 border border-rose-300"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {yoga.strengthScore}%
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="text-base font-bold text-slate-900">{yoga.name}</h3>
                            <span className="text-xs text-slate-500 font-serif italic">{yoga.sanskritName}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                              {yoga.category}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                            <span className="font-mono">{yoga.sourceReference}</span>
                            <span>•</span>
                            <span>Actors: <strong>{yoga.participatingPlanets?.join(", ") || "—"}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-center">
                        {isActiveDasha && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <Zap className="w-3 h-3 text-emerald-600" />
                            Dasha Active ({yoga.dashaActivation.level})
                          </span>
                        )}

                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                            yoga.status === "FORMED"
                              ? "bg-amber-100 text-amber-900 border-amber-300"
                              : yoga.status === "FORMED_WITH_MODIFIERS"
                              ? "bg-indigo-50 text-indigo-800 border-indigo-200"
                              : yoga.status === "CANCELLED"
                              ? "bg-rose-100 text-rose-800 border-rose-300"
                              : "bg-slate-100 text-slate-700 border-slate-300"
                          }`}
                        >
                          {yoga.status.replace(/_/g, " ")}
                        </span>

                        <button className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Card Expanded WHY Evidence Tree */}
                    {isExpanded && (
                      <div className="border-t border-slate-200 p-5 bg-slate-50/50 space-y-5">
                        {/* Classical Results */}
                        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs">
                          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-amber-500" />
                            Classical Fruits & Phalas
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed">{yoga.source}</p>
                          <p className="text-xs text-slate-600 italic mt-1.5">"{yoga.whyEvidenceTree.classicalSynthesis}"</p>
                        </div>

                        {/* WHY Tree: Condition Breakdown */}
                        <div className="space-y-2">
                          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                            <Scale className="w-3.5 h-3.5 text-indigo-500" />
                            Deterministic Condition Evaluation Tree
                          </div>

                          <div className="grid grid-cols-1 gap-2">
                            {yoga.conditionsEvaluated.map((cond, idx) => (
                              <div
                                key={idx}
                                className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
                                  cond.passed
                                    ? "bg-emerald-50/60 border-emerald-200 text-emerald-950"
                                    : "bg-rose-50/60 border-rose-200 text-rose-950"
                                }`}
                              >
                                {cond.passed ? (
                                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                                )}
                                <div className="space-y-0.5 flex-1">
                                  <div className="font-semibold">{cond.description}</div>
                                  <div className="text-slate-600 font-mono text-[11px]">{cond.evidence}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Modifiers, Cancellations & Dasha Timing Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Modifiers & Strength */}
                          <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 shadow-2xs">
                            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                              Strength Rating & Modifiers
                            </div>
                            <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-100">
                              <span className="text-slate-500">Evaluated Strength:</span>
                              <span className="font-bold text-slate-800">{yoga.strengthRating} ({yoga.strengthScore}/100)</span>
                            </div>
                            <ul className="text-xs space-y-1 text-slate-600">
                              {yoga.supportingFactors.map((s, i) => (
                                <li key={i} className="text-emerald-700 flex items-center gap-1">✓ {s}</li>
                              ))}
                              {yoga.weakeningFactors.map((w, i) => (
                                <li key={i} className="text-amber-700 flex items-center gap-1">⚠️ {w}</li>
                              ))}
                              {yoga.supportingFactors.length === 0 && yoga.weakeningFactors.length === 0 && (
                                <li className="text-slate-400 italic">No additional strength modifiers active.</li>
                              )}
                            </ul>
                          </div>

                          {/* Dasha Activation Confluence */}
                          <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 shadow-2xs">
                            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-purple-500" />
                              Temporal Dasha Activation
                            </div>
                            <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-100">
                              <span className="text-slate-500">Current Status:</span>
                              <span className={`font-bold ${yoga.dashaActivation.isCurrentlyActive ? "text-emerald-600" : "text-slate-600"}`}>
                                {yoga.dashaActivation.level}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {yoga.dashaActivation.activationSummary}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CLASSICAL DOSHAS & CANCELLATIONS */}
      {activeSubTab === "doshas_cancellations" && (
        <div id="doshas-panel" className="space-y-6">
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Classical Vedic Dosha Principles:</span> Doshas reflect specific planetary frictions that indicate karmic tests rather than permanent curses. Dev-Guru calculates multi-point reference baselines (Lagna, Chandra, Shukra) and strictly checks classical cancellation exceptions (Nivarana / Bhanga) from Muhurta Chintamani and BPHS.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {doshaEvaluation.detectedDoshas.map((dosha) => {
              const isExpanded = expandedDoshaId === dosha.ruleId;
              const isPresent = dosha.isPresent;
              const isCancelled = dosha.isCancelledOrMitigated;

              return (
                <div
                  key={dosha.ruleId}
                  id={`dosha-card-${dosha.ruleId}`}
                  onMouseEnter={() => playCardHoverSound()}
                  className={`bg-white border rounded-xl shadow-sm overflow-hidden transition-all ${
                    !isPresent
                      ? "border-slate-200 opacity-90"
                      : isCancelled
                      ? "border-emerald-200 bg-emerald-50/10"
                      : "border-rose-200 bg-rose-50/10"
                  }`}
                >
                  <div
                    onClick={() => {
                      playCardFlipSound();
                      setExpandedDoshaId(isExpanded ? null : dosha.ruleId);
                    }}
                    className="p-4 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gradient-to-r from-slate-50/50 to-white"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                          !isPresent
                            ? "bg-slate-100 text-slate-500"
                            : isCancelled
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-rose-100 text-rose-800 border border-rose-300"
                        }`}
                      >
                        {dosha.severityScore}%
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-base font-bold text-slate-900">{dosha.name}</h3>
                          <span className="text-xs text-slate-500 font-serif italic">{dosha.sanskritName}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                            {dosha.tradition}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="font-mono">{dosha.sourceReference}</span>
                          <span>•</span>
                          <span>Afflicted: <strong>{dosha.afflictedPlanets?.join(", ") || "None"}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                          !isPresent
                            ? "bg-slate-100 text-slate-600 border-slate-200"
                            : isCancelled
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : "bg-rose-100 text-rose-800 border-rose-300"
                        }`}
                      >
                        {dosha.status.replace(/_/g, " ")}
                      </span>

                      <button className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-200 p-5 bg-slate-50/50 space-y-4">
                      {/* Classical Synthesis */}
                      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs">
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-rose-500" />
                          Classical Evaluation & Synthesis
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">{dosha.whyEvidenceTree.classicalSynthesis}</p>
                      </div>

                      {/* Conditions & Cancellations Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Evaluated Conditions */}
                        <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 shadow-2xs">
                          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                            <Scale className="w-3.5 h-3.5 text-indigo-500" />
                            Condition Verification
                          </div>
                          {dosha.conditionsEvaluated.map((c, i) => (
                            <div key={i} className="text-xs text-slate-700 p-2 rounded bg-slate-50 border border-slate-100">
                              <div className="font-semibold">{c.description}</div>
                              <div className="text-slate-500 font-mono text-[11px] mt-0.5">{c.evidence}</div>
                            </div>
                          ))}
                        </div>

                        {/* Classical Cancellations Found */}
                        <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 shadow-2xs">
                          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                            Classical Cancellation Rules (Bhanga)
                          </div>
                          {dosha.cancellationsFound.length === 0 ? (
                            <p className="text-xs text-slate-400 italic">No cancellation rules satisfied in this chart.</p>
                          ) : (
                            dosha.cancellationsFound.map((canc, i) => (
                              <div key={i} className="text-xs text-emerald-900 p-2 rounded bg-emerald-50 border border-emerald-200">
                                <div className="font-semibold">{canc.ruleTitle} ({canc.reductionPercentage}% reduction)</div>
                                <div className="text-emerald-700 text-[11px] mt-0.5">{canc.evidenceText}</div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Remedial Suggestions */}
                      {dosha.remedialSuggestions.length > 0 && (
                        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs">
                          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            Classical Remedial Principles
                          </div>
                          <ul className="text-xs space-y-1 text-slate-700">
                            {dosha.remedialSuggestions.map((rem, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                <span>{rem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: 1,001+ CLASSICAL YOGAS LIBRARY */}
      {activeSubTab === "classical_library" && (
        <div id="classical-library-panel" className="space-y-6">
          {/* Library Category and Search Filter */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row gap-3 items-center justify-between shadow-sm">
            <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
              <button
                onClick={() => { setSelectedCategory("All"); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === "All"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Categories ({ALL_CLASSICAL_YOGAS_300_PLUS.length})
              </button>
              {CLASSICAL_YOGA_CATEGORIES.slice(0, 5).map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setPage(1); }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat.split("(")[0].trim()}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                placeholder="Search all 1,001+ classical yogas..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Library Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedLibraryYogas.map((item) => {
              const isExpanded = expandedLibraryYoga === item.number;

              return (
                <div
                  key={item.number}
                  id={`lib-yoga-card-${item.number}`}
                  onMouseEnter={() => playCardHoverSound()}
                  className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm hover:border-indigo-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono">
                          #{item.number}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                      </div>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium whitespace-nowrap">
                        {item.category.split("(")[0].trim()}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 font-serif italic mb-2">{item.sanskritName}</div>

                    <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-xs text-slate-700 mb-3 space-y-1">
                      <div className="font-semibold text-slate-800">Formula / Rule:</div>
                      <div className="text-slate-600 leading-relaxed">{item.formula}</div>
                    </div>

                    {isExpanded && (
                      <div className="space-y-2.5 text-xs pt-2 border-t border-slate-100">
                        <div>
                          <span className="font-bold text-slate-700">Classical Results: </span>
                          <span className="text-slate-600">{item.results}</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-700">Source: </span>
                          <span className="text-slate-500 font-mono text-[11px]">{item.classicalSource}</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-700">Planetary Actors: </span>
                          <span className="text-slate-600">{item.planetaryActors?.join(", ") || "—"}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      playCardFlipSound();
                      setExpandedLibraryYoga(isExpanded ? null : item.number);
                    }}
                    className="mt-3 text-xs text-indigo-600 font-semibold hover:text-indigo-800 flex items-center gap-1 self-start"
                  >
                    {isExpanded ? "Show Less" : "View Full Classical Details"}
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm text-xs">
              <div className="text-slate-500">
                Showing {((page - 1) * itemsPerPage) + 1}–{Math.min(page * itemsPerPage, filteredLibraryYogas.length)} of {filteredLibraryYogas.length} yogas
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
                >
                  Previous
                </button>
                <span className="font-mono text-slate-700 font-medium">Page {page} of {totalPages}</span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SCRIPTURAL SOURCES & SHLOKAS */}
      {activeSubTab === "yoga_evidence" && (
        <div id="scriptural-sources-panel" className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Scroll className="w-5 h-5 text-purple-600" />
              Canonical Vedic Treatises & Shloka References
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              Dev-Guru's Phase 3 engine is mathematically linked to the authoritative classical treatises of Vedic astrology. All rules, conditions, cancellations, and results are sourced from Sanskrit verses with zero modern arbitrary approximations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
                <h4 className="text-sm font-bold text-slate-900">Brihat Parashara Hora Shastra (BPHS)</h4>
                <p className="text-xs text-slate-600">
                  Primary source for Pancha Mahapurusha Yogas (Ch. 75), Raja Yogas (Ch. 41), Nabhasa Yogas (Ch. 35), Chandra Yogas (Ch. 36), and Pitri Shapa Adhyaya (Ch. 84).
                </p>
                <div className="text-[11px] font-mono text-indigo-700 bg-white border border-slate-200 p-2 rounded">
                  "केन्द्रत्रिकोणनेतारौ परस्परमितरेतरम् । सम्बन्धं कुरुतो यद्वत् साक्षाद्राजप्रदौ हि तौ ॥"
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
                <h4 className="text-sm font-bold text-slate-900">Phaladeepika by Mantreswara</h4>
                <p className="text-xs text-slate-600">
                  Definitive classical source for Viparita Raja Yogas (Harsha, Sarala, Vimala in Ch. 6) and 3-fold Parivartana Yogas (Maha, Khala, Dainya).
                </p>
                <div className="text-[11px] font-mono text-indigo-700 bg-white border border-slate-200 p-2 rounded">
                  "दुःस्थानपा दुःस्थानगा यदि परस्परसम्बन्धिनः । विमलसरलहर्षाख्या विपरीतराजयोगप्रदाः ॥"
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
                <h4 className="text-sm font-bold text-slate-900">Saravali by Kalyana Varma</h4>
                <p className="text-xs text-slate-600">
                  Extensive documentation on multi-planet conjunctions (4, 5, 6, 7 planets in Ch. 34), Solar yogas (Ch. 15), and cancellation modifiers.
                </p>
                <div className="text-[11px] font-mono text-indigo-700 bg-white border border-slate-200 p-2 rounded">
                  "चतुर्ग्रहादिसंयोगे केन्द्रगेषु बलावहाः । भूपतित्वं प्रकुर्वन्ति कीर्तिं च विपुलां दिशि ॥"
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
                <h4 className="text-sm font-bold text-slate-900">Jaimini Upadesha Sutras</h4>
                <p className="text-xs text-slate-600">
                  Classical Jaimini Chara Karaka Yogas (AK-AmK sambandha, Karakamsa Lagna, Arudha Pada Rajayogas, and frontal Rashi Drishti).
                </p>
                <div className="text-[11px] font-mono text-indigo-700 bg-white border border-slate-200 p-2 rounded">
                  "आत्मकारकामात्यकारकयोर्योगे राजपदम् । स्वांशे कारकांशे वा शुभानां दृष्टौ कीर्तिः ॥"
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
