import React from "react";
import { KootaDetail } from "../utils/compatibilityCalculator";
import { 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Flame, 
  HelpCircle,
  HeartHandshake
} from "lucide-react";

interface AshtaKootaExplanationsProps {
  breakdown: KootaDetail[];
  totalScore: number;
}

export const ASHTA_KOOTA_EDUCATIONAL_GUIDE = [
  {
    name: "Varna Koota",
    maxPoints: 1,
    governs: "Work Ethic, Ego Compatibility & Spiritual Orientation",
    description: "Evaluates the spiritual and mental refinement of both partners based on Moon signs classified into Brahmin (Intellectual), Kshatriya (Leader), Vaishya (Merchant), and Shudra (Labor).",
    rules: "Full 1 point is awarded if the groom's Varna is equal to or higher than the bride's Varna, ensuring mutual respect without ego clashes."
  },
  {
    name: "Vashya Koota",
    maxPoints: 2,
    governs: "Mutual Attraction, Influence & Dominance Balance",
    description: "Determines who holds emotional influence in the relationship. Moon signs are classified into Chatushpada (Quadruped), Manav (Human), Jalachar (Water), Vanachar (Wild), and Keeta (Insect).",
    rules: "Full 2 points awarded for compatible sign pairs (e.g. Human-Human or Human-Water) ensuring balanced partnership dynamics."
  },
  {
    name: "Tara Koota",
    maxPoints: 3,
    governs: "Birth Star Alignment, Destiny & Health Protection",
    description: "Measures longevity, destiny compatibility, and mutual prosperity calculated by counting Nakshatras from bride to groom and vice-versa divided by 9.",
    rules: "Favorable Taras: Janma (1), Sampat (2), Kshema (4), Sadhana (6), Mitra (8), Parama Mitra (9). Unfavorable: Vipat (3), Pratyak (5), Naidhana (7)."
  },
  {
    name: "Yoni Koota",
    maxPoints: 4,
    governs: "Physical Attraction, Sexual Harmony & Animal Energy Synergy",
    description: "Crucial for physical intimacy and biological resonance. Each Nakshatra corresponds to an animal (Horse, Elephant, Sheep, Serpent, Dog, Cat, Rat, Cow, Buffalo, Tiger, Deer, Monkey, Lion, Mongoose).",
    rules: "Enemy animal pairs (e.g., Cat vs Rat, Serpent vs Mongoose, Cow vs Tiger) score 0 points; friendly or identical animal pairs score 4 points."
  },
  {
    name: "Graha Maitri Koota",
    maxPoints: 5,
    governs: "Psychological Friendship, Intellect & Communication",
    description: "Assesses mental friendship based on Moon Sign Rashi Lords (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn).",
    rules: "If Rashi Lords are natural friends (e.g. Sun & Jupiter, Moon & Mercury), 5 points are scored. Enemy lords score 0 to 0.5 points."
  },
  {
    name: "Gana Koota",
    maxPoints: 6,
    governs: "Temperament, Social Behavior & Value Systems",
    description: "Classifies Nakshatras into Devata (Divine / Gentle), Manushya (Human / Practical), and Rakshasa (Dominant / Intense).",
    rules: "Same Gana matches score 6/6. Devata + Rakshasa matches can lead to temperamental conflicts unless neutralized by strong Moon lord friendship."
  },
  {
    name: "Bhakoot Koota",
    maxPoints: 7,
    governs: "Financial Growth, Family Wealth & Domestic Longevity",
    description: "Analyzes relative Moon sign positions. Favorable positions: 1/1, 3/11, 4/10, 7/7. Unfavorable positions: 2/12 (Dwidwadash), 5/9 (Navpancham), 6/8 (Shadashtak).",
    rules: "Shadashtak (6/8) or Dwidwadash (2/12) without cancellation creates Bhakoot Dosha, affecting joint wealth accumulation."
  },
  {
    name: "Nadi Koota",
    maxPoints: 8,
    governs: "Genetics, Reproductive Health & Blood Lineage Harmony",
    description: "The most vital Koota carrying 8 out of 36 points. Categorizes Nakshatras into Adi (Vata / Nervous), Madhya (Pitta / Bilious), and Antya (Kapha / Phlegmatic).",
    rules: "Partners MUST have different Nadis (Adi + Madhya, Madhya + Antya, etc.) to score 8/8. Same Nadi causes Nadi Dosha, which can affect progeny unless neutralized."
  }
];

export const AshtaKootaExplanations: React.FC<AshtaKootaExplanationsProps> = ({
  breakdown,
  totalScore
}) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm space-y-6 animate-in fade-in">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-900 text-xs font-semibold uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5 text-rose-600" />
            North Indian Vedic Matchmaking Science
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Ashta Koota 36 Guna Comprehensive Explanations
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Detailed breakdown of all 8 Guna pillars, scoring formulas, and marriage stability impacts.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-2xl border border-amber-200 shrink-0">
          <Award className="w-6 h-6 text-amber-600" />
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-900 block">Total Guna Score</span>
            <strong className="text-lg font-bold text-slate-900">{totalScore} / 36 Points</strong>
          </div>
        </div>
      </div>

      {/* BENCHMARK LEGEND */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-rose-50 p-3 rounded-xl border border-rose-200">
          <span className="font-bold text-rose-950 block">Below 18 Points</span>
          <p className="text-[11px] text-rose-800">Unfavorable. Requires intensive Vedic remedies and astrologer guidance.</p>
        </div>
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
          <span className="font-bold text-amber-950 block">18 - 24 Points</span>
          <p className="text-[11px] text-amber-800">Average Match. Acceptable provided Nadi and Bhakoot are clean.</p>
        </div>
        <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
          <span className="font-bold text-emerald-950 block">25 - 32 Points</span>
          <p className="text-[11px] text-emerald-800">Very Good Match. Promotes high marital happiness and domestic bliss.</p>
        </div>
        <div className="bg-sky-50 p-3 rounded-xl border border-sky-200">
          <span className="font-bold text-sky-950 block">33 - 36 Points</span>
          <p className="text-[11px] text-sky-800">Excellent / Royal Match. Rare divine connection (Uttama Match).</p>
        </div>
      </div>

      {/* KOOTA CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ASHTA_KOOTA_EDUCATIONAL_GUIDE.map((koota, idx) => {
          const matchedScore = breakdown.find(b => b.name.toLowerCase().includes(koota.name.toLowerCase().split(" ")[0]));
          const scoredPts = matchedScore ? matchedScore.scored : 0;
          const status = matchedScore ? matchedScore.status : "Pass";

          return (
            <div
              key={idx}
              className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 hover:border-amber-400 transition-all"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-300 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="font-serif font-bold text-base text-slate-900">{koota.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    status === "Pass" ? "bg-emerald-100 text-emerald-800" :
                    status === "Partial" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"
                  }`}>
                    Scored {scoredPts} / {koota.maxPoints} Pts
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <p className="text-amber-900 font-semibold flex items-center gap-1.5 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <strong>Governs:</strong> {koota.governs}
                </p>

                <p className="text-slate-700 leading-relaxed">
                  {koota.description}
                </p>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                  <strong className="text-slate-900">Vedic Rule:</strong> {koota.rules}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
