import React, { useState } from "react";
import { 
  Sparkles, 
  Compass, 
  Calendar, 
  Layers, 
  Flame, 
  Feather, 
  ShieldCheck, 
  Info,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Heart,
  Clock
} from "lucide-react";
import { LanguageCode } from "../types";

interface ChineseAstrologyViewProps {
  selectedLanguage?: LanguageCode;
  onNavigateTab?: (tab: string) => void;
  initialSubSection?: string;
}

export const CHINESE_ASTROLOGY_SYSTEMS = [
  {
    id: "dashboard",
    title: "Chinese Astrology Dashboard",
    category: "Overview",
    description: "High-level overview of eastern celestial cycles, annual Tai Sui influences, and personal Four Pillars."
  },
  {
    id: "bazi_pillars",
    title: "BaZi / Four Pillars",
    category: "Pillars",
    description: "Year, Month, Day, and Hour Pillars derived from the Chinese Sexagenary 60-year calendar cycle."
  },
  {
    id: "stems_branches",
    title: "Heavenly Stems & Earthly Branches",
    category: "Cosmology",
    description: "The 10 Heavenly Stems (Tian Gan) and 12 Earthly Branches (Di Zhi) governing cosmic and earthly qi."
  },
  {
    id: "yin_yang_elements",
    title: "Yin & Yang / Five Elements",
    category: "Cosmology",
    description: "Wu Xing dynamic generating (Sheng) and controlling (Ke) cycles: Wood, Fire, Earth, Metal, and Water."
  },
  {
    id: "day_master",
    title: "Day Master & Hidden Stems",
    category: "Soul Essence",
    description: "The core personality anchor and root energies concealed inside earthly animal branches."
  },
  {
    id: "ten_gods",
    title: "Ten Gods & Seasonal Strength",
    category: "Analysis",
    description: "Relationships to the Day Master: Companion, Output, Wealth, Officer, and Resource archetypes."
  },
  {
    id: "interactions",
    title: "Combinations, Clashes, Harms & Punishments",
    category: "Dynamic Qi",
    description: "Branch San He, Liu He trines, Chong clashes, Xing punishments, Po destructions, and Hai harms."
  },
  {
    id: "patterns_useful_god",
    title: "Special Patterns & Useful God (Yong Shen)",
    category: "Remedies",
    description: "Balance determination, temperature regulation, and identifying the guiding favorable element."
  },
  {
    id: "luck_pillars",
    title: "Luck Pillars (Da Yun) & Annual Timing",
    category: "Timeline",
    description: "10-year major luck stages, annual Liu Nian events, and monthly solar term transits."
  },
  {
    id: "chinese_compatibility",
    title: "Chinese Compatibility & BaZi Synastry",
    category: "Synastry",
    description: "Affinity trines, Day Master harmony, element balancing between partners, and peach blossom stars."
  },
  {
    id: "bazi_report",
    title: "Comprehensive BaZi Report",
    category: "Dossier",
    description: "Full lifetime BaZi blueprint, auspicious directions, colors, careers, and personal destiny forecast."
  }
];

export const ChineseAstrologyView: React.FC<ChineseAstrologyViewProps> = ({
  selectedLanguage = "en",
  onNavigateTab,
  initialSubSection = "dashboard"
}) => {
  const [selectedSection, setSelectedSection] = useState<string>(initialSubSection);

  const activeItem = CHINESE_ASTROLOGY_SYSTEMS.find((s) => s.id === selectedSection) || CHINESE_ASTROLOGY_SYSTEMS[0];

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#1A120B] via-[#2A1B0E] to-[#1A120B] text-amber-100 p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Eastern Metaphysics Suite
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-50 mt-2">
            Chinese Astrology &amp; BaZi Four Pillars
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 mt-1 max-w-2xl">
            Sexagenary Cycle, 10 Heavenly Stems, 12 Earthly Branches, Wu Xing Five Elements, and Ten Gods analysis.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto">
          <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-400/20 text-amber-200 text-xs font-mono">
            Navigation Architecture Ready
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Submenu Directory */}
        <div className="lg:col-span-4 space-y-2">
          <div className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 py-1 mb-2">
              BaZi &amp; Chinese Astrology Architecture
            </h2>
            <div className="space-y-1">
              {CHINESE_ASTROLOGY_SYSTEMS.map((item) => {
                const isSelected = selectedSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSection(item.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 text-amber-300 font-semibold shadow-xs"
                        : "text-slate-700 hover:bg-amber-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="truncate">
                      <div>{item.title}</div>
                      <div className={`text-[10px] ${isSelected ? "text-amber-400/80" : "text-slate-600"}`}>
                        {item.category}
                      </div>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-amber-400" : "text-slate-600"}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detail Panel & Roadmap Notice */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                  {activeItem.category}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  {activeItem.title}
                </h2>
              </div>
              <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full font-medium">
                Submenu Destination
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {activeItem.description}
            </p>

            {/* Architecture Roadmap Notice */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Roadmap Implementation Boundary Notice</span>
              </div>
              <p className="text-xs text-amber-800/90 leading-relaxed">
                This navigation node is fully integrated into the Dev-Guru navigation hierarchy. Per the project roadmap, the deterministic calculation engine for Chinese Astrology and BaZi Four Pillars is frozen and scheduled for dedicated phase implementation following navigation architecture completion.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-medium text-amber-900">
                <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200">
                  Sexagenary Solar Ephemeris
                </span>
                <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200">
                  Solar Terms (Jie Qi)
                </span>
                <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200">
                  60 Jia Zi Cycles
                </span>
                <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200">
                  True Solar Time Calibration
                </span>
              </div>
            </div>

            {/* Related Quick Links */}
            <div className="pt-4 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Related Live Portals in Dev-Guru
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => onNavigateTab?.("compatibility")}
                  className="p-3 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 text-left transition-all cursor-pointer group"
                >
                  <div className="text-xs font-bold text-slate-800 group-hover:text-amber-900 flex items-center justify-between">
                    <span>Kundli &amp; Astrological Compatibility</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-600" />
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1">
                    Compare Vedic Ashta Koota and relationship dynamics
                  </div>
                </button>
                <button
                  onClick={() => onNavigateTab?.("face_reading")}
                  className="p-3 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 text-left transition-all cursor-pointer group"
                >
                  <div className="text-xs font-bold text-slate-800 group-hover:text-amber-900 flex items-center justify-between">
                    <span>Face Reading &amp; 12 Palaces</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-600" />
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1">
                    Chinese Mian Xiang and Vedic Mukha Samudrika
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
