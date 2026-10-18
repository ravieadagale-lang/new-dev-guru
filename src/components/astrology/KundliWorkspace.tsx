import React, { useState, useMemo } from "react";
import { UserProfile, PlanetPosition, HouseDetail, DivisionalChartType } from "../../types";
import { KundliChartSVG } from "../KundliChartSVG";
import { RASHIS, NAKSHATRAS_MASTER as NAKSHATRAS } from "../../data/astrologyData";
import {
  Compass,
  Layers,
  Table,
  Sparkles,
  Eye,
  CheckCircle2,
  Info,
  Calendar,
  Clock,
  User,
  Star,
  Shield,
  Activity
} from "lucide-react";

export type KundliSubTab = "overview" | "vargas" | "planets_table" | "nakshatra";

interface KundliWorkspaceProps {
  userProfile?: UserProfile;
  planets: PlanetPosition[];
  houses: HouseDetail[];
  lagnaSign: string;
  globalAnalysisMode?: string;
  onAnalysisModeChange?: (mode: string) => void;
  initialSubTab?: KundliSubTab;
}

export const KundliWorkspace: React.FC<KundliWorkspaceProps> = ({
  userProfile,
  planets,
  houses,
  lagnaSign,
  globalAnalysisMode,
  onAnalysisModeChange,
  initialSubTab = "overview"
}) => {
  const [subTab, setSubTab] = useState<KundliSubTab>(initialSubTab);
  const [selectedDivisionalChart, setSelectedDivisionalChart] = useState<DivisionalChartType>("D1");

  // Sync subTab if initialSubTab prop changes
  React.useEffect(() => {
    if (initialSubTab) {
      setSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const moonPlanet = useMemo(() => planets.find((p) => p.name === "Moon"), [planets]);
  const userRashi = moonPlanet?.sign || userProfile?.rashi || lagnaSign || "Aries";
  const userNakshatra = userProfile?.nakshatra || "Ashwini";
  const userNakshatraPada = userProfile?.nakshatraPada || 1;

  return (
    <div className="space-y-6">
      {/* Sub navigation bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 sm:p-3 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setSubTab("overview")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              subTab === "overview"
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Lagna Kundli (D1)</span>
          </button>

          <button
            onClick={() => setSubTab("vargas")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              subTab === "vargas"
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Divisional Vargas (D1-D60)</span>
          </button>

          <button
            onClick={() => setSubTab("planets_table")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              subTab === "planets_table"
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Graha Spashta Table</span>
          </button>

          <button
            onClick={() => setSubTab("nakshatra")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              subTab === "nakshatra"
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Nakshatra & Padas</span>
          </button>
        </div>

        {/* Vital badge */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 px-2">
          <span>Lagna: <strong className="text-amber-600 dark:text-amber-400">{lagnaSign}</strong></span>
          <span>•</span>
          <span>Rashi: <strong className="text-amber-600 dark:text-amber-400">{userRashi}</strong></span>
        </div>
      </div>

      {/* Overview or Vargas */}
      {(subTab === "overview" || subTab === "vargas") && (
        <div className="space-y-6">
          <KundliChartSVG
            planets={planets}
            houses={houses}
            lagnaSign={lagnaSign}
            chartTitle={subTab === "overview" ? "D1 - Rashi Janma Kundli" : `Divisional Varga Chart (${selectedDivisionalChart})`}
            onSelectDivisionalChart={setSelectedDivisionalChart}
          />
        </div>
      )}

      {/* Planetary Ephemeris Table */}
      {subTab === "planets_table" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">
                Planetary Positions & Ephemeris (Graha Spashta)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Exact mathematical longitude, Vedic sign placement, house occupation, and retrogradation
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300/40">
              Lahiri Chitrapaksha Ayanamsha
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3">Planet</th>
                  <th className="py-2.5 px-3">Sign</th>
                  <th className="py-2.5 px-3">Longitude</th>
                  <th className="py-2.5 px-3">House</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Lordship</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {planets.map((planet) => (
                  <tr key={planet.name} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span>{planet.name}</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">
                      {planet.sign}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">
                      {Math.floor(planet.degree % 30)}° {Math.floor(((planet.degree % 30) % 1) * 60)}'
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 font-medium">
                      House {planet.house}
                    </td>
                    <td className="py-2.5 px-3">
                      {planet.isRetrograde ? (
                        <span className="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold text-[10px]">
                          VAKRI (R)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-medium text-[10px]">
                          MARGI (Direct)
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400">
                      {planet.isExalted ? "Uchha (Exalted)" : planet.isDebilitated ? "Neecha (Debilitated)" : "Normal"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Nakshatra & Pada Details */}
      {subTab === "nakshatra" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">
              Nakshatra, Pada & Lunar Mansion Architecture
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              The 27 sacred asterisms governing karmic impressions, subconscious tendencies, and soul evolution
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Birth Nakshatra (Janma Tara)
              </span>
              <h4 className="text-lg font-bold font-serif text-slate-900 dark:text-white mt-1">
                {userNakshatra}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Pada {userNakshatraPada} • Governing primary life orientation
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Moon Sign (Janma Rashi)
              </span>
              <h4 className="text-lg font-bold font-serif text-slate-900 dark:text-white mt-1">
                {userRashi}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Emotional landscape, mental resilience & thought flow
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Ascendant (Janma Lagna)
              </span>
              <h4 className="text-lg font-bold font-serif text-slate-900 dark:text-white mt-1">
                {lagnaSign}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Physical body, vitality, character expression & life path
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Ayanamsha Calculation
              </span>
              <h4 className="text-lg font-bold font-serif text-slate-900 dark:text-white mt-1">
                Lahiri (24°09')
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Government of India standard astronomical precession
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
