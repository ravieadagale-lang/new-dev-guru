import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";
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
  dreams: "Dream Interpretation",
  mantras: "Mantras & Sacred Sound",
  images: "Sacred Gallery & Yantras",
  milestones: "Spiritual Milestones & Badges",
  blog: "Articles & Wisdom Blog",
  marketplace: "Sacred Marketplace",
  consultation: "Live Consultation",
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
  referrals: "Referral & Rewards"
};

export default function App() {
  const { user, userProfile: authProfile, updateUserProfileData } = useSuperAdminAuth();
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [navHistory, setNavHistory] = useState<Array<{ tab: string; metadata?: any }>>([
    { tab: "home" }
  ]);
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
    } else if (["birth_chart", "kundli", "vargas", "shadbala", "tajika", "dashas", "reports", "yogas", "doshas", "transits", "btr", "divisional_charts", "bnn", "lalkitab", "jaimini", "prashna", "kp", "matchmaking"].includes(tabId)) {
      resolvedTab = "astrology";
      setAstrologyInitialSubSection(tabId);
    } else if (tabId === "astrology") {
      resolvedTab = "astrology";
      if (metaObj.subId) {
        setAstrologyInitialSubSection(metaObj.subId);
      }
    } else if (["best_time", "my_day"].includes(tabId)) {
      resolvedTab = "panchang";
    } else if (tabId === "vastu") {
      resolvedTab = "vastu_fengshui";
    } else if (["baby_name", "baby"].includes(tabId)) {
      resolvedTab = "baby_names";
    } else if (["face", "face_reading"].includes(tabId)) {
      resolvedTab = "face_reading";
    } else if (["dream", "dreams"].includes(tabId)) {
      resolvedTab = "dreams";
    } else if (["gallery", "images"].includes(tabId)) {
      resolvedTab = "images";
    }

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

  // Modal & Drawer States
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "signup" | "forgot">("login");
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
              {(() => {
                const prevEntry = navHistory.length > 1 ? navHistory[navHistory.length - 2] : null;
                const prevLabel = prevEntry ? (TAB_LABELS[prevEntry.tab] || prevEntry.tab) : "Previous Page";
                return (
                  <button
                    onClick={handleGoBack}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-400 text-xs font-semibold text-slate-800 hover:text-amber-950 shadow-xs transition-all cursor-pointer group"
                    title={`Go back to ${prevLabel}`}
                    aria-label={`Go back to ${prevLabel}`}
                  >
                    <ArrowLeft className="w-4 h-4 text-amber-700 group-hover:-translate-x-1 transition-transform" />
                    <span>Back</span>
                    <span className="hidden sm:inline text-slate-400 font-normal">
                      to {prevLabel}
                    </span>
                  </button>
                );
              })()}

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

            {/* 7. Kundli & Astrological Compatibility */}
            {currentTab === "compatibility" && (
              <CompatibilityView
                userProfile={userProfile}
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
            )}

            {/* 8. Sacred Marketplace */}
            {currentTab === "marketplace" && (
              <MarketplaceView
                onAddToCart={handleAddToCart}
                userProfile={userProfile}
                onNavigateTab={handleNavigateTab}
                wishlistItems={wishlistItems}
                onToggleWishlist={handleToggleWishlist}
              />
            )}

            {/* 9. Live 1-on-1 Consultation */}
            {currentTab === "consultation" && (
              <ConsultationView
                userProfile={userProfile}
                onOpenAuthModal={() => {
                  setAuthModalMode("login");
                  setIsAuthModalOpen(true);
                }}
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

            {currentTab === "crm" && <CrmDashboard />}

            {currentTab === "admin" && <AdminDashboard />}

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
          </motion.div>
        </AnimatePresence>
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
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onSelectTab={handleNavigateTab}
        onAuthSuccess={(role, targetTab, actionType, userName, email) => {
          // Explicitly force navigation to 'home' tab for all authenticated CUSTOMER users, overriding any dashboard or profile redirection
          if (role === "SUPER_ADMIN" || role === "ADMIN") {
            handleNavigateTab("admin");
          } else {
            handleNavigateTab("home");
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
