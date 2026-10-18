import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserProfile } from "../types";
import { ZodiacSignIcon } from "./ZodiacSignIcon";
import { 
  getDailyHoroscopeForRashi, 
  RASHI_DETAILS, 
  DailyHoroscopeData 
} from "../data/horoscopeData";
import { 
  Sparkles, 
  Briefcase, 
  Coins, 
  Heart, 
  Activity, 
  Compass, 
  Palette, 
  Clock, 
  ShieldAlert, 
  Languages, 
  Star,
  ChevronRight,
  Flame,
  Globe,
  Zap,
  RotateCw,
  Bot,
  RefreshCw,
  Copy,
  Check
} from "lucide-react";

interface DailyHoroscopeWidgetProps {
  userProfile?: UserProfile;
  onSelectTab?: (tab: string) => void;
}

export const DailyHoroscopeWidget: React.FC<DailyHoroscopeWidgetProps> = ({
  userProfile,
  onSelectTab
}) => {
  // Determine initial Rashi
  const initialRashi = userProfile?.rashi && RASHI_DETAILS.some(r => r.name.toLowerCase() === userProfile.rashi.toLowerCase())
    ? userProfile.rashi
    : "Aries";

  const [selectedRashi, setSelectedRashi] = useState<string>(initialRashi);
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [activeCategory, setActiveCategory] = useState<"all" | "career" | "finance" | "love" | "health">("all");
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Gemini AI Daily Horoscope Insights state
  const [aiInsightsText, setAiInsightsText] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiCopied, setAiCopied] = useState<boolean>(false);

  const toggleCardFlip = (key: string) => {
    setFlippedCards((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Fetch personalized daily transit horoscope from Gemini API based on user's Rashi and Nakshatra
  const fetchGeminiHoroscope = async (rashiName: string) => {
    setIsAiLoading(true);
    try {
      const response = await fetch("/api/ai/daily-horoscope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: {
            name: userProfile?.name || "Seeker",
            rashi: rashiName,
            nakshatra: userProfile?.nakshatra || "Rohini",
            lagna: userProfile?.lagna || "Aries",
          },
          date: new Date().toISOString().split("T")[0],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.horoscope) {
          setAiInsightsText(data.horoscope);
        }
      }
    } catch (err) {
      console.log("Gemini AI Daily Horoscope: Using offline fallback.");
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    fetchGeminiHoroscope(selectedRashi);
  }, [selectedRashi, userProfile?.nakshatra]);

  const todayStr = new Date().toLocaleDateString(lang === "hi" ? "hi-IN" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const horoscope: DailyHoroscopeData = getDailyHoroscopeForRashi(selectedRashi);
  const selectedRashiMeta = RASHI_DETAILS.find(r => r.name.toLowerCase() === selectedRashi.toLowerCase()) || RASHI_DETAILS[0];

  const getScoreBadgeColor = (score: number) => {
    if (score >= 88) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    if (score >= 78) return "bg-amber-500/10 text-amber-300 border-amber-500/30";
    return "bg-amber-700/20 text-amber-200 border-amber-600/30";
  };

  const getEnergyDetails = (score: number) => {
    if (score >= 88) {
      return {
        levelLabel: lang === "hi" ? "अत्यंत उच्च ऊर्जा" : "Peak Cosmic Energy",
        statusText: lang === "hi" ? "सर्वोत्तम सफलता योग" : "High Favorable Intensity",
        intensityBadge: lang === "hi" ? "तीव्र शुभ प्रभाव" : "High Intensity",
        strokeColor: "#34D399", // Emerald
        luckStars: 5,
      };
    } else if (score >= 78) {
      return {
        levelLabel: lang === "hi" ? "शुभ व ऊर्जस्वित दिन" : "Optimal Energy Flow",
        statusText: lang === "hi" ? "सकारात्मक प्रगति गोचर" : "Steady Growth Momentum",
        intensityBadge: lang === "hi" ? "मध्यम-उच्च प्रभाव" : "Moderate High",
        strokeColor: "#FBBF24", // Amber
        luckStars: 4,
      };
    } else {
      return {
        levelLabel: lang === "hi" ? "संतुलित व स्थिर ऊर्जा" : "Balanced Energy Flow",
        statusText: lang === "hi" ? "धैर्य व एकाग्रता आवश्यक" : "Thoughtful Pace & Stability",
        intensityBadge: lang === "hi" ? "संतुलित प्रभाव" : "Balanced Pace",
        strokeColor: "#F59E0B", // Dark Amber
        luckStars: 3,
      };
    }
  };

  const energyInfo = getEnergyDetails(horoscope.overallScore);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-gradient-to-b from-[#1E1B18] via-[#26201A] to-[#14110E] text-amber-100 rounded-3xl border border-amber-500/30 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden space-y-8"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {lang === "hi" ? "दैनिक राशिफल और ग्रह गोचर" : "Personalized Daily Horoscope"}
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 flex items-center gap-3">
            <ZodiacSignIcon sign={horoscope.rashi} size="md" variant="badge" />
            <span>{lang === "hi" ? `${horoscope.rashiHi} राशिफल` : `${horoscope.rashi} Daily Insights`}</span>
          </h2>
          <p className="text-xs text-amber-200/70 mt-1 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{todayStr}</span>
            <span>•</span>
            <span className="text-amber-300">{lang === "hi" ? `स्वामी: ${horoscope.rulingPlanetHi}` : `Ruling Planet: ${horoscope.rulingPlanet}`}</span>
          </p>
        </div>

        {/* Language & Rashi Selector Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(l => (l === "en" ? "hi" : "en"))}
            className="px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-200 text-xs font-medium hover:bg-amber-900 transition-colors flex items-center gap-1.5 shadow-xs"
            title="Toggle Language"
          >
            <Languages className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === "en" ? "हिंदी में देखें" : "English"}</span>
          </button>

          {/* Quick Rashi selector dropdown */}
          <div className="relative">
            <select
              value={selectedRashi}
              onChange={(e) => setSelectedRashi(e.target.value)}
              className="bg-[#120F0D] border border-amber-500/40 rounded-xl px-3.5 py-1.5 text-amber-200 text-xs font-semibold focus:outline-none focus:border-amber-400 cursor-pointer shadow-xs"
            >
              {RASHI_DETAILS.map((r) => (
                <option key={r.name} value={r.name} className="bg-[#1E1B18] text-amber-100">
                  {r.symbol} {r.name} ({r.nameHi})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 12 RASHIS SCROLLABLE BADGES BAR */}
      <div className="space-y-2 relative z-10">
        <div className="flex items-center justify-between text-xs text-amber-200/60 font-medium">
          <span>{lang === "hi" ? "अपनी चंद्र / सूर्य राशि चुनें:" : "Select Rashi (Moon / Sun Sign):"}</span>
          {userProfile?.rashi && (
            <span className="text-amber-400 text-[11px] flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400" />
              {lang === "hi" ? `आपकी राशि: ${userProfile.rashi}` : `Your Rashi: ${userProfile.rashi}`}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-900 scrollbar-track-transparent">
          {RASHI_DETAILS.map((r) => {
            const isSelected = r.name.toLowerCase() === selectedRashi.toLowerCase();
            const isUserRashi = userProfile?.rashi && userProfile.rashi.toLowerCase() === r.name.toLowerCase();

            return (
              <button
                key={r.name}
                onClick={() => setSelectedRashi(r.name)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-2xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                  isSelected
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold scale-105"
                    : "bg-[#181512] text-amber-200/80 border-amber-500/20 hover:border-amber-500/50 hover:bg-amber-950/40"
                }`}
              >
                <ZodiacSignIcon sign={r.name} size="xs" variant={isSelected ? "badge" : "badge-dark"} />
                <span>{lang === "hi" ? r.nameHi : r.name}</span>
                {isUserRashi && !isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* GEMINI AI PERSONALIZED DAILY INSIGHTS CARD */}
      <div className="bg-gradient-to-r from-amber-950/70 via-[#1F1914] to-slate-950/80 p-5 sm:p-6 rounded-2xl border border-amber-500/40 shadow-xl relative z-10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300">
              <Bot className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                  Dev-Guru AI Transit Forecast
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] font-mono">
                  Dev-Guru AI
                </span>
              </div>
              <p className="text-[11px] text-amber-200/70">
                Personalized for <strong className="text-amber-100">{userProfile?.name || "Seeker"}</strong> • Rashi: <strong className="text-amber-300">{selectedRashi}</strong> • Nakshatra: <strong className="text-amber-300">{userProfile?.nakshatra || "Rohini"}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (aiInsightsText) {
                  navigator.clipboard.writeText(aiInsightsText);
                  setAiCopied(true);
                  setTimeout(() => setAiCopied(false), 2500);
                }
              }}
              disabled={!aiInsightsText || isAiLoading}
              className="px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-200 text-xs font-semibold hover:bg-amber-900 transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              {aiCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
              <span>{aiCopied ? "Copied" : "Copy"}</span>
            </button>

            <button
              onClick={() => fetchGeminiHoroscope(selectedRashi)}
              disabled={isAiLoading}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-md disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAiLoading ? "animate-spin" : ""}`} />
              <span>{isAiLoading ? "Consulting Transits..." : "Refresh Forecast"}</span>
            </button>
          </div>
        </div>

        {isAiLoading ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
            </div>
            <p className="text-xs text-amber-300 font-medium">
              Generating real-time planetary transit guidance for {selectedRashi} & {userProfile?.nakshatra || "Rohini"} Nakshatra...
            </p>
          </div>
        ) : aiInsightsText ? (
          <div className="text-xs text-amber-100/95 leading-relaxed font-serif bg-[#130F0C]/80 p-4 rounded-xl border border-amber-500/20 whitespace-pre-wrap max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-900">
            {aiInsightsText}
          </div>
        ) : (
          <div className="py-4 text-center text-xs text-amber-200/60">
            Click "Refresh Forecast" to trigger Dev-Guru AI personalized insights for {selectedRashi}.
          </div>
        )}
      </div>

      {/* OVERALL DAY SCORE & SUMMARY HERO BANNER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#161310] p-6 rounded-2xl border border-amber-500/20 relative z-10">
        <div className="lg:col-span-8 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {lang === "hi" ? "दैनिक मुख्य विश्लेषण" : "Daily Cosmic Overview"}
            </span>
            <span className="text-amber-500/40">•</span>
            <span className="text-xs text-amber-300 font-medium">
              {lang === "hi" ? `मनःस्थिति: ${horoscope.moodHi}` : `Mood: ${horoscope.mood}`}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-serif">
            {lang === "hi" ? horoscope.summaryHi : horoscope.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-amber-200/80">
            <div className="flex items-center gap-1.5 bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-500/20">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === "hi" ? `तत्व: ${horoscope.elementHi}` : `Element: ${horoscope.element}`}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-500/20">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === "hi" ? `शुभ दिशा: ${horoscope.luckyDirection}` : `Lucky Direction: ${horoscope.luckyDirection}`}</span>
            </div>
          </div>
        </div>

        {/* ENERGY & LUCK GAUGE CARD */}
        <div className="lg:col-span-4 flex flex-col items-center justify-between p-5 bg-gradient-to-b from-[#251E18] to-[#1C1612] rounded-2xl border border-amber-500/30 text-center space-y-3 relative overflow-hidden shadow-inner">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-amber-300 font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{lang === "hi" ? "ऊर्जा व भाग्य सूचकांक" : "Cosmic Energy & Luck Gauge"}</span>
          </div>

          {/* Semi-Circle SVG Radial Gauge */}
          <div className="relative w-36 h-20 mx-auto flex items-end justify-center mt-1">
            <svg viewBox="0 0 120 62" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="energyGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor={energyInfo.strokeColor} />
                </linearGradient>
              </defs>
              {/* Background Arc */}
              <path
                d="M 18,52 A 42,42 0 0,1 102,52"
                fill="none"
                stroke="#33271E"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Animated Progress Arc */}
              <path
                d="M 18,52 A 42,42 0 0,1 102,52"
                fill="none"
                stroke="url(#energyGaugeGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="132"
                strokeDashoffset={132 - (132 * horoscope.overallScore) / 100}
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Gauge Center Readout */}
            <div className="absolute bottom-0 text-center flex flex-col items-center">
              <span className="font-serif text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 leading-none">
                {horoscope.overallScore}%
              </span>
              <span className="text-[9px] uppercase tracking-wider text-amber-300/90 font-bold mt-0.5">
                {energyInfo.levelLabel}
              </span>
            </div>
          </div>

          {/* 5-Star Luck Factor Rating */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((starIdx) => (
              <Star
                key={starIdx}
                className={`w-3.5 h-3.5 transition-all ${
                  starIdx <= energyInfo.luckStars
                    ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]"
                    : "text-amber-950 fill-amber-950/40 border-amber-800"
                }`}
              />
            ))}
          </div>

          {/* Segmented Intensity Bar */}
          <div className="w-full space-y-1 pt-1">
            <div className="flex justify-between items-center text-[10px] text-amber-200/70 font-medium px-1">
              <span>{lang === "hi" ? "ऊर्जा स्तर" : "Intensity"}</span>
              <span className="text-amber-300 font-bold">{energyInfo.intensityBadge}</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {[20, 40, 60, 80, 100].map((step) => {
                const isActive = horoscope.overallScore >= step;
                return (
                  <div
                    key={step}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      isActive
                        ? "bg-gradient-to-r from-amber-400 to-yellow-400 shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                        : "bg-amber-950/80 border border-amber-900/30"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY METRICS GRID */}
      <div className="space-y-4 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-500/20 pb-2 gap-2">
          <h3 className="font-serif text-base sm:text-lg font-bold text-amber-200">
            {lang === "hi" ? "जीवन के ४ मुख्य स्तंभ" : "4 Core Life Pillars"}
          </h3>

          <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {[
              { id: "all", label: lang === "hi" ? "सभी" : "All" },
              { id: "career", label: lang === "hi" ? "करियर" : "Career" },
              { id: "finance", label: lang === "hi" ? "वित्त" : "Finance" },
              { id: "love", label: lang === "hi" ? "प्रेम" : "Love" },
              { id: "health", label: lang === "hi" ? "स्वास्थ्य" : "Health" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "text-amber-200/60 hover:text-amber-200 hover:bg-amber-900/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* CAREER CARD */}
          {(activeCategory === "all" || activeCategory === "career") && (
            <div className="perspective-1000 h-[210px]">
              <div
                className="relative w-full h-full transition-transform duration-700 ease-in-out transform-style-3d cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flippedCards["career"] ? "rotateY(180deg)" : "rotateY(0deg)",
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* FRONT FACE */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#1A1613] p-5 rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition-all space-y-3 flex flex-col justify-between"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                        <Briefcase className="w-4 h-4 text-amber-400" />
                        <span>{lang === "hi" ? "करियर व व्यापार" : "Career & Work"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getScoreBadgeColor(horoscope.career.score)}`}>
                          {horoscope.career.score}%
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleCardFlip("career"); }}
                          className="p-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors"
                          title="Flip for Vedic Remedy"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-amber-100/80 leading-relaxed">
                      {lang === "hi" ? horoscope.career.textHi : horoscope.career.text}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] text-amber-300/70">
                      <span>Tap card to flip for Mantra & Remedy</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleCardFlip("career"); }}
                        className="text-amber-400 font-bold hover:underline flex items-center gap-0.5"
                      >
                        <span>Remedy</span>
                        <RotateCw className="w-2.5 h-2.5" />
                      </button>
                    </div>
                    <div className="w-full bg-amber-950/80 rounded-full h-1.5 overflow-hidden border border-amber-500/10">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: `${horoscope.career.score}%` }} />
                    </div>
                  </div>
                </div>

                {/* BACK FACE */}
                <div
                  className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#291F18] to-[#17120E] p-5 rounded-2xl border border-amber-500/40 space-y-2 flex flex-col justify-between"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between border-b border-amber-500/20 pb-1.5">
                      <span className="text-[10px] font-bold uppercase text-amber-300 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Career Remedy & Mantra</span>
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleCardFlip("career"); }}
                        className="p-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors"
                        title="Flip back"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="text-amber-200 font-serif text-[11px] font-semibold bg-amber-950/60 p-2 rounded-xl border border-amber-500/20">
                        ✨ Mantra: <span className="text-amber-300 font-mono">"Om Brim Brihaspataye Namah"</span> (108x)
                      </div>
                      <p className="text-[11px] text-amber-100/90 leading-tight">
                        Offer yellow sweets or chana dal at Vishnu Temple. Auspicious direction for meetings: <strong className="text-amber-300">North-East</strong>.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCardFlip("career"); }}
                    className="w-full py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[11px] font-bold rounded-xl border border-amber-500/30 flex items-center justify-center gap-1 transition-colors"
                  >
                    <RotateCw className="w-3 h-3 text-amber-400" />
                    <span>Flip Back to Insights</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FINANCE CARD */}
          {(activeCategory === "all" || activeCategory === "finance") && (
            <div className="perspective-1000 h-[210px]">
              <div
                className="relative w-full h-full transition-transform duration-700 ease-in-out transform-style-3d cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flippedCards["finance"] ? "rotateY(180deg)" : "rotateY(0deg)",
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* FRONT FACE */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#1A1613] p-5 rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition-all space-y-3 flex flex-col justify-between"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                        <Coins className="w-4 h-4 text-amber-400" />
                        <span>{lang === "hi" ? "धन व संपत्ति" : "Finance & Wealth"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getScoreBadgeColor(horoscope.finance.score)}`}>
                          {horoscope.finance.score}%
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleCardFlip("finance"); }}
                          className="p-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors"
                          title="Flip for Vedic Remedy"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-amber-100/80 leading-relaxed">
                      {lang === "hi" ? horoscope.finance.textHi : horoscope.finance.text}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] text-amber-300/70">
                      <span>Tap card to flip for Mantra & Remedy</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleCardFlip("finance"); }}
                        className="text-amber-400 font-bold hover:underline flex items-center gap-0.5"
                      >
                        <span>Remedy</span>
                        <RotateCw className="w-2.5 h-2.5" />
                      </button>
                    </div>
                    <div className="w-full bg-amber-950/80 rounded-full h-1.5 overflow-hidden border border-amber-500/10">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: `${horoscope.finance.score}%` }} />
                    </div>
                  </div>
                </div>

                {/* BACK FACE */}
                <div
                  className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#291F18] to-[#17120E] p-5 rounded-2xl border border-amber-500/40 space-y-2 flex flex-col justify-between"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between border-b border-amber-500/20 pb-1.5">
                      <span className="text-[10px] font-bold uppercase text-amber-300 flex items-center gap-1">
                        <Coins className="w-3 h-3 text-amber-400" />
                        <span>Wealth Mantra & Remedy</span>
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleCardFlip("finance"); }}
                        className="p-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors"
                        title="Flip back"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="text-amber-200 font-serif text-[11px] font-semibold bg-amber-950/60 p-2 rounded-xl border border-amber-500/20">
                        💰 Mantra: <span className="text-amber-300 font-mono">"Om Shreem Hreem Kleem Maha Lakshmyai"</span>
                      </div>
                      <p className="text-[11px] text-amber-100/90 leading-tight">
                        Keep a silver coin in wallet. Kubera Wealth Direction today: <strong className="text-amber-300">North Axis</strong>.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCardFlip("finance"); }}
                    className="w-full py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[11px] font-bold rounded-xl border border-amber-500/30 flex items-center justify-center gap-1 transition-colors"
                  >
                    <RotateCw className="w-3 h-3 text-amber-400" />
                    <span>Flip Back to Insights</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* LOVE CARD */}
          {(activeCategory === "all" || activeCategory === "love") && (
            <div className="perspective-1000 h-[210px]">
              <div
                className="relative w-full h-full transition-transform duration-700 ease-in-out transform-style-3d cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flippedCards["love"] ? "rotateY(180deg)" : "rotateY(0deg)",
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* FRONT FACE */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#1A1613] p-5 rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition-all space-y-3 flex flex-col justify-between"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                        <Heart className="w-4 h-4 text-rose-400" />
                        <span>{lang === "hi" ? "प्रेम व संबंध" : "Love & Relationship"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getScoreBadgeColor(horoscope.love.score)}`}>
                          {horoscope.love.score}%
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleCardFlip("love"); }}
                          className="p-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors"
                          title="Flip for Vedic Remedy"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-amber-100/80 leading-relaxed">
                      {lang === "hi" ? horoscope.love.textHi : horoscope.love.text}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] text-amber-300/70">
                      <span>Tap card to flip for Mantra & Remedy</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleCardFlip("love"); }}
                        className="text-amber-400 font-bold hover:underline flex items-center gap-0.5"
                      >
                        <span>Remedy</span>
                        <RotateCw className="w-2.5 h-2.5" />
                      </button>
                    </div>
                    <div className="w-full bg-amber-950/80 rounded-full h-1.5 overflow-hidden border border-amber-500/10">
                      <div className="bg-rose-400 h-full rounded-full" style={{ width: `${horoscope.love.score}%` }} />
                    </div>
                  </div>
                </div>

                {/* BACK FACE */}
                <div
                  className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#291F18] to-[#17120E] p-5 rounded-2xl border border-rose-500/40 space-y-2 flex flex-col justify-between"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between border-b border-rose-500/20 pb-1.5">
                      <span className="text-[10px] font-bold uppercase text-rose-300 flex items-center gap-1">
                        <Heart className="w-3 h-3 text-rose-400" />
                        <span>Venus Love Mantra & Ritual</span>
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleCardFlip("love"); }}
                        className="p-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors"
                        title="Flip back"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="text-amber-200 font-serif text-[11px] font-semibold bg-amber-950/60 p-2 rounded-xl border border-rose-500/20">
                        💖 Mantra: <span className="text-amber-300 font-mono">"Om Draam Dreem Sah Shukraya"</span>
                      </div>
                      <p className="text-[11px] text-amber-100/90 leading-tight">
                        Offer white flowers or natural fragrance on Fridays. Harmony Direction: <strong className="text-amber-300">South-East</strong>.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCardFlip("love"); }}
                    className="w-full py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[11px] font-bold rounded-xl border border-amber-500/30 flex items-center justify-center gap-1 transition-colors"
                  >
                    <RotateCw className="w-3 h-3 text-amber-400" />
                    <span>Flip Back to Insights</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* HEALTH CARD */}
          {(activeCategory === "all" || activeCategory === "health") && (
            <div className="perspective-1000 h-[210px]">
              <div
                className="relative w-full h-full transition-transform duration-700 ease-in-out transform-style-3d cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flippedCards["health"] ? "rotateY(180deg)" : "rotateY(0deg)",
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* FRONT FACE */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#1A1613] p-5 rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition-all space-y-3 flex flex-col justify-between"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                        <Activity className="w-4 h-4 text-emerald-400" />
                        <span>{lang === "hi" ? "स्वास्थ्य व ऊर्जा" : "Health & Energy"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getScoreBadgeColor(horoscope.health.score)}`}>
                          {horoscope.health.score}%
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleCardFlip("health"); }}
                          className="p-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors"
                          title="Flip for Vedic Remedy"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-amber-100/80 leading-relaxed">
                      {lang === "hi" ? horoscope.health.textHi : horoscope.health.text}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] text-amber-300/70">
                      <span>Tap card to flip for Mantra & Remedy</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleCardFlip("health"); }}
                        className="text-amber-400 font-bold hover:underline flex items-center gap-0.5"
                      >
                        <span>Remedy</span>
                        <RotateCw className="w-2.5 h-2.5" />
                      </button>
                    </div>
                    <div className="w-full bg-amber-950/80 rounded-full h-1.5 overflow-hidden border border-amber-500/10">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${horoscope.health.score}%` }} />
                    </div>
                  </div>
                </div>

                {/* BACK FACE */}
                <div
                  className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#291F18] to-[#17120E] p-5 rounded-2xl border border-emerald-500/40 space-y-2 flex flex-col justify-between"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1.5">
                      <span className="text-[10px] font-bold uppercase text-emerald-300 flex items-center gap-1">
                        <Activity className="w-3 h-3 text-emerald-400" />
                        <span>Health Vitality Mantra</span>
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleCardFlip("health"); }}
                        className="p-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors"
                        title="Flip back"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="text-amber-200 font-serif text-[11px] font-semibold bg-amber-950/60 p-2 rounded-xl border border-emerald-500/20">
                        🌿 Mantra: <span className="text-amber-300 font-mono">"Om Tryambakam Yajamahe"</span>
                      </div>
                      <p className="text-[11px] text-amber-100/90 leading-tight">
                        Drink water in copper vessel at dawn. Vitality Alignment direction: <strong className="text-amber-300">East Solar Axis</strong>.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCardFlip("health"); }}
                    className="w-full py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[11px] font-bold rounded-xl border border-amber-500/30 flex items-center justify-center gap-1 transition-colors"
                  >
                    <RotateCw className="w-3 h-3 text-amber-400" />
                    <span>Flip Back to Insights</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TODAY'S LUCKY PARAMETERS & VEDIC REMEDY FOOTER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 relative z-10">
        {/* LUCKY METRICS */}
        <div className="lg:col-span-5 bg-[#171411] p-5 rounded-2xl border border-amber-500/20 space-y-3">
          <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === "hi" ? "आज के शुभ कारक" : "Today's Lucky Parameters"}</span>
          </h4>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#221B16] p-3 rounded-xl border border-amber-500/10">
              <div className="text-[10px] text-amber-200/60 uppercase">{lang === "hi" ? "शुभ रंग" : "Lucky Color"}</div>
              <div className="font-bold text-amber-200 mt-0.5">{lang === "hi" ? horoscope.luckyColorHi : horoscope.luckyColor}</div>
            </div>

            <div className="bg-[#221B16] p-3 rounded-xl border border-amber-500/10">
              <div className="text-[10px] text-amber-200/60 uppercase">{lang === "hi" ? "शुभ अंक" : "Lucky Number"}</div>
              <div className="font-serif font-bold text-amber-300 text-lg mt-0.5">{horoscope.luckyNumber}</div>
            </div>

            <div className="bg-[#221B16] p-3 rounded-xl border border-amber-500/10">
              <div className="text-[10px] text-amber-200/60 uppercase">{lang === "hi" ? "शुभ मुहूर्त समय" : "Auspicious Hours"}</div>
              <div className="font-semibold text-amber-200 text-[11px] mt-0.5">{horoscope.luckyTime}</div>
            </div>

            <div className="bg-[#221B16] p-3 rounded-xl border border-amber-500/10">
              <div className="text-[10px] text-amber-200/60 uppercase">{lang === "hi" ? "तत्व स्वामी" : "Elemental Ruler"}</div>
              <div className="font-semibold text-amber-200 mt-0.5">{selectedRashiMeta.planet} ({selectedRashiMeta.planetHi})</div>
            </div>
          </div>
        </div>

        {/* VEDIC REMEDY BANNER & CTA */}
        <div className="lg:col-span-7 bg-gradient-to-r from-amber-950/80 via-[#261E18] to-amber-950/80 p-5 rounded-2xl border border-amber-500/30 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>{lang === "hi" ? "आज का वैदिक महाउपाय" : "Today's Vedic Planetary Remedy"}</span>
            </div>
            <p className="text-xs text-amber-100/90 leading-relaxed font-serif bg-[#120F0D]/60 p-3.5 rounded-xl border border-amber-500/20">
              {lang === "hi" ? horoscope.remedyHi : horoscope.remedy}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-amber-500/20">
            <span className="text-[11px] text-amber-200/70">
              {lang === "hi" ? "विस्तृत जन्मकुंडली व दशा विश्लेषण हेतु:" : "For complete birth chart & Dasha predictions:"}
            </span>

            <div className="flex gap-2">
              {onSelectTab && (
                <button
                  onClick={() => onSelectTab("astrology")}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors flex items-center gap-1 shadow-md"
                >
                  <span>{lang === "hi" ? "कुंडली देखें" : "Calculate Full Kundli"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
