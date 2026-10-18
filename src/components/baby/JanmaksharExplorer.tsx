// src/components/baby/JanmaksharExplorer.tsx
// Interactive 27 Nakshatras & 108 Padas Janmakshar Browser

import React, { useState } from "react";
import { 
  Sparkles, 
  Search, 
  Moon, 
  Star, 
  BookOpen, 
  Info, 
  Filter,
  CheckCircle2,
  Volume2
} from "lucide-react";
import { VEDIC_NAKSHATRAS_PADA_DATA, VedicNakshatraData } from "../../data/babyJanmaksharData";

interface JanmaksharExplorerProps {
  currentNakshatraIndex?: number;
  currentPada?: number;
  onSelectSyllable?: (syllable: string) => void;
}

export const JanmaksharExplorer: React.FC<JanmaksharExplorerProps> = ({
  currentNakshatraIndex,
  currentPada,
  onSelectSyllable
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNakshatra, setSelectedNakshatra] = useState<VedicNakshatraData>(
    VEDIC_NAKSHATRAS_PADA_DATA[currentNakshatraIndex ?? 0] || VEDIC_NAKSHATRAS_PADA_DATA[0]
  );

  const filteredNakshatras = VEDIC_NAKSHATRAS_PADA_DATA.filter((n) => {
    const term = searchTerm.toLowerCase();
    return (
      n.name.toLowerCase().includes(term) ||
      n.sanskrit.includes(term) ||
      n.lord.toLowerCase().includes(term) ||
      n.padas.some((p) => p.aksharaEnglish.toLowerCase().includes(term) || p.akshara.includes(term))
    );
  });

  return (
    <div className="bg-white rounded-3xl border border-amber-900/10 shadow-xs p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
            Classical Vedic Phonetics &amp; 108 Pada Syllables
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
            Janmakshar &amp; Nakshatra Pada Encyclopedia
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Every Nakshatra is divided into 4 padas (quarters). The Moon's exact position at birth reveals your baby's auspicious starting sound.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Nakshatra or Syllable..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 27 Nakshatras List */}
        <div className="lg:col-span-4 space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
          {filteredNakshatras.map((nak) => {
            const isSelected = selectedNakshatra.index === nak.index;
            const isBabyNakshatra = currentNakshatraIndex === nak.index;

            return (
              <button
                key={nak.index}
                type="button"
                onClick={() => setSelectedNakshatra(nak)}
                className={`w-full text-left p-3 rounded-2xl text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-amber-300 font-semibold shadow-xs"
                    : "bg-slate-50/70 hover:bg-amber-50/60 text-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] opacity-60">#{nak.index + 1}</span>
                    <span className="font-medium">{nak.name}</span>
                    <span className="text-[11px] opacity-75 font-serif">({nak.sanskrit})</span>
                    {isBabyNakshatra && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-bold">
                        Baby
                      </span>
                    )}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? "text-amber-400/80" : "text-slate-600"}`}>
                    Lord: {nak.lord} • {nak.padas.map((p) => p.aksharaEnglish).join(", ")}
                  </div>
                </div>

                <div className="flex gap-1 shrink-0">
                  {nak.padas.map((p) => (
                    <span
                      key={p.pada}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                        isSelected ? "bg-white/10 text-amber-200" : "bg-white text-slate-600 border border-slate-200"
                      }`}
                    >
                      {p.akshara}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Selected Nakshatra In-Depth Pada Cards */}
        <div className="lg:col-span-8 space-y-6">
          {/* Nakshatra Meta Banner */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 via-purple-50/40 to-amber-50 border border-amber-200/80">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                  Nakshatra #{selectedNakshatra.index + 1} of 27
                </span>
                <h4 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2 mt-0.5">
                  <span>{selectedNakshatra.name}</span>
                  <span className="text-lg font-serif text-amber-800">({selectedNakshatra.sanskrit})</span>
                </h4>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-900 font-medium">
                  Lord: <strong>{selectedNakshatra.lord}</strong>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-900 font-medium">
                  Gana: <strong>{selectedNakshatra.gana}</strong>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-900 font-medium">
                  Nadi: <strong>{selectedNakshatra.nadi}</strong>
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-amber-200/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-700">
              <div>
                <span className="text-slate-600">Governing Deity:</span>
                <div className="font-semibold text-slate-900">{selectedNakshatra.deity}</div>
              </div>
              <div>
                <span className="text-slate-600">Cosmic Symbol:</span>
                <div className="font-semibold text-slate-900">{selectedNakshatra.symbol}</div>
              </div>
              <div>
                <span className="text-slate-600">Sacred Animal:</span>
                <div className="font-semibold text-slate-900">{selectedNakshatra.animal}</div>
              </div>
              <div>
                <span className="text-slate-600">Element (Tattva):</span>
                <div className="font-semibold text-slate-900">{selectedNakshatra.element}</div>
              </div>
            </div>
          </div>

          {/* 4 Padas Cards */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              The 4 Padas (Quarters) &amp; Auspicious Sounds
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedNakshatra.padas.map((pada) => {
                const isCurrentBabyPada = 
                  currentNakshatraIndex === selectedNakshatra.index && currentPada === pada.pada;

                return (
                  <div
                    key={pada.pada}
                    className={`p-5 rounded-2xl border transition-all relative ${
                      isCurrentBabyPada
                        ? "bg-amber-50/90 border-amber-400 ring-2 ring-amber-400/20 shadow-xs"
                        : "bg-white border-slate-200 hover:border-amber-300"
                    }`}
                  >
                    {isCurrentBabyPada && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-bold">
                        Baby's Exact Pada
                      </span>
                    )}

                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-600 tracking-wider">
                          Pada {pada.pada} (Quarter {pada.pada})
                        </span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="font-serif text-3xl font-black text-amber-700">
                            {pada.akshara}
                          </span>
                          <span className="text-lg font-bold text-slate-800">
                            ("{pada.aksharaEnglish}")
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                      <div>
                        Rashi Sign: <strong className="text-slate-800">{pada.rashiName}</strong>
                      </div>
                      <div>
                        Navamsha D9: <strong className="text-purple-700">{pada.navamshaSign}</strong>
                      </div>
                    </div>

                    {onSelectSyllable && (
                      <button
                        type="button"
                        onClick={() => onSelectSyllable(pada.aksharaEnglish)}
                        className="mt-3 w-full py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100/70 text-slate-800 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                        <span>Browse Names with "{pada.aksharaEnglish}"</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
