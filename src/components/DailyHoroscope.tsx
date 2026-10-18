import React, { useState, useEffect, useMemo } from "react";
import { UserProfile } from "../types";
import { RASHI_DETAILS, getDailyHoroscopeForRashi, DailyHoroscopeData } from "../data/horoscopeData";
import { Sparkles, Compass, Star, RefreshCw, ChevronRight, CheckCircle2 } from "lucide-react";

export interface DailyHoroscopeProps {
  userProfile?: UserProfile;
  onSelectTab?: (tab: string) => void;
  onUpdateProfile?: (profile: UserProfile) => void;
}

export const DailyHoroscope: React.FC<DailyHoroscopeProps> = ({
  userProfile,
  onSelectTab,
  onUpdateProfile,
}) => {
  const userRashiName = useMemo(() => {
    const rashiRaw = userProfile?.rashi || "Aries";
    const found = RASHI_DETAILS.find(
      (r) => r.name.toLowerCase() === rashiRaw.toLowerCase()
    );
    return found ? found.name : "Aries";
  }, [userProfile?.rashi]);

  const [selectedRashi, setSelectedRashi] = useState<string>(userRashiName);
  const [aiHoroscope, setAiHoroscope] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  useEffect(() => {
    setSelectedRashi(userRashiName);
  }, [userRashiName]);

  const horoscope: DailyHoroscopeData = useMemo(() => {
    return getDailyHoroscopeForRashi(selectedRashi, new Date());
  }, [selectedRashi]);

  const fetchAiTransitForecast = async (rashi: string) => {
    setIsLoadingAi(true);
    try {
      const res = await fetch("/api/ai/daily-horoscope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rashi,
          userName: userProfile?.name || "Seeker",
          nakshatra: userProfile?.nakshatra,
          lagna: userProfile?.lagna,
          date: new Date().toISOString().split("T")[0],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.horoscope) {
          setAiHoroscope(data.horoscope);
        }
      }
    } catch {
      // Fallback silently if offline or endpoint unavailable
    } finally {
      setIsLoadingAi(false);
    }
  };

  useEffect(() => {
    fetchAiTransitForecast(selectedRashi);
  }, [selectedRashi]);

  return (
    <div className="bg-slate-900/60 border border-amber-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-md text-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-500/20">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Vedic Moon Sign Forecast & Planetary Transits</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-amber-100 mt-1">
            Daily Horoscope: {horoscope.rashi} {horoscope.symbol.split(" ")[0]}
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Ruled by {horoscope.rulingPlanet} • Element: {horoscope.element} • Today's Cosmic Score: {horoscope.overallScore}%
          </p>
        </div>

        {/* 12 Rashi Pills Selector */}
        <div className="flex flex-wrap gap-1.5 max-w-md">
          {RASHI_DETAILS.map((r) => {
            const isSelected = r.name === selectedRashi;
            const isUserRashi = r.name.toLowerCase() === (userProfile?.rashi || "").toLowerCase();
            return (
              <button
                key={r.name}
                onClick={() => setSelectedRashi(r.name)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                  isSelected
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30"
                    : isUserRashi
                    ? "bg-amber-950/60 text-amber-300 border border-amber-500/40 hover:bg-amber-900/60"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80"
                }`}
              >
                {r.symbol.split(" ")[0]} {r.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Personalized Forecast Banner if available */}
      {aiHoroscope && (
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-slate-900 border border-amber-500/30 text-amber-200 text-sm">
          <div className="flex items-center gap-2 font-semibold text-amber-300 text-xs uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Cosmic Alignment Insight for {userProfile?.name || selectedRashi}</span>
          </div>
          <p className="leading-relaxed">{aiHoroscope}</p>
        </div>
      )}

      {/* Horoscope Dimensions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
          <div className="text-xs uppercase font-bold text-amber-400 mb-1">Career & Karma</div>
          <div className="text-2xl font-bold text-slate-100 mb-2">{horoscope.career.score}%</div>
          <p className="text-xs text-slate-300 leading-relaxed">{horoscope.career.text}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
          <div className="text-xs uppercase font-bold text-emerald-400 mb-1">Wealth & Finance</div>
          <div className="text-2xl font-bold text-slate-100 mb-2">{horoscope.finance.score}%</div>
          <p className="text-xs text-slate-300 leading-relaxed">{horoscope.finance.text}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
          <div className="text-xs uppercase font-bold text-rose-400 mb-1">Love & Relationships</div>
          <div className="text-2xl font-bold text-slate-100 mb-2">{horoscope.love.score}%</div>
          <p className="text-xs text-slate-300 leading-relaxed">{horoscope.love.text}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
          <div className="text-xs uppercase font-bold text-cyan-400 mb-1">Health & Vitality</div>
          <div className="text-2xl font-bold text-slate-100 mb-2">{horoscope.health.score}%</div>
          <p className="text-xs text-slate-300 leading-relaxed">{horoscope.health.text}</p>
        </div>
      </div>

      {/* Lucky Attributes & Daily Remedy */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
        <div className="flex flex-wrap gap-4">
          <div>
            <span className="text-slate-400">Lucky Color: </span>
            <span className="font-semibold text-amber-300">{horoscope.luckyColor}</span>
          </div>
          <div>
            <span className="text-slate-400">Lucky Number: </span>
            <span className="font-semibold text-amber-300">{horoscope.luckyNumber}</span>
          </div>
          <div>
            <span className="text-slate-400">Lucky Time: </span>
            <span className="font-semibold text-amber-300">{horoscope.luckyTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-300">
          <span className="font-bold text-amber-400">Daily Remedy:</span>
          <span>{horoscope.remedy}</span>
        </div>
      </div>
    </div>
  );
};
