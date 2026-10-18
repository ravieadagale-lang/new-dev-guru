import React, { useState } from "react";
import {
  NUMBER_LUCKY_PROFILES,
  MANDATORY_GEMSTONE_DISCLAIMER,
  NumberLuckyProfile,
} from "../data/numerologyLuckyRemediesData";
import { Sparkles, Gem, Compass, Palette, Shield, Info, CheckCircle2 } from "lucide-react";

export interface NumerologyLuckyRemediesViewProps {
  initialNumber?: number;
  initialDob?: string;
}

export const NumerologyLuckyRemediesView: React.FC<NumerologyLuckyRemediesViewProps> = ({
  initialNumber = 1,
  initialDob,
}) => {
  const [selectedNum, setSelectedNum] = useState<number>(initialNumber || 1);
  const profile: NumberLuckyProfile = NUMBER_LUCKY_PROFILES[selectedNum] || NUMBER_LUCKY_PROFILES[1];

  const availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 border border-amber-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-md text-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-500/20">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Chapter 34 • Lucky Numbers, Colors, Directions & Gemstones</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-amber-100 mt-1">
              Lucky Remedies for Number {profile.number}: {profile.title}
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Ruled by {profile.governingPlanet} • Root Essence: {profile.archetype}
            </p>
          </div>

          {/* Number Selector Pills */}
          <div className="flex flex-wrap gap-1.5">
            {availableNumbers.map((num) => (
              <button
                key={num}
                onClick={() => setSelectedNum(num)}
                className={`w-9 h-9 rounded-xl font-bold text-sm transition-all flex items-center justify-center ${
                  num === selectedNum
                    ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/30 scale-105"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Gemstone Remedy */}
          <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <Gem className="w-4 h-4" />
              <span>Primary Gemstone & Crystals</span>
            </div>
            <div className="text-lg font-serif font-bold text-slate-100">
              {profile.gemstone.primaryGemstone} ({profile.gemstone.sanskritName})
            </div>
            <div className="text-xs text-slate-300 space-y-1.5">
              <p>
                <span className="text-slate-400">Metal & Finger: </span>
                {profile.gemstone.wearingMetal}, {profile.gemstone.recommendedFinger}
              </p>
              <p>
                <span className="text-slate-400">Auspicious Time: </span>
                {profile.gemstone.auspiciousDay}, {profile.gemstone.auspiciousTime}
              </p>
              <p>
                <span className="text-slate-400">Wearing Mantra: </span>
                <span className="font-mono text-amber-300">{profile.gemstone.wearingMantra}</span>
              </p>
              <p>
                <span className="text-slate-400">Substitutes: </span>
                {profile.gemstone.substituteCrystals.join(", ")}
              </p>
            </div>
          </div>

          {/* Lucky Colors */}
          <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <Palette className="w-4 h-4" />
              <span>Lucky & Power Colors</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.color.primaryLuckyColors.map((col, idx) => (
                <span
                  key={col}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-950/60 border border-emerald-500/30 text-emerald-200"
                >
                  {col}
                </span>
              ))}
            </div>
            <div className="text-xs text-slate-300 space-y-1.5">
              <p>
                <span className="text-slate-400">Power Shades: </span>
                {profile.color.powerShades.join(", ")}
              </p>
              <p>
                <span className="text-rose-400 font-semibold">Avoid Colors: </span>
                {profile.color.avoidColors.join(", ")}
              </p>
              <p className="text-slate-400 mt-2 text-xs leading-relaxed">
                {profile.color.colorPsychology}
              </p>
            </div>
          </div>

          {/* Vastu & Direction */}
          <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
              <Compass className="w-4 h-4" />
              <span>Auspicious Direction & Vastu Zone</span>
            </div>
            <div className="text-base font-bold text-slate-100">
              {profile.direction.cardinalDirection} ({profile.direction.vastuZone})
            </div>
            <div className="text-xs text-slate-300 space-y-1.5">
              <p>
                <span className="text-slate-400">Work Facing: </span>
                {profile.direction.facingDirectionWork}
              </p>
              <p>
                <span className="text-slate-400">Sleeping Alignment: </span>
                {profile.direction.facingDirectionSleep}
              </p>
              <p>
                <span className="text-slate-400">Spatial Vastu Remedy: </span>
                {profile.direction.spatialRemedy}
              </p>
            </div>
          </div>

          {/* Spiritual & Chanting Remedy */}
          <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
            <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
              <Shield className="w-4 h-4" />
              <span>Mantra, Yantra & Fasting Protocol</span>
            </div>
            <div className="text-xs text-slate-300 space-y-1.5">
              <p>
                <span className="text-slate-400">Bija Mantra: </span>
                <span className="font-mono text-purple-300 font-bold">{profile.remedy.bijaMantra}</span>
              </p>
              <p>
                <span className="text-slate-400">Planetary Mantra ({profile.remedy.chantingCount}x): </span>
                <span className="font-mono text-amber-200">{profile.remedy.planetaryMantra}</span>
              </p>
              <p>
                <span className="text-slate-400">Fasting: </span>
                {profile.remedy.fastingDay} ({profile.remedy.fastingProtocol})
              </p>
              <p>
                <span className="text-slate-400">Yantra & Direction: </span>
                {profile.remedy.yantraName} ({profile.remedy.yantraDirection})
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500 italic">
          {MANDATORY_GEMSTONE_DISCLAIMER}
        </p>
      </div>
    </div>
  );
};
