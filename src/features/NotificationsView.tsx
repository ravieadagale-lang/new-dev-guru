import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bell,
  BellRing,
  Sparkles,
  Flame,
  Layers,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Heart,
  Volume2,
  VolumeX,
  Search,
  Check,
  CheckCheck,
  Trash2,
  ChevronRight,
  Sun,
  Moon,
  Zap,
  Filter,
  RefreshCw,
  Sliders,
  Compass,
  CheckSquare,
  Square,
  ShieldCheck,
  Smartphone,
  ArrowRight,
  BookOpen,
  Info
} from "lucide-react";
import {
  AppNotification,
  AdvancedNotificationPreferences,
  NotificationCategory,
  UserProfile
} from "../types";
import {
  SACRED_VRATS_LIST,
  DEFAULT_SELECTED_VRAT_IDS,
  DEFAULT_NOTIFICATION_PREFERENCES,
  generateDynamicVratNotifications,
  filterNotificationsByPreferences,
  saveNotificationPreferences
} from "../services/notificationPreferencesService";
import { playSingingBowlChime, playCardHoverSound } from "../utils/audioEffects";

interface NotificationsViewProps {
  notifications: AppNotification[];
  preferences: AdvancedNotificationPreferences;
  onUpdatePreferences: (prefs: AdvancedNotificationPreferences) => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onClearAllNotifications: () => void;
  onAddNotification: (notif: AppNotification) => void;
  onNavigateTab: (tab: string, meta?: any) => void;
  userProfile?: UserProfile;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  preferences,
  onUpdatePreferences,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onClearAllNotifications,
  onAddNotification,
  onNavigateTab,
  userProfile
}) => {
  // Navigation tabs inside the Notification Section
  const [activeTab, setActiveTab] = useState<"feed" | "select_vrats" | "select_transits" | "simulator" | "settings">("feed");

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState<"all" | NotificationCategory>("all");
  const [feedSearchQuery, setFeedSearchQuery] = useState("");
  const [vratSearchQuery, setVratSearchQuery] = useState("");
  const [vratCategoryFilter, setVratCategoryFilter] = useState("all");

  // Rule Simulation Mode to preview and test time-based rules
  const [ruleSimulationMode, setRuleSimulationMode] = useState<
    "realtime" | "day_before" | "day_of_morning" | "day_of_afternoon"
  >("realtime");

  // Browser Notification state
  const [browserPermission, setBrowserPermission] = useState<string>(
    typeof window !== "undefined" && "Notification" in window ? Notification.permission : "default"
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Safe selected vrats array
  const selectedVratsList = useMemo(() => {
    return Array.isArray(preferences?.vratas?.selectedVratIds)
      ? preferences.vratas.selectedVratIds
      : DEFAULT_SELECTED_VRAT_IDS;
  }, [preferences?.vratas?.selectedVratIds]);

  // Combined notifications: real-time generated vrat notifications merged with existing app alerts
  const combinedNotifications = useMemo(() => {
    const dynamicVrats = generateDynamicVratNotifications(selectedVratsList, ruleSimulationMode);
    const existingIds = new Set((notifications || []).map((n) => n.id));
    const uniqueDynamic = dynamicVrats.filter((n) => !existingIds.has(n.id));
    return [...uniqueDynamic, ...(notifications || [])];
  }, [notifications, selectedVratsList, ruleSimulationMode]);

  // Filtered by preference rules and time-rule constraint
  const visibleNotifications = useMemo(() => {
    const hourOverride =
      ruleSimulationMode === "day_of_morning" ? 9 : ruleSimulationMode === "day_of_afternoon" ? 16 : undefined;
    return filterNotificationsByPreferences(combinedNotifications, preferences, {
      currentHourOverride: hourOverride,
      allowAllVratRules: ruleSimulationMode === "realtime" ? false : true
    });
  }, [combinedNotifications, preferences, ruleSimulationMode]);

  // Filtered by active category pill & search query
  const categoryFilteredNotifications = useMemo(() => {
    let result = visibleNotifications;
    if (selectedCategory !== "all") {
      result = result.filter((n) => n.category === selectedCategory);
    }
    if (feedSearchQuery.trim()) {
      const q = feedSearchQuery.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.message.toLowerCase().includes(q) ||
          (n.remedy && n.remedy.toLowerCase().includes(q))
      );
    }
    return result;
  }, [visibleNotifications, selectedCategory, feedSearchQuery]);

  // Notification counts breakdown
  const counts = useMemo(() => {
    const total = visibleNotifications.length;
    const unread = visibleNotifications.filter((n) => !n.isRead).length;
    const vrats = visibleNotifications.filter((n) => n.category === "vratas").length;
    const transits = visibleNotifications.filter((n) => n.category === "transit").length;
    const panchang = visibleNotifications.filter((n) => n.category === "panchang").length;
    const orders = visibleNotifications.filter((n) => n.category === "purchase").length;
    const sadhana = visibleNotifications.filter((n) => n.category === "sadhana").length;

    return { total, unread, vrats, transits, panchang, orders, sadhana };
  }, [visibleNotifications]);

  // Filtered Vrats in the Select Vrats tab
  const filteredSacredVrats = useMemo(() => {
    return SACRED_VRATS_LIST.filter((vrat) => {
      const matchesCat = vratCategoryFilter === "all" || vrat.category === vratCategoryFilter;
      const matchesSearch =
        !vratSearchQuery.trim() ||
        vrat.name.toLowerCase().includes(vratSearchQuery.toLowerCase()) ||
        vrat.hindiName.includes(vratSearchQuery) ||
        vrat.deity.toLowerCase().includes(vratSearchQuery.toLowerCase()) ||
        vrat.description.toLowerCase().includes(vratSearchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [vratCategoryFilter, vratSearchQuery]);

  // Toggle single Vrat
  const handleToggleVrat = (vratId: string) => {
    if (preferences.soundEnabled) playCardHoverSound();
    const currentList = preferences?.vratas?.selectedVratIds || DEFAULT_SELECTED_VRAT_IDS;
    const isAlready = currentList.includes(vratId);
    const updated = isAlready ? currentList.filter((id) => id !== vratId) : [...currentList, vratId];

    const updatedPrefs: AdvancedNotificationPreferences = {
      ...preferences,
      vratas: {
        ...(preferences?.vratas || DEFAULT_NOTIFICATION_PREFERENCES.vratas),
        selectedVratIds: updated
      }
    };
    onUpdatePreferences(updatedPrefs);
    saveNotificationPreferences(updatedPrefs);
  };

  // Bulk actions for Vrats
  const handleSelectAllCommonVrats = () => {
    if (preferences.soundEnabled) playSingingBowlChime();
    const allIds = SACRED_VRATS_LIST.map((v) => v.id);
    const updatedPrefs: AdvancedNotificationPreferences = {
      ...preferences,
      vratas: {
        ...(preferences?.vratas || DEFAULT_NOTIFICATION_PREFERENCES.vratas),
        selectedVratIds: allIds
      }
    };
    onUpdatePreferences(updatedPrefs);
    saveNotificationPreferences(updatedPrefs);
    showToast("All 14 Sacred Vratas selected for automatic timing alerts!");
  };

  const handleSelectWeeklyVrats = () => {
    if (preferences.soundEnabled) playCardHoverSound();
    const weeklyIds = SACRED_VRATS_LIST.filter((v) => v.category === "weekly").map((v) => v.id);
    const updatedPrefs: AdvancedNotificationPreferences = {
      ...preferences,
      vratas: {
        ...(preferences?.vratas || DEFAULT_NOTIFICATION_PREFERENCES.vratas),
        selectedVratIds: weeklyIds
      }
    };
    onUpdatePreferences(updatedPrefs);
    saveNotificationPreferences(updatedPrefs);
    showToast("Selected all 7 weekly planetary fasts!");
  };

  const handleSelectEkadashiPradosh = () => {
    if (preferences.soundEnabled) playCardHoverSound();
    const targetIds = SACRED_VRATS_LIST.filter((v) => ["ekadashi", "pradosh"].includes(v.category)).map((v) => v.id);
    const updatedPrefs: AdvancedNotificationPreferences = {
      ...preferences,
      vratas: {
        ...(preferences?.vratas || DEFAULT_NOTIFICATION_PREFERENCES.vratas),
        selectedVratIds: targetIds
      }
    };
    onUpdatePreferences(updatedPrefs);
    saveNotificationPreferences(updatedPrefs);
    showToast("Selected Ekadashi and Pradosh sacred vows!");
  };

  const handleClearAllVrats = () => {
    if (preferences.soundEnabled) playCardHoverSound();
    const updatedPrefs: AdvancedNotificationPreferences = {
      ...preferences,
      vratas: {
        ...(preferences?.vratas || DEFAULT_NOTIFICATION_PREFERENCES.vratas),
        selectedVratIds: []
      }
    };
    onUpdatePreferences(updatedPrefs);
    saveNotificationPreferences(updatedPrefs);
    showToast("Cleared all selected vrat alerts.");
  };

  // Browser Notification Request
  const handleRequestBrowserNotification = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        const permission = await Notification.requestPermission();
        setBrowserPermission(permission);
        if (permission === "granted") {
          new Notification("Dev-Guru Vedic Alerts Enabled", {
            body: "You will receive timely alerts for Vrat preparation, dawn sankalps, and planetary transits.",
            icon: "/favicon.ico"
          });
          showToast("Browser push notification permission granted!");
        } else {
          showToast("Notification permission denied or dismissed.");
        }
      } catch (e) {
        console.error("Browser notification error:", e);
      }
    } else {
      showToast("Browser desktop notifications are not supported in this environment.");
    }
  };

  // Simulate Instant Notification Dispatch
  const handleTriggerTestAlert = (category: NotificationCategory) => {
    if (preferences.soundEnabled) playSingingBowlChime();
    const sampleAlerts: Record<NotificationCategory, Partial<AppNotification>> = {
      vratas: {
        category: "vratas",
        vratType: "dawnSankalpAlert",
        vratTimingRule: "day_of_morning",
        validUntil: "12:00 PM",
        title: "Today is Ekadashi Vrat (Dawn Fasting & Sankalp Active)",
        message: "Sacred Ekadashi observance is underway! Complete your snana, Surya Arghya, and Vishnu Sankalp before 12:00 PM noon. Fasting window is active.",
        badgeLabel: "FASTING DAY • SANKALP TILL 12 PM",
        date: "Active Observance Today",
        remedy: "Chant 'Om Namo Bhagavate Vasudevaya' 108 times and light a ghee lamp.",
        actionLabel: "View Fasting Guidelines",
        actionTab: "vrat_guide",
        priority: "urgent"
      },
      transit: {
        category: "transit",
        title: "Jupiter Ingress into Taurus (Favorable Gochar)",
        message: "Brihaspati enters Taurus forming a benefic trine to your natal Moon. Highly auspicious for wisdom, higher education, and financial consolidation.",
        badgeLabel: "JUPITER INGRESS • FAVORABLE",
        date: "Planetary Shift Active",
        remedy: "Wear yellow or offer chana dal and turmeric water to a peepal root on Thursdays.",
        actionLabel: "View Planetary Transit Details",
        actionTab: "astrology",
        priority: "high"
      },
      panchang: {
        category: "panchang",
        title: "Abhijit Muhurat Commencing (11:48 AM - 12:36 PM)",
        message: "The most auspicious mid-day victory window is active. Ideal for signing contracts, initiating new ventures, or spiritual mantras.",
        badgeLabel: "ABHIJIT MUHURAT • AUSPICIOUS",
        date: "Today's Sacred Window",
        actionLabel: "View Full Day Panchang",
        actionTab: "panchang",
        priority: "high"
      },
      purchase: {
        category: "purchase",
        title: "Order #AN-8891 Dispatched • Natural 5-Mukhi Rudraksha",
        message: "Your energized Rudraksha with certified Vedic Pran Pratishtha certification has been packed and handed to courier with live tracking.",
        badgeLabel: "DISPATCHED • STORE ORDER",
        date: "Order Status Update",
        actionLabel: "Track Order Status",
        actionTab: "dashboard",
        priority: "normal"
      },
      sadhana: {
        category: "sadhana",
        title: "Sandhya Sandhanam & Japa Reminder",
        message: "Twilight twilight muhurat approaches. Complete your 108 Gayatri Japa repetitions to maintain your spiritual streak (Day 14).",
        badgeLabel: "EVENING JAPA • SADHANA",
        date: "Evening Routine",
        actionLabel: "Open Mantras Library",
        actionTab: "mantras",
        priority: "normal"
      }
    };

    const template = sampleAlerts[category];
    const newNotif: AppNotification = {
      id: `sim-${category}-${Date.now()}`,
      category,
      title: template.title || "Vedic Notification",
      message: template.message || "Notification message details.",
      timestamp: "Just now",
      date: template.date || "Today",
      isRead: false,
      priority: template.priority || "high",
      badgeLabel: template.badgeLabel,
      actionLabel: template.actionLabel,
      actionTab: template.actionTab,
      remedy: template.remedy,
      vratTimingRule: template.vratTimingRule,
      validUntil: template.validUntil
    };

    onAddNotification(newNotif);
    showToast(`Test ${category.toUpperCase()} notification generated!`);
  };

  const handleActionClick = (notif: AppNotification) => {
    onMarkAsRead(notif.id);
    if (notif.actionTab) {
      onNavigateTab(notif.actionTab, notif.metadata);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Toast Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-amber-950 text-amber-200 px-4 py-2.5 rounded-xl border border-amber-500/40 shadow-xl flex items-center gap-2.5 text-xs font-semibold"
          >
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Header & Hero Dashboard Banner */}
      <div className="bg-gradient-to-br from-[#1E1B18] via-[#2A241F] to-[#1E1B18] text-amber-100 rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <BellRing className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>Sacred Notification Hub &amp; Alert Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              Timely Notifications &amp; Observance Alerts
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
              Configure your exact spiritual, astrological, and fasting alerts. Active timing rules strictly enforced:
              <strong className="text-amber-300"> (1) 1-Day-Before Evening Preparation</strong> and
              <strong className="text-amber-300"> (2) Fasting Day Morning Sankalp (Active till 12:00 PM Afternoon)</strong>.
            </p>
          </div>

          {/* Quick Stat Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-amber-400/20 text-center">
              <div className="text-xl sm:text-2xl font-bold font-serif text-white">{counts.total}</div>
              <div className="text-[11px] font-medium text-amber-200/70">Total Alerts</div>
            </div>
            <div className="bg-amber-500/20 backdrop-blur-md rounded-2xl p-3 border border-amber-400/30 text-center">
              <div className="text-xl sm:text-2xl font-bold font-serif text-amber-300">{counts.unread}</div>
              <div className="text-[11px] font-medium text-amber-200">Unread</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-amber-400/20 text-center">
              <div className="text-xl sm:text-2xl font-bold font-serif text-white">{selectedVratsList.length}</div>
              <div className="text-[11px] font-medium text-amber-200/70">Vratas Monitored</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-amber-400/20 text-center">
              <div className="text-xl sm:text-2xl font-bold font-serif text-white">
                {Object.values(preferences?.transit?.planets || {}).filter(Boolean).length}
              </div>
              <div className="text-[11px] font-medium text-amber-200/70">Grahas Tracked</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Sub-Bar (Feed, Select Vrats, Planetary Transits, Timing Rules Simulator, Settings) */}
      <div className="bg-white rounded-2xl p-2 border border-amber-900/10 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => {
              if (preferences.soundEnabled) playCardHoverSound();
              setActiveTab("feed");
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "feed"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-700 hover:bg-amber-50 hover:text-amber-950"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Alerts Feed</span>
            {counts.unread > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-600 text-white font-bold animate-pulse">
                {counts.unread}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              if (preferences.soundEnabled) playCardHoverSound();
              setActiveTab("select_vrats");
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "select_vrats"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-700 hover:bg-amber-50 hover:text-amber-950"
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Select Vratas ({selectedVratsList.length})</span>
          </button>

          <button
            onClick={() => {
              if (preferences.soundEnabled) playCardHoverSound();
              setActiveTab("select_transits");
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "select_transits"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-700 hover:bg-amber-50 hover:text-amber-950"
            }`}
          >
            <Layers className="w-4 h-4 text-indigo-500" />
            <span>Transit &amp; Panchang Alerts</span>
          </button>

          <button
            onClick={() => {
              if (preferences.soundEnabled) playCardHoverSound();
              setActiveTab("simulator");
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "simulator"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-700 hover:bg-amber-50 hover:text-amber-950"
            }`}
          >
            <Clock className="w-4 h-4 text-emerald-500" />
            <span>Rule Simulator &amp; Test</span>
          </button>

          <button
            onClick={() => {
              if (preferences.soundEnabled) playCardHoverSound();
              setActiveTab("settings");
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "settings"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-700 hover:bg-amber-50 hover:text-amber-950"
            }`}
          >
            <Sliders className="w-4 h-4 text-slate-500" />
            <span>Preferences &amp; Sounds</span>
          </button>
        </div>

        {/* Sound Toggle Quick Action */}
        <div className="flex items-center gap-2 px-2">
          <button
            onClick={() => {
              const updated = !preferences.soundEnabled;
              onUpdatePreferences({ ...preferences, soundEnabled: updated });
              saveNotificationPreferences({ ...preferences, soundEnabled: updated });
              if (updated) playSingingBowlChime();
              showToast(updated ? "Tibetan chime audio enabled" : "Audio chime muted");
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-950 transition-colors cursor-pointer"
            title={preferences.soundEnabled ? "Mute alert chimes" : "Enable alert chimes"}
          >
            {preferences.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* 3. TAB CONTENT VIEWS */}

      {/* ============================================================ */}
      {/* TAB 1: ALERTS FEED */}
      {/* ============================================================ */}
      {activeTab === "feed" && (
        <div className="space-y-4">
          {/* Category Filter Pills & Search */}
          <div className="bg-white rounded-2xl p-4 border border-amber-900/10 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>All Alerts</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-current">
                  {counts.total}
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory("vratas")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedCategory === "vratas"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200"
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Vrat Observances</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-800/30 text-current">
                  {counts.vrats}
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory("transit")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedCategory === "transit"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border border-indigo-200"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                <span>Transits</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-800/30 text-current">
                  {counts.transits}
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory("panchang")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedCategory === "panchang"
                    ? "bg-orange-600 text-white shadow-xs"
                    : "bg-orange-50 text-orange-800 hover:bg-orange-100 border border-orange-200"
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-orange-500" />
                <span>Panchang Muhurat</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-orange-800/30 text-current">
                  {counts.panchang}
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory("purchase")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedCategory === "purchase"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-500" />
                <span>Orders &amp; Store</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-800/30 text-current">
                  {counts.orders}
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory("sadhana")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedCategory === "sadhana"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                <span>Sadhana</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-800/30 text-current">
                  {counts.sadhana}
                </span>
              </button>
            </div>

            {/* Search Input & Actions */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search alert keywords..."
                  value={feedSearchQuery}
                  onChange={(e) => setFeedSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-amber-500 text-slate-800 w-40 sm:w-56"
                />
              </div>

              {counts.unread > 0 && (
                <button
                  onClick={() => {
                    onMarkAllAsRead();
                    showToast("Marked all alerts as read");
                  }}
                  className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-4 h-4 text-amber-600" />
                  <span className="hidden sm:inline">Mark read</span>
                </button>
              )}

              {visibleNotifications.length > 0 && (
                <button
                  onClick={() => {
                    onClearAllNotifications();
                    showToast("Cleared alert history");
                  }}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-600 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Clear all alerts"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Contextual Banner for Vrat Rules */}
          {selectedCategory === "vratas" && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Flame className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <strong className="font-bold text-amber-900">Vedic Fasting Timing Rules Enforced: </strong>
                  <span>(1) 1-Day-Before Evening Prep Alert • (2) Fasting Day Morning Sankalp (Active till 12:00 PM Afternoon).</span>
                </div>
              </div>
              <button
                onClick={() => setActiveTab("select_vrats")}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Configure Vrat Choices ({selectedVratsList.length})
              </button>
            </div>
          )}

          {/* Notification List */}
          {categoryFilteredNotifications.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-amber-900/10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">All Caught Up!</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                {selectedCategory === "all"
                  ? "No active alerts matching your preferences right now. Vrat preparation notifications arrive the evening before, and morning fasting sankalps appear at dawn till 12:00 PM."
                  : `No ${selectedCategory} notifications currently active. Adjust your choices or try simulating a rule test.`}
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setActiveTab("select_vrats")}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-2"
                >
                  <Flame className="w-4 h-4" />
                  <span>Select Vratas to Observe</span>
                </button>
                <button
                  onClick={() => setActiveTab("simulator")}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Test Timing Rules</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {categoryFilteredNotifications.map((notif) => {
                const isVratDayMorning = notif.vratTimingRule === "day_of_morning";
                const isVratDayBefore = notif.vratTimingRule === "day_before";

                return (
                  <div
                    key={notif.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                      notif.isRead
                        ? "bg-white border-slate-200 hover:border-slate-300"
                        : isVratDayMorning
                        ? "bg-linear-to-r from-amber-50 via-amber-100/40 to-white border-amber-400 shadow-sm"
                        : isVratDayBefore
                        ? "bg-linear-to-r from-orange-50 via-amber-50/40 to-white border-orange-300 shadow-sm"
                        : notif.category === "transit"
                        ? "bg-indigo-50/40 border-indigo-200 shadow-xs hover:border-indigo-300"
                        : "bg-amber-50/30 border-amber-200 shadow-xs"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5 flex-1">
                        {/* Unread Pip */}
                        <div className="pt-1 shrink-0">
                          {!notif.isRead ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 block ring-4 ring-amber-100" />
                          ) : (
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-200 block" />
                          )}
                        </div>

                        <div className="space-y-2 flex-1">
                          {/* Badges & Meta */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                              {notif.badgeLabel || notif.category}
                            </span>

                            {/* Vrat Specific Rule Badges */}
                            {isVratDayMorning && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-slate-950 shadow-xs animate-pulse">
                                <Clock className="w-3 h-3" />
                                <span>Active till 12:00 PM Afternoon</span>
                              </span>
                            )}
                            {isVratDayBefore && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-orange-100 text-orange-900 border border-orange-200">
                                <Moon className="w-3 h-3" />
                                <span>1-Day-Before Evening Prep</span>
                              </span>
                            )}

                            {notif.date && (
                              <span className="text-xs font-medium text-slate-500">{notif.date}</span>
                            )}
                            <span className="text-[11px] text-slate-400">• {notif.timestamp}</span>
                          </div>

                          {/* Title */}
                          <h4 className="text-base font-bold font-serif text-slate-900">
                            {notif.title}
                          </h4>

                          {/* Message Body */}
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
                            {notif.message}
                          </p>

                          {/* Remedial Advice Callout */}
                          {notif.remedy && (
                            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs flex items-start gap-2 max-w-3xl">
                              <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <strong className="font-semibold">Vedic Remedy &amp; Mantra: </strong>
                                <span>{notif.remedy}</span>
                              </div>
                            </div>
                          )}

                          {/* Action CTA Link */}
                          {notif.actionLabel && (
                            <div className="pt-1">
                              <button
                                onClick={() => handleActionClick(notif)}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-100 hover:bg-amber-200 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs"
                              >
                                <span>{notif.actionLabel}</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Action Icons */}
                      <div className="flex items-center gap-1 shrink-0">
                        {!notif.isRead && (
                          <button
                            onClick={() => onMarkAsRead(notif.id)}
                            className="p-2 rounded-xl hover:bg-amber-100 text-slate-400 hover:text-amber-900 transition-colors cursor-pointer"
                            title="Mark read"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteNotification(notif.id)}
                          className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete alert"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: SELECT VRATAS (CONVENIENT & EASY TO USE) */}
      {/* ============================================================ */}
      {activeTab === "select_vrats" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-xs space-y-6">
          {/* Header & Quick Action Buttons */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-600" />
                <span>Select Vratas to Observe &amp; Receive Timely Alerts</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Select any sacred fast. Alerts will arrive strictly on schedule: (1) <strong>Day Before</strong> (Evening Prep) &amp; (2) <strong>Day Of</strong> (Active till 12:00 PM Afternoon).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={handleSelectAllCommonVrats}
                className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors cursor-pointer shadow-xs"
              >
                Select All 14 Vratas
              </button>
              <button
                onClick={handleSelectWeeklyVrats}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors cursor-pointer"
              >
                Weekly Fasts
              </button>
              <button
                onClick={handleSelectEkadashiPradosh}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors cursor-pointer"
              >
                Ekadashi &amp; Pradosh
              </button>
              <button
                onClick={handleClearAllVrats}
                className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Filter Pills & Search */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
              {["all", "weekly", "ekadashi", "pradosh", "purnima", "amavasya", "chaturthi", "festival"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setVratCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl font-semibold capitalize transition-all cursor-pointer ${
                    vratCategoryFilter === cat
                      ? "bg-amber-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat === "all" ? "All Vrats" : cat}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search fasts, deities..."
                value={vratSearchQuery}
                onChange={(e) => setVratSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-amber-500 text-slate-800 w-52 sm:w-64"
              />
            </div>
          </div>

          {/* Grid of Selectable Vrats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSacredVrats.map((vrat) => {
              const isSelected = selectedVratsList.includes(vrat.id);

              return (
                <div
                  key={vrat.id}
                  onClick={() => handleToggleVrat(vrat.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                    isSelected
                      ? "bg-amber-50/80 border-amber-400 shadow-sm ring-1 ring-amber-400/50"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div>
                    {/* Header: Checkbox + Name */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="pt-0.5">
                          {isSelected ? (
                            <CheckSquare className="w-5 h-5 text-amber-600" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-300" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 font-serif">
                            {vrat.name}
                          </h4>
                          <p className="text-xs font-semibold text-amber-800">
                            {vrat.hindiName} • <span className="text-slate-500">{vrat.deity}</span>
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold shrink-0">
                        {vrat.recurrence}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                      {vrat.description}
                    </p>
                  </div>

                  {/* Timing rule indicators */}
                  <div className="mt-4 pt-3 border-t border-amber-900/10 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Moon className="w-3.5 h-3.5 text-orange-500" />
                        <strong className="font-semibold">Day-Before Alert:</strong>
                      </span>
                      <span className="text-[11px] text-slate-500">{vrat.prepWindow}</span>
                    </div>
                    <div className="flex items-center justify-between text-amber-950 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5 text-amber-600" />
                        <span>Day-Of Sankalp:</span>
                      </span>
                      <span className="text-[11px] bg-amber-200/70 px-2 py-0.5 rounded-md text-amber-900">
                        Active till 12:00 PM Noon
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Confirmation Bar */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-slate-600">
              <strong className="text-slate-900">{selectedVratsList.length}</strong> sacred vrats currently chosen. Notifications will automatically populate your feed based on strict timing rules!
            </div>
            <button
              onClick={() => {
                setActiveTab("feed");
                setSelectedCategory("vratas");
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs flex items-center gap-2"
            >
              <span>View Active Vrat Notifications</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: PLANETARY TRANSITS & PANCHANG ALERTS */}
      {/* ============================================================ */}
      {activeTab === "select_transits" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <span>Select Planetary Transit &amp; Panchang Alerts</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Choose exactly which Grahas (planets), retrograde motions, and daily auspicious muhurats to monitor.
              </p>
            </div>
            <button
              onClick={() => handleTriggerTestAlert("transit")}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shadow-xs shrink-0"
            >
              <Zap className="w-4 h-4" />
              <span>Simulate Transit Alert</span>
            </button>
          </div>

          {/* 1. Graha Chips */}
          <div className="bg-indigo-50/50 rounded-2xl border border-indigo-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-indigo-950">Active Grahas (Planets)</h4>
                <p className="text-xs text-indigo-800">Only receive Gochar transit alerts for checked Grahas</p>
              </div>
              <button
                onClick={() => {
                  const safePlanets = preferences?.transit?.planets || DEFAULT_NOTIFICATION_PREFERENCES.transit.planets;
                  const allOn = Object.keys(safePlanets).reduce((acc, k) => ({ ...acc, [k]: true }), {});
                  onUpdatePreferences({
                    ...preferences,
                    transit: { ...(preferences?.transit || DEFAULT_NOTIFICATION_PREFERENCES.transit), planets: allOn as any }
                  });
                  showToast("All 9 Grahas activated");
                }}
                className="text-xs font-bold text-indigo-700 hover:text-indigo-950 cursor-pointer"
              >
                Select All 9 Grahas
              </button>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {Object.keys(preferences?.transit?.planets || DEFAULT_NOTIFICATION_PREFERENCES.transit.planets).map((planet) => {
                const safePlanets = preferences?.transit?.planets || DEFAULT_NOTIFICATION_PREFERENCES.transit.planets;
                const isActive = (safePlanets as any)[planet] ?? true;

                return (
                  <button
                    key={planet}
                    onClick={() => {
                      const updatedPrefs = {
                        ...preferences,
                        transit: {
                          ...(preferences?.transit || DEFAULT_NOTIFICATION_PREFERENCES.transit),
                          planets: {
                            ...safePlanets,
                            [planet]: !isActive
                          }
                        }
                      };
                      onUpdatePreferences(updatedPrefs);
                      saveNotificationPreferences(updatedPrefs);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span>{planet}</span>
                    {isActive ? <Check className="w-3.5 h-3.5" /> : <span className="w-3.5 h-3.5 opacity-30">+</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Granular Transit Types */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Transit Movement Categories</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: "jupiterMajorTransits", label: "Major Graha Ingresses (Jupiter, Saturn, Rahu-Ketu)" },
                { key: "saturnReturnSadeSati", label: "Saturn Sade Sati & Dhaiya Phase Shifts" },
                { key: "retrogradeAlerts", label: "Vakri (Retrograde) Commencements & Direct Stations" },
                { key: "eclipseWarnings", label: "Surya & Chandra Grahan (Eclipse Portals)" },
                { key: "moonSignChanges", label: "Chandra Gochar (Moon Sign Ingress every 2.25 Days)" },
                { key: "beneficDrishti", label: "Benefic Planetary Drishti & Conjunctions" }
              ].map(({ key, label }) => {
                const isChecked = (preferences?.transit as any)?.[key] ?? true;
                return (
                  <label
                    key={key}
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-50"
                  >
                    <span className="font-medium text-slate-700">{label}</span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        const updated = {
                          ...preferences,
                          transit: {
                            ...(preferences?.transit || DEFAULT_NOTIFICATION_PREFERENCES.transit),
                            [key]: e.target.checked
                          }
                        };
                        onUpdatePreferences(updated);
                        saveNotificationPreferences(updated);
                      }}
                      className="w-4 h-4 text-indigo-600 rounded-md focus:ring-0 cursor-pointer"
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* 3. Daily Panchang Muhurats */}
          <div className="bg-orange-50/40 rounded-2xl border border-orange-200 p-5 space-y-4">
            <h4 className="text-sm font-bold text-orange-950">Daily Panchang Timings &amp; Inauspicious Caution Alerts</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: "abhijitMuhurat", label: "Daily Abhijit Muhurat (Midday Victory Window)" },
                { key: "rahuKalam", label: "Rahu Kalam Caution Window (Avoid Auspicious Beginnings)" },
                { key: "choghadiyaTimings", label: "Shubh, Labh, Amrit Choghadiya Transitions" },
                { key: "brahmaMuhurat", label: "Brahma Muhurat Dawn Alert (Pre-Sunrise Meditation)" }
              ].map(({ key, label }) => {
                const isChecked = (preferences?.panchang as any)?.[key] ?? true;
                return (
                  <label
                    key={key}
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-orange-200 text-xs cursor-pointer hover:bg-orange-50/50"
                  >
                    <span className="font-medium text-slate-700">{label}</span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        const updated = {
                          ...preferences,
                          panchang: {
                            ...(preferences?.panchang || DEFAULT_NOTIFICATION_PREFERENCES.panchang),
                            [key]: e.target.checked
                          }
                        };
                        onUpdatePreferences(updated);
                        saveNotificationPreferences(updated);
                      }}
                      className="w-4 h-4 text-orange-600 rounded-md focus:ring-0 cursor-pointer"
                    />
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: RULE SIMULATOR & TEST SENDER */}
      {/* ============================================================ */}
      {activeTab === "simulator" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-xs space-y-6">
          <div>
            <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              <span>Timing Rule Preview &amp; Instant Alert Simulator</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Verify and test how notifications fire under our strict timing constraints:
              <strong> (1) 1-Day-Before Evening Prep</strong>, <strong> (2) Day-Of Fast till 12:00 PM Afternoon</strong>, and <strong> (3) Evening Parana</strong>.
            </p>
          </div>

          {/* Time State Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                id: "realtime",
                title: "Live Real-Time Clock",
                desc: "Matches your real device hour right now.",
                badge: "Current Time"
              },
              {
                id: "day_before",
                title: "1-Day-Before Evening",
                desc: "Simulates evening preparation before fast day.",
                badge: "Prep Window"
              },
              {
                id: "day_of_morning",
                title: "Day-Of Dawn (Till 12 PM)",
                desc: "Simulates morning fast & sankalp window.",
                badge: "Active Till 12 PM"
              },
              {
                id: "day_of_afternoon",
                title: "Day-Of Post-12 PM",
                desc: "Simulates afternoon / evening twilight & Parana.",
                badge: "Twilight / Parana"
              }
            ].map((sim) => (
              <div
                key={sim.id}
                onClick={() => {
                  setRuleSimulationMode(sim.id as any);
                  if (preferences.soundEnabled) playCardHoverSound();
                  showToast(`Simulation set to: ${sim.title}`);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  ruleSimulationMode === sim.id
                    ? "bg-emerald-50 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {sim.badge}
                  </span>
                  {ruleSimulationMode === sim.id && <Check className="w-4 h-4 text-emerald-600" />}
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-2">{sim.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{sim.desc}</p>
              </div>
            ))}
          </div>

          {/* Test Dispatchers by Category */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Dispatch Live Test Notifications</h4>
            <p className="text-xs text-slate-500">
              Click any button below to instantly push an authentic notification into your feed with audio chimes:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <button
                onClick={() => handleTriggerTestAlert("vratas")}
                className="p-3 rounded-xl bg-white border border-amber-300 hover:bg-amber-50 text-amber-900 text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Test Vrat Alert</span>
              </button>

              <button
                onClick={() => handleTriggerTestAlert("transit")}
                className="p-3 rounded-xl bg-white border border-indigo-300 hover:bg-indigo-50 text-indigo-900 text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Test Transit Alert</span>
              </button>

              <button
                onClick={() => handleTriggerTestAlert("panchang")}
                className="p-3 rounded-xl bg-white border border-orange-300 hover:bg-orange-50 text-orange-900 text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <Sun className="w-4 h-4 text-orange-600" />
                <span>Test Panchang Alert</span>
              </button>

              <button
                onClick={() => handleTriggerTestAlert("purchase")}
                className="p-3 rounded-xl bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-900 text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                <span>Test Store Order</span>
              </button>

              <button
                onClick={() => handleTriggerTestAlert("sadhana")}
                className="p-3 rounded-xl bg-white border border-purple-300 hover:bg-purple-50 text-purple-900 text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Test Sadhana Japa</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: PREFERENCES & SOUND SETTINGS */}
      {/* ============================================================ */}
      {activeTab === "settings" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-xs space-y-6">
          <div>
            <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-slate-700" />
              <span>Notification Preferences &amp; Sound Configuration</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Customize delivery sounds, browser desktop alerts, and severity thresholds.
            </p>
          </div>

          <div className="space-y-4">
            {/* 1. Audio Chime */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Tibetan Singing Bowl Chime</h4>
                  <p className="text-xs text-slate-500">
                    Plays an authentic resonant sacred chime upon receiving an alert or completing a sankalp.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => playSingingBowlChime()}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Test Audio
                </button>
                <input
                  type="checkbox"
                  checked={preferences.soundEnabled}
                  onChange={(e) => {
                    const updated = { ...preferences, soundEnabled: e.target.checked };
                    onUpdatePreferences(updated);
                    saveNotificationPreferences(updated);
                  }}
                  className="w-5 h-5 text-amber-600 rounded-md focus:ring-0 cursor-pointer"
                />
              </div>
            </div>

            {/* 2. Desktop Push Permission */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-800">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Browser Desktop Push Notifications</h4>
                  <p className="text-xs text-slate-500">
                    Receive alerts on your device screen even when this browser tab is backgrounded.
                  </p>
                  <span className="text-[11px] text-slate-400">Current status: {browserPermission}</span>
                </div>
              </div>
              <button
                onClick={handleRequestBrowserNotification}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs shrink-0"
              >
                {browserPermission === "granted" ? "Granted • Test Push" : "Enable Push Alerts"}
              </button>
            </div>

            {/* 3. Transit Severity Threshold */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-orange-100 text-orange-800">
                  <Filter className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Transit Severity Threshold</h4>
                  <p className="text-xs text-slate-500">
                    Filter out minor daily moon transits and only receive major shifts.
                  </p>
                </div>
              </div>
              <select
                value={preferences?.transit?.minimumImpactSeverity || "All Transits"}
                onChange={(e) => {
                  const updated = {
                    ...preferences,
                    transit: {
                      ...(preferences?.transit || DEFAULT_NOTIFICATION_PREFERENCES.transit),
                      minimumImpactSeverity: e.target.value as any
                    }
                  };
                  onUpdatePreferences(updated);
                  saveNotificationPreferences(updated);
                }}
                className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 cursor-pointer focus:outline-none"
              >
                <option value="All Transits">All Transits</option>
                <option value="High Impact Only">High Impact Only</option>
                <option value="Favorable Transits Only">Favorable Transits Only</option>
              </select>
            </div>

            {/* 4. Reset to Defaults */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-200">
              <div className="text-xs text-slate-500">
                Restore all Vedic notification rules and selections to initial defaults.
              </div>
              <button
                onClick={() => {
                  onUpdatePreferences(DEFAULT_NOTIFICATION_PREFERENCES);
                  saveNotificationPreferences(DEFAULT_NOTIFICATION_PREFERENCES);
                  showToast("Restored all notification preferences to defaults");
                }}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-bold transition-colors cursor-pointer"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
