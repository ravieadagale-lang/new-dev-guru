import React, { useState, useMemo, useEffect } from "react";
import { UserProfile } from "../types";
import {
  GLOBAL_CITIES,
  CityLocation,
  getAccurateLocationPanchang,
  calculateExactPlanetaryPositions,
  calculateTarabalamAndChandrabalam
} from "../utils/vedicAstronomicalEngine";
import { DualDatePanchangComparisonWidget } from "../components/DualDatePanchangComparisonWidget";
import { AncientTithiNakshatraRitualsWidget } from "../components/AncientTithiNakshatraRitualsWidget";
import { FuturePanchangCalendarWidget } from "../components/FuturePanchangCalendarWidget";
import { AuthoritativeMuhurtaFinderWidget } from "../components/AuthoritativeMuhurtaFinderWidget";
import { DedicatedChoghadiyaView } from "../components/DedicatedChoghadiyaView";
import { MuhuratCalendarSyncModal } from "../components/MuhuratCalendarSyncModal";
import { PanchangPrecisionModule } from "../components/panchang/PanchangPrecisionModule";
import { MuhurtaQualityScoreIndicator } from "../components/panchang/MuhurtaQualityScoreIndicator";
import {
  Sun,
  Moon,
  Clock,
  Compass,
  Calendar as CalendarIcon,
  Sparkles,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  CalendarCheck,
  Heart,
  Home,
  Car,
  Briefcase,
  Scale,
  Baby,
  RefreshCw,
  Award,
  Layers,
  Zap
} from "lucide-react";

interface PanchangMuhuratViewProps {
  userProfile?: UserProfile;
  onUpdateProfile?: (profile: UserProfile) => void;
}

export type PanchangSubTab =
  | "panchang"
  | "muhurta_score"
  | "precision"
  | "muhurats"
  | "horas"
  | "choghadiya"
  | "gowri"
  | "future_calendar"
  | "ancient_rituals"
  | "date_comparison"
  | "transit_chart"
  | "ashtakavarga"
  | "numerology_muhurta";

export const PanchangMuhuratView: React.FC<PanchangMuhuratViewProps> = ({
  userProfile,
  onUpdateProfile
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });

  const [selectedCity, setSelectedCity] = useState<CityLocation>(GLOBAL_CITIES[0]);

  const [activeTab, setActiveTab] = useState<PanchangSubTab>("panchang");
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  // Check if selectedDate matches Today (UTC, user local, or selected city local)
  const isToday = useMemo(() => {
    const now = new Date();
    const utcStr = now.toISOString().split("T")[0];
    const localStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const cityMs = now.getTime() + now.getTimezoneOffset() * 60000 + (selectedCity?.timezoneOffsetHours ?? 5.5) * 3600000;
    const cityStr = new Date(cityMs).toISOString().split("T")[0];
    return selectedDate === utcStr || selectedDate === localStr || selectedDate === cityStr;
  }, [selectedDate, selectedCity?.timezoneOffsetHours]);

  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

  // Lightweight 60-second timer aligned to the minute boundary (Active for TODAY ONLY)
  useEffect(() => {
    if (!isToday) return;

    // Immediately sync to fresh time when viewing Today
    setCurrentTime(new Date());

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    // Align precisely with the next minute boundary
    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    const safeDelay = Math.max(500, msUntilNextMinute);

    timeoutId = setTimeout(() => {
      setCurrentTime(new Date());
      intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 60000);
    }, safeDelay);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isToday, selectedDate]);

  // Heavy astronomical Panchang ephemeris calculations (memoized purely on selected date & city)
  const basePanchangData = useMemo(() => {
    return getAccurateLocationPanchang(selectedDate, selectedCity);
  }, [selectedDate, selectedCity]);

  // Active Hora and Active Choghadiya live evaluation (updates every 60s for TODAY ONLY)
  const panchangData = useMemo(() => {
    if (!isToday) {
      return basePanchangData;
    }

    const evalMs = currentTime.getTime();

    // 1. Update 24 Horas active state & progress
    const updateHoras = (list: any[] = []) =>
      list.map((h: any) => {
        const startMs = h.startTime instanceof Date ? h.startTime.getTime() : new Date(h.startTime).getTime();
        const endMs = h.endTime instanceof Date ? h.endTime.getTime() : new Date(h.endTime).getTime();
        const durationMs = endMs - startMs;
        const isActive = evalMs >= startMs && evalMs < endMs;
        const isPassed = evalMs >= endMs;
        const isUpcoming = evalMs < startMs;
        const progressPct = isActive && durationMs > 0
          ? Math.min(100, Math.max(0, Math.round(((evalMs - startMs) / durationMs) * 100)))
          : isPassed ? 100 : 0;

        return {
          ...h,
          isActive,
          isPassed,
          isUpcoming,
          progressPct
        };
      });

    const updatedDayHoras = updateHoras(basePanchangData.dayHoras || basePanchangData.horas?.slice(0, 12));
    const updatedNightHoras = updateHoras(basePanchangData.nightHoras || basePanchangData.horas?.slice(12, 24));
    const updatedAllHoras = [...updatedDayHoras, ...updatedNightHoras];
    const activeHora = updatedAllHoras.find((h) => h.isActive) || updatedAllHoras[0] || basePanchangData.currentHora;

    // 2. Update 16 Choghadiyas active state
    const updateChog = (list: any[] = []) =>
      list.map((c: any) => {
        const startMs = c.startTime instanceof Date ? c.startTime.getTime() : new Date(c.startTime).getTime();
        const endMs = c.endTime instanceof Date ? c.endTime.getTime() : new Date(c.endTime).getTime();
        const isActive = evalMs >= startMs && evalMs < endMs;
        const isPassed = evalMs >= endMs;
        const isUpcoming = evalMs < startMs;

        return {
          ...c,
          isActive,
          isPassed,
          isUpcoming
        };
      });

    const updatedDayChog = updateChog(basePanchangData.choghadiya?.day || basePanchangData.dayChoghadiya || []);
    const updatedNightChog = updateChog(basePanchangData.choghadiya?.night || basePanchangData.nightChoghadiya || []);
    const activeChog =
      updatedDayChog.find((c) => c.isActive) ||
      updatedNightChog.find((c) => c.isActive) ||
      updatedDayChog[0] ||
      basePanchangData.activeChoghadiya;

    return {
      ...basePanchangData,
      horas: updatedAllHoras,
      dayHoras: updatedDayHoras,
      nightHoras: updatedNightHoras,
      currentHora: activeHora,
      choghadiya: {
        day: updatedDayChog,
        night: updatedNightChog
      },
      dayChoghadiya: updatedDayChog,
      nightChoghadiya: updatedNightChog,
      activeChoghadiya: activeChog
    };
  }, [basePanchangData, isToday, currentTime]);

  // Planetary positions
  const planetaryPositions = useMemo(() => {
    return calculateExactPlanetaryPositions(selectedDate);
  }, [selectedDate]);

  // Tarabalam & Chandrabalam
  const tarabalamData = useMemo(() => {
    const userNak = userProfile?.nakshatra || "Rohini";
    const userRashi = userProfile?.rashi || "Taurus";
    return calculateTarabalamAndChandrabalam(
      userNak,
      userRashi,
      panchangData.nakshatra,
      panchangData.moonSign
    );
  }, [userProfile, panchangData]);

  // Step Date
  const handleStepDay = (days: number) => {
    const current = new Date(selectedDate.includes("T") ? selectedDate : `${selectedDate}T00:00:00`);
    current.setDate(current.getDate() + days);
    setSelectedDate(current.toISOString().split("T")[0]);
  };

  const navTabs: { id: PanchangSubTab; label: string }[] = [
    { id: "panchang", label: "☀️ Daily Panchang" },
    { id: "muhurta_score", label: "⚡ Muhurta Quality Score" },
    { id: "precision", label: "🎯 Panchang Precision" },
    { id: "muhurats", label: "✨ Muhurta Finder" },
    { id: "horas", label: "⏳ 24 Horas" },
    { id: "choghadiya", label: "🛡️ Choghadiya" },
    { id: "gowri", label: "🌟 Personal Panchang & Tarabalam" },
    { id: "future_calendar", label: "📅 Panchang Calendar" },
    { id: "ancient_rituals", label: "📿 Tithi & Nakshatra Guide" },
    { id: "date_comparison", label: "⚖️ Date Comparison" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. MASTER HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#171A21] via-[#242A35] to-[#171A21] rounded-3xl p-6 sm:p-8 border border-amber-500/30 text-amber-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Parashari Astronomical &amp; SaaS Calculations Engine</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Panchang &amp; Shubh Muhurat OS
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed font-sans">
              Real-time calculations for Tithi, Nakshatra, Yoga, Karana, Choghadiya, Horas, and Personalized Tarabalam with astronomical coordinate accuracy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsSyncModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Sync Muhurats to Calendar</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. DATE STEPPER & CITY SELECTOR BAR */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-amber-900/10 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Date stepper */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleStepDay(-1)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
            title="Previous Day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50">
            <CalendarIcon className="w-4 h-4 text-amber-600" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            />
          </div>

          <button
            onClick={() => handleStepDay(1)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
            title="Next Day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setSelectedDate(new Date().toISOString().split("T")[0])}
            className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-all cursor-pointer"
          >
            Today
          </button>
        </div>

        {/* City selector */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
          <select
            value={selectedCity.name}
            onChange={(e) => {
              const found = GLOBAL_CITIES.find((c) => c.name === e.target.value);
              if (found) setSelectedCity(found);
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            {GLOBAL_CITIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} ({c.timezone})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. TWO-TIER STICKY PANCHANG NAVIGATION RIBBON */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-3 no-scrollbar text-xs font-semibold">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl transition-all cursor-pointer select-none ${
                isActive
                  ? "bg-slate-900 text-amber-300 font-bold shadow-md scale-102"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-amber-900/10"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. SUB-TAB VIEWS */}

      {/* 4.1 Daily Panchang Overview */}
      {activeTab === "panchang" && (
        <div className="space-y-8">
          {/* Panchang Precision Quick Launch Card */}
          <div className="bg-gradient-to-r from-slate-900 via-[#1e2430] to-slate-900 p-5 rounded-3xl border border-amber-500/30 text-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Panchang Precision Module Active</span>
              </div>
              <p className="text-xs text-amber-200/80 leading-relaxed">
                Calculate Tithi, Karana, and Yoga using advanced astronomical ephemeris algorithms calibrated to your exact latitude, longitude, and timezone.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("precision")}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer hover:scale-102"
            >
              <span>Open Precision Console</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Real-Time Muhurta Quality Score Indicator */}
          <MuhurtaQualityScoreIndicator
            selectedCity={selectedCity}
            selectedDate={selectedDate}
            currentTime={currentTime}
            isToday={isToday}
          />

          {/* Primary Panchanga Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-amber-900/10 shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase text-amber-800 block">Tithi (Lunar Day)</span>
              <strong className="text-sm font-serif font-bold text-slate-900 block truncate">
                {panchangData.tithi}
              </strong>
              <span className="text-[11px] text-slate-500 block">{panchangData.paksha} Paksha</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-amber-900/10 shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase text-amber-800 block">Nakshatra (Lunar Mansion)</span>
              <strong className="text-sm font-serif font-bold text-slate-900 block truncate">
                {panchangData.nakshatra}
              </strong>
              <span className="text-[11px] text-slate-500 block">Pada {panchangData.nakshatraPada}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-amber-900/10 shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase text-amber-800 block">Yoga (Solar-Lunar Union)</span>
              <strong className="text-sm font-serif font-bold text-slate-900 block truncate">
                {panchangData.yoga}
              </strong>
              <span className="text-[11px] text-emerald-600 font-semibold block">Auspicious</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-amber-900/10 shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase text-amber-800 block">Karana (Half Tithi)</span>
              <strong className="text-sm font-serif font-bold text-slate-900 block truncate">
                {panchangData.karana}
              </strong>
              <span className="text-[11px] text-slate-500 block">Chara Karana</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-amber-900/10 shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase text-amber-800 block">Vara (Solar Day)</span>
              <strong className="text-sm font-serif font-bold text-slate-900 block truncate">
                {panchangData.vara}
              </strong>
              <span className="text-[11px] text-slate-500 block">{selectedCity.name.split(",")[0]}</span>
            </div>
          </div>

          {/* Critical Muhurta Timings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">Abhijit Muhurta</span>
              <strong className="text-sm font-bold text-emerald-950 block">{panchangData.abhijitMuhurta}</strong>
              <span className="text-[11px] text-emerald-700">Overcomes all planetary doshas</span>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
              <span className="text-[10px] font-bold text-purple-800 uppercase block">Brahma Muhurta</span>
              <strong className="text-sm font-bold text-purple-950 block">{panchangData.brahmaMuhurta}</strong>
              <span className="text-[11px] text-purple-700">Ideal for dhyana &amp; mantra japa</span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
              <span className="text-[10px] font-bold text-rose-800 uppercase block">Rahu Kalam (Inauspicious)</span>
              <strong className="text-sm font-bold text-rose-950 block">{panchangData.rahuKala}</strong>
              <span className="text-[11px] text-rose-700">Postpone key ventures &amp; signings</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
              <span className="text-[10px] font-bold text-amber-800 uppercase block">Yamagandam (Caution)</span>
              <strong className="text-sm font-bold text-amber-950 block">{panchangData.yamaganda}</strong>
              <span className="text-[11px] text-amber-700">Avoid long journeys</span>
            </div>
          </div>

          {/* Sun & Moon Coordinates */}
          <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Sunrise</span>
              <strong className="text-base font-serif font-bold text-amber-900">{panchangData.sunrise}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Sunset</span>
              <strong className="text-base font-serif font-bold text-amber-900">{panchangData.sunset}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Moonrise</span>
              <strong className="text-base font-serif font-bold text-slate-800">{panchangData.moonrise}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Moonset</span>
              <strong className="text-base font-serif font-bold text-slate-800">{panchangData.moonset}</strong>
            </div>
          </div>

          {/* Choghadiya Grid */}
          <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Location-Aware Choghadiya Muhurtas ({selectedCity.name.split(",")[0]})
                </h3>
                <p className="text-xs text-slate-500">
                  Calculated from astronomical Sunrise ({panchangData.sunrise}) to Sunset ({panchangData.sunset}) &amp; next Sunrise
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 self-start">
                8 Daytime &bull; 8 Nighttime Segments
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block mb-2">
                  ☀️ Daytime Choghadiya
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs">
                  {(panchangData.choghadiya?.day || panchangData.dayChoghadiya || []).map((c: any, i: number) => {
                    const isGood = c.nature === "Amrit" || c.nature === "Shubh" || c.nature === "Labh";
                    const isNeutral = c.nature === "Char";
                    return (
                      <div
                        key={`day-chog-${i}`}
                        className={`p-2.5 rounded-xl border space-y-1 transition-all ${
                          c.isActive
                            ? "bg-amber-500/15 border-amber-500 ring-2 ring-amber-400 text-slate-950 shadow-xs"
                            : isGood
                            ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                            : isNeutral
                            ? "bg-blue-50/80 border-blue-200 text-blue-950"
                            : "bg-rose-50/80 border-rose-200 text-rose-950"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-500 font-mono block">
                            {c.startTimeStr || c.time?.split("-")[0]?.trim()} - {c.endTimeStr || c.time?.split("-")[1]?.trim()}
                          </span>
                          {c.isActive && (
                            <span className="text-[8px] font-extrabold bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded-full uppercase">
                              Now
                            </span>
                          )}
                        </div>
                        <strong className="block font-serif font-bold text-xs">{c.name}</strong>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-semibold">{c.nature}</span>
                          <span className="text-slate-400">{c.lord}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold text-indigo-800 tracking-wider block mb-2">
                  🌙 Nighttime Choghadiya
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs">
                  {(panchangData.choghadiya?.night || panchangData.nightChoghadiya || []).map((c: any, i: number) => {
                    const isGood = c.nature === "Amrit" || c.nature === "Shubh" || c.nature === "Labh";
                    const isNeutral = c.nature === "Char";
                    return (
                      <div
                        key={`night-chog-${i}`}
                        className={`p-2.5 rounded-xl border space-y-1 transition-all ${
                          c.isActive
                            ? "bg-indigo-500/15 border-indigo-500 ring-2 ring-indigo-400 text-slate-950 shadow-xs"
                            : isGood
                            ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                            : isNeutral
                            ? "bg-blue-50/80 border-blue-200 text-blue-950"
                            : "bg-rose-50/80 border-rose-200 text-rose-950"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-500 font-mono block">
                            {c.startTimeStr || c.time?.split("-")[0]?.trim()} - {c.endTimeStr || c.time?.split("-")[1]?.trim()}
                          </span>
                          {c.isActive && (
                            <span className="text-[8px] font-extrabold bg-indigo-500 text-white px-1.5 py-0.5 rounded-full uppercase">
                              Now
                            </span>
                          )}
                        </div>
                        <strong className="block font-serif font-bold text-xs">{c.name}</strong>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-semibold">{c.nature}</span>
                          <span className="text-slate-400">{c.lord}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4.00 Dedicated Muhurta Quality Score Tab */}
      {activeTab === "muhurta_score" && (
        <div className="space-y-6">
          <MuhurtaQualityScoreIndicator
            selectedCity={selectedCity}
            selectedDate={selectedDate}
            currentTime={currentTime}
            isToday={isToday}
          />
        </div>
      )}

      {/* 4.0 Panchang Precision Astronomical Module */}
      {activeTab === "precision" && (
        <PanchangPrecisionModule
          initialDate={selectedDate}
          initialCity={selectedCity}
          onSyncLocationToParent={(city) => setSelectedCity(city)}
        />
      )}

      {/* 4. Dedicated Choghadiya Tab */}
      {activeTab === "choghadiya" && (
        <DedicatedChoghadiyaView
          panchangData={panchangData}
          selectedCity={selectedCity}
          selectedDate={selectedDate}
        />
      )}

      {/* 4.2 Dual-Date Positivity Comparison */}
      {activeTab === "date_comparison" && (
        <DualDatePanchangComparisonWidget
          userProfile={userProfile}
          selectedCity={selectedCity}
          initialDateA={selectedDate}
        />
      )}

      {/* 4.3 Tithi-Nakshatra Ancient Rituals */}
      {activeTab === "ancient_rituals" && (
        <AncientTithiNakshatraRitualsWidget
          userProfile={userProfile}
          selectedCity={selectedCity}
          selectedDate={selectedDate}
        />
      )}

      {/* 4.4 Future Calendar & Transits */}
      {activeTab === "future_calendar" && (
        <FuturePanchangCalendarWidget
          userProfile={userProfile}
          selectedCity={selectedCity}
          selectedDate={selectedDate}
          onSelectDate={(d) => setSelectedDate(d)}
        />
      )}

      {/* 4.5 30-Day Transit Chart */}
      {activeTab === "transit_chart" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-xs space-y-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              30-Day Planetary Transit Ephemeris
            </h3>
            <p className="text-xs text-slate-500">
              Real-time sidereal zodiac coordinates for the 9 Navagrahas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {planetaryPositions.map((planet, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between"
              >
                <div>
                  <strong className="font-serif font-bold text-sm text-slate-900 block">
                    {planet.name}
                  </strong>
                  <span className="text-xs text-slate-500 font-mono">
                    {planet.rashi} &bull; {planet.degrees}&deg;
                  </span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                  {planet.nakshatra}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4.6 Gowri & Tarabalam */}
      {activeTab === "gowri" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-xs space-y-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Gowri Panchangam, Tarabalam &amp; Chandrabalam
            </h3>
            <p className="text-xs text-slate-500">
              Classical South Indian &amp; Vedic election system paired with personalized birth star ({userProfile?.nakshatra || "Rohini"}) and Moon sign ({userProfile?.rashi || "Taurus"})
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <span className="text-xs font-bold text-amber-900 uppercase">Tarabalam (Star Strength)</span>
              <div className="font-serif text-2xl font-bold text-amber-950">
                {tarabalamData.taraName || "Sadhana Tara"} ({tarabalamData.taraQuality})
              </div>
              <p className="text-xs text-amber-800">
                {tarabalamData.recommendation || "Favorable and spiritually auspicious for initiation of new works."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
              <span className="text-xs font-bold text-sky-900 uppercase">Chandrabalam (Moon Strength)</span>
              <div className="font-serif text-2xl font-bold text-sky-950">
                {tarabalamData.chandrabalam} ({tarabalamData.chandrabalamQuality})
              </div>
              <p className="text-xs text-sky-800">
                The transit Moon blesses your mind with clarity, sound decision-making, and emotional balance.
              </p>
            </div>
          </div>

          {/* Gowri Panchangam Segments */}
          {(panchangData.gowriDay || panchangData.gowriNight) && (
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h4 className="font-serif text-base font-bold text-slate-900">
                Gowri Panchangam Timings ({selectedCity.name.split(",")[0]})
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                {/* Day Gowri */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase text-amber-800 block">
                    ☀️ Daytime Gowri (Sunrise to Sunset)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(panchangData.gowriDay || []).map((g: any, i: number) => {
                      const isGood = g.quality === "Auspicious";
                      const isNeutral = g.quality === "Neutral";
                      return (
                        <div
                          key={`g-day-${i}`}
                          className={`p-2.5 rounded-xl border space-y-0.5 ${
                            isGood
                              ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                              : isNeutral
                              ? "bg-blue-50 border-blue-200 text-blue-950"
                              : "bg-rose-50 border-rose-200 text-rose-950"
                          }`}
                        >
                          <span className="text-[9px] text-slate-500 font-mono block">
                            {g.startTimeStr} - {g.endTimeStr}
                          </span>
                          <strong className="block font-bold text-xs">{g.name}</strong>
                          <span className="text-[10px] opacity-80 block">{g.quality}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Night Gowri */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase text-indigo-800 block">
                    🌙 Nighttime Gowri (Sunset to next Sunrise)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(panchangData.gowriNight || []).map((g: any, i: number) => {
                      const isGood = g.quality === "Auspicious";
                      const isNeutral = g.quality === "Neutral";
                      return (
                        <div
                          key={`g-night-${i}`}
                          className={`p-2.5 rounded-xl border space-y-0.5 ${
                            isGood
                              ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                              : isNeutral
                              ? "bg-blue-50 border-blue-200 text-blue-950"
                              : "bg-rose-50 border-rose-200 text-rose-950"
                          }`}
                        >
                          <span className="text-[9px] text-slate-500 font-mono block">
                            {g.startTimeStr} - {g.endTimeStr}
                          </span>
                          <strong className="block font-bold text-xs">{g.name}</strong>
                          <span className="text-[10px] opacity-80 block">{g.quality}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4.7 24 Horas */}
      {activeTab === "horas" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-serif text-2xl font-bold text-slate-900">24 Authoritative Planetary Horas</h3>
              <p className="text-xs text-slate-500">
                Calculated dynamically for {selectedCity.name} using true solar duration: 12 Daytime Horas (Sunrise to Sunset) &bull; 12 Nighttime Horas (Sunset to next Sunrise)
              </p>
            </div>
            {panchangData.currentHora && (
              <div className="px-3.5 py-1.5 rounded-2xl bg-amber-100/80 border border-amber-300 text-amber-950 text-xs font-bold flex items-center gap-2 self-start">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Active Hora: {panchangData.currentHora.rulingPlanet}</span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Daytime Horas */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-600" />
                <h4 className="font-serif text-sm font-bold text-amber-950 uppercase tracking-wide">
                  Daytime Horas (1 to 12) &bull; Sunrise: {panchangData.sunrise} &bull; Dinamana: {panchangData.dinamana}
                </h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                {(panchangData.dayHoras || panchangData.horas?.slice(0, 12) || []).map((h: any, i: number) => {
                  const isAuspicious = h.nature === "Auspicious";
                  const isNeutral = h.nature === "Neutral";
                  return (
                    <div
                      key={`day-hora-${i}`}
                      className={`p-3.5 rounded-2xl border space-y-1.5 transition-all ${
                        h.isActive
                          ? "bg-amber-500/15 border-amber-500 shadow-md ring-2 ring-amber-400 scale-102"
                          : isAuspicious
                          ? "bg-emerald-50/70 border-emerald-200"
                          : isNeutral
                          ? "bg-slate-50 border-slate-200"
                          : "bg-rose-50/70 border-rose-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-mono">Hora #{h.number || i + 1}</span>
                        {h.isActive && (
                          <span className="text-[9px] font-extrabold bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded-full uppercase">
                            Now
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-600 font-mono font-bold block">{h.timeRange || `${h.startTimeStr} - ${h.endTimeStr}`}</span>
                      <strong className="text-slate-900 block font-serif text-sm">{h.rulingPlanet || h.lord}</strong>
                      <span className={`text-[10px] font-bold block ${isAuspicious ? "text-emerald-700" : isNeutral ? "text-slate-600" : "text-rose-700"}`}>
                        {h.nature}
                      </span>
                      <p className="text-[10px] text-slate-500 line-clamp-2 leading-tight">{h.bestFor}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nighttime Horas */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-600" />
                <h4 className="font-serif text-sm font-bold text-indigo-950 uppercase tracking-wide">
                  Nighttime Horas (13 to 24) &bull; Sunset: {panchangData.sunset} &bull; Ratrimana: {panchangData.ratrimana}
                </h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                {(panchangData.nightHoras || panchangData.horas?.slice(12, 24) || []).map((h: any, i: number) => {
                  const isAuspicious = h.nature === "Auspicious";
                  const isNeutral = h.nature === "Neutral";
                  return (
                    <div
                      key={`night-hora-${i}`}
                      className={`p-3.5 rounded-2xl border space-y-1.5 transition-all ${
                        h.isActive
                          ? "bg-amber-500/15 border-amber-500 shadow-md ring-2 ring-amber-400 scale-102"
                          : isAuspicious
                          ? "bg-emerald-50/70 border-emerald-200"
                          : isNeutral
                          ? "bg-slate-50 border-slate-200"
                          : "bg-rose-50/70 border-rose-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-mono">Hora #{h.number || i + 13}</span>
                        {h.isActive && (
                          <span className="text-[9px] font-extrabold bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded-full uppercase">
                            Now
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-600 font-mono font-bold block">{h.timeRange || `${h.startTimeStr} - ${h.endTimeStr}`}</span>
                      <strong className="text-slate-900 block font-serif text-sm">{h.rulingPlanet || h.lord}</strong>
                      <span className={`text-[10px] font-bold block ${isAuspicious ? "text-emerald-700" : isNeutral ? "text-slate-600" : "text-rose-700"}`}>
                        {h.nature}
                      </span>
                      <p className="text-[10px] text-slate-500 line-clamp-2 leading-tight">{h.bestFor}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4.8 Ashtakavarga */}
      {activeTab === "ashtakavarga" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-xs space-y-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Sarvashtakavarga (SAV) Energy Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Total auspicious benefic points (bindus) across all 12 signs (337 total)
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs text-center">
            {[
              { sign: "Aries (Mesha)", bindus: 32, status: "High" },
              { sign: "Taurus (Vrishabha)", bindus: 28, status: "Average" },
              { sign: "Gemini (Mithuna)", bindus: 34, status: "Excellent" },
              { sign: "Cancer (Karka)", bindus: 26, status: "Moderate" },
              { sign: "Leo (Simha)", bindus: 30, status: "Good" },
              { sign: "Virgo (Kanya)", bindus: 33, status: "High" },
              { sign: "Libra (Tula)", bindus: 25, status: "Moderate" },
              { sign: "Scorpio (Vrischika)", bindus: 29, status: "Good" },
              { sign: "Sagittarius (Dhanu)", bindus: 35, status: "Excellent" },
              { sign: "Capricorn (Makara)", bindus: 24, status: "Caution" },
              { sign: "Aquarius (Kumbha)", bindus: 29, status: "Good" },
              { sign: "Pisces (Meena)", bindus: 32, status: "High" }
            ].map((s, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <span className="font-bold text-slate-800 block">{s.sign}</span>
                <div className="font-serif text-2xl font-bold text-amber-700">{s.bindus}</div>
                <span className="text-[10px] text-slate-500">{s.status} Bindus</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4.9 Shubh Muhurats */}
      {activeTab === "muhurats" && (
        <AuthoritativeMuhurtaFinderWidget
          selectedCity={selectedCity}
          userProfile={userProfile}
          initialDateStr={selectedDate}
          onSelectDate={(d) => {
            setSelectedDate(d);
            setActiveTab("panchang");
          }}
          onOpenSyncModal={() => setIsSyncModalOpen(true)}
        />
      )}

      {/* 4.10 Numerology Muhurta (Ch. 33) */}
      {activeTab === "numerology_muhurta" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-xs space-y-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Chaldean Numerology Hourly Vibrations (Ch. 33)
            </h3>
            <p className="text-xs text-slate-500">
              Synchronizing daily planetary hours with your Life Path and Expression numbers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <strong className="text-sm font-bold text-emerald-950 block">Peak Wealth Hour (Number 8 &amp; 5)</strong>
              <p className="text-emerald-900">
                10:30 AM – 11:45 AM vibrates at commercial frequency 5 (Mercury) and abundance 8 (Saturn). Ideal for sending invoices, closing deals, and signing lease contracts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
              <strong className="text-sm font-bold text-rose-950 block">Love &amp; Harmony Hour (Number 6 &amp; 2)</strong>
              <p className="text-rose-900">
                02:15 PM – 03:30 PM carries the gentle magnetic vibration of Venus (6) and Moon (2). Favors dates, heartfelt proposals, and family reconciliations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <strong className="text-sm font-bold text-amber-950 block">Solar Power Hour (Number 1 &amp; 3)</strong>
              <p className="text-amber-900">
                08:00 AM – 09:15 AM embodies Surya (1) and Jupiter (3). Optimal for executive meetings, investor pitches, and academic examinations.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SYNC TO CALENDAR */}
      <MuhuratCalendarSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        userProfile={userProfile}
      />
    </div>
  );
};
