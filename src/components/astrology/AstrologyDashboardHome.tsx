import React, { useState, useMemo } from "react";
import {
  Sun,
  HelpCircle,
  Award,
  Sparkles,
  RotateCw,
  Compass,
  BookOpen,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Info,
  Clock,
  Layers,
  Activity,
  Sliders,
  FileText,
  Flame,
  ChevronRight
} from "lucide-react";
import { UserProfile } from "../../types";

export type AstrologySystemId =
  | "vedic"
  | "prashna"
  | "kp"
  | "jaimini"
  | "tajika"
  | "bnn"
  | "lalkitab";

export type UserLevel = "essential" | "advanced" | "expert";

interface AstrologyDashboardHomeProps {
  onSelectSystem: (system: AstrologySystemId, initialSection?: string) => void;
  userLevel: UserLevel;
  onUserLevelChange: (level: UserLevel) => void;
  userProfile?: UserProfile;
}

interface SystemCardData {
  id: AstrologySystemId;
  title: string;
  sanskritTitle: string;
  tradition: string;
  icon: React.ReactNode;
  accentBg: string;
  accentText: string;
  badge: string;
  tagline: string;
  description: string;
  toolsCount: number;
  coreHighlights: string[];
  keyTools: { name: string; sectionId?: string }[];
  methodologySummary: {
    foundation: string;
    timingMechanism: string;
    zodiac: string;
    houseDivision: string;
  };
}

export const AstrologyDashboardHome: React.FC<AstrologyDashboardHomeProps> = ({
  onSelectSystem,
  userLevel,
  onUserLevelChange,
  userProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const systems: SystemCardData[] = [
    {
      id: "vedic",
      title: "Vedic Astrology",
      sanskritTitle: "Parashari Jyotish (पाराशरी ज्योतिष)",
      tradition: "Brihat Parashara Hora Shastra & Classical Siddhantas",
      icon: <Sun className="w-6 h-6 text-amber-600" />,
      accentBg: "bg-amber-500/10 border-amber-500/20",
      accentText: "text-amber-800",
      badge: "Core Classical System",
      tagline: "Comprehensive Shastric & Divisional Computing",
      description: "The foundational benchmark of Indian astrology. Integrates 16 divisional charts (D1 to D60), multi-tier Vimshottari dasha hierarchy, 6-fold Shadbala potencies, Ashtakavarga SAV 337, and 1,001+ classical yogas.",
      toolsCount: 15,
      coreHighlights: [
        "D1 to D60 Divisional Vargas (Shodashavarga)",
        "Vimshottari Dasha Hierarchy (Maha to Sookshma)",
        "1,001+ Classical Yogas & Manglik/Dosha Verification",
        "6-Fold Shadbala & Bhava Bala Potency Calculations",
        "Ashtakavarga SAV 337 & Real-Time Planetary Transits"
      ],
      keyTools: [
        { name: "Birth Chart (D1 & Bhavas)", sectionId: "birth_chart" },
        { name: "Divisional Charts (D1–D60)", sectionId: "divisional_charts" },
        { name: "Yogas & Doshas Registry", sectionId: "yogas" },
        { name: "Vimshottari Dasha Timing", sectionId: "dasha" },
        { name: "Shadbala & Ashtakavarga", sectionId: "strength" },
        { name: "Real-Time Transits (Gochara)", sectionId: "transits" },
      ],
      methodologySummary: {
        foundation: "Parashara Hora & Jaimini Sutras",
        timingMechanism: "120-Year Vimshottari Dasha",
        zodiac: "Sidereal (Nirayana) Lahiri Ayanamsha",
        houseDivision: "Shripati / Equal Bhava Madhya",
      },
    },
    {
      id: "prashna",
      title: "Prashna Kundali",
      sanskritTitle: "Prashna Shastra (प्रश्न शास्त्र / Horary)",
      tradition: "Prashna Marga, Shatpanchasika & Daivajna Vallabha",
      icon: <HelpCircle className="w-6 h-6 text-indigo-600" />,
      accentBg: "bg-indigo-500/10 border-indigo-500/20",
      accentText: "text-indigo-800",
      badge: "Horary Time-Cast",
      tagline: "Question-Cast Horary & Tajika Aspect Interlocking",
      description: "Direct astrological answering cast at the exact timestamp of inquiry. Utilizes Prashna Marga radicality checks, Lagnesh-Karyesh sambandha, Tajika aspects (Itthasala/Muthasila), and deterministic event timing.",
      toolsCount: 9,
      coreHighlights: [
        "Dynamic Horary Chart Generation for Query Moment",
        "Radicality & Strictures Evaluation (Prashna Marga)",
        "Lagnesh & Karyesh Interlocking Sambandha",
        "Tajika Horary Aspects (Applying Itthasala)",
        "Deterministic Event Timing Windows & Horary Dossier"
      ],
      keyTools: [
        { name: "Horary Chart Cast", sectionId: "prashna_chart" },
        { name: "Question Evaluation", sectionId: "query_evaluation" },
        { name: "Radicality & Strictures", sectionId: "radicality" },
        { name: "Timing of Events", sectionId: "timing" },
      ],
      methodologySummary: {
        foundation: "Prashna Marga & Shatpanchasika",
        timingMechanism: "Planetary Speeds & Degree Orbs",
        zodiac: "Sidereal (Nirayana)",
        houseDivision: "Bhava Chalit / Whole Sign",
      },
    },
    {
      id: "kp",
      title: "KP Astrology",
      sanskritTitle: "Krishnamurti Paddhati (के.पी. ज्योतिष)",
      tradition: "Prof. K.S. Krishnamurti Tradition (249 Sub-Lords)",
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      accentBg: "bg-emerald-500/10 border-emerald-500/20",
      accentText: "text-emerald-800",
      badge: "Sub-Lord Precision",
      tagline: "249 Sub-Lord Stellar Interlocking & 4-Step Event Timing",
      description: "Krishnamurti Paddhati eliminates bhava ambiguities through Placidus house cusps, 249 unequal sub-lord divisions, Sign-Star-Sub lordship hierarchy, Ruling Planets (RP), and 4-tier ABCD house significator matrices.",
      toolsCount: 10,
      coreHighlights: [
        "249 Sub-Lord Precision Table & Cusp Divisions",
        "Sign Lord, Star Lord, Sub Lord & Sub-Sub Lord Hierarchy",
        "ABCD 4-Tier House Significator Evaluation",
        "Ruling Planets (RP) for Instant Verification",
        "4-Step Theory for High-Probability Event Timing"
      ],
      keyTools: [
        { name: "KP Birth & Cusp Chart", sectionId: "kp_chart" },
        { name: "249 Sub-Lord Table", sectionId: "sub_lords" },
        { name: "ABCD Significators Matrix", sectionId: "significators" },
        { name: "Ruling Planets (RP)", sectionId: "ruling_planets" },
        { name: "KP Event Evaluation", sectionId: "event_evaluation" },
      ],
      methodologySummary: {
        foundation: "K.S. Krishnamurti (Stellar Astrology)",
        timingMechanism: "Dasha-Bhukti-Antara + RP Confluence",
        zodiac: "KP New Ayanamsha",
        houseDivision: "Placidus Semi-Arc Cusp Division",
      },
    },
    {
      id: "jaimini",
      title: "Jaimini Astrology",
      sanskritTitle: "Jaimini Upadesha Sutras (जैमिनि ज्योतिष)",
      tradition: "Maharshi Jaimini Upadesha Sutras & K.N. Rao Lineage",
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      accentBg: "bg-purple-500/10 border-purple-500/20",
      accentText: "text-purple-800",
      badge: "Chara Karaka Sutras",
      tagline: "7/8 Chara Karakas, 12 Arudha Padas & Chara Dasha",
      description: "Operates through mutable planetary significators (Atmakaraka, Amatyakaraka, Darakaraka), Swamsha & Karakamsha, 12 Arudha Padas (AL, UL, A1-A12), Argala intervention mechanics, direct Rashi Drishti, and Chara Dasha.",
      toolsCount: 8,
      coreHighlights: [
        "7 and 8 Chara Karaka Determination (AK, AmK, DK, etc.)",
        "Karakamsha & Swamsha Navamsha Evaluation",
        "12 Arudha Padas (Arudha Lagna AL & Upapada UL)",
        "Argala & Virodhargala Planetary Intervention",
        "Sign-Based Chara Dasha Progression Matrix"
      ],
      keyTools: [
        { name: "Chara Karakas Table", sectionId: "karakas" },
        { name: "Arudha Padas (AL, UL)", sectionId: "arudha_padas" },
        { name: "Argala & Virodhargala", sectionId: "argala" },
        { name: "Chara Dasha System", sectionId: "chara_dasha" },
      ],
      methodologySummary: {
        foundation: "Jaimini Upadesha Sutras",
        timingMechanism: "Sign-Based Chara Dasha",
        zodiac: "Sidereal (Nirayana)",
        houseDivision: "Rashi Bhavas & Rashi Drishti",
      },
    },
    {
      id: "tajika",
      title: "Tajika / Varshaphala",
      sanskritTitle: "Varshaphala Neelakanthi (वर्षफल ताजिक)",
      tradition: "Tajika Neelakanthi, Samar Singh & Persian-Sanskrit Synthesis",
      icon: <RotateCw className="w-6 h-6 text-sky-600" />,
      accentBg: "bg-sky-500/10 border-sky-500/20",
      accentText: "text-sky-800",
      badge: "Solar Return Computing",
      tagline: "Solar Return Convergence, Muntha, Sahams & 16 Yogas",
      description: "Annual solar return astrology calculating the exact second the transiting Sun returns to its natal arcsecond. Computes Muntha & Muntha Lord, Year Lord (Varshapathi via Panchadhikari), 16 Tajika Yogas, Mudda Dasha, and Sahams.",
      toolsCount: 8,
      coreHighlights: [
        "Sub-Arcsecond Solar Return Precision Convergence",
        "Muntha & Muntha Lord Yearly Trajectory",
        "Varshapathi (Year Lord) via 5-Fold Office Selection",
        "16 Classical Tajika Yogas (Itthasala, Ishrafa, etc.)",
        "Mudda Dasha (Annual Vimshottari) & 20+ Saham Formulae"
      ],
      keyTools: [
        { name: "Solar Return Chart", sectionId: "varshaphala_chart" },
        { name: "Muntha Progression", sectionId: "muntha" },
        { name: "Varshapathi Office", sectionId: "varshapathi" },
        { name: "16 Tajika Yogas", sectionId: "tajika_yogas" },
        { name: "Mudda Dasha Timing", sectionId: "mudda_dasha" },
      ],
      methodologySummary: {
        foundation: "Tajika Neelakanthi & Hillaj Tradition",
        timingMechanism: "Mudda Dasha (360-day Annual Cycle)",
        zodiac: "Sidereal (Nirayana) Solar Return",
        houseDivision: "Shripati / Equal Cusp",
      },
    },
    {
      id: "bnn",
      title: "Bhrigu Nandi Nadi (BNN)",
      sanskritTitle: "Bhrigu Nandi Nadi (भृगु नन्दी नाड़ी)",
      tradition: "Sage Bhrigu & Nandi Tradition • R.G. Rao Lineage",
      icon: <Compass className="w-6 h-6 text-emerald-600" />,
      accentBg: "bg-emerald-500/10 border-emerald-500/20",
      accentText: "text-emerald-800",
      badge: "Directional Trines",
      tagline: "1-5-9 Directional Conjunctions & Karaka Sequences",
      description: "Ancient Tamil-Sanskrit Nadi tradition without aspect orb distortion. Assesses karma through 1-5-9 directional trinal harmony (Dharma, Artha, Kama, Moksha), degree-wise sequence in signs, Jeeva/Karma Karakas, and Saturn-Jupiter transit cycles.",
      toolsCount: 7,
      coreHighlights: [
        "Directional Trines (1-5-9 East, 2-6-10 South, etc.)",
        "Natural Graha Karakatwas (Jeeva = Guru, Karma = Shani)",
        "Degree-Wise Sequence in Signs (Forward Transmission)",
        "Trinal Planetary Conjunctions without Orb Restrictions",
        "30-Yr Saturn & 12-Yr Jupiter Cyclic Transit Timing"
      ],
      keyTools: [
        { name: "BNN Directional Chart", sectionId: "bnn_chart" },
        { name: "Directional Trines (1-5-9)", sectionId: "directional_trines" },
        { name: "Sign & Planet Sequences", sectionId: "planetary_sequences" },
        { name: "Saturn & Jupiter Cycles", sectionId: "transit_timing" },
      ],
      methodologySummary: {
        foundation: "Bhrigu Nandi Palm Leaf Sutras",
        timingMechanism: "Saturn 30-Year & Jupiter 12-Year Transits",
        zodiac: "Sidereal (Directional Harmony)",
        houseDivision: "Directional Whole Signs (1-5-9, 2-6-10)",
      },
    },
    {
      id: "lalkitab",
      title: "Classical Lal Kitab",
      sanskritTitle: "Lal Kitab Shastra (लाल किताब शास्त्र)",
      tradition: "Pt. Roop Chand Joshi Tradition (1939–1952 Farmans)",
      icon: <BookOpen className="w-6 h-6 text-rose-600" />,
      accentBg: "bg-rose-500/10 border-rose-500/20",
      accentText: "text-rose-800",
      badge: "Fixed Bhava Shastra",
      tagline: "Fixed Bhavas, Soya Ghar & 43-Day Daytime Remedies",
      description: "The celebrated Red Book system operating under fixed house allocations (House 1 is permanently Aries). Identifies sleeping houses (Soya Ghar), Pakka Ghar lords, 9 ancestral debts (Pitra Rin), and strict daytime farman remedies.",
      toolsCount: 8,
      coreHighlights: [
        "Fixed Bhava System (House 1 is permanently Aries)",
        "Soya Ghar (Sleeping Houses) & Awakening Conditions",
        "Pakka Ghar (Permanent House Ownership) & Karka Rules",
        "9 Ancestral Debts Diagnosis (Pitra Rin, Matri Rin, Stri Rin)",
        "Strict 43-Day Daytime Remedial Execution Directives"
      ],
      keyTools: [
        { name: "Fixed Bhava Chart", sectionId: "lk_chart" },
        { name: "Sleeping Houses (Soya Ghar)", sectionId: "house_analysis" },
        { name: "9 Ancestral Debts (Pitra Rin)", sectionId: "rin_debts" },
        { name: "Classical Farman Remedies", sectionId: "remedies" },
      ],
      methodologySummary: {
        foundation: "Pt. Roop Chand Joshi Farmans (1939-1952)",
        timingMechanism: "Lal Kitab Varshaphala (365-Day Cycle)",
        zodiac: "Fixed House Alignment (1=Mesha, 2=Vrishabha)",
        houseDivision: "Permanent Fixed Bhavas",
      },
    },
  ];

  // Filtered systems based on search
  const filteredSystems = useMemo(() => {
    if (!searchQuery.trim()) return systems;
    const q = searchQuery.toLowerCase();
    return systems.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.sanskritTitle.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.coreHighlights.some((h) => h.toLowerCase().includes(q)) ||
        s.keyTools.some((t) => t.name.toLowerCase().includes(q))
    );
  }, [systems, searchQuery]);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. MASTER HEADER & CONTROLS */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-amber-900/10 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                Enterprise Shastric Architecture
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                8 Independent Classical Methodologies
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Astrology Systems Dashboard
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Select a specialized methodology below to enter its dedicated computing environment. Every system operates strictly under its authentic historical formulas, mathematical divisions, and canonical lineage without mixed interpretations.
            </p>
          </div>

          {/* User Experience Level Toggle */}
          <div className="shrink-0 bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Experience Level
              </span>
              <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-mono font-bold">
                {userLevel.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
              {[
                { id: "essential", label: "Essential", desc: "Intuitive" },
                { id: "advanced", label: "Advanced", desc: "Shastric" },
                { id: "expert", label: "Expert", desc: "Mathematical" },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => onUserLevelChange(lvl.id as UserLevel)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    userLevel === lvl.id
                      ? "bg-slate-900 text-amber-300 shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                  title={`${lvl.label}: ${lvl.desc} level details`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Global Search & Direct Tool Finder */}
        <div className="pt-4 border-t border-slate-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all astrology systems, tools, divisional charts, dasha hierarchies, horary rules, karakas..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 px-2 py-1 rounded bg-white border border-slate-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. CHOOSE YOUR ASTROLOGY SYSTEM — 8 CARDS GRID */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 px-1">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Methodology Workspaces
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Choose Your Astrology System
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Click any system card below to enter its full dedicated dashboard
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredSystems.map((sys) => (
            <div
              key={sys.id}
              onClick={() => onSelectSystem(sys.id)}
              className="group bg-white rounded-3xl p-6 border border-slate-200 hover:border-amber-600/40 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Header with Icon and Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className={`p-3 rounded-2xl ${sys.accentBg} transition-transform group-hover:scale-105`}>
                    {sys.icon}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${sys.accentBg} ${sys.accentText}`}>
                    {sys.badge}
                  </span>
                </div>

                {/* Titles */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                    {sys.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                    {sys.sanskritTitle}
                  </p>
                </div>

                {/* Tagline & Description */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {sys.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Core Capabilities
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-700">
                    {sys.coreHighlights.slice(0, 3).map((hl, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 line-clamp-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">
                  {sys.toolsCount} Dedicated Tools
                </span>
                <span className="font-bold text-amber-800 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Open Workspace <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. QUICK METHODOLOGY COMPARISON MATRIX */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Classical Methodology Comparison Matrix
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Architectural distinctions between the 8 classical lineages supported in Dev-Guru:
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold">
            Zero Cross-System Contamination
          </span>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wider bg-slate-50/50">
                <th className="py-3 px-4 rounded-l-xl">Astrology System</th>
                <th className="py-3 px-4">Primary Foundation</th>
                <th className="py-3 px-4">Zodiac &amp; Ayanamsha</th>
                <th className="py-3 px-4">House Division</th>
                <th className="py-3 px-4">Timing Mechanism</th>
                <th className="py-3 px-4 rounded-r-xl text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {systems.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-lg bg-slate-100">{s.icon}</span>
                      <span>{s.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{s.methodologySummary.foundation}</td>
                  <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">{s.methodologySummary.zodiac}</td>
                  <td className="py-3 px-4 text-slate-600">{s.methodologySummary.houseDivision}</td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{s.methodologySummary.timingMechanism}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onSelectSystem(s.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 font-bold text-[11px] transition-all"
                    >
                      Enter System
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
