import React, { useState, useMemo } from "react";
import { CityLocation } from "../utils/vedicAstronomicalEngine";
import { ChoghadiyaDetail } from "../types";
import {
  Clock,
  Sun,
  Moon,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Calendar,
  MapPin,
  Flame,
  Zap,
  Filter
} from "lucide-react";

interface DedicatedChoghadiyaViewProps {
  panchangData: any;
  selectedCity?: CityLocation;
  selectedDate?: string;
}

export const DedicatedChoghadiyaView: React.FC<DedicatedChoghadiyaViewProps> = ({
  panchangData,
  selectedCity,
  selectedDate
}) => {
  const [activeFilter, setActiveFilter] = useState<"all" | "day" | "night">("all");
  const [auspiciousOnly, setAuspiciousOnly] = useState(false);

  const dayList: ChoghadiyaDetail[] = useMemo(() => {
    return panchangData?.choghadiya?.day || panchangData?.dayChoghadiya || [];
  }, [panchangData]);

  const nightList: ChoghadiyaDetail[] = useMemo(() => {
    return panchangData?.choghadiya?.night || panchangData?.nightChoghadiya || [];
  }, [panchangData]);

  const allChoghadiya = useMemo(() => {
    return [...dayList, ...nightList];
  }, [dayList, nightList]);

  // Find currently active Choghadiya
  const activeChoghadiya = useMemo(() => {
    return (
      allChoghadiya.find((c) => c.isActive) ||
      panchangData?.activeChoghadiya ||
      dayList[0]
    );
  }, [allChoghadiya, panchangData]);

  const filteredDay = useMemo(() => {
    if (!auspiciousOnly) return dayList;
    return dayList.filter((c) => c.type === "Shubh" || c.type === "Normal");
  }, [dayList, auspiciousOnly]);

  const filteredNight = useMemo(() => {
    if (!auspiciousOnly) return nightList;
    return nightList.filter((c) => c.type === "Shubh" || c.type === "Normal");
  }, [nightList, auspiciousOnly]);

  const getBadgeStyle = (type: string, nature: string) => {
    if (nature === "Amrit" || nature === "Shubh") {
      return "bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-200";
    }
    if (nature === "Labh") {
      return "bg-cyan-50 text-cyan-800 border-cyan-300 ring-1 ring-cyan-200";
    }
    if (nature === "Char") {
      return "bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-200";
    }
    if (nature === "Rog") {
      return "bg-rose-50 text-rose-800 border-rose-300 ring-1 ring-rose-200";
    }
    if (nature === "Kal") {
      return "bg-purple-50 text-purple-800 border-purple-300 ring-1 ring-purple-200";
    }
    // Udveg
    return "bg-orange-50 text-orange-800 border-orange-300 ring-1 ring-orange-200";
  };

  const getNatureDescription = (nature: string) => {
    switch (nature) {
      case "Amrit":
        return "Supreme Auspiciousness (सर्वोत्तम / अमृत). Best for all major deeds, purchases, rituals, and ceremonies.";
      case "Shubh":
        return "Auspicious & Holy (शुभ). Excellent for religious work, investments, weddings, and educational pursuits.";
      case "Labh":
        return "Material & Intellectual Gain (लाभ). Ideal for starting business, financial trading, signing contracts, and study.";
      case "Char":
        return "Dynamic Movement (चर / चंचल). Highly favorable for travel, journey, vehicle purchase, and shifting.";
      case "Rog":
        return "Diseased / Frictional (रोग). Avoid initiating medical treatments, auspicious ceremonies, or debts.";
      case "Kal":
        return "Loss & Obstruction (काल / शनि). Avoid key undertakings. Good only for destruction of evil or deep solitude.";
      case "Udveg":
        return "Anxiety & Tumult (उद्वेग / सूर्य). Avoid high-stakes discussions, government dealings, and legal matters.";
      default:
        return "Neutral traditional Choghadiya period.";
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-linear-to-r from-slate-900 via-amber-950 to-orange-950 text-white rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>Proportional 16-Choghadiya Vedic Time Division</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              Vedic Choghadiya Muhurta (चोघड़िया मुहूर्त)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Every day and night is divided into 8 equal planetary segments between local sunrise and sunset.
              Use Amrit, Shubh, and Labh for progressive endeavors, and Char for journeys.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-xs space-y-1.5 self-start md:self-auto min-w-[200px]">
            {selectedCity && (
              <div className="flex items-center gap-1.5 text-amber-200">
                <MapPin className="w-3.5 h-3.5" />
                <span className="font-semibold">{selectedCity.name}, {selectedCity.country}</span>
              </div>
            )}
            {selectedDate && (
              <div className="flex items-center gap-1.5 text-slate-200">
                <Calendar className="w-3.5 h-3.5" />
                <span>{selectedDate}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[11px] text-slate-300">
              <span>🌅 Sunrise: {panchangData?.sunrise || "06:15 AM"}</span>
              <span>🌇 Sunset: {panchangData?.sunset || "06:25 PM"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Active Choghadiya Hero Card */}
      {activeChoghadiya && (
        <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-3xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
                {activeChoghadiya.isDay ? <Sun className="w-6 h-6 text-slate-900" /> : <Moon className="w-6 h-6 text-slate-900" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Live Active Period ({activeChoghadiya.isDay ? "Day" : "Night"})
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white animate-pulse">
                    ACTIVE NOW
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mt-0.5">
                  {activeChoghadiya.name} ({activeChoghadiya.nature})
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {getNatureDescription(activeChoghadiya.nature)}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:items-end justify-center bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-amber-200/80">
              <span className="text-xs font-semibold text-slate-500">Duration Range</span>
              <span className="text-base font-bold text-slate-900 font-mono">
                {activeChoghadiya.timeRange || `${activeChoghadiya.startTimeStr} – ${activeChoghadiya.endTimeStr}`}
              </span>
              <span className="text-xs text-amber-800 mt-1 font-medium">
                Governing Graha: <span className="font-bold">{activeChoghadiya.lord}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Controls & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === "all"
                ? "bg-amber-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All 16 Periods
          </button>
          <button
            onClick={() => setActiveFilter("day")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFilter === "day"
                ? "bg-amber-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Day (दिन Choghadiya)</span>
          </button>
          <button
            onClick={() => setActiveFilter("night")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFilter === "night"
                ? "bg-amber-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Night (रात्रि Choghadiya)</span>
          </button>
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={auspiciousOnly}
            onChange={(e) => setAuspiciousOnly(e.target.checked)}
            className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
          />
          <span>Show Auspicious (शुभ/लाभ/अमृत/चर) Only</span>
        </label>
      </div>

      {/* 4. Day Choghadiya Table / Grid */}
      {(activeFilter === "all" || activeFilter === "day") && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900">
            <Sun className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-serif font-bold">
              Day Choghadiya (दिन का चोघड़िया) — Sunrise to Sunset
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredDay.map((item, idx) => {
              const badgeCls = getBadgeStyle(item.type, item.nature);
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all relative flex flex-col justify-between ${
                    item.isActive
                      ? "bg-amber-500/15 border-amber-500 ring-2 ring-amber-400/40 shadow-md"
                      : "bg-white border-slate-200 hover:border-amber-300 shadow-xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        #{idx + 1} Day
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badgeCls}`}>
                        {item.type}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <h4 className="text-xl font-serif font-bold text-slate-900">
                        {item.name}
                      </h4>
                      <span className="text-xs text-slate-500 font-medium">({item.nature})</span>
                    </div>

                    <p className="text-[11px] text-slate-600 mt-1.5 leading-snug">
                      {getNatureDescription(item.nature)}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-slate-800">
                      {item.timeRange || `${item.startTimeStr} – ${item.endTimeStr}`}
                    </span>
                    <span className="text-[11px] text-amber-800 font-medium">
                      Lord: {item.lord}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Night Choghadiya Table / Grid */}
      {(activeFilter === "all" || activeFilter === "night") && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-slate-900">
            <Moon className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-serif font-bold">
              Night Choghadiya (रात्रि का चोघड़िया) — Sunset to Next Sunrise
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredNight.map((item, idx) => {
              const badgeCls = getBadgeStyle(item.type, item.nature);
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all relative flex flex-col justify-between ${
                    item.isActive
                      ? "bg-indigo-500/15 border-indigo-500 ring-2 ring-indigo-400/40 shadow-md"
                      : "bg-white border-slate-200 hover:border-indigo-300 shadow-xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        #{idx + 1} Night
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badgeCls}`}>
                        {item.type}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <h4 className="text-xl font-serif font-bold text-slate-900">
                        {item.name}
                      </h4>
                      <span className="text-xs text-slate-500 font-medium">({item.nature})</span>
                    </div>

                    <p className="text-[11px] text-slate-600 mt-1.5 leading-snug">
                      {getNatureDescription(item.nature)}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-slate-800">
                      {item.timeRange || `${item.startTimeStr} – ${item.endTimeStr}`}
                    </span>
                    <span className="text-[11px] text-indigo-800 font-medium">
                      Lord: {item.lord}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Shastric Reference Legend Card */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
          <Info className="w-4 h-4 text-amber-700" />
          <span>Shastric Choghadiya Classification Legend (चोघड़िया फल निर्देश)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-white border border-emerald-200">
            <span className="font-bold text-emerald-800 block">अमृत (Amrit) - Nectar</span>
            <span className="text-slate-600 text-[11px]">Best for all auspicious works, agreements, and spiritual life.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-emerald-200">
            <span className="font-bold text-emerald-800 block">शुभ (Shubh) - Auspicious</span>
            <span className="text-slate-600 text-[11px]">Excellent for worship, education, purchases, and marriages.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-cyan-200">
            <span className="font-bold text-cyan-800 block">लाभ (Labh) - Gain</span>
            <span className="text-slate-600 text-[11px]">Best for financial ventures, career deals, and store openings.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-amber-200">
            <span className="font-bold text-amber-800 block">चर (Char) - Variable</span>
            <span className="text-slate-600 text-[11px]">Favorable for travel, transportation, and dynamic endeavors.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-rose-200">
            <span className="font-bold text-rose-800 block">रोग (Rog) - Inauspicious</span>
            <span className="text-slate-600 text-[11px]">Avoid treatments, new undertakings, or financial loans.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-purple-200">
            <span className="font-bold text-purple-800 block">काल (Kal) - Malefic</span>
            <span className="text-slate-600 text-[11px]">Ruled by Saturn. Delay auspicious beginnings during this time.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-orange-200">
            <span className="font-bold text-orange-800 block">उद्वेग (Udveg) - Anxiety</span>
            <span className="text-slate-600 text-[11px]">Ruled by Sun. Avoid high-stress confrontation or litigation.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-slate-200">
            <span className="font-bold text-slate-800 block">Proportional Ghati</span>
            <span className="text-slate-600 text-[11px]">Each Choghadiya equals 3.75 Ghatis (~90 minutes astronomical).</span>
          </div>
        </div>
      </div>
    </div>
  );
};
