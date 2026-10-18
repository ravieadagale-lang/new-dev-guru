import React, { useState } from "react";
import { VRAT_GLOSSARY, VratGlossaryTerm } from "../../data/vratGuideData";
import { BookOpen, Search, Sparkles } from "lucide-react";

export const VratGlossarySection: React.FC = () => {
  const [search, setSearch] = useState("");

  const filteredTerms = VRAT_GLOSSARY.filter(t => {
    const q = search.toLowerCase();
    return (
      t.term.toLowerCase().includes(q) ||
      t.termHindi.includes(q) ||
      t.definition.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-amber-950 via-slate-900 to-amber-900 text-white rounded-2xl p-6 border border-amber-500/30 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Shastric Lexicon &amp; Etymology</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
              Glossary of Sacred Fasting Terminology (व्रत पारिभाषिक शब्दावली)
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/80 max-w-2xl leading-relaxed">
              Authentic Sanskrit and Shastric definitions of essential concepts governing Hindu vratas, tithi calculations, puja kaals, and sacred disciplines.
            </p>
          </div>

          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sacred terms..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-black/40 border border-amber-400/30 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Glossary Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTerms.map((term, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-amber-900/10 hover:border-amber-400/60 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-slate-900">
                    {term.term}
                  </h4>
                  <div className="text-sm font-serif font-semibold text-amber-800">
                    {term.termHindi}
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 shrink-0">
                  {term.category}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
                {term.definition}
              </p>
            </div>

            <div className="pt-2 text-[10px] font-semibold text-slate-600 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Vedic Fasting Pillar #{idx + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
