import React, { useState, useMemo, useEffect } from "react";
import {
  Sun,
  Layers,
  Sparkles,
  Activity,
  Compass,
  Clock,
  RotateCw,
  Table,
  ShieldAlert,
  Award,
  BookOpen,
  Eye,
  Sliders,
  FileText
} from "lucide-react";
import { UserProfile, PlanetPosition, HouseDetail } from "../../types";
import { KundliWorkspace } from "./KundliWorkspace";
import { YogasDoshasWorkspace } from "./YogasDoshasWorkspace";
import { DashaWorkspace } from "./DashaWorkspace";
import { TransitsWorkspace } from "./TransitsWorkspace";
import { ShadbalaDashaEngine } from "../ShadbalaDashaEngine";
import { AshtakavargaMatrix } from "../AshtakavargaMatrix";
import { RemediesWorkspace } from "./RemediesWorkspace";
import { ReportsWorkspace } from "./ReportsWorkspace";
import { AstrologyToolsWorkspace } from "./AstrologyToolsWorkspace";
import { AyanamshaSwitcherWidget } from "../AyanamshaSwitcherWidget";

interface VedicWorkspaceViewProps {
  userProfile?: UserProfile;
  planets: PlanetPosition[];
  houses: HouseDetail[];
  lagnaSign: string;
  onOpenPdfModal?: () => void;
  onSelectSubTool?: (subTool: string) => void;
  initialSection?: VedicSection;
}

export type VedicSection =
  | "birth_chart"
  | "divisional_charts"
  | "planetary_analysis"
  | "nakshatra"
  | "yogas"
  | "doshas"
  | "dasha"
  | "strength"
  | "transits"
  | "advanced_tools";

export const VedicWorkspaceView: React.FC<VedicWorkspaceViewProps> = ({
  userProfile,
  planets,
  houses,
  lagnaSign,
  onOpenPdfModal,
  initialSection = "birth_chart",
}) => {
  const [activeSection, setActiveSection] = useState<VedicSection>(initialSection);
  const [strengthSubTab, setStrengthSubTab] = useState<"shadbala" | "ashtakavarga">("shadbala");
  const [advancedSubTab, setAdvancedSubTab] = useState<"remedies" | "ayanamsha" | "reports" | "tools">("remedies");
  const [analysisMode, setAnalysisMode] = useState<"standard" | "research" | "traditional">("standard");

  useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);

  const safeProfile = useMemo(() => {
    if (userProfile && userProfile.name) return userProfile;
    return {
      id: userProfile?.id || "usr-001",
      name: userProfile?.name || "Aarav Sharma",
      dob: userProfile?.dob || "1995-08-15",
      time: userProfile?.time || "10:30",
      place: userProfile?.place || "New Delhi, India",
      latitude: userProfile?.latitude ?? 28.6139,
      longitude: userProfile?.longitude ?? 77.2090,
      timezone: userProfile?.timezone || "Asia/Kolkata",
      gender: userProfile?.gender || "male",
      rashi: userProfile?.rashi || "Aries",
      nakshatra: userProfile?.nakshatra || "Ashwini",
      nakshatraPada: userProfile?.nakshatraPada || 1,
      sunSign: userProfile?.sunSign || "Leo",
    } as UserProfile;
  }, [userProfile]);

  const sections: { id: VedicSection; label: string; icon: React.ReactNode; tag: string }[] = [
    { id: "birth_chart", label: "Birth Chart (D1 & Bhavas)", icon: <Sun className="w-3.5 h-3.5" />, tag: "D1 Rashi" },
    { id: "divisional_charts", label: "Divisional Charts (D1–D60)", icon: <Layers className="w-3.5 h-3.5" />, tag: "Vargas" },
    { id: "planetary_analysis", label: "Planetary Analysis & Dignities", icon: <Eye className="w-3.5 h-3.5" />, tag: "Dignities" },
    { id: "nakshatra", label: "Nakshatras & Padas", icon: <Sparkles className="w-3.5 h-3.5" />, tag: "27 Constellations" },
    { id: "yogas", label: "Classical Yogas (1,001+ Rules)", icon: <Award className="w-3.5 h-3.5" />, tag: "Auspicious" },
    { id: "doshas", label: "Doshas & Exceptions", icon: <ShieldAlert className="w-3.5 h-3.5" />, tag: "Afflictions" },
    { id: "dasha", label: "Dashas (Vimshottari Hierarchy)", icon: <Clock className="w-3.5 h-3.5" />, tag: "Timing" },
    { id: "strength", label: "Strength (Shadbala & Ashtakavarga)", icon: <Activity className="w-3.5 h-3.5" />, tag: "Potencies" },
    { id: "transits", label: "Transits (Gochara & Sade Sati)", icon: <RotateCw className="w-3.5 h-3.5" />, tag: "Real-Time" },
    { id: "advanced_tools", label: "Tools, Remedies & Reports", icon: <Sliders className="w-3.5 h-3.5" />, tag: "Tools & Reports" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Sun className="w-3.5 h-3.5" /> Classical Vedic Astrology
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                Parashari Hora Shastra Core
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1.5">
              Comprehensive Parashari Analytics &amp; Shastric Calculations
            </h2>
            <p className="text-xs text-slate-600 mt-0.5 max-w-3xl">
              Deterministic computation of natal D1 Rashi, 16 Shodashavarga divisional charts (D1 to D60), 6-fold Shadbala potencies, Ashtakavarga SAV 337, multi-tiered Vimshottari dasha hierarchy, and 1,001+ classical yogas.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 text-amber-300 px-4 py-2 rounded-2xl text-xs font-bold shadow-xs">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Chitrapaksha Lahiri Ayanamsha</span>
          </div>
        </div>

        {/* 10 Sub-Sections Navigation Ribbon */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 pt-3">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeSection === sec.id
                  ? "bg-slate-900 text-amber-300 shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
              }`}
            >
              {sec.icon}
              <span>{sec.label}</span>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase ${
                  activeSection === sec.id
                    ? "bg-amber-400/20 text-amber-200"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {sec.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION CONTENTS */}
      <div>
        {/* A. BIRTH CHART */}
        {activeSection === "birth_chart" && (
          <KundliWorkspace
            userProfile={safeProfile}
            planets={planets}
            houses={houses}
            lagnaSign={lagnaSign}
            globalAnalysisMode={analysisMode}
            onAnalysisModeChange={setAnalysisMode}
            initialSubTab="overview"
          />
        )}

        {/* B. DIVISIONAL CHARTS */}
        {activeSection === "divisional_charts" && (
          <KundliWorkspace
            userProfile={safeProfile}
            planets={planets}
            houses={houses}
            lagnaSign={lagnaSign}
            globalAnalysisMode={analysisMode}
            onAnalysisModeChange={setAnalysisMode}
            initialSubTab="vargas"
          />
        )}

        {/* C. PLANETARY ANALYSIS */}
        {activeSection === "planetary_analysis" && (
          <KundliWorkspace
            userProfile={safeProfile}
            planets={planets}
            houses={houses}
            lagnaSign={lagnaSign}
            globalAnalysisMode={analysisMode}
            onAnalysisModeChange={setAnalysisMode}
            initialSubTab="planets_table"
          />
        )}

        {/* D. NAKSHATRA */}
        {activeSection === "nakshatra" && (
          <KundliWorkspace
            userProfile={safeProfile}
            planets={planets}
            houses={houses}
            lagnaSign={lagnaSign}
            globalAnalysisMode={analysisMode}
            onAnalysisModeChange={setAnalysisMode}
            initialSubTab="nakshatra"
          />
        )}

        {/* E. YOGAS */}
        {activeSection === "yogas" && (
          <YogasDoshasWorkspace
            userProfile={safeProfile}
            planets={planets}
            houses={houses}
            lagnaSign={lagnaSign}
          />
        )}

        {/* F. DOSHAS */}
        {activeSection === "doshas" && (
          <YogasDoshasWorkspace
            userProfile={safeProfile}
            planets={planets}
            houses={houses}
            lagnaSign={lagnaSign}
          />
        )}

        {/* G. DASHA */}
        {activeSection === "dasha" && (
          <DashaWorkspace
            userProfile={safeProfile}
            planets={planets}
            globalAnalysisMode={analysisMode}
            onAnalysisModeChange={setAnalysisMode}
          />
        )}

        {/* H. STRENGTH */}
        {activeSection === "strength" && (
          <div className="space-y-6">
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2">
              <button
                onClick={() => setStrengthSubTab("shadbala")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  strengthSubTab === "shadbala"
                    ? "bg-slate-900 text-amber-300 shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                6-Fold Shadbala &amp; Bhava Bala
              </button>
              <button
                onClick={() => setStrengthSubTab("ashtakavarga")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  strengthSubTab === "ashtakavarga"
                    ? "bg-slate-900 text-amber-300 shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Ashtakavarga Matrix (BAV &amp; SAV 337)
              </button>
            </div>

            {strengthSubTab === "shadbala" ? (
              <ShadbalaDashaEngine
                lagna={lagnaSign}
                rashi={safeProfile.rashi}
                nakshatra={safeProfile.nakshatra}
                dob={safeProfile.dob}
                userName={safeProfile.name}
              />
            ) : (
              <AshtakavargaMatrix
                lagna={lagnaSign}
                rashi={safeProfile.rashi}
                userName={safeProfile.name}
              />
            )}
          </div>
        )}

        {/* I. TRANSITS */}
        {activeSection === "transits" && (
          <TransitsWorkspace
            userProfile={safeProfile}
            planets={planets}
            houses={houses}
            lagnaSign={lagnaSign}
          />
        )}

        {/* J. ADVANCED TOOLS & REMEDIES */}
        {activeSection === "advanced_tools" && (
          <div className="space-y-6">
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2 overflow-x-auto no-scrollbar">
              {[
                { id: "remedies", label: "Gemstones & Remedies" },
                { id: "ayanamsha", label: "Ayanamsha Comparison" },
                { id: "tools", label: "Calculators & Quick Tools" },
                { id: "reports", label: "Astrology Reports & PDF" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setAdvancedSubTab(item.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    advancedSubTab === item.id
                      ? "bg-slate-900 text-amber-300 shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {advancedSubTab === "remedies" && (
              <RemediesWorkspace
                userProfile={safeProfile}
                planets={planets}
                lagnaSign={lagnaSign}
              />
            )}

            {advancedSubTab === "ayanamsha" && <AyanamshaSwitcherWidget />}

            {advancedSubTab === "tools" && (
              <AstrologyToolsWorkspace
                onSelectToolAction={(action) => {
                  if (action === "kundli_calc") setActiveSection("birth_chart");
                  else if (action === "dasha_calc") setActiveSection("dasha");
                  else if (action === "yoga_finder" || action === "dosha_finder") setActiveSection("yogas");
                  else if (action === "transit_calc") setActiveSection("transits");
                  else if (action === "shadbala_calc") {
                    setActiveSection("strength");
                    setStrengthSubTab("shadbala");
                  }
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}

            {advancedSubTab === "reports" && (
              <ReportsWorkspace
                userProfile={safeProfile}
                planets={planets}
                houses={houses}
                lagnaSign={lagnaSign}
                onOpenPdfModal={onOpenPdfModal}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
