import React, { useState, useMemo } from "react";
import {
  Ruler,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Info,
  Shield,
  Layers,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock
} from "lucide-react";
import { calculateAyadiShadvarga } from "../../engine/vastu/vastuEngine";
import { AyadiCalculationResult } from "../../types/vastuTypes";

export const AyadiCalculatorView: React.FC = () => {
  const [lengthFt, setLengthFt] = useState<number>(45);
  const [widthFt, setWidthFt] = useState<number>(32);
  const [unit, setUnit] = useState<"feet" | "meters">("feet");

  // Effective calculation in feet
  const effectiveLength = unit === "meters" ? lengthFt * 3.28084 : lengthFt;
  const effectiveWidth = unit === "meters" ? widthFt * 3.28084 : widthFt;

  const result: AyadiCalculationResult = useMemo(
    () => calculateAyadiShadvarga(effectiveLength, effectiveWidth),
    [effectiveLength, effectiveWidth]
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Vedic Architectural Mathematics
            </span>
            <span className="text-xs text-slate-400">Mayamatam & Manasara Shastra</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
            <Ruler className="w-6 h-6 text-amber-400" />
            Ayadi Shadvarga Perimeter Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Test the dimensional harmony of any room, building, or plot perimeter. Ensure Aaya (Income) exceeds Vyaya (Expense) with auspicious Yoni and Ayu.
          </p>
        </div>

        {/* Shastric Condition Badge */}
        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="font-bold text-slate-200">Rule: Aaya &gt; Vyaya</span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-400 font-bold">Dhvaja / Simha / Gaja Yoni</span>
        </div>
      </div>

      {/* Inputs & Summary Score Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Ruler className="w-4 h-4 text-amber-600" />
              Building Dimensions
            </h3>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setUnit("feet")}
                className={`px-2 py-0.5 rounded-md text-xs font-bold cursor-pointer transition-colors ${
                  unit === "feet" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
                }`}
              >
                Feet
              </button>
              <button
                onClick={() => setUnit("meters")}
                className={`px-2 py-0.5 rounded-md text-xs font-bold cursor-pointer transition-colors ${
                  unit === "meters" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
                }`}
              >
                Meters
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Length ({unit}):</span>
                <span className="text-amber-700 font-black">{lengthFt} {unit}</span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                step="1"
                value={lengthFt}
                onChange={(e) => setLengthFt(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Width ({unit}):</span>
                <span className="text-amber-700 font-black">{widthFt} {unit}</span>
              </div>
              <input
                type="range"
                min="8"
                max="120"
                step="1"
                value={widthFt}
                onChange={(e) => setWidthFt(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1.5">
              Standard Plot Presets:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "30 × 40 ft", l: 40, w: 30 },
                { label: "30 × 50 ft", l: 50, w: 30 },
                { label: "40 × 60 ft", l: 60, w: 40 },
                { label: "50 × 80 ft", l: 80, w: 50 },
                { label: "35 × 45 ft", l: 45, w: 35 },
                { label: "25 × 40 ft", l: 40, w: 25 }
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    setUnit("feet");
                    setLengthFt(p.l);
                    setWidthFt(p.w);
                  }}
                  className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700 cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calculated Dimensions Banner */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-slate-500">Perimeter:</div>
              <div className="text-sm font-black text-slate-900">{result.perimeterFt} ft</div>
            </div>
            <div>
              <div className="text-slate-500">Floor Area:</div>
              <div className="text-sm font-black text-slate-900">{result.areaSqFt} sq.ft</div>
            </div>
          </div>
        </div>

        {/* Right Shadvarga Results (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Overall Verdict Banner */}
          <div
            className={`p-5 rounded-2xl border shadow-md flex items-center justify-between ${
              result.isAuspicious
                ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                : "bg-rose-50 border-rose-200 text-rose-950"
            }`}
          >
            <div className="flex items-center gap-3">
              {result.isAuspicious ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-rose-600 shrink-0" />
              )}
              <div>
                <h4 className="text-base font-black">
                  {result.isAuspicious
                    ? "Auspicious Dimensional Perimeter (Subha Ayadi)"
                    : "Caution: Inauspicious Dimensions (Ashubha Ayadi)"}
                </h4>
                <p className="text-xs mt-0.5 opacity-90">
                  {result.isAuspicious
                    ? "Aaya (Gain) comfortably exceeds Vyaya (Expense), granting financial growth and peaceful habitation."
                    : "Vyaya exceeds Aaya or Yoni creates energetic turbulence. Adjust perimeter by 1 or 2 feet to restore harmony."}
                </p>
              </div>
            </div>
          </div>

          {/* 6 Sacred Shadvarga Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1. AAYA (Gain) */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>1. Aaya (Income)</span>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-emerald-600">{result.aaya}</div>
              <div className="text-[11px] text-slate-600 font-semibold">{result.aayaSignificance}</div>
            </div>

            {/* 2. VYAYA (Loss) */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>2. Vyaya (Expense)</span>
                <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
              </div>
              <div className="text-2xl font-black text-rose-600">{result.vyaya}</div>
              <div className="text-[11px] text-slate-600 font-semibold">{result.vyayaSignificance}</div>
            </div>

            {/* 3. YONI (Directional Life Force) */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>3. Yoni (Life Force)</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <div className="text-lg font-black text-amber-600">{result.yoniName}</div>
              <div className="text-[11px] text-slate-600 font-semibold">Direction: {result.yoniDirection}</div>
            </div>

            {/* 4. AYU (Building Longevity) */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>4. Ayu (Longevity)</span>
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <div className="text-2xl font-black text-indigo-600">{result.ayu} Yrs</div>
              <div className="text-[11px] text-slate-600 font-semibold">Span of structural prana</div>
            </div>

            {/* 5. VARA (Ruling Day) */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>5. Vara (Solar Day)</span>
                <Calendar className="w-3.5 h-3.5 text-sky-600" />
              </div>
              <div className="text-lg font-black text-sky-600">{result.vara}</div>
              <div className="text-[11px] text-slate-600 font-semibold">Governing solar deity</div>
            </div>

            {/* 6. TITHI & NAKSHATRA */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>6. Tithi / Star</span>
                <Layers className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <div className="text-sm font-black text-purple-600 truncate">{result.tithi}</div>
              <div className="text-[11px] text-slate-600 font-semibold truncate">Nak: {result.nakshatra}</div>
            </div>
          </div>

          {/* Remedy Recommendation Card */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 text-xs">
            <div className="font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              Ayadi Shastric Remediation Advice
            </div>
            <p className="text-slate-700 leading-relaxed">
              {result.remedyAdvice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
