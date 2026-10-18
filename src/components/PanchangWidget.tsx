import React, { useState } from "react";
import { calculateTodayPanchang } from "../data/astrologyData";
import { Sun, Moon, Clock, Sparkles, Calendar, AlertTriangle, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

export const PanchangWidget: React.FC = () => {
  const todayISO = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayISO);

  const panchang = calculateTodayPanchang(selectedDate);

  const handleOffsetDate = (days: number) => {
    const d = new Date(selectedDate.includes("T") ? selectedDate : `${selectedDate}T00:00:00`);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().split("T")[0]);
  };

  const isToday = selectedDate === todayISO;

  return (
    <div className="bg-gradient-to-br from-[#1E1B18] via-[#2A241F] to-[#120F0D] text-amber-100 rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-xl space-y-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Live Panchang & Cosmic Transit
          </span>
          <h3 className="font-serif text-2xl font-bold text-amber-100 mt-0.5">
            {isToday ? "Today's Panchang" : "Panchang Details"} ({panchang.date})
          </h3>
        </div>

        {/* Date Selector & Sunrise/Sunset Info */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-amber-950/80 px-2 py-1 rounded-2xl border border-amber-500/30 text-xs text-amber-200">
            <button
              onClick={() => handleOffsetDate(-1)}
              className="p-1 hover:bg-amber-800/50 rounded-lg text-amber-300 transition-colors"
              title="Previous Day"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-amber-100 text-xs font-semibold focus:outline-hidden px-1"
            />
            <button
              onClick={() => handleOffsetDate(1)}
              className="p-1 hover:bg-amber-800/50 rounded-lg text-amber-300 transition-colors"
              title="Next Day"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            {!isToday && (
              <button
                onClick={() => setSelectedDate(todayISO)}
                className="ml-1 px-2 py-0.5 bg-amber-500 text-slate-950 font-extrabold text-[10px] rounded-md hover:bg-amber-400 transition-colors flex items-center gap-1"
                title="Reset to Today"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                Today
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 bg-amber-950/80 px-3.5 py-1.5 rounded-2xl border border-amber-500/30 text-xs text-amber-300">
            <div className="flex items-center gap-1">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>{panchang.sunrise}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Moon className="w-4 h-4 text-amber-200" />
              <span>{panchang.sunset}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Limb Grid (Panchang = 5 Limbs) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/20">
          <div className="text-[10px] uppercase text-amber-400/80 font-medium tracking-wider">Tithi</div>
          <div className="text-sm font-bold text-amber-100 mt-1">{panchang.tithi.name}</div>
          <div className="text-[10px] text-amber-300/60 mt-0.5">{panchang.tithi.paksha} Paksha</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/20">
          <div className="text-[10px] uppercase text-amber-400/80 font-medium tracking-wider">Vara (Weekday)</div>
          <div className="text-sm font-bold text-amber-100 mt-1">{panchang.vara.name}</div>
          <div className="text-[10px] text-amber-300/60 mt-0.5">Ruler: {panchang.vara.lord}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/20">
          <div className="text-[10px] uppercase text-amber-400/80 font-medium tracking-wider">Nakshatra</div>
          <div className="text-sm font-bold text-amber-100 mt-1">{panchang.nakshatra.name}</div>
          <div className="text-[10px] text-amber-300/60 mt-0.5">Ruler: {panchang.nakshatra.lord}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/20">
          <div className="text-[10px] uppercase text-amber-400/80 font-medium tracking-wider">Yoga</div>
          <div className="text-sm font-bold text-amber-100 mt-1">{panchang.yoga.name}</div>
          <div className="text-[10px] text-amber-300/60 mt-0.5">Auspicious Transit</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/20">
          <div className="text-[10px] uppercase text-amber-400/80 font-medium tracking-wider">Karana</div>
          <div className="text-sm font-bold text-amber-100 mt-1">{panchang.karana.name}</div>
          <div className="text-[10px] text-amber-300/60 mt-0.5">Ruler: {panchang.karana.lord}</div>
        </div>
      </div>

      {/* Muhurat & Rahu Kalam Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Abhijit Muhurat (Most Auspicious) */}
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Abhijit Muhurat (Best Time)
            </div>
            <div className="text-xs text-emerald-100/70">Ideal for new deals, travel & agreements.</div>
          </div>
          <div className="text-sm font-bold text-emerald-200 bg-emerald-900/60 px-3 py-1 rounded-xl border border-emerald-500/40">
            {panchang.abhijitMuhurat}
          </div>
        </div>

        {/* Rahu Kalam (Inauspicious Period) */}
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Rahu Kalam (Avoid Inceptions)
            </div>
            <div className="text-xs text-rose-100/70">Avoid signing contracts or commencing journeys.</div>
          </div>
          <div className="text-sm font-bold text-rose-200 bg-rose-900/60 px-3 py-1 rounded-xl border border-rose-500/40">
            {panchang.rahuKalam}
          </div>
        </div>
      </div>

      {/* Choghadiya Muhurat Bar */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-amber-300 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          Today's Daytime Choghadiya Timeline
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-[10px]">
          {(Array.isArray(panchang?.choghadiya)
            ? panchang.choghadiya
            : panchang?.choghadiya?.day || panchang?.dayChoghadiya || []
          ).map((ch: any, idx: number) => {
            const isGood = ["Amrit", "Shubh", "Labh"].includes(ch.nature || ch.type);
            const timeDisplay = ch.time || ch.timeRange || (ch.startTimeStr && ch.endTimeStr ? `${ch.startTimeStr} - ${ch.endTimeStr}` : "");
            return (
              <div
                key={idx}
                className={`p-2 rounded-xl text-center border ${
                  isGood
                    ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                    : "bg-rose-950/40 border-rose-500/40 text-rose-200"
                }`}
              >
                <div className="font-bold">{ch.name}</div>
                <div className="text-[9px] opacity-75 mt-0.5">{timeDisplay}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
