import React, { useEffect, useRef } from "react";
import { TarotCardData } from "../../types/tarot";
import { Sparkles, Eye, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TAROT_CARD_BACK_URL } from "../../data/tarotMasterDeck";
import { resolveImageUrl } from "../../utils/imageResolver";
import { tarotAudio } from "../../services/tarotAudioService";

interface TarotCard3DProps {
  card?: TarotCardData;
  isFlipped?: boolean; // true = show front, false = show back
  isReversed?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
  isHoverable?: boolean;
  isSelected?: boolean;
  positionLabel?: string;
  className?: string;
  showDetailsOnHover?: boolean;
  revealDelay?: number; // Delay in seconds for staggered spread reveals
}

export const TarotCard3D: React.FC<TarotCard3DProps> = ({
  card,
  isFlipped = false,
  isReversed = false,
  size = "md",
  onClick,
  isHoverable = true,
  isSelected = false,
  positionLabel,
  className = "",
  showDetailsOnHover = false,
  revealDelay = 0,
}) => {
  const prevFlippedRef = useRef(isFlipped);

  // Play flip sound when card flips from back to front
  useEffect(() => {
    if (isFlipped && !prevFlippedRef.current) {
      const timer = setTimeout(() => {
        tarotAudio.playCardFlip();
      }, revealDelay * 1000);
      return () => clearTimeout(timer);
    }
    prevFlippedRef.current = isFlipped;
  }, [isFlipped, revealDelay]);

  const sizeClasses = {
    sm: "w-20 h-32 text-[10px]",
    md: "w-36 h-56 sm:w-40 sm:h-64 text-xs",
    lg: "w-52 h-80 sm:w-60 sm:h-92 text-sm",
    xl: "w-64 h-96 sm:w-72 sm:h-[440px] text-base"
  }[size];

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Position Label Tag with subtle fade entry */}
      {positionLabel && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: revealDelay }}
          className="mb-2 px-2.5 py-0.5 rounded-full bg-amber-950/90 border border-amber-500/40 text-amber-200 text-[11px] font-medium tracking-wide shadow-xs truncate max-w-[180px] backdrop-blur-xs"
        >
          {positionLabel}
        </motion.div>
      )}

      {/* 3D Perspective Card Container with Magical Ambient Glow Aura */}
      <div className="relative group">
        {/* Mystical Golden Aura on Reveal (Fading in & pulsing behind the card) */}
        <AnimatePresence>
          {isFlipped && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
              animate={{
                opacity: [0, 0.75, 0.4],
                scale: [0.85, 1.15, 1.05],
                filter: ["blur(14px)", "blur(24px)", "blur(20px)"]
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.2, type: "tween", ease: "easeOut", delay: revealDelay }}
              className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-amber-500/30 via-yellow-400/25 to-amber-600/30 pointer-events-none -z-10"
            />
          )}
        </AnimatePresence>

        {/* Outer Perspective Wrapper */}
        <motion.div
          onClick={onClick}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={isHoverable ? { y: -6, scale: 1.03, transition: { duration: 0.2 } } : undefined}
          whileTap={isHoverable ? { scale: 0.98 } : undefined}
          transition={{ duration: 0.5, delay: revealDelay, ease: [0.16, 1, 0.3, 1] }}
          className={`relative ${sizeClasses} cursor-pointer perspective-1000 transition-shadow ${
            isSelected ? "ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-950 rounded-2xl shadow-xl shadow-amber-500/30" : ""
          }`}
          style={{ perspective: "1200px" }}
        >
          {/* Card Flipper with 3D Flip-and-Fade Motion */}
          <motion.div
            animate={{
              rotateY: isFlipped ? 180 : 0,
              rotateZ: isFlipped && isReversed ? 180 : 0,
              z: isFlipped ? 10 : 0,
            }}
            transition={{
              duration: 0.85,
              delay: revealDelay,
              ease: [0.34, 1.3, 0.64, 1], // Natural spring-like overshoot
            }}
            className="w-full h-full relative rounded-2xl shadow-xl"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* ================= BACK OF CARD (Visible when NOT flipped) ================= */}
            <motion.div
              animate={{
                opacity: isFlipped ? 0 : 1,
              }}
              transition={{
                duration: 0.35,
                delay: isFlipped ? revealDelay + 0.15 : revealDelay,
              }}
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-md bg-gradient-to-br from-amber-950 via-slate-950 to-indigo-950 flex items-center justify-center backface-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <img
                src={resolveImageUrl(TAROT_CARD_BACK_URL)}
                alt="Tarot Card Back"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-2xl opacity-95 group-hover:opacity-100 transition-opacity"
              />
              {/* Sacred Geometry Gold Foil Border Overlay */}
              <div className="absolute inset-1.5 rounded-xl border border-amber-400/40 pointer-events-none flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-amber-300/30 flex items-center justify-center bg-amber-950/40 backdrop-blur-xs">
                  <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                </div>
              </div>
            </motion.div>

            {/* ================= FRONT OF CARD (Visible when flipped) ================= */}
            <motion.div
              animate={{
                opacity: isFlipped ? 1 : 0,
              }}
              transition={{
                duration: 0.45,
                delay: isFlipped ? revealDelay + 0.2 : revealDelay,
              }}
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border-2 border-amber-400/70 shadow-2xl bg-slate-950 backface-hidden flex flex-col"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              {card ? (
                <div className="relative w-full h-full flex flex-col bg-slate-950">
                  {/* Card Artwork Image with subtle zoom on hover */}
                  <div className="relative flex-1 w-full overflow-hidden bg-slate-900">
                    <img
                      src={resolveImageUrl(card.imageUrl)}
                      alt={card.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Shadow Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-85" />

                    {/* Celestial Shimmer Light Sweep across card upon reveal */}
                    {isFlipped && (
                      <motion.div
                        initial={{ x: "-120%", opacity: 0 }}
                        animate={{
                          x: ["-120%", "200%"],
                          opacity: [0, 0.6, 0]
                        }}
                        transition={{
                          duration: 1.1,
                          delay: revealDelay + 0.35,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent skew-x-12 pointer-events-none"
                      />
                    )}
                  </div>

                  {/* Card Header Overlay */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-xs border border-amber-400/50 text-[10px] font-serif font-bold text-amber-300 shadow-xs">
                      {card.romanNumeral || card.rank}
                    </span>
                    {isReversed && (
                      <span className="px-2 py-0.5 rounded-md bg-red-950/90 border border-red-500/50 text-[9px] font-bold text-red-300 uppercase tracking-widest shadow-xs">
                        Reversed
                      </span>
                    )}
                  </div>

                  {/* Bottom Card Title Banner with Gold Trim */}
                  <div className="p-2 sm:p-2.5 bg-gradient-to-b from-slate-950/95 to-black border-t border-amber-500/40 text-center">
                    <div className="font-serif font-bold text-amber-200 tracking-tight leading-tight truncate">
                      {card.name}
                    </div>
                    <div className="text-[9px] text-amber-400/85 truncate font-mono">
                      {card.sanskritTitle || card.archetype}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-amber-400">
                  <Sparkles className="w-8 h-8 animate-spin-slow" />
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
