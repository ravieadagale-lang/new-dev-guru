import React from "react";

export const SacredGeometryBg: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
      {/* Central Sri Yantra Mandala Motif */}
      <svg
        className="absolute -top-32 -right-32 w-[600px] h-[600px] text-amber-700 animate-spin-slow"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        <circle cx="100" cy="100" r="95" strokeDasharray="2 2" />
        <circle cx="100" cy="100" r="80" />
        <polygon points="100,10 180,150 20,150" />
        <polygon points="100,190 20,50 180,50" />
        <polygon points="100,25 165,140 35,140" />
        <polygon points="100,175 35,60 165,60" />
        <circle cx="100" cy="100" r="40" />
        <circle cx="100" cy="100" r="2" fill="currentColor" />
      </svg>

      {/* Subtle Bottom Left Zodiac Ring */}
      <svg
        className="absolute -bottom-40 -left-40 w-[700px] h-[700px] text-amber-800"
        viewBox="0 0 300 300"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.4"
      >
        <circle cx="150" cy="150" r="140" />
        <circle cx="150" cy="150" r="120" strokeDasharray="3 3" />
        <circle cx="150" cy="150" r="90" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 150 + 90 * Math.cos(angle);
          const y1 = 150 + 90 * Math.sin(angle);
          const x2 = 150 + 140 * Math.cos(angle);
          const y2 = 150 + 140 * Math.sin(angle);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </svg>
    </div>
  );
};
