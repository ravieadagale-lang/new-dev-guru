// src/components/BrandNumerologyView.tsx
import React, { useState } from "react";
import { 
  Briefcase, 
  Sparkles, 
  Award, 
  Layers, 
  ShieldCheck, 
  BookOpen, 
  UserCheck, 
  AlertTriangle, 
  Calendar, 
  Palette, 
  Key, 
  TrendingUp, 
  Target, 
  FileText,
  Type,
  PenTool
} from "lucide-react";
import { 
  parseAndEvaluateBrandName, 
  BRAND_PRIMARY_READINGS, 
  CHALDEAN_BRAND_COMPOUNDS, 
  BRAND_FOUNDER_COMPATIBILITY, 
  LOGO_NUMEROLOGY_GUIDE, 
  SEVEN_STEP_BRAND_ASSESSMENT_PROTOCOL, 
  CHAPTER_THIRTY_ONE_THEORY,
  BrandParsedData
} from "../data/brandNumerologyData";

interface BrandNumerologyViewProps {
  initialBrandName?: string;
  initialTagline?: string;
  initialDob?: string;
}

export const BrandNumerologyView: React.FC<BrandNumerologyViewProps> = ({
  initialBrandName = "HAPPY FACES",
  initialTagline = "WE MAKE YOU SMILE",
  initialDob = "15/08/1947"
}) => {
  const [brandNameInput, setBrandNameInput] = useState(initialBrandName);
  const [taglineInput, setTaglineInput] = useState(initialTagline);
  const [founderDob, setFounderDob] = useState(initialDob);

  const [activeTab, setActiveTab] = useState<"analysis" | "readings_lib" | "compounds" | "logo_tagline" | "founder_matrix" | "brand_correction">("analysis");
  const [selectedNum, setSelectedNum] = useState<number | null>(null);

  const parsedBrand = parseAndEvaluateBrandName(brandNameInput, taglineInput, founderDob);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* CHAPTER HEADER BANNER */}
      <div className="bg-gradient-to-br from-slate-950 via-amber-950 to-slate-900 text-amber-50 p-6 md:p-8 rounded-3xl shadow-xl border border-amber-500/20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
              {CHAPTER_THIRTY_ONE_THEORY.chapterNumber}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-amber-100 text-xs font-medium">
              Applied Commercial Chaldean System
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-amber-100 tracking-tight">
            {CHAPTER_THIRTY_ONE_THEORY.title}
          </h1>

          <blockquote className="border-l-2 border-amber-400/60 pl-4 py-1 italic text-amber-200/90 text-sm md:text-base font-serif">
            "{CHAPTER_THIRTY_ONE_THEORY.quote.text}"
            <footer className="text-xs text-amber-400 mt-1 not-italic font-sans font-medium">
              — {CHAPTER_THIRTY_ONE_THEORY.quote.author}
            </footer>
          </blockquote>

          <p className="text-xs md:text-sm text-amber-100/80 leading-relaxed max-w-4xl">
            Every business name is a vibrational entity broadcasting a specific acoustic frequency into the marketplace. It influences client attraction, market perception, brand trust, and commercial growth. Calculating Chaldean brand numbers, optimizing taglines, aligning logos, and ensuring founder compatibility creates an authentic, high-impact commercial identity.
          </p>
        </div>
      </div>

      {/* BRAND INPUT CONTROLLER PANEL */}
      <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex items-center gap-3 border-b border-amber-900/10 pb-3">
          <div className="p-2.5 bg-amber-100 text-amber-900 rounded-2xl">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-slate-900 text-base">Brand & Business Controller</h3>
            <p className="text-xs text-slate-500">Enter business name, tagline, and founder's birth date for complete Chaldean and Pythagorean evaluation.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Business Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-amber-600" />
              Business / Brand Name
            </label>
            <input
              type="text"
              value={brandNameInput}
              onChange={(e) => setBrandNameInput(e.target.value)}
              placeholder="e.g. TATA MOTORS, INFOSYS, AMUL"
              className="w-full px-4 py-2.5 bg-amber-50/50 border border-amber-900/20 rounded-xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <span className="text-[11px] text-slate-500 block">Evaluates Chaldean & Pythagorean letter acoustic sums</span>
          </div>

          {/* Tagline / Slogan Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-slate-500" />
              Brand Tagline / Slogan (Optional)
            </label>
            <input
              type="text"
              value={taglineInput}
              onChange={(e) => setTaglineInput(e.target.value)}
              placeholder="e.g. WE ALSO MAKE STEEL"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <span className="text-[11px] text-slate-500 block">Secondary vibrational layer reinforcing brand identity</span>
          </div>

          {/* Founder Birth Date Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Founder Birth Date (For Alignment)
            </label>
            <input
              type="text"
              value={founderDob}
              onChange={(e) => setFounderDob(e.target.value)}
              placeholder="DD/MM/YYYY"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <span className="text-[11px] text-amber-800 font-bold block">
              Founder Life Path Alignment Assessment
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
          <span>Brand Analysis</span>
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
          <span>Brand Readings (1 to 9)</span>
        </button>

        <button
          onClick={() => setActiveTab("compounds")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "compounds"
              ? "bg-indigo-900 text-indigo-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Commercial Compounds</span>
        </button>

        <button
          onClick={() => setActiveTab("logo_tagline")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "logo_tagline"
              ? "bg-purple-900 text-purple-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <Palette className="w-4 h-4 text-purple-400" />
          <span>Logo & Taglines</span>
        </button>

        <button
          onClick={() => setActiveTab("founder_matrix")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "founder_matrix"
              ? "bg-emerald-900 text-emerald-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span>Founder Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab("brand_correction")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "brand_correction"
              ? "bg-rose-900 text-rose-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-rose-400" />
          <span>Brand Correction</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: BRAND NAME ANALYSIS */}
      {/* ======================================================== */}
      {activeTab === "analysis" && (
        <div className="space-y-8">
          {parsedBrand ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* MAIN ANALYSIS CARD */}
              <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-amber-900/10 shadow-xs space-y-6">
                <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900">
                      Evaluated Brand Entity
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mt-2 tracking-wider">
                      {parsedBrand.cleanBrandName}
                    </h2>
                  </div>

                  <div className="flex gap-4 text-right">
                    <div>
                      <span className="text-xs text-slate-500 uppercase font-mono block">Chaldean Primary</span>
                      <span className="text-3xl font-serif font-bold text-amber-900 bg-amber-50 w-12 h-12 rounded-2xl border border-amber-200 flex items-center justify-center shadow-xs ml-auto">
                        {parsedBrand.chaldeanPrimary}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-slate-500 uppercase font-mono block">Pythagorean</span>
                      <span className="text-2xl font-serif font-bold text-slate-700 bg-slate-50 w-12 h-12 rounded-2xl border border-slate-200 flex items-center justify-center shadow-xs ml-auto">
                        {parsedBrand.pythagoreanPrimary}
                      </span>
                    </div>
                  </div>
                </div>

                {/* READOUT TITLE & VIBRATIONAL FREQUENCY */}
                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1">
                  <span className="font-serif font-bold text-amber-950 text-base block">
                    {parsedBrand.reading.title}
                  </span>
                  <p className="text-xs md:text-sm text-amber-900 leading-relaxed font-medium">
                    {parsedBrand.reading.frequencyName}
                  </p>
                </div>

                {/* COMPOUND INFORMATION ALERT */}
                {parsedBrand.compoundInfo && (
                  <div className={`p-4 rounded-2xl border text-xs md:text-sm space-y-1 ${
                    parsedBrand.isAuspiciousCompound
                      ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                      : parsedBrand.isCautionaryCompound
                      ? "bg-rose-50 border-rose-300 text-rose-950"
                      : "bg-slate-50 border-slate-300 text-slate-900"
                  }`}>
                    <span className="font-bold flex items-center gap-1.5 text-sm">
                      {parsedBrand.isAuspiciousCompound ? (
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                      ) : parsedBrand.isCautionaryCompound ? (
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                      ) : (
                        <Briefcase className="w-4 h-4 text-slate-600" />
                      )}
                      Chaldean Compound {parsedBrand.chaldeanCompound}: {parsedBrand.compoundInfo.name}
                    </span>
                    <p className="leading-relaxed font-medium">{parsedBrand.compoundInfo.quality}</p>
                    <p className="leading-relaxed opacity-90">{parsedBrand.compoundInfo.commercialImpact}</p>
                  </div>
                )}

                {/* CHALDEAN LETTER BREAKDOWN */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <span className="font-bold text-slate-900 block uppercase font-mono text-[11px] text-amber-800">
                    Acoustic Letter Calculation Breakdown:
                  </span>
                  
                  <div className="flex flex-wrap gap-2">
                    {parsedBrand.chaldeanLetterValues.map((item, idx) => (
                      <div key={idx} className="bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 text-center shadow-2xs">
                        <span className="block font-serif font-bold text-slate-900 text-sm">{item.letter}</span>
                        <span className="block font-mono text-[10px] text-amber-800 font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-slate-700 leading-relaxed pt-1">
                    Chaldean Total: <strong className="font-mono text-slate-900">{parsedBrand.chaldeanSum}</strong> (Compound {parsedBrand.chaldeanCompound}) → Root Digit: <strong className="font-mono text-amber-900">{parsedBrand.chaldeanPrimary}</strong>.
                  </p>
                  <p className="text-slate-600">
                    Pythagorean Destiny Sum: <strong className="font-mono">{parsedBrand.pythagoreanSum}</strong> → Root Digit: <strong className="font-mono text-slate-900">{parsedBrand.pythagoreanPrimary}</strong>.
                  </p>
                </div>

                {/* CORNERSTONE & CAPSTONE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200 space-y-1">
                    <span className="font-bold text-amber-900 uppercase font-mono text-[10px] block">
                      Cornerstone (First Letter)
                    </span>
                    <p className="font-serif font-bold text-slate-900 text-lg">
                      Letter '{parsedBrand.cornerstoneLetter}' (Value {parsedBrand.cornerstoneValue})
                    </p>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Determines the immediate initial impression potential clients form upon first hearing or seeing the brand name.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-700 uppercase font-mono text-[10px] block">
                      Capstone (Last Letter)
                    </span>
                    <p className="font-serif font-bold text-slate-900 text-lg">
                      Letter '{parsedBrand.capstoneLetter}' (Value {parsedBrand.capstoneValue})
                    </p>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Governs the lasting takeaway impression clients carry away after completing commercial interactions.
                    </p>
                  </div>
                </div>

                {/* TAGLINE EVALUATION */}
                {parsedBrand.taglineStr && parsedBrand.taglinePrimary !== undefined && (
                  <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-2 text-xs md:text-sm">
                    <span className="font-bold text-indigo-950 flex items-center gap-1.5">
                      <PenTool className="w-4 h-4 text-indigo-600" />
                      Tagline Vibrational Analysis
                    </span>
                    <p className="font-mono font-bold text-slate-900">"{parsedBrand.taglineStr}"</p>
                    <p className="text-slate-700">
                      Chaldean Sum: <strong className="font-mono">{parsedBrand.taglineChaldeanSum}</strong> → Tagline Root Digit: <strong className="font-mono text-indigo-900">{parsedBrand.taglinePrimary}</strong>.
                    </p>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      The tagline acts as a secondary vibrational layer reinforcing or balancing the primary brand name.
                    </p>
                  </div>
                )}

                {/* WHAT IT CREATES IN MARKETPLACE */}
                <div className="space-y-2 border-t border-slate-100 pt-4 text-xs md:text-sm text-slate-700 leading-relaxed">
                  <h4 className="font-serif font-bold text-slate-900 text-sm">Market Perception & Commercial Impact:</h4>
                  <p>{parsedBrand.reading.whatItCreates}</p>
                </div>

                {/* MARKET POSITIONING */}
                <div className="p-4 bg-slate-900 text-amber-100 rounded-2xl space-y-2 text-xs md:text-sm">
                  <span className="font-bold text-amber-300 block text-xs uppercase tracking-wider">
                    Strategic Market Positioning
                  </span>
                  <p className="leading-relaxed">{parsedBrand.reading.marketPositioning}</p>
                </div>
              </div>

              {/* SIDEBAR: FOUNDER ALIGNMENT & APPLICATIONS */}
              <div className="space-y-6">
                {/* FOUNDER ALIGNMENT PANEL */}
                {parsedBrand.founderCompatibility && (
                  <div className={`p-6 rounded-3xl border shadow-xs space-y-3 ${
                    parsedBrand.founderCompatibility.isBest
                      ? "bg-emerald-50/80 border-emerald-300 text-emerald-950"
                      : parsedBrand.founderCompatibility.isAvoid
                      ? "bg-rose-50/80 border-rose-300 text-rose-950"
                      : "bg-white border-slate-200 text-slate-800"
                  }`}>
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-xs uppercase tracking-wider font-mono">Founder Alignment</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono ${
                        parsedBrand.founderCompatibility.isBest
                          ? "bg-emerald-200 text-emerald-900 font-bold"
                          : parsedBrand.founderCompatibility.isAvoid
                          ? "bg-rose-200 text-rose-900 font-bold"
                          : "bg-slate-200 text-slate-800"
                      }`}>
                        {parsedBrand.founderCompatibility.isBest ? "HARMONIOUS" : parsedBrand.founderCompatibility.isAvoid ? "INCOMPATIBLE" : "NEUTRAL"}
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed">
                      {parsedBrand.founderCompatibility.explanation}
                    </p>
                  </div>
                )}

                {/* OPTIMAL COMMERCIAL APPLICATIONS */}
                <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-4 text-xs">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Target className="w-4 h-4 text-amber-600" />
                    <h4 className="font-serif font-bold text-slate-900 text-sm">Optimal Industry Verticals</h4>
                  </div>

                  <div>
                    <span className="font-bold text-emerald-800 block text-[11px] uppercase tracking-wider mb-1">Most Suitable For:</span>
                    <ul className="space-y-1 text-slate-700">
                      {parsedBrand.reading.bestFor.map((item, idx) => (
                        <li key={idx}>✓ {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-rose-800 block text-[11px] uppercase tracking-wider mb-1">Less Suitable For:</span>
                    <ul className="space-y-1 text-slate-700">
                      {parsedBrand.reading.notIdealFor.map((item, idx) => (
                        <li key={idx}>✕ {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CHALLENGES TO MANAGE */}
                <div className="bg-amber-50/80 p-6 rounded-3xl border border-amber-300 space-y-3 text-xs">
                  <span className="font-bold text-amber-950 block text-sm flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                    Operational Challenges to Manage
                  </span>
                  <p className="text-amber-900 leading-relaxed">
                    {parsedBrand.reading.specificChallenges}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white rounded-3xl border border-slate-200 text-slate-500 text-center text-sm">
              Please enter a valid brand name above to generate the full Chaldean and Pythagorean evaluation.
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: BRAND READINGS (1 TO 9) */}
      {/* ======================================================== */}
      {activeTab === "readings_lib" && (
        <div className="space-y-6">
          <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-300 text-xs md:text-sm text-amber-950 leading-relaxed">
            <span className="font-bold block text-amber-900 text-sm mb-1">Complete Readings for Brand Numbers 1 to 9</span>
            Each Brand Number projects a specific acoustic frequency that dictates market perception, client attraction, and commercial success.
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
                Brand Number {num}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.values(BRAND_PRIMARY_READINGS)
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
                      <span className="font-bold text-slate-900 block">Commercial Atmosphere & Client Perception:</span>
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

                    <div className="p-3 bg-slate-900 text-amber-100 rounded-2xl text-xs space-y-1">
                      <span className="font-bold text-amber-300 block">Market Positioning Advantage:</span>
                      <p className="leading-relaxed">{r.marketPositioning}</p>
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
      {/* TAB 3: COMMERCIAL CHALDEAN COMPOUNDS */}
      {/* ======================================================== */}
      {activeTab === "compounds" && (
        <div className="space-y-6">
          <div className="bg-indigo-50/80 p-5 rounded-2xl border border-indigo-300 text-xs md:text-sm text-indigo-950 leading-relaxed">
            <span className="font-bold block text-indigo-900 text-sm mb-1">Commercial Chaldean Compounds</span>
            The compound number dictates the secondary commercial luck, market protection, or hidden operational risks of a business name.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(CHALDEAN_BRAND_COMPOUNDS).map(([code, data]) => (
              <div
                key={code}
                className={`p-6 rounded-3xl border shadow-xs space-y-3 ${
                  data.category === "auspicious"
                    ? "bg-white border-emerald-300"
                    : data.category === "cautionary"
                    ? "bg-white border-rose-300"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between border-b pb-2">
                  <span className={`text-xl font-serif font-bold px-3 py-1 rounded-xl border ${
                    data.category === "auspicious"
                      ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                      : data.category === "cautionary"
                      ? "bg-rose-50 text-rose-900 border-rose-200"
                      : "bg-slate-50 text-slate-900 border-slate-200"
                  }`}>
                    Compound {code}
                  </span>

                  <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                    data.category === "auspicious"
                      ? "bg-emerald-100 text-emerald-900"
                      : data.category === "cautionary"
                      ? "bg-rose-100 text-rose-900"
                      : "bg-slate-100 text-slate-800"
                  }`}>
                    {data.category}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-sm text-slate-900">{data.name}</h3>
                <p className="text-xs text-slate-700 font-medium">{data.quality}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{data.commercialImpact}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: LOGO & TAGLINE NUMEROLOGY */}
      {/* ======================================================== */}
      {activeTab === "logo_tagline" && (
        <div className="space-y-8">
          {/* LOGO COLORS */}
          <div className="space-y-4">
            <div className="border-b border-purple-900/10 pb-2">
              <span className="text-xs font-bold text-purple-800 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider">
                VISUAL IDENTITY & COLOR NUMEROLOGY
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                Brand Logo Color Correspondences
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {LOGO_NUMEROLOGY_GUIDE.colors.map((col, idx) => (
                <div key={idx} className="bg-white p-5 rounded-3xl border border-purple-900/10 shadow-xs space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="font-serif font-bold text-sm text-slate-900">{col.name}</span>
                    <span className="text-xs font-mono font-bold text-purple-900 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200">
                      Brand {col.number}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono block">Planetary Align: {col.planet}</span>
                  <p className="text-xs text-slate-700 leading-relaxed">{col.effect}</p>
                </div>
              ))}
            </div>
          </div>

          {/* LOGO SHAPES */}
          <div className="space-y-4">
            <div className="border-b border-purple-900/10 pb-2">
              <span className="text-xs font-bold text-purple-800 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider">
                GEOMETRIC LOGO SHAPES
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                Vibrational Geometry of Logo Designs
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LOGO_NUMEROLOGY_GUIDE.shapes.map((shp, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-purple-900/10 shadow-xs space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <h3 className="font-serif font-bold text-sm text-slate-900">{shp.shape}</h3>
                    <span className="text-xs font-mono font-bold text-purple-900 bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-200">
                      Resonates: {shp.numbers}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{shp.effect}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: FOUNDER COMPATIBILITY MATRIX */}
      {/* ======================================================== */}
      {activeTab === "founder_matrix" && (
        <div className="space-y-6">
          <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-300 text-xs md:text-sm text-emerald-950 leading-relaxed">
            <span className="font-bold block text-emerald-900 text-sm mb-1">Founder Life Path & Brand Number Compatibility Matrix</span>
            The founder is the primary vehicle bringing the brand into the marketplace. Aligning the brand number with the founder's Life Path prevents internal friction.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(BRAND_FOUNDER_COMPATIBILITY).map(([lpStr, comp]) => (
              <div key={lpStr} className="bg-white p-6 rounded-3xl border border-emerald-900/10 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-900/10 pb-2">
                  <span className="font-serif font-bold text-base text-slate-900">
                    Founder Life Path {lpStr}
                  </span>
                  <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Resonance Guide
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-emerald-800 block">Harmonious Brand Numbers:</span>
                    <div className="flex gap-1.5 pt-1">
                      {comp.bestBrandNums.map((num) => (
                        <span key={num} className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-950 font-bold flex items-center justify-center border border-emerald-300">
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-rose-800 block">Incompatible Numbers to Avoid:</span>
                    <div className="flex gap-1.5 pt-1">
                      {comp.avoidBrandNums.map((num) => (
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
      {/* TAB 6: BRAND CORRECTION & 7-STEP PROTOCOL */}
      {/* ======================================================== */}
      {activeTab === "brand_correction" && (
        <div className="space-y-8">
          {/* SEVEN STEP ASSESSMENT PROTOCOL */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-amber-900/10 shadow-xs space-y-6">
            <div className="border-b border-amber-900/10 pb-3">
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
                PROFESSIONAL AUDIT PROTOCOL
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                The Seven-Step Brand Assessment Protocol
              </h2>
            </div>

            <div className="space-y-3 text-xs md:text-sm text-slate-700 leading-relaxed">
              {SEVEN_STEP_BRAND_ASSESSMENT_PROTOCOL.map((step, idx) => (
                <div key={idx} className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200">
                  <span className="font-bold text-amber-950 block">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* THREE METHODS OF BRAND NAME CORRECTION */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-rose-900/10 shadow-xs space-y-6">
            <div className="border-b border-rose-900/10 pb-3">
              <span className="text-xs font-bold text-rose-800 bg-rose-100 px-3 py-1 rounded-full uppercase tracking-wider">
                REMEDIAL BRAND METHODOLOGY
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                Three Methods of Brand Name Correction
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs md:text-sm">
              <div className="p-5 bg-rose-50/50 rounded-2xl border border-rose-200 space-y-2">
                <span className="font-bold text-rose-950 block text-sm">1. Minor Spelling Adjustment</span>
                <p className="text-slate-700 leading-relaxed">
                  Modifying letter spellings subtly shifts the Chaldean compound away from cautionary numbers (13, 14, 16) while preserving visual brand recognition.
                </p>
              </div>

              <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-200 space-y-2">
                <span className="font-bold text-amber-950 block text-sm">2. Adding Positioning Qualifiers</span>
                <p className="text-slate-700 leading-relaxed">
                  Adding words like 'Global', 'Solutions', 'Premier', or 'Group' adjusts the total acoustic calculation into an auspicious compound.
                </p>
              </div>

              <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-200 space-y-2">
                <span className="font-bold text-indigo-950 block text-sm">3. Complete Rebranding</span>
                <p className="text-slate-700 leading-relaxed">
                  Recommended when severe Karmic Debt compounds or brand dissonance severely limits commercial growth, requiring a fresh auspicious brand identity.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
