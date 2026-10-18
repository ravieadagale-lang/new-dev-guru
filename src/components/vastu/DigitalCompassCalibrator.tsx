import React, { useState } from "react";
import {
  Compass,
  Navigation2,
  Sliders,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Copy,
  Check
} from "lucide-react";
import { MAHAVASTU_16_ZONES } from "../../engine/vastu/vastuEngine";

interface DigitalCompassCalibratorProps {
  initialDegree?: number;
  onApplyNorthDegree?: (degree: number) => void;
}

export const DigitalCompassCalibrator: React.FC<DigitalCompassCalibratorProps> = ({
  initialDegree = 0,
  onApplyNorthDegree
}) => {
  const [angle, setAngle] = useState<number>(initialDegree);
  const [magneticDeclination, setMagneticDeclination] = useState<number>(1.2);
  const [applied, setApplied] = useState(false);

  // Active Zone based on angle
  const activeZone = MAHAVASTU_16_ZONES.find((z) => {
    if (z.id === "N") {
      return angle >= 348.75 || angle < 11.25;
    }
    return angle >= z.angleStart && angle < z.angleEnd;
  }) || MAHAVASTU_16_ZONES[0];

  const handleApply = () => {
    if (onApplyNorthDegree) {
      onApplyNorthDegree(angle);
    }
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>High-Precision Azimuth Calibration</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            Digital 16-Zone Compass &amp; Magnetic Calibrator
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Calibrate the exact cardinal orientation of any property. Compensate for local magnetic declination to verify whether the entrance and rooms fall into true Shastric zones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAngle(0)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to 0° (True North)</span>
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            {applied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Navigation2 className="w-3.5 h-3.5" />}
            <span>{applied ? "Applied to Floor Plan!" : "Apply to Floor Plan"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Digital Compass Dial */}
        <div className="lg:col-span-7 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
            {/* Outer Compass Dial */}
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full transition-transform duration-300"
              style={{ transform: `rotate(${-angle}deg)` }}
            >
              <defs>
                <radialGradient id="compassBg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="85%" stopColor="#020617" />
                  <stop offset="100%" stopColor="#1e293b" />
                </radialGradient>
              </defs>

              {/* Dial Disc */}
              <circle cx="200" cy="200" r="190" fill="url(#compassBg)" stroke="#334155" strokeWidth="3" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

              {/* 16 Zone Wedges & Radial Labels */}
              {MAHAVASTU_16_ZONES.map((zone) => {
                const rad = (zone.centerAngle * Math.PI) / 180;
                const x = 200 + 160 * Math.sin(rad);
                const y = 200 - 160 * Math.cos(rad);

                const isNorth = zone.id === "N";

                return (
                  <g key={zone.id}>
                    {/* Tick Mark */}
                    <line
                      x1={200 + 180 * Math.sin(rad)}
                      y1={200 - 180 * Math.cos(rad)}
                      x2={200 + 190 * Math.sin(rad)}
                      y2={200 - 190 * Math.cos(rad)}
                      stroke={isNorth ? "#ef4444" : "#94a3b8"}
                      strokeWidth={isNorth ? 3 : 1.5}
                    />
                    {/* Zone ID Label */}
                    <text
                      x={x}
                      y={y}
                      fill={isNorth ? "#ef4444" : "#e2e8f0"}
                      fontSize={isNorth ? "14" : "11"}
                      fontWeight={isNorth ? "900" : "600"}
                      textAnchor="middle"
                      dominantBaseline="central"
                      transform={`rotate(${zone.centerAngle}, ${x}, ${y})`}
                    >
                      {zone.id}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Static Magnetic Needle (Points to top) */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-40 h-40 drop-shadow-xl">
                {/* North Needle (Red) */}
                <polygon points="50,15 45,50 55,50" fill="#ef4444" />
                {/* South Needle (Silver) */}
                <polygon points="50,85 45,50 55,50" fill="#94a3b8" />
                {/* Center Pivot */}
                <circle cx="50" cy="50" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="text-red-400 font-bold">▲ Red = True North Needle</span>
            <span>Bearing: {Math.round(angle)}°</span>
          </div>
        </div>

        {/* Right Column: Azimuth Sliders & Active Zone Shastra */}
        <div className="lg:col-span-5 space-y-6">
          {/* Degree Calibration Controls */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Property Orientation
              </span>
              <span className="font-mono text-xl font-black text-slate-900">
                {angle}°
              </span>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Front Entrance Angle:</span>
                <span className="text-amber-600 font-mono font-bold">{angle}°</span>
              </label>
              <input
                type="range"
                min="0"
                max="359"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value, 10))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0° (North)</span>
                <span>90° (East)</span>
                <span>180° (South)</span>
                <span>270° (West)</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-700 block">
                Quick Cardinal Alignments:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "North", deg: 0 },
                  { label: "North-East", deg: 45 },
                  { label: "East", deg: 90 },
                  { label: "South-East", deg: 135 },
                  { label: "South", deg: 180 },
                  { label: "South-West", deg: 225 },
                  { label: "West", deg: 270 },
                  { label: "North-West", deg: 315 }
                ].map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setAngle(p.deg)}
                    className="py-1.5 px-2 rounded-xl text-[11px] font-medium border border-slate-200 hover:bg-slate-100 text-slate-700 text-center cursor-pointer transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Magnetic Declination Adjustment */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Magnetic Declination Offset:</span>
                <span className="font-mono text-slate-900 font-bold">+{magneticDeclination}°</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Magnetic North slightly diverges from Geographic True North depending on your GPS coordinates. In India &amp; Asia, declination typically ranges from +0.5° to +2.5° East.
              </p>
            </div>
          </div>

          {/* Active Detected Direction Attributes */}
          <div className="bg-slate-950 text-white p-6 rounded-3xl border border-amber-500/30 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Active Aligned Zone
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">
                {activeZone.id} ({activeZone.angleStart}° - {activeZone.angleEnd}°)
              </span>
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-white">
                {activeZone.name} — {activeZone.hindiName}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                <strong>Ruling Deity:</strong> {activeZone.rulingDeity} | <strong>Element:</strong> {activeZone.element}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed space-y-1">
              <div><strong>Core Pranic Attribute:</strong> {activeZone.keyAttributes}</div>
              <div><strong>Ideal Structures:</strong> {activeZone.idealRooms.join(", ")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
