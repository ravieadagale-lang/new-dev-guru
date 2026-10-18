import React, { useState } from "react";
import { PalmistryReport } from "../types/palmistry";
import { FaceReadingReport } from "../types/facereading";
import { PalmInteractiveCanvas } from "./palmistry/PalmInteractiveCanvas";
import { FaceInteractiveCanvas } from "./facereading/FaceInteractiveCanvas";
import { 
  Sparkles, 
  Hand, 
  User, 
  Printer, 
  ArrowLeftRight, 
  Columns, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Award,
  CircleDot,
  CheckCircle2,
  RefreshCw,
  Flame,
  Droplets,
  Wind,
  Mountain,
  FileText
} from "lucide-react";

interface SplitReadingViewProps {
  palmReport: PalmistryReport | null;
  faceReport: FaceReadingReport | null;
  onOpenPalmScan?: () => void;
  onOpenFaceScan?: () => void;
  onResetAll?: () => void;
}

export const SplitReadingView: React.FC<SplitReadingViewProps> = ({
  palmReport,
  faceReport,
  onOpenPalmScan,
  onOpenFaceScan,
  onResetAll
}) => {
  const [activeSyncCategory, setActiveSyncCategory] = useState<"summary" | "elements" | "career" | "temperament">("summary");
  const [syncScroll, setSyncScroll] = useState<boolean>(true);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#1C1815] via-[#2D241D] to-[#1C1815] rounded-3xl p-6 sm:p-8 border border-amber-500/30 text-amber-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Columns className="w-3.5 h-3.5 text-amber-400" />
              Dual-Pane Holistic Synthesis (Hast Rekha & Mian Xiang)
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
              Split Reading: Palmistry & Face Physiognomy
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/80 max-w-3xl">
              Compare your hand lines and mounts side-by-side with your facial Three Zones (San Ting) and Twelve Palaces to discover reinforcing karmic patterns and constitutional alignments.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 print:hidden">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Split Report</span>
            </button>
            {onResetAll && (
              <button
                onClick={onResetAll}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>New Scans</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Holistic Cross-Modal Synthesis Card */}
      {(palmReport || faceReport) && (
        <div className="bg-gradient-to-br from-amber-50 via-orange-50/40 to-amber-50/80 p-5 sm:p-6 rounded-3xl border border-amber-300/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-serif text-sm font-bold text-amber-950">
              <Sparkles className="w-4.5 h-4.5 text-amber-700 animate-pulse" />
              <span>Integrated Constitutional Concordance</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-200/60 px-2.5 py-0.5 rounded-full border border-amber-300">
              Cross-Modal Alignment
            </span>
          </div>

          <p className="text-xs text-amber-950/85 leading-relaxed">
            {palmReport && faceReport ? (
              <>
                <strong>Harmonized Synthesis:</strong> Your palm structure ({palmReport.cheirognomySummary?.primaryType || "Balanced"} hand with {(palmReport.dominantHand || "right").toUpperCase()} hand active drive) reinforces your facial constitution ({faceReport.faceShapeSection?.primaryShape || "Harmonious"} structure with peak {faceReport.sanTingSection?.peakPhase || "Midlife"} phase). The combination indicates high mental stamina, strategic foresight, and grounded pragmatism when executing long-range goals.
              </>
            ) : palmReport ? (
              <>
                <strong>Palm Active:</strong> {palmReport.cheirognomySummary?.primaryType || "Analyzed"} hand architecture recorded. Connect your Facial Reading on the right pane to reveal full-spectrum cross-modal alignment.
              </>
            ) : (
              <>
                <strong>Face Active:</strong> {faceReport?.faceShapeSection?.primaryShape || "Analyzed"} facial constitution recorded. Connect your Palm Reading on the left pane to reveal full-spectrum cross-modal alignment.
              </>
            )}
          </p>
        </div>
      )}

      {/* Side-by-Side Dual Pane Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* LEFT PANE: PALMISTRY READING */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-amber-900/15 shadow-md space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Hand className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-slate-900">
                  Hast Rekha (Palmistry)
                </h3>
                <span className="text-[10px] text-slate-500">Innate & Active Karma</span>
              </div>
            </div>

            {palmReport ? (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Active ({palmReport.seekerName || "Seeker"})
              </span>
            ) : (
              <button
                onClick={onOpenPalmScan}
                className="text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Hand className="w-3.5 h-3.5" />
                Scan Palms
              </button>
            )}
          </div>

          {palmReport ? (
            <div className="space-y-4 text-xs">
              {/* Interactive Canvas Mini */}
              <div className="space-y-1">
                <span className="font-bold text-slate-700 text-[11px] block">
                  Interactive Palm Blueprint:
                </span>
                <PalmInteractiveCanvas
                  hand={palmReport.dominantHand === "left" ? "left" : "right"}
                  isDominant={true}
                  imageUrl={palmReport.annotatedImageUrl}
                />
              </div>

              {/* Hand Structure & Type */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                  Hand Archetype: {palmReport.cheirognomySummary?.primaryType || "Analyzed"}
                </span>
                <p className="text-slate-700 leading-relaxed text-xs">
                  {palmReport.cheirognomySummary?.narrative || "Hand structural analysis complete."}
                </p>
              </div>

              {/* Key Principal Lines */}
              <div className="space-y-2">
                <span className="font-bold text-slate-900 block text-xs">Principal Lines:</span>
                
                <div className="p-3 bg-red-50/50 rounded-xl border border-red-200 space-y-1">
                  <span className="font-bold text-red-900 text-xs">Life Line (Vitality & Resilience)</span>
                  <p className="text-slate-700 text-[11px]">{palmReport.vitalitySection?.narrative || palmReport.vitalitySection?.lineDescription || "Strong vitality patterns present."}</p>
                </div>

                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200 space-y-1">
                  <span className="font-bold text-blue-900 text-xs">Head Line (Intellect & Strategy)</span>
                  <p className="text-slate-700 text-[11px]">{palmReport.mindSection?.narrative || palmReport.mindSection?.thinkingStyle || "Sharp intellectual focus and clarity."}</p>
                </div>

                <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-200 space-y-1">
                  <span className="font-bold text-purple-900 text-xs">Heart Line (Emotional Landscape)</span>
                  <p className="text-slate-700 text-[11px]">{palmReport.heartSection?.narrative || palmReport.heartSection?.emotionalPattern || "Devoted and warm emotional depth."}</p>
                </div>
              </div>

              {/* Dual Hand Karmic Matrix */}
              {palmReport.dualHandComparison && (
                <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200 space-y-1.5">
                  <span className="font-bold text-amber-950 block text-xs">Karmic Evolution (Innate vs Active):</span>
                  <p className="text-amber-900 text-[11px] leading-relaxed">
                    {palmReport.dualHandComparison.overallTransformationThesis || palmReport.dualHandComparison.activeKarmaSummary || "Clear positive transformation from innate potential to current mastery."}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-2xl space-y-3 bg-slate-50/50">
              <Hand className="w-10 h-10 text-amber-600/50 mx-auto" />
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-xs">No Palmistry Report Loaded</h4>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  Scan your left and right palms to populate this pane for side-by-side comparative analysis.
                </p>
              </div>
              <button
                onClick={onOpenPalmScan}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <Hand className="w-3.5 h-3.5" />
                Launch Palm Scanner
              </button>
            </div>
          )}
        </div>

        {/* RIGHT PANE: FACE READING (MIAN XIANG) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-amber-900/15 shadow-md space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-slate-900">
                  Mukha Samudrika & Mian Xiang
                </h3>
                <span className="text-[10px] text-slate-500">Three Zones & Twelve Palaces</span>
              </div>
            </div>

            {faceReport ? (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Active ({faceReport.seekerName || "Seeker"})
              </span>
            ) : (
              <button
                onClick={onOpenFaceScan}
                className="text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                Scan Face
              </button>
            )}
          </div>

          {faceReport ? (
            <div className="space-y-4 text-xs">
              {/* Interactive Canvas Mini */}
              <div className="space-y-1">
                <span className="font-bold text-slate-700 text-[11px] block">
                  Interactive Facial Map:
                </span>
                <FaceInteractiveCanvas
                  imageUrl={faceReport.annotatedImageUrl}
                />
              </div>

              {/* Face Shape & Element */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md inline-block">
                  Face Shape: {faceReport.faceShapeSection?.primaryShape || "Balanced"} • {faceReport.wuXingSection?.dominantElement || "Metal"} Element
                </span>
                <p className="text-slate-700 leading-relaxed text-xs">
                  {faceReport.faceShapeSection?.narrative || "Harmonious facial constitutional balance."}
                </p>
              </div>

              {/* Three Zones (San Ting) */}
              {faceReport.sanTingSection && (
                <div className="space-y-2">
                  <span className="font-bold text-slate-900 block text-xs">The Three Zones (San Ting):</span>
                  
                  <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200 space-y-1">
                    <span className="font-bold text-amber-900 text-xs">Upper Zone (Heaven: Early Foundation)</span>
                    <p className="text-slate-700 text-[11px]">{faceReport.sanTingSection.upper?.assessment || "Strong mental focus and early learning capacity."}</p>
                  </div>

                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-900 text-xs">Middle Zone (Human: Midlife Drive & Wealth)</span>
                    <p className="text-slate-700 text-[11px]">{faceReport.sanTingSection.middle?.assessment || "High executive capability and self-reliance."}</p>
                  </div>

                  <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-200 space-y-1">
                    <span className="font-bold text-indigo-900 text-xs">Lower Zone (Earth: Maturity & Legacy)</span>
                    <p className="text-slate-700 text-[11px]">{faceReport.sanTingSection.lower?.assessment || "Grounded endurance and long-term security."}</p>
                  </div>
                </div>
              )}

              {/* Primary Palace Highlights */}
              {faceReport.twelvePalacesSection && faceReport.twelvePalacesSection.length > 0 && (
                <div className="bg-purple-50/60 p-3.5 rounded-2xl border border-purple-200 space-y-1.5">
                  <span className="font-bold text-purple-950 block text-xs">Key Palaces (Life & Wealth):</span>
                  <p className="text-purple-900 text-[11px] leading-relaxed">
                    {faceReport.twelvePalacesSection.find(p => p.id === "life")?.reading || faceReport.twelvePalacesSection[0]?.reading || "Balanced life and career trajectory."}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-2xl space-y-3 bg-slate-50/50">
              <User className="w-10 h-10 text-blue-600/50 mx-auto" />
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-xs">No Face Reading Report Loaded</h4>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  Scan your front and profile facial contours to populate this pane for side-by-side comparative analysis.
                </p>
              </div>
              <button
                onClick={onOpenFaceScan}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                Launch Face Scanner
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
