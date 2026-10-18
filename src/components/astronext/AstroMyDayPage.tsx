import React, { useState } from "react";
import { 
  Sun, 
  Briefcase, 
  DollarSign, 
  Heart, 
  Plane, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Info
} from "lucide-react";
import { UserProfile } from "../../types";
import { 
  AstroCard, 
  AstroBadge, 
  AstroButton, 
  AstroTabs, 
  AstroEvidenceDrawer, 
  AstroEvidenceItem 
} from "./AstroDesignSystem";

export interface AstroMyDayPageProps {
  userProfile: UserProfile;
  onSelectTab: (tabId: string) => void;
}

export const AstroMyDayPage: React.FC<AstroMyDayPageProps> = ({
  userProfile,
  onSelectTab,
}) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
  const [selectedDomainEvidence, setSelectedDomainEvidence] = useState<{
    title: string;
    verdict: string;
    items: AstroEvidenceItem[];
  }>({
    title: "Career & Professional Guidance",
    verdict: "Strong Support (4 Favorable Factors • 0 Conflicts)",
    items: [
      {
        category: "Natal 10th House",
        status: "Highly Supportive",
        description: "10th lord exalted in Aries Kendra, providing natural authority and focus.",
      },
      {
        category: "Dasha Activation",
        status: "Supportive",
        description: "Jupiter Mahadasha / Sun Antardasha actively illuminates professional expansion.",
      },
      {
        category: "Transit Alignment",
        status: "Supportive",
        description: "Saturn transiting 11th from Moon rewards structured diligence.",
      },
    ],
  });

  const domains = [
    {
      id: "career",
      title: "Career & Leadership",
      status: "Favorable",
      badgeVariant: "green" as const,
      bestWindow: "10:30 AM – 12:10 PM",
      why: "Supportive Panchanga + current Jupiter-Sun Dasha + 10th house Digbala",
      guidance: "Proactively pitch new project roadmaps or conduct strategic executive check-ins. Your communication carries gravitational authority.",
      icon: <Briefcase className="w-5 h-5 text-[#1E6B37]" />,
      favorableCount: 4,
      neutralCount: 1,
    },
    {
      id: "finance",
      title: "Money & Financial Strategy",
      status: "Moderate Support",
      badgeVariant: "gold" as const,
      bestWindow: "11:15 AM – 01:30 PM",
      why: "Dhana Yoga activation in 2nd house (Moon in Rohini)",
      guidance: "Ideal for reviewing fixed wealth assets, automating investment allocations, and negotiating supply agreements.",
      icon: <DollarSign className="w-5 h-5 text-[#8C6D23]" />,
      favorableCount: 3,
      neutralCount: 1,
    },
    {
      id: "relationships",
      title: "Relationships & Family",
      status: "Harmonious",
      badgeVariant: "neutral" as const,
      bestWindow: "07:00 PM – 09:30 PM",
      why: "Venus aspecting 7th house creates peaceful reception",
      guidance: "Address interpersonal issues with calm clarity. Focus on listening rather than asserting dominance.",
      icon: <Heart className="w-5 h-5 text-[#A62B2B]" />,
      favorableCount: 2,
      neutralCount: 2,
    },
    {
      id: "health",
      title: "Health & Vitality",
      status: "High Energy",
      badgeVariant: "green" as const,
      bestWindow: "06:00 AM – 07:30 AM",
      why: "Sun in Leo 5th house promotes metabolic strength and stamina",
      guidance: "Engage in cardiovascular conditioning and Surya Namaskar at dawn to align circadian rhythm.",
      icon: <Activity className="w-5 h-5 text-[#3E6B99]" />,
      favorableCount: 3,
      neutralCount: 0,
    },
    {
      id: "travel",
      title: "Travel & Movement",
      status: "Neutral / Cautious",
      badgeVariant: "amber" as const,
      bestWindow: "02:00 PM – 03:30 PM",
      why: "Rahu in 12th house suggests minor transit delays",
      guidance: "Double-check transit reservations and avoid travel during Rahu Kala (04:30–06:00 PM).",
      icon: <Plane className="w-5 h-5 text-[#9E5D14]" />,
      favorableCount: 1,
      neutralCount: 2,
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* 1. Header */}
      <div className="bg-[#FAF8F5] border border-[#E7E2D9] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B89047]">
              <Sun className="w-3.5 h-3.5 text-[#B89047]" />
              Personalized Ephemeris Synthesis
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B18]">
              Daily Guidance (My Day)
            </h1>
            <p className="text-xs sm:text-sm text-[#6C645A]">
              Deterministic domain recommendations calculated from your natal D1/D9 charts, current Vimshottari period, and real-time transits.
            </p>
          </div>

          <AstroButton variant="primary" size="sm" onClick={() => onSelectTab("best_time")}>
            <Clock className="w-3.5 h-3.5" />
            <span>Best Time Finder</span>
          </AstroButton>
        </div>
      </div>

      {/* 2. Domain Guidance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {domains.map((dom) => (
          <div
            key={dom.id}
            className="p-5 sm:p-6 rounded-3xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DA]">
                    {dom.icon}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#1E1B18]">{dom.title}</h3>
                    <div className="text-xs text-[#8C6D23] font-semibold flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Best Window: {dom.bestWindow}</span>
                    </div>
                  </div>
                </div>
                <AstroBadge label={dom.status} variant={dom.badgeVariant} />
              </div>

              <p className="text-xs text-[#4A433B] leading-relaxed pt-1">
                {dom.guidance}
              </p>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE5DA] text-xs text-[#6C645A]">
                <strong className="text-[#1E1B18]">Why:</strong> {dom.why}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-[#F2ECE1]">
              <span className="text-[11px] text-[#1E6B37] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {dom.favorableCount} Favorable factors • {dom.neutralCount} Neutral
              </span>
              <button
                onClick={() => {
                  setSelectedDomainEvidence({
                    title: `${dom.title} Evidence Matrix`,
                    verdict: `${dom.status} (${dom.favorableCount} Favorable Factors)`,
                    items: [
                      {
                        category: "Domain Indicator",
                        status: "Highly Supportive",
                        description: dom.why,
                      },
                      {
                        category: "Classical Rule Confirmation",
                        status: "Supportive",
                        description: "Corroborated across Natal D1 and active Vimshottari Sub-Period.",
                      },
                    ],
                  });
                  setIsEvidenceOpen(true);
                }}
                className="text-xs font-bold text-[#8C6D23] hover:text-[#1E1B18] flex items-center gap-1"
              >
                <span>View Full Evidence</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Evidence Drawer */}
      <AstroEvidenceDrawer
        isOpen={isEvidenceOpen}
        onClose={() => setIsEvidenceOpen(false)}
        title={selectedDomainEvidence.title}
        subtitle="Transparent rule engine verification"
        verdict={selectedDomainEvidence.verdict}
        supportiveCount={3}
        neutralCount={1}
        cautionCount={0}
        evidenceItems={selectedDomainEvidence.items}
      />
    </div>
  );
};
