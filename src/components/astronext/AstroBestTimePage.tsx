import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Clock, 
  Sparkles, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Search, 
  ShieldCheck,
  Briefcase,
  Heart,
  Plane,
  Home,
  GraduationCap,
  Car,
  ShoppingBag,
  Sliders,
  DollarSign
} from "lucide-react";
import { 
  AstroCard, 
  AstroBadge, 
  AstroButton, 
  AstroEvidenceDrawer, 
  AstroEvidenceItem, 
  AstroTimeSlotCard 
} from "./AstroDesignSystem";

const ACTIVITY_PRESETS = [
  { id: "business", label: "Business Launch / Contract", icon: <Briefcase className="w-4 h-4 text-[#1E6B37]" /> },
  { id: "property", label: "Property / Real Estate Purchase", icon: <Home className="w-4 h-4 text-[#B89047]" /> },
  { id: "marriage", label: "Marriage / Engagement", icon: <Heart className="w-4 h-4 text-[#A62B2B]" /> },
  { id: "meeting", label: "High-Stakes Meeting / Interview", icon: <DollarSign className="w-4 h-4 text-[#3E6B99]" /> },
  { id: "travel", label: "Travel & Relocation", icon: <Plane className="w-4 h-4 text-[#63328C]" /> },
  { id: "education", label: "Education & Exam Initiation", icon: <GraduationCap className="w-4 h-4 text-[#554E46]" /> },
  { id: "vehicle", label: "Vehicle Purchase", icon: <Car className="w-4 h-4 text-[#9E5D14]" /> },
];

export interface AstroBestTimePageProps {
  currentLocation: string;
  onOpenLocationModal: () => void;
}

export const AstroBestTimePage: React.FC<AstroBestTimePageProps> = ({
  currentLocation,
  onOpenLocationModal,
}) => {
  const [selectedActivity, setSelectedActivity] = useState("business");
  const [dateRange, setDateRange] = useState("today");
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
  const [selectedSlotEvidence, setSelectedSlotEvidence] = useState<{
    title: string;
    verdict: string;
    supportive: number;
    neutral: number;
    cautions: number;
    items: AstroEvidenceItem[];
  }>({
    title: "10:42 AM – 12:08 PM Window",
    verdict: "STRONG SUPPORT (4 Favorable factors • 1 Neutral • 0 Conflicts)",
    supportive: 4,
    neutral: 1,
    cautions: 0,
    items: [
      {
        category: "Tithi Compatibility",
        status: "Highly Supportive",
        description: "Shukla Chaturthi activates Lord Ganesha's energy for removing obstacles in commercial and legal undertakings.",
        sourceText: "Muhurta Chintamani, Tithi Prakarana",
      },
      {
        category: "Nakshatra Tara Bala",
        status: "Highly Supportive",
        description: "Rohini Nakshatra provides 'Sadhana Tara' (Achievement) for your birth Moon, ensuring sustained stability.",
        sourceText: "Brihat Samhita, Nakshatra Shuddhi",
      },
      {
        category: "Planetary Hora",
        status: "Supportive",
        description: "Jupiter Hora commences at 10:42 AM, stimulating sound judgment and ethical mutual trust.",
      },
      {
        category: "Rahu Kala / Yamaganda Avoidance",
        status: "Highly Supportive",
        description: "Completely clear of Rahu Kala (04:30–06:00 PM) and Yamaganda (01:45–03:15 PM) intervals.",
      },
    ],
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* 1. Header Hero Banner */}
      <div className="bg-[#FAF8F5] border border-[#E7E2D9] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B89047]">
              <Sparkles className="w-3.5 h-3.5 text-[#B89047]" />
              Deterministic Electional Timing
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B18]">
              Personalized Time Finder
            </h1>
            <p className="text-xs sm:text-sm text-[#6C645A]">
              Evaluate multi-layered auspicious windows by synthesizing Panchanga Shuddhi, Tara Bala, Choghadiya, Hora rulers, and your personal Natal Ascendant.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLocationModal}
              className="flex items-center gap-1.5 font-semibold text-xs text-[#8C6D23] hover:text-[#1E1B18] bg-[#F5EFE0] px-3 py-1.5 rounded-xl border border-[#E5D6B6]"
            >
              <MapPin className="w-4 h-4" />
              <span>{currentLocation}</span>
            </button>
          </div>
        </div>

        {/* Interactive Selector Step 1: What do you want to do? */}
        <div className="mt-6 pt-6 border-t border-[#EAE5DA] space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#766E65]">
            Step 1: What activity are you planning?
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {ACTIVITY_PRESETS.map((act) => {
              const isSelected = selectedActivity === act.id;
              return (
                <button
                  key={act.id}
                  onClick={() => setSelectedActivity(act.id)}
                  className={`p-3 rounded-2xl text-left border flex items-center gap-2.5 transition-all ${
                    isSelected
                      ? "bg-[#1E1B18] text-[#FAF8F5] border-[#1E1B18] shadow-xs"
                      : "bg-[#FFFFFF] text-[#4A433B] border-[#E7E2D9] hover:bg-[#FAF7F0]"
                  }`}
                >
                  <div className={`p-1.5 rounded-xl ${isSelected ? "bg-white/10" : "bg-[#F5F2EB]"}`}>
                    {act.icon}
                  </div>
                  <span className="text-xs font-bold truncate">{act.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Date Range Filter */}
        <div className="mt-4 pt-4 border-t border-[#EAE5DA] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#766E65]">Date Range:</span>
            <div className="flex items-center gap-1 bg-[#EFEBE1] p-1 rounded-xl border border-[#DDD7CC]">
              {["today", "tomorrow", "this_week", "custom"].map((dr) => (
                <button
                  key={dr}
                  onClick={() => setDateRange(dr)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg capitalize transition-all ${
                    dateRange === dr
                      ? "bg-[#FFFFFF] text-[#1E1B18] shadow-2xs"
                      : "text-[#766E65] hover:text-[#1E1B18]"
                  }`}
                >
                  {dr.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-[#1E6B37] font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#1E6B37]" />
            <span>4 Auspicious windows identified for {currentLocation}</span>
          </div>
        </div>
      </div>

      {/* 2. Classified Result Windows: BEST, GOOD, ACCEPTABLE, AVOID */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1E1B18]">Electional Windows Ranked</h2>
            <p className="text-xs text-[#766E65]">Ranked according to classical Vedic Muhurta criteria</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Best Window 1 */}
          <AstroTimeSlotCard
            periodTitle="Prime Business & Contract Window"
            timeWindow="10:42 AM – 12:08 PM"
            tier="BEST"
            reasons={[
              "Supportive Rohini Nakshatra + Abhijit Muhurta overlap",
              "Jupiter Hora active with favorable Sadhana Tara Bala",
              "10th Bhava cusp free of malefic afflictions",
            ]}
            onViewDetails={() => {
              setSelectedSlotEvidence({
                title: "10:42 AM – 12:08 PM Window",
                verdict: "STRONG SUPPORT (4 Favorable factors • 1 Neutral • 0 Conflicts)",
                supportive: 4,
                neutral: 1,
                cautions: 0,
                items: [
                  {
                    category: "Tithi Compatibility",
                    status: "Highly Supportive",
                    description: "Shukla Chaturthi activates Lord Ganesha's energy for removing obstacles in commercial and legal undertakings.",
                    sourceText: "Muhurta Chintamani, Tithi Prakarana",
                  },
                  {
                    category: "Nakshatra Tara Bala",
                    status: "Highly Supportive",
                    description: "Rohini Nakshatra provides 'Sadhana Tara' (Achievement) for your birth Moon, ensuring sustained stability.",
                    sourceText: "Brihat Samhita, Nakshatra Shuddhi",
                  },
                  {
                    category: "Planetary Hora",
                    status: "Supportive",
                    description: "Jupiter Hora commences at 10:42 AM, stimulating sound judgment and ethical mutual trust.",
                  },
                  {
                    category: "Rahu Kala / Yamaganda Avoidance",
                    status: "Highly Supportive",
                    description: "Completely clear of Rahu Kala (04:30–06:00 PM) and Yamaganda (01:45–03:15 PM) intervals.",
                  },
                ],
              });
              setIsEvidenceOpen(true);
            }}
          />

          {/* Good Window 2 */}
          <AstroTimeSlotCard
            periodTitle="Secondary Commercial Window"
            timeWindow="02:15 PM – 03:45 PM"
            tier="GOOD"
            reasons={[
              "Mercury Hora stimulates intellectual precision and communications",
              "Benefic Sukarma Yoga remains in effect",
            ]}
            cautions={[
              "Marginal overlap with Yamaganda boundary after 03:15 PM",
            ]}
            onViewDetails={() => {
              setSelectedSlotEvidence({
                title: "02:15 PM – 03:45 PM Window",
                verdict: "MODERATE SUPPORT (3 Favorable factors • 1 Neutral • 1 Caution)",
                supportive: 3,
                neutral: 1,
                cautions: 1,
                items: [
                  {
                    category: "Mercury Hora",
                    status: "Supportive",
                    description: "Mercury governs exchange, trade documentation, and negotiations.",
                  },
                  {
                    category: "Yamaganda Caution",
                    status: "Cautionary",
                    description: "Conclude critical executions before 03:15 PM when Yamaganda enters.",
                  },
                ],
              });
              setIsEvidenceOpen(true);
            }}
          />

          {/* Acceptable Window 3 */}
          <AstroTimeSlotCard
            periodTitle="Evening Discussion Window"
            timeWindow="06:50 PM – 08:15 PM"
            tier="ACCEPTABLE"
            reasons={[
              "Venus Hora encourages consensus and partnership harmony",
              "Sunset Sandhya concludes safely",
            ]}
            onViewDetails={() => {
              setSelectedSlotEvidence({
                title: "06:50 PM – 08:15 PM Window",
                verdict: "ACCEPTABLE SUPPORT (2 Favorable factors • 2 Neutral • 0 Conflicts)",
                supportive: 2,
                neutral: 2,
                cautions: 0,
                items: [
                  {
                    category: "Venus Hora",
                    status: "Supportive",
                    description: "Venus Hora brings diplomatic ease.",
                  },
                ],
              });
              setIsEvidenceOpen(true);
            }}
          />

          {/* Avoid Window 4 */}
          <AstroTimeSlotCard
            periodTitle="Rahu Kala (Strict Avoidance)"
            timeWindow="04:30 PM – 06:00 PM"
            tier="AVOID"
            reasons={[]}
            cautions={[
              "Rahu Kala window; classical Muhurta prohibits initiating contracts, travel, or property purchase.",
            ]}
          />
        </div>
      </section>

      {/* Evidence Drawer */}
      <AstroEvidenceDrawer
        isOpen={isEvidenceOpen}
        onClose={() => setIsEvidenceOpen(false)}
        title={selectedSlotEvidence.title}
        subtitle="Full deterministic factor verification"
        verdict={selectedSlotEvidence.verdict}
        supportiveCount={selectedSlotEvidence.supportive}
        neutralCount={selectedSlotEvidence.neutral}
        cautionCount={selectedSlotEvidence.cautions}
        evidenceItems={selectedSlotEvidence.items}
      />
    </div>
  );
};
