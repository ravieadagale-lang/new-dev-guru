import React, { useState, useEffect } from "react";
import { 
  VEDIC_SWITCH_WORDS_CATALOG, 
  VEDIC_SWITCH_WORDS_RULES, 
  VedicSwitchWordItem 
} from "../data/vedicSwitchWordsData";
import { 
  Sparkles, 
  Search, 
  BookOpen, 
  Check, 
  Copy, 
  Droplet, 
  Flame, 
  Shield, 
  Volume2, 
  VolumeX, 
  Clock, 
  PenTool, 
  RotateCcw, 
  Sliders, 
  Info,
  ChevronDown,
  ChevronUp,
  X,
  Play,
  Pause
} from "lucide-react";
import { playSingingBowlChime, playTempleGong, startOmDrone, stopOmDrone } from "../utils/audioEffects";

interface VedicSwitchWordsViewProps {
  onOpenAmbientMixer?: () => void;
}

export const VedicSwitchWordsView: React.FC<VedicSwitchWordsViewProps> = ({ onOpenAmbientMixer }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeMalaCounts, setActiveMalaCounts] = useState<Record<string, number>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [rulesExpanded, setRulesExpanded] = useState<boolean>(false);
  const [chargingModalItem, setChargingModalItem] = useState<VedicSwitchWordItem | null>(null);
  const [chargeTimer, setChargeTimer] = useState<number>(28);
  const [isChargingActive, setIsChargingActive] = useState<boolean>(false);
  const [isDronePlaying, setIsDronePlaying] = useState<boolean>(false);

  // Filter categories
  const categories = [
    { id: "all", label: `All Vedic Codes (${VEDIC_SWITCH_WORDS_CATALOG.length})` },
    { id: "wealth", label: "💰 Wealth & Lakshmi" },
    { id: "health", label: "🌿 Health & Healing" },
    { id: "protection", label: "🛡️ Protection & Armor" },
    { id: "love", label: "❤️ Love & Magnetism" },
    { id: "knowledge", label: "📚 Intelligence & Speech" },
    { id: "planetary", label: "🪐 9 Navagraha Balancing" },
    { id: "combinations", label: "⚡ Sacred Combinations" },
  ];

  const filteredItems = VEDIC_SWITCH_WORDS_CATALOG.filter((item) => {
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = 
      item.syllable.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.devanagari.includes(searchQuery) ||
      item.deity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.coreVibration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.problemSolved.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.doshaRemedy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Tap counter for a specific switch word
  const handleCountChant = (id: string) => {
    playSingingBowlChime();
    setActiveMalaCounts((prev) => {
      const current = (prev[id] || 0) + 1;
      if (current === 28 || current === 108) {
        setTimeout(() => playTempleGong(), 250);
      }
      return { ...prev, [id]: current };
    });
  };

  const handleResetChant = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMalaCounts((prev) => ({ ...prev, [id]: 0 }));
  };

  // Copy handler
  const handleCopy = (item: VedicSwitchWordItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${item.syllable} (${item.devanagari}) — Deity: ${item.deity}\nCore Vibration: ${item.coreVibration}\nChanting Rule: ${item.chantingCount}\nWater Charging: ${item.waterChargingMethod}\nBody Placement: ${item.bodyWritingLocation}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Drone toggle
  const toggleDrone = () => {
    if (isDronePlaying) {
      stopOmDrone();
      setIsDronePlaying(false);
    } else {
      startOmDrone();
      setIsDronePlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopOmDrone();
    };
  }, []);

  // Water Charging Timer Loop
  useEffect(() => {
    let interval: any = null;
    if (isChargingActive && chargeTimer > 0) {
      interval = setInterval(() => {
        setChargeTimer((t) => t - 1);
      }, 1000);
    } else if (chargeTimer === 0) {
      playTempleGong();
      setIsChargingActive(false);
    }
    return () => clearInterval(interval);
  }, [isChargingActive, chargeTimer]);

  const startWaterCharging = (item: VedicSwitchWordItem) => {
    setChargingModalItem(item);
    setChargeTimer(28);
    setIsChargingActive(true);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner */}
      <div className="bg-linear-to-r from-amber-950 via-[#1C140E] to-slate-950 text-amber-100 p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Authentic Tantra Shastra Beej Aksharas &amp; Cosmic Resonance
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
              Vedic Switch Words (वैदिक बीज मंत्र कोड्स)
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
              Single and double-syllable Vedic power seeds that directly stimulate the 72,000 nadis and bypass karmic blocks. Complete with Anusvara phonetics, hydro-vibrational water charging, body writing locations, and planetary remedies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={toggleDrone}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                isDronePlaying
                  ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
                  : "bg-slate-900 border border-amber-500/30 text-amber-300 hover:bg-slate-800"
              }`}
            >
              {isDronePlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isDronePlaying ? "Stop 136.1Hz Drone" : "136.1Hz Om Drone"}</span>
            </button>

            {onOpenAmbientMixer && (
              <button
                onClick={onOpenAmbientMixer}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-200 flex items-center gap-2 cursor-pointer transition-all"
              >
                <Sliders className="w-4 h-4" />
                <span>Ambient Hertz Mixer</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Rules & Canonical Guidelines Drawer */}
      <div className="bg-white rounded-3xl border border-amber-900/10 shadow-xs overflow-hidden">
        <button
          onClick={() => setRulesExpanded(!rulesExpanded)}
          className="w-full p-5 flex items-center justify-between text-left hover:bg-amber-50/40 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300/60 flex items-center justify-center text-amber-900 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <span>Vedic Switch Words: Complete Rules &amp; Sadhana Vidhi</span>
                <span className="text-[11px] font-sans font-semibold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                  6 Core Principles
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Click to expand the exact scriptural rules for Anusvara resonance, water charging, body writing, and timings
              </p>
            </div>
          </div>
          <div className="p-2 text-slate-400 hover:text-amber-800 transition-colors">
            {rulesExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {rulesExpanded && (
          <div className="p-5 pt-0 border-t border-slate-100 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              {VEDIC_SWITCH_WORDS_RULES.map((rule) => (
                <div 
                  key={rule.id}
                  className="bg-[#FAF8F5] p-4 rounded-2xl border border-amber-900/10 space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-100/70 px-2 py-0.5 rounded-md">
                        {rule.sanskritName}
                      </span>
                      {rule.iconType === "sound" && <Volume2 className="w-4 h-4 text-amber-700" />}
                      {rule.iconType === "water" && <Droplet className="w-4 h-4 text-sky-600" />}
                      {rule.iconType === "pen" && <PenTool className="w-4 h-4 text-indigo-600" />}
                      {rule.iconType === "clock" && <Clock className="w-4 h-4 text-emerald-600" />}
                      {rule.iconType === "flame" && <Flame className="w-4 h-4 text-orange-600" />}
                      {rule.iconType === "shield" && <Shield className="w-4 h-4 text-amber-600" />}
                    </div>
                    <h4 className="font-serif font-bold text-sm text-slate-900">
                      {rule.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {rule.description}
                    </p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 text-[11px] text-amber-950 font-medium">
                    <strong className="text-amber-800 block text-[10px] uppercase font-bold">Action Protocol:</strong>
                    {rule.actionableProtocol}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Category Chips */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-slate-900 text-amber-300 shadow-xs"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-amber-400 hover:bg-amber-50/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search syllable, deity, disease, dosha..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Grid of Vedic Switch Words */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const currentChant = activeMalaCounts[item.id] || 0;
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-amber-900/10 shadow-xs hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between space-y-5 relative overflow-hidden group"
            >
              {/* Subtle top accent gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-amber-500 via-orange-400 to-amber-600" />

              <div className="space-y-4">
                {/* Header Syllable & Devanagari */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-3xl font-extrabold text-amber-950 tracking-tight">
                        {item.syllable}
                      </span>
                      <span className="font-serif text-2xl font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
                        {item.devanagari}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 mt-1">
                      {item.deity}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleCopy(item, e)}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-amber-100 text-slate-600 hover:text-amber-900 text-xs transition-colors cursor-pointer border border-slate-200/60"
                      title="Copy details"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => startWaterCharging(item)}
                      className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs transition-colors cursor-pointer border border-sky-200/60"
                      title="Hydro-Vibrational Water Charging Session"
                    >
                      <Droplet className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Metadata Tags */}
                <div className="flex flex-wrap gap-1.5 text-[10px]">
                  <span className="bg-amber-100/70 text-amber-900 font-bold px-2.5 py-0.5 rounded-md">
                    {item.categoryLabel}
                  </span>
                  <span className="bg-slate-100 text-slate-700 font-medium px-2.5 py-0.5 rounded-md">
                    {item.associatedChakra}
                  </span>
                  {item.associatedPlanet && (
                    <span className="bg-orange-50 text-orange-900 font-medium px-2.5 py-0.5 rounded-md border border-orange-200/40">
                      {item.associatedPlanet}
                    </span>
                  )}
                </div>

                {/* Core Vibration & Problem Solved */}
                <div className="space-y-2 text-xs">
                  <p className="text-slate-700 leading-relaxed font-medium bg-[#FAF8F5] p-3 rounded-xl border border-slate-200/60">
                    &ldquo;{item.coreVibration}&rdquo;
                  </p>

                  <div className="bg-emerald-50/70 border border-emerald-200/60 p-2.5 rounded-xl">
                    <strong className="text-[10px] font-bold text-emerald-900 uppercase block tracking-wider">
                      Target Remedies:
                    </strong>
                    <span className="text-[11px] text-emerald-950 font-medium">
                      {item.problemSolved}
                    </span>
                  </div>
                </div>

                {/* Specific Purposes Bullets */}
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
                    Manifestation Spectrum:
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-600">
                    {item.specificPurposes.slice(0, 3).map((purp, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Sparkles className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                        <span>{purp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Detailed Action Vidhi */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 space-y-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold">Chanting Count &amp; Japa:</span>
                    <span className="text-slate-800 font-medium">{item.chantingCount}</span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-200/60">
                    <span className="text-slate-400 block text-[10px] font-semibold">Body Writing Location:</span>
                    <span className="text-slate-800 font-medium">{item.bodyWritingLocation}</span>
                  </div>
                  {item.combinationExample && (
                    <div className="pt-1.5 border-t border-slate-200/60">
                      <span className="text-slate-400 block text-[10px] font-semibold">Sacred Combination:</span>
                      <span className="font-mono text-amber-900 font-bold text-[10px] bg-amber-100/60 px-1.5 py-0.5 rounded-sm inline-block mt-0.5">
                        {item.combinationExample}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive Chanting Tap & Mala Counter */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <span>Beads Chanted:</span>
                    <span className="font-mono text-amber-800 font-bold text-sm bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                      {currentChant}
                    </span>
                    <span className="text-[10px] text-slate-400">/ 28 or 108</span>
                  </span>

                  {currentChant > 0 && (
                    <button
                      onClick={(e) => handleResetChant(item.id, e)}
                      className="text-[10px] text-slate-400 hover:text-slate-700 flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-linear-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-150"
                    style={{ width: `${Math.min(100, (currentChant / 108) * 100)}%` }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleCountChant(item.id)}
                    className="px-3 py-2 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Chant +1</span>
                  </button>

                  <button
                    onClick={() => startWaterCharging(item)}
                    className="px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Droplet className="w-3.5 h-3.5 text-sky-600" />
                    <span>Charge Water</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Water Charging Modal / Simulator */}
      {chargingModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl border border-amber-900/10 shadow-2xl p-6 sm:p-8 space-y-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => {
                setChargingModalItem(null);
                setIsChargingActive(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-bold">
                <Droplet className="w-3.5 h-3.5 text-sky-600" />
                <span>अभिमंत्रित जल संस्कार (Hydro-Vibrational Imprinting)</span>
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                Charge Water with {chargingModalItem.syllable} ({chargingModalItem.devanagari})
              </h3>
              <p className="text-xs text-slate-500">
                Hold a glass of pure water in both hands at heart level. Chant &lsquo;{chargingModalItem.syllable}&rsquo; continuously while projecting your breath gently onto the water surface.
              </p>
            </div>

            {/* Visual Glass & Glowing Seed Syllable */}
            <div className="relative flex items-center justify-center py-6">
              <div className="w-36 h-36 rounded-full border-4 border-dashed border-sky-400/80 flex flex-col items-center justify-center relative bg-sky-50/50 shadow-inner animate-pulse">
                <span className="font-serif text-4xl font-extrabold text-amber-900">
                  {chargingModalItem.devanagari}
                </span>
                <span className="text-xs font-mono font-bold text-amber-700 mt-1">
                  {chargingModalItem.syllable}
                </span>
                <div className="absolute -bottom-2 bg-sky-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  {isChargingActive ? `${chargeTimer}s remaining` : "Charged & Blessed"}
                </div>
              </div>
            </div>

            {/* Instruction protocol */}
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>Prescribed Water Method:</span>
                <span className="text-sky-700">{chargingModalItem.chantingCount}</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                {chargingModalItem.waterChargingMethod}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setChargeTimer(28);
                  setIsChargingActive(true);
                  playSingingBowlChime();
                }}
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                Restart 28s Timer
              </button>
              <button
                onClick={() => {
                  setChargingModalItem(null);
                  setIsChargingActive(false);
                }}
                className="px-5 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Done / Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
