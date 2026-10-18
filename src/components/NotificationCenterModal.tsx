import React, { useState, useMemo, useEffect } from "react";
import { 
  AppNotification, 
  NotificationCategory, 
  AdvancedNotificationPreferences, 
  UserProfile 
} from "../types";
import {
  Bell,
  X,
  CheckCheck,
  Trash2,
  Layers,
  ShoppingBag,
  Flame,
  Clock,
  Sparkles,
  ExternalLink,
  Filter,
  Volume2,
  VolumeX,
  CheckCircle2,
  Sliders,
  Sun,
  Moon,
  ShieldAlert,
  Calendar,
  Zap,
  RotateCcw,
  Check,
  Award,
  ChevronRight,
  Compass,
  AlertTriangle,
  Search,
  CheckSquare,
  Square,
  HelpCircle,
  Bookmark,
  Share2,
  Eye,
  Info
} from "lucide-react";
import { playCardHoverSound, playCardFlipSound, playSingingBowlChime } from "../utils/audioEffects";
import { 
  filterNotificationsByPreferences, 
  DEFAULT_NOTIFICATION_PREFERENCES,
  SACRED_VRATS_LIST,
  SacredVratDefinition,
  DEFAULT_SELECTED_VRAT_IDS,
  generateDynamicVratNotifications
} from "../services/notificationPreferencesService";
import {
  isNotificationSupported,
  getNotificationPermission,
  requestNotificationPermission,
  sendBrowserVratNotification
} from "../utils/vratNotificationEngine";

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tabId: string, metadata?: Record<string, any>) => void;
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onClearAllNotifications: () => void;
  onAddNotification?: (notif: AppNotification) => void;
  preferences: AdvancedNotificationPreferences;
  onUpdatePreferences: (prefs: AdvancedNotificationPreferences) => void;
  userProfile?: UserProfile;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onClearAllNotifications,
  onAddNotification,
  preferences,
  onUpdatePreferences,
  userProfile
}) => {
  const [activeTab, setActiveTab] = useState<"feed" | "select_vrats" | "select_transits" | "preferences">("feed");
  const [selectedCategory, setSelectedCategory] = useState<"all" | NotificationCategory>("all");
  const [vratSearchQuery, setVratSearchQuery] = useState<string>("");
  const [vratCategoryFilter, setVratCategoryFilter] = useState<string>("all");
  const [feedSearchQuery, setFeedSearchQuery] = useState<string>("");
  const [ruleSimulationMode, setRuleSimulationMode] = useState<"realtime" | "day_before" | "day_of_morning" | "day_of_afternoon">("realtime");
  const [testAlertSentMessage, setTestAlertSentMessage] = useState<string | null>(null);
  const [browserPermission, setBrowserPermission] = useState<NotificationPermission>("default");

  // Synchronize browser permission status on mount
  useEffect(() => {
    if (typeof window !== "undefined" && isNotificationSupported()) {
      setBrowserPermission(getNotificationPermission());
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Combined notifications: user notifications merged with dynamic Vrat notifications for selected vrats
  const combinedNotifications = useMemo(() => {
    const selectedVrats = preferences.vratas?.selectedVratIds || DEFAULT_SELECTED_VRAT_IDS;
    const dynamicVrats = generateDynamicVratNotifications(selectedVrats, ruleSimulationMode);
    
    // Deduplicate against existing IDs
    const existingIds = new Set(notifications.map((n) => n.id));
    const uniqueDynamic = dynamicVrats.filter((n) => !existingIds.has(n.id));

    return [...uniqueDynamic, ...notifications];
  }, [notifications, preferences.vratas?.selectedVratIds, ruleSimulationMode]);

  // Filter notifications according to active user preferences and current time rule
  const visibleNotifications = useMemo(() => {
    const hourOverride = ruleSimulationMode === "day_of_morning" ? 9 : ruleSimulationMode === "day_of_afternoon" ? 16 : undefined;
    return filterNotificationsByPreferences(combinedNotifications, preferences, {
      currentHourOverride: hourOverride,
      allowAllVratRules: ruleSimulationMode === "realtime" ? false : true
    });
  }, [combinedNotifications, preferences, ruleSimulationMode]);

  // Further filter by selected category pill & search query
  const categoryFilteredNotifications = useMemo(() => {
    let result = visibleNotifications;
    if (selectedCategory !== "all") {
      result = result.filter((n) => n.category === selectedCategory);
    }
    if (feedSearchQuery.trim()) {
      const q = feedSearchQuery.toLowerCase();
      result = result.filter((n) => 
        n.title.toLowerCase().includes(q) ||
        n.message.toLowerCase().includes(q) ||
        (n.remedy && n.remedy.toLowerCase().includes(q)) ||
        (n.badgeLabel && n.badgeLabel.toLowerCase().includes(q))
      );
    }
    return result;
  }, [visibleNotifications, selectedCategory, feedSearchQuery]);

  const categoryCounts = useMemo(() => {
    const counts = {
      all: visibleNotifications.length,
      transit: visibleNotifications.filter((n) => n.category === "transit").length,
      vratas: visibleNotifications.filter((n) => n.category === "vratas").length,
      panchang: visibleNotifications.filter((n) => n.category === "panchang").length,
      purchase: visibleNotifications.filter((n) => n.category === "purchase").length,
      sadhana: visibleNotifications.filter((n) => n.category === "sadhana").length,
    };
    const unreadCounts = {
      all: visibleNotifications.filter((n) => !n.isRead).length,
      transit: visibleNotifications.filter((n) => n.category === "transit" && !n.isRead).length,
      vratas: visibleNotifications.filter((n) => n.category === "vratas" && !n.isRead).length,
      panchang: visibleNotifications.filter((n) => n.category === "panchang" && !n.isRead).length,
      purchase: visibleNotifications.filter((n) => n.category === "purchase" && !n.isRead).length,
      sadhana: visibleNotifications.filter((n) => n.category === "sadhana" && !n.isRead).length,
    };
    return { counts, unreadCounts };
  }, [visibleNotifications]);

  const selectedVratsList = preferences.vratas?.selectedVratIds || DEFAULT_SELECTED_VRAT_IDS;

  const filteredSacredVrats = useMemo(() => {
    return SACRED_VRATS_LIST.filter((vrat) => {
      if (vratCategoryFilter !== "all" && vrat.category !== vratCategoryFilter) {
        return false;
      }
      if (vratSearchQuery.trim()) {
        const q = vratSearchQuery.toLowerCase();
        return (
          vrat.name.toLowerCase().includes(q) ||
          vrat.hindiName.toLowerCase().includes(q) ||
          vrat.deity.toLowerCase().includes(q) ||
          vrat.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [vratCategoryFilter, vratSearchQuery]);

  const handleActionClick = (notification: AppNotification) => {
    if (preferences.soundEnabled) playCardFlipSound();
    onMarkAsRead(notification.id);
    if (notification.actionTab) {
      onNavigateToTab(notification.actionTab, notification.metadata);
      onClose();
    }
  };

  const toggleSound = () => {
    const updated = { ...preferences, soundEnabled: !preferences.soundEnabled };
    onUpdatePreferences(updated);
    if (updated.soundEnabled) playSingingBowlChime();
  };

  const handleToggleVrat = (vratId: string) => {
    const current = preferences.vratas?.selectedVratIds || DEFAULT_SELECTED_VRAT_IDS;
    let next: string[];
    if (current.includes(vratId)) {
      next = current.filter((id) => id !== vratId);
    } else {
      next = [...current, vratId];
    }
    onUpdatePreferences({
      ...preferences,
      vratas: {
        ...preferences.vratas,
        selectedVratIds: next,
      }
    });
    if (preferences.soundEnabled) playCardHoverSound();
  };

  const handleSelectAllCommonVrats = () => {
    onUpdatePreferences({
      ...preferences,
      vratas: {
        ...preferences.vratas,
        selectedVratIds: SACRED_VRATS_LIST.map((v) => v.id),
      }
    });
    if (preferences.soundEnabled) playSingingBowlChime();
  };

  const handleClearAllVrats = () => {
    onUpdatePreferences({
      ...preferences,
      vratas: {
        ...preferences.vratas,
        selectedVratIds: [],
      }
    });
    if (preferences.soundEnabled) playCardFlipSound();
  };

  const handleSelectWeeklyVrats = () => {
    const weeklyIds = SACRED_VRATS_LIST.filter((v) => v.category === "weekly").map((v) => v.id);
    const existing = new Set(preferences.vratas?.selectedVratIds || []);
    weeklyIds.forEach((id) => existing.add(id));
    onUpdatePreferences({
      ...preferences,
      vratas: {
        ...preferences.vratas,
        selectedVratIds: Array.from(existing),
      }
    });
    if (preferences.soundEnabled) playSingingBowlChime();
  };

  const handleSelectEkadashiPradosh = () => {
    const epIds = SACRED_VRATS_LIST.filter((v) => v.category === "ekadashi" || v.category === "pradosh").map((v) => v.id);
    const existing = new Set(preferences.vratas?.selectedVratIds || []);
    epIds.forEach((id) => existing.add(id));
    onUpdatePreferences({
      ...preferences,
      vratas: {
        ...preferences.vratas,
        selectedVratIds: Array.from(existing),
      }
    });
    if (preferences.soundEnabled) playSingingBowlChime();
  };

  const handleSimulateRuleTest = (mode: "day_before" | "day_of_morning" | "day_of_afternoon") => {
    setRuleSimulationMode(mode);
    if (preferences.soundEnabled) playSingingBowlChime();
    const modeLabel = 
      mode === "day_before" ? "1-Day-Before Prep Alerts (Evening)" :
      mode === "day_of_morning" ? "Fasting Day Morning Sankalp (Till 12:00 PM)" :
      "Fasting Day Afternoon & Evening Puja (Post 12:00 PM)";
    
    setTestAlertSentMessage(`Testing Active: Showing ${modeLabel}`);
    setTimeout(() => setTestAlertSentMessage(null), 4000);
  };

  const handleSimulateTransitAlert = () => {
    const userRashi = userProfile?.rashi || "Taurus";
    const testNotif: AppNotification = {
      id: "transit_test_" + Date.now(),
      category: "transit",
      planet: "Jupiter",
      movementType: "jupiterMajorTransits",
      severity: "Favorable Transit",
      title: `Live Alert: Jupiter Direct Ingress for ${userRashi}`,
      badgeLabel: "LIVE TEST ALERT • GRAHA GOCHAR",
      timestamp: "Just now",
      date: "Real-Time Celestial Shift",
      message: `Guru Brihaspati direct transit activates auspicious trine house for ${userRashi}. High financial flow, family elevation, and wisdom blessing.`,
      remedy: "Chant 'Om Gram Greem Groom Sah Gurave Namah' 108x with turmeric tilak.",
      actionLabel: "View Kundli Impact",
      actionTab: "astrology",
      isRead: false,
      priority: "high"
    };

    if (onAddNotification) {
      onAddNotification(testNotif);
    }
    if (preferences.soundEnabled) playSingingBowlChime();
    setTestAlertSentMessage("Simulated Graha Transit Alert delivered to feed!");
    setTimeout(() => setTestAlertSentMessage(null), 3500);
  };

  const handleRequestPushPermission = async () => {
    const perm = await requestNotificationPermission();
    setBrowserPermission(perm);
    if (perm === "granted") {
      sendBrowserVratNotification("🙏 Dev-Guru Vedic Alerts Enabled", {
        body: "You will now receive 24h advance Vrat preparation and morning Sankalp alerts directly on this device!"
      });
      if (preferences.soundEnabled) playSingingBowlChime();
      setTestAlertSentMessage("Browser Push Notifications granted & test delivered!");
    } else {
      setTestAlertSentMessage("Permission not granted. You can still use in-app alerts!");
    }
    setTimeout(() => setTestAlertSentMessage(null), 4000);
  };

  const getCategoryBadge = (category: NotificationCategory) => {
    switch (category) {
      case "transit":
        return {
          label: "Planetary Transit",
          icon: <Layers className="w-3.5 h-3.5 text-indigo-600" />,
          bg: "bg-indigo-50 text-indigo-800 border-indigo-200"
        };
      case "vratas":
        return {
          label: "Vrata & Fasting",
          icon: <Flame className="w-3.5 h-3.5 text-amber-600" />,
          bg: "bg-amber-50 text-amber-900 border-amber-300"
        };
      case "panchang":
        return {
          label: "Panchang & Muhurat",
          icon: <Sun className="w-3.5 h-3.5 text-amber-600" />,
          bg: "bg-amber-50 text-amber-800 border-amber-300"
        };
      case "purchase":
        return {
          label: "Order & Purchase",
          icon: <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />,
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200"
        };
      case "sadhana":
        return {
          label: "Daily Sadhana",
          icon: <Sparkles className="w-3.5 h-3.5 text-purple-600" />,
          bg: "bg-purple-50 text-purple-800 border-purple-200"
        };
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-950/75 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-amber-900/20 flex flex-col overflow-hidden text-slate-800 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-amber-900/10 bg-linear-to-r from-[#FAF6EF] via-white to-[#FAF6EF] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shadow-xs shrink-0">
              <Bell className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                  Notification Center
                </h2>
                {categoryCounts.unreadCounts.all > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[11px] font-bold shadow-xs animate-pulse">
                    {categoryCounts.unreadCounts.all} New
                  </span>
                )}
                <span className="hidden sm:inline-flex text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold border border-amber-300">
                  {selectedVratsList.length} Vrats Active
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Vedic transits, vratas (day-before &amp; morning till 12 PM), panchang &amp; sacred sadhana
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Open Full Hub Page */}
            <button
              onClick={() => {
                onNavigateToTab("notifications");
                onClose();
              }}
              className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Open full page Notifications Hub"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Full Hub Page</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title={preferences.soundEnabled ? "Mute spiritual chime" : "Enable spiritual chime"}
              aria-label="Toggle Sound"
            >
              {preferences.soundEnabled ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close Notifications"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Navigation Tabs inside Notification Center */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-50 border-b border-amber-900/10 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                if (preferences.soundEnabled) playCardHoverSound();
                setActiveTab("feed");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "feed"
                  ? "bg-slate-900 text-amber-300 shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Alerts Feed</span>
              {categoryCounts.unreadCounts.all > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => {
                if (preferences.soundEnabled) playCardHoverSound();
                setActiveTab("select_vrats");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "select_vrats"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Select Vrats ({selectedVratsList.length})</span>
            </button>

            <button
              onClick={() => {
                if (preferences.soundEnabled) playCardHoverSound();
                setActiveTab("select_transits");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "select_transits"
                  ? "bg-indigo-900 text-indigo-100 shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>Transit &amp; Panchang</span>
            </button>

            <button
              onClick={() => {
                if (preferences.soundEnabled) playCardHoverSound();
                setActiveTab("preferences");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "preferences"
                  ? "bg-purple-900 text-purple-100 shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-purple-500" />
              <span>Preferences</span>
            </button>
          </div>

          {/* Quick status toast */}
          {testAlertSentMessage && (
            <div className="text-[11px] px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-semibold animate-pulse shrink-0">
              {testAlertSentMessage}
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* VIEW 1: ALERTS FEED */}
        {/* ============================================================ */}
        {activeTab === "feed" && (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Category Filter Pills & Search */}
            <div className="px-4 sm:px-6 py-3 border-b border-amber-900/10 bg-slate-50/70 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <button
                  onClick={() => {
                    if (preferences.soundEnabled) playCardHoverSound();
                    setSelectedCategory("all");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedCategory === "all"
                      ? "bg-slate-900 text-amber-300 shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span>All</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700">
                    {categoryCounts.counts.all}
                  </span>
                </button>

                <button
                  onClick={() => {
                    if (preferences.soundEnabled) playCardHoverSound();
                    setSelectedCategory("vratas");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedCategory === "vratas"
                      ? "bg-amber-600 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Vratas</span>
                  {categoryCounts.unreadCounts.vratas > 0 && (
                    <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
                  )}
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-900/20 text-current">
                    {categoryCounts.counts.vratas}
                  </span>
                </button>

                <button
                  onClick={() => {
                    if (preferences.soundEnabled) playCardHoverSound();
                    setSelectedCategory("transit");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedCategory === "transit"
                      ? "bg-indigo-900 text-indigo-100 shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Transits</span>
                  {categoryCounts.unreadCounts.transit > 0 && (
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  )}
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-800/30 text-current">
                    {categoryCounts.counts.transit}
                  </span>
                </button>

                <button
                  onClick={() => {
                    if (preferences.soundEnabled) playCardHoverSound();
                    setSelectedCategory("panchang");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedCategory === "panchang"
                      ? "bg-amber-700 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Panchang</span>
                  {categoryCounts.unreadCounts.panchang > 0 && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-900/30 text-current">
                    {categoryCounts.counts.panchang}
                  </span>
                </button>

                <button
                  onClick={() => {
                    if (preferences.soundEnabled) playCardHoverSound();
                    setSelectedCategory("purchase");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedCategory === "purchase"
                      ? "bg-emerald-900 text-emerald-100 shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Purchases</span>
                  {categoryCounts.unreadCounts.purchase > 0 && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-800/30 text-current">
                    {categoryCounts.counts.purchase}
                  </span>
                </button>

                <button
                  onClick={() => {
                    if (preferences.soundEnabled) playCardHoverSound();
                    setSelectedCategory("sadhana");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedCategory === "sadhana"
                      ? "bg-purple-900 text-purple-100 shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Sadhana</span>
                  {categoryCounts.unreadCounts.sadhana > 0 && (
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  )}
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-800/30 text-current">
                    {categoryCounts.counts.sadhana}
                  </span>
                </button>
              </div>

              {/* Search & Actions */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search alerts..."
                    value={feedSearchQuery}
                    onChange={(e) => setFeedSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-amber-500 text-slate-800 w-32 sm:w-44"
                  />
                  {feedSearchQuery && (
                    <button
                      onClick={() => setFeedSearchQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {categoryCounts.unreadCounts.all > 0 && (
                  <button
                    onClick={onMarkAllAsRead}
                    className="flex items-center gap-1 text-xs text-slate-600 hover:text-amber-800 font-medium cursor-pointer"
                  >
                    <CheckCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span className="hidden sm:inline">Mark all read</span>
                  </button>
                )}
                {visibleNotifications.length > 0 && (
                  <button
                    onClick={onClearAllNotifications}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-600 font-medium cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Clear all</span>
                  </button>
                )}
              </div>
            </div>

            {/* Smart Contextual Banner for Vratas & Transits */}
            {selectedCategory === "vratas" && (
              <div className="px-4 sm:px-6 py-2.5 bg-amber-50 border-b border-amber-200/80 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-950">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-bold">Active Vrat Rules Enforced: </span>
                    <span className="text-amber-800">
                      (1) 1-Day-Before Evening Prep Alert • (2) Fasting Day Morning Sankalp (Active till 12:00 PM Afternoon).
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Simulation Rule Test Dropdown */}
                  <div className="flex items-center gap-1 text-[11px] bg-white px-2 py-1 rounded-lg border border-amber-300">
                    <span className="font-semibold text-amber-900">Rule Preview:</span>
                    <select
                      value={ruleSimulationMode}
                      onChange={(e) => handleSimulateRuleTest(e.target.value as any)}
                      className="bg-transparent font-bold text-amber-950 cursor-pointer focus:outline-none"
                    >
                      <option value="realtime">Real-time Clock</option>
                      <option value="day_before">1-Day-Before Prep</option>
                      <option value="day_of_morning">Day-Of Morning (Till 12 PM)</option>
                      <option value="day_of_afternoon">Evening Parana (Post 12 PM)</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setActiveTab("select_vrats")}
                    className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] transition-colors cursor-pointer shadow-2xs"
                  >
                    Select Vrats ({selectedVratsList.length})
                  </button>
                </div>
              </div>
            )}

            {selectedCategory === "transit" && (
              <div className="px-4 sm:px-6 py-2.5 bg-indigo-50 border-b border-indigo-200/80 flex flex-wrap items-center justify-between gap-2 text-xs text-indigo-950">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div>
                    <span className="font-bold">Planetary Transit Alerts: </span>
                    <span className="text-indigo-800">
                      Filtering Graha Ingresses, Sade Sati, Retrograde &amp; Eclipses based on your custom Graha selections.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("select_transits")}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] transition-colors cursor-pointer shadow-2xs"
                >
                  Configure Transit Alerts
                </button>
              </div>
            )}

            {/* Notification List Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 divide-y divide-slate-100">
              {categoryFilteredNotifications.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200 shadow-2xs">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-800">
                    All caught up!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    {selectedCategory === "all"
                      ? "No active alerts matching your current notification preferences."
                      : `No ${selectedCategory} alerts currently match your active filters.`}
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setActiveTab("select_vrats")}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Flame className="w-3.5 h-3.5 text-amber-600" />
                      <span>Select Vrats to Observe</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("select_transits")}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Customize Transit Alerts</span>
                    </button>
                  </div>
                </div>
              ) : (
                categoryFilteredNotifications.map((notif) => {
                  const badge = getCategoryBadge(notif.category);
                  const isVratDayMorning = notif.vratTimingRule === "day_of_morning";
                  const isVratDayBefore = notif.vratTimingRule === "day_before";

                  return (
                    <div
                      key={notif.id}
                      className={`pt-3.5 first:pt-0 group relative p-4 rounded-2xl border transition-all duration-200 ${
                        notif.isRead
                          ? "bg-white border-slate-200/80 hover:border-slate-300"
                          : isVratDayMorning
                          ? "bg-linear-to-r from-amber-50/90 to-amber-100/40 border-amber-400 shadow-xs"
                          : isVratDayBefore
                          ? "bg-linear-to-r from-orange-50/70 to-amber-50/40 border-amber-300 shadow-xs"
                          : notif.category === "transit"
                          ? "bg-indigo-50/30 border-indigo-200 shadow-2xs hover:border-indigo-300"
                          : "bg-amber-50/40 border-amber-300/60 shadow-xs hover:border-amber-400"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          {/* Unread indicator */}
                          <div className="pt-1 shrink-0">
                            {!notif.isRead ? (
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block ring-4 ring-amber-100" />
                            ) : (
                              <span className="w-2.5 h-2.5 rounded-full bg-slate-200 block" />
                            )}
                          </div>

                          <div className="space-y-1.5 flex-1">
                            {/* Badges and timestamp */}
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${badge.bg}`}
                              >
                                {badge.icon}
                                <span>{notif.badgeLabel || badge.label}</span>
                              </span>

                              {/* Vrat Specific Rule Badges */}
                              {isVratDayMorning && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-slate-950 shadow-2xs animate-pulse">
                                  <Clock className="w-3 h-3" />
                                  <span>Active till 12:00 PM Afternoon</span>
                                </span>
                              )}
                              {isVratDayBefore && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-orange-100 text-orange-900 border border-orange-200">
                                  <Moon className="w-3 h-3" />
                                  <span>Day-Before Evening Prep</span>
                                </span>
                              )}

                              {notif.date && (
                                <span className="text-[11px] font-medium text-slate-500">
                                  {notif.date}
                                </span>
                              )}

                              <span className="text-[10px] text-slate-400">
                                • {notif.timestamp}
                              </span>
                            </div>

                            {/* Title */}
                            <h4
                              className={`text-sm font-bold ${
                                notif.isRead ? "text-slate-800" : "text-slate-950 font-serif"
                              }`}
                            >
                              {notif.title}
                            </h4>

                            {/* Message */}
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {notif.message}
                            </p>

                            {/* Remedial Advice Callout if present */}
                            {notif.remedy && (
                              <div className="mt-2 p-2.5 rounded-xl bg-amber-100/60 border border-amber-300/60 text-amber-950 text-xs flex items-start gap-2">
                                <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="font-semibold">Vedic Remedy &amp; Mantra: </strong>
                                  <span>{notif.remedy}</span>
                                </div>
                              </div>
                            )}

                            {/* Action CTA */}
                            {notif.actionLabel && (
                              <div className="pt-2">
                                <button
                                  onClick={() => handleActionClick(notif)}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 bg-amber-100/90 hover:bg-amber-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs"
                                >
                                  <span>{notif.actionLabel}</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity shrink-0">
                          {!notif.isRead && (
                            <button
                              onClick={() => onMarkAsRead(notif.id)}
                              className="p-1.5 rounded-lg hover:bg-amber-100 text-slate-400 hover:text-amber-800 transition-colors cursor-pointer"
                              title="Mark as read"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => onDeleteNotification(notif.id)}
                            className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete alert"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 2: SELECT VRATS (CONVENIENT & EASY TO USE) */}
        {/* ============================================================ */}
        {activeTab === "select_vrats" && (
          <div className="flex flex-col flex-1 overflow-hidden p-4 sm:p-6 space-y-4">
            {/* Header & Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>Select Vratas to Observe &amp; Receive Timely Alerts</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select any sacred fast. Alerts will arrive (1) <strong>Day Before</strong> (Evening Prep) &amp; (2) <strong>Day Of</strong> (Active till 12:00 PM Afternoon).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <button
                  onClick={handleSelectAllCommonVrats}
                  className="px-2.5 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold transition-colors cursor-pointer"
                >
                  Select All
                </button>
                <button
                  onClick={handleSelectWeeklyVrats}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors cursor-pointer"
                >
                  Weekly Vrats
                </button>
                <button
                  onClick={handleSelectEkadashiPradosh}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors cursor-pointer"
                >
                  Ekadashi &amp; Pradosh
                </button>
                <button
                  onClick={handleClearAllVrats}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Filter Pills & Search */}
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
                {["all", "weekly", "ekadashi", "pradosh", "purnima", "amavasya", "chaturthi", "festival"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setVratCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all cursor-pointer ${
                      vratCategoryFilter === cat
                        ? "bg-amber-600 text-white shadow-2xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat === "all" ? "All Vrats" : cat}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search vrats, deities..."
                  value={vratSearchQuery}
                  onChange={(e) => setVratSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-amber-500 text-slate-800 w-44 sm:w-56"
                />
              </div>
            </div>

            {/* Grid of Selectable Vrats */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredSacredVrats.map((vrat) => {
                  const isSelected = selectedVratsList.includes(vrat.id);

                  return (
                    <div
                      key={vrat.id}
                      onClick={() => handleToggleVrat(vrat.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                        isSelected
                          ? "bg-amber-50/70 border-amber-400 shadow-xs ring-1 ring-amber-400/50"
                          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                      }`}
                    >
                      <div>
                        {/* Top row: Name & Checkbox */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2.5">
                            <div className="pt-0.5">
                              {isSelected ? (
                                <CheckSquare className="w-4 h-4 text-amber-600" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-300" />
                              )}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-1.5">
                                <span>{vrat.name}</span>
                              </h4>
                              <p className="text-[11px] font-medium text-amber-800">
                                {vrat.hindiName} • <span className="text-slate-500">{vrat.deity}</span>
                              </p>
                            </div>
                          </div>

                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium shrink-0">
                            {vrat.recurrence}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                          {vrat.description}
                        </p>
                      </div>

                      {/* Rule timing badges */}
                      <div className="mt-3 pt-2.5 border-t border-amber-900/10 space-y-1 text-[11px]">
                        <div className="flex items-center justify-between text-slate-600">
                          <span className="flex items-center gap-1">
                            <Moon className="w-3 h-3 text-orange-500" />
                            <strong>1-Day-Before Prep:</strong>
                          </span>
                          <span className="text-[10px] font-medium text-slate-500">{vrat.prepWindow}</span>
                        </div>
                        <div className="flex items-center justify-between text-amber-900 font-semibold">
                          <span className="flex items-center gap-1">
                            <Sun className="w-3 h-3 text-amber-600" />
                            <strong>Day-Of Fast &amp; Sankalp:</strong>
                          </span>
                          <span className="text-[10px] bg-amber-100/80 px-1.5 py-0.2 rounded-sm text-amber-900">
                            Active till 12:00 PM Noon
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                <strong>{selectedVratsList.length}</strong> Vrats currently selected. Notifications will automatically show in your feed!
              </div>

              <button
                onClick={() => {
                  setActiveTab("feed");
                  setSelectedCategory("vratas");
                }}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <span>Save &amp; View Vrat Feed</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 3: TRANSIT & PANCHANG ALERT SELECTIONS */}
        {/* ============================================================ */}
        {activeTab === "select_transits" && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>Select Planetary Transit &amp; Panchang Alerts</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pick exactly which planets, retrogrades, eclipses, and daily auspicious muhurats to monitor
                </p>
              </div>

              <button
                onClick={handleSimulateTransitAlert}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-xs"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Simulate Transit Alert</span>
              </button>
            </div>

            {/* Planet Pill Selector */}
            <div className="bg-indigo-50/50 rounded-2xl border border-indigo-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-indigo-950">Active Grahas (Planets)</h4>
                  <p className="text-[11px] text-indigo-800">Only receive Gochar transit alerts for your checked Grahas</p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => {
                      const safePlanets = preferences?.transit?.planets || DEFAULT_NOTIFICATION_PREFERENCES.transit.planets;
                      const allOn = Object.keys(safePlanets).reduce((acc, k) => ({ ...acc, [k]: true }), {});
                      onUpdatePreferences({
                        ...preferences,
                        transit: { ...(preferences?.transit || DEFAULT_NOTIFICATION_PREFERENCES.transit), planets: allOn as any }
                      });
                    }}
                    className="text-indigo-700 hover:text-indigo-950 font-bold"
                  >
                    Select All 9
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {Object.keys(preferences?.transit?.planets || DEFAULT_NOTIFICATION_PREFERENCES.transit.planets).map((planet) => {
                  const safePlanets = preferences?.transit?.planets || DEFAULT_NOTIFICATION_PREFERENCES.transit.planets;
                  const isActive = (safePlanets as any)[planet] ?? true;
                  return (
                    <button
                      key={planet}
                      onClick={() =>
                        onUpdatePreferences({
                          ...preferences,
                          transit: {
                            ...(preferences?.transit || DEFAULT_NOTIFICATION_PREFERENCES.transit),
                            planets: {
                              ...safePlanets,
                              [planet]: !isActive,
                            },
                          },
                        })
                      }
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-2xs"
                          : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span>{planet}</span>
                      {isActive && <Check className="w-3 h-3" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Granular Transit Movements */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Transit Movement Categories</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                  <span className="font-medium text-slate-700">Major Graha Ingresses (Jupiter, Saturn, Rahu)</span>
                  <input
                    type="checkbox"
                    checked={preferences.transit.jupiterMajorTransits}
                    onChange={(e) =>
                      onUpdatePreferences({
                        ...preferences,
                        transit: { ...preferences.transit, jupiterMajorTransits: e.target.checked }
                      })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                  <span className="font-medium text-slate-700">Saturn Sade Sati &amp; Dhaiya Axis Alerts</span>
                  <input
                    type="checkbox"
                    checked={preferences.transit.saturnReturnSadeSati}
                    onChange={(e) =>
                      onUpdatePreferences({
                        ...preferences,
                        transit: { ...preferences.transit, saturnReturnSadeSati: e.target.checked }
                      })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                  <span className="font-medium text-slate-700">Fast Moon 2.5-Day Gochar Shifts</span>
                  <input
                    type="checkbox"
                    checked={preferences.transit.moonSignChanges}
                    onChange={(e) =>
                      onUpdatePreferences({
                        ...preferences,
                        transit: { ...preferences.transit, moonSignChanges: e.target.checked }
                      })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                  <span className="font-medium text-slate-700">Mercury &amp; Venus Retrogrades (Vakri)</span>
                  <input
                    type="checkbox"
                    checked={preferences.transit.retrogradeAlerts}
                    onChange={(e) =>
                      onUpdatePreferences({
                        ...preferences,
                        transit: { ...preferences.transit, retrogradeAlerts: e.target.checked }
                      })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                  <span className="font-medium text-slate-700">Surya &amp; Chandra Grahan Eclipse Sutak</span>
                  <input
                    type="checkbox"
                    checked={preferences.transit.eclipseWarnings}
                    onChange={(e) =>
                      onUpdatePreferences({
                        ...preferences,
                        transit: { ...preferences.transit, eclipseWarnings: e.target.checked }
                      })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                  <span className="font-medium text-slate-700">Benefic Jupiter Drishti on Lagna / Moon</span>
                  <input
                    type="checkbox"
                    checked={preferences.transit.beneficDrishti}
                    onChange={(e) =>
                      onUpdatePreferences({
                        ...preferences,
                        transit: { ...preferences.transit, beneficDrishti: e.target.checked }
                      })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                </label>
              </div>

              {/* Severity Threshold */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-600">Minimum Impact Severity:</span>
                <select
                  value={preferences.transit.minimumImpactSeverity}
                  onChange={(e) =>
                    onUpdatePreferences({
                      ...preferences,
                      transit: {
                        ...preferences.transit,
                        minimumImpactSeverity: e.target.value as any
                      }
                    })
                  }
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 font-semibold text-slate-800 cursor-pointer text-xs"
                >
                  <option value="All Transits">All Transits</option>
                  <option value="Favorable Transits Only">Favorable Transits Only</option>
                  <option value="High Impact Only">High Impact Only</option>
                </select>
              </div>
            </div>

            {/* Panchang Muhurats */}
            <div className="bg-amber-50/50 rounded-2xl border border-amber-200 p-4 space-y-3">
              <h4 className="text-sm font-bold text-amber-950">Panchang &amp; Muhurat Alerts</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                  <span className="font-medium text-slate-700">Daily Abhijit Muhurat (Golden Window)</span>
                  <input
                    type="checkbox"
                    checked={preferences.panchang.abhijitMuhurat}
                    onChange={(e) =>
                      onUpdatePreferences({
                        ...preferences,
                        panchang: { ...preferences.panchang, abhijitMuhurat: e.target.checked }
                      })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                  <span className="font-medium text-slate-700">Rahu Kaal Alert (Inauspicious Window)</span>
                  <input
                    type="checkbox"
                    checked={preferences.panchang.rahuKalam}
                    onChange={(e) =>
                      onUpdatePreferences({
                        ...preferences,
                        panchang: { ...preferences.panchang, rahuKalam: e.target.checked }
                      })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                  <span className="font-medium text-slate-700">Auspicious Choghadiya Shifts (Amrit, Shubh)</span>
                  <input
                    type="checkbox"
                    checked={preferences.panchang.choghadiyaTimings}
                    onChange={(e) =>
                      onUpdatePreferences({
                        ...preferences,
                        panchang: { ...preferences.panchang, choghadiyaTimings: e.target.checked }
                      })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                  <span className="font-medium text-slate-700">Tithi &amp; Moon Phase Transition Alerts</span>
                  <input
                    type="checkbox"
                    checked={preferences.panchang.tithiTransitions}
                    onChange={(e) =>
                      onUpdatePreferences({
                        ...preferences,
                        panchang: { ...preferences.panchang, tithiTransitions: e.target.checked }
                      })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                </label>
              </div>
            </div>

            {/* Back to Feed CTA */}
            <div className="pt-2 text-center">
              <button
                onClick={() => {
                  setActiveTab("feed");
                  setSelectedCategory("transit");
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-amber-300 font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
              >
                Save &amp; View Transit Alerts
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 4: PREFERENCES & SETTINGS */}
        {/* ============================================================ */}
        {activeTab === "preferences" && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-600" />
                  <span>Delivery Preferences &amp; Sound Rules</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Audio chime settings, browser push permissions &amp; orders notifications
                </p>
              </div>

              <button
                onClick={() => {
                  onUpdatePreferences(DEFAULT_NOTIFICATION_PREFERENCES);
                  if (preferences.soundEnabled) playSingingBowlChime();
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-600 hover:text-slate-900 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Defaults</span>
              </button>
            </div>

            {/* Audio & Sound Settings */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-amber-600" />
                    <span>Spiritual Audio Chimes</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">Play Tibetan singing bowl chimes when celestial alerts trigger</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.soundEnabled}
                    onChange={(e) => onUpdatePreferences({ ...preferences, soundEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
                </label>
              </div>

              {preferences.soundEnabled && (
                <div className="pt-2">
                  <button
                    onClick={() => playSingingBowlChime()}
                    className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-colors cursor-pointer"
                  >
                    🔔 Test Singing Bowl Chime
                  </button>
                </div>
              )}
            </div>

            {/* Browser Push Notifications */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Desktop &amp; Mobile Push Alerts</h4>
                  <p className="text-[11px] text-slate-500">
                    Status: <span className="font-bold uppercase text-amber-700">{browserPermission}</span>
                  </p>
                </div>
                <button
                  onClick={handleRequestPushPermission}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  {browserPermission === "granted" ? "Send Test Push Alert" : "Enable Push Alerts"}
                </button>
              </div>
            </div>

            {/* Orders & Purchases */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Order, Puja &amp; Purchase Alerts</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                  <span className="font-medium text-slate-700">Puja Live Stream &amp; Pandit Sankalp Alerts</span>
                  <input
                    type="checkbox"
                    checked={preferences.purchase.orderUpdates}
                    onChange={(e) =>
                      onUpdatePreferences({
                        ...preferences,
                        purchase: { ...preferences.purchase, orderUpdates: e.target.checked }
                      })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                  <span className="font-medium text-slate-700">Deluxe Kundli PDF Dossier Delivery</span>
                  <input
                    type="checkbox"
                    checked={preferences.purchase.pdfDossierDelivery}
                    onChange={(e) =>
                      onUpdatePreferences({
                        ...preferences,
                        purchase: { ...preferences.purchase, pdfDossierDelivery: e.target.checked }
                      })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                  <span className="font-medium text-slate-700">Wallet Credits &amp; Spiritual Cashback</span>
                  <input
                    type="checkbox"
                    checked={preferences.purchase.walletCredits}
                    onChange={(e) =>
                      onUpdatePreferences({
                        ...preferences,
                        purchase: { ...preferences.purchase, walletCredits: e.target.checked }
                      })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                  <span className="font-medium text-slate-700">Live Astrologer Consultation Reminders</span>
                  <input
                    type="checkbox"
                    checked={preferences.purchase.consultationReminders}
                    onChange={(e) =>
                      onUpdatePreferences({
                        ...preferences,
                        purchase: { ...preferences.purchase, consultationReminders: e.target.checked }
                      })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                </label>
              </div>
            </div>

            {/* Daily Sadhana & Habits */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Daily Sadhana &amp; Habit Reminders</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                  <span className="font-medium text-slate-700">Daily 108x Japa Recitation Reminder</span>
                  <input
                    type="checkbox"
                    checked={preferences.sadhana.dailyJapaReminder}
                    onChange={(e) =>
                      onUpdatePreferences({
                        ...preferences,
                        sadhana: { ...preferences.sadhana, dailyJapaReminder: e.target.checked }
                      })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                  <span className="font-medium text-slate-700">Morning Surya Arghya Solar Offering</span>
                  <input
                    type="checkbox"
                    checked={preferences.sadhana.suryaArghya}
                    onChange={(e) =>
                      onUpdatePreferences({
                        ...preferences,
                        sadhana: { ...preferences.sadhana, suryaArghya: e.target.checked }
                      })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50">
                  <span className="font-medium text-slate-700">Daily Sadhana Streak Protection Warning</span>
                  <input
                    type="checkbox"
                    checked={preferences.sadhana.streakProtection}
                    onChange={(e) =>
                      onUpdatePreferences({
                        ...preferences,
                        sadhana: { ...preferences.sadhana, streakProtection: e.target.checked }
                      })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                </label>
              </div>
            </div>

            {/* Back to Feed CTA */}
            <div className="pt-2 text-center">
              <button
                onClick={() => setActiveTab("feed")}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-amber-300 font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
              >
                Save Preferences &amp; View Alerts
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
