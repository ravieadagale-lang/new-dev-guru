import React, { useState, useMemo } from "react";
import { resolveImageUrl } from "../../utils/imageResolver";
import { 
  Search, 
  Sparkles, 
  Layers, 
  Heart, 
  Briefcase, 
  Coins, 
  Compass, 
  RotateCw, 
  Flame, 
  Droplets, 
  Wind, 
  Mountain, 
  Eye, 
  X, 
  Check, 
  Copy, 
  HelpCircle, 
  Clock, 
  BookOpen, 
  Filter,
  ArrowUpDown,
  LayoutGrid,
  List,
  Table as TableIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TarotCardData, TarotSuit, TarotElement } from "../../types/tarot";
import { MASTER_TAROT_DECK_78 } from "../../data/tarotMasterDeck";
import { TarotCardModal } from "./TarotCardModal";
import { tarotAudio } from "../../services/tarotAudioService";

interface TarotGlossaryProps {
  onSelectCard?: (card: TarotCardData) => void;
  initialSuit?: string;
  initialSearch?: string;
  className?: string;
  showHeroHeader?: boolean;
}

type MeaningCategory = "general" | "love" | "career" | "finance" | "spiritual";
type ViewMode = "cards" | "compact" | "table";
type OrientationMode = "upright" | "reversed" | "both";

export const TarotGlossary: React.FC<TarotGlossaryProps> = ({
  onSelectCard,
  initialSuit = "All",
  initialSearch = "",
  className = "",
  showHeroHeader = true,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedSuit, setSelectedSuit] = useState<string>(initialSuit);
  const [selectedElement, setSelectedElement] = useState<string>("All");
  const [selectedMeaningCategory, setSelectedMeaningCategory] = useState<MeaningCategory>("general");
  const [orientationMode, setOrientationMode] = useState<OrientationMode>("upright");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [yesNoFilter, setYesNoFilter] = useState<string>("All");
  const [selectedCardForModal, setSelectedCardForModal] = useState<TarotCardData | null>(null);
  const [copiedCardId, setCopiedCardId] = useState<string | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Suit Definitions with Elements and Symbolism
  const suitTabs = [
    { id: "All", name: "All 78 Cards", count: 78, element: "All", icon: Layers },
    { id: "Major", name: "Major Arcana", count: 22, element: "Spirit", icon: Sparkles, color: "text-purple-400" },
    { id: "Wands", name: "Suit of Wands", count: 14, element: "Fire", icon: Flame, color: "text-amber-400" },
    { id: "Cups", name: "Suit of Cups", count: 14, element: "Water", icon: Droplets, color: "text-cyan-400" },
    { id: "Swords", name: "Suit of Swords", count: 14, element: "Air", icon: Wind, color: "text-slate-300" },
    { id: "Pentacles", name: "Suit of Pentacles", count: 14, element: "Earth", icon: Mountain, color: "text-emerald-400" },
  ];

  // Filtering Logic
  const filteredCards = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return MASTER_TAROT_DECK_78.filter((card) => {
      // Suit matching
      const matchesSuit =
        selectedSuit === "All" ||
        (selectedSuit === "Major" ? card.arcana === "Major" : card.suit === selectedSuit);

      // Element matching
      const matchesElement =
        selectedElement === "All" || card.element === selectedElement;

      // Yes/No Filter
      const matchesYesNo =
        yesNoFilter === "All" || card.yesNo.toLowerCase().includes(yesNoFilter.toLowerCase());

      // Search Query matching across multiple dimensions
      const matchesSearch =
        q === "" ||
        card.name.toLowerCase().includes(q) ||
        card.suit.toLowerCase().includes(q) ||
        card.arcana.toLowerCase().includes(q) ||
        card.element.toLowerCase().includes(q) ||
        card.rank.toLowerCase().includes(q) ||
        card.archetype.toLowerCase().includes(q) ||
        card.sanskritTitle.toLowerCase().includes(q) ||
        card.astrologyAssociation.toLowerCase().includes(q) ||
        card.keywords.some((k) => k.toLowerCase().includes(q)) ||
        card.uprightMeaning.general.toLowerCase().includes(q) ||
        card.reversedMeaning.general.toLowerCase().includes(q) ||
        card.advice.toLowerCase().includes(q) ||
        card.timing.toLowerCase().includes(q);

      return matchesSuit && matchesElement && matchesYesNo && matchesSearch;
    });
  }, [searchQuery, selectedSuit, selectedElement, yesNoFilter]);

  const handleCardClick = (card: TarotCardData) => {
    tarotAudio.playCardHover();
    if (onSelectCard) {
      onSelectCard(card);
    } else {
      setSelectedCardForModal(card);
    }
  };

  const handleCopyMeaning = (e: React.MouseEvent, card: TarotCardData) => {
    e.stopPropagation();
    const meaningText = `${card.name} (${card.arcana} Arcana - ${card.suit})
Sanskrit: ${card.sanskritTitle}
Keywords: ${card.keywords.join(", ")}
Upright Meaning: ${card.uprightMeaning.general}
Reversed Meaning: ${card.reversedMeaning.general}
Advice: ${card.advice}
Affirmation: "${card.affirmation}"`;

    navigator.clipboard.writeText(meaningText);
    setCopiedCardId(card.id);
    tarotAudio.playMysticalChime(600, 0.4);
    setTimeout(() => setCopiedCardId(null), 2000);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSuit("All");
    setSelectedElement("All");
    setYesNoFilter("All");
    tarotAudio.playCardHover();
  };

  return (
    <div id="tarot-glossary-container" className={`w-full space-y-6 ${className}`}>
      {/* Optional Hero Header */}
      {showHeroHeader && (
        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#1E1B18] via-[#2A231C] to-[#1A1613] border border-amber-500/30 text-amber-100 shadow-xl overflow-hidden">
          {/* Background Aura */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-mono font-bold tracking-wider uppercase border border-amber-500/40">
                  Comprehensive 78-Card Lexicon
                </span>
                <span className="text-xs text-amber-200/60 font-mono">
                  Major & Minor Arcana
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-100 tracking-tight">
                Tarot Symbolism & Meanings Glossary
              </h1>
              <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
                Explore complete upright and reversed interpretations, elemental correspondences, astrological rulers, Sanskrit archetypes, and domain guidance (Love, Career, Finance, Spiritual) for all 78 cards.
              </p>
            </div>

            {/* Quick Quick-Facts Badge */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-3 rounded-2xl bg-black/40 border border-amber-500/20 text-center">
                <div className="font-serif text-xl font-bold text-amber-300">22</div>
                <div className="text-[10px] text-amber-200/60 uppercase tracking-wider font-mono">Major Arcana</div>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-black/40 border border-amber-500/20 text-center">
                <div className="font-serif text-xl font-bold text-amber-300">56</div>
                <div className="text-[10px] text-amber-200/60 uppercase tracking-wider font-mono">Minor Arcana</div>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-black/40 border border-amber-500/20 text-center">
                <div className="font-serif text-xl font-bold text-amber-300">4</div>
                <div className="text-[10px] text-amber-200/60 uppercase tracking-wider font-mono">Elements</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH AND FILTER BAR */}
      <div className="space-y-4 bg-[#1E1B18] border border-amber-900/40 rounded-2xl p-4 sm:p-5 shadow-lg text-amber-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              id="tarot-glossary-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by card name (e.g. 'The Fool', 'Ace of Cups'), keyword, archetype, element, or meaning..."
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs sm:text-sm text-amber-100 placeholder-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-amber-400/60 hover:text-amber-300 p-1 cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls: View Mode + Orientation Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Upright / Reversed meaning toggle */}
            <div className="flex items-center bg-slate-950/90 rounded-xl p-1 border border-amber-500/30">
              <button
                onClick={() => {
                  tarotAudio.playCardHover();
                  setOrientationMode("upright");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  orientationMode === "upright"
                    ? "bg-amber-500 text-slate-950 font-bold shadow-xs"
                    : "text-amber-200/70 hover:text-amber-100"
                }`}
                title="View Upright Meanings"
              >
                <Sparkles className="w-3 h-3" />
                <span>Upright</span>
              </button>
              <button
                onClick={() => {
                  tarotAudio.playCardHover();
                  setOrientationMode("reversed");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  orientationMode === "reversed"
                    ? "bg-purple-600 text-white font-bold shadow-xs"
                    : "text-amber-200/70 hover:text-amber-100"
                }`}
                title="View Reversed Meanings"
              >
                <RotateCw className="w-3 h-3" />
                <span>Reversed</span>
              </button>
              <button
                onClick={() => {
                  tarotAudio.playCardHover();
                  setOrientationMode("both");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  orientationMode === "both"
                    ? "bg-amber-800 text-amber-100 font-bold shadow-xs"
                    : "text-amber-200/70 hover:text-amber-100"
                }`}
                title="View Both Orientations"
              >
                <span>Both</span>
              </button>
            </div>

            {/* Layout Mode Toggles */}
            <div className="flex items-center bg-slate-950/90 rounded-xl p-1 border border-amber-500/30">
              <button
                onClick={() => setViewMode("cards")}
                className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                  viewMode === "cards"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "text-amber-200/70 hover:text-amber-100"
                }`}
                title="Detailed Cards Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("compact")}
                className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                  viewMode === "compact"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "text-amber-200/70 hover:text-amber-100"
                }`}
                title="Compact Dictionary List"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                  viewMode === "table"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "text-amber-200/70 hover:text-amber-100"
                }`}
                title="Cheatsheet Matrix Table"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SUIT FILTER TABS */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {suitTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedSuit === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  tarotAudio.playCardHover();
                  setSelectedSuit(tab.id);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md scale-102"
                    : "bg-slate-950/60 text-amber-200/80 border-amber-500/20 hover:bg-slate-900 hover:text-amber-100"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-slate-950" : tab.color || "text-amber-400"}`} />
                <span>{tab.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                    isSelected ? "bg-slate-900 text-amber-300 font-bold" : "bg-black/40 text-amber-300/60"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* CATEGORY & METRIC FILTER SUB-BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-amber-500/20 text-xs">
          {/* Domain focus tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-amber-200/60 font-mono uppercase tracking-wider mr-1">
              Focus Domain:
            </span>
            {[
              { id: "general", label: "General", icon: Sparkles },
              { id: "love", label: "Love & Romance", icon: Heart },
              { id: "career", label: "Career & Work", icon: Briefcase },
              { id: "finance", label: "Finances & Wealth", icon: Coins },
              { id: "spiritual", label: "Spiritual Growth", icon: Compass },
            ].map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedMeaningCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    tarotAudio.playCardHover();
                    setSelectedMeaningCategory(cat.id as MeaningCategory);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-amber-400/20 text-amber-300 border border-amber-400/50 font-bold"
                      : "text-amber-200/70 hover:text-amber-100 hover:bg-slate-900"
                  }`}
                >
                  <Icon className="w-3 h-3 text-amber-400" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Filters (Elements & Yes/No) */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Element Filter */}
            <select
              value={selectedElement}
              onChange={(e) => setSelectedElement(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-amber-500/30 text-amber-200 text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="All">All Elements</option>
              <option value="Fire">Fire (Passion/Wands)</option>
              <option value="Water">Water (Emotions/Cups)</option>
              <option value="Air">Air (Mind/Swords)</option>
              <option value="Earth">Earth (Material/Pentacles)</option>
              <option value="Spirit">Spirit (Major Arcana)</option>
            </select>

            {/* Yes/No Polarity Filter */}
            <select
              value={yesNoFilter}
              onChange={(e) => setYesNoFilter(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-amber-500/30 text-amber-200 text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="All">All Yes/No Tendencies</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Maybe">Maybe / Neutral</option>
            </select>

            {/* Reset Filter button if any applied */}
            {(searchQuery || selectedSuit !== "All" || selectedElement !== "All" || yesNoFilter !== "All") && (
              <button
                onClick={clearFilters}
                className="text-[11px] text-amber-400 hover:text-amber-300 underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FILTER RESULTS COUNTER */}
      <div className="flex items-center justify-between text-xs text-amber-200/70 px-1">
        <div>
          Showing <strong>{filteredCards.length}</strong> of <strong>78</strong> cards
          {searchQuery && <span> matching <em>"{searchQuery}"</em></span>}
          {selectedSuit !== "All" && <span> in <em>{selectedSuit}</em></span>}
        </div>
        <div className="text-[11px] text-amber-300/60 font-mono">
          Click any card for full 3D viewer & complete symbolic breakdown
        </div>
      </div>

      {/* CARDS DISPLAY: 3 DIFFERENT VIEW MODES */}

      {/* 1. DETAILED CARD GRID VIEW */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCards.map((card) => {
            const isReversedView = orientationMode === "reversed";
            const showBoth = orientationMode === "both";
            const activeMeaning = isReversedView
              ? card.reversedMeaning[selectedMeaningCategory] || card.reversedMeaning.general
              : card.uprightMeaning[selectedMeaningCategory] || card.uprightMeaning.general;

            return (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                onClick={() => handleCardClick(card)}
                className="group relative rounded-2xl bg-gradient-to-b from-[#211D19] to-[#161311] border border-amber-900/30 hover:border-amber-400/80 shadow-lg hover:shadow-amber-500/15 p-4 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Subtle element accent top border */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    card.element === "Fire"
                      ? "bg-amber-500"
                      : card.element === "Water"
                      ? "bg-cyan-500"
                      : card.element === "Air"
                      ? "bg-indigo-400"
                      : card.element === "Earth"
                      ? "bg-emerald-500"
                      : "bg-purple-500"
                  }`}
                />

                {/* Card Header & Thumbnail */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    {/* Visual Card Artwork */}
                    <div className="relative w-16 h-24 rounded-xl overflow-hidden border border-amber-500/30 shadow-md shrink-0 group-hover:scale-105 transition-transform bg-black">
                      <img
                        src={resolveImageUrl(card.imageUrl)}
                        alt={card.name}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          isReversedView ? "rotate-180" : ""
                        }`}
                        loading="lazy"
                      />
                    </div>

                    {/* Metadata & Sanskrit title */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                          {card.arcana} • {card.suit}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono uppercase ${
                            card.yesNo === "Yes"
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                              : card.yesNo === "No"
                              ? "bg-red-950 text-red-400 border border-red-500/40"
                              : "bg-amber-950 text-amber-300 border border-amber-500/40"
                          }`}
                        >
                          {card.yesNo}
                        </span>
                      </div>

                      <h3 className="font-serif text-base font-bold text-amber-100 group-hover:text-amber-300 transition-colors truncate">
                        {card.name}
                      </h3>

                      <p className="text-[11px] text-amber-300/80 font-mono truncate">
                        {card.sanskritTitle}
                      </p>

                      <div className="text-[10px] text-amber-200/60 flex items-center gap-1.5 mt-0.5">
                        <span>{card.element}</span>
                        <span>•</span>
                        <span>{card.astrologyAssociation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Keywords Pills */}
                  <div className="flex flex-wrap gap-1">
                    {card.keywords.slice(0, 3).map((kw, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 text-amber-200/90 border border-amber-500/20 font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  {/* Meaning Excerpt */}
                  <div className="space-y-1.5 text-xs text-amber-100/90 bg-black/30 p-2.5 rounded-xl border border-amber-500/10">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                      <span>
                        {isReversedView ? "Reversed Meaning" : "Upright Meaning"} ({selectedMeaningCategory})
                      </span>
                      {isReversedView && <RotateCw className="w-2.5 h-2.5 text-purple-400" />}
                    </div>
                    <p className="text-[11px] leading-relaxed line-clamp-3">
                      {activeMeaning}
                    </p>

                    {showBoth && (
                      <div className="pt-1.5 border-t border-amber-500/15">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300 font-mono">
                          Reversed Meaning
                        </div>
                        <p className="text-[11px] text-purple-200/80 leading-relaxed line-clamp-2">
                          {card.reversedMeaning[selectedMeaningCategory] || card.reversedMeaning.general}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer: Advice & Action Buttons */}
                <div className="pt-3 mt-3 border-t border-amber-500/15 flex items-center justify-between text-xs">
                  <div className="text-[10px] text-amber-300/70 font-mono truncate max-w-[140px]">
                    🕒 {card.timing}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleCopyMeaning(e, card)}
                      className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-amber-500/20 hover:border-amber-400 transition-all cursor-pointer"
                      title="Copy Card Meaning"
                    >
                      {copiedCardId === card.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(card);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* 2. COMPACT DICTIONARY LIST VIEW */}
      {viewMode === "compact" && (
        <div className="space-y-3">
          {filteredCards.map((card) => {
            const isExpanded = expandedCardId === card.id;
            const isReversedView = orientationMode === "reversed";

            return (
              <div
                key={card.id}
                className="rounded-2xl bg-[#1E1B18] border border-amber-900/30 hover:border-amber-500/50 shadow-md p-4 transition-all"
              >
                <div
                  onClick={() => setExpandedCardId(isExpanded ? null : card.id)}
                  className="flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-14 rounded-lg overflow-hidden border border-amber-500/30 shrink-0 bg-black">
                      <img src={resolveImageUrl(card.imageUrl)} alt={card.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" loading="lazy" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-sm sm:text-base text-amber-100 hover:text-amber-300 transition-colors">
                          {card.name}
                        </h4>
                        <span className="text-[10px] text-amber-400 font-mono font-semibold">
                          ({card.arcana} • {card.suit})
                        </span>
                        <span className="text-[10px] text-amber-300/80 font-mono hidden sm:inline">
                          [{card.sanskritTitle}]
                        </span>
                      </div>

                      <div className="text-xs text-amber-200/80 line-clamp-1 mt-0.5">
                        <strong className="text-amber-400">Core: </strong>
                        {isReversedView ? card.reversedMeaning.general : card.uprightMeaning.general}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase hidden sm:inline-block ${
                        card.yesNo === "Yes"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                          : card.yesNo === "No"
                          ? "bg-red-950 text-red-400 border border-red-500/40"
                          : "bg-amber-950 text-amber-300 border border-amber-500/40"
                      }`}
                    >
                      {card.yesNo}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(card);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>3D Card</span>
                    </button>
                  </div>
                </div>

                {/* Expandable Deep Dictionary Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 pt-4 border-t border-amber-500/20 space-y-3 text-xs text-amber-100"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 rounded-xl bg-black/30 border border-amber-500/20 space-y-1">
                          <div className="text-[10px] font-bold uppercase text-amber-400 font-mono">
                            Upright Interpretation ({selectedMeaningCategory})
                          </div>
                          <p className="text-xs leading-relaxed text-amber-100">
                            {card.uprightMeaning[selectedMeaningCategory] || card.uprightMeaning.general}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-1">
                          <div className="text-[10px] font-bold uppercase text-purple-300 font-mono">
                            Reversed Interpretation ({selectedMeaningCategory})
                          </div>
                          <p className="text-xs leading-relaxed text-purple-100">
                            {card.reversedMeaning[selectedMeaningCategory] || card.reversedMeaning.general}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-amber-500/15">
                          <strong className="text-amber-400">Actionable Advice:</strong> {card.advice}
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-amber-500/15">
                          <strong className="text-amber-400">Shadow Warning:</strong> {card.warning}
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-amber-500/15">
                          <strong className="text-amber-400">Daily Affirmation:</strong> "{card.affirmation}"
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. CHEATSHEET COMPARATIVE TABLE VIEW */}
      {viewMode === "table" && (
        <div className="overflow-x-auto rounded-2xl border border-amber-900/40 bg-[#1E1B18] shadow-xl">
          <table className="w-full text-left text-xs text-amber-100">
            <thead className="bg-slate-950 text-amber-300 font-mono uppercase text-[10px] tracking-wider border-b border-amber-500/30">
              <tr>
                <th className="py-3.5 px-4">Card</th>
                <th className="py-3.5 px-3">Suit & Element</th>
                <th className="py-3.5 px-3">Keywords</th>
                <th className="py-3.5 px-4">Upright Meaning</th>
                <th className="py-3.5 px-4">Reversed Meaning</th>
                <th className="py-3.5 px-3">Yes / No</th>
                <th className="py-3.5 px-3">Timing</th>
                <th className="py-3.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-500/15">
              {filteredCards.map((card) => (
                <tr
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  className="hover:bg-amber-950/30 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 flex items-center gap-2.5">
                    <img src={resolveImageUrl(card.imageUrl)} alt={card.name} referrerPolicy="no-referrer" className="w-8 h-12 rounded object-cover border border-amber-500/30" />
                    <div>
                      <div className="font-serif font-bold text-amber-200">{card.name}</div>
                      <div className="text-[10px] text-amber-400 font-mono">{card.sanskritTitle}</div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] whitespace-nowrap">
                    <div>{card.suit}</div>
                    <div className="text-amber-400/70 text-[10px]">{card.element} • {card.astrologyAssociation}</div>
                  </td>
                  <td className="py-3 px-3 max-w-[160px]">
                    <div className="flex flex-wrap gap-1">
                      {card.keywords.slice(0, 2).map((kw, i) => (
                        <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-black/40 border border-amber-500/20 text-amber-200">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 max-w-[220px]">
                    <p className="line-clamp-2 text-[11px] text-amber-100/90 leading-relaxed">
                      {card.uprightMeaning[selectedMeaningCategory] || card.uprightMeaning.general}
                    </p>
                  </td>
                  <td className="py-3 px-4 max-w-[220px]">
                    <p className="line-clamp-2 text-[11px] text-purple-200/90 leading-relaxed">
                      {card.reversedMeaning[selectedMeaningCategory] || card.reversedMeaning.general}
                    </p>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono uppercase ${
                        card.yesNo === "Yes"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                          : card.yesNo === "No"
                          ? "bg-red-950 text-red-400 border border-red-500/40"
                          : "bg-amber-950 text-amber-300 border border-amber-500/40"
                      }`}
                    >
                      {card.yesNo}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[10px] text-amber-300/80 whitespace-nowrap">
                    {card.timing}
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(card);
                      }}
                      className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Results Found */}
      {filteredCards.length === 0 && (
        <div className="py-16 text-center space-y-3 bg-[#1E1B18] border border-amber-900/30 rounded-3xl p-8">
          <HelpCircle className="w-12 h-12 text-amber-400 mx-auto opacity-50" />
          <h3 className="font-serif text-xl font-bold text-amber-200">No Tarot Cards Found</h3>
          <p className="text-xs text-amber-200/70 max-w-sm mx-auto">
            No cards matched your search <em>"{searchQuery}"</em> with the current suit/element filters.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* FULL CARD DETAILS 3D MODAL */}
      {selectedCardForModal && (
        <TarotCardModal
          card={selectedCardForModal}
          onClose={() => setSelectedCardForModal(null)}
          isReversed={orientationMode === "reversed"}
        />
      )}
    </div>
  );
};
