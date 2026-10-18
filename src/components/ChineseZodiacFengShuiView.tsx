import React from "react";
import { ChineseZodiacDetail, PartnerInput } from "../utils/compatibilityCalculator";
import { 
  Sparkles, 
  Compass, 
  Flame, 
  Feather, 
  ShieldCheck, 
  Home, 
  CheckCircle2, 
  Layers
} from "lucide-react";

interface ChineseZodiacFengShuiViewProps {
  chineseZodiac: ChineseZodiacDetail;
  partnerA: PartnerInput;
  partnerB: PartnerInput;
}

export const CHINESE_AFFINITY_TRINES = [
  {
    name: "1st Trine: The Visionaries & Action Leaders",
    animals: ["Rat", "Dragon", "Monkey"],
    element: "Water & Action",
    traits: "Intelligent, charismatic, authoritative, high-energy goal-seekers.",
    marriageSynergy: "Exceptional harmony between Rat, Dragon, and Monkey. Mutual respect for ambition."
  },
  {
    name: "2nd Trine: The Methodical Thinkers & Planners",
    animals: ["Ox", "Snake", "Rooster"],
    element: "Metal & Wisdom",
    traits: "Disciplined, practical, loyal, highly organized, steady financial builders.",
    marriageSynergy: "Unshakeable devotion between Ox, Snake, and Rooster. Shared commitment to family wealth."
  },
  {
    name: "3rd Trine: The Independent Protectors & Idealists",
    animals: ["Tiger", "Horse", "Dog"],
    element: "Fire & Idealism",
    traits: "Honorable, courageous, free-spirited, loyal defenders of justice.",
    marriageSynergy: "High romantic warmth and mutual encouragement between Tiger, Horse, and Dog."
  },
  {
    name: "4th Trine: The Nurturers & Artists",
    animals: ["Rabbit", "Goat", "Pig"],
    element: "Wood & Harmony",
    traits: "Gentle, creative, empathetic, peace-loving, sensitive companions.",
    marriageSynergy: "Deep emotional bonding and soothing domestic serenity between Rabbit, Goat, and Pig."
  }
];

export const FIVE_ELEMENTS_CYCLES = [
  { element: "Wood", generates: "Fire", destroys: "Earth", color: "Green / Emerald", direction: "East / South-East" },
  { element: "Fire", generates: "Earth", destroys: "Metal", color: "Red / Crimson", direction: "South" },
  { element: "Earth", generates: "Metal", destroys: "Water", color: "Yellow / Ochre", direction: "Center / North-East / South-West" },
  { element: "Metal", generates: "Water", destroys: "Wood", color: "White / Silver / Gold", direction: "West / North-West" },
  { element: "Water", generates: "Wood", destroys: "Fire", color: "Blue / Black", direction: "North" }
];

export const ChineseZodiacFengShuiView: React.FC<ChineseZodiacFengShuiViewProps> = ({
  chineseZodiac,
  partnerA,
  partnerB
}) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm space-y-8 animate-in fade-in">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-900 text-xs font-semibold uppercase tracking-wider mb-1">
            <Compass className="w-3.5 h-3.5 text-red-600" />
            Eastern Astrology & Feng Shui House Directional Science
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Chinese Zodiac Animal Affinity & Kua Feng Shui
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Four Affinity Trines, Five Element Productive Cycles, and Kua Compass Directional Synergies.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-red-50 p-3 rounded-2xl border border-red-200 shrink-0">
          <Flame className="w-6 h-6 text-red-600" />
          <div>
            <span className="text-[10px] uppercase font-bold text-red-900 block">Zodiac Synergy</span>
            <strong className="text-lg font-bold text-slate-900">{chineseZodiac.synergyScore}% ({chineseZodiac.compatibilityType})</strong>
          </div>
        </div>
      </div>

      {/* PARTNERS ZODIAC SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="font-serif font-bold text-base text-slate-900">{partnerA.name}'s Feng Shui Profile</h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-900">
              {chineseZodiac.animalA} ({chineseZodiac.elementA})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Kua Number</span>
              <strong className="text-slate-900 font-bold text-sm">Kua {chineseZodiac.kuaA}</strong>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Compass Group</span>
              <strong className="text-slate-900 font-bold text-sm">{chineseZodiac.groupA}</strong>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="font-serif font-bold text-base text-slate-900">{partnerB.name}'s Feng Shui Profile</h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-900">
              {chineseZodiac.animalB} ({chineseZodiac.elementB})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Kua Number</span>
              <strong className="text-slate-900 font-bold text-sm">Kua {chineseZodiac.kuaB}</strong>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Compass Group</span>
              <strong className="text-slate-900 font-bold text-sm">{chineseZodiac.groupB}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* FOUR AFFINITY TRINES */}
      <div className="space-y-4">
        <h4 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-4 h-4 text-red-600" />
          The 4 Chinese Animal Affinity Trines
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {CHINESE_AFFINITY_TRINES.map((trine, i) => {
            const hasA = trine.animals.includes(chineseZodiac.animalA);
            const hasB = trine.animals.includes(chineseZodiac.animalB);
            const isMatch = hasA && hasB;

            return (
              <div
                key={i}
                className={`p-4 rounded-2xl border space-y-2 transition-all ${
                  isMatch ? "bg-red-50 border-red-300 shadow-xs" : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <h5 className="font-serif font-bold text-sm text-slate-900">{trine.name}</h5>
                  {isMatch && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                      ✨ San He Trine Match
                    </span>
                  )}
                </div>

                <div className="flex gap-2 font-bold text-slate-900">
                  {trine.animals.map((an) => (
                    <span
                      key={an}
                      className={`px-2 py-0.5 rounded-md ${
                        an === chineseZodiac.animalA || an === chineseZodiac.animalB
                          ? "bg-red-600 text-white"
                          : "bg-white border border-slate-200"
                      }`}
                    >
                      {an}
                    </span>
                  ))}
                </div>

                <p className="text-slate-700 leading-relaxed">
                  <strong>Traits:</strong> {trine.traits}
                </p>

                <p className="text-red-950 font-medium">
                  <strong>Marriage Synergy:</strong> {trine.marriageSynergy}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FIVE ELEMENTS CYCLES */}
      <div className="space-y-4">
        <h4 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-600" />
          Wu Xing Five Elements Productive & Destructive Cycles
        </h4>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-amber-200 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3">Element</th>
                <th className="p-3">Generates (Nurtures)</th>
                <th className="p-3">Destroys (Weakens)</th>
                <th className="p-3">Harmonious Color</th>
                <th className="p-3">Favorable Compass Sector</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {FIVE_ELEMENTS_CYCLES.map((el) => {
                const isA = el.element === chineseZodiac.elementA;
                const isB = el.element === chineseZodiac.elementB;

                return (
                  <tr key={el.element} className={isA || isB ? "bg-amber-50/60 font-bold" : "hover:bg-slate-50"}>
                    <td className="p-3 flex items-center gap-1.5 font-bold text-slate-900">
                      {el.element}
                      {(isA || isB) && <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded">Active</span>}
                    </td>
                    <td className="p-3 text-emerald-700 font-semibold">{el.generates}</td>
                    <td className="p-3 text-rose-700 font-semibold">{el.destroys}</td>
                    <td className="p-3">{el.color}</td>
                    <td className="p-3">{el.direction}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
