// src/components/LoShuGridSystemView.tsx
// Comprehensive Lo Shu Grid & Nine Planes System View
// Based on Chapter Twenty-Four (Origins, Construction & Reading) and Chapter Twenty-Five (Nine Planes of Expression)

import React, { useState, useMemo } from "react";
import { 
  Grid3X3, 
  Sparkles, 
  BookOpen, 
  Activity, 
  Compass, 
  Layers, 
  ShieldCheck, 
  Award, 
  Users, 
  TrendingUp, 
  Zap, 
  Info,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from "lucide-react";
import { 
  LOSHU_POSITIONS_DATA, 
  LOSHU_PLANES_DATA, 
  CHAPTER_TWENTY_FOUR_THEORY_TEXT, 
  CHAPTER_TWENTY_FIVE_THEORY_TEXT 
} from "../data/loshuGridCompleteData";
import { calculateLoShuGridEngine } from "../data/numerologyGrids";

interface LoShuGridSystemViewProps {
  initialDob?: string;
  userProfile?: any;
  selectedLanguage?: any;
}

export const LoShuGridSystemView: React.FC<LoShuGridSystemViewProps> = ({
  initialDob = "1995-08-15",
  userProfile
}) => {
  const [inputDob, setInputDob] = useState<string>(userProfile?.dob || initialDob);

  React.useEffect(() => {
    if (userProfile?.dob) {
      setInputDob(userProfile.dob);
    }
  }, [userProfile?.dob]);

  const [activeTab, setActiveTab] = useState<
    "matrix_engine" | "positions_library" | "planes_engine" | "chapter_24_theory" | "chapter_25_theory" | "case_studies"
  >("matrix_engine");

  const [selectedPosNum, setSelectedPosNum] = useState<number>(1);
  const [selectedPlaneId, setSelectedPlaneId] = useState<string>("mental");
  const [selectedCaseStudyIdx, setSelectedCaseStudyIdx] = useState<number>(0);

  // Helper to compute Driver (Mulank) & Conductor (Bhagyank) from DOB
  const { driverNum, conductorNum } = useMemo(() => {
    if (!inputDob) return { driverNum: 1, conductorNum: 1 };
    const parts = inputDob.split("-");
    if (parts.length < 3) return { driverNum: 1, conductorNum: 1 };

    const day = parseInt(parts[2], 10) || 15;
    const month = parseInt(parts[1], 10) || 8;
    const year = parseInt(parts[0], 10) || 1995;

    const reduceNum = (num: number): number => {
      let sum = num;
      while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
        sum = sum.toString().split("").reduce((acc, curr) => acc + parseInt(curr, 10), 0);
      }
      return sum;
    };

    const driver = reduceNum(day);
    const totalSum = day.toString().split("").concat(month.toString().split(""), year.toString().split("")).reduce((a, b) => a + parseInt(b, 10), 0);
    const conductor = reduceNum(totalSum);

    return { driverNum: driver > 9 ? reduceNum(driver) : driver, conductorNum: conductor > 9 ? reduceNum(conductor) : conductor };
  }, [inputDob]);

  // Calculated Lo Shu Engine Result
  const loShuResult = useMemo(() => {
    return calculateLoShuGridEngine(inputDob, driverNum, conductorNum);
  }, [inputDob, driverNum, conductorNum]);

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Header */}
      <div className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-amber-800/60 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block font-sans">
                Part Five • Complete Lo Shu Grid & Nine Planes System
              </span>
              <span className="px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold">
                Chapter 24 & 25 Engine
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
              The Lo Shu Magic Square & Planes of Expression
            </h1>
            <p className="text-sm text-amber-100/90 mt-2 max-w-3xl leading-relaxed font-sans">
              An ancient Chinese & Vedic nine-cell grid mapping personality, energy planes, and life dynamics through birth date numbers, occupied cells, and empty developmental growth areas.
            </p>
          </div>

          {/* Date of Birth Input Box */}
          <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-2 shrink-0">
            <label htmlFor="loshu-dob-input" className="text-xs font-bold text-amber-300 uppercase tracking-wider block font-sans">
              Enter Date of Birth
            </label>
            <input
              id="loshu-dob-input"
              type="date"
              value={inputDob}
              onChange={(e) => setInputDob(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 text-amber-300 border border-amber-500/40 font-mono text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 w-full"
            />
            <div className="flex items-center justify-between text-[11px] font-mono text-amber-200/90 pt-1">
              <span>Mulank (Driver): <strong>{driverNum}</strong></span>
              <span>Bhagyank (Conductor): <strong>{conductorNum}</strong></span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex flex-wrap gap-2 pt-1 font-sans">
          {[
            { id: "matrix_engine", label: "3x3 Matrix Engine", icon: Grid3X3 },
            { id: "positions_library", label: "9 Grid Positions (1-9)", icon: Compass },
            { id: "planes_engine", label: "9 Planes of Expression", icon: Layers },
            { id: "chapter_24_theory", label: "Chapter 24 Theory & Origins", icon: BookOpen },
            { id: "chapter_25_theory", label: "Chapter 25 Planes Theory", icon: BookOpen },
            { id: "case_studies", label: "Worked Case Studies", icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-amber-400 text-slate-950 shadow-lg scale-105"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: 3X3 MATRIX ENGINE & CALCULATOR */}
      {/* ======================================================== */}
      {activeTab === "matrix_engine" && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">
                  Interactive Personal Magic Square
                </span>
                <h2 className="font-serif text-2xl font-bold text-slate-900 mt-0.5">
                  Your Lo Shu Grid & Active Power Yogas
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                  {Object.values(loShuResult.grid).filter((c: any) => c?.isPresent).length} of 9 Positions Occupied
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: 3x3 Magic Square Visualizer */}
              <div className="lg:col-span-5 bg-gradient-to-br from-amber-50 to-orange-50/60 p-6 sm:p-8 rounded-3xl border border-amber-200/80 flex flex-col items-center justify-center space-y-6 shadow-sm">
                <div className="text-center space-y-1">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block font-sans">
                    3x3 Lo Shu Matrix (Every line sums to 15)
                  </span>
                  <p className="text-xs text-slate-600 font-sans">
                    Plotted from birth date: <strong className="text-amber-950">{inputDob}</strong>
                  </p>
                </div>

                {/* 3x3 Grid Display */}
                <div className="grid grid-cols-3 gap-3.5 w-72 h-72 sm:w-80 sm:h-80">
                  {[[4, 9, 2], [3, 5, 7], [8, 1, 6]].map((row) =>
                    row.map((digit) => {
                      const cell = loShuResult.grid[digit];
                      const isPresent = cell && cell.isPresent;
                      const count = cell ? cell.count : 0;
                      return (
                        <button
                          key={digit}
                          onClick={() => {
                            setSelectedPosNum(digit);
                            setActiveTab("positions_library");
                          }}
                          className={`flex flex-col items-center justify-center rounded-2xl border-2 transition-all p-2 cursor-pointer ${
                            isPresent
                              ? "bg-slate-900 text-amber-300 border-amber-400 shadow-md hover:scale-105"
                              : "bg-white/70 text-slate-300 border-dashed border-amber-900/20 hover:bg-white/90 hover:text-slate-500"
                          }`}
                        >
                          <span className="font-serif font-bold text-3xl sm:text-4xl">{digit}</span>
                          <span className="text-[10px] font-mono mt-1 font-bold">
                            {isPresent ? `${count}x Plotted` : "Missing"}
                          </span>
                          <span className="text-[9px] font-sans opacity-75 mt-0.5 text-center truncate w-full px-1">
                            {LOSHU_POSITIONS_DATA[digit]?.element.split(" ")[0]}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Grid Legend & Instructions */}
                <div className="text-[11px] text-amber-950 font-medium text-center space-y-1 bg-white/80 p-3 rounded-2xl border border-amber-200/60 font-sans w-full">
                  <p><strong>Top Row:</strong> Mental Plane (4-9-2)</p>
                  <p><strong>Middle Row:</strong> Emotional Plane (3-5-7)</p>
                  <p><strong>Bottom Row:</strong> Practical Plane (8-1-6)</p>
                </div>
              </div>

              {/* Right Column: Planes & Yogas Summary */}
              <div className="lg:col-span-7 space-y-6 font-sans">
                {/* Raj Yogas / Golden & Silver Planes */}
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-2">
                    Primary Raj Yogas & Special Diagonals
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Golden Raj Yoga */}
                    <div className={`p-4 rounded-2xl border transition-all ${
                      loShuResult.goldenYoga
                        ? "bg-amber-100/80 border-amber-400 text-amber-950 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold flex items-center gap-1.5 text-sm text-slate-900 font-serif">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          Golden Raj Yoga (4-5-6)
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          loShuResult.goldenYoga ? "bg-amber-400 text-slate-950" : "bg-slate-200 text-slate-600"
                        }`}>
                          {loShuResult.goldenYoga ? "ACTIVE POWER" : "Incomplete"}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed">
                        The Golden Plane of Willpower & Supreme Material Success. Connects practical planning (4), central willpower (5), and creative expression (6).
                      </p>
                    </div>

                    {/* Silver Raj Yoga */}
                    <div className={`p-4 rounded-2xl border transition-all ${
                      loShuResult.silverYoga
                        ? "bg-amber-100/80 border-amber-400 text-amber-950 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold flex items-center gap-1.5 text-sm text-slate-900 font-serif">
                          <Award className="w-4 h-4 text-amber-600" />
                          Silver Raj Yoga (2-5-8)
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          loShuResult.silverYoga ? "bg-amber-400 text-slate-950" : "bg-slate-200 text-slate-600"
                        }`}>
                          {loShuResult.silverYoga ? "ACTIVE POWER" : "Incomplete"}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed">
                        The Silver Plane of Real Estate, Land Assets & Deep Spiritual Wisdom. Links intuition (2), central balance (5), and integrated wisdom (8).
                      </p>
                    </div>
                  </div>
                </div>

                {/* 6 Core Planes Evaluation */}
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-2">
                    Horizontal & Vertical Planes Status
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {loShuResult.planes.map((plane, pIdx) => (
                      <div
                        key={pIdx}
                        className={`p-3.5 rounded-2xl border text-xs space-y-1 transition-all ${
                          plane.isComplete
                            ? "bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-xs"
                            : "bg-slate-50 border-slate-200 text-slate-700"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <strong className="font-bold text-slate-900">{plane.name}</strong>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              plane.isComplete
                                ? "bg-emerald-200 text-emerald-900"
                                : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {plane.isComplete ? "COMPLETE" : "Partial"}
                          </span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-700">
                          {plane.impact}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Missing Numbers & Remedies Summary */}
                {(loShuResult?.missingRemedies?.length ?? 0) > 0 && (
                  <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                    <h4 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      Missing Numbers Growth Opportunities ({(loShuResult?.missingRemedies || []).map(m => m.digit).join(", ")})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {(loShuResult?.missingRemedies || []).slice(0, 4).map((rem) => (
                        <div key={rem.digit} className="p-2.5 rounded-xl bg-white border border-amber-200/80 space-y-0.5">
                          <span className="font-bold text-amber-900">Missing Number {rem.digit} ({rem.element} Element)</span>
                          <p className="text-[11px] text-slate-700">{rem.remedy}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: 9 GRID POSITIONS LIBRARY (1-9) */}
      {/* ======================================================== */}
      {activeTab === "positions_library" && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">
                Part One — The Structure of the Lo Shu Grid
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-0.5">
                The Nine Positions (Detailed Reference Library)
              </h2>
              <p className="text-xs text-slate-600 mt-1 font-sans">
                Every cell in the 3x3 magic square holds a fixed position, fixed direction, fixed governing element, and fixed psychological significance.
              </p>
            </div>

            {/* Position Selector Buttons */}
            <div className="flex flex-wrap gap-2 font-sans">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((posNum) => {
                const pos = LOSHU_POSITIONS_DATA[posNum];
                const isSelected = selectedPosNum === posNum;
                const cellInUserGrid = loShuResult.grid[posNum];
                const isPresentInUserGrid = cellInUserGrid && cellInUserGrid.isPresent;

                return (
                  <button
                    key={posNum}
                    onClick={() => setSelectedPosNum(posNum)}
                    className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 text-amber-300 shadow-md ring-2 ring-amber-400"
                        : isPresentInUserGrid
                        ? "bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <span>Pos {posNum}: {pos.name.split("—")[1]?.trim() || pos.name}</span>
                    {isPresentInUserGrid && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Position Detailed Card */}
            {(() => {
              const pos = LOSHU_POSITIONS_DATA[selectedPosNum] || LOSHU_POSITIONS_DATA[1];
              const cellUser = loShuResult.grid[selectedPosNum];
              const userCount = cellUser ? cellUser.count : 0;

              return (
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 font-sans">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                          {pos.element} Element • Direction: {pos.direction}
                        </span>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-900">
                          Governed by: {pos.governingBody}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                        {pos.name}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">
                        Core Concept: {pos.coreConcept}
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-2xl border border-slate-200 text-center font-mono text-xs font-bold shrink-0">
                      <span className="block text-slate-400 text-[10px]">Your Birth Date</span>
                      <span className={userCount > 0 ? "text-emerald-700 text-base font-bold" : "text-rose-600 text-base font-bold"}>
                        {userCount > 0 ? `Occupied (${userCount}x)` : "Empty Position"}
                      </span>
                    </div>
                  </div>

                  {/* Detailed Paragraph Sections for Selected Position */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-800 leading-relaxed">
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                      <strong className="text-xs font-bold text-emerald-900 uppercase tracking-wider block font-serif border-b border-slate-100 pb-1">
                        Occupied Position Dynamics (1x & 2x Density)
                      </strong>
                      <p>{pos.occupiedMeaning}</p>
                      <p className="pt-2 border-t border-slate-100 font-medium text-slate-900">
                        <strong>Double Occupation:</strong> {pos.doubleOccupiedMeaning}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                      <strong className="text-xs font-bold text-amber-900 uppercase tracking-wider block font-serif border-b border-slate-100 pb-1">
                        High Density Risk (3x+ Density) & Empty State
                      </strong>
                      <p><strong>Triple/High Density:</strong> {pos.tripleOccupiedMeaning}</p>
                      <p className="pt-2 border-t border-slate-100">
                        <strong>Empty Position Meaning:</strong> {pos.emptyMeaning}
                      </p>
                    </div>
                  </div>

                  {/* Growth Guidance Box */}
                  <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 space-y-1">
                    <strong className="font-bold block text-indigo-900 uppercase tracking-wider text-[11px] font-serif">
                      Actionable Growth & Development Advice:
                    </strong>
                    <p>{pos.growthAdvice}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: 9 PLANES OF EXPRESSION ENGINE */}
      {/* ======================================================== */}
      {activeTab === "planes_engine" && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">
                Chapter Twenty-Five • Complete Planes Framework
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-0.5">
                The Nine Planes of Expression (Dimensional System)
              </h2>
              <p className="text-xs text-slate-600 mt-1 font-sans">
                Examines complete horizontal rows, vertical columns, and diagonal axes — revealing the primary channels through which human energy flows.
              </p>
            </div>

            {/* Plane Selector Grid Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-sans">
              {LOSHU_PLANES_DATA.map((p) => {
                const isSelected = selectedPlaneId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlaneId(p.id)}
                    className={`p-3 rounded-2xl text-left border text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 text-amber-300 border-amber-400 shadow-md"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] text-slate-400 mb-0.5">
                      <span>Plane {p.planeNumber} • {p.type}</span>
                      <span>Positions: {p.positions?.join("-") || "—"}</span>
                    </div>
                    <span className="block text-sm font-serif">{p.name.split("(")[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Plane Detail View */}
            {(() => {
              const plane = LOSHU_PLANES_DATA.find(p => p.id === selectedPlaneId) || LOSHU_PLANES_DATA[0];

              return (
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 font-sans">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <div>
                      <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">
                        Plane {plane.planeNumber} • {plane.type} Axis • Positions ({plane.positions?.join(", ") || "—"})
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                        {plane.name}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">
                        Core Focus: {plane.coreFocus}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-800 leading-relaxed">
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                      <strong className="text-xs font-bold text-emerald-900 uppercase tracking-wider block font-serif border-b border-slate-100 pb-1">
                        Fully Occupied Plane Dynamics
                      </strong>
                      <p>{plane.fullOccupiedDescription}</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                      <strong className="text-xs font-bold text-amber-900 uppercase tracking-wider block font-serif border-b border-slate-100 pb-1">
                        Partial & Empty Plane Dynamics
                      </strong>
                      <p><strong>Partial Occupancy:</strong> {plane.partialOccupiedDescription}</p>
                      <p className="pt-2 border-t border-slate-100">
                        <strong>Completely Empty State:</strong> {plane.emptyDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
                    <strong className="font-bold block text-amber-900 uppercase tracking-wider text-[11px] font-serif">
                      Developmental Guidance for Plane Balance:
                    </strong>
                    <p>{plane.growthGuidance}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: CHAPTER 24 THEORY & ORIGINS */}
      {/* ======================================================== */}
      {activeTab === "chapter_24_theory" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="border-b border-amber-800/60 pb-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block font-sans">
                {CHAPTER_TWENTY_FOUR_THEORY_TEXT.chapterNumber} Theoretical Documentation
              </span>
              <h2 className="font-serif text-3xl font-bold text-white mt-1">
                {CHAPTER_TWENTY_FOUR_THEORY_TEXT.title}
              </h2>
            </div>

            <p className="text-sm text-amber-200/90 font-serif italic border-l-2 border-amber-400 pl-4 py-1">
              "{CHAPTER_TWENTY_FOUR_THEORY_TEXT.quote.text}" — <span className="not-italic text-amber-300 font-sans text-xs">{CHAPTER_TWENTY_FOUR_THEORY_TEXT.quote.author}</span>
            </p>

            <div className="space-y-4 text-xs text-amber-100/90 leading-relaxed font-sans">
              <h3 className="font-serif text-lg font-bold text-amber-300 border-b border-amber-800/40 pb-1">
                Origins — The River Map and the Sacred Tortoise
              </h3>
              {CHAPTER_TWENTY_FOUR_THEORY_TEXT.originsText.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 font-sans text-xs text-slate-800 leading-relaxed">
            <h3 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Construction Method & 5-Step Reading Framework
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <strong className="text-xs font-bold text-slate-900 uppercase tracking-wider block font-serif border-b border-slate-200 pb-1">
                  Construction Steps
                </strong>
                <ol className="list-decimal list-inside space-y-2 text-slate-700">
                  {CHAPTER_TWENTY_FOUR_THEORY_TEXT.constructionSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <strong className="text-xs font-bold text-slate-900 uppercase tracking-wider block font-serif border-b border-slate-200 pb-1">
                  5-Step Reading Framework
                </strong>
                <div className="space-y-2">
                  {CHAPTER_TWENTY_FOUR_THEORY_TEXT.readingSteps.map((step) => (
                    <div key={step.stepNumber} className="space-y-0.5">
                      <strong className="text-amber-900 block">{step.title}</strong>
                      <p className="text-slate-600 text-[11px]">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
              <h4 className="font-serif text-base font-bold text-slate-900">
                Special Grid Configurations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CHAPTER_TWENTY_FOUR_THEORY_TEXT.specialConfigurations.map((cfg, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-amber-200/80 space-y-1">
                    <strong className="text-amber-900 font-bold block">{cfg.title}</strong>
                    <p className="text-slate-700 text-[11px]">{cfg.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: CHAPTER 25 PLANES THEORY */}
      {/* ======================================================== */}
      {activeTab === "chapter_25_theory" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="border-b border-amber-800/60 pb-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block font-sans">
                {CHAPTER_TWENTY_FIVE_THEORY_TEXT.chapterNumber} Theoretical Documentation
              </span>
              <h2 className="font-serif text-3xl font-bold text-white mt-1">
                {CHAPTER_TWENTY_FIVE_THEORY_TEXT.title}
              </h2>
            </div>

            <p className="text-sm text-amber-200/90 font-serif italic border-l-2 border-amber-400 pl-4 py-1">
              "{CHAPTER_TWENTY_FIVE_THEORY_TEXT.quote.text}" — <span className="not-italic text-amber-300 font-sans text-xs">{CHAPTER_TWENTY_FIVE_THEORY_TEXT.quote.author}</span>
            </p>

            <div className="space-y-3 text-xs text-amber-100/90 leading-relaxed font-sans">
              {CHAPTER_TWENTY_FIVE_THEORY_TEXT.introductionText.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 font-sans text-xs text-slate-800 leading-relaxed">
            <h3 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Plane Balance Score & Life Path Cross-Referencing
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <strong className="text-xs font-bold text-slate-900 uppercase tracking-wider block font-serif border-b border-slate-200 pb-1">
                  The Plane Balance Score
                </strong>
                <p>{CHAPTER_TWENTY_FIVE_THEORY_TEXT.planeBalanceScoreConcept}</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <strong className="text-xs font-bold text-slate-900 uppercase tracking-wider block font-serif border-b border-slate-200 pb-1">
                  Life Path & Plane Alignment
                </strong>
                <p>{CHAPTER_TWENTY_FIVE_THEORY_TEXT.lifePathCrossReferenceText}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: WORKED CASE STUDIES */}
      {/* ======================================================== */}
      {activeTab === "case_studies" && (
        <div className="space-y-6 font-sans">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
                Chapter Twenty-Four Worked Examples
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-0.5">
                Complete Lo Shu Grid Case Studies
              </h2>
            </div>

            {/* Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {CHAPTER_TWENTY_FOUR_THEORY_TEXT.workedCaseStudies.map((cs, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCaseStudyIdx(idx)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCaseStudyIdx === idx
                      ? "bg-slate-900 text-amber-300 shadow-md ring-2 ring-amber-400"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cs.name} ({cs.dob.split("(")[0]})
                </button>
              ))}
            </div>

            {/* Case Study Card */}
            {(() => {
              const cs = CHAPTER_TWENTY_FOUR_THEORY_TEXT.workedCaseStudies[selectedCaseStudyIdx];
              return (
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <div>
                      <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                        Case Study • {cs.dob}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-slate-900 mt-0.5">
                        {cs.name}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-1 text-xs font-mono text-slate-700">
                      <span>Plotted: <strong className="text-emerald-800">{cs.occupiedPositionsSummary}</strong></span>
                      <span>Missing: <strong className="text-rose-700">{cs.emptyPositionsSummary}</strong></span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs text-slate-800 leading-relaxed">
                    {cs.analysisParagraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
