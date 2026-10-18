import React, { useState, useEffect } from "react";
import { X, Sparkles, Hand, Compass, Shield, Award, ChevronRight, Activity, GitCommit, Layers, Flame, Trees, Mountain } from "lucide-react";

export type PalmSystemSection = "cheirognomy" | "chiromancy" | "karmicdiff";

interface PalmSystemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: PalmSystemSection;
  onStartReading?: () => void;
}

export const PalmSystemDetailModal: React.FC<PalmSystemDetailModalProps> = ({
  isOpen,
  onClose,
  initialSection = "cheirognomy",
  onStartReading,
}) => {
  const [activeSection, setActiveSection] = useState<PalmSystemSection>(initialSection);

  useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);

  // ESC key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-amber-900/20 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-amber-950 via-slate-900 to-yellow-950 text-white border-b border-amber-800/40 flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-semibold tracking-wide border border-amber-400/30">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Classical Palmistry &amp; Hastarekha Guide</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200">
              {activeSection === "cheirognomy" && "Hand Shapes & Archetypes (Cheirognomy)"}
              {activeSection === "chiromancy" && "Principal Lines & Planetary Mounts (Chiromancy)"}
              {activeSection === "karmicdiff" && "Innate (Left) vs Active (Right) Karmic Matrix"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveSection("cheirognomy")}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeSection === "cheirognomy"
                ? "border-amber-600 text-amber-700 bg-white shadow-sm rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Hand className="w-4 h-4 text-amber-600" />
            <span>Layer 1: Cheirognomy (7 Types)</span>
          </button>

          <button
            onClick={() => setActiveSection("chiromancy")}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeSection === "chiromancy"
                ? "border-emerald-600 text-emerald-700 bg-white shadow-sm rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>Layer 2: Chiromancy (Lines &amp; Mounts)</span>
          </button>

          <button
            onClick={() => setActiveSection("karmicdiff")}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeSection === "karmicdiff"
                ? "border-indigo-600 text-indigo-700 bg-white shadow-sm rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <GitCommit className="w-4 h-4 text-indigo-600" />
            <span>Layer 3: Karmic Diff (Dual Palm)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-700">
          {/* 1. CHEIROGNOMY SECTION */}
          {activeSection === "cheirognomy" && (
            <div className="space-y-6">
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                  <strong>Cheirognomy</strong> is the branch of palmistry that analyzes the gross morphology of the hand: palm proportions, finger length and knuckles, thumb willpower/logic balance, and texture. These structural traits form your enduring constitutional archetype.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Square Hand */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    Type 1: Practical
                  </span>
                  <h4 className="font-serif font-bold text-sm text-slate-900">
                    The Square Hand (Practical / Useful)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Square palm with square fingertips and well-developed thumb. Highly disciplined, honest, methodical, punctual, and excels in structured organizations and reliable craftsmanship.
                  </p>
                  <p className="text-[11px] text-slate-500"><strong>Key Trait:</strong> Logic, duty, order, and practical perseverance.</p>
                </div>

                {/* 2. Spatulate Hand */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                    Type 2: Action
                  </span>
                  <h4 className="font-serif font-bold text-sm text-slate-900">
                    The Spatulate Hand (Active / Inventive)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Fingertips or palm flared wider at the base or tips. High physical energy, restless drive, innovative spirit, mechanical ingenuity, loves travel, exploration, and challenging norms.
                  </p>
                  <p className="text-[11px] text-slate-500"><strong>Key Trait:</strong> Originality, innovation, boldness, dynamic restlessness.</p>
                </div>

                {/* 3. Philosophic Hand */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Type 3: Intellectual
                  </span>
                  <h4 className="font-serif font-bold text-sm text-slate-900">
                    The Philosophic Hand (Knotted / Seeker)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Long, bony hand with prominent joint knots on fingers. Natural analyst, scholar, truth-seeker, independent thinker who questions dogmas and values wisdom above material wealth.
                  </p>
                  <p className="text-[11px] text-slate-500"><strong>Key Trait:</strong> Deep contemplation, philosophical depth, research acumen.</p>
                </div>

                {/* 4. Conic Hand */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    Type 4: Artistic
                  </span>
                  <h4 className="font-serif font-bold text-sm text-slate-900">
                    The Conic Hand (Artistic / Emotional)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Graceful tapering fingers, smooth palm contours, soft touch. Instinctively artistic, aesthetic lover, intuitive, quick-witted, generous, and emotionally responsive.
                  </p>
                  <p className="text-[11px] text-slate-500"><strong>Key Trait:</strong> Creative intuition, refined aesthetics, charm and charisma.</p>
                </div>

                {/* 5. Psychic Hand */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                    Type 5: Visionary
                  </span>
                  <h4 className="font-serif font-bold text-sm text-slate-900">
                    The Psychic Hand (Idealistic / Spiritual)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Long, delicate, slender hand with pointed fingertips. Highly sensitive, visionary, spiritual medium qualities, lives in higher realms of imagination and idealism.
                  </p>
                  <p className="text-[11px] text-slate-500"><strong>Key Trait:</strong> Mystical sensitivity, prophetic dreams, spiritual purity.</p>
                </div>

                {/* 6. Elementary & Mixed Hands */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                    Type 6 &amp; 7: Elemental &amp; Mixed
                  </span>
                  <h4 className="font-serif font-bold text-sm text-slate-900">
                    Elementary &amp; Mixed (Versatile) Hands
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Elementary:</strong> Heavy, thick palm with short fingers—governed by instinct and physical strength. <strong>Mixed:</strong> Blended fingers from different types—highly adaptable, multi-talented chameleon.
                  </p>
                  <p className="text-[11px] text-slate-500"><strong>Key Trait:</strong> Adaptability, multifaceted skills, survival resilience.</p>
                </div>
              </div>
            </div>
          )}

          {/* 2. CHIROMANCY SECTION */}
          {activeSection === "chiromancy" && (
            <div className="space-y-6">
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200">
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                  <strong>Chiromancy</strong> is the study of palm lines and the 7 planetary mount elevations. Lines represent neurological energy pathways that evolve in response to thoughts, habits, and pivotal life events.
                </p>
              </div>

              {/* Principal Lines */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span>The 3 Principal Lines</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <span className="font-bold text-emerald-900 block text-sm">Life Line (Vitality)</span>
                    <p className="text-slate-600 leading-relaxed">
                      Curves around the base of the thumb (Mount of Venus). Measures constitutional vitality, stamina, physical resilience, and major geographical or lifestyle shifts.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <span className="font-bold text-blue-900 block text-sm">Head Line (Intellect)</span>
                    <p className="text-slate-600 leading-relaxed">
                      Traverses the middle of the palm. Decodes mental focus, concentration span, analytical vs creative leaning, and psychological clarity under pressure.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <span className="font-bold text-rose-900 block text-sm">Heart Line (Emotions)</span>
                    <p className="text-slate-600 leading-relaxed">
                      Runs across the upper palm below the fingers. Maps emotional expression, romantic loyalty, empathy capacity, and relational boundaries.
                    </p>
                  </div>
                </div>
              </div>

              {/* Secondary Lines */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span>Secondary &amp; Destiny Lines</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">Fate Line (Saturn Line)</p>
                    <p className="text-slate-600 text-[11px] mt-1">Vertical line to middle finger. Reveals career destiny, self-made drive, and milestones.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">Sun Line (Apollo Line)</p>
                    <p className="text-slate-600 text-[11px] mt-1">Runs to ring finger. Governs fame, creative recognition, public honor, and wealth.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">Mercury Line (Health / Intuition)</p>
                    <p className="text-slate-600 text-[11px] mt-1">Runs to pinky finger. Governs commercial instincts, gut feeling, and bodily wellness.</p>
                  </div>
                </div>
              </div>

              {/* 7 Planetary Mounts */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Compass className="w-4 h-4 text-purple-600" />
                  <span>The 7 Planetary Mounts</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-purple-900">Jupiter (Index Base)</p>
                    <p className="text-slate-600">Ambition, leadership, nobility.</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-purple-900">Saturn (Middle Base)</p>
                    <p className="text-slate-600">Discipline, wisdom, karma.</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-purple-900">Apollo / Sun (Ring Base)</p>
                    <p className="text-slate-600">Creativity, charisma, joy.</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-purple-900">Mercury (Pinky Base)</p>
                    <p className="text-slate-600">Speech, commerce, science.</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-purple-900">Mars (Upper &amp; Lower)</p>
                    <p className="text-slate-600">Courage, resilience, defense.</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-purple-900">Venus (Thumb Base)</p>
                    <p className="text-slate-600">Passion, love, vital warmth.</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 col-span-2">
                    <p className="font-bold text-purple-900">Luna / Moon (Percussion Base)</p>
                    <p className="text-slate-600">Subconscious imagination, intuition, travel instincts.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. KARMIC DIFF SECTION */}
          {activeSection === "karmicdiff" && (
            <div className="space-y-6">
              <div className="bg-indigo-50/60 p-4 rounded-2xl border border-indigo-200">
                <p className="text-xs sm:text-sm text-indigo-900 leading-relaxed font-medium">
                  The true power of dual palmistry lies in the <strong>Karmic Differential Matrix</strong>: comparing your <strong>Passive Hand (Left in right-handed individuals)</strong> with your <strong>Active Hand (Right in right-handed individuals)</strong> to measure how your free will has evolved beyond your inborn blueprint.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Palm */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                      Passive Hand
                    </span>
                    <span className="text-xs font-bold text-slate-500">Innate Blueprint</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-slate-900">
                    Left Palm: Inborn Karma (Sanchita)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Represents what you arrived into this life with: genetic inheritance, ancestral predispositions, subconscious impulses, latent spiritual gifts, and unmanifested potential.
                  </p>
                  <div className="pt-2 border-t border-slate-200 space-y-1 text-[11px] text-slate-600">
                    <p>&bull; Natural emotional temperament</p>
                    <p>&bull; Inherited physical resilience baseline</p>
                    <p>&bull; The karmic hand dealt at birth</p>
                  </div>
                </div>

                {/* Right Palm */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Active Hand
                    </span>
                    <span className="text-xs font-bold text-slate-500">Conscious Manifestation</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-slate-900">
                    Right Palm: Free Will (Kriyamana)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Represents what you have made of yourself through conscious choices, moral discipline, deliberate study, meditation, and daily willpower in the material world.
                  </p>
                  <div className="pt-2 border-t border-slate-200 space-y-1 text-[11px] text-slate-600">
                    <p>&bull; Active career advancements and earned wealth</p>
                    <p>&bull; Cultivated emotional mastery and relationship choices</p>
                    <p>&bull; Re-routed destiny lines through conscious intention</p>
                  </div>
                </div>
              </div>

              {/* How to Read Differences */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                <h4 className="font-serif font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span>Interpreting the Dual Hand Difference</span>
                </h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <strong className="text-slate-900">Right Hand Stronger Than Left:</strong> You have successfully outgrown early limitations, expanded your mental and physical capabilities, and built a destiny surpassing your family baseline.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <strong className="text-slate-900">Right Hand Shows New Branching Lines:</strong> Indicates pivots, foreign relocations, sudden self-made enterprises, or newfound spiritual awakenings not present in your birth blueprint.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <strong className="text-slate-900">Left Hand Deeper Than Right:</strong> Suggests dormant latent talents or inner callings waiting to be activated through courageous action in your waking life.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            Ready to scan and compare your dual palms with the AI engine?
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Close
            </button>
            {onStartReading && (
              <button
                onClick={() => {
                  onClose();
                  onStartReading();
                }}
                className="flex-1 sm:flex-none px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Launch Palm Reader</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
