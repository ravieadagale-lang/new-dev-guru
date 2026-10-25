import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronRight, Home, Clock } from "lucide-react";
import { UserRole, UserProfile, Product, LanguageCode, AppTheme } from "./types";
import { useSuperAdminAuth } from "./services/auth/SuperAdminAuthContext";
import { playCardClickSound } from "./utils/audioEffects";

// Navigation & Layout Components
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// Main Feature Views
import { PublicHome } from "./features/PublicHome";
import { AstrologyView } from "./features/AstrologyView";
import { NumerologyView } from "./features/NumerologyView";
import { TarotView } from "./features/TarotView";
import { VastuFengShuiView } from "./features/VastuFengShuiView";
import { FaceReader } from "./features/FaceReader";
import { CompatibilityView } from "./features/CompatibilityView";
import { MarketplaceView } from "./features/MarketplaceView";
import { ConsultationView } from "./features/ConsultationView";
import { PanchangMuhuratView } from "./features/PanchangMuhuratView";
import { FestivalsAndVratView } from "./features/FestivalsAndVratView";
import { MantraMusicLibraryView } from "./features/MantraMusicLibraryView";
import { DreamInterpretationView } from "./features/DreamInterpretationView";
import { ReferralProgramView } from "./features/ReferralProgramView";
import { BlogView } from "./features/BlogView";
import { CustomerDashboard } from "./features/CustomerDashboard";
import { CrmDashboard } from "./features/CrmDashboard";
import { AdminDashboard } from "./features/AdminDashboard";
import { ChineseAstrologyView } from "./features/ChineseAstrologyView";
import { BabyNameView } from "./features/BabyNameView";
import { DailyHoroscope } from "./components/DailyHoroscope";
import { PalmReader } from "./features/PalmReader";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Dedicated About & Legal Support Views
import { AboutUsView } from "./features/AboutUsView";
import { PrivacyPolicyView } from "./features/PrivacyPolicyView";
import { TermsConditionsView } from "./features/TermsConditionsView";
import { RefundPolicyView } from "./features/RefundPolicyView";
import { FaqView } from "./features/FaqView";
import { ContactUsView } from "./features/ContactUsView";
import { NotificationsView } from "./features/NotificationsView";

// Sacred Widgets & Drawers
import { SpiritualMilestonesBadgeWidget } from "./components/SpiritualMilestonesBadgeWidget";
import { SacredImagesGalleryView } from "./components/SacredImagesGalleryView";
import { CartDrawer } from "./components/CartDrawer";
import { WishlistDrawer } from "./components/WishlistDrawer";
import { WishlistToast, WishlistToastData } from "./components/WishlistToast";
import { GuidedOnboardingModal } from "./components/GuidedOnboardingModal";
import { NotificationCenterModal } from "./components/NotificationCenterModal";
import { UnifiedAuthModal } from "./components/auth/UnifiedAuthModal";
import { AuthNotificationPopup } from "./components/auth/AuthNotificationPopup";
import { INITIAL_NOTIFICATIONS } from "./data/notificationsData";
import { AppNotification, AdvancedNotificationPreferences } from "./types";
import { 
  loadNotificationPreferences, 
  saveNotificationPreferences, 
  filterNotificationsByPreferences 
} from "./services/notificationPreferencesService";

export const TAB_LABELS: Record<string, string> = {
  home: "Home",
  astrology: "Vedic Astrology",
  panchang: "Panchang & Muhurta",
  festivals_vrat: "Vrats & Hindu Festivals",
  festivals: "Vedic Festivals Calendar",
  vrat_guide: "Vrat & Fasting Guide",
  compatibility: "Kundli Milan & Compatibility",
  numerology: "Advanced Numerology Suite",
  tarot: "Sacred Tarot Sanctuary",
  chinese_astrology: "Chinese Astrology & BaZi",
  baby_names: "Baby Names & Janmakshar",
  vastu_fengshui: "Vastu Shastra & Feng Shui",
  face_reading: "Samudrika Face Reader",
  palm_reading: "Hastarekha Palmistry",
  palm: "Hastarekha Palmistry",
  palmistry: "Hastarekha Palmistry",
  dreams: "Dream Interpretation",
  mantras: "Mantras & Sacred Sound",
  images: "Sacred Gallery & Yantras",
  milestones: "Spiritual Milestones & Badges",
  blog: "Articles & Wisdom Blog",
  marketplace: "Sacred Marketplace (Under Testing)",
  consultation: "Live Consultation (Under Testing)",
  horoscope: "Daily Horoscope",
  dashboard: "Customer Dashboard",
  crm: "Astrologer CRM Portal",
  admin: "Admin Control Center",
  about: "About Dev-Guru",
  privacy: "Privacy Policy",
  terms: "Terms & Conditions",
  refund: "Refund Policy",
  faq: "Frequently Asked Questions",
  contact: "Contact Us",
  referrals: "Referral & Rewards",
  notifications: "Sacred Notifications Hub"
};

export const KNOWN_TABS = new Set([
  "home",
  "astrology",
  "chinese_astrology",
  "numerology",
  "tarot",
  "baby_names",
  "vastu_fengshui",
  "face_reading",
  "palm_reading",
  "palm",
  "palmistry",
  "compatibility",
  "marketplace",
  "consultation",
  "panchang",
  "festivals_vrat",
  "festivals",
  "vrat_guide",
  "mantras",
  "dreams",
  "images",
  "milestones",
  "referrals",
  "blog",
  "horoscope",
  "daily_horoscope",
  "dashboard",
  "crm",
  "admin",
  "about",
  "privacy",
  "terms",
  "refund",
  "faq",
  "contact",
  "notifications"
]);

const NotFoundFallbackView: React.FC<{
  currentTab: string;
  onReturnHome: () => void;
  onNavigateTab: (tab: string) => void;
}> = ({ currentTab, onReturnHome, onNavigateTab }) => {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6">
      <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 shadow-xs">
        <Home className="w-8 h-8 text-amber-600" />
      </div>
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full">
          Cosmic Navigation Recovery
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
          Page Not Found ({currentTab})
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
          The requested pathway is currently uncharted or has moved. Explore our core Vedic sanctuaries below or return safely to the home portal.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg mx-auto">
        <button
          onClick={() => onNavigateTab("home")}
          className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 text-xs font-bold text-slate-800 hover:text-amber-900 transition-all shadow-xs cursor-pointer"
        >
          ✦ Home Portal
        </button>
        <button
          onClick={() => onNavigateTab("astrology")}
          className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 text-xs font-bold text-slate-800 hover:text-amber-900 transition-all shadow-xs cursor-pointer"
        >
          ✦ Vedic Astrology
        </button>
        <button
          onClick={() => onNavigateTab("panchang")}
          className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 text-xs font-bold text-slate-800 hover:text-amber-900 transition-all shadow-xs cursor-pointer"
        >
          ✦ Panchang &amp; Muhurta
        </button>
        <button
          onClick={() => onNavigateTab("compatibility")}
          className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 text-xs font-bold text-slate-800 hover:text-amber-900 transition-all shadow-xs cursor-pointer"
        >
          ✦ Kundli Milan
        </button>
        <button
          onClick={() => onNavigateTab("consultation")}
          className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 text-xs font-bold text-slate-800 hover:text-amber-900 transition-all shadow-xs cursor-pointer"
        >
          ✦ Live Consultation
        </button>
        <button
          onClick={() => onNavigateTab("horoscope")}
          className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 text-xs font-bold text-slate-800 hover:text-amber-900 transition-all shadow-xs cursor-pointer"
        >
          ✦ Daily Horoscope
        </button>
      </div>

      <button
        onClick={onReturnHome}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
      >
        <Home className="w-4 h-4" />
        <span>Return to Home Sanctuary</span>
      </button>
    </div>
  );
};

const UnderTestingNotice: React.FC<{
  title: string;
  category: "Marketplace" | "Consultation";
  onReturnHome: () => void;
  onGoBack: () => void;
}> = ({ title, category, onReturnHome, onGoBack }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="bg-gradient-to-b from-[#1c1815] via-[#241e1a] to-[#16120f] border border-amber-500/30 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-500/30">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Under Testing and Not Available for Users
          </div>

          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Clock className="w-8 h-8 text-amber-400" />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100">
              {title}
            </h1>
            <p className="text-amber-300/80 text-sm font-medium">
              (Under Testing and Not Available for Users)
            </p>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Our {category} is currently undergoing internal quality testing, practitioner verification, and security audits. Live user access, bookings, and commercial transactions are temporarily disabled while our systems are prepared for official public release.
          </p>

          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/40 text-amber-200/90 text-xs sm:text-sm">
            ✦ All Vedic Astrology calculations, Kundli charts, Panchang, Muhurta, and Horoscopes remain fully active and free for all users.
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onGoBack}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-200 border border-slate-700 hover:border-amber-500/40 font-semibold text-xs transition-all shadow-md cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={onReturnHome}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const { user, userProfile: authProfile, updateUserProfileData } = useSuperAdminAuth();
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [navHistory, setNavHistory] = useState<Array<{ tab: string; metadata?: any }>>([
    { tab: "home" }
  ]);
  const [pendingPostAuthTab, setPendingPostAuthTab] = useState<{ tab: string; metadata?: any } | null>(null);
  const [astrologyInitialSubSection, setAstrologyInitialSubSection] = useState<string>("birth_chart");
  const [userRole, setUserRole] = useState<UserRole>("visitor");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>("en");
  const [appTheme, setAppTheme] = useState<AppTheme>("celestial_gold");
  const [selectedVratId, setSelectedVratId] = useState<string | null>(null);
  const [festivalsVratSubTab, setFestivalsVratSubTab] = useState<"festivals" | "vrats">("festivals");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [notificationPreferences, setNotificationPreferences] = useState<AdvancedNotificationPreferences>(
    loadNotificationPreferences
  );
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("devguru_app_notifications_v1") || localStorage.getItem("astronext_app_notifications_v1");
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_NOTIFICATIONS;
  });

  const handleUpdateNotificationPreferences = (prefs: AdvancedNotificationPreferences) => {
    setNotificationPreferences(prefs);
    saveNotificationPreferences(prefs);
  };

  const handleSaveNotifications = (updated: AppNotification[]) => {
    setNotifications(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("devguru_app_notifications_v1", JSON.stringify(updated));
        localStorage.setItem("astronext_app_notifications_v1", JSON.stringify(updated));
      } catch (e) {}
    }
  };

  const handleMarkAsRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    handleSaveNotifications(updated);
  };

  const handleMarkAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    handleSaveNotifications(updated);
  };

  const handleDeleteNotification = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    handleSaveNotifications(updated);
  };

  const handleClearAllNotifications = () => {
    handleSaveNotifications([]);
  };

  const visibleNotifications = useMemo(() => {
    return filterNotificationsByPreferences(notifications, notificationPreferences);
  }, [notifications, notificationPreferences]);

  const unreadNotificationCount = visibleNotifications.filter((n) => !n.isRead).length;

  const navigateToTabInternal = (
    tabId: string,
    metadata?: Record<string, any> | string,
    pushHistory: boolean = true
  ) => {
    const metaObj = typeof metadata === "string" ? { subId: metadata, subTab: metadata } : (metadata || {});
    if (metaObj.vratId) {
      setSelectedVratId(metaObj.vratId);
      setFestivalsVratSubTab("vrats");
    }
    if (metaObj.subTab === "vrats" || metaObj.subTab === "festivals") {
      setFestivalsVratSubTab(metaObj.subTab);
    }

    let resolvedTab = tabId;
    if (tabId === "festivals") {
      resolvedTab = "festivals_vrat";
      setFestivalsVratSubTab("festivals");
    } else if (tabId === "vrat_guide" || tabId === "vrats") {
      resolvedTab = "festivals_vrat";
      setFestivalsVratSubTab("vrats");
    } else if (tabId === "festivals_vrat") {
      resolvedTab = "festivals_vrat";
    } else if (tabId === "onboarding") {
      setIsOnboardingOpen(true);
      return;
    } else if (["overview", "root"].includes(tabId)) {
      resolvedTab = "home";
    } else if (["calendar", "best_time", "my_day", "muhurta", "muhurats", "choghadiya", "tithi"].includes(tabId)) {
      resolvedTab = "panchang";
    } else if (["remedies", "gemstones", "yantras"].includes(tabId)) {
      resolvedTab = "astrology";
      setAstrologyInitialSubSection("advanced_tools");
    } else if (["birth_chart", "kundli", "vargas", "shadbala", "ashtakavarga", "tajika", "dashas", "dasha", "reports", "yogas", "doshas", "transits", "btr", "divisional_charts", "bnn", "lalkitab", "lal_kitab", "jaimini", "prashna", "kp", "kp_system", "nakshatra", "planetary_analysis"].includes(tabId)) {
      resolvedTab = "astrology";
      setAstrologyInitialSubSection(tabId);
    } else if (tabId === "astrology") {
      resolvedTab = "astrology";
      if (metaObj.subId) {
        setAstrologyInitialSubSection(metaObj.subId);
      }
    } else if (["palm", "palm_reading", "palmistry", "hastarekha"].includes(tabId)) {
      resolvedTab = "palm_reading";
    } else if (["matchmaking", "milan", "guna_milan"].includes(tabId)) {
      resolvedTab = "compatibility";
    } else if (["crm", "practitioner_workspace", "client_profiles", "astrologer_crm"].includes(tabId)) {
      resolvedTab = "crm";
    } else if (["admin", "admin_control_center", "rule_debugger", "super_admin"].includes(tabId)) {
      resolvedTab = "admin";
    } else if (["daily_horoscope", "horoscope", "rashifal"].includes(tabId)) {
      resolvedTab = "horoscope";
    } else if (["vastu", "fengshui", "vastu_shastra"].includes(tabId)) {
      resolvedTab = "vastu_fengshui";
    } else if (["baby_name", "baby", "janmakshar"].includes(tabId)) {
      resolvedTab = "baby_names";
    } else if (["face", "face_reading", "samudrika"].includes(tabId)) {
      resolvedTab = "face_reading";
    } else if (["dream", "dreams", "swapna"].includes(tabId)) {
      resolvedTab = "dreams";
    } else if (["gallery", "images", "sacred_gallery"].includes(tabId)) {
      resolvedTab = "images";
    } else if (["mantra", "mantras", "chants", "sound"].includes(tabId)) {
      resolvedTab = "mantras";
    } else if (["shop", "store", "marketplace", "products"].includes(tabId)) {
      resolvedTab = "marketplace";
    } else if (["consult", "consultation", "booking", "astrologers"].includes(tabId)) {
      resolvedTab = "consultation";
    } else if (["profile", "account", "dashboard"].includes(tabId)) {
      resolvedTab = "dashboard";
    } else if (tabId === "notifications") {
      resolvedTab = "notifications";
    } else if (!KNOWN_TABS.has(tabId)) {
      // If still unrecognized, check lowercase
      const lower = tabId.toLowerCase();
      if (KNOWN_TABS.has(lower)) {
        resolvedTab = lower;
      }
    }

    // Consultation is temporarily under testing and not available for users — allow direct viewing of the notice

    setCurrentTab(resolvedTab);

    if (pushHistory) {
      setNavHistory((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.tab === resolvedTab && last.metadata?.subId === metaObj.subId) {
          return prev;
        }
        return [...prev, { tab: resolvedTab, metadata: metaObj }];
      });
      if (typeof window !== "undefined" && window.history) {
        try {
          window.history.pushState({ tab: resolvedTab, metadata: metaObj }, "");
        } catch {}
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateTab = (tabId: string, metadata?: Record<string, any> | string) => {
    navigateToTabInternal(tabId, metadata, true);
  };

  const handleGoBack = () => {
    playCardClickSound();
    if (navHistory.length > 1) {
      const updatedHistory = [...navHistory];
      updatedHistory.pop(); // remove current page
      const previous = updatedHistory[updatedHistory.length - 1];
      setNavHistory(updatedHistory);
      if (previous) {
        navigateToTabInternal(previous.tab, previous.metadata, false);
      } else {
        navigateToTabInternal("home", undefined, false);
      }
    } else {
      // If internal history has 1 or fewer items, fall back to browser history back or home
      if (typeof window !== "undefined" && window.history && window.history.length > 1) {
        window.history.back();
      } else {
        navigateToTabInternal("home", undefined, false);
      }
    }
  };

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.tab) {
        navigateToTabInternal(e.state.tab, e.state.metadata, false);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Canonical clean profile representation for unauthenticated guests
  const INITIAL_GUEST_PROFILE: UserProfile = {
    id: "guest",
    name: "Guest Seeker",
    email: "",
    role: "visitor" as any,
    dob: "",
    time: "",
    place: "",
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: "Asia/Kolkata",
    rashi: "",
    nakshatra: "",
    nakshatraPada: 0,
    lagna: "",
    sunSign: "",
    gender: "other",
    walletBalance: 0,
    spiritualPoints: 0,
    referralCode: "",
    totalReferralsCount: 0,
    totalPointsEarned: 0,
  };

  // Primary User Profile State with local storage persistence
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem("devguru_active_user_profile") || localStorage.getItem("astronext_active_user_profile");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Discard any obsolete demo customer records like Aarav Sharma or aarav.s@gmail.com or usr-001
        if (
          parsed &&
          parsed.id &&
          parsed.id !== "usr-001" &&
          parsed.id !== "guest" &&
          parsed.email !== "aarav.s@gmail.com" &&
          parsed.name !== "Aarav Sharma"
        ) {
          return parsed;
        }
      }
    } catch {
      // fallback to initial clean guest profile
    }
    return INITIAL_GUEST_PROFILE;
  });

  const handleUpdateProfile = async (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    try {
      localStorage.setItem("devguru_active_user_profile", JSON.stringify(newProfile));
      localStorage.setItem("astronext_active_user_profile", JSON.stringify(newProfile));
    } catch {
      // ignore
    }

    // Persist authenticated customer profile changes to Firestore users/{uid}
    if (user && updateUserProfileData) {
      try {
        await updateUserProfileData({
          displayName: newProfile.name,
          phoneNumber: newProfile.phone,
          birthDetails: {
            date: newProfile.dob || undefined,
            time: newProfile.time || undefined,
            placeName: newProfile.place || undefined,
            latitude: typeof newProfile.latitude === "number" && !isNaN(newProfile.latitude) ? newProfile.latitude : undefined,
            longitude: typeof newProfile.longitude === "number" && !isNaN(newProfile.longitude) ? newProfile.longitude : undefined,
            timezone: newProfile.timezone || undefined,
          },
        });
      } catch (err) {
        console.warn("[App] Error persisting profile update to Firestore:", err);
      }
    }
  };

  // Synchronize authenticated user profile from Firebase Auth and Firestore
  useEffect(() => {
    if (user) {
      setUserProfile((prev) => {
        const realName = user.displayName || authProfile?.displayName || user.email?.split("@")[0] || "Seeker";
        const realEmail = user.email || authProfile?.email || "";
        const role = (authProfile?.role?.toLowerCase() as any) || "customer";
        const birth = authProfile?.birthDetails;

        return {
          ...prev,
          id: user.uid,
          name: realName,
          email: realEmail,
          role,
          phone: authProfile?.phoneNumber || undefined,
          photoURL: authProfile?.photoURL || user.photoURL || undefined,
          // Real birth details from Firestore, strictly empty if not provided
          dob: birth?.date || "",
          time: birth?.time || "",
          place: birth?.placeName || "",
          latitude: typeof birth?.latitude === "number" ? birth.latitude : (undefined as any),
          longitude: typeof birth?.longitude === "number" ? birth.longitude : (undefined as any),
          timezone: birth?.timezone || "",
          // Never invent or fallback to fake astrology data
          lagna: "",
          rashi: "",
          nakshatra: "",
          nakshatraPada: 0,
          sunSign: "",
          walletBalance: 0,
          spiritualPoints: (authProfile as any)?.spiritualPoints ?? 0,
          referralCode: "",
          totalReferralsCount: 0,
          totalPointsEarned: 0,
        };
      });
    } else {
      setUserProfile(INITIAL_GUEST_PROFILE);
    }
  }, [user, authProfile]);

  // Auto-redirect to pending tab (such as 'consultation') once user authenticates
  useEffect(() => {
    if (user?.email && pendingPostAuthTab) {
      const dest = pendingPostAuthTab;
      setPendingPostAuthTab(null);
      navigateToTabInternal(dest.tab, dest.metadata, true);
    }
  }, [user?.email]);

  // Modal & Drawer States
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "signup" | "forgot" | "resetPassword">("login");
  const [resetActionCode, setResetActionCode] = useState<string | null>(null);

  // Check for Firebase Auth Action URL parameters (e.g., resetPassword link: ?mode=resetPassword&oobCode=XYZ)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const actionParam = urlParams.get("mode");
      const codeParam = urlParams.get("oobCode");
      if (actionParam === "resetPassword" && codeParam) {
        setResetActionCode(codeParam);
        setAuthModalMode("resetPassword");
        setIsAuthModalOpen(true);
      }
    } catch {}
  }, []);

  const [authPopup, setAuthPopup] = useState<{
    isOpen: boolean;
    type: "signup" | "login";
    userName: string;
    email: string;
  } | null>(null);

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [wishlistToasts, setWishlistToasts] = useState<WishlistToastData[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      const uniqueId = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      if (exists) {
        const removeToast: WishlistToastData = {
          id: uniqueId,
          product,
          action: "removed",
        };
        setWishlistToasts((t) => [...t, removeToast]);
        return prev.filter((item) => item.id !== product.id);
      } else {
        const addToast: WishlistToastData = {
          id: uniqueId,
          product,
          action: "added",
        };
        setWishlistToasts((t) => [...t, addToast]);
        return [...prev, product];
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans flex flex-col antialiased selection:bg-amber-200 selection:text-amber-950">
      {/* Both Header Menu Bars (Primary + Sticky Secondary) */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleNavigateTab}
        userRole={userRole}
        onRoleChange={setUserRole}
        userProfile={userProfile}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlistItems.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        notificationCount={unreadNotificationCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        appTheme={appTheme}
        onThemeChange={setAppTheme}
        onOpenLogin={() => {
          setAuthModalMode("login");
          setIsAuthModalOpen(true);
        }}
        onOpenSignUp={() => {
          setAuthModalMode("signup");
          setIsAuthModalOpen(true);
        }}
      />

      {/* Universal Top Back Navigation & Breadcrumbs Bar (Shown on all pages except home) */}
      {currentTab !== "home" && (
        <div className="bg-[#FAF8F5]/95 border-b border-[#E7E2D9] backdrop-blur-xs sticky top-16 z-30 shadow-xs">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-2.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleGoBack}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-400 text-xs font-semibold text-slate-800 hover:text-amber-950 shadow-xs transition-all cursor-pointer group"
                title="Go to previous page"
                aria-label="Go to previous page"
              >
                <ArrowLeft className="w-4 h-4 text-amber-700 group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
              </button>

              {/* Breadcrumb Trail */}
              <nav className="hidden md:flex items-center gap-1.5 text-xs text-slate-500">
                <button
                  onClick={() => handleNavigateTab("home")}
                  className="hover:text-amber-800 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-slate-900 bg-amber-500/10 text-amber-950 px-2 py-0.5 rounded-md">
                  {TAB_LABELS[currentTab] || currentTab}
                </span>
              </nav>
            </div>

            {/* Quick Home Jump Shortcut */}
            <button
              onClick={() => handleNavigateTab("home")}
              className="text-xs text-slate-500 hover:text-amber-800 transition-colors flex items-center gap-1.5 font-medium cursor-pointer px-2.5 py-1 rounded-lg hover:bg-slate-100/70"
            >
              <Home className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Return to Home</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Canvas Routing Container */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
        <ErrorBoundary
          fallbackTitle="Dev-Guru Sacred Sanctuary Recovery"
          fallbackMessage="An unexpected issue occurred while rendering this view. You can return to the home sanctuary safely without losing your session."
          onReset={() => handleNavigateTab("home")}
        >
          <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {/* 1. Public Home */}
            {currentTab === "home" && (
              <PublicHome
                onSelectTab={handleNavigateTab}
                userProfile={userProfile}
                onUpdateProfile={handleUpdateProfile}
                onAddToCart={handleAddToCart}
                wishlistItems={wishlistItems}
                onToggleWishlist={handleToggleWishlist}
              />
            )}

            {/* 2. Vedic Astrology Complete Engine */}
            {currentTab === "astrology" && (
              <AstrologyView
                userProfile={userProfile}
                onUpdateProfile={handleUpdateProfile}
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                initialSubSection={astrologyInitialSubSection as any}
              />
            )}

            {/* Chinese Astrology & BaZi Pillars */}
            {currentTab === "chinese_astrology" && (
              <ChineseAstrologyView
                selectedLanguage={selectedLanguage}
                onNavigateTab={handleNavigateTab}
              />
            )}

            {/* 3. Advanced Numerology Suite */}
            {currentTab === "numerology" && (
              <NumerologyView
                userProfile={userProfile}
                onUpdateProfile={handleUpdateProfile}
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
            )}

            {/* 4. Complete Tarot Reading Sanctuary */}
            {currentTab === "tarot" && (
              <TarotView
                selectedLanguage={selectedLanguage}
                onNavigateTab={handleNavigateTab}
              />
            )}

            {/* Baby Name Suggestion & Janmakshar */}
            {currentTab === "baby_names" && (
              <BabyNameView
                selectedLanguage={selectedLanguage}
                onNavigateTab={handleNavigateTab}
              />
            )}

            {/* 5. Vastu Shastra & Feng Shui OS */}
            {currentTab === "vastu_fengshui" && (
              <VastuFengShuiView
                userProfile={userProfile}
                selectedLanguage={selectedLanguage}
                onNavigateTab={handleNavigateTab}
              />
            )}

            {/* 6. Chinese & Samudrika Face Reader */}
            {currentTab === "face_reading" && (
              <FaceReader
                selectedLanguage={selectedLanguage}
                onNavigateTab={handleNavigateTab}
              />
            )}

            {/* Hastarekha & Palmistry Sanctuary */}
            {(currentTab === "palm_reading" || currentTab === "palm" || currentTab === "palmistry") && (
              <PalmReader
                selectedLanguage={selectedLanguage}
                onNavigateTab={handleNavigateTab}
              />
            )}

            {/* 7. Kundli & Astrological Compatibility */}
            {currentTab === "compatibility" && (
              <CompatibilityView
                userProfile={userProfile}
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
            )}

            {/* 8. Sacred Marketplace (Under Testing and Not Available for Users) */}
            {currentTab === "marketplace" && (
              <UnderTestingNotice
                title="Sacred Spiritual Marketplace"
                category="Marketplace"
                onGoBack={handleGoBack}
                onReturnHome={() => handleNavigateTab("home")}
              />
            )}

            {/* 9. Live 1-on-1 Consultation (Under Testing and Not Available for Users) */}
            {currentTab === "consultation" && (
              <UnderTestingNotice
                title="Live 1-on-1 Astrological Consultation"
                category="Consultation"
                onGoBack={handleGoBack}
                onReturnHome={() => handleNavigateTab("home")}
              />
            )}

            {/* 10. Panchang & Muhurat Comprehensive */}
            {currentTab === "panchang" && (
              <PanchangMuhuratView
                userProfile={userProfile}
                onUpdateProfile={handleUpdateProfile}
              />
            )}

            {/* 10b. Vedic Festivals & Vrats (Unified Single Tab with Sub-Tabs) */}
            {(currentTab === "festivals_vrat" || currentTab === "festivals" || currentTab === "vrat_guide") && (
              <FestivalsAndVratView
                userProfile={userProfile}
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                initialSelectedVratId={selectedVratId}
                initialSubTab={festivalsVratSubTab}
                onBackToHome={() => handleNavigateTab("home")}
                onNavigateToTab={handleNavigateTab}
              />
            )}

            {/* 11. Sacred Mantras, Audio Visualizer & Rituals */}
            {currentTab === "mantras" && (
              <MantraMusicLibraryView userProfile={userProfile} />
            )}

            {/* 13. Sacred Dreams Interpretation Dictionary */}
            {currentTab === "dreams" && (
              <DreamInterpretationView
                selectedLanguage={selectedLanguage}
                onNavigateTab={handleNavigateTab}
              />
            )}

            {/* 13. Sacred Images & Yantras Gallery */}
            {currentTab === "images" && <SacredImagesGalleryView />}

            {/* 14. Spiritual Milestones & Badges */}
            {currentTab === "milestones" && (
              <SpiritualMilestonesBadgeWidget
                userProfile={userProfile}
                onNavigateTab={handleNavigateTab}
              />
            )}

            {/* 15. Refer & Earn Spiritual Points Program */}
            {currentTab === "referrals" && (
              <ReferralProgramView
                userProfile={userProfile}
                onUpdateProfile={setUserProfile}
                onNavigateTab={handleNavigateTab}
              />
            )}

            {/* 16. Astrological Articles & Blog */}
            {currentTab === "blog" && (
              <BlogView onNavigateTab={handleNavigateTab} />
            )}

            {/* Dedicated Daily Horoscope View */}
            {(currentTab === "horoscope" || currentTab === "daily_horoscope") && (
              <DailyHoroscope
                userProfile={userProfile}
                onSelectTab={handleNavigateTab}
                onUpdateProfile={handleUpdateProfile}
              />
            )}

            {/* 17. Role-Based Portals */}
            {currentTab === "dashboard" && (
              <CustomerDashboard
                userProfile={userProfile}
                onUpdateProfile={handleUpdateProfile}
                onSelectTab={(tab) => {
                  if (tab === "onboarding") setIsOnboardingOpen(true);
                  else handleNavigateTab(tab);
                }}
              />
            )}

            {currentTab === "crm" && <CrmDashboard onNavigateTab={handleNavigateTab} />}

            {currentTab === "admin" && <AdminDashboard onSelectTab={handleNavigateTab} />}

            {/* 18. About Us */}
            {currentTab === "about" && (
              <AboutUsView onNavigateTab={handleNavigateTab} />
            )}

            {/* 19. Privacy Policy */}
            {currentTab === "privacy" && (
              <PrivacyPolicyView onNavigateTab={handleNavigateTab} />
            )}

            {/* 20. Terms of Service & Conditions */}
            {currentTab === "terms" && (
              <TermsConditionsView onNavigateTab={handleNavigateTab} />
            )}

            {/* 21. Refund & Cancellation Policy */}
            {currentTab === "refund" && (
              <RefundPolicyView onNavigateTab={handleNavigateTab} />
            )}

            {/* 22. Frequently Asked Questions */}
            {currentTab === "faq" && (
              <FaqView onNavigateTab={handleNavigateTab} />
            )}

            {/* 23. Contact Us */}
            {currentTab === "contact" && (
              <ContactUsView onNavigateTab={handleNavigateTab} />
            )}

            {/* 24. Sacred Notifications & Alerts Hub */}
            {currentTab === "notifications" && (
              <NotificationsView
                notifications={notifications}
                preferences={notificationPreferences}
                onUpdatePreferences={handleUpdateNotificationPreferences}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onDeleteNotification={handleDeleteNotification}
                onClearAllNotifications={handleClearAllNotifications}
                onAddNotification={(newNotif) => handleSaveNotifications([newNotif, ...notifications])}
                onNavigateTab={handleNavigateTab}
                userProfile={userProfile}
              />
            )}

            {/* Fallback View: Guarantees that an unrecognized tab NEVER yields a blank page */}
            {!KNOWN_TABS.has(currentTab) && (
              <NotFoundFallbackView
                currentTab={currentTab}
                onReturnHome={() => handleNavigateTab("home")}
                onNavigateTab={handleNavigateTab}
              />
            )}
          </motion.div>
        </AnimatePresence>
        </ErrorBoundary>
      </main>

      {/* Complete Footer */}
      <Footer
        onSelectTab={(tab) => {
          if (tab === "onboarding") setIsOnboardingOpen(true);
          else {
            handleNavigateTab(tab);
          }
        }}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCartItems([])}
        userProfile={userProfile}
      />

      {/* Saved Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveItem={(id) =>
          setWishlistItems((prev) => prev.filter((p) => p.id !== id))
        }
        onAddToCart={(prod) => {
          handleAddToCart(prod);
          setWishlistItems((prev) => prev.filter((p) => p.id !== prod.id));
        }}
        onClearWishlist={() => setWishlistItems([])}
      />

      {/* Floating Wishlist Alert Toasts */}
      <WishlistToast
        toasts={wishlistToasts}
        onDismiss={(id) =>
          setWishlistToasts((prev) => prev.filter((t) => t.id !== id))
        }
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Cosmic Guided Onboarding Modal */}
      <GuidedOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        userProfile={userProfile}
        onSaveProfile={handleUpdateProfile}
        onNavigateToDashboard={() => setCurrentTab("dashboard")}
      />

      {/* Universal Categorized Notification Center with Advanced Strategy & Filtering (Transits, Vratas, Panchang, Purchases, Sadhana) */}
      <NotificationCenterModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDeleteNotification={handleDeleteNotification}
        onClearAllNotifications={handleClearAllNotifications}
        onAddNotification={(newNotif) => handleSaveNotifications([newNotif, ...notifications])}
        preferences={notificationPreferences}
        onUpdatePreferences={handleUpdateNotificationPreferences}
        userProfile={userProfile}
        onNavigateToTab={handleNavigateTab}
      />

      {/* Unified Authentication Modal (LOGIN & SIGN UP) */}
      <UnifiedAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setPendingPostAuthTab(null);
          setResetActionCode(null);
        }}
        initialMode={authModalMode}
        resetActionCode={resetActionCode}
        onResetComplete={() => setResetActionCode(null)}
        targetTab={pendingPostAuthTab?.tab}
        customSubtitle={
          pendingPostAuthTab?.tab === "consultation"
            ? "Sign in or create an account to book your 1-on-1 private consultation"
            : undefined
        }
        onSelectTab={(tab) => {
          if (!pendingPostAuthTab) {
            handleNavigateTab(tab);
          }
        }}
        onAuthSuccess={(role, targetTab, actionType, userName, email) => {
          if (role === "SUPER_ADMIN" || role === "ADMIN") {
            handleNavigateTab("admin");
          } else if (pendingPostAuthTab) {
            const dest = pendingPostAuthTab;
            setPendingPostAuthTab(null);
            handleNavigateTab(dest.tab, dest.metadata);
          } else {
            handleNavigateTab(targetTab || "home");
          }

          // Trigger celebratory popup message on new user signup or user login
          if (actionType) {
            setAuthPopup({
              isOpen: true,
              type: actionType,
              userName: userName || userProfile.name || "Seeker",
              email: email || userProfile.email || "",
            });
          }
        }}
      />

      {/* Celebratory Authentication Popup Message on Signup / Login */}
      {authPopup && (
        <AuthNotificationPopup
          isOpen={authPopup.isOpen}
          type={authPopup.type}
          userName={authPopup.userName}
          email={authPopup.email}
          onClose={() => setAuthPopup(null)}
          onExplore={() => {
            handleNavigateTab("home");
          }}
        />
      )}
    </div>
  );
}
