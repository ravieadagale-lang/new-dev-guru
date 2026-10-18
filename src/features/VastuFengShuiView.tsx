import React, { useState } from "react";
import { LanguageCode, UserProfile } from "../types";
import {
  Compass,
  Home,
  Sliders,
  Sparkles,
  Layers,
  Ruler,
  ShieldCheck,
  FileDown,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Search
} from "lucide-react";
import { FloorPlanUploadStudio } from "../components/vastu/FloorPlanUploadStudio";
import { ZonesBalancingView } from "../components/vastu/ZonesBalancingView";
import { ShaktiChakraDeepDive } from "../components/vastu/ShaktiChakraDeepDive";
import { FengShuiStudioView } from "../components/vastu/FengShuiStudioView";
import { AyadiCalculatorView } from "../components/vastu/AyadiCalculatorView";
import { RemedialEncyclopediaModal } from "../components/vastu/RemedialEncyclopediaModal";
import { QuickVastuAuditWizard } from "../components/vastu/QuickVastuAuditWizard";
import { GeopathicStressScanner } from "../components/vastu/GeopathicStressScanner";
import { CommercialVastuSuite } from "../components/vastu/CommercialVastuSuite";
import { PlotSelectionAnalyzer } from "../components/vastu/PlotSelectionAnalyzer";
import { DigitalCompassCalibrator } from "../components/vastu/DigitalCompassCalibrator";
import { VastuProblemFinderView } from "../components/vastu/VastuProblemFinderView";
import { GrandmasterRemediesHub } from "../components/vastu/GrandmasterRemediesHub";

interface VastuFengShuiViewProps {
  userProfile?: UserProfile;
  selectedLanguage?: LanguageCode;
  onNavigateTab?: (tab: string) => void;
}

type VastuTab =
  | "problem_finder"
  | "remedies_hub"
  | "quick_audit"
  | "floor_plan_studio"
  | "zones_balancing"
  | "shakti_chakra"
  | "commercial_vastu"
  | "geopathic_scanner"
  | "plot_selection"
  | "digital_compass"
  | "feng_shui"
  | "ayadi_calculator"
  | "room_guidelines";

const ROOM_GUIDELINES = [
  {
    room: "Main Entrance (Simha Dwara)",
    idealDirection: "North (N3, N4), East (E3, E4), South (S3, S4), West (W3, W4)",
    forbiddenDirection: "South-West (S7, S8, W1, W2), North-West (NW1, W8)",
    tips: "The entrance is the mouth of prana. Keep threshold well illuminated, pristine, and adorned with Swastika or Kalash symbols. Never install shoe racks or trash bins directly in front of the door frame.",
    remedy: "If entrance falls in an inauspicious pada, embed a 3-4mm metallic strip (Brass for SW, Copper for SE, SS for North) across the threshold to virtually nullify the negative doorway."
  },
  {
    room: "Kitchen & Cooktop (Rasoi)",
    idealDirection: "South-East (Agneya - Agni Kona) or North-West (Vayavya)",
    forbiddenDirection: "North-East (Ishanya), South-West (Nirruti), North",
    tips: "Cook facing East towards the rising sun. Never place the fire burner directly adjoining or facing the water sink. Maintain a minimum 3-foot buffer or install a wooden/earth barrier.",
    remedy: "For kitchens placed in North-East (a major wealth & health defect), install a yellow Jaisalmer marble slab under the gas cooktop and fix a consecrated Copper Agni Yantra on the wall."
  },
  {
    room: "Master Bedroom & Bed Alignment",
    idealDirection: "South-West (Nairitya) or South",
    forbiddenDirection: "North-East (disturbed sleep, anxiety), North-West (restlessness)",
    tips: "Sleep with head towards South or East for revitalizing biomagnetic resonance. Never sleep with head towards North (causes magnetic repulsion, high BP, and insomnia).",
    remedy: "Ensure heavy wardrobes occupy the South and West walls. If bed is placed under an exposed overhead structural beam, conceal it with false ceiling or suspend hollow bamboo flutes with red ribbons."
  },
  {
    room: "Puja Room / Sacred Mandir",
    idealDirection: "North-East (Ishanya Kona) or East / North",
    forbiddenDirection: "South, South-West, Under Staircases, Sharing wall with Bathroom",
    tips: "Deities must face East or West; devotees should face East or North during prayer. Light an unbroken pure cow-ghee lamp in the South-East corner of the mandir.",
    remedy: "Elevate the altar on Makrana white marble or seasoned teakwood. If mandir is forced into other sectors, hang a Sphatik Sri Yantra to purify cosmic vibrations."
  },
  {
    room: "Toilet, Commode & Septic Tank",
    idealDirection: "West-North-West (Depression disposal), South-South-West (Expenditure disposal), East-South-East",
    forbiddenDirection: "North-East (catastrophic neurological & financial dosha), South-West, Brahmasthan",
    tips: "Always keep toilet seats covered. Exhaust fans should vent negative damp prana outside immediately. Never position commode facing true East or West.",
    remedy: "Paste a 3-inch colored elemental vinyl tape or embed a metal strip on three sides of the commode base (Blue/Aluminium for North, Red/Copper for SE, Yellow/Brass for SW, White/Iron for West)."
  },
  {
    room: "Cash Locker, Safe & Accounts Desk",
    idealDirection: "North (Kubera Palace) or opening towards North from South wall",
    forbiddenDirection: "South (cash drains), South-East (fire burns wealth)",
    tips: "Locker door should open towards North (Lord of Wealth) or East. Avoid placing heavy lockers directly on hollow wooden cabinets.",
    remedy: "Keep a consecrated Brass Kubera Yantra and an energizing Citrine or Pyrite crystal inside the financial safe."
  }
];

export const VastuFengShuiView: React.FC<VastuFengShuiViewProps> = ({
  userProfile,
  selectedLanguage = "en",
  onNavigateTab
}) => {
  const [activeTab, setActiveTab] = useState<VastuTab>("floor_plan_studio");
  const [isEncyclopediaOpen, setIsEncyclopediaOpen] = useState<boolean>(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Hero */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 border border-amber-500/30 text-amber-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>MahaVastu™ 16 Zones · 32 Devata Padas · Period 9 Feng Shui</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Vastu Shastra &amp; Feng Shui Spatial Architecture
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed font-sans">
              Upload floor plans to map the sacred 360° Shakti Chakra and 16 MahaVastu directional zones. Calibrate true North, calculate Ayadi Shadvarga dimensions, and apply zero-demolition elemental remedies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveTab("problem_finder")}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Life Problem Finder</span>
            </button>
            <button
              onClick={() => setActiveTab("remedies_hub")}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Remedies Hub</span>
            </button>
            <button
              onClick={() => setIsEncyclopediaOpen(true)}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Print Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Feature Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-3 no-scrollbar text-xs font-semibold">
        {[
          { id: "problem_finder", label: "🔍 Life Problem & Defect Finder" },
          { id: "remedies_hub", label: "👑 Grandmaster Remedies Hub" },
          { id: "quick_audit", label: "⚡ 60s Quick Home Audit" },
          { id: "floor_plan_studio", label: "📐 Floor Plan CAD Studio" },
          { id: "zones_balancing", label: "⚖️ 16 Zones Balancing" },
          { id: "shakti_chakra", label: "☸️ 32 Padas Shakti Chakra" },
          { id: "commercial_vastu", label: "🏢 Commercial & Office Vastu" },
          { id: "geopathic_scanner", label: "🌐 Geopathic Stress Scanner" },
          { id: "plot_selection", label: "🏞️ Plot & Land Selection" },
          { id: "digital_compass", label: "🧭 Digital Compass Calibrator" },
          { id: "feng_shui", label: "🐉 Period 9 Feng Shui" },
          { id: "ayadi_calculator", label: "📏 Ayadi Perimeter Math" },
          { id: "room_guidelines", label: "🚪 Room Shastric Rules" }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as VastuTab)}
              className={`whitespace-nowrap px-3.5 py-2.5 rounded-xl transition-all cursor-pointer select-none flex items-center gap-1.5 ${
                isActive
                  ? "bg-slate-900 text-amber-300 font-bold shadow-md"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB: REVERSE LIFE PROBLEM & VASTU DEFECT FINDER */}
      {activeTab === "problem_finder" && (
        <VastuProblemFinderView onNavigateToFloorPlan={() => setActiveTab("floor_plan_studio")} />
      )}

      {/* TAB: GRANDMASTER REMEDIES COMPENDIUM HUB */}
      {activeTab === "remedies_hub" && <GrandmasterRemediesHub />}

      {/* TAB 0: QUICK 60-SECOND HOME AUDIT (EASY MODE) */}
      {activeTab === "quick_audit" && <QuickVastuAuditWizard />}

      {/* TAB 1: INTERACTIVE FLOOR PLAN CAD STUDIO */}
      {activeTab === "floor_plan_studio" && (
        <FloorPlanUploadStudio onOpenReportModal={() => setIsEncyclopediaOpen(true)} />
      )}

      {/* TAB 2: 16 MAHAVASTU ZONES BALANCING */}
      {activeTab === "zones_balancing" && <ZonesBalancingView />}

      {/* TAB 3: SHAKTI CHAKRA 32 PADAS & ENTRANCES */}
      {activeTab === "shakti_chakra" && <ShaktiChakraDeepDive />}

      {/* TAB 4: COMMERCIAL & INDUSTRIAL VASTU */}
      {activeTab === "commercial_vastu" && <CommercialVastuSuite />}

      {/* TAB 5: GEOPATHIC STRESS & EARTH ENERGY SCANNER */}
      {activeTab === "geopathic_scanner" && <GeopathicStressScanner />}

      {/* TAB 6: PLOT & LAND SELECTION BHOOMI PARIKSHA */}
      {activeTab === "plot_selection" && <PlotSelectionAnalyzer />}

      {/* TAB 7: DIGITAL COMPASS & AZIMUTH CALIBRATOR */}
      {activeTab === "digital_compass" && <DigitalCompassCalibrator />}

      {/* TAB 8: FENG SHUI PERIOD 9 & BAGUA SUITE */}
      {activeTab === "feng_shui" && <FengShuiStudioView />}

      {/* TAB 9: AYADI SHADVARGA PERIMETER CALCULATOR */}
      {activeTab === "ayadi_calculator" && <AyadiCalculatorView />}

      {/* TAB 10: ROOM-BY-ROOM SHASTRIC GUIDELINES */}
      {activeTab === "room_guidelines" && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                Classical Room Placement Matrix (Vastu Vidya)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Exhaustive architectural rules and elemental alignments for modern residences and commercial suites
              </p>
            </div>
            <button
              onClick={() => setIsEncyclopediaOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              Remedy Reference
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ROOM_GUIDELINES.map((rg, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                    <Home className="w-4 h-4 text-amber-600" />
                    <span>{rg.room}</span>
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] text-emerald-800 font-bold block">
                      Auspicious Directions
                    </span>
                    <strong className="text-emerald-950 text-xs">{rg.idealDirection}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                    <span className="text-[10px] text-rose-800 font-bold block">
                      Inauspicious / Prohibited
                    </span>
                    <strong className="text-rose-950 text-xs">{rg.forbiddenDirection}</strong>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Shastric Rules:</strong> {rg.tips}
                </p>

                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
                  <strong className="text-amber-900 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Zero-Demolition Remedy:
                  </strong>
                  <p className="text-[11px] leading-relaxed">{rg.remedy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Non-Destructive Remedial Encyclopedia & Consultation Dossier Modal */}
      <RemedialEncyclopediaModal
        isOpen={isEncyclopediaOpen}
        onClose={() => setIsEncyclopediaOpen(false)}
      />
    </div>
  );
};

