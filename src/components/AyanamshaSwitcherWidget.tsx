import React, { useState, useMemo } from "react";
import { 
  Compass, 
  Sparkles, 
  Layers, 
  Info, 
  CheckCircle2, 
  SlidersHorizontal, 
  HelpCircle,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { UserProfile, PlanetPosition } from "../types";

interface AyanamshaSwitcherWidgetProps {
  userProfile?: UserProfile;
  onAyanamshaChange?: (ayanamsha: string) => void;
}

export type AyanamshaType = "Lahiri" | "KP" | "Raman" | "Yukteshwar" | "Fagan-Bradley" | "Tropical";

export interface AyanamshaOption {
  id: AyanamshaType;
  name: string;
  zodiacMode: "Sidereal" | "Tropical";
  offsetDegrees: number; // e.g., 24.0867 for Lahiri
  offsetFormatted: string; // "24° 05' 12\""
  systemType: "Vedic Sidereal (Nirayana)" | "Vedic KP Sub-Lord" | "Vedic Traditional" | "Western Sidereal" | "Western Seasonal (Sayana)";
  description: string;
  recommendedFor: string;
}

export const AYANAMSHA_SYSTEMS: AyanamshaOption[] = [
  {
    id: "Lahiri",
    name: "Lahiri (Chitra Paksha)",
    zodiacMode: "Sidereal",
    offsetDegrees: 24.0867,
    offsetFormatted: `24° 05' 12"`,
    systemType: "Vedic Sidereal (Nirayana)",
    description: "Official standard adopted by the Indian Calendar Reform Committee. Aligns zero Aries with Spica (Chitra Star) at 180°.",
    recommendedFor: "General Vedic Kundli, Parashari Dashas, Ashtakavarga & Guna Milan."
  },
  {
    id: "KP",
    name: "Krishnamurti Paddhati (KP)",
    zodiacMode: "Sidereal",
    offsetDegrees: 24.1788,
    offsetFormatted: `24° 10' 44"`,
    systemType: "Vedic KP Sub-Lord",
    description: "Formulated by Prof. K.S. Krishnamurti. Uses precise star-lord sub-divisions and Placidus house cusps for pinpoint event timing.",
    recommendedFor: "KP Horary Astrology, Exact Event Timing & Sub-Lord Cusps."
  },
  {
    id: "Raman",
    name: "Raman Ayanamsha",
    zodiacMode: "Sidereal",
    offsetDegrees: 22.4708,
    offsetFormatted: `22° 28' 15"`,
    systemType: "Vedic Traditional",
    description: "Developed by legendary astrologer Dr. B.V. Raman. Uses a smaller ayanamsha offset reflecting classical manuscript traditions.",
    recommendedFor: "Traditional Southern Indian Astrological Lineages & Vastu Shilpa."
  },
  {
    id: "Yukteshwar",
    name: "Sri Yukteshwar (Holy Science)",
    zodiacMode: "Sidereal",
    offsetDegrees: 21.4367,
    offsetFormatted: `21° 26' 12"`,
    systemType: "Vedic Traditional",
    description: "Calculated from Sri Yukteshwar Giri's 'The Holy Science' astronomical calibration, aligning yuga cycles with galactic center.",
    recommendedFor: "Yuga Cycle Synchronization & Spiritual Initiation Timing."
  },
  {
    id: "Fagan-Bradley",
    name: "Fagan-Bradley (Western Sidereal)",
    zodiacMode: "Sidereal",
    offsetDegrees: 24.7833,
    offsetFormatted: `24° 47' 00"`,
    systemType: "Western Sidereal",
    description: "Standard Western Sidereal calculation established by Cyril Fagan & Donald Bradley based on Babylonian Aldebaran/Antares axis.",
    recommendedFor: "Western Sidereal Astrological Comparisons & Solar Ingresses."
  },
  {
    id: "Tropical",
    name: "Tropical (Sayana Mode - 0° Ayanamsha)",
    zodiacMode: "Tropical",
    offsetDegrees: 0.0,
    offsetFormatted: `00° 00' 00"`,
    systemType: "Western Seasonal (Sayana)",
    description: "ZODIAC REFERENCE MODE: Measures positions relative to the Vernal Equinox (0° Aries). Ignores axial precession of equinoxes.",
    recommendedFor: "Western Synastry, Psychological Astrology & Solar Return Revolution."
  }
];

export const AyanamshaSwitcherWidget: React.FC<AyanamshaSwitcherWidgetProps> = ({
  userProfile,
  onAyanamshaChange,
}) => {
  const [selectedAyanamsha, setSelectedAyanamsha] = useState<AyanamshaType>("Lahiri");

  const currentSystem = useMemo(() => {
    return AYANAMSHA_SYSTEMS.find(s => s.id === selectedAyanamsha) || AYANAMSHA_SYSTEMS[0];
  }, [selectedAyanamsha]);

  // Base Lahiri positions for user
  const basePlanets: { name: string; lahiriDeg: number; lahiriSign: string; lahiriNakshatra: string }[] = [
    { name: "Ascendant (Lagna)", lahiriDeg: 14.25, lahiriSign: "Scorpio", lahiriNakshatra: "Anuradha" },
    { name: "Sun", lahiriDeg: 28.10, lahiriSign: "Cancer", lahiriNakshatra: "Ashlesha" },
    { name: "Moon", lahiriDeg: 12.40, lahiriSign: "Taurus", lahiriNakshatra: "Rohini" },
    { name: "Mars", lahiriDeg: 5.15, lahiriSign: "Leo", lahiriNakshatra: "Magha" },
    { name: "Mercury", lahiriDeg: 19.30, lahiriSign: "Gemini", lahiriNakshatra: "Ardra" },
    { name: "Jupiter", lahiriDeg: 8.45, lahiriSign: "Sagittarius", lahiriNakshatra: "Mula" },
    { name: "Venus", lahiriDeg: 22.10, lahiriSign: "Taurus", lahiriNakshatra: "Rohini" },
    { name: "Saturn", lahiriDeg: 16.50, lahiriSign: "Aquarius", lahiriNakshatra: "Shatabhisha" },
    { name: "Rahu", lahiriDeg: 3.20, lahiriSign: "Aries", lahiriNakshatra: "Ashwini" },
  ];

  // Helper to adjust position according to chosen Ayanamsha relative to Lahiri
  const adjustedPlanets = useMemo(() => {
    const lahiriOffset = AYANAMSHA_SYSTEMS[0].offsetDegrees; // 24.0867
    const currentOffset = currentSystem.offsetDegrees;
    const shift = currentOffset - lahiriOffset; // difference in degrees

    return basePlanets.map(p => {
      let adjDeg = p.lahiriDeg + shift;
      if (adjDeg < 0) adjDeg += 30;
      if (adjDeg >= 30) adjDeg -= 30;

      const degInt = Math.floor(adjDeg);
      const minInt = Math.round((adjDeg - degInt) * 60);

      return {
        ...p,
        adjDegFormatted: `${degInt}° ${minInt < 10 ? "0" : ""}${minInt}'`,
        shiftFormatted: shift === 0 ? "Standard" : shift > 0 ? `+${shift.toFixed(2)}°` : `${shift.toFixed(2)}°`
      };
    });
  }, [currentSystem, basePlanets]);

  const handleSelect = (id: AyanamshaType) => {
    setSelectedAyanamsha(id);
    if (onAyanamshaChange) onAyanamshaChange(id);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm space-y-8 animate-in fade-in">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            Precision Astronomical Correction
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Multi-Ayanamsha Calculation Switcher
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Toggle between official Lahiri (Chitra Paksha), KP Sub-Lord System, Raman Ayanamsha, and Tropical (Sayana) positions to recalculate chart positions with high astronomical fidelity.
          </p>
        </div>

        {/* ACTIVE SYSTEM BADGE */}
        <div className="bg-gradient-to-r from-slate-900 to-amber-950 text-amber-100 p-4 rounded-2xl border border-amber-500/30 text-xs shrink-0">
          <div className="text-[10px] uppercase text-amber-300 font-bold tracking-wider">Active Ayanamsha</div>
          <div className="font-serif text-lg font-bold text-amber-200">{currentSystem.name}</div>
          <div className="text-[11px] text-amber-200/80">Value: <strong className="text-amber-300">{currentSystem.offsetFormatted}</strong></div>
        </div>
      </div>

      {/* AYANAMSHA SYSTEM SELECTION CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {AYANAMSHA_SYSTEMS.map((sys) => {
          const isSelected = selectedAyanamsha === sys.id;
          return (
            <div
              key={sys.id}
              onClick={() => handleSelect(sys.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 flex flex-col justify-between ${
                isSelected
                  ? "bg-amber-500/10 border-amber-500 shadow-md ring-2 ring-amber-500/30"
                  : "bg-white border-slate-200 hover:border-amber-300"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    isSelected ? "bg-amber-500 text-slate-950" : "bg-slate-100 text-slate-600"
                  }`}>
                    {sys.systemType}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                </div>

                <h3 className="font-serif font-bold text-slate-900 text-base">
                  {sys.name}
                </h3>

                <div className="text-xs font-mono font-bold text-amber-800">
                  Offset: {sys.offsetFormatted}
                </div>

                <p className="text-xs text-slate-600 leading-snug">
                  {sys.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <strong className="text-slate-800">Best For:</strong> {sys.recommendedFor}
              </div>
            </div>
          );
        })}
      </div>

      {/* PLANETARY DEGREE COMPARISON TABLE */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 font-serif font-bold text-slate-900 text-lg">
            <Layers className="w-5 h-5 text-amber-600" />
            <span>Recalculated Planetary Positions ({currentSystem.name})</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Real-time shift applied relative to Lahiri baseline
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Celestial Body</th>
                <th className="py-3 px-4">Sign (Rashi)</th>
                <th className="py-3 px-4">Standard Lahiri Degree</th>
                <th className="py-3 px-4 text-amber-800">Adjusted Degree ({selectedAyanamsha})</th>
                <th className="py-3 px-4">Nakshatra Placement</th>
                <th className="py-3 px-4">Precession Delta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {adjustedPlanets.map((planet, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>{planet.name}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-semibold">{planet.lahiriSign}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{planet.lahiriDeg.toFixed(2)}°</td>
                  <td className="py-3 px-4 font-mono font-bold text-amber-900 bg-amber-50/50 rounded-lg">
                    {planet.adjDegFormatted}
                  </td>
                  <td className="py-3 px-4 text-slate-700">{planet.lahiriNakshatra}</td>
                  <td className="py-3 px-4 font-mono text-xs text-slate-500">{planet.shiftFormatted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
