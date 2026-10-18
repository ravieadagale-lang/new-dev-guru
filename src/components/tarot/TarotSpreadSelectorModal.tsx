import React, { useState } from "react";
import { TarotSpread, ReadingCategory } from "../../types/tarot";
import { TAROT_SPREADS } from "../../data/tarotSpreadsData";
import { 
  Sparkles, 
  Layers, 
  Clock, 
  Sun, 
  HelpCircle, 
  Compass, 
  Heart, 
  Briefcase, 
  Coins, 
  Flame, 
  ShieldAlert, 
  GitFork, 
  HeartHandshake, 
  Calendar, 
  X, 
  Check, 
  ChevronRight, 
  ArrowRight,
  Filter,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TarotSpreadSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSpreadId: string;
  onSelectSpread: (spread: TarotSpread, category?: ReadingCategory) => void;
}

export const TarotSpreadSelectorModal: React.FC<TarotSpreadSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedSpreadId,
  onSelectSpread,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterCardCount, setFilterCardCount] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  if (!isOpen) return null;

  // Filter spreads
  const filteredSpreads = TAROT_SPREADS.filter((spread) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = spread.name.toLowerCase().includes(q);
      const matchTagline = spread.tagline.toLowerCase().includes(q);
      const matchDesc = spread.description.toLowerCase().includes(q);
      const matchPos = spread.positions.some((p) => p.name.toLowerCase().includes(q) || p.meaning.toLowerCase().includes(q));
      if (!matchName && !matchTagline && !matchDesc && !matchPos) return false;
    }

    // Category filter
    if (filterCategory !== "all") {
      if (filterCategory === "1_card" && spread.cardCount !== 1) return false;
      if (filterCategory === "3_card" && spread.cardCount !== 3) return false;
      if (filterCategory === "5_card" && spread.cardCount !== 5) return false;
      if (filterCategory === "7_card" && spread.cardCount !== 7) return false;
      if (filterCategory === "10_celtic" && spread.id !== "sacred_celtic_cross_10") return false;
      if (filterCategory === "12_month" && spread.id !== "yearly_12_months_12") return false;
      if (["love", "career", "finance", "spiritual", "decision", "future"].includes(filterCategory)) {
        if (spread.category !== filterCategory && spread.category !== "general") return false;
      }
    }

    // Card count filter
    if (filterCardCount !== "all") {
      const count = Number(filterCardCount);
      if (spread.cardCount !== count) return false;
    }

    return true;
  });

  const getSpreadIcon = (id: string, cardCount: number) => {
    if (id === "yearly_12_months_12") return Calendar;
    if (id === "seven_chakra_alignment_7") return Sparkles;
    if (id === "sacred_celtic_cross_10") return Layers;
    if (cardCount === 1) return Sun;
    if (cardCount === 2) return GitFork;
    if (cardCount === 3) return Clock;
    if (cardCount === 5) return Compass;
    if (cardCount === 7) return HeartHandshake;
    return Layers;
  };

  const getDifficultyBadgeColor = (diff: string) => {
    switch (diff) {
      case "Beginner":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "Intermediate":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      case "Advanced":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "Master":
        return "bg-purple-500/20 text-purple-300 border-purple-500/40";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl my-auto rounded-3xl bg-[#14120E] border border-amber-500/30 text-amber-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-amber-500/20 bg-gradient-to-r from-amber-950/60 via-slate-950 to-amber-950/60 flex items-center justify-between gap-4 shrink-0">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-widest border border-amber-500/30 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Sacred Spread Architectures</span>
                </span>
                <span className="text-xs font-mono text-amber-400 font-bold">
                  ({filteredSpreads.length} spreads available)
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
                Choose Tarot Spread Architecture
              </h2>
              <p className="text-xs text-amber-200/70">
                Select your preferred spread pattern to customize your reading layout and revelation sequence.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-amber-500/30 text-amber-300 hover:text-white transition-all cursor-pointer hover:scale-105 shrink-0"
              title="Close Spread Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Bar & Quick Category Buttons */}
          <div className="p-4 bg-slate-950/70 border-b border-amber-500/20 space-y-3 shrink-0">
            {/* Search Input + Quick Count Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search spreads by name, purpose, or position keyword..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-100 placeholder-amber-200/40 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-300 text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Card Count Filter */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Cards:</span>
                </span>
                <select
                  value={filterCardCount}
                  onChange={(e) => setFilterCardCount(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-200 text-xs focus:outline-none cursor-pointer"
                >
                  <option value="all">All Card Counts</option>
                  <option value="1">1 Card (Single / Oracle)</option>
                  <option value="2">2 Cards (A vs B)</option>
                  <option value="3">3 Cards (Past-Present-Future)</option>
                  <option value="5">5 Cards (Compass / Sanctuary)</option>
                  <option value="7">7 Cards (Chakra / Deep Dive)</option>
                  <option value="10">10 Cards (Celtic Cross)</option>
                  <option value="12">12 Cards (Yearly 12 Months)</option>
                </select>
              </div>
            </div>

            {/* Quick Spread Archetype Shortcuts */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {[
                { id: "all", label: "All Spreads" },
                { id: "1_card", label: "Single Card (1)", icon: Sun },
                { id: "3_card", label: "Past • Present • Future (3)", icon: Clock },
                { id: "10_celtic", label: "Celtic Cross (10)", icon: Layers },
                { id: "7_card", label: "Seven Chakra (7)", icon: Sparkles },
                { id: "12_month", label: "12-Month Yearly (12)", icon: Calendar },
                { id: "love", label: "Love & Romance", icon: Heart },
                { id: "career", label: "Career & Ambition", icon: Briefcase },
                { id: "finance", label: "Wealth & Lakshmi", icon: Coins },
                { id: "decision", label: "Decisions (A vs B)", icon: GitFork },
              ].map((pill) => {
                const Icon = pill.icon;
                const isSelected = filterCategory === pill.id;
                return (
                  <button
                    key={pill.id}
                    onClick={() => {
                      setFilterCategory(pill.id);
                      if (pill.id === "1_card") setFilterCardCount("1");
                      else if (pill.id === "3_card") setFilterCardCount("3");
                      else if (pill.id === "10_celtic") setFilterCardCount("10");
                      else if (pill.id === "12_month") setFilterCardCount("12");
                      else if (pill.id === "all") setFilterCardCount("all");
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-amber-500 text-slate-950 font-bold shadow-md scale-105"
                        : "bg-amber-950/40 text-amber-200/80 border border-amber-500/20 hover:bg-amber-900/60"
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    <span>{pill.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Spreads Grid List */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            {filteredSpreads.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <Layers className="w-12 h-12 text-amber-500/40 mx-auto animate-pulse" />
                <div className="text-base font-bold text-amber-200">No matching Tarot spreads found</div>
                <p className="text-xs text-amber-300/60 max-w-sm mx-auto">
                  Try adjusting your search terms or clearing the card count filter to see all 10+ sacred architectures.
                </p>
                <button
                  onClick={() => {
                    setFilterCategory("all");
                    setFilterCardCount("all");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredSpreads.map((spread) => {
                  const isSelected = spread.id === selectedSpreadId;
                  const Icon = getSpreadIcon(spread.id, spread.cardCount);

                  return (
                    <motion.div
                      key={spread.id}
                      whileHover={{ scale: 1.01 }}
                      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? "bg-gradient-to-br from-amber-950/90 to-slate-900 border-amber-400 shadow-lg ring-2 ring-amber-400/50"
                          : "bg-slate-950/70 hover:bg-slate-900 border-amber-500/20 hover:border-amber-500/50 shadow-sm"
                      }`}
                      onClick={() => {
                        const cat = (spread.category === "general" ? "love" : spread.category) as ReadingCategory;
                        onSelectSpread(spread, cat);
                        onClose();
                      }}
                    >
                      <div className="space-y-3">
                        {/* Top Meta Row */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 ${
                              isSelected
                                ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                                : "bg-amber-950/60 text-amber-300 border-amber-500/30"
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-serif font-bold text-base sm:text-lg text-amber-100">
                                  {spread.name}
                                </h3>
                                {isSelected && (
                                  <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                    <Check className="w-3 h-3 stroke-[3]" />
                                    <span>Active</span>
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-amber-300/80 font-serif italic">
                                {spread.tagline}
                              </p>
                            </div>
                          </div>

                          {/* Card Count Pill */}
                          <div className="text-right shrink-0">
                            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                              {spread.cardCount} {spread.cardCount === 1 ? "Card" : "Cards"}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-amber-100/70 leading-relaxed">
                          {spread.description}
                        </p>

                        {/* Spread Positions Preview */}
                        <div className="pt-2 border-t border-amber-500/20 space-y-1.5">
                          <div className="text-[11px] font-bold text-amber-300/90 uppercase tracking-wider">
                            Card Positions ({spread.positions.length}):
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {spread.positions.slice(0, 6).map((pos) => (
                              <span
                                key={pos.id}
                                className="px-2 py-0.5 rounded-md bg-slate-900 border border-amber-500/20 text-[11px] text-amber-200/90"
                              >
                                {pos.id}. {pos.name}
                              </span>
                            ))}
                            {spread.positions.length > 6 && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-950/60 border border-amber-500/30 text-[11px] text-amber-300 font-bold">
                                +{spread.positions.length - 6} more months/positions
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Footer Info */}
                      <div className="pt-4 mt-3 border-t border-amber-500/20 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${getDifficultyBadgeColor(spread.difficulty)}`}>
                            {spread.difficulty}
                          </span>
                          <span className="text-slate-400 font-mono text-[11px]">
                            ~{spread.estimatedMinutes} mins
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const cat = (spread.category === "general" ? "love" : spread.category) as ReadingCategory;
                            onSelectSpread(spread, cat);
                            onClose();
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                            isSelected
                              ? "bg-amber-400 hover:bg-amber-300 text-slate-950"
                              : "bg-amber-950 hover:bg-amber-900 border border-amber-500/40 text-amber-200 hover:text-white"
                          }`}
                        >
                          <span>{isSelected ? "Start Reading with Spread" : "Select Spread"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-4 bg-slate-950 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-200/70 shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Select any spread above to immediately configure your card layout and reading chamber sequence.</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-200 text-xs font-semibold cursor-pointer"
            >
              Close Menu
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
