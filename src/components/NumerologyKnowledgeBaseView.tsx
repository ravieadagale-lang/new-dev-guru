import React from "react";
import {
  BookOpen,
  Hash,
  Type,
  Grid3X3,
  Phone,
  Car,
  Home,
  Briefcase,
  Building2,
  Calendar,
  Sparkles,
  PenTool,
  Heart,
  Flame,
  Award,
  ArrowRight,
} from "lucide-react";

interface NumerologyKnowledgeBaseViewProps {
  onNavigateTab: (tab: any) => void;
}

export const NumerologyKnowledgeBaseView: React.FC<NumerologyKnowledgeBaseViewProps> = ({
  onNavigateTab,
}) => {
  const sections = [
    {
      id: "report",
      title: "Comprehensive Life Report",
      description: "Complete Vedic and Cheiro numerical blueprint analyzing Driver, Conductor, Destiny, and Karmic paths.",
      icon: BookOpen,
      badge: "Core Analysis",
    },
    {
      id: "name_system",
      title: "Vedic Name Correction System",
      description: "Harmonize your full name vibrations with your psychic number to unlock career momentum and peace.",
      icon: Type,
      badge: "Name Vibration",
    },
    {
      id: "loshu_grid",
      title: "Lo Shu 3x3 Magic Square",
      description: "Ancient Chinese numerical grid revealing mental, emotional, practical, and spiritual planes of consciousness.",
      icon: Grid3X3,
      badge: "Grid Planes",
    },
    {
      id: "mobile_numerology",
      title: "Mobile Number Numerology",
      description: "Evaluate your contact number for business success, communication flow, and personal compatibility.",
      icon: Phone,
      badge: "Digital Vibration",
    },
    {
      id: "vehicle_numerology",
      title: "Vehicle Registration Analysis",
      description: "Analyze license plate and vehicle numbers for safety, planetary harmony, and travel prosperity.",
      icon: Car,
      badge: "Mobility",
    },
    {
      id: "house_numerology",
      title: "House & Apartment Number",
      description: "Assess the energetic atmosphere, peace, and health vibrations of your residential or rental address.",
      icon: Home,
      badge: "Vastu Harmony",
    },
    {
      id: "business_numerology",
      title: "Business & Company Numerology",
      description: "Align your enterprise name and incorporation date with lucrative financial numbers.",
      icon: Briefcase,
      badge: "Commerce",
    },
    {
      id: "brand_numerology",
      title: "Brand & Trademark Harmony",
      description: "Optimize brand titles, logos, and product lines to project magnetic market presence.",
      icon: Building2,
      badge: "Branding",
    },
    {
      id: "muhurta_numerology",
      title: "Numerical Muhurta Timing",
      description: "Pinpoint favorable calendar dates and hours for contracts, launches, and asset purchases.",
      icon: Calendar,
      badge: "Auspicious Timing",
    },
    {
      id: "lucky_remedies",
      title: "Lucky Numbers & Fasting Days",
      description: "Discover your canonical favorable colors, lucky gems, lucky days, and planetary fasts.",
      icon: Sparkles,
      badge: "Remedies",
    },
    {
      id: "signature_analysis",
      title: "Graphology & Signature Flow",
      description: "Analyze signature slant, underlines, dots, and stroke velocity to correct self-sabotage.",
      icon: PenTool,
      badge: "Graphology",
    },
    {
      id: "spiritual_remedies",
      title: "Sacred Mantras & Yantras",
      description: "Channel high-frequency Vedic planetary stotras, bija mantras, and energetic yantras.",
      icon: Heart,
      badge: "Spirituality",
    },
    {
      id: "chakra_balancing",
      title: "Chakra & Kundalini Balancing",
      description: "Align your core energy vortexes through numerical sound frequencies and crystals.",
      icon: Flame,
      badge: "Energy Centers",
    },
    {
      id: "archetype_book",
      title: "Planetary Archetype Compendium",
      description: "Deep study of Numbers 1 through 9 through the archetypes of Surya, Chandra, Guru, Shukra, and Shani.",
      icon: Award,
      badge: "Deep Lore",
    },
    {
      id: "master_karmic_book",
      title: "Master & Karmic Debt Numbers",
      description: "In-depth exposition of Master Numbers 11, 22, 33 and Karmic Debts 13/4, 14/5, 16/7, 19/1.",
      icon: Hash,
      badge: "Master Numbers",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E1712] via-[#2A1F16] to-[#18110D] text-amber-50 rounded-3xl p-6 sm:p-8 border border-amber-600/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Sacred Numerical Repository</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Numerology Knowledge Base &amp; Applied Tools
          </h2>
          <p className="text-xs text-amber-100/70 max-w-xl">
            Explore authoritative Shastric and Cheiro numerical wisdom across all 15 specialized domains. Select any module to calculate your personal vibrational chart.
          </p>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <div
              key={sec.id}
              onClick={() => onNavigateTab(sec.id)}
              className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200/60 group-hover:bg-amber-900 group-hover:text-amber-100 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {sec.badge}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-amber-900 transition-colors">
                  {sec.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {sec.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-900">
                <span>Launch Analysis</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
