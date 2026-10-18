import React, { useState } from "react";
import { TarotCardData } from "../../types/tarot";
import { 
  X, 
  Sparkles, 
  Heart, 
  Briefcase, 
  Coins, 
  Compass, 
  Eye, 
  ShieldAlert, 
  Sun, 
  HelpCircle,
  Clock,
  Check
} from "lucide-react";
import { TarotCard3D } from "./TarotCard3D";

interface TarotCardModalProps {
  card: TarotCardData | null;
  onClose: () => void;
  isReversed?: boolean;
}

export const TarotCardModal: React.FC<TarotCardModalProps> = ({
  card,
  onClose,
  isReversed = false,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "love" | "career" | "finance" | "spiritual" | "symbolism" | "shadow">("overview");
  const [isFlipped, setIsFlipped] = useState<boolean>(true);
  const [currentReversed, setCurrentReversed] = useState<boolean>(isReversed);

  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#1E1B18] to-[#12100E] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden text-amber-100 flex flex-col md:flex-row max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-300 transition-all cursor-pointer shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT: 3D Interactive Card Showcase */}
        <div className="p-6 md:p-8 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900/60 to-black/80 border-b md:border-b-0 md:border-r border-amber-500/20 shrink-0 md:w-80 lg:w-96">
          <TarotCard3D
            card={card}
            isFlipped={isFlipped}
            isReversed={currentReversed}
            size="lg"
            isHoverable={true}
            onClick={() => setIsFlipped(!isFlipped)}
          />

          {/* Interactive Flip / Reverse controls */}
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-3 py-1.5 rounded-full bg-amber-950/80 hover:bg-amber-900 border border-amber-500/30 text-xs font-semibold text-amber-300 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isFlipped ? "Flip to Back" : "Flip to Face"}</span>
            </button>
            <button
              onClick={() => setCurrentReversed(!currentReversed)}
              className={`px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentReversed
                  ? "bg-red-950/90 border-red-500/50 text-red-300 font-bold"
                  : "bg-slate-900 border-amber-500/30 text-amber-200"
              }`}
            >
              <span>{currentReversed ? "Reversed (180°)" : "Upright"}</span>
            </button>
          </div>

          <p className="text-[10px] text-amber-200/50 mt-2 font-mono">
            Click card to flip 3D perspective
          </p>
        </div>

        {/* RIGHT: Deep Multidimensional Meanings */}
        <div className="flex-1 p-6 md:p-8 flex flex-col overflow-y-auto no-scrollbar">
          {/* Header Title */}
          <div className="space-y-1 pb-4 border-b border-amber-500/20">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                {card.arcana} Arcana • {card.suit}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono">
                {card.element} Element
              </span>
              <span className="text-[10px] text-amber-200/60 font-mono">
                {card.astrologyAssociation}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 flex items-center gap-2">
              <span>{card.name}</span>
            </h2>
            <p className="text-xs text-amber-400 font-mono">
              {card.sanskritTitle} • Archetype: {card.archetype}
            </p>
          </div>

          {/* Meaning Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar border-b border-amber-500/10">
            {[
              { id: "overview", label: "Overview", icon: Compass },
              { id: "love", label: "Love & Union", icon: Heart },
              { id: "career", label: "Career & Ambition", icon: Briefcase },
              { id: "finance", label: "Wealth & Lakshmi", icon: Coins },
              { id: "spiritual", label: "Spiritual Path", icon: Sparkles },
              { id: "symbolism", label: "Symbolism", icon: Eye },
              { id: "shadow", label: "Shadow & Warning", icon: ShieldAlert },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                      : "bg-amber-950/40 text-amber-200 hover:bg-amber-900/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Body */}
          <div className="py-4 space-y-4 flex-1 text-sm leading-relaxed">
            {activeTab === "overview" && (
              <div className="space-y-4">
                {/* Keywords Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {card.keywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-500/30 text-amber-200 text-xs font-medium">
                      ✨ {kw}
                    </span>
                  ))}
                </div>

                {/* Primary Meaning */}
                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20 space-y-2">
                  <h4 className="font-serif font-bold text-amber-300 text-sm">
                    {currentReversed ? "Reversed Interpretation" : "Upright Cosmic Essence"}
                  </h4>
                  <p className="text-xs text-amber-100/90 leading-relaxed">
                    {currentReversed ? card.reversedMeaning.general : card.uprightMeaning.general}
                  </p>
                </div>

                {/* Timing & Yes/No Quick Pill */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/20">
                    <div className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Yes / No Tendency</span>
                    </div>
                    <div className="font-bold text-amber-200 text-sm mt-0.5">{card.yesNo}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/20">
                    <div className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Timing Association</span>
                    </div>
                    <div className="font-bold text-amber-200 text-xs mt-0.5 truncate">{card.timing}</div>
                  </div>
                </div>

                {/* Affirmation Card */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/60 to-purple-950/60 border border-amber-400/30">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-amber-300">Daily Affirmation</div>
                  <p className="font-serif italic text-amber-100 text-xs mt-1">"{card.oracleAffirmation || card.affirmation}"</p>
                </div>
              </div>
            )}

            {activeTab === "love" && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2">
                  <h4 className="font-serif font-bold text-rose-300 text-sm flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-400" />
                    <span>Love, Romance & Soulmate Dynamics</span>
                  </h4>
                  <p className="text-xs text-rose-100/90 leading-relaxed">
                    {currentReversed ? card.reversedMeaning.love : card.uprightMeaning.love}
                  </p>
                </div>
                {card.oracleLenses?.love && (
                  <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/20 text-xs text-rose-200">
                    <strong className="text-rose-300">Oracle Love Lens:</strong> {card.oracleLenses.love}
                  </div>
                )}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/20 text-xs text-amber-200/80">
                  <strong>Relationship Advice:</strong> {card.advice}
                </div>
              </div>
            )}

            {activeTab === "career" && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-2">
                  <h4 className="font-serif font-bold text-blue-300 text-sm flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-400" />
                    <span>Career, Ambition & Workplace Strategy</span>
                  </h4>
                  <p className="text-xs text-blue-100/90 leading-relaxed">
                    {currentReversed ? card.reversedMeaning.career : card.uprightMeaning.career}
                  </p>
                </div>
                {card.oracleLenses?.career && (
                  <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs text-blue-200">
                    <strong className="text-blue-300">Oracle Career Lens:</strong> {card.oracleLenses.career}
                  </div>
                )}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/20 text-xs text-amber-200/80">
                  <strong>Career Opportunity:</strong> {card.opportunity}
                </div>
              </div>
            )}

            {activeTab === "finance" && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                  <h4 className="font-serif font-bold text-emerald-300 text-sm flex items-center gap-2">
                    <Coins className="w-4 h-4 text-emerald-400" />
                    <span>Financial Flow & Material Prosperity</span>
                  </h4>
                  <p className="text-xs text-emerald-100/90 leading-relaxed">
                    {currentReversed ? card.reversedMeaning.finance : card.uprightMeaning.finance}
                  </p>
                </div>
                {card.oracleLenses?.wealth && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-200">
                    <strong className="text-emerald-300">Oracle Wealth Lens:</strong> {card.oracleLenses.wealth}
                  </div>
                )}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/20 text-xs text-amber-200/80">
                  <strong>Prudent Money Guidance:</strong> {card.warning}
                </div>
              </div>
            )}

            {activeTab === "spiritual" && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-2">
                  <h4 className="font-serif font-bold text-purple-300 text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Spiritual Awakening & Dharma</span>
                  </h4>
                  <p className="text-xs text-purple-100/90 leading-relaxed">
                    {currentReversed ? card.reversedMeaning.spiritual : card.uprightMeaning.spiritual}
                  </p>
                </div>
                {card.oracleLenses?.spiritual && (
                  <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-200">
                    <strong className="text-purple-300">Oracle Spiritual Lens:</strong> {card.oracleLenses.spiritual}
                  </div>
                )}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/20 text-xs text-amber-200/80">
                  <strong>Reflective Soul Inquiry:</strong> {card.reflectiveQuestion}
                </div>
              </div>
            )}

            {activeTab === "symbolism" && (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20 space-y-2">
                  <h4 className="font-serif font-bold text-amber-300 text-sm">Visual & Esoteric Symbolism</h4>
                  <p className="text-xs text-amber-100/90 leading-relaxed">{card.symbolism}</p>
                </div>
              </div>
            )}

            {activeTab === "shadow" && (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30 space-y-2">
                  <h4 className="font-serif font-bold text-red-300 text-sm flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    <span>Shadow Aspects & Unconscious Pitfalls</span>
                  </h4>
                  <p className="text-xs text-red-100/90 leading-relaxed">{card.shadowMeaning}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/20 text-xs text-amber-200/80">
                  <strong>Cosmic Warning:</strong> {card.warning}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
