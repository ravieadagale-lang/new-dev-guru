import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from "recharts";
import { UserProfile } from "../types";
import {
  GLOBAL_CITIES,
  CityLocation,
  getAccurateLocationPanchang,
  calculateExactPlanetaryPositions,
  calculateTarabalamAndChandrabalam
} from "../utils/vedicAstronomicalEngine";
import {
  TrendingUp,
  Sparkles,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Crown,
  ChevronRight,
  Flame,
  ShieldAlert,
  Zap,
  Info,
  Award,
  Globe,
  Coins,
  Heart,
  Activity,
  ArrowRight
} from "lucide-react";

interface RashiTransitPositivityChartProps {
  userProfile?: UserProfile;
  selectedCity?: CityLocation;
  onSelectDate?: (dateStr: string) => void;
}

const ALL_RASHIS = [
  { en: "Aries", hi: "मेष", element: "Fire", lord: "Mars" },
  { en: "Taurus", hi: "वृषभ", element: "Earth", lord: "Venus" },
  { en: "Gemini", hi: "मिथुन", element: "Air", lord: "Mercury" },
  { en: "Cancer", hi: "कर्क", element: "Water", lord: "Moon" },
  { en: "Leo", hi: "सिंह", element: "Fire", lord: "Sun" },
  { en: "Virgo", hi: "कन्या", element: "Earth", lord: "Mercury" },
  { en: "Libra", hi: "तुला", element: "Air", lord: "Venus" },
  { en: "Scorpio", hi: "वृश्चिक", element: "Water", lord: "Mars" },
  { en: "Sagittarius", hi: "धनु", element: "Fire", lord: "Jupiter" },
  { en: "Capricorn", hi: "मकर", element: "Earth", lord: "Saturn" },
  { en: "Aquarius", hi: "कुंभ", element: "Air", lord: "Saturn" },
  { en: "Pisces", hi: "मीन", element: "Water", lord: "Jupiter" }
];

interface DayProjectionData {
  dateStr: string;
  formattedDate: string;
  dayShort: string;
  overallPositivity: number;
  wealthPositivity: number;
  healthPositivity: number;
  harmonyPositivity: number;
  tithi: string;
  nakshatra: string;
  moonSign: string;
  moonHouseFromRashi: number;
  chandrabalamQuality: string;
  tarabalamQuality: string;
  sunSign: string;
  beneficCount: number;
  statusText: string;
  statusColor: string;
  remedySuggestion: string;
}

export const RashiTransitPositivityChart: React.FC<RashiTransitPositivityChartProps> = ({
  userProfile,
  selectedCity = GLOBAL_CITIES[0],
  onSelectDate
}) => {
  const initialRashi = userProfile?.rashi || "Taurus";
  const [selectedRashi, setSelectedRashi] = useState<string>(initialRashi);
  const [selectedCategory, setSelectedCategory] = useState<"overall" | "wealth" | "health" | "harmony">("overall");
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  // Generate 30-day projection dataset
  const projectionData: DayProjectionData[] = useMemo(() => {
    const data: DayProjectionData[] = [];
    const today = new Date();

    const userNakshatra = userProfile?.nakshatra || "Rohini";

    // Find Rashi index (0-indexed: Aries=0, Taurus=1, etc.)
    const rashiIdx = ALL_RASHIS.findIndex(
      r => r.en.toLowerCase() === selectedRashi.toLowerCase() || r.hi === selectedRashi
    );
    const validRashiIdx = rashiIdx >= 0 ? rashiIdx : 1; // Default Taurus if not found

    for (let i = 0; i < 30; i++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + i);

      const dateStr = targetDate.toISOString().split("T")[0];
      const dayShort = targetDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const formattedDate = targetDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });

      const panchang = getAccurateLocationPanchang(dateStr, selectedCity);
      const planets = calculateExactPlanetaryPositions(dateStr, "12:00", selectedCity.name);

      // Moon Sign index
      const moonSignIdx = ALL_RASHIS.findIndex(
        r => r.en.toLowerCase() === panchang.moonSign.toLowerCase()
      );
      const validMoonSignIdx = moonSignIdx >= 0 ? moonSignIdx : 0;

      // Calculate Moon House from user's Rashi (1 to 12)
      let moonHouseFromRashi = ((validMoonSignIdx - validRashiIdx + 12) % 12) + 1;

      // Chandrabalam Scoring (House transits relative to Moon Rashi)
      // 1, 3, 6, 7, 10, 11 are very favorable.
      // 2, 5, 9 are moderate.
      // 4, 8, 12 are Ashtama / Kantaka Chandra (lower score).
      let baseChandraScore = 50;
      let chandraQuality = "Neutral";
      if ([1, 3, 6, 7, 10, 11].includes(moonHouseFromRashi)) {
        baseChandraScore = 88 + (moonHouseFromRashi === 11 ? 10 : moonHouseFromRashi === 3 ? 8 : 5);
        chandraQuality = "Auspicious Chandrabalam";
      } else if ([2, 5, 9].includes(moonHouseFromRashi)) {
        baseChandraScore = 70;
        chandraQuality = "Moderate Chandrabalam";
      } else {
        baseChandraScore = 38 + (moonHouseFromRashi === 8 ? -8 : 0); // 8th house Ashtama Chandra is lowest
        chandraQuality = "Inauspicious Chandrabalam (Ashtama/Kantaka)";
      }

      // Tarabalam
      const taraResult = calculateTarabalamAndChandrabalam(
        userNakshatra,
        selectedRashi,
        panchang.nakshatra,
        panchang.moonSign
      );

      // Planetary Benefic Transits (Sun, Jupiter, Venus, Mercury)
      let beneficCount = 0;
      planets.planets.forEach(p => {
        const pSignIdx = ALL_RASHIS.findIndex(r => r.en.toLowerCase() === p.sign.toLowerCase());
        const houseFromRashi = ((pSignIdx - validRashiIdx + 12) % 12) + 1;

        if (p.name === "Jupiter" && [1, 2, 5, 7, 9, 11].includes(houseFromRashi)) beneficCount++;
        if (p.name === "Venus" && [1, 2, 3, 4, 5, 8, 9, 11, 12].includes(houseFromRashi)) beneficCount++;
        if (p.name === "Sun" && [3, 6, 10, 11].includes(houseFromRashi)) beneficCount++;
        if (p.name === "Mercury" && [2, 4, 6, 8, 10, 11].includes(houseFromRashi)) beneficCount++;
      });

      const taraScoreBonus = taraResult.taraQuality === "Auspicious" ? 12 : taraResult.taraQuality === "Neutral" ? 0 : -10;
      const planetBonus = beneficCount * 4;

      // Calculate Category Scores
      const overallPositivity = Math.min(98, Math.max(25, Math.round(baseChandraScore * 0.5 + taraResult.overallScore * 0.35 + planetBonus + taraScoreBonus * 0.5)));
      const wealthPositivity = Math.min(99, Math.max(20, Math.round(overallPositivity * 0.8 + ([2, 11, 5, 9].includes(moonHouseFromRashi) ? 18 : -5))));
      const healthPositivity = Math.min(98, Math.max(30, Math.round(overallPositivity * 0.8 + ([1, 6, 11].includes(moonHouseFromRashi) ? 15 : -8))));
      const harmonyPositivity = Math.min(98, Math.max(25, Math.round(overallPositivity * 0.85 + ([5, 7, 9, 3].includes(moonHouseFromRashi) ? 12 : -6))));

      let statusText = "Favorable Phase";
      let statusColor = "text-emerald-400 bg-emerald-500/20";
      let remedySuggestion = "Offer water to Sun during morning sunrise.";

      if (overallPositivity >= 80) {
        statusText = "Peak Auspicious (उच्च शुभ योग)";
        statusColor = "text-emerald-400 bg-emerald-500/20 border-emerald-500/40";
        remedySuggestion = "Excellent day for major deals, investments, or starting new ventures.";
      } else if (overallPositivity >= 60) {
        statusText = "Moderate Favorable (सामान्य लाभ)";
        statusColor = "text-amber-300 bg-amber-500/20 border-amber-500/40";
        remedySuggestion = "Perform routine tasks with focus. Chant 'Om Namah Shivaya' 21 times.";
      } else {
        statusText = "Low Transit Energy / Caution (सावधानी दिवस)";
        statusColor = "text-rose-400 bg-rose-500/20 border-rose-500/40";
        remedySuggestion = "Avoid risky financial decisions or disputes. Perform raw milk Abhisheka or offer Shami leaves.";
      }

      data.push({
        dateStr,
        formattedDate,
        dayShort,
        overallPositivity,
        wealthPositivity,
        healthPositivity,
        harmonyPositivity,
        tithi: panchang.tithi,
        nakshatra: panchang.nakshatra,
        moonSign: panchang.moonSign,
        moonHouseFromRashi,
        chandrabalamQuality: chandraQuality,
        tarabalamQuality: taraResult.taraQuality,
        sunSign: panchang.sunSign,
        beneficCount,
        statusText,
        statusColor,
        remedySuggestion
      });
    }

    return data;
  }, [selectedRashi, selectedCity, userProfile]);

  const selectedDayData = projectionData[selectedDayIndex] || projectionData[0];

  // Top 3 Peak Days
  const peakDays = useMemo(() => {
    return [...projectionData]
      .sort((a, b) => b.overallPositivity - a.overallPositivity)
      .slice(0, 3);
  }, [projectionData]);

  // Low / Caution Days (< 50)
  const cautionDays = useMemo(() => {
    return projectionData.filter(d => d.overallPositivity < 55);
  }, [projectionData]);

  // Average 30-Day Score
  const avg30DayScore = useMemo(() => {
    const sum = projectionData.reduce((acc, d) => acc + d.overallPositivity, 0);
    return Math.round(sum / projectionData.length);
  }, [projectionData]);

  const activeRashiMeta = ALL_RASHIS.find(
    r => r.en.toLowerCase() === selectedRashi.toLowerCase()
  ) || ALL_RASHIS[0];

  const getActiveMetricKey = () => {
    switch (selectedCategory) {
      case "wealth": return "wealthPositivity";
      case "health": return "healthPositivity";
      case "harmony": return "harmonyPositivity";
      default: return "overallPositivity";
    }
  };

  const activeMetricKey = getActiveMetricKey();

  return (
    <div className="bg-gradient-to-br from-[#1A1612] via-[#241E18] to-[#14100D] text-amber-100 rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-8 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-amber-500/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-widest mb-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            30-Day Planetary Transit Positivity Forecast
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 flex items-center gap-2">
            <span>{activeRashiMeta.hi} ({activeRashiMeta.en}) Transit Projection Chart</span>
          </h2>
          <p className="text-xs text-amber-200/70 mt-1 font-serif max-w-3xl">
            Real-time 30-day projection calculated using Chandrabalam, Tarabalam & Sidereal Planetary Transits for {activeRashiMeta.en} ({selectedCity.name}).
          </p>
        </div>

        {/* RASHI SELECTOR GRID / DROPDOWN */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-xs font-bold text-amber-300 mr-1">Select Rashi:</div>
          <select
            value={selectedRashi}
            onChange={(e) => {
              setSelectedRashi(e.target.value);
              setSelectedDayIndex(0);
            }}
            className="px-4 py-2 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-200 text-xs font-bold font-serif focus:outline-none focus:border-amber-400 cursor-pointer shadow-lg"
          >
            {ALL_RASHIS.map((r) => (
              <option key={r.en} value={r.en}>
                {r.hi} ({r.en}) - Lord: {r.lord}
              </option>
            ))}
          </select>

          {/* 30-Day Average Score Badge */}
          <div className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>30-Day Avg: <strong className="text-amber-200 text-sm">{avg30DayScore}%</strong></span>
          </div>
        </div>
      </div>

      {/* CATEGORY METRIC TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-amber-900/30 pb-3">
        {[
          { id: "overall", label: "🌟 Overall Cosmic Positivity", icon: Sparkles },
          { id: "wealth", label: "💰 Wealth & Business Transit", icon: Coins },
          { id: "health", label: "🧠 Mind & Energy Health", icon: Activity },
          { id: "harmony", label: "❤️ Love & Family Harmony", icon: Heart },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                isActive
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg scale-105"
                  : "bg-slate-950/80 text-amber-200 border-slate-800 hover:border-amber-500/40"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* RECHARTS AREA CHART COMPONENT */}
      <div className="bg-[#120F0D] p-4 sm:p-6 rounded-3xl border border-amber-500/30 space-y-4 shadow-2xl relative">
        <div className="flex items-center justify-between text-xs text-amber-300 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
            <span>High Auspicious (≥70%)</span>
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block ml-2" />
            <span>Moderate (50%-69%)</span>
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block ml-2" />
            <span>Caution (&lt;50%)</span>
          </div>

          <span className="hidden sm:inline-block">Click any point to view day analysis</span>
        </div>

        <div className="w-full h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={projectionData}
              margin={{ top: 20, right: 20, left: -20, bottom: 20 }}
              onClick={(state) => {
                if (state && state.activeTooltipIndex !== undefined) {
                  const idx = Number(state.activeTooltipIndex);
                  setSelectedDayIndex(idx);
                  if (onSelectDate && projectionData[idx]) {
                    onSelectDate(projectionData[idx].dateStr);
                  }
                }
              }}
            >
              <defs>
                <linearGradient id="transitColorGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D241E" />
              <XAxis
                dataKey="dayShort"
                stroke="#A38E7E"
                fontSize={11}
                tickLine={false}
                interval={2}
              />
              <YAxis
                stroke="#A38E7E"
                fontSize={11}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                unit="%"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const dataPoint: DayProjectionData = payload[0].payload;
                    return (
                      <div className="bg-slate-950/95 border border-amber-500/60 p-4 rounded-2xl shadow-2xl text-amber-100 max-w-xs space-y-2 text-xs">
                        <div className="font-serif font-bold text-amber-300 border-b border-amber-900/50 pb-1 flex items-center justify-between">
                          <span>{dataPoint.formattedDate}</span>
                          <span className="font-mono text-amber-400">{dataPoint[activeMetricKey]}%</span>
                        </div>
                        <div className="space-y-1">
                          <div>Tithi: <strong>{dataPoint.tithi}</strong></div>
                          <div>Moon Sign: <strong>{dataPoint.moonSign}</strong> ({dataPoint.moonHouseFromRashi}th House)</div>
                          <div>Chandrabalam: <strong className="text-amber-200">{dataPoint.chandrabalamQuality}</strong></div>
                          <div>Status: <span className="text-emerald-400 font-bold">{dataPoint.statusText}</span></div>
                        </div>
                        <div className="text-[10px] text-amber-300/80 italic border-t border-amber-900/50 pt-1">
                          👉 Click point to inspect full remedy breakdown
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine y={70} stroke="#34D399" strokeDasharray="4 4" label={{ value: "Auspicious 70%", fill: "#34D399", fontSize: 10, position: "insideTopRight" }} />
              <ReferenceLine y={50} stroke="#F59E0B" strokeDasharray="4 4" label={{ value: "Neutral 50%", fill: "#F59E0B", fontSize: 10, position: "insideTopRight" }} />
              <Area
                type="monotone"
                dataKey={activeMetricKey}
                stroke="#F59E0B"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#transitColorGlow)"
                dot={(props: any) => {
                  const { cx, cy, index, payload } = props;
                  const isSelected = index === selectedDayIndex;
                  const val = payload[activeMetricKey];
                  const dotColor = val >= 70 ? "#34D399" : val >= 50 ? "#F59E0B" : "#F43F5E";
                  return (
                    <circle
                      key={index}
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 7 : 4}
                      fill={dotColor}
                      stroke={isSelected ? "#FFFFFF" : "#120F0D"}
                      strokeWidth={isSelected ? 3 : 1.5}
                      className="cursor-pointer hover:scale-125 transition-all"
                    />
                  );
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* HIGHLIGHT SUMMARY CARDS: PEAK DAYS & CAUTION DAYS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PEAK AUSPICIOUS DAYS */}
        <div className="bg-emerald-950/30 p-5 rounded-2xl border border-emerald-500/30 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Top 3 Peak Auspicious Transit Days (श्रेष्ठ मुहूर्त तिथि):</span>
            </div>
          </div>

          <div className="space-y-2">
            {peakDays.map((day, idx) => (
              <div
                key={day.dateStr}
                onClick={() => {
                  const idxInFull = projectionData.findIndex(d => d.dateStr === day.dateStr);
                  if (idxInFull >= 0) setSelectedDayIndex(idxInFull);
                }}
                className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-serif font-bold text-emerald-200">
                    #{idx + 1} {day.formattedDate}
                  </div>
                  <div className="text-[11px] text-emerald-300/80">
                    {day.tithi} • Moon in {day.moonSign} ({day.moonHouseFromRashi}th House)
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs border border-emerald-500/40">
                  {day.overallPositivity}% Score
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CAUTION / LOW TRANSIT DAYS */}
        <div className="bg-rose-950/30 p-5 rounded-2xl border border-rose-500/30 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-rose-300">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Caution & Dip Days ({cautionDays.length} Days Detected):</span>
            </div>
          </div>

          {cautionDays.length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-amber-200/80 text-center font-serif">
              ✨ Excellent planetary transits! No major dip days detected in the upcoming 30 days for {selectedRashi}.
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
              {cautionDays.slice(0, 3).map((day) => (
                <div
                  key={day.dateStr}
                  onClick={() => {
                    const idxInFull = projectionData.findIndex(d => d.dateStr === day.dateStr);
                    if (idxInFull >= 0) setSelectedDayIndex(idxInFull);
                  }}
                  className="p-3 rounded-xl bg-slate-950/80 border border-rose-500/30 hover:border-rose-400 transition-all cursor-pointer flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-serif font-bold text-rose-200">
                      ⚠️ {day.formattedDate}
                    </div>
                    <div className="text-[11px] text-rose-300/80 line-clamp-1">
                      Remedy: {day.remedySuggestion}
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold text-xs border border-rose-500/40">
                    {day.overallPositivity}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SELECTED DAY TRANSIT BREAKDOWN CARD */}
      <div className="bg-[#120F0D] p-6 sm:p-8 rounded-3xl border border-amber-500/40 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/30 pb-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Detailed Analysis for Selected Chart Day:
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100 mt-0.5">
              {selectedDayData.formattedDate}
            </h3>
            <p className="text-xs text-amber-200/80 mt-0.5 font-serif">
              User Rashi: <strong>{selectedRashi}</strong> • Moon Sign: <strong>{selectedDayData.moonSign}</strong> ({selectedDayData.moonHouseFromRashi}th House)
            </p>
          </div>

          <div className={`px-4 py-2 rounded-2xl border font-mono font-bold text-sm text-center ${selectedDayData.statusColor}`}>
            <div>Positivity Index: {selectedDayData.overallPositivity}%</div>
            <div className="text-[10px] uppercase">{selectedDayData.statusText}</div>
          </div>
        </div>

        {/* METRICS BREAKDOWN GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">💰 Wealth Index:</span>
            <div className="text-amber-200 font-bold font-mono text-base">{selectedDayData.wealthPositivity}%</div>
            <div className="text-[10px] text-amber-300/70">House {selectedDayData.moonHouseFromRashi} Transit</div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">🧠 Health Index:</span>
            <div className="text-amber-200 font-bold font-mono text-base">{selectedDayData.healthPositivity}%</div>
            <div className="text-[10px] text-amber-300/70">{selectedDayData.chandrabalamQuality}</div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">❤️ Harmony Index:</span>
            <div className="text-amber-200 font-bold font-mono text-base">{selectedDayData.harmonyPositivity}%</div>
            <div className="text-[10px] text-amber-300/70">Tarabalam: {selectedDayData.tarabalamQuality}</div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">✨ Benefic Transits:</span>
            <div className="text-amber-200 font-bold font-mono text-base">{selectedDayData.beneficCount} Planets</div>
            <div className="text-[10px] text-amber-300/70">Jupiter, Venus, Sun & Merc</div>
          </div>
        </div>

        {/* RECOMMENDED ACTION & VEDIC REMEDY FOR THIS DAY */}
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-2">
          <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Recommended Guidance & Vedic Remedy:</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-100 font-serif leading-relaxed">
            {selectedDayData.remedySuggestion}
          </p>
        </div>
      </div>
    </div>
  );
};
