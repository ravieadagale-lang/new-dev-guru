import React, { useState } from "react";
import { FaceShapeClass, IndividualFeaturesSet, FaceReadingReport } from "../../types/facereading";
import { synthesizeFaceReadingReport } from "../../services/facereadingEngine";
import { CLASSICAL_FACE_SHAPES } from "../../data/facereadingRuleDatabase";
import { 
  Sparkles, 
  User, 
  CheckCircle2, 
  Sliders, 
  Layers, 
  Flame, 
  Droplets, 
  Mountain, 
  Wind 
} from "lucide-react";

interface FaceManualBuilderProps {
  onReportGenerated: (report: FaceReadingReport) => void;
}

export const FaceManualBuilder: React.FC<FaceManualBuilderProps> = ({
  onReportGenerated
}) => {
  const [seekerName, setSeekerName] = useState<string>("Seeker");
  const [faceShape, setFaceShape] = useState<FaceShapeClass>("Oval");
  
  // Individual Features
  const [foreheadWidth, setForeheadWidth] = useState<"wide" | "average" | "narrow">("wide");
  const [eyebrowThickness, setEyebrowThickness] = useState<"thick" | "medium" | "sparse_thin">("thick");
  const [eyeSize, setEyeSize] = useState<"large" | "medium" | "small">("large");
  const [eyeSpacing, setEyeSpacing] = useState<"close_set" | "balanced" | "wide_set">("balanced");
  const [noseBridge, setNoseBridge] = useState<"high" | "straight_medium" | "low_flat">("high");
  const [nostrilWidth, setNostrilWidth] = useState<"wide" | "average" | "narrow">("wide");
  const [lipFullness, setLipFullness] = useState<"full" | "medium" | "thin">("full");
  const [mouthWidth, setMouthWidth] = useState<"wide" | "balanced" | "small">("wide");
  const [mouthCorner, setMouthCorner] = useState<"upturned" | "neutral" | "downturned">("upturned");
  const [jawline, setJawline] = useState<"strong_angular" | "soft_curved" | "tapered" | "wide">("strong_angular");
  const [earHeight, setEarHeight] = useState<"high_set" | "level_with_eyes" | "low_set">("high_set");
  
  // Marks & Moles Layer
  const [selectedMoleLocation, setSelectedMoleLocation] = useState<string>("betweenEyebrows");
  const [enableFixedMarks, setEnableFixedMarks] = useState<boolean>(true);

  const handleGenerate = () => {
    const rawFeatures: IndividualFeaturesSet = {
      forehead: {
        width: foreheadWidth,
        height: "high",
        shape: "rounded",
        creases: "smooth",
        interpretation: "Expansive intellect and clear conceptual vision."
      },
      eyebrows: {
        thickness: eyebrowThickness,
        shape: "arched",
        spacing: eyeSpacing,
        length: "long",
        interpretation: "High willpower and focused determination."
      },
      eyes: {
        size: eyeSize,
        spacing: eyeSpacing,
        cornerAngle: "upturned",
        depth: "average",
        clarityOfGaze: "bright_clear",
        interpretation: "Bright vitality, strong 'Shen', and open emotional intelligence."
      },
      nose: {
        bridge: noseBridge,
        nostrilWidth: nostrilWidth,
        tipShape: "rounded_moneybag",
        wealthIndicator: "Strong wealth attraction and steady accumulation.",
        interpretation: "Straight central pillar bestowing professional authority."
      },
      mouth: {
        width: mouthWidth,
        lipFullness: lipFullness,
        cornerAngle: mouthCorner,
        cupidsBow: "well_defined",
        communicationStyle: "Warm, persuasive eloquence.",
        interpretation: "Generous social presence and emotional loyalty."
      },
      chinJaw: {
        jawline: jawline,
        chinShape: "prominent_protruding",
        laterLifeStability: "Enduring stability and loyal support.",
        interpretation: "Unwavering stamina and perseverance."
      },
      ears: {
        visible: true,
        size: "large",
        setHeight: earHeight,
        position: "close_to_head",
        earlobe: "thick_defined",
        ancestralVitality: "Deep constitutional stamina and blessings.",
        interpretation: "Refined listening intelligence and ancestral protection."
      },
      cheeksPhiltrum: {
        cheekbones: "high_prominent",
        philtrum: "long_defined",
        authorityAndVitality: "Authority in midlife and high vitality.",
        interpretation: "High personal authority and strong life stamina."
      },
      fixedMarks: enableFixedMarks && selectedMoleLocation !== "none" ? {
        moles: [
          {
            location: selectedMoleLocation as any,
            color: "dark",
            palace: selectedMoleLocation === "betweenEyebrows" ? "Life Palace (Ming Gong)" : "Twelve Palaces",
            interpretation: selectedMoleLocation === "betweenEyebrows" 
              ? "A distinct classical mole at the Life Palace accentuating purposeful vision."
              : "A classical facial mole adding focused energy to its respective Palace."
          }
        ],
        scars: [],
        otherMarks: []
      } : undefined
    };

    const report = synthesizeFaceReadingReport(rawFeatures, faceShape, seekerName, enableFixedMarks);
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
            Mian Xiang Interactive Studio
          </span>
          <h2 className="font-serif text-2xl font-bold text-slate-900 mt-0.5">
            Self-Inspection & Face Feature Studio
          </h2>
        </div>
      </div>

      {/* Name Input */}
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

      {/* Face Shape */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          1. Face Shape Contour (Physiognomy)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {(Object.keys(CLASSICAL_FACE_SHAPES) as FaceShapeClass[]).map((shape) => {
            const isSelected = faceShape === shape;
            return (
              <button
                key={shape}
                onClick={() => setFaceShape(shape)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-500/20 shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                <div className="font-bold text-xs flex items-center justify-between">
                  <span>{shape} Face</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                  {CLASSICAL_FACE_SHAPES[shape].title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feature Landmarks */}
      <div className="space-y-4 pt-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          2. Individual Facial Trines & Landmarks
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Forehead */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-900 block">Forehead (Upper Zone / Heaven)</span>
            <div className="flex bg-white rounded-xl p-0.5 border border-slate-200 text-xs">
              {(["wide", "average", "narrow"] as const).map((w) => (
                <button
                  key={w}
                  onClick={() => setForeheadWidth(w)}
                  className={`flex-1 py-1 rounded-lg capitalize text-[11px] font-bold ${
                    foreheadWidth === w ? "bg-amber-500 text-white" : "text-slate-600"
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Eyebrows */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-900 block">Eyebrows (Willpower & Drive)</span>
            <div className="flex bg-white rounded-xl p-0.5 border border-slate-200 text-xs">
              {(["thick", "medium", "sparse_thin"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setEyebrowThickness(t)}
                  className={`flex-1 py-1 rounded-lg capitalize text-[11px] font-bold ${
                    eyebrowThickness === t ? "bg-amber-500 text-white" : "text-slate-600"
                  }`}
                >
                  {t.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Eyes */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-900 block">Eyes ('Shen' & Spirit)</span>
            <div className="flex bg-white rounded-xl p-0.5 border border-slate-200 text-xs">
              {(["large", "medium", "small"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setEyeSize(s)}
                  className={`flex-1 py-1 rounded-lg capitalize text-[11px] font-bold ${
                    eyeSize === s ? "bg-amber-500 text-white" : "text-slate-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Nose Bridge */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-900 block">Nose Bridge (Wealth & Authority)</span>
            <div className="flex bg-white rounded-xl p-0.5 border border-slate-200 text-xs">
              {(["high", "straight_medium", "low_flat"] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setNoseBridge(b)}
                  className={`flex-1 py-1 rounded-lg capitalize text-[11px] font-bold ${
                    noseBridge === b ? "bg-amber-500 text-white" : "text-slate-600"
                  }`}
                >
                  {b.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Mouth & Lips */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-900 block">Lips Fullness & Eloquence</span>
            <div className="flex bg-white rounded-xl p-0.5 border border-slate-200 text-xs">
              {(["full", "medium", "thin"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setLipFullness(f)}
                  className={`flex-1 py-1 rounded-lg capitalize text-[11px] font-bold ${
                    lipFullness === f ? "bg-amber-500 text-white" : "text-slate-600"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Jawline & Chin */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-900 block">Jawline (Lower Zone / Earth)</span>
            <div className="flex bg-white rounded-xl p-0.5 border border-slate-200 text-xs">
              {(["strong_angular", "soft_curved", "tapered"] as const).map((j) => (
                <button
                  key={j}
                  onClick={() => setJawline(j as any)}
                  className={`flex-1 py-1 rounded-lg capitalize text-[11px] font-bold ${
                    jawline === j ? "bg-amber-500 text-white" : "text-slate-600"
                  }`}
                >
                  {j.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Layer 4: Fixed Marks & Facial Moles */}
      <div className="space-y-4 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold">
              3
            </span>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Layer 4: Fixed Marks & Facial Moles (Mian Xiang Palaces)
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
            <span className="text-xs font-bold text-slate-900 block">Select Distinct Mole Location:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "betweenEyebrows", label: "Between Eyebrows (Life Palace)" },
                { id: "forehead", label: "Forehead (Career Palace)" },
                { id: "eyeCorner", label: "Outer Eye Corner (Marriage Palace)" },
                { id: "noseTip", label: "Nose Tip (Wealth Palace)" },
                { id: "aboveLip", label: "Above Upper Lip" },
                { id: "chin", label: "Chin (Legacy Palace)" },
                { id: "ear", label: "Ear (Ancestral Grace)" },
                { id: "none", label: "None / Clear Skin" }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMoleLocation(m.id)}
                  className={`p-2.5 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                    selectedMoleLocation === m.id
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
        <span>Synthesize Complete Face Reading Report</span>
      </button>
    </div>
  );
};
