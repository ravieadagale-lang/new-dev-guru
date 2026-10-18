import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bell,
  BellRing,
  BellOff,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Calendar,
  Sparkles,
  Volume2,
  VolumeX,
  Flame,
  Shield,
  Download,
  Share2,
  Info,
  X,
  RefreshCw,
  Sliders,
  ChevronRight,
  Send,
  Lock,
  Star,
  Smartphone,
  Laptop
} from "lucide-react";
import {
  VratNotificationPreferences,
  UpcomingVratAlert,
  loadVratNotificationPrefs,
  saveVratNotificationPrefs,
  getNotificationPermission,
  requestNotificationPermission,
  sendBrowserVratNotification,
  generateUpcomingVratAlerts,
  triggerTestVrat24hNotification,
  exportVratCalendarIcs,
  isNotificationSupported
} from "../utils/vratNotificationEngine";
import { playSingingBowlChime, playCardFlipSound } from "../utils/audioEffects";
import { ALL_VRATS_CATALOG } from "../data/vratGuideData";

interface VratNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrefsUpdated?: (prefs: VratNotificationPreferences) => void;
}

export const VratNotificationModal: React.FC<VratNotificationModalProps> = ({
  isOpen,
  onClose,
  onPrefsUpdated
}) => {
  const [prefs, setPrefs] = useState<VratNotificationPreferences>(loadVratNotificationPrefs);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<"preferences" | "upcoming" | "vrat_selector">("preferences");
  const [selectedVratSearch, setSelectedVratSearch] = useState("");

  useEffect(() => {
    if (isOpen) {
      const currentPrefs = loadVratNotificationPrefs();
      setPrefs(currentPrefs);
      setIsSupported(isNotificationSupported());
      setPermission(getNotificationPermission());
      setTestResult(null);
    }
  }, [isOpen]);

  // Generate upcoming alerts preview
  const upcomingAlerts = React.useMemo(() => {
    return generateUpcomingVratAlerts(prefs);
  }, [prefs]);

  const handleToggleMaster = async () => {
    const nextEnabled = !prefs.enabled;
    let nextPerm = permission;

    if (nextEnabled && permission !== "granted") {
      nextPerm = await requestNotificationPermission();
      setPermission(nextPerm);
    }

    const updated = { ...prefs, enabled: nextEnabled };
    setPrefs(updated);
    saveVratNotificationPrefs(updated);
    onPrefsUpdated?.(updated);
    playSingingBowlChime();
  };

  const handleRequestPermission = async () => {
    const perm = await requestNotificationPermission();
    setPermission(perm);
    if (perm === "granted") {
      const updated = { ...prefs, enabled: true };
      setPrefs(updated);
      saveVratNotificationPrefs(updated);
      onPrefsUpdated?.(updated);
      playSingingBowlChime();
      setTestResult({
        success: true,
        message: "Browser notification permission granted! You will receive 24-hour advance Vrat alerts."
      });
    } else if (perm === "denied") {
      setTestResult({
        success: false,
        message: "Notifications are blocked in your browser settings. Please click the lock/settings icon in your address bar to allow notifications."
      });
    }
  };

  const handleToggleCategory = (categoryKey: keyof VratNotificationPreferences["categories"]) => {
    const updated = {
      ...prefs,
      categories: {
        ...prefs.categories,
        [categoryKey]: !prefs.categories[categoryKey]
      }
    };
    setPrefs(updated);
    saveVratNotificationPrefs(updated);
    onPrefsUpdated?.(updated);
  };

  const handleToggleWeeklyDay = (dayIndex: number) => {
    const currentDays = [...prefs.weeklyDays];
    const exists = currentDays.includes(dayIndex);
    const updatedDays = exists
      ? currentDays.filter((d) => d !== dayIndex)
      : [...currentDays, dayIndex].sort();

    const updated = { ...prefs, weeklyDays: updatedDays };
    setPrefs(updated);
    saveVratNotificationPrefs(updated);
    onPrefsUpdated?.(updated);
  };

  const handleToggleVratSubscription = (vratId: string) => {
    const current = [...prefs.subscribedVratIds];
    const exists = current.includes(vratId);
    const updatedIds = exists ? current.filter((id) => id !== vratId) : [...current, vratId];

    const updated = { ...prefs, subscribedVratIds: updatedIds };
    setPrefs(updated);
    saveVratNotificationPrefs(updated);
    onPrefsUpdated?.(updated);
    playCardFlipSound();
  };

  const handleAdvanceHoursChange = (hours: number) => {
    const updated = { ...prefs, advanceHours: hours };
    setPrefs(updated);
    saveVratNotificationPrefs(updated);
    onPrefsUpdated?.(updated);
  };

  const handlePreferredTimeChange = (time: string) => {
    const updated = { ...prefs, preferredTime: time };
    setPrefs(updated);
    saveVratNotificationPrefs(updated);
    onPrefsUpdated?.(updated);
  };

  const handleSoundToggle = () => {
    const updated = { ...prefs, soundEnabled: !prefs.soundEnabled };
    setPrefs(updated);
    saveVratNotificationPrefs(updated);
    onPrefsUpdated?.(updated);
    if (updated.soundEnabled) playSingingBowlChime();
  };

  const handleTestNotification = () => {
    if (prefs.soundEnabled) {
      playSingingBowlChime();
    }
    const res = triggerTestVrat24hNotification();
    setTestResult(res);
  };

  const handleExportCalendar = () => {
    exportVratCalendarIcs(upcomingAlerts);
    playSingingBowlChime();
    setTestResult({
      success: true,
      message: "Dev-Guru_Vrat_24h_Advance_Alerts.ics downloaded! You can import this into Google Calendar, Apple Calendar, or Outlook."
    });
  };

  if (!isOpen) return null;

  const weekdays = [
    { index: 1, name: "Mon (सोम)", deity: "Shiva" },
    { index: 2, name: "Tue (मंगल)", deity: "Hanuman" },
    { index: 3, name: "Wed (बुध)", deity: "Ganesha" },
    { index: 4, name: "Thu (गुरु)", deity: "Vishnu/Brihaspati" },
    { index: 5, name: "Fri (शुक्र)", deity: "Lakshmi/Santoshi" },
    { index: 6, name: "Sat (शनि)", deity: "Shani Dev" },
    { index: 0, name: "Sun (रवि)", deity: "Surya Dev" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative w-full max-w-4xl bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/60 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
              <BellRing className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
                  Vrat 24-Hour Advance Push Notifications
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 border border-amber-500/40 text-amber-300">
                  24h Shastra Alert
                </span>
              </div>
              <p className="text-xs text-amber-200/70 mt-0.5">
                Set custom, persistent desktop or mobile browser alerts 24 hours in advance to prepare Dashami satvik meals, puja samagri, and sankalp.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-amber-300 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master Push Toggle Status Banner */}
        <div className="px-6 py-4 bg-slate-950/70 border-b border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-3.5 h-3.5 rounded-full ${
                prefs.enabled && permission === "granted"
                  ? "bg-emerald-500 shadow-[0_0_10px_#10b981]"
                  : permission === "denied"
                  ? "bg-rose-500 shadow-[0_0_10px_#f43f5e]"
                  : "bg-amber-500 shadow-[0_0_10px_#f59e0b]"
              }`}
            />
            <div>
              <div className="text-xs font-bold text-amber-100 flex items-center gap-2">
                <span>Push Alerts Status:</span>
                <span
                  className={`font-semibold ${
                    prefs.enabled && permission === "granted"
                      ? "text-emerald-400"
                      : permission === "denied"
                      ? "text-rose-400"
                      : "text-amber-400"
                  }`}
                >
                  {prefs.enabled && permission === "granted"
                    ? "Active & Enabled (24h Advance Alerts Live)"
                    : permission === "denied"
                    ? "Permission Blocked in Browser"
                    : prefs.enabled
                    ? "Permission Required"
                    : "Disabled by User"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {permission === "granted"
                  ? "Your browser is fully authorized to deliver high-priority 24-hour advance Vrat notifications."
                  : permission === "denied"
                  ? "Please click your browser address bar icon to unblock notifications for this site."
                  : "Click 'Authorize Browser' to allow instant popups before fasting days."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {permission !== "granted" && (
              <button
                onClick={handleRequestPermission}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 hover:brightness-110 shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Authorize Browser</span>
              </button>
            )}

            {/* Master Toggle Switch */}
            <button
              onClick={handleToggleMaster}
              className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                prefs.enabled ? "bg-amber-500" : "bg-slate-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-slate-950 shadow-lg ring-0 transition duration-200 ease-in-out ${
                  prefs.enabled ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 pb-2 bg-slate-900 border-b border-slate-800">
          <button
            onClick={() => setActiveSubTab("preferences")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === "preferences"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>24h Alert Preferences & Categories</span>
          </button>

          <button
            onClick={() => setActiveSubTab("upcoming")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === "upcoming"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Upcoming 24h Queue ({upcomingAlerts.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab("vrat_selector")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === "vrat_selector"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Custom Vrat Selector ({prefs.subscribedVratIds.length})</span>
          </button>
        </div>

        {/* Test Result / Toast Banner */}
        {testResult && (
          <div
            className={`mx-6 mt-4 p-3 rounded-2xl border text-xs flex items-center justify-between ${
              testResult.success
                ? "bg-emerald-950/70 border-emerald-500/40 text-emerald-200"
                : "bg-amber-950/70 border-amber-500/40 text-amber-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              <span>{testResult.message}</span>
            </div>
            <button
              onClick={() => setTestResult(null)}
              className="text-xs opacity-70 hover:opacity-100 ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Modal Body with Scrolling Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200 text-xs">
          {/* TAB 1: PREFERENCES & CATEGORIES */}
          {activeSubTab === "preferences" && (
            <div className="space-y-6">
              {/* Timing & Sound Settings Card */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-amber-500/20 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Advance Timing Option */}
                <div className="space-y-1.5">
                  <label className="text-amber-300 font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Advance Reminder Window</span>
                  </label>
                  <p className="text-[11px] text-slate-400">
                    How long before the Vrat starts should you receive the alert?
                  </p>
                  <select
                    value={prefs.advanceHours}
                    onChange={(e) => handleAdvanceHoursChange(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-amber-200 font-semibold focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value={24}>24 Hours in Advance (Recommended · Dashami Morning)</option>
                    <option value={12}>12 Hours in Advance (Previous Evening)</option>
                    <option value={48}>48 Hours in Advance (2 Days Prior Prep)</option>
                    <option value={6}>6 Hours in Advance (Brahma Muhurta Prep)</option>
                  </select>
                </div>

                {/* Preferred Alert Time */}
                <div className="space-y-1.5">
                  <label className="text-amber-300 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Preferred Alert Time</span>
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Time on the previous day to deliver the 24h preparation guide.
                  </p>
                  <select
                    value={prefs.preferredTime}
                    onChange={(e) => handlePreferredTimeChange(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-amber-200 font-semibold focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="06:00">06:00 AM (Sunrise Alert)</option>
                    <option value="07:00">07:00 AM (Morning Routine)</option>
                    <option value="12:00">12:00 PM (Midday Dashami Prep)</option>
                    <option value="18:00">06:00 PM (Sunset / Evening Prep)</option>
                    <option value="20:00">08:00 PM (Night Before Fast)</option>
                  </select>
                </div>

                {/* Sound Chime Toggle */}
                <div className="space-y-1.5 flex flex-col justify-between">
                  <div>
                    <label className="text-amber-300 font-bold flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Sacred Temple Bell Sound</span>
                    </label>
                    <p className="text-[11px] text-slate-400">
                      Play peaceful Tibetan singing bowl / temple bell on alert trigger.
                    </p>
                  </div>
                  <button
                    onClick={handleSoundToggle}
                    className={`mt-2 px-3 py-2 rounded-xl font-bold flex items-center justify-between border cursor-pointer ${
                      prefs.soundEnabled
                        ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                        : "bg-slate-800 border-slate-700 text-slate-400"
                    }`}
                  >
                    <span>{prefs.soundEnabled ? "Temple Chime Enabled" : "Silent Alert"}</span>
                    {prefs.soundEnabled ? (
                      <Volume2 className="w-4 h-4 text-amber-400" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Vrat Categories Selection Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold font-serif text-amber-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Select Vrat Categories for 24-Hour Advance Alerts</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">Toggle on/off as desired</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    {
                      key: "ekadashi" as const,
                      label: "All 24 Ekadashis",
                      hindi: "सम्पूर्ण 24 एकादशी व्रत",
                      desc: "Nirjala, Devshayani, Devutthana, Papankusha, etc.",
                      icon: Sparkles
                    },
                    {
                      key: "pradosh" as const,
                      label: "All 7 Pradosh Vrats",
                      hindi: "त्रयोदशी प्रदोष व्रत",
                      desc: "Som, Bhauma, Shani Pradosh twilight Shiva fasts",
                      icon: Flame
                    },
                    {
                      key: "weekly" as const,
                      label: "Weekly Planetary Vrats",
                      hindi: "साप्ताहिक वार व्रत",
                      desc: "Somvar (Shiva), Mangalvar (Hanuman), Brihaspativar",
                      icon: Calendar
                    },
                    {
                      key: "purnimaAmavasya" as const,
                      label: "Purnima & Amavasya",
                      hindi: "पूर्णिमा एवं अमावस्या व्रत",
                      desc: "Satyanarayan Purnima, Somvati Amavasya",
                      icon: Star
                    },
                    {
                      key: "chaturthi" as const,
                      label: "Ganesha Chaturthi",
                      hindi: "संकष्टी एवं विनायक चतुर्थी",
                      desc: "Sankashti Moonrise fast & Vinayaka Chaturthi",
                      icon: CheckCircle2
                    },
                    {
                      key: "shivratri" as const,
                      label: "Maha & Masik Shivratri",
                      hindi: "महाशिवरात्रि एवं मासिक शिवरात्रि",
                      desc: "Char-Prahar Nishita Kaal Shiva sadhana",
                      icon: Flame
                    },
                    {
                      key: "navratri" as const,
                      label: "Navratri Durga Fasts",
                      hindi: "चैत्र, शारदीय एवं गुप्त नवरात्रि",
                      desc: "9-day sacred Shakta fasting with Ghatasthapana",
                      icon: Shield
                    },
                    {
                      key: "nakshatra" as const,
                      label: "28 Nakshatra Vratas",
                      hindi: "नक्षत्र देवता व्रत",
                      desc: "Monthly fast aligned with your Janma Nakshatra",
                      icon: Star
                    },
                    {
                      key: "guptRare" as const,
                      label: "Gupt & Rare Puranic Vrats",
                      hindi: "दुर्लभ पौराणिक व्रत",
                      desc: "Rohini, Bhishma Panchak, Varaha Dwadashi",
                      icon: Lock
                    }
                  ].map((cat) => {
                    const isChecked = prefs.categories[cat.key];
                    const Icon = cat.icon;
                    return (
                      <div
                        key={cat.key}
                        onClick={() => handleToggleCategory(cat.key)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          isChecked
                            ? "bg-amber-950/50 border-amber-500/50 shadow-sm"
                            : "bg-slate-950/40 border-slate-800 hover:border-slate-700 opacity-75"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                                isChecked
                                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                                  : "bg-slate-800 text-slate-400"
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="font-bold text-amber-100">{cat.label}</div>
                              <div className="text-[10px] text-amber-300/80">{cat.hindi}</div>
                            </div>
                          </div>

                          <div
                            className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors ${
                              isChecked
                                ? "bg-amber-500 border-amber-400 text-slate-950"
                                : "border-slate-700 bg-slate-900"
                            }`}
                          >
                            {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">{cat.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Weekly Days Selector (if Weekly is enabled) */}
              {prefs.categories.weekly && (
                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-200 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span>Select Specific Weekly Fasting Days:</span>
                    </span>
                    <span className="text-[11px] text-amber-300/80">Alert sent every week 24h prior</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                    {weekdays.map((day) => {
                      const isSelected = prefs.weeklyDays.includes(day.index);
                      return (
                        <button
                          key={day.index}
                          onClick={() => handleToggleWeeklyDay(day.index)}
                          className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                            isSelected
                              ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                              : "bg-slate-900 border-slate-700 text-slate-300 hover:border-amber-500/40"
                          }`}
                        >
                          <div>{day.name}</div>
                          <div className={`text-[10px] font-normal ${isSelected ? "text-slate-900" : "text-amber-400/80"}`}>
                            {day.deity}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Buttons: Test Notification & Sync Calendar */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <Info className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Test your notification delivery or export all 24h alerts to your phone's calendar app.
                  </span>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={handleTestNotification}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Test 24h Push Alert</span>
                  </button>

                  <button
                    onClick={handleExportCalendar}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 hover:brightness-110 shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Calendar (.ics)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: UPCOMING 24-HOUR QUEUE */}
          {activeSubTab === "upcoming" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-slate-400">
                  Real-time preview of upcoming Vrats scheduled for 24-hour advance preparation alerts based on your active subscriptions:
                </p>
                <button
                  onClick={handleExportCalendar}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .ICS File</span>
                </button>
              </div>

              <div className="space-y-3">
                {upcomingAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                          ⏰
                        </span>
                        <div>
                          <div className="font-bold text-amber-100 text-sm flex items-center gap-2">
                            <span>{alert.vratName}</span>
                            <span className="px-2 py-0.5 rounded-full text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold uppercase">
                              {alert.category}
                            </span>
                          </div>
                          <div className="text-[11px] text-amber-300/80">
                            Deity: {alert.deity} · Method: {alert.fastingMethod}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="bg-amber-950/80 px-3 py-1 rounded-xl border border-amber-500/30 text-right">
                          <div className="text-[10px] text-slate-400 uppercase">Alert Delivery Date</div>
                          <div className="font-mono text-xs font-bold text-amber-300">{alert.alertDate} (24h Prior)</div>
                        </div>
                        <div className="bg-slate-900 px-3 py-1 rounded-xl border border-slate-700 text-right">
                          <div className="text-[10px] text-slate-400 uppercase">Vrat Fasting Date</div>
                          <div className="font-mono text-xs font-bold text-slate-200">{alert.fastingDate}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] space-y-1.5">
                      <div className="text-amber-200">
                        <strong className="text-amber-400">24-Hour Preparation Advice: </strong>
                        {alert.preparationAdvice}
                      </div>
                      <div className="text-slate-300">
                        <strong className="text-slate-400">Allowed Foods: </strong>
                        {alert.permittedFoodsSummary}
                      </div>
                      <div className="text-amber-300/90 font-serif">
                        <strong>Sacred Chanting Mantra: </strong>
                        {alert.mantra}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOM VRAT SELECTOR */}
          {activeSubTab === "vrat_selector" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-slate-400">
                  Select or unselect specific Vrats to receive customized 24-hour advance push notifications.
                </p>
                <input
                  type="text"
                  value={selectedVratSearch}
                  onChange={(e) => setSelectedVratSearch(e.target.value)}
                  placeholder="Filter specific vrats..."
                  className="px-3.5 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-amber-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
                {ALL_VRATS_CATALOG.filter(
                  (v) =>
                    v.name.toLowerCase().includes(selectedVratSearch.toLowerCase()) ||
                    v.nameHindi.toLowerCase().includes(selectedVratSearch.toLowerCase()) ||
                    v.deity.toLowerCase().includes(selectedVratSearch.toLowerCase())
                ).map((vrat) => {
                  const isSubscribed = prefs.subscribedVratIds.includes(vrat.id);
                  return (
                    <button
                      key={vrat.id}
                      onClick={() => handleToggleVratSubscription(vrat.id)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between gap-2 transition-all cursor-pointer ${
                        isSubscribed
                          ? "bg-amber-950/60 border-amber-500/60 shadow-sm"
                          : "bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-400"
                      }`}
                    >
                      <div>
                        <div className={`font-bold text-xs ${isSubscribed ? "text-amber-100" : "text-slate-300"}`}>
                          {vrat.name}
                        </div>
                        <div className="text-[10px] text-amber-400/80">{vrat.nameHindi}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{vrat.deity}</div>
                      </div>

                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center border shrink-0 ${
                          isSubscribed
                            ? "bg-amber-500 border-amber-400 text-slate-950 shadow-xs"
                            : "border-slate-700 bg-slate-900 text-slate-600"
                        }`}
                      >
                        {isSubscribed ? <Bell className="w-3.5 h-3.5 fill-current" /> : <BellOff className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Preferences saved automatically in your browser storage.</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-md cursor-pointer"
          >
            Save & Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
