import React, { useState, useEffect, useMemo } from "react";
import { resolveImageUrl } from "../utils/imageResolver";
import { LanguageCode } from "../types";
import { TarotCardData, TarotReadingSession, ReadingCategory } from "../types/tarot";
import { MASTER_TAROT_DECK_78 } from "../data/tarotMasterDeck";
import { tarotAudio } from "../services/tarotAudioService";
import { shuffleDeck, getSavedTarotReadings } from "../services/tarotEngine";
import { TarotReadingRoom } from "../components/tarot/TarotReadingRoom";
import { TarotGlossary } from "../components/tarot/TarotGlossary";
import { TarotCard3D } from "../components/tarot/TarotCard3D";
import { TarotCardModal } from "../components/tarot/TarotCardModal";
import { TarotSpreadSelectorModal } from "../components/tarot/TarotSpreadSelectorModal";
import { TarotShuffleAnimation } from "../components/tarot/TarotShuffleAnimation";
import { motion } from "motion/react";
import {
  Sparkles,
  Layers,
  Compass,
  Heart,
  Briefcase,
  Coins,
  Sun,
  BookOpen,
  Calendar,
  Volume2,
  VolumeX,
  Shuffle,
  Menu,
  HelpCircle,
  Users,
  Search,
  ArrowRight,
  Bookmark,
  Star,
  Phone,
  Video,
  MessageCircle,
  Award
} from "lucide-react";

interface TarotViewProps {
  selectedLanguage?: LanguageCode;
  onNavigateTab?: (tab: string) => void;
}

type TarotSubTab =
  | "dashboard"
  | "reading_room"
  | "daily"
  | "yes_no"
  | "glossary"
  | "deck_library"
  | "journal"
  | "practitioners";

export const TarotView: React.FC<TarotViewProps> = ({
  selectedLanguage = "en",
  onNavigateTab
}) => {
  const [activeTab, setActiveTab] = useState<TarotSubTab>("dashboard");
  const [isMuted, setIsMuted] = useState<boolean>(tarotAudio.getIsMuted());

  const toggleSound = () => {
    const muted = tarotAudio.toggleMute();
    setIsMuted(muted);
  };

  // Reading room initialization states
  const [selectedCategory, setSelectedCategory] = useState<ReadingCategory>("love");
  const [selectedSpreadId, setSelectedSpreadId] = useState<string>("past_present_future");
  const [initialQuestion, setInitialQuestion] = useState<string>("");

  // Modals
  const [isSpreadMenuOpen, setIsSpreadMenuOpen] = useState(false);
  const [isShuffleModalOpen, setIsShuffleModalOpen] = useState(false);
  const [shuffleCategory, setShuffleCategory] = useState<ReadingCategory>("love");
  const [shuffleSpreadId, setShuffleSpreadId] = useState<string>("past_present_future");
  const [shuffleQuestion, setShuffleQuestion] = useState<string>("");
  const [selectedCardForModal, setSelectedCardForModal] = useState<TarotCardData | null>(null);

  // Deck Library Search & Filter
  const [deckSuitFilter, setDeckSuitFilter] = useState<string>("All");
  const [deckSearchQuery, setDeckSearchQuery] = useState<string>("");

  // Daily Card
  const [dailyCard, setDailyCard] = useState<TarotCardData | null>(null);
  const [isDailyCardFlipped, setIsDailyCardFlipped] = useState<boolean>(false);
  const [isDailyCardReversed, setIsDailyCardReversed] = useState<boolean>(false);
  const [isDailyShuffling, setIsDailyShuffling] = useState<boolean>(false);

  // Yes / No Oracle
  const [yesNoQuestion, setYesNoQuestion] = useState<string>("");
  const [yesNoResultCard, setYesNoResultCard] = useState<TarotCardData | null>(null);
  const [isYesNoReversed, setIsYesNoReversed] = useState<boolean>(false);

  // Journal
  const [savedJournalReadings, setSavedJournalReadings] = useState<TarotReadingSession[]>([]);

  useEffect(() => {
    setSavedJournalReadings(getSavedTarotReadings());

    // Deterministic daily card based on date
    const dateStr = new Date().toDateString();
    let sum = 0;
    for (let i = 0; i < dateStr.length; i++) {
      sum = (sum + dateStr.charCodeAt(i)) % MASTER_TAROT_DECK_78.length;
    }
    setDailyCard(MASTER_TAROT_DECK_78[sum] || MASTER_TAROT_DECK_78[0]);
  }, []);

  const handleStartReading = (category: ReadingCategory, spreadId: string, question: string = "") => {
    tarotAudio.playMysticalChime(432, 1.8);
    setSelectedCategory(category);
    setSelectedSpreadId(spreadId);
    setInitialQuestion(question);
    setActiveTab("reading_room");
  };

  const handleOpen3DShuffle = (category: ReadingCategory = "love", spreadId: string = "past_present_future", question: string = "") => {
    tarotAudio.playCardShuffle(1.5);
    setShuffleCategory(category);
    setShuffleSpreadId(spreadId);
    setShuffleQuestion(question);
    setIsShuffleModalOpen(true);
  };

  const handleShuffleComplete = () => {
    setIsShuffleModalOpen(false);
    handleStartReading(shuffleCategory, shuffleSpreadId, shuffleQuestion);
  };

  const handleDrawNewDailyCard = () => {
    setIsDailyShuffling(true);
    tarotAudio.playCardShuffle(1.8);
    setTimeout(() => {
      const randIdx = Math.floor(Math.random() * MASTER_TAROT_DECK_78.length);
      setDailyCard(MASTER_TAROT_DECK_78[randIdx]);
      setIsDailyCardReversed(Math.random() < 0.25);
      setIsDailyCardFlipped(true);
      setIsDailyShuffling(false);
      tarotAudio.playCardFlip();
    }, 1600);
  };

  const handleConsultYesNoOracle = () => {
    if (!yesNoQuestion.trim()) return;
    tarotAudio.playCardShuffle(1.2);
    const shuffled = shuffleDeck(MASTER_TAROT_DECK_78, 0.25);
    setYesNoResultCard(shuffled[0].card);
    setIsYesNoReversed(shuffled[0].isReversed);
    setTimeout(() => {
      tarotAudio.playCardFlip();
    }, 300);
  };

  const filteredDeckCards = useMemo(() => {
    return MASTER_TAROT_DECK_78.filter((card) => {
      const matchesSuit =
        deckSuitFilter === "All" ||
        (deckSuitFilter === "Major" ? card.arcana === "Major" : card.suit === deckSuitFilter);
      const q = deckSearchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        card.name.toLowerCase().includes(q) ||
        card.keywords.some((kw) => kw.toLowerCase().includes(q)) ||
        card.archetype.toLowerCase().includes(q) ||
        card.sanskritTitle.toLowerCase().includes(q);
      return matchesSuit && matchesSearch;
    });
  }, [deckSuitFilter, deckSearchQuery]);

  const navTabs = [
    { id: "dashboard", label: "Tarot Sanctuary", icon: Sparkles },
    { id: "reading_room", label: "Interactive Reading Chamber", icon: Layers },
    { id: "daily", label: "Daily Card", icon: Sun },
    { id: "yes_no", label: "Yes / No Oracle", icon: HelpCircle },
    { id: "glossary", label: "Tarot Glossary (78)", icon: BookOpen },
    { id: "deck_library", label: "78-Card Deck (3D)", icon: Compass },
    { id: "journal", label: "Readings Journal", icon: Bookmark },
    { id: "practitioners", label: "Tarot Masters", icon: Users }
  ];

  return (
    <div className="w-full space-y-8 select-none">
      {/* TWO-TIER STICKY TAROT NAVIGATION RIBBON */}
      <div className="bg-[#1E1B18] border border-amber-900/30 rounded-2xl p-2 shadow-lg flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 shrink-0">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  tarotAudio.playCardHover();
                  setActiveTab(tab.id as TarotSubTab);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md scale-102"
                    : "text-amber-200/80 hover:text-amber-100 hover:bg-amber-950/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsSpreadMenuOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/60 hover:border-amber-300 text-amber-300 hover:text-white text-xs font-bold shadow-xs hover:shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
            title="Open Spread Selection Menu"
          >
            <Menu className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Spread Menu</span>
          </button>

          <button
            onClick={() => handleOpen3DShuffle("love", "past_present_future")}
            className="px-3.5 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-400/50 hover:border-amber-300 text-amber-200 hover:text-amber-100 text-xs font-bold shadow-xs hover:shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
            title="Perform 3D Deck Consecration & Shuffle before reading"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">3D Shuffle</span>
          </button>

          <button
            onClick={toggleSound}
            title={isMuted ? "Unmute Sacred Sound FX" : "Mute Sound FX"}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              isMuted
                ? "bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200"
                : "bg-amber-500/20 border-amber-400/60 text-amber-300 shadow-xs"
            }`}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline text-[11px] font-mono">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span className="hidden sm:inline text-[11px] font-mono">Sound ON</span>
              </>
            )}
          </button>

          {activeTab !== "reading_room" && (
            <button
              onClick={() => handleStartReading("love", "past_present_future")}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Begin Reading</span>
            </button>
          )}
        </div>
      </div>

      {/* 1. TAROT SANCTUARY DASHBOARD */}
      {activeTab === "dashboard" && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* HERO BANNER */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#1E1B18] via-[#2A1E14] to-[#16120E] border border-amber-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden text-amber-100">
            <div className="absolute -right-12 -bottom-12 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold tracking-widest uppercase border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dev-Guru Tarot Intelligence OS</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                Discover the Message Within the Cards
              </h1>
              <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed font-sans">
                Enter an authentic 78-card esoteric sanctuary. Powered by sacred geometry, elemental balance, and AI-assisted contextual interpretation to illuminate love, career, karma, and life purpose.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleStartReading("love", "past_present_future")}
                  className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Begin a Reading</span>
                </button>
                <button
                  onClick={() => handleOpen3DShuffle("love", "past_present_future")}
                  className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 hover:from-amber-900 border border-amber-400/60 text-amber-200 font-bold text-xs shadow-lg hover:shadow-amber-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Shuffle className="w-4 h-4 text-amber-400" />
                  <span>3D Shuffle Deck</span>
                </button>
                <button
                  onClick={() => setActiveTab("glossary")}
                  className="px-5 py-3.5 rounded-2xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
                >
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Tarot Glossary (78)</span>
                </button>
                <button
                  onClick={() => setActiveTab("deck_library")}
                  className="px-5 py-3.5 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-amber-500/30 text-amber-200 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>Explore 78-Card Deck (3D)</span>
                </button>
                <button
                  onClick={() => setActiveTab("daily")}
                  className="px-5 py-3.5 rounded-2xl bg-amber-950/60 hover:bg-amber-900 border border-amber-500/30 text-amber-200 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Daily Card</span>
                </button>
              </div>
            </div>
          </div>

          {/* INQUIRY PORTALS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Select Your Inquiry Portal
                </h2>
                <p className="text-xs text-slate-600">
                  Choose a structured domain for targeted multidimensional answers
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Portal 1: Love */}
              <div
                onClick={() => handleStartReading("love", "love_sanctuary_5")}
                className="p-5 rounded-2xl bg-white border border-rose-200/80 hover:border-rose-400 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5 fill-rose-100" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-rose-700 transition-colors">
                    Love Sanctuary
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    Soul connection, partner feelings, secret intentions, and future reunion truth.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-xs font-bold text-rose-600">
                  <span>5-Card Sanctuary Spread</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Portal 2: Career */}
              <div
                onClick={() => handleStartReading("career", "career_compass_5")}
                className="p-5 rounded-2xl bg-white border border-blue-200/80 hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                    Career &amp; Ambition
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    Promotions, job shifts, leadership breakthroughs, and navigating workplace politics.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Career Compass Spread</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Portal 3: Finance */}
              <div
                onClick={() => handleStartReading("finance", "financial_wealth_5")}
                className="p-5 rounded-2xl bg-white border border-emerald-200/80 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Coins className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                    Wealth &amp; Lakshmi Flow
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    Financial blocks, lucrative income avenues, prudent risk, and asset flourishing.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>5-Card Wealth Spread</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Portal 4: Celtic Cross */}
              <div
                onClick={() => handleStartReading("spiritual", "sacred_celtic_cross_10")}
                className="p-5 rounded-2xl bg-white border border-amber-200/80 hover:border-amber-400 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-amber-700 transition-colors">
                    Sacred Celtic Cross
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    The 10-card master spread mapping subconscious roots, hopes, environment, and destiny.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-xs font-bold text-amber-600">
                  <span>10-Card Master Spread</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Portal 5: Seven Chakra */}
              <div
                onClick={() => handleStartReading("spiritual", "seven_chakra_alignment_7")}
                className="p-5 rounded-2xl bg-white border border-purple-200/80 hover:border-purple-400 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-purple-700 transition-colors">
                    Seven Chakra Alignment
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    Pranic diagnostic from Root to Crown examining vital force, blocks &amp; spiritual ascension.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-xs font-bold text-purple-600">
                  <span>7-Card Chakra Spread</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Portal 6: 12-Month Yearly */}
              <div
                onClick={() => handleStartReading("general", "yearly_12_months_12")}
                className="p-5 rounded-2xl bg-white border border-indigo-200/80 hover:border-indigo-400 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-indigo-700 transition-colors">
                    12-Month Yearly Prediction
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    Month-by-month predictive timeline mapping cosmic catalysts, challenges &amp; breakthroughs.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>12-Card Yearly Spread</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* CARD OF THE DAY SHOWCASE */}
          {dailyCard && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1E1B18] border border-amber-500/30 text-amber-100 shadow-xl flex flex-col md:flex-row items-center gap-6">
              <div className="shrink-0 flex flex-col items-center">
                <TarotCard3D
                  card={dailyCard}
                  isFlipped={isDailyCardFlipped}
                  isReversed={isDailyCardReversed}
                  size="md"
                  isHoverable={true}
                  onClick={() => setIsDailyCardFlipped(!isDailyCardFlipped)}
                />
                <button
                  onClick={() => setIsDailyCardFlipped(!isDailyCardFlipped)}
                  className="mt-2 text-[11px] text-amber-400 hover:text-amber-200 font-semibold cursor-pointer"
                >
                  {isDailyCardFlipped ? "Flip to Back" : "Click to Reveal"}
                </button>
              </div>

              <div className="space-y-3 flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
                    Solar Card of the Day
                  </span>
                  <span className="text-xs text-amber-200/60 font-mono">
                    {new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-200">
                  {dailyCard.name} {isDailyCardReversed && "(Reversed)"}
                </h3>
                <p className="text-xs text-amber-100/80 leading-relaxed font-sans">
                  {typeof (isDailyCardReversed ? dailyCard.reversedMeaning : dailyCard.uprightMeaning) === "string"
                    ? (isDailyCardReversed ? dailyCard.reversedMeaning : dailyCard.uprightMeaning)
                    : ((isDailyCardReversed ? dailyCard.reversedMeaning : dailyCard.uprightMeaning) as any)?.general || ""}
                </p>
                <div className="p-3 rounded-2xl bg-amber-950/50 border border-amber-500/20 text-xs space-y-1">
                  <div className="font-bold text-amber-300">Daily Affirmation:</div>
                  <div className="italic text-amber-100 font-serif">
                    &ldquo;{dailyCard.affirmation}&rdquo;
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setSelectedCardForModal(dailyCard)}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-200 text-xs font-semibold cursor-pointer"
                  >
                    View Full 3D Meanings
                  </button>
                  <button
                    onClick={() => setActiveTab("daily")}
                    className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Go to Daily Journal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* 2. INTERACTIVE READING CHAMBER */}
      {activeTab === "reading_room" && (
        <TarotReadingRoom
          initialCategory={selectedCategory}
          initialSpreadId={selectedSpreadId}
          initialQuestion={initialQuestion}
          onBack={() => setActiveTab("dashboard")}
          onOpenConsultation={() => setActiveTab("practitioners")}
          onViewJournal={() => setActiveTab("journal")}
        />
      )}

      {/* 3. DAILY CARD */}
      {activeTab === "daily" && dailyCard && (
        <div className="p-6 sm:p-10 rounded-3xl bg-[#1E1B18] border border-amber-500/30 text-amber-100 space-y-6 shadow-2xl">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-500/30">
              Daily Solar Mirror
            </span>
            <h2 className="font-serif text-3xl font-bold text-white">Your Daily Tarot Contemplation</h2>
            <p className="text-xs text-amber-200/70">
              Draw your card, align your morning meditation, and journal your intuitive reflections.
            </p>
          </div>

          {isDailyShuffling ? (
            <div className="py-6">
              <TarotShuffleAnimation
                title="Shuffling Today's Sacred Deck..."
                subtitle="Calibrating with today's solar and planetary alignments..."
                onShuffleComplete={() => {}}
                shuffleStyle="mystical"
                autoStart={true}
              />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-4">
              <div className="flex flex-col items-center">
                <TarotCard3D
                  card={dailyCard}
                  isFlipped={true}
                  isReversed={isDailyCardReversed}
                  size="lg"
                  isHoverable={true}
                  onClick={() => setSelectedCardForModal(dailyCard)}
                />
                <span className="text-[10px] text-amber-400 mt-2">Click card for deep symbolic breakdown</span>
              </div>

              <div className="max-w-lg space-y-4 text-left">
                <div className="space-y-1">
                  <span className="text-xs text-amber-400 font-mono">
                    {dailyCard.arcana} Arcana &bull; {dailyCard.element} Element
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-amber-200">
                    {dailyCard.name} {isDailyCardReversed && "(Reversed)"}
                  </h3>
                  <p className="text-xs text-amber-300 font-mono">{dailyCard.sanskritTitle}</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/20 space-y-1.5">
                  <div className="text-xs font-bold text-amber-400 uppercase">Today&apos;s Spiritual Guidance</div>
                  <p className="text-xs text-amber-100 leading-relaxed">
                    {typeof (isDailyCardReversed ? dailyCard.reversedMeaning : dailyCard.uprightMeaning) === "string"
                      ? (isDailyCardReversed ? dailyCard.reversedMeaning : dailyCard.uprightMeaning)
                      : ((isDailyCardReversed ? dailyCard.reversedMeaning : dailyCard.uprightMeaning) as any)?.general || ""}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-1.5">
                  <div className="text-xs font-bold text-purple-300 uppercase">Journal Reflection Question</div>
                  <p className="text-xs text-purple-100 font-serif italic">
                    &ldquo;{dailyCard.reflectiveQuestion}&rdquo;
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleDrawNewDailyCard}
                    className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-200 font-bold text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 hover:scale-102"
                  >
                    <Shuffle className="w-4 h-4 text-amber-400" />
                    <span>3D Shuffle &amp; Redraw</span>
                  </button>
                  <button
                    onClick={() => handleOpen3DShuffle("daily", "daily_guidance", "What is my core cosmic guidance today?")}
                    className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 hover:scale-102"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Draw Full Spread</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. YES / NO ORACLE */}
      {activeTab === "yes_no" && (
        <div className="p-6 sm:p-10 rounded-3xl bg-[#1E1B18] border border-amber-500/30 text-amber-100 space-y-6 shadow-2xl max-w-3xl mx-auto text-center">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-500/30">
              Direct Binary Oracle
            </span>
            <h2 className="font-serif text-3xl font-bold text-white">Yes / No Tarot Oracle</h2>
            <p className="text-xs text-amber-200/70 max-w-md mx-auto">
              Ask a definitive question to receive a direct Yes/No indication along with the subtle cosmic factors influencing the outcome.
            </p>
          </div>

          <div className="max-w-xl mx-auto space-y-3">
            <input
              type="text"
              value={yesNoQuestion}
              onChange={(e) => setYesNoQuestion(e.target.value)}
              placeholder="Type your yes/no question (e.g., 'Will my project succeed?')..."
              className="w-full px-5 py-3.5 rounded-2xl bg-slate-950 border border-amber-500/40 text-amber-100 placeholder-amber-200/40 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              onClick={handleConsultYesNoOracle}
              disabled={!yesNoQuestion.trim()}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer hover:scale-102"
            >
              <Shuffle className="w-4 h-4" />
              <span>Shuffle 3D Deck &amp; Consult Oracle</span>
            </button>
          </div>

          {yesNoResultCard && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="pt-6 border-t border-amber-500/20 flex flex-col md:flex-row items-center justify-center gap-6 text-left"
            >
              <TarotCard3D
                card={yesNoResultCard}
                isFlipped={true}
                isReversed={isYesNoReversed}
                size="md"
                onClick={() => setSelectedCardForModal(yesNoResultCard)}
              />
              <div className="space-y-3 max-w-md">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      yesNoResultCard.yesNo === "Yes"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-500/50"
                        : yesNoResultCard.yesNo === "No"
                        ? "bg-red-950 text-red-400 border border-red-500/50"
                        : "bg-amber-950 text-amber-400 border border-amber-500/50"
                    }`}
                  >
                    Oracle Tendency: {yesNoResultCard.yesNo}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-amber-200">{yesNoResultCard.name}</h3>
                <p className="text-xs text-amber-100/90 leading-relaxed">
                  <strong>Why:</strong> {typeof yesNoResultCard.uprightMeaning === "string" ? yesNoResultCard.uprightMeaning : (yesNoResultCard.uprightMeaning as any)?.general || ""}
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/20 text-xs text-amber-300">
                  <strong>Timing Factor:</strong> {yesNoResultCard.timing}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* 5. TAROT GLOSSARY */}
      {activeTab === "glossary" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <TarotGlossary
            onSelectCard={(card) => setSelectedCardForModal(card)}
            showHeroHeader={true}
          />
        </motion.div>
      )}

      {/* 6. 78-CARD DECK (3D) */}
      {activeTab === "deck_library" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">The Sacred 78-Card Tarot Deck</h2>
              <p className="text-xs text-slate-600">
                Browse all 22 Major Arcana and 56 Minor Arcana with 3D interactive flip and complete multi-dimensional meanings.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab("glossary")}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer hover:scale-105 shrink-0"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Full Glossary</span>
              </button>
              <button
                onClick={() => handleOpen3DShuffle("spiritual", "past_present_future")}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:scale-105 shrink-0"
              >
                <Shuffle className="w-4 h-4 text-amber-400" />
                <span>3D Deck Shuffle Arena</span>
              </button>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={deckSearchQuery}
                  onChange={(e) => setDeckSearchQuery(e.target.value)}
                  placeholder="Search card by name..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {["All", "Major", "Wands", "Cups", "Swords", "Pentacles"].map((suit) => (
              <button
                key={suit}
                onClick={() => setDeckSuitFilter(suit)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  deckSuitFilter === suit
                    ? "bg-slate-900 text-amber-300 font-bold shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {suit === "All" ? "All 78 Cards" : suit === "Major" ? "Major Arcana (22)" : `${suit} (14)`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredDeckCards.map((card) => (
              <div
                key={card.id}
                onClick={() => setSelectedCardForModal(card)}
                className="p-3 rounded-2xl bg-white hover:bg-amber-50/50 border border-amber-900/10 hover:border-amber-400 shadow-xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-full aspect-[2/3] rounded-xl overflow-hidden mb-2 border border-slate-200 shadow-xs group-hover:scale-103 transition-transform">
                  <img
                    src={resolveImageUrl(card.imageUrl)}
                    alt={card.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-serif font-bold text-xs text-slate-900 truncate w-full group-hover:text-amber-800">
                  {card.name}
                </div>
                <div className="text-[10px] text-slate-500 truncate w-full font-mono">
                  {card.arcana} &bull; {card.element}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. READINGS JOURNAL */}
      {activeTab === "journal" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">My Tarot Readings Journal</h2>
              <p className="text-xs text-slate-600">
                Saved reading logs, timing forecasts, and personal reflections
              </p>
            </div>
            <button
              onClick={() => handleStartReading("love", "past_present_future")}
              className="px-4 py-2 rounded-xl bg-slate-900 text-amber-300 font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Record New Reading</span>
            </button>
          </div>

          {savedJournalReadings.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-amber-900/20 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 mx-auto flex items-center justify-center border border-amber-200">
                <Bookmark className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-slate-900">No Saved Readings Yet</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your spiritual journey begins with a single question. Save readings to track patterns and timing forecasts.
                </p>
              </div>
              <button
                onClick={() => handleStartReading("spiritual", "past_present_future")}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-md cursor-pointer"
              >
                Begin Your First Reading
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {savedJournalReadings.map((reading) => (
                <div
                  key={reading.id}
                  className="p-5 rounded-2xl bg-white border border-amber-900/15 shadow-xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] uppercase">
                        {reading.category}
                      </span>
                      <span className="font-serif font-bold text-sm text-slate-900">
                        {reading.spread.name} ({reading.drawnCards.length} Cards)
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      {new Date(reading.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-xs text-slate-800">
                    <strong>Question:</strong>{" "}
                    <span className="font-serif italic text-amber-900">
                      &ldquo;{reading.question}&rdquo;
                    </span>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
                    {reading.drawnCards.map((cardItem, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 p-1.5 rounded-lg bg-amber-50/60 border border-amber-200/60 shrink-0"
                      >
                        <img
                          src={resolveImageUrl(cardItem.card.imageUrl)}
                          alt={cardItem.card.name}
                          referrerPolicy="no-referrer"
                          className="w-7 h-10 object-cover rounded shadow-xs"
                        />
                        <div className="text-[11px] font-medium text-slate-800">
                          {cardItem.card.name} {cardItem.isReversed && "(Rev)"}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {reading.analysis.storyOfReading}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 8. TAROT MASTERS & CONSULTATIONS */}
      {activeTab === "practitioners" && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold text-xs uppercase tracking-wider border border-purple-200">
              Verified Vedic Tarot Masters
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-900">1-on-1 Tarot Consultations</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Connect via live Video, Voice, or Chat with accredited Tarot Grandmasters for complex relationship timing, career forecasting, and spiritual remedy consecration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "tarot_master_1",
                name: "Acharya Devi Ananya",
                title: "Vedic & Kabbalistic Tarot Grandmaster",
                exp: "18+ Years Experience",
                rating: "4.98",
                reviews: "1,420",
                specialties: ["Twin Flames", "Reconciliation", "Career Timing"],
                languages: "English, Hindi, Sanskrit",
                price: "FREE 5 Min • ₹45/min after",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
              },
              {
                id: "tarot_master_2",
                name: "Master Devvrat Shastri",
                title: "Esoteric Tarot & Kundli Alchemist",
                exp: "22+ Years Experience",
                rating: "4.95",
                reviews: "2,190",
                specialties: ["Business Expansion", "Wealth Energy", "Karmic Debt"],
                languages: "English, Hindi, Gujarati",
                price: "FREE 5 Min • ₹50/min after",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              },
              {
                id: "tarot_master_3",
                name: "Tarot Reader Meera Sen",
                title: "Intuitive Psychic & Shadow Worker",
                exp: "12+ Years Experience",
                rating: "4.92",
                reviews: "980",
                specialties: ["Love Sanctuary", "Emotional Healing", "Chakra Align"],
                languages: "English, Hindi, Bengali",
                price: "FREE 5 Min • ₹40/min after",
                avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
              }
            ].map((master) => (
              <div
                key={master.id}
                className="p-6 rounded-3xl bg-white border border-amber-900/15 shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={master.avatar}
                      alt={master.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-base text-slate-900">{master.name}</h4>
                      <p className="text-xs text-amber-800 font-medium">{master.title}</p>
                      <div className="flex items-center gap-1 text-xs text-amber-600 font-bold mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{master.rating}</span>
                        <span className="text-slate-400 font-normal">({master.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Experience:</span>
                      <strong className="text-slate-800">{master.exp}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Languages:</span>
                      <strong className="text-slate-800">{master.languages}</strong>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {master.specialties.map((sp, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-semibold border border-purple-200"
                        >
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="text-xs font-bold text-emerald-700">{master.price}</div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => onNavigateTab?.("consultation")}
                      className="py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat</span>
                    </button>
                    <button
                      onClick={() => onNavigateTab?.("consultation")}
                      className="py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </button>
                    <button
                      onClick={() => onNavigateTab?.("consultation")}
                      className="py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all shadow-xs"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Video</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODALS */}
      {/* 1. SPREAD MENU MODAL */}
      <TarotSpreadSelectorModal
        isOpen={isSpreadMenuOpen}
        onClose={() => setIsSpreadMenuOpen(false)}
        selectedSpreadId={selectedSpreadId}
        onSelectSpread={(spread, category) => {
          setIsSpreadMenuOpen(false);
          handleStartReading(category || "general", spread.id);
        }}
      />

      {/* 2. 3D SHUFFLE MODAL */}
      {isShuffleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1E1B18] border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full text-center space-y-6 shadow-2xl">
            <TarotShuffleAnimation
              title="Sacred 3D Deck Consecration"
              subtitle="Shuffling the esoteric cards with sacred geometric harmonies..."
              onShuffleComplete={handleShuffleComplete}
              shuffleStyle="mystical"
              autoStart={true}
            />
            <button
              onClick={() => setIsShuffleModalOpen(false)}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-amber-300 text-xs font-bold border border-amber-500/30 hover:bg-slate-800 cursor-pointer"
            >
              Cancel Shuffle
            </button>
          </div>
        </div>
      )}

      {/* 3. CARD MODAL */}
      {selectedCardForModal && (
        <TarotCardModal
          card={selectedCardForModal}
          onClose={() => setSelectedCardForModal(null)}
        />
      )}
    </div>
  );
};
