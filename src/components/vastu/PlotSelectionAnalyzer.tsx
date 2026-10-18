import React, { useState, useMemo } from "react";
import {
  MapPin,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldAlert,
  HelpCircle,
  TrendingDown,
  Layers,
  Award
} from "lucide-react";
import {
  PlotShape,
  SlopeDirection,
  VeedhiShoolaThrust
} from "../../types/vastuTypes";
import { evaluatePlotSelection } from "../../engine/vastu/vastuEngine";

export const PlotSelectionAnalyzer: React.FC = () => {
  const [shape, setShape] = useState<PlotShape>("rectangular");
  const [slope, setSlope] = useState<SlopeDirection>("north_east_down");
  const [roadThrust, setRoadThrust] = useState<VeedhiShoolaThrust>("none");
  const [soilQuality, setSoilQuality] = useState<
    "Brahmin_White_Sweet" | "Kshatriya_Red_Astringent" | "Vaishya_Yellow_Sour" | "Shudra_Black_Bitter"
  >("Vaishya_Yellow_Sour");

  const plotResult = useMemo(() => {
    return evaluatePlotSelection(shape, slope, roadThrust, soilQuality);
  }, [shape, slope, roadThrust, soilQuality]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Vedic Bhoomi Pariksha &amp; Site Topography</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            Plot &amp; Land Selection Vastu Analyzer
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Evaluate open plots and real estate land parcels based on canonical shastras: geometric shape (Chatushkona vs. Gaumukhi vs. Shermukhi), natural slope gradient, Veedhi Shoola road thrusts, and soil prana tests.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900 text-white flex items-center gap-3 shrink-0">
          <div className="font-serif text-3xl font-black text-amber-300">
            {plotResult.overallScore}
          </div>
          <div className="text-left">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Land Suitability</span>
            <span className="text-xs font-bold text-emerald-400">{plotResult.suitability}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Selectors */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          {/* 1. Plot Geometry / Shape */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
              <span>1. Plot Shape &amp; Geometry</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Bhoomi Akriti</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { id: "square", label: "Square (Chatushkona)", desc: "1:1 Perfect Ratio" },
                { id: "rectangular", label: "Rectangular (Ayatakara)", desc: "1:1.5 or 1:2 Harmonious" },
                { id: "gaumukhi", label: "Gaumukhi (Cow Face)", desc: "Narrow Front, Wide Back" },
                { id: "shermukhi", label: "Shermukhi (Lion Face)", desc: "Wide Front, Narrow Back" },
                { id: "triangular", label: "Triangular (Trikona)", desc: "Acute Agni Angle" },
                { id: "irregular", label: "Irregular (Vishama)", desc: "Multiple Zig-zag Cuts" }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setShape(s.id as PlotShape)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    shape === s.id
                      ? "bg-slate-900 text-white font-bold border-slate-950 shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="text-xs font-bold">{s.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Slope Gradient */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
              <span>2. Natural Land Slope &amp; Drainage</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Bhoomi Dhalaan</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { id: "north_east_down", label: "North-East Downward", sub: "Most Auspicious" },
                { id: "east_down", label: "East Downward", sub: "Solar Vitality" },
                { id: "north_down", label: "North Downward", sub: "Liquid Wealth" },
                { id: "flat", label: "Completely Level / Flat", sub: "Neutral Balance" },
                { id: "south_down", label: "South Downward", sub: "Loss of Fame" },
                { id: "south_west_down", label: "South-West Downward", sub: "Severe Defect" }
              ].map((sl) => (
                <button
                  key={sl.id}
                  onClick={() => setSlope(sl.id as SlopeDirection)}
                  className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    slope === sl.id
                      ? "bg-amber-500 text-slate-950 font-bold border-amber-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="text-xs font-bold">{sl.label}</div>
                  <div className="text-[10px] opacity-80">{sl.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Road Thrust (Veedhi Shoola) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
              <span>3. Road Thrust / T-Junction Spear</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Veedhi Shoola</span>
            </label>
            <select
              value={roadThrust}
              onChange={(e) => setRoadThrust(e.target.value as VeedhiShoolaThrust)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white cursor-pointer"
            >
              <option value="none">None (Parallel Road or Normal Corner Plot)</option>
              <option value="north_east_hit">North-East Road Thrust (Auspicious Divine Growth)</option>
              <option value="north_hit">North Road Thrust (Favorable for Trade)</option>
              <option value="east_hit">East Road Thrust (Favorable for Social Status)</option>
              <option value="south_east_hit">South-East Road Thrust (Fire Hazard / Friction)</option>
              <option value="south_hit">South Road Thrust (Losses &amp; Quarrels)</option>
              <option value="south_west_hit">South-West Road Thrust (Severe Legal &amp; Financial Crisis)</option>
              <option value="west_hit">West Road Thrust (Fluctuating Profits)</option>
              <option value="north_west_hit">North-West Road Thrust (Restlessness &amp; Travel)</option>
            </select>
          </div>

          {/* 4. Vedic Soil Quality Test */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
              <span>4. Soil Color, Aroma &amp; Consistency</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Mrittika Pariksha</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                {
                  id: "Brahmin_White_Sweet",
                  title: "White / Pale Soil (Sweet Aroma)",
                  desc: "Ideal for study, temples, and tranquil residence."
                },
                {
                  id: "Kshatriya_Red_Astringent",
                  title: "Red / Terracotta Soil (Astringent)",
                  desc: "High mineral power; ideal for administrative & executive leaders."
                },
                {
                  id: "Vaishya_Yellow_Sour",
                  title: "Yellow / Sandy Loam (Sour)",
                  desc: "Commercial energy; ideal for merchants, shops, and trade."
                },
                {
                  id: "Shudra_Black_Bitter",
                  title: "Black Cotton Clay (Bitter / Damp)",
                  desc: "Retains high moisture; requires gravel/sand re-engineering."
                }
              ].map((sq) => (
                <button
                  key={sq.id}
                  onClick={() => setSoilQuality(sq.id as any)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    soilQuality === sq.id
                      ? "bg-slate-900 text-white font-bold border-slate-950 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="text-xs font-bold">{sq.title}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{sq.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Shastric Verdict & Non-Destructive Grounding Remedies */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-950 text-white p-6 rounded-3xl border border-amber-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Classical Shastric Verdict
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">
                Score: {plotResult.overallScore}/100
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 block">Identified Site Strengths:</span>
              <ul className="space-y-1.5">
                {plotResult.pros.map((pro, i) => (
                  <li key={i} className="text-xs text-emerald-300 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {plotResult.cons.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-xs font-bold text-rose-300 block">Topographical Deficiencies:</span>
                <ul className="space-y-1.5">
                  {plotResult.cons.map((con, i) => (
                    <li key={i} className="text-xs text-rose-200 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Rectification & Site Energizing Remedies */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Plot Rectification &amp; Boundary Remedies</span>
            </h4>

            {plotResult.remedies.length === 0 ? (
              <p className="text-xs text-slate-600 leading-relaxed">
                No corrective boundary treatments are required. The land's natural geometry and slope align seamlessly with classical Vastu principles.
              </p>
            ) : (
              <div className="space-y-2.5">
                {plotResult.remedies.map((rem, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 leading-relaxed font-medium"
                  >
                    <strong>Remedy {i + 1}:</strong> {rem}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
