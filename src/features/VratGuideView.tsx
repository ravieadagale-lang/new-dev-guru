import React, { useState, useEffect } from "react";
import { UserProfile, LanguageCode } from "../types";
import { ALL_VRATS_CATALOG, VratItem, VratCategory } from "../data/vratGuideData";
import { 
  Calendar, 
  Search, 
  Sparkles, 
  Flame, 
  Check, 
  AlertCircle, 
  Moon, 
  Sun, 
  X, 
  ChevronRight,
  BookOpen 
} from "lucide-react";

interface VratGuideViewProps {
  userProfile?: UserProfile;
  selectedLanguage?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
  initialSelectedVratId?: string | null;
}

export const VratGuideView: React.FC<VratGuideViewProps> = ({
  userProfile,
  selectedLanguage = "en",
  initialSelectedVratId
}) => {
  const [selectedVrat, setSelectedVrat] = useState<VratItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  useEffect(() => {
    if (initialSelectedVratId) {
      const found = ALL_VRATS_CATALOG.find((v) => v.id === initialSelectedVratId);
      if (found) setSelectedVrat(found);
    }
  }, [initialSelectedVratId]);

  const categories = [
    { id: "all", label: "All Vrats & Fasts" },
    { id: "ekadashi", label: "24 Ekadashi" },
    { id: "pradosh", label: "Pradosh Vrats" },
    { id: "weekly", label: "7 Weekly Days" },
    { id: "major_deity", label: "Major Deities" },
    { id: "gupt", label: "Rare & Gupt Vrats" }
  ];

  const filteredVrats = ALL_VRATS_CATALOG.filter((v) => {
    const matchesCat = categoryFilter === "all" || v.category === categoryFilter;
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.nameHindi.includes(searchQuery) ||
      v.deity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-amber-900 via-orange-950 to-amber-900 text-amber-100 p-8 rounded-2xl border border-amber-500/20 shadow-lg">
        <div className="max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5" /> Authentic Shastric Vrat Vidhi &amp; Parana Timing
          </span>
          <h1 className="font-serif text-3xl font-bold text-amber-100">
            Sacred Vrat &amp; Upvas Shastra Guide
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
            Exhaustive encyclopedia of all 24 Ekadashis, Pradosh Vrats, Weekly Fasting rules, permitted Phalahar diets, and exact sunrise Parana formulas according to Hemadri's Vrataraja.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search vrat, deity, purpose..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500"
            />
          </div>

          <span className="text-xs text-slate-500">
            Showing <strong>{filteredVrats.length}</strong> authenticated sacred vrats
          </span>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoryFilter(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter === c.id
                  ? "bg-amber-950 text-amber-300 shadow-xs"
                  : "bg-amber-50 text-slate-700 hover:bg-amber-100"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVrats.map((vrat) => (
          <div
            key={vrat.id}
            onClick={() => setSelectedVrat(vrat)}
            className="bg-white rounded-2xl border border-amber-900/10 hover:border-amber-400/50 p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                  {vrat.category.replace("_", " ")}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {vrat.fastingMethod}
                </span>
              </div>

              <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-amber-900 mt-2">
                {vrat.name}
              </h3>
              <p className="font-serif text-xs text-amber-800 font-semibold">{vrat.nameHindi}</p>

              <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                {vrat.purpose}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Deity: <strong className="text-slate-800">{vrat.deity}</strong></span>
                <span>{vrat.tithiOrTiming}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700">
              <span>View Vidhi &amp; Parana Rules</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Vrat Details Modal */}
      {selectedVrat && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 relative shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedVrat(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-md">
                  {selectedVrat.category.replace("_", " ")}
                </span>
                <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                  Method: {selectedVrat.fastingMethod}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                {selectedVrat.name} ({selectedVrat.nameHindi})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Presiding Deity: <strong>{selectedVrat.deity}</strong> • Timing: {selectedVrat.tithiOrTiming}
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <strong className="text-slate-900 font-serif block text-sm">Spiritual Purpose &amp; Phala:</strong>
              <p className="leading-relaxed">{selectedVrat.purpose}</p>
            </div>

            <div className="space-y-2 text-xs">
              <strong className="text-slate-900 font-serif block text-sm">Step-by-Step Puja &amp; Fasting Vidhi:</strong>
              <ol className="space-y-1.5 pl-4 list-decimal text-slate-700">
                {selectedVrat.vidhi.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80">
                <strong className="text-emerald-950 font-bold block mb-1">Permitted Phalahar Foods:</strong>
                <ul className="space-y-1">
                  {selectedVrat.permittedFoods.map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-emerald-900">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-200/80">
                <strong className="text-rose-950 font-bold block mb-1">Strictly Prohibited:</strong>
                <ul className="space-y-1">
                  {selectedVrat.forbiddenFoods.map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-rose-900">
                      <X className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs space-y-1">
              <strong className="text-amber-950 font-serif block text-sm">Parana Timing &amp; Breaking the Fast:</strong>
              <p className="text-amber-900 leading-relaxed">{selectedVrat.paranaRules}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedVrat(null)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
