import React, { useState, useMemo } from "react";
import { 
  Sun, 
  Calendar, 
  Sparkles, 
  Layers, 
  Award, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Compass, 
  Activity, 
  RotateCw,
  Clock
} from "lucide-react";
import { MasterTajikaEngine } from "../../engine/tajika/masterTajikaEngine";
import { MuddaYearMode } from "../../engine/tajika/tajikaTypes";
import { AstroBadge, AstroButton } from "../astronext/AstroDesignSystem";

interface TajikaWorkspaceViewProps {
  birthDate?: Date;
  natalSunLongitudeDeg?: number;
  natalAscendantLongitudeDeg?: number;
  latitude?: number;
  longitude?: number;
  timezoneOffsetHours?: number;
}

export const TajikaWorkspaceView: React.FC<TajikaWorkspaceViewProps> = ({
  birthDate = new Date("1995-08-15T10:30:00Z"),
  natalSunLongitudeDeg = 148.452,
  natalAscendantLongitudeDeg = 14.28,
  latitude = 28.6139,
  longitude = 77.2090,
  timezoneOffsetHours = 5.5,
}) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [activeTab, setActiveTab] = useState<"overview" | "yogas" | "sahams" | "mudda" | "masa" | "tripataki" | "methodology">("overview");
  const [muddaMode, setMuddaMode] = useState<MuddaYearMode>("365.2425DayConvention");
  const [selectedMasaMonth, setSelectedMasaMonth] = useState<number>(1);

  // Compute Master Varshaphala report deterministically
  const varshaReport = useMemo(() => {
    return MasterTajikaEngine.calculateMasterVarshaphala({
      birthDate,
      targetYear: selectedYear,
      natalSunLongitudeDeg,
      natalAscendantLongitudeDeg,
      latitude,
      longitude,
      timezoneOffsetHours,
      muddaYearMode: muddaMode,
    });
  }, [birthDate, selectedYear, natalSunLongitudeDeg, natalAscendantLongitudeDeg, latitude, longitude, timezoneOffsetHours, muddaMode]);

  return (
    <div className="space-y-6">
      {/* Varshaphala Header */}
      <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Sun className="w-3.5 h-3.5" /> Tajika Varshaphala System
              </span>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Exact Convergence: {varshaReport.solarReturnConvergence.convergenceError.toFixed(3)}&quot; arcsec
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              Annual Solar Return for {selectedYear} ({selectedYear - birthDate.getFullYear()}th Year of Life)
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Solar Return Instant (UTC): <strong className="text-slate-800">{new Date(varshaReport.solarReturnConvergence.solarReturnInstantUTC).toUTCString()}</strong> • Iterations: {varshaReport.solarReturnConvergence.iterations}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {Array.from({ length: 15 }, (_, i) => currentYear - 5 + i).map((y) => (
                <option key={y} value={y}>
                  {y} ({y - birthDate.getFullYear()} yrs)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 pt-3">
          {[
            { id: "overview", label: "Year Lord & Muntha", count: 2 },
            { id: "yogas", label: "16 Tajika Yogas", count: varshaReport.activeTajikaYogas.length },
            { id: "sahams", label: "25+ Classical Sahams", count: varshaReport.sahamsList.length },
            { id: "mudda", label: "Mudda Dasha", count: 9 },
            { id: "masa", label: "12 Masa Praveshas", count: 12 },
            { id: "tripataki", label: "Tri-Pataki Chakra", count: varshaReport.triPatakiChakra.vedhasDetected.length },
            { id: "methodology", label: "Methodology & Audit", count: 1 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-slate-900 text-amber-300 shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === tab.id ? "bg-amber-400/20 text-amber-200" : "bg-slate-200 text-slate-600"}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. OVERVIEW: VARSHESHA & MUNTHA */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Varshesha Card */}
            <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  Varsheshwara (Year Lord)
                </span>
                <AstroBadge label={varshaReport.varsheshaResult.strengthRating} variant="gold" size="sm" />
              </div>
              <div className="text-2xl font-serif font-bold text-slate-900">
                {varshaReport.varsheshaResult.selectedVarshesha}
              </div>
              <div className="text-xs text-slate-600">
                Office: <strong className="text-slate-800">{varshaReport.varsheshaResult.varsheshaOffice}</strong>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                <div className="p-2 bg-slate-50 rounded-xl">
                  <div className="text-[10px] text-slate-500">Pancha-Vargiya</div>
                  <div className="font-bold text-slate-800">{varshaReport.varsheshaResult.panchaVargiyaScore.toFixed(2)} / 20</div>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl">
                  <div className="text-[10px] text-slate-500">Harsha Bala</div>
                  <div className="font-bold text-slate-800">{varshaReport.varsheshaResult.harshaBalaScore} / 20 pts</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 italic">
                &ldquo;{varshaReport.varsheshaResult.annualForecast}&rdquo;
              </p>
            </div>

            {/* Muntha Card */}
            <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                  Muntha Annual Point
                </span>
                <span className="text-xs font-bold text-slate-700">House {varshaReport.muntha.munthaHouseFromVarshaLagna}</span>
              </div>
              <div className="text-2xl font-serif font-bold text-slate-900">
                {varshaReport.muntha.progressedMunthaSignName} ({varshaReport.muntha.muntheshaPlanet})
              </div>
              <div className="text-xs text-slate-600">
                Progression: <strong className="text-slate-800">1 sign / completed solar year ({varshaReport.muntha.ageInCompletedYears} completed years)</strong>
              </div>
              <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100 text-xs text-purple-950">
                {varshaReport.muntha.annualImplications}
              </div>
              <div className="text-[11px] text-slate-500">
                Munthesha ({varshaReport.muntha.muntheshaPlanet}) in Varsha House {varshaReport.muntha.muntheshaHouseFromVarshaLagna} • Dignity: {varshaReport.muntha.muntheshaDignity}
              </div>
            </div>

            {/* Varsha Ascendant Card */}
            <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  Varsha Pravesha Lagna
                </span>
                <span className="text-xs font-mono text-blue-700">{varshaReport.varshaAscendant.longitude.toFixed(2)}°</span>
              </div>
              <div className="text-2xl font-serif font-bold text-slate-900">
                {varshaReport.varshaAscendant.signName} (Lord: {varshaReport.varshaAscendant.signLord})
              </div>
              <div className="text-xs text-slate-600">
                Sign Index: <strong className="text-slate-800">Sign #{varshaReport.varshaAscendant.signIndex + 1} ({varshaReport.varshaAscendant.signName})</strong>
              </div>
              <div className="p-3 bg-blue-50/50 rounded-2xl border border-blue-100 text-xs text-blue-950">
                Ayanamsha Standard: <strong>{varshaReport.metadata.ayanamsha}</strong>
              </div>
              <div className="text-[11px] text-slate-500">
                Birth Sun: {natalSunLongitudeDeg.toFixed(2)}° • Varsha Sun: {varshaReport.solarReturnConvergence.solarReturnTargetLongitude.toFixed(2)}°
              </div>
            </div>
          </div>

          {/* Panchadhikari 5 Candidates Table */}
          <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Panchadhikari (5 Office Bearers for Year Lordship)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                    <th className="py-2.5 px-3">Office</th>
                    <th className="py-2.5 px-3">Planet Candidate</th>
                    <th className="py-2.5 px-3">House from Lagna</th>
                    <th className="py-2.5 px-3">Aspects Lagna?</th>
                    <th className="py-2.5 px-3">Pancha-Vargiya Bala</th>
                    <th className="py-2.5 px-3">Harsha Bala</th>
                    <th className="py-2.5 px-3">Eligibility Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(varshaReport?.panchadhikariResult?.candidates || []).map((c, i) => (
                    <tr key={i} className={`hover:bg-slate-50 ${c.planet === varshaReport.varsheshaResult.selectedVarshesha ? "bg-amber-50/60 font-semibold" : ""}`}>
                      <td className="py-2.5 px-3">{c.office}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">{c.planet}</td>
                      <td className="py-2.5 px-3">House {c.houseFromVarshaLagna}</td>
                      <td className="py-2.5 px-3">
                        {c.aspectsVarshaLagna ? (
                          <span className="text-emerald-700 font-semibold">Yes ({c.aspectTypeToVarshaLagna})</span>
                        ) : (
                          <span className="text-rose-600">No (Ineligible)</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3">{c.panchaVargiyaBalaPoints.toFixed(2)} / 20</td>
                      <td className="py-2.5 px-3">{c.harshaBalaPoints} / 20</td>
                      <td className="py-2.5 px-3">
                        {c.isEligible ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Eligible
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]">
                            {c.disqualificationReason || "Disqualified"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. 16 TAJIKA YOGAS */}
      {activeTab === "yogas" && (
        <div className="space-y-4">
          <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            Canonical 16-Yoga Tajika Registry (Tajika Neelakanthi Chapter 2). Evaluation accounts for exact planetary speeds, Deeptamsha orbs, applying vs separating aspects, and intermediate transfer/collection planets.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(varshaReport?.activeTajikaYogas || []).map((y, i) => (
              <div key={i} className="p-5 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                    y.category === "Auspicious Fruition"
                      ? "bg-emerald-100 text-emerald-900 border border-emerald-200"
                      : y.category === "Friction / Obstruction"
                      ? "bg-rose-100 text-rose-900 border border-rose-200"
                      : "bg-purple-100 text-purple-900 border border-purple-200"
                  }`}>
                    {y.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{y.shastricRuleId}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-slate-900">
                  {y.yogaName}
                </h4>
                <div className="text-xs text-slate-700">
                  Planets: <strong className="text-slate-900">{y.involvedPlanets?.join(" ↔ ") || "—"}</strong> • Orb: <strong className="text-slate-900">{y.orbDegrees?.toFixed(2) ?? "0.00"}°</strong>
                </div>
                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {y.aspectType}
                </div>
                <p className="text-xs text-slate-800 font-medium">
                  {y.effectDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. 25+ CANONICAL SAHAMS */}
      {activeTab === "sahams" && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-3">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Classical Sahams (25+ Sensitive Arabic Parts with 30° Shodhana)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                    <th className="py-2.5 px-3">Saham</th>
                    <th className="py-2.5 px-3">Sign &amp; Degree</th>
                    <th className="py-2.5 px-3">House from Lagna</th>
                    <th className="py-2.5 px-3">Dispositor</th>
                    <th className="py-2.5 px-3">Formula Applied</th>
                    <th className="py-2.5 px-3">Shodhana Adjustment</th>
                    <th className="py-2.5 px-3">Significance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(varshaReport?.sahamsList || []).map((s, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-slate-900">
                        {s.name} <span className="text-[10px] text-slate-500 font-normal">({s.sanskritName})</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono">{s.signName} {s.finalLongitude.toFixed(2)}°</td>
                      <td className="py-2.5 px-3">House {s.housePlacement}</td>
                      <td className="py-2.5 px-3">{s.dispositor}</td>
                      <td className="py-2.5 px-3 text-[11px] text-slate-600">{s.dayNightVariant}</td>
                      <td className="py-2.5 px-3 text-[11px]">
                        {s.adjustmentApplied ? (
                          <span className="text-amber-800 font-semibold">{s.adjustmentRule}</span>
                        ) : (
                          <span className="text-slate-500">None required</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700">{s.significance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. MUDDA DASHA */}
      {activeTab === "mudda" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700">Mudda Year Duration Standard:</span>
            <div className="flex gap-2">
              {[
                { id: "SOLAR_365_2422", label: "Solar Year (365.2422 Days)" },
                { id: "CIVIL_360", label: "Savana Year (360 Days / 30-day Month)" },
                { id: "SIDEREAL_365_25636", label: "Sidereal Year (365.25636 Days)" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMuddaMode(m.id as MuddaYearMode)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    muddaMode === m.id
                      ? "bg-amber-900 text-amber-100 shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Mudda Annual Dasha Timeline (1 Year = 120 Vimshottari Portions)
            </h3>
            <div className="space-y-3">
              {(varshaReport?.muddaDasha?.periods || []).map((p, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-base font-bold text-slate-900">
                        {p.lord} Mudda Dasha
                      </span>
                      <span className="text-xs text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md font-bold">
                        {p.durationDays.toFixed(1)} Days
                      </span>
                    </div>
                    <div className="text-xs text-slate-600">
                      {new Date(p.startDateIso).toLocaleDateString()} &rarr; {new Date(p.endDateIso).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-xs text-slate-700 text-right sm:max-w-md">
                    {p.predictedThemes}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. MASA PRAVESHA (12 MONTHLY RETURNS) */}
      {activeTab === "masa" && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Masa Pravesha (12 Monthly Solar Ingress Returns)
                </h3>
                <p className="text-xs text-slate-600">
                  Exact 30° progression of the Sun across all 12 zodiacal months of the annual chart.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Select Month:</span>
                <select
                  value={selectedMasaMonth}
                  onChange={(e) => setSelectedMasaMonth(parseInt(e.target.value, 10))}
                  className="px-3 py-1 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold"
                >
                  {(varshaReport?.masaPravesha?.months || []).map((m) => (
                    <option key={m.monthIndex} value={m.monthIndex}>
                      Month {m.monthIndex}: {m.monthName} ({m.masaAscendantSign})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Month Detail */}
            {(() => {
              const m = varshaReport.masaPravesha.months.find((x) => x.monthIndex === selectedMasaMonth) || varshaReport.masaPravesha.months[0];
              if (!m) return null;
              return (
                <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase text-amber-900">
                      Month {m.monthIndex}: {m.monthName}
                    </span>
                    <span className="text-xs font-mono text-slate-600">
                      Ingress: {new Date(m.exactReturnInstantUtcIso).toUTCString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-amber-100">
                      <div className="text-[10px] text-slate-500">Masa Lagna</div>
                      <div className="font-bold text-slate-900 text-sm">{m.masaAscendantSign} ({m.masaAscendantLord})</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-amber-100">
                      <div className="text-[10px] text-slate-500">Masa Muntha</div>
                      <div className="font-bold text-slate-900 text-sm">{m.masaMunthaSign} ({m.masaMunthesha})</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-amber-100">
                      <div className="text-[10px] text-slate-500">Sun Target Degree</div>
                      <div className="font-bold text-slate-900 text-sm">{m.targetSunLongitudeDeg.toFixed(2)}°</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-700">
                    Forecast: <strong>{m.favorableTheme} {m.challengingTheme}</strong>
                  </div>
                </div>
              );
            })()}

            {/* Grid of all 12 months */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 pt-2">
              {(varshaReport?.masaPravesha?.months || []).map((m) => (
                <button
                  key={m.monthIndex}
                  onClick={() => setSelectedMasaMonth(m.monthIndex)}
                  className={`p-3 rounded-2xl border text-left space-y-1 transition-all ${
                    selectedMasaMonth === m.monthIndex
                      ? "bg-amber-100/70 border-amber-400 shadow-xs"
                      : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="text-[10px] font-bold text-slate-500 uppercase">M{m.monthIndex}</div>
                  <div className="text-xs font-bold text-slate-900 truncate">{m.masaAscendantSign}</div>
                  <div className="text-[10px] text-slate-600 truncate">{new Date(m.exactReturnInstantUtcIso).toLocaleDateString()}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. TRI-PATAKI CHAKRA */}
      {activeTab === "tripataki" && (
        <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Tri-Pataki Chakra (3-Flag Annual Vedha Canvas)
              </h3>
              <p className="text-xs text-slate-600">
                Evaluates cross-flag Vedha piercing between transiting planets and sensitive points (Varsha Lagna, Varsha Moon, Natal Moon, Muntha).
              </p>
            </div>
            <AstroBadge label={`Net Score: ${varshaReport.triPatakiChakra.netAfflictionScore}`} variant="gold" size="sm" />
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700">
            {varshaReport.triPatakiChakra.synthesisJudgment}
          </div>

          {varshaReport?.triPatakiChakra?.vedhasDetected && varshaReport.triPatakiChakra.vedhasDetected.length > 0 ? (
            <div className="space-y-2">
              <h4 className="font-serif text-sm font-bold text-slate-900">Active Vedhas Detected:</h4>
              {(varshaReport?.triPatakiChakra?.vedhasDetected || []).map((v, i) => (
                <div key={i} className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <strong className="text-slate-900">{v.aspectingPlanet}</strong> ({v.aspectingNature}) &rarr; <strong className="text-slate-900">{v.targetSensitivePoint}</strong>
                    <div className="text-[11px] text-slate-500">Vedha Type: {v.vedhaType} • Target Sign: {v.targetSign}</div>
                  </div>
                  <div className="text-right text-xs font-semibold text-slate-700">
                    {v.severity}: {v.effectDescription}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-emerald-800 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              No severe malefic Vedhas piercing the key annual reference points.
            </div>
          )}
        </div>
      )}

      {/* 7. METHODOLOGY & AUDIT */}
      {activeTab === "methodology" && (
        <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Tajika Methodology Profile & Mathematical Provenance
              </h3>
              <p className="text-xs text-slate-600">
                Explicit calculation bindings, numerical convergence proof, and shastric sources.
              </p>
            </div>
            <AstroBadge label={varshaReport.methodologyProfile.system} variant="slate" size="sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Calculation Metadata */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Engine Configuration</h4>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Ayanamsha:</span>
                  <span className="font-mono font-bold text-slate-900">{varshaReport.methodologyProfile.ayanamsha}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">House System:</span>
                  <span className="font-mono font-bold text-slate-900">{varshaReport.methodologyProfile.houseSystem}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Annual Return Method:</span>
                  <span className="font-mono font-bold text-slate-900">{varshaReport.methodologyProfile.annualChartMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Year Convention:</span>
                  <span className="font-mono font-bold text-slate-900">{varshaReport.methodologyProfile.yearLengthConvention}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Varshesha Profile:</span>
                  <span className="font-mono font-bold text-slate-900">{varshaReport.methodologyProfile.varsheshaSelectionProfile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Saham Shodhana:</span>
                  <span className="font-mono font-bold text-slate-900">{varshaReport.methodologyProfile.sahamShodhanaProfile}</span>
                </div>
              </div>
            </div>

            {/* Solar Return Convergence Proof */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Numerical Convergence Proof</h4>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Convergence Status:</span>
                  <span className="font-mono font-bold text-emerald-700">{varshaReport.solarReturnConvergence.convergenceStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Residual Error:</span>
                  <span className="font-mono font-bold text-slate-900">{varshaReport.solarReturnConvergence.convergenceError.toFixed(4)}&quot; arcsec</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Newton Iterations:</span>
                  <span className="font-mono font-bold text-slate-900">{varshaReport.solarReturnConvergence.iterations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Natal Sun:</span>
                  <span className="font-mono font-bold text-slate-900">{varshaReport.solarReturnConvergence.natalSunLongitude.toFixed(5)}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Achieved Sun:</span>
                  <span className="font-mono font-bold text-slate-900">{varshaReport.solarReturnConvergence.targetLongitude.toFixed(5)}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ephemeris Mode:</span>
                  <span className="font-mono font-bold text-slate-900">{varshaReport.solarReturnConvergence.ephemerisProvider}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
