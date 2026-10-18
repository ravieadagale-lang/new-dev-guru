import React, { useState } from "react";
import { LanguageCode } from "../types";
import { 
  DREAM_CATEGORIES, 
  DreamScenario, 
  DreamCategory,
  RASHI_DREAM_SENSITIVITIES,
  DAY_TIMING_GUIDE,
  MANTRA_REMEDY_TOOLKIT,
  SPECIAL_TOPICS,
  GENERAL_DREAM_REMEDIES
} from "../data/dreamGuideData";
import { resolveImageUrl } from "../utils/imageResolver";
import { 
  CloudMoon, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Moon, 
  BookOpen, 
  ShieldCheck,
  ChevronRight,
  X,
  Compass,
  Clock,
  Flame,
  Droplets,
  Copy,
  Check,
  Eye,
  Sun,
  Layers,
  Heart
} from "lucide-react";

interface DreamInterpretationViewProps {
  selectedLanguage?: LanguageCode;
  onNavigateTab?: (tab: string) => void;
}

const FALLBACK_DREAM_IMAGE = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80";

export const DreamInterpretationView: React.FC<DreamInterpretationViewProps> = ({
  selectedLanguage = "en",
  onNavigateTab
}) => {
  const [activeTab, setActiveTab] = useState<"dictionary" | "timing" | "rashi" | "topics" | "remedies">("dictionary");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedScenario, setSelectedScenario] = useState<DreamScenario | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedCategoryObj: DreamCategory | undefined = 
    selectedCategory !== "all" 
      ? DREAM_CATEGORIES.find((c) => c.id === selectedCategory) 
      : undefined;

  const allScenarios: DreamScenario[] = DREAM_CATEGORIES.flatMap((c) => c.scenarios);

  const filteredScenarios = allScenarios.filter((s) => {
    return selectedCategory === "all" || s.categoryId === selectedCategory;
  });

  const handleCopyScenario = (scenario: DreamScenario) => {
    const text = `🌌 Dream: ${scenario.title} (${scenario.hindiTitle || ""})\n📜 Shastra: ${scenario.swapnaShastra}\n🧠 Archetype: ${scenario.psychologicalMeaning}\n🌿 Remedy: ${scenario.remedy || "No specific remedy needed"}\nVia Dev-Guru Dream Dictionary`;
    navigator.clipboard.writeText(text);
    setCopiedId(scenario.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0d1322] via-[#161d31] to-[#0d1322] text-indigo-100 p-8 rounded-2xl border border-indigo-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Moon className="w-3.5 h-3.5" /> Swapna Shastra &amp; Archetypal Psychology
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 text-[11px] font-medium border border-amber-400/20">
              <Sparkles className="w-3 h-3" /> Agni Purana &amp; Brihat Samhita
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Sacred Dream Interpretation Sanctuary
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200/80 leading-relaxed max-w-2xl">
            Decode nocturnal visions, divine omens, and subconscious messages through authoritative Vedic Swapna Shastra traditions paired with Carl Jung's archetypal psychology.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs text-indigo-300">
            <span className="flex items-center gap-1">
              <strong className="text-white">{DREAM_CATEGORIES.length}</strong> Sacred Categories
            </span>
            <span className="text-indigo-600">•</span>
            <span className="flex items-center gap-1">
              <strong className="text-white">{allScenarios.length}</strong> Symbolic Scenarios
            </span>
            <span className="text-indigo-600">•</span>
            <span className="flex items-center gap-1">
              <strong className="text-white">100%</strong> Visual Shastra Catalog
            </span>
          </div>
        </div>
      </div>

      {/* Primary Section Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-amber-900/10 shadow-xs flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setActiveTab("dictionary")}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "dictionary"
              ? "bg-slate-900 text-amber-300 shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Dream Dictionary (स्वप्न ज्ञान)</span>
        </button>

        <button
          onClick={() => setActiveTab("timing")}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "timing"
              ? "bg-slate-900 text-amber-300 shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Prahara &amp; 7-Day Guide (समय एवं फल)</span>
        </button>

        <button
          onClick={() => setActiveTab("rashi")}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "rashi"
              ? "bg-slate-900 text-amber-300 shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Rashi Dream Patterns (राशि स्वभाव)</span>
        </button>

        <button
          onClick={() => setActiveTab("topics")}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "topics"
              ? "bg-slate-900 text-amber-300 shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Lucid &amp; Recurring Dreams (जागृत स्वप्न)</span>
        </button>

        <button
          onClick={() => setActiveTab("remedies")}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "remedies"
              ? "bg-slate-900 text-amber-300 shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Swapna Shanti &amp; Remedies (दोष निवारण)</span>
        </button>
      </div>

      {/* TAB 1: DICTIONARY VIEW */}
      {activeTab === "dictionary" && (
        <div className="space-y-6">
          {/* Dream Category Visual Banners Grid (Shown when "All Themes" or browsing categories) */}
          {selectedCategory === "all" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base font-bold text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  Explore by Sacred Dream Category
                </h3>
                <span className="text-xs text-slate-500">
                  Select a category to view Swapna Shastra guidance &amp; scenarios
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {DREAM_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-amber-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative aspect-16/9 w-full overflow-hidden bg-slate-950">
                      <img
                        src={resolveImageUrl(cat.image)}
                        alt={cat.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_DREAM_IMAGE;
                        }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-[11px] text-amber-300 font-semibold border border-amber-500/30 flex items-center gap-1">
                        <span>{cat.icon}</span>
                        <span>{cat.scenarios.length} Scenarios</span>
                      </div>
                      <div className="absolute bottom-2 left-3 right-3">
                        <div className="text-[11px] text-amber-200/80 font-medium">
                          {cat.hindiTitle}
                        </div>
                        <h4 className="font-serif text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                          {cat.title}
                        </h4>
                      </div>
                    </div>

                    <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between bg-white">
                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                        {cat.summary}
                      </p>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-indigo-700 group-hover:text-amber-700 transition-colors">
                        <span>View Dream Meanings</span>
                        <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Focused Category Banner with Image and Vedic Interpretation Information */}
          {selectedCategoryObj && (
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-950 via-slate-900 to-indigo-950 text-white border border-amber-500/30 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                <div className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-4 relative z-10">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-2xl">{selectedCategoryObj.icon}</span>
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
                        {selectedCategoryObj.hindiTitle}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {selectedCategoryObj.scenarios.length} Scenarios Cataloged
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
                      {selectedCategoryObj.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                      {selectedCategoryObj.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="font-semibold text-amber-400">Common Themes:</span>
                    {selectedCategoryObj.keywords.slice(0, 4).map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4 relative min-h-[180px] md:min-h-full overflow-hidden">
                  <img
                    src={resolveImageUrl(selectedCategoryObj.image)}
                    alt={selectedCategoryObj.title}
                    className="w-full h-full object-cover object-center absolute inset-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_DREAM_IMAGE;
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-l from-transparent via-transparent to-slate-950/90" />
                  <div className="absolute bottom-2 right-3 text-[10px] text-amber-200/70 bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs font-mono">
                    Swapna Shastra Reference
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Count & Current Scope */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Displaying <strong>{filteredScenarios.length}</strong> authenticated dream interpretations
            </span>
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-indigo-600 hover:underline cursor-pointer font-medium flex items-center gap-1"
              >
                ← Back to all categories
              </button>
            )}
          </div>

          {/* Dream Scenario Cards Grid with Rich Images */}
          {filteredScenarios.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <CloudMoon className="w-12 h-12 text-indigo-300 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-slate-800">No matching dream interpretations found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Select a category from the Explore by Sacred Dream Category grid.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                }}
                className="px-4 py-2 bg-indigo-900 text-white rounded-xl text-xs font-semibold hover:bg-indigo-800 transition-all cursor-pointer"
              >
                Back to All Categories
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScenarios.map((scenario) => {
                const isAuspicious = scenario.indicationType === "auspicious" || scenario.indication.includes("Auspicious");
                const isCaution = scenario.indicationType === "caution" || scenario.indication.includes("Caution");
                const resolvedImg = resolveImageUrl(scenario.image);

                return (
                  <div
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario)}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden group"
                  >
                    {/* Visual Card Banner Image */}
                    <div className="relative aspect-16/10 w-full bg-slate-900 overflow-hidden">
                      <img
                        src={resolvedImg}
                        alt={scenario.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-all duration-500"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_DREAM_IMAGE;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                        <span className="bg-slate-900/80 backdrop-blur-xs text-indigo-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                          {scenario.categoryName}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs backdrop-blur-xs ${
                            isAuspicious
                              ? "bg-emerald-500/90 text-white"
                              : isCaution
                              ? "bg-amber-500/90 text-slate-950"
                              : "bg-indigo-500/90 text-white"
                          }`}
                        >
                          {scenario.indication}
                        </span>
                      </div>

                      {/* Bottom Title on Image */}
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <h3 className="font-serif font-bold text-base text-white drop-shadow-sm group-hover:text-amber-200 transition-colors line-clamp-1">
                          {scenario.title}
                        </h3>
                        {scenario.hindiTitle && (
                          <p className="text-[11px] text-indigo-200/90 drop-shadow-xs font-serif">
                            {scenario.hindiTitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        {/* Shastra excerpt */}
                        <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          <span className="font-semibold text-slate-800">Shastra: </span>
                          {scenario.swapnaShastra}
                        </div>

                        {/* Psychological Archetype excerpt */}
                        <div className="text-[11px] text-indigo-900/80 bg-indigo-50/50 p-2 rounded-lg border border-indigo-100/60 line-clamp-2">
                          <span className="font-semibold text-indigo-950">Archetype: </span>
                          {scenario.psychologicalMeaning}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-700 font-semibold group-hover:text-indigo-900">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> Full Interpretation &amp; Shanti
                        </span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: TIMING & 7-DAY GUIDE */}
      {activeTab === "timing" && (
        <div className="space-y-6">
          {/* Prahara Explanation Card */}
          <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-xs space-y-4">
            <h2 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>The 4 Praharas of the Night: Dream Timing &amp; Fruit Duration</span>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              According to classical Swapna Shastra texts (including Brihat Samhita and Bhavishya Purana), the time when a dream is seen governs how swiftly and accurately its indications materialize in waking life:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">First Prahara (6 PM – 9 PM)</span>
                <strong className="font-serif text-slate-900 text-sm block">1 Year Manifestation</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Reflects daytime digestion and recent mental impressions. If prophetic, fruition unfolds within one full year.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Second Prahara (9 PM – Midnight)</span>
                <strong className="font-serif text-slate-900 text-sm block">6 to 8 Months</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Deep somatic sleep cycle. Manifests in approximately six to eight months.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Third Prahara (Midnight – 3 AM)</span>
                <strong className="font-serif text-slate-900 text-sm block">3 Months</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Deep dream activity. Karmic patterns and ancestral impressions materialize within roughly three months.
                </p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 space-y-1.5">
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">Brahma Muhurta (3:30 AM – Dawn)</span>
                <strong className="font-serif text-indigo-950 text-sm block">10 to 15 Days (Highest Truth)</strong>
                <p className="text-xs text-indigo-900 leading-relaxed">
                  The mind is pure and free of digestive toxicity. Dreams seen in Brahma Muhurta are considered sacred and manifest within 10–15 days or immediately.
                </p>
              </div>
            </div>
          </div>

          {/* 7 Days Planetary Dream Guide */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-500" />
              <span>Day-of-the-Week Dream Rulers &amp; Shanti Remedies</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {DAY_TIMING_GUIDE.map((day) => (
                <div
                  key={day.day}
                  className="bg-white p-5 rounded-2xl border border-amber-900/10 shadow-xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif font-bold text-base text-slate-900">{day.day}</h4>
                      <span className="text-xs text-amber-800 font-serif">{day.hindiDay}</span>
                    </div>
                    <span className="text-[11px] font-bold bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200">
                      {day.planet}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1.5">
                    <div>
                      <strong className="text-slate-800">Deity:</strong> {day.deity}
                    </div>
                    <div>
                      <strong className="text-slate-800">Key Themes:</strong> {day.themes}
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700">
                      <strong className="text-slate-900">Interpretation:</strong> {day.recommendation}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-xs text-amber-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span><strong>Remedy:</strong> {day.remedyNote}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RASHI DREAM SENSITIVITY */}
      {activeTab === "rashi" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-xs space-y-3">
            <h2 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-600" />
              <span>12 Moon Signs (Rashis) &amp; Their Subconscious Dream Temperament</span>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              In Jyotish, your Moon Sign (Chandra Rashi) governs the Manas (mind, subconscious perception, and emotional filter). Your Moon sign dictates the predominant symbols, elemental themes, and anxiety motifs that appear in dreams:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RASHI_DREAM_SENSITIVITIES.map((rashi) => (
              <div
                key={rashi.sign}
                className="bg-white p-5 rounded-2xl border border-amber-900/10 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif font-bold text-base text-slate-900">{rashi.sign}</h3>
                    <span className="text-xs text-amber-800 font-serif">{rashi.rashiHindi}</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                      {rashi.element}
                    </span>
                    <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                      {rashi.rulingPlanet}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-2">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <strong className="text-slate-900 block mb-0.5">Recurring Dream Pattern:</strong>
                    {rashi.dreamPattern}
                  </div>
                  <div className="bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100/60 text-indigo-950">
                    <strong className="text-indigo-900 block mb-0.5">Subconscious Focus:</strong>
                    {rashi.interpretationFocus}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SPECIAL TOPICS & LUCID DREAMING */}
      {activeTab === "topics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SPECIAL_TOPICS.map((topic) => {
              const resolvedImg = resolveImageUrl(topic.image);
              return (
                <div
                  key={topic.id}
                  className="bg-white rounded-2xl border border-amber-900/10 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative aspect-16/9 w-full bg-slate-900 overflow-hidden">
                    <img
                      src={resolvedImg}
                      alt={topic.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_DREAM_IMAGE;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="font-serif font-bold text-lg leading-tight">{topic.title}</h3>
                      <p className="text-xs text-indigo-200 mt-0.5">{topic.tagline}</p>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3 text-xs">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                        <strong className="text-slate-900 font-serif block">Jungian Psychological Perspective:</strong>
                        <p className="text-slate-600 leading-relaxed">{topic.psychologicalPerspective}</p>
                      </div>

                      <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 space-y-1">
                        <strong className="text-amber-950 font-serif block">Vedic Swapna Shastra View:</strong>
                        <p className="text-amber-900 leading-relaxed">{topic.traditionalVedicPerspective}</p>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <strong className="text-slate-800 font-semibold block">Actionable Practices:</strong>
                        <ul className="space-y-1 text-slate-600 list-disc list-inside">
                          {topic.actionableTechniques.map((tech, idx) => (
                            <li key={idx} className="leading-relaxed">{tech}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: SWAPNA SHANTI & REMEDIES */}
      {activeTab === "remedies" && (
        <div className="space-y-6">
          {/* Universal Cardinal Rules */}
          <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <h2 className="font-serif text-xl font-bold text-slate-900">
                Universal Vedic Swapna Shanti Protocols (दुःस्वप्न नाशक नियम)
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              When encountering an unsettling, frightening, or cautionary dream, classical tradition prescribes these immediate soothing protocols:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {GENERAL_DREAM_REMEDIES.map((remedy, i) => (
                <div
                  key={i}
                  className="bg-[#FAF8F5] p-4 rounded-xl border border-amber-900/10 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">{remedy}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deity & Mantra Remedy Toolkit */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Targeted Deity Mantras for Disturbing Dream Archetypes</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {MANTRA_REMEDY_TOOLKIT.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-amber-900/10 shadow-xs space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      {item.dreamCategory}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Best: {item.bestDay}
                    </span>
                  </div>

                  <div>
                    <strong className="text-slate-900 font-serif text-base block">{item.deity}</strong>
                    <div className="mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800 break-words">
                      {item.mantra}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-xs text-emerald-900 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Vedic Upay:</strong> {item.upay}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL DIALOG */}
      {selectedScenario && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 max-h-[92vh] flex flex-col relative border border-slate-200">
            {/* Modal Image Header Banner */}
            <div className="relative aspect-21/9 w-full bg-slate-900 overflow-hidden shrink-0">
              <img
                src={resolveImageUrl(selectedScenario.image)}
                alt={selectedScenario.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_DREAM_IMAGE;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-black/20" />
              
              <button
                onClick={() => setSelectedScenario(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs cursor-pointer transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-indigo-500/80 backdrop-blur-xs text-[10px] font-bold px-2 py-0.5 rounded-full text-white">
                    {selectedScenario.categoryName}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      selectedScenario.indicationType === "auspicious" || selectedScenario.indication.includes("Auspicious")
                        ? "bg-emerald-500 text-white"
                        : "bg-amber-500 text-slate-950"
                    }`}
                  >
                    {selectedScenario.indication}
                  </span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
                  {selectedScenario.title}
                </h2>
                {selectedScenario.hindiTitle && (
                  <p className="text-xs text-amber-200 font-serif mt-0.5">{selectedScenario.hindiTitle}</p>
                )}
              </div>
            </div>

            {/* Modal Body Scroll Area */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              {/* Shastra Indication */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block font-serif text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-700" />
                  Vedic Swapna Shastra Reading (Agni Purana &amp; Samhita):
                </strong>
                <p className="text-slate-700 leading-relaxed text-xs">{selectedScenario.swapnaShastra}</p>
              </div>

              {/* Psychological Archetype */}
              <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100 space-y-1.5">
                <strong className="text-indigo-950 block font-serif text-sm flex items-center gap-2">
                  <Moon className="w-4 h-4 text-indigo-700" />
                  Jungian Archetypal &amp; Subconscious Interpretation:
                </strong>
                <p className="text-indigo-900 leading-relaxed text-xs">{selectedScenario.psychologicalMeaning}</p>
              </div>

              {/* Shagun Shastra Omen */}
              {selectedScenario.shagunShastra && (
                <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                  <strong className="text-slate-800 block font-serif text-xs">Shagun Shastra Omen Context:</strong>
                  <p className="text-slate-600 leading-relaxed text-xs">{selectedScenario.shagunShastra}</p>
                </div>
              )}

              {/* Prescribed Remedy */}
              {selectedScenario.remedy && (
                <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 space-y-1.5">
                  <strong className="text-amber-950 block font-serif text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    Prescribed Vedic Remedy &amp; Shanti Upay:
                  </strong>
                  <p className="text-amber-900 leading-relaxed text-xs">{selectedScenario.remedy}</p>
                </div>
              )}

              {/* Keywords Tag Cloud */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedScenario.keywords.map((kw, i) => (
                  <span key={i} className="bg-slate-100 text-slate-600 text-[10px] px-2.5 py-0.5 rounded-md">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
              <button
                onClick={() => handleCopyScenario(selectedScenario)}
                className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
              >
                {copiedId === selectedScenario.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Reading</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedScenario(null)}
                className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
              >
                Close Interpretation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
