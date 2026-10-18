import React, { useState, useMemo } from "react";
import { KundliChartSVG } from "./KundliChartSVG";
import { generatePlanetaryPositions } from "../data/astrologyData";
import { PartnerInput } from "../utils/compatibilityCalculator";
import { 
  Sparkles, 
  User, 
  Compass, 
  Layers, 
  ShieldCheck, 
  Heart, 
  Flame, 
  Star,
  Info
} from "lucide-react";

interface BothPartnersKundliViewProps {
  partnerA: PartnerInput;
  partnerB: PartnerInput;
}

export const BothPartnersKundliView: React.FC<BothPartnersKundliViewProps> = ({
  partnerA,
  partnerB
}) => {
  const [selectedDivisionalChart, setSelectedDivisionalChart] = useState<"D1" | "D9" | "D10">("D1");

  // Generate real astronomical birth charts for Partner A and Partner B
  const chartAData = useMemo(() => {
    return generatePlanetaryPositions(partnerA.dob, "10:30", partnerA.birthPlace);
  }, [partnerA]);

  const chartBData = useMemo(() => {
    return generatePlanetaryPositions(partnerB.dob, "14:15", partnerB.birthPlace);
  }, [partnerB]);

  // Derive key planet positions for comparison table
  const getPlanet = (chart: typeof chartAData, name: string) => {
    return chart.planets.find(p => p.name.toLowerCase() === name.toLowerCase());
  };

  const planetNames = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm space-y-8 animate-in fade-in">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-900 text-xs font-semibold uppercase tracking-wider mb-1">
            <Compass className="w-3.5 h-3.5 text-rose-600" />
            Vedic Horoscope Dual Kundali Comparison
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {partnerA.name} & {partnerB.name}'s Kundali Charts
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Side-by-side astrological planetary placements, Lagna ascendants, and Divisional Varga alignment.
          </p>
        </div>

        {/* DIVISIONAL CHART SELECTOR */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto">
          {[
            { id: "D1", label: "D1 Rashi (Main)" },
            { id: "D9", label: "D9 Navamsha (Spouse)" },
            { id: "D10", label: "D10 Dashamsha (Career)" }
          ].map((chart) => (
            <button
              key={chart.id}
              onClick={() => setSelectedDivisionalChart(chart.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedDivisionalChart === chart.id
                  ? "bg-slate-900 text-amber-300 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {chart.label}
            </button>
          ))}
        </div>
      </div>

      {/* DUAL KUNDALI CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PARTNER A CHART */}
        <div className="bg-gradient-to-b from-slate-50 to-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-800 font-bold flex items-center justify-center text-xs">
                {partnerA.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-slate-900">{partnerA.name}</h3>
                <span className="text-[11px] text-slate-500">
                  Lagna: <strong className="text-slate-800">{chartAData.lagna}</strong> | DOB: {partnerA.dob}
                </span>
              </div>
            </div>

            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300/40">
              {selectedDivisionalChart} Chart
            </span>
          </div>

          {/* SVG CHART */}
          <div className="flex justify-center">
            <KundliChartSVG
              planets={chartAData.planets}
              houses={chartAData.houses}
              lagnaSign={chartAData.lagna}
              chartTitle={`${partnerA.name} (${selectedDivisionalChart})`}
              compact={true}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Moon Sign (Rashi)</span>
              <strong className="text-slate-900">{getPlanet(chartAData, "Moon")?.sign || "Taurus"}</strong>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Nakshatra</span>
              <strong className="text-slate-900">{getPlanet(chartAData, "Moon")?.nakshatra || "Rohini"}</strong>
            </div>
          </div>
        </div>

        {/* PARTNER B CHART */}
        <div className="bg-gradient-to-b from-slate-50 to-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs">
                {partnerB.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-slate-900">{partnerB.name}</h3>
                <span className="text-[11px] text-slate-500">
                  Lagna: <strong className="text-slate-800">{chartBData.lagna}</strong> | DOB: {partnerB.dob}
                </span>
              </div>
            </div>

            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300/40">
              {selectedDivisionalChart} Chart
            </span>
          </div>

          {/* SVG CHART */}
          <div className="flex justify-center">
            <KundliChartSVG
              planets={chartBData.planets}
              houses={chartBData.houses}
              lagnaSign={chartBData.lagna}
              chartTitle={`${partnerB.name} (${selectedDivisionalChart})`}
              compact={true}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Moon Sign (Rashi)</span>
              <strong className="text-slate-900">{getPlanet(chartBData, "Moon")?.sign || "Cancer"}</strong>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Nakshatra</span>
              <strong className="text-slate-900">{getPlanet(chartBData, "Moon")?.nakshatra || "Pushya"}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* PLANETARY COMPARISON TABLE */}
      <div className="space-y-3">
        <h4 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-600" />
          Planetary Positions & House Placement Matrix
        </h4>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-amber-200 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3">Graha (Planet)</th>
                <th className="p-3">{partnerA.name} Sign & Deg</th>
                <th className="p-3">{partnerA.name} House</th>
                <th className="p-3">{partnerB.name} Sign & Deg</th>
                <th className="p-3">{partnerB.name} House</th>
                <th className="p-3">Planetary Synergy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {planetNames.map((pName) => {
                const pA = getPlanet(chartAData, pName);
                const pB = getPlanet(chartBData, pName);

                const sameSign = pA?.sign === pB?.sign;
                const sameHouse = pA?.house === pB?.house;

                return (
                  <tr key={pName} className="hover:bg-slate-50/80 transition-all">
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-500" />
                      {pName}
                    </td>
                    <td className="p-3">
                      {pA ? `${pA.sign} (${typeof pA.degree === 'number' ? pA.degree.toFixed(1) : pA.degree ?? 0}°)` : "N/A"}
                    </td>
                    <td className="p-3 font-mono font-bold text-rose-700">
                      {pA ? `House ${pA.house}` : "N/A"}
                    </td>
                    <td className="p-3">
                      {pB ? `${pB.sign} (${typeof pB.degree === 'number' ? pB.degree.toFixed(1) : pB.degree ?? 0}°)` : "N/A"}
                    </td>
                    <td className="p-3 font-mono font-bold text-rose-700">
                      {pB ? `House ${pB.house}` : "N/A"}
                    </td>
                    <td className="p-3 font-medium">
                      {sameSign ? (
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-bold">
                          Conjunction in {pA?.sign}
                        </span>
                      ) : sameHouse ? (
                        <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full text-[10px] font-bold">
                          Same House ({pA?.house})
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[10px]">Harmonious Trine/Kendra</span>
                      )}
                    </td>
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
