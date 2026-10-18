import React, { useState } from "react";
import { 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Plus, 
  Scale, 
  Eye, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  X, 
  ChevronRight, 
  TrendingUp, 
  Layers, 
  Compass, 
  Trash2,
  RefreshCw
} from "lucide-react";
import { PartnerInput } from "../utils/compatibilityCalculator";

export interface MatchHistoryItem {
  id: string;
  date: string;
  partnerA: {
    name: string;
    dob: string;
    birthPlace: string;
    gender: "male" | "female";
    rashi: string;
    nakshatra: string;
    lagna: string;
  };
  partnerB: {
    name: string;
    dob: string;
    birthPlace: string;
    gender: "male" | "female";
    rashi: string;
    nakshatra: string;
    lagna: string;
  };
  ashtaKootaScore: number; // out of 36
  dashaKootaScore: number; // out of 38
  verdict: "Auspicious Match (Shubh Vivah)" | "Favorable Match" | "Moderate Compatibility" | "Caution Advised (Dosha Present)";
  verdictColor: "emerald" | "amber" | "rose" | "indigo";
  manglikStatus: string;
  nadiStatus: "Pass (8/8)" | "Nadi Dosha Present (0/8)" | "Neutralized";
  bhakootStatus: "Pass (7/7)" | "Bhakoot Dosha (0/7)";
  numerologyHarmony: string;
  chineseTrine: string;
  aiRecommendation: string;
  kootaBreakdown: {
    varna: number;   // max 1
    vashya: number;  // max 2
    tara: number;    // max 3
    yoni: number;    // max 4
    maitri: number;  // max 5
    gana: number;    // max 6
    bhakoot: number; // max 7
    nadi: number;    // max 8
  };
}

const INITIAL_MATCH_HISTORY: MatchHistoryItem[] = [
  {
    id: "match-001",
    date: "2026-07-28",
    partnerA: {
      name: "Aarav Sharma",
      dob: "1995-08-15",
      birthPlace: "New Delhi, India",
      gender: "male",
      rashi: "Taurus",
      nakshatra: "Rohini",
      lagna: "Aries"
    },
    partnerB: {
      name: "Priya Patel",
      dob: "1997-11-22",
      birthPlace: "Mumbai, India",
      gender: "female",
      rashi: "Cancer",
      nakshatra: "Pushya",
      lagna: "Cancer"
    },
    ashtaKootaScore: 31,
    dashaKootaScore: 34,
    verdict: "Auspicious Match (Shubh Vivah)",
    verdictColor: "emerald",
    manglikStatus: "Both Non-Manglik (Fully Compatible)",
    nadiStatus: "Pass (8/8)",
    bhakootStatus: "Pass (7/7)",
    numerologyHarmony: "Life Path 7 & 3 Divine Harmony (88%)",
    chineseTrine: "Pig & Rabbit Triple Harmony (San He)",
    aiRecommendation: "Exceptionally high Guna score (31/36). Both Nadi and Bhakoot are error-free. Highly recommended for long-term marital bliss.",
    kootaBreakdown: { varna: 1, vashya: 2, tara: 3, yoni: 3, maitri: 4, gana: 5, bhakoot: 7, nadi: 8 }
  },
  {
    id: "match-002",
    date: "2026-06-14",
    partnerA: {
      name: "Aarav Sharma",
      dob: "1995-08-15",
      birthPlace: "New Delhi, India",
      gender: "male",
      rashi: "Taurus",
      nakshatra: "Rohini",
      lagna: "Aries"
    },
    partnerB: {
      name: "Ananya Deshmukh",
      dob: "1996-03-10",
      birthPlace: "Pune, India",
      gender: "female",
      rashi: "Scorpio",
      nakshatra: "Anuradha",
      lagna: "Libra"
    },
    ashtaKootaScore: 24,
    dashaKootaScore: 26,
    verdict: "Favorable Match",
    verdictColor: "amber",
    manglikStatus: "Partner B Partial Manglik (Jupiter Aspect Neutralized)",
    nadiStatus: "Pass (8/8)",
    bhakootStatus: "Bhakoot Dosha (0/7)",
    numerologyHarmony: "Life Path 7 & 1 Executive Resonance (75%)",
    chineseTrine: "Pig & Rat Neutral Alliance",
    aiRecommendation: "Good Guna count (24/36). 2/7 Bhakoot points deducted due to 1/7 Rashi axis, but Jupiter's 5th aspect cancels negative effects.",
    kootaBreakdown: { varna: 1, vashya: 1.5, tara: 2, yoni: 3, maitri: 3, gana: 5.5, bhakoot: 0, nadi: 8 }
  },
  {
    id: "match-003",
    date: "2026-04-02",
    partnerA: {
      name: "Aarav Sharma",
      dob: "1995-08-15",
      birthPlace: "New Delhi, India",
      gender: "male",
      rashi: "Taurus",
      nakshatra: "Rohini",
      lagna: "Aries"
    },
    partnerB: {
      name: "Sneha Kapoor",
      dob: "1998-09-05",
      birthPlace: "Bengaluru, India",
      gender: "female",
      rashi: "Gemini",
      nakshatra: "Ardra",
      lagna: "Gemini"
    },
    ashtaKootaScore: 17,
    dashaKootaScore: 19,
    verdict: "Caution Advised (Dosha Present)",
    verdictColor: "rose",
    manglikStatus: "Partner A Non-Manglik / Partner B High 8th House Manglik",
    nadiStatus: "Nadi Dosha Present (0/8)",
    bhakootStatus: "Bhakoot Dosha (0/7)",
    numerologyHarmony: "Life Path 7 & 5 Dynamic Tension (58%)",
    chineseTrine: "Pig & Snake Opposition (Chong)",
    aiRecommendation: "Low Guna score (17/36) with both Nadi and Bhakoot Dosha present. Specific Mahamrityunjaya Puja and Kumbh Vivah remedies advised prior to engagement.",
    kootaBreakdown: { varna: 0.5, vashya: 1, tara: 1.5, yoni: 2, maitri: 3, gana: 3, bhakoot: 0, nadi: 0 }
  }
];

interface CompatibilityHistoryWidgetProps {
  onReanalyzeMatch: (partnerA: PartnerInput, partnerB: PartnerInput) => void;
}

export const CompatibilityHistoryWidget: React.FC<CompatibilityHistoryWidgetProps> = ({
  onReanalyzeMatch
}) => {
  const [history, setHistory] = useState<MatchHistoryItem[]>(INITIAL_MATCH_HISTORY);
  const [searchQuery, setSearchQuery] = useState("");
  const [scoreFilter, setScoreFilter] = useState<"all" | "high" | "moderate" | "caution">("all");
  const [selectedMatchIds, setSelectedMatchIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Match Form State
  const [newPartnerName, setNewPartnerName] = useState("");
  const [newPartnerDob, setNewPartnerDob] = useState("1998-05-20");
  const [newPartnerPlace, setNewPartnerPlace] = useState("Delhi, India");
  const [newPartnerGender, setNewPartnerGender] = useState<"male" | "female">("female");

  const filteredHistory = history.filter((item) => {
    const matchesQuery = 
      item.partnerB.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.partnerA.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.partnerB.rashi.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesQuery) return false;

    if (scoreFilter === "high") return item.ashtaKootaScore >= 28;
    if (scoreFilter === "moderate") return item.ashtaKootaScore >= 20 && item.ashtaKootaScore < 28;
    if (scoreFilter === "caution") return item.ashtaKootaScore < 20;
    return true;
  });

  const toggleSelectMatch = (id: string) => {
    if (selectedMatchIds.includes(id)) {
      setSelectedMatchIds(selectedMatchIds.filter((mId) => mId !== id));
    } else {
      if (selectedMatchIds.length >= 3) {
        alert("You can compare up to 3 matchmaking requests side-by-side.");
        return;
      }
      setSelectedMatchIds([...selectedMatchIds, id]);
    }
  };

  const handleAddNewMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartnerName.trim()) return;

    // Simulate calculated Guna match score for demonstration
    const generatedScore = Math.floor(Math.random() * 14) + 20; // 20 - 33
    const newRecord: MatchHistoryItem = {
      id: `match-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      partnerA: {
        name: "Aarav Sharma",
        dob: "1995-08-15",
        birthPlace: "New Delhi, India",
        gender: "male",
        rashi: "Taurus",
        nakshatra: "Rohini",
        lagna: "Aries"
      },
      partnerB: {
        name: newPartnerName.trim(),
        dob: newPartnerDob,
        birthPlace: newPartnerPlace,
        gender: newPartnerGender,
        rashi: ["Virgo", "Libra", "Pisces", "Capricorn", "Leo"][Math.floor(Math.random() * 5)],
        nakshatra: ["Hasta", "Chitra", "Revati", "Shravana", "Magha"][Math.floor(Math.random() * 5)],
        lagna: ["Scorpio", "Saggitarius", "Aquarius", "Gemini"][Math.floor(Math.random() * 4)]
      },
      ashtaKootaScore: generatedScore,
      dashaKootaScore: generatedScore + 3,
      verdict: generatedScore >= 28 ? "Auspicious Match (Shubh Vivah)" : generatedScore >= 22 ? "Favorable Match" : "Moderate Compatibility",
      verdictColor: generatedScore >= 28 ? "emerald" : generatedScore >= 22 ? "amber" : "indigo",
      manglikStatus: "Both Non-Manglik",
      nadiStatus: "Pass (8/8)",
      bhakootStatus: generatedScore >= 24 ? "Pass (7/7)" : "Bhakoot Dosha (0/7)",
      numerologyHarmony: `Life Path Alignment (${generatedScore * 2.8}%)`,
      chineseTrine: "Zodiac Harmony Cycle",
      aiRecommendation: `Newly archived match calculation for ${newPartnerName}. Guna score calculated at ${generatedScore}/36.`,
      kootaBreakdown: { varna: 1, vashya: 2, tara: 3, yoni: 3, maitri: 4, gana: 5, bhakoot: generatedScore >= 24 ? 7 : 0, nadi: 8 }
    };

    setHistory([newRecord, ...history]);
    setIsAddModalOpen(false);
    setNewPartnerName("");
  };

  const handleDeleteRecord = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to remove this match from your saved history?")) {
      setHistory(history.filter((h) => h.id !== id));
      setSelectedMatchIds(selectedMatchIds.filter((mId) => mId !== id));
    }
  };

  const selectedMatches = history.filter((h) => selectedMatchIds.includes(h.id));

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#1A1613] via-[#241E18] to-[#120F0D] text-amber-100 p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold uppercase tracking-wider mb-2">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              Past Matchmaking Archive & Comparison
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
              Compatibility Match History
            </h2>
            <p className="text-xs text-amber-200/70 mt-1 max-w-2xl leading-relaxed">
              Review, filter, and re-analyze your past horoscope matchmaking requests. Select multiple records to compare Guna Scores, Doshas, and planetary alignments side-by-side.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Archive New Match</span>
            </button>

            {selectedMatchIds.length >= 2 && (
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition-all shadow-md flex items-center gap-2 animate-bounce cursor-pointer"
              >
                <Scale className="w-4 h-4" />
                <span>Compare Side-by-Side ({selectedMatchIds.length})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search partner name or Rashi..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Score Filters */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar">
          {[
            { id: "all", label: "All Matches" },
            { id: "high", label: "Auspicious (28+ Pts)" },
            { id: "moderate", label: "Moderate (20-27 Pts)" },
            { id: "caution", label: "Caution (<20 Pts)" }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setScoreFilter(f.id as any)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
                scoreFilter === f.id
                  ? "bg-slate-900 text-amber-300 shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Comparison Helper Badge */}
        <div className="text-[11px] text-slate-500 font-medium whitespace-nowrap hidden lg:block">
          {selectedMatchIds.length === 0 ? (
            <span>Check boxes to compare 2+ profiles side-by-side</span>
          ) : (
            <span className="text-rose-700 font-bold">{selectedMatchIds.length} profiles selected for comparison</span>
          )}
        </div>
      </div>

      {/* HISTORY CARDS GRID */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-amber-900/10 text-center space-y-3">
          <Compass className="w-10 h-10 text-slate-300 mx-auto animate-spin" />
          <h4 className="font-serif text-lg font-bold text-slate-700">No matching requests found</h4>
          <p className="text-xs text-slate-500">Try adjusting your search query or filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((item) => {
            const isSelected = selectedMatchIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl p-6 border transition-all duration-200 shadow-xs hover:shadow-md space-y-4 relative flex flex-col justify-between ${
                  isSelected ? "border-rose-500 ring-2 ring-rose-200 bg-rose-50/10" : "border-amber-900/10"
                }`}
              >
                {/* Top Action Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectMatch(item.id)}
                      className="w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500 cursor-pointer"
                    />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleDeleteRecord(item.id, e)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors rounded-lg"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Main Match Pair Badge */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="text-center flex-1">
                      <div className="font-serif font-bold text-slate-900 text-sm truncate">{item.partnerA.name}</div>
                      <span className="text-[10px] text-amber-800 font-semibold">{item.partnerA.rashi}</span>
                    </div>

                    <div className="px-2 text-rose-500 font-serif font-bold text-xs">♥</div>

                    <div className="text-center flex-1">
                      <div className="font-serif font-bold text-slate-900 text-sm truncate">{item.partnerB.name}</div>
                      <span className="text-[10px] text-amber-800 font-semibold">{item.partnerB.rashi}</span>
                    </div>
                  </div>

                  {/* Guna Score Radial / Pill Display */}
                  <div className="flex items-center justify-between bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/60">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Ashta Koota Score</span>
                      <div className="font-serif text-2xl font-bold text-slate-900">
                        {item.ashtaKootaScore} <span className="text-xs text-slate-500 font-normal">/ 36 Pts</span>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.verdictColor === "emerald"
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : item.verdictColor === "amber"
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : "bg-rose-100 text-rose-900 border border-rose-300"
                      }`}>
                        {item.verdict}
                      </span>
                      <div className="text-[10px] text-slate-500">Dashakoota: {item.dashaKootaScore}/38</div>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 space-y-0.5">
                      <span className="text-[9px] text-slate-400 uppercase font-bold block">Nadi Match</span>
                      <strong className={`block ${item.nadiStatus.includes("Pass") ? "text-emerald-700" : "text-rose-700"}`}>
                        {item.nadiStatus}
                      </strong>
                    </div>

                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 space-y-0.5">
                      <span className="text-[9px] text-slate-400 uppercase font-bold block">Bhakoot Match</span>
                      <strong className={`block ${item.bhakootStatus.includes("Pass") ? "text-emerald-700" : "text-amber-700"}`}>
                        {item.bhakootStatus}
                      </strong>
                    </div>
                  </div>

                  {/* AI Snippet */}
                  <p className="text-[11px] text-slate-600 leading-snug line-clamp-2 italic bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                    "{item.aiRecommendation}"
                  </p>
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => toggleSelectMatch(item.id)}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all ${
                      isSelected ? "bg-rose-100 text-rose-900 font-bold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {isSelected ? "Selected for Compare ✓" : "+ Add to Compare"}
                  </button>

                  <button
                    onClick={() => onReanalyzeMatch(
                      { name: item.partnerA.name, dob: item.partnerA.dob, birthPlace: item.partnerA.birthPlace, gender: item.partnerA.gender },
                      { name: item.partnerB.name, dob: item.partnerB.dob, birthPlace: item.partnerB.birthPlace, gender: item.partnerB.gender }
                    )}
                    className="px-3.5 py-1.5 bg-slate-900 text-amber-300 text-[11px] font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-1"
                  >
                    <span>Re-Analyze</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SIDE-BY-SIDE COMPARISON MODAL */}
      {isCompareModalOpen && selectedMatches.length >= 2 && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white max-w-5xl w-full rounded-3xl border border-amber-900/20 shadow-2xl overflow-hidden space-y-6 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-amber-100 p-6 flex items-center justify-between border-b border-amber-500/30">
              <div className="flex items-center gap-3">
                <Scale className="w-6 h-6 text-amber-400" />
                <div>
                  <h3 className="font-serif text-xl font-bold text-amber-100">
                    Side-by-Side Matchmaking Comparison Matrix
                  </h3>
                  <p className="text-xs text-amber-200/70">
                    Comparing {selectedMatches.length} horoscope pairings against 36 Ashta Koota & 10 Dashakoota rules.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-2 rounded-full text-amber-400/70 hover:text-amber-200 hover:bg-amber-900/40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs font-medium">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-900 text-amber-300 text-xs">
                      <th className="p-4 rounded-tl-2xl font-serif">Comparison Metric</th>
                      {selectedMatches.map((m) => (
                        <th key={m.id} className="p-4 font-serif text-center border-l border-slate-800">
                          <div className="text-amber-200 font-bold text-sm">{m.partnerB.name}</div>
                          <div className="text-[10px] text-slate-400 font-sans">vs {m.partnerA.name} ({m.date})</div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    {/* OVERALL GUNA SCORE */}
                    <tr className="bg-amber-50/50">
                      <td className="p-4 font-bold text-slate-900 font-serif text-sm">Ashta Koota 36 Guna Score</td>
                      {selectedMatches.map((m) => (
                        <td key={m.id} className="p-4 text-center border-l border-slate-200">
                          <div className="font-serif text-2xl font-bold text-amber-950">
                            {m.ashtaKootaScore} <span className="text-xs text-slate-500 font-normal">/ 36</span>
                          </div>
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mt-1 ${
                            m.ashtaKootaScore >= 28 ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"
                          }`}>
                            {((m.ashtaKootaScore / 36) * 100).toFixed(0)}% Compatibility
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* VERDICT */}
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Astrological Verdict</td>
                      {selectedMatches.map((m) => (
                        <td key={m.id} className="p-4 text-center border-l border-slate-200 font-bold text-slate-900">
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            m.verdictColor === "emerald" ? "bg-emerald-100 text-emerald-900" : m.verdictColor === "amber" ? "bg-amber-100 text-amber-900" : "bg-rose-100 text-rose-900"
                          }`}>
                            {m.verdict}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* MANGLIK DOSHA */}
                    <tr className="bg-slate-50/50">
                      <td className="p-4 font-bold text-slate-900">Manglik Dosha Status</td>
                      {selectedMatches.map((m) => (
                        <td key={m.id} className="p-4 text-center border-l border-slate-200 text-slate-700">
                          {m.manglikStatus}
                        </td>
                      ))}
                    </tr>

                    {/* NADI KOOTA */}
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Nadi Koota (8 Points - Health & Bloodline)</td>
                      {selectedMatches.map((m) => (
                        <td key={m.id} className="p-4 text-center border-l border-slate-200 font-bold">
                          <span className={m.kootaBreakdown.nadi === 8 ? "text-emerald-700" : "text-rose-700"}>
                            {m.kootaBreakdown.nadi} / 8 Pts ({m.nadiStatus})
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* BHAKOOT KOOTA */}
                    <tr className="bg-slate-50/50">
                      <td className="p-4 font-bold text-slate-900">Bhakoot Koota (7 Points - Wealth & Family)</td>
                      {selectedMatches.map((m) => (
                        <td key={m.id} className="p-4 text-center border-l border-slate-200 font-bold">
                          <span className={m.kootaBreakdown.bhakoot === 7 ? "text-emerald-700" : "text-amber-700"}>
                            {m.kootaBreakdown.bhakoot} / 7 Pts ({m.bhakootStatus})
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* GANA KOOTA */}
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Gana Koota (6 Points - Temperament)</td>
                      {selectedMatches.map((m) => (
                        <td key={m.id} className="p-4 text-center border-l border-slate-200">
                          {m.kootaBreakdown.gana} / 6 Pts
                        </td>
                      ))}
                    </tr>

                    {/* MAITRI KOOTA */}
                    <tr className="bg-slate-50/50">
                      <td className="p-4 font-bold text-slate-900">Graha Maitri (5 Points - Friendship)</td>
                      {selectedMatches.map((m) => (
                        <td key={m.id} className="p-4 text-center border-l border-slate-200">
                          {m.kootaBreakdown.maitri} / 5 Pts
                        </td>
                      ))}
                    </tr>

                    {/* NUMEROLOGY */}
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Numerology Life Path Resonance</td>
                      {selectedMatches.map((m) => (
                        <td key={m.id} className="p-4 text-center border-l border-slate-200 text-slate-700">
                          {m.numerologyHarmony}
                        </td>
                      ))}
                    </tr>

                    {/* CHINESE ZODIAC */}
                    <tr className="bg-slate-50/50">
                      <td className="p-4 font-bold text-slate-900">Chinese Trine & Elemental Alignment</td>
                      {selectedMatches.map((m) => (
                        <td key={m.id} className="p-4 text-center border-l border-slate-200 text-slate-700">
                          {m.chineseTrine}
                        </td>
                      ))}
                    </tr>

                    {/* ACTIONS ROW */}
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Re-Analyze Full Match</td>
                      {selectedMatches.map((m) => (
                        <td key={m.id} className="p-4 text-center border-l border-slate-200">
                          <button
                            onClick={() => {
                              setIsCompareModalOpen(false);
                              onReanalyzeMatch(
                                { name: m.partnerA.name, dob: m.partnerA.dob, birthPlace: m.partnerA.birthPlace, gender: m.partnerA.gender },
                                { name: m.partnerB.name, dob: m.partnerB.dob, birthPlace: m.partnerB.birthPlace, gender: m.partnerB.gender }
                              );
                            }}
                            className="px-4 py-2 bg-slate-900 text-amber-300 font-bold rounded-xl text-xs hover:bg-slate-800 transition-all inline-flex items-center gap-1.5"
                          >
                            <span>Open Full Analysis</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ARCHIVE NEW MATCH MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-md w-full rounded-3xl border border-amber-900/20 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600" />
                Archive Matchmaking Request
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddNewMatch} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Partner B Full Name</label>
                <input
                  type="text"
                  required
                  value={newPartnerName}
                  onChange={(e) => setNewPartnerName(e.target.value)}
                  placeholder="e.g. Radhika Sen"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 font-semibold focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={newPartnerDob}
                    onChange={(e) => setNewPartnerDob(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gender</label>
                  <select
                    value={newPartnerGender}
                    onChange={(e) => setNewPartnerGender(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Birth Place</label>
                <input
                  type="text"
                  value={newPartnerPlace}
                  onChange={(e) => setNewPartnerPlace(e.target.value)}
                  placeholder="City, Country"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 font-semibold"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 text-amber-300 font-bold hover:bg-slate-800"
                >
                  Calculate & Archive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
