import React, { useState } from "react";
import { Hand, Eye, Move, Check, Sparkles, Layers, Shield } from "lucide-react";
import { MountLevel } from "../../types/palmistry";

interface PalmInteractiveCanvasProps {
  hand: "left" | "right";
  isDominant?: boolean;
  imageUrl?: string | null;
  editable?: boolean;
  onLineChange?: (lineName: string, changes: any) => void;
}

export const PalmInteractiveCanvas: React.FC<PalmInteractiveCanvasProps> = ({
  hand = "right",
  isDominant = true,
  imageUrl,
  editable = false,
  onLineChange
}) => {
  const [selectedElement, setSelectedElement] = useState<string | null>("life");
  const [showMounts, setShowMounts] = useState<boolean>(true);
  const [showPrincipalLines, setShowPrincipalLines] = useState<boolean>(true);
  const [showSecondaryLines, setShowSecondaryLines] = useState<boolean>(true);

  // Line & mount descriptions for interactive hover/click
  const elementDetails: Record<string, { name: string; type: string; meaning: string; color: string }> = {
    life: {
      name: "Life Line (Aayu Rekha)",
      type: "Principal Line",
      meaning: "Curves around the base of the thumb. Governs physical vitality, constitutional resilience, and patterns of major life transitions.",
      color: "#10B981" // Emerald
    },
    head: {
      name: "Head Line (Masti Rekha)",
      type: "Principal Line",
      meaning: "Runs horizontally across the palm. Reads thinking style, intellectual focus, strategic reasoning, and communication cadence.",
      color: "#3B82F6" // Blue
    },
    heart: {
      name: "Heart Line (Hridaya Rekha)",
      type: "Principal Line",
      meaning: "Upper horizontal line. Reads emotional nature, relationship loyalty, capacity for intimacy, and affectionate warmth.",
      color: "#EC4899" // Pink
    },
    fate: {
      name: "Fate Line (Saturn Line / Bhagya Rekha)",
      type: "Secondary Line",
      meaning: "Ascends vertically toward middle finger. Reflects career direction, vocational purpose, and self-directed achievement.",
      color: "#F59E0B" // Amber
    },
    sun: {
      name: "Sun Line (Apollo Line / Surya Rekha)",
      type: "Secondary Line",
      meaning: "Ascends toward ring finger. Signifies creative fulfillment, public recognition, charismatic aura, and artistic reward.",
      color: "#EAB308" // Gold
    },
    mercury_line: {
      name: "Mercury Line (Health / Budha Rekha)",
      type: "Secondary Line",
      meaning: "Runs diagonally toward little finger. Indicates nervous vitality, commercial acumen, and mind-body coordination.",
      color: "#06B6D4" // Cyan
    },
    mount_jupiter: {
      name: "Jupiter Mount (Guru Parvat)",
      type: "Mount",
      meaning: "Base of index finger. Governs executive ambition, noble leadership, spiritual dignity, and sovereign self-respect.",
      color: "#F97316"
    },
    mount_saturn: {
      name: "Saturn Mount (Shani Parvat)",
      type: "Mount",
      meaning: "Base of middle finger. Governs discipline, scholarly focus, perseverance, and profound philosophical introspection.",
      color: "#8B5CF6"
    },
    mount_apollo: {
      name: "Apollo Mount (Surya Parvat)",
      type: "Mount",
      meaning: "Base of ring finger. Governs creative inspiration, aesthetic charm, joy, and social magnetism.",
      color: "#EAB308"
    },
    mount_mercury: {
      name: "Mercury Mount (Budh Parvat)",
      type: "Mount",
      meaning: "Base of little finger. Governs swift communication eloquence, commercial intelligence, and negotiations.",
      color: "#14B8A6"
    },
    mount_venus: {
      name: "Venus Mount (Shukra Parvat)",
      type: "Mount",
      meaning: "Fleshy base of thumb. Governs vital warmth, romantic devotion, sensuality, and familial harmony.",
      color: "#F43F5E"
    },
    mount_luna: {
      name: "Luna Mount (Chandra Parvat)",
      type: "Mount",
      meaning: "Lower outer edge of palm opposite thumb. Governs imagination, psychic intuition, and love of journeys.",
      color: "#6366F1"
    }
  };

  const activeInfo = selectedElement ? elementDetails[selectedElement] : null;

  // Mirror X coordinates for left hand
  const isLeft = hand === "left";
  const transformX = (x: number) => (isLeft ? 400 - x : x);

  return (
    <div className="bg-slate-950 rounded-3xl border border-amber-500/30 overflow-hidden shadow-2xl flex flex-col">
      {/* Top Bar Controls */}
      <div className="p-3.5 bg-slate-900 border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-400/30 flex items-center gap-1.5 text-[11px]">
            <Hand className="w-3.5 h-3.5 text-amber-400" />
            {hand === "right" ? "Right Hand (Active Karma)" : "Left Hand (Innate Blueprint)"}
            {isDominant && <span className="text-[10px] text-emerald-400 ml-1">• Dominant</span>}
          </span>
          <span className="text-slate-400 text-[11px] hidden sm:inline">Click any line or mount to inspect details</span>
        </div>

        {/* Toggle Layers */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setShowPrincipalLines(!showPrincipalLines)}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
              showPrincipalLines ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Principal Lines
          </button>
          <button
            onClick={() => setShowSecondaryLines(!showSecondaryLines)}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
              showSecondaryLines ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Secondary Lines
          </button>
          <button
            onClick={() => setShowMounts(!showMounts)}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
              showMounts ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Mounts
          </button>
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="relative w-full aspect-[4/5] sm:aspect-square max-h-[500px] flex items-center justify-center p-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Hand Capture"
            className="absolute inset-0 w-full h-full object-contain opacity-40 filter contrast-125"
          />
        ) : null}

        <svg
          viewBox="0 0 400 500"
          className="relative z-10 w-full h-full max-w-[420px] max-h-[480px] drop-shadow-[0_0_15px_rgba(245,158,11,0.2)]"
        >
          {/* Hand Silhouette Guide */}
          <path
            d={
              isLeft
                ? "M 180,480 C 130,470 100,430 90,380 C 75,300 40,240 70,180 C 85,150 110,130 130,70 C 140,40 160,30 170,70 C 185,120 185,140 195,50 C 205,20 225,20 230,60 C 240,120 240,140 250,80 C 260,50 275,50 280,90 C 290,140 290,160 300,140 C 310,120 325,130 325,160 C 325,260 310,380 270,440 C 250,470 220,480 180,480 Z"
                : "M 220,480 C 270,470 300,430 310,380 C 325,300 360,240 330,180 C 315,150 290,130 270,70 C 260,40 240,30 230,70 C 215,120 215,140 205,50 C 195,20 175,20 170,60 C 160,120 160,140 150,80 C 140,50 125,50 120,90 C 110,140 110,160 100,140 C 90,120 75,130 75,160 C 75,260 90,380 130,440 C 150,470 180,480 220,480 Z"
            }
            fill="rgba(30, 27, 24, 0.45)"
            stroke="rgba(245, 158, 11, 0.35)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Mounts Circles */}
          {showMounts && (
            <g className="transition-opacity duration-300">
              {/* Jupiter Mount */}
              <circle
                cx={transformX(145)}
                cy="175"
                r="18"
                fill="rgba(249, 115, 22, 0.25)"
                stroke="#F97316"
                strokeWidth="1.5"
                className="cursor-pointer hover:r-[22] transition-all"
                onClick={() => setSelectedElement("mount_jupiter")}
              />
              <text x={transformX(145)} y="178" fill="#FDBA74" fontSize="9" textAnchor="middle" fontWeight="bold">Guru</text>

              {/* Saturn Mount */}
              <circle
                cx={transformX(185)}
                cy="165"
                r="18"
                fill="rgba(139, 92, 246, 0.25)"
                stroke="#8B5CF6"
                strokeWidth="1.5"
                className="cursor-pointer hover:r-[22] transition-all"
                onClick={() => setSelectedElement("mount_saturn")}
              />
              <text x={transformX(185)} y="168" fill="#C4B5FD" fontSize="9" textAnchor="middle" fontWeight="bold">Shani</text>

              {/* Apollo Mount */}
              <circle
                cx={transformX(225)}
                cy="170"
                r="18"
                fill="rgba(234, 179, 8, 0.25)"
                stroke="#EAB308"
                strokeWidth="1.5"
                className="cursor-pointer hover:r-[22] transition-all"
                onClick={() => setSelectedElement("mount_apollo")}
              />
              <text x={transformX(225)} y="173" fill="#FDE047" fontSize="9" textAnchor="middle" fontWeight="bold">Surya</text>

              {/* Mercury Mount */}
              <circle
                cx={transformX(265)}
                cy="190"
                r="18"
                fill="rgba(20, 184, 166, 0.25)"
                stroke="#14B8A6"
                strokeWidth="1.5"
                className="cursor-pointer hover:r-[22] transition-all"
                onClick={() => setSelectedElement("mount_mercury")}
              />
              <text x={transformX(265)} y="193" fill="#5EEAD4" fontSize="9" textAnchor="middle" fontWeight="bold">Budh</text>

              {/* Venus Mount */}
              <circle
                cx={transformX(135)}
                cy="330"
                r="30"
                fill="rgba(244, 63, 94, 0.2)"
                stroke="#F43F5E"
                strokeWidth="1.5"
                className="cursor-pointer hover:r-[34] transition-all"
                onClick={() => setSelectedElement("mount_venus")}
              />
              <text x={transformX(135)} y="333" fill="#FDA4AF" fontSize="10" textAnchor="middle" fontWeight="bold">Shukra</text>

              {/* Luna Mount */}
              <circle
                cx={transformX(265)}
                cy="350"
                r="28"
                fill="rgba(99, 102, 241, 0.2)"
                stroke="#6366F1"
                strokeWidth="1.5"
                className="cursor-pointer hover:r-[32] transition-all"
                onClick={() => setSelectedElement("mount_luna")}
              />
              <text x={transformX(265)} y="353" fill="#A5B4FC" fontSize="10" textAnchor="middle" fontWeight="bold">Chandra</text>
            </g>
          )}

          {/* Principal Lines */}
          {showPrincipalLines && (
            <g className="transition-opacity duration-300">
              {/* Heart Line */}
              <path
                d={
                  isLeft
                    ? "M 135,225 Q 200,215 255,200"
                    : "M 265,225 Q 200,215 145,200"
                }
                fill="none"
                stroke="#EC4899"
                strokeWidth={selectedElement === "heart" ? "5" : "3.5"}
                strokeLinecap="round"
                className="cursor-pointer transition-all hover:stroke-[5]"
                onClick={() => setSelectedElement("heart")}
              />
              <text x={transformX(240)} y="215" fill="#F472B6" fontSize="9" fontWeight="bold">Heart Line</text>

              {/* Head Line */}
              <path
                d={
                  isLeft
                    ? "M 270,235 Q 200,265 140,295"
                    : "M 130,235 Q 200,265 260,295"
                }
                fill="none"
                stroke="#3B82F6"
                strokeWidth={selectedElement === "head" ? "5" : "3.5"}
                strokeLinecap="round"
                className="cursor-pointer transition-all hover:stroke-[5]"
                onClick={() => setSelectedElement("head")}
              />
              <text x={transformX(210)} y="260" fill="#60A5FA" fontSize="9" fontWeight="bold">Head Line</text>

              {/* Life Line */}
              <path
                d={
                  isLeft
                    ? "M 270,235 Q 235,320 215,440"
                    : "M 130,235 Q 165,320 185,440"
                }
                fill="none"
                stroke="#10B981"
                strokeWidth={selectedElement === "life" ? "5" : "4"}
                strokeLinecap="round"
                className="cursor-pointer transition-all hover:stroke-[5]"
                onClick={() => setSelectedElement("life")}
              />
              <text x={transformX(175)} y="320" fill="#34D399" fontSize="9" fontWeight="bold">Life Line</text>
            </g>
          )}

          {/* Secondary Lines */}
          {showSecondaryLines && (
            <g className="transition-opacity duration-300">
              {/* Fate Line */}
              <path
                d={
                  isLeft
                    ? "M 200,440 Q 195,300 185,185"
                    : "M 200,440 Q 205,300 215,185"
                }
                fill="none"
                stroke="#F59E0B"
                strokeWidth={selectedElement === "fate" ? "4.5" : "2.5"}
                strokeDasharray="6 3"
                strokeLinecap="round"
                className="cursor-pointer transition-all hover:stroke-[4.5]"
                onClick={() => setSelectedElement("fate")}
              />
              <text x={transformX(202)} y="390" fill="#FBBF24" fontSize="8" fontWeight="bold">Fate</text>

              {/* Sun Line */}
              <path
                d={
                  isLeft
                    ? "M 175,320 Q 175,240 175,190"
                    : "M 225,320 Q 225,240 225,190"
                }
                fill="none"
                stroke="#EAB308"
                strokeWidth={selectedElement === "sun" ? "4" : "2"}
                strokeLinecap="round"
                className="cursor-pointer transition-all hover:stroke-[4]"
                onClick={() => setSelectedElement("sun")}
              />

              {/* Mercury Line */}
              <path
                d={
                  isLeft
                    ? "M 215,380 Q 165,300 135,210"
                    : "M 185,380 Q 235,300 265,210"
                }
                fill="none"
                stroke="#06B6D4"
                strokeWidth={selectedElement === "mercury_line" ? "4" : "2"}
                strokeDasharray="4 3"
                strokeLinecap="round"
                className="cursor-pointer transition-all hover:stroke-[4]"
                onClick={() => setSelectedElement("mercury_line")}
              />
            </g>
          )}

          {/* Sacred Mark: Trident on Saturn */}
          <g transform={`translate(${transformX(185)}, 165)`}>
            <line x1="0" y1="8" x2="0" y2="-8" stroke="#FDE047" strokeWidth="1.5" />
            <line x1="-5" y1="2" x2="-5" y2="-6" stroke="#FDE047" strokeWidth="1.5" />
            <line x1="5" y1="2" x2="5" y2="-6" stroke="#FDE047" strokeWidth="1.5" />
            <path d="M -5,2 Q 0,8 5,2" fill="none" stroke="#FDE047" strokeWidth="1.5" />
          </g>
        </svg>
      </div>

      {/* Interactive Detail Card */}
      {activeInfo && (
        <div className="p-4 bg-slate-900 border-t border-amber-500/20 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: activeInfo.color }}
              />
              <h4 className="font-bold text-amber-200 text-xs sm:text-sm">{activeInfo.name}</h4>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md font-mono">
                {activeInfo.type}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">{activeInfo.meaning}</p>
          </div>

          <button
            onClick={() => setSelectedElement(null)}
            className="text-slate-500 hover:text-amber-300 text-xs px-2 py-1 bg-slate-800 rounded-lg cursor-pointer"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};
