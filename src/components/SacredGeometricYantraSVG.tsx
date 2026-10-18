import React from 'react';

interface SacredGeometricYantraSVGProps {
  yantraName: string;
  className?: string;
  size?: number;
}

export const SacredGeometricYantraSVG: React.FC<SacredGeometricYantraSVGProps> = ({
  yantraName,
  className = "w-full h-full",
  size = 280
}) => {
  const center = size / 2;
  const outerSize = size * 0.92;
  const bhupuraPad = (size - outerSize) / 2;

  // Render specific sacred geometrical SVG depending on yantraName
  if (yantraName.includes("Kuber")) {
    // SHRI KUBER YANTRA - Golden Bhupura, 8 Lotus Petals, Inner Octagram Star & Center Bindu "कूं"
    return (
      <svg viewBox={`0 0 ${size} ${size}`} className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="kuberGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="85%" stopColor="#854d0e" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>
          <linearGradient id="kuberGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#713f12" />
          </linearGradient>
          <filter id="glowKuber">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer Background Plate */}
        <rect x="0" y="0" width={size} height={size} rx="16" fill="url(#kuberGrad)" />

        {/* BHUPURA (3-Tiered Square Fortress with 4 T-Gateways) */}
        {/* Outer Tier */}
        <rect x={bhupuraPad} y={bhupuraPad} width={outerSize} height={outerSize} fill="none" stroke="#fef08a" strokeWidth="2.5" />
        <rect x={bhupuraPad + 4} y={bhupuraPad + 4} width={outerSize - 8} height={outerSize - 8} fill="none" stroke="#eab308" strokeWidth="1.5" />
        <rect x={bhupuraPad + 8} y={bhupuraPad + 8} width={outerSize - 16} height={outerSize - 16} fill="none" stroke="#fef08a" strokeWidth="1" />

        {/* 4 Stepped Gateways (T-Gates) */}
        {/* Top Gate */}
        <path d={`M ${center - 24} ${bhupuraPad} L ${center - 24} ${bhupuraPad - 8} L ${center + 24} ${bhupuraPad - 8} L ${center + 24} ${bhupuraPad}`} fill="#854d0e" stroke="#fef08a" strokeWidth="1.5" />
        {/* Bottom Gate */}
        <path d={`M ${center - 24} ${bhupuraPad + outerSize} L ${center - 24} ${bhupuraPad + outerSize + 8} L ${center + 24} ${bhupuraPad + outerSize + 8} L ${center + 24} ${bhupuraPad + outerSize}`} fill="#854d0e" stroke="#fef08a" strokeWidth="1.5" />
        {/* Left Gate */}
        <path d={`M ${bhupuraPad} ${center - 24} L ${bhupuraPad - 8} ${center - 24} L ${bhupuraPad - 8} ${center + 24} L ${bhupuraPad} ${center + 24}`} fill="#854d0e" stroke="#fef08a" strokeWidth="1.5" />
        {/* Right Gate */}
        <path d={`M ${bhupuraPad + outerSize} ${center - 24} L ${bhupuraPad + outerSize + 8} ${center - 24} L ${bhupuraPad + outerSize + 8} ${center + 24} L ${bhupuraPad + outerSize} ${center + 24}`} fill="#854d0e" stroke="#fef08a" strokeWidth="1.5" />

        {/* Concentric Circles */}
        <circle cx={center} cy={center} r={size * 0.38} fill="none" stroke="#fef08a" strokeWidth="1.5" />
        <circle cx={center} cy={center} r={size * 0.35} fill="none" stroke="#ca8a04" strokeWidth="1" />

        {/* 8 LOTUS PETALS (ASHTADALA PADMA) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const rInner = size * 0.24;
          const rOuter = size * 0.35;
          const xPeak = center + rOuter * Math.cos(angle);
          const yPeak = center + rOuter * Math.sin(angle);
          const cpAngle1 = angle - 0.28;
          const cpAngle2 = angle + 0.28;
          const cp1X = center + (rOuter * 0.8) * Math.cos(cpAngle1);
          const cp1Y = center + (rOuter * 0.8) * Math.sin(cpAngle1);
          const cp2X = center + (rOuter * 0.8) * Math.cos(cpAngle2);
          const cp2Y = center + (rOuter * 0.8) * Math.sin(cpAngle2);
          const startX = center + rInner * Math.cos(angle - 0.22);
          const startY = center + rInner * Math.sin(angle - 0.22);
          const endX = center + rInner * Math.cos(angle + 0.22);
          const endY = center + rInner * Math.sin(angle + 0.22);

          return (
            <path
              key={i}
              d={`M ${startX} ${startY} Q ${cp1X} ${cp1Y} ${xPeak} ${yPeak} Q ${cp2X} ${cp2Y} ${endX} ${endY}`}
              fill="rgba(254, 240, 138, 0.15)"
              stroke="#fef08a"
              strokeWidth="1.2"
            />
          );
        })}

        {/* Inner Circle */}
        <circle cx={center} cy={center} r={size * 0.23} fill="#451a03" stroke="#fef08a" strokeWidth="1.5" />

        {/* 8-Pointed Star (Octagram) for Kuber Wealth Alignment */}
        {(() => {
          const r = size * 0.20;
          const pts1 = Array.from({ length: 4 }).map((_, i) => {
            const a = (i * 90 * Math.PI) / 180;
            return `${center + r * Math.cos(a)},${center + r * Math.sin(a)}`;
          }).join(' ');
          const pts2 = Array.from({ length: 4 }).map((_, i) => {
            const a = ((i * 90 + 45) * Math.PI) / 180;
            return `${center + r * Math.cos(a)},${center + r * Math.sin(a)}`;
          }).join(' ');

          return (
            <>
              <polygon points={pts1} fill="none" stroke="#fef08a" strokeWidth="1.5" />
              <polygon points={pts2} fill="none" stroke="#eab308" strokeWidth="1.5" />
            </>
          );
        })()}

        {/* Center Golden Circle & Bindu with Seed Mantra "कूं" */}
        <circle cx={center} cy={center} r={size * 0.08} fill="url(#kuberGold)" stroke="#fef08a" strokeWidth="1" />
        <text x={center} y={center + 4} textAnchor="middle" fill="#451a03" fontSize="16" fontWeight="bold" fontFamily="serif">
          कूं
        </text>
        <circle cx={center} cy={center} r="2.5" fill="#fef08a" filter="url(#glowKuber)" />
      </svg>
    );
  }

  if (yantraName.includes("Ganesha")) {
    // SHRI GANESHA YANTRA - Vermilion/Copper Bhupura, Shatkona (Star Hexagram), Lotus & Bindu "गं"
    return (
      <svg viewBox={`0 0 ${size} ${size}`} className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="ganeshaGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#c2410c" />
            <stop offset="85%" stopColor="#7c2d12" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>
          <linearGradient id="ganeshaCopper" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffedd5" />
            <stop offset="50%" stopColor="#fdba74" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width={size} height={size} rx="16" fill="url(#ganeshaGrad)" />

        {/* Bhupura Fortress */}
        <rect x={bhupuraPad} y={bhupuraPad} width={outerSize} height={outerSize} fill="none" stroke="#ffedd5" strokeWidth="2.5" />
        <rect x={bhupuraPad + 5} y={bhupuraPad + 5} width={outerSize - 10} height={outerSize - 10} fill="none" stroke="#fdba74" strokeWidth="1.5" />

        {/* Gates */}
        <path d={`M ${center - 22} ${bhupuraPad} L ${center - 22} ${bhupuraPad - 8} L ${center + 22} ${bhupuraPad - 8} L ${center + 22} ${bhupuraPad}`} fill="#7c2d12" stroke="#ffedd5" strokeWidth="1.5" />
        <path d={`M ${center - 22} ${bhupuraPad + outerSize} L ${center - 22} ${bhupuraPad + outerSize + 8} L ${center + 22} ${bhupuraPad + outerSize + 8} L ${center + 22} ${bhupuraPad + outerSize}`} fill="#7c2d12" stroke="#ffedd5" strokeWidth="1.5" />
        <path d={`M ${bhupuraPad} ${center - 22} L ${bhupuraPad - 8} ${center - 22} L ${bhupuraPad - 8} ${center + 22} L ${bhupuraPad} ${center + 22}`} fill="#7c2d12" stroke="#ffedd5" strokeWidth="1.5" />
        <path d={`M ${bhupuraPad + outerSize} ${center - 22} L ${bhupuraPad + outerSize + 8} ${center - 22} L ${bhupuraPad + outerSize + 8} ${center + 22} L ${bhupuraPad + outerSize} ${center + 22}`} fill="#7c2d12" stroke="#ffedd5" strokeWidth="1.5" />

        <circle cx={center} cy={center} r={size * 0.38} fill="none" stroke="#ffedd5" strokeWidth="1.5" />
        <circle cx={center} cy={center} r={size * 0.35} fill="none" stroke="#fdba74" strokeWidth="1" />

        {/* 8 Lotus Petals */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          const rOuter = size * 0.35;
          const rInner = size * 0.24;
          const xP = center + rOuter * Math.cos(a);
          const yP = center + rOuter * Math.sin(a);
          return (
            <path
              key={i}
              d={`M ${center + rInner * Math.cos(a - 0.2)} ${center + rInner * Math.sin(a - 0.2)} Q ${center + rOuter * 0.85 * Math.cos(a - 0.25)} ${center + rOuter * 0.85 * Math.sin(a - 0.25)} ${xP} ${yP} Q ${center + rOuter * 0.85 * Math.cos(a + 0.25)} ${center + rOuter * 0.85 * Math.sin(a + 0.25)} ${center + rInner * Math.cos(a + 0.2)} ${center + rInner * Math.sin(a + 0.2)}`}
              fill="rgba(253, 186, 116, 0.2)"
              stroke="#ffedd5"
              strokeWidth="1.2"
            />
          );
        })}

        <circle cx={center} cy={center} r={size * 0.23} fill="#451a03" stroke="#fdba74" strokeWidth="1.5" />

        {/* SHATKONA (Star Hexagram - Upward & Downward Triangles) */}
        {(() => {
          const r = size * 0.20;
          // Upward Triangle
          const tUp = [
            `${center},${center - r}`,
            `${center + r * Math.cos(Math.PI / 6)},${center + r * Math.sin(Math.PI / 6)}`,
            `${center - r * Math.cos(Math.PI / 6)},${center + r * Math.sin(Math.PI / 6)}`
          ].join(' ');
          // Downward Triangle
          const tDown = [
            `${center},${center + r}`,
            `${center + r * Math.cos(Math.PI / 6)},${center - r * Math.sin(Math.PI / 6)}`,
            `${center - r * Math.cos(Math.PI / 6)},${center - r * Math.sin(Math.PI / 6)}`
          ].join(' ');

          return (
            <>
              <polygon points={tUp} fill="none" stroke="#ffedd5" strokeWidth="1.8" />
              <polygon points={tDown} fill="none" stroke="#fdba74" strokeWidth="1.8" />
            </>
          );
        })()}

        {/* Center Seed Mantra "गं" */}
        <circle cx={center} cy={center} r={size * 0.08} fill="url(#ganeshaCopper)" stroke="#ffedd5" strokeWidth="1" />
        <text x={center} y={center + 5} textAnchor="middle" fill="#7c2d12" fontSize="18" fontWeight="bold" fontFamily="serif">
          गं
        </text>
        <circle cx={center} cy={center} r="2.5" fill="#ffedd5" />
      </svg>
    );
  }

  if (yantraName.includes("Mahamrityunjaya")) {
    // MAHAMRITYUNJAYA YANTRA - Silver/Copper Bhupura, 16 Petals, Shatkona & Trishul Geometry & "ह्रौं"
    return (
      <svg viewBox={`0 0 ${size} ${size}`} className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="shivaGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="45%" stopColor="#0284c7" />
            <stop offset="80%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
          <linearGradient id="shivaSilver" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width={size} height={size} rx="16" fill="url(#shivaGrad)" />

        {/* Bhupura */}
        <rect x={bhupuraPad} y={bhupuraPad} width={outerSize} height={outerSize} fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
        <rect x={bhupuraPad + 5} y={bhupuraPad + 5} width={outerSize - 10} height={outerSize - 10} fill="none" stroke="#38bdf8" strokeWidth="1.5" />

        {/* Gates */}
        <path d={`M ${center - 22} ${bhupuraPad} L ${center - 22} ${bhupuraPad - 8} L ${center + 22} ${bhupuraPad - 8} L ${center + 22} ${bhupuraPad}`} fill="#0f172a" stroke="#e2e8f0" strokeWidth="1.5" />
        <path d={`M ${center - 22} ${bhupuraPad + outerSize} L ${center - 22} ${bhupuraPad + outerSize + 8} L ${center + 22} ${bhupuraPad + outerSize + 8} L ${center + 22} ${bhupuraPad + outerSize}`} fill="#0f172a" stroke="#e2e8f0" strokeWidth="1.5" />
        <path d={`M ${bhupuraPad} ${center - 22} L ${bhupuraPad - 8} ${center - 22} L ${bhupuraPad - 8} ${center + 22} L ${bhupuraPad} ${center + 22}`} fill="#0f172a" stroke="#e2e8f0" strokeWidth="1.5" />
        <path d={`M ${bhupuraPad + outerSize} ${center - 22} L ${bhupuraPad + outerSize + 8} ${center - 22} L ${bhupuraPad + outerSize + 8} ${center + 22} L ${bhupuraPad + outerSize} ${center + 22}`} fill="#0f172a" stroke="#e2e8f0" strokeWidth="1.5" />

        <circle cx={center} cy={center} r={size * 0.38} fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
        <circle cx={center} cy={center} r={size * 0.35} fill="none" stroke="#38bdf8" strokeWidth="1" />

        {/* 16 Lotus Petals Outer Ring */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * 22.5 * Math.PI) / 180;
          const rOuter = size * 0.35;
          const rInner = size * 0.25;
          const xP = center + rOuter * Math.cos(a);
          const yP = center + rOuter * Math.sin(a);
          return (
            <path
              key={i}
              d={`M ${center + rInner * Math.cos(a - 0.12)} ${center + rInner * Math.sin(a - 0.12)} Q ${center + rOuter * 0.88 * Math.cos(a - 0.15)} ${center + rOuter * 0.88 * Math.sin(a - 0.15)} ${xP} ${yP} Q ${center + rOuter * 0.88 * Math.cos(a + 0.15)} ${center + rOuter * 0.88 * Math.sin(a + 0.15)} ${center + rInner * Math.cos(a + 0.12)} ${center + rInner * Math.sin(a + 0.12)}`}
              fill="rgba(56, 189, 248, 0.15)"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          );
        })}

        <circle cx={center} cy={center} r={size * 0.24} fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />

        {/* Shatkona Star */}
        {(() => {
          const r = size * 0.20;
          const tUp = [
            `${center},${center - r}`,
            `${center + r * Math.cos(Math.PI / 6)},${center + r * Math.sin(Math.PI / 6)}`,
            `${center - r * Math.cos(Math.PI / 6)},${center + r * Math.sin(Math.PI / 6)}`
          ].join(' ');
          const tDown = [
            `${center},${center + r}`,
            `${center + r * Math.cos(Math.PI / 6)},${center - r * Math.sin(Math.PI / 6)}`,
            `${center - r * Math.cos(Math.PI / 6)},${center - r * Math.sin(Math.PI / 6)}`
          ].join(' ');

          return (
            <>
              <polygon points={tUp} fill="none" stroke="#ffffff" strokeWidth="1.8" />
              <polygon points={tDown} fill="none" stroke="#38bdf8" strokeWidth="1.8" />
            </>
          );
        })()}

        {/* Center Seed Mantra "ॐ" / "ह्रौं" */}
        <circle cx={center} cy={center} r={size * 0.08} fill="url(#shivaSilver)" stroke="#e2e8f0" strokeWidth="1" />
        <text x={center} y={center + 5} textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold" fontFamily="serif">
          ॐ
        </text>
        <circle cx={center} cy={center} r="2.5" fill="#38bdf8" />
      </svg>
    );
  }

  if (yantraName.includes("Kanakdhara")) {
    // SHRI KANAKDHARA YANTRA - Radiant Gold Bhupura, 12 Wealth Shower Triangles & "श्रीं"
    return (
      <svg viewBox={`0 0 ${size} ${size}`} className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="kanakGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#facc15" />
            <stop offset="75%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>
          <linearGradient id="kanakGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width={size} height={size} rx="16" fill="url(#kanakGrad)" />

        {/* Bhupura */}
        <rect x={bhupuraPad} y={bhupuraPad} width={outerSize} height={outerSize} fill="none" stroke="#fef08a" strokeWidth="2.5" />
        <rect x={bhupuraPad + 5} y={bhupuraPad + 5} width={outerSize - 10} height={outerSize - 10} fill="none" stroke="#facc15" strokeWidth="1.5" />

        {/* Gates */}
        <path d={`M ${center - 22} ${bhupuraPad} L ${center - 22} ${bhupuraPad - 8} L ${center + 22} ${bhupuraPad - 8} L ${center + 22} ${bhupuraPad}`} fill="#713f12" stroke="#fef08a" strokeWidth="1.5" />
        <path d={`M ${center - 22} ${bhupuraPad + outerSize} L ${center - 22} ${bhupuraPad + outerSize + 8} L ${center + 22} ${bhupuraPad + outerSize + 8} L ${center + 22} ${bhupuraPad + outerSize}`} fill="#713f12" stroke="#fef08a" strokeWidth="1.5" />
        <path d={`M ${bhupuraPad} ${center - 22} L ${bhupuraPad - 8} ${center - 22} L ${bhupuraPad - 8} ${center + 22} L ${bhupuraPad} ${center + 22}`} fill="#713f12" stroke="#fef08a" strokeWidth="1.5" />
        <path d={`M ${bhupuraPad + outerSize} ${center - 22} L ${bhupuraPad + outerSize + 8} ${center - 22} L ${bhupuraPad + outerSize + 8} ${center + 22} L ${bhupuraPad + outerSize} ${center + 22}`} fill="#713f12" stroke="#fef08a" strokeWidth="1.5" />

        <circle cx={center} cy={center} r={size * 0.38} fill="none" stroke="#fef08a" strokeWidth="1.5" />
        <circle cx={center} cy={center} r={size * 0.35} fill="none" stroke="#facc15" strokeWidth="1" />

        {/* 8 Lotus Petals */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          const rOuter = size * 0.35;
          const rInner = size * 0.24;
          return (
            <path
              key={i}
              d={`M ${center + rInner * Math.cos(a - 0.2)} ${center + rInner * Math.sin(a - 0.2)} Q ${center + rOuter * 0.85 * Math.cos(a - 0.25)} ${center + rOuter * 0.85 * Math.sin(a - 0.25)} ${center + rOuter * Math.cos(a)} ${center + rOuter * Math.sin(a)} Q ${center + rOuter * 0.85 * Math.cos(a + 0.25)} ${center + rOuter * 0.85 * Math.sin(a + 0.25)} ${center + rInner * Math.cos(a + 0.2)} ${center + rInner * Math.sin(a + 0.2)}`}
              fill="rgba(254, 240, 138, 0.2)"
              stroke="#fef08a"
              strokeWidth="1.2"
            />
          );
        })}

        <circle cx={center} cy={center} r={size * 0.23} fill="#451a03" stroke="#facc15" strokeWidth="1.5" />

        {/* 4 Downward Wealth-Shower Triangles (Kanakdhara Gold Shower Geometry) */}
        {Array.from({ length: 4 }).map((_, i) => {
          const rot = (i * 90 * Math.PI) / 180;
          const r = size * 0.20;
          const pts = [
            `${center + r * Math.cos(rot + Math.PI / 2)},${center + r * Math.sin(rot + Math.PI / 2)}`,
            `${center + r * Math.cos(rot + Math.PI)},${center + r * Math.sin(rot + Math.PI)}`,
            `${center + r * Math.cos(rot)},${center + r * Math.sin(rot)}`
          ].join(' ');

          return <polygon key={i} points={pts} fill="none" stroke="#fef08a" strokeWidth="1.3" />;
        })}

        {/* Center Seed Mantra "श्रीं" */}
        <circle cx={center} cy={center} r={size * 0.08} fill="url(#kanakGold)" stroke="#fef08a" strokeWidth="1" />
        <text x={center} y={center + 5} textAnchor="middle" fill="#713f12" fontSize="18" fontWeight="bold" fontFamily="serif">
          श्रीं
        </text>
        <circle cx={center} cy={center} r="2.5" fill="#fef08a" />
      </svg>
    );
  }

  if (yantraName.includes("Durga")) {
    // DURGA BEESA YANTRA - Crimson/Copper Bhupura, 9-Pointed Star (Navakona), Corner Tridents & "दूं"
    return (
      <svg viewBox={`0 0 ${size} ${size}`} className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="durgaGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="45%" stopColor="#be123c" />
            <stop offset="80%" stopColor="#881337" />
            <stop offset="100%" stopColor="#4c0519" />
          </radialGradient>
          <linearGradient id="durgaCopper" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fecdd3" />
            <stop offset="50%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width={size} height={size} rx="16" fill="url(#durgaGrad)" />

        {/* Bhupura Fortress */}
        <rect x={bhupuraPad} y={bhupuraPad} width={outerSize} height={outerSize} fill="none" stroke="#fecdd3" strokeWidth="2.5" />
        <rect x={bhupuraPad + 5} y={bhupuraPad + 5} width={outerSize - 10} height={outerSize - 10} fill="none" stroke="#fb7185" strokeWidth="1.5" />

        {/* Corner Trident Accents */}
        <path d={`M ${bhupuraPad - 4} ${bhupuraPad - 4} L ${bhupuraPad + 8} ${bhupuraPad + 8}`} stroke="#fecdd3" strokeWidth="2" />
        <path d={`M ${bhupuraPad + outerSize + 4} ${bhupuraPad - 4} L ${bhupuraPad + outerSize - 8} ${bhupuraPad + 8}`} stroke="#fecdd3" strokeWidth="2" />
        <path d={`M ${bhupuraPad - 4} ${bhupuraPad + outerSize + 4} L ${bhupuraPad + 8} ${bhupuraPad + outerSize - 8}`} stroke="#fecdd3" strokeWidth="2" />
        <path d={`M ${bhupuraPad + outerSize + 4} ${bhupuraPad + outerSize + 4} L ${bhupuraPad + outerSize - 8} ${bhupuraPad + outerSize - 8}`} stroke="#fecdd3" strokeWidth="2" />

        {/* Gates */}
        <path d={`M ${center - 22} ${bhupuraPad} L ${center - 22} ${bhupuraPad - 8} L ${center + 22} ${bhupuraPad - 8} L ${center + 22} ${bhupuraPad}`} fill="#881337" stroke="#fecdd3" strokeWidth="1.5" />
        <path d={`M ${center - 22} ${bhupuraPad + outerSize} L ${center - 22} ${bhupuraPad + outerSize + 8} L ${center + 22} ${bhupuraPad + outerSize + 8} L ${center + 22} ${bhupuraPad + outerSize}`} fill="#881337" stroke="#fecdd3" strokeWidth="1.5" />
        <path d={`M ${bhupuraPad} ${center - 22} L ${bhupuraPad - 8} ${center - 22} L ${bhupuraPad - 8} ${center + 22} L ${bhupuraPad} ${center + 22}`} fill="#881337" stroke="#fecdd3" strokeWidth="1.5" />
        <path d={`M ${bhupuraPad + outerSize} ${center - 22} L ${bhupuraPad + outerSize + 8} ${center - 22} L ${bhupuraPad + outerSize + 8} ${center + 22} L ${bhupuraPad + outerSize} ${center + 22}`} fill="#881337" stroke="#fecdd3" strokeWidth="1.5" />

        <circle cx={center} cy={center} r={size * 0.38} fill="none" stroke="#fecdd3" strokeWidth="1.5" />

        {/* 8 Lotus Petals */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          const rOuter = size * 0.35;
          const rInner = size * 0.24;
          return (
            <path
              key={i}
              d={`M ${center + rInner * Math.cos(a - 0.2)} ${center + rInner * Math.sin(a - 0.2)} Q ${center + rOuter * 0.85 * Math.cos(a - 0.25)} ${center + rOuter * 0.85 * Math.sin(a - 0.25)} ${center + rOuter * Math.cos(a)} ${center + rOuter * Math.sin(a)} Q ${center + rOuter * 0.85 * Math.cos(a + 0.25)} ${center + rOuter * 0.85 * Math.sin(a + 0.25)} ${center + rInner * Math.cos(a + 0.2)} ${center + rInner * Math.sin(a + 0.2)}`}
              fill="rgba(251, 113, 133, 0.2)"
              stroke="#fecdd3"
              strokeWidth="1.2"
            />
          );
        })}

        <circle cx={center} cy={center} r={size * 0.23} fill="#4c0519" stroke="#fb7185" strokeWidth="1.5" />

        {/* 9-Pointed Navakona Star Polygon */}
        {(() => {
          const r = size * 0.20;
          const pts = Array.from({ length: 9 }).map((_, i) => {
            const a = (i * 40 * Math.PI) / 180 - Math.PI / 2;
            return `${center + r * Math.cos(a)},${center + r * Math.sin(a)}`;
          }).join(' ');

          return <polygon points={pts} fill="none" stroke="#fecdd3" strokeWidth="1.6" />;
        })()}

        {/* Center Seed Mantra "दूं" */}
        <circle cx={center} cy={center} r={size * 0.08} fill="url(#durgaCopper)" stroke="#fecdd3" strokeWidth="1" />
        <text x={center} y={center + 5} textAnchor="middle" fill="#881337" fontSize="18" fontWeight="bold" fontFamily="serif">
          दूं
        </text>
        <circle cx={center} cy={center} r="2.5" fill="#fecdd3" />
      </svg>
    );
  }

  if (yantraName.includes("Saraswati")) {
    // SHRI SARASWATI YANTRA - Silver-White Bhupura, Intellectual Shatkona, Lotus & "ऐं"
    return (
      <svg viewBox={`0 0 ${size} ${size}`} className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="saraswatiGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#cbd5e1" />
            <stop offset="80%" stopColor="#475569" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
          <linearGradient id="saraswatiSilver" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width={size} height={size} rx="16" fill="url(#saraswatiGrad)" />

        {/* Bhupura */}
        <rect x={bhupuraPad} y={bhupuraPad} width={outerSize} height={outerSize} fill="none" stroke="#ffffff" strokeWidth="2.5" />
        <rect x={bhupuraPad + 5} y={bhupuraPad + 5} width={outerSize - 10} height={outerSize - 10} fill="none" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Gates */}
        <path d={`M ${center - 22} ${bhupuraPad} L ${center - 22} ${bhupuraPad - 8} L ${center + 22} ${bhupuraPad - 8} L ${center + 22} ${bhupuraPad}`} fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
        <path d={`M ${center - 22} ${bhupuraPad + outerSize} L ${center - 22} ${bhupuraPad + outerSize + 8} L ${center + 22} ${bhupuraPad + outerSize + 8} L ${center + 22} ${bhupuraPad + outerSize}`} fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
        <path d={`M ${bhupuraPad} ${center - 22} L ${bhupuraPad - 8} ${center - 22} L ${bhupuraPad - 8} ${center + 22} L ${bhupuraPad} ${center + 22}`} fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
        <path d={`M ${bhupuraPad + outerSize} ${center - 22} L ${bhupuraPad + outerSize - 8} ${center - 22} L ${bhupuraPad + outerSize + 8} ${center + 22} L ${bhupuraPad + outerSize} ${center + 22}`} fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />

        <circle cx={center} cy={center} r={size * 0.38} fill="none" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx={center} cy={center} r={size * 0.35} fill="none" stroke="#cbd5e1" strokeWidth="1" />

        {/* 8 Lotus Petals */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          const rOuter = size * 0.35;
          const rInner = size * 0.24;
          return (
            <path
              key={i}
              d={`M ${center + rInner * Math.cos(a - 0.2)} ${center + rInner * Math.sin(a - 0.2)} Q ${center + rOuter * 0.85 * Math.cos(a - 0.25)} ${center + rOuter * 0.85 * Math.sin(a - 0.25)} ${center + rOuter * Math.cos(a)} ${center + rOuter * Math.sin(a)} Q ${center + rOuter * 0.85 * Math.cos(a + 0.25)} ${center + rOuter * 0.85 * Math.sin(a + 0.25)} ${center + rInner * Math.cos(a + 0.2)} ${center + rInner * Math.sin(a + 0.2)}`}
              fill="rgba(255, 255, 255, 0.25)"
              stroke="#ffffff"
              strokeWidth="1.2"
            />
          );
        })}

        <circle cx={center} cy={center} r={size * 0.23} fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Shatkona */}
        {(() => {
          const r = size * 0.20;
          const tUp = [
            `${center},${center - r}`,
            `${center + r * Math.cos(Math.PI / 6)},${center + r * Math.sin(Math.PI / 6)}`,
            `${center - r * Math.cos(Math.PI / 6)},${center + r * Math.sin(Math.PI / 6)}`
          ].join(' ');
          const tDown = [
            `${center},${center + r}`,
            `${center + r * Math.cos(Math.PI / 6)},${center - r * Math.sin(Math.PI / 6)}`,
            `${center - r * Math.cos(Math.PI / 6)},${center - r * Math.sin(Math.PI / 6)}`
          ].join(' ');

          return (
            <>
              <polygon points={tUp} fill="none" stroke="#ffffff" strokeWidth="1.8" />
              <polygon points={tDown} fill="none" stroke="#e2e8f0" strokeWidth="1.8" />
            </>
          );
        })()}

        {/* Center Seed Mantra "ऐं" */}
        <circle cx={center} cy={center} r={size * 0.08} fill="url(#saraswatiSilver)" stroke="#ffffff" strokeWidth="1" />
        <text x={center} y={center + 5} textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold" fontFamily="serif">
          ऐं
        </text>
        <circle cx={center} cy={center} r="2.5" fill="#ffffff" />
      </svg>
    );
  }

  if (yantraName.includes("Hanuman")) {
    // SHRI HANUMAN YANTRA - Red Copper Bhupura, Inverted Triangle, Gada Geometry & "हं"
    return (
      <svg viewBox={`0 0 ${size} ${size}`} className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="hanumanGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="45%" stopColor="#ea580c" />
            <stop offset="80%" stopColor="#9a3412" />
            <stop offset="100%" stopColor="#431407" />
          </radialGradient>
          <linearGradient id="hanumanCopper" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffedd5" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width={size} height={size} rx="16" fill="url(#hanumanGrad)" />

        {/* Bhupura */}
        <rect x={bhupuraPad} y={bhupuraPad} width={outerSize} height={outerSize} fill="none" stroke="#ffedd5" strokeWidth="2.5" />
        <rect x={bhupuraPad + 5} y={bhupuraPad + 5} width={outerSize - 10} height={outerSize - 10} fill="none" stroke="#f97316" strokeWidth="1.5" />

        {/* Gates */}
        <path d={`M ${center - 22} ${bhupuraPad} L ${center - 22} ${bhupuraPad - 8} L ${center + 22} ${bhupuraPad - 8} L ${center + 22} ${bhupuraPad}`} fill="#431407" stroke="#ffedd5" strokeWidth="1.5" />
        <path d={`M ${center - 22} ${bhupuraPad + outerSize} L ${center - 22} ${bhupuraPad + outerSize + 8} L ${center + 22} ${bhupuraPad + outerSize + 8} L ${center + 22} ${bhupuraPad + outerSize}`} fill="#431407" stroke="#ffedd5" strokeWidth="1.5" />
        <path d={`M ${bhupuraPad} ${center - 22} L ${bhupuraPad - 8} ${center - 22} L ${bhupuraPad - 8} ${center + 22} L ${bhupuraPad} ${center + 22}`} fill="#431407" stroke="#ffedd5" strokeWidth="1.5" />
        <path d={`M ${bhupuraPad + outerSize} ${center - 22} L ${bhupuraPad + outerSize + 8} ${center - 22} L ${bhupuraPad + outerSize + 8} ${center + 22} L ${bhupuraPad + outerSize} ${center + 22}`} fill="#431407" stroke="#ffedd5" strokeWidth="1.5" />

        <circle cx={center} cy={center} r={size * 0.38} fill="none" stroke="#ffedd5" strokeWidth="1.5" />

        {/* 8 Lotus Petals */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          const rOuter = size * 0.35;
          const rInner = size * 0.24;
          return (
            <path
              key={i}
              d={`M ${center + rInner * Math.cos(a - 0.2)} ${center + rInner * Math.sin(a - 0.2)} Q ${center + rOuter * 0.85 * Math.cos(a - 0.25)} ${center + rOuter * 0.85 * Math.sin(a - 0.25)} ${center + rOuter * Math.cos(a)} ${center + rOuter * Math.sin(a)} Q ${center + rOuter * 0.85 * Math.cos(a + 0.25)} ${center + rOuter * 0.85 * Math.sin(a + 0.25)} ${center + rInner * Math.cos(a + 0.2)} ${center + rInner * Math.sin(a + 0.2)}`}
              fill="rgba(251, 146, 60, 0.2)"
              stroke="#ffedd5"
              strokeWidth="1.2"
            />
          );
        })}

        <circle cx={center} cy={center} r={size * 0.23} fill="#431407" stroke="#f97316" strokeWidth="1.5" />

        {/* Inverted Triangle for Bhakti & Divine Strength */}
        {(() => {
          const r = size * 0.20;
          const pts = [
            `${center},${center + r}`,
            `${center + r * Math.cos(Math.PI / 6)},${center - r * Math.sin(Math.PI / 6)}`,
            `${center - r * Math.cos(Math.PI / 6)},${center - r * Math.sin(Math.PI / 6)}`
          ].join(' ');

          return <polygon points={pts} fill="none" stroke="#ffedd5" strokeWidth="2" />;
        })()}

        {/* Center Seed Mantra "हं" */}
        <circle cx={center} cy={center} r={size * 0.08} fill="url(#hanumanCopper)" stroke="#ffedd5" strokeWidth="1" />
        <text x={center} y={center + 5} textAnchor="middle" fill="#431407" fontSize="18" fontWeight="bold" fontFamily="serif">
          हं
        </text>
        <circle cx={center} cy={center} r="2.5" fill="#ffedd5" />
      </svg>
    );
  }

  // DEFAULT / SRI YANTRA 2D FALLBACK (when no photo or fallback needed)
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sriGradDef" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#eab308" />
          <stop offset="85%" stopColor="#854d0e" />
          <stop offset="100%" stopColor="#451a03" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width={size} height={size} rx="16" fill="url(#sriGradDef)" />

      {/* Bhupura */}
      <rect x={bhupuraPad} y={bhupuraPad} width={outerSize} height={outerSize} fill="none" stroke="#fef08a" strokeWidth="2" />
      <rect x={bhupuraPad + 4} y={bhupuraPad + 4} width={outerSize - 8} height={outerSize - 8} fill="none" stroke="#eab308" strokeWidth="1.5" />

      <circle cx={center} cy={center} r={size * 0.38} fill="none" stroke="#fef08a" strokeWidth="1.5" />
      <circle cx={center} cy={center} r={size * 0.35} fill="none" stroke="#eab308" strokeWidth="1" />

      {/* 16 Petals */}
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i * 22.5 * Math.PI) / 180;
        return (
          <circle
            key={i}
            cx={center + (size * 0.32) * Math.cos(a)}
            cy={center + (size * 0.32) * Math.sin(a)}
            r={size * 0.05}
            fill="none"
            stroke="#fef08a"
            strokeWidth="1"
          />
        );
      })}

      {/* Interlocking Triangles */}
      {(() => {
        const r = size * 0.22;
        const t1 = `${center},${center - r} ${center + r * 0.86},${center + r * 0.5} ${center - r * 0.86},${center + r * 0.5}`;
        const t2 = `${center},${center + r} ${center + r * 0.86},${center - r * 0.5} ${center - r * 0.86},${center - r * 0.5}`;
        return (
          <>
            <polygon points={t1} fill="none" stroke="#fef08a" strokeWidth="1.5" />
            <polygon points={t2} fill="none" stroke="#fef08a" strokeWidth="1.5" />
          </>
        );
      })()}

      <circle cx={center} cy={center} r="4" fill="#fef08a" />
    </svg>
  );
};
