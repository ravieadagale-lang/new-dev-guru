import React, { useState } from "react";
import { UserProfile, TransitNotificationSettings, TransitMovementAlerts } from "../types";
import { 
  X, 
  Bell, 
  Sliders, 
  Volume2, 
  VolumeX, 
  Mail, 
  Radio, 
  Check, 
  Sparkles, 
  Moon, 
  RotateCcw, 
  CheckCircle2, 
  ShieldAlert, 
  Zap, 
  Compass, 
  Flame, 
  Sun,
  Crown
} from "lucide-react";

export const DEFAULT_MOVEMENT_ALERTS: TransitMovementAlerts = {
  saturnReturnSadeSati: true,
  moonSignChanges: true,
  rahuKetuAxisShifts: true,
  retrogradeAlerts: true,
  eclipseWarnings: true,
  jupiterMajorTransits: true,
  combustAlerts: false,
  sunSankranti: true,
};

export const DEFAULT_TRANSIT_SETTINGS: TransitNotificationSettings = {
  pushEnabled: true,
  toastAlertsEnabled: true,
  soundAlertsEnabled: true,
  emailDigestEnabled: false,
  minimumImpactSeverity: "Favorable Transits Only",
  rashiFilter: "Moon Sign (Rashi)",
  planetAlerts: {
    Jupiter: true,
    Saturn: true,
    RahuKetu: true,
    Mars: true,
    Sun: true,
    Moon: true,
    Mercury: true,
    Venus: true,
  },
  movementTypes: DEFAULT_MOVEMENT_ALERTS,
  categories: {
    career: true,
    finance: true,
    love: true,
    health: true,
    remedies: true,
  },
  quietHoursEnabled: true,
  quietHoursStart: "22:00",
  quietHoursEnd: "07:00",
};

interface TransitAlertSettingsModalProps {
  userProfile: UserProfile;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
  isOpen: boolean;
  onClose: () => void;
  onSimulateAlert?: (movementType: keyof TransitMovementAlerts) => void;
}

export const TransitAlertSettingsModal: React.FC<TransitAlertSettingsModalProps> = ({
  userProfile,
  onUpdateProfile,
  isOpen,
  onClose,
  onSimulateAlert,
}) => {
  const [settings, setSettings] = useState<TransitNotificationSettings>(() => {
    const existing = userProfile.transitSettings || DEFAULT_TRANSIT_SETTINGS;
    return {
      ...existing,
      movementTypes: {
        ...DEFAULT_MOVEMENT_ALERTS,
        ...(existing.movementTypes || {}),
      },
    };
  });

  const [activeTab, setActiveTab] = useState<"movements" | "channels" | "planets" | "severity">("movements");
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>("");

  if (!isOpen) return null;

  const movementTypes = settings.movementTypes || DEFAULT_MOVEMENT_ALERTS;

  const handleToggleMovement = (key: keyof TransitMovementAlerts) => {
    const updatedMovements = {
      ...movementTypes,
      [key]: !movementTypes[key],
    };
    const updatedSettings = {
      ...settings,
      movementTypes: updatedMovements,
    };
    setSettings(updatedSettings);
    onUpdateProfile({ ...userProfile, transitSettings: updatedSettings });
  };

  const handleTogglePlanet = (planetKey: keyof TransitNotificationSettings["planetAlerts"]) => {
    const updatedPlanets = {
      ...settings.planetAlerts,
      [planetKey]: !settings.planetAlerts[planetKey],
    };
    const updatedSettings = {
      ...settings,
      planetAlerts: updatedPlanets,
    };
    setSettings(updatedSettings);
    onUpdateProfile({ ...userProfile, transitSettings: updatedSettings });
  };

  const handleToggleChannel = (channelKey: "pushEnabled" | "toastAlertsEnabled" | "soundAlertsEnabled" | "emailDigestEnabled") => {
    const updatedSettings = {
      ...settings,
      [channelKey]: !settings[channelKey],
    };
    setSettings(updatedSettings);
    onUpdateProfile({ ...userProfile, transitSettings: updatedSettings });
  };

  const handleSave = () => {
    onUpdateProfile({ ...userProfile, transitSettings: settings });
    setSaveSuccessMsg("Transit alert preferences saved successfully!");
    setTimeout(() => {
      setSaveSuccessMsg("");
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setSettings(DEFAULT_TRANSIT_SETTINGS);
    onUpdateProfile({ ...userProfile, transitSettings: DEFAULT_TRANSIT_SETTINGS });
    setSaveSuccessMsg("Reset to default transit notification rules.");
    setTimeout(() => setSaveSuccessMsg(""), 2000);
  };

  const MOVEMENT_CONFIGS: {
    key: keyof TransitMovementAlerts;
    title: string;
    icon: string;
    badge: string;
    badgeColor: string;
    description: string;
    example: string;
  }[] = [
    {
      key: "saturnReturnSadeSati",
      title: "Saturn Return & Sade Sati Shifts",
      icon: "🪐",
      badge: "Major Life Cycle",
      badgeColor: "bg-slate-800 text-amber-300 border-amber-500/30",
      description: "Receive warnings when Saturn enters the 12th, 1st, or 2nd house from your Moon or natal Saturn.",
      example: "Saturn enters 2nd phase Sade Sati — career consolidation remedy suggested.",
    },
    {
      key: "moonSignChanges",
      title: "Moon Sign Gochar (Every 2.5 Days)",
      icon: "🌙",
      badge: "Fast Daily Rhythm",
      badgeColor: "bg-indigo-900/60 text-indigo-300 border-indigo-500/30",
      description: "Track Moon moving through friendly/enemy signs and receive Chandrashtama caution warnings.",
      example: "Moon enters 8th house (Chandrashtama) — avoid signing heavy financial contracts today.",
    },
    {
      key: "rahuKetuAxisShifts",
      title: "Rahu-Ketu Nodal Axis Changes",
      icon: "🐍",
      badge: "18-Month Shifts",
      badgeColor: "bg-purple-900/60 text-purple-300 border-purple-500/30",
      description: "Get alerts when shadow planets Rahu & Ketu change zodiac signs, triggering karma realignments.",
      example: "Rahu enters 11th House of Gains — sudden foreign opportunities & wealth flow.",
    },
    {
      key: "retrogradeAlerts",
      title: "Planetary Retrograde & Direct Stations",
      icon: "🔄",
      badge: "Stationary Motion",
      badgeColor: "bg-amber-900/60 text-amber-300 border-amber-500/30",
      description: "Be notified when Mercury, Venus, Mars, Jupiter, or Saturn turn Retrograde (Vakri) or Direct (Margi).",
      example: "Mercury turns Retrograde in 3rd House — double check communications & travel bookings.",
    },
    {
      key: "eclipseWarnings",
      title: "Solar & Lunar Eclipse (Grahan) Alerts",
      icon: "🌒",
      badge: "Karmic Sutak",
      badgeColor: "bg-rose-900/60 text-rose-300 border-rose-500/30",
      description: "Timely alerts for upcoming Surya & Chandra Grahan, Sutak Kaal window, and protective mantras.",
      example: "Total Lunar Eclipse in Pisces — Sutak starts at 4:15 PM, chant Mahamrityunjaya.",
    },
    {
      key: "jupiterMajorTransits",
      title: "Jupiter Major Ingress & Trikona Aspects",
      icon: "👑",
      badge: "1-Year Blessing",
      badgeColor: "bg-emerald-900/60 text-emerald-300 border-emerald-500/30",
      description: "Alerts for Guru Brihaspati's annual transit shifts into favorable Kendra or Trikona houses.",
      example: "Jupiter transits 5th House of Wisdom & Progeny — auspicious period for investments.",
    },
    {
      key: "combustAlerts",
      title: "Planetary Combustion (Asta) Warnings",
      icon: "🔥",
      badge: "Solar Proximity",
      badgeColor: "bg-orange-900/60 text-orange-300 border-orange-500/30",
      description: "Warnings when functional benefic planets (Venus, Jupiter, Mercury) become combust near the Sun.",
      example: "Venus becomes Combust (Asta) — temporary delay in luxury & relationship decisions.",
    },
    {
      key: "sunSankranti",
      title: "Monthly Sun Ingress (Sankranti)",
      icon: "☀️",
      badge: "Monthly Solar Shift",
      badgeColor: "bg-amber-900/60 text-amber-300 border-amber-500/30",
      description: "Monthly notification on the exact moment the Sun enters a new zodiac sign.",
      example: "Surya enters Leo (Simha Sankranti) — high vital energy & career authority phase.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-100 w-full max-w-3xl rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-amber-500/20 bg-slate-950/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Transit Alert Preferences
                </h2>
                <span className="text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Kundli: {userProfile.rashi || "Taurus"}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure planetary movement types, delivery channels, and severity triggers for Transit Toast alerts.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex items-center gap-1 p-2 bg-slate-950/60 border-b border-slate-800/80 px-6 text-xs overflow-x-auto">
          {[
            { id: "movements", label: "Planetary Movement Types", icon: Zap },
            { id: "planets", label: "Monitored Grahas", icon: Sparkles },
            { id: "channels", label: "Notification Channels", icon: Bell },
            { id: "severity", label: "Severity & Quiet Hours", icon: Radio },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {saveSuccessMsg && (
            <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 p-3 rounded-2xl flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-semibold">{saveSuccessMsg}</span>
            </div>
          )}

          {/* TAB 1: PLANETARY MOVEMENT TYPES */}
          {activeTab === "movements" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <h3 className="font-serif text-sm font-bold text-amber-200 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Select Planetary Movement Types to Alert
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Enable specific cosmic movement events you want delivered via TransitToastContainer.
                  </p>
                </div>

                <div className="text-[10px] text-slate-400 font-mono">
                  {Object.values(movementTypes).filter(Boolean).length} of {MOVEMENT_CONFIGS.length} Active
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {MOVEMENT_CONFIGS.map((item) => {
                  const isEnabled = movementTypes[item.key];
                  return (
                    <div
                      key={item.key}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                        isEnabled
                          ? "bg-slate-900/90 border-amber-500/40 shadow-lg"
                          : "bg-slate-950/50 border-slate-800/80 opacity-60 hover:opacity-90"
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 font-bold text-white text-xs">
                            <span className="text-base">{item.icon}</span>
                            <span>{item.title}</span>
                          </div>

                          <button
                            onClick={() => handleToggleMovement(item.key)}
                            className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              isEnabled ? "bg-amber-500" : "bg-slate-700"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-slate-950 shadow-xs ring-0 transition duration-200 ease-in-out ${
                                isEnabled ? "translate-x-4" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>

                        <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border inline-block ${item.badgeColor}`}>
                          {item.badge}
                        </span>

                        <p className="text-[11px] text-slate-300 leading-snug">
                          {item.description}
                        </p>
                      </div>

                      <div className="bg-slate-950/90 p-2 rounded-xl border border-slate-800/80 text-[10px] text-amber-200/90 font-serif flex items-center justify-between gap-2">
                        <span className="truncate italic">"{item.example}"</span>
                        {onSimulateAlert && isEnabled && (
                          <button
                            onClick={() => onSimulateAlert(item.key)}
                            className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-sans font-bold flex-shrink-0 transition-colors"
                            title="Simulate this alert toast"
                          >
                            Test Alert
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: MONITORED GRAHAS */}
          {activeTab === "planets" && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-sm font-bold text-amber-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Monitored Grahas (Planetary Bodies)
                </h3>
                <p className="text-[11px] text-slate-400">
                  Select which individual planets you wish to receive transit notifications for.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: "Jupiter" as const, name: "Jupiter (Guru)", desc: "Wealth, wisdom, progeny & luck", badge: "High Favorability" },
                  { key: "Saturn" as const, name: "Saturn (Shani)", desc: "Sade Sati, career stability & karma", badge: "Major Cycles" },
                  { key: "RahuKetu" as const, name: "Rahu & Ketu", desc: "Foreign gains, sudden shifts & illusion", badge: "18-Mo Transits" },
                  { key: "Mars" as const, name: "Mars (Mangal)", desc: "Real estate, bravery & energy", badge: "Energy Cycles" },
                  { key: "Sun" as const, name: "Sun (Surya)", desc: "Monthly Sankranti, prestige & authority", badge: "Monthly Shifts" },
                  { key: "Moon" as const, name: "Moon (Chandra)", desc: "Daily Nakshatra changes & emotional tides", badge: "Daily Rhythm" },
                  { key: "Mercury" as const, name: "Mercury (Budha)", desc: "Commerce, intelligence & communications", badge: "Fast Transits" },
                  { key: "Venus" as const, name: "Venus (Shukra)", desc: "Relationships, luxury & artistic success", badge: "Relationship Cycles" },
                ].map((p) => {
                  const isActive = settings.planetAlerts[p.key as keyof typeof settings.planetAlerts] ?? true;
                  return (
                    <button
                      key={p.key}
                      onClick={() => handleTogglePlanet(p.key as any)}
                      className={`p-3.5 rounded-2xl text-left border transition-all space-y-1.5 cursor-pointer ${
                        isActive
                          ? "bg-slate-900 border-amber-500/40 text-white"
                          : "bg-slate-950/40 border-slate-800 text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${isActive ? "bg-amber-400" : "bg-slate-600"}`} />
                          {p.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                          {p.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight">{p.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: NOTIFICATION CHANNELS */}
          {activeTab === "channels" && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-sm font-bold text-amber-200 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-400" />
                  Delivery Channel Controls
                </h3>
                <p className="text-[11px] text-slate-400">
                  Control how and where transit alert notifications appear.
                </p>
              </div>

              <div className="space-y-3">
                {/* Push Notifications Toggle */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="font-bold text-white flex items-center gap-2">
                      <Bell className="w-4 h-4 text-amber-400" />
                      <span>Device Push Notifications</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">Send background alerts to mobile or desktop device upon transit shifts.</p>
                  </div>
                  <button
                    onClick={() => handleToggleChannel("pushEnabled")}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      settings.pushEnabled ? "bg-amber-500" : "bg-slate-700"
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-slate-950 shadow-xs transition duration-200 ${settings.pushEnabled ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>

                {/* Toast Alert Banner Toggle */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="font-bold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-amber-400" />
                      <span>In-App Toast Alert Banners (TransitToastContainer)</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">Display subtle floating transit popups at bottom-right corner while active.</p>
                  </div>
                  <button
                    onClick={() => handleToggleChannel("toastAlertsEnabled")}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      settings.toastAlertsEnabled ? "bg-amber-500" : "bg-slate-700"
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-slate-950 shadow-xs transition duration-200 ${settings.toastAlertsEnabled ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>

                {/* Sound Alerts Toggle */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="font-bold text-white flex items-center gap-2">
                      {settings.soundAlertsEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                      <span>Acoustic Cosmic Chime</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">Play a pleasant temple bell chime when a favorable transit is detected.</p>
                  </div>
                  <button
                    onClick={() => handleToggleChannel("soundAlertsEnabled")}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      settings.soundAlertsEnabled ? "bg-amber-500" : "bg-slate-700"
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-slate-950 shadow-xs transition duration-200 ${settings.soundAlertsEnabled ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>

                {/* Email Digest Toggle */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="font-bold text-white flex items-center gap-2">
                      <Mail className="w-4 h-4 text-amber-400" />
                      <span>Weekly Transit Digest Email</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">Receive a weekly summary of upcoming planetary transits every Sunday evening.</p>
                  </div>
                  <button
                    onClick={() => handleToggleChannel("emailDigestEnabled")}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      settings.emailDigestEnabled ? "bg-amber-500" : "bg-slate-700"
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-slate-950 shadow-xs transition duration-200 ${settings.emailDigestEnabled ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SEVERITY & QUIET HOURS */}
          {activeTab === "severity" && (
            <div className="space-y-5">
              {/* Severity Threshold */}
              <div className="space-y-3">
                <h3 className="font-serif text-sm font-bold text-amber-200 flex items-center gap-2">
                  <Radio className="w-4 h-4 text-amber-400" />
                  Minimum Impact Severity Threshold
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: "Favorable Transits Only", label: "Favorable Only", desc: "Jupiter, Venus & Raj Yogas" },
                    { id: "High Impact Only", label: "High Impact", desc: "Saturn Sade Sati & Rahu/Ketu shifts" },
                    { id: "All Transits", label: "All Cosmic Shifts", desc: "Daily Nakshatra & Sun shifts" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        const updated = { ...settings, minimumImpactSeverity: item.id as any };
                        setSettings(updated);
                        onUpdateProfile({ ...userProfile, transitSettings: updated });
                      }}
                      className={`p-3 rounded-2xl text-left border transition-all space-y-1 cursor-pointer ${
                        settings.minimumImpactSeverity === item.id
                          ? "bg-amber-500/20 border-amber-500 text-white font-bold"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      <div className="font-bold text-xs flex items-center justify-between">
                        <span>{item.label}</span>
                        {settings.minimumImpactSeverity === item.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quiet Hours */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-indigo-400" />
                    <div>
                      <div className="font-bold text-white text-xs">Quiet Hours / Night Silence</div>
                      <p className="text-[11px] text-slate-400">Suppress audio chime during sleep hours.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const updated = { ...settings, quietHoursEnabled: !settings.quietHoursEnabled };
                      setSettings(updated);
                      onUpdateProfile({ ...userProfile, transitSettings: updated });
                    }}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      settings.quietHoursEnabled ? "bg-indigo-600" : "bg-slate-700"
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-slate-950 shadow-xs transition duration-200 ${settings.quietHoursEnabled ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>

                {settings.quietHoursEnabled && (
                  <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800">
                    <div>
                      <label className="block text-slate-400 mb-1 text-[11px]">Silence Starts</label>
                      <input
                        type="time"
                        value={settings.quietHoursStart}
                        onChange={(e) => {
                          const updated = { ...settings, quietHoursStart: e.target.value };
                          setSettings(updated);
                          onUpdateProfile({ ...userProfile, transitSettings: updated });
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 text-[11px]">Silence Ends</label>
                      <input
                        type="time"
                        value={settings.quietHoursEnd}
                        onChange={(e) => {
                          const updated = { ...settings, quietHoursEnd: e.target.value };
                          setSettings(updated);
                          onUpdateProfile({ ...userProfile, transitSettings: updated });
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-amber-500/20 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-semibold border border-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="flex-1 sm:flex-none px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Transit Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
