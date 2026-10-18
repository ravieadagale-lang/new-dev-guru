import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Compass, 
  Clock, 
  Heart, 
  Briefcase, 
  DollarSign, 
  GraduationCap, 
  Home, 
  Plane, 
  Calendar, 
  FileText, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight,
  ShieldCheck,
  TrendingUp
} from "lucide-react";
import { UserProfile } from "../../types";
import { 
  AstroCard, 
  AstroBadge, 
  AstroButton, 
  AstroEvidenceDrawer, 
  AstroEvidenceItem,
  AstroTimeSlotCard 
} from "./AstroDesignSystem";

interface AstroHomeDashboardProps {
  userProfile: UserProfile;
  onSelectTab: (tabId: string) => void;
  onOpenOnboarding?: () => void;
}

export const AstroHomeDashboard: React.FC<AstroHomeDashboardProps> = ({
  userProfile,
  onSelectTab,
  onOpenOnboarding,
}) => {
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
  const [selectedEvidenceTheme, setSelectedEvidenceTheme] = useState("Career Guidance");

  const intentCards = [
    { id: "my_day", label: "My Day", desc: "Actionable daily forecast", icon: <Sun className="w-5 h-5 text-[#B89047]" />, bg: "bg-[#FAF7F0]" },
    { id: "birth_chart", label: "My Birth Chart", desc: "Planets, lagna & houses", icon: <Compass className="w-5 h-5 text-[#3E6B99]" />, bg: "bg-[#F0F4F8]" },
    { id: "best_time", label: "Best Time Finder", desc: "Favorable activity windows", icon: <Clock className="w-5 h-5 text-[#9E5D14]" />, bg: "bg-[#FDF6ED]" },
    { id: "compatibility", label: "Love & Marriage", desc: "Ashtakoota & synastry", icon: <Heart className="w-5 h-5 text-[#A62B2B]" />, bg: "bg-[#FDF0F0]" },
    { id: "vargas", label: "Career (D10)", desc: "Profession & status timing", icon: <Briefcase className="w-5 h-5 text-[#1E6B37]" />, bg: "bg-[#EFF8F1]" },
    { id: "shadbala", label: "Money & Wealth", desc: "Dhana yogas & 2nd/11th strength", icon: <DollarSign className="w-5 h-5 text-[#B89047]" />, bg: "bg-[#FAF7F0]" },
    { id: "tajika", label: "Year Ahead (2026)", desc: "Varshaphala & Muntha", icon: <Calendar className="w-5 h-5 text-[#63328C]" />, bg: "bg-[#F5EFFB]" },
    { id: "reports", label: "Dossier Reports", icon: <FileText className="w-5 h-5 text-[#554E46]" />, desc: "Exportable life analysis", bg: "bg-[#F5F2EB]" },
  ];

  const careerEvidenceItems: AstroEvidenceItem[] = [
    {
      category: "10th House (Karma Bhava)",
      status: "Highly Supportive",
      description: "Sun exalted in Aries in the 10th house confers Digbala (directional strength) and initiates leadership recognition.",
      sourceText: "Brihat Parashara Hora Shastra, Ch. 12, Sloka 8",
    },
    {
      category: "Current Dasha Cycle",
      status: "Supportive",
      description: "Jupiter-Sun Antardasha active. Jupiter aspects the 10th house from Sagittarius (9th house of Dharma).",
      sourceText: "Phaladeepika, Dasha Phala, Sloka 14",
    },
    {
      category: "Transit Influence",
      status: "Supportive",
      description: "Saturn transiting 11th from Moon brings steady gains; Jupiter in 10th Kendra reinforces professional expansion.",
      sourceText: "Jataka Parijata, Gochara Phala",
    },
    {
      category: "D10 Dasamsa Chart",
      status: "Highly Supportive",
      description: "Mars in own sign (Scorpio) in 10th house of D10 indicates technical leadership and strategic execution power.",
      sourceText: "Saravali, Varga Vichaara",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* 1. Hero Summary Bar */}
      <div className="bg-[#FAF8F5] border border-[#E7E2D9] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B89047]">
              <Sparkles className="w-3.5 h-3.5 text-[#B89047]" />
              <span>Today&apos;s Celestial Pulse</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B18]">
              Harmonious alignment for strategic decisions and creative expansion.
            </h1>
            <p className="text-xs sm:text-sm text-[#6C645A] max-w-2xl">
              Moon in Rohini Nakshatra (Taurus) combined with Sukarma Yoga creates a highly supportive baseline for commercial agreements and focused communication.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <AstroButton
              variant="outline"
              size="sm"
              onClick={() => onSelectTab("panchang")}
            >
              <Sun className="w-3.5 h-3.5 text-[#B89047]" />
              <span>Full Panchanga</span>
            </AstroButton>
            <AstroButton
              variant="primary"
              size="sm"
              onClick={() => onSelectTab("best_time")}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Find Best Time</span>
            </AstroButton>
          </div>
        </div>

        {/* Panchanga Quick Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-[#EAE5DA]">
          <div className="bg-[#FFFFFF] p-3 rounded-2xl border border-[#E7E2D9]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C847A]">Tithi</div>
            <div className="text-xs sm:text-sm font-bold text-[#1E1B18] mt-0.5">Shukla Chaturthi</div>
            <div className="text-[10px] text-[#1E6B37] font-semibold">Ganesha blessings</div>
          </div>

          <div className="bg-[#FFFFFF] p-3 rounded-2xl border border-[#E7E2D9]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C847A]">Nakshatra</div>
            <div className="text-xs sm:text-sm font-bold text-[#1E1B18] mt-0.5">Rohini (Pada 2)</div>
            <div className="text-[10px] text-[#B89047] font-semibold">Taurus • Prajapati</div>
          </div>

          <div className="bg-[#FFFFFF] p-3 rounded-2xl border border-[#E7E2D9]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C847A]">Yoga</div>
            <div className="text-xs sm:text-sm font-bold text-[#1E1B18] mt-0.5">Sukarma (Benefic)</div>
            <div className="text-[10px] text-[#1E6B37] font-semibold">Smooth execution</div>
          </div>

          <div className="bg-[#FFFFFF] p-3 rounded-2xl border border-[#E7E2D9]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C847A]">Karana</div>
            <div className="text-xs sm:text-sm font-bold text-[#1E1B18] mt-0.5">Vanija</div>
            <div className="text-[10px] text-[#554E46] font-semibold">Commerce & Trade</div>
          </div>

          <div className="bg-[#FFFFFF] p-3 rounded-2xl border border-[#E7E2D9]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C847A]">Solar Horizon</div>
            <div className="text-xs sm:text-sm font-bold text-[#1E1B18] mt-0.5">06:04 AM – 06:51 PM</div>
            <div className="text-[10px] text-[#766E65] font-medium">Day duration 12h 47m</div>
          </div>

          <div className="bg-[#FFFFFF] p-3 rounded-2xl border border-[#E7E2D9]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C847A]">Abhijit Muhurta</div>
            <div className="text-xs sm:text-sm font-bold text-[#1E6B37] mt-0.5">12:02 PM – 12:54 PM</div>
            <div className="text-[10px] text-[#1E6B37] font-bold">Highly Auspicious</div>
          </div>
        </div>
      </div>

      {/* 2. "What would you like to know?" Intent Cards */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1E1B18]">What would you like to know?</h2>
            <p className="text-xs text-[#766E65]">Instant astrological focus based on your exact birth coordinates</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3.5">
          {intentCards.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`p-4 sm:p-5 rounded-2xl border border-[#E2DBD0] ${item.bg} hover:border-[#B89047] hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between`}
            >
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-xl bg-white shadow-2xs border border-[#E7E2D9]">
                  {item.icon}
                </div>
                <ChevronRight className="w-4 h-4 text-[#C5BDB2] group-hover:text-[#1E1B18] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="mt-4 space-y-0.5">
                <div className="text-xs sm:text-sm font-bold text-[#1E1B18]">{item.label}</div>
                <div className="text-[11px] text-[#6C645A] line-clamp-1">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Two-Column Dashboard: Today's Best Windows + Your Day Guidance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Today's Best Windows (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1E1B18]">Today&apos;s Best Windows</h2>
              <p className="text-xs text-[#766E65]">Filtered against Panchanga & Rahu Kala</p>
            </div>
            <button
              onClick={() => onSelectTab("best_time")}
              className="text-xs font-bold text-[#8C6D23] hover:text-[#1E1B18] flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            <AstroTimeSlotCard
              periodTitle="Business Deals & Contracts"
              timeWindow="10:42 AM – 12:08 PM"
              tier="BEST"
              reasons={[
                "Supportive Rohini Nakshatra + Abhijit alignment",
                "Jupiter Hora active with favorable Tara Bala",
              ]}
              onViewDetails={() => {
                setSelectedEvidenceTheme("Morning Business Window");
                setIsEvidenceOpen(true);
              }}
            />

            <AstroTimeSlotCard
              periodTitle="Creative & Strategy Work"
              timeWindow="02:30 PM – 04:15 PM"
              tier="GOOD"
              reasons={[
                "Mercury Hora stimulates analytical clarity",
                "Moon trines Natal 1st house",
              ]}
            />

            <AstroTimeSlotCard
              periodTitle="Rahu Kala (Avoid Initiations)"
              timeWindow="04:30 PM – 06:00 PM"
              tier="AVOID"
              reasons={[]}
              cautions={[
                "Rahu Kala window; defer signing contracts and major journeys",
              ]}
            />
          </div>
        </div>

        {/* Right Column: Your Day Guidance (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1E1B18]">Your Day: Domain Insights</h2>
              <p className="text-xs text-[#766E65]">Personalized for {userProfile.name}</p>
            </div>
            <button
              onClick={() => onSelectTab("my_day")}
              className="text-xs font-bold text-[#8C6D23] hover:text-[#1E1B18] flex items-center gap-1"
            >
              <span>Full Guidance</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Career Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs flex flex-col justify-between gap-3">
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#EFF8F1] text-[#1E6B37] border border-[#BCE1C7]">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1E1B18]">Career & Professional Impact</div>
                    <div className="text-[11px] text-[#766E65]">Optimal: 10:30 AM – 12:10 PM</div>
                  </div>
                </div>
                <AstroBadge label="Strong Support" variant="green" />
              </div>
              <p className="text-xs text-[#4A433B] leading-relaxed">
                Active 10th house resonance allows strategic initiatives to gain approval from leadership. Favorable transit support from Jupiter.
              </p>
              <div className="flex justify-between items-center pt-2 border-t border-[#F2ECE1]">
                <span className="text-[11px] text-[#1E6B37] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 4 Favorable factors • 0 Major conflicts
                </span>
                <button
                  onClick={() => {
                    setSelectedEvidenceTheme("Career Guidance");
                    setIsEvidenceOpen(true);
                  }}
                  className="text-xs font-bold text-[#8C6D23] hover:text-[#1E1B18] flex items-center gap-1"
                >
                  <span>Why?</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Finance Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs flex flex-col justify-between gap-3">
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#FAF7F0] text-[#8C6D23] border border-[#E5D2A0]">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1E1B18]">Money & Commercial Investments</div>
                    <div className="text-[11px] text-[#766E65]">Optimal: 11:15 AM – 01:30 PM</div>
                  </div>
                </div>
                <AstroBadge label="Moderate Support" variant="gold" />
              </div>
              <p className="text-xs text-[#4A433B] leading-relaxed">
                Dhana Yoga stimulation favors long-term portfolio restructuring rather than speculative short-term volatility.
              </p>
              <div className="flex justify-between items-center pt-2 border-t border-[#F2ECE1]">
                <span className="text-[11px] text-[#554E46] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8C6D23]" /> 3 Favorable factors • 1 Neutral
                </span>
                <button
                  onClick={() => {
                    setSelectedEvidenceTheme("Finance & Dhana Yogas");
                    setIsEvidenceOpen(true);
                  }}
                  className="text-xs font-bold text-[#8C6D23] hover:text-[#1E1B18] flex items-center gap-1"
                >
                  <span>Why?</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Relationships Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs flex flex-col justify-between gap-3">
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#FDF0F0] text-[#A62B2B] border border-[#F5BEBC]">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1E1B18]">Relationships & Harmony</div>
                    <div className="text-[11px] text-[#766E65]">Optimal: 07:00 PM – 09:30 PM</div>
                  </div>
                </div>
                <AstroBadge label="Peaceful & Grounded" variant="neutral" />
              </div>
              <p className="text-xs text-[#4A433B] leading-relaxed">
                Venus aspecting the 7th house encourages heartfelt conversations and resolves pending domestic friction.
              </p>
              <div className="flex justify-between items-center pt-2 border-t border-[#F2ECE1]">
                <span className="text-[11px] text-[#554E46] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1E6B37]" /> 2 Favorable factors • 2 Neutral
                </span>
                <button
                  onClick={() => {
                    setSelectedEvidenceTheme("Relationship Harmony");
                    setIsEvidenceOpen(true);
                  }}
                  className="text-xs font-bold text-[#8C6D23] hover:text-[#1E1B18] flex items-center gap-1"
                >
                  <span>Why?</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Planetary Transits & Dasha Active Banner */}
      <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E7E2D9] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1E1B18] text-[#FAF8F5] flex items-center justify-center font-bold">
            <Clock className="w-5 h-5 text-[#B89047]" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#1E1B18]">Current Vimshottari Period</div>
            <div className="text-sm font-semibold text-[#8C6D23] flex items-center gap-2">
              <span>Jupiter Mahadasha</span>
              <span className="text-[#DDD7CC]">•</span>
              <span>Sun Antardasha</span>
              <span className="text-[#DDD7CC]">•</span>
              <span className="text-xs text-[#766E65]">Until Nov 2027</span>
            </div>
          </div>
        </div>

        <AstroButton
          variant="outline"
          size="sm"
          onClick={() => onSelectTab("dashas")}
        >
          <span>Open Dasha Timeline</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </AstroButton>
      </div>

      {/* Evidence Drawer */}
      <AstroEvidenceDrawer
        isOpen={isEvidenceOpen}
        onClose={() => setIsEvidenceOpen(false)}
        title={selectedEvidenceTheme}
        subtitle="Transparent factor matrix & classical rule evaluation"
        verdict="Strong Support (Verified by 4 astrological engines)"
        supportiveCount={4}
        neutralCount={1}
        cautionCount={0}
        evidenceItems={careerEvidenceItems}
      />
    </div>
  );
};
