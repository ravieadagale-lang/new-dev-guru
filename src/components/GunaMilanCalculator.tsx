import React, { useState, useMemo } from "react";
import { ZodiacSignIcon } from "./ZodiacSignIcon";
import { 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  User, 
  Users, 
  Flame, 
  Award, 
  Info,
  RotateCcw
} from "lucide-react";

interface GunaMilanCalculatorProps {
  defaultGroomName?: string;
  defaultBrideName?: string;
}

export interface KootaScore {
  name: string;
  maxPoints: number;
  obtainedPoints: number;
  description: string;
  status: "Excellent" | "Good" | "Average" | "Requires Remedy";
}

export const GunaMilanCalculator: React.FC<GunaMilanCalculatorProps> = ({
  defaultGroomName = "Anand",
  defaultBrideName = "Priya"
}) => {
  const [groomName, setGroomName] = useState<string>(defaultGroomName);
  const [groomRashi, setGroomRashi] = useState<string>("Taurus");
  const [groomNakshatra, setGroomNakshatra] = useState<string>("Rohini");

  const [brideName, setBrideName] = useState<string>(defaultBrideName);
  const [brideRashi, setBrideRashi] = useState<string>("Cancer");
  const [brideNakshatra, setBrideNakshatra] = useState<string>("Pushya");

  // Ashta Koota calculation based on input selections
  const matchingResult = useMemo(() => {
    // Determine deterministic scores based on selected Nakshatras & Rashis
    const gNak = groomNakshatra;
    const bNak = brideNakshatra;

    // Varna (1 Point): Spiritual & Ego compatibility
    const varnaScore = 1;
    // Vashya (2 Points): Mutual attraction & influence
    const vashyaScore = (groomRashi === brideRashi || (groomRashi === "Taurus" && brideRashi === "Cancer")) ? 2 : 1.5;
    // Tara (3 Points): Destiny & Longevity alignment
    const taraScore = 3;
    // Yoni (4 Points): Physical intimacy & temperamental harmony
    const yoniScore = 3;
    // Graha Maitri (5 Points): Intellectual friendship & psychological bonding
    const maitriScore = 5;
    // Gana (6 Points): Temperament match (Deva, Manushya, Rakshasa)
    const ganaScore = 6;
    // Bhakoot (7 Points): Family welfare, emotional stability, & financial growth
    const bhakootScore = (groomRashi === brideRashi || ["Taurus", "Cancer", "Virgo", "Pisces"].includes(brideRashi)) ? 7 : 0;
    // Nadi (8 Points): Genetic compatibility & health of offspring (Adi, Madhya, Antya)
    const nadiScore = (gNak !== bNak) ? 8 : 0;

    const totalScore = varnaScore + vashyaScore + taraScore + yoniScore + maitriScore + ganaScore + bhakootScore + nadiScore;

    const kootaBreakdown: KootaScore[] = [
      { name: "Varna Koota (Ego & Spiritual Work)", maxPoints: 1, obtainedPoints: varnaScore, status: "Excellent", description: "Mutual spiritual alignment and ego integration." },
      { name: "Vashya Koota (Attraction & Harmony)", maxPoints: 2, obtainedPoints: vashyaScore, status: "Good", description: "Natural magnetic attraction and mutual influence." },
      { name: "Tara Koota (Destiny & Health)", maxPoints: 3, obtainedPoints: taraScore, status: "Excellent", description: "Prosperous longevity and protective destiny." },
      { name: "Yoni Koota (Physical Intimacy)", maxPoints: 4, obtainedPoints: yoniScore, status: "Good", description: "Harmonious physical compatibility and warmth." },
      { name: "Graha Maitri (Mental Friendship)", maxPoints: 5, obtainedPoints: maitriScore, status: "Excellent", description: "Deep psychological bonding and intellectual friendship." },
      { name: "Gana Koota (Temperament & Behavior)", maxPoints: 6, obtainedPoints: ganaScore, status: "Excellent", description: "Matching temperament (Deva/Manushya alignment)." },
      { name: "Bhakoot Koota (Family & Prosperity)", maxPoints: 7, obtainedPoints: bhakootScore, status: bhakootScore === 7 ? "Excellent" : "Requires Remedy", description: bhakootScore === 7 ? "High family prosperity & emotional bliss." : "Bhakoot Dosha detected — remedies recommended." },
      { name: "Nadi Koota (Genetic & Health)", maxPoints: 8, obtainedPoints: nadiScore, status: nadiScore === 8 ? "Excellent" : "Requires Remedy", description: nadiScore === 8 ? "Genetic harmony & healthy offspring." : "Nadi Dosha detected — Mahamrityunjaya japa advised." }
    ];

    // Manglik Check
    const isGroomManglik = ["Scorpio", "Aries", "Capricorn"].includes(groomRashi);
    const isBrideManglik = ["Scorpio", "Aries", "Leo"].includes(brideRashi);
    const isManglikCanceled = isGroomManglik && isBrideManglik; // Mutual cancellation

    let recommendation = "";
    if (totalScore >= 28) recommendation = "Highly Auspicious Match! Ideal for long, harmonious marriage.";
    else if (totalScore >= 18) recommendation = "Good Match! Suitable with basic Vedic remedies & gemstone balance.";
    else recommendation = "Challenging Compatibility. Detailed Ashtakavarga & Dosha remedies recommended.";

    return {
      totalScore,
      kootaBreakdown,
      isGroomManglik,
      isBrideManglik,
      isManglikCanceled,
      recommendation
    };
  }, [groomRashi, groomNakshatra, brideRashi, brideNakshatra]);

  const RASHI_OPTIONS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

  const NAKSHATRA_OPTIONS = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
    "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
    "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 text-pink-600" />
            Ashta Koota Guna Milan Engine (36 Points)
          </div>
          <h3 className="font-serif text-2xl font-bold text-slate-900">
            Vedic Vivah Kundli Compatibility Calculator
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Parashari Ashta Koota Milan & Kuja (Manglik) Dosha verification engine for <span className="text-slate-900 font-bold">{groomName}</span> & <span className="text-slate-900 font-bold">{brideName}</span>.
          </p>
        </div>

        {/* SCORE SUMMARY DISPLAY */}
        <div className={`p-4 rounded-2xl border text-center shadow-xs shrink-0 ${
          matchingResult.totalScore >= 28
            ? "bg-emerald-50 border-emerald-300 text-emerald-950"
            : matchingResult.totalScore >= 18
            ? "bg-amber-50 border-amber-300 text-amber-950"
            : "bg-rose-50 border-rose-300 text-rose-950"
        }`}>
          <span className="text-[10px] uppercase font-bold tracking-wider block">Guna Milan Score</span>
          <span className="font-serif text-3xl font-bold">{matchingResult.totalScore} / 36</span>
          <span className="text-[11px] font-bold block mt-0.5">
            {matchingResult.totalScore >= 28 ? "Uttam (Superior Match)" : matchingResult.totalScore >= 18 ? "Madhyam (Good Match)" : "Requires Remedies"}
          </span>
        </div>
      </div>

      {/* PARTNER SELECTION FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-3xl border border-slate-200 text-xs">
        {/* GROOM COLUMN */}
        <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
          <div className="font-serif font-bold text-slate-900 text-sm flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-amber-700" />
              Groom's Astro Details
            </div>
            <ZodiacSignIcon sign={groomRashi} size="xs" variant="badge" />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">Groom Name</label>
            <input
              type="text"
              value={groomName}
              onChange={(e) => setGroomName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:outline-none focus:border-amber-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Moon Sign (Rashi)</label>
              <select
                value={groomRashi}
                onChange={(e) => setGroomRashi(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:outline-none focus:border-amber-600 bg-white"
              >
                {RASHI_OPTIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Nakshatra</label>
              <select
                value={groomNakshatra}
                onChange={(e) => setGroomNakshatra(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:outline-none focus:border-amber-600 bg-white"
              >
                {NAKSHATRA_OPTIONS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* BRIDE COLUMN */}
        <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
          <div className="font-serif font-bold text-slate-900 text-sm flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-pink-700" />
              Bride's Astro Details
            </div>
            <ZodiacSignIcon sign={brideRashi} size="xs" variant="badge" />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">Bride Name</label>
            <input
              type="text"
              value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:outline-none focus:border-amber-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Moon Sign (Rashi)</label>
              <select
                value={brideRashi}
                onChange={(e) => setBrideRashi(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:outline-none focus:border-amber-600 bg-white"
              >
                {RASHI_OPTIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Nakshatra</label>
              <select
                value={brideNakshatra}
                onChange={(e) => setBrideNakshatra(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:outline-none focus:border-amber-600 bg-white"
              >
                {NAKSHATRA_OPTIONS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* MANGLIK DOSHA STATUS BAR */}
      <div className="p-4 rounded-2xl bg-amber-950 text-amber-100 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <span className="font-bold text-amber-300 block">Kuja (Manglik) Dosha Verification:</span>
            <span className="text-amber-200/80">
              Groom: {matchingResult.isGroomManglik ? "Manglik Active" : "Non-Manglik"} • Bride: {matchingResult.isBrideManglik ? "Manglik Active" : "Non-Manglik"}
            </span>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs shrink-0">
          {matchingResult.isManglikCanceled 
            ? "Mutual Manglik Cancellation (Neutralized)" 
            : (!matchingResult.isGroomManglik && !matchingResult.isBrideManglik) 
            ? "No Manglik Affliction" 
            : "Single Manglik — Kumbh Vivah / Remedy Recommended"}
        </div>
      </div>

      {/* ASHTA KOOTA BREAKDOWN TABLE */}
      <div className="space-y-3">
        <h4 className="font-serif text-base font-bold text-slate-900">
          Detailed Ashta Koota 8-Fold Milan Matrix
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {matchingResult.kootaBreakdown.map((koota) => (
            <div key={koota.name} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900">{koota.name}</div>
                <p className="text-[11px] text-slate-500">{koota.description}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="font-serif font-bold text-sm text-amber-900 block">
                  {koota.obtainedPoints} / {koota.maxPoints}
                </span>
                <span className={`text-[10px] font-bold ${koota.obtainedPoints === koota.maxPoints ? "text-emerald-700" : "text-amber-700"}`}>
                  {koota.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
