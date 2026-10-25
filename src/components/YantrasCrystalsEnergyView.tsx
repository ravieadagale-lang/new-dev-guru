// src/components/YantrasCrystalsEnergyView.tsx

import React, { useState } from "react";
import { resolveImageUrl } from "../utils/imageResolver";
import {
  Sparkles,
  Compass,
  Sun,
  Moon,
  ShieldAlert,
  Clock,
  Layers,
  Heart,
  Zap,
  Gem,
  BookOpen,
  CheckCircle2,
  Volume2,
  Flame,
  Award,
  Eye,
  Activity,
  Maximize2,
  Disc
} from "lucide-react";
import {
  PLANETARY_YANTRAS_DATA,
  SRI_YANTRA_DATA,
  CRYSTALS_DATA,
  CHAKRAS_DATA,
  TRIADS_DATA
} from "../data/yantrasCrystalsEnergyData";
import { MASTER_CRYSTALS_LIST } from "../data/crystalsMasterData";
import { RUDRAKSHA_BEADS_GALLERY } from "../data/numerologyAssetsData";
import { ChakraBalancingRemediesView } from "./ChakraBalancingRemediesView";

interface YantrasCrystalsEnergyViewProps {
  lifePathNumber?: number;
  driverNumber?: number;
  missingNumbers?: number[];
  karmicDebts?: number[];
}

export const YantrasCrystalsEnergyView: React.FC<YantrasCrystalsEnergyViewProps> = ({
  lifePathNumber = 1,
  driverNumber = 1,
  missingNumbers = [2, 5],
  karmicDebts = [13]
}) => {
  const [activeTab, setActiveTab] = useState<
    "science_yantra" | "planetary_yantras" | "sri_yantra" | "crystals_system" | "master_crystals" | "rudraksha_beads" | "crystal_grids" | "chakras_energy" | "triads" | "integrated_program" | "chakra_balancing_ch38"
  >("planetary_yantras");

  const [selectedNumber, setSelectedNumber] = useState<number>(lifePathNumber || 1);
  const [selectedCrystalNum, setSelectedCrystalNum] = useState<number>(driverNumber || 1);
  const [selectedChakraNum, setSelectedChakraNum] = useState<number>(1);

  const yantraData = PLANETARY_YANTRAS_DATA[selectedNumber] || PLANETARY_YANTRAS_DATA[1];
  const crystalData = CRYSTALS_DATA[selectedCrystalNum] || CRYSTALS_DATA[1];
  const chakraData = CHAKRAS_DATA.find((c) => c.chakraNumber === selectedChakraNum) || CHAKRAS_DATA[0];

  // ============================================================================
  // SVG YANTRA RENDERER COMPONENT
  // ============================================================================
  const renderYantraSVG = (num: number) => {
    switch (num) {
      case 1: // Sun
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full text-amber-400">
            {/* Bhupura Outer Square */}
            <rect x="20" y="20" width="260" height="260" fill="none" stroke="currentColor" strokeWidth="3" rx="4" />
            <rect x="30" y="30" width="240" height="240" fill="none" stroke="currentColor" strokeWidth="1.5" />
            {/* Gates */}
            <rect x="130" y="12" width="40" height="18" fill="#0f172a" stroke="currentColor" strokeWidth="2" />
            <rect x="130" y="270" width="40" height="18" fill="#0f172a" stroke="currentColor" strokeWidth="2" />
            <rect x="12" y="130" width="18" height="40" fill="#0f172a" stroke="currentColor" strokeWidth="2" />
            <rect x="270" y="130" width="18" height="40" fill="#0f172a" stroke="currentColor" strokeWidth="2" />
            {/* Outer Circle */}
            <circle cx="150" cy="150" r="100" fill="none" stroke="currentColor" strokeWidth="2" />
            {/* 12 Petals (simplified ring) */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x = 150 + 92 * Math.cos(angle);
              const y = 150 + 92 * Math.sin(angle);
              return <circle key={i} cx={x} cy={y} r="8" fill="none" stroke="currentColor" strokeWidth="1" />;
            })}
            {/* Hexagram - Interlocking Triangles */}
            <polygon points="150,75 215,188 85,188" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <polygon points="150,225 215,112 85,112" fill="none" stroke="currentColor" strokeWidth="2.5" />
            {/* Center Circle & Bindu */}
            <circle cx="150" cy="150" r="25" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="150" cy="150" r="6" fill="currentColor" />
            <text x="150" y="154" fontSize="9" fill="#0f172a" textAnchor="middle" fontWeight="bold">ॐ</text>
          </svg>
        );
      case 2: // Moon
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full text-slate-200">
            <rect x="20" y="20" width="260" height="260" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="150" cy="150" r="105" fill="none" stroke="currentColor" strokeWidth="2" />
            {/* 16 Petals */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 22.5 * Math.PI) / 180;
              const x = 150 + 98 * Math.cos(angle);
              const y = 150 + 98 * Math.sin(angle);
              return <circle key={i} cx={x} cy={y} r="6" fill="none" stroke="currentColor" strokeWidth="1" />;
            })}
            <path d="M 110,150 A 50,50 0 0,0 190,150 A 42,42 0 0,1 110,150 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <polygon points="150,90 195,175 105,175" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="150" cy="145" r="5" fill="currentColor" />
          </svg>
        );
      case 3: // Jupiter
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full text-amber-300">
            <rect x="20" y="20" width="260" height="260" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="150" cy="150" r="100" fill="none" stroke="currentColor" strokeWidth="2" />
            {/* 8 pointed star */}
            <g transform="translate(150,150)">
              <rect x="-60" y="-60" width="120" height="120" fill="none" stroke="currentColor" strokeWidth="2" />
              <rect x="-60" y="-60" width="120" height="120" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45)" />
              <circle cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="6" fill="currentColor" />
            </g>
          </svg>
        );
      case 4: // Rahu
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full text-amber-500">
            <rect x="20" y="20" width="260" height="260" fill="none" stroke="currentColor" strokeWidth="3" />
            <g transform="translate(150,150)">
              <rect x="-75" y="-75" width="150" height="150" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <rect x="-75" y="-75" width="150" height="150" fill="none" stroke="currentColor" strokeWidth="2.5" transform="rotate(45)" />
              <circle cx="0" cy="0" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="0" cy="0" r="7" fill="currentColor" />
            </g>
          </svg>
        );
      case 5: // Mercury
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full text-emerald-400">
            <rect x="20" y="20" width="260" height="260" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="150" cy="150" r="100" fill="none" stroke="currentColor" strokeWidth="2" />
            {/* 8 Petals */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const x = 150 + 90 * Math.cos(angle);
              const y = 150 + 90 * Math.sin(angle);
              return <circle key={i} cx={x} cy={y} r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />;
            })}
            <polygon points="150,80 210,185 90,185" fill="none" stroke="currentColor" strokeWidth="2" />
            <polygon points="150,220 210,115 90,115" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="150" cy="150" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="150" cy="150" r="5" fill="currentColor" />
          </svg>
        );
      case 6: // Venus
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full text-pink-300">
            <rect x="20" y="20" width="260" height="260" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="150" cy="150" r="100" fill="none" stroke="currentColor" strokeWidth="2" />
            {/* Pentagram star */}
            <g transform="translate(150,150) rotate(-18)">
              <polygon
                points="0,-75 22,-23 71,-23 31,6 46,58 0,25 -46,58 -31,6 -71,-23 -22,-23"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="0" cy="0" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="5" fill="currentColor" />
            </g>
          </svg>
        );
      case 7: // Ketu
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full text-purple-300">
            <rect x="20" y="20" width="260" height="260" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="150" cy="150" r="100" fill="none" stroke="currentColor" strokeWidth="2" />
            {/* Inward triangles matrix */}
            <polygon points="150,70 190,150 110,150" fill="none" stroke="currentColor" strokeWidth="2" />
            <polygon points="150,230 190,150 110,150" fill="none" stroke="currentColor" strokeWidth="2" />
            <polygon points="70,150 150,190 150,110" fill="none" stroke="currentColor" strokeWidth="2" />
            <polygon points="230,150 150,190 150,110" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="150" cy="150" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
      case 8: // Saturn
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full text-indigo-300">
            <rect x="25" y="25" width="250" height="250" fill="none" stroke="currentColor" strokeWidth="3.5" />
            <rect x="40" y="40" width="220" height="220" fill="none" stroke="currentColor" strokeWidth="2" />
            <g transform="translate(150,150)">
              <rect x="-65" y="-65" width="130" height="130" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <rect x="-65" y="-65" width="130" height="130" fill="none" stroke="currentColor" strokeWidth="2.5" transform="rotate(45)" />
              <circle cx="0" cy="0" r="6" fill="currentColor" />
            </g>
          </svg>
        );
      case 9: // Mars
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full text-rose-400">
            <rect x="20" y="20" width="260" height="260" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="150" cy="150" r="100" fill="none" stroke="currentColor" strokeWidth="2" />
            {/* 4 Ascending Triangles */}
            <polygon points="150,60 210,180 90,180" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <polygon points="150,90 195,180 105,180" fill="none" stroke="currentColor" strokeWidth="2" />
            <polygon points="150,120 180,180 120,180" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="150" cy="150" r="5" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };

  const renderSriYantraSVG = () => {
    return (
      <svg viewBox="0 0 320 320" className="w-full h-full text-amber-300">
        {/* Bhupura Outer Square */}
        <rect x="15" y="15" width="290" height="290" fill="none" stroke="currentColor" strokeWidth="3" />
        <rect x="25" y="25" width="270" height="270" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {/* Gates */}
        <rect x="140" y="8" width="40" height="18" fill="#0f172a" stroke="currentColor" strokeWidth="2" />
        <rect x="140" y="294" width="40" height="18" fill="#0f172a" stroke="currentColor" strokeWidth="2" />
        <rect x="8" y="140" width="18" height="40" fill="#0f172a" stroke="currentColor" strokeWidth="2" />
        <rect x="294" y="140" width="18" height="40" fill="#0f172a" stroke="currentColor" strokeWidth="2" />
        {/* Circles & Lotus Rings */}
        <circle cx="160" cy="160" r="120" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="160" cy="160" r="105" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {/* 16 Petals outer */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          const x = 160 + 112 * Math.cos(angle);
          const y = 160 + 112 * Math.sin(angle);
          return <circle key={i} cx={x} cy={y} r="5" fill="none" stroke="currentColor" strokeWidth="1" />;
        })}
        {/* Interlocking Triangles Matrix (Simplified accurate render) */}
        <g stroke="currentColor" strokeWidth="1.8" fill="none">
          {/* Shiva Upward Triangles */}
          <polygon points="160,50 250,230 70,230" />
          <polygon points="160,75 235,215 85,215" />
          <polygon points="160,100 220,200 100,200" />
          <polygon points="160,120 205,185 115,185" />

          {/* Shakti Downward Triangles */}
          <polygon points="160,270 250,90 70,90" />
          <polygon points="160,245 235,105 85,105" />
          <polygon points="160,220 220,120 100,120" />
          <polygon points="160,200 205,135 115,135" />
          <polygon points="160,185 190,145 130,145" />
        </g>
        {/* Center Bindu */}
        <circle cx="160" cy="160" r="6" fill="currentColor" />
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white shadow-xl relative overflow-hidden border border-amber-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Chapter Thirty-Seven System
              </span>
              <span className="text-xs text-amber-200/80 font-mono">Sacred Geometry & Mineral Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-amber-400" />
              Yantras, Crystals & Energy Healing Engine
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              "The Yantra is the body of the mantra. The crystal is the vessel of the planet." Explore detailed sacred geometry, 9 planetary yantras, the supreme Sri Yantra, crystal piezoelectricity, chakra healing, and the 3-fold integrated remediation protocol.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 text-xs font-semibold">
            <div className="bg-amber-900/40 backdrop-blur-xs border border-amber-500/30 rounded-xl px-3.5 py-2 text-amber-200">
              Life Path Resonance: <strong className="text-white text-sm ml-1 font-serif">Number {lifePathNumber}</strong>
            </div>
            <div className="bg-amber-900/40 backdrop-blur-xs border border-amber-500/30 rounded-xl px-3.5 py-2 text-amber-200">
              Driver Number: <strong className="text-white text-sm ml-1 font-serif">{driverNumber}</strong>
            </div>
          </div>
        </div>

        {/* SUB-TAB NAVIGATION */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-amber-800/40 overflow-x-auto no-scrollbar text-xs font-semibold">
          {[
            { id: "science_yantra", label: "Yantra Sacred Geometry", icon: Compass },
            { id: "planetary_yantras", label: "Nine Planetary Yantras (1–9)", icon: Sun },
            { id: "sri_yantra", label: "The Sri Yantra (Supreme)", icon: Sparkles },
            { id: "crystals_system", label: "Crystal System (1–9)", icon: Gem },
            { id: "master_crystals", label: "All 18 Master Crystals", icon: Sparkles },
            { id: "rudraksha_beads", label: "Sacred Rudrakshas (1–21 Mukhi)", icon: Disc },
            { id: "crystal_grids", label: "Lo Shu Crystal Grids", icon: Layers },
            { id: "chakras_energy", label: "Chakras & Energy Body", icon: Activity },
            { id: "chakra_balancing_ch38", label: "Chakra Balancing Remedies", icon: Heart },
            { id: "triads", label: "Yantra-Crystal-Mantra Triads", icon: Flame },
            { id: "integrated_program", label: "Integrated System Guidance", icon: ShieldAlert }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                  isSelected
                    ? "bg-amber-400 text-slate-950 font-bold shadow-md scale-105"
                    : "bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* SUB-TAB 1: YANTRA SACRED GEOMETRY SCIENCE */}
      {/* ======================================================== */}
      {activeTab === "science_yantra" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Part One</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2 mt-1">
                <Compass className="w-6 h-6 text-amber-600" />
                The Science of Yantras — Sacred Geometry as Vibrational Technology
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Detailed explanatory breakdown of sacred form, scalar standing waves, cymatics, and the five fundamental components of every Yantra.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 space-y-3">
                <h4 className="font-serif font-bold text-amber-300 text-base">What is a Yantra?</h4>
                <p className="text-xs leading-relaxed text-slate-300">
                  The word <strong>Yantra</strong> comes from the Sanskrit root <em>'yam'</em> (to sustain, to hold, to support) combined with the suffix <em>'tra'</em> (instrument or tool) — making Yantra literally "an instrument for sustaining or holding." What a Yantra sustains is a specific vibrational frequency — the specific planetary or divine energy that the Yantra's sacred geometric form has been precisely designed to attract, concentrate, and maintain in physical space.
                </p>
                <p className="text-xs leading-relaxed text-slate-300">
                  A Yantra is a vibrational scalar field generator — a specific geometric form that, through the mathematical properties of its angles, proportions, and symbolic elements, creates a standing wave pattern in the subtle energy field. This wave pattern consistently maintains the specific frequency associated with the deity or planet it embodies.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-slate-900 space-y-3">
                <h4 className="font-serif font-bold text-amber-950 text-base">Cymatics & Quantum Correspondence</h4>
                <p className="text-xs leading-relaxed text-slate-700">
                  In contemporary physics, cymatics experiments demonstrate that sound frequencies passed through physical mediums create precise geometric patterns. High-frequency acoustic vibrations passed through water or sand form complex interlocking triangles and lotus-like structures that mirror traditional Yantra forms.
                </p>
                <p className="text-xs leading-relaxed text-slate-700">
                  The ancient Vedic rishis perceived these sacred forms directly during deep states of meditative absorption (Samadhi). They recorded that sound and form are two expressions of the same underlying quantum reality: every Mantra has a corresponding Yantra, and every Yantra embodies a specific acoustic sound formula.
                </p>
              </div>
            </div>

            {/* THE FIVE COMPONENTS OF EVERY YANTRA */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">The Five Essential Geometric Components</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  {
                    title: "1. Bhupura (Outer Square)",
                    desc: "The outer square boundary with four directional gates. Represents physical Earth stability and guards the sacred inner energy field."
                  },
                  {
                    title: "2. Padma (Lotus Petals)",
                    desc: "Concentric rings of lotus petals. Symbolizes the unfolding of spiritual consciousness, purity, and sensory refinement."
                  },
                  {
                    title: "3. Trikona (Interlocking Triangles)",
                    desc: "Upward (△ Shiva/Masculine) and downward (▽ Shakti/Feminine) triangles representing the creative dynamic interplay."
                  },
                  {
                    title: "4. Mandala (Circles)",
                    desc: "Concentric circular rings representing cyclical time, complete self-sustaining rotation, and cosmic wholeness."
                  },
                  {
                    title: "5. Bindu (Central Point)",
                    desc: "The microscopic central focal point where all geometric lines converge. Represents pure concentrated cosmic source energy."
                  }
                ].map((comp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="font-serif font-bold text-xs text-amber-900 block">{comp.title}</span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{comp.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 2: NINE PLANETARY YANTRAS (1-9) */}
      {/* ======================================================== */}
      {activeTab === "planetary_yantras" && (
        <div className="space-y-6">
          {/* NUMBER SELECTOR */}
          <div className="p-4 rounded-2xl bg-white border border-amber-900/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Select Planetary Yantra (Numbers 1 to 9)</span>
              <span className="text-amber-700 font-mono">Sacred Geometric Matrix</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                const isSelected = selectedNumber === num;
                const isUserLP = lifePathNumber === num;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedNumber(num)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shrink-0 ${
                      isSelected
                        ? "bg-gradient-to-r from-amber-600 to-indigo-600 text-white shadow-md scale-105"
                        : "bg-slate-50 text-slate-700 hover:bg-amber-50 border border-slate-200"
                    }`}
                  >
                    <span className="text-sm font-serif">Number {num}</span>
                    {isUserLP && (
                      <span className="text-[10px] bg-amber-300 text-amber-950 px-1.5 py-0.5 rounded font-sans uppercase font-extrabold">
                        Your LP
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN YANTRA DISPLAY CARD */}
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-sm space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* SVG RENDERING BOX */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 flex flex-col items-center justify-center border border-amber-500/30 relative overflow-hidden group shadow-xl">
                <div className="w-64 h-64 sm:w-72 sm:h-72 relative">
                  {renderYantraSVG(selectedNumber)}
                </div>
                <div className="mt-4 text-center space-y-1">
                  <span className="text-xs font-serif font-bold text-amber-300 tracking-wider uppercase block">
                    {yantraData.sanskritName} — {yantraData.name}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono block">
                    {yantraData.primaryGeometricForm}
                  </span>
                </div>
              </div>

              {/* SPECIFICATIONS & SUMMARY */}
              <div className="lg:col-span-7 space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-serif font-bold text-slate-900">{yantraData.name}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-100 text-amber-950 border border-amber-200">
                      {yantraData.planet}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-amber-800 mt-1">{yantraData.title}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Sacred Metal</span>
                    <span className="font-bold text-slate-900 block">{yantraData.metal}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Consecration Timing</span>
                    <span className="font-bold text-slate-900 block">{yantraData.consecrationDayTime}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Best Direction</span>
                    <span className="font-bold text-slate-900 block">{yantraData.facingDirection}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Seed Sound</span>
                    <span className="font-bold text-amber-800 font-serif block">"{yantraData.seedMantra}"</span>
                  </div>
                </div>

                {/* SACRED GEOMETRY ELEMENTS LIST */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Geometric Components</span>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                    {yantraData.sacredGeometryElements.map((elem, idx) => (
                      <li key={idx}>{elem}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* DETAILED PARAGRAPH GUIDANCE */}
            <div className="p-5 rounded-2xl bg-amber-950 text-amber-50 space-y-3">
              <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                Comprehensive Guidance & Vibrational Mechanism
              </h4>
              {yantraData.detailedGuidance.map((para, idx) => (
                <p key={idx} className="text-xs leading-relaxed text-amber-100">
                  {para}
                </p>
              ))}
            </div>

            {/* PLACEMENT & ACTIVATION METHOD */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 space-y-2">
                <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-400" />
                  Optimal Environmental Placement
                </h5>
                <p className="text-xs leading-relaxed text-slate-300">
                  {yantraData.placementGuidelines}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950 text-indigo-100 space-y-2">
                <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Prana Pratishtha & Activation Method
                </h5>
                <p className="text-xs leading-relaxed text-indigo-200">
                  {yantraData.activationMethod}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 3: THE SRI YANTRA */}
      {/* ======================================================== */}
      {activeTab === "sri_yantra" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Part Three</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2 mt-1">
                <Sparkles className="w-6 h-6 text-amber-600" />
                {SRI_YANTRA_DATA.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{SRI_YANTRA_DATA.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* SVG RENDERING OF SRI YANTRA */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 flex flex-col items-center justify-center border border-amber-500/40 shadow-xl">
                <div className="w-64 h-64 sm:w-80 sm:h-80">
                  {renderSriYantraSVG()}
                </div>
                <span className="text-xs font-serif font-bold text-amber-300 mt-3 uppercase tracking-wider">
                  Master Holographic Cosmic Blueprint
                </span>
              </div>

              {/* OVERVIEW PARAGRAPHS */}
              <div className="lg:col-span-7 space-y-3">
                {SRI_YANTRA_DATA.overview.map((para, idx) => (
                  <p key={idx} className="text-xs leading-relaxed text-slate-700">
                    {para}
                  </p>
                ))}

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">Supreme Sound Formula</span>
                  <div className="font-serif font-bold text-slate-900 text-sm">
                    "{SRI_YANTRA_DATA.primaryMantra}"
                  </div>
                  <span className="text-xs text-amber-800 font-mono block">Short Formula: {SRI_YANTRA_DATA.shortMantra}</span>
                </div>
              </div>
            </div>

            {/* STRUCTURAL LAYERS BREAKDOWN */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">The Five Sacred Geometric Layers</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {SRI_YANTRA_DATA.structuralLayers.map((layer) => (
                  <div key={layer.layer} className="p-4 rounded-xl bg-slate-900 text-slate-100 space-y-1.5 border border-slate-800">
                    <span className="font-serif font-bold text-amber-300 text-xs block">Layer {layer.layer}: {layer.name}</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{layer.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 4: CRYSTAL SYSTEM (1-9) */}
      {/* ======================================================== */}
      {activeTab === "crystals_system" && (
        <div className="space-y-6">
          {/* SELECTOR STRIP */}
          <div className="p-4 rounded-2xl bg-white border border-amber-900/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Select Number Crystal System (1 to 9)</span>
              <span className="text-indigo-700 font-mono">Piezoelectric Mineral Intelligence</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                const isSelected = selectedCrystalNum === num;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedCrystalNum(num)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shrink-0 ${
                      isSelected
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md scale-105"
                        : "bg-slate-50 text-slate-700 hover:bg-indigo-50 border border-slate-200"
                    }`}
                  >
                    <span className="text-sm font-serif">Number {num}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN CRYSTAL DISPLAY */}
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-serif font-bold text-slate-900">
                    Number {crystalData.number} — {crystalData.primaryCrystal}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-indigo-100 text-indigo-900 border border-indigo-200">
                    {crystalData.planet}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Color Ray: <strong>{crystalData.colorRay}</strong></p>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase text-slate-500 mr-1">Substitutes:</span>
                {crystalData.substituteCrystals.map((sub, sIdx) => (
                  <span key={sIdx} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            {/* PIEZOELECTRIC & CHAKRA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Piezoelectric & Physics Mechanism</span>
                <p className="text-xs text-slate-800 leading-relaxed font-mono">{crystalData.piezoelectricQuality}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Chakra Resonance</span>
                <p className="text-xs text-indigo-900 font-bold leading-relaxed">{crystalData.chakraResonance}</p>
              </div>
            </div>

            {/* DETAILED GUIDANCE PARAGRAPHS */}
            <div className="p-5 rounded-2xl bg-indigo-950 text-indigo-50 space-y-3">
              <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                <Gem className="w-4 h-4 text-indigo-400" />
                Detailed Mineral Guidance & Healing Mechanism
              </h4>
              {crystalData.detailedGuidance.map((para, idx) => (
                <p key={idx} className="text-xs leading-relaxed text-indigo-100">
                  {para}
                </p>
              ))}
            </div>

            {/* PRACTICAL APPLICATIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Body Placement</span>
                <p className="text-xs text-slate-700 leading-relaxed">{crystalData.bodyPlacement}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Environmental Placement</span>
                <p className="text-xs text-slate-700 leading-relaxed">{crystalData.environmentalPlacement}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Gem Elixir Protocol</span>
                <p className="text-xs text-slate-700 leading-relaxed">{crystalData.gemElixirProtocol}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Cleansing & Charging</span>
                <p className="text-xs text-slate-700 leading-relaxed">{crystalData.cleansingChargingProtocol}</p>
              </div>
            </div>

            {/* AFFIRMATION BOX */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-900 to-indigo-900 text-white text-center font-serif text-sm font-bold shadow-md">
              "{crystalData.affirmation}"
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ALL 18 MASTER CRYSTALS GALLERY */}
      {/* ======================================================== */}
      {activeTab === "master_crystals" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Complete Vedic Mineral Compendium</span>
                <h3 className="text-2xl font-serif font-bold text-amber-200 mt-1">
                  Master 18 Healing Crystals & Numerological Gems
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  Explore all 18 sacred mineral frequencies for Numerological Numbers 1 to 9, Chakra activation, planetary harmony, and Vastu energy correction.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 p-2 rounded-xl border border-slate-700">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs font-mono font-bold text-amber-300">18 Master Crystals Catalog</span>
              </div>
            </div>

            {/* GRID OF ALL 18 CRYSTALS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MASTER_CRYSTALS_LIST.map((crystal) => (
                <div
                  key={crystal.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
                >
                  <div className="space-y-3">
                    {/* IMAGE & BADGES */}
                    <div className="relative h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                      <img
                        src={resolveImageUrl(crystal.imageUrl)}
                        alt={crystal.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px] shadow-md">
                        Number {crystal.number}
                      </div>
                      <div className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-sm text-amber-300 font-semibold text-[11px] border border-amber-500/30">
                        {crystal.planet}
                      </div>
                    </div>

                    {/* NAMES */}
                    <div>
                      <h4 className="text-lg font-serif font-bold text-amber-200 group-hover:text-amber-300 transition-colors">
                        {crystal.name}
                      </h4>
                      <div className="text-xs font-medium text-amber-400/90 font-serif">
                        {crystal.sanskritName}
                      </div>
                    </div>

                    {/* CHAKRA & ELEMENT BADGES */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-2.5 py-1 rounded-md bg-purple-950/60 text-purple-300 border border-purple-700/50 font-mono flex items-center gap-1 shadow-sm">
                        <Zap className="w-3 h-3 text-purple-400 shrink-0" />
                        {crystal.chakra}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700 font-mono">
                        {crystal.element}
                      </span>
                    </div>

                    {/* ENERGETIC PROPERTIES */}
                    <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-800/40 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-amber-300 tracking-wider">
                        <Activity className="w-3 h-3 text-amber-400" />
                        <span>Energetic Properties</span>
                      </div>
                      <p className="text-[11px] text-slate-200 leading-relaxed font-sans">
                        {crystal.energeticProperties}
                      </p>
                    </div>

                    {/* CHAKRA ALIGNMENT */}
                    <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-800/40 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-purple-300 tracking-wider">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        <span>Chakra Alignment</span>
                      </div>
                      <p className="text-[11px] text-slate-200 leading-relaxed font-sans">
                        {crystal.chakraAlignmentDetails}
                      </p>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {crystal.description}
                    </p>

                    {/* BENEFITS */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider">Key Benefits:</span>
                      <ul className="space-y-1">
                        {crystal.benefits.map((b, bIdx) => (
                          <li key={bIdx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* BOTTOM PROTOCOLS */}
                  <div className="pt-3 border-t border-slate-800 space-y-2 text-[11px]">
                    <div className="text-slate-300">
                      <strong className="text-amber-400">Cleansing: </strong>{crystal.cleansingMethod}
                    </div>
                    <div className="text-slate-300">
                      <strong className="text-amber-400">Wearing/Placement: </strong>{crystal.wearingPlacement}
                    </div>
                    <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-900/40 text-amber-200 font-mono text-[10px] text-center">
                      Mantra: {crystal.mantra}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ALL 21 SACRED RUDRAKSHA BEADS GALLERY */}
      {/* ======================================================== */}
      {activeTab === "rudraksha_beads" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-950 via-slate-900 to-slate-950 border border-amber-800/40 text-white shadow-xl space-y-6">
            <div className="border-b border-amber-800/30 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Vedic Sacred Geometry & Deva Mani</span>
                <h3 className="text-2xl font-serif font-bold text-amber-200 mt-1">
                  Sacred Rudraksha Beads Gallery (1 to 21 Mukhi — Including Kuber Mani)
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  Explore authentic divine Rudraksha beads from 1 Mukhi (Shiva) to 14 Mukhi (Dev Mani), up to 21 Mukhi (Lord Kuber Treasurer). Each bead carries electro-magnetic frequencies that align chakras, neutralize planetary afflictions, and bestow spiritual and material liberation.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-amber-900/50 p-2.5 rounded-xl border border-amber-600/40">
                <Disc className="w-5 h-5 text-amber-300 shrink-0" />
                <span className="text-xs font-mono font-bold text-amber-200">1–21 Mukhi Divine Catalog</span>
              </div>
            </div>

            {/* GRID OF ALL 21 RUDRAKSHA BEADS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {RUDRAKSHA_BEADS_GALLERY.map((bead, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/90 border border-amber-900/30 hover:border-amber-500/60 rounded-2xl p-5 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
                >
                  <div className="space-y-3">
                    {/* IMAGE & BADGES */}
                    <div className="relative h-48 rounded-xl overflow-hidden bg-slate-900 border border-amber-800/30">
                      <img
                        src={resolveImageUrl(bead.imageUrl)}
                        alt={bead.mukhi}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px] shadow-md">
                        {bead.associatedNumber}
                      </div>
                      <div className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-sm text-amber-300 font-semibold text-[11px] border border-amber-500/30">
                        {bead.planet}
                      </div>
                    </div>

                    {/* NAMES & DEITY */}
                    <div>
                      <h4 className="text-lg font-serif font-bold text-amber-200 group-hover:text-amber-300 transition-colors">
                        {bead.mukhi}
                      </h4>
                      <div className="text-xs font-medium text-amber-400 font-serif">
                        {bead.sanskritName}
                      </div>
                      <div className="text-[11px] text-amber-300/80 mt-1 font-mono">
                        Presiding Deity: <strong className="text-amber-200">{bead.deity}</strong>
                      </div>
                    </div>

                    {/* BENEFITS */}
                    <p className="text-xs text-slate-300 leading-relaxed bg-amber-950/30 p-3 rounded-xl border border-amber-900/20">
                      {bead.benefits}
                    </p>
                  </div>

                  {/* MANTRA PROTOCOL */}
                  <div className="pt-3 border-t border-amber-900/30 text-center">
                    <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider block mb-1">
                      Sacred Siddha Mantra:
                    </span>
                    <div className="p-2 rounded-lg bg-slate-900/90 border border-amber-600/30 text-amber-200 font-mono text-xs shadow-inner">
                      {bead.mantra}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 5: LO SHU CRYSTAL GRIDS */}
      {/* ======================================================== */}
      {activeTab === "crystal_grids" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Part Five</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2 mt-1">
                <Layers className="w-6 h-6 text-amber-600" />
                The Numerological Lo Shu 3x3 Crystal Grid
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Harmonizing missing grid positions through geometric crystal placement and central quartz amplification.
              </p>
            </div>

            {/* 3x3 GRID DISPLAY */}
            <div className="max-w-xl mx-auto p-6 rounded-2xl bg-slate-950 text-white border border-amber-500/30 space-y-4 shadow-xl">
              <h4 className="text-xs font-serif font-bold text-amber-300 uppercase tracking-wider text-center">
                Lo Shu Crystal Matrix Arrangement
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { pos: 4, name: "Position 4", stone: "Smoky Quartz", missingLabel: "Missing Practicality" },
                  { pos: 9, name: "Position 9", stone: "Carnelian / Jasper", missingLabel: "Missing Vision" },
                  { pos: 2, name: "Position 2", stone: "Moonstone", missingLabel: "Missing Intuition" },
                  { pos: 3, name: "Position 3", stone: "Red Jasper", missingLabel: "Missing Action" },
                  { pos: 5, name: "Position 5 (Center)", stone: "CLEAR QUARTZ", missingLabel: "Will / Anchor" },
                  { pos: 7, name: "Position 7", stone: "Amethyst", missingLabel: "Missing Analysis" },
                  { pos: 8, name: "Position 8", stone: "Citrine / Topaz", missingLabel: "Missing Wisdom" },
                  { pos: 1, name: "Position 1", stone: "Red Garnet", missingLabel: "Missing Speech" },
                  { pos: 6, name: "Position 6", stone: "Rose Quartz", missingLabel: "Missing Love" }
                ].map((gridCell) => {
                  const isUserMissing = missingNumbers.includes(gridCell.pos);
                  const isCenter = gridCell.pos === 5;
                  return (
                    <div
                      key={gridCell.pos}
                      className={`p-3 rounded-xl border text-center space-y-1 flex flex-col items-center justify-center min-h-[90px] ${
                        isCenter
                          ? "bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-md scale-105"
                          : isUserMissing
                          ? "bg-purple-900/60 border-purple-400 text-purple-100"
                          : "bg-slate-900 border-slate-800 text-slate-300"
                      }`}
                    >
                      <span className="text-xs font-serif font-bold">{gridCell.name}</span>
                      <span className="text-[11px] font-mono">{gridCell.stone}</span>
                      {isUserMissing && (
                        <span className="text-[9px] uppercase font-bold bg-purple-400 text-purple-950 px-1.5 py-0.5 rounded">
                          User Missing
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ACTIVATION GUIDANCE */}
            <div className="p-5 rounded-2xl bg-amber-950 text-amber-50 space-y-3">
              <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Grid Activation & Missing Number Replacement Guidelines
              </h4>
              <p className="text-xs leading-relaxed text-amber-100">
                To activate the Lo Shu Crystal Grid: place the central <strong>Clear Quartz generator</strong> (Position 5) first. Then arrange surrounding stones in order from Position 1 to Position 9. Take a Clear Quartz single-terminated wand and trace invisible lines connecting each outer crystal back to the central quartz crystal 3 times while chanting <em>'Om Namah Shivaya'</em> or <em>'Om Hrim Shrim'</em>.
              </p>
              <p className="text-xs leading-relaxed text-amber-100">
                When a specific Lo Shu number is missing from your personal grid, replace the standard mineral with a larger, higher-grade raw cluster or gemstone corresponding to that planet (e.g., a large Moonstone sphere for missing 2, or a raw Emerald/Green Aventurine block for missing 5).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 6: CHAKRAS & ENERGY HEALING */}
      {/* ======================================================== */}
      {activeTab === "chakras_energy" && (
        <div className="space-y-6">
          {/* CHAKRA SELECTOR STRIP */}
          <div className="p-4 rounded-2xl bg-white border border-amber-900/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Select Chakra (1 to 7)</span>
              <span className="text-purple-700 font-mono">Vedic Subtle Body System</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {CHAKRAS_DATA.map((chk) => {
                const isSelected = selectedChakraNum === chk.chakraNumber;
                return (
                  <button
                    key={chk.chakraNumber}
                    onClick={() => setSelectedChakraNum(chk.chakraNumber)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shrink-0 ${
                      isSelected
                        ? "bg-purple-950 text-purple-100 shadow-md scale-105 border border-purple-400"
                        : "bg-slate-50 text-slate-700 hover:bg-purple-50 border border-slate-200"
                    }`}
                  >
                    <span className="text-sm font-serif">{chk.chakraNumber}. {chk.sanskritName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN CHAKRA DISPLAY CARD */}
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-serif font-bold text-purple-950">
                    {chakraData.chakraNumber}. {chakraData.sanskritName} ({chakraData.englishName})
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Location: <strong>{chakraData.location}</strong> · Element: <strong>{chakraData.element}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-bold border border-purple-200">
                  Beeja Mantra: {chakraData.beejaMantra}
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 font-bold border border-indigo-200">
                  Numbers: {chakraData.correspondingNumbers?.join(", ") || "—"}
                </span>
              </div>
            </div>

            {/* DETAILED OVERVIEW */}
            <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 space-y-3">
              <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-purple-300">
                Chakra Function & Subconscious Resonance
              </h4>
              <p className="text-xs leading-relaxed text-slate-300">
                {chakraData.detailedOverview}
              </p>
            </div>

            {/* BALANCED VS BLOCKED STATES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-950 text-emerald-50 space-y-2">
                <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Balanced Flow State
                </h5>
                <p className="text-xs leading-relaxed text-emerald-100">
                  {chakraData.balancedState}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950 text-rose-50 space-y-2">
                <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  Blocked / Afflicted State
                </h5>
                <p className="text-xs leading-relaxed text-rose-100">
                  {chakraData.blockedState}
                </p>
              </div>
            </div>

            {/* HEALING PRACTICES */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700">Recommended Healing Practices</h5>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                {chakraData.healingPractices.map((prac, idx) => (
                  <li key={idx}>{prac}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 7: YANTRA-CRYSTAL-MANTRA TRIADS */}
      {/* ======================================================== */}
      {activeTab === "triads" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Part Seven</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2 mt-1">
                <Flame className="w-6 h-6 text-amber-600" />
                The Yantra-Crystal-Mantra Triad Practice
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Combining sacred form (Yantra), mineral frequency (Crystal), and sound resonance (Mantra) simultaneously.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TRIADS_DATA.map((triad) => (
                <div key={triad.number} className="p-5 rounded-2xl bg-slate-900 text-slate-100 space-y-3 border border-slate-800 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-serif font-bold text-amber-300 text-sm">
                        Number {triad.number} — {triad.planet}
                      </span>
                      <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                        {triad.practiceDuration}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300">
                      <div>Yantra: <strong className="text-white">{triad.yantraName}</strong></div>
                      <div>Crystal: <strong className="text-white">{triad.crystalName}</strong></div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-800 text-center font-serif text-amber-200 text-xs font-bold">
                      "{triad.mantra}"
                    </div>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-slate-800 text-[11px] text-slate-300">
                    <strong className="text-amber-400 block text-[10px] uppercase">Execution Instructions:</strong>
                    <ul className="space-y-1 list-disc pl-3">
                      {triad.instructions.map((inst, iIdx) => (
                        <li key={iIdx}>{inst}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 8: INTEGRATED REMEDIAL SYSTEM GUIDANCE */}
      {/* ======================================================== */}
      {activeTab === "integrated_program" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Part Eight</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2 mt-1">
                <ShieldAlert className="w-6 h-6 text-amber-600" />
                Integrated System Guidelines — Unified Daily, Weekly & Monthly Rhythm
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Systematic, non-personified protocols for orchestrating Yantras, Crystals, Mantras, and Energy Healing.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 space-y-3">
                <h4 className="font-serif font-bold text-amber-300 text-base">
                  1. The Daily Vibrational Rhythm (20 Minutes Morning)
                </h4>
                <p className="text-xs leading-relaxed text-slate-300">
                  Begin each day by facing the primary directional orientation of your Life Path or missing number Yantra. Hold the corresponding natural crystal in your dominant hand over the relevant chakra center. Perform 108 repetitions of the planetary seed mantra while keeping your gaze gently rested on the central Bindu of the Yantra.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 space-y-3">
                <h4 className="font-serif font-bold text-amber-300 text-base">
                  2. The Weekly Environmental Refresh (Ruling Planetary Day)
                </h4>
                <p className="text-xs leading-relaxed text-slate-300">
                  On the ruling day of your Life Path or primary missing number (e.g., Sunday for Sun/1, Wednesday for Mercury/5, Friday for Venus/6), cleanse all environmental crystals under cool spring water or with frankincense smoke. Wipe down the metal Yantra plate with rose water and offer fresh flowers or sandalwood paste.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 space-y-3">
                <h4 className="font-serif font-bold text-amber-300 text-base">
                  3. The Monthly Full Moon / New Moon Recharge
                </h4>
                <p className="text-xs leading-relaxed text-slate-300">
                  On Full Moon (Purnima) night, place all personal crystals, gemstones, and gem elixir pitchers on a windowsill directly exposed to moonlight for 6 to 8 hours. On New Moon (Amavasya) night, perform deep room cleansing with Selenite wands and sage smoke to dissolve accumulated psychic residue.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-950 text-amber-50 space-y-3">
                <h4 className="font-serif font-bold text-amber-300 text-base">
                  4. The 40-Day Purashcharana Intensive Protocol
                </h4>
                <p className="text-xs leading-relaxed text-amber-100">
                  For severe Lo Shu Grid gaps, Karmic Debts, or major life transitions, commit to an unbroken 40-day intensive. Maintain the exact same Yantra-Crystal-Mantra triad at the exact same hour every morning without skipping a single day. If a day is missed, reset the counter to Day 1 to ensure unbroken vibrational momentum.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ======================================================== */}
      {/* SUB-TAB: CHAPTER 38 CHAKRA BALANCING REMEDIES */}
      {/* ======================================================== */}
      {activeTab === "chakra_balancing_ch38" && (
        <ChakraBalancingRemediesView 
          lifePathNumber={lifePathNumber}
          driverNumber={driverNumber}
          missingNumbers={missingNumbers}
          karmicDebts={karmicDebts}
        />
      )}
    </div>
  );
};
