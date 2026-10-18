// src/components/VehicleNumerologyView.tsx
import React, { useState } from "react";
import { 
  Car, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  BookOpen, 
  Calendar, 
  ShieldCheck, 
  Compass, 
  Award, 
  Zap, 
  Repeat, 
  Palette,
  Eye,
  Crosshair,
  Key,
  Shield
} from "lucide-react";
import { 
  parseAndEvaluateVehicleNumber, 
  VEHICLE_PRIMARY_READINGS, 
  VEHICLE_LIFE_PATH_COMPATIBILITY, 
  VEHICLE_COLOUR_GUIDE, 
  CHAPTER_TWENTY_NINE_THEORY,
  VehicleParsedData
} from "../data/vehicleNumerologyData";

interface VehicleNumerologyViewProps {
  initialVehicleNumber?: string;
  initialDob?: string;
  userProfile?: any;
  selectedLanguage?: any;
}

export const VehicleNumerologyView: React.FC<VehicleNumerologyViewProps> = ({
  initialVehicleNumber = "MH-02-CD-1234",
  initialDob = "15/08/1947",
  userProfile
}) => {
  const [vehicleNumber, setVehicleNumber] = useState(initialVehicleNumber);
  const [dob, setDob] = useState(userProfile?.dob || initialDob);

  const [activeTab, setActiveTab] = useState<"analysis" | "readings_lib" | "compatibility" | "colour_guide" | "remedies">("analysis");
  const [selectedNum, setSelectedNum] = useState<number | null>(null);

  // Compute Life Path Number from DOB string
  const computeLifePath = (dateStr: string): number => {
    const digits = dateStr.replace(/[^0-9]/g, "").split("").map(Number);
    if (digits.length === 0) return 1;
    let sum = digits.reduce((a, b) => a + b, 0);
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = String(sum).split("").map(Number).reduce((a, b) => a + b, 0);
    }
    return sum;
  };

  const lifePathNumber = computeLifePath(dob);

  // Evaluate the vehicle registration input
  const parsedVehicle = parseAndEvaluateVehicleNumber(vehicleNumber, lifePathNumber);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* CHAPTER HEADER BANNER */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-indigo-50 p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
              {CHAPTER_TWENTY_NINE_THEORY.chapterNumber}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-indigo-100 text-xs font-medium">
              Applied Chaldean Vehicle System
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-indigo-100 tracking-tight">
            {CHAPTER_TWENTY_NINE_THEORY.title}
          </h1>

          <blockquote className="border-l-2 border-indigo-400/60 pl-4 py-1 italic text-indigo-200/90 text-sm md:text-base font-serif">
            "{CHAPTER_TWENTY_NINE_THEORY.quote.text}"
            <footer className="text-xs text-indigo-400 mt-1 not-italic font-sans font-medium">
              — {CHAPTER_TWENTY_NINE_THEORY.quote.author}
            </footer>
          </blockquote>

          <p className="text-xs md:text-sm text-indigo-100/80 leading-relaxed max-w-4xl">
            A vehicle registration number acts as a continuous mobile broadcast antenna, transmitting its Chaldean numerical frequency across every kilometer, road trip, and daily commute. Selecting or analyzing a vehicle number ensures that every journey unfolds within an energetic environment of safety, protection, executive respect, and smooth momentum.
          </p>
        </div>
      </div>

      {/* INPUT CONTROLLER PANEL */}
      <div className="bg-white p-6 rounded-3xl border border-indigo-900/10 shadow-xs space-y-4">
        <div className="flex items-center gap-3 border-b border-indigo-900/10 pb-3">
          <div className="p-2.5 bg-indigo-100 text-indigo-900 rounded-2xl">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-slate-900 text-base">Vehicle Registration Controller</h3>
            <p className="text-xs text-slate-500">Enter any registration number to parse state, district, series, and 4-digit Chaldean sum.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Vehicle Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-indigo-600" />
              Vehicle Registration Number
            </label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              placeholder="e.g. MH-02-CD-1234 or DL-01-AB-7777"
              className="w-full px-4 py-2.5 bg-indigo-50/50 border border-indigo-900/20 rounded-xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-[11px] text-slate-500 block">Supports Indian plate format (State-District-Series-Number) or custom digits</span>
          </div>

          {/* Birth Date Input for Life Path Alignment */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Owner Birth Date (For Life Path Alignment)
            </label>
            <input
              type="text"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="DD/MM/YYYY"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-[11px] text-indigo-700 font-bold block">
              Calculated Life Path: {lifePathNumber}
            </span>
          </div>
        </div>
      </div>

      {/* TOP TAB NAVIGATION */}
      <div className="flex flex-wrap gap-2 border-b border-indigo-900/10 pb-3">
        <button
          onClick={() => setActiveTab("analysis")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "analysis"
              ? "bg-slate-900 text-indigo-300 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-indigo-50 border border-indigo-900/10"
          }`}
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Vehicle Plate Analysis</span>
        </button>

        <button
          onClick={() => setActiveTab("readings_lib")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "readings_lib"
              ? "bg-indigo-900 text-indigo-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-indigo-50 border border-indigo-900/10"
          }`}
        >
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <span>Vehicle Readings (1 to 9)</span>
        </button>

        <button
          onClick={() => setActiveTab("compatibility")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "compatibility"
              ? "bg-amber-900 text-amber-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-indigo-50 border border-indigo-900/10"
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>Life Path Compatibility</span>
        </button>

        <button
          onClick={() => setActiveTab("colour_guide")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "colour_guide"
              ? "bg-emerald-900 text-emerald-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-indigo-50 border border-indigo-900/10"
          }`}
        >
          <Palette className="w-4 h-4 text-emerald-400" />
          <span>Vehicle Colour Harmony</span>
        </button>

        <button
          onClick={() => setActiveTab("remedies")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "remedies"
              ? "bg-rose-900 text-rose-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-indigo-50 border border-indigo-900/10"
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-rose-400" />
          <span>4 Methods & Remedies</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: VEHICLE PLATE ANALYSIS */}
      {/* ======================================================== */}
      {activeTab === "analysis" && (
        <div className="space-y-8">
          {parsedVehicle ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* MAIN RESULT CARD */}
              <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-indigo-900/10 shadow-xs space-y-6">
                <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-100 text-indigo-900">
                      Parsed Vehicle Registration
                    </span>
                    <h2 className="font-mono text-2xl md:text-3xl font-bold text-slate-900 mt-2 tracking-wider">
                      {parsedVehicle.rawInput.toUpperCase()}
                    </h2>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-500 uppercase font-mono block">Vehicle Primary Number</span>
                    <span className="text-3xl font-serif font-bold text-indigo-900 bg-indigo-50 w-12 h-12 rounded-2xl border border-indigo-200 flex items-center justify-center shadow-xs ml-auto">
                      {parsedVehicle.primaryNumber}
                    </span>
                  </div>
                </div>

                {/* READOUT HIGHLIGHT */}
                <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-200 space-y-1">
                  <span className="font-serif font-bold text-indigo-950 text-base block">
                    {parsedVehicle.reading.title}
                  </span>
                  <p className="text-xs md:text-sm text-indigo-900 leading-relaxed font-medium">
                    {parsedVehicle.reading.frequencyName}
                  </p>
                </div>

                {/* KARMIC DEBT OR AUSPICIOUS COMPOUND NOTICES */}
                {parsedVehicle.isKarmicDebt && (
                  <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl text-xs md:text-sm text-rose-900 space-y-1.5">
                    <span className="font-bold flex items-center gap-1.5 text-rose-950 text-sm">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      Karmic Debt Compound {parsedVehicle.karmicDebtCode} Identified in Registration Sum
                    </span>
                    <p className="leading-relaxed">
                      The four-digit registration sum passes through Karmic Debt {parsedVehicle.karmicDebtCode}. This pattern requires specific remedial attention (such as the Consecration Ritual, Gemstone placement, or Number Enhancement technique) to ensure smooth travel.
                    </p>
                  </div>
                )}

                {parsedVehicle.isAuspiciousCompound && (
                  <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs md:text-sm text-emerald-900 space-y-1.5">
                    <span className="font-bold flex items-center gap-1.5 text-emerald-950 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Auspicious Chaldean Compound {parsedVehicle.auspiciousCompoundCode} Detected
                    </span>
                    <p className="leading-relaxed">
                      The intermediate sum produces fortunate Chaldean compound {parsedVehicle.auspiciousCompoundCode}, attracting natural goodwill, smooth travel flow, and energetic protection.
                    </p>
                  </div>
                )}

                {/* FOUR CHALDEAN BREAKDOWNS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block uppercase font-mono text-[11px] text-indigo-800">
                      1. Four-Digit Sum (Primary):
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      4 Digits: <strong className="font-mono">{parsedVehicle.fourDigitRegistration}</strong> → Sum: <strong className="font-mono">{parsedVehicle.fourDigitSum}</strong> → Primary Digit: <strong className="font-mono text-indigo-900">{parsedVehicle.primaryNumber}</strong>.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block uppercase font-mono text-[11px] text-indigo-800">
                      2. Series Chaldean Sum:
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      Letters: <strong className="font-mono">{parsedVehicle.seriesLetters || "N/A"}</strong> → Chaldean Sum: <strong className="font-mono">{parsedVehicle.seriesChaldeanSum}</strong>.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block uppercase font-mono text-[11px] text-indigo-800">
                      3. District Area Code:
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      District Code: <strong className="font-mono">{parsedVehicle.districtCode || "00"}</strong> → Sum: <strong className="font-mono">{parsedVehicle.districtCodeSum}</strong>.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block uppercase font-mono text-[11px] text-indigo-800">
                      4. Last Two Digits (Signature):
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      Ending Digits: <strong className="font-mono">{parsedVehicle.lastTwoDigits}</strong> → Compound: <strong className="font-mono">{parsedVehicle.lastTwoDigitsCompound}</strong>.
                    </p>
                  </div>
                </div>

                {/* DETAILED VIBRATIONAL CREATION PARAGRAPH */}
                <div className="space-y-2 border-t border-slate-100 pt-4 text-xs md:text-sm text-slate-700 leading-relaxed">
                  <h4 className="font-serif font-bold text-slate-900 text-sm">Detailed Vibrational Influence:</h4>
                  <p>{parsedVehicle.reading.whatItCreates}</p>
                </div>

                {/* SAFETY & ROAD QUALITY */}
                <div className="p-4 bg-slate-900 text-indigo-100 rounded-2xl space-y-2 text-xs md:text-sm">
                  <span className="font-bold text-amber-300 block text-xs uppercase tracking-wider">
                    Road Safety & Operational Quality
                  </span>
                  <p className="leading-relaxed">{parsedVehicle.reading.safetyAndRoadQuality}</p>
                </div>
              </div>

              {/* SIDEBAR ANALYSIS: COMPATIBILITY & COLOUR */}
              <div className="space-y-6">
                {/* LIFE PATH COMPATIBILITY */}
                {parsedVehicle.compatibilityWithLifePath && (
                  <div className={`p-6 rounded-3xl border shadow-xs space-y-3 ${
                    parsedVehicle.compatibilityWithLifePath.isBest
                      ? "bg-emerald-50/80 border-emerald-300 text-emerald-950"
                      : parsedVehicle.compatibilityWithLifePath.isAvoid
                      ? "bg-rose-50/80 border-rose-300 text-rose-950"
                      : "bg-white border-slate-200 text-slate-800"
                  }`}>
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-xs uppercase tracking-wider font-mono">Life Path Alignment</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono ${
                        parsedVehicle.compatibilityWithLifePath.isBest
                          ? "bg-emerald-200 text-emerald-900 font-bold"
                          : parsedVehicle.compatibilityWithLifePath.isAvoid
                          ? "bg-rose-200 text-rose-900 font-bold"
                          : "bg-slate-200 text-slate-800"
                      }`}>
                        {parsedVehicle.compatibilityWithLifePath.isBest ? "HARMONIOUS" : parsedVehicle.compatibilityWithLifePath.isAvoid ? "INCOMPATIBLE" : "NEUTRAL"}
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed">
                      {parsedVehicle.compatibilityWithLifePath.explanation}
                    </p>
                  </div>
                )}

                {/* COLOUR HARMONY PANEL */}
                <div className="bg-white p-6 rounded-3xl border border-indigo-900/10 shadow-xs space-y-4 text-xs">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Palette className="w-4 h-4 text-indigo-600" />
                    <h4 className="font-serif font-bold text-slate-900 text-sm">Vehicle Colour Compatibility</h4>
                  </div>

                  <div>
                    <span className="font-bold text-emerald-800 block text-[11px] uppercase tracking-wider mb-1">Recommended Paint Colours:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(parsedVehicle?.colourGuide?.bestColours || []).map((c, idx) => (
                        <span key={idx} className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded-md text-[11px] font-medium">
                          ✓ {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-rose-800 block text-[11px] uppercase tracking-wider mb-1">Colours to Avoid:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(parsedVehicle?.colourGuide?.avoidColours || []).map((c, idx) => (
                        <span key={idx} className="bg-rose-50 text-rose-900 border border-rose-200 px-2 py-0.5 rounded-md text-[11px] font-medium">
                          ✕ {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-600 leading-relaxed text-[11px] pt-1 border-t border-slate-100">
                    {parsedVehicle.colourGuide.explanation}
                  </p>
                </div>

                {/* SPECIAL PATTERNS */}
                {(parsedVehicle.specialPatterns.isRepeatingQuad || parsedVehicle.specialPatterns.isSequential || parsedVehicle.specialPatterns.isMirror || parsedVehicle.specialPatterns.hasSacred786 || parsedVehicle.specialPatterns.hasSacred108) && (
                  <div className="bg-amber-50/80 p-6 rounded-3xl border border-amber-300 space-y-3 text-xs">
                    <span className="font-bold text-amber-950 block text-sm flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-600" />
                      Special Numerical Pattern Identified
                    </span>

                    {parsedVehicle.specialPatterns.isRepeatingQuad && (
                      <p className="text-amber-900">
                        • <strong>Quadruple Repeating Digit ({parsedVehicle.specialPatterns.repeatingDigit}):</strong> Creates an extraordinary concentration of this specific digit's vibration.
                      </p>
                    )}

                    {parsedVehicle.specialPatterns.isSequential && (
                      <p className="text-amber-900">
                        • <strong>{parsedVehicle.specialPatterns.sequenceType}:</strong> Unbroken numerical progression supporting smooth travel flow.
                      </p>
                    )}

                    {parsedVehicle.specialPatterns.isMirror && (
                      <p className="text-amber-900">
                        • <strong>Mirror Palindrome Registration:</strong> Symmetrical pattern creating energetic balance and harmonious reciprocity.
                      </p>
                    )}

                    {parsedVehicle.specialPatterns.hasSacred786 && (
                      <p className="text-amber-900 font-bold">
                        • Contains Sacred Substring 786: Exceptional spiritual protective shielding.
                      </p>
                    )}

                    {parsedVehicle.specialPatterns.hasSacred108 && (
                      <p className="text-amber-900 font-bold">
                        • Contains Sacred Substring 108: Sacred completion and cosmic resonance.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white rounded-3xl border border-slate-200 text-slate-500 text-center text-sm">
              Please enter a valid vehicle registration number above to generate the full Chaldean analysis.
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: PRIMARY VEHICLE READINGS (1 TO 9) */}
      {/* ======================================================== */}
      {activeTab === "readings_lib" && (
        <div className="space-y-6">
          <div className="bg-indigo-50/80 p-5 rounded-2xl border border-indigo-300 text-xs md:text-sm text-indigo-950 leading-relaxed">
            <span className="font-bold block text-indigo-900 text-sm mb-1">Complete Detailed Readings for Vehicle Numbers 1 to 9</span>
            The Vehicle Primary Number is calculated by summing the four digits of the registration plate and reducing to a single root digit. Each number creates a specific operational environment affecting safety, momentum, and professional impression.
          </div>

          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => setSelectedNum(selectedNum === num ? null : num)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedNum === num
                    ? "bg-indigo-900 text-white shadow-md scale-105"
                    : "bg-white text-slate-700 hover:bg-indigo-50 border border-indigo-900/10"
                }`}
              >
                Vehicle Primary {num}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.values(VEHICLE_PRIMARY_READINGS)
              .filter(r => selectedNum === null || r.number === selectedNum)
              .map((r) => (
                <div
                  key={r.number}
                  className="bg-white p-6 md:p-8 rounded-3xl border border-indigo-900/10 shadow-xs space-y-4 hover:border-indigo-400 transition-all"
                >
                  <div className="flex justify-between items-start border-b border-indigo-900/10 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                        {r.frequencyName}
                      </span>
                      <h3 className="font-serif text-lg md:text-xl font-bold text-slate-900 mt-1">
                        {r.title}
                      </h3>
                    </div>
                    <span className="text-2xl font-serif font-bold text-indigo-900 bg-indigo-50 w-12 h-12 rounded-2xl border border-indigo-200 flex items-center justify-center shadow-xs">
                      {r.number}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs md:text-sm text-slate-700 leading-relaxed">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Vibrational Field & Operational Influence:</span>
                      <p>{r.whatItCreates}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-emerald-900 block">Optimal Applications & User Profiles:</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(r?.bestFor || []).map((item, idx) => (
                          <span key={idx} className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-lg text-[11px] font-medium">
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-rose-900 block">Unfavorable Applications:</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(r?.avoidFor || []).map((item, idx) => (
                          <span key={idx} className="bg-rose-50 text-rose-900 border border-rose-200 px-2.5 py-1 rounded-lg text-[11px] font-medium">
                            ✕ {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 text-indigo-100 rounded-2xl text-xs space-y-1">
                      <span className="font-bold text-amber-300 block">Road Safety & Performance Profile:</span>
                      <p className="leading-relaxed">{r.safetyAndRoadQuality}</p>
                    </div>

                    <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs">
                      <span className="font-bold text-amber-950 block">Operational Challenges to Manage:</span>
                      <p className="text-slate-700 mt-0.5">{r.specificChallenges}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: LIFE PATH COMPATIBILITY MATRIX */}
      {/* ======================================================== */}
      {activeTab === "compatibility" && (
        <div className="space-y-6">
          <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-300 text-xs md:text-sm text-amber-950 leading-relaxed">
            <span className="font-bold block text-amber-900 text-sm mb-1">Life Path & Vehicle Primary Number Alignment</span>
            Aligning your vehicle's Primary Number with your core Life Path Number creates a harmonious travel environment where every commute reinforces your soul's purpose without energetic friction.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(VEHICLE_LIFE_PATH_COMPATIBILITY).map(([lpStr, comp]) => (
              <div key={lpStr} className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-amber-900/10 pb-2">
                  <span className="font-serif font-bold text-base text-slate-900">
                    Life Path {lpStr}
                  </span>
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    Resonance Guide
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-emerald-800 block">Harmonious Vehicle Numbers:</span>
                    <div className="flex gap-1.5 pt-1">
                      {(comp?.best || []).map((num) => (
                        <span key={num} className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-950 font-bold flex items-center justify-center border border-emerald-300">
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-rose-800 block">Incompatible Numbers to Avoid:</span>
                    <div className="flex gap-1.5 pt-1">
                      {(comp?.avoid || []).map((num) => (
                        <span key={num} className="w-8 h-8 rounded-xl bg-rose-100 text-rose-950 font-bold flex items-center justify-center border border-rose-300">
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                    {comp.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: VEHICLE COLOUR HARMONY GUIDE */}
      {/* ======================================================== */}
      {activeTab === "colour_guide" && (
        <div className="space-y-6">
          <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-300 text-xs md:text-sm text-emerald-950 leading-relaxed">
            <span className="font-bold block text-emerald-900 text-sm mb-1">Vehicle Colour & Number Interaction</span>
            Vehicle exterior color carries its own specific vibrational quality. Matching the vehicle's paint color with its Chaldean Primary Number maximizes aesthetic and energetic harmony.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.entries(VEHICLE_COLOUR_GUIDE).map(([numStr, guide]) => (
              <div key={numStr} className="bg-white p-6 rounded-3xl border border-emerald-900/10 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-900/10 pb-2">
                  <h3 className="font-serif font-bold text-base text-slate-900">Vehicle Number {numStr}</h3>
                  <span className="w-8 h-8 rounded-xl bg-slate-900 text-indigo-300 font-bold text-xs flex items-center justify-center">
                    {numStr}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-emerald-800 block">Recommended Colours:</span>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {guide.bestColours.map((c, idx) => (
                        <span key={idx} className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded-md text-[11px]">
                          ✓ {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-rose-800 block">Avoid Colours:</span>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {guide.avoidColours.map((c, idx) => (
                        <span key={idx} className="bg-rose-50 text-rose-900 border border-rose-200 px-2 py-0.5 rounded-md text-[11px]">
                          ✕ {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                    {guide.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: 4 METHODS & REMEDIES */}
      {/* ======================================================== */}
      {activeTab === "remedies" && (
        <div className="space-y-6">
          {/* Four Calculation Methods Overview */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-indigo-900/10 shadow-xs space-y-6">
            <div className="border-b border-indigo-900/10 pb-3">
              <span className="text-xs font-bold text-indigo-800 bg-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">
                CHALDEAN CALCULATION METHODS
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                The Four Dimensions of Vehicle Registration Analysis
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm">
              {CHAPTER_TWENTY_NINE_THEORY.fourMethodsSummary.map((m, idx) => (
                <div key={idx} className="p-5 bg-indigo-50/60 rounded-2xl border border-indigo-200 space-y-2">
                  <span className="font-bold text-indigo-950 block text-sm">{m.name}</span>
                  <p className="text-slate-700 leading-relaxed">{m.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Consecration Ritual & Remedies */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-rose-900/10 shadow-xs space-y-6">
            <div className="border-b border-rose-900/10 pb-3">
              <span className="text-xs font-bold text-rose-800 bg-rose-100 px-3 py-1 rounded-full uppercase tracking-wider">
                REMEDIAL PROTOCOLS
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                Remedies for Unfavourable or Karmic Vehicle Numbers
              </h2>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed">
              <div className="p-5 bg-rose-50/80 rounded-2xl border border-rose-300 space-y-2">
                <span className="font-bold text-rose-950 block text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  Vehicle Consecration Ritual Steps
                </span>
                <ul className="space-y-1.5 text-slate-800">
                  {CHAPTER_TWENTY_NINE_THEORY.consecrationRitualSteps.map((step, idx) => (
                    <li key={idx}>• {step}</li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-amber-50/80 rounded-2xl border border-amber-300 space-y-2">
                <span className="font-bold text-amber-950 block text-sm flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-700" />
                  Gemstone Placement & Protective Mantras
                </span>
                <p>
                  • <strong>Compound 13:</strong> Place a Hessonite Garnet (Gomed) in the glove box. Recite 'Om Gam Ganapataye Namaha' 3x before driving.<br />
                  • <strong>Compound 14:</strong> Place a small Green Tourmaline or Emerald. Recite 'Om Budhaya Namaha'.<br />
                  • <strong>Compound 16:</strong> Place a Cat's Eye (Lehsunia) gemstone and Hanuman Yantra. Recite 'Om Hanumate Namaha' for road shielding.<br />
                  • <strong>Compound 19:</strong> Place a Red Spinel or Ruby in the interior space to foster balanced road awareness.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
