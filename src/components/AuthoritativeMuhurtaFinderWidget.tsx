import React, { useState, useMemo } from "react";
import { UserProfile } from "../types";
import { CityLocation } from "../utils/vedicAstronomicalEngine";
import {
  AuthoritativeMuhurtaEngine,
  MUHURTA_EVENT_REGISTRY,
  MuhurtaEventDefinition,
  MuhurtaQualifyingWindow,
  MuhurtaSearchResult
} from "../engine/muhurtaRuleRegistryEngine";
import {
  Sparkles,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Star,
  BookOpen,
  Filter,
  Download,
  Info,
  Layers,
  MapPin,
  CalendarCheck
} from "lucide-react";

interface AuthoritativeMuhurtaFinderWidgetProps {
  selectedCity: CityLocation;
  userProfile?: UserProfile;
  initialDateStr?: string;
  onSelectDate?: (dateStr: string) => void;
  onOpenSyncModal?: () => void;
}

export const AuthoritativeMuhurtaFinderWidget: React.FC<AuthoritativeMuhurtaFinderWidgetProps> = ({
  selectedCity,
  userProfile,
  initialDateStr = new Date().toISOString().split("T")[0],
  onSelectDate,
  onOpenSyncModal
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>("vivah");
  const [searchStartDate, setSearchStartDate] = useState<string>(initialDateStr);
  const [searchRangeDays, setSearchRangeDays] = useState<number>(30);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("ALL");
  const [selectedWindow, setSelectedWindow] = useState<MuhurtaQualifyingWindow | null>(null);
  const [viewMode, setViewMode] = useState<"QUALIFYING" | "REJECTIONS" | "RULES">("QUALIFYING");

  // Filter available events by category
  const filteredEvents = useMemo(() => {
    if (activeCategoryFilter === "ALL") return MUHURTA_EVENT_REGISTRY;
    return MUHURTA_EVENT_REGISTRY.filter(e => e.category === activeCategoryFilter);
  }, [activeCategoryFilter]);

  // When category changes, if currently selected event is not in the filtered list, auto-select the first one
  const handleCategoryChange = (catId: string) => {
    setActiveCategoryFilter(catId);
    const available = catId === "ALL" 
      ? MUHURTA_EVENT_REGISTRY 
      : MUHURTA_EVENT_REGISTRY.filter(e => e.category === catId);
    if (available.length > 0 && !available.some(e => e.eventId === selectedEventId)) {
      setSelectedEventId(available[0].eventId);
      setSelectedWindow(null);
    }
  };

  const activeEvent = useMemo(() => {
    return MUHURTA_EVENT_REGISTRY.find(e => e.eventId === selectedEventId) || filteredEvents[0] || MUHURTA_EVENT_REGISTRY[0];
  }, [selectedEventId, filteredEvents]);

  // Execute forward search using AuthoritativeMuhurtaEngine
  const searchResult: MuhurtaSearchResult = useMemo(() => {
    return AuthoritativeMuhurtaEngine.searchUpcomingMuhurtas({
      eventId: selectedEventId,
      city: selectedCity,
      startDateStr: searchStartDate,
      rangeDays: searchRangeDays,
      userProfile: userProfile ? {
        nakshatra: userProfile.nakshatra,
        rashi: userProfile.rashi
      } : undefined
    });
  }, [selectedEventId, selectedCity, searchStartDate, searchRangeDays, userProfile]);

  // Automatically select first qualifying window on result update
  React.useEffect(() => {
    if (searchResult.qualifyingWindows.length > 0) {
      setSelectedWindow(searchResult.qualifyingWindows[0]);
    } else {
      setSelectedWindow(null);
    }
  }, [searchResult]);

  // Categories for filter chips
  const categories = [
    { id: "ALL", label: "All Events" },
    { id: "LIFE_FAMILY", label: "Family & Samskaras" },
    { id: "PROPERTY", label: "Property & Vastu" },
    { id: "BUSINESS", label: "Business & Commerce" },
    { id: "VEHICLE_TRAVEL", label: "Vehicles & Travel" },
    { id: "FINANCE", label: "Wealth & Gold" },
    { id: "EDUCATION", label: "Academics" },
    { id: "SPIRITUAL", label: "Spiritual & Havan" },
    { id: "MEDICAL", label: "Elective Care" },
    { id: "CUSTOM", label: "Custom / General" }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Context */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/80 to-slate-900 border border-amber-500/30 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Classical Parashari &amp; Muhurta Chintamani Engine</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
              Authoritative Shubh Muhurta Election
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Evaluates multi-day windows using strict Shastric exclusions: Tithi, Nakshatra, Weekday, Rahu Kalam, Durmuhurta, Bhadra Karana, and personalized Tarabalam.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenSyncModal && (
              <button
                onClick={onOpenSyncModal}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export to iCal / Google</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Control Panel: Event Selector & Search Parameters */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs font-semibold">
          <span className="text-slate-400 shrink-0 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => handleCategoryChange(c.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeCategoryFilter === c.id
                  ? "bg-slate-900 text-amber-300 shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Event Select Dropdown & Search Window Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Samskara / Occasion</label>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              {filteredEvents.map(ev => (
                <option key={ev.eventId} value={ev.eventId}>
                  {ev.name} ({ev.sanskritName})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Search Starting From</label>
            <input
              type="date"
              value={searchStartDate}
              onChange={(e) => setSearchStartDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Evaluation Horizon</label>
            <div className="grid grid-cols-4 gap-1.5">
              {[15, 30, 60, 90].map(days => (
                <button
                  key={days}
                  onClick={() => setSearchRangeDays(days)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    searchRangeDays === days
                      ? "bg-amber-100 text-amber-900 border border-amber-300"
                      : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {days}d
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Location Baseline</label>
            <div className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 flex items-center justify-between">
              <span className="truncate">{selectedCity.name}</span>
              <span className="text-[10px] text-slate-500">UTC {selectedCity.timezoneOffsetHours >= 0 ? `+${selectedCity.timezoneOffsetHours}` : selectedCity.timezoneOffsetHours}</span>
            </div>
          </div>
        </div>

        {/* Selected Event Classical Rule Brief */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-800" />
              <strong className="text-amber-950 font-serif font-bold text-sm">
                {activeEvent.name} — {activeEvent.sanskritName}
              </strong>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200/80 text-amber-900">
                {activeEvent.tradition} Tradition
              </span>
            </div>
            <span className="text-[11px] text-amber-800 font-mono">
              Source: {activeEvent.source} (Rule: {activeEvent.ruleId})
            </span>
          </div>
          <p className="text-slate-700 leading-relaxed">{activeEvent.description}</p>
          <div className="text-[11px] text-amber-900 italic">
            Shastric Directive: {activeEvent.shastricNotes}
          </div>
        </div>
      </div>

      {/* View Mode Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2 text-xs font-bold">
          <button
            onClick={() => setViewMode("QUALIFYING")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              viewMode === "QUALIFYING"
                ? "bg-emerald-800 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Qualifying Windows ({searchResult.qualifyingWindows.length})</span>
          </button>

          <button
            onClick={() => setViewMode("REJECTIONS")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              viewMode === "REJECTIONS"
                ? "bg-rose-800 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Audit Exclusions ({searchResult.rejectedDatesSummary.length})</span>
          </button>

          <button
            onClick={() => setViewMode("RULES")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              viewMode === "RULES"
                ? "bg-slate-900 text-amber-300 shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Rule Matrix &amp; Shastra Standards</span>
          </button>
        </div>

        <span className="text-xs text-slate-500 hidden sm:inline font-mono">
          Scanned {searchResult.totalDaysEvaluated} days ({searchResult.searchStartDate} to {searchResult.searchEndDate})
        </span>
      </div>

      {/* VIEW 1: QUALIFYING MUHURTA WINDOWS */}
      {viewMode === "QUALIFYING" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: List of Auspicious Dates and Windows */}
          <div className="lg:col-span-5 space-y-3">
            {searchResult.qualifyingWindows.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-3">
                <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto" />
                <h4 className="font-serif font-bold text-slate-900">No Qualifying Windows Found</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Strict Parashari rules eliminated all candidate dates within the {searchRangeDays}-day horizon due to Rikta tithis, prohibited weekdays, or solar eclipses. Try expanding the evaluation horizon to 60 or 90 days.
                </p>
                <button
                  onClick={() => setSearchRangeDays(60)}
                  className="px-4 py-2 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs hover:bg-amber-200 transition-all cursor-pointer"
                >
                  Expand Horizon to 60 Days
                </button>
              </div>
            ) : (
              searchResult.qualifyingWindows.map((win) => {
                const isSelected = selectedWindow?.windowId === win.windowId;
                return (
                  <div
                    key={win.windowId}
                    onClick={() => setSelectedWindow(win)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                      isSelected
                        ? "bg-amber-500/10 border-amber-500 shadow-md ring-1 ring-amber-500"
                        : "bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50/30 shadow-2xs"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 font-mono">
                          {win.dateStr}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          ({win.panchangSummary.solarDay})
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Score {win.suitabilityScore}%</span>
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <strong className="text-sm font-serif font-bold text-slate-900">
                        {win.startTimeStr} - {win.endTimeStr}
                      </strong>
                      <span className="text-[11px] font-bold text-amber-800">
                        {win.panchangSummary.choghadiyaName}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 border-t border-slate-100 pt-2 font-mono">
                      <div className="truncate">⭐ {win.panchangSummary.nakshatra}</div>
                      <div className="truncate">🌙 {win.panchangSummary.tithi.split(" ")[0]}</div>
                      <div className="truncate text-right">⏳ {win.durationMinutes} mins</div>
                    </div>

                    {win.specialYogasPresent.length > 0 && (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-lg truncate">
                        <Star className="w-3 h-3 shrink-0" />
                        <span className="truncate">{win.specialYogasPresent[0]}</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: In-Depth Breakdown of Selected Window */}
          <div className="lg:col-span-7">
            {selectedWindow ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">
                      Auspicious Window Analysis
                    </span>
                    <h4 className="font-serif text-2xl font-bold text-slate-900">
                      {selectedWindow.dateStr} &bull; {selectedWindow.startTimeStr} - {selectedWindow.endTimeStr}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Duration: {selectedWindow.durationMinutes} minutes &bull; Status: {selectedWindow.quality}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (onSelectDate) onSelectDate(selectedWindow.dateStr);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs transition-all flex items-center gap-1.5 self-start cursor-pointer"
                  >
                    <span>View in Full Panchang</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Panchanga Limbs at Window Midpoint */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold uppercase text-slate-600">
                    Panchanga Limbs Synchronization
                  </h5>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                      <span className="text-[10px] text-slate-500 uppercase block">Tithi</span>
                      <strong className="text-slate-900 block truncate">{selectedWindow.panchangSummary.tithi}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                      <span className="text-[10px] text-slate-500 uppercase block">Nakshatra</span>
                      <strong className="text-slate-900 block truncate">{selectedWindow.panchangSummary.nakshatra} (Pada {selectedWindow.panchangSummary.nakshatraPada})</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                      <span className="text-[10px] text-slate-500 uppercase block">Vara (Solar Day)</span>
                      <strong className="text-slate-900 block truncate">{selectedWindow.panchangSummary.vara}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                      <span className="text-[10px] text-slate-500 uppercase block">Nitya Yoga</span>
                      <strong className="text-slate-900 block truncate">{selectedWindow.panchangSummary.yoga}</strong>
                    </div>
                  </div>
                </div>

                {/* Personalized Tarabala & Chandrabala if available */}
                {selectedWindow.personalBalas && (
                  <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-sky-950 font-serif font-bold text-sm">
                        Personalized Compatibility ({selectedWindow.personalBalas.natalNakshatra} &bull; {selectedWindow.personalBalas.natalRashi})
                      </strong>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        selectedWindow.personalBalas.isPersonalizedFavorable
                          ? "bg-emerald-100 text-emerald-900"
                          : "bg-amber-100 text-amber-900"
                      }`}>
                        {selectedWindow.personalBalas.isPersonalizedFavorable ? "Personally Auspicious" : "Neutral / Care Needed"}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 pt-1">
                      <div>
                        <strong>Tarabalam:</strong> {selectedWindow.personalBalas.tarabalaName} ({selectedWindow.personalBalas.tarabalaQuality})
                      </div>
                      <div>
                        <strong>Chandrabalam:</strong> {selectedWindow.personalBalas.chandrabalaText}
                      </div>
                    </div>
                  </div>
                )}

                {/* Positive Classical Strengths */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold uppercase text-slate-600">
                    Classical Favorable Attributes
                  </h5>
                  <div className="space-y-1.5">
                    {selectedWindow.favorableFactors.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                    {selectedWindow.specialYogasPresent.map((y, i) => (
                      <div key={`y-${i}`} className="flex items-start gap-2 text-xs text-amber-900 font-bold bg-amber-50 p-2 rounded-xl border border-amber-200">
                        <Star className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{y}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shastric Exclusions Audit */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold uppercase text-slate-600">
                    Shastric Dosha Clearance Audit
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    {selectedWindow.exclusionsChecked.map((ex, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                        <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> {ex.rule}
                        </span>
                        <p className="text-[11px] text-slate-600">{ex.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shastric Verdict */}
                <div className="p-4 rounded-2xl bg-amber-100/60 border border-amber-300 text-xs space-y-1 text-amber-950">
                  <strong className="block font-serif font-bold text-sm">Classical Muhurta Verdict</strong>
                  <p>{selectedWindow.shastricVerdict}</p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 p-12 rounded-3xl border border-dashed border-slate-300 text-center text-slate-400 text-xs">
                Select a qualifying window from the left column to view the complete Shastric audit.
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: AUDIT EXCLUSIONS & REJECTED DATES */}
      {viewMode === "REJECTIONS" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div>
            <h4 className="font-serif text-xl font-bold text-slate-900">
              Deterministic Elimination Ledger
            </h4>
            <p className="text-xs text-slate-500">
              Complete audit trail of every candidate date excluded and the exact classical astrological rule triggered.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Primary Obstacle</th>
                  <th className="py-2.5 px-3">Shastric Disqualification Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {searchResult.rejectedDatesSummary.map((rej, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {rej.dateStr}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-rose-700">
                      {rej.primaryObstacle}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      {rej.rejectionReasons.join("; ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: RULE MATRIX & STANDARDS */}
      {viewMode === "RULES" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h4 className="font-serif text-xl font-bold text-slate-900">
              Canonical Muhurta Rule Specification: {activeEvent.name}
            </h4>
            <p className="text-xs text-slate-500">
              Deterministic Parashari and Muhurta Chintamani mathematical election specifications
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Rule Identifier</span>
              <strong className="text-slate-900 block font-mono">{activeEvent.ruleId}</strong>
              <p className="text-slate-500 text-[11px]">Version: {activeEvent.version} &bull; Tier: {activeEvent.sourceTier}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Primary Classical Source</span>
              <strong className="text-slate-900 block">{activeEvent.source}</strong>
              <p className="text-slate-500 text-[11px]">Tradition: {activeEvent.tradition}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Prohibited Weekdays</span>
              <strong className="text-rose-700 block">
                {activeEvent.prohibitedVaras.length > 0
                  ? activeEvent.prohibitedVaras.map(v => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][v]).join(", ")
                  : "None (All days allowed with proper hora)"}
              </strong>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs text-slate-700 leading-relaxed">
            <strong className="text-amber-950 font-serif font-bold text-sm block">
              Classical Shastric Injunctions
            </strong>
            <p>{activeEvent.shastricNotes}</p>
            <div className="pt-2 text-[11px] text-amber-900 font-mono">
              Deterministic validation engine enforces zero tolerances on Rahu Kalam, Vishti Karana (Bhadra), and Varjyam overlaps.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
