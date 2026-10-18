import React, { useState } from "react";
import { 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  BookOpen, 
  Gem, 
  Volume2, 
  Flame, 
  Zap, 
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Compass
} from "lucide-react";
import { 
  ARROWS_OF_STRENGTH_DATA, 
  ARROWS_OF_WEAKNESS_DATA, 
  CHAPTER_TWENTY_SIX_THEORY_TEXT,
  evaluateBirthDateArrows,
  LoShuArrowDetail
} from "../data/loshuArrowsData";
import { calculateLoShuGridEngine } from "../data/numerologyGrids";

interface LoShuArrowsViewProps {
  initialDob?: string;
  driverNum?: number;
  conductorNum?: number;
}

export const LoShuArrowsView: React.FC<LoShuArrowsViewProps> = ({
  initialDob = "15/08/1947",
  driverNum,
  conductorNum
}) => {
  const [dob, setDob] = useState(initialDob);
  const [activeTab, setActiveTab] = useState<"detected" | "strength" | "weakness" | "theory">("detected");
  const [selectedArrow, setSelectedArrow] = useState<LoShuArrowDetail | null>(null);

  // Evaluate current DOB arrows
  const arrowEvaluation = evaluateBirthDateArrows(dob, driverNum, conductorNum);
  const loShuResult = calculateLoShuGridEngine(dob, driverNum || 1, conductorNum || 1);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* CHAPTER HEADER BANNER */}
      <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-amber-900 text-amber-50 p-6 md:p-8 rounded-3xl shadow-xl border border-amber-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
              {CHAPTER_TWENTY_SIX_THEORY_TEXT.chapterNumber}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-amber-100 text-xs font-medium">
              16 Arrows of Power & Growth
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-amber-100 tracking-tight">
            {CHAPTER_TWENTY_SIX_THEORY_TEXT.title}
          </h1>

          <blockquote className="border-l-2 border-amber-400/60 pl-4 py-1 italic text-amber-200/90 text-sm md:text-base font-serif">
            "{CHAPTER_TWENTY_SIX_THEORY_TEXT.quote.text}"
            <footer className="text-xs text-amber-400 mt-1 not-italic font-sans font-medium">
              — {CHAPTER_TWENTY_SIX_THEORY_TEXT.quote.author}
            </footer>
          </blockquote>

          <div className="space-y-2 pt-2 text-xs md:text-sm text-amber-100/80 leading-relaxed max-w-4xl">
            {CHAPTER_TWENTY_SIX_THEORY_TEXT.introductionText.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK DATE INPUT CONTROLLER */}
      <div className="bg-white p-5 rounded-2xl border border-amber-900/10 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 text-amber-900 rounded-xl">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Birth Date Analysis</span>
            <span className="text-sm font-serif font-bold text-slate-900">Evaluating Lo Shu Arrows for:</span>
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
            {arrowEvaluation.activeStrength.length} Strengths • {arrowEvaluation.activeWeakness.length} Weaknesses
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex flex-wrap gap-2 border-b border-amber-900/10 pb-3">
        <button
          onClick={() => { setActiveTab("detected"); setSelectedArrow(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "detected"
              ? "bg-slate-900 text-amber-300 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Active Birth Grid Arrows</span>
        </button>

        <button
          onClick={() => { setActiveTab("strength"); setSelectedArrow(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "strength"
              ? "bg-amber-800 text-amber-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-amber-500" />
          <span>8 Arrows of Strength</span>
        </button>

        <button
          onClick={() => { setActiveTab("weakness"); setSelectedArrow(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "weakness"
              ? "bg-rose-900 text-rose-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>8 Arrows of Weakness & Remedies</span>
        </button>

        <button
          onClick={() => { setActiveTab("theory"); setSelectedArrow(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "theory"
              ? "bg-slate-800 text-slate-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Partial & Multiple Principles</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: DETECTED BIRTH GRID ARROWS */}
      {/* ======================================================== */}
      {activeTab === "detected" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visual 3x3 Lo Shu Matrix Display */}
            <div className="bg-gradient-to-b from-amber-50 to-amber-100/60 p-6 rounded-3xl border border-amber-900/15 flex flex-col items-center justify-center space-y-4 text-center">
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                Lo Shu Magic Grid Matrix ({dob})
              </span>
              <div className="grid grid-cols-3 gap-3 w-64 h-64">
                {[[4, 9, 2], [3, 5, 7], [8, 1, 6]].map((row) => (
                  row.map((digit) => {
                    const cell = loShuResult.grid[digit];
                    const isPresent = cell && cell.count > 0;
                    return (
                      <div
                        key={digit}
                        className={`flex flex-col items-center justify-center rounded-2xl border transition-all ${
                          isPresent
                            ? "bg-slate-900 text-amber-300 border-amber-500 shadow-md scale-105"
                            : "bg-white/60 text-slate-300 border-dashed border-amber-900/20"
                        }`}
                      >
                        <span className="font-serif font-bold text-2xl">{digit}</span>
                        <span className="text-[10px] font-mono mt-0.5 opacity-80">
                          {isPresent ? `${cell.count}x` : "Empty"}
                        </span>
                      </div>
                    );
                  })
                ))}
              </div>
              <p className="text-xs text-amber-900 font-medium max-w-xs">
                Highlighted cells contain digits from your birth date. Complete lines form Arrows of Strength; empty lines form Arrows of Weakness.
              </p>
            </div>

            {/* Active Strength & Weakness Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Strength Arrows */}
              <div className="bg-white p-6 rounded-3xl border border-amber-900/10 space-y-4">
                <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    <h3 className="font-serif text-lg font-bold text-slate-900">
                      Active Arrows of Strength ({arrowEvaluation.activeStrength.length})
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                    Superpowers
                  </span>
                </div>

                {arrowEvaluation.activeStrength.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-4 bg-slate-50 rounded-2xl">
                    No fully completed 3-cell Strength Arrows detected in this birth date grid. Look at your partial strength lines below for active potential!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {arrowEvaluation.activeStrength.map((arrow) => (
                      <div key={arrow.id} className="p-4 bg-amber-50/80 rounded-2xl border border-amber-300/80 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-serif font-bold text-slate-900 text-sm">{arrow.name}</span>
                            <span className="text-xs text-amber-800 block font-mono">{arrow.lineName}</span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px]">
                            SUPERPOWER ACTIVE
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">{arrow.coreMeaning}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Active Weakness Arrows */}
              <div className="bg-white p-6 rounded-3xl border border-rose-900/10 space-y-4">
                <div className="flex items-center justify-between border-b border-rose-900/10 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-rose-600" />
                    <h3 className="font-serif text-lg font-bold text-slate-900">
                      Active Arrows of Weakness ({arrowEvaluation.activeWeakness.length})
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-1 rounded-full">
                    Growth Invitations
                  </span>
                </div>

                {arrowEvaluation.activeWeakness.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-4 bg-slate-50 rounded-2xl">
                    No fully empty Weakness Arrows detected in this birth date grid!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {arrowEvaluation.activeWeakness.map((arrow) => (
                      <div key={arrow.id} className="p-4 bg-rose-50/80 rounded-2xl border border-rose-200 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-serif font-bold text-slate-900 text-sm">{arrow.name}</span>
                            <span className="text-xs text-rose-800 block font-mono">{arrow.lineName}</span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-200 text-rose-950 font-bold text-[10px]">
                            REMEDY REQUIRED
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">{arrow.coreMeaning}</p>

                        {arrow.remediesAndPractices && (
                          <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                            {arrow.remediesAndPractices.gemstone && (
                              <span className="bg-amber-100 text-amber-950 px-2.5 py-1 rounded-lg border border-amber-300 font-medium flex items-center gap-1">
                                <Gem className="w-3 h-3 text-amber-700" />
                                Gemstone: {arrow.remediesAndPractices.gemstone}
                              </span>
                            )}
                            {arrow.remediesAndPractices.mantra && (
                              <span className="bg-emerald-100 text-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-300 font-medium flex items-center gap-1">
                                <Volume2 className="w-3 h-3 text-emerald-700" />
                                Mantra: {arrow.remediesAndPractices.mantra}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Partial Strength Lines (67% Activation) */}
          <div className="bg-white p-6 rounded-3xl border border-amber-900/10 space-y-4">
            <div className="flex items-center gap-2 border-b border-amber-900/10 pb-3">
              <Compass className="w-5 h-5 text-amber-700" />
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Partial Strength Lines (Developing Potential — 67% Complete)
              </h3>
            </div>

            {arrowEvaluation.partialStrength.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No partial strength lines identified.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {arrowEvaluation.partialStrength.map((pItem) => (
                  <div key={pItem.arrow.id} className="p-4 bg-amber-50/40 rounded-2xl border border-amber-900/10 space-y-2 text-xs">
                    <div className="flex justify-between items-center border-b border-amber-900/10 pb-2">
                      <span className="font-serif font-bold text-slate-900 text-sm">{pItem.arrow.name}</span>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        Missing Digit: {pItem.missing.join(", ")}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{pItem.arrow.coreMeaning}</p>
                    <div className="p-2.5 bg-white rounded-xl border border-amber-200 text-amber-950 font-medium flex items-center gap-1.5">
                      <ArrowRight className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>
                        Cultivating Digit {pItem.missing.join(", ")} completes this line to unlock full {pItem.arrow.name}.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: 8 ARROWS OF STRENGTH (ENCYCLOPEDIA) */}
      {/* ======================================================== */}
      {activeTab === "strength" && (
        <div className="space-y-6">
          <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-300 text-xs md:text-sm text-amber-950 leading-relaxed">
            <span className="font-bold block text-amber-900 text-sm mb-1">PART ONE — The Eight Arrows of Strength</span>
            An Arrow of Strength forms when all three positions of any line in the 3x3 Lo Shu Grid contain at least one digit from the birth date. The three occupied positions combine their individual qualities into a single, integrated superpower — a specific talent or capacity available with natural ease.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ARROWS_OF_STRENGTH_DATA.map((arrow) => (
              <div
                key={arrow.id}
                className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-4 hover:border-amber-400 transition-all"
              >
                <div className="flex justify-between items-start border-b border-amber-900/10 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      {arrow.lineName}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-slate-900 mt-1">
                      {arrow.name}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-slate-500 font-mono">
                    [{arrow.positions.join(" • ")}]
                  </span>
                </div>

                <div className="space-y-3 text-xs md:text-sm text-slate-700 leading-relaxed">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block">Core Meaning:</span>
                    <p>{arrow.coreMeaning}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block">How It Manifests:</span>
                    <p>{arrow.manifestationInLife}</p>
                  </div>

                  <div className="space-y-1 bg-amber-50/60 p-3 rounded-2xl border border-amber-900/10">
                    <span className="font-bold text-amber-950 block">Professional & Relational Impact:</span>
                    <p>{arrow.professionalAndRelationalImpact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: 8 ARROWS OF WEAKNESS & REMEDIES */}
      {/* ======================================================== */}
      {activeTab === "weakness" && (
        <div className="space-y-6">
          <div className="bg-rose-50/80 p-5 rounded-2xl border border-rose-300 text-xs md:text-sm text-rose-950 leading-relaxed">
            <span className="font-bold block text-rose-900 text-sm mb-1">PART TWO — The Eight Arrows of Weakness</span>
            An Arrow of Weakness forms when all three positions of any line are completely empty in the birth date grid. They are not permanent limitations; they are the most specifically configured developmental invitations, showing where targeted effort produces earned, rare mastery.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ARROWS_OF_WEAKNESS_DATA.map((arrow) => (
              <div
                key={arrow.id}
                className="bg-white p-6 rounded-3xl border border-rose-900/10 shadow-xs space-y-4 hover:border-rose-400 transition-all"
              >
                <div className="flex justify-between items-start border-b border-rose-900/10 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">
                      {arrow.lineName}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-slate-900 mt-1">
                      {arrow.name}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-slate-500 font-mono">
                    [{arrow.positions.join(" • ")} Missing]
                  </span>
                </div>

                <div className="space-y-3 text-xs md:text-sm text-slate-700 leading-relaxed">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block">Core Challenge & Meaning:</span>
                    <p>{arrow.coreMeaning}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block">How It Manifests:</span>
                    <p>{arrow.manifestationInLife}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block">Professional & Life Impact:</span>
                    <p>{arrow.professionalAndRelationalImpact}</p>
                  </div>

                  {arrow.remediesAndPractices && (
                    <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-2 text-xs">
                      <span className="font-bold text-amber-950 block text-sm flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        Targeted Remedies & Daily Practices
                      </span>

                      <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                        {arrow.remediesAndPractices.practicalGuidance.map((guide, gIdx) => (
                          <li key={gIdx}>{guide}</li>
                        ))}
                      </ul>

                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        {arrow.remediesAndPractices.gemstone && (
                          <div className="p-2 bg-white rounded-xl border border-amber-300">
                            <span className="font-bold text-amber-900 block">Gemstone:</span>
                            <span>{arrow.remediesAndPractices.gemstone}</span>
                            <span className="text-[10px] text-slate-500 block mt-0.5">{arrow.remediesAndPractices.gemstoneUsage}</span>
                          </div>
                        )}

                        {arrow.remediesAndPractices.mantra && (
                          <div className="p-2 bg-white rounded-xl border border-emerald-300">
                            <span className="font-bold text-emerald-900 block">Acoustic Mantra:</span>
                            <span className="font-mono text-emerald-800">{arrow.remediesAndPractices.mantra}</span>
                            <span className="text-[10px] text-slate-500 block mt-0.5">{arrow.remediesAndPractices.mantraPractice}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: PARTIAL & MULTIPLE ARROWS THEORY */}
      {/* ======================================================== */}
      {activeTab === "theory" && (
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-amber-900/10 shadow-xs space-y-6">
            <div className="border-b border-amber-900/10 pb-4">
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
                PART THREE & FOUR
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                Multiple Arrows, Crossroads Positions & Professional Consultation
              </h2>
            </div>

            <div className="space-y-6 text-sm md:text-base text-slate-700 leading-relaxed">
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-600" />
                  Reading Grids with Multiple Arrows
                </h3>
                <p>
                  When a birth date grid contains more than one Arrow of Strength or Weakness, the interpretation synthesizes both the individual qualities of each line and their crossroads interaction. Shared intersection cells act as central amplifiers. For example, Position 5 at the central Brahmasthan intersects four distinct lines (middle row 3-5-7, central column 9-5-1, main diagonal 4-5-6, and secondary diagonal 2-5-8).
                </p>
                <p>
                  When Position 5 is missing, its absence contributes to four distinct Weakness Arrows simultaneously. In such cases, strengthening Position 5 through grounding practices, yellow gemstones, and central willpower exercises yields fourfold developmental benefits.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-600" />
                  Partial Arrows (67% Activation)
                </h3>
                <p>
                  The most frequently encountered pattern in consultation is the partial Arrow — where two positions of a line are filled and one is empty. A partial Arrow represents a developing capacity. Identifying the single missing digit provides the client with a precise, targeted developmental objective to unlock the complete line superpower.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Gem className="w-5 h-5 text-amber-600" />
                  Mechanisms of Arrow Remedies
                </h3>
                <p>
                  Remedies for Weakness Arrows operate through three synchronized mechanisms:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Planetary Gemstones:</strong> Resonate with the mineral frequencies of the governing planetary energies.</li>
                  <li><strong>Acoustic Mantras:</strong> Utilize acoustic vibration to entrain energetic focus.</li>
                  <li><strong>Daily Behavioral Practices:</strong> Directly cultivate missing mental, emotional, or practical habits through deliberate volitional discipline.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
