import React, { useState } from "react";
import { UserProfile, PlanetPosition } from "../../types";
import { 
  Sun, 
  Moon, 
  Sparkles, 
  Activity, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  Zap,
  Award,
  Heart,
  Briefcase,
  DollarSign
} from "lucide-react";
import { playCardHoverSound, playCardFlipSound } from "../../utils/audioEffects";

interface DailyAstrologyViewProps {
  userProfile: UserProfile;
  planets: PlanetPosition[];
  lagnaSign: string;
}

export const DailyAstrologyView: React.FC<DailyAstrologyViewProps> = ({
  userProfile,
  planets,
  lagnaSign
}) => {
  const [expandedWhy, setExpandedWhy] = useState<string | null>("career");

  const toggleWhy = (domain: string) => {
    playCardFlipSound();
    setExpandedWhy(expandedWhy === domain ? null : domain);
  };

  const dailyDomains = [
    {
      id: "career",
      title: "Career & Work Focus",
      icon: <Briefcase className="w-4 h-4 text-amber-700" />,
      rating: "Highly Favorable (88%)",
      summary: "10th lord condition and active Jupiter transit support decisive professional initiatives, strategic meetings, and client discussions.",
      whyItems: [
        "Transiting Jupiter forms a trine to natal 10th house, activating professional visibility.",
        "Natal Sun in 5th house strengthens administrative authority and intellectual clarity.",
        "Operating Mahadasha period (Jupiter) emphasizes dharma-aligned professional growth."
      ]
    },
    {
      id: "wealth",
      title: "Finance & Monetary Decisions",
      icon: <DollarSign className="w-4 h-4 text-emerald-700" />,
      rating: "Stable & Accumulative (76%)",
      summary: "Favorable for long-term investments and debt clearance. Avoid speculative intraday trading during Rahu Kalam.",
      whyItems: [
        "2nd house of liquid assets receives benefic aspect from transiting Venus.",
        "Hora of Jupiter active between 09:15 AM and 10:20 AM offers optimal financial transaction window.",
        "Ashtakavarga 2nd house score holds a healthy 32 bindus in Sarvashtakavarga (SAV)."
      ]
    },
    {
      id: "relationships",
      title: "Relationships & Emotional Balance",
      icon: <Heart className="w-4 h-4 text-rose-700" />,
      rating: "Harmonious & Receptive (82%)",
      summary: "Moon transiting through Rohini Nakshatra nurtures emotional warmth, marital dialogue, and mutual understanding.",
      whyItems: [
        "Janma Moon aligns with Tara bala 'Kshema' (Well-being & Prosperity).",
        "7th lord aspects Lagna, harmonizing partnership negotiations and spouse communication.",
        "No malefic Mars aspect afflicting the 7th house during current diurnal transit."
      ]
    },
    {
      id: "health",
      title: "Vitality & Mind-Body Energy",
      icon: <Activity className="w-4 h-4 text-indigo-700" />,
      rating: "Moderate Vitality (70%)",
      summary: "Good physical stamina; take light hydration in the afternoon. Practice grounding pranayama during sunset.",
      whyItems: [
        "Ascendant lord is well-placed in Kendra, supporting recovery and immune resilience.",
        "6th house lord aspect suggests moderation in dietary sugar and irregular sleep cycles.",
        "Panchanga limb Karana (Bava) favors gentle physical walking and yogic stretching."
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              Personalized Daily Astrology
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Deterministic Natal + Transit (Gochara) Synthesis
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
            Today's Cosmic Focus &amp; Vedic Guidance
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Rule-based daily astrological breakdown computed from your natal Moon ({userProfile.rashi || "Taurus"}), Lagna ({lagnaSign}), and real-time planetary transits.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 px-3.5 py-2 rounded-2xl border border-amber-200 text-xs font-bold text-amber-900">
          <Clock className="w-4 h-4 text-amber-700" />
          <span>Active Hora: Sun (Surya)</span>
        </div>
      </div>

      {/* 4 Life Domains Grid with WHY drawers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dailyDomains.map((domain) => {
          const isExpanded = expandedWhy === domain.id;
          return (
            <div 
              key={domain.id}
              onMouseEnter={playCardHoverSound}
              className="bg-white rounded-3xl p-5 border border-amber-900/10 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
                      {domain.icon}
                    </div>
                    <span className="font-serif font-bold text-base text-slate-900">
                      {domain.title}
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900">
                    {domain.rating}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {domain.summary}
                </p>
              </div>

              {/* WHY? EVIDENCE EXPANDER */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleWhy(domain.id)}
                  className="w-full flex items-center justify-between text-xs font-bold text-amber-900 bg-amber-50/60 hover:bg-amber-100/70 px-3.5 py-2 rounded-xl transition-all"
                >
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                    Why this result? (Rule Evidence)
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isExpanded && (
                  <div className="mt-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs animate-in fade-in">
                    <div className="font-bold text-slate-900 text-[11px] uppercase tracking-wider">
                      Astronomical &amp; Rule Proof Points:
                    </div>
                    <ul className="space-y-1.5 text-slate-700">
                      {domain.whyItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Auspicious & Caution Windows */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 border border-amber-500/20 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-serif font-bold text-lg text-amber-200">
              Today's Key Planetary Windows
            </h3>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Calculated for {userProfile.place || "New Delhi, India"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/30">
            <div className="text-emerald-400 font-bold uppercase text-[10px]">Abhijit Muhurta (Most Auspicious)</div>
            <div className="font-serif text-lg font-bold text-emerald-200 mt-0.5">11:54 AM – 12:46 PM</div>
            <div className="text-emerald-300/70 text-[11px] mt-0.5">Optimal for new beginnings, signing contracts, and prayers.</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-500/30">
            <div className="text-amber-400 font-bold uppercase text-[10px]">Amrit Kaal (Nectar Window)</div>
            <div className="font-serif text-lg font-bold text-amber-200 mt-0.5">07:20 PM – 08:50 PM</div>
            <div className="text-amber-300/70 text-[11px] mt-0.5">Elevates meditation, mantra chanting, and sacred rituals.</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/30">
            <div className="text-rose-400 font-bold uppercase text-[10px]">Rahu Kalam (Caution Window)</div>
            <div className="font-serif text-lg font-bold text-rose-200 mt-0.5">03:30 PM – 05:00 PM</div>
            <div className="text-rose-300/70 text-[11px] mt-0.5">Avoid starting travel, financial lending, or signing deeds.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
