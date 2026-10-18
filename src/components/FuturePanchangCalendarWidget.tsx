import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserProfile } from "../types";
import { 
  GLOBAL_CITIES, 
  CityLocation, 
  getAccurateLocationPanchang, 
  calculateExactPlanetaryPositions,
  calculateTarabalamAndChandrabalam
} from "../utils/vedicAstronomicalEngine";
import { RashiTransitPositivityChart } from "./RashiTransitPositivityChart";
import { DualDatePanchangComparisonWidget } from "./DualDatePanchangComparisonWidget";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Sun, 
  Moon, 
  Clock, 
  Compass, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Flame, 
  Car, 
  Home, 
  Heart, 
  Briefcase, 
  Gem, 
  Baby, 
  RotateCcw,
  Star,
  Zap,
  Info,
  CalendarCheck,
  Globe,
  Scale
} from "lucide-react";

interface FuturePanchangCalendarWidgetProps {
  userProfile?: UserProfile;
  selectedCity?: CityLocation;
  selectedDate?: string;
  onSelectDate?: (dateStr: string) => void;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const SPECIAL_FESTIVAL_DATES: Record<string, { title: string; type: "festival" | "ekadashi" | "shiva" | "amavasya" | "purnima" }> = {
  "2026-08-03": { title: "Shravan Somwar #1", type: "shiva" },
  "2026-08-10": { title: "Shravan Somwar #2", type: "shiva" },
  "2026-08-17": { title: "Nag Panchami / Shravan Somwar #3", type: "shiva" },
  "2026-08-24": { title: "Shravan Putrada Ekadashi", type: "ekadashi" },
  "2026-08-28": { title: "Shravan Purnima / Raksha Bandhan", type: "purnima" },
  "2026-08-31": { title: "Shravan Somwar #5", type: "shiva" },
  "2026-09-04": { title: "Krishna Janmashtami", type: "festival" },
  "2026-09-08": { title: "Aja Ekadashi", type: "ekadashi" },
  "2026-09-11": { title: "Bhadrapada Amavasya", type: "amavasya" },
  "2026-09-14": { title: "Ganesh Chaturthi", type: "festival" },
  "2026-09-22": { title: "Parivartini Ekadashi", type: "ekadashi" },
  "2026-09-26": { title: "Anant Chaturdashi", type: "festival" },
  "2026-10-11": { title: "Sharad Navratri Begins", type: "festival" },
  "2026-10-19": { title: "Maha Navami", type: "festival" },
  "2026-10-20": { title: "Dussehra / Vijayadashami", type: "festival" },
  "2026-11-01": { title: "Dhanteras", type: "festival" },
  "2026-11-08": { title: "Diwali (Lakshmi Puja)", type: "festival" },
};

export const FuturePanchangCalendarWidget: React.FC<FuturePanchangCalendarWidgetProps> = ({
  userProfile,
  selectedCity = GLOBAL_CITIES[0],
  selectedDate: propsSelectedDate,
  onSelectDate
}) => {
  const todayISO = new Date().toISOString().split("T")[0];
  const initialDateStr = propsSelectedDate || todayISO;

  const initialDateObj = new Date(initialDateStr.includes("T") ? initialDateStr : `${initialDateStr}T00:00:00`);
  
  const [activeYear, setActiveYear] = useState<number>(initialDateObj.getFullYear());
  const [activeMonth, setActiveMonth] = useState<number>(initialDateObj.getMonth()); // 0-indexed
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>(initialDateStr);

  // Dual Date Selection States
  const [compareMode, setCompareMode] = useState<boolean>(true);
  const [dateA, setDateA] = useState<string>(initialDateStr);
  const [dateB, setDateB] = useState<string>(() => {
    const d = new Date(initialDateStr);
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  });
  const [activeSelectingSlot, setActiveSelectingSlot] = useState<"dateA" | "dateB">("dateA");

  const [selectedCategory, setSelectedCategory] = useState<string>("vehicle");

  const activeCity = selectedCity;

  // Handle month navigation
  const handlePrevMonth = () => {
    if (activeMonth === 0) {
      setActiveMonth(11);
      setActiveYear(prev => prev - 1);
    } else {
      setActiveMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (activeMonth === 11) {
      setActiveMonth(0);
      setActiveYear(prev => prev + 1);
    } else {
      setActiveMonth(prev => prev + 1);
    }
  };

  const handleJumpToToday = () => {
    const now = new Date();
    setActiveYear(now.getFullYear());
    setActiveMonth(now.getMonth());
    const todayStr = now.toISOString().split("T")[0];
    setSelectedCalendarDate(todayStr);
    setDateA(todayStr);
    if (onSelectDate) onSelectDate(todayStr);
  };

  const handleDateClick = (dateStr: string) => {
    if (compareMode) {
      if (activeSelectingSlot === "dateA") {
        setDateA(dateStr);
        setSelectedCalendarDate(dateStr);
        setActiveSelectingSlot("dateB");
      } else {
        setDateB(dateStr);
        setActiveSelectingSlot("dateA");
      }
    } else {
      setSelectedCalendarDate(dateStr);
      setDateA(dateStr);
    }
    if (onSelectDate) onSelectDate(dateStr);
  };

  // Build 7xN Calendar Grid Matrix for activeMonth & activeYear
  const firstDayOfMonth = new Date(activeYear, activeMonth, 1);
  const lastDayOfMonth = new Date(activeYear, activeMonth + 1, 0);
  
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sun, 1 = Mon ...

  const calendarCells: Array<{ dateStr: string; dayNum: number; isCurrentMonth: boolean }> = [];

  // Padding days from previous month
  const prevMonthLastDay = new Date(activeYear, activeMonth, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const pDay = prevMonthLastDay - i;
    const pMonth = activeMonth === 0 ? 11 : activeMonth - 1;
    const pYear = activeMonth === 0 ? activeYear - 1 : activeYear;
    const dateStr = `${pYear}-${String(pMonth + 1).padStart(2, '0')}-${String(pDay).padStart(2, '0')}`;
    calendarCells.push({ dateStr, dayNum: pDay, isCurrentMonth: false });
  }

  // Days of current month
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${activeYear}-${String(activeMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarCells.push({ dateStr, dayNum: d, isCurrentMonth: true });
  }

  // Padding days for next month
  const totalCells = calendarCells.length;
  const remainingCells = (7 - (totalCells % 7)) % 7;
  for (let n = 1; n <= remainingCells; n++) {
    const nMonth = activeMonth === 11 ? 0 : activeMonth + 1;
    const nYear = activeMonth === 11 ? activeYear + 1 : activeYear;
    const dateStr = `${nYear}-${String(nMonth + 1).padStart(2, '0')}-${String(n).padStart(2, '0')}`;
    calendarCells.push({ dateStr, dayNum: n, isCurrentMonth: false });
  }

  // Calculate detailed Panchang & Transits for Selected Calendar Date
  const accuratePanchang = getAccurateLocationPanchang(selectedCalendarDate, activeCity);
  const planetaryPositions = calculateExactPlanetaryPositions(selectedCalendarDate, "12:00", activeCity.name);

  // Calculate Tarabalam if user profile exists
  const tarabalamResult = calculateTarabalamAndChandrabalam(
    userProfile?.nakshatra || "Rohini",
    userProfile?.rashi || "Taurus",
    accuratePanchang.nakshatra,
    accuratePanchang.moonSign
  );

  // Pre-calculate Shubh Muhurats suitability for life events on this selected date
  const categoryMuhuratScores: Record<string, { title: string; icon: any; score: number; window: string; status: string; statusColor: string }> = {
    vehicle: {
      title: "Vehicle Purchase (वाहन खरीद)",
      icon: <Car className="w-4 h-4 text-amber-400" />,
      score: tarabalamResult.overallScore >= 80 ? 94 : 72,
      window: `${accuratePanchang.abhijitStartStr} - ${accuratePanchang.abhijitEndStr}`,
      status: tarabalamResult.overallScore >= 80 ? "Highly Auspicious" : "Moderate",
      statusColor: tarabalamResult.overallScore >= 80 ? "text-emerald-400 bg-emerald-500/20" : "text-amber-400 bg-amber-500/20"
    },
    property: {
      title: "Housewarming & Land (गृह प्रवेश)",
      icon: <Home className="w-4 h-4 text-amber-400" />,
      score: tarabalamResult.overallScore >= 85 ? 96 : 68,
      window: `${accuratePanchang.brahmaStartStr} - ${accuratePanchang.abhijitStartStr}`,
      status: tarabalamResult.overallScore >= 85 ? "Excellent Shubh" : "Caution Needed",
      statusColor: tarabalamResult.overallScore >= 85 ? "text-emerald-400 bg-emerald-500/20" : "text-rose-400 bg-rose-500/20"
    },
    marriage: {
      title: "Marriage & Engagement (विवाह/सगाई)",
      icon: <Heart className="w-4 h-4 text-rose-400" />,
      score: tarabalamResult.overallScore >= 80 ? 92 : 75,
      window: "Goraj Muhurat (Sunset ± 45 mins)",
      status: tarabalamResult.overallScore >= 80 ? "Shubh Vivah" : "Average",
      statusColor: tarabalamResult.overallScore >= 80 ? "text-emerald-400 bg-emerald-500/20" : "text-amber-400 bg-amber-500/20"
    },
    business: {
      title: "Business & Investment (व्यापार मुहूर्त)",
      icon: <Briefcase className="w-4 h-4 text-blue-400" />,
      score: tarabalamResult.overallScore >= 75 ? 90 : 70,
      window: `Shubh Gowri Hora (${accuratePanchang.gowriDay[0]?.startTimeStr || "Morning"})`,
      status: "Favorable",
      statusColor: "text-emerald-400 bg-emerald-500/20"
    },
    gold: {
      title: "Gold & Jewelry Purchase (सोना-आभूषण)",
      icon: <Gem className="w-4 h-4 text-amber-300" />,
      score: 88,
      window: "Amrit Gowri Hora",
      status: "Shubh Timing",
      statusColor: "text-emerald-400 bg-emerald-500/20"
    },
    samskara: {
      title: "Namkaran & Mundan (संस्कार मुहूर्त)",
      icon: <Baby className="w-4 h-4 text-purple-400" />,
      score: 85,
      window: "Brahma Muhurat Twilight",
      status: "Good Auspicious",
      statusColor: "text-emerald-400 bg-emerald-500/20"
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1A1612] via-[#241E18] to-[#14100D] text-amber-100 rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-widest mb-1.5">
            <CalendarCheck className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Interactive Panchang & Planetary Transit Calendar
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 flex items-center gap-2">
            <span>Pre-Calculate Future Panchang & Muhurats</span>
          </h2>
          <p className="text-xs text-amber-200/70 mt-1 font-serif">
            Select any future date on the calendar to instantly calculate upcoming planetary transits, auspicious muhurats, and Rahu Kaal windows.
          </p>
        </div>

        {/* MONTH / YEAR NAVIGATION & TODAY BUTTON */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-200 hover:bg-amber-900 transition-all cursor-pointer"
            title="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="px-4 py-2 rounded-xl bg-[#120F0D] border border-amber-500/40 font-serif font-bold text-amber-200 text-sm flex items-center gap-2">
            <span>{MONTH_NAMES[activeMonth]} {activeYear}</span>
          </div>

          <button
            onClick={handleNextMonth}
            className="p-2 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-200 hover:bg-amber-900 transition-all cursor-pointer"
            title="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleJumpToToday}
            className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-md cursor-pointer ml-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Today</span>
          </button>
        </div>
      </div>

      {/* DUAL DATE SELECTION SLOT CONTROLS */}
      <div className="bg-[#120F0D] p-3.5 sm:p-4 rounded-2xl border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCompareMode(true);
              setActiveSelectingSlot("dateA");
            }}
            className={`px-3 py-1.5 rounded-xl font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
              compareMode && activeSelectingSlot === "dateA"
                ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-400/50"
                : "bg-amber-950/60 text-amber-300 border-amber-500/30 hover:bg-amber-900"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-slate-900" />
            <span>Picking Slot A: {dateA}</span>
          </button>

          <button
            onClick={() => {
              setCompareMode(true);
              setActiveSelectingSlot("dateB");
            }}
            className={`px-3 py-1.5 rounded-xl font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
              compareMode && activeSelectingSlot === "dateB"
                ? "bg-cyan-400 text-slate-950 border-cyan-300 shadow-md ring-2 ring-cyan-300/50"
                : "bg-cyan-950/60 text-cyan-300 border-cyan-500/30 hover:bg-cyan-900"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 border border-slate-900" />
            <span>Picking Slot B: {dateB}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
              compareMode
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-slate-800 text-slate-300 border-slate-700"
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>{compareMode ? "Dual-Date Comparison Mode: ON" : "Single Date Mode"}</span>
          </button>
        </div>
      </div>

      {/* 7-COLUMN MONTHLY CALENDAR GRID */}
      <div className="space-y-2">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-bold text-amber-300 uppercase tracking-wider py-1 border-b border-amber-900/40">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Days Grid Cells */}
        <div className="grid grid-cols-7 gap-1.5">
          {calendarCells.map((cell, idx) => {
            const isDateA = cell.dateStr === dateA;
            const isDateB = compareMode && cell.dateStr === dateB;
            const isSelected = cell.dateStr === selectedCalendarDate;
            const isToday = cell.dateStr === todayISO;
            const festMeta = SPECIAL_FESTIVAL_DATES[cell.dateStr];

            // Deterministic Muhurat rating helper for calendar dots
            const dayNum = parseInt(cell.dateStr.split("-")[2]);
            const isShubhDay = [3, 5, 7, 10, 11, 13, 15, 17, 21, 24, 28].includes(dayNum);
            const isInauspiciousDay = [4, 9, 14, 19, 29].includes(dayNum);

            return (
              <button
                key={idx}
                onClick={() => handleDateClick(cell.dateStr)}
                className={`p-2 sm:p-2.5 rounded-2xl text-left transition-all relative border cursor-pointer min-h-[68px] flex flex-col justify-between ${
                  !cell.isCurrentMonth
                    ? "opacity-30 bg-[#120E0C]/40 border-slate-900 text-slate-500"
                    : isDateA
                    ? "bg-amber-500/20 border-amber-400 text-amber-100 shadow-xl ring-2 ring-amber-400 scale-[1.02] z-10"
                    : isDateB
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-100 shadow-xl ring-2 ring-cyan-400 scale-[1.02] z-10"
                    : isSelected
                    ? "bg-amber-500/10 border-amber-500/50 text-amber-100"
                    : isToday
                    ? "bg-amber-950/80 border-amber-500/70 text-amber-200"
                    : "bg-[#14100D] border-amber-900/30 text-amber-200/90 hover:bg-[#1C1612] hover:border-amber-500/40"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-bold font-mono ${isToday ? "text-amber-400 font-extrabold" : ""}`}>
                    {cell.dayNum}
                  </span>

                  {/* Date A / Date B Badge */}
                  {isDateA && (
                    <span className="text-[9px] font-extrabold bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full shadow">
                      Slot A
                    </span>
                  )}
                  {isDateB && (
                    <span className="text-[9px] font-extrabold bg-cyan-400 text-slate-950 px-1.5 py-0.2 rounded-full shadow">
                      Slot B
                    </span>
                  )}

                  {/* Dot Indicator for Muhurat Quality */}
                  {!isDateA && !isDateB && cell.isCurrentMonth && (
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isShubhDay
                          ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"
                          : isInauspiciousDay
                          ? "bg-rose-500"
                          : "bg-amber-400/60"
                      }`}
                      title={isShubhDay ? "Highly Favorable Muhurat Day" : isInauspiciousDay ? "Inauspicious / Rahu Heavy" : "Moderate Day"}
                    />
                  )}
                </div>

                {/* Festival Tag */}
                {festMeta && cell.isCurrentMonth && (
                  <div className="text-[9px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 rounded px-1 py-0.2 mt-1 line-clamp-1 truncate w-full">
                    ✨ {festMeta.title.split(" ")[0]}
                  </div>
                )}

                {/* Today Badge */}
                {isToday && !isDateA && !isDateB && (
                  <span className="text-[8px] font-extrabold bg-amber-500 text-slate-950 rounded px-1 py-0.2 uppercase self-start mt-1">
                    Today
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* DUAL DATE SIDE-BY-SIDE COMPARISON WIDGET */}
      {compareMode && (
        <DualDatePanchangComparisonWidget
          userProfile={userProfile}
          selectedCity={activeCity}
          initialDateA={dateA}
          initialDateB={dateB}
          onSelectDateA={(newA) => setDateA(newA)}
          onSelectDateB={(newB) => setDateB(newB)}
        />
      )}

      {/* SELECTED FUTURE DATE PRE-CALCULATED PANCHANG & TRANSITS REPORT */}
      <motion.div 
        key={selectedCalendarDate}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#120F0D] via-[#1B1612] to-[#120F0D] p-6 sm:p-8 rounded-3xl border border-amber-500/40 space-y-6 shadow-2xl"
      >
        {/* REPORT TOP BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/30 pb-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Calculated Report for Selected Date ({activeCity.name}):
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100 mt-0.5">
              {accuratePanchang.formattedDate}
            </h3>
            <p className="text-xs text-amber-200/70 mt-0.5 font-serif">
              Masa: <strong className="text-amber-300">{accuratePanchang.masa}</strong> • Day: <strong>{accuratePanchang.dayOfWeek}</strong> • City: {activeCity.name} ({activeCity.country})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900/90 px-4 py-2 rounded-xl border border-amber-500/30 text-center font-mono">
              <div className="text-[10px] text-slate-400">Moon Sign</div>
              <div className="text-amber-300 font-bold text-sm">{accuratePanchang.moonSign}</div>
            </div>

            <div className="bg-slate-900/90 px-4 py-2 rounded-xl border border-amber-500/30 text-center font-mono">
              <div className="text-[10px] text-slate-400">Sun Sign</div>
              <div className="text-amber-300 font-bold text-sm">{accuratePanchang.sunSign}</div>
            </div>
          </div>
        </div>

        {/* PANCHANG 5 ELEMENTS GRID FOR SELECTED FUTURE DATE */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">1. Tithi & Paksha:</span>
            <div className="text-amber-200 font-bold font-serif">{accuratePanchang.tithi}</div>
            <div className="text-[10px] text-amber-300/70">{accuratePanchang.tithiTimingStr}</div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">2. Nakshatra:</span>
            <div className="text-amber-200 font-bold font-serif">{accuratePanchang.nakshatra}</div>
            <div className="text-[10px] text-amber-300/70">Lord: {accuratePanchang.nakshatraRuler}</div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">3. Yoga & Karana:</span>
            <div className="text-amber-200 font-bold font-serif">{accuratePanchang.yoga}</div>
            <div className="text-[10px] text-amber-300/70">Karana: {accuratePanchang.karana}</div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">4. Solar Timings:</span>
            <div className="text-amber-200 font-bold font-serif">🌅 {accuratePanchang.sunriseStr}</div>
            <div className="text-[10px] text-amber-300/70">🌇 {accuratePanchang.sunsetStr}</div>
          </div>
        </div>

        {/* PLANETARY TRANSIT SNAPSHOT ON THIS SELECTED FUTURE DATE */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-serif text-sm font-bold text-amber-200 flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Planetary Transit Positions on {selectedCalendarDate}</span>
            </h4>
            <span className="text-[11px] text-amber-300/70 font-mono">Lahiri Sidereal Ayanamsha</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 text-center text-xs">
            {planetaryPositions.planets.map((p) => (
              <div key={p.name} className="bg-slate-950/90 p-2.5 rounded-xl border border-amber-900/30 space-y-0.5">
                <div className="font-bold text-amber-300 text-[11px]">{p.name}</div>
                <div className="text-[11px] text-white font-serif font-semibold">{p.sign}</div>
                <div className="text-[9px] text-slate-400 font-mono">{p.degInSign.toFixed(1)}°</div>
              </div>
            ))}
          </div>
        </div>

        {/* MUHURATS & INAUSPICIOUS PERIODS PRE-CALCULATED WINDOWS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Favorable Windows */}
          <div className="bg-emerald-950/30 p-4 rounded-2xl border border-emerald-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Pre-Calculated Favorable Muhurat Windows
            </div>
            <div className="space-y-1.5 text-xs text-emerald-100/90">
              <div className="flex items-center justify-between border-b border-emerald-900/40 pb-1">
                <span>Abhijit Muhurat:</span>
                <strong className="font-mono text-emerald-300">{accuratePanchang.abhijitStartStr} - {accuratePanchang.abhijitEndStr}</strong>
              </div>
              <div className="flex items-center justify-between border-b border-emerald-900/40 pb-1">
                <span>Brahma Muhurat:</span>
                <strong className="font-mono text-emerald-300">{accuratePanchang.brahmaStartStr} - {accuratePanchang.brahmaEndStr}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Amrit Gowri Hora:</span>
                <strong className="font-mono text-emerald-300">{accuratePanchang.gowriDay[0]?.startTimeStr || "Morning Hours"}</strong>
              </div>
            </div>
          </div>

          {/* Inauspicious Windows */}
          <div className="bg-rose-950/30 p-4 rounded-2xl border border-rose-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Inauspicious Windows to Avoid (वर्ज्य काल)
            </div>
            <div className="space-y-1.5 text-xs text-rose-100/90">
              <div className="flex items-center justify-between border-b border-rose-900/40 pb-1">
                <span>Rahu Kaal (राहु काल):</span>
                <strong className="font-mono text-rose-300">{accuratePanchang.rahuStartStr} - {accuratePanchang.rahuEndStr}</strong>
              </div>
              <div className="flex items-center justify-between border-b border-rose-900/40 pb-1">
                <span>Yamagandam (यमगण्ड):</span>
                <strong className="font-mono text-rose-300">{accuratePanchang.yamagandaStartStr} - {accuratePanchang.yamagandaEndStr}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Gulika Kaal (गुलीक काल):</span>
                <strong className="font-mono text-rose-300">{accuratePanchang.gulikaStartStr} - {accuratePanchang.gulikaEndStr}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* EVENT-SPECIFIC SHUBH MUHURAT SUITABILITY GRID FOR THIS FUTURE DATE */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Pre-Calculated Muhurats for Life Events on {selectedCalendarDate}:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(categoryMuhuratScores).map(([key, item]) => (
              <div key={key} className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-amber-200 text-xs">
                    {item.icon}
                    <span>{item.title.split(" ")[0]}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.statusColor}`}>
                    {item.score}% Match
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 font-mono">
                  Best Window: {item.window}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 30-DAY RECHARTS TRANSIT POSITIVITY PROJECTION CHART */}
      <RashiTransitPositivityChart
        userProfile={userProfile}
        selectedCity={activeCity}
        onSelectDate={(newDateStr) => {
          setSelectedCalendarDate(newDateStr);
          if (onSelectDate) onSelectDate(newDateStr);
        }}
      />
    </div>
  );
};
