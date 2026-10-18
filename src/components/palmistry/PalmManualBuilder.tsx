import React, { useState } from "react";
import { HandTypeClass, SingleHandFeatures, PalmistryReport, MountLevel } from "../../types/palmistry";
import { synthesizePalmistryReport } from "../../services/palmistryEngine";
import { CLASSICAL_HAND_TYPES } from "../../data/palmistryRuleDatabase";
import { 
  Sparkles, 
  Hand, 
  Check, 
  ChevronRight, 
  Layers, 
  Flame, 
  Compass, 
  Award, 
  Sliders,
  CheckCircle2
} from "lucide-react";

interface PalmManualBuilderProps {
  onReportGenerated: (report: PalmistryReport) => void;
}

export const PalmManualBuilder: React.FC<PalmManualBuilderProps> = ({
  onReportGenerated
}) => {
  const [seekerName, setSeekerName] = useState<string>("Seeker");
  const [dominantHand, setDominantHand] = useState<"right" | "left">("right");
  const [primaryHandType, setPrimaryHandType] = useState<HandTypeClass>("Square");
  
  // Finger & Thumb States
  const [fingerLength, setFingerLength] = useState<"short" | "average" | "long">("average");
  const [fingerSpacing, setFingerSpacing] = useState<"close" | "moderate" | "wide">("moderate");
  const [knuckleJoints, setKnuckleJoints] = useState<"smooth" | "knotty">("smooth");
  const [thumbLength, setThumbLength] = useState<"short" | "average" | "long">("long");
  const [thumbAngle, setThumbAngle] = useState<"narrow" | "average" | "wide">("wide");
  const [thumbFlexibility, setThumbFlexibility] = useState<"stiff" | "flexible">("flexible");

  // Principal Lines
  const [lifeLineCurve, setLifeLineCurve] = useState<"straight" | "gentle" | "wide">("wide");
  const [lifeLineDouble, setLifeLineDouble] = useState<boolean>(true);
  const [headLineSlope, setHeadLineSlope] = useState<"straight" | "sloping">("sloping");
  const [headLineForked, setHeadLineForked] = useState<boolean>(true);
  const [headLineJoined, setHeadLineJoined] = useState<boolean>(false);
  const [heartLineCurve, setHeartLineCurve] = useState<"straight" | "high" | "wide">("high");
  const [heartBranches, setHeartBranches] = useState<boolean>(true);

  // Secondary Lines
  const [fateLinePresent, setFateLinePresent] = useState<boolean>(true);
  const [sunLinePresent, setSunLinePresent] = useState<boolean>(true);
  const [mercuryLinePresent, setMercuryLinePresent] = useState<boolean>(true);

  // Mounts
  const [jupiterMount, setJupiterMount] = useState<MountLevel>("prominent");
  const [saturnMount, setSaturnMount] = useState<MountLevel>("normal");
  const [apolloMount, setApolloMount] = useState<MountLevel>("prominent");
  const [mercuryMount, setMercuryMount] = useState<MountLevel>("normal");
  const [venusMount, setVenusMount] = useState<MountLevel>("prominent");
  const [lunaMount, setLunaMount] = useState<MountLevel>("prominent");

  // Fixed Marks & Moles Layer
  const [selectedPalmMoleMount, setSelectedPalmMoleMount] = useState<string>("jupiter");
  const [enableFixedMarks, setEnableFixedMarks] = useState<boolean>(true);

  const handleGenerate = () => {
    const activeHandFeatures: SingleHandFeatures = {
      hand: "right",
      isDominant: dominantHand === "right",
      handType: {
        primary: primaryHandType,
        secondary: "Conic",
        confidence: 0.92,
        palmLengthToWidthRatio: 1.02,
        fingerToPalmRatio: 0.86
      },
      fingers: {
        jupiter: { relativeLength: "long", set: "even" },
        saturn: { relativeLength: "long" },
        apollo: { relativeLength: "long" },
        mercury: { relativeLength: "average" },
        spacing: fingerSpacing,
        joints: knuckleJoints,
        flexibility: "flexible"
      },
      thumb: {
        length: thumbLength,
        angle: thumbAngle,
        flexibility: thumbFlexibility,
        phalangeDominance: "balanced"
      },
      skin: {
        texture: "fine",
        consistency: "firm",
        color: "pink_warm",
        nails: "broad_short"
      },
      lines: {
        life: {
          present: true,
          curve: lifeLineCurve,
          depth: "deep",
          doubleLine: lifeLineDouble,
          startOrigin: "jupiter"
        },
        head: {
          present: true,
          curve: headLineSlope === "sloping" ? "sloping" : "straight",
          depth: "deep",
          forked: headLineForked,
          joinedToLife: headLineJoined
        },
        heart: {
          present: true,
          curve: heartLineCurve === "high" ? "gentle" : heartLineCurve === "wide" ? "wide" : "straight",
          depth: "deep",
          branchesUpward: heartBranches
        },
        fate: {
          present: fateLinePresent,
          depth: "deep"
        },
        sun: {
          present: sunLinePresent,
          depth: "deep"
        },
        mercury: {
          present: mercuryLinePresent,
          depth: "moderate"
        }
      },
      mounts: {
        jupiter: jupiterMount,
        saturn: saturnMount,
        apollo: apolloMount,
        mercury: mercuryMount,
        venus: venusMount,
        marsUpper: "normal",
        marsLower: "normal",
        luna: lunaMount
      },
      markings: [
        {
          id: "trident-saturn",
          type: "trident",
          location: "saturn",
          significance: "A sacred mark of authority, karmic protection, and life fulfillment.",
          favorable: true
        },
        {
          id: "triangle-jupiter",
          type: "triangle",
          location: "jupiter",
          significance: "Indicates strategic diplomacy and natural leadership acumen.",
          favorable: true
        }
      ],
      fixedMarks: enableFixedMarks && selectedPalmMoleMount !== "none" ? {
        moles: [
          {
            location: selectedPalmMoleMount as any,
            color: "dark",
            interpretation: selectedPalmMoleMount === "jupiter"
              ? "A classic mark of honor, commanding presence, and leadership on the Mount of Jupiter."
              : "A classical standalone palm mole adding focus to this energetic mount."
          }
        ],
        scars: [],
        otherMarks: []
      } : undefined
    };

    const innateHandFeatures: SingleHandFeatures = {
      ...activeHandFeatures,
      hand: "left",
      isDominant: dominantHand === "left",
      handType: {
        ...activeHandFeatures.handType,
        primary: primaryHandType === "Square" ? "Conic" : primaryHandType
      },
      lines: {
        ...activeHandFeatures.lines,
        fate: {
          present: false,
          depth: "faint"
        }
      }
    };

    const report = synthesizePalmistryReport(
      dominantHand,
      activeHandFeatures,
      innateHandFeatures,
      seekerName,
      enableFixedMarks
    );

    onReportGenerated(report);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-xl space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      <div className="flex items-center gap-3.5 border-b border-slate-100 pb-5">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-900 flex items-center justify-center font-bold">
          <Sliders className="w-6 h-6 text-amber-700" />
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Interactive Rule-Engine Studio
          </span>
          <h2 className="font-serif text-2xl font-bold text-slate-900 mt-0.5">
            Self-Inspection & Palm Archetype Builder
          </h2>
        </div>
      </div>

      {/* Basic Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
            Seeker Name
          </label>
          <input
            type="text"
            value={seekerName}
            onChange={(e) => setSeekerName(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
            Dominant Hand (Writing / Action)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setDominantHand("right")}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                dominantHand === "right"
                  ? "bg-amber-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Right Hand
            </button>
            <button
              onClick={() => setDominantHand("left")}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                dominantHand === "left"
                  ? "bg-amber-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Left Hand
            </button>
          </div>
        </div>
      </div>

      {/* Hand Type (Cheirognomy) */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          1. Hand Shape Archetype (Cheirognomy)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {(Object.keys(CLASSICAL_HAND_TYPES) as HandTypeClass[]).map((type) => {
            const isSelected = primaryHandType === type;
            return (
              <button
                key={type}
                onClick={() => setPrimaryHandType(type)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-500/20 shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                <div className="font-bold text-xs flex items-center justify-between">
                  <span>{type} Hand</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                  {CLASSICAL_HAND_TYPES[type].title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Thumb & Finger Geometry */}
      <div className="space-y-4 pt-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          2. Thumb & Finger Structure
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Thumb Length */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="text-xs font-bold text-slate-800 block">Thumb Length</span>
            <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
              {(["short", "average", "long"] as const).map((len) => (
                <button
                  key={len}
                  onClick={() => setThumbLength(len)}
                  className={`flex-1 py-1 rounded-lg capitalize text-[11px] font-bold ${
                    thumbLength === len ? "bg-amber-500 text-white" : "text-slate-600"
                  }`}
                >
                  {len}
                </button>
              ))}
            </div>
          </div>

          {/* Thumb Angle */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="text-xs font-bold text-slate-800 block">Thumb Angle</span>
            <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
              {(["narrow", "average", "wide"] as const).map((ang) => (
                <button
                  key={ang}
                  onClick={() => setThumbAngle(ang)}
                  className={`flex-1 py-1 rounded-lg capitalize text-[11px] font-bold ${
                    thumbAngle === ang ? "bg-amber-500 text-white" : "text-slate-600"
                  }`}
                >
                  {ang}
                </button>
              ))}
            </div>
          </div>

          {/* Thumb Flexibility */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="text-xs font-bold text-slate-800 block">Thumb Flexibility</span>
            <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs">
              {(["stiff", "flexible"] as const).map((flx) => (
                <button
                  key={flx}
                  onClick={() => setThumbFlexibility(flx)}
                  className={`flex-1 py-1 rounded-lg capitalize text-[11px] font-bold ${
                    thumbFlexibility === flx ? "bg-amber-500 text-white" : "text-slate-600"
                  }`}
                >
                  {flx}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Principal Lines */}
      <div className="space-y-4 pt-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          3. The Three Principal Lines
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Life Line */}
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
            <span className="text-xs font-bold text-emerald-950 block">Life Line (Vitality)</span>
            <div className="space-y-1 text-xs">
              <label className="text-[11px] text-slate-600 block">Curvature:</label>
              <div className="flex bg-white rounded-xl p-0.5 border border-emerald-200">
                {(["straight", "gentle", "wide"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setLifeLineCurve(c)}
                    className={`flex-1 py-1 rounded-lg capitalize text-[10px] font-bold ${
                      lifeLineCurve === c ? "bg-emerald-600 text-white" : "text-slate-600"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lifeLineDouble}
                  onChange={(e) => setLifeLineDouble(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span className="text-[11px] text-slate-700">Mars Sister Line (Double)</span>
              </label>
            </div>
          </div>

          {/* Head Line */}
          <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
            <span className="text-xs font-bold text-blue-950 block">Head Line (Mind)</span>
            <div className="space-y-1 text-xs">
              <label className="text-[11px] text-slate-600 block">Slope:</label>
              <div className="flex bg-white rounded-xl p-0.5 border border-blue-200">
                {(["straight", "sloping"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setHeadLineSlope(s)}
                    className={`flex-1 py-1 rounded-lg capitalize text-[10px] font-bold ${
                      headLineSlope === s ? "bg-blue-600 text-white" : "text-slate-600"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={headLineForked}
                  onChange={(e) => setHeadLineForked(e.target.checked)}
                  className="rounded text-blue-600"
                />
                <span className="text-[11px] text-slate-700">Writer's Fork</span>
              </label>
            </div>
          </div>

          {/* Heart Line */}
          <div className="p-4 bg-pink-50/60 rounded-2xl border border-pink-100 space-y-2">
            <span className="text-xs font-bold text-pink-950 block">Heart Line (Emotions)</span>
            <div className="space-y-1 text-xs">
              <label className="text-[11px] text-slate-600 block">Curvature:</label>
              <div className="flex bg-white rounded-xl p-0.5 border border-pink-200">
                {(["straight", "high", "wide"] as const).map((h) => (
                  <button
                    key={h}
                    onClick={() => setHeartLineCurve(h)}
                    className={`flex-1 py-1 rounded-lg capitalize text-[10px] font-bold ${
                      heartLineCurve === h ? "bg-pink-600 text-white" : "text-slate-600"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={heartBranches}
                  onChange={(e) => setHeartBranches(e.target.checked)}
                  className="rounded text-pink-600"
                />
                <span className="text-[11px] text-slate-700">Upward Branches</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 4: Fixed Marks & Palm Moles */}
      <div className="space-y-4 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold">
              4
            </span>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Layer 4: Fixed Signs & Moles (Mounts & Lines)
            </h3>
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={enableFixedMarks}
              onChange={(e) => setEnableFixedMarks(e.target.checked)}
              className="rounded text-amber-500 focus:ring-amber-500"
            />
            <span>Include Moles Layer</span>
          </label>
        </div>

        {enableFixedMarks && (
          <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200/60 space-y-3">
            <span className="text-xs font-bold text-slate-900 block">Select Palm Mole Mount Location:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "jupiter", label: "Jupiter Mount (Ambition & Honor)" },
                { id: "saturn", label: "Saturn Mount (Karmic Focus)" },
                { id: "apollo", label: "Apollo Mount (Creativity & Renown)" },
                { id: "mercury", label: "Mercury Mount (Business Eloquence)" },
                { id: "venus", label: "Venus Mount (Passion & Vitality)" },
                { id: "luna", label: "Luna Mount (Intuition & Travel)" },
                { id: "marsUpper", label: "Mars Mount (Endurance & Courage)" },
                { id: "none", label: "None / Clear Skin" }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedPalmMoleMount(m.id)}
                  className={`p-2.5 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                    selectedPalmMoleMount === m.id
                      ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:border-amber-300"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="w-full py-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-amber-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <Sparkles className="w-5 h-5 text-amber-200" />
        <span>Synthesize Complete Palmistry Report</span>
      </button>
    </div>
  );
};
