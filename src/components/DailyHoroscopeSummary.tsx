import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Compass, 
  ShieldCheck, 
  Share2, 
  Copy, 
  Check, 
  Download, 
  Volume2, 
  Calendar, 
  Briefcase, 
  Coins, 
  Heart, 
  Activity, 
  ChevronRight, 
  RotateCcw, 
  Globe, 
  Flame, 
  Award, 
  Zap,
  Info
} from "lucide-react";
import { UserProfile } from "../types";
import { RASHI_DETAILS, getDailyHoroscopeForRashi, DailyHoroscopeData } from "../data/horoscopeData";
import { generateLuxuryAstroPDF } from "../utils/pdfGenerator";
import { playSingingBowlChime, playCardFlipSound } from "../utils/audioEffects";

interface DailyHoroscopeSummaryProps {
  userProfile: UserProfile;
  onSelectTab?: (tab: string) => void;
  onUpdateProfile?: (profile: UserProfile) => void;
}

export const DailyHoroscopeSummary: React.FC<DailyHoroscopeSummaryProps> = ({
  userProfile,
  onSelectTab,
  onUpdateProfile
}) => {
  // Selected Rashi state (defaults to user profile rashi, or Aries)
  const [selectedRashi, setSelectedRashi] = useState<string>(
    userProfile.rashi || "Aries"
  );
  
  // Date offset (0 = Today, 1 = Tomorrow, -1 = Yesterday)
  const [dateOffset, setDateOffset] = useState<number>(0);
  
  // Language toggle (en | hi)
  const [lang, setLang] = useState<"en" | "hi">("en");
  
  // AI Gemini generated text state
  const [aiHoroscopeText, setAiHoroscopeText] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  
  // Copy feedback state
  const [copiedToast, setCopiedToast] = useState<boolean>(false);
  const [mantraChanted, setMantraChanted] = useState<boolean>(false);

  // Compute date object
  const currentDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + dateOffset);
    return d;
  }, [dateOffset]);

  // Formatted date string
  const formattedDateString = useMemo(() => {
    return currentDate.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }, [currentDate, lang]);

  // Calculate snapshot data for selected Rashi & Date
  const horoscopeData: DailyHoroscopeData = useMemo(() => {
    return getDailyHoroscopeForRashi(selectedRashi, currentDate);
  }, [selectedRashi, currentDate]);

  // Handle Gemini AI deep dive generation
  const handleGenerateAiForecast = async () => {
    setIsAiLoading(true);
    playSingingBowlChime();
    try {
      const response = await fetch("/api/ai/daily-horoscope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: {
            ...userProfile,
            rashi: selectedRashi
          },
          date: currentDate.toISOString().split("T")[0]
        })
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();
      setAiHoroscopeText(data.horoscope || "Detailed planetary alignment snapshot calculated for " + selectedRashi + ".");
    } catch (err) {
      console.error(err);
      // Fallback response based on selected Rashi
      setAiHoroscopeText(
        `✨ Dev-Guru AI Transit Snapshot for ${selectedRashi}:\n` +
        `Today, ${selectedRashi} natives experience a supportive aspect from transit Jupiter and Moon in Rohini Nakshatra. ` +
        `Career momentum is elevated (${horoscopeData.career.score}%), with high potential for creative deal-making. ` +
        `Keep financial investments structured and recite ${horoscopeData.remedy}.`
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  // Copy snapshot to clipboard
  const handleCopySnapshot = () => {
    playCardFlipSound();
    const text = `🌟 Daily Horoscope Snapshot for ${selectedRashi} (${formattedDateString}) 🌟\n` +
      `• Overall Luck Index: ${horoscopeData.overallScore}%\n` +
      `• Mood: ${horoscopeData.mood}\n` +
      `• Lucky Color: ${horoscopeData.luckyColor} | Number: ${horoscopeData.luckyNumber}\n` +
      `• Auspicious Time: ${horoscopeData.luckyTime}\n` +
      `• Key Guidance: ${horoscopeData.summary}\n` +
      `• Daily Remedy: ${horoscopeData.remedy}\n` +
      `Calculated by Dev-Guru Spiritual Platform.`;

    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  };

  // Handle Mantra Chant
  const handleChantMantra = () => {
    playSingingBowlChime();
    setMantraChanted(true);
    setTimeout(() => setMantraChanted(false), 4000);
  };

  return (
    <div className="bg-white rounded-3xl border border-amber-900/15 shadow-md p-6 sm:p-8 space-y-6 animate-fade-in">
      {/* Top Header & Rashi Switcher Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-amber-900/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-1">
            <Sun className="w-3.5 h-3.5 text-amber-700" />
            Rashi-Based Cosmic Snapshot
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Daily Horoscope Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
            {formattedDateString} • Real-time Gochar & Planetary Transit Calculations
          </p>
        </div>

        {/* Date Selector & Language Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Date Offset Buttons */}
          <div className="inline-flex rounded-2xl bg-amber-50 p-1 border border-amber-900/10 text-xs font-bold">
            <button
              onClick={() => {
                playCardFlipSound();
                setDateOffset(-1);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                dateOffset === -1 ? "bg-slate-900 text-amber-300 shadow-xs" : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Yesterday
            </button>
            <button
              onClick={() => {
                playCardFlipSound();
                setDateOffset(0);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                dateOffset === 0 ? "bg-slate-900 text-amber-300 shadow-xs" : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => {
                playCardFlipSound();
                setDateOffset(1);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                dateOffset === 1 ? "bg-slate-900 text-amber-300 shadow-xs" : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Tomorrow
            </button>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => {
              playCardFlipSound();
              setLang(lang === "en" ? "hi" : "en");
            }}
            className="px-3 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-100 transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === "en" ? "हिंदी (Hindi)" : "English"}</span>
          </button>
        </div>
      </div>

      {/* 12 Rashis Selector Grid */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-bold text-slate-600">
          <span>Select Your Zodiac Sign (Rashi / चंद्र राशि):</span>
          {userProfile.rashi && selectedRashi !== userProfile.rashi && (
            <button
              onClick={() => setSelectedRashi(userProfile.rashi || "Aries")}
              className="text-amber-800 hover:underline cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to My Rashi ({userProfile.rashi})</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
          {RASHI_DETAILS.map((r) => {
            const isSelected = selectedRashi.toLowerCase() === r.name.toLowerCase();
            const isUserRashi = userProfile.rashi?.toLowerCase() === r.name.toLowerCase();

            return (
              <button
                key={r.name}
                onClick={() => {
                  playCardFlipSound();
                  setSelectedRashi(r.name);
                }}
                className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer relative flex flex-col items-center justify-center space-y-0.5 ${
                  isSelected
                    ? "bg-slate-900 text-amber-300 border-amber-500 shadow-md ring-2 ring-amber-400/30 scale-105 font-bold"
                    : "bg-amber-50/40 text-slate-800 border-amber-900/10 hover:bg-amber-100/60"
                }`}
              >
                {isUserRashi && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white" title="Your Natal Rashi" />
                )}
                <span className="text-base font-serif">{r.symbol.split(" ")[0]}</span>
                <span className="text-[11px] leading-none font-medium truncate max-w-full">
                  {lang === "hi" ? r.nameHi : r.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Rashi Horoscope Snapshot Card */}
      <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-amber-950 text-amber-100 p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Main Rashi Title & Overall Score */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 uppercase tracking-wider">
                {horoscopeData.symbol} • {lang === "hi" ? horoscopeData.elementHi : horoscopeData.element} Element
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-amber-200 text-xs font-bold border border-amber-500/20">
                Ruling Planet: {lang === "hi" ? horoscopeData.rulingPlanetHi : horoscopeData.rulingPlanet}
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100">
                {lang === "hi" ? horoscopeData.rashiHi : horoscopeData.rashi} Horoscope
              </h3>
              <span className="text-amber-300 font-serif text-xl sm:text-2xl font-bold">
                {horoscopeData.overallScore}% Luck Index
              </span>
            </div>

            <p className="text-xs sm:text-sm text-amber-200/90 max-w-2xl leading-relaxed font-sans">
              {lang === "hi" ? horoscopeData.summaryHi : horoscopeData.summary}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={handleGenerateAiForecast}
              disabled={isAiLoading}
              className="px-4 py-2.5 rounded-2xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-md"
            >
              <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
              <span>{isAiLoading ? "Analyzing..." : "Dev-Guru AI Snapshot"}</span>
            </button>

            <button
              onClick={handleCopySnapshot}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-900 text-amber-300 border border-amber-500/40 font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copiedToast ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
              <span>{copiedToast ? "Copied!" : "Copy"}</span>
            </button>

            <button
              onClick={() =>
                generateLuxuryAstroPDF({
                  profile: { ...userProfile, rashi: selectedRashi },
                  reportTitle: `Daily Horoscope Report for ${selectedRashi}`,
                  reportText: horoscopeData.summary + "\n\nRemedy: " + horoscopeData.remedy
                })
              }
              className="px-3.5 py-2.5 rounded-2xl bg-slate-900 text-amber-300 border border-amber-500/40 font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>PDF Report</span>
            </button>
          </div>
        </div>

        {/* AI Deep Dive Overlay if Generated */}
        <AnimatePresence>
          {aiHoroscopeText && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-950/90 p-5 rounded-2xl border border-amber-400/50 space-y-2 text-xs sm:text-sm text-amber-100 font-sans leading-relaxed whitespace-pre-wrap"
            >
              <div className="flex justify-between items-center text-amber-300 font-bold text-xs border-b border-amber-500/30 pb-2">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Dev-Guru AI Deep-Dive Analysis ({selectedRashi})
                </span>
                <button
                  onClick={() => setAiHoroscopeText("")}
                  className="text-amber-400/60 hover:text-white text-[11px]"
                >
                  Close AI Window
                </button>
              </div>
              <p>{aiHoroscopeText}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4 Core Life Domains Score Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Career & Work */}
        <div className="bg-amber-50/50 p-5 rounded-3xl border border-amber-900/10 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Briefcase className="w-4 h-4 text-amber-700" />
              <span>{lang === "hi" ? "करियर एवं व्यापार" : "Career & Work"}</span>
            </div>
            <span className="font-serif font-bold text-amber-800 text-sm">{horoscopeData.career.score}%</span>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-amber-600 h-full transition-all duration-500" 
              style={{ width: `${horoscopeData.career.score}%` }} 
            />
          </div>

          <p className="text-xs text-slate-600 leading-relaxed min-h-[48px]">
            {lang === "hi" ? horoscopeData.career.textHi : horoscopeData.career.text}
          </p>
        </div>

        {/* Wealth & Finance */}
        <div className="bg-amber-50/50 p-5 rounded-3xl border border-amber-900/10 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Coins className="w-4 h-4 text-amber-700" />
              <span>{lang === "hi" ? "धन एवं संपत्ति" : "Finance & Wealth"}</span>
            </div>
            <span className="font-serif font-bold text-amber-800 text-sm">{horoscopeData.finance.score}%</span>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-600 h-full transition-all duration-500" 
              style={{ width: `${horoscopeData.finance.score}%` }} 
            />
          </div>

          <p className="text-xs text-slate-600 leading-relaxed min-h-[48px]">
            {lang === "hi" ? horoscopeData.finance.textHi : horoscopeData.finance.text}
          </p>
        </div>

        {/* Love & Family */}
        <div className="bg-amber-50/50 p-5 rounded-3xl border border-amber-900/10 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>{lang === "hi" ? "प्रेम एवं परिवार" : "Love & Family"}</span>
            </div>
            <span className="font-serif font-bold text-rose-700 text-sm">{horoscopeData.love.score}%</span>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-rose-500 h-full transition-all duration-500" 
              style={{ width: `${horoscopeData.love.score}%` }} 
            />
          </div>

          <p className="text-xs text-slate-600 leading-relaxed min-h-[48px]">
            {lang === "hi" ? horoscopeData.love.textHi : horoscopeData.love.text}
          </p>
        </div>

        {/* Health & Vitality */}
        <div className="bg-amber-50/50 p-5 rounded-3xl border border-amber-900/10 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Activity className="w-4 h-4 text-teal-700" />
              <span>{lang === "hi" ? "स्वास्थ्य व ऊर्जा" : "Health & Vitality"}</span>
            </div>
            <span className="font-serif font-bold text-teal-800 text-sm">{horoscopeData.health.score}%</span>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-teal-600 h-full transition-all duration-500" 
              style={{ width: `${horoscopeData.health.score}%` }} 
            />
          </div>

          <p className="text-xs text-slate-600 leading-relaxed min-h-[48px]">
            {lang === "hi" ? horoscopeData.health.textHi : horoscopeData.health.text}
          </p>
        </div>
      </div>

      {/* Lucky Parameters & Daily Remedies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Lucky Matrix */}
        <div className="bg-slate-900 text-amber-100 p-6 rounded-3xl border border-amber-500/30 space-y-4">
          <h4 className="font-serif font-bold text-lg text-amber-200 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Today's Auspicious Key Metrics</span>
          </h4>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-amber-500/20 space-y-1">
              <span className="text-[10px] text-amber-300/80 uppercase font-bold">Lucky Color</span>
              <div className="font-serif font-bold text-base text-amber-100">
                {lang === "hi" ? horoscopeData.luckyColorHi : horoscopeData.luckyColor}
              </div>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-amber-500/20 space-y-1">
              <span className="text-[10px] text-amber-300/80 uppercase font-bold">Lucky Number</span>
              <div className="font-serif font-bold text-base text-amber-100">
                {horoscopeData.luckyNumber}
              </div>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-amber-500/20 space-y-1">
              <span className="text-[10px] text-amber-300/80 uppercase font-bold">Favorable Direction</span>
              <div className="font-serif font-bold text-base text-amber-100">
                {horoscopeData.luckyDirection}
              </div>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-amber-500/20 space-y-1">
              <span className="text-[10px] text-amber-300/80 uppercase font-bold">Golden Muhurat Window</span>
              <div className="font-serif font-bold text-xs text-amber-100">
                {horoscopeData.luckyTime}
              </div>
            </div>
          </div>
        </div>

        {/* Daily Vedic Remedy & Mantra Japa */}
        <div className="bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100/60 p-6 rounded-3xl border border-amber-300 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-800 text-amber-100 text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              Daily Planetary Remedy & Upaya
            </div>

            <h4 className="font-serif font-bold text-lg text-amber-950">
              Vedic Harmonization Practice
            </h4>

            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans font-medium">
              {lang === "hi" ? horoscopeData.remedyHi : horoscopeData.remedy}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-amber-900/10">
            <button
              onClick={handleChantMantra}
              className="px-4 py-2.5 rounded-2xl bg-amber-900 text-amber-100 font-bold text-xs hover:bg-amber-950 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>{mantraChanted ? "✨ Chanted! +15 Karma XP" : "Chant Daily Mantra & Sound Chime"}</span>
            </button>

            {onSelectTab && (
              <button
                onClick={() => onSelectTab("astrology")}
                className="text-xs font-bold text-amber-900 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Full Kundli & Dasha</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
