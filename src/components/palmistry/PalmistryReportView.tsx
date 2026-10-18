import React, { useState } from "react";
import { PalmistryReport } from "../../types/palmistry";
import { PalmInteractiveCanvas } from "./PalmInteractiveCanvas";
import { 
  Sparkles, 
  Hand, 
  Flame, 
  Droplets, 
  Wind, 
  Mountain, 
  Compass, 
  ShieldCheck, 
  Printer, 
  Share2, 
  Calendar, 
  ArrowRight, 
  Layers, 
  Star, 
  Award,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from "lucide-react";

interface PalmistryReportViewProps {
  report: PalmistryReport;
  onReset?: () => void;
}

export const PalmistryReportView: React.FC<PalmistryReportViewProps> = ({
  report,
  onReset
}) => {
  const [activeHandTab, setActiveHandTab] = useState<"right" | "left">(report.dominantHand);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    cheirognomy: true,
    vitality: true,
    mind: true,
    heart: true,
    career: true,
    mounts: true,
    dualHand: true,
    markings: true,
    ageTimeline: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const currentFeatures = activeHandTab === "right" ? report.rightHandFeatures : report.leftHandFeatures;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 print:space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1E1916] via-[#2A221C] to-[#1E1916] rounded-3xl p-6 sm:p-8 border border-amber-500/30 text-amber-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Cheirognomy & Chiromancy Synthesis Report
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
              {report.seekerName ? `${report.seekerName}'s` : "Comprehensive"} Palmistry Reading
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/80 max-w-2xl">
              Synthesizing inborn architectural potential (Left Hand) with lived active karma (Right Hand) across 7 classical hand types, 3 principal lines, secondary mounts, and sacred markings.
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
                <Hand className="w-4 h-4" />
                <span>New Reading</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Visual Palm Inspector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-600" />
            <h2 className="font-serif text-lg font-bold text-slate-900">
              Interactive Landmark & Line Overlay
            </h2>
          </div>

          <div className="flex bg-slate-200 p-1 rounded-xl">
            <button
              onClick={() => setActiveHandTab("right")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeHandTab === "right" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Right Hand (Active) {report.dominantHand === "right" && "★"}
            </button>
            <button
              onClick={() => setActiveHandTab("left")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeHandTab === "left" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Left Hand (Innate) {report.dominantHand === "left" && "★"}
            </button>
          </div>
        </div>

        <PalmInteractiveCanvas
          hand={activeHandTab}
          isDominant={activeHandTab === report.dominantHand}
          imageUrl={report.annotatedImageUrl}
        />
      </div>

      {/* SECTION 1: Cheirognomy (Hand Type & Temperament) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-lg space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                Cheirognomy Layer
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                {report.cheirognomySummary.temperamentTitle}
              </h3>
            </div>
          </div>

          <div className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
            Primary Archetype: {report.cheirognomySummary.primaryType}
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          {report.cheirognomySummary.narrative}
        </p>

        {/* Elemental Tattva Balance */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Elemental Tattva Distribution
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-100 flex items-center gap-3">
              <Flame className="w-5 h-5 text-amber-600" />
              <div>
                <div className="text-[11px] text-slate-500">Fire (Tejas)</div>
                <div className="font-bold text-slate-900 text-sm">{report.cheirognomySummary.elementalBalance.fire}%</div>
              </div>
            </div>
            <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-100 flex items-center gap-3">
              <Droplets className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-[11px] text-slate-500">Water (Jala)</div>
                <div className="font-bold text-slate-900 text-sm">{report.cheirognomySummary.elementalBalance.water}%</div>
              </div>
            </div>
            <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex items-center gap-3">
              <Mountain className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="text-[11px] text-slate-500">Earth (Prithvi)</div>
                <div className="font-bold text-slate-900 text-sm">{report.cheirognomySummary.elementalBalance.earth}%</div>
              </div>
            </div>
            <div className="p-3 bg-indigo-50/70 rounded-2xl border border-indigo-100 flex items-center gap-3">
              <Wind className="w-5 h-5 text-indigo-600" />
              <div>
                <div className="text-[11px] text-slate-500">Air (Vayu)</div>
                <div className="font-bold text-slate-900 text-sm">{report.cheirognomySummary.elementalBalance.air}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Finger & Thumb Micro-Analysis */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Finger & Thumb Structural Nuances
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {report.cheirognomySummary.fingerThumbInsights.map((insight, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2, 3, 4: The Three Principal Lines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 2. Vitality & Life Line */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-700">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h4 className="font-serif font-bold text-base text-slate-900">
                Vitality & Energy (Life Line)
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {report.vitalitySection.narrative}
            </p>
          </div>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-[11px] text-emerald-900 font-medium">
            💡 {report.vitalitySection.resilienceNote}
          </div>
        </div>

        {/* 3. Mind & Head Line */}
        <div className="bg-white rounded-3xl p-6 border border-blue-900/10 shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-700">
              <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h4 className="font-serif font-bold text-base text-slate-900">
                Mind & Intellect (Head Line)
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {report.mindSection.narrative}
            </p>
          </div>

          <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 text-[11px] text-blue-900 font-medium">
            🎯 Decision Mode: {report.mindSection.decisionMakingStyle}
          </div>
        </div>

        {/* 4. Heart Line */}
        <div className="bg-white rounded-3xl p-6 border border-pink-900/10 shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-pink-700">
              <div className="w-8 h-8 rounded-xl bg-pink-100 flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h4 className="font-serif font-bold text-base text-slate-900">
                Heart & Devotion (Heart Line)
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {report.heartSection.narrative}
            </p>
          </div>

          <div className="p-3 bg-pink-50 rounded-2xl border border-pink-100 text-[11px] text-pink-900 font-medium">
            💖 Intimacy Harmony: {report.heartSection.intimacyStyle}
          </div>
        </div>
      </div>

      {/* SECTION 5 & 6: Career, Purpose & Dominant Mounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Career & Vocational Purpose */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-lg space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
              5
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                Secondary Lines
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Career, Public Acclaim & Commercial Eloquence
              </h3>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Fate Line (Saturn Axis):</span>
              {report.careerSection.careerTrajectory}
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Sun Line (Apollo Radiance):</span>
              {report.careerSection.publicRecognitionPotential}
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Mercury Line (Commercial Intellect):</span>
              {report.careerSection.businessAndCommunication}
            </div>
          </div>
        </div>

        {/* 6. Dominant Mounts */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-lg space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs">
              6
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider">
                Planetary Mounts
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Leading Energetic Driving Forces
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {report.dominantMountsSection.synergyNarrative}
          </p>

          <div className="space-y-2.5 pt-1">
            {report.dominantMountsSection.leadingMounts.map((m, idx) => (
              <div key={idx} className="p-3 bg-indigo-50/60 rounded-2xl border border-indigo-100 text-xs">
                <div className="flex items-center justify-between font-bold text-indigo-950 mb-0.5">
                  <span>{m.mountName}</span>
                  <span className="text-[10px] uppercase bg-indigo-200/60 px-2 py-0.5 rounded-full text-indigo-900">
                    {m.rating} Elevation
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">{m.interpretation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 7: Left vs Right Dual-Hand Transformation */}
      <div className="bg-gradient-to-r from-amber-50/80 via-orange-50/50 to-amber-50/80 rounded-3xl p-6 sm:p-8 border border-amber-300 shadow-md space-y-6">
        <div className="flex items-center gap-3 border-b border-amber-200/80 pb-3">
          <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
            7
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
              Dual-Hand Evolution Matrix
            </span>
            <h3 className="font-serif text-lg font-bold text-amber-950">
              Inborn Blueprint (Left) vs Lived Active Karma (Right)
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
          {report.dualHandComparison.overallTransformationThesis}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/80 rounded-2xl border border-amber-200/60 space-y-1">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Left Hand (Innate Potential)</span>
            <p className="text-xs text-slate-700">{report.dualHandComparison.inheritedBlueprintSummary}</p>
          </div>
          <div className="p-4 bg-white/80 rounded-2xl border border-amber-200/60 space-y-1">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Right Hand (Active Karma)</span>
            <p className="text-xs text-slate-700">{report.dualHandComparison.activeKarmaSummary}</p>
          </div>
        </div>

        {/* Diff Table */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-amber-950 uppercase tracking-wider">
            Key Structural Transformations
          </div>
          <div className="space-y-2">
            {report.dualHandComparison.evolutionDiffs.map((diff, idx) => (
              <div key={idx} className="p-3.5 bg-white rounded-2xl border border-amber-200 shadow-sm text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{diff.featureName}</span>
                  <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                    {diff.significanceLevel} significance
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{diff.interpretation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 8 & 9: Special Markings & Age Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 8. Key Markings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-lg space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
              8
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Sacred Markings & Auspicious Glyphs
            </h3>
          </div>

          <div className="space-y-3">
            {report.keyMarkings.map((mark, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="capitalize">{mark.type} on {mark.location} Mount/Line</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    mark.favorable ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {mark.favorable ? "Auspicious" : "Karmic Lesson"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">{mark.significance}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 9. Age Timeline Milestones */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-lg space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
              9
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Age Epochs & Timeline Flow
            </h3>
          </div>

          <div className="space-y-2.5">
            {report.ageMilestones.map((milestone, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex items-start gap-3">
                <div className="px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-900 font-bold font-mono text-[11px] shrink-0">
                  {milestone.decade}
                </div>
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 text-xs">{milestone.energyTrend}</div>
                  <div className="text-[11px] text-slate-600">{milestone.opportunityOrLesson}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 10: Holistic Remedies & Nuances */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-lg space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
            10
          </div>
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Harmonizing Guidance & Holistic Practices
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

      {/* SECTION 11: Fixed Marks (Moles, Scars & Skin Marks) */}
      {report.fixedMarksSection && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-lg space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
              11
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                Classical Fixed Layer
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Moles, Scars & Topographical Skin Marks
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            In Samudrika Shastra and classical Western palmistry, moles and scars are evaluated as fixed, standalone markers that intensify or challenge the underlying theme of the mount or line they occupy.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {report.fixedMarksSection.moles.map((mole, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="capitalize">Mole at {mole.location}</span>
                  <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md font-mono capitalize">
                    {mole.color || "dark"} quality
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{mole.interpretation}</p>
              </div>
            ))}

            {report.fixedMarksSection.scars.map((scar, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="capitalize">Scar on {scar.location}</span>
                  <span className="text-[10px] text-slate-700 bg-slate-200 px-2 py-0.5 rounded-md font-mono">
                    External Mark
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{scar.interpretation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 12: Deterministic Closing Holistic Synthesis */}
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
              Converging Architectural Signals:
            </div>
            <div className="flex flex-wrap gap-2">
              {report.closingSynthesis.convergingSignals.map((signal, idx) => (
                <span key={idx} className="bg-amber-500/10 text-amber-200 text-[11px] px-3 py-1 rounded-xl border border-amber-500/20 flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-amber-400 shrink-0" />
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
              <span className="font-bold text-amber-300 block">Dynamic Tension Handled:</span>
              <p className="text-[11px] leading-relaxed">{report.closingSynthesis.conflictNote}</p>
            </div>
          )}
        </div>
      )}

      {/* Mandatory Disclaimer Footer (§8) */}
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
