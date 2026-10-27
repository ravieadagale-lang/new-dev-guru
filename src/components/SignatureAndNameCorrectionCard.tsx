// src/components/SignatureAndNameCorrectionCard.tsx

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  PenTool,
  CheckCircle2,
  AlertTriangle,
  Feather,
  Compass,
  Clock,
  ShieldCheck,
  Check,
  X,
  HelpCircle,
  Lightbulb,
  Copy
} from "lucide-react";
import {
  generateCompleteCorrectionPlan,
  CompleteCorrectionPlan
} from "../utils/numerologyNameCorrectionEngine";

interface SignatureAndNameCorrectionCardProps {
  fullName?: string;
  signatureName?: string;
  nickname?: string;
  driver?: number;
  conductor?: number;
}

export const SignatureAndNameCorrectionCard: React.FC<SignatureAndNameCorrectionCardProps> = ({
  fullName = "Aarav Sharma",
  signatureName = "Aarav K. Sharma",
  nickname = "",
  driver = 1,
  conductor = 1
}) => {
  const [copiedSpelling, setCopiedSpelling] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const safeDriver = Number.isInteger(driver) && driver >= 1 && driver <= 9 ? driver : 1;
  const safeConductor = Number.isInteger(conductor) && conductor >= 1 && conductor <= 9 ? conductor : 1;

  const plan: CompleteCorrectionPlan = useMemo(() => {
    return generateCompleteCorrectionPlan(fullName, signatureName, nickname, safeDriver, safeConductor);
  }, [fullName, signatureName, nickname, safeDriver, safeConductor]);

  const handleCopySuggestion = async (spelling: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(spelling);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = spelling;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedSpelling(spelling);
      setToastMessage(`Recommended spelling "${spelling}" copied to clipboard!`);
      setTimeout(() => {
        setCopiedSpelling((prev) => (prev === spelling ? null : prev));
      }, 3000);
      setTimeout(() => {
        setToastMessage(null);
      }, 3500);
    } catch (err) {
      console.error("Clipboard write error:", err);
      setCopiedSpelling(spelling);
      setToastMessage(`Copied "${spelling}"`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-5 md:p-7 space-y-6 shadow-2xl mt-6">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 mt-1">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg md:text-xl font-serif font-bold text-amber-200">
                81 Combination Matrix Name, Signature & Nickname Suggestions
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Matrix {plan.combination81Code}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Calculated spelling calibration strictly filtered for root numbers{" "}
              <strong className="text-amber-300">1, 3, 5, 6</strong> with zero Anty/Enemy conflict
              against Driver ({driver}) & Conductor ({conductor}).
            </p>
          </div>
        </div>

        {/* STATUS BADGE */}
        <div>
          {plan.currentStatus === "Forbidden" || plan.currentStatus === "Challenging" ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-800/80">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              Correction Recommended
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Harmonious Alignment
            </span>
          )}
        </div>
      </div>

      {/* MATRIX AUDIT & ANTY NUMBER WARNING */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* CURRENT NAME AUDIT */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-mono">Current Name Evaluated:</span>
            <span className="font-serif font-bold text-slate-200 text-sm">
              "{plan.currentName}"
            </span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <div className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800 text-[11px]">
              Chaldean Compound:{" "}
              <span className="text-amber-300 font-mono font-bold">
                {plan.currentCompound}
              </span>
            </div>
            <div className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800 text-[11px]">
              Single Root:{" "}
              <span
                className={`font-mono font-bold ${
                  plan.currentSingle === 2 ||
                  plan.currentSingle === 4 ||
                  plan.currentSingle === 7 ||
                  plan.currentSingle === 8 ||
                  plan.currentSingle === 9
                    ? "text-rose-400"
                    : "text-emerald-400"
                }`}
              >
                {plan.currentSingle}
              </span>
            </div>
          </div>

          {plan.currentIssues.length > 0 ? (
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              {plan.currentIssues.map((issue, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-rose-300 text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-400 mt-0.5" />
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-emerald-300 text-[11px] flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Current name already aligns with auspicious root vibrations.
            </div>
          )}
        </div>

        {/* 81 MATRIX FILTER PROTOCOL */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
          <span className="text-amber-300 font-mono font-bold uppercase tracking-wider block">
            81 Matrix Anty-Number Safety Rules
          </span>
          <ul className="space-y-1.5 text-slate-300 text-[11px]">
            <li className="flex items-start gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-100">Allowed Name Totals:</strong> Strictly{" "}
                <span className="text-amber-300 font-mono font-bold">1, 3, 5, 6</span> only.
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-100">Forbidden Totals:</strong>{" "}
                <span className="text-rose-300 font-mono font-bold">2, 4, 7, 8, 9</span> are
                completely excluded (preventing struggles, sudden losses, and delays).
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-100">Anty / Enemy Checks:</strong> 8 and 1 are
                arch-enemies; 4 and 8 gives intense life struggles; 3 and 6 clash as opposing
                preceptors. Your suggestions are filtered to eliminate all such conflicts.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* SECTION 1: NAME SUGGESTIONS WITH CALCULATED SPELLINGS */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 font-mono">
            1. Recommended Calculated Name Spellings
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plan.nameSuggestions.map((sug, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                idx === 0
                  ? "bg-amber-950/20 border-amber-500/40 shadow-lg"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                    Option {idx + 1} {idx === 0 && "• (Prime Alignment)"}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/80">
                    Root {sug.root} • {sug.ruler}
                  </span>
                </div>

                <div>
                  <span className="text-base font-serif font-bold text-white block">
                    "{sug.spelling}"
                  </span>
                  <span className="text-[11px] text-amber-400 font-mono block">
                    Compound {sug.compound} — {sug.compoundTitle}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {sug.changeDescription}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <div className="text-[11px] text-slate-400">
                  <strong className="text-slate-300">Why this works: </strong>
                  {sug.rationale}
                </div>

                <button
                  type="button"
                  onClick={() => handleCopySuggestion(sug.spelling)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                    copiedSpelling === sug.spelling
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm"
                      : "bg-slate-950/80 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 border-amber-500/30 hover:border-amber-500/60"
                  }`}
                  title="Copy this recommended spelling to clipboard"
                >
                  {copiedSpelling === sug.spelling ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Copy Suggestion</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: SIGNATURE SUGGESTION & GEOMETRY BLUEPRINT */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <PenTool className="w-4 h-4 text-purple-400" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-purple-300 font-mono">
            2. Harmonic Signature Suggestion & Stroke Blueprint
          </h4>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
          {/* SIGNATURE VISUAL SPECIMEN */}
          <div className="flex flex-col justify-between space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                Recommended Signature Visual Flow
              </span>
              <div className="mt-4 p-4 rounded-lg bg-slate-900 border border-purple-500/30 text-center relative overflow-hidden">
                <div className="font-serif italic text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-indigo-200 transform -rotate-3 tracking-wide">
                  {plan.signatureSuggestion.suggestedSignatureText}
                </div>
                {/* Visual underline with 2 dots */}
                <div className="mt-2 flex items-center justify-center gap-2">
                  <div className="h-0.5 w-32 bg-gradient-to-r from-amber-400 to-purple-400 rounded-full" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  <strong>Angle:</strong> {plan.signatureSuggestion.baselineAngle}
                </span>
              </div>
            </div>
          </div>

          {/* STROKE ANATOMY */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-amber-400 font-mono font-bold block">
                  Opening Capital Letter:
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {plan.signatureSuggestion.openingStroke}
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-indigo-400 font-mono font-bold block">
                  Middle Flow Connectivity:
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {plan.signatureSuggestion.middleRhythm}
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-mono font-bold block">
                  Closing Terminal Flick:
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {plan.signatureSuggestion.closingStroke}
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-purple-400 font-mono font-bold block">
                  Underline & Stability Dots:
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {plan.signatureSuggestion.underlineRule}
                </p>
              </div>
            </div>

            {/* DO'S AND DON'TS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-emerald-950/20 border border-emerald-800/40 p-3 rounded-lg space-y-1">
                <span className="text-emerald-400 font-mono font-bold flex items-center gap-1 text-[11px]">
                  <Check className="w-3.5 h-3.5" /> Golden Signature Rules
                </span>
                <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
                  {plan.signatureSuggestion.dosAndDonts.dos.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-950/20 border border-rose-800/40 p-3 rounded-lg space-y-1">
                <span className="text-rose-400 font-mono font-bold flex items-center gap-1 text-[11px]">
                  <X className="w-3.5 h-3.5" /> Strict Taboos To Avoid
                </span>
                <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
                  {plan.signatureSuggestion.dosAndDonts.donts.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: NICKNAME & PET NAME SUGGESTIONS */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <Feather className="w-4 h-4 text-pink-400" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-pink-300 font-mono">
            3. Harmonic Nickname & Calling Name Suggestions
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plan.nicknameSuggestions.map((nick, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-serif font-bold text-pink-200">
                    "{nick.nickname}"
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-pink-950 text-pink-300 border border-pink-800">
                    Root {nick.root} • {nick.ruler}
                  </span>
                </div>
                <div className="text-[11px] text-amber-400 font-mono">
                  Chaldean Compound: {nick.compound}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {nick.energyImpact}
                </p>
              </div>

              <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-800 italic">
                Daily vocal sound vibrations activate the throat (Vishuddha) chakra.
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: HOW TO USE & HOW TO ACTIVATE (41-DAY PROTOCOL) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-300 font-mono">
            4. How to Use & How to Activate (41-Day Energy Calibration)
          </h4>
        </div>

        <div className="bg-slate-900/70 p-5 rounded-xl border border-emerald-500/20 space-y-4">
          {/* SANKALPA PARAMETERS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px] font-mono">Consecration Period:</span>
              <span className="text-amber-300 font-bold font-mono">
                {plan.activationGuidance.sadhanaDays} Consecutive Days
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px] font-mono">Start Weekday:</span>
              <span className="text-emerald-300 font-bold font-mono">
                {plan.activationGuidance.idealWeekday}
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px] font-mono">Auspicious Ink:</span>
              <span className="text-indigo-300 font-bold text-[11px]">
                {plan.activationGuidance.inkColor}
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px] font-mono">Daily Writing Target:</span>
              <span className="text-pink-300 font-bold font-mono">
                {plan.activationGuidance.dailyRepetitions} Times Daily
              </span>
            </div>
          </div>

          {/* STEP-BY-STEP ACTIVATION STEPS */}
          <div className="space-y-3 pt-2">
            {plan.activationGuidance.activationSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/90 space-y-1"
              >
                <div className="text-xs font-bold text-amber-200 font-serif flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step.title}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-7">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FLOATING SUCCESS TOAST NOTIFICATION */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border border-amber-500/50 shadow-2xl px-5 py-3.5 rounded-2xl text-white transition-all transform animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-200 font-serif">Suggestion Copied!</div>
            <div className="text-xs text-slate-200 font-medium">{toastMessage}</div>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-3 text-slate-400 hover:text-white text-xs p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
export default SignatureAndNameCorrectionCard;
