// src/components/baby/SpellingOptimizerTool.tsx
// Real-time Name Spelling & Numerology Vibration Optimizer

import React, { useState, useEffect } from "react";
import { 
  Zap, 
  Sparkles, 
  Hash, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RefreshCw,
  Award,
  Layers,
  Heart
} from "lucide-react";
import { 
  BabyBirthInput, 
  AstroJanmaksharResult, 
  BabyNumerologyProfile, 
  NameCandidate 
} from "../../types/babyNameTypes";
import { 
  BabyNameVibrationEngine, 
  AUSPICIOUS_CHALDEAN_COMPOUNDS, 
  CAUTIONARY_CHALDEAN_COMPOUNDS 
} from "../../engine/babyNameVibrationEngine";
import { CHALDEAN_COMPOUND_MEANINGS } from "../../data/numerologyData";

interface SpellingOptimizerToolProps {
  initialName?: string;
  babyInput: BabyBirthInput;
  astro: AstroJanmaksharResult;
  numerology: BabyNumerologyProfile;
  onApplyName?: (name: string) => void;
  onToggleShortlist?: (candidate: NameCandidate) => void;
}

export const SpellingOptimizerTool: React.FC<SpellingOptimizerToolProps> = ({
  initialName = "Aarav",
  babyInput,
  astro,
  numerology,
  onApplyName,
  onToggleShortlist
}) => {
  const [testName, setTestName] = useState(initialName);
  const [testSurname, setTestSurname] = useState(babyInput.surname || "");

  useEffect(() => {
    if (initialName) {
      setTestName(initialName);
    }
  }, [initialName]);

  const candidate = BabyNameVibrationEngine.analyzeCustomName(
    testName,
    { ...babyInput, surname: testSurname },
    astro,
    numerology
  );

  const variations = BabyNameVibrationEngine.suggestSpellingVariations(
    testName,
    testSurname,
    numerology
  );

  return (
    <div className="bg-white rounded-3xl border border-amber-900/10 shadow-xs p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">
          Numerology Harmonic Sandbox
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
          Baby Name Spelling &amp; Vibration Optimizer
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Fine-tune the exact English spelling of any chosen name to align with sacred Chaldean compound vibrations (#19, #21, #23, #24, #27, #32, #41) and baby's birth numbers.
        </p>
      </div>

      {/* Input Sandbox */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Baby's First Name
          </label>
          <input
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            placeholder="Type any baby name..."
            className="w-full px-4 py-3 text-lg font-serif font-bold text-slate-900 rounded-2xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 shadow-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Family Surname / Last Name
          </label>
          <input
            type="text"
            value={testSurname}
            onChange={(e) => setTestSurname(e.target.value)}
            placeholder="e.g. Sharma / Patel"
            className="w-full px-4 py-3 text-lg font-serif font-bold text-slate-900 rounded-2xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 shadow-xs"
          />
        </div>
      </div>

      {/* Live Vibration Analysis Grid */}
      <div className="p-6 rounded-3xl bg-slate-900 text-slate-100 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs text-amber-300 font-mono uppercase tracking-wider">
              Evaluating Vibrational Resonance:
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">
              {testName || "—"} {testSurname}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">Composite Score</div>
              <div className="font-serif text-3xl font-black text-amber-400">
                {candidate.harmonicScore}%
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Chaldean First Name */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">First Name (Chaldean)</div>
            <div className="text-2xl font-serif font-black text-white">
              #{candidate.chaldeanCompound} <span className="text-sm font-normal text-purple-300">→ #{candidate.chaldeanSingle}</span>
            </div>
            <div className="text-xs text-purple-200">
              {candidate.isAuspiciousCompound ? "✨ Highly Auspicious" : "Balanced Frequency"}
            </div>
          </div>

          {/* Chaldean Full Name */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">Full Name with Surname</div>
            <div className="text-2xl font-serif font-black text-white">
              #{candidate.fullNameCompound} <span className="text-sm font-normal text-amber-300">→ #{candidate.fullNameSingle}</span>
            </div>
            <div className="text-xs text-amber-200 truncate">
              {AUSPICIOUS_CHALDEAN_COMPOUNDS.has(candidate.fullNameCompound) ? "✨ Sacred Compound" : "Harmonious"}
            </div>
          </div>

          {/* Driver Harmony */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Driver #{numerology.driverNumber} Sync</div>
            <div className="text-lg font-bold text-emerald-300">
              {candidate.driverHarmony === "Friendly" ? "🤝 Friendly Ally" : "Neutral Match"}
            </div>
            <div className="text-xs text-emerald-200">
              Governed by {numerology.driverRulingPlanet}
            </div>
          </div>

          {/* Pythagorean Expression */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-[10px] font-bold text-sky-300 uppercase tracking-wider">Pythagorean Grid</div>
            <div className="text-sm font-bold text-white">
              Expr: #{candidate.pythagoreanExpression} • Soul: #{candidate.soulUrgeNumber}
            </div>
            <div className="text-xs text-sky-200">
              Personality: #{candidate.personalityNumber}
            </div>
          </div>
        </div>

        {/* Deep Meaning of Compound */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20 text-xs text-amber-200/90 leading-relaxed">
          <strong className="text-amber-300">Sacred Compound #{candidate.chaldeanCompound}:</strong>{" "}
          {candidate.compoundDescription}
        </div>
      </div>

      {/* Recommended Spelling Variations & Tweaks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-serif font-bold text-lg text-slate-900">
              Recommended Spelling Variations
            </h4>
            <p className="text-xs text-slate-500">
              Subtle letter tweaks tested across the Chaldean master frequency scale:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {variations.map((v) => {
            const isCurrent = v.variant.toLowerCase() === testName.toLowerCase();

            return (
              <div
                key={v.variant}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-2 ${
                  isCurrent
                    ? "bg-purple-50/70 border-purple-400 ring-1 ring-purple-400"
                    : "bg-white border-slate-200 hover:border-purple-300"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-serif text-lg font-bold text-slate-900">
                      {v.variant}
                    </span>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      Chaldean #{v.compound} → #{v.single}
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      v.isAuspicious
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {v.isAuspicious ? "✨ Lucky Compound" : "Balanced"}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 line-clamp-2">
                  {v.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-purple-700 font-semibold">
                    {v.scoreDelta > 0 ? `+${v.scoreDelta} Vibrational Harmony` : "Standard"}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setTestName(v.variant);
                      if (onApplyName) onApplyName(v.variant);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-purple-700 text-white font-semibold text-[11px] transition-colors cursor-pointer"
                  >
                    Apply Spelling
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
