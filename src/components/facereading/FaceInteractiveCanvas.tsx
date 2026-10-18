import React, { useState } from "react";
import { User, Eye, Sparkles, Layers, ShieldCheck, Info } from "lucide-react";
import { SHI_ER_GONG_TWELVE_PALACES } from "../../data/facereadingRuleDatabase";

interface FaceInteractiveCanvasProps {
  imageUrl?: string | null;
  sideImageUrl?: string | null;
}

export const FaceInteractiveCanvas: React.FC<FaceInteractiveCanvasProps> = ({
  imageUrl,
  sideImageUrl
}) => {
  const [selectedPalace, setSelectedPalace] = useState<string | null>("ming_gong");
  const [showSanTingBands, setShowSanTingBands] = useState<boolean>(true);
  const [showPalaces, setShowPalaces] = useState<boolean>(true);
  const [showFeatureContours, setShowFeatureContours] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"front" | "side">("front");

  const palacePins: Record<string, { cx: number; cy: number; id: string; label: string }> = {
    ming_gong: { cx: 200, cy: 195, id: "ming_gong", label: "Life Palace (Ming Gong)" },
    career_palace: { cx: 200, cy: 145, id: "career_palace", label: "Career Palace" },
    wealth_palace: { cx: 200, cy: 265, id: "wealth_palace", label: "Wealth Palace" },
    marriage_palace: { cx: 275, cy: 215, id: "marriage_palace", label: "Marriage Palace" },
    children_palace: { cx: 200, cy: 235, id: "children_palace", label: "Children Palace" },
    health_palace: { cx: 200, cy: 220, id: "health_palace", label: "Health Palace" },
    property_palace: { cx: 165, cy: 198, id: "property_palace", label: "Property Palace" },
    fortune_palace: { cx: 250, cy: 130, id: "fortune_palace", label: "Fortune Palace" },
    travel_palace: { cx: 285, cy: 145, id: "travel_palace", label: "Travel Palace" },
    siblings_palace: { cx: 160, cy: 185, id: "siblings_palace", label: "Siblings Palace" },
    servants_palace: { cx: 245, cy: 375, id: "servants_palace", label: "Support & Servants Palace" },
    parents_palace: { cx: 175, cy: 115, id: "parents_palace", label: "Parents Palace" }
  };

  const activePalaceData = SHI_ER_GONG_TWELVE_PALACES.find(p => p.id === selectedPalace);

  return (
    <div className="bg-slate-950 rounded-3xl border border-amber-500/30 overflow-hidden shadow-2xl flex flex-col">
      {/* Top Controls */}
      <div className="p-3.5 bg-slate-900 border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-400/30 flex items-center gap-1.5 text-[11px]">
            <User className="w-3.5 h-3.5 text-amber-400" />
            {viewMode === "front" ? "Frontal View (San Ting & 12 Palaces)" : "Side Profile (3D Contours)"}
          </span>
          {sideImageUrl && (
            <div className="flex bg-slate-950 rounded-lg p-0.5 border border-slate-800">
              <button
                onClick={() => setViewMode("front")}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${viewMode === "front" ? "bg-amber-500/20 text-amber-300" : "text-slate-500"}`}
              >
                Front
              </button>
              <button
                onClick={() => setViewMode("side")}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${viewMode === "side" ? "bg-amber-500/20 text-amber-300" : "text-slate-500"}`}
              >
                Profile
              </button>
            </div>
          )}
        </div>

        {/* Toggle Layers */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setShowSanTingBands(!showSanTingBands)}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
              showSanTingBands ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Three Zones (San Ting)
          </button>
          <button
            onClick={() => setShowPalaces(!showPalaces)}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
              showPalaces ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            12 Palaces
          </button>
          <button
            onClick={() => setShowFeatureContours(!showFeatureContours)}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
              showFeatureContours ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Contours
          </button>
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="relative w-full aspect-[4/5] sm:aspect-square max-h-[500px] flex items-center justify-center p-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        {viewMode === "front" && imageUrl ? (
          <img
            src={imageUrl}
            alt="Face Capture"
            className="absolute inset-0 w-full h-full object-contain opacity-40 filter contrast-125"
          />
        ) : null}

        {viewMode === "side" && sideImageUrl ? (
          <img
            src={sideImageUrl}
            alt="Side Profile Capture"
            className="absolute inset-0 w-full h-full object-contain opacity-40 filter contrast-125"
          />
        ) : null}

        <svg
          viewBox="0 0 400 500"
          className="relative z-10 w-full h-full max-w-[420px] max-h-[480px] drop-shadow-[0_0_15px_rgba(245,158,11,0.2)]"
        >
          {/* San Ting 3-Zone Horizontal Bands */}
          {showSanTingBands && viewMode === "front" && (
            <g className="transition-opacity duration-300">
              {/* Upper Zone (Heaven): Hairline to Eyebrows (Ages 15-30) */}
              <rect x="40" y="80" width="320" height="105" fill="rgba(59, 130, 246, 0.12)" stroke="rgba(59, 130, 246, 0.4)" strokeDasharray="3 3" rx="8" />
              <text x="50" y="100" fill="#93C5FD" fontSize="10" fontWeight="bold">Upper Zone (Heaven)</text>
              <text x="50" y="114" fill="#60A5FA" fontSize="8">Ages 15–30 • Intellect & Ancestral Fortune</text>

              {/* Middle Zone (Human): Eyebrows to Base of Nose (Ages 31-50) */}
              <rect x="40" y="190" width="320" height="95" fill="rgba(245, 158, 11, 0.12)" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="3 3" rx="8" />
              <text x="50" y="210" fill="#FDE047" fontSize="10" fontWeight="bold">Middle Zone (Human)</text>
              <text x="50" y="224" fill="#FBBF24" fontSize="8">Ages 31–50 • Willpower & Career Peak</text>

              {/* Lower Zone (Earth): Base of Nose to Chin (Ages 51+) */}
              <rect x="40" y="290" width="320" height="135" fill="rgba(16, 185, 129, 0.12)" stroke="rgba(16, 185, 129, 0.4)" strokeDasharray="3 3" rx="8" />
              <text x="50" y="310" fill="#6EE7B7" fontSize="10" fontWeight="bold">Lower Zone (Earth)</text>
              <text x="50" y="324" fill="#34D399" fontSize="8">Ages 51+ • Stability & Generational Legacy</text>
            </g>
          )}

          {/* Facial Silhouette Contours */}
          {showFeatureContours && viewMode === "front" && (
            <g>
              {/* Outer Head Contour */}
              <path
                d="M 120,110 C 140,70 260,70 280,110 C 315,160 320,280 290,370 C 265,410 230,430 200,430 C 170,430 135,410 110,370 C 80,280 85,160 120,110 Z"
                fill="rgba(30, 27, 24, 0.35)"
                stroke="rgba(245, 158, 11, 0.3)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Eyebrows */}
              <path d="M 140,185 Q 165,178 185,185" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 215,185 Q 235,178 260,185" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />

              {/* Eyes */}
              <ellipse cx="162" cy="210" rx="18" ry="9" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
              <circle cx="162" cy="210" r="4" fill="#60A5FA" />
              <ellipse cx="238" cy="210" rx="18" ry="9" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
              <circle cx="238" cy="210" r="4" fill="#60A5FA" />

              {/* Nose */}
              <path d="M 200,195 L 196,255 Q 200,268 204,255 Z" fill="none" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
              <circle cx="200" cy="265" r="8" fill="rgba(234, 179, 8, 0.2)" stroke="#EAB308" strokeWidth="1.5" />

              {/* Lips */}
              <path d="M 175,325 Q 190,318 200,322 Q 210,318 225,325 Q 200,342 175,325 Z" fill="rgba(244, 63, 94, 0.25)" stroke="#F43F5E" strokeWidth="1.5" />

              {/* Chin */}
              <path d="M 180,390 Q 200,410 220,390" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* 12 Shi Er Gong Palaces Pins */}
          {showPalaces && viewMode === "front" && (
            <g className="transition-all duration-300">
              {Object.entries(palacePins).map(([pId, pin]) => {
                const isSelected = selectedPalace === pId;
                return (
                  <g
                    key={pId}
                    className="cursor-pointer group"
                    onClick={() => setSelectedPalace(pId)}
                  >
                    <circle
                      cx={pin.cx}
                      cy={pin.cy}
                      r={isSelected ? 9 : 6}
                      fill={isSelected ? "#F59E0B" : "rgba(245, 158, 11, 0.35)"}
                      stroke="#FBBF24"
                      strokeWidth={isSelected ? "2.5" : "1.5"}
                      className="transition-all"
                    />
                    {isSelected && (
                      <circle
                        cx={pin.cx}
                        cy={pin.cy}
                        r="15"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                        className="animate-ping"
                      />
                    )}
                  </g>
                );
              })}
            </g>
          )}
        </svg>
      </div>

      {/* Interactive Palace Details Footer */}
      {activePalaceData && (
        <div className="p-4 bg-slate-900 border-t border-amber-500/20 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <h4 className="font-bold text-amber-200 text-xs sm:text-sm">
                {activePalaceData.palaceName} <span className="font-serif text-amber-300/80 font-normal">({activePalaceData.chineseName})</span>
              </h4>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md font-mono">
                {activePalaceData.location}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">{activePalaceData.reading}</p>
          </div>

          <button
            onClick={() => setSelectedPalace(null)}
            className="text-slate-500 hover:text-amber-300 text-xs px-2 py-1 bg-slate-800 rounded-lg cursor-pointer"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};
