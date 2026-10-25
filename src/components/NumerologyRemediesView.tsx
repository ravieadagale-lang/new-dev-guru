// src/components/NumerologyRemediesView.tsx

import React, { useState, useMemo } from "react";
import { resolveImageUrl } from "../utils/imageResolver";
import {
  Sparkles,
  Sun,
  Crown,
  Gem,
  Layers,
  Filter,
  CheckCircle2,
  Shield,
  Eye,
  Compass
} from "lucide-react";
import {
  MAJOR_DEITIES_GALLERY,
  NUMEROLOGICAL_YANTRAS_1_TO_9,
  CRYSTALS_GEMSTONES_GALLERY,
  RUDRAKSHA_BEADS_GALLERY,
  NAVAGRAHA_DEITIES_FULL_GALLERY
} from "../data/numerologyAssetsData";

export interface NumerologyRemediesViewProps {
  initialNumber?: number;
}

export const NumerologyRemediesView: React.FC<NumerologyRemediesViewProps> = ({
  initialNumber
}) => {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "yantras" | "deities" | "gemstones" | "rudraksha"
  >("all");

  const [filterNumber, setFilterNumber] = useState<number | "all">(
    initialNumber && initialNumber >= 1 && initialNumber <= 9 ? initialNumber : "all"
  );

  // Filtered Yantras
  const filteredYantras = useMemo(() => {
    if (filterNumber === "all") return NUMEROLOGICAL_YANTRAS_1_TO_9;
    return NUMEROLOGICAL_YANTRAS_1_TO_9.filter((y) => y.number === filterNumber);
  }, [filterNumber]);

  // Filtered Navagraha Deities
  const filteredNavagraha = useMemo(() => {
    if (filterNumber === "all") return NAVAGRAHA_DEITIES_FULL_GALLERY;
    return NAVAGRAHA_DEITIES_FULL_GALLERY.filter((g) => g.number === filterNumber);
  }, [filterNumber]);

  // Filtered Gemstones
  const filteredGemstones = useMemo(() => {
    if (filterNumber === "all") return CRYSTALS_GEMSTONES_GALLERY;
    return CRYSTALS_GEMSTONES_GALLERY.filter((gem) => gem.number === filterNumber);
  }, [filterNumber]);

  // Filtered Rudraksha
  const filteredRudraksha = useMemo(() => {
    if (filterNumber === "all") return RUDRAKSHA_BEADS_GALLERY;
    return RUDRAKSHA_BEADS_GALLERY.filter((r) => {
      const matchNum = r.associatedNumber.match(/\d+/g);
      if (!matchNum) return true;
      return matchNum.some((n) => Number(n) === filterNumber);
    });
  }, [filterNumber]);

  return (
    <div className="space-y-8 py-2">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#1C1510] to-slate-900 border border-amber-500/30 rounded-3xl p-6 md:p-8 text-white shadow-2xl space-y-5 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Dedicated Sacred Numerology Remedies Section</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-amber-100">
              Vedic Remedies &amp; Planetary Calibration
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Consecrated 3x3 Magic Square Yantras, Navagraha Deities, Navaratna Planetary Gemstones, and Sacred Rudraksha Beads (1 to 21 Mukhi) for elemental energy balance.
            </p>
          </div>

          {/* Number Quick Filter */}
          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <span className="text-[11px] font-mono text-amber-300/80 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3 h-3 text-amber-400" /> Filter by Root Number:
            </span>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setFilterNumber("all")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterNumber === "all"
                    ? "bg-amber-400 text-slate-950 shadow-md scale-105"
                    : "bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                All
              </button>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button
                  key={n}
                  onClick={() => setFilterNumber(n)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                    filterNumber === n
                      ? "bg-amber-400 text-slate-950 shadow-md scale-105"
                      : "bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === "all"
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>All Remedies</span>
          </button>
          <button
            onClick={() => setActiveCategory("yantras")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === "yantras"
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Numerological Yantras (1–9 Magic Squares)</span>
          </button>
          <button
            onClick={() => setActiveCategory("deities")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === "deities"
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Crown className="w-4 h-4" />
            <span>Divine Deities &amp; Sacred Archetypes</span>
          </button>
          <button
            onClick={() => setActiveCategory("gemstones")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === "gemstones"
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Gem className="w-4 h-4" />
            <span>Navaratna Gemstones &amp; Crystals</span>
          </button>
          <button
            onClick={() => setActiveCategory("rudraksha")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === "rudraksha"
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Sacred Rudraksha Beads (1–21 Mukhi)</span>
          </button>
        </div>
      </div>

      {/* 1. NUMEROLOGICAL YANTRAS FOR NUMBER 1 TO NUMBER 9 */}
      {(activeCategory === "all" || activeCategory === "yantras") && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-200">
                Numerological Yantras (Number 1 to Number 9 Magic Squares)
              </h2>
              <p className="text-xs text-slate-400">
                Authentic Vedic 3x3 sacred numeric matrices for planetary energy calibration
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredYantras.map((yantra) => (
              <div
                key={yantra.number}
                className="bg-slate-950 rounded-2xl overflow-hidden border border-amber-500/30 hover:border-amber-400/60 shadow-xl transition-all flex flex-col justify-between group"
              >
                {/* 3x3 MAGIC SQUARE PLATE HEADER */}
                <div className="bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 p-5 border-b border-amber-500/20 relative">
                  <span className="absolute top-2 left-2 text-amber-500/40 text-xs">✦</span>
                  <span className="absolute top-2 right-2 text-amber-500/40 text-xs">✦</span>
                  <span className="absolute bottom-2 left-2 text-amber-500/40 text-xs">✦</span>
                  <span className="absolute bottom-2 right-2 text-amber-500/40 text-xs">✦</span>

                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-xs font-bold font-mono shadow-md flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-950 inline-block animate-pulse"></span>
                      Number {yantra.number} ({yantra.planetName})
                    </div>
                    <div className="bg-slate-900/90 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold text-amber-300 font-mono shadow-inner">
                      Magic Sum: {yantra.magicSquareSum}
                    </div>
                  </div>

                  <div className="max-w-[210px] mx-auto bg-gradient-to-br from-amber-900/60 via-amber-950/80 to-slate-950 border-2 border-amber-500/50 rounded-xl p-3 shadow-2xl relative">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 text-center mb-2 font-bold flex items-center justify-center gap-1">
                      <span>❖</span> {yantra.sanskritName} Yantra <span>❖</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {yantra.magicSquareMatrix.flatMap((row, rIdx) =>
                        row.map((cell, cIdx) => (
                          <div
                            key={`${rIdx}-${cIdx}`}
                            className="bg-slate-950/90 border border-amber-500/40 text-amber-200 font-mono font-bold text-base md:text-lg h-12 rounded-lg flex items-center justify-center shadow-md hover:bg-amber-500/20 hover:text-amber-100 transition-colors"
                          >
                            {cell}
                          </div>
                        ))
                      )}
                    </div>

                    <div className="mt-2.5 text-[9px] text-amber-300/80 text-center font-mono font-medium">
                      Row, Column &amp; Diagonal Sum = {yantra.magicSquareSum}
                    </div>
                  </div>
                </div>

                {/* CARD DETAILS */}
                <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-amber-200 group-hover:text-amber-100 transition-colors">
                        {yantra.yantraName}
                      </h3>
                      <p className="text-xs text-amber-400/90 font-medium leading-snug">
                        {yantra.title}
                      </p>
                    </div>

                    <div className="inline-block bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded text-[11px] font-mono">
                      <span className="text-amber-400 font-semibold">Geometry:</span> {yantra.geometryType}
                    </div>

                    <div className="bg-amber-950/30 border border-amber-500/30 rounded-lg p-2.5 text-xs text-amber-200 font-mono text-center shadow-inner">
                      <span className="text-[10px] text-amber-400/70 block uppercase font-sans mb-0.5">Sacred Activation Mantra</span>
                      "{yantra.sanskritMantra}"
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {yantra.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-medium text-slate-300">Deity: {yantra.deityName}</span>
                    <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-full font-mono">
                      Yantra Shastra
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. DIVINE DEITIES & SACRED SPIRITUAL ARCHETYPES */}
      {(activeCategory === "all" || activeCategory === "deities") && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-200">
                Divine Deities &amp; Sacred Spiritual Archetypes
              </h2>
              <p className="text-xs md:text-sm text-slate-300">
                Cosmic divine rulers, the 9 Navagraha planetary gods (Numbers 1 to 9), and supreme archetypes governing life purpose, protection, abundance, and karmic evolution
              </p>
            </div>
          </div>

          {/* SUBSECTION 1: THE 9 NAVAGRAHA PLANETARY GODS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-amber-500/20 pb-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <h3 className="text-lg font-serif font-bold text-amber-300">
                1. The 9 Navagraha Planetary Gods (Numbers 1 to 9) — Iconography &amp; Detailed Guidance
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNavagraha.map((graha) => (
                <div key={graha.number} className="bg-slate-950 rounded-2xl overflow-hidden border border-amber-500/30 hover:border-amber-400/60 transition-all shadow-xl flex flex-col justify-between group">
                  <div>
                    <div className="h-64 overflow-hidden relative border-b border-amber-500/20 bg-slate-900">
                      <img
                        src={resolveImageUrl(graha.imageUrl)}
                        alt={graha.sanskritName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-xs font-bold font-mono shadow-md">
                        Number {graha.number} • {graha.planetName}
                      </div>
                      <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur px-2.5 py-1 rounded-full border border-amber-500/30 text-[10px] text-amber-300 font-mono">
                        {graha.worshipDay}
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded text-[11px] text-amber-200 font-mono text-center border border-amber-500/20">
                        Mount: {graha.mountVehicle}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="space-y-1">
                        <h4 className="font-serif font-bold text-lg text-amber-200 group-hover:text-amber-100 transition-colors">
                          {graha.sanskritName}
                        </h4>
                        <div className="text-xs text-amber-400 font-medium">
                          {graha.deityTitle}
                        </div>
                      </div>

                      <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-2.5 text-xs text-amber-200 font-mono italic text-center shadow-inner">
                        "{graha.mantra}"
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Detailed Spiritual Guidance:</div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {graha.guidance}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {graha.attributes.map((attr, aIdx) => (
                          <span key={aIdx} className="bg-slate-900 border border-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-mono">
                            {attr}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Direction: <strong className="text-slate-200">{graha.direction}</strong></span>
                    <span className="text-amber-400 font-mono font-semibold">Vedic Graha Shanti</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SUBSECTION 2: MAJOR VEDIC DEITIES & DIVINE MOTHERS */}
          {filterNumber === "all" && (
            <div className="space-y-4 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2 border-b border-amber-500/20 pb-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-lg font-serif font-bold text-amber-300">
                  2. Major Vedic Deities &amp; Divine Mothers — Protection, Prosperity &amp; Karmic Shields
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {MAJOR_DEITIES_GALLERY.map((deity, idx) => (
                  <div key={idx} className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex flex-col justify-between hover:border-amber-500/40 transition-colors group">
                    <div>
                      <div className="h-56 overflow-hidden relative">
                        <img
                          src={resolveImageUrl(deity.imageUrl)}
                          alt={deity.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-slate-950/85 backdrop-blur px-2.5 py-1 rounded-full border border-amber-500/30 text-[10px] text-amber-300 font-mono font-medium">
                          {deity.associatedPlanetsOrNumbers}
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="font-serif font-bold text-base text-amber-200 group-hover:text-amber-100 transition-colors">{deity.name}</div>
                        <div className="text-[11px] text-amber-400 font-medium leading-snug">{deity.title}</div>
                        <div className="bg-amber-950/30 border border-amber-800/30 rounded p-2 text-[10px] text-amber-300 font-mono italic">
                          "{deity.sanskritMantra}"
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed pt-1">
                          {deity.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. NAVARATNA SACRED GEMSTONES & PLANETARY CRYSTALS */}
      {(activeCategory === "all" || activeCategory === "gemstones") && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Gem className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-200">
                Navaratna Sacred Gemstones &amp; Planetary Crystals
              </h2>
              <p className="text-xs text-slate-400">
                Certified natural mineral frequency transmitters for planetary energy resonance &amp; aura amplification
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGemstones.map((gem, idx) => (
              <div key={idx} className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={resolveImageUrl(gem.imageUrl)}
                      alt={gem.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono">
                      Number {gem.number}
                    </div>
                    <div className="absolute top-2 right-2 bg-slate-950/85 backdrop-blur px-2.5 py-0.5 rounded-full border border-amber-500/30 text-[10px] text-amber-300 font-mono">
                      Planet: {gem.planet}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-base text-amber-200">{gem.name}</h3>
                      <span className="text-xs text-amber-400 font-mono font-bold">({gem.hindiName})</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {gem.benefits}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2 text-[10px] text-amber-300 font-mono text-center">
                    Vedic Prescription Required Before Wearing
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. SACRED RUDRAKSHA BEADS GALLERY (1 TO 21 MUKHI) */}
      {(activeCategory === "all" || activeCategory === "rudraksha") && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-200">
                Sacred Rudraksha Beads Gallery (1 to 21 Mukhi — Including Rare Kuber Mani)
              </h2>
              <p className="text-xs text-slate-400">
                Divine seeds of Lord Shiva — Bio-electric instruments for bio-magnetic calibration &amp; karmic protection
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRudraksha.map((rudra, idx) => (
              <div key={idx} className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={resolveImageUrl(rudra.imageUrl)}
                      alt={rudra.mukhi}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono">
                      {rudra.associatedNumber}
                    </div>
                    <div className="absolute top-2 right-2 bg-slate-950/85 backdrop-blur px-2.5 py-0.5 rounded-full border border-amber-500/30 text-[10px] text-amber-300 font-mono">
                      {rudra.planet}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-base text-amber-200">{rudra.mukhi}</h3>
                      <span className="text-xs text-amber-400 font-mono font-bold">{rudra.sanskritName}</span>
                    </div>
                    <div className="text-[11px] text-amber-300 font-medium">Deity: {rudra.deity}</div>
                    <div className="bg-amber-950/30 border border-amber-800/30 rounded p-2 text-[10px] text-amber-300 font-mono italic">
                      "{rudra.mantra}"
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {rudra.benefits}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default NumerologyRemediesView;
