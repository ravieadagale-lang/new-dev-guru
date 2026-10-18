// src/components/ChakraBalancingRemediesView.tsx

import React, { useState } from "react";
import {
  Sparkles,
  Heart,
  Sun,
  Moon,
  Compass,
  Flame,
  Clock,
  Layers,
  Activity,
  CheckCircle2,
  Volume2,
  BookOpen,
  Zap,
  Calendar,
  ShieldAlert,
  Repeat,
  Check,
  ChevronRight,
  Award
} from "lucide-react";
import {
  CHAKRA_CHAPTER_INTRO,
  CHAKRA_CORRESPONDENCE_MATRIX,
  DETAILED_CHAKRA_BALANCING_DATA,
  WEEKLY_CHAKRA_PROGRAMME,
  PROGRAMME_108_DAYS,
  ASSESSMENT_METRICS_108_DAYS,
  DetailedChakraData
} from "../data/chakraBalancingRemediesData";

interface ChakraBalancingRemediesViewProps {
  lifePathNumber?: number;
  driverNumber?: number;
  missingNumbers?: number[];
  karmicDebts?: number[];
}

export const ChakraBalancingRemediesView: React.FC<ChakraBalancingRemediesViewProps> = ({
  lifePathNumber = 1,
  driverNumber = 1,
  missingNumbers = [2, 5],
  karmicDebts = [13]
}) => {
  const [activeSection, setActiveSection] = useState<
    "overview" | "chakras_detail" | "meditations" | "rituals" | "weekly_programme" | "program_108_days"
  >("chakras_detail");

  const [selectedChakraNum, setSelectedChakraNum] = useState<number>(1);

  const selectedChakra: DetailedChakraData =
    DETAILED_CHAKRA_BALANCING_DATA.find((c) => c.chakraNumber === selectedChakraNum) ||
    DETAILED_CHAKRA_BALANCING_DATA[0];

  return (
    <div id="chakra-balancing-rem-view" className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-8 text-slate-100">
      {/* Header Banner */}
      <div id="chakra-header-banner" className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-purple-400" />
            Chapter Thirty-Eight · Integrated Numerology & Chakra Science
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Chakra Balancing Through Numbers, Affirmations, Meditations & Ritual Remedies
          </h1>

          <p className="text-slate-300 text-sm md:text-base max-w-4xl leading-relaxed italic border-l-2 border-purple-400/50 pl-4 py-1">
            "{CHAKRA_CHAPTER_INTRO.quote}"
            <span className="block not-italic text-xs text-purple-300 font-semibold mt-1">
              — {CHAKRA_CHAPTER_INTRO.quoteAuthor}
            </span>
          </p>

          {/* Quick Profile Summary Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-amber-300">
              Life Path: <strong className="text-white">{lifePathNumber}</strong>
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-purple-300">
              Driver/Psychic: <strong className="text-white">{driverNumber}</strong>
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-rose-300">
              Missing Numbers: <strong className="text-white">{missingNumbers.length > 0 ? missingNumbers.join(", ") : "None"}</strong>
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-cyan-300">
              Karmic Debts: <strong className="text-white">{karmicDebts.length > 0 ? karmicDebts.join(", ") : "None"}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div id="chakra-nav-tabs" className="flex flex-wrap items-center justify-start gap-2 border-b border-slate-800 pb-3">
        <button
          id="tab-btn-overview"
          onClick={() => setActiveSection("overview")}
          className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeSection === "overview"
              ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
              : "bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Chapter Overview & Matrix
        </button>

        <button
          id="tab-btn-chakras-detail"
          onClick={() => setActiveSection("chakras_detail")}
          className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeSection === "chakras_detail"
              ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
              : "bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
          }`}
        >
          <Activity className="w-4 h-4" />
          7 Chakras Deep Dive
        </button>

        <button
          id="tab-btn-meditations"
          onClick={() => setActiveSection("meditations")}
          className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeSection === "meditations"
              ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
              : "bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
          }`}
        >
          <Volume2 className="w-4 h-4" />
          Guided Meditations
        </button>

        <button
          id="tab-btn-rituals"
          onClick={() => setActiveSection("rituals")}
          className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeSection === "rituals"
              ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
              : "bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
          }`}
        >
          <Flame className="w-4 h-4" />
          6 Ritual Remedies / Chakra
        </button>

        <button
          id="tab-btn-weekly"
          onClick={() => setActiveSection("weekly_programme")}
          className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeSection === "weekly_programme"
              ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
              : "bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
          }`}
        >
          <Calendar className="w-4 h-4" />
          7-Day Weekly Cycle
        </button>

        <button
          id="tab-btn-108day"
          onClick={() => setActiveSection("program_108_days")}
          className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeSection === "program_108_days"
              ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
              : "bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
          }`}
        >
          <Repeat className="w-4 h-4" />
          108-Day Transformation
        </button>
      </div>

      {/* SECTION 1: CHAPTER OVERVIEW & CORRESPONDENCE MATRIX */}
      {activeSection === "overview" && (
        <div id="section-overview" className="space-y-8">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              The Living Map of Number and Energy
            </h2>
            <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
              {CHAKRA_CHAPTER_INTRO.introduction.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Correspondence Matrix Table */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-400" />
                  PART ONE — Number-Chakra Correspondence Matrix
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Complete mapping of primary numbers, secondary numbers, Lo Shu positions, and Karmic Debt impacts across all 7 chakras.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead>
                  <tr className="bg-slate-800/80 text-purple-300 border-b border-slate-700">
                    <th className="p-3 font-semibold">Chakra & Location</th>
                    <th className="p-3 font-semibold">Primary Numbers & Planets</th>
                    <th className="p-3 font-semibold">Secondary Numbers</th>
                    <th className="p-3 font-semibold">Lo Shu Grid Positions</th>
                    <th className="p-3 font-semibold">Karmic Debt Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {CHAKRA_CORRESPONDENCE_MATRIX.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 font-semibold text-white">
                        {item.chakra}
                        <div className="text-[11px] text-slate-400 font-normal">{item.location}</div>
                      </td>
                      <td className="p-3 text-amber-300">{item.primaryNumbers}</td>
                      <td className="p-3 text-slate-300">{item.secondaryNumbers}</td>
                      <td className="p-3 text-cyan-300">{item.loShuPositions}</td>
                      <td className="p-3 text-rose-300">{item.karmicDebt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: 7 CHAKRAS DEEP DIVE */}
      {activeSection === "chakras_detail" && (
        <div id="section-chakras-detail" className="space-y-6">
          {/* Chakra Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
            {DETAILED_CHAKRA_BALANCING_DATA.map((ch) => (
              <button
                key={ch.chakraNumber}
                id={`btn-select-chakra-${ch.chakraNumber}`}
                onClick={() => setSelectedChakraNum(ch.chakraNumber)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  selectedChakraNum === ch.chakraNumber
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-slate-800/60 text-slate-400 hover:text-white"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center text-[10px] font-bold text-purple-300">
                  {ch.chakraNumber}
                </span>
                {ch.englishName} ({ch.sanskritName})
              </button>
            ))}
          </div>

          {/* Selected Chakra Detail Card */}
          <div className={`rounded-2xl border ${selectedChakra.accentBorder} bg-gradient-to-br ${selectedChakra.themeGradient} p-6 md:p-8 space-y-6 shadow-xl`}>
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${selectedChakra.badgeBg} mb-2`}>
                  Chakra {selectedChakra.chakraNumber} · {selectedChakra.sanskritName}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                  {selectedChakra.englishName} ({selectedChakra.location})
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Corresponds to: <strong className="text-amber-300">{selectedChakra.numbers}</strong> · Planets:{" "}
                  <strong className="text-cyan-300">{selectedChakra.primaryPlanets}</strong> · Colour Ray:{" "}
                  <span className="text-white font-medium">{selectedChakra.colorName}</span>
                </p>
              </div>
            </div>

            {/* Numerological Diagnosis */}
            <div className="bg-slate-950/70 rounded-xl p-5 border border-slate-800/80 space-y-2">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Numerological Diagnosis of {selectedChakra.englishName} Imbalance
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {selectedChakra.diagnosis}
              </p>
            </div>

            {/* Power Affirmations */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Power Affirmations for {selectedChakra.englishName} ({selectedChakra.numbers})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedChakra.affirmations.map((aff, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>"{aff}"</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Abbreviated Meditation Overview */}
            <div className="bg-slate-950/70 rounded-xl p-5 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  🧘 Step-by-Step Meditation Protocol: {selectedChakra.meditation.title}
                </h3>
                <button
                  onClick={() => setActiveSection("meditations")}
                  className="text-xs text-purple-300 hover:text-purple-200 underline font-semibold flex items-center gap-1"
                >
                  View All Steps <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                {selectedChakra.meditation.steps.map((st) => (
                  <div key={st.stepNumber} className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between text-purple-300 font-semibold">
                      <span>Step {st.stepNumber}: {st.title}</span>
                      <span className="text-[10px] text-slate-400">{st.duration}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-3">{st.instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6 Ritual Remedies List */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                ✦ 6 Ritual Remedies for {selectedChakra.englishName}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedChakra.ritualRemedies.map((rit) => (
                  <div key={rit.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-white">{rit.id}. {rit.title}</span>
                        {rit.tag && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold shrink-0">
                            {rit.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{rit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: GUIDED MEDITATIONS FULL PROTOCOL */}
      {activeSection === "meditations" && (
        <div id="section-meditations" className="space-y-6">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-2">
            <h2 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-cyan-400" />
              Full Step-by-Step Guided Meditation Protocols for All 7 Chakras
            </h2>
            <p className="text-xs text-slate-400">
              Each meditation structure integrates number visualisation, color rays, seed mantras (Beeja), breathwork, and deep somatic anchoring.
            </p>
          </div>

          {/* Chakra Selector for Meditations */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
            {DETAILED_CHAKRA_BALANCING_DATA.map((ch) => (
              <button
                key={ch.chakraNumber}
                onClick={() => setSelectedChakraNum(ch.chakraNumber)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  selectedChakraNum === ch.chakraNumber
                    ? "bg-cyan-600 text-white shadow-lg"
                    : "bg-slate-800/60 text-slate-400 hover:text-white"
                }`}
              >
                Chakra {ch.chakraNumber}: {ch.sanskritName}
              </button>
            ))}
          </div>

          {/* Meditation Details */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Chakra {selectedChakra.chakraNumber} · {selectedChakra.sanskritName} ({selectedChakra.englishName})
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">
                🧘 {selectedChakra.meditation.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Primary Numbers: {selectedChakra.numbers} · Color Focus: {selectedChakra.colorName}
              </p>
            </div>

            <div className="space-y-4">
              {selectedChakra.meditation.steps.map((step) => (
                <div key={step.stepNumber} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-sm font-bold text-cyan-300">
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-cyan-900/50 text-cyan-300 text-xs flex items-center justify-center border border-cyan-500/30">
                        {step.stepNumber}
                      </span>
                      Step {step.stepNumber}: {step.title}
                    </span>
                    <span className="text-xs text-slate-400 font-normal px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed pl-8">
                    {step.instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: 6 RITUAL REMEDIES FOR ALL CHAKRAS */}
      {activeSection === "rituals" && (
        <div id="section-rituals" className="space-y-6">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-2">
            <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              Complete 6 Ceremonial Ritual Remedies for Each Chakra
            </h2>
            <p className="text-xs text-slate-400">
              Specific physical ceremonies, elemental practices, aromatherapy, and habit triggers calibrated to clear numerical blockages.
            </p>
          </div>

          <div className="space-y-8">
            {DETAILED_CHAKRA_BALANCING_DATA.map((ch) => (
              <div key={ch.chakraNumber} className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className={`text-lg font-bold ${ch.textColor} flex items-center gap-2`}>
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-white text-xs flex items-center justify-center font-bold">
                      {ch.chakraNumber}
                    </span>
                    Chakra {ch.chakraNumber}: {ch.englishName} ({ch.sanskritName}) — {ch.numbers}
                  </h3>
                  <span className="text-xs text-slate-400">Planets: {ch.primaryPlanets}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ch.ritualRemedies.map((rit) => (
                    <div key={rit.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-bold text-white">{rit.id}. {rit.title}</span>
                          {rit.tag && (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold shrink-0">
                              {rit.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{rit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: 7-DAY WEEKLY CHAKRA CYCLE */}
      {activeSection === "weekly_programme" && (
        <div id="section-weekly" className="space-y-6">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-2">
            <h2 className="text-xl font-bold text-purple-300 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              PART NINE — The Seven-Day Chakra-Number Weekly Programme
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              A rotating 7-day schedule aligning each day of the week with its ruling planet, correspondent chakra, primary numbers, morning affirmation, meditation practice, ritual, and evening mantra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WEEKLY_CHAKRA_PROGRAMME.map((dayItem, idx) => (
              <div key={idx} className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3 hover:border-purple-500/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                    <span className="text-base font-extrabold text-amber-300">{dayItem.day}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {dayItem.planet}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <span className="text-slate-400 font-medium">Chakra & Numbers:</span>
                      <p className="text-white font-semibold">{dayItem.chakra} ({dayItem.numbers})</p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-medium">☀️ Morning Activation:</span>
                      <p className="text-slate-200">{dayItem.morning}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-medium">🧘 Core Practice:</span>
                      <p className="text-cyan-300">{dayItem.practice}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-medium">✦ Ritual & Attire:</span>
                      <p className="text-amber-200">{dayItem.ritual}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-purple-300 font-mono">
                  🌙 Evening: {dayItem.evening}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 6: 108-DAY TRANSFORMATION PROGRAMME */}
      {activeSection === "program_108_days" && (
        <div id="section-108day" className="space-y-8">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-3">
            <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
              <Repeat className="w-5 h-5 text-amber-400" />
              The Complete 108-Day Integrated Transformation Programme
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Three unbroken 36-day Purashcharana cycles designed to permanently recalibrate subtle body energy, resolve missing number blockages, and establish unshakeable spiritual alignment.
            </p>
          </div>

          {/* 3 Phases */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROGRAMME_108_DAYS.map((ph) => (
              <div key={ph.phase} className="bg-slate-900/90 rounded-2xl border border-purple-500/30 p-6 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-full bg-purple-600 text-white font-extrabold flex items-center justify-center text-sm shadow">
                      {ph.phase}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
                      {ph.days}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{ph.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{ph.description}</p>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Daily Core Practices:</h4>
                    <ul className="space-y-1.5 text-xs text-slate-200">
                      {ph.dailyPractices.map((dp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{dp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 mt-4 pt-3 border-t border-slate-800">
                    <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Phase Additions:</h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {ph.additions.map((ad, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                          <span>{ad}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Assessment Metrics at Day 108 */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              Verified Assessment Metrics at Day 108
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ASSESSMENT_METRICS_108_DAYS.map((met, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">{met.category}</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{met.metric}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
