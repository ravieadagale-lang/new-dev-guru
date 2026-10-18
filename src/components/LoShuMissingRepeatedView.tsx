import React, { useState } from "react";
import { 
  AlertCircle, 
  Sparkles, 
  Gem, 
  Volume2, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Flame, 
  RefreshCw,
  Compass,
  Zap,
  ShieldCheck,
  Award
} from "lucide-react";
import { 
  CHAPTER_TWENTY_SEVEN_THEORY_TEXT, 
  MISSING_NUMBERS_DATA, 
  REPEATED_NUMBERS_DATA, 
  evaluateMissingAndRepeatedNumbers,
  MissingNumberDetail,
  RepeatedNumberDetail
} from "../data/loshuMissingRepeatedData";
import { calculateLoShuGridEngine } from "../data/numerologyGrids";

interface LoShuMissingRepeatedViewProps {
  initialDob?: string;
  driverNum?: number;
  conductorNum?: number;
}

export const LoShuMissingRepeatedView: React.FC<LoShuMissingRepeatedViewProps> = ({
  initialDob = "15/08/1947",
  driverNum,
  conductorNum
}) => {
  const [dob, setDob] = useState(initialDob);
  const [activeTab, setActiveTab] = useState<"detected" | "missing_lib" | "repeated_lib" | "theory">("detected");
  const [selectedMissingNum, setSelectedMissingNum] = useState<number | null>(null);
  const [selectedRepeatedNum, setSelectedRepeatedNum] = useState<number | null>(null);

  // Evaluate current DOB
  const evalResult = evaluateMissingAndRepeatedNumbers(dob, driverNum, conductorNum);
  const loShuResult = calculateLoShuGridEngine(dob, driverNum || 1, conductorNum || 1);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* CHAPTER HEADER BANNER */}
      <div className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-amber-50 p-6 md:p-8 rounded-3xl shadow-xl border border-amber-500/20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
              {CHAPTER_TWENTY_SEVEN_THEORY_TEXT.chapterNumber}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-amber-100 text-xs font-medium">
              Presence & Absence Dynamics
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-amber-100 tracking-tight">
            {CHAPTER_TWENTY_SEVEN_THEORY_TEXT.title}
          </h1>

          <blockquote className="border-l-2 border-amber-400/60 pl-4 py-1 italic text-amber-200/90 text-sm md:text-base font-serif">
            "{CHAPTER_TWENTY_SEVEN_THEORY_TEXT.quote.text}"
            <footer className="text-xs text-amber-400 mt-1 not-italic font-sans font-medium">
              — {CHAPTER_TWENTY_SEVEN_THEORY_TEXT.quote.author}
            </footer>
          </blockquote>

          <div className="space-y-2 pt-2 text-xs md:text-sm text-amber-100/80 leading-relaxed max-w-4xl">
            {CHAPTER_TWENTY_SEVEN_THEORY_TEXT.introductionText.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* DOB INPUT CONTROLLER */}
      <div className="bg-white p-5 rounded-2xl border border-amber-900/10 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 text-amber-900 rounded-xl">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Birth Date Analysis</span>
            <span className="text-sm font-serif font-bold text-slate-900">Missing & Repeated Density for:</span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="DD/MM/YYYY"
            className="px-4 py-2 bg-amber-50/60 border border-amber-900/20 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 w-36"
          />
          <div className="text-xs text-amber-900 font-medium bg-amber-100 px-3 py-2 rounded-xl border border-amber-300">
            {evalResult.missingNumbers.length} Missing • {evalResult.repeatedNumbers.length} Repeated (2x+)
          </div>
        </div>
      </div>

      {/* TAB BUTTONS */}
      <div className="flex flex-wrap gap-2 border-b border-amber-900/10 pb-3">
        <button
          onClick={() => { setActiveTab("detected"); setSelectedMissingNum(null); setSelectedRepeatedNum(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "detected"
              ? "bg-slate-900 text-amber-300 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Active Birth Grid Profile</span>
        </button>

        <button
          onClick={() => { setActiveTab("missing_lib"); setSelectedMissingNum(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "missing_lib"
              ? "bg-rose-900 text-rose-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <AlertCircle className="w-4 h-4 text-rose-400" />
          <span>Missing Numbers (1 to 9) & Remedies</span>
        </button>

        <button
          onClick={() => { setActiveTab("repeated_lib"); setSelectedRepeatedNum(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "repeated_lib"
              ? "bg-amber-800 text-amber-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <Flame className="w-4 h-4 text-amber-400" />
          <span>Repeated Numbers (1 to 9) & Excess Risks</span>
        </button>

        <button
          onClick={() => { setActiveTab("theory"); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "theory"
              ? "bg-slate-800 text-slate-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Presence vs Absence Theory</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: DETECTED BIRTH GRID PROFILE */}
      {/* ======================================================== */}
      {activeTab === "detected" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visual 3x3 Lo Shu Matrix Display */}
            <div className="bg-gradient-to-b from-amber-50 to-amber-100/60 p-6 rounded-3xl border border-amber-900/15 flex flex-col items-center justify-center space-y-4 text-center">
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                3x3 Lo Shu Matrix Digit Density
              </span>
              <div className="grid grid-cols-3 gap-3 w-64 h-64">
                {[[4, 9, 2], [3, 5, 7], [8, 1, 6]].map((row) => (
                  row.map((digit) => {
                    const cnt = evalResult.digitCounts[digit] || 0;
                    const isMissing = cnt === 0;
                    const isRepeated = cnt >= 2;

                    return (
                      <div
                        key={digit}
                        className={`flex flex-col items-center justify-center rounded-2xl border transition-all ${
                          isRepeated
                            ? "bg-amber-900 text-amber-200 border-amber-400 shadow-lg scale-105"
                            : cnt === 1
                            ? "bg-slate-900 text-amber-300 border-amber-500 shadow-md"
                            : "bg-rose-50/80 text-rose-300 border-dashed border-rose-300"
                        }`}
                      >
                        <span className="font-serif font-bold text-2xl">{digit}</span>
                        <span className={`text-[10px] font-mono mt-0.5 px-1.5 py-0.2 rounded-full ${
                          isRepeated 
                            ? "bg-amber-400 text-slate-950 font-bold"
                            : cnt === 1
                            ? "text-slate-300"
                            : "bg-rose-100 text-rose-800 font-bold"
                        }`}>
                          {isMissing ? "MISSING" : `${cnt}x`}
                        </span>
                      </div>
                    );
                  })
                ))}
              </div>
              <p className="text-xs text-amber-900 font-medium max-w-xs">
                Amber/Dark cells indicate presence. Red dashed cells are Missing Numbers requiring remedies.
              </p>
            </div>

            {/* Profile Overview Card */}
            <div className="lg:col-span-2 space-y-6">
              {/* Detected Missing Numbers */}
              <div className="bg-white p-6 rounded-3xl border border-rose-900/10 space-y-4">
                <div className="flex items-center justify-between border-b border-rose-900/10 pb-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    <h3 className="font-serif text-lg font-bold text-slate-900">
                      Detected Missing Numbers ({evalResult.missingNumbers.length})
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-1 rounded-full">
                    Growth Invitations
                  </span>
                </div>

                {evalResult.missingNumbers.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-4 bg-slate-50 rounded-2xl">
                    Remarkable! No digits from 1 to 9 are completely absent in this birth date grid.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {evalResult.missingNumbers.map((mn) => (
                      <div key={mn.number} className="p-4 bg-rose-50/60 rounded-2xl border border-rose-200 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-serif font-bold text-slate-900 text-sm">{mn.name}</span>
                            <span className="text-xs text-rose-800 block font-mono">{mn.gridPosition}</span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-200 text-rose-950 font-bold text-[10px]">
                            REMEDY REQUIRED
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed">{mn.coreMeaning}</p>

                        <div className="p-3 bg-white rounded-xl border border-amber-300 space-y-2 text-xs">
                          <span className="font-bold text-amber-950 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-700" />
                            Prescribed Remedies & Daily Habits:
                          </span>
                          <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1 text-[11px]">
                            {mn.remedies.practicalGuidance.map((g, idx) => (
                              <li key={idx}>{g}</li>
                            ))}
                          </ul>

                          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                            <div className="p-2 bg-amber-50 rounded-lg border border-amber-200">
                              <span className="font-bold text-amber-900 block">Gemstone:</span>
                              <span>{mn.remedies.gemstone}</span>
                              <span className="text-[10px] text-slate-500 block mt-0.5">{mn.remedies.gemstoneUsage}</span>
                            </div>
                            <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                              <span className="font-bold text-emerald-900 block">Acoustic Mantra:</span>
                              <span className="font-mono text-emerald-800">{mn.remedies.mantra}</span>
                              <span className="text-[10px] text-slate-500 block mt-0.5">{mn.remedies.mantraPractice}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Detected Repeated Numbers */}
              <div className="bg-white p-6 rounded-3xl border border-amber-900/10 space-y-4">
                <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-600" />
                    <h3 className="font-serif text-lg font-bold text-slate-900">
                      Concentrated Repeated Numbers ({evalResult.repeatedNumbers.length})
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                    Amplified Superpowers (2x+)
                  </span>
                </div>

                {evalResult.repeatedNumbers.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-4 bg-slate-50 rounded-2xl">
                    No digits appear 2x or more in this birth grid. All present digits have balanced 1x baseline frequency.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {evalResult.repeatedNumbers.map(({ detail, count }) => (
                      <div key={detail.number} className="p-4 bg-amber-50/70 rounded-2xl border border-amber-300 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-serif font-bold text-slate-900 text-sm">{detail.name}</span>
                            <span className="text-xs text-amber-800 block font-mono">Appears {count}x in Grid</span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px]">
                            {count}X DENSITY
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed">{detail.coreMeaning}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1">
                            <span className="font-bold text-emerald-900 block flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Concentrated Strengths:
                            </span>
                            <p className="text-slate-600 text-[11px] leading-relaxed">{detail.strengths}</p>
                          </div>

                          <div className="p-3 bg-white rounded-xl border border-rose-200 space-y-1">
                            <span className="font-bold text-rose-900 block flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                              Excess Risks to Manage:
                            </span>
                            <p className="text-slate-600 text-[11px] leading-relaxed">{detail.excessRisks}</p>
                          </div>
                        </div>

                        <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1 text-xs">
                          <span className="font-bold text-amber-950 block">Conscious Management Practices:</span>
                          <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px]">
                            {detail.managementPractices.map((practice, pIdx) => (
                              <li key={pIdx}>{practice}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: ENCYCLOPEDIA OF MISSING NUMBERS (1 to 9) */}
      {/* ======================================================== */}
      {activeTab === "missing_lib" && (
        <div className="space-y-6">
          <div className="bg-rose-50/80 p-5 rounded-2xl border border-rose-300 text-xs md:text-sm text-rose-950 leading-relaxed">
            <span className="font-bold block text-rose-900 text-sm mb-1">PART ONE — Complete Guide to Missing Numbers (1 to 9)</span>
            A missing number in the Lo Shu Grid is any digit from 1 through 9 that does not appear anywhere in the complete birth date. Each missing number represents a specific developmental invitation, complete with custom acoustic mantras, planetary gemstones, and daily volitional practices.
          </div>

          {/* Selector Grid */}
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => setSelectedMissingNum(selectedMissingNum === num ? null : num)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedMissingNum === num
                    ? "bg-rose-900 text-white shadow-md scale-105"
                    : "bg-white text-slate-700 hover:bg-rose-50 border border-amber-900/10"
                }`}
              >
                Missing Digit {num}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.values(MISSING_NUMBERS_DATA)
              .filter(mn => selectedMissingNum === null || mn.number === selectedMissingNum)
              .map((mn) => (
                <div
                  key={mn.number}
                  className="bg-white p-6 rounded-3xl border border-rose-900/10 shadow-xs space-y-4 hover:border-rose-400 transition-all"
                >
                  <div className="flex justify-between items-start border-b border-rose-900/10 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">
                        {mn.gridPosition}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-slate-900 mt-1">
                        {mn.name}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-rose-900 bg-rose-100 px-2.5 py-1 rounded-full font-mono">
                      Element: {mn.governingElement}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs md:text-sm text-slate-700 leading-relaxed">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Core Meaning:</span>
                      <p>{mn.coreMeaning}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">How It Manifests:</span>
                      <p>{mn.manifestationInLife}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Professional & Life Impact:</span>
                      <p>{mn.professionalAndRelationalImpact}</p>
                    </div>

                    <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-2 text-xs">
                      <span className="font-bold text-amber-950 block text-sm flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        Targeted Remedies & Daily Habits
                      </span>

                      <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1 text-[11px]">
                        {mn.remedies.practicalGuidance.map((g, gIdx) => (
                          <li key={gIdx}>{g}</li>
                        ))}
                      </ul>

                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 bg-white rounded-xl border border-amber-300">
                          <span className="font-bold text-amber-900 block">Gemstone:</span>
                          <span>{mn.remedies.gemstone}</span>
                          <span className="text-[10px] text-slate-500 block mt-0.5">{mn.remedies.gemstoneUsage}</span>
                        </div>

                        <div className="p-2 bg-white rounded-xl border border-emerald-300">
                          <span className="font-bold text-emerald-900 block">Acoustic Mantra:</span>
                          <span className="font-mono text-emerald-800">{mn.remedies.mantra}</span>
                          <span className="text-[10px] text-slate-500 block mt-0.5">{mn.remedies.mantraPractice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: ENCYCLOPEDIA OF REPEATED NUMBERS (1 to 9) */}
      {/* ======================================================== */}
      {activeTab === "repeated_lib" && (
        <div className="space-y-6">
          <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-300 text-xs md:text-sm text-amber-950 leading-relaxed">
            <span className="font-bold block text-amber-900 text-sm mb-1">PART TWO — Complete Guide to Repeated Numbers (1 to 9)</span>
            A repeated number appears two or more times in the birth date. Repeated numbers create concentrated strengths in the Lo Shu Grid. At very high frequencies (3x+), they carry potential excess risks that require conscious management.
          </div>

          {/* Selector Grid */}
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => setSelectedRepeatedNum(selectedRepeatedNum === num ? null : num)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedRepeatedNum === num
                    ? "bg-amber-800 text-white shadow-md scale-105"
                    : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
                }`}
              >
                Repeated Digit {num}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.values(REPEATED_NUMBERS_DATA)
              .filter(rn => selectedRepeatedNum === null || rn.number === selectedRepeatedNum)
              .map((rn) => (
                <div
                  key={rn.number}
                  className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-4 hover:border-amber-400 transition-all"
                >
                  <div className="flex justify-between items-start border-b border-amber-900/10 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                        {rn.gridPosition}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-slate-900 mt-1">
                        {rn.name}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      Element: {rn.governingElement}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs md:text-sm text-slate-700 leading-relaxed">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Core Meaning:</span>
                      <p>{rn.coreMeaning}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-emerald-900 block">Concentrated Strengths:</span>
                      <p className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200">{rn.strengths}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-rose-900 block">Excess Risks to Manage:</span>
                      <p className="bg-rose-50/60 p-3 rounded-2xl border border-rose-200">{rn.excessRisks}</p>
                    </div>

                    <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-2 text-xs">
                      <span className="font-bold text-amber-950 block text-sm">
                        Conscious Management Practices
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1 text-[11px]">
                        {rn.managementPractices.map((p, pIdx) => (
                          <li key={pIdx}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: CHAPTER THEORY */}
      {/* ======================================================== */}
      {activeTab === "theory" && (
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-amber-900/10 shadow-xs space-y-6">
            <div className="border-b border-amber-900/10 pb-4">
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
                CHAPTER TWENTY-SEVEN THEORY
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                Integrating Presence and Absence in the Lo Shu Grid
              </h2>
            </div>

            <div className="space-y-6 text-sm md:text-base text-slate-700 leading-relaxed">
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-600" />
                  Presence vs Absence Dynamics
                </h3>
                <p>
                  The Lo Shu Grid operates simultaneously on presence (digits present in the birth date) and absence (digits that do not appear). While present digits form natural capacities and full line Arrows of Strength, absent digits reveal developmental growth invitations.
                </p>
                <p>
                  A missing number is never a curse or permanent defect. The capacity developed through deliberate, conscious effort often becomes more conscious, ethical, and refined than an innate gift that required no effort to inherit.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-600" />
                  Density of Repeated Numbers
                </h3>
                <p>
                  When a digit appears 2x, 3x, or 4x in a birth date, its corresponding grid position receives concentrated energetic density. One instance represents a standard naturally available capability. Two instances produce a notable superpower. Three or more instances create an exceptionally dominant personality trait that requires conscious management to avoid excess.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                  Mechanisms of Remedies
                </h3>
                <p>
                  Remedies for missing numbers combine three synchronized approaches:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Planetary Gemstones:</strong> Resonate with the mineral frequencies of the governing planetary energies.</li>
                  <li><strong>Acoustic Mantras:</strong> Utilize vocal resonance to entrain energetic focus.</li>
                  <li><strong>Daily Behavioral Habits:</strong> Directly cultivate missing mental, emotional, or practical habits through deliberate volitional discipline.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
