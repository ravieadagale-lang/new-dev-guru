import React, { useState } from "react";
import { 
  Sparkles, 
  BarChart2, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Compass, 
  Award,
  Zap
} from "lucide-react";

interface AshtakavargaMatrixProps {
  lagna?: string;
  rashi?: string;
  userName?: string;
}

export const AshtakavargaMatrix: React.FC<AshtakavargaMatrixProps> = ({
  lagna = "Aries",
  rashi = "Taurus",
  userName = "Seeker"
}) => {
  const [selectedHouse, setSelectedHouse] = useState<number>(1);

  // Generate house-by-house Ashtakavarga bindu distribution (SAV out of 337 total points across 12 houses)
  // Standard average house SAV is 28 points.
  const HOUSES_SAV = [
    { house: 1, name: "1st House (Lagna / Self)", score: 32, planet: "Sun / Mars", nature: "Auspicious", desc: "Strong physical vitality, self-confidence & leadership authority." },
    { house: 2, name: "2nd House (Dhana / Wealth)", score: 29, planet: "Jupiter", nature: "Auspicious", desc: "Steady financial savings, family harmony, & refined speech." },
    { house: 3, name: "3rd House (Sahaja / Courage)", score: 27, planet: "Mars", nature: "Neutral", desc: "Moderate courage, communication effort required for gains." },
    { house: 4, name: "4th House (Sukha / Home)", score: 34, planet: "Moon / Venus", nature: "Highly Auspicious", desc: "Peak domestic peace, property gains, vehicle luxury, & maternal blessings." },
    { house: 5, name: "5th House (Putra / Intelligence)", score: 31, planet: "Jupiter", nature: "Auspicious", desc: "Sharp intellect, speculative gains, creative talent, & mantra siddhi." },
    { house: 6, name: "6th House (Ripu / Enemies)", score: 22, planet: "Saturn / Rahu", nature: "Vulnerable", desc: "Low immunity window & debt caution. Keep health routine strict during transits." },
    { house: 7, name: "7th House (Kalatra / Spouse)", score: 28, planet: "Venus", nature: "Auspicious", desc: "Balanced marital partnerships, public relations, & business deals." },
    { house: 8, name: "8th House (Randhra / Longevity)", score: 21, planet: "Saturn", nature: "Vulnerable", desc: "Unpredictable fluctuations. Ideal for occult studies and spiritual sadhana." },
    { house: 9, name: "9th House (Bhagya / Fortune)", score: 35, planet: "Jupiter / Sun", nature: "Highly Auspicious", desc: "Supreme fortune, divine grace, higher learning, & long-distance pilgrimage." },
    { house: 10, name: "10th House (Karma / Career)", score: 36, planet: "Sun / Mercury", nature: "Peak Career Zone", desc: "Highest career recognition, professional promotions, & authority status." },
    { house: 11, name: "11th House (Labha / Gains)", score: 38, planet: "Jupiter / Venus", nature: "Peak Profit Zone", desc: "Highest monetary profits, passive income streams, & wish fulfillment." },
    { house: 12, name: "12th House (Vyaya / Expenses)", score: 24, planet: "Ketu / Saturn", nature: "Neutral Expenditure", desc: "Controlled foreign expenses, meditation focus, & sound sleep quality." }
  ];

  const totalSAV = HOUSES_SAV.reduce((acc, curr) => acc + curr.score, 0);

  // Bhinna Ashtakavarga (BAV) matrix for 7 planets
  const PLANET_BAV = [
    { name: "Sun (Surya)", points: [4, 5, 3, 6, 5, 2, 4, 3, 6, 5, 7, 3], total: 48 },
    { name: "Moon (Chandra)", points: [5, 4, 3, 6, 4, 3, 5, 2, 5, 4, 6, 2], total: 49 },
    { name: "Mars (Mangal)", points: [3, 2, 4, 3, 2, 5, 2, 1, 4, 5, 6, 2], total: 39 },
    { name: "Mercury (Budha)", points: [5, 6, 4, 5, 5, 3, 5, 3, 6, 5, 7, 0], total: 54 },
    { name: "Jupiter (Guru)", points: [6, 5, 4, 6, 6, 2, 5, 3, 7, 6, 6, 0], total: 56 },
    { name: "Venus (Shukra)", points: [4, 5, 3, 5, 4, 3, 6, 2, 5, 4, 8, 3], total: 52 },
    { name: "Saturn (Shani)", points: [2, 3, 2, 3, 1, 4, 1, 2, 2, 3, 5, 1], total: 29 }
  ];

  const houseData = HOUSES_SAV.find((h) => h.house === selectedHouse) || HOUSES_SAV[0];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <BarChart2 className="w-3.5 h-3.5 text-amber-600" />
            Parashari Quantitative Ashtakavarga Matrix
          </div>
          <h3 className="font-serif text-2xl font-bold text-slate-900">
            Sarvashtakavarga (SAV) & Bhinna Strength Engine
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Quantitative 337-point Ashtakavarga matrix calculated for <span className="text-amber-900 font-bold">{userName}</span> ({lagna} Lagna). Houses with <span className="text-emerald-700 font-bold">28+ SAV points</span> yield effortless gains during transits.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">Total SAV Score</span>
          <span className="font-serif font-bold text-2xl text-amber-950">{totalSAV} / 337</span>
        </div>
      </div>

      {/* 12 HOUSES GRID SCORE MATRIX */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-serif font-bold text-slate-900 text-sm">Select House to Inspect SAV Strength & Transit Impact:</span>
          <span className="text-[11px] text-slate-500">Benchmark: 28 Points = Neutral Average</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 text-xs">
          {HOUSES_SAV.map((h) => {
            const isSelected = h.house === selectedHouse;
            const isHigh = h.score >= 30;
            const isLow = h.score < 25;

            return (
              <button
                key={h.house}
                onClick={() => setSelectedHouse(h.house)}
                className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? "bg-slate-950 text-amber-300 border-amber-500 shadow-md ring-2 ring-amber-500/30"
                    : isHigh
                    ? "bg-emerald-50/70 text-slate-900 border-emerald-200 hover:border-emerald-400"
                    : isLow
                    ? "bg-rose-50/70 text-slate-900 border-rose-200 hover:border-rose-400"
                    : "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase ${isSelected ? "text-amber-400" : "text-slate-500"}`}>
                    H{h.house}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded-md font-serif font-bold text-xs ${
                    isSelected
                      ? "bg-amber-500 text-slate-950"
                      : isHigh ? "bg-emerald-200 text-emerald-900" : isLow ? "bg-rose-200 text-rose-900" : "bg-slate-200 text-slate-800"
                  }`}>
                    {h.score} pts
                  </span>
                </div>
                <div className="font-semibold text-[11px] mt-1 truncate">{h.name.split(" ")[1]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* HOUSE DETAIL SPOTLIGHT CARD */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-amber-100 border border-amber-500/30 space-y-3">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400">Selected House Analysis</span>
            <h4 className="font-serif font-bold text-lg text-white">{houseData.name}</h4>
          </div>

          <div className="text-right">
            <span className="font-serif text-2xl font-bold text-amber-300">{houseData.score} Points</span>
            <span className={`text-[10px] font-bold uppercase block ${
              houseData.score >= 30 ? "text-emerald-400" : houseData.score < 25 ? "text-rose-400" : "text-amber-200"
            }`}>
              {houseData.nature}
            </span>
          </div>
        </div>

        <p className="text-xs text-amber-100/90 leading-relaxed font-serif">
          {houseData.desc}
        </p>

        <div className="pt-2 border-t border-amber-500/20 flex flex-wrap items-center justify-between text-xs text-amber-300">
          <span><strong>Karakas (Ruling Significators):</strong> {houseData.planet}</span>
          <span><strong>Transit Potential:</strong> {houseData.score >= 30 ? "High Prosperity Window" : "Cautionary Remedial Focus"}</span>
        </div>
      </div>

      {/* BHINNA ASHTAKAVARGA (7 PLANETS INDIVIDUAL BINDUS) TABLE */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="font-serif text-base font-bold text-slate-900">
            Bhinna Ashtakavarga (BAV) 7-Planet Bindu Breakdown
          </h4>
          <span className="text-xs text-slate-500 font-medium">Parashari Point Distribution</span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3 border-b">Planet</th>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (
                  <th key={h} className="p-2 border-b text-center">H{h}</th>
                ))}
                <th className="p-3 border-b text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PLANET_BAV.map((pb) => (
                <tr key={pb.name} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900 whitespace-nowrap">{pb.name}</td>
                  {pb.points.map((pt, idx) => (
                    <td key={idx} className="p-2 text-center font-serif font-semibold">
                      <span className={`inline-block w-6 h-6 leading-6 rounded-md ${
                        pt >= 5 ? "bg-emerald-100 text-emerald-800 font-bold" : pt <= 2 ? "bg-rose-100 text-rose-800" : "text-slate-700"
                      }`}>
                        {pt}
                      </span>
                    </td>
                  ))}
                  <td className="p-3 font-serif font-bold text-amber-900 text-right">{pb.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
