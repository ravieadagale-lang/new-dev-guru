import React, { useState, useMemo } from "react";
import {
  MuhurtaQualityScoreEngine,
  MuhurtaActivityKey,
  MUHURTA_ACTIVITIES,
  MuhurtaQualityScoreResult,
  QualityTier
} from "../../engine/muhurtaQualityScoreEngine";
import { CityLocation } from "../../utils/vedicAstronomicalEngine";
import {
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  Compass,
  ArrowRight,
  HelpCircle,
  Award
} from "lucide-react";

interface MuhurtaQualityScoreIndicatorProps {
  selectedCity: CityLocation;
  selectedDate: string; // "YYYY-MM-DD"
  currentTime: Date;
  isToday: boolean;
  onSelectActivity?: (activityKey: MuhurtaActivityKey) => void;
}

export const MuhurtaQualityScoreIndicator: React.FC<MuhurtaQualityScoreIndicatorProps> = ({
  selectedCity,
  selectedDate,
  currentTime,
  isToday
}) => {
  const [selectedActivity, setSelectedActivity] = useState<MuhurtaActivityKey>("gold_purchase");
  const [customHour, setCustomHour] = useState<number | null>(null);
  const [showWeightingDetails, setShowWeightingDetails] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);

  // Compute evaluation date: if customHour is set, use it; else if isToday, use currentTime; else noon of selectedDate
  const evaluationDate = useMemo(() => {
    const [y, m, d] = selectedDate.split("-").map(Number);
    const date = new Date(y, m - 1, d);

    if (customHour !== null) {
      date.setHours(customHour, 30, 0, 0);
      return date;
    }

    if (isToday) {
      date.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
      return date;
    }

    // Default to current noon for past/future dates
    date.setHours(12, 0, 0, 0);
    return date;
  }, [selectedDate, isToday, currentTime, customHour]);

  // Run the authoritative Muhurta Quality Score Engine
  const scoreResult: MuhurtaQualityScoreResult = useMemo(() => {
    return MuhurtaQualityScoreEngine.calculateMuhurtaQualityScore({
      activityKey: selectedActivity,
      date: evaluationDate,
      city: selectedCity
    });
  }, [selectedActivity, evaluationDate, selectedCity]);

  // Colors & badges mapped cleanly per tier
  const tierColorConfig: Record<
    QualityTier,
    {
      text: string;
      bg: string;
      border: string;
      barColor: string;
      badgeText: string;
      glow: string;
    }
  > = {
    UTTAMA: {
      text: "text-emerald-400",
      bg: "bg-emerald-950/40",
      border: "border-emerald-500/40",
      barColor: "bg-emerald-400",
      badgeText: "Supreme / अति उत्तम",
      glow: "shadow-[0_0_20px_rgba(52,211,153,0.2)]"
    },
    SHUBH: {
      text: "text-teal-300",
      bg: "bg-teal-950/40",
      border: "border-teal-500/40",
      barColor: "bg-teal-400",
      badgeText: "Auspicious / शुभ",
      glow: "shadow-[0_0_15px_rgba(45,212,191,0.15)]"
    },
    MADHYAMA: {
      text: "text-amber-400",
      bg: "bg-amber-950/40",
      border: "border-amber-500/40",
      barColor: "bg-amber-400",
      badgeText: "Moderate / मध्यम",
      glow: "shadow-[0_0_15px_rgba(251,191,36,0.15)]"
    },
    SADHARANA: {
      text: "text-slate-300",
      bg: "bg-slate-800/60",
      border: "border-slate-700",
      barColor: "bg-slate-400",
      badgeText: "Caution / साधारण",
      glow: ""
    },
    VARJYA: {
      text: "text-rose-400",
      bg: "bg-rose-950/40",
      border: "border-rose-500/40",
      barColor: "bg-rose-500",
      badgeText: "Inadvisable / वर्ज्य",
      glow: "shadow-[0_0_20px_rgba(244,63,94,0.2)]"
    }
  };

  const currentTierConfig = tierColorConfig[scoreResult.qualityTier];

  return (
    <div className="bg-slate-900 text-slate-100 rounded-3xl border border-amber-500/20 shadow-xl overflow-hidden transition-all">
      {/* 1. HEADER & LIVE CONTEXT */}
      <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
              Vedic Electional Intelligence · मुहूर्त गुणवत्ता
            </span>
            <span className="text-slate-500 text-xs">/</span>
            <span className="text-slate-400 text-xs">{selectedCity.name.split(",")[0]}</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>Muhurta Quality Score</span>
            <span className="text-xs font-normal text-amber-300/80 font-sans px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              Classical Shastric Weightings
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time evaluation for {scoreResult.targetTimeStr} on {scoreResult.targetDate} based on Tithi, Nakshatra, Hora, Choghadiya &amp; Dosha exclusions.
          </p>
        </div>

        {/* TIME CONTROLS: NOW & TIME-TRAVEL HOUR SELECTOR */}
        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          <button
            onClick={() => setCustomHour(null)}
            className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              customHour === null
                ? "bg-amber-500 text-slate-950 font-bold shadow-xs"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{isToday ? "Live Right Now" : "Standard Noon"}</span>
          </button>

          {/* Quick hour slider / select */}
          <div className="flex items-center bg-slate-800/80 border border-slate-700 rounded-xl px-2.5 py-1 text-xs gap-1.5">
            <span className="text-slate-400 text-[11px]">Hour:</span>
            <select
              value={customHour !== null ? customHour : evaluationDate.getHours()}
              onChange={(e) => setCustomHour(Number(e.target.value))}
              className="bg-transparent text-amber-300 font-bold focus:outline-none cursor-pointer pr-1"
            >
              {Array.from({ length: 24 }).map((_, h) => {
                const displayH = h % 12 === 0 ? 12 : h % 12;
                const ampm = h >= 12 ? "PM" : "AM";
                return (
                  <option key={h} value={h} className="bg-slate-900 text-slate-200">
                    {displayH}:00 {ampm}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* 2. ACTIVITY SELECTOR SCROLL BAR */}
      <div className="px-5 sm:px-6 pt-4 pb-2 border-b border-slate-800/60 bg-slate-950/40">
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
          Select Auspicious Undertaking
        </span>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 text-xs">
          {MUHURTA_ACTIVITIES.map((act) => {
            const isSelected = selectedActivity === act.key;
            return (
              <button
                key={act.key}
                onClick={() => setSelectedActivity(act.key)}
                className={`whitespace-nowrap px-3.5 py-2 rounded-xl transition-all cursor-pointer select-none text-left flex items-center gap-2 ${
                  isSelected
                    ? "bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold shadow-md scale-102"
                    : "bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/80 hover:text-white"
                }`}
              >
                <span>{act.shortLabel}</span>
                {isSelected && <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. MAIN SCORE DISPLAY CARD & BREAKDOWN */}
      <div className="p-5 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* LEFT: BIG QUALITY SCORE METER (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950/60 p-6 rounded-2xl border border-slate-800 flex flex-col items-center text-center space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Muhurta Suitability Rating
            </span>

            {/* Big Score Display */}
            <div className="relative flex items-center justify-center">
              {/* Radial or Big numeric indicator */}
              <div
                className={`w-36 h-36 rounded-full flex flex-col items-center justify-center border-4 ${currentTierConfig.border} ${currentTierConfig.bg} ${currentTierConfig.glow} transition-all`}
              >
                <div className="font-serif text-5xl font-extrabold tracking-tight text-white">
                  {scoreResult.totalScore}
                </div>
                <div className="text-[11px] font-semibold text-slate-400">out of 100</div>
              </div>
            </div>

            {/* Quality Tier Label */}
            <div className="space-y-1">
              <div className={`text-base font-serif font-bold ${currentTierConfig.text}`}>
                {currentTierConfig.badgeText}
              </div>
              <div className="text-xs text-slate-300">{scoreResult.activityName}</div>
              <div className="text-[11px] text-slate-500">{scoreResult.activitySanskritName}</div>
            </div>

            {/* Progress Spectrum Bar */}
            <div className="w-full space-y-1 pt-1">
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className={`h-full ${currentTierConfig.barColor} transition-all duration-500 rounded-full`}
                  style={{ width: `${scoreResult.totalScore}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 pt-0.5">
                <span>0 Varjya</span>
                <span>50 Madhyama</span>
                <span>85+ Uttama</span>
              </div>
            </div>
          </div>

          {/* RIGHT: VERDICT, ACTIVE WINDOWS & NEXT BEST WINDOW (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Shastric Verdict Card */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border ${currentTierConfig.border} ${currentTierConfig.bg} space-y-2`}
            >
              <div className="flex items-center gap-2">
                {scoreResult.qualityTier === "UTTAMA" || scoreResult.qualityTier === "SHUBH" ? (
                  <CheckCircle2 className={`w-5 h-5 ${currentTierConfig.text} shrink-0`} />
                ) : scoreResult.qualityTier === "VARJYA" ? (
                  <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                )}
                <span className="font-serif font-bold text-sm text-white">Shastric Verdict for This Moment</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">{scoreResult.verdictText}</p>
            </div>

            {/* Active Afflictions or Active Blessings */}
            {scoreResult.activeInauspiciousWindows.length > 0 && (
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-1.5 text-xs text-rose-200">
                <div className="font-bold flex items-center gap-1.5 text-rose-400 text-[11px] uppercase tracking-wider">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Active Inauspicious Segment Detected</span>
                </div>
                {scoreResult.activeInauspiciousWindows.map((w, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                    <span className="font-semibold text-rose-300">{w.name} ({w.timeRange})</span>
                    <span className="text-rose-200/80 text-[11px]">{w.reason}</span>
                  </div>
                ))}
              </div>
            )}

            {scoreResult.activeAuspiciousWindows.length > 0 && (
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5 text-xs text-emerald-200">
                <div className="font-bold flex items-center gap-1.5 text-emerald-400 text-[11px] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Divine Blessing / Special Yoga Active</span>
                </div>
                {scoreResult.activeAuspiciousWindows.map((w, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                    <span className="font-semibold text-emerald-300">{w.name}</span>
                    <span className="text-emerald-200/80 text-[11px]">{w.reason}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Next Auspicious Window Callout */}
            {scoreResult.nextAuspiciousWindow && (
              <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Next Optimal Window Ahead Today</span>
                  </span>
                  <div className="font-bold text-white text-sm">
                    {scoreResult.nextAuspiciousWindow.timeRange}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {scoreResult.nextAuspiciousWindow.description}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs inline-block">
                    Score ~{scoreResult.nextAuspiciousWindow.predictedScore}/100
                  </span>
                </div>
              </div>
            )}

            {/* Quick action buttons */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => setShowWeightingDetails(!showWeightingDetails)}
                className="text-xs px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{showWeightingDetails ? "Hide Vedic Weightings" : "Inspect 6 Vedic Weightings"}</span>
              </button>

              <button
                onClick={() => setShowAllActivities(!showAllActivities)}
                className="text-xs px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{showAllActivities ? "Hide Other Activities" : "Compare All Activities Now"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4. EXPANDABLE SECTION: STANDARD VEDIC WEIGHTINGS BREAKDOWN TABLE */}
        {showWeightingDetails && (
          <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Classical Vedic Weighting Decomposition</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Canonical point allocation: Doshas (25%), Nakshatra (20%), Tithi (15%), Yoga/Karana (15%), Hora/Choghadiya (15%), Vara (10%).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {scoreResult.factors.map((f, idx) => {
                const statusStyles =
                  f.status === "favorable"
                    ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300"
                    : f.status === "severe"
                    ? "border-rose-500/30 bg-rose-950/20 text-rose-300"
                    : f.status === "caution"
                    ? "border-amber-500/30 bg-amber-950/20 text-amber-300"
                    : "border-slate-800 bg-slate-950/40 text-slate-300";

                return (
                  <div key={idx} className={`p-4 rounded-2xl border ${statusStyles} space-y-2 flex flex-col justify-between`}>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-white">{f.name}</span>
                        <span className="font-mono font-bold text-xs">
                          {f.score} / {f.weightMax} pts
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-300">{f.description}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 italic">
                      {f.classicalRule}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. EXPANDABLE SECTION: CROSS-ACTIVITY COMPARISON MATRIX */}
        {showAllActivities && (
          <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Real-Time Activity Auspiciousness Comparison</span>
              </h4>
              <p className="text-xs text-slate-400">
                Evaluation for {scoreResult.targetTimeStr} today across all 10 major life &amp; commercial categories.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {scoreResult.allActivitiesScores.map((item) => {
                const isCurrent = item.activityKey === selectedActivity;
                const tierCfg = tierColorConfig[item.tier];

                return (
                  <button
                    key={item.activityKey}
                    onClick={() => setSelectedActivity(item.activityKey)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                      isCurrent
                        ? "border-amber-400 bg-slate-800 shadow-md ring-1 ring-amber-400"
                        : "border-slate-800 bg-slate-950/50 hover:bg-slate-850"
                    }`}
                  >
                    <div>
                      <span className="text-[11px] font-bold text-slate-200 block truncate">
                        {item.activityName.split("(")[0]}
                      </span>
                      <span className={`text-xs font-serif font-bold ${tierCfg.text} block`}>
                        {item.statusLabel}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between pt-1 border-t border-slate-800/80">
                      <span className="font-mono text-lg font-extrabold text-white">{item.score}</span>
                      <span className="text-[10px] text-slate-500">/100</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 6. 24-HOUR HOURLY TIMELINE CURVE */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>24-Hour Auspiciousness Progression Today</span>
            </span>
            <span className="text-[11px] text-slate-400">
              Click any hour to simulate Muhurta score
            </span>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-12 lg:grid-cols-24 gap-1">
            {scoreResult.hourlyScoresToday.map((hItem) => {
              const isSelectedHour = (customHour !== null ? customHour : evaluationDate.getHours()) === hItem.hour;
              const hTierCfg = tierColorConfig[hItem.tier];

              return (
                <button
                  key={hItem.hour}
                  onClick={() => setCustomHour(hItem.hour)}
                  title={`${hItem.timeLabel}: Score ${hItem.score} (${hItem.tier})`}
                  className={`p-1 rounded-lg text-center transition-all cursor-pointer flex flex-col items-center justify-between h-14 ${
                    isSelectedHour
                      ? "ring-2 ring-amber-400 bg-slate-800 shadow-md scale-105"
                      : "bg-slate-950/40 hover:bg-slate-800"
                  }`}
                >
                  <span className="text-[9px] font-bold text-slate-400 block truncate">
                    {hItem.hour}h
                  </span>

                  {/* Height bar representation */}
                  <div className="w-2.5 h-5 bg-slate-800 rounded-sm overflow-hidden flex flex-col justify-end">
                    <div
                      className={`w-full ${hTierCfg.barColor} transition-all`}
                      style={{ height: `${Math.max(15, hItem.score)}%` }}
                    />
                  </div>

                  <span className={`text-[10px] font-mono font-bold ${hTierCfg.text}`}>
                    {hItem.score}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 7. REMEDIAL & SHATRIC GUIDANCE FOOTNOTE */}
        <div className="pt-3 text-[11px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-800/60">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              Primary Karakas: {scoreResult.shastricGuidance[0]}
            </span>
          </div>
          <div className="text-amber-300/80 font-medium text-right">
            {scoreResult.mitigations[0]}
          </div>
        </div>
      </div>
    </div>
  );
};
