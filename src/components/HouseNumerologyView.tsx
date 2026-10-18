// src/components/HouseNumerologyView.tsx
import React, { useState } from "react";
import { 
  Home, 
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
  Heart,
  Briefcase,
  UserCheck,
  Layers,
  Key,
  Shield
} from "lucide-react";
import { 
  parseAndEvaluateHouseNumber, 
  HOUSE_PRIMARY_READINGS, 
  MASTER_HOUSE_READINGS,
  KARMIC_DEBT_HOUSES,
  HOUSE_LIFE_PATH_COMPATIBILITY, 
  LIFE_STAGE_HOUSE_RECOMMENDATIONS,
  CHAPTER_THIRTY_THEORY,
  HouseParsedData
} from "../data/houseNumerologyData";

interface HouseNumerologyViewProps {
  initialHouseNumber?: string;
  initialDob?: string;
  userProfile?: any;
  selectedLanguage?: any;
}

export const HouseNumerologyView: React.FC<HouseNumerologyViewProps> = ({
  initialHouseNumber = "Flat 304, Building 4",
  initialDob = "15/08/1947",
  userProfile
}) => {
  const [houseNumber, setHouseNumber] = useState(initialHouseNumber);
  const [dob, setDob] = useState(userProfile?.dob || initialDob);

  const [activeTab, setActiveTab] = useState<"analysis" | "readings_lib" | "master_karmic" | "compatibility" | "life_stages" | "remedies">("analysis");
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

  // Evaluate house input
  const parsedHouse = parseAndEvaluateHouseNumber(houseNumber, lifePathNumber);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* CHAPTER HEADER BANNER */}
      <div className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-950 text-amber-50 p-6 md:p-8 rounded-3xl shadow-xl border border-amber-500/20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
              {CHAPTER_THIRTY_THEORY.chapterNumber}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-amber-100 text-xs font-medium">
              Vastu & Applied Chaldean System
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-amber-100 tracking-tight">
            {CHAPTER_THIRTY_THEORY.title}
          </h1>

          <blockquote className="border-l-2 border-amber-400/60 pl-4 py-1 italic text-amber-200/90 text-sm md:text-base font-serif">
            "{CHAPTER_THIRTY_THEORY.quote.text}"
            <footer className="text-xs text-amber-400 mt-1 not-italic font-sans font-medium">
              — {CHAPTER_THIRTY_THEORY.quote.author}
            </footer>
          </blockquote>

          <p className="text-xs md:text-sm text-amber-100/80 leading-relaxed max-w-4xl">
            A dwelling space is the continuous vibrational container within which every meal is shared, every night of rest unfolds, and every major life decision is weighed. Evaluating the Chaldean house number aligns the home's energy with your core Life Path, creating a sanctuary of health, prosperity, relationship harmony, and spiritual peace.
          </p>
        </div>
      </div>

      {/* INPUT CONTROLLER PANEL */}
      <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex items-center gap-3 border-b border-amber-900/10 pb-3">
          <div className="p-2.5 bg-amber-100 text-amber-900 rounded-2xl">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-slate-900 text-base">House & Apartment Number Controller</h3>
            <p className="text-xs text-slate-500">Enter your house number, plot number, or flat and building address for full Chaldean parsing.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* House Number Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-amber-600" />
              House / Flat / Plot Number
            </label>
            <input
              type="text"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              placeholder="e.g. Flat 304, House 14-A, Plot 47"
              className="w-full px-4 py-2.5 bg-amber-50/50 border border-amber-900/20 rounded-xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <span className="text-[11px] text-slate-500 block">Supports letters (A=1, B=2, etc.) and apartment flat numbers</span>
          </div>

          {/* Birth Date Input for Life Path Alignment */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Resident Birth Date (For Life Path Alignment)
            </label>
            <input
              type="text"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="DD/MM/YYYY"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <span className="text-[11px] text-amber-800 font-bold block">
              Calculated Life Path: {lifePathNumber}
            </span>
          </div>
        </div>
      </div>

      {/* TOP TAB NAVIGATION */}
      <div className="flex flex-wrap gap-2 border-b border-amber-900/10 pb-3">
        <button
          onClick={() => setActiveTab("analysis")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "analysis"
              ? "bg-slate-900 text-amber-300 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Address Analysis</span>
        </button>

        <button
          onClick={() => setActiveTab("readings_lib")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "readings_lib"
              ? "bg-amber-900 text-amber-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>House Readings (1 to 9)</span>
        </button>

        <button
          onClick={() => setActiveTab("master_karmic")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "master_karmic"
              ? "bg-indigo-900 text-indigo-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Master & Karmic Houses</span>
        </button>

        <button
          onClick={() => setActiveTab("compatibility")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "compatibility"
              ? "bg-emerald-900 text-emerald-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Life Path Compatibility</span>
        </button>

        <button
          onClick={() => setActiveTab("life_stages")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "life_stages"
              ? "bg-purple-900 text-purple-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <UserCheck className="w-4 h-4 text-purple-400" />
          <span>Life Stage Guidance</span>
        </button>

        <button
          onClick={() => setActiveTab("remedies")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "remedies"
              ? "bg-rose-900 text-rose-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-rose-400" />
          <span>Remedies & Vastu</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: ADDRESS ANALYSIS */}
      {/* ======================================================== */}
      {activeTab === "analysis" && (
        <div className="space-y-8">
          {parsedHouse ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* MAIN RESULT CARD */}
              <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-amber-900/10 shadow-xs space-y-6">
                <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900">
                      Parsed House / Flat Address
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mt-2 tracking-wider">
                      {parsedHouse.rawInput}
                    </h2>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-500 uppercase font-mono block">House Primary Number</span>
                    <span className="text-3xl font-serif font-bold text-amber-900 bg-amber-50 w-12 h-12 rounded-2xl border border-amber-200 flex items-center justify-center shadow-xs ml-auto">
                      {parsedHouse.primaryNumber}
                    </span>
                  </div>
                </div>

                {/* READOUT HIGHLIGHT */}
                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1">
                  <span className="font-serif font-bold text-amber-950 text-base block">
                    {parsedHouse.reading.title}
                  </span>
                  <p className="text-xs md:text-sm text-amber-900 leading-relaxed font-medium">
                    {parsedHouse.reading.frequencyName}
                  </p>
                </div>

                {/* MASTER NUMBER OR KARMIC DEBT ALERTS */}
                {parsedHouse.isMasterNumber && parsedHouse.masterReading && (
                  <div className="p-4 bg-indigo-50 border border-indigo-300 rounded-2xl text-xs md:text-sm text-indigo-900 space-y-1.5">
                    <span className="font-bold flex items-center gap-1.5 text-indigo-950 text-sm">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      {parsedHouse.masterReading.title} Detected
                    </span>
                    <p className="leading-relaxed font-medium">{parsedHouse.masterReading.energy}</p>
                    <p className="leading-relaxed text-slate-700">{parsedHouse.masterReading.description}</p>
                  </div>
                )}

                {parsedHouse.isKarmicDebt && parsedHouse.karmicReading && (
                  <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl text-xs md:text-sm text-rose-900 space-y-1.5">
                    <span className="font-bold flex items-center gap-1.5 text-rose-950 text-sm">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      {parsedHouse.karmicReading.name} Detected
                    </span>
                    <p className="leading-relaxed text-slate-800">{parsedHouse.karmicReading.lesson}</p>
                    <p className="leading-relaxed font-semibold text-rose-950">Remedy: {parsedHouse.karmicReading.remedy}</p>
                  </div>
                )}

                {/* ADDRESS PARSING DETAILS */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <span className="font-bold text-slate-900 block uppercase font-mono text-[11px] text-amber-800">
                    Chaldean Number Sum Breakdown:
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    Evaluated Digits/Chars: <strong className="font-mono">{parsedHouse.cleanDigits}</strong> → Chaldean Sum: <strong className="font-mono">{parsedHouse.flatSum}</strong> → Reduced Root Digit: <strong className="font-mono text-amber-900">{parsedHouse.primaryNumber}</strong>.
                  </p>
                  {parsedHouse.hasFlatAndBuilding && (
                    <p className="text-slate-600 italic">
                      Note: In apartment living, the personal flat number takes precedence as the primary personal dwelling vibration, while the building number forms the secondary context.
                    </p>
                  )}
                </div>

                {/* DETAILED VIBRATIONAL CREATION PARAGRAPH */}
                <div className="space-y-2 border-t border-slate-100 pt-4 text-xs md:text-sm text-slate-700 leading-relaxed">
                  <h4 className="font-serif font-bold text-slate-900 text-sm">Vibrational Atmosphere & Impact:</h4>
                  <p>{parsedHouse.reading.whatItCreates}</p>
                </div>

                {/* HEALTH & WELLBEING */}
                <div className="p-4 bg-slate-900 text-amber-100 rounded-2xl space-y-2 text-xs md:text-sm">
                  <span className="font-bold text-amber-300 block text-xs uppercase tracking-wider">
                    Health & Domestic Wellbeing Tendencies
                  </span>
                  <p className="leading-relaxed">{parsedHouse.reading.healthAndWellbeing}</p>
                </div>
              </div>

              {/* SIDEBAR ANALYSIS: COMPATIBILITY & BEST FOR */}
              <div className="space-y-6">
                {/* LIFE PATH COMPATIBILITY */}
                {parsedHouse.compatibilityWithLifePath && (
                  <div className={`p-6 rounded-3xl border shadow-xs space-y-3 ${
                    parsedHouse.compatibilityWithLifePath.isBest
                      ? "bg-emerald-50/80 border-emerald-300 text-emerald-950"
                      : parsedHouse.compatibilityWithLifePath.isAvoid
                      ? "bg-rose-50/80 border-rose-300 text-rose-950"
                      : "bg-white border-slate-200 text-slate-800"
                  }`}>
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-xs uppercase tracking-wider font-mono">Life Path Alignment</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono ${
                        parsedHouse.compatibilityWithLifePath.isBest
                          ? "bg-emerald-200 text-emerald-900 font-bold"
                          : parsedHouse.compatibilityWithLifePath.isAvoid
                          ? "bg-rose-200 text-rose-900 font-bold"
                          : "bg-slate-200 text-slate-800"
                      }`}>
                        {parsedHouse.compatibilityWithLifePath.isBest ? "HARMONIOUS" : parsedHouse.compatibilityWithLifePath.isAvoid ? "INCOMPATIBLE" : "NEUTRAL"}
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed">
                      {parsedHouse.compatibilityWithLifePath.explanation}
                    </p>
                  </div>
                )}

                {/* BEST FOR PANEL */}
                <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-4 text-xs">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    <h4 className="font-serif font-bold text-slate-900 text-sm">Optimal Household Applications</h4>
                  </div>

                  <div>
                    <span className="font-bold text-emerald-800 block text-[11px] uppercase tracking-wider mb-1">Most Suitable For:</span>
                    <ul className="space-y-1 text-slate-700">
                      {parsedHouse.reading.bestFor.map((item, idx) => (
                        <li key={idx}>✓ {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-rose-800 block text-[11px] uppercase tracking-wider mb-1">Less Suitable For:</span>
                    <ul className="space-y-1 text-slate-700">
                      {parsedHouse.reading.notIdealFor.map((item, idx) => (
                        <li key={idx}>✕ {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* REMEDIAL HIGHLIGHTS */}
                <div className="bg-amber-50/80 p-6 rounded-3xl border border-amber-300 space-y-3 text-xs">
                  <span className="font-bold text-amber-950 block text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    Quick Vastu & Decorative Guidance
                  </span>
                  <ul className="space-y-1.5 text-amber-900">
                    {parsedHouse.reading.remediesAndGuidance.map((rem, idx) => (
                      <li key={idx}>• {rem}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white rounded-3xl border border-slate-200 text-slate-500 text-center text-sm">
              Please enter a valid house number or flat address above to generate the full Chaldean analysis.
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: PRIMARY HOUSE READINGS (1 TO 9) */}
      {/* ======================================================== */}
      {activeTab === "readings_lib" && (
        <div className="space-y-6">
          <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-300 text-xs md:text-sm text-amber-950 leading-relaxed">
            <span className="font-bold block text-amber-900 text-sm mb-1">Complete Detailed Readings for House Numbers 1 to 9</span>
            The House Primary Number establishes the living vibration of your dwelling. Each digit creates a unique environment for health, relationships, career ambition, and personal peace.
          </div>

          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => setSelectedNum(selectedNum === num ? null : num)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedNum === num
                    ? "bg-amber-900 text-white shadow-md scale-105"
                    : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
                }`}
              >
                House Primary {num}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.values(HOUSE_PRIMARY_READINGS)
              .filter(r => selectedNum === null || r.number === selectedNum)
              .map((r) => (
                <div
                  key={r.number}
                  className="bg-white p-6 md:p-8 rounded-3xl border border-amber-900/10 shadow-xs space-y-4 hover:border-amber-400 transition-all"
                >
                  <div className="flex justify-between items-start border-b border-amber-900/10 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                        {r.frequencyName}
                      </span>
                      <h3 className="font-serif text-lg md:text-xl font-bold text-slate-900 mt-1">
                        {r.title}
                      </h3>
                    </div>
                    <span className="text-2xl font-serif font-bold text-amber-900 bg-amber-50 w-12 h-12 rounded-2xl border border-amber-200 flex items-center justify-center shadow-xs">
                      {r.number}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs md:text-sm text-slate-700 leading-relaxed">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Living Atmosphere & Vibrational Influence:</span>
                      <p>{r.whatItCreates}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-emerald-900 block">Best Suited For:</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {r.bestFor.map((item, idx) => (
                          <span key={idx} className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-lg text-[11px] font-medium">
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-rose-900 block">Not Ideal For:</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {r.notIdealFor.map((item, idx) => (
                          <span key={idx} className="bg-rose-50 text-rose-900 border border-rose-200 px-2.5 py-1 rounded-lg text-[11px] font-medium">
                            ✕ {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 text-amber-100 rounded-2xl text-xs space-y-1">
                      <span className="font-bold text-amber-300 block">Health & Bodily Wellbeing Profile:</span>
                      <p className="leading-relaxed">{r.healthAndWellbeing}</p>
                    </div>

                    <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs">
                      <span className="font-bold text-amber-950 block">Operational Challenges to Manage:</span>
                      <p className="text-slate-700 mt-0.5">{r.challenges}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: MASTER & KARMIC DEBT HOUSES */}
      {/* ======================================================== */}
      {activeTab === "master_karmic" && (
        <div className="space-y-8">
          {/* MASTER HOUSES */}
          <div className="space-y-4">
            <div className="border-b border-indigo-900/10 pb-2">
              <span className="text-xs font-bold text-indigo-800 bg-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">
                MASTER NUMBER HOUSES
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                High-Frequency Master Number Dwellings (11, 22, 33)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(MASTER_HOUSE_READINGS).map(([mCode, mData]) => (
                <div key={mCode} className="bg-white p-6 rounded-3xl border border-indigo-900/10 shadow-xs space-y-3">
                  <span className="text-2xl font-serif font-bold text-indigo-900 bg-indigo-50 w-10 h-10 rounded-xl border border-indigo-200 flex items-center justify-center">
                    {mCode}
                  </span>
                  <h3 className="font-serif font-bold text-base text-slate-900">{mData.title}</h3>
                  <p className="text-xs text-indigo-900 font-bold">{mData.energy}</p>
                  <p className="text-xs text-slate-700 leading-relaxed">{mData.description}</p>
                  <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200 text-xs text-indigo-950">
                    <strong>Guidance:</strong> {mData.guidance}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KARMIC DEBT HOUSES */}
          <div className="space-y-4">
            <div className="border-b border-rose-900/10 pb-2">
              <span className="text-xs font-bold text-rose-800 bg-rose-100 px-3 py-1 rounded-full uppercase tracking-wider">
                KARMIC DEBT HOUSES
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                Karmic Debt Compound Dwellings (13, 14, 16, 19)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(KARMIC_DEBT_HOUSES).map(([kCode, kData]) => (
                <div key={kCode} className="bg-white p-6 rounded-3xl border border-rose-900/10 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 border-b border-rose-100 pb-2">
                    <span className="text-lg font-serif font-bold text-rose-900 bg-rose-50 px-3 py-1 rounded-xl border border-rose-200">
                      House {kCode}
                    </span>
                    <h3 className="font-serif font-bold text-sm text-slate-900">{kData.name}</h3>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{kData.lesson}</p>
                  <div className="p-3 bg-rose-50/80 rounded-xl border border-rose-200 text-xs text-rose-950">
                    <strong>Remedy Protocol:</strong> {kData.remedy}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: LIFE PATH COMPATIBILITY MATRIX */}
      {/* ======================================================== */}
      {activeTab === "compatibility" && (
        <div className="space-y-6">
          <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-300 text-xs md:text-sm text-emerald-950 leading-relaxed">
            <span className="font-bold block text-emerald-900 text-sm mb-1">Life Path & House Number Alignment Matrix</span>
            Matching your house number with your Life Path creates long-term harmony, enabling you to rest, recover, and build your life without energetic friction.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(HOUSE_LIFE_PATH_COMPATIBILITY).map(([lpStr, comp]) => (
              <div key={lpStr} className="bg-white p-6 rounded-3xl border border-emerald-900/10 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-900/10 pb-2">
                  <span className="font-serif font-bold text-base text-slate-900">
                    Life Path {lpStr}
                  </span>
                  <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Resonance Guide
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-emerald-800 block">Harmonious House Numbers:</span>
                    <div className="flex gap-1.5 pt-1">
                      {comp.best.map((num) => (
                        <span key={num} className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-950 font-bold flex items-center justify-center border border-emerald-300">
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-rose-800 block">Incompatible Numbers to Avoid:</span>
                    <div className="flex gap-1.5 pt-1">
                      {comp.avoid.map((num) => (
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
      {/* TAB 5: LIFE STAGE GUIDANCE */}
      {/* ======================================================== */}
      {activeTab === "life_stages" && (
        <div className="space-y-6">
          <div className="bg-purple-50/80 p-5 rounded-2xl border border-purple-300 text-xs md:text-sm text-purple-950 leading-relaxed">
            <span className="font-bold block text-purple-900 text-sm mb-1">House Selection across Major Life Stages</span>
            Different phases of life prioritize different energetic qualities—from childhood learning and career building to raising families and peaceful retirement.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {LIFE_STAGE_HOUSE_RECOMMENDATIONS.map((stageItem, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-purple-900/10 shadow-xs space-y-3">
                <div className="border-b border-purple-900/10 pb-2">
                  <h3 className="font-serif font-bold text-base text-slate-900">{stageItem.stage}</h3>
                  <span className="text-xs text-purple-900 font-bold block mt-0.5">Recommended: {stageItem.recommended}</span>
                </div>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  {stageItem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: REMEDIES & VASTU */}
      {/* ======================================================== */}
      {activeTab === "remedies" && (
        <div className="space-y-6">
          {/* Four Calculation Methods Overview */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-amber-900/10 shadow-xs space-y-6">
            <div className="border-b border-amber-900/10 pb-3">
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
                CHALDEAN HOUSE METHODS
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                Evaluation Methods for Independent Houses & Apartments
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm">
              {CHAPTER_THIRTY_THEORY.fourMethodsSummary.map((m, idx) => (
                <div key={idx} className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-2">
                  <span className="font-bold text-amber-950 block text-sm">{m.name}</span>
                  <p className="text-slate-700 leading-relaxed">{m.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Vastu & Gemstone Remedies */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-rose-900/10 shadow-xs space-y-6">
            <div className="border-b border-rose-900/10 pb-3">
              <span className="text-xs font-bold text-rose-800 bg-rose-100 px-3 py-1 rounded-full uppercase tracking-wider">
                REMEDIAL PROTOCOLS
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                Vastu, Gemstones, Plant & Color Remedies for Homes
              </h2>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed">
              <div className="p-5 bg-amber-50/80 rounded-2xl border border-amber-300 space-y-2">
                <span className="font-bold text-amber-950 block text-sm flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-700" />
                  Gemstone & Sacred Object Placements
                </span>
                <p>
                  • <strong>House 1:</strong> Place Red Coral near main entrance for warm leadership.<br />
                  • <strong>House 2:</strong> Place Pearl or Moonstone in primary bedroom for emotional peace.<br />
                  • <strong>House 3:</strong> Place Yellow Sapphire in study area to focus creative output.<br />
                  • <strong>House 4:</strong> Place Blue Sapphire or Amethyst in home office for practical discipline.<br />
                  • <strong>House 5:</strong> Place Emerald near main windows to stabilize dynamic energy.<br />
                  • <strong>House 6:</strong> Place White Zircon or Diamond in living rooms for loving harmony.<br />
                  • <strong>House 7:</strong> Place Cat's Eye in meditation nook to deepen spiritual focus.<br />
                  • <strong>House 8:</strong> Place Blue Sapphire or Tiger's Eye in executive work zones.<br />
                  • <strong>House 9:</strong> Place Red Coral near practical management areas (kitchen/office).
                </p>
              </div>

              <div className="p-5 bg-emerald-50/80 rounded-2xl border border-emerald-300 space-y-2">
                <span className="font-bold text-emerald-950 block text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Botanical & Plant Remedies
                </span>
                <p>
                  • <strong>Houses Needing Warmth (1, 7, 8):</strong> Marigolds, gerberas, and bright flowering plants near entrances.<br />
                  • <strong>Houses Needing Stability (3, 5, 9):</strong> Large-leafed rubber plants, peace lilies, and snake plants.<br />
                  • <strong>Houses Needing Prosperity (4, 6):</strong> Money plants (Pothos), jade plants, and fresh bamboo in northern/eastern corners.<br />
                  • <strong>Houses Needing Clarity (2, 7):</strong> Jasmine, mint, and rosemary near quiet seating areas.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
