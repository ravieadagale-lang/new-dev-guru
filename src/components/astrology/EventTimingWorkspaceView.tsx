import React, { useState, useMemo } from "react";
import { 
  Clock, 
  Calendar, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  Info
} from "lucide-react";
import { MasterEventTimingEngine } from "../../engine/eventTiming/masterEventTimingEngine";
import { EventLifeDomain } from "../../engine/eventTiming/eventTimingTypes";
import { DOMAIN_VARGA_REGISTRY } from "../../engine/eventTiming/domainVargaRegistry";
import { AstroBadge } from "../astronext/AstroDesignSystem";

interface EventTimingWorkspaceViewProps {
  natalAscendantLongitude?: number;
  planets?: Record<string, { longitude: number; name?: string; isRetrograde?: boolean; speedLongitudeDegPerDay?: number; dignity?: string }>;
  houseLords?: Record<number, string>;
  dignities?: Record<string, string>;
}

export const EventTimingWorkspaceView: React.FC<EventTimingWorkspaceViewProps> = ({
  natalAscendantLongitude = 45.0,
  planets = {
    Sun: { longitude: 120.0, name: "Sun" },
    Moon: { longitude: 50.0, name: "Moon" },
    Mars: { longitude: 280.0, name: "Mars" },
    Mercury: { longitude: 140.0, name: "Mercury" },
    Jupiter: { longitude: 35.0, name: "Jupiter" },
    Venus: { longitude: 40.0, name: "Venus" },
    Saturn: { longitude: 310.0, name: "Saturn" },
  },
  houseLords = { 1: "Venus", 10: "Saturn", 9: "Saturn", 11: "Jupiter", 2: "Mercury", 7: "Mars" },
  dignities = { Saturn: "Own Sign (Svasthe)", Jupiter: "Exalted (Uchcha)", Venus: "Own Sign" },
}) => {
  const [selectedDomain, setSelectedDomain] = useState<EventLifeDomain>("Career & Professional Elevation");
  const [evalDate, setEvalDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<"windows" | "promise" | "streams" | "transits">("windows");

  const domainsList: EventLifeDomain[] = [
    "Career & Professional Elevation",
    "Marriage & Relationship Union",
    "Wealth Accumulation & Financial Realization",
    "Property & Real Estate Acquisition",
    "Children & Progeny Blessings",
    "Foreign Travel & Relocation",
    "Health Vitality & Medical Healing",
    "Higher Education & Academic Honors",
    "Litigation & Legal Victory",
  ];

  // Execute Master Event Timing Engine deterministically
  const timingReport = useMemo(() => {
    const formattedPlanets: Record<string, { longitude: number; name: string }> = {};
    Object.entries(planets).forEach(([k, v]) => {
      formattedPlanets[k] = {
        name: v.name || k,
        longitude: v.longitude,
      };
    });

    return MasterEventTimingEngine.calculateMasterEventTiming({
      domain: selectedDomain,
      evalDate,
      natalAscendantLongitude,
      planets: formattedPlanets,
      houseLords,
      dignities,
      currentDasha: { maha: "Saturn", antar: "Jupiter", pratyantar: "Venus" },
      charaDashaSign: "Aquarius",
      transitPlanets: {
        jupiterLongitude: 35.0,
        saturnLongitude: 310.0,
        rahuLongitude: 330.0,
      },
      savPoints: { 10: 32, 11: 35, 1: 30, 7: 29 },
      varshaphalaData: {
        year: 2026,
        varshaAscSign: "Taurus",
        munthaHouse: 10,
        munthesha: "Saturn",
        sahamSign: "Aquarius",
        sahamHouse: 10,
        favorableTajikaYogasCount: 3,
      },
    });
  }, [selectedDomain, evalDate, natalAscendantLongitude, planets, houseLords, dignities]);

  const domainSpec = DOMAIN_VARGA_REGISTRY[selectedDomain];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Event Timing Confluence Engine
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Multi-Methodology Deterministic Synthesis
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              Event Timing: {selectedDomain}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Domain:</span>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value as EventLifeDomain)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {domainsList.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sub-Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 pt-3">
          {[
            { id: "windows", label: "Deterministic Event Windows", count: timingReport.eventWindows.length },
            { id: "promise", label: "Natal Promise & Vargas" },
            { id: "streams", label: "5 Independent Evidence Streams", count: timingReport.multiSystemStreams.length },
            { id: "transits", label: "Double Transit Sanction (Jupiter + Saturn)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-slate-900 text-purple-300 shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === tab.id ? "bg-purple-400/20 text-purple-200" : "bg-slate-200 text-slate-600"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 1. DETERMINISTIC EVENT WINDOWS */}
      {activeTab === "windows" && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Synthesized Predictive Event Windows
                </h3>
                <p className="text-xs text-slate-600">
                  Calculated from intersecting Parashari Vimshottari dasha sub-periods, Jaimini Chara dasha, and Gochara double transits.
                </p>
              </div>
              <AstroBadge
                label={`Confluence: ${timingReport.confluenceSynthesis.overallConfluence}`}
                variant="gold"
                size="md"
              />
            </div>

            <div className="space-y-3 pt-2">
              {(timingReport?.eventWindows || []).map((win) => (
                <div
                  key={win.windowId}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base font-bold text-slate-900">
                          {new Date(win.windowStartIso).toLocaleDateString("en-US", { month: "short", year: "numeric" })} &rarr; {new Date(win.windowEndIso).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-bold text-[10px]">
                          {win.precision}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono">
                        Rule Citations: {win.ruleCitations?.join(", ") || "—"}
                      </div>
                    </div>

                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                      Rating: {win.confluenceRating}
                    </span>
                  </div>

                  <p className="text-xs text-slate-800 font-medium">
                    {win.predictiveInterpretation}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-200">
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Primary Triggers</div>
                      <ul className="text-emerald-800 space-y-0.5 mt-0.5">
                        {(win?.primaryTriggers || []).map((t, i) => (
                          <li key={i}>• {t}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Supporting Factors</div>
                      <ul className="text-slate-700 space-y-0.5 mt-0.5">
                        {(win?.supportingFactors || []).map((f, i) => (
                          <li key={i}>• {f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. NATAL PROMISE & VARGAS */}
      {activeTab === "promise" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-2">
              <div className="text-[10px] font-bold uppercase text-slate-500">Natal Promise Status</div>
              <div className="text-xl font-serif font-bold text-slate-900">{timingReport.natalPromise.status}</div>
              <div className="text-xs text-slate-600">
                Primary House: <strong className="text-slate-900">House {timingReport.natalPromise.primaryHouseNumber} ({timingReport.natalPromise.primaryHouseSign})</strong>
              </div>
              <div className="text-xs text-slate-600">
                Primary Lord: <strong className="text-slate-900">{timingReport.natalPromise.primaryHouseLord}</strong> (Dignity: {timingReport.natalPromise.primaryLordDignity})
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-2">
              <div className="text-[10px] font-bold uppercase text-slate-500">Domain Varga Registry Spec</div>
              <div className="text-xl font-serif font-bold text-slate-900">
                {domainSpec?.primaryVargas?.map(v => v.vargaCode)?.join(", ") || "—"}
              </div>
              <div className="text-xs text-slate-600">
                Varga Details: <strong className="text-slate-900">{domainSpec?.primaryVargas?.map(v => `${v.vargaCode} (${v.vargaName})`)?.join(", ") || "—"}</strong>
              </div>
              <div className="text-xs text-slate-600">
                Natural Karakas: <strong className="text-slate-900">{domainSpec?.naturalKarakas?.join(", ") || "—"}</strong>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-2">
              <div className="text-[10px] font-bold uppercase text-slate-500">Secondary &amp; Supporting Houses</div>
              <div className="text-base font-bold text-slate-900">
                Houses {domainSpec?.secondaryHouses?.join(", ") || "—"}
              </div>
              <div className="text-xs text-slate-600">
                Primary Shastric Source: <span className="italic">{domainSpec?.shastricAuthority}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. 5 INDEPENDENT EVIDENCE STREAMS */}
      {activeTab === "streams" && (
        <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Multi-Methodology Evidence Partitioning
          </h3>
          <p className="text-xs text-slate-600">
            Every astrological methodology is evaluated in its own independent stream to preserve provenance and prevent black-box blending.
          </p>

          <div className="space-y-3">
            {(timingReport?.multiSystemStreams || []).map((stream, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{stream.system} Stream</span>
                    <span className="text-[10px] font-mono text-slate-500">{stream.shastricRuleCitations?.join(", ") || "—"}</span>
                  </div>
                  <div className="text-slate-800">{stream.primaryIndicators?.join(" • ") || "—"}</div>
                  <div className="text-[11px] text-slate-500">{stream.notes}</div>
                </div>

                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full font-bold text-xs ${
                    stream.disposition === "Supporting"
                      ? "bg-emerald-100 text-emerald-900"
                      : stream.disposition === "Contradicting"
                      ? "bg-rose-100 text-rose-900"
                      : "bg-slate-200 text-slate-700"
                  }`}>
                    {stream.disposition}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. DOUBLE TRANSIT SANCTION */}
      {activeTab === "transits" && (
        <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Double Transit Sanction (K.N. Rao Standard)
          </h3>
          <p className="text-xs text-slate-600">
            Major life events require simultaneous Gochara sanction from both Jupiter (catalyst of growth) and Saturn (lord of fruition and karma).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
              <div className="text-xs font-bold text-amber-900 uppercase">Jupiter Transit Influence</div>
              <div className="text-sm font-bold text-slate-900">
                {timingReport.transitActivation.jupiterAspectingDomainHouse ? "Active Sanction (Aspect / Conjunction)" : "Indirect Support"}
              </div>
              <div className="text-slate-600">
                Aspects 5th, 7th, 9th, or conjoins the domain house or its lord.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-2">
              <div className="text-xs font-bold text-indigo-900 uppercase">Saturn Transit Influence</div>
              <div className="text-sm font-bold text-slate-900">
                {timingReport.transitActivation.saturnAspectingDomainHouse ? "Active Sanction (Aspect / Conjunction)" : "Indirect Support"}
              </div>
              <div className="text-slate-600">
                Aspects 3rd, 7th, 10th, or conjoins the domain house or its lord.
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700">
            Ashtakavarga Bindu Support: <strong>{timingReport.transitActivation.ashtakavargaSavPointsInDomainHouse} SAV Points</strong> in domain house (&gt;= 28 points indicates strong manifestation power).
          </div>
        </div>
      )}
    </div>
  );
};
