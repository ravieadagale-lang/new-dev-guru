import React, { useState } from "react";
import { 
  Smartphone, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  BookOpen, 
  Calendar, 
  ShieldCheck, 
  Compass, 
  Flame, 
  Award,
  ArrowRight,
  Zap,
  Repeat,
  Share2
} from "lucide-react";
import { 
  evaluateMobileNumber, 
  PRIMARY_MOBILE_READINGS, 
  MOBILE_LIFE_PATH_COMPATIBILITY, 
  DOMAIN_MOBILE_RECOMMENDATIONS, 
  CHAPTER_TWENTY_EIGHT_THEORY,
  MobileCalculationResult
} from "../data/mobileNumerologyData";

interface MobileNumerologyViewProps {
  initialPrimaryMobile?: string;
  initialSecondaryMobile?: string;
  initialDob?: string;
  userProfile?: any;
  selectedLanguage?: any;
}

export const MobileNumerologyView: React.FC<MobileNumerologyViewProps> = ({
  initialPrimaryMobile = "9876543210",
  initialSecondaryMobile = "9823456781",
  initialDob = "15/08/1947",
  userProfile
}) => {
  const [primaryMobile, setPrimaryMobile] = useState(initialPrimaryMobile);
  const [secondaryMobile, setSecondaryMobile] = useState(initialSecondaryMobile);
  const [dob, setDob] = useState(userProfile?.dob || initialDob);

  const [activeTab, setActiveTab] = useState<"analysis" | "readings_lib" | "compatibility_matrix" | "domains" | "theory_remedies">("analysis");
  const [selectedReadingsNum, setSelectedReadingsNum] = useState<number | null>(null);

  // Compute Life Path Number from DOB (standard sum reduction)
  const computeLifePath = (dateStr: string): number => {
    const digits = dateStr.replace(/[^0-9]/g, "").split("").map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = String(sum).split("").map(Number).reduce((a, b) => a + b, 0);
    }
    return sum;
  };

  const lifePathNumber = computeLifePath(dob);

  // Evaluate Primary & Secondary
  const primaryResult = evaluateMobileNumber(primaryMobile, lifePathNumber);
  const secondaryResult = evaluateMobileNumber(secondaryMobile, lifePathNumber);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* CHAPTER BANNER */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-indigo-50 p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
              {CHAPTER_TWENTY_EIGHT_THEORY.chapterNumber}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-indigo-100 text-xs font-medium">
              Applied Chaldean Numerology
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-indigo-100 tracking-tight">
            {CHAPTER_TWENTY_EIGHT_THEORY.title}
          </h1>

          <blockquote className="border-l-2 border-indigo-400/60 pl-4 py-1 italic text-indigo-200/90 text-sm md:text-base font-serif">
            "{CHAPTER_TWENTY_EIGHT_THEORY.quote.text}"
            <footer className="text-xs text-indigo-400 mt-1 not-italic font-sans font-medium">
              — {CHAPTER_TWENTY_EIGHT_THEORY.quote.author}
            </footer>
          </blockquote>

          <p className="text-xs md:text-sm text-indigo-100/80 leading-relaxed max-w-4xl">
            In contemporary life, your mobile phone number is dialled, stored, and broadcast hundreds of times per month. Its total digit sum, last digit signature, opening first digit, and Chaldean compound totals construct a continuous vibrational field around your identity.
          </p>
        </div>
      </div>

      {/* INPUT CONTROLLER PANEL: PRIMARY & SECONDARY MOBILE NUMBERS */}
      <div className="bg-white p-6 rounded-3xl border border-indigo-900/10 shadow-xs space-y-4">
        <div className="flex items-center gap-3 border-b border-indigo-900/10 pb-3">
          <div className="p-2.5 bg-indigo-100 text-indigo-900 rounded-2xl">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-slate-900 text-base">Mobile Numbers Input Controller</h3>
            <p className="text-xs text-slate-500">Analyze Primary and Secondary mobile lines against your Life Path Number.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Primary Mobile Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              1. Primary Mobile Number
            </label>
            <input
              type="text"
              value={primaryMobile}
              onChange={(e) => setPrimaryMobile(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full px-4 py-2.5 bg-indigo-50/50 border border-indigo-900/20 rounded-xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-[11px] text-slate-500 block">Main personal / business line</span>
          </div>

          {/* Secondary Mobile Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              2. Secondary Mobile Number
            </label>
            <input
              type="text"
              value={secondaryMobile}
              onChange={(e) => setSecondaryMobile(e.target.value)}
              placeholder="e.g. 9823456781"
              className="w-full px-4 py-2.5 bg-amber-50/50 border border-amber-900/20 rounded-xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <span className="text-[11px] text-slate-500 block">Alternate, WhatsApp, or confidential line</span>
          </div>

          {/* Birth Date Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Birth Date (For Life Path)
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
          <span>Active Lines Analysis</span>
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
          <span>Primary Readings (1 to 9)</span>
        </button>

        <button
          onClick={() => setActiveTab("compatibility_matrix")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "compatibility_matrix"
              ? "bg-amber-900 text-amber-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-indigo-50 border border-indigo-900/10"
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>Life Path Compatibility</span>
        </button>

        <button
          onClick={() => setActiveTab("domains")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "domains"
              ? "bg-emerald-900 text-emerald-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-indigo-50 border border-indigo-900/10"
          }`}
        >
          <Compass className="w-4 h-4 text-emerald-400" />
          <span>Domain Recommendations</span>
        </button>

        <button
          onClick={() => setActiveTab("theory_remedies")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "theory_remedies"
              ? "bg-rose-900 text-rose-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-indigo-50 border border-indigo-900/10"
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-rose-400" />
          <span>4 Methods & Remedies</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: ACTIVE LINES ANALYSIS */}
      {/* ======================================================== */}
      {activeTab === "analysis" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* PRIMARY MOBILE CARD */}
            {primaryResult ? (
              <MobileResultCard title="1. Primary Mobile Line" result={primaryResult} isPrimary={true} />
            ) : (
              <div className="p-6 bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs text-center">
                Please enter a valid Primary Mobile Number (at least 7 digits).
              </div>
            )}

            {/* SECONDARY MOBILE CARD */}
            {secondaryResult ? (
              <MobileResultCard title="2. Secondary Mobile Line" result={secondaryResult} isPrimary={false} />
            ) : (
              <div className="p-6 bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs text-center">
                Enter a Secondary Mobile Number above to compare lines.
              </div>
            )}
          </div>

          {/* COMPARATIVE SYNTHESIS */}
          {primaryResult && secondaryResult && (
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 md:p-8 rounded-3xl text-indigo-100 space-y-4 border border-indigo-500/20">
              <div className="flex items-center gap-2">
                <Repeat className="w-5 h-5 text-indigo-400" />
                <h3 className="font-serif font-bold text-lg text-indigo-100">
                  Primary vs Secondary Mobile Frequency Synthesis
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm leading-relaxed">
                <div className="p-4 bg-white/5 rounded-2xl border border-indigo-400/20 space-y-2">
                  <span className="font-bold text-amber-300 block">Primary Line Role:</span>
                  <p>
                    Vibrates to <strong>Primary Number {primaryResult.primaryNumber}</strong> ({primaryResult.reading.frequencyName}). This is your primary public broadcasting antenna for business contracts and external inquiries.
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-indigo-400/20 space-y-2">
                  <span className="font-bold text-indigo-300 block">Secondary Line Role:</span>
                  <p>
                    Vibrates to <strong>Primary Number {secondaryResult.primaryNumber}</strong> ({secondaryResult.reading.frequencyName}). This serves as your backup, private, or specialized communication frequency.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: ALL 9 PRIMARY MOBILE READINGS */}
      {/* ======================================================== */}
      {activeTab === "readings_lib" && (
        <div className="space-y-6">
          <div className="bg-indigo-50/80 p-5 rounded-2xl border border-indigo-300 text-xs md:text-sm text-indigo-950 leading-relaxed">
            <span className="font-bold block text-indigo-900 text-sm mb-1">PART TWO — Complete Readings for Each Primary Mobile Number (1 to 9)</span>
            The Primary Number is calculated by summing all 10 digits of the phone number and reducing to a single root digit. Each digit establishes a unique vibrational environment around callers and communications.
          </div>

          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => setSelectedReadingsNum(selectedReadingsNum === num ? null : num)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedReadingsNum === num
                    ? "bg-indigo-900 text-white shadow-md scale-105"
                    : "bg-white text-slate-700 hover:bg-indigo-50 border border-indigo-900/10"
                }`}
              >
                Mobile Digit {num}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.values(PRIMARY_MOBILE_READINGS)
              .filter(r => selectedReadingsNum === null || r.number === selectedReadingsNum)
              .map((r) => (
                <div
                  key={r.number}
                  className="bg-white p-6 rounded-3xl border border-indigo-900/10 shadow-xs space-y-4 hover:border-indigo-400 transition-all"
                >
                  <div className="flex justify-between items-start border-b border-indigo-900/10 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                        {r.frequencyName}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-slate-900 mt-1">
                        {r.title}
                      </h3>
                    </div>
                    <span className="text-xl font-serif font-bold text-indigo-900 bg-indigo-50 w-10 h-10 rounded-2xl border border-indigo-200 flex items-center justify-center shadow-xs">
                      {r.number}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs md:text-sm text-slate-700 leading-relaxed">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">What Mobile Number {r.number} Creates:</span>
                      <p>{r.whatItCreates}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-emerald-900 block">Best Suited For:</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(r?.bestFor || []).map((item, idx) => (
                          <span key={idx} className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-lg text-[11px] font-medium">
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-rose-900 block">Avoid For:</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(r?.avoidFor || []).map((item, idx) => (
                          <span key={idx} className="bg-rose-50 text-rose-900 border border-rose-200 px-2.5 py-1 rounded-lg text-[11px] font-medium">
                            ✕ {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs">
                      <span className="font-bold text-amber-950 block">Specific Challenges:</span>
                      <p className="text-slate-700 mt-0.5">{r.challenges}</p>
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
      {activeTab === "compatibility_matrix" && (
        <div className="space-y-6">
          <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-300 text-xs md:text-sm text-amber-950 leading-relaxed">
            <span className="font-bold block text-amber-900 text-sm mb-1">PART THREE — Life Path & Mobile Primary Compatibility</span>
            Aligning your Primary Mobile Number with your core Life Path Number ensures that every call supports your soul's highest purpose without vibrational friction.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(MOBILE_LIFE_PATH_COMPATIBILITY).map(([lpStr, comp]) => (
              <div key={lpStr} className="bg-white p-5 rounded-3xl border border-amber-900/10 shadow-xs space-y-3">
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
                    <span className="font-bold text-emerald-800 block">Best Mobile Numbers:</span>
                    <div className="flex gap-1.5 pt-1">
                      {(comp?.best || []).map((num) => (
                        <span key={num} className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-950 font-bold flex items-center justify-center border border-emerald-300">
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-rose-800 block">Numbers to Avoid:</span>
                    <div className="flex gap-1.5 pt-1">
                      {(comp?.avoid || []).map((num) => (
                        <span key={num} className="w-7 h-7 rounded-lg bg-rose-100 text-rose-950 font-bold flex items-center justify-center border border-rose-300">
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
                    {comp.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: DOMAIN RECOMMENDATIONS */}
      {/* ======================================================== */}
      {activeTab === "domains" && (
        <div className="space-y-6">
          <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-300 text-xs md:text-sm text-emerald-950 leading-relaxed">
            <span className="font-bold block text-emerald-900 text-sm mb-1">PART FIVE — Best Mobile Numbers for Specific Life Domains</span>
            Depending on your primary intention (corporate growth, romantic relationship building, health, or spiritual growth), choose a mobile Primary Number calibrated for that specific domain.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {DOMAIN_MOBILE_RECOMMENDATIONS.map((dom, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-emerald-900/10 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
                  <h3 className="font-serif font-bold text-base text-slate-900">{dom.domain}</h3>
                  <div className="flex items-center gap-1">
                    {(dom?.optimalPrimary || []).map((num) => (
                      <span key={num} className="w-7 h-7 rounded-xl bg-emerald-900 text-amber-300 font-bold text-xs flex items-center justify-center border border-emerald-500 shadow-xs">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  {dom.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: THEORY, 4 METHODS & REMEDIES */}
      {/* ======================================================== */}
      {activeTab === "theory_remedies" && (
        <div className="space-y-6">
          {/* Four Calculation Methods Overview */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-indigo-900/10 shadow-xs space-y-6">
            <div className="border-b border-indigo-900/10 pb-3">
              <span className="text-xs font-bold text-indigo-800 bg-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">
                CHALDEAN CALCULATION METHODS
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                The Four Dimensions of Mobile Number Analysis
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm">
              {CHAPTER_TWENTY_EIGHT_THEORY.fourMethodsSummary.map((m, idx) => (
                <div key={idx} className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-200 space-y-2">
                  <span className="font-bold text-indigo-950 block text-sm">{m.name}</span>
                  <p className="text-slate-700 leading-relaxed">{m.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Karmic Debt Remedies & Number Wrapper Technique */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-rose-900/10 shadow-xs space-y-6">
            <div className="border-b border-rose-900/10 pb-3">
              <span className="text-xs font-bold text-rose-800 bg-rose-100 px-3 py-1 rounded-full uppercase tracking-wider">
                REMEDIAL PROTOCOLS
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                Remedies for Unfavourable or Karmic Mobile Numbers
              </h2>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed">
              <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-300 space-y-2">
                <span className="font-bold text-rose-950 block text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Karmic Debt Compounds in Mobile Totals (13, 14, 16, 19)
                </span>
                <p>
                  • <strong>Compound 13:</strong> Obstacles near project completion. Remedy: Wear Hessonite (Gomed) and chant 'Om Gam Ganapataye Namaha' 108x on Wednesdays.<br />
                  • <strong>Compound 14:</strong> Risk of scattered focus. Remedy: Wear Emerald (Panna) and practice intentional moderation.<br />
                  • <strong>Compound 16:</strong> Sudden disruption in inauthentic setups. Remedy: Wear Cat's Eye (Lehsunia) and practice absolute transparency.<br />
                  • <strong>Compound 19:</strong> Isolation in leadership. Remedy: Wear Ruby (Manik) and actively seek collaborative teamwork.
                </p>
              </div>

              <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-300 space-y-2">
                <span className="font-bold text-amber-950 block text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  The Number Wrapper Technique (+91 Prefix)
                </span>
                <p>
                  {CHAPTER_TWENTY_EIGHT_THEORY.numberWrapperTechniqueText} For example, appending country code digits (+91 = 10) on business cards and digital signatures shifts the written compound total away from Karmic Debts while retaining your existing dialled line.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* INTERNAL COMPONENT: MOBILE RESULT CARD */
const MobileResultCard: React.FC<{ title: string; result: MobileCalculationResult; isPrimary: boolean }> = ({ title, result, isPrimary }) => {
  return (
    <div className={`p-6 rounded-3xl border shadow-xs space-y-5 transition-all ${
      isPrimary 
        ? "bg-white border-indigo-900/20 hover:border-indigo-400" 
        : "bg-white border-amber-900/20 hover:border-amber-400"
    }`}>
      {/* HEADER */}
      <div className="flex justify-between items-start border-b border-slate-100 pb-3">
        <div>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
            isPrimary ? "bg-indigo-100 text-indigo-900" : "bg-amber-100 text-amber-900"
          }`}>
            {title}
          </span>
          <h3 className="font-mono text-xl md:text-2xl font-bold text-slate-900 mt-1 tracking-wider">
            {result.cleanedDigits}
          </h3>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-1.5 justify-end">
            <span className="text-xs text-slate-500 uppercase font-mono">Primary:</span>
            <span className="text-2xl font-serif font-bold text-indigo-900 bg-indigo-50 w-9 h-9 rounded-xl border border-indigo-200 flex items-center justify-center">
              {result.primaryNumber}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono block mt-0.5">Sum: {result.digitSum} → Compound: {result.compoundNumber}</span>
        </div>
      </div>

      {/* FREQUENCY TITLE */}
      <div className="p-3 bg-indigo-50/60 rounded-2xl border border-indigo-200/80">
        <span className="font-serif font-bold text-indigo-950 text-sm block">
          {result.reading.title}
        </span>
        <span className="text-xs text-indigo-800 font-medium block">
          {result.reading.frequencyName}
        </span>
      </div>

      {/* KARMIC DEBT OR AUSPICIOUS COMPOUND ALERTS */}
      {result.isKarmicDebt && (
        <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-900 space-y-1">
          <span className="font-bold flex items-center gap-1 text-rose-950">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            Karmic Debt Compound {result.karmicDebtCode} Detected
          </span>
          <p className="text-[11px] leading-relaxed">
            Intermediate digit sum produces Karmic Debt {result.karmicDebtCode}. Review the remedies tab or apply the Number Wrapper technique (+91 prefix).
          </p>
        </div>
      )}

      {result.isAuspiciousCompound && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 space-y-1">
          <span className="font-bold flex items-center gap-1 text-emerald-950">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Auspicious Chaldean Compound {result.auspiciousCompoundCode} Detected
          </span>
          <p className="text-[11px] leading-relaxed">
            Highly fortunate Chaldean compound sum attracting natural goodwill, support, and resource flow.
          </p>
        </div>
      )}

      {/* LIFE PATH COMPATIBILITY */}
      {result.compatibilityWithLifePath && (
        <div className={`p-3 rounded-2xl border text-xs space-y-1 ${
          result.compatibilityWithLifePath.isBest
            ? "bg-emerald-50 border-emerald-300 text-emerald-950"
            : result.compatibilityWithLifePath.isAvoid
            ? "bg-rose-50 border-rose-300 text-rose-950"
            : "bg-slate-50 border-slate-200 text-slate-800"
        }`}>
          <div className="flex justify-between items-center font-bold">
            <span>Life Path {result.compatibilityWithLifePath.lifePath} Alignment:</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-mono ${
              result.compatibilityWithLifePath.isBest
                ? "bg-emerald-200 text-emerald-900 font-bold"
                : result.compatibilityWithLifePath.isAvoid
                ? "bg-rose-200 text-rose-900 font-bold"
                : "bg-slate-200 text-slate-800"
            }`}>
              {result.compatibilityWithLifePath.isBest ? "HARMONIOUS" : result.compatibilityWithLifePath.isAvoid ? "INCOMPATIBLE" : "NEUTRAL"}
            </span>
          </div>
          <p className="text-[11px] leading-relaxed">{result.compatibilityWithLifePath.explanation}</p>
        </div>
      )}

      {/* OPENING (FIRST DIGIT) & SIGNATURE (LAST DIGIT) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
          <span className="font-bold text-slate-900 block font-mono">Opening First Digit ({result.firstDigit}):</span>
          <p className="text-slate-600 text-[11px] leading-relaxed">{result.firstDigitMeaning}</p>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
          <span className="font-bold text-slate-900 block font-mono">Last Digit Signature ({result.lastDigit}):</span>
          <p className="text-slate-600 text-[11px] leading-relaxed">{result.lastDigitMeaning}</p>
        </div>
      </div>

      {/* SPECIAL PATTERNS */}
      {((result?.specialPatterns?.repeatingDigits?.length ?? 0) > 0 || result?.specialPatterns?.isSequential || result?.specialPatterns?.hasSpecialAuspiciousCode) && (
        <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-300 space-y-1.5 text-xs">
          <span className="font-bold text-amber-950 block">Special Number Patterns Detected:</span>
          
          {(result?.specialPatterns?.repeatingDigits || []).map((rd) => (
            <div key={rd.digit} className="text-[11px] text-amber-900 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Digit {rd.digit} appears {rd.count}x in grid (Concentrated density)</span>
            </div>
          ))}

          {result.specialPatterns.isSequential && (
            <p className="text-[11px] text-amber-900">{result.specialPatterns.sequenceDescription}</p>
          )}

          {result.specialPatterns.hasSpecialAuspiciousCode && (
            <p className="text-[11px] text-emerald-800 font-bold">{result.specialPatterns.hasSpecialAuspiciousCode}</p>
          )}
        </div>
      )}

      {/* WHAT IT CREATES */}
      <div className="space-y-1 text-xs text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
        <span className="font-bold text-slate-900 block">Vibrational Impact:</span>
        <p>{result.reading.whatItCreates}</p>
      </div>
    </div>
  );
};
