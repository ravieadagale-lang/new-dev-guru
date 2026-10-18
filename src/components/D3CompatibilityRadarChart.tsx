import React, { useMemo } from "react";
import { Sparkles, Heart } from "lucide-react";

export interface CompatibilityMetric {
  category: string;
  score: number; // 0 to 100
}

export interface D3CompatibilityRadarChartProps {
  metrics: CompatibilityMetric[];
  overallScore: number;
  verdictLabel: string;
  partnerAName: string;
  partnerBName: string;
}

export const D3CompatibilityRadarChart: React.FC<D3CompatibilityRadarChartProps> = ({
  metrics,
  overallScore,
  verdictLabel,
  partnerAName,
  partnerBName,
}) => {
  const size = 380;
  const center = size / 2;
  const radius = 130;
  const totalAxes = metrics.length || 8;
  const angleSlice = (Math.PI * 2) / totalAxes;

  // Grid levels (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Calculate polygon coordinates for a given fraction level
  const getPolygonCoordinates = (level: number) => {
    return Array.from({ length: totalAxes }).map((_, i) => {
      const angle = i * angleSlice - Math.PI / 2;
      const r = radius * level;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(" ");
  };

  // Calculate data polygon coordinates
  const dataPolygon = useMemo(() => {
    if (!metrics.length) return "";
    return metrics.map((m, i) => {
      const angle = i * angleSlice - Math.PI / 2;
      const clampedScore = Math.max(5, Math.min(100, m.score)) / 100;
      const r = radius * clampedScore;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(" ");
  }, [metrics, angleSlice, radius, center]);

  return (
    <div className="bg-white rounded-3xl border border-amber-900/10 p-6 shadow-sm flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-2">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-700">
            Ashta Koota Synergy Spectrum
          </span>
          <h3 className="font-serif font-bold text-lg text-slate-900">
            {partnerAName} &amp; {partnerBName}
          </h3>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>{overallScore}% Match</span>
          </span>
          <div className="text-xs font-medium text-slate-500 mt-0.5">{verdictLabel}</div>
        </div>
      </div>

      <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <radialGradient id="radarFillGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.15" />
            </radialGradient>
            <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#d97706" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Concentric grid polygons */}
          {levels.map((lvl, idx) => (
            <polygon
              key={idx}
              points={getPolygonCoordinates(lvl)}
              fill={idx % 2 === 0 ? "#fffbeb" : "none"}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray={idx === levels.length - 1 ? undefined : "2 2"}
            />
          ))}

          {/* Grid axes lines */}
          {Array.from({ length: totalAxes }).map((_, i) => {
            const angle = i * angleSlice - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#cbd5e1"
                strokeWidth="1"
              />
            );
          })}

          {/* Data Filled Polygon */}
          {dataPolygon && (
            <polygon
              points={dataPolygon}
              fill="url(#radarFillGrad)"
              stroke="#d97706"
              strokeWidth="2.5"
              filter="url(#radarGlow)"
            />
          )}

          {/* Data Points and Category Labels */}
          {metrics.map((m, i) => {
            const angle = i * angleSlice - Math.PI / 2;
            const clampedScore = Math.max(5, Math.min(100, m.score)) / 100;
            const r = radius * clampedScore;
            const px = center + r * Math.cos(angle);
            const py = center + r * Math.sin(angle);

            // Label position slightly outside max radius
            const labelDist = radius + 24;
            const lx = center + labelDist * Math.cos(angle);
            const ly = center + labelDist * Math.sin(angle);

            return (
              <g key={i}>
                {/* Node point */}
                <circle
                  cx={px}
                  cy={py}
                  r="4"
                  fill="#b45309"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />

                {/* Category label */}
                <text
                  x={lx}
                  y={ly}
                  textAnchor={
                    Math.abs(Math.cos(angle)) < 0.2
                      ? "middle"
                      : Math.cos(angle) > 0
                      ? "start"
                      : "end"
                  }
                  dominantBaseline="central"
                  className="fill-slate-700 text-[10px] font-medium"
                >
                  {m.category.split(" ")[0]} ({m.score}%)
                </text>
              </g>
            );
          })}

          {/* Central emblem */}
          <circle cx={center} cy={center} r="6" fill="#f59e0b" />
          <circle cx={center} cy={center} r="2.5" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
};
