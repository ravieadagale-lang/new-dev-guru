import React, { useState, useMemo } from "react";
import {
  LIFE_PROBLEMS_DATABASE
} from "../../engine/vastu/vastuProblemFinderEngine";
import {
  LifeProblemCategory,
  LifeProblemDefectMapping
} from "../../types/vastuTypes";
import {
  Search,
  Sparkles,
  AlertTriangle,
  Flame,
  Shield,
  Gem,
  Compass,
  Copy,
  Check,
  ChevronRight,
  HelpCircle,
  Layers,
  Award,
  Zap,
  BookOpen
} from "lucide-react";

interface VastuProblemFinderViewProps {
  onNavigateToFloorPlan?: () => void;
}

const CATEGORY_TABS: { id: LifeProblemCategory | "all"; label: string; icon: string }[] = [
  { id: "all", label: "All Life Obstacles", icon: "🌐" },
  { id: "wealth_finance", label: "Wealth & Cashflow", icon: "💰" },
  { id: "health_vitality", label: "Health & Vitality", icon: "🩺" },
  { id: "love_relationships", label: "Love & Marriage", icon: "💖" },
  { id: "mental_peace", label: "Mental Peace & Sleep", icon: "🧠" },
  { id: "career_business", label: "Career & Business", icon: "💼" },
  { id: "legal_court", label: "Legal & Court Disputes", icon: "⚖️" },
  { id: "children_education", label: "Children & Education", icon: "👶" }
];

export const VastuProblemFinderView: React.FC<VastuProblemFinderViewProps> = ({
  onNavigateToFloorPlan
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<LifeProblemCategory | "all">("all");
  const [selectedProblemId, setSelectedProblemId] = useState<string>(LIFE_PROBLEMS_DATABASE[0].id);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Filtered list based on search and category
  const filteredProblems = useMemo(() => {
    return LIFE_PROBLEMS_DATABASE.filter((prob) => {
      const matchesCategory = selectedCategory === "all" || prob.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        prob.problemTitle.toLowerCase().includes(query) ||
        prob.primaryVastuFlaw.toLowerCase().includes(query) ||
        prob.afflictedZones.some((z) => z.toLowerCase().includes(query)) ||
        prob.commonSymptoms.some((s) => s.toLowerCase().includes(query)) ||
        prob.elementalConflict.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const activeProblem = useMemo(() => {
    return (
      LIFE_PROBLEMS_DATABASE.find((p) => p.id === selectedProblemId) ||
      filteredProblems[0] ||
      LIFE_PROBLEMS_DATABASE[0]
    );
  }, [selectedProblemId, filteredProblems]);

  const handleCopyPrescription = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const getFullPrescriptionText = (p: LifeProblemDefectMapping) => {
    return `========================================
VASTU REVERSE DIAGNOSIS & REMEDIAL DOSSIER
Problem: ${p.problemTitle}
Category: ${p.category}
========================================
Afflicted Zones: ${p.afflictedZones.join(", ")}
Root Vastu Flaw: ${p.primaryVastuFlaw}
Elemental Conflict: ${p.elementalConflict}
Afflicted Devata: ${p.afflictedDevataPada}
Astrological Impact: ${p.vedicAstrologicalImpact}

--- 5-TIER ZERO-DEMOLITION PRESCRIPTION ---
1. 3D SACRED OBJECT CURE:
${p.remedies.threeDimensionalCure}

2. SACRED CRYSTAL GRID PLACEMENT:
${p.remedies.crystalPlacement}

3. VEDIC MANTRA & PUJA:
Mantra: ${p.remedies.vedicMantraPuja.mantraName}
Sanskrit: ${p.remedies.vedicMantraPuja.sanskritMantra}
Japa Count: ${p.remedies.vedicMantraPuja.japaCount}
Ritual Action: ${p.remedies.vedicMantraPuja.ritualAction}

4. ELEMENTAL VIRTUAL BLOCKING:
${p.remedies.elementalVirtualBlocking}

5. FENG SHUI GRANDMASTER CURE:
${p.remedies.fengShuiGrandmasterCure}
========================================`;
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-xl border border-indigo-900/50">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Vedic Reverse Diagnostic Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Life Obstacle &amp; Vastu Problem Finder
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Select or search any specific life challenge—such as cash crunches, loan traps, marital friction, or career delays. The system will reverse-engineer your home's spatial flaws, pinpoint afflicted Devata Padas, and prescribe powerful 5-tier remedies without requiring demolition or pyramids.
          </p>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute -bottom-10 -right-10 text-indigo-500/10 pointer-events-none select-none">
          <Compass className="w-64 h-64" />
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search symptoms e.g., 'delayed payments', 'debt', 'migraines', 'marriage delay', 'court case', 'kids study'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm font-medium transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
          {CATEGORY_TABS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? "bg-slate-900 text-amber-300 shadow-sm"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Problem Selector List */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-3 space-y-2 max-h-[720px] overflow-y-auto">
          <div className="p-2 text-xs font-black uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>Diagnosed Conditions ({filteredProblems.length})</span>
            <span className="text-[10px] text-amber-600 font-bold">Select to inspect</span>
          </div>

          {filteredProblems.length === 0 ? (
            <div className="p-8 text-center space-y-2 text-slate-400">
              <HelpCircle className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-semibold">No matching conditions found</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="text-xs text-amber-600 font-bold hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredProblems.map((prob) => {
              const isSelected = activeProblem.id === prob.id;
              return (
                <div
                  key={prob.id}
                  onClick={() => setSelectedProblemId(prob.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-2 text-left ${
                    isSelected
                      ? "bg-amber-500/10 border-amber-500/40 text-slate-900 shadow-xs"
                      : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-xs font-black leading-snug flex items-center gap-1.5">
                      <span className="text-sm">
                        {prob.category === "wealth_finance"
                          ? "💰"
                          : prob.category === "health_vitality"
                          ? "🩺"
                          : prob.category === "love_relationships"
                          ? "💖"
                          : prob.category === "mental_peace"
                          ? "🧠"
                          : prob.category === "career_business"
                          ? "💼"
                          : prob.category === "legal_court"
                          ? "⚖️"
                          : "👶"}
                      </span>
                      {prob.problemTitle}
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-700">
                        Zones: {prob.afflictedZones.join(", ")}
                      </span>
                      <span className="text-[10px] text-slate-500 line-clamp-1">
                        {prob.commonSymptoms[0]}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? "text-amber-600 translate-x-0.5" : "text-slate-300"
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Deep-Dive Reverse Diagnostic & Remedial Protocol */}
        <div className="lg:col-span-8 space-y-6">
          {/* Diagnostic Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800">
                    Defect Analysis
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-rose-100 text-rose-800">
                    Primary Zones: {activeProblem.afflictedZones.join(", ")}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  {activeProblem.problemTitle}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleCopyPrescription(
                      getFullPrescriptionText(activeProblem),
                      "full_report"
                    )
                  }
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedSection === "full_report" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied Prescription!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full Dossier</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Typical Symptoms Encountered */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                Signs &amp; Symptoms Manifested by Residents
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeProblem.commonSymptoms.map((sym, idx) => (
                  <div
                    key={idx}
                    className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span>{sym}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Root Architectural & Shastric Flaw Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-100 space-y-1.5">
                <div className="text-[11px] font-black uppercase tracking-wider text-rose-800 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-rose-600" />
                  Root Architectural Flaw
                </div>
                <p className="text-xs font-bold text-slate-900 leading-relaxed">
                  {activeProblem.primaryVastuFlaw}
                </p>
                <p className="text-[11px] text-slate-600 pt-1">
                  {activeProblem.elementalConflict}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1.5">
                <div className="text-[11px] font-black uppercase tracking-wider text-indigo-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Afflicted Devata &amp; Planetary Lord
                </div>
                <p className="text-xs font-bold text-slate-900 leading-relaxed">
                  Devata: {activeProblem.afflictedDevataPada}
                </p>
                <p className="text-[11px] text-slate-600 pt-1">
                  {activeProblem.vedicAstrologicalImpact}
                </p>
              </div>
            </div>
          </div>

          {/* 5-Tier Non-Destructive Remedial Suite */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                Zero-Demolition 5-Tier Remedial Prescription
              </h4>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                100% Non-Invasive · Zero Pyramids
              </span>
            </div>

            {/* Tier 1: 3D Sacred Idol / Object Placement */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
                  <span className="p-1.5 rounded-lg bg-amber-100 text-amber-700">🗿</span>
                  Tier 1: 3D Metal Sacred Object / Idol Placement
                </div>
                <button
                  onClick={() =>
                    handleCopyPrescription(
                      activeProblem.remedies.threeDimensionalCure,
                      "3d"
                    )
                  }
                  className="text-[11px] text-slate-400 hover:text-slate-700 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedSection === "3d" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  Copy
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed bg-amber-50/40 p-3 rounded-xl border border-amber-200/50">
                {activeProblem.remedies.threeDimensionalCure}
              </p>
            </div>

            {/* Tier 2: Sacred Crystal Placement & Grid */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-800">
                  <span className="p-1.5 rounded-lg bg-purple-100 text-purple-700">🔮</span>
                  Tier 2: Sacred Mineral &amp; Crystal Geode Placement
                </div>
                <button
                  onClick={() =>
                    handleCopyPrescription(
                      activeProblem.remedies.crystalPlacement,
                      "crystal"
                    )
                  }
                  className="text-[11px] text-slate-400 hover:text-slate-700 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedSection === "crystal" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  Copy
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed bg-purple-50/40 p-3 rounded-xl border border-purple-200/50">
                {activeProblem.remedies.crystalPlacement}
              </p>
            </div>

            {/* Tier 3: Vedic Mantra, Japa & Puja Protocol */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-800">
                  <span className="p-1.5 rounded-lg bg-rose-100 text-rose-700">📿</span>
                  Tier 3: Vedic Mantra, Japa &amp; Shanti Puja Protocol
                </div>
                <button
                  onClick={() =>
                    handleCopyPrescription(
                      `${activeProblem.remedies.vedicMantraPuja.mantraName}\n${activeProblem.remedies.vedicMantraPuja.sanskritMantra}\nJapa: ${activeProblem.remedies.vedicMantraPuja.japaCount}\nAction: ${activeProblem.remedies.vedicMantraPuja.ritualAction}`,
                      "mantra"
                    )
                  }
                  className="text-[11px] text-slate-400 hover:text-slate-700 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedSection === "mantra" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  Copy
                </button>
              </div>

              <div className="bg-rose-50/50 p-3.5 rounded-xl border border-rose-200/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-black text-rose-900">
                  <span>{activeProblem.remedies.vedicMantraPuja.mantraName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-200/80 text-rose-800 font-bold">
                    Target: {activeProblem.remedies.vedicMantraPuja.deity}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-serif font-bold text-slate-900 tracking-wide bg-white p-2.5 rounded-lg border border-rose-100">
                  {activeProblem.remedies.vedicMantraPuja.sanskritMantra}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="text-slate-600">
                    <span className="font-bold text-slate-800">Japa Sadhana: </span>
                    {activeProblem.remedies.vedicMantraPuja.japaCount}
                  </div>
                  <div className="text-slate-600">
                    <span className="font-bold text-slate-800">Ritual Action: </span>
                    {activeProblem.remedies.vedicMantraPuja.ritualAction}
                  </div>
                </div>
              </div>
            </div>

            {/* Tier 4: Elemental Virtual Blocking / Strips */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-800">
                  <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">⚡</span>
                  Tier 4: Elemental Virtual Blocking (Metallic Strips / Tapes)
                </div>
                <button
                  onClick={() =>
                    handleCopyPrescription(
                      activeProblem.remedies.elementalVirtualBlocking,
                      "blocking"
                    )
                  }
                  className="text-[11px] text-slate-400 hover:text-slate-700 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedSection === "blocking" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  Copy
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed bg-blue-50/40 p-3 rounded-xl border border-blue-200/50">
                {activeProblem.remedies.elementalVirtualBlocking}
              </p>
            </div>

            {/* Tier 5: Feng Shui Grandmaster Protections */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800">
                  <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">🐉</span>
                  Tier 5: Feng Shui Grandmaster Celestial Protection
                </div>
                <button
                  onClick={() =>
                    handleCopyPrescription(
                      activeProblem.remedies.fengShuiGrandmasterCure,
                      "fengshui"
                    )
                  }
                  className="text-[11px] text-slate-400 hover:text-slate-700 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedSection === "fengshui" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  Copy
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed bg-emerald-50/40 p-3 rounded-xl border border-emerald-200/50">
                {activeProblem.remedies.fengShuiGrandmasterCure}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
