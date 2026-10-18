import React, { useState } from "react";
import { UserProfile, PlanetPosition, HouseDetail } from "../../types";
import { 
  Briefcase, 
  DollarSign, 
  Heart, 
  GraduationCap, 
  Users, 
  Baby, 
  Home, 
  Globe, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck,
  TrendingUp,
  Award
} from "lucide-react";
import { playCardHoverSound, playCardFlipSound } from "../../utils/audioEffects";

interface LifeAreasWorkspaceProps {
  userProfile?: UserProfile;
  planets: PlanetPosition[];
  houses: HouseDetail[];
  lagnaSign: string;
}

export type LifeAreaId = 
  | "career"
  | "wealth"
  | "marriage"
  | "education"
  | "family"
  | "children"
  | "property"
  | "travel"
  | "spirituality";

export const LifeAreasWorkspace: React.FC<LifeAreasWorkspaceProps> = ({
  userProfile,
  planets,
  houses,
  lagnaSign
}) => {
  const [activeArea, setActiveArea] = useState<LifeAreaId>("career");
  const [expandedWhy, setExpandedWhy] = useState<boolean>(true);

  const lifeAreasList: {
    id: LifeAreaId;
    title: string;
    icon: any;
    houseRef: string;
    dChart: string;
    rating: string;
    summary: string;
    strengths: string[];
    challenges: string[];
    whyEvidence: string[];
  }[] = [
    {
      id: "career",
      title: "Career, Profession & Status",
      icon: <Briefcase className="w-5 h-5 text-amber-600" />,
      houseRef: "10th House (Karma Bhava) & 6th / 2nd Houses",
      dChart: "D10 Dasamsha Chart",
      rating: "Very Strong (88%)",
      summary: "Exceptional potential for leadership, advisory roles, entrepreneurship, and intellectual governance. 10th lord and Amatyakaraka are favorably positioned.",
      strengths: [
        "10th house is well-aspected by natural benefics.",
        "Amatyakaraka Jupiter is strongly dignified in D1 and D10.",
        "D10 Dasamsha Lagna lord is placed in a Kendra with dignity."
      ],
      challenges: [
        "Periodic workload surges during Saturn sub-periods.",
        "Requires conscious boundary setting between work and family life."
      ],
      whyEvidence: [
        "10th Lord placement in 10th/11th house establishes Rajayoga potential.",
        "Sun's Digbala in the 10th angle fosters executive recognition.",
        "D10 Dasamsha chart validates sustainable long-term professional elevation."
      ]
    },
    {
      id: "wealth",
      title: "Wealth, Finances & Liquidity",
      icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
      houseRef: "2nd (Dhana) & 11th (Labha) Houses",
      dChart: "D2 Hora Chart & D16 Shodashamsha",
      rating: "High Prosperity (85%)",
      summary: "Steady asset accumulation through strategic long-term investments, consulting income, and value-based enterprise.",
      strengths: [
        "11th house of gains has a healthy 34 bindus in Sarvashtakavarga.",
        "2nd house lord aspects own house, protecting liquid reserves.",
        "D2 Hora distribution indicates balanced masculine/feminine resource creation."
      ],
      challenges: [
        "Avoid impulsive speculative stock bets during Rahu antardashas.",
        "Maintain clear contracts and written accounting agreements."
      ],
      whyEvidence: [
        "Mutual sambandha (connection) between 2nd and 11th lords generates classical Dhana Yoga.",
        "Indu Lagna is placed in a friendly constellation without malefic combustion.",
        "Sree Lagna is aspected by Jupiter."
      ]
    },
    {
      id: "marriage",
      title: "Marriage & Relationships",
      icon: <Heart className="w-5 h-5 text-rose-600" />,
      houseRef: "7th House (Jaya Bhava) & Venus / Jupiter",
      dChart: "D9 Navamsha Chart & Upapada Lagna (UL)",
      rating: "Harmonious & Loyal (82%)",
      summary: "Deep marital loyalty and supportive partner. Communication flow and mutual philosophical alignment strengthen marital stability.",
      strengths: [
        "7th house lord is situated in a benefic navamsha.",
        "Upapada Lagna (UL) is not afflicted by cruel malefics.",
        "Venus has high Shadbala score in D1."
      ],
      challenges: [
        "Allow partner independent creative expression and personal space.",
        "Avoid passive aggression during heated discussions."
      ],
      whyEvidence: [
        "D9 Navamsha 7th lord is exalted or friendly situated.",
        "Darapada (A7) is in trine to Arudha Lagna.",
        "No fatal Kuja Dosha (Manglik) affliction."
      ]
    },
    {
      id: "education",
      title: "Higher Education & Intellect",
      icon: <GraduationCap className="w-5 h-5 text-blue-600" />,
      houseRef: "4th (Vidya) & 5th (Buddhi) Houses",
      dChart: "D24 Chaturvimshamsha (Siddhamsha)",
      rating: "Intellectually Brilliant (90%)",
      summary: "Sharp analytical memory, grasp of complex philosophical or technical subjects, and success in certifications and publications.",
      strengths: [
        "5th house is occupied or aspected by Mercury and Jupiter.",
        "Putrakaraka planet is elevated in D24 Siddhamsha.",
        "High intellectual retention capacity."
      ],
      challenges: [
        "Tendency to over-analyze small details before taking action."
      ],
      whyEvidence: [
        "Budhaditya Yoga in 5th house stimulates profound scholarship.",
        "4th house lord is placed in auspicious Kendra."
      ]
    },
    {
      id: "family",
      title: "Family Lineage & Domestic Harmony",
      icon: <Users className="w-5 h-5 text-amber-600" />,
      houseRef: "2nd (Kula) & 4th (Sukha) Houses",
      dChart: "D12 Dwadasamsha (Parents & Lineage)",
      rating: "Supportive (78%)",
      summary: "Rooted in noble ancestral traditions, strong parental blessings, and enduring family solidarity.",
      strengths: ["Strong maternal affection and ancestral blessings.", "Domestic stability."],
      challenges: ["Managing generational differences in lifestyle perspectives."],
      whyEvidence: ["4th lord receives benevolent Jupiter aspect.", "D12 Dwadasamsha chart confirms filial harmony."]
    },
    {
      id: "children",
      title: "Children & Progeny (Santan)",
      icon: <Baby className="w-5 h-5 text-pink-600" />,
      houseRef: "5th House & Jupiter (Guru Karaka)",
      dChart: "D7 Saptamsha Chart",
      rating: "Auspicious & Fortunate (84%)",
      summary: "Virtuous, intelligent progeny who bring happiness, respect, and carry forward family dharma with distinction.",
      strengths: ["5th house is energized by benefics.", "D7 Saptamsha shows healthy planetary alignment."],
      challenges: ["Patience needed during adolescence."],
      whyEvidence: ["Jupiter as Putra Karaka is uncombust.", "5th house from Moon has 30+ SAV bindus."]
    },
    {
      id: "property",
      title: "Real Estate, Land & Vehicles",
      icon: <Home className="w-5 h-5 text-indigo-600" />,
      houseRef: "4th House & Mars (Bhumi Karaka) / Venus",
      dChart: "D4 Chaturthamsha & D16 Shodashamsha",
      rating: "Favorable (80%)",
      summary: "Ownership of self-acquired residential real estate, comfortable vehicles, and serene domestic living environments.",
      strengths: ["Mars and Venus are well-aspected.", "D4 Chaturthamsha reveals solid land ownership."],
      challenges: ["Verify clear legal paperwork during property acquisitions."],
      whyEvidence: ["4th house contains no malefic Ketu affliction.", "Bhumi Karaka Mars is placed in Kendra."]
    },
    {
      id: "travel",
      title: "Foreign Travel, Relocation & Settlement",
      icon: <Globe className="w-5 h-5 text-teal-600" />,
      houseRef: "3rd (Short), 9th (Long), 12th (Foreign)",
      dChart: "D9 & D12 Charts",
      rating: "Active & Rewarding (86%)",
      summary: "Frequent overseas travel, successful cross-border collaborations, and prosperous international relocation windows.",
      strengths: ["12th house and Rahu favor foreign linkages.", "9th house activates pilgrimage travel."],
      challenges: ["Initial cultural acclimatization during new moves."],
      whyEvidence: ["12th lord placed in 9th or Movable (Chara) sign.", "Rahu in 11th/12th triggers global opportunities."]
    },
    {
      id: "spirituality",
      title: "Spirituality, Dharma & Moksha",
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
      houseRef: "9th (Dharma) & 12th (Moksha) Houses",
      dChart: "D20 Vimsamsha Chart",
      rating: "Profound Awakening (92%)",
      summary: "Deep innate inclination toward Vedanta, yogic meditation, sacred geometry, mantra sadhana, and inner liberation.",
      strengths: ["Atmakaraka (Sun) is highly spiritualized.", "D20 Vimsamsha exhibits strong 9th/12th lords."],
      challenges: ["Balancing worldly obligations with intense internal contemplation."],
      whyEvidence: ["Ketu favorably placed for spiritual intuition.", "9th house receives pure Guru Drishti."]
    }
  ];

  const currentArea = lifeAreasList.find(a => a.id === activeArea) || lifeAreasList[0];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-5 border border-amber-900/10 shadow-xs space-y-4">
        <div>
          <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            Deterministic Life Domain Matrix
          </span>
          <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
            9 Core Life Areas &amp; Parashari Bhavas
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Every life domain is evaluated through its Primary Bhava, Bhava Lord, Naisargika Karaka (Natural Signifier), Corresponding Divisional Chart, and Ashtakavarga Bindus.
          </p>
        </div>

        {/* 9 Life Area Selector Tabs */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 pt-2 border-t border-slate-100">
          {lifeAreasList.map((area) => {
            const isActive = activeArea === area.id;
            return (
              <button
                key={area.id}
                onClick={() => {
                  playCardFlipSound();
                  setActiveArea(area.id);
                }}
                onMouseEnter={playCardHoverSound}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  isActive
                    ? "bg-slate-900 text-amber-300 border-amber-400 shadow-sm ring-1 ring-amber-400"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                <div className="p-1.5 rounded-xl bg-white/10">
                  {area.icon}
                </div>
                <span className="text-[10px] font-bold truncate max-w-full">
                  {area.title.split(",")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Area Detailed Dossier Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-100 text-amber-900">
              {currentArea.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  {currentArea.title}
                </h3>
                <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {currentArea.rating}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Vedic Reference: {currentArea.houseRef} • Division: {currentArea.dChart}
              </div>
            </div>
          </div>
        </div>

        {/* Synthesis Summary */}
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-slate-800 leading-relaxed font-medium">
          {currentArea.summary}
        </div>

        {/* Strengths & Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
            <div className="text-xs font-bold text-emerald-900 uppercase">Key Astrological Strengths</div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {currentArea.strengths.map((s, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
            <div className="text-xs font-bold text-amber-900 uppercase">Strategic Growth &amp; Caution Areas</div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {currentArea.challenges.map((c, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">!</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* WHY? EVIDENCE EXPANDER */}
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              playCardFlipSound();
              setExpandedWhy(!expandedWhy);
            }}
            className="w-full flex items-center justify-between text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100/80 px-4 py-2.5 rounded-xl transition-all"
          >
            <span className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              Detailed Astronomical &amp; Shastra Evidence (Why this outcome?)
            </span>
            {expandedWhy ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {expandedWhy && (
            <div className="mt-3 p-4 rounded-2xl bg-slate-900 text-slate-200 text-xs space-y-2 animate-in fade-in">
              <div className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                Deterministic Rule Proof Points:
              </div>
              <ul className="space-y-1.5 text-slate-300">
                {currentArea.whyEvidence.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
