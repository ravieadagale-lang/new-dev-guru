import React, { useState } from "react";
import {
  Compass,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  Shield,
  Search,
  Filter,
  ArrowRight,
  Info,
  DoorOpen
} from "lucide-react";
import { DEVATA_32_PADAS, MAHAVASTU_16_ZONES } from "../../engine/vastu/vastuEngine";
import { DevataPada } from "../../types/vastuTypes";

export const ShaktiChakraDeepDive: React.FC = () => {
  const [selectedPadaId, setSelectedPadaId] = useState<string>("N3");
  const [directionFilter, setDirectionFilter] = useState<"All" | "North" | "East" | "South" | "West">("All");
  const [auspiciousOnly, setAuspiciousOnly] = useState<boolean>(false);

  const selectedPada = DEVATA_32_PADAS.find((p) => p.id === selectedPadaId) || DEVATA_32_PADAS[2];

  const filteredPadas = DEVATA_32_PADAS.filter((p) => {
    if (directionFilter !== "All" && p.direction !== directionFilter) return false;
    if (auspiciousOnly && !p.isAuspicious) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              360° Shakti Chakra Engine
            </span>
            <span className="text-xs text-slate-400">32 Devata Padas & Entrance Door Analysis</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
            <Compass className="w-6 h-6 text-amber-400" />
            Sacred Shakti Chakra & The 32 Vedic Entrance Portals
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            The 32 Devata Padas govern all incoming prana into a building. Discover the 8 Auspicious Royal Doors and apply virtual doorway shifts for prohibited entrances.
          </p>
        </div>

        {/* Auspicious Count Badge */}
        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="font-bold text-slate-200">8 Auspicious Gates</span>
          <span className="text-slate-600">|</span>
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
          <span className="font-bold text-slate-200">24 Require Remedies</span>
        </div>
      </div>

      {/* Main Shakti Chakra Workspace: Left Interactive Visual Wheel | Right Deep-Dive Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: 360° INTERACTIVE SHAKTI CHAKRA WHEEL (6 COLS) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Interactive 32 Pada Circular Dial
            </h3>
            <span className="text-[11px] text-slate-500">Click any pada to inspect</span>
          </div>

          {/* SVG Circular Shakti Chakra */}
          <div className="relative aspect-square w-full max-w-md mx-auto">
            <svg viewBox="0 0 500 500" className="w-full h-full select-none">
              <defs>
                <radialGradient id="chakraCenter" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="100%" stopColor="#fde68a" />
                </radialGradient>
              </defs>

              {/* Background Outer Ring */}
              <circle cx="250" cy="250" r="230" fill="#0f172a" />
              <circle cx="250" cy="250" r="180" fill="#1e293b" />
              <circle cx="250" cy="250" r="90" fill="url(#chakraCenter)" stroke="#ca8a04" strokeWidth="2" />

              {/* Center Brahmasthan Text */}
              <text x="250" y="245" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="bold">
                BRAHMA
              </text>
              <text x="250" y="260" textAnchor="middle" fill="#92400e" fontSize="9">
                (Center)
              </text>

              {/* 32 Sector Wedges */}
              {DEVATA_32_PADAS.map((pada) => {
                const isSelected = selectedPadaId === pada.id;
                const startAngle = pada.angleStart;
                const endAngle = pada.angleEnd;

                const startRad = ((startAngle - 90) * Math.PI) / 180;
                const endRad = ((endAngle - 90) * Math.PI) / 180;
                const midRad = ((pada.centerAngle - 90) * Math.PI) / 180;

                const rInner = 90;
                const rOuter = 220;

                const x1Inner = 250 + rInner * Math.cos(startRad);
                const y1Inner = 250 + rInner * Math.sin(startRad);
                const x2Inner = 250 + rInner * Math.cos(endRad);
                const y2Inner = 250 + rInner * Math.sin(endRad);

                const x1Outer = 250 + rOuter * Math.cos(startRad);
                const y1Outer = 250 + rOuter * Math.sin(startRad);
                const x2Outer = 250 + rOuter * Math.cos(endRad);
                const y2Outer = 250 + rOuter * Math.sin(endRad);

                const tx = 250 + (rOuter - 22) * Math.cos(midRad);
                const ty = 250 + (rOuter - 22) * Math.sin(midRad);

                const pathData = `M ${x1Inner} ${y1Inner} L ${x1Outer} ${y1Outer} A ${rOuter} ${rOuter} 0 0 1 ${x2Outer} ${y2Outer} L ${x2Inner} ${y2Inner} A ${rInner} ${rInner} 0 0 0 ${x1Inner} ${y1Inner} Z`;

                const baseFill = pada.isAuspicious ? "#10b981" : isSelected ? "#f59e0b" : "#334155";
                const strokeColor = isSelected ? "#ffffff" : pada.isAuspicious ? "#34d399" : "#475569";

                return (
                  <g
                    key={pada.id}
                    onClick={() => setSelectedPadaId(pada.id)}
                    className="cursor-pointer transition-all hover:opacity-100"
                    opacity={isSelected ? 1 : 0.85}
                  >
                    <path
                      d={pathData}
                      fill={baseFill}
                      fillOpacity={isSelected ? 1 : pada.isAuspicious ? 0.85 : 0.4}
                      stroke={strokeColor}
                      strokeWidth={isSelected ? 3 : 1}
                    />
                    <text
                      x={tx}
                      y={ty}
                      fill="#ffffff"
                      fontSize={isSelected ? "11" : "9"}
                      fontWeight="900"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {pada.id}
                    </text>
                  </g>
                );
              })}

              {/* Cardinal Compass Markers */}
              <text x="250" y="24" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                N (0°)
              </text>
              <text x="478" y="255" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">
                E (90°)
              </text>
              <text x="250" y="488" fill="#f43f5e" fontSize="13" fontWeight="bold" textAnchor="middle">
                S (180°)
              </text>
              <text x="22" y="255" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
                W (270°)
              </text>
            </svg>
          </div>

          {/* Quick Legend */}
          <div className="flex items-center justify-center gap-4 text-xs font-bold pt-1">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              Auspicious Door (N3, N4, E3, E4, S3, S4, W3, W4)
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-3 h-3 rounded-full bg-slate-700"></span>
              Requires Non-Destructive Remedy
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: SELECTED PADA DETAILS & REMEDY (6 COLS) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Selected Pada Deep-Dive Card */}
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-sm ${
                    selectedPada.isAuspicious ? "bg-emerald-600" : "bg-slate-800"
                  }`}
                >
                  {selectedPada.id}
                </span>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {selectedPada.name} ({selectedPada.sanskritName})
                  </h3>
                  <div className="text-xs text-slate-500">
                    Direction: {selectedPada.direction} · Pada #{selectedPada.padaNumber} · Span: {selectedPada.angleStart}° to {selectedPada.angleEnd}°
                  </div>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                  selectedPada.isAuspicious
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : "bg-rose-100 text-rose-800 border border-rose-200"
                }`}
              >
                {selectedPada.isAuspicious ? "Auspicious Gate" : `${selectedPada.auspiciousGrade} Grade`}
              </span>
            </div>

            {/* Shastric Effects */}
            <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs">
              <div className="font-bold text-slate-700">Classical Shastric Effects:</div>
              <p className="text-slate-900 leading-relaxed font-semibold">
                {selectedPada.effects}
              </p>
              <p className="text-slate-600 text-[11px] leading-relaxed pt-1">
                {selectedPada.description}
              </p>
            </div>

            {/* Non-Destructive Remedy & Virtual Shift */}
            <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-100 space-y-2 text-xs">
              <div className="font-black text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-indigo-600" />
                Zero-Demolition Threshold Treatment
              </div>
              <p className="text-indigo-900 leading-relaxed">
                {selectedPada.remedy}
              </p>
              {!selectedPada.isAuspicious && (
                <div className="text-[11px] text-indigo-800 font-bold pt-1 bg-white/70 p-2.5 rounded-lg border border-indigo-100">
                  <span>Virtual Doorway Shift: </span>
                  Embed a 3-inch metallic strip across the door threshold to virtually nullify this door's energy, then install a 3D Brass Swastik or Consecrated Door Guardian Yantra oriented toward the nearest auspicious gate ({selectedPada.direction === "North" ? "N3/N4" : selectedPada.direction === "East" ? "E3/E4" : selectedPada.direction === "South" ? "S3/S4" : "W3/W4"}).
                </div>
              )}
            </div>
          </div>

          {/* 32 Padas Filterable Grid */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <DoorOpen className="w-4 h-4 text-slate-600" />
                All 32 Entrance Gates ({filteredPadas.length})
              </span>

              {/* Direction Filter Pills */}
              <div className="flex items-center gap-1">
                {(["All", "North", "East", "South", "West"] as const).map((dir) => (
                  <button
                    key={dir}
                    onClick={() => setDirectionFilter(dir)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                      directionFilter === dir
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
            </div>

            {/* Auspicious only toggle */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <input
                type="checkbox"
                id="auspiciousOnly"
                checked={auspiciousOnly}
                onChange={(e) => setAuspiciousOnly(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded-md focus:ring-emerald-500 cursor-pointer"
              />
              <label htmlFor="auspiciousOnly" className="font-semibold text-slate-700 cursor-pointer">
                Show only 8 Supreme Auspicious Gates (N3, N4, E3, E4, S3, S4, W3, W4)
              </label>
            </div>

            {/* Padas Scrollable Mini Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1 pt-1">
              {filteredPadas.map((pada) => {
                const isSelected = selectedPadaId === pada.id;
                return (
                  <button
                    key={pada.id}
                    onClick={() => setSelectedPadaId(pada.id)}
                    className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : pada.isAuspicious
                        ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-emerald-200"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs">{pada.id}</span>
                      {pada.isAuspicious && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      )}
                    </div>
                    <div className="text-[11px] font-bold truncate mt-0.5">{pada.name}</div>
                    <div className="text-[10px] opacity-75 truncate">{pada.direction}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
