import React, { useState } from "react";
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Bell,
  User,
  Compass,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  Layers,
  Award,
  Calendar,
  Flame,
  MessageSquare
} from "lucide-react";
import { UserRole, UserProfile, LanguageCode, AppTheme } from "../types";
import { playCardClickSound, playCardHoverSound } from "../utils/audioEffects";

export interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string, subSectionId?: string) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  userProfile?: UserProfile;
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  notificationCount: number;
  onOpenNotifications: () => void;
  onOpenOnboarding: () => void;
  selectedLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  appTheme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
  onOpenLogin: () => void;
  onOpenSignUp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  userRole,
  onRoleChange,
  userProfile,
  cartCount,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  notificationCount,
  onOpenNotifications,
  onOpenOnboarding,
  selectedLanguage,
  onLanguageChange,
  appTheme,
  onThemeChange,
  onOpenLogin,
  onOpenSignUp
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  interface SubNavItem {
    id: string;
    label: string;
    targetTab?: string;
    subId?: string;
    badge?: string;
  }

  interface MainNavItem {
    id: string;
    label: string;
    badge?: string;
    targetTab?: string;
    subItems?: SubNavItem[];
  }

  const mainNavItems: MainNavItem[] = [
    { id: "home", label: "Home" },
    {
      id: "astrology",
      label: "Vedic Astrology",
      badge: "1,001+ Yogas",
      subItems: [
        { id: "birth_chart", label: "Birth Chart (D1 Rashi)", targetTab: "astrology", subId: "birth_chart" },
        { id: "divisional_charts", label: "Divisional Charts (D1–D60)", targetTab: "astrology", subId: "divisional_charts" },
        { id: "yogas", label: "Classical Yogas (1,001+ Rules)", targetTab: "astrology", subId: "yogas" },
        { id: "doshas", label: "Doshas & Exceptions", targetTab: "astrology", subId: "doshas" },
        { id: "dashas", label: "Vimshottari Dasha Hierarchy", targetTab: "astrology", subId: "dashas" },
        { id: "shadbala", label: "Shadbala & Planetary Strengths", targetTab: "astrology", subId: "shadbala" },
        { id: "ashtakavarga", label: "Ashtakavarga Matrix", targetTab: "astrology", subId: "ashtakavarga" },
        { id: "transits", label: "Transits (Gochara)", targetTab: "astrology", subId: "transits" },
        { id: "btr", label: "Birth Time Rectification", targetTab: "astrology", subId: "btr" },
        { id: "horoscope", label: "Daily Horoscope", targetTab: "horoscope" }
      ]
    },
    {
      id: "panchang",
      label: "Panchang & Vrats",
      subItems: [
        { id: "panchang", label: "Daily Panchang & Muhurta", targetTab: "panchang" },
        { id: "festivals_vrat", label: "Vrats & Fasting Guide", targetTab: "festivals_vrat" },
        { id: "festivals", label: "Vedic Festivals Calendar", targetTab: "festivals" }
      ]
    },
    { id: "compatibility", label: "Kundli Milan", badge: "Match" },
    {
      id: "divination",
      label: "Divination & Readings",
      targetTab: "numerology",
      subItems: [
        { id: "numerology", label: "Advanced Numerology", targetTab: "numerology" },
        { id: "tarot", label: "Sacred Tarot Sanctuary", targetTab: "tarot" },
        { id: "chinese_astrology", label: "Chinese Astrology & BaZi", targetTab: "chinese_astrology" },
        { id: "face_reading", label: "Face Reading (Samudrika)", targetTab: "face_reading" },
        { id: "dreams", label: "Dream Interpretation", targetTab: "dreams" }
      ]
    },
    {
      id: "lifestyle",
      label: "Vastu & Baby Names",
      targetTab: "vastu_fengshui",
      subItems: [
        { id: "vastu_fengshui", label: "Vastu Shastra & Feng Shui", targetTab: "vastu_fengshui" },
        { id: "baby_names", label: "Baby Names & Janmakshar", targetTab: "baby_names" }
      ]
    },
    {
      id: "sacred_living",
      label: "Sacred Living",
      targetTab: "mantras",
      subItems: [
        { id: "mantras", label: "Mantras & Rituals", targetTab: "mantras" },
        { id: "images", label: "Sacred Gallery & Yantras", targetTab: "images" },
        { id: "milestones", label: "Spiritual Milestones & Badges", targetTab: "milestones" },
        { id: "blog", label: "Articles & Wisdom Blog", targetTab: "blog" }
      ]
    },
    { id: "consultation", label: "Consultation", badge: "Under Testing" },
    { id: "marketplace", label: "Marketplace", badge: "Under Testing" }
  ];

  const handleNavClick = (tabId: string, subId?: string, targetTab?: string) => {
    playCardClickSound();
    const finalTab = targetTab || tabId;
    onSelectTab(finalTab, subId);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const isItemActive = (item: MainNavItem) => {
    if (currentTab === item.id || (item.targetTab && currentTab === item.targetTab)) return true;
    if (item.subItems) {
      return item.subItems.some(
        (s) => currentTab === s.id || (s.targetTab && currentTab === s.targetTab)
      );
    }
    return false;
  };

  const isGuest = !userProfile?.email || userProfile.id === "guest";

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7E2D9] shadow-xs">
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-amber-200 text-xs py-1 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              1,001+ Deterministic Classical Vedic Yogas &amp; Real Ephemeris Computing
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <button
              onClick={onOpenOnboarding}
              className="hover:text-amber-300 transition-colors hidden sm:inline"
            >
              Guide &amp; Principles
            </button>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
                className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
                aria-label="Language selection"
              >
                <option value="en" className="bg-slate-900 text-white">English</option>
                <option value="hi" className="bg-slate-900 text-white">हिन्दी</option>
                <option value="sa" className="bg-slate-900 text-white">संस्कृतम्</option>
                <option value="mr" className="bg-slate-900 text-white">मराठी</option>
                <option value="gu" className="bg-slate-900 text-white">ગુજરાતી</option>
                <option value="ta" className="bg-slate-900 text-white">தமிழ்</option>
                <option value="te" className="bg-slate-900 text-white">తెలుగు</option>
                <option value="bn" className="bg-slate-900 text-white">বাংলা</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between h-16">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              ॐ
            </div>
            <div className="text-left">
              <span className="font-serif font-bold text-xl text-slate-900 tracking-tight block leading-tight">
                Dev-Guru
              </span>
              <span className="text-[10px] text-amber-800 font-medium tracking-widest uppercase block -mt-0.5">
                Vedic Intelligence
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNavItems.map((item) => {
              const isActive = isItemActive(item);
              const hasSub = item.subItems && item.subItems.length > 0;

              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => {
                    if (hasSub) setActiveDropdown(item.id);
                  }}
                  onMouseLeave={() => {
                    if (hasSub) setActiveDropdown(null);
                  }}
                >
                  <button
                    onClick={() => handleNavClick(item.id, undefined, item.targetTab)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-slate-900 text-white shadow-xs"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/70"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-800 border border-amber-500/30">
                        {item.badge}
                      </span>
                    )}
                    {hasSub && <ChevronDown className="w-3 h-3 opacity-60" />}
                  </button>

                  {/* Dropdown Menu */}
                  {hasSub && activeDropdown === item.id && (
                    <div className="absolute top-full left-0 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                        {item.label} Portals
                      </div>
                      <div className="space-y-0.5">
                        {item.subItems?.map((sub) => {
                          const isSubActive = currentTab === sub.id || (sub.targetTab && currentTab === sub.targetTab && !sub.subId);
                          return (
                            <button
                              key={sub.id}
                              onClick={() => handleNavClick(sub.targetTab || sub.id, sub.subId)}
                              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                                isSubActive
                                  ? "bg-amber-100 text-amber-950 font-bold"
                                  : "text-slate-700 hover:bg-amber-50 hover:text-amber-900"
                              }`}
                            >
                              <span>{sub.label}</span>
                              {sub.badge && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800">
                                  {sub.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wishlist Button */}
          <button
            onClick={() => {
              playCardClickSound();
              onOpenWishlist();
            }}
            className="relative p-2 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Sacred Wishlist"
            aria-label="View sacred wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => {
              playCardClickSound();
              onOpenCart();
            }}
            className="relative p-2 rounded-lg text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
            title="Cart"
            aria-label="View shopping cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Notification Button */}
          <button
            onClick={() => {
              playCardClickSound();
              onOpenNotifications();
            }}
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth */}
          {isGuest ? (
            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={() => {
                  playCardClickSound();
                  onOpenLogin();
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  playCardClickSound();
                  onOpenSignUp();
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick("dashboard")}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors text-xs font-semibold text-slate-800"
            >
              <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center font-bold text-[11px]">
                {userProfile.name?.[0]?.toUpperCase() || "U"}
              </div>
              <span className="hidden sm:inline max-w-[100px] truncate">{userProfile.name}</span>
            </button>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-8 space-y-3 max-h-[80vh] overflow-y-auto">
          {/* Home Link at Top (matching screenshot) */}
          <div className="pb-1 border-b border-slate-100">
            <button
              onClick={() => handleNavClick("home")}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                currentTab === "home" ? "bg-slate-900 text-white shadow-xs" : "bg-slate-50 text-slate-800 hover:bg-slate-100"
              }`}
            >
              <span>Home</span>
            </button>
          </div>

          {mainNavItems.map((item) => {
            const hasSub = item.subItems && item.subItems.length > 0;
            const active = isItemActive(item);

            return (
              <div key={item.id} className="space-y-1 pb-2 border-b border-slate-100 last:border-b-0">
                <button
                  onClick={() => handleNavClick(item.id, undefined, item.targetTab)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                    active ? "bg-slate-900 text-white shadow-xs" : "bg-slate-50 text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                      {item.badge}
                    </span>
                  )}
                </button>

                {hasSub && (
                  <div className="grid grid-cols-2 gap-1.5 pl-2 pt-1">
                    {item.subItems?.map((sub) => {
                      const isSubActive = currentTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => handleNavClick(sub.targetTab || sub.id, sub.subId)}
                          className={`text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors truncate ${
                            isSubActive
                              ? "bg-amber-100 text-amber-950 font-bold"
                              : "text-slate-600 hover:bg-amber-50 hover:text-amber-900"
                          }`}
                        >
                          {sub.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
};
