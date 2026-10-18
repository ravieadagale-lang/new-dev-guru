// src/components/BirthMonthView.tsx

import React, { useState, useMemo } from "react";
import {
  Calendar,
  Sparkles,
  Heart,
  Activity,
  Coins,
  Users,
  Compass,
  Search,
  BookOpen,
  Gem,
  CheckCircle2,
  ShieldAlert,
  Star,
  Quote,
  Layers,
  ChevronRight
} from "lucide-react";
import {
  BIRTH_MONTH_DATA,
  BIRTH_MONTH_HEADER_INFO,
  BirthMonthInfo
} from "../data/birthMonthData";

interface BirthMonthViewProps {
  userBirthMonth?: number; // 1 to 12
  userBirthDate?: string;  // e.g., "YYYY-MM-DD"
}

export const BirthMonthView: React.FC<BirthMonthViewProps> = ({
  userBirthMonth,
  userBirthDate
}) => {
  // Infer month index from birth date string if userBirthMonth is not explicitly provided
  const detectedMonth = useMemo(() => {
    if (userBirthMonth && userBirthMonth >= 1 && userBirthMonth <= 12) {
      return userBirthMonth;
    }
    if (userBirthDate) {
      const parts = userBirthDate.split("-");
      if (parts.length >= 2) {
        const m = parseInt(parts[1], 10);
        if (m >= 1 && m <= 12) return m;
      }
    }
    return 1; // Default to January
  }, [userBirthMonth, userBirthDate]);

  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(detectedMonth);
  const [activeCategory, setActiveCategory] = useState<
    "all" | "character" | "health" | "wealth" | "marriage" | "correspondences"
  >("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Get current active month data
  const currentMonthData = useMemo(() => {
    return (
      BIRTH_MONTH_DATA.find((m) => m.monthIndex === selectedMonthIndex) ||
      BIRTH_MONTH_DATA[0]
    );
  }, [selectedMonthIndex]);

  // Handle month selection
  const handleSelectMonth = (monthIdx: number) => {
    setSelectedMonthIndex(monthIdx);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100 pb-12">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Chapter 39 • The Twelve Gates of Birth</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-indigo-200">
            {BIRTH_MONTH_HEADER_INFO.mainTitle}
          </h1>

          <p className="text-sm md:text-base text-amber-200/90 font-serif italic border-l-2 border-amber-500/50 pl-3">
            "{BIRTH_MONTH_HEADER_INFO.subtitle}"
          </p>

          <div className="space-y-3 pt-2 text-sm text-slate-300 leading-relaxed font-sans">
            {BIRTH_MONTH_HEADER_INFO.introParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </div>

      {/* MONTH SELECTOR GRID (12 MONTHS) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-amber-300/90 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Select Birth Month Gateway (1 – 12)</span>
          </label>

          {detectedMonth > 0 && (
            <span className="text-xs text-indigo-300 bg-indigo-900/40 border border-indigo-500/30 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              Your Birth Month: {BIRTH_MONTH_DATA[detectedMonth - 1]?.monthName}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {BIRTH_MONTH_DATA.map((item) => {
            const isSelected = item.monthIndex === selectedMonthIndex;
            const isUserMonth = item.monthIndex === detectedMonth;

            return (
              <button
                key={item.monthIndex}
                onClick={() => handleSelectMonth(item.monthIndex)}
                className={`relative px-3 py-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between group ${
                  isSelected
                    ? "bg-indigo-900/60 border-indigo-400 text-white shadow-lg shadow-indigo-950/50 ring-1 ring-indigo-400/50"
                    : "bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80"
                }`}
              >
                {isUserMonth && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}

                <div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold mb-1 opacity-75">
                    <span>GATE {String(item.monthIndex).padStart(2, "0")}</span>
                  </div>
                  <div className="font-serif font-semibold text-base text-amber-200 group-hover:text-amber-100">
                    {item.monthName}
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 line-clamp-1 font-sans mt-1">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CATEGORY & FILTER TABS */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "all", label: "All Insights", icon: Layers },
            { id: "character", label: "Character & Mind", icon: Compass },
            { id: "health", label: "Health & Vitality", icon: Activity },
            { id: "wealth", label: "Wealth & Prosperity", icon: Coins },
            { id: "marriage", label: "Marriage & Friends", icon: Heart },
            { id: "correspondences", label: "Lucky Factors", icon: Gem }
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SELECTED MONTH DISPLAY HEADER */}
      <div className={`p-6 rounded-2xl bg-gradient-to-r ${currentMonthData.themeGradient} border ${currentMonthData.accentBorder} shadow-xl space-y-4`}>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${currentMonthData.badgeBg}`}>
                Gate {currentMonthData.monthIndex} of 12
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                {currentMonthData.monthName} Vibration
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-100 flex items-center gap-2">
              <span>{currentMonthData.monthName}</span>
              <span className="text-slate-400 font-light">—</span>
              <span className={currentMonthData.textColor}>{currentMonthData.title}</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300">Compatible Numbers:</span>
              <span className="font-mono text-amber-300 font-bold">{currentMonthData.compatibleNumbers}</span>
            </div>
          </div>
        </div>

        {/* LUCKY CORRESPONDENCES QUICK SUMMARY STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-1">
          <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-slate-400 block mb-0.5">Lucky Days:</span>
            <span className="font-semibold text-amber-200">{currentMonthData.luckyDays}</span>
          </div>
          <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-slate-400 block mb-0.5">Lucky Colours:</span>
            <span className="font-semibold text-emerald-200">{currentMonthData.luckyColours}</span>
          </div>
          <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-slate-400 block mb-0.5">Lucky Gemstones:</span>
            <span className="font-semibold text-indigo-200">{currentMonthData.luckyGemstones}</span>
          </div>
          <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-slate-400 block mb-0.5">Compatible Vibration:</span>
            <span className="font-semibold text-cyan-200">{currentMonthData.compatibleNumbers}</span>
          </div>
        </div>
      </div>

      {/* DETAILED INFORMATION IN FULL PARAGRAPHS */}
      <div className="space-y-6">
        {/* CHARACTER AND PERSONALITY */}
        {(activeCategory === "all" || activeCategory === "character") && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4 hover:border-indigo-500/30 transition-all shadow-lg">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-serif font-bold text-amber-200">
                  Character & Personality
                </h3>
                <p className="text-xs text-slate-400">
                  Psychological Blueprint, Temperament, and Inner Drive
                </p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-slate-200 text-sm md:text-base leading-relaxed font-sans">
              <p className="bg-indigo-950/20 p-4 rounded-xl border border-indigo-900/30 text-slate-200">
                {currentMonthData.characterAndPersonality}
              </p>
            </div>
          </div>
        )}

        {/* HEALTH & VITALITY */}
        {(activeCategory === "all" || activeCategory === "health") && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4 hover:border-emerald-500/30 transition-all shadow-lg">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-serif font-bold text-amber-200">
                  Health & Physical Constitution
                </h3>
                <p className="text-xs text-slate-400">
                  Vulnerabilities, Energy Cycles, and Preventive Care
                </p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-slate-200 text-sm md:text-base leading-relaxed font-sans">
              <p className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-900/30 text-slate-200">
                {currentMonthData.health}
              </p>
            </div>
          </div>
        )}

        {/* WEALTH & PROSPERITY */}
        {(activeCategory === "all" || activeCategory === "wealth") && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4 hover:border-amber-500/30 transition-all shadow-lg">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-serif font-bold text-amber-200">
                  Wealth, Career & Money Flow
                </h3>
                <p className="text-xs text-slate-400">
                  Prosperity Patterns, Financial Instincts, and Investment Style
                </p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-slate-200 text-sm md:text-base leading-relaxed font-sans">
              <p className="bg-amber-950/20 p-4 rounded-xl border border-amber-900/30 text-slate-200">
                {currentMonthData.wealth}
              </p>
            </div>
          </div>
        )}

        {/* MARRIAGE AND FRIENDS */}
        {(activeCategory === "all" || activeCategory === "marriage") && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4 hover:border-rose-500/30 transition-all shadow-lg">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-serif font-bold text-amber-200">
                  Marriage, Domestic Life & Friendship
                </h3>
                <p className="text-xs text-slate-400">
                  Roles as Husband/Wife, Relational Dynamics, and Loyalty
                </p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-slate-200 text-sm md:text-base leading-relaxed font-sans">
              <p className="bg-rose-950/20 p-4 rounded-xl border border-rose-900/30 text-slate-200">
                {currentMonthData.marriageAndFriends}
              </p>
            </div>
          </div>
        )}

        {/* LUCKY CORRESPONDENCES CARD */}
        {(activeCategory === "all" || activeCategory === "correspondences") && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4 hover:border-cyan-500/30 transition-all shadow-lg">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Gem className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-serif font-bold text-amber-200">
                  Vibrational Correspondences & Lucky Factors
                </h3>
                <p className="text-xs text-slate-400">
                  Days, Colours, Gemstones, and Compatible Numbers for {currentMonthData.monthName}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-sans">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="text-xs text-amber-400 uppercase font-semibold tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lucky Days</span>
                </div>
                <div className="text-slate-100 font-medium text-base">
                  {currentMonthData.luckyDays}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="text-xs text-emerald-400 uppercase font-semibold tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lucky Colours</span>
                </div>
                <div className="text-slate-100 font-medium text-base">
                  {currentMonthData.luckyColours}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="text-xs text-indigo-400 uppercase font-semibold tracking-wider flex items-center gap-1.5">
                  <Gem className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Lucky Gemstones</span>
                </div>
                <div className="text-slate-100 font-medium text-base">
                  {currentMonthData.luckyGemstones}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="text-xs text-cyan-400 uppercase font-semibold tracking-wider flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Compatible Numbers</span>
                </div>
                <div className="text-slate-100 font-medium text-base">
                  {currentMonthData.compatibleNumbers}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CLOSING NUMEROLOGICAL REFLECTION */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 md:p-8 space-y-3">
        <div className="flex items-center gap-2 text-amber-300 font-serif text-lg font-semibold">
          <Quote className="w-5 h-5 text-amber-400" />
          <span>A Closing Note from the Numerologist</span>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans italic pl-4 border-l-2 border-amber-500/50">
          {BIRTH_MONTH_HEADER_INFO.closingNote}
        </p>
      </div>
    </div>
  );
};
