import React, { useState } from "react";
import {
  Activity,
  Radio,
  Zap,
  ShieldCheck,
  AlertOctagon,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  Info,
  CheckCircle2
} from "lucide-react";
import { SAMPLE_GEOPATHIC_POINTS } from "../../engine/vastu/vastuEngine";
import { GeopathicPoint, GeopathicRadiationType } from "../../types/vastuTypes";

export const GeopathicStressScanner: React.FC = () => {
  const [showHartmann, setShowHartmann] = useState(true);
  const [showCurry, setShowCurry] = useState(true);
  const [showWaterVeins, setShowWaterVeins] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState<GeopathicPoint>(SAMPLE_GEOPATHIC_POINTS[0]);
  const [bovisRating, setBovisRating] = useState<number>(4500); // 4500 Bovis default

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Radio className="w-3.5 h-3.5 text-violet-600" />
            <span>Earth Bio-Radiation &amp; Dowsing Grid</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            Geopathic Stress &amp; Earth Energy Scanner
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Detect subtle earth radiations—Hartmann Grid, Curry Net, and subterranean water veins—that cause chronic fatigue, sleep disorders, and cellular stress. Neutralize them using non-invasive geo-dowsing blockers.
          </p>
        </div>

        {/* Layer Toggles */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setShowHartmann(!showHartmann)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              showHartmann
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Hartmann Net (N-S)
          </button>
          <button
            onClick={() => setShowCurry(!showCurry)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              showCurry
                ? "bg-violet-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Curry Grid (Diagonal)
          </button>
          <button
            onClick={() => setShowWaterVeins(!showWaterVeins)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              showWaterVeins
                ? "bg-sky-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Water Veins
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Earth Energy Dowsing Stage */}
        <div className="lg:col-span-7 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5">
              <Activity className="w-4 h-4" /> Real-Time Energy Grid Overlay
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-mono">
              Click any radiation node to inspect
            </span>
          </div>

          <div className="relative w-full aspect-square max-w-lg mx-auto bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-inner flex items-center justify-center">
            {/* Architectural Layout Underlay */}
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
            >
              {/* Outer boundary */}
              <rect x="20" y="20" width="360" height="360" fill="none" stroke="#475569" strokeWidth="3" />
              {/* Internal walls */}
              <line x1="20" y1="200" x2="380" y2="200" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="200" y1="20" x2="200" y2="380" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
              <rect x="35" y="35" width="150" height="150" fill="none" stroke="#334155" strokeWidth="1.5" />
              <rect x="215" y="35" width="150" height="150" fill="none" stroke="#334155" strokeWidth="1.5" />
              <rect x="35" y="215" width="150" height="150" fill="none" stroke="#334155" strokeWidth="1.5" />
              <rect x="215" y="215" width="150" height="150" fill="none" stroke="#334155" strokeWidth="1.5" />
            </svg>

            {/* Hartmann Grid Lines (North-South & East-West ~2.5m spacing) */}
            {showHartmann && (
              <svg
                viewBox="0 0 400 400"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                {[60, 120, 180, 240, 300, 360].map((pos) => (
                  <g key={`h-lines-${pos}`}>
                    <line
                      x1={pos}
                      y1="0"
                      x2={pos}
                      y2="400"
                      stroke="#f59e0b"
                      strokeWidth="1"
                      strokeOpacity="0.3"
                      strokeDasharray="2 2"
                    />
                    <line
                      x1="0"
                      y1={pos}
                      x2="400"
                      y2={pos}
                      stroke="#f59e0b"
                      strokeWidth="1"
                      strokeOpacity="0.3"
                      strokeDasharray="2 2"
                    />
                  </g>
                ))}
              </svg>
            )}

            {/* Curry Net (Diagonal 45° Earth Lines) */}
            {showCurry && (
              <svg
                viewBox="0 0 400 400"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                {[-200, -100, 0, 100, 200, 300, 400, 500, 600].map((c) => (
                  <g key={`c-lines-${c}`}>
                    <line
                      x1={c}
                      y1="0"
                      x2={c + 400}
                      y2="400"
                      stroke="#8b5cf6"
                      strokeWidth="1"
                      strokeOpacity="0.25"
                    />
                    <line
                      x1={c + 400}
                      y1="0"
                      x2={c}
                      y2="400"
                      stroke="#8b5cf6"
                      strokeWidth="1"
                      strokeOpacity="0.25"
                    />
                  </g>
                ))}
              </svg>
            )}

            {/* Subterranean Water Vein River Flow */}
            {showWaterVeins && (
              <svg
                viewBox="0 0 400 400"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <path
                  d="M 30 140 Q 150 180, 240 260 T 370 340"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="8"
                  strokeOpacity="0.4"
                  strokeLinecap="round"
                />
                <path
                  d="M 30 140 Q 150 180, 240 260 T 370 340"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeOpacity="0.8"
                  strokeDasharray="6 6"
                />
              </svg>
            )}

            {/* Interactive Radiation Nodes */}
            {SAMPLE_GEOPATHIC_POINTS.map((pt) => {
              const isSelected = selectedPoint.id === pt.id;
              return (
                <button
                  key={pt.id}
                  onClick={() => {
                    setSelectedPoint(pt);
                    setBovisRating(pt.intensityBovis);
                  }}
                  style={{ left: `${pt.xPct}%`, top: `${pt.yPct}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer transition-all duration-300 z-20 ${
                    isSelected
                      ? "ring-4 ring-rose-400 bg-rose-500 scale-125 shadow-lg shadow-rose-500/50"
                      : "bg-rose-600/80 hover:scale-110 shadow-md"
                  }`}
                >
                  <AlertOctagon className="w-4 h-4 text-white animate-pulse" />
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-2">
            <span>● Yellow: Hartmann Net (2.5m)</span>
            <span>● Purple: Curry Grid (45°)</span>
            <span>● Blue: Underground Vein</span>
          </div>
        </div>

        {/* Right Column: Node Diagnostics & Bovis Biometer */}
        <div className="lg:col-span-5 space-y-6">
          {/* Selected Radiation Node Details */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                Selected Radiation Hotspot
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 text-xs font-mono font-bold">
                {selectedPoint.type}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Subtle Earth Disturbance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When a human body sleeps or works for 6+ hours over a crossing node of this earth grid, cellular voltage drops from -70mV to -15mV, preventing DNA regeneration.
              </p>
            </div>

            {/* Health Symptoms Checklist */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold text-slate-800 block">
                Associated Clinical &amp; Energetic Symptoms:
              </span>
              <ul className="space-y-1">
                {selectedPoint.healthRisks.map((risk, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Non-Destructive Neutralizer */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                Bio-Energetic Remedy Protocol:
              </span>
              <p className="text-xs text-amber-950 font-medium leading-relaxed">
                {selectedPoint.remedyAction}
              </p>
            </div>
          </div>

          {/* Bovis Energy Biometer */}
          <div className="bg-slate-950 text-white p-6 rounded-3xl border border-violet-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-300">
                Bovis Biometer (Pranic Vitality)
              </span>
              <span className="text-xs font-mono text-amber-300 font-bold">
                {bovisRating.toLocaleString()} Bovis Units
              </span>
            </div>

            <div className="space-y-2">
              <input
                type="range"
                min="1000"
                max="18000"
                step="250"
                value={bovisRating}
                onChange={(e) => setBovisRating(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1,000 (Cancer / Toxic)</span>
                <span>6,500 (Healthy Human)</span>
                <span>18,000 (Spiritual Shrine)</span>
              </div>
            </div>

            <div
              className={`p-3 rounded-2xl border text-xs leading-relaxed ${
                bovisRating < 5000
                  ? "bg-rose-950/60 border-rose-500/30 text-rose-200"
                  : bovisRating <= 8000
                  ? "bg-amber-950/60 border-amber-500/30 text-amber-200"
                  : "bg-emerald-950/60 border-emerald-500/30 text-emerald-200"
              }`}
            >
              {bovisRating < 5000 ? (
                <strong>
                  ⚠️ Depleting Radiation Zone: Cellular fatigue, restless sleep. Requires copper spiral deflection.
                </strong>
              ) : bovisRating <= 8000 ? (
                <strong>
                  ⚖️ Balanced Vitality: Suitable for human residence and sustained work productivity.
                </strong>
              ) : (
                <strong>
                  ✨ High Vibrational Prana: Excellent spiritual vortex for meditation, altar, and deep healing.
                </strong>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
