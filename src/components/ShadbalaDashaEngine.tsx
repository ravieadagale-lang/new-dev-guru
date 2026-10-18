import React, { useState } from "react";
import { 
  BarChart2, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert,
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Compass, 
  Award,
  Zap,
  Clock,
  BookOpen,
  Calendar
} from "lucide-react";
import { 
  calculateShadbalaMatrix, 
  calculateVimshottariTimeline, 
  calculateTransitsAndSadeSati,
  ShadbalaPlanetDetail, 
  VimshottariPeriod 
} from "../utils/vedicAstronomicalEngine";

interface ShadbalaDashaEngineProps {
  lagna?: string;
  rashi?: string;
  nakshatra?: string;
  dob?: string;
  userName?: string;
}

export const ShadbalaDashaEngine: React.FC<ShadbalaDashaEngineProps> = ({
  lagna = "Aries",
  rashi = "Taurus",
  nakshatra = "Rohini",
  dob = "1995-08-15",
  userName = "Seeker"
}) => {
  const [selectedHouse, setSelectedHouse] = useState<number>(1);
  const [activeSubTab, setActiveSubTab] = useState<"shadbala" | "dasha" | "transits" | "bhavat_bhavam">("shadbala");

  const shadbalaList = calculateShadbalaMatrix(lagna, rashi, nakshatra);
  const dashaTimeline = calculateVimshottariTimeline(dob, nakshatra);
  const currentDasha = dashaTimeline.find((d) => d.isCurrent) || dashaTimeline[0];
  const transitData = calculateTransitsAndSadeSati(rashi);

  // 12 House Bhavat Bhavam Detailed Descriptions
  const HOUSES_DEEP = [
    { house: 1, topic: "Self, Health & Identity (Lagna)", lord: "Mars / Sun", sig: "Physical vitality, personal charisma, immunity, and overall life direction.", prediction: "Strong Lagna Lord endows robust health, high self-esteem, and natural leadership capabilities." },
    { house: 2, topic: "Wealth, Family & Speech (Dhana)", lord: "Venus / Jupiter", sig: "Accumulated liquid wealth, family lineage, speech eloquence, and food habits.", prediction: "2nd House strength indicates steady financial savings, family harmony, and persuasive communication skills." },
    { house: 3, topic: "Courage, Siblings & Skills (Sahaja)", lord: "Mercury / Mars", sig: "Willpower, younger siblings, artistic craftsmanship, short travels, and writing.", prediction: "Favorable 3rd House imparts fierce determination, entrepreneurial initiative, and strong sibling bonds." },
    { house: 4, topic: "Home, Mother & Vehicles (Sukha)", lord: "Moon / Venus", sig: "Domestic peace, mother's blessings, real estate properties, luxury cars, and emotional security.", prediction: "Blessed 4th House ensures prime property ownership, deep maternal love, and inner mental tranquility." },
    { house: 5, topic: "Intellect, Children & Mantras (Putra)", lord: "Jupiter / Sun", sig: "Sharp intellect, creative talent, offspring luck, speculative gains, and past-life merits (Purva Punya).", prediction: "Strong 5th House brings exceptional academic honors, intelligent progeny, and intuitive financial decision-making." },
    { house: 6, topic: "Health, Enemies & Service (Ripu)", lord: "Saturn / Mars", sig: "Immunity against disease, victory over rivals, debt management, and daily work discipline.", prediction: "Disciplined 6th House enables victory over competitors, debt-free living, and high stamina in daily profession." },
    { house: 7, topic: "Marriage, Business & Partners (Kalatra)", lord: "Venus / Jupiter", sig: "Spousal relationship, marital happiness, foreign business partnerships, and public image.", prediction: "Auspicious 7th House guarantees a devoted life partner, prosperous joint ventures, and high social reputation." },
    { house: 8, topic: "Longevity, Occult & Research (Randhra)", lord: "Saturn / Ketu", sig: "Lifespan, hidden inheritance, esoteric knowledge, sudden gains, and spiritual transformation.", prediction: "Deep 8th House bestows long life, profound research aptitude, and sudden unearned financial windfalls." },
    { house: 9, topic: "Fortune, Higher Learning & Dharma (Bhagya)", lord: "Jupiter / Sun", sig: "Divine grace, father's guidance, higher university education, pilgrimages, and ethical living.", prediction: "Exalted 9th House opens doors of fortunate travel, spiritual enlightenment, and fatherly support." },
    { house: 10, topic: "Career, Fame & Authority (Karma)", lord: "Sun / Saturn", sig: "Professional achievements, executive promotions, public status, authority, and government favors.", prediction: "Powerful 10th House guarantees swift career progression, executive leadership, and widespread honor." },
    { house: 11, topic: "Gains, Profits & Wish Fulfillment (Labha)", lord: "Jupiter / Venus", sig: "Passive revenue streams, high financial profits, elder siblings, and fulfillment of deep desires.", prediction: "Peak 11th House assures multiple income sources, profitable social network, and total goal achievement." },
    { house: 12, topic: "Moksha, Foreign Lands & Expenses (Vyaya)", lord: "Ketu / Saturn", sig: "Foreign settlement, spiritual liberation, sound sleep, philanthropy, and controlled expenditure.", prediction: "Balanced 12th House facilitates rewarding overseas travels, peaceful sleep, and high spiritual wisdom." }
  ];

  const currentHouseData = HOUSES_DEEP.find((h) => h.house === selectedHouse) || HOUSES_DEEP[0];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm space-y-6">
      {/* HEADER & SUB-TABS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Parashari Astronomical Quantitative Calculations
          </div>
          <h3 className="font-serif text-2xl font-bold text-slate-900">
            Shadbala, Vimshottari Dasha & Bhavat Bhavam Engine
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Real mathematical Sixfold Strength (Shadbala in Rupas & Virupas), running Vimshottari Mahadasha predictions, and 12-Bhava deep house lord analysis for <span className="font-bold text-slate-900">{userName}</span> ({lagna} Lagna).
          </p>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold gap-1 shrink-0">
          <button
            onClick={() => setActiveSubTab("shadbala")}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeSubTab === "shadbala" ? "bg-slate-950 text-amber-300 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Shadbala (Sixfold Strength)
          </button>
          <button
            onClick={() => setActiveSubTab("dasha")}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeSubTab === "dasha" ? "bg-slate-950 text-amber-300 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Current Running Dasha
          </button>
          <button
            onClick={() => setActiveSubTab("transits")}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeSubTab === "transits" ? "bg-slate-950 text-amber-300 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Transits & Sade Sati
          </button>
          <button
            onClick={() => setActiveSubTab("bhavat_bhavam")}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeSubTab === "bhavat_bhavam" ? "bg-slate-950 text-amber-300 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            12 Bhava Analysis
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: SHADBALA MATRIX */}
      {activeSubTab === "shadbala" && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shadbalaList.map((p) => {
              const pct = Math.min(100, Math.round((p.totalRupas / (p.reqRupas + 2)) * 100));
              const isExceeds = p.strengthStatus.includes("Exceeds");
              const isWeak = p.strengthStatus.includes("Weak");

              return (
                <div key={p.planet} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-serif font-bold text-slate-900 text-sm block">{p.planet}</span>
                      <span className={`text-[10px] font-bold ${
                        isExceeds ? "text-emerald-700" : isWeak ? "text-rose-700" : "text-amber-700"
                      }`}>
                        {p.strengthStatus}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-serif font-bold text-lg text-amber-950 block">{p.totalRupas} Rupas</span>
                      <span className="text-[10px] text-slate-500 font-medium">Req: {p.reqRupas} Rupas ({p.totalVirupas} Virupas)</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isExceeds ? "bg-emerald-600" : isWeak ? "bg-rose-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  {/* Virupas Breakdown Grid */}
                  <div className="grid grid-cols-3 gap-2 text-[10px] bg-white p-2.5 rounded-xl border border-slate-200 text-slate-600">
                    <div><strong>Positional (Stana):</strong> {p.stanabala}</div>
                    <div><strong>Directional (Dig):</strong> {p.digbala}</div>
                    <div><strong>Temporal (Kaala):</strong> {p.kaalabala}</div>
                    <div><strong>Motional (Cheshta):</strong> {p.cheshtabala}</div>
                    <div><strong>Natural (Naisargika):</strong> {p.naisargika}</div>
                    <div><strong>Aspectual (Drik):</strong> {p.drikbala}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: VIMSHOTTARI DASHA TIMELINE */}
      {activeSubTab === "dasha" && (
        <div className="space-y-6 animate-in fade-in">
          {/* RUNNING DASHA HIGHLIGHT */}
          {currentDasha && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-amber-100 border border-amber-500/30 space-y-3 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Currently Running Active Period</span>
                    <h4 className="font-serif font-bold text-xl text-white">
                      {currentDasha.mahadashaLord} Mahadasha — {currentDasha.antardashaLord} Antardasha
                    </h4>
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shrink-0 text-center">
                  Active Period: {currentDasha.startDate} to {currentDasha.endDate}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-serif">
                {currentDasha.prediction}
              </p>

              <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-300">
                <span><strong>Active Dasha Remedy:</strong> {currentDasha.remedy}</span>
                <span className="text-[11px] font-bold text-emerald-400">Parashari Certified Dasha Timeline</span>
              </div>
            </div>
          )}

          {/* DASHA TIMELINE LIST */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-slate-900">
              Vimshottari Extended Timeline (Birth to 120 Years)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {dashaTimeline.slice(0, 18).map((d, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border space-y-1.5 ${
                    d.isCurrent
                      ? "bg-amber-950 text-amber-200 border-amber-500 ring-2 ring-amber-500/30"
                      : "bg-slate-50 text-slate-800 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold font-serif text-sm">
                      {d.mahadashaLord} / {d.antardashaLord}
                    </span>
                    {d.isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[9px] uppercase animate-pulse">
                        RUNNING NOW
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-medium opacity-80">
                    {d.startDate} - {d.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB: TRANSITS & SADE SATI */}
      {activeSubTab === "transits" && (
        <div className="space-y-6 animate-in fade-in">
          {/* Sade Sati Card */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-6 rounded-3xl border border-amber-500/30 text-amber-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Saturn Sade Sati & Dhaiya Status</span>
                <h4 className="font-serif font-bold text-xl text-white mt-0.5">{transitData.sadeSatiStatus}</h4>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs">
                <ShieldAlert className="w-4 h-4" />
                <span>Severity Level: {transitData.sadeSatiSeverity}</span>
              </div>
            </div>

            <p className="text-xs text-amber-200/90 leading-relaxed font-serif">
              {transitData.sadeSatiDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-amber-500/20 space-y-1">
                <span className="text-[10px] text-amber-400 uppercase font-bold">Saturn Transit (Pisces)</span>
                <div className="font-bold text-sm text-white">{transitData.saturnTransit.houseFromMoon}th House from Moon</div>
                <p className="text-[11px] text-amber-200/80">{transitData.saturnTransit.influence}</p>
                <div className="text-[10px] text-amber-300 font-semibold pt-1">Remedy: {transitData.saturnTransit.remedy}</div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-2xl border border-amber-500/20 space-y-1">
                <span className="text-[10px] text-amber-400 uppercase font-bold">Jupiter Transit (Cancer - Exalted)</span>
                <div className="font-bold text-sm text-white">{transitData.jupiterTransit.houseFromMoon}th House from Moon</div>
                <p className="text-[11px] text-amber-200/80">{transitData.jupiterTransit.influence}</p>
                <div className="text-[10px] text-amber-300 font-semibold pt-1">Remedy: {transitData.jupiterTransit.remedy}</div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-2xl border border-amber-500/20 space-y-1">
                <span className="text-[10px] text-amber-400 uppercase font-bold">Rahu / Ketu Axis</span>
                <div className="font-bold text-sm text-white">Rahu ({transitData.rahuKetuAxis.rahuHouse}th) / Ketu ({transitData.rahuKetuAxis.ketuHouse}th)</div>
                <p className="text-[11px] text-amber-200/80">{transitData.rahuKetuAxis.influence}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: 12 BHAVA ANALYSIS */}
      {activeSubTab === "bhavat_bhavam" && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="font-serif font-bold text-slate-900 text-sm">Select House to Inspect Deep Bhavat Bhavam Significance:</span>
            <span className="text-[11px] text-slate-500">12 Houses of Life Destiny</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 text-xs">
            {HOUSES_DEEP.map((h) => {
              const isSelected = h.house === selectedHouse;

              return (
                <button
                  key={h.house}
                  onClick={() => setSelectedHouse(h.house)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "bg-slate-950 text-amber-300 border-amber-500 shadow-md ring-2 ring-amber-500/30"
                      : "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase block ${isSelected ? "text-amber-400" : "text-slate-500"}`}>
                    House {h.house}
                  </span>
                  <div className="font-bold text-[11px] mt-0.5 truncate">{h.topic.split(" ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* SPOTLIGHT HOUSE CARD */}
          <div className="p-6 rounded-3xl bg-slate-900 text-amber-100 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400">Bhava {currentHouseData.house} Detailed Profile</span>
                <h4 className="font-serif font-bold text-xl text-white">{currentHouseData.topic}</h4>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-amber-500 text-slate-950 rounded-xl">
                Rulers: {currentHouseData.lord}
              </span>
            </div>

            <p className="text-xs text-amber-100/90 leading-relaxed font-serif">
              <strong>Karakas & Significance:</strong> {currentHouseData.sig}
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-500/20 text-xs text-amber-200">
              <strong className="text-amber-400 block mb-1">Deep Parashari Life Prediction:</strong>
              {currentHouseData.prediction}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
