import React, { useState, useEffect } from "react";
import { UserProfile, TransitMovementAlerts, TransitNotificationSettings } from "../types";
import { 
  Sparkles, 
  AlertTriangle, 
  ShieldAlert, 
  X, 
  ChevronRight, 
  Bell, 
  Zap, 
  Compass, 
  Sun, 
  Moon,
  MapPin, 
  Settings, 
  Sliders,
  CheckCircle2,
  Filter,
  Eye,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Flame,
  Award
} from "lucide-react";
import { 
  checkAndTriggerDailyPanchangNotification, 
  PanchangNotificationItem 
} from "../services/dailyPanchangNotificationService";
import { TransitAlertSettingsModal, DEFAULT_TRANSIT_SETTINGS, DEFAULT_MOVEMENT_ALERTS } from "./TransitAlertSettingsModal";

export interface TransitNotification {
  id: string;
  planet: "Saturn" | "Jupiter" | "Rahu" | "Mars" | "Sun" | "Moon" | "Mercury" | "Venus";
  movementType: keyof TransitMovementAlerts;
  title: string;
  message: string;
  affectedRashi: string;
  severity: "High Impact" | "Favorable Transit" | "Cautionary Axis";
  remedy: string;
  timestamp: string;
}

const ALL_RASHIS = [
  { en: "Aries", hi: "मेष" },
  { en: "Taurus", hi: "वृषभ" },
  { en: "Gemini", hi: "मिथुन" },
  { en: "Cancer", hi: "कर्क" },
  { en: "Leo", hi: "सिंह" },
  { en: "Virgo", hi: "कन्या" },
  { en: "Libra", hi: "तुला" },
  { en: "Scorpio", hi: "वृश्चिक" },
  { en: "Sagittarius", hi: "धनु" },
  { en: "Capricorn", hi: "मकर" },
  { en: "Aquarius", hi: "कुंभ" },
  { en: "Pisces", hi: "मीन" }
];

interface TransitToastContainerProps {
  userProfile: UserProfile;
  onUpdateProfile?: (updatedProfile: UserProfile) => void;
  onNavigateToAstrology?: () => void;
  onNavigateToPanchang?: () => void;
}

export const TransitToastContainer: React.FC<TransitToastContainerProps> = ({
  userProfile,
  onUpdateProfile = (_p: UserProfile) => {},
  onNavigateToAstrology,
  onNavigateToPanchang,
}) => {
  const [toasts, setToasts] = useState<TransitNotification[]>([]);
  const [panchangToast, setPanchangToast] = useState<PanchangNotificationItem | null>(null);
  const [isAlertActive, setIsAlertActive] = useState<boolean>(true);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isQuickPanelOpen, setIsQuickPanelOpen] = useState<boolean>(false);

  // Active settings derived from userProfile with fallback defaults
  const settings: TransitNotificationSettings = userProfile.transitSettings || DEFAULT_TRANSIT_SETTINGS;
  const movementTypes: TransitMovementAlerts = settings.movementTypes || DEFAULT_MOVEMENT_ALERTS;
  const targetRashi = userProfile.rashi || "Taurus";

  // Re-generate toasts tailored to user's Rashi & granular movement settings
  useEffect(() => {
    // Generate daily Panchang notification for user's location
    const pItem = checkAndTriggerDailyPanchangNotification(userProfile, true);
    if (pItem) {
      setPanchangToast(pItem);
    }

    const userRashi = userProfile.rashi || "Taurus";
    const userNakshatra = userProfile.nakshatra || "Rohini";

    // Check if toast alerts are disabled by user preference
    if (settings.toastAlertsEnabled === false) {
      setToasts([]);
      return;
    }

    const allCandidateToasts: TransitNotification[] = [
      {
        id: "t_jupiter",
        planet: "Jupiter",
        movementType: "jupiterMajorTransits",
        title: `Jupiter Direct Ingress for ${userRashi}`,
        message: `Guru Brihaspati moves direct in your 2nd House of Wealth. High financial expansion & family blessing for ${userRashi} natives.`,
        affectedRashi: userRashi,
        severity: "Favorable Transit",
        remedy: "Chant 'Om Gram Greem Groom Sah Gurave Namah' 108x on Thursdays.",
        timestamp: "Just now",
      },
      {
        id: "t_saturn",
        planet: "Saturn",
        movementType: "saturnReturnSadeSati",
        title: `Saturn Return / Sade Sati Axis Alert`,
        message: `Saturn's 3rd aspect touches ${userRashi} (${userNakshatra} nakshatra). Workload consolidation & career discipline required.`,
        affectedRashi: userRashi,
        severity: "Cautionary Axis",
        remedy: "Offer sesame oil lamp to Lord Shani on Saturday evenings.",
        timestamp: "2 mins ago",
      },
      {
        id: "t_retrograde",
        planet: "Mercury",
        movementType: "retrogradeAlerts",
        title: `Mercury Stationing Retrograde (Vakri)`,
        message: `Mercury enters Vakri phase in 3rd House from ${userRashi}. Re-check contract clauses & digital payments.`,
        affectedRashi: userRashi,
        severity: "Cautionary Axis",
        remedy: "Chant 'Om Bum Budhaya Namah' 108x on Wednesday morning.",
        timestamp: "5 mins ago",
      },
      {
        id: "t_eclipse",
        planet: "Sun",
        movementType: "eclipseWarnings",
        title: `Surya Grahan (Solar Eclipse) Warning`,
        message: `Solar Eclipse window affects ${userRashi} natal axis. Sutak Kaal begins 6 hrs prior; maintain spiritual mindfulness.`,
        affectedRashi: userRashi,
        severity: "High Impact",
        remedy: "Recite Aditya Hrudayam or Mahamrityunjaya Stotram during eclipse.",
        timestamp: "10 mins ago",
      },
      {
        id: "t_moon",
        planet: "Moon",
        movementType: "moonSignChanges",
        title: `Moon 2.5-Day Gochar Transit Shift`,
        message: `Moon enters friendly sign, activating 11th House of Gains for ${userRashi}. High emotional clarity & social gains.`,
        affectedRashi: userRashi,
        severity: "Favorable Transit",
        remedy: "Offer water to Chandra Dev (Moon Arghya) tonight.",
        timestamp: "15 mins ago",
      },
    ];

    // Filter candidate toasts according to user's granular transitSettings preferences
    const filteredToasts = allCandidateToasts.filter((toast) => {
      // 1. Filter by Granular Movement Type preference
      if (movementTypes[toast.movementType] === false) {
        return false;
      }

      // 2. Filter by Planet Alert preference
      if (toast.planet === "Jupiter" && settings.planetAlerts.Jupiter === false) return false;
      if (toast.planet === "Saturn" && settings.planetAlerts.Saturn === false) return false;
      if (toast.planet === "Rahu" && settings.planetAlerts.RahuKetu === false) return false;
      if (toast.planet === "Mars" && settings.planetAlerts.Mars === false) return false;
      if (toast.planet === "Sun" && settings.planetAlerts.Sun === false) return false;
      if (toast.planet === "Moon" && settings.planetAlerts.Moon === false) return false;

      // 3. Filter by Severity
      if (
        settings.minimumImpactSeverity === "Favorable Transits Only" &&
        toast.severity !== "Favorable Transit"
      ) {
        return false;
      }
      if (
        settings.minimumImpactSeverity === "High Impact Only" &&
        toast.severity === "Cautionary Axis"
      ) {
        return false;
      }

      return true;
    });

    // Display initial active toasts
    setToasts(filteredToasts.slice(0, 2));
  }, [userProfile.rashi, userProfile.nakshatra, userProfile.place, userProfile.transitSettings]);

  const handleDismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleDismissPanchang = () => {
    setPanchangToast(null);
  };

  // Toggle granular movement alert setting directly from Toast Container
  const handleToggleGranularMovement = (mKey: keyof TransitMovementAlerts) => {
    const updatedMovements = {
      ...movementTypes,
      [mKey]: !movementTypes[mKey],
    };
    const updatedSettings: TransitNotificationSettings = {
      ...settings,
      movementTypes: updatedMovements,
    };
    onUpdateProfile({
      ...userProfile,
      transitSettings: updatedSettings,
    });
  };

  // Toggle Planet alert directly
  const handleTogglePlanetAlert = (planetKey: keyof TransitNotificationSettings["planetAlerts"]) => {
    const updatedPlanets = {
      ...settings.planetAlerts,
      [planetKey]: !settings.planetAlerts[planetKey],
    };
    const updatedSettings: TransitNotificationSettings = {
      ...settings,
      planetAlerts: updatedPlanets,
    };
    onUpdateProfile({
      ...userProfile,
      transitSettings: updatedSettings,
    });
  };

  // Switch affected Rashi directly in container
  const handleSelectRashi = (newRashi: string) => {
    onUpdateProfile({
      ...userProfile,
      rashi: newRashi,
    });
  };

  // Trigger instant simulation for a specific movement type
  const handleSimulateMovementAlert = (mType: keyof TransitMovementAlerts) => {
    const rashi = userProfile.rashi || "Taurus";

    const SIMULATION_MAP: Record<keyof TransitMovementAlerts, TransitNotification> = {
      saturnReturnSadeSati: {
        id: "sim_" + Date.now(),
        planet: "Saturn",
        movementType: "saturnReturnSadeSati",
        title: `Saturn Sade Sati / Shani Return for ${rashi}`,
        message: `Shani Dev activates 2nd house phase for ${rashi}. Practice discipline in financial savings and speech.`,
        affectedRashi: rashi,
        severity: "Cautionary Axis",
        remedy: "Recite Hanuman Chalisa 7 times on Saturday evenings.",
        timestamp: "Just now",
      },
      moonSignChanges: {
        id: "sim_" + Date.now(),
        planet: "Moon",
        movementType: "moonSignChanges",
        title: `Moon Chandrashtama Gochar Warning`,
        message: `Moon enters 8th house from ${rashi} for 2.5 days. Avoid heated arguments and risky night travel.`,
        affectedRashi: rashi,
        severity: "Cautionary Axis",
        remedy: "Drink water in a silver cup & chant 'Om Som Somaya Namah'.",
        timestamp: "Just now",
      },
      rahuKetuAxisShifts: {
        id: "sim_" + Date.now(),
        planet: "Rahu",
        movementType: "rahuKetuAxisShifts",
        title: `Rahu-Ketu 18-Month Axis Shift Alert`,
        message: `Rahu enters 11th House of Gains for ${rashi}. Sudden breakthroughs in global business & investments predicted.`,
        affectedRashi: rashi,
        severity: "High Impact",
        remedy: "Feed black dogs or birds on Saturdays.",
        timestamp: "Just now",
      },
      retrogradeAlerts: {
        id: "sim_" + Date.now(),
        planet: "Mercury",
        movementType: "retrogradeAlerts",
        title: `Mercury Vakri (Retrograde) Alert`,
        message: `Mercury stations Retrograde in 10th House of career for ${rashi}. Review agreements carefully before signing.`,
        affectedRashi: rashi,
        severity: "Cautionary Axis",
        remedy: "Donate green moong dal on Wednesday morning.",
        timestamp: "Just now",
      },
      eclipseWarnings: {
        id: "sim_" + Date.now(),
        planet: "Sun",
        movementType: "eclipseWarnings",
        title: `Surya Grahan (Solar Eclipse) Alert`,
        message: `Solar Eclipse occurring in natal axis for ${rashi}. Sutak Kaal window active; engage in meditation.`,
        affectedRashi: rashi,
        severity: "High Impact",
        remedy: "Recite Gayatri Mantra or Mahamrityunjaya Stotram.",
        timestamp: "Just now",
      },
      jupiterMajorTransits: {
        id: "sim_" + Date.now(),
        planet: "Jupiter",
        movementType: "jupiterMajorTransits",
        title: `Jupiter Trikona Blessing Ingress`,
        message: `Guru Brihaspati casts 9th House Grace over ${rashi}. High spiritual luck & wealth expansion activated!`,
        affectedRashi: rashi,
        severity: "Favorable Transit",
        remedy: "Offer yellow flowers & chana dal at Lord Vishnu temple.",
        timestamp: "Just now",
      },
      combustAlerts: {
        id: "sim_" + Date.now(),
        planet: "Venus",
        movementType: "combustAlerts",
        title: `Venus Combust (Asta) Caution Alert`,
        message: `Venus becomes combust near Sun for ${rashi}. Postpone major luxury purchases or marriage negotiations.`,
        affectedRashi: rashi,
        severity: "Cautionary Axis",
        remedy: "Light ghee lamp for Goddess Lakshmi on Fridays.",
        timestamp: "Just now",
      },
      sunSankranti: {
        id: "sim_" + Date.now(),
        planet: "Sun",
        movementType: "sunSankranti",
        title: `Monthly Sun Sankranti Ingress`,
        message: `Sun enters 10th House of career authority for ${rashi}. Leadership recognition & boss favor boosted!`,
        affectedRashi: rashi,
        severity: "Favorable Transit",
        remedy: "Offer Arghya (water) to Lord Surya at sunrise.",
        timestamp: "Just now",
      },
    };

    const newToast = SIMULATION_MAP[mType] || SIMULATION_MAP.saturnReturnSadeSati;
    setToasts((prev) => [newToast, ...prev]);
  };

  const MOVEMENT_TOGGLES: {
    key: keyof TransitMovementAlerts;
    label: string;
    iconText: string;
    description: string;
  }[] = [
    {
      key: "moonSignChanges",
      label: "🌙 Moon Gochar Transits",
      iconText: "Moon",
      description: "2.5-day lunar shifts & Chandrashtama alerts",
    },
    {
      key: "saturnReturnSadeSati",
      label: "🪐 Saturn Return & Sade Sati",
      iconText: "Saturn",
      description: "Shani Dhaiya, Sade Sati & aspect shifts",
    },
    {
      key: "jupiterMajorTransits",
      label: "♃ Jupiter Major Ingress",
      iconText: "Jupiter",
      description: "Guru Trikona blessings & wealth transits",
    },
    {
      key: "rahuKetuAxisShifts",
      label: "🐍 Rahu-Ketu Axis Shifts",
      iconText: "Rahu",
      description: "18-month node changes & karmic shifts",
    },
    {
      key: "retrogradeAlerts",
      label: "☿ Mercury Retrogrades",
      iconText: "Merc",
      description: "Vakri stations & communication cautions",
    },
    {
      key: "eclipseWarnings",
      label: "☀️ Solar & Lunar Eclipses",
      iconText: "Sun",
      description: "Surya/Chandra Grahan & Sutak Kaal alerts",
    },
    {
      key: "combustAlerts",
      label: "♀ Venus Combust (Asta)",
      iconText: "Venus",
      description: "Planetary combust warning alerts",
    },
    {
      key: "sunSankranti",
      label: "☀️ Monthly Sun Sankranti",
      iconText: "Sun",
      description: "Monthly solar zodiac ingress alerts",
    },
  ];

  return (
    <>
      {/* Full Settings Modal */}
      <TransitAlertSettingsModal
        userProfile={userProfile}
        onUpdateProfile={onUpdateProfile}
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onSimulateAlert={(mType) => {
          setIsAlertActive(true);
          handleSimulateMovementAlert(mType);
        }}
      />

      {/* Floating Transit Toast Overlay Container */}
      {!isAlertActive || (toasts.length === 0 && !panchangToast && !isQuickPanelOpen) ? (
        <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="p-2.5 bg-slate-900/95 text-amber-300 border border-amber-500/40 rounded-2xl text-xs font-bold shadow-2xl hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1.5"
            title="Open Full Transit Notification Settings"
          >
            <Sliders className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Transit Settings</span>
          </button>

          <button
            onClick={() => {
              setIsAlertActive(true);
              handleSimulateMovementAlert("moonSignChanges");
            }}
            className="px-4 py-2.5 bg-slate-900/95 text-amber-300 border border-amber-500/40 rounded-2xl text-xs font-bold shadow-2xl hover:bg-slate-800 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Bell className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Simulate {targetRashi} Transit Alert</span>
          </button>
        </div>
      ) : (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm sm:max-w-md w-full space-y-3 pointer-events-none">
          {/* QUICK GRANULAR NOTIFICATION SETTINGS PANEL */}
          {isQuickPanelOpen && (
            <div className="pointer-events-auto bg-slate-950/95 text-amber-100 backdrop-blur-md p-5 rounded-3xl border border-amber-500/50 shadow-2xl space-y-4 animate-in slide-in-from-bottom-4 duration-300 max-h-[85vh] overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <h4 className="font-serif font-bold text-sm text-amber-200">
                    Granular Transit Alert Toggles
                  </h4>
                </div>
                <button
                  onClick={() => setIsQuickPanelOpen(false)}
                  className="text-amber-400/60 hover:text-amber-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* RASHI IMPACT TARGET SELECTOR */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  Impact Target Rashi (Moon Sign):
                </label>
                <select
                  value={targetRashi}
                  onChange={(e) => handleSelectRashi(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-200 text-xs font-bold cursor-pointer focus:outline-none focus:border-amber-400"
                >
                  {ALL_RASHIS.map((r) => (
                    <option key={r.en} value={r.en}>
                      {r.hi} ({r.en})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-amber-200/60 font-serif">
                  Transits & Gochar movements will evaluate aspects against {targetRashi}.
                </p>
              </div>

              {/* GRANULAR MOVEMENT TOGGLES */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-amber-300 flex items-center justify-between">
                  <span>Toggle Specific Movements:</span>
                  <button
                    onClick={() => setIsSettingsModalOpen(true)}
                    className="text-[10px] text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>Advanced Rules</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {MOVEMENT_TOGGLES.map((m) => {
                    const isEnabled = movementTypes[m.key];
                    return (
                      <div
                        key={m.key}
                        className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
                          isEnabled
                            ? "bg-amber-950/40 border-amber-500/50 text-amber-100"
                            : "bg-slate-900/60 border-slate-800 text-slate-400 opacity-75"
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="font-bold text-xs flex items-center gap-1.5">
                            <span>{m.label}</span>
                          </div>
                          <div className="text-[10px] text-amber-200/70 font-serif">
                            {m.description}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Simulate Quick Test Button */}
                          <button
                            onClick={() => handleSimulateMovementAlert(m.key)}
                            className="p-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-bold border border-amber-500/30 transition-all cursor-pointer"
                            title={`Simulate ${m.label} Toast`}
                          >
                            Test
                          </button>

                          {/* Toggle Switch */}
                          <button
                            onClick={() => handleToggleGranularMovement(m.key)}
                            className={`w-10 h-5 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                              isEnabled ? "bg-amber-500" : "bg-slate-800"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full bg-slate-950 shadow-md transition-transform ${
                                isEnabled ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* FOOTER ACTION */}
              <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs">
                <button
                  onClick={() => setIsSettingsModalOpen(true)}
                  className="text-amber-300 font-bold hover:underline flex items-center gap-1"
                >
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>Full Notification Hub</span>
                </button>
                <button
                  onClick={() => setIsQuickPanelOpen(false)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
                >
                  Apply & Close
                </button>
              </div>
            </div>
          )}

          {/* Daily Panchang Notification Toast */}
          {panchangToast && (
            <div className="pointer-events-auto bg-slate-950/95 text-amber-100 backdrop-blur-md p-4 rounded-3xl border border-amber-500/50 shadow-2xl relative space-y-2 animate-in slide-in-from-bottom-5 duration-300">
              <button
                onClick={handleDismissPanchang}
                className="absolute top-3 right-3 text-amber-400/60 hover:text-amber-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sun className="w-3 h-3 text-amber-400" />
                  Daily Local Panchang
                </span>
                <span className="text-[10px] text-amber-200/60 font-medium flex items-center gap-0.5">
                  <MapPin className="w-2.5 h-2.5 text-amber-400" />
                  {panchangToast.locationName}
                </span>
              </div>

              <div>
                <h4 className="font-serif font-bold text-sm text-white">
                  {panchangToast.summaryHeadline}
                </h4>
                <p className="text-xs text-amber-100/80 leading-snug mt-1 font-serif">
                  {panchangToast.formattedAlertMessage}
                </p>
              </div>

              <div className="bg-emerald-950/60 p-2 rounded-xl border border-emerald-500/30 text-[11px] text-emerald-200 flex justify-between items-center">
                <span className="font-bold">✨ Abhijit Muhurat:</span>
                <span className="font-mono text-white">{panchangToast.abhijitWindow}</span>
              </div>

              <div className="flex justify-between items-center pt-1 text-xs">
                <button
                  onClick={() => {
                    if (onNavigateToPanchang) onNavigateToPanchang();
                    handleDismissPanchang();
                  }}
                  className="text-amber-300 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Location Muhurats</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleDismissPanchang}
                  className="text-[11px] text-amber-200/60 hover:text-amber-200 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Active Transit Toast Notifications */}
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="pointer-events-auto bg-slate-950/95 text-amber-100 backdrop-blur-md p-4 rounded-3xl border border-amber-500/40 shadow-2xl relative space-y-2 animate-in slide-in-from-bottom-5 duration-300"
            >
              {/* Close button */}
              <button
                onClick={() => handleDismiss(toast.id)}
                className="absolute top-3 right-3 text-amber-400/60 hover:text-amber-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Badge & Movement Type */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    toast.severity === "Favorable Transit"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : toast.severity === "High Impact"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                  }`}
                >
                  {toast.severity} • {toast.planet}
                </span>

                <span className="bg-slate-900 border border-amber-500/30 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  🎯 Rashi: {toast.affectedRashi}
                </span>

                <span className="text-[10px] text-amber-200/50 ml-auto">{toast.timestamp}</span>
              </div>

              {/* Body */}
              <div>
                <h4 className="font-serif font-bold text-sm text-amber-200 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  {toast.title}
                </h4>
                <p className="text-xs text-amber-100/80 leading-snug mt-1 font-serif">
                  {toast.message}
                </p>
              </div>

              {/* Remedy Footer */}
              <div className="bg-amber-900/30 p-2.5 rounded-2xl border border-amber-500/20 text-[11px] text-amber-200 space-y-0.5">
                <div className="font-bold text-amber-300 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" />
                  Vedic Remedial Action:
                </div>
                <div className="text-amber-100/90 italic font-serif">{toast.remedy}</div>
              </div>

              {/* CTA Actions */}
              <div className="flex justify-between items-center pt-1 text-xs">
                <button
                  onClick={() => {
                    if (onNavigateToAstrology) onNavigateToAstrology();
                    handleDismiss(toast.id);
                  }}
                  className="text-amber-300 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View Kundli Impact</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsQuickPanelOpen(!isQuickPanelOpen)}
                    className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sliders className="w-3 h-3" />
                    <span>Toggles</span>
                  </button>

                  <button
                    onClick={() => handleDismiss(toast.id)}
                    className="text-[11px] text-amber-200/60 hover:text-amber-200 cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom Controls Bar */}
          <div className="pointer-events-auto flex items-center justify-end gap-2">
            <button
              onClick={() => setIsQuickPanelOpen(!isQuickPanelOpen)}
              className="text-[11px] bg-slate-950/95 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-xl hover:bg-slate-900 font-bold flex items-center gap-1.5 cursor-pointer shadow-2xl"
              title="Quick Toggle Specific Movement Alerts"
            >
              <Filter className="w-3 h-3 text-amber-400" />
              <span>Granular Toggles ({targetRashi})</span>
              {isQuickPanelOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
            </button>

            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="text-[11px] bg-slate-950/95 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-xl hover:bg-slate-900 font-bold flex items-center gap-1.5 cursor-pointer shadow-2xl"
            >
              <Sliders className="w-3 h-3 text-amber-400" />
              <span>Full Settings</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
