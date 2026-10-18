import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sun, 
  Moon, 
  Heart, 
  Briefcase, 
  Home, 
  FileText, 
  Award, 
  Compass, 
  Stethoscope, 
  BookOpen, 
  Flame, 
  ChevronRight, 
  Info, 
  Search,
  Layers,
  Star,
  Check,
  Gem,
  Palette
} from "lucide-react";
import {
  CHAPTER_33_METADATA,
  DAYS_OF_WEEK_DATA,
  SIGNIFICANT_COMPOUNDS,
  PLANETARY_HORA_PROPERTIES,
  EVENT_SELECTION_PROTOCOLS,
  VEDIC_TITHI_MUHURTA_RULES,
  CONSULTATION_PROTOCOL_STEPS,
  calculateUniversalDayNumber,
  calculatePersonalYearNumber,
  calculatePersonalMonthNumber,
  calculatePersonalDayNumber,
  getDayOfWeekName,
  calculatePlanetaryHoras,
  evaluateEventSuitability
} from "../data/muhurtaNumerologyData";

interface MuhurtaNumerologyViewProps {
  initialDate?: string;
  initialDob?: string;
}

export const MuhurtaNumerologyView: React.FC<MuhurtaNumerologyViewProps> = ({
  initialDate = new Date().toISOString().split("T")[0],
  initialDob = "1990-05-15"
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [selectedDob, setSelectedDob] = useState<string>(initialDob);
  const [selectedEventType, setSelectedEventType] = useState<string>("business_launch");
  const [activeSubTab, setActiveSubTab] = useState<"evaluator" | "horas" | "weekdays" | "four_layers" | "vedic_protocol">("evaluator");

  // Hora settings
  const [sunriseTime, setSunriseTime] = useState<string>("06:15");
  const [sunsetTime, setSunsetTime] = useState<string>("18:30");

  // Calculations
  const suitabilityResult = evaluateEventSuitability(selectedEventType, selectedDate, selectedDob);
  const univDayInfo = calculateUniversalDayNumber(selectedDate);
  const dayName = getDayOfWeekName(selectedDate);
  const dayData = DAYS_OF_WEEK_DATA[dayName];
  const horasList = calculatePlanetaryHoras(selectedDate, sunriseTime, sunsetTime);

  return (
    <div className="space-y-8 text-slate-800">
      {/* CHAPTER HEADER */}
      <div className="bg-gradient-to-br from-amber-900 via-stone-900 to-indigo-950 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-amber-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Chapter {CHAPTER_33_METADATA.chapterNumber} · Auspicious Timing Science
          </div>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-amber-100 tracking-tight">
            {CHAPTER_33_METADATA.title}
          </h1>
          <p className="text-amber-200/90 text-sm md:text-base max-w-3xl leading-relaxed">
            {CHAPTER_33_METADATA.introduction}
          </p>
          <div className="pt-2 border-t border-amber-500/20 text-xs text-amber-300/80 italic font-serif">
            "{CHAPTER_33_METADATA.epigraph.quote}" — <span className="not-italic font-sans font-medium text-amber-200">{CHAPTER_33_METADATA.epigraph.source}</span>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab("evaluator")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeSubTab === "evaluator"
              ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Calendar className="w-4 h-4" />
          Event Muhurta Evaluator
        </button>
        <button
          onClick={() => setActiveSubTab("horas")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeSubTab === "horas"
              ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Clock className="w-4 h-4" />
          Planetary Horas (Intraday)
        </button>
        <button
          onClick={() => setActiveSubTab("weekdays")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeSubTab === "weekdays"
              ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Sun className="w-4 h-4" />
          7 Days & Ruling Planets
        </button>
        <button
          onClick={() => setActiveSubTab("four_layers")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeSubTab === "four_layers"
              ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Layers className="w-4 h-4" />
          4-Layer Alignment & 9-Yr Cycles
        </button>
        <button
          onClick={() => setActiveSubTab("vedic_protocol")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeSubTab === "vedic_protocol"
              ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Vedic Synergy & Consultation Protocol
        </button>
      </div>

      {/* ======================================================== */}
      {/* SUBTAB 1: EVENT MUHURTA EVALUATOR */}
      {/* ======================================================== */}
      {activeSubTab === "evaluator" && (
        <div className="space-y-6">
          {/* CONTROL BAR */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              Event Date Suitability Evaluator
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  1. Life Event Category
                </label>
                <select
                  value={selectedEventType}
                  onChange={(e) => setSelectedEventType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {EVENT_SELECTION_PROTOCOLS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  2. Target Event Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  3. Primary's Birth Date (DOB)
                </label>
                <input
                  type="date"
                  value={selectedDob}
                  onChange={(e) => setSelectedDob(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* EVALUATION RESULTS CARD */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className={`p-6 text-white flex flex-wrap items-center justify-between gap-4 ${
              suitabilityResult.score >= 82
                ? "bg-gradient-to-r from-emerald-800 to-teal-900"
                : suitabilityResult.score >= 60
                ? "bg-gradient-to-r from-amber-700 to-orange-900"
                : "bg-gradient-to-r from-rose-800 to-red-950"
            }`}>
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wider font-semibold text-white/80">
                  Auspiciousness Index
                </div>
                <div className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <span>{suitabilityResult.status}</span>
                  <span className="text-sm px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
                    {suitabilityResult.score} / 100
                  </span>
                </div>
                <div className="text-xs text-white/90">
                  For {suitabilityResult.eventType} on {selectedDate} ({suitabilityResult.dayName})
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl backdrop-blur-md border border-white/20">
                <div className="text-right">
                  <div className="text-xs text-white/80">Universal Day</div>
                  <div className="text-xl font-bold text-amber-200">
                    Number {suitabilityResult.universalDay} ({suitabilityResult.compoundName})
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* BREAKDOWN METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-semibold text-slate-500">Day of Week</div>
                  <div className="text-lg font-bold text-slate-900 mt-1">
                    {suitabilityResult.dayName}
                  </div>
                  <div className="text-xs text-amber-700 mt-0.5">
                    Ruled by {suitabilityResult.dayPlanet}
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-semibold text-slate-500">Universal Compound</div>
                  <div className="text-lg font-bold text-slate-900 mt-1">
                    Sum {suitabilityResult.compound}
                  </div>
                  <div className={`text-xs font-medium mt-0.5 ${
                    suitabilityResult.isCautionCompound ? "text-rose-600 font-bold" : "text-emerald-700"
                  }`}>
                    {suitabilityResult.isCautionCompound ? "Caution Compound!" : "Standard / Auspicious"}
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-semibold text-slate-500">Personal Year</div>
                  <div className="text-lg font-bold text-slate-900 mt-1">
                    PY {suitabilityResult.userPy}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Individual Annual Theme
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-semibold text-slate-500">Personal Day</div>
                  <div className="text-lg font-bold text-slate-900 mt-1">
                    PD {suitabilityResult.userPd}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Daily Personal Resonance
                  </div>
                </div>
              </div>

              {/* PROTOCOL GUIDELINES */}
              <div className="space-y-4 pt-2">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2 border-b pb-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  Specific Category Protocol & Guidelines
                </h4>

                <div className="bg-amber-50/60 border border-amber-200/80 p-4 rounded-xl text-sm text-amber-900">
                  <strong>Key Rule:</strong> {suitabilityResult.protocol.keyGuidelines}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-700 uppercase">Primary Compatible Numbers</div>
                    <div className="flex flex-wrap gap-2">
                      {suitabilityResult.protocol.primaryNumbers.map((n) => (
                        <span key={n} className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                          Number {n}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-700 uppercase">Auspicious Days of Week</div>
                    <div className="flex flex-wrap gap-2">
                      {suitabilityResult.protocol.bestDaysOfWeek.map((d) => (
                        <span key={d} className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700 uppercase">Step-by-Step Selection Protocol</div>
                  <ol className="space-y-2 text-xs md:text-sm text-slate-700 list-decimal list-inside bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {suitabilityResult.protocol.protocolSteps.map((step, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUBTAB 2: PLANETARY HORAS (INTRADAY TIMING) */}
      {/* ======================================================== */}
      {activeSubTab === "horas" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  Chaldean Planetary Hour (Hora) Calculator
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Intraday timing based on the ancient Chaldean order: Saturn, Jupiter, Mars, Sun, Venus, Mercury, Moon.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500">Sunrise</label>
                  <input
                    type="time"
                    value={sunriseTime}
                    onChange={(e) => setSunriseTime(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500">Sunset</label>
                  <input
                    type="time"
                    value={sunsetTime}
                    onChange={(e) => setSunsetTime(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-amber-50 p-3 rounded-xl border border-amber-200/60">
              Selected Date: <strong>{selectedDate} ({dayName})</strong> · First Hora governed by: <strong>{dayData.rulingPlanet} (Number {dayData.number})</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {horasList.map((hora) => (
              <div
                key={hora.index}
                className={`p-5 rounded-2xl border transition-all ${
                  hora.isFavorable
                    ? "bg-gradient-to-br from-white to-amber-50/40 border-amber-300/80 shadow-sm"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between border-b pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                      H{hora.index}
                    </span>
                    <div>
                      <div className="font-bold text-sm text-slate-900">
                        {hora.planet} Hora
                      </div>
                      <div className="text-[10px] text-amber-700 font-semibold">
                        Number {hora.number} Vibration
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      hora.isFavorable
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {hora.isFavorable ? "Favorable" : "Neutral / Caution"}
                  </span>
                </div>

                <div className="text-xs font-bold text-amber-900 mb-2 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {hora.startTime} – {hora.endTime}
                </div>

                <div className="text-xs text-slate-600 italic mb-3">
                  "{hora.quality}"
                </div>

                <div className="space-y-2 text-[11px]">
                  <div>
                    <span className="font-bold text-emerald-800">Best for:</span>{" "}
                    <span className="text-slate-700">{hora.recommendedActions?.slice(0, 3)?.join(", ") || "—"}</span>
                  </div>
                  {hora.avoidActions?.length > 0 && (
                    <div>
                      <span className="font-bold text-rose-800">Avoid:</span>{" "}
                      <span className="text-slate-700">{hora.avoidActions?.join(", ") || "—"}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUBTAB 3: 7 DAYS & RULING PLANETS */}
      {/* ======================================================== */}
      {activeSubTab === "weekdays" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-600" />
              The Planetary Ruling Energies of the Week
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Each day of the week carries the specific planetary frequency of its classical ruler, setting the foundational baseline for all actions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(DAYS_OF_WEEK_DATA).map((day) => (
              <div key={day.dayName} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h4 className="font-serif font-bold text-lg text-slate-900">{day.dayName}</h4>
                    <div className="text-xs font-semibold text-amber-700">
                      Ruled by {day.rulingPlanet} (Number {day.number})
                    </div>
                  </div>
                  <span className="text-2xl font-bold font-serif text-slate-300">#0{day.number}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{day.description}</p>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="font-bold text-slate-800 uppercase text-[10px] tracking-wider text-emerald-800 mb-1">
                      Optimal Activities:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {day.bestFor.map((item, idx) => (
                        <span key={idx} className="bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded-md text-[11px] font-medium border border-emerald-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="font-bold text-slate-800 uppercase text-[10px] tracking-wider text-rose-800 mb-1">
                      Activities to Avoid:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {day.avoidFor.map((item, idx) => (
                        <span key={idx} className="bg-rose-50 text-rose-900 px-2 py-0.5 rounded-md text-[11px] font-medium border border-rose-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* LUCKY ATTRIBUTES & GEMSTONES */}
                  <div className="pt-2 border-t space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-amber-50/80 p-2 rounded-lg border border-amber-200">
                        <span className="font-bold text-amber-900 block">Lucky Numbers:</span>
                        <span className="text-amber-800 font-medium">{Array.isArray(day.luckyNumbers) ? day.luckyNumbers.join(", ") : (day.number ?? "1")}</span>
                      </div>
                      <div className="bg-amber-50/80 p-2 rounded-lg border border-amber-200">
                        <span className="font-bold text-amber-900 block">Lucky Colors:</span>
                        <span className="text-amber-800 font-medium">{Array.isArray(day.luckyColors) ? day.luckyColors.join(", ") : "Gold"}</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <span className="font-bold text-slate-900 block">Lucky Directions:</span>
                        <span className="text-slate-700 font-medium">{Array.isArray(day.luckyDirections) ? day.luckyDirections.join(", ") : "East"}</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <span className="font-bold text-slate-900 block">Day Gemstones:</span>
                        <span className="text-slate-700 font-medium">{Array.isArray(day.gemstones) ? day.gemstones.join(", ") : "Ruby"}</span>
                      </div>
                    </div>

                    {/* GEMSTONE DISCLAIMER */}
                    <div className="bg-amber-100/70 p-2 rounded-lg border border-amber-300 text-[10px] text-amber-900 font-medium italic">
                      {day.gemstoneDisclaimer || "(consult gemologist or professional numerologist or astrologer for gem stones please)"}
                    </div>

                    {/* DAY REMEDIES */}
                    {day.remedies && day.remedies.length > 0 && (
                      <div className="bg-indigo-50/60 p-2.5 rounded-lg border border-indigo-200 text-[11px] space-y-1">
                        <span className="font-bold text-indigo-900 uppercase text-[10px] block">Auspicious Day Remedies:</span>
                        <ul className="list-disc list-inside text-indigo-950 space-y-0.5">
                          {day.remedies.map((rem, rIdx) => (
                            <li key={rIdx}>{rem}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUBTAB 4: 4-LAYER ALIGNMENT & 9-YR CYCLES */}
      {/* ======================================================== */}
      {activeSubTab === "four_layers" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600" />
              The 4-Layer Timing Assessment Framework
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              True Muhurta numerology assesses four distinct temporal layers simultaneously. Maximum alignment across all four layers generates timing windows of exceptional power.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
              <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
                <div className="text-xs font-bold uppercase text-amber-900">Layer 1</div>
                <div className="text-base font-serif font-bold text-slate-900 mt-1">Universal Day</div>
                <div className="text-xs text-slate-600 mt-1">
                  Complete date sum (Day + Month + Year). The overarching cosmic frequency broadcast to all.
                </div>
              </div>

              <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
                <div className="text-xs font-bold uppercase text-amber-900">Layer 2</div>
                <div className="text-base font-serif font-bold text-slate-900 mt-1">Personal Year</div>
                <div className="text-xs text-slate-600 mt-1">
                  Birth Day + Birth Month + Current Year. Defines the overarching 12-month annual theme.
                </div>
              </div>

              <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
                <div className="text-xs font-bold uppercase text-amber-900">Layer 3</div>
                <div className="text-base font-serif font-bold text-slate-900 mt-1">Personal Month</div>
                <div className="text-xs text-slate-600 mt-1">
                  Personal Year + Calendar Month. Identifies monthly operational focus.
                </div>
              </div>

              <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
                <div className="text-xs font-bold uppercase text-amber-900">Layer 4</div>
                <div className="text-base font-serif font-bold text-slate-900 mt-1">Personal Day</div>
                <div className="text-xs text-slate-600 mt-1">
                  Personal Month + Universal Day. Describes individual experiential resonance on the specific date.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-base border-b pb-2">
              The 9-Year Personal Year Cycle & Key Transition Points
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-amber-700">PY 1 · New Beginnings</div>
                <div className="text-xs text-slate-700 mt-1 leading-relaxed">
                  Ideal for major brand launches, career starts, relocation, and pioneering initiatives.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-amber-700">PY 2 · Partnerships</div>
                <div className="text-xs text-slate-700 mt-1 leading-relaxed">
                  Ideal for marriage, joint ventures, cooperative contracts, and deep relational commitments.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-amber-700">PY 3 · Creative Expression</div>
                <div className="text-xs text-slate-700 mt-1 leading-relaxed">
                  Ideal for publishing, media launches, public speaking, and communicative ventures.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-amber-700">PY 4 · Foundation Building</div>
                <div className="text-xs text-slate-700 mt-1 leading-relaxed">
                  Ideal for operational structuring, qualifications, and property consolidation.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-amber-700">PY 5 · Change & Freedom</div>
                <div className="text-xs text-slate-700 mt-1 leading-relaxed">
                  Ideal for pivot shifts, travel, expansion, and embracing dynamic transitions.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-amber-700">PY 6 · Love & Responsibility</div>
                <div className="text-xs text-slate-700 mt-1 leading-relaxed">
                  Ideal for home purchase, family expansion, formalizing marriage, and service work.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-amber-700">PY 7 · Study & Introspection</div>
                <div className="text-xs text-slate-700 mt-1 leading-relaxed">
                  Ideal for research, education, and spiritual practice. Discourages major external commercial launches.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-amber-700">PY 8 · Material Achievement</div>
                <div className="text-xs text-slate-700 mt-1 leading-relaxed">
                  Ideal for executive advancement, financial investments, and major business scaling.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-amber-700">PY 9 · Completion & Release</div>
                <div className="text-xs text-slate-700 mt-1 leading-relaxed">
                  Ideal for wrapping up multi-year projects and releasing outdated commitments before PY1.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUBTAB 5: VEDIC SYNERGY & CONSULTATION PROTOCOL */}
      {/* ======================================================== */}
      {activeSubTab === "vedic_protocol" && (
        <div className="space-y-6">
          {/* VEDIC TITHI SYNERGY */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              Vedic Tithi & Festival Calendar Synergy
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VEDIC_TITHI_MUHURTA_RULES.map((t, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-sm text-slate-900">{t.tithiName}</div>
                  <div className="text-xs font-semibold text-amber-700">{t.quality}</div>
                  <div className="text-xs text-slate-600">{t.suitability}</div>
                </div>
              ))}
            </div>
          </div>

          {/* PROFESSIONAL CONSULTATION PROTOCOL */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              5-Step Professional Muhurta Consultation Protocol
            </h3>

            <div className="space-y-3">
              {CONSULTATION_PROTOCOL_STEPS.map((step) => (
                <div key={step.step} className="flex gap-4 p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 items-start">
                  <span className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                    {step.step}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
                    <p className="text-xs text-slate-700 mt-1">{step.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
