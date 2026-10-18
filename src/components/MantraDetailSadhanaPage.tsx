import React, { useState, useEffect, useRef } from "react";
import { MantraItem } from "../data/mantrasData";
import { AmbientSoundMixer } from "./AmbientSoundMixer";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Sparkles, 
  Shield, 
  Flame, 
  Clock, 
  Compass, 
  Layers, 
  BookOpen, 
  Heart, 
  AlertCircle, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Sliders, 
  Share2, 
  Award,
  Sun,
  Moon
} from "lucide-react";
import { playSingingBowlChime, playTempleGong } from "../utils/audioEffects";

interface MantraDetailSadhanaPageProps {
  mantra: MantraItem;
  allMantras: MantraItem[];
  onBack: () => void;
  onSelectMantra: (mantra: MantraItem) => void;
}

export const MantraDetailSadhanaPage: React.FC<MantraDetailSadhanaPageProps> = ({
  mantra,
  allMantras,
  onBack,
  onSelectMantra,
}) => {
  // Japa Mala interactive state
  const [beadCount, setBeadCount] = useState<number>(0);
  const [completedMalas, setCompletedMalas] = useState<number>(0);
  const [targetMalas, setTargetMalas] = useState<number>(1);
  const [autoChantActive, setAutoChantActive] = useState<boolean>(false);
  const [autoChantSpeed, setAutoChantSpeed] = useState<number>(4); // seconds per chant
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"ritual_vidhi" | "astrology_remedy" | "scripture_meaning">("ritual_vidhi");

  const autoChantTimerRef = useRef<any>(null);

  // Find index in allMantras for Prev / Next navigation
  const currentIndex = allMantras.findIndex((m) => m.id === mantra.id);
  const prevMantra = currentIndex > 0 ? allMantras[currentIndex - 1] : null;
  const nextMantra = currentIndex < allMantras.length - 1 ? allMantras[currentIndex + 1] : null;

  // Handle single bead click
  const handleBeadClick = () => {
    playSingingBowlChime();
    setBeadCount((prev) => {
      if (prev + 1 >= 108) {
        playTempleGong();
        setCompletedMalas((m) => m + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // Reset beads
  const handleResetJapa = () => {
    setBeadCount(0);
    setCompletedMalas(0);
    setAutoChantActive(false);
  };

  // Auto-chant loop
  useEffect(() => {
    if (autoChantActive) {
      autoChantTimerRef.current = setInterval(() => {
        handleBeadClick();
      }, autoChantSpeed * 1000);
    } else {
      if (autoChantTimerRef.current) {
        clearInterval(autoChantTimerRef.current);
      }
    }
    return () => {
      if (autoChantTimerRef.current) {
        clearInterval(autoChantTimerRef.current);
      }
    };
  }, [autoChantActive, autoChantSpeed]);

  // Copy text handler
  const handleCopyText = () => {
    const text = `${mantra.title}\n\n${mantra.sanskritScript}\n\n${mantra.transliteration}\n\nMeaning: ${mantra.meaning}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-24 max-w-6xl mx-auto">
      {/* Top Sticky Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-amber-900/10 shadow-xs flex flex-wrap items-center justify-between gap-4 sticky top-4 z-40">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Mantras Catalog</span>
        </button>

        {/* Breadcrumbs */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="hover:text-amber-800 cursor-pointer" onClick={onBack}>Mantras Sanctuary</span>
          <span>/</span>
          <span className="text-amber-800 font-bold">{mantra.category}</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate max-w-[200px]">{mantra.title}</span>
        </div>

        {/* Prev / Next & Action Controls */}
        <div className="flex items-center gap-2">
          {prevMantra && (
            <button
              onClick={() => onSelectMantra(prevMantra)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center gap-1 cursor-pointer transition-colors"
              title={`Previous: ${prevMantra.title}`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>
          )}

          {nextMantra && (
            <button
              onClick={() => onSelectMantra(nextMantra)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center gap-1 cursor-pointer transition-colors"
              title={`Next: ${nextMantra.title}`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleCopyText}
            className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs flex items-center gap-1 cursor-pointer transition-colors border border-amber-200/60"
            title="Copy Sanskrit & Roman text"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{isCopied ? "Copied" : "Copy Mantra"}</span>
          </button>
        </div>
      </div>

      {/* Hero Presentation Card */}
      <div className="bg-linear-to-br from-[#1A140F] via-slate-950 to-[#120E0A] text-amber-100 p-6 sm:p-10 rounded-3xl border border-amber-500/30 shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Background Watermark */}
        <div className="absolute right-4 -bottom-10 opacity-5 pointer-events-none font-serif text-[180px] select-none text-amber-400">
          ॐ
        </div>

        <div className="space-y-6 relative z-10">
          {/* Categorical Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {mantra.category}
            </span>
            {mantra.mantraType && (
              <span className="px-3 py-1 rounded-full bg-slate-800/80 text-amber-200 text-xs font-semibold border border-slate-700">
                {mantra.mantraType} Canon
              </span>
            )}
            {mantra.deity && (
              <span className="px-3 py-1 rounded-full bg-amber-950/60 text-amber-300 text-xs font-semibold border border-amber-500/20">
                Presiding Deity: {mantra.deity}
              </span>
            )}
            {mantra.associatedPlanet && (
              <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-300 text-xs border border-slate-700 flex items-center gap-1">
                <Sun className="w-3 h-3 text-amber-400" />
                {mantra.associatedPlanet}
              </span>
            )}
          </div>

          {/* Titles */}
          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100 tracking-tight">
              {mantra.title}
            </h1>
            {mantra.sanskritTitle && (
              <div className="font-serif text-lg sm:text-xl text-amber-300/90 font-medium">
                {mantra.sanskritTitle}
              </div>
            )}
          </div>

          {/* Sanskrit Script Sacred Display Box */}
          <div className="bg-amber-950/30 p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-inner space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">
                मूल संस्कृत मंत्र (Devanagari Sacred Inscription)
              </span>
              <span className="text-xs text-amber-300/80 font-mono">
                Preserve pure acoustic vibration
              </span>
            </div>

            <p className="font-serif text-xl sm:text-3xl leading-relaxed sm:leading-loose text-amber-100 text-center tracking-wide font-medium py-2">
              {mantra.sanskritScript}
            </p>

            <div className="pt-4 border-t border-amber-500/20 space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
                IAST Roman Transliteration:
              </span>
              <p className="font-mono text-xs sm:text-sm text-amber-200/90 leading-relaxed italic text-center">
                {mantra.transliteration}
              </p>
            </div>
          </div>

          {/* Spiritual Meaning & Purpose */}
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Scriptural Translation &amp; Significance</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {mantra.meaning}
            </p>
          </div>
        </div>
      </div>

      {/* AMBIENT SOUND MIXER WITH SOLFEGGIO HERTZ (Integrated Soundscape Console) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="space-y-0.5">
            <h2 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-600" />
              <span>Meditation Hertz &amp; Ambient Soundscape Console</span>
            </h2>
            <p className="text-xs text-slate-500">
              Harmonize this mantra with multi-track Solfeggio frequencies (396Hz–963Hz), sacred 136.1Hz Om drone, and acoustic tanpura.
            </p>
          </div>
        </div>

        <AmbientSoundMixer mantraTitle={mantra.title} initialIsOpen={true} />
      </div>

      {/* JAPA SANKALPA MEDITATION CONSOLE (108 Beads Tracker) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-800 tracking-wider uppercase flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              108 Sacred Bead Japa Tracker
            </span>
            <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
              Active Sadhana &amp; Mala Counter
            </h3>
            <p className="text-xs text-slate-500">
              Click the bead counter or activate auto-chant to maintain rhythmic contemplation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Target Malas Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl text-xs">
              <span className="text-slate-500 font-medium">Sankalpa Goal:</span>
              {[1, 3, 11, 21].map((count) => (
                <button
                  key={count}
                  onClick={() => setTargetMalas(count)}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    targetMalas === count ? "bg-amber-600 text-white" : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {count} {count === 1 ? "Mala" : "Malas"}
                </button>
              ))}
            </div>

            <button
              onClick={handleResetJapa}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs flex items-center gap-1 cursor-pointer transition-colors"
              title="Reset Counter"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Counter Display & Bead Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Primary Clickable Bead Button */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-linear-to-b from-amber-50 to-orange-50/40 rounded-3xl border border-amber-200/80 space-y-4">
            <button
              onClick={handleBeadClick}
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-linear-to-br from-amber-500 via-amber-600 to-amber-700 text-white shadow-xl shadow-amber-900/30 flex flex-col items-center justify-center gap-1 hover:scale-105 active:scale-95 transition-all cursor-pointer border-4 border-amber-300/40 select-none group"
            >
              <span className="text-xs uppercase tracking-widest text-amber-200 font-bold group-hover:text-white transition-colors">
                Chant Bead
              </span>
              <span className="text-5xl sm:text-6xl font-serif font-extrabold tracking-tight">
                {beadCount}
              </span>
              <span className="text-xs text-amber-200/90 font-mono">
                of 108 Beads
              </span>
            </button>
            <p className="text-xs text-amber-900/70 text-center font-medium">
              Click anywhere on the orb per repetition. Each click chimes the singing bowl.
            </p>
          </div>

          {/* Progress Metrics & Auto-Chant Options */}
          <div className="lg:col-span-7 space-y-5">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Current Mala Progress ({Math.round((beadCount / 108) * 100)}%)</span>
                <span>{beadCount} / 108</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="h-full bg-linear-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-300 shadow-xs"
                  style={{ width: `${(beadCount / 108) * 100}%` }}
                />
              </div>
            </div>

            {/* Total Completed Malas */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-xs text-slate-500 font-medium">Completed Malas</span>
                <div className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
                  <span>{completedMalas}</span>
                  {completedMalas >= targetMalas && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 inline-flex items-center gap-1">
                      <Award className="w-3 h-3" /> Sankalpa Fulfilled
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-xs text-slate-500 font-medium">Total Chants Logged</span>
                <div className="text-2xl font-serif font-bold text-amber-700">
                  {completedMalas * 108 + beadCount}
                </div>
              </div>
            </div>

            {/* Auto-Chant Pacing Mechanism */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-bold text-slate-900">Auto-Chant Pacing Loop</span>
                </div>
                <button
                  onClick={() => setAutoChantActive(!autoChantActive)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    autoChantActive
                      ? "bg-rose-600 text-white shadow-sm"
                      : "bg-amber-600 text-white hover:bg-amber-700 shadow-sm"
                  }`}
                >
                  {autoChantActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{autoChantActive ? "Pause Auto" : "Start Auto"}</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Rhythm Interval:</span>
                <div className="flex items-center gap-1">
                  {[2, 3, 4, 6, 8, 10].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => setAutoChantSpeed(sec)}
                      className={`px-2 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        autoChantSpeed === sec
                          ? "bg-amber-700 text-white"
                          : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED GUIDANCE, RULES & RITUALS (विधि, नियम व शास्त्रीय अनुष्ठान विधान) */}
      <div className="bg-white rounded-3xl border border-amber-900/10 shadow-lg overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-slate-200 bg-slate-50/80 p-2 gap-2">
          {[
            { id: "ritual_vidhi", label: "Complete Ritual Vidhi & Rules (विधि व नियम)" },
            { id: "astrology_remedy", label: "Astrological Afflictions & Problems Solved" },
            { id: "scripture_meaning", label: "Scriptural Authority & Commentary" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white text-amber-900 shadow-xs border border-amber-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Comprehensive Shastric Ritual Vidhi & Rules */}
        {activeTab === "ritual_vidhi" && (
          <div className="p-6 sm:p-8 space-y-8">
            {/* Quick Ritual Matrix */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-600" />
                <span>Ritual Parameters Matrix (अनुष्ठान सामग्री व विधान)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                    Preferred Japa Mala
                  </span>
                  <p className="text-xs text-slate-900 font-semibold">
                    {mantra.ritualGuidance.preferredMala || "Rudraksha or Sphatik Mala (108 beads)"}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" /> Auspicious Facing Direction
                  </span>
                  <p className="text-xs text-slate-900 font-semibold">
                    {mantra.ritualGuidance.direction || "East (Purva) or North (Uttara)"}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Ideal Time &amp; Muhurta
                  </span>
                  <p className="text-xs text-slate-900 font-semibold">
                    {mantra.ritualGuidance.idealTime || "Brahma Muhurta (4:00 AM – 6:00 AM) or Sunset Twilight"}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                    Prescribed Japa Count
                  </span>
                  <p className="text-xs text-slate-900 font-semibold">
                    {mantra.ritualGuidance.japaCount || "108 times daily (1 Mala)"}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                    Aasana &amp; Attire Color
                  </span>
                  <p className="text-xs text-slate-900 font-semibold">
                    {mantra.ritualGuidance.aasanaAndCloth || "Pure Woolen / Silk Mat with white or yellow clothes"}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                    Recommended Offerings
                  </span>
                  <p className="text-xs text-slate-900 font-semibold">
                    {mantra.ritualGuidance.recommendedOfferings || "Pure cow ghee lamp, dhoop incense, and fresh flowers"}
                  </p>
                </div>
              </div>
            </div>

            {/* Classical 4-Stage Sadhana Procedure */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-600" />
                <span>Standard Classical 4-Stage Sadhana Procedure</span>
              </h3>

              <div className="space-y-3">
                {/* Step 1 */}
                <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-2">
                  <h4 className="font-bold text-sm text-amber-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    <span>Purva Karma — Preparation &amp; Inner Purification (पूर्व कर्म)</span>
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-8">
                    <li><strong>Snana (Purifying Bath):</strong> Take a clean morning bath before sunrise; wear clean, unstitched or freshly washed clothes.</li>
                    <li><strong>Aasana Shuddhi:</strong> Spread a woolen mat or kusha grass mat. Sprinkle sacred water reciting <em>Om Apavitrah Pavitro Va</em>.</li>
                    <li><strong>Aachamana:</strong> Sip water thrice from the right palm using a copper spoon while reciting <em>Om Keshavaya Namah, Om Narayanaya Namah, Om Madhavaya Namah</em>, then wash hands reciting <em>Om Govindaya Namah</em>.</li>
                    <li><strong>Tilak:</strong> Apply sandalwood paste or sacred vibhuti between the eyebrows (Ajna chakra).</li>
                    <li><strong>Sankalpa:</strong> Hold water, raw rice (Akshat), and a flower in your right palm. Pronounce your Gotra, name, the tithi, and state your devotional intention before offering the water to the earth.</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-2">
                  <h4 className="font-bold text-sm text-amber-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    <span>Pradhana Karma — Chanting Mechanics &amp; Sacred Mudra (प्रधान कर्म)</span>
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-8">
                    <li><strong>Mala Technique:</strong> Hold the rosary inside a cloth bag (Gaumukhi) at heart level. Rotate beads with the thumb and middle finger. <em>The index finger (tarjani) represents the ego and must never contact the rosary beads.</em></li>
                    <li><strong>Meru Bead Inviolability:</strong> When you arrive at the large central Guru bead (Meru) after 108 chants, do not cross over it. Turn the mala around and count in reverse.</li>
                    <li><strong>The Three Chanting Modes:</strong>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-1">
                        <div className="bg-white p-2.5 rounded-xl border border-amber-200 text-slate-800">
                          <strong>1. Vaikhari (Audible):</strong> Distinct audible chanting. Essential for beginners to anchor wandering attention.
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-amber-200 text-slate-800">
                          <strong>2. Upamshu (Whisper):</strong> Subtle lip and tongue movement without audible voice. Considered 100x more potent.
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-amber-200 text-slate-800">
                          <strong>3. Manasika (Mental):</strong> Silent repetition inside pure consciousness. Considered 1,000x more potent than audible.
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-2">
                  <h4 className="font-bold text-sm text-amber-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                    <span>Uttara Karma — Dedication &amp; Forgiveness (उत्तर कर्म व समर्पण)</span>
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-8">
                    <li><strong>Japa Samarpanam:</strong> Pour a spoonful of water into your right palm and recite: <em>Guhyati Guhya Gopta Tvam Grihanasmat-Kritam Japam, Siddhir Bhavatu Me Deva Tvat-Prasadat Tvayi Sthite</em> ("O Secret of Secrets, please accept my humble recitation; may all spiritual fruit be sanctified by Thy grace").</li>
                    <li><strong>Kshamapana:</strong> Pray for forgiveness for any imperfect enunciation, distracted thoughts, or omissions during the sadhana.</li>
                    <li><strong>Mala Reverence:</strong> Touch the Meru bead to your forehead and eyes before carefully placing the rosary back inside its sacred bag.</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-2">
                  <h4 className="font-bold text-sm text-amber-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-bold">
                      4
                    </span>
                    <span>Specific Shastric Niyamas (नियम व संयम)</span>
                  </h4>
                  <p className="text-xs text-slate-700 font-medium">
                    {mantra.ritualGuidance.niyamaAndRules || "Maintain truthfulness, a satvik vegetarian diet, and celibacy (brahmacharya) throughout the anushthana period."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Astrological Afflictions & Problems Solved */}
        {activeTab === "astrology_remedy" && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Problem Solved */}
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
                  <Shield className="w-5 h-5 text-emerald-700" />
                  <span>Target Life Problems Alleviated</span>
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {mantra.problemSolved || "Relieves planetary agitation, psychological restlessness, and establishes spiritual stability."}
                </p>
                <div className="text-xs text-emerald-800 bg-white p-3 rounded-xl border border-emerald-100 space-y-1">
                  <strong>Expected Empirical Results:</strong>
                  <p className="text-slate-600">
                    Gradual dissolution of karmic resistance, restored confidence, harmonious relationships, and enhanced mental clarity.
                  </p>
                </div>
              </div>

              {/* Astrological Affliction */}
              <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
                  <Sun className="w-5 h-5 text-amber-700" />
                  <span>Astrological &amp; Planetary Afflictions</span>
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {mantra.astrologicalAffliction || "General planetary malefic transits, dasha transitions, and natal weaknesses."}
                </p>
                <div className="text-xs text-amber-800 bg-white p-3 rounded-xl border border-amber-100 space-y-1">
                  <strong>Parashari &amp; Jaimini Remedy Context:</strong>
                  <p className="text-slate-600">
                    Chanting energizes the planetary Karaka, pacifies afflicted houses (especially 6th, 8th, and 12th Dusthanas), and awakens the benefic strength of Lagnesha.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Scriptural Authority & Commentary */}
        {activeTab === "scripture_meaning" && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <span>Scriptural Authority &amp; Shastra Context</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                This sacred composition originates from the authentic Vedic, Puranic, or Tantrik agamic corpus. In classical Sanatana Dharma, a mantra is defined as <em>Mananat Trayate Iti Mantrah</em> — that divine vibration which protects and liberates the consciousness through contemplative repetition.
              </p>
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 space-y-2">
                <strong>Vedic Pronunciation Guidance:</strong>
                <p className="text-slate-600 leading-relaxed">
                  Carefully preserve the long and short vowel lengths (hrasva and deergha) and maintain the nasal resonance (Anusvara). When chanting with devotion and pure intention, the sound currents dissolve mental agitations and link personal prana directly with cosmic consciousness.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
