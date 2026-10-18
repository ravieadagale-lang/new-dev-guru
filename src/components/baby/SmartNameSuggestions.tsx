// src/components/baby/SmartNameSuggestions.tsx
// Displays top suggested baby names with multi-system harmonic scores & astrological breakdown

import React, { useState } from "react";
import { 
  Sparkles, 
  Star, 
  Heart, 
  Moon, 
  Compass, 
  Hash, 
  Info, 
  SlidersHorizontal,
  Bookmark,
  Check,
  Award,
  ArrowRight,
  ShieldCheck,
  Zap,
  Volume2,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { 
  AstroJanmaksharResult, 
  BabyNumerologyProfile, 
  NameCandidate, 
  BabyBirthInput 
} from "../../types/babyNameTypes";
import { NameDetailModal } from "./NameDetailModal";

interface SmartNameSuggestionsProps {
  suggestions: NameCandidate[];
  astro: AstroJanmaksharResult;
  numerology: BabyNumerologyProfile;
  babyInput: BabyBirthInput;
  shortlistedIds: Set<string>;
  onToggleShortlist: (candidate: NameCandidate) => void;
  onSelectForSpelling: (candidate: NameCandidate) => void;
  onOpenCertificate: (candidate: NameCandidate) => void;
}

export const SmartNameSuggestions: React.FC<SmartNameSuggestionsProps> = ({
  suggestions,
  astro,
  numerology,
  babyInput,
  shortlistedIds,
  onToggleShortlist,
  onSelectForSpelling,
  onOpenCertificate
}) => {
  const [filterGender, setFilterGender] = useState<string>("all");
  const [minScore, setMinScore] = useState<number>(75);
  const [selectedCandidateForDetail, setSelectedCandidateForDetail] = useState<NameCandidate | null>(null);

  // Filter suggestions
  const filtered = suggestions.filter((c) => {
    if (filterGender !== "all" && c.gender !== filterGender && c.gender !== "unisex") return false;
    if (c.harmonicScore < minScore) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Astrological & Numerological Birth Anchor Banner */}
      <div className="bg-gradient-to-br from-[#1E192B] via-[#2A233C] to-[#1E192B] text-amber-50 p-6 sm:p-7 rounded-3xl border border-amber-500/20 shadow-lg relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left: Janmakshar & Nakshatra */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5" /> Moon in {astro.rashiName}
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-semibold">
                Nakshatra: {astro.nakshatraName} (Pada {astro.pada})
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
                Lord: {astro.nakshatraLord}
              </span>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-amber-300/80 font-semibold">
                Sacred Birth Syllable (Janmakshar)
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="font-serif text-3xl sm:text-4xl font-black text-amber-300">
                  {astro.primaryAkshara}
                </span>
                <span className="text-lg sm:text-xl font-bold text-amber-100">
                  ("{astro.primaryAksharaEnglish}")
                </span>
                <span className="text-xs text-purple-200/70">
                  Deity: {astro.deity} • Gana: {astro.gana} • Element: {astro.rashiElement}
                </span>
              </div>
            </div>

            {/* Other Padas Syllables */}
            <div className="flex items-center gap-2 text-xs text-purple-200/80">
              <span className="font-semibold text-amber-200">Sibling Pada Sounds:</span>
              <div className="flex gap-1.5 flex-wrap">
                {astro.allPadaAksharas.map((p) => (
                  <span
                    key={p.pada}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-mono ${
                      p.pada === astro.pada
                        ? "bg-amber-400 text-slate-900 font-bold"
                        : "bg-white/10 text-purple-200"
                    }`}
                  >
                    P{p.pada}: {p.akshara} ({p.aksharaEnglish})
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Numerology Profile */}
          <div className="w-full lg:w-auto p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">Driver (Mulank)</div>
              <div className="text-2xl font-serif font-black text-amber-100">#{numerology.driverNumber}</div>
              <div className="text-[10px] text-amber-300/80 truncate">{numerology.driverRulingPlanet.split(" ")[0]}</div>
            </div>

            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <div className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">Conductor (Bhagyank)</div>
              <div className="text-2xl font-serif font-black text-purple-100">#{numerology.conductorNumber}</div>
              <div className="text-[10px] text-purple-300/80 truncate">{numerology.conductorRulingPlanet.split(" ")[0]}</div>
            </div>

            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Lucky Numbers</div>
              <div className="text-sm font-bold text-emerald-100 mt-1">
                {numerology.favorableNameNumbers.join(", ")}
              </div>
              <div className="text-[10px] text-emerald-300/80">Harmonic Vibrations</div>
            </div>

            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <div className="text-[10px] uppercase font-bold text-rose-300 tracking-wider">Missing Grid</div>
              <div className="text-sm font-bold text-rose-100 mt-1">
                {numerology.missingGridNumbers.length > 0 ? numerology.missingGridNumbers.join(", ") : "None"}
              </div>
              <div className="text-[10px] text-rose-300/80">Can Be Balanced</div>
            </div>
          </div>
        </div>
      </div>

      {/* Strict Filtering & Multi-System Harmony Guarantee Bar */}
      <div className="bg-gradient-to-r from-amber-50 via-emerald-50 to-purple-50 p-4 rounded-2xl border border-amber-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span>Strict Vedic Match: Showing only "{astro.primaryAksharaEnglish}" letter names</span>
              {babyInput.religion && babyInput.religion !== "all" && (
                <span className="px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-900 text-[10px] font-extrabold uppercase tracking-wide">
                  {babyInput.religion} Tradition
                </span>
              )}
            </div>
            <div className="text-slate-600 mt-0.5">
              Filtered instantly across entire library • Zero Anty (enemy) number collisions • Pronologically clean sound waveforms
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-100/80 text-emerald-800 font-semibold border border-emerald-200 flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-700" />
            Zero Anty Numbers
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-purple-100/80 text-purple-800 font-semibold border border-purple-200 flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-purple-700" />
            Pronology Certified
          </span>
        </div>
      </div>

      {/* Control / Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Filter Names:</span>
          
          <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
            {[
              { id: "all", label: "All" },
              { id: "boy", label: "Boys" },
              { id: "girl", label: "Girls" },
              { id: "unisex", label: "Unisex" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterGender(f.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                  filterGender === f.id
                    ? "bg-amber-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            Showing <strong className="text-slate-800">{filtered.length}</strong> top harmonic suggestions
          </span>

          <div className="flex items-center gap-1 text-xs font-medium text-slate-600">
            <span>Min Score:</span>
            <select
              value={minScore}
              onChange={(e) => setMinScore(parseInt(e.target.value, 10))}
              className="px-2 py-1 text-xs rounded-lg border border-slate-200 bg-white"
            >
              <option value={70}>70% +</option>
              <option value={80}>80% + (Highly Auspicious)</option>
              <option value={90}>90% + (Supreme Resonance)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Suggested Names Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((candidate, cIdx) => {
          const isShortlisted = shortlistedIds.has(candidate.id);
          const fullName = babyInput.surname ? `${candidate.name} ${babyInput.surname}` : candidate.name;

          return (
            <div
              key={`${candidate.id}-${candidate.religion || 'all'}-${cIdx}`}
              className="bg-white rounded-3xl border border-amber-900/10 shadow-xs hover:shadow-lg transition-all p-5 flex flex-col justify-between gap-4 relative group cursor-pointer hover:border-amber-500/40"
              onClick={() => setSelectedCandidateForDetail(candidate)}
            >
              {/* Card Header: Name + Gender + Score */}
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <h4 className="font-serif text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                        {candidate.name}
                      </h4>
                      <span className="text-xs font-serif text-amber-800 font-medium">
                        {candidate.sanskrit}
                      </span>
                    </div>

                    {babyInput.surname && (
                      <div className="text-xs text-slate-500 mt-0.5 font-medium truncate">
                        Full: <span className="text-slate-800">{fullName}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {candidate.gender}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Syllable: <strong className="text-amber-800 font-mono">"{candidate.startingSyllable}"</strong>
                      </span>
                    </div>
                  </div>

                  {/* Harmonic Score Badge */}
                  <div className="flex flex-col items-end shrink-0">
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 font-bold text-xs">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>{candidate.harmonicScore}%</span>
                    </div>
                    <div className="text-[9px] text-slate-600 mt-0.5">Vedic Harmonic</div>
                  </div>
                </div>

                {/* Meaning & Origin */}
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-2">
                  {candidate.meaning}
                </p>
                {candidate.deityConnection && (
                  <div className="text-[11px] text-amber-800 font-medium mt-1.5 flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-600" />
                    <span>Deity: {candidate.deityConnection}</span>
                  </div>
                )}
              </div>

              {/* Numerological & Astrological Badges */}
              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                {/* Pronology & Anty Shield Tags */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-purple-600" />
                    {candidate.pronology?.rating || "Subha Nada"}
                  </span>

                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Zero Anty Number
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Chaldean First Name Compound */}
                  <div className="p-2 rounded-xl bg-purple-50/70 border border-purple-100">
                    <div className="text-[10px] font-bold text-purple-700 uppercase">First Name</div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="font-bold text-purple-900 text-sm">#{candidate.chaldeanCompound}</span>
                      <span className="text-[10px] text-purple-600">→ #{candidate.chaldeanSingle}</span>
                    </div>
                    <div className="text-[10px] text-purple-800/80 truncate mt-0.5">
                      {candidate.isAuspiciousCompound ? "✨ Auspicious Compound" : "Harmonic"}
                    </div>
                  </div>

                  {/* Total with Surname Compound */}
                  <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-100">
                    <div className="text-[10px] font-bold text-emerald-700 uppercase">
                      {babyInput.surname ? "With Surname" : "Driver Sync"}
                    </div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="font-bold text-emerald-900 text-sm">
                        #{candidate.surnameHarmony?.fullNameCompound || candidate.fullNameCompound}
                      </span>
                      <span className="text-[10px] text-emerald-600">
                        → #{candidate.surnameHarmony?.fullNameSingle || candidate.fullNameSingle}
                      </span>
                    </div>
                    <div className="text-[10px] text-emerald-800/80 truncate mt-0.5">
                      {candidate.driverHarmony === "Friendly" ? "🤝 Friendly Ally" : "Harmonious"}
                    </div>
                  </div>
                </div>

                {/* Janmakshar Alignment Indicator */}
                <div className="px-2.5 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/80 text-[11px] font-medium flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 truncate">
                    <Moon className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="truncate">Janmakshar '{astro.primaryAksharaEnglish}' Root Match</span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-800 underline group-hover:text-amber-900 shrink-0 flex items-center gap-0.5">
                    Details <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div 
                className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => onToggleShortlist(candidate)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isShortlisted
                      ? "bg-rose-50 text-rose-700 border border-rose-200 shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isShortlisted ? "fill-rose-600 text-rose-600" : ""}`} />
                  <span>{isShortlisted ? "Shortlisted" : "Shortlist"}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onSelectForSpelling(candidate)}
                    title="Optimize spelling in Sandbox"
                    className="p-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 text-xs transition-colors cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenCertificate(candidate)}
                    title="Generate Namakarana Certificate"
                    className="px-2.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Certificate</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-2">
          <Info className="w-8 h-8 text-amber-600 mx-auto" />
          <div className="text-sm font-bold text-slate-800">No names match the current filters</div>
          <div className="text-xs text-slate-500">
            Try lowering the minimum score or changing gender preference to view more options.
          </div>
        </div>
      )}

      {/* Complete Name Vibrational Analysis Modal */}
      {selectedCandidateForDetail && (
        <NameDetailModal
          candidate={selectedCandidateForDetail}
          astro={astro}
          numerology={numerology}
          babyInput={babyInput}
          isShortlisted={shortlistedIds.has(selectedCandidateForDetail.id)}
          onClose={() => setSelectedCandidateForDetail(null)}
          onToggleShortlist={onToggleShortlist}
          onSelectForSpelling={onSelectForSpelling}
          onOpenCertificate={onOpenCertificate}
        />
      )}
    </div>
  );
};
