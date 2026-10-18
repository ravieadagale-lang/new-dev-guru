import React, { useState } from "react";
import { 
  Sparkles, 
  Sun, 
  Compass, 
  Clock, 
  Heart, 
  Calendar, 
  FileText, 
  Layers, 
  ChevronDown, 
  ChevronRight,
  ShieldCheck,
  Cpu,
  BarChart3,
  Moon,
  Activity,
  Flame,
  Globe,
  Settings,
  HelpCircle,
  UserCheck,
  BookOpen,
  Briefcase
} from "lucide-react";
import { ExperienceLevel } from "./AstroHeader";

export interface AstroSidebarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  experienceLevel: ExperienceLevel;
  onOpenOnboarding?: () => void;
}

export const AstroSidebar: React.FC<AstroSidebarProps> = ({
  currentTab,
  onSelectTab,
  experienceLevel,
  onOpenOnboarding,
}) => {
  const [isAdvancedExpanded, setIsAdvancedExpanded] = useState(
    experienceLevel === "advanced" || experienceLevel === "practitioner" || experienceLevel === "admin"
  );

  const mainNavItems = [
    { id: "overview", label: "Overview", icon: <Compass className="w-4 h-4" /> },
    { id: "panchang", label: "Today's Panchanga", icon: <Sun className="w-4 h-4 text-[#B89047]" /> },
    { id: "birth_chart", label: "Birth Chart", icon: <Compass className="w-4 h-4 text-[#3E6B99]" /> },
    { id: "my_day", label: "Daily Guidance", icon: <Activity className="w-4 h-4 text-[#1E6B37]" /> },
    { id: "best_time", label: "Best Time Finder", icon: <Clock className="w-4 h-4 text-[#9E5D14]" /> },
    { id: "compatibility", label: "Compatibility", icon: <Heart className="w-4 h-4 text-[#A62B2B]" /> },
    { id: "calendar", label: "Astro Calendar", icon: <Calendar className="w-4 h-4 text-[#63328C]" /> },
    { id: "reports", label: "Dossier Reports", icon: <FileText className="w-4 h-4 text-[#554E46]" /> },
  ];

  const advancedNavItems = [
    { id: "dashas", label: "5-Tier Dashas", icon: <Clock className="w-3.5 h-3.5 text-[#B89047]" /> },
    { id: "vargas", label: "D1–D60 Vargas", icon: <Layers className="w-3.5 h-3.5 text-[#3E6B99]" /> },
    { id: "yogas", label: "Classical Yogas", icon: <Sparkles className="w-3.5 h-3.5 text-[#1E6B37]" /> },
    { id: "shadbala", label: "Shadbala & Bhava Bala", icon: <BarChart3 className="w-3.5 h-3.5 text-[#9E5D14]" /> },
    { id: "ashtakavarga", label: "Ashtakavarga Matrix", icon: <Layers className="w-3.5 h-3.5 text-[#63328C]" /> },
    { id: "transits", label: "Transits & Sade Sati", icon: <Moon className="w-3.5 h-3.5 text-[#2B4360]" /> },
    { id: "nakshatra", label: "Nakshatra Experience", icon: <Sparkles className="w-3.5 h-3.5 text-[#B89047]" /> },
    { id: "kp_system", label: "KP Astrology", icon: <ShieldCheck className="w-3.5 h-3.5 text-[#A62B2B]" /> },
    { id: "jaimini", label: "Jaimini Sutras", icon: <Globe className="w-3.5 h-3.5 text-[#1E6B37]" /> },
    { id: "tajika", label: "Varshaphala (Year Ahead)", icon: <Sun className="w-3.5 h-3.5 text-[#B89047]" /> },
    { id: "prashna", label: "Prashna Horary", icon: <Compass className="w-3.5 h-3.5 text-[#3E6B99]" /> },
    { id: "muhurta", label: "Muhurta Electional", icon: <Clock className="w-3.5 h-3.5 text-[#9E5D14]" /> },
  ];

  const practitionerNavItems = [
    { id: "practitioner_workspace", label: "Practitioner Workspace", icon: <Briefcase className="w-4 h-4 text-[#B89047]" /> },
    { id: "client_profiles", label: "Client Records", icon: <UserCheck className="w-4 h-4 text-[#3E6B99]" /> },
  ];

  const adminNavItems = [
    { id: "admin_control_center", label: "Super Admin Control", icon: <Cpu className="w-4 h-4 text-[#B89047]" /> },
    { id: "rule_debugger", label: "Rule Debugger & Lab", icon: <ShieldCheck className="w-4 h-4 text-[#1E6B37]" /> },
  ];

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-[#FAF8F5] border-r border-[#E7E2D9] py-5 px-3 select-none overflow-y-auto no-scrollbar">
        {/* Brand Logo & Tagline */}
        <div className="px-3 pb-5 mb-2 border-b border-[#EAE5DA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1E1B18] via-[#2A241F] to-[#B89047] flex items-center justify-center text-white shadow-xs">
              <Compass className="w-5 h-5 text-[#FDF8EB]" />
            </div>
            <div>
              <div className="font-serif font-bold text-lg text-[#1E1B18] tracking-tight leading-none">
                Dev-Guru
              </div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#B89047] mt-0.5">
                Decode Destiny
              </div>
            </div>
          </div>
          <div className="text-[11px] text-[#766E65] mt-2 italic">
            Deterministic Celestial Intelligence
          </div>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#9E958A] px-3 py-1">
            Essential
          </div>
          {mainNavItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 text-left ${
                  isActive
                    ? "bg-[#1E1B18] text-[#FDFBF7] shadow-xs font-bold"
                    : "text-[#4A433B] hover:bg-[#F2ECE1] hover:text-[#1E1B18]"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Expandable Advanced Astrology Section */}
          <div className="pt-3">
            <button
              onClick={() => setIsAdvancedExpanded(!isAdvancedExpanded)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#9E958A] hover:text-[#1E1B18]"
            >
              <span>Advanced Astrology</span>
              {isAdvancedExpanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>

            {isAdvancedExpanded && (
              <div className="mt-1 space-y-0.5 pl-2 border-l border-[#E5DFD4] ml-3">
                {advancedNavItems.map((item) => {
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectTab(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-left ${
                        isActive
                          ? "bg-[#EFEAE0] text-[#1E1B18] font-bold shadow-2xs"
                          : "text-[#5C544B] hover:bg-[#F5F0E6] hover:text-[#1E1B18]"
                      }`}
                    >
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Practitioner Section (If in Practitioner or Admin mode) */}
          {(experienceLevel === "practitioner" || experienceLevel === "admin") && (
            <div className="pt-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D23] px-3 py-1">
                Practitioner Suite
              </div>
              {practitionerNavItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left ${
                      isActive
                        ? "bg-[#B89047] text-[#1E1B18] shadow-xs font-bold"
                        : "text-[#4A433B] hover:bg-[#F2ECE1]"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Admin Control Center Section */}
          {experienceLevel === "admin" && (
            <div className="pt-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#A62B2B] px-3 py-1">
                Engine Control Center
              </div>
              {adminNavItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left ${
                      isActive
                        ? "bg-[#1E1B18] text-[#FDFBF7] font-bold"
                        : "text-[#4A433B] hover:bg-[#F2ECE1]"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </nav>

        {/* Footer Policy & Settings */}
        <div className="pt-4 border-t border-[#EAE5DA] space-y-1">
          <div className="px-3 py-2 rounded-xl bg-[#F4EFE5] border border-[#E2DBD0] text-[11px] text-[#6C645A]">
            <div className="font-bold text-[#1E1B18]">Engine v2.5.0</div>
            <div className="text-[10px] text-[#8C847A]">IAU-2006 High Precision</div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#E7E2D9] px-2 py-2 flex justify-around items-center shadow-lg">
        <button
          onClick={() => onSelectTab("overview")}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-semibold ${
            currentTab === "overview" ? "text-[#1E1B18] font-bold" : "text-[#766E65]"
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => onSelectTab("panchang")}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-semibold ${
            currentTab === "panchang" ? "text-[#B89047] font-bold" : "text-[#766E65]"
          }`}
        >
          <Sun className="w-5 h-5" />
          <span>Panchanga</span>
        </button>

        <button
          onClick={() => onSelectTab("best_time")}
          className="flex flex-col items-center -mt-5"
        >
          <div className="w-12 h-12 rounded-full bg-[#1E1B18] text-[#B89047] flex items-center justify-center shadow-lg border-2 border-[#FAF8F5]">
            <Clock className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-[#1E1B18] mt-0.5">Best Time</span>
        </button>

        <button
          onClick={() => onSelectTab("birth_chart")}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-semibold ${
            currentTab === "birth_chart" ? "text-[#3E6B99] font-bold" : "text-[#766E65]"
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>Chart</span>
        </button>

        <button
          onClick={() => onSelectTab("calendar")}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-semibold ${
            currentTab === "calendar" ? "text-[#63328C] font-bold" : "text-[#766E65]"
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Calendar</span>
        </button>
      </div>
    </>
  );
};
