import React, { useState } from "react";
import { FaceReadingReport } from "../../types/facereading";
import { FaceInteractiveCanvas } from "./FaceInteractiveCanvas";
import { 
  Sparkles, 
  User, 
  Flame, 
  Droplets, 
  Wind, 
  Mountain, 
  Printer, 
  Compass, 
  ShieldCheck, 
  Layers, 
  Award,
  CircleDot,
  CheckCircle2,
  Calendar
} from "lucide-react";

interface FaceReadingReportViewProps {
  report: FaceReadingReport;
  onReset?: () => void;
}

export const FaceReadingReportView: React.FC<FaceReadingReportViewProps> = ({
  report,
  onReset
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 print:space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1C1A17] via-[#28241F] to-[#1C1A17] rounded-3xl p-6 sm:p-8 border border-amber-500/30 text-amber-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Mukha Samudrika & Mian Xiang Synthesis Report
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
              {report.seekerName ? `${report.seekerName}'s` : "Comprehensive"} Face Reading Analysis
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/80 max-w-2xl">
              Mapping the Three Zones (San Ting), Five Elements (Wu Xing), Twelve Palaces (Shi Er Gong), and individual facial landmarks through classical physiognomy.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 print:hidden">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            {onReset && (
              <button
                onClick={onReset}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <User className="w-4 h-4" />
                <span>New Face Scan</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Visual Face Inspector */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-600" />
          <h2 className="font-serif text-lg font-bold text-slate-900">
            Interactive Three Zones & Twelve Palaces Map
          </h2>
        </div>

        <FaceInteractiveCanvas
          imageUrl={report.annotatedImageUrl}
        />
      </div>

      {/* SECTION 1: Face Shape & Overall Temperament */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-lg space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                Physiognomy Contour
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                {report.faceShapeSection.temperamentTitle}
              </h3>
            </div>
          </div>

          <div className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
            Primary Shape: {report.faceShapeSection.primaryShape}
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          {report.faceShapeSection.narrative}
        </p>
      </div>

      {/* SECTION 2: Three Zones (San Ting) Life-Period Proportions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-lg space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            2
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
              San Ting Architecture
            </span>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              The Three Zones (San Ting) & Epoch Proportions
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {report.sanTingSection.balanceOverview}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Upper Zone */}
          <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900">Upper Zone (Heaven)</span>
              <span className="text-[10px] font-mono text-blue-700 bg-blue-200/60 px-2 py-0.5 rounded-full">
                {Math.round(report.sanTingSection.upper.proportionsRatio * 100)}%
              </span>
            </div>
            <div className="text-[11px] text-blue-800 font-semibold">{report.sanTingSection.upper.ageSpan}</div>
            <p className="text-xs text-slate-600 leading-relaxed">{report.sanTingSection.upper.assessment}</p>
          </div>

          {/* Middle Zone */}
          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900">Middle Zone (Human)</span>
              <span className="text-[10px] font-mono text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded-full">
                {Math.round(report.sanTingSection.middle.proportionsRatio * 100)}%
              </span>
            </div>
            <div className="text-[11px] text-amber-800 font-semibold">{report.sanTingSection.middle.ageSpan}</div>
            <p className="text-xs text-slate-600 leading-relaxed">{report.sanTingSection.middle.assessment}</p>
          </div>

          {/* Lower Zone */}
          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900">Lower Zone (Earth)</span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-200/60 px-2 py-0.5 rounded-full">
                {Math.round(report.sanTingSection.lower.proportionsRatio * 100)}%
              </span>
            </div>
            <div className="text-[11px] text-emerald-800 font-semibold">{report.sanTingSection.lower.ageSpan}</div>
            <p className="text-xs text-slate-600 leading-relaxed">{report.sanTingSection.lower.assessment}</p>
          </div>
        </div>

        <div className="p-3.5 bg-slate-900 text-amber-200 rounded-2xl text-xs font-bold flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Prime Life Epoch: {report.sanTingSection.peakPhase}</span>
        </div>
      </div>

      {/* SECTION 3: Feature-by-Feature Walking Narrative */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-lg space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            3
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
              Landmark Micro-Analysis
            </span>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Feature-by-Feature Walking Narrative
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-900 block">1. Forehead (Wisdom & Vision)</span>
            <p className="text-xs text-slate-600 leading-relaxed">{report.featureNarrativeSection.foreheadAndWisdom}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-900 block">2. Eyebrows (Willpower & Drive)</span>
            <p className="text-xs text-slate-600 leading-relaxed">{report.featureNarrativeSection.eyebrowsAndWillpower}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-900 block">3. Eyes & Vital Gaze ('Shen')</span>
            <p className="text-xs text-slate-600 leading-relaxed">{report.featureNarrativeSection.eyesAndEmotionalSpirit}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-900 block">4. Nose (Wealth & Central Pillar)</span>
            <p className="text-xs text-slate-600 leading-relaxed">{report.featureNarrativeSection.noseAndWealthCareer}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-900 block">5. Mouth & Lips (Eloquence & Warmth)</span>
            <p className="text-xs text-slate-600 leading-relaxed">{report.featureNarrativeSection.mouthAndExpression}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-900 block">6. Chin & Jawline (Endurance & Legacy)</span>
            <p className="text-xs text-slate-600 leading-relaxed">{report.featureNarrativeSection.chinJawAndLegacy}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-900 block">7. Ears (Ancestral Grace & Vitality)</span>
            <p className="text-xs text-slate-600 leading-relaxed">{report.featureNarrativeSection.earsAndAncestralGrace}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-900 block">8. Cheeks & Philtrum (Authority)</span>
            <p className="text-xs text-slate-600 leading-relaxed">{report.featureNarrativeSection.cheeksAndAuthority}</p>
          </div>
        </div>
      </div>

      {/* SECTION 4: Five Element (Wu Xing) Face Typing */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-lg space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                Wu Xing Elemental Archetype
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                {report.wuXingSection.dominantElement} Element Face Archetype
              </h3>
            </div>
          </div>

          <div className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-900 border border-amber-400/40 text-xs font-bold">
            Dominant: {report.wuXingSection.dominantElement}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {report.wuXingSection.temperamentProfile}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">Harmonic Strengths</span>
            <ul className="space-y-1 text-xs text-slate-700">
              {report.wuXingSection.harmonyStrengths.map((str, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100 space-y-2">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">Growth Opportunities</span>
            <ul className="space-y-1 text-xs text-slate-700">
              {report.wuXingSection.growthOpportunities.map((g, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 5: Twelve Palaces (Shi Er Gong) Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-lg space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            5
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
              Shi Er Gong System
            </span>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              The Twelve Palaces of Destiny
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {report.twelvePalacesSection.map((palace) => (
            <div key={palace.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{palace.palaceName}</span>
                <span className="text-[10px] font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                  {palace.chineseName}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">{palace.location}</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">{palace.reading}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6: Holistic Remedies & Harmonizing Practices */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-lg space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
            6
          </div>
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Harmonizing Guidance & Daily Wellness
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {report.remedies.map((remedy, idx) => (
            <div key={idx} className="p-3.5 bg-amber-50/50 rounded-2xl border border-amber-100 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <span>{remedy}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 7: Fixed Marks & Facial Moles (Mian Xiang Palace Integration) */}
      {report.fixedMarksSection && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-lg space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
              7
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                Mian Xiang Fixed Layer
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Facial Moles, Scars & Skin Signs
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            In classical Chinese face reading, moles and marks are read according to the Palace or Zone they occupy, adding a layer of focused intensity or life lessons to that specific domain.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {report.fixedMarksSection.moles.map((mole, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="capitalize">Mole on {mole.location}</span>
                  <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md font-mono">
                    {mole.palace || "Twelve Palaces"}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{mole.interpretation}</p>
              </div>
            ))}

            {report.fixedMarksSection.scars.map((scar, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Scar in {scar.zone} Zone</span>
                  <span className="text-[10px] text-slate-700 bg-slate-200 px-2 py-0.5 rounded-md font-mono">
                    Life Event Sign
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{scar.interpretation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 8: Deterministic Closing Holistic Synthesis */}
      {report.closingSynthesis && (
        <div className="bg-gradient-to-r from-[#1A1613] via-[#241E19] to-[#1A1613] text-amber-100 rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-5">
          <div className="flex items-center gap-3 border-b border-amber-500/20 pb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold text-xs">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Unified Synthesis
              </span>
              <h3 className="font-serif text-lg font-bold text-amber-100">
                Final Conclusion & Trait Cluster Equilibrium
              </h3>
            </div>
          </div>

          {/* Synthesis Narrative */}
          <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
            {report.closingSynthesis.narrative}
          </p>

          {/* Converging Signals Badges */}
          <div className="space-y-2 pt-1">
            <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              Converging Physiognomy Signals:
            </div>
            <div className="flex flex-wrap gap-2">
              {report.closingSynthesis.convergingSignals.map((signal, idx) => (
                <span key={idx} className="bg-amber-500/10 text-amber-200 text-[11px] px-3 py-1 rounded-xl border border-amber-500/20 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>{signal}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Compounding Notes */}
          {report.closingSynthesis.compoundingNotes.length > 0 && (
            <div className="p-3.5 bg-amber-950/40 rounded-2xl border border-amber-500/30 text-xs text-amber-200/90 space-y-1">
              <span className="font-bold text-amber-300 block">Compounding Signatures Detected:</span>
              {report.closingSynthesis.compoundingNotes.map((note, idx) => (
                <p key={idx} className="text-[11px] leading-relaxed">{note}</p>
              ))}
            </div>
          )}

          {/* Dynamic Nuance / Conflict Note */}
          {report.closingSynthesis.conflictNote && (
            <div className="p-3.5 bg-slate-900/60 rounded-2xl border border-amber-500/20 text-xs text-amber-200/80 space-y-1">
              <span className="font-bold text-amber-300 block">Structural Balance Note:</span>
              <p className="text-[11px] leading-relaxed">{report.closingSynthesis.conflictNote}</p>
            </div>
          )}
        </div>
      )}

      {/* Mandatory Disclaimer Footer (§11) */}
      <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-xs leading-relaxed flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800 block mb-0.5">Standard Cultural & Non-Medical Disclaimer</span>
          {report.disclaimer}
        </div>
      </div>
    </div>
  );
};
