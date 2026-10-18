import React from "react";
import { ComprehensiveMatchResult } from "../utils/compatibilityCalculator";
import { 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Heart, 
  Compass, 
  BookOpen, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Flame, 
  Scale, 
  Crown,
  HelpCircle,
  Award
} from "lucide-react";

interface NakshatraCompatibilityViewProps {
  matchResult: ComprehensiveMatchResult;
}

export const NakshatraCompatibilityView: React.FC<NakshatraCompatibilityViewProps> = ({
  matchResult
}) => {
  const { partnerA, partnerB, nakshatraCompatibility } = matchResult;
  const nak = nakshatraCompatibility;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-purple-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs font-semibold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              Nakshatra & Vashya Psychological Synergy
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Nakshatra Synergy & Vashya Dominance
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
              Explores the subconscious psychological resonance, deity archetypes, and mutual emotional influence between {partnerA.name} and {partnerB.name}.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 font-bold text-lg flex items-center justify-center shadow-inner">
              {nak.spiritualSynergyScore}%
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-purple-200 block">Subconscious Synergy</span>
              <strong className="text-sm font-semibold text-amber-300">
                {nak.spiritualSynergyScore >= 80 ? "High Soulmate Affinity" : nak.spiritualSynergyScore >= 65 ? "Balanced Harmony" : "Complementary Growth"}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* NAKSHATRA PROFILE COMPARISON */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Nakshatra Archetype & Deity Intersection
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Deep analysis of respective birth stars, ruling deities, sacred symbols, and core psychological energies.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PARTNER A CARD */}
          <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200/80 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">Partner A</span>
                <strong className="text-base font-bold text-slate-900">{partnerA.name}</strong>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-serif font-bold text-xs">
                {nak.nakshatraA} (Pada {nak.padaA})
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-amber-200/60">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Ruling Deity</span>
                <strong className="text-slate-900 text-xs font-semibold">{nak.deityA}</strong>
              </div>
              <div className="bg-white p-3 rounded-xl border border-amber-200/60">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Sacred Symbol</span>
                <strong className="text-slate-900 text-xs font-semibold">{nak.symbolA}</strong>
              </div>
              <div className="bg-white p-3 rounded-xl border border-amber-200/60">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Nakshatra Lord</span>
                <strong className="text-slate-900 text-xs font-semibold">{nak.lordA}</strong>
              </div>
              <div className="bg-white p-3 rounded-xl border border-amber-200/60">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Temperament (Gana)</span>
                <strong className="text-slate-900 text-xs font-semibold">{partnerA.gana} Gana</strong>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-amber-200/60 text-xs text-slate-700 leading-relaxed">
              <strong className="text-amber-950 block mb-1">Core Energy:</strong>
              {nak.energyA}
            </div>
          </div>

          {/* PARTNER B CARD */}
          <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-200/80 space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-200/60 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-800 tracking-wider block">Partner B</span>
                <strong className="text-base font-bold text-slate-900">{partnerB.name}</strong>
              </div>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-900 rounded-full font-serif font-bold text-xs">
                {nak.nakshatraB} (Pada {nak.padaB})
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-indigo-200/60">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Ruling Deity</span>
                <strong className="text-slate-900 text-xs font-semibold">{nak.deityB}</strong>
              </div>
              <div className="bg-white p-3 rounded-xl border border-indigo-200/60">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Sacred Symbol</span>
                <strong className="text-slate-900 text-xs font-semibold">{nak.symbolB}</strong>
              </div>
              <div className="bg-white p-3 rounded-xl border border-indigo-200/60">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Nakshatra Lord</span>
                <strong className="text-slate-900 text-xs font-semibold">{nak.lordB}</strong>
              </div>
              <div className="bg-white p-3 rounded-xl border border-indigo-200/60">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Temperament (Gana)</span>
                <strong className="text-slate-900 text-xs font-semibold">{partnerB.gana} Gana</strong>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-indigo-200/60 text-xs text-slate-700 leading-relaxed">
              <strong className="text-indigo-950 block mb-1">Core Energy:</strong>
              {nak.energyB}
            </div>
          </div>
        </div>

        {/* PSYCHOLOGICAL SYNERGY COMMENTARY */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 text-sm font-semibold block mb-1">Psychological & Subconscious Resonance</strong>
            <p>{nak.psychologicalSynergy}</p>
          </div>
        </div>
      </div>

      {/* THE VASHYA FACTOR SECTION */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 text-[10px] font-bold uppercase tracking-wider mb-1">
              <Crown className="w-3 h-3 text-rose-600" />
              Emotional Influence & Subjugation Science
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              The Vashya Factor: Balance of Dominance & Attraction
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Determines who holds psychological sway, natural authority, and magnetizing influence in domestic life.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-2xl border border-amber-200 shrink-0">
            <Award className="w-6 h-6 text-amber-600" />
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-900 block">Vashya Score</span>
              <strong className="text-base font-bold text-slate-900">{nak.vashyaScore} / 2.0 Points</strong>
            </div>
          </div>
        </div>

        {/* VASHYA CATEGORIES COMPARISON */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-rose-900 uppercase">Partner A Vashya</span>
              <h4 className="font-serif font-bold text-lg text-slate-900">{nak.vashyaTypeA}</h4>
            </div>
            <span className="px-3 py-1 bg-white text-rose-900 rounded-xl text-xs font-semibold border border-rose-200 shadow-xs">
              {partnerA.rashi} Rashi
            </span>
          </div>

          <div className="bg-indigo-50/60 p-4 rounded-2xl border border-indigo-200/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-indigo-900 uppercase">Partner B Vashya</span>
              <h4 className="font-serif font-bold text-lg text-slate-900">{nak.vashyaTypeB}</h4>
            </div>
            <span className="px-3 py-1 bg-white text-indigo-900 rounded-xl text-xs font-semibold border border-indigo-200 shadow-xs">
              {partnerB.rashi} Rashi
            </span>
          </div>
        </div>

        {/* VASHYA RELATIONSHIP VERDICT */}
        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
            <Scale className="w-4 h-4 text-amber-600" />
            <span>{nak.vashyaRelation}</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            {nak.vashyaExplanation}
          </p>
        </div>

        {/* VASHYA EDUCATIONAL CLASSIFICATION REFERENCE */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-purple-600" />
            Classical Vashya Classifications & Domestic Dynamics
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-[11px]">
            <div className={`p-3 rounded-xl border ${nak.vashyaTypeA === "Dwipada" || nak.vashyaTypeB === "Dwipada" || nak.vashyaTypeA === "Manav" || nak.vashyaTypeB === "Manav" ? "bg-purple-50 border-purple-300 ring-1 ring-purple-400" : "bg-slate-50 border-slate-200"}`}>
              <span className="font-bold text-slate-900 block">Dwipada (Human)</span>
              <p className="text-slate-600 mt-1">Gemini, Virgo, Libra, Aquarius, Sag 0-15°.</p>
              <span className="text-[10px] text-purple-700 font-semibold block mt-1">Intellectual & Communicative</span>
            </div>

            <div className={`p-3 rounded-xl border ${nak.vashyaTypeA === "Chatushpada" || nak.vashyaTypeB === "Chatushpada" ? "bg-purple-50 border-purple-300 ring-1 ring-purple-400" : "bg-slate-50 border-slate-200"}`}>
              <span className="font-bold text-slate-900 block">Chatushpada (Quadruped)</span>
              <p className="text-slate-600 mt-1">Aries, Taurus, Sag 15-30°, Cap 0-15°.</p>
              <span className="text-[10px] text-purple-700 font-semibold block mt-1">Grounded & Dependable</span>
            </div>

            <div className={`p-3 rounded-xl border ${nak.vashyaTypeA === "Jalachara" || nak.vashyaTypeB === "Jalachara" ? "bg-purple-50 border-purple-300 ring-1 ring-purple-400" : "bg-slate-50 border-slate-200"}`}>
              <span className="font-bold text-slate-900 block">Jalachar (Aquatic)</span>
              <p className="text-slate-600 mt-1">Cancer, Pisces, Cap 15-30°.</p>
              <span className="text-[10px] text-purple-700 font-semibold block mt-1">Nurturing & Emotional</span>
            </div>

            <div className={`p-3 rounded-xl border ${nak.vashyaTypeA === "Vanachara" || nak.vashyaTypeB === "Vanachara" ? "bg-purple-50 border-purple-300 ring-1 ring-purple-400" : "bg-slate-50 border-slate-200"}`}>
              <span className="font-bold text-slate-900 block">Vanachar (Wild Beast)</span>
              <p className="text-slate-600 mt-1">Leo (Lion).</p>
              <span className="text-[10px] text-purple-700 font-semibold block mt-1">Proud & Independent</span>
            </div>

            <div className={`p-3 rounded-xl border ${nak.vashyaTypeA === "Keeta" || nak.vashyaTypeB === "Keeta" ? "bg-purple-50 border-purple-300 ring-1 ring-purple-400" : "bg-slate-50 border-slate-200"}`}>
              <span className="font-bold text-slate-900 block">Keeta (Insect)</span>
              <p className="text-slate-600 mt-1">Scorpio (Scorpion).</p>
              <span className="text-[10px] text-purple-700 font-semibold block mt-1">Secretive & Protective</span>
            </div>
          </div>
        </div>
      </div>

      {/* TARA CHAKRA & DESTINY ALIGNMENT */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-600" />
              Tara Chakra & Subconscious Destiny Wave
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Measures mutual psychological comfort and health alignment by calculating stellar intervals.
            </p>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold ${nak.isTaraHarmonious ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
            Tara Score: {nak.taraScore} / 3.0 Pts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-500">Partner A → Partner B Star Count</span>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Count: {nak.taraCountAtoB} / 9</span>
              <span className="text-indigo-600 font-normal">({nak.taraNameAtoB})</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-500">Partner B → Partner A Star Count</span>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Count: {nak.taraCountBtoA} / 9</span>
              <span className="text-indigo-600 font-normal">({nak.taraNameBtoA})</span>
            </div>
          </div>
        </div>

        {/* STAR-LORD HARMONY */}
        <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-200 text-xs text-purple-950 flex items-center gap-3">
          <Zap className="w-5 h-5 text-purple-600 shrink-0" />
          <div>
            <strong className="block font-bold">Nakshatra Star-Lord Alignment:</strong>
            {nak.lordHarmony}
          </div>
        </div>
      </div>
    </div>
  );
};
