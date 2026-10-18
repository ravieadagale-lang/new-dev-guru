import React, { useState } from "react";
import {
  Compass,
  Activity,
  Layers,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  Clock,
  Briefcase,
  Heart,
  GraduationCap,
  Home,
  Plane,
  Coins,
  ShieldAlert,
  ChevronRight,
  Info
} from "lucide-react";
import { MasterKPEngine } from "../../engine/kp/masterKpEngine";

interface KPWorkspaceViewProps {
  planets: Record<string, { longitude: number; isRetrograde?: boolean; name?: string; dignity?: string }>;
  ascendantLongitude: number;
  moonLongitude: number;
  cuspLongitudes?: Record<number, number>;
  birthDate?: Date;
}

export const KPWorkspaceView: React.FC<KPWorkspaceViewProps> = ({
  planets,
  ascendantLongitude,
  moonLongitude,
  cuspLongitudes,
  birthDate = new Date("1990-05-15T10:00:00Z"),
}) => {
  const [selectedSubTab, setSelectedSubTab] = useState<"cusps" | "significators" | "ruling_planets" | "event_analytics" | "sub_table_249">("cusps");
  const [selectedPlanetForChain, setSelectedPlanetForChain] = useState<string>("Sun");
  const [selectedEventCategory, setSelectedEventCategory] = useState<string>("Career Promotion / Elevation");

  // Compute master KP report deterministically
  const kpReport = MasterKPEngine.calculateMasterKP({
    ascendantLongitude,
    moonLongitude,
    birthDate,
    planets,
    cuspLongitudes,
    queryDate: new Date(),
  });

  const {
    cusps = [],
    significators = {},
    rulingPlanets = {} as any,
    eventEvaluations = [],
  } = kpReport || {};

  const planetSignificatorList = React.useMemo(() => {
    if (Array.isArray(significators)) return significators;
    if (significators?.planetSignificators && Array.isArray(significators.planetSignificators)) {
      return significators.planetSignificators;
    }
    return Object.values(significators || {}).filter(
      (s: any) => s && typeof s === "object" && typeof s.planet === "string"
    );
  }, [significators]);

  const activeChainData = React.useMemo(() => {
    return (significators as any)?.[selectedPlanetForChain]?.fourStepChain ||
      planetSignificatorList.find((p: any) => p.planet === selectedPlanetForChain)?.fourStepChain;
  }, [significators, selectedPlanetForChain, planetSignificatorList]);

  const eventIcons: Record<string, any> = {
    "Career Promotion / Elevation": Briefcase,
    "Marriage / Partnership Fruition": Heart,
    "Higher Education / Academic Success": GraduationCap,
    "Real Estate / Property Acquisition": Home,
    "Foreign Travel / Relocation": Plane,
    "Financial Windfall / Wealth Accumulation": Coins,
    "Litigation / Legal Dispute Resolution": ShieldAlert,
    "Health Recovery / Vitality Restoration": Activity,
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
                Phase 6 KP Astrology Engine
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                Krishnamurti Paddhati (249 Sub-Divisions)
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1.5">
              KP Cuspal Sub-Lords, 4-Step Significators &amp; Event Fruition
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 max-w-3xl">
              Placidus semi-arc cusp division, 249 unequal sub-lord hierarchy based on Vimshottari dasha spans, 4-Tier ABCD planetary house significators, 4-step theory chain verification, and ruling planets horary engine.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-blue-950 text-blue-200 px-4 py-2 rounded-2xl text-xs font-bold shadow-xs">
            <Compass className="w-4 h-4 text-blue-400" />
            <span>KP New Ayanamsha Applied</span>
          </div>
        </div>

        {/* View Sub-Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 pt-3">
          {[
            { id: "cusps", label: "12 Cuspal Sub-Lords", icon: Layers },
            { id: "significators", label: "4-Tier ABCD Significators", icon: Activity },
            { id: "ruling_planets", label: "Ruling Planets (RP)", icon: Clock },
            { id: "event_analytics", label: `Life Event Timing (${eventEvaluations.length})`, icon: TrendingUp },
            { id: "sub_table_249", label: "249 Sub Table Inspector", icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedSubTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-blue-900 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. 12 CUSPAL SUB-LORDS TABLE */}
      {selectedSubTab === "cusps" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-serif text-xl font-bold text-slate-900">
              12 Placidus House Cusps &amp; Sub-Lord Allocations
            </h4>
            <span className="text-xs text-slate-500 font-medium">
              Sub-Lord determines the fruitful promise of the bhava
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="py-2.5 px-3">Cusp</th>
                  <th className="py-2.5 px-3">Degree (DMS)</th>
                  <th className="py-2.5 px-3">Sign (Rashi)</th>
                  <th className="py-2.5 px-3">Sign Lord (RL)</th>
                  <th className="py-2.5 px-3">Star Lord (NL)</th>
                  <th className="py-2.5 px-3 text-blue-900 bg-blue-50/70">Sub-Lord (SL)</th>
                  <th className="py-2.5 px-3">Sub-Sub (SSL)</th>
                  <th className="py-2.5 px-3">Sub No.</th>
                  <th className="py-2.5 px-3">Signified Houses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cusps.map((c, idx) => (
                  <tr key={c.houseNumber ?? c.cuspNumber ?? idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-slate-900">
                      Cusp {c.houseNumber ?? c.cuspNumber ?? (idx + 1)}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">
                      {c.dms || c.longitudeFormatted || "-"}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">
                      {c.signName || "-"}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-700">
                      {c.signLord || "-"}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-700">
                      {c.starLord || "-"}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-blue-900 bg-blue-50/50">
                      {c.subLord || "-"}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      {c.subSubLord || "-"}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                      #{c.subNumber ?? (idx + 1)}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-medium">
                        [{c.signifiedHouses?.join(", ") || "None"}]
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. 4-TIER ABCD SIGNIFICATORS & 4-STEP CHAIN VIEW */}
      {selectedSubTab === "significators" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
            <h4 className="font-serif text-xl font-bold text-slate-900">
              KP 4-Tier ABCD House Significator Hierarchy
            </h4>
            <p className="text-xs text-slate-600">
              Level A: Houses occupied by Star Lord (Strongest) • Level B: Houses occupied by Planet • Level C: Houses owned by Star Lord • Level D: Houses owned by Planet (Weakest).
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                    <th className="py-2.5 px-3">Planet</th>
                    <th className="py-2.5 px-3 text-purple-900">Level A (Strongest)</th>
                    <th className="py-2.5 px-3 text-indigo-900">Level B (Strong)</th>
                    <th className="py-2.5 px-3 text-blue-900">Level C (Moderate)</th>
                    <th className="py-2.5 px-3 text-slate-700">Level D (Basic)</th>
                    <th className="py-2.5 px-3">All Signified</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {planetSignificatorList.map((sig: any) => (
                    <tr key={sig.planet} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-slate-900">
                        {sig.planet}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-purple-900">
                        [{(sig.levelA_Houses || sig.levelA)?.join(", ") || "-"}]
                      </td>
                      <td className="py-2.5 px-3 font-medium text-indigo-900">
                        [{(sig.levelB_Houses || sig.levelB)?.join(", ") || "-"}]
                      </td>
                      <td className="py-2.5 px-3 text-blue-900">
                        [{(sig.levelC_Houses || sig.levelC)?.join(", ") || "-"}]
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">
                        [{(sig.levelD_Houses || sig.levelD)?.join(", ") || "-"}]
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">
                        [{sig.allSignifiedHouses?.join(", ") || "-"}]
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4-Step Chain Viewer */}
          <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <h4 className="font-serif text-lg font-bold text-slate-900">
                  KP 4-Step Theory Chain Verification
                </h4>
                <p className="text-xs text-slate-600">
                  Step 1 (Planet) → Step 2 (Star Lord) → Step 3 (Sub Lord) → Step 4 (Sub Lord's Star Lord)
                </p>
              </div>

              {/* Planet Selector */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1">
                {(planetSignificatorList.length > 0
                  ? planetSignificatorList.map((p: any) => p.planet)
                  : ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"]
                ).map((pName: string) => (
                  <button
                    key={pName}
                    onClick={() => setSelectedPlanetForChain(pName)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      selectedPlanetForChain === pName
                        ? "bg-blue-900 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {pName}
                  </button>
                ))}
              </div>
            </div>

            {activeChainData && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1">
                  <div className="text-[10px] font-bold text-blue-900 uppercase">
                    Step 1: Source Planet
                  </div>
                  <div className="font-serif text-base font-bold text-slate-900">
                    {activeChainData.step1_Planet?.planet || selectedPlanetForChain}
                  </div>
                  <div className="text-slate-600">
                    Occupies: House {activeChainData.step1_Planet?.houseOccupied ?? "-"}
                  </div>
                  <div className="text-slate-600">
                    Owns: Houses [{activeChainData.step1_Planet?.housesOwned?.join(", ") || "-"}]
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-1">
                  <div className="text-[10px] font-bold text-indigo-900 uppercase">
                    Step 2: Star Lord (Results)
                  </div>
                  <div className="font-serif text-base font-bold text-slate-900">
                    {activeChainData.step2_StarLord?.starLord || "-"}
                  </div>
                  <div className="text-slate-600">
                    Occupies: House {activeChainData.step2_StarLord?.houseOccupied ?? "-"}
                  </div>
                  <div className="text-slate-600">
                    Owns: Houses [{activeChainData.step2_StarLord?.housesOwned?.join(", ") || "-"}]
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1">
                  <div className="text-[10px] font-bold text-purple-900 uppercase">
                    Step 3: Sub Lord (Qualifies)
                  </div>
                  <div className="font-serif text-base font-bold text-slate-900">
                    {activeChainData.step3_SubLord?.subLord || "-"}
                  </div>
                  <div className="text-slate-600">
                    Occupies: House {activeChainData.step3_SubLord?.houseOccupied ?? "-"}
                  </div>
                  <div className="text-slate-600">
                    Owns: Houses [{activeChainData.step3_SubLord?.housesOwned?.join(", ") || "-"}]
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                  <div className="text-[10px] font-bold text-emerald-900 uppercase">
                    Step 4: Sub's Star Lord (Final)
                  </div>
                  <div className="font-serif text-base font-bold text-slate-900">
                    {activeChainData.step4_SubLordStarLord?.starLord || "-"}
                  </div>
                  <div className="text-slate-600">
                    Occupies: House {activeChainData.step4_SubLordStarLord?.houseOccupied ?? "-"}
                  </div>
                  <div className="text-slate-600">
                    Owns: Houses [{activeChainData.step4_SubLordStarLord?.housesOwned?.join(", ") || "-"}]
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. KP RULING PLANETS (RP) VIEW */}
      {selectedSubTab === "ruling_planets" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { label: "Ascendant Star Lord", val: rulingPlanets.ascendantStarLord || rulingPlanets.ascStarLord || "—", sub: "Primary RP" },
              { label: "Ascendant Sign Lord", val: rulingPlanets.ascendantSignLord || rulingPlanets.ascSignLord || "—", sub: "Ruling Sign" },
              { label: "Moon Star Lord", val: rulingPlanets.moonStarLord || "—", sub: "Mental Channel" },
              { label: "Moon Sign Lord", val: rulingPlanets.moonSignLord || "—", sub: "Emotional Ground" },
              { label: "Day Lord (Vara Nath)", val: rulingPlanets.dayLord || "—", sub: "Diurnal Ruler" },
            ].map((rp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-1 text-center"
              >
                <div className="text-[10px] font-bold text-blue-900 uppercase">
                  {rp.label}
                </div>
                <div className="font-serif text-2xl font-bold text-slate-900">
                  {rp.val}
                </div>
                <div className="text-[11px] text-slate-500">{rp.sub}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">
              Ruling Planets Potency &amp; Node Representation
            </h4>
            <p className="text-xs text-slate-600">
              Nodes Rahu and Ketu act as powerful representatives for their sign dispositors and planets aspecting or conjoining them.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-900">
                Primary Ruling Planets (Combined):
              </div>
              <div className="flex flex-wrap gap-2">
                {(rulingPlanets.primaryRulingPlanets || rulingPlanets.combinedRulingPlanets || []).map((rp: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-blue-900 text-white font-bold"
                  >
                    #{i + 1} {rp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. LIFE EVENT TIMING & PROMISE ANALYTICS */}
      {selectedSubTab === "event_analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventEvaluations.map((ev, idx) => {
              const domainTitle = ev.domainName || ev.eventName || "Life Domain";
              const Icon = eventIcons[domainTitle] || Sparkles;
              const subLordHouses = ev.cuspalSubLordHousesSignified || ev.primaryHouses || [];
              const supportingHouses = ev.supportingHousesConnected || ev.supportingHouses || [];
              const favPlanets = ev.favorablePlanets || [];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-5 border border-amber-900/10 shadow-xs space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-blue-50 text-blue-900">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-serif text-base font-bold text-slate-900">
                          {domainTitle}
                        </h4>
                        <div className="text-[11px] text-slate-500">
                          Primary Cusp: {ev.primaryCusp ?? ev.primaryHouses?.[0] ?? "-"} • Supporting: [{supportingHouses.join(", ") || "-"}]
                        </div>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                        ev.isEventPromised
                          ? "bg-emerald-100 text-emerald-900"
                          : "bg-rose-100 text-rose-900"
                      }`}
                    >
                      {ev.isEventPromised ? "Promised" : "Unfavorable"} ({ev.fructificationStrengthPct ?? 0}%)
                    </span>
                  </div>

                  <div className="text-xs text-slate-700 space-y-1.5 pt-1 border-t border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cuspal Sub-Lord:</span>
                      <span className="font-bold text-blue-900">{ev.cuspalSubLord || "-"} (NL: {ev.cuspalSubLordStarLord || "-"})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Sub-Lord Signifies:</span>
                      <span className="font-medium text-slate-800">[{subLordHouses.join(", ") || "-"}]</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Favorable Planets:</span>
                      <span className="font-medium text-emerald-800">{favPlanets.join(", ") || "None"}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                    {ev.timingSummary || ev.notes || ""}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. 249 SUB TABLE INSPECTOR */}
      {selectedSubTab === "sub_table_249" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h4 className="font-serif text-xl font-bold text-slate-900">
                KP 249 Unequal Sub-Lord Division Architecture &amp; Table
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                The 360° zodiac comprises 27 nakshatras × 9 sub-lords = <strong>243 base subdivisions</strong>. Exactly <strong>6 subdivisions</strong> span across sign boundaries, splitting into two entries each to yield the classical <strong>249 KP Table</strong>.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-950 text-xs font-bold">
                243 Base + 6 Splits = 249 Entries
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs text-blue-950 space-y-2">
            <div className="font-bold">Mathematical Invariant Formula:</div>
            <div className="font-mono bg-white p-2.5 rounded-xl border border-blue-100">
              Sub Span (arc-minutes) = (13° 20' = 800') × (Dasha Years / 120)
            </div>
            <p className="text-[11px] text-blue-900">
              Ketu (7y): 46'40" | Venus (20y): 2°13'20" | Sun (6y): 40'00" | Moon (10y): 1°06'40" | Mars (7y): 46'40" | Rahu (18y): 2°00'00" | Jupiter (16y): 1°46'40" | Saturn (19y): 2°06'40" | Mercury (17y): 1°53'20"
            </p>
          </div>

          {/* 6 Boundary Splits Callout */}
          <div className="space-y-2">
            <h5 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
              The 6 Sign Boundary Splits (Cross-Zodiac Anchors)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
              {[
                { no: 1, nak: "Krittika (Sun)", sub: "Sun", deg: "30°", from: "Aries", to: "Taurus" },
                { no: 2, nak: "Mrigashira (Mars)", sub: "Mars", deg: "60°", from: "Taurus", to: "Gemini" },
                { no: 3, nak: "Punarvasu (Jupiter)", sub: "Jupiter", deg: "90°", from: "Gemini", to: "Cancer" },
                { no: 4, nak: "Uttara Phalguni (Sun)", sub: "Sun", deg: "150°", from: "Leo", to: "Virgo" },
                { no: 5, nak: "Chitra (Mars)", sub: "Mars", deg: "180°", from: "Virgo", to: "Libra" },
                { no: 6, nak: "Vishakha (Jupiter)", sub: "Jupiter", deg: "210°", from: "Libra", to: "Scorpio" },
              ].map((split) => (
                <div key={split.no} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-blue-900">Split #{split.no} @ {split.deg}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">Boundary Split</span>
                  </div>
                  <div className="text-[11px] text-slate-700">
                    Nakshatra: <strong className="text-slate-900">{split.nak}</strong>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Sub-Lord: <strong className="text-slate-800">{split.sub}</strong> ({split.from} → {split.to})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
