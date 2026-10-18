import React, { useState } from "react";
import { TarotCardData } from "../../types/tarot";
import { motion } from "motion/react";
import { TAROT_CARD_BACK_URL } from "../../data/tarotMasterDeck";
import { resolveImageUrl } from "../../utils/imageResolver";
import { Sparkles, Hand } from "lucide-react";
import { tarotAudio } from "../../services/tarotAudioService";

interface TarotCardFanProps {
  deck: { card: TarotCardData; isReversed: boolean }[];
  onSelectCard: (index: number) => void;
  disabled?: boolean;
  drawnIndices: number[];
  remainingDraws: number;
}

export const TarotCardFan: React.FC<TarotCardFanProps> = ({
  deck,
  onSelectCard,
  disabled = false,
  drawnIndices,
  remainingDraws,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // We display a subset of fan cards (e.g. 26-30 evenly spaced cards) representing the full deck for fluid 60fps rendering
  const sampleCount = 28;
  const step = Math.floor(deck.length / sampleCount);
  const visibleCardIndices = Array.from({ length: sampleCount }, (_, i) => i * step);

  return (
    <div className="w-full relative flex flex-col items-center justify-center py-6 select-none overflow-hidden">
      {/* Guidance Header */}
      <div className="mb-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-semibold shadow-md animate-pulse">
          <Hand className="w-4 h-4 text-amber-400" />
          <span>Trust your intuition • Choose {remainingDraws} {remainingDraws === 1 ? "card" : "cards"}</span>
        </div>
      </div>

      {/* 3D Arc Card Fan Container */}
      <div className="relative h-64 sm:h-72 w-full max-w-4xl flex items-center justify-center">
        {visibleCardIndices.map((deckIndex, i) => {
          const isDrawn = drawnIndices.includes(deckIndex);
          const isHovered = hoveredIndex === i;
          
          // Calculate angle and x offset for fan arc
          const angle = (i - (sampleCount - 1) / 2) * 2.8; // -38 to +38 deg
          const xOffset = (i - (sampleCount - 1) / 2) * 22; // spread along X
          const yOffset = Math.abs(i - (sampleCount - 1) / 2) * 2.5; // subtle arch curve

          return (
            <motion.div
              key={deckIndex}
              onMouseEnter={() => {
                if (!disabled && !isDrawn) {
                  setHoveredIndex(i);
                  tarotAudio.playCardHover();
                }
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                if (!disabled && !isDrawn && remainingDraws > 0) {
                  tarotAudio.playCardDraw();
                  onSelectCard(deckIndex);
                }
              }}
              style={{
                position: "absolute",
                transformOrigin: "50% 120%",
                zIndex: isHovered ? 50 : i,
              }}
              animate={{
                x: xOffset,
                y: isHovered ? yOffset - 36 : isDrawn ? yOffset + 120 : yOffset,
                rotate: isHovered ? 0 : angle,
                scale: isHovered ? 1.15 : isDrawn ? 0.8 : 1,
                opacity: isDrawn ? 0 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 24,
              }}
              className={`w-24 sm:w-28 h-36 sm:h-44 rounded-xl cursor-pointer shadow-md transition-shadow ${
                disabled || isDrawn ? "cursor-not-allowed" : "hover:shadow-2xl hover:shadow-amber-500/30"
              }`}
            >
              {/* Card Back Artwork with Gold Border */}
              <div className="w-full h-full rounded-xl overflow-hidden border-2 border-amber-400/60 bg-gradient-to-br from-amber-950 via-slate-950 to-indigo-950 relative">
                <img
                  src={resolveImageUrl(TAROT_CARD_BACK_URL)}
                  alt="Card Back"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-1 rounded-lg border border-amber-300/30 pointer-events-none flex items-center justify-center">
                  {isHovered && (
                    <div className="p-1 rounded-full bg-amber-950/80 border border-amber-400/50 shadow-xs">
                      <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-[11px] text-amber-200/60 mt-3 font-serif italic">
        Hover along the deck to feel the energetic resonance, then click to reveal.
      </p>
    </div>
  );
};
