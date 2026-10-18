import React, { useState, useEffect } from "react";
import { 
  MODERN_SWITCH_WORDS_CATALOG, 
  MODERN_SWITCHWORDS_RULES, 
  ModernSwitchWordItem 
} from "../data/modernSwitchWordsData";
import { 
  Sparkles, 
  Search, 
  BookOpen, 
  Check, 
  Copy, 
  Droplet, 
  Shield, 
  PenTool, 
  RotateCcw, 
  Sliders, 
  ChevronDown,
  ChevronUp,
  X,
  Compass,
  Heart,
  Briefcase,
  Zap,
  Activity,
  Circle
} from "lucide-react";
import { playSingingBowlChime, playTempleGong } from "../utils/audioEffects";

interface ModernSwitchWordsViewProps {
  onOpenAmbientMixer?: () => void;
}

export const ModernSwitchWordsView: React.FC<ModernSwitchWordsViewProps> = ({ onOpenAmbientMixer }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeChantCounts, setActiveChantCounts] = useState<Record<string, number>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [rulesExpanded, setRulesExpanded] = useState<boolean>(false);
  
  // Interactive Energy Circle (EC) Generator State
  const [ecModalItem, setEcModalItem] = useState<ModernSwitchWordItem | null>(null);
  const [ecTargetName, setEcTargetName] = useState<string>("");
  const [ecSelectedColor, setEcSelectedColor] = useState<string>("green");
  const [ecChargeTimer, setEcChargeTimer] = useState<number>(15);
  const [isEcCharging, setIsEcCharging] = useState<boolean>(false);

  const categories = [
    { id: "all", label: `All Switchwords (${MODERN_SWITCH_WORDS_CATALOG.length})` },
    { id: "wealth", label: "💵 Wealth & Finance" },
    { id: "love", label: "💖 Love & Harmony" },
    { id: "health", label: "🧘 Health & Sleep" },
    { id: "career", label: "🚀 Career & Focus" },
    { id: "protection", label: "🛡️ Protection & Defusing" },
  ];

  const filteredItems = MODERN_SWITCH_WORDS_CATALOG.filter((item) => {
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = 
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.triggerMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.applicationScenario.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.switchPairOrPhrase && item.switchPairOrPhrase.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleChantTap = (id: string) => {
    playSingingBowlChime();
    setActiveChantCounts((prev) => {
      const current = (prev[id] || 0) + 1;
      if (current === 28 || current === 54 || current === 108) {
        setTimeout(() => playTempleGong(), 250);
      }
      return { ...prev, [id]: current };
    });
  };

  const handleResetCount = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveChantCounts((prev) => ({ ...prev, [id]: 0 }));
  };

  const handleCopyWord = (item: ModernSwitchWordItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `SWITCHWORD: ${item.word}\nType: ${item.type} | Category: ${item.categoryLabel}\nSubconscious Switch: ${item.triggerMeaning}\nChanting Formula: ${item.chantingFormula}\nMaster Phrase: ${item.switchPairOrPhrase || "N/A"}\nBody Writing: ${item.bodyWritingGuidance}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Energy Circle Timer Loop
  useEffect(() => {
    let interval: any = null;
    if (isEcCharging && ecChargeTimer > 0) {
      interval = setInterval(() => {
        setEcChargeTimer((t) => t - 1);
      }, 1000);
    } else if (ecChargeTimer === 0) {
      playTempleGong();
      setIsEcCharging(false);
    }
    return () => clearInterval(interval);
  }, [isEcCharging, ecChargeTimer]);

  const openEcModal = (item: ModernSwitchWordItem) => {
    setEcModalItem(item);
    setEcTargetName("");
    // Default color matching category
    if (item.category === "wealth") setEcSelectedColor("green");
    else if (item.category === "love") setEcSelectedColor("pink");
    else if (item.category === "health") setEcSelectedColor("blue");
    else if (item.category === "career") setEcSelectedColor("orange");
    else setEcSelectedColor("violet");

    setEcChargeTimer(15);
    setIsEcCharging(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner */}
      <div className="bg-linear-to-r from-slate-950 via-[#0F172A] to-slate-900 text-slate-100 p-6 sm:p-8 rounded-3xl border border-sky-500/30 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-400/20 text-sky-300 text-xs font-semibold border border-sky-500/30">
              <Zap className="w-3.5 h-3.5" /> Subconscious Mind Bypass • James T. Mangan &amp; Radionics
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">
              Modern Switch Words &amp; Energy Circles
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Words that directly trigger subconscious switches to manifest money, romantic love, physical healing, restful sleep, and mental clarity. Includes Energy Circle (EC) broadcast generators and hydro-charging techniques.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onOpenAmbientMixer && (
              <button
                onClick={onOpenAmbientMixer}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 flex items-center gap-2 cursor-pointer transition-all shadow-md"
              >
                <Sliders className="w-4 h-4" />
                <span>Ambient Hertz Mixer</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Rules & Radionic Guidelines Drawer */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <button
          onClick={() => setRulesExpanded(!rulesExpanded)}
          className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 border border-sky-300/60 flex items-center justify-center text-sky-900 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <span>Modern Switchwords: 6 Essential Rules &amp; Protocols</span>
                <span className="text-[11px] font-sans font-semibold bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full">
                  Subconscious Mechanics
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Click to explore the Master word &lsquo;TOGETHER&rsquo;, effortless repetition, Energy Circles, and body skin writing
              </p>
            </div>
          </div>
          <div className="p-2 text-slate-400 hover:text-slate-700 transition-colors">
            {rulesExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {rulesExpanded && (
          <div className="p-5 pt-0 border-t border-slate-100 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              {MODERN_SWITCHWORDS_RULES.map((rule) => (
                <div 
                  key={rule.id}
                  className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/80 space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wider bg-sky-100/70 px-2 py-0.5 rounded-md inline-block">
                      {rule.category}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-slate-900">
                      {rule.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {rule.ruleStatement}
                    </p>
                  </div>
                  <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200/80 text-[11px]">
                    <p className="text-slate-800 font-medium">
                      <strong className="text-sky-800 text-[10px] uppercase font-bold block">How To Practice:</strong>
                      {rule.howToApply}
                    </p>
                    <p className="text-slate-500 text-[10px] italic pt-1 border-t border-slate-100">
                      💡 Tip: {rule.tips}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Categories & Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-slate-900 text-sky-300 shadow-xs"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-sky-400 hover:bg-sky-50/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search word, goal, or phrase..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Grid of Modern Switch Words */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const currentCount = activeChantCounts[item.id] || 0;
          const isCopied = copiedId === item.id;

          // Color accents
          const isGreen = item.category === "wealth";
          const isPink = item.category === "love";
          const isBlue = item.category === "health";

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between space-y-5 relative overflow-hidden"
            >
              <div 
                className={`absolute top-0 left-0 right-0 h-1.5 ${
                  isGreen 
                    ? "bg-emerald-500" 
                    : isPink 
                    ? "bg-rose-500" 
                    : isBlue 
                    ? "bg-sky-500" 
                    : "bg-indigo-500"
                }`} 
              />

              <div className="space-y-4">
                {/* Header Word & Badges */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-mono text-2xl sm:text-3xl font-black text-slate-950 tracking-wide uppercase">
                      {item.word}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                        {item.type} Word
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {item.authorOrigin}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleCopyWord(item, e)}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-xs transition-colors cursor-pointer border border-slate-200/60"
                      title="Copy switchword formula"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => openEcModal(item)}
                      className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs transition-colors cursor-pointer border border-sky-200/60"
                      title="Open Energy Circle (EC) Generator"
                    >
                      <Circle className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Subconscious Switch Definition */}
                <div className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-slate-200/70 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 block">
                    Subconscious Trigger:
                  </span>
                  <p className="text-xs text-slate-800 font-medium leading-relaxed">
                    {item.triggerMeaning}
                  </p>
                </div>

                {/* Application Scenario */}
                <div className="text-xs text-slate-600 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    When to Use:
                  </span>
                  <p className="leading-relaxed bg-white p-2.5 rounded-xl border border-slate-100 text-[11px]">
                    {item.applicationScenario}
                  </p>
                </div>

                {/* Chanting & Master Phrase */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60 space-y-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold">Chanting Formula:</span>
                    <span className="text-slate-800 font-medium">{item.chantingFormula}</span>
                  </div>
                  {item.switchPairOrPhrase && (
                    <div className="pt-1.5 border-t border-slate-200/60">
                      <span className="text-slate-400 block text-[10px] font-semibold">Power Combination Phrase:</span>
                      <span className="font-mono text-sky-950 font-bold text-[11px] bg-sky-100/70 px-2 py-0.5 rounded-md inline-block mt-0.5 select-all">
                        {item.switchPairOrPhrase}
                      </span>
                    </div>
                  )}
                  <div className="pt-1.5 border-t border-slate-200/60">
                    <span className="text-slate-400 block text-[10px] font-semibold">Body Writing Location:</span>
                    <span className="text-slate-700 font-medium">{item.bodyWritingGuidance}</span>
                  </div>
                </div>
              </div>

              {/* Interactive Chanting Tap Counter */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <span>Chanted Count:</span>
                    <span className="font-mono text-sky-900 font-bold text-sm bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200/60">
                      {currentCount}
                    </span>
                    <span className="text-[10px] text-slate-400">/ 28 times</span>
                  </span>

                  {currentCount > 0 && (
                    <button
                      onClick={(e) => handleResetCount(item.id, e)}
                      className="text-[10px] text-slate-400 hover:text-slate-700 flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-linear-to-r from-sky-500 to-indigo-600 h-full rounded-full transition-all duration-150"
                    style={{ width: `${Math.min(100, (currentCount / 28) * 100)}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleChantTap(item.id)}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-sky-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Chant +1</span>
                  </button>

                  <button
                    onClick={() => openEcModal(item)}
                    className="px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Circle className="w-3.5 h-3.5 text-sky-600" />
                    <span>Energy Circle</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Energy Circle (EC) Generator & Water Charger Modal */}
      {ecModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => {
                setEcModalItem(null);
                setIsEcCharging(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-bold">
                <Circle className="w-3.5 h-3.5 text-sky-600" />
                <span>Energy Circle (EC) Radionic Generator</span>
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                Broadcasting {ecModalItem.word}
              </h3>
              <p className="text-xs text-slate-500">
                Radionic Energy Circles broadcast the frequency 24/7. Place a glass of water on this circle for 15 seconds to imprint water with this switchword.
              </p>
            </div>

            {/* Target Person Name or Goal input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Target Name or Goal (Optional):
              </label>
              <input
                type="text"
                placeholder="e.g., John Doe, or 'Rapid Business Revenue'"
                value={ecTargetName}
                onChange={(e) => setEcTargetName(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Color Chooser */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="font-semibold text-slate-600">Circle Border Color:</span>
              <div className="flex items-center gap-2">
                {[
                  { id: "green", bg: "bg-emerald-500", label: "Money" },
                  { id: "pink", bg: "bg-rose-500", label: "Love" },
                  { id: "blue", bg: "bg-sky-500", label: "Health" },
                  { id: "orange", bg: "bg-amber-500", label: "Action" },
                  { id: "violet", bg: "bg-purple-600", label: "Peace" },
                ].map((col) => (
                  <button
                    key={col.id}
                    onClick={() => setEcSelectedColor(col.id)}
                    className={`w-6 h-6 rounded-full ${col.bg} transition-transform cursor-pointer ${
                      ecSelectedColor === col.id ? "ring-2 ring-slate-900 scale-110" : "opacity-60 hover:opacity-100"
                    }`}
                    title={col.label}
                  />
                ))}
              </div>
            </div>

            {/* Real Energy Circle Display Component */}
            <div className="flex justify-center py-4">
              <div 
                className={`w-52 h-52 rounded-full border-4 flex flex-col items-center justify-center p-4 text-center relative shadow-md transition-all ${
                  ecSelectedColor === "green" ? "border-emerald-500 bg-emerald-50/40" :
                  ecSelectedColor === "pink" ? "border-rose-500 bg-rose-50/40" :
                  ecSelectedColor === "blue" ? "border-sky-500 bg-sky-50/40" :
                  ecSelectedColor === "orange" ? "border-amber-500 bg-amber-50/40" :
                  "border-purple-600 bg-purple-50/40"
                } ${isEcCharging ? "animate-pulse" : ""}`}
              >
                {ecTargetName && (
                  <span className="text-[11px] font-bold text-slate-700 truncate max-w-[150px] mb-1">
                    {ecTargetName}
                  </span>
                )}
                <span className="font-mono text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-wider leading-tight">
                  {ecModalItem.switchPairOrPhrase || ecModalItem.word}
                </span>

                <div className="absolute -bottom-2 bg-slate-900 text-sky-300 text-[10px] font-bold px-3 py-0.5 rounded-full">
                  {isEcCharging ? `${ecChargeTimer}s charging...` : "Energy Circle Active"}
                </div>
              </div>
            </div>

            {/* Protocol */}
            <div className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <strong className="text-slate-800 font-bold block text-[10px] uppercase">
                Hydro-Charging Instructions:
              </strong>
              <p className="text-[11px] leading-relaxed">
                Place your glass of water directly on top of the circle (or on your device screen) for 15 seconds. Sip slowly while visualizing your intention already fulfilled.
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setEcChargeTimer(15);
                  setIsEcCharging(true);
                  playSingingBowlChime();
                }}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-sky-300 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                Start 15s Water Charge
              </button>
              <button
                onClick={() => {
                  setEcModalItem(null);
                  setIsEcCharging(false);
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
