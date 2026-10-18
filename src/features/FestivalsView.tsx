import React, { useState, useMemo } from "react";
import { 
  VEDIC_ALL_MONTH_EVENTS, 
  VEDIC_MONTH_NAMES, 
  VedicMonthEvent 
} from "../data/vedicCalendarEventsData";
import { 
  Flame, 
  Calendar, 
  Clock, 
  Sparkles, 
  Bell, 
  BellRing, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Shield, 
  Search, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Filter, 
  Share2,
  Info,
  Check
} from "lucide-react";

interface FestivalsViewProps {
  onBackToHome?: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const FestivalsView: React.FC<FestivalsViewProps> = ({ onBackToHome, onNavigateToTab }) => {
  const [selectedMonth, setSelectedMonth] = useState<number | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<VedicMonthEvent | null>(VEDIC_ALL_MONTH_EVENTS[0]);
  const [subscribedEvents, setSubscribedEvents] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("vedic_festival_notifications");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [checkedEveItems, setCheckedEveItems] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{
    eve: boolean;
    muhurta: boolean;
    vidhi: boolean;
    rules: boolean;
    remedies: boolean;
  }>({
    eve: true,
    muhurta: true,
    vidhi: true,
    rules: true,
    remedies: true
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleNotification = (eventId: string, eventName: string) => {
    setSubscribedEvents(prev => {
      const next = { ...prev, [eventId]: !prev[eventId] };
      try {
        localStorage.setItem("vedic_festival_notifications", JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      if (next[eventId]) {
        showToast(`🔔 Reminder activated for ${eventName}! You will receive notifications 1 day prior and on festival morning.`);
      } else {
        showToast(`🔕 Reminder disabled for ${eventName}.`);
      }
      return next;
    });
  };

  const toggleEveItem = (key: string) => {
    setCheckedEveItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredEvents = useMemo(() => {
    return VEDIC_ALL_MONTH_EVENTS.filter(ev => {
      // Month filter
      if (selectedMonth !== "all" && ev.monthIndex !== selectedMonth) {
        return false;
      }
      // Category filter
      if (selectedCategory !== "all" && ev.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = ev.name.toLowerCase().includes(q) || ev.nameHi.includes(q);
        const matchesDeity = ev.deity.toLowerCase().includes(q) || ev.deityHi.includes(q);
        const matchesMonth = ev.monthName.toLowerCase().includes(q) || ev.vedicMonth.toLowerCase().includes(q);
        const matchesSignificance = ev.significance.toLowerCase().includes(q);
        return matchesName || matchesDeity || matchesMonth || matchesSignificance;
      }
      return true;
    });
  }, [selectedMonth, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/60 via-orange-50/20 to-slate-50 text-slate-800 pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900/95 text-white px-5 py-3 rounded-2xl shadow-xl border border-amber-500/30 flex items-center gap-3 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="text-xs sm:text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Hero Header */}
      <div className="bg-linear-to-r from-amber-900 via-orange-950 to-amber-950 text-white border-b border-amber-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold tracking-wide">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Sanatana Vedic Panchang &amp; Kal Nirnay</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-amber-100 tracking-tight">
                Vedic Festivals &amp; Auspicious Occasions
              </h1>
              <p className="text-amber-200/80 text-sm sm:text-base max-w-2xl leading-relaxed">
                Complete Shastric calendar covering all 12 Vedic months — with exact tithi timings, Day-Before preparation checklists, step-by-step Puja Vidhi, fast rules, and automated reminders.
              </p>
            </div>

            {/* Quick Stats Banner */}
            <div className="flex items-center gap-3 self-start md:self-auto bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-amber-300/20 text-xs">
              <div className="text-center px-3 py-1 border-r border-white/20">
                <div className="text-lg font-bold text-amber-300">12</div>
                <div className="text-[10px] text-amber-100/70 uppercase">Vedic Months</div>
              </div>
              <div className="text-center px-3 py-1 border-r border-white/20">
                <div className="text-lg font-bold text-amber-300">100%</div>
                <div className="text-[10px] text-amber-100/70 uppercase">Shastric Rules</div>
              </div>
              <div className="text-center px-3 py-1">
                <div className="text-lg font-bold text-amber-300">Eve + Day</div>
                <div className="text-[10px] text-amber-100/70 uppercase">Guidance Mode</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Month Selector Carousel / Tabs */}
        <div className="bg-white rounded-2xl p-2 sm:p-3 border border-amber-900/10 shadow-xs mb-6">
          <div className="flex items-center justify-between gap-2 mb-2 px-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              Select Month (Vedic &amp; Gregorian)
            </span>
            <button
              onClick={() => setSelectedMonth("all")}
              className={`text-xs px-2.5 py-1 rounded-lg transition-all font-semibold ${
                selectedMonth === "all"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-amber-100/60"
              }`}
            >
              All 12 Months
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-1.5 overflow-x-auto no-scrollbar">
            {VEDIC_MONTH_NAMES.map(m => (
              <button
                key={m.index}
                onClick={() => setSelectedMonth(m.index)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl text-center transition-all cursor-pointer ${
                  selectedMonth === m.index
                    ? "bg-amber-600 text-white shadow-sm ring-2 ring-amber-400 font-bold"
                    : "bg-amber-50/50 hover:bg-amber-100/80 text-slate-700"
                }`}
              >
                <span className="text-base mb-0.5">{m.icon}</span>
                <span className="text-[11px] font-semibold truncate w-full">{m.name.slice(0, 3)}</span>
                <span className={`text-[9px] truncate w-full ${selectedMonth === m.index ? "text-amber-100" : "text-slate-600"}`}>
                  {m.vedic.split("-")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {[
              { id: "all", label: "All Events" },
              { id: "mahaparva", label: "Maha Parvas" },
              { id: "vrat", label: "Vrat & Upvas" },
              { id: "jayanti", label: "Divine Jayantis" },
              { id: "muhurta", label: "Auspicious Yogas" }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-slate-900 text-white shadow-xs font-semibold"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search festival, deity, mantra..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-amber-900/15 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 text-slate-800 placeholder-slate-400 shadow-2xs"
            />
          </div>
        </div>

        {/* Two Column Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Festival List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Festivals &amp; Occasions ({filteredEvents.length})
              </span>
              <span className="text-[11px] text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-full font-medium">
                Vedic Year 2026
              </span>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-amber-300">
                <Info className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">No events found</p>
                <p className="text-xs text-slate-600 mt-1">Try resetting filters or clear your search keyword.</p>
                <button
                  onClick={() => { setSelectedMonth("all"); setSelectedCategory("all"); setSearchQuery(""); }}
                  className="mt-3 text-xs text-amber-700 font-bold hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              filteredEvents.map(event => {
                const isSelected = selectedEvent?.id === event.id;
                const isSubscribed = !!subscribedEvents[event.id];

                return (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`group relative p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white border-amber-500 shadow-md ring-2 ring-amber-400/30"
                        : "bg-white/90 hover:bg-white border-amber-900/10 hover:border-amber-400/50 shadow-2xs"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            {event.categoryLabel}
                          </span>
                          <span className="text-[11px] font-medium text-slate-500">
                            {event.vedicMonth}
                          </span>
                        </div>
                        <h3 className="text-base font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                          {event.name}
                        </h3>
                        <p className="text-xs text-amber-900/80 font-medium">
                          {event.nameHi}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleNotification(event.id, event.name);
                        }}
                        title={isSubscribed ? "Reminder active" : "Enable festival reminder"}
                        className={`p-2 rounded-xl transition-all ${
                          isSubscribed
                            ? "bg-amber-500 text-white shadow-xs ring-1 ring-amber-400"
                            : "bg-slate-100 hover:bg-amber-100 text-slate-400 hover:text-amber-700"
                        }`}
                      >
                        {isSubscribed ? <BellRing className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        <span className="font-semibold text-slate-700">{event.dateDisplay}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-amber-800 font-medium">
                        <span>View rituals</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Complete Shastric Dossier & Ritual Guidance */}
          <div className="lg:col-span-7">
            {selectedEvent ? (
              <div className="bg-white rounded-3xl border border-amber-900/15 shadow-md overflow-hidden sticky top-20">
                {/* Dossier Header */}
                <div className="bg-linear-to-r from-amber-700 via-orange-800 to-amber-900 p-6 text-white relative">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 backdrop-blur-sm border border-white/20 text-amber-200 text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{selectedEvent.vedicMonthHi} • {selectedEvent.tithi}</span>
                    </div>

                    <button
                      onClick={() => toggleNotification(selectedEvent.id, selectedEvent.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                        subscribedEvents[selectedEvent.id]
                          ? "bg-amber-400 text-slate-950 font-bold"
                          : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
                      }`}
                    >
                      {subscribedEvents[selectedEvent.id] ? (
                        <>
                          <BellRing className="w-3.5 h-3.5 fill-current" />
                          <span>Reminder Scheduled</span>
                        </>
                      ) : (
                        <>
                          <Bell className="w-3.5 h-3.5" />
                          <span>Set Day-Before Reminder</span>
                        </>
                      )}
                    </button>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-50">
                    {selectedEvent.name}
                  </h2>
                  <p className="text-amber-200 text-sm mt-0.5">
                    {selectedEvent.nameHi} — Presiding Deity: <strong className="text-white">{selectedEvent.deity}</strong>
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-amber-100/90 pt-3 border-t border-white/15">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-amber-300" />
                      <span>Date: <strong>{selectedEvent.dateDisplay}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-300" />
                      <span>Eve Prep: <strong>{selectedEvent.eveDate}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-amber-300" />
                      <span>Vow: <strong>{selectedEvent.rulesAndDiscipline.fastingType}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Dossier Body with Structured Sections */}
                <div className="p-6 space-y-6 max-h-[calc(100vh-280px)] overflow-y-auto no-scrollbar">
                  {/* Puranic Significance */}
                  <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-900/10">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                      <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                      <span>Puranic Significance &amp; Spiritual Essence</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {selectedEvent.significance}
                    </p>
                  </div>

                  {/* 1. Day-Before (Eve) Preparation Guidance */}
                  <div className="border border-orange-200 rounded-2xl overflow-hidden bg-orange-50/30">
                    <button
                      onClick={() => setExpandedSections(p => ({ ...p, eve: !p.eve }))}
                      className="w-full flex items-center justify-between p-4 bg-orange-100/60 hover:bg-orange-100/80 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-orange-600 text-white flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">Day-Before (Eve) Preparation Checklist</h4>
                          <p className="text-[11px] text-orange-900/80">Arrangements on {selectedEvent.eveDate} before sunset</p>
                        </div>
                      </div>
                      {expandedSections.eve ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                    </button>

                    {expandedSections.eve && (
                      <div className="p-4 space-y-3">
                        <p className="text-xs text-slate-700 italic">
                          "{selectedEvent.eveGuidance.summary}"
                        </p>
                        <div className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-orange-200/60 flex items-center gap-2">
                          <strong className="text-orange-900">Altar Orientation:</strong>
                          <span>{selectedEvent.eveGuidance.altarDirection}</span>
                        </div>

                        <div className="space-y-2 pt-1">
                          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            Interactive Preparation Checklist:
                          </div>
                          {selectedEvent.eveGuidance.checklist.map((item, idx) => {
                            const key = `${selectedEvent.id}_eve_${idx}`;
                            const isDone = !!checkedEveItems[key];
                            return (
                              <div
                                key={idx}
                                onClick={() => toggleEveItem(key)}
                                className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer ${
                                  isDone
                                    ? "bg-emerald-50/60 border-emerald-300 text-emerald-900"
                                    : "bg-white border-slate-200 hover:border-orange-300 text-slate-700"
                                }`}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                ) : (
                                  <Circle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                )}
                                <span className={`text-xs ${isDone ? "line-through opacity-80" : ""}`}>
                                  {item}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 2. Exact Muhurtas & Puja Kaal */}
                  <div className="border border-amber-200 rounded-2xl overflow-hidden bg-amber-50/30">
                    <button
                      onClick={() => setExpandedSections(p => ({ ...p, muhurta: !p.muhurta }))}
                      className="w-full flex items-center justify-between p-4 bg-amber-100/60 hover:bg-amber-100/80 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-amber-700 text-white flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">Exact Shastric Muhurtas &amp; Puja Kaal</h4>
                          <p className="text-[11px] text-amber-900/80">Precise auspicious windows for worship &amp; rituals</p>
                        </div>
                      </div>
                      {expandedSections.muhurta ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                    </button>

                    {expandedSections.muhurta && (
                      <div className="p-4 space-y-2.5">
                        {selectedEvent.exactMuhurtas.map((muh, idx) => (
                          <div key={idx} className="bg-white p-3.5 rounded-xl border border-amber-200/80 shadow-2xs">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-amber-950">{muh.label}</span>
                              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                                {muh.timing}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1">
                              {muh.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 3. Step-by-Step Puja Vidhi, Samagri & Mantras */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                    <button
                      onClick={() => setExpandedSections(p => ({ ...p, vidhi: !p.vidhi }))}
                      className="w-full flex items-center justify-between p-4 bg-slate-100/70 hover:bg-slate-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">Step-by-Step Puja Vidhi &amp; Mantras</h4>
                          <p className="text-[11px] text-slate-500">Sacred procedure, offerings, and Devanagari stotras</p>
                        </div>
                      </div>
                      {expandedSections.vidhi ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                    </button>

                    {expandedSections.vidhi && (
                      <div className="p-4 space-y-4">
                        <p className="text-xs text-slate-700">
                          {selectedEvent.ritualsAndVidhi.overview}
                        </p>

                        {/* Required Samagri */}
                        <div>
                          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                            Sacred Samagri (Offerings):
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedEvent.ritualsAndVidhi.samagri.map((item, idx) => (
                              <span key={idx} className="text-xs px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg font-medium">
                                • {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Step-by-Step Sequence */}
                        <div className="space-y-2">
                          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            Sequential Puja Steps:
                          </div>
                          {selectedEvent.ritualsAndVidhi.steps.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                              <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <p className="text-xs text-slate-700 leading-relaxed">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Sacred Mantra Box */}
                        <div className="p-4 rounded-2xl bg-amber-900/5 border border-amber-900/20 text-center space-y-2">
                          <div className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">
                            Primary Invocation Mantra
                          </div>
                          <div className="text-sm sm:text-base font-serif font-bold text-amber-950 leading-relaxed">
                            {selectedEvent.ritualsAndVidhi.mantraDevanagari}
                          </div>
                          <div className="text-xs italic text-slate-600">
                            "{selectedEvent.ritualsAndVidhi.mantraTransliteration}"
                          </div>
                          <div className="text-xs text-amber-900/90 pt-1 border-t border-amber-200/60 font-medium">
                            Meaning: {selectedEvent.ritualsAndVidhi.mantraMeaning}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 4. Vrat Discipline, Permitted Foods & Parana Timing */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                    <button
                      onClick={() => setExpandedSections(p => ({ ...p, rules: !p.rules }))}
                      className="w-full flex items-center justify-between p-4 bg-slate-100/70 hover:bg-slate-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                          4
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">Vrat Rules &amp; Strict Dietary Discipline</h4>
                          <p className="text-[11px] text-slate-500">Permitted foods, strict prohibitions &amp; Parana window</p>
                        </div>
                      </div>
                      {expandedSections.rules ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                    </button>

                    {expandedSections.rules && (
                      <div className="p-4 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                            <div className="text-xs font-bold text-emerald-900 mb-1.5 flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Permitted Diet (Phalahar):</span>
                            </div>
                            <ul className="text-xs text-emerald-800 space-y-1 list-disc list-inside">
                              {selectedEvent.rulesAndDiscipline.permittedFoods.map((f, i) => (
                                <li key={i}>{f}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200">
                            <div className="text-xs font-bold text-rose-900 mb-1.5 flex items-center gap-1.5">
                              <Shield className="w-3.5 h-3.5 text-rose-600" />
                              <span>Strictly Prohibited (Varjya):</span>
                            </div>
                            <ul className="text-xs text-rose-800 space-y-1 list-disc list-inside">
                              {selectedEvent.rulesAndDiscipline.strictlyProhibited.map((f, i) => (
                                <li key={i}>{f}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                          <strong className="text-amber-950">Mandatory Parana Timing: </strong>
                          <span className="text-slate-700">{selectedEvent.rulesAndDiscipline.paranaTiming}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 5. Ancient Shastric Remedies & Upays */}
                  <div className="border border-amber-300 rounded-2xl overflow-hidden bg-amber-50/40">
                    <button
                      onClick={() => setExpandedSections(p => ({ ...p, remedies: !p.remedies }))}
                      className="w-full flex items-center justify-between p-4 bg-amber-200/50 hover:bg-amber-200/70 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-amber-800 text-white flex items-center justify-center text-xs font-bold">
                          5
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-amber-950">Ancient Shastric Remedies &amp; Astro Upays</h4>
                          <p className="text-[11px] text-amber-900/80">Karmic remedies, planetary dosha shanti &amp; prosperity secrets</p>
                        </div>
                      </div>
                      {expandedSections.remedies ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                    </button>

                    {expandedSections.remedies && (
                      <div className="p-4 space-y-3">
                        {selectedEvent.ancientRemedies.map((rem, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <h5 className="text-xs font-bold text-amber-900">{rem.title}</h5>
                              <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                                Vedic Upay
                              </span>
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed">
                              <strong>Procedure: </strong>{rem.procedure}
                            </p>
                            <p className="text-xs text-emerald-800 bg-emerald-50/60 p-2 rounded-lg border border-emerald-200/60">
                              <strong>Benefits: </strong>{rem.benefits}
                            </p>
                            {rem.mantra && (
                              <div className="text-xs font-serif font-bold text-amber-950 bg-amber-50/60 p-2 rounded-lg border border-amber-200/60 text-center">
                                {rem.mantra}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
