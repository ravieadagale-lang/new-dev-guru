import React from "react";
import { UserProfile, PlanetPosition, HouseDetail } from "../../types";
import { 
  FileText, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Award, 
  Heart, 
  Coins, 
  Briefcase, 
  Activity,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

interface ReportsWorkspaceProps {
  userProfile?: UserProfile;
  planets: PlanetPosition[];
  houses: HouseDetail[];
  lagnaSign: string;
  onOpenPdfModal?: () => void;
}

export const ReportsWorkspace: React.FC<ReportsWorkspaceProps> = ({
  userProfile,
  planets,
  houses,
  lagnaSign,
  onOpenPdfModal
}) => {
  const reportCards = [
    {
      id: "kundli_full",
      title: "Comprehensive Vedic Kundli Dossier",
      subtitle: "Full 25-page life blueprint with D1 to D60 charts, dashas & planetary yogas",
      icon: BookOpen,
      pages: "25 Pages",
      badge: "Flagship Edition",
      color: "from-amber-500/20 to-amber-600/10",
      isPrimary: true
    },
    {
      id: "career_finance",
      title: "Career, Wealth & D10 Dasamsa Analysis",
      subtitle: "Professional trajectory, financial surges, suitable vocations & business timing",
      icon: Briefcase,
      pages: "12 Pages",
      badge: "Vocation",
      color: "from-blue-500/20 to-blue-600/10",
      isPrimary: false
    },
    {
      id: "relationship_marriage",
      title: "Marriage, D9 Navamsa & Relationship Matrix",
      subtitle: "Soulmate alignment, 7th house lord strength, timing of union & marital bliss",
      icon: Heart,
      pages: "14 Pages",
      badge: "Union",
      color: "from-rose-500/20 to-rose-600/10",
      isPrimary: false
    },
    {
      id: "remedies_blueprint",
      title: "Personalized Vedic Remedial Blueprint",
      subtitle: "Verified gemstones, Kavach yantras, customized mantras & planetary charity guide",
      icon: ShieldCheck,
      pages: "8 Pages",
      badge: "Sacred",
      color: "from-emerald-500/20 to-emerald-600/10",
      isPrimary: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent rounded-3xl p-6 sm:p-8 border border-amber-500/20 shadow-xs flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mathematical Vedic Reports</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white">
            Personalized Astrological PDF Reports
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Generate high-resolution printable PDF dossiers crafted with authentic Parashari, Jaimini, and KP astrological algorithms for {userProfile?.name || "your birth chart"}.
          </p>
        </div>

        {onOpenPdfModal && (
          <button
            onClick={onOpenPdfModal}
            className="py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 flex items-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            <span>Generate Full PDF Report</span>
          </button>
        )}
      </div>

      {/* Grid of Available Report Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportCards.map((report) => {
          const Icon = report.icon;
          return (
            <div
              key={report.id}
              className={`rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                report.isPrimary
                  ? "bg-white dark:bg-slate-900 border-amber-500/40 shadow-md shadow-amber-500/5 ring-1 ring-amber-500/20"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-400/50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${report.color} flex items-center justify-center text-amber-600 dark:text-amber-400 border border-amber-500/20`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {report.pages}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                      {report.badge}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white">
                  {report.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {report.subtitle}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Includes Charts & Timelines</span>
                </span>
                {onOpenPdfModal && (
                  <button
                    onClick={onOpenPdfModal}
                    className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Download</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
