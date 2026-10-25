import React, { useState, useMemo } from "react";
import {
  PenTool,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Search,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Layers,
  Award,
  RefreshCw,
  Sliders,
  Check,
  FileSignature
} from "lucide-react";
import {
  GRAPHOLOGY_RULES,
  FIFTEEN_SIGNATURE_SPECIMENS,
  EIGHT_WEEK_CORRECTION_PROTOCOL,
  SignatureSpecimen,
  GraphologyRule
} from "../data/signatureAnalysisData";

// Helper Chaldean Letter Map
const CHALDEAN_MAP: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1, J: 1, K: 2, L: 3, M: 4,
  N: 5, O: 7, P: 8, Q: 1, R: 2, S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7
};

// Helper Pythagorean Letter Map
const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 1, K: 2, L: 3, M: 4,
  N: 5, O: 6, P: 7, Q: 8, R: 9, S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

function calculateChaldean(text: string) {
  const clean = text.toUpperCase().replace(/[^A-Z]/g, "");
  let sum = 0;
  const breakdown: string[] = [];
  for (let char of clean) {
    const val = CHALDEAN_MAP[char] || 0;
    sum += val;
    breakdown.push(`${char}(${val})`);
  }
  const compound = sum;
  let single = compound;
  while (single > 9 && single !== 11 && single !== 22 && single !== 33) {
    single = single.toString().split("").reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  }
  return { compound, single, breakdown: breakdown.join(" + ") };
}

function calculatePythagorean(text: string) {
  const clean = text.toUpperCase().replace(/[^A-Z]/g, "");
  let sum = 0;
  const breakdown: string[] = [];
  for (let char of clean) {
    const val = PYTHAGOREAN_MAP[char] || 0;
    sum += val;
    breakdown.push(`${char}(${val})`);
  }
  const compound = sum;
  let single = compound;
  while (single > 9 && single !== 11 && single !== 22 && single !== 33) {
    single = single.toString().split("").reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  }
  return { compound, single, breakdown: breakdown.join(" + ") };
}

const COMPOUND_DESCRIPTIONS: Record<number, { name: string; desc: string; isKarmic: boolean; isAuspicious: boolean }> = {
  13: { name: "Karmic Debt 13 (Work & Completion Obstacles)", desc: "Requires persistent discipline. Warns against unexpected delays and shortcuts.", isKarmic: true, isAuspicious: false },
  14: { name: "Karmic Debt 14 (Freedom & Volatility)", desc: "Warns against financial speculation, instability, and sudden loss of focus.", isKarmic: true, isAuspicious: false },
  15: { name: "The Magnetic Communicator", desc: "Radiates warmth, personal charm, and expressive artistic attraction.", isKarmic: false, isAuspicious: true },
  16: { name: "Karmic Debt 16 (The Shattered Citadel)", desc: "Warns of sudden structural reversals, ego collapses, or unexpected disruptions.", isKarmic: true, isAuspicious: false },
  17: { name: "Star of the Magi", desc: "Highly auspicious! Represents immortality of reputation, peace, and material elevation.", isKarmic: false, isAuspicious: true },
  19: { name: "Karmic Debt 19 (Prince of Heaven / Isolation)", desc: "Promotes individual authority but warns against isolation, stubborn pride, and self-reliance overload.", isKarmic: true, isAuspicious: false },
  20: { name: "The Awakening", desc: "Represents spiritual awakening, new horizons, and high purpose.", isKarmic: false, isAuspicious: true },
  21: { name: "The Crown of the Magi", desc: "Peak success, honors, public distinction, and victorious advancement.", isKarmic: false, isAuspicious: true },
  23: { name: "The Royal Star of the Lion", desc: "Commands command, protection from higher powers, and regal success.", isKarmic: false, isAuspicious: true },
  28: { name: "Partnerships of Power", desc: "Significant authority built through alliances, though requires careful legal trust.", isKarmic: false, isAuspicious: true },
  29: { name: "Grace Under Pressure / Master 11", desc: "Spiritual intuition and resilience, operating through base 2 sensitivity.", isKarmic: false, isAuspicious: true },
  30: { name: "Thoughtful Communication", desc: "Intellectual depth, academic precision, and contemplative wisdom.", isKarmic: false, isAuspicious: true },
  33: { name: "The Master Teacher", desc: "Universal compassion, altruism, and unshakeable spiritual mastery.", isKarmic: false, isAuspicious: true }
};

interface SignatureAnalysisViewProps {
  initialName?: string;
  lifePathNumber?: number;
  driverNumber?: number;
}

export const SignatureAnalysisView: React.FC<SignatureAnalysisViewProps> = ({
  initialName = "Aarav Sharma",
  lifePathNumber = 1,
  driverNumber = 1
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"analyzer" | "rules" | "specimens" | "protocol">("analyzer");
  const [signatureInput, setSignatureInput] = useState(initialName);
  
  // Graphological Physical Trait Selection States
  const [selectedSize, setSelectedSize] = useState<"large" | "medium" | "small" | "very_small">("medium");
  const [selectedSlant, setSelectedSlant] = useState<"right" | "vertical" | "left">("right");
  const [selectedBaseline, setSelectedBaseline] = useState<"rising" | "level" | "falling">("rising");
  const [selectedPressure, setSelectedPressure] = useState<"heavy" | "medium" | "light">("medium");
  const [selectedUnderline, setSelectedUnderline] = useState<"single" | "double" | "none" | "crossing" | "encircled">("single");
  const [selectedLegibility, setSelectedLegibility] = useState<"legible" | "partial" | "illegible">("legible");
  const [selectedEnding, setSelectedEnding] = useState<"rightward" | "upward" | "abrupt" | "dot">("rightward");

  // Rule Library Search State
  const [ruleSearch, setRuleSearch] = useState("");
  const [ruleCategory, setRuleCategory] = useState<string>("All");

  // Live Calculations
  const chaldean = useMemo(() => calculateChaldean(signatureInput), [signatureInput]);
  const pythagorean = useMemo(() => calculatePythagorean(signatureInput), [signatureInput]);

  const compoundInfo = useMemo(() => {
    return COMPOUND_DESCRIPTIONS[chaldean.compound] || {
      name: `Compound ${chaldean.compound}`,
      desc: "Neutral vibration. Evaluate compatibility with Life Path.",
      isKarmic: [13, 14, 16, 19].includes(chaldean.compound),
      isAuspicious: [15, 17, 20, 21, 23, 28, 30, 33].includes(chaldean.compound)
    };
  }, [chaldean.compound]);

  // Compatibility with Life Path
  const compatibilityStatus = useMemo(() => {
    const friendMap: Record<number, number[]> = {
      1: [1, 5, 7, 2, 9],
      2: [2, 6, 4, 8, 9],
      3: [3, 6, 9, 1, 5],
      4: [4, 8, 1, 2, 7],
      5: [5, 1, 3, 7, 9],
      6: [6, 2, 9, 3, 4],
      7: [7, 1, 5, 2, 4, 9],
      8: [8, 4, 1, 3, 6],
      9: [9, 3, 6, 1, 2]
    };
    const friends = friendMap[lifePathNumber] || [1, 3, 5, 6];
    if (friends.includes(chaldean.single)) {
      return { isCompatible: true, label: "Highly Compatible & Auspicious", color: "emerald" };
    }
    if ([13, 14, 16, 19].includes(chaldean.compound)) {
      return { isCompatible: false, label: "Karmic Debt Conflict", color: "rose" };
    }
    return { isCompatible: true, label: "Neutral Workable Synergy", color: "amber" };
  }, [lifePathNumber, chaldean.single, chaldean.compound]);

  // Filtered Rules
  const filteredRules = useMemo(() => {
    return GRAPHOLOGY_RULES.filter((r) => {
      const matchesSearch = r.title.toLowerCase().includes(ruleSearch.toLowerCase()) ||
        r.shortSummary.toLowerCase().includes(ruleSearch.toLowerCase());
      const matchesCat = ruleCategory === "All" || r.category === ruleCategory;
      return matchesSearch && matchesCat;
    });
  }, [ruleSearch, ruleCategory]);

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Chapter Thirty-Five System
              </span>
              <span className="text-xs text-amber-200/80 font-mono">Graphology & Numerology United</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 flex items-center gap-2">
              <FileSignature className="w-7 h-7 text-amber-400" />
              Signature Analysis & Correction Engine
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              "The signature is the most concentrated and most unconsciously honest expression of the self."
              Analyze the Chaldean & Pythagorean vibrational value, examine graphological strokes, and redesign an optimal signature.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 text-xs font-semibold">
            <div className="bg-amber-900/40 backdrop-blur-xs border border-amber-500/30 rounded-xl px-3.5 py-2 text-amber-200">
              Life Path Target: <strong className="text-white text-sm ml-1 font-serif">{lifePathNumber}</strong>
            </div>
            <div className="bg-amber-900/40 backdrop-blur-xs border border-amber-500/30 rounded-xl px-3.5 py-2 text-amber-200">
              Driver Number: <strong className="text-white text-sm ml-1 font-serif">{driverNumber}</strong>
            </div>
          </div>
        </div>

        {/* SUB-TAB NAVIGATION */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-amber-800/40 overflow-x-auto no-scrollbar text-xs font-semibold">
          {[
            { id: "analyzer", label: "Interactive Signature Analyzer", icon: PenTool },
            { id: "rules", label: "23 Graphology Rules Library", icon: BookOpen },
            { id: "specimens", label: "15 Specimen Gallery", icon: Layers },
            { id: "protocol", label: "8-Week Signature Correction", icon: Sparkles }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                  isSelected
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md scale-105"
                    : "bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* SUB-TAB 1: INTERACTIVE SIGNATURE ANALYZER */}
      {/* ======================================================== */}
      {activeSubTab === "analyzer" && (
        <div className="space-y-6">
          {/* INPUT & NUMEROLOGICAL CALCULATION SECTION */}
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-amber-600" />
                  Signature Text & Vibrational Calculator
                </h3>
                <p className="text-xs text-slate-500">
                  Enter exact letters as signed on legal documents (e.g., "Aarav Sharma", "A. Sharma", "Sharma").
                </p>
              </div>

              <div className="flex items-center gap-2">
                {["Aarav Sharma", "A. Sharma", "A.K. Sharma", "Aarav S."].map((sample) => (
                  <button
                    key={sample}
                    onClick={() => setSignatureInput(sample)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 font-medium transition-all"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Signature Letter String
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={signatureInput}
                    onChange={(e) => setSignatureInput(e.target.value)}
                    placeholder="Enter signature text..."
                    className="w-full text-lg font-serif font-bold bg-slate-50 border border-amber-900/20 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
                  />
                  <PenTool className="w-5 h-5 text-amber-600 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
                <div className="text-[11px] text-slate-500">
                  Calculates Chaldean and Pythagorean letter values automatically.
                </div>
              </div>

              {/* LIVE RESULT CARDS */}
              <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* CHALDEAN CARD */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Chaldean Signature</span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-200/80 text-amber-950 text-[10px] font-bold">Primary</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-bold text-amber-950">{chaldean.single}</span>
                    <span className="text-sm font-medium text-amber-800">
                      (Compound <strong className="font-bold text-amber-950">{chaldean.compound}</strong>)
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-amber-800/80 truncate">
                    {chaldean.breakdown || "No letters"}
                  </div>
                </div>

                {/* PYTHAGOREAN CARD */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-amber-50/30 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Pythagorean Value</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-800 text-[10px] font-bold">Secondary</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-bold text-slate-900">{pythagorean.single}</span>
                    <span className="text-sm font-medium text-slate-600">
                      (Compound <strong className="font-bold text-slate-900">{pythagorean.compound}</strong>)
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 truncate">
                    {pythagorean.breakdown || "No letters"}
                  </div>
                </div>
              </div>
            </div>

            {/* VIBRATIONAL & KARMIC DEBT ANALYSIS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className={`p-4 rounded-xl border space-y-1.5 ${
                compoundInfo.isKarmic
                  ? "bg-rose-50/80 border-rose-300 text-rose-900"
                  : compoundInfo.isAuspicious
                  ? "bg-emerald-50/80 border-emerald-300 text-emerald-900"
                  : "bg-slate-50 border-slate-200 text-slate-900"
              }`}>
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider">
                  {compoundInfo.isKarmic ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Caution: Karmic Compound</span>
                    </>
                  ) : compoundInfo.isAuspicious ? (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Auspicious Compound</span>
                    </>
                  ) : (
                    <>
                      <Layers className="w-4 h-4 text-slate-600" />
                      <span>Standard Compound</span>
                    </>
                  )}
                </div>
                <div className="font-serif font-bold text-sm">{compoundInfo.name}</div>
                <p className="text-[11px] leading-relaxed opacity-90">{compoundInfo.desc}</p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase text-amber-900 tracking-wider">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Life Path Compatibility</span>
                </div>
                <div className="font-serif font-bold text-sm text-amber-950">
                  Signature {chaldean.single} vs Life Path {lifePathNumber}
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  {compatibilityStatus.label}. Alignment ensures public authority supports natural soul direction.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase text-indigo-900 tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-indigo-600" />
                  <span>Vibrational Recommendation</span>
                </div>
                <div className="font-serif font-bold text-sm text-indigo-950">
                  {compoundInfo.isKarmic ? "Correction Strongly Recommended" : "Vibrationally Sound"}
                </div>
                <p className="text-[11px] text-indigo-800 leading-relaxed">
                  {compoundInfo.isKarmic
                    ? "Adjust signature letters or add initial to shift compound away from 13, 14, 16, or 19."
                    : "Signature letter combination carries a stable vibration."}
                </p>
              </div>
            </div>
          </div>

          {/* GRAPHOLOGICAL TRAITS SELECTOR */}
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-600" />
                Physical Graphology Characteristics Selector
              </h3>
              <p className="text-xs text-slate-500">
                Configure physical handwriting parameters to analyze unconscious psychological traits.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* SIZE */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block">Rule 1: Overall Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="large">Large (8–12mm) — High Confidence</option>
                  <option value="medium">Medium (4–8mm) — Balanced Self-Worth</option>
                  <option value="small">Small (2–4mm) — Modest & Precise</option>
                  <option value="very_small">Very Small (&lt;2mm) — Suppressed Ego</option>
                </select>
              </div>

              {/* SLANT */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block">Rule 3: Slant (Lean)</label>
                <select
                  value={selectedSlant}
                  onChange={(e) => setSelectedSlant(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="right">Right Slant (Forward) — Warm & Social</option>
                  <option value="vertical">Vertical (Upright) — Controlled & Poised</option>
                  <option value="left">Left Slant (Backward) — Reserved & Guarded</option>
                </select>
              </div>

              {/* BASELINE */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block">Rule 4: Baseline Trajectory</label>
                <select
                  value={selectedBaseline}
                  onChange={(e) => setSelectedBaseline(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="rising">Rising Baseline — Optimistic & Ambitious</option>
                  <option value="level">Level Baseline — Grounded & Stable</option>
                  <option value="falling">Falling Baseline — Pessimistic / Fatigue</option>
                </select>
              </div>

              {/* PRESSURE */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block">Rule 5: Pen Pressure</label>
                <select
                  value={selectedPressure}
                  onChange={(e) => setSelectedPressure(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="heavy">Heavy Pressure — High Vitality & Will</option>
                  <option value="medium">Medium Pressure — Balanced Endurance</option>
                  <option value="light">Light Pressure — Sensitive & Aesthetic</option>
                </select>
              </div>

              {/* UNDERLINE */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block">Rule 10: Underline Style</label>
                <select
                  value={selectedUnderline}
                  onChange={(e) => setSelectedUnderline(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="single">Single Clean Line — Healthy Self-Affirmation</option>
                  <option value="double">Double Line — Strong Need for Recognition</option>
                  <option value="none">No Underline — Self-Contained Security</option>
                  <option value="crossing">Line Cutting Through — Self-Sabotage Pattern</option>
                  <option value="encircled">Encircled Loop — Protective Barrier</option>
                </select>
              </div>

              {/* LEGIBILITY */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block">Rule 7: Legibility</label>
                <select
                  value={selectedLegibility}
                  onChange={(e) => setSelectedLegibility(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="legible">Fully Legible — Transparent & Direct</option>
                  <option value="partial">Partially Legible — Selective Privacy</option>
                  <option value="illegible">Completely Illegible — Guarded or Abstract</option>
                </select>
              </div>

              {/* ENDING STROKE */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block">Rule 9: Ending Stroke</label>
                <select
                  value={selectedEnding}
                  onChange={(e) => setSelectedEnding(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="rightward">Rightward Reaching — Generous & Social</option>
                  <option value="upward">Upward Curling — High Aspiration</option>
                  <option value="abrupt">Abrupt Stop — Decisive & Pragmatic</option>
                  <option value="dot">Terminal Dot (.) — Stubborn Resolve</option>
                </select>
              </div>
            </div>

            {/* LIVE DIAGNOSIS BOX */}
            <div className="p-5 rounded-xl bg-amber-950 text-amber-50 space-y-3">
              <div className="flex items-center justify-between border-b border-amber-800/60 pb-2">
                <h4 className="font-serif font-bold text-amber-200 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Live Integrated Graphological Diagnosis
                </h4>
                <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 bg-amber-900/60 px-2.5 py-0.5 rounded-md border border-amber-700/50">
                  Unconscious Psychological Profile
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
                <div>
                  <strong className="text-amber-300 block mb-1">Public Self-Image & Ego:</strong>
                  {selectedSize === "large" && "Strong, expansive public self-worth and executive confidence."}
                  {selectedSize === "medium" && "Healthy, grounded self-esteem with realistic social poise."}
                  {selectedSize === "small" && "Modest, analytical, and highly precision-oriented mindset."}
                  {selectedSize === "very_small" && "Severe modesty or suppressed public ego requiring confidence work."}
                </div>

                <div>
                  <strong className="text-amber-300 block mb-1">Emotional Orientation & Drive:</strong>
                  {selectedSlant === "right" ? "Warm, empathetic, and socially open. " : selectedSlant === "vertical" ? "Intellectually controlled and emotionally poised. " : "Inward-facing and emotionally self-protective. "}
                  {selectedBaseline === "rising" ? "Maintains enthusiastic optimism for future endeavors." : selectedBaseline === "level" ? "Steady, reliable, and emotionally stable." : "Experiencing fatigue or temporary disappointment."}
                </div>

                <div>
                  <strong className="text-amber-300 block mb-1">Authority & Boundaries:</strong>
                  {selectedUnderline === "single" && "Displays healthy, self-assured authority without showiness."}
                  {selectedUnderline === "double" && "Strong need for recognition and protective boundary assertion."}
                  {selectedUnderline === "crossing" && "Warning: Crossing line shows subconscious self-sabotage tendency!"}
                  {selectedUnderline === "encircled" && "Warning: Encircled loop indicates an impenetrable protective barrier built around identity."}
                  {selectedUnderline === "none" && "Self-contained security requiring no external confirmation."}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 2: 23 GRAPHOLOGY RULES LIBRARY */}
      {/* ======================================================== */}
      {activeSubTab === "rules" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  The 23 Graphology Rules of Signature Analysis
                </h3>
                <p className="text-xs text-slate-500">
                  Systematic physical handwriting indicators refined through graphological research and practice.
                </p>
              </div>

              {/* SEARCH & CATEGORY FILTER */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    value={ruleSearch}
                    onChange={(e) => setRuleSearch(e.target.value)}
                    placeholder="Search rules..."
                    className="text-xs bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                </div>

                <select
                  value={ruleCategory}
                  onChange={(e) => setRuleCategory(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {["All", "Size", "Slant", "Baseline", "Pressure", "Speed", "Legibility", "Strokes", "Underline", "Loops", "Zones", "Gestalt"].map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRules.map((rule) => (
                <div key={rule.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 hover:border-amber-300 transition-all">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-2">
                    <h4 className="font-serif font-bold text-slate-900 text-sm">{rule.title}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md shrink-0">
                      {rule.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium italic">{rule.shortSummary}</p>

                  <div className="space-y-1.5 pt-1">
                    {rule.detailedReading.options.map((opt, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-white border border-slate-100 text-xs space-y-0.5">
                        <div className="font-bold text-slate-900">{opt.name}:</div>
                        <div className="text-slate-600 text-[11px] leading-tight">{opt.psychologicalTrait}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 3: 15 SPECIMEN GALLERY */}
      {/* ======================================================== */}
      {activeSubTab === "specimens" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-600" />
                Fifteen Signature Specimen Case Studies
              </h3>
              <p className="text-xs text-slate-500">
                Complete numerological calculations and graphological diagnoses from Chapter Thirty-Five.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {FIFTEEN_SIGNATURE_SPECIMENS.map((specimen) => (
                <div
                  key={specimen.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                    specimen.isKarmicDebt
                      ? "bg-rose-50/40 border-rose-200 hover:border-rose-300"
                      : "bg-amber-50/30 border-amber-200/80 hover:border-amber-400"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <span className="font-serif font-bold text-slate-900 text-sm">{specimen.title}</span>
                      {specimen.isKarmicDebt ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-200 text-rose-900 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-rose-700" /> Caution
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Sound
                        </span>
                      )}
                    </div>

                    {/* VISUAL SIGNATURE SIMULATION BOX */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-inner text-center space-y-1">
                      <div className="font-serif italic text-2xl font-bold text-slate-900 tracking-wider">
                        "{specimen.signatureText}"
                      </div>
                      <div className="text-[10px] text-slate-500">{specimen.visualStyle}</div>
                    </div>

                    {/* NUMEROLOGICAL BREAKDOWN */}
                    <div className="p-3 rounded-xl bg-slate-900 text-slate-100 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold">
                        <span>Chaldean: {specimen.chaldeanNumber} (Compound {specimen.chaldeanCompound})</span>
                        <span>Pythagorean: {specimen.pythagoreanNumber}</span>
                      </div>
                      <div className="text-[10px] text-slate-300 font-mono">{specimen.chaldeanCalculation}</div>
                      <div className="text-[11px] font-bold text-amber-200">{specimen.chaldeanCompoundName}</div>
                    </div>

                    {/* GRAPHOLOGICAL TRAITS */}
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Graphology Features:</div>
                      <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc">
                        {specimen.graphologicalTraits.map((trait, idx) => (
                          <li key={idx}>{trait}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-xs text-slate-800 leading-relaxed bg-white/80 p-3 rounded-xl border border-slate-200">
                      <strong className="text-amber-900 block mb-0.5">Verdict:</strong>
                      {specimen.verdict}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-900 text-amber-50 text-xs space-y-1 border border-amber-800">
                    <strong className="text-amber-300 block text-[11px] uppercase tracking-wider font-bold">Correction Protocol:</strong>
                    <p className="text-[11px] text-amber-100 leading-relaxed">{specimen.correctionAdvice}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 4: 8-WEEK SIGNATURE CORRECTION PROTOCOL */}
      {/* ======================================================== */}
      {activeSubTab === "protocol" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                The 8-Week Signature Correction & Subconscious Lock-In Protocol
              </h3>
              <p className="text-xs text-slate-500">
                A structured neuromuscular and subconscious re-patterning process to lock in the new signature.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {EIGHT_WEEK_CORRECTION_PROTOCOL.map((step, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-gradient-to-b from-amber-50/60 to-orange-50/40 border border-amber-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-950">
                      {step.weekRange}
                    </span>
                    <h4 className="font-serif font-bold text-amber-950 text-sm">{step.focusArea}</h4>
                    <p className="text-xs text-amber-900 font-semibold bg-white p-2.5 rounded-xl border border-amber-200/80">
                      {step.practiceRoutine}
                    </p>
                  </div>

                  <ul className="text-[11px] text-slate-700 space-y-1.5 pl-3 list-disc">
                    {step.guidelines.map((g, gIdx) => (
                      <li key={gIdx}>{g}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* PRACTICE WORKSHEET TEMPLATE */}
            <div className="p-6 rounded-2xl bg-slate-900 text-slate-100 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="font-serif font-bold text-amber-300 text-base flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  Daily Practice Worksheet Framework
                </h4>
                <span className="text-xs text-slate-400 font-mono">50 Repetitions Daily</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <strong className="text-amber-200 block font-bold">1. Capital Height Rule</strong>
                  <p className="text-slate-300">Maintain capital letter height at 8–10mm. Ensure uppercase letter is 2x to 2.5x taller than lowercase letters.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <strong className="text-amber-200 block font-bold">2. Slant & Trajectory</strong>
                  <p className="text-slate-300">Maintain a consistent 20° forward right slant. Drive baseline upward on a 10–15° angle toward upper right corner.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <strong className="text-amber-200 block font-bold">3. Underline & Reaching End</strong>
                  <p className="text-slate-300">Draw a single firm underline from left to right without cutting letters. End final stroke reaching outward to the right.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
