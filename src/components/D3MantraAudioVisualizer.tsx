import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { 
  Sparkles, 
  Disc, 
  Activity, 
  Sun, 
  Eye, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  Zap,
  Radio,
  Sliders
} from "lucide-react";

export type VisualizerMode = "mandala" | "chakra" | "yantra" | "cosmic";

interface D3MantraAudioVisualizerProps {
  isPlaying?: boolean;
  mantraTitle?: string;
  rashi?: string;
  activeBead?: number;
  height?: number;
  className?: string;
  showControls?: boolean;
}

export const D3MantraAudioVisualizer: React.FC<D3MantraAudioVisualizerProps> = ({
  isPlaying = true,
  mantraTitle = "Om Namah Shivaya",
  rashi = "Taurus",
  activeBead = 0,
  height = 280,
  className = "",
  showControls = true
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<VisualizerMode>("mandala");
  const [sensitivity, setSensitivity] = useState<number>(1.2);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Phase tracker for smooth mathematical wave synthesis
  const phaseRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = containerRef.current?.clientWidth || 500;
    const h = height;
    const centerX = width / 2;
    const centerY = h / 2;

    svg.attr("viewBox", `0 0 ${width} ${h}`);

    // Frequency Bins count (e.g. 64)
    const numBins = 64;
    const dummyFrequencies = new Array(numBins).fill(0);

    const renderFrame = () => {
      phaseRef.current += 0.04;
      const phase = phaseRef.current;
      const beatPulse = isPlaying ? Math.sin(phase * 1.5) * 0.25 + 1 : 0.2;

      // Synthesize realistic audio frequency spectrum data with harmonics & noise
      for (let i = 0; i < numBins; i++) {
        if (isPlaying) {
          const harmonic1 = Math.sin(phase * 2 + i * 0.2) * 30 * sensitivity;
          const harmonic2 = Math.cos(phase * 3 - i * 0.15) * 20 * sensitivity;
          const noise = (Math.random() - 0.5) * 8 * sensitivity;
          const beadBoost = (i === activeBead % numBins) ? 25 : 0;
          dummyFrequencies[i] = Math.max(8, Math.min(100, 35 + harmonic1 + harmonic2 + noise + beadBoost));
        } else {
          dummyFrequencies[i] = 5 + Math.sin(phase + i) * 2;
        }
      }

      svg.selectAll("*").remove();

      // Create main defs for gradients and glow filters
      const defs = svg.append("defs");

      // Glow Filter
      const filter = defs.append("filter")
        .attr("id", "sacredGlow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");

      filter.append("feGaussianBlur")
        .attr("stdDeviation", "4")
        .attr("result", "blur");

      const feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode").attr("in", "blur");
      feMerge.append("feMergeNode").attr("in", "SourceGraphic");

      // Radial Gold Gradient
      const goldGrad = defs.append("radialGradient")
        .attr("id", "goldCoreGrad")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%");

      goldGrad.append("stop").attr("offset", "0%").attr("stop-color", "#FDE047").attr("stop-opacity", "0.9");
      goldGrad.append("stop").attr("offset", "50%").attr("stop-color", "#F59E0B").attr("stop-opacity", "0.6");
      goldGrad.append("stop").attr("offset", "100%").attr("stop-color", "#78350F").attr("stop-opacity", "0");

      const g = svg.append("g").attr("transform", `translate(${centerX}, ${centerY})`);

      // MODE 1: SACRED MANDALA WAVE (Radial D3 Line)
      if (mode === "mandala") {
        const baseRadius = Math.min(centerX, centerY) * 0.45;

        // Background Pulsing Aura
        g.append("circle")
          .attr("r", baseRadius * 1.3 * beatPulse)
          .attr("fill", "url(#goldCoreGrad)")
          .attr("opacity", isPlaying ? 0.4 : 0.1);

        // Multiple concentric mandala rings
        const ringCount = 3;
        for (let rIdx = 0; rIdx < ringCount; rIdx++) {
          const radiusOffset = (rIdx + 1) * 22;
          const ringRadius = baseRadius + radiusOffset * 0.5;

          const radialLine = d3.lineRadial<number>()
            .angle((_, i) => (i / numBins) * 2 * Math.PI)
            .radius((d, i) => {
              const altModifier = (i % 2 === 0 ? 1 : -1) * (rIdx * 3);
              return ringRadius + (d * 0.4 * sensitivity) + altModifier;
            })
            .curve(d3.curveBasisClosed);

          const ringColor = rIdx === 0 ? "#F59E0B" : rIdx === 1 ? "#10B981" : "#06B6D4";

          g.append("path")
            .datum(dummyFrequencies)
            .attr("d", radialLine)
            .attr("fill", rIdx === 0 ? "rgba(245, 158, 11, 0.08)" : "none")
            .attr("stroke", ringColor)
            .attr("stroke-width", 2 - rIdx * 0.4)
            .attr("filter", rIdx === 0 ? "url(#sacredGlow)" : undefined)
            .attr("opacity", isPlaying ? 0.9 : 0.3);
        }

        // Radial Petals / Frequency Pins
        const angleStep = (2 * Math.PI) / numBins;
        dummyFrequencies.forEach((val, i) => {
          const angle = i * angleStep;
          const innerR = baseRadius * 0.7;
          const outerR = baseRadius * 0.7 + val * 0.6 * sensitivity;

          const x1 = Math.cos(angle) * innerR;
          const y1 = Math.sin(angle) * innerR;
          const x2 = Math.cos(angle) * outerR;
          const y2 = Math.sin(angle) * outerR;

          const hue = (i / numBins) * 360;
          const col = d3.hsl(hue, 0.85, 0.6).formatHex();

          g.append("line")
            .attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x2)
            .attr("y2", y2)
            .attr("stroke", col)
            .attr("stroke-width", 2.5)
            .attr("stroke-linecap", "round")
            .attr("opacity", isPlaying ? 0.85 : 0.2);

          // Bead tips
          g.append("circle")
            .attr("cx", x2)
            .attr("cy", y2)
            .attr("r", (i === activeBead % numBins) ? 4 : 2)
            .attr("fill", col)
            .attr("filter", "url(#sacredGlow)");
        });

        // Center Sacred Symbol / Bead Counter
        g.append("circle")
          .attr("r", baseRadius * 0.35 * (1 + (beatPulse - 1) * 0.2))
          .attr("fill", "#1E1B18")
          .attr("stroke", "#F59E0B")
          .attr("stroke-width", 2)
          .attr("filter", "url(#sacredGlow)");

        g.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "-0.2em")
          .attr("fill", "#FDE047")
          .attr("font-size", "22px")
          .attr("font-family", "serif")
          .attr("font-weight", "bold")
          .text("ॐ");

        g.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "1.4em")
          .attr("fill", "#9CA3AF")
          .attr("font-size", "10px")
          .attr("font-family", "sans-serif")
          .text(`BEAD ${activeBead}/108`);
      }

      // MODE 2: CHAKRA FREQUENCY SPECTRUM BARS
      else if (mode === "chakra") {
        const chakraColors = [
          { name: "Muladhara (Root)", color: "#EF4444" },
          { name: "Swadhisthana (Sacral)", color: "#F97316" },
          { name: "Manipura (Solar)", color: "#EAB308" },
          { name: "Anahata (Heart)", color: "#10B981" },
          { name: "Vishuddha (Throat)", color: "#06B6D4" },
          { name: "Ajna (Third Eye)", color: "#6366F1" },
          { name: "Sahasrara (Crown)", color: "#A855F7" },
        ];

        const barWidth = (width * 0.8) / numBins;
        const startX = -(width * 0.4);
        const maxBarH = h * 0.6;

        // Base line
        g.append("line")
          .attr("x1", startX)
          .attr("y1", maxBarH / 2)
          .attr("x2", -startX)
          .attr("y2", maxBarH / 2)
          .attr("stroke", "#374151")
          .attr("stroke-width", 1);

        dummyFrequencies.forEach((val, i) => {
          const x = startX + i * barWidth;
          const barH = (val / 100) * maxBarH * sensitivity;

          const chakraIdx = Math.floor((i / numBins) * 7);
          const colorInfo = chakraColors[chakraIdx] || chakraColors[0];

          // Mirror Spectrum Bar
          g.append("rect")
            .attr("x", x)
            .attr("y", (maxBarH / 2) - (barH / 2))
            .attr("width", Math.max(1, barWidth - 2))
            .attr("height", barH)
            .attr("rx", 3)
            .attr("fill", colorInfo.color)
            .attr("opacity", isPlaying ? 0.85 : 0.25)
            .attr("filter", i % 8 === 0 ? "url(#sacredGlow)" : undefined);
        });

        // Chakra labels underneath
        const chakraSectionWidth = (width * 0.8) / 7;
        chakraColors.forEach((ch, idx) => {
          const cx = startX + idx * chakraSectionWidth + (chakraSectionWidth / 2);
          g.append("circle")
            .attr("cx", cx)
            .attr("cy", (maxBarH / 2) + 24)
            .attr("r", 5)
            .attr("fill", ch.color);

          g.append("text")
            .attr("x", cx)
            .attr("y", (maxBarH / 2) + 38)
            .attr("text-anchor", "middle")
            .attr("fill", "#D1D5DB")
            .attr("font-size", "9px")
            .text(ch.name.split(" ")[0]);
        });
      }

      // MODE 3: SRI YANTRA GEOMETRIC OSCILLATIONS
      else if (mode === "yantra") {
        const baseSize = Math.min(centerX, centerY) * 0.55;

        // Triangles layer count (nested interlocking triangles)
        const triangleLevels = [
          { points: 3, rot: phase * 10, dir: 1, color: "#F59E0B" },
          { points: 3, rot: -phase * 8, dir: -1, color: "#EC4899" },
          { points: 3, rot: phase * 12 + 180, dir: 1, color: "#10B981" },
          { points: 3, rot: -phase * 6 + 180, dir: -1, color: "#06B6D4" },
          { points: 8, rot: phase * 4, dir: 1, color: "#A855F7" },
        ];

        triangleLevels.forEach((level, lIdx) => {
          const scaleFactor = (1 - lIdx * 0.15) * (isPlaying ? beatPulse : 1);
          const size = baseSize * scaleFactor;

          const polyPoints: [number, number][] = [];
          for (let p = 0; p < level.points; p++) {
            const angle = ((p * (360 / level.points)) + level.rot) * (Math.PI / 180);
            const freqMod = dummyFrequencies[(p * 12 + lIdx * 5) % numBins] * 0.2;
            const r = size + freqMod;
            polyPoints.push([Math.cos(angle) * r, Math.sin(angle) * r]);
          }

          const lineGenerator = d3.line<[number, number]>()
            .x(d => d[0])
            .y(d => d[1])
            .curve(d3.curveLinearClosed);

          g.append("path")
            .datum(polyPoints)
            .attr("d", lineGenerator)
            .attr("fill", "none")
            .attr("stroke", level.color)
            .attr("stroke-width", 2)
            .attr("filter", lIdx === 0 ? "url(#sacredGlow)" : undefined)
            .attr("opacity", isPlaying ? 0.8 : 0.3);
        });

        // Center Bindu
        g.append("circle")
          .attr("r", 6 * beatPulse)
          .attr("fill", "#FDE047")
          .attr("filter", "url(#sacredGlow)");
      }

      // MODE 4: COSMIC PARTICLES RADIAL FIELD
      else if (mode === "cosmic") {
        const particleCount = 48;
        for (let p = 0; p < particleCount; p++) {
          const angle = (p / particleCount) * 2 * Math.PI + (phase * 0.2);
          const freqVal = dummyFrequencies[p % numBins];
          const dist = (p * 4) + (freqVal * 1.8 * sensitivity) % (centerX * 0.8);

          const px = Math.cos(angle) * dist;
          const py = Math.sin(angle) * dist;
          const pSize = 1.5 + (freqVal / 100) * 4;

          const color = d3.hsl((p * 15 + phase * 20) % 360, 0.9, 0.65).formatHex();

          g.append("circle")
            .attr("cx", px)
            .attr("cy", py)
            .attr("r", pSize)
            .attr("fill", color)
            .attr("opacity", isPlaying ? 0.85 : 0.2)
            .attr("filter", "url(#sacredGlow)");

          // Connecting spider web lines to neighbor
          if (p % 3 === 0) {
            const nextAngle = ((p + 1) / particleCount) * 2 * Math.PI + (phase * 0.2);
            const nextDist = ((p + 1) * 4) + (dummyFrequencies[(p + 1) % numBins] * 1.8 * sensitivity) % (centerX * 0.8);
            g.append("line")
              .attr("x1", px)
              .attr("y1", py)
              .attr("x2", Math.cos(nextAngle) * nextDist)
              .attr("y2", Math.sin(nextAngle) * nextDist)
              .attr("stroke", color)
              .attr("stroke-width", 0.5)
              .attr("opacity", 0.3);
          }
        }
      }

      if (isPlaying) {
        animFrameRef.current = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [mode, isPlaying, sensitivity, height, activeBead]);

  return (
    <div 
      ref={containerRef}
      className={`relative rounded-2xl bg-[#0C0A09] border border-amber-500/30 overflow-hidden shadow-2xl ${className} ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none h-screen w-screen" : ""
      }`}
    >
      {/* HEADER OVERLAY */}
      <div className="absolute top-3 left-4 right-4 z-10 flex items-center justify-between text-xs pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-serif font-bold text-amber-200 tracking-wide text-xs sm:text-sm">
            {mantraTitle} • D3 Sacred Visualizer
          </span>
        </div>

        {showControls && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg bg-slate-900/80 text-amber-300 hover:bg-slate-800 border border-amber-500/30 cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}
      </div>

      {/* D3 CANVAS CONTAINER */}
      <div className="w-full h-full flex items-center justify-center p-2">
        <svg ref={svgRef} className="w-full h-full" style={{ maxHeight: isFullscreen ? "85vh" : `${height}px` }} />
      </div>

      {/* CONTROL BAR FOOTER */}
      {showControls && (
        <div className="absolute bottom-3 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 text-[11px] bg-slate-950/80 backdrop-blur-md p-2 rounded-xl border border-amber-500/20">
          {/* VISUAL MODES */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400 font-medium mr-1 hidden sm:inline">Mode:</span>
            {[
              { id: "mandala", label: "Mandala Wave", icon: Disc },
              { id: "chakra", label: "Chakra Spectrum", icon: Activity },
              { id: "yantra", label: "Sri Yantra", icon: Sun },
              { id: "cosmic", label: "Cosmic Field", icon: Sparkles },
            ].map((m) => {
              const Icon = m.icon;
              const isActive = mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as VisualizerMode)}
                  className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                    isActive
                      ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                      : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden md:inline">{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* SENSITIVITY SLIDER */}
          <div className="flex items-center gap-2">
            <Sliders className="w-3 h-3 text-amber-400" />
            <span className="text-slate-400 text-[10px] hidden sm:inline">Resonance:</span>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={sensitivity}
              onChange={(e) => setSensitivity(parseFloat(e.target.value))}
              className="w-16 accent-amber-500 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
