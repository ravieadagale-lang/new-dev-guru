import React from "react";
import { ComprehensiveMatchResult } from "../utils/compatibilityCalculator";
import { ShieldAlert, Sparkles, Scale, AlertTriangle, CheckCircle2, Flame, Heart, BookOpen } from "lucide-react";

interface JaiminiPapasamyaViewProps {
  matchResult: ComprehensiveMatchResult;
}

export const JaiminiPapasamyaView: React.FC<JaiminiPapasamyaViewProps> = ({ matchResult }) => {
  const { papasamya, jaiminiUpapada, partnerA, partnerB } = matchResult;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm space-y-8 animate-in fade-in">
      {/* HEADER SECTION */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <Scale className="w-7 h-7 text-amber-700" />
        <div>
          <h3 className="font-serif text-2xl font-bold text-slate-900">
            Jaimini Upapada Lagna & Papasamya Malefic Balance Engine
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Ancient Maharishi Jaimini Sutra Synastry & Classical Point-Based Malefic Weight (Papasamya) Assessment.
          </p>
        </div>
      </div>

      {/* SECTION 1: PAPASAMYA MALEFIC BALANCE ANALYSIS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-600" />
            Papasamya (Malefic Energy Weight) Balance
          </h4>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            papasamya.isBalanced ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
          }`}>
            {papasamya.isBalanced ? "✓ Papasamya Balanced" : "⚠️ Papasamya Imbalance Alert"}
          </span>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-amber-500/20 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="space-y-1 pt-2 md:pt-0">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">{partnerA.name} Papasamya</span>
              <span className="font-serif text-3xl font-bold text-rose-300">{papasamya.pointsA.toFixed(2)}</span>
              <span className="text-[11px] text-slate-400 block">Points (Sun, Mars, Sat, Rahu, Ketu)</span>
            </div>

            <div className="space-y-1 pt-2 md:pt-0">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Malefic Weight Difference</span>
              <span className="font-serif text-3xl font-bold text-amber-300">Δ {papasamya.delta.toFixed(2)}</span>
              <span className="text-[11px] text-slate-400 block">Point Margin</span>
            </div>

            <div className="space-y-1 pt-2 md:pt-0">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">{partnerB.name} Papasamya</span>
              <span className="font-serif text-3xl font-bold text-amber-300">{papasamya.pointsB.toFixed(2)}</span>
              <span className="text-[11px] text-slate-400 block">Points (Sun, Mars, Sat, Rahu, Ketu)</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-amber-500/10 text-xs text-amber-200 leading-relaxed flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 block mb-0.5">Classical Vedic Rule of Papasamya:</strong>
              {papasamya.verdict} According to Brihat Parashara Hora Shastra, a higher malefic load in the groom's chart protects the marriage, while a significantly heavier load in the bride's chart requires planetary neutralization rituals to prevent health or financial strains.
            </div>
          </div>
        </div>

        {/* DETAILED MALEFIC CONTRIBUTIONS BREAKDOWN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200/80 space-y-2">
            <span className="font-sans font-bold text-rose-950 text-sm block border-b border-rose-200 pb-1">
              {partnerA.name}'s Malefic Placements
            </span>
            {papasamya.detailsA.length > 0 ? (
              <ul className="space-y-1 text-slate-700">
                {papasamya.detailsA.map((d, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span>• {d}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 italic">No significant malefic afflictions in primary houses (1, 2, 4, 7, 8, 12).</p>
            )}
          </div>

          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 space-y-2">
            <span className="font-sans font-bold text-amber-950 text-sm block border-b border-amber-200 pb-1">
              {partnerB.name}'s Malefic Placements
            </span>
            {papasamya.detailsB.length > 0 ? (
              <ul className="space-y-1 text-slate-700">
                {papasamya.detailsB.map((d, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span>• {d}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 italic">No significant malefic afflictions in primary houses (1, 2, 4, 7, 8, 12).</p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: JAIMINI UPAPADA LAGNA (UL) SYNASTRY */}
      <div className="space-y-4 border-t border-slate-100 pt-6">
        <div className="flex items-center justify-between">
          <h4 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            Maharishi Jaimini Upapada Lagna (UL) Karmic Marriage Synastry
          </h4>
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Karmic Score: {jaiminiUpapada.karmicBondScore}%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-2xl border border-amber-200 space-y-2">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">Partner A Upapada Lagna (UL)</span>
            <div className="font-serif text-2xl font-bold text-slate-900">{jaiminiUpapada.upapadaSignA} Sign</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculated Arudha of the 12th house. Governs marital image, spouse's temperament, and long-term marital stability in Jaimini astrology.
            </p>
          </div>

          <div className="bg-gradient-to-br from-rose-50 to-amber-50 p-5 rounded-2xl border border-rose-200 space-y-2">
            <span className="text-xs font-bold text-rose-900 uppercase tracking-wider block">Partner B Upapada Lagna (UL)</span>
            <div className="font-serif text-2xl font-bold text-slate-900">{jaiminiUpapada.upapadaSignB} Sign</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Represents the spouse's lineage, socio-economic prosperity, and marital continuity.
            </p>
          </div>
        </div>

        <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200 text-xs text-slate-800 space-y-2 leading-relaxed">
          <div className="font-bold text-amber-900 flex items-center gap-2 text-sm">
            <Heart className="w-4 h-4 text-rose-600" />
            Jaimini Sutra Commentary & Karmic Soulmate Alignment
          </div>
          <p>{jaiminiUpapada.commentary}</p>
          {jaiminiUpapada.isKarmicSoulmate && (
            <p className="text-emerald-800 font-semibold bg-emerald-100/80 p-2.5 rounded-xl border border-emerald-200">
              ✨ <strong>Auspicious Jaimini Alignment:</strong> The Moon or Lagna of one partner aligns directly with the Upapada Lagna of the other. This indicates a deeply rooted karmic bond spanning multiple lifetimes, creating natural comfort and mutual forgiveness in married life.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
