// src/components/baby/NameLibraryBrowser.tsx
// Comprehensive Multi-Faith Directory & Library Browser Categorized by Religions

import React, { useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  Heart, 
  Sparkles, 
  BookOpen, 
  Award,
  ChevronRight,
  SlidersHorizontal,
  Info,
  CheckCircle2,
  Eye,
  Sliders,
  Compass
} from "lucide-react";
import { BABY_NAMES_MASTER_LIBRARY, BabyNameEntry } from "../../data/babyNamesMasterLibrary";
import { BabyBirthInput, NameCandidate, BabyReligion, AstroJanmaksharResult, BabyNumerologyProfile } from "../../types/babyNameTypes";
import { BabyNameVibrationEngine } from "../../engine/babyNameVibrationEngine";
import { NameDetailModal } from "./NameDetailModal";

interface NameLibraryBrowserProps {
  astro: AstroJanmaksharResult;
  numerology: BabyNumerologyProfile;
  babyInput: BabyBirthInput;
  initialSyllable?: string;
  shortlistedIds: Set<string>;
  onToggleShortlist: (candidate: NameCandidate) => void;
  onSelectForSpelling: (candidate: NameCandidate) => void;
  onOpenCertificate?: (candidate: NameCandidate) => void;
}

const RELIGION_CATEGORIES: { id: BabyReligion; label: string; icon: string; subtitle: string }[] = [
  { id: "all", label: "All Religions", icon: "🌐", subtitle: "Universal & All Traditions" },
  { id: "muslim", label: "Muslim / Islamic", icon: "🕌", subtitle: "Quranic, Arabic & Jannah" },
  { id: "hindu", label: "Hindu / Vedic", icon: "🕉️", subtitle: "Vedic, Sanskrit & Deities" },
  { id: "sikh", label: "Sikh / Gurmukhi", icon: "☬", subtitle: "Gurbani, Khalsa & Waheguru" },
  { id: "christian", label: "Christian", icon: "✝️", subtitle: "Biblical & Sacred Grace" },
  { id: "jain", label: "Jain", icon: "☸️", subtitle: "Tirthankara & Ahimsa" },
  { id: "buddhist", label: "Buddhist", icon: "🌸", subtitle: "Dhamma, Bodhi & Karuna" },
];

export const NameLibraryBrowser: React.FC<NameLibraryBrowserProps> = ({
  astro,
  numerology,
  babyInput,
  initialSyllable = "",
  shortlistedIds,
  onToggleShortlist,
  onSelectForSpelling,
  onOpenCertificate
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReligion, setSelectedReligion] = useState<BabyReligion>(babyInput.religion || "all");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedSyllable, setSelectedSyllable] = useState<string>(initialSyllable);
  const [onlyJanmakshar, setOnlyJanmakshar] = useState<boolean>(false);
  const [modalCandidate, setModalCandidate] = useState<NameCandidate | null>(null);

  // Helper to resolve an entry's religion
  const getEntryReligion = (item: BabyNameEntry): BabyReligion => {
    if (item.religion) return item.religion;
    if (item.origin === "Islamic / Arabic") return "muslim";
    if (item.origin === "Gurmukhi Sikh") return "sikh";
    if (item.origin === "Biblical Christian") return "christian";
    if (item.origin === "Jain Tirthankara") return "jain";
    if (item.origin === "Buddhist Dhamma") return "buddhist";
    return "hindu";
  };

  // Count items per religion
  const countsByReligion = useMemo(() => {
    const counts: Record<string, number> = { all: BABY_NAMES_MASTER_LIBRARY.length };
    for (const item of BABY_NAMES_MASTER_LIBRARY) {
      const rel = getEntryReligion(item);
      counts[rel] = (counts[rel] || 0) + 1;
    }
    return counts;
  }, []);

  // Janmakshar root letters
  const janmaksharLetter = (babyInput.selectedAkshara || astro.primaryAksharaEnglish || "").trim().toUpperCase();

  // Get list of all unique syllables in library
  const allSyllables = useMemo(() => {
    return Array.from(new Set(BABY_NAMES_MASTER_LIBRARY.map((n) => n.syllable))).sort();
  }, []);

  const filteredNames = useMemo(() => {
    return BABY_NAMES_MASTER_LIBRARY.filter((item) => {
      // Religion filter
      if (selectedReligion !== "all") {
        const itemRel = getEntryReligion(item);
        if (itemRel !== selectedReligion && item.religion !== "universal") {
          return false;
        }
      }

      // Gender filter
      if (selectedGender !== "all" && item.gender !== selectedGender && item.gender !== "unisex") {
        return false;
      }

      // Syllable filter
      if (selectedSyllable && item.syllable.toLowerCase() !== selectedSyllable.toLowerCase()) {
        return false;
      }

      // Janmakshar letter filter
      if (onlyJanmakshar && janmaksharLetter) {
        if (!item.name.toUpperCase().startsWith(janmaksharLetter[0])) {
          return false;
        }
      }

      // Search term filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchName = item.name.toLowerCase().includes(term);
        const matchMeaning = item.meaning.toLowerCase().includes(term);
        const matchSanskrit = item.sanskrit.toLowerCase().includes(term);
        const matchDeity = item.deity?.toLowerCase().includes(term);
        if (!matchName && !matchMeaning && !matchSanskrit && !matchDeity) return false;
      }

      return true;
    });
  }, [selectedReligion, selectedGender, selectedSyllable, onlyJanmakshar, janmaksharLetter, searchTerm]);

  return (
    <div className="bg-white rounded-3xl border border-amber-900/10 shadow-xs p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="space-y-4 border-b border-slate-100 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                Multi-Faith Sacred Name Directory
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                Categorized by Religions
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Multi-Faith Baby Name Library
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
              Browse authentic names categorized by faith traditions (Muslim, Sikh, Hindu, Christian, Jain, Buddhist). 
              Every name dynamically calculates Janmakshar alignment, Chaldean compound numbers, surname harmony, and sound pronology.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, meaning, or origin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
        </div>

        {/* RELIGION CATEGORIES SELECTOR */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Browse by Religion / Tradition:
            </span>
            <span className="text-[11px] text-slate-500">
              Showing {filteredNames.length} names
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {RELIGION_CATEGORIES.map((rel) => {
              const isSelected = selectedReligion === rel.id;
              const count = countsByReligion[rel.id] || 0;
              return (
                <button
                  type="button"
                  key={rel.id}
                  onClick={() => setSelectedReligion(rel.id)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                    isSelected
                      ? "bg-amber-600 text-white border-amber-700 shadow-sm ring-2 ring-amber-500/30"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{rel.icon}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isSelected ? "bg-amber-700 text-amber-100" : "bg-slate-200 text-slate-600"
                    }`}>
                      {count}
                    </span>
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${isSelected ? "text-white" : "text-slate-900"}`}>
                      {rel.label}
                    </div>
                    <div className={`text-[10px] leading-tight line-clamp-1 ${isSelected ? "text-amber-100" : "text-slate-500"}`}>
                      {rel.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filters Row: Gender, Janmakshar match, and Syllable */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          {/* Gender Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500">Gender:</span>
            <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
              {[
                { id: "all", label: "All" },
                { id: "boy", label: "Boy" },
                { id: "girl", label: "Girl" },
                { id: "unisex", label: "Unisex" }
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setSelectedGender(g.id)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                    selectedGender === g.id
                      ? "bg-amber-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Janmakshar Quick Match Toggle */}
          <button
            type="button"
            onClick={() => setOnlyJanmakshar(!onlyJanmakshar)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              onlyJanmakshar
                ? "bg-amber-100 border-amber-300 text-amber-900 font-bold shadow-xs"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${onlyJanmakshar ? "text-amber-700" : "text-slate-400"}`} />
            <span>Janmakshar ('{janmaksharLetter[0] || "All"}') Only</span>
          </button>

          {/* Quick Syllable Select */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500">Syllable:</span>
            <select
              value={selectedSyllable}
              onChange={(e) => setSelectedSyllable(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            >
              <option value="">All Syllables</option>
              {allSyllables.map((s) => (
                <option key={s} value={s}>
                  "{s}"
                </option>
              ))}
            </select>

            {selectedSyllable && (
              <button
                type="button"
                onClick={() => setSelectedSyllable("")}
                className="text-xs text-amber-700 hover:text-amber-900 font-semibold cursor-pointer underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Syllable Quick Pills */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Quick Syllable Filter
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedSyllable("")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              selectedSyllable === ""
                ? "bg-slate-900 text-amber-300 font-semibold"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All
          </button>
          {allSyllables.slice(0, 24).map((syl) => {
            const isBabySyllable = astro.primaryAksharaEnglish.toLowerCase() === syl.toLowerCase();
            return (
              <button
                key={syl}
                type="button"
                onClick={() => setSelectedSyllable(syl)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors flex items-center gap-1 ${
                  selectedSyllable === syl
                    ? "bg-amber-600 text-white font-semibold"
                    : isBabySyllable
                    ? "bg-amber-100 text-amber-900 border border-amber-300 font-bold"
                    : "bg-slate-100 text-slate-600 hover:bg-amber-50"
                }`}
              >
                <span>{syl}</span>
                {isBabySyllable && <Sparkles className="w-3 h-3 text-amber-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Names Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        {filteredNames.map((entry, entryIdx) => {
          const candidate = BabyNameVibrationEngine.evaluateCandidateName(entry, babyInput, astro, numerology);
          const isShortlisted = shortlistedIds.has(candidate.id);

          return (
            <div
              key={`${candidate.id}-${entry.religion || 'all'}-${entryIdx}`}
              className="p-5 rounded-2xl border border-slate-200 hover:border-amber-400 bg-white hover:shadow-md transition-all flex flex-col justify-between gap-3 group"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <h4 
                        onClick={() => setModalCandidate(candidate)}
                        className="font-serif text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors cursor-pointer hover:underline"
                      >
                        {candidate.name}
                      </h4>
                      <span className="text-xs font-serif text-amber-800">
                        {candidate.sanskrit}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {candidate.gender}
                      </span>
                      <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100 font-medium">
                        {candidate.origin}
                      </span>
                      {candidate.isJanmaksharMatch && (
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                          ✓ Janmakshar
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-700 border border-amber-500/20">
                      {candidate.harmonicScore}%
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                  {candidate.meaning}
                </p>

                {candidate.deityConnection && (
                  <div className="text-[11px] text-amber-800 font-medium mt-1">
                    Significance: {candidate.deityConnection}
                  </div>
                )}
              </div>

              {/* Numerology Pill & Actions */}
              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>
                  Chaldean: <strong className="text-purple-900">#{candidate.chaldeanCompound}</strong> (→ #{candidate.chaldeanSingle})
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setModalCandidate(candidate)}
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-amber-50 text-slate-600 hover:text-amber-800 transition-colors cursor-pointer"
                    title="View Full Vibrational & Pronology Report"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleShortlist(candidate)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isShortlisted
                        ? "bg-rose-50 text-rose-600"
                        : "bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                    }`}
                    title={isShortlisted ? "Remove from Shortlist" : "Save to Shortlist"}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isShortlisted ? "fill-rose-600" : ""}`} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectForSpelling(candidate)}
                    className="px-2 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-[11px] transition-colors cursor-pointer"
                  >
                    Tune
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredNames.length === 0 && (
        <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl">
          <p className="font-semibold text-slate-700">No names matched your specific criteria.</p>
          <p className="text-xs text-slate-500 mt-1">Try selecting "All Religions" or clearing the Janmakshar/syllable filter.</p>
        </div>
      )}

      {/* Vibration Details Modal when a user clicks on any name in the directory */}
      {modalCandidate && (
        <NameDetailModal
          candidate={modalCandidate}
          astro={astro}
          numerology={numerology}
          babyInput={babyInput}
          isShortlisted={shortlistedIds.has(modalCandidate.id)}
          onClose={() => setModalCandidate(null)}
          onToggleShortlist={onToggleShortlist}
          onSelectForSpelling={onSelectForSpelling}
          onOpenCertificate={(c) => {
            setModalCandidate(null);
            if (onOpenCertificate) onOpenCertificate(c);
          }}
        />
      )}
    </div>
  );
};
