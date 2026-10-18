import React, { useState } from "react";
import { RASHIS, RASHI_LORDS } from "../data/astrologyData";
import { Compass, Sparkles, Sun, Moon } from "lucide-react";

interface ZodiacWheelProps {
  onSelectSign?: (sign: string) => void;
}

const SIGN_DETAILS: Record<string, { element: string; mode: string; symbol: string; desc: string }> = {
  Aries: { element: "Fire", mode: "Cardinal", symbol: "Ram", desc: "Pioneering, courageous, independent, direct." },
  Taurus: { element: "Earth", mode: "Fixed", symbol: "Bull", desc: "Grounded, luxurious, steadfast, sensual." },
  Gemini: { element: "Air", mode: "Mutable", symbol: "Twins", desc: "Intellectual, quick-witted, versatile, communicative." },
  Cancer: { element: "Water", mode: "Cardinal", symbol: "Crab", desc: "Intuitive, nurturing, protective, imaginative." },
  Leo: { element: "Fire", mode: "Fixed", symbol: "Lion", desc: "Regal, charismatic, generous, creative." },
  Virgo: { element: "Earth", mode: "Mutable", symbol: "Maiden", desc: "Analytical, meticulous, healing-oriented, service-minded." },
  Libra: { element: "Air", mode: "Cardinal", symbol: "Scales", desc: "Harmonious, diplomatic, artistic, fair." },
  Scorpio: { element: "Water", mode: "Fixed", symbol: "Scorpion", desc: "Transformative, magnetic, intense, mysterious." },
  Sagittarius: { element: "Fire", mode: "Mutable", symbol: "Archer", desc: "Philosophical, optimistic, adventurous, expansive." },
  Capricorn: { element: "Earth", mode: "Cardinal", symbol: "Sea-Goat", desc: "Disciplined, ambitious, structured, enduring." },
  Aquarius: { element: "Air", mode: "Fixed", symbol: "Water Bearer", desc: "Visionary, humanitarian, innovative, original." },
  Pisces: { element: "Water", mode: "Mutable", symbol: "Two Fish", desc: "Empathic, spiritual, artistic, compassionate." }
};

export const ZodiacWheel: React.FC<ZodiacWheelProps> = ({ onSelectSign }) => {
  const [activeSign, setActiveSign] = useState<string>("Aries");

  const handleSignClick = (sign: string) => {
    setActiveSign(sign);
    if (onSelectSign) onSelectSign(sign);
  };

  const details = SIGN_DETAILS[activeSign] || SIGN_DETAILS["Aries"];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-sm relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Interactive Wheel SVG */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex-shrink-0">
          <svg viewBox="0 0 200 200" className="w-full h-full transform transition-transform duration-700">
            {/* Outer Ring */}
            <circle cx="100" cy="100" r="96" fill="#FAF8F5" stroke="#D4AF37" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="72" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="2 2" />
            <circle cx="100" cy="100" r="48" fill="#1E1B18" stroke="#D4AF37" strokeWidth="1" />

            {/* 12 Segments */}
            {RASHIS.map((sign, index) => {
              const startAngle = (index * 30 - 90) * (Math.PI / 180);
              const endAngle = ((index + 1) * 30 - 90) * (Math.PI / 180);
              const midAngle = ((index + 0.5) * 30 - 90) * (Math.PI / 180);

              const x1 = 100 + 96 * Math.cos(startAngle);
              const y1 = 100 + 96 * Math.sin(startAngle);
              const x2 = 100 + 96 * Math.cos(endAngle);
              const y2 = 100 + 96 * Math.sin(endAngle);

              const labelX = 100 + 84 * Math.cos(midAngle);
              const labelY = 100 + 84 * Math.sin(midAngle);

              const isActive = activeSign === sign;

              return (
                <g
                  key={sign}
                  onClick={() => handleSignClick(sign)}
                  className="cursor-pointer group hover:opacity-90 transition-opacity"
                >
                  <path
                    d={`M 100 100 L ${x1} ${y1} A 96 96 0 0 1 ${x2} ${y2} Z`}
                    fill={isActive ? "#D4AF37" : index % 2 === 0 ? "#FAF8F5" : "#FFFBF2"}
                    stroke="#D4AF37"
                    strokeWidth="0.5"
                    className="transition-colors"
                  />
                  <text
                    x={labelX}
                    y={labelY}
                    fill={isActive ? "#FFFFFF" : "#1E1B18"}
                    fontSize="6"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${index * 30 + 15}, ${labelX}, ${labelY})`}
                  >
                    {sign.substring(0, 3)}
                  </text>
                </g>
              );
            })}

            {/* Center Emblem */}
            <circle cx="100" cy="100" r="32" fill="#1E1B18" />
            <text x="100" y="97" fill="#D4AF37" fontSize="7" fontWeight="bold" textAnchor="middle">
              {activeSign}
            </text>
            <text x="100" y="106" fill="#F3E8C8" fontSize="5" textAnchor="middle">
              {RASHI_LORDS[activeSign]}
            </text>
          </svg>
        </div>

        {/* Selected Sign Details Card */}
        <div className="flex-1 space-y-4 text-left w-full">
          <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">Zodiac Rashi Showcase</span>
              <h3 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
                {activeSign} Rashi
                <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold border border-amber-300/50">
                  {details.symbol}
                </span>
              </h3>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-500">Ruling Lord</div>
              <div className="text-sm font-bold text-amber-800 flex items-center gap-1 justify-end">
                <Sun className="w-3.5 h-3.5 text-amber-600" />
                {RASHI_LORDS[activeSign]}
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            {details.desc}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-900/10">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Element</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">{details.element}</div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-900/10">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Quality Mode</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">{details.mode}</div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-900/10 col-span-2 sm:col-span-1">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Daily Transit</div>
              <div className="text-xs font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                Favorable
              </div>
            </div>
          </div>

          {/* Sign Selector Chips */}
          <div className="pt-2">
            <div className="text-xs font-medium text-slate-500 mb-2">Select Rashi:</div>
            <div className="flex flex-wrap gap-1.5">
              {RASHIS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSignClick(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    activeSign === s
                      ? "bg-slate-900 text-amber-300 font-bold"
                      : "bg-amber-100/50 text-slate-700 hover:bg-amber-200/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
