import React, { useState } from "react";
import { motion } from "motion/react";
import { UserProfile } from "../types";
import { 
  GLOBAL_CITIES, 
  CityLocation, 
  getAccurateLocationPanchang, 
  calculateExactPlanetaryPositions,
  calculateTarabalamAndChandrabalam
} from "../utils/vedicAstronomicalEngine";
import { 
  Calendar, 
  ArrowLeftRight, 
  Sparkles, 
  Sun, 
  CheckCircle2, 
  AlertTriangle, 
  Car, 
  Home, 
  Heart, 
  Briefcase, 
  Gem, 
  Baby, 
  Trophy,
  Scale,
  Zap,
  Globe,
  ShieldCheck
} from "lucide-react";

interface DualDatePanchangComparisonWidgetProps {
  userProfile?: UserProfile;
  selectedCity?: CityLocation;
  initialDateA?: string;
  initialDateB?: string;
  onSelectDateA?: (dateStr: string) => void;
  onSelectDateB?: (dateStr: string) => void;
}

export function calculateDatePositivityIndex(dateStr: string, city: CityLocation, userProfile?: UserProfile) {
  const panchang = getAccurateLocationPanchang(dateStr, city);
  const planetary = calculateExactPlanetaryPositions(dateStr, "12:00", city.name);
  
  const userNak = userProfile?.nakshatra || "Rohini";
  const userRashi = userProfile?.rashi || "Taurus";
  const tarabalam = calculateTarabalamAndChandrabalam(userNak, userRashi, panchang.nakshatra, panchang.moonSign);
  
  let score = 52;
  
  // Tarabalam contribution (+-22)
  if (tarabalam.taraQuality === "Auspicious") score += 20;
  else if (tarabalam.taraQuality === "Inauspicious") score -= 16;
  else score += 5;
  
  // Chandrabalam contribution (+-15)
  if (tarabalam.chandrabalamQuality.includes("Auspicious")) score += 15;
  else if (tarabalam.chandrabalamQuality.includes("Inauspicious")) score -= 12;
  
  // Tithi Auspiciousness (+-12)
  const tithiLower = panchang.tithi.toLowerCase();
  const isRikta = tithiLower.includes("4th") || tithiLower.includes("9th") || tithiLower.includes("14th");
  const isAmavasya = tithiLower.includes("amavasya");
  if (!isRikta && !isAmavasya) score += 12;
  else score -= 10;
  
  // Gowri Panchangam (+-12)
  const goodGowriCount = panchang.gowriDay.filter(g => g.type === "Good").length;
  score += Math.round(goodGowriCount * 2);
  
  // Day of week & Yoga (+-10)
  if (["Monday", "Wednesday", "Thursday", "Friday"].includes(panchang.dayOfWeek)) score += 6;
  if (["Ayushman", "Saubhagya", "Shobhana", "Sukarma", "Harshana", "Siddhi", "Shubha", "Shukla", "Brahma"].some(y => panchang.yoga.includes(y))) {
    score += 6;
  }
  
  const finalScore = Math.min(98, Math.max(20, Math.round(score)));
  
  return {
    score: finalScore,
    panchang,
    planetary,
    tarabalam
  };
}

export const DualDatePanchangComparisonWidget: React.FC<DualDatePanchangComparisonWidgetProps> = ({
  userProfile,
  selectedCity = GLOBAL_CITIES[0],
  initialDateA,
  initialDateB,
  onSelectDateA,
  onSelectDateB
}) => {
  const todayISO = new Date().toISOString().split("T")[0];
  
  // Default Date A = today or initialDateA, Date B = today + 7 days or initialDateB
  const defaultDateA = initialDateA || todayISO;
  const defaultDateB = initialDateB || (() => {
    const d = new Date(defaultDateA);
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  })();

  const [dateA, setDateA] = useState<string>(defaultDateA);
  const [dateB, setDateB] = useState<string>(defaultDateB);
  const [activeTabSection, setActiveTabSection] = useState<"overview" | "panchang" | "planetary" | "events">("overview");

  const activeCity = selectedCity;

  const handleUpdateDateA = (newStr: string) => {
    setDateA(newStr);
    if (onSelectDateA) onSelectDateA(newStr);
  };

  const handleUpdateDateB = (newStr: string) => {
    setDateB(newStr);
    if (onSelectDateB) onSelectDateB(newStr);
  };

  const handleSwapDates = () => {
    const temp = dateA;
    setDateA(dateB);
    setDateB(temp);
    if (onSelectDateA) onSelectDateA(dateB);
    if (onSelectDateB) onSelectDateB(temp);
  };

  const handleSetOffsetDateB = (days: number) => {
    const base = new Date(dateA);
    base.setDate(base.getDate() + days);
    const newB = base.toISOString().split("T")[0];
    handleUpdateDateB(newB);
  };

  // Perform Calculations for Date A & Date B
  const dataA = calculateDatePositivityIndex(dateA, activeCity, userProfile);
  const dataB = calculateDatePositivityIndex(dateB, activeCity, userProfile);

  const diffScore = dataA.score - dataB.score;
  const isAWin = diffScore > 0;
  const isBWin = diffScore < 0;

  // Life event categories comparison breakdown
  const LIFE_EVENTS = [
    {
      id: "vehicle",
      label: "Vehicle Purchase (वाहन खरीद)",
      icon: <Car className="w-4 h-4 text-amber-400" />,
      scoreA: dataA.tarabalam.overallScore >= 80 ? 94 : 70,
      scoreB: dataB.tarabalam.overallScore >= 80 ? 92 : 68,
    },
    {
      id: "property",
      label: "Housewarming / Land (गृह प्रवेश)",
      icon: <Home className="w-4 h-4 text-emerald-400" />,
      scoreA: dataA.tarabalam.overallScore >= 85 ? 96 : 65,
      scoreB: dataB.tarabalam.overallScore >= 85 ? 95 : 62,
    },
    {
      id: "marriage",
      label: "Marriage & Engagement (विवाह/सगाई)",
      icon: <Heart className="w-4 h-4 text-rose-400" />,
      scoreA: dataA.tarabalam.overallScore >= 80 ? 91 : 72,
      scoreB: dataB.tarabalam.overallScore >= 80 ? 89 : 74,
    },
    {
      id: "business",
      label: "Business & Investments (व्यापार)",
      icon: <Briefcase className="w-4 h-4 text-blue-400" />,
      scoreA: dataA.score >= 75 ? 92 : 68,
      scoreB: dataB.score >= 75 ? 90 : 66,
    },
    {
      id: "gold",
      label: "Gold & Financial Deals (सोना खरीद)",
      icon: <Gem className="w-4 h-4 text-amber-300" />,
      scoreA: Math.min(98, dataA.score + 5),
      scoreB: Math.min(98, dataB.score + 5),
    },
    {
      id: "samskara",
      label: "Namkaran & Mundan (संस्कार मुहूर्त)",
      icon: <Baby className="w-4 h-4 text-purple-400" />,
      scoreA: dataA.tarabalam.taraQuality === "Auspicious" ? 90 : 65,
      scoreB: dataB.tarabalam.taraQuality === "Auspicious" ? 88 : 63,
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#1A1512] via-[#241D17] to-[#15110E] text-amber-100 rounded-3xl p-5 sm:p-7 border border-amber-500/30 shadow-2xl space-y-7 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP TITLE BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-widest mb-1.5">
            <Scale className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Dual-Date Vedic Panchang & Positivity Comparison
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 flex items-center gap-2">
            <span>Side-by-Side Panchang & Planetary Impact</span>
          </h2>
          <p className="text-xs text-amber-200/70 mt-1 font-serif">
            Compare any two dates side-by-side to analyze their Positivity Index, Tarabalam compatibility, planetary transits, and auspicious मुहूर्त windows.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-xs text-amber-300 font-mono flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{activeCity.name} ({activeCity.country})</span>
          </div>
        </div>
      </div>

      {/* DATE SELECTORS & PRESET CONTROLS */}
      <div className="bg-[#120F0C] p-4 sm:p-5 rounded-2xl border border-amber-500/30 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* DATE A INPUT */}
          <div className="md:col-span-5 bg-gradient-to-r from-amber-950/70 to-[#1A1512] p-3.5 rounded-2xl border border-amber-500/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Date A (Primary Date)
              </span>
              <span className="text-[10px] text-amber-300/70 font-mono">
                {dataA.panchang.dayOfWeek}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dateA}
                onChange={(e) => e.target.value && handleUpdateDateA(e.target.value)}
                className="w-full bg-slate-950/90 border border-amber-500/40 rounded-xl px-3 py-2 text-sm text-amber-100 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* SWAP BUTTON */}
          <div className="md:col-span-2 flex justify-center">
            <button
              onClick={handleSwapDates}
              className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer shadow-lg group"
              title="Swap Date A & Date B"
            >
              <ArrowLeftRight className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>

          {/* DATE B INPUT */}
          <div className="md:col-span-5 bg-gradient-to-r from-[#1A1512] to-cyan-950/40 p-3.5 rounded-2xl border border-cyan-500/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Date B (Comparison Date)
              </span>
              <span className="text-[10px] text-cyan-300/70 font-mono">
                {dataB.panchang.dayOfWeek}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dateB}
                onChange={(e) => e.target.value && handleUpdateDateB(e.target.value)}
                className="w-full bg-slate-950/90 border border-cyan-500/40 rounded-xl px-3 py-2 text-sm text-cyan-100 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* QUICK PRESETS FOR DATE B */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-amber-900/40 text-xs">
          <span className="text-amber-300/70 font-medium mr-1 text-[11px]">Quick Date B Offsets:</span>
          <button
            onClick={() => handleSetOffsetDateB(1)}
            className="px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-500/30 text-amber-200 hover:bg-amber-900 transition-all cursor-pointer text-[11px]"
          >
            +1 Day (Tomorrow)
          </button>
          <button
            onClick={() => handleSetOffsetDateB(7)}
            className="px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-500/30 text-amber-200 hover:bg-amber-900 transition-all cursor-pointer text-[11px]"
          >
            +7 Days (Next Week)
          </button>
          <button
            onClick={() => handleSetOffsetDateB(14)}
            className="px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-500/30 text-amber-200 hover:bg-amber-900 transition-all cursor-pointer text-[11px]"
          >
            +14 Days
          </button>
          <button
            onClick={() => handleSetOffsetDateB(30)}
            className="px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-500/30 text-amber-200 hover:bg-amber-900 transition-all cursor-pointer text-[11px]"
          >
            +30 Days (Next Month)
          </button>
        </div>
      </div>

      {/* POSITIVITY INDEX OVERALL SCORE COMPARISON BANNER */}
      <div className="bg-gradient-to-r from-[#14100D] via-[#1F1813] to-[#14100D] p-5 sm:p-6 rounded-3xl border border-amber-500/40 space-y-5 shadow-2xl relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />
            <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-100">
              Positivity Index Comparison Verdict
            </h3>
          </div>
          <div className="text-xs font-mono text-amber-300/80 bg-slate-900/80 px-3 py-1 rounded-full border border-amber-500/20">
            Algorithmic Vedic Score
          </div>
        </div>

        {/* SCORE GAUGES CARDS SIDE BY SIDE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* DATE A SCORE CARD */}
          <div className={`p-4 rounded-2xl border transition-all ${
            isAWin
              ? "bg-gradient-to-br from-amber-950/80 to-[#1A140E] border-amber-400 shadow-lg shadow-amber-500/10 ring-2 ring-amber-400/40"
              : "bg-slate-950/80 border-amber-900/40 opacity-90"
          }`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                  <span>DATE A</span>
                  {isAWin && <span className="bg-amber-500 text-slate-950 text-[9px] px-1.5 py-0.2 rounded font-extrabold ml-1">WINNER</span>}
                </div>
                <div className="text-base font-serif font-bold text-amber-100 mt-0.5">
                  {dataA.panchang.formattedDate}
                </div>
                <div className="text-xs text-amber-200/70 font-mono mt-0.5">
                  {dataA.panchang.tithi.split("(")[0]} • {dataA.panchang.nakshatra}
                </div>
              </div>

              {/* Score Display */}
              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-400 flex items-baseline justify-end">
                  <span>{dataA.score}</span>
                  <span className="text-xs text-amber-300/60 font-sans ml-0.5">%</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300/90 mt-0.5">
                  Positivity Index
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden mt-3 border border-amber-500/20">
              <div 
                className="bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 h-full rounded-full transition-all duration-500" 
                style={{ width: `${dataA.score}%` }} 
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-amber-200/80 mt-2">
              <span>Tarabalam: <strong className="text-amber-300">{dataA.tarabalam.taraName}</strong></span>
              <span>Chandrabalam: <strong className="text-amber-300">{dataA.tarabalam.chandrabalamQuality.split(" ")[0]}</strong></span>
            </div>
          </div>

          {/* DATE B SCORE CARD */}
          <div className={`p-4 rounded-2xl border transition-all ${
            isBWin
              ? "bg-gradient-to-br from-cyan-950/80 to-[#0E171A] border-cyan-400 shadow-lg shadow-cyan-500/10 ring-2 ring-cyan-400/40"
              : "bg-slate-950/80 border-cyan-900/40 opacity-90"
          }`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1">
                  <span>DATE B</span>
                  {isBWin && <span className="bg-cyan-400 text-slate-950 text-[9px] px-1.5 py-0.2 rounded font-extrabold ml-1">WINNER</span>}
                </div>
                <div className="text-base font-serif font-bold text-cyan-100 mt-0.5">
                  {dataB.panchang.formattedDate}
                </div>
                <div className="text-xs text-cyan-200/70 font-mono mt-0.5">
                  {dataB.panchang.tithi.split("(")[0]} • {dataB.panchang.nakshatra}
                </div>
              </div>

              {/* Score Display */}
              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-400 flex items-baseline justify-end">
                  <span>{dataB.score}</span>
                  <span className="text-xs text-cyan-300/60 font-sans ml-0.5">%</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-300/90 mt-0.5">
                  Positivity Index
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden mt-3 border border-cyan-500/20">
              <div 
                className="bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-300 h-full rounded-full transition-all duration-500" 
                style={{ width: `${dataB.score}%` }} 
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-cyan-200/80 mt-2">
              <span>Tarabalam: <strong className="text-cyan-300">{dataB.tarabalam.taraName}</strong></span>
              <span>Chandrabalam: <strong className="text-cyan-300">{dataB.tarabalam.chandrabalamQuality.split(" ")[0]}</strong></span>
            </div>
          </div>
        </div>

        {/* COMPARISON VERDICT HIGHLIGHT BOX */}
        <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed flex items-start gap-3 ${
          isAWin 
            ? "bg-amber-950/40 border-amber-500/40 text-amber-200"
            : isBWin
            ? "bg-cyan-950/40 border-cyan-500/40 text-cyan-200"
            : "bg-slate-950/80 border-slate-700 text-slate-200"
        }`}>
          <Sparkles className={`w-5 h-5 shrink-0 mt-0.5 ${isAWin ? "text-amber-400" : isBWin ? "text-cyan-400" : "text-slate-400"}`} />
          <div>
            <strong className="font-bold text-amber-100 block mb-0.5">
              {isAWin 
                ? `🏆 Recommendation: Date A (${dateA}) is +${diffScore}% More Auspicious than Date B`
                : isBWin
                ? `🏆 Recommendation: Date B (${dateB}) is +${Math.abs(diffScore)}% More Auspicious than Date A`
                : "⚖️ Recommendation: Both dates have an equal overall Positivity Index score"}
            </strong>
            <p className="text-xs opacity-90 font-serif">
              {isAWin ? (
                <>
                  Date A possesses a stronger <strong>{dataA.tarabalam.taraName} ({dataA.tarabalam.taraQuality})</strong> for {userProfile?.rashi || "Taurus"} natives with favorable {dataA.panchang.tithi.split("(")[0]} and optimal Gowri Panchangam windows.
                </>
              ) : isBWin ? (
                <>
                  Date B has a higher planetary alignment with <strong>{dataB.tarabalam.taraName} ({dataB.tarabalam.taraQuality})</strong>, making it superior for important financial, family, and travel events.
                </>
              ) : (
                <>
                  Both dates offer similar planetary strength. Review the detailed timing windows below to pick based on your specific life event.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* DETAILED SIDE-BY-SIDE PANCHANG & PLANETARY COMPARISON GRID */}
      <div className="space-y-4">
        {/* SECTION NAV TABS */}
        <div className="flex flex-wrap items-center gap-2 border-b border-amber-500/20 pb-3">
          <button
            onClick={() => setActiveTabSection("overview")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTabSection === "overview"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "bg-slate-950/60 text-amber-200/80 hover:text-amber-100"
            }`}
          >
            5 Panchang Elements
          </button>
          <button
            onClick={() => setActiveTabSection("planetary")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTabSection === "planetary"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "bg-slate-950/60 text-amber-200/80 hover:text-amber-100"
            }`}
          >
            Planetary Transits & Impact
          </button>
          <button
            onClick={() => setActiveTabSection("events")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTabSection === "events"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "bg-slate-950/60 text-amber-200/80 hover:text-amber-100"
            }`}
          >
            Life Event Suitability
          </button>
        </div>

        {/* 1. PANCHANG 5 ELEMENTS SIDE BY SIDE */}
        {activeTabSection === "overview" && (
          <div className="bg-[#120F0D] rounded-2xl border border-amber-500/30 overflow-hidden shadow-xl">
            {/* Header Column Titles */}
            <div className="grid grid-cols-12 bg-slate-950/90 border-b border-amber-500/30 p-3.5 text-xs font-bold">
              <div className="col-span-4 text-amber-300 font-serif">Panchang Element</div>
              <div className="col-span-4 text-amber-400 font-mono text-center border-x border-slate-800">Date A ({dateA})</div>
              <div className="col-span-4 text-cyan-400 font-mono text-center">Date B ({dateB})</div>
            </div>

            <div className="divide-y divide-amber-900/30 text-xs">
              {/* TITHI */}
              <div className="grid grid-cols-12 p-3.5 items-center hover:bg-slate-900/50">
                <div className="col-span-4 font-bold text-amber-200 flex items-center gap-2">
                  <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>1. Tithi (तिथि)</span>
                </div>
                <div className="col-span-4 text-amber-100 font-serif font-medium text-center border-x border-slate-800/80 px-2">
                  <div>{dataA.panchang.tithi}</div>
                  <div className="text-[10px] text-amber-300/60 mt-0.5">{dataA.panchang.tithiTimingStr}</div>
                </div>
                <div className="col-span-4 text-cyan-100 font-serif font-medium text-center px-2">
                  <div>{dataB.panchang.tithi}</div>
                  <div className="text-[10px] text-cyan-300/60 mt-0.5">{dataB.panchang.tithiTimingStr}</div>
                </div>
              </div>

              {/* NAKSHATRA */}
              <div className="grid grid-cols-12 p-3.5 items-center hover:bg-slate-900/50">
                <div className="col-span-4 font-bold text-amber-200 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>2. Nakshatra (नक्षत्र)</span>
                </div>
                <div className="col-span-4 text-amber-100 font-serif font-medium text-center border-x border-slate-800/80 px-2">
                  <div className="font-bold text-amber-300">{dataA.panchang.nakshatra}</div>
                  <div className="text-[10px] text-amber-200/70">Lord: {dataA.panchang.nakshatraRuler}</div>
                </div>
                <div className="col-span-4 text-cyan-100 font-serif font-medium text-center px-2">
                  <div className="font-bold text-cyan-300">{dataB.panchang.nakshatra}</div>
                  <div className="text-[10px] text-cyan-200/70">Lord: {dataB.panchang.nakshatraRuler}</div>
                </div>
              </div>

              {/* YOGA & KARANA */}
              <div className="grid grid-cols-12 p-3.5 items-center hover:bg-slate-900/50">
                <div className="col-span-4 font-bold text-amber-200 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>3. Yoga & Karana</span>
                </div>
                <div className="col-span-4 text-amber-100 font-serif font-medium text-center border-x border-slate-800/80 px-2">
                  <div>Yoga: <strong>{dataA.panchang.yoga}</strong></div>
                  <div className="text-[10px] text-amber-300/70">Karana: {dataA.panchang.karana}</div>
                </div>
                <div className="col-span-4 text-cyan-100 font-serif font-medium text-center px-2">
                  <div>Yoga: <strong>{dataB.panchang.yoga}</strong></div>
                  <div className="text-[10px] text-cyan-300/70">Karana: {dataB.panchang.karana}</div>
                </div>
              </div>

              {/* TARABALAM PERSONAL COMPATIBILITY */}
              <div className="grid grid-cols-12 p-3.5 items-center bg-amber-950/20">
                <div className="col-span-4 font-bold text-amber-300 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>4. Tarabalam (ताराबल)</span>
                </div>
                <div className="col-span-4 text-center border-x border-slate-800/80 px-2">
                  <span className={`inline-block font-bold px-2 py-0.5 rounded text-[11px] ${
                    dataA.tarabalam.taraQuality === "Auspicious" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-amber-500/20 text-amber-300"
                  }`}>
                    {dataA.tarabalam.taraName}
                  </span>
                  <div className="text-[10px] text-amber-200/70 mt-1 line-clamp-1">{dataA.tarabalam.taraDescription}</div>
                </div>
                <div className="col-span-4 text-center px-2">
                  <span className={`inline-block font-bold px-2 py-0.5 rounded text-[11px] ${
                    dataB.tarabalam.taraQuality === "Auspicious" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-amber-500/20 text-amber-300"
                  }`}>
                    {dataB.tarabalam.taraName}
                  </span>
                  <div className="text-[10px] text-cyan-200/70 mt-1 line-clamp-1">{dataB.tarabalam.taraDescription}</div>
                </div>
              </div>

              {/* ABHIJIT MUHURAT */}
              <div className="grid grid-cols-12 p-3.5 items-center hover:bg-slate-900/50">
                <div className="col-span-4 font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>5. Abhijit Muhurat</span>
                </div>
                <div className="col-span-4 text-emerald-300 font-mono text-center border-x border-slate-800/80 px-2 font-bold">
                  {dataA.panchang.abhijitStartStr} - {dataA.panchang.abhijitEndStr}
                </div>
                <div className="col-span-4 text-cyan-300 font-mono text-center px-2 font-bold">
                  {dataB.panchang.abhijitStartStr} - {dataB.panchang.abhijitEndStr}
                </div>
              </div>

              {/* RAHU KAAL (INAUSPICIOUS) */}
              <div className="grid grid-cols-12 p-3.5 items-center hover:bg-slate-900/50 bg-rose-950/20">
                <div className="col-span-4 font-bold text-rose-400 flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Rahu Kaal (Avoid)</span>
                </div>
                <div className="col-span-4 text-rose-300 font-mono text-center border-x border-slate-800/80 px-2 font-bold">
                  {dataA.panchang.rahuStartStr} - {dataA.panchang.rahuEndStr}
                </div>
                <div className="col-span-4 text-rose-300 font-mono text-center px-2 font-bold">
                  {dataB.panchang.rahuStartStr} - {dataB.panchang.rahuEndStr}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. PLANETARY TRANSITS & IMPACTS SIDE BY SIDE */}
        {activeTabSection === "planetary" && (
          <div className="bg-[#120F0D] rounded-2xl border border-amber-500/30 p-4 space-y-4 shadow-xl">
            <div className="flex items-center justify-between text-xs border-b border-amber-900/40 pb-2">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-amber-400" />
                Planetary Transit Positions Comparison
              </span>
              <span className="text-[10px] text-amber-200/60 font-mono">Lahiri Sidereal Ayanamsha</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* DATE A PLANET POSITIONS */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-500/30 space-y-3">
                <div className="text-xs font-bold text-amber-400 border-b border-amber-900/40 pb-1.5 flex items-center justify-between">
                  <span>DATE A ({dateA})</span>
                  <span>Moon: {dataA.panchang.moonSign}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  {dataA.planetary.planets.map(p => (
                    <div key={p.name} className="bg-[#171310] p-2 rounded-lg border border-amber-900/20">
                      <div className="font-bold text-amber-300 text-[10px]">{p.name}</div>
                      <div className="text-white font-serif font-semibold">{p.sign}</div>
                      <div className="text-[9px] text-slate-400 font-mono">{p.degInSign.toFixed(1)}°</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DATE B PLANET POSITIONS */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/30 space-y-3">
                <div className="text-xs font-bold text-cyan-400 border-b border-cyan-900/40 pb-1.5 flex items-center justify-between">
                  <span>DATE B ({dateB})</span>
                  <span>Moon: {dataB.panchang.moonSign}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  {dataB.planetary.planets.map(p => (
                    <div key={p.name} className="bg-[#0E1517] p-2 rounded-lg border border-cyan-900/20">
                      <div className="font-bold text-cyan-300 text-[10px]">{p.name}</div>
                      <div className="text-white font-serif font-semibold">{p.sign}</div>
                      <div className="text-[9px] text-slate-400 font-mono">{p.degInSign.toFixed(1)}°</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. LIFE EVENT SUITABILITY COMPARISON */}
        {activeTabSection === "events" && (
          <div className="bg-[#120F0D] rounded-2xl border border-amber-500/30 p-4 space-y-3 shadow-xl">
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
              Life Event Shubh Muhurat Match Score Comparison:
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {LIFE_EVENTS.map(ev => {
                const isAEvWin = ev.scoreA > ev.scoreB;
                const isBEvWin = ev.scoreB > ev.scoreA;

                return (
                  <div key={ev.id} className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-amber-200 text-xs">
                        {ev.icon}
                        <span>{ev.label}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">Match %</span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      {/* Date A bar */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] text-amber-400 font-mono shrink-0 w-16">Date A:</span>
                        <div className="grow bg-slate-900 h-2 rounded-full overflow-hidden border border-amber-900/30">
                          <div className="bg-amber-400 h-full rounded-full" style={{ width: `${ev.scoreA}%` }} />
                        </div>
                        <span className={`font-mono text-xs font-bold shrink-0 ${isAEvWin ? "text-amber-300" : "text-slate-400"}`}>
                          {ev.scoreA}%
                        </span>
                      </div>

                      {/* Date B bar */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] text-cyan-400 font-mono shrink-0 w-16">Date B:</span>
                        <div className="grow bg-slate-900 h-2 rounded-full overflow-hidden border border-cyan-900/30">
                          <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${ev.scoreB}%` }} />
                        </div>
                        <span className={`font-mono text-xs font-bold shrink-0 ${isBEvWin ? "text-cyan-300" : "text-slate-400"}`}>
                          {ev.scoreB}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
