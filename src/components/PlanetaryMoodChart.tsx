import React, { useState, useMemo } from "react";
import { PlanetPosition } from "../types";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Legend
} from "recharts";
import { 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  Compass, 
  Zap, 
  Award, 
  Info, 
  CheckCircle2, 
  AlertCircle,
  Sun,
  Moon,
  ShieldCheck,
  Briefcase,
  Coins,
  Heart,
  Sliders
} from "lucide-react";

interface PlanetaryMoodChartProps {
  userName: string;
  lagna: string;
  rashi: string;
  sunSign: string;
  planets: PlanetPosition[];
}

export interface DayMoodData {
  dayIndex: number;
  dateStr: string;
  dateLabel: string;
  fullDate: string;
  composite: number;
  jupiter: number;
  sun: number;
  venus: number;
  mars: number;
  moon: number;
  transitHighlight: string;
  recommendedAction: string;
  favorableCategory: "Career" | "Finance" | "Relationships" | "Health" | "Spiritual";
}

export const PlanetaryMoodChart: React.FC<PlanetaryMoodChartProps> = ({
  userName,
  lagna,
  rashi,
  sunSign,
  planets
}) => {
  // Planet visibility toggles
  const [activePlanets, setActivePlanets] = useState<{
    composite: boolean;
    jupiter: boolean;
    sun: boolean;
    venus: boolean;
    mars: boolean;
    moon: boolean;
  }>({
    composite: true,
    jupiter: true,
    sun: false,
    venus: true,
    mars: false,
    moon: true
  });

  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

  // Generate 30-day planetary mood data based on natal placements
  const moodData: DayMoodData[] = useMemo(() => {
    const today = new Date();
    const data: DayMoodData[] = [];

    // Seed hash based on natal placements for reproducible uniqueness
    const rashiHash = (rashi || "Taurus").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const lagnaHash = (lagna || "Aries").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const sunHash = (sunSign || "Leo").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const seed = rashiHash + lagnaHash * 3 + sunHash * 7;

    const transitHighlightsList = [
      `Moon transits natal 5th house trine — heightened intuition & financial clarity.`,
      `Jupiter bestows 9th aspect on natal Lagna lord — excellent for major proposals.`,
      `Venus enters friendly nakshatra — creative flow and relationship harmony peak.`,
      `Sun-Mars alignment energizes career 10th house — high leadership momentum.`,
      `Chandra-Guru Gajakesari Yoga transit effect — auspicious for deals & expansion.`,
      `Moon in exaltation sign — emotional stability & sharp decision making.`,
      `Mercury direct transit clears communication hurdles & technical tasks.`,
      `Subtle Saturn 3rd house aspect — steady discipline & perseverance rewarded.`,
      `Sun in 11th house of gains — sudden recognition & financial inflow possible.`,
      `Venus-Jupiter mutual aspect — luxury, comfort & peaceful family vibes.`
    ];

    const actionsList = [
      "Ideal day for contract signings, investments & wealth planning.",
      "Execute important career presentations or pitch key business ideas.",
      "Engage in spiritual practice, mantra chanting & inner reflection.",
      "Focus on creative pursuits, artistic projects & family harmony.",
      "Take bold initiative in long-pending projects; physical energy is high.",
      "Perform acts of charity or fast on this lunar tithi for lasting peace.",
      "Ideal for travel, networking and expanding your professional circle.",
      "Maintain calm during meetings; focus on strategic planning over haste."
    ];

    const categories: ("Career" | "Finance" | "Relationships" | "Health" | "Spiritual")[] = [
      "Finance", "Career", "Relationships", "Career", "Spiritual", "Finance", "Health"
    ];

    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const dateLabel = currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const fullDate = currentDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });

      // Harmonic sine waves based on astronomical periods modulated by natal seed
      const moonAngle = ((i + (seed % 10)) / 27.3) * 2 * Math.PI;
      const jupiterAngle = ((i + (seed % 15)) / 120) * 2 * Math.PI;
      const sunAngle = ((i + (seed % 7)) / 30) * 2 * Math.PI;
      const venusAngle = ((i + (seed % 12)) / 22) * 2 * Math.PI;
      const marsAngle = ((i + (seed % 9)) / 45) * 2 * Math.PI;

      // Base planetary energy calculation (scaled 40% - 98%)
      const moonScore = Math.round(65 + Math.sin(moonAngle) * 25 + Math.cos(moonAngle * 2) * 8);
      const jupiterScore = Math.round(75 + Math.sin(jupiterAngle) * 15 + Math.cos(i * 0.2) * 5);
      const sunScore = Math.round(68 + Math.cos(sunAngle) * 22 + Math.sin(i * 0.15) * 6);
      const venusScore = Math.round(70 + Math.sin(venusAngle) * 20 + Math.cos(i * 0.25) * 7);
      const marsScore = Math.round(62 + Math.cos(marsAngle) * 24 + Math.sin(i * 0.18) * 8);

      // Bound scores between 35 and 98
      const clamp = (v: number) => Math.min(98, Math.max(38, v));

      const mSc = clamp(moonScore);
      const jSc = clamp(jupiterScore);
      const sSc = clamp(sunScore);
      const vSc = clamp(venusScore);
      const maSc = clamp(marsScore);

      // Weighted Composite Mood Index
      const composite = Math.round(jSc * 0.28 + mSc * 0.24 + sSc * 0.20 + vSc * 0.15 + maSc * 0.13);

      const highlight = transitHighlightsList[(i + seed) % transitHighlightsList.length];
      const action = actionsList[(i + seed * 2) % actionsList.length];
      const category = categories[(i + seed) % categories.length];

      data.push({
        dayIndex: i + 1,
        dateStr: currentDate.toISOString().split("T")[0],
        dateLabel,
        fullDate,
        composite,
        jupiter: jSc,
        sun: sSc,
        venus: vSc,
        mars: maSc,
        moon: mSc,
        transitHighlight: highlight,
        recommendedAction: action,
        favorableCategory: category
      });
    }

    return data;
  }, [lagna, rashi, sunSign]);

  // Summary Metrics
  const stats = useMemo(() => {
    let maxDay = moodData[0];
    let totalComp = 0;

    moodData.forEach((d) => {
      totalComp += d.composite;
      if (d.composite > maxDay.composite) {
        maxDay = d;
      }
    });

    const avgMood = Math.round(totalComp / moodData.length);
    const topDays = [...moodData].sort((a, b) => b.composite - a.composite).slice(0, 3);

    return {
      maxDay,
      avgMood,
      topDays
    };
  }, [moodData]);

  const togglePlanet = (key: keyof typeof activePlanets) => {
    setActivePlanets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedDayData = selectedDayIndex !== null 
    ? moodData[selectedDayIndex] 
    : stats.maxDay;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm space-y-6">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
            30-Day Natal Transit Resonance
          </div>
          <h3 className="font-serif text-2xl font-bold text-slate-900">
            Planetary Mood & Cosmic Energy Forecast
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Dynamic 30-day forecast computed for <span className="text-amber-900 font-bold">{userName}</span> based on <span className="text-amber-800 font-semibold">{lagna || "Aries"} Lagna</span> & <span className="text-amber-800 font-semibold">{rashi || "Taurus"} Moon Sign</span> transits.
          </p>
        </div>

        {/* QUICK STAT BADGES */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="bg-amber-50 border border-amber-200/80 p-3 rounded-2xl text-left">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">30-Day Avg Energy</span>
            <span className="font-serif text-lg font-bold text-amber-900">{stats.avgMood}%</span>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-left">
            <span className="text-[10px] uppercase font-bold text-emerald-600 block">Peak Cosmic Day</span>
            <span className="font-serif text-lg font-bold text-emerald-800">
              {stats.maxDay.dateLabel} ({stats.maxDay.composite}%)
            </span>
          </div>
        </div>
      </div>

      {/* PLANET TOGGLE FILTER CONTROLS */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-xs">
        <span className="font-bold text-slate-700 flex items-center gap-1.5 shrink-0">
          <Sliders className="w-4 h-4 text-amber-700" />
          Filter Planet Mood Waves:
        </span>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { key: "composite" as const, name: "Composite Mood", color: "#b45309", bgActive: "bg-amber-700 text-white" },
            { key: "jupiter" as const, name: "Jupiter (Guru / Wealth)", color: "#d97706", bgActive: "bg-amber-600 text-white" },
            { key: "sun" as const, name: "Sun (Surya / Vitality)", color: "#ea580c", bgActive: "bg-orange-600 text-white" },
            { key: "venus" as const, name: "Venus (Shukra / Harmony)", color: "#ec4899", bgActive: "bg-pink-600 text-white" },
            { key: "mars" as const, name: "Mars (Mangal / Power)", color: "#dc2626", bgActive: "bg-red-600 text-white" },
            { key: "moon" as const, name: "Moon (Chandra / Mind)", color: "#6366f1", bgActive: "bg-indigo-600 text-white" }
          ].map((item) => {
            const isActive = activePlanets[item.key];
            return (
              <button
                key={item.key}
                onClick={() => togglePlanet(item.key)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 border ${
                  isActive
                    ? `${item.bgActive} border-transparent shadow-xs`
                    : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: isActive ? "#ffffff" : item.color }}
                />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RECHARTS LINE CHART */}
      <div className="w-full h-80 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={moodData}
            margin={{ top: 15, right: 15, left: -20, bottom: 5 }}
            onClick={(e) => {
              if (e && e.activeTooltipIndex !== undefined) {
                setSelectedDayIndex(Number(e.activeTooltipIndex));
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="dateLabel"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              domain={[30, 100]}
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              unit="%"
            />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data: DayMoodData = payload[0].payload;
                  return (
                    <div className="bg-slate-950/95 border border-amber-500/40 text-amber-100 p-4 rounded-2xl shadow-2xl backdrop-blur-md max-w-xs space-y-2 text-xs">
                      <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                        <span className="font-serif font-bold text-amber-300 text-sm">{data.fullDate}</span>
                        <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-bold text-[10px]">
                          {data.composite}% Score
                        </span>
                      </div>

                      <p className="text-slate-200 text-[11px] leading-snug font-serif">
                        <span className="text-amber-400 font-semibold">Transit: </span>
                        {data.transitHighlight}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                        {activePlanets.composite && (
                          <div className="flex justify-between font-bold text-amber-300">
                            <span>Composite Mood:</span>
                            <span>{data.composite}%</span>
                          </div>
                        )}
                        {activePlanets.jupiter && (
                          <div className="flex justify-between text-amber-400">
                            <span>Jupiter (Guru):</span>
                            <span>{data.jupiter}%</span>
                          </div>
                        )}
                        {activePlanets.sun && (
                          <div className="flex justify-between text-orange-400">
                            <span>Sun (Surya):</span>
                            <span>{data.sun}%</span>
                          </div>
                        )}
                        {activePlanets.venus && (
                          <div className="flex justify-between text-pink-400">
                            <span>Venus (Shukra):</span>
                            <span>{data.venus}%</span>
                          </div>
                        )}
                        {activePlanets.mars && (
                          <div className="flex justify-between text-red-400">
                            <span>Mars (Mangal):</span>
                            <span>{data.mars}%</span>
                          </div>
                        )}
                        {activePlanets.moon && (
                          <div className="flex justify-between text-indigo-300">
                            <span>Moon (Chandra):</span>
                            <span>{data.moon}%</span>
                          </div>
                        )}
                      </div>

                      <div className="border-t border-amber-500/20 pt-2 text-[10px] text-emerald-300 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{data.recommendedAction}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <ReferenceLine
              y={75}
              stroke="#10b981"
              strokeDasharray="4 4"
              label={{ value: "High Auspicious Window (75%+)", fill: "#059669", fontSize: 10, position: "insideTopRight" }}
            />
            <ReferenceLine
              y={50}
              stroke="#cbd5e1"
              strokeDasharray="2 2"
              label={{ value: "Neutral Baseline", fill: "#94a3b8", fontSize: 10, position: "insideBottomRight" }}
            />

            {/* PLANET LINES */}
            {activePlanets.composite && (
              <Line
                type="monotone"
                dataKey="composite"
                name="Composite Cosmic Score"
                stroke="#b45309"
                strokeWidth={3.5}
                dot={{ r: 3.5, fill: "#b45309", strokeWidth: 2, stroke: "#ffffff" }}
                activeDot={{ r: 7, fill: "#f59e0b", stroke: "#78350f", strokeWidth: 2 }}
              />
            )}

            {activePlanets.jupiter && (
              <Line
                type="monotone"
                dataKey="jupiter"
                name="Jupiter (Guru)"
                stroke="#d97706"
                strokeWidth={2}
                dot={false}
              />
            )}

            {activePlanets.sun && (
              <Line
                type="monotone"
                dataKey="sun"
                name="Sun (Surya)"
                stroke="#ea580c"
                strokeWidth={2}
                dot={false}
              />
            )}

            {activePlanets.venus && (
              <Line
                type="monotone"
                dataKey="venus"
                name="Venus (Shukra)"
                stroke="#ec4899"
                strokeWidth={2}
                dot={false}
              />
            )}

            {activePlanets.mars && (
              <Line
                type="monotone"
                dataKey="mars"
                name="Mars (Mangal)"
                stroke="#dc2626"
                strokeWidth={2}
                dot={false}
              />
            )}

            {activePlanets.moon && (
              <Line
                type="monotone"
                dataKey="moon"
                name="Moon (Chandra)"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* SELECTED DAY / TOP WINDOW INSIGHT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* SELECTED DAY DETAIL CARD */}
        <div className="md:col-span-2 bg-gradient-to-br from-[#1B1714] to-[#110E0C] text-amber-100 p-6 rounded-3xl border border-amber-500/30 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Astrological Spotlight: {selectedDayData.fullDate}</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs">
              {selectedDayData.composite}% Cosmic Rating
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="font-serif text-lg font-bold text-amber-100">
              {selectedDayData.transitHighlight}
            </h4>
            <p className="text-xs text-amber-200/80 leading-relaxed font-serif">
              For your <span className="text-amber-300 font-bold">{lagna || "Aries"} Lagna</span> and <span className="text-amber-300 font-bold">{rashi || "Taurus"} Moon Sign</span>, this day activates high <span className="text-amber-300 font-bold">{selectedDayData.favorableCategory}</span> vibration with {selectedDayData.jupiter}% Jupiter prosperity support and {selectedDayData.moon}% Moon emotional stability.
            </p>
          </div>

          <div className="p-3 bg-amber-950/60 rounded-2xl border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-100">Recommended Daily Focus: </span>
              <span>{selectedDayData.recommendedAction}</span>
            </div>
          </div>
        </div>

        {/* TOP 3 AUSPICIOUS DAYS SUMMARY */}
        <div className="bg-amber-50/70 p-5 rounded-3xl border border-amber-900/15 space-y-3">
          <div className="font-serif font-bold text-slate-900 text-sm flex items-center justify-between border-b border-amber-900/10 pb-2">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
              Top 3 Auspicious Dates
            </span>
            <span className="text-[10px] text-amber-900 font-semibold uppercase">30-Day Outlook</span>
          </div>

          <div className="space-y-2 text-xs">
            {stats.topDays.map((top, idx) => (
              <button
                key={top.dayIndex}
                onClick={() => setSelectedDayIndex(top.dayIndex - 1)}
                className="w-full p-2.5 rounded-2xl bg-white border border-amber-900/10 hover:border-amber-600 transition-all flex items-center justify-between text-left group"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] flex items-center justify-center shrink-0">
                      #{idx + 1}
                    </span>
                    <span>{top.dateLabel}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 truncate max-w-[140px]">{top.favorableCategory} Peak</p>
                </div>

                <div className="text-right">
                  <span className="font-serif font-bold text-amber-800 text-sm group-hover:text-amber-600">
                    {top.composite}%
                  </span>
                  <span className="text-[9px] text-emerald-600 font-bold block">Auspicious</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
