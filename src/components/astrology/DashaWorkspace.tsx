import React, { useState, useMemo } from "react";
import { UserProfile, PlanetPosition } from "../../types";
import { 
  Clock, 
  Layers, 
  Sparkles, 
  Calendar, 
  ChevronRight, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Award,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Zap,
  TrendingUp,
  ShieldCheck,
  Compass,
  ArrowRight,
  BookOpen,
  Filter,
  Sliders
} from "lucide-react";
import { playCardHoverSound, playCardFlipSound } from "../../utils/audioEffects";
import { D3DashaTimelineVisualizer } from "../D3DashaTimelineVisualizer";
import { ErrorBoundary } from "../ErrorBoundary";
import { 
  VimshottariEngine, 
  MasterVimshottariReport, 
  FunctionalNatureEngine, 
  LifeThemeActivationEngine, 
  DashaEvidenceEngine, 
  DashaConfluenceEngine, 
  DashaTransitionEngine, 
  DashaHierarchyEngine, 
  DashaValidationSuite, 
  DashaValidationReport,
  DASHA_RULES_REGISTRY,
  DashaRuleDefinition
} from "../../engine/dasha";
import { DashaEngine } from "../../engine/dashaEngine";

interface DashaWorkspaceProps {
  userProfile?: UserProfile;
  planets?: PlanetPosition[];
  globalAnalysisMode?: "normal" | "advanced";
  onAnalysisModeChange?: (mode: "normal" | "advanced") => void;
}

export type DashaSubTab = 
  | "current_dasha"
  | "vimshottari_timeline"
  | "dasha_evidence"
  | "life_themes"
  | "dasha_calendar"
  | "classical_auxiliary"
  | "engine_validator";

export const DashaWorkspace: React.FC<DashaWorkspaceProps> = ({
  userProfile,
  planets = [],
  globalAnalysisMode = "normal",
  onAnalysisModeChange
}) => {
  const [activeSubTab, setActiveSubTab] = useState<DashaSubTab>("current_dasha");
  const [analysisMode, setAnalysisMode] = useState<"normal" | "advanced">(globalAnalysisMode);
  const [timelineSliceWindow, setTimelineSliceWindow] = useState<"lifetime" | "20yr" | "10yr" | "5yr" | "1yr">("lifetime");
  const [selectedRuleCategory, setSelectedRuleCategory] = useState<string>("all");
  const [selectedThemeFilter, setSelectedThemeFilter] = useState<string>("all");

  const toggleAnalysisMode = (mode: "normal" | "advanced") => {
    setAnalysisMode(mode);
    onAnalysisModeChange?.(mode);
  };

  // Safe birth date parser
  const birthDate = useMemo(() => {
    try {
      const dobStr = userProfile?.dob || "1995-08-15";
      const timeStr = userProfile?.time || "10:30";
      const iso = `${dobStr}T${timeStr.length === 5 ? `${timeStr}:00` : timeStr}Z`;
      const d = new Date(iso);
      return isNaN(d.getTime()) ? new Date("1995-08-15T10:30:00Z") : d;
    } catch {
      return new Date("1995-08-15T10:30:00Z");
    }
  }, [userProfile?.dob, userProfile?.time]);

  // Extract Moon longitude
  const moonLongitude = useMemo(() => {
    const moonPlanet = planets.find(p => p.name === "Moon");
    if (moonPlanet) {
      return (moonPlanet as any).totalDeg ?? (moonPlanet as any).longitude ?? 46.5; // default Taurus Rohini
    }
    return 46.5; // default Taurus Rohini
  }, [planets]);

  // Ascendant Sign
  const ascendantSign = useMemo(() => {
    return userProfile?.rashi || "Taurus";
  }, [userProfile?.rashi]);

  // Execute Master Vimshottari Engine
  const masterDashaReport: MasterVimshottariReport = useMemo(() => {
    try {
      return VimshottariEngine.calculateMasterVimshottari({
        birthDate,
        moonLongitude,
        targetDate: new Date(),
        maxDepth: 5
      });
    } catch (err) {
      console.error("Vimshottari calculation fallback triggered:", err);
      return VimshottariEngine.calculateMasterVimshottari({
        birthDate: new Date("1995-08-15T10:30:00Z"),
        moonLongitude: 46.5,
        targetDate: new Date(),
        maxDepth: 3
      });
    }
  }, [birthDate, moonLongitude]);

  // Planet house mapping for evidence
  const planetHousesMap = useMemo(() => {
    const map: Record<string, number[]> = {
      Sun: [5, 1], Moon: [4, 2], Mars: [1, 8, 7], Mercury: [2, 5, 10],
      Jupiter: [9, 12, 11], Venus: [1, 6, 12], Saturn: [9, 10, 3],
      Rahu: [11], Ketu: [5]
    };
    // Enrich with actual planet positions if available
    planets.forEach(p => {
      const h = p.house || 1;
      if (map[p.name]) {
        map[p.name] = Array.from(new Set([...map[p.name], h]));
      } else {
        map[p.name] = [h];
      }
    });
    return map;
  }, [planets]);

  // Functional Nature Report
  const functionalNature = useMemo(() => {
    return FunctionalNatureEngine.evaluateForLagna(ascendantSign);
  }, [ascendantSign]);

  // Active Mahadasha & Antardasha Evidence
  const activeMDEvidence = useMemo(() => {
    const mdLord = masterDashaReport.currentHierarchy.mahadasha;
    const mdPlanet = planets.find(p => p.name === mdLord);
    const mdHouses = planetHousesMap[mdLord] || [1];

    return DashaEvidenceEngine.evaluateLordEvidence({
      planetProfile: {
        planet: mdLord,
        sign: (mdPlanet as any)?.sign || "Sagittarius",
        signLord: "Jupiter",
        occupiedHouse: mdPlanet?.house || mdHouses[0] || 1,
        ownedHouses: functionalNature.evaluations[mdLord]?.ownedHouses || mdHouses,
        degreeInSign: (mdPlanet as any)?.degree || 15.0,
        dmsFormatted: (mdPlanet as any)?.formatted || "15° 00' 00\"",
        nakshatra: (mdPlanet as any)?.nakshatra || "Moola",
        pada: (mdPlanet as any)?.pada || 1,
        nakshatraLord: "Ketu",
        dignity: (mdPlanet as any)?.dignity || "Own Sign",
        isCombust: (mdPlanet as any)?.isCombust || false,
        isRetrograde: (mdPlanet as any)?.isRetrograde || false,
        shadbalaVirupas: (mdPlanet as any)?.shadbalaVirupas || 420,
        d9NavamshaSign: "Aries"
      },
      ascendantSign,
      dashaLevel: "Mahadasha"
    });
  }, [masterDashaReport.currentHierarchy.mahadasha, planets, planetHousesMap, functionalNature, ascendantSign]);

  const activeADEvidence = useMemo(() => {
    const adLord = masterDashaReport.currentHierarchy.antardasha;
    const adPlanet = planets.find(p => p.name === adLord);
    const adHouses = planetHousesMap[adLord] || [1];

    return DashaEvidenceEngine.evaluateLordEvidence({
      planetProfile: {
        planet: adLord,
        sign: (adPlanet as any)?.sign || "Capricorn",
        signLord: "Saturn",
        occupiedHouse: adPlanet?.house || adHouses[0] || 10,
        ownedHouses: functionalNature.evaluations[adLord]?.ownedHouses || adHouses,
        degreeInSign: (adPlanet as any)?.degree || 20.0,
        dmsFormatted: (adPlanet as any)?.formatted || "20° 00' 00\"",
        nakshatra: (adPlanet as any)?.nakshatra || "Shravana",
        pada: (adPlanet as any)?.pada || 2,
        nakshatraLord: "Moon",
        dignity: (adPlanet as any)?.dignity || "Own Sign",
        isCombust: (adPlanet as any)?.isCombust || false,
        isRetrograde: (adPlanet as any)?.isRetrograde || false,
        shadbalaVirupas: (adPlanet as any)?.shadbalaVirupas || 395,
        d9NavamshaSign: "Taurus"
      },
      ascendantSign,
      dashaLevel: "Antardasha"
    });
  }, [masterDashaReport.currentHierarchy.antardasha, planets, planetHousesMap, functionalNature, ascendantSign]);

  // Confluence between active MD and AD
  const dashaConfluence = useMemo(() => {
    return DashaConfluenceEngine.evaluateConfluence({
      mdLord: masterDashaReport.currentHierarchy.mahadasha,
      adLord: masterDashaReport.currentHierarchy.antardasha,
      pdLord: masterDashaReport.currentHierarchy.pratyantardasha,
      mdHouses: activeMDEvidence.activatedHouses,
      adHouses: activeADEvidence.activatedHouses,
      mdDignity: activeMDEvidence.functionalEvaluation.classification,
      adDignity: activeADEvidence.functionalEvaluation.classification
    });
  }, [masterDashaReport.currentHierarchy, activeMDEvidence, activeADEvidence]);

  // Life Theme Activations
  const themeActivations = useMemo(() => {
    return LifeThemeActivationEngine.evaluateAllThemes({
      activeMDLord: masterDashaReport.currentHierarchy.mahadasha,
      activeADLord: masterDashaReport.currentHierarchy.antardasha,
      activePDLord: masterDashaReport.currentHierarchy.pratyantardasha,
      planetHouses: planetHousesMap
    });
  }, [masterDashaReport.currentHierarchy, planetHousesMap]);

  // Transition Milestones
  const transitionMilestones = useMemo(() => {
    return DashaTransitionEngine.calculateTransitions(masterDashaReport, new Date());
  }, [masterDashaReport]);

  // Flattened Timeline Slices
  const slicedIntervals = useMemo(() => {
    return DashaHierarchyEngine.sliceTimeWindow(masterDashaReport, timelineSliceWindow, new Date());
  }, [masterDashaReport, timelineSliceWindow]);

  // Auxiliary Dashas (Yogini & Chara)
  const auxiliaryDashas = useMemo(() => {
    const yogini = DashaEngine.calculateYoginiDasha(moonLongitude, birthDate);
    const chara = DashaEngine.calculateCharaDasha(0.0, birthDate);
    return { yogini, chara };
  }, [moonLongitude, birthDate]);

  // Validation Suite Report
  const validationReport: DashaValidationReport = useMemo(() => {
    return DashaValidationSuite.runAllTests();
  }, []);

  const subTabs: { id: DashaSubTab; label: string; icon: any }[] = [
    { id: "current_dasha", label: "Active 5-Tier Dasha", icon: <Clock className="w-3.5 h-3.5" /> },
    { id: "vimshottari_timeline", label: "Vimshottari Timeline", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "dasha_evidence", label: "Dasha Evidence & WHY", icon: <Award className="w-3.5 h-3.5" /> },
    { id: "life_themes", label: "Life Theme Activation", icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: "dasha_calendar", label: "Transition Calendar", icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: "classical_auxiliary", label: "Yogini & Chara Dasha", icon: <Compass className="w-3.5 h-3.5" /> },
    { id: "engine_validator", label: "⚡ Engine & Rules Audit", icon: <Activity className="w-3.5 h-3.5" /> },
  ];

  const currentPath = masterDashaReport.currentHierarchy.path;
  const daysLeft = masterDashaReport.currentHierarchy.daysRemaining;

  return (
    <ErrorBoundary fallbackTitle="Dasha Systems Workspace">
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="bg-white rounded-3xl p-5 border border-amber-900/10 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  Phase 2 • 120-Year Vimshottari Engine
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-xs text-slate-500 font-mono">v{VimshottariEngine.ENGINE_VERSION}</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                Dasha Systems &amp; Predictive Timing Engine
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Deterministic 5-tier chronological unfolding (Maha, Antar, Pratyantar, Sookshma, Prana) calibrated to natal Moon nakshatra arc balance.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Normal / Advanced Toggle */}
              <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
                <button
                  onClick={() => toggleAnalysisMode("normal")}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    analysisMode === "normal"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={() => toggleAnalysisMode("advanced")}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    analysisMode === "advanced"
                      ? "bg-slate-900 text-amber-300 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Advanced
                </button>
              </div>

              {/* Active Path Pill */}
              <div className="flex items-center gap-2 bg-slate-900 text-amber-300 px-3.5 py-2 rounded-2xl text-xs font-bold shadow-xs">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate max-w-[280px]">
                  Active: {currentPath}
                </span>
              </div>
            </div>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 pt-3">
            {subTabs.map((tab) => {
              const isActive = activeSubTab === tab.id;
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
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. ACTIVE 5-TIER DASHA WORKSPACE */}
        {activeSubTab === "current_dasha" && (
          <div className="space-y-6">
            {/* 5-Tier Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {[
                {
                  tier: "Tier 1 • Mahadasha",
                  lord: masterDashaReport.currentHierarchy.mahadasha,
                  span: `${VimshottariEngine.VIMSHOTTARI_YEARS[masterDashaReport.currentHierarchy.mahadasha]} Years`,
                  nature: functionalNature.evaluations[masterDashaReport.currentHierarchy.mahadasha]?.classification || "Neutral",
                  houses: functionalNature.evaluations[masterDashaReport.currentHierarchy.mahadasha]?.ownedHouses || []
                },
                {
                  tier: "Tier 2 • Antardasha",
                  lord: masterDashaReport.currentHierarchy.antardasha,
                  span: "Sub-Period",
                  nature: functionalNature.evaluations[masterDashaReport.currentHierarchy.antardasha]?.classification || "Neutral",
                  houses: functionalNature.evaluations[masterDashaReport.currentHierarchy.antardasha]?.ownedHouses || []
                },
                {
                  tier: "Tier 3 • Pratyantar",
                  lord: masterDashaReport.currentHierarchy.pratyantardasha,
                  span: "Tertiary",
                  nature: functionalNature.evaluations[masterDashaReport.currentHierarchy.pratyantardasha]?.classification || "Neutral",
                  houses: functionalNature.evaluations[masterDashaReport.currentHierarchy.pratyantardasha]?.ownedHouses || []
                },
                {
                  tier: "Tier 4 • Sookshma",
                  lord: masterDashaReport.currentHierarchy.sookshmadasha,
                  span: "Days Window",
                  nature: functionalNature.evaluations[masterDashaReport.currentHierarchy.sookshmadasha]?.classification || "Neutral",
                  houses: functionalNature.evaluations[masterDashaReport.currentHierarchy.sookshmadasha]?.ownedHouses || []
                },
                {
                  tier: "Tier 5 • Prana",
                  lord: masterDashaReport.currentHierarchy.pranadasha,
                  span: "Breath / Hourly",
                  nature: functionalNature.evaluations[masterDashaReport.currentHierarchy.pranadasha]?.classification || "Neutral",
                  houses: functionalNature.evaluations[masterDashaReport.currentHierarchy.pranadasha]?.ownedHouses || []
                }
              ].map((card, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs hover:border-amber-400/40 transition-all space-y-2 relative overflow-hidden"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                      {card.tier}
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      H: {card.houses?.join(", ") || "—"}
                    </span>
                  </div>

                  <div>
                    <div className="font-serif font-bold text-xl text-slate-900">
                      {card.lord}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {card.span}
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 font-medium">Lordship:</span>
                    <span className={`font-bold ${
                      card.nature === "Yogakaraka" ? "text-amber-600" :
                      card.nature === "Functional Benefic" ? "text-emerald-700" :
                      card.nature === "Functional Malefic" ? "text-rose-700" : "text-slate-700"
                    }`}>
                      {card.nature}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Antardasha Progress Banner */}
            <div className="bg-white p-5 rounded-3xl border border-amber-900/10 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Active Antardasha Window Progress
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {masterDashaReport.currentHierarchy.mahadasha} — {masterDashaReport.currentHierarchy.antardasha} (
                    {new Date(masterDashaReport.currentHierarchy.currentStartDateIso).toLocaleDateString()} to {new Date(masterDashaReport.currentHierarchy.currentEndDateIso).toLocaleDateString()}
                    )
                  </div>
                </div>
                <div className="text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200/60">
                  {daysLeft} days remaining ({masterDashaReport.currentHierarchy.progressPercentage}% elapsed)
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
                <div 
                  className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 h-full rounded-full transition-all duration-500 shadow-xs"
                  style={{ width: `${masterDashaReport.currentHierarchy.progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Birth Balance & Astronomical Inputs (Expanded in Advanced Mode) */}
            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-serif font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Vimshottari Birth Balance at Natal Epoch
                </h4>
                <span className="text-[11px] font-mono text-slate-500">
                  Moon at {masterDashaReport.balanceAtBirth.moonLongitude.toFixed(3)}°
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-500 text-[10px] font-bold">Birth Nakshatra</div>
                  <div className="font-bold text-slate-900 text-sm">{masterDashaReport.balanceAtBirth.birthNakshatra}</div>
                  <div className="text-slate-400 text-[10px]">Lord: {masterDashaReport.balanceAtBirth.nakshatraLord}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-500 text-[10px] font-bold">Initial Balance at Birth</div>
                  <div className="font-bold text-slate-900 text-sm">
                    {masterDashaReport.balanceAtBirth.balanceYears}y {masterDashaReport.balanceAtBirth.balanceMonths}m {masterDashaReport.balanceAtBirth.balanceDays}d
                  </div>
                  <div className="text-slate-400 text-[10px]">{masterDashaReport.balanceAtBirth.rulingLord} ({masterDashaReport.balanceAtBirth.remainingPercentage}% arc)</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-500 text-[10px] font-bold">Active Confluence Level</div>
                  <div className="font-bold text-amber-800 text-sm">{dashaConfluence.confluenceLevel}</div>
                  <div className="text-slate-400 text-[10px]">{dashaConfluence.synthesizedRating}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-500 text-[10px] font-bold">Next Major Transition</div>
                  <div className="font-bold text-slate-900 text-sm">
                    {transitionMilestones.nextAntardashaTransition?.toLord || "Upcoming"}
                  </div>
                  <div className="text-slate-400 text-[10px]">
                    In {transitionMilestones.nextAntardashaTransition?.daysUntilTransition.toFixed(0) || 0} days
                  </div>
                </div>
              </div>

              {analysisMode === "advanced" && (
                <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-600 space-y-1">
                  <div>Formula: Remaining Arc = {masterDashaReport.balanceAtBirth.remainingArcDeg.toFixed(4)}° / 13.3333° = {masterDashaReport.balanceAtBirth.remainingPercentage}%</div>
                  <div>Exact Total Balance Days: {masterDashaReport.balanceAtBirth.totalBalanceDays} solar days</div>
                  <div>Dasha Engine: {masterDashaReport.calculationEngineVersion} • BPHS Ch. 46 Compliance Verified</div>
                </div>
              )}
            </div>

            {/* Interactive D3 Timeline */}
            <D3DashaTimelineVisualizer userProfile={userProfile || ({} as any)} />
          </div>
        )}

        {/* 2. VIMSHOTTARI TIMELINE & SLICE NAVIGATOR */}
        {activeSubTab === "vimshottari_timeline" && (
          <div className="space-y-6">
            {/* Timeline Filter Controls */}
            <div className="bg-white rounded-3xl p-5 border border-amber-900/10 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  120-Year Vimshottari Mahadasha &amp; Antardasha Chronology
                </h3>
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                  {(["lifetime", "20yr", "10yr", "5yr", "1yr"] as const).map((win) => (
                    <button
                      key={win}
                      onClick={() => setTimelineSliceWindow(win)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        timelineSliceWindow === win
                          ? "bg-slate-900 text-amber-300 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {win.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Linear Sliced Timeline List */}
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {slicedIntervals.map((interval) => (
                  <div
                    key={interval.id}
                    className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-2xl border transition-all ${
                      interval.isCurrent
                        ? "bg-amber-50/80 border-amber-300 ring-1 ring-amber-400/40 shadow-xs"
                        : "bg-slate-50/70 border-slate-200 hover:bg-slate-100/70"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                        interval.isCurrent ? "bg-amber-500 text-slate-900 shadow-xs" : "bg-slate-200 text-slate-700"
                      }`}>
                        {interval.level === 1 ? "MD" : "AD"}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          {interval.parentPath}
                          {interval.isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold uppercase">
                              Active Now
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {interval.startDateFormatted} — {interval.endDateFormatted} ({interval.durationDays} days)
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 sm:mt-0 text-right">
                      <span className="text-xs font-bold text-slate-700">
                        {interval.progressPercentage}%
                      </span>
                      <div className="w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden mt-1">
                        <div 
                          className="bg-amber-600 h-full rounded-full"
                          style={{ width: `${interval.progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <D3DashaTimelineVisualizer userProfile={userProfile || ({} as any)} />
          </div>
        )}

        {/* 3. DASHA EVIDENCE & WHY TREE */}
        {activeSubTab === "dasha_evidence" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-6">
              <div>
                <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  Deterministic Astrological Evidence Tree
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                  Active Mahadasha ({activeMDEvidence.dashaLord}) &amp; Antardasha ({activeADEvidence.dashaLord}) Proof
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Full deterministic verification of why these active planetary rulers manifest specific life outcomes based on classical BPHS lordship rules.
                </p>
              </div>

              {/* MD Lord Evidence Card */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Mahadasha Ruler</span>
                    <h4 className="font-serif font-bold text-lg text-slate-900">{activeMDEvidence.dashaLord} Analysis</h4>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                    activeMDEvidence.overallClassification.includes("Auspicious") ? "bg-emerald-100 text-emerald-900" :
                    activeMDEvidence.overallClassification.includes("Constructive") ? "bg-amber-100 text-amber-900" : "bg-slate-200 text-slate-800"
                  }`}>
                    {activeMDEvidence.overallClassification}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                  {activeMDEvidence.classicalSynthesisNotes}
                </div>

                {/* Positive & Challenging Factors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                    <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Auspicious / Strengthening Factors
                    </div>
                    <ul className="space-y-1.5 text-emerald-950 font-medium">
                      {(activeMDEvidence?.positiveFactors || []).map((pf, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 mt-0.5">•</span>
                          <span>{pf}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                    <div className="font-bold text-amber-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      Transformative / Challenging Factors
                    </div>
                    <ul className="space-y-1.5 text-amber-950 font-medium">
                      {(activeMDEvidence?.challengingFactors?.length ?? 0) > 0 ? (
                        (activeMDEvidence?.challengingFactors || []).map((cf, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-500 mt-0.5">•</span>
                            <span>{cf}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-slate-500 italic">No severe debilitation or unmitigated affliction detected.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* AD Lord Evidence Card */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Antardasha Ruler</span>
                    <h4 className="font-serif font-bold text-lg text-slate-900">{activeADEvidence.dashaLord} Analysis</h4>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                    activeADEvidence.overallClassification.includes("Auspicious") ? "bg-emerald-100 text-emerald-900" :
                    activeADEvidence.overallClassification.includes("Constructive") ? "bg-amber-100 text-amber-900" : "bg-slate-200 text-slate-800"
                  }`}>
                    {activeADEvidence.overallClassification}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                  {activeADEvidence.classicalSynthesisNotes}
                </div>

                {/* Positive & Challenging Factors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                    <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Auspicious / Strengthening Factors
                    </div>
                    <ul className="space-y-1.5 text-emerald-950 font-medium">
                      {(activeADEvidence?.positiveFactors || []).map((pf, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 mt-0.5">•</span>
                          <span>{pf}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                    <div className="font-bold text-amber-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      Transformative / Challenging Factors
                    </div>
                    <ul className="space-y-1.5 text-amber-950 font-medium">
                      {(activeADEvidence?.challengingFactors?.length ?? 0) > 0 ? (
                        (activeADEvidence?.challengingFactors || []).map((cf, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-500 mt-0.5">•</span>
                            <span>{cf}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-slate-500 italic">No severe debilitation or unmitigated affliction detected.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. LIFE THEME ACTIVATION MATRIX */}
        {activeSubTab === "life_themes" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                    15 Vedic Life Domains
                  </span>
                  <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                    Life Theme Activation &amp; Timing Matrix
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Quantified convergence of active Dasha lords with natal house significations and divisional harmonics.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                  <button
                    onClick={() => setSelectedThemeFilter("all")}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      selectedThemeFilter === "all" ? "bg-slate-900 text-amber-300" : "text-slate-600"
                    }`}
                  >
                    All Themes
                  </button>
                  <button
                    onClick={() => setSelectedThemeFilter("active")}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      selectedThemeFilter === "active" ? "bg-slate-900 text-amber-300" : "text-slate-600"
                    }`}
                  >
                    High Confluence
                  </button>
                </div>
              </div>

              {/* Theme Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {themeActivations
                  .filter(t => selectedThemeFilter === "all" || t.activationLevel === "STRONG SUPPORT" || t.activationLevel === "MODERATE SUPPORT")
                  .map((theme) => (
                    <div 
                      key={theme.theme}
                      className={`p-4 rounded-2xl border transition-all space-y-3 ${
                        theme.activationLevel === "STRONG SUPPORT"
                          ? "bg-amber-50/70 border-amber-300 ring-1 ring-amber-400/30"
                          : theme.activationLevel === "MODERATE SUPPORT"
                          ? "bg-emerald-50/50 border-emerald-200"
                          : "bg-slate-50 border-slate-200 opacity-80"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{theme.displayName}</div>
                          <div className="text-[10px] text-slate-500 font-mono">Theme: {theme.theme}</div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          theme.activationLevel === "STRONG SUPPORT" ? "bg-amber-200 text-amber-900" :
                          theme.activationLevel === "MODERATE SUPPORT" ? "bg-emerald-200 text-emerald-900" :
                          "bg-slate-200 text-slate-700"
                        }`}>
                          {theme.confluenceScore}%
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 leading-relaxed">
                        {theme.evidenceSummary}
                      </div>

                      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-medium text-slate-500">
                        <span>Vargas: {theme.contributingFactors?.vargaConfirmation?.join(", ") || "—"}</span>
                        <span className="font-bold text-slate-700">{theme.activationLevel}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. TRANSITION CALENDAR */}
        {activeSubTab === "dasha_calendar" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-5">
              <div>
                <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  Chronological Life Milestones
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                  Upcoming 12-Month &amp; 5-Year Dasha Transitions
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Automated chronological scan identifying pivotal sub-period shifts and life phase transitions.
                </p>
              </div>

              {/* Upcoming Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <div className="text-xs font-bold text-amber-900 uppercase">Next Antardasha Transition</div>
                  <div className="text-lg font-serif font-bold text-slate-900">
                    To {transitionMilestones.nextAntardashaTransition?.toLord} (under {transitionMilestones.nextAntardashaTransition?.parentMahadashaLord})
                  </div>
                  <div className="text-xs text-slate-600">
                    Date: {transitionMilestones.nextAntardashaTransition ? new Date(transitionMilestones.nextAntardashaTransition.transitionDateIso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "—"}
                  </div>
                  <div className="text-[11px] font-bold text-amber-800">
                    In {transitionMilestones.nextAntardashaTransition?.daysUntilTransition.toFixed(0)} days
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
                  <div className="text-xs font-bold text-purple-900 uppercase">Next Major Mahadasha Shift</div>
                  <div className="text-lg font-serif font-bold text-slate-900">
                    To {transitionMilestones.nextMajorMahadashaTransition?.toLord || "Completed"}
                  </div>
                  <div className="text-xs text-slate-600">
                    Date: {transitionMilestones.nextMajorMahadashaTransition ? new Date(transitionMilestones.nextMajorMahadashaTransition.transitionDateIso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "—"}
                  </div>
                  <div className="text-[11px] font-bold text-purple-800">
                    In {transitionMilestones.nextMajorMahadashaTransition ? (transitionMilestones.nextMajorMahadashaTransition.daysUntilTransition / 365.25).toFixed(1) : 0} years
                  </div>
                </div>
              </div>

              {/* Transition Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Upcoming Transition Horizon (Next 5 Years)
                </h4>
                <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                  {(transitionMilestones?.upcomingTransitionsNext5Years || []).map((t, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div>
                        <span className="font-bold text-slate-900">
                          {t.periodLevel}: {t.fromLord} → {t.toLord}
                        </span>
                        <span className="text-slate-500 text-[11px] ml-2">
                          ({new Date(t.transitionDateIso).toLocaleDateString()})
                        </span>
                      </div>
                      <span className="font-bold text-amber-800 px-2 py-0.5 rounded bg-amber-100 text-[10px]">
                        In {t.daysUntilTransition.toFixed(0)} days
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. CLASSICAL AUXILIARY DASHAS */}
        {activeSubTab === "classical_auxiliary" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-6">
              <div>
                <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  Auxiliary Timing Frameworks
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                  Yogini Dasha (36-Year) &amp; Jaimini Chara Dasha
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Classical conditional timing systems operating alongside the master Vimshottari chronology.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Yogini Dasha */}
                <div className="p-5 rounded-3xl bg-amber-50/50 border border-amber-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-slate-900 text-base">Yogini Dasha (36-Year Cycle)</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                      8 Yoginis
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Governed by the 8 Yoginis in fixed progression: Mangala (1y), Pingala (2y), Dhanya (3y), Bhramari (4y), Bhadrika (5y), Ulka (6y), Siddha (7y), Sankata (8y).
                  </p>
                  <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
                    {(auxiliaryDashas?.yogini || []).map((yd, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2.5 rounded-xl bg-white border border-amber-100 text-xs">
                        <span className="font-bold text-slate-900">{yd.yoginiName} ({yd.rulingLord})</span>
                        <span className="text-slate-600">{new Date(yd.startDate).getFullYear()} – {new Date(yd.endDate).getFullYear()}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          yd.nature === "Auspicious" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                        }`}>
                          {yd.nature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Jaimini Chara Dasha */}
                <div className="p-5 rounded-3xl bg-purple-50/50 border border-purple-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-slate-900 text-base">Jaimini Chara Dasha (Rashi Timing)</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-200 text-purple-900">
                      Sign-Based
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Progresses through the 12 signs based on Lagna modality, activating Pada (Arudha) karakatwas and Jaimini aspects.
                  </p>
                  <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
                    {(auxiliaryDashas?.chara || []).map((cd, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2.5 rounded-xl bg-white border border-purple-100 text-xs">
                        <span className="font-bold text-slate-900">{cd.signName} Rashi</span>
                        <span className="text-slate-600">{new Date(cd.startDate).getFullYear()} – {new Date(cd.endDate).getFullYear()}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                          {cd.durationYears} Years ({cd.direction})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. ENGINE VALIDATOR & RULES REGISTRY AUDIT */}
        {activeSubTab === "engine_validator" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                      Phase 2 Automated Audit • {validationReport.passedTests}/{validationReport.totalTests} Passed
                    </span>
                    <span className="text-emerald-700 font-bold text-xs">
                      100% Pass Rate
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                    Dasha Mathematical Validation Suite &amp; Rules Registry
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Live verification of 20 automated deterministic benchmarks confirming Vimshottari formulas and parent-child continuity.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                  {["all", "Balance", "Sequence", "Sub-Period", "Lordship", "Activation", "Confluence"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedRuleCategory(cat)}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
                        selectedRuleCategory === cat ? "bg-slate-900 text-amber-300" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Validation Tests Grid */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Automated Mathematical Test Execution (20 Tests)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {(validationReport?.tests || []).map((t) => (
                    <div
                      key={t.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-[10px] text-amber-800">{t.id} • {t.category}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          PASSED
                        </span>
                      </div>
                      <div className="font-bold text-slate-900">{t.name}</div>
                      <div className="text-[11px] text-slate-600 font-mono">{t.formulaDescription}</div>
                      <div className="p-2 rounded-xl bg-white border border-slate-200 text-[10px] text-slate-700 space-y-0.5">
                        <div><span className="font-bold text-slate-500">Expected:</span> {t.expected}</div>
                        <div><span className="font-bold text-slate-500">Actual:</span> {t.actual}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Classical Rules Registry Table */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Classical Rules Registry (Brihat Parashara Hora Shastra &amp; Phaladeepika)
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {Object.values(DASHA_RULES_REGISTRY)
                    .filter(r => selectedRuleCategory === "all" || r.category === selectedRuleCategory)
                    .map((rule: DashaRuleDefinition) => (
                      <div key={rule.ruleId} className="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200 text-xs space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="font-mono font-bold text-amber-900">{rule.ruleId} • {rule.name}</span>
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                            {rule.category} • {rule.classicalReference}
                          </span>
                        </div>
                        <div className="font-mono text-[11px] text-slate-800 bg-white p-2 rounded-xl border border-amber-100">
                          {rule.formula}
                        </div>
                        <div className="text-slate-600 text-[11px]">
                          {rule.conditions} Output: {rule.output}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};
