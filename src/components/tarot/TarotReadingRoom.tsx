import React, { useState } from "react";
import { resolveImageUrl } from "../../utils/imageResolver";
import { 
  TarotSpread, 
  DrawnCard, 
  ReadingCategory, 
  ReadingAnalysis, 
  TarotReadingSession,
  TarotCardData
} from "../../types/tarot";
import { TAROT_SPREADS, getSpreadById } from "../../data/tarotSpreadsData";
import { MASTER_TAROT_DECK_78 } from "../../data/tarotMasterDeck";
import { 
  QUESTION_BANK_CATEGORY_GUIDES, 
  getOracleLensForCategory,
  getQuestionsByCategory
} from "../../data/tarotOracleBankData";
import { 
  analyzeUserQuestion, 
  shuffleDeck, 
  analyzeReadingCards, 
  saveTarotReading 
} from "../../services/tarotEngine";
import { tarotAudio } from "../../services/tarotAudioService";
import { TarotCard3D } from "./TarotCard3D";
import { TarotCardFan } from "./TarotCardFan";
import { TarotShuffleAnimation } from "./TarotShuffleAnimation";
import { TarotCardModal } from "./TarotCardModal";
import { TarotSpreadSelectorModal } from "./TarotSpreadSelectorModal";
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  RefreshCw, 
  BookmarkCheck, 
  Layers, 
  Clock, 
  Heart, 
  HelpCircle, 
  Flame, 
  Compass, 
  BookOpen, 
  Check, 
  Video, 
  Share2, 
  Printer,
  ShieldCheck,
  Eye,
  Volume2,
  VolumeX,
  Menu,
  Grid
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TarotReadingRoomProps {
  initialCategory?: ReadingCategory;
  initialSpreadId?: string;
  initialQuestion?: string;
  onBack: () => void;
  onOpenConsultation?: () => void;
  onViewJournal?: () => void;
}

type ReadingPhase = 
  | "question" 
  | "spread_select" 
  | "shuffle" 
  | "draw" 
  | "reveal_all" 
  | "complete";

export const TarotReadingRoom: React.FC<TarotReadingRoomProps> = ({
  initialCategory = "love",
  initialSpreadId = "past_present_future",
  initialQuestion = "",
  onBack,
  onOpenConsultation,
  onViewJournal,
}) => {
  const [phase, setPhase] = useState<ReadingPhase>("question");
  const [category, setCategory] = useState<ReadingCategory>(initialCategory);
  const [question, setQuestion] = useState<string>(initialQuestion);
  const [selectedSpread, setSelectedSpread] = useState<TarotSpread>(
    getSpreadById(initialSpreadId) || TAROT_SPREADS[5]
  );
  const [reversalProbability, setReversalProbability] = useState<number>(0.35);
  const [isSpreadModalOpen, setIsSpreadModalOpen] = useState<boolean>(false);

  // Handle changing spread from menu modal
  const handleSpreadSelectFromMenu = (spread: TarotSpread, newCategory?: ReadingCategory) => {
    setSelectedSpread(spread);
    if (newCategory) setCategory(newCategory);
    // If currently in draw or complete phase, reset cards cleanly so flow conforms to new spread size
    if (phase === "draw" || phase === "complete") {
      setDrawnCards([]);
      setDrawnDeckIndices([]);
      setAnalysis(null);
      setIsSaved(false);
      setPhase("spread_select");
    }
  };

  // Deck & Drawn State
  const [deck, setDeck] = useState<{ card: TarotCardData; isReversed: boolean }[]>([]);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [drawnDeckIndices, setDrawnDeckIndices] = useState<number[]>([]);
  const [activeFlippedCard, setActiveFlippedCard] = useState<TarotCardData | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<ReadingAnalysis | null>(null);

  // Quick Question suggestions per category backed by Oracle Bank
  const questionSuggestions: Record<ReadingCategory, string[]> = {
    love: getQuestionsByCategory("love").length > 0 ? getQuestionsByCategory("love") : [
      "Where is my current relationship heading?",
      "What are their true subconscious feelings for me?",
      "What is blocking deeper emotional intimacy?",
      "Is reconciliation possible with my ex-partner?",
      "What should I release to welcome true soul love?"
    ],
    career: getQuestionsByCategory("career").length > 0 ? getQuestionsByCategory("career") : [
      "What career direction best aligns with my soul purpose?",
      "What is blocking my professional growth and promotion?",
      "Should I accept this new opportunity or stay put?",
      "What hidden strength can I leverage at work right now?"
    ],
    finance: getQuestionsByCategory("finance").length > 0 ? getQuestionsByCategory("finance") : [
      "What is the current energetic flow of my finances?",
      "What hidden habits or mindset blocks are restricting wealth?",
      "Is this an auspicious time for a major investment?"
    ],
    family: getQuestionsByCategory("family").length > 0 ? getQuestionsByCategory("family") : [
      "How can I bring healing and peace to family friction?",
      "What lesson is this household situation teaching me?"
    ],
    growth: getQuestionsByCategory("growth").length > 0 ? getQuestionsByCategory("growth") : [
      "What is my soul's primary spiritual lesson right now?",
      "How can I overcome self-doubt and step into sovereign power?"
    ],
    spiritual: getQuestionsByCategory("spiritual").length > 0 ? getQuestionsByCategory("spiritual") : [
      "What higher guidance does the cosmos have for my spiritual path?",
      "How can I deepen my intuition and inner peace?"
    ],
    decision: getQuestionsByCategory("decision").length > 0 ? getQuestionsByCategory("decision") : [
      "What are the energetic outcomes of Option A vs Option B?",
      "What crucial factor am I currently overlooking in this choice?"
    ],
    future: getQuestionsByCategory("future").length > 0 ? getQuestionsByCategory("future") : [
      "What energies are preparing to enter my life over the next 30 days?",
      "How can I best prepare for approaching changes?"
    ],
    yes_no: getQuestionsByCategory("yes_no").length > 0 ? getQuestionsByCategory("yes_no") : [
      "Will this project succeed?",
      "Should I take this leap of faith right now?"
    ],
    daily: getQuestionsByCategory("daily").length > 0 ? getQuestionsByCategory("daily") : [
      "What is the core cosmic vibration guiding my day today?"
    ]
  };

  // Step 1: Submit Question & Recommend Spread
  const handleQuestionSubmit = () => {
    if (!question.trim()) return;
    tarotAudio.playMysticalChime(528, 1.2);
    const recommendation = analyzeUserQuestion(question);
    setSelectedSpread(recommendation.recommendedSpread);
    setCategory(recommendation.category);
    setPhase("spread_select");
  };

  // Step 2: Confirm Spread & Begin Shuffle
  const handleStartShuffle = () => {
    const freshDeck = shuffleDeck(MASTER_TAROT_DECK_78, reversalProbability);
    setDeck(freshDeck);
    setDrawnCards([]);
    setDrawnDeckIndices([]);
    setPhase("shuffle");
  };

  // Step 3: Complete Shuffle -> Open Interactive Fan
  const handleShuffleComplete = () => {
    setPhase("draw");
  };

  // Step 4: Draw a card from interactive fan
  const handleSelectCardFromFan = (deckIndex: number) => {
    const currentPositionIndex = drawnCards.length;
    if (currentPositionIndex >= selectedSpread.cardCount) return;

    const currentPosition = selectedSpread.positions[currentPositionIndex];
    const picked = deck[deckIndex];
    if (!picked) return;

    const newDrawnCard: DrawnCard = {
      positionIndex: currentPositionIndex,
      position: currentPosition,
      card: picked.card,
      isReversed: picked.isReversed,
      drawnAt: Date.now(),
    };

    const nextDrawn = [...drawnCards, newDrawnCard];
    setDrawnCards(nextDrawn);
    setDrawnDeckIndices([...drawnDeckIndices, deckIndex]);

    // If all cards drawn, trigger full analysis & celestial completion chime
    if (nextDrawn.length === selectedSpread.cardCount) {
      const readingAnalysis = analyzeReadingCards(nextDrawn, question, category);
      setAnalysis(readingAnalysis);
      setTimeout(() => {
        tarotAudio.playReadingComplete();
        setPhase("complete");
      }, 900);
    }
  };

  // Sound Mute Toggle
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(tarotAudio.getIsMuted());

  const handleToggleSound = () => {
    const nextMuted = tarotAudio.toggleMute();
    setIsAudioMuted(nextMuted);
  };

  // Save Reading to History
  const handleSaveReading = () => {
    if (!analysis) return;
    tarotAudio.playMysticalChime(528, 1.5);
    const session: TarotReadingSession = {
      id: `reading_${Date.now()}`,
      timestamp: new Date().toISOString(),
      category,
      question,
      spread: selectedSpread,
      drawnCards,
      analysis,
      readingDepth: "Standard",
      tags: [category, selectedSpread.name],
      isFavorite: true,
    };
    saveTarotReading(session);
    setIsSaved(true);
  };

  return (
    <div className="w-full min-h-[85vh] bg-[#12100E] border border-amber-900/30 rounded-3xl p-4 sm:p-8 text-amber-100 relative overflow-hidden shadow-2xl">
      {/* Background Celestial Particles & Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/40 via-slate-950 to-black pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Navigation */}
      <div className="relative z-10 flex items-center justify-between gap-4 pb-6 border-b border-amber-500/20 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 hover:bg-amber-900 border border-amber-500/30 text-amber-200 text-xs font-semibold transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit Chamber</span>
          </button>

          {/* Sacred Sound Effects Toggle */}
          <button
            onClick={handleToggleSound}
            title={isAudioMuted ? "Unmute Sacred Sound FX" : "Mute Sound FX"}
            className={`p-2 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium ${
              !isAudioMuted
                ? "bg-amber-500/20 border-amber-400/60 text-amber-300 shadow-xs shadow-amber-500/20"
                : "bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200"
            }`}
          >
            {!isAudioMuted ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
                <span className="hidden md:inline text-[11px] font-mono">Sound ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="hidden md:inline text-[11px] font-mono">Muted</span>
              </>
            )}
          </button>
        </div>

        <div className="text-center hidden sm:block">
          <div className="font-serif font-bold text-base text-amber-300 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Sacred Tarot Sanctuary</span>
          </div>
          <div className="text-[10px] font-mono text-amber-200/60">
            Phase: {phase.replace("_", " ").toUpperCase()} • {selectedSpread.name} ({selectedSpread.cardCount} Cards)
          </div>
        </div>

        {/* Top Header Right Actions: Spread Menu & Phase Step Badges */}
        <div className="flex items-center gap-3">
          {/* Spread Menu Button */}
          <button
            onClick={() => setIsSpreadModalOpen(true)}
            className="px-3.5 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/60 hover:border-amber-300 text-amber-300 hover:text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:scale-105"
            title="Change Spread Architecture"
          >
            <Grid className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Spread Menu:</span>
            <span className="font-mono text-amber-200 font-semibold">{selectedSpread.cardCount} Cards</span>
          </button>

          {/* Phase Step Badges */}
          <div className="flex items-center gap-1 text-xs font-mono">
            {["question", "spread_select", "shuffle", "draw", "complete"].map((p, idx) => (
              <div
                key={p}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                  phase === p
                    ? "bg-amber-500 text-slate-950 border-amber-300 shadow-md scale-110"
                    : idx < ["question", "spread_select", "shuffle", "draw", "complete"].indexOf(phase)
                    ? "bg-emerald-950 text-emerald-400 border-emerald-500/40"
                    : "bg-slate-900 text-slate-500 border-slate-800"
                }`}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PHASE 1: NATURAL QUESTION FORMULATION */}
      {phase === "question" && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="relative z-10 max-w-2xl mx-auto py-6 space-y-6 text-center"
        >
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-500/30">
              Step 1 of 5 • Cosmic Intention
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100">
              What Would You Like Guidance About?
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/70 max-w-lg mx-auto leading-relaxed">
              Frame your question clearly. The AI Tarot Intelligence Engine will classify your intent and select the ideal sacred spread.
            </p>
          </div>

          {/* Category Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {[
              { id: "love", label: "Love & Romance", icon: Heart },
              { id: "career", label: "Career & Ambition", icon: Compass },
              { id: "finance", label: "Wealth & Finance", icon: Sparkles },
              { id: "decision", label: "Decision (A vs B)", icon: Layers },
              { id: "spiritual", label: "Spiritual Path", icon: BookOpen },
              { id: "yes_no", label: "Yes / No Oracle", icon: HelpCircle },
              { id: "future", label: "Future Horizon", icon: Clock },
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id as ReadingCategory)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    category === cat.id
                      ? "bg-amber-500 text-slate-950 font-bold shadow-md scale-105"
                      : "bg-amber-950/40 text-amber-200/80 border border-amber-500/20 hover:bg-amber-900/50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Question Input Box */}
          <div className="space-y-3">
            <div className="relative">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={`Type your ${category} question here (e.g., "${questionSuggestions[category][0]}")...`}
                rows={3}
                className="w-full px-5 py-4 rounded-2xl bg-slate-950/80 border border-amber-500/40 text-amber-100 placeholder-amber-200/40 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all resize-none shadow-inner"
              />
              <button
                onClick={handleQuestionSubmit}
                disabled={!question.trim()}
                className="mt-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Consult the Tarot Oracle</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="pt-2 text-left">
              <div className="text-[11px] font-semibold text-amber-300/80 mb-2 uppercase tracking-wider">
                Or choose a recommended question:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {questionSuggestions[category]?.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQuestion(sug);
                      const rec = analyzeUserQuestion(sug);
                      setSelectedSpread(rec.recommendedSpread);
                      setCategory(rec.category);
                      setPhase("spread_select");
                    }}
                    className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-amber-950/80 border border-amber-500/20 text-xs text-amber-200/90 text-left transition-all cursor-pointer hover:border-amber-400"
                  >
                    "{sug}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* PHASE 2: SPREAD SELECTION & CONFIRMATION */}
      {phase === "spread_select" && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="relative z-10 max-w-4xl mx-auto py-4 space-y-6"
        >
          <div className="text-center space-y-1">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-500/30">
              Step 2 of 5 • Spread Architecture
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
              Sacred Spread Recommended for Your Inquiry
            </h2>
            <p className="text-xs text-amber-200/70">
              Question: <span className="text-amber-300 font-serif italic font-semibold">"{question}"</span>
            </p>
          </div>

          {/* Recommended Spread Spotlight Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 border-2 border-amber-400/60 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider">
                  Recommended Match
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-200 mt-1">
                  {selectedSpread.name} ({selectedSpread.cardCount} Cards)
                </h3>
                <p className="text-xs text-amber-300/90 italic font-serif">{selectedSpread.tagline}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right text-xs">
                  <div className="text-slate-400">Estimated Depth</div>
                  <div className="font-bold text-amber-300 font-mono">{selectedSpread.difficulty} • ~{selectedSpread.estimatedMinutes} mins</div>
                </div>
                <button
                  onClick={handleStartShuffle}
                  className="px-6 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Begin Deck Consecration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Position Descriptions */}
            <div className="pt-3 border-t border-amber-500/20">
              <div className="text-xs font-bold text-amber-300 mb-2 uppercase tracking-wider">
                Positions in this spread:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {selectedSpread.positions.map((pos) => (
                  <div key={pos.id} className="p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/20 text-xs">
                    <div className="font-bold text-amber-200">{pos.id}. {pos.name}</div>
                    <div className="text-[11px] text-amber-200/60 leading-tight">{pos.meaning}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reversal Config & Spread Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-amber-500/20 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-amber-300 font-semibold">Reversed Cards:</span>
              <select
                value={reversalProbability}
                onChange={(e) => setReversalProbability(Number(e.target.value))}
                className="bg-amber-950 text-amber-200 px-2.5 py-1 rounded-lg border border-amber-500/40 text-xs focus:outline-none cursor-pointer"
              >
                <option value={0}>0% (Upright Only)</option>
                <option value={0.25}>25% Reversals</option>
                <option value={0.35}>35% Reversals (Balanced)</option>
                <option value={0.5}>50% Reversals (Traditional)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSpreadModalOpen(true)}
                className="px-3.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer hover:scale-105"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Browse All Spreads Menu</span>
              </button>

              <select
                value={selectedSpread.id}
                onChange={(e) => {
                  const sp = getSpreadById(e.target.value);
                  if (sp) setSelectedSpread(sp);
                }}
                className="bg-amber-950 text-amber-200 px-2.5 py-1 rounded-lg border border-amber-500/40 text-xs focus:outline-none cursor-pointer"
              >
                {TAROT_SPREADS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.cardCount} Cards)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* PHASE 3: CINEMATIC SHUFFLE */}
      {phase === "shuffle" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <TarotShuffleAnimation onShuffleComplete={handleShuffleComplete} />
        </motion.div>
      )}

      {/* PHASE 4: INTERACTIVE 3D CARD DRAWING FAN */}
      {phase === "draw" && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-5xl mx-auto space-y-6"
        >
          {/* Progress Tracker Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30">
            <div>
              <div className="text-xs font-bold text-amber-300 font-serif">
                Draw {selectedSpread.cardCount - drawnCards.length} More {selectedSpread.cardCount - drawnCards.length === 1 ? "Card" : "Cards"}
              </div>
              <div className="text-[11px] text-amber-200/70">
                Next: <strong className="text-amber-100">{selectedSpread.positions[drawnCards.length]?.name}</strong> ({selectedSpread.positions[drawnCards.length]?.meaning})
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-amber-400 font-bold">
                {drawnCards.length} / {selectedSpread.cardCount} Drawn
              </span>
              <div className="w-32 h-2 rounded-full bg-slate-900 overflow-hidden border border-amber-500/30">
                <div
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${(drawnCards.length / selectedSpread.cardCount) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Active Spread Board Preview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20">
            {selectedSpread.positions.map((pos, idx) => {
              const drawn = drawnCards[idx];
              return (
                <div
                  key={pos.id}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    drawn
                      ? "bg-slate-900 border-amber-400 shadow-md ring-1 ring-amber-400/50"
                      : idx === drawnCards.length
                      ? "bg-amber-950/40 border-amber-400/60 animate-pulse ring-1 ring-amber-400"
                      : "bg-slate-950/40 border-slate-800 opacity-60"
                  }`}
                >
                  <div className="text-[10px] font-bold text-amber-400 mb-1 truncate max-w-full">
                    {pos.id}. {pos.name}
                  </div>
                  {drawn ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7, rotateY: 90 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ duration: 0.65, ease: [0.34, 1.4, 0.64, 1] }}
                      className="text-center"
                    >
                      <div className="w-14 h-20 rounded-lg overflow-hidden border border-amber-400 shadow-md mb-1 mx-auto relative group">
                        <img src={resolveImageUrl(drawn.card.imageUrl)} alt={drawn.card.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        <motion.div
                          initial={{ opacity: 0.8 }}
                          animate={{ opacity: 0 }}
                          transition={{ duration: 0.8 }}
                          className="absolute inset-0 bg-amber-300/40 pointer-events-none"
                        />
                      </div>
                      <div className="text-[10px] font-serif font-bold text-amber-100 truncate max-w-[100px]">
                        {drawn.card.name}
                      </div>
                      {drawn.isReversed && (
                        <div className="text-[8px] text-red-400 font-bold uppercase tracking-wider">Reversed</div>
                      )}
                    </motion.div>
                  ) : (
                    <div className="w-14 h-20 rounded-lg border border-dashed border-amber-500/40 flex items-center justify-center text-amber-500/50 text-[10px] font-mono">
                      {idx === drawnCards.length ? "Draw" : "Waiting"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive Card Fan */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 px-2">
              <div className="text-xs text-amber-200/80 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Select card <strong>#{drawnCards.length + 1}</strong> from the 3D fan below for <em>{selectedSpread.positions[drawnCards.length]?.name}</em></span>
              </div>

              {/* Visual Shuffle 3D Deck Button before/during card selection */}
              <button
                onClick={() => {
                  tarotAudio.playCardShuffle(1.8);
                  setPhase("shuffle");
                }}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-950/90 to-slate-900 border border-amber-400/50 hover:border-amber-300 text-amber-200 hover:text-amber-100 text-xs font-bold shadow-md hover:shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                <span>Shuffle 3D Deck</span>
              </button>
            </div>

            <TarotCardFan
              deck={deck}
              onSelectCard={handleSelectCardFromFan}
              drawnIndices={drawnDeckIndices}
              remainingDraws={selectedSpread.cardCount - drawnCards.length}
              disabled={drawnCards.length >= selectedSpread.cardCount}
            />
          </div>
        </motion.div>
      )}

      {/* PHASE 5: COMPLETED READING ANALYSIS & MULTI-CARD INTERPRETATION */}
      {phase === "complete" && analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-5xl mx-auto space-y-8"
        >
          {/* Header Triumph Banner */}
          <div className="text-center space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest border border-emerald-500/40">
              Cosmic Reading Complete
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100">
              The Story of Your Reading
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/70 max-w-xl mx-auto leading-relaxed">
              Inquiry: <span className="text-amber-300 font-serif italic">"{question}"</span> • Spread: {selectedSpread.name}
            </p>
          </div>

          {/* DRAWN CARDS 3D BOARD */}
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-amber-500/30 shadow-2xl space-y-4">
            <div className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-2 flex items-center justify-between">
              <span>Sacred Cards Manifested ({drawnCards.length})</span>
              <span className="text-[10px] text-amber-400 font-normal font-mono">Click any card to inspect full esoteric breakdown</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {drawnCards.map((drawn) => {
                const lensInfo = getOracleLensForCategory(drawn.card.id, category);
                return (
                  <div
                    key={drawn.positionIndex}
                    onClick={() => setActiveFlippedCard(drawn.card)}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <TarotCard3D
                      card={drawn.card}
                      isFlipped={true}
                      isReversed={drawn.isReversed}
                      size="sm"
                      isHoverable={true}
                      revealDelay={drawn.positionIndex * 0.16}
                      positionLabel={`${drawn.position.id}. ${drawn.position.name}`}
                    />
                    {lensInfo?.text && (
                      <div className="mt-1.5 px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-500/30 text-[9px] text-amber-200 text-center line-clamp-2 max-w-[130px]" title={lensInfo.text}>
                        <span className="font-semibold text-amber-300">{lensInfo.lensName}:</span> {lensInfo.text}
                      </div>
                    )}
                    <button className="mt-1.5 text-[10px] text-amber-400 hover:text-amber-200 flex items-center gap-1 font-semibold transition-colors">
                      <Eye className="w-3 h-3" />
                      <span>View Meanings</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MULTI-CARD ADVANCED ANALYTICS (Major Arcana Density, Suit, Elements, Numbers) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Major Arcana Density */}
            <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                <span>Major Arcana Density</span>
                <span className="font-mono">{analysis.majorArcanaPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-amber-500/30">
                <div className="h-full bg-amber-400" style={{ width: `${analysis.majorArcanaPercentage}%` }} />
              </div>
              <p className="text-[11px] text-amber-100/80 leading-relaxed pt-1">
                {analysis.majorArcanaMessage}
              </p>
            </div>

            {/* Suit & Element Dominance */}
            <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/20 space-y-2">
              <div className="text-xs font-bold text-amber-300 flex items-center justify-between">
                <span>Dominant Energy</span>
                <span className="font-mono text-amber-200">{analysis.dominantSuit} / {analysis.dominantElement}</span>
              </div>
              <p className="text-[11px] text-amber-100/80 leading-relaxed">
                {analysis.suitNarrative}
              </p>
            </div>

            {/* Timing Insight */}
            <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/20 space-y-2">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Cosmic Timing Horizon</span>
              </div>
              <p className="text-xs font-serif italic text-amber-200 font-bold">
                {analysis.timingInsight}
              </p>
              <p className="text-[10px] text-amber-200/60 leading-tight">
                Tarot timing reflects energetic momentum influenced by conscious human choices.
              </p>
            </div>
          </div>

          {/* NARRATIVE SYNTHESIS & ACTION PLAN */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-[#1A1612] to-slate-950 border border-amber-400/40 space-y-6 shadow-xl">
            <div className="space-y-2">
              <div className="text-xs uppercase font-bold tracking-widest text-amber-400">Core Interpretation</div>
              <h3 className="font-serif text-2xl font-bold text-amber-100">
                {analysis.coreTheme}
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-sans">
                {analysis.storyOfReading}
              </p>
            </div>

            {/* Challenge vs Opportunity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30 space-y-1.5">
                <div className="text-xs font-bold text-red-400 uppercase tracking-wider">The Primary Challenge</div>
                <p className="text-xs text-red-100/90 leading-relaxed">{analysis.keyChallenge}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">The Golden Opportunity</div>
                <p className="text-xs text-emerald-100/90 leading-relaxed">{analysis.keyOpportunity}</p>
              </div>
            </div>

            {/* Actionable Next Steps */}
            <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-3">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Recommended Action Steps (Dharma)
              </div>
              <div className="space-y-2">
                {analysis.actionSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-amber-100">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Save, Journal, New Reading, Consult Practitioner */}
            <div className="pt-4 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveReading}
                  disabled={isSaved}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSaved
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                      : "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md"
                  }`}
                >
                  <BookmarkCheck className="w-4 h-4" />
                  <span>{isSaved ? "Saved to History & Journal" : "Save This Reading"}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Report</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setPhase("question");
                    setQuestion("");
                    setDrawnCards([]);
                    setAnalysis(null);
                    setIsSaved(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Ask Another Question</span>
                </button>

                {onOpenConsultation && (
                  <button
                    onClick={onOpenConsultation}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Talk to a Tarot Practitioner</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* FULL-SCREEN CARD DETAIL MODAL */}
      {activeFlippedCard && (
        <TarotCardModal
          card={activeFlippedCard}
          onClose={() => setActiveFlippedCard(null)}
          isReversed={drawnCards.find(c => c.card.id === activeFlippedCard.id)?.isReversed || false}
        />
      )}

      {/* SPREAD SELECTION MENU MODAL */}
      <TarotSpreadSelectorModal
        isOpen={isSpreadModalOpen}
        onClose={() => setIsSpreadModalOpen(false)}
        selectedSpreadId={selectedSpread.id}
        onSelectSpread={handleSpreadSelectFromMenu}
      />
    </div>
  );
};
