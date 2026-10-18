import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Layers, RefreshCw, Zap, Flame, Compass, ArrowRight, Shuffle } from "lucide-react";
import { TAROT_CARD_BACK_URL } from "../../data/tarotMasterDeck";
import { resolveImageUrl } from "../../utils/imageResolver";
import { tarotAudio } from "../../services/tarotAudioService";

export type ShuffleStyle = "classic" | "overhand" | "mystical" | "quick";

interface TarotShuffleAnimationProps {
  onShuffleComplete: () => void;
  shuffleStyle?: ShuffleStyle;
  title?: string;
  subtitle?: string;
  autoStart?: boolean;
  completeButtonLabel?: string;
}

export const TarotShuffleAnimation: React.FC<TarotShuffleAnimationProps> = ({
  onShuffleComplete,
  shuffleStyle = "mystical",
  title,
  subtitle,
  autoStart = true,
  completeButtonLabel = "Proceed to Card Selection",
}) => {
  const [shuffleStep, setShuffleStep] = useState<number>(0);
  const [selectedStyle, setSelectedStyle] = useState<ShuffleStyle>(shuffleStyle);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [hasCompletedOnce, setHasCompletedOnce] = useState<boolean>(false);

  const startShuffle = (style: ShuffleStyle) => {
    setSelectedStyle(style);
    setIsShuffling(true);
    setShuffleStep(1);

    const duration = style === "quick" ? 1200 : style === "classic" ? 2200 : 2800;

    // Trigger audio effects
    tarotAudio.playCardShuffle(duration / 1000);
    if (style === "mystical") {
      tarotAudio.playMysticalChime(432, 2.5);
    }

    const timer1 = setTimeout(() => {
      setShuffleStep(2);
      tarotAudio.playCardShuffle(0.8);
    }, duration * 0.35);

    const timer2 = setTimeout(() => {
      setShuffleStep(3);
    }, duration * 0.7);

    const timer3 = setTimeout(() => {
      setIsShuffling(false);
      setShuffleStep(4);
      setHasCompletedOnce(true);
      tarotAudio.playMysticalChime(528, 1.5);
      if (autoStart) {
        onShuffleComplete();
      }
    }, duration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  useEffect(() => {
    if (autoStart) {
      startShuffle((shuffleStyle as ShuffleStyle) || "mystical");
    }
  }, [shuffleStyle, autoStart]);

  return (
    <div className="w-full py-6 sm:py-8 flex flex-col items-center justify-center select-none text-center">
      {/* 3D Deck Animation Stage with Perspective */}
      <div className="relative w-72 h-84 flex items-center justify-center perspective-1000 mb-6">
        {/* Ambient Glow Aura & Sacred Rings */}
        <div className="absolute w-64 h-80 rounded-full bg-gradient-to-tr from-amber-500/25 via-yellow-500/15 to-indigo-600/25 blur-3xl animate-pulse" />
        <div className="absolute w-56 h-56 rounded-full border border-amber-400/20 border-dashed animate-spin-slow pointer-events-none" />

        {/* Shuffling Cards 3D Deck Stack */}
        <div className="relative w-44 h-64" style={{ transformStyle: "preserve-3d" }}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
            let animateProps: any = { 
              x: 0, 
              y: -idx * 2.5, 
              z: idx * 4,
              rotateZ: 0, 
              rotateY: 0,
              scale: 1 
            };

            if (isShuffling) {
              if (selectedStyle === "mystical") {
                if (shuffleStep === 1) {
                  animateProps = {
                    x: (idx % 2 === 0 ? -1 : 1) * (50 + idx * 10),
                    y: -idx * 5,
                    z: idx * 15,
                    rotateZ: (idx % 2 === 0 ? -1 : 1) * (20 + idx * 4),
                    rotateY: (idx % 2 === 0 ? -1 : 1) * 25,
                    scale: 1.06,
                  };
                } else if (shuffleStep === 2) {
                  animateProps = {
                    x: Math.cos((idx / 8) * Math.PI * 2) * 75,
                    y: Math.sin((idx / 8) * Math.PI * 2) * 45,
                    z: Math.sin((idx / 8) * Math.PI * 2) * 30,
                    rotateZ: idx * 45,
                    rotateY: (idx % 2 === 0 ? 15 : -15),
                    scale: 1.1,
                  };
                } else if (shuffleStep === 3) {
                  animateProps = { 
                    x: 0, 
                    y: -idx * 2.5, 
                    z: idx * 4,
                    rotateZ: 0, 
                    rotateY: 0,
                    scale: 1 
                  };
                }
              } else if (selectedStyle === "overhand") {
                if (shuffleStep === 1) {
                  animateProps = { 
                    x: idx * 18 - 60, 
                    y: -idx * 12, 
                    z: idx * 12,
                    rotateZ: idx * 5 - 15,
                    rotateY: idx * 3 
                  };
                } else if (shuffleStep === 2) {
                  animateProps = { 
                    x: -idx * 18 + 60, 
                    y: idx * 10, 
                    z: idx * 8,
                    rotateZ: -idx * 5 + 15,
                    rotateY: -idx * 3 
                  };
                }
              } else {
                // Classic Riffle
                if (shuffleStep === 1) {
                  animateProps = { 
                    x: idx % 2 === 0 ? -60 : 60, 
                    y: -idx * 4, 
                    z: idx * 14,
                    rotateZ: idx % 2 === 0 ? -15 : 15,
                    rotateY: idx % 2 === 0 ? -20 : 20 
                  };
                } else if (shuffleStep === 2) {
                  animateProps = { 
                    x: idx % 2 === 0 ? -12 : 12, 
                    y: -idx * 2.5, 
                    z: idx * 4,
                    rotateZ: 0,
                    rotateY: 0 
                  };
                }
              }
            }

            return (
              <motion.div
                key={idx}
                animate={animateProps}
                transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                style={{ zIndex: idx }}
                className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl bg-gradient-to-br from-amber-950 via-slate-950 to-indigo-950 backdrop-blur-xs"
              >
                <img
                  src={resolveImageUrl(TAROT_CARD_BACK_URL)}
                  alt="Card Back"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-1 rounded-xl border border-amber-300/40 flex items-center justify-center pointer-events-none">
                  {idx === 7 && (
                    <Sparkles className="w-7 h-7 text-amber-300 animate-pulse" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Status Title & Copy */}
      <div className="space-y-2 mb-6 max-w-md mx-auto">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100 flex items-center justify-center gap-2">
          {isShuffling ? (
            <>
              <RefreshCw className="w-5 h-5 text-amber-400 animate-spin" />
              <span>{title || "Attuning the Sacred 78-Card Deck..."}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>{hasCompletedOnce ? "Deck Consecrated & Ready" : (title || "Consecrate & Shuffle Deck")}</span>
            </>
          )}
        </h3>
        <p className="text-xs text-amber-200/80 leading-relaxed font-sans">
          {isShuffling
            ? "Channeling cosmic vibrations and synchronizing your energetic intent with the cards."
            : (subtitle || "Focus on your question with clarity, calmness, and an open heart before selecting your cards.")}
        </p>
      </div>

      {/* Shuffle Ritual Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        <button
          onClick={() => startShuffle("mystical")}
          disabled={isShuffling}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            selectedStyle === "mystical"
              ? "bg-amber-500 text-slate-950 shadow-md font-bold scale-105"
              : "bg-slate-900 text-amber-200 border border-amber-500/30 hover:bg-slate-800"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mystical Orbit</span>
        </button>

        <button
          onClick={() => startShuffle("classic")}
          disabled={isShuffling}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            selectedStyle === "classic"
              ? "bg-amber-500 text-slate-950 shadow-md font-bold scale-105"
              : "bg-slate-900 text-amber-200 border border-amber-500/30 hover:bg-slate-800"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Classic 3D Riffle</span>
        </button>

        <button
          onClick={() => startShuffle("overhand")}
          disabled={isShuffling}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            selectedStyle === "overhand"
              ? "bg-amber-500 text-slate-950 shadow-md font-bold scale-105"
              : "bg-slate-900 text-amber-200 border border-amber-500/30 hover:bg-slate-800"
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Overhand Cascade</span>
        </button>

        <button
          onClick={() => startShuffle("quick")}
          disabled={isShuffling}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            selectedStyle === "quick"
              ? "bg-amber-500 text-slate-950 shadow-md font-bold scale-105"
              : "bg-slate-900 text-amber-200 border border-amber-500/30 hover:bg-slate-800"
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Quick Attune</span>
        </button>
      </div>

      {/* Manual Action Buttons (When not auto-completing or after shuffle) */}
      {!autoStart && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => startShuffle(selectedStyle)}
            disabled={isShuffling}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-200 text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Shuffle className="w-4 h-4 text-amber-400" />
            <span>{isShuffling ? "Shuffling 3D Deck..." : "Shuffle Again"}</span>
          </button>

          <button
            onClick={onShuffleComplete}
            disabled={isShuffling}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-lg hover:scale-105 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{completeButtonLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

