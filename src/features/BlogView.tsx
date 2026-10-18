import React, { useState } from "react";
import { BookOpen, Clock, Calendar, ArrowRight, Tag, Search, Sparkles } from "lucide-react";
import { BLOG_ARTICLES } from "../data/blogData";
import { BlogArticle } from "../types";

export interface BlogViewProps {
  onNavigateTab: (tab: string) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onNavigateTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  const categories = ["All", "Astrology", "Panchang", "Vastu", "Tarot", "Numerology"];

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => setSelectedArticle(null)}
          className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 transition-colors"
        >
          ← Back to All Articles
        </button>

        <article className="bg-white border border-[#E7E2D9] rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wider">
              {selectedArticle.category}
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">
              {selectedArticle.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-100 pb-4">
              <span>By {selectedArticle.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {selectedArticle.publishedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime}
              </span>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-serif italic border-l-4 border-amber-500 pl-4 py-1">
            {selectedArticle.summary}
          </p>

          <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4">
            <p>{selectedArticle.content}</p>

            {selectedArticle.sections?.map((sec, idx) => (
              <div key={idx} className="space-y-3 pt-4">
                <h2 className="font-serif text-xl font-bold text-slate-900">{sec.heading}</h2>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}

                {sec.calloutBox && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 my-4 space-y-1">
                    <div className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      {sec.calloutBox.title}
                    </div>
                    <div className="text-xs text-amber-800 leading-relaxed">{sec.calloutBox.text}</div>
                  </div>
                )}

                {sec.table && (
                  <div className="overflow-x-auto my-4 border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-800">
                          {sec.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-2.5 font-bold border-b border-slate-200">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {sec.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2.5 text-slate-700">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>

          {selectedArticle.relatedToolTab && (
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-600">Want to explore related calculations?</span>
              <button
                onClick={() => onNavigateTab(selectedArticle.relatedToolTab!)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-amber-200 hover:bg-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                Launch {selectedArticle.relatedToolName || "Tool"} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-[#E7E2D9] rounded-3xl p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> Vedic Jyotish Knowledge Hub
          </span>
        </div>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
          Shastric Wisdom, Transit Dissertations &amp; Astrological Guides
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          In-depth scriptural articles, real planetary transits, seasonal muhurtas, and deterministic principles explained with transparent tables and mathematical precision.
        </p>

        {/* Filter Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="bg-white border border-[#E7E2D9] rounded-3xl p-6 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  {article.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {article.readTime}
                </span>
              </div>
              <h2 className="font-serif text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2">
                {article.title}
              </h2>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-4">
              <span>{article.author}</span>
              <span className="font-semibold text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
