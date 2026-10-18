import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DivisionalChartType, PlanetPosition, HouseDetail } from "../types";
import { 
  VARGA_CATEGORIES, 
  ALL_VARGA_CHARTS_MAP, 
  getVargaCategoryByChartId,
  VIMSOPAKA_SCHEME_TABLE,
  VargaCategoryGroup,
  VargaChartInfo 
} from "../data/vargaCategoriesData";
import { 
  User, 
  Coins, 
  Users, 
  Home, 
  Baby, 
  HeartHandshake, 
  Briefcase, 
  Shield, 
  Car, 
  Sparkles, 
  GraduationCap, 
  Compass,
  CheckCircle2,
  Layers,
  Info,
  Sliders,
  Award,
  Zap,
  BookOpen,
  Activity,
  Cpu
} from "lucide-react";
import { playCardHoverSound, playCardFlipSound } from "../utils/audioEffects";

interface CategorizedVargaSelectorProps {
  selectedChart: DivisionalChartType;
  onSelectChart: (chart: DivisionalChartType) => void;
  chartEngine: "d3" | "traditional" | "aspect_wheel";
  onEngineChange: (engine: "d3" | "traditional" | "aspect_wheel") => void;
  analysisLevel?: "normal" | "advanced";
  onAnalysisLevelChange?: (level: "normal" | "advanced") => void;
  planets?: PlanetPosition[];
  houses?: HouseDetail[];
  lagnaSign?: string;
}

export const CategorizedVargaSelector: React.FC<CategorizedVargaSelectorProps> = ({
  selectedChart,
  onSelectChart,
  chartEngine,
  onEngineChange,
  analysisLevel: externalAnalysisLevel,
  onAnalysisLevelChange,
  planets = [],
  houses = [],
  lagnaSign = "Aries"
}) => {
  const [internalLevel, setInternalLevel] = useState<"normal" | "advanced">("normal");
  const analysisLevel = externalAnalysisLevel !== undefined ? externalAnalysisLevel : internalLevel;

  const handleLevelToggle = (lvl: "normal" | "advanced") => {
    playCardFlipSound();
    if (onAnalysisLevelChange) {
      onAnalysisLevelChange(lvl);
    } else {
      setInternalLevel(lvl);
    }
  };

  const activeCategory = getVargaCategoryByChartId(selectedChart) || VARGA_CATEGORIES[0];
  const [activeCategoryId, setActiveCategoryId] = useState<string>(activeCategory.id);
  const [viewMode, setViewMode] = useState<"categories" | "all_matrix">("categories");
  const [showVimsopakaTable, setShowVimsopakaTable] = useState<boolean>(false);

  // Map category icon name to Lucide component
  const getCategoryIcon = (iconName: string, className = "w-4 h-4") => {
    switch (iconName) {
      case "User": return <User className={className} />;
      case "Coins": return <Coins className={className} />;
      case "Users": return <Users className={className} />;
      case "Home": return <Home className={className} />;
      case "Baby": return <Baby className={className} />;
      case "HeartHandshake": return <HeartHandshake className={className} />;
      case "Briefcase": return <Briefcase className={className} />;
      case "Shield": return <Shield className={className} />;
      case "Car": return <Car className={className} />;
      case "Sparkles": return <Sparkles className={className} />;
      case "GraduationCap": return <GraduationCap className={className} />;
      case "Compass": default: return <Compass className={className} />;
    }
  };

  const handleCategoryClick = (category: VargaCategoryGroup) => {
    playCardHoverSound();
    setActiveCategoryId(category.id);
    if (!category.charts.some(c => c.id === selectedChart)) {
      onSelectChart(category.charts[0].id);
    }
  };

  const handleChartClick = (chart: VargaChartInfo) => {
    playCardFlipSound();
    onSelectChart(chart.id);
    const cat = getVargaCategoryByChartId(chart.id);
    if (cat) setActiveCategoryId(cat.id);
  };

  const currentChartInfo = ALL_VARGA_CHARTS_MAP[selectedChart] || ALL_VARGA_CHARTS_MAP["D1"];
  const currentCategoryGroup = VARGA_CATEGORIES.find(c => c.id === activeCategoryId) || activeCategory;

  return (
    <div className="bg-white rounded-3xl border border-amber-900/10 shadow-xs p-5 sm:p-6 space-y-5">
      {/* Top Header with Level Switcher & Visualizer Engine Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
              12 Classical Domains (षोडशवर्ग)
            </span>
            <span className="text-xs font-semibold text-slate-500">D1 to D60 System</span>
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
              analysisLevel === "advanced" 
                ? "bg-purple-900 text-purple-200 border-purple-700" 
                : "bg-emerald-100 text-emerald-800 border-emerald-300"
            }`}>
              {analysisLevel === "advanced" ? "⚡ Advanced Micro-Analysis" : "🌟 Normal Analysis"}
            </span>
          </div>
          <h3 className="font-serif font-bold text-slate-900 text-lg sm:text-xl mt-1">
            Categorized Divisional Varga Charts
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            {analysisLevel === "normal"
              ? "Practical life readings organized across 12 fundamental domains from Foundation to Advanced."
              : "Parashari Vimsopaka Balas, subtle harmonic angles, and microscopic past-life karmic roots (D1-D60)."}
          </p>
        </div>

        {/* Controls: Normal vs Advanced Toggle + Engine Selector */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {/* Analysis Level Toggle */}
          <div className="flex bg-slate-900 p-1 rounded-2xl border border-amber-500/30 text-xs font-semibold shadow-inner">
            <button
              onClick={() => handleLevelToggle("normal")}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                analysisLevel === "normal"
                  ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Normal</span>
            </button>
            <button
              onClick={() => handleLevelToggle("advanced")}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                analysisLevel === "advanced"
                  ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Advanced</span>
            </button>
          </div>

          {/* Engine Selector */}
          <div className="flex bg-amber-100/70 p-1 rounded-2xl text-xs font-semibold">
            <button
              onClick={() => onEngineChange("d3")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                chartEngine === "d3" 
                  ? "bg-slate-900 text-amber-300 shadow-xs font-bold" 
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              D3 Interactive
            </button>
            <button
              onClick={() => onEngineChange("aspect_wheel")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                chartEngine === "aspect_wheel" 
                  ? "bg-slate-900 text-amber-300 shadow-xs font-bold" 
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Aspect Radar
            </button>
            <button
              onClick={() => onEngineChange("traditional")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                chartEngine === "traditional" 
                  ? "bg-slate-900 text-amber-300 shadow-xs font-bold" 
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Traditional SVG
            </button>
          </div>

          {/* Matrix View Toggle */}
          <button
            onClick={() => setViewMode(viewMode === "categories" ? "all_matrix" : "categories")}
            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-900/10 text-amber-900 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Toggle between categorized view and full 16-varga matrix"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{viewMode === "categories" ? "16-Varga Matrix" : "Categorized View"}</span>
          </button>
        </div>
      </div>

      {/* 12 Categorized Horizontal Quick Selector Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Select Life Domain (12 Categories)
          </span>
          <span className="text-[11px] text-amber-900 font-semibold">
            Active Category: <span className="font-bold">{currentCategoryGroup.name}</span> ({currentCategoryGroup.sanskritName})
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {VARGA_CATEGORIES.map((cat) => {
            const isCatActive = activeCategoryId === cat.id;
            const hasSelectedChart = cat.charts.some(c => c.id === selectedChart);
            const isAdvancedCategory = cat.id === "advanced";

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs whitespace-nowrap border transition-all shrink-0 ${
                  isCatActive || hasSelectedChart
                    ? "bg-slate-900 text-amber-300 border-amber-500 font-bold shadow-xs scale-102"
                    : "bg-amber-50/50 hover:bg-amber-100/70 text-slate-700 border-amber-900/10"
                }`}
              >
                <div className={`p-1 rounded-lg ${isCatActive || hasSelectedChart ? "bg-amber-400 text-slate-950" : "bg-amber-200/60 text-amber-900"}`}>
                  {getCategoryIcon(cat.iconName, "w-3.5 h-3.5")}
                </div>
                <span>
                  {cat.name} {cat.id === "advanced" ? "(D27-D60)" : `(${cat.charts[0].code})`}
                </span>
                {isAdvancedCategory && (
                  <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded-md ${
                    isCatActive ? "bg-amber-400 text-slate-950" : "bg-purple-100 text-purple-900"
                  }`}>
                    5 Charts
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categorized Content / Grid */}
      {viewMode === "categories" ? (
        <div className="space-y-4">
          {/* Active Category Charts Sub-Selector */}
          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-900/10 space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-200 text-amber-900 rounded-xl font-bold">
                  {getCategoryIcon(currentCategoryGroup.iconName, "w-5 h-5")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif font-bold text-slate-900 text-base">{currentCategoryGroup.name} Domain</h4>
                    <span className="text-xs text-amber-900 font-semibold">({currentCategoryGroup.sanskritName})</span>
                    {currentCategoryGroup.id === "advanced" && (
                      <span className="px-2 py-0.5 bg-purple-200 text-purple-950 text-[10px] font-bold rounded-md">
                        Microscopic Subtle Vargas
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600">{currentCategoryGroup.description}</p>
                </div>
              </div>

              {currentCategoryGroup.charts.length > 1 && (
                <span className="text-[11px] font-bold text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-full shrink-0">
                  {currentCategoryGroup.charts.length} Divisional Charts Available
                </span>
              )}
            </div>

            {/* Charts in this category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-1">
              {currentCategoryGroup.charts.map((chart) => {
                const isSelected = selectedChart === chart.id;
                return (
                  <button
                    key={chart.id}
                    onClick={() => handleChartClick(chart)}
                    className={`p-3 rounded-2xl text-left border transition-all space-y-1 relative overflow-hidden ${
                      isSelected
                        ? "bg-slate-900 text-white border-amber-500 shadow-sm ring-1 ring-amber-400"
                        : "bg-white hover:bg-amber-100/50 text-slate-800 border-amber-900/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-extrabold px-2 py-0.5 rounded-lg ${
                        isSelected ? "bg-amber-400 text-slate-950 font-black" : "bg-amber-100 text-amber-900"
                      }`}>
                        {chart.code}
                      </span>
                      <span className={`text-[10px] font-semibold ${isSelected ? "text-amber-300" : "text-slate-500"}`}>
                        {analysisLevel === "advanced" ? `${chart.vimsopakaWeight} Pts` : `1/${chart.factor}th`}
                      </span>
                    </div>

                    <div className={`font-bold text-xs truncate ${isSelected ? "text-amber-200" : "text-slate-900"}`}>
                      {chart.name}
                    </div>
                    <div className={`text-[10px] line-clamp-2 leading-tight ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                      {chart.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* 16-Varga Matrix Overview by All 12 Categories */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {VARGA_CATEGORIES.map((cat) => {
            return (
              <div key={cat.id} className="bg-amber-50/50 p-3.5 rounded-2xl border border-amber-900/10 space-y-2">
                <div className="flex items-center justify-between border-b border-amber-900/10 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    {getCategoryIcon(cat.iconName, "w-3.5 h-3.5 text-amber-900")}
                    <span className="font-serif font-bold text-xs text-slate-900">{cat.name}</span>
                  </div>
                  <span className="text-[10px] text-amber-900 font-semibold">{cat.sanskritName}</span>
                </div>

                <div className="space-y-1.5">
                  {cat.charts.map((ch) => {
                    const isSelected = selectedChart === ch.id;
                    return (
                      <button
                        key={ch.id}
                        onClick={() => handleChartClick(ch)}
                        className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between border transition-all ${
                          isSelected
                            ? "bg-slate-900 text-amber-300 border-amber-500 font-bold shadow-xs"
                            : "bg-white hover:bg-amber-100 text-slate-700 border-amber-900/10"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                            isSelected ? "bg-amber-400 text-slate-950" : "bg-amber-100 text-amber-900"
                          }`}>
                            {ch.code}
                          </span>
                          <span className="truncate">{ch.name.split(" ")[1] || ch.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] opacity-70">
                            {analysisLevel === "advanced" ? `${ch.vimsopakaWeight}p` : `1/${ch.factor}`}
                          </span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Active Chart Deep Details Banner (Dynamic Normal vs Advanced Presentation) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-amber-950 text-white p-5 sm:p-6 rounded-3xl border border-amber-500/30 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-amber-500/20 pb-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-black text-xs rounded-lg">
                {currentChartInfo.code} Varga
              </span>
              <span className="text-amber-200 font-serif font-bold text-base sm:text-lg">
                {currentChartInfo.name} — {currentChartInfo.sanskritName}
              </span>
              <span className="text-xs px-2.5 py-0.5 bg-white/10 text-amber-200 rounded-full border border-white/10">
                Domain: {currentChartInfo.category}
              </span>
            </div>
            <p className="text-xs text-amber-100 font-medium">
              <span className="text-amber-300 font-bold">Significance:</span> {currentChartInfo.significance}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowVimsopakaTable(!showVimsopakaTable)}
              className="text-xs px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl transition-all font-semibold flex items-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Vimsopaka Weights</span>
            </button>
          </div>
        </div>

        {/* Level-Specific Technical Breakdown */}
        {analysisLevel === "normal" ? (
          /* Normal Analysis View */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-white/5 p-3 rounded-2xl border border-white/5 space-y-1">
              <div className="text-[10px] uppercase font-bold text-amber-300">Core Domain Focus</div>
              <div className="font-semibold text-slate-100">{currentChartInfo.title}</div>
              <div className="text-[11px] text-slate-300">{currentChartInfo.desc}</div>
            </div>

            <div className="bg-white/5 p-3 rounded-2xl border border-white/5 space-y-1">
              <div className="text-[10px] uppercase font-bold text-amber-300">Divisional Factor</div>
              <div className="font-semibold text-slate-100">1/{currentChartInfo.factor}th Micro-Arc</div>
              <div className="text-[11px] text-slate-300">{currentChartInfo.microHarmonicArc}</div>
            </div>

            <div className="bg-white/5 p-3 rounded-2xl border border-white/5 space-y-1">
              <div className="text-[10px] uppercase font-bold text-amber-300">Classical Guidance</div>
              <div className="text-[11px] text-amber-100/80 italic leading-relaxed">
                {currentChartInfo.classicalPurpose}
              </div>
            </div>
          </div>
        ) : (
          /* Advanced Technical Micro-Analysis View */
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-amber-500/10 p-3.5 rounded-2xl border border-amber-500/20 space-y-1">
                <div className="text-[10px] uppercase font-extrabold text-amber-400">Vimsopaka Bala Weight</div>
                <div className="text-sm font-black text-white">{currentChartInfo.vimsopakaWeight} / 20.0 Points</div>
                <div className="text-[10px] text-amber-200/80">
                  {currentChartInfo.vimsopakaWeight >= 3.0 ? "Highest Core Determinant" : currentChartInfo.vimsopakaWeight >= 1.0 ? "Major Life Pillar" : "Subtle Harmonic Weight"}
                </div>
              </div>

              <div className="bg-purple-500/10 p-3.5 rounded-2xl border border-purple-500/20 space-y-1">
                <div className="text-[10px] uppercase font-extrabold text-purple-300">Deities & Guardians</div>
                <div className="text-xs font-bold text-white line-clamp-2">{currentChartInfo.rulingDeities}</div>
                <div className="text-[10px] text-purple-200/80">Governing subtle astral force</div>
              </div>

              <div className="bg-blue-500/10 p-3.5 rounded-2xl border border-blue-500/20 space-y-1">
                <div className="text-[10px] uppercase font-extrabold text-blue-300">Harmonic Degree Span</div>
                <div className="text-xs font-bold text-white">{currentChartInfo.microHarmonicArc}</div>
                <div className="text-[10px] text-blue-200/80">Division Factor: {currentChartInfo.factor}x</div>
              </div>

              <div className="bg-emerald-500/10 p-3.5 rounded-2xl border border-emerald-500/20 space-y-1">
                <div className="text-[10px] uppercase font-extrabold text-emerald-300">Classical Citation</div>
                <div className="text-xs font-bold text-white">Brihat Parashara Hora</div>
                <div className="text-[10px] text-emerald-200/80">Shodashavarga Adhyaya</div>
              </div>
            </div>

            {/* Key Parashari Principles & Technical Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-2">
                <div className="text-[11px] font-bold uppercase text-amber-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Key Astrological Principles
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  {currentChartInfo.keyPrinciples.map((principle, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-2">
                <div className="text-[11px] font-bold uppercase text-amber-300 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  Divisional Indicators
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentChartInfo.technicalIndicators.map((ind, idx) => (
                    <div key={idx} className="bg-white/5 p-2 rounded-xl border border-white/5">
                      <div className="text-[9px] text-slate-400 uppercase font-bold">{ind.name}</div>
                      <div className="font-semibold text-amber-200 text-[11px] truncate">{ind.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Collapsible Vimsopaka Weightage Table Modal / Drawer */}
        {showVimsopakaTable && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-slate-900/90 p-4 rounded-2xl border border-amber-500/30 space-y-3 mt-2"
          >
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <div className="font-serif font-bold text-amber-300 text-sm">
                Classical Parashari Shodashavarga Vimsopaka Scheme (20.0 Points Total)
              </div>
              <button
                onClick={() => setShowVimsopakaTable(false)}
                className="text-[10px] text-slate-400 hover:text-white font-bold px-2 py-0.5 rounded bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-xs">
              {VIMSOPAKA_SCHEME_TABLE.map((item) => {
                const isThis = item.code === selectedChart;
                return (
                  <div
                    key={item.code}
                    onClick={() => onSelectChart(item.code as DivisionalChartType)}
                    className={`p-2 rounded-xl cursor-pointer transition-all border text-center ${
                      isThis 
                        ? "bg-amber-400 text-slate-950 font-black border-amber-300 shadow-sm" 
                        : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
                    }`}
                  >
                    <div className="font-bold text-xs">{item.code}</div>
                    <div className="text-[11px] font-semibold">{item.weight} pts</div>
                    <div className="text-[9px] truncate opacity-80">{item.name}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
