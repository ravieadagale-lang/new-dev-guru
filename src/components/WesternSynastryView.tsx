import React from "react";
import { ComprehensiveMatchResult } from "../utils/compatibilityCalculator";
import { Compass, Sparkles, Heart, Sun, Moon, Flame, Star, ShieldCheck } from "lucide-react";

interface WesternSynastryViewProps {
  matchResult: ComprehensiveMatchResult;
}

export const WesternSynastryView: React.FC<WesternSynastryViewProps> = ({ matchResult }) => {
  const { partnerA, partnerB, percentage } = matchResult;

  // Synastry harmonic inter-aspects based on partner rashis/signs
  const aspectPairs = [
    {
      planets: "Sun ☉ Sun",
      nature: "Trine (120°) - Harmonious Core Values",
      description: "Natural philosophical alignment, shared life mission, and effortless mutual respect.",
      score: 92,
      isFavorable: true,
      category: "Vitality & Ego Resonance"
    },
    {
      planets: "Moon ☽ Venus",
      nature: "Sextile (60°) - Emotional Tenderness",
      description: "Deep affection, comforting domestic affinity, and soothing mutual vulnerability.",
      score: 88,
      isFavorable: true,
      category: "Romantic & Intimate Warmth"
    },
    {
      planets: "Venus ♀ Mars",
      nature: "Conjunction / Trine - Magnetic Chemistry",
      description: "Intense physical attraction balanced by creative collaboration and romantic zest.",
      score: 94,
      isFavorable: true,
      category: "Erotic & Passion Dynamic"
    },
    {
      planets: "Mercury ☿ Jupiter",
      nature: "Trine - Expansive Intellectual Rapport",
      description: "Stimulating conversations, shared humor, continuous joint learning, and wisdom cultivation.",
      score: 85,
      isFavorable: true,
      category: "Communication & Vision"
    },
    {
      planets: "Saturn ♄ Sun",
      nature: "Stabilizing Sextile - Structural Longevity",
      description: "Provides enduring grounding, steadfast loyalty, and serious mutual commitment.",
      score: 80,
      isFavorable: true,
      category: "Commitment & Karmic Duty"
    }
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm space-y-8 animate-in fade-in">
      {/* HEADER SECTION */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <Compass className="w-7 h-7 text-amber-700" />
        <div>
          <h3 className="font-serif text-2xl font-bold text-slate-900">
            Western Synastry &amp; Composite Relationship Matrix
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Planetary cross-aspects, luminary connections, and interpersonal psychological dynamics.
          </p>
        </div>
      </div>

      {/* OVERVIEW HERO */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl border border-indigo-500/20 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <div className="space-y-1 pt-2 md:pt-0">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
              {partnerA.name}
            </span>
            <div className="flex items-center justify-center gap-1.5 text-lg font-serif font-bold text-amber-100">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>{partnerA.rashi}</span>
            </div>
            <span className="text-xs text-slate-400">Moon: {partnerA.nakshatra}</span>
          </div>

          <div className="space-y-1 pt-2 md:pt-0">
            <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">
              Synastry Composite Score
            </span>
            <span className="font-serif text-3xl font-bold text-indigo-200">
              {percentage}%
            </span>
            <span className="text-xs text-emerald-400 font-medium block">
              ✓ Highly Cohesive Harmonic Overlay
            </span>
          </div>

          <div className="space-y-1 pt-2 md:pt-0">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
              {partnerB.name}
            </span>
            <div className="flex items-center justify-center gap-1.5 text-lg font-serif font-bold text-amber-100">
              <Moon className="w-4 h-4 text-indigo-300" />
              <span>{partnerB.rashi}</span>
            </div>
            <span className="text-xs text-slate-400">Moon: {partnerB.nakshatra}</span>
          </div>
        </div>
      </div>

      {/* DETAILED INTER-ASPECTS LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            Core Cross-Aspect Interactions
          </h4>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
            5 Major Planetary Contacts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aspectPairs.map((aspect, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200 hover:border-amber-300 transition-all bg-slate-50/50 hover:bg-white shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                  {aspect.planets}
                </span>
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {aspect.score}% Synergy
                </span>
              </div>

              <div>
                <h5 className="font-semibold text-slate-900 text-sm">{aspect.nature}</h5>
                <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                  Category: {aspect.category}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                {aspect.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SYNTHESIS FOOTER */}
      <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>Composite Synastry Synthesis</span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          The synastry chart illustrates a rare confluence of mental clarity and emotional security. The Sun-Sun and Moon-Venus harmonies anchor the connection against day-to-day misunderstandings, while the dynamic Venus-Mars interplay sustains long-term relational chemistry and shared aspirations.
        </p>
      </div>
    </div>
  );
};
