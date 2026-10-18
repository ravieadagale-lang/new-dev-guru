import React, { useState, useMemo, useEffect } from "react";
import { UserProfile, LanguageCode } from "../types";
import { NakshatraVratSection } from "../components/vrat/NakshatraVratSection";
import { GoalBasedVratSection } from "../components/vrat/GoalBasedVratSection";
import { FastingRulesSection } from "../components/vrat/FastingRulesSection";
import { HealthSafetySection } from "../components/vrat/HealthSafetySection";
import { VratGlossarySection } from "../components/vrat/VratGlossarySection";
import {
  ALL_VRATS_CATALOG,
  VratItem
} from "../data/vratGuideData";
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
  X, 
  Check,
  Info,
  CalendarHeart
} from "lucide-react";

interface FestivalsAndVratViewProps {
  userProfile?: UserProfile;
  selectedLanguage?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
  initialSelectedVratId?: string | null;
  initialSubTab?: "festivals" | "vrats";
  onBackToHome?: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const FestivalsAndVratView: React.FC<FestivalsAndVratViewProps> = ({
  userProfile,
  selectedLanguage = "en",
  onLanguageChange,
  initialSelectedVratId,
  initialSubTab = "festivals",
  onBackToHome,
  onNavigateToTab
}) => {
  // Main Top-Level Sub-Tab: "festivals" vs "vrats"
  const [activeSubTab, setActiveSubTab] = useState<"festivals" | "vrats">(initialSubTab);

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // ==========================================
  // FESTIVALS SECTION STATE
  // ==========================================
  const currentRunningMonth = useMemo(() => new Date().getMonth(), []);
  const [selectedMonth, setSelectedMonth] = useState<number | "all">(() => new Date().getMonth());
  const [festivalCategory, setFestivalCategory] = useState<string>("all");
  const [festivalSearch, setFestivalSearch] = useState<string>("");
  const [selectedFestival, setSelectedFestival] = useState<VedicMonthEvent | null>(VEDIC_ALL_MONTH_EVENTS[0]);
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
        showToast(`🔔 Reminder set for ${eventName}! Notification scheduled for eve & festival morning.`);
      } else {
        showToast(`🔕 Reminder cancelled for ${eventName}.`);
      }
      return next;
    });
  };

  const toggleEveItem = (key: string) => {
    setCheckedEveItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

    const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0, mahaparva: 0, festival: 0, jayanti: 0, muhurta: 0, vrat: 0 };
    VEDIC_ALL_MONTH_EVENTS.forEach(ev => {
      if (selectedMonth === "all" || ev.monthIndex === selectedMonth) {
        counts.all = (counts.all || 0) + 1;
        counts[ev.category] = (counts[ev.category] || 0) + 1;
      }
    });
    return counts;
  }, [selectedMonth]);

  const filteredFestivals = useMemo(() => {
    return VEDIC_ALL_MONTH_EVENTS.filter(ev => {
      if (selectedMonth !== "all" && ev.monthIndex !== selectedMonth) return false;
      if (festivalCategory !== "all" && ev.category !== festivalCategory) return false;
      if (festivalSearch.trim()) {
        const q = festivalSearch.toLowerCase();
        const matchesName = ev.name.toLowerCase().includes(q) || ev.nameHi.includes(q);
        const matchesDeity = ev.deity.toLowerCase().includes(q) || ev.deityHi.includes(q);
        const matchesMonth = ev.monthName.toLowerCase().includes(q) || ev.vedicMonth.toLowerCase().includes(q);
        const matchesSignificance = ev.significance.toLowerCase().includes(q);
        return matchesName || matchesDeity || matchesMonth || matchesSignificance;
      }
      return true;
    });
  }, [selectedMonth, festivalCategory, festivalSearch]);

  useEffect(() => {
    if (filteredFestivals.length > 0) {
      if (!selectedFestival || !filteredFestivals.some(ev => ev.id === selectedFestival.id)) {
        setSelectedFestival(filteredFestivals[0]);
      }
    } else {
      setSelectedFestival(null);
    }
  }, [filteredFestivals, selectedFestival]);

  // ==========================================
  // VRATS & FASTING SECTION STATE
  // ==========================================
    const [vratSubSection, setVratSubSection] = useState<
    "catalog" | "nakshatra" | "goals" | "fasting_types" | "health_safety" | "glossary"
  >("catalog");
  const [selectedVrat, setSelectedVrat] = useState<VratItem | null>(null);
  const [vratSearch, setVratSearch] = useState("");
  const [vratCategoryFilter, setVratCategoryFilter] = useState<string>("all");

  useEffect(() => {
    if (initialSelectedVratId) {
      const found = ALL_VRATS_CATALOG.find((v) => v.id === initialSelectedVratId);
      if (found) {
        setSelectedVrat(found);
        setActiveSubTab("vrats");
      }
    }
  }, [initialSelectedVratId]);

  const vratCategories = [
    { id: "all", label: "All Vrats & Fasts" },
    { id: "ekadashi", label: "24 Ekadashi" },
    { id: "pradosh", label: "Pradosh Vrats" },
    { id: "weekly", label: "7 Weekly Days" },
    { id: "major_deity", label: "Major Deities" },
    { id: "gupt", label: "Rare & Gupt Vrats" }
  ];

  const filteredVrats = useMemo(() => {
    return ALL_VRATS_CATALOG.filter((v) => {
      const matchesCat = vratCategoryFilter === "all" || v.category === vratCategoryFilter;
      const matchesSearch = v.name.toLowerCase().includes(vratSearch.toLowerCase()) ||
        v.nameHindi.includes(vratSearch) ||
        v.deity.toLowerCase().includes(vratSearch.toLowerCase()) ||
        v.purpose.toLowerCase().includes(vratSearch.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [vratCategoryFilter, vratSearch]);

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/60 via-orange-50/20 to-slate-50 text-slate-800 pb-24">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900/95 text-white px-5 py-3 rounded-2xl shadow-xl border border-amber-500/30 flex items-center gap-3 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="text-xs sm:text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Hero Header */}
      <div className="bg-linear-to-r from-amber-900 via-orange-950 to-amber-950 text-white border-b border-amber-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold tracking-wide">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Sanatana Vedic Panchang • Festivals &amp; Vrat Shastra</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-amber-100 tracking-tight">
                Festivals &amp; Vrat (पर्व एवं व्रत)
              </h1>
              <p className="text-amber-200/80 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Comprehensive Vedic portal combining all 12-month sacred Hindu festivals, exact Shastric Muhurtas, Day-Before preparation checklists, step-by-step Puja Vidhi, and the complete encyclopedia of 24 Ekadashis &amp; Upvas rules.
              </p>
            </div>

            {/* Sub-Tab Switcher inside Hero */}
            <div className="bg-black/30 backdrop-blur-md p-1.5 rounded-2xl border border-amber-400/25 flex items-center gap-1 self-start md:self-auto">
              <button
                onClick={() => setActiveSubTab("festivals")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeSubTab === "festivals"
                    ? "bg-amber-500 text-slate-950 shadow-md ring-1 ring-amber-300"
                    : "text-amber-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <Flame className="w-4 h-4 text-amber-300" />
                <span>Festivals</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-black/20 text-amber-100">
                  12 Months
                </span>
              </button>

              <button
                onClick={() => setActiveSubTab("vrats")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeSubTab === "vrats"
                    ? "bg-amber-500 text-slate-950 shadow-md ring-1 ring-amber-300"
                    : "text-amber-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <CalendarHeart className="w-4 h-4 text-amber-300" />
                <span>Vrat &amp; Fasting</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-black/20 text-amber-100">
                  24 Ekadashis
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: FESTIVALS & OCCASIONS */}
      {activeSubTab === "festivals" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {/* Month Selector Carousel / Tabs */}
          <div className="bg-white rounded-2xl p-2 sm:p-3 border border-amber-900/10 shadow-xs mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 px-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  Select Month (Vedic &amp; Gregorian)
                </span>
                {(() => {
                  const currentMonthMeta = VEDIC_MONTH_NAMES.find(m => m.index === currentRunningMonth);
                  return currentMonthMeta ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-850 border border-emerald-300 shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Running: <strong className="font-bold">{currentMonthMeta.name} {currentMonthMeta.year}</strong> ({currentMonthMeta.vedic.split("-")[0].trim()})
                    </span>
                  ) : null;
                })()}
              </div>
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <button
                  onClick={() => setSelectedMonth(currentRunningMonth)}
                  title="Jump to current running month"
                  className={`text-xs px-2.5 py-1 rounded-lg transition-all font-semibold cursor-pointer border ${
                    selectedMonth === currentRunningMonth
                      ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100/80"
                  }`}
                >
                  Current Month
                </button>
                <button
                  onClick={() => setSelectedMonth("all")}
                  className={`text-xs px-2.5 py-1 rounded-lg transition-all font-semibold cursor-pointer ${
                    selectedMonth === "all"
                      ? "bg-amber-600 text-white shadow-xs"
                      : "text-slate-600 hover:bg-amber-100/60"
                  }`}
                >
                  All 12 Months
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-1.5 overflow-x-auto no-scrollbar">
              {VEDIC_MONTH_NAMES.map(m => {
                const isSelected = selectedMonth === m.index;
                const isRunning = m.index === currentRunningMonth;
                return (
                  <button
                    key={m.index}
                    onClick={() => setSelectedMonth(m.index)}
                    className={`relative flex flex-col items-center justify-center p-2 rounded-xl text-center transition-all cursor-pointer ${
                      isSelected
                        ? isRunning
                          ? "bg-amber-600 text-white shadow-md ring-2 ring-emerald-400 font-bold"
                          : "bg-amber-600 text-white shadow-sm ring-2 ring-amber-400 font-bold"
                        : isRunning
                        ? "bg-emerald-50 text-emerald-950 border-2 border-emerald-500 shadow-sm font-bold ring-2 ring-emerald-200"
                        : "bg-amber-50/60 hover:bg-amber-100/80 text-slate-700 border border-transparent"
                    }`}
                  >
                    {/* Running Month Badge */}
                    {isRunning && (
                      <span className="absolute -top-1.5 -right-1 z-10 inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[7.5px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-xs border border-white">
                        <span className="w-1 h-1 rounded-full bg-emerald-200 inline-block"></span>
                        NOW
                      </span>
                    )}

                    {/* Month tile */}
                    <span className="text-base mb-0.5">{m.icon}</span>
                    <span className="text-[11px] font-semibold truncate w-full">
                      {m.name.slice(0, 3)} '{m.year.toString().slice(2)}
                    </span>
                    <span className={`text-[9px] truncate w-full ${
                      isSelected
                        ? "text-amber-100"
                        : isRunning
                        ? "text-emerald-700 font-bold"
                        : "text-slate-500"
                    }`}>
                      {isRunning ? "Running '26" : m.year === 2027 ? "Upcoming '27" : "Upcoming '26"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
            {/* Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: "all", label: "All Upcoming", icon: "✨" },
                { id: "mahaparva", label: "Maha Parvas", icon: "🔥" },
                { id: "festival", label: "Festivals & Parvas", icon: "🪔" },
                { id: "jayanti", label: "Divine Jayantis", icon: "🕉️" },
                { id: "muhurta", label: "Auspicious Yogas", icon: "⭐" },
                { id: "vrat", label: "Vrat & Upvas", icon: "🌙" }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFestivalCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    festivalCategory === cat.id
                      ? "bg-slate-900 text-white shadow-xs font-semibold"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    festivalCategory === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                  }`}>
                    {categoryCounts[cat.id] || 0}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search festival, deity, mantra..."
                value={festivalSearch}
                onChange={e => setFestivalSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-amber-900/15 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 text-slate-800 placeholder-slate-400 shadow-2xs"
              />
            </div>
          </div>

          {/* Festival Grid & Detail View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Festival List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Festivals &amp; Occasions ({filteredFestivals.length})
                </span>
                <span className="text-[11px] text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-full font-medium">
                  Vedic Year 2026
                </span>
              </div>

              {filteredFestivals.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-amber-300">
                  <Info className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">No festivals found</p>
                  <p className="text-xs text-slate-600 mt-1">Try resetting filters or search keywords.</p>
                  <button
                    onClick={() => { setSelectedMonth("all"); setFestivalCategory("all"); setFestivalSearch(""); }}
                    className="mt-3 text-xs text-amber-700 font-bold hover:underline cursor-pointer"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                filteredFestivals.map(event => {
                  const isSelected = selectedFestival?.id === event.id;
                  const isSubscribed = !!subscribedEvents[event.id];

                  return (
                    <div
                      key={event.id}
                      onClick={() => setSelectedFestival(event)}
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
                          className={`p-2 rounded-xl transition-all cursor-pointer ${
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

            {/* Right: Festival Dossier */}
            <div className="lg:col-span-7">
              {selectedFestival ? (
                <div className="bg-white rounded-3xl border border-amber-900/15 shadow-md overflow-hidden sticky top-20">
                  {/* Dossier Header */}
                  <div className="bg-linear-to-r from-amber-700 via-orange-800 to-amber-900 p-6 text-white relative">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 backdrop-blur-sm border border-white/20 text-amber-200 text-xs font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>{selectedFestival.vedicMonthHi} • {selectedFestival.tithi}</span>
                      </div>

                      <button
                        onClick={() => toggleNotification(selectedFestival.id, selectedFestival.name)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                          subscribedEvents[selectedFestival.id]
                            ? "bg-amber-400 text-slate-950 font-bold"
                            : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
                        }`}
                      >
                        {subscribedEvents[selectedFestival.id] ? (
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
                      {selectedFestival.name}
                    </h2>
                    <p className="text-amber-200 text-sm mt-0.5">
                      {selectedFestival.nameHi} — Presiding Deity: <strong className="text-white">{selectedFestival.deity}</strong>
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-amber-100/90 pt-3 border-t border-white/15">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-amber-300" />
                        <span>Date: <strong>{selectedFestival.dateDisplay}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-amber-300" />
                        <span>Eve Prep: <strong>{selectedFestival.eveDate}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-amber-300" />
                        <span>Vow: <strong>{selectedFestival.rulesAndDiscipline.fastingType}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Dossier Body */}
                  <div className="p-6 space-y-6 max-h-[calc(100vh-280px)] overflow-y-auto no-scrollbar">
                    {/* Puranic Significance */}
                    <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-900/10">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                        <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                        <span>Puranic Significance &amp; Spiritual Essence</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {selectedFestival.significance}
                      </p>
                    </div>

                    {/* 1. Day-Before Preparation Checklist */}
                    <div className="border border-orange-200 rounded-2xl overflow-hidden bg-orange-50/30">
                      <button
                        onClick={() => setExpandedSections(p => ({ ...p, eve: !p.eve }))}
                        className="w-full flex items-center justify-between p-4 bg-orange-100/60 hover:bg-orange-100/80 transition-colors text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-orange-600 text-white flex items-center justify-center text-xs font-bold">
                            1
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">Day-Before (Eve) Preparation Checklist</h4>
                            <p className="text-[11px] text-orange-900/80">Arrangements on {selectedFestival.eveDate} before sunset</p>
                          </div>
                        </div>
                        {expandedSections.eve ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                      </button>

                      {expandedSections.eve && (
                        <div className="p-4 space-y-3">
                          <p className="text-xs text-slate-700 italic">
                            "{selectedFestival.eveGuidance.summary}"
                          </p>
                          <div className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-orange-200/60 flex items-center gap-2">
                            <strong className="text-orange-900">Altar Orientation:</strong>
                            <span>{selectedFestival.eveGuidance.altarDirection}</span>
                          </div>

                          <div className="space-y-2 pt-1">
                            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                              Interactive Preparation Checklist:
                            </div>
                            {selectedFestival.eveGuidance.checklist.map((item, idx) => {
                              const key = `${selectedFestival.id}_eve_${idx}`;
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

                    {/* 2. Exact Muhurtas */}
                    <div className="border border-amber-200 rounded-2xl overflow-hidden bg-amber-50/30">
                      <button
                        onClick={() => setExpandedSections(p => ({ ...p, muhurta: !p.muhurta }))}
                        className="w-full flex items-center justify-between p-4 bg-amber-100/60 hover:bg-amber-100/80 transition-colors text-left cursor-pointer"
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
                          {selectedFestival.exactMuhurtas.map((muh, idx) => (
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

                    {/* 3. Step-by-Step Puja Vidhi */}
                    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                      <button
                        onClick={() => setExpandedSections(p => ({ ...p, vidhi: !p.vidhi }))}
                        className="w-full flex items-center justify-between p-4 bg-slate-100/70 hover:bg-slate-100 transition-colors text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                            3
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">Step-by-Step Puja Vidhi &amp; Mantras</h4>
                            <p className="text-[11px] text-slate-500">Sacred procedure, samagri, and Devanagari stotras</p>
                          </div>
                        </div>
                        {expandedSections.vidhi ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                      </button>

                      {expandedSections.vidhi && (
                        <div className="p-4 space-y-4">
                          <p className="text-xs text-slate-700">
                            {selectedFestival.ritualsAndVidhi.overview}
                          </p>

                          <div>
                            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                              Sacred Samagri (Offerings):
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedFestival.ritualsAndVidhi.samagri.map((item, idx) => (
                                <span key={idx} className="text-xs px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg font-medium">
                                  • {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                              Sequential Puja Steps:
                            </div>
                            {selectedFestival.ritualsAndVidhi.steps.map((step, idx) => (
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

                          <div className="p-4 rounded-2xl bg-amber-900/5 border border-amber-900/20 text-center space-y-2">
                            <div className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">
                              Primary Invocation Mantra
                            </div>
                            <div className="text-sm sm:text-base font-serif font-bold text-amber-950 leading-relaxed">
                              {selectedFestival.ritualsAndVidhi.mantraDevanagari}
                            </div>
                            <div className="text-xs italic text-slate-600">
                              "{selectedFestival.ritualsAndVidhi.mantraTransliteration}"
                            </div>
                            <div className="text-xs text-amber-900/90 pt-1 border-t border-amber-200/60 font-medium">
                              Meaning: {selectedFestival.ritualsAndVidhi.mantraMeaning}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 4. Vrat Discipline & Parana */}
                    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                      <button
                        onClick={() => setExpandedSections(p => ({ ...p, rules: !p.rules }))}
                        className="w-full flex items-center justify-between p-4 bg-slate-100/70 hover:bg-slate-100 transition-colors text-left cursor-pointer"
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
                                {selectedFestival.rulesAndDiscipline.permittedFoods.map((f, i) => (
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
                                {selectedFestival.rulesAndDiscipline.strictlyProhibited.map((f, i) => (
                                  <li key={i}>{f}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                            <strong className="text-amber-950">Mandatory Parana Timing: </strong>
                            <span className="text-slate-700">{selectedFestival.rulesAndDiscipline.paranaTiming}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 5. Ancient Remedies */}
                    <div className="border border-amber-300 rounded-2xl overflow-hidden bg-amber-50/40">
                      <button
                        onClick={() => setExpandedSections(p => ({ ...p, remedies: !p.remedies }))}
                        className="w-full flex items-center justify-between p-4 bg-amber-200/50 hover:bg-amber-200/70 transition-colors text-left cursor-pointer"
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
                          {selectedFestival.ancientRemedies.map((rem, idx) => (
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
      )}

      {/* SUB-TAB 2: SACRED VRAT & FASTING GUIDE */}
      {activeSubTab === "vrats" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
          {/* Sub-Section Navigation Bar */}
          <div className="bg-white rounded-2xl p-2 border border-amber-900/10 shadow-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {[
                { id: "catalog", label: "Vrat Catalog (24 Ekadashis & Pradosh)", icon: "📖" },
                { id: "nakshatra", label: "28 Nakshatra Vratas", icon: "⭐" },
                { id: "goals", label: "Goal-Based Vrat Matcher (10 Goals)", icon: "🎯" },
                { id: "fasting_types", label: "Fasting Types & Dietary Rules", icon: "🥣" },
                { id: "health_safety", label: "Health & Safety Guidance", icon: "🩺" },
                { id: "glossary", label: "Sacred Fasting Glossary (18 Terms)", icon: "📜" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setVratSubSection(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                    vratSubSection === tab.id
                      ? "bg-amber-900 text-amber-200 shadow-sm ring-1 ring-amber-400/50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-amber-50/70"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sub-Section 1: 28 Nakshatra Vratas */}
          {vratSubSection === "nakshatra" && (
            <NakshatraVratSection />
          )}

          {/* Sub-Section 2: Goal-Based Vrats */}
          {vratSubSection === "goals" && (
            <GoalBasedVratSection
              onSelectVratId={(vratId) => {
                const found = ALL_VRATS_CATALOG.find(v => v.id === vratId);
                if (found) {
                  setSelectedVrat(found);
                } else {
                  setVratSearch(vratId.replace(/_/g, " "));
                  setVratSubSection("catalog");
                }
              }}
            />
          )}

          {/* Sub-Section 3: Fasting Types & Rules */}
          {vratSubSection === "fasting_types" && (
            <FastingRulesSection />
          )}

          {/* Sub-Section 4: Health & Safety Guidance */}
          {vratSubSection === "health_safety" && (
            <HealthSafetySection />
          )}

          {/* Sub-Section 5: Sacred Glossary */}
          {vratSubSection === "glossary" && (
            <VratGlossarySection />
          )}

          {/* Sub-Section 6: Full Vrat Catalog */}
          {vratSubSection === "catalog" && (
            <div className="space-y-6">
          {/* Header Description Card */}
          <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Sacred Vrat &amp; Upvas Shastra Catalog
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Comprehensive rules, fasting disciplines, and sunrise Parana formulas according to Hemadri's Vrataraja and Puranic traditions.
                </p>
              </div>

              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search vrat, deity, purpose..."
                  value={vratSearch}
                  onChange={(e) => setVratSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <div className="flex flex-wrap gap-2">
                {vratCategories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setVratCategoryFilter(c.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      vratCategoryFilter === c.id
                        ? "bg-amber-950 text-amber-300 shadow-xs ring-1 ring-amber-400/40"
                        : "bg-amber-50 text-slate-700 hover:bg-amber-100"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Showing <strong>{filteredVrats.length}</strong> authenticated sacred vrats
              </span>
            </div>
          </div>

          {/* Vrats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVrats.map((vrat) => (
              <div
                key={vrat.id}
                onClick={() => setSelectedVrat(vrat)}
                className="bg-white rounded-2xl border border-amber-900/10 hover:border-amber-400/50 p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                      {vrat.category.replace("_", " ")}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {vrat.fastingMethod}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-amber-900 mt-2">
                    {vrat.name}
                  </h3>
                  <p className="font-serif text-xs text-amber-800 font-semibold">{vrat.nameHindi}</p>

                  <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                    {vrat.purpose}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Deity: <strong className="text-slate-800">{vrat.deity}</strong></span>
                    <span>{vrat.tithiOrTiming}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700">
                  <span>View Vidhi &amp; Parana Rules</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

            </div>
          )}

          {/* Vrat Details Modal */}
          {selectedVrat && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 relative shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setSelectedVrat(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-md">
                      {selectedVrat.category.replace("_", " ")}
                    </span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                      Method: {selectedVrat.fastingMethod}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                    {selectedVrat.name} ({selectedVrat.nameHindi})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Presiding Deity: <strong>{selectedVrat.deity}</strong> • Timing: {selectedVrat.tithiOrTiming}
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                  <strong className="text-slate-900 font-serif block text-sm">Spiritual Purpose &amp; Phala:</strong>
                  <p className="leading-relaxed">{selectedVrat.purpose}</p>
                </div>

                <div className="space-y-2 text-xs">
                  <strong className="text-slate-900 font-serif block text-sm">Step-by-Step Puja &amp; Fasting Vidhi:</strong>
                  <ol className="space-y-1.5 pl-4 list-decimal text-slate-700">
                    {selectedVrat.vidhi.map((step, idx) => (
                      <li key={idx} className="leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80">
                    <strong className="text-emerald-950 font-bold block mb-1">Permitted Phalahar Foods:</strong>
                    <ul className="space-y-1">
                      {selectedVrat.permittedFoods.map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-emerald-900">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-200/80">
                    <strong className="text-rose-950 font-bold block mb-1">Strictly Prohibited:</strong>
                    <ul className="space-y-1">
                      {selectedVrat.forbiddenFoods.map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-rose-900">
                          <X className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs space-y-1">
                  <strong className="text-amber-950 font-serif block text-sm">Parana Timing &amp; Breaking the Fast:</strong>
                  <p className="text-amber-900 leading-relaxed">{selectedVrat.paranaRules}</p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedVrat(null)}
                    className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Close Guide
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
