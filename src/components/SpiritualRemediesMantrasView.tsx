import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Volume2,
  Compass,
  Sun,
  Moon,
  ShieldAlert,
  Flame,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  Heart,
  Flower2,
  Zap,
  RotateCcw,
  Feather,
  Eye,
  Check
} from "lucide-react";
import {
  PLANETARY_MANTRAS_DATA,
  MISSING_NUMBER_MANTRAS,
  KARMIC_DEBT_MANTRAS_DATA,
  UNIVERSAL_MANTRAS,
  JAPA_PROTOCOL_STEPS,
  PlanetaryMantraSet
} from "../data/spiritualRemediesMantrasData";

interface SpiritualRemediesMantrasViewProps {
  lifePathNumber?: number;
  driverNumber?: number;
  missingNumbers?: number[];
  karmicDebts?: number[];
}

export const SpiritualRemediesMantrasView: React.FC<SpiritualRemediesMantrasViewProps> = ({
  lifePathNumber = 1,
  driverNumber = 1,
  missingNumbers = [2, 5],
  karmicDebts = [13]
}) => {
  const [activeTab, setActiveTab] = useState<"planetary" | "missing" | "karmic" | "universal" | "japa">("planetary");
  const [selectedNumber, setSelectedNumber] = useState<number>(lifePathNumber || 1);
  const [selectedKarmic, setSelectedKarmic] = useState<number>(karmicDebts[0] || 13);

  // Selected planetary mantra set
  const mantraSet: PlanetaryMantraSet = useMemo(() => {
    return PLANETARY_MANTRAS_DATA[selectedNumber] || PLANETARY_MANTRAS_DATA[1];
  }, [selectedNumber]);

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Chapter Thirty-Six System
              </span>
              <span className="text-xs text-purple-200/80 font-mono">Vedic Acoustic Science & Japa Shastra</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-purple-100 flex items-center gap-2">
              <Volume2 className="w-7 h-7 text-purple-400" />
              Spiritual Remedies & Mantras Engine
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              "Sound is the primary creative force of the universe." Explore targeted Navagraha planetary mantras, Beeja seed syllables, missing grid remedies, karmic debt sound protocols, and the 40-day Japa science.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 text-xs font-semibold">
            <div className="bg-purple-900/40 backdrop-blur-xs border border-purple-500/30 rounded-xl px-3.5 py-2 text-purple-200">
              Life Path Mantra: <strong className="text-white text-sm ml-1 font-serif">Number {lifePathNumber}</strong>
            </div>
            <div className="bg-purple-900/40 backdrop-blur-xs border border-purple-500/30 rounded-xl px-3.5 py-2 text-purple-200">
              Driver Number: <strong className="text-white text-sm ml-1 font-serif">{driverNumber}</strong>
            </div>
          </div>
        </div>

        {/* SUB-TAB NAVIGATION */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-purple-800/40 overflow-x-auto no-scrollbar text-xs font-semibold">
          {[
            { id: "planetary", label: "Planetary Mantras (1–9, 11, 22)", icon: Sun },
            { id: "missing", label: "Missing Number Remedies", icon: Compass },
            { id: "karmic", label: "Karmic Debt Sound Protocols", icon: ShieldAlert },
            { id: "universal", label: "Universal Vedic Mantras", icon: Sparkles },
            { id: "japa", label: "Japa Science & 40-Day Protocol", icon: Clock }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                  isSelected
                    ? "bg-purple-500 text-slate-950 font-bold shadow-md scale-105"
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
      {/* SUB-TAB 1: PLANETARY MANTRAS (1-9, 11, 22) */}
      {/* ======================================================== */}
      {activeTab === "planetary" && (
        <div className="space-y-6">
          {/* NUMBER SELECTOR STRIP */}
          <div className="p-4 rounded-2xl bg-white border border-purple-900/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Select Number for Complete Mantra & Remedial Protocol</span>
              <span className="text-purple-600 font-mono">Navagraha Planetary Resonance</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22].map((num) => {
                const isSelected = selectedNumber === num;
                const isUserLP = lifePathNumber === num;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedNumber(num)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shrink-0 ${
                      isSelected
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md scale-105"
                        : "bg-slate-50 text-slate-700 hover:bg-purple-50 border border-slate-200"
                    }`}
                  >
                    <span className="text-sm font-serif">Number {num}</span>
                    {isUserLP && (
                      <span className="text-[10px] bg-amber-300 text-amber-950 px-1.5 py-0.5 rounded font-sans uppercase font-extrabold">
                        Your LP
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN PLANETARY MANTRA DISPLAY CARD */}
          <div className="p-6 rounded-2xl bg-white border border-purple-900/10 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-serif font-bold text-purple-950">Number {mantraSet.number}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-purple-100 text-purple-900 border border-purple-200">
                    {mantraSet.planet}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Primary Deities: <strong>{mantraSet.deities.join(", ")}</strong>
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-semibold border border-slate-200 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-600" />
                  Count: {mantraSet.defaultCount} Repetitions
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-semibold border border-slate-200 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-indigo-600" />
                  Facing: {mantraSet.facingDirection}
                </span>
              </div>
            </div>

            {/* MANTRA BOXES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* PRIMARY NAVAGRAHA MANTRA */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-900 to-slate-900 text-white space-y-3 shadow-md">
                <div className="flex items-center justify-between border-b border-purple-700/50 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Primary Navagraha Mantra</span>
                  <span className="text-[10px] font-bold bg-purple-500/30 text-purple-200 px-2.5 py-0.5 rounded-full border border-purple-400/30">
                    Standard Practice
                  </span>
                </div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-purple-100 tracking-wide text-center py-2">
                  "{mantraSet.primaryNavagrahaMantra}"
                </div>
                <p className="text-xs text-purple-200 leading-relaxed italic text-center border-t border-purple-800/60 pt-2">
                  {mantraSet.primaryMeaning}
                </p>
              </div>

              {/* BEEJA SEED MANTRA */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950 to-slate-900 text-white space-y-3 shadow-md">
                <div className="flex items-center justify-between border-b border-amber-700/50 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Beeja (Seed Syllable) Mantra</span>
                  <span className="text-[10px] font-bold bg-amber-500/30 text-amber-200 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    Concentrated Essence
                  </span>
                </div>
                <div className="font-serif text-lg sm:text-xl font-bold text-amber-100 tracking-wide text-center py-2">
                  "{mantraSet.beejaMantra}"
                </div>
                <p className="text-xs text-amber-200 leading-relaxed italic text-center border-t border-amber-800/60 pt-2">
                  Single-syllable acoustic seed carries concentrated planetary essence for advanced daily Japa.
                </p>
              </div>
            </div>

            {/* GAYATRI & DEITY MANTRAS */}
            {mantraSet.gayatriMantra && (
              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Planetary Gayatri Mantra</span>
                </div>
                <div className="font-serif font-bold text-slate-900 text-sm sm:text-base">
                  "{mantraSet.gayatriMantra}"
                </div>
              </div>
            )}

            {/* DEITY MANTRAS LIST */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Complementary Deity Mantras</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mantraSet.deityMantras.map((dm, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-serif font-bold text-slate-900 text-xs">{dm.name}</div>
                    <div className="font-mono text-xs text-purple-900 font-bold">"{dm.mantra}"</div>
                    <p className="text-[11px] text-slate-600 leading-tight">{dm.purpose}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* PRACTICAL EXECUTION PARAMETERS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Best Day & Time</span>
                <span className="font-bold text-xs text-slate-900 block">{mantraSet.bestDay}</span>
                <span className="text-[11px] text-slate-600 block">{mantraSet.bestTime}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Mala Material</span>
                <span className="font-bold text-xs text-slate-900 block">{mantraSet.malaType}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Sacred Offering</span>
                <span className="font-bold text-xs text-slate-900 block">{mantraSet.offering}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Inner Visualisation</span>
                <p className="text-[11px] text-slate-700 leading-tight">{mantraSet.visualisation}</p>
              </div>
            </div>

            {/* PRACTICE PROTOCOL & INDICATIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-purple-950 text-purple-50 space-y-2">
                <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  Step-by-Step Practice Protocol
                </h5>
                <ul className="text-xs space-y-1.5 list-disc pl-4 text-purple-100">
                  {mantraSet.practiceProtocol.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950 text-indigo-50 space-y-2">
                <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-indigo-400" />
                  Primary Prescription Indications
                </h5>
                <ul className="text-xs space-y-1.5 list-disc pl-4 text-indigo-100">
                  {mantraSet.indications.map((ind, idx) => (
                    <li key={idx}>{ind}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 2: MISSING NUMBER REMEDIES */}
      {/* ======================================================== */}
      {activeTab === "missing" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-purple-900/10 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-purple-600" />
                Targeted Remedies for Missing Lo Shu Grid Positions
              </h3>
              <p className="text-xs text-slate-500">
                Acoustic sound formulas designed to activate and forge missing numerical capacities in the Lo Shu Grid.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MISSING_NUMBER_MANTRAS.map((item) => {
                const isUserMissing = missingNumbers.includes(item.missingNumber);
                return (
                  <div
                    key={item.missingNumber}
                    className={`p-5 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                      isUserMissing
                        ? "bg-amber-50/60 border-amber-300 shadow-sm"
                        : "bg-slate-50/80 border-slate-200 hover:border-purple-200"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="font-serif font-bold text-slate-900 text-sm">
                          Missing Position {item.missingNumber}
                        </span>
                        {isUserMissing ? (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-950 px-2 py-0.5 rounded-md border border-amber-300">
                            User Missing
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-500 font-mono">Grid Remediation</span>
                        )}
                      </div>

                      <div className="text-xs font-bold text-purple-900">{item.capacityName}</div>

                      <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase block">Primary Sound Formula</span>
                        <div className="font-serif font-bold text-purple-950 text-sm">"{item.primaryMantra}"</div>
                      </div>

                      <div className="text-[11px] text-slate-600 space-y-0.5">
                        <div>Secondary: <strong className="text-slate-800">{item.secondaryMantra}</strong></div>
                        <div>Timing: <strong className="text-slate-800">{item.dayAndTime} ({item.count} counts)</strong></div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-950 text-purple-100 text-xs leading-relaxed space-y-1">
                      <strong className="text-purple-300 block text-[10px] uppercase font-bold tracking-wider">
                        Specific Practice Method:
                      </strong>
                      <p className="text-[11px]">{item.specificPractice}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 3: KARMIC DEBT MANTRAS */}
      {/* ======================================================== */}
      {activeTab === "karmic" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-purple-900/10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                Karmic Debt Sound Protocols (Compounds 13, 14, 16, 19)
              </h3>
              <p className="text-xs text-slate-500">
                Acoustic neutralization formulas for the four Karmic Debt compounds in the Chaldean & Pythagorean tradition.
              </p>
            </div>

            {/* SELECTOR STRIP FOR KARMIC DEBTS */}
            <div className="flex items-center gap-3">
              {[13, 14, 16, 19].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedKarmic(c)}
                  className={`px-5 py-2.5 rounded-xl font-serif font-bold text-sm transition-all ${
                    selectedKarmic === c
                      ? "bg-rose-900 text-white shadow-md scale-105"
                      : "bg-slate-100 text-slate-700 hover:bg-rose-50 border border-slate-200"
                  }`}
                >
                  Compound {c}
                </button>
              ))}
            </div>

            {/* KARMIC DETAIL DISPLAY */}
            {(() => {
              const kData = KARMIC_DEBT_MANTRAS_DATA[selectedKarmic] || KARMIC_DEBT_MANTRAS_DATA[13];
              return (
                <div className="p-6 rounded-2xl bg-rose-950 text-rose-50 space-y-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-800/80 pb-4">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-rose-100">{kData.title}</h4>
                      <p className="text-xs text-rose-300 mt-1">{kData.coreLesson}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-rose-900/80 text-rose-200 border border-rose-700/60 shrink-0">
                      Duration: {kData.duration}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-rose-900/50 border border-rose-700/50 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300">Primary Sound Formula</span>
                      <div className="font-serif font-bold text-white text-base">"{kData.primaryMantra}"</div>
                    </div>

                    <div className="p-4 rounded-xl bg-rose-900/50 border border-rose-700/50 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300">Secondary Formula</span>
                      <div className="font-serif font-bold text-white text-base">"{kData.secondaryMantra}"</div>
                    </div>

                    <div className="p-4 rounded-xl bg-rose-900/50 border border-rose-700/50 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300">Specific Trigger Formula</span>
                      <div className="font-serif font-bold text-amber-200 text-sm">"{kData.specificMantra}"</div>
                    </div>
                  </div>

                  {/* DAILY ROUTINE BREAKDOWN */}
                  <div className="space-y-3 pt-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-rose-300">Daily Sound Practice Schedule</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {kData.dailyRoutine.map((r, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-rose-800/60 space-y-1">
                          <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                            <span>{r.time}</span>
                            <span>{r.count} Counts</span>
                          </div>
                          <div className="font-mono text-xs text-rose-100 font-bold">"{r.mantra}"</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 4: UNIVERSAL MANTRAS */}
      {/* ======================================================== */}
      {activeTab === "universal" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-purple-900/10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Universal Vedic Mantras for All Numbers
              </h3>
              <p className="text-xs text-slate-500">
                Foundational sound invocations serving all numbers, life paths, and spiritual practices simultaneously.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {UNIVERSAL_MANTRAS.map((u) => (
                <div key={u.id} className="p-5 rounded-2xl bg-slate-900 text-slate-100 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="border-b border-slate-800 pb-2">
                      <h4 className="font-serif font-bold text-purple-300 text-base">{u.title}</h4>
                      <p className="text-[11px] text-slate-400">{u.significance}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-center font-serif font-bold text-amber-200 text-sm sm:text-base leading-relaxed">
                      "{u.sanskrit}"
                    </div>

                    <div className="text-xs text-slate-300 italic leading-relaxed">
                      <strong className="text-purple-300 block mb-0.5 font-bold">Translation:</strong>
                      {u.translation}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-purple-200">
                      <span>Usage: {u.usageCount}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {u.recommendedFor.map((rec, rIdx) => (
                        <span key={rIdx} className="px-2.5 py-0.5 rounded-md text-[10px] bg-purple-900/80 text-purple-200 font-medium">
                          {rec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 5: JAPA SCIENCE & 40-DAY PROTOCOL */}
      {/* ======================================================== */}
      {activeTab === "japa" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-purple-900/10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                The Science of Japa & 40-Day Purashcharana Protocol
              </h3>
              <p className="text-xs text-slate-500">
                Neuromuscular entrainment and traditional Vedic guidelines for establishing a transformative daily mantra practice.
              </p>
            </div>

            {/* STEP BY STEP JAPA SESSION GUIDE */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">The 6-Step Daily Japa Session Flow</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {JAPA_PROTOCOL_STEPS.map((step) => (
                  <div key={step.stepNumber} className="p-4 rounded-xl bg-purple-50/50 border border-purple-200 space-y-2">
                    <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                      <span className="font-serif font-bold text-purple-950 text-sm">
                        Step {step.stepNumber}: {step.title}
                      </span>
                      <span className="text-[10px] font-bold bg-purple-200 text-purple-900 px-2 py-0.5 rounded">
                        {step.duration}
                      </span>
                    </div>

                    <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                      {step.instructions.map((inst, iIdx) => (
                        <li key={iIdx}>{inst}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 40-DAY PURASHCHARANA RULES & INTEGRATED REMEDIAL PROGRAMME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 space-y-3">
                <h4 className="font-serif font-bold text-amber-300 text-base flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400" />
                  The 40-Day Purashcharana Rules
                </h4>
                <ul className="text-xs text-slate-300 space-y-2 leading-relaxed list-disc pl-4">
                  <li><strong>Continuous Unbroken Continuity:</strong> 108 repetitions daily for 40 consecutive days. If a single day is missed, the 40-day counter resets to day 1.</li>
                  <li><strong>Acoustic Fidelity:</strong> Syllables must be pronounced with exact phonetic clarity, maintaining an unhurried, steady rhythm.</li>
                  <li><strong>Never Cross the Sumeru:</strong> When counting with the 108-bead mala, reverse direction at the Guru bead rather than crossing it.</li>
                  <li><strong>Sincere Intention:</strong> One-hundred eight repetitions with genuine presence exceed ten thousand mechanical repetitions.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-purple-950 text-purple-100 space-y-3">
                <h4 className="font-serif font-bold text-purple-200 text-base flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-400" />
                  The Four-System Integration Protocol
                </h4>
                <div className="text-xs space-y-2 leading-relaxed">
                  <p><strong>1. Directional Alignment (Day 1):</strong> Align sleep and working directions first (cost-free & permanent).</p>
                  <p><strong>2. Color Protocol (Week 1):</strong> Wear primary planetary colors to establish visual wavelength entrainment.</p>
                  <p><strong>3. Mantra Practice (Day 1 to Day 40):</strong> Practice daily Japa for 40 days to open the aura and energy channels.</p>
                  <p><strong>4. Gemstone Installation (Day 40+):</strong> Install primary gemstone only after 40 days of mantra practice so skin receives gemstone influence in a prepared consciousness.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
