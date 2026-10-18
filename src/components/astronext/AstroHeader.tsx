import React, { useState, useEffect } from "react";
import { 
  Search, 
  MapPin, 
  Calendar as CalendarIcon, 
  Bell, 
  User, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Compass,
  Sliders,
  ChevronDown
} from "lucide-react";
import { AstroBadge } from "./AstroDesignSystem";

export type ExperienceLevel = "simple" | "advanced" | "practitioner" | "admin";

interface AstroHeaderProps {
  currentLocation: string;
  onOpenLocationModal: () => void;
  onOpenSearch: () => void;
  experienceLevel: ExperienceLevel;
  onChangeExperienceLevel: (level: ExperienceLevel) => void;
  userName?: string;
  onOpenProfile?: () => void;
  onOpenOnboarding?: () => void;
}

export const AstroHeader: React.FC<AstroHeaderProps> = ({
  currentLocation,
  onOpenLocationModal,
  onOpenSearch,
  experienceLevel,
  onChangeExperienceLevel,
  userName = "Aarav Sharma",
  onOpenProfile,
  onOpenOnboarding,
}) => {
  const [currentDateFormatted, setCurrentDateFormatted] = useState("");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setCurrentDateFormatted(formatted);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E7E2D9] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 transition-all">
      {/* Left: Greeting, Date, Location */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-5">
        <div>
          <div className="text-xs text-[#766E65] font-medium">
            {getGreeting()}, <span className="font-bold text-[#1E1B18]">{userName}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#554E46] mt-0.5">
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-3.5 h-3.5 text-[#B89047]" />
              <span className="font-semibold">{currentDateFormatted || "17 August 2026"}</span>
            </span>
            <span className="text-[#DDD7CC]">•</span>
            <button
              onClick={onOpenLocationModal}
              className="flex items-center gap-1 font-semibold text-[#8C6D23] hover:text-[#1E1B18] bg-[#F5EFE0] px-2 py-0.5 rounded-md border border-[#E5D6B6] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#8C6D23]" />
              <span>{currentLocation}</span>
              <span className="text-[10px] text-[#A68842] underline ml-0.5">Change</span>
            </button>
          </div>
        </div>
      </div>

      {/* Center: Global Intelligent Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-2 bg-[#FFFFFF] hover:bg-[#FDFBF7] border border-[#DDD7CD] rounded-xl text-xs text-[#766E65] shadow-2xs hover:border-[#B89047] transition-all cursor-pointer text-left"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#B89047]" />
            <span>Search planets, yogas, dashas, muhurta, KP, nakshatra...</span>
          </span>
          <kbd className="px-1.5 py-0.5 bg-[#F2EFE9] text-[#766E65] text-[10px] font-mono rounded border border-[#DDD7CC]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Experience Mode Switcher & Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Experience Mode Switcher (Three-Layer UX) */}
        <div className="flex items-center gap-1.5 bg-[#EFEBE1] p-1 rounded-xl border border-[#DDD7CC]">
          <span className="text-[10px] text-[#766E65] font-bold uppercase tracking-wider px-2 hidden sm:inline">
            Mode:
          </span>
          <select
            value={experienceLevel}
            onChange={(e) => onChangeExperienceLevel(e.target.value as ExperienceLevel)}
            aria-label="Select Experience Mode"
            className="bg-[#FFFFFF] text-[#1E1B18] text-xs font-bold py-1 px-2.5 rounded-lg border border-[#DDD7CC] shadow-2xs focus:outline-none focus:border-[#B89047] cursor-pointer"
          >
            <option value="simple">Layer 1: Essential</option>
            <option value="advanced">Layer 2: Advanced</option>
            <option value="practitioner">Layer 3: Practitioner</option>
            <option value="admin">Layer 4: Engine Admin</option>
          </select>
        </div>

        {/* Mobile Search Button */}
        <button
          onClick={onOpenSearch}
          aria-label="Search"
          className="md:hidden p-2 rounded-xl bg-[#FFFFFF] border border-[#DDD7CC] text-[#766E65] hover:text-[#1E1B18]"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Guided Onboarding Trigger */}
        <button
          onClick={onOpenOnboarding}
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F6EED8] text-[#8C6D23] hover:bg-[#EEDFBF] border border-[#E5D2A0] text-xs font-bold transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Chart Profile</span>
        </button>

        {/* User Profile avatar */}
        <button
          onClick={onOpenProfile}
          className="w-8 h-8 rounded-full bg-[#1E1B18] text-white flex items-center justify-center font-bold text-xs shadow-xs hover:ring-2 hover:ring-[#B89047] transition-all"
        >
          {userName.charAt(0)}
        </button>
      </div>
    </header>
  );
};
