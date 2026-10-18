import React, { useState } from "react";
import {
  Sliders,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Info,
  Shield,
  Layers,
  ArrowRight,
  Flame,
  Droplets,
  Wind,
  Mountain,
  CircleDot
} from "lucide-react";
import { MAHAVASTU_16_ZONES } from "../../engine/vastu/vastuEngine";
import { MahaVastuZone, ElementType } from "../../types/vastuTypes";

export const ZonesBalancingView: React.FC = () => {
  // Store area strength percentages for each of the 16 zones (100% is ideal balance)
  const [zoneStrengths, setZoneStrengths] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    MAHAVASTU_16_ZONES.forEach((z) => {
      // Default to slightly varying realistic values
      if (z.id === "N") initial[z.id] = 100;
      else if (z.id === "NE") initial[z.id] = 80; // slight cut demo
      else if (z.id === "SE") initial[z.id] = 125; // slight extension demo
      else if (z.id === "SW") initial[z.id] = 95;
      else initial[z.id] = 100;
    });
    return initial;
  });

  const [selectedZoneId, setSelectedZoneId] = useState<string>("NE");
  const [testedElementClash, setTestedElementClash] = useState<{
    zoneId: string;
    foreignElement: ElementType;
  }>({ zoneId: "N", foreignElement: "Fire" });

  // Update a single zone strength
  const handleStrengthChange = (zoneId: string, val: number) => {
    setZoneStrengths((prev) => ({ ...prev, [zoneId]: val }));
  };

  // Reset all to 100%
  const handleResetAll = () => {
    const res: Record<string, number> = {};
    MAHAVASTU_16_ZONES.forEach((z) => {
      res[z.id] = 100;
    });
    setZoneStrengths(res);
  };

  const selectedZone = MAHAVASTU_16_ZONES.find((z) => z.id === selectedZoneId) || MAHAVASTU_16_ZONES[0];
  const selectedStrength = zoneStrengths[selectedZone.id] ?? 100;

  // Status classification
  const getZoneStatus = (pct: number): "balanced" | "cut" | "extended" => {
    if (pct < 85) return "cut";
    if (pct > 115) return "extended";
    return "balanced";
  };

  // Count totals
  const totalCuts = Object.values(zoneStrengths).filter((v) => v < 85).length;
  const totalExtended = Object.values(zoneStrengths).filter((v) => v > 115).length;
  const totalBalanced = 16 - totalCuts - totalExtended;

  // Pancha Tattva elemental clash evaluation
  const clashZone = MAHAVASTU_16_ZONES.find((z) => z.id === testedElementClash.zoneId) || MAHAVASTU_16_ZONES[0];
  const isAntiElement = clashZone.antiElements.includes(testedElementClash.foreignElement);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              16 MahaVastu Zones Balancing
            </span>
            <span className="text-xs text-slate-400">Pancha Tattva Bar Chart Analysis</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
            <Sliders className="w-6 h-6 text-emerald-400" />
            Zonal Area Strength & Elemental Equilibrium
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Evaluate cut (deficit) and extended (excess) zones across all 16 directional portals. Apply zero-demolition metallic strips and color tape remedies.
          </p>
        </div>

        {/* Quick Stats & Reset */}
        <div className="flex items-center gap-3 self-stretch md:self-auto">
          <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700 text-xs">
            <div className="flex items-center gap-1 text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{totalBalanced} Balanced</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <span>{totalCuts} Cut</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1 text-rose-400 font-bold">
              <span>{totalExtended} Ext.</span>
            </div>
          </div>

          <button
            onClick={handleResetAll}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset All (100%)
          </button>
        </div>
      </div>

      {/* Main 16-Zone Bar Chart Studio */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              16 MahaVastu Zonal Area Strength Bar Chart
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ideal balance lies between 85% and 115%. Bars below 85% indicate energy deficit (Cut). Bars above 115% indicate energy hyperactivity (Extension).
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-bold text-slate-600">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-sky-500"></span> Water
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Air/Wood
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span> Fire
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span> Earth
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-400"></span> Space
            </span>
          </div>
        </div>

        {/* Visual Bar Chart Display */}
        <div className="grid grid-cols-8 sm:grid-cols-16 gap-2 pt-4 pb-2 border-b border-slate-200 overflow-x-auto">
          {MAHAVASTU_16_ZONES.map((zone) => {
            const val = zoneStrengths[zone.id] ?? 100;
            const status = getZoneStatus(val);
            const isSelected = selectedZoneId === zone.id;
            const barHeightPct = Math.min(100, Math.max(15, ((val - 40) / 120) * 100));

            return (
              <div
                key={zone.id}
                onClick={() => setSelectedZoneId(zone.id)}
                className={`flex flex-col items-center gap-2 p-1.5 rounded-xl cursor-pointer transition-all ${
                  isSelected ? "bg-slate-100 ring-2 ring-emerald-500" : "hover:bg-slate-50"
                }`}
              >
                {/* Bar height container */}
                <div className="h-44 w-full flex items-end justify-center bg-slate-100/70 rounded-lg p-1 relative">
                  {/* Balanced 85-115% guideline */}
                  <div className="absolute w-full border-t border-dashed border-slate-300 bottom-[45%] pointer-events-none" />
                  <div className="absolute w-full border-t border-dashed border-slate-300 bottom-[55%] pointer-events-none" />

                  {/* The bar */}
                  <div
                    className="w-full rounded-md transition-all duration-300 relative group"
                    style={{
                      height: `${barHeightPct}%`,
                      backgroundColor: zone.colorHex
                    }}
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md pointer-events-none whitespace-nowrap">
                      {val}%
                    </span>
                  </div>
                </div>

                {/* Zone Label & Status */}
                <div className="text-center">
                  <div className="text-xs font-black text-slate-800">{zone.id}</div>
                  <div className="text-[10px] font-bold text-slate-500">{val}%</div>
                  <span
                    className={`inline-block px-1 py-0.2 rounded-sm text-[8px] font-black uppercase ${
                      status === "balanced"
                        ? "bg-emerald-100 text-emerald-800"
                        : status === "cut"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Zone Deep-Dive Inspector & Remedy Action Card */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left info */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: selectedZone.colorHex }}
              ></span>
              <h4 className="text-base font-black text-slate-900">
                {selectedZone.name} ({selectedZone.hindiName}) — {selectedZone.id}
              </h4>
              <span className="text-xs font-bold text-slate-500">
                {selectedZone.element} Element
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <div>
                <span className="font-bold text-slate-800">Life Aspect:</span> {selectedZone.lifeAspect}
              </div>
              <div>
                <span className="font-bold text-slate-800">Key Attributes:</span> {selectedZone.keyAttributes}
              </div>
              <div>
                <span className="font-bold text-slate-800">Ruling Deity:</span> {selectedZone.rulingDeity}
              </div>
            </div>

            {/* Slider to adjust this zone's strength */}
            <div className="pt-2 space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Calibrate Area Strength:</span>
                <span className="text-emerald-700 font-black">{selectedStrength}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="160"
                step="5"
                value={selectedStrength}
                onChange={(e) => handleStrengthChange(selectedZone.id, parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>50% (Cut)</span>
                <span>100% (Balanced)</span>
                <span>160% (Extended)</span>
              </div>
            </div>
          </div>

          {/* Right Prescriptions based on Cut / Extended */}
          <div className="lg:col-span-7 bg-white p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                Vastu Shastric Balancing Prescription
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                  getZoneStatus(selectedStrength) === "balanced"
                    ? "bg-emerald-100 text-emerald-800"
                    : getZoneStatus(selectedStrength) === "cut"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-rose-100 text-rose-800"
                }`}
              >
                Status: {getZoneStatus(selectedStrength)}
              </span>
            </div>

            {getZoneStatus(selectedStrength) === "balanced" ? (
              <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Prana Flow Harmonious & Intact
                </div>
                <p className="text-[11px] text-emerald-800">
                  {selectedZone.name} has optimal area and energy resonance. Maintain cleanliness, good lighting, and ensure no anti-elements ({selectedZone.antiElements.join(", ")}) are introduced here.
                </p>
              </div>
            ) : getZoneStatus(selectedStrength) === "cut" ? (
              <div className="p-3 bg-amber-50 text-amber-950 rounded-xl text-xs space-y-1.5 border border-amber-200">
                <div className="font-bold flex items-center gap-1.5 text-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Zone Cut / Deficit ({selectedStrength}%) — Remedy Required
                </div>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  {selectedZone.cutRemedy}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-bold text-amber-950">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-amber-200">
                    Metal Strip: {selectedZone.metalRemedy}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-amber-200">
                    Color Tape: {selectedZone.colorTapeRemedy}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-rose-50 text-rose-950 rounded-xl text-xs space-y-1.5 border border-rose-200">
                <div className="font-bold flex items-center gap-1.5 text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Zone Extended / Excess ({selectedStrength}%) — Grounding Required
                </div>
                <p className="text-[11px] text-rose-900 leading-relaxed">
                  {selectedZone.extendedRemedy}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-bold text-rose-950">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-rose-200">
                    Neutralizing Element: Earth / Metal Strips
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PANCHA TATTVA (5 ELEMENTS) CYCLE & ANTI-ELEMENT CLASH TESTER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* The 5 Elements Cycle */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Pancha Tattva Creation & Destruction Cycles
            </h3>
            <span className="text-xs text-slate-500">Shastric Physics</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            In MahaVastu, health and wealth depend on the harmonious cycle of the 5 primordial elements:
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sky-900">
                <Droplets className="w-4 h-4 text-sky-600" />
                <span>Water (Jal)</span>
              </div>
              <span className="text-[11px] text-slate-600">Creates Wood / Air (N, NNE, NE)</span>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <Wind className="w-4 h-4 text-emerald-600" />
                <span>Air / Wood (Vayu)</span>
              </div>
              <span className="text-[11px] text-slate-600">Fuels Fire (ENE, E, ESE)</span>
            </div>

            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-rose-900">
                <Flame className="w-4 h-4 text-rose-600" />
                <span>Fire (Agni)</span>
              </div>
              <span className="text-[11px] text-slate-600">Creates Earth / Ash (SE, SSE, S)</span>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <Mountain className="w-4 h-4 text-amber-600" />
                <span>Earth (Prithvi)</span>
              </div>
              <span className="text-[11px] text-slate-600">Produces Space / Metal (SSW, SW)</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CircleDot className="w-4 h-4 text-slate-600" />
                <span>Space / Metal (Akash)</span>
              </div>
              <span className="text-[11px] text-slate-600">Holds Water (WSW, W, WNW, NW)</span>
            </div>
          </div>
        </div>

        {/* Anti-Element Conflict Simulator */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Interactive Anti-Element Conflict Simulator
            </h3>
            <span className="text-xs text-slate-500">Diagnose Color/Activity Clash</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Select a target zone and place a foreign color or element to see the shastric diagnosis and zero-demolition cure:
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Target Zone:</label>
              <select
                value={testedElementClash.zoneId}
                onChange={(e) =>
                  setTestedElementClash((prev) => ({ ...prev, zoneId: e.target.value }))
                }
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              >
                {MAHAVASTU_16_ZONES.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.name} ({z.id}) — {z.element}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Foreign Element:</label>
              <select
                value={testedElementClash.foreignElement}
                onChange={(e) =>
                  setTestedElementClash((prev) => ({
                    ...prev,
                    foreignElement: e.target.value as ElementType
                  }))
                }
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              >
                {(["Water", "Air", "Fire", "Earth", "Space"] as ElementType[]).map((el) => (
                  <option key={el} value={el}>
                    {el} Element
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Conflict Verdict */}
          <div
            className={`p-4 rounded-xl text-xs space-y-2 border ${
              isAntiElement
                ? "bg-rose-50 border-rose-200 text-rose-950"
                : "bg-emerald-50 border-emerald-200 text-emerald-950"
            }`}
          >
            <div className="font-black flex items-center gap-1.5 text-sm">
              {isAntiElement ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Severe Anti-Element Clash Detected!</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Elemental Compatibility Harmonious</span>
                </>
              )}
            </div>

            <p className="leading-relaxed">
              {isAntiElement
                ? `Placing ${testedElementClash.foreignElement} in ${clashZone.name} (${clashZone.element} zone) induces an antagonistic friction. For example, ${testedElementClash.foreignElement === "Fire" ? "Fire in Water destroys liquidity and career opportunities" : "Water in Fire destroys liquidity and female health"}.`
                : `${testedElementClash.foreignElement} is compatible or friendly with ${clashZone.element} in ${clashZone.name}. No destructive elemental annihilation occurs.`}
            </p>

            {isAntiElement && (
              <div className="pt-1 text-[11px] font-bold text-rose-900 bg-white/70 p-2.5 rounded-lg border border-rose-100">
                <span className="text-rose-950">Recommended Non-Demolition Cure: </span>
                {clashZone.element === "Water" && testedElementClash.foreignElement === "Fire"
                  ? "Insert an Air/Wood buffer: Use green elemental tape, a healthy green plant, or a Baroda Green marble slab to bridge Fire and Water."
                  : clashZone.element === "Fire" && testedElementClash.foreignElement === "Water"
                  ? "Insert a Wood buffer: Use green vinyl tape or copper boundary strip to stop Water from directly drowning Agni."
                  : `Paste a 2-inch ${clashZone.colorTapeRemedy} tape or embed a ${clashZone.metalRemedy} strip around the foreign object.`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
