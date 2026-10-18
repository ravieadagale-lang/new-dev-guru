import React, { useState } from "react";
import { UserProfile, PlanetPosition, HouseDetail } from "../../types";
import { 
  Calculator, 
  Compass, 
  Clock, 
  Sparkles, 
  Activity, 
  Heart, 
  Calendar, 
  Sliders, 
  HelpCircle, 
  Layers, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { playCardHoverSound, playCardFlipSound } from "../../utils/audioEffects";

interface AstrologyToolsWorkspaceProps {
  onSelectToolAction?: (toolId: string) => void;
}

export const AstrologyToolsWorkspace: React.FC<AstrologyToolsWorkspaceProps> = ({
  onSelectToolAction
}) => {
  const toolsList = [
    {
      id: "kundli_calc",
      title: "Complete Kundli Calculator",
      category: "Birth Chart",
      description: "Generates instant D1 to D60 vargas, planetary degrees, avasthas, and house tables.",
      badge: "Core Engine"
    },
    {
      id: "dasha_calc",
      title: "5-Tier Dasha Calculator",
      category: "Timing & Prediction",
      description: "Computes exact Maha, Antar, Pratyantar, Sookshma, and Prana dasha timelines.",
      badge: "Vimshottari"
    },
    {
      id: "yoga_finder",
      title: "1,001+ Classical Yoga Finder",
      category: "Combinations",
      description: "Scans chart against 1,001+ Parashari and Jaimini Raja, Dhana, and Mahapurusha Yogas.",
      badge: "Deterministic"
    },
    {
      id: "dosha_finder",
      title: "Dosha & Cancellation Analyzer",
      category: "Afflictions",
      description: "Evaluates Kuja/Manglik, Sade Sati, Kemadruma, Pitru, and Kala Sarpa with Bhanga rules.",
      badge: "Parihara"
    },
    {
      id: "transit_calc",
      title: "Planetary Transit (Gochara) Radar",
      category: "Real-Time Sky",
      description: "Superimposes real-time planet positions over natal houses with Ashtakavarga scores.",
      badge: "Live Ephemeris"
    },
    {
      id: "muhurat_finder",
      title: "18+ Activity Muhurat Finder",
      category: "Electional",
      description: "Finds auspicious timings for Marriage, Griha Pravesh, Vehicle, Business, and Registry.",
      badge: "Shubh Muhurta"
    },
    {
      id: "nakshatra_calc",
      title: "27 Nakshatra & Pada Calculator",
      category: "Constellations",
      description: "Reveals exact lunar mansion, pada, deity, animal symbol, and cosmic element.",
      badge: "Lunar Mansions"
    },
    {
      id: "guna_milan",
      title: "Ashta Koota 36-Point Matcher",
      category: "Compatibility",
      description: "Computes 36-point Guna Milan matching with Nadi, Bhakoot, and Gana breakdowns.",
      badge: "Synastry"
    },
    {
      id: "prashna_calc",
      title: "Prashna Kundli (Horary) Engine",
      category: "Divination",
      description: "Casts immediate chart for query moment to answer specific urgent questions.",
      badge: "Real-Time"
    },
    {
      id: "btr_tool",
      title: "Birth Time Rectification (BTR)",
      category: "Precision Calibration",
      description: "Rectifies birth time down to the exact second using major past life event markers.",
      badge: "Tatwa / Kunda"
    },
    {
      id: "ayanamsha_comp",
      title: "Ayanamsha Comparison Matrix",
      category: "Astronomical",
      description: "Compares Lahiri, KP, Raman, Yukteshwar, and Tropical zodiac degrees side-by-side.",
      badge: "Ephemeris"
    },
    {
      id: "shadbala_calc",
      title: "6-Fold Shadbala & Bhava Bala",
      category: "Strength",
      description: "Computes Sthana, Dig, Kala, Chesta, Naisargika, and Drik bala in Rupas.",
      badge: "Planetary Potency"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-5 border border-amber-900/10 shadow-xs space-y-2">
        <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          Vedic Calculation Utilities
        </span>
        <h2 className="font-serif text-2xl font-bold text-slate-900">
          Astrology Tools, Calculators &amp; Finders
        </h2>
        <p className="text-xs text-slate-600">
          A centralized suite of 12+ deterministic Vedic astronomical and astrological calculation utilities.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {toolsList.map((tool) => (
          <div
            key={tool.id}
            onMouseEnter={playCardHoverSound}
            onClick={() => {
              playCardFlipSound();
              if (onSelectToolAction) onSelectToolAction(tool.id);
            }}
            className="bg-white rounded-3xl p-5 border border-amber-900/10 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  {tool.category}
                </span>
                <span className="text-[10px] font-semibold text-slate-500">
                  {tool.badge}
                </span>
              </div>

              <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-amber-800 transition-colors">
                {tool.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {tool.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-900 group-hover:text-amber-700">
              <span>Launch Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
