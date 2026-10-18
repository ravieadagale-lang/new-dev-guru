import React from "react";
import { KootaDetail } from "../utils/compatibilityCalculator";
import { 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Compass
} from "lucide-react";

interface DashakootaExplanationsProps {
  breakdown: KootaDetail[];
  totalScore: number;
}

export const DASHAKOOTA_EDUCATIONAL_GUIDE = [
  {
    name: "1. Dina Koota",
    maxPoints: 3,
    governs: "Daily Health, Vitality & Absence of Diseases",
    description: "Calculated by counting birth stars (Nakshatras) from bride to groom. Dividing the count by 9 yields remainder values that determine daily health alignment.",
    rule: "Remainders 2 (Sampat), 4 (Kshema), 6 (Sadhana), 8 (Mitra), 9 (Parama Mitra) yield 3 points. Avoid 3, 5, 7."
  },
  {
    name: "2. Gana Koota",
    maxPoints: 6,
    governs: "Temperament & Emotional Harmony",
    description: "Matches Devata (Godly), Manushya (Human), and Rakshasa (Demonic) temperaments to ensure harmonious social and family living.",
    rule: "Devata-Devata (6/6), Manushya-Manushya (6/6), Rakshasa-Rakshasa (6/6). Devata-Manushya scores 5/6."
  },
  {
    name: "3. Mahendra Koota",
    maxPoints: 2,
    governs: "Progeny, Lineage Continuation & Longevity",
    description: "A crucial South Indian Koota ensuring family prosperity, offspring happiness, and mutual bonding across generations.",
    rule: "Groom's star must be 4th, 7th, 10th, 13th, 16th, 19th, 22nd, or 25th from bride's star to score 2 points."
  },
  {
    name: "4. Stree Deerghe Koota",
    maxPoints: 2,
    governs: "Long Marital Life & General Well-being",
    description: "Ensures the groom's star is located at a safe distance from the bride's star, promoting peace and long life for the wife.",
    rule: "Groom's star should be at least 13 Nakshatras away from bride's star. Over 7 Nakshatras yields partial points."
  },
  {
    name: "5. Yoni Koota",
    maxPoints: 4,
    governs: "Physical Attraction & Sexual Compatibilty",
    description: "Based on animal symbols assigned to Nakshatras. Prevents instinctive physical aversion between partners.",
    rule: "Identical/Friendly animal pairs score 4 points. Enemy animal pairs (e.g., Horse vs Buffalo) score 0 points."
  },
  {
    name: "6. Rashi Koota (Bhakoot)",
    maxPoints: 7,
    governs: "Family Growth & Financial Prosperity",
    description: "Analyzes relative zodiac positions of Moon signs. Avoids Shadashtak (6/8) or Dwidwadash (2/12) friction.",
    rule: "Favorable 1/1, 3/11, 4/10, 7/7 relative positions score 7/7 points."
  },
  {
    name: "7. Rashi Adhipati Koota",
    maxPoints: 5,
    governs: "Psychological Friendship & Mental Affinity",
    description: "Evaluates planetary friendship between Moon Sign Lords of both partners.",
    rule: "Natural friend planets score 5/5; neutral lords score 3/5; enemy lords score 0/5."
  },
  {
    name: "8. Vashya Koota",
    maxPoints: 2,
    governs: "Mutual Attraction & Domestic Control Balance",
    description: "Ensures neither partner dominates excessively, nurturing equal partner dignity.",
    rule: "Compatible zodiac classifications score 2/2 points."
  },
  {
    name: "9. Rajju Koota",
    maxPoints: 5,
    governs: "Marital Longevity (Mangalya Balam) & Husband Protection",
    description: "Classifies Nakshatras into 5 Rajjus: Shira (Head), Kantho (Neck), Udero (Abdomen), Katih (Waist), Pada (Foot).",
    rule: "CRITICAL MANDATE: Both partners MUST NOT belong to the same Rajju. Same Rajju causes Rajju Dosha (0/5)."
  },
  {
    name: "10. Vedha Koota",
    maxPoints: 2,
    governs: "Destruction of Mutual Obstacles & Afflictions",
    description: "Identifies mutually opposing Nakshatra pairs (e.g. Ashwini vs Jyeshtha, Bharani vs Anuradha) that strike friction.",
    rule: "If stars are mutually opposing (Vedha), 0 points scored. Non-opposing stars score full 2 points."
  }
];

export const DashakootaExplanations: React.FC<DashakootaExplanationsProps> = ({
  breakdown,
  totalScore
}) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm space-y-6 animate-in fade-in">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-1">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            South Indian Matchmaking Science (10 Kootas)
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Dashakoota 38 Point System Explanations
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Traditional South Indian Kundali matching system emphasizing Rajju, Vedha, Mahendra, and Stree Deerghe longevity principles.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-2xl border border-amber-200 shrink-0">
          <Award className="w-6 h-6 text-amber-600" />
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-900 block">Dashakoota Score</span>
            <strong className="text-lg font-bold text-slate-900">{totalScore} / 38 Points</strong>
          </div>
        </div>
      </div>

      {/* BENCHMARK GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-rose-50 p-3 rounded-xl border border-rose-200">
          <span className="font-bold text-rose-950 block">Rajju / Vedha Dosha Present</span>
          <p className="text-[11px] text-rose-800">Critical warning: In South Indian tradition, Rajju Dosha is strictly vetoed without remedy.</p>
        </div>
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
          <span className="font-bold text-amber-950 block">18 - 25 Points</span>
          <p className="text-[11px] text-amber-800">Moderate Match. Acceptable provided Dina, Mahendra, and Rajju are intact.</p>
        </div>
        <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
          <span className="font-bold text-emerald-950 block">26+ Points</span>
          <p className="text-[11px] text-emerald-800">Highly Auspicious Match. Grants high marital stability, progeny, and prosperity.</p>
        </div>
      </div>

      {/* KOOTAS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DASHAKOOTA_EDUCATIONAL_GUIDE.map((koota, idx) => {
          const matchedScore = breakdown.find(b => b.name.toLowerCase().includes(koota.name.toLowerCase().split(". ")[1]?.split(" ")[0] || ""));
          const scoredPts = matchedScore ? matchedScore.scored : 0;
          const status = matchedScore ? matchedScore.status : "Pass";

          return (
            <div
              key={idx}
              className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 hover:border-amber-400 transition-all"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h3 className="font-serif font-bold text-base text-slate-900">{koota.name}</h3>

                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  status === "Pass" ? "bg-emerald-100 text-emerald-800" :
                  status === "Partial" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"
                }`}>
                  Scored {scoredPts} / {koota.maxPoints} Pts
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <p className="text-amber-900 font-semibold flex items-center gap-1.5 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <strong>Significance:</strong> {koota.governs}
                </p>

                <p className="text-slate-700 leading-relaxed">
                  {koota.description}
                </p>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                  <strong className="text-slate-900">Rule:</strong> {koota.rule}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
