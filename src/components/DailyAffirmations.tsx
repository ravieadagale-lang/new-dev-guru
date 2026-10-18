// src/components/DailyAffirmations.tsx
// Daily Spiritual Affirmations & Positive Cosmic Quotes Component for Dev-Guru PublicHome

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Volume2,
  Calendar,
  Compass,
  Heart,
  Shield,
  Sun,
  Flame,
  BookOpen,
  Feather,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import {
  DAILY_AFFIRMATIONS,
  SpiritualAffirmation,
  getAffirmationForDate
} from "../data/dailyAffirmationsData";
import {
  playCardClickSound,
  playCardHoverSound,
  playSingingBowlChime
} from "../utils/audioEffects";

interface DailyAffirmationsProps {
  className?: string;
  onExploreMore?: () => void;
}

export const DailyAffirmations: React.FC<DailyAffirmationsProps> = ({
  className = "",
  onExploreMore
}) => {
  // Today's canonical date
  const today = useMemo(() => new Date(), []);
  const todayDateStr = useMemo(() => today.toISOString().split("T")[0], [today]);
  const defaultAffirmation = useMemo(() => getAffirmationForDate(today), [today]);

  // Selected Category filter
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filtered pool of affirmations for offline / local fast cycling
  const filteredAffirmations = useMemo(() => {
    if (selectedCategory === "all") return DAILY_AFFIRMATIONS;
    return DAILY_AFFIRMATIONS.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  // State
  const [activeAffirmation, setActiveAffirmation] = useState<SpiritualAffirmation>(defaultAffirmation);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isPlayingChime, setIsPlayingChime] = useState<boolean>(false);
  const [japaCount, setJapaCount] = useState<number>(0);
  const [maxJapa, setMaxJapa] = useState<number>(3); // 3, 9, or 21 sacred repetitions
  const [isFetchingRandom, setIsFetchingRandom] = useState<boolean>(false);

  // Formatted date string for Dev-Guru UI
  const formattedDate = useMemo(() => {
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }, [today]);

  /**
   * Fetch daily affirmation or random affirmation from the Dev-Guru backend API
   */
  const fetchAffirmation = useCallback(
    async (isRandom: boolean = false, category: string = "all") => {
      try {
        if (isRandom) {
          setIsFetchingRandom(true);
        } else {
          setIsLoading(true);
        }

        // Check localStorage cache for daily quote (only when not random and category is all)
        if (!isRandom && category === "all") {
          const cacheKey = `devguru_daily_affirmation_${todayDateStr}`;
          const cached = localStorage.getItem(cacheKey);
          if (cached) {
            try {
              const parsed = JSON.parse(cached);
              if (parsed && parsed.id && parsed.affirmation) {
                setActiveAffirmation(parsed);
                setIsLoading(false);
                return;
              }
            } catch {
              // Ignore parse error and proceed to network fetch
            }
          }
        }

        // Construct API query
        const params = new URLSearchParams();
        if (isRandom) params.set("random", "true");
        if (!isRandom) params.set("date", todayDateStr);
        if (category !== "all") params.set("category", category);

        const response = await fetch(`/api/affirmations/daily?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.success && data.affirmation) {
            setActiveAffirmation(data.affirmation);
            if (!isRandom && category === "all") {
              localStorage.setItem(
                `devguru_daily_affirmation_${todayDateStr}`,
                JSON.stringify(data.affirmation)
              );
            }
            return;
          }
        }

        // Fallback to deterministic local generator if API returns non-200
        if (isRandom) {
          const pool = category === "all" ? DAILY_AFFIRMATIONS : DAILY_AFFIRMATIONS.filter((a) => a.category === category);
          const next = pool[Math.floor(Math.random() * pool.length)] || defaultAffirmation;
          setActiveAffirmation(next);
        } else {
          setActiveAffirmation(defaultAffirmation);
        }
      } catch (err) {
        console.warn("Dev-Guru daily affirmations fetch fallback:", err);
        setActiveAffirmation(defaultAffirmation);
      } finally {
        setIsLoading(false);
        setIsFetchingRandom(false);
      }
    },
    [todayDateStr, defaultAffirmation]
  );

  // Initial fetch on mount
  useEffect(() => {
    fetchAffirmation(false, "all");
  }, [fetchAffirmation]);

  const isTodayActive = activeAffirmation.id === defaultAffirmation.id;

  // Handle draw a random spiritual quote
  const handleShuffleAffirmation = async () => {
    playCardClickSound();
    setJapaCount(0);
    await fetchAffirmation(true, selectedCategory);
  };

  // Cycle next / prev
  const handleNextAffirmation = () => {
    playCardClickSound();
    const currentIndex = filteredAffirmations.findIndex((a) => a.id === activeAffirmation.id);
    const nextIndex = (currentIndex + 1) % filteredAffirmations.length;
    setActiveAffirmation(filteredAffirmations[nextIndex]);
    setJapaCount(0);
  };

  const handlePrevAffirmation = () => {
    playCardClickSound();
    const currentIndex = filteredAffirmations.findIndex((a) => a.id === activeAffirmation.id);
    const prevIndex = (currentIndex - 1 + filteredAffirmations.length) % filteredAffirmations.length;
    setActiveAffirmation(filteredAffirmations[prevIndex]);
    setJapaCount(0);
  };

  // Reset to today's canonical affirmation
  const handleResetToToday = () => {
    playCardClickSound();
    setSelectedCategory("all");
    setJapaCount(0);
    fetchAffirmation(false, "all");
  };

  // Play singing bowl chime
  const handlePlayChime = () => {
    playSingingBowlChime();
    setIsPlayingChime(true);
    setTimeout(() => setIsPlayingChime(false), 2400);
  };

  // Copy to clipboard
  const handleCopy = () => {
    playCardClickSound();
    const shareText = `🕉️ Daily Spiritual Affirmation | Dev-Guru
"${activeAffirmation.affirmation}"

📜 Sanskrit: ${activeAffirmation.sanskrit} (${activeAffirmation.transliteration})
✨ Translation: ${activeAffirmation.translation}
📖 Shastric Source: ${activeAffirmation.source}
🙏 Cosmic Alignment: ${activeAffirmation.cosmicEnergy}
📿 Seed Mantra: ${activeAffirmation.seedMantra}

Receive daily Vedic wisdom at Dev-Guru Jyotish Sanctuary.`;

    navigator.clipboard.writeText(shareText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  // Mindful Japa count step
  const handleIncrementJapa = () => {
    playCardHoverSound();
    if (japaCount < maxJapa) {
      const nextCount = japaCount + 1;
      setJapaCount(nextCount);
      if (nextCount === maxJapa) {
        playSingingBowlChime();
      }
    }
  };

  const categories = [
    { id: "all", label: "All Wisdom", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "peace", label: "Peace (शान्ति)", icon: <Heart className="w-3.5 h-3.5 text-rose-400" /> },
    { id: "abundance", label: "Abundance (श्री)", icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
    { id: "strength", label: "Strength (बल)", icon: <Shield className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: "wisdom", label: "Wisdom (ज्ञान)", icon: <BookOpen className="w-3.5 h-3.5 text-sky-400" /> },
    { id: "healing", label: "Healing (आरोग्य)", icon: <Flame className="w-3.5 h-3.5 text-orange-400" /> },
    { id: "gratitude", label: "Gratitude (कृतज्ञता)", icon: <Feather className="w-3.5 h-3.5 text-purple-400" /> },
  ];

  return (
    <section
      aria-label="Daily Affirmations and Spiritual Quotes"
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C140E] via-[#261B12] to-[#120B06] border border-amber-600/35 text-amber-50 shadow-2xl p-6 sm:p-8 lg:p-10 transition-all ${className}`}
    >
      {/* Decorative Celestial Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Header Row: Title, Date, Badges & Controls */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 text-[11px] font-bold text-amber-300 uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              Dev-Guru Daily Vedic Affirmation
            </span>

            {isTodayActive ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-semibold text-emerald-300">
                <Calendar className="w-3 h-3" />
                Affirmation of the Day
              </span>
            ) : (
              <button
                onClick={handleResetToToday}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-[10px] font-semibold text-amber-200 transition-colors cursor-pointer"
                title="Return to today's canonical blessing"
              >
                <Calendar className="w-3 h-3 text-amber-400" />
                Return to Today's Blessing
              </button>
            )}
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            Sacred Morning Contemplation
          </h2>
          <p className="text-xs text-amber-200/70 font-sans">
            Harmonize your mind with timeless Vedic truth for <strong className="text-amber-100">{formattedDate}</strong>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            onClick={handlePlayChime}
            disabled={isPlayingChime}
            className="px-3 py-2 rounded-xl bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 disabled:opacity-50"
            title="Play 432 Hz Tibetan singing bowl chime"
          >
            <Volume2 className={`w-4 h-4 ${isPlayingChime ? "text-amber-400 animate-ping" : "text-amber-400"}`} />
            <span className="hidden sm:inline">Singing Bowl</span>
          </button>

          <button
            onClick={handleShuffleAffirmation}
            disabled={isFetchingRandom}
            className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 disabled:opacity-50"
            title="Fetch a new random spiritual quote"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isFetchingRandom ? "animate-spin" : ""}`} />
            <span>{isFetchingRandom ? "Fetching..." : "Draw New Quote"}</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95"
            title="Copy affirmation to clipboard"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5 text-slate-950" />}
            <span>{isCopied ? "Copied!" : "Share / Copy"}</span>
          </button>
        </div>
      </div>

      {/* Category Filter Scroller */}
      <div className="relative z-10 flex items-center gap-2 overflow-x-auto py-3 no-scrollbar border-b border-amber-500/10 text-xs">
        <span className="text-[11px] font-bold text-amber-400/80 uppercase tracking-wider shrink-0 mr-1">
          Spiritual Focus:
        </span>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                playCardHoverSound();
                setSelectedCategory(cat.id);
                fetchAffirmation(false, cat.id);
                setJapaCount(0);
              }}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-950/40"
                  : "bg-black/30 hover:bg-black/50 text-amber-200/80 border border-amber-500/20"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Affirmation Focus Card */}
      {isLoading ? (
        <div className="relative z-10 py-10 flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
          <div className="text-xs text-amber-200/70 font-mono tracking-wider animate-pulse">
            Aligning with today's celestial energies...
          </div>
        </div>
      ) : (
        <div className="relative z-10 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left / Center: The Big Affirmation Statement */}
          <div className="lg:col-span-8 space-y-5">
            {/* Category Tag & Navigation Arrows */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-400/30 text-[11px] font-bold text-amber-300">
                  {activeAffirmation.categoryLabel}
                </span>
                <span className="text-xs text-amber-300/50">•</span>
                <span className="text-xs text-amber-300/80 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  {activeAffirmation.cosmicEnergy}
                </span>
              </div>

              {/* Quick Prev / Next Navigator */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevAffirmation}
                  className="p-1.5 rounded-lg bg-black/40 hover:bg-amber-900/40 text-amber-300 border border-amber-500/20 transition-colors cursor-pointer"
                  title="Previous affirmation"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextAffirmation}
                  className="p-1.5 rounded-lg bg-black/40 hover:bg-amber-900/40 text-amber-300 border border-amber-500/20 transition-colors cursor-pointer"
                  title="Next affirmation"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Core Affirmation Quote Statement */}
            <div className="relative pl-6 sm:pl-8 border-l-4 border-amber-500 space-y-2">
              <span className="absolute -top-4 -left-3 font-serif text-5xl sm:text-6xl text-amber-500/30 select-none">
                “
              </span>
              <p className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold leading-relaxed text-amber-100 drop-shadow-sm">
                {activeAffirmation.affirmation}
              </p>
              <p className="text-xs sm:text-sm text-amber-200/70 font-sans leading-relaxed">
                {activeAffirmation.themeDescription}
              </p>
            </div>

            {/* Shastric Sanskrit Shloka Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-amber-500/20 space-y-2 relative overflow-hidden backdrop-blur-xs">
              <div className="flex items-center justify-between text-[11px] text-amber-400 font-semibold border-b border-amber-500/10 pb-1.5">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  Shastric Root Verse
                </span>
                <span className="font-serif italic text-amber-300/80">
                  {activeAffirmation.source}
                </span>
              </div>

              <div className="font-serif text-lg sm:text-xl font-bold text-amber-200 tracking-wide">
                {activeAffirmation.sanskrit}
              </div>

              <div className="text-xs font-mono text-amber-300/70 italic">
                {activeAffirmation.transliteration}
              </div>

              <div className="text-xs text-amber-100/90 font-sans pt-1">
                <strong className="text-amber-400">Translation: </strong>
                {activeAffirmation.translation}
              </div>
            </div>
          </div>

          {/* Right Column: Sadhana Mindful Japa Reflection Widget */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#2A1F15]/90 to-[#19110B]/90 p-5 sm:p-6 rounded-2xl border border-amber-500/30 space-y-4 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs text-amber-200 uppercase tracking-wider">
                      Mindful Sadhana
                    </h4>
                    <div className="text-[10px] text-amber-300/60">
                      Internalize Today's Energy
                    </div>
                  </div>
                </div>

                {/* Reps Selector */}
                <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-amber-500/20 text-[10px]">
                  {[3, 9, 21].map((n) => (
                    <button
                      key={n}
                      onClick={() => {
                        playCardHoverSound();
                        setMaxJapa(n);
                        setJapaCount(0);
                      }}
                      className={`px-2 py-0.5 rounded font-bold transition-colors cursor-pointer ${
                        maxJapa === n
                          ? "bg-amber-400 text-slate-950"
                          : "text-amber-200/70 hover:text-amber-100"
                      }`}
                    >
                      {n}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommended Seed Mantra */}
              <div className="mt-3.5 p-3 rounded-xl bg-amber-950/40 border border-amber-500/20 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                  Recommended Seed Mantra
                </span>
                <div className="font-serif font-bold text-sm text-amber-200">
                  {activeAffirmation.seedMantra}
                </div>
              </div>

              {/* Progress Bar & Counter */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-amber-200/70 text-[11px]">Breath Repetitions:</span>
                  <span className="font-mono font-bold text-amber-300">
                    {japaCount} / {maxJapa}
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden border border-amber-500/20">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-300 rounded-full"
                    style={{ width: `${(japaCount / maxJapa) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Tap Bead Button */}
            <div className="space-y-2 pt-2">
              {japaCount >= maxJapa ? (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-1">
                  <div className="text-xs font-bold text-emerald-300 flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Sadhana Complete
                  </div>
                  <div className="text-[11px] text-emerald-200/80">
                    May this sacred intention bless your path today.
                  </div>
                  <button
                    onClick={() => setJapaCount(0)}
                    className="mt-1 text-[10px] text-amber-300 underline hover:text-white cursor-pointer"
                  >
                    Restart Repetition
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleIncrementJapa}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-950/50"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Tap to Recite ({japaCount + 1}/{maxJapa})</span>
                </button>
              )}

              <div className="text-center text-[10px] text-amber-300/50">
                Take a slow, deep breath with each recitation.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Ribbon with Spiritual Tip */}
      <div className="relative z-10 pt-4 border-t border-amber-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-200/60 font-sans">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>
            <strong>Vedic Sages' Guidance:</strong> Reciting an affirmation three times during Brahma Muhurta (dawn) anchors it into the subconscious memory.
          </span>
        </div>

        {onExploreMore && (
          <button
            onClick={onExploreMore}
            className="text-amber-300 hover:text-amber-100 font-semibold flex items-center gap-1 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>Explore All Mantras &amp; Wisdom</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </section>
  );
};
